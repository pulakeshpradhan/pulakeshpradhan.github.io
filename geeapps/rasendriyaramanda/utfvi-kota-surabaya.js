var SBY2020 = ui.import && ui.import("SBY2020", "table", {
      "id": "users/rasendriyaramanda/BOUNDERY_SBY/SBY_2020_FIX_2"
    }) || ee.FeatureCollection("users/rasendriyaramanda/BOUNDERY_SBY/SBY_2020_FIX_2"),
    SBY2011 = ui.import && ui.import("SBY2011", "table", {
      "id": "users/rasendriyaramanda/BOUNDERY_SBY/SBY_2011_FIX"
    }) || ee.FeatureCollection("users/rasendriyaramanda/BOUNDERY_SBY/SBY_2011_FIX"),
    SBY2012 = ui.import && ui.import("SBY2012", "table", {
      "id": "users/rasendriyaramanda/BOUNDERY_SBY/SBY_2012_FIX"
    }) || ee.FeatureCollection("users/rasendriyaramanda/BOUNDERY_SBY/SBY_2012_FIX"),
    SBY2013 = ui.import && ui.import("SBY2013", "table", {
      "id": "users/rasendriyaramanda/BOUNDERY_SBY/SBY_2013_FIX"
    }) || ee.FeatureCollection("users/rasendriyaramanda/BOUNDERY_SBY/SBY_2013_FIX"),
    SBY2014 = ui.import && ui.import("SBY2014", "table", {
      "id": "users/rasendriyaramanda/BOUNDERY_SBY/SBY_2014_FIX"
    }) || ee.FeatureCollection("users/rasendriyaramanda/BOUNDERY_SBY/SBY_2014_FIX"),
    SBY2015 = ui.import && ui.import("SBY2015", "table", {
      "id": "users/rasendriyaramanda/BOUNDERY_SBY/SBY_2015_FIX_MERGE_FIX_BGT_MERGE"
    }) || ee.FeatureCollection("users/rasendriyaramanda/BOUNDERY_SBY/SBY_2015_FIX_MERGE_FIX_BGT_MERGE"),
    SBY2016 = ui.import && ui.import("SBY2016", "table", {
      "id": "users/rasendriyaramanda/BOUNDERY_SBY/SBY_2016_FIX"
    }) || ee.FeatureCollection("users/rasendriyaramanda/BOUNDERY_SBY/SBY_2016_FIX"),
    SBY2017 = ui.import && ui.import("SBY2017", "table", {
      "id": "users/rasendriyaramanda/BOUNDERY_SBY/SBY_2017_FIX"
    }) || ee.FeatureCollection("users/rasendriyaramanda/BOUNDERY_SBY/SBY_2017_FIX"),
    SBY2018 = ui.import && ui.import("SBY2018", "table", {
      "id": "users/rasendriyaramanda/BOUNDERY_SBY/SBY_2018_FIX_2"
    }) || ee.FeatureCollection("users/rasendriyaramanda/BOUNDERY_SBY/SBY_2018_FIX_2"),
    SBY2019 = ui.import && ui.import("SBY2019", "table", {
      "id": "users/rasendriyaramanda/BOUNDERY_SBY/SBY_2019_FIX_2"
    }) || ee.FeatureCollection("users/rasendriyaramanda/BOUNDERY_SBY/SBY_2019_FIX_2");
//==========================================================================================
//Tugas Akhir Rasendriya Ramanda Darettamarlan (03311740000087)
//Judul : Prediksi Kebutuhan Ruang Terbuka Hijau Untuk Mengurangi Efek Urban Heat Island (UHI) di Kota Surabaya Pada Tahun 2021 – 2025
//Urban Thermal Field Variance Index (UTFVI) Untuk Penghitungan Urban Heat Island (UHI)
//==========================================================================================
//Membuat masking awan
function maskL8sr(col) {
  // Bits 3 and 5 are cloud shadow and cloud, respectively.
  var cloudShadowBitMask = (1 << 3);
  var cloudsBitMask = (1 << 5);
  // Get the pixel QA band.
  var qa = col.select('pixel_qa');
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
                 .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
  return col.updateMask(mask);
}
//==========================================================================================
//Palatte 
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
var ndviParams = {min: -1, max: 1, palette: ['blue', 'white', 
'green']};
var b10Params = {min: 291.918, max: 302.382, palette: ['blue', 
'white', 'green']};
var imageVisParam_EMM = {min: 0.9865619146722164, max:0.989699971371314};
var palette_warna = ['040274', '040281', '0502a3', '0502b8', '0502ce', '0502e6',
'0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef',
'3be285', '3ff38f', '86e26f', '3ae237', 'b5e22e', 'd6e21f',
'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08', 'ff500d',
'ff0000', 'de0101', 'c21301', 'a71001', '911003'];
var palette_warna2 = ['40b440','86e26f', '3ae237', 'b5e22e', 'd6e21f',
'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08', 'ff500d',
'ff0000', 'de0101', 'c21301', 'a71001', '911003'];
//========================================================================================== 
//Tahun 2013
// Tentukan lokasi dan tingkat zoom
Map.centerObject(SBY2013,12);
//-------------------------------------------------------------------------------------------
//Menampilkan koleksi citra
{
var collection_2013 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
.map(maskL8sr)
.filterDate('2013-09-14','2013-09-15')
.filterBounds(SBY2013);
}
//print(collection_2013, 'Citra 2013');
//Reduksi citra, untuk mengurangi awan
{
var image2013 = collection_2013.median().clip(SBY2013);
//print(image2013, 'image');
Map.addLayer(image2013, vizParams2,'Citra Asli 2013');
}
//atau menampilkan citra tanpa reduksi -> suhu lebih rendah (pilih salah satu)
//var imag2013e = ee.Image('LANDSAT/LC08/C01/T1_SR/LC08_118065_20130914')
//-------------------------------------------------------------------------------------------
//Menghitung NDVI
{
var ndvi2013 = image2013.normalizedDifference(['B5', 
'B4']).rename('NDVI2013');
//print(ndvi2013,'NDVI 2013');
Map.addLayer(ndvi2013, ndviParams, 'NDVI 2013');
}
// Nilai minimum dan maksimum NDVI
{
var min_ndvi2013 = ee.Number(ndvi2013.reduceRegion({
reducer: ee.Reducer.min(),
geometry: SBY2013,
scale: 30,
bestEffort:true
}).values().get(0));
print('Nilai Minimum NDVI 2013', min_ndvi2013);
var max_ndvi2013 = ee.Number(ndvi2013.reduceRegion({
reducer: ee.Reducer.max(),
geometry: SBY2013,
scale: 30,
bestEffort:true
}).values().get(0));
print('Nilai Maksimum NDVI 2013', max_ndvi2013);
}
//-------------------------------------------------------------------------------------------
//Memilih Band 10 dengan brightness tempereature, tanpa penghitungan suhu
var thermal2013= image2013.select('B10').multiply(0.1);
//Map.addLayer(thermal2013, b10Params, 'BT 2013');
//-------------------------------------------------------------------------------------------
//Menghitung nilai fractional vegetation
{
var fv2013 =(ndvi2013.subtract(min_ndvi2013).divide(max_ndvi2013.subtract(min_ndvi2013))).pow(ee.Number(2)).rename('FV'); 
//print(fv, 'fv');
//Map.addLayer(fv);
}
//-------------------------------------------------------------------------------------------
//Menghitung nilai emisivitas
var a= ee.Number(0.004);
var b= ee.Number(0.986);
var EM2013=fv2013.multiply(a).add(b).rename('EMM2013');
//Map.addLayer(EM, imageVisParam_EMM,'Emissivitas 2013');
//-------------------------------------------------------------------------------------------
//Menghitung LST
//LST pada Celcius gunakan -273.15
//LST pada Kelvin jangan gunakan -273.15
var LST2013 = thermal2013.expression(
'(Tb/(1 + (0.00115* (Tb / 1.438))*log(Ep)))-273.15', {
 'Tb': thermal2013.select('B10'),
'Ep': EM2013.select('EMM2013')
}).rename('LST2013');
Map.addLayer(LST2013, {min: 25, max:40, palette: palette_warna},'LST 2013');
// Nilai minimum dan maksimum LST
{
var min_lst2013 = ee.Number(LST2013.reduceRegion({
reducer: ee.Reducer.min(),
geometry: SBY2013,
scale: 30,
bestEffort:true
}).values().get(0));
print('Nilai Minimum LST 2013', min_lst2013);
var max_lst2013 = ee.Number(LST2013.reduceRegion({
reducer: ee.Reducer.max(),
geometry: SBY2013,
scale: 30,
bestEffort:true
}).values().get(0));
print('Nilai Maksimum LST 2013', max_lst2013);
}
//-------------------------------------------------------------------------------------------
//Rata-rata suhu pada citra
var mean_lst2013 = LST2013.clip(SBY2013)
  .reduceRegion({
    reducer: ee.Reducer.mean().unweighted(),
    geometry: SBY2013,
    scale: 30,
  bestEffort:true
  })
  .get('LST2013');
