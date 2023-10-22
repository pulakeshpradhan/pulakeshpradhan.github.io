var geometry = ee.FeatureCollection("users/diegopons06/deptos_cba_latlong"),
    imageVisParam = {"opacity":1,"bands":["tropospheric_NO2_column_number_density"],"min":0.000009560716377139365,"max":0.00001837448450715273,"palette":["000000","0000ff","800080","00ffff","008000","ffff00","ff0000"]};
//Datos Sentinel 5P para NO2
var N02 = ee.ImageCollection('COPERNICUS/S5P/OFFL/L3_NO2')
  .filterDate('2018-10-01', '2018-11-20'); //Selección de periodo temporal
//Datos para columna NO2 Total
var SentinelNO2Total = N02
  .select('NO2_column_number_density')
  .filterBounds (geometry);
var NO2TotalData = ee.Image(SentinelNO2Total.median());
var NO2TotalClip = NO2TotalData.clip (geometry);
Map.addLayer (NO2TotalClip, {
  max: 0.0002, 
  min: 0.0, 
  palette: ["black", "blue", "purple", "cyan", "green", "yellow", "red"]}, 
  'NO2 Total');
Export.image.toDrive({
  image: NO2TotalClip.select("NO2_column_number_density"),
  description: 'NO2_Total',
  scale: 1100,
  region: geometry});
//Datos para columna NO2 Troposferico
var SentinelNO2Tropo = N02
  .select('tropospheric_NO2_column_number_density')
  .filterBounds (geometry);
var NO2TropoData = ee.Image(SentinelNO2Tropo.median());
var NO2TropoClip = NO2TropoData.clip (geometry);
Map.addLayer (NO2TropoClip, {
  max: 0.0002, 
  min: 0.0, 
  palette: ["black", "blue", "purple", "cyan", "green", "yellow", "red"]}, 
  'NO2 Troposférico');
Export.image.toDrive({
  image: NO2TropoClip.select("tropospheric_NO2_column_number_density"),
  description: 'NO2_Troposferico',
  scale: 1100,
  region: geometry});
//Datos para columna NO2 Estratosferico
var SentinelNO2Estr = N02
  .select('stratospheric_NO2_column_number_density')
  .filterBounds (geometry);
var NO2EstrData = ee.Image(SentinelNO2Estr.median());
var NO2EstrClip = NO2EstrData.clip (geometry);
Map.addLayer (NO2EstrClip, {
  max: 0.00005, 
  min: 0.0, 
  palette: ["black", "blue", "purple", "cyan", "green", "yellow", "red"]}, 
  'NO2 Estratosférico');
Export.image.toDrive({
  image: NO2EstrClip.select("stratospheric_NO2_column_number_density"),
  description: 'NO2_Estratosferico',
  scale: 1100,
  region: geometry});