var MooringBuoy = ui.import && ui.import("MooringBuoy", "table", {
      "id": "users/geraldonazar/MooringBuoy"
    }) || ee.FeatureCollection("users/geraldonazar/MooringBuoy");
// Membuat geomer
var geometry = MooringBuoy;
//Menentukan parameter periode akuisisi
var hycom = ee.ImageCollection("HYCOM/sea_temp_salinity")
  .select('salinity_20')
  .filterDate('2022-07-01', '2022-09-01')
  .filterBounds(geometry)
  .map(function(image){return image.clip(geometry)});
print(hycom, 'Hycom 2022');  
// Cloud Masking Landsat 8 Level 2 Tier 1
function maskL8sr(image) {
  // Bit 0 - Fill
  // Bit 1 - Dilated Cloud
  // Bit 2 - Cirrus
  // Bit 3 - Cloud
  // Bit 4 - Cloud Shadow
  var qaMask = image.select('QA_PIXEL').bitwiseAnd(parseInt('11111', 2)).eq(0);
  var saturationMask = image.select('QA_RADSAT').eq(0);
  // Apply the scaling factors to the appropriate bands.
  var opticalBands = image.select('SR_B.').multiply(0.0000275).add(-0.2);
  var thermalBands = image.select('ST_B.*').multiply(0.00341802).add(149.0);
  // Replace the original bands with the scaled ones and apply the masks.
  return image.addBands(opticalBands, null, true)
      .addBands(thermalBands, null, true)
      .updateMask(qaMask)
      .updateMask(saturationMask);
}
  // Map the function over one year of data.
var collection = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2')
                     .filterDate('2022-07-01', '2022-09-01')
                     .map(maskL8sr);
var hindia = collection.median();
// compute NDSI using expression
var NDSI = hindia.select('SR_B6').subtract(hindia.select('SR_B7'))
  .divide(hindia.select('SR_B6').add(hindia.select('SR_B7')));
var NDSIParams = {min: -4.292682926829335, max: 0.39975500204164965, palette: ['brown', 'red', 'yellow']};
print(NDSI,'NDSI');
// find the min and max of NDSI Landsat 8
{
var min = ee.Number(NDSI.reduceRegion({
reducer: ee.Reducer.min(),
geometry: geometry,
scale: 20,
maxPixels: 1e9
}).values().get(0));
print(min, 'min Landsat 8');
var max = ee.Number(NDSI.reduceRegion({
reducer: ee.Reducer.max(),
geometry: geometry,
scale: 20,
maxPixels: 1e9
}).values().get(0));
print(max, 'max Landsat 8')
}
//Menampilkan data
Map.addLayer(hycom, {min: 14000, max: 14700, palette: ['060606','337663','337663','ffffff']}, 'Hycom');
Map.addLayer(NDSI.clip(geometry), NDSIParams,  'Normalized Difference Salinity Index')
Map.centerObject(geometry, 10);
//Membuat judul utama di tengah-atas
var title = ui.Label('Salinitas Mooring Buoy Kedalaman 20 meter 1 Juli 2022 - 1 September 2022', {fontSize: '30px', color: 'darkSlateGrey', fontWeight: 'bold'});
title.style().set('position', 'top-center');
Map.add(title);
//Membuat panel di sisi kanan
var header = ui.Label('Informasi dan Referensi', {fontSize: '25px', color: 'darkSlateGrey'});
var text_1 = ui.Label(
'Salinitas dimonitor menggunakan satelit HYCOM: Hybrid Coordinate Ocean Model, Water Temperature and Salinity dan LANDSAT-8 ToA. Diolah oleh Geraldo Nazar Prakarsa pada 12 Desember 2022',
{fontSize: '15px'});
var toolPanel = ui.Panel([header, text_1], 'flow', {width: '400px'});
//Membuat rujukan eksternal dengan tautan
var link = ui.Label(
'Monitoring Salinitas Menggunakan Citra HYCOM', {},
'https://www.hycom.org/');
var linkPanel = ui.Panel(
[ui.Label('Informasi lainnya', {fontWeight: 'bold'}), link]);
toolPanel.add(linkPanel);
ui.root.widgets().add(toolPanel);
//Membuat Grafis Timeseries Salinitas Samudra Hindia
var tempTimeSeries = ui.Chart.image.series({
  imageCollection: hycom,
  region: geometry,
  reducer: ee.Reducer.mean(),
  scale: 100,
  xProperty: 'system:time_start',
});
tempTimeSeries.setChartType('ScatterChart');
tempTimeSeries.setOptions({
  title: 'Salinitas 1 Juli 2022 - 1 Juli 2022 di Mooring Buoy',
  vAxis: {title: 'Salinity'},
  hAxis: {title: 'Tanggal'},
  lineWidth: 1,
  pointSize: 4,
  }
);
print(tempTimeSeries);