var table = ui.import && ui.import("table", "table", {
      "id": "users/Surabaya/Surabaya"
    }) || ee.FeatureCollection("users/Surabaya/Surabaya"),
    table2 = ui.import && ui.import("table2", "table", {
      "id": "users/Surabaya/Kecamatan_Surabaya_"
    }) || ee.FeatureCollection("users/Surabaya/Kecamatan_Surabaya_");
// ESTIMASI SUHI & LST  (Scrip Juma Maulana)
//cloud mask
var cloudMaskL457 = function(img) {
  var qa = img.select('pixel_qa');
  // If the cloud bit (5) is set and the cloud confidence (7) is high
  // or the cloud shadow bit is set (3), then it's a bad pixel.
  var cloud = qa.bitwiseAnd(1 << 5)
                  .and(qa.bitwiseAnd(1 << 7))
                  .or(qa.bitwiseAnd(1 << 3));
  // Remove edge pixels that don't occur in all bands
  var mask2 = img.mask().reduce(ee.Reducer.min());
  return img.updateMask(cloud.not()).updateMask(mask2);
};
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
var vizParamsRGB7 = { bands: ['B3', 'B2', 'B1'], min: 0, max: 3000, };
//(Palette Warna 2)
var vizParamskuantif = {bands: ['B4', 'B3', 'B2'],min: 0,max: 0.3,};
var vizParamskuantif7 = { bands: ['B3', 'B2', 'B1'], min: 0, max: 0.3,};
//Data Citra Landsat
var col2011 = ee.ImageCollection('LANDSAT/LE07/C01/T1_SR')
          .map(maskL8sr)
          .filterDate('2011-05-20','2011-10-31')
          .filterMetadata('CLOUD_COVER','less_than',20)
          .filterBounds(table);
          Map.centerObject(table,12);
var col2012 = ee.ImageCollection('LANDSAT/LE07/C01/T1_SR')
          .map(maskL8sr)
          .filterDate('2012-05-01','2012-10-31')
          .filterMetadata('CLOUD_COVER','less_than',20)
          .filterBounds(table);
          Map.centerObject(table,12);
var col2013 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
          .map(maskL8sr)
          .filterDate('2013-05-01','2013-10-31')
          .filterMetadata('CLOUD_COVER','less_than',20)
          .filterBounds(table);
          Map.centerObject(table,12);
var col2014 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
          .map(maskL8sr)
          .filterDate('2014-05-01','2014-10-31')
          .filterMetadata('CLOUD_COVER','less_than',20)
          .filterBounds(table);
          Map.centerObject(table,12);
var col2015 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
          .map(maskL8sr)
          .filterDate('2015-05-01','2015-10-31')
          .filterMetadata('CLOUD_COVER','less_than',20)
          .filterBounds(table);
          Map.centerObject(table,12);
var col2016 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
          .map(maskL8sr)
          .filterDate('2016-05-01','2016-10-31')
          .filterMetadata('CLOUD_COVER','less_than',20)
          .filterBounds(table);
          Map.centerObject(table,12);
var col2017 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
          .map(maskL8sr)
          .filterDate('2017-05-01','2017-10-31')
          .filterMetadata('CLOUD_COVER','less_than',20)
          .filterBounds(table);
          Map.centerObject(table,12);
var col2018 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
          .map(maskL8sr)
          .filterDate('2018-05-01','2018-10-31')
          .filterMetadata('CLOUD_COVER','less_than',20)
          .filterBounds(table);
          Map.centerObject(table,12);
var col2019 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
          .map(maskL8sr)
          .filterDate('2019-05-01','2019-10-31')
          .filterMetadata('CLOUD_COVER','less_than',20)
          .filterBounds(table);
          Map.centerObject(table,12);
var col2020 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
          .map(maskL8sr)
          .filterDate('2020-05-01','2020-10-31')
          .filterMetadata('CLOUD_COVER','less_than',20)
          .filterBounds(table);
          Map.centerObject(table,12);
var col2021 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
          .map(maskL8sr)
          .filterDate('2021-05-01','2021-10-31')
          .filterMetadata('CLOUD_COVER','less_than',20)
          .filterBounds(table);
          Map.centerObject(table,12);
//Composite Citra
var image2011 = col2011.mean().clip(table);
var image2012 = col2012.mean().clip(table);
var image2013 = col2013.mean().clip(table);
var image2014 = col2014.mean().clip(table);
var image2015 = col2015.mean().clip(table);
var image2016 = col2016.mean().clip(table);
var image2017 = col2017.mean().clip(table);
var image2018 = col2018.mean().clip(table);
var image2019 = col2019.mean().clip(table);
var image2020 = col2020.mean().clip(table);
var image2021 = col2021.mean().clip(table);
//Kuantifikasi
var kuantifikasi2011 =image2011.divide(10000);
var kuantifikasi2012 =image2012.divide(10000);
var kuantifikasi2013 =image2013.divide(10000);
var kuantifikasi2014 =image2014.divide(10000);
var kuantifikasi2015 =image2015.divide(10000);
var kuantifikasi2016 =image2016.divide(10000);
var kuantifikasi2017 =image2017.divide(10000);
var kuantifikasi2018 =image2018.divide(10000);
var kuantifikasi2019 =image2019.divide(10000);
var kuantifikasi2020 =image2020.divide(10000);
var kuantifikasi2021 =image2021.divide(10000);
//NDVI
var ndvi2011 = kuantifikasi2011.normalizedDifference(['B4', 'B3']).rename('NDVI');
var ndvi2012 = kuantifikasi2012.normalizedDifference(['B4', 'B3']).rename('NDVI');
var ndvi2013 = kuantifikasi2013.normalizedDifference(['B5', 'B4']).rename('NDVI');
var ndvi2014 = kuantifikasi2014.normalizedDifference(['B5', 'B4']).rename('NDVI');
var ndvi2015 = kuantifikasi2015.normalizedDifference(['B5', 'B4']).rename('NDVI');
var ndvi2016 = kuantifikasi2016.normalizedDifference(['B5', 'B4']).rename('NDVI');
var ndvi2017 = kuantifikasi2017.normalizedDifference(['B5', 'B4']).rename('NDVI');
var ndvi2018 = kuantifikasi2018.normalizedDifference(['B5', 'B4']).rename('NDVI');
var ndvi2019 = kuantifikasi2019.normalizedDifference(['B5', 'B4']).rename('NDVI');
var ndvi2020 = kuantifikasi2020.normalizedDifference(['B5', 'B4']).rename('NDVI');
var ndvi2021 = kuantifikasi2021.normalizedDifference(['B5', 'B4']).rename('NDVI');
// nilai Max dan Min NDVI
var min2011 = ee.Number(ndvi2011.reduceRegion({
          reducer: ee.Reducer.min(),
          geometry: table,
          scale: 30,
          maxPixels: 1e9
          }).values().get(0));
var max2011 = ee.Number(ndvi2011.reduceRegion({
          reducer: ee.Reducer.max(),
          geometry: table,
          scale: 30,
          maxPixels: 1e9
          }).values().get(0));
var min2012 = ee.Number(ndvi2012.reduceRegion({
          reducer: ee.Reducer.min(),
          geometry: table,
          scale: 30,
          maxPixels: 1e9
          }).values().get(0));
var max2012 = ee.Number(ndvi2012.reduceRegion({
          reducer: ee.Reducer.max(),
          geometry: table,
          scale: 30,
          maxPixels: 1e9
          }).values().get(0));
var min2013 = ee.Number(ndvi2013.reduceRegion({
          reducer: ee.Reducer.min(),
          geometry: table,
          scale: 30,
          maxPixels: 1e9
          }).values().get(0));
var max2013 = ee.Number(ndvi2013.reduceRegion({
          reducer: ee.Reducer.max(),
          geometry: table,
          scale: 30,
          maxPixels: 1e9
          }).values().get(0));
var min2014 = ee.Number(ndvi2014.reduceRegion({
          reducer: ee.Reducer.min(),
          geometry: table,
          scale: 30,
          maxPixels: 1e9
          }).values().get(0));
var max2014 = ee.Number(ndvi2014.reduceRegion({
          reducer: ee.Reducer.max(),
          geometry: table,
          scale: 30,
          maxPixels: 1e9
          }).values().get(0));
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
var min2016 = ee.Number(ndvi2016.reduceRegion({
          reducer: ee.Reducer.min(),
          geometry: table,
          scale: 30,
          maxPixels: 1e9
          }).values().get(0));
var max2016 = ee.Number(ndvi2016.reduceRegion({
          reducer: ee.Reducer.max(),
          geometry: table,
          scale: 30,
          maxPixels: 1e9
          }).values().get(0));
var min2017 = ee.Number(ndvi2017.reduceRegion({
          reducer: ee.Reducer.min(),
          geometry: table,
          scale: 30,
          maxPixels: 1e9
          }).values().get(0));
