var ut = require('users/shijuanchen32/forest_degradation_georgia:utilities/ut_workflow');
//-----------------User's Interface---------------------
var app_title = ui.Label({value: 'CCDC-SMA APP',
                      style: {width: '100%',fontSize: '30px', color: 'black'} 
                    });
var app_version = ui.Label({value: 'Version: Tropic Collection2',
                      style: {width: '100%',fontSize: '20px', color: 'black'} 
                    });
var app_author = ui.Label('Author: Shijuan Chen           Date: 07/20/2021\
\nThis app runs CCDC-SMA to monitor forest degradation. \
\nThe version requires a forest mask with a positive \
\nvalue (or values) for forest and non-forest being masked.',{whiteSpace: 'pre'});
var thre_label = ui.Label('Threshold      ', {width: '200px'});
var thre = ui.Textbox({
    placeholder: "Threshold of detecting forest degradation",
    value: '2600',
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
    value: '5',
    style:{stretch: 'horizontal', backgroundColor: 'rgba(255, 255, 255, 0.0)'}
  });
var sDate_label = ui.Label('Start year      ', {width: '200px'});
var sDate = ui.Textbox({
    placeholder: "Start year of your study period (yyyy)",
    value: '2000',
    style:{stretch: 'horizontal', backgroundColor: 'rgba(255, 255, 255, 0.0)'}
  });
var eDate_label = ui.Label('End year      ', {width: '200px'});
var eDate = ui.Textbox({
    placeholder: "End year of your study period (yyyy)",
    value: '2020',
    style:{stretch: 'horizontal', backgroundColor: 'rgba(255, 255, 255, 0.0)'}
  })
var sDay_label = ui.Label('Start day of year',{width: '200px'});  
var sDay = ui.Textbox({
    placeholder: "Start day of year (Julian dates)",
    value: '1',
    style:{stretch: 'horizontal', backgroundColor: 'rgba(255, 255, 255, 0.0)'}
  });
var eDay_label = ui.Label('End day of year ',{width: '200px'});  
var eDay = ui.Textbox({
    placeholder: "End day of year (Julian dates)",
    value: '365',
    style:{stretch: 'horizontal', backgroundColor: 'rgba(255, 255, 255, 0.0)'}
  });
//check box to specify which products to export
var cb_full = ui.Checkbox({label: 'Export full segment results (type asset id below)', value: false});
var output_full_t = ui.Textbox({
    placeholder: "GEE asset id of full segment results to export and view",
    value: 'users/shijuanchen32/georgia_public/Laos/test_tropic_full_C2',
    style:{stretch: 'horizontal', backgroundColor: 'rgba(255, 255, 255, 0.0)'}
  });
output_full_t.setDisabled(true);  
var cb_year = ui.Checkbox({label: 'Export first year of disturbance (type asset id below)', value: true});
var output_year_t = ui.Textbox({
    placeholder: "GEE asset id of first disturbance year to export and view",
    value: 'users/shijuanchen32/georgia_public/Laos/test_tropic_first_year_C2',
    style:{stretch: 'horizontal', backgroundColor: 'rgba(255, 255, 255, 0.0)'}
  });
var region_l = ui.Label('GEE asset id of study region');
var region_t = ui.Textbox({
    placeholder: "Study region (split the region if too large)",
    value: 'users/shijuanchen32/georgia_public/Laos/test_region_laos',
    style:{stretch: 'horizontal', backgroundColor: 'rgba(255, 255, 255, 0.0)'}
  });  
var forest_mask_l = ui.Label('GEE asset id of forest mask');
var forest_mask_t = ui.Textbox({
    placeholder: "Forest mask. Forest should be a positive value (or values). Non-forest is NULL.",
    value: 'users/shijuanchen32/georgia_public/Laos/forest_mask',
    style:{stretch: 'horizontal', backgroundColor: 'rgba(255, 255, 255, 0.0)'}
  });  
var runButton = ui.Button({label: 'Run CCDC-SMA', style: {width: '95%'}});
var viewButton = ui.Button({label: 'View first disturbance year', style: {width: '95%'}});
  // map panel
var mapPanel = ui.Map({style: {cursor: 'crosshair'}});
mapPanel.setOptions('SATELLITE');
  // menu panel
var load_region = ui.Button('load data');
var load_mask = ui.Button('load data');
var thre_panel = ui.Panel([thre_label, thre], ui.Panel.Layout.Flow('horizontal'));
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
var mask_panel = ui.Panel([forest_mask_t,load_mask], ui.Panel.Layout.Flow('horizontal'));
var view_results_l = ui.Label('GEE asset id of disturbance year to display');
var view_results_t = ui.Textbox({
    placeholder: "GEE asset id of disturbance year to display",
    value: 'users/shijuanchen32/georgia_public/Laos/test_tropic_first_year_C2',
    style:{stretch: 'horizontal', backgroundColor: 'rgba(255, 255, 255, 0.0)'}
  }); 
