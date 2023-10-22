var p86 = ui.import && ui.import("p86", "image", {
      "id": "users/biogeoscienceslaboxford/005_packsaddle_1986"
    }) || ee.Image("users/biogeoscienceslaboxford/005_packsaddle_1986"),
    p98 = ui.import && ui.import("p98", "image", {
      "id": "users/biogeoscienceslaboxford/005_packsaddle_1998"
    }) || ee.Image("users/biogeoscienceslaboxford/005_packsaddle_1998"),
    p99 = ui.import && ui.import("p99", "image", {
      "id": "users/biogeoscienceslaboxford/005_packsaddle_1999"
    }) || ee.Image("users/biogeoscienceslaboxford/005_packsaddle_1999"),
    p01 = ui.import && ui.import("p01", "image", {
      "id": "users/biogeoscienceslaboxford/005_packsaddle_2001"
    }) || ee.Image("users/biogeoscienceslaboxford/005_packsaddle_2001"),
    p09 = ui.import && ui.import("p09", "image", {
      "id": "users/biogeoscienceslaboxford/005_packsaddle_2009"
    }) || ee.Image("users/biogeoscienceslaboxford/005_packsaddle_2009"),
    p10 = ui.import && ui.import("p10", "image", {
      "id": "users/biogeoscienceslaboxford/005_packsaddle_2010"
    }) || ee.Image("users/biogeoscienceslaboxford/005_packsaddle_2010"),
    p16 = ui.import && ui.import("p16", "image", {
      "id": "users/biogeoscienceslaboxford/005_packsaddle_2016"
    }) || ee.Image("users/biogeoscienceslaboxford/005_packsaddle_2016"),
    p17 = ui.import && ui.import("p17", "image", {
      "id": "users/biogeoscienceslaboxford/005_packsaddle_2017"
    }) || ee.Image("users/biogeoscienceslaboxford/005_packsaddle_2017"),
    p18 = ui.import && ui.import("p18", "image", {
      "id": "users/biogeoscienceslaboxford/005_packsaddle_2018"
    }) || ee.Image("users/biogeoscienceslaboxford/005_packsaddle_2018"),
    p19 = ui.import && ui.import("p19", "image", {
      "id": "users/biogeoscienceslaboxford/005_packsaddle_2019"
    }) || ee.Image("users/biogeoscienceslaboxford/005_packsaddle_2019"),
    pack = ui.import && ui.import("pack", "image", {
      "id": "users/biogeoscienceslaboxford/00_L281PacksaddleBaymodified"
    }) || ee.Image("users/biogeoscienceslaboxford/00_L281PacksaddleBaymodified");
///Beagle Kelp project
// Packsaddle Bay, Cape Horn 
Map.setOptions('SATELLITE');
Map.setControlVisibility(null, null, false, false, false); 
Map.addLayer(pack, {}, 'Packsaddle Bay, from HMS Beagle, 1834');
Map.setCenter(-68.0865, -55.4318, 12);
//Map.addLayer(p86, {palette: '2a9d8f'}, '1986' );
Map.addLayer(p98,{palette: 'e9c46a'}, '1998' );
Map.addLayer(p99,{palette: 'f4a261'}, '1999');
Map.addLayer(p01,{palette: 'e76f51'}, '2001');
//Map.addLayer(p09,{palette: 'ffbe0b'}, '2009');
Map.addLayer(p10,{palette: 'e63946'}, '2010');
//Map.addLayer(p16,{palette: 'a8dadc'}, '2016');
Map.addLayer(p17,{palette: '457b9d'}, '2017');
Map.addLayer(p18,{palette: '1d3557'}, '2018');
Map.addLayer(p19,{palette: 'ffcdb2'}, '2019');
var title = ui.Label({
  value: 'The Beagle Kelp project - Packsaddle Bay, Hardy Peninsula, Cape Horn Archipelago, Chile', 
  style: {    fontSize: '20px',    fontWeight: 'bold',     maxWidth: '320px'  }});
var explore = ui.Label({
  value: 'Click on Layers and explore. Each colour layer is indicating annual satellite-detected kelp canopies. In the background, the first records of kelp areas drawn on Nautical Charts.', 
  style: {    fontSize: '14px',    maxWidth: '320px'  }});
var sources = ui.Label({
  value: 'Sources', 
  style: {    fontSize: '16px',    fontWeight: 'bold',     maxWidth: '320px'  }});
var source1 = ui.Label({
  value: '1986-2010: NDVI derived from Landsat 5 TM.', 
  style: {    fontSize: '14px',      maxWidth: '320px'  }});
var source2 = ui.Label({
  value: '2016-2019: KF derived from Sentinel-2.', 
  style: {    fontSize: '14px',      maxWidth: '350px'  }});
var source3 = ui.Label({
  value: '1834: East Coast of Tierra del Fuego, from HMS Beagle.', 
  style: {    fontSize: '14px',      maxWidth: '350px'  }});
var style_header = {fontSize: '13px',    fontWeight: 'bold',  width:'300px',  maxWidth: '320px', backgroundColor: 'lightblue', padding: '5px', margin: '15px 0 0 10px '};
var subtitle23_link = ui.Label('Main map - The Beagle Kelp Project',style_header , 'https://biogeoscienceslaboxford.users.earthengine.app/view/beaglekelpcharts');
var panel = ui.Panel();
panel.add(title);
panel.add(explore);
panel.add(sources)
panel.add(source3);
panel.add(source1);
panel.add(source2);
panel.add(subtitle23_link)
ui.root.add(panel);