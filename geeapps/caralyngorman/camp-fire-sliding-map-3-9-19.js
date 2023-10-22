var l8raw = ee.ImageCollection("LANDSAT/LC08/C01/T1_RT"),
    point = /* color: #ffffff */ee.Geometry.Point([-121.58175006029006, 39.79795952094922]),
    polygon = /* color: #d63000 */ee.Geometry.Polygon(
        [[[-122.29387505203397, 39.75970775333331],
          [-122.14281304031522, 39.44227157704497],
          [-121.33806450515897, 39.26812516259104],
          [-120.56395752578885, 39.77026389195945],
          [-121.16271240860135, 40.124008702619356],
          [-121.91527588516385, 40.027331890961264]]]),
    geometry = /* color: #ffc82d */ee.Geometry.Polygon(
        [[[-121.63133719974849, 39.49029456402161],
          [-121.22896293217036, 39.81489535358688],
          [-121.39214167603257, 39.92403714347543],
          [-121.54207328373286, 40.01817943303723],
          [-121.94856742435786, 39.7040470620878]]]),
    imagebefore = ee.Image("LANDSAT/LC08/C01/T1_RT_TOA/LC08_044032_20131025"),
    imageduring = ee.Image("LANDSAT/LC08/C01/T1_RT_TOA/LC08_044032_20181108"),
    imageafter = ee.Image("LANDSAT/LC08/C01/T1_RT_TOA/LC08_044032_20181226");
// Add a color-SWIR composite to the default Map.
Map.addLayer(imagebefore.clip(geometry), {bands: ['B6', 'B5', 'B2'], max: 0.5}, 'Before (10-25-2013)');
// Make another map and add a color-NIR composite to it.
var linkedMap = ui.Map();
linkedMap.addLayer(imageduring.clip(geometry), {bands: ['B6', 'B5', 'B2'], max: 0.5}, 'During (11-08-2018)');
// Add a thermal image to the map.
linkedMap.addLayer(imageafter.clip(geometry), {bands: ['B6', 'B5', 'B2'], max: 0.5}, 'After (12-26-2018)');
// Link the default Map to the other map.
var linker = ui.Map.Linker([ui.root.widgets().get(0), linkedMap]);
// // Make an inset map and add it to the linked map.
// var inset = ui.Map({style: {position: "bottom-right"}});
// linkedMap.add(inset);
// // Register a function to the linked map to update the inset map.
// linkedMap.onChangeBounds(function() {
//   var bounds = ee.Geometry.Rectangle(Map.getBounds());
//   inset.centerObject(bounds);
//   inset.layers().set(0, bounds);
// });
// Create a SplitPanel which holds the linked maps side-by-side.
var splitPanel = ui.SplitPanel({
  firstPanel: linker.get(0),
  secondPanel: linker.get(1),
  orientation: 'horizontal',
  wipe: true,
  style: {stretch: 'both'}
});
// Create an empty panel in which to arrange widgets.
// The layout is vertical flow by default.
var panel = ui.Panel({style: {width: '200px', height: '200px'}})
    .add(ui.Label('Use Layers tab at left to change image showing on map. Results are best when only one image is checked at a time. Transparency can be changed using the sliding bar next to image title. '));
// Set the SplitPanel as the only thing in root.
ui.root.widgets().reset([splitPanel 
// ,panel
]);
Map.setCenter(-121.633759, 39.767380, 11);
// Create the title label.
// var title = ui.Label('Thank you for taking a look at our Camp Fire GEE App!');
// title.style().set('position', 'bottom-left');
// title.style().set({
//   fontSize: '12px',
//   fontWeight: 'bold',
//   padding: '12px',
//   width: '175px'
// });
// Map.add(title);
var body = ui.Label('Thank you for taking a look at our Camp Fire GEE App! Use the `Layers` tab in the top right to change the image showing on the map. Results are best when only one image is checked at a time. The basemap can be changed using the `Map` and `Satellite` buttons. Transparency can be changed in the `Layers` tab using the sliding bar next to the image title.');
body.style().set('position', 'bottom-left');
body.style().set({
  fontSize: '12px',
  padding: '10px',
  width: '175px'
});
Map.add(body);