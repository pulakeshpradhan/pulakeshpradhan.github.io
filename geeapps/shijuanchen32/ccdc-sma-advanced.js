var ut = require('users/shijuanchen32/forest_degradation_georgia:utilities/ut_workflow');
//-----------------User's Interface---------------------
var app_title = ui.Label({value: 'CCDC-SMA APP',
                      style: {width: '100%',fontSize: '30px', color: 'black'} 
                    });
var app_version = ui.Label({value: 'Version: Temperate Advanced Collection2',
                      style: {width: '100%',fontSize: '20px', color: 'black'} 
                    });
var app_author = ui.Label('Author: Shijuan Chen           Date: 08/31/2021\
\nThis app runs CCDC-SMA to monitor forest degradation. \
\nThe advanced version requires a forest mask with positive \
\nvalues for differnt forest types and non-forest being masked.',{whiteSpace: 'pre'});
var ab_thre_label = ui.Label('Threshold (abrupt, % of original)      ', {width: '200px'});
var ab_thre = ui.Textbox({
    placeholder: "Threshold of detecting abrupt forest degradation",
    value: '100',
    style:{stretch: 'horizontal', backgroundColor: 'rgba(255, 255, 255, 0.0)'}
  });
var gr_thre_label = ui.Label('Threshold (gradual)      ', {width: '200px'});
var gr_thre = ui.Textbox({
    placeholder: "Threshold of detecting gradual forest degradation",
    value: '0.1',
    style:{stretch: 'horizontal', backgroundColor: 'rgba(255, 255, 255, 0.0)'}
  });
var prob_label = ui.Label('Change Probability  ', {width: '200px'});
var prob = ui.Textbox({
    placeholder: "Change Probability of detecting forest degradation",
    value: '0.99',
    style:{stretch: 'horizontal', backgroundColor: 'rgba(255, 255, 255, 0.0)'}
  });
var consec_label = ui.Label('Num of consec ', {width: '200px'});
var consec = ui.Textbox({
    placeholder: "Number of consectives to trigger a break",
    value: '6',
    style:{stretch: 'horizontal', backgroundColor: 'rgba(255, 255, 255, 0.0)'}
  });
var sDate_label = ui.Label('Start year      ', {width: '200px'});
var sDate = ui.Textbox({
    placeholder: "Start year of your study period (yyyy)",
    value: '1987',
    style:{stretch: 'horizontal', backgroundColor: 'rgba(255, 255, 255, 0.0)'}
  })
var eDate_label = ui.Label('End year      ', {width: '200px'});
var eDate = ui.Textbox({
    placeholder: "End year of your study period (yyyy)",
    value: '2019',
    style:{stretch: 'horizontal', backgroundColor: 'rgba(255, 255, 255, 0.0)'}
  })
var sDay_label = ui.Label('Start day of year',{width: '200px'});  
var sDay = ui.Textbox({
    placeholder: "Start day of year (Julian dates)",
    value: '150',
    style:{stretch: 'horizontal', backgroundColor: 'rgba(255, 255, 255, 0.0)'}
  });
var eDay_label = ui.Label('End day of year ',{width: '200px'});  
var eDay = ui.Textbox({
    placeholder: "End day of year (Julian dates)",
    value: '300',
    style:{stretch: 'horizontal', backgroundColor: 'rgba(255, 255, 255, 0.0)'}
  });
//check box to specify which products to export
var cb_full = ui.Checkbox({label: 'Export full segment results (enter asset id below)', value: false});
var output_full_t = ui.Textbox({
    placeholder: "GEE asset id of full segment results to export",
    value: 'users/shijuanchen32/georgia_public/test/advanced_full_C2',
    style:{stretch: 'horizontal', backgroundColor: 'rgba(255, 255, 255, 0.0)'}
  });
output_full_t.setDisabled(true);    
var cb_year = ui.Checkbox({label: 'Export first year of disturbance (enter asset id below)', value: true});
var output_year_t = ui.Textbox({
    placeholder: "GEE asset id of first disturbance year to export",
    value: 'users/shijuanchen32/georgia_public/test/advanced_first_year_C2',
    style:{stretch: 'horizontal', backgroundColor: 'rgba(255, 255, 255, 0.0)'}
  });
