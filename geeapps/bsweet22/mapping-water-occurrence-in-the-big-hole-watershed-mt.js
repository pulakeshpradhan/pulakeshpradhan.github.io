var roi = ui.import && ui.import("roi", "table", {
      "id": "users/bsweet22/Big_Hole_Watershed"
    }) || ee.FeatureCollection("users/bsweet22/Big_Hole_Watershed");
/*
######
######    Plot a time series of Normalized Difference Water Index
######         (NDWI) for the Big Hole Watershed, MT
######
######
*/
// Center on Big Hole Watershed, MT
Map.centerObject(roi, 8);
// function for adding NDWI band to an image, or map to imagecollection]
function addNDWI(image) {
  var ndwi = image.expression(
'(NIR - SWIR) / (NIR + SWIR)', {
NIR: image.select('B8'),   // NIR
SWIR: image.select('B11'), // SWIR
}).rename("NDWI");
  return image.addBands(ndwi);
}
// Import landsat 8 as an image collection
var S2 = ee.ImageCollection("COPERNICUS/S2");
// Filter LANDSAT/LC8_L1T_TOA by date range and location (Path and Row)
var S2 = S2.filterDate('2013-01-01', '2018-12-28')
           .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10))
           .filterBounds(roi);
// Add NDWI band to S2
S2 = S2.map(addNDWI);
// Extract just the NDWI band from S2
var NDWI = S2.select('NDWI');
// Make a palette to display NDWI: a list of hex strings... pulled from GEE example.. 
var palette = ['00FFFF', '0000FF'];
// Add a layer to GEE map of NDWI in the scene
Map.addLayer(NDWI, {min:0, max:1, palette:palette, opacity:0.45}, 'NDWI');
// Outline and center roi on the map.
var empty = ee.Image().byte();
var outline = empty.paint({
  featureCollection: roi,
  color: 1,
  width: 4
});
var sfLayer = ui.Map.Layer(outline, {color: '#1dd6c9'}, 'Study Area: Big Hole Watershed');
Map.layers().add(sfLayer);
Map.setCenter(-114.0475, 45.6341, 9);
// Create an image time series chart.
var chart = ui.Chart.image.series({
  imageCollection: NDWI,
  region: roi,
  reducer: ee.Reducer.mean(),
  scale: 200
});
//print(chart);
// Add the chart to the map.
chart.style().set({
  position: 'bottom-left',
  width: '500px',
  height: '300px'
});
Map.add(chart);
// Create a label on the map.
var label = ui.Label('Where is the Water? Click the graph to find out.');
Map.add(label);
var legendlabel = ui.Label('Cyan = less water, Blue = more water');
Map.add(legendlabel);
// When the chart is clicked, update the map and label.
chart.onClick(function(xValue, yValue, seriesName) {
  if (!xValue) return;  // Selection was cleared.
  // Show the image for the clicked date.
  var equalDate = ee.Filter.equals('system:time_start', xValue);
  var image = ee.Image(S2.filter(equalDate).mosaic());
  var S2Layer = ui.Map.Layer(image, {
    gamma: 1.3,
    min: 0,
    max: 0.5,
    bands: ['B4', 'B3', 'B2']
  });
    var NDWILayer = ui.Map.Layer(image, {
    palette:palette,
    bands: ['NDWI']
  });
  Map.layers().reset([S2Layer, NDWILayer, sfLayer]);
  // Show a label with the date on the map.
  label.setValue((new Date(xValue)).toUTCString());
});