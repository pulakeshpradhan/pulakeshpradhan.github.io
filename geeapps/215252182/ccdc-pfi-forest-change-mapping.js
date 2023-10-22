/*////////////////////////////////////////////////////////////////
   Export and display CCDC-PFI results
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
var ut = require('users/215252182/public:Modules/ut_workflow');
//-----------------User's Interface---------------------
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
var app_title = ui.Label('CCDC-PFI (Continuous Change Detection and Classification - Pure Forest Index)',visLabels);
var app_author = ui.Label('Author: Yaotong Cai           Date: 2022-02-12',{whiteSpace: 'pre'});
var sDate_label = ui.Label('Start year      ', {width: '200px'});
var sDate = ui.Textbox({
    placeholder: "Start year of your study period (yyyy)",
    value: '1984',
    style:{stretch: 'horizontal', backgroundColor: 'rgba(255, 255, 255, 0.0)'}
  })
var eDate_label = ui.Label('End year      ', {width: '200px'});
var eDate = ui.Textbox({
    placeholder: "End year of your study period (yyyy)",
    value: '2021',
    style:{stretch: 'horizontal', backgroundColor: 'rgba(255, 255, 255, 0.0)'}
  })
var sDay_label = ui.Label('Start day of year',{width: '200px'});  
var sDay = ui.Textbox({
    placeholder: "Start day of year (Julian dates)",
    value: '100',
    style:{stretch: 'horizontal', backgroundColor: 'rgba(255, 255, 255, 0.0)'}
  });
var eDay_label = ui.Label('End day of year ',{width: '200px'});  
var eDay = ui.Textbox({
    placeholder: "End day of year (Julian dates)",
    value: '300',
    style:{stretch: 'horizontal', backgroundColor: 'rgba(255, 255, 255, 0.0)'}
  });
//check box to specify which products to export
var cb_year = ui.Checkbox({label: 'Export first year of disturbance (type asset id below)', value: true});
var output_year_t = ui.Textbox({
    placeholder: "GEE asset id of first disturbance year to export and view",
    value: 'users/215252182/GFC_CCDC-PFI/test',
    style:{stretch: 'horizontal', backgroundColor: 'rgba(255, 255, 255, 0.0)'}
  });
var region_l = ui.Label('GEE asset id of study region');
var region_t = ui.Textbox({
    placeholder: "Study region (split the region if too large)",
    value: 'users/215252182/Vectors/test',
    style:{stretch: 'horizontal', backgroundColor: 'rgba(255, 255, 255, 0.0)'}
  });  
var runButton = ui.Button({label: 'Run CCDC-PFI', style: {width: '95%'}});
var viewButton = ui.Button({label: 'View year of change', style: {width: '95%'}});
  // map panel
var mapPanel = ui.Map({style: {cursor: 'crosshair'}});
mapPanel.setOptions('SATELLITE');
  // menu panel
var load_region = ui.Button('load data');
var load_mask = ui.Button('load data');
var start_date = ui.Panel([sDate_label, sDate], ui.Panel.Layout.Flow('horizontal'));
var end_date = ui.Panel([eDate_label, eDate], ui.Panel.Layout.Flow('horizontal'));
var start_day = ui.Panel([sDay_label, sDay], ui.Panel.Layout.Flow('horizontal'));
var end_day = ui.Panel([eDay_label, eDay], ui.Panel.Layout.Flow('horizontal'));
var input = ui.Label('Define Output Extent',visLabels);
var setting = ui.Label('Input Parameters',visLabels);
var output = ui.Label('Output Options',visLabels);
var view_results = ui.Label('View results',visLabels);
var region_panel = ui.Panel([region_t, load_region], ui.Panel.Layout.Flow('horizontal'));
var view_results_l = ui.Label('GEE asset id of disturbance year to display');
var view_results_t = ui.Textbox({
    placeholder: "GEE asset id of disturbance year to display",
    value: 'users/215252182/GFC_CCDC-PFI/test',
    style:{stretch: 'horizontal', backgroundColor: 'rgba(255, 255, 255, 0.0)'}
  }); 
var app_doc1 = ui.Label('\nPlease cite the code as:')
var app_paper = ui.Label('Cai, Y., 2022.(submitting)\
\nMapping Sub-pixel Forest Change Using Pure Forest Index and CCDC Algorithm on Google Earth Engine. \
\nRemote Sensing of Environment.');
var menuSet = ui.Panel([app_title, app_author, 
                        input, region_l, region_panel, /*forest_mask_l, mask_panel, */
                        setting, start_date, end_date, start_day, end_day, 
                        output, cb_year, output_year_t, 
                        runButton, view_results, view_results_l, view_results_t, viewButton, 
                        app_doc1, app_paper], 
                        ui.Panel.Layout.Flow('vertical'));
