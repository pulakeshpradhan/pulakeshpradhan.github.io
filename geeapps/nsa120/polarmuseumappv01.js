/**
 * SPRI Digital Interactive for Ice Sheet Lakes
 * 
 * App by Neil Arnold
 * Scott Polar Resaerch Institute
 *
 * Script Template from GEE Tutorial by Tyler Erickson (tylere@google.com)
 * and Justin Braaten (braaten@google.com)
 *
/*******************************************************************************
 * Model *
 *
 * Defines information about the data used in the app.
 *
 * Guidelines: Use this section to import assets and define information that
 * are used to parameterize data-dependant widgets and control style and
 * behavior on UI interactions.
 ******************************************************************************/
// Define a JSON object for storing the data model.
var m = {};
// ** Modules **
// Cloud masking
m.cloudMask = require('users/nsa120/CamGeog1A:cloudMaskLS1A');
// Band ratios
m.bandRat = require('users/nsa120/CamGeog1A:bandRatios1A');
// Lake stats
m.lakeStats = require('users/nsa120/CamGeog1A:addLakeStats1A');
// Greenland geometry
m.GrISPoly = /* color: #ffc5b5 */ee.Geometry.Polygon(
        [[[-52.86018198743761, 82.02356578261364],
          [-57.25471323743761, 81.72545658709431],
          [-60.77033823743761, 81.06840454465085],
          [-62.00080698743761, 80.62099347175662],
          [-64.98908823743761, 79.93867257557895],
          [-66.04377573743761, 79.0414344980247],
          [-69.20783823743761, 78.31705207543925],
          [-68.85627573743761, 77.69622995272317],
          [-65.86799448743761, 77.46944903536784],
          [-66.92268198743761, 76.84440465893486],
          [-65.34065073743761, 76.60219817846851],
          [-61.12190073743761, 76.43830054934502],
          [-58.30940073743761, 75.93471695766826],
          [-56.20002573743761, 75.09968672007922],
          [-54.44221323743761, 74.16838655401415],
          [-52.50861948743761, 72.66428620033675],
          [-50.22346323743761, 71.30584610464459],
          [-48.99299448743761, 69.78439969170202],
          [-48.46565073743761, 68.07919047857118],
          [-48.64143198743761, 66.4494058340922],
          [-48.99299448743761, 64.32770163865648],
          [-48.11408823743761, 62.193368354324896],
          [-46.18049448743761, 61.530210346268674],
          [-44.42268198743761, 61.94636497098074],
          [-43.36799448743761, 63.711704853594135],
          [-40.90705698743761, 65.51949559807322],
          [-37.21565073743761, 66.79812072387446],
          [-34.05158823743761, 68.07919047857118],
          [-30.535963237437613, 69.16816462274397],
          [-30.184400737437613, 70.20533315550074],
          [-29.832838237437613, 71.02208684336031],
          [-29.129713237437613, 72.71658710015714],
          [-28.075025737437613, 74.02388263879551],
          [-25.262525737437613, 74.73376637396335],
          [-23.328931987437613, 75.67609790573616],
          [-23.328931987437613, 76.4794584955772],
          [-22.977369487437613, 77.23855620551055],
          [-22.625806987437613, 77.9557036712965],
          [-22.098463237437613, 78.66770568240521],
          [-23.328931987437613, 79.27289615874966],
          [-26.141431987437613, 80.09106547292664],
          [-27.547681987437613, 80.67811258628073],
          [-28.250806987437613, 81.06840454465085],
          [-31.590650737437613, 81.59800260951562],
          [-34.22736948743761, 81.67470701441167],
          [-37.03986948743761, 81.67470701441167],
          [-39.14924448743761, 81.82603589320117],
          [-43.01643198743761, 81.75071605186494],
          [-44.07111948743761, 81.28410607986733],
          [-46.53205698743761, 81.1769092368005],
          [-48.81721323743761, 81.23067017344087],
          [-51.80549448743761, 81.36365470254358]]]
          );
