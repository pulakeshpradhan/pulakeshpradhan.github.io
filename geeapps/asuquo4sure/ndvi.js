var aoi = ui.import && ui.import("aoi", "table", {
      "id": "users/asuquo4sure/nigeria_boundary"
    }) || ee.FeatureCollection("users/asuquo4sure/nigeria_boundary");
// Load and display NDVI data.
var ndvi = ee.ImageCollection('LANDSAT/LC8_L1T_8DAY_NDVI')
    .filterDate('2014-01-01', '2021-01-01')
    .filterBounds(aoi);
Map.addLayer(ndvi.median().clip(aoi), {min: 0, max: 1, palette: ['99c199', '006400']}, 'NDVI');
// Configure the map.
Map.setCenter(-3.098562882410534,6.485020797114411, 11);
Map.style().set('cursor', 'crosshair');
// Configure the Panel.
var panel = ui.Panel();
panel.style().set({
  width: '400px',
  position: 'bottom-right'
});
Map.add(panel);    
// Set a callback function for when the user clicks the map.
Map.onClick(function(coords) {
  // Create or update the location label (the second widget in the panel)
  var location = 'lon: ' + coords.lon.toFixed(2) + ' ' +
                'lat: ' + coords.lat.toFixed(2);
  panel.widgets().set(1, ui.Label(location));
  // Add a red dot to the map where the user clicked.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  Map.layers().set(1, ui.Map.Layer(point, {color: 'FF0000'}));
var chart = ui.Chart.image.series({
  imageCollection: ndvi,
  region: point,
  reducer: ee.Reducer.mean(),
  scale: 100
}).setOptions({title: 'NDVI over time'});
//   // Add (or replace) the third widget in the panel by
//   // manipulating the widgets list.
  panel.widgets().set(2, chart);
});
// Add the panel to the ui.root.
//ui.root.add(panel);