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
var consoleMap = ui.Map({
  lon: -2.0174,
  lat: 48.6474,
  zoom: 13
});
// Create a Layer from this Sentinel-2 image
var image = ee.Image('COPERNICUS/S2/20150821T111616_20160314T094808_T30UWU');
var visParams = {bands: ['B4', 'B3', 'B2'], max: 2048, gamma: 1};
var layer = ui.Map.Layer(image, visParams);
// Update the map by updating the layers list.
var layers = consoleMap.layers();
layers.add(layer);
// Make a textbox to accept a gamma value.
// Update the layer when the gamma value is entered.
var gammaBox = ui.Textbox({
  value: 1,
  onChange: function(value) {
    // visParams is NOT an ActiveDictionary, so set it again.
    visParams.gamma = value;
    layer.setVisParams(visParams);
  }
});
print(ui.Label('Enter a gamma value:'));
print(gammaBox);
print(consoleMap);