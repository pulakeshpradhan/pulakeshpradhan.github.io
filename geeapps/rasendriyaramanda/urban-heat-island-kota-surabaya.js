var SBY2020 = ui.import && ui.import("SBY2020", "table", {
      "id": "users/rasendriyaramanda/SBY_2020_FIX_2"
    }) || ee.FeatureCollection("users/rasendriyaramanda/SBY_2020_FIX_2");
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
  return col.updateMask(mask);
}
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
var palette_warna2 = ['blue', 'white', 'green'];
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
maxPixels: 1e9
}).values().get(0));
print('Nilai Minimum NDVI 2020', min_ndvi2020);
var max_ndvi2020 = ee.Number(ndvi2020.reduceRegion({
reducer: ee.Reducer.max(),
geometry: SBY2020,
scale: 30,
maxPixels: 1e9
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
maxPixels: 1e9
}).values().get(0));
print('Nilai Minimum LST 2020', min_lst2020);
var max_lst2020 = ee.Number(LST2020.reduceRegion({
reducer: ee.Reducer.max(),
geometry: SBY2020,
scale: 30,
maxPixels: 1e9
}).values().get(0));
print('Nilai Maksimum LST 2020', max_lst2020);
}
//-------------------------------------------------------------------------------------------
//Rata-rata suhu pada citra
var mean_lst2020 = LST2020.clip(SBY2020)
  .reduceRegion({
    reducer: ee.Reducer.mean().unweighted(),
    geometry: SBY2020,
    scale: 30})
  .get('LST2020');
print('Rata-Rata Suhu 2020', mean_lst2020);
//Mengubah rata-rata suhu menjadi variabel angka
var angka_mean2020 = ee.Number(mean_lst2020);
//print('testing 2020', angka_mean);
//-------------------------------------------------------------------------------------------
//Urban Heat Island
var UHI2020 = (LST2020.subtract(angka_mean2020)).divide(angka_mean2020);
Map.addLayer(UHI2020, {min: -0.2, max:0.2, palette: palette_warna},'UHI 2020');
// Nilai minimum dan maksimum UHI
{
var min_uhi2020 = ee.Number(UHI2020.reduceRegion({
reducer: ee.Reducer.min(),
geometry: SBY2020,
scale: 30,
maxPixels: 1e9
}).values().get(0));
print('Nilai Minimum UHI 2020', min_uhi2020);
var max_uhi2020 = ee.Number(UHI2020.reduceRegion({
reducer: ee.Reducer.max(),
geometry: SBY2020,
scale: 30,
maxPixels: 1e9
}).values().get(0));
print('Nilai Maksimum UHI 2020', max_uhi2020);
}