print('Rata-Rata Suhu 2013', mean_lst2013);
//Mengubah rata-rata suhu menjadi variabel angka
var angka_mean2013 = ee.Number(mean_lst2013);
//print('testing 2013', angka_mean);
//-------------------------------------------------------------------------------------------
//Urban Heat Island
var UHI2013 = ((LST2013.subtract(angka_mean2013)).divide(angka_mean2013)).rename('UHI2013');
Map.addLayer(UHI2013, {min: 0, max:0.02, palette: palette_warna2},'UHI 2013');
// Nilai minimum dan maksimum UHI
{
var min_uhi2013 = ee.Number(UHI2013.reduceRegion({
reducer: ee.Reducer.min(),
geometry: SBY2013,
scale: 30,
bestEffort:true
}).values().get(0));
print('Nilai Minimum UHI 2013', min_uhi2013);
var max_uhi2013 = ee.Number(UHI2013.reduceRegion({
reducer: ee.Reducer.max(),
geometry: SBY2013,
scale: 30,
bestEffort:true
}).values().get(0));
print('Nilai Maksimum UHI 2013', max_uhi2013);
}
//========================================================================================== 
//Tahun 2014
//-------------------------------------------------------------------------------------------
//Menampilkan koleksi citra
{
var collection_2014 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
.map(maskL8sr)
.filterDate('2014-09-17','2014-09-18')
.filterBounds(SBY2014);
}
//print(collection_2014, 'Citra 2014');
//Reduksi citra, untuk mengurangi awan
{
var image2014 = collection_2014.median().clip(SBY2014);
//print(image2014, 'image');
Map.addLayer(image2014, vizParams2,'Citra Asli 2014');
}
//atau menampilkan citra tanpa reduksi -> suhu lebih rendah (pilih salah satu)
//var imag2014e = ee.Image('LANDSAT/LC08/C01/T1_SR/LC08_118065_20140917')
//-------------------------------------------------------------------------------------------
//Menghitung NDVI
{
var ndvi2014 = image2014.normalizedDifference(['B5', 
'B4']).rename('NDVI2014');
//print(ndvi2014,'NDVI 2014');
Map.addLayer(ndvi2014, ndviParams, 'NDVI 2014');
}
// Nilai minimum dan maksimum NDVI
{
var min_ndvi2014 = ee.Number(ndvi2014.reduceRegion({
reducer: ee.Reducer.min(),
geometry: SBY2014,
scale: 30,
bestEffort:true
}).values().get(0));
print('Nilai Minimum NDVI 2014', min_ndvi2014);
var max_ndvi2014 = ee.Number(ndvi2014.reduceRegion({
reducer: ee.Reducer.max(),
geometry: SBY2014,
scale: 30,
bestEffort:true
}).values().get(0));
print('Nilai Maksimum NDVI 2014', max_ndvi2014);
}
//-------------------------------------------------------------------------------------------
//Memilih Band 10 dengan brightness tempereature, tanpa penghitungan suhu
var thermal2014= image2014.select('B10').multiply(0.1);
//Map.addLayer(thermal2014, b10Params, 'BT 2014');
//-------------------------------------------------------------------------------------------
//Menghitung nilai fractional vegetation
{
var fv2014 =(ndvi2014.subtract(min_ndvi2014).divide(max_ndvi2014.subtract(min_ndvi2014))).pow(ee.Number(2)).rename('FV'); 
//print(fv, 'fv');
//Map.addLayer(fv);
}
//-------------------------------------------------------------------------------------------
//Menghitung nilai emisivitas
var a= ee.Number(0.004);
var b= ee.Number(0.986);
var EM2014=fv2014.multiply(a).add(b).rename('EMM2014');
//Map.addLayer(EM, imageVisParam_EMM,'Emissivitas 2014');
//-------------------------------------------------------------------------------------------
//Menghitung LST
//LST pada Celcius gunakan -273.15
//LST pada Kelvin jangan gunakan -273.15
var LST2014 = thermal2014.expression(
'(Tb/(1 + (0.00115* (Tb / 1.438))*log(Ep)))-273.15', {
 'Tb': thermal2014.select('B10'),
'Ep': EM2014.select('EMM2014')
}).rename('LST2014');
Map.addLayer(LST2014, {min: 25, max:40, palette: palette_warna},'LST 2014');
// Nilai minimum dan maksimum LST
{
var min_lst2014 = ee.Number(LST2014.reduceRegion({
reducer: ee.Reducer.min(),
geometry: SBY2014,
scale: 30,
bestEffort:true
}).values().get(0));
print('Nilai Minimum LST 2014', min_lst2014);
var max_lst2014 = ee.Number(LST2014.reduceRegion({
reducer: ee.Reducer.max(),
geometry: SBY2014,
scale: 30,
bestEffort:true
}).values().get(0));
print('Nilai Maksimum LST 2014', max_lst2014);
}
//-------------------------------------------------------------------------------------------
//Rata-rata suhu pada citra
var mean_lst2014 = LST2014.clip(SBY2014)
  .reduceRegion({
    reducer: ee.Reducer.mean().unweighted(),
    geometry: SBY2014,
    scale: 30,
  bestEffort:true
  })
  .get('LST2014');
