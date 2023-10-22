/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var lt4 = ee.ImageCollection("LANDSAT/LT04/C02/T1_L2"),
    lt5 = ee.ImageCollection("LANDSAT/LT05/C02/T1_L2"),
    le7 = ee.ImageCollection("LANDSAT/LE07/C02/T1_L2"),
    lc8 = ee.ImageCollection("LANDSAT/LC08/C02/T1_L2"),
    lc9 = ee.ImageCollection("LANDSAT/LC09/C02/T1_L2"),
    geometry = 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-113.02334164756658, 41.695461240873094],
          [-113.02334164756658, 40.6618753642544],
          [-111.90273617881658, 40.6618753642544],
          [-111.90273617881658, 41.695461240873094]]], null, false);
/***** End of imports. If edited, may not auto-convert in the playground. *****/
/**
 * Function to QA processing using the quality band of Landsat.
 * @param {ee.Image} image Landsat C2 level 2 image
 * @return {ee.Image} cloud masked Landsat image
 */
function qaMasking(image) {
  // Bit 0 - Fill
  // Bit 1 - Dilated Cloud
  // Bit 2 - Cirrus
  // Bit 3 - Cloud
  // Bit 4 - Cloud Shadow
  // Bit 5 - Snow
  // Bit 6 - Clear
  // Bit 7 - Water
  var qaBand = image.select('QA_PIXEL');
  var qaMask = qaBand.bitwiseAnd(parseInt('111111', 2)).eq(0);
  var waterMask = qaBand.bitwiseAnd(1<<7).updateMask(waterConstrain);
  var saturationMask = image.select('QA_RADSAT').eq(0);
  // Apply the scaling factors to the appropriate bands.
  var opticalBands = image.select('SR_B.').multiply(0.0000275).add(-0.2).multiply(10000);
  var thermalBands = image.select('ST_B.*').multiply(0.00341802).add(149.0);
  // Replace the original bands with the scaled ones and apply the masks.
  return image.addBands(opticalBands, null, true)
      .addBands(thermalBands, null, true)
      .updateMask(qaMask)
      .updateMask(waterMask)
      .updateMask(saturationMask)
      .float();
}
// coefficients for estimating secchi depth from satellite imagery
// derived from regression analysis
var coefficients = ee.List([4.1671138163389045, -1.4703100245796896]);
function secchiDepth(image) {
  var logGreen = image.select('green').focal_mean().log10();
  // apply regression coefficients
  var logSecchiDepth = logGreen.polynomial(coefficients);
  // inverse log transform
  var secchiDepthEst = ee.Image.constant(10).pow(logSecchiDepth);
  secchiDepthEst = secchiDepthEst.updateMask(secchiDepthEst.lt(7));
  return secchiDepthEst
    .rename('secchi_depth')
    .copyProperties(image,['system:time_start']);
}
// load historical suface water occurrence information to constain water masks
var waterOccurrence = ee.Image("JRC/GSW1_3/GlobalSurfaceWater").select("occurrence");
var waterConstrain = waterOccurrence.gt(40);
var commonNames = ['blue','green','red','nir','swir1','swir2'];
var lt4Gsl = lt4
  .filterBounds(geometry)
  .map(qaMasking)
  .select(['SR_B.*'], commonNames);
var lt5Gsl = lt5
  .filterBounds(geometry)
  .map(qaMasking)
  .select(['SR_B.*'],commonNames);
var le7Gsl = le7
  .filterBounds(geometry)
  .map(qaMasking)
  .select(['SR_B.*'], commonNames);
var lc8Gsl = lc8
  .filterBounds(geometry)
  .map(qaMasking)
  .select(['SR_B[2-7]'], commonNames);
var lc9Gsl = lc9
  .filterBounds(geometry)
  .map(qaMasking)
  .select(['SR_B[2-7]'], commonNames);
var landsatGsl = lt4Gsl
  .merge(lt5Gsl)
  .merge(le7Gsl)
  .merge(lc8Gsl)
  .merge(lc9Gsl);
// calculate secchi depth from each landsat image
var gslSecchiDepth = landsatGsl.map(secchiDepth);
var now = new Date().toISOString().split('T')[0];
var eenow = ee.Date(now);
// var years = ee.List.sequence(1984,eenow.get('year'));
// var months = ee.List.sequence(1,12);
// var monthlySecchiDepth = years.map(function(yr){
//   var mosaics = months.map(function(mon){
//     var t1 = ee.Date.fromYMD(yr, mon, 1);
//     var t2 = t1.advance(3,'month');
//     var gslImgs = gslSecchiDepth.filterDate(t1,t2);
//     return gslImgs.median().clamp(0,7).rename('secchi_depth')
//       .set('system:time_start', t1.millis(),'nImages',gslImgs.size()).float();
//   });
//   return mosaics;
// });
// monthlySecchiDepth = ee.ImageCollection(monthlySecchiDepth.flatten())
//   .filter(ee.Filter.gt('nImages',0));
var vis = {
  min: 0,
  max: 2.5,
  palette: '#fde725,#90d743,#35b779,#21908d,#31688e,#443983,#440154'
};
var visImage = gslSecchiDepth
  .filterDate('2021-01-01','2022-01-01')
  .mean();
// Map.addLayer(visImage, secchiDepthViz, 'Avg Secchi Depth');
/*
 * Chart setup
 */
// Generates a new time series chart of SST for the given coordinates.
var generateChart = function (coords) {
  // Update the lon/lat panel with values from the click event.
  lon.setValue('lon: ' + coords.lon.toFixed(4));
  lat.setValue('lat: ' + coords.lat.toFixed(4));
  // Add a dot for the point clicked on.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point, {color: '000000'}, 'clicked location');
  // Add the dot as the second layer, so it shows up on top of the composite.
  mapPanel.layers().set(1, dot);
  // Make a chart from the time series.
  var secchiChart = ui.Chart.image.series({
    imageCollection: gslSecchiDepth, 
    region: point, 
    reducer:  ee.Reducer.mean(), 
    scale: 90
  }).setChartType('ScatterChart');
  // Customize the chart.
  secchiChart.setOptions({
    title: 'Secchi Depth: time series',
    hAxis: {title: 'Date', format: 'YYYY', gridlines: {count: 13}},
    vAxis: {title: 'Secchi depth [m]'},
    pointSize: 2,
    lineWidth: 0,
    legend: {position: 'right'},
  });
  // Add the chart at a fixed position, so that new charts overwrite older ones.
  panel.widgets().set(4, secchiChart);
};
function updateMap(){
  var yr = dateSlider.getValue();
  // var startTime = ee.Date.fromYMD(date.get('year'),date.get('month'),1);
  var startTime = ee.Date.fromYMD(yr,1,1);
  var endTime = startTime.advance(1,'year');
  var visImg = gslSecchiDepth
    .filterDate(startTime, endTime)
    .mean();
  var visImage = visImg.clip(geometry).visualize(vis);
  var visLayer = ui.Map.Layer(visImage).setName('Secchi Depth Composite');
  mapPanel.layers().set(0, visLayer);
}
// Set up the overall structure of the app, with a control panel to the left
// of a full-screen map.
ui.root.clear();
var panel = ui.Panel({layout: ui.Panel.Layout.flow('vertical',true),
  style: {width: '500px', padding: '8px',margin: '20px 0 0 0'}});
var map = ui.Map();
ui.root.add(panel).add(map);
var title = ui.Label({
        value: 'Great Salt Lake Water Quality Viewer',
        style: {fontWeight: 'bold', fontSize: '24px', margin: '10px 5px'}
      });
var info_text = 'This app allows users to explore ' +
  'the water quality of the Great Salt Lake (GSL) ' +
  'over a 40 year period. The parameter shown is  ' +
  'Secchi Depth, a measure of how far into the water ' +
  'light penetrates and scatters. The more particulates ' +
  'in the water, the more light scattering and you can\'t ' +
  'see as far down. Therefore, higher values mean ' +
  'better quality. Secchi depth correlates well with ' +
  'water quality measures such as  turbidity and ' +
  'chlorophyll concentrations. While this app displays ' +
  'only Secchi depth as a water quality parameter, ' +
  'additonal water quality parameters can be included.';
var info = ui.Label({
  value: info_text,
  style:{margin: '10px 5px', width:'300px'}
});
var instruction_text = 'To use: click on a point within the map to display ' +
  'a time series of secchi depth values at the location.' +
  'To create a composite of average yearly secchi depth ' +
  'estimated from Landsat, select a time by sliding to ' +
  'desired year. The map will automatically update with ' +
  'the yearly composite.';
var instructions = ui.Label({
  value: instruction_text,
  style:{margin: '10px 5px', width:'300px'}
});
var infoPanel = ui.Panel([title, info, instructions]);
// Create panels to hold lon/lat values.
var lon = ui.Label();
var lat = ui.Label();
// create panel to handle date info and update map
var startTitle = ui.Label('Select a year to display:',{margin: '8px 0 -3px 8px',fontSize: '12px', color: 'gray'});
// var startDate = ui.Textbox('YYYY-MM-DD', '1999-06-01');
// var endTitle = ui.Label('End date',{margin: '8px 0 -3px 8px',fontSize: '12px', color: 'gray'});
// var endDate =  ui.Textbox('YYYY-MM-DD', '2000-01-01');
// var updateButton = ui.Button('Update map', updateMap);
var dateSlider = ui.Slider({
  min: 1984, 
  max: eenow.get('year').getInfo(),
  value: 2021,
  step: 1,
  onChange: updateMap,
  style: {stretch: 'horizontal'}
});
// 
// var datePanel = ui.Panel([dateSlider,startTitle, startDate, endTitle, endDate, updateButton]);
var datePanel = ui.Panel([startTitle, dateSlider]);
// Add the components in order (chart and legend are placeholders).
panel.add(infoPanel);
panel.add(ui.Label('[Legend]'));
panel.add(datePanel);
panel.add(ui.Panel([ui.Label('Displaying chart for'),lon, lat], ui.Panel.Layout.flow('horizontal')));
panel.add(ui.Label('[Chart]'));
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
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '20px'},
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
  value: 'Map Legend: average secchi depth [m]',
  style: {fontSize: '12px', color: 'gray'}
});
var legendPanel = ui.Panel([legendTitle, colorBar, legendLabels]);
panel.widgets().set(1, legendPanel);
/*
 * Map setup
 */
// Create the main map and set the SST layer.
var mapPanel = ui.Map();
var layers = mapPanel.layers();
// Register a callback on the default map to be invoked when the map is clicked.
mapPanel.onClick(generateChart);
// Configure the map.
mapPanel.style().set('cursor', 'crosshair');
// Initialize with a test point.
var initialPoint = ee.Geometry.Point(-112.4797, 41.1595);
mapPanel.centerObject(initialPoint, 10);
var secchiComposite = visImage.clip(geometry).visualize(vis);
var compositeLayer = ui.Map.Layer(secchiComposite).setName('Secchi Depth Composite');
layers.add(compositeLayer, '2017 Composite');
/*
 * Initialize the app
 */
// Replace the root with a SplitPanel that contains the inspector and map.
ui.root.clear();
ui.root.add(ui.SplitPanel(panel, mapPanel));
generateChart({
  lon: initialPoint.coordinates().get(0).getInfo(),
  lat: initialPoint.coordinates().get(1).getInfo()
});