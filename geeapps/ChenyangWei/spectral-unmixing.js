/*
  Introduction: 
  1) Make an APP to examine the spectral unmixing result in the Qilian Mountains.
  Updated on: 2/12/2020.
*/
/* Setup. */
// Work directory.
var wd = "users/ChenyangWei/Qilian_Mountain/";
// Study area.
var studyArea = ee.FeatureCollection(wd + "QLS_Landcover_merged_dissolved");
// Land cover in 2010 and 2015.
var landcover = ee.FeatureCollection(wd + "QLS_Landcover_2010_2015_merged");
// Preprocessed composite image of Landsat 8 SR data in 2015.
var l8 = ee.Image(wd + "LC08_SR_20pctGreennest_Median");
// Sampled endmember rectangles.
var endRect = ee.FeatureCollection(wd + "Spectral_Unmixing/" + "EndmemberRectangles_8classes").toList(8);
print("Endmember rectangles:", endRect);
// Create a list of endmember names.
var endName = ["Tree", "Herbaceous", "Shrub", "Bare", 
  "Agriculture", "Developed", "Water", "Snow"];
// Create a palette for endmembers in the order of names.
var endPalette = ['#055808','#0eff17','#0aa80f','#bfa805',
  '#ff8f1c','#ff2222','#0539f6','#9d9d9d'];
// Spectral unmixing result.
var unmixed = ee.Image(wd + "Spectral_Unmixing/" + 
  "LC08_SR_20pctNDVI_median_8classes_Unmixed");
print("Spectral unmixing result:", unmixed);
/* Extract the spectral unmixing result at a sample point. */
// An example of the sample point.
var pt = ee.Geometry.Point([100.5147, 38.348]);
// Function to show the sample point on the map.
function showPointOnMap(point) {
  var dot = ui.Map.Layer(point, {color: 'FFFF00'}, 'Sample point');
  // Add the point to the last layer of the map.
  map.layers().set(19, dot);
}
// Function to plot the mean spectrums of endmember rectangles.
function makeSpectrumChart() {
  var spectrumChart = ui.Chart.image.regions({
    image: l8, 
    regions: endRect, 
    reducer: ee.Reducer.mean(), 
    scale: 30, 
    seriesProperty: "Label", 
    xLabels: [0.443, 0.482, 0.562, 0.655, 0.865, 1.609, 2.201] // Central wavelength of each band in Landsat 8 imagery.
  }).setOptions({
    title: "Average Landsat 8 Surface Reflectance of Each Endmember",
    vAxis: {title: "Average Surface Reflectance", gridlines: {count: 5}},
    hAxis: {title: "Wavelength (in micrometers)", gridlines: {count: 10}},
    colors: endPalette
  });
  return spectrumChart;
}
// Function to extract local spectral unmixing result.
function extractResult(point) {
  var result = unmixed.reduceRegion({
    reducer: ee.Reducer.first(), 
    geometry: point, 
    scale: 30, 
    crs: 'EPSG:4326'
  });
  return result;
}
// Function to show a label of each extracted result.
function showResultLabel(extracted, endmember) {
  // var label = endmember + ': ' + extracted.get(endmember).getInfo().toFixed(4);
  var label = ui.Label({
    value: endmember + ':' ,
    style: {fontWeight: 'bold'}
  });
  var value = ui.Label({
    value: extracted.get(endmember).getInfo().toFixed(4)
  });
  return ui.Panel({
    widgets: [label, value],
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {padding: '2px'}
  });
}
// Function to make a panel displaying local unmixing result.
function makeResultPanel(point) {
  var captionLabel = ui.Label({
    value: 'Spectral mixture proportions at the sample point:',
    style: {
      fontSize: '16px',
      fontWeight: 'bold',
      padding: '5px'
  }});
  var result = extractResult(point);
  var treeLabel = showResultLabel(result, "Tree");
  var herbLabel = showResultLabel(result, "Herbaceous");
  var shrubLabel = showResultLabel(result, "Shrub");
  var bareLabel = showResultLabel(result, "Bare");
  var agriLabel = showResultLabel(result, "Agriculture");
  var devLabel = showResultLabel(result, "Developed");
  var waterLabel = showResultLabel(result, "Water");
  var snowLabel = showResultLabel(result, "Snow");
  return ui.Panel({
    widgets: [captionLabel, 
      treeLabel, herbLabel, shrubLabel, bareLabel, 
      agriLabel, devLabel, waterLabel, snowLabel],
    layout: ui.Panel.Layout.flow('vertical')
  });
}
// Function to extract the centroids of rectangles of each endmember feature.
function extractCtr(feature) {
  var geom = feature.geometry().geometries();
  var ctr = geom.map(function(g) {
    return ee.Feature(ee.Geometry(g).centroid());
  });
  return ee.FeatureCollection(ctr);
}
/* Initialize the map. */
var map = ui.Map();
map.style().set({cursor: 'crosshair'});
map.setOptions("hybrid");
// map.centerObject(studyArea, 8);
map.setCenter(100.5147, 38.348, 8);
var visL8 = {
  bands: ['B4', 'B3', 'B2'],
  min: 0,
  max: 3000,
  gamma: 1.4
};
map.addLayer(l8, visL8, "Composite Landsat 8 image", true);
map.addLayer(unmixed, {bands: ["Agriculture", "Tree", "Snow"], min: 0, max: 1},
  "Spectral unmixing result", true, 1);
