var Pata = ui.import && ui.import("Pata", "image", {
      "id": "users/biogeoscienceslaboxford/03_PatagoniaEastCoast"
    }) || ee.Image("users/biogeoscienceslaboxford/03_PatagoniaEastCoast"),
    de1986 = ui.import && ui.import("de1986", "image", {
      "id": "users/biogeoscienceslaboxford/030_Deseado_1986"
    }) || ee.Image("users/biogeoscienceslaboxford/030_Deseado_1986"),
    de1992 = ui.import && ui.import("de1992", "image", {
      "id": "users/biogeoscienceslaboxford/030_Deseado_1992"
    }) || ee.Image("users/biogeoscienceslaboxford/030_Deseado_1992"),
    de1998 = ui.import && ui.import("de1998", "image", {
      "id": "users/biogeoscienceslaboxford/030_Deseado_1998"
    }) || ee.Image("users/biogeoscienceslaboxford/030_Deseado_1998"),
    de1999 = ui.import && ui.import("de1999", "image", {
      "id": "users/biogeoscienceslaboxford/030_Deseado_1999"
    }) || ee.Image("users/biogeoscienceslaboxford/030_Deseado_1999"),
    de2001 = ui.import && ui.import("de2001", "image", {
      "id": "users/biogeoscienceslaboxford/030_Deseado_2001"
    }) || ee.Image("users/biogeoscienceslaboxford/030_Deseado_2001"),
    de2002 = ui.import && ui.import("de2002", "image", {
      "id": "users/biogeoscienceslaboxford/030_Deseado_2002"
    }) || ee.Image("users/biogeoscienceslaboxford/030_Deseado_2002"),
    de2003 = ui.import && ui.import("de2003", "image", {
      "id": "users/biogeoscienceslaboxford/030_Deseado_2003"
    }) || ee.Image("users/biogeoscienceslaboxford/030_Deseado_2003"),
    de2004 = ui.import && ui.import("de2004", "image", {
      "id": "users/biogeoscienceslaboxford/030_Deseado_2004"
    }) || ee.Image("users/biogeoscienceslaboxford/030_Deseado_2004"),
    de2005 = ui.import && ui.import("de2005", "image", {
      "id": "users/biogeoscienceslaboxford/030_Deseado_2005"
    }) || ee.Image("users/biogeoscienceslaboxford/030_Deseado_2005"),
    de2007 = ui.import && ui.import("de2007", "image", {
      "id": "users/biogeoscienceslaboxford/030_Deseado_2007"
    }) || ee.Image("users/biogeoscienceslaboxford/030_Deseado_2007"),
    de2008 = ui.import && ui.import("de2008", "image", {
      "id": "users/biogeoscienceslaboxford/030_Deseado_2008"
    }) || ee.Image("users/biogeoscienceslaboxford/030_Deseado_2008"),
    de2009 = ui.import && ui.import("de2009", "image", {
      "id": "users/biogeoscienceslaboxford/030_Deseado_2009"
    }) || ee.Image("users/biogeoscienceslaboxford/030_Deseado_2009"),
    de2011 = ui.import && ui.import("de2011", "image", {
      "id": "users/biogeoscienceslaboxford/030_Deseado_2011"
    }) || ee.Image("users/biogeoscienceslaboxford/030_Deseado_2011"),
    de2016 = ui.import && ui.import("de2016", "image", {
      "id": "users/biogeoscienceslaboxford/030_deseado_2016"
    }) || ee.Image("users/biogeoscienceslaboxford/030_deseado_2016"),
    de2017 = ui.import && ui.import("de2017", "image", {
      "id": "users/biogeoscienceslaboxford/030_deseado_2017"
    }) || ee.Image("users/biogeoscienceslaboxford/030_deseado_2017"),
    de2018 = ui.import && ui.import("de2018", "image", {
      "id": "users/biogeoscienceslaboxford/030_deseado_2018"
    }) || ee.Image("users/biogeoscienceslaboxford/030_deseado_2018"),
    de2019 = ui.import && ui.import("de2019", "image", {
      "id": "users/biogeoscienceslaboxford/030_deseado_2019"
    }) || ee.Image("users/biogeoscienceslaboxford/030_deseado_2019");
///Beagle Kelp project
//Puerto Deseado, Patagonia Argentina
Map.setOptions('SATELLITE');
Map.setControlVisibility(null, null, false, false, false); 
Map.addLayer(Pata, {}, 'Chart of East Coast of Patagonia, HMS Beagle, 1834');
Map.setCenter(-65.87752, -47.76772, 12);
Map.addLayer(de1986, {palette: '2a9d8f'}, '1986' );
Map.addLayer(de1992,{palette: 'e9c46a'}, '1992' );
Map.addLayer(de1998,{palette: 'f4a261'}, '1998');
Map.addLayer(de1999,{palette: 'e76f51'}, '1999');
Map.addLayer(de2001,{palette: 'e63946'}, '2001');
Map.addLayer(de2002,{palette: 'a8dadc'}, '2002');
Map.addLayer(de2003,{palette: '457b9d'}, '2003');
Map.addLayer(de2004,{palette: '1d3557'}, '2004');
Map.addLayer(de2005,{palette: 'ffcdb2'}, '2005');
Map.addLayer(de2007,{palette: 'ffbe0b'}, '2007');
Map.addLayer(de2008,{palette: 'fb5607'}, '2008');
Map.addLayer(de2009,{palette: 'ff006e'}, '2009');
Map.addLayer(de2011,{palette: '8338ec'}, '2011');
Map.addLayer(de2016,{palette: '3a86ff'}, '2016');
Map.addLayer(de2017,{palette: '1a535c'}, '2017');
Map.addLayer(de2018,{palette: '4ecdc4'}, '2018');
Map.addLayer(de2019,{palette: 'ff6b6b'}, '2019');
var title = ui.Label({
  value: 'The Beagle Kelp project - Port Desire (Puerto Deseado), Patagonian Shelf, Argentina', 
  style: {    fontSize: '20px',    fontWeight: 'bold',     maxWidth: '320px'  }});
var explore = ui.Label({
  value: 'Click on Layers and explore. Each colour layer is indicating annual satellite-detected kelp canopies. In the background, the first records of kelp areas drawn on Nautical Charts.', 
  style: {    fontSize: '14px',    maxWidth: '320px'  }});
var sources = ui.Label({
  value: 'Sources', 
  style: {    fontSize: '16px',    fontWeight: 'bold',     maxWidth: '320px'  }});
var source1 = ui.Label({
  value: '1986-2011: NDVI derived from Landsat 5 TM.', 
  style: {    fontSize: '14px',      maxWidth: '320px'  }});
var source2 = ui.Label({
  value: '2016-2019: KF derived from Sentinel-2.', 
  style: {    fontSize: '14px',      maxWidth: '350px'  }});
var source3 = ui.Label({
  value: '1834: East Coast of Patagonia, from HMS Beagle.', 
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