print('Rata-Rata Suhu 2014', mean_lst2014);
//Mengubah rata-rata suhu menjadi variabel angka
var angka_mean2014 = ee.Number(mean_lst2014);
//print('testing 2014', angka_mean);
//-------------------------------------------------------------------------------------------
//Urban Heat Island
var UHI2014 = ((LST2014.subtract(angka_mean2014)).divide(angka_mean2014)).rename('UHI2014');
Map.addLayer(UHI2014, {min: 0, max:0.02, palette: palette_warna2},'UHI 2014');
// Nilai minimum dan maksimum UHI
{
var min_uhi2014 = ee.Number(UHI2014.reduceRegion({
reducer: ee.Reducer.min(),
geometry: SBY2014,
scale: 30,
bestEffort:true
}).values().get(0));
print('Nilai Minimum UHI 2014', min_uhi2014);
var max_uhi2014 = ee.Number(UHI2014.reduceRegion({
reducer: ee.Reducer.max(),
geometry: SBY2014,
scale: 30,
bestEffort:true
}).values().get(0));
print('Nilai Maksimum UHI 2014', max_uhi2014);
}
//========================================================================================== 
//Tahun 2015
//-------------------------------------------------------------------------------------------
//Menampilkan koleksi citra
{
var collection_2015 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
.map(maskL8sr)
.filterDate('2015-06-16','2015-06-17')
.filterBounds(SBY2015);
}
//print(collection_2015, 'Citra 2015');
//Reduksi citra, untuk mengurangi awan
{
var image2015 = collection_2015.median().clip(SBY2015);
//print(image2015, 'image');
Map.addLayer(image2015, vizParams2,'Citra Asli 2015');
}
//atau menampilkan citra tanpa reduksi -> suhu lebih rendah (pilih salah satu)
//var imag2015e = ee.Image('LANDSAT/LC08/C01/T1_SR/LC08_118065_20150616')
//-------------------------------------------------------------------------------------------
//Menghitung NDVI
{
var ndvi2015 = image2015.normalizedDifference(['B5', 
'B4']).rename('NDVI2015');
//print(ndvi2015,'NDVI 2015');
Map.addLayer(ndvi2015, ndviParams, 'NDVI 2015');
}
// Nilai minimum dan maksimum NDVI
{
var min_ndvi2015 = ee.Number(ndvi2015.reduceRegion({
reducer: ee.Reducer.min(),
geometry: SBY2015,
scale: 30,
bestEffort:true
}).values().get(0));
print('Nilai Minimum NDVI 2015', min_ndvi2015);
var max_ndvi2015 = ee.Number(ndvi2015.reduceRegion({
reducer: ee.Reducer.max(),
geometry: SBY2015,
scale: 30,
bestEffort:true
}).values().get(0));
print('Nilai Maksimum NDVI 2015', max_ndvi2015);
}
//-------------------------------------------------------------------------------------------
//Memilih Band 10 dengan brightness tempereature, tanpa penghitungan suhu
var thermal2015= image2015.select('B10').multiply(0.1);
//Map.addLayer(thermal2015, b10Params, 'BT 2015');
//-------------------------------------------------------------------------------------------
//Menghitung nilai fractional vegetation
{
var fv2015 =(ndvi2015.subtract(min_ndvi2015).divide(max_ndvi2015.subtract(min_ndvi2015))).pow(ee.Number(2)).rename('FV'); 
//print(fv, 'fv');
//Map.addLayer(fv);
}
//-------------------------------------------------------------------------------------------
//Menghitung nilai emisivitas
var a= ee.Number(0.004);
var b= ee.Number(0.986);
var EM2015=fv2015.multiply(a).add(b).rename('EMM2015');
//Map.addLayer(EM, imageVisParam_EMM,'Emissivitas 2015');
//-------------------------------------------------------------------------------------------
//Menghitung LST
//LST pada Celcius gunakan -273.15
//LST pada Kelvin jangan gunakan -273.15
var LST2015 = thermal2015.expression(
'(Tb/(1 + (0.00115* (Tb / 1.438))*log(Ep)))-273.15', {
 'Tb': thermal2015.select('B10'),
'Ep': EM2015.select('EMM2015')
}).rename('LST2015');
Map.addLayer(LST2015, {min: 25, max:40, palette: palette_warna},'LST 2015');
// Nilai minimum dan maksimum LST
{
var min_lst2015 = ee.Number(LST2015.reduceRegion({
reducer: ee.Reducer.min(),
geometry: SBY2015,
scale: 30,
bestEffort:true
}).values().get(0));
print('Nilai Minimum LST 2015', min_lst2015);
var max_lst2015 = ee.Number(LST2015.reduceRegion({
reducer: ee.Reducer.max(),
geometry: SBY2015,
scale: 30,
bestEffort:true
}).values().get(0));
print('Nilai Maksimum LST 2015', max_lst2015);
}
//-------------------------------------------------------------------------------------------
//Rata-rata suhu pada citra
var mean_lst2015 = LST2015.clip(SBY2015)
  .reduceRegion({
    reducer: ee.Reducer.mean().unweighted(),
    geometry: SBY2015,
    scale: 30,
  bestEffort:true
  })
  .get('LST2015');
