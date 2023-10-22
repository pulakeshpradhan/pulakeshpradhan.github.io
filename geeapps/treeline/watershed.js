/*
 * Setups.
 */
// Load the LandTrendr library.
var ltgee = require('users/emaprlab/public:Modules/LandTrendr.js');  
// Working directory.
var wd = 'users/treeline/Dirk/Western_US/Annual_NDVI/L5/ATEI_Components/';
/*
 * Datasets.
 */
// Robust linear regression trend from 1984 to 2011.
var robust = ee.FeatureCollection(wd + "USGS_SubWatersheds/" +
  "USGS_SubWatershedsswATEPgtPoint5_avgElv_1984to2011");
// Create an empty image into which to paint the features, cast to 64-bit double.
var empty = ee.Image().double();
// Temporal trend of the aggregated ATE elevation at each sub-watershed.
var robustTrend = empty.paint(robust, "AvgTrend"); 
// ATEP based on a multi-nomial Logistic regression model of standardized ATE components.
var annualATEP = ee.Image(wd + "1984to2011/Multinomial_ATEP_1984to2011"); 
// Un-smoothed annual maximum NDVI.
// var annualNDVI = ee.Image("users/treeline/Dirk/Western_US/Annual_NDVI/L5/anlMaxNDVI_L5");
//// Greatest changes.
// Pixel level disturbance.
var lossImg = ee.Image(wd + "1984to2011/Greatest" + 
  "Loss_NDVI_June20toSep20_1984to2011"); 
/*
 * Map layer configuration.
 */
// Set a uniform scale for map.
var mapScale = 12;
// Set the map visualization parameters.
var visTrend = {min: 1, max: -1, 
      palette: ['#a50026','#d73027','#f46d43','#fdae61',
        '#fee090','#ffffbf','#e0f3f8','#abd9e9',
        '#74add1','#4575b4','#313695'], // 11-class RdYlBu.
      opacity: 1}; 
var visATE = {palette: 'ff0000'};
var visLoss = {min: 0, max: 1e5, palette: ['#fff7ec','#fee8c8','#fdd49e','#fdbb84','#fc8d59','#ef6548','#d7301f','#b30000','#7f0000'], opacity: 1}; // 9-class OrRd.
var sumPalette = ['#fff7f3','#fde0dd','#fcc5c0','#fa9fb5',
  '#f768a1','#dd3497','#ae017e','#7a0177','#49006a']; // 9-class RdPu
// ['#ffffcc','#ffeda0','#fed976','#feb24c','#fd8d3c',
//     '#fc4e2a','#e31a1c','#bd0026','#800026']; // 9-class YlOrRd.
var sumVizParms = {
    min: 0, 
    max: 5e6, 
    palette: sumPalette, 
    opacity: 1
  };
var ndvi_palette =
    'FFFFFF, CE7E45, DF923D, F1B555, FCD163, 99B718, 74A901, 66A000, 529400,' +
    '3E8601, 207401, 056201, 004C00, 023B01, 012E01, 011D01, 011301';
var visNDVI = {min: 0, max: 1, palette: ndvi_palette, opacity: 1};
// Set the visibility of layers.
var showNDVI = false;
var showRob = true;
var showLoss = true;
var showLossSum = true;
// var showProcessing = false;
var yodPalette = ['#9400D3', '#4B0082', '#0000FF', '#00FF00', '#FFFF00', '#FF7F00', '#FF0000'];
var magPalette = ['#9400D3', '#4B0082', '#0000FF', '#00FF00', '#FFFF00', '#FF7F00', '#FF0000'];
var yodVizParms = {
  min: 1984,
  max: 2011,
  palette: yodPalette
};
var magVizParms = {
  min: 200,
  max: 700,
  palette: magPalette
};
// Set a ATEP threshold for detecting annual ATE.
var thresATEP = 0.5;
// Set default layers.
var setYear = 1984;
var ateName = "ATEP_";
var ndviName = "NDVI_";
var ateLayerName = "Estimated Annual ATE for ";
var ndviLayerName = "Annual Maximum NDVI for ";
var lossSumLayerName = "Sum of the Greatest Detected Disturbance";
var ateImage = annualATEP.select(ateName + setYear);
// var ndviImage = annualNDVI.select(ndviName + setYear);
var selectedATE = ateImage.updateMask(ateImage.gt(thresATEP)).visualize(visATE);
// var selectedNDVI = ndviImage.visualize(visNDVI);
var ateLayer = ui.Map.Layer(selectedATE).setName(ateLayerName + setYear);
// var ndviLayer = ui.Map.Layer(selectedNDVI).setName(ndviLayerName + setYear);
var lossSum = empty.paint(robust, "LossSum"); 
var lossSumLayer = ui.Map.Layer(lossSum.visualize(sumVizParms)).setName(lossSumLayerName);
var robustTrendLayer = ui.Map.Layer(robustTrend.visualize(visTrend)).setName('Robust Linear Trend of ATE Elevation');
var lossMagLayer = ui.Map.Layer(lossImg.select(['mag']), magVizParms, 'Magnitude of Greatest Disturbance');
var lossYodLayer = ui.Map.Layer(lossImg.select(['yod']), yodVizParms, 'Year of Greatest Disturbance');
/*
 * Define UI components.
 */
