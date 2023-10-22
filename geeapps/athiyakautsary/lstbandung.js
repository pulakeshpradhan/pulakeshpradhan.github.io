var Indonesia = ui.import && ui.import("Indonesia", "table", {
      "id": "users/athiyakautsary/IDN_adm2"
    }) || ee.FeatureCollection("users/athiyakautsary/IDN_adm2"),
    MOD11A1 = ui.import && ui.import("MOD11A1", "imageCollection", {
      "id": "MODIS/006/MOD11A1"
    }) || ee.ImageCollection("MODIS/006/MOD11A1");
var countries = Indonesia
var Nama_Kota = ['Kota Bandung']
var Kota = countries.filter(ee.Filter.inList('NAME_2', Nama_Kota));
Map.addLayer(Kota,{color:"yellow"}, "Kota");
Map.centerObject(Kota, 10);
var LST_mean = MOD11A1
.filter(ee.Filter.date('2019-01-01', '2019-12-31'))
.select('LST_Day_1km')
.mean();
var LST_median = MOD11A1
.filter(ee.Filter.date('2019-01-01', '2019-12-31'))
.select('LST_Day_1km')
.median();
var LST_min = MOD11A1
.filter(ee.Filter.date('2019-01-01', '2019-12-31'))
.select('LST_Day_1km')
.min();
var LST_max = MOD11A1
.filter(ee.Filter.date('2019-01-01', '2019-12-31'))
.select('LST_Day_1km')
.max();
var LST_ParVis = {
  min: 14000.0,
  max: 16000.0,
  palette :[
    '040274', '040281', '0502a3', '0502b8', '0502ce', '0502e6',
    '0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef',
    '3be285', '3ff38f', '86e26f', '3ae237', 'b5e22e', 'd6e21f',
    'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08', 'ff500d',
    'ff0000', 'de0101', 'c21301', 'a71001', '911003'
    ],
};
Map.addLayer(LST_mean.clip(Kota), LST_ParVis, 'LST_mean');
Map.addLayer(LST_median.clip(Kota), LST_ParVis, 'LST_median');
Map.addLayer(LST_min.clip(Kota), LST_ParVis, 'LST_min');
Map.addLayer(LST_max.clip(Kota), LST_ParVis, 'LST_max');