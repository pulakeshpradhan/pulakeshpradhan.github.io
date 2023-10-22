var g85 = ui.import && ui.import("g85", "image", {
      "id": "users/biogeoscienceslaboxford/002_goree_1985"
    }) || ee.Image("users/biogeoscienceslaboxford/002_goree_1985"),
    g97 = ui.import && ui.import("g97", "image", {
      "id": "users/biogeoscienceslaboxford/002_goree_1997"
    }) || ee.Image("users/biogeoscienceslaboxford/002_goree_1997"),
    g98 = ui.import && ui.import("g98", "image", {
      "id": "users/biogeoscienceslaboxford/002_goree_1998"
    }) || ee.Image("users/biogeoscienceslaboxford/002_goree_1998"),
    g99 = ui.import && ui.import("g99", "image", {
      "id": "users/biogeoscienceslaboxford/002_goree_1999"
    }) || ee.Image("users/biogeoscienceslaboxford/002_goree_1999"),
    g04 = ui.import && ui.import("g04", "image", {
      "id": "users/biogeoscienceslaboxford/002_goree_2004"
    }) || ee.Image("users/biogeoscienceslaboxford/002_goree_2004"),
    g05 = ui.import && ui.import("g05", "image", {
      "id": "users/biogeoscienceslaboxford/002_goree_2005"
    }) || ee.Image("users/biogeoscienceslaboxford/002_goree_2005"),
    g07 = ui.import && ui.import("g07", "image", {
      "id": "users/biogeoscienceslaboxford/002_goree_2007"
    }) || ee.Image("users/biogeoscienceslaboxford/002_goree_2007"),
    g08 = ui.import && ui.import("g08", "image", {
      "id": "users/biogeoscienceslaboxford/002_goree_2008"
    }) || ee.Image("users/biogeoscienceslaboxford/002_goree_2008"),
    g09 = ui.import && ui.import("g09", "image", {
      "id": "users/biogeoscienceslaboxford/002_goree_2009"
    }) || ee.Image("users/biogeoscienceslaboxford/002_goree_2009"),
    g10 = ui.import && ui.import("g10", "image", {
      "id": "users/biogeoscienceslaboxford/002_goree_2010"
    }) || ee.Image("users/biogeoscienceslaboxford/002_goree_2010"),
    g16 = ui.import && ui.import("g16", "image", {
      "id": "users/biogeoscienceslaboxford/002_goree_2016"
    }) || ee.Image("users/biogeoscienceslaboxford/002_goree_2016"),
    g17 = ui.import && ui.import("g17", "image", {
      "id": "users/biogeoscienceslaboxford/002_goree_2017"
    }) || ee.Image("users/biogeoscienceslaboxford/002_goree_2017"),
    g18 = ui.import && ui.import("g18", "image", {
      "id": "users/biogeoscienceslaboxford/002_goree_2018"
    }) || ee.Image("users/biogeoscienceslaboxford/002_goree_2018"),
    g19 = ui.import && ui.import("g19", "image", {
      "id": "users/biogeoscienceslaboxford/002_goree_2019"
    }) || ee.Image("users/biogeoscienceslaboxford/002_goree_2019"),
    Goree = ui.import && ui.import("Goree", "image", {
      "id": "users/biogeoscienceslaboxford/00_GoreeIsland_1834_3857"
    }) || ee.Image("users/biogeoscienceslaboxford/00_GoreeIsland_1834_3857");
///Beagle Kelp project
//Agua Fresca, Strait of Magellan 
Map.setOptions('SATELLITE');
Map.setControlVisibility(null, null, false, false, false) ;
Map.addLayer(Goree, {}, 'Goeree Roads, from HMS Beagle, 1834');
Map.setCenter(-67.0982, -55.2684, 12);
//Map.addLayer(g85, {palette: '264653'}, '1985' )
Map.addLayer(g97, {palette: '2a9d8f'}, '1997' );
Map.addLayer(g98,{palette: 'e9c46a'}, '1998' );
Map.addLayer(g99,{palette: 'f4a261'}, '1999');
Map.addLayer(g04,{palette: 'e76f51'}, '2004');
Map.addLayer(g05,{palette: 'e63946'}, '2005');
Map.addLayer(g07,{palette: 'a8dadc'}, '2007');
Map.addLayer(g08,{palette: '457b9d'}, '2008');
Map.addLayer(g09,{palette: '1d3557'}, '2009');
Map.addLayer(g10,{palette: 'ffcdb2'}, '2010');
Map.addLayer(g16,{palette: 'ffbe0b'}, '2016');
Map.addLayer(g17,{palette: 'fb5607'}, '2017');
Map.addLayer(g18,{palette: 'ff006e'}, '2018');
Map.addLayer(g19,{palette: '8338ec'}, '2019');
var title = ui.Label({
  value: 'The Beagle Kelp project - Goeree Roads, Lennox and Navarino Islands, Cape Horn Archipelago, Chile', 
  style: {    fontSize: '20px',    fontWeight: 'bold',     maxWidth: '320px'  }});
var explore = ui.Label({
  value: 'Click on Layers and explore. Each colour layer is indicating annual satellite-detected kelp canopies. In the background, the first records of kelp areas drawn on Nautical Charts.', 
  style: {    fontSize: '14px',    maxWidth: '320px'  }});
var sources = ui.Label({
  value: 'Sources', 
  style: {    fontSize: '16px',    fontWeight: 'bold',     maxWidth: '320px'  }});
var source1 = ui.Label({
  value: '1985-2010: NDVI derived from Landsat 5 TM.', 
  style: {    fontSize: '14px',      maxWidth: '320px'  }});
var source2 = ui.Label({
  value: '2016-2019: KF derived from Sentinel-2.', 
  style: {    fontSize: '14px',      maxWidth: '350px'  }});
var source3 = ui.Label({
  value: '1834: Goeree Roads, from HMS Beagle.', 
  style: {    fontSize: '14px',      maxWidth: '350px'  }});
var style_header = {fontSize: '13px',    fontWeight: 'bold',  width:'300px',  maxWidth: '320px', backgroundColor: 'lightblue', padding: '5px', margin: '15px 0 0 10px '};
var subtitle23_link = ui.Label('Main map - The Beagle Kelp Project',style_header , 'https://biogeoscienceslaboxford.users.earthengine.app/view/beaglekelpcharts');
var credits = ui.Label({
  value: 'The Beagle Kelp.', 
  style: {    fontSize: '14px',      maxWidth: '320px'  }});
var panel = ui.Panel();
panel.add(title);
panel.add(explore);
panel.add(sources)
panel.add(source3);
panel.add(source1);
panel.add(source2);
panel.add(subtitle23_link)
ui.root.add(panel);