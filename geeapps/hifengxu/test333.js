var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                117.30401629356663,
                31.719406712385883
              ],
              [
                117.27105730919163,
                31.641106513435556
              ],
              [
                117.30126971153538,
                31.56040002062839
              ],
              [
                117.39328020958226,
                31.508898510581787
              ],
              [
                117.44134539512913,
                31.4503396028651
              ],
              [
                117.56906145958226,
                31.40229396528144
              ],
              [
                117.72012347130101,
                31.452682662679354
              ],
              [
                117.82861346153538,
                31.547527306479484
              ],
              [
                117.89453143028538,
                31.594328660798435
              ],
              [
                117.79428118614476,
                31.65045926205598
              ],
              [
                117.65695208458226,
                31.68786084502809
              ],
              [
                117.56219500450413,
                31.621228798920285
              ],
              [
                117.49902361778538,
                31.655135283502112
              ],
              [
                117.44821185020726,
                31.7030509351998
              ],
              [
                117.37954729942601,
                31.74510281820055
              ]
            ]
          ],
          "geodesic": true,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#98ff00",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #98ff00 */ee.Geometry.Polygon(
        [[[117.30401629356663, 31.719406712385883],
          [117.27105730919163, 31.641106513435556],
          [117.30126971153538, 31.56040002062839],
          [117.39328020958226, 31.508898510581787],
          [117.44134539512913, 31.4503396028651],
          [117.56906145958226, 31.40229396528144],
          [117.72012347130101, 31.452682662679354],
          [117.82861346153538, 31.547527306479484],
          [117.89453143028538, 31.594328660798435],
          [117.79428118614476, 31.65045926205598],
          [117.65695208458226, 31.68786084502809],
          [117.56219500450413, 31.621228798920285],
          [117.49902361778538, 31.655135283502112],
          [117.44821185020726, 31.7030509351998],
          [117.37954729942601, 31.74510281820055]]]);
