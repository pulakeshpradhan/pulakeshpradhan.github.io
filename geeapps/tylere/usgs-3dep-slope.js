/**
 * USGS 3DEP Slope
 *  
 * Ths script visualizes the slope of the USGS 3DEP 1m DEM.
 * 
 * @author Tyler Erickson (tylere@google.com)
 */
/*******************************************************************************
 * Model
 ******************************************************************************/
var m = {
  longitude: null,
  latitude: null,
  zoom: null,
  elevation_ic: ee.ImageCollection('USGS/3DEP/1m')
};
m.sourceScript = 'https://code.earthengine.google.com/17c78c6af4c6c4ff6957385e6429992c';
/*******************************************************************************
 * Components
 ******************************************************************************/
// Create a JSON object for storing UI components.
var c = {};
c.titleLabel = ui.Label('USGS 3DEP 1m DEM Slope');
// Define slider widgets for the min and maximum slopes.
c.selectMinSlope = {};
c.selectMinSlope.label = ui.Label('Select the slope value for white:');
c.selectMinSlope.slider = ui.Slider({
  min: 0,
  max: 90,
  step: 5
});
c.selectMaxSlope = {};
c.selectMaxSlope.label = ui.Label('Select the slope value for black:');
c.selectMaxSlope.slider = ui.Slider({
  min: 0,
  max: 90,
  step: 5
});
c.visualization = {};
c.visualization.title = ui.Label('Visualization Parameters');
c.visualization.panel = ui.Panel([
  c.visualization.title,
  c.selectMinSlope.label,
  c.selectMinSlope.slider,
  c.selectMaxSlope.label, 
  c.selectMaxSlope.slider
]);
// Define a series of panel widgets to be used as horizontal dividers.
c.dividers = {};
c.dividers.divider1 = ui.Panel();
c.dividers.divider2 = ui.Panel();
c.infoPanel = ui.Panel([
  c.titleLabel,
  ui.Label('This app visualizes the slope of the USGS 3DEP 1m DEM.'),
  ui.Label('Moving the map causes the URL parameters change.'),
  c.dividers.divider1,
  c.visualization.panel,
  c.dividers.divider2,
  ui.Label({value: 'Source script', targetUrl:m.sourceScript})
]);
c.customMap = ui.Map();
/*******************************************************************************
 * Composition    
 ******************************************************************************/
ui.root.clear();
ui.root.add(c.infoPanel);
ui.root.add(c.customMap);
/*******************************************************************************
 * Styling *
 * 
 * A section to define and set widget style properties.
 * 
 * Guidelines:
 * 1. At the top, define styles for widget "classes" i.e. styles that might be
 *    applied to several widgets, like text styles or margin styles.
 * 2. Set "inline" style properties for single-use styles.
 * 3. You can add multiple styles to widgets, add "inline" style followed by
 *    "class" styles. If multiple styles need to be set on the same widget, do
 *    it consecutively to maintain order.
 ******************************************************************************/
// Define CSS-like class style properties for widgets; reusable styles.
var s = {};
c.titleLabel.style().set({
  fontSize: '20px',
  fontWeight: 'bold'
});
c.visualization.title.style().set({
  fontSize: '16px',
  fontWeight: 'bold'
});
s.divider = {
  backgroundColor: 'F0F0F0',
  height: '4px',
  margin: '20px 0px'
};
// Loop through setting divider style.
Object.keys(c.dividers).forEach(function(key) {
  c.dividers[key].style().set(s.divider);
});
/*******************************************************************************
 * Behaviors      
 ******************************************************************************/
// Define a function to convert from degrees to radians.
function radians(img) {
  return img.toFloat().multiply(Math.PI).divide(180);
}
// Define a function to compute a hillshade from terrain data
// for the given sun azimuth and elevation.
function hillshade(az, ze, slope, aspect) {
  // Convert angles to radians.
  var azimuth = radians(ee.Image(az));
  var zenith = radians(ee.Image(ze));
  // The following implements:
  // Hillshade = cos(Azimuth - Aspect) * sin(Slope) * sin(Zenith) +
  //     cos(Zenith) * cos(Slope)
  return azimuth.subtract(aspect).cos()
    .multiply(slope.sin())
    .multiply(zenith.sin())
    .add(
      zenith.cos().multiply(slope.cos()));
}
// Update URL parameters if the map is moved.
var updateLatLonZoomUrlParams = ui.util.debounce(
  function (mapCenter) {ui.url.set(mapCenter)}, 
  100
);
c.customMap.onChangeBounds(function (centerCoords) {
  updateLatLonZoomUrlParams(centerCoords);
});
// // Compute terrain measures (mosaic then calculate slope).
// var terrain = ee.Algorithms.Terrain(
//   m.elevation_ic.mosaic().setDefaultProjection({
//     crs:'EPSG:4326', 
//     scale:1
//   })
// );
// Compute terrain measures (calculate slope then mosaic).
var terrain = m.elevation_ic.map(function(img) {
  return ee.Algorithms.Terrain(img);
}).mosaic();
function updateMap() {
  var maxValue = c.selectMaxSlope.slider.getValue();
  var visParams = ee.Dictionary({
    bands:'slope',
    min:c.selectMinSlope.slider.getValue(),
    max: maxValue
  });
  var layer = ui.Map.Layer(terrain, visParams.getInfo(), 'slope');
  c.customMap.layers().set(0, layer);
}
var updateVisUrlParams = function () {
  ui.url.set('minslope', c.selectMinSlope.slider.getValue());
  ui.url.set('maxslope', c.selectMaxSlope.slider.getValue());
};
c.selectMinSlope.slider.onChange(updateMap);
c.selectMinSlope.slider.onChange(updateVisUrlParams);
c.selectMaxSlope.slider.onChange(updateMap);
c.selectMaxSlope.slider.onChange(updateVisUrlParams);
/*******************************************************************************
 * Initialization 
 ******************************************************************************/
m.longitude   = ui.url.get('lon', -104.71756);
m.latitude    = ui.url.get('lat', 44.59162);
m.zoom        = ui.url.get('zoom', 17);
m.minslope    = ui.url.get('minslope', 0);
m.maxslope    = ui.url.get('maxslope', 90);
c.selectMinSlope.slider.setValue(m.minslope, false);
c.selectMaxSlope.slider.setValue(m.maxslope, false);
c.customMap.setCenter(m.longitude, m.latitude, m.zoom);
updateMap();