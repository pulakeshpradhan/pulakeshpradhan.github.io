// Make a cloud-free Landsat 8 TOA composite (from raw imagery).
var l8 = ee.ImageCollection('LANDSAT/LC08/C01/T1');
// a) what is the date range? What does simpleComposite do?
var image = ee.Algorithms.Landsat.simpleComposite({
  collection: l8.filterDate('2020-07-01', '2020-08-01'),
  asFloat: true
});
var image2 = ee.Algorithms.Landsat.simpleComposite({
  collection: l8.filterDate('2020-09-20', '2020-10-29'),
  asFloat: true
});
var image3 = ee.Algorithms.Landsat.simpleComposite({
  collection: l8.filterDate('2021-06-01', '2021-07-01'), 
  asFloat: true
});
var image4 = ee.Algorithms.Landsat.simpleComposite({
  collection: l8.filterDate('2021-09-20', '2021-10-29'), 
  asFloat: true
});
var imageVisParam3 = {"opacity":1,"bands":["B7","B5","B4"],"min":0.0623472530432439,"max":0.3613328523673309,"gamma":1};
var cal_bounds = ee.FeatureCollection('TIGER/2016/States').filter(ee.Filter(ee.Filter.eq('NAME','California')));
var california = cal_bounds.geometry(); 
var clipToCol = function(image){
  return image.clip(california);
};  
var image_clip = clipToCol(image);
var image_clip2 = clipToCol(image2);
var image_clip3 = clipToCol(image3);
var image_clip4 = clipToCol(image4);
// Make left and right maps.
var center = {lon: -121.77, lat: 39.68, zoom: 8};
// Create two maps.
var leftMap = ui.Map(center);
var rightMap = ui.Map(center);
// Make predefined data layers that can be selected.
var pre2020 = ui.Map.Layer(image_clip.visualize({"opacity":1,"bands":["B7","B5","B4"],"min":0.0623472530432439,"max":0.3613328523673309,"gamma":1}));
var post2020 = ui.Map.Layer(image_clip2.visualize({"opacity":1,"bands":["B7","B5","B4"],"min":0.0623472530432439,"max":0.3613328523673309,"gamma":1}));
var pre2021 = ui.Map.Layer(image_clip3.visualize({"opacity":1,"bands":["B7","B5","B4"],"min":0.0623472530432439,"max":0.3613328523673309,"gamma":1}));
var post2021 = ui.Map.Layer(image_clip4.visualize({"opacity":1,"bands":["B7","B5","B4"],"min":0.0623472530432439,"max":0.3613328523673309,"gamma":1}));
// Add default layers to maps.
leftMap.addLayer(image_clip2, imageVisParam3);
rightMap.addLayer(image_clip4, imageVisParam3);
// Link the maps
var linkedMaps = ui.Map.Linker([leftMap, rightMap]);
// Create a SplitPanel which holds the linked maps side-by-side.
var splitPanel = ui.SplitPanel({
  firstPanel: linkedMaps.get(0),
  secondPanel: linkedMaps.get(1),
  orientation: 'horizontal',
  wipe: true,
  style: {stretch: 'both'}
});
// Make a list of image layers to select from.
var layers1 = ['pre-fires (August 1, 2020)', 'post-fire (from September 20-October 29, 2020)']
var layers2 = ['pre-fires (August 1, 2021)', 'post-fire (from September 20-October 29, 2021)'];
// Make a function that will retrieve a layer based on selection.
function getLayer(selection) {
  var layer = pre2020;
  if(selection == 'pre-fires (August 1, 2020)') {
    layer = pre2020;
  } else if(selection == 'post-fire (from September 20-October 29, 2020)'){
    layer = post2020;
  } else if(selection == 'pre-fires (August 1, 2021)'){
    layer = pre2021;
  } else if(selection == 'post-fire (from September 20-October 29, 2021)'){
    layer = post2021;
  }
  return layer;
}
// Make a callback function for when a selection is made for left map.
function selectLeftOnChange(selection) {
  leftMap.layers().set(0, getLayer(selection));
}
// Make a callback function for when a selection is made for right map.
function selectRightOnChange(selection) {
  rightMap.layers().set(0, getLayer(selection));
}
// Define selection buttons for left and right map layers.
var selectLeft = ui.Select(layers1, 'pre-fires (August 1, 2020)', 'post-fire (from September 20-October 29, 2020)', selectLeftOnChange, false, {position: 'bottom-left'});
var selectRight = ui.Select(layers2, 'pre-fires (August 1, 2021)', 'post-fire (from September 20-October 29, 2021)', selectRightOnChange, false, {position: 'bottom-right'});
// Clear the root, add the splitPanel and buttons.
ui.root.clear();
ui.root.add(splitPanel);
leftMap.add(selectLeft);
rightMap.add(selectRight);