print('Rata-Rata Suhu 2015', mean_lst2015);
//Mengubah rata-rata suhu menjadi variabel angka
var angka_mean2015 = ee.Number(mean_lst2015);
//print('testing 2015', angka_mean);
//-------------------------------------------------------------------------------------------
//Urban Heat Island
var UHI2015 = ((LST2015.subtract(angka_mean2015)).divide(angka_mean2015)).rename('UHI2015');
Map.addLayer(UHI2015, {min: 0, max:0.02, palette: palette_warna2},'UHI 2015');
// Nilai minimum dan maksimum UHI
{
var min_uhi2015 = ee.Number(UHI2015.reduceRegion({
reducer: ee.Reducer.min(),
geometry: SBY2015,
scale: 30,
bestEffort:true
}).values().get(0));
print('Nilai Minimum UHI 2015', min_uhi2015);
var max_uhi2015 = ee.Number(UHI2015.reduceRegion({
reducer: ee.Reducer.max(),
geometry: SBY2015,
scale: 30,
bestEffort:true
}).values().get(0));
print('Nilai Maksimum UHI 2015', max_uhi2015);
}
//========================================================================================== 
//Tahun 2016
//-------------------------------------------------------------------------------------------
//Menampilkan koleksi citra
{
var collection_2016 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
.map(maskL8sr)
.filterDate('2016-08-21','2016-08-22')
.filterBounds(SBY2016);
}
//print(collection_2016, 'Citra 2016');
//Reduksi citra, untuk mengurangi awan
{
var image2016 = collection_2016.median().clip(SBY2016);
//print(image2016, 'image');
Map.addLayer(image2016, vizParams2,'Citra Asli 2016');
}
//atau menampilkan citra tanpa reduksi -> suhu lebih rendah (pilih salah satu)
//var imag2016e = ee.Image('LANDSAT/LC08/C01/T1_SR/LC08_118065_20160821')
//-------------------------------------------------------------------------------------------
//Menghitung NDVI
{
var ndvi2016 = image2016.normalizedDifference(['B5', 
'B4']).rename('NDVI2016');
//print(ndvi2016,'NDVI 2016');
Map.addLayer(ndvi2016, ndviParams, 'NDVI 2016');
}
// Nilai minimum dan maksimum NDVI
{
var min_ndvi2016 = ee.Number(ndvi2016.reduceRegion({
reducer: ee.Reducer.min(),
geometry: SBY2016,
scale: 30,
bestEffort:true
}).values().get(0));
print('Nilai Minimum NDVI 2016', min_ndvi2016);
var max_ndvi2016 = ee.Number(ndvi2016.reduceRegion({
reducer: ee.Reducer.max(),
geometry: SBY2016,
scale: 30,
bestEffort:true
}).values().get(0));
print('Nilai Maksimum NDVI 2016', max_ndvi2016);
}
//-------------------------------------------------------------------------------------------
//Memilih Band 10 dengan brightness tempereature, tanpa penghitungan suhu
var thermal2016= image2016.select('B10').multiply(0.1);
//Map.addLayer(thermal2016, b10Params, 'BT 2016');
//-------------------------------------------------------------------------------------------
//Menghitung nilai fractional vegetation
{
var fv2016 =(ndvi2016.subtract(min_ndvi2016).divide(max_ndvi2016.subtract(min_ndvi2016))).pow(ee.Number(2)).rename('FV'); 
//print(fv, 'fv');
//Map.addLayer(fv);
}
//-------------------------------------------------------------------------------------------
//Menghitung nilai emisivitas
var a= ee.Number(0.004);
var b= ee.Number(0.986);
var EM2016=fv2016.multiply(a).add(b).rename('EMM2016');
//Map.addLayer(EM, imageVisParam_EMM,'Emissivitas 2016');
//-------------------------------------------------------------------------------------------
//Menghitung LST
//LST pada Celcius gunakan -273.15
//LST pada Kelvin jangan gunakan -273.15
var LST2016 = thermal2016.expression(
'(Tb/(1 + (0.00115* (Tb / 1.438))*log(Ep)))-273.15', {
 'Tb': thermal2016.select('B10'),
'Ep': EM2016.select('EMM2016')
}).rename('LST2016');
Map.addLayer(LST2016, {min: 25, max:40, palette: palette_warna},'LST 2016');
// Nilai minimum dan maksimum LST
{
var min_lst2016 = ee.Number(LST2016.reduceRegion({
reducer: ee.Reducer.min(),
geometry: SBY2016,
scale: 30,
bestEffort:true
}).values().get(0));
print('Nilai Minimum LST 2016', min_lst2016);
var max_lst2016 = ee.Number(LST2016.reduceRegion({
reducer: ee.Reducer.max(),
geometry: SBY2016,
scale: 30,
bestEffort:true
}).values().get(0));
print('Nilai Maksimum LST 2016', max_lst2016);
}
//-------------------------------------------------------------------------------------------
//Rata-rata suhu pada citra
var mean_lst2016 = LST2016.clip(SBY2016)
  .reduceRegion({
    reducer: ee.Reducer.mean().unweighted(),
    geometry: SBY2016,
    scale: 30,
  bestEffort:true
  })
  .get('LST2016');
