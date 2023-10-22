var gfd = ui.import && ui.import("gfd", "imageCollection", {
      "id": "GLOBAL_FLOOD_DB/MODIS_EVENTS/V1"
    }) || ee.ImageCollection("GLOBAL_FLOOD_DB/MODIS_EVENTS/V1"),
    gsw = ui.import && ui.import("gsw", "imageCollection", {
      "id": "JRC/GSW1_3/MonthlyHistory"
    }) || ee.ImageCollection("JRC/GSW1_3/MonthlyHistory"),
    adm0 = ui.import && ui.import("adm0", "table", {
      "id": "projects/earthengine-legacy/assets/projects/sat-io/open-datasets/geoboundaries/HPSCGS-ADM0"
    }) || ee.FeatureCollection("projects/earthengine-legacy/assets/projects/sat-io/open-datasets/geoboundaries/HPSCGS-ADM0"),
    nasadem = ui.import && ui.import("nasadem", "image", {
      "id": "NASA/NASADEM_HGT/001"
    }) || ee.Image("NASA/NASADEM_HGT/001"),
    mainlands = ui.import && ui.import("mainlands", "table", {
      "id": "projects/sat-io/open-datasets/shoreline/mainlands"
    }) || ee.FeatureCollection("projects/sat-io/open-datasets/shoreline/mainlands"),
    big_islands = ui.import && ui.import("big_islands", "table", {
      "id": "projects/sat-io/open-datasets/shoreline/big_islands"
    }) || ee.FeatureCollection("projects/sat-io/open-datasets/shoreline/big_islands"),
    small_islands = ui.import && ui.import("small_islands", "table", {
      "id": "projects/sat-io/open-datasets/shoreline/small_islands"
    }) || ee.FeatureCollection("projects/sat-io/open-datasets/shoreline/small_islands");
