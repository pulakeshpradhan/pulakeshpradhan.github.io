var geometry = /* color: #d63000 */ee.Geometry.Point([107.25311656054691, 11.150842323925717]),
    table = ee.FeatureCollection("users/kuquanghuylcb/Dong_Nai");
// Display an image given its ID.
var Dongnai= ee.FeatureCollection('users/kuquanghuylcb/Dong_Nai');
var image = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_124052_20181008');
// Center the Map.
// Display the image.
var vizParams = {
  bands: ['B7', 'B6', 'B4'],
  min: 0,
  max: 0.5,
  gamma: [0.95, 1.1, 1]
};
var vizParams2 = {
  bands: ['B4', 'B3', 'B2'],
  min: 0,
  max: 0.5,
  gamma: [0.95, 1.1, 1]
};
var Filter = {
  color:'ABCF1D'
};
var roi = ee.Geometry.Point([107.25311656054691, 11.150842323925717]).buffer(10000);
Map.setCenter(107.292942,11.173073,10)
Map.addLayer(Dongnai,Filter,'Đồng Nai')
Map.addLayer(image.clip(Dongnai), vizParams2, 'false color composite');
Map.addLayer(image.clip(roi), vizParams, 'false color composite');