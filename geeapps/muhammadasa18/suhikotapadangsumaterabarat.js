var Indonesia = ui.import && ui.import("Indonesia", "table", {
      "id": "users/muhammadasa18/IDN_adm2"
    }) || ee.FeatureCollection("users/muhammadasa18/IDN_adm2"),
    MOD11A1 = ui.import && ui.import("MOD11A1", "imageCollection", {
      "id": "MODIS/006/MOD11A1"
    }) || ee.ImageCollection("MODIS/006/MOD11A1");
//Pembagian Wilayah
var countries = Indonesia;
var Nama_Provinsi = ['Sumatera Barat'];
var Provinsi = countries.filter(ee.Filter.inList('NAME_1', Nama_Provinsi));
Map.addLayer(Provinsi,{color:"Black" },"Sumatera Barat");
var Nama_KotaKabupaten = ['Padang'];
var KotaKabupaten = countries.filter(ee.Filter.inList('NAME_2', Nama_KotaKabupaten));
Map.addLayer(KotaKabupaten,{color:"Blue" },"Kota Padang");
Map.centerObject(Provinsi, 8);
//Satelit
var LST_mean = MOD11A1
.filter(ee.Filter.date('2018-01-01', '2018-05-01'))
.select('LST_Day_1km')
.mean();
var LST_median = MOD11A1
.filter(ee.Filter.date('2018-01-01', '2018-05-01'))
.select('LST_Day_1km')
.median();
var LST_min = MOD11A1
.filter(ee.Filter.date('2018-01-01', '2018-05-01'))
.select('LST_Day_1km')
.min();
var LST_max = MOD11A1
.filter(ee.Filter.date('2018-01-01', '2018-05-01'))
.select('LST_Day_1km')
.max();
var LST_ParVis = {
  min: 13000.0,
  max: 16500.0,
  palette: [
    '040274', '040281', '0502a3', '0502b8', '0502ce', '0502e6',
    '0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef',
    '3be285', '3ff38f', '86e26f', '3ae237', 'b5e22e', 'd6e21f',
    'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08', 'ff500d',
    'ff0000', 'de0101', 'c21301', 'a71001', '911003'
  ],
};
Map.addLayer(LST_mean.clip(Provinsi), LST_ParVis, 'Land Surface Temperature (Mean)');
Map.addLayer(LST_median.clip(Provinsi), LST_ParVis, 'Land Surface Temperature (Median)');
Map.addLayer(LST_min.clip(Provinsi), LST_ParVis, 'Land Surface Temperature (Min)');
Map.addLayer(LST_max.clip(Provinsi), LST_ParVis, 'Land Surface Temperature (Max)');