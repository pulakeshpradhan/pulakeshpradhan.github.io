var PMC = ui.import && ui.import("PMC", "table", {
      "id": "users/vaishnaviadhav31/PMC"
    }) || ee.FeatureCollection("users/vaishnaviadhav31/PMC");
// Load and display LST data.
var dataset = ee.ImageCollection("MODIS/006/MOD11A2")
                  .filter(ee.Filter.date('2011-01-01', '2018-12-31'));
var landSurfaceTemperature = dataset.select('LST_Day_1km');
// MODIS data must be multiplied by 0.02 to return the units to Kelvin and Subtract 273.15 to convert Kelvin to Celsius.
var Celsius = landSurfaceTemperature.map(function(img) {
  return img
    .multiply(0.02)
    .subtract(273.15)
    .copyProperties(img, ['system:time_start']);
});
var landSurfaceTemperatureVis = {
  min: 31.5,
  max: 38.5,
  palette: [
    '040274', '040281', '0502a3', '0502b8', '0502ce', '0502e6',
    '0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef',
    '3be285', '3ff38f', '86e26f', '3ae237', 'b5e22e', 'd6e21f',
    'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08', 'ff500d',
    'ff0000', 'de0101', 'c21301', 'a71001', '911003'
  ],
};
//Clip to roi
var LSTclip = Celsius.filterBounds(PMC).mean().clip(PMC);
Map.addLayer(
    LSTclip, landSurfaceTemperatureVis,
    'Land Surface Temperature');
// Configure the map.
Map.setCenter(73.8561077397525, 18.524022172419414, 11);
Map.style().set('cursor', 'crosshair');
// Create an empty panel in which to arrange widgets.
// The layout is vertical flow by default.
var panel = ui.Panel({style: {width: '400px'}})
    .add(ui.Label('Click on the map'));
// Set a callback function for when the user clicks the map.
Map.onClick(function(coords) {
var redLabel = ui.Label('Land Surface Temperature for PMC');
redLabel.style().set('color', 'red');
redLabel.style().set('fontWeight', 'bold');
redLabel.style().set({
  fontSize: '22px',
  padding: '10px'
});
  // Create or update the location label (the second widget in the panel)
  var location = 'lon: ' + coords.lon.toFixed(2) + ' ' +
                 'lat: ' + coords.lat.toFixed(2);
  panel.widgets().set(1, ui.Label(location));
  // Add a black dot to the map where the user clicked.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  Map.layers().set(1, ui.Map.Layer(point, {color: 'black'}));
  // Chart the time-series
var temp_trend = ui.Chart.image.series({
  imageCollection: Celsius,
  region: PMC,
  reducer: ee.Reducer.median(),
  scale: 1000,
  xProperty: 'system:time_start'})
  .setOptions({
    lineWidth: 1,
    pointSize: 3,
    trendlines: {0: {
        color: 'CC0000'
      }},
     title: 'LST  Time Series',
     vAxis: {title: 'LST Celsius'}});
  // Add (or replace) the third widget in the panel by
  // manipulating the widgets list.
  panel.widgets().set(3, temp_trend);
});
// Add the panel to the ui.root.
ui.root.add(panel);
var button = ui.Button({
  label: 'Get Map Center',
  onClick: function() {
  print(Map.getCenter());
  }
});
print(button);
var title = ui.Label({
    value: 'LAND SURFACE TEMPERATURE FOR PUNE MUNICIPAL CORPORATION',
    style: {fontSize: '15px', color: 'red'}});
Map.add(title);