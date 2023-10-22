var Provincial_assemblies = ui.import && ui.import("Provincial_assemblies", "table", {
      "id": "projects/ee-landvis/assets/provincial_assemblies"
    }) || ee.FeatureCollection("projects/ee-landvis/assets/provincial_assemblies"),
    punjab_na = ui.import && ui.import("punjab_na", "table", {
      "id": "projects/ee-landvis/assets/provincial_assemblies"
    }) || ee.FeatureCollection("projects/ee-landvis/assets/provincial_assemblies"),
    Punjab_distric = ui.import && ui.import("Punjab_distric", "table", {
      "id": "projects/ee-landvis/assets/Punjab_Districts"
    }) || ee.FeatureCollection("projects/ee-landvis/assets/Punjab_Districts");
// Create a style for the table layer
var customStyle = {
  fillColor: 'FF0000', // red
  color: '#ffccbb', // black
  width: 2
};
// Add the table layer to the map
Map.addLayer(Provincial_assemblies, customStyle, 'Provincial assemby', 0);
// Create a style for the table layer
var tableStyle1 = {
  fillColor: '00ff00', // green
  pointSize: 3,
  width: 1
};
// Add the table layer to the map
Map.addLayer(punjab_na, tableStyle1, 'National Assembly', 0);
// Create a style for the table layer
var tableStyle2 = {
  fillColor: '00ff00', // green
  pointSize: 3,
  width: 1
};
// Add the table layer to the map
Map.addLayer(Punjab_distric, tableStyle2, 'Districts', 1);
var center = [74, 31];
var zoom =8;
// Set the map center and zoom level
Map.setCenter(center[0], center[1], zoom);