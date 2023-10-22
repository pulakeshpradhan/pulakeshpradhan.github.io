// Compute the mean sea surface temperature (SST) value for each pixel by
// averaging MODIS Aqua data for one year.
var newDate = new Date();
var today = ee.Date(newDate);
var previous = today.advance(-230, 'day');
var modisOceanColor1 = ee.ImageCollection('NOAA/CDR/OISST/V2_1');
var sst =
    modisOceanColor1.select(['sst']).filterDate('2018-01-01', today);
var modisOceanColor = ee.ImageCollection('NASA/OCEANDATA/MODIS-Aqua/L3SMI');
var chl =
    modisOceanColor.select(['chlor_a']).filterDate('2018-01-01', today);
var vis = {min: 0, max: 6, palette: ' 16213e,16213e,0e9aa7,4cd3c2,79d70f,f6d743,f4a548,c70039,900c3f'};
var composite = chl.mean().visualize(vis);
var compositeLayer = ui.Map.Layer(composite).setName('SST Composite');
// Create the main map and set the SST layer.
var mapPanel = ui.Map();
var layers = mapPanel.layers();
layers.add(compositeLayer, '2017 Composite');
/*
 * Panel setup
 */
// Create a panel to hold title, intro text, chart and legend components.
var inspectorPanel = ui.Panel({style: {width: '30%'}});
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'Rata2 Konsentrasi Chl-a dan Suhu Temperature Air Laut ',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
  ui.Label('Klik permukaan air laut untuk melihat')
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
  lon.setValue('lon: ' + coords.lon.toFixed(2));
  lat.setValue('lat: ' + coords.lat.toFixed(2));
  // Add a dot for the point clicked on.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point, {color: '#FF0000'}, 'clicked location');
  // Add the dot as the second layer, so it shows up on top of the composite.
  mapPanel.layers().set(1, dot);
  // Make a chart from the time series.
  var sstChart = ui.Chart.image.series(sst, point, ee.Reducer.mean(), 500);
  var chlChart = ui.Chart.image.series(chl, point, ee.Reducer.mean(), 500);
  // Customize the chart.
  sstChart.setOptions({
    title: 'temperature permukaan laut: 01/01/2018 sampai dengan -3 hari ini',
    vAxis: {title: 'Temp (C)/100'},
    hAxis: {title: 'Date', format: 'MM-yy', gridlines: {count: 7}},
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
// Customize the chart.
  chlChart.setOptions({
    title: 'Konsentrasi Chl-a: 01/01/2018 sampai dengan -3 bulan dari sekarang',
    vAxis: {title: 'mg/m3'},
    hAxis: {title: 'Date', format: 'MM-yy', gridlines: {count: 7}},
    series: {
      0: {
        color: 'green',
        lineWidth: 0,
        pointsVisible: true,
        pointSize: 2,
      },
    },
    legend: {position: 'right'},
  });
  // Add the chart at a fixed position, so that new charts overwrite older ones.
  inspectorPanel.widgets().set(3, chlChart);
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
  value: 'Map Legend: median 2018-2020 ocean chl (mg/m3)',
  style: {fontWeight: 'bold'}
});
var legendPanel = ui.Panel([legendTitle, colorBar, legendLabels]);
inspectorPanel.widgets().set(4, legendPanel);
/*
 * Map setup
 */
// Register a callback on the default map to be invoked when the map is clicked.
mapPanel.onClick(generateChart);
// Configure the map.
mapPanel.style().set('cursor', 'crosshair');
// Initialize with a test point.
var initialPoint = ee.Geometry.Point(123.36, -10.45);
mapPanel.centerObject(initialPoint, 8);
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
Export.image.toAsset(sst)