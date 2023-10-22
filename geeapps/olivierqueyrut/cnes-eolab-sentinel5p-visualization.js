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
      "color": "#98ff00",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #98ff00 */ee.Geometry.Point([1.48, 43.56]);
// imports of external modules
var palette = require('users/olivierqueyrut/eolab:Palette');
var style = require('users/olivierqueyrut/eolab:CSSStyle');
/**
 * Collections to display :
 * - Sentinel5P Near Real-Time CO
 * - Sentinel5P Near Real-Time HCHO
 * - Sentinel5P Near Real-Time NO2
 * - Sentinel5P Near Real-Time O3
 * - Sentinel5P Near Real-Time SO2
 */
function createCollection(name) {
  // filter images with low cloudy pixel percentage and add a cloud mask
  return ee.ImageCollection(name);
}
var collections = {
  "Monoxyde Carbon (CO)": {
    nrt: "COPERNICUS/S5P/NRTI/L3_CO",
    ofl: "COPERNICUS/S5P/OFFL/L3_CO",
    band: 'CO_column_number_density',
    unit: "mmol/m²",
    min: 20,
    max: 40,
    scale: 1e3,
    start: '2018-11-22'
  },
  "Water vapor (H2O)": {
    nrt: "COPERNICUS/S5P/NRTI/L3_CO",
    ofl: "COPERNICUS/S5P/OFFL/L3_CO",
    band: 'H2O_column_number_density',
    unit: "mol/m²",
    min: 1000,
    max: 3000,
    scale: 1,
    start: '2018-11-22'
  },
  "Formaldehyde (HCHO)": {
    nrt: "COPERNICUS/S5P/NRTI/L3_HCHO",
    ofl: "COPERNICUS/S5P/OFFL/L3_HCHO",
    band: 'tropospheric_HCHO_column_number_density',
    unit: "µmol/m²",
    min: 0.0,
    max: 150,
    scale: 1e6,
    start: '2018-10-02'
  },
  "Nitrogen Dioxide (NO2)": {
    nrt: "COPERNICUS/S5P/NRTI/L3_NO2",
    ofl: "COPERNICUS/S5P/OFFL/L3_NO2",
    band: 'NO2_column_number_density',
    unit: "µmol/m²",
    min: 50,
    max: 300,
    scale: 1e6,
    start: '2018-07-10'
  },
  "Ozone (O3)": {
    nrt: "COPERNICUS/S5P/NRTI/L3_O3",
    ofl: "COPERNICUS/S5P/OFFL/L3_O3",
    band: 'O3_column_number_density',
    unit: "mmol/m²",
    min: 140,
    max: 180,
    scale: 1e3,
    start: '2018-07-10'
  },
  "Sulphur Dioxide (SO2)": {
    nrt: "COPERNICUS/S5P/NRTI/L3_SO2",
    ofl: "COPERNICUS/S5P/OFFL/L3_SO2",
    band: 'SO2_column_number_density',
    unit: "mol/m²",
    min: 0,
    max: 1,
    scale: 1e3,
    start: '2018-07-10'
  },
  "Methane (CH4)": {
    nrt: "COPERNICUS/S5P/OFFL/L3_CH4",
    ofl: "COPERNICUS/S5P/OFFL/L3_CH4",
    band: 'CH4_column_volume_mixing_ratio_dry_air',
    unit: "ppmV",
    min: 1800,
    max: 1900,
    scale: 1,
    start: '2019-02-08'
  },
  "Aerosol": {
    nrt: "COPERNICUS/S5P/NRTI/L3_AER_AI",
    ofl: "COPERNICUS/S5P/OFFL/L3_AER_AI",
    band: 'absorbing_aerosol_index',
    unit: "",
    min: -1,
    max: 2,
    scale: 1,
    start: '2018-07-10'
  }
};
var defaultCollection = "Nitrogen Dioxide (NO2)";
var nrtOflModes = ["Near real-time", "Offline"]
var functions = ["mosaic", "mean", "median"];
var chartTypes = ["Histogram", "Timeseries", "DayOfYear series"];
var defaultPalette = 'RdYlGn';
var modes = ["1 band (colormap)", "1 band (grayscale)"];
var comparisonTypes = ["No", "Compare (swipe display)", "Compare (side-by-side display)"];
// ------------------------------------------------------
// Create the config panel.
// ------------------------------------------------------
//  Object to store visu configuration parameters
var configParameters = {
  collection: defaultCollection,
  nrtOfl: nrtOflModes[0],
  mix: functions[1],
  interval: 30,
  mode: modes[0],
  band: collections[defaultCollection].band,
  min: collections[defaultCollection].min,
  max: collections[defaultCollection].max,
  unit: collections[defaultCollection].unit,
  scale: collections[defaultCollection].scale,
  palette: Array.from(palette.colorbrewer[defaultPalette][5]).reverse(),
  split: comparisonTypes[0],
  chartType: chartTypes[0],
  byRegion: true
};
function makeConfigPanel(mapObject) {
  var configPanel = ui.Panel({
    layout: ui.Panel.Layout.flow('vertical'),
    style: {
      width: '450px',
      height: '100%',
      stretch: 'horizontal',
      backgroundColor: style.colors.gray,
      border: style.border,
    }
  });
  // Title
  configPanel.add(ui.Label('Sentinel5P visualisation', style.title));
  configPanel.add(ui.Label('by the CNES Earth Observation Lab', style.credit));
  // Description
  var descriptionText =
      'Let\'s interactively explore the Sentinel5P collections ' +
      'with various display configurations. Compare two dates with '+
      'a swipe display or draw geometries to plot their data.';
  configPanel.add(ui.Label(descriptionText, style.paragraph));
  // Configure the collection
  // ::::::::::::::::::::::::::::::::::::::::::::::::::::::
  var collectionSelect = ui.Select({
    items: Object.keys(collections),
    value: configParameters.collection
  });
  var nrtOflSelect = ui.Select({
    items: nrtOflModes,
    value: configParameters.nrtOfl
  })
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
          collectionSelect,
          nrtOflSelect],
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
  var paletteSelect = ui.Select({
    items: Object.keys(palette.colorbrewer),
    value: defaultPalette
  });
  var paletteReverseCheckbox = ui.Checkbox({
    label: 'Reverse', 
    value: true,
    style: style.label
  });
  var visuBandConfigPanel = ui.Panel({layout: ui.Panel.Layout.flow('horizontal')});
  var visuModeSelect = ui.Select({
    items: modes,
    onChange: function(key) {
      visuBandConfigPanel.widgets().reset();
      if(key == modes[0]) {
        visuBandConfigPanel.add(ui.Label('Palette', style.label));
        visuBandConfigPanel.add(paletteSelect);
        visuBandConfigPanel.add(paletteReverseCheckbox);
      }
    }
  });
  visuConfigPanel.add(ui.Panel({
    widgets: [
      ui.Label('Mode', style.label),
      visuModeSelect,
      visuBandConfigPanel
    ],
    layout: ui.Panel.Layout.flow('horizontal')
  }));
  // set a default mode
  visuModeSelect.setValue(modes[0], true);
  // Min / Max
  var minTextbox = ui.Textbox({
    placeholder: 'Min',
    value: configParameters.min,
    style: {width: '100px'}
  });
  var maxTextbox = ui.Textbox({
    placeholder: 'Max',
    value: configParameters.max,
    style: {width: '100px'}
  });
  var unitLabel = ui.Label(configParameters.unit, style.label);
  visuConfigPanel.add(ui.Panel({
    widgets: [
      ui.Label('Range', style.label),
      minTextbox,
      ui.Label('-', style.label),
      maxTextbox,
      unitLabel],
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
  // Apply button
  // ::::::::::::::::::::::::::::::::::::::::::::::::::::::
  var applyButton = ui.Button({
    label: 'Apply',
    onClick: function() {
      if(configParameters.collection != collectionSelect.getValue()) {
        mapObject.onCollectionChanged(collectionSelect.getValue());
      }
      configParameters.collection = collectionSelect.getValue();
      configParameters.nrtOfl = nrtOflSelect.getValue();
      configParameters.interval = intervalSelect.getValue();
      configParameters.mix = mixSelect.getValue();
      configParameters.mode = visuModeSelect.getValue();
      configParameters.min = parseFloat(minTextbox.getValue(), 10);
      configParameters.max = parseFloat(maxTextbox.getValue(), 10);
      configParameters.unit = collections[configParameters.collection].unit;
      configParameters.scale = collections[configParameters.collection].scale;
      configParameters.palette = palette.colorbrewer[paletteSelect.getValue()][5];
      if(paletteReverseCheckbox.getValue()) {
        configParameters.palette = Array.from(configParameters.palette).reverse();
      }
      configParameters.band = collections[configParameters.collection].band;
      if(configParameters.split != activateSplitSelect.getValue()) {
        mapObject.onSplitChanged(activateSplitSelect.getValue());
      }
      configParameters.split = activateSplitSelect.getValue();
      mapObject.applyCallback(configParameters);
    }
  });
  configPanel.add(applyButton);
  // Handle collection change
  // ::::::::::::::::::::::::::::::::::::::::::::::::::::::
  collectionSelect.onChange(function(value) {
    minTextbox.setValue(collections[value].min);
    maxTextbox.setValue(collections[value].max);
    unitLabel.setValue(collections[value].unit);
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
  var byRegionCheckbox = ui.Checkbox({
    label: "by region",
    value: true,
    style: style.labelNoPadding
  });
  byRegionCheckbox.style().set("shown", configParameters.chartType != chartTypes[0])
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
    byRegionCheckbox.style().set("shown", item != chartTypes[0])
    mapObject.drawingCallback();
  });
  byRegionCheckbox.onChange(function(value){
    configParameters.byRegion = value;
    mapObject.drawingCallback();
  });
  // create the chart panel and link it to the drawing tools
  var controlPanel = ui.Panel({
    widgets: [
      ui.Label("Chart type", style.labelNoPadding),
      chartTypeSelect,
      byRegionCheckbox,
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
  var collectionName = collections[configParams.collection].nrt;
  if(configParameters.nrtOfl == nrtOflModes[1]) {
    collectionName = collections[configParams.collection].ofl;
  }
  var collection = ee.ImageCollection(collectionName).select([configParameters.band])
    .filterDate(date, date.advance(configParams.interval, 'day'))
    .map(function(image) { 
      return image.multiply(configParams.scale).copyProperties(image, ["system:time_start"]);
    });
  return collection;
}
// Create the collection rendering according to the configuration
function getCompositeLayer(collection, configParams) {
  var config = {bands: [configParams.band], min: configParams.min, max: configParams.max, opacity: 0.6};
  if(configParams.mode == modes[0]){
    config.palette = configParams.palette;
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
  return ui.Map.Layer(collection, config);
}
// ------------------------------------------------------
// Create the map panel.
// ------------------------------------------------------
function makeLegend() {
  var visParams = {min: configParameters.min, max: configParameters.max, palette: configParameters.palette};
  // set legend position of panel
  var legend = ui.Panel({
    style: { 
      position: 'bottom-right'
    }
  });
  legend.add(ui.Label(visParams.max + ' ' + configParameters.unit, style.label));
  // create the legend image
  var lat = ee.Image.pixelLonLat().select('latitude');
  var gradient = lat.multiply((visParams.max-visParams.min)/100.0).add(visParams.min);
  var legendImage = gradient.visualize(visParams);
  // create thumbnail from the image
  legend.add(ui.Thumbnail({
    image: legendImage,
    params: {bbox:'0,0,10,100', dimensions:'20x100'},
    style: {padding: '0px 0px 0px 30px', position: 'bottom-left'}
  }));
  legend.add(ui.Label(visParams.min + ' ' + configParameters.unit, style.label));
  return legend;
}
function makeMaps(comparisonType) {
  // Create the maps
  var maps = [ui.Map()];
  // configure first map
  var drawingTools = maps[0].drawingTools();
  drawingTools.setLinked(false);
  maps[0].setControlVisibility({all: true, mapTypeControl: false, zoomControl: false});
  maps[0].setOptions('mapStyle', {mapStyle: style.map});
  // if split, create and configure second map  
  if(comparisonType != comparisonTypes[0]){
    maps.push(ui.Map());
    maps[1].setControlVisibility({all: true, mapTypeControl: false, zoomControl: false, drawingToolsControl: false});
    maps[1].setOptions('mapStyle', {mapStyle: style.map});
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
mapObject.maps = makeMaps(false);
mapObject.legend = makeLegend();
mapObject.dateSelectors = makeDateSelectors(mapObject.maps);
mapObject.chartPanel = makeChartPanel(mapObject.maps[0]);
mapObject.applyCallback = function(configParameters) {
  for(var i=0; i<mapObject.maps.length; i++) {
    mapObject.maps[i].layers().set(0, getCompositeLayer(
      filterCollection(mapObject.dateSelectors[i].getValue()[0], configParameters), configParameters));
  }
  // remove old legend
  mapObject.maps[mapObject.maps.length-1].remove(mapObject.legend);
  mapObject.legend = makeLegend();
  mapObject.maps[mapObject.maps.length-1].add(mapObject.legend);
  // update chart
  mapObject.drawingCallback();
};
mapObject.onCollectionChanged = function(collection) {
  mapObject.dateSelectors.forEach(function(dateSelector) {
    dateSelector.setStart(collections[collection].start);
  });
};
mapObject.onSplitChanged = function(comparisonType) {
  var center = mapObject.maps[0].getCenter();
  var zoom = mapObject.maps[0].getZoom();
  var currentDate = mapObject.dateSelectors[0].getValue()[0];
  // recreate the maps
  mapObject.maps = makeMaps(comparisonType);
  mapObject.dateSelectors = makeDateSelectors(mapObject.maps);
  mapObject.chartPanel = makeChartPanel(mapObject.maps[0]);
  mapObject.addDrawingListeners();
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
  if(configParameters.chartType == chartTypes[1] || configParameters.chartType == chartTypes[2]) {
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
  images = images.map(function(image) {
    return image.select([configParameters.band]);
  });
  // Create charts
  geometriesCollection.geometry(10).area(10).evaluate(function(area, failure) {
    var scale = Math.ceil(area / 1e7);
    var charts;
    var titles;
    var series = null;
    if(configParameters.chartType == chartTypes[0]){
      // Histogram
      charts = [ui.Chart.image.histogram({
        image: images, 
        region: geometriesCollection, 
        scale: scale
      })];
    } else if(configParameters.chartType == chartTypes[1]) {
      // Time series
      charts = images.map(function(image) {
        if(configParameters.byRegion) {
          return ui.Chart.image.seriesByRegion({
            imageCollection: image, 
            regions: geometriesCollection,
            reducer: ee.Reducer.mean(),
            scale: scale,
            xProperty: "system:time_start",
            seriesProperty: "label"
          });
        } else {
          return ui.Chart.image.series({
            imageCollection: image, 
            region: geometriesCollection,
            scale: scale,
            xProperty: "system:time_start"
          });
        }
      });
    } else {
      // Day of year series
      if(configParameters.byRegion) {
        charts = images.map(function(image) {
          return ui.Chart.image.doySeriesByRegion({
            imageCollection: image,
            bandName: configParameters.band,
            regions: geometriesCollection, 
            regionReducer: ee.Reducer.mean(),
            scale: scale,
            seriesProperty: 'label'
          });
        });
      } else {
        var joined = configParameters.split ? images[0].merge(images[1]) : images[0];
        // DOY series
        charts = [ui.Chart.image.doySeriesByYear({
          imageCollection: joined, 
          bandName: configParameters.band,
          region: geometriesCollection,
          scale: scale
        })];
      }
    }
    // configure charts
    if(configParameters.chartType == chartTypes[0]) {
      // Configure rendering of charts and add them to chartPanel
      titles = ['Histogram of ' + configParameters.band];
      series = configParameters.split? [{labelInLegend: "left"}, {labelInLegend: "right"}]:[{visibleInLegend: false}];
    } 
    else if(configParameters.chartType == chartTypes[1]) {
      titles = [
        'Time series' + (configParameters.split?' (left)':' of '+configParameters.band),
        'Time series (right)'];
      if(configParameters.byRegion) {
        series = drawingTools.layers().map(function(layer) {
          return {color: layer.getColor()};
        });
      }
    } else {
      if(configParameters.byRegion) {
        titles = [
          'DayOfYear series' + (configParameters.split?' (left)':' of '+configParameters.band),
          'DayOfYear series (right)'];
        series = drawingTools.layers().map(function(layer) {
          return {color: layer.getColor()};
        });
      } else {
        titles = ['DayOfYear series of ' + configParameters.band];
      }
    }
    mapObject.chartPanel.clear();
    for(var i=0; i<charts.length; i++){
      charts[i].setOptions({
        title: titles[i],
        series: series
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
// ------------------------------------------------------
// Tie everything together.
// ------------------------------------------------------
var configPanel = makeConfigPanel(mapObject);
mapObject.maps[mapObject.maps.length-1].add(mapObject.legend);
var mainPanel = ui.SplitPanel(
  makeConfigPanel(mapObject), 
  ui.Panel(mapObject.maps[0])
);
// Use a SplitPanel so it's possible to resize the two panels.
ui.root.clear();
ui.root.add(mainPanel);
// activate the drawing listeners
mapObject.addDrawingListeners();
// set default date
var date = Date.now();
date = date - configParameters.interval * 86400000;
mapObject.dateSelectors.map(function(dateSelector){
  dateSelector.setValue(date, true);
});
// Center map on CNES Toulouse!
mapObject.maps[0].centerObject(cnes, 7);