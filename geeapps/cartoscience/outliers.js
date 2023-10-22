// Map view
Map.setCenter(30, 20, 2.5).setOptions('HYBRID').style().set('cursor', 'crosshair');
// Mask options
var countryList = ee.FeatureCollection('USDOS/LSIB_SIMPLE/2017'),
    waterMask = ee.Image('UMD/hansen/global_forest_change_2015_v1_3').select('datamask').eq(1),
    forestMask = ee.ImageCollection('JAXA/ALOS/PALSAR/YEARLY/FNF').mode().eq(2),
    agModis = ee.ImageCollection('MODIS/006/MCD12Q1').select('LC_Type1').mode()
                  .remap([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17],
                         [0,0,0,0,0,0,0,0,0, 0, 0, 1, 0, 1, 0, 0, 0]),
    agGC = ee.Image('ESA/GLOBCOVER_L4_200901_200912_V2_3').select('landcover')
                    .remap([11,14,20,30,40,50,60,70,90,100,110,120,130,140,150,160,170,180,190,200,210,220,230],
                           [ 1, 1, 1, 1, 0, 0, 0, 0, 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0]),
    agMask = agModis.add(agGC).gt(0).eq(1);
// Calculate stats
var stats = function(year) {
  Map.layers().reset();
  var scale = 10000;
  // Get input parameters
  var countrySelected = app.country.countrySelect.getValue(),
      region = countryList.filterMetadata('country_na', 'equals', countrySelected),
      version = app.inputBox.productBox.getValue(),
      band = app.inputBox.bandBox.getValue();
  if (app.inputBox.customCheckbox.getValue() === true) {
    var latCoord = ee.Number.parse(app.inputBox.latCoordBox.getValue()).getInfo(),
        lonCoord = ee.Number.parse(app.inputBox.lonCoordBox.getValue()).getInfo(),
        distBuffer = ee.Number.parse(app.inputBox.distBox.getValue()).getInfo(),
        distNum = distBuffer*1000;
        region = ee.Geometry.Point([lonCoord,latCoord]).buffer(distNum).bounds();
  }
  var image = ee.Image(version).select(band).clip(region);
  if (app.inputBox.imageCheckbox.getValue() === false) {
    var imageCollection = ee.ImageCollection(version).select(band);
    var startDate = ee.Date(imageCollection.first().get('system:time_start')).get('year');
    var endDate = ee.Date(imageCollection.sort('system:time_start',false).first().get('system:time_start')).get('year');
        imageCollection = ee.ImageCollection(version).select(band).filter(ee.Filter.calendarRange(startDate, endDate, 'year')).filterBounds(region);
        image = ee.Image(imageCollection.filter(ee.Filter.calendarRange(year, year, 'year')).mean()).clip(region);
  }
  if (app.inputBox.waterCheckbox.getValue() === true) {
    image = image.updateMask(waterMask);
  }
  if (app.inputBox.forestCheckbox.getValue() === true) {
    image = image.updateMask(forestMask);
  }
  if (app.inputBox.agricultureCheckbox.getValue() === true) {
    image = image.updateMask(agMask);
  }
  // Tukey's lower and upper fence
  var percentiles = image.reduceRegion({
      reducer: ee.Reducer.percentile([10,25,50,75,90]),
      geometry: region,
      scale: scale,
      maxPixels: 1e12
  });
  var lowerQuartile = ee.Number(percentiles.get(band+'_p25')),
      median = ee.Number(percentiles.get(band+'_p50')),
      upperQuartile = ee.Number(percentiles.get(band+'_p75'));
  var IQR = upperQuartile.subtract(lowerQuartile),
      lowerFence = lowerQuartile.subtract(IQR.multiply(1.5)),
      upperFence = upperQuartile.add(IQR.multiply(1.5));
  var quartiles = image.gt(lowerQuartile).add(image.gt(median)).add(image.gt(upperQuartile))
                       .remap([0,1,2,3],[1,2,3,4]).rename('quartile'),
      outliers = image.gt(lowerFence).add(image.gt(upperFence)).remap([0,1,2],[1,0,2]),
      tukeys = outliers.updateMask(outliers.neq(0)).rename('fence');
  // Z-score
  var mean = ee.Number(image.reduceRegion({
      reducer: ee.Reducer.mean(),
      geometry: region,
      scale: scale,
      maxPixels: 1e12
  }).get(band));
  var stdDev = ee.Number(image.reduceRegion({
      reducer: ee.Reducer.stdDev(),
      geometry: region,
      scale: scale,
      maxPixels: 1e12
  }).get(band));
  var zScore = image.subtract(mean).divide(stdDev).rename('zscore');
  // Modified Z-score
  var medAbsDev = image.subtract(median).abs();
  var medianMedAbsDev = ee.Number(medAbsDev.reduceRegion({
      reducer: ee.Reducer.median(),
      geometry: region,
      scale: scale,
      maxPixels: 1e12
  }).get(band));
  var zScoreMod = image.subtract(mean).multiply(0.6745).divide(medianMedAbsDev).abs().rename('zscore_mod'),
      zScoreModExp = zScoreMod.gt(3.5).multiply(3),
      zScoreModOutliers = zScoreModExp.updateMask(zScoreModExp.eq(3)).rename('zmod_outlier');
  // Lower fence/upper fance + modified s-score outliers
  var combined = zScoreModExp.add(outliers).rename('combined_outliers').remap([0,1,2,3,4,5],[0,3,4,5,1,2]),
                 // 0 = none
                 // 1 = lower fence
                 // 2 = upper fence
                 // 3 = modified z-score
                 // 4 = lower fence + modified z-score
                 // 5 = upper fence + modified z-score 
      combinedMask = combined.updateMask(combined.neq(0));
  // Geary's C statistic
  var list = [1, 1, 1, 1, 1, 1, 1, 1, 1],
      centerList = [1, 1, 1, 1, 0, 1, 1, 1, 1],
      lists = [list, list, list, list, centerList, list, list, list, list],
      kernel = ee.Kernel.fixed(9, 9, lists, -4, -4, false),
      neighs = image.neighborhoodToBands(kernel),
      gearys = image.subtract(neighs).pow(2).reduce(ee.Reducer.sum())
                    .divide(Math.pow(9, 2));
  var gearysQuartiles = gearys.reduceRegion({
      reducer: ee.Reducer.percentile([10,25,75,90]),
      geometry: region,
      scale: scale,
      maxPixels: 1e12
  });
  var gearysLowerQuartile = ee.Number(gearysQuartiles.get('sum_p25')),
      gearysUpperQuartile = ee.Number(gearysQuartiles.get('sum_p75')),
      gearysIQR = gearysUpperQuartile.subtract(gearysLowerQuartile),
      gearysUpperFence = gearysUpperQuartile.add(gearysIQR.multiply(1.5)),
      gearysAccum = gearys.gt(gearysUpperFence).rename('gearys_outlier'),
      gearysOutlier = gearysAccum.updateMask(gearysAccum.eq(1)).rename('spatial_outlier');
  // Locate pixels ≤ zero
  var lteZero = image.lte(0).updateMask(image.lte(0).eq(1));
  // Layer design values
  var zScorePercentiles = zScore.reduceRegion({
      reducer: ee.Reducer.percentile([10,90]),
      geometry: region,
      scale: scale,
      maxPixels: 1e12
  });
  var zScoreModPercentiles = zScoreMod.reduceRegion({
      reducer: ee.Reducer.percentile([10,90]),
      geometry: region,
      scale: scale,
      maxPixels: 1e12
  });
  var raw10 = ee.Number(percentiles.get(band+'_p10')).getInfo(),
      raw90 = ee.Number(percentiles.get(band+'_p90')).getInfo(),
      zScore10 = ee.Number(zScorePercentiles.get('zscore_p10')).getInfo(),
      zScore90 = ee.Number(zScorePercentiles.get('zscore_p90')).getInfo(),
      zScoreMod10 = ee.Number(zScoreModPercentiles.get('zscore_mod_p10')).getInfo(),
      zScoreMod90 = ee.Number(zScoreModPercentiles.get('zscore_mod_p90')).getInfo(),
      gearys10 = ee.Number(gearysQuartiles.get('sum_p10')).getInfo(),
      gearys90 = ee.Number(gearysQuartiles.get('sum_p90')).getInfo();
  // Region naming
  var regionName = countrySelected;
  if (app.inputBox.customCheckbox.getValue() === true) {
    regionName = 'Custom boundary';
  }
  /*
  -- Make sure to change the scale to calculate accurate area percentages
  // Area % calculations
  var areaImage = image.multiply(0).rename('area');
  var totalArea = ee.Number(areaImage.add(1).reduceRegion({
      reducer: ee.Reducer.sum(),
      geometry: region,
      scale: scale,
      maxPixels: 1e12
  }).get('area'));
  var lfmzArea = ee.Number(areaImage.add(combinedMask.eq(1)).reduceRegion({
      reducer: ee.Reducer.sum(),
      geometry: region,
      scale: scale,
      maxPixels: 1e12
  }).get('area')).divide(totalArea).multiply(100).getInfo().toFixed(2);
  var ufmzArea = ee.Number(areaImage.add(combinedMask.eq(2)).reduceRegion({
      reducer: ee.Reducer.sum(),
      geometry: region,
      scale: scale,
      maxPixels: 1e12
  }).get('area')).divide(totalArea).multiply(100).getInfo().toFixed(2);
  var lfArea = ee.Number(areaImage.add(tukeys.eq(1)).reduceRegion({
      reducer: ee.Reducer.sum(),
      geometry: region,
      scale: scale,
      maxPixels: 1e12
  }).get('area')).divide(totalArea).multiply(100).getInfo().toFixed(2);
  var ufArea = ee.Number(areaImage.add(tukeys.eq(2)).reduceRegion({
      reducer: ee.Reducer.sum(),
      geometry: region,
      scale: scale,
      maxPixels: 1e12
  }).get('area')).divide(totalArea).multiply(100).getInfo().toFixed(2);
  var mzArea = ee.Number(areaImage.add(zScoreModOutliers.eq(3)).reduceRegion({
      reducer: ee.Reducer.sum(),
      geometry: region,
      scale: scale,
      maxPixels: 1e12
  }).get('area')).divide(totalArea).multiply(100).getInfo().toFixed(2);
  var lteZeroArea = ee.Number(areaImage.add(lteZero.eq(0)).reduceRegion({
      reducer: ee.Reducer.sum(),
      geometry: region,
      scale: scale,
      maxPixels: 1e12
  }).get('area')).divide(totalArea).multiply(100).getInfo().toFixed(2);
  */
  // Add layers to display
  var grayscale = ['f7f7f7', 'cccccc', '969696', '525252'];
  Map.addLayer(agMask.updateMask(agMask).clip(region), {palette: 'fdfdfd'}, 'Agriculture mask', false);
  Map.addLayer(image, {min: raw10, max: raw90, palette: grayscale}, version, false);
  Map.addLayer(quartiles, {min: 1, max: 4, palette: grayscale}, 'Quartiles', false);
  Map.addLayer(zScore, {min: zScore10, max: zScore90, palette: grayscale}, 'Z-score', false);
  Map.addLayer(zScoreMod, {min: zScoreMod10, max: zScoreMod90, palette: grayscale}, 'Modified Z-score', false);
  Map.addLayer(gearys, {min: gearys10, max: gearys90, palette: grayscale}, "Geary's C", false);
  Map.addLayer(tukeys, {min: 1, max: 2, palette: ['22a6ff','ffd400']}, "Tukey's outliers", false);
  Map.addLayer(zScoreModOutliers, {min: 3, max: 3, palette: '13e864'}, 'Modified Z-score outlier', false);
  Map.addLayer(gearysOutlier, {min: 1, max: 1, palette: ['bebebe']}, "Geary's C design layer", false);
  Map.addLayer(gearysOutlier, {min: 1, max: 1, palette: ['bebebe']}, "Geary's C outlier", false);
  Map.addLayer(combinedMask, {min: 1, max: 5, palette: ['6713e8','ff225a','22a6ff','ffd400','13e864']}, 'Combined outliers', true);
  Map.addLayer(lteZero, {min: 0, max: 0, palette: ['202020']}, 'Pixel ≤ zero', false);
  var empty = ee.Image().byte();
  var regionVis = empty.paint({
    featureCollection: region,
    width: 3
  });
  Map.addLayer(regionVis, {palette: '252525'}, regionName);
  Map.centerObject(region);
  // Charts panel
  var chartPanel = ui.Panel({
    layout: ui.Panel.Layout.flow('vertical')
  });
  chartPanel.style().set({width: '250px', position: 'bottom-left', margin: '0 0 0 0'});
  Map.add(chartPanel);
  var yearLabel = '';
  if (app.inputBox.imageCheckbox.getValue() === false) {
    // Chart time-series
    var timeSeriesDisplay = {
        fontSize: 11,
        width: '250px',
        curveType: 'function',
        format: 'short',
        hAxis: {textStyle: {fontSize: 10}, gridlines: {color: 'transparent'}},
        vAxis: {textStyle: {fontSize: 10}, gridlines: {}},
        trendlines: {0: {color: '202020', lineWidth: 0.5, visibleInLegend: false}},
        series: {0: {color: '505050'}}};
    var timeSeriesChart = ui.Chart.image.series(imageCollection, region, ee.Reducer.mean(), scale)
                                      .setOptions(timeSeriesDisplay).setSeriesNames([band]);
    chartPanel.add(timeSeriesChart);
    yearLabel = ' • '+year;
  }
  // Chart histogram
  var histogramDisplay = {
      fontSize: 11,
      hAxis: {format: 'short'},
      vAxis: {format: 'short'},
      series: {0: {color: '313131'}}
  };
  var histogramChart = ui.Chart.image.histogram(image, region, scale)
                                     .setOptions(histogramDisplay).setSeriesNames([band+yearLabel]);
  chartPanel.add(histogramChart);
  // Create outlier legend
  var legend = ui.Panel({
      style: {
        position: 'bottom-right',
        padding: '8px 15px'
      }
  });
 var legendTitle = ui.Label({
     value: 'Outlier type',
     style: {
       fontWeight: 'bold',
       fontSize: '18px',
       margin: '0 0 6px 30px',
       padding: '0'
       }
  });
  legend.add(legendTitle);
  var makeRow = function(/*percName, */color, name) {
      /*var perc = ui.Label({
          value: percName,
          style: {margin: '0 2px 6px 4px', fontSize: '13px'}
      });*/
      var colorBox = ui.Label({
          style: {
            backgroundColor: '#' + color,
            padding: '8px',
            margin: '0 0 0 0',
            border: '1px solid white'
          }
      });
      var description = ui.Label({
          value: name,
          style: {margin: '0 0 2px 4px', fontSize: '13px'}
      });
      return ui.Panel({
          widgets: [/*perc, */colorBox, description],
          layout: ui.Panel.Layout.Flow('horizontal'),
          style: {padding: '0'}
      });
  };
  // var percents = [lfmzArea+'%', ufmzArea+'%', lfArea+'%', ufArea+'%', mzArea+'%', lteZeroArea+'%'];
  var palette = ['6713e8','ff225a','22a6ff','ffd400','13e864','202020', 'bebebe'];
  var names = ['Lower fence & Modified z-score', 'Upper fence & Modified z-score', 
               'Lower fence ('+lowerFence.getInfo().toFixed(2)+')','Upper fence ('+upperFence.getInfo().toFixed(2)+')', 
               'Modified z-score', 'Pixel ≤ zero', "Geary's C"];
  for (var i = 0; i < 7; i++) {
    legend.add(makeRow(/*percents[i], */palette[i], names[i]));
  }
  /*
  var gearyBox = ui.Label({
      style: {
        backgroundColor: '#bebebe',
        padding: '8px',
        margin: '0 0 0 40px',
        border: '1px solid white'
      }
  });
  var gearyLabel = ui.Label({
      value: "Geary's C",
      style: {margin: '0 0 2px 4px', fontSize: '13px'}
  });
  */     
  //legend.add(ui.Panel({widgets: [gearyBox,gearyLabel], layout: ui.Panel.Layout.Flow('horizontal')}));
  Map.add(legend);
  // Display Geary's C
  Map.onChangeZoom(function(zLevel) {
    if ((Map.getZoom() > 8) & (Map.getZoom() < 11)) {
      Map.layers().get(8).set('shown', true);
    } else {
        Map.layers().get(8).set('shown', false);
    }
  });
};
// Load parameter input panel
var initialize = function(init) {
  if (app.inputBox.imageCheckbox.getValue() === true) {
    Map.clear();
    Map.setOptions('HYBRID').style().set('cursor', 'crosshair');
    stats();
  }
  if (app.inputBox.imageCheckbox.getValue() === false) {
    Map.clear();
    Map.setOptions('HYBRID').style().set('cursor', 'crosshair');
    var version = app.inputBox.productBox.getValue();
    var band = app.inputBox.bandBox.getValue();
    var imageCollection = ee.ImageCollection(version).select(band);
    var minYear = ee.Date(imageCollection.first().get('system:time_start')).get('year').getInfo();
    var maxYear = ee.Date(imageCollection.sort('system:time_start',false).first().get('system:time_start')).get('year').getInfo();
    var label = ui.Label('Year');
    var slider = ui.Slider({
        min: minYear,
        max: maxYear,
        step: 1,
        onChange: stats,
        style: {stretch: 'horizontal'}
    });
    var panelSlider = ui.Panel({
        widgets: [label, slider],
        layout: ui.Panel.Layout.flow('horizontal'),
        style: {fontSize: '10px', position: 'top-left', padding: '0'}
    });
    // Add slider
    var sliderStart = minYear+1;
    slider.setValue(sliderStart);
    Map.add(panelSlider);
  }
};
// UI input panel layout
var app = {};
app.createPanels = function() {
  app.intro = {
    panel: ui.Panel([
      ui.Label({value: 'Outlier detection and visualization', style: {fontWeight: '700', fontSize: '20px', margin: '10px 5px 1px 10px'}}),
      ui.Label({value: "Enter fields to map Tukey's upper and lower fences, z-scores, modified z-scores, and Geary's C.",
                style: {fontWeight: '300', fontSize: '14px', margin: '5px 15px 10px 10px'}})      
    ])
  };
  // Input boxes
  app.inputBox = {
    customCheckbox: ui.Checkbox({label: 'Use custom boundary', style: {fontSize: '12px', margin: '5px 1px 1px 10px'}, value: false}),
    latCoordBox: ui.Textbox({placeholder: 'e.g., -14.9', style: {width: '85px', margin: '2px 1px 1px 10px'}}),
    lonCoordBox: ui.Textbox({placeholder: 'e.g., 35.5', style: {width: '85px', margin: '2px 1px 1px 1px'}}),
    distBox: ui.Textbox({placeholder: 'e.g., 100', style: {width: '75px', margin: '2px 1px 1px 1px'}}),
    productBox: ui.Textbox({placeholder: 'e.g., MODIS/006/MOD17A3H',style: {width: '300px', margin: '10px 1px 1px 10px'}}),
    bandBox: ui.Textbox({placeholder: 'e.g., Npp', style: {width: '222px', margin: '5px 1px 1px 10px'}}),
    startBox: ui.Textbox({placeholder: 'e.g., 2001', style: {width: '75px', margin: '10px 1px 1px 10px'}}),
    endBox: ui.Textbox({placeholder: 'e.g., 2010', style: {width: '75px', margin: '10px 1px 1px 1px'}}),
    button: ui.Button('Click to map', initialize, false, {color: 'a81522', width: '150px'}),
    waterCheckbox: ui.Checkbox({label: 'Mask out water', style: {fontSize: '12px', margin: '0px 1px 1px 10px'}, value: false}),
    forestCheckbox: ui.Checkbox({label: 'Mask out forest', style: {fontSize: '12px', margin: '14px 1px 1px 10px'}, value: false}),
    agricultureCheckbox: ui.Checkbox({label: 'Mask to agriculture', style: {fontSize: '12px', margin: '14px 1px 1px 10px'}, value: false}),
    imageCheckbox: ui.Checkbox({label: 'Use single image', style: {fontSize: '12px', margin: '5px 1px 1px 10px'}, value: false}),
  };
  var enDash = ui.Label({value: '–', style: {margin: '15px 1px 1px 1px', color: '757575'}});
  var xLabel = ui.Label({value: 'Latitude', style: {fontSize: '11px', margin: '2px 1px 1px 31px', color: '505050'}});
  var yLabel = ui.Label({value: 'Longitude', style: {fontSize: '11px', margin: '2px 1px 1px 40px', color: '505050'}});
  var distLabel = ui.Label({value: 'Buffer (km)', style: {fontSize: '11px', margin: '2px 1px 1px 29px', color: '505050'}});
  // Country selection - dropdown List
  app.country = {
    label: ui.Label(),
    countrySelect: ui.Select({
      items: app.countryNames
    })
  };
  app.country.panel = ui.Panel({
    widgets: [
      ui.Label('1) Select country or create custom boundary', {fontWeight: '450', fontSize: '13px', margin: '7px 1px 1px 10px'}),
      ui.Label('Coarser spatial/temporal resolution data sets recommended for larger countries', {fontWeight: '450', fontSize: '10px', margin: '3px 3px 3px 10px'}),
      ui.Panel([app.country.countrySelect]),
      ui.Panel([app.inputBox.customCheckbox]),
      ui.Label('Recommended for finer spatial/temporal resolution data sets', {fontWeight: '450', fontSize: '10px', margin: '3px 3px 3px 10px'}),
      ui.Panel([app.inputBox.latCoordBox, app.inputBox.lonCoordBox, app.inputBox.distBox], ui.Panel.Layout.Flow('horizontal')),
      ui.Panel([xLabel, yLabel, distLabel], ui.Panel.Layout.Flow('horizontal')),
      ui.Label('2) Select masking options', {fontWeight: '450', fontSize: '13px', margin: '12px 1px 10px 10px'}),
      ui.Panel([app.inputBox.waterCheckbox, app.inputBox.forestCheckbox, app.inputBox.agricultureCheckbox])
    ]
  });
  app.country.countrySelect.setValue(app.country.countrySelect.items().get(154));
  // Instructions
  app.inputBox.panel = ui.Panel({
    widgets: [
      ui.Label('3) Image or image collection ID', {fontWeight: '450', fontSize: '13px', margin: '20px 3px 3px 10px'}),
      ui.Label('Visit https://developers.google.com/earth-engine/datasets/ to look up image or image collection ID and band name', {fontWeight: '450', fontSize: '10px', margin: '2px 3px 3px 10px'}),
      ui.Panel([app.inputBox.imageCheckbox, app.inputBox.productBox]),
      ui.Panel([ui.Label('Band name', {fontWeight: '450', fontSize: '12px', margin: '10px 3px 3px 15px'}),
                app.inputBox.bandBox], ui.Panel.Layout.Flow('horizontal')),
      ui.Label('4) Run outlier detection and visualization tool', {fontWeight: '450', fontSize: '13px', margin: '20px 3px 3px 10px'}),
      ui.Panel([app.inputBox.button])
    ]
  });
  // Citation
  app.authorCite = ui.Panel({
    widgets: [
      ui.Label({value: '*Calculations and layer loading may take some time depending on spatial and temporal resolutions selected', 
                style: {color: '177030', fontWeight: '700', fontSize: '12px', margin: '5px 15px 1px 10px'}}),
      ui.Label({value: "Hover over layers panel to view key and turn layers on/off." +
                        " Zoom in to view Geary's C.", 
                style: {fontWeight: '450', fontSize: '11px', margin: '5px 2px 2px 10px'}}),
      ui.Label({value: "- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -", 
                style: {color: '999999', fontWeight: '300', fontSize: '10px', margin: '5px 5px 5px 10px'}}),
      ui.Label({value: "Peter, B. G. and Messina, J. P. 2019. Errors in time-series remote sensing " +
                       "and an open access application for detecting and visualizing spatial data outliers " +
                       "using Google Earth Engine. IEEE Journal of Selected Topics in Applied Earth Observations and Remote Sensing 12(4):1165–1174. " +
                            "doi: 10.1109/JSTARS.2019.2901404", 
                style: {fontWeight: '350', fontSize: '12px', margin: '5px 15px 10px 10px'}})
      ]
  });
};
// Function to create database of countries for user selection 
app.createDB = function() {
  app.countries = countryList.sort('country_na').aggregate_array('country_na').getInfo();
  app.countryNames = app.countries.filter(function(item, index) {
    return app.countries.indexOf(item) >= index;
  });
};
// Add panels to display
app.boot = function() {
  app.createDB();
  app.createPanels();
  var panel = ui.Panel({style: {width: '340px'}});
  ui.root.insert(0, panel);
  panel.add(app.intro.panel).add(app.country.panel).add(app.inputBox.panel).add(app.authorCite);
};
app.boot();