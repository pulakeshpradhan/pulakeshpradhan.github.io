var table = ui.import && ui.import("table", "table", {
      "id": "users/Surabaya/Surabaya"
    }) || ee.FeatureCollection("users/Surabaya/Surabaya");
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
var image2016 = col2016.mean().clip(table);
var image2017 = col2017.mean().clip(table);
var image2018 = col2018.mean().clip(table);
var image2019 = col2019.mean().clip(table);
var image2020 = col2020.mean().clip(table);
var image2021 = col2021.mean().clip(table);
//Kuantifikasi
var kuantifikasi2016 =image2016.divide(10000);
var kuantifikasi2017 =image2017.divide(10000);
var kuantifikasi2018 =image2018.divide(10000);
var kuantifikasi2019 =image2019.divide(10000);
var kuantifikasi2020 =image2020.divide(10000);
var kuantifikasi2021 =image2021.divide(10000);
//NDVI
var ndvi2016 = kuantifikasi2016.normalizedDifference(['B5', 'B4']).rename('NDVI');
var ndvi2017 = kuantifikasi2017.normalizedDifference(['B5', 'B4']).rename('NDVI');
var ndvi2018 = kuantifikasi2018.normalizedDifference(['B5', 'B4']).rename('NDVI');
var ndvi2019 = kuantifikasi2019.normalizedDifference(['B5', 'B4']).rename('NDVI');
var ndvi2020 = kuantifikasi2020.normalizedDifference(['B5', 'B4']).rename('NDVI');
var ndvi2021 = kuantifikasi2021.normalizedDifference(['B5', 'B4']).rename('NDVI');
// nilai Max dan Min NDVI
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
var thermal2016= kuantifikasi2016.select('B10').multiply(1000);
var thermal2017= kuantifikasi2017.select('B10').multiply(1000);
var thermal2018= kuantifikasi2018.select('B10').multiply(1000);
var thermal2019= kuantifikasi2019.select('B10').multiply(1000);
var thermal2020= kuantifikasi2020.select('B10').multiply(1000);
var thermal2021= kuantifikasi2021.select('B10').multiply(1000);
//fractional vegetation
var fv2016 =(ndvi2016.subtract(min2016).divide(max2016.subtract(min2016))).pow(ee.Number(2)).rename('FV');
var fv2017 =(ndvi2017.subtract(min2017).divide(max2017.subtract(min2017))).pow(ee.Number(2)).rename('FV'); 
var fv2018 =(ndvi2018.subtract(min2018).divide(max2018.subtract(min2018))).pow(ee.Number(2)).rename('FV'); 
var fv2019 =(ndvi2019.subtract(min2019).divide(max2019.subtract(min2019))).pow(ee.Number(2)).rename('FV'); 
var fv2020 =(ndvi2020.subtract(min2020).divide(max2020.subtract(min2020))).pow(ee.Number(2)).rename('FV'); 
var fv2021 =(ndvi2021.subtract(min2021).divide(max2021.subtract(min2021))).pow(ee.Number(2)).rename('FV'); 
//Emissivity
var a= ee.Number(0.004);
var b= ee.Number(0.986);
var EM2016=fv2016.multiply(a).add(b).rename('EMM');
var EM2017=fv2017.multiply(a).add(b).rename('EMM');
var EM2018=fv2018.multiply(a).add(b).rename('EMM');
var EM2019=fv2019.multiply(a).add(b).rename('EMM');
var EM2020=fv2020.multiply(a).add(b).rename('EMM');
var EM2021=fv2021.multiply(a).add(b).rename('EMM');
//LST (Celcius)
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
 //Olah Individual Citra
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
//
//widget
// Make left and right maps.
var leftMap = ui.Map();
var rightMap = ui.Map();
// Make predefined data layers that can be selected.
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
// Add default layers to maps.
leftMap.add(Img2016);
rightMap.add(Img2017);
// Link the maps
var linkedMaps = ui.Map.Linker([leftMap, rightMap]);
// Create a SplitPanel which holds the linked maps side-by-side.
var splitPanel = ui.SplitPanel({
  firstPanel: linkedMaps.get(0),
  secondPanel: linkedMaps.get(1),
  orientation: 'horizontal',
  wipe: true,
  style: {stretch: 'both'}
});
// Make a list of image layers to select from.
var layers = ['LST 2016', 'LST 2017', 'LST 2018','LST 2019','LST 2020','LST 2021'];
// Make a function that will retrieve a layer based on selection.
function getLayer(selection) {
  var layer = Img2016;
  if(selection == 'LST 2016') {
    layer = Img2013;
  }else if(selection == 'LST 2017'){
    layer = Img2017;
  }else if(selection == 'LST 2018'){
    layer = Img2018;
  } else if(selection == 'LST 2019'){
    layer = Img2019;
  } else if(selection == 'LST 2020'){
    layer = Img2020;
  } else if(selection == 'LST 2021'){
    layer = Img2020;
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
var selectLeft = ui.Select(layers, 'LST 2016', 'LST 2016', selectLeftOnChange, false, {position: 'top-left'});
var selectRight = ui.Select(layers, 'LST 2021', 'LST 2021', selectRightOnChange, false, {position: 'top-right'});
// Clear the root, add the splitPanel, and buttons.
ui.root.clear();
ui.root.add(splitPanel);
leftMap.add(selectLeft);
rightMap.add(selectRight);
leftMap.centerObject(table, 12);
//LEGENDA
// create vizualization parameters
var viz =  {min: 20, max:45, palette: [
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
                      height:'200px',
                      width: '400px',
                      position: 'bottom-right', 
                      padding: '1px'},
                      layout: ui.Panel.Layout.flow('vertical')})
      //.add(ui.Label('Grafik Karbon Monoksida CO Bulanan:'))
      .add(chart2021).add(chart2020).add(chart2019).add(chart2018).add(chart2017).add(chart2016);
// Menampilkan panel grafik
rightMap.add(panel);