// Buffer panel.
var bufferTitleLabel = ui.Label('Define a Square Buffer Around the Clicked Point', {fontWeight: 'bold'});
var bufferLabel = ui.Label('Buffer:');
var bufferBox = ui.Textbox({value: '0'});
bufferBox.style().set('stretch', 'horizontal');
var bufferUnitLabel = ui.Label('(m)');
var bufferPanel = ui.Panel(
  [
    bufferTitleLabel,
    ui.Panel(
      [bufferLabel, bufferBox, bufferUnitLabel],
      ui.Panel.Layout.Flow('horizontal'), 
      {stretch: 'horizontal'}
    )
  ]
);
// submit panel.
var submitButton = ui.Button({
  label: 'Submit', 
  style: {stretch: 'horizontal'}
});
//// Set up primary panels.
// Create a panel to hold title, intro text, chart, and legend components.
var inspectorPanel = ui.Panel({style: {width: '30%'}});
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'Spatio-temporal Dynamics of Alpine Treeline Ecotones (ATEs)',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
  ui.Label('1) Sub-watershed level: Click a point or enter and submit coordinates ' +
    'to see the time series of annual average estimated ATE elevation in the corresponding sub-watershed'),
  ui.Label('2) Pixel level: Check the "Inspector" box for greatest disturbance detected by the LandTrendr algorithm at the corresponding pixel.'),
  ui.Label('* Please wait patiently for map and point information to load.'),
  ui.Label('__________________________________________________________________________'),
]);
inspectorPanel.add(intro);
// Map panel.
var mapPanel = ui.Map();
mapPanel.style().set({cursor: 'crosshair'});
mapPanel.setOptions('HYBRID');
// var processingLabel = ui.Label('Processing, please wait...', {shown: showProcessing, position: 'top-center'});
// mapPanel.add(processingLabel);
// Create the main map.
var layers = mapPanel.layers();
//// Set up primary panels.
// Coordinate panel.
var coordSectionLabel = ui.Label('Define Pixel Coordinates (optional)', {fontWeight: 'bold'});
var initLat = 45.1552;
var initLon = -117.3706;
var latLabel = ui.Label('Latitude:');
var latBox = ui.Textbox({value: initLat});
latBox.style().set('stretch', 'horizontal');
var lonLabel = ui.Label('Longitude:');
var lonBox = ui.Textbox({value: initLon});
lonBox.style().set('stretch', 'horizontal');
var latLonPanel = ui.Panel(
  [
    coordSectionLabel,
    ui.Panel([lonLabel, lonBox], ui.Panel.Layout.Flow('horizontal')),
    ui.Panel([latLabel, latBox], ui.Panel.Layout.Flow('horizontal')),
    bufferPanel,
    submitButton
  ],
  null,
  {stretch: 'horizontal'}
);
inspectorPanel.add(latLonPanel);
// Create an intro panel for sub-watershed level information.
var subWatershedIntro = ui.Panel([
  ui.Label({
    value: '-- Sub-watershed Level Information --',
    style: {fontSize: '18px', fontWeight: 'bold'}
  })
]);
inspectorPanel.add(subWatershedIntro);
// Add placeholders for the chart and legends.
inspectorPanel.add(ui.Label('[ATE Elevation Chart]'));
/*
inspectorPanel.add(ui.Label('[Slider]'));
inspectorPanel.add(ui.Label('[Legend]'));
*/
/*
 * Slider setup.
 */
