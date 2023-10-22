var countries = ui.import && ui.import("countries", "table", {
      "id": "USDOS/LSIB_SIMPLE/2017"
    }) || ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017"),
    ndvi_modis = ui.import && ui.import("ndvi_modis", "imageCollection", {
      "id": "MODIS/006/MOD13A1"
    }) || ee.ImageCollection("MODIS/006/MOD13A1"),
    urt_eez = ui.import && ui.import("urt_eez", "table", {
      "id": "users/lmathew/Share/TZA"
    }) || ee.FeatureCollection("users/lmathew/Share/TZA"),
    mikoa = ui.import && ui.import("mikoa", "table", {
      "id": "users/lmathew/tza_regions"
    }) || ee.FeatureCollection("users/lmathew/tza_regions"),
    mawilaya = ui.import && ui.import("mawilaya", "table", {
      "id": "users/lmathew/tza_districts"
    }) || ee.FeatureCollection("users/lmathew/tza_districts"),
    dom_tree_planting = ui.import && ui.import("dom_tree_planting", "table", {
      "id": "users/lmathew/Freshwater/DODOMA_TREE_PLANTING-SITE_COORDINATES"
    }) || ee.FeatureCollection("users/lmathew/Freshwater/DODOMA_TREE_PLANTING-SITE_COORDINATES"),
    firms = ui.import && ui.import("firms", "imageCollection", {
      "id": "FIRMS"
    }) || ee.ImageCollection("FIRMS"),
    ba = ui.import && ui.import("ba", "imageCollection", {
      "id": "MODIS/006/MCD64A1"
    }) || ee.ImageCollection("MODIS/006/MCD64A1"),
    urt_pas = ui.import && ui.import("urt_pas", "table", {
      "id": "users/lmathew/URT/URT_PAs_092020"
    }) || ee.FeatureCollection("users/lmathew/URT/URT_PAs_092020");
var text = require('users/gena/packages:text');
Map.centerObject(dom_tree_planting,10);
//----------------------------------------------------------------------------------------
var empty = ee.Image().byte();
var Tanzania = empty.paint({featureCollection: urt_eez, color: 1, width: 3 });
var mkoa = mikoa.filter(ee.Filter.eq('Name', 'Dodoma'));
var dodoma = empty.paint({featureCollection: mkoa, color: 2, width: 2 });
var wilaya = mawilaya.filter(ee.Filter.eq('Name', 'Dodoma Urban'));
var dom_city = empty.paint({featureCollection: wilaya, color: '000000', width: 3 });
//Forest around Dar es Salaam
var PA_Vikindu = urt_pas.filter(ee.Filter.eq('NAME', 'Vikindu')); //Vikindu
var vikindu = empty.paint({featureCollection: PA_Vikindu, color: 'FF0000', width: 3 });
var PA_Pugu = urt_pas.filter(ee.Filter.eq('NAME', 'Pugu')); //Pugu
var pugu = empty.paint({featureCollection: PA_Pugu, color: 'FF0000', width: 3 });
var PA_Kazimzumbwi = urt_pas.filter(ee.Filter.eq('NAME', 'Kazimzumbwi'));  //Kazimzumbwi
var kazimzumbwi = empty.paint({featureCollection: PA_Kazimzumbwi, color: 'FF0000', width: 3 });
Map.addLayer(vikindu,{palette: '00ff00'},'Vikindu FR',0);
Map.addLayer(pugu,{palette: '00ff00'},'Pugu FNR',0);
Map.addLayer(kazimzumbwi,{palette: '00ff00'},'Kazimzumbwi FR',0);
//=======================================================================================
//======================================================================================
//var mikoa_majina =  [mikoa.reduceColumns(ee.Reducer.toList(), ['Name'])];
//print(mikoa_majina);
//var wilaya_majina =  [mawilaya.reduceColumns(ee.Reducer.toList(), ['Name'])];
//print(wilaya_majina);
var yeara = ee.Date('2017-07-01');
var yearb = ee.Date('2022-06-30');
//==============================================================================================================================================
//==============================================================================================================================================
var modis_ndvi = ee.ImageCollection("MODIS/006/MOD13Q1").filterDate(yeara, yearb).select('NDVI');
var modis_evi = ee.ImageCollection("MODIS/006/MOD13Q1").filterDate(yeara, yearb).select('EVI');
var modis_lst_day = ee.ImageCollection('MODIS/006/MOD11A1').filterDate(yeara, yearb).select('LST_Day_1km');
//var modis_lst_day_b = function(img) { return img.multiply(0.02).subtract(273.15); }
//var modis_lst_day_c = modis_lst_day.map(modis_lst_day_b);
var modis_lst_night = ee.ImageCollection('MODIS/006/MOD11A1').filterDate(yeara, yearb).select('LST_Night_1km');
//modis_lst_night = modis_lst_night.multiply(0.02).subtract(273.15);
var modis_ssm = ee.ImageCollection("NASA_USDA/HSL/soil_moisture").filterDate(yeara, yearb).select('ssm');
var modis_susm = ee.ImageCollection("NASA_USDA/HSL/soil_moisture").filterDate(yeara, yearb).select('susm');
var modis_fire = firms.filterDate(yeara, yearb).select('T21');
var modis_fire_ba = ba.filterDate(yeara, yearb);
//----------------------------------------------------------------------------------------------------------------------------------------------
var modis_ndvi_clip = modis_ndvi.mean().clip(urt_eez).multiply(0.0001);
var modis_evi_clip = modis_evi.mean().clip(urt_eez).multiply(0.0001);
var modis_lst_clip = modis_lst_day.mean().clip(urt_eez).multiply(0.02);
var modis_lst_night_clip = modis_lst_night.mean().clip(urt_eez).multiply(0.02);
var modis_ssm_clip = modis_ssm.mean().clip(urt_eez);
var modis_susm_clip = modis_susm.mean().clip(urt_eez);
var modis_fire_clip = modis_fire.count().clip(urt_eez);
var modis_fire_ba_clip = modis_fire_ba.mean().clip(wilaya);
//---------------------------------------------------------------------------------------------------------------------------------------
//https://github.com/gee-community/ee-palettes
var palettes = require('users/gena/packages:palettes');
var NDVI_Vis = { min: -2000, max: 10000, palette: [
    'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901', '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
    '012E01', '011D01', '011301' ], };