var view_full_l = ui.Label('GEE asset id of multiple disturbance years to display');
var view_full_t = ui.Textbox({
    placeholder: "GEE asset id of multiple disturbance years to display",
    value: 'users/shijuanchen32/georgia_public/Laos/test_tropic_full_C2',
    style:{stretch: 'horizontal', backgroundColor: 'rgba(255, 255, 255, 0.0)'}
  });  
var view_full_Button = ui.Button({label: 'View multiple disturbance years', style: {width: '95%'}});
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
                        setting, start_date, end_date, start_day, end_day, thre_panel, prob_panel, consec_panel, 
                        output, cb_year, output_year_t, 
                        cb_full, output_full_t,
                        runButton, view_results, view_results_l, view_results_t, viewButton, 
                        view_full_l, view_full_t, view_full_Button,
                        app_doc1, app_paper_l, 
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
  mapPanel.addLayer(ee.Image(forest_mask_t.getValue()).updateMask(ee.Image(forest_mask_t.getValue()).gt(0)).selfMask().clip(region_fc), {palette: 'green'}, 'forest_mask');
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
  var viz_min = ee.Number.parse(sDate.getValue()).getInfo();
  var viz_max = ee.Number.parse(eDate.getValue()).getInfo();
  var paletteY = ['#2c7bb6',  '#abd9e9', '#ffffbf', '#fdae61', '#d7191c'];
  var viz = {min:viz_min, max:viz_max, palette: paletteY};
  mapPanel.addLayer(seg_dis.select('S1_tBreak'), viz, '1st_year_disturbance', true);
  mapPanel.addLayer(seg_dis.select('S2_tBreak'), viz, '2nd_year_disturbance', true);
  mapPanel.addLayer(seg_dis.select('S3_tBreak'), viz, '3th_year_disturbance', true);
  mapPanel.addLayer(seg_dis.select('S4_tBreak'), viz, '4th_year_disturbance', true);
  mapPanel.addLayer(seg_dis.select('S5_tBreak'), viz, '5th_year_disturbance', true);
  mapPanel.addLayer(seg_dis.select('S6_tBreak'), viz, '6th_year_disturbance', true);   
  var legend = ut.generateColorbarLegend(viz_min, viz_max, paletteY, 'horizontal', 'Disturbance year');
  mapPanel.add(legend);
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
  var ch_prob = ee.Number.parse(prob.getValue()).getInfo();
  var ccdc_params = ee.Dictionary({
  'consec': ee.Number.parse(consec.getValue()).getInfo(),
  'chi_prob': ch_prob,
  'min_year':1.33,
  'break_bands':['NDFI', 'GV', 'NPV', 'Soil']
   });
  var endMembers = {
    gv: [500, 900, 400, 6100, 3000, 1000],
    npv: [1400, 1700, 2200, 3000, 5500, 3000],
    soil: [2000, 3000, 3400, 5800, 6000, 5800],
    shade: [0, 0, 0, 0, 0, 0],
    cloud: [9000, 9600, 8000, 7800, 7200, 6500],
    cfThreshold: 0.05
  };
  var forest_mask = ee.Image(forest_mask_t.getValue()).updateMask(ee.Image(forest_mask_t.getValue()).gt(0)).selfMask();
  var ccdPeriod = ee.Dictionary({'start': start_date, 'end': end_date,
  'start_day':study_period.get('start_day'), 'end_day':study_period.get('end_day')});
  var SMA_c2 = ccdc_SMA_utlis.getLandsatTS(saveRegion, ccdPeriod, endMembers, false);
  var ccdc_sma = ee.Algorithms.TemporalSegmentation.Ccdc({
                dateFormat: 1,
                collection: SMA_c2,  
                minObservations: ccdc_params.get('consec'),
                chiSquareProbability: ccdc_params.get('chi_prob'),
                minNumOfYearsScaler: ccdc_params.get('min_year'),
                breakpointBands:ccdc_params.get('break_bands') });
  var threshold = ee.Number.parse(thre.getValue()).getInfo();
  var classify = ccdc_SMA_utlis.classifySegments_tropic(saveRegion, ccdc_sma, forest_mask, ee.Number(study_period.get('start_year')), threshold, ch_prob);
//  print(classify);
  //get annual results
  var start_year = study_period.get('start_year').getInfo();
  var end_year = study_period.get('end_year').getInfo();
  var year_change_first = ee.ImageCollection([
                          classify.select('S1_tBreak').toInt().rename('year'),classify.select('S2_tBreak').toInt().rename('year'),
                          classify.select('S3_tBreak').toInt().rename('year'),classify.select('S4_tBreak').toInt().rename('year'),
                          classify.select('S5_tBreak').toInt().rename('year'),classify.select('S6_tBreak').toInt().rename('year')]).min().toInt().rename('year');
  return ee.ImageCollection([year_change_first, classify]);
};
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
mapPanel.setCenter(102.8, 20.1, 8);