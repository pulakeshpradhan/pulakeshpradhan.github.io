//////////////////////////////////////////////////////////////////////////////////
// CODE: Landsat Forest Fire Visualization  //
// // 
// Recoded by: Sachchidanand Singh, M. Tech. IIRS, Dehradun  //
// 
// email: sachin.iirs@gmail.com //
// //
// INPUTS/ARGUMENTS: Just Select dates //
// //
// //
// LAST UPDATED: 2020-1-5 //
//////////////////////////////////////////////////////////////////////////////////
// Demonstrates before/after imagery comparison using Landsat 8 .
// These images track the major flooding in Odhisha due to Fani cyclone in 2019
var images = {
  //'2019-03-14': LandsatComposite('2019-03-14'),
  'October': LandsatComposite('2019-10-1'),
  'November': LandsatComposite('2019-11-1'),
  'December': LandsatComposite('2019-12-1'),
  //'2019-12-28': LandsatComposite('2019-03-28'),
  // '2019-07-1': LandsatComposite('2019-07-1'),
  // '2019-07-15': LandsatComposite('2019-07-15'),
  // '2019-07-21': LandsatComposite('2019-07-21'),
  // '2019-07-28': LandsatComposite('2019-07-28'),
  // //'2019-05-16': LandsatComposite('2019-05-16'),
};
// Composite the Landsat-1 ImageCollection for 7 days (inclusive) after the
// given date.
function LandsatComposite(date) {
   date = ee.Date(date);
  //var polarization = 'VV';
  var Landsat1 = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA')
                      .filterDate(date, date.advance(1, 'month')).filterMetadata('CLOUD_COVER', "LESS_THAN",30).median()
                      ;
  return Landsat1.visualize({
  bands: ['B7', 'B5', 'B2'],
  min: 0,
  max: 0.5,
  gamma: [0.95, 1.1, 1]
});
}
// Create the left map, and have it display non flood layer .
var leftMap = ui.Map();
//leftMap.setControlVisibility(true);
var leftSelector = addLayerSelector(leftMap, 0, 'top-left');
// Create the right map, and have it display flood layer .
var rightMap = ui.Map();
//rightMap.setControlVisibility(true);
var rightSelector = addLayerSelector(rightMap, 2, 'top-right');
function addLayerSelector(mapToChange, defaultValue, position) {
  var label = ui.Label('Select a Month ');
  // This function changes the given map to show the selected image.
  function updateMap(selection) {
    mapToChange.layers().set(1, ui.Map.Layer(images[selection]));
  }
  // Configure a selection dropdown to allow the user to choose between images,
  // and set the map to update when a user makes a selection.
  var select = ui.Select({items: Object.keys(images), onChange: updateMap});
  select.setValue(Object.keys(images)[defaultValue], true);
  var controlPanel = 
      ui.Panel({widgets: [label, select], style: {position: position}});
  mapToChange.add(controlPanel);
} 
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
leftMap.setCenter(150.1157, -33.3028, 12);