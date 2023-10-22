var table = ui.import && ui.import("table", "table", {
      "id": "users/Surabaya/Kota_Bekasi"
    }) || ee.FeatureCollection("users/Surabaya/Kota_Bekasi");
// ESTIMASI SUHI & LST  (Scrip Juma Maulana)
//cloud mask
function maskL8sr(col) {
  // Bits 3 and 5 are cloud shadow and cloud, respectively.
  var cloudShadowBitMask = (1 << 3);
  var cloudsBitMask = (1 << 5);
  // Get the pixel QA band.
  var qa = col.select('pixel_qa');
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
                 .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
  return col.updateMask(mask); }
//(Palette Warna)
var vizParamsRGB = {bands: ['B4', 'B3', 'B2'],min: 0,max: 3000,};
//(Palette Warna 2)
var vizParamskuantif = {bands: ['B4', 'B3', 'B2'],min: 0,max: 0.3,};
//Data Citra Landsat 
var col2015 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
          .map(maskL8sr)
          .filterDate('2015-05-01','2016-10-31')
          .filterMetadata('CLOUD_COVER','less_than',30)
          .filterBounds(table);
          Map.centerObject(table,12);
var col2018 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
          .map(maskL8sr)
          .filterDate('2018-05-01','2018-10-31')
          .filterMetadata('CLOUD_COVER','less_than',30)
          .filterBounds(table);
          Map.centerObject(table,12);
var col2020 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
          .map(maskL8sr)
          .filterDate('2020-05-01','2020-10-31')
          .filterMetadata('CLOUD_COVER','less_than',30)
          .filterBounds(table);
          Map.centerObject(table,12);
var col2021 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
          .map(maskL8sr)
          .filterDate('2021-05-01','2021-10-31')
          .filterMetadata('CLOUD_COVER','less_than',30)
          .filterBounds(table);
          Map.centerObject(table,12);
//Composite          
var image2015 = col2015.mean().clip(table);
var image2018 = col2018.mean().clip(table);
var image2020 = col2020.mean().clip(table);
var image2021 = col2021.mean().clip(table);
//Kuantifikasi
var kuantifikasi2015 =image2015.divide(10000);
var kuantifikasi2018 =image2018.divide(10000);
var kuantifikasi2020 =image2020.divide(10000);
var kuantifikasi2021 =image2021.divide(10000);
//ndvi
var ndvi2015 = kuantifikasi2015.normalizedDifference(['B5', 'B4']).rename('NDVI');
var ndvi2018 = kuantifikasi2018.normalizedDifference(['B5', 'B4']).rename('NDVI');
var ndvi2020 = kuantifikasi2020.normalizedDifference(['B5', 'B4']).rename('NDVI');
var ndvi2021 = kuantifikasi2021.normalizedDifference(['B5', 'B4']).rename('NDVI');
var min2015 = ee.Number(ndvi2015.reduceRegion({
          reducer: ee.Reducer.min(),
          geometry: table,
          scale: 30,
          maxPixels: 1e9
          }).values().get(0));
var max2015 = ee.Number(ndvi2015.reduceRegion({
          reducer: ee.Reducer.max(),
          geometry: table,
          scale: 30,
          maxPixels: 1e9
          }).values().get(0));
var min2018 = ee.Number(ndvi2018.reduceRegion({
          reducer: ee.Reducer.min(),
          geometry: table,
          scale: 30,
          maxPixels: 1e9
          }).values().get(0));
var max2018 = ee.Number(ndvi2018.reduceRegion({
          reducer: ee.Reducer.max(),
          geometry: table,
          scale: 30,
          maxPixels: 1e9
          }).values().get(0));
var min2020 = ee.Number(ndvi2020.reduceRegion({
          reducer: ee.Reducer.min(),
          geometry: table,
          scale: 30,
          maxPixels: 1e9
          }).values().get(0));
var max2020 = ee.Number(ndvi2020.reduceRegion({
          reducer: ee.Reducer.max(),
          geometry: table,
          scale: 30,
          maxPixels: 1e9
          }).values().get(0));
var min2021 = ee.Number(ndvi2021.reduceRegion({
          reducer: ee.Reducer.min(),
          geometry: table,
          scale: 30,
          maxPixels: 1e9
          }).values().get(0));
var max2021 = ee.Number(ndvi2021.reduceRegion({
          reducer: ee.Reducer.max(),
          geometry: table,
          scale: 30,
          maxPixels: 1e9
          }).values().get(0));
