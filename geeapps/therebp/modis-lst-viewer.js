/*
 * Map layer configuration
 */
// Define the region of interest (Florida).
var florida = ee.FeatureCollection('TIGER/2018/States')
  .filter(ee.Filter.eq('STUSPS', 'FL'));
// Compute the mean land surface temperature (LST) value for each pixel by
// averaging MODIS Terra for one year when the app opens for the first time
var vis = {
  min: 32,
  max: 110,
  palette: [
    '040274', '040281', '0502a3', '0502b8', '0502ce', '0502e6',
    '0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef',
    '3be285', '3ff38f', '86e26f', '3ae237', 'b5e22e', 'd6e21f',
    'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08', 'ff500d',
    'ff0000', 'de0101', 'c21301', 'a71001', '911003'
  ]
};
// Create the main map and set the LST layer.
var mapPanel = ui.Map();
// Create a panel for the app.
var appPanel = ui.Panel({ style: { width: '30%' } });
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'MODIS Land Surface Temperature – Time Series Inspector',
    style: { fontSize: '20px', fontWeight: 'bold' }
  })
]);
appPanel.add(intro);
// Create a dropdown for selecting the year.
var yearSelect = ui.Select({
  items: ['2019', '2020', '2021', '2022'],
  value: '2019',
  onChange: updateYearlyMean
});
// Create a label for the dropdown.
var yearLabel = ui.Label('Select year and click a location to generate time series:');
// Create panels to hold lon/lat values.
var lonLabel = ui.Label('Longitude:');
var latLabel = ui.Label('Latitude:');
var lonValue = ui.Label();
var latValue = ui.Label();
var lstpointLabel = ui.Label('Click a location to see its time series of surface temperatures.');
var lonLatPanel = ui.Panel([lonLabel, lonValue, latLabel, latValue], ui.Panel.Layout.flow('horizontal'));
// Add the year dropdown, label, and lon/lat panel to the app panel.
appPanel.add(yearLabel);
appPanel.add(yearSelect);
appPanel.add(lonLatPanel);
appPanel.add(lstpointLabel);
/* 
 * Layer setup
 */
// Function to update the map with yearly mean LST for the selected year.
function updateYearlyMean() {
  var selectedYear = yearSelect.getValue();
  var lstYearlyMean = getYearlyMeanLST(selectedYear);
  mapPanel.layers().reset([lstYearlyMean]);
}
// Function to get yearly mean LST for the selected year.
function getYearlyMeanLST(year) {
  // Load MODIS LST data for the selected year and calculate the mean.
  var lstYearly = ee.ImageCollection('MODIS/061/MOD11A2')
    .filterDate(year + '-01-01', (parseInt(year) + 1) + '-01-01')
    .filterBounds(florida)
    .select('LST_Day_1km')
    .mean();
  // Convert Kelvin to Fahrenheit for visualization (customize as needed).
  var lstFahrenheit = lstYearly.multiply(0.02).subtract(273.15).multiply(9).divide(5).add(32);
  return ui.Map.Layer(lstFahrenheit.clip(florida), {
    min: 32,
    max: 110,
    palette: [
      '040274', '040281', '0502a3', '0502b8', '0502ce', '0502e6',
      '0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef',
      '3be285', '3ff38f', '86e26f', '3ae237', 'b5e22e', 'd6e21f',
      'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08', 'ff500d',
      'ff0000', 'de0101', 'c21301', 'a71001', '911003'
    ]
  }, year + ' LST (°F)');
}
// ...
// Function to extract coordinates from the click event and generate the chart.
var generateChart = function (coords, selectedYear) {
  // Update the lon/lat panel with values from the click event.
  lonValue.setValue('' + coords.lon.toFixed(2));
  latValue.setValue('' + coords.lat.toFixed(2));
  // Add a dot for the point clicked on.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point, { color: 'black' }, 'clicked location');
  // Add the dot as the second layer, so it shows up on top of the composite.
  mapPanel.layers().set(1, dot);
  // Make a chart from the time series if valid LST data exists.
  var lst = ee.ImageCollection('MODIS/061/MOD11A2')
    .select(['LST_Day_1km'])
    .filterBounds(point)
    .filterDate(selectedYear + '-01-01', (parseInt(selectedYear) + 1) + '-01-01'); // Customize the date range as needed.
  // Check if there are valid LST images.
  var hasValidData = lst.size().gt(0);
  if (hasValidData) {
    // Convert LST from Kelvin to Fahrenheit.
    var lstF = lst.map(function (image) {
      return image.multiply(0.02).subtract(273.15).multiply(9 / 5).add(32)
        .copyProperties(image).set('system:time_start', image.get('system:time_start'));
    });
    var lstChart = ui.Chart.image.series(lstF, point, ee.Reducer.mean(), 500);
    // Customize the chart.
    lstChart.setOptions({
      title: 'Land surface temp: time series',
      vAxis: { title: 'Temp (F)' },
      hAxis: { title: 'Date', format: 'MM-yy', gridlines: { count: 7 } },
      series: {
        0: {
          color: 'red',
          lineWidth: 0,
          pointsVisible: true,
          pointSize: 2,
        },
      },
      legend: { position: 'right' },
    });
    // Add the chart at a fixed position, so that new charts overwrite older ones.
    appPanel.widgets().set(4, lstChart);
  } else {
    // If no valid data exists, display a message indicating no data.
    appPanel.widgets().set(4, ui.Label('No valid data for the selected point and date range.'));
  }
};
/* 
 * Legend setup
 */
// Creates a color bar thumbnail image for use in legend from the given color palette.
function makeColorBarParams(palette) {
  return {
    bbox: [0, 0, 1, 0.1],
    dimensions: '100x10',
    format: 'png',
    min: 0,
    max: 1,
    palette: palette,
  };
}
// Create the color bar for the legend.
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(vis.palette),
  style: { stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px' },
});
// Create a panel with three numbers for the legend.
var legendLabels = ui.Panel({
  widgets: [
    ui.Label(vis.min, { margin: '4px 8px' }),
    ui.Label(
      (vis.max / 2),
      { margin: '4px 8px', textAlign: 'center', stretch: 'horizontal' }),
    ui.Label(vis.max, { margin: '4px 8px' })
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
var legendTitle = ui.Label({
  value: 'Average Land Surface Temperature (F)',
  style: { fontWeight: 'bold' }
});
var legendPanel = ui.Panel([legendTitle, colorBar, legendLabels]);
appPanel.widgets().set(5, legendPanel);
/* 
 * Map setup
 */
// Register a callback on the default map to be invoked when the map is clicked.
mapPanel.onClick(function (coords) {
  var selectedYear = yearSelect.getValue(); // Get the selected year from the dropdown.
  generateChart(coords, selectedYear); // Pass the selected year to the generateChart function.
});
// Configure the map.
mapPanel.style().set('cursor', 'crosshair');
// Initialize with a test point.
var initialPoint = ee.Geometry.Point(-80.2075, 25.7654);
mapPanel.centerObject(florida, 6.5);
/* 
 * Initialize the app
 */
// Replace the root with a SplitPanel that contains the inspector and map.
ui.root.clear();
ui.root.add(ui.SplitPanel(appPanel, mapPanel));
// Display the 2019 yearly composite when the app is first opened.
updateYearlyMean(); // Call the function to update the map with the 2019 composite.
generateChart({
  lon: initialPoint.coordinates().get(0).getInfo(),
  lat: initialPoint.coordinates().get(1).getInfo()
}, '2019'); // Generate a chart with the initial point and the year 2019.