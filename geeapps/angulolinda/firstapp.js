//the following creates a Filter, uses it to filter a FeatureCollection and displays the result:
// Load a feature collection.
var featureCollection = ee.FeatureCollection('TIGER/2016/States');
// Filter the collection.
var filteredFC = featureCollection.filter(ee.Filter.eq('NAME', 'California'));
// Display the collection.
Map.addLayer(filteredFC, {}, 'California');