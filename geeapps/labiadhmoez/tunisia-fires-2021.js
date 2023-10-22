// Demonstrate the difference between optical imagery and radar backscatter.
function configureMap(_collection, _vis_params, _label, label_position) {
  var _map = ui.Map();
  _map.addLayer(_collection, _vis_params, _label);
  _map.add(ui.Label(_label, {position:label_position}));
  return _map;
}
// Configure the left map.
var prstart_date = ee.Date('2021-08-05');
var prend_date = prstart_date.advance(2, 'days');
var prdate_filter = ee.Filter.date(prstart_date, prend_date);
var label1 = 'S2 pre-fire: 2021-08-06';
var collection1 = ee.ImageCollection('COPERNICUS/S2_SR').filter(prdate_filter);
var vis_params1 = {bands:'B12,B8A,B4', min:0.0, max:3000};
// Configure the right map.
var psstart_date = ee.Date('2021-08-10');
var psend_date = psstart_date.advance(2, 'days');
var psdate_filter = ee.Filter.date(psstart_date, psend_date);
var label2 = 'S2 post-fire: 2021-08-11';
var collection2 = ee.ImageCollection('COPERNICUS/S2_SR').filter(psdate_filter);
var vis_params2 = {bands:'B12,B8A,B4', min:0.0, max:4000};
// Create the map objects, link them, and display them.
var map1 = configureMap(collection1, vis_params1, label1, 'middle-left');
var map2 = configureMap(collection2, vis_params2, label2, 'middle-right');
var linker = ui.Map.Linker([map1,map2]);
var split_panel = ui.SplitPanel({
  firstPanel: map1,
  secondPanel: map2,
  wipe: true,
});
map1.setCenter(8.65, 36.69, 11);  // San Francisco Bay area
// Add the split panel to the UI.
ui.root.widgets().reset([split_panel]);