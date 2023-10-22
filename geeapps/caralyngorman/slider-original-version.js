var geometry = /* color: #d63000 */ee.Geometry.Polygon(
        [[[-122.29387505203397, 39.75970775333331],
          [-122.14281304031522, 39.44227157704497],
          [-121.33806450515897, 39.26812516259104],
          [-120.56395752578885, 39.77026389195945],
          [-121.16271240860135, 40.124008702619356],
          [-121.91527588516385, 40.027331890961264]]]),
    geometry2 = /* color: #ffc82d */ee.Geometry.Polygon(
        [[[-121.63133719974849, 39.49029456402161],
          [-121.22896293217036, 39.81489535358688],
          [-121.39214167603257, 39.92403714347543],
          [-121.54207328373286, 40.01817943303723],
          [-121.94856742435786, 39.7040470620878]]]),
    geometry3 = /* color: #ffffff */ee.Geometry.Point([-121.58175006029006, 39.79795952094922]),
    l8raw = ee.ImageCollection("LANDSAT/LC08/C01/T1_RT"),
    imagebefore = ee.Image("LANDSAT/LC08/C01/T1_RT_TOA/LC08_044032_20131025"),
    imageduring = ee.Image("LANDSAT/LC08/C01/T1_RT_TOA/LC08_044032_20181108"),
    imageafter = ee.Image("LANDSAT/LC08/C01/T1_RT_TOA/LC08_044032_20181226");
// UI tool code courtesy of Yanlei Feng
/*
 * Configure the imagery
 */
// These Sentinel-1 images track the major flooding in Kerala during the 2018
// monsoon season: https://en.wikipedia.org/wiki/2018_Kerala_floods
var images = {
  'Pre-Fire': imagebefore.visualize({bands: ['B6', 'B5', 'B2'], max: 0.5}).clip(geometry2),
  'November 8': imageduring.visualize({bands: ['B6', 'B5', 'B2'], max: 0.5}).clip(geometry2),
  'November 26': imageafter.visualize({bands: ['B6', 'B5', 'B2'], max: 0.5}).clip(geometry2)
};
/*
 * Set up the maps and control widgets
 */
// Create the left map, and have it display layer 0.
var leftMap = ui.Map();
leftMap.setControlVisibility(false);
var leftSelector = addLayerSelector(leftMap, 0, 'top-left');
// Create the right map, and have it display layer 1.
var rightMap = ui.Map();
rightMap.setControlVisibility(false);
var rightSelector = addLayerSelector(rightMap, 1, 'top-right');
// Adds a layer selection widget to the given map, to allow users to change
// which image is displayed in the associated map.
function addLayerSelector(mapToChange, defaultValue, position) {
  var label = ui.Label('Choose an image to visualize');
  // This function changes the given map to show the selected image.
  function updateMap(selection) {
    mapToChange.layers().set(0, ui.Map.Layer(images[selection]));
  }
  // Configure a selection dropdown to allow the user to choose between images,
  // and set the map to update when a user makes a selection.
  var select = ui.Select({items: Object.keys(images), onChange: updateMap});
  select.setValue(Object.keys(images)[defaultValue], true);
  var controlPanel =
      ui.Panel({widgets: [label, select], style: {position: position}});
  mapToChange.add(controlPanel);
}
/*
 * Tie everything together
 */
// Create a SplitPanel to hold the adjacent, linked maps.
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  wipe: true,
  style: {stretch: 'both'}
});
// Set the SplitPanel as the only thing in the UI root.
ui.root.widgets().reset([splitPanel]);
var linker = ui.Map.Linker([leftMap, rightMap]);
leftMap.setCenter(-121.633759, 39.767380, 10);