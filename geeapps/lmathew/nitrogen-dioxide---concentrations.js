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
    }) || ee.ImageCollection("COPERNICUS/S5P/OFFL/L3_CO");
// get the layer with all countries
var countries = tza;
Map.centerObject(tza,6);
// get the data NO
var y2019 = ee.ImageCollection("COPERNICUS/S5P/OFFL/L3_NO2").filterDate("2019-03-01","2019-03-31");
var y2020 = ee.ImageCollection("COPERNICUS/S5P/OFFL/L3_NO2").filterDate("2020-03-01","2020-03-31");
// get the data CO
var y2019co = ee.ImageCollection("COPERNICUS/S5P/OFFL/L3_CO").filterDate("2019-03-01","2019-03-31");
var y2020co = ee.ImageCollection("COPERNICUS/S5P/OFFL/L3_CO").filterDate("2020-03-01","2020-03-31");
// add layers to map
//Map.addLayer(y2019.max().select("NO2_column_number_density").clip(countries),{min:0.00002,max:0.0005,palette:"lightblue,orange,yellow,red,purple"},"March 2019");
//Map.addLayer(y2020.max().select("NO2_column_number_density").clip(countries),{min:0.00002,max:0.0005,palette:"lightblue,orange,yellow,red,purple"},"March 2020");
var tupu = ee.Image().byte();
var nchi = tupu.paint({featureCollection: tza, color: 1, width: 3 });
var mikoab = tupu.paint({featureCollection: mikoaa, color: 2, width: 2 });
var wilayab = tupu.paint({featureCollection: wilayaa, color: 3, width: 1 });
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
var title = ui.Label('Tanzania Nitrogen Dioxide (Concentrations Comparison)', { stretch: 'horizontal', textAlign: 'center', fontWeight: 'bold', fontSize: '24px' });
var maelezo = ui.Label(
  'DESCRIPTION: Nitrogen dioxide (NO2) and nitrogen oxide (NO) together are usually referred to as nitrogen oxides (NOx = NO + NO2). They are important trace gases in the Earth’s atmosphere, present in both the troposphere and the stratosphere. They enter the atmosphere as a result of anthropogenic activities (notably fossil fuel combustion and biomass burning) and natural processes (such as microbiological processes in soils, wildfires and lightning).', 
{ stretch: 'horizontal', textAlign: 'justify', fontWeight: 'regular', fontSize: '12px' });
var ziada = ui.Label('Modified from OpenGeoBlog by lmathew@wwftz.org', { stretch: 'horizontal', textAlign: 'center', fontWeight: 'bold', fontSize: '14px' });
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
//maps[0].addLayer(y2019co.max().select("CO_column_number_density").clip(countries),{min:0,max:5,palette:"lightblue,orange,yellow,red,purple"},"CO March 2019");
//maps[1].addLayer(y2020co.max().select("CO_column_number_density").clip(countries),{min:0,max:5,palette:"lightblue,orange,yellow,red,purple"},"CO March 2020");
maps[0].addLayer(y2019.max().select("NO2_column_number_density").clip(countries),{min:0.00002,max:0.0005,palette:"lightblue,orange,yellow,red,purple"},"NO March 2019");
maps[1].addLayer(y2020.max().select("NO2_column_number_density").clip(countries),{min:0.00002,max:0.0005,palette:"lightblue,orange,yellow,red,purple"},"NO March 2020");
maps[0].addLayer(wilayab,{},'Districts(Wilaya)',false);
maps[1].addLayer(wilayab,{},'Districts(Wilaya)',false);
maps[0].addLayer(mikoab,{},'Regions(Mikoa)',false);
maps[1].addLayer(mikoab,{},'Regions(Mikoa)',false);
maps[0].addLayer(nchi,{},'Tanzania +EEZ',true);
maps[1].addLayer(nchi,{},'Tanzania +EEZ',true);
var title_a = ui.Label('March 2019', { stretch: 'horizontal', textAlign: 'center', fontWeight: 'bold', fontSize: '30px' });
title_a.style().set('position', 'bottom-left');
maps[0].add(title_a);
var title_b = ui.Label('March 2020', { stretch: 'horizontal', textAlign: 'center', fontWeight: 'bold', fontSize: '30px' });
title_b.style().set('position', 'bottom-left');
maps[1].add(title_b);
maps[0].centerObject(tza,5.5);
maps[1].centerObject(tza,5.5);