var geometry = /* color: #d63000 */ee.Geometry.Point([104.090416614167, 12.897099550820231]),
    table = ee.FeatureCollection("users/tvandevoorde/Altai1997-2015-selectieTVDV_UTMproj"),
    imageVisParam = {"opacity":1,"bands":["VH_p5","VH_p50","VH_p95"],"min":-37.208149875157005,"max":-16.053146443046877,"gamma":1};
// Load the Sentinel-1 ImageCollection.
var sentinel1 = ee.ImageCollection('COPERNICUS/S1_GRD');
// Filter by metadata properties.
var vh = sentinel1
  // Filter to get images with VV and VH dual polarization.
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
  // Filter to get images collected in interferometric wide swath mode.
  .filter(ee.Filter.eq('instrumentMode', 'IW'));
  //.filter(ee.Filter.listContains('resolution_meters','25'));
// Filter to get images from different look angles.
//var vhAscending = vh.filter(ee.Filter.eq('orbitProperties_pass', 'ASCENDING'));
//var vhDescending = vh.filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'));
// Create a composite from means at different polarizations and look angles.
//var composite = ee.Image.cat([
//  vhAscending.select('VH').mean(),
//  ee.ImageCollection(vhAscending.select('VV').merge(vhDescending.select('VV'))).mean(),
//  vhDescending.select('VH').mean()
//]).focal_median();
// Display as a composite of polarization and backscattering characteristics.
//Map.addLayer(composite, {min: [-25, -20, -25], max: [0, 10, 0]}, 'composite');
//Map.addLayer(vh.filterBounds(geometry))
var percentile =  ee.Reducer.percentile([5,50,95]);
var percol = vh.select('VH').reduce(percentile);
//print (vh.select('VH').filterBounds(ee.Geometry.Point(89.32133, 49.79047)).size()) ;
Map.addLayer (percol, imageVisParam, "S1 composiet");
//-33.52794226646424   -   -6.536712560653687
//var composite = ee.Image.cat([
//  vh.select('VH').min(),
//  vh.select('VH').mean(),
//  vh.select('VH').max()]);
//Map.addLayer (vh.select('VH').filterDate('2018-02-10', '2018-07-10' ));
Map.setCenter(89.32133, 49.79047,17);
Map.addLayer(table,"","refdata");