var Indonesia = ui.import && ui.import("Indonesia", "table", {
      "id": "users/manaufaldi21/IDN_adm2"
    }) || ee.FeatureCollection("users/manaufaldi21/IDN_adm2"),
    MOD11A1 = ui.import && ui.import("MOD11A1", "imageCollection", {
      "id": "MODIS/006/MOD11A1"
    }) || ee.ImageCollection("MODIS/006/MOD11A1"),
    imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "LST_Day_1km"
        ],
        "min": 14500,
        "max": 15400,
        "palette": [
          "040274",
          "040281",
          "0502a3",
          "0502b8",
          "0502ce",
          "001ce6",
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
    }) || {"opacity":1,"bands":["LST_Day_1km"],"min":14500,"max":15400,"palette":["040274","040281","0502a3","0502b8","0502ce","001ce6","0602ff","235cb1","307ef3","269db1","30c8e2","32d3ef","3be285","3ff38f","86e26f","3ae237","b5e22e","d6e21f","fff705","ffd611","ffb613","ff8b13","ff6e08","ff500d","ff0000","de0101","c21301","a71001","911003"]};
var countries = Indonesia
var Nama_Provinsi = ['Maluku']
var Provinsi = countries.filter(ee.Filter.inList('NAME_1', Nama_Provinsi));
Map.addLayer(Provinsi,{color:"Orange" },"Provinsi");
var LST = MOD11A1
  .filter(ee.Filter.date('2018-01-01', '2018-05-01'))
  .select('LST_Day_1km')
  .mean();
  // .median()
  //.sum();
Map.setCenter(130, -6,7);
Map.addLayer(LST.clip(Provinsi), imageVisParam, 'Land Surface Temperature');