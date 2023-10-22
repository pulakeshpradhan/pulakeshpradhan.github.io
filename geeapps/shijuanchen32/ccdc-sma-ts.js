var degradation_examples = ee.FeatureCollection('users/shijuanchen32/georgia_public/Laos/laos_example'); 
var samples = degradation_examples;
var sampleID = 'ID'; 
var ut = require('users/shijuanchen32/forest_degradation_georgia:utilities/ut_plotter_search');
var ccdc_SMA_utlis = require('users/shijuanchen32/forest_degradation_georgia:utilities/ut_workflow');
var app_title = ui.Label({value: 'App to Display CCDC-SMA Model Fits and Landsat Time Series (Version: Tropic Collection2)',
                      style: {width: '1000px', height: '50px', fontSize: '25px', color: 'black'} 
                    });
var app_doc = ui.Label('Select an index on "Settings" panel. Then click \
           "Run CCDC-SMA" button. Finally, click a point on the map to display the time series.\n \
           Click a point on the time series to add the natural-looking Landsat image of this point.') ;
var app_doc1 = ui.Label('\nPlease cite the code as:')
var app_paper = ui.Label('Chen, S., Woodcock, C.E., Bullock, E.L., Arévalo, P., Torchinava, P., Peng, S. and Olofsson, P., 2021.\
\nMonitoring temperate forest degradation on Google Earth Engine using Landsat time series analysis. \
\nRemote Sensing of Environment, 265, p.112648.');
var app_paper_l = app_paper.setUrl('https://www.sciencedirect.com/science/article/pii/S0034425721003680');
var app_doc2 = ui.Label('Please see the guideline of running the apps on:');
var app_link_l = ui.Label('https://github.com/shijuanchen/forest_degradation_georgia');
var app_link = app_link_l.setUrl('https://github.com/shijuanchen/forest_degradation_georgia',{whiteSpace: 'pre'}, {width: '100%'});
var endMembers = {
  gv: [500, 900, 400, 6100, 3000, 1000],
  npv: [1400, 1700, 2200, 3000, 5500, 3000],
  soil: [2000, 3000, 3400, 5800, 6000, 5800],
  shade: [0, 0, 0, 0, 0, 0],
  cloud: [9000, 9600, 8000, 7800, 7200, 6500],
  cfThreshold: 0.05
}; 
var listener = 0;
var imgVis = {bands: ['B3', 'B2', 'B1'], min: 0, max: 1400};
var currentSU = 0;
var maxSU = 1000;
var sDate_label = ui.Label('Start date');
var sDate = ui.Textbox({
    placeholder: "Start date in 'yyyy-mm-dd' format",
    value: '1984-01-01',
    style:{stretch: 'horizontal', backgroundColor: 'rgba(255, 255, 255, 0.0)'}
  })
var eDate_label = ui.Label('End date');
var eDate = ui.Textbox({
    placeholder: "End date in 'yyyy-mm-dd' format",
    value: '2019-12-31',
    style:{stretch: 'horizontal', backgroundColor: 'rgba(255, 255, 255, 0.0)'}
  })
var sDay_label = ui.Label('Start day of year');  
var sDay = ui.Textbox({
    placeholder: "Start day of year",
    value: '1',
    style:{stretch: 'horizontal', backgroundColor: 'rgba(255, 255, 255, 0.0)'}
  })
var eDay_label = ui.Label('End day of year');  
var eDay = ui.Textbox({
    placeholder: "End day of year",
    value: '365',
    style:{stretch: 'horizontal', backgroundColor: 'rgba(255, 255, 255, 0.0)'}
  })
var avl_bands = {
  NDFI: 'NDFI',
  Soil: 'Soil',
  GV: 'GV',
  NPV: 'NPV',
  Shade: 'Shade'
};
var show_band = 'NDFI'
var select = ui.Select({
  items: Object.keys(avl_bands),
  onChange: function(key) {
    show_band = avl_bands[key]
    return show_band
  }
});
var getCCDParam = function(select) {
  var ccdParam = {
    dateFormat: 1,
//    lambda: 0.002, //if using [0, 1] as the range, then lambda: 0.002; if use [0, 10000] as the range, then lambda:20(default)  
    maxIterations: 10000,
    minObservations: 5,
    chiSquareProbability: 0.99,
    minNumOfYearsScaler: 1.33,
    breakpointBands: ['NDFI', 'Soil', 'GV', 'NPV', 'Shade'],
    nSeg: 8,
    band: select};  
  return ccdParam;
};
// ---------------------------------------------------------------
// Main functions:
  // run and plot CCD for a pixel
var chartCCD = function(coords, params) {
  resetAll();
  tsPanel.add(app_title);
  tsPanel.add(app_doc);
  tsPanel.add(ui.Label('Running CCDC-SMA...'));
  var pixel = ee.Geometry.Point([coords.lon, coords.lat]);
  // Model settings
//  var data = ut.getLandsatTS(pixel, params, endMembers);
  var data = ccdc_SMA_utlis.getLandsatTS(pixel, params, endMembers);
  ut.addPixel(mapPanel, coords, 0.000135, '0000FF', 'Clicked');
  var ccdParam = getCCDParam(select.getValue());
  var ccd = ut.runCCD(ccdParam, data);
  var ccdTS = ut.getTimeSeries(data, ccd, pixel, ccdParam.dateFormat, ccdParam.band, 0.1);
  var segList = ut.genSegList(ccdParam.nSeg);
  var ccdTable = ut.getCCDTable(ccdTS, segList);
  ccdTable.evaluate(function(t, e) {
    var chart = ut.getCCDChart(t, ccdParam.band, coords.lat, coords.lon, ccdParam.nSeg);
    chart.onClick(
      function(date) {
        if (date === null) {
          ut.removeLayer(mapPanel, '_');
        } else {
          var img = ee.Image(ut.getImage(pixel, date));
          mapPanel.addLayer(img, imgVis, img.get('system:index').getInfo());
          ut.removeLayer(mapPanel, 'Clicked');
          reloadSamples();
          ut.addPixel(mapPanel, coords, 0.000135, '0000FF', 'Clicked');
        }
      }
    );
//    resetTSPanel();
    tsPanel.add(chart);
  });
};
  // reset the time series panel
