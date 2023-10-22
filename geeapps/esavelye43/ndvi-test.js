var point = /* color: #d63000 */ee.Geometry.Point([-95.16427223279459, 38.965061106627594]);
/**
 * A simple NDVI Explorer app.
 * @author sufy@google.com
 */
// Task 5: Add some styles to the widgets to make them pretty.
// Initialize the map.
// ===================
var map = ui.Map();
var ndvi = ee.ImageCollection('LANDSAT/LC08/C01/T1_32DAY_NDVI')
    .filterDate('2014-01-01', '2015-01-01');
var vis = {min: 0, max: 1, palette: ['99c199', '006400']};
map.addLayer(ndvi, vis, 'NDVI'); 
map.setCenter(-94.84497, 39.01918, 8);
// Initialize Widgets.
// ===================
var panel = ui.Panel();
var title = ui.Label('NDVI Explorer')
var instructions = ui.Label('Click on the map to show NDVI chart.')
var chartPanel = ui.Panel();
panel.add(title);
panel.add(instructions);
panel.add(chartPanel);
var splitPanel = ui.SplitPanel({
  firstPanel: panel,
  secondPanel: map,
});
ui.root.clear();
ui.root.add(splitPanel);
// Show point on the map.
// ======================
function showPointOnMap(point) {
  var dot = ui.Map.Layer(point, {color: 'FF0000'});
  map.layers().set(1, dot);
}
// Display an NDVI chart.
// ======================
function makeChart(point) {
  var chart = ui.Chart.image.series(ndvi, point, ee.Reducer.mean(), 200);
  chart.setOptions({
    title: 'NDVI Over Time',
    vAxis: {title: 'NDVI'},
    hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}},
  });
  chartPanel.clear();
  chartPanel.add(chart);
}
// Bind the click handler to the new map.
map.onClick(function(coordinates){
  var point = ee.Geometry.Point([coordinates.lon, coordinates.lat]);
  showPointOnMap(point);
  makeChart(point); 
}); 
showPointOnMap(point);
makeChart(point);