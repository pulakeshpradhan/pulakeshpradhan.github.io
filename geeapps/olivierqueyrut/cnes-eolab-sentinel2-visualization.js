var cnes = ui.import && ui.import("cnes", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            1.48,
            43.56
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Point([1.48, 43.56]);
// imports of external modules
var s2 = require('users/olivierqueyrut/eolab:Sentinel2Module');
var s2proc = require('users/olivierqueyrut/eolab:ProcessingModule');
var palette = require('users/olivierqueyrut/eolab:Palette');
var style = require('users/olivierqueyrut/eolab:CSSStyle');
/**
 * Collections to display : Sentinel-2 TOA and Sentinel-2 Surface Reflectance.
 */
var collections = {
  "S2_L1C Top Of Atmosphere": {
    images: ee.ImageCollection('COPERNICUS/S2_HARMONIZED'),
    bands: ['B1','B2','B3','B4','B5','B6','B7','B8','B8A','B9','B10','B11','B12'],  //,'QA10','QA20','QA60'],
    start: '2015-06-23',
    scale: 1e4
  },
  "S2_L2A Surface Reflectance": {
    images: ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED'),
    bands: ['B1','B2','B3','B4','B5','B6','B7','B8','B8A','B9','B11','B12'],  //,'QA10','QA20','QA60','AOT','WVP'],
    start: '2017-03-28',
    scale: 1e4
  }
};
var defaultCollection = "S2_L2A Surface Reflectance";
var defaultBands = ['B4', 'B3', 'B2'];
var defaultInterval = 45;
var defaultCloudPercentage = 20;
var defaultMin = 0;
var defaultMax = 0.3;
var defaultGamma = 1.0;
var functions = ["mosaic", "mean", "median"];
var chartTypes = ["Mean by regions", "Histogram", "Timeseries", "DayOfYear series"];
var chartBandsTypes = ["Selected bands", "All bands"];
var modes = ["1 band (grayscale)", "3 bands (RGB)", "Normalized differences (colormap)", "Custom (colormap)"];
var defaultMode = modes[1];
var comparisonTypes = ["No", "Compare (swipe display)", "Compare (side-by-side display)"];
// ------------------------------------------------------
// Create the config panel.
// ------------------------------------------------------
//  Object to store visu configuration parameters
var configParameters = {
  collection: defaultCollection,
  mix: functions[0],
  interval: defaultInterval,
  maxCloudPercentage: defaultCloudPercentage,
  filterCloudyPixels: false,
  mode: defaultMode,
  bands: defaultBands,
  min: defaultMin,
  max: defaultMax,
  gamma: defaultGamma,
  palette: null,
  split: comparisonTypes[0],
  chartType: chartTypes[0],
  chartBandsType: chartBandsTypes[0]
};
function makeConfigPanel(mapObject, urlLabel) {
  var configPanel = ui.Panel({
    layout: ui.Panel.Layout.flow('vertical'),
    style: {
      width: '400px',
      height: '100%',
      stretch: 'horizontal',
      backgroundColor: style.colors.gray,
      border: style.border,
    }
  });
  // Title
  configPanel.add(ui.Label('Sentinel2 visualisation', style.title));
  configPanel.add(ui.Label('by the CNES Earth Observation Lab', style.credit));
  // Description
  var descriptionText =
      'Let\'s interactively explore the Copernicus Sentinel2 collections ' +
      'with various display configurations. Compare two dates with ' +
      'a swipe display or draw geometries to plot their data.';
  configPanel.add(ui.Label(descriptionText, style.paragraph));
  // Configure the collection
  // ::::::::::::::::::::::::::::::::::::::::::::::::::::::
  var collectionSelect = ui.Select({
    items: Object.keys(collections),
    value: configParameters.collection
  });
  var maxCloudPercentageSelect = ui.Slider({
    min: 0,
    max: 100,
    value: configParameters.maxCloudPercentage,
    step: 1,
    style: {stretch: 'horizontal', padding: '6px 0px 0px 6px'}
  });
  var mixSelect = ui.Select({
    items: functions,
    value: configParameters.mix,
  });
  var intervalSelect = ui.Slider({
    min: 1, 
    max: 365,
    value: configParameters.interval,
    step: 1,
    style: {stretch: 'horizontal', padding: '6px 0px 0px 6px'}
  });
  var cloudyPixelsSelect = ui.Checkbox({
    label: 'Filter cloudy pixels', 
    value: configParameters.filterCloudyPixels,
    style: style.label
  });
  configPanel.add(ui.Panel({
    widgets: [
      ui.Panel({
        widgets: [
          ui.Label('Collection', style.label),
          collectionSelect],
        layout: ui.Panel.Layout.flow('horizontal'),
      }),
      ui.Panel({
        widgets: [
          ui.Label('Max clouds percentage', style.label),
          maxCloudPercentageSelect],
        layout: ui.Panel.Layout.flow('horizontal'),
      }),
      ui.Panel({
        widgets: [
          ui.Label('Composition', style.label),
          mixSelect,
          cloudyPixelsSelect],
        layout: ui.Panel.Layout.flow('horizontal')
      }),
      ui.Panel({
        widgets: [
          ui.Label('on', style.label),
          intervalSelect,
          ui.Label('day(s) after start date', style.label)],
        layout: ui.Panel.Layout.flow('horizontal')
      })
    ],
    style: {border: '1px solid gray', margin: '4px'}
  }));
  // Configure visualization parameters
  // ::::::::::::::::::::::::::::::::::::::::::::::::::::::
  var visuConfigPanel = ui.Panel({
    layout: ui.Panel.Layout.flow('vertical'),
    style: {border: '1px solid gray', margin: '4px'}
  });
  configPanel.add(visuConfigPanel);
  // Mode and bands selection
  function createBandSelectors(length) {
    var selectors = [];
    for(var i = 0; i < length; i++) {
      var selector = ui.Select({
        items: collections[defaultCollection].bands,
        value: defaultBands[i]
      });
      selectors.push(selector);
    }
    return selectors;
  }
  function createExpressionSelector() {
    return [ui.Textbox({
      placeholder: "Expression using band names and operators, e.g. (B8-B4)/(B8+B4)",
      style: {"stretch": "horizontal", "minWidth": "300px"}
    })];
  }
  var availableVisuConfigs = {
    "1 band (grayscale)": createBandSelectors(1), 
    "3 bands (RGB)": createBandSelectors(3), 
    "Normalized differences (colormap)": createBandSelectors(2),
    "Custom (colormap)": createExpressionSelector()
  };
  var paletteSelect = ui.Select({
    items: Object.keys(palette.colorbrewer),
    value: Object.keys(palette.colorbrewer)[0]
  });
  var reversePaletteSelect = ui.Checkbox({
    label: 'Reverse', 
    value: false,
    style: style.label
  });
  var palettePanel = ui.Panel([ui.Label('Palette', style.label), paletteSelect, reversePaletteSelect], ui.Panel.Layout.flow('horizontal'));
  var visuBandConfigPanel = ui.Panel({layout: ui.Panel.Layout.flow('horizontal', true)});
  var visuModeSelect = ui.Select({
    items: Object.keys(availableVisuConfigs),
  });
  visuConfigPanel.add(ui.Panel({
    widgets: [
      ui.Label('Visualisation mode', style.label),
      visuModeSelect
    ],
    layout: ui.Panel.Layout.flow('horizontal')
  }));
  visuConfigPanel.add(visuBandConfigPanel);
  // Min / Max / Gamma
  var minTextbox = ui.Textbox({
    placeholder: 'Min',
    value: configParameters.min,
    style: {width: '50px'}
  });
  var maxTextbox = ui.Textbox({
    placeholder: 'Max',
    value: configParameters.max,
    style: {width: '50px'}
  });
  var gammaTextbox = ui.Textbox({
    placeholder: 'Gamma',
    value: configParameters.gamma,
    style: {width: '50px'}
  });
  visuConfigPanel.add(ui.Panel({
    widgets: [
      ui.Label('Range', style.label),
      minTextbox,
      ui.Label('-', style.label),
      maxTextbox,
      ui.Label('Gamma', style.label),
      gammaTextbox
    ],
    layout: ui.Panel.Layout.flow('horizontal')
  }));
  // Activate / Deactivate comparison
  // :::::::::::::::::::::::::::::::::::::T:::::::::::::::::
  var activateSplitSelect = ui.Select({
    items: comparisonTypes, 
    value: configParameters.split,
  });
  configPanel.add(ui.Panel({
    widgets: [ui.Label('Compare two images', style.label), activateSplitSelect],
    style: {border: '1px solid gray', margin: '4px'},
    layout: ui.Panel.Layout.flow('horizontal')
  }));
  // Init
  // ::::::::::::::::::::::::::::::::::::::::::::::::::::::
  // set a default mode
  visuModeSelect.onChange(function(key) {
    var selectors = availableVisuConfigs[key];
    visuBandConfigPanel.widgets().reset(selectors);
    if(key == modes[2] || key == modes[3]) {
      visuBandConfigPanel.add(palettePanel);
      minTextbox.setValue("-1");
      maxTextbox.setValue("1");
    } else {
      minTextbox.setValue("0");
      maxTextbox.setValue("0.3");
    }
  });
  visuModeSelect.setValue(defaultMode, true);
  // Apply button
  // ::::::::::::::::::::::::::::::::::::::::::::::::::::::
  var applyButton = ui.Button({
    label: 'Apply',
    onClick: function() {
      if(configParameters.collection != collectionSelect.getValue()) {
        mapObject.onCollectionChanged(collectionSelect.getValue());
      }
      configParameters.collection = collectionSelect.getValue();
      configParameters.maxCloudPercentage = maxCloudPercentageSelect.getValue();
      configParameters.interval = intervalSelect.getValue();
      configParameters.mix = mixSelect.getValue();
      configParameters.filterCloudyPixels = cloudyPixelsSelect.getValue();
      configParameters.mode = visuModeSelect.getValue();
      configParameters.min = parseFloat(minTextbox.getValue(), 10);
      configParameters.max = parseFloat(maxTextbox.getValue(), 10);
      configParameters.gamma = parseFloat(gammaTextbox.getValue(), 10);
      if(reversePaletteSelect.getValue()) {
        configParameters.palette = palette.colorbrewer[paletteSelect.getValue()][5].slice().reverse();
      } else {
        configParameters.palette = palette.colorbrewer[paletteSelect.getValue()][5];
      }
      if(visuModeSelect.getValue() == modes[3]) {
        var expr = availableVisuConfigs[visuModeSelect.getValue()].map(function(selector) {
          return selector.getValue();
        });
        configParameters.expression = expr[0];
      } else {
        var bands = availableVisuConfigs[visuModeSelect.getValue()].map(function(selector) {
            return selector.getValue();
          });
        configParameters.bands = bands;
      }
      if(configParameters.split != activateSplitSelect.getValue()) {
        mapObject.onCompareChanged(activateSplitSelect.getValue());
      }
      configParameters.split = activateSplitSelect.getValue();
      mapObject.applyCallback(configParameters);
    }
  });
  configPanel.add(applyButton);
  configPanel.add(
    ui.Label('Note: timeseries charts are drawn from start date to start date + timespan', style.paragraph));
  configPanel.add(ui.Label('WMS url of the generated layer: ', style.url))
  configPanel.add(urlLabel);
  // Handle user's actions
  // ::::::::::::::::::::::::::::::::::::::::::::::::::::::
  collectionSelect.onChange(function(value) {
    Object.keys(availableVisuConfigs).forEach(function(key){
        availableVisuConfigs[key].forEach(function(selector, i){
          selector.items().reset(collections[value].bands);
          selector.setValue(collections[value].bands[0]); // set first item to avoid a display bug
          selector.setValue(defaultBands[i]);
        });
      });
  });
  return configPanel;
}
// ------------------------------------------------------
// Create the chart panel.
// ------------------------------------------------------
function makeChartPanel(parent) {
  var chartTypeSelect = ui.Select({
    items: chartTypes,
    value: configParameters.chartType,
    style: {padding: "0px", margin: "0px"}
  });
  var bandsSelect = ui.Select({
    items: chartBandsTypes,
    value: configParameters.chartBandsType,
    style: {padding: "0px", margin: "0px"}
  });
  var showHideButton = ui.Button({
    label: "Show",
    style: {padding: "0px 0px 0px 10px", margin: "0px"}
  });
  var chartPanel = ui.Panel({
    widgets: [],
    style: {
      width: '400px',
      shown: false
    }
  });
  // Handle show/hide button click
  showHideButton.onClick(function(e) {
    var oldShown = chartPanel.style().get("shown");
    chartPanel.style().set("shown", !oldShown);
    if(oldShown){
      showHideButton.setLabel("Show");
    } else {
      showHideButton.setLabel("Hide");
    }
  });
  // Handle chart type selection
  chartTypeSelect.onChange(function(item){
    configParameters.chartType = item;
    mapObject.drawingCallback();
  });
  // Handle chart bands type selection
  bandsSelect.onChange(function(item){
    configParameters.chartBandsType = item;
    mapObject.drawingCallback();
  });
  // create the chart panel and link it to the drawing tools
  var controlPanel = ui.Panel({
    widgets: [
      ui.Label("Chart type", style.labelNoPadding),
      chartTypeSelect,
      bandsSelect,
      showHideButton
    ],
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {
      backgroundColor: style.colors.gray,
      padding: "0px"
    }
  });
  var mainPanel = ui.Panel({
    widgets: [
      controlPanel,
      chartPanel
    ],
    style: {
      position: 'top-left',
      padding: "2px",
      backgroundColor: style.colors.gray,
    }
  });
  parent.add(mainPanel);
  return chartPanel;
}
// ------------------------------------------------------
// Render image collections
// ------------------------------------------------------
// filter the collection according to a date and the configuration
function filterCollection(datestr, configParams) {
  var date = ee.Date(datestr);
  var collection = collections[configParams.collection].images
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', configParams.maxCloudPercentage))
    .filterDate(date, date.advance(configParams.interval, 'day'))
  if(configParams.filterCloudyPixels) {
    collection = collection.map(s2.cloudMaskS2)
  }
  collection = collection.map(s2.normalizeS2);
  if(configParams.mode == modes[2]) {
    var ndName = configParams.bands.join("-");
    collection = collection.map(function(image){
      var nd = image.normalizedDifference(configParams.bands).rename(ndName);
      return image.addBands(nd);
    });
  } else if(configParams.mode == modes[3]) {
    var expr = configParams.expression;
    var regexp = new RegExp("("+collections[configParams.collection].bands.slice().reverse().join("|")+")", "g");
    var newExpr = expr.replace(regexp, "b('$1')");
    collection = collection.map(function(image){
      var nd = image.expression(newExpr).rename("custom");
      return image.addBands(nd);
    });
  }
  return collection;
}
// Create the collection rendering according to the configuration
function getCompositeLayer(collection, configParams) {
  var config = {bands: configParams.bands, min: configParams.min, max: configParams.max, gamma: configParams.gamma};
  if(configParams.mode == modes[2]) {
    var ndName = configParams.bands.join("-");
    config = {bands: [ndName], min: configParams.min, max: configParams.max, palette: configParams.palette};
  }
  if(configParams.mode == modes[3]) {
    config = {bands: ["custom"], min: configParams.min, max: configParams.max, palette: configParams.palette};
  }
  if(configParams.mix == "mosaic") {
    collection = collection.mosaic();
  }
  else if(configParams.mix == "mean") {
    collection = collection.mean();
  }
  else {
    collection = collection.median();
  }
  var layer = ui.Map.Layer(collection, config);
  return layer;
}
// ------------------------------------------------------
// Create the map panel.
// ------------------------------------------------------
function makeMaps(comparisonType) {
  // Create the maps
  var maps = [ui.Map()];
  // configure first map
  var drawingTools = maps[0].drawingTools();
  drawingTools.setLinked(false);
  maps[0].setControlVisibility({all: true, mapTypeControl: false, zoomControl: false});
  // if comparison is activated, create and configure second map  
  if(comparisonType != comparisonTypes[0]){
    maps.push(ui.Map());
    maps[1].setControlVisibility({all: true, mapTypeControl: false, zoomControl: false, drawingToolsControl: false});
    // link maps
    var linker = ui.Map.Linker(maps);
  }
  // return the maps
  return maps;
}
function makeDateSelectors(maps) {
  function createLayerSelector(map, position) {
    var select = ui.DateSlider({
      start: collections[defaultCollection].start,
      period: 1,
      onChange: function(date) {
        map.layers().set(0, getCompositeLayer(filterCollection(date.start(), configParameters), configParameters));
        mapObject.drawingCallback();
      }
    });
    map.add(ui.Panel({
      widgets: [ui.Label('Start date of collection', style.label), select],
      style: {position: position, backgroundColor: style.colors.gray}
    }));
    return select;
  }
  var dateSelectors = [];
  var positions = ['bottom-left', 'bottom-right'];
  for(var i=0; i<maps.length; i++){
    dateSelectors.push(createLayerSelector(maps[i], positions[i]));
  }
  return dateSelectors;
}
var mapObject = {};
mapObject.maps = makeMaps(comparisonTypes[0]);
mapObject.dateSelectors = makeDateSelectors(mapObject.maps);
mapObject.chartPanel = makeChartPanel(mapObject.maps[0]);
mapObject.applyCallback = function(configParameters) {
  for(var i=0; i<mapObject.maps.length; i++) {
    mapObject.maps[i].layers().set(0, getCompositeLayer(
      filterCollection(mapObject.dateSelectors[i].getValue()[0], configParameters), configParameters));
  }
  // update chart
  mapObject.drawingCallback();
};
mapObject.onCollectionChanged = function(collection) {
  mapObject.dateSelectors.forEach(function(dateSelector) {
    dateSelector.setStart(collections[collection].start);
  });
};
mapObject.onCompareChanged = function(comparisonType) {
  var center = mapObject.maps[0].getCenter();
  var zoom = mapObject.maps[0].getZoom();
  var currentDate = mapObject.dateSelectors[0].getValue()[0];
  // recreate the maps
  mapObject.maps = makeMaps(comparisonType);
  mapObject.dateSelectors = makeDateSelectors(mapObject.maps);
  mapObject.chartPanel = makeChartPanel(mapObject.maps[0]);
  mapObject.addDrawingListeners();
  mapObject.addClickListener();
  // recreate the map panel
  var mapPanel;
  if(comparisonType != comparisonTypes[0]){
    mapPanel = ui.SplitPanel({
      firstPanel: mapObject.maps[0],
      secondPanel: mapObject.maps[1],
      wipe: comparisonType == comparisonTypes[1],
      style: {stretch: 'both'}
    });
  } else {
    mapPanel = mapObject.maps[0];
  }
  // set the new map panel to the main panel
  mainPanel.setSecondPanel(ui.Panel(mapPanel));
  mapObject.dateSelectors.map(function(dateSelector){
    dateSelector.setValue(currentDate, false);
  });
  // Center map on CNES Toulouse!
  mapObject.maps[0].centerObject(center, zoom);
};
mapObject.drawingCallback = function() {
  var layer = mapObject.maps[0].layers().get(0);
  var map_link_id = layer.getEeObject().getMap(layer.getVisParams());
  urlLabel.setValue(map_link_id["urlFormat"]);
  // Get all geometries.
  var drawingTools = mapObject.maps[0].drawingTools();
  var geometries = drawingTools.layers().map(function(layer) {
    return ee.Feature(layer.toGeometry(), {'label': layer.getName()});
  });
  if(geometries.length === 0) {
    mapObject.chartPanel.widgets().reset([ui.Label('Draw geometries to generate chart', style.paragraph)]);
    return;
  }
  var geometriesCollection = ee.FeatureCollection(geometries);
  // Get images
  var images;
  if(configParameters.chartType == chartTypes[2] || configParameters.chartType == chartTypes[3]) {
    // for timeseries chart, get all the collection
    images = mapObject.dateSelectors.map(function(dateSelector) {
      return filterCollection(dateSelector.getValue()[0], configParameters).filterBounds(geometriesCollection.geometry());
    });
  } else {
    // otherwise, get the rendered image (mosaic, mean, median)
    images = mapObject.maps.map(function(map){
      return map.layers().get(0).getEeObject();
    });
  }
  var bandCount = collections[configParameters.collection].bands.length;
  if(configParameters.chartBandsType == chartBandsTypes[0]) {
    bandCount = configParameters.bands.length;
    var selectedBands = configParameters.bands;
    if(configParameters.mode == modes[2]){
      var ndName = configParameters.bands.join("-");
      selectedBands = configParameters.bands.concat([ndName]);
      bandCount = bandCount+1;
    } else if(configParameters.mode == modes[3]){
      selectedBands = configParamters.bands.concat(["custom"]);
      bandCount = bandCount+1;
    }
    images = images.map(function(image) {
      return image.select(selectedBands);
    });
  }
  // Create charts
  geometriesCollection.geometry(10).area(10).evaluate(function(area){
    // This portion of code prevents from charting geometries of type points
    // That's why it is commented
    /*
    if(area < 0.001) {
      mapObject.chartPanel.widgets().reset([ui.Label('Draw geometries to generate chart', style.paragraph)]);
      return;
    }
    */
    // Adjust scale according to the area of geometries
    // 100 = 10m x 10m = S2 pixel resolution
    // ==> area * bandCount / 100 = number of S2 pixels in area
    // 1e7 = max number of pixels that can be computed
    // ==> area * bandCount / 100 / 1e7 = scale factor in pixels
    // ==> Math.ceil(area * bandCount / 100 / 1e7) * 10 = scale factor in meters
    var scale = Math.max(10, Math.ceil(area * bandCount / 100 / 1e7) * 10);
    var charts = images.map(function(image) {
      if(configParameters.chartType == chartTypes[0]) {
        // Mean by region
        return ui.Chart.image.regions({
          image: image,
          regions: geometriesCollection,
          reducer: ee.Reducer.mean(),
          scale: scale,
          seriesProperty: 'label'
        });
      } else if(configParameters.chartType == chartTypes[1]){
        // Histogram
        return ui.Chart.image.histogram({
          image: image, 
          region: geometriesCollection, 
          scale: scale
        });
      } else if(configParameters.chartType == chartTypes[2]){
        // Timeseries
        return ui.Chart.image.series({
          imageCollection: image, 
          region: geometriesCollection,
          scale: scale
        });
      } else {
        // DOY series
        return ui.Chart.image.doySeries({
          imageCollection: image, 
          region: geometriesCollection,
          scale: scale
        });
      }
    });
    var titles;
    var colors;
    var options;
    if(configParameters.chartType == chartTypes[0]) {
      // Configure rendering of charts and add them to chartPanel
      titles=['Mean band values by geometry (left image)', 'Mean band values by geometry (right image)'];
      colors = drawingTools.layers().map(function(layer) {
        return {color: layer.getColor()};
      });
    } else if(configParameters.chartType == chartTypes[1]) {
      // Configure rendering of charts and add them to chartPanel
      titles=['Histogram (left image)', 'Histogram (right image)'];
      colors = [{color: "red"}, {color: "green"}, {color: "blue"}];
    } else if(configParameters.chartType == chartTypes[2]) {
      // Configure rendering of charts and add them to chartPanel
      titles=['Timeseries on region (left image)', 'Timeseries on region (right image)'];
      colors = null;
    } else {
      // Configure rendering of charts and add them to chartPanel
      titles=['Day Of Year series on region (left image)', 'Day Of Year series on region (right image)'];
      colors = null;
    }
    for(var i=0; i<charts.length; i++){
      charts[i].setOptions({
        title: titles[i],
        series: colors
      });
      mapObject.chartPanel.widgets().set(i, charts[i]);
    }
  });
};
mapObject.addDrawingListeners = function() {
  var drawingTools = mapObject.maps[0].drawingTools();
  drawingTools.onEdit(ui.util.debounce(mapObject.drawingCallback, 100));
  drawingTools.onDraw(ui.util.debounce(mapObject.drawingCallback, 100));
  drawingTools.onErase(ui.util.debounce(mapObject.drawingCallback, 100));
};
mapObject.onClick = function(coords) {
  // Add a red dot for the point clicked on.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  // Get images
  var images;
  if(configParameters.chartType == chartTypes[2] || configParameters.chartType == chartTypes[3]) {
    // for timeseries chart, get all the collection
    images = mapObject.dateSelectors.map(function(dateSelector) {
      return filterCollection(dateSelector.getValue()[0], configParameters);
    });
  } else {
    // otherwise, get the rendered image (mosaic, mean, median)
    images = mapObject.maps.map(function(map){
      return map.layers().get(0).getEeObject();
    });
  }
  var charts = images.map(function(image) {
    if(configParameters.chartType == chartTypes[0]) {
      // Mean by region
      return ui.Chart.image.regions({
        image: image,
        regions: point,
        reducer: ee.Reducer.mean(),
        scale: 10,
        seriesProperty: 'label'
      });
    } else if(configParameters.chartType == chartTypes[1]){
      // Histogram
      return ui.Chart.image.histogram({
        image: image, 
        region: point,
        scale: 10
      });
    } else if(configParameters.chartType == chartTypes[2]){
      // Timeseries
      return ui.Chart.image.series({
        imageCollection: image, 
        region: point,
        scale: 10
      });
    } else {
      // DOY series
      return ui.Chart.image.doySeries({
        imageCollection: image, 
        region: point,
        scale: 10
      });
    }
  });
  var titles;
  var colors;
  var options;
  if(configParameters.chartType == chartTypes[0]) {
    // Configure rendering of charts and add them to chartPanel
    titles=['Mean band values by geometry (left image)', 'Mean band values by geometry (right image)'];
    colors = null;
  } else if(configParameters.chartType == chartTypes[1]) {
    // Configure rendering of charts and add them to chartPanel
    titles=['Histogram (left image)', 'Histogram (right image)'];
    colors = [{color: "red"}, {color: "green"}, {color: "blue"}];
  } else if(configParameters.chartType == chartTypes[2]) {
    // Configure rendering of charts and add them to chartPanel
    titles=['Timeseries on region (left image)', 'Timeseries on region (right image)'];
    colors = null;
  } else {
    // Configure rendering of charts and add them to chartPanel
    titles=['Day Of Year series on region (left image)', 'Day Of Year series on region (right image)'];
    colors = null;
  }
  for(var i=0; i<charts.length; i++){
    charts[i].setOptions({
      title: titles[i],
      series: colors
    });
    mapObject.chartPanel.widgets().set(i, charts[i]);
  }
};
mapObject.addClickListener = function() {
  mapObject.maps[0].onClick(function(coords){ // mapObject.onClick);
    var point = ee.Geometry.Point(coords.lon, coords.lat);
    print(point);
  });
};
// ------------------------------------------------------
// Tie everything together.
// ------------------------------------------------------
var urlLabel = ui.Label("", style.urlUnderline);
var configPanel = makeConfigPanel(mapObject, urlLabel);
var mainPanel = ui.SplitPanel(
  configPanel,
  ui.Panel(mapObject.maps[0])
);
// Use a SplitPanel so it's possible to resize the two panels.
ui.root.clear();
ui.root.add(mainPanel);
// activate the drawing listeners
mapObject.addDrawingListeners();
mapObject.addClickListener();
// set default date
var date = Date.now();
date = date - configParameters.interval * 86400000;
mapObject.dateSelectors.map(function(dateSelector){
  dateSelector.setValue(date, true);
});
// Center map on CNES Toulouse!
mapObject.maps[0].centerObject(cnes, 12);