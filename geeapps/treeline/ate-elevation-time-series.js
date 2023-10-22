//// A simple tool for charting the time-series of annual ATE elevation.
// Working directory.
var wd = 'users/treeline/Dirk/Western_US/Annual_NDVI/L5/ATEI_Components/1984to2011/';
/*
 * Map layer configuration.
 */
// Focal average neighboring ATE elevation from 1984 to 2011.
var annualElv = ee.Image(wd + 'Focal_Average_ATEelv_1984to2011');
var Elv = ee.ImageCollection(annualElv.bandNames().map(function(b){
  var year = ee.Algorithms.Date(ee.Algorithms.String(b).slice(4, 8));
  return annualElv.select([b], ['Elevation']).set('year', year);
}));
// Mask the temporal trend of ATEI to areas with ATEI in any year greater than a threshold value.
var trend = ee.Image(wd + 'Temporal/ATEelv_Trend_1984to2011');
// Set the map visualization parameters.
var visElv = {min: 1e3, max: 4e3, opacity: 0.8, palette: 'darkgreen, green, yellow, white'};
var visTrend = {min: -0.1, max: 0.1, opacity: 0.5, palette: 'blue, white, red'}; 
// Set default layers.
var setYear = 1984;
var setImage = annualElv.select("ATE_" + setYear);
var elvLayer = ui.Map.Layer(setImage.visualize(visElv)).setName('Neigboring ATE Elevation for Year ' + setYear);
var trendLayer = ui.Map.Layer(trend.visualize(visTrend)).setName('Temporal Trend of Neigboring ATE Elevation');
// Create the main map.
var mapPanel = ui.Map();
var layers = mapPanel.layers();
// A helper function to show the image for ATEI of a given year on the default map.
var showLayer = function(year) {
  var bandName = "ATE_" + year;
  var image = annualElv.select(bandName);
  var selected = image.visualize(visElv);
  elvLayer = ui.Map.Layer(selected).setName('Neigboring ATE Elevation for Year ' + year);
  layers.set(layers.length() - 3, elvLayer);
};
/*
 * Panel setup.
 */
// Create a panel to hold title, intro text, chart, and legend components.
var inspectorPanel = ui.Panel({style: {width: '30%'}});
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'Neighboring Alpine Treeline Ecotone (ATE) Elevation - Time Series Inspector',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
  ui.Label('Click a location to see its time series of neighboring ATE elevation.')
]);
inspectorPanel.add(intro);
// Create panels to hold lon/lat values.
var lon = ui.Label();
var lat = ui.Label();
inspectorPanel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
// Add placeholders for the chart and legends.
inspectorPanel.add(ui.Label('[Chart]'));
inspectorPanel.add(ui.Label('[Slider]'));
inspectorPanel.add(ui.Label('[Legend]'));
inspectorPanel.add(ui.Label('[Legend2]'));
/*
 * Chart setup.
 */
// Generates a new time series chart of ATEIs for the given coordinates.
var generateChart = function (coords) {
  // Update the lon/lat panel with values from the click event.
  lon.setValue('Longitude: ' + coords.lon.toFixed(4));
  lat.setValue('Latitude: ' + coords.lat.toFixed(4));
  // Add a dot for the point clicked on.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point, {color: 'cyan'}, 'Clicked Location');
  // Add the dot on top of the composite.
  layers.set(layers.length() - 1, dot);
  // Make a chart from the time series.
  var elvChart = ui.Chart.image.series(Elv, point, ee.Reducer.mean(), 30, 'year');
  // Customize the chart.
  elvChart.setOptions({
    title: 'Neighboring ATE Elevation: Time Series',
    vAxis: {title: 'Elevation (m)'},
    hAxis: {title: 'Year', format: 'yyyy'},
    series: {
      0: {
        color: 'blue',
        lineWidth: 0,
        pointsVisible: true,
        pointSize: 4
      }
    },
    legend: {position: 'right'},
  });
  // Add the chart at a fixed position, so that new charts overwrite older ones.
  inspectorPanel.widgets().set(2, elvChart);
};
/*
 * Slider setup.
 */
// Create a label and slider.
var sliderLabel = ui.Label({
  value: "Annual Neigboring ATE Elevation for Year",
  style: {
    fontWeight: 'bold'
  }
});
var slider = ui.Slider({
  min: 1984,
  max: 2011,
  step: 1,
  onChange: showLayer,
  style: {stretch: "horizontal"}
});
// Create a panel that contains both the slider and the label.
var sliderPanel = ui.Panel({
  widgets: [sliderLabel, slider],
  layout: ui.Panel.Layout.flow("vertical")
});
inspectorPanel.widgets().set(3, sliderPanel);
/*
 * Legend setup.
 */
// Creates a color bar thumbnail image for use in legend from the given color palette.
function makeColorBarParams(palette) {
  return {
    bbox: [0, 0, 1, 0.1],
    // dimensions: '100x10',
    // format: 'png',
    // min: 0,
    // max: 1,
    palette: palette,
  };
}
// Legend 1.
// Create the color bar for the legend.
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(visElv.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
// Create a panel with three numbers for the legend.
var legendLabels = ui.Panel({
  widgets: [
    ui.Label(visElv.min, {margin: '4px 8px'}),
    ui.Label(
        ((visElv.min + visElv.max) / 2),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(visElv.max, {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
var legendTitle = ui.Label({
  value: 'Legend 1: Annual Neighboring ATE Elevation from 1984 to 2011 (m)',
  style: {fontWeight: 'bold'}
});
var legendPanel = ui.Panel([legendTitle, colorBar, legendLabels]);
inspectorPanel.widgets().set(4, legendPanel);
// Legend 2.
// Create the color bar for the legend.
var colorBar2 = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(visTrend.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
// Create a panel with three numbers for the legend.
var legendLabels2 = ui.Panel({
  widgets: [
    ui.Label(visTrend.min, {margin: '4px 8px'}),
    ui.Label(
        ((visTrend.min + visTrend.max) / 2),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(visTrend.max, {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
var legendTitle2 = ui.Label({
  value: 'Legend 2: Temporal Trend of Annual Neigboring ATE Elevation from 1984 to 2011 (m/year)',
  style: {fontWeight: 'bold'}
});
var legendPanel2 = ui.Panel([legendTitle2, colorBar2, legendLabels2]);
inspectorPanel.widgets().set(5, legendPanel2);
/*
 * Map setup.
 */
// Set default values on the slider and map.
slider.setValue(setYear);
mapPanel.setOptions("hybrid");
// Register a callback on the default map to be invoked when the map is clicked.
mapPanel.onClick(generateChart);
// Configure the map.
mapPanel.style().set('cursor', 'crosshair');
// Initialize with a test point.
var initialPoint = ee.Geometry.Point(-105.9098, 39.73877);
mapPanel.centerObject(initialPoint, 11);
/*
 * Initialize the App.
 */
// Replace the root with a SplitPanel that contains the inspector and map.
ui.root.clear();
ui.root.add(ui.SplitPanel(inspectorPanel, mapPanel));
// Arrange layers.
layers.add(elvLayer);
layers.add(trendLayer);
layers.add();
generateChart({
  lon: initialPoint.coordinates().get(0).getInfo(),
  lat: initialPoint.coordinates().get(1).getInfo()
});