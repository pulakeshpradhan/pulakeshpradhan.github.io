var table = ui.import && ui.import("table", "table", {
      "id": "users/Surabaya/Surabaya"
    }) || ee.FeatureCollection("users/Surabaya/Surabaya"),
    table2 = ui.import && ui.import("table2", "table", {
      "id": "users/Surabaya/Kecamatan_Surabaya_"
    }) || ee.FeatureCollection("users/Surabaya/Kecamatan_Surabaya_"),
    signifikasi = ui.import && ui.import("signifikasi", "table", {
      "id": "users/Surabaya/Signifikasi_SUHI"
    }) || ee.FeatureCollection("users/Surabaya/Signifikasi_SUHI");
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
var vizParamsRGB7 = { bands: ['B3', 'B2', 'B1'], min: 0, max: 3000, };
//(Palette Warna 2)
var vizParamskuantif = {bands: ['B4', 'B3', 'B2'],min: 0,max: 0.3,};
var vizParamskuantif7 = { bands: ['B3', 'B2', 'B1'], min: 0, max: 0.3,};
//Data Citra Landsat
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
var ndvi2013 = kuantifikasi2013.normalizedDifference(['B5', 'B4']).rename('NDVI');
var ndvi2014 = kuantifikasi2014.normalizedDifference(['B5', 'B4']).rename('NDVI');
var ndvi2015 = kuantifikasi2015.normalizedDifference(['B5', 'B4']).rename('NDVI');
var ndvi2016 = kuantifikasi2016.normalizedDifference(['B5', 'B4']).rename('NDVI');
var ndvi2017 = kuantifikasi2017.normalizedDifference(['B5', 'B4']).rename('NDVI');
var ndvi2018 = kuantifikasi2018.normalizedDifference(['B5', 'B4']).rename('NDVI');
var ndvi2019 = kuantifikasi2019.normalizedDifference(['B5', 'B4']).rename('NDVI');
var ndvi2020 = kuantifikasi2020.normalizedDifference(['B5', 'B4']).rename('NDVI');
var ndvi2021 = kuantifikasi2021.normalizedDifference(['B5', 'B4']).rename('NDVI');
// Nilai Max dan Min NDVI
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
var EM2013=fv2013.multiply(a).add(b).rename('EMM');
var EM2014=fv2014.multiply(a).add(b).rename('EMM');
var EM2015=fv2015.multiply(a).add(b).rename('EMM');
var EM2016=fv2016.multiply(a).add(b).rename('EMM');
var EM2017=fv2017.multiply(a).add(b).rename('EMM');
var EM2018=fv2018.multiply(a).add(b).rename('EMM');
var EM2019=fv2019.multiply(a).add(b).rename('EMM');
var EM2020=fv2020.multiply(a).add(b).rename('EMM');
var EM2021=fv2021.multiply(a).add(b).rename('EMM');
// Estimasi LST (Celcius)
var palletLST =({min: 15, max:40, palette: [
'040274', '040281', '0502a3', '0502b8', '0502ce', '0502e6',
'0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef',
'3be285', '3ff38f', '86e26f', '3ae237', 'b5e22e', 'd6e21f',
'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08', 'ff500d',
'ff0000', 'de0101', 'c21301', 'a71001', '911003'
 ]});
var LST2013 = thermal2013.expression(
          '(Tb/(1 + (0.00115* (Tb / 1.438))*log(Ep)))-273.15', {
          'Tb': thermal2013.select('B10'),
          'Ep': EM2013.select('EMM')
          }).rename('LST');
Map.addLayer(LST2013,palletLST,'LST2013');
var LST2014 = thermal2014.expression(
          '(Tb/(1 + (0.00115* (Tb / 1.438))*log(Ep)))-273.15', {
          'Tb': thermal2014.select('B10'),
          'Ep': EM2014.select('EMM')
          }).rename('LST');
Map.addLayer(LST2014,palletLST,'LST2014');
var LST2015 = thermal2015.expression(
          '(Tb/(1 + (0.00115* (Tb / 1.438))*log(Ep)))-273.15', {
          'Tb': thermal2015.select('B10'),
          'Ep': EM2015.select('EMM')
          }).rename('LST');
Map.addLayer(LST2015,palletLST,'LST2015');
var LST2016 = thermal2016.expression(
          '(Tb/(1 + (0.00115* (Tb / 1.438))*log(Ep)))-273.15', {
          'Tb': thermal2016.select('B10'),
          'Ep': EM2016.select('EMM')
          }).rename('LST');
Map.addLayer(LST2016,palletLST,'LST2016');
var LST2017 = thermal2017.expression(
          '(Tb/(1 + (0.00115* (Tb / 1.438))*log(Ep)))-273.15', {
          'Tb': thermal2017.select('B10'),
          'Ep': EM2017.select('EMM')
          }).rename('LST');