var menuUISet = ui.Panel([menuSet]);
var menuPanel = ui.Panel({
  widgets: [menuUISet],
  style: {width: '100%'}});
  // ui panel
var controlPanel = ui.Panel({
  style: {width: '30%'},
  widgets:[menuPanel]});
var mapPanel2 = ui.Panel({
  style: {width: '70%'},
  widgets:[mapPanel]});
var uiPanel = ui.SplitPanel(controlPanel, mapPanel2, 'horizontal');
//----------------Events (Display)---------------------
var category_legend = function(title, names, palette){
  var legend = ui.Panel({style: {position: 'bottom-left', padding: '8px 15px'}});
  var legendTitle = ui.Label({value: title,
                   style: {fontWeight: 'bold',fontSize: '18px',margin: '0 0 4px 0',padding: '0'}});
  legend.add(legendTitle);
  var makeRow = function(color, name) {
        var colorBox = ui.Label({style: {backgroundColor: color,padding: '8px',margin: '0 0 4px 0'}});
        var description = ui.Label({value: name,style: {margin: '0 0 4px 6px'}});
        return ui.Panel({widgets: [colorBox, description],layout: ui.Panel.Layout.Flow('horizontal')});
     };
  for (var i = 0; i < names.length; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
  mapPanel.add(legend);
}
load_region.onClick(function() {
  mapPanel.clear();
  var region_fc = ee.FeatureCollection(region_t.getValue());
  var empty = ee.Image().byte();
  var region_draw = empty.paint({
  featureCollection: region_fc,
  color: 1,
  width: 3
  });
  mapPanel.addLayer(region_draw, {palette: 'red'}, 'study_region');
  mapPanel.centerObject(region_fc);
});
load_mask.onClick(function() {
  mapPanel.clear();
  var region_fc = ee.FeatureCollection(region_t.getValue());
  var empty = ee.Image().byte();
  var region_draw = empty.paint({
  featureCollection: region_fc,
  color: 1,
  width: 3
  });
  mapPanel.addLayer(region_draw, {palette: 'red'}, 'study_region');
  mapPanel.addLayer(ee.Image(forest_mask_t.getValue()).clip(region_fc), {palette: 'green'}, 'forest_mask');
});
viewButton.onClick(function() {
  mapPanel.clear();
  var region_fc = ee.FeatureCollection(region_t.getValue());
  var empty = ee.Image().byte();
  var region_draw = empty.paint({
  featureCollection: region_fc,
  color: 1,
  width: 3
  });
  mapPanel.addLayer(region_draw, {palette: 'red'}, 'study_region');
  mapPanel.centerObject(region_fc);
  //add lengend
  var makeRow = function(color, name) {
        var colorBox = ui.Label({style: {backgroundColor: '#' + color,padding: '8px',margin: '0 0 4px 0'}});
        var description = ui.Label({value: name,style: {margin: '0 0 4px 6px'}});
        return ui.Panel({widgets: [colorBox, description],layout: ui.Panel.Layout.Flow('horizontal')});
     };
  var legend = ui.Panel({style: {position: 'bottom-left', padding: '8px 15px'}});
  var legendTitle = ui.Label({value: 'Disturbance year',
                   style: {fontWeight: 'bold',fontSize: '18px',margin: '0 0 4px 0',padding: '0'}});
  legend.add(legendTitle);
  var lon = ee.Image.pixelLonLat().select('latitude');
  var viz_min = ee.Number.parse(sDate.getValue()).getInfo();
  var viz_max = ee.Number.parse(eDate.getValue()).getInfo();
  var viz = {min:viz_min, max:viz_max, palette: 'violet,indigo,blue,green,yellow,orange,red'};
  var gradient = lon.multiply((viz.max-viz.min)/100.0).add(viz.min);
  var legendImage = gradient.visualize(viz);
  var panel_e = ui.Panel({
  widgets: [ui.Label(eDate.getValue())]});
  legend.add(panel_e);
  var thumbnail = ui.Thumbnail({image: legendImage,
  params: {bbox:'0,0,10,100', dimensions:'10x200'},
  style: {padding: '1px', position: 'bottom-center'}
  });
  legend.add(thumbnail);
  var panel_s = ui.Panel({widgets: [ui.Label(sDate.getValue())]});
  legend.add(panel_s);
  mapPanel.add(legend);
  mapPanel.addLayer(ee.Image(view_results_t.getValue()), viz, 'disturbance_year');
});
//----------------Events (Run CCDC-PFI)---------------------
var run_CCDC_PFI = function(){
  var ccdc_PFI_utlis = require('users/215252182/public:Modules/ut_workflow');
  //region to run
  var saveRegion = ee.FeatureCollection(region_t.getValue());
  /********  parameters for spectral mixture analysis**************
   * 
   cfThreshold is the threshold for cloud masking. 
   'gv', 'npv', 'soil', 'shade', 'cloud' are the endmembers. 
   'start_date' is the start of study period
   'end_day' is the end of study period
   'start_day' is the start day of year of observations you to use.
   'end_day' is the end day of year of observations to use.
  ******************************************************************/
  var study_period = ee.Dictionary({
    'start_year': ee.Number.parse(sDate.getValue()),
    'end_year':ee.Number.parse(eDate.getValue())
  });
  //we recommend to start the run 3 years ealier than the start of your study period
  var start_date = ee.String((ee.Number(study_period.get('start_year')).subtract(3))).cat('-01-01');
  var end_date = ee.String((ee.Number(study_period.get('end_year')))).cat('-12-31');
  var pfi_params = ee.Dictionary({
    'cfThreshold': 0.2,
    'gv': [264,	832,	338,	4931,	1841, 754],
    'npv': [192, 476, 929, 3007, 2613, 1243],
    'soil': [803,	1199,	1414,	2094,	3134,	2487],
    'shade': [0, 0, 0, 0, 0, 0],
    'cloud': [1678, 1986, 1884, 4518, 3404, 2148],
    'start_date': start_date, 
    'end_date': end_date,
    'start_day': ee.Number.parse(sDay.getValue()),
    'end_day': ee.Number.parse(eDay.getValue()),
  });
  //get input collection
  var c1 = ee.ImageCollection(ccdc_PFI_utlis.get_col(saveRegion, pfi_params));
  //get PFI collection
  var PFI_c1 = ee.ImageCollection(ccdc_PFI_utlis.get_C1_SR_PFI(saveRegion, c1, pfi_params));
  var ccdc_pfi = ee.Algorithms.TemporalSegmentation.Ccdc({collection:PFI_c1, dateFormat: 1});
  // get first year of change
  var segments = ccdc_PFI_utlis.Segments(ccdc_pfi) // Create temporal segments
  var firstBreakSegment = ee.Image(segments.find()
    .updateMask('i.tBreak > 0') // Exclude segments without a break
    .first().toImage('tBreak')) // Pick the first segment that is left
  return firstBreakSegment;
};
runButton.onClick(function() {
  var saveRegion = ee.FeatureCollection(region_t.getValue());
  if (cb_year.getValue() === true) {
      var year_change_first = run_CCDC_PFI();
      var asset_id_year = output_year_t.getValue();
      Export.image.toAsset({
              image: year_change_first,
              scale: 30,
              description: "export_disturbance_year",
              assetId: asset_id_year,
              region: saveRegion,
              maxPixels: 1e13,
              pyramidingPolicy: {'.default': 'mode'}
            });
      }
});
//----------------Events (Specify what products to export)---------------------
cb_year.onChange(function() {
  if (cb_year.getValue() === false) {
    output_year_t.setDisabled(true);
  }
  else {
     output_year_t.setDisabled(false);
  }
});
//-----------------Initialization---------------------
ui.root.clear();
ui.root.add(uiPanel);
mapPanel.setCenter(-61.79, -4.19, 4);