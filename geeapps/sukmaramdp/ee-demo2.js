var roi = ui.import && ui.import("roi", "table", {
      "id": "users/sukmaramdp/PT_KPAM"
    }) || ee.FeatureCollection("users/sukmaramdp/PT_KPAM"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                110.90843671667862,
                -2.6784414181811917
              ],
              [
                110.90843671667862,
                -2.822470824093078
              ],
              [
                111.11923688757706,
                -2.822470824093078
              ],
              [
                111.11923688757706,
                -2.6784414181811917
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#98ff00",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #98ff00 */ee.Geometry.Polygon(
        [[[110.90843671667862, -2.6784414181811917],
          [110.90843671667862, -2.822470824093078],
          [111.11923688757706, -2.822470824093078],
          [111.11923688757706, -2.6784414181811917]]], null, false);
// Demonstrates before/after imagery comparison with a variety of dates.
var images = {
  '2019-07-26': ee.ImageCollection('COPERNICUS/S2_SR').filterDate('2019-07-25','2019-07-27').filterBounds(geometry), 
  '2019-09-04': ee.ImageCollection('COPERNICUS/S2_SR').filterDate('2019-09-03','2019-09-05').filterBounds(geometry),
  '2019-09-19': ee.ImageCollection('COPERNICUS/S2_SR').filterDate('2019-09-18','2019-09-20').filterBounds(geometry),
  '2019-10-14': ee.ImageCollection('COPERNICUS/S2_SR').filterDate('2019-10-13','2019-10-15').filterBounds(geometry),
  '2019-10-24': ee.ImageCollection('COPERNICUS/S2_SR').filterDate('2019-10-23','2019-10-25').filterBounds(geometry),
  };
var s2VisPar = {bands:['B11','B8','B2'],min:180,max:6624,opacity:1,gamma:1} 
var blank = ee.Image(0).mask(0); 
var outline = blank.paint(roi, 'AA0000', 2); 
var visPar = {palette:'00ffff',opacity: 1};
Map.addLayer(outline,visPar,'roi',true);
// Set up the maps and control widgets.
// Create the left map, and have it display layer 0.
var leftMap = ui.Map();
leftMap.setControlVisibility(false);
var leftSelector = addLayerSelector(leftMap, 0, 'top-left');
// Create the right map, and have it display layer 1.
var rightMap = ui.Map();
rightMap.setControlVisibility(false);
var rightSelector = addLayerSelector(rightMap, 2, 'top-right');
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
leftMap.setCenter(111.02926844133363,-2.7537017819794154, 13);