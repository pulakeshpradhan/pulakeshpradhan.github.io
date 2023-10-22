var lanao = ee.FeatureCollection('users/brentiebark/NAMRIA2010_Isab_forest');
// Use a DateSlider to create annual composites of this collection.
var collection = ee.ImageCollection("COPERNICUS/S2")
                .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
                //.map(maskS2clouds)
                .filterDate('2018-01-01', '2019-12-31');
// Use the start of the collection and now to bound the slider.
var start = collection.first().date().get('year').format();
var now = ee.Date('2018-01-01')
var end = ee.Date('2019-12-31').format();
Map.centerObject(lanao,9);
//Map.setOptions('Satellite');
var empty = ee.Image().byte();
var outline = empty.paint({
  featureCollection: lanao,
  color: 1,
  width: 1.5
});
var wtrshd = ui.Map.Layer(outline, {palette: 'ea23d6'}, 'Isabela Forest',true);
//Map.add(wtrshd);
// Run this function on a change of the dateSlider.
var showMosaic = function(range) {
  var mosaic = collection.filterDate(range.start(), range.end()).reduce(ee.Reducer.percentile([35]))
                      .rename(collection.first().bandNames());
  // Asynchronously compute the name of the composite.  Display it.
  range.start().get('year').evaluate(function(name) {
    var visParams = {bands: ['B4', 'B3', 'B2'], min: 0, max: 3500};
    var layer = ui.Map.Layer(mosaic.clip(lanao), visParams, name + ' composite');
    //Map.layers().set(0, wtrshd);
    Map.layers().set(0, layer);
  });
};
// Asynchronously compute the date range and show the slider.
var dateRange = ee.DateRange(start, end).evaluate(function(range) {
  var dateSlider = ui.DateSlider({
    start: range['dates'][0],
    end: range['dates'][1],
    value: null,
    period: 15,
    onChange: showMosaic
  });
  Map.add(dateSlider.setValue(now));
});