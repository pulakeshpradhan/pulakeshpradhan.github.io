// Use a DateSlider to create annual composites of this collection.
//Load Landsat 8 Collection
var landsat8collection = ee.ImageCollection('LANDSAT/LC08/C01/T1');
//Load Landsat 7 Collection
var lansat7Collection = ee.ImageCollection("LANDSAT/LE07/C01/T1")
//Load MODIS Burn Area Collection
var modisBurnArea = ee.ImageCollection("MODIS/006/MCD64A1")
//Load Tree Cover Loss
var hansen = ee.Image("UMD/hansen/global_forest_change_2019_v1_7")
//Select gain and lossyear bands
var tcl = hansen.select(['lossyear','gain'])
// Define start and end of the date slider options
var start = ee.Date.fromYMD(2000, 1, 1)
var end = ee.Date.fromYMD(2020, 12, 31)
// Run this function on a change of the dateSlider.
var showMosaic = function(range) {
  //Filter modis burn area collection to date range
  var modisCol = modisBurnArea.filterDate(range.start(), range.end()).sum()
  //Filter landsat 8 and calculate annual composite
  var landsat8mosaic = ee.Algorithms.Landsat.simpleComposite({
    collection: landsat8collection.filterDate(range.start(), range.end()),
    maxDepth: 20
  });
  //Filter landsat 7 and calculate annual composite
  var landsat7mosaic = ee.Algorithms.Landsat.simpleComposite({
    collection: lansat7Collection.filterDate(range.start(), range.end()),
    maxDepth: 20
  });
  //Filter sentinel 2 and calculate annual composite
  var s2col = ee.ImageCollection('COPERNICUS/S2_SR')
    .filterDate(range.start(), range.end())
    .filter('CLOUDY_PIXEL_PERCENTAGE < 50').reduce(ee.Reducer.median(),8);
  // Asynchronously compute the name of the composite and add layers
  range.start().get('year').evaluate(function(name) {
    //Define landsat 8 visualization parameters
    var landsat8VisParams = {bands: ['B4', 'B3', 'B2'], max: 50};
    var layer = ui.Map.Layer(landsat8mosaic, landsat8VisParams, name + ' L8 composite',false);
    Map.layers().set(0, layer);
    //Define landsat 7 visualization parameters
    var landsat7VisParams = {bands: ['B3', 'B2', 'B1'], max: 50};
    var landsat7Layer = ui.Map.Layer(landsat7mosaic, landsat7VisParams, name + ' L7 composite');
    Map.layers().set(1, landsat7Layer);
    //Define sentinel 2 visualization parameters
    var s2visParams = {min: 0.0,max: 2000,bands: ['B4_median', 'B3_median', 'B2_median']};
    var s2layer = ui.Map.Layer(s2col, s2visParams, name + ' Sentinel composite',false);
    Map.layers().set(2, s2layer);
    //Define burn area visualization parameters
    var BAvisParams = {min: 0.0,max: 355,bands: ['BurnDate'],palette: ['f4b05a', 'f42c08']};
    var BAlayer = ui.Map.Layer(modisCol, BAvisParams, name + 'BURN AREA',false);
    Map.layers().set(3, BAlayer);
    //Define tree cover loss visualization parameters
    var tclVisParams = {min: 0.0,max: 19,palette: ['ffb0e0', 'd60985']};
    var tclLayer = ui.Map.Layer(tcl.select(['lossyear']), tclVisParams, 'Tree Cover Loss');
    Map.layers().set(4, tclLayer);
    //Define tree cover gain visualization parameters
    var gain = tcl.select(['gain'])
    gain = gain.mask(gain)
    var gainVisParams = {min: 0, max: 1,palette: ['4724FB', '4724FB']};
    var gainLayer = ui.Map.Layer(gain, gainVisParams, 'Tree Cover Gain (2012)',false);
    Map.layers().set(5, gainLayer);
  });
};
// Asynchronously compute the date range and show the slider.
var dateRange = ee.DateRange(start, end).evaluate(function(range) {
  var dateSlider = ui.DateSlider({
    start: range['dates'][0],
    end: range['dates'][1],
    value: null,
    period: 365,
    onChange: showMosaic,
    style: {'width': '400px'}
  });
  Map.add(dateSlider.setValue(end));
});