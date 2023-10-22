var table = ee.FeatureCollection("users/kuquanghuylcb/Dong_Nai");
var dinhquan_landsat= ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_124052_20181008');
var ndvi= dinhquan_landsat.normalizedDifference(['B5','B4'])
var ndbi= dinhquan_landsat.normalizedDifference(['B5','B6'])
var dongnai= ee.FeatureCollection('users/kuquanghuylcb/Dong_Nai')
var params_ndvi={
  min:-1,
  max:1,
  palette:['000000','32FF5B']
}
var params_ndwi={
  min:-1,
  max:1,
  palette:['000000','00C9EB']
}
var params_shp={
  palette:['000000']
}
Map.setCenter(107.29211428807866,11.174869920351137,10)
Map.addLayer(ndvi.clip(dongnai),params_ndvi,'NDVI')
Map.addLayer(ndbi.clip(dongnai),params_ndwi,'NDWI')
Map.addLayer(dongnai, params_shp,"dongnai")