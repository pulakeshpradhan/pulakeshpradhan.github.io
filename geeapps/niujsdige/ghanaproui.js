// ----- This script is used to build interface of ghana project -----
// ----- Created by Quandi, 2021/08/17 -----
// ###### Load modes ######
// ----------------------------------------------------------------------------------------------------------------
var s2_datapro = require('users/niujsdige/sharedFunc:RSDataFunc/S2_DataPro');
// ----------------------------------------------------------------------------------------------------------------
// ###### define the study area and corresponding maize mask ######
// ----------------------------------------------------------------------------------------------------------------
// var imgCol_Countries = ee.FeatureCollection("USDOS/LSIB/2017");
// var study_area = imgCol_Countries.filter(ee.Filter.eq('COUNTRY_NA', 'Ghana'));
var cities = ee.FeatureCollection("FAO/GAUL/2015/level2");
var ghana_district = cities.filter(ee.Filter.eq('ADM0_NAME', 'Ghana'));
var northern_district = ghana_district.filter(ee.Filter.eq('ADM1_NAME', 'Northern'));
var study_area = northern_district;
var maize_imgCol = ee.ImageCollection('users/xianda19/classification_result/2021/Ghana/maize_20210501_20211011_100percentSamples');
var maize_img = maize_imgCol.mosaic().selfMask();
var visParam = {
  min:0,
  max:1,
  palette: ['ffffff', 'ffab40']
};
// ----------------------------------------------------------------------------------------------------------------
// ##### the functions used below ######
// ----------------------------------------------------------------------------------------------------------------
// *** Function to mask clouds using the Sentinel-2 QA band. ***
function maskS2clouds(image) {
  var qa = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0).and(
             qa.bitwiseAnd(cirrusBitMask).eq(0));
  // Return the masked and scaled data, without the QA bands.
  return image.updateMask(mask).divide(10000)
      .select("B.*")
      .copyProperties(image, ["system:time_start", "PRODUCT_ID"]);
}
var getSpeVI = function(vi_index){
  // *** return func ***
  var vi_func, vi_palatte, vi_bands;
  switch (vi_index)
  {
    case 'ndvi':
      vi_func = s2_datapro.getS2NDVI;
      vi_palatte = {min:0, max:1, palette: ['ffffff', '0b6b07']};
      vi_bands = 'ndvi';
      break;
    case 'evi':
      vi_func = s2_datapro.getS2EVI;
      vi_palatte = {min:0, max:1, palette: ['ffffff', '0b6b07']};
      vi_bands = 'evi';
      break;
    case 'lswi':
      vi_func = s2_datapro.getS2LSWI;
      vi_palatte = {min:-1, max:1, palette: ['ffffff', '16499e']};
      vi_bands = 'lswi';
      break;
    case 'red/green/blue':
      vi_func = function(image){
        return image.select(['B4', 'B3', 'B2']);
      };
      vi_palatte = {min:0, max:0.3, bands:['B4', 'B3', 'B2']};
      vi_bands = ['B4', 'B3', 'B2'];
      break;
    case 'nir/red/green':
      vi_func = function(image){
        return image.select(['B8', 'B4', 'B3']);
      };
      vi_palatte = {min:0, max:0.3, bands:['B8', 'B4', 'B3']};
      vi_bands = ['B8', 'B4', 'B3'];
      break;
    case 'nir/swir1/swir2':
      vi_func = function(image){
        return image.select(['B8', 'B11', 'B12']);
      };
      vi_palatte = {min:0, max:0.3, bands:['B8', 'B11', 'B12']};
      vi_bands = ['B8', 'B11', 'B12'];
      break;
    default:
      return 0;
  }
  var vi_spe = {
    vi_func: vi_func,
    vi_palatte: vi_palatte,
    vi_bands: vi_bands
  };
  return vi_spe;
};
var ndvi_visParam = {
  min:0,
  max:1,
  palette: ['ffffff', '0b6b07']
};
// ----------------------------------------------------------------------------------------------------------------
// ###### the style of widgets ######
// ----------------------------------------------------------------------------------------------------------------
var panel_left_style = {
  height: '100%',
  width: '80%',
  position: 'top-center'
};
var panel_right_style = {
  height: '100%',
  width: '20%',
  minWidth: '100px',
  maxWidth: '30%'
};
var dateslider_style = {
  padding: '10px',
  width: '80%',
  backgroundColor: '#dddddd',
  whiteSpace: 'pre'
};
var module_button_style = {
  height: '22px',
  width: '70px',
  margin: '3px',
  backgroundColor: '#4888ef',
  color: '#4888ef',
  // padding: '0px',
  // fontSize: '24px'
  fontWeight: '200'
  // whiteSpace: 'pre'
};
var act_button_style = {
  height: '22px',
  width: '70px',
  margin: '3px',
  backgroundColor: '#4888ef',
  color: '#000000',
  // padding: '0px',
  // fontSize: '24px'
  fontWeight: '200'
  // whiteSpace: 'pre'
};
var sub_button_style = {
  height: '45px',
  width: '80px',
  margin: '3px',
  color: '#4888ef',
  // padding: '50px, 50px, 50px, 50px',
  // fontSize: '36px',
  fontWeight: '200',
  // whiteSpace: 'pre'
};
var panel_v1_style = {
  height: '25px',
  width: '100%',
  position: 'top-center',
  backgroundColor: '#4888ef',
};
var panel_v2_style = {
  height: '100%',
  width: '100%',
  minWidth: '100px',
};
var dataselect_style = {
  height: '30px',
  width: '80%',
  margin: '3px',
  fontWeight: '200'
};
var datalabel_style = {
  height: '100px',
  width: '80%',
  backgroundColor: '#dddddd',
};
// ----------------------------------------------------------------------------------------------------------------
// ###### deploy the widgets ######
// ----------------------------------------------------------------------------------------------------------------
// *** clear the contents ***
ui.root.clear();
// ###### add the split panel ######
var panel_left = ui.Panel({layout: ui.Panel.Layout.flow('vertical')});
panel_left.style().set(panel_left_style);
var panel_right = ui.Panel({layout: ui.Panel.Layout.flow('vertical')});
panel_right.style().set(panel_right_style);
var splitPanel = ui.SplitPanel({
  firstPanel: panel_left,
  secondPanel: panel_right,
  orientation: 'horizontal', //horizontal layout
  wipe: false //
});
ui.root.add(splitPanel);
// *** add widgets to left panel ***
var map = ui.Map();
panel_left.add(map);
map.addLayer(study_area, {}, 'study_area');
map.centerObject(study_area, 8);
// *** add widgets to right panel ***
var panel_v1 = ui.Panel({layout: ui.Panel.Layout.flow('horizontal')});
panel_v1.style().set(panel_v1_style);
// *** add modules to panel_v_1 ***
var button_query = ui.Button('Data query');
button_query.style().set(act_button_style);
// button_query.style().set({position:'bottom-right'});
panel_v1.add(button_query);
var button_cla = ui.Button('Cla res');
button_cla.style().set(module_button_style);
panel_v1.add(button_cla);
var button_yield = ui.Button('Yield res');
button_yield.style().set(module_button_style);
panel_v1.add(button_yield);
panel_right.add(panel_v1);
// ###### add contents to panel_v2 ######
var panel_v2 = ui.Panel({layout: ui.Panel.Layout.flow('vertical')});
// panel_v2.style().set(panel_v2_style);
panel_right.add(panel_v2);
// *** panel query ***
var panel_query = ui.Panel({layout: ui.Panel.Layout.flow('vertical')});
// panel_query.style().set(panel_v2_style);
var label_startDate = ui.Label('Start date:');
var label_endDate = ui.Label('End date:');
var date_now = ee.Date(Date.now());
var date_start = date_now.advance(-3, 'year');
var date_slider_start = ui.DateSlider(date_start, date_now, ee.Date('2020-02-15'));
date_slider_start.style().set(dateslider_style);
var date_slider_end = ui.DateSlider(date_start, date_now, ee.Date('2020-3-15'));
date_slider_end.style().set(dateslider_style);
var query_label = ui.Label('Click the button to query the sentinel2 images.');
var query_sub_button = ui.Button('Submit');
query_sub_button.style().set(sub_button_style);
var panel_dateSlider = ui.Panel({layout: ui.Panel.Layout.flow('vertical')});
// panel_dateSlider.style().set(panel_v2_style);
panel_dateSlider.add(label_startDate);
panel_dateSlider.add(date_slider_start);
panel_dateSlider.add(label_endDate);
panel_dateSlider.add(date_slider_end);
panel_v2.add(panel_dateSlider);
// panel_query.add(label_startDate);
// panel_query.add(date_slider_start);
// panel_query.add(label_endDate);
// panel_query.add(date_slider_end);
var data_label = ui.Label({
  style: datalabel_style
});
// panel_query.add(data_label);
panel_query.add(ui.Label());
panel_query.add(query_label);
panel_query.add(query_sub_button);
panel_v2.add(panel_query);
// *** panel cla ***
var panel_cla = ui.Panel({layout: ui.Panel.Layout.flow('vertical')});
// panel_cla.style().set(panel_v2_style);
var vi_select = ui.Select(['ndvi', 'lswi', 'evi', 'red/green/blue', 'nir/red/green', 'nir/swir1/swir2'], 'ndvi', 'ndvi');
vi_select.style().set(dataselect_style);
var cla_sub_button = ui.Button('Submit');
cla_sub_button.style().set(sub_button_style);
var vi_label = ui.Label('Select a vegetation index.');
// panel_cla.add(label_startDate);
// panel_cla.add(date_slider_start);
// panel_cla.add(label_endDate);
// panel_cla.add(date_slider_end);
// panel_cla.add(ui.Label());
panel_cla.add(vi_label);
panel_cla.add(vi_select);
panel_cla.add(ui.Label());
panel_cla.add(cla_sub_button);
// *** panel yield ***
var panel_yield = ui.Panel({layout: ui.Panel.Layout.flow('vertical')});
panel_yield.style().set(panel_v2_style);
var yield_sub_button = ui.Button('Submit');
yield_sub_button.style().set(sub_button_style);
panel_yield.add(yield_sub_button);
// ----------------------------------------------------------------------------------------------------------------
// ###### search the data to visualize ######
// ----------------------------------------------------------------------------------------------------------------
// *** the click function of submit button in data query page ***
query_sub_button.onClick(function(){
  // *** filter the s2 images ***
  var startDate = date_slider_start.getValue();
  var endDate = date_slider_end.getValue();
  startDate = ee.Date(ee.List(startDate).get(0));
  endDate = ee.Date(ee.List(endDate).get(1));
  var dataset = ee.ImageCollection('COPERNICUS/S2_SR')
                  .filterBounds(study_area)
                  .filterDate(startDate, endDate)
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 60))
                  .map(maskS2clouds)
                  .select(['B4', 'B3', 'B2']);
  var feaCol = dataset.map(function(image){
    return ee.Feature(image.geometry());
  });
  // print('feaCol: ', feaCol);
  feaCol = ee.FeatureCollection(feaCol);
  var visualization = {
    min: 0.0,
    max: 0.3,
    bands: ['B4', 'B3', 'B2'],
  };
  print('startDate: ', startDate);
  print('endDate: ', endDate);
  print('dataset: ', dataset.aggregate_array('PRODUCT_ID'));
  var empty = ee.Image().byte();
  var outline = empty.paint({
    featureCollection: feaCol,
    color: 1,
    width: 2
  });
  var image = dataset.median().clip(study_area);
  map.addLayer(image, visualization, 's2_dataset');
  map.addLayer(outline, {palette: '00FF00'}, 'outline');
});
// *** the click function of submit button in classification page *** 
cla_sub_button.onClick(function(){
  // *** add the split panel and map ***
  var left_map = ui.Map();
  var right_map = ui.Map();
  ui.Map.Linker([left_map, right_map], "change-bounds");
  var splitPanel_v1 = ui.SplitPanel({
    firstPanel: left_map,
    secondPanel: right_map,
    orientation: 'horizontal',
    wipe: false
  });
  panel_left.clear();
  panel_left.add(splitPanel_v1);
  // *** calculate the vegetation index ***
  var vi_index = vi_select.getValue();
  print('vi_index: ', vi_index);
  var vi_spe = getSpeVI(vi_index);
  var vi_func = vi_spe.vi_func;
  // print(vi_func);
  var vi_palatte = vi_spe.vi_palatte;
  var vi_bands = vi_spe.vi_bands;
  var startDate = date_slider_start.getValue();
  var endDate = date_slider_end.getValue();
  startDate = ee.Date(ee.List(startDate).get(0));
  endDate = ee.Date(ee.List(endDate).get(1));
  var dataset = ee.ImageCollection('COPERNICUS/S2_SR')
                  .filterBounds(study_area)
                  .filterDate(startDate, endDate)
                  .map(maskS2clouds)
                  // .map(s2_datapro.getS2NDVI);
                  .map(vi_func);
  print(dataset);
  right_map.addLayer(dataset.select(vi_bands).median().clip(study_area), vi_palatte, vi_index);                
  // left_map.addLayer(study_area, {}, 'study_area');
  left_map.addLayer(maize_img, visParam, 'maize_img');
  left_map.centerObject(study_area, 8);
  // right_map.addLayer(study_area, {}, 'study_area');
});
// ----------------------------------------------------------------------------------------------------------------
// ###### Display the classification reslut ######
// ----------------------------------------------------------------------------------------------------------------
var panel_index = 'panel_query';
button_query.onClick(function(){
  if (panel_index != 'panel_query'){
    button_query.style().set(act_button_style);
    button_cla.style().set(module_button_style);
    button_yield.style().set(module_button_style);
    // panel_v2.clear();
    // panel_v2.add(panel_dateSlider);
    panel_v2.remove(panel_cla);
    panel_v2.add(panel_query);
    panel_index = 'panel_query';
  }
});
button_cla.onClick(function(){
  if (panel_index != 'panel_cla'){
    button_cla.style().set(act_button_style);
    button_query.style().set(module_button_style);
    button_yield.style().set(module_button_style);
    // panel_v2.clear();
    // panel_v2.add(panel_dateSlider);
    panel_v2.remove(panel_query);
    panel_v2.add(panel_cla);
    panel_index = 'panel_cla';
  }
});
button_yield.onClick(function(){
  if (panel_index != 'panel_yield'){
    button_yield.style().set(act_button_style);
    button_query.style().set(module_button_style);
    button_cla.style().set(module_button_style);
    panel_v2.remove(panel_query);
    panel_v2.remove(panel_cla);
    panel_index = 'panel_yield'; 
  }
});
// ----------------------------------------------------------------------------------------------------------------
// var date_now = ee.Date(Date.now());
// var date_start = date_now.advance(-3, 'year');
// print(date_now);
// var date_slider = ui.DateSlider(date_start, date_now);
// print(date_slider.getStart());
// // print(date_slider.)
// // Map.add(date_slider);
// var panel_h_2 = ui.Panel({layout: ui.Panel.Layout.flow('horizontal')});
// panel_h_2.style().set({
//   height: '100%',
//   width: '20%'
// });
// panel_h_2.add(ui.Map());
// ui.root.add(panel_h_2);
// var panel = ui.Panel({
//   layout: ui.Panel.Layout.flow('vertical')
// });
// panel.style().set({
//   width: '300px',
//   position: 'bottom-left',
//   height: '430px'
// });
// var label_startDate = ui.Label('Start Date:');
// var label_endDate = ui.Label('End Date:');
// var date_slider_v1 = ui.DateSlider(date_start, date_now);
// var button = ui.Button('Submit');
// panel.add(label_startDate);
// panel.add(date_slider);
// panel.add(label_endDate);
// panel.add(date_slider_v1);
// panel.add(button);
// panel_h_2.add(panel);
// // Map.add(panel);
// // ui.root.add(panel);
// print(ui.root.getLayout());
// // ui.root.add(Map);
// Map.addLayer(study_area, {}, 'study_area');
// Map.centerObject(study_area, 7);