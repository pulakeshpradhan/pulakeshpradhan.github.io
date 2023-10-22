var checkbox = ui.Checkbox('Show SRTM layer', true);
checkbox.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(0).setShown(checked);
});
Map.addLayer(ee.Image('CGIAR/SRTM90_V4'),"","SRTM");
print(checkbox);
// Make a button widget.
var button = ui.Button('Click me!');
// Set a callback function to run when the
// button is clicked.
button.onClick(function() {
  print('Hello, world!');
});
// Display the button in the console.
print(button);
// Load and display NDVI data.
var ndvi = ee.ImageCollection('LANDSAT/LC8_L1T_8DAY_NDVI')
    .filterDate('2014-01-01', '2015-01-01');
Map.addLayer(ndvi.median(), {min: 0, max: 1, palette: ['99c199', '006400']}, 'NDVI');
var image = ee.ImageCollection("LANDSAT/LC08/C01/T2").median().select(['B2','B4','B5','B6','B7']);
// Configure the map.
Map.setCenter(-94.84497, 39.01918, 8);
Map.style().set('cursor', 'crosshair');
// Create an empty panel in which to arrange widgets.
// The layout is vertical flow by default.
var panel = ui.Panel({style: {width: '400px'}})
    .add(ui.Label('Click on the map'));
// Set a callback function for when the user clicks the map.
Map.onClick(function(coords) {
  // Create or update the location label (the second widget in the panel)
  var location = 'lon: ' + coords.lon.toFixed(2) + ' ' +
                 'lat: ' + coords.lat.toFixed(2);
  panel.widgets().set(1, ui.Label(location));
  // Add a red dot to the map where the user clicked.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  Map.layers().set(1, ui.Map.Layer(point, {color: 'FF0000'}));
  // Create a chart of NDVI over time.
  var chart = ui.Chart.image.series(ndvi, point, ee.Reducer.mean(), 200)
      .setOptions({
        title: 'NDVI Over Time',
        vAxis: {title: 'NDVI'},
        lineWidth: 1,
        pointSize: 3,
      });
  var chart2 = ui.Chart.image.regions(image, point, ee.Reducer.mean(), 30);
    chart2.setOptions({
        title: 'Spectral Chart',
        vAxis: {title: 'DN'},
        hAxis: {title: 'Bands'},
        lineWidth: 1,
        pointSize: 3,
      });
  // Add (or replace) the third widget in the panel by
  // manipulating the widgets list.
  panel.widgets().set(2, chart);
  panel.widgets().set(3, chart2);
});
// Add the panel to the ui.root.
ui.root.add(panel);