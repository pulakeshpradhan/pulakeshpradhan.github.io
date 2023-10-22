var image = ee.Image("users/andreydara/tileID_810-prob-2007-23");
var img = image;
Map.centerObject(img);
Map.addLayer(img, {min: 0, max: 10000}, 'Grazing pressure');