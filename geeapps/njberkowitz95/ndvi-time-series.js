/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var geometry = 
    /* color: #0b4a8b */
    /* shown: false */
    ee.Geometry.Point([-71.8070433227539, 42.12143183139222]);
/***** End of imports. If edited, may not auto-convert in the playground. *****/
// whittier planet
var planet_whittier = ee.ImageCollection('users/hauckcarson/planet_sr_whittier2018');
print('Planet', planet_whittier);
// calculate NDVI from masked dataset for Whittier
var addDataBands = function(image) {
    var ndvi = image.normalizedDifference(['b4', 'b3']).rename('NDVI');
    return image.addBands(ndvi)
          .addBands(image.metadata('system:time_start').divide(1e18).rename('time'));
};
Map.setCenter(-71.8067, 42.1214, 14);
// example from https://stackoverflow.com/questions/47134534/how-to-smooth-ndvi-curve-in-google-earth-engine
// Function to smooth time series
// stacks windows of linear regression results
// requires that a variable 'data' exists with NDVI and time bands
function smoother(t){
  // helper function to apply linear regression equation
  function applyFit(img){
      return img.select('time').multiply(fit.select('scale')).add(fit.select('offset'))
              .set('system:time_start',img.get('system:time_start')).rename('NDVI');
  }
  t = ee.Date(t);
  var window = data.filterDate(t.advance(-windowSize,'day'),t.advance(windowSize,'day'));
  var fit = window.select(['time','NDVI'])
    .reduce(ee.Reducer.linearFit());
  return window.map(applyFit).toList(5);
}
// function to reduce time stacked linear regression results
// requires that a variable 'fitIC' exists from the smooter function
function reduceFits(t){
  t = ee.Date(t);
  return fitIC.filterDate(t.advance(-windowSize,'day'),t.advance(windowSize,'day'))
              .mean().set('system:time_start',t.millis()).rename('NDVI');
}
var data = planet_whittier.map(addDataBands);
print(data);
var dates = ee.List(data.aggregate_array('system:time_start'));
var windowSize = 30; //days on either side
var fitIC = ee.ImageCollection(dates.map(smoother).flatten());
var smoothed = ee.ImageCollection(dates.map(reduceFits));
// merge original and smoothed data into one image collection for plotting
var joined = ee.ImageCollection(smoothed.select(['NDVI'],['smoothed'])
                .merge(data.select(['NDVI'],['original'])));
//create chart
var chart = ui.Chart.image.series({
  imageCollection: joined,
  region: geometry,
  reducer: ee.Reducer.mean(),
  scale: 4
}).setOptions({title: 'NDVI over time'});
//print Chart
print(chart);
Map.addLayer(data.select('NDVI'), {min: 0, max: 1}) // whole time series