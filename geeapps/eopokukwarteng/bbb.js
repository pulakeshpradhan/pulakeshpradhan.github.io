var landsat8 = ee.ImageCollection("LANDSAT/LC8_L1T_TOA"),
    table = ee.FeatureCollection("users/eopokukwarteng/AHANTA"),
    geometry = /* color: #d63000 */ee.Geometry.MultiPoint();
var point = ee.Geometry.Point([-0.1969000, 5.5560200]);
var image = ee.Image(landsat8 
 .filterBounds(point)
 .filterDate('2015-05-01','2017-06-01')
 .sort('CLOUD_COVER')
 .first());
var trueColor = {bands: ['B4','B3','B2'], min:0,max:0.3};
Map.addLayer(image,trueColor,'image');
Map.centerObject(image,8);
var ndvi = image .normalizedDifference(["B5" , "B4"]);
var vegPalette = ["red", "blue", "yellow", "green"];
Map.addLayer(ndvi,{ min:-1, max:1 , palette:vegPalette}, 'NVDI');