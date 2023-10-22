//Load all available Hasen data
var hansen_2019 = ee.Image("UMD/hansen/global_forest_change_2019_v1_7")
var hansen_2018 = ee.Image("UMD/hansen/global_forest_change_2018_v1_6")
var hansen_2017 = ee.Image("UMD/hansen/global_forest_change_2017_v1_5")
var hansen_2016 = ee.Image("UMD/hansen/global_forest_change_2016_v1_4")
var hansen_2015 = ee.Image("UMD/hansen/global_forest_change_2015_v1_3")
var hansen_2014 = ee.Image("UMD/hansen/global_forest_change_2015")
var hansen_2013 = ee.Image("UMD/hansen/global_forest_change_2014")
var hansen_2012 = ee.Image("UMD/hansen/global_forest_change_2013")
//Add all Hansen
var hansen_collection = ee.ImageCollection([hansen_2019,hansen_2018,
                                      hansen_2017,hansen_2016,hansen_2015,
                                      hansen_2014,hansen_2013,hansen_2012])
hansen_collection = hansen_collection.map(function(image){return image.set({'end_year':ee.Number.parse(ee.Date(ee.List(image.get('date_range')).get(1)).format('YYYY'))})})
print(hansen_collection)
var tcl = hansen_2019.select('lossyear')
// Use the start of the collection and now to bound the slider.
var start = ee.Date.fromYMD(2012, 1, 1)
var now = Date.now();
var end = ee.Date.fromYMD(2019, 12, 31)
// Run this function on a change of the dateSlider.
var showMosaic = function(range) {
  // Asynchronously compute the name of the composite.  Visualize layers for associated year.
  range.start().get('year').evaluate(function(name) {
    //Find corresponding Hansen image for this year
    var hansen_image = hansen_collection.filterMetadata('end_year','equals',ee.Number(name).add(1)).first()
    //Define visualization for landsat imagery
    var endYearVizParams = {bands: ['last_b50', 'last_b40', 'last_b30']};
    var startYearVizParams = {bands: ['first_b50', 'first_b40', 'first_b30']};
    //Add first year of landsat imagery
    var start_layer = ui.Map.Layer(hansen_image, startYearVizParams, '2000 Landsat');
    Map.layers().set(0, start_layer);
    //Add last year of landsat imagery
    var end_layer = ui.Map.Layer(hansen_image, endYearVizParams, name + ' Landsat');
    Map.layers().set(1, end_layer);
    //Add tree cover loss data
    var tclVisParams = {min: 0.0,max: 19,palette: ['ffb0e0', 'd60985']};
    var tclLayer = ui.Map.Layer(tcl, tclVisParams, 'Tree Cover Loss');
    Map.layers().set(2, tclLayer);
    //Add gain data
    var gain = hansen_image.select(['gain'])
    gain = gain.mask(gain)
    var gainVisParams = {min: 0, max: 1,palette: ['4724FB', '4724FB']};
    var gainLayer = ui.Map.Layer(gain, gainVisParams, 'Tree Cover Gain (2012)',false);
    Map.layers().set(3, gainLayer);
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
    style: {'width': '350px'}
  });
  Map.add(dateSlider.setValue(now));
});