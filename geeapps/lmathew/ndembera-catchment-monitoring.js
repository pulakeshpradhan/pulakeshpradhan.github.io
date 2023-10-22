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
    ndembera = ui.import && ui.import("ndembera", "table", {
      "id": "users/lmathew/Freshwater/ndembera_catchment_2018"
    }) || ee.FeatureCollection("users/lmathew/Freshwater/ndembera_catchment_2018"),
    sources = ui.import && ui.import("sources", "table", {
      "id": "users/lmathew/Freshwater/vyanzo_nya_maji_2020"
    }) || ee.FeatureCollection("users/lmathew/Freshwater/vyanzo_nya_maji_2020"),
    ndembera_6_villages_lup = ui.import && ui.import("ndembera_6_villages_lup", "table", {
      "id": "users/lmathew/Freshwater/ndembera_6_villages_lup"
    }) || ee.FeatureCollection("users/lmathew/Freshwater/ndembera_6_villages_lup"),
    Vijiji_LU = ui.import && ui.import("Vijiji_LU", "table", {
      "id": "users/lmathew/Freshwater/Vijiji_LU"
    }) || ee.FeatureCollection("users/lmathew/Freshwater/Vijiji_LU"),
    firms = ui.import && ui.import("firms", "imageCollection", {
      "id": "FIRMS"
    }) || ee.ImageCollection("FIRMS");
