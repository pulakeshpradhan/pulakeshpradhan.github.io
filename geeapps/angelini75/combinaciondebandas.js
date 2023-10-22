// Load a raw Landsat 5 ImageCollection for a single year.
var collection = ee.ImageCollection('LANDSAT/LT05/C02/T1')
    .filterDate('2010-01-01', '2010-12-31');
// Create a cloud-free composite with default parameters.
var composite = ee.Algorithms.Landsat.simpleComposite(collection);
// Display the composites.
// Map.setCenter(-59.1223, -34.5689, 10);
Map.addLayer(composite, {bands: ['B3', 'B2', 'B1'],min : [10,10,10], max: [38,38,38]}, 'Color natural');
Map.addLayer(composite, {bands: ['B4', 'B3', 'B2'],min : [10,10,10], max: [90,38,38]}, 'FCCE');
Map.addLayer(composite, {bands: ['B4', 'B5', 'B3'],min : [10,10,10], max: [90,80,38]}, 'FCC 453');
Map.addLayer(composite, {bands: ['B5', 'B4', 'B3'],min : [10,10,10], max: [80,90,38]}, 'FCC 543');
Map.addLayer(composite, {bands: ['B4', 'B5', 'B7'],min : [10,10,10], max: [90,80,70]}, 'FCC 457');