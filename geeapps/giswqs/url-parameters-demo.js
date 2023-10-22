// Compute the trend of nighttime lights from DMSP.
// Add a band containing image date as years since 1990.
function createTimeBand(img) {
  var year = img.date().difference(ee.Date('1990-01-01'), 'year');
  return ee.Image(year).float().addBands(img);
}
// Fit a linear trend to the nighttime lights collection.
var collection = ee.ImageCollection('NOAA/DMSP-OLS/CALIBRATED_LIGHTS_V4')
    .select('avg_vis')
    .map(createTimeBand);
var fit = collection.reduce(ee.Reducer.linearFit());
// Display a single image
// Map.addLayer(ee.Image(collection.select('avg_vis').first()),
//         {min: 0, max: 63},
//         'stable lights first asset');
var lon = ui.url.get('lon', 30);
var lat = ui.url.get('lat', 45);
var zoom = ui.url.get('zoom', 4);
try {
  Map.setCenter(lon, lat, zoom);
} catch (error) {
  // Load defaults.
  Map.setCenter(30, 45, 4);
}
// Display trend in red/blue, brightness in green.
Map.addLayer(fit,
         {min: 0, max: [0.18, 20, -0.18], bands: ['scale', 'offset', 'scale']},
         'stable lights trend');
var label = ui.Label(
  'Pan and zoom the map. As you do so, note that the '
  + 'URL updates to reflect the new center and zoom level.');
label.style().set('maxWidth', '400px').set('textAlign', 'center');
Map.add(label); 
Map.setControlVisibility(false);
// Map.drawingTools().setShown(false);
var updateUrl = function(newView) {
  lon = newView.lon;
  lat = newView.lat;
  zoom = newView.zoom;
  ui.url.set(newView);
};
Map.onChangeBounds(updateUrl);