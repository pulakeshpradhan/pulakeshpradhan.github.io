var cnes = ui.import && ui.import("cnes", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            1.479934100065634,
            43.56040143223152
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Point([1.479934100065634, 43.56040143223152]);
// imports of external modules
var palette = require('users/olivierqueyrut/eolab:Palette')
var style = require('users/olivierqueyrut/eolab:CSSStyle')
/**
 * Collections to display :
 * - Sentinel1 GRD
 */
var collections = {
  "S1_GRD": {
    images: ee.ImageCollection('COPERNICUS/S1_GRD'),
    bands: ['VV', 'VH', 'HH', 'HV'],
    start: '2014-10-03'
  }
}
var defaultCollection = "S1_GRD"
var defaultInstrumentMode = "IW"
var defaultOrbitPass = "ASCENDING"
var defaultBands = ['VV']
var defaultInterval = 20
var defaultMin = -25
var defaultMax = 5
var defaultGamma = 1.0
var functions = ["mosaic", "mean", "median"]
var modes = ["1 band (grayscale)", "3 bands (RGB)"]
var defaultMode = modes[0]
var comparisonTypes = ["No", "Compare (swipe display)", "Compare (side-by-side display)"]
// ------------------------------------------------------
// Create the config panel.
// ------------------------------------------------------
//  Object to store visu configuration parameters
var configParameters = {
  collection: defaultCollection,
  intrumentMode: defaultInstrumentMode,
  orbitPass: defaultOrbitPass,
  mix: functions[0],
  interval: defaultInterval,
  mode: defaultMode,
  bands: defaultBands,
  min: defaultMin,
  max: defaultMax,
  gamma: defaultGamma,
  palette: null,
  split: comparisonTypes[0]
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
  configPanel.add(ui.Label('Sentinel1 visualisation', style.title));
  configPanel.add(ui.Label('by the CNES Earth Observation Lab', style.credit));
  // Description
  var descriptionText =
      'Let\'s interactively explore the Copernicus Sentinel1 collection ' +
      'with various display configurations. Compare two dates with ' +
      'a swipe display or draw geometries to plot their data.';
  configPanel.add(ui.Label(descriptionText, style.paragraph));
  // Configure the collection
  // ::::::::::::::::::::::::::::::::::::::::::::::::::::::
  var collectionSelect = ui.Select({
    items: Object.keys(collections),
    value: configParameters.collection
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
          ui.Label('Composition', style.label),
          mixSelect],
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
  var availableVisuConfigs = {
    "1 band (grayscale)": createBandSelectors(1), 
    "3 bands (RGB)": createBandSelectors(3)
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
    minTextbox.setValue(defaultMin);
    maxTextbox.setValue(defaultMax);
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
      configParameters.interval = intervalSelect.getValue();
      configParameters.mix = mixSelect.getValue();
      configParameters.mode = visuModeSelect.getValue();
      configParameters.min = parseFloat(minTextbox.getValue(), 10);
      configParameters.max = parseFloat(maxTextbox.getValue(), 10);
      configParameters.gamma = parseFloat(gammaTextbox.getValue(), 10);
      if(reversePaletteSelect.getValue()) {
        configParameters.palette = palette.colorbrewer[paletteSelect.getValue()][5].slice().reverse();
      } else {
        configParameters.palette = palette.colorbrewer[paletteSelect.getValue()][5];
      }
      var bands = availableVisuConfigs[visuModeSelect.getValue()].map(function(selector) {
          return selector.getValue();
        });
      configParameters.bands = bands;
      if(configParameters.split != activateSplitSelect.getValue()) {
        mapObject.onCompareChanged(activateSplitSelect.getValue());
      }
      configParameters.split = activateSplitSelect.getValue();
      mapObject.applyCallback(configParameters);
    }
  });
  configPanel.add(applyButton);
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
// Render image collections
// ------------------------------------------------------
// filter the collection according to a date and the configuration
function filterCollection(datestr, configParams) {
  var date = ee.Date(datestr);
  var collection = collections[configParams.collection].images
    .filter(ee.Filter.eq('instrumentMode', configParams.intrumentMode))
    .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
    .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
    .filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'))
    .filterDate(date, date.advance(configParams.interval, 'day'))
  return collection;
}
// Create the collection rendering according to the configuration
function getCompositeLayer(collection, configParams) {
  print(configParams);
  var config = {bands: configParams.bands, min: configParams.min, max: configParams.max, gamma: configParams.gamma};
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
        mapObject.onDateChanged();
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
mapObject.applyCallback = function(configParameters) {
  for(var i=0; i<mapObject.maps.length; i++) {
    mapObject.maps[i].layers().set(0, getCompositeLayer(
      filterCollection(mapObject.dateSelectors[i].getValue()[0], configParameters), configParameters));
  }
  mapObject.onDateChanged();
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
mapObject.onDateChanged = function() {
  var layer = mapObject.maps[0].layers().get(0);
  var map_link_id = layer.getEeObject().getMap(layer.getVisParams());
  urlLabel.setValue(map_link_id["urlFormat"]);
}
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
// set default date
var date = Date.now();
date = date - configParameters.interval * 86400000;
mapObject.dateSelectors.map(function(dateSelector){
  dateSelector.setValue(date, true);
});
// Center map on CNES Toulouse!
mapObject.maps[0].centerObject(cnes, 12);