var country = ui.import && ui.import("country", "table", {
      "id": "users/chaitanay45/area"
    }) || ee.FeatureCollection("users/chaitanay45/area");
Map.centerObject(country,10);
var image = ee.Image().toByte()
    //.paint(roi, 'fill') // Get color from property named 'fill'
    .paint(country, 2, 2); // Outline using color 3, width 5.
    // Filter collection to dates of interest.
var l8 = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA')
    .filterDate('2021-06-01', '2021-09-30')
    .filterBounds(country);
// Create two collections to sample from, one for each plot.
var rgb = l8.select(['B4', 'B3', 'B2']);
var ndvi = l8.map(function(image) {
  return image.select().addBands(image.normalizedDifference(['B5', 'B4']));
});
var ndvi_filtered = ndvi.median();
var vis = {min: 0, max: 1, palette: [
  'FFFFFF', 'CE7E45', 'FCD163', '66A000', '207401',
  '056201', '004C00', '023B01', '012E01', '011301'
]};
Map.addLayer(ndvi_filtered.clip(country), vis, 'NDVI');
// Create a panel to hold our widgets.
var panel = ui.Panel();
panel.style().set('width', '300px');
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'Two Chart Inspector',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
  ui.Label('Click a point on the map to inspect.')
]);
panel.add(intro);
// Create panels to hold lon/lat values.
var lon = ui.Label();
var lat = ui.Label();
panel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
// Register a callback on the default map to be invoked when the map is clicked.
Map.onClick(function(coords) {
  // Update the lon/lat panel with values from the click event.
  lon.setValue('lon: ' + coords.lon.toFixed(2)),
  lat.setValue('lat: ' + coords.lat.toFixed(2));
  // Add a red dot for the point clicked on.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point, {color: 'FF0000'});
  Map.layers().set(1, dot);
  // Create an NDVI chart.
  var ndviChart = ui.Chart.image.series(ndvi, point, ee.Reducer.mean(), 500);
  ndviChart.setOptions({
    title: 'NDVI Over Time',
    vAxis: {title: 'NDVI'},
    hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}},
  });
  panel.widgets().set(2, ndviChart);
  // Create an RGB spectrum chart.
  var rgbChart = ui.Chart.image.series(rgb, point)
      .setOptions({
        title: 'RGB Reflectance Over Time',
        vAxis: {title: 'band value'},
        hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}},
      });
   panel.widgets().set(3, rgbChart);
});
Map.style().set('cursor', 'crosshair');
// Add the panel to the ui.root.
ui.root.insert(0, panel);
Map.addLayer(image, {palette: ['000000', '000000', '000000', '000000'], max: 0.5, opacity: 0.9,},"Boundary of "+country);
/************************ Title ****************************/
Map.add(ui.Label(
    '2017 Annual Landsat Derived NDVI of Toshka',
    {
      fontWeight: 'bold', 
      //fontColors: 'red',
      BackgroundColor: 'F7550A',
      //.paint(roi, 'fill')
      fontSize: '14px'}));