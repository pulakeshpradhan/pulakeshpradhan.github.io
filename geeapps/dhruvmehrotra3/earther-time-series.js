var palettes = require('users/gena/packages:palettes');
var palette = palettes.misc.tol_rainbow[7];
var images = {
  '2019-12-21': getWeeklySentinelComposite('2019-12-21'),
  '2020-01-21': getWeeklySentinelComposite('2020-01-21'),
  '2020-02-21': getWeeklySentinelComposite('2020-02-21'),
  '2020-03-20': getWeeklySentinelComposite('2020-03-20')
};
function getWeeklySentinelComposite(date) {
  date = ee.Date(date);
  // Only include the VV polarization, for consistent compositing.
  var polarization = 'VV';
  var sentinel1 = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2')
                      .select('NO2_column_number_density')
                      .filterDate(date, date.advance(1, 'month'))
                      .mean();
  return sentinel1.visualize({min: 0, max:0.0002 ,palette: palette});
}
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
Map.setCenter(-86.1946431,41.1457775, 4);