Map.addLayer(LST2017,palletLST,'LST2017');
var LST2018 = thermal2018.expression(
          '(Tb/(1 + (0.00115* (Tb / 1.438))*log(Ep)))-273.15', {
          'Tb': thermal2018.select('B10'),
          'Ep': EM2018.select('EMM')
          }).rename('LST');
Map.addLayer(LST2018, palletLST,'LST2018');
var LST2019 = thermal2019.expression(
          '(Tb/(1 + (0.00115* (Tb / 1.438))*log(Ep)))-273.15', {
          'Tb': thermal2019.select('B10'),
          'Ep': EM2019.select('EMM')
          }).rename('LST');
Map.addLayer(LST2019, palletLST,'LST2019');
var LST2020 = thermal2020.expression(
          '(Tb/(1 + (0.00115* (Tb / 1.438))*log(Ep)))-273.15', {
          'Tb': thermal2020.select('B10'),
          'Ep': EM2020.select('EMM')
          }).rename('LST');
Map.addLayer(LST2020,palletLST,'LST2020');
var LST2021 = thermal2021.expression(
          '(Tb/(1 + (0.00115* (Tb / 1.438))*log(Ep)))-273.15', {
          'Tb': thermal2021.select('B10'),
          'Ep': EM2021.select('EMM')
          }).rename('LST');
