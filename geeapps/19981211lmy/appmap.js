// Make a little map.
var map = ui.Map();
// Make the little map display an inset of the big map.
var createInset = function() {
  var bounds = ee.Geometry.Rectangle(Map.getBounds());
  map.centerObject(bounds);
  map.clear();
  map.addLayer(bounds);
};
// Run it once to initialize.
createInset();
// Get a new inset map whenever you click on the big map.
Map.onClick(createInset);
// Display the inset map in the console.
print(map);