var max2017 = ee.Number(ndvi2017.reduceRegion({
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
var min2019 = ee.Number(ndvi2019.reduceRegion({
          reducer: ee.Reducer.min(),
          geometry: table,
          scale: 30,
          maxPixels: 1e9
          }).values().get(0));
var max2019 = ee.Number(ndvi2019.reduceRegion({
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
//Thermal Band ( Band 10 Brightness Temperature) dalam Kelvin
var thermal2011= kuantifikasi2011.select('B6').multiply(1000);
var thermal2012= kuantifikasi2012.select('B6').multiply(1000);
var thermal2013= kuantifikasi2013.select('B10').multiply(1000);
var thermal2014= kuantifikasi2014.select('B10').multiply(1000);
var thermal2015= kuantifikasi2015.select('B10').multiply(1000);
var thermal2016= kuantifikasi2016.select('B10').multiply(1000);
var thermal2017= kuantifikasi2017.select('B10').multiply(1000);
var thermal2018= kuantifikasi2018.select('B10').multiply(1000);
var thermal2019= kuantifikasi2019.select('B10').multiply(1000);
var thermal2020= kuantifikasi2020.select('B10').multiply(1000);
var thermal2021= kuantifikasi2021.select('B10').multiply(1000);
//fractional vegetation
var fv2011 =(ndvi2011.subtract(min2011).divide(max2011.subtract(min2011))).pow(ee.Number(2)).rename('FV');
var fv2012 =(ndvi2012.subtract(min2012).divide(max2012.subtract(min2012))).pow(ee.Number(2)).rename('FV');
var fv2013 =(ndvi2013.subtract(min2013).divide(max2013.subtract(min2013))).pow(ee.Number(2)).rename('FV');
var fv2014 =(ndvi2014.subtract(min2014).divide(max2014.subtract(min2014))).pow(ee.Number(2)).rename('FV');
var fv2015 =(ndvi2015.subtract(min2015).divide(max2015.subtract(min2015))).pow(ee.Number(2)).rename('FV');
var fv2016 =(ndvi2016.subtract(min2016).divide(max2016.subtract(min2016))).pow(ee.Number(2)).rename('FV');
var fv2017 =(ndvi2017.subtract(min2017).divide(max2017.subtract(min2017))).pow(ee.Number(2)).rename('FV'); 
var fv2018 =(ndvi2018.subtract(min2018).divide(max2018.subtract(min2018))).pow(ee.Number(2)).rename('FV'); 
var fv2019 =(ndvi2019.subtract(min2019).divide(max2019.subtract(min2019))).pow(ee.Number(2)).rename('FV'); 
var fv2020 =(ndvi2020.subtract(min2020).divide(max2020.subtract(min2020))).pow(ee.Number(2)).rename('FV'); 
var fv2021 =(ndvi2021.subtract(min2021).divide(max2021.subtract(min2021))).pow(ee.Number(2)).rename('FV'); 
//Emissivity
var a= ee.Number(0.004);
var b= ee.Number(0.986);
var EM2011=fv2011.multiply(a).add(b).rename('EMM');
var EM2012=fv2012.multiply(a).add(b).rename('EMM');
var EM2013=fv2013.multiply(a).add(b).rename('EMM');
var EM2014=fv2014.multiply(a).add(b).rename('EMM');
var EM2015=fv2015.multiply(a).add(b).rename('EMM');
var EM2016=fv2016.multiply(a).add(b).rename('EMM');
var EM2017=fv2017.multiply(a).add(b).rename('EMM');
var EM2018=fv2018.multiply(a).add(b).rename('EMM');
var EM2019=fv2019.multiply(a).add(b).rename('EMM');
var EM2020=fv2020.multiply(a).add(b).rename('EMM');
var EM2021=fv2021.multiply(a).add(b).rename('EMM');
//LST (Celcius)
var LST2011 = thermal2011.expression(
          '(Tb/(1 + (0.00115* (Tb / 1.438))*log(Ep)))-273.15', {
          'Tb': thermal2011.select('B6'),
          'Ep': EM2011.select('EMM')
          }).rename('LST');
Map.addLayer(LST2011, {min: 23.918451130276708, max:35.40172474607368, palette: [
'040274', '040281', '0502a3', '0502b8', '0502ce', '0502e6',
'0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef',
'3be285', '3ff38f', '86e26f', '3ae237', 'b5e22e', 'd6e21f',
'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08', 'ff500d',
'ff0000', 'de0101', 'c21301', 'a71001', '911003'
 ]},'LST2011');
var LST2012 = thermal2012.expression(
          '(Tb/(1 + (0.00115* (Tb / 1.438))*log(Ep)))-273.15', {
          'Tb': thermal2012.select('B6'),
          'Ep': EM2012.select('EMM')
          }).rename('LST');
Map.addLayer(LST2012, {min: 23.918451130276708, max:35.40172474607368, palette: [
'040274', '040281', '0502a3', '0502b8', '0502ce', '0502e6',
'0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef',
'3be285', '3ff38f', '86e26f', '3ae237', 'b5e22e', 'd6e21f',
'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08', 'ff500d',
'ff0000', 'de0101', 'c21301', 'a71001', '911003'
 ]},'LST2012');
var LST2013 = thermal2013.expression(
          '(Tb/(1 + (0.00115* (Tb / 1.438))*log(Ep)))-273.15', {
          'Tb': thermal2013.select('B10'),
          'Ep': EM2013.select('EMM')
          }).rename('LST');
Map.addLayer(LST2013, {min: 23.918451130276708, max:35.40172474607368, palette: [
'040274', '040281', '0502a3', '0502b8', '0502ce', '0502e6',
'0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef',
'3be285', '3ff38f', '86e26f', '3ae237', 'b5e22e', 'd6e21f',
'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08', 'ff500d',
'ff0000', 'de0101', 'c21301', 'a71001', '911003'
 ]},'LST2013');
var LST2014 = thermal2014.expression(
          '(Tb/(1 + (0.00115* (Tb / 1.438))*log(Ep)))-273.15', {
          'Tb': thermal2014.select('B10'),
          'Ep': EM2014.select('EMM')
          }).rename('LST');
Map.addLayer(LST2014, {min: 23.918451130276708, max:35.40172474607368, palette: [
'040274', '040281', '0502a3', '0502b8', '0502ce', '0502e6',
'0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef',
'3be285', '3ff38f', '86e26f', '3ae237', 'b5e22e', 'd6e21f',
'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08', 'ff500d',
'ff0000', 'de0101', 'c21301', 'a71001', '911003'
 ]},'LST2014');
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
 ]},'LST2015');
var LST2016 = thermal2016.expression(
          '(Tb/(1 + (0.00115* (Tb / 1.438))*log(Ep)))-273.15', {
          'Tb': thermal2016.select('B10'),
          'Ep': EM2016.select('EMM')
          }).rename('LST');
Map.addLayer(LST2016, {min: 23.918451130276708, max:35.40172474607368, palette: [
'040274', '040281', '0502a3', '0502b8', '0502ce', '0502e6',
'0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef',
'3be285', '3ff38f', '86e26f', '3ae237', 'b5e22e', 'd6e21f',
'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08', 'ff500d',
'ff0000', 'de0101', 'c21301', 'a71001', '911003'
 ]},'LST2016');
var LST2017 = thermal2017.expression(
          '(Tb/(1 + (0.00115* (Tb / 1.438))*log(Ep)))-273.15', {
          'Tb': thermal2017.select('B10'),
          'Ep': EM2017.select('EMM')
          }).rename('LST');
Map.addLayer(LST2017, {min: 23.918451130276708, max:35.40172474607368, palette: [
'040274', '040281', '0502a3', '0502b8', '0502ce', '0502e6',
'0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef',
'3be285', '3ff38f', '86e26f', '3ae237', 'b5e22e', 'd6e21f',
'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08', 'ff500d',
'ff0000', 'de0101', 'c21301', 'a71001', '911003'
 ]},'LST2017');
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
 ]},'LST2018');
 var LST2019 = thermal2019.expression(
          '(Tb/(1 + (0.00115* (Tb / 1.438))*log(Ep)))-273.15', {
          'Tb': thermal2019.select('B10'),
          'Ep': EM2019.select('EMM')
          }).rename('LST');
Map.addLayer(LST2019, {min: 23.918451130276708, max:35.40172474607368, palette: [
'040274', '040281', '0502a3', '0502b8', '0502ce', '0502e6',
'0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef',
'3be285', '3ff38f', '86e26f', '3ae237', 'b5e22e', 'd6e21f',
'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08', 'ff500d',
'ff0000', 'de0101', 'c21301', 'a71001', '911003'
 ]},'LST2019');
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
 ]},'LST2020');
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
 ]},'LST2021');