Map.addLayer(LST2021, palletLST,'LST2021');
// Membuat Grafik Tahunan
//Gabung LST 2013-2014
var LSTSURABAYA =(LST2013.rename('2013')).addBands(LST2014.rename('2014')).addBands(LST2015.rename('2015')).addBands(LST2016.rename('2016'))
.addBands(LST2017.rename('2017')).addBands(LST2018.rename('2018')).addBands(LST2019.rename('2019')).addBands(LST2020.rename('2020')).addBands(LST2021.rename('2021'))
print('LST', LSTSURABAYA );
//Membuat Grafik Max,Mean,Min LST Tahunan
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
//2013
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
//2014
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
//2015
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
//2016
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
//2017
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
//2018
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
//2019
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
//2020
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
//2021
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
var SUHI2013 = LST2013.subtract((meanLST2013).add((c).multiply(STDLST2013)));
var SUHI2014 = LST2014.subtract((meanLST2014).add((c).multiply(STDLST2014)));
var SUHI2015 = LST2015.subtract((meanLST2015).add((c).multiply(STDLST2015)));
var SUHI2016 = LST2016.subtract((meanLST2016).add((c).multiply(STDLST2016)));
var SUHI2017 = LST2017.subtract((meanLST2017).add((c).multiply(STDLST2017)));
var SUHI2018 = LST2018.subtract((meanLST2018).add((c).multiply(STDLST2018)));
var SUHI2019 = LST2019.subtract((meanLST2019).add((c).multiply(STDLST2019)));
var SUHI2020 = LST2020.subtract((meanLST2020).add((c).multiply(STDLST2020)));
var SUHI2021 = LST2021.subtract((meanLST2021).add((c).multiply(STDLST2021)));
// Create Max LST 
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
//Estimasi SUHI metode Ambang Batas ( Threshold )
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
  var SUHISBY=(threshold2013.rename('2013'))
  .addBands(threshold2014.rename('2014')).addBands(threshold2015.rename('2015')).addBands(threshold2016.rename('2016'))
  .addBands(threshold2017.rename('2017')).addBands(threshold2018.rename('2018')).addBands(threshold2019.rename('2019'))
  .addBands(threshold2020.rename('2020')).addBands(threshold2021.rename('2021'));
  var AM = (AM2013.rename('2013'))
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
//SIGNIFIKASI SUHI
var SH = ee.FeatureCollection(signifikasi);
var styling2 = {color: 'red', fillColor: 'red'};
Map.centerObject(table, 12.2);
Map.addLayer(SH.style(styling2), {}, 'Signifikasi SUHI');
//Memunculkan Batas Administrasi
ee.FeatureCollection(table2); //Styling Shapefile in Google Earth Engine
var adm = ee.Image().byte().paint({
  featureCollection: table2,
  color: 1,
  width: 2,
});
Map.addLayer(adm, {palette: '000000'}, 'Batas Administrasi'); // Display the county boundaries.
//Pembuatan widget untuk WEBGIS MAP
// Split Screen 
var leftMap = ui.Map();
var rightMap = ui.Map();
// Membuat Pallet Visualisasi Widget
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
//Pallet Visualisasi Widget SUHI
var UHI2013 = ui.Map.Layer(threshold2013,{palette:['red']},'SUHI2021');
var UHI2014 = ui.Map.Layer(threshold2014,{palette:['red']},'SUHI2021');
var UHI2015 = ui.Map.Layer(threshold2015,{palette:['red']},'SUHI2021');
var UHI2016 = ui.Map.Layer(threshold2016,{palette:['red']},'SUHI2021');
var UHI2017 = ui.Map.Layer(threshold2017,{palette:['red']},'SUHI2021');
var UHI2018 = ui.Map.Layer(threshold2018,{palette:['red']},'SUHI2021');
var UHI2019 = ui.Map.Layer(threshold2019,{palette:['red']},'SUHI2021');
var UHI2020 = ui.Map.Layer(threshold2020,{palette:['red']},'SUHI2021');
var UHI2021 = ui.Map.Layer(threshold2021,{palette:['red']},'SUHI2021');
var SIGNIUHI = ui.Map.Layer(SH.style(styling2), {}, 'Signifikasi SUHI')
var batas = ui.Map.Layer(adm, {palette: '000000'}, 'Batas Administrasi');
//Add default layers to maps.
leftMap.add(UHI2013);
rightMap.add(UHI2021);
//Linked By Split Screen
var linkedMaps = ui.Map.Linker([leftMap , rightMap]);
//Create a SplitPanel which holds the linked maps side-by-side.
var splitPanel = ui.SplitPanel({
  firstPanel: linkedMaps.get(0),
  secondPanel: linkedMaps.get(1),
  orientation: 'horizontal',
  wipe: true,
  style: {stretch: 'both'}
});
// Make a list of image layers to select from.
var layers = ['LST 2013','LST 2014','LST 2015','LST 2016', 'LST 2017', 'LST 2018','LST 2019','LST 2020','LST 2021',
'SUHI2013','SUHI2014','SUHI2015','SUHI2016','SUHI2017','SUHI2018','SUHI2019','SUHI2020','SUHI2021','Signifikasi SUHI', 'Batas Administrasi'];
// Make a function that will retrieve a layer based on selection.
function getLayer(selection) {
  var layer = Img2013;
  if(selection == 'LST 2013') {
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
  } else if(selection == 'LST2021'){
    layer = Img2021;
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
  } else if(selection == 'Signifikasi SUHI'){
    layer = SIGNIUHI;
  } else if (selection == 'Batas Administrasi'){
    layer = batas;
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
var selectLeft = ui.Select(layers, 'SUHI2013', 'SUHI2013', selectLeftOnChange, false, {position: 'top-left'});
var selectRight = ui.Select(layers, 'SUHI2021', 'SUHI2021', selectRightOnChange, false, {position: 'top-right'});
// Clear the root, add the splitPanel, and buttons.
ui.root.clear();
ui.root.add(splitPanel);
leftMap.add(selectLeft);
rightMap.add(selectRight);
leftMap.centerObject(table, 12.5);
rightMap.centerObject(table, 12.5);
//LEGENDA
rightMap.add(ui.Label(
    'Monitoring LST & SUHI Kota Surabaya Tahun 2013-2021', {fontWeight: 'bold', fontSize: '24px'}));
leftMap.add(ui.Label(
    'Monitoring LST & SUHI Kota Surabaya Tahun 2013-2021', {fontWeight: 'bold', fontSize: '24px'}));
rightMap.add(ui.Label(
    'Juma Maulana - 03311840000064', {fontWeight: 'bold', fontSize: '13px', position: 'bottom-right',}));
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
//Lagenda SUHI
var legend1 = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
var legend2 = ui.Label({
  value: 'Keterangan',
  style: {
    fontWeight: 'bold',
    fontSize: '15px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
legend1.add(legend2);
leftMap.add(legend1)
// Creates the content of the legend
var content = function(color, label) {
      // Create the color boxes
      var box = ui.Label({
        style: {
          backgroundColor: '#' + color,
          // Set box height and width
          padding: '9px',
          margin: '0 0 4px 0'
        }
      });
      // Create the labels
      var labels = ui.Label({
        value: label,
        style: {margin: '0 0 4px 6px'}
      });
      return ui.Panel({
        widgets: [box, labels],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
var classcolor = ['ff4700'];
var labelName = ['SUHI'];
// Combine legend colou and labels
for (var i = 0; i < 1; i++) {
  legend1.add(content(classcolor[i], labelName[i]));
  }  
//
var panel = ui.Panel({style:{
                      height:'800px',
                      width: '370px',
                      position: 'bottom-right', 
                      padding: '3px'},
                      layout: ui.Panel.Layout.flow('vertical')})
      //.add(ui.Label('Grafik LST Tahunan :'))
      .add(chartmax).add(chartmean).add(chartmin).add(chart1).add(chartsuhi).add(chartam).add(chart2021).add(chart2020).add(chart2019).add(chart2018).add(chart2017).add(chart2016)
      .add(chart2015).add(chart2014).add(chart2013)
ui.root.widgets().add(panel);