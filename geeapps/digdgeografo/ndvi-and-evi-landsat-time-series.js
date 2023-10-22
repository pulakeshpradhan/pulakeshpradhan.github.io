//test function to mask clouds
 function maskLandsatsr(image) {
  // Bits 3 and 5 are cloud shadow and cloud, respectively.
  var cloudShadowBitMask = (1 << 3);
  var cloudsBitMask = (1 << 5);
  // Get the pixel QA band.
  var qa = image.select('pixel_qa');
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
                 .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
  return image.updateMask(mask);
}
// Function to rename Landsat Bands keeping the pixel_qa band
function renameBandsETM_TM(image) {
    var bands = ['B1', 'B2', 'B3', 'B4', 'B5', 'B7', 'pixel_qa'];
    var new_bands = ['B', 'G', 'R', 'NIR', 'SWIR1', 'SWIR2', 'pixel_qa'];
    return image.select(bands).rename(new_bands);
}
function renameBandsOLI(image) {
    var bands = ['B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'pixel_qa'];
    var new_bands = ['B', 'G', 'R', 'NIR', 'SWIR1', 'SWIR2', 'pixel_qa'];
    return image.select(bands).rename(new_bands);
}
// Map the funtion to the cllections
var l8 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
  .map(renameBandsOLI);
var l7 = ee.ImageCollection('LANDSAT/LE07/C01/T1_SR')
  .map(renameBandsETM_TM);
var l5 = ee.ImageCollection('LANDSAT/LT05/C01/T1_SR')
  .map(renameBandsETM_TM);
// Apply mask cloud and shadows function
var landsats = l8.merge(l7).merge(l5)
        .map(maskLandsatsr);
// Get the NDVI 
var ndvi = landsats.map(function(image) {
  return image.select().addBands(image.normalizedDifference(['NIR', 'R']));
});
// Compute the EVI using an expression.
// Compute the EVI using an expression.
var evi = landsats.map(function(image) {
  return image.select().addBands(image.expression(
    '2.5 * ((NIR-RED) / (NIR +6 * RED -7.5* BLUE))', {
    'NIR':image.select('NIR'),
    'RED':image.select('R'),
    'BLUE':image.select('B')
    }))});
var median = ndvi.reduce(ee.Reducer.median());
var vis = {min: 0, max: 1, palette: [
  'FFFFFF', 'CE7E45', 'FCD163', '66A000', '207401',
  '056201', '004C00', '023B01', '012E01', '011301'
]};
Map.addLayer(median, vis, 'NDVI');
Map.setCenter(-6.34497, 37.01918, 12);
// NDVI Panel
// Create User Interface portion --------------------------------------------------
// Create a panel to hold our widgets.
var panel = ui.Panel();
panel.style().set('width', '500px');
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'Remote Sensing and GIS Lab',
    style: {fontSize: '20px', Color: 'blue', fontWeight: 'bold'}}),
  ui.Label({ 
    value: 'Doñana Biological Station', 
    style: {fontSize: '18px', Color: 'red', fontWeight: 'italic'}}),
  ui.Label({ 
    value: 'Click a point on the map to inspect.', 
    style: {fontSize: '14px', Color: 'black', fontWeight: 'italic'}})
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
  // Create an MODIS EVI chart.
  var eviChart = ui.Chart.image.series(ndvi, point, ee.Reducer.mean(), 250);
  eviChart.setOptions({
    title: 'Landsat NDVI',
    vAxis: {title: 'NDVI', minValue: -1, maxValue: 1},
    hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}},
  });
  panel.widgets().set(2, eviChart);
  // Create an MODIS NDVI chart.
  var ndviChart = ui.Chart.image.series(evi, point, ee.Reducer.mean(), 250);
  ndviChart.setOptions({
    title: 'Landsat EVI',
    vAxis: {title: 'EVI', minValue: -1, maxValue: 1},
    hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}},
  });
  panel.widgets().set(3, ndviChart);
});
Map.style().set('cursor', 'crosshair');
// Add the panel to the ui.root.
ui.root.insert(0, panel);