var alos = ee.Image("JAXA/ALOS/AW3D30_V1_1"),
    visParams = {"bands":"AVE","min":0,"max":3000};
var label = ui.Label("Click for elevation");
var inspector = ui.Panel([label], ui.Panel.Layout.flow("horizontal"));
Map.add(inspector);
function showElevation(elevation){
  inspector.clear();
  var titleLabel = ui.Label({
      value: "Elevation:",
      style:{
        fontWeight: 'bold',
        stretch: "vertical",
      }
      });
  inspector.add(titleLabel)
  var elevationLabel = ui.Label(elevation, {stretch: "vertical"});
  inspector.add(elevationLabel)
  var closeButton = ui.Button('Close', function(){
    inspector.clear();
    inspector.style().set('shown', false);
  });
  inspector.add(closeButton);
}
function inspect(coords){
  inspector.clear();
  inspector.style().set("shown", true);
  inspector.add(ui.Label("Loading...", {color: "grey"}));
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var elevation = alos.reduceRegion({
    reducer: ee.Reducer.first(),
    geometry: point,
    scale:30
  }).get('AVE');
  elevation.evaluate(showElevation);
}
Map.onClick(inspect);
// Set up the map.
Map.addLayer(alos, visParams, 'Elevation');
Map.setCenter(138.7271, 35.3644, 10);
Map.style().set("cursor", "crosshair");