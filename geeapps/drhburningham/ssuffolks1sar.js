var site = ee.Geometry.Rectangle(1.3,51.9,1.5,52.1);
// var debenSite = ee.Geometry.Rectangle(1.38,51.97,1.41,51.99);
Map.setCenter(1.45,52.01,12);
// Map.setCenter(1.39,51.98,14);
var newDate = new Date();
var today = ee.Date(newDate);
var previous = today.advance(-60, 'day');
print(newDate); print(today); print(previous);
// print(ee.Date(Date.now()))
// Load the Sentinel-1 ImageCollection.
var sentinel1 = ee.ImageCollection('COPERNICUS/S1_GRD')
  .filterBounds(site)
  .filterDate(previous,today);
// Filter by metadata properties.
var vh = sentinel1
  // Filter to get images with VV and VH dual polarization.
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
  // Filter to get images collected in interferometric wide swath mode.
  .filter(ee.Filter.eq('instrumentMode', 'IW'));
// Filter to get images from different look angles.
var vhAscending = vh.filter(ee.Filter.eq('orbitProperties_pass', 'ASCENDING'));
var vhDescending = vh.filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'));
// Create a composite from means at different polarizations and look angles.
var composite = ee.Image.cat([
  vhAscending.select('VH').mean(),
  ee.ImageCollection(vhAscending.select('VV').merge(vhDescending.select('VV'))).mean(),
  vhDescending.select('VH').mean()
]).focal_median();
// Display as a composite of polarization and backscattering characteristics
Map.addLayer(composite, {min: [-30, -20, -30], max: [0, 0, 0]}, 'composite');
// // Export the image, specifying scale and region
// Export.image.toDrive({
//   image: composite,
//   region: debenSite,
//   description: 'sar',
//   scale: 5
// });