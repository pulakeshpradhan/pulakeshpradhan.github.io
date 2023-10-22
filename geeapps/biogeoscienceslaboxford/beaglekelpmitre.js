var m84 = ui.import && ui.import("m84", "image", {
      "id": "users/biogeoscienceslaboxford/004_Mitre_1984"
    }) || ee.Image("users/biogeoscienceslaboxford/004_Mitre_1984"),
    m97 = ui.import && ui.import("m97", "image", {
      "id": "users/biogeoscienceslaboxford/004_Mitre_1997"
    }) || ee.Image("users/biogeoscienceslaboxford/004_Mitre_1997"),
    m98 = ui.import && ui.import("m98", "image", {
      "id": "users/biogeoscienceslaboxford/004_Mitre_1998"
    }) || ee.Image("users/biogeoscienceslaboxford/004_Mitre_1998"),
    m99 = ui.import && ui.import("m99", "image", {
      "id": "users/biogeoscienceslaboxford/004_Mitre_1999"
    }) || ee.Image("users/biogeoscienceslaboxford/004_Mitre_1999"),
    m01 = ui.import && ui.import("m01", "image", {
      "id": "users/biogeoscienceslaboxford/004_Mitre_2001"
    }) || ee.Image("users/biogeoscienceslaboxford/004_Mitre_2001"),
    m03 = ui.import && ui.import("m03", "image", {
      "id": "users/biogeoscienceslaboxford/004_Mitre_2003"
    }) || ee.Image("users/biogeoscienceslaboxford/004_Mitre_2003"),
    m04 = ui.import && ui.import("m04", "image", {
      "id": "users/biogeoscienceslaboxford/004_Mitre_2004"
    }) || ee.Image("users/biogeoscienceslaboxford/004_Mitre_2004"),
    m05 = ui.import && ui.import("m05", "image", {
      "id": "users/biogeoscienceslaboxford/004_Mitre_2005"
    }) || ee.Image("users/biogeoscienceslaboxford/004_Mitre_2005"),
    m07 = ui.import && ui.import("m07", "image", {
      "id": "users/biogeoscienceslaboxford/004_Mitre_2007"
    }) || ee.Image("users/biogeoscienceslaboxford/004_Mitre_2007"),
    m08 = ui.import && ui.import("m08", "image", {
      "id": "users/biogeoscienceslaboxford/004_Mitre_2008"
    }) || ee.Image("users/biogeoscienceslaboxford/004_Mitre_2008"),
    m09 = ui.import && ui.import("m09", "image", {
      "id": "users/biogeoscienceslaboxford/004_Mitre_2009"
    }) || ee.Image("users/biogeoscienceslaboxford/004_Mitre_2009"),
    m10 = ui.import && ui.import("m10", "image", {
      "id": "users/biogeoscienceslaboxford/004_Mitre_2010"
    }) || ee.Image("users/biogeoscienceslaboxford/004_Mitre_2010"),
    m11 = ui.import && ui.import("m11", "image", {
      "id": "users/biogeoscienceslaboxford/004_Mitre_2011"
    }) || ee.Image("users/biogeoscienceslaboxford/004_Mitre_2011"),
    m16 = ui.import && ui.import("m16", "image", {
      "id": "users/biogeoscienceslaboxford/004_Mitre_2016"
    }) || ee.Image("users/biogeoscienceslaboxford/004_Mitre_2016"),
    m17 = ui.import && ui.import("m17", "image", {
      "id": "users/biogeoscienceslaboxford/004_mitre_2017"
    }) || ee.Image("users/biogeoscienceslaboxford/004_mitre_2017"),
    m18 = ui.import && ui.import("m18", "image", {
      "id": "users/biogeoscienceslaboxford/004_mitre_2018"
    }) || ee.Image("users/biogeoscienceslaboxford/004_mitre_2018"),
    m19 = ui.import && ui.import("m19", "image", {
      "id": "users/biogeoscienceslaboxford/004_mitre_2019"
    }) || ee.Image("users/biogeoscienceslaboxford/004_mitre_2019"),
    mitre = ui.import && ui.import("mitre", "image", {
      "id": "users/biogeoscienceslaboxford/00_EastCoastofTierradelFuego1834_modified"
    }) || ee.Image("users/biogeoscienceslaboxford/00_EastCoastofTierradelFuego1834_modified");
///Beagle Kelp project
// Thetis Bay, Mitre Peninsula, Tierra del Fuego 
Map.setOptions('SATELLITE');
Map.setControlVisibility(null, null, false, false, false);
Map.addLayer(mitre, {}, 'East Coast of Tierra del Fuego, from HMS Beagle, 1834');
Map.setCenter(-65.2009, -54.6362, 12);
Map.addLayer(m84, {palette: '2a9d8f'}, '1984' );
Map.addLayer(m97,{palette: 'e9c46a'}, '1997' );
Map.addLayer(m98,{palette: 'f4a261'}, '1998');
//Map.addLayer(m99,{palette: 'e76f51'}, '1999');
Map.addLayer(m01,{palette: 'e63946'}, '2001');
Map.addLayer(m03,{palette: 'a8dadc'}, '2003');
Map.addLayer(m04,{palette: '457b9d'}, '2004');
Map.addLayer(m05,{palette: '1d3557'}, '2005');
Map.addLayer(m07,{palette: 'ffcdb2'}, '2007');
Map.addLayer(m08,{palette: 'ffbe0b'}, '2008');
Map.addLayer(m09,{palette: 'fb5607'}, '2009');
Map.addLayer(m10,{palette: 'ff006e'}, '2010');
Map.addLayer(m11,{palette: '8338ec'}, '2011');
Map.addLayer(m16,{palette: '9b5de5'}, '2016');
Map.addLayer(m17,{palette: 'f15bb5'}, '2017');
Map.addLayer(m18,{palette: 'fee440'}, '2018');
Map.addLayer(m19,{palette: '00bbf9'}, '2019');
var title = ui.Label({
  value: 'The Beagle Kelp project - Thetis Bay, Mitre Peninsula, Tierra del Fuego, Chile', 
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
panel.add(subtitle23_link);
ui.root.add(panel);