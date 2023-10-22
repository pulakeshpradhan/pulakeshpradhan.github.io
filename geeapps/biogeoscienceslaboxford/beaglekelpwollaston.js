var Wol = ui.import && ui.import("Wol", "image", {
      "id": "users/biogeoscienceslaboxford/00_BeagleNorthEast_WollastonIs_3857"
    }) || ee.Image("users/biogeoscienceslaboxford/00_BeagleNorthEast_WollastonIs_3857"),
    W98 = ui.import && ui.import("W98", "table", {
      "id": "users/biogeoscienceslaboxford/006_wollaston_1998_polys_dis"
    }) || ee.FeatureCollection("users/biogeoscienceslaboxford/006_wollaston_1998_polys_dis"),
    W16 = ui.import && ui.import("W16", "table", {
      "id": "users/biogeoscienceslaboxford/006_wollaston_2016_polys_dis"
    }) || ee.FeatureCollection("users/biogeoscienceslaboxford/006_wollaston_2016_polys_dis"),
    W17 = ui.import && ui.import("W17", "table", {
      "id": "users/biogeoscienceslaboxford/006_wollaston_2017_polys_dis"
    }) || ee.FeatureCollection("users/biogeoscienceslaboxford/006_wollaston_2017_polys_dis"),
    W18 = ui.import && ui.import("W18", "table", {
      "id": "users/biogeoscienceslaboxford/006_wollaston_2018_polys_dis"
    }) || ee.FeatureCollection("users/biogeoscienceslaboxford/006_wollaston_2018_polys_dis"),
    W19 = ui.import && ui.import("W19", "table", {
      "id": "users/biogeoscienceslaboxford/006_wollaston_2019_polys_dis"
    }) || ee.FeatureCollection("users/biogeoscienceslaboxford/006_wollaston_2019_polys_dis");
///Beagle Kelp project
//Wollaston Island, Cape Horn Archipelago
Map.setOptions('SATELLITE');
Map.setControlVisibility(null, null, false, false, false); 
var w98 = W98.reduceToImage({
    properties: ['VALUE'],
    reducer: ee.Reducer.first()
});
var w16 = W16.reduceToImage({
    properties: ['VALUE'],
    reducer: ee.Reducer.first()
});
var w17 = W17.reduceToImage({
    properties: ['VALUE'],
    reducer: ee.Reducer.first()
});
var w18 = W18.reduceToImage({
    properties: ['VALUE'],
    reducer: ee.Reducer.first()
});
var w19 = W19.reduceToImage({
    properties: ['VALUE'],
    reducer: ee.Reducer.first()
});
Map.addLayer(Wol, {}, 'North East side of Wollaston Island, from HMS Beagle, 1834')
Map.setCenter(-67.2696, -55.7374, 12)
Map.addLayer(w98, {palette: '264653'}, '1998' )
Map.addLayer(w16, {palette: '2a9d8f'}, '2016' )
Map.addLayer(w17,{palette: 'e9c46a'}, '2017' )
Map.addLayer(w18,{palette: 'f4a261'}, '2018')
Map.addLayer(w19,{palette: 'e76f51'}, '2019')
var title = ui.Label({
  value: 'The Beagle Kelp project - Wollaston Island, Cape Horn Archipelago, Chile', 
  style: {    fontSize: '20px',    fontWeight: 'bold',     maxWidth: '320px'  }});
var explore = ui.Label({
  value: 'Click on Layers and explore. Each colour layer is indicating annual satellite-detected kelp canopies. In the background, the first records of kelp areas drawn on Nautical Charts.', 
  style: {    fontSize: '14px',    maxWidth: '320px'  }});
var sources = ui.Label({
  value: 'Sources', 
  style: {    fontSize: '16px',    fontWeight: 'bold',     maxWidth: '320px'  }});
var source1 = ui.Label({
  value: '1998: NDVI derived from Landsat 5 TM.', 
  style: {    fontSize: '14px',      maxWidth: '320px'  }});
var source2 = ui.Label({
  value: '2016-2019: KF derived from Sentinel-2.', 
  style: {    fontSize: '14px',      maxWidth: '350px'  }});
var source3 = ui.Label({
  value: '1834: Nort-East side of Wollaston Island, from HMS Beagle.', 
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