// Demonstrates before/after imagery comparison with a variety of dates.
/*
 * Configure the imagery
 */
// These Sentinel-1 images track the major flooding in Myanmar during the 2018
// monsoon season: https://www.bbc.com/news/world-asia-44962585
var images = {
  '2018-07-21': getWeeklySentinelComposite('2018-07-21'),
  '2018-07-28': getWeeklySentinelComposite('2018-07-28'),
  '2018-08-18': getWeeklySentinelComposite('2018-08-18'),
  '2018-09-15': getWeeklySentinelComposite('2018-09-15'),
  '2020-09-15': getWeeklySentinelComposite('2020-09-23'),
  '2020-08-15': getWeeklySentinelComposite('2020-09-15'),
  '2021-09-15': getWeeklySentinelComposite('2021-09-23'),
  '2022-09-15': getWeeklySentinelComposite('2022-09-23'),
  '2022-08-15': getWeeklySentinelComposite('2022-08-23'),
  '2021-07-15': getWeeklySentinelComposite('2021-07-23'),
  '2021-10-15': getWeeklySentinelComposite('2021-10-23'),
};
// Composite the Sentinel-1 ImageCollection for 7 days (inclusive) after the
// given date.
function getWeeklySentinelComposite(date) {
  var date = ee.Date(date);
  // Only include the VV polarization, for consistent compositing.
  var polarization = 'VV';
  var sentinel1 = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2')
                      .filterDate(date, date.advance(1, 'week'))
                      .select('NO2_column_number_density')
                      .mean();
  return sentinel1.visualize({min: 0.00001, max: 0.0002, palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red']});
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
  var label = ui.Label('Kadar NO2 (Waktu)');
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
leftMap.setCenter( 105.39791037, -5.1032252, 12);