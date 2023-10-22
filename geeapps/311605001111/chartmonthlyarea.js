// 去云、云阴影、雪掩膜函数
function maskL8sr(image) {
  var cloudShadowBitMask = (1 << 3);
  var cloudsBitMask = (1 << 5);
  var snowBitMask = (1 << 4);
  var qa = image.select('pixel_qa');
  var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
                 .and(qa.bitwiseAnd(cloudsBitMask).eq(0))
                 .and(qa.bitwiseAnd(snowBitMask).eq(0));
  return image.updateMask(mask);
}
var visParams = {
  bands: ['B4', 'B3', 'B2'],
  min: 0,
  max: 3000,
  gamma: 1.4,
};
//定义Landsat8不同指数计算方式
var landsat8 = {
    NDWI: function (image) {return image.normalizedDifference(['B3', 'B5']).rename('NDWI').copyProperties(image);},
    MNDWI: function (image) {return image.normalizedDifference(['B3', 'B6']).rename('MNDWI').copyProperties(image);},
    AWEI: function (image) {
      awei = image.expression('B2 + 2.5*B3 - 1.5*(B5+B6) - 0.25*B7',
        {
          B2: image.select('B2'),
          B3: image.select('B3'),    
          B5: image.select('B5'),    
          B6: image.select('B6'),
          B7: image.select('B7'),
        }).rename('AWEI');
      return awei.copyProperties(image);
    },
};
var chartKey = null;
var roiKey = null;
var method = "NDWI";
var year = '2020';
var cityname = "武汉市";
// 获取研究区
function getROI(cityname){
  var china_city = ee.FeatureCollection('users/311605001111/ChinaCity');
  var roi = china_city.filter(ee.Filter.eq('市', cityname)).first().geometry();
  if (roiKey !== null) {
    Map.remove(roiKey);
  }
  var roikey = roi;
  Map.centerObject(roi,8);
  Map.addLayer(roi, {}, "roi");
  return roi;
}
// 计算面积
function calArea(image){
  var roi = getROI(cityname);
  var image_area = image.rename('area').gt(0).multiply(ee.Image.pixelArea()).divide(1e6);
  var areas = image_area.reduceRegion({
    reducer: ee.Reducer.sum(),
    geometry: roi,
    scale: 30,
    maxPixels: 1e14
  });
  return image.set('area',areas.get('area'));
}
function waterbodyArea(roi,year,method){
  var startDate = year + '-' + '01-01';
  var endDate = year + '-' + '12-31';
  var dataset = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
                  .filterDate(startDate,endDate)
                  .filterBounds(roi)
                  .map(maskL8sr)
                  .map(function(img) {
                    return img.set('month', ee.Image(img).date().get('month'));
                  });
  var months = dataset.aggregate_array('month').distinct().sort();
  var monthCompList = months.map(function(month) {
    return dataset.filterMetadata('month', 'equals', month).mosaic().clip(roi).set('month', month);
  });
  var monthCompCol = ee.ImageCollection(monthCompList);
  switch(method) {
        case "NDWI":
            var images = monthCompCol.map(landsat8.NDWI).map(calArea);
            break;
        case "MNDWI":
            var images = monthCompCol.map(landsat8.MNDWI).map(calArea);
            break;
        case "AWEI":
            var images = monthCompCol.map(landsat8.AWEI).map(calArea);
            break;
  }
  return images;
}
// widgets
var label = ui.Label("GEE云计算平台:\n绘制某个城市某年月尺度水体面积变化", {"font-size": "18px",whiteSpace: 'pre'});
// select
var select1 = ui.Select({
  items: ['NDWI', "MNDWI", "AWEI"],
  placeholder: "请选择水体指数:",
  value: method,
  onChange: function (value) {
    method = value;
  } 
});
var selectPanel = ui.Panel({
    widgets: [ui.Label("水体指数："), select1],
    layout: ui.Panel.Layout.flow("horizontal"),
});
// region
var textBoxRegion = ui.Textbox({
  placeholder: "请输入行政区名称,如”武汉市“（带引号）",
  value: cityname,
  onChange: function (value) {
    cityname = value;
  },
});
var regionPanel = ui.Panel({
    widgets: [ui.Label("行政区名称："), textBoxRegion],
    layout: ui.Panel.Layout.flow("horizontal"),
});
// year
var textBox1 = ui.Textbox({
  placeholder: "请输入年份",
  value: year,
  onChange: function(value) {
    year = value;
  },
});
var yearPanel = ui.Panel({
    widgets: [ui.Label("年份："), textBox1],
    layout: ui.Panel.Layout.flow("horizontal"),
});
var panel = ui.Panel({style: {width: '400px'}});
// button1
function clickBtn() {
  print("选择的参数是：", cityname + "," + method + "," + year);
  var roi = getROI(cityname);
  var images = waterbodyArea(roi,year,method);
  var month = images.aggregate_array('month');
  // print(month);
  var area = images.aggregate_array('area');
  // print(area);
  var chart = ui.Chart.array.values(area, 0, month)
      .setOptions({
        title: 'Area Over Time',
        vAxis: {title: 'area/km²'},
        hAxis: {title: 'month'},
        lineWidth: 1,
        pointSize: 3,
      });
  panel.add(chart);  
}
var buttonPanel1 = ui.Button({
  label: "确定", 
  onClick: clickBtn,
});
// panel
var panel = ui.Panel({
    widgets: [
        label, 
        selectPanel, 
        regionPanel,
        yearPanel, 
        buttonPanel1,
    ],
    style: {
        width: "500px", 
        height: "600px",
    }
});
ui.root.add(panel);