var region_l = ui.Label('GEE asset id of study region');
var region_t = ui.Textbox({
    placeholder: "Enter path of study region (split the region if too large)",
    value: 'users/shijuanchen32/georgia_public/test/test_region1',
    style:{stretch: 'horizontal', backgroundColor: 'rgba(255, 255, 255, 0.0)'}
  });  
var forest_mask_l = ui.Label('GEE asset id of forest mask');
var forest_mask_t = ui.Textbox({
    placeholder: "Enter path of forest mask",
    value: 'users/shijuanchen32/georgia_public/forest_type_georgia',
    style:{stretch: 'horizontal', backgroundColor: 'rgba(255, 255, 255, 0.0)'}
  });  
var forest_type = ui.Label("Please specify the value of forest type in the forest mask");  
var dcd_l = ui.Label("deciduous");  
var dcd_t = ui.Textbox({value:'1', style: {width: '30px'}});
var cnf_l = ui.Label("coniferous");  
var cnf_t = ui.Textbox({value:'2', style: {width: '30px'}});
var mix_l = ui.Label("mixed");  
var mix_t = ui.Textbox({value:'3', style: {width: '30px'}});
var runButton = ui.Button({label: 'Run CCDC-SMA', style: {width: '95%'}});
var viewButton = ui.Button({label: 'View year of change', style: {width: '95%'}});
  // map panel
var mapPanel = ui.Map({style: {cursor: 'crosshair'}});
mapPanel.setOptions('SATELLITE');
  // menu panel
var load_region = ui.Button('load data');
var load_mask = ui.Button('load forest mask');
var ab_thre_panel = ui.Panel([ab_thre_label, ab_thre], ui.Panel.Layout.Flow('horizontal'));
var gr_thre_panel = ui.Panel([gr_thre_label, gr_thre], ui.Panel.Layout.Flow('horizontal'));
var prob_panel = ui.Panel([prob_label, prob], ui.Panel.Layout.Flow('horizontal'));
var consec_panel = ui.Panel([consec_label, consec], ui.Panel.Layout.Flow('horizontal'));
var start_date = ui.Panel([sDate_label, sDate], ui.Panel.Layout.Flow('horizontal'));
var end_date = ui.Panel([eDate_label, eDate], ui.Panel.Layout.Flow('horizontal'));
var start_day = ui.Panel([sDay_label, sDay], ui.Panel.Layout.Flow('horizontal'));
var end_day = ui.Panel([eDay_label, eDay], ui.Panel.Layout.Flow('horizontal'));
var visLabels = {
  fontWeight: 'bold', 
  fontSize: '16px', 
  padding: '4px 4px 4px 4px',
  border: '1px solid black',
  color: 'white',
  backgroundColor: 'black',
  textAlign: 'left',
  stretch: 'horizontal'
  };
var input = ui.Label({value: 'Inputs',style: visLabels });
var setting = ui.Label({value: 'Settings',style: visLabels });
var output = ui.Label({value: 'Outputs',style: visLabels });
var view_results = ui.Label({value: 'View results',style: visLabels });
var region_panel = ui.Panel([region_t, load_region], ui.Panel.Layout.Flow('horizontal'));
var mask_panel = ui.Panel([forest_mask_t], ui.Panel.Layout.Flow('horizontal'));
var type_panel = ui.Panel([dcd_l,dcd_t,cnf_l,cnf_t,mix_l,mix_t], ui.Panel.Layout.Flow('horizontal'));
var view_results_l = ui.Label('GEE asset id of disturbance year to display');
var view_results_t = ui.Textbox({
    placeholder: "GEE asset id of disturbance year to display",
    value: 'users/shijuanchen32/georgia_public/test/advanced_first_year_C2',
    style:{stretch: 'horizontal', backgroundColor: 'rgba(255, 255, 255, 0.0)'}
  });
var view_full_l = ui.Label('GEE asset id of segment results to display');
var view_full_t = ui.Textbox({
    placeholder: "GEE asset id of segment results to display",
    value: 'users/shijuanchen32/georgia_public/test/advanced_full_C2',
    style:{stretch: 'horizontal', backgroundColor: 'rgba(255, 255, 255, 0.0)'}
  });  