// GRAFIK TAHUNAN
//Gabung LST
var LSTSURABAYA =( LST2011.rename('2011')).addBands(LST2012.rename('2012')).addBands(LST2013.rename('2013')).addBands(LST2014.rename('2014')).addBands(LST2015.rename('2015')).addBands(LST2016.rename('2016'))
.addBands(LST2017.rename('2017')).addBands(LST2018.rename('2018')).addBands(LST2019.rename('2019')).addBands(LST2020.rename('2020')).addBands(LST2021.rename('2021'))
print('LST', LSTSURABAYA );
var waktu = [0,1,2,3,4,5,6,7,8,9,10];
//GRAFIK
  var chartmax = ui.Chart.image.regions(LSTSURABAYA,table,ee.Reducer.max(), 30, 'id')
                .setOptions({
                title:'Grafik Nilai Max LST Kota Surabaya',
                vAxis:{title:'Celcius'}});
  var chartmean = ui.Chart.image.regions(LSTSURABAYA,table,ee.Reducer.mean(), 30, 'id')
                .setOptions({
                title:'Grafik Nilai Mean LST Kota Surabaya',
                vAxis:{title:'Celcius'}});
  var chartmin = ui.Chart.image.regions(LSTSURABAYA,table,ee.Reducer.min(), 30,'id')
                .setOptions({
                title:'Grafik Nilai Min LST Kota Surabaya',
                vAxis:{title:'Celcius'}});
  var chart1 = ui.Chart.image.regions(LSTSURABAYA,table2,ee.Reducer.mean(), 30, 'name')
                .setChartType('ColumnChart')
                .setOptions({
                title:'Grafik Rata Rata LST Kecamatan Kota Surabaya',
                vAxis:{title:'Celcius'}});
 //Olah Individual Citra
 //
var col_list2011 = col2011.toList(col2011.size());
var LST_col2011 = col_list2011.map(function (ele) {
  var date = ee.Image(ele).get('system:time_start');
  var kuantif = ee.Image(ele).divide(10000);
  var ndvi = kuantif.normalizedDifference(['B4', 'B3']).rename('NDVI');
  // min dan max NDVI
  var min = ee.Number(ndvi.reduceRegion({
    reducer: ee.Reducer.min(),
    geometry: table,
    scale: 30,
    maxPixels: 1e9
  }).values().get(0));
  var max = ee.Number(ndvi.reduceRegion({
    reducer: ee.Reducer.max(),
    geometry: table,
    scale: 30,
    maxPixels: 1e9
  }).values().get(0));
  //fv
  var fv = (ndvi.subtract(min).divide(max.subtract(min))).pow(ee.Number(2)).rename('FV');
  //Emisivitas
  var a= ee.Number(0.004);
  var b= ee.Number(0.986);
  var EM = fv.multiply(a).add(b).rename('EMM');
  //Thermal Band ( Band 10) dalam Kelvin
  var thermal= kuantif.select('B6').multiply(1000);
  //LST ( Celcius )
  var LST = kuantif.expression(
    '(Tb/(1 + (0.00115* (Tb / 1.438))*log(Ep)))-273.15', {
      'Tb': thermal.select('B6'),
      'Ep': EM.select('EMM')
  });
  return ee.Algorithms.If(max, LST.set('system:time_start', date).float().rename('LST'), 0);
}).removeAll([0]);
    LST_col2011 = ee.ImageCollection(LST_col2011);
//Chart Max,Min,Mean LST
var chart = LST_col2011.map(function(image){
  var reducers = ee.Reducer.mean().combine(ee.Reducer.max(), '', true).combine(ee.Reducer.min(),'', true);
  var statistik = image.reduceRegion(reducers, table, 30);
  return ee.Feature(null, statistik).set('system:time_start', image.get('system:time_start')) ;});
var chart2011 = ui.Chart.feature.byFeature(chart, 'system:time_start')
                .setSeriesNames(['Max', 'Mean', 'Min'])
                .setOptions({
                title:'Grafik LST Kota Surabaya Tahun 2011',
                vAxis:{title:'Celcius'}});
                print(chart);
//
var col_list2012 = col2012.toList(col2012.size());
var LST_col2012 = col_list2012.map(function (ele) {
  var date = ee.Image(ele).get('system:time_start');
  var kuantif = ee.Image(ele).divide(10000);
  var ndvi = kuantif.normalizedDifference(['B4', 'B3']).rename('NDVI');
  // min dan max NDVI
  var min = ee.Number(ndvi.reduceRegion({
    reducer: ee.Reducer.min(),
    geometry: table,
    scale: 30,
    maxPixels: 1e9
  }).values().get(0));
  var max = ee.Number(ndvi.reduceRegion({
    reducer: ee.Reducer.max(),
    geometry: table,
    scale: 30,
    maxPixels: 1e9
  }).values().get(0));
  //fv
  var fv = (ndvi.subtract(min).divide(max.subtract(min))).pow(ee.Number(2)).rename('FV');
  //Emisivitas
  var a= ee.Number(0.004);
  var b= ee.Number(0.986);
  var EM = fv.multiply(a).add(b).rename('EMM');
  //Thermal Band ( Band 10) dalam Kelvin
  var thermal= kuantif.select('B6').multiply(1000);
  //LST ( Celcius )
  var LST = kuantif.expression(
    '(Tb/(1 + (0.00115* (Tb / 1.438))*log(Ep)))-273.15', {
      'Tb': thermal.select('B6'),
      'Ep': EM.select('EMM')
  });
  return ee.Algorithms.If(max, LST.set('system:time_start', date).float().rename('LST'), 0);
}).removeAll([0]);
    LST_col2012 = ee.ImageCollection(LST_col2012);
//Chart Max,Min,Mean LST
var chart = LST_col2012.map(function(image){
  var reducers = ee.Reducer.mean().combine(ee.Reducer.max(), '', true).combine(ee.Reducer.min(),'', true);
  var statistik = image.reduceRegion(reducers, table, 30);
  return ee.Feature(null, statistik).set('system:time_start', image.get('system:time_start')) ;});
var chart2012 = ui.Chart.feature.byFeature(chart, 'system:time_start')
                .setSeriesNames(['Max', 'Mean', 'Min'])
                .setOptions({
                title:'Grafik LST Kota Surabaya Tahun 2012',
                vAxis:{title:'Celcius'}});
                print(chart);
//
var col_list2013 = col2013.toList(col2013.size());
var LST_col2013 = col_list2013.map(function (ele) {
  var date = ee.Image(ele).get('system:time_start');
  var kuantif = ee.Image(ele).divide(10000);
  var ndvi = kuantif.normalizedDifference(['B5', 'B4']).rename('NDVI');
  // min dan max NDVI
  var min = ee.Number(ndvi.reduceRegion({
    reducer: ee.Reducer.min(),
    geometry: table,
    scale: 30,
    maxPixels: 1e9
  }).values().get(0));
  var max = ee.Number(ndvi.reduceRegion({
    reducer: ee.Reducer.max(),
    geometry: table,
    scale: 30,
    maxPixels: 1e9
  }).values().get(0));
  //fv
  var fv = (ndvi.subtract(min).divide(max.subtract(min))).pow(ee.Number(2)).rename('FV');
  //Emisivitas
  var a= ee.Number(0.004);
  var b= ee.Number(0.986);
  var EM = fv.multiply(a).add(b).rename('EMM');
  //Thermal Band ( Band 10) dalam Kelvin
  var thermal= kuantif.select('B10').multiply(1000);
  //LST ( Celcius )
  var LST = kuantif.expression(
    '(Tb/(1 + (0.00115* (Tb / 1.438))*log(Ep)))-273.15', {
      'Tb': thermal.select('B10'),
      'Ep': EM.select('EMM')
  });
  return ee.Algorithms.If(max, LST.set('system:time_start', date).float().rename('LST'), 0);
}).removeAll([0]);
    LST_col2013 = ee.ImageCollection(LST_col2013);
//Chart Max,Min,Mean LST
var chart = LST_col2013.map(function(image){
  var reducers = ee.Reducer.mean().combine(ee.Reducer.max(), '', true).combine(ee.Reducer.min(),'', true);
  var statistik = image.reduceRegion(reducers, table, 30);
  return ee.Feature(null, statistik).set('system:time_start', image.get('system:time_start')) ;});
var chart2013 = ui.Chart.feature.byFeature(chart, 'system:time_start')
                .setSeriesNames(['Max', 'Mean', 'Min'])
                .setOptions({
                title:'Grafik LST Kota Surabaya Tahun 2013',
                vAxis:{title:'Celcius'}});
                print(chart);