var app = {};
/** APP常量*/
app.createConstants = function() {
  app.SECTION_STYLE = {margin: '20px 0 0 0'};
  app.export_result = null;
  app.roi = geometry;
};
/** APP函数*/
app.creatFunctions=function(){
  var roi = app.roi
  /* 去云*/
  app.cloudmask= function (img) {
  var qa = img.select(['pixel_qa']);
  var mask = qa.bitwiseAnd(8).eq(0).and( // Clouds
             qa.bitwiseAnd(16).eq(0)).and( // Shadows
             qa.bitwiseAnd(32).eq(0)); // Clouds
  return img.updateMask(mask);
  }
  /* NDWI: (G - NIR)/(G + NIR)*/
  app.ndwi =function(image) {
  var ndwi = image.normalizedDifference(["green", "nir"]).rename("NDWI")
  return image.addBands(ndwi)
  }
    /* 去除覆盖不完全图像*/
  app.allin = function(image){
    var totPixels = ee.Number(ee.Image(1).reduceRegion({reducer: ee.Reducer.count(),
                                                        geometry: roi,
                                                        crs: image.select('red').projection(),
                                                        scale: 1000,
                                                        maxPixels: 1e13}).values().get(0));
    var actPixels = ee.Number(image.select('red').reduceRegion({reducer: ee.Reducer.count(),
                                                               scale: 1000,
                                                               geometry: roi, 
                                                               maxPixels: 999999999}).values().get(0));
    var pcPix = actPixels.divide(totPixels).multiply(100);
    return image.set('percCover', pcPix);
  }
  /* 计算面积*/
  app.CalculateArea = function(image){
    var k1=image.select('NDWI').eq(1).multiply(ee.Image.pixelArea()).multiply(0.000001);
    var stats1 = k1.reduceRegion({reducer: ee.Reducer.sum(),
                                  geometry: roi,
                                  scale: 30,
                                  maxPixels: 1e13}).values();
    return image.set({'area': stats1.get(0),  
                      'year': image.get('year'),
                      'date': image.get ('date')});
   } 
  /* 绘制图表以显示水域面积*/ 
  app.drawChart = function(rightMap,water){
     var ClassChart = ui.Chart.image.series({imageCollection: water.select('area'),
                                            region: roi,
                                            reducer: ee.Reducer.sum(),
                                            scale: 30})
                      .setOptions({title: '水体面积(km2)',
                                  vAxis: {'title': 'area'},
                                  lineWidth: 1.5,
                                  pointSize: 2 });
      ClassChart.style().set({position: 'bottom-right',
                                width: '492px',
                                height: '300px' });
      rightMap.add(ClassChart);
  };  
  /* 显示淹没前后对比*/
  app.flood = function(rightMap){
    var startDate = app.filters.panel.widgets().get(2).getValue();
    var endDate = app.filters.panel.widgets().get(4).getValue();
    var threshold =app.picker.panel.widgets().get(1).getValue();
    threshold = ee.Number.parse(threshold)
    rightMap.clear();
    print(startDate,endDate,typeof(threshold))
    app.rightMap.centerObject(roi);
    rightMap.addLayer(app.roi,{},'研究区');
    var  L8= ee.ImageCollection("LANDSAT/LC08/C01/T1_SR")
    var  L7= ee.ImageCollection("LANDSAT/LE07/C01/T1_SR")
    var  L5= ee.ImageCollection("LANDSAT/LT05/C01/T1_SR")
    var  L4=ee.ImageCollection("LANDSAT/LT04/C01/T1_SR")
    var dem= ee.Image("USGS/SRTMGL1_003")
    var bands = ['swir1', 'nir','red', 'green','blue'];
    //addHillshadeaddHillshade).map(addhand)
    var l8 = L8.filterDate(startDate, endDate).filterBounds(app.roi).map(app.cloudmask).select(['B6', 'B5', 'B4','B3','B1'], bands)//.map(app.ndwi);
    var l7 = L7.filterDate(startDate, endDate).filterBounds(app.roi).map(app.cloudmask).select(['B5', 'B4', 'B3','B2','B1'], bands)//.map(app.ndwi);
    var l5 = L5.filterDate(startDate, endDate).filterBounds(app.roi).map(app.cloudmask).select(['B5', 'B4', 'B3','B2','B1'], bands)//.map(app.ndwi);
    var l4 = L4.filterDate(startDate, endDate).filterBounds(app.roi).map(app.cloudmask).select(['B5', 'B4', 'B3','B2','B1'], bands)//.map(app.ndwi);
    var images = l8.merge(l7).merge(l5).merge(l4)
    app.rightMap.add(ui.Label("水体提取",{fontWeight: 'bold',fontSize:'23px',Color:'red'}));
    var images_day = images.map(app.allin).filter(ee.Filter.gt('percCover',99));
    print(images_day,'Images covering the study area ');
    var water = ee.ImageCollection(images_day).map(function(image){
        var ndwi = image.normalizedDifference(["green", "nir"]).rename("NDWI")
        ndwi = ndwi.select('NDWI').gt(threshold).updateMask(ndwi.select('NDWI').gt(threshold))
        var areandwi = ndwi.select('NDWI').eq(1).multiply(ee.Image.pixelArea()).multiply(0.000001).rename('area')
        return image.addBands(ndwi).addBands(areandwi)
    })
    print(water)
    rightMap.addLayer(water.first().select('NDWI').clip(app.roi),{min:0,max:1,palette:'blue'},'水体提取（NDWI）');
    //.map(app.ndwi).select('NDWI').gt(threshold);
    var water_area = water.map(app.CalculateArea);
    print(water_area)
    app.drawChart(rightMap,water);
    app.export_result = images_day.first();
  };  
};
/** 创建UI面板 */
app.createPanels = function() {
  app.intro = {
    panel: ui.Panel([
      ui.Label({
        value: 'Landsat SR 数据',
        style: {fontWeight: 'bold', fontSize: '24px', margin: '10px 5px'}
      }),
      ui.Label('请选择时间范围和地点，以便于查看水体面积信息')
    ])
  };
  /* 选择时间控件*/
  app.filters = {
    mapCenter: ui.Checkbox({label: 'Filter to map center', value: true}),
    startDate: ui.Textbox('YYYY-MM-DD', '2018-01-01'),
    endDate: ui.Textbox('YYYY-MM-DD', '2019-12-01'),
    applyButton: ui.Button('Apply filters', app.applyFilters),
  };
  /* 选择时间范围*/
  app.filters.panel = ui.Panel({
    widgets: [
      ui.Label('1) 选择日期范围（格式：YYYY-MM-DD)', {fontWeight: 'bold'}),
      ui.Label('开始时间', app.HELPER_TEXT_STYLE), app.filters.startDate,
      ui.Label('结束时间', app.HELPER_TEXT_STYLE), app.filters.endDate
    ],
    style: app.SECTION_STYLE
  });
  /* 选择阈值*/
 app.picker = {
    select: ui.Textbox()
  };
 app.picker.panel = ui.Panel({
    widgets: [
      ui.Label('2) 输入水体体取阈值（例如：0）', {fontWeight: 'bold'}),
        app.picker.select],
    style: app.SECTION_STYLE
  });
  /* 淹没前淹没后可视化对比*/
  app.rightMap = ui.Map();
  ui.root.clear();
  ui.root.add(app.rightMap)
  /* 统计分析*/
  app.analyze = {
    submit: ui.Button('进行水体提取')
  };
  app.analyze.submit.onClick(function() {
    app.flood(app.rightMap);
  });
  app.analyze.panel = ui.Panel({
    widgets: [
      ui.Label('3) 水体提取', {fontWeight: 'bold'}),
      ui.Panel(app.analyze.submit)
    ],
    style: app.SECTION_STYLE
  });
  /* 导出淹没图像 */
  app.export = {
    button: ui.Button({
      label: '导出图像',
      onClick: function() {
        Export.image.toDrive({
          image: app.export_result,
          region:app.roi,
          scale:10,
          maxPixels:1000000000000,
          description: 'water_Image'
        });
      }
    })
  };
  app.export.panel = ui.Panel({
    widgets: [
      ui.Label('4) 水体提取结果导出', {fontWeight: 'bold'}),
      app.export.button
    ],
    style: app.SECTION_STYLE
  });
};
/**创建数据界面 */
app.boot = function() {
  Map.centerObject(geometry, 9);
  app.createConstants();
  app.createConstants();
  app.creatFunctions();
  app.createPanels();
  var main = ui.Panel({
    widgets: [
      app.intro.panel,
      app.filters.panel,
      app.picker.panel,
      app.analyze.panel,
      app.export.panel
    ],
    style: {width: '320px', padding: '8px'}
  });
  ui.root.insert(0, main);
};
app.boot()