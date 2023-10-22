var af1984 = ui.import && ui.import("af1984", "image", {
      "id": "users/biogeoscienceslaboxford/001_aguafresca_1984"
    }) || ee.Image("users/biogeoscienceslaboxford/001_aguafresca_1984"),
    af1986 = ui.import && ui.import("af1986", "image", {
      "id": "users/biogeoscienceslaboxford/001_aguafresca_1986"
    }) || ee.Image("users/biogeoscienceslaboxford/001_aguafresca_1986"),
    af1996 = ui.import && ui.import("af1996", "image", {
      "id": "users/biogeoscienceslaboxford/001_aguafresca_1996"
    }) || ee.Image("users/biogeoscienceslaboxford/001_aguafresca_1996"),
    af1998 = ui.import && ui.import("af1998", "image", {
      "id": "users/biogeoscienceslaboxford/001_aguafresca_1998"
    }) || ee.Image("users/biogeoscienceslaboxford/001_aguafresca_1998"),
    af1999 = ui.import && ui.import("af1999", "image", {
      "id": "users/biogeoscienceslaboxford/001_aguafresca_1999"
    }) || ee.Image("users/biogeoscienceslaboxford/001_aguafresca_1999"),
    af2001 = ui.import && ui.import("af2001", "image", {
      "id": "users/biogeoscienceslaboxford/001_aguafresca_2001"
    }) || ee.Image("users/biogeoscienceslaboxford/001_aguafresca_2001"),
    af2003 = ui.import && ui.import("af2003", "image", {
      "id": "users/biogeoscienceslaboxford/001_aguafresca_2003"
    }) || ee.Image("users/biogeoscienceslaboxford/001_aguafresca_2003"),
    af2004 = ui.import && ui.import("af2004", "image", {
      "id": "users/biogeoscienceslaboxford/001_aguafresca_2004"
    }) || ee.Image("users/biogeoscienceslaboxford/001_aguafresca_2004"),
    af2005 = ui.import && ui.import("af2005", "image", {
      "id": "users/biogeoscienceslaboxford/001_aguafresca_2005"
    }) || ee.Image("users/biogeoscienceslaboxford/001_aguafresca_2005"),
    af2006 = ui.import && ui.import("af2006", "image", {
      "id": "users/biogeoscienceslaboxford/001_aguafresca_2006"
    }) || ee.Image("users/biogeoscienceslaboxford/001_aguafresca_2006"),
    af2007 = ui.import && ui.import("af2007", "image", {
      "id": "users/biogeoscienceslaboxford/001_aguafresca_2007"
    }) || ee.Image("users/biogeoscienceslaboxford/001_aguafresca_2007"),
    af2008 = ui.import && ui.import("af2008", "image", {
      "id": "users/biogeoscienceslaboxford/001_aguafresca_2008"
    }) || ee.Image("users/biogeoscienceslaboxford/001_aguafresca_2008"),
    af2009 = ui.import && ui.import("af2009", "image", {
      "id": "users/biogeoscienceslaboxford/001_aguafresca_2009"
    }) || ee.Image("users/biogeoscienceslaboxford/001_aguafresca_2009"),
    af2010 = ui.import && ui.import("af2010", "image", {
      "id": "users/biogeoscienceslaboxford/001_aguafresca_2010"
    }) || ee.Image("users/biogeoscienceslaboxford/001_aguafresca_2010"),
    af2011 = ui.import && ui.import("af2011", "image", {
      "id": "users/biogeoscienceslaboxford/001_aguafresca_2011"
    }) || ee.Image("users/biogeoscienceslaboxford/001_aguafresca_2011"),
    af2016 = ui.import && ui.import("af2016", "image", {
      "id": "users/biogeoscienceslaboxford/001_aguafresca_2016"
    }) || ee.Image("users/biogeoscienceslaboxford/001_aguafresca_2016"),
    af2017 = ui.import && ui.import("af2017", "image", {
      "id": "users/biogeoscienceslaboxford/001_aguafresca_2017"
    }) || ee.Image("users/biogeoscienceslaboxford/001_aguafresca_2017"),
    af2018 = ui.import && ui.import("af2018", "image", {
      "id": "users/biogeoscienceslaboxford/001_aguafresca_2018"
    }) || ee.Image("users/biogeoscienceslaboxford/001_aguafresca_2018"),
    af2019 = ui.import && ui.import("af2019", "image", {
      "id": "users/biogeoscienceslaboxford/001_aguafresca_2019"
    }) || ee.Image("users/biogeoscienceslaboxford/001_aguafresca_2019"),
    SoM = ui.import && ui.import("SoM", "image", {
      "id": "users/biogeoscienceslaboxford/00_StraitOfMagellan_modified3"
    }) || ee.Image("users/biogeoscienceslaboxford/00_StraitOfMagellan_modified3");
