// Load a Landsat 8 composite and display on the map.
var image = ee.Image('LANDSAT/LC8_L1T_32DAY_TOA/20130407').select('B[1-7]');
Map.addLayer(image, {bands:['B4','B3','B2'], min: 0, max: 0.3});
// Create the title label.
var title = ui.Label('Click to inspect');
title.style().set('position', 'top-center');
Map.add(title);
// Create a panel to hold the chart.
var panel = ui.Panel();
panel.style().set({
  width: '400px',
  position: 'bottom-right'
});
Map.add(panel);
// Register a function to draw a chart when a user clicks on the map.
Map.onClick(function(coords) {
  panel.clear();
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var chart = ui.Chart.image.regions(image, point, null, 30);
  chart.setOptions({title: 'Band values'});
  panel.add(chart);
});