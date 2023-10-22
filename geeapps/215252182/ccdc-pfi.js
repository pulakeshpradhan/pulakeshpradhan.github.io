/*////////////////////////////////////////////////////////////////
   Time series explorer with CCDC-PFI results
   Author: Yaontong Cai
           Sun-Yat Sen University
           caiyt33@mail2.sysu.edu.cn
           2022-02-12
   Citation:
   Cai, Y., et al.; 2022. (submitting) Mapping Sub-pixel Forest Change Using Pure Forest Index and CCDC Algorithm on Google Earth Engine. Remote Sensing of Environment.
*/ ////////////////////////////////////////////////////////////////
/**
 * This script is modify from Chen, S., Woodcock, C.E., Bullock, E.L., Arévalo, P., Torchinava, P., Peng, S. and Olofsson, P., 2021.
 * Monitoring temperate forest degradation on Google Earth Engine using Landsat time series analysis. Remote Sensing of Environment, 265, p.112648;
 * The paper is available at https://www.sciencedirect.com/science/article/pii/S0034425721003680
**/
var ut = require('users/215252182/public:Modules/ut_plotter_search');
var visLabels = {
  fontWeight: 'bold', 
  fontSize: '14px', 
  width: '590px',
  padding: '4px 4px 4px 4px',
  border: '1px solid black',
  color: 'white',
  backgroundColor: 'black',
  textAlign: 'left'
  }
var app_title = ui.Label({value: 'Display CCDC-PFI Model Fits and Landsat Time Series',
                      style: {width: '1000px', height: '50px', fontSize: '30px', color: 'black'} 
                    });
var app_doc = ui.Label('1. Setting parameters on "Input parameters" panel.\n 2.Click \
           "Run CCDC-PFI" button. \n 3.Click a point on the map to display model fits.') ;
var app_doc1 = ui.Label('\nPlease cite the code as:')
var app_paper = ui.Label('Cai, Y., 2022. (submitting)\
\nMapping Sub-pixel Forest Change Using Pure Forest Index and CCDC Algorithm on Google Earth Engine. \
\nRemote Sensing of Environment.');
var endMembers = {
  gv: [264,	832,	338,	4931,	1841, 754],
  npv: [192, 476, 929, 3007, 2613, 1243],
  soil: [803,	1199,	1414,	2094,	3134,	2487],
  shade: [0, 0, 0, 0, 0, 0],
  cloud: [1678, 1986, 1884, 4518, 3404, 2148],
  cfThreshold: 0.2
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
    value: '2021-12-31',
    style:{stretch: 'horizontal', backgroundColor: 'rgba(255, 255, 255, 0.0)'}
  })
var sDay_label = ui.Label('Start day of year');  
var sDay = ui.Textbox({
    placeholder: "Start day of year",
    value: '100',
    style:{stretch: 'horizontal', backgroundColor: 'rgba(255, 255, 255, 0.0)'}
  })
var eDay_label = ui.Label('End day of year');  
var eDay = ui.Textbox({
    placeholder: "End day of year",
    value: '300',
    style:{stretch: 'horizontal', backgroundColor: 'rgba(255, 255, 255, 0.0)'}
  })
var avl_bands = {
  PFI: 'PFI',
  Soil: 'Soil',
  GV: 'GV',
  NPV: 'NPV',
  Shade: 'Shade'
};
var show_band = 'PFI'
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
    minObservations: 6,
    chiSquareProbability: 0.99,
    minNumOfYearsScaler: 1.33,
    breakpointBands: ['PFI', 'Soil', 'GV', 'NPV', 'Shade'],
    nSeg: 6,
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
  tsPanel.add(ui.Label('Running CCDC-PFI...'));
  var pixel = ee.Geometry.Point([coords.lon, coords.lat]);
  // Model settings
  var data = ut.getLandsatTS(pixel, params, endMembers);
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
// // ---------------------------------------------------------------
// // UIs:
  // map panel
var mapPanel = ui.Map({style: {cursor: 'crosshair'}});
mapPanel.setOptions('SATELLITE');
  // menu panel
var resetButton = ui.Button('Reset');
var ccdButton = ui.Button('Run CCDC-PFI');
var menuSet = ui.Panel([sDate_label, sDate, eDate_label, eDate, 
                        sDay_label,  sDay,  eDay_label,  eDay], 
                        ui.Panel.Layout.Flow('vertical'));
var buttonSet = ui.Panel([select, ccdButton], 
                        ui.Panel.Layout.Flow('horizontal'));      
var app_Setting = ui.Label('Input parameters',visLabels);
var menuUISet = ui.Panel([app_Setting, menuSet, buttonSet, resetButton, app_doc1, app_paper/*, app_paper_free_l,
                        app_doc2, app_link*/]);
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
    ccdButton.setLabel('Run CCDC-PFI');
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
// ---------------------------------------------------------------
// Initialization:
ui.root.clear();
ui.root.add(uiPanel);
// moveToPixel(currentSU);
mapPanel.centerObject(ee.Geometry.Point(-56.183311074180814,-11.94219730696002), 13);
tsPanel.add(app_title);
tsPanel.add(app_doc);