///Beagle Kelp project
//Agua Fresca, Strait of Magellan 
Map.setOptions('SATELLITE');
Map.setControlVisibility(null, null, false, false, false)
Map.addLayer(SoM, {}, 'Chart of the Strait of Magellan from HMS Beagle, 1834')
Map.setCenter(-70.9671, -53.3767, 12)
Map.addLayer(af1984, {palette: '264653'}, '1984' )
Map.addLayer(af1986, {palette: '2a9d8f'}, '1986' )
Map.addLayer(af1996,{palette: 'e9c46a'}, '1996' )
Map.addLayer(af1998,{palette: 'f4a261'}, '1998')
Map.addLayer(af1999,{palette: 'e76f51'}, '1999')
Map.addLayer(af2001,{palette: 'e63946'}, '2001')
Map.addLayer(af2003,{palette: 'a8dadc'}, '2003')
Map.addLayer(af2004,{palette: '457b9d'}, '2004')
Map.addLayer(af2005,{palette: '1d3557'}, '2005')
Map.addLayer(af2006,{palette: 'ffcdb2'}, '2006')
Map.addLayer(af2007,{palette: 'ffbe0b'}, '2007')
Map.addLayer(af2008,{palette: 'fb5607'}, '2008')
Map.addLayer(af2009,{palette: 'ff006e'}, '2009')
Map.addLayer(af2010,{palette: '8338ec'}, '2010')
Map.addLayer(af2011,{palette: '3a86ff'}, '2011')
Map.addLayer(af2016,{palette: '1a535c'}, '2016')
Map.addLayer(af2017,{palette: '4ecdc4'}, '2017')
Map.addLayer(af2018,{palette: 'ff6b6b'}, '2018')
Map.addLayer(af2019,{palette: '6a040f'}, '2019')
var title = ui.Label({
  value: 'The Beagle Kelp project - Freshwater Bay (Agua Fresca), Strait of Magellan, Chile', 
  style: {    fontSize: '20px',    fontWeight: 'bold',     maxWidth: '320px'  }});
var explore = ui.Label({
  value: 'Click on Layers and explore. Each colour layer is indicating annual satellite-detected kelp canopies. In the background, the first records of kelp areas drawn on Nautical Charts.', 
  style: {    fontSize: '14px',    maxWidth: '320px'  }});
var sources = ui.Label({
  value: 'Sources', 
  style: {    fontSize: '16px',    fontWeight: 'bold',     maxWidth: '320px'  }});
var source1 = ui.Label({
  value: '1984-2011: NDVI derived from Landsat 5 TM.', 
  style: {    fontSize: '14px',      maxWidth: '320px'  }});
var source2 = ui.Label({
  value: '2016-2019: KF derived from Sentinel-2.', 
  style: {    fontSize: '14px',      maxWidth: '350px'  }});
var source3 = ui.Label({
  value: '1834: Chart of the Strait of Magellan from HMS Beagle.', 
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