//
var col_list2014 = col2014.toList(col2014.size());
var LST_col2014 = col_list2014.map(function (ele) {
  var date = ee.Image(ele).get('system:time_start');
  var kuantif = ee.Image(ele).divide(10000);
  var ndvi = kuantif.normalizedDifference(['B5', 'B4']).rename('NDVI');
  // min dan max NDVI
  var min = ee.Number(ndvi.reduceRegion({
    reducer: ee.Reducer.min(),
    geometry: table,
    scale: 30,
    maxPixels: 1e9
  }).values().get(0));
  var max = ee.Number(ndvi.reduceRegion({
    reducer: ee.Reducer.max(),
    geometry: table,
    scale: 30,
    maxPixels: 1e9
  }).values().get(0));
  //fv
  var fv = (ndvi.subtract(min).divide(max.subtract(min))).pow(ee.Number(2)).rename('FV');
  //Emisivitas
  var a= ee.Number(0.004);
  var b= ee.Number(0.986);
  var EM = fv.multiply(a).add(b).rename('EMM');
  //Thermal Band ( Band 10) dalam Kelvin
  var thermal= kuantif.select('B10').multiply(1000);
  //LST ( Celcius )
  var LST = kuantif.expression(
    '(Tb/(1 + (0.00115* (Tb / 1.438))*log(Ep)))-273.15', {
      'Tb': thermal.select('B10'),
      'Ep': EM.select('EMM')
  });
  return ee.Algorithms.If(max, LST.set('system:time_start', date).float().rename('LST'), 0);
}).removeAll([0]);
    LST_col2014 = ee.ImageCollection(LST_col2014);
//Chart Max,Min,Mean LST
var chart = LST_col2014.map(function(image){
  var reducers = ee.Reducer.mean().combine(ee.Reducer.max(), '', true).combine(ee.Reducer.min(),'', true);
  var statistik = image.reduceRegion(reducers, table, 30);
  return ee.Feature(null, statistik).set('system:time_start', image.get('system:time_start')) ;});
var chart2014 = ui.Chart.feature.byFeature(chart, 'system:time_start')
                .setSeriesNames(['Max', 'Mean', 'Min'])
                .setOptions({
                title:'Grafik LST Kota Surabaya Tahun 2014',
                vAxis:{title:'Celcius'}});
                print(chart);
//
var col_list2015 = col2015.toList(col2015.size());
var LST_col2015 = col_list2015.map(function (ele) {
  var date = ee.Image(ele).get('system:time_start');
  var kuantif = ee.Image(ele).divide(10000);
  var ndvi = kuantif.normalizedDifference(['B5', 'B4']).rename('NDVI');
  // min dan max NDVI
  var min = ee.Number(ndvi.reduceRegion({
    reducer: ee.Reducer.min(),
    geometry: table,
    scale: 30,
    maxPixels: 1e9
  }).values().get(0));
  var max = ee.Number(ndvi.reduceRegion({
    reducer: ee.Reducer.max(),
    geometry: table,
    scale: 30,
    maxPixels: 1e9
  }).values().get(0));
  //fv
  var fv = (ndvi.subtract(min).divide(max.subtract(min))).pow(ee.Number(2)).rename('FV');
  //Emisivitas
  var a= ee.Number(0.004);
  var b= ee.Number(0.986);
  var EM = fv.multiply(a).add(b).rename('EMM');
  //Thermal Band ( Band 10) dalam Kelvin
  var thermal= kuantif.select('B10').multiply(1000);
  //LST ( Celcius )
  var LST = kuantif.expression(
    '(Tb/(1 + (0.00115* (Tb / 1.438))*log(Ep)))-273.15', {
      'Tb': thermal.select('B10'),
      'Ep': EM.select('EMM')
  });
  return ee.Algorithms.If(max, LST.set('system:time_start', date).float().rename('LST'), 0);
}).removeAll([0]);
    LST_col2015 = ee.ImageCollection(LST_col2015);
//Chart Max,Min,Mean LST
var chart = LST_col2015.map(function(image){
  var reducers = ee.Reducer.mean().combine(ee.Reducer.max(), '', true).combine(ee.Reducer.min(),'', true);
  var statistik = image.reduceRegion(reducers, table, 30);
  return ee.Feature(null, statistik).set('system:time_start', image.get('system:time_start')) ;});
var chart2015 = ui.Chart.feature.byFeature(chart, 'system:time_start')
                .setSeriesNames(['Max', 'Mean', 'Min'])
                .setOptions({
                title:'Grafik LST Kota Surabaya Tahun 2015',
                vAxis:{title:'Celcius'}});
                print(chart);
var col_list2016 = col2016.toList(col2016.size());
var LST_col2016 = col_list2016.map(function (ele) {
  var date = ee.Image(ele).get('system:time_start');
  var kuantif = ee.Image(ele).divide(10000);
  var ndvi = kuantif.normalizedDifference(['B5', 'B4']).rename('NDVI');
  // min dan max NDVI
  var min = ee.Number(ndvi.reduceRegion({
    reducer: ee.Reducer.min(),
    geometry: table,
    scale: 30,
    maxPixels: 1e9
  }).values().get(0));
  var max = ee.Number(ndvi.reduceRegion({
    reducer: ee.Reducer.max(),
    geometry: table,
    scale: 30,
    maxPixels: 1e9
  }).values().get(0));
  //fv
  var fv = (ndvi.subtract(min).divide(max.subtract(min))).pow(ee.Number(2)).rename('FV');
  //Emisivitas
  var a= ee.Number(0.004);
  var b= ee.Number(0.986);
  var EM = fv.multiply(a).add(b).rename('EMM');
  //Thermal Band ( Band 10) dalam Kelvin
  var thermal= kuantif.select('B10').multiply(1000);
  //LST ( Celcius )
  var LST = kuantif.expression(
    '(Tb/(1 + (0.00115* (Tb / 1.438))*log(Ep)))-273.15', {
      'Tb': thermal.select('B10'),
      'Ep': EM.select('EMM')
  });
  return ee.Algorithms.If(max, LST.set('system:time_start', date).float().rename('LST'), 0);
}).removeAll([0]);
    LST_col2016 = ee.ImageCollection(LST_col2016);
//Chart Max,Min,Mean LST
var chart = LST_col2016.map(function(image){
  var reducers = ee.Reducer.mean().combine(ee.Reducer.max(), '', true).combine(ee.Reducer.min(),'', true);
  var statistik = image.reduceRegion(reducers, table, 30);
  return ee.Feature(null, statistik).set('system:time_start', image.get('system:time_start')) ;});
var chart2016 = ui.Chart.feature.byFeature(chart, 'system:time_start')
                .setSeriesNames(['Max', 'Mean', 'Min'])
                .setOptions({
                title:'Grafik LST Kota Surabaya Tahun 2016',
                vAxis:{title:'Celcius'}});
                print(chart);
//
var col_list2017 = col2017.toList(col2017.size());
var LST_col2017 = col_list2017.map(function (ele) {
  var date = ee.Image(ele).get('system:time_start');
  var kuantif = ee.Image(ele).divide(10000);
  var ndvi = kuantif.normalizedDifference(['B5', 'B4']).rename('NDVI');
  // min dan max NDVI
  var min = ee.Number(ndvi.reduceRegion({
    reducer: ee.Reducer.min(),
    geometry: table,
    scale: 30,
    maxPixels: 1e9
  }).values().get(0));
  var max = ee.Number(ndvi.reduceRegion({
    reducer: ee.Reducer.max(),
    geometry: table,
    scale: 30,
    maxPixels: 1e9
  }).values().get(0));
  //fv
  var fv = (ndvi.subtract(min).divide(max.subtract(min))).pow(ee.Number(2)).rename('FV');
  //Emisivitas
  var a= ee.Number(0.004);
  var b= ee.Number(0.986);
  var EM = fv.multiply(a).add(b).rename('EMM');
  //Thermal Band ( Band 10) dalam Kelvin
  var thermal= kuantif.select('B10').multiply(1000);
  //LST ( Celcius )
  var LST = kuantif.expression(
    '(Tb/(1 + (0.00115* (Tb / 1.438))*log(Ep)))-273.15', {
      'Tb': thermal.select('B10'),
      'Ep': EM.select('EMM')
  });
  return ee.Algorithms.If(max, LST.set('system:time_start', date).float().rename('LST'), 0);
}).removeAll([0]);
    LST_col2017 = ee.ImageCollection(LST_col2017);
//Chart Max,Min,Mean LST
var chart = LST_col2017.map(function(image){
  var reducers = ee.Reducer.mean().combine(ee.Reducer.max(), '', true).combine(ee.Reducer.min(),'', true);
  var statistik = image.reduceRegion(reducers, table, 30);
  return ee.Feature(null, statistik).set('system:time_start', image.get('system:time_start')) ;});
var chart2017 = ui.Chart.feature.byFeature(chart, 'system:time_start')
                .setSeriesNames(['Max', 'Mean', 'Min'])
                .setOptions({
                title:'Grafik LST Kota Surabaya Tahun 2017',
                vAxis:{title:'Celcius'}});
                print(chart);
