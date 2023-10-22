var alos = ee.Image("JAXA/ALOS/AW3D30_V1_1"),
    visParams = {"bands":"AVE","min":0,"max":3000};
var label = ui.Label('Click for elevation')
var inspector = ui.Panel(
  [label], ui.Panel.Layout.flow('horizontal'));
function showElevation(elevation) {
  inspector.clear();
  var titleLabel = ui.Label("Elevation:", {
    fontWeight: "bold",
    stretch: "vertical",
  });
  var elevationLabel = ui.Label(elevation, {
    stretch: "vertical",
  });
  var closeButton = ui.Button('Close', function() {
    inspector.style().set("shown", false);
  });
  inspector.add(titleLabel);
  inspector.add(elevationLabel);
  inspector.add(closeButton);
}
function inspect(coords) {
  inspector.clear();
  inspector.style().set("shown", true);
  var loadingLabel = ui.Label('Loading...', {
    color: 'grey',
  });
  inspector.add(loadingLabel);
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var elevation = alos.reduceRegion({
    reducer: ee.Reducer.first(),
    geometry: point,
    scale: 30,
  }).get('AVE');
  elevation.evaluate(showElevation);
}
// Set up the map.
Map.addLayer(alos, visParams, 'Elevation');
Map.setCenter(138.7271, 35.3644, 10);
Map.add(inspector);
Map.onClick(inspect);
Map.style().set("cursor", "crosshair");