print('Rata-Rata Suhu 2016', mean_lst2016);
//Mengubah rata-rata suhu menjadi variabel angka
var angka_mean2016 = ee.Number(mean_lst2016);
//print('testing 2016', angka_mean);
//-------------------------------------------------------------------------------------------
//Urban Heat Island
var UHI2016 = ((LST2016.subtract(angka_mean2016)).divide(angka_mean2016)).rename('UHI2016');
Map.addLayer(UHI2016, {min: 0, max:0.02, palette: palette_warna2},'UHI 2016');
// Nilai minimum dan maksimum UHI
{
var min_uhi2016 = ee.Number(UHI2016.reduceRegion({
reducer: ee.Reducer.min(),
geometry: SBY2016,
scale: 30,
bestEffort:true
}).values().get(0));
print('Nilai Minimum UHI 2016', min_uhi2016);
var max_uhi2016 = ee.Number(UHI2016.reduceRegion({
reducer: ee.Reducer.max(),
geometry: SBY2016,
scale: 30,
bestEffort:true
}).values().get(0));
print('Nilai Maksimum UHI 2016', max_uhi2016);
}
//========================================================================================== 
//Tahun 2017
//-------------------------------------------------------------------------------------------
//Menampilkan koleksi citra
{
var collection_2017 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
.map(maskL8sr)
.filterDate('2017-09-09','2017-09-10')
.filterBounds(SBY2017);
}
//print(collection_2017, 'Citra 2017');
//Reduksi citra, untuk mengurangi awan
{
var image2017 = collection_2017.median().clip(SBY2017);
//print(image2017, 'image');
Map.addLayer(image2017, vizParams2,'Citra Asli 2017');
}
//atau menampilkan citra tanpa reduksi -> suhu lebih rendah (pilih salah satu)
//var imag2017e = ee.Image('LANDSAT/LC08/C01/T1_SR/LC08_118065_20170909')
//-------------------------------------------------------------------------------------------
//Menghitung NDVI
{
var ndvi2017 = image2017.normalizedDifference(['B5', 
'B4']).rename('NDVI2017');
//print(ndvi2017,'NDVI 2017');
Map.addLayer(ndvi2017, ndviParams, 'NDVI 2017');
}
// Nilai minimum dan maksimum NDVI
{
var min_ndvi2017 = ee.Number(ndvi2017.reduceRegion({
reducer: ee.Reducer.min(),
geometry: SBY2017,
scale: 30,
bestEffort:true
}).values().get(0));
print('Nilai Minimum NDVI 2017', min_ndvi2017);
var max_ndvi2017 = ee.Number(ndvi2017.reduceRegion({
reducer: ee.Reducer.max(),
geometry: SBY2017,
scale: 30,
bestEffort:true
}).values().get(0));
print('Nilai Maksimum NDVI 2017', max_ndvi2017);
}
//-------------------------------------------------------------------------------------------
//Memilih Band 10 dengan brightness tempereature, tanpa penghitungan suhu
var thermal2017= image2017.select('B10').multiply(0.1);
//Map.addLayer(thermal2017, b10Params, 'BT 2017');
//-------------------------------------------------------------------------------------------
//Menghitung nilai fractional vegetation
{
var fv2017 =(ndvi2017.subtract(min_ndvi2017).divide(max_ndvi2017.subtract(min_ndvi2017))).pow(ee.Number(2)).rename('FV'); 
//print(fv, 'fv');
//Map.addLayer(fv);
}
//-------------------------------------------------------------------------------------------
//Menghitung nilai emisivitas
var a= ee.Number(0.004);
var b= ee.Number(0.986);
var EM2017=fv2017.multiply(a).add(b).rename('EMM2017');
//Map.addLayer(EM, imageVisParam_EMM,'Emissivitas 2017');
//-------------------------------------------------------------------------------------------
//Menghitung LST
//LST pada Celcius gunakan -273.15
//LST pada Kelvin jangan gunakan -273.15
var LST2017 = thermal2017.expression(
'(Tb/(1 + (0.00115* (Tb / 1.438))*log(Ep)))-273.15', {
 'Tb': thermal2017.select('B10'),
'Ep': EM2017.select('EMM2017')
}).rename('LST2017');
Map.addLayer(LST2017, {min: 25, max:40, palette: palette_warna},'LST 2017');
// Nilai minimum dan maksimum LST
{
var min_lst2017 = ee.Number(LST2017.reduceRegion({
reducer: ee.Reducer.min(),
geometry: SBY2017,
scale: 30,
bestEffort:true
}).values().get(0));
print('Nilai Minimum LST 2017', min_lst2017);
var max_lst2017 = ee.Number(LST2017.reduceRegion({
reducer: ee.Reducer.max(),
geometry: SBY2017,
scale: 30,
bestEffort:true
}).values().get(0));
print('Nilai Maksimum LST 2017', max_lst2017);
}
//-------------------------------------------------------------------------------------------
//Rata-rata suhu pada citra
var mean_lst2017 = LST2017.clip(SBY2017)
  .reduceRegion({
    reducer: ee.Reducer.mean().unweighted(),
    geometry: SBY2017,
    scale: 30,
  bestEffort:true
  })
  .get('LST2017');