//
var col_list2018 = col2018.toList(col2018.size());
var LST_col2018 = col_list2018.map(function (ele) {
  var date = ee.Image(ele).get('system:time_start');
  var kuantif = ee.Image(ele).divide(10000);
  var ndvi = kuantif.normalizedDifference(['B5', 'B4']).rename('NDVI');
  // min dan max NDVI
  var min = ee.Number(ndvi.reduceRegion({
    reducer: ee.Reducer.min(),
    geometry: table,
    scale: 30,
    maxPixels: 1e9
  }).values().get(0));
  var max = ee.Number(ndvi.reduceRegion({
    reducer: ee.Reducer.max(),
    geometry: table,
    scale: 30,
    maxPixels: 1e9
  }).values().get(0));
  //fv
  var fv = (ndvi.subtract(min).divide(max.subtract(min))).pow(ee.Number(2)).rename('FV');
  //Emisivitas
  var a= ee.Number(0.004);
  var b= ee.Number(0.986);
  var EM = fv.multiply(a).add(b).rename('EMM');
  //Thermal Band ( Band 10) dalam Kelvin
  var thermal= kuantif.select('B10').multiply(1000);
  //LST ( Celcius )
  var LST = kuantif.expression(
    '(Tb/(1 + (0.00115* (Tb / 1.438))*log(Ep)))-273.15', {
      'Tb': thermal.select('B10'),
      'Ep': EM.select('EMM')
  });
  return ee.Algorithms.If(max, LST.set('system:time_start', date).float().rename('LST'), 0);
}).removeAll([0]);
    LST_col2018 = ee.ImageCollection(LST_col2018);
//Chart Max,Min,Mean LST
var chart = LST_col2018.map(function(image){
  var reducers = ee.Reducer.mean().combine(ee.Reducer.max(), '', true).combine(ee.Reducer.min(),'', true);
  var statistik = image.reduceRegion(reducers, table, 30);
  return ee.Feature(null, statistik).set('system:time_start', image.get('system:time_start')) ;});
var chart2018 = ui.Chart.feature.byFeature(chart, 'system:time_start')
                .setSeriesNames(['Max', 'Mean', 'Min'])
                .setOptions({
                title:'Grafik LST Kota Surabaya Tahun 2018',
                vAxis:{title:'Celcius'}});
                print(chart);
//
var col_list2019 = col2019.toList(col2019.size());
var LST_col2019 = col_list2019.map(function (ele) {
  var date = ee.Image(ele).get('system:time_start');
  var kuantif = ee.Image(ele).divide(10000);
  var ndvi = kuantif.normalizedDifference(['B5', 'B4']).rename('NDVI');
  // min dan max NDVI
  var min = ee.Number(ndvi.reduceRegion({
    reducer: ee.Reducer.min(),
    geometry: table,
    scale: 30,
    maxPixels: 1e9
  }).values().get(0));
  var max = ee.Number(ndvi.reduceRegion({
    reducer: ee.Reducer.max(),
    geometry: table,
    scale: 30,
    maxPixels: 1e9
  }).values().get(0));
  //fv
  var fv = (ndvi.subtract(min).divide(max.subtract(min))).pow(ee.Number(2)).rename('FV');
  //Emisivitas
  var a= ee.Number(0.004);
  var b= ee.Number(0.986);
  var EM = fv.multiply(a).add(b).rename('EMM');
  //Thermal Band ( Band 10) dalam Kelvin
  var thermal= kuantif.select('B10').multiply(1000);
  //LST ( Celcius )
  var LST = kuantif.expression(
    '(Tb/(1 + (0.00115* (Tb / 1.438))*log(Ep)))-273.15', {
      'Tb': thermal.select('B10'),
      'Ep': EM.select('EMM')
  });
  return ee.Algorithms.If(max, LST.set('system:time_start', date).float().rename('LST'), 0);
}).removeAll([0]);
    LST_col2019 = ee.ImageCollection(LST_col2019);
//Chart Max,Min,Mean LST
var chart = LST_col2019.map(function(image){
  var reducers = ee.Reducer.mean().combine(ee.Reducer.max(), '', true).combine(ee.Reducer.min(),'', true);
  var statistik = image.reduceRegion(reducers, table, 30);
  return ee.Feature(null, statistik).set('system:time_start', image.get('system:time_start')) ;});
var chart2019 = ui.Chart.feature.byFeature(chart, 'system:time_start')
                .setSeriesNames(['Max', 'Mean', 'Min'])
                .setOptions({
                title:'Grafik LST Kota Surabaya Tahun 2019',
                vAxis:{title:'Celcius'}});
                print(chart);
//
var col_list2020 = col2020.toList(col2020.size());
var LST_col2020 = col_list2020.map(function (ele) {
  var date = ee.Image(ele).get('system:time_start');
  var kuantif = ee.Image(ele).divide(10000);
  var ndvi = kuantif.normalizedDifference(['B5', 'B4']).rename('NDVI');
  // min dan max NDVI
  var min = ee.Number(ndvi.reduceRegion({
    reducer: ee.Reducer.min(),
    geometry: table,
    scale: 30,
    maxPixels: 1e9
  }).values().get(0));
  var max = ee.Number(ndvi.reduceRegion({
    reducer: ee.Reducer.max(),
    geometry: table,
    scale: 30,
    maxPixels: 1e9
  }).values().get(0));
  //fv
  var fv = (ndvi.subtract(min).divide(max.subtract(min))).pow(ee.Number(2)).rename('FV');
  //Emisivitas
  var a= ee.Number(0.004);
  var b= ee.Number(0.986);
  var EM = fv.multiply(a).add(b).rename('EMM');
  //Thermal Band ( Band 10) dalam Kelvin
  var thermal= kuantif.select('B10').multiply(1000);
  //LST ( Celcius )
  var LST = kuantif.expression(
    '(Tb/(1 + (0.00115* (Tb / 1.438))*log(Ep)))-273.15', {
      'Tb': thermal.select('B10'),
      'Ep': EM.select('EMM')
  });
  return ee.Algorithms.If(max, LST.set('system:time_start', date).float().rename('LST'), 0);
}).removeAll([0]);
    LST_col2020 = ee.ImageCollection(LST_col2020);
//Chart Max,Min,Mean LST
var chart = LST_col2020.map(function(image){
  var reducers = ee.Reducer.mean().combine(ee.Reducer.max(), '', true).combine(ee.Reducer.min(),'', true);
  var statistik = image.reduceRegion(reducers, table, 30);
  return ee.Feature(null, statistik).set('system:time_start', image.get('system:time_start')) ;});
var chart2020 = ui.Chart.feature.byFeature(chart, 'system:time_start')
                .setSeriesNames(['Max', 'Mean', 'Min'])
                .setOptions({
                title:'Grafik LST Kota Surabaya Tahun 2020',
                vAxis:{title:'Celcius'}});
                print(chart);
//
var col_list2021 = col2021.toList(col2021.size());
var LST_col2021 = col_list2021.map(function (ele) {
  var date = ee.Image(ele).get('system:time_start');
  var kuantif = ee.Image(ele).divide(10000);
  var ndvi = kuantif.normalizedDifference(['B5', 'B4']).rename('NDVI');
  // min dan max NDVI
  var min = ee.Number(ndvi.reduceRegion({
    reducer: ee.Reducer.min(),
    geometry: table,
    scale: 30,
    maxPixels: 1e9
  }).values().get(0));
  var max = ee.Number(ndvi.reduceRegion({
    reducer: ee.Reducer.max(),
    geometry: table,
    scale: 30,
    maxPixels: 1e9
  }).values().get(0));
  //fv
  var fv = (ndvi.subtract(min).divide(max.subtract(min))).pow(ee.Number(2)).rename('FV');
  //Emisivitas
  var a= ee.Number(0.004);
  var b= ee.Number(0.986);
  var EM = fv.multiply(a).add(b).rename('EMM');
  //Thermal Band ( Band 10) dalam Kelvin
  var thermal= kuantif.select('B10').multiply(1000);
  //LST ( Celcius )
  var LST = kuantif.expression(
    '(Tb/(1 + (0.00115* (Tb / 1.438))*log(Ep)))-273.15', {
      'Tb': thermal.select('B10'),
      'Ep': EM.select('EMM')
  });
  return ee.Algorithms.If(max, LST.set('system:time_start', date).float().rename('LST'), 0);
}).removeAll([0]);
    LST_col2021 = ee.ImageCollection(LST_col2021);
//Chart Max,Min,Mean LST
var chart = LST_col2021.map(function(image){
  var reducers = ee.Reducer.mean().combine(ee.Reducer.max(), '', true).combine(ee.Reducer.min(),'', true);
  var statistik = image.reduceRegion(reducers, table, 30);
  return ee.Feature(null, statistik).set('system:time_start', image.get('system:time_start')) ;});
var chart2021 = ui.Chart.feature.byFeature(chart, 'system:time_start')
                .setSeriesNames(['Max', 'Mean', 'Min'])
                .setOptions({
                title:'Grafik LST Kota Surabaya Tahun 2021',
                vAxis:{title:'Celcius'}});
                print(chart);
