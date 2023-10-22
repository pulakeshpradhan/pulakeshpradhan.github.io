// var s1 = sentinel1.filterDate('2020-06-20', '2019-06-30').filterBounds(geometry)
// print(s1)
//COPERNICUS/S1_GRD/S1A_IW_GRDH_1SDV_20190603T114908_20190603T114933_027515_031AD5_5ED0
// Demonstrates before/after imagery comparison with a variety of dates.
/*
 * Configure the imagery
 */
// These Sentinel-1 images track the major flooding along the Siang river in 2020
var images = {
  '2020-05-10': getWeeklySentinelComposite('2020-05-10'),
  '2020-05-17': getWeeklySentinelComposite('2020-05-17'),
  '2020-05-24': getWeeklySentinelComposite('2020-05-24'),
  '2020-05-31': getWeeklySentinelComposite('2020-05-31'),
  '2020-06-07': getWeeklySentinelComposite('2020-06-07'),
  '2020-06-14': getWeeklySentinelComposite('2020-06-14'),
  '2020-06-21': getWeeklySentinelComposite('2020-06-21'),
  '2020-06-28': getWeeklySentinelComposite('2020-06-28'),
  '2020-07-05': getWeeklySentinelComposite('2020-07-05'),
  '2020-07-12': getWeeklySentinelComposite('2020-07-12'),
  '2020-07-19': getWeeklySentinelComposite('2020-07-19'),
  '2020-07-26': getWeeklySentinelComposite('2020-07-26')
};
// Composite the Sentinel-1 ImageCollection for 7 days (inclusive) after the
// given date.
function getWeeklySentinelComposite(date) {
  var date = ee.Date(date);
  // Only include the VV polarization, for consistent compositing.
  var polarization = 'VV';
  var sentinel1 = ee.ImageCollection('COPERNICUS/S1_GRD')
                      .filterDate(date, date.advance(1, 'week'))
                      .filter(ee.Filter.listContains(
                          'transmitterReceiverPolarisation', polarization))
                      .filter(ee.Filter.eq('instrumentMode', 'IW'))
                      .select(polarization)
                      .mean();
  return sentinel1.visualize({min: -20, max: 0, palette: ['black', '#72c9d8']});
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
rightMap.setControlVisibility(true);
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
leftMap.setCenter(95.2888, 27.9115, 10);