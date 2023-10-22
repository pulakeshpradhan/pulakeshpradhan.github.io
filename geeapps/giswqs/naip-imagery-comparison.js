// Author: Qiusheng Wu (https://wetlands.io | http://GIShub.org) //
// Demonstrates before/after imagery comparison with a variety of dates.
/*
 * Configure the imagery
 */
var getAnnualNAIP = function(year) {
  var collection = ee.ImageCollection('USDA/NAIP/DOQQ');
  var start_date = year + '-01-01';
  var end_date = year + '-12-31';
  var naip = collection.filterDate(start_date, end_date)
    .filter(ee.Filter.listContains("system:band_names", "N"));
  // print(naip.first())
  // return naip;
  return ui.Map.Layer(naip, {bands: ['N', 'R', 'G']}, year);
};
var images = {
  '2009': getAnnualNAIP('2009'),
  '2010': getAnnualNAIP('2010'),
  '2011': getAnnualNAIP('2011'),
  '2012': getAnnualNAIP('2012'),
  '2013': getAnnualNAIP('2013'),
  '2014': getAnnualNAIP('2014'),
  '2015': getAnnualNAIP('2015'),
  '2016': getAnnualNAIP('2016'),
  '2017': getAnnualNAIP('2017'),
  '2018': getAnnualNAIP('2018'),
  '2019': getAnnualNAIP('2019'),
  '2020': getAnnualNAIP('2020'),
  '2021': getAnnualNAIP('2021')
};
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
var rightSelector = addLayerSelector(rightMap, 8, 'top-right');
// Adds a layer selection widget to the given map, to allow users to change
// which image is displayed in the associated map.
function addLayerSelector(mapToChange, defaultValue, position) {
  var label = ui.Label('Choose an image to visualize');
  // This function changes the given map to show the selected image.
  function updateMap(selection) {
    // mapToChange.layers().set(0, ui.Map.Layer(images[selection]));
    mapToChange.layers().set(0, images[selection]);
  }
  // Configure a selection dropdown to allow the user to choose between images,
  // and set the map to update when a user makes a selection.
  var select = ui.Select({items: Object.keys(images), onChange: updateMap});
  select.setValue(Object.keys(images)[defaultValue], true);
  var controlPanel =
      ui.Panel({widgets: [label, select], style: {position: position}});
  mapToChange.add(controlPanel);
}
// Make an inset map and add it to the linked map.
var inset = ui.Map({style: {position: "bottom-right"}});
inset.setControlVisibility(false);
rightMap.add(inset);
// Register a function to the linked map to update the inset map.
rightMap.onChangeBounds(function() {
  var bounds = ee.Geometry.Rectangle(leftMap.getBounds());
  inset.centerObject(bounds);
  inset.layers().set(0, bounds);
});
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
leftMap.setCenter(-99.13867, 47.02739, 12);