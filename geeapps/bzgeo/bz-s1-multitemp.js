////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Displays last 3 Sentinel-1 images
// Domain: Belize
// Last update: 25 May 2019
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var c = require('users/servirbz/packages:bz/bz');
var r = require('users/servirbz/packages:img_recent');
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var s1_dsc = ee.ImageCollection("COPERNICUS/S1_GRD").filterBounds(c.bz)
    .filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'))
    .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
    .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH')).select(['VH','VV'])
    .filter(ee.Filter.eq('relativeOrbitNumber_start', 128)).filter(ee.Filter.inList('sliceNumber', [3,4]));
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var date_dsc = ee.Date(ee.Image(s1_dsc.sort('system:time_start', false).first()).get('system:time_start'));
var s1_dsc_t3 = s1_dsc.filterDate(date_dsc.advance(-1, 'day'), date_dsc.advance(2, 'day')).median().updateMask(c.msk);
var s1_dsc_t2 = s1_dsc.filterDate(date_dsc.advance(-14, 'day'), date_dsc.advance(-11, 'day')).median().updateMask(c.msk);
var s1_dsc_t1 = s1_dsc.filterDate(date_dsc.advance(-28, 'day'), date_dsc.advance(-20, 'day')).median().updateMask(c.msk);
var image = ee.Image.cat([s1_dsc_t3, s1_dsc_t2, s1_dsc_t1]);
var t = 'system:time_start';
var d = 'YYYY-MM-dd';
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var s1_filt = ee.ImageCollection("COPERNICUS/S1_GRD").filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
                .filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING')).select('VV').filterBounds(c.pt_bz_city);
var sorted1 = s1_filt.sort('system:time_start', false);
var t3_date = ee.Date(ee.Image(sorted1.first()).get(t)).format(d).getInfo();
var t3_img = ee.Image(sorted1.first());
var sorted2 = sorted1.filter(ee.Filter.neq('system:index', t3_img.id()));
var t2_img = ee.Image(sorted2.sort('system:time_start', false).first());
var t2_date = ee.Date(ee.Image(sorted2.sort('system:time_start', false).first()).get(t)).format(d).getInfo();
var sorted3 = sorted2.filter(ee.Filter.neq('system:index', t2_img.id()));
var t1_img = ee.Image(sorted3.sort('system:time_start', false).first());
var t1_date = ee.Date(ee.Image(sorted3.sort('system:time_start', false).first()).get(t)).format(d).getInfo();
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var MAP_PARAMS = {
  'VH polarization': { min:-19.84,max:-10.1,gamma:10, bands: ["VH_2","VH_1","VH"]},
  'VV polarization': { min:-10,max:-6.4,gamma:10, bands:["VV_2","VV_1","VV"]}
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getVisualization(name) {return MAP_PARAMS[name];}
var maps = [];
Object.keys(MAP_PARAMS).forEach(function(name) {
  var map = ui.Map();
  map.add(ui.Label(name));
  map.addLayer(image, getVisualization(name), name);
  map.addLayer(c.pa, {palette: "teal"},"Protected areas");
  map.addLayer(c.bnds.clip(c.bz),{palette: "red"},"Int'l Borders");
  map.setControlVisibility(false);
  maps.push(map);
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var linker = ui.Map.Linker(maps);
maps[0].setControlVisibility({zoomControl: true, layerList: true}); // Enable zooming on the top-left map
maps[1].setControlVisibility({scaleControl: true, layerList: true}); // Show the scale on the bottom-right map
maps[0].setCenter(-88.628, 17.4857, 9); // Set zoom level
var mapGrid = ui.Panel(
    [ ui.Panel([maps[0]], null, {stretch: 'both'}),
      ui.Panel([maps[1]], null, {stretch: 'both'})],
    ui.Panel.Layout.Flow('horizontal'), {stretch: 'both'});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var title = ui.Label('Sentinel-1 multi-temporal SAR composites: Belize', {stretch:'horizontal',textAlign:'center',fontWeight:'bold',fontSize:'24px'});
var subtitle = ui.Label('most recent imagery from: ' + t3_date + " , " + t2_date + " , " + t1_date, {stretch:'horizontal',textAlign:'center',fontSize:'16px', color: "red"});
var credits = ui.Label('credit: contains modified European Space Agency / Copernicus Sentinel data', {stretch:'horizontal',textAlign:'center',fontSize:'14px'});
ui.root.widgets().reset([title, subtitle, credits, mapGrid]);
ui.root.setLayout(ui.Panel.Layout.Flow('vertical'));
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////