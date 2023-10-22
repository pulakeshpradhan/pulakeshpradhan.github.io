/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var geometry = 
    /* color: #d63000 */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[-23.045202183600892, 64.19536862210403],
          [-23.045202183600892, 63.74216137660462],
          [-21.449438023444642, 63.74216137660462],
          [-21.449438023444642, 64.19536862210403]]], null, false);
/***** End of imports. If edited, may not auto-convert in the playground. *****/
// MODIS land surface temperature in Iceland.
//Inspired by MODIS SST application created in GEE 
/*
 * Boundary
 */
var dataset = ee.FeatureCollection('USDOS/LSIB_SIMPLE/2017');
var iceland = dataset.filter(ee.Filter.eq('country_co', 'IC'));
//print(iceland);
Map.centerObject(iceland, 5);
//Map.addLayer(iceland);
// Compute the maximum land surface temperature (LST) value for each pixel by
// averaging MODIS Terra data for three years.
var modisLand = ee.ImageCollection('MODIS/006/MOD11A1');
var lst =
    modisLand.select(['LST_Day_1km']).filterDate('2020-01-01', '2025-12-31');
var modLSTc = lst.map(function(img) {
  return img
    .multiply(0.02)
    .subtract(273.15)
    .clip(iceland)
    .copyProperties(img, ['system:time_start']);
});
var vis = {min: 10, max: 90, palette: ['blue', 'limegreen', 'yellow', 'darkorange', 'red']};
var composite = modLSTc.max().clip(geometry).visualize(vis);
var compositeLayer = ui.Map.Layer(composite).setName('LST Composite');
// Create the main map and set the LST layer.
var mapPanel = ui.Map();
var layers = mapPanel.layers();
layers.add(compositeLayer, 'Composite');
//Map.addLayer(compositeLayer, {
//  min: 10, max: 90,
//  palette: ['blue', 'limegreen', 'yellow', 'darkorange', 'red']},
//  'Max temperature, 2018');
/*
 * Panel setup
 */
// Create a panel to hold title, intro text, chart and legend components.
var inspectorPanel = ui.Panel({style: {width: '30%'}});
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'Near Real-Time Series Day Surface Temperature Inspector (Reykjanes, Iceland)',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
   ui.Label('The Data derived from MODIS satellite images composite, Area covered by thermal anomalies showing anomalies signal detected by satellite. *Data processing begin since 2020-01-01 til recent satellite images, it prevent overload of data. This beta app Designed by Muhammad Aufaristama, any comments or suggestions to improve this app can be sent to m.aufaristama@utwente.nl'),
  ui.Label('Click a location to see its time series of land surface temperatures.')
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
  var dot = ui.Map.Layer(point, {color: '000000'}, 'clicked location');
  // Add the dot as the second layer, so it shows up on top of the composite.
  mapPanel.layers().set(1, dot);
  // Make a chart from the time series.
  var sstChart = ui.Chart.image.series({
    imageCollection: modLSTc,
    region: point, 
    reducer: ee.Reducer.max(), 
    scale: 1000,});
  // Customize the chart.
  sstChart.setOptions({
    title: 'Land surface temp: time series of inspection point in Reykjanes',
    vAxis: {title: 'Temp (C)'},
    hAxis: {title: 'Date', format: 'MM-yy', gridlines: {count: 7}},
    series: {
      0: {
        color: 'red',
        lineWidth: 0,
        pointsVisible: true,
        pointSize: 2,
      },
    },
    legend: {position: 'right'},
  });
  // Add the chart at a fixed position, so that new charts overwrite older ones.
  inspectorPanel.widgets().set(1, sstChart);
};
// Chart time series of High temperature Area for Iceland in 2014-2020.
var maskfunction = function(image){
  //get pixels above the threshold
var thermal01 = image.gt(45);
  //mask those pixels from the image
  image = image.updateMask(thermal01)
  var area = ee.Image.pixelArea();
  var thermalArea = thermal01.multiply(area).rename('thermalArea');
image = image.addBands(thermalArea);
  var stats = thermalArea.reduceRegion({
    reducer: ee.Reducer.sum(), 
    geometry: geometry, 
    scale: 1000,
});
 return image.set(stats);
};
var collection = modLSTc.map(maskfunction);
print(collection);
var chart = ui.Chart.image.series({
  imageCollection: collection.select('thermalArea'), 
  region: geometry,
  reducer: ee.Reducer.sum(), 
  scale: 1000,
});
 chart.setOptions({
    title: 'Area covered by thermal anomalies',
    vAxis: {title: 'Km2'},
    hAxis: {title: 'Date', format: 'MM-yy', gridlines: {count: 7}}
 });
inspectorPanel.widgets().set(2, chart);
//print(chart);
// #############################################################################
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
    ui.Label('low' , {margin: '4px 8px'}),
    ui.Label(
        ('medium'),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label('high', {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
var legendTitle = ui.Label({
  value: 'Map Legend: composite maximum land temp (C)',
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
var initialPoint = ee.Geometry.Point(-22.25,63.89);
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