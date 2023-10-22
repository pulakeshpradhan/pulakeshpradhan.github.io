var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                83.22045748866037,
                29.032269219594927
              ],
              [
                83.22045748866037,
                19.347548234876257
              ],
              [
                95.43725436366037,
                19.347548234876257
              ],
              [
                95.43725436366037,
                29.032269219594927
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[83.22045748866037, 29.032269219594927],
          [83.22045748866037, 19.347548234876257],
          [95.43725436366037, 19.347548234876257],
          [95.43725436366037, 29.032269219594927]]], null, false),
    image = ui.import && ui.import("image", "image", {
      "id": "users/shubhanu/GangeticPlainFloodJuly2020"
    }) || ee.Image("users/shubhanu/GangeticPlainFloodJuly2020"),
    image2 = ui.import && ui.import("image2", "image", {
      "id": "users/shubhanu/GangeticPlainFloodMay2020"
    }) || ee.Image("users/shubhanu/GangeticPlainFloodMay2020");
// Demonstrates before/after imagery comparison with a variety of dates.
var indiaFilter = ee.Filter.eq('country_na', 'India');
var bangladeshFilter = ee.Filter.eq('country_na', 'Bangladesh');
var nepalFilter = ee.Filter.eq('country_na', 'Nepal');
var twoFilter = ee.Filter.or(indiaFilter,bangladeshFilter, nepalFilter);
var india = ee.FeatureCollection('USDOS/LSIB_SIMPLE/2017')
  .filter(twoFilter);
/*
 * Configure the imagery
 */
// These Sentinel-1 images track the major flooding in Myanmar during the 2018
// monsoon season: https://www.bbc.com/news/world-asia-44962585
var images = {
  'Before Floods Summer 2020': image2.clipToCollection(india),
  'After Floods Summer 2020': image.clipToCollection(india),
};
// Composite the Sentinel-1 ImageCollection for 7 days (inclusive) after the
// given date.
function getWeeklySentinelComposite(date) {
  var date = ee.Date(date);
  // Only include the VV polarization, for consistent compositing.
  var polarization = 'VV';
  var sentinel1 = ee.ImageCollection('COPERNICUS/S2')
                      .filterDate(date, date.advance(5, 'day'))
                      .mean();
  return sentinel1.visualize({min: 544, max: 3200, bands: ['B11', 'B8', 'B2'], gamma:1.8});
}
/*
 * Set up the maps and control widgets
 */
// Create the left map, and have it display layer 0.
var leftMap = ui.Map();
leftMap.setOptions("TERRAIN");
leftMap.setControlVisibility(false);
leftMap.setControlVisibility({scaleControl: true, zoomControl: true});
var leftSelector = addLayerSelector(leftMap, 0, 'top-left');
leftMap.add(ui.Label(
    'GreenGood Labs Flood Detector www.greengoodlabs.com', {fontWeight: 'bold', fontSize: '24px'}, 'http://www.greengoodlabs.com'));
// Create the right map, and have it display layer 1.
var rightMap = ui.Map();
rightMap.setOptions("TERRAIN");
//rightMap.setControlVisibility(false);
rightMap.setControlVisibility({scaleControl: true, zoomControl: true, fullscreenControl:false});
var rightSelector = addLayerSelector(rightMap, 1, 'top-right');
rightMap.add(ui.Label(
    'GreenGood Labs Flood Detector www.greengoodlabs.com', {fontWeight: 'bold', fontSize: '24px'}, 'http://www.greengoodlabs.com'));
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
//Map.add(ui.Label(
 //   'GreenGood Labs Flood Explorer', {fontWeight: 'bold', fontSize: '24px'}));
var linker = ui.Map.Linker([leftMap, rightMap]);
leftMap.setCenter(85.9751, 25.4792, 10);