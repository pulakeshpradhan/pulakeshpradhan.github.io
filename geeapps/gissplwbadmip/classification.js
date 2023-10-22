var table = ui.import && ui.import("table", "table", {
      "id": "users/gissplwbadmip/District"
    }) || ee.FeatureCollection("users/gissplwbadmip/District");
var s2 = ee.ImageCollection("COPERNICUS/S2");
 function maskS2clouds(image) {
  var qa = image.select('QA60')
  // Bits 10 and 11 are clouds and cirrus, respectively.
 var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0).and(
             qa.bitwiseAnd(cirrusBitMask).eq(0))
  //var ndvi= image.normalizedDifference(['B8', 'B4']).select([0], ['NDVI']).set('time_start',image.get('system:time_start')
//var ndvi = image.normalizedDifference(['B8', 'B4']).rename('NDVI');
//var ndwi = image.normalizedDifference(['B3', 'B8']).rename('NDWI');
  return image.updateMask(mask);
}
 var collection_one = s2.filterDate('2020-01-01', '2020-04-30').filterBounds(table);
 var s2ndvi = s2.map(maskS2clouds);
var s2_img=s2ndvi.mosaic();
// EXAMPLE TABLE
//var table = ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017");
var name_property = 'DISTRICT'
// Country Names
var all = ee.List(table.toList(table.size()).map(function(feat){return ee.String(ee.Feature(feat).get(name_property))}))
var some = ee.List(['Argentina', 'Chile', 'Uruguay'])
// YOUR TABLE
//var table = ee.FeatureCollection("???")
//var name_property = 'Prov_name'
//var Provinces3 = [Blekinge, Dalarna, Norrland, Gotland, Medelpad]
//var some = ee.List(Provinces3)
// empty panel
var panel = ui.Panel()
var timeSeries = function(feature) {
  // Your code for time series graph..
  var name = ee.String(feature.get(name_property)).getInfo()
  print('I am plotting a time series for '+name)
}
// Main function
var addFeat = function(name, fc, property) {
  // Filter Feature by its name
  var filtered = fc.filterMetadata(property, 'equals', name);
  var feature = ee.Feature(filtered.first());
 //var collection_one = s2.filterDate('2020-01-01', '2020-04-30').filterBounds(table)
//var s2ndvi = collection_one.map(maskS2clouds)
//var result = collection_one.select('B8','B4','B3').mean();
var image1= s2_img.clip(feature);
// Load a pre-computed Landsat composite for input.
var input = ee.Image(image1);
print(input)
// Display the sample region.
Map.centerObject(feature);
Map.addLayer(ee.Image().paint(feature, 0, 2), {}, 'feature');
Map.addLayer(input, {bands: ['B8','B4', 'B3'], max:3000}, 'fcc');
var region=ee.FeatureCollection(feature);
// Make the training dataset.
var training = input.sample({
  region: region,
  scale: 30,
  numPixels: 5000
});
// Instantiate the clusterer and train it.
var clusterer = ee.Clusterer.wekaKMeans(15).train(training);
// Cluster the input using the trained clusterer.
var result1 = input.cluster(clusterer);
// Display the clusters with random colors.
Map.addLayer(result1.randomVisualizer(), {}, 'clusters'); 
// Create the panel for the legend items.
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create and add the legend title.
var legendTitle = ui.Label({
  value: 'Sentinel LULC',
  style: {
    fontWeight: 'bold',
    fontSize: '12px',
    margin: '0 0 4px 0',
    padding: '0'
  }
});
legend.add(legendTitle);
var loading = ui.Label('Loading legend...', {margin: '2px 0 4px 0'});
legend.add(loading);
// Creates and styles 1 row of the legend.
var makeRow = function(color, name) {
  // Create the label that is actually the colored box.
  var colorBox = ui.Label({
    style: {
      backgroundColor: '#' + color,
      // Use padding to give the box height and width.
      padding: '8px',
      margin: '0 0 4px 0'
    }
  });
  // Create the label filled with the description text.
  var description = ui.Label({
    value: name,
    style: {margin: '0 0 4px 6px'}
  });
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};
// Get the list of palette colors and class names from the image.
result1.toDictionary().select(['bands' + ".*"]).evaluate(function(result) {
  //var palette = result[ + "_class_palette"];
  var names = result['bands'];
  loading.style().set('shown', false);
  //for (var i = 0; i < names.length; i++) {
    //legend.add(names);
  }
  //Map.addLayer(image, {min: 0, max: 17, palette: palette}, 'IGBP classification');
);
// Add the legend to the map.
//Map.setCenter(-113.41842, 40.055489, 6);
Map.add(legend);
  // Apply time series code..
  timeSeries(feature)
  // Add Layer to Map
  var layer = ui.Map.Layer(feature, {}, name)
  var layers = Map.layers()
  layers.set(0, layer)
  Map.centerObject(feature)
}
// Callback for dropdown menu
var callback = function(name) {
  addFeat(name, table, name_property)
}
// Define dropdown
var drop = ui.Select({
  //items: some.getInfo(),
  items: all.getInfo(),
  onChange: callback
})
// Adds
panel.add(drop)
Map.add(panel)