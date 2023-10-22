var s2 = ui.import && ui.import("s2", "imageCollection", {
      "id": "COPERNICUS/S2_SR"
    }) || ee.ImageCollection("COPERNICUS/S2_SR"),
    l8 = ui.import && ui.import("l8", "imageCollection", {
      "id": "LANDSAT/LC08/C02/T1_L2"
    }) || ee.ImageCollection("LANDSAT/LC08/C02/T1_L2"),
    l9 = ui.import && ui.import("l9", "imageCollection", {
      "id": "LANDSAT/LC09/C02/T1_L2"
    }) || ee.ImageCollection("LANDSAT/LC09/C02/T1_L2"),
    gaul0 = ui.import && ui.import("gaul0", "table", {
      "id": "FAO/GAUL/2015/level0"
    }) || ee.FeatureCollection("FAO/GAUL/2015/level0"),
    ps = ui.import && ui.import("ps", "imageCollection", {
      "id": "projects/ee-ramiqcomugm/assets/planetscope"
    }) || ee.ImageCollection("projects/ee-ramiqcomugm/assets/planetscope"),
    l5 = ui.import && ui.import("l5", "imageCollection", {
      "id": "LANDSAT/LT05/C02/T1_L2"
    }) || ee.ImageCollection("LANDSAT/LT05/C02/T1_L2"),
    l4 = ui.import && ui.import("l4", "imageCollection", {
      "id": "LANDSAT/LT04/C02/T1_L2"
    }) || ee.ImageCollection("LANDSAT/LT04/C02/T1_L2"),
    l7 = ui.import && ui.import("l7", "imageCollection", {
      "id": "LANDSAT/LE07/C02/T1_L2"
    }) || ee.ImageCollection("LANDSAT/LE07/C02/T1_L2"),
    ps2 = ui.import && ui.import("ps2", "imageCollection", {
      "id": "projects/ramiqcom-planetscope/assets/planetscope"
    }) || ee.ImageCollection("projects/ramiqcom-planetscope/assets/planetscope"),
    ps3 = ui.import && ui.import("ps3", "imageCollection", {
      "id": "projects/ramiqcom-planetscope-2/assets/planetscope"
    }) || ee.ImageCollection("projects/ramiqcom-planetscope-2/assets/planetscope");
