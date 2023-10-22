/*
 * Produce timeseries chart of Landsat 5, 7, 8
 * Cloud less than 5 %
 * No masking of Landsat 7 SLC-off missing data
 */
var index = function(image) {
  //var msavi = image.normalizedDifference(['B8', 'B4']).rename('MSAVI');
  var msavi = (image.select('B4').multiply(2).add(1)
  .subtract(image.select('B4').multiply(2).add(1).pow(2)
    .subtract(image.select('B4').subtract(image.select('B3')).multiply(8)).sqrt()
  ).divide(2)).rename('MSAVI');
  return image.addBands(msavi).copyProperties(image).set('system:time_start', image.get('system:time_start'));
};
// Landat 8 MSAVI creation
var l8col = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
                  .filter(ee.Filter.lt('CLOUD_COVER',5))
                 .filterDate('2012-01-01', '2020-04-30')
                 .map(function(image){
  return image.rename(['B0', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10', 'B11']);
});
var l8msavi = l8col.map(index).select('MSAVI');
//Landat 5 MSAVI creation
var l5col = ee.ImageCollection("LANDSAT/LT05/C01/T1_SR")
                  .filter(ee.Filter.lt('CLOUD_COVER',5))
                  .filterDate('1986-01-01', '2013-07-01');
var l5msavi = l5col.map(index).select('MSAVI');
// Landat 7 MSAVI creation
var l7col = ee.ImageCollection('LANDSAT/LE07/C01/T1_SR')
.filter(ee.Filter.lt('CLOUD_COVER',5))
.filterDate('1986-01-01', '2014-01-01');
var l7msavi = l7col.map(index).select('MSAVI');
// merge L5, L7 & L8
var msavi_unsorted = ee.ImageCollection(l5msavi.merge(l7msavi.merge(l8msavi)));
// sort by date
var msavi = msavi_unsorted.sort("system:time_start");
//Add layer to map
Map.setCenter(118.10, -34.40, 10);
//Map.setCenter(135.650393, -34.474923, 14);
var colorizedVis = {
  min: 0.3,
  max: 0.8,
  bands: ['MSAVI'],
  palette: [
    'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
    '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
    '012E01', '011D01', '011301'
  ],
};
Map.addLayer(msavi.median(), colorizedVis, 'MSAVI Median L8');
// Create an empty panel in which to arrange widgets.
// The layout is vertical flow by default.
var panel = ui.Panel({style: {width: '400px'}})
    .add(ui.Label('Click on the map'));
// Set a callback function for when the user clicks the map.
Map.onClick(function(coords) {
  // Create or update the location label (the second widget in the panel)
  var location = 'lon: ' + coords.lon.toFixed(2) + ' ' +
                 'lat: ' + coords.lat.toFixed(2);
  panel.widgets().set(1, ui.Label(location));
  // Add a red dot to the map where the user clicked.
  var point = ee.Geometry.Point(coords.lon, coords.lat).buffer(60);
  Map.layers().set(1, ui.Map.Layer(point, {color: 'FF0000'}));
  // Create a chart of MSAVI over time.
  var chart = ui.Chart.image.series(msavi, point, ee.Reducer.mean(), 200)
      .setOptions({
        title: 'MSAVI Time series',
        vAxis: {title: 'MSAVI'},
        lineWidth: 1,
        pointSize: 3,
      });
  // Add (or replace) the third widget in the panel by
  // manipulating the widgets list.
  panel.widgets().set(2, chart);
});
// Add the panel to the ui.root.
ui.root.add(panel);