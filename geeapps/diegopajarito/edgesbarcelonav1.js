//////////////////////////////////////////////////
// This script shows how to clip images  in GEE
//////////////////////////////////////////////////
//
//////////////////////////////////////////////////
// Author: Diego Pajarito
// Credits: [Institute for Advanced Architecture of Catalonia - IAAC, Advanced Architecture group]
// License:  Apache License Version 2.0
// Version: 0.5.0
// Maintainer: Diego Pajarito
// Email: diego.pajarito@iaac.net
// Status: development
//////////////////////////////////////////////////
// Load de FAO Admin layer
var Admins = ee.FeatureCollection("FAO/GAUL/2015/level2");
var barcelona = Admins.filter(ee.Filter.eq('ADM2_NAME', 'Barcelona'));
Map.centerObject(barcelona, 8)
var styleParams = {
  fillColor: 'ffffff',
  color: '00909F',
  width: 1.2,
};
var dataset = barcelona.style(styleParams);
Map.addLayer(dataset, {}, 'Second Level Administrative Units');
// Get the least cloudy image in the 2020 spring/summer
var point = ee.Geometry.Point([2.3, 41.5]);
var l8 = ee.ImageCollection('COPERNICUS/S2_SR');
var image = ee.Image(
  l8.filterBounds(point)
    .filterDate('2020-03-01', '2020-09-30')
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
    .first()
);
print('imageSelected', image);
var visParams = {bands: ['B4', 'B3', 'B2'], min: -300, max: 2500};
Map.addLayer(image, visParams, 'Original Image RGB ')
var clipped_image = image.clip(barcelona)
Map.addLayer(clipped_image, visParams, 'Clipped Image RGB ')
var bands10m = ['B2', 'B3', 'B4', 'B8']
var panchromatic = image
  .select(bands10m)
  .reduce(ee.Reducer.mean())
print('Pancromatic Image', panchromatic);
var clipped_pan = panchromatic.clip(barcelona)
Map.addLayer(clipped_pan, {max: 12000}, 'Panchromatic Image');
// Define a "fat" Gaussian kernel.
var fat = ee.Kernel.gaussian({
  radius: 10,
  sigma: 20,
  units: 'pixels',
  normalize: true,
  magnitude: -1
});
// Define a "skinny" Gaussian kernel.
var skinny = ee.Kernel.gaussian({
  radius: 10,
  sigma: 1,
  units: 'pixels',
  normalize: true,
});
// Compute a difference-of-Gaussians (DOG) kernel.
var dog = fat.add(skinny);
// Compute the zero crossings of the second derivative, display.
var zeroXings = panchromatic.convolve(dog).zeroCrossing();
print('Zero Crossings', zeroXings);
Map.setCenter(2.2, 41.4, 13);
var clipped_zXing = zeroXings.clip(barcelona)
Map.addLayer(clipped_zXing.selfMask(), {palette: 'FF0000'}, 'Edges - zero crossings');