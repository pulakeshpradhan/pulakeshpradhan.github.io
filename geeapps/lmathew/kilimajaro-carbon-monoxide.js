var tza = ui.import && ui.import("tza", "table", {
      "id": "users/lmathew/Share/TZA"
    }) || ee.FeatureCollection("users/lmathew/Share/TZA"),
    wilayaa = ui.import && ui.import("wilayaa", "table", {
      "id": "users/lmathew/tza_districts"
    }) || ee.FeatureCollection("users/lmathew/tza_districts"),
    mikoaa = ui.import && ui.import("mikoaa", "table", {
      "id": "users/lmathew/tza_regions"
    }) || ee.FeatureCollection("users/lmathew/tza_regions"),
    co = ui.import && ui.import("co", "imageCollection", {
      "id": "COPERNICUS/S5P/OFFL/L3_CO"
    }) || ee.ImageCollection("COPERNICUS/S5P/OFFL/L3_CO"),
    imageCollection = ui.import && ui.import("imageCollection", "imageCollection", {
      "id": "COPERNICUS/S5P/NRTI/L3_NO2"
    }) || ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_NO2"),
    mknp_raw = ui.import && ui.import("mknp_raw", "table", {
      "id": "users/lmathew/Kilimanjaro/Kilimanjaro_NP"
    }) || ee.FeatureCollection("users/lmathew/Kilimanjaro/Kilimanjaro_NP");
var mk = ee.FeatureCollection("users/lmathew/Kilimanjaro/mk_radius_50km");
// get the layer with all countries
var countries = tza;
Map.centerObject(mk,10);
// get the data NO
var y2019co = ee.ImageCollection("COPERNICUS/S5P/OFFL/L3_CO").filterDate("2019-01-01","2021-12-31");
var y2022co = ee.ImageCollection("COPERNICUS/S5P/OFFL/L3_CO").filterDate("2022-01-01","2022-12-31");
// get the data CO
var y2019conrt = ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_CO").filterDate("2019-01-01","2021-12-31");
var y2022conrt = ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_CO").filterDate("2022-01-01","2022-12-31");
// get the data FIRMS
var y2019fire = ee.ImageCollection('MODIS/006/MCD64A1').filterDate('2000-01-01','2021-12-31');
var y2022fire = ee.ImageCollection("FIRMS").filterDate('2022-01-01','2022-12-31');
//ESA Landcover
var landcover = ee.Image("COPERNICUS/Landcover/100m/Proba-V-C3/Global/2019").select('discrete_classification');
//=================================================================================================================================
var tupu = ee.Image().byte();
var nchi = tupu.paint({featureCollection: tza, color: 1, width: 3 });
var mikoab = tupu.paint({featureCollection: mikoaa, color: 2, width: 2 });
var wilayab = tupu.paint({featureCollection: wilayaa, color: 3, width: 1 });
var mka = tupu.paint({featureCollection: mk, color: 1, width: 5 });
var mknp = tupu.paint({featureCollection: mknp_raw, color: 1, width: 2 });
//===============================================
// create a map
var maps = []; 
// define names for the band combinations
var map = ui.Map();
    //map.addLayer(nchi,{},'Tanzania +EEZ',true);
    map.setControlVisibility(true);
    maps.push(map);
var map = ui.Map(); 
    //map.addLayer(nchi,{},'Tanzania +EEZ',true);
    map.setControlVisibility(true);
    maps.push(map);
