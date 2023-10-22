var countries = ui.import && ui.import("countries", "table", {
      "id": "USDOS/LSIB_SIMPLE/2017"
    }) || ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017"),
    ndvi_modis = ui.import && ui.import("ndvi_modis", "imageCollection", {
      "id": "MODIS/006/MOD13A1"
    }) || ee.ImageCollection("MODIS/006/MOD13A1"),
    dom_tree_planting = ui.import && ui.import("dom_tree_planting", "table", {
      "id": "users/lmathew/Freshwater/DODOMA_TREE_PLANTING-SITE_COORDINATES"
    }) || ee.FeatureCollection("users/lmathew/Freshwater/DODOMA_TREE_PLANTING-SITE_COORDINATES"),
    firms = ui.import && ui.import("firms", "imageCollection", {
      "id": "FIRMS"
    }) || ee.ImageCollection("FIRMS"),
    CHIRPS = ui.import && ui.import("CHIRPS", "imageCollection", {
      "id": "UCSB-CHG/CHIRPS/DAILY"
    }) || ee.ImageCollection("UCSB-CHG/CHIRPS/DAILY"),
    s1 = ui.import && ui.import("s1", "imageCollection", {
      "id": "COPERNICUS/S1_GRD"
    }) || ee.ImageCollection("COPERNICUS/S1_GRD"),
    s2 = ui.import && ui.import("s2", "imageCollection", {
      "id": "COPERNICUS/S2_SR"
    }) || ee.ImageCollection("COPERNICUS/S2_SR"),
    s3 = ui.import && ui.import("s3", "imageCollection", {
      "id": "COPERNICUS/S3/OLCI"
    }) || ee.ImageCollection("COPERNICUS/S3/OLCI"),
    s5co = ui.import && ui.import("s5co", "imageCollection", {
      "id": "COPERNICUS/S5P/OFFL/L3_CO"
    }) || ee.ImageCollection("COPERNICUS/S5P/OFFL/L3_CO"),
    s5sd = ui.import && ui.import("s5sd", "imageCollection", {
      "id": "COPERNICUS/S5P/OFFL/L3_SO2"
    }) || ee.ImageCollection("COPERNICUS/S5P/OFFL/L3_SO2"),
    s5no = ui.import && ui.import("s5no", "imageCollection", {
      "id": "COPERNICUS/S5P/OFFL/L3_NO2"
    }) || ee.ImageCollection("COPERNICUS/S5P/OFFL/L3_NO2"),
    ls8 = ui.import && ui.import("ls8", "imageCollection", {
      "id": "LANDSAT/LO08/C01/T1"
    }) || ee.ImageCollection("LANDSAT/LO08/C01/T1"),
    bahari = ui.import && ui.import("bahari", "imageCollection", {
      "id": "NASA/OCEANDATA/MODIS-Aqua/L3SMI"
    }) || ee.ImageCollection("NASA/OCEANDATA/MODIS-Aqua/L3SMI"),
    wdpa = ui.import && ui.import("wdpa", "table", {
      "id": "WCMC/WDPA/current/polygons"
    }) || ee.FeatureCollection("WCMC/WDPA/current/polygons"),
    kwando = ui.import && ui.import("kwando", "table", {
      "id": "users/lmathew/Zambia/Kwando_BHRC"
    }) || ee.FeatureCollection("users/lmathew/Zambia/Kwando_BHRC"),
    vidakio = ui.import && ui.import("vidakio", "table", {
      "id": "users/lmathew/Zambia/Kwando_BHRC_Regions"
    }) || ee.FeatureCollection("users/lmathew/Zambia/Kwando_BHRC_Regions"),
    kaza = ui.import && ui.import("kaza", "table", {
      "id": "users/lmathew/Zambia/kaza_tbl"
    }) || ee.FeatureCollection("users/lmathew/Zambia/kaza_tbl"),
    terraclimate = ui.import && ui.import("terraclimate", "imageCollection", {
      "id": "IDAHO_EPSCOR/TERRACLIMATE"
    }) || ee.ImageCollection("IDAHO_EPSCOR/TERRACLIMATE");