// Load Land and Ice Masks and DEM (just in case at this stage)
m.iceMask = ee.Image('OSU/GIMP/2000_ICE_OCEAN_MASK').select(['ice_mask']);
m.oceanMask = ee.Image('OSU/GIMP/2000_ICE_OCEAN_MASK').select(['ocean_mask']);
m.DEM = ee.Image('UMN/PGC/ArcticDEM/V2/5m').select('elevation');
// Set up date ranges
m.startDate = ee.Date.fromYMD(2020,6,1);
m.endDate = ee.Date.fromYMD(2020,9,30);
// Landsat data for 2020
m.L8Coll = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA')
  // location filter
  .filterBounds(m.GrISPoly)
  // Year
  .filterDate(m.startDate, m.endDate)
  // Summer months
  .filter(ee.Filter.calendarRange(6,9,'month'))
  // Filter cloudy scenes.
  .filter(ee.Filter.lt('CLOUD_COVER', 0.5))
  // Mask cloudy pixels
  .map(m.cloudMask.maskClouds)
  // Calculate NDWI
  .map(m.bandRat.addNDWI8)
  // Calculate blue/red ratio
  .map(m.bandRat.addBR8)
  // Bands needed... Kludge for L8 bands.
  .select(['B4', 'B3', 'B2', 'ndwi', 'br'],['B3', 'B2', 'B1', 'ndwi', 'br'])
  ;
// Sort by date
m.L8Coll.sorted = ee.ImageCollection(m.L8Coll.sort('DATE_ACQUIRED'));
print ('Sorted Image List', m.L8Coll.sorted);
m.listOfImages = m.L8Coll.sorted.toList(m.L8Coll.sorted.size());
// Get the example image
m.egIm1 = ee.Image(m.listOfImages.get(143)); // Nice image from NW Greenland
m.egIm1.Geom = m.egIm1.geometry();
m.egIm1.Centre = m.egIm1.Geom.centroid();
m.egIm1.Coords = m.egIm1.Centre.coordinates();
// Find ice mask etc
m.localIceMask = m.iceMask.clip(m.egIm1.Geom);
m.iceImage = m.egIm1.updateMask(m.localIceMask);
m.myDEM = m.DEM.clip(m.egIm1.Geom);
m.iceDEM = m.myDEM.updateMask(m.localIceMask);
m.lowMask = m.myDEM.gte(100); // Clip low elevation areas
m.iceDEM = m.myDEM.updateMask(m.lowMask);
m.iceImage = m.iceImage.updateMask(m.lowMask);
//print(m.egIm1.Geom);
//print(m.egIm1.Centre);
//print(m.egIm1.Coords);
//m.egIm2 = ee.Image(m.listOfImages20.get(86));
//m.egIm2.Geom = m.egIm2.geometry();
//m.egIm3 = ee.Image(m.listOfImages21.get(151));
//m.egIm3.Geom = m.egIm3.geometry();
//m.egIm4 = ee.Image(m.listOfImages21.get(246));
//m.egIm4.Geom = m.egIm4.geometry();
// Build these into a collection (not needed if one image)
//m.egCollection = ee.ImageCollection.fromImages(
//  [m.egIm1]); //, m.egIm2, m.egIm3, m.egIm4]);
//print(m.egCollection);
m.chosenImage = [];
/*******************************************************************************
 * Components *
 *
 * Define the widgets that will compose your app.
 *
 * Guidelines:
 * 1. Except for static text and constraints, accept default values;
 *    initialize others in the initialization section.
 * 2. Limit composition of widgets to those belonging to an inseparable unit
 *    (i.e. a group of widgets that would make no sense out of order).
 ******************************************************************************/
// Define a JSON object for storing UI components.
var c = {};
// Control panel for user input.
c.controlPanel = ui.Panel();
// Panel widgets to be used as horizontal dividers.
c.dividers = {};
c.dividers.divider1 = ui.Panel();
c.dividers.divider2 = ui.Panel();
c.dividers.divider3 = ui.Panel();
c.dividers.divider4 = ui.Panel();
// Main interactive maps.
c.leftMap = ui.Map();
c.rightMap = ui.Map();
c.mainMap = ui.Map.Linker([c.leftMap, c.rightMap]);
// Make an inset map.
c.inset = ui.Map({style: {position: "bottom-right"}});
// SplitPanel which holds the linked maps side-by-side.
c.splitPanel = ui.SplitPanel({
  firstPanel: c.leftMap, //c.mainMap.get(0),
  secondPanel: c.rightMap, //c.mainMap.get(1),
  orientation: 'horizontal',
  wipe: true,
  style: {width: '80%', stretch: 'both'}
});
// App info widget group.
c.info = {};
c.info.titleLabel = ui.Label(
  'Lakes on the Greenland Ice Sheet');