//----------------------------------------------------------------------------------------------------------------------------------------------
Map.addLayer(modis_ndvi_clip,NDVI_Vis,'Mean NDVI',0);
Map.addLayer(modis_evi_clip,NDVI_Vis,'Mean EVI',0);
Map.addLayer(modis_lst_clip,{},'Mean LST-DAY',0);
Map.addLayer(modis_lst_night_clip,{},'Mean LST-NIGHT',0);
Map.addLayer(modis_ssm_clip,{},'Mean SSM',0);
Map.addLayer(modis_susm_clip,{},'Mean SUSM',0);
Map.addLayer(modis_fire_clip,{},'Fire Incidences',0);
//Map.addLayer(modis_susm_clip,{},'Mean SUSM',0);
//======================================================================================== 
//Display Vector Data (Boundaries)
Map.addLayer(Tanzania,{palette: '555555'},'Tanzania + EEZ',0);
Map.addLayer(dodoma,{palette: '0000ff'},'Dodoma',0);
Map.addLayer(dom_city,{palette: '000000'},'Dodoma City',1);
Map.addLayer(dom_tree_planting, {color: 'green', fillColor: '00000000'},'Tree Planting Sites',1);
Map.addLayer(modis_fire_ba, {color: 'red', fillColor: '00000000'},'Burned Area (2017-2020)',0);
//==============================================================================================================================================
//==============================================================================================================================================
// Create User Interface portion
// Create a panel to hold our widgets.
var panel = ui.Panel();
panel.style().set('width', '400px');
// Create an intro panel with labels.
var introa = ui.Panel([ ui.Label({ value: 'Greening Dodoma', style: {fontSize: '40px', fontWeight: 'bold', position: 'top-center'}}) ]);
panel.add(introa);
var introb = ui.Panel([ ui.Label({ value: 'Tree Planting - Monitoring from Space', style: {fontSize: '30px', fontWeight: 'bold'}}) ]);
panel.add(introb);
// On Click results.
var jira = ui.Panel([ ui.Label({ value: 'Click a point on the map to inspect NDVI, Land Surface Temperature and Soil Moisture ...', style: {fontSize: '15px', fontWeight: 'bold'}}) ]);
panel.add(jira);
//The Descricptions
var maelezo_a = ui.Panel([ ui.Label({ value: 
              'Normalized Difference Vegetation Index(NDVI):  A simple indicator that can be used to analyze remote sensing measurements, often from a space platform, assessing whether or not the target being observed contains live green vegetation.', style: {fontSize: '12px', }}) ]);
var maelezo_b = ui.Panel([ ui.Label({ value: 
              'Enhanced vegetation index (EVI): An optimized vegetation index designed to enhance the vegetation signal with improved sensitivity in high biomass regions and improved vegetation monitoring through a de-coupling of the canopy background signal and a reduction in atmosphere influences.', style: {fontSize: '12px', }}) ]);
var maelezo_c = ui.Panel([ ui.Label({ value: 
              'Land Surface Temperature(LST-Day): Is how hot the “surface” of the Earth would feel to the touch in a particular location during day-time.', style: {fontSize: '12px', }}) ]);
var maelezo_d = ui.Panel([ ui.Label({ value: 
              'Land Surface Temperature(LST-Night): Is how hot the “surface” of the Earth would feel to the touch in a particular location during night-time.', style: {fontSize: '12px', }}) ]);
var maelezo_e = ui.Panel([ ui.Label({ value: 
              'Soil Moisture(SM): Plays an important role in surface energy balances, regional runoff, potential drought and crop yield.', style: {fontSize: '12px', }}) ]);