// Module for visualization
function visStretch(image, bands, percentMin, percentMax, scale){
  percentMin = typeof percentMin !== 'undefined' ? percentMin : 2;
  percentMax = typeof percentMax !== 'undefined' ? percentMax : 98;
  scale = typeof scale !== 'undefined' ? scale : 1000;
  var r = bands[0];
  var g = bands[1];
  var b = bands[2];
  var geom = image.geometry();
  var min = image.reduceRegion({
    reducer: ee.Reducer.percentile([percentMin]),
    geometry: geom,
    scale: scale,
    bestEffort: true,
  });
  var max = image.reduceRegion({
    reducer: ee.Reducer.percentile([percentMax]),
    geometry: geom,
    scale: scale,
    bestEffort: true,
  });
  var minR = min.get(r);
  var minG = min.get(g);
  var minB = min.get(b);
  var maxR = max.get(r);
  var maxG = max.get(g);
  var maxB = max.get(b);
  return ee.Dictionary({bands: [r, g, b], min: [minR, minG, minB], max: [maxR, maxG, maxB]});
}
// Legend tools to make legend panel
var legendTool = require('users/ramiqcom/ugm:tools/legend');
var legendCategory = legendTool.legendDiscrete;
var legendColormap = legendTool.legendGradient;
// Panel for interface
var panel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical', true),
  style: {position: 'top-right', width: '400px', padding: '15px'}
});
ui.root.add(panel);
// Map title
var title = ui.Label({
  style: {fontWeight: 'bold', fontSize: '20px', padding: '20px 0', color: 'DodgerBlue'},
  value: 'Remote Sensing Quick Analysis v0.2',
});
panel.add(title);
// Collection section
var colSection = ui.Label({
  style: {fontWeight: 'bold', color: 'black'},
  value: 'Collection selection',
});
panel.add(colSection);
// Select satellite collection
var selectCol = ui.Select({
  items: ['Landsat OLI', 'Landsat TM & ETM+', 'Sentinel-2', 'Planetscope'],
  value: 'Sentinel-2',
  placeholder: 'Select collection',
  style: {stretch: 'horizontal'},
  onChange: function(value){
    colStart(value);
    colBand(value);
    if(value == 'Planetscope'){
      cloudMaskingCheck.setValue(false);
    } else {
      cloudMaskingCheck.setValue(true);
    }
  }
});
panel.add(selectCol);
// Aoi section
var aoiSection = ui.Label({
  style: {fontWeight: 'bold', color: 'black'},
  value: 'Area of interest filter',
});
panel.add(aoiSection);
// AOI select button
var aoiSelect = ui.Select({
  placeholder: 'Select AOI',
  items: ['Map bounds', 'Draw AOI', 'GeoJSON'],
  value: 'Map bounds',
  style: {stretch: 'horizontal'},
  onChange: function(value){
    if (value == 'Draw AOI'){
      drawAoiSelect.style().set('shown', true);
      geojsonTextbox.style().set('shown', false);
    } else if (value == 'GeoJSON'){
      geojsonTextbox.style().set('shown', true);
      drawAoiSelect.style().set('shown', false);
    } else {
      geojsonTextbox.style().set('shown', false);
      drawAoiSelect.style().set('shown', false);
    }
    if (value == 'Draw AOI' && drawAoiSelect.getValue() === null){
      showImagesButton.setDisabled(true);
    } else if (value == 'GeoJSON' && geojsonTextbox.getValue() === undefined) {
      showImagesButton.setDisabled(true);
    } else {
      showImagesButton.setDisabled(false);
    }
  }
});
panel.add(aoiSelect);
// Draw AOI select
var drawAoiSelect = ui.Select({
  placeholder: 'Draw or select an AOI',
  style: {stretch: 'horizontal', shown: false},
  onChange: function(value){
    if (aoiSelect.getValue() == 'Draw AOI' && drawAoiSelect.getValue() === null){
      showImagesButton.setDisabled(true);
    } else if (aoiSelect.getValue() == 'GeoJSON' && geojsonTextbox.getValue() === undefined) {
      showImagesButton.setDisabled(true);
    } else {
      showImagesButton.setDisabled(false);
    }
  }
});
panel.add(drawAoiSelect);
// Textbox to add geojson string
var geojsonTextbox = ui.Textbox({
  placeholder: 'Paste GeoJSON string here!',
  style: {stretch: 'horizontal', shown: false},
  onChange: function(value){
    if (aoiSelect.getValue() == 'Draw AOI' && drawAoiSelect.getValue() === null){
      showImagesButton.setDisabled(true);
    } else if (aoiSelect.getValue() == 'GeoJSON' && geojsonTextbox.getValue() === undefined) {
      showImagesButton.setDisabled(true);
    } else {
      showImagesButton.setDisabled(false);
    }
  }
});
panel.add(geojsonTextbox);
// Date section
var dateCheck = ui.Checkbox({
  style: {fontWeight: 'bold', color: 'black'},
  label: 'Period filter',
  value: true,
  onChange: function(value){
    if (value === true){
      startDateText.setDisabled(false);
      endDateText.setDisabled(false);
      doyStart.setDisabled(false);
      doyEnd.setDisabled(false);
    } else {
      startDateText.setDisabled(true);
      endDateText.setDisabled(true);
      doyStart.setDisabled(true);
      doyEnd.setDisabled(true);
    }
  }
});
panel.add(dateCheck);
// Period panel
var periodPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal', true),
  style: {position: 'top-right'}
});
panel.add(periodPanel);
// Filter date textbox
var startDateText = ui.Textbox({
  style: {stretch: 'horizontal'},
  value: '2022-01-01',
  placeholder: 'Start date in yyyy-mm-dd',
});
periodPanel.add(startDateText);
var endDateText = ui.Textbox({
  style: {stretch: 'horizontal'},
  value: '2022-12-31',
  placeholder: 'End date in yyyy-mm-dd',
});
periodPanel.add(endDateText);
var doyStart = ui.Textbox({
  style: {stretch: 'horizontal', width: '50px'},
  value: 1,
  placeholder: 'Day filter (1-365)',
});
periodPanel.add(doyStart);
var doyEnd = ui.Textbox({
  style: {stretch: 'horizontal', width: '50px'},
  value: 365,
  placeholder: 'Day filter (1-365)',
});
periodPanel.add(doyEnd);
// Cloud panel
var cloudPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal', true),
  style: {position: 'top-right'}
});
panel.add(cloudPanel);
// Cloud check
var cloudCheck = ui.Checkbox({
  label: 'Cloud filter %',
  value: true,
  style: {stretch: 'horizontal', fontWeight: 'bold'},
  onChange: function(value){
    cloudSlider.setDisabled(!value);
  }
});
cloudPanel.add(cloudCheck);
// Create cloud slider
var cloudSlider = ui.Slider({
  min: 0,
  max: 100,
  value: 50,
  step: 1,
  style: {width: '200px'}
});
cloudPanel.add(cloudSlider);
// Preprocessing section
var preSection = ui.Label({
  value: 'Preprocessing',
  style: {fontWeight: 'bold', color: 'black'}
});
panel.add(preSection);
// Preprocessing panel
var prePanel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal', true),
  style: {position: 'top-right'}
});
panel.add(prePanel);
// Cloud masking
var cloudMaskingCheck = ui.Checkbox({
  label: 'Cloud masking',
  value: true,
});
prePanel.add(cloudMaskingCheck);
// Topographic correction
var topographicCheck = ui.Checkbox({
  label: 'SCS+C',
  value: false,
  style: {shown: false}
});
prePanel.add(topographicCheck);
// BRDF
var brdfCheck = ui.Checkbox({
  label: 'BRDF',
  value: false,
});
prePanel.add(brdfCheck);
// Visualization sectipn
var visSection = ui.Label({
  style: {fontWeight: 'bold', color: 'black'},
  value: 'Image visualization',
});
panel.add(visSection);
// Panel for band
var bandPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal', true),
  style: {position: 'top-right'}
});
panel.add(bandPanel);
// RGB channel for visualization
var bandSelectRed = ui.Select({
  items: ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B8A', 'B9', 'B11', 'B12'],
  value: 'B8',
});
bandPanel.add(bandSelectRed);
var bandSelectGreen = ui.Select({
  items: ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B8A', 'B9', 'B11', 'B12'],
  value: 'B11',
});
bandPanel.add(bandSelectGreen);
var bandSelectBlue = ui.Select({
  items: ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B8A', 'B9', 'B11', 'B12'],
  value: 'B2',
});
bandPanel.add(bandSelectBlue);
// Min max percentile for visualization
var minTextbox = ui.Textbox({
  placeholder: 'Min%',
  style: {stretch: 'horizontal'},
  value: 2,
});
bandPanel.add(minTextbox);
var maxTextbox = ui.Textbox({
  placeholder: 'Max%',
  style: {stretch: 'horizontal'},
  value: 98,
});
bandPanel.add(maxTextbox);
// Button to show the images
var showImagesButton = ui.Button({
  label: 'Show Images',
  style: {stretch: 'horizontal'},
  onClick: showImages,
});
panel.add(showImagesButton);
// Index sectipn
var indexSection = ui.Label({
  style: {fontWeight: 'bold', color: 'black'},
  value: 'Spectral indices',
});
panel.add(indexSection);
// Index panel
var indexPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal', true),
  style: {position: 'top-right'}
});
panel.add(indexPanel);
// Index selection
var indexSelect = ui.Select({
  items: ['NDVI', 'NDBI', 'MNDWI', 'Custom'],
  placeholder: 'Select Index',
  value: 'NDVI',
  style: {},
  onChange: function(value){
    if (value == 'Custom') {
      indexButton.setDisabled(true);
      indexTextbox.style().set({shown: true});
    } else {
      indexButton.setDisabled(false);
      indexTextbox.style().set({shown: false});
    }
  }
});
indexPanel.add(indexSelect);
// Index colormap
var indexColormap = ui.Select({
  items: ['red-white-blue', 'red-yellow-green', 'blue-white-green', 'blue-white-red', 'green-yellow-red', 'green-white-blue'],
  value: 'red-yellow-green'
});
indexPanel.add(indexColormap);
// Min max percentile for visualization
var minIndexTextbox = ui.Textbox({
  placeholder: 'Min%',
  style: {stretch: 'horizontal'},
  value: 0,
});
indexPanel.add(minIndexTextbox);
var maxIndexTextbox = ui.Textbox({
  placeholder: 'Max%',
  style: {stretch: 'horizontal'},
  value: 100,
});
indexPanel.add(maxIndexTextbox);
// Index formula
var indexTextbox = ui.Textbox({
  placeholder: 'e.g: (B8 - B4) / (B8 + B4)',
  style: {shown: false, stretch: 'horizontal'},
  onChange: function(value){
    if(value === null || value === undefined){
      indexButton.setDisabled(true);
    }
  }
});
panel.add(indexTextbox);
// Show index button
var indexButton = ui.Button({
  label: 'Show index',
  style: {stretch: 'horizontal'},
  disabled: true,
  onClick: function(){
    showIndex();
  }
});
panel.add(indexButton);
// Advanded sectipn
var advancedSection = ui.Label({
  style: {fontWeight: 'bold', color: 'black'},
  value: 'Advanced analysis menu',
});
panel.add(advancedSection);
// Selection for advanced analysis
var advancedAnalysisButton = ui.Button({
  label: 'Advanced analysis',
  disabled: true,
  style: {stretch: 'horizontal'},
  onClick: function(){
    panel.style().set('shown', false);
    advancedPanel.style().set('shown', true);
  }
});
panel.add(advancedAnalysisButton);
// Unsupervised classification panel
var advancedPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical', true),
  style: {position: 'top-right', width: '400px', shown: false, padding: '15px'}
});
ui.root.add(advancedPanel);
// Back to main panel button
var backButton = ui.Button({
  label: '<',
  onClick: function(){
    panel.style().set('shown', true);
    advancedPanel.style().set('shown', false);
    drawMode(['rectangle', 'polygon']);
  }
});
advancedPanel.add(backButton);
// Advanced analysis select
var analysisSelect = ui.Select({
  items: ['PCA', 'Tasseled cap', 'Supervised classification', 'Unsupervised classification', 'OBIA', 'Time-series'],
  placeholder: 'Select analysis',
  style: {stretch: 'horizontal'},
  onChange: function(value){
    advance(value);
  }
});
advancedPanel.add(analysisSelect);
// Button to clear layer
var clearButton = ui.Button({
  label: 'Clear map',
  style: {stretch: 'horizontal'},
  onClick: function(){
    resetMap();
  }
});
panel.add(clearButton);
// Please wait label
var loadingLabel = ui.Label({
  value: 'Loading...',
  style: {color: 'blue', fontSize: 30, fontWeight: 'bold', position: 'bottom-center'}
});
// Start the application
resetMap();
// Zoom to location
myLocation();
// Function to zoom location or Indonesia
function myLocation(){
  // Select Indonesia map for center object
  var indonesia = gaul0.filter(ee.Filter.eq('ADM0_NAME', 'Indonesia'));
  // Function to get user position or center in indonesia
  function current_position(point) {
    Map.centerObject(point, 10);
  }
  function oops(error) {
    Map.centerObject(indonesia, 5);
  }
  ui.util.getCurrentPosition(current_position, oops);
}
// Function to change draw mode
function drawMode(mode){
  Map.drawingTools().setDrawModes(mode);
}
// Function to start map
function resetMap(){
  // Clear map
  Map.widgets().reset();
  Map.layers().reset();
  // Map option button
  var mapOptionSelect = ui.Select({
    placeholder: 'Select map',
    items: ['ROADMAP', 'SATELLITE', 'HYBRID', 'TERRAIN'],
    value: 'ROADMAP',
    style: {margin: '0', padding: '0', position: 'top-center'},
    onChange: function(value){
      Map.setOptions(value);
    }
  });
  Map.add(mapOptionSelect);
  Map.setOptions(mapOptionSelect.getValue());
  // Change cursor
  Map.style().set({cursor: 'crosshair'});
  // Change map view
  Map.setControlVisibility({
    all: false,
    scaleControl: true,
    fullscreenControl: true,
    layerList: true,
    drawingToolsControl: true
  });
  // Set drawing tools to only be rectangle and not linked to script
  Map.drawingTools().setDrawModes(['rectangle', 'polygon']).setLinked(false);
  // Set geometry to hide after each function
  Map.drawingTools().layers().forEach(function(obj){
    obj.setShown(false);
  });
}
// Function for period per collection
function colStart(value){
  switch(value){
    case 'Landsat OLI':
      startDateText.setValue('2022-01-01');
      endDateText.setValue('2022-12-31');
      topographicCheck.style().set('shown', true);
      break;
    case 'Sentinel-2':
      startDateText.setValue('2022-01-01');
      endDateText.setValue('2022-12-31');
      topographicCheck.style().set('shown', false);
      break;
    case 'Planetscope':
      startDateText.setValue('2022-01-01');
      endDateText.setValue('2022-12-31');
      topographicCheck.style().set('shown', false);
      break;
    case 'Landsat TM & ETM+':
      startDateText.setValue('2010-01-01');
      endDateText.setValue('2010-12-31');
      topographicCheck.style().set('shown', true);
      break;
  }
}
// Function for band names for each collection
function colBand(value){
  var bandNames;
  var red;
  var green;
  var blue;
  switch(value){
    case 'Landsat OLI':
      bandNames = ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7'];
      red = 'B5';
      green = 'B6';
      blue = 'B2';
      break;
    case 'Sentinel-2':
      bandNames = ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B8A', 'B9', 'B11', 'B12'];
      red = 'B8';
      green = 'B11';
      blue = 'B2'; 
      break;
    case 'Planetscope':
      bandNames = ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8'];
      red = 'B8';
      green = 'B7';
      blue = 'B2'; 
      break;
    case 'Landsat TM & ETM+':
      bandNames = ['B1', 'B2', 'B3', 'B4', 'B5', 'B7'];
      red = 'B4';
      green = 'B5';
      blue = 'B2';
      break;
  }
  bandSelectRed.setDisabled(true);
  bandSelectGreen.setDisabled(true);
  bandSelectBlue.setDisabled(true);
  bandSelectRed.items().reset(bandNames);
  bandSelectGreen.items().reset(bandNames); 
  bandSelectBlue.items().reset(bandNames);
  bandSelectRed.setValue(red);
  bandSelectGreen.setValue(green);
  bandSelectBlue.setValue(blue);
  bandSelectRed.setDisabled(false);
  bandSelectGreen.setDisabled(false);
  bandSelectBlue.setDisabled(false);
}
// Drawing tools function
function draw(widget){
  // Drawing tools
  var drawingTools = Map.drawingTools();
  // Function when drawing tools change
  function change() {
    var layer = drawingTools.layers();
    var name = layer.getJsArray().map(function(obj){
      var objName = obj.getName();
      return objName;
    });
    widget.items().reset(name);
  }
  change();
  // Applying change function to drawing tools
  drawingTools.onLayerAdd(change);
  drawingTools.onLayerRemove(change);
}
draw(drawAoiSelect);
// Function to get map bounds as geometry
function boundsGeom(){
  var bounds = ee.Geometry(Map.getBounds(true));
  return bounds;
}
// Function to return draw aoi as geometry
function drawGeometry(widget){
  var geomName = widget.getValue();
  var layer = ee.FeatureCollection(Map.drawingTools().layers().getJsArray().map(function(obj){
    var name = obj.getName();
    return ee.Feature(obj.getEeObject()).set({'name': name});
  }));
  var geom = layer.filter(ee.Filter.eq('name', geomName)).first().geometry();
  return geom;
}
// Function to get a final AOI
function aoi(){
  var geom;
  var aoiStatus = aoiSelect.getValue();
  switch (aoiStatus){
    case 'Map bounds':
      geom = boundsGeom();
      break;
    case 'Draw AOI':
      geom = drawGeometry(drawAoiSelect);
      break;
    case 'GeoJSON':
      geom = geojson();
      break;
  }
  return geom;
}
// Function to have a geometry with geojson
function geojson(){
  var string = geojsonTextbox.getValue();
  var jsonString = JSON.parse(string);
  var geometryJSON = ee.FeatureCollection(jsonString).geometry();
  return geometryJSON;
}
// Function to get start and end date
function date(){
  var start = startDateText.getValue();
  var end = endDateText.getValue();
  var periodStatus = dateCheck.getValue();
  if (periodStatus === false && selectCol.getValue() == 'Sentinel-2'){
    start = '2018-01-01';
    end = Date.now();
  } else if (periodStatus === false && selectCol.getValue() == 'Landsat OLI'){
    start = '2013-01-01';
    end = Date.now();
  } else if (periodStatus === false && selectCol.getValue() == 'Landsat TM & ETM+'){
    start = '1982-08-22';
    end = '2012-05-05';
  } else if (periodStatus === false && selectCol.getValue() == 'Planetscope'){
    start = '2022-09-01';
    end = '2022-10-31';
  }
  return {start: start, end: end};
}
// Function to get doy
function doy(){
  var doyStartValue = Number(doyStart.getValue());
  var doyEndValue = Number(doyEnd.getValue());
  if (dateCheck.getValue() === false){
    doyStartValue = 1;
    doyEndValue = 365;
  }
  return {start: doyStartValue, end: doyEndValue};
}
// Function to get rgb band
function bands(){
  var red = bandSelectRed.getValue();
  var green = bandSelectGreen.getValue();
  var blue = bandSelectBlue.getValue();
  return [red, green, blue];
}
// Function to get cloud percentage
function cloud(){
  var cloudValue = cloudSlider.getValue();
  var cloudStatus = cloudCheck.getValue();
  if (cloudStatus === false){
    cloudValue = 100;
  }
  return cloudValue;
}
// Function to get landsat images
function landsatImages(){
  var bounds = aoi();
  var startDate = date().start;
  var endDate = date().end;
  var cloudLim = cloud();
  var doyStart = doy().start;
  var doyEnd = doy().end;
  var imagesl8 = l8.filterBounds(bounds)
    .filterDate(startDate, endDate)
    .filter(ee.Filter.dayOfYear(doyStart, doyEnd))
    .filter(ee.Filter.lte('CLOUD_COVER', cloudLim));
  var imagesl9 = l9.filterBounds(bounds)
    .filterDate(startDate, endDate)
    .filter(ee.Filter.dayOfYear(doyStart, doyEnd))
    .filter(ee.Filter.lte('CLOUD_COVER', cloudLim));
  var images = imagesl8.merge(imagesl9).sort('system:time_start');
  function cloudMask(image) {
    var qa = image.select('QA_PIXEL');
    var cloud = 1 << 3;
    var dilated = 1 << 1;
    var shadow = 1 << 4;
    var cirrus = 1 << 2;
    var mask = qa.bitwiseAnd(cloud).eq(0)
      .and(qa.bitwiseAnd(cirrus).eq(0))
      .and(qa.bitwiseAnd(dilated).eq(0))
      .and(qa.bitwiseAnd(shadow).eq(0));
    var masked = image.updateMask(mask);
    return masked;
  }
  var finalImages = images;
  if (topographicCheck.getValue() === true){
    finalImages = finalImages.map(topoCorrection);
  }
  if (brdfCheck.getValue() === true){
    finalImages = finalImages.select(['SR_B.*']).map(brdfCorrection);
  }
  if (cloudMaskingCheck.getValue() === true){
    finalImages = finalImages.combine(images.select('QA_PIXEL')).map(cloudMask);
  }
  var bandRenamed = finalImages.select(['SR_B.*'], ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7']);
  return bandRenamed;
}
// Function to get landsat tm & etm+ images
function landsatTMImages(){
  var bounds = aoi();
  var startDate = date().start;
  var endDate = date().end;
  var cloudLim = cloud();
  var doyStart = doy().start;
  var doyEnd = doy().end;
  var imagesl4 = l4.filterBounds(bounds)
    .filterDate(startDate, endDate)
    .filter(ee.Filter.dayOfYear(doyStart, doyEnd))
    .filter(ee.Filter.lte('CLOUD_COVER', cloudLim));
  var imagesl5 = l5.filterBounds(bounds)
    .filterDate(startDate, endDate)
    .filter(ee.Filter.dayOfYear(doyStart, doyEnd))
    .filter(ee.Filter.lte('CLOUD_COVER', cloudLim));
  var imagesl7 = l7.filterBounds(bounds)
    .filterDate(startDate, endDate)
    .filter(ee.Filter.dayOfYear(doyStart, doyEnd))
    .filter(ee.Filter.lte('CLOUD_COVER', cloudLim));
  var images = imagesl4.merge(imagesl5).merge(imagesl7).sort('system:time_start');
  function cloudMask(image) {
    var qa = image.select('QA_PIXEL');
    var cloud = 1 << 3;
    var dilated = 1 << 1;
    var shadow = 1 << 4;
    var mask = qa.bitwiseAnd(cloud).eq(0)
      .and(qa.bitwiseAnd(dilated).eq(0))
      .and(qa.bitwiseAnd(shadow).eq(0));
    var masked = image.updateMask(mask);
    return masked;
  }
  var finalImages = images;
  if (topographicCheck.getValue() === true){
    finalImages = finalImages.map(topoCorrection);
  }
  if (brdfCheck.getValue() === true){
    finalImages = finalImages.select(['SR_B.*']).map(brdfCorrection);
  }
  if (cloudMaskingCheck.getValue() === true){
    finalImages = finalImages.combine(images.select('QA_PIXEL')).map(cloudMask);
  }
  var bandRenamed = finalImages.select(['SR_B.*'], ['B1', 'B2', 'B3', 'B4', 'B5', 'B7']);
  return bandRenamed;
}
// Topographic Correction Function
function topoCorrection(image){
  var imageGeom = ee.Geometry(image.geometry());
  var pi = ee.Number(3.14159265359);
  var solarZenithAngle = ee.Image.constant(ee.Number(image.get('SUN_ELEVATION'))).subtract(90).clip(imageGeom);
  var solarAzimuthAngle = ee.Image.constant(ee.Number(image.get('SUN_AZIMUTH'))).clip(imageGeom);
  var zenithRad = solarZenithAngle.multiply(pi).divide(180);
  var azimuthRad = solarAzimuthAngle.multiply(pi).divide(180);
  var dem = ee.Image("USGS/SRTMGL1_003").select('elevation');
  var slope = ee.Terrain.slope(dem).rename('Slope');
  var slopeRad = slope.multiply(pi).divide(180);
  var aspectRad = ee.Terrain.aspect(dem).rename('Aspect').multiply(pi).divide(180);
  var cosZenith = zenithRad.cos().rename('Cos_Zenith');
  var cosSlope = slopeRad.cos().rename('Cos_Slope');
  var slopeIllumination = cosZenith.multiply(cosSlope);
  var sinZenith = zenithRad.sin();
  var sinSlope = slopeRad.sin();
  var cosAzimuthDiff = azimuthRad.subtract(aspectRad).cos();
  var aspectIllumination = sinZenith.multiply(sinSlope).multiply(cosAzimuthDiff);
  var ic = slopeIllumination.add(aspectIllumination).rename('IC');
  var imageIllumination = image.addBands([slope, cosZenith, cosSlope, ic]);
  var mask = imageIllumination.select('Slope').gte(5)
    .and(imageIllumination.select('IC').gte(0))
    .and(imageIllumination.select('SR_B5').gt(-0.1));
  var imageMasked = imageIllumination.updateMask(mask);
  function mapBand(band){
    var regression = imageMasked.select(['IC', band]).reduceRegion({
      reducer: ee.Reducer.linearFit(),
      geometry: imageGeom,
      scale: 1000,
      bestEffort: true
    });
    var corrected = ee.Algorithms.If(
      regression.get('offset'),
      ee.Image().expression('(L * (cosAlpha * cosTheta + C) / (cosI + C))',
        {
          'L': imageMasked.select(band),
          'cosAlpha': imageMasked.select('Cos_Slope'),
          'cosTheta': imageMasked.select('Cos_Zenith'),
          'cosI': imageMasked.select('IC'),
          'C': ee.Number(regression.get('offset')).divide(ee.Number(regression.get('scale')))
        }
      ),
      imageMasked
    );
    return imageIllumination.select(band).blend(corrected);
  }
  var bandNames;
  switch(selectCol.getValue()){
    case 'Landsat OLI':
      bandNames = ['SR_B1', 'SR_B2', 'SR_B3', 'SR_B4', 'SR_B5', 'SR_B6', 'SR_B7'];
      break;
    case 'Landsat TM & ETM+':
      bandNames = ['SR_B1', 'SR_B2', 'SR_B3', 'SR_B4', 'SR_B5', 'SR_B7'];
      break;
  }
  var imageCorrected = ee.Image(bandNames.map(mapBand)).select(bandNames);
  return image.addBands(imageCorrected, null, true);
}
// BRDF Correction Function
function brdfCorrection(image) {
  var inputBandNames = image.bandNames();
  var constants = {
    pi: Math.PI
  };
  var coefficientsByBand;
  switch(selectCol.getValue()){
    case 'Landsat OLI':
      coefficientsByBand = {
        'SR_B2': {fiso: 0.0774, fgeo: 0.0079, fvol: 0.0372},
        'SR_B3': {fiso: 0.1306, fgeo: 0.0178, fvol: 0.0580},
        'SR_B4': {fiso: 0.1690, fgeo: 0.0227, fvol: 0.0574},
        'SR_B5': {fiso: 0.3093, fgeo: 0.0330, fvol: 0.1535},
        'SR_B6': {fiso: 0.3430, fgeo: 0.0453, fvol: 0.1154},
        'SR_B7': {fiso: 0.2658, fgeo: 0.0387, fvol: 0.0639}
      };
      break;
    case 'Landsat TM & ETM+':
      coefficientsByBand = {
        'SR_B1': {fiso: 0.0774, fgeo: 0.0079, fvol: 0.0372},
        'SR_B2': {fiso: 0.1306, fgeo: 0.0178, fvol: 0.0580},
        'SR_B3': {fiso: 0.1690, fgeo: 0.0227, fvol: 0.0574},
        'SR_B4': {fiso: 0.3093, fgeo: 0.0330, fvol: 0.1535},
        'SR_B5': {fiso: 0.3430, fgeo: 0.0453, fvol: 0.1154},
        'SR_B7': {fiso: 0.2658, fgeo: 0.0387, fvol: 0.0639}
      };
      break;
    case 'Sentinel-2':
      coefficientsByBand = {
        'B1': {fiso: 0.0774, fgeo: 0.0079, fvol: 0.0372},
        'B2': {fiso: 0.0774, fgeo: 0.0079, fvol: 0.0372},
        'B3': {fiso: 0.1306, fgeo: 0.0178, fvol: 0.0580},
        'B4': {fiso: 0.1690, fgeo: 0.0227, fvol: 0.0574},
        'B5': {fiso: 0.2085, fgeo: 0.0256, fvol: 0.0845},
        'B6': {fiso: 0.2316, fgeo: 0.0273, fvol: 0.1003},
        'B7': {fiso: 0.2599, fgeo: 0.0294, fvol: 0.1197},
        'B8': {fiso: 0.3093, fgeo: 0.0330, fvol: 0.1535},
        'B8A': {fiso: 0.2907, fgeo: 0.0410, fvol: 0.1611},
        'B9': {fiso: 0.2907, fgeo: 0.0410, fvol: 0.1611},
        'B11': {fiso: 0.3430, fgeo: 0.0453, fvol: 0.1154},
        'B12': {fiso: 0.2658, fgeo: 0.0387, fvol: 0.0639}
      };
      break;
    case 'Planetscope':
      coefficientsByBand = {
        'B1': {fiso: 0.0774, fgeo: 0.0079, fvol: 0.0372},
        'B2': {fiso: 0.0774, fgeo: 0.0079, fvol: 0.0372},
        'B3': {fiso: 0.1306, fgeo: 0.0178, fvol: 0.0580},
        'B4': {fiso: 0.1306, fgeo: 0.0178, fvol: 0.0580},
        'B5': {fiso: 0.1690, fgeo: 0.0227, fvol: 0.0574},
        'B6': {fiso: 0.1690, fgeo: 0.0227, fvol: 0.0574},
        'B7': {fiso: 0.2085, fgeo: 0.0256, fvol: 0.0845},
        'B8': {fiso: 0.3093, fgeo: 0.0330, fvol: 0.1535}
      };
      break;
  }
  var corners = findCorners();
  viewAngles();
  solarPosition();
  sunZenOut();
  set('relativeSunViewAz', 'i.sunAz - i.viewAz');
  rossThick('kvol', 'i.sunZen', 'i.viewZen', 'i.relativeSunViewAz');
  rossThick('kvol0', 'i.sunZenOut', 0, 0);
  liThin('kgeo', 'i.sunZen', 'i.viewZen', 'i.relativeSunViewAz');
  liThin('kgeo0', 'i.sunZenOut', 0, 0);
  adjustBands();
  return image.select(inputBandNames);
  function viewAngles() {
    var maxDistanceToSceneEdge = 1000000;
    var maxSatelliteZenith = 7.5;
    var upperCenter = pointBetween(corners.upperLeft, corners.upperRight);
    var lowerCenter = pointBetween(corners.lowerLeft, corners.lowerRight);
    var slope = slopeBetween(lowerCenter, upperCenter);
    var slopePerp = ee.Number(-1).divide(slope);
    set('viewAz',
      ee.Image(ee.Number(Math.PI / 2).subtract((slopePerp).atan())));
    var leftLine = toLine(corners.upperLeft, corners.lowerLeft);
    var rightLine = toLine(corners.upperRight, corners.lowerRight);
    var leftDistance = ee.FeatureCollection(leftLine).distance(maxDistanceToSceneEdge);
    var rightDistance = ee.FeatureCollection(rightLine).distance(maxDistanceToSceneEdge);
    var viewZenith = rightDistance.multiply(maxSatelliteZenith * 2)
      .divide(rightDistance.add(leftDistance))
      .subtract(maxSatelliteZenith);
    set('viewZen',
      viewZenith.multiply(Math.PI).divide(180));
  }
  function solarPosition() {
    // Ported from http://pythonfmask.org/en/latest/_modules/fmask/landsatangles.html
    var date = ee.Date(ee.Number(image.get('system:time_start')));
    var secondsInHour = 3600;
    set('longDeg',
      ee.Image.pixelLonLat().select('longitude'));
    set('latRad',
      ee.Image.pixelLonLat().select('latitude')
        .multiply(Math.PI).divide(180));
    set('hourGMT',
      ee.Number(date.getRelative('second', 'day')).divide(secondsInHour));
    set('jdp', // Julian Date Proportion
      date.getFraction('year'));
    set('jdpr', // Julian Date Proportion in Radians
      'i.jdp * 2 * {pi}');
    set('meanSolarTime',
      'i.hourGMT + i.longDeg / 15');
    set('localSolarDiff',
      '(0.000075 + 0.001868 * cos(i.jdpr) - 0.032077 * sin(i.jdpr)' +
      '- 0.014615 * cos(2 * i.jdpr) - 0.040849 * sin(2 * i.jdpr))' +
      '* 12 * 60 / {pi}');
    set('trueSolarTime',
      'i.meanSolarTime + i.localSolarDiff / 60 - 12');
    set('angleHour',
      'i.trueSolarTime * 15 * {pi} / 180');
    set('delta',
      '0.006918 - 0.399912 * cos(i.jdpr) + 0.070257 * sin(i.jdpr) - 0.006758 * cos(2 * i.jdpr)' +
      '+ 0.000907 * sin(2 * i.jdpr) - 0.002697 * cos(3 * i.jdpr) + 0.001480 * sin(3 * i.jdpr)');
    set('cosSunZen',
      'sin(i.latRad) * sin(i.delta) ' +
      '+ cos(i.latRad) * cos(i.delta) * cos(i.angleHour)');
    set('sunZen',
      'acos(i.cosSunZen)');
    set('sinSunAzSW',
      toImage('cos(i.delta) * sin(i.angleHour) / sin(i.sunZen)')
        .clamp(-1, 1));
    set('cosSunAzSW',
      '(-cos(i.latRad) * sin(i.delta)' +
      '+ sin(i.latRad) * cos(i.delta) * cos(i.angleHour)) / sin(i.sunZen)');
    set('sunAzSW',
      'asin(i.sinSunAzSW)');
    setIf('sunAzSW',
      'i.cosSunAzSW <= 0',
      '{pi} - i.sunAzSW',
      'sunAzSW');
    setIf('sunAzSW',
      'i.cosSunAzSW > 0 and i.sinSunAzSW <= 0',
      '2 * {pi} + i.sunAzSW',
      'sunAzSW');
    set('sunAz',
      'i.sunAzSW + {pi}');
    setIf('sunAz',
      'i.sunAz > 2 * {pi}',
      'i.sunAz - 2 * {pi}',
      'sunAz');
  }
  function sunZenOut() {
    // https://nex.nasa.gov/nex/static/media/publication/HLS.v1.0.UserGuide.pdf
    set('centerLat',
      ee.Number(
        ee.Geometry(image.get('system:footprint'))
          .bounds().centroid(30).coordinates().get(0))
        .multiply(Math.PI).divide(180));
    set('sunZenOut',
      '(31.0076' +
      '- 0.1272 * i.centerLat' +
      '+ 0.01187 * pow(i.centerLat, 2)' +
      '+ 2.40E-05 * pow(i.centerLat, 3)' +
      '- 9.48E-07 * pow(i.centerLat, 4)' +
      '- 1.95E-09 * pow(i.centerLat, 5)' +
      '+ 6.15E-11 * pow(i.centerLat, 6)) * {pi}/180');
  }
  function rossThick(bandName, sunZen, viewZen, relativeSunViewAz) {
    var args = {sunZen: sunZen, viewZen: viewZen, relativeSunViewAz: relativeSunViewAz};
    cosPhaseAngle('cosPhaseAngle', sunZen, viewZen, relativeSunViewAz);
    set('phaseAngle',
      'acos(i.cosPhaseAngle)');
    set(bandName,
      '(({pi}/2 - i.phaseAngle) * i.cosPhaseAngle + sin(i.phaseAngle)) ' +
      '/ (cos({sunZen}) + cos({viewZen})) - {pi}/4', args);
  }
  function liThin(bandName, sunZen, viewZen, relativeSunViewAz) {
    // From https://modis.gsfc.nasa.gov/data/atbd/atbd_mod09.pdf
    var args = {
      sunZen: sunZen,
      viewZen: viewZen,
      relativeSunViewAz: relativeSunViewAz,
      'h/b': 2,
    };
    anglePrime('sunZenPrime', sunZen);
    anglePrime('viewZenPrime', viewZen);
    cosPhaseAngle('cosPhaseAnglePrime', 'i.sunZenPrime', 'i.viewZenPrime', relativeSunViewAz);
    set('distance',
      'sqrt(pow(tan(i.sunZenPrime), 2) + pow(tan(i.viewZenPrime), 2)' +
      '- 2 * tan(i.sunZenPrime) * tan(i.viewZenPrime) * cos({relativeSunViewAz}))', args);
    set('temp',
      '1/cos(i.sunZenPrime) + 1/cos(i.viewZenPrime)');
    set('cosT',
      toImage('{h/b} * sqrt(pow(i.distance, 2) + pow(tan(i.sunZenPrime) * tan(i.viewZenPrime) * sin({relativeSunViewAz}), 2))' +
        '/ i.temp', args)
        .clamp(-1, 1));
    set('t', 'acos(i.cosT)');
    set('overlap',
      '(1/{pi}) * (i.t - sin(i.t) * i.cosT) * (i.temp)');
    setIf('overlap', 'i.overlap > 0', 0);
    set(bandName,
      'i.overlap - i.temp' +
      '+ (1/2) * (1 + i.cosPhaseAnglePrime) * (1/cos(i.sunZenPrime)) * (1/cos(i.viewZenPrime))');
  }
  function anglePrime(name, angle) {
    var args = {'b/r': 1, angle: angle};
    set('tanAnglePrime',
      '{b/r} * tan({angle})', args);
    setIf('tanAnglePrime', 'i.tanAnglePrime < 0', 0);
    set(name,
      'atan(i.tanAnglePrime)');
  }
  function cosPhaseAngle(name, sunZen, viewZen, relativeSunViewAz) {
    var args = {
      sunZen: sunZen,
      viewZen: viewZen,
      relativeSunViewAz: relativeSunViewAz
    };
    set(name,
      toImage('cos({sunZen}) * cos({viewZen})' +
        '+ sin({sunZen}) * sin({viewZen}) * cos({relativeSunViewAz})', args)
        .clamp(-1, 1));
  }
  function adjustBands() {
    for (var bandName in coefficientsByBand)
      applyCFactor(bandName, coefficientsByBand[bandName]);
  }
  function applyCFactor(bandName, coefficients) {
    brdf('brdf', 'kvol', 'kgeo', coefficients);
    brdf('brdf0', 'kvol0', 'kgeo0', coefficients);
    set('cFactor',
      'i.brdf0 / i.brdf', coefficients);
    set(bandName,
      '{bandName} * i.cFactor', {bandName: 'i.' + bandName});
  }
  function brdf(bandName, kvolBand, kgeoBand, coefficients) {
    var args = merge(coefficients, {
      // kvol: 'i.' + kvolBand,
      kvol: '3 * i.' + kvolBand,     // check this multiplication factor.  Is there an 'optimal' value?  Without a factor here, there is not enough correction.
      kgeo: 'i.' + kgeoBand
    });
    return set(bandName,
      '{fiso} + {fvol} * {kvol} + {fgeo} * {kvol}', args);
  }
  function findCorners() {
    var footprint = ee.Geometry(image.get('system:footprint'));
    var bounds = ee.List(footprint.bounds().coordinates().get(0));
    var coords = footprint.coordinates();
    var xs = coords.map(function (item) {
      return x(item);
    });
    var ys = coords.map(function (item) {
      return y(item);
    });
    function findCorner(targetValue, values) {
      var diff = values.map(function (value) {
        return ee.Number(value).subtract(targetValue).abs();
      });
      var minValue = diff.reduce(ee.Reducer.min());
      var idx = diff.indexOf(minValue);
      return coords.get(idx);
    }
    var lowerLeft = findCorner(x(bounds.get(0)), xs);
    var lowerRight = findCorner(y(bounds.get(1)), ys);
    var upperRight = findCorner(x(bounds.get(2)), xs);
    var upperLeft = findCorner(y(bounds.get(3)), ys);
    return {
      upperLeft: upperLeft,
      upperRight: upperRight,
      lowerRight: lowerRight,
      lowerLeft: lowerLeft
    };
  }
  function x(point) {
    return ee.Number(ee.List(point).get(0));
  }
  function y(point) {
    return ee.Number(ee.List(point).get(1));
  }
  function pointBetween(pointA, pointB) {
    return ee.Geometry.LineString([pointA, pointB]).centroid().coordinates();
  }
  function slopeBetween(pointA, pointB) {
    return ((y(pointA)).subtract(y(pointB))).divide((x(pointA)).subtract(x(pointB)));
  }
  function toLine(pointA, pointB) {
    return ee.Geometry.LineString([pointA, pointB]);
  }
// ************** COMMON HELPERS **************
  function set(name, toAdd, args) {
    toAdd = toImage(toAdd, args);
    image = image.addBands(toAdd.rename(name), null, true);
  }
  function setIf(name, condition, trueValue, falseValue) {
    condition = toImage(condition);
    var trueMasked = toImage(trueValue).mask(toImage(condition));
    var falseMasked = toImage(falseValue).mask(invertMask(condition));
    var value = trueMasked.unmask(falseMasked);
    set(name, value);
    function invertMask(mask) {
      return mask.multiply(-1).add(1);
    }
  }
  function toImage(band, args) {
    if ((typeof band) === 'string') {
      if (band.indexOf('.') > -1 || band.indexOf(' ') > -1 || band.indexOf('{') > -1) {
        band = image.expression(format(band, args), {i: image});
      } else
        band = image.select(band);
    }
    return ee.Image(band);
  }
  function format(s, args) {
    if (!args) args = {};
    var allArgs = merge(constants, args);
    var result = s.replace(/{([^{}]*)}/g,
      function (a, b) {
        var replacement = allArgs[b];
        if (replacement === null) {
          print('Undeclared argument: ' + b, 's: ' + s, args);
          return null;
        }
        return allArgs[b];
      }
    );
    if (result.indexOf('{') > -1)
      return format(result, args);
    return result;
  }
  function merge(o1, o2) {
    function addAll(target, toAdd) {
      for (var key in toAdd) target[key] = toAdd[key];
    }
    var result = {};
    addAll(result, o1);
    addAll(result, o2);
    return result;
  }
  function show(band, min, max) {
    Map.addLayer(toImage(band), {min: min ? min : -1, max: max ? max : 1}, band);
  }
}
// Function to filter sentinel images
function sentinelImages(){
  var bounds = aoi();
  var startDate = date().start;
  var endDate = date().end;
  var cloudLim = cloud();
  var doyStart = doy().start;
  var doyEnd = doy().end;
  var images = s2.filterBounds(bounds)
    .filterDate(startDate, endDate)
    .filter(ee.Filter.dayOfYear(doyStart, doyEnd))
    .filter(ee.Filter.lte('CLOUDY_PIXEL_PERCENTAGE', cloudLim));
  function cloudMask(image){
    var scl = image.select('SCL');
    var shadow = scl.eq(3);
    var cloud = scl.gte(8).and(scl.lte(10));
    var mask = shadow.or(cloud);
    return image.updateMask(mask.eq(0));
  }
  var finalImages = images;
  if (brdfCheck.getValue() === true){
    finalImages = finalImages.select(['B.*']).map(brdfCorrection);
  }
  if (cloudMaskingCheck.getValue() === true){
    finalImages = finalImages.combine(images.select('SCL')).map(cloudMask);
  }
  return finalImages.select(['B.*']);
}
// Function to get planetscope images
function planetscopeImages(){
  var bounds = aoi();
  var startDate = date().start;
  var endDate = date().end;
  var cloudLim = cloud();
  var doyStart = doy().start;
  var doyEnd = doy().end;
  var planetscope = require('users/ramiqcom/ugm:highres/planetscope').planetscope;
  var images = planetscope().filterBounds(bounds)
    .filterDate(startDate, endDate)
    .filter(ee.Filter.dayOfYear(doyStart, doyEnd))
    .filter(ee.Filter.lte('cloud_cover', cloudLim));
  function cloudMask(image) {
    var qa = image.select('Q1');
    var masked = image.updateMask(qa.eq(1));
    return masked;
  }
  var finalImages = images;
  if (brdfCheck.getValue() === true){
    finalImages = finalImages.select(['B.*']).map(brdfCorrection);
  }
  if (cloudMaskingCheck.getValue() === true){
    finalImages = finalImages.combine(images.select('Q1')).map(cloudMask);
  }
  var bandRenamed = finalImages.select(['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8']);
  return bandRenamed;
}
// Function to get images
function medianImage(col){
  var images;
  var scale;
  var multi;
  var add;
  switch(col){
    case 'Landsat OLI':
      images = landsatImages();
      scale = 30;
      multi = 0.0000275;
      add = -0.2;
      break;
    case 'Landsat TM & ETM+':
      images = landsatTMImages();
      scale = 30;
      multi = 0.0000275;
      add = -0.2;
      break;
    case 'Sentinel-2':
      images = sentinelImages();
      scale = 10;
      multi = 0.0001;
      add = 0;
      break;
    case 'Planetscope':
      images = planetscopeImages();
      scale = 3;
      multi = 0.0001;
      add = 0;
      break;
  }
  var bounds = aoi();
  var image = images.median().clip(bounds)
    .setDefaultProjection({crs: 'EPSG:4326', scale: scale})
    .multiply(multi).add(add);
  return image;
}
// AOI for visualization
function aoiVis(){
  var perimeter = aoi().perimeter(1).pow(1/2).multiply(20).round();
  return aoi().centroid(1).buffer(perimeter);
}
// Visualization parameter function
function imageVis(){
  var image = medianImage(selectCol.getValue());
  var bandsName = bands();
  var min = Number(minTextbox.getValue());
  var max = Number(maxTextbox.getValue());
  var imageScale = image.projection().nominalScale().multiply(10);
  var vis = visStretch(image.clip(aoiVis()), bandsName, min, max, imageScale);
  return vis;
}
// Function to show landsat image to map
function addImageToMap(){
  var col = selectCol.getValue();
  var image = medianImage(col);
  imageVis().evaluate(function(value){
    Map.addLayer(image, value, col);
    var legend = legendCategory(col, bands(), ['red', 'green', 'blue'], 3, 'bottom-left');
    Map.add(legend);
    info('Imagery');
    download();
  });
}
// Function to show loading screen while tile loaded
function loading(){
  Map.remove(loadingLabel);
  Map.add(loadingLabel);
  Map.onTileLoaded(function(value){
    if(value[0] <= 0){
      Map.remove(loadingLabel);
    }
  });
}
// Function to select show images function collection
function showImages(){
  resetMap();
  loading();
  addImageToMap();
  indexButton.setDisabled(false);
  advancedAnalysisButton.setDisabled(false);
}
// Index formula function
function indexDefault(){
  var col = selectCol.getValue();
  var index = indexSelect.getValue();
  var image = medianImage(col);
  var ndviFormula = '(NIR - Red) / (NIR + Red)';
  var ndbiFormula = '(SWIR - NIR) / (SWIR + NIR)';
  var mndwiFormula = '(Green - SWIR) / (Green + SWIR)';
  var formulaChoice;
  switch(index){
    case 'NDVI':
      formulaChoice = ndviFormula;
      break;
    case 'NDBI':
      formulaChoice = ndbiFormula;
      break;
    case 'MNDWI':
      formulaChoice = mndwiFormula;
      break;
  }
  var blue;
  var green;
  var red;
  var nir;
  var swir;
  switch(col){
    case 'Landsat OLI':
      blue = image.select('B2');
      green = image.select('B3');
      red = image.select('B4');
      nir = image.select('B5');
      swir = image.select('B7');
      break;
    case 'Landsat TM & ETM+':
      blue = image.select('B1');
      green = image.select('B2');
      red = image.select('B3');
      nir = image.select('B4');
      swir = image.select('B5');
      break;
    case 'Sentinel-2':
      blue = image.select('B2');
      green = image.select('B3');
      red = image.select('B4');
      nir = image.select('B8');
      swir = image.select('B11');
      break;
    case 'Planetscope':
      blue = image.select('B2');
      green = image.select('B4');
      red = image.select('B6');
      nir = image.select('B8');
      swir = image.select('B7');
      break;
  }
  var indexImage = ee.Image().expression({
    expression: formulaChoice,
    map: {
      Blue: blue,
      Green: green,
      Red: red,
      NIR: nir,
      SWIR: swir,
    }
  });
  return indexImage.rename(index);
}
// Function custom index
function indexFormula(){
  var image = baseAnalysis();
  var formula = indexTextbox.getValue();
  var indexImage = image.expression({
    expression: formula,
    map: {
      B1: image.select('B1'),
      B2: image.select('B2'),
      B3: image.select('B3'),
      B4: image.select('B4'),
      B5: image.select('B5'),
      B6: image.select('B6'),
      B7: image.select('B7'),
      B8: image.select('B8'),
      B8A: image.select('B8A'),
      B9: image.select('B9'),
      B11: image.select('B11'),
      B12: image.select('B12'),
    }
  });
  return indexImage.rename('Custom');
}
// Function to select index based on index selection panel
function indexImage(){
  var indexSelected = indexSelect.getValue();
  var image;
  if(indexSelected !== 'Custom'){
    image = indexDefault();
  } else {
    image = indexFormula();
  }
  return image;
}
// Function for index visualization
function indexVis(){
  var visSelect = indexColormap.getValue();
  var split = visSelect.split('-');
  var image = indexImage();
  var min = Number(minIndexTextbox.getValue());
  var max = Number(maxIndexTextbox.getValue());
  var imageScale = image.projection().nominalScale().multiply(10);
  var percentile = image.clip(aoiVis()).rename('Index').reduceRegion({
    reducer: ee.Reducer.percentile([min, max]),
    geometry: aoi(),
    scale: imageScale,
    maxPixels: 1e13
  });
  var keys = percentile.keys();
  var pMin = ee.Number(percentile.get(keys.get(0))).multiply(100).round().divide(100);
  var pMax = ee.Number(percentile.get(keys.get(1))).multiply(100).round().divide(100);
  return ee.Dictionary({palette: split, min: pMin, max: pMax});
}
// Function to select show images function collection
function showIndex(){
  resetMap();
  loading();
  var image = indexImage();
  var index = indexSelect.getValue();
  var title = index;
  if(index == 'Custom'){
      title = indexTextbox.getValue();
    }
  indexVis().evaluate(function(value){
    Map.addLayer(image, value, title);
    info('Index');
    var legend = legendColormap(title, value, 'bottom-left');
    Map.add(legend);
    download();
  });
}
// Function to change advanced panel
function advance(value){
  if (advancedPanel.widgets().get(2) !== null || advancedPanel.widgets().get(2) !== undefined){
    advancedPanel.remove(advancedPanel.widgets().get(2));
  }
  drawMode(['rectangle', 'polygon']);
  switch(value){
    case 'PCA':
      pca();
      break;
    case 'Tasseled cap':
      tc();
      break;
    case 'Unsupervised classification':
      uclass();
      break;
    case 'Time-series':
      ts();
      break;
    case 'Supervised classification':
      superClass();
      break;
    case 'OBIA':
      obia();
      break;
  }
}
// Function for pca menu
function pca(){
  // PCA panel
  var pcaPanel = ui.Panel({
    layout: ui.Panel.Layout.flow('vertical', true),
    style: {position: 'top-right'}
  });
  advancedPanel.add(pcaPanel);
  // Select collection
  var selectCol = ui.Select({
    items: ['Landsat OLI', 'Landsat TM & ETM+', 'Sentinel-2', 'Planetscope'],
    value: 'Sentinel-2',
    style: {stretch: 'horizontal'},
    onChange: function(value){
      switch(value){
        case 'Landsat OLI':
          bandPcaSelect1.items().reset(['pc1', 'pc2', 'pc3', 'pc4', 'pc5', 'pc6', 'pc7']);
          bandPcaSelect2.items().reset(['pc1', 'pc2', 'pc3', 'pc4', 'pc5', 'pc6', 'pc7']);
          bandPcaSelect3.items().reset(['pc1', 'pc2', 'pc3', 'pc4', 'pc5', 'pc6', 'pc7']);
          bandPcaSelect1.setValue('pc1');
          bandPcaSelect2.setValue('pc2');
          bandPcaSelect3.setValue('pc3');
          break;
        case 'Landsat TM & ETM+':
          bandPcaSelect1.items().reset(['pc1', 'pc2', 'pc3', 'pc4', 'pc5', 'pc6']);
          bandPcaSelect2.items().reset(['pc1', 'pc2', 'pc3', 'pc4', 'pc5', 'pc6']);
          bandPcaSelect3.items().reset(['pc1', 'pc2', 'pc3', 'pc4', 'pc5', 'pc6']);
          bandPcaSelect1.setValue('pc1');
          bandPcaSelect2.setValue('pc2');
          bandPcaSelect3.setValue('pc3');
          break;
        case 'Sentinel-2':
          bandPcaSelect1.items().reset(['pc1', 'pc2', 'pc3', 'pc4', 'pc5', 'pc6', 'pc7', 'pc8', 'pc9', 'pc10', 'pc11', 'pc12']);
          bandPcaSelect2.items().reset(['pc1', 'pc2', 'pc3', 'pc4', 'pc5', 'pc6', 'pc7', 'pc8', 'pc9', 'pc10', 'pc11', 'pc12']);
          bandPcaSelect3.items().reset(['pc1', 'pc2', 'pc3', 'pc4', 'pc5', 'pc6', 'pc7', 'pc8', 'pc9', 'pc10', 'pc11', 'pc12']);
          bandPcaSelect1.setValue('pc1');
          bandPcaSelect2.setValue('pc2');
          bandPcaSelect3.setValue('pc3');
          break;
        case 'Planetscope':
          bandPcaSelect1.items().reset(['pc1', 'pc2', 'pc3', 'pc4', 'pc5', 'pc6', 'pc7', 'pc8']);
          bandPcaSelect2.items().reset(['pc1', 'pc2', 'pc3', 'pc4', 'pc5', 'pc6', 'pc7', 'pc8']);
          bandPcaSelect3.items().reset(['pc1', 'pc2', 'pc3', 'pc4', 'pc5', 'pc6', 'pc7', 'pc8']);
          bandPcaSelect1.setValue('pc1');
          bandPcaSelect2.setValue('pc2');
          bandPcaSelect3.setValue('pc3');
          break;
      }
    }
  });
  pcaPanel.add(selectCol);
  // Visualization panel for pca
  var pcaVisPanel = ui.Panel({
    layout: ui.Panel.Layout.flow('horizontal', true),
  });
  pcaPanel.add(pcaVisPanel);
  // PCA RGB channel for visualization
  var bandPcaSelect1 = ui.Select({
    items: ['pc1', 'pc2', 'pc3', 'pc4', 'pc5', 'pc6', 'pc7', 'pc8', 'pc9', 'pc10', 'pc11', 'pc12'],
    value: 'pc1',
  });
  pcaVisPanel.add(bandPcaSelect1);
  var bandPcaSelect2 = ui.Select({
    items: ['pc1', 'pc2', 'pc3', 'pc4', 'pc5', 'pc6', 'pc7', 'pc8', 'pc9', 'pc10', 'pc11', 'pc12'],
    value: 'pc2',
  });
  pcaVisPanel.add(bandPcaSelect2);
  var bandPcaSelect3 = ui.Select({
    items: ['pc1', 'pc2', 'pc3', 'pc4', 'pc5', 'pc6', 'pc7', 'pc8', 'pc9', 'pc10', 'pc11', 'pc12'],
    value: 'pc3',
  });
  pcaVisPanel.add(bandPcaSelect3);
  // Min max percentile for visualization PCA
  var minTextboxPca = ui.Textbox({
    placeholder: 'Min%',
    style: {stretch: 'horizontal'},
    value: 2,
  });
  pcaVisPanel.add(minTextboxPca);
  var maxTextboxPca = ui.Textbox({
    placeholder: 'Max%',
    style: {stretch: 'horizontal'},
    value: 98,
  });
  pcaVisPanel.add(maxTextboxPca);
  // Show PCA button
  var pcaButton = ui.Button({
    style: {stretch: 'horizontal'},
    label: 'Show PCA',
    onClick: function(){
      showPCA();
    }
  });
  pcaPanel.add(pcaButton);
  // Function to show pca image
  function showPCA(){
    resetMap();
    loading();
    var image = pcaImage();
    pcaVis().evaluate(function(vis){
      var bandsName = vis.bands;
      var title = 'PCA';
      Map.addLayer(image, vis, title);
      info('Imagery');
      var legend = legendCategory(title, bandsName, ['red', 'green', 'blue'], 3, 'bottom-left');
      Map.add(legend);
      download();
    });
  }
  // Function for image vis
  function pcaVis(){
    var image = pcaImage();
    var b1 = bandPcaSelect1.getValue();
    var b2 = bandPcaSelect2.getValue();
    var b3 = bandPcaSelect3.getValue();
    var min = Number(minTextboxPca.getValue());
    var max = Number(maxTextboxPca.getValue());
    var imageScale = image.projection().nominalScale().multiply(10);
    var vis = visStretch(image.clip(aoiVis()), [b1, b2, b3], min, max, imageScale);
    return vis;
  }
  // Function to process pca image
  function pcaImage(){
    var col = selectCol.getValue();
    var image = medianImage(col);
    var scale = image.projection().nominalScale().multiply(10);
    var bandNames = image.bandNames();
    var region = image.geometry();
    var meanDict = image.reduceRegion({
        reducer: ee.Reducer.mean(),
        geometry: region,
        scale: scale,
        maxPixels: 1e13,
    });
    var means = ee.Image.constant(meanDict.values(bandNames));
    var centered = image.subtract(means);
    var getNewBandNames = function(prefix) {
      var seq = ee.List.sequence(1, bandNames.length());
      return seq.map(function(b) {
        return ee.String(prefix).cat(ee.Number(b).int());
      });
    };
    var arrays = centered.toArray();
    var covar = arrays.reduceRegion({
      reducer: ee.Reducer.centeredCovariance(),
      geometry: region,
      scale: scale,
      maxPixels: 1e13,
    });
    var covarArray = ee.Array(covar.get('array'));
    var eigens = covarArray.eigen();
    var eigenValues = eigens.slice(1, 0, 1);
    var eigenVectors = eigens.slice(1, 1);
    var arrayImage = arrays.toArray(1);
    var principalComponents = ee.Image(eigenVectors).matrixMultiply(arrayImage);
    var sdImage = ee.Image(eigenValues.sqrt())
      .arrayProject([0]).arrayFlatten([getNewBandNames('sd')]);
    var pca = principalComponents
      .arrayProject([0])
      .arrayFlatten([getNewBandNames('pc')])
      .divide(sdImage);
    return pca;
  }
}
// Function for tasseled cap menu
function tc(){
  // TC panel
  var tcPanel = ui.Panel({
    layout: ui.Panel.Layout.flow('vertical', true),
    style: {position: 'top-right'}
  });
  advancedPanel.add(tcPanel);
  // Select collection
  var selectCol = ui.Select({
    items: ['Landsat OLI', 'Landsat TM & ETM+', 'Sentinel-2', 'Planetscope'],
    value: 'Sentinel-2',
    style: {stretch: 'horizontal'},
  });
  tcPanel.add(selectCol);
  // Visualization panel for tc
  var tcVisPanel = ui.Panel({
    layout: ui.Panel.Layout.flow('horizontal', true),
  });
  tcPanel.add(tcVisPanel);
  // TC RGB channel for visualization
  var bandTC1 = ui.Select({
    items: ['brightness', 'greenness', 'wetness'],
    value: 'brightness',
  });
  tcVisPanel.add(bandTC1);
  var bandTC2 = ui.Select({
    items: ['brightness', 'greenness', 'wetness'],
    value: 'greenness',
  });
  tcVisPanel.add(bandTC2);
  var bandTC3 = ui.Select({
    items: ['brightness', 'greenness', 'wetness'],
    value: 'wetness',
  });
  tcVisPanel.add(bandTC3);
  // Min max percentile for visualization PCA
  var minTextboxTC = ui.Textbox({
    placeholder: 'Min%',
    style: {stretch: 'horizontal'},
    value: 2,
  });
  tcVisPanel.add(minTextboxTC);
  var maxTextboxTC = ui.Textbox({
    placeholder: 'Max%',
    style: {stretch: 'horizontal'},
    value: 98,
  });
  tcVisPanel.add(maxTextboxTC);
  // Show TC button
  var tcButton = ui.Button({
    style: {stretch: 'horizontal'},
    label: 'Show Tasseled cap',
    onClick: function(){
      showTC();
    }
  });
  tcPanel.add(tcButton);
  // Function to show pca image
  function showTC(){
    resetMap();
    loading();
    var image = tcImage();
    var title = 'Tasseled cap';
    tcVis().evaluate(function(vis){
      var bandsName = vis.bands;
      Map.addLayer(image, vis, title);
      info('Imagery');
      var legend = legendCategory(title, bandsName, ['red', 'green', 'blue'], 3, 'bottom-left');
      Map.add(legend);
      download();
    });
  }
  // Function for image vis
  function tcVis(){
    var image = tcImage();
    var b1 = bandTC1.getValue();
    var b2 = bandTC2.getValue();
    var b3 = bandTC3.getValue();
    var min = Number(minTextboxTC.getValue());
    var max = Number(maxTextboxTC.getValue());
    var imageScale = image.projection().nominalScale().multiply(10);
    var vis = visStretch(image.clip(aoiVis()), [b1, b2, b3], min, max, imageScale);
    return vis;
  }
  // Function to process pca image
  function tcImage(){
    var col = selectCol.getValue();
    var image = medianImage(col);
    var coefficients;
    switch(col){
      case 'Sentinel-2':
        coefficients = ee.Array([
          [0.2381, 0.2569, 0.2934, 0.3020, 0.3099, 0.3740, 0.4180, 0.3580, 0.3834, 0.0103, 0.0896, 0.0780],
          [-0.2266, -0.2818, -0.3020, -0.4283, -0.2959, 0.1602, 0.3127, 0.3138, 0.4261, 0.1454, -0.1341, -0.2538],
          [0.1825, 0.1763, 0.1615, 0.0486, 0.0170, 0.0223, 0.0219, -0.0755, -0.0910, -0.1369, -0.7701, -0.5293]
        ]);
        break;
      case 'Landsat OLI':
        image = image.select(['B2', 'B3', 'B4', 'B5', 'B6', 'B7']);
        coefficients = ee.Array([
          [0.3029, 0.2786, 0.4733, 0.5599, 0.508, 0.1872],
          [-0.2941, -0.243, -0.5424, 0.7276, 0.0713, -0.1608],
          [0.1511, 0.1973, 0.3283, 0.3407, -0.7117, -0.4559]
        ]);
        break;
      case 'Landsat TM & ETM+':
        image = image.select(['B1', 'B2', 'B3', 'B4', 'B5', 'B7']);
        coefficients = ee.Array([
          [0.3029, 0.2786, 0.4733, 0.5599, 0.508, 0.1872],
          [-0.2941, -0.243, -0.5424, 0.7276, 0.0713, -0.1608],
          [0.1511, 0.1973, 0.3283, 0.3407, -0.7117, -0.4559]
        ]);
        break;
      case 'Planetscope':
        image = image.select(['B1', 'B2', 'B4', 'B6', 'B7', 'B8']);
        coefficients = ee.Array([
          [0.2381, 0.2569, 0.2934, 0.3020, 0.3099, 0.3580],
          [-0.2266, -0.2818, -0.3020, -0.4283, -0.2959, 0.3138],
          [0.1825, 0.1763, 0.1615, 0.0486, 0.0170, -0.0755]
        ]);
        break;
    }
    // Make an Array Image, with a 1-D Array per pixel.
    var arrayImage1D = image.toArray();
    // Make an Array Image with a 2-D Array per pixel, 6x1.
    var arrayImage2D = arrayImage1D.toArray(1);
    // Do a matrix multiplication: 6x6 times 6x1.
    var componentsImage = ee.Image(coefficients)
      .matrixMultiply(arrayImage2D)
      // Get rid of the extra dimensions.
      .arrayProject([0])
      .arrayFlatten([['brightness', 'greenness', 'wetness']]);
    return componentsImage;
  }
}
// Function for cluster menu
function uclass(){
  // Uclass panel
  var uClassPanel = ui.Panel({
    layout: ui.Panel.Layout.flow('vertical', true),
  });
  advancedPanel.add(uClassPanel);
  // Select collection
  var selectCol = ui.Select({
    items: ['Landsat OLI', 'Landsat TM & ETM+', 'Sentinel-2', 'Planetscope'],
    value: 'Sentinel-2',
    style: {stretch: 'horizontal'},
  });
  uClassPanel.add(selectCol);
  // Cluster algorithms
  var algoSelect = ui.Select({
    items: ['Cascade K-means', 'Cobweb', 'K-means', 'LVQ', 'X-means'],
    placeholder: 'Select algorithm',
    style: {stretch: 'horizontal'},
    onChange: function(){
      algoChange();
    }
  });
  uClassPanel.add(algoSelect);
  // Cluster sampling num pixel
  var numPixelsSampleTextbox = ui.Textbox({
    value: 5000,
    placeholder: 'Number of pixel to sample',
    style: {stretch: 'horizontal'},
  });
  uClassPanel.add(numPixelsSampleTextbox);
  // Cluster panel
  var clusterPanel = ui.Panel({
    layout: ui.Panel.Layout.flow('vertical', true),
  });
  uClassPanel.add(clusterPanel);
  // Cluster algo change function
  function algoChange(){
    var panel = clusterPanel;
    var widgetsList = panel.widgets();
    ee.Algorithms.If(widgetsList.length() > 0, widgetsList.reset());
    var algo = algoSelect.getValue();
    clusterOption(algo, true);
  }
  // Helper functon too add widgets
  function addWidgets(widgetsList, panel){
    var widgets = widgetsList;
    for (var i = 0; i < widgets.length; i++){
      panel.add(widgets[i]);
    }
  }
  // Cascade K-means
  function clusterOption(algo, action){
    var panel = clusterPanel;
    var widgetsList = panel.widgets();
    var minClusters = ui.Textbox({
      value: 2,
      placeholder: 'minClusters',
      style: {stretch: 'horizontal'}
    });
    var maxClusters = ui.Textbox({
      value: 10,
      placeholder: 'maxClusters',
      style: {stretch: 'horizontal'}
    });
    var nClusters = ui.Textbox({
      value: 10,
      placeholder: 'nClusters',
      style: {stretch: 'horizontal'}
    });
    var restarts = ui.Textbox({
      value: 10,
      placeholder: 'restarts',
      style: {stretch: 'horizontal'}
    });
    var manual = ui.Checkbox({
      value: false,
      label: 'manual',
      style: {stretch: 'horizontal'}
    });
    var init = ui.Checkbox({
      value: false,
      label: 'init',
      style: {stretch: 'horizontal'}
    });
    var init2 = ui.Textbox({
      value: 0,
      placeholder: 'init',
      style: {stretch: 'horizontal'}
    });
    var canopies = ui.Checkbox({
      value: false,
      label: 'canopies',
      style: {stretch: 'horizontal'}
    });
    var maxCandidates = ui.Textbox({
      value: 100,
      placeholder: 'maxCandidates',
      style: {stretch: 'horizontal'}
    });
    var periodicPruning = ui.Textbox({
      value: 1000,
      placeholder: 'periodicPruning',
      style: {stretch: 'horizontal'}
    });
    var minDensity = ui.Textbox({
      value: 2,
      placeholder: 'minDensity',
      style: {stretch: 'horizontal'}
    });
    var t1 = ui.Textbox({
      value: -1.5,
      placeholder: 't1',
      style: {stretch: 'horizontal'}
    });
    var t2 = ui.Textbox({
      value: -1,
      placeholder: 't2',
      style: {stretch: 'horizontal'}
    });
    var distanceFunction = ui.Select({
      items: ['Euclidean', 'Manhattan'],
      value: 'Euclidean',
      placeholder: 'distanceFunction',
      style: {stretch: 'horizontal'}
    });
    var maxIterations = ui.Textbox({
      value: 1,
      placeholder: 'maxIterations',
      style: {stretch: 'horizontal'}
    });
    var preserveOrder = ui.Checkbox({
      value: false,
      label: 'preserveOrder',
      style: {stretch: 'horizontal'}
    });
    var fast = ui.Checkbox({
      value: false,
      label: 'fast',
      style: {stretch: 'horizontal'}
    });
    var acuity = ui.Textbox({
      value: 1,
      placeholder: 'acuity',
      style: {stretch: 'horizontal'}
    });
    var cutoff = ui.Textbox({
      value: 0.002,
      placeholder: 'cutoff',
      style: {stretch: 'horizontal'}
    });
    var seed = ui.Textbox({
      value: 42,
      placeholder: 'seed',
      style: {stretch: 'horizontal'}
    });
    var learningRate = ui.Textbox({
      value: 1,
      placeholder: 'learningRate',
      style: {stretch: 'horizontal'}
    });
    var epochs = ui.Textbox({
      value: 1000,
      placeholder: 'epochs',
      style: {stretch: 'horizontal'}
    });
    var normalizeInput = ui.Checkbox({
      value: false,
      label: 'normalizeInput',
      style: {stretch: 'horizontal'}
    });
    var maxKMeans = ui.Textbox({
      value: 1000,
      placeholder: 'maxKMeans',
      style: {stretch: 'horizontal'}
    });
    var maxForChildren = ui.Textbox({
      value: 1000,
      placeholder: 'maxForChildren',
      style: {stretch: 'horizontal'}
    });
    var useKD = ui.Checkbox({
      value: false,
      label: 'useKD',
      style: {stretch: 'horizontal'}
    });
    var cutoffFactor = ui.Textbox({
      value: 0,
      placeholder: 'cutoffFactor',
      style: {stretch: 'horizontal'}
    });
    var clusterButton = ui.Button({
      label: 'Show classification',
      style: {stretch: 'horizontal'},
      onClick: function(){
        clusterShow();
      }
    });
    if (algo == 'Cascade K-means' && action === true) {
      addWidgets([minClusters, maxClusters, restarts, manual, init, distanceFunction, maxIterations], panel);
    } else if (algo == 'Cascade K-means' && action === false) {
      return ee.Clusterer.wekaCascadeKMeans(
        Number(minClusters.getValue()), 
        Number(maxClusters.getValue()), 
        Number(restarts.getValue()), 
        manual.getValue(), 
        init.getValue(), 
        distanceFunction.getValue(), 
        maxIterations.getValue() === null ? null : Number(maxIterations.getValue())
      ); 
    } else if (algo == 'Cobweb' && action === true) {
      addWidgets([acuity, cutoff, seed], panel);
    } else if (algo == 'Cobweb' && action === false) {
      return ee.Clusterer.wekaCobweb(
        Number(acuity.getValue()), 
        Number(cutoff.getValue()), 
        Number(seed.getValue())
      );
    } else if (algo == 'K-means' && action === true) {
      addWidgets([nClusters, init2, canopies, maxCandidates, periodicPruning, minDensity, t1, t2, 
        distanceFunction, maxIterations, preserveOrder, fast, seed], panel);
      seed.setValue(10);
    } else if (algo == 'K-means' && action === false) {
      return ee.Clusterer.wekaKMeans(
        Number(nClusters.getValue()), 
        Number(init2.getValue()),
        canopies.getValue(),
        Number(maxCandidates.getValue()),
        Number(periodicPruning.getValue()),
        Number(minDensity.getValue()),
        Number(t1.getValue()),
        Number(t2.getValue()),
        distanceFunction.getValue(), 
        maxIterations.getValue() === null ? null : Number(maxIterations.getValue()),
        preserveOrder.getValue(),
        fast.getValue(),
        Number(seed.getValue())
      );
    } else if (algo == 'LVQ' && action === true) {
      addWidgets([nClusters, learningRate, epochs, normalizeInput], panel);
      nClusters.setValue(7);
    } else if (algo == 'LVQ' && action === false) {
      return ee.Clusterer.wekaLVQ(
        Number(nClusters.getValue()), 
        Number(learningRate.getValue()), 
        Number(epochs.getValue()), 
        normalizeInput.getValue()
      );
    } else if (algo == 'X-means' && action === true) {
      addWidgets([minClusters, maxClusters, maxIterations, maxKMeans, maxForChildren, useKD, 
        cutoffFactor, distanceFunction, seed], panel);
      maxClusters.setValue(8);
      maxIterations.setValue(3);
      seed.setValue(10);
    } else if (algo == 'X-means' && action === false) {
      return ee.Clusterer.wekaXMeans(
        Number(minClusters.getValue()),
        Number(maxClusters.getValue()),
        Number(maxIterations.getValue()),
        Number(maxKMeans.getValue()),
        Number(maxForChildren.getValue()),
        useKD.getValue(),
        Number(cutoffFactor.getValue()),
        distanceFunction.getValue(),
        Number(seed.getValue())
      );
    }
    if (action === true){
      clusterPanel.add(clusterButton);
    }
  }
  // Unsupervised classification
  function cluster(){
    var col = selectCol.getValue();
    var image = medianImage(col);
    var bounds = aoi();
    var scale = image.projection().nominalScale();
    var bands = image.bandNames();
    var sample = image.sample({
      region: bounds,
      scale: scale.multiply(10),
      numPixels: Number(numPixelsSampleTextbox.getValue()),
    });
    var algo = algoSelect.getValue();
    var clusterer = clusterOption(algo, false);
    var train = clusterer.train(sample);
    var result = image.cluster(train);
    return result;
  }
  // Cluster visualization
  function clusterVis(){
    var image = cluster().select('cluster');
    var geom = image.geometry();
    var scale = image.projection().nominalScale();
    var percentile = image.reduceRegion({
      reducer: ee.Reducer.percentile([0, 100]),
      geometry: geom,
      scale: scale.multiply(10),
      bestEffort: true,
      tileScale: 2
    });
    var keys = percentile.keys();
    var min = percentile.get(keys.get(0));
    var max = percentile.get(keys.get(1));
    var color = ['DB7093', 'FFC0CB', '4B0082', '9370DB', 'B22222', 'F08080', 'FFD700', 'FFFACD', 
      '006400', '228B22', '808000', '98FB98', '000080', '1E90FF', '87CEFA', '008080', '7FFFD4',
      'D2691E', 'F5DEB3'
    ];
    var palette = ee.List(color).shuffle(false).slice(0, 5);
    return ee.Dictionary({palette: palette, min: min, max: max});
  }
  // Cluster show map
  function clusterShow(){
    resetMap();
    loading();
    var image = cluster();
    clusterVis().evaluate(function(value){
      Map.addLayer(image, value, 'Cluster');
      info('Other');
      download();
    });
  }
}
// Function for time series menu
function ts(){
  // TS panel
  var tsPanel = ui.Panel({
    layout: ui.Panel.Layout.flow('vertical', true),
  });
  advancedPanel.add(tsPanel);
  // Select collection
  var selectCol = ui.Select({
    items: ['Landsat OLI', 'Landsat TM & ETM+', 'Sentinel-2', 'Planetscope'],
    value: 'Sentinel-2',
    style: {stretch: 'horizontal'},
    onChange: function(value){
      switch(value){
        case 'Landsat OLI':
        case 'Landsat TM & ETM+':
          selectPeriod.items().reset(['Yearly', 'Seasonaly', 'Monthly']);
          break;
        case 'Sentinel-2':
        case 'Planetscope':
          selectPeriod.items().reset(['Yearly', 'Seasonaly', 'Monthly', 'Weekly']);
          break;
      }
    }
  });
  tsPanel.add(selectCol);
  // Select analysis
  var tsAnalysisSelect = ui.Select({
    items: ['GIF Animation', 'Multi temporal chart'],
    placeholder: 'Select analysis',
    style: {stretch: 'horizontal'},
    onChange: function(value){
      if(analysisPanel.widgets().length() > 0){
        analysisPanel.widgets().reset();
      }
      switch(value){
        case 'GIF Animation':
          gif();
      }
    }
  });
  tsPanel.add(tsAnalysisSelect);
  // Panel for every classification
  var analysisPanel = ui.Panel({
    layout: ui.Panel.Layout.flow('vertical', true),
  });
  tsPanel.add(analysisPanel);
  // Function for gif animation
  function gif(){
    var selectPeriod = ui.Select({
      items: ['Yearly', 'Seasonaly', 'Monthly', 'Weekly'],
      value: 'Monthly',
      style: {stretch: 'horizontal'},
    });
    analysisPanel.add(selectPeriod);
    var dimensionTextbox = ui.Textbox({
      value: 720,
      placeholder: 'Video resolution',
      style: {stretch: 'horizontal'}
    });
    analysisPanel.add(dimensionTextbox);
    var fpsTextbox = ui.Textbox({
      value: 2,
      placeholder: 'Frame per second',
      style: {stretch: 'horizontal'}
    });
    analysisPanel.add(fpsTextbox);
    var generateGIFButton = ui.Button({
      label: 'Generate GIF',
      style: {stretch: 'horizontal'},
      onClick: function(){
        gifLink.setUrl(generateGIF());
        gifLink.style().set('shown', true);
      }
    });
    analysisPanel.add(generateGIFButton);
    var gifLink = ui.Label({
      value: 'GIF link',
      style: {stretch: 'horizontal', shown: false},
    });
    analysisPanel.add(gifLink);
    // Function to create images collection
    function colGIF(){
      var col = selectCol.getValue();
      var imagesCol;
      switch(col){
        case 'Sentinel-2':
          imagesCol = sentinelImages();
          break;
        case 'Landsat OLI':
          imagesCol = landsatImages();
          break;
        case 'Landsat TM & ETM+':
          imagesCol = landsatTMImages();
          break;
        case 'Planetscope':
          imagesCol = planetscopeImages();
          break;
      }
      return imagesCol;
    }
    // Function to divide images based on period
    function periodImages(){
      var images = colGIF();
      var bounds = aoi();
      var startDate = ee.Date(date().start).millis();
      var endDate = ee.Date(date().end).millis();
      var year = 31556926000;
      var season = 788922900;
      var month = 2629743000;
      var week =  604800000;
      var addition;
      var period = selectPeriod.getValue();
      switch(period){
        case 'Yearly':
          addition = year;
          break;
        case 'Seasonaly':
          addition = season;
          break;
        case 'Monthly':
          addition = month;
          break;
        case 'Weekly':
          addition = week;
          break;
      }
      var dateList = ee.List.sequence(startDate, endDate, addition);
      var imagesList = dateList.map(function(date){
        var start = date;
        var end = start + addition;
        var filterDate = images.filterDate(start, end);
        var median = filterDate.median().clip(bounds);
        if (selectCol.getValue() == 'Sentinel-2' && median.bandNames().length() > 0) {
          median = median.setDefaultProjection('EPSG:4326', null, 10)
            .multiply(0.0001);
        } else if ((selectCol.getValue() == 'Landsat OLI' || selectCol.getValue() == 'Landsat TM & ETM+') && median.bandNames().length() > 0) {
          median = median.setDefaultProjection('EPSG:4326', null, 30)
            .multiply(0.0000275).add(-0.2);
        } else if (selectCol.getValue() == 'Planetscope' && median.bandNames().length() > 0) {
          median = median.setDefaultProjection('EPSG:4326', null, 3)
            .multiply(0.0001);
        }
        return median.set('system:time_start', start, 'system:time_end', end);
      });
      var imagesCol = ee.ImageCollection.fromImages(imagesList);
      return imagesCol;
    }
    // Function to generate GIF
    function generateGIF(){
      var images = periodImages();
      var vis = imageVis();
      var bounds = aoi();
      var visualized = images.map(function(img){
        return img.visualize(vis);
      });
      // Define arguments for animation function parameters.
      var videoArgs = {
        dimensions: dimensionTextbox.getValue(),
        region: bounds,
        framesPerSecond: fpsTextbox.getValue(),
        crs: 'EPSG:4326'
      };
      var gifThumb = visualized.getVideoThumbURL(videoArgs);
      return gifThumb;
    }
  }
}
// Function for supervised classification
function superClass(){
  // Uclass panel
  var superClassPanel = ui.Panel({
    layout: ui.Panel.Layout.flow('vertical', true),
  });
  advancedPanel.add(superClassPanel);
  // Select collection
  var selectCol = ui.Select({
    items: ['Landsat OLI', 'Landsat TM & ETM+', 'Sentinel-2', 'Planetscope'],
    value: 'Sentinel-2',
    style: {stretch: 'horizontal'},
  });
  superClassPanel.add(selectCol);
  // Class number textbox
  var classNumber = ui.Textbox({
    placeholder: 'Number of classes',
    value: 3,
    style: {stretch: 'horizontal'},
    onChange: function(value){
      changeNumber(Number(value));
    }
  });
  superClassPanel.add(classNumber);
  // Sampling panel
  var samplingPanel = ui.Panel({
    layout: ui.Panel.Layout.flow('vertical', true),
  });
  superClassPanel.add(samplingPanel);
  drawMode(['point']);
  changeNumber(3);
  // Function for panel add
  function changeNumber(value){
    var widgetsList = samplingPanel.widgets();
    var listLength = widgetsList.length();
    if (value === 0){
      widgetsList.reset();
    } else if (listLength > value && value > 0){
      for (var i = value-1; i < listLength; i++){
        widgetsList.remove(widgetsList.get(i));
      }
    } else if (listLength < value){
      for (var x = 0; x < value-listLength; x++){
        sampleOptionPanel();
      }
    }
  }
  // Function for sample class panel option
  function sampleOptionPanel(){
    var classValue = ui.Textbox({
      placeholder: 'Value',
      style: {width: '50px'}
    });
    var className = ui.Textbox({
      placeholder: 'Class name (string)',
      style: {stretch: 'horizontal'}
    });
    var geometry = ui.Select({
      placeholder: 'Select geometry',
      style: {stretch: 'horizontal'},
    });
    draw(geometry);
    var deleteSample = ui.Button({
      label: 'Delete',
      onClick: function(){
        samplingPanel.remove(classPanel);
        classNumber.setValue(classNumber.getValue()-1);
      }
    });
    var classPanel = ui.Panel({
      layout: ui.Panel.Layout.flow('horizontal', true),
      widgets: [classValue, className, geometry, deleteSample]
    });
    samplingPanel.add(classPanel);
  }
  // Function to generate feature collection with sample
  function featureCol(){
    var panel = samplingPanel;
    var widgetList = panel.widgets();
    var length = classNumber.getValue();
    var list = [];
    for (var i = 0; i < length; i++){
      list.push(i);
    }
    var featureList = list.map(function(obj){
      var widgetListClass = widgetList.get(obj).widgets();
      var value = widgetListClass.get(0).getValue();
      var name =  widgetListClass.get(1).getValue();
      var geometry = widgetListClass.get(2);
      var feature = ee.Feature(drawGeometry(geometry)).set('class_id', Number(value), 'label', name);
      return feature;
    });
    return ee.FeatureCollection(featureList);
  }
  // Super classification algorithms
  var algoSelect = ui.Select({
    items: ['CART', 'Random forest', 'SVM', 'Minimum distance', 'Gradient tree boost', 'Naive bayes'],
    placeholder: 'Select algorithm',
    style: {stretch: 'horizontal'},
    onChange: function(){
      algoChange();
    }
  });
  superClassPanel.add(algoSelect);
  // Algo panel
  var optionPanel = ui.Panel({
    layout: ui.Panel.Layout.flow('vertical', true),
  });
  superClassPanel.add(optionPanel);
  // Classifier algo change function
  function algoChange(){
    var panel = optionPanel;
    var widgetsList = panel.widgets();
    if (widgetsList.length() > 0){
      widgetsList.reset();
    }
    var algo = algoSelect.getValue();
    superOption(algo, true);
  }
  // Helper functon too add widgets
  function addWidgets(widgetsList, panel){
    var widgets = widgetsList;
    for (var i = 0; i < widgets.length; i++){
      panel.add(widgets[i]);
    }
  }
  // Function for supervised classification option
  function superOption(algo, action){
    var panel = optionPanel;
    var widgetsList = panel.widgets();
    var maxNodes = ui.Textbox({
      value: null,
      placeholder: 'maxNodes',
      style: {stretch: 'horizontal'}
    });
    var minLeafPopulation = ui.Textbox({
      value: 1,
      placeholder: 'minLeafPopulation',
      style: {stretch: 'horizontal'}
    });
    var decisionProcedure = ui.Select({
      items: ['Voting', 'Margin'],
      value: 'Voting',
      placeholder: 'decisionProcedure',
      style: {stretch: 'horizontal'}
    });
    var svmType	= ui.Select({
      items: ['C_SVC', 'NU_SVC', 'ONE_CLASS', 'EPSILON_SVR', 'NU_SVR'],
      value: 'C_SVC',
      placeholder: 'svmType',
      style: {stretch: 'horizontal'}
    });
    var kernelType = ui.Select({
      items: ['LINEAR', 'POLY', 'RBF', 'SIGMOID'],
      value: 'LINEAR',
      placeholder: 'kernelType',
      style: {stretch: 'horizontal'}
    });
    var shrinking = ui.Checkbox({
      value: true,
      label: 'shrinking',
      style: {stretch: 'horizontal'}
    });
    var degree = ui.Textbox({
      value: null,
      placeholder: 'degree',
      style: {stretch: 'horizontal'}
    });
    var gamma = ui.Textbox({
      value: null,
      placeholder: 'gamma',
      style: {stretch: 'horizontal'}
    });
    var coef0 = ui.Textbox({
      value: null,
      placeholder: 'coef0',
      style: {stretch: 'horizontal'}
    });
    var cost = ui.Textbox({
      value: null,
      placeholder: 'cost',
      style: {stretch: 'horizontal'}
    });
    var nu = ui.Textbox({
      value: null,
      placeholder: 'nu',
      style: {stretch: 'horizontal'}
    });
    var terminationEpsilon = ui.Textbox({
      value: null,
      placeholder: 'terminationEpsilon',
      style: {stretch: 'horizontal'}
    });
    var lossEpsilon = ui.Textbox({
      value: null,
      placeholder: 'lossEpsilon',
      style: {stretch: 'horizontal'}
    });
    var oneClass = ui.Textbox({
      value: null,
      placeholder: 'oneClass',
      style: {stretch: 'horizontal'}
    });
    var numberOfTrees = ui.Textbox({
      value: 50,
      placeholder: 'numberOfTrees',
      style: {stretch: 'horizontal'}
    });
    var variablesPerSplit = ui.Textbox({
      value: null,
      placeholder: 'variablesPerSplit',
      style: {stretch: 'horizontal'}
    });
    var bagFraction = ui.Textbox({
      value: 0.5,
      placeholder: 'bagFraction',
      style: {stretch: 'horizontal'}
    });
    var seed = ui.Textbox({
      value: null,
      placeholder: 'seed',
      style: {stretch: 'horizontal'}
    });
    var metric = ui.Select({
      items: ['euclidean', 'cosine', 'mahalanobis'],
      value: 'euclidean',
      placeholder: 'metric',
      style: {stretch: 'horizontal'}
    });
    var kNearest = ui.Textbox({
      value: 1,
      placeholder: 'kNearest',
      style: {stretch: 'horizontal'}
    });
    var shrinkage = ui.Textbox({
      value: 0.005,
      placeholder: 'shrinkage',
      style: {stretch: 'horizontal'}
    });
    var samplingRate = ui.Textbox({
      value: 0.7,
      placeholder: 'samplingRate',
      style: {stretch: 'horizontal'}
    });
    var loss = ui.Select({
      items: ['LeastSquares', 'LeastAbsoluteDeviation', 'Huber'],
      value: 'LeastAbsoluteDeviation',
      placeholder: 'loss',
      style: {stretch: 'horizontal'}
    });
    var lambda = ui.Textbox({
      value: 0.000001,
      placeholder: 'lambda',
      style: {stretch: 'horizontal'}
    });
    var superButton = ui.Button({
      label: 'Show classification',
      style: {stretch: 'horizontal'},
      onClick: function(){
        superShow();
      }
    });
    if (algo == 'CART' && action === true) {
      addWidgets([maxNodes, minLeafPopulation], panel);
    } else if (algo == 'CART' && action === false) {
      return ee.Classifier.smileCart(
        maxNodes.getValue() === null ? null : Number(maxNodes.getValue()), 
        Number(minLeafPopulation.getValue())
      ); 
    } else if (algo == 'SVM' && action === true) {
      addWidgets([decisionProcedure, svmType, kernelType, shrinking, degree, gamma, coef0, 
        cost, nu, terminationEpsilon, lossEpsilon, oneClass], panel);
    } else if (algo == 'SVM' && action === false) {
      return ee.Classifier.libsvm(
        decisionProcedure.getValue(),
        svmType.getValue(),
        kernelType.getValue(),
        shrinking.getValue(),
        degree.getValue() === null ? null : Number(degree.getValue()), 
        gamma.getValue() === null ? null : Number(gamma.getValue()),
        coef0.getValue() === null ? null : Number(coef0.getValue()),
        cost.getValue() === null ? null : Number(cost.getValue()),
        nu.getValue() === null ? null : Number(nu.getValue()),
        terminationEpsilon.getValue() === null ? null : Number(terminationEpsilon.getValue()),
        lossEpsilon.getValue() === null ? null : Number(lossEpsilon.getValue()),
        oneClass.getValue() === null ? null : Number(oneClass.getValue())
      ); 
    } else if (algo == 'Random forest' && action === true) {
      addWidgets([numberOfTrees, variablesPerSplit, minLeafPopulation, bagFraction, maxNodes, seed], panel);
    } else if (algo == 'Random forest' && action === false) {
      return ee.Classifier.smileRandomForest(
        Number(numberOfTrees.getValue()), 
        variablesPerSplit.getValue() === null ? null : Number(variablesPerSplit.getValue()),
        Number(minLeafPopulation.getValue()),
        Number(bagFraction.getValue()),
        maxNodes.getValue() === null ? null : Number(maxNodes.getValue()),
        Number(seed.getValue())
      );
    } else if (algo == 'Minimum distance' && action === true) {
      addWidgets([metric, kNearest], panel);
    } else if (algo == 'Minimum distance' && action === false) {
      return ee.Classifier.minimumDistance(
        metric.getValue(),
        Number(kNearest.getValue())
      );
    } else if (algo == 'Gradient tree boost' && action === true) {
      addWidgets([numberOfTrees, shrinkage, samplingRate, maxNodes, loss, seed], panel);
    } else if (algo == 'Gradient tree boost' && action === false) {
      return ee.Classifier.smileGradientTreeBoost(
        Number(numberOfTrees.getValue()), 
        Number(shrinkage.getValue()), 
        Number(samplingRate.getValue()), 
        maxNodes.getValue() === null ? null : Number(maxNodes.getValue()), 
        loss.getValue(), 
        Number(seed.getValue())
      );
    } else if (algo == 'Naive bayes' && action === true) {
      addWidgets([lambda], panel);
    } else if (algo == 'Naive bayes' && action === false) {
      return ee.Classifier.smileNaiveBayes(
        Number(lambda.getValue())
      );
    }
    if (action === true){
      panel.add(superButton);
    }
  }
  // Function to create training data
  function classification(){
    var image = medianImage(selectCol.getValue());
    var bandName = image.bandNames();
    var features = featureCol();
    var sample = image.select(bandName).sampleRegions({
      collection: features,
      properties: ['class_id']
    });
    var classifier = superOption(algoSelect.getValue(), false);
    var trained = classifier.train(sample, 'class_id', bandName);
    var classified = image.select(bandName).classify(trained);
    return classified;
  }
  // Function image vis
  function classVis(){
    var feature = featureCol();
    var classList = feature.aggregate_array('class_id').distinct().sort();
    var classCount = classList.length();
    var classNameList = feature.sort('class_id').aggregate_array('label').distinct();
    var color = ['DB7093', 'FFC0CB', '4B0082', '9370DB', 'B22222', 'F08080', 'FFD700', 'FFFACD', 
      '006400', '228B22', '808000', '98FB98', '000080', '1E90FF', '87CEFA', '008080', '7FFFD4',
      'D2691E', 'F5DEB3'
    ];
    var palette = ee.List(color).shuffle(false).slice(0, classCount);
    var min = classList.get(0);
    var max = classList.get(classCount);
    return ee.Dictionary({classList: classList, classNameList: classNameList, classCount: classCount, palette: palette});
  }
  // Function super show
  function superShow(){
    resetMap();
    loading();
    var image = classification();
    var band = image.bandNames().get(0);
    classVis().evaluate(function(vis){
      var names = vis.classNameList;
      var values = vis.classList;
      var palette = vis.palette;
      var imageClass = image.set(
        'classification_class_values', values,
        'classification_class_names', names,
        'classification_class_palette', palette
      );
      Map.addLayer(imageClass, {}, 'Classification');
      info('Other');
      var legend = legendCategory('Classification', names, palette, vis.classCount, 'bottom-left');
      Map.add(legend);
      download();
    });
  }
}
// Function for OBIA
function obia(){
  // OBIA panel
  var obiaPanel = ui.Panel({
    layout: ui.Panel.Layout.flow('vertical', true),
  });
  advancedPanel.add(obiaPanel);
  // Select collection
  var selectCol = ui.Select({
    items: ['Landsat OLI', 'Landsat TM & ETM+', 'Sentinel-2', 'Planetscope'],
    value: 'Sentinel-2',
    style: {stretch: 'horizontal'},
    onChange: function(value){
    }
  });
  obiaPanel.add(selectCol);
  // Seed panel
  var seedPanel = ui.Panel({
    layout: ui.Panel.Layout.flow('horizontal', true),
  });
  obiaPanel.add(seedPanel);
  // Seed size
  var seedSizeText = ui.Textbox({
    value: 5,
    placeholder: 'size',
    style: {stretch: 'horizontal'}
  });
  seedPanel.add(seedSizeText);
  // Seed grid type
  var seedGridSelect = ui.Select({
    value: 'hex',
    items: ['square', 'hex'],
    style: {stretch: 'horizontal'}
  });
  seedPanel.add(seedGridSelect);
  // Select segmentation algorithms
  var segmentSelect = ui.Select({
    items: ['GMeans', 'KMeans', 'SNIC'],
    placeholder: 'Select algorithm',
    style: {stretch: 'horizontal'},
    onChange: function(value){
      algoChange();
    }
  });
  obiaPanel.add(segmentSelect);
  // Segment option panel
  var segmentOptionPanel = ui.Panel({
    layout: ui.Panel.Layout.flow('vertical', true)
  });
  obiaPanel.add(segmentOptionPanel);
  // Segment algo change function
  function algoChange(){
    var panel = segmentOptionPanel;
    var widgetsList = panel.widgets();
    if (widgetsList.length() > 0){
      widgetsList.reset();
    }
    var algo = segmentSelect.getValue();
    obiaOption(algo, true);
  }
  // Helper functon too add widgets
  function addWidgets(widgetsList, panel){
    var widgets = widgetsList;
    for (var i = 0; i < widgets.length; i++){
      panel.add(widgets[i]);
    }
  }
  // Function for supervised classification option
  function obiaOption(algo, action){
    var panel = segmentOptionPanel;
    var widgetsList = panel.widgets();
    var numIterations = ui.Textbox({
      value: 10,
      placeholder: 'numIterations',
      style: {stretch: 'horizontal'}
    });
    var pValue = ui.Textbox({
      value: 50,
      placeholder: 'pValue',
      style: {stretch: 'horizontal'}
    });
    var neighborhoodSize  = ui.Textbox({
      value: 0,
      placeholder: 'neighborhoodSize',
      style: {stretch: 'horizontal'}
    });
    var gridSize  = ui.Textbox({
      value: null,
      placeholder: 'gridSize',
      style: {stretch: 'horizontal'}
    });
    var uniqueLabels = ui.Checkbox({
      value: true,
      label: 'uniqueLabels',
      style: {stretch: 'horizontal'}
    });
    var numClusters = ui.Textbox({
      value: 8,
      placeholder: 'numIterations',
      style: {stretch: 'horizontal'}
    });
    var forceConvergence = ui.Checkbox({
      value: false,
      label: 'forceConvergence',
      style: {stretch: 'horizontal'}
    });
    var size = ui.Textbox({
      value: 5,
      placeholder: 'size',
      style: {stretch: 'horizontal'}
    });
    var compactness = ui.Textbox({
      value: 1,
      placeholder: 'compactness',
      style: {stretch: 'horizontal'}
    });
    var connectivity = ui.Textbox({
      value: 8,
      placeholder: 'connectivity',
      style: {stretch: 'horizontal'}
    });
    var seeds = ui.Checkbox({
      value: true,
      label: 'seeds',
      style: {stretch: 'horizontal'}
    });
    var clusterShowButton = ui.Button({
      label: 'Show cluster',
      style: {stretch: 'horizontal'},
      onClick: function(){
        clusterShow();
      }
    });
    var segmentShowButton = ui.Button({
      label: 'Show segmentation',
      style: {stretch: 'horizontal'},
      onClick: function(){
        segmentShow();
      }
    });
    if (algo == 'GMeans' && action === true) {
      addWidgets([numIterations, pValue, neighborhoodSize, gridSize, uniqueLabels], panel);
    } else if (algo == 'GMeans' && action === false) {
      return ee.Algorithms.Image.Segmentation.GMeans(
        medianImage(selectCol.getValue()),
        Number(numIterations.getValue),
        Number(pValue.getValue),
        Number(neighborhoodSize.getValue),
        gridSize.getValue() === null ? null : Number(gridSize.getValue()), 
        uniqueLabels.getValue()
      ); 
    } else if (algo == 'KMeans' && action === true) {
      addWidgets([numClusters, numIterations, neighborhoodSize, gridSize, forceConvergence, uniqueLabels], panel);
      numIterations.setValue(20);
    } else if (algo == 'KMeans' && action === false) {
      return ee.Algorithms.Image.Segmentation.KMeans(
        medianImage(selectCol.getValue()),
        Number(numClusters.getValue()),
        Number(numIterations.getValue()),
        Number(neighborhoodSize.getValue()),
        gridSize.getValue() === null ? null : Number(gridSize.getValue()), 
        forceConvergence.getValue(),
        uniqueLabels.getValue()
      ); 
    } else if (algo == 'SNIC' && action === true) {
      addWidgets([size, compactness, connectivity, neighborhoodSize, seeds], panel);
    } else if (algo == 'SNIC' && action === false) {
      return ee.Algorithms.Image.Segmentation.SNIC(
        medianImage(selectCol.getValue()),
        size.getValue() === null ? null : Number(size.getValue()),
        Number(compactness.getValue()),
        Number(connectivity.getValue()),
        Number(neighborhoodSize.getValue()),
        seeds.getValue() === null ? null : ee.Algorithms.Image.Segmentation.seedGrid(Number(seedSizeText.getValue()), seedGridSelect.getValue())
      );
    }
    if (action === true){
      panel.add(clusterShowButton);
      panel.add(segmentShowButton);
    }
  }
  // Function to show cluster
  function clusterShow(){
    resetMap();
    var scale = medianImage(selectCol.getValue()).projection().nominalScale()
      .multiply(Number(seedSizeText.getValue()));
    var image = obiaOption(segmentSelect.getValue(), false)
      .select('clusters')
      .reproject('EPSG:4326', null, scale);
    Map.addLayer(image.randomVisualizer(), {}, 'Clusters');
  }
  // Function to show segment
  function segmentShow(){
    resetMap();
    var image = medianImage(selectCol.getValue());
    var scale = image.projection().nominalScale()
      .multiply(Number(seedSizeText.getValue()));
    var bands = [bandSelectRed.getValue(), bandSelectGreen.getValue(), bandSelectBlue.getValue()]
      .map(function(value){
        return value+'_mean';
      });
    var segment = obiaOption(segmentSelect.getValue(), false)
      .select(bands)
      .reproject('EPSG:4326', null, scale);
    var vis = visStretch(segment.clip(aoiVis()), bands, minTextbox.getValue(), maxTextbox.getValue(), scale);
    vis.evaluate(function(value){
      Map.addLayer(segment, value, 'Segment');
    });
  }
}
function info(value){
  var infoPanel = ui.Panel({
    layout: ui.Panel.Layout.flow('vertical', true),
    style: {width: '400px', position: 'bottom-left'}
  });
  Map.add(infoPanel);
  var clickLabel = ui.Label({
    value: 'Click map to get value!',
    style: {color: 'blue'}
  });
  infoPanel.add(clickLabel);
  var image = Map.layers().get(0).getEeObject();
  var bands = image.bandNames();
  var scale = image.projection().nominalScale();
  var clickInfo;
  switch(value){
    case 'Imagery':
      clickInfo = click;
      break;
    case 'Index':
      clickInfo = clickIndex;
      break;
    case 'Other':
      clickInfo = clickOther;
      break;
  }
  Map.onClick(clickInfo);
  function click(point){
    var lon = point.lon;
    var lat = point.lat;
    var geom = ee.Geometry.Point([lon, lat]);
    if(infoPanel.widgets().get(1) !== null || infoPanel.widgets().get(1) !== undefined){
      infoPanel.remove(infoPanel.widgets().get(1));
    }
    bands.evaluate(function(value){
      var chart = ui.Chart.image.regions({
        image: image,
        reducer: ee.Reducer.first(),
        scale: scale,
        regions: geom,
        xLabels: value
      }).setChartType('ColumnChart');
      infoPanel.add(chart);
    });
  }
  function clickIndex(point){
    var lon = point.lon;
    var lat = point.lat;
    var geom = ee.Geometry.Point([lon, lat]);
    var valueIndex = image.reduceRegion({
      reducer: ee.Reducer.first(),
      geometry: geom,
      scale: scale,
      bestEffort: true
    }).get(bands.get(0));
    if(infoPanel.widgets().get(1) !== null || infoPanel.widgets().get(1) !== undefined){
      infoPanel.remove(infoPanel.widgets().get(1));
    }
    var index = indexSelect.getValue();
    var indexName;
    if (index !== 'Custom'){
      indexName = index;
    } else {
      indexName = indexTextbox.getValue();
    }
    valueIndex.evaluate(function(value){
      var text = ui.Label({
        value: indexName + ': ' + value,
        style: {fontWeight: 'bold'}
      });
      infoPanel.add(text);
    });
  }
  function clickOther(point){
    var lon = point.lon;
    var lat = point.lat;
    var geom = ee.Geometry.Point([lon, lat]);
    var valueIndex = image.reduceRegion({
      reducer: ee.Reducer.first(),
      geometry: geom,
      scale: scale,
      bestEffort: true
    }).get(bands.get(0));
    if(infoPanel.widgets().get(1) !== null || infoPanel.widgets().get(1) !== undefined){
      infoPanel.remove(infoPanel.widgets().get(1));
    }
    var indexName = bands.get(0);
    var keys = ee.Dictionary({indexName: indexName, valueIndex: valueIndex});
    keys.evaluate(function(key){
      var text = ui.Label({
        value: key.indexName + ': ' + key.valueIndex,
        style: {fontWeight: 'bold'}
      });
      infoPanel.add(text);
    });
  }
}
// Function to download data
function download(){
  // Download panel
  var downloadPanel = ui.Panel({
    layout: ui.Panel.Layout.flow('horizontal', true),
    style: {position: 'bottom-right'}
  });
  Map.add(downloadPanel);
  // Download image button
  var downloadImageButton = ui.Button({
    label: 'Click to generate image download link',
    onClick: downloadImage
  });
  downloadPanel.add(downloadImageButton);
  // Url label
  var urlLabel = ui.Label({
    style: {shown: false, padding: '5px 0px'}
  });
  downloadPanel.add(urlLabel);
  // Download image function
  function downloadImage(){
    var bounds = aoi();
    var image = Map.layers().get(0).getEeObject().multiply(10000).toInt16();
    var bandsName = Map.layers().get(0).getVisParams().bands;
    var imageScale = image.projection().nominalScale().multiply(10);
    imageScale.evaluate(function(value){
      var param = {
        name: 'Image',
        bands: bandsName,
        crs: 'EPSG:4326',
        filePerBand: false,
        format: 'GEO_TIFF',
        region: bounds,
        scale: value
      };
      image.getDownloadURL({params: param, callback: getUrl});
      function getUrl(url){
        var link = url;
        if (link === null || link === undefined) {
          urlLabel.setValue('Image size too big!');
          urlLabel.style().set({color: 'red'});
        } else {
          urlLabel.setValue('Click to download!');
          urlLabel.style().set({color: 'blue'});
        }
        urlLabel.setUrl(url);
        urlLabel.style().set({shown: true});
      }
    });
  }
}