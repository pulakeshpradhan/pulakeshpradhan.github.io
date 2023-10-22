/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var pt = /* color: #d63000 */ee.Geometry.Point([130.7462506229812, 32.218453109847474]);
/***** End of imports. If edited, may not auto-convert in the playground. *****/
// Load Sentinel-1 images to map flooding, Japan, 2020-07-04. 
// modify for the Nasa Hackathon
// This script was originally written by Simon Ilyushchenko (GEE team)
// and adapted by Simon Gascoin (CNRS/CESBIO) and Michel Le Page (IRD/CESBIO)
var fc = ee.FeatureCollection('users/coopshen/NASA')
.filter(ee.Filter.or(
ee.Filter.eq('JCODE', '43203'), 
ee.Filter.eq('JCODE', '43513'))); 
// Default location 可調整位參數 座標
//var pt = ee.Geometry.Point(130.82,32.20); 
//var pt = ee.Geometry.Point(-76.831590,35.242672 );  距離範圍
var roi = pt.buffer(50000/2); 
//var roi = pt.buffer(100000/2); 
var SCALE = 20; // meters 解析度
// Load Sentinel-1 C-band SAR Ground Range collection (log scaling, VV co-polar)
var collection =  ee.ImageCollection('COPERNICUS/S1_GRD').filterBounds(roi)
.filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
.select('VV');
// Filter by date
//var before = collection.filterDate('2020-06-22', '2020-06-23').mosaic();
var before = collection.filterDate('2020-06-04', '2020-06-05').mosaic().clip(roi);
var after = collection.filterDate('2020-07-04', '2020-07-05').mosaic().clip(roi);
//var after = collection.filterDate('2018-07-04', '2018-07-10').mosaic().clip(roi);
// Threshold smoothed radar intensities to identify "flooded" areas.
var SMOOTHING_RADIUS = 100;
var DIFF_UPPER_THRESHOLD = -3; 
var diff_smoothed = after.focal_median(SMOOTHING_RADIUS, 'circle', 'meters')
    .subtract(before.focal_median(SMOOTHING_RADIUS, 'circle', 'meters'));
var diff_smoothed_Lee = toDB(RefinedLee(toNatural(after))).subtract(toDB(RefinedLee(toNatural(before))));
var diff_thresholded = diff_smoothed.lt(DIFF_UPPER_THRESHOLD);
var diff_thresholded_Lee = diff_smoothed_Lee.lt(DIFF_UPPER_THRESHOLD);
// Display map
Map.centerObject(pt, 13);
Map.addLayer(before, {min:-30,max:0}, 'Before flood',0);
Map.addLayer(after, {min:-10,max:10}, 'After flood',0);
Map.addLayer(after.subtract(before), {min:-10,max:10}, 'After - before', 0); 
Map.addLayer(diff_smoothed, {min:-10,max:10}, 'diff smoothed', 0); 
Map.addLayer(diff_smoothed_Lee, {min:-10,max:10}, 'diff smoothed refined Lee', 0); 
var flood = diff_thresholded.updateMask(diff_thresholded);
Map.addLayer(flood, {palette:"0000FF"},'flooded areas',0);
Map.addLayer(diff_thresholded_Lee.updateMask(diff_thresholded_Lee), {palette:"0000FF"},'flooded areas (Lee)',1);
 //Convert the unmasked pixels to polygons.