// A helper function to show the image for ATE of a given year on the default map.
var showLayer = function(year) {
  ateImage = annualATEP.select(ateName + year);
  // ndviImage = annualNDVI.select(ndviName + year);
  selectedATE = ateImage.updateMask(ateImage.gt(thresATEP)).visualize(visATE);
  // selectedNDVI = ndviImage.visualize(visNDVI);
  ateLayer = ui.Map.Layer(selectedATE).setName(ateLayerName + year);
  // ndviLayer = ui.Map.Layer(selectedNDVI).setName(ndviLayerName + year).setShown(showNDVI);
  layers.set(3, ateLayer);
  // layers.set(2, ndviLayer);
};
// Create a label and slider.
var sliderLabel = ui.Label({
  // value: "Annual Maximum NDVI and Detected ATE (ATEP > " + thresATEP + ") for Year",
  value: "Annually Detected ATE (ATEI > " + thresATEP + ") for Year",
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
inspectorPanel.add(sliderPanel);
/*
 * Legend setup.
 */
// Creates a color bar thumbnail image for use in legend from the given color palette.
var makeColorBarParams = function(palette) {
  return {
    bbox: [0, 0, 1, 0.1],
    palette: palette,
  };
};
// Create the color bar for the legend.
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(visTrend.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
// Create a panel with three numbers for the legend.
var legendLabels = ui.Panel({
  widgets: [
    ui.Label(visTrend.min * 10, {margin: '4px 8px'}),
    ui.Label(
        ((visTrend.min + visTrend.max) * 10 / 2),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(visTrend.max * 10, {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
var legendTitle = ui.Label({
  value: 'Legend: Temporal Trend of Annual Average Estimated ATE Elevation from 1984 to 2011 (m/decade)',
  style: {fontWeight: 'bold'}
});
var legendPanel = ui.Panel([legendTitle, colorBar, legendLabels]);
inspectorPanel.add(legendPanel);
// Time-series plot panel.
var plotPanel = ui.Panel(null, null, {stretch: 'horizontal'});
var lossInspectorCheck = ui.Checkbox({label:'Greatest Disturbance Inspector', 
  value:1, style:{fontWeight: 'bold'}});
var lossYodLabel = ui.Label('');
var lossMagLabel = ui.Label('');
var lossDurLabel = ui.Label('');
var lossPrevaLabel = ui.Label('');
var lossRateLabel = ui.Label('');
var lossDsnrLabel = ui.Label('');
var plotsPanelLabel = ui.Label({
    value: '-- Pixel Level Information --',
    style: {fontSize: '18px', fontWeight: 'bold'}
  });
var plotPanelParent = ui.Panel([
  plotsPanelLabel, 
  plotPanel,
  lossInspectorCheck, 
  lossYodLabel,
  lossMagLabel,
  lossDurLabel,
  lossPrevaLabel,
  lossRateLabel,
  lossDsnrLabel,
]);
inspectorPanel.add(plotPanelParent);
/*
 * Functions.
 */
// Function to identify area without corresponding type of change.
var NAloss = function(value) {
  var id = ee.Algorithms.If(value === -9999, "No detected disturbance", Math.round(value));
  return id;
};
// Make a Dictionary of properties and labels to plot.
var properties = {
  ATEP_1984: 1984,
  ATEP_1985: 1985,
  ATEP_1986: 1986,
  ATEP_1987: 1987,
  ATEP_1988: 1988,
  ATEP_1989: 1989,
  ATEP_1990: 1990,
  ATEP_1991: 1991,
  ATEP_1992: 1992,
  ATEP_1993: 1993,
  ATEP_1994: 1994,
  ATEP_1995: 1995,
  ATEP_1996: 1996,
  ATEP_1997: 1997,
  ATEP_1998: 1998,
  ATEP_1999: 1999,
  ATEP_2000: 2000,
  ATEP_2001: 2001,
  ATEP_2002: 2002,
  ATEP_2003: 2003,
  ATEP_2004: 2004,
  ATEP_2005: 2005,
  ATEP_2006: 2006,
  ATEP_2007: 2007,
  ATEP_2008: 2008,
  ATEP_2009: 2009,
  ATEP_2010: 2010,
  ATEP_2011: 2011
};
// Function to draw plots of source and fitted time series to panel.
var plotTimeSeries = function(x, y){  
  // Clear the plot panel
  plotPanel = plotPanel.clear();
  // Create a buffer for the clicked point.
  // var buf = parseFloat(bufferBox.getValue());
  var buf = ee.Number.parse(bufferBox.getValue());
  var point = ee.Algorithms.If(buf.neq(0), 
    ee.Geometry.Point(x, y).buffer(buf).bounds(), 
    ee.Geometry.Point(x, y));
  point = ee.Geometry(point);
  //// ATE elevation chart.
  // Make a chart from the time series.
  var selectedSW = robust.filterBounds(point);
  var elvChart = ui.Chart.feature.byProperty(selectedSW, properties);
  // Customize the chart.
  elvChart.setChartType("ScatterChart")
    // .setSeriesNames(["Sub-watershed"])
    .setOptions({
      title: 'Average Estimated ATE Elevation: Time Series & OLS Trendline',
      vAxis: {title: 'Average Estimated ATE Elevation (m)'},
      hAxis: {title: 'Year'},
      trendlines: {
        lineWidth: 4,
        pointsVisible: false,
        0: {color: 'darkgreen'},
        1: {color: 'darkred'},
        2: {color: 'darkblue'}
      },
      pointsVisible: true,
      lineWidth: 2,
      pointSize: 3,
      series: {
        0: {color: 'lightgreen'},
        1: {color: 'red'},
        2: {color: 'lightblue'}
      },
      legend: {position: 'none'}
    });
  // Add the chart at a fixed position, so that new charts overwrite older ones.
  inspectorPanel.widgets().set(3, elvChart);
  // Add a yellow dot to the map where the user clicked or defined a coordinate.
  var dot = ui.Map.Layer(point, {color: 'yellow'}, 'Clicked Location');
  layers.set(layers.length() - 1, dot);
  // If in inspector mode, display relevant information.
  if (lossInspectorCheck.getValue() === true) {
    var lossResult = ltgee.getPixelInfo(lossImg, point);
    plotPanelParent.widgets().get(3).setValue('Year:      ' + NAloss(lossResult.yod).getInfo());
    plotPanelParent.widgets().get(4).setValue('Magnitude: ' + NAloss(lossResult.mag).getInfo());
    plotPanelParent.widgets().get(5).setValue('Duration:  ' + NAloss(lossResult.dur).getInfo());
    plotPanelParent.widgets().get(6).setValue('Pre-value: ' + NAloss(lossResult.preval).getInfo());
    plotPanelParent.widgets().get(7).setValue('Rate:      ' + NAloss(lossResult.rate).getInfo());
    plotPanelParent.widgets().get(8).setValue('DSNR:      ' + NAloss(lossResult.dsnr).getInfo());
  } else {
    plotPanelParent.widgets().get(3).clear();
    plotPanelParent.widgets().get(4).clear();
    plotPanelParent.widgets().get(5).clear();
    plotPanelParent.widgets().get(6).clear();
    plotPanelParent.widgets().get(7).clear();
    plotPanelParent.widgets().get(8).clear();
  }
};
/*
 * Bind functions to actions.
 */
// Register a callback on the default map to be invoked to plot time series for clicked point on map.
mapPanel.onClick(function(coords) {
  var x = coords.lon;
  var y = coords.lat;
  // Update the lon/lat panel with values from the click event.
  lonBox.setValue(x.toFixed(4));
  latBox.setValue(y.toFixed(4));
  plotTimeSeries(x, y);
});
// Plot time series for point defined as coordinates.
submitButton.onClick(function(){
  var x = parseFloat(lonBox.getValue());
  var y = parseFloat(latBox.getValue());
  plotTimeSeries(x, y);
  mapPanel.setCenter(x, y, mapScale);
});
/*
 * Initialize the App.
 */
// Set default values on the slider and map.
slider.setValue(setYear);
// Initialize the map panel with a test point.
mapPanel.add(ui.Label({
  value: 'Please click a location',
  style: {shown: false, position: 'top-left'}
}));
mapPanel.setCenter(initLon, initLat, mapScale);
// Replace the root with a SplitPanel that contains the inspector, map, and plot.
ui.root.clear();
ui.root.add(inspectorPanel);
ui.root.add(mapPanel);
// Arrange layers.
layers.add(lossSumLayer.setShown(showLossSum));
layers.add(robustTrendLayer.setShown(showRob));
// layers.add(ndviLayer.setShown(true));
layers.add(ateLayer.setShown(true));
layers.add(lossYodLayer.setShown(showLoss));
layers.add(lossMagLayer.setShown(showLoss));
layers.add(ui.Map.Layer().setName("Clicked Location"));
// plotTimeSeries(initLon, initLat);