// Demonstrates before/after imagery comparison with a variety of dates.
// Modified by Eric Bullock from https://www.earthengine.app/
// October 2019
/*
 * Configure the imagery
 */
var utils = require('projects/GLANCE:ccdcUtilities/utils')
// These Sentinel-1 images track the major flooding in Myanmar during the 2018
// monsoon season: https://www.bbc.com/news/world-asia-44962585
var imagesS1 = {
  '2016-06-01': getMonthlySentinelComposite('2016-06-01'),
  '2017-06-01': getMonthlySentinelComposite('2017-06-01'),
  '2018-06-01': getMonthlySentinelComposite('2018-06-01'),
  '2019-06-01': getMonthlySentinelComposite('2018-06-01'),
};
var imagesLandsat = {
  '1990-06-01': getMonthlyLandsatComposite('1990-06-01'),
  '1992-06-01': getMonthlyLandsatComposite('1992-06-01'),
  '1994-06-01': getMonthlyLandsatComposite('1994-06-01'),
  '1996-06-01': getMonthlyLandsatComposite('1996-06-01'),
  '1998-06-01': getMonthlyLandsatComposite('1998-06-01'),
  '2000-06-01': getMonthlyLandsatComposite('2000-06-01'),
  '2002-06-01': getMonthlyLandsatComposite('2002-06-01'),
  '2004-06-01': getMonthlyLandsatComposite('2004-06-01'),
  '2006-06-01': getMonthlyLandsatComposite('2006-06-01'),
  '2008-06-01': getMonthlyLandsatComposite('2008-06-01'),
  '2010-06-01': getMonthlyLandsatComposite('2010-06-01'),
  '2012-06-01': getMonthlyLandsatComposite('2012-06-01'),
  '2014-06-01': getMonthlyLandsatComposite('2014-06-01'),
  '2016-06-01': getMonthlyLandsatComposite('2016-06-01'),
  '2018-06-01': getMonthlyLandsatComposite('2018-06-01'),
};
var images = imagesLandsat
// Composite the Sentinel-1 ImageCollection for 7 days (inclusive) after the
// given date.
function getMonthlySentinelComposite(date) {
  var date = ee.Date(date);
  // Only include the VV polarization, for consistent compositing.
  var polarization = 'VV';
  var sentinel1 = ee.ImageCollection('COPERNICUS/S1_GRD')
                      .filterDate(date, date.advance(1, 'month'))
                      .filter(ee.Filter.listContains(
                          'transmitterReceiverPolarisation', polarization))
                      .filter(ee.Filter.eq('instrumentMode', 'IW'))
                      .select(polarization)
                      .mean();
  return sentinel1.visualize({min: -25, max: 0, palette: ['aqua', 'black']});
}
/*
 * Set up the maps and control widgets
 */
var sensorList = ['Sentinel 1','Sentinel 2','Landsat']
// checkbox for S1, S2, or Landsat
// Create the left map, and have it display layer 0.
var leftMap = ui.Map().setOptions("SATELLITE");
leftMap.setControlVisibility(false, true, true, true, true);
var leftSelector = addLayerSelector(leftMap, 3, 'top-left');
// Create the right map, and have it display layer 1.
var rightMap = ui.Map().setOptions("SATELLITE");
rightMap.setControlVisibility(false, true, true, true, true);
var rightSelector = addLayerSelector(rightMap, 14, 'top-right');
// Composite the Sentinel-1 ImageCollection for 7 days (inclusive) after the
// given date.
function getMonthlyLandsatComposite(date) {
  // var date = ee.Date(date);
  var date2 = (Number(date.slice(0,4))+1) + '-06-01'
  var landsat = utils.inputs.getLandsat({start: date, end: date2 })
    .filterDate(date, date2)
    .median()
  return landsat.visualize({min: 0, max: [4000, 6000, 7000], bands: ['SWIR1','NIR','RED']});
}
// Adds a layer selection widget to the given map, to allow users to change
// which image is displayed in the associated map.
function addLayerSelector(mapToChange, defaultValue, position) {
  var label = ui.Label('Choose a yearly Landsat composite to visualize');
  // This function changes the given map to show the selected image.
  function updateMap(selection) {
    mapToChange.layers().set(0, ui.Map.Layer(images[selection]));
  }
  // // Configure a selection dropdown to allow the user to choose between images,
  // // and set the map to update when a user makes a selection.
  var select = ui.Select({items: Object.keys(images), onChange: updateMap});
  select.setValue(Object.keys(images)[defaultValue], true);
  // var sensorSelect = ui.Select(sensorList,
  //   'Landsat','Landsat', function(sel) {
  //     if (sel == 'Sentinel 1') {
  //       images = imagesS1
  //     } else if (sel == 'Sentinel 2') {
  //       images = imagesS2
  //     } else if (sel == 'Landsat') {
  //       images = imagesLandsat
  //     }
  //     select.items().reset(Object.keys(images))
  //     select.setValue(Object.keys(images)[defaultValue], true)
  //   })
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
leftMap.setCenter(103.344, -1.647, 8);