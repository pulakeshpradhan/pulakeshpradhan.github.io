var l8 = ee.ImageCollection("LANDSAT/LC08/C01/T1_TOA");
// Define a function that will add an NDVI band to a Landsat 8 image.
var addNDVI = function(image) {
  var cloud = ee.Algorithms.Landsat.simpleCloudScore(image).select('cloud');
  var mask = cloud.lt(20);
  var ndvi = image.normalizedDifference(['B5', 'B4']).rename('NDVI');
  return image.addBands(ndvi).updateMask(mask);
};
// Filter and map the function over the collection.
var withNDVI = l8.filterDate('2017-01-01', '2017-12-31')
    .map(addNDVI); // <-- map() the function over the collection.
var ndvi = withNDVI.median().select('NDVI');
var vis = {min: -0.2, max: 0.7, palette: ['blue', 'white', 'green']};
// Create and style widgets.
var intro = ui.Panel([
  ui.Label({
    value: 'NDVI Inspector',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
  ui.Label('Click a point on the map to inspect NDVI over time.')
]);
var lon = ui.Label();
var lat = ui.Label();
// Add the widgets to a new panel.
var panel = ui.Panel();
panel.add(intro);
panel.add(lon);
panel.add(lat);
// Add the new panel to the root panel.
ui.root.insert(0, panel);
// Setup the map.
Map.setCenter(139.7337, 35.7086, 10);
Map.addLayer(ndvi, vis, 'NDVI');
Map.onClick(function(coords) {
  lon.setValue('lon: ' + coords.lon);
  lat.setValue('lat: ' + coords.lat);
  // Add a red point to the map wherever the user clicks.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point, {color: 'red'});
  Map.layers().set(1, dot);
  // Add an NDVI chart.
  var chart = ui.Chart.image.series({
    imageCollection: withNDVI.select('NDVI'), 
    region: point, 
    reducer: ee.Reducer.mean(), 
    scale: 30
  });
  chart.setOptions({
    title: 'NDVI Over Time',
    vAxis: {title: 'NDVI'},
    hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}},
    interpolateNulls: true
  });
  panel.widgets().set(3, chart);
});
Map.style().set('cursor', 'crosshair');