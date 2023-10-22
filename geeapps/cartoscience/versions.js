// Version 1.1
Map.setCenter(30, 20, 2.5).setOptions('HYBRID').style().set('cursor', 'crosshair');
var countryList = ee.FeatureCollection('USDOS/LSIB_SIMPLE/2017');
var stats = function(year) {
  Map.layers().reset();
  var countrySelected = app.country.countrySelect.getValue();
  var region = countryList.filterMetadata('Country', 'equals', countrySelected).geometry();
  var versionOne = app.inputBox.productBox.getValue();
  var versionTwo = app.inputBox.productBoxTwo.getValue();
  var band = app.inputBox.bandBox.getValue();
  var bandTwo = app.inputBox.bandBoxTwo.getValue();
  if (app.inputBox.customCheckbox.getValue() === true) {
    var latCoord = ee.Number.parse(app.inputBox.latCoordBox.getValue()).getInfo();
    var lonCoord = ee.Number.parse(app.inputBox.lonCoordBox.getValue()).getInfo();
    var distBuffer = ee.Number.parse(app.inputBox.distBox.getValue()).getInfo();
    var distNum = distBuffer*1000;
        region = ee.Geometry.Point([lonCoord,latCoord]).buffer(distNum).bounds();
  }
  var modisCollectionOne = ee.ImageCollection(versionOne).select(band);
  var modisCollectionTwo = ee.ImageCollection(versionTwo).select(bandTwo);
  var imageOne = modisCollectionOne.filter(ee.Filter.calendarRange(year,year,'year')).mean();
  var imageTwo = modisCollectionTwo.filter(ee.Filter.calendarRange(year,year,'year')).mean();
  var abs = imageOne.select(band).subtract(imageTwo.select(bandTwo)).abs().rename("difference");
  var percentilesOne = imageOne.reduceRegion({
    reducer: ee.Reducer.percentile([10,90]),
    geometry: region,
    scale: 250,
    maxPixels: 1e13
  });
  var percentilesTwo = imageTwo.reduceRegion({
    reducer: ee.Reducer.percentile([10,90]),
    geometry: region,
    scale: 250,
    maxPixels: 1e13
  });
  var percentilesAbs = abs.reduceRegion({
    reducer: ee.Reducer.percentile([10,90]),
    geometry: region,
    scale: 250,
    maxPixels: 1e13
  });
  var minOne = ee.Number(percentilesOne.get(band+'_p10')).getInfo();
  var maxOne = ee.Number(percentilesOne.get(band+'_p90')).getInfo();
  var minTwo = ee.Number(percentilesTwo.get(bandTwo+'_p10')).getInfo();
  var maxTwo = ee.Number(percentilesTwo.get(bandTwo+'_p90')).getInfo();
  var minBoth = Math.min(minOne,minTwo);
  var maxBoth = Math.max(maxOne,maxTwo);
  var minAbs = ee.Number(percentilesAbs.get('difference_p10')).getInfo();
  var maxAbs = ee.Number(percentilesAbs.get('difference_p90')).getInfo();
  var grayscale = ['f7f7f7', 'cccccc', '969696', '525252','141414'];
  Map.addLayer(imageOne.select(band).rename(band+'_'+versionOne).clip(region),{min: minBoth, max: maxBoth, palette: grayscale},band+' • '+versionOne, false);
  Map.addLayer(imageTwo.select(bandTwo).rename(bandTwo+'_'+versionTwo).clip(region),{min: minBoth, max: maxBoth, palette: grayscale},band+' • '+versionTwo, false);
  Map.addLayer(abs.clip(region),{min: minAbs, max: maxAbs, palette: grayscale},"Difference");
  var options = {
    title: year+' Histogram',
    fontSize: 11,
    legend: {position: 'none'},
    series: {0: {color: '7100AA'}}
  };
  var histogram = ui.Chart.image.histogram(imageOne, region, 10000).setOptions(options);
  var optionsTwo = {
    title: year+' Histogram',
    fontSize: 11,
    legend: {position: 'none'},
    series: {0: {color: '0071AA'}}
  };
  var histogramTwo = ui.Chart.image.histogram(imageTwo, region, 10000).setOptions(optionsTwo);
  var clickLabel = ui.Label('Click map to get pixel time-series', {fontWeight: '300', fontSize: '13px', margin: '10px 10px 15px 30px'});
  var clickLabelTwo = ui.Label('Click map to get pixel time-series', {fontWeight: '300', fontSize: '13px', margin: '10px 10px 15px 30px'});
  app.rootPanels.panelOne.widgets().set(1, ui.Label('temp'));
  app.rootPanels.panelTwo.widgets().set(1, ui.Label('temp'));
  app.rootPanels.panelOne.widgets().set(1, histogram);
  app.rootPanels.panelOne.widgets().set(2, clickLabel);
  app.rootPanels.panelTwo.widgets().set(1, histogramTwo);
  app.rootPanels.panelTwo.widgets().set(2, clickLabelTwo);
  Map.centerObject(region);
  Map.setOptions('HYBRID');
  Map.onClick(function(coords) {
    var point = ee.Geometry.Point(coords.lon, coords.lat);
    var dot = ui.Map.Layer(point, {color: 'AA0000'}, "Inspector");
    Map.layers().set(3, dot);
    var clickChart = ui.Chart.image.series(modisCollectionOne, point, ee.Reducer.mean(), 10000);
    clickChart.setOptions({
        title: 'Pixel | X: ' + coords.lon.toFixed(2)+', '+'Y: ' + coords.lat.toFixed(2),
        fontSize: 10,
        legend: {position: 'none'},
        curveType: 'function',
        series: {0: {color: '7100AA'}},
        trendlines: {0:{color: '202020', lineWidth: 1}}
    });
    var clickChartTwo = ui.Chart.image.series(modisCollectionTwo, point, ee.Reducer.mean(), 10000);
    clickChartTwo.setOptions({
        title: 'Pixel | X: ' + coords.lon.toFixed(2)+', '+'Y: ' + coords.lat.toFixed(2),
        fontSize: 10,
        legend: {position: 'none'},
        curveType: 'function',
        series: {0: {color: '0071AA'}},
        trendlines: {0:{color: '202020', lineWidth: 1}}
    });
    app.rootPanels.panelOne.widgets().set(2, clickChart);
    app.rootPanels.panelTwo.widgets().set(2, clickChartTwo);
  });
};
// Load parameter input panel
var initialize = function(init) {
  Map.clear();
  Map.setOptions('HYBRID').style().set('cursor', 'crosshair');
  var countrySelected = app.country.countrySelect.getValue();
  var region = countryList.filterMetadata('Country', 'equals', countrySelected).geometry();
  var versionOne = app.inputBox.productBox.getValue();
  var versionTwo = app.inputBox.productBoxTwo.getValue();
  var band = app.inputBox.bandBox.getValue();
  var bandTwo = app.inputBox.bandBoxTwo.getValue();
  if (app.inputBox.customCheckbox.getValue() === true) {
    var latCoord = ee.Number.parse(app.inputBox.latCoordBox.getValue()).getInfo();
    var lonCoord = ee.Number.parse(app.inputBox.lonCoordBox.getValue()).getInfo();
    var distBuffer = ee.Number.parse(app.inputBox.distBox.getValue()).getInfo();
    var distNum = distBuffer*1000;
        region = ee.Geometry.Point([lonCoord,latCoord]).buffer(distNum).bounds();
  }
  var modisCollectionOne = ee.ImageCollection(versionOne).select(band);
  var modisCollectionTwo = ee.ImageCollection(versionTwo).select(bandTwo);
  var startYearOne = ee.Date(modisCollectionOne.first().get('system:time_start')).get('year');
  var endYearOne = ee.Date(modisCollectionOne.sort('system:time_start',false).first().get('system:time_start')).get('year');
  var startYearTwo = ee.Date(modisCollectionTwo.first().get('system:time_start')).get('year');
  var endYearTwo = ee.Date(modisCollectionTwo.sort('system:time_start',false).first().get('system:time_start')).get('year');
  var startYear = Math.max(ee.Number(startYearOne).getInfo(),ee.Number(startYearTwo).getInfo());
  var endYear = Math.min(ee.Number(endYearOne).getInfo(),ee.Number(endYearTwo).getInfo());
  ui.root.remove(app.rootPanels.panelOne);
  ui.root.remove(app.rootPanels.panelTwo);
  ui.root.insert(1,app.rootPanels.panelOne);
  ui.root.insert(2,app.rootPanels.panelTwo);
  var label = ui.Label('Select year');
  var slider = ui.Slider({
      min: startYear,
      max: endYear,
      step: 1,
      onChange: stats,
      style: {stretch: 'horizontal'}
  });
  var panelSlider = ui.Panel({
      widgets: [label, slider],
      layout: ui.Panel.Layout.flow('horizontal'),
      style: {fontSize: '10px', position: 'bottom-right', padding: '0'}
  });
  var sliderStart = startYear+1;
  slider.setValue(sliderStart);
  Map.add(panelSlider);
  var display = {
    title: versionOne,
    fontSize: 11,
    curveType: 'function',
    series: {0: {color: '7100AA'}},
    trendlines: {0:{color: '202020', lineWidth: 1}}
  };
  var timeSeries = ui.Chart.image.series(modisCollectionOne.select(band), region, ee.Reducer.mean(), 10000).setOptions(display);
  var displayTwo = {
    title: versionTwo,
    fontSize: 11,
    curveType: 'function',
    series: {0: {color: '0071AA'}},
    trendlines: {0:{color: '202020', lineWidth: 1}}
  };
  var timeSeriesTwo = ui.Chart.image.series(modisCollectionTwo.select(bandTwo), region, ee.Reducer.mean(), 10000).setOptions(displayTwo);
  app.rootPanels.panelOne.widgets().set(0, timeSeries);
  app.rootPanels.panelTwo.widgets().set(0, timeSeriesTwo);
};
// UI input panel layout
var app = {};
app.createPanels = function() {
  app.intro = {
    panel: ui.Panel([
      ui.Label({value: 'MODIS version comparison', style: {fontWeight: '700', fontSize: '20px', margin: '10px 5px 1px 10px'}}),
      ui.Label({value: "Enter fields to generate and compare time-series and histograms" ,
                style: {fontWeight: '300', fontSize: '14px', margin: '5px 15px 10px 10px'}})      
    ])
  };
  app.rootPanels = {
    panelOne: ui.Panel({layout: ui.Panel.Layout.flow('vertical'), style: {width: '275px'}}),
    panelTwo: ui.Panel({layout: ui.Panel.Layout.flow('vertical'), style: {width: '275px'}}),
  };
  // Input boxes
  app.inputBox = {
    customCheckbox: ui.Checkbox({label: 'Use custom boundary', style: {fontSize: '12px', margin: '5px 1px 1px 10px'}, value: false}),
    latCoordBox: ui.Textbox({placeholder: 'e.g., -14.9', style: {width: '80px', margin: '2px 1px 1px 10px'}}),
    lonCoordBox: ui.Textbox({placeholder: 'e.g., 35.5', style: {width: '80px', margin: '2px 1px 1px 1px'}}),
    distBox: ui.Textbox({placeholder: 'e.g., 100', style: {width: '75px', margin: '2px 1px 1px 1px'}}),
    productBox: ui.Textbox({placeholder: 'e.g., MODIS/006/MOD17A3H',style: {width: '260px', margin: '10px 1px 1px 10px'}}),
    productBoxTwo: ui.Textbox({placeholder: 'e.g., MODIS/055/MOD17A3',style: {width: '260px', margin: '10px 1px 1px 10px'}}),
    bandBox: ui.Textbox({placeholder: 'e.g., Npp', style: {width: '185px', margin: '5px 1px 1px 10px'}}),
    bandBoxTwo: ui.Textbox({placeholder: 'e.g., Npp', style: {width: '185px', margin: '5px 1px 1px 10px'}}),
    button: ui.Button('Click to map', initialize, false, {color: 'a81522', width: '275px'})
  };
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
      ui.Label('1) Select country or create custom boundary', {fontWeight: '450', fontSize: '12px', margin: '7px 1px 1px 10px'}),
      ui.Label('Coarser spatial/temporal resolution data sets recommended for larger countries', {fontWeight: '450', fontSize: '10px', margin: '3px 3px 3px 10px'}),
      ui.Panel([app.country.countrySelect]),
      ui.Panel([app.inputBox.customCheckbox]),
      ui.Label('Recommended for finer spatial/temporal resolution data sets', {fontWeight: '450', fontSize: '10px', margin: '3px 3px 3px 10px'}),
      ui.Panel([app.inputBox.latCoordBox, app.inputBox.lonCoordBox, app.inputBox.distBox], ui.Panel.Layout.Flow('horizontal')),
      ui.Panel([xLabel, yLabel, distLabel], ui.Panel.Layout.Flow('horizontal')),
    ]
  });
  app.country.countrySelect.setValue(app.country.countrySelect.items().get(154));
  // Instructions
  app.inputBox.panel = ui.Panel({
    widgets: [
      ui.Label('2) Image collections to compare', {fontWeight: '450', fontSize: '12px', margin: '20px 3px 3px 10px'}),
      ui.Label('Visit https://developers.google.com/earth-engine/datasets/ to look up image collection IDs and band names', {fontWeight: '450', fontSize: '10px', margin: '3px 3px 3px 10px'}),
      ui.Panel([app.inputBox.productBox]),
      ui.Panel([ui.Label('Band name', {fontWeight: '450', fontSize: '11px', margin: '10px 3px 3px 15px'}),
                app.inputBox.bandBox], ui.Panel.Layout.Flow('horizontal')),
      ui.Panel([app.inputBox.productBoxTwo]),
      ui.Panel([ui.Label('Band name', {fontWeight: '450', fontSize: '11px', margin: '10px 3px 3px 15px'}),
                app.inputBox.bandBoxTwo], ui.Panel.Layout.Flow('horizontal')),
      ui.Label('3) Run MODIS comparison tool', {fontWeight: '450', fontSize: '12px', margin: '20px 3px 3px 10px'}),
      ui.Panel([app.inputBox.button])
    ]
  });
  // Citation
  app.authorCite = ui.Panel({
    widgets: [
      ui.Label({value: '*Calculations and layer loading may take a moment', 
                style: {color: '177030', fontWeight: '700', fontSize: '11px', margin: '5px 15px 1px 10px'}}),
      ui.Label({value: "Hover over layers panel to view key and turn layers on/off.",
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
  var panel = ui.Panel({style: {width: '310px'}});
    var panelOne = ui.Panel({
    layout: ui.Panel.Layout.flow('vertical')
  });
  ui.root.insert(0, panel);
  panel.add(app.intro.panel).add(app.country.panel).add(app.inputBox.panel).add(app.authorCite);
};
app.boot();