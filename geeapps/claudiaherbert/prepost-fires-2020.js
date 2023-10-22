// Make a cloud-free Landsat 8 TOA composite (from raw imagery).
var l8 = ee.ImageCollection('LANDSAT/LC08/C01/T1');
// a) what is the date range? What does simpleComposite do?
var image = ee.Algorithms.Landsat.simpleComposite({
  collection: l8.filterDate('2020-07-01', '2020-08-01'),
  asFloat: true
});
var image2 = ee.Algorithms.Landsat.simpleComposite({
  collection: l8.filterDate('2020-09-20', '2020-10-29'), // .filterBounds(geometry)
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
Map.setCenter(-122, 38, 9);
Map.addLayer(image_clip, imageVisParam3, 'pre-fires (August 1, 2020)');
Map.addLayer(image_clip2, imageVisParam3, 'post-fire (from September 20-October 29)');