//Estimasi SUHI
// Rata2 LST
var mean2011 = LST2011.clip(table)
    .reduceRegion({
    reducer: ee.Reducer.mean().unweighted(),
    geometry: table,
    scale: 30,
  bestEffort:true
  })
  .get('LST');
var meanLST2011 = ee.Number(mean2011);
var mean2012 = LST2012.clip(table)
    .reduceRegion({
    reducer: ee.Reducer.mean().unweighted(),
    geometry: table,
    scale: 30,
  bestEffort:true
  })
  .get('LST');
var meanLST2012 = ee.Number(mean2012);
var mean2013 = LST2013.clip(table)
    .reduceRegion({
    reducer: ee.Reducer.mean().unweighted(),
    geometry: table,
    scale: 30,
  bestEffort:true
  })
  .get('LST');
var meanLST2013 = ee.Number(mean2013);
var mean2014 = LST2014.clip(table)
    .reduceRegion({
    reducer: ee.Reducer.mean().unweighted(),
    geometry: table,
    scale: 30,
  bestEffort:true
  })
  .get('LST');
var meanLST2014 = ee.Number(mean2014);
var mean2015 = LST2015.clip(table)
    .reduceRegion({
    reducer: ee.Reducer.mean().unweighted(),
    geometry: table,
    scale: 30,
  bestEffort:true
  })
  .get('LST');
var meanLST2015 = ee.Number(mean2015);
var mean2016 = LST2016.clip(table)
    .reduceRegion({
    reducer: ee.Reducer.mean().unweighted(),
    geometry: table,
    scale: 30,
  bestEffort:true
  })
  .get('LST');
var meanLST2016 = ee.Number(mean2016);
var mean2017 = LST2017.clip(table)
    .reduceRegion({
    reducer: ee.Reducer.mean().unweighted(),
    geometry: table,
    scale: 30,
  bestEffort:true
  })
  .get('LST');
var meanLST2017 = ee.Number(mean2017);
var mean2018 = LST2018.clip(table)
    .reduceRegion({
    reducer: ee.Reducer.mean().unweighted(),
    geometry: table,
    scale: 30,
  bestEffort:true
  })
  .get('LST');
var meanLST2018 = ee.Number(mean2018);
var mean2019 = LST2019.clip(table)
    .reduceRegion({
    reducer: ee.Reducer.mean().unweighted(),
    geometry: table,
    scale: 30,
  bestEffort:true
  })
  .get('LST');
var meanLST2019 = ee.Number(mean2019);
var mean2020 = LST2020.clip(table)
    .reduceRegion({
    reducer: ee.Reducer.mean().unweighted(),
    geometry: table,
    scale: 30,
  bestEffort:true
  })
  .get('LST');
var meanLST2020 = ee.Number(mean2020);
var mean2021 = LST2021.clip(table)
    .reduceRegion({
    reducer: ee.Reducer.mean().unweighted(),
    geometry: table,
    scale: 30,
  bestEffort:true
  })
  .get('LST');
var meanLST2021 = ee.Number(mean2021);
// STD LST
var STD2011 = LST2011.clip(table)
  .reduceRegion({
    reducer: ee.Reducer.stdDev(),
    geometry: table,
    scale: 30,
  bestEffort:true
  })
  .get('LST');
var STDLST2011 = ee.Number(STD2011);
var STD2012 = LST2012.clip(table)
  .reduceRegion({
    reducer: ee.Reducer.stdDev(),
    geometry: table,
    scale: 30,
  bestEffort:true
  })
  .get('LST');
var STDLST2012 = ee.Number(STD2012);
var STD2013 = LST2013.clip(table)
  .reduceRegion({
    reducer: ee.Reducer.stdDev(),
    geometry: table,
    scale: 30,
  bestEffort:true
  })
  .get('LST');
var STDLST2013 = ee.Number(STD2013);
var STD2014 = LST2014.clip(table)
  .reduceRegion({
    reducer: ee.Reducer.stdDev(),
    geometry: table,
    scale: 30,
  bestEffort:true
  })
  .get('LST');
var STDLST2014 = ee.Number(STD2014);
var STD2015 = LST2015.clip(table)
  .reduceRegion({
    reducer: ee.Reducer.stdDev(),
    geometry: table,
    scale: 30,
  bestEffort:true
  })
  .get('LST');
var STDLST2015 = ee.Number(STD2015);
var STD2016 = LST2016.clip(table)
  .reduceRegion({
    reducer: ee.Reducer.stdDev(),
    geometry: table,
    scale: 30,
  bestEffort:true
  })
  .get('LST');
var STDLST2016 = ee.Number(STD2016);
var STD2017 = LST2017.clip(table)
  .reduceRegion({
    reducer: ee.Reducer.stdDev(),
    geometry: table,
    scale: 30,
  bestEffort:true
  })
  .get('LST');
var STDLST2017 = ee.Number(STD2017);
var STD2018 = LST2018.clip(table)
  .reduceRegion({
    reducer: ee.Reducer.stdDev(),
    geometry: table,
    scale: 30,
  bestEffort:true
  })
  .get('LST');
var STDLST2018 = ee.Number(STD2018);
var STD2019 = LST2019.clip(table)
  .reduceRegion({
    reducer: ee.Reducer.stdDev(),
    geometry: table,
    scale: 30,
  bestEffort:true
  })
  .get('LST');
var STDLST2019 = ee.Number(STD2019);
var STD2020 = LST2020.clip(table)
  .reduceRegion({
    reducer: ee.Reducer.stdDev(),
    geometry: table,
    scale: 30,
  bestEffort:true
  })
  .get('LST');
var STDLST2020 = ee.Number(STD2020);
var STD2021 = LST2021.clip(table)
  .reduceRegion({
    reducer: ee.Reducer.stdDev(),
    geometry: table,
    scale: 30,
  bestEffort:true
  })
  .get('LST');
var STDLST2021 = ee.Number(STD2021);
//ESTIMASI SUHI
var c = ee.Number(0.5);
var SUHI2011 = LST2011.subtract((meanLST2011).add((c).multiply(STDLST2011)));
var SUHI2012 = LST2012.subtract((meanLST2012).add((c).multiply(STDLST2012)));
var SUHI2013 = LST2013.subtract((meanLST2013).add((c).multiply(STDLST2013)));
var SUHI2014 = LST2014.subtract((meanLST2014).add((c).multiply(STDLST2014)));
var SUHI2015 = LST2015.subtract((meanLST2015).add((c).multiply(STDLST2015)));
var SUHI2016 = LST2016.subtract((meanLST2016).add((c).multiply(STDLST2016)));
var SUHI2017 = LST2017.subtract((meanLST2017).add((c).multiply(STDLST2017)));
var SUHI2018 = LST2018.subtract((meanLST2018).add((c).multiply(STDLST2018)));
var SUHI2019 = LST2019.subtract((meanLST2019).add((c).multiply(STDLST2019)));
var SUHI2020 = LST2020.subtract((meanLST2020).add((c).multiply(STDLST2020)));
var SUHI2021 = LST2021.subtract((meanLST2021).add((c).multiply(STDLST2021)));
  var max2011 = ee.Number(LST2011.reduceRegion({
          reducer: ee.Reducer.max(),
          geometry: table,
          scale: 30,
          maxPixels: 1e9
          }).values().get(0));
  var max2012 = ee.Number(LST2012.reduceRegion({
          reducer: ee.Reducer.max(),
          geometry: table,
          scale: 30,
          maxPixels: 1e9
          }).values().get(0));
  var max2013 = ee.Number(LST2013.reduceRegion({
          reducer: ee.Reducer.max(),
          geometry: table,
          scale: 30,
          maxPixels: 1e9
          }).values().get(0));
  var max2014 = ee.Number(LST2014.reduceRegion({
          reducer: ee.Reducer.max(),
          geometry: table,
          scale: 30,
          maxPixels: 1e9
          }).values().get(0));
  var max2015 = ee.Number(LST2015.reduceRegion({
          reducer: ee.Reducer.max(),
          geometry: table,
          scale: 30,
          maxPixels: 1e9
          }).values().get(0));
  var max2016 = ee.Number(LST2016.reduceRegion({
          reducer: ee.Reducer.max(),
          geometry: table,
          scale: 30,
          maxPixels: 1e9
          }).values().get(0));
  var max2017 = ee.Number(LST2017.reduceRegion({
          reducer: ee.Reducer.max(),
          geometry: table,
          scale: 30,
          maxPixels: 1e9
          }).values().get(0));
  var max2018 = ee.Number(LST2018.reduceRegion({
          reducer: ee.Reducer.max(),
          geometry: table,
          scale: 30,
          maxPixels: 1e9
          }).values().get(0));
  var max2019 = ee.Number(LST2019.reduceRegion({
          reducer: ee.Reducer.max(),
          geometry: table,
          scale: 30,
          maxPixels: 1e9
          }).values().get(0));
  var max2020 = ee.Number(LST2020.reduceRegion({
          reducer: ee.Reducer.max(),
          geometry: table,
          scale: 30,
          maxPixels: 1e9
          }).values().get(0));
  var max2021 = ee.Number(LST2021.reduceRegion({
          reducer: ee.Reducer.max(),
          geometry: table,
          scale: 30,
          maxPixels: 1e9
          }).values().get(0));