// Function to get shoreline
function shoreline(){
  return mainlands.merge(big_islands).merge(small_islands);
}
// Function to zoom location or Indonesia
function myLocation(){
  // Indonesia layer for zoom
  var indonesia = adm0.filter(ee.Filter.eq('shapeName', 'Indonesia'));
  // Zoom to current location or Indonesia
  function current_position(point) {
    Map.centerObject(point, 10);
  }
  function oops(error) {
    Map.centerObject(indonesia, 5);
  }
  ui.util.getCurrentPosition(current_position, oops);
}
myLocation();
// Function to start map
function resetMap(){
  // Clear map
  Map.clear();
  // Change cursor
  Map.style().set({cursor: 'crosshair'});
  // Set map option
  Map.setOptions("SATELLITE");
  // Change map view
  Map.setControlVisibility({
    all: false,
    scaleControl: true,
    fullscreenControl: true,
    layerList: true,
    drawingToolsControl: true
  });
  // Set drawing tools to only be rectangle and not linked to script
  Map.drawingTools().setDrawModes(['rectangle']).setLinked(false);
  // Set geometry to hide after each function
  Map.drawingTools().layers().forEach(function(obj){
    obj.setShown(false);
  });
}
resetMap();
// UI root var
var root = ui.root;
// Main panel for app
var mainPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical', true),
  style: {maxWidth: '400px', padding: '15px'}
});
root.add(mainPanel);
// Title for the app
var titleLabel = ui.Label({
  style: {color: 'DodgerBlue', fontWeight: 'bold', fontSize: '30px', margin: '10px 5px'},
  value: 'Future Flood Risk Extent'
});
mainPanel.add(titleLabel);
// AOI select button
var aoiSelect = ui.Select({
  placeholder: 'Select AOI',
  items: ['Global', 'Map bounds', 'Draw AOI', 'GeoJSON'],
  value: 'Global',
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
      predictButton.setDisabled(true);
    } else if (value == 'GeoJSON' && geojsonTextbox.getValue() === undefined) {
      predictButton.setDisabled(true);
    } else {
      predictButton.setDisabled(false);
    }
  }
});
mainPanel.add(aoiSelect);
// Draw AOI select
var drawAoiSelect = ui.Select({
  placeholder: 'Draw or select an AOI',
  style: {stretch: 'horizontal', shown: false},
  onChange: function(value){
    if (aoiSelect.getValue() == 'Draw AOI' && drawAoiSelect.getValue() === null){
      predictButton.setDisabled(true);
    } else if (aoiSelect.getValue() == 'GeoJSON' && geojsonTextbox.getValue() === undefined) {
      predictButton.setDisabled(true);
    } else {
      predictButton.setDisabled(false);
    }
  }
});
mainPanel.add(drawAoiSelect);
// Drawing tools function
function draw(){
  // Drawing tools
  var drawingTools = Map.drawingTools();
  // Function when drawing tools change
  function change() {
    var layer = drawingTools.layers();
    var name = layer.getJsArray().map(function(obj){
      var objName = obj.getName();
      return objName;
    });
    drawAoiSelect.items().reset(name);
  }
  change();
  // Applying change function to drawing tools
  drawingTools.onLayerAdd(change);
  drawingTools.onLayerRemove(change);
}
draw();
// Textbox to add geojson string
var geojsonTextbox = ui.Textbox({
  placeholder: 'Paste GeoJSON string here!',
  style: {stretch: 'horizontal', shown: false},
  onChange: function(value){
    if (aoiSelect.getValue() == 'Draw AOI' && drawAoiSelect.getValue() === null){
      predictButton.setDisabled(true);
    } else if (aoiSelect.getValue() == 'GeoJSON' && geojsonTextbox.getValue() === undefined) {
      predictButton.setDisabled(true);
    } else {
      predictButton.setDisabled(false);
    }
  }
});
mainPanel.add(geojsonTextbox);
// Select button for analysis
var analysisSelect = ui.Select({
  items: ['Flood only', 'Water only', 'Flood and water'],
  value: 'Flood and water',
  style: {stretch: 'horizontal'},
  onChange: function(value){
  }
});
mainPanel.add(analysisSelect);
// Month slider
var monthSlider = ui.DateSlider({
  start: '1984-01-01',
  end: '2100-01-01',
  value: '2050-01-01',
  period: 30,
  style: {stretch: 'horizontal'}
});
mainPanel.add(monthSlider);
// Show map button
var predictButton = ui.Button({
  label: 'Show prediction',
  style: {stretch: 'horizontal'},
  onClick: function(){
    showImage();
  }
});
mainPanel.add(predictButton);
// Function to get map bounds as geometry
function boundsGeom(){
  var bounds = ee.Geometry(Map.getBounds(true));
  return bounds;
}
// Function to return draw aoi as geometry
function drawGeometry(){
  var geomName = drawAoiSelect.getValue();
  var layer = ee.FeatureCollection(Map.drawingTools().layers().getJsArray().map(function(obj){
    var name = obj.getName();
    return ee.Feature(obj.getEeObject()).set({'name': name});
  }));
  var geom = layer.filter(ee.Filter.eq('name', geomName)).first().geometry();
  return geom;
}
// Function to have a geometry with geojson
function geojson(){
  var string = geojsonTextbox.getValue();
  var jsonString = JSON.parse(string);
  var geometryJSON = ee.FeatureCollection(jsonString).geometry();
  return geometryJSON;
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
      geom = drawGeometry();
      break;
    case 'GeoJSON':
      geom = geojson();
  }
  return geom;
}
// Function to get DEM
function dem(){
  var elevation = nasadem.select('elevation').multiply(10);
  var N = ee.Terrain.hillshade(elevation,0,36).multiply(0);
  var NE = ee.Terrain.hillshade(elevation,45,44).multiply(0);
  var E = ee.Terrain.hillshade(elevation,90,56).multiply(0);
  var SE = ee.Terrain.hillshade(elevation,135,68).multiply(0);
  var S = ee.Terrain.hillshade(elevation,180,80).multiply(0.1);
  var SW = ee.Terrain.hillshade(elevation,225,68).multiply(0.2);
  var W = ee.Terrain.hillshade(elevation,270,56).multiply(0.2);
  var NW = ee.Terrain.hillshade(elevation,315,44).multiply(0.5);
  var MULTI = N.add(NE).add(E).add(SE).add(S).add(SW).add(W).add(NW).visualize({
    min:0,
    max:255,
    palette:['#000000', '#ffffff']
  }).resample('bicubic').updateMask(0.5);
  var SLOPE = ee.Terrain.slope(elevation).multiply(2).visualize({
    min:100,
    max:180,
    palette:['#ffffff', '#000000']
  }).resample('bicubic').updateMask(1);
  var SHADED_RELIEF = ee.ImageCollection([SLOPE, MULTI]).mosaic().reduce(ee.Reducer.median()).updateMask(1);
  var reliefVisualized = SHADED_RELIEF.visualize({min:0, max:255, gamma:1}).divide(255);
  var ELEVATION = nasadem.visualize({bands: 'elevation', min:0, max:5000, palette:['green', 'yellow', 'red', 'white']})
    .resample('bicubic')
    .updateMask(0.3)
    .divide(255);
  var feature = shoreline();
  var combined = reliefVisualized.blend(ELEVATION).clip(feature);
  return combined;
}
// Function for water regresson
function waterTrend(){
  var water = gsw;
  var waterLayer = water.map(function(obj){
    var image = ee.Image(obj).where(obj.eq(1).or(obj.eq(0)), 0).where(obj.eq(2), 1);
    var timeBand = ee.Image(obj.metadata('system:time_start'));
    return image.addBands(timeBand);
  });
  var regression = waterLayer.select(['system:time_start', 'water']).reduce(ee.Reducer.linearFit());
  return regression;
}
// Function to get monthly water
function waterHistory(){
  var water = gsw;
  var date = monthSlider.getValue();
  var start = ee.Number.parse(date.slice(0, 1).toString());
  var end = ee.Number.parse(date.slice(1).toString());
  var regression = waterTrend();
  var scale = regression.select('scale');
  var offset = regression.select('offset');
  var feature = shoreline();
  var newWater = scale.multiply(start).add(offset);
  var correctedWater = ee.Image(water.first()).where(newWater.gte(1), 1).where(newWater.lt(1), 0).clip(feature).selfMask();
  var waterVisualized = correctedWater.visualize({palette: 'LightSkyBlue'}).resample('bicubic');
  return waterVisualized;
}
// Function to see flood trend
function floodTrend(){
  var flood = gfd.select('flooded');
  var addTimeBand = flood.map(function(obj){
    var start = ee.Image(obj.metadata('system:time_start'));
    var end = ee.Image(obj.metadata('system:time_end'));
    return obj.addBands([start, end]);
  });
  var regression = addTimeBand.select(['system:time_start', 'system:time_end', 'flooded']).reduce(ee.Reducer.linearRegression({
    numX: 2,
    numY: 1
  }));
  var band = [['start', 'end'], ['flood']];
  var flat = regression.select(['coefficients']).arrayFlatten(band);
  return flat;
}
// Flood history function
function floodHistory(){
  var flat = floodTrend();
  var startBand = flat.select('start_flood');
  var endBand = flat.select('end_flood');
  var date = monthSlider.getValue();
  var start = ee.Number.parse(date.slice(0, 1).toString());
  var end = ee.Number.parse(date.slice(1).toString());
  var newFlood = startBand.multiply(start);
  var floodCorrected = ee.Image(gsw.first()).where(newFlood.lt(1), 0).where(newFlood.gte(1), 1).selfMask();
  var floodVisualized = floodCorrected.visualize({palette: 'navy'}).resample('bicubic');
  return floodVisualized;
}
var legendTool = require('users/ramiqcom/ugm:tools/legend');
// Function to show images
function showImage(){
  // Start new map
  resetMap();
  var aoiStatus = aoiSelect.getValue();
  var analysisStatus = analysisSelect.getValue();
  // Zoom to an area
  var geom = aoi();
  if (aoiStatus !== 'Global'){
    Map.centerObject(geom, 7);
  }
  // Year month for title
  var date = monthSlider.getValue();
  var start = ee.Date(ee.Number.parse(date.slice(0, 1).toString())).format('MMMM yyyy').getInfo();
  // Add images
  var elevation = dem();
  var water = waterHistory();
  var flood = floodHistory();
  if (aoiStatus !== 'Global'){
    elevation = dem().clip(geom);
    water = waterHistory().clip(geom);
    flood = floodHistory().clip(geom);
  }
  // Legend
  var legendDEM = legendTool.legendGradient('Elevation (meter)', {palette: ['green', 'yellow', 'red', 'white'], min: 0, max: 5000}, 'bottom-left');
  var legendFloodWater = legendTool.legendDiscrete(start, ['Flood', 'Water'], ['navy', 'LightSkyBlue'], 2, 'bottom-left');
  var legendFlood = legendTool.legendDiscrete(start, ['Flood'], ['navy'], 1, 'bottom-left');
  var legendWater = legendTool.legendDiscrete(start, ['Water'], ['LightSkyBlue'], 1, 'bottom-left');
  Map.add(legendDEM);
  if (analysisStatus == 'Flood and water'){
    Map.add(legendFloodWater);
  } else if (analysisStatus == 'Flood only'){
    Map.add(legendFlood);
  } else if (analysisStatus == 'Water only'){
    Map.add(legendWater);
  }
  // Add layer to map
  if (analysisStatus == 'Flood and water'){
    Map.addLayer(elevation, {}, 'DEM');
    Map.addLayer(water, {}, 'Water');
    Map.addLayer(flood, {}, 'Flood');
  } else if (aoiStatus == 'Global' && analysisStatus == 'Flood only'){
    Map.addLayer(elevation, {}, 'DEM');
    Map.addLayer(flood, {}, 'Flood');
  } else if (aoiStatus == 'Global' && analysisStatus == 'Water only'){
    Map.addLayer(elevation, {}, 'DEM');
    Map.addLayer(water, {}, 'Water');
  }
}