c.info.aboutLabel = ui.Label(
  'This app lets you calculate the area and volume of meltwater lakes ' +
  'formed in summer on the Greenland Ice Sheet. The app uses Landsat 8 ' +
  'satellite imagery and the different rates of absorption of different ' +
  'colours of light to detect water.');
c.info.startLabel = ui.Label(
  'The image to the right was captured in July 2020, and shows a mountainous area '+
  'on the coast of NW Greenland (shown in blue on the inset map). '+
  'Snow at high elevations (towards the right of the image) appears as almost white. '+
  'Lower elevations on the ice sheet appear as light grey due to snow melt or debris.'+
  'Bare ground is dark brown, and open ocean water almost black. You can clearly '+
  'see a large number of lakes as blue patches towards the edge of the ice sheet.');
c.info.panel = ui.Panel([
  c.info.titleLabel, c.info.aboutLabel,
  c.info.startLabel
]);
// App instructions widget group.
c.instruct = {};
c.instruct.label1 = ui.Label(
  'Use the map slider in the image window to check the agreement between '+
  'the identified lakes and what you think visually are the lakes. '+
  'Areas identified as lakes will appear as red spots over the image. '+
  'At first, this shows the results of the default Blue:Red ratio of 2.5.');
  c.instruct.label2 = ui.Label(
  'Use the slider (below) to adjust the Blue:Red ratio to '+
  'identify lakes. Aim to minimise false positives (e.g. shadows cast by mountains) '+
  'whilst identifying as many lakes as possible.');
  c.instruct.label3 = ui.Label(
  'You can click and drag on the image to examine different areas, and use the '+
  'zoom control ( + / - buttons in the top left corner) to zoom in and out.');
  c.instruct.label4 = ui.Label(
  'When you are happy with the agreement click the Calculate button '+
  'to show the total area and volume of the lakes you have identified.');
c.instruct.panel = ui.Panel([
  c.instruct.label1, c.instruct.label2, c.instruct.label3, c.instruct.label4,
]);
// Blue/red ratio slider.
c.selectBR = {};
c.selectBR.label = ui.Label('Choose the blue/red ratio');
c.selectBR.slider = ui.Slider({
  min: 0.5, // Might need to add these dynamically?
  max: 4.0, // Might need to add these dynamically?
  step: 0.1 // Might need to add these dynamically?
});
c.selectBR.panel = ui.Panel([c.selectBR.label, c.selectBR.slider]);
// Calculate button.
c.calc = {};
c.calc.label = ('Calculate');
c.calc.button = ui.Button();
c.calc.panel = ui.Panel([c.calc.button]);
// Panel for text results
c.lakeStats = [];
c.lakeStats.titleLabel = ui.Label('Results');
c.lakeStats.initLabel = ui.Label('You identified:');
c.lakeStats.panel = ui.Panel([c.lakeStats.initLabel, c.lakeStats.initLabel]);
// Panel for displaying a chart.
c.chart = {};
c.chart.shownButton = ui.Button('Hide chart');
c.chart.container = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal')});  // will hold the dynamically generated chart. 
c.chart.chartPanel = ui.Panel([c.chart.shownButton, c.chart.container]);
/*******************************************************************************
 * Composition *
 *
 * Compose the app i.e. add child widgets and widget groups to
 * first-level parent components like control panels and maps.
 *
 * Guidelines: There is a gradient between components and composition. There
 * are no hard guidelines here; use this section to help conceptually break up
 * the composition of complicated apps with many widgets and widget groups.
 ******************************************************************************/
// Add individual controls to the main control panel
c.controlPanel.add(c.info.panel);
c.controlPanel.add(c.dividers.divider1);
c.controlPanel.add(c.instruct.panel);
c.controlPanel.add(c.dividers.divider2);
c.controlPanel.add(c.selectBR.panel);
c.controlPanel.add(c.calc.panel);
// Add panels on the maps
c.leftMap.add(c.chart.chartPanel);
c.rightMap.add(c.inset);
// Add overall panels (controls and map)
ui.root.clear();
ui.root.add(c.controlPanel);
ui.root.add(c.splitPanel);
/*******************************************************************************
 * Styling *
 *
 * Define and set widget style properties.
 *
 * Guidelines:
 * 1. At the top, define styles for widget "classes" i.e. styles that might be
 *    applied to several widgets, like text styles or margin styles.
 * 2. Set "inline" style properties for single-use styles.
 * 3. You can add multiple styles to widgets, add "inline" style followed by
 *    "class" styles. If multiple styles need to be set on the same widget, do
 *    it consecutively to maintain order.
 ******************************************************************************/
