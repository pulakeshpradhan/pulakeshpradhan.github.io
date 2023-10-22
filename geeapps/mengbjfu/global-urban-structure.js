// Composite an image collection and clip it to a boundary.
// Load Landsat 7 raw imagery and filter it to April-July 2000.
var collection_01 = ee.ImageCollection('users/mikemengmengli/GUF');
var collection_02 = ee.ImageCollection('users/mikemengmengli/GUF');
var collection = collection_01.merge(collection_02)
var mosaic = collection.mosaic();
Map.addLayer(mosaic);