var kayapo60 = ee.FeatureCollection("users/shugh/amazon/Kayapo/Kayapo60kmBuffer"),
    geometry = /* color: #d63000 */ee.Geometry.Polygon(
        [[[-56.74668877370476, -5.101345333452675],
          [-56.74668877370476, -11.963565209738734],
          [-49.42979424245476, -11.963565209738734],
          [-49.42979424245476, -5.101345333452675]]], null, false),
    kayapo = ee.FeatureCollection("users/shugh/amazon/Kayapo/KayapoBoundaryWhole2"),
    legalAmazon = ee.FeatureCollection("users/shugh/amazon/legal_amazon");
// Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();
// Paint all the polygon edges with the same number and width, display.
var outline = empty.paint({
  featureCollection: kayapo,
  width: 3
});
 var collection = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR').filterBounds(geometry)
 .filterDate('2016-01-01','2019-09-01').sort('system:time_start',false);
var mask = require('users/fitoprincipe/geetools:cloud_masks') 
var mask_function = mask.landsatSR() // mask function
//var cloudFreeCollection = collection.map(CloudMaskS2);
var cloudFreeCollection = collection.map(mask_function);
var viz = {bands: ['B4', 'B3', 'B2'], min: 0, max: 3000};
var landsat16 = cloudFreeCollection.filterDate('2016-01-01','2016-12-31').median().visualize(viz)
var landsat17 = cloudFreeCollection.filterDate('2017-01-01','2017-12-31').median().visualize(viz)
var landsat18 = cloudFreeCollection.filterDate('2018-01-01','2018-12-31').median().visualize(viz)
var landsat19 = cloudFreeCollection.filterDate('2019-01-01','2019-09-10').median().visualize(viz)
//var reducedCollection = cloudFreeCollection.reduce(ee.Reducer.firstNonNull());
var images = {
  '2016': landsat16,
  '2017': landsat17,
  '2018': landsat18,
  '2019': landsat19
}
/*
 * Set up the maps and control widgets
 */
// Create the left map, and have it display layer 0.
var leftMap = ui.Map();
leftMap.setControlVisibility(false);
leftMap.centerObject(kayapo,8)
var leftSelector = addLayerSelector(leftMap, 0, 'top-left');
// Create the right map, and have it display layer 1.
var rightMap = ui.Map();
rightMap.setControlVisibility(false);
rightMap.centerObject(kayapo,8)
var rightSelector = addLayerSelector(rightMap, 1, 'top-right');
// Adds a layer selection widget to the given map, to allow users to change
// which image is displayed in the associated map.
function addLayerSelector(mapToChange, defaultValue, position) {
  var label = ui.Label('Choose an image to visualize');
  // This function changes the given map to show the selected image.
  function updateMap(selection) {
    mapToChange.layers().set(0, ui.Map.Layer(images[selection]));
    mapToChange.layers().set(1, ui.Map.Layer(outline,{palette: "orange"}))
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