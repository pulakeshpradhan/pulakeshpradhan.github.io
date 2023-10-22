var Vietnam = ui.import && ui.import("Vietnam", "table", {
      "id": "USDOS/LSIB_SIMPLE/2017"
    }) || ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017");
// dependencies
// users/LearningIIT/Class:Sentinel 2 Australia Fire Split Panel 
var geometry = Vietnam.filter(ee.Filter.eq('country_na','Vietnam'))
var imageCollection = ee.ImageCollection("COPERNICUS/S2").filterBounds(geometry),
    imageCollection2 = ee.ImageCollection("COPERNICUS/S2").filterBounds(geometry);
Map.centerObject(geometry,6)
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
// LAST UPDATED: 2022-1-5 //
//////////////////////////////////////////////////////////////////////////////////
// Demonstrates before/after imagery comparison using sentinel 2 .
var images = 
{
  '2021-05-01': sentinelComposite('2021-05-01'),
  '2021-05-08': sentinelComposite('2021-05-08'),
  '2021-05-15': sentinelComposite('2021-05-15'),
  '2021-05-22': sentinelComposite('2021-05-22'),
  '2021-05-29': sentinelComposite('2021-05-29'),
  '2021-06-05': sentinelComposite('2021-06-05'),
  '2021-06-12': sentinelComposite('2021-06-12'),
  '2021-06-19': sentinelComposite('2021-06-19'),
  '2021-06-26': sentinelComposite('2021-06-26'),      
  '2021-12-03': sentinelComposite('2021-12-03'),
  '2021-12-10': sentinelComposite('2021-12-10'),
  '2021-12-17': sentinelComposite('2021-12-17'),
  '2021-12-24': sentinelComposite('2021-12-24'),
  '2021-12-31': sentinelComposite('2021-12-31'),
 '2022-05-01': sentinelComposite('2022-05-01'),
  '2022-05-08': sentinelComposite('2022-05-08'),
  '2022-05-15': sentinelComposite('2022-05-15'),
  '2022-05-22': sentinelComposite('2022-05-22'),
  '2022-05-29': sentinelComposite('2022-05-29'),
  '2022-06-05': sentinelComposite('2022-06-05'),
  '2022-06-12': sentinelComposite('2022-06-12'),
  '2022-06-19': sentinelComposite('2022-06-19'),
  '2022-06-26': sentinelComposite('2022-06-26'),      
  '2022-08-03': sentinelComposite('2022-08-03'),
  '2022-08-05': sentinelComposite('2022-08-10'),
  '2022-08-17': sentinelComposite('2022-08-17'),
  '2022-08-24': sentinelComposite('2022-08-24'),
  '2022-08-30': sentinelComposite('2022-08-30'),
};
// Composite the sentinel-1 ImageCollection for 7 days (inclusive) after the
// given date.
function sentinelComposite(date) {
   date = ee.Date(date);
  var sentinel1 = ee.ImageCollection('COPERNICUS/S2')
                      .filterDate(date, date.advance(1, 'week')).filterBounds(geometry).filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 30)).median()
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
leftMap.setCenter(105.485, 19.172, 8);
//