var pixel_polys = flood.select('VV').reduceToVectors({
  geometry: roi,
  geometryType: 'centroid',
  scale: SCALE,
  maxPixels: 1e10
});
// Add longitude and latitute properties.
pixel_polys = pixel_polys.map(function (poly) {
  var coords = poly.geometry().coordinates();
  return poly.set({'longitude': coords.get(0), 'latitude': coords.get(1)});
});
print('pixel_polys sample', ee.Feature(pixel_polys.first()));
print('size', pixel_polys.size());
Map.addLayer(pixel_polys, {color:'red'}, 'vectors');
Export.table.toDrive({
  collection: pixel_polys,
  description: 'test_table_export',
  folder: 'EE Exports'
});
// ************* Functions ************* 
// Functions to convert from/to dB
function toNatural(img) {
  return ee.Image(10.0).pow(img.select(0).divide(10.0));
}
function toDB(img) {
  return ee.Image(img).log10().multiply(10.0);
}
// The RL speckle filter from https://code.earthengine.google.com/2ef38463ebaf5ae133a478f173fd0ab5
// by Guido Lemoine
function RefinedLee(img) {
  // img must be in natural units, i.e. not in dB!
  // Set up 3x3 kernels 
  var weights3 = ee.List.repeat(ee.List.repeat(1,3),3);
  var kernel3 = ee.Kernel.fixed(3,3, weights3, 1, 1, false);
  var mean3 = img.reduceNeighborhood(ee.Reducer.mean(), kernel3);
  var variance3 = img.reduceNeighborhood(ee.Reducer.variance(), kernel3);
  // Use a sample of the 3x3 windows inside a 7x7 windows to determine gradients and directions
  var sample_weights = ee.List([[0,0,0,0,0,0,0], [0,1,0,1,0,1,0],[0,0,0,0,0,0,0], [0,1,0,1,0,1,0], [0,0,0,0,0,0,0], [0,1,0,1,0,1,0],[0,0,0,0,0,0,0]]);
  var sample_kernel = ee.Kernel.fixed(7,7, sample_weights, 3,3, false);
  // Calculate mean and variance for the sampled windows and store as 9 bands
  var sample_mean = mean3.neighborhoodToBands(sample_kernel); 
  var sample_var = variance3.neighborhoodToBands(sample_kernel);
  // Determine the 4 gradients for the sampled windows
  var gradients = sample_mean.select(1).subtract(sample_mean.select(7)).abs();
  gradients = gradients.addBands(sample_mean.select(6).subtract(sample_mean.select(2)).abs());
  gradients = gradients.addBands(sample_mean.select(3).subtract(sample_mean.select(5)).abs());
  gradients = gradients.addBands(sample_mean.select(0).subtract(sample_mean.select(8)).abs());
  // And find the maximum gradient amongst gradient bands
  var max_gradient = gradients.reduce(ee.Reducer.max());
  // Create a mask for band pixels that are the maximum gradient
  var gradmask = gradients.eq(max_gradient);
  // duplicate gradmask bands: each gradient represents 2 directions
  gradmask = gradmask.addBands(gradmask);
  // Determine the 8 directions
  var directions = sample_mean.select(1).subtract(sample_mean.select(4)).gt(sample_mean.select(4).subtract(sample_mean.select(7))).multiply(1);
  directions = directions.addBands(sample_mean.select(6).subtract(sample_mean.select(4)).gt(sample_mean.select(4).subtract(sample_mean.select(2))).multiply(2));
  directions = directions.addBands(sample_mean.select(3).subtract(sample_mean.select(4)).gt(sample_mean.select(4).subtract(sample_mean.select(5))).multiply(3));
  directions = directions.addBands(sample_mean.select(0).subtract(sample_mean.select(4)).gt(sample_mean.select(4).subtract(sample_mean.select(8))).multiply(4));
  // The next 4 are the not() of the previous 4
  directions = directions.addBands(directions.select(0).not().multiply(5));
  directions = directions.addBands(directions.select(1).not().multiply(6));
  directions = directions.addBands(directions.select(2).not().multiply(7));
  directions = directions.addBands(directions.select(3).not().multiply(8));
  // Mask all values that are not 1-8
  directions = directions.updateMask(gradmask);
  // "collapse" the stack into a singe band image (due to masking, each pixel has just one value (1-8) in it's directional band, and is otherwise masked)
  directions = directions.reduce(ee.Reducer.sum());  
  //var pal = ['ffffff','ff0000','ffff00', '00ff00', '00ffff', '0000ff', 'ff00ff', '000000'];
  //Map.addLayer(directions.reduce(ee.Reducer.sum()), {min:1, max:8, palette: pal}, 'Directions', false);
  var sample_stats = sample_var.divide(sample_mean.multiply(sample_mean));
  // Calculate localNoiseVariance
  var sigmaV = sample_stats.toArray().arraySort().arraySlice(0,0,5).arrayReduce(ee.Reducer.mean(), [0]);
  // Set up the 7*7 kernels for directional statistics
  var rect_weights = ee.List.repeat(ee.List.repeat(0,7),3).cat(ee.List.repeat(ee.List.repeat(1,7),4));
  var diag_weights = ee.List([[1,0,0,0,0,0,0], [1,1,0,0,0,0,0], [1,1,1,0,0,0,0], 
    [1,1,1,1,0,0,0], [1,1,1,1,1,0,0], [1,1,1,1,1,1,0], [1,1,1,1,1,1,1]]);
  var rect_kernel = ee.Kernel.fixed(7,7, rect_weights, 3, 3, false);
  var diag_kernel = ee.Kernel.fixed(7,7, diag_weights, 3, 3, false);
  // Create stacks for mean and variance using the original kernels. Mask with relevant direction.
  var dir_mean = img.reduceNeighborhood(ee.Reducer.mean(), rect_kernel).updateMask(directions.eq(1));
  var dir_var = img.reduceNeighborhood(ee.Reducer.variance(), rect_kernel).updateMask(directions.eq(1));
  dir_mean = dir_mean.addBands(img.reduceNeighborhood(ee.Reducer.mean(), diag_kernel).updateMask(directions.eq(2)));
  dir_var = dir_var.addBands(img.reduceNeighborhood(ee.Reducer.variance(), diag_kernel).updateMask(directions.eq(2)));
  // and add the bands for rotated kernels
  for (var i=1; i<4; i++) {
    dir_mean = dir_mean.addBands(img.reduceNeighborhood(ee.Reducer.mean(), rect_kernel.rotate(i)).updateMask(directions.eq(2*i+1)));
    dir_var = dir_var.addBands(img.reduceNeighborhood(ee.Reducer.variance(), rect_kernel.rotate(i)).updateMask(directions.eq(2*i+1)));
    dir_mean = dir_mean.addBands(img.reduceNeighborhood(ee.Reducer.mean(), diag_kernel.rotate(i)).updateMask(directions.eq(2*i+2)));
    dir_var = dir_var.addBands(img.reduceNeighborhood(ee.Reducer.variance(), diag_kernel.rotate(i)).updateMask(directions.eq(2*i+2)));
  }
  // "collapse" the stack into a single band image (due to masking, each pixel has just one value in it's directional band, and is otherwise masked)
  dir_mean = dir_mean.reduce(ee.Reducer.sum());
  dir_var = dir_var.reduce(ee.Reducer.sum());
  // A finally generate the filtered value
  var varX = dir_var.subtract(dir_mean.multiply(dir_mean).multiply(sigmaV)).divide(sigmaV.add(1.0));
  var b = varX.divide(dir_var);
  var result = dir_mean.add(b.multiply(img.subtract(dir_mean)));
  return(result.arrayFlatten([['sum']]));
}