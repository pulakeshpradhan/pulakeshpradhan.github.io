// Purpose: Process Sentinel-2 Imagery and Plot Time Series for Farm Points
// Author: Daniel dela Torre
// Date: 7 Jan 2020
//-------------------------------------------------------------------------------
// **Load boundary shapefile of Iloilo from Assets
var geogBounds = ee.FeatureCollection('users/ddel528/iloilo_only_shp');
// **Specify dates of interest
var startDate = ee.Date('2019-01-01');
var endDate = ee.Date('2019-12-31');
// **Type of Index; used for Labelling graphs
var indexName = 'EVI';
// **Use an expression to add VI band
var viExpression = function(image) {
  return image
  .addBands(image.expression(
    // 'BVI = NIR / RED', {                                                          // RVI
     'BVI = 2.5 * ((NIR - RED) / (NIR + 6 * RED - 7.5 * BLUE + 1))', {             // EVI
    // 'BVI = (NIR - RED) / (NIR + RED)', {                                          // NDVI
    // 'BVI = (NIR - GREEN) / (NIR + GREEN)', {                                      // GNDVI
    // 'BVI = ((NIR - RED) / (NIR + RED + 0.5)) * (1 + 0.5)', {                      // SAVI
    // 'BVI = (1 + 0.16) * ((NIR - RED) / (NIR + RED + 0.16))', {                    // OSAVI
    // 'BVI = (2 * NIR + 1 - sqrt(pow((2 * NIR + 1), 2) - 8 * (NIR - RED)) ) / 2', { // MSAVI
    //'BVI = (1.5 * (1.2 * (NIR - GREEN) - 2.5 * (RED - GREEN))) / (sqrt((pow((2 * NIR + 1), 2) - (6 * NIR - 5 * sqrt(RED)) - 0.5)))', { // MTVI2
    // 'BVI = (NIR / GREEN) - 1', {                                                  // GCVI
    // 'BVI = (REDEDGE - RED) / (REDEDGE + RED)', {                                          // reNDVI
      'NIR':   image.select('B8'),
      'BLUE':  image.select('B2'),
      'GREEN': image.select('B3'),
      'RED':   image.select('B4'),
      'REDEDGE': image.select('B5'),
    })).copyProperties(image, ['system:time_start']);
};
//-------------------------------------------------------------------------------
// Create image collection of S-2 imagery for the period specified above
var s2 = ee.ImageCollection('COPERNICUS/S2_SR')
  .filterDate(startDate, endDate) //filter start and end date
  .filterBounds(geogBounds);      //filter according to drawn boundary
// Function to mask cloud from built-in quality band information on cloud
var maskcloud1 = function(image) {
  /* OPTION 1
  var QA60 = image.select(['QA60']);
  return image.updateMask(QA60.lt(1));
  */
  /* OPTION 2: Use accompanying cloud masks
  */
  var cloudProb = image.select('MSK_CLDPRB');
  var scl = image.select('SCL'); 
  var shadow = scl.eq(3); // 3 = cloud shadow
  var mask = cloudProb.lt(5).or(shadow).eq(1);
  return image.updateMask(mask);
};
// // Apply cloud mask to ImageCollection
var s2 = s2.map(maskcloud1);
// Map VI calculation from viExpression function to ImageCollection
var S2mapped = s2.map(viExpression);
print('S2MAPPED', S2mapped);
// Select VI band
//var VIselect = S2mapped.select(['BVI']);
// Just for visualization median composite image
// var VImedian = S2mapped.median();
// Create palettes for display of NDVI
// var palette = ['#d73027','#f46d43','#fdae61','#fee08b','#d9ef8b','#a6d96a'];
// // Visualization parameters
// var visParams = {
//   min:0.0, 
//   max:0.4, 
//   // palette: palette,
//   bands: ['B4','B3','B2'],
// };
// // Display NDVI results on map
// Map.addLayer(VImedian.clip(geogBounds), visParams, 'VI', true);
// Center the map on an image.
var farmPoints = ee.FeatureCollection('users/ddel528/gee_farmers_points_import');
Map.addLayer(farmPoints, {}, 'points', true); // Display farm points
Map.centerObject(farmPoints, 13);
// Create a time series chart.
var plotVI = ui.Chart.image.doySeriesByRegion({
  imageCollection: S2mapped,
  regions: farmPoints.toList(3), // Cast to list first three and only show these three
  regionReducer: ee.Reducer.mean(),
  bandName: 'BVI',
  scale: 10,
  yearReducer: ee.Reducer.mean(),
  seriesProperty: 'Name'
});
plotVI.setChartType('ScatterChart');
plotVI.setOptions({
  title: 'Time Series',
  hAxis: {title: 'Date'},
  vAxis: {title: indexName}
});
// Display.
print(plotVI);
// ----------------------------------------------------------------------------------------
// Create User Interface
// ----------------------------------------------------------------------------------------
// Create a panel to hold our widgets.
var panel = ui.Panel();
panel.style().set('width', '300px');
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'VI Chart Inspector',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
  ui.Label('Click a point on the map to inspect.')
]);
panel.add(intro);
// panels to hold lon/lat values
var lon = ui.Label();
var lat = ui.Label();
panel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
// Register a callback on the default map to be invoked when the map is clicked
Map.onClick(function(coords) {
  // Update the lon/lat panel with values from the click event.
  lon.setValue('lon: ' + coords.lon.toFixed(2)),
  lat.setValue('lat: ' + coords.lat.toFixed(2));
  var point = ee.Geometry.Point(coords.lon, coords.lat);
// Create an VI chart.
var viChart = ui.Chart.image.series(S2mapped.select(['BVI']), point, ee.Reducer.mean(), 10);
viChart.setChartType('ScatterChart');
viChart.setOptions({
    title: 'Time-Series Vegetation Index',
    vAxis: {title: indexName, maxValue: 1},
    hAxis: {title: 'Date', format: 'MM-yy', gridlines: {count: 7}},
  });
  panel.widgets().set(2, viChart);
});
Map.style().set('cursor', 'crosshair');
// Add the panel to the ui.root.
ui.root.insert(0, panel);