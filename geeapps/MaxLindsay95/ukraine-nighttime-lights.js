var imageCollection2 = ui.import && ui.import("imageCollection2", "imageCollection", {
      "id": "NOAA/VIIRS/DNB/MONTHLY_V1/VCMSLCFG"
    }) || ee.ImageCollection("NOAA/VIIRS/DNB/MONTHLY_V1/VCMSLCFG"),
    table = ui.import && ui.import("table", "table", {
      "id": "FAO/GAUL_SIMPLIFIED_500m/2015/level0"
    }) || ee.FeatureCollection("FAO/GAUL_SIMPLIFIED_500m/2015/level0");
// Demonstrates before/after imagery comparison with a variety of dates.
var palettes = require('users/gena/packages:palettes');
var palette = palettes.matplotlib.inferno[7];
/*
 * Configure the imagery
 */
// get the boundaries of ukraine
var ukr = table.filter(ee.Filter.eq('ADM0_NAME','Ukraine'))
print(ukr)
print(imageCollection2.filterDate('2021-04-01T00:00:00Z','2021-06-01T00:00:00Z'))
var prewar_image=imageCollection2.filterDate('2021-04-01T00:00:00Z','2021-06-16T00:00:00Z').first().select(0).clip(ukr) 
var postwar_image = imageCollection2.filterDate('2022-04-01T00:00:00Z','2023-02-15T00:00:00Z').first().select(0).clip(ukr)
var duringwar = {
  'prewar':prewar_image,
  'postwar':postwar_image,
}
Export.image.toDrive(prewar_image,'ukrainebeforeinvasion')
Export.image.toDrive(postwar_image,'ukraine_after_invasion')
// print(imageCollection.filterDate('2022-08-01T00:00:00Z','2022-10-07T00:00:00Z'))
print(duringwar)
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
    mapToChange.layers().set(0, ui.Map.Layer(duringwar[selection],{'palette':palette,'band':0,'opacity':1}));
  }
  // Configure a selection dropdown to allow the user to choose between images,
  // and set the map to update when a user makes a selection.
  var select = ui.Select({items: Object.keys(duringwar), onChange: updateMap});
  select.setValue(Object.keys(duringwar)[defaultValue], true);
  var controlPanel =
      ui.Panel({widgets: [label, select], style: {position: position}});
  // mapToChange.add(controlPanel);
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
leftMap.setCenter(31.867, 46.496, 6);