print('Rata-Rata Suhu 2017', mean_lst2017);
//Mengubah rata-rata suhu menjadi variabel angka
var angka_mean2017 = ee.Number(mean_lst2017);
//print('testing 2017', angka_mean);
//-------------------------------------------------------------------------------------------
//Urban Heat Island
var UHI2017 = ((LST2017.subtract(angka_mean2017)).divide(angka_mean2017)).rename('UHI2017');
Map.addLayer(UHI2017, {min: 0, max:0.02, palette: palette_warna2},'UHI 2017');
// Nilai minimum dan maksimum UHI
{
var min_uhi2017 = ee.Number(UHI2017.reduceRegion({
reducer: ee.Reducer.min(),
geometry: SBY2017,
scale: 30,
bestEffort:true
}).values().get(0));
print('Nilai Minimum UHI 2017', min_uhi2017);
var max_uhi2017 = ee.Number(UHI2017.reduceRegion({
reducer: ee.Reducer.max(),
geometry: SBY2017,
scale: 30,
bestEffort:true
}).values().get(0));
print('Nilai Maksimum UHI 2017', max_uhi2017);
}
//========================================================================================== 
//Tahun 2018
//-------------------------------------------------------------------------------------------
//Menampilkan koleksi citra
{
var collection_2018 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
.map(maskL8sr)
.filterDate('2018-09-28','2018-09-29')
.filterBounds(SBY2018);
}
//print(collection_2018, 'Citra 2018');
//Reduksi citra, untuk mengurangi awan
{
var image2018 = collection_2018.median().clip(SBY2018);
//print(image2018, 'image');
Map.addLayer(image2018, vizParams2,'Citra Asli 2018');
}
//atau menampilkan citra tanpa reduksi -> suhu lebih rendah (pilih salah satu)
//var imag2018e = ee.Image('LANDSAT/LC08/C01/T1_SR/LC08_118065_ 20180928')
//-------------------------------------------------------------------------------------------
//Menghitung NDVI
{
var ndvi2018 = image2018.normalizedDifference(['B5', 
'B4']).rename('NDVI2018');
//print(ndvi2018,'NDVI 2018');
Map.addLayer(ndvi2018, ndviParams, 'NDVI 2018');
}
// Nilai minimum dan maksimum NDVI
{
var min_ndvi2018 = ee.Number(ndvi2018.reduceRegion({
reducer: ee.Reducer.min(),
geometry: SBY2018,
scale: 30,
bestEffort:true
}).values().get(0));
print('Nilai Minimum NDVI 2018', min_ndvi2018);
var max_ndvi2018 = ee.Number(ndvi2018.reduceRegion({
reducer: ee.Reducer.max(),
geometry: SBY2018,
scale: 30,
bestEffort:true
}).values().get(0));
print('Nilai Maksimum NDVI 2018', max_ndvi2018);
}
//-------------------------------------------------------------------------------------------
//Memilih Band 10 dengan brightness tempereature, tanpa penghitungan suhu
var thermal2018= image2018.select('B10').multiply(0.1);
//Map.addLayer(thermal2018, b10Params, 'BT 2018');
//-------------------------------------------------------------------------------------------
//Menghitung nilai fractional vegetation
{
var fv2018 =(ndvi2018.subtract(min_ndvi2018).divide(max_ndvi2018.subtract(min_ndvi2018))).pow(ee.Number(2)).rename('FV'); 
//print(fv, 'fv');
//Map.addLayer(fv);
}
//-------------------------------------------------------------------------------------------
//Menghitung nilai emisivitas
var a= ee.Number(0.004);
var b= ee.Number(0.986);
var EM2018=fv2018.multiply(a).add(b).rename('EMM2018');
//Map.addLayer(EM, imageVisParam_EMM,'Emissivitas 2018');
//-------------------------------------------------------------------------------------------
//Menghitung LST
//LST pada Celcius gunakan -273.15
//LST pada Kelvin jangan gunakan -273.15
var LST2018 = thermal2018.expression(
'(Tb/(1 + (0.00115* (Tb / 1.438))*log(Ep)))-273.15', {
 'Tb': thermal2018.select('B10'),
'Ep': EM2018.select('EMM2018')
}).rename('LST2018');
Map.addLayer(LST2018, {min: 25, max:40, palette: palette_warna},'LST 2018');
// Nilai minimum dan maksimum LST
{
var min_lst2018 = ee.Number(LST2018.reduceRegion({
reducer: ee.Reducer.min(),
geometry: SBY2018,
scale: 30,
bestEffort:true
}).values().get(0));
print('Nilai Minimum LST 2018', min_lst2018);
var max_lst2018 = ee.Number(LST2018.reduceRegion({
reducer: ee.Reducer.max(),
geometry: SBY2018,
scale: 30,
bestEffort:true
}).values().get(0));
print('Nilai Maksimum LST 2018', max_lst2018);
}
//-------------------------------------------------------------------------------------------
//Rata-rata suhu pada citra
var mean_lst2018 = LST2018.clip(SBY2018)
  .reduceRegion({
    reducer: ee.Reducer.mean().unweighted(),
    geometry: SBY2018,
    scale: 30,
  bestEffort:true
  })
  .get('LST2018');
print('Rata-Rata Suhu 2018', mean_lst2018);
//Mengubah rata-rata suhu menjadi variabel angka
var angka_mean2018 = ee.Number(mean_lst2018);
//print('testing 2018', angka_mean);
//-------------------------------------------------------------------------------------------
//Urban Heat Island
var UHI2018 = ((LST2018.subtract(angka_mean2018)).divide(angka_mean2018)).rename('UHI2018');
Map.addLayer(UHI2018, {min: 0, max:0.02, palette: palette_warna2},'UHI 2018');
// Nilai minimum dan maksimum UHI
{
var min_uhi2018 = ee.Number(UHI2018.reduceRegion({
reducer: ee.Reducer.min(),
geometry: SBY2018,
scale: 30,
bestEffort:true
}).values().get(0));
print('Nilai Minimum UHI 2018', min_uhi2018);
var max_uhi2018 = ee.Number(UHI2018.reduceRegion({
reducer: ee.Reducer.max(),
geometry: SBY2018,
scale: 30,
bestEffort:true
}).values().get(0));
print('Nilai Maksimum UHI 2018', max_uhi2018);
}
//========================================================================================== 
//Tahun 2019
//-------------------------------------------------------------------------------------------
//Menampilkan koleksi citra
{
var collection_2019 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
.map(maskL8sr)
.filterDate('2019-07-13','2019-07-14')
.filterBounds(SBY2019);
}
//print(collection_2019, 'Citra 2019');
//Reduksi citra, untuk mengurangi awan
{
var image2019 = collection_2019.median().clip(SBY2019);
//print(image2019, 'image');
Map.addLayer(image2019, vizParams2,'Citra Asli 2019');
}
//atau menampilkan citra tanpa reduksi -> suhu lebih rendah (pilih salah satu)
//var imag2019e = ee.Image('LANDSAT/LC08/C01/T1_SR/LC08_118065_ 20190713')
//-------------------------------------------------------------------------------------------
//Menghitung NDVI
{
var ndvi2019 = image2019.normalizedDifference(['B5', 
'B4']).rename('NDVI2019');
//print(ndvi2019,'NDVI 2019');
Map.addLayer(ndvi2019, ndviParams, 'NDVI 2019');
}
// Nilai minimum dan maksimum NDVI
{
var min_ndvi2019 = ee.Number(ndvi2019.reduceRegion({
reducer: ee.Reducer.min(),
geometry: SBY2019,
scale: 30,
bestEffort:true
}).values().get(0));
print('Nilai Minimum NDVI 2019', min_ndvi2019);
var max_ndvi2019 = ee.Number(ndvi2019.reduceRegion({
reducer: ee.Reducer.max(),
geometry: SBY2019,
scale: 30,
bestEffort:true
}).values().get(0));
print('Nilai Maksimum NDVI 2019', max_ndvi2019);
}
//-------------------------------------------------------------------------------------------
//Memilih Band 10 dengan brightness tempereature, tanpa penghitungan suhu
var thermal2019= image2019.select('B10').multiply(0.1);
//Map.addLayer(thermal2019, b10Params, 'BT 2019');
//-------------------------------------------------------------------------------------------
//Menghitung nilai fractional vegetation
{
var fv2019 =(ndvi2019.subtract(min_ndvi2019).divide(max_ndvi2019.subtract(min_ndvi2019))).pow(ee.Number(2)).rename('FV'); 
//print(fv, 'fv');
//Map.addLayer(fv);
}
//-------------------------------------------------------------------------------------------
//Menghitung nilai emisivitas
var a= ee.Number(0.004);
var b= ee.Number(0.986);
var EM2019=fv2019.multiply(a).add(b).rename('EMM2019');
//Map.addLayer(EM, imageVisParam_EMM,'Emissivitas 2019');
//-------------------------------------------------------------------------------------------
//Menghitung LST
//LST pada Celcius gunakan -273.15
//LST pada Kelvin jangan gunakan -273.15
var LST2019 = thermal2019.expression(
'(Tb/(1 + (0.00115* (Tb / 1.438))*log(Ep)))-273.15', {
 'Tb': thermal2019.select('B10'),
'Ep': EM2019.select('EMM2019')
}).rename('LST2019');
Map.addLayer(LST2019, {min: 25, max:40, palette: palette_warna},'LST 2019');
// Nilai minimum dan maksimum LST
{
var min_lst2019 = ee.Number(LST2019.reduceRegion({
reducer: ee.Reducer.min(),
geometry: SBY2019,
scale: 30,
bestEffort:true
}).values().get(0));
print('Nilai Minimum LST 2019', min_lst2019);
var max_lst2019 = ee.Number(LST2019.reduceRegion({
reducer: ee.Reducer.max(),
geometry: SBY2019,
scale: 30,
bestEffort:true
}).values().get(0));
print('Nilai Maksimum LST 2019', max_lst2019);
}
//-------------------------------------------------------------------------------------------
//Rata-rata suhu pada citra
var mean_lst2019 = LST2019.clip(SBY2019)
  .reduceRegion({
    reducer: ee.Reducer.mean().unweighted(),
    geometry: SBY2019,
    scale: 30,
  bestEffort:true
  })
  .get('LST2019');