var map = ui.Map();
var mwakaA = ''; 
var mwakaB = ''; 
var picha_a = '';
var geom = null;
var geom_cbo = null;
var geomjina = '';
map.centerObject(kwando,6);
//----------------------------------------------------------------------------------------
var empty = ee.Image().byte(); //TZ	TZA	834
var kwando2 = empty.paint({featureCollection: kwando, color: 1, width: 1 });
var kaza2 = empty.paint({featureCollection: kaza, color: 1, width: 1 });
var zam_wdpa_a = ee.FeatureCollection(wdpa.filter(ee.Filter.eq('SUB_LOC', 'ZM')));
var zam_wdpa_b = empty.paint({featureCollection: zam_wdpa_a, color: 1, width: 1 });
///////////////////////////////////////////////////////////////////////////////////////////
//Forest Cannopy Height - https://glad.umd.edu/dataset/gedi/
var forestcanopyheight = ee.ImageCollection('users/potapovpeter/GEDI_V27').filterBounds(kwando);
forestcanopyheight = forestcanopyheight.mean().clip(kwando);
var fch_Vis = { min: 0, max: 30, palette: [ 'FFFFFF',  '006600' ], };
map.addLayer(forestcanopyheight,fch_Vis,'Forest Canopy Height 2019',0);
///////////////////////////////////////////////////////////////////////////////////////////
//Display Vector Data (Boundaries)
map.addLayer(kaza2,{palette: 'ff0000'}, 'Kaza',1);
map.addLayer(kwando2,{palette: '0000ff'},'Kwando',1);
map.addLayer(zam_wdpa_b,{palette: '00ff00'},'URT-WDPAs',0);
//=======================================================================================
//=======================================================================================
var yeara = ee.Date('2010-01-01');
var yearb = ee.Date('2020-06-30');
var yearc = ee.Date('2018-07-01');
var yeard = ee.Date('2020-06-30');
var months = ee.List.sequence(1, 12);
var years = ee.List.sequence(2015, 2020);
//==============================================================================================================================================
//==============================================================================================================================================
var modis_ndvi = ee.ImageCollection("MODIS/006/MOD13Q1").filterDate(yeara, yearb).filterBounds(kwando).select('NDVI');
var modis_evi = ee.ImageCollection("MODIS/006/MOD13Q1").filterDate(yeara, yearb).filterBounds(kwando).select('EVI');
var modis_lst_day = ee.ImageCollection('MODIS/006/MOD11A1').filterDate(yeara, yearb).filterBounds(kwando).select('LST_Day_1km');
var modis_lst_night = ee.ImageCollection('MODIS/006/MOD11A1').filterDate(yeara, yearb).filterBounds(kwando).select('LST_Night_1km');
var modis_ssm = ee.ImageCollection("NASA_USDA/HSL/soil_moisture").filterDate(yeara, yearb).filterBounds(kwando).select('ssm');
var modis_susm = ee.ImageCollection("NASA_USDA/HSL/soil_moisture").filterDate(yeara, yearb).filterBounds(kwando).select('susm');
var modis_fire = firms.filterDate(yeara, yearb).select('T21');
var chirps_pre = CHIRPS.filterDate(yeara, yearb);//.select('susm');
var tca = terraclimate.filterDate(yeara, yearb).filterBounds(kwando);
//----------------------------------------------------------------------------------------------------------------------------------------------
var s1a = s1.filterDate(yeara, yearb).filterBounds(kwando).filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
            .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH')).filter(ee.Filter.eq('instrumentMode', 'IW'));
var s2a = s2.filterDate(yeara, yearb).filterBounds(kwando).select('B[1-7]');
var baharia = bahari.filterDate(yeara, yearb).filterBounds(kwando);
var ls8a = ls8.filterDate(yeara, yearb).filterBounds(kwando).select('B[1-7]');
var s5coa = s5co.filterDate(yearc, yeard).filterBounds(kwando);
var s5sda = s5sd.filterDate(yearc, yeard).filterBounds(kwando);
var s5noa = s5no.filterDate(yearc, yeard).filterBounds(kwando);
//==============================================================================================================================================
//==============================================================================================================================================
var modis_ndvi_clip = modis_ndvi.mean().clip(kwando).multiply(0.0001);
var modis_evi_clip = modis_evi.mean().clip(kwando).multiply(0.0001);
var modis_lst_clip = modis_lst_day.mean().clip(kwando).multiply(0.02);
var modis_lst_night_clip = modis_lst_night.mean().clip(kwando).multiply(0.02);
var modis_ssm_clip = modis_ssm.mean().clip(kwando);
var modis_susm_clip = modis_susm.mean().clip(kwando);
var modis_fire_clip = modis_fire.count().clip(kwando);
var chirps_pre_clip = chirps_pre.mean().clip(kwando);
//---------------------------------------------------------------------------------------------------------------------------------------
var s5cob = s5coa.mean().clip(kwando);
var s5sdb = s5sda.mean().clip(kwando);
var s5nob = s5noa.mean().clip(kwando);
var ls8b = ls8a.mean().clip(kwando);
//==============================================================================================================================================
//==============================================================================================================================================
//https://github.com/gee-community/ee-palettes
var palettes = require('users/gena/packages:palettes');
//----------------------------------------------------------------------------------------------------------------------------------------------
//map.addLayer(modis_ndvi_clip,NDVI_Vis,'Mean NDVI',0);
//map.addLayer(modis_evi_clip,NDVI_Vis,'Mean EVI',0);
//map.addLayer(modis_lst_clip,{},'Mean LST-DAY',0);
//map.addLayer(modis_lst_night_clip,{},'Mean LST-NIGHT',0);
//map.addLayer(modis_ssm_clip,{},'Mean SSM',0);
//map.addLayer(modis_susm_clip,{},'Mean SUSM',0);
//map.addLayer(modis_fire_clip,{},'Fire Incidences',0);
//Map.addLayer(chirps_pre_clip,{},'Mean Precipitation',0);
//----------------------------------------------------------------------------------------------------------------------------------------------
//map.addLayer(s1b, {min: [-25, -20, -25], max: [0, 10, 0]}, 'Sentinel 1(RGB->VH-VV-VH)',0);
//==============================================================================================================================================
//==============================================================================================================================================
// Create User Interface portion
// Create a panel to hold our widgets.
var panel = ui.Panel();
panel.style().set('width', '250px');
// Create an intro panel with labels.
var intro = ui.Panel([ ui.Label({ value: 'Spatial-Temporal Results', style: {fontSize: '20px', fontWeight: 'bold', position: 'top-center'}}) ]);
panel.add(intro);
// On Click results.
var jira = ui.Panel([ ui.Label({ value: 'Click a Point on the Map ...', style: {fontSize: '15px', fontWeight: 'bold', stretch:'horizontal'}}) ]);
panel.add(jira);
// panels to hold lon/lat values
var lon = ui.Label();
var lat = ui.Label();
panel.add(ui.Panel([lon], ui.Panel.Layout.flow('horizontal')));
panel.add(ui.Panel([lat], ui.Panel.Layout.flow('horizontal')));
///////////////////////////////////////////////////////////////////////////
//Graph Panel
var panel_grafu = ui.Panel({ style: { width: '350px',position: 'top-right', padding: '10px 10px' } });
var chart_grafu = ui.Panel({ style: { width: '350px',position: 'bottom-left', padding: '10px 10px' } });
//////////////////////////////////////////////////////////////////////////
//Miaka
//var miaka = ee.List(["2015","2016","2017","2018","2019","2020"]);
var mwaka_int = ee.List.sequence(2001, 2020);
var mwaka_function = function(number) { return ee.String(number).slice(0,4); };
var chagua_mwaka = mwaka_int.map(mwaka_function);
//Start Year
var chagua_mwaka_a = ui.Select([],'Loading ...');   
chagua_mwaka.evaluate(function(mwakaa)
{
  chagua_mwaka_a.items().reset(mwakaa);
  chagua_mwaka_a.setPlaceholder('Select Start Year')
  chagua_mwaka_a.onChange(function(mwakaa)
  {
    mwakaA = mwakaa + '-01' + '-01';
  })
})
//Start Year
var chagua_mwaka_b = ui.Select([],'Loading ...');   
chagua_mwaka.evaluate(function(mwakaa)
{
  chagua_mwaka_b.items().reset(mwakaa);
  chagua_mwaka_b.setPlaceholder('Select End Year')
  chagua_mwaka_b.onChange(function(mwakaa)
  {
    mwakaB = mwakaa + '-12'+ '-31';
  })
})
///////////////////////////////////////////////////////////////////////////////////////////////////////////
// Load Catchments
var kidakio_majina = ee.List(["1","2","3","4","5","6","7","8"]);
var chagua_kidakio = ui.Select([],'Loading ...');   
kidakio_majina.evaluate(function(kidakioa)
{
  chagua_kidakio.items().reset(kidakioa);
  chagua_kidakio.setPlaceholder('Select a Catchment')
  chagua_kidakio.onChange(function(kidakioa)
  {
    var kidakiob = ee.Number.parse(kidakioa);
    var geom_a = vidakio.filter(ee.Filter.eq('GRUOP2_OPT', kidakiob));
    var geom_b = empty.paint({featureCollection: geom_a.geometry(), width: 3});
    map.addLayer(geom_b,{palette: '000000'},'Catchment No: ' + kidakioa);
    map.centerObject(geom_a);
    geomjina = kidakioa;
    geom = geom_a;
    print(geom.geometry())
  })
})
//////////////////////////////////////////////////////////////////////////
//Satellite Data
var chagua_data = ee.List(["Drought","Evapotranspiration","Climate Water Deficit",
                            "S5-Carbon Monoxide","S5-Sulpher Dioxide","S5-Nitrogen Dioxide",
                            "MODIS-Fire","MODIS-NDVI","MODIS-EVI",
                            "MODIS-LST-Day","MODIS-LST-Night","MODIS-SSM",
                            "MODIS-SuSM","Precipitation",]);
