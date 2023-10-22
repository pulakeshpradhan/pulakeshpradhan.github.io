/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var table = ee.FeatureCollection("users/obaidrrhmnan/hafizabad"),
    image = ee.Image("users/obaidrrhmnan/wheathafizabad2020");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
var bound = table;
function maskS2clouds(image) {
  var qa = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0).and(
             qa.bitwiseAnd(cirrusBitMask).eq(0));
  // Return the masked and scaled data, without the QA bands.
  return image.updateMask(mask).divide(10000)
      .select("B.*")
      .copyProperties(image, ["system:time_start"]);
}
// Map the function over one year of data and take the median.
// Load Sentinel-2 TOA reflectance data.
var collection0 = ee.ImageCollection('COPERNICUS/S2')
    .filterDate('2019-11-01', '2019-12-30')
    .filterBounds(bound)
    //.filterDate('2019-01-25', '2019-01-29')
    //.filterDate('2019-01-25', '2019-01-29')
    // Pre-filter to get less cloudy granules.
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10))
    .map(maskS2clouds);
var composite0 = collection0.min().clip(bound);
var collection1 = ee.ImageCollection('COPERNICUS/S2')
    .filterDate('2020-01-01', '2020-01-30')
    .filterBounds(bound)
    //.filterDate('2019-01-25', '2019-01-29')
    //.filterDate('2019-01-25', '2019-01-29')
    // Pre-filter to get less cloudy granules.
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10))
    .map(maskS2clouds);
var composite1 = collection1.max().clip(bound);
var collection2 = ee.ImageCollection('COPERNICUS/S2')
    .filterDate('2020-02-20', '2020-03-10')
    .filterBounds(bound)
    //.filterDate('2019-01-25', '2019-01-29')
    //.filterDate('2019-01-25', '2019-01-29')
    // Pre-filter to get less cloudy granules.
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10))
    .map(maskS2clouds);
var composite2 = collection2.max().clip(bound);
var collection3 = ee.ImageCollection('COPERNICUS/S2')
    .filterDate('2020-04-25', '2020-05-10')
    .filterBounds(bound)
    //.filterDate('2019-01-25', '2019-01-29')
    //.filterDate('2019-01-25', '2019-01-29')
    // Pre-filter to get less cloudy granules.
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
    .map(maskS2clouds);
var composite3 = collection3.median().clip(bound);
// Function to calculate and add an NDVI band
var addNDVI = function(image) {
return image.addBands(image.normalizedDifference(['B8', 'B4']));
};
// Add NDVI band to image collection
var collection0 = collection0.map(addNDVI);
// Extract NDVI band and create NDVI median composite image
var NDVI0 = collection0.select(['nd']);
var NDVI0 = NDVI0.min();
var collection1 = collection1.map(addNDVI);
// Extract NDVI band and create NDVI median composite image
var NDVI1 = collection1.select(['nd']);
var NDVI1 = NDVI1.min();
var collection2 = collection2.map(addNDVI);
// Extract NDVI band and create NDVI median composite image
var NDVI2 = collection2.select(['nd']);
var NDVI2 = NDVI2.max();
var collection3 = collection3.map(addNDVI);
// Extract NDVI band and create NDVI median composite image
var NDVI3 = collection3.select(['nd']);
var NDVI3 = NDVI3.min();
var stackndv = NDVI0.addBands(NDVI1).addBands(NDVI2).addBands(NDVI3);
//var stackcls = composite0.addBands(composite1).addBands(composite2).addBands(composite3).addBands(NDVI0).addBands(NDVI1).addBands(NDVI2).addBands(NDVI3);
// Display the results.
var vizParams = {bands: ['B12', 'B8', 'B2'], min: 0, max: 0.4,gamma: [0.95, 1.2, 1]};
Map.addLayer(composite0.clip(bound), vizParams, 'November 2019');
Map.addLayer(composite1.clip(bound), vizParams, 'January 2020');
Map.addLayer(composite2.clip(bound), vizParams, 'February 2020');
Map.addLayer(composite3.clip(bound), vizParams, 'April 2020');
Map.addLayer(stackndv.clip(bound), {bands: ['nd', 'nd_2', 'nd_3'], min: 0, max: 0.4,gamma: [0.95, 1.2, 1]}, 'Temporal NDVI Composite');
var vis = {
  min: 1,
  max: 4,
  palette: ['5dd61e', 'edf017', 'aa4646','c81dcb'],
};
Map.setCenter(73.503229, 32.127399, 14);
Map.addLayer(image, vis, 'Wheat Classification 2020');
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'Legend',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
// Add the title to the panel
legend.add(legendTitle);
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
      // return the panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
//  Palette with the colors
var palette =['5dd61e', 'edf017', 'aa4646','c81dcb'];
// name of the legend
var names = ['Wheat','fodders', 'Trees', 'Others'];
// Add color and and names
for (var i = 0; i < 4; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
// add legend to map (alternatively you can also print the legend to the console)  
Map.add(legend);