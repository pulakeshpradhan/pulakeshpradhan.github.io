var sample = ui.import && ui.import("sample", "table", {
      "id": "projects/ee-fa-rs/assets/S2_Jawa_0621_0622_Sample_v2_v11"
    }) || ee.FeatureCollection("projects/ee-fa-rs/assets/S2_Jawa_0621_0622_Sample_v2_v11"),
    s2Jawa = ui.import && ui.import("s2Jawa", "image", {
      "id": "projects/ee-fa-rs/assets/S2_Jawa_0621_0622_uint16"
    }) || ee.Image("projects/ee-fa-rs/assets/S2_Jawa_0621_0622_uint16");
// Function to start map
function resetMap(){
  Map.clear();
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
  Map.drawingTools().setDrawModes(['rectangle']).setLinked(false);
  Map.drawingTools().layers().forEach(function(obj){
    obj.setShown(false);
  });
  Map.centerObject(s2Jawa, 8);
}
resetMap();
// Main panel
var mainPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical', true),
  style: {maxWidth: '400px', padding: '10px'}
});
ui.root.add(mainPanel);
// App title
var titleLabel = ui.Label({
  value: 'Carbon Calculator Map',
  style: {fontWeight: 'bold', color: 'green', fontSize: '30px', padding: '15px 0px', stretch: 'horizontal'}
});
mainPanel.add(titleLabel);
// AOI label
var aoiLabel = ui.Label({
  value: 'Select an AOI option',
});
mainPanel.add(aoiLabel);
// AOI select
var aoiSelect = ui.Select({
  items: ['GeoJSON', 'Draw AOI', 'Map bounds'],
  value: 'Draw AOI',
  style: {stretch: 'horizontal'},
  placeholder: 'Select AOI',
  onChange: function(value){
    if (value == 'Draw AOI') {
      drawSelect.style().set({shown: true});
      geojsonTextbox.style().set({shown: false});
    } else if (value == 'GeoJSON') {
      drawSelect.style().set({shown: false});
      geojsonTextbox.style().set({shown: true});
    } else {
      drawSelect.style().set({shown: false});
      geojsonTextbox.style().set({shown: false});
    }
    activateShowImageButton();
    activateShowLandCoverButton();
  }
});
mainPanel.add(aoiSelect);
// Select draw AOI
var drawSelect = ui.Select({
  placeholder: 'Select a geometry or draw geometry first!',
  style: {stretch: 'horizontal'},
  onChange: function(){
    activateShowImageButton();
  }
});
mainPanel.add(drawSelect);
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
    drawSelect.items().reset(name);
  }
  change();
  // Applying change function to drawing tools
  drawingTools.onLayerAdd(change);
  drawingTools.onLayerRemove(change);
}
draw();
// Function to return draw aoi as geometry
function drawGeometry(){
  var geomName = drawSelect.getValue();
  var layer = ee.FeatureCollection(Map.drawingTools().layers().getJsArray().map(function(obj){
    var name = obj.getName();
    return ee.Feature(obj.getEeObject()).set({'name': name});
  }));
  var geom = layer.filter(ee.Filter.eq('name', geomName)).first().geometry();
  return geom;
}
// Textbox to add geojson string
var geojsonTextbox = ui.Textbox({
  placeholder: 'Paste GeoJSON string here!',
  style: {stretch: 'horizontal', shown: false},
  onChange: function(){
    activateShowImageButton();
    activateShowLandCoverButton();
  }
});
mainPanel.add(geojsonTextbox);
// Function to have a geometry with geojson
function geojson(){
  var string = geojsonTextbox.getValue();
  var jsonString = JSON.parse(string);
  var geometryJSON = ee.FeatureCollection(jsonString).geometry();
  return geometryJSON;
}
// Function to get Map bounds
function mapBounds(){
  var bounds = ee.Geometry(Map.getBounds(true));
  return bounds;
}
// Function to decide AOI
function aoi(){
  // AOI
  var aoiFeature;
  var aoiStatus = aoiSelect.getValue();
  switch (aoiStatus) {
    case 'GeoJSON':
      aoiFeature = geojson();
      break;
    case 'Draw AOI':
      aoiFeature = drawGeometry();
      break;
    case 'Map bounds':
      aoiFeature = mapBounds();
      break;
  }
  return aoiFeature;
}
// Panel for band
var bandPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal', true),
  style: {stretch: 'horizontal'}
});
mainPanel.add(bandPanel);
// Band selection for composite
var redSelect = ui.Select({
  placeholder: 'R',
  onChange: function(){
    activateShowImageButton();
  }
});
bandPanel.add(redSelect);
var greenSelect = ui.Select({
  placeholder: 'G',
  onChange: function(){
    activateShowImageButton();
  }
});
bandPanel.add(greenSelect);
var blueSelect = ui.Select({
  placeholder: 'B',
  onChange: function(){
    activateShowImageButton();
  }
});
bandPanel.add(blueSelect);
// Function to get band names
function bands(){
  var image = s2Jawa;
  var bandName = s2Jawa.bandNames();
  bandName.evaluate(function(value){
    redSelect.items().reset(value);
    greenSelect.items().reset(value);
    blueSelect.items().reset(value);
  });
}
bands();
// Contrast slider
var contrastSlider = ui.Slider({
  min: 0.1,
  max: 0.9,
  value: 0.4,
  step: 0.1,
  style: {stretch: 'horizontal', padding: '5px 0px'}
});
bandPanel.add(contrastSlider);
// Show image button
var showImageButton = ui.Button({
  label: 'Show image',
  style: {stretch: 'horizontal'},
  disabled: true,
  onClick: function(){
    showImage();
    activateShowLandCoverButton();
  }
});
mainPanel.add(showImageButton);
// Function to activate show images
function activateShowImageButton(){
  var aoiStatus = aoiSelect.getValue();
  var geojsonstatus = geojsonTextbox.getValue();
  var drawSelectStatus = drawSelect.getValue();
  var red = redSelect.getValue();
  var green = greenSelect.getValue();
  var blue = blueSelect.getValue();
  if (aoiStatus == 'GeoJSON' && geojsonstatus !== null && red !== null && green !== null && blue !== null) {
    showImageButton.setDisabled(false);
  } else if (aoiStatus == 'Draw AOI' && drawSelectStatus !== null && red !== null && green !== null && blue !== null) {
    showImageButton.setDisabled(false);
  } else if (aoiStatus == 'Map bounds' && red !== null && green !== null && blue !== null) {
    showImageButton.setDisabled(false);
  } else {
    showImageButton.setDisabled(true);
  }
}
activateShowImageButton();
// Base image
function imageBase(){
  // AOI
  var aoiFeature = aoi();
  // Image
  var image = s2Jawa.clip(aoiFeature);
  return image;
}
// Zoom to aoi function
function zoomAoi(){
  // AOI
  var aoiFeature = aoi();
  // Zoom to AOI
  Map.centerObject(aoiFeature, 10);
}
// Show image function
function showImage(){
  // Reset map
  resetMap();
  // Zoom to AOI
  zoomAoi();
  // Image
  var image = imageBase();
  // Band
  var red = redSelect.getValue();
  var green = greenSelect.getValue();
  var blue = blueSelect.getValue();
  var bands = [red, green, blue];
  // Contrast
  var contrast = contrastSlider.getValue()*10000;
  // Visual parameter
  var vis = {bands: bands, min: 0, max: contrast};
  // Title
  var title = 'Composite ' + red + ' ' + green + ' ' + blue;
  Map.addLayer(image, vis, title);
}
// Show land cover button
var showLandCoverButton = ui.Button({
  label: 'Classify image',
  style: {stretch: 'horizontal'},
  disabled: true,
  onClick: function(){
    showLandCover();
  }
});
mainPanel.add(showLandCoverButton);
// Function to activate land cover button
function activateShowLandCoverButton() {
  var aoiStatus = aoiSelect.getValue();
  var geojsonstatus = geojsonTextbox.getValue();
  var drawSelectStatus = drawSelect.getValue();
  if (aoiStatus == 'GeoJSON' && geojsonstatus !== null) {
    showLandCoverButton.setDisabled(false);
  } else if (aoiStatus == 'Draw AOI' && drawSelectStatus !== null) {
    showLandCoverButton.setDisabled(false);
  } else if (aoiStatus == 'Map bounds') {
    showLandCoverButton.setDisabled(false);
  } else {
    showLandCoverButton.setDisabled(true);
  }
}
activateShowLandCoverButton();
// Function for classification
function classify(){
  // Image AOI
  var imageAoi = imageBase();
  // Image all
  var image = s2Jawa;
  // Sample shapefile
  var point = sample;
  // Label
  var label = 'class_id';
  // Band
  var bands = s2Jawa.bandNames();
  // Train sample
  var training = image.select(bands).sampleRegions({
    collection: point,
    properties: [label],
    scale: 10
  });
  // Training
  var trained = ee.Classifier.smileRandomForest(50).train(training, label, bands);
  // Classified image
  var classified = imageAoi.select(bands).classify(trained).rename('Map').set({
    'Map_class_names': ['Dryland forest', 'Swamp forest', 'Mangrove forest', 'Cropland1', 'Cropland2', 'Grassland', 'Wetland', 'Built-up', 'Bareland', 'Other woody vegetation', 'Water bodies'],
    'Map_class_palette': ['33a02c', '1f78b4', '6a3d9a', 'fdbf6f', 'ff7f00', 'ffff99', 'cab2d6', 'b15928', 'fb9a99', 'b2df8a', 'a6cee3'],
    'Map_class_values': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  });
  // Reclassifying
  var reclass = classified.remap([1, 4, 5, 6, 7, 8, 9, 10, 11, 12], [1, 2, 3, 4 , 5, 6, 7, 8, 9, 10]);
  return reclass;
}
// Function to get DEM
function dem(){
  var bounds = aoi();
  var elevation = nasadem.select('elevation').clip(bounds).multiply(20);
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
  return SHADED_RELIEF;
}
// Legend
var legendTool = require('users/ramiqcom/ugm:tools/legend');
// Function to keep image and display image again
function keepImage(){
  var image = Map.layers().get(0);
  return image;
}
// Show classified land cover
function showLandCover(){
  // Image
  var image = keepImage();
  // Reset map
  resetMap();
  // Add image back
  Map.add(image);
  // Zoom to AOI
  zoomAoi();
  // Classified image
  var classified = classify();
  // Title
  var title = 'Land Cover';
  // Class
  var cover = sample.sort('class_id').aggregate_array('Label').distinct();
  // Number
  var number = sample.sort('class_id').aggregate_array('class_id').distinct();
  // Class for legend
  var coverLegend = cover.getInfo();
  // Class count for legend
  var count = number.length().getInfo();
  // Color
  var palette = ['33a02c', '6a3d9a', 'fdbf6f', 'ff7f00', 'ffff99', 'cab2d6', 'b15928', 'fb9a99', 'b2df8a', 'a6cee3'];
  // Visual parameter
  var vis = {palette: palette, min: 1, max: 10};
  // Position
  var position = 'bottom-left';
   // Add land cover to map
  Map.addLayer(classified, vis, title, true, 1);
  // Legend
  var legend = legendTool.legendDiscrete(title, coverLegend, palette, count, position);
  Map.add(legend);
}
// Button remove AOI
var removeAoiButton = ui.Button({
  label: 'Remove AOI',
  style: {stretch: 'horizontal'},
  onClick: function(){
    Map.drawingTools().clear();
    drawSelect.items().reset([]);
    draw();
  }
});
mainPanel.add(removeAoiButton);