var geometry = /* color: #d63000 */ee.Geometry.Point([-102.93437499999999, 47.65406449621002]),
    fit = ee.Image("users/tavorageo4good/Geo4Good");
var fit = collection.reduce(ee.Reducer.linearFit());
// Display trend in red/blue, brightness in green.
var visParams = {min: 0, max: [0.18, 20, -0.18], bands: ['scale', 'offset', 'scale']};
Map.addLayer(fit, visParams);
Map.style().set('cursor', 'crosshair');
// Create a map to be used as the zoom box.
var zoomBox = ui.Map({style: {stretch: 'both', shown: false}})
    .setControlVisibility(false);
zoomBox.addLayer(fit, visParams);
// Update the center of the zoom box map when the base map is clicked.
Map.onClick(function(coords) {
  centerZoomBox(coords.lon, coords.lat);
});
var centerZoomBox = function(lon, lat) {
  instructions.style().set('shown', false);
  zoomBox.style().set('shown', true);
  zoomBox.setCenter(lon, lat, 8);
  var bounds = zoomBox.getBounds();
  var w = bounds[0], e = bounds [2];
  var n = bounds[1], s = bounds [3];
  var outline = ee.Geometry.MultiLineString([
    [[w, s], [w, n]],
    [[e, s], [e, n]],
    [[w, s], [e, s]],
    [[w, n], [e, n]],
  ]);
  var layer = ui.Map.Layer(outline, {color: 'FFFFFF'}, 'Zoom Box Bounds');
  Map.layers().set(1, layer);
};
// Add a label and the zoom box map to the default map.
var instructions = ui.Label('Click the map to see an area in detail.', {
  stretch: 'both',
  textAlign: 'center',
  backgroundColor: '#d3d3d3'
});
var panel = ui.Panel({
  widgets: [zoomBox, instructions],
  style: {
    position: 'top-right',
    height: '300px',
    width: '300px',
  }
});
Map.add(ui.Label('Night Light Trends'));
Map.add(panel);
Map.centerObject(geometry, 6);