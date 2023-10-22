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