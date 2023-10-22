var AMP_CM = ui.import && ui.import("AMP_CM", "table", {
      "id": "users/nsp161101/AMP_CM"
    }) || ee.FeatureCollection("users/nsp161101/AMP_CM");
//cloud mask
var mask_L8 = function(image){
  // Bits 3 and 5 are cloud shadow and cloud, respectively.
  var cloudShadowBitMask = (1 << 3);
  var cloudsBitMask = (1 << 5);
  // Get the pixel QA band.
  var qa = image.select('pixel_qa');
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
                 .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
  return image.updateMask(mask);
}
var CM = ee.FeatureCollection(AMP_CM)
CM = CM.geometry()
Map.centerObject(CM)
Map.addLayer(CM, {color: 'black'}, 'เชียงใหม่');
//vis params
var vizParams = {
bands: ['B5', 'B6', 'B4'],
min: 0,
max: 4000,
gamma: [1, 0.9, 1.1]
};
var vizParams2 = {
bands: ['B4', 'B3', 'B2'],
min: 0,
max: 3000,
gamma: 1.4,
};
//load the collection:
 {
var col = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
  .map(mask_L8)
  .filterDate('2016-01-01','2022-12-31')
  .filterBounds(CM)
  .map(function(image){return image.clip(AMP_CM)})
  .map(mask_L8);
}
print(col, 'coleccion');
Map.addLayer(col);
//imagen reduction
{
var image = col.median();
print(image, 'image');
Map.addLayer(image, vizParams2);
}
//median
{
var ndvi = image.normalizedDifference(['B5', 
'B4']).rename('NDVI');
var ndviParams = {min: -1, max: 1, palette: ['blue', 'white', 
'green']};
print(ndvi,'ndvi');
Map.addLayer(ndvi, ndviParams, 'ndvi');
}
//select thermal band 10(with brightness tempereature), no calculation 
var thermal= image.select('B10').multiply(0.1);
var b10Params = {min: 291.918, max: 302.382, palette: ['blue', 
'white', 'green']};
Map.addLayer(thermal, b10Params, 'thermal');
// find the min and max of NDVI
{
var min = ee.Number(ndvi.reduceRegion({
reducer: ee.Reducer.min(),
geometry: CM,
scale: 30,
maxPixels: 1e9
}).values().get(0));
print(min, 'min');
var max = ee.Number(ndvi.reduceRegion({
reducer: ee.Reducer.max(),
geometry: CM,
scale: 30,
maxPixels: 1e9
}).values().get(0));
print(max, 'max')
}
//fractional vegetation
{
var fv =(ndvi.subtract(min).divide(max.subtract(min))).pow(ee.Number(2)).rename('FV'); 
print(fv, 'fv');
Map.addLayer(fv);
}
//Emissivity
var a= ee.Number(0.004);
var b= ee.Number(0.986);
var EM=fv.multiply(a).add(b).rename('EMM');
var imageVisParam3 = {min: 0.9865619146722164, max:0.989699971371314};
Map.addLayer(EM, imageVisParam3,'EMM');
//LST in Celsius Degree bring -273.15
//NB: In Kelvin don't bring -273.15
var LST = thermal.expression(
'(Tb/(1 + (0.00115* (Tb / 1.438))*log(Ep)))-273.15', {
 'Tb': thermal.select('B10'),
'Ep': EM.select('EMM')
}).rename('LST');
//min max LST
{
var min = ee.Number(LST.reduceRegion({
reducer: ee.Reducer.min(),
geometry: CM,
scale: 30,
maxPixels: 1e9
}).values().get(0));
print(min, 'min');
var max = ee.Number(LST.reduceRegion({
reducer: ee.Reducer.max(),
geometry: CM,
scale: 30,
maxPixels: 1e9
}).values().get(0));
print(max, 'max')
}
Map.addLayer(LST, {min: 15.188412332395785, max:32.24196840326192, palette: [
'040274', '040281', '0502a3', '0502b8', '0502ce', '0502e6',
'0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef',
'3be285', '3ff38f', '86e26f', '3ae237', 'b5e22e', 'd6e21f',
'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08', 'ff500d',
'ff0000', 'de0101', 'c21301', 'a71001', '911003'
 ]},'LST');