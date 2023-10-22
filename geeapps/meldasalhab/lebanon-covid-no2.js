////////////////////////////////Importing data//////////////////////////
// Comment out one of the sentinel5 variables
// First gets S5 Near Real Time images
// Second gets S5 Offline Images
function getBiweeklyS5Composite(date) {
  date = ee.Date(date);
  var sentinel5 = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2')
  //var sentinel5 = ee.mImageCollection('COPERNICUS/S5P/OFFL/L3_NO2')
                      .filterDate(date, date.advance(2, 'week'))
                      .select('NO2_column_number_density')
                      .mean();
  return sentinel5.visualize({ min: 0, max: 0.0002,
      palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red'],
      opacity:0.6
      });
}
function getMonthlyS5Composite(date1) {
  date1 = ee.Date(date1);
  var sentinel5 = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2')
  //var sentinel5 = ee.ImageCollection('COPERNICUS/S5P/OFFL/L3_NO2')
                      .filterDate(date1, date1.advance(1, 'month'))
                      .select('NO2_column_number_density')
                      .mean();
  return sentinel5.visualize({ min: 0, max: 0.0002,
      palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red'],
      opacity:0.9
      });
}
function getWeeklyS5Composite(date2) {
  date2 = ee.Date(date2);
  var sentinel5 = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2')
  //var sentinel5 = ee.ImageCollection('COPERNICUS/S5P/OFFL/L3_NO2')
                      .filterDate(date2, date2.advance(1, 'week'))
                      .select('NO2_column_number_density')
                      .mean();
  return sentinel5.visualize({ min: 0, max: 0.0002,
      palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red'],
      opacity:0.9
      });
}
var images = {
  '2020 - Jan average': getMonthlyS5Composite('2020-01-01'),
  '2020 - Feb average': getMonthlyS5Composite('2020-02-01'),
  '2020 - Mar average': getMonthlyS5Composite('2020-03-01'),
  '2020 - Apr average': getMonthlyS5Composite('2020-04-01'),
  '2020 - May average': getMonthlyS5Composite('2020-05-01'),
  '2020 - June average': getMonthlyS5Composite('2020-06-01'),
  '2020 - July average': getMonthlyS5Composite('2020-07-01'),
  '2019 - Jan average': getMonthlyS5Composite('2019-01-01'),
  '2019 - Feb average': getMonthlyS5Composite('2019-02-01'),
  '2019 - Mar average': getMonthlyS5Composite('2019-03-01'),
  '2019 - Apr average': getMonthlyS5Composite('2019-04-01'),
  '2019 - May average': getMonthlyS5Composite('2019-05-01'),
  '2019 - June average': getMonthlyS5Composite('2019-06-01'),
  '2019 - July average': getMonthlyS5Composite('2019-07-01'),
  // The weekly composites don't work very well with OFFL is chosen over RLTI
  // 'March WK1': getWeeklyS5Composite('2020-03-01'),
  // 'March WK2': getWeeklyS5Composite('2020-03-07'),
  // 'March WK3': getWeeklyS5Composite('2020-03-14'),
  // 'March WK4': getWeeklyS5Composite('2020-03-21'),
};
print(images);
var band_viz = {
  min: 0,
  max: 0.0002,
  palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red'],
  opacity: 0.7
};
////////////////////////////////Setting up maps and widgets//////////////////////////
// Create the left map, and have it display layer 0.
var leftMap = ui.Map();
leftMap.setControlVisibility(false);
var leftSelector = addLayerSelector(leftMap, 1, 'top-left');
// Create the right map, and have it display layer 1.
var rightMap = ui.Map();
rightMap.setControlVisibility(false);
var rightSelector = addLayerSelector(rightMap, 3, 'top-right');
// Adds a layer selection widget to the given map, to allow users to change
// which image is displayed in the associated map.
function addLayerSelector(mapToChange, defaultValue, position) {
  var label = ui.Label('Select a time period');
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
////////////////////////////////Generating Final Display//////////////////////////
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
leftMap.setCenter(35.50614947922791,33.87469581473758, 6);
////////////////////////////////Adding country boundary outline//////////////////////////
// var boundaries = ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017")
// // Create an empty image into which to paint the features, cast to byte.
// var empty = ee.Image().byte();
// // Paint all the polygon edges with the same number and width, display.
// var outline = empty.paint({
//   featureCollection: boundaries,
//   color: 1,
//   width: 3
// });
// Map.addLayer(outline, {palette: '000000'}, 'edges');