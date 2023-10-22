var app = {};
//---
app.fun = {
  // This helper function returns a list of new band names.
  getNewBandNames: function(prefix) {
      var seq = ee.List.sequence(1, 4);
      return seq.map(function(b) {
        return ee.String(prefix).cat(ee.Number(b).int());
      });
    },
  // This function accepts mean centered imagery, a scale and 
  // a region in which to perform the analysis.  It returns the 
  // Principal Components (PC) in the region as a new image.
  // [START principal_components]
  getPrincipalComponents:function(centered, scale, region) {
        // 图像转为一维数组
        var arrays = centered.toArray();
        // 计算相关系数矩阵
        var covar = arrays.reduceRegion({
          reducer: ee.Reducer.centeredCovariance(),
          geometry: region,
          scale: scale,
          maxPixels: 1e9
        });
        // 获取“数组”协方差结果并转换为数组。
        // 波段与波段之间的协方差
        var covarArray = ee.Array(covar.get('array'));
        // 执行特征分析，并分割值和向量。
        var eigens = covarArray.eigen();
        // 特征值的P向量长度
        var eigenValues = eigens.slice(1, 0, 1);
        print(eigenValues)
        //计算主成分载荷
        var eigenValuesList = eigenValues.toList().flatten()
        var total = eigenValuesList.reduce(ee.Reducer.sum())
        var percentageVariance = eigenValuesList.map(function(item) {
          return (ee.Number(item).divide(total)).multiply(100)
        })
       print("各个主成分的所占总信息量比例", percentageVariance)  
        // PxP矩阵，其特征向量为行。
        var eigenVectors = eigens.slice(1, 1);
       print(eigenVectors)
        // 将图像转换为二维阵列
        var arrayImage = arrays.toArray(1);
        //使用特征向量矩阵左乘图像阵列
        var principalComponents = ee.Image(eigenVectors).matrixMultiply(arrayImage);
        // 将特征值的平方根转换为P波段图像。
        var sdImage = ee.Image(eigenValues.sqrt())
          .arrayProject([0]).arrayFlatten([app.fun.getNewBandNames('sd')]);
        //将PC转换为P波段图像，通过SD标准化。
        principalComponents=principalComponents
          // 抛出一个不需要的维度，[[]]->[]。
          .arrayProject([0])
          // 使单波段阵列映像成为多波段映像，[]->image。
          .arrayFlatten([app.fun.getNewBandNames('pc')])
          // 通过SDs使PC正常化。
          .divide(sdImage);
        return principalComponents.set('ratio',percentageVariance)
  },
  //functions to normalize VIS to 0-1
  normalize_pos:function(VI,type){
     VI = VI.select(type)
    var max_VI = VI.reduceRegion({
        reducer:ee.Reducer.intervalMean(98,100),
        geometry:VI.geometry(),
        scale:100,
        maxPixels:1e13,
        tileScale:16
      }) 
    var min_VI = VI.reduceRegion({
        reducer:ee.Reducer.intervalMean(0,2),
        geometry:VI.geometry(),
        scale:100,
        maxPixels:1e13,
        tileScale:16
      })
      max_VI = ee.Number(max_VI.values().get(0))
      min_VI = ee.Number(min_VI.values().get(0))
    var normalized =VI.expression('(VI-min)/(max-min)',{
        'VI': VI,
        'min':min_VI,
        'max': max_VI
      })
    return normalized
  },
  normalize_neg:function(VI,type){
    VI = VI.select(type)
    var max_VI = VI.reduceRegion({
        reducer:ee.Reducer.intervalMean(98,100),
        geometry:VI.geometry(),
        scale:100,
        maxPixels:1e13,
        tileScale:16
      }) 
    max_VI = ee.Number(max_VI.values().get(0))
    var min_VI = VI.reduceRegion({
        reducer:ee.Reducer.intervalMean(0,2),
        geometry:VI.geometry(),
        scale:100,
        maxPixels:1e13,
        tileScale:16
      })
    min_VI =  ee.Number(min_VI.values().get(0))
    var normalized = VI.expression('(max-VI)/(max-min)',{
        'VI':VI,
        'min':min_VI,
        'max':max_VI
      })
    return normalized },  
}
//----functions to calculate RSEI factors
app.RSEI = {
  ASF_L8 :  function (image) {
    var opticalBands = image.select('SR_B.').multiply(0.0000275).add(-0.2);
    var thermalBands = image.select('ST_B.*').multiply(0.00341802).add(149.0);
    return image.addBands(opticalBands, null, true)
                .addBands(thermalBands, null, true)
  },
  cal_ndbsi: function(image){
    var formula1 = image.expression(
      '2*swir1/(swir1+nir)',{
        'swir1':image.select('swir1'),
        'nir':image.select('nir')
      }).rename('formula1')
    var formula2 = image.expression(
      'nir/(nir+red)',
      {
        'nir':image.select('nir'),
        'red':image.select('red')
      }).rename('formula2')
    var formula3 =image.expression(
      'green/(green+swir1)',
      {
        'green':image.select('green'),
        'swir1':image.select('swir1')
      }).rename('formula3')
    var formula = formula1.addBands(formula2).addBands(formula3)
    var IBI = formula.expression(
      '(formula1-(formula2+formula3))/(formula1+formula2+formula3)',
      {
      'formula1':formula.select('formula1'),
      'formula2':formula.select('formula2'),
      'formula3':formula.select('formula3'),
    })
    var BSI = image.expression
      ('((swir1+ red)-(nir+blue)) / ((swir1+ red)-(nir+blue))', {
      'swir1':image.select('swir1'),
      'red':image.select('red'),
      'nir':image.select('nir'),
      'blue':image.select('blue')
      })
    var NDBSI = (IBI.multiply(0.5).add((BSI).multiply(0.5))).rename('ndbsi')
    return NDBSI
   },
  cal_wetness: function(image){
      var wetness = image.expression(
      'blue *0.1511+green*0.1973+red*0.3283+nir*0.3407-swir1*0.7117-swir2*0.4559',{
        'red':image.select('red'),
        'blue':image.select('blue'),
        'green':image.select('green'),
        'nir':image.select('nir'),
        'swir1':image.select('swir1'),
        'swir2':image.select('swir2')
      }).rename('wetness')
    return wetness
  },
  cal_ndvi: function(image){
    var NDVI = image.normalizedDifference(['nir','red']).rename('ndvi')
    return NDVI
  }, 
  cal_lst: function(image){
    var lst = image.select('LST').subtract(273.5).rename('lst')
    return lst
  },
  l8_bands:['SR_B2','SR_B3','SR_B4','SR_B5','SR_B6','SR_B7','ST_B10'],
  band_names:['blue','green','red','nir','swir1','swir2','LST'],
  cal_rsei:function(image){
    var ndvi_nor = app.fun.normalize_pos(image,'ndvi') 
    var ndbsi_nor = app.fun.normalize_pos(image,'ndbsi')
    var wetness_nor = app.fun.normalize_pos(image,'wetness')
    var lst_nor = app.fun.normalize_pos(image,'lst')
    var normalized_img = ee.Image.cat([ndvi_nor,ndbsi_nor,wetness_nor,lst_nor])
    var band_names = normalized_img.bandNames()
    var meanDict = normalized_img.reduceRegion({
    reducer: ee.Reducer.mean(),
    geometry: normalized_img.geometry(), 
    scale: 100,
    maxPixels: 1e9
})
    var means = ee.Image.constant(meanDict.values(band_names));
    var centered = normalized_img.subtract(means);
    var PCImage = app.fun.getPrincipalComponents(centered, 100, centered.geometry())
    var pc1 = PCImage.select('pc1')
    var Pcmax = ee.Number(pc1.reduceRegion({
      reducer:ee.Reducer.intervalMean(98,100),
      geometry:pc1.geometry(),
      scale:100,
      maxPixels:1e13,
      tileScale:16
   }).values())
    var Pcmin = ee.Number(pc1.reduceRegion({
      reducer:ee.Reducer.intervalMean(0,2),
      geometry:pc1.geometry(),
      scale:100,
      maxPixels:1e13,
      tileScale:16
    }).values())
  var RSEI = pc1.expression('(pc1-min)/(max-min)',{
  'pc1':pc1.where(pc1.gt(Pcmax),Pcmax)
           .where(pc1.lt(Pcmin),Pcmin),
  'max':ee.Image(Pcmax),
  'min':ee.Image(Pcmin),
}).rename('rsei')
  return image.addBands(RSEI)
  }
}
/** Creates the UI panels. */
app.createPanels = function() {
  /* The introduction section. */
  app.intro = {
    panel: ui.Panel([
      ui.Label({
        value: '基于Landsat数据的遥感生态环境指数RSEI 在线计算平台',
        style: {fontWeight: 'bold', fontSize: '24px', margin: '10px 5px'}
      }),
      ui.Label('APP可以实现Landsat 8 数据的筛选、RSEI 指数的在线计算与可视化地图显示')
    ])
  };
  /* The collection filter controls. */
  app.filters = {
    mapCenter: ui.Checkbox({label: 'Filter to map center', value: true}),
    startDate: ui.Textbox('YYYY-MM-DD', '2017-05-01'),
    endDate: ui.Textbox('YYYY-MM-DD', '2017-09-01'),
    lon: ui.Textbox('Lon','110.716'),
    lat: ui.Textbox('Lat','39.204'),
    applyButton: ui.Button('筛选数据', app.applyFilters),
    loadingLabel: ui.Label({
      value: '加载中...',
      style: {stretch: 'vertical', color: 'gray', shown: false}
    })
  };
  /* The panel for the filter control widgets. */
  app.filters.panel = ui.Panel({
    widgets: [
      ui.Label('1) 影像筛选', {fontWeight: 'bold'}),
      ui.Label('开始时间', app.HELPER_TEXT_STYLE), app.filters.startDate,
      ui.Label('结束时间', app.HELPER_TEXT_STYLE), app.filters.endDate,
      ui.Label('经度', app.HELPER_TEXT_STYLE), app.filters.lon,
      ui.Label('纬度', app.HELPER_TEXT_STYLE), app.filters.lat,
      app.filters.mapCenter,
      ui.Panel([
        app.filters.applyButton,
        app.filters.loadingLabel
      ], ui.Panel.Layout.flow('horizontal'))
    ],
    style: app.SECTION_STYLE
  });
  /* The image picker section. */
  app.picker = {
    // Create a select with a function that reacts to the "change" event.
    select: ui.Select({
      placeholder: '选择影像',
      onChange: app.refreshMapLayer
    }),
    // Create a button that centers the map on a given object.
    /*centerButton: ui.Button('缩放至地图中心', function() {
      var lon = ee.Number.parse(app.filters.lon.getValue())
      var lat = ee.Number.parse(app.filters.lat.getValue())
      Map.centerObject(ee.Geometry.Point([lon,lat]),12);
    })*/
  };
  /* The panel for the picker section with corresponding widgets. */
  app.picker.panel = ui.Panel({
    widgets: [
      ui.Label('2) 选择影像', {fontWeight: 'bold'}),
      ui.Panel([
        app.picker.select,
       // app.picker.centerButton
      ], ui.Panel.Layout.flow('horizontal'))
    ],
    style: app.SECTION_STYLE
  });
  /* The visualization section. */
  app.vis = {
    label: ui.Label(),
    button:ui.Button({
      label:'清空图层',
      onClick:Map.clear
    }
      ),
    // Create a select with a function that reacts to the "change" event.
    select: ui.Select({
      items: Object.keys(app.VIS_OPTIONS),
      onChange: function() {
        // Update the label's value with the select's description.
        var option = app.VIS_OPTIONS[app.vis.select.getValue()];
        app.vis.label.setValue(option.description);
        // Refresh the map layer.
        app.refreshMapLayer();
      }
    })
  };
  /* The panel for the visualization section with corresponding widgets. */
  app.vis.panel = ui.Panel({
    widgets: [
      ui.Label('3) 计算RSEI指数以及各分量并加载至图层', {fontWeight: 'bold'}),
      app.vis.select,
      app.vis.label,
      app.vis.button
    ],
    style: app.SECTION_STYLE
  });
  // Default the select to the first value.
  app.vis.select.setValue(app.vis.select.items().get(0));
  /* The export section. */
 /* app.export = {
    button: ui.Button({
      label: '导出影像',
      // React to the button's click event.
      onClick: function() {
        // Select the full image id.
        var imageIdTrailer = app.picker.select.getValue();
        var imageId = app.COLLECTION_ID + '/' + imageIdTrailer;
        // Get the visualization options.
        var visOption = app.VIS_OPTIONS[app.vis.select.getValue()];
        // Export the image to Drive.
        Export.image.toDrive({
          image: ee.Image(imageId).select(visOption.visParams.bands).clip(geometry),
          description: visOption.visParams.bands+'_' + imageIdTrailer,
          scale:30,
          region
        });
      }
    }),
    label:ui.Label('设置导出范围', app.HELPER_TEXT_STYLE),
    range: ui.Textbox('range', 'geometry')
  };*/
  /* The panel for the export section with corresponding widgets. */
  /*app.export.panel = ui.Panel({
    widgets: [
      ui.Label('4) 影像导出', {fontWeight: 'bold'}),
      app.export.button,
      app.export.label,
      app.export.range
    ],
    style: app.SECTION_STYLE
  });*/
};
/** Creates the app helper functions. */
app.createHelpers = function() {
  /**
   * Enables or disables loading mode.
   * @param {boolean} enabled Whether loading mode is enabled.
   */
  app.setLoadingMode = function(enabled) {
    // Set the loading label visibility to the enabled mode.
    app.filters.loadingLabel.style().set('shown', enabled);
    // Set each of the widgets to the given enabled mode.
    var loadDependentWidgets = [
      app.vis.select,
      app.filters.startDate,
      app.filters.endDate,
      app.filters.applyButton,
      app.filters.mapCenter,
      app.picker.select,
     // app.export.button
    ];
    loadDependentWidgets.forEach(function(widget) {
      widget.setDisabled(enabled);
    });
  };
  /** Applies the selection filters currently selected in the UI. */
  app.applyFilters = function() {
    app.setLoadingMode(true);
    var filtered = ee.ImageCollection(app.COLLECTION_ID)
    // Filter bounds to the map if the checkbox is marked.
    if (app.filters.mapCenter.getValue()) {
      var lon = ee.Number.parse(app.filters.lon.getValue())
      var lat = ee.Number.parse(app.filters.lat.getValue())
      filtered = filtered.filterBounds(ee.Geometry.Point([lon,lat]))
      Map.centerObject(filtered,10);
    }
    // Set filter variables.
    var start = app.filters.startDate.getValue();
    if (start) start = ee.Date(start);
    var end = app.filters.endDate.getValue();
    if (end) end = ee.Date(end);
    if (start) filtered = filtered.filterDate(start, end);
    // Get the list of computed ids.
    var computedIds = filtered
        .limit(app.IMAGE_COUNT_LIMIT)
        .reduceColumns(ee.Reducer.toList(), ['system:index'])
        .get('list');
    computedIds.evaluate(function(ids) {
      // Update the image picker with the given list of ids.
      app.setLoadingMode(false);
      app.picker.select.items().reset(ids);
      // Default the image picker to the first id.
      app.picker.select.setValue(app.picker.select.items().get(0));
    });
  };
  /** Refreshes the current map layer based on the UI widget states. */
  app.refreshMapLayer = function() {
    Map.clear();
    var imageId = app.picker.select.getValue();
    if (imageId) {
      // If an image id is found, create an image.
      var image = ee.Image(app.COLLECTION_ID + '/' + imageId);
      image = app.RSEI.ASF_L8(image).select(app.RSEI.l8_bands,app.RSEI.band_names)
      // Add the image to the map with the corresponding visualization options.
      var ndvi = app.RSEI.cal_ndvi(image)
      var ndbsi = app.RSEI.cal_ndbsi(image)
      var wetness = app.RSEI.cal_wetness(image)
      var lst = app.RSEI.cal_lst(image)
      image = image.addBands(ndvi).addBands(ndbsi).addBands(wetness).addBands(lst)
      image = app.RSEI.cal_rsei(image)
      var visOption = app.VIS_OPTIONS[app.vis.select.getValue()];
      Map.addLayer(image, visOption.visParams, visOption.label+"_"+imageId);
    }
  };
};
/** Creates the app constants. */
app.createConstants = function() {
  app.COLLECTION_ID = 'LANDSAT/LC08/C02/T1_L2';
  app.SECTION_STYLE = {margin: '20px 0 0 0'};
  app.HELPER_TEXT_STYLE = {
      margin: '8px 0 -3px 8px',
      fontSize: '12px',
      color: 'gray'
  };
  app.IMAGE_COUNT_LIMIT = 5;
  app.VIS_OPTIONS = {
    '原始影像  假彩色 ': {
      label:'false_color',
      description: '标准假彩色合成影像，植被呈现红色',
      visParams: {gamma: 1.1, min: 0, max: 0.45, bands: ['nir', 'red', 'green']}
    },
    '原始影像  真彩色': {
      label:'true_color',
      description: '真彩色影像，植被为绿色',
      visParams: {gamma: 1.1, min: 0, max: 0.35, bands: ['red', 'green', 'blue']}
    },
    '热度': {
      label:'lst',
      description: '地表温度，值越大，表示地表温度越高',
      visParams: {min: 20, max: 45, bands: ['lst'],palette:'#1a66e4,#227fd6,#36d697,#84d640,#d0d634,#d69833,#d65b3b'}
    },
    '绿度': {
      label:'ndvi',
      description: '地表植被覆盖情况，通过NDVI表示，值越大，植被覆盖越高',
      visParams: {min: 0, max: 0.8, bands: ['ndvi'],palette:'FFFFFF, CE7E45, DF923D, F1B555, FCD163, 99B718, 74A901,'+ '3E8601, 207401, 056201, 004C00, 023B01, 012E01'}
    },
    '干度': {
      label:'ndbsi',
      description: '地表干度，通过NDBSI得到，值越大表示地表干度越大',
      visParams: {min: 0.2, max: 0.6, bands: ['ndbsi'],palette:'012E01,023B01,004C00,056201,207401,3E8601,74A901,99B718,FCD163,F1B555,DF923D,CE7E45'}
    },
    '湿度': {
      label:'wetness',
      description: '地表湿度，通过缨帽变化计算得到，值越大表示地表湿度越大',
      visParams: {min: -0.3, max: 0.4, bands: ['wetness'],palette:'#d6ab32,#9ed632,#37d687,#43a4d6,#3f55d6'}
    },
    '生态环境指数': {
      label:'RSEI',
      description: '遥感生态环境指数，通过集成绿度、热度、湿度、干度指标综合反映区域生态环境质量',
      visParams: { min: 0, max: 1, bands: ['rsei'],palette:'FFFFFF, CE7E45, DF923D, F1B555, FCD163, 99B718, 74A901,'+ '3E8601, 207401, 056201, 004C00, 023B01, 012E01'}
    },
  };
};
/** Creates the application interface. */
app.boot = function() {
  app.createConstants();
  app.createHelpers();
  app.createPanels();
  var main = ui.Panel({
    widgets: [
      app.intro.panel,
      app.filters.panel,
      app.picker.panel,
      app.vis.panel,
    //  app.export.panel
    ],
    style: {width: '320px', padding: '8px'}
  });
  Map.setCenter(110.716, 39.204, 9);
  ui.root.insert(0, main);
  app.applyFilters();
};
app.boot();