// Define a JSON object for defining CSS-like class style properties.
var s = {};
// Define styles
s.opacityWhiteMed = {
  backgroundColor: 'rgba(255, 255, 255, 0.5)'
};
s.opacityWhiteNone = {
  backgroundColor: 'rgba(255, 255, 255, 0)'
};
s.normalText = {
  fontSize: '13px',
  color: '505050'
};
s.widgetTitle = {
  fontSize: '15px',
  fontWeight: 'bold',
  margin: '8px 8px 0px 8px',
  color: '383838'
};
s.stretchHorizontal = {
  stretch: 'horizontal'
};
s.noTopMargin = {
  margin: '0px 8px 8px 8px'
};
s.smallBottomMargin = {
  margin: '8px 8px 4px 8px'
};
s.bigTopMargin = {
  margin: '24px 8px 8px 8px'
};
s.divider = {
  backgroundColor: 'F0F0F0',
  height: '4px',
  margin: '5px 0px'
};
// Set widget styles.
c.info.titleLabel.style().set({
  fontSize: '24px',
  fontWeight: 'bold',
  color: '183863'
});
c.info.titleLabel.style().set(s.bigTopMargin);
c.info.aboutLabel.style().set(s.normalText);
c.info.startLabel.style().set(s.normalText);
c.instruct.label1.style().set(s.normalText);
c.instruct.label2.style().set(s.normalText);
c.instruct.label3.style().set(s.normalText);
c.instruct.label4.style().set(s.normalText);
c.selectBR.slider.style().set(s.stretchHorizontal);
c.selectBR.label.style().set(s.widgetTitle);
c.calc.button.style().set(s.stretchHorizontal);
c.calc.button.setLabel(c.calc.label);
c.calc.button.style().set(s.widgetTitle);
c.lakeStats.titleLabel.style().set(s.widgetTitle);
c.lakeStats.initLabel.style().set(s.normalText);
c.controlPanel.style().set({
  width: '20%',
  padding: '0px'
});
// Set map styles
// Cursors and type
c.leftMap.style().set({
  cursor: 'crosshair'
});
c.rightMap.style().set({
  cursor: 'crosshair'
});
c.inset.style().set({
  cursor: 'crosshair'
});
c.inset.setOptions('HYBRID');
// Turn off most map controls
c.leftMap.setControlVisibility(false);
c.leftMap.setControlVisibility({
  scaleControl: true, 
  zoomControl: true, 
  layerList: true
});
c.rightMap.setControlVisibility(false);
c.rightMap.setControlVisibility({
  scaleControl: true, 
  zoomControl: true, 
  layerList: true
});
c.inset.setControlVisibility(false);
// Chart (initially hidden)
c.chart.chartPanel.style().set({
  position: 'bottom-left',
  shown: false
});
c.chart.chartPanel.style().set(s.opacityWhiteMed);
c.chart.shownButton.style().set({
  margin: '0px 0px',
});
// Loop through setting divider style.
Object.keys(c.dividers).forEach(function(key) {
  c.dividers[key].style().set(s.divider);
});
// Image visualisation
s.vizParams = {
  bands: ['B3', 'B2', 'B1'],
  min: 0,
  max: 0.1,
  gamma: [1, 1.1, 1.2]
};
s.zoomScale = 8;
/*******************************************************************************
 * Behaviors *
 *
 * Define app behavior on UI activity.
 *
 * Guidelines:
 * 1. At the top, define helper functions and functions that will be used as
 *    callbacks for multiple events.
 * 2. For single-use callbacks, define them just prior to assignment. If
 *    multiple callbacks are required for a widget, add them consecutively to
 *    maintain order; single-use followed by multi-use.
 * 3. As much as possible, include callbacks that update URL parameters.
 ******************************************************************************/
// Function to tie the linked map to update the inset map. (currently not used - inset fixed in space)
//c.rightMap.onChangeBounds(function() {
  //c.rightMap.bounds = ee.Geometry.Rectangle(c.rightMap.getBounds());
  //c.inset.centerObject(m.GrISPoly,2);
  //c.inset.layers().set(0, c.mapBounds);
  //c.inset.addLayer(c.rightMap.bounds, {color: '999999'}, '', true, 0.6);
  //c.inset.addLayer(m.egIm1.Geom, {color: '0588F9'}, '', true, 0.3);
