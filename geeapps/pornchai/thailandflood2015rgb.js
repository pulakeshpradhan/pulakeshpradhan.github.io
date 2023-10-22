// Thailand Flood 2015
// Overlay Landsat8 from July to October
var rect = ee.Geometry.Rectangle(88.779, 0.041, 112.597, 22.631);
// Load an image. 2015-07-01 - 2015-07-31
var imageJune = ee.ImageCollection('LANDSAT/LC08/C01/T1')
  //.filterBounds(rect)
  .filterBounds(rect.bounds())
  .filterDate(ee.Date('2015-06-01'), ee.Date('2015-06-30'))
  .sort('CLOUD_COVER', true);
// Load an image. 2015-08-01 - 2015-08-31
var imageAug = ee.ImageCollection('LANDSAT/LC08/C01/T1')
  //.filterBounds(rect)
  .filterBounds(rect.bounds())
  .filterDate(ee.Date('2015-08-01'), ee.Date('2015-08-31'))
  .sort('CLOUD_COVER', true);
// Load an image. 2015-09-01 - 2015-09-30
var imageOct = ee.ImageCollection('LANDSAT/LC08/C01/T1')
  //.filterBounds(rect)
  .filterBounds(rect.bounds())
  .filterDate(ee.Date('2015-10-01'), ee.Date('2015-10-31'))
  .sort('CLOUD_COVER', true);
var vizParam = {bands:['B5','B3','B2'], min: 5000, max: 15000, gamma: 0.5};
// Center the map on the image.
Map.setCenter(100.4899, 14.1738, 9);
// Display the image.
Map.addLayer(imageOct, vizParam, 'Flood in October 2015');
Map.addLayer(imageAug, vizParam, 'Flood in August 2015');
Map.addLayer(imageJune, vizParam, 'Flood in June 2015');