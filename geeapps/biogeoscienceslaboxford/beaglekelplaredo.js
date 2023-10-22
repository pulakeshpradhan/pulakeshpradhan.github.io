var SoM = ui.import && ui.import("SoM", "image", {
      "id": "users/biogeoscienceslaboxford/00_StraitOfMagellan_modified3"
    }) || ee.Image("users/biogeoscienceslaboxford/00_StraitOfMagellan_modified3"),
    l84 = ui.import && ui.import("l84", "image", {
      "id": "users/biogeoscienceslaboxford/003_Laredo_1984"
    }) || ee.Image("users/biogeoscienceslaboxford/003_Laredo_1984"),
    l86 = ui.import && ui.import("l86", "image", {
      "id": "users/biogeoscienceslaboxford/003_Laredo_1986"
    }) || ee.Image("users/biogeoscienceslaboxford/003_Laredo_1986"),
    l96 = ui.import && ui.import("l96", "image", {
      "id": "users/biogeoscienceslaboxford/003_Laredo_1996"
    }) || ee.Image("users/biogeoscienceslaboxford/003_Laredo_1996"),
    l97 = ui.import && ui.import("l97", "image", {
      "id": "users/biogeoscienceslaboxford/003_Laredo_1997"
    }) || ee.Image("users/biogeoscienceslaboxford/003_Laredo_1997"),
    l98 = ui.import && ui.import("l98", "image", {
      "id": "users/biogeoscienceslaboxford/003_Laredo_1998"
    }) || ee.Image("users/biogeoscienceslaboxford/003_Laredo_1998"),
    l99 = ui.import && ui.import("l99", "image", {
      "id": "users/biogeoscienceslaboxford/003_Laredo_1999"
    }) || ee.Image("users/biogeoscienceslaboxford/003_Laredo_1999"),
    l02 = ui.import && ui.import("l02", "image", {
      "id": "users/biogeoscienceslaboxford/003_Laredo_2002"
    }) || ee.Image("users/biogeoscienceslaboxford/003_Laredo_2002"),
    l03 = ui.import && ui.import("l03", "image", {
      "id": "users/biogeoscienceslaboxford/003_Laredo_2003"
    }) || ee.Image("users/biogeoscienceslaboxford/003_Laredo_2003"),
    l04 = ui.import && ui.import("l04", "image", {
      "id": "users/biogeoscienceslaboxford/003_Laredo_2004"
    }) || ee.Image("users/biogeoscienceslaboxford/003_Laredo_2004"),
    l05 = ui.import && ui.import("l05", "image", {
      "id": "users/biogeoscienceslaboxford/003_Laredo_2005"
    }) || ee.Image("users/biogeoscienceslaboxford/003_Laredo_2005"),
    l06 = ui.import && ui.import("l06", "image", {
      "id": "users/biogeoscienceslaboxford/003_Laredo_2006"
    }) || ee.Image("users/biogeoscienceslaboxford/003_Laredo_2006"),
    l07 = ui.import && ui.import("l07", "image", {
      "id": "users/biogeoscienceslaboxford/003_Laredo_2007"
    }) || ee.Image("users/biogeoscienceslaboxford/003_Laredo_2007"),
    l08 = ui.import && ui.import("l08", "image", {
      "id": "users/biogeoscienceslaboxford/003_Laredo_2008"
    }) || ee.Image("users/biogeoscienceslaboxford/003_Laredo_2008"),
    l09 = ui.import && ui.import("l09", "image", {
      "id": "users/biogeoscienceslaboxford/003_Laredo_2009"
    }) || ee.Image("users/biogeoscienceslaboxford/003_Laredo_2009"),
    l10 = ui.import && ui.import("l10", "image", {
      "id": "users/biogeoscienceslaboxford/003_Laredo_2010"
    }) || ee.Image("users/biogeoscienceslaboxford/003_Laredo_2010"),
    l11 = ui.import && ui.import("l11", "image", {
      "id": "users/biogeoscienceslaboxford/003_Laredo_2011"
    }) || ee.Image("users/biogeoscienceslaboxford/003_Laredo_2011"),
    l16 = ui.import && ui.import("l16", "image", {
      "id": "users/biogeoscienceslaboxford/003_laredo_2016"
    }) || ee.Image("users/biogeoscienceslaboxford/003_laredo_2016"),
    l17 = ui.import && ui.import("l17", "image", {
      "id": "users/biogeoscienceslaboxford/003_laredo_2017"
    }) || ee.Image("users/biogeoscienceslaboxford/003_laredo_2017"),
    l18 = ui.import && ui.import("l18", "image", {
      "id": "users/biogeoscienceslaboxford/003_laredo_2018"
    }) || ee.Image("users/biogeoscienceslaboxford/003_laredo_2018"),
    l19 = ui.import && ui.import("l19", "image", {
      "id": "users/biogeoscienceslaboxford/003_laredo_2019"
    }) || ee.Image("users/biogeoscienceslaboxford/003_laredo_2019");
///Beagle Kelp project
//Peninsula Laredo, Strait of Magellan
Map.setOptions('SATELLITE');
Map.setControlVisibility(null, null, false, false, false);
Map.addLayer(SoM, {}, 'Part of the Strait of Magellan, from HMS Beagle, 1834');
Map.setCenter(-70.7499, -52.8937, 11);
//Map.addLayer(l84, {palette: '264653'}, '1984' );
Map.addLayer(l86, {palette: '2a9d8f'}, '1986' );
Map.addLayer(l96,{palette: 'e9c46a'}, '1996' );
Map.addLayer(l97,{palette: 'f4a261'}, '1997');
Map.addLayer(l98,{palette: 'e76f51'}, '1998');
Map.addLayer(l99,{palette: 'e63946'}, '1999');
Map.addLayer(l02,{palette: 'a8dadc'}, '2002');
Map.addLayer(l03,{palette: '457b9d'}, '2003');
Map.addLayer(l04,{palette: '1d3557'}, '2004');
Map.addLayer(l05,{palette: 'ffcdb2'}, '2005');
Map.addLayer(l06,{palette: 'ffbe0b'}, '2006');
Map.addLayer(l07,{palette: 'fb5607'}, '2007');
Map.addLayer(l08,{palette: 'ff006e'}, '2008');
Map.addLayer(l09,{palette: '8338ec'}, '2009');
Map.addLayer(l10,{palette: '9b5de5'}, '2010');
Map.addLayer(l11,{palette: 'f15bb5'}, '2011');
Map.addLayer(l16,{palette: 'fee440'}, '2016');
Map.addLayer(l17,{palette: '00bbf9'}, '2017');
Map.addLayer(l18,{palette: '00f5d4'}, '2018');
Map.addLayer(l19,{palette: 'ff9f1c'}, '2019');
var title = ui.Label({
  value: 'The Beagle Kelp project - Laredo Peninsula, Strait of Magellan, Chile', 
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
  value: '1834: Part of the Strait of Magellan, from HMS Beagle.', 
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
panel.add(subtitle23_link);
ui.root.add(panel);