Map.centerObject(ndembera,10);
//----------------------------------------------------------------------------------------
var empty = ee.Image().byte();
var kidakio = empty.paint({featureCollection: ndembera, color: '0000FF', width: 3 });
var mkoa = mikoa.filter(ee.Filter.eq('Name', 'Iringa')); 
var iringa = empty.paint({featureCollection: mkoa, color: '000000', width: 4 });
var wilaya = mawilaya.filter(ee.Filter.eq('Name', 'Mufindi'));
var mufindi = empty.paint({featureCollection: wilaya, color: '000000', width: 3 });
var vijiji = empty.paint({featureCollection: ndembera_6_villages_lup, color: '000000', width: 1 });
var vijiji_vote = empty.paint({featureCollection: Vijiji_LU, color: '000000', width: 2 });
var vyanzo = empty.paint({featureCollection: sources, color: '0000FF', width: 2 });
//=======================================================================================
//======================================================================================
//var mikoa_majina =  [mikoa.reduceColumns(ee.Reducer.toList(), ['Name'])];
//print(mikoa_majina);
//var wilaya_majina =  [mawilaya.reduceColumns(ee.Reducer.toList(), ['Name'])];
//print(wilaya_majina);
var yeara = ee.Date('2010-01-01');
var yearb = ee.Date('2020-06-30');
//==============================================================================================================================================
//==============================================================================================================================================
var modis_ndvi = ee.ImageCollection("MODIS/006/MOD13Q1").filterDate(yeara, yearb).select('NDVI');
var modis_evi = ee.ImageCollection("MODIS/006/MOD13Q1").filterDate(yeara, yearb).select('EVI');
var modis_lst_day = ee.ImageCollection('MODIS/006/MOD11A1').filterDate(yeara, yearb).select('LST_Day_1km');
var modis_lst_night = ee.ImageCollection('MODIS/006/MOD11A1').filterDate(yeara, yearb).select('LST_Night_1km');
var modis_ssm = ee.ImageCollection("NASA_USDA/HSL/soil_moisture").filterDate(yeara, yearb).select('ssm');
var modis_susm = ee.ImageCollection("NASA_USDA/HSL/soil_moisture").filterDate(yeara, yearb).select('susm');
var modis_fire = firms.filterDate(yeara, yearb).select('T21');
//var modis_susm = ee.ImageCollection("NASA_USDA/HSL/soil_moisture").filterDate(yeara, yearb).select('susm');
//----------------------------------------------------------------------------------------------------------------------------------------------
var modis_ndvi_clip = modis_ndvi.mean().clip(ndembera).multiply(0.0001);
var modis_evi_clip = modis_evi.mean().clip(ndembera).multiply(0.0001);
var modis_lst_clip = modis_lst_day.mean().clip(ndembera).multiply(0.02);
var modis_lst_night_clip = modis_lst_night.mean().clip(ndembera).multiply(0.02);
var modis_ssm_clip = modis_ssm.mean().clip(ndembera);
var modis_susm_clip = modis_susm.mean().clip(ndembera);
var modis_fire_clip = modis_fire.count().clip(ndembera);
//var modis_susm_clip = modis_susm.mean().clip(ndembera);
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
Map.addLayer(vyanzo,{palette: '00ff00'},'Water Sources',0);
Map.addLayer(vijiji,{palette: 'ff00ff'},'Villages',0);
Map.addLayer(vijiji_vote,{palette: 'ffff00'},'6 Villages',1);
Map.addLayer(mufindi,{palette: 'ff0000'},'Mufindi',0);
Map.addLayer(kidakio,{palette: '0000ff'},'Ndembera Catchment',1);
Map.addLayer(iringa,{palette: '000000'},'Iringa',1);
Map.addLayer(dom_tree_planting,{color: 'green', fillColor: '00000000'},'Tree Planting Sites',1);
//==============================================================================================================================================
//==============================================================================================================================================
// Create User Interface portion
// Create a panel to hold our widgets.
var panel = ui.Panel();
panel.style().set('width', '400px');
// Create an intro panel with labels.
var introa = ui.Panel([ ui.Label({ value: 'Ndembera Catchment', style: {fontSize: '40px', fontWeight: 'bold', position: 'top-center'}}) ]);
panel.add(introa);
var introb = ui.Panel([ ui.Label({ value: 'Monitoring from Space', style: {fontSize: '30px', fontWeight: 'bold'}}) ]);
panel.add(introb);
// On Click results.
var jira = ui.Panel([ ui.Label({ value: 'Click a point on the map to inspect NDVI, Land Surface Temperature and Soil Moisture ...', style: {fontSize: '15px', fontWeight: 'bold'}}) ]);
panel.add(jira);
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
  var modis_ndvi_Chart = ui.Chart.image.series(modis_ndvi, point, ee.Reducer.mean(), 500);
  modis_ndvi_Chart.setOptions({ title: 'MODIS - Normalized Difference Vegetation Index(NDVI)', vAxis: {title: 'NDVI(x0.0001)', maxValue: 1, minValue: -1},hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}}, });
  var evi_Chart = ui.Chart.image.series(modis_evi, point, ee.Reducer.mean(), 500);
  evi_Chart.setOptions({ title: 'MODIS - Enhanced Vegetation Index', vAxis: {title: 'EVI(x0.0001)', maxValue: 1, minValue: -1},hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}}, });
  var modis_lst_day_Chart = ui.Chart.image.series(modis_lst_day, point, ee.Reducer.mean(), 500);
  modis_lst_day_Chart.setOptions({ title: 'MODIS Land Surface Temperature - DAY', vAxis: {title: 'LST-DAY(x0.02) Kelvin', maxValue: 20000, minValue: 10000},hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}}, });
  var modis_lst_night_Chart = ui.Chart.image.series(modis_lst_night, point, ee.Reducer.mean(), 500);
  modis_lst_night_Chart.setOptions({ title: 'MODIS Land Surface Temperature - NIGHT', vAxis: {title: 'LST-NIGHT(x0.02) Kelvin', maxValue: 20000, minValue: 10000},hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}}, });
  var modis_ssm_Chart = ui.Chart.image.series(modis_ssm, point, ee.Reducer.mean(), 500);
  modis_ssm_Chart.setOptions({ title: 'MODIS Surface Soil Moisture', vAxis: {title: 'SSM', maxValue: 1, minValue: -1},hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}}, });
  var modis_susm_Chart = ui.Chart.image.series(modis_susm, point, ee.Reducer.mean(), 500);
  modis_susm_Chart.setOptions({ title: 'MODIS Sub Surface Soil Moisture', vAxis: {title: 'SuSSM', maxValue: 1, minValue: -1},hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}}, });
  var modis_fire_Chart = ui.Chart.image.series(modis_fire, point, ee.Reducer.count(), 500);
  modis_fire_Chart.setOptions({ title: 'MODIS Wildfire Activities', vAxis: {title: 'Fire Incidences', maxValue: 0, minValue: 2},hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}}, });
  panel.widgets().set(4, modis_ndvi_Chart);
  panel.widgets().set(5, evi_Chart);
  panel.widgets().set(6, modis_lst_day_Chart);
  panel.widgets().set(7, modis_lst_night_Chart);
  panel.widgets().set(8, modis_ssm_Chart);
  panel.widgets().set(9, modis_susm_Chart);
  panel.widgets().set(10, modis_fire_Chart);
});
Map.style().set('cursor', 'crosshair');
// Add the panel to the ui.root.
ui.root.insert(0, panel);