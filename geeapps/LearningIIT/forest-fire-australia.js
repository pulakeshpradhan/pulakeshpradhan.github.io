var imageCollection = ui.import && ui.import("imageCollection", "imageCollection", {
      "id": "LANDSAT/LC08/C01/T1_TOA"
    }) || ee.ImageCollection("LANDSAT/LC08/C01/T1_TOA"),
    imageCollection2 = ui.import && ui.import("imageCollection2", "imageCollection", {
      "id": "COPERNICUS/S2"
    }) || ee.ImageCollection("COPERNICUS/S2");
 //////////////////////////////////////////////////////////////////////////////////
// CODE: sentinel Forest Fire Visualization  //
// // 
// Recoded by: Sachchidanand Singh, Ph.D. IIT Roorkee  //
// 
// email: sachin.iirs@gmail.com //
// //
// INPUTS/ARGUMENTS: Just Select dates //
// //
// //
// LAST UPDATED: 2020-1-5 //
//////////////////////////////////////////////////////////////////////////////////
// Demonstrates before/after imagery comparison using sentinel 2 .
var images = 
{
  'Pre Event': sentinelComposite('2019-03-05'),
  '2019-10-01': sentinelComposite('2019-10-01'),
  '2019-10-08': sentinelComposite('2019-10-08'),
  '2019-10-15': sentinelComposite('2019-10-15'),
  '2019-10-22': sentinelComposite('2019-10-22'),
  '2019-10-29': sentinelComposite('2019-10-29'),
  '2019-11-05': sentinelComposite('2019-11-05'),
  '2019-11-12': sentinelComposite('2019-11-12'),
  '2019-11-19': sentinelComposite('2019-11-19'),
  '2019-11-26': sentinelComposite('2019-11-26'),      
  '2019-12-03': sentinelComposite('2019-12-03'),
  '2019-12-10': sentinelComposite('2019-12-10'),
  '2019-12-17': sentinelComposite('2019-12-17'),
  '2019-12-24': sentinelComposite('2019-12-24'),
  '2019-12-31': sentinelComposite('2019-12-31'),
};
// Composite the sentinel-1 ImageCollection for 7 days (inclusive) after the
// given date.
function sentinelComposite(date) {
   date = ee.Date(date);
  var sentinel1 = ee.ImageCollection('COPERNICUS/S2')
                      .filterDate(date, date.advance(1, 'week')).filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 30)).median()
                      ;
  return sentinel1.visualize({
  bands: ['B12', 'B8', 'B3'],
  min:0,
  max:5000,
 gamma: [0.98, 1.1, 1]
});
}
// Create the left map, and have it display non flood layer .
var leftMap = ui.Map();
leftMap.setControlVisibility(false);
var leftSelector = addLayerSelector(leftMap, 0, 'top-left');
// Create the right map, and have it display flood layer .
var rightMap = ui.Map();
//rightMap.setControlVisibility(true);
var rightSelector = addLayerSelector(rightMap,13, 'top-right');
function addLayerSelector(mapToChange, defaultValue, position) {
  var label = ui.Label('Choose A Week ');
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
leftMap.setCenter(150.1509, -32.6144, 12);