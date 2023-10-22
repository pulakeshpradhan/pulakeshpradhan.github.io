var roi = ui.import && ui.import("roi", "table", {
      "id": "users/sukmaramdp/KS"
    }) || ee.FeatureCollection("users/sukmaramdp/KS"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                111.70692429782771,
                -3.0925899980746174
              ],
              [
                111.70692429782771,
                -3.6245098260793314
              ],
              [
                112.02278123142146,
                -3.6245098260793314
              ],
              [
                112.02278123142146,
                -3.0925899980746174
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
        [[[111.70692429782771, -3.0925899980746174],
          [111.70692429782771, -3.6245098260793314],
          [112.02278123142146, -3.6245098260793314],
          [112.02278123142146, -3.0925899980746174]]], null, false);
// Demonstrates before/after imagery comparison with a variety of dates.
var images = {
  '2017-11-30': ee.ImageCollection('COPERNICUS/S2').filterDate('2017-11-29','2017-12-01').filterBounds(geometry),
  '2017-12-20': ee.ImageCollection('COPERNICUS/S2').filterDate('2017-12-19','2017-12-21').filterBounds(geometry),
  '2018-01-09': ee.ImageCollection('COPERNICUS/S2').filterDate('2018-01-08','2018-01-10').filterBounds(geometry),
  '2018-02-08': ee.ImageCollection('COPERNICUS/S2').filterDate('2018-02-07','2018-02-09').filterBounds(geometry),
  '2018-03-30': ee.ImageCollection('COPERNICUS/S2').filterDate('2018-03-29','2018-03-31').filterBounds(geometry),
  '2018-04-04': ee.ImageCollection('COPERNICUS/S2').filterDate('2018-04-03','2018-04-05').filterBounds(geometry),
  '2018-08-17': ee.ImageCollection('COPERNICUS/S2').filterDate('2018-08-16','2018-08-18').filterBounds(geometry),
  '2018-09-21': ee.ImageCollection('COPERNICUS/S2').filterDate('2018-09-20','2018-09-22').filterBounds(geometry),
  '2018-10-31': ee.ImageCollection('COPERNICUS/S2').filterDate('2018-10-30','2018-11-01').filterBounds(geometry),
  '2018-11-20': ee.ImageCollection('COPERNICUS/S2').filterDate('2018-11-19','2018-11-21').filterBounds(geometry),
  '2018-12-20': ee.ImageCollection('COPERNICUS/S2').filterDate('2018-12-19','2018-12-21').filterBounds(geometry),
  '2019-01-04': ee.ImageCollection('COPERNICUS/S2').filterDate('2019-01-03','2019-01-05').filterBounds(geometry),
  '2019-07-08': ee.ImageCollection('COPERNICUS/S2').filterDate('2019-07-07','2019-07-09').filterBounds(geometry),
  '2019-07-28': ee.ImageCollection('COPERNICUS/S2').filterDate('2019-07-27','2019-07-29').filterBounds(geometry),
  '2019-08-22': ee.ImageCollection('COPERNICUS/S2').filterDate('2019-08-21','2019-08-23').filterBounds(geometry),
  '2019-09-01': ee.ImageCollection('COPERNICUS/S2').filterDate('2019-09-01','2019-09-03').filterBounds(geometry),
  '2019-09-11': ee.ImageCollection('COPERNICUS/S2').filterDate('2019-09-10','2019-09-12').filterBounds(geometry),
  '2020-08-06': ee.ImageCollection('COPERNICUS/S2').filterDate('2020-08-05','2020-08-07').filterBounds(geometry),
};
var s2VisPar = {bands:['B11','B8','B2'],min:180,max:6624,opacity:1,gamma:1} 
var blank = ee.Image(0).mask(0); 
var outline = blank.paint(roi, 'AA0000', 2); 
var visPar = {palette:'00ffff',opacity: 1};
Map.addLayer(outline,visPar,'roi',true);
// Set up the maps and control widgets.....
// Create the left map, and have it display layer 0.
var leftMap = ui.Map();
leftMap.setControlVisibility(false);
var leftSelector = addLayerSelector(leftMap, 0, 'top-left');
// Create the right map, and have it display layer 1.
var rightMap = ui.Map();
rightMap.setControlVisibility(false);
var rightSelector = addLayerSelector(rightMap, 16, 'top-right');
// Adds a layer selection widget to the given map, to allow users to change
// which image is displayed in the associated map.
function addLayerSelector(mapToChange, defaultValue, position) {
  var label = ui.Label('Choose an image to visualize');
  // This function changes the given map to show the selected image.
  function updateMap(selection) {
    mapToChange.layers().set(0, ui.Map.Layer(images[selection],s2VisPar));
    // mapToChange.layers().set(1, ui.Map.Layer(outline,visPar));
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
leftMap.centerObject(geometry, 13);