print('Rata-Rata Suhu 2019', mean_lst2019);
//Mengubah rata-rata suhu menjadi variabel angka
var angka_mean2019 = ee.Number(mean_lst2019);
//print('testing 2019', angka_mean);
//-------------------------------------------------------------------------------------------
//Urban Heat Island
var UHI2019 = ((LST2019.subtract(angka_mean2019)).divide(angka_mean2019)).rename('UHI2019');
Map.addLayer(UHI2019, {min: 0, max:0.02, palette: palette_warna2},'UHI 2019');
// Nilai minimum dan maksimum UHI
{
var min_uhi2019 = ee.Number(UHI2019.reduceRegion({
reducer: ee.Reducer.min(),
geometry: SBY2019,
scale: 30,
bestEffort:true
}).values().get(0));
print('Nilai Minimum UHI 2019', min_uhi2019);
var max_uhi2019 = ee.Number(UHI2019.reduceRegion({
reducer: ee.Reducer.max(),
geometry: SBY2019,
scale: 30,
bestEffort:true
}).values().get(0));
print('Nilai Maksimum UHI 2019', max_uhi2019);
}
//========================================================================================== 
//Tahun 2020
//-------------------------------------------------------------------------------------------
//Menampilkan koleksi citra
{
var collection_2020 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
.map(maskL8sr)
.filterDate('2020-10-03','2020-10-04')
.filterBounds(SBY2020);
}
//print(collection_2020, 'Citra 2020');
//Reduksi citra, untuk mengurangi awan
{
var image2020 = collection_2020.median().clip(SBY2020);
//print(image2020, 'image');
Map.addLayer(image2020, vizParams2,'Citra Asli 2020');
}
//atau menampilkan citra tanpa reduksi -> suhu lebih rendah (pilih salah satu)
//var imag2020e = ee.Image('LANDSAT/LC08/C01/T1_SR/LC08_118065_20201003')
//-------------------------------------------------------------------------------------------
//Menghitung NDVI
{
var ndvi2020 = image2020.normalizedDifference(['B5', 
'B4']).rename('NDVI2020');
//print(ndvi2020,'NDVI 2020');
Map.addLayer(ndvi2020, ndviParams, 'NDVI 2020');
}
// Nilai minimum dan maksimum NDVI
{
var min_ndvi2020 = ee.Number(ndvi2020.reduceRegion({
reducer: ee.Reducer.min(),
geometry: SBY2020,
scale: 30,
bestEffort:true
}).values().get(0));
print('Nilai Minimum NDVI 2020', min_ndvi2020);
var max_ndvi2020 = ee.Number(ndvi2020.reduceRegion({
reducer: ee.Reducer.max(),
geometry: SBY2020,
scale: 30,
bestEffort:true
}).values().get(0));
print('Nilai Maksimum NDVI 2020', max_ndvi2020);
}
//-------------------------------------------------------------------------------------------
//Memilih Band 10 dengan brightness tempereature, tanpa penghitungan suhu
var thermal2020= image2020.select('B10').multiply(0.1);
//Map.addLayer(thermal2020, b10Params, 'BT 2020');
//-------------------------------------------------------------------------------------------
//Menghitung nilai fractional vegetation
{
var fv2020 =(ndvi2020.subtract(min_ndvi2020).divide(max_ndvi2020.subtract(min_ndvi2020))).pow(ee.Number(2)).rename('FV'); 
//print(fv, 'fv');
//Map.addLayer(fv);
}
//-------------------------------------------------------------------------------------------
//Menghitung nilai emisivitas
var a= ee.Number(0.004);
var b= ee.Number(0.986);
var EM2020=fv2020.multiply(a).add(b).rename('EMM2020');
//Map.addLayer(EM, imageVisParam_EMM,'Emissivitas 2020');
//-------------------------------------------------------------------------------------------
//Menghitung LST
//LST pada Celcius gunakan -273.15
//LST pada Kelvin jangan gunakan -273.15
var LST2020 = thermal2020.expression(
'(Tb/(1 + (0.00115* (Tb / 1.438))*log(Ep)))-273.15', {
 'Tb': thermal2020.select('B10'),
'Ep': EM2020.select('EMM2020')
}).rename('LST2020');
Map.addLayer(LST2020, {min: 25, max:40, palette: palette_warna},'LST 2020');
// Nilai minimum dan maksimum LST
{
var min_lst2020 = ee.Number(LST2020.reduceRegion({
reducer: ee.Reducer.min(),
geometry: SBY2020,
scale: 30,
bestEffort:true
}).values().get(0));
print('Nilai Minimum LST 2020', min_lst2020);
var max_lst2020 = ee.Number(LST2020.reduceRegion({
reducer: ee.Reducer.max(),
geometry: SBY2020,
scale: 30,
bestEffort:true
}).values().get(0));
print('Nilai Maksimum LST 2020', max_lst2020);
}
//-------------------------------------------------------------------------------------------
//Rata-rata suhu pada citra
var mean_lst2020 = LST2020.clip(SBY2020)
  .reduceRegion({
    reducer: ee.Reducer.mean().unweighted(),
    geometry: SBY2020,
    scale: 30,
  bestEffort:true
  })
  .get('LST2020');
