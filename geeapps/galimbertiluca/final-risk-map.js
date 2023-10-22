var geometry = ui.import && ui.import("geometry", "table", {
      "id": "users/galimbertiluca/SSudan"
    }) || ee.FeatureCollection("users/galimbertiluca/SSudan"),
    risk1 = ui.import && ui.import("risk1", "table", {
      "id": "users/galimbertiluca/1"
    }) || ee.FeatureCollection("users/galimbertiluca/1"),
    risk2 = ui.import && ui.import("risk2", "table", {
      "id": "users/galimbertiluca/2"
    }) || ee.FeatureCollection("users/galimbertiluca/2"),
    risk3 = ui.import && ui.import("risk3", "table", {
      "id": "users/galimbertiluca/3"
    }) || ee.FeatureCollection("users/galimbertiluca/3"),
    risk4 = ui.import && ui.import("risk4", "table", {
      "id": "users/galimbertiluca/4"
    }) || ee.FeatureCollection("users/galimbertiluca/4"),
    risk5 = ui.import && ui.import("risk5", "table", {
      "id": "users/galimbertiluca/5"
    }) || ee.FeatureCollection("users/galimbertiluca/5");
var risk1= ee.FeatureCollection('users/galimbertiluca/1');
Map.centerObject(geometry);
Map.addLayer(risk1, {color: 'ffffb2'}, 'Low')
var risk2= ee.FeatureCollection('users/galimbertiluca/2');
Map.centerObject(geometry);
Map.addLayer(risk2, {color: 'green'}, 'Low - Medium')
var risk3= ee.FeatureCollection('users/galimbertiluca/3');
Map.centerObject(geometry);
Map.addLayer(risk3, {color: 'yellow'}, 'Medium - High')
var risk4= ee.FeatureCollection('users/galimbertiluca/4');
Map.centerObject(geometry);
Map.addLayer(risk4, {color: 'orange'}, 'High')
var risk5= ee.FeatureCollection('users/galimbertiluca/5');
Map.centerObject(geometry);
Map.addLayer(risk5, {color: 'red'}, 'Very High')
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
// Create the title label.
var title = ui.Label('Risk of Flood in South Sudan');
title.style().set('position', 'top-center');
Map.add(title);
// Create the title label.
var title = ui.Label('Disclaimer: This product has been derived automatically without validation data. All geographic information has limitations due to the scale, resolution, date and interpretation of the original source materials. No liability concerning the content or the use thereof is assumed by the producer. Developed by Luca Galimberti');
title.style().set('position', 'bottom-center');
Map.add(title);