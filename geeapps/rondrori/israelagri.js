var s2a = ui.import && ui.import("s2a", "imageCollection", {
      "id": "COPERNICUS/S2_SR"
    }) || ee.ImageCollection("COPERNICUS/S2_SR"),
    israel = ui.import && ui.import("israel", "table", {
      "id": "users/rondrori/israel"
    }) || ee.FeatureCollection("users/rondrori/israel");
/*
Agriculture current state and history
Interactive app
*/
// Display google satellite image
Map.setOptions('HYBRID')
// Center over Israel
Map.centerObject(israel)
// current date
var d =  new Date();
var date = ee.Date(d)
// number of days to mosaic
var st = -30
var trsh = 0.1
// time span in years (-1 = 1 year)
var yts = -1
// Agriculture NDVI stdev threshold
var stdTresh = 0.15
//************************
// GUI
//************************
// Create the title label.
var title = ui.Label('הקלק על המפה לקבלת ערכי NDVI');
title.style().set('position', 'top-center');
Map.add(title);
// Create a panel to hold the chart.
var panel = ui.Panel();
panel.style().set({
  width: '400px',
  position: 'bottom-right'
});
Map.add(panel);
// Register a function to draw a chart when a user clicks on the map.
Map.onClick(function(coords) {
  panel.clear();
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  //var chart = ui.Chart.image.regions(s2ic, point, null, 30);
  var chart =ui.Chart.image.seriesByRegion(ndvi.select('ndvi'), point, ee.Reducer.mean(), 'ndvi', 10)
  chart.setOptions({title: 'Band values'});
  panel.add(chart);
});
var s2Sr = ee.ImageCollection('COPERNICUS/S2_SR');
var s2Clouds = ee.ImageCollection('COPERNICUS/S2_CLOUD_PROBABILITY');
var START_DATE = ee.Date('2019-08-01');
var END_DATE = ee.Date('2020-09-01');
var MAX_CLOUD_PROBABILITY = 10;
var region = ee.Geometry.Rectangle(
    {coords: [34.5, 32, 35.5, 33], geodesic: false});
var region = israel
var roi = israel
Map.centerObject(region, 12);
var temporalCollection = function(collection, start, count, interval, units) {
  // Create a sequence of numbers, one for each time interval.
  var sequence = ee.List.sequence(0, ee.Number(count).subtract(1));
  var originalStartDate = ee.Date(start);
  return ee.ImageCollection(sequence.map(function(i) {
    // Get the start date of the current sequence.
    var startDate = originalStartDate.advance(ee.Number(interval).multiply(i), units);
    // Get the end date of the current sequence.
    var endDate = originalStartDate.advance(
      ee.Number(interval).multiply(ee.Number(i).add(1)), units);
    var s2CloudMasked = ee.ImageCollection(s2SrWithCloudMask.filterDate(startDate, endDate))
                        .map(maskClouds).median();
    return s2CloudMasked.set('system:time_start', startDate.millis());
  }));
}
function maskClouds(img) {
  var clouds = ee.Image(img.get('cloud_mask')).select('probability');
  var isNotCloud = clouds.lt(MAX_CLOUD_PROBABILITY);
  return img.updateMask(isNotCloud);
}
// The masks for the 10m bands sometimes do not exclude bad data at
// scene edges, so we apply masks from the 20m and 60m bands as well.
// Example asset that needs this operation:
// COPERNICUS/S2_CLOUD_PROBABILITY/20190301T000239_20190301T000238_T55GDP
function maskEdges(s2_img) {
  return s2_img.updateMask(
      s2_img.select('B8A').mask().updateMask(s2_img.select('B9').mask()));
}
// Filter input collections by desired data range and region.
var criteria = ee.Filter.and(
    ee.Filter.bounds(region), ee.Filter.date(START_DATE, END_DATE));
s2Sr = s2Sr.filter(criteria).map(maskEdges);
s2Clouds = s2Clouds.filter(criteria);
// Join S2 SR with cloud probability dataset to add cloud mask.
var s2SrWithCloudMask = ee.Join.saveFirst('cloud_mask').apply({
  primary: s2Sr,
  secondary: s2Clouds,
  condition:
      ee.Filter.equals({leftField: 'system:index', rightField: 'system:index'})
});
var rgbVis = {min: 0, max: 3000, bands: ['B4', 'B3', 'B2']};
var cs2 = temporalCollection(s2SrWithCloudMask.filterBounds(roi), '2019-09-01', 36, 10, 'day')
var ndvi = cs2.map(function (img){
  var time = img.get('system:time_start')
  var ndvi = img.normalizedDifference(['B8','B4']).rename('ndvi').set({'system:time_start': time});
  return ndvi
})
var cs22 = temporalCollection(s2SrWithCloudMask.filterBounds(roi), '2020-08-01', 1, 1, 'month')
// NDVI stdev from s2ic
var std = ndvi.reduce(ee.Reducer.stdDev()).clip(israel)
var stdMask = std.gt(stdTresh)
var ndviMax = ndvi.max()
// Display masked NDVI
// current NDVI
var cndvi = ee.Image(cs22.first()).normalizedDifference(['B8','B4'])
var cmask = cndvi.gt(0.1)
Map.addLayer(cndvi.mask(stdMask.and(cmask.and(ndviMax.gt(0.5)))),{ min:0.4, max:0.8, palette:['red','orange','yellow','blue','green', 'olive']},'ndvi', false, 0.5)      
Map.addLayer(ndviMax.mask(stdMask),{ min:0.4, max:0.8, palette:['red','orange','yellow','blue','green', 'olive']},'ndvi max', true, 0.5)      
Map.addLayer(ndvi,{},'ndvi', false)
//Map.addLayer(s2img.mask(stdMask),{bands:['ndvi'], min:0.4, max:0.8, palette:['red','orange','yellow','blue','green', 'olive']},'ndvi')      
//Map.addLayer(std,{min:0., max:0.3})
//Map.addLayer(agri.style({color:'black', width:1, fillColor: '0000' }),0)