print('Rata-Rata Suhu 2020', mean_lst2020);
//Mengubah rata-rata suhu menjadi variabel angka
var angka_mean2020 = ee.Number(mean_lst2020);
//print('testing 2020', angka_mean);
//-------------------------------------------------------------------------------------------
//Urban Heat Island
var UHI2020 = ((LST2020.subtract(angka_mean2020)).divide(angka_mean2020)).rename('UHI2020');
Map.addLayer(UHI2020, {min: 0, max:0.02, palette: palette_warna2},'UHI 2020');
// Nilai minimum dan maksimum UHI
{
var min_uhi2020 = ee.Number(UHI2020.reduceRegion({
reducer: ee.Reducer.min(),
geometry: SBY2020,
scale: 30,
bestEffort:true
}).values().get(0));
print('Nilai Minimum UHI 2020', min_uhi2020);
var max_uhi2020 = ee.Number(UHI2020.reduceRegion({
reducer: ee.Reducer.max(),
geometry: SBY2020,
scale: 30,
bestEffort:true
}).values().get(0));
print('Nilai Maksimum UHI 2020', max_uhi2020);
}
//==========================================================================================
//Widget
// Definisikan palet untuk mewarnai klasifikasi.
var palette1 = [
  'D3D3D3', // umum2013 (0)  // grey
  '008000', //  vegetasi2013 (1) // green
];
// Make left and right maps.
var leftMap = ui.Map();
var rightMap = ui.Map();
// Make predefined data layers that can be selected.
var Img2013 = ui.Map.Layer(UHI2013, {min: 0, max:0.02, palette: palette_warna2});
var Img2014 = ui.Map.Layer(UHI2014, {min: 0, max:0.02, palette: palette_warna2});
var Img2015 = ui.Map.Layer(UHI2015, {min: 0, max:0.02, palette: palette_warna2});
var Img2016 = ui.Map.Layer(UHI2016, {min: 0, max:0.02, palette: palette_warna2});
var Img2017 = ui.Map.Layer(UHI2017, {min: 0, max:0.02, palette: palette_warna2});
var Img2018 = ui.Map.Layer(UHI2018, {min: 0, max:0.02, palette: palette_warna2});
var Img2019 = ui.Map.Layer(UHI2019, {min: 0, max:0.02, palette: palette_warna2});
var Img2020 = ui.Map.Layer(UHI2020, {min: 0, max:0.02, palette: palette_warna2});
// Add default layers to maps.
leftMap.add(Img2013);
rightMap.add(Img2020);
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
var layers = ['UTFVI 2013', 'UTFVI 2014', 'UTFVI 2015', 'UTFVI 2016', 'UTFVI 2017', 'UTFVI 2018','UTFVI 2019','UTFVI 2020'];
// Make a function that will retrieve a layer based on selection.
function getLayer(selection) {
  var layer = Img2013;
  if(selection == 'UTFVI 2013') {
    layer = Img2013;
  }else if(selection == 'UTFVI 2014'){
    layer = Img2014;
  }else if(selection == 'UTFVI 2015'){
    layer = Img2015;
  }else if(selection == 'UTFVI 2016'){
    layer = Img2016;
  }else if(selection == 'UTFVI 2017'){
    layer = Img2017;
  }else if(selection == 'UTFVI 2018'){
    layer = Img2018;
  } else if(selection == 'UTFVI 2019'){
    layer = Img2019;
  } else if(selection == 'UTFVI 2020'){
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
var selectLeft = ui.Select(layers, 'UTFVI 2013', 'UTFVI 2013', selectLeftOnChange, false, {position: 'top-left'});
var selectRight = ui.Select(layers, 'UTFVI 2020', 'UTFVI 2020', selectRightOnChange, false, {position: 'top-right'});
// Clear the root, add the splitPanel, and buttons.
ui.root.clear();
ui.root.add(splitPanel);
leftMap.add(selectLeft);
rightMap.add(selectRight);
leftMap.centerObject(SBY2013, 12);
//==========================================================================================
//Legenda
//Menetapkan visualisasi legenda
var vis = {min: 0, max: 0.02, palette: palette_warna2};
//Menetapkan posisi panel
var legend = ui.Panel({
style: {
position: 'bottom-right',
padding: '15px 8px'
}
});
// Membuat color bar thumbnail image
function makeColorBarParams(palette) {
  return {
    bbox: [0, 0, 1, 0.1],
    dimensions: '100x10',
    format: 'png',
    min: 0,
    max: 1,
    palette: palette,
  };
}
//Membuat color bar untuk legenda 
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(vis.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
//Membuat panel dengan keterangan angka 
var legendLabels = ui.Panel({
  widgets: [
    ui.Label(0, {margin: '4px 8px'}),
    ui.Label(
      (0.005),
      {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(
        (0.01),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(
      (0.015),
      {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(0.02, {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
var legendTitle = ui.Label({
  value: 'Urban Thermal Field Variance Index (UTFVI)',
  style: {fontWeight: 'bold'}
});
//Menambahkan atribut pada panel 
legend.add(legendTitle);
legend.add(colorBar);
legend.add(legendLabels);
//var legendPanel = ui.Panel([legendTitle, colorBar, legendLabels]);
//Menambahkan panel pada peta
rightMap.add(legend);
/*
//==========================================================================================
//Export
//Visualisasi hasil export
//var year2013 = thn2013.visualize({bands: ['B6', 'B5', 'B3'], max: [0.3, 0.4, 0.3], gamma: 2});
//var ndvi2013_viz = ndvi2013.visualize({min:0, max:1, palette: palette});
var real2020_viz = UHI2020.visualize({min: 0, max:0.02, palette: palette_warna2});
Map.addLayer(real2020_viz);
// Export hasil RGB ke file tertentu di Google Drive
Export.image.toDrive({
  image: real2020_viz,
  description: "Satellite_Image_Of_Kota_Surabaya_2020",
  folder: "TA_Kota Surabaya",
  fileNamePrefix: "UHI_Image_SBY2020",
  region: SBY2020, // batas daerah yang akan disimpan
  scale: 30,
  maxPixels: 10e10,
  fileFormat: "GeoTIFF"
});
*/