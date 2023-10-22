var alos = ee.Image("JAXA/ALOS/AW3D30_V1_1"),
    visParams = {"bands":"AVE","min":0,"max":3000},
    geometry = /* color: #d63000 */ee.Geometry.MultiPoint();
// publish a custom inspector tool to the ui.root
var label = ui.Label('Click for elevation');
// initialize a panel with a list of widgets
var inspector = ui.Panel([label], ui.Panel.Layout.flow('horizontal'));
// panel is a widget that holds other widgets
// ui root is a panel in itself, map is a panel in itself
Map.add(inspector);
function showElevation(elevation) {
  inspector.clear(); // get rid of 'click for elev'
  var titleLabel = ui.Label({
    value: 'Elevation = ',
    style: {
      fontWeight: 'bold',
      color: 'black',
      stretch: 'vertical',
      }
    });
  inspector.add(titleLabel);
  var elevationLabel = ui.Label({
    value: elevation + 'm',
    style: {
      color: 'black',
      // moves the label into the center of the panel
      stretch: 'vertical',
      }
    });
  inspector.add(elevationLabel);
  // add a button to close out this window
  var closeButton = ui.Button('Close', function(){
    inspector.clear()
    inspector.style().set('shown', false);
  });
  inspector.add(closeButton);
}
// reduceRegion is api communication
// when we use print, EE is interpreting
// when you add elevation as a label, we're just seeing the message that we send to EE
// so we need to interpret it, elevation.getInfo() is one option
// BUT this is bad - it says, stop everything and give us the info
// also stops user interaction as well
// instead, use evaluate:
// Asynchronously retrieves the value of this object from the server and passes
//      it to the provided callback function
function inspect(coords){
  // right after the user has clicked
  // good place for a loading signal
  inspector.clear()
  // when the user clicks it will be shown
  inspector.style().set('shown', true);
  inspector.add(ui.Label('Loading...', {color: 'gray'}));
  // regular function before loading
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var elevation = alos.reduceRegion({
    reducer: ee.Reducer.first(),
    geometry: point,
    scale: 30, // trailing comma is ok, prep for next parameter
  }).get('AVE'); // grab just the elevation property value
  // send the instructions to EE. call showElevation on the output variable
  elevation.evaluate(showElevation);
}  
Map.onClick(inspect);
function fun(){
  Map.add(ui.Label('fun'))
}
//Map.onChangeCenter(fun);
// Set up the map.
Map.addLayer(alos, visParams, 'Elevation');
Map.setCenter(138.7271, 35.3644, 10);
// Map.style() returns a dictionary that you can then edit with set(key, value)
Map.style().set('cursor','crosshair');