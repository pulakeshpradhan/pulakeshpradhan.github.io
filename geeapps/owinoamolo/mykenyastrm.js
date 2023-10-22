// Import country boundaries feature collection.
var dataset = ee.FeatureCollection('USDOS/LSIB_SIMPLE/2017');
// Apply filter where country name equals Uganda.
var Kenya = dataset.filter(ee.Filter.eq('country_na', 'Kenya'));
// Print new "ugandaBorder" object and explorer features and properties.
// There should only be one feature representing Uganda.
print(Kenya);
// Add Uganda outline to the Map as a layer.
Map.centerObject(Kenya, 6);
Map.addLayer(Kenya);
// Load the SRTM image.
var srtm = ee.Image('CGIAR/SRTM90_V4');
// Apply an algorithm to an image.
var slope = ee.Terrain.slope(srtm);
// Clip to Kenya.
var clippedSlope = slope.clip(Kenya);
// Display the result.
Map.setCenter(36.66529840507952, -0.4140364099847241, 7); // Center on the Grand Canyon.
Map.addLayer(clippedSlope, {min: 0, max :60}, 'slope');
// Get the aspect (in degrees).
var aspect = ee.Terrain.aspect(srtm);
// Convert to radians, compute the sin of the aspect.
var sinImage = aspect.divide(180).multiply(Math.PI).sin();
// Clip to Kenya.
var clippedSTRM = sinImage.clip(Kenya);
// Display the result.
Map.addLayer(clippedSTRM, {min: -1, max: 1}, 'sin');