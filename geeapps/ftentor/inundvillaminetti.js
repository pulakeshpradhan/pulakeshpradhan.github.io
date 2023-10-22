//var lotes = ee.FeatureCollection('ft:109UwzGcBNnhFzPC897D7WmK2xqXal1YEldN5_VPQ');
//var lotes = lotes.filterMetadata('lote','equals','X1');
var pt = ee.Geometry.Point(-61.62713, -28.62137)
var collection =  ee.ImageCollection('COPERNICUS/S1_GRD').filterBounds(pt)
.select('VV');
print (collection.sort('system:index',false).limit(20))
var before = collection.filterDate('2018-12-15', '2018-12-17').mosaic();
var after = collection.filterDate('2019-01-10', '2019-01-19').mosaic();
print (after)
var SMOOTHING_RADIUS = 100;
var DIFF_UPPER_THRESHOLD = -3; 
var diff_smoothed = after.focal_median(SMOOTHING_RADIUS, 'circle', 'meters')
    .subtract(before.focal_median(SMOOTHING_RADIUS, 'circle', 'meters'));
var diff_thresholded = diff_smoothed.lt(DIFF_UPPER_THRESHOLD);
// Display map
Map.centerObject(pt, 12);
Map.addLayer(before, {min:-30,max:0}, ' Período 2018-12-15 / 2018-12-30 ',false);
Map.addLayer(after, {min:-30,max:0}, 'Período 2019-01-07 / 2019-01-19',false);
//Map.addLayer(lotes,{},'lotes')
Map.addLayer(diff_thresholded.updateMask(diff_thresholded), {palette:"0000FF"},'Areas inundadas');
function toNatural(img) {
  return ee.Image(10.0).pow(img.select(0).divide(10.0));
}
function toDB(img) {
  return ee.Image(img).log10().multiply(10.0);
}