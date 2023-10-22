/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var s2 = ee.ImageCollection("COPERNICUS/S2_SR"),
    tiger = ee.FeatureCollection("TIGER/2018/States"),
    aster = ee.Image("NASA/ASTER_GED/AG100_003"),
    Midcoast = ee.FeatureCollection("users/vinfalardeau/Midcoast"),
    area = 
    /* color: #d63000 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[-70.38678501206357, 44.60624102491061],
          [-70.38678501206357, 43.628253832795295],
          [-68.75806186753232, 43.628253832795295],
          [-68.75806186753232, 44.60624102491061]]], null, false),
    point = 
    /* color: #98ff00 */
    /* shown: false */
    ee.Geometry.Point([-69.47643354489638, 44.174109899845924]);
/***** End of imports. If edited, may not auto-convert in the playground. *****/
var start = '2021-01-01';
var end = '2021-12-31';
var maine = tiger.filter(ee.Filter.eq('STUSPS','ME'));
var filteredme = s2.filterBounds(maine)
                 .filterDate(start,end)
                 .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',35))
                 .filter(ee.Filter.lt('SNOW_ICE_PERCENTAGE',10));
var cloudMaskS2 = function(image){
  var qa = image.select('QA60');
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  var highprobmask = image.select('MSK_CLDPRB').gt(15);
  var snowmask = image.select('MSK_SNWPRB').gt(15);
  var cloudmask = qa.bitwiseAnd(cloudBitMask).eq(0).and(
            qa.bitwiseAnd(cirrusBitMask).eq(0)).and(highprobmask.eq(0)).and(snowmask.eq(0));
  return image.updateMask(cloudmask)
          .divide(10000)
          .select("B.*")
          .copyProperties(image, ["system:time_start"]);
};
var medianImage = filteredme.map(cloudMaskS2)
                          .reduce(ee.Reducer.median())
                          .clip(maine);
var medianViz = medianImage.select(['B4_median','B3_median','B2_median']).clip(maine);
Map.addLayer(medianViz, {bands: ['B4_median','B3_median','B2_median'], min: [0.01, 0.01, 0.01], max: [0.13, 0.15, 0.13]},'2021 Maine Median Image');
// Run this function on a change of the dateSlider.
var showMosaic = function(range) {
  var filtered = s2.filterBounds(point)
                   .filterDate(range.start(), range.end())
                   .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',35))
                   //.filter(ee.Filter.lt('SNOW_ICE_PERCENTAGE',15));
  var masked = filtered.map(function(image){
  var qa = image.select('QA60');
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  var highprobmask = image.select('MSK_CLDPRB').gt(15);
  //var snowmask = image.select('MSK_SNWPRB').gt(15);
  var cloudmask = qa.bitwiseAnd(cloudBitMask).eq(0).and(
            qa.bitwiseAnd(cirrusBitMask).eq(0)).and(highprobmask.eq(0))/*.and(snowmask.eq(0))*/;
  return image.updateMask(cloudmask)
          .divide(10000)
          .select("B.*")
          .copyProperties(image, ["system:time_start"]);
});
  var medianImg = masked.reduce(ee.Reducer.median())
                        .clip(area);
  var sorted = filtered.sort('CLOUDY_PIXEL_PERCENTAGE');
  var leastcloudy = ee.Image(sorted.toList(sorted.size()).get(0)).divide(10000).clip(area); 
// Asynchronously dislay composite and NDVI
  range.start().get('date').evaluate(function(name) { 
    var maineLayer = ui.Map.Layer(medianViz, {bands: ['B4_median','B3_median','B2_median'], min: [0.01, 0.01, 0.01], max: [0.13, 0.15, 0.13]},'2021 Maine Median Image');
    var medianLayer = ui.Map.Layer(medianImg, {bands:['B4_median','B3_median','B2_median'],min:0,max:0.15}, 'Cloud-Masked Monthly Median',0);
    var leastLayer = ui.Map.Layer(leastcloudy, {bands:['B4','B3','B2'],min:0,max:0.2}, 'Least Cloudy Image of the Month',1);
    //var ndviLayer = ui.Map.Layer(ndvi, {band:'NDVI'}, 'NDVI',0); 
    Map.layers().set(0,maineLayer);
    Map.layers().set(1, medianLayer);
    Map.layers().set(2, leastLayer);
  });
};
// Asynchronously compute the date range and show the slider.
var dateRange = ee.DateRange(start, end).evaluate(function(range) {
  var dateSlider = ui.DateSlider({
    start: range['dates'][0],
    end: range['dates'][1],
    value: null,
    period: 30, // Makes the temporal resolution smaller, going from the whole year (period 365) down to the level of individual months (period 30)
    onChange: showMosaic,
    style: {
      position: 'bottom-left', // Puts the date slider in the top center of the map
      width: '500px', // Widens the slider to 500 pixels
      padding: '15px 15px' // Defines the amount of space around the slider as 8 pixels on top and bottom, 15 pixels on the left and right
    },
  });
  Map.add(dateSlider.setValue(start));
  Map.add(ui.Label({value:'Click the date slider to initialize the map and load a least-cloudy image and a median image.',style: {
      position: 'bottom-left', 
      width: '200', 
      padding: '5px 5px' 
    }}));
});
Map.setOptions('ROADMAP');
Map.centerObject(point,12);