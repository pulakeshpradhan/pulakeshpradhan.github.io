// Import datasets
var states = ee.FeatureCollection("TIGER/2018/States");
var hansen = ee.Image('UMD/hansen/global_forest_change_2015')
var landsat8 = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA')
// Filter Louisiana polygon from US states
var la = states.filter(ee.Filter.eq('STATEFP', '22'));
// Filter water boundary from the Hansen dataset
var mask = hansen
  .clip(la)
  .select('datamask')
  .eq(1);
var waterBoundary = mask.not();
waterBoundary = waterBoundary.mask(waterBoundary);
// Filter Landsat images of Louisiana in 2020
var landsatLA2020 = landsat8
  .filterDate('2020-01-01', '2020-12-31')
  .filterBounds(la);
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
// Create LA mosaic of cloud-free pixels with healthiest vegetation
var greenMosaic = landsatLA2020
  .map(filterClouds)
  .map(addNDVI)
  .qualityMosaic('NDVI')
  .clip(la)
  .updateMask(mask);
// Set display options for true-color bands and brightness
var displayOptions = {bands: ['B4', 'B3', 'B2'], max: 0.25};
// Combine the image mosaic and water (color code #000044)
var mosaicLandWater = ee.ImageCollection([
  greenMosaic.visualize(displayOptions),
  waterBoundary.visualize({palette: '000044'}),
]).mosaic();
// Add the original cloudy images and the finished mosaic to the map
Map.centerObject(landsatLA2020, 7);
Map.addLayer(landsatLA2020, displayOptions, 'Unfiltered mosaic');
Map.addLayer(mosaicLandWater, {}, 'Green mosaic');