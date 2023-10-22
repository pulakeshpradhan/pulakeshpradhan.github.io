var site = ee.Geometry.Rectangle(1.32,51.93,1.45,52.03);
Map.setCenter(1.39,51.985,14);
// Use a DateSlider to create annual composites of this collection.
var collection = ee.ImageCollection('COPERNICUS/S2')
                  .filterMetadata('CLOUD_COVERAGE_ASSESSMENT','less_than',30)
                  .filterBounds(site);
// Use the start of the collection and now to bound the slider.
var start = ee.Image(collection.first()).date().get('year').format();
var now = Date.now();
var end = ee.Date(now).format();
// Run this function on a change of the dateSlider.
var showMosaic = function(range) {
  var mosaic = collection.filterDate(range.start(), range.end()).reduce(ee.Reducer.percentile([35]))
                      .rename(collection.first().bandNames());
  // Asynchronously compute the name of the composite.  Display it.
  range.start().get('year').evaluate(function(name) {
    var visParams = {bands: ['B8', 'B4', 'B3'], min: 750, max: 2500};
    var layer = ui.Map.Layer(mosaic.clip(site), visParams, name + ' composite');
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