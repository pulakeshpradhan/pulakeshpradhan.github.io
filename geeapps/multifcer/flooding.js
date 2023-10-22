var app = {};
/** APP常量*/
app.createConstants = function() {
  app.LUCC= ee.ImageCollection('users/multifcer/GEE/AH');
  app.SECTION_STYLE = {margin: '20px 0 0 0'};
  app.palette = ['badc58','009432','7bed9f','b8e994','78e08f','00a8ff','ffebae','5758BB','ff7979','ffffff'];
  app.names = ['农田 ','森林','草地','灌木地','湿地', '水','苔原','不透水面','裸地','雪/冰'];
  app.region = ee.FeatureCollection("users/multifcer/GEE/AHUTF");
  app.export_result = null;
  app.roi = null;
};
/** APP函数*/
app.creatFunctions=function(){
  /* 按天合成S1影像*/
  app.mosaicByDate = function(images, opt_reducer){
    var reducer = opt_reducer || ee.Reducer.mean();
        images = images.map(function(i){
            return i.set({date: i.date().format('YYYY-MM-dd')});
        });
    var TIME_FIELD = 'date';
    var distinct = images.distinct([TIME_FIELD]);
    var filter = ee.Filter.equals({ leftField: TIME_FIELD, rightField: TIME_FIELD });
    var join = ee.Join.saveAll('matches');
    var results = join.apply(distinct, images, filter);
    var bandNames = ee.Image(images.first()).bandNames();
    results = results.map(function(i){
            var mosaic = ee.ImageCollection.fromImages(i.get('matches'))
                                                        .sort('system:index')
                                                        .mean()
                                                        .rename(bandNames);
            return mosaic.clip(app.roi)
                 .copyProperties(i)
                 .set(TIME_FIELD, i.get(TIME_FIELD))
                 .copyProperties(i,['system:footprint'])
                 .set('system:time_start', ee.Date(i.get(TIME_FIELD)).millis());
        });
        return ee.ImageCollection(results);
    }
  /* 选择时间控件*/
  app.otsu = function(histogram){
    var counts = ee.Array(ee.Dictionary(histogram).get('histogram'));
    var means = ee.Array(ee.Dictionary(histogram).get('bucketMeans'));
    var size = means.length().get([0]);
    var total = counts.reduce(ee.Reducer.sum(), [0]).get([0]);
    var sum = means.multiply(counts).reduce(ee.Reducer.sum(), [0]).get([0]);
    var mean = sum.divide(total);
    var indices = ee.List.sequence(1, size);
    var bss = indices.map(function(i) {
    var aCounts = counts.slice(0, 0, i);
    var aCount = aCounts.reduce(ee.Reducer.sum(), [0]).get([0]);
    var aMeans = means.slice(0, 0, i);
    var aMean = aMeans.multiply(aCounts)
                      .reduce(ee.Reducer.sum(), [0]).get([0])
                      .divide(aCount);
    var bCount = total.subtract(aCount);
    var bMean = sum.subtract(aCount.multiply(aMean)).divide(bCount);
    return aCount.multiply(aMean.subtract(mean).pow(2)).add(
          bCount.multiply(bMean.subtract(mean).pow(2)));
  });
    return means.sort(bss).get([-1]);
}; 
  /* 去除覆盖不完全图像*/
  app.allin = function(image){
    var totPixels = ee.Number(ee.Image(1).reduceRegion({reducer: ee.Reducer.count(),
                                                        geometry: app.roi,
                                                        crs: image.select('VV').projection(),
                                                        scale: 1000,
                                                        maxPixels: 1e13}).values().get(0));
    var actPixels = ee.Number(image.select('VV').reduceRegion({reducer: ee.Reducer.count(),
                                                               scale: 1000,
                                                               geometry: app.roi, 
                                                               maxPixels: 999999999}).values().get(0));
    var pcPix = actPixels.divide(totPixels).multiply(100);
    return image.set('percCover', pcPix);
  }
  /* 添加水体波段*/
  app.add_waterMask = function(image){
    var histogram = image.select('VV').reduceRegion({reducer: ee.Reducer.histogram(255, 2)
                                                                        .combine('mean', null, true)
                                                                        .combine('variance', null, true), 
                                                    geometry: app.roi, 
                                                    scale: 50,
                                                    bestEffort: true,});
    var threshold = app.otsu(histogram.get('VV_histogram'));
    var waterMask = image.select('VV_smoothed').lt(threshold).rename('waterMask');
        waterMask = waterMask.updateMask(waterMask); 
    return image.addBands(waterMask);
  };
  /* 计算洪涝面积*/
  app.CalculateArea = function(image){
    var k1=image.select('waterMask').multiply(ee.Image.pixelArea()).multiply(0.000001);
    var stats1 = k1.reduceRegion({reducer: ee.Reducer.sum(),
                                  geometry: app.roi,
                                  scale: 50,
                                  maxPixels: 1e13}).values();
    return image.set({'area': stats1.get(0),  
                      'year': image.get('year'),
                      'date': image.get ('date')});
   } 
  /* 添加土地利用图例*/
  app.addLegend = function(leftMap){
    var legend = ui.Panel({
            style: {
              position: 'bottom-left',
              padding: '8px 15px'
            }
      });
    var legendTitle = ui.Label({
            value: '10-m Global Land Cover',
            style: {
              fontWeight: 'bold',
              fontSize: '18px',
              margin: '0 0 4px 0',
              padding: '0'
            }
          });
    legend.add(legendTitle);
    var loading = ui.Label('Loading legend...', {margin: '2px 0 4px 0'});
    legend.add(loading);
    var makeRow = function(color, name) {
      var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
          padding: '8px',
          margin: '0 0 4px 0'
        }
      });
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}
      });
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
    };
    var igbpLandCoverVis = {
      min: 1.0,
      max: 17.0,
      palette: app.palette,
    };
    loading.style().set('shown', false);
    for (var i = 0; i < app.names.length; i++) {
        legend.add(makeRow(app.palette[i], app.names[i]));
      }
    leftMap.add(legend);
  }
  /* 提取指定位置图像*/
  app.getImageByIndex = function(collection,index){
    return ee.Image(collection.toList(1, index).get(0))}
  /* 绘制图表以显示水域面积*/  
  app.drawChart = function(rightMap,water){
     var ClassChart = ui.Chart.image.series({imageCollection: water.select('waterMask'),
                                            region: app.roi,
                                            reducer: ee.Reducer.sum(),
                                            scale: 100})
                      .setOptions({title: '水体面积',
                                  vAxis: {'title': 'area'},
                                  lineWidth: 1.5,
                                  pointSize: 2 });
      ClassChart.style().set({position: 'bottom-right',
                                width: '492px',
                                height: '300px' });
      rightMap.add(ClassChart);
  };
   /*按六天合成S1影像*/
  app.mosaicByfiveDay =  function(images, opt_reducer){
    var reducer = opt_reducer || ee.Reducer.mean();
        images = images.map(function(i){
            return i.set({date: i.date().format('YYYY-MM-dd')});
        });
    var TIME_FIELD = 'date';
    var distinct = images.distinct([TIME_FIELD]);
    var fiveDaysMillis = 6 * 24 * 60 * 60 * 1000;
    var timeFilter = ee.Filter.maxDifference({
                              difference: fiveDaysMillis,
                              leftField: 'system:time_start',
                              rightField: 'system:time_start'
                            })
    var join = ee.Join.saveAll('matches');
    var results = join.apply(distinct, images, timeFilter);
    var bandNames = ee.Image(images.first()).bandNames();
        results = results.map(function(i){
            var mosaic = ee.ImageCollection.fromImages(i.get('matches'))
                                                        .sort('system:index')
                                                        .mosaic()
                                                        .rename(bandNames);
            return mosaic.clip(app.roi)
                 .copyProperties(i)
                 .set(TIME_FIELD, i.get(TIME_FIELD))
                 .copyProperties(i,['system:footprint'])
                 .set('system:time_start', ee.Date(i.get(TIME_FIELD)).millis());
        });
    return ee.ImageCollection(results);
   }
  /* 绘制被洪水淹没的地物类型面积*/
  app.floodCover = function(flood_image,LandCover){
    var sum = flood_image.eq(1).updateMask(flood_image.eq(1)).multiply(ee.Image.pixelArea()).multiply(0.000001).addBands(LandCover)
              .reduceRegion({reducer: ee.Reducer.sum().group({groupField: 1, groupName: 'b1'}),
                             geometry: app.roi,
                             scale: 50,
                             maxPixels: 1e8});
    var areaList = ee.List(sum.get('groups'));
    var landcolor=  ee.List(app.names).zip(app.palette);
    var areaf = ee.FeatureCollection(areaList.map(function(area){
        area = ee.Dictionary(area);
        var res = ee.Dictionary({name:ee.List(app.names).get(ee.Number(area.get('b1')).subtract(1)), 
                                 label:area.get('b1'),
                                 area:area.get('sum'),
                                 color:ee.List(landcolor.get(ee.Number(area.get('b1')).subtract(1))).get(1)
           });
         return(ee.Feature(null, res));
         }));
        var floodchart = ui.Chart.feature.groups({features: areaf,
                                              xProperty: 'name',
                                              yProperty: 'area',
                                              seriesProperty: 'name'
                                            })
                    .setChartType('ColumnChart')
                    .setOptions({title: '洪水淹没的各种土地利用面积',
                                 hAxis: {title: '土地利用',
                                         titleTextStyle: {italic: false, bold: true}
                                        },
                                 vAxis: {title: '面积(km2)',
                                         titleTextStyle: {italic: false, bold: true}},
                      colors: ['badc58','009432','7bed9f','b8e994','78e08f','00a8ff','5758BB','ff7979'],
                    });
    print(floodchart, '洪水淹没的各种土地利用面积');
  };
  /* 显示淹没前后对比*/
  app.flood = function(leftMap,rightMap){
    var startDate = app.filters.panel.widgets().get(2).getValue();
    var endDate = app.filters.panel.widgets().get(4).getValue();
    var selectRegion = app.picker.panel.widgets().get(1).getValue();
    app.roi = app.region.filter(ee.Filter.eq("市", selectRegion)).geometry();
    print(selectRegion);
    leftMap.clear();
    rightMap.clear();
    app.leftMap.centerObject(app.roi);
    app.rightMap.centerObject(app.roi);
    app.addLegend(leftMap);
    leftMap.addLayer(app.roi,{},'研究区');
    rightMap.addLayer(app.roi,{},'研究区');
    var LandCover = app.LUCC.mosaic().clip(app.roi);
    leftMap.addLayer(LandCover, {min: 1, max: 10,palette:app.palette}, 'Landcover',false);
    rightMap.addLayer(LandCover, {min: 1, max: 10,palette:app.palette}, 'Landcover',false);
    var s1 =  ee.ImageCollection('COPERNICUS/S1_GRD').filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
                .filter(ee.Filter.eq('instrumentMode', 'IW')).filterBounds(app.roi).filterDate(startDate,endDate)
                .map(function(image){
                    return image.addBands(image.select('VV')
                                               .focal_median(parseFloat('50'),'circle','meters')
                                               .rename('VV_smoothed'))});
    app.leftMap.add(ui.Label("洪涝淹没前",{fontWeight: 'bold',fontSize:'23px'}));
    app.rightMap.add(ui.Label("洪涝淹没后",{fontWeight: 'bold',fontSize:'23px',Color:'red'}));
    var s1_dayimage= app.mosaicByDate(s1).filterBounds(app.roi);
    var s1_fiveDayimage= app.mosaicByfiveDay(s1).filterBounds(app.roi);
    var images_day = s1_dayimage.map(app.allin).filter(ee.Filter.gt('percCover',99));
    print(images_day,'Images covering the study area by Day');
    var images_fiveday = s1_fiveDayimage.map(app.allin).filter(ee.Filter.gt('percCover',99));
    print(images_fiveday,'Images covering the study area by FIve');  
    var images = ee.Algorithms.If(images_day.size().gt(2), images_day, images_fiveday)
    print(images)
    var water = ee.ImageCollection(images).map(app.add_waterMask);
    var water_area = water.map(app.CalculateArea);
    var imagesort = water_area.sort('area');
    var id= imagesort.size();
    var minarea = imagesort.first(); 
    var maxarea = app.getImageByIndex(imagesort, id.subtract(1));
    rightMap.addLayer(maxarea.select('waterMask'),{min:0,max:1,palette:'eb4d4b'},'maxarea');
    leftMap.addLayer(minarea.select('waterMask'),{min:0,max:1,palette:'3498db'},'minarea');  
    var flood_image = maxarea.select('waterMask').add(ee.Image(0)).unmask()
                          .subtract(minarea.select('waterMask').add(ee.Image(0)).unmask()).clip(app.roi);
    rightMap.addLayer(flood_image, {min:-1,max:1, palette:['eb4d4b','white','3498db']},'flood',false);
    app.drawChart(rightMap,water);
    app.floodCover(flood_image,LandCover);
    app.export_result = flood_image;
    var linker = ui.Map.Linker([app.leftMap, app.rightMap]);
  };
};
/** 创建UI面板 */
app.createPanels = function() {
  app.intro = {
    panel: ui.Panel([
      ui.Label({
        value: 'Sentinel-1 SAR 数据',
        style: {fontWeight: 'bold', fontSize: '24px', margin: '10px 5px'}
      }),
      ui.Label('请选择时间范围和地点，以便于查看洪涝信息')
    ])
  };
  /* 选择时间控件*/
  app.filters = {
    mapCenter: ui.Checkbox({label: 'Filter to map center', value: true}),
    startDate: ui.Textbox('YYYY-MM-DD', '2020-05-01'),
    endDate: ui.Textbox('YYYY-MM-DD', '2020-08-01'),
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
  /* 选择地区*/
app.picker = {
    select: ui.Textbox('合肥市')
  };
app.picker.panel = ui.Panel({
    widgets: [
      ui.Label('2) 输入安徽省的市级行政名（例如：合肥市）', {fontWeight: 'bold'}),
        app.picker.select],
    style: app.SECTION_STYLE
  });
  /* 淹没前淹没后可视化对比*/
  app.leftMap = ui.Map();
  app.rightMap = ui.Map();
  app.splitPanel = ui.SplitPanel({
    firstPanel: app.leftMap,
    secondPanel: app.rightMap,
    wipe: true,
    style: {stretch: 'both'}
  });
  ui.root.widgets().reset([app.splitPanel]);
  var linker = ui.Map.Linker([app.leftMap, app.rightMap]);
   /* 统计分析*/
  app.analyze = {
    submit: ui.Button('进行统计分析')
  };
  app.analyze.submit.onClick(function() {
    app.flood(app.leftMap,app.rightMap);
  });
  app.analyze.panel = ui.Panel({
    widgets: [
      ui.Label('3) 统计分析', {fontWeight: 'bold'}),
      ui.Panel(app.analyze.submit)
    ],
    style: app.SECTION_STYLE
  });
  /* 导出淹没图像 */
  app.export = {
    button: ui.Button({
      label: '导出淹没图像',
      onClick: function() {
        Export.image.toDrive({
          image: app.export_result,
          region:app.roi,
          scale:10,
          maxPixels:1000000000000,
          description: 'flood_Image'
        });
      }
    })
  };
  app.export.panel = ui.Panel({
    widgets: [
      ui.Label('4) 统计分析之后导出淹没图像', {fontWeight: 'bold'}),
      app.export.button
    ],
    style: app.SECTION_STYLE
  });
};
/**创建数据界面 */
app.boot = function() {
  Map.setCenter(108.821, 33.417, 9);
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