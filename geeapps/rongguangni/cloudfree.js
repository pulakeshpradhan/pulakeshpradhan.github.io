var region = ui.import && ui.import("region", "table", {
      "id": "users/rongguangni/China"
    }) || ee.FeatureCollection("users/rongguangni/China"),
    s2Sr = ui.import && ui.import("s2Sr", "imageCollection", {
      "id": "COPERNICUS/S2_SR"
    }) || ee.ImageCollection("COPERNICUS/S2_SR"),
    s2Clouds = ui.import && ui.import("s2Clouds", "imageCollection", {
      "id": "COPERNICUS/S2_CLOUD_PROBABILITY"
    }) || ee.ImageCollection("COPERNICUS/S2_CLOUD_PROBABILITY"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            116.18141284452942,
            39.961227652537666
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Point([116.18141284452942, 39.961227652537666]);
Map.setCenter(116.18,39.99, 10);
var getcompositeimagecollection=function(MAX_CLOUD_PROBABILITY,START_DATE,END_DATE){ 
function maskClouds(img) {
  var clouds = ee.Image(img.get('cloud_mask')).select('probability');
  var isNotCloud = clouds.lt(MAX_CLOUD_PROBABILITY);
  return img.updateMask(isNotCloud);
} 
var START_DATE1 = ee.Date(START_DATE);
var END_DATE1 = ee.Date(END_DATE);
function maskEdges(s2_img) {
  return s2_img.updateMask(
      s2_img.select('B8A').mask().updateMask(s2_img.select('B9').mask()));
}
var criteria = ee.Filter.and(
    ee.Filter.bounds(region), ee.Filter.date(START_DATE1, END_DATE1));
var s2 = ee.ImageCollection('COPERNICUS/S2_SR').filter(criteria).map(maskEdges);
var s2C = ee.ImageCollection("COPERNICUS/S2_CLOUD_PROBABILITY").filter(criteria);  
var s2SrWithCloudMask = ee.Join.saveFirst('cloud_mask').apply({
  primary: s2,
  secondary: s2C,
  condition:
      ee.Filter.equals({leftField: 'system:index', rightField: 'system:index'})
});
var s2CloudMaskedcollection2021 =ee.ImageCollection(s2SrWithCloudMask).map(maskClouds);
return s2CloudMaskedcollection2021;
}
// var imagecollection2020spring=getcompositeimagecollection(50,'2020-04-01','2020-6-01')
// var imagecollection2021spring=getcompositeimagecollection(50,'2021-04-01','2021-6-01')
// var imagecollection2020fall=getcompositeimagecollection(50,'2020-08-15','2020-10-15')
// var imagecollection2021fall=getcompositeimagecollection(50,'2021-08-15','2021-10-15')
// var spring=imagecollection2020spring.merge(imagecollection2021spring)
// var fall=imagecollection2020fall.merge(imagecollection2020spring)
// var all=imagecollection2020spring.merge(imagecollection2021spring).merge(imagecollection2020fall).merge(imagecollection2020spring)
var rgbVis = {min: 0, max: 3000, bands: ['B4', 'B3', 'B2']};
//7
var imagecollection2021spring=getcompositeimagecollection(70,'2021-04-01','2021-10-15')
var imagecollection2020spring=getcompositeimagecollection(70,'2020-04-01','2020-10-15')
var all=imagecollection2020spring.merge(imagecollection2021spring)
Map.addLayer(all.median().clip(region), rgbVis, '真彩色', false);
Map.addLayer(all.median().clip(region), {min: 0, max: 3000, bands: ['B8', 'B4', 'B3']}, '标准假彩色', false);
var NDVI = function(image) {
  return image.expression('float(b("B8") - b("B4")) / float(b("B8") + b("B4"))').rename('ndvi');
};
var allNDVI=all.map(NDVI).median();
var vis = {
  min: 0,
  max: 1,
  palette: [
      'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718',
      '74A901', '66A000', '529400', '3E8601', '207401', '056201',
      '004C00', '023B01', '012E01', '011D01', '011301'
  ]
};
Map.addLayer(allNDVI.clip(region), vis, 'NDVI', false);
var maskClouds = function(image) {
  // Select the QA band.
  var QA = image.select('DetailedQA')
  // Make a mask to get bit 10, the internal_cloud_algorithm_flag bit.
  var bitMask = 1 << 10;
  // Return an image masking out cloudy areas.
  return image.updateMask(QA.bitwiseAnd(bitMask).eq(0))
}
var withNDVI =  ee.ImageCollection('MODIS/006/MOD13Q1').filterDate('2001-01-01', '2020-12-31').map(maskClouds)
// Make a chart.
// var chart = ui.Chart.image.series({
//   imageCollection: withNDVI.select('NDVI'), 
//   region: geometry, 
//   reducer: ee.Reducer.first(), 
//   scale: 10
// });
withNDVI = withNDVI.map(function(image) {
  var dict = image.select("NDVI")
                  .reduceRegion({
                    reducer: ee.Reducer.first(),
                    geometry: geometry,
                    scale: 10
                  });
  var ndvi = ee.Number(dict.get("NDVI"));
  return image.set("ndvi", ndvi);
});
// Create the panel for the legend items.
var legend = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px'
  }
});
// Create and add the legend title.
var legendTitle = ui.Label({
  value: 'NDVI time series',
  style: {
    height:'40px',
    width:'400px',
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
  }
});
legend.add(legendTitle);
// var loading = ui.Label('Loading chart...', {margin: '2px 0 4px 0'});
// legend.add(loading);
Map.add(legend);
//SG算法封装
var SG_model = {
  /***
  * s-g filter
  * */
  sgFilter : function(y, window_size, order) {
    var half_window = (window_size - 1)/2;
    var deriv = 0;
    var order_range = ee.List.sequence(0,order);
    var k_range = ee.List.sequence(-half_window, half_window);
    var b = ee.Array(k_range.map(function (k) { return order_range.map(function(o) { return ee.Number(k).pow(o)})}));
    var mPI = b.matrixPseudoInverse();
    var impulse_response = (mPI.slice({axis: 0, start: deriv, end: deriv+1})).project([1]);
    var y0 = y.get(0);
    var firstvals = y.slice(1, half_window+1).reverse().map(
      function(e) { return ee.Number(e).subtract(y0).abs().multiply(-1).add(y0) }
    );
    var yend = y.get(-1);
    var lastvals = y.slice(-half_window-1,-1).reverse().map(
      function(e) { return ee.Number(e).subtract(yend).abs().add(yend) }
    );
    var y_ext = firstvals.cat(y).cat(lastvals);
    var runLength = ee.List.sequence(0, y_ext.length().subtract(window_size));
    var smooth = runLength.map(function(i) {
      return ee.Array(y_ext.slice(ee.Number(i), ee.Number(i).add(window_size))).multiply(impulse_response).reduce("sum", [0]).get([0]);
    });
    return smooth;
  },
  /***
  * fill nodata 填补缺失值
  * */
  fill_nodata: function(index, data_list, step) {
    var result = null;
    var i1 = (index - step >= 0) ? (index - step) : 0;
    var i2 = (index + step <= data_list.length - 1) ? (index + step) : data_list.length - 1;
    var max1 = 0;
    var max2 = 0;
    var i = 0;
    for (i=i1; i<index; i++) {
      if(data_list[i] !== null) {
        if (max1 < data_list[i]) {
          max1 = data_list[i];
        }
      }
    }
    i = 0;
    for (i=index; i<i2; i++) {
      if(data_list[i] !== null) {
        if (max2 < data_list[i]) {
          max2 = data_list[i];
        }
      }
    }
    result = (max1 + max2)/2;
    return result;
  }
};
var dataList = withNDVI.reduceColumns(ee.Reducer.toList(2, 1), ["system:time_start", "ndvi"])
                       .get("list");