var resetTSPanel = function() {
  tsPanel.clear();
  ut.removeLayer(mapPanel, '_');
};
  // reset all
var resetAll = function() {
  resetTSPanel();
  ut.removeLayer(mapPanel, 'Clicked');
};
var moveToPixel = function(SU) {
  if (SU > maxSU) {
    print('Last sample unit reached.');
  } else if (SU < 0) {
    print('First sample unit reached');
  } else {
    var samplePixel = samples.filterMetadata(sampleID, 'equals', SU);
    mapPanel.centerObject(samplePixel, 15);
    currentSU = SU;
  }
};
var reloadSamples = function() {
  ut.removeLayer(mapPanel, 'Samples');
  mapPanel.addLayer(samples, {color: 'yellow'}, 'Samples');
};
// ---------------------------------------------------------------
// UIs:
  // sample panel
var IDBox = ui.Textbox({
  placeholder: 'Search ID',
  style: {width: '80px',margin: '2px'}
});
var prevButton = ui.Button('Previous', null, false, {margin: '0 auto 0 0'});
var nextButton = ui.Button('Next', null, false, {margin: '0 0 0 auto'});
var moveSet = ui.Panel([prevButton, IDBox, nextButton], 
                        ui.Panel.Layout.Flow('horizontal'));
var movePanel = ui.Panel({
  widgets: [moveSet],
  style: {position: 'top-center', width: '250px'}
});
  // map panel
var mapPanel = ui.Map({style: {cursor: 'crosshair'}});
mapPanel.setOptions('SATELLITE');
mapPanel.add(movePanel);
  // menu panel
var resetButton = ui.Button('Reset');
var ccdButton = ui.Button('Run CCDC-SMA');
var menuSet = ui.Panel([sDate_label, sDate, eDate_label, eDate, 
                        sDay_label,  sDay,  eDay_label,  eDay], 
                        ui.Panel.Layout.Flow('vertical'));
var buttonSet = ui.Panel([select, ccdButton], 
                        ui.Panel.Layout.Flow('horizontal'));      
var app_Setting = ui.Label({value: 'Settings',
                      style: {fontSize: '25px'} 
                    });
var menuUISet = ui.Panel([app_Setting, menuSet, buttonSet, resetButton, app_doc1, app_paper_l,
                        app_doc2, app_link]);
var menuPanel = ui.Panel({
  widgets: [menuUISet],
  style: {width: '20%'}});
  // ts panel
var tsPanel = ui.Panel({
  widgets: [],
  layout: ui.Panel.Layout.flow('vertical'),
  style: {position: 'bottom-right', width: '80%'}});
  // ui panel
var controlPanel = ui.Panel({
  style: {height: '50%'},
  widgets:[ui.SplitPanel(menuPanel, tsPanel , 'horizontal', false)]});
var mapPanel2 = ui.Panel({
  style: {height: '50%'},
  widgets:[mapPanel]});
var uiPanel = ui.SplitPanel(mapPanel2, controlPanel, 'vertical');
// ---------------------------------------------------------------
// Runtime functions:
ccdButton.onClick(function() {
  if (listener == 1) {
    ccdButton.setLabel('Run CCDC-SMA');
    listener = 0;
  } else {
    ccdButton.setLabel('Cancel');
    listener = 1;
  }
});
resetButton.onClick(function() {
  resetAll();
});
mapPanel.onClick(function(coords) {
  if (listener == 1) {
    var params = ee.Dictionary({
     'start': sDate.getValue(),
     'end': eDate.getValue(),
     'start_day': ee.Number.parse(sDay.getValue()),
     'end_day': ee.Number.parse(eDay.getValue())});
    chartCCD(coords, params);
  }
});
prevButton.onClick(function(button){ 
  moveToPixel(currentSU - 1);
});
nextButton.onClick(function(button){
  moveToPixel(currentSU + 1);
});
IDBox.onChange(function(input){
  moveToPixel(parseInt(input, 10));
});
// ---------------------------------------------------------------
// Initialization:
ui.root.clear();
ui.root.add(uiPanel);
moveToPixel(currentSU);
mapPanel.centerObject(samples.first(), 16);
mapPanel.addLayer(samples, {color: 'red'}, 'degradation examples')
//var year_change_first = ee.Image('users/shijuanchen32/georgia_public/1_1_test_first_year');
//mapPanel.addLayer(year_change_first, {min: 1987, max: 2019, palette: ['#081bff', '#09a8c2','#00ff7d', '#efff07','#ffa604', '#c21806']}, 'year_change_test');
tsPanel.add(app_title);
tsPanel.add(app_doc);