var map = ui.Map();
// Don't make imports that correspond to the drawn points.
map.drawingTools().setLinked(false);
// Add an empty layer to hold the drawn points.
map.drawingTools().addLayer([]);
// Set the geometry type to be a polygon.
map.drawingTools().setShape('polygon');
// Enter drawing mode.
map.drawingTools().draw();
function showGeom(geom) {
  geom = ee.Geometry(geom);
  resultsPanel.clear();
  var geomLabel = ui.Label('geometry = ' + geom.toGeoJSONString());
  resultsPanel.add(geomLabel);
}
var displayGeometry = ui.util.debounce(function() {
  var geom = map.drawingTools().layers().get(0).toGeometry();
  geom.evaluate(showGeom);
}, 100);
// Set the callback function on changes of the geometry layer.
map.drawingTools().onEdit(displayGeometry);
map.drawingTools().onDraw(displayGeometry);
map.drawingTools().onErase(displayGeometry);
var resultsPanel = ui.Panel({
  widgets: [ui.Label('To generate GeoJSON, draw a geometry on the map.')],
  style:{
    stretch: 'both',
    width: '30%',
  }
});
var mainPanel = ui.Panel({
  widgets:[map, resultsPanel],
  layout: ui.Panel.Layout.flow('horizontal'),
  style:{
    stretch: 'both',
    height:'100%',
  }
});
ui.root.clear();
ui.root.add(mainPanel);