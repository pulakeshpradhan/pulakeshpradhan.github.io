var geometry = /* color: #d63000 */ee.Geometry.Polygon(
        [[[-64.90062697512496, -30.182223163484014],
          [-59.649162131374965, -30.31509025433374],
          [-58.924064475124965, -26.52863507898151],
          [-64.24144728762496, -26.351566268273945]]]);
var pt = ee.Geometry.Point(-61.62713, -28.62137)
var collection =  ee.ImageCollection('COPERNICUS/S1_GRD')
      .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
      .filterBounds(geometry)
      .select('VV');
print (collection.sort('system:time_start',false).limit(20))
var before = collection.filterDate('2018-12-15', '2018-12-30').mosaic();
var after = collection.filterDate('2019-01-07', Date.now()).mosaic();
print (after)
var SMOOTHING_RADIUS = 100;
var DIFF_UPPER_THRESHOLD = -3; 
var diff_smoothed = after.focal_median(SMOOTHING_RADIUS, 'circle', 'meters')
    .subtract(before.focal_median(SMOOTHING_RADIUS, 'circle', 'meters'));
var diff_thresholded = diff_smoothed.lt(DIFF_UPPER_THRESHOLD);
function toNatural(img) {
  return ee.Image(10.0).pow(img.select(0).divide(10.0));
}
function toDB(img) {
  return ee.Image(img).log10().multiply(10.0);
}
// Display map
// Map.addLayer(before, {min:-30,max:0}, ' Período 2018-12-15 / 2018-12-30 ');
// Map.addLayer(after, {min:-30,max:0}, 'Período 2019-01-07 / '+ ee.Date(Date.now()).format('yyyy-MM-dd').getInfo());
// Map.addLayer(diff_thresholded.updateMask(diff_thresholded), {palette:"0000FF"},'Areas inundadas');
var label_der = ui.Label({value:'Período 2019-01-07 / 2019-01-25',style : {position :'top-right' }});
Map.addLayer(before, {min:-30,max:0}, ' Período 2018-12-15 / 2018-12-30 ');
var linkedMap = ui.Map();
linkedMap.addLayer(after, {min:-30,max:0}, 'Período 2019-01-07 / 2019-01-25');
linkedMap.add (label_der)
linkedMap.addLayer(diff_thresholded.updateMask(diff_thresholded), {palette:"0000FF"},'Areas inundadas');
// Link the default Map to the other map.
var linker = ui.Map.Linker([ui.root.widgets().get(0), linkedMap]);
// Make an inset map and add it to the linked map.
var inset = ui.Map({style: {position: "bottom-right"}});
linkedMap.add(inset);
// Register a function to the linked map to update the inset map.
linkedMap.onChangeBounds(function() {
  var bounds = ee.Geometry.Rectangle(Map.getBounds());
  inset.centerObject(bounds);
  inset.layers().set(0, bounds);
});
// Create a SplitPanel which holds the linked maps side-by-side.
var splitPanel = ui.SplitPanel({
  firstPanel: linker.get(0),
  secondPanel: linker.get(1),
  orientation: 'horizontal',
  wipe: true,
  style: {stretch: 'both'}
});
// Set the SplitPanel as the only thing in root.
ui.root.widgets().reset([splitPanel]);
linkedMap.setCenter(-61.62713, -28.62137, 9);
var label = ui.Label({value:'Período 2018-12-15 / 2018-12-30 ',style : {position :'top-left' }});
Map.add(label);
ui.Map({style:{margin:'100px'}})
print (Map.style())