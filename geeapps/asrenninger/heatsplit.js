// Mask clouds
function maskL8sr(image) {
  var cloudShadowBitMask = (1 << 3);
  var cloudsBitMask = (1 << 5);
  var qa = image.select('pixel_qa');
  var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
                 .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
  return image.updateMask(mask);
}
// Import states and counties
var states = ee.FeatureCollection("TIGER/2016/States");
var counties = ee.FeatureCollection("TIGER/2016/Counties");
//
var filter = states.filter(ee.Filter.eq('STATEFP',"42"));
var county = counties.filter(ee.Filter.eq('NAME',"Philadelphia"));
print(counties.getInfo)
// Import L8 data
var dataset = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
                  .filterDate('2018-01-01', '2018-12-31')
                  .map(maskL8sr)
//                  .filterBounds(county);
//
var palettes = require('users/gena/packages:palettes');
var built = palettes.kovesi.diverging_linear_bjy_30_90_c45[7];
var green = palettes.kovesi.linear_green_5_95_c69[7];
var water = palettes.kovesi.linear_blue_5_95_c73[7];
//
var addNDBI = function(image) {
  var ndbi = image.normalizedDifference(['B6', 'B5']).rename('NDBI');
  return image.addBands(ndbi);
};
var addNDVI = function(image) {
  var ndvi = image.normalizedDifference(['B5', 'B4']).rename('NDVI');
  return image.addBands(ndvi);
};
var addNDWI = function(image) {
  var ndwi = image.normalizedDifference(['B3', 'B5']).rename('NDWI');
  return image.addBands(ndwi);
};
//
var ndbi    = dataset.map(addNDBI);
var ndbiest = ndbi.qualityMosaic('NDBI').select('NDBI');
var ndvi    = dataset.map(addNDVI);
var ndviest = ndvi.qualityMosaic('NDVI').select('NDVI');
var ndwi    = dataset.map(addNDWI);
var ndwiest = ndwi.qualityMosaic('NDWI').select('NDWI');
//
var ndbiParams = {bands: ['NDBI'], min:  0, max: 1, palette: built};
var ndviParams = {bands: ['NDVI'], min: -1, max: 1, palette: green};
var ndwiParams = {bands: ['NDWI'], min: -1, max: 1, palette: water};
//
//Map.addLayer(ndbiest.clip(states), ndbiParams, 'NDBI');
//Map.addLayer(ndviest.clip(states), ndviParams, 'NDVI');
//Map.addLayer(ndwiest.clip(states), ndwiParams, 'NDWI');
//
var addHeat = function(image){
  var heat = image.select(['B10']).multiply(0.1).subtract(273.5).rename('HEAT');
  return image.addBands(heat);
}
var temp    = dataset.map(addHeat)
var hottest = temp.qualityMosaic('HEAT').select('HEAT');
// Visualize
var heat = palettes.kovesi.diverging_rainbow_bgymr_45_85_c67[7]
//
Map.addLayer(hottest.clip(states), {bands: ['HEAT'], min: 18, max: 45, palette: heat}, 'temperature');
//
//var composite = dataset.map(addNDBI).map(addNDVI).map(addNDWI).map(addHeat)
var composite = ndbiest.addBands(ndviest).addBands(ndwiest).addBands(hottest)//.clip(county)
// Each map has a name and some visualization parameters.
var MAP_PARAMS = {
  'Built': ndbiParams,
  'Natural': ndviParams, 
  'Water': ndwiParams,
  'Heat': {bands: ['HEAT'], min: 18, max: 45, palette: heat}
};
// Shared visualization parameters for the images.
function getVisualization(bands) {
  return {min: 0, max: 1, palette: heat, bands: bands};
}
// Create a map for each visualization option
var maps = [];
Object.keys(MAP_PARAMS).forEach(function(name) {
  var map = ui.Map();
  map.add(ui.Label(name));
  map.addLayer(composite, MAP_PARAMS[name], name);
  map.setControlVisibility(false);
  maps.push(map);
});
var linker = ui.Map.Linker(maps);
// Enable zooming on the top-left map
maps[0].setControlVisibility({zoomControl: true});
// Show the scale (e.g. '500m') on the bottom-right map
maps[3].setControlVisibility({scaleControl: true});
// Create a grid of maps
var mapGrid = ui.Panel(
    [
      ui.Panel([maps[0], maps[1]], null, {stretch: 'both'}),
      ui.Panel([maps[2], maps[3]], null, {stretch: 'both'})
    ],
    ui.Panel.Layout.Flow('horizontal'), {stretch: 'both'});
// Center the map at an interesting spot in Greece. All
// other maps will align themselves to this parent map.
 maps[0].setCenter(-75.16290106257884,39.95905958203471, 12);
// Title it
var title = ui.Label('2018 indices', {
  stretch: 'horizontal',
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: '24px'
});
// Add the maps and title to the ui.root.
ui.root.widgets().reset([title, mapGrid]);
ui.root.setLayout(ui.Panel.Layout.Flow('vertical'));
// Define a region from which to show data
var image = composite.select('NDBI')
var region = county;
// Pre-define some customization options
var options = {
  title: 'Landsat built index values',
  fontSize: 20,
  hAxis: {title: 'value'},
  vAxis: {title: 'count'},
  series: {0: {color: 'blue'}}
};
// Make the histogram, set the options
var histogram = ui.Chart.image.histogram(image, region, 30)
    .setSeriesNames(['ndbi'])
    .setOptions(options);
// Display the histogram
print(histogram);
//