// map.addLayer(studyArea, {color: "FFFFFF"}, "Study area", true, 1);
// Show the land cover data
var empty = ee.Image().int();
var lcPalette = ['#9e0142','#d53e4f','#f46d43','#fdae61',
    '#fee08b','#ffffbf','#e6f598','#abdda4','#66c2a5','#3288bd','#5e4fa2'];
map.addLayer(empty.paint(landcover, "GS2015"), {palette: lcPalette, min: 21, max: 67}, "Land Cover in 2015", true);
// Display the endmember features.
var showRect = true;
var showCtr = true;
for (var i = 0; i < 8; i ++) {
  // Extract each type of endmember features.
  var feature = ee.Feature(endRect.get(i));
  var featureName = endName[i];
  // Map rectangles and the corresponding centroids (for a better visualization when the zoom level is low).
  map.addLayer(feature, {color: endPalette[i]}, featureName + " (rectangles)", showRect);
  map.addLayer(extractCtr(feature), {color: endPalette[i]}, featureName + " (centroids)", showCtr);
}
/* Initialize the widgets. */
function init() {
  var panel = ui.Panel({
    style: {
      width: '30%',
      border: '3px solid #ddd',
    }
  });
  var title = ui.Label({
    value: 'Spectral Mixture Analysis of the Landsat 8 Surface Reflectance Imagery',
    style: {
      fontSize: '18px',
      fontWeight: 'bold',
      padding: '10px',
    }
  });
  var instructions = ui.Label({
    value: 'Click on the map to show local spectral unmixing result.',
    style: {
      color: 'gray',
      padding: '2px',
    }
  });
  var chartPanel = ui.Panel();
  var resultPanel = ui.Panel();
  panel.add(title);
  panel.add(chartPanel);
  panel.add(instructions);
  panel.add(resultPanel);
  var splitPanel = ui.SplitPanel({
    firstPanel: panel,
    secondPanel: map,
  });
  ui.root.clear();
  ui.root.add(splitPanel);
  chartPanel.add(makeSpectrumChart());
  resultPanel.add(makeResultPanel(pt));
  showPointOnMap(pt);
  // Display the clicked sample point and extract its spectral mixture information.
  map.onClick(function(coordinates) {
    var point = ee.Geometry.Point([coordinates.lon, coordinates.lat]);
    showPointOnMap(point);
    resultPanel.clear();
    resultPanel.add(makeResultPanel(point));
  });
}
init();