// Estimasi SUHI metode Ambang Batas ( Threshold )
var threshold2011 = SUHI2011.updateMask(SUHI2011.gte(0.0)).rename('UHI');
Map.addLayer(threshold2011,{palette:['red']},'SUHI2011');
var threshold2012 = SUHI2012.updateMask(SUHI2012.gte(0.0)).rename('UHI');
Map.addLayer(threshold2012,{palette:['red']},'SUHI2012');
var threshold2013 = SUHI2013.updateMask(SUHI2013.gte(0.0)).rename('UHI');
Map.addLayer(threshold2013,{palette:['red']},'SUHI2013');
var threshold2014 = SUHI2014.updateMask(SUHI2014.gte(0.0)).rename('UHI');
Map.addLayer(threshold2014,{palette:['red']},'SUHI2014');
var threshold2015 = SUHI2015.updateMask(SUHI2015.gte(0.0)).rename('UHI');
Map.addLayer(threshold2015,{palette:['red']},'SUHI2015');
var threshold2016 = SUHI2016.updateMask(SUHI2016.gte(0.0)).rename('UHI');
Map.addLayer(threshold2016,{palette:['red']},'SUHI2016');
var threshold2017 = SUHI2017.updateMask(SUHI2017.gte(0.0)).rename('UHI');
Map.addLayer(threshold2017,{palette:['red']},'SUHI2017');
var threshold2018 = SUHI2018.updateMask(SUHI2018.gte(0.0)).rename('UHI');
Map.addLayer(threshold2018,{palette:['red']},'SUHI2018');
var threshold2019 = SUHI2019.updateMask(SUHI2019.gte(0.0)).rename('UHI');
Map.addLayer(threshold2019,{palette:['red']},'SUHI2019');
var threshold2020 = SUHI2020.updateMask(SUHI2020.gte(0.0)).rename('UHI');
Map.addLayer(threshold2020,{palette:['red']},'SUHI2020');
var threshold2021 = SUHI2021.updateMask(SUHI2021.gte(0.0)).rename('UHI');
Map.addLayer(threshold2021,{palette:['red']},'SUHI2021');
//Nilai Ambang Batas
var AM2011 = LST2011.subtract(threshold2011);
var AM2012 = LST2012.subtract(threshold2012);
var AM2013 = LST2013.subtract(threshold2013);
var AM2014 = LST2014.subtract(threshold2014);
var AM2015 = LST2015.subtract(threshold2015);
var AM2016 = LST2016.subtract(threshold2016);
var AM2017 = LST2017.subtract(threshold2017);
var AM2018 = LST2018.subtract(threshold2018);
var AM2019 = LST2019.subtract(threshold2019);
var AM2020 = LST2020.subtract(threshold2020);
var AM2021 = LST2021.subtract(threshold2021);
// GRAFIK TINBGKAT SUHI
  var SUHISBY=(threshold2011.rename('2011')).addBands(threshold2012.rename('2012')).addBands(threshold2013.rename('2013'))
  .addBands(threshold2014.rename('2014')).addBands(threshold2015.rename('2015')).addBands(threshold2016.rename('2016'))
  .addBands(threshold2017.rename('2017')).addBands(threshold2018.rename('2018')).addBands(threshold2019.rename('2019'))
  .addBands(threshold2020.rename('2020')).addBands(threshold2021.rename('2021'));
  var AM = (AM2011.rename('2011')).addBands(AM2012.rename('2012')).addBands(AM2013.rename('2013'))
  .addBands(AM2014.rename('2014')).addBands(AM2015.rename('2015')).addBands(AM2016.rename('2016'))
  .addBands(AM2017.rename('2017')).addBands(AM2018.rename('2018')).addBands(AM2019.rename('2019'))
  .addBands(AM2020.rename('2020')).addBands(AM2021.rename('2021'));
  var chartsuhi = ui.Chart.image.regions(SUHISBY,table,ee.Reducer.max(), 30, 'id')
                .setOptions({
                title:'Grafik Tingkat SUHI Kota Surabaya',
                vAxis:{title:'Celcius'}});
  var chartam = ui.Chart.image.regions(AM,table,ee.Reducer.max(), 30, 'id')
                .setOptions({
                title:'Nilai Ambang Batas SUHI Kota Surabaya',
                vAxis:{title:'Celcius'}});
//
//widget
// Make left and right maps.
var leftMap = ui.Map();
var rightMap = ui.Map();
// Make predefined data layers that can be selected.
var Img2011 = ui.Map.Layer(LST2011, {min: 23.918451130276708, max:35.40172474607368, palette: [
'040274', '040281', '0502a3', '0502b8', '0502ce', '0502e6',
'0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef',
'3be285', '3ff38f', '86e26f', '3ae237', 'b5e22e', 'd6e21f',
'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08', 'ff500d',
'ff0000', 'de0101', 'c21301', 'a71001', '911003'
 ]});
var Img2012 = ui.Map.Layer(LST2012, {min: 23.918451130276708, max:35.40172474607368, palette: [
'040274', '040281', '0502a3', '0502b8', '0502ce', '0502e6',
'0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef',
'3be285', '3ff38f', '86e26f', '3ae237', 'b5e22e', 'd6e21f',
'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08', 'ff500d',
'ff0000', 'de0101', 'c21301', 'a71001', '911003'
 ]});
var Img2013 = ui.Map.Layer(LST2013, {min: 23.918451130276708, max:35.40172474607368, palette: [
'040274', '040281', '0502a3', '0502b8', '0502ce', '0502e6',
'0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef',
'3be285', '3ff38f', '86e26f', '3ae237', 'b5e22e', 'd6e21f',
'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08', 'ff500d',
'ff0000', 'de0101', 'c21301', 'a71001', '911003'
 ]});
var Img2014 = ui.Map.Layer(LST2014, {min: 23.918451130276708, max:35.40172474607368, palette: [
'040274', '040281', '0502a3', '0502b8', '0502ce', '0502e6',
'0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef',
'3be285', '3ff38f', '86e26f', '3ae237', 'b5e22e', 'd6e21f',
'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08', 'ff500d',
'ff0000', 'de0101', 'c21301', 'a71001', '911003'
 ]});
var Img2015 = ui.Map.Layer(LST2015, {min: 23.918451130276708, max:35.40172474607368, palette: [
'040274', '040281', '0502a3', '0502b8', '0502ce', '0502e6',
'0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef',
'3be285', '3ff38f', '86e26f', '3ae237', 'b5e22e', 'd6e21f',
'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08', 'ff500d',
'ff0000', 'de0101', 'c21301', 'a71001', '911003'
 ]});
var Img2016 = ui.Map.Layer(LST2016, {min: 23.918451130276708, max:35.40172474607368, palette: [
'040274', '040281', '0502a3', '0502b8', '0502ce', '0502e6',
'0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef',
'3be285', '3ff38f', '86e26f', '3ae237', 'b5e22e', 'd6e21f',
'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08', 'ff500d',
'ff0000', 'de0101', 'c21301', 'a71001', '911003'
 ]});
var Img2017 = ui.Map.Layer(LST2017, {min: 23.918451130276708, max:35.40172474607368, palette: [
'040274', '040281', '0502a3', '0502b8', '0502ce', '0502e6',
'0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef',
'3be285', '3ff38f', '86e26f', '3ae237', 'b5e22e', 'd6e21f',
'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08', 'ff500d',
'ff0000', 'de0101', 'c21301', 'a71001', '911003'
 ]});
var Img2018 = ui.Map.Layer(LST2018, {min: 23.918451130276708, max:35.40172474607368, palette: [
'040274', '040281', '0502a3', '0502b8', '0502ce', '0502e6',
'0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef',
'3be285', '3ff38f', '86e26f', '3ae237', 'b5e22e', 'd6e21f',
'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08', 'ff500d',
'ff0000', 'de0101', 'c21301', 'a71001', '911003'
 ]});
var Img2019 = ui.Map.Layer(LST2019, {min: 23.918451130276708, max:35.40172474607368, palette: [
'040274', '040281', '0502a3', '0502b8', '0502ce', '0502e6',
'0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef',
'3be285', '3ff38f', '86e26f', '3ae237', 'b5e22e', 'd6e21f',
'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08', 'ff500d',
'ff0000', 'de0101', 'c21301', 'a71001', '911003'
 ]});
var Img2020 = ui.Map.Layer(LST2020, {min: 23.918451130276708, max:35.40172474607368, palette: [
'040274', '040281', '0502a3', '0502b8', '0502ce', '0502e6',
'0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef',
'3be285', '3ff38f', '86e26f', '3ae237', 'b5e22e', 'd6e21f',
'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08', 'ff500d',
'ff0000', 'de0101', 'c21301', 'a71001', '911003'
 ]});
