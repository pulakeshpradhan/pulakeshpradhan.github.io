var roi = ee.Geometry.Polygon([66.169021,33.698883,66.165845,33.698669,66.166102,33.696526,66.164471,33.695598,66.168677,33.695384,66.170308,33.697812]);
// Import the Landsat 8 TOA image collection.
var l8 = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA');
var withNDVI = l8.map(function(image) {
  var ndvi = image.normalizedDifference(['B5', 'B4']).rename('NDVI');
  return image.addBands(ndvi);
});
// Create a chart.
var chart = ui.Chart.image.doySeriesByYear({
  imageCollection: withNDVI.filter(ee.Filter.date('2018-01-01', '2021-01-01')).select('NDVI'),
  bandName:'NDVI',
  region: roi
}).setOptions({title: 'NDVI over time'});
// Display the chart in the console.
print(chart);