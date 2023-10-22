var sentinel1 = ui.import && ui.import("sentinel1", "imageCollection", {
      "id": "COPERNICUS/S1_GRD"
    }) || ee.ImageCollection("COPERNICUS/S1_GRD"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                94.03654560314908,
                28.6955359822823
              ],
              [
                94.03654560314908,
                28.202897989426422
              ],
              [
                94.82206806408658,
                28.202897989426422
              ],
              [
                94.82206806408658,
                28.6955359822823
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
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Polygon(
        [[[94.03654560314908, 28.6955359822823],
          [94.03654560314908, 28.202897989426422],
          [94.82206806408658, 28.202897989426422],
          [94.82206806408658, 28.6955359822823]]], null, false),
    RE2013 = ui.import && ui.import("RE2013", "imageCollection", {
      "id": "users/csheth/dibang-glacier/2013-09-14"
    }) || ee.ImageCollection("users/csheth/dibang-glacier/2013-09-14"),
    RE2015 = ui.import && ui.import("RE2015", "imageCollection", {
      "id": "users/csheth/dibang-glacier/2015-10-19"
    }) || ee.ImageCollection("users/csheth/dibang-glacier/2015-10-19");
// var s1 = sentinel1.filterDate('2019-06-01', '2019-06-08').filterBounds(geometry)
// print(s1)
//COPERNICUS/S1_GRD/S1A_IW_GRDH_1SDV_20190603T114908_20190603T114933_027515_031AD5_5ED0
// Demonstrates before/after imagery comparison with a variety of dates.
/*
 * Configure the imagery
 */
// These Sentinel-1 images track the major flooding along the Tsangpo river in 2018
var images = {
  '2014 October': getWeeklySentinelComposite('2014-10-04'),
  '2015 April': getWeeklySentinelComposite('2015-04-02'),
  '2015 June': getWeeklySentinelComposite('2015-06-02'),  
  '2015 August Early': getWeeklySentinelComposite('2015-08-02'),
  '2015 August End': getWeeklySentinelComposite('2015-08-30'),
  '2015-09-06': getWeeklySentinelComposite('2015-09-06'),
  '2015-09-13': getWeeklySentinelComposite('2015-09-13'),
  '2015-09-20': getWeeklySentinelComposite('2015-09-20'),
  '2015-09-27': getWeeklySentinelComposite('2015-09-27'),
  '2015-10-04': getWeeklySentinelComposite('2015-10-04'),
  '2015-10-11': getWeeklySentinelComposite('2015-10-11'),
  '2016-08-16': getWeeklySentinelComposite('2016-08-16'),
  '2016-08-23': getWeeklySentinelComposite('2016-08-23'),
  '2016-08-30': getWeeklySentinelComposite('2016-08-30'),
  '2016-09-06': getWeeklySentinelComposite('2016-09-06'),
  '2016-09-13': getWeeklySentinelComposite('2016-09-13'),
  '2016-09-20': getWeeklySentinelComposite('2016-09-20'),
  '2016-09-27': getWeeklySentinelComposite('2016-09-27'),
  '2016-10-04': getWeeklySentinelComposite('2016-10-04'),
  '2016-10-11': getWeeklySentinelComposite('2016-10-11'),
  '2017-09-02': getWeeklySentinelComposite('2017-09-02'),
  '2018-06-03': getWeeklySentinelComposite('2018-06-03'),
  '2018-07-08': getWeeklySentinelComposite('2018-07-08'),
  '2018-07-22': getWeeklySentinelComposite('2018-07-22'),
  '2019-04-21': getWeeklySentinelComposite('2019-04-21'),
  '2019-04-28': getWeeklySentinelComposite('2019-04-28'),
  '2019-05-26': getWeeklySentinelComposite('2019-05-26'),
  '2019-06-30': getWeeklySentinelComposite('2019-06-30'),
  '2019-07-21': getWeeklySentinelComposite('2019-07-21'),
  '2019-08-11': getWeeklySentinelComposite('2019-08-11'),
  '2019-08-11': getWeeklySentinelComposite('2020-05-11'),
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