var table = ee.FeatureCollection("users/shugh/Carpathians");
//// Carpathian boundary
var Carpath = ee.FeatureCollection(table)
Map.centerObject(Carpath)
Map.addLayer(Carpath, {}, "Carpathians")