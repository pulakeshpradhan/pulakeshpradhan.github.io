var roi = ui.import && ui.import("roi", "table", {
      "id": "users/sukmaramdp/PT_Bumi_Mekar_Hijau_IUPHHK"
    }) || ee.FeatureCollection("users/sukmaramdp/PT_Bumi_Mekar_Hijau_IUPHHK"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                105.14310639685908,
                -2.8040398898492613
              ],
              [
                105.14310639685908,
                -4.076131257487346
              ],
              [
                106.00003999060908,
                -4.076131257487346
              ],
              [
                106.00003999060908,
                -2.8040398898492613
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
        [[[105.14310639685908, -2.8040398898492613],
          [105.14310639685908, -4.076131257487346],
          [106.00003999060908, -4.076131257487346],
          [106.00003999060908, -2.8040398898492613]]], null, false);
// Demonstrates before/after imagery comparison with a variety of dates.
var images = {
  '2019-05-03': ee.ImageCollection('COPERNICUS/S2_SR').filterDate('2019-05-02','2019-05-04').filterBounds(geometry),
  '2019-08-06': ee.ImageCollection('COPERNICUS/S2_SR').filterDate('2019-08-05','2019-08-07').filterBounds(geometry),
  '2019-09-10': ee.ImageCollection('COPERNICUS/S2_SR').filterDate('2019-09-09','2019-09-11').filterBounds(geometry),
  '2019-09-15': ee.ImageCollection('COPERNICUS/S2_SR').filterDate('2019-09-14','2019-09-16').filterBounds(geometry),
  '2019-11-09': ee.ImageCollection('COPERNICUS/S2_SR').filterDate('2019-11-08','2019-11-10').filterBounds(geometry),
  '2020-03-03': ee.ImageCollection('COPERNICUS/S2_SR').filterDate('2020-03-02','2020-03-04').filterBounds(geometry),
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
var rightSelector = addLayerSelector(rightMap, 4, 'top-right');
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
leftMap.setCenter(105.58507500657078,-3.8877497942026378, 13);