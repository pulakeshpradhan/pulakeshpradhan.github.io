var Indonesia = ui.import && ui.import("Indonesia", "table", {
      "id": "users/sdwijati/IDN_adm2"
    }) || ee.FeatureCollection("users/sdwijati/IDN_adm2"),
    MOD11A1 = ui.import && ui.import("MOD11A1", "imageCollection", {
      "id": "MODIS/006/MOD11A1"
    }) || ee.ImageCollection("MODIS/006/MOD11A1"),
    IVP = ui.import && ui.import("IVP", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "LST_Day_1km"
        ],
        "min": 7500,
        "palette": [
          "040274",
          "040281",
          "0502a3",
          "0502b8",
          "0502ce",
          "0502e6",
          "0602ff",
          "235cb1",
          "307ef3",
          "269db1",
          "30c8e2",
          "32d3ef",
          "3be285",
          "3ff38f",
          "86e26f",
          "3ae237",
          "b5e22e",
          "d6e21f",
          "fff705",
          "ffd611",
          "ffb613",
          "ff8b13",
          "ff6e08",
          "ff500d",
          "ff0000",
          "de0101",
          "c21301",
          "a71001",
          "911003"
        ]
      }
    }) || {"opacity":1,"bands":["LST_Day_1km"],"min":7500,"palette":["040274","040281","0502a3","0502b8","0502ce","0502e6","0602ff","235cb1","307ef3","269db1","30c8e2","32d3ef","3be285","3ff38f","86e26f","3ae237","b5e22e","d6e21f","fff705","ffd611","ffb613","ff8b13","ff6e08","ff500d","ff0000","de0101","c21301","a71001","911003"]};
var countries = Indonesia
//var nama_negara = ['Indonesia']
//var negara = countries.filter(ee.Filter.inList('NAME_0', nama_negara));
//Map.addLayer(negara,{color:"green"}, "Negara");
var nama_prov = ['Nusa Tenggara Barat']
var prov = countries.filter(ee.Filter.inList('NAME_1', nama_prov));
Map.addLayer(prov,{color:"005670"}, "Provinsi Nusa Tenggara barat");
//var nama_kab = ['Kota Bandung', 'Cimahi']
//var kabkot = countries.filter(ee.Filter.inList('NAME_2', nama_kab));
//Map.addLayer(kabkot,{color:"yellow"}, "Bandung Raya");
var LST_mean = MOD11A1
.filter(ee.Filter.date('2019-01-01', '2019-12-31'))
.select('LST_Day_1km')
.mean();
var LST_max = MOD11A1
.filter(ee.Filter.date('2019-01-01', '2019-12-31'))
.select('LST_Day_1km')
.max();
var LST_min = MOD11A1
.filter(ee.Filter.date('2019-01-01', '2019-12-31'))
.select('LST_Day_1km')
.min();
var LST_median = MOD11A1
.filter(ee.Filter.date('2019-01-01', '2019-12-31'))
.select('LST_Day_1km')
.median();
var LST_ParVis = {
  min: 14000.0,
  max: 16000.0,
  palette: [
    '040274', '040281', '0502a3', '0502b8', '0502ce', '0502e6',
    '0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef',
    '3be285', '3ff38f', '86e26f', '3ae237', 'b5e22e', 'd6e21f',
    'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08', 'ff500d',
    'ff0000', 'de0101', 'c21301', 'a71001', '911003'
  ],
};
Map.addLayer(LST_mean.clip(prov), LST_ParVis,'LST_mean');
Map.addLayer(LST_median.clip(prov), LST_ParVis,'LST_median');
Map.addLayer(LST_mean.clip(prov), LST_ParVis,'LST_min');
Map.addLayer(LST_mean.clip(prov), LST_ParVis,'LST_max');
Map.centerObject(prov, 8)