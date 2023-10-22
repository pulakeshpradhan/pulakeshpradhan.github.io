ui.root.clear()
var map = ui.Map()
ui.root.add(map)
var SHANGHAI = 'Shanghai, China'
var DELHI= 'Delhi, India'
var CAIRO = 'Cairo, Egypt'
var BEIJING = 'Beijing, China'
var GUANGZHOU = 'Guangzhou, China'
// Create an empty list of filter constraints.
var constraints = [];
// Create a layer selector that dictates which layer is visible on the Map.
var select = ui.Select({
  items: [SHANGHAI, DELHI, CAIRO, BEIJING, GUANGZHOU],
  value: SHANGHAI,
  onChange: redraw,
  style: {padding: '0px 0px 0px 10px'}
});
// Create a function to render a Map layer configured by the user inputs.
function redraw() {
  var layer = select.getValue();
  var image;
  var legend;
  if (layer == SHANGHAI) {
       map.setCenter(119.28498033906249, 31.703310672201503, 8)
    } else if (layer == DELHI) {
        map.setCenter(75.86418518099526, 28.97770108842285, 8)
      } else if (layer == CAIRO){
          map.setCenter(29.955781961825892, 31.060061560067478, 8)
        } else if (layer == BEIJING){
             map.setCenter(115.33178507187495, 40.60791714978479, 8)
        } else if (layer == GUANGZHOU){
               map.setCenter(112.61810298906244, 24.1127328180933, 8)
        }
  for (var i = 0; i < constraints.length; ++i) {
    var constraint = constraints[i];
    var mode = constraint.mode.getValue();
    var value = parseFloat(constraint.value.getValue());
    if (mode == GREATER_THAN) {
      image = image.updateMask(constraint.image.gt(value));
    } else {
      image = image.updateMask(constraint.image.lt(value));
    }
  }
}
// Invoke the redraw function once at start up to initialize the Map.
redraw();
/***
 * Start of GUI script
 *
 */
// Styles
var colors = {'cyan': '#24C1E0', 'transparent': '#11ffee00', 'gray': '#F8F9FA'}; 
var panel = ui.Panel()
panel.style().set({
  maxHeight: '700px',
  maxWidth: '350px',
  position: 'top-left'
});
var title = ui.Label({
  value: 'Urbanization Explorer',
  style: {fontWeight: 'bold',
    fontSize: '32px',
    padding: '10px', 
    color: '#616161',}
})
var text = ui.Label({
  value: 
  'Nightlights data is considered a proxy for human settlement, and can be used to model urbanization, economic activity, and land use change at global scales.  '+
  'This app provides locally-to-globally relevant visualizations of changes in nightlights over time in several of the fastest growing cities on Earth.',
  style: {fontSize: '14px',
    fontWeight: 'bold',
    color: '#9E9E9E',
    padding: '8px',
    backgroundColor: colors.transparent,
    border: '4px solid rgba(97, 97, 97, 0.05)'
  }
})
var directionsRCPSelection = ui.Label({
  value: 'Select a city to view.', 
  style: {fontSize: '14px',
    fontWeight: 'bold',
    color: '#9E9E9E',
    padding: '8px',
    backgroundColor: colors.transparent,}
})
var directionsClickingPoints = ui.Label({
  value: 'Click on a point to plot changes in light intensity over time.', 
  style: {fontSize: '14px',
    fontWeight: 'bold',
    color: 'red',
    padding: '8px',
    backgroundColor: colors.transparent,}
})
panel.add(title)
panel.add(text)
panel.add(directionsRCPSelection)
panel.add(select)
panel.add(directionsClickingPoints);
ui.root.insert(0, panel)
map.setOptions('SATELLITE')
// Select images from a collection with a silder.
var collection = ee.ImageCollection('NOAA/DMSP-OLS/NIGHTTIME_LIGHTS')
    .select('stable_lights')
// A helper function to show the image for a given year on the default map.
var showLayer = function(year) {
  map.layers().reset();
  var date = ee.Date.fromYMD(year, 1, 1);
  var dateRange = ee.DateRange(date, date.advance(1, 'year'));
  var image = collection.filterDate(dateRange).first();
  map.addLayer({
    eeObject: ee.Image(image),
    visParams: {
      min: 0,
      max: 63,
      palette:['000000', 'FFFF00', 'FFA500', 'FF4500', 'FF0000']
    },
    name: String(year)
  });
};
// Create a label and slider.
var label = ui.Label('Light Intensity for Year');
var slider = ui.Slider({
  min: 1992,
  max: 2013,
  step: 1,
  onChange: showLayer,
  style: {stretch: 'horizontal'}
});
// Create a panel that contains both the slider and the label.
var panel2 = ui.Panel({
  widgets: [label, slider],
  layout: ui.Panel.Layout.flow('vertical'),
  style: {
    position: 'top-center',
    padding: '7px'
  }
});
// Add the panel to the map.
map.add(panel2);
// Set default values on the slider and map.
slider.setValue(2013);
var chartPanel = ui.Panel()
panel.add(chartPanel)
// Register a callback on the default map to be invoked when the map is clicked.
map.onClick(function(coords) {
  // Clear the panel and show a loading message.
  chartPanel.clear();
  // Compute the mean NDVI; a potentially long-running server operation.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var nightlights = ee.ImageCollection('NOAA/DMSP-OLS/NIGHTTIME_LIGHTS')
.select('stable_lights')
var nightlightsChart = ui.Chart.image.series(nightlights, point, ee.Reducer.mean(), 500)
.setOptions({
  title: 'Nightlights Time Series 1992-2013',
  colors: ['FF0000'],
  hAxis: {title:'Year'}, 
  vAxis: {title: 'Light Intensity'},
  legend: {position: 'none'}
})
  chartPanel.add(nightlightsChart);
});
map.style().set('cursor', 'crosshair');