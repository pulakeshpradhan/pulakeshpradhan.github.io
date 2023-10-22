var Indonesia = ui.import && ui.import("Indonesia", "table", {
      "id": "users/manaufaldi21/IDN_adm2"
    }) || ee.FeatureCollection("users/manaufaldi21/IDN_adm2"),
    L8 = ui.import && ui.import("L8", "imageCollection", {
      "id": "LANDSAT/LC08/C01/T1_TOA"
    }) || ee.ImageCollection("LANDSAT/LC08/C01/T1_TOA"),
    imageVisParam5 = ui.import && ui.import("imageVisParam5", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "B11"
        ],
        "min": 251.8462643432617,
        "max": 294.2796969604492,
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
    }) || {"opacity":1,"bands":["B11"],"min":251.8462643432617,"max":294.2796969604492,"palette":["040274","040281","0502a3","0502b8","0502ce","0502e6","0602ff","235cb1","307ef3","269db1","30c8e2","32d3ef","3be285","3ff38f","86e26f","3ae237","b5e22e","d6e21f","fff705","ffd611","ffb613","ff8b13","ff6e08","ff500d","ff0000","de0101","c21301","a71001","911003"]},
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            127.93368586508007,
            -3.852707409969968
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            128.39785822836132,
            -3.866409174378745
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            128.39373835531444,
            -3.545731513941517
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            127.92681941000194,
            -3.544360850727448
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.MultiPoint(
        [[127.93368586508007, -3.852707409969968],
         [128.39785822836132, -3.866409174378745],
         [128.39373835531444, -3.545731513941517],
         [127.92681941000194, -3.544360850727448]]),
    imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "B11"
        ],
        "min": 278.02947204589844,
        "max": 283.81961853027343,
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
    }) || {"opacity":1,"bands":["B11"],"min":278.02947204589844,"max":283.81961853027343,"palette":["040274","040281","0502a3","0502b8","0502ce","0502e6","0602ff","235cb1","307ef3","269db1","30c8e2","32d3ef","3be285","3ff38f","86e26f","3ae237","b5e22e","d6e21f","fff705","ffd611","ffb613","ff8b13","ff6e08","ff500d","ff0000","de0101","c21301","a71001","911003"]};
var countries = Indonesia ;
var Nama_KotaKabupaten = ['Ambon'];
var KotaKabupaten = countries.filter(ee.Filter.inList('NAME_2', Nama_KotaKabupaten));
Map.addLayer(KotaKabupaten,{color:"red" },"KotaKabupaten");
var Landsat8_Thermal = L8
.filterDate('2018-01-01', '2018-12-31')
.select('B11')
.mean();
Map.centerObject(KotaKabupaten, 11);
Map.addLayer(Landsat8_Thermal.clip(KotaKabupaten), imageVisParam,'Land Surface Temperature');
var Landsat8_Thermal = L8
.filterDate('2018-01-01', '2018-12-31')
.select('B11');
//Define Location
var Location  = ee.FeatureCollection([geometry]);
// Create a time series chart.
var B11TimeSeries = ui.Chart.image.seriesByRegion
(Landsat8_Thermal, Location, ee.Reducer.mean(),'B11',30, 'system:time_start');
print(B11TimeSeries);
var Landsat8_ThermalTimeSeries = ui.Chart.image.seriesByRegion
(Landsat8_Thermal, Location, ee.Reducer.mean(),'B11',
30, 'system:time_start', 'label')
.setOptions({
title: 'Suhu Permukaan rata-rata Provinsi Maluku',
vAxis: {title: 'Suhu Permukaan (Kelvin)'},
hAxis: {title: 'Waktu', format: 'MM-yy', gridlines: {count: 7}},
series: {
      0: {
        color: 'blue',
        lineWidth: 0,
        pointsVisible: true,
        pointSize: 2,
      },
    },
});
ui.root.widgets().add(Landsat8_ThermalTimeSeries);