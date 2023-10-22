var points1 = ui.import && ui.import("points1", "table", {
      "id": "users/sgorelik/h29v09_10_sample_points_set1"
    }) || ee.FeatureCollection("users/sgorelik/h29v09_10_sample_points_set1"),
    points2 = ui.import && ui.import("points2", "table", {
      "id": "users/sgorelik/h29v09_10_sample_points_set2"
    }) || ee.FeatureCollection("users/sgorelik/h29v09_10_sample_points_set2");
/***
 * This script used for:
 * https://sgorelik.users.earthengine.app/view/l7-pixel-viewer
 ***/
// setup maps
var left_map = ui.Map({style: {width: '75%'}});
left_map.setControlVisibility({layerList: true});
left_map.setOptions({mapTypeId: 'ROADMAP'});
var right_map = ui.Map();
right_map.setControlVisibility({layerList: true});
right_map.setOptions({mapTypeId: 'SATELLITE'});
// load the raw Landsat 7 collection, https://developers.google.com/earth-engine/datasets/catalog/LANDSAT_LE07_C02_T1
var collection = ee.ImageCollection('LANDSAT/LE07/C02/T1')
  .filterDate(ee.Date('2003-01-01'), ee.Date('2020-12-31'));
// combine sample sets
var p1 = points1.map(function(f){return f.set('set', 1)});
var p2 = points2.map(function(f){return f.set('set', 2)});
var all_points = p1.merge(p2);
// redraw map based on user input
function redraw(value) {
  // get sample set
  var sample_set = parseInt(set_selector.getValue());
  // get modis pixel
  var pixel = parseInt(pixel_selector.getValue());
  var point = all_points.filter(
    ee.Filter.and(ee.Filter.eq('set', sample_set), ee.Filter.eq('pixel', pixel))
  ).geometry();
  // estimate modis pixel geom
  var res_m = 463.312716525000042;
  var square = point.buffer(ee.Number(res_m).divide(2)).bounds();
  var square_vis = ee.FeatureCollection([square]).style({color: 'yellow', fillColor: '#00000000', width: 1});
  // filter for dry season months
  var year = year_slider.getValue();
  var start_date = ee.Date.fromYMD(year, 01, 01);
  var end_date = ee.Date.fromYMD(year, 12, 31);
  var dataset = collection.filterDate(start_date, end_date);
  // create a cloud-free composite with default parameters
  var image = ee.Algorithms.Landsat.simpleComposite(dataset); 
  // left map
  left_map.layers().reset();
  left_map.addLayer(image, {min: 0, max: [150, 100, 150], bands: ['B3', 'B2', 'B1']}, 'True Color (B3, B2, B1)');
  left_map.addLayer(square_vis, {}, 'Pixel ' + pixel);
  // right map
  right_map.layers().reset();
  right_map.addLayer(image, {min: 0, max: [150, 100, 150], bands: ['B4', 'B3', 'B2']}, 'False Color (B4, B3, B2)');
  right_map.addLayer(square_vis, {}, 'Pixel ' + pixel);
  // test if set/pixel number has changed (has opposed to year slider)
  if (typeof value === 'string') left_map.centerObject(square, 14);
}
var split_panel = ui.SplitPanel({
  firstPanel: left_map,
  secondPanel: right_map,
  wipe: true,
  style: {stretch: 'both'}
});
var set_title = ui.Label({
  value: 'Sample Set:',
  style: {padding: '14px 0 0 14px', margin: '0', fontWeight: 'bold'}
});
var set_selector = ui.Select({
  items: ['1', '2'],
  onChange: redraw
});
var pixel_title = ui.Label({
  value: 'Pixel:',
  style: {padding: '14px 0 0 14px', margin: '0', fontWeight: 'bold'}
});
var pixel_selector = ui.Select({
  items: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
  onChange: redraw
});
var year_title = ui.Label({
  value: 'Year:',
  style: {padding: '14px 0 0 14px', margin: '0', fontWeight: 'bold'}
});
var year_slider = ui.Slider({
  min: 2003,
  max: 2020,
  step: 1,
  onChange: redraw,
  style: {width: '300px', padding: '14px 0 0 10px', margin: '0'}
});
var top_panel = ui.Panel({
  widgets: [set_title, set_selector, pixel_title, pixel_selector, year_title, year_slider],
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {position: 'top-center', height: '45px', padding: '0', margin: '-10px 0 0 0'},
});
var wrapper = ui.Panel({
  widgets: [top_panel],
  layout: ui.Panel.Layout.absolute(),
  style: {height: '45px', padding: '0', margin: '0'},
});
ui.root.setLayout(ui.Panel.Layout.flow('vertical'));
ui.root.widgets().reset([split_panel]);
var linker = ui.Map.Linker([left_map, right_map]);
ui.root.insert(0, wrapper);  
// initialize map with default values
set_selector.setValue('1');
pixel_selector.setValue('1');
year_slider.setValue(2003);
/* */