// #############################################################################
// Land Surface Temperature (LST)
// Objectives:
// 1. Import Land Surface Temperature (LST) data from 'MODIS/006/MOD11A2' in GEE Data Catalog for 1 year in Bangkok, Thailand: 
//    https://developers.google.com/earth-engine/datasets/catalog/MODIS_006_MOD11A2.
// 2. Describe the LST data using a time series chart.
// 3. Export processed raster data for use in GIS.
// #############################################################################
// #############################################################################
// Import area boundaries feature collection.
var gaul = ee.FeatureCollection("FAO/GAUL/2015/level2");
var roi = gaul.filter(ee.Filter.eq('ADM1_NAME', 'Nakhon Nayok'))
//var mueang = nan.filter(ee.Filter.eq('ADM2_NAME', 'mueangnan'))
Map.addLayer(roi);
// #############################################################################
// Import LST image collection.
var modis = ee.ImageCollection('MODIS/006/MOD11A2');
// Define a date range of interest; here, a start date is defined and the end
// date is determined by advancing 1 year from the start date.
var start = ee.Date('2018-01-01');
var dateRange = ee.DateRange(start, start.advance(2, 'year'));
// Filter the LST collection to include only images intersecting the desired
// date range.
var mod11a2 = modis.filterDate(dateRange);
// Select only the 1km day LST data band.
var modLSTday = mod11a2.select('LST_Day_1km');
// #############################################################################
// Scale to Kelvin and convert to Celsius, set image acquisition time.
var modLSTc = modLSTday.map(function(img) {
  return img
    .multiply(0.02)
    .subtract(273.15)
    .copyProperties(img, ['system:time_start']);
});
var vis = {
  min: 10.0,
  max: 45.0,
  palette: [
    '040274', '040281', '0502a3', '0502b8', '0502ce', '0502e6',
    '0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef',
    '3be285', '3ff38f', '86e26f', '3ae237', 'b5e22e', 'd6e21f',
    'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08', 'ff500d',
    'ff0000', 'de0101', 'c21301', 'a71001', '911003'
  ],
};
//Map.setCenter(100.995, 18.950, 9);
//Map.addLayer(modLSTc, vis,'Land Surface Temperature');  
// #############################################################################
// 2. Chart time series of LST for Thailand in 2019.
var ts1 = ui.Chart.image.series({
  imageCollection: modLSTc,
  region: roi,
  reducer: ee.Reducer.mean(),
  scale: 1000,
  xProperty: 'system:time_start'})
  .setOptions({
     title: 'LST 2019 Time Series',
     vAxis: {title: 'LST Celsius'}});
print(ts1);
// #############################################################################
// 3. Export the image to your Google Drive account.
Export.image.toDrive({
  image: modLSTc,
  description: 'LST_Celsius_NY_2019',
  folder: 'LST_folder',
  region: roi,
  scale: 1000,
  crs: 'EPSG:4326',
  maxPixels: 1e10});
 //#################################################   
var composite = modLSTc.mean().visualize(vis).clip(roi);
var compositeLayer = ui.Map.Layer(composite).setName('Landsurface Temperature Composite');
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
    value: 'การตรวจสอบค่าอุณหภูมิพื้นผิวจากภาพถ่ายดาวเทียม MODIS',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
  ui.Label('สามารถอ่านค่าอุณหภูมิพื้นผิวได้โดยการกดระบุตำแหน่งที่ต้องการ')
]);
inspectorPanel.add(intro);
// Create panels to hold lon/lat values.
var lon = ui.Label();
var lat = ui.Label();
inspectorPanel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
// Add placeholders for the chart and legend.
inspectorPanel.add(ui.Label('[Chart]'));
inspectorPanel.add(ui.Label('[Legend]'));
//###############################################
/*
 * Chart setup
 */
