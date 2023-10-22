var table = ui.import && ui.import("table", "table", {
      "id": "users/cpwaldman/anti_mask2"
    }) || ee.FeatureCollection("users/cpwaldman/anti_mask2"),
    imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "B8",
          "B4",
          "B11"
        ],
        "min": 103,
        "max": 3473,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["B8","B4","B11"],"min":103,"max":3473,"gamma":1},
    table2 = ui.import && ui.import("table2", "table", {
      "id": "users/cpwaldman/PapaSE2021proy"
    }) || ee.FeatureCollection("users/cpwaldman/PapaSE2021proy"),
    imageCollection = ui.import && ui.import("imageCollection", "imageCollection", {
      "id": "COPERNICUS/S2"
    }) || ee.ImageCollection("COPERNICUS/S2"),
    table3 = ui.import && ui.import("table3", "table", {
      "id": "users/cpwaldman/papa2021"
    }) || ee.FeatureCollection("users/cpwaldman/papa2021"),
    imageCollection2 = ui.import && ui.import("imageCollection2", "imageCollection", {
      "id": "LANDSAT/LC08/C01/T1_TOA"
    }) || ee.ImageCollection("LANDSAT/LC08/C01/T1_TOA"),
    imageVisParam3 = ui.import && ui.import("imageVisParam3", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "B5",
          "B4",
          "B3"
        ],
        "min": 0.054727595299482346,
        "max": 0.41717132925987244,
        "gamma": 1.54
      }
    }) || {"opacity":1,"bands":["B5","B4","B3"],"min":0.054727595299482346,"max":0.41717132925987244,"gamma":1.54};
var clasi_20_21 = table2
var area = table 
//Map.addLayer(area,{},"area")
Map.centerObject(area, 6 );
var bandas = ["B8", "B4", "B11"];
//noviembre
var nov = imageCollection
         .filterBounds(area)
         .filterDate("2020-11-15","2020-11-30" )
         .filterMetadata("CLOUDY_PIXEL_PERCENTAGE","less_than" ,1)
  print("nov", nov);
var nov_ord = nov.sort('CLOUDY_PIXEL_PERCENTAGE');
var mos_nov = nov_ord.mosaic().clip(area);
//Map.addLayer(mos_nov , imageVisParam,'mos_nov',false); 
/////////////////////////////////////////////////////////////////////////////////////////////////////////
var dic = imageCollection
         .filterBounds(area)
         .filterDate("2020-12-01","2020-12-30" )
         .filterMetadata("CLOUDY_PIXEL_PERCENTAGE","less_than" ,1)
  print("dic", dic);
var dic_ord = dic.sort('CLOUDY_PIXEL_PERCENTAGE');
var mos_dic = dic_ord.mosaic().clip(area);
Map.addLayer(mos_dic , imageVisParam,'mos_dic',false) 
/////////////////////////////////////////////////////////////////////////////////////////
var ene = imageCollection
         .filterBounds(area)
         .filterDate("2021-01-01","2021-01-30" )
         .filterMetadata("CLOUDY_PIXEL_PERCENTAGE","less_than" ,1)
  print("ene", ene);
var ene_ord = ene.sort('CLOUDY_PIXEL_PERCENTAGE');
var mos_ene = ene_ord.mosaic().clip(area);
Map.addLayer(mos_ene , imageVisParam,'mos_ene',false);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
var feb = imageCollection
         .filterBounds(area)
         .filterDate("2021-02-01","2021-02-28" )
         .filterMetadata("CLOUDY_PIXEL_PERCENTAGE","less_than" ,1)
  print("feb", feb);
var feb_ord = ene.sort('CLOUDY_PIXEL_PERCENTAGE');
var mos_feb = feb_ord.mosaic().clip(area);
Map.addLayer(mos_feb , imageVisParam,'mos_feb',false);
///////////////////////////////////////////////////////////////////////////////////7///////////////
var mar_landsat = imageCollection2
         .filterBounds(area)
         .filterDate("2021-03-01","2021-03-31" )
         .filterMetadata("CLOUD_COVER","less_than" ,20)
  print("mar_landsat", mar_landsat);
var marland_ord = mar_landsat.sort('CLOUD_COVER');
var mos_marland = marland_ord.mosaic().clip(area);
Map.addLayer(mos_marland , imageVisParam3,'mos_marland',false);
var mar = imageCollection
         .filterBounds(area)
         .filterDate("2021-03-01","2021-03-31" )
         .filterMetadata("CLOUDY_PIXEL_PERCENTAGE","less_than" ,1)
  print("mar", mar);
var mar_ord = mar.sort('CLOUDY_PIXEL_PERCENTAGE');
var mos_mar = mar_ord.mosaic().clip(area);
Map.addLayer(mos_mar , imageVisParam,'mos_mar',false); 
///////////////////////////////////////////////////////////////////////////////////////////////////////
var abr = imageCollection
         .filterBounds(area)
         .filterDate("2021-04-01","2021-04-30" )
         .filterMetadata("CLOUDY_PIXEL_PERCENTAGE","less_than" ,10)
  print("abr", abr);
var abr_ord = abr.sort('CLOUDY_PIXEL_PERCENTAGE');
var mos_abr = abr_ord.mosaic().clip(area);
Map.addLayer(mos_abr , imageVisParam,'mos_abr',false); 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var may_landsat = imageCollection2
         .filterBounds(area)
         .filterDate("2021-05-01","2021-05-31" )
         .filterMetadata("CLOUD_COVER","less_than" ,20)
  print("may_landsat", may_landsat);
var mayland_ord = may_landsat.sort('CLOUD_COVER');
var mos_mayland = mayland_ord.mosaic().clip(area);
Map.addLayer(mos_mayland , imageVisParam3,'mos_mayland',false);
var may = imageCollection
         .filterBounds(area)
         .filterDate("2021-05-01","2021-05-31" )
         .filterMetadata("CLOUDY_PIXEL_PERCENTAGE","less_than" ,1)
  print("may", may);
var may_ord = may.sort('CLOUDY_PIXEL_PERCENTAGE');
var mos_may = may_ord.mosaic().clip(area);
Map.addLayer(mos_may , imageVisParam,'mos_may',false); 
var clasi_20_21 = table2
Map.addLayer(clasi_20_21,{},"clasi_20_21");
var lotes20_21 = table3
Map.addLayer(lotes20_21,{color: '#fff25c'},"lotes20_21");
///////////////////////////////////////////////////////////////////////////////////////////////////
// Split Panels
// Map 2
var map2 = ui.Map();
map2.addLayer(mos_nov , imageVisParam,'mos_nov', true);
map2.addLayer(mos_dic,
         imageVisParam,'mos_dic', false);
// Link the two panels
var linker = ui.Map.Linker([ui.root.widgets().get(0), map2]);
// Create the split panels
var splitPanel = ui.SplitPanel({
  firstPanel: linker.get(0),
  secondPanel: linker.get(1),
  orientation: 'horizontal',
  wipe: true,
  style: {stretch: 'both'}
});
// Set the split panels to ui roots
ui.root.widgets().reset([splitPanel]);
// Set the view center
Map.centerObject(area, 8);