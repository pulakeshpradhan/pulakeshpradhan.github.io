var geometry = /* color: #d63000 */ee.Geometry.Point([-75.16037464340661, 39.95143720941659]);
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
                  .filterDate('2016-01-01', '2016-12-31')
                  .map(maskL8sr)
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
var ndbiParams = {bands: ['NDBI'], min: -1, max: 1, palette: built};
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
var composite = dataset.map(addNDBI).map(addNDVI).map(addNDWI).map(addHeat)
//
// Create the title label.
// var title = ui.Label('Click to inspect');
//title.style().set('position', 'top-center');
// Map.add(title);
Map.style().set('cursor', 'crosshair');
// Create a panel to hold the chart.
var panel = ui.Panel();
panel.style().set({
  width: '400px',
  position: 'bottom-right'
});
var intro = ui.Panel([
  ui.Label({
    value: 'Click to explore',
    style: {fontSize: '14px', fontWeight: 'bold'}
  })
]);
Map.add(panel);
panel.add(intro)
// Register a function to draw a chart when a user clicks on the map.
Map.onClick(function(coords) {
  panel.clear();
  var point = ee.FeatureCollection([
    ee.Feature(  
      ee.Geometry.Point(coords.lon, coords.lat).buffer(10000), {label: 'Area Average'}),
    ee.Feature(  
      ee.Geometry.Point(coords.lon, coords.lat), {label: 'Selected Zone'})
    ]);
  var chart = ui.Chart.image.seriesByRegion(
    temp, point, ee.Reducer.mean(), 'HEAT', 200, 'system:time_start', 'label')
        .setChartType('LineChart')
        .setOptions({
          title: 'Temperature over time',
          vAxis: {title: 'Temperature (Celcius)'},
          series: {
            0: {color: 'FD92FA'},
            1: {color: '0035F9'}
          }});
  panel.add(chart);
});
Map.setCenter(-75.16037464340661, 39.95143720941659, 12)