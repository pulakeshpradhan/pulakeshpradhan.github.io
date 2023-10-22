/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var imageVisParam = {"opacity":1,"bands":["B8","B4","B3"],"min":618.4990778779736,"max":1185.5800250781936,"gamma":1.3},
    imageVisParam2 = {"opacity":1,"bands":["B4","B3","B2"],"min":284.2,"max":1829.8,"gamma":1.3},
    MineFeature3 = ee.FeatureCollection("users/matthepler/M1101905"),
    MineFeature4 = ee.FeatureCollection("users/matthepler/M1101918");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
//set up date 
var newDate = new Date();
var today = ee.Date(newDate);
var previous = today.advance(-6, 'year')
//Grab some sattlite Imagery from the sentinal sattelite, Get the bands.pick the date range and add the Minefeature to the map
var MineFeature = MineFeature4;
var SentinalToa = ee.ImageCollection('COPERNICUS/S2')
    .filterDate(previous,today)
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',5))
    .select('B8','B4','B3','B2')
    .filterBounds(MineFeature); 
    // Pre-define some customization options.
var options = {
  title: 'Sentinal TOA Time Series, bands 2-5',
  fontSize: 20,
  hAxis: {title: 'DN'},
  vAxis: {title: 'count of DN'},
  series: {
    0: {color: 'blue'},
    1: {color: 'green'},
    2: {color: 'red'},
    3: {color: 'magenta'}}};
// Create an image time series chart.
var chart = ui.Chart.image.series({
  imageCollection: SentinalToa, 
  region: MineFeature,
  reducer: ee.Reducer.mean(), 
  scale: 200
})
.setOptions(options);
// Add the chart to the map.
chart.style().set({
  position: 'bottom-right',
  width: '900px',
  height: '300px'
});
Map.add(chart);
// Outline and center map of coalfields
var sfLayer = ui.Map.Layer(MineFeature, {color: 'pink'}, '1101905', true, .6);
Map.layers().add(sfLayer);
Map.setCenter(-82.6791, 36.9647,13);  
// Create a label on the map.
var label = ui.Label('Click a point on the chart to show the image for that date.');
Map.add(label); 
// When the chart is clicked, update the map and label.
chart.onClick(function(xValue, yValue, seriesName) {
  if (!xValue) return;  // Selection was cleared.
  // Show the image for the clicked date.
  var equalDate = ee.Filter.equals('system:time_start', xValue);
  var image = ee.Image(SentinalToa.filter(equalDate).first());
  var l8Layer = ui.Map.Layer(image,imageVisParam2 );
  Map.layers().reset([l8Layer, sfLayer]);
  // Show a label with the date on the map.
  label.setValue((new Date(xValue)).toUTCString());
});