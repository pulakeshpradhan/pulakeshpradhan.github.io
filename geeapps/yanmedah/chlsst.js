var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -65.225829375,
            34.11634853760715
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#ffc82d",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #ffc82d */ee.Geometry.Point([-65.225829375, 34.11634853760715]);
// Adds two charts next to the map to interactively display a
// time-series of NDVI and reflectance for each click on the map.
// Filter collection to dates of interest.
var l8 = ee.ImageCollection('NASA/OCEANDATA/MODIS-Aqua/L3SMI')
    .filterDate('2017-06-01', '2020-06-01');
// Create two collections to sample from, one for each plot.
var sst = l8.select(['sst']);
var chl = l8.select(['chlor_a']);
var vis = {min: 0, max: 4, palette: [
 ' black', 'navy','blue','aqua'
]};
Map.addLayer(chl, vis, 'Chl');
Map.setCenter(123.499403, -10.680886, 8);
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
  var chlChart = ui.Chart.image.series(chl, point, ee.Reducer.mean(), 500);
  chlChart.setOptions({
    title: 'Chl Over Time',
    vAxis: {title: 'Chl'},
    hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 20}},
  });
  panel.widgets().set(2, chlChart);
  // Create an RGB spectrum chart.
  var sstChart = ui.Chart.image.series(sst, point)
      .setOptions({
        title: 'SST Reflectance Over Time',
        vAxis: {title: 'band value'},
        hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}},
      });
   panel.widgets().set(3, sstChart);
});
Map.style().set('cursor', 'crosshair');
// Add the panel to the ui.root.
ui.root.insert(0, panel);