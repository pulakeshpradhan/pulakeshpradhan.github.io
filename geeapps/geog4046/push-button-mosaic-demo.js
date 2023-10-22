// Import datasets
var statePolygon = ee.FeatureCollection("TIGER/2018/States")
  .filter(ee.Filter.eq('NAME', 'Louisiana'));
var landsat8 = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA');
// Filter Landsat images of the state in a time period
var landsatFiltered = landsat8
  .filterDate('2020-01-01', '2020-12-31')
  .filterBounds(statePolygon);
Map.addLayer(landsatFiltered, {bands:['B4','B3','B2'], max: 0.3})
Map.centerObject(landsatFiltered, 6);
var button = ui.Button('Create green-pixel mosaic');
Map.add(button);
button.onClick(function(){
  Map.clear();
  init();
});
var init = function(){
// Function to filter out images with more than 20% cloud cover
var filterClouds = function(image) {
  var scored = ee.Algorithms.Landsat.simpleCloudScore(image)
    .select(['cloud']).lte(20);
  return image.updateMask(scored);
};
// Function to determine the vegetation index of pixels in an image
var addNDVI = function(image) {
  var ndvi = image.normalizedDifference(['B5', 'B4']).rename('NDVI');
  return image.addBands(ndvi);
};
// Function to make a water layer based on the water index
var addWater = function(image) {
  var ndwi = image.normalizedDifference(['B3', 'B5']).rename('NDWI');
  var ndwiMasked = ndwi.updateMask(ndwi.gte(0.3));
  return image.addBands(ndwiMasked); 
}
// Create state mosaic of cloud-free pixels with healthiest vegetation
var greenMosaic = landsatFiltered
  .map(filterClouds)
  .map(addNDVI)
  .qualityMosaic('NDVI')
  .clip(statePolygon);
// Create state mosaic of cloud-free water areas
var blueMosaic = landsatFiltered
  .map(filterClouds)
  .map(addWater)
  .mosaic()
  .select('NDWI')
  .clip(statePolygon);
// Set display options for true-color mosaic and water mosaic
var greenOptions = {bands: ['B4', 'B3', 'B2'], max: 0.3};
var blueOptions = {min: 0.4, max: 1, palette: ['172F53', '000044']};
// Combine the land and water mosaics
var mosaicLandWater = ee.ImageCollection([
  greenMosaic.visualize(greenOptions),
  blueMosaic.visualize(blueOptions)
]).mosaic();
// Add the finished mosaic to the map
Map.centerObject(statePolygon, 7);
Map.addLayer(mosaicLandWater, {}, 'State Landsat mosaic');
}