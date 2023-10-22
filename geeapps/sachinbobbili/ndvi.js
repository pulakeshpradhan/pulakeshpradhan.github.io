var India = ee.FeatureCollection("users/sachinbobbili/India");
var enddate = ee.Date(Date.now()).format('YYYY-MM-dd');
var dataset = ee.ImageCollection('LANDSAT/LC08/C01/T1_8DAY_NDVI')
                         .filterDate('2013-01-01', '2023-03-01');
var colorized = dataset.select('NDVI');
var colorizedmean = colorized.mean().clip(India);
var colorizedVis = {
  min: 0,
  max: 1.0,
  palette: [
    'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
    '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
    '012E01', '011D01', '011301'
  ],
};
Map.centerObject(India, 4.5);
Map.addLayer(colorizedmean, colorizedVis, 'Colorized');
// Create User Interface portion --------------------------------------------------
// Create a panel to hold our widgets.
var panel = ui.Panel();
panel.style().set('width', '350px');
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'LANDSAT-8 NDVI Chart Inspector',
    style: {fontSize: '16px', fontWeight: 'bold'}
  }),
  ui.Label('NDVI Chart Inspector App creation based on Landsat 8 Collection 1 Tier 1 8-Day NDVI Composite using Google Earth Engine Apps. This is orthorectified data computed using top-of-atmosphere reflectance. By using this app users can get NDVI values of any preferred location with planetary-scale analysis in terms of charts and tables, within a single click.')
]);
panel.add(intro);
// panels to hold lon/lat values
var lon = ui.Label();
var lat = ui.Label();
panel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
// Register a callback on the default map to be invoked when the map is clicked
Map.onClick(function(coords) {
  // Update the lon/lat panel with values from the click event.
  lon.setValue('lon: ' + coords.lon.toFixed(3)),
  lat.setValue('lat: ' + coords.lat.toFixed(3));
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  // Create an NDVI chart.
  var ndviChart = ui.Chart.image.series(colorized, point, ee.Reducer.first(), 30);
  ndviChart.setOptions({
    title: ' NDVI',
    vAxis: {title: 'NDVI', maxValue: 1},
    hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}},
  });
  panel.widgets().set(3, ndviChart);
});
Map.style().set('cursor', 'crosshair');
// Add the panel to the ui.root.
ui.root.insert(0, panel);