//THERMAL
var thermal2015= kuantifikasi2015.select('B10').multiply(1000);
var thermal2018= kuantifikasi2018.select('B10').multiply(1000);
var thermal2020= kuantifikasi2020.select('B10').multiply(1000);
var thermal2021= kuantifikasi2021.select('B10').multiply(1000);
//FV
var fv2015 =(ndvi2015.subtract(min2015).divide(max2015.subtract(min2015))).pow(ee.Number(2)).rename('FV'); 
var fv2018 =(ndvi2018.subtract(min2018).divide(max2018.subtract(min2018))).pow(ee.Number(2)).rename('FV'); 
var fv2020 =(ndvi2020.subtract(min2020).divide(max2020.subtract(min2020))).pow(ee.Number(2)).rename('FV'); 
var fv2021 =(ndvi2021.subtract(min2021).divide(max2021.subtract(min2021))).pow(ee.Number(2)).rename('FV'); 
//EM
var a= ee.Number(0.004);
var b= ee.Number(0.986);
var EM2015=fv2015.multiply(a).add(b).rename('EMM');
var EM2018=fv2018.multiply(a).add(b).rename('EMM');
var EM2020=fv2020.multiply(a).add(b).rename('EMM');
var EM2021=fv2021.multiply(a).add(b).rename('EMM');
//LST
 var LST2015 = thermal2015.expression(
          '(Tb/(1 + (0.00115* (Tb / 1.438))*log(Ep)))-273.15', {
          'Tb': thermal2015.select('B10'),
          'Ep': EM2015.select('EMM')
          }).rename('LST');
Map.addLayer(LST2015, {min: 23.918451130276708, max:35.40172474607368, palette: [
'040274', '040281', '0502a3', '0502b8', '0502ce', '0502e6',
'0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef',
'3be285', '3ff38f', '86e26f', '3ae237', 'b5e22e', 'd6e21f',
'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08', 'ff500d',
'ff0000', 'de0101', 'c21301', 'a71001', '911003'
 ]},'SUHU2015');
 var LST2018 = thermal2018.expression(
          '(Tb/(1 + (0.00115* (Tb / 1.438))*log(Ep)))-273.15', {
          'Tb': thermal2018.select('B10'),
          'Ep': EM2018.select('EMM')
          }).rename('LST');
Map.addLayer(LST2018, {min: 23.918451130276708, max:35.40172474607368, palette: [
'040274', '040281', '0502a3', '0502b8', '0502ce', '0502e6',
'0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef',
'3be285', '3ff38f', '86e26f', '3ae237', 'b5e22e', 'd6e21f',
'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08', 'ff500d',
'ff0000', 'de0101', 'c21301', 'a71001', '911003'
 ]},'SUHU2018');
 var LST2020 = thermal2020.expression(
          '(Tb/(1 + (0.00115* (Tb / 1.438))*log(Ep)))-273.15', {
          'Tb': thermal2020.select('B10'),
          'Ep': EM2020.select('EMM')
          }).rename('LST');
Map.addLayer(LST2020, {min: 23.918451130276708, max:35.40172474607368, palette: [
'040274', '040281', '0502a3', '0502b8', '0502ce', '0502e6',
'0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef',
'3be285', '3ff38f', '86e26f', '3ae237', 'b5e22e', 'd6e21f',
'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08', 'ff500d',
'ff0000', 'de0101', 'c21301', 'a71001', '911003'
 ]},'SUHU2020');
  var LST2021 = thermal2021.expression(
          '(Tb/(1 + (0.00115* (Tb / 1.438))*log(Ep)))-273.15', {
          'Tb': thermal2021.select('B10'),
          'Ep': EM2021.select('EMM')
          }).rename('LST');
Map.addLayer(LST2021, {min: 23.918451130276708, max:35.40172474607368, palette: [
'040274', '040281', '0502a3', '0502b8', '0502ce', '0502e6',
'0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef',
'3be285', '3ff38f', '86e26f', '3ae237', 'b5e22e', 'd6e21f',
'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08', 'ff500d',
'ff0000', 'de0101', 'c21301', 'a71001', '911003'
 ]},'SUHU2021');
//LEGENDA
//LEGENDA
// create vizualization parameters
var viz =  {min: 20, max:40, palette: [
'040274', '040281', '0502a3', '0502b8', '0502ce', '0502e6',
'0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef',
'3be285', '3ff38f', '86e26f', '3ae237', 'b5e22e', 'd6e21f',
'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08', 'ff500d',
'ff0000', 'de0101', 'c21301', 'a71001', '911003'
 ]};
// add the map
//Map.addLayer(P, viz);
// set position of panel
var legend = ui.Panel({
style: {
position: 'bottom-left',
padding: '5px 5px'
}
});
// Create legend title
var legendTitle = ui.Label({
value: 'Celcius (C)',
style: {
fontWeight: 'bold',
fontSize: '11px',
margin: '0 0 4px 0',
padding: '0'
}
});
// Add the title to the panel
legend.add(legendTitle);
// create the legend image
var lon = ee.Image.pixelLonLat().select('latitude');
var gradient = lon.multiply((viz.max-viz.min)/100.0).add(viz.min);
var legendImage = gradient.visualize(viz);
// create text on top of legend
var panel = ui.Panel({
widgets: [
ui.Label(viz['max'])
],
});
legend.add(panel);
// create thumbnail from the image
var thumbnail = ui.Thumbnail({
image: legendImage,
params: {bbox:'0,0,10,100', dimensions:'10x150'},
style: {padding: '1px', position: 'bottom-right'}
});
// add the thumbnail to the legend
legend.add(thumbnail);
// create text on top of legend
var panel = ui.Panel({
widgets: [
ui.Label(viz['min'])
],
});
legend.add(panel);
Map.add(legend);