// Generates a new time series chart of SST for the given coordinates.
var generateChart = function (coords) {
  // Update the lon/lat panel with values from the click event.
  lon.setValue('ลองจิจูด (lon): ' + coords.lon.toFixed(2));
  lat.setValue('ละติจูด (lat): ' + coords.lat.toFixed(2));
  // Add a dot for the point clicked on.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point, {color: 'D70B0B'}, 'clicked location');
  // Add the dot as the second layer, so it shows up on top of the composite.
  mapPanel.layers().set(1, dot);
  // Make a chart from the time series.
  var lstChart = ui.Chart.image.series(modLSTc, point, ee.Reducer.mean(), 500);
  // Customize the chart.
  lstChart.setOptions({
    title: 'Landsurface temp: time series',
    vAxis: {title: 'Temp (C)'},
    hAxis: {title: 'Date', format: 'MM-yy', gridlines: {count: 7}},
    series: {
      0: {
        color: 'blue',
        lineWidth: 1,
        pointsVisible: true,
        pointSize: 2,
      },
    },
    legend: {position: 'right'},
  });
  // Add the chart at a fixed position, so that new charts overwrite older ones.
  inspectorPanel.widgets().set(2, lstChart);
};
//############################################################
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
  value: 'ระดับค่าเฉลี่ยอุณหภูมิของพื้นผิว ระหว่างปี 2561-2562 (องศาเซลเซียส)',
  style: {fontWeight: 'bold'}
});
var legendPanel = ui.Panel([legendTitle, colorBar, legendLabels]);
inspectorPanel.widgets().set(3, legendPanel);
//###############################################
/*
 * Chart setup
 */
 var title = ui.Label({
  value: 'ค่าเฉลี่ยอุณหภูมิพื้นผิวของพื้นที่ศึกษา',
  style: {fontSize: '20px', fontWeight: 'bold'}
});
inspectorPanel.widgets().set(4, title); 
 var ts1 = ui.Chart.image.series({
  imageCollection: modLSTc,
  region: roi,
  reducer: ee.Reducer.mean(),
  scale: 1000,
  xProperty: 'system:time_start'})
  .setOptions({
     title: 'LST 2019 Time Series',
     vAxis: {title: 'LST Celsius'}});
// Add the chart at a fixed position, so that new charts overwrite older ones.
  inspectorPanel.widgets().set(5, ts1);
//###########################################################
//###############################################################
/*
 * Map setup
 */
// Register a callback on the default map to be invoked when the map is clicked.
mapPanel.onClick(generateChart);
// Configure the map.
mapPanel.style().set('cursor', 'crosshair');
// Initialize with a test point.
//var initialPoint = ee.Geometry.Point(100.995, 18.950); //Nan Province
var initialPoint = ee.Geometry.Point(101.165, 14.290); //Nakhon-Nayok
mapPanel.centerObject(initialPoint, 9);
//###############################################################
var clippedLSTc = modLSTc.mean().clip(roi);
// Add clipped image layer to the map.
Map.setCenter(101.165, 14.290, 9); //Nakhon-Nayok
//Map.setCenter(100.665, 13.750, 10); //Bangkok
//Map.setCenter(101.000, 18.950, 8); //Nan
Map.addLayer(clippedLSTc, vis,
  'Mean LST, 2019');
 //################################################# 
// Make another map and add a color-NIR composite to it.
var linkedMap = ui.Map();
linkedMap.addLayer(clippedLSTc, vis,
  'Mean LST, 2019');
linkedMap.addLayer(roi);
// Link the default Map to the other map.
var linker = ui.Map.Linker([ui.root.widgets().get(0), linkedMap]);
// Make an inset map and add it to the linked map.
var inset = ui.Map({style: {position: "bottom-right"}});
linkedMap.add(inset);
// Register a function to the linked map to update the inset map.
linkedMap.onChangeBounds(function() {
  var bounds = ee.Geometry.Rectangle(Map.getBounds());
  inset.centerObject(bounds);
  inset.layers().set(0, bounds);
});
// Create a SplitPanel which holds the linked maps side-by-side.
var splitPanel = ui.SplitPanel({
  firstPanel: linker.get(0),
  secondPanel: linker.get(1),
  orientation: 'horizontal',
  wipe: true,
  style: {stretch: 'both'}
});
// Set the SplitPanel as the only thing in root.
//ui.root.widgets().reset([splitPanel]);
linkedMap.setCenter(101.165, 14.290, 10);
//#########################################################
/*
 * Initialize the app
 */
generateChart({
  lon: initialPoint.coordinates().get(0).getInfo(),
  lat: initialPoint.coordinates().get(1).getInfo()
});
// Replace the root with a SplitPanel that contains the inspector and map.
ui.root.clear();
ui.root.insert(0, inspectorPanel);
ui.root.insert(1, mapPanel);
ui.root.insert(2, splitPanel);
//##########################################################