//-----------------------------------------------------------------------------
var chagua_sat = ui.Select([],'Loading ...');
// Load Platform
chagua_data.evaluate(function(dataa)
{
  chagua_sat.items().reset(dataa);
  chagua_sat.setPlaceholder('Select Data Type')
  chagua_sat.onChange(function(dataa)
  {
    // once you select a state (onChange) get all counties and fill the dropdown
    //countiesDD.setPlaceholder('Loading...')
    print('ok');
  })
})
///////////////////////////////////////////////////////////////////////////////////////////////////////////
//-------------------------------------------------------------------------------------------------------
// Separator
var kitenganishi = ui.Label({ value: '-------------',style: {fontSize: '5px', stretch:'horizontal'}});
var pichadown = ui.Label();
var chora_sasa  = ui.Button({label: '==- LG(Graph it!) -==', style: { margin:'5px', stretch:'horizontal'},  onClick: bonyezo,});
var chora_bonde  = ui.Button({label: '==- Kwando Basin -==', style: { margin:'5px', stretch:'horizontal', position: 'bottom-center' },  onClick: bonyezo_bonde,});
//-------------------------------------------------------------------------------------------------------
chagua_kidakio.style().set({textAlign:'center', stretch:'horizontal', margin:'5px'});
panel.add(chagua_kidakio);
chagua_sat.style().set({textAlign:'center', stretch:'horizontal', margin:'5px'});
panel.add(chagua_sat);
chagua_mwaka_a.style().set({textAlign:'center', stretch:'horizontal', margin:'5px'});
panel.add(chagua_mwaka_a);
chagua_mwaka_b.style().set({textAlign:'center', stretch:'horizontal', margin:'5px'});
panel.add(chagua_mwaka_b);
panel.add(chora_sasa);
panel.add(kitenganishi);
panel.add(chora_bonde);
/////////////////////////////////////////////////////////////////////////////////////////////////////////
// Register a callback on the default map to be invoked when the map is clicked
map.onClick(function(coords)
{
  panel_grafu.clear();
  chart_grafu.clear();
  picha_a = chagua_sat.getValue();
  // Update the lon/lat panel with values from the click event.
  lon.setValue('Longitude: ' + coords.lon.toFixed(5)),
  lat.setValue('Latitude: ' + coords.lat.toFixed(5));
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var eneoJ  = point.buffer(100);
  var jira = empty.paint({featureCollection: eneoJ, color: 1, width: 5 });
  map.addLayer(jira ,{palette: 'FFFF00'}, "Point!");
//Imagesextract
  if(picha_a === "Drought")
  {
    var tc_Chart = ui.Chart.image.series(tca.select('pdsi'), point, ee.Reducer.mean(), 500);
    tc_Chart.setOptions({ title: 'Drought', vAxis: {title: 'Index', maxValue: 1000, minValue: -1000},hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}}, });
    panel_grafu.widgets().set(1, tc_Chart);
  }
  else if(picha_a === "Evapotranspiration")
  {
    var aet_Chart = ui.Chart.image.series(tca.select('aet'), point, ee.Reducer.mean(), 250);
    aet_Chart.setOptions({ title: 'Evapotranspiration', vAxis: {title: 'mm', maxValue: 1000, minValue: 0},hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}}, });
    panel_grafu.widgets().set(1, aet_Chart);
  }
  if(picha_a === "Climate Water Deficit")
  {
    var def_Chart = ui.Chart.image.series(tca.select('def'), point, ee.Reducer.mean(), 250);
    def_Chart.setOptions({ title: 'Landsat 8 OLI - B1->B7', vAxis: {title: 'mm', maxValue: 1, minValue: -1},hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}}, });
    panel_grafu.widgets().set(1, def_Chart);
  }
  else if(picha_a === "S5-Carbon Monoxide")
  {
    var s5coa_Chart = ui.Chart.image.series(s5coa.select("CO_column_number_density"), point, ee.Reducer.mean(), 250);
    s5coa_Chart.setOptions({ title: 'Sentinel 5 - Carbon Monoxide', vAxis: {title: 'mol/m^2', maxValue: 1, minValue: -1},hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}}, });
    panel_grafu.widgets().set(1, s5coa_Chart);
  }
  else if(picha_a === "S5-Sulpher Dioxide")
  {                                                     
    var s5sda_Chart = ui.Chart.image.series(s5sda.select("SO2_column_number_density"), point, ee.Reducer.mean(), 250);
    s5sda_Chart.setOptions({ title: 'Sentinel 5 - Sulpher Dioxide', vAxis: {title: 'mol/m^2', maxValue: 0, minValue: 2},hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}}, });
    panel_grafu.widgets().set(1, s5sda_Chart);
  }
  else if(picha_a === "S5-Nitrogen Dioxide")
  {
    var s5noa_Chart = ui.Chart.image.series(s5noa.select("NO2_column_number_density"), point, ee.Reducer.mean(), 250);
    s5noa_Chart.setOptions({ title: 'Sentinel 5 - Nitrogen Dioxide', vAxis: {title: 'mol/m^2', maxValue: 0, minValue: 2},hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}}, });
    panel_grafu.widgets().set(1, s5noa_Chart);
  }
  //=====================================================================================================
  else if(picha_a === "MODIS-NDVI")
  {
    var modis_ndvi_Chart = ui.Chart.image.series(modis_ndvi, point, ee.Reducer.mean(), 250);
    modis_ndvi_Chart.setOptions({ title: 'MODIS - Normalized Difference Vegetation Index(NDVI)', vAxis: {title: 'NDVI(x0.0001)', maxValue: 1, minValue: -1},hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}}, });
    panel_grafu.widgets().set(1, modis_ndvi_Chart);
  }
  else if(picha_a === "MODIS-EVI")
  {
    var evi_Chart = ui.Chart.image.series(modis_evi, point, ee.Reducer.mean(), 250);
    evi_Chart.setOptions({ title: 'MODIS - Enhanced Vegetation Index', vAxis: {title: 'EVI(x0.0001)', maxValue: 1, minValue: -1},hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}}, });
    panel_grafu.widgets().set(1, evi_Chart);
  }
  else if(picha_a === "MODIS-LST-Day")
  {
    var modis_lst_day_Chart = ui.Chart.image.series(modis_lst_day, point, ee.Reducer.mean(), 250);
    modis_lst_day_Chart.setOptions({ title: 'MODIS Land Surface Temperature - DAY', vAxis: {title: 'LST-DAY(x0.02) Kelvin', maxValue: 20000, minValue: 10000},hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}}, });
    panel_grafu.widgets().set(1, modis_lst_day_Chart);
  }
  else if(picha_a === "MODIS-LST-Night")
  {
    var modis_lst_night_Chart = ui.Chart.image.series(modis_lst_night, point, ee.Reducer.mean(), 250);
    modis_lst_night_Chart.setOptions({ title: 'MODIS Land Surface Temperature - NIGHT', vAxis: {title: 'LST-NIGHT(x0.02) Kelvin', maxValue: 20000, minValue: 10000},hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}}, });
    panel_grafu.widgets().set(1, modis_lst_night_Chart);
  }
  else if(picha_a === "MODIS-SSM")
  {
    var modis_ssm_Chart = ui.Chart.image.series(modis_ssm, point, ee.Reducer.mean(), 250);
    modis_ssm_Chart.setOptions({ title: 'MODIS Surface Soil Moisture', vAxis: {title: 'SSM', maxValue: 1, minValue: -1},hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}}, });
    panel_grafu.widgets().set(1, modis_ssm_Chart);
  }
  else if(picha_a === "MODIS-SuSM")
  {
    var modis_susm_Chart = ui.Chart.image.series(modis_susm, point, ee.Reducer.mean(), 250);
    modis_susm_Chart.setOptions({ title: 'MODIS Sub Surface Soil Moisture', vAxis: {title: 'SuSSM', maxValue: 1, minValue: -1},hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}}, });
    panel_grafu.widgets().set(1, modis_susm_Chart);
  }
  else if(picha_a === "MODIS-Fire")
  {                                                     
    var modis_fire_Chart = ui.Chart.image.series(modis_fire, point, ee.Reducer.count(), 250);
    modis_fire_Chart.setOptions({ title: 'MODIS Wildfire Activities', vAxis: {title: 'Fire Incidences', maxValue: 0, minValue: 2},hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}}, });
    panel_grafu.widgets().set(1, modis_fire_Chart);
  }
  else if(picha_a === "Precipitation")
  {
    var chirps_pre_Chart = ui.Chart.image.series(chirps_pre, point, ee.Reducer.sum(), 250);
    chirps_pre_Chart.setOptions({ title: 'CHIRPS-Precipitation (Estimations)', vAxis: {title: 'mm/day', maxValue: 0, minValue: 2},hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}}, });
    panel_grafu.widgets().set(1, chirps_pre_Chart);
  }
  else
  {
    alert('Select Data type, Left-the first dropdown box');
  }
});
//=================================================================================================
///////////////////////////////////////////////////////////////////////////////////////////////////
//=================================================================================================
//Function for selected Wards or Catchments
function vidakio_out(eneo,jinalaneo,picha_a,mwakaAa,mwakaBb)
{
  var rangi = ['1a3678', '2955bc', '5699ff', '8dbae9', 'acd1ff', 'caebff', 'e5f9ff','fdffb4', 'ffe6a2', 'ffc969', 'ffa12d', 'ff7c1f', 'ca531a', 'ff0000','ab0000'];
  var rangib = ["ff3508","d8ff04","06700e"];
  var mwakaAaBa = mwakaAa + ' to ' + mwakaBb;
  if(picha_a === "Drought")
  {
    var tc = terraclimate.filterDate(mwakaAa,mwakaBb).filterBounds(kwando).select('pdsi');
    tc = tc.median().clip(eneo);
    var options = { title: jinalaneo + ': Drought - '+ mwakaAaBa, fontSize: 12, hAxis: {title: 'Pixels'}, vAxis: {title: 'Index'}, hAxis: {title: 'Pixel'}, legend: 'none', lineWidth: 1, pointSize: 4 };
    var histogram = ui.Chart.image.histogram(tc, eneo, 1000).setOptions(options);
    panel_grafu.widgets().set(1, histogram);   // Display the histogram.
    var stats = tc.reduceRegion({reducer: ee.Reducer.minMax(), geometry: eneo,scale:500,maxPixels:1e9,crs:"EPSG:4326",bestEffort: true});
    var vizualize = tc.visualize({min: stats.get("pdsi_min"), max: stats.get("pdsi_max"),palette: rangi });
    map.addLayer(vizualize,rangi, jinalaneo + ': Drought - '+ mwakaAaBa,1);
    picha(eneo, vizualize, jinalaneo);
  }
  else if(picha_a === "Evapotranspiration")
  {
    var tc = terraclimate.filterDate(mwakaAa,mwakaBb).filterBounds(kwando).select('aet');
    tc = tc.median().clip(eneo).multiply(0.1);
    var options = { title: jinalaneo + ': Evapotranspiration - '+ mwakaAaBa, fontSize: 12, hAxis: {title: 'Pixels'}, vAxis: {title: 'Index'}, hAxis: {title: 'Pixel'}, legend: 'none', lineWidth: 1, pointSize: 4 };
    var histogram = ui.Chart.image.histogram(tc, eneo, 1000).setOptions(options);
    panel_grafu.widgets().set(1, histogram);   // Display the histogram.
    var stats = tc.reduceRegion({reducer: ee.Reducer.minMax(), geometry: eneo,scale:1000,maxPixels:1e9,crs:"EPSG:4326",bestEffort: true});
    var vizualize = tc.visualize({min: stats.get("aet_min"), max: stats.get("aet_max"),palette: rangi });
    map.addLayer(vizualize,rangi, jinalaneo + ': Drought - '+ mwakaAaBa,1);
    picha(eneo, vizualize, jinalaneo);
  }
  if(picha_a === "Climate Water Deficit")
  {
    var tc = terraclimate.filterDate(mwakaAa,mwakaBb).filterBounds(kwando).select('def');
    tc = tc.median().clip(eneo);
    var options = { title: jinalaneo + ': Climate Water Deficit - '+ mwakaAaBa, fontSize: 12, hAxis: {title: 'Pixels'}, vAxis: {title: 'Index'}, hAxis: {title: 'Pixel'}, legend: 'none', lineWidth: 1, pointSize: 4 };
    var histogram = ui.Chart.image.histogram(tc, eneo, 1000).setOptions(options);
    panel_grafu.widgets().set(1, histogram);   // Display the histogram.
    var stats = tc.reduceRegion({reducer: ee.Reducer.minMax(), geometry: eneo,scale:1000,maxPixels:1e9,crs:"EPSG:4326",bestEffort: true});
    var vizualize = tc.visualize({min: stats.get("def_min"), max: stats.get("def_max"),palette: rangi });
    map.addLayer(vizualize,rangi, jinalaneo + ': Drought - '+ mwakaAaBa,1);
    picha(eneo, vizualize, jinalaneo);
  }
  else if(picha_a === "S5-Carbon Monoxide")
  {
    var s5coa = s5co.filterDate(mwakaAa, mwakaBb).filterBounds(kwando).select("CO_column_number_density");
    s5coa = s5coa.median().clip(eneo);
    var options = { title: jinalaneo + ': Sentinel 5 - Carbon Monoxide - '+ mwakaAaBa, fontSize: 12, hAxis: {title: 'mol/m^2'}, vAxis: {title: 'Index'}, hAxis: {title: 'Pixel'}, legend: 'none', lineWidth: 1, pointSize: 4 };
    var histogram = ui.Chart.image.histogram(s5coa, eneo, 1000).setOptions(options);
    panel_grafu.widgets().set(1, histogram);   // Display the histogram.
    var stats = s5coa.reduceRegion({reducer: ee.Reducer.minMax(), geometry: eneo,scale:1000,maxPixels:1e9,crs:"EPSG:4326",bestEffort: true});
    var vizualize = s5coa.visualize({min: stats.get("CO_column_number_density_min"), max: stats.get("CO_column_number_density_max"),palette: rangib });
    map.addLayer(vizualize,rangib, jinalaneo + ': Carbon Monoxide - '+ mwakaAaBa,1);
    picha(eneo, vizualize, jinalaneo);
  }
  else if(picha_a === "S5-Sulpher Dioxide")
  {                    
    var s5sda = s5sd.filterDate(mwakaAa, mwakaBb).filterBounds(kwando).select("SO2_column_number_density");
    s5sda = s5sda.median().clip(eneo);
    var options = { title: jinalaneo + ': Sentinel 5 - Sulpher Dioxide - '+ mwakaAaBa, fontSize: 12, hAxis: {title: 'mol/m^2'}, vAxis: {title: 'Index'}, hAxis: {title: 'Pixel'}, legend: 'none', lineWidth: 1, pointSize: 4 };
    var histogram = ui.Chart.image.histogram(s5sda, eneo, 1000).setOptions(options);
    panel_grafu.widgets().set(1, histogram);   // Display the histogram.
    var stats = s5sda.reduceRegion({reducer: ee.Reducer.minMax(), geometry: eneo,scale:1000,maxPixels:1e9,crs:"EPSG:4326",bestEffort: true});
    var vizualize = s5sda.visualize({min: stats.get("SO2_column_number_density_min"), max: stats.get("SO2_column_number_density_max"),palette: rangib });
    map.addLayer(vizualize,rangib, jinalaneo + ': Sulpher Dioxide - '+ mwakaAaBa,1);
    picha(eneo, vizualize, jinalaneo);
  }
  else if(picha_a === "S5-Nitrogen Dioxide")
  {
    var s5noa = s5no.filterDate(mwakaAa, mwakaBb).filterBounds(kwando).select("NO2_column_number_density");
    s5noa = s5noa.median().clip(eneo);
    var options = { title: jinalaneo + ': Sentinel 5 - Nitrogen Dioxide - '+ mwakaAaBa, fontSize: 12, hAxis: {title: 'mol/m^2'}, vAxis: {title: 'Index'}, hAxis: {title: mwakaAaBa}, legend: 'none', lineWidth: 1, pointSize: 4 };
    var histogram = ui.Chart.image.histogram(s5noa, eneo, 1000).setOptions(options);
    panel_grafu.widgets().set(1, histogram);   // Display the histogram.
    var stats = s5noa.reduceRegion({reducer: ee.Reducer.minMax(), geometry: eneo,scale:1000,maxPixels:1e9,crs:"EPSG:4326",bestEffort: true});
    var vizualize = s5noa.visualize({min: stats.get("NO2_column_number_density_min"), max: stats.get("NO2_column_number_density_max"),palette: rangib });
    map.addLayer(vizualize,rangib, jinalaneo + ': Nitrogen Dioxide - '+ mwakaAaBa,1);
    picha(eneo, vizualize, jinalaneo);
  }
  //=====================================================================================================
  else if(picha_a === "MODIS-NDVI")
  {
    var modis_ndvi = ee.ImageCollection("MODIS/006/MOD13Q1").filterBounds(kwando).filterDate(mwakaAa, mwakaBb).select('NDVI');
    modis_ndvi = modis_ndvi.median().clip(eneo).multiply(0.0001);
    var options = { title: jinalaneo + ': MODIS - NDVI - '+ mwakaAaBa, fontSize: 12, hAxis: {title: 'NDVI'}, vAxis: {title: 'Index'}, hAxis: {title: 'Pixel'}, legend: 'none', lineWidth: 1, pointSize: 4 };
    var histogram = ui.Chart.image.histogram(modis_ndvi, eneo, 1000).setOptions(options);
    panel_grafu.widgets().set(1, histogram);   // Display the histogram.
    var stats = modis_ndvi.reduceRegion({reducer: ee.Reducer.minMax(), geometry: eneo,scale:1000,maxPixels:1e9,crs:"EPSG:4326",bestEffort: true});
    var vizualize = modis_ndvi.visualize({min: stats.get("NDVI_min"), max: stats.get("NDVI_max"),palette: rangib });
    map.addLayer(vizualize,rangib, jinalaneo + ': MODIS - NDVI  - '+ mwakaAaBa,1);
    picha(eneo, vizualize, jinalaneo);
  }
  else if(picha_a === "MODIS-EVI")
  {
    var modis_evi = ee.ImageCollection("MODIS/006/MOD13Q1").filterDate(mwakaAa, mwakaBb).filterBounds(kwando).select('EVI');
    modis_evi = modisa_ndvi.median().clip(eneo).multiply(0.0001);
    var options = { title: jinalaneo + ': MODIS - EVI - '+ mwakaAaBa, fontSize: 12, hAxis: {title: 'NDVI'}, vAxis: {title: 'Index'}, hAxis: {title: 'Pixel'}, legend: 'none', lineWidth: 1, pointSize: 4 };
    var histogram = ui.Chart.image.histogram(modis_evi, eneo, 1000).setOptions(options);
    panel_grafu.widgets().set(1, histogram);   // Display the histogram.
    var stats = modis_evi.reduceRegion({reducer: ee.Reducer.minMax(), geometry: eneo,scale:1000,maxPixels:1e9,crs:"EPSG:4326",bestEffort: true});
    var vizualize = modis_evi.visualize({min: stats.get("EVI_min"), max: stats.get("EVI_max"),palette: rangib });
    map.addLayer(vizualize,rangib, jinalaneo + ': MODIS - EVI  - '+ mwakaAaBa,1);
    picha(eneo, vizualize, jinalaneo);
  }
  else if(picha_a === "MODIS-LST-Day")
  {
    var modis_lst_day = ee.ImageCollection('MODIS/006/MOD11A1').filterDate(mwakaAa, mwakaBb).filterBounds(kwando).select('LST_Day_1km');
    modis_lst_day = modis_lst_day.median().clip(eneo).multiply(0.02);
    var options = { title: jinalaneo + ': MODIS Land Surface Temperature - DAY - '+ mwakaAaBa, fontSize: 12, hAxis: {title: ''}, vAxis: {title: '°K'}, hAxis: {title: 'Pixel'}, legend: 'none', lineWidth: 1, pointSize: 4 };
    var histogram = ui.Chart.image.histogram(modis_lst_day, eneo, 1000).setOptions(options);
    panel_grafu.widgets().set(1, histogram);   // Display the histogram.
    var stats = modis_lst_day.reduceRegion({reducer: ee.Reducer.minMax(), geometry: eneo,scale:1000,maxPixels:1e9,crs:"EPSG:4326",bestEffort: true});
    var vizualize = modis_lst_day.visualize({min: stats.get("LST_Day_1km_min"), max: stats.get("LST_Day_1km_max"),palette: rangib });
    map.addLayer(vizualize,rangib, jinalaneo + ': MODIS - LST-Day  - '+ mwakaAaBa,1);
    picha(eneo, vizualize, jinalaneo);
  }
  else if(picha_a === "MODIS-LST-Night")
  {
    var modis_lst_night = ee.ImageCollection('MODIS/006/MOD11A1').filterDate(mwakaAa, mwakaBb).filterBounds(kwando).select('LST_Night_1km');
    modis_lst_night = modis_lst_night.median().clip(eneo).multiply(0.02);
    var options = { title: jinalaneo + ': MODIS Land Surface Temperature - NIGHT - '+ mwakaAaBa, fontSize: 12, hAxis: {title: ''}, vAxis: {title: '°K'}, hAxis: {title: 'Pixel'}, legend: 'none', lineWidth: 1, pointSize: 4 };
    var histogram = ui.Chart.image.histogram(modis_lst_night, eneo, 1000).setOptions(options);
    panel_grafu.widgets().set(1, histogram);   // Display the histogram.
    var stats = modis_lst_night.reduceRegion({reducer: ee.Reducer.minMax(), geometry: eneo,scale:1000,maxPixels:1e9,crs:"EPSG:4326",bestEffort: true});
    var vizualize = modis_lst_night.visualize({min: stats.get("LST_Night_1km_min"), max: stats.get("LST_Night_1km_max"),palette: rangib });
    map.addLayer(vizualize,rangib, jinalaneo + ': MODIS - LST-Night  - '+ mwakaAaBa,1);
    picha(eneo, vizualize, jinalaneo);
  }
  else if(picha_a === "MODIS-SSM")
  {
    var modis_ssm = ee.ImageCollection("NASA_USDA/HSL/soil_moisture").filterDate(mwakaAa, mwakaBb).filterBounds(kwando).select('ssm');
    modis_ssm = modis_ssm.median().clip(eneo);
    var options = { title: jinalaneo + ': MODIS Surface Soil Moisture - '+ mwakaAaBa, fontSize: 12, hAxis: {title: 'mm'}, vAxis: {title: 'Pixel'}, hAxis: {title: 'Pixel'}, legend: 'none', lineWidth: 1, pointSize: 4 };
    var histogram = ui.Chart.image.histogram(modis_ssm, eneo, 1000).setOptions(options);
    panel_grafu.widgets().set(1, histogram);   // Display the histogram.
    var stats = modis_ssm.reduceRegion({reducer: ee.Reducer.minMax(), geometry: eneo,scale:1000,maxPixels:1e9,crs:"EPSG:4326",bestEffort: true});
    var vizualize = modis_ssm.visualize({min: stats.get("ssm_min"), max: stats.get("ssm_max"),palette: rangib });
    map.addLayer(vizualize,rangib, jinalaneo + ': MODIS - SSM - '+ mwakaAaBa,1);
    picha(eneo, vizualize, jinalaneo);
  }
  else if(picha_a === "MODIS-SuSM")
  {
    var modis_susm = ee.ImageCollection("NASA_USDA/HSL/soil_moisture").filterDate(mwakaAa, mwakaBb).filterBounds(kwando).select('susm');
    modis_susm = modis_susm.median().clip(eneo);
    var options = { title: jinalaneo + ': MODIS Sub Surface Soil Moisture - '+ mwakaAaBa, fontSize: 12, hAxis: {title: 'mm'}, vAxis: {title: 'Pixel'}, hAxis: {title: 'Pixel'}, legend: 'none', lineWidth: 1, pointSize: 4 };
    var histogram = ui.Chart.image.histogram(modis_susm, eneo, 1000).setOptions(options);
    panel_grafu.widgets().set(1, histogram);   // Display the histogram.
    var stats = modis_susm.reduceRegion({reducer: ee.Reducer.minMax(), geometry: eneo,scale:1000,maxPixels:1e9,crs:"EPSG:4326",bestEffort: true});
    var vizualize = modis_susm.visualize({min: stats.get("susm_min"), max: stats.get("susm_max"),palette: rangib });
    map.addLayer(vizualize,rangib, jinalaneo + ': MODIS - Sub SSM - '+ mwakaAaBa,1);
    picha(eneo, vizualize, jinalaneo);
  }
  else if(picha_a === "MODIS-Fire")
  { 
    var modis_fire = firms.filterDate(mwakaAa, mwakaBb).filterBounds(kwando).select('T21');
    modis_fire = modis_fire.sum().clip(eneo);
    var options = { title: jinalaneo + ': MODIS Wildfire Activities - '+ mwakaAaBa, fontSize: 12, hAxis: {title: 'Fire Incidences'}, vAxis: {title: 'Pixel'}, hAxis: {title: 'Pixel'}, legend: 'none', lineWidth: 1, pointSize: 4 };
    var histogram = ui.Chart.image.histogram(modis_fire, eneo, 1000).setOptions(options);
    panel_grafu.widgets().set(1, histogram);   // Display the histogram.
    var stats = modis_fire.reduceRegion({reducer: ee.Reducer.minMax(), geometry: eneo,scale:1000,maxPixels:1e9,crs:"EPSG:4326",bestEffort: true});
    var vizualize = modis_fire.visualize({min: stats.get("T21_min"), max: stats.get("T21_max"),palette: rangib });
    map.addLayer(vizualize,rangib, jinalaneo + ': MODIS - Fire - '+ mwakaAaBa,1);
    picha(eneo, vizualize, jinalaneo);
  }
  else if(picha_a === "Precipitation")
  {
    var chirps_prea = CHIRPS.filterDate(mwakaAa, mwakaBb).filterBounds(kwando);//.select('susm');
    chirps_pre = chirps_pre.median().clip(eneo);
    var options = { title: jinalaneo + ': CHIRPS-Precipitation (Estimations) - '+ mwakaAaBa, fontSize: 12, hAxis: {title: 'mm/day'}, vAxis: {title: 'Pixel'}, hAxis: {title: 'Pixel'}, legend: 'none', lineWidth: 1, pointSize: 4 };
    var histogram = ui.Chart.image.histogram(chirps_pre, eneo, 1000).setOptions(options);
    panel_grafu.widgets().set(1, histogram);   // Display the histogram.
    var stats = chirps_pre.reduceRegion({reducer: ee.Reducer.minMax(), geometry: eneo,scale:1000,maxPixels:1e9,crs:"EPSG:4326",bestEffort: true});
    var vizualize = chirps_pre.visualize({min: stats.get("precipitation_min"), max: stats.get("precipitation_max"),palette: rangib });
    map.addLayer(vizualize,rangib, jinalaneo + ': CHIRPS-Precipitation (Estimations) - ' + mwakaAaBa,1);
    picha(eneo, vizualize, jinalaneo);
  }
}
//=================================================================================================
function bonyezo()
{
  panel_grafu.clear();
  //chart_grafu.clear();
  var picha_a = chagua_sat.getValue();
  vidakio_out(geom,geomjina,picha_a,mwakaA,mwakaB);
}
function bonyezo_bonde()
{
  panel_grafu.clear();
  //chart_grafu.clear();
  var picha_a = chagua_sat.getValue();
  vidakio_out(kwando,'Kwando Basin',picha_a,mwakaA,mwakaB);
  map.centerObject(kwando,6);
}
//--------------------------------------------------------------------------
function picha(eneo_sasa, ndvi_to_jpeg, jina_sasa)
{
  var img_bound = ee.Geometry.Polygon(eneo_sasa.geometry().transform('epsg:4326').coordinates());
  var downloadArgsRGB = {dimensions:1024,region:img_bound, format:"jpg"};
  var urlrgb = ndvi_to_jpeg.getDownloadURL(downloadArgsRGB);
  var urlLabelrgb = ui.Label('Download - ' + jina_sasa, {shown: false});
  urlLabelrgb.setUrl(urlrgb);
  urlLabelrgb.style().set({shown: true});
  panel_grafu.widgets().set(2, urlLabelrgb);
  //panel.add(urlLabelrgb);
}
//=================================================================================================
map.setControlVisibility({zoomControl: true});
map.setControlVisibility({layers: true});
var title = ui.Label('Kwando Basin Health Report Card', {
stretch: 'horizontal', textAlign: 'center', fontWeight: 'bold', fontSize: '30px' });
// Create a grid of maps.
var mapGrid = ui.Panel(
[
panel,
ui.Panel(map, null, {stretch: 'both'}),
],
ui.Panel.Layout.Flow('horizontal'), {width: '100%', stretch: 'both'}
);
map.add(panel_grafu);
//map.add(chart_grafu);
ui.root.widgets().reset([title, mapGrid]);
ui.root.setLayout(ui.Panel.Layout.Flow('vertical'));
map.style().set('cursor', 'crosshair');
// Add the panel to the ui.root.i
//ui.root.insert(0, panel);