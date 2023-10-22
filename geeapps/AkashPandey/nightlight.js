var country = ui.import && ui.import("country", "table", {
      "id": "users/AkashPandey/Shapefiles/india_administrative_state_boundary"
    }) || ee.FeatureCollection("users/AkashPandey/Shapefiles/india_administrative_state_boundary"),
    table = ui.import && ui.import("table", "table", {
      "id": "FAO/GAUL_SIMPLIFIED_500m/2015/level0"
    }) || ee.FeatureCollection("FAO/GAUL_SIMPLIFIED_500m/2015/level0");
Map.centerObject(country, 4.6);
var elev = ee.Image('USGS/GMTED2010')
Map.addLayer(elev, {}, 'elevation b/w', false);
function createTimeBand(img) {
  var year = img.date().difference(ee.Date('1990-01-01'), 'year');
  return ee.Image(year).float().addBands(img);
}
var collection = ee.ImageCollection('NOAA/DMSP-OLS/CALIBRATED_LIGHTS_V4')
    .select('avg_vis')
    .map(createTimeBand);
var fit = collection.reduce(ee.Reducer.linearFit());
Map.addLayer(ee.Image(collection.select('avg_vis').first()),
         {min: 0, max: 63, opacity: 0.97},
         'stable lights first asset', false);
// Display trend in red/blue, brightness in green.
Map.addLayer(fit.clip(country),
         {min: 0, max: [0.18, 20, -0.18], bands: ['scale', 'offset', 'scale']},
         'stable lights trend');
Map.add(ui.Label(
    'Night Light Map of '+'India' + ' Prepared By Akash Pandey',
    {
      fontWeight: 'bold', 
      BackgroundColor: 'F8E60A',
      fontSize: '14px'}));
Map.add(ui.Label(
    'Queries at itsakashpandey@gmail.com',
    {
      textDecoration: 'underline',
      position: 'bottom-right',
      fontWeight: 'bold',
      fontSize: '13px'}));