dataList.evaluate(function(datas) {
  var dateList = [];
  var ndviList = [];
  for (var i=0; i<datas.length; i++) {
    var date = ee.Date(datas[i][0]).format("yyyy-MM-dd");
    dateList.push(date);
    ndviList.push(datas[i][1]/10000);
  }
  //print("raw datas is", ee.List(dateList).zip(ee.List(ndviList)));
  //重建
  var rebuildNDVIList = [];
  for (var j=0; j<ndviList.length; j++) {
    var ndvi = ndviList[j];
    if (ndvi === null) {
      ndvi = SG_model.fill_nodata(j, ndviList, 6);
    }
    rebuildNDVIList.push(ndvi);
  }
  dateList = ee.List(dateList);
  rebuildNDVIList = ee.List(rebuildNDVIList);
  //print("rebuild datas", ee.List(dateList).zip(rebuildNDVIList));
  var window_size = 11;
  var order = 3;
  var smoothList = SG_model.sgFilter(rebuildNDVIList, window_size, order);
  //print("smoothList", ee.List(dateList).zip(smoothList));
  var yValues = ee.List(ndviList).zip(smoothList);
  // Define custom options for the chart. See:
  // https://developers.google.com/chart/interactive/docs/reference
  var chart1 = ui.Chart.array.values(yValues, 0, dateList)
                .setChartType("LineChart")
                .setSeriesNames(["NDVI_point", "NDVI_line"])
                .setOptions({
                  title: "NDVI over time",
                  vAxis: {title: "NDVI"},
                  hAxis: {title: "time"},
                  series: { 
                    0: { lineWidth: 0, pointSize: 2, color: 'green' },
                    1: { lineWidth: 2, pointSize: 0, color: 'red' }
                  }
                });
  // print(chart1);
  legend.add(chart1);
  var chart2 = ui.Chart.array.values(smoothList, 0, dateList)
                .setChartType("LineChart")
                .setSeriesNames(["NDVI_smooth"])
                .setOptions({
                  title: "NDVI over time",
                  vAxis: {title: "NDVI"},
                  hAxis: {title: "time"},
                  series: { 
                    0: { lineWidth: 2, pointSize: 0, color: 'red' }
                  }
                });
  // print(chart2);
});