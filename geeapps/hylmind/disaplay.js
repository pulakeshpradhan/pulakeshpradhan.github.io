// Use a DateSlider to create annual composites of this collection.
var collection = ee.ImageCollection('LANDSAT/LC08/C01/T1');
// Use the start of the collection and now to bound the slider.
var start = ee.Image(collection.first()).date().get('year').format();
var now = Date.now();
var end = ee.Date(now).format();
// Run this function on a change of the dateSlider.
var showMosaic = function(range) {
  var mosaic = ee.Algorithms.Landsat.simpleComposite({
    collection: collection.filterDate(range.start(), range.end())
  });
  // Asynchronously compute the name of the composite.  Display it.
  range.start().get('year').evaluate(function(name) {
    var visParams = {bands: ['B4', 'B3', 'B2'], max: 100};
    var layer = ui.Map.Layer(mosaic, visParams, name + ' composite');
    Map.layers().set(0, layer);
  });
};
// Asynchronously compute the date range and show the slider.
var dateRange = ee.DateRange(start, end).evaluate(function(range) {
  var dateSlider = ui.DateSlider({
    start: range['dates'][0],
    end: range['dates'][1],
    value: null,
    period: 365,
    onChange: showMosaic
  });
  Map.add(dateSlider.setValue(now));
});