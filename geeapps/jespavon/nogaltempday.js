var imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "LST_Day_1km"
        ],
        "min": 30.172851273892963,
        "max": 37.90551771006453,
        "palette": [
          "0933ff",
          "4e8cff",
          "7ff3ff",
          "e5ffa6",
          "fff4a6",
          "ffad67",
          "ff2d0b",
          "c22fff",
          "ff13f7"
        ]
      }
    }) || {"opacity":1,"bands":["LST_Day_1km"],"min":30.172851273892963,"max":37.90551771006453,"palette":["0933ff","4e8cff","7ff3ff","e5ffa6","fff4a6","ffad67","ff2d0b","c22fff","ff13f7"]},
    ROI = ui.import && ui.import("ROI", "table", {
      "id": "users/jespavon/nogal"
    }) || ee.FeatureCollection("users/jespavon/nogal");
// A simple tool for charting TOMATE IN EXTREMADURA
// Map.addLayer(ROI, {color: 'FF0000'}, 'Polygons')
 //Map.centerObject(ROI,17);
/*
 * Map layer configuration
 */
var start_date1 = ee.Date.fromYMD(2019,5,1);
var end_date1 = Date.now();
// Image collection modis
var modis = ee.ImageCollection('MODIS/006/MOD11A1');
var modisLST = modis.filterBounds(ROI)
                    .filterDate(ee.Date(start_date1),ee.Date(end_date1))
                    .select('LST_Day_1km');
// Convert temperature to Celsius.
modisLST = modisLST.map(function(img){
  return img.multiply(0.02).subtract(273.15).copyProperties(img,['system:time_start'])
});
var vis = {min: 0, max: 60, palette: 'navy,blue,aqua'};
var composite = modisLST.mean().visualize(imageVisParam);
var composite_clip = composite.clip(ROI)
var compositeLayer = ui.Map.Layer(composite_clip).setName('LST Composite')
                                            //.clip(ROI);
// Create the main map and set the SST layer.
var mapPanel = ui.Map();
var layers = mapPanel.layers();
layers.add(compositeLayer, '2018 Composite');
/*
 * Panel setup
 */
// Create a panel to hold title, intro text, chart and legend components.
var inspectorPanel = ui.Panel({style: {width: '30%'}});
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'Land Temperature',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
  ui.Label('Click a location to see its time series from your fields.')
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
// Generates a new time series chart of LST for the given coordinates.
var generateChart = function (coords) {
  // Update the lon/lat panel with values from the click event.
  lon.setValue('lon: ' + coords.lon.toFixed(2));
  lat.setValue('lat: ' + coords.lat.toFixed(2));
  // Add a dot for the point clicked on.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point, {color: '000000'}, 'clicked location');
  // Add the dot as the second layer, so it shows up on top of the composite.
  mapPanel.layers().set(1, dot);
  // Make a chart from the time series.
  var sstChart = ui.Chart.image.series(modisLST, point, ee.Reducer.mean(), 500);
  // Customize the chart.
  sstChart.setOptions({
    title: 'Temperaturas Superficie Series Temporales',
    vAxis: {title: 'Temp (C)', maxValue: 50, minValue: 20},
    hAxis: {title: 'Fecha', format: 'MM-yy', gridlines: {count: 7}},
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
    palette:palette ,
  };
}
// Create the color bar for the legend.
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(imageVisParam.palette),
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
  value: 'Median 2019/05/15-2020/01/23 temp (C)',
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
var initialPoint = ee.Geometry.Point(-5.72, 39.95);
mapPanel.centerObject(ROI, 13);
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