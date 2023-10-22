//var lc8 = ee.Image('LANDSAT/LC8_L1T_TOA/LC81370442016015LGN00');
//var s2 = ee.ImageCollection('COPERNICUS/S2').filterBounds(aoi);
var s2 = ee.Image('COPERNICUS/S2/20170211T042911_20170211T043113_T46QBL')
print(s2);
var pLC8 = {
  bands: ['B6', 'B5', 'B4'],
  max: 0.3
};
var pS2 = {
  bands: ['B4', 'B3', 'B2'],
  min: 1000,
  max: 2000,
  gamma: 1
};
//Map.addLayer(lc8, pLC8, 'Landsat 8');
Map.addLayer(s2, pS2, 'Sentinel 2', false);
//Map.centerObject(s2, 8);
var ndwi = s2.normalizedDifference(['B8', 'B3'])//.rename('NDWI');
print(ndwi);
var n = {min: 0, max: 1, palette: ['000000','0000ff']}
Map.addLayer(ndwi, {palette: ['0000ff','ffffff']}, 'NDWI', false);
var water = ndwi.lt(0.01);
Map.addLayer(water.updateMask(water), n, 'Water');
var t = s2.updateMask(water);
print(t);
Map.addLayer(t,pS2,'Test');
var c = Map.getCenter(90.23, 23);
print (c);