var maelezo_f = ui.Panel([ ui.Label({ value: 
              'Sub-Surface Soil Moisture(SSM): Plays an important role in sub-surface energy balances, regional runoff, potential drought and crop yield.', style: {fontSize: '12px', }}) ]);
var maelezo_g = ui.Panel([ ui.Label({ value: 
              'Fire: The Fire Information for Resource Management System (FIRMS) distributes Near Real-Time (NRT) active fire data within 3 hours of satellite observation from both the Moderate Resolution Imaging Spectroradiometer (MODIS) and the Visible Infrared Imaging Radiometer Suite (VIIRS).', style: {fontSize: '12px', }}) ]);
// panels to hold lon/lat values
var lon = ui.Label();
var lat = ui.Label();
panel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
// Register a callback on the default map to be invoked when the map is clicked
Map.onClick(function(coords)
{
  // Update the lon/lat panel with values from the click event.
  lon.setValue('Longitude: ' + coords.lon.toFixed(5)),
  lat.setValue('Latitude: ' + coords.lat.toFixed(5));
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  // Create an MODIS NDSI chart..multiply(0.02).subtract(273.15)
  var modis_ndvi_Chart = ui.Chart.image.series(modis_ndvi, point, ee.Reducer.mean(), 250);
  modis_ndvi_Chart.setOptions({ title: 'MODIS - Normalized Difference Vegetation Index(NDVI)', vAxis: {title: 'NDVI(x0.0001)', maxValue: 1, minValue: -1},hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}}, });
  //The Descricptions
  //panel.widgets().set(11, maelezo_a);
  var evi_Chart = ui.Chart.image.series(modis_evi, point, ee.Reducer.mean(), 250);
  evi_Chart.setOptions({ title: 'MODIS - Enhanced Vegetation Index', vAxis: {title: 'EVI(x0.0001)', maxValue: 1, minValue: -1},hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}}, });
  //The Descricptions
  //panel.widgets().set(11, maelezo_b);
  var modis_lst_day_Chart = ui.Chart.image.series(modis_lst_day, point, ee.Reducer.mean(), 250);
  modis_lst_day_Chart.setOptions({ title: 'MODIS Land Surface Temperature - DAY', vAxis: {title: 'LST-DAY(x0.02) Kelvin', maxValue: 17000, minValue: 14000},hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}}, });
  //The Descricptions
  //panel.widgets().set(11, maelezo_c);
  var modis_lst_night_Chart = ui.Chart.image.series(modis_lst_night, point, ee.Reducer.mean(), 250);
  modis_lst_night_Chart.setOptions({ title: 'MODIS Land Surface Temperature - NIGHT', vAxis: {title: 'LST-NIGHT(x0.02) Kelvin', maxValue: 15000, minValue: 14000},hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}}, });
  //The Descricptions
  //panel.widgets().set(11, maelezo_d);
  var modis_ssm_Chart = ui.Chart.image.series(modis_ssm, point, ee.Reducer.mean(), 250);
  modis_ssm_Chart.setOptions({ title: 'MODIS Surface Soil Moisture', vAxis: {title: 'SSM', maxValue: 1, minValue: -1},hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}}, });
  //The Descricptions
  //panel.widgets().set(11, maelezo_e);
  var modis_susm_Chart = ui.Chart.image.series(modis_susm, point, ee.Reducer.mean(), 250);
  modis_susm_Chart.setOptions({ title: 'MODIS Sub Surface Soil Moisture', vAxis: {title: 'SuSSM', maxValue: 1, minValue: -1},hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}}, });
  //The Descricptions
  //panel.widgets().set(11, maelezo_f);
  var modis_fire_Chart = ui.Chart.image.series(modis_fire, point, ee.Reducer.count(), 250);
  modis_fire_Chart.setOptions({ title: 'MODIS Wildfire Activities', vAxis: {title: 'Fire Incidences', maxValue: 0, minValue: 2},hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}}, });
  //The Descricptions
  //panel.widgets().set(11, maelezo_g);
  panel.widgets().set(4, modis_ndvi_Chart);
  panel.widgets().set(5, evi_Chart);
  panel.widgets().set(6, modis_lst_day_Chart);
  panel.widgets().set(7, modis_lst_night_Chart);
  panel.widgets().set(8, modis_ssm_Chart);
  panel.widgets().set(9, modis_susm_Chart);
  panel.widgets().set(10, modis_fire_Chart);
  panel.widgets().set(11, maelezo_a);
  panel.widgets().set(12, maelezo_b);
  panel.widgets().set(13, maelezo_c);
  panel.widgets().set(14, maelezo_d);
  panel.widgets().set(15, maelezo_f);
  panel.widgets().set(16, maelezo_g);
  //panel.widgets().set(7, maelezo_h);
});
Map.style().set('cursor', 'crosshair');
// Add the panel to the ui.root.
ui.root.insert(0, panel);