var Img2021 = ui.Map.Layer(LST2021, {min: 23.918451130276708, max:35.40172474607368, palette: [
'040274', '040281', '0502a3', '0502b8', '0502ce', '0502e6',
'0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef',
'3be285', '3ff38f', '86e26f', '3ae237', 'b5e22e', 'd6e21f',
'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08', 'ff500d',
'ff0000', 'de0101', 'c21301', 'a71001', '911003'
 ]});
//Widget SUHI
var UHI2011 = ui.Map.Layer(threshold2011,{palette:['red']},'SUHI2021');
var UHI2012 = ui.Map.Layer(threshold2012,{palette:['red']},'SUHI2021');
var UHI2013 = ui.Map.Layer(threshold2013,{palette:['red']},'SUHI2021');
var UHI2014 = ui.Map.Layer(threshold2014,{palette:['red']},'SUHI2021');
var UHI2015 = ui.Map.Layer(threshold2015,{palette:['red']},'SUHI2021');
var UHI2016 = ui.Map.Layer(threshold2016,{palette:['red']},'SUHI2021');
var UHI2017 = ui.Map.Layer(threshold2017,{palette:['red']},'SUHI2021');
var UHI2018 = ui.Map.Layer(threshold2018,{palette:['red']},'SUHI2021');
var UHI2019 = ui.Map.Layer(threshold2019,{palette:['red']},'SUHI2021');
var UHI2020 = ui.Map.Layer(threshold2020,{palette:['red']},'SUHI2021');
var UHI2021 = ui.Map.Layer(threshold2021,{palette:['red']},'SUHI2021');
// Add default layers to maps.
leftMap.add(Img2011);
rightMap.add(Img2021);
// Link the maps
var linkedMaps = ui.Map.Linker([leftMap , rightMap]);
// Create a SplitPanel which holds the linked maps side-by-side.
var splitPanel = ui.SplitPanel({
  firstPanel: linkedMaps.get(0),
  secondPanel: linkedMaps.get(1),
  orientation: 'horizontal',
  wipe: true,
  style: {stretch: 'both'}
});
// Make a list of image layers to select from.
var layers = ['LST 2011','LST 2012','LST 2013','LST 2014','LST 2015','LST 2016', 'LST 2017', 'LST 2018','LST 2019','LST 2020','LST 2021',
'SUHI2011','SUHI2012','SUHI2013','SUHI2014','SUHI2015','SUHI2016','SUHI2017','SUHI2018','SUHI2019','SUHI2020','SUHI2021',];
// Make a function that will retrieve a layer based on selection.
function getLayer(selection) {
  var layer = Img2011;
  if(selection == 'LST 2011') {
    layer = Img2011;
  }else if(selection == 'LST 2012'){
    layer = Img2012;
  }else if(selection == 'LST 2013'){
    layer = Img2013;
  }else if(selection == 'LST 2014'){
    layer = Img2014;
  }else if(selection == 'LST 2015'){
    layer = Img2015;
  }else if(selection == 'LST 2016'){
    layer = Img2016;
  }else if(selection == 'LST 2017'){
    layer = Img2017;
  }else if(selection == 'LST 2018'){
    layer = Img2018;
  } else if(selection == 'LST 2019'){
    layer = Img2019;
  } else if(selection == 'LST 2020'){
    layer = Img2020;
  } else if(selection == 'LST 2021'){
    layer = Img2021;
  } else if(selection == 'SUHI2011'){
    layer = UHI2011;
  } else if(selection == 'SUHI2012'){
    layer = UHI2012;
  } else if(selection == 'SUHI2013'){
    layer = UHI2013;
  } else if(selection == 'SUHI2014'){
    layer = UHI2014;
  } else if(selection == 'SUHI2015'){
    layer = UHI2015;
  } else if(selection == 'SUHI2016'){
    layer = UHI2016;
  } else if(selection == 'SUHI2017'){
    layer = UHI2017;
  } else if(selection == 'SUHI2018'){
    layer = UHI2018;
  } else if(selection == 'SUHI2019'){
    layer = UHI2019;
  } else if(selection == 'SUHI2020'){
    layer = UHI2020;
  } else if(selection == 'SUHI2021'){
    layer = UHI2021;
}
  return layer;
}
// Make a callback function for when a selection is made for left map.
function selectLeftOnChange(selection) {
  leftMap.layers().set(0, getLayer(selection));
}
// Make a callback function for when a selection is made for right map.
function selectRightOnChange(selection) {
  rightMap.layers().set(0, getLayer(selection));
}
// Define selection buttons for left and right map layers.
var selectLeft = ui.Select(layers, 'LST 2011', 'LST 2011', selectLeftOnChange, false, {position: 'top-left'});
var selectRight = ui.Select(layers, 'LST 2021', 'LST 2021', selectRightOnChange, false, {position: 'top-right'});
// Clear the root, add the splitPanel, and buttons.
ui.root.clear();
ui.root.add(splitPanel);
leftMap.add(selectLeft);
rightMap.add(selectRight);
leftMap.centerObject(table, 12.3);
rightMap.centerObject(table, 12.3);
//LEGENDA
// create vizualization parameters
var viz =  {min: 20, max:40, palette: [
'040274', '040281', '0502a3', '0502b8', '0502ce', '0502e6',
'0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef',
'3be285', '3ff38f', '86e26f', '3ae237', 'b5e22e', 'd6e21f',
'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08', 'ff500d',
'ff0000', 'de0101', 'c21301', 'a71001', '911003'
 ]};
// set position of panel
var legend = ui.Panel({
style: {
position: 'bottom-left',
padding: '5px 12px'
}
});
// Create legend title
var legendTitle = ui.Label({
value: 'Celcius (C)',
style: {
fontWeight: 'bold',
fontSize: '14px',
margin: '0 0 4px 0',
padding: '0'
}
});
// Add the title to the panel
legend.add(legendTitle);
leftMap.add(legend);
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
params: {bbox:'0,0,10,100', dimensions:'10x100'},
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
//
var panel = ui.Panel({style:{
                      height:'400px',
                      width: '370px',
                      position: 'bottom-right', 
                      padding: '3px'},
                      layout: ui.Panel.Layout.flow('vertical')})
      //.add(ui.Label('Grafik LST Tahunan :'))
      .add(chartmax).add(chartmean).add(chartmin).add(chart1).add(chartsuhi).add(chartam).add(chart2021).add(chart2020).add(chart2019).add(chart2018).add(chart2017).add(chart2016)
      .add(chart2015).add(chart2014).add(chart2013).add(chart2012).add(chart2011);
var header=ui.Label('Selamat Datang Di Tugas Akhir Juma Mualana-03311840000064',
{fontWeight: 'bold', fontSize:'20px', color: 'black',textAlign: 'center'});
var text_1 = ui.Label('Website Ini Menyedikan Data Perubahan Suhu dan Daerah Terdampak Fenomena Urban Heat Island ( UHI ) di Kota Surabaya Selama 10 Tahun Terakhir.',
{fontSize:'17px', textAlign: 'justify'});
var text_5 = ui.Label('Dosen Pembimbing : Dr. Filsa Bioresita, ST, MT',
{fontWeight: 'italic',fontSize:'12px', textAlign: 'justify'});
var text_2 = ui.Label('Estimasi LST dan Urban heat Island Menggunakan Data Citra Landsat Pada Bulan Kering di Kota Surabaya Selama 10 Tahun Terakhir. Pada lamam ini terdapat grafik yang menampikan nilai Max, Min, dan Mean Secara Timeseries Pada Estimasi Estimasi 1 tahun Citra yang digunakan. Untuk melihat grafik tersebut anda hanya perlu mengeser kebawah lawan grafik pada kolom bagian kanan',
{fontSize:'14px', textAlign: 'justify'});
var text_3 = ui.Label('LST = Land Surface Themperature atau Suhu Permukaan Tanah',
{fontSize:'12px', textAlign: 'justify'});
var text_4 = ui.Label('SUHI = Surface Urban Heat Island / Daerah Terdampak Fenomena Kota Panas/UHI ( Pada hasil visualisasi ditunjukan oleh Warna Merah )',
{fontSize:'12px', textAlign: 'justify'});
var text_6 = ui.Label('Departemen Teknik Geomatika,Fakultas Teknik Sipil,Perencanaan, dan Kebumian ( FTSPK ) , Institut Teknologi Sepuluh Nopember',
{fontSize:'12px', textAlign: 'center'});
var text_7 = ui.Label('Grafik Perubahan LST dan SUHI di Kota Surabaya',
{fontWeight: 'bold',fontSize:'14px', textAlign: 'center'});
var toolPanel = ui.Panel ([header,text_1,text_2,text_3,text_4,text_5,text_6,text_7],
'flow',{width:'370px'});
ui.root.widgets().add((toolPanel).add(panel));