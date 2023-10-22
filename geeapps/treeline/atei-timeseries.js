// A simple tool for charting the time-series of annual alpine treeline ecotone probability (ATEP).
// Working directory.
var wd = 'users/treeline/Dirk/Western_US/Annual_NDVI/L5/ATEI_Components/1984to2011/';
/*
 * Map layer configuration.
 */
// ATEP from 1984 to 2011.
var annualATEP = ee.Image(wd + 'Multinomial_ATEP_1984to2011');
var ATEP = ee.ImageCollection(annualATEP.bandNames().map(function(b){
  var year = ee.Algorithms.Date(ee.Algorithms.String(b).slice(5, 9));
  return annualATEP.select([b], ['ATEP']).set('year', year);
}));
// Calculate the temporal mean and maximum values of ATEP.
var mean = ATEP.mean();
var max = ATEP.max();
// Mask the temporal trend of ATEP to areas with ATEP in any year greater than a threshold value.
var trend = ee.Image(wd + 'Temporal/ATEP_Trend_1984to2011');
var thres = 0.1;
var mask = ATEP.map(function(i) {
  return i.gt(thres);
}).min();
trend = trend.updateMask(mask);
// Set the map visualization parameters.
var visATEP = {min: 0, max: 1, opacity: 0.8, palette: 'white, green'};
var visTrend = {min: -0.0001, max: 0.0001, opacity: 0.5, palette: 'blue, white, red'}; 
// Set default layers.
var setYear = 1984;
var setImage = annualATEP.select("ATEP_" + setYear);
var atepLayer = ui.Map.Layer(setImage.visualize(visATEP)).setName('ATEP for Year ' + setYear);
var trendLayer = ui.Map.Layer(trend.visualize(visTrend)).setName('Masked Temporal Trend of ATEP');
var meanLayer = ui.Map.Layer(mean.visualize(visATEP)).setName('Temporal Average ATEP');
var maxLayer = ui.Map.Layer(max.visualize(visATEP)).setName('Temporal Maximum ATEP');
// Create the main map.
var mapPanel = ui.Map();
var layers = mapPanel.layers();
// A helper function to show the image for ATEI of a given year on the default map.
var showLayer = function(year) {
  var bandName = "ATEP_" + year;
  var image = annualATEP.select(bandName);
  var selected = image.visualize(visATEP);
  atepLayer = ui.Map.Layer(selected).setName('ATEP for Year ' + year);
  layers.set(layers.length() - 3, atepLayer);
};
/*
 * Panel setup.
 */
// Create a panel to hold title, intro text, chart, and legend components.
var inspectorPanel = ui.Panel({style: {width: '30%'}});
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'Alpine Treeline Ecotone Probability (ATEP) - Time Series Inspector',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
  ui.Label('Click a location to see its time series of ATEIs.')
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
  var dot = ui.Map.Layer(point, {color: 'yellow'}, 'Clicked Location');
  // Add the dot on top of the composite.
  layers.set(layers.length() - 1, dot);
  // Make a chart from the time series.
  var ATEPchart = ui.Chart.image.series(ATEP, point, ee.Reducer.mean(), 30, 'year');
  // Customize the chart.
  ATEPchart.setChartType('ScatterChart').setOptions({
    title: 'ATEP: Time Series',
    vAxis: {title: 'ATEP'},
    hAxis: {title: 'Year', format: 'yyyy'},
    lineWidth: 1.5,
    pointsVisible: true,
    pointSize: 4,
    series: {
      0: {color: 'orange'}
    },
    legend: {position: 'right'}
  });
  // Add the chart at a fixed position, so that new charts overwrite older ones.
  inspectorPanel.widgets().set(2, ATEPchart);
};
/*
 * Slider setup.
 */
// Create a label and slider.
var sliderLabel = ui.Label({
  value: "Annual ATEP for Year",
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
  params: makeColorBarParams(visTrend.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
// Create a panel with three numbers for the legend.
var legendLabels = ui.Panel({
  widgets: [
    ui.Label(visTrend.min, {margin: '4px 8px'}),
    ui.Label(
        ((visTrend.min + visTrend.max) / 2),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(visTrend.max, {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
var legendTitle = ui.Label({
  value: 'Legend 2: Masked Temporal Trend of Annual ATEP from 1984 to 2011 (ATEP in any year > ' + thres + ')',
  style: {fontWeight: 'bold'}
});
var legendPanel = ui.Panel([legendTitle, colorBar, legendLabels]);
inspectorPanel.widgets().set(5, legendPanel);
// Legend 2.
// Create the color bar for the legend.
var colorBar2 = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(visATEP.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
// Create a panel with three numbers for the legend.
var legendLabels2 = ui.Panel({
  widgets: [
    ui.Label(visATEP.min, {margin: '4px 8px'}),
    ui.Label(
        ((visATEP.min + visATEP.max) / 2),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(visATEP.max, {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
var legendTitle2 = ui.Label({
  value: 'Legend 1: Annual ATEP from 1984 to 2011',
  style: {fontWeight: 'bold'}
});
var legendPanel2 = ui.Panel([legendTitle2, colorBar2, legendLabels2]);
inspectorPanel.widgets().set(4, legendPanel2);
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
var initialPoint = ee.Geometry.Point(-105.9152, 39.7253);
mapPanel.centerObject(initialPoint, 11);
/*
 * Initialize the App.
 */
// Replace the root with a SplitPanel that contains the inspector and map.
ui.root.clear();
ui.root.add(ui.SplitPanel(inspectorPanel, mapPanel));
// Arrange layers.
layers.add(meanLayer);
layers.add(maxLayer);
layers.add(atepLayer);
layers.add(trendLayer);
layers.add();
generateChart({
  lon: initialPoint.coordinates().get(0).getInfo(),
  lat: initialPoint.coordinates().get(1).getInfo()
});