var view_full_Button = ui.Button({label: 'View segment results', style: {width: '95%'}});
var app_doc1 = ui.Label('\nPlease cite the code as:')
var app_paper = ui.Label('Chen, S., Woodcock, C.E., Bullock, E.L., Arévalo, P., Torchinava, P., Peng, S. and Olofsson, P., 2021.\
\nMonitoring temperate forest degradation on Google Earth Engine using Landsat time series analysis. \
\nRemote Sensing of Environment, 265, p.112648.');
var app_paper_l = app_paper.setUrl('https://www.sciencedirect.com/science/article/pii/S0034425721003680');
var app_doc2 = ui.Label('Please see the guideline of running the apps on:');
var app_link_l = ui.Label('https://github.com/shijuanchen/forest_degradation_georgia');
var app_link = app_link_l.setUrl('https://github.com/shijuanchen/forest_degradation_georgia',{whiteSpace: 'pre'}, {width: '100%'});
var menuSet = ui.Panel([app_title, app_version, app_author, 
                        input, region_l, region_panel, forest_mask_l, mask_panel, 
                        forest_type, type_panel,load_mask,
                        setting, start_date, end_date, start_day, end_day, ab_thre_panel, gr_thre_panel, prob_panel, consec_panel, 
                        output, cb_year, output_year_t,
                        cb_full,output_full_t, 
                        runButton, view_results, view_results_l, view_results_t, viewButton,
                        view_full_l, view_full_t, view_full_Button, app_doc1, app_paper_l,
                        app_doc2, app_link], 
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
  var forest_mask =  ee.Image(forest_mask_t.getValue()).clip(region_fc)
  //'users/shijuanchen32/georgia_land_cover_v4/annual/land_cover_1986'
  mapPanel.addLayer(forest_mask.eq(ee.Number.parse(dcd_t.getValue())).selfMask(), {palette: ['#00FF00']}, 'deciduous forest');
  mapPanel.addLayer(forest_mask.eq(ee.Number.parse(cnf_t.getValue())).selfMask(), {palette: ['#006400']}, 'coniferous forest');
  mapPanel.addLayer(forest_mask.eq(ee.Number.parse(mix_t.getValue())).selfMask(), {palette: ['#06a30f']}, 'mixed forest');
  var title = 'forest types';
  var palette =['#00FF00','#006400', '#06a30f'];
  var names = ['deciduous forest', 'coniferous forest', 'mixed forest'];
  category_legend(title, names, palette)
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
  var viz_min = ee.Number.parse(sDate.getValue()).getInfo();
  var viz_max = ee.Number.parse(eDate.getValue()).getInfo();
  var paletteY = ['#2c7bb6',  '#abd9e9', '#ffffbf', '#fdae61', '#d7191c'];
  var viz = {min:viz_min, max:viz_max, palette:paletteY};
  var legend = ut.generateColorbarLegend(viz_min, viz_max, paletteY, 'horizontal', 'Disturbance year');
  mapPanel.add(legend);
  mapPanel.addLayer(ee.Image(view_results_t.getValue()), viz, 'disturbance_year');
});
view_full_Button.onClick(function() {
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
  var seg_dis = ee.Image(view_full_t.getValue());
  var viz = {min: 1, max: 3, palette: ['#FFFF00','#FF0000','#FFA500']};
  mapPanel.addLayer(seg_dis.select('S1_forest_loss'), viz, 'S1', true);
  mapPanel.addLayer(seg_dis.select('S2_forest_loss'), viz, 'S2', true);
  mapPanel.addLayer(seg_dis.select('S3_forest_loss'), viz, 'S3', true);
  mapPanel.addLayer(seg_dis.select('S4_forest_loss'), viz, 'S4', true);
  mapPanel.addLayer(seg_dis.select('S5_forest_loss'), viz, 'S5', true);
  mapPanel.addLayer(seg_dis.select('S6_forest_loss'), viz, 'S6', true); 
  var title = 'Disturbance type';
  var names = ['Gradual disturbance', 'Abrupt disturbance', 'Both'];
  var palette =  ['#FFFF00','#FF0000','#FFA500'];
  category_legend(title, names, palette);
});
//----------------Events (Run CCDC-SMA)---------------------
var run_CCDC_SMA = function(){
  var ccdc_SMA_utlis = require('users/shijuanchen32/forest_degradation_georgia:utilities/ut_workflow');
  //region to run
  var saveRegion = ee.FeatureCollection(region_t.getValue());
 /*------------------------------Custermize paramters ---------------------------
 cfThreshold is the threshold for cloud masking. 
 'gv', 'npv', 'soil', 'shade', 'cloud' are the endmembers. 
 'start_date' is the start of study period
 'end_day' is the end of study period
 'start_day' is the start day of year of observations you to use.
 'end_day' is the end day of year of observations to use.
--------------------------------------------------------------------------------*/
   var study_period = ee.Dictionary({
    'start_year': ee.Number.parse(sDate.getValue()),
    'end_year':ee.Number.parse(eDate.getValue()),
    'start_day':ee.Number.parse(sDay.getValue()),
    'end_day': ee.Number.parse(eDay.getValue()),
  });
  //we recommend to start the run 3 years ealier than the start of your study period
  var start_date = ee.String((ee.Number(study_period.get('start_year')).subtract(3))).cat('-01-01');
  var end_date = ee.String((ee.Number(study_period.get('end_year')))).cat('-12-31');
  var endMembers = {
    gv: [264,	832,	338,	4931,	1841, 754],
    npv: [192, 476, 929, 3007, 2613, 1243],
    soil: [803,	1199,	1414,	2094,	3134,	2487],
    shade: [0, 0, 0, 0, 0, 0],
    cloud: [1678, 1986, 1884, 4518, 3404, 2148],
    cfThreshold: 0.2
  };
  var params_cl = ee.Dictionary({
  'forest_type': ee.Image(forest_mask_t.getValue()),
  'dcd': ee.Number.parse(dcd_t.getValue()).getInfo(),
  'cnf': ee.Number.parse(cnf_t.getValue()).getInfo(),
  'mix': ee.Number.parse(mix_t.getValue()).getInfo(),
  'start_year': study_period.get('start_year').getInfo(),
  'end_year': study_period.get('end_year').getInfo()
});
  var ccdPeriod = ee.Dictionary({'start': start_date, 'end': end_date,
  'start_day':study_period.get('start_day'), 'end_day':study_period.get('end_day')});
  var SMA_c2 = ccdc_SMA_utlis.getLandsatTS(saveRegion, ccdPeriod, endMembers, false);
  var ab_threshold = ee.Number.parse(ab_thre.getValue()).getInfo();
  var gr_threshold = ee.Number.parse(gr_thre.getValue()).getInfo();
  var ch_prob = ee.Number.parse(prob.getValue()).getInfo();
  var ccdc_params = ee.Dictionary({
    'consec': ee.Number.parse(consec.getValue()).getInfo(),
    'chi_prob': ch_prob,
    'min_year':1.33,
    'break_bands':['NDFI', 'GV', 'NPV', 'Soil', 'Shade']
   });
  var ccdc_sma = ee.Algorithms.TemporalSegmentation.Ccdc({
                dateFormat: 0,  //The gradual threshold is based on Julian dates, so use jDays here. 
                collection: SMA_c2,  
                minObservations: ccdc_params.get('consec'),
                chiSquareProbability: ccdc_params.get('chi_prob'),
                minNumOfYearsScaler: ccdc_params.get('min_year'),
                breakpointBands:ccdc_params.get('break_bands') });
  var classify = ccdc_SMA_utlis.classifySegments_advanced(saveRegion, ccdc_sma, params_cl, ab_threshold, gr_threshold, ch_prob);
//  print(classify);
  //get annual results
  var start_year = study_period.get('start_year').getInfo();
  var end_year = study_period.get('end_year').getInfo();
  var annual_col = ccdc_SMA_utlis.seg_to_annual_int(start_year, end_year, classify);
  //get the first year of change
  var year_change_first = ee.ImageCollection(annual_col).sort('year', false).mosaic();
 // print(year_change_first);
  return ee.ImageCollection([year_change_first, classify]);
}
runButton.onClick(function() {
  var saveRegion = ee.FeatureCollection(region_t.getValue());
  if (cb_year.getValue() === true) {
      var year_change_first = run_CCDC_SMA().toList(5).get(0);
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
  if (cb_full.getValue() === true) {
      var classify = run_CCDC_SMA().toList(5).get(1);
      var asset_id_full = output_full_t.getValue();
      Export.image.toAsset({
          image: classify,
          scale: 30,
          description: "export_disturbance",
          assetId: asset_id_full,
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
cb_full.onChange(function() {
  if (cb_full.getValue() === false) {
    output_full_t.setDisabled(true);
  }
  else {
    output_full_t.setDisabled(false);
  }
});
//-----------------Initialization---------------------
ui.root.clear();
ui.root.add(uiPanel);
mapPanel.setCenter(43.5, 42, 8);