//===============================================
// create a title.
var title = ui.Label('Mt. Kilimanjaro World Heritage Site (WHS) - Fire (Bushfire/Wildfire)', { stretch: 'horizontal', textAlign: 'center', fontWeight: 'bold', fontSize: '24px' });
var maelezo = ui.Label('DESCRIPTION: The near real-time (NRT) active fire locations and history of burned areas as processed by LANCE. ', { stretch: 'horizontal', textAlign: 'justify', fontWeight: 'regular', fontSize: '12px' });
var ziada = ui.Label('Developed by lmathew@wwftz.org', { stretch: 'horizontal', textAlign: 'center', fontWeight: 'bold', fontSize: '14px' });
// create a grid of maps.
var mapGrid = ui.Panel(
  [
    ui.Panel([maps[0]], null, {stretch: 'both'}),
    ui.Panel([maps[1]], null, {stretch: 'both'}),
  ],
  ui.Panel.Layout.Flow('horizontal'), {stretch: 'both'}
);
// add the maps and title to the ui.root
ui.root.widgets().reset([title,maelezo, mapGrid,ziada]);
ui.root.setLayout(ui.Panel.Layout.Flow('vertical'));
// Create a panel with vertical flow layout.
// center the maps near Santa Cruz
ui.Map.Linker(maps, 'change-bounds');
var co_band_viz = { min: 0, max: 0.05, palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red'] };
var firesVis = { min: 100, max: 2000,palette: ['red', 'orange', 'yellow']};
var burnedAreaVis = {min: 0,max: 100,palette: ['4e0400', '951003', 'c61503', 'ff1901'],};
maps[0].addLayer(y2019co.max().select("CO_column_number_density").clip(mk),co_band_viz,"CO 2019-2021",0);
maps[1].addLayer(y2022co.max().select("CO_column_number_density").clip(mk),co_band_viz,"CO 2022",0);
maps[0].addLayer(y2019conrt.max().select("CO_column_number_density").clip(mk),co_band_viz,"CO-NRT 2019-2021",0);
maps[1].addLayer(y2022conrt.max().select("CO_column_number_density").clip(mk),co_band_viz,"CO-NRT 2022",0);
//Landcover 2019
maps[0].addLayer(landcover.clip(mk),{},"Landcover (2019)",0);
maps[1].addLayer(landcover.clip(mk),{},"Landcover (2019)",0);
//Moto History
maps[0].addLayer(y2019fire.sum().select('BurnDate').clip(mk),burnedAreaVis,"FIRMS Fire (2000-2019)",1);
maps[0].addLayer(y2022fire.sum().select('T21').clip(mk),firesVis,"FIRMS Fire (2022)",0);
//Moto October 2020
maps[1].addLayer(y2019fire.sum().select('BurnDate').clip(mk),burnedAreaVis,"FIRMS Fire (2000-2019)",0);
maps[1].addLayer(y2022fire.sum().select('T21').clip(mk),firesVis,"FIRMS Fire (2022)",1);
maps[0].addLayer(wilayab,{},'Districts(Wilaya)',false);
maps[1].addLayer(wilayab,{},'Districts(Wilaya)',false);
maps[0].addLayer(mikoab,{},'Regions(Mikoa)',false);
maps[1].addLayer(mikoab,{},'Regions(Mikoa)',false);
maps[0].addLayer(nchi,{},'Tanzania +EEZ',0);
maps[1].addLayer(nchi,{},'Tanzania +EEZ',0);
maps[0].addLayer(mka,{palette: ['blue']},'Kilimanjaro (50Km Radius)',true);
maps[1].addLayer(mka,{palette: ['blue']},'Kilimanjaro (50Km Radius)',true);
maps[0].addLayer(mknp,{palette: ['magenta']},'Mt. Kilimanjaro WHS',true);
maps[1].addLayer(mknp,{palette: ['magenta']},'Mt. Kilimanjaro WHS',true);
var title_a = ui.Label('History (2000-2021)', { stretch: 'horizontal', textAlign: 'center', fontWeight: 'bold', fontSize: '30px' });
title_a.style().set('position', 'bottom-left');
maps[0].add(title_a);
var title_b = ui.Label('NRT 2022', { stretch: 'horizontal', textAlign: 'center', fontWeight: 'bold', fontSize: '30px' });
title_b.style().set('position', 'bottom-left');
maps[1].add(title_b);
maps[0].centerObject(mk,9);
maps[1].centerObject(mk,9);