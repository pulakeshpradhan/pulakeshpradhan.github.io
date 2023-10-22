/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var geometry = 
    /* color: #d63000 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.MultiPolygon(
        [[[[71.50015982431125, 30.278083720336355],
           [71.50015982431125, 30.267965492115845],
           [71.52303370279026, 30.267965492115845],
           [71.52303370279026, 30.278083720336355]]],
         [[[71.48709500984289, 30.3006590805873],
           [71.48709500984289, 30.29391526307712],
           [71.49370397285558, 30.29391526307712],
           [71.49370397285558, 30.3006590805873]]]], null, false),
    geometry2 = /* color: #98ff00 */ee.Geometry.MultiPolygon(
        [[[[71.51273854021592, 30.270619916946824],
           [71.51281364206834, 30.270555054899027],
           [71.51403672937913, 30.270573586917042],
           [71.51403672937913, 30.271129545831286],
           [71.51335008387132, 30.271111013918198],
           [71.51329643969102, 30.273288489759086],
           [71.51262052301927, 30.273279224006785]]],
         [[[71.48979967910172, 30.29742522692753],
           [71.49058288413407, 30.297397436505925],
           [71.49059361297013, 30.299083374495847],
           [71.49050778228165, 30.299083374495847],
           [71.4897782214296, 30.299074111179497]]]]);
/***** End of imports. If edited, may not auto-convert in the playground. *****/
/*
 var S2 = ee.ImageCollection('COPERNICUS/S2')
//filter start and end date
.filterDate('2019-10-01', '2020-04-20')
//filter according to drawn boundary
.filterBounds(geometry);
// Function to mask cloud from built-in quality band
// information on cloud
var maskcloud1 = function(image) {
var QA60 = image.select(['QA60']);
return image.updateMask(QA60.lt(1));
};*/
function maskS2clouds(image) {
  var qa = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0).and(
             qa.bitwiseAnd(cirrusBitMask).eq(0));
  // Return the masked and scaled data, without the QA bands.
  return image.updateMask(mask).divide(10000)
      .select("B.*")
      .copyProperties(image, ["system:time_start"]);
}
var S2 = ee.ImageCollection('COPERNICUS/S2')
    .filterDate('2019-10-20', '2020-05-02')
    .filterBounds(geometry)
    //.filterDate('2019-01-25', '2019-01-29')
    //.filterDate('2019-01-25', '2019-01-29')
    // Pre-filter to get less cloudy granules.
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 2))
    .map(maskS2clouds);
var S2a = ee.ImageCollection('COPERNICUS/S2')
    .filterDate('2020-04-20', '2020-04-30')
    .filterBounds(geometry)
    //.filterDate('2019-01-25', '2019-01-29')
    //.filterDate('2019-01-25', '2019-01-29')
    // Pre-filter to get less cloudy granules.
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
    .map(maskS2clouds);
// Function to calculate and add an NDVI band
var addNDVI = function(image) {
return image.addBands(image.normalizedDifference(['B8', 'B4']));
};
// Add NDVI band to image collection
var S2 = S2.map(addNDVI);
// Extract NDVI band and create NDVI median composite image
var NDVI = S2.select(['nd']);
var NDVImed = NDVI.median();
var vis = {bands: ['B12', 'B8', 'B2'], min: 0, max: 0.35,gamma: [0.95, 1.2, 1.1]};
var composite = S2a.min().clip(geometry).visualize(vis);
//var vis = {min: 0, max: 30, palette: 'navy,blue,aqua'};
//var composite = S2.mean().visualize(vis);
var compositeLayer = ui.Map.Layer(composite).setName('25-April-2020');
// Create the main map and set the SST layer.
var mapPanel = ui.Map();
var layers = mapPanel.layers();
layers.add(compositeLayer, 'Composite');
/*
 * Panel setup
 */
// Create a panel to hold title, intro text, chart and legend components.
var inspectorPanel = ui.Panel({style: {width: '30%'}});
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'NDVI - Time Series Inspector',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
  ui.Label('Click a location to see its vegetation phenology.')
]);
inspectorPanel.add(intro);
// Create panels to hold lon/lat values.
var lon = ui.Label();
var lat = ui.Label();
inspectorPanel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
// Add placeholders for the chart and legend.
inspectorPanel.add(ui.Label('[Chart]'));
inspectorPanel.add(ui.Label('[Legend]'));
/*
 * Chart setup
 */
// Generates a new time series chart of SST for the given coordinates.
var generateChart = function (coords) {
  // Update the lon/lat panel with values from the click event.
  lon.setValue('lon: ' + coords.lon.toFixed(8));
  lat.setValue('lat: ' + coords.lat.toFixed(8));
  // Add a dot for the point clicked on.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point, {color: '000000'}, 'clicked location');
  // Add the dot as the second layer, so it shows up on top of the composite.
  mapPanel.layers().set(1, dot);
 var field = geometry2;
 var gfield = ui.Map.Layer(field, {color: '000000'}, 'Trail Fields');
 mapPanel.layers().set(2, gfield);
  // Make a chart from the time series.
  var sstChart = ui.Chart.image.series(NDVI, point, ee.Reducer.mean(), 10).setChartType('LineChart');
  // Customize the chart.
  sstChart.setOptions({
    title: 'NDVI: time series',
    vAxis: {title: 'NDVI'},
    hAxis: {title: 'Date', format: 'MM-yy', gridlines: {count: 10}},
    series: {
      0: {
        color: 'blue',
        lineWidth: 0,
        pointsVisible: true,
        pointSize: 2,
      },
    },
    legend: {position: 'right'},
  });
  // Add the chart at a fixed position, so that new charts overwrite older ones.
  inspectorPanel.widgets().set(2, sstChart);
};
/*
 * Legend setup
 */
// Creates a color bar thumbnail image for use in legend from the given color
// palette.
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
/*
// Create the color bar for the legend.
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(vis.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
// Create a panel with three numbers for the legend.
var legendLabels = ui.Panel({
  widgets: [
    ui.Label(vis.min, {margin: '4px 8px'}),
    ui.Label(
        (vis.max / 2),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(vis.max, {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
var legendTitle = ui.Label({
  value: 'Map Legend: median 2017 ocean temp (C)',
  style: {fontWeight: 'bold'}
});
var legendPanel = ui.Panel([legendTitle, colorBar, legendLabels]);
inspectorPanel.widgets().set(3, legendPanel);
/*
 * Map setup
 */
// Register a callback on the default map to be invoked when the map is clicked.
mapPanel.onClick(generateChart);
// Configure the map.
mapPanel.style().set('cursor', 'crosshair');
// Initialize with a test point.
var initialPoint = ee.Geometry.Point(71.514364023, 30.2732627);
mapPanel.centerObject(initialPoint, 14);
/*
 * Initialize the app
 */
// Replace the root with a SplitPanel that contains the inspector and map.
ui.root.clear();
ui.root.add(ui.SplitPanel(inspectorPanel, mapPanel));
generateChart({
  lon: initialPoint.coordinates().get(0).getInfo(),
  lat: initialPoint.coordinates().get(1).getInfo()
});