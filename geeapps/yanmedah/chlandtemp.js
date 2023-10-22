// Adds two charts next to the map to interactively display a
// time-series of NDVI and reflectance for each click on the map.
// Filter collection to dates of interest.
//var l8 = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA')
//    .filterDate('2016-06-01', '2017-06-01');
var l8 = ee.ImageCollection('NASA/OCEANDATA/MODIS-Aqua/L3SMI')
          .filterDate('2014-01-01', '2019-12-01');
// Create two collections to sample from, one for each plot.
var rgb = l8.select(['sst']);
var ndvi = l8.select(['chlor_a']);
var vis = {
  bands: ['chlor_a'],
  min: 0,
  max: 1,
  palette: 'navy,blue,aqua'};
Map.addLayer(ndvi, vis, 'NDVI');
//Map.addLayer(ndvi.first(), {bands:['chlor_a'], min:0, max:1}, vis, 'NDVI')
Map.setCenter(123.5368894939756,-10.809155797609547, 8);
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
  var ndviChart = ui.Chart.image.series(ndvi, point, ee.Reducer.max(), 500);
  ndviChart.setOptions({
    title: 'Konsentrasi Klorofil ',
    vAxis: {title: 'Chl'},
    hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}},
    series: {
      0: {
        color: 'blue',
        lineWidth: 0,
        pointsVisible: true,
        pointSize: 2,
      },
    },
  });
  panel.widgets().set(2, ndviChart);
  // Create an RGB spectrum chart.
  var rgbChart = ui.Chart.image.series(rgb, point)
      .setOptions({
        title: 'Temperature',
        vAxis: {title: 'band value'},
        hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}},
        series: {
      0: {
        color: 'red',
        lineWidth: 0,
        pointsVisible: true,
        pointSize: 2,
      },
    },
      });
   panel.widgets().set(3, rgbChart);
});
Map.style().set('cursor', 'crosshair');
// Add the panel to the ui.root.
ui.root.insert(0, panel);