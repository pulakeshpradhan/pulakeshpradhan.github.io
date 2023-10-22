// Absorbing Aerosol Index time series.... Adapted from Google Ocean Timeseries Investigator example
// developed by James... see more experiments at https://washways.users.earthengine.app
/*
 * Map layer configuration
 */
var start = '2018-11-01'
var end = '2022-07-31'
/*FIRMS*/
var firemap = ee.ImageCollection('FIRMS')
                  .select ('T21')
                  .filterDate(start,end);
var fireMaskVis = {
  min: 325.0,
  max: 400.0,
  palette: ['red', 'orange', 'yellow'],
};
/******/
/*MODIS
var firemap = ee.ImageCollection('MODIS/006/MOD14A1')
                  .select ('MaxFRP')
                  .filterDate(start,end);
var fireMaskVis = {
  min: 0.0,
  max: 6000.0,
};
*/
var collectionAI = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_CO')
  .select('CO_column_number_density')
  .filterDate(start,end);
var AI_max = 0.05;
//var AI_max = 0.0001;
var AI_min = 0;
var AI_viz = {
  min: AI_min,
  max: AI_max,
  opacity: 0.5,
  palette: ["white","yellow", "blue"]
};
var composite = collectionAI.mean().visualize(AI_viz);
var firecomposite = firemap.mean().visualize(fireMaskVis);
// Create the main map and set the collectionAI layer.
var mapPanel = ui.Map();
var layers = mapPanel.layers();
layers.add(firecomposite, 'Fire Mask');
//var layers2 = mapPanel.layers();
layers.add(composite, 'Aerosol Index');
//Map.addLayer(composite, 'AerosolIndex');
//Map.addLayer(firecomposite, 'FireMask');
/*
 * Panel setup
 */
// Create a panel to hold title, intro text, chart and legend components.
var inspectorPanel = ui.Panel({style: {width: '30%'}});
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'Aerosol Index - Time Series Analysis ',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
ui.Label('More about FIRMS dataset', {},'https://earthdata.nasa.gov/earth-observation-data/near-real-time/firms/about-firms')
]);
inspectorPanel.add(intro);
 var title = ui.Label('Dr. Anil Kumar Singh', {},'https://www.researchgate.net/profile/Anil-Kumar-Singh-6/research');
title.style().set('position', 'top-center');
inspectorPanel.add(title);
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
// Generates a new time series chart of collectionAI for the given coordinates.
var generateChart = function (coords) {
  // Update the lon/lat panel with values from the click event.
  lon.setValue('lon: ' + coords.lon.toFixed(2));
  lat.setValue('lat: ' + coords.lat.toFixed(2));
  // Add a dot for the point clicked on.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point, {color: '000000'}, 'clicked location');
  // Add the dot as the second layer, so it shows up on top of the composite.
  mapPanel.layers().set(2, dot);
  // Make a chart from the time series.
  var collectionAIChart = ui.Chart.image.series(collectionAI, point, ee.Reducer.mean(), 500);
  // Customize the chart.
 collectionAIChart.setOptions({
    title: 'Aerosol Index : time series',
    vAxis: {title: 'AI'},
    hAxis: {title: 'Date', format: 'MM-dd-yy', gridlines: {count: 7}},
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
  inspectorPanel.widgets().set(2, collectionAIChart);
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
  params: makeColorBarParams(AI_viz.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
// Create a panel with three numbers for the legend.
var legendLabels = ui.Panel({
  widgets: [
    ui.Label(AI_viz.min, {margin: '4px 8px'}),
    ui.Label(
        (AI_viz.max / 2),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(AI_viz.max, {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
var legendTitle = ui.Label({
  value: 'Map Legend: median AI',
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
var initialPoint = ee.Geometry.Point(77.201, 28.619);
mapPanel.centerObject(initialPoint, 7);
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