//});
// Function to identify lakes
function chooseBR() {
  var BR = c.selectBR.slider.getValue();
  // Run lake finder
  var depthImage = m.lakeStats.addLakeDepth(m.iceImage,BR,s.zoomScale);
  var isLake = depthImage.select('isLake');
  // Display results
  var depthVizParam = {bands:'lakeDepth', min:0.0, max:3, palette: ['87CEEB', '000070']};
  // Display lake mask layer
  var lakeMaskLayer = ui.Map.Layer(isLake.updateMask(isLake),{palette: ['FF0000']}, 'Lake Mask');
  c.rightMap.layers().set(1,lakeMaskLayer);
  //Other layers if needed?
  //var iceMaskLayer = ui.Map.Layer(localIceMask, {min:0.0, max:1, palette:"000000,FFFFFF"}, 'Local Ice Mask');
  //Map.layers().set(2,iceMaskLayer);
  //var elevationLayer = ui.Map.Layer(myDEM, {bands: ['elevation'], min: 0, max: 1500}, 'Elevation');
  //Map.layers().set(3,elevationLayer);
  //var blueLayer = ui.Map.Layer(m.egIm1, {bands: ['B1'], min: 0, max: 1}, 'Blue Reflectance');
  //c.map.layers().set(4,blueLayer);
  //var redLayer = ui.Map.Layer(m.egIm1, {bands: ['B3'], min: 0, max: 1}, 'Red Reflectance');
  //c.map.layers().set(5,redLayer);
  //var rgbLayer = ui.Map.Layer(myImage, {bands: ['B3', 'B2', 'B1'], min: 0, max: 1}, 'RGB Image');
  //Map.layers().set(6,rgbLayer);
  //var lakeDepthLayer = ui.Map.Layer(depthImage, depthVizParam, 'Lake Depth');
  //Map.layers().set(6,lakeDepthLayer);
}
// Function to calculate lake stats
function getLakeStats() {
  var BR = c.selectBR.slider.getValue();
  // Run lake finder
  var depthImage = m.lakeStats.addLakeDepth(m.iceImage,BR,s.zoomScale);
  var isLake = depthImage.select('isLake');
  var lakePixArea = ee.Image.pixelArea().updateMask(isLake);
  var totLakeArea = lakePixArea.reduceRegion({
    reducer: ee.Reducer.sum(),
    geometry: m.egIm1.Geom,
    scale: 120,
    maxPixels: 1e9
  });
  //print(totLakeArea);
  //var meanLakeDepth = depthImage.select('lakeDepth').reduceRegion({
  //  reducer: ee.Reducer.mean(),
  //  geometry: m.egIm1.Geom,
  //  scale: 30,
  //  maxPixels: 1e9
  //});
  var totLakeVol = depthImage.select('lakeDepth').multiply(ee.Image.pixelArea()).reduceRegion({
    reducer: ee.Reducer.sum(),
    geometry: m.egIm1.Geom,
    scale: 120,
    maxPixels: 1e9
  });
  //print(totLakeVol);
  //var lakeElev = myDEM.updateMask(isLake);
  //var meanLakeElev = lakeElev.reduceRegion({
  //  reducer: ee.Reducer.mean(),
  //  geometry: m.egIm1.Geom,
  //  scale: 30,
  //  maxPixels: 1e9
  //});
  // Put them all together
  var myImageStats = ee.Dictionary({
    Image_Date: m.egIm1.get('DATE_ACQUIRED'),
    Image_Id: m.egIm1.get('LANDSAT_SCENE_ID'),
    //Image_Ice_Area: totIceArea.get('area'),
    //Image_Latitude:  meanLonLat.get('latitude'),
    //Image_Longitude:  meanLonLat.get('longitude'),
    //Image_Mean_Ice_Elev:  meanElev.get('elevation'),
    Image_BR_Thresh: BR,
    //Mean_Lake_Elev: meanLakeElev.get('elevation'),
    //Mean_Lake_Depth: meanLakeDepth.get('lakeDepth'),
    Total_Lake_Area: ee.Number(totLakeArea.get('area')).divide(1000).round().multiply(1000),
    Total_Lake_Vol: ee.Number(totLakeVol.get('lakeDepth')).divide(1000).round().multiply(1000)
  });
  print ('Image Statistics', myImageStats);
  // Create a feature for charting
  var lakeStats = ee.Feature(m.egIm1.Geom);
  var lakeStatsArea = lakeStats.set('Area', 
    ee.Number(myImageStats.get('Total_Lake_Area')).divide(1000000));
  var lakeStatsVol = lakeStats.set('Volume', 
    ee.Number(myImageStats.get('Total_Lake_Vol')).divide(1000000));
  print ('Lake Stats', lakeStatsArea);
  print ('Lake Stats', lakeStatsVol);
  // Draw the chart
  // Show the chart panel if this is the first time a point is clicked.
  if (!c.chart.chartPanel.style().get('shown')) {
    c.chart.chartPanel.style().set('shown', true);
  }
  // Show chart if hidden; assuming user wants to see updates to chart.
  if (c.chart.shownButton.getLabel() == 'Show chart') {
    c.chart.container.style().set({shown: true});
    c.chart.shownButton.setLabel('Hide chart');
  }
  var styleChartAxis = {
    italic: false,
    bold: true,
    fontSize: 15
  };
  var styleChartArea = {
    width: '300px',
    height: '300px',
    margin: '10px',
    padding: '10px'
  };
  //Construct Bar Charts
  var areaChart = ui.Chart.feature.byProperty(lakeStatsArea, ['Area']);
  //Set up title and labels for chart
  areaChart.setOptions({
    title: 'Total Lake Area',
    titleTextStyle: styleChartAxis,
    vAxis: {
      title: 'Area, million metres\u00B2',
      viewWindow: {min: 0, max: 100},
      titleTextStyle: styleChartAxis
    },
    legend: {position: 'none'}//,
    //hAxis: {
    //  title: 'Area',
    //  logScale: false
    //}
  });
  areaChart.style().set(styleChartArea);
  var volChart = ui.Chart.feature.byProperty(lakeStatsVol, ['Volume']);
  //Set up title and labels for chart
  volChart.setOptions({
    title: 'Total Lake Volume',
    titleTextStyle: styleChartAxis,
    vAxis: {
      title: 'Volume, million metres\u00B3',
      viewWindow: {min: 0, max: 100},
      titleTextStyle: styleChartAxis
    },
    legend: {position: 'none'},
    //hAxis: {
    //  title: 'Volume',
    //  logScale: false
    //}
  });
  volChart.style().set(styleChartArea);
  // This actually adds the chart
  c.chart.container.clear(); // Get rid of any existing charts
  c.chart.container.add(areaChart);
  c.chart.container.add(volChart);
}
// Hide the chart if clicked
function showHideChart() {
  var shown = true;
  var label = 'Hide chart';
  if (c.chart.shownButton.getLabel() == 'Hide chart') {
    shown = false;
    label = 'Show chart';
  }
  c.chart.container.style().set({shown: shown});
  c.chart.shownButton.setLabel(label);
}
// Listen for interactions
c.selectBR.slider.onChange(chooseBR);
c.calc.button.onClick(getLakeStats);
c.chart.shownButton.onClick(showHideChart);
/*******************************************************************************
 * Initialize *
 *
 * Initialize the app state on load.
 *
 * Guidelines:
 * 1. At the top, define any helper functions.
 * 2. As much as possible, use URL params to initial the state of the app.
 ******************************************************************************/
// Centre map on image
c.leftMap.centerObject(m.egIm1.Geom,s.zoomScale);
// Display the example image in both maps
m.egIm1.rgbLeft = ui.Map.Layer(m.egIm1, 
  {bands: ['B3', 'B2', 'B1'],
  min: [0, 0, 0],
  max: [0.95, 0.9, 1],
  gamma: [1.5, 1.5, 1.5]}, 
  'Satellite Image');
c.leftMap.layers().set(0,m.egIm1.rgbLeft);
m.egIm1.rgbRight = ui.Map.Layer(m.egIm1, 
  {bands: ['B3', 'B2', 'B1'],
  min: [0, 0, 0],
  max: [0.95, 0.9, 1],
  gamma: [1.5, 1.5, 1.5]}, 
  'Satellite Image');
c.rightMap.layers().set(0,m.egIm1.rgbRight);
// Display the inset map
c.inset.centerObject(m.GrISPoly,2);
c.inset.addLayer(m.egIm1.Geom, {color: '0588F9'}, '', true, 0.4);
// Set initial BR ratio
c.selectBR.slider.setValue(2.5, false);
// Add initial lake mask from default BR
chooseBR();