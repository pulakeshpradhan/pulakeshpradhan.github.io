var bandhayekhakiYaz = ui.import && ui.import("bandhayekhakiYaz", "table", {
      "id": "users/bagherimhb/bandhaye_khaki"
    }) || ee.FeatureCollection("users/bagherimhb/bandhaye_khaki"),
    CITY2 = ui.import && ui.import("CITY2", "table", {
      "id": "users/bagherimhb/political_boundries/shahrestan_LINE"
    }) || ee.FeatureCollection("users/bagherimhb/political_boundries/shahrestan_LINE"),
    bandhaye_khaki_bufer5000m = ui.import && ui.import("bandhaye_khaki_bufer5000m", "table", {
      "id": "users/bagherimhb/bandhaye_khaki_bufer5000m"
    }) || ee.FeatureCollection("users/bagherimhb/bandhaye_khaki_bufer5000m"),
    border = ui.import && ui.import("border", "table", {
      "id": "users/bagherimhb/political_boundries/Yazd_boundry_polygone"
    }) || ee.FeatureCollection("users/bagherimhb/political_boundries/Yazd_boundry_polygone"),
    Yazd_City_Line = ui.import && ui.import("Yazd_City_Line", "table", {
      "id": "projects/ee-bagherimhb1/assets/Yazd_OSM/Yazd_City_Line"
    }) || ee.FeatureCollection("projects/ee-bagherimhb1/assets/Yazd_OSM/Yazd_City_Line"),
    bandhaye_khaki_bufer2000m = ui.import && ui.import("bandhaye_khaki_bufer2000m", "table", {
      "id": "users/bagherimhb/bandhaye_khaki_bufer2000m"
    }) || ee.FeatureCollection("users/bagherimhb/bandhaye_khaki_bufer2000m"),
    bandhaye_khaki_buffer2200m = ui.import && ui.import("bandhaye_khaki_buffer2200m", "table", {
      "id": "users/bagherimhb/bandhaye_khaki_buffer2200m"
    }) || ee.FeatureCollection("users/bagherimhb/bandhaye_khaki_buffer2200m");
/////////////////////////////////////////////////////////////////////
//Add run button
//var widget = ui.Button({label: 'A ui.Button', style: {width: '400px'}});
var widget = ui.Button({label: 'با سلام.... لطفا برای اجرای کد کلیک نمائید', style: {width: '400px', fontSize: '39px', color: 'blue'}});
widget.style().set('backgroundColor', 'lightgray');
var widgetStyle = widget.style();
widgetStyle.set({border: '1px solid darkgray'});
//var button_run = ui.Button('Run analysis');
var button_run = widget;
button_run.onClick(function(){
      Map.clear()
      get_alerts();
      Map.add(panel);
    });
//var button_clear = ui.Button('Clear');
var button_clear = ui.Button('پاکسازی');
        button_clear.onClick(function(){
         clearResults();
    });
//var panel = ui.Panel([button_run, button_clear],ui.Panel.Layout.flow("horizontal"))
var panel = ui.Panel([button_run],ui.Panel.Layout.flow("horizontal"))
Map.add(panel);
//function clearResults(){
 // Map.clear()
 // Map.add(panel);
//};
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
function get_alerts(){ 
var aoi = /* color: #d63000 */ee.Geometry.Point([53.99065064757668,31.7406508880321]);
var aoi =bandhayekhakiYaz;
var aoi =border;;
var before_start= '2022-07-01';
var before_end='2022-07-20';
var after_start= '2022-07-28';
var after_end='2022-08-10';
var point =aoi;
var buffer_meter=4000;
var bartStations = ee.FeatureCollection(point);
var buffered = bartStations.map(function(f) {return f.buffer(buffer_meter, 100);});
var aoi=buffered
// Add two maps to the screen.
var left = ui.Map();
ui.root.clear();
ui.root.add(left);
left.setOptions('terrain');
///////SENTINEL 2
////S2_SR_Level-2A
function maskS2clouds(image) {
  var qa = image.select('QA60');
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask).divide(10000);}
var dataset = ee.ImageCollection('COPERNICUS/S2_SR')
    .filterBounds(aoi)
    .filterDate(before_start,before_end)
    .map(function(image){return image.clip(aoi)}) 
                      // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',20))
                  .map(maskS2clouds) ;
var visualization = {  min: 0.15,  max: 0.4,
  bands: ['B4', 'B3', 'B2'],};
left.addLayer(dataset.mean(), visualization, 'S2_SR_Level-2A_BEFORE');
var best=ee.Image(dataset.sort('CLOUD_COVER').first());
print('Least Cloudy Image SENTINEL 2_BEFORE',best);
var widget = ui.Label({
  //value: 'AFTER FLOOD',
// value: 'قبل از سیلاب مرداد 1401
 value: 'قبل از سیل مردادماه 1401',
  style: {width: '300px', height: '30px', fontSize: '20px', color: 'blue'}});
left.add(widget);
widget.style().set('backgroundColor', 'lightgray');
var widgetStyle = widget.style();
widgetStyle.set({border: '1px solid darkgray'});
//var title = ui.Label('Developed By:');
//title.style().set('position', 'bottom-right');
//left.add(title);
///********************************************************************
////*****************************************************************
var right = ui.Map();
ui.root.add(right);
right.setOptions('terrain');
//S2_SR_Level-2A
var dataset = ee.ImageCollection('COPERNICUS/S2_SR')
    .filterBounds(aoi)
    .filterDate(after_start,after_end)
    .map(function(image){return image.clip(aoi)}) 
                      // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',20))
                  .map(maskS2clouds) ;
var visualization = {  min: 0.15,  max: 0.4,
  bands: ['B4', 'B3', 'B2'],};
right.addLayer(dataset.mean(), visualization, 'S2_SR_Level-2A_AFTER');
var best=ee.Image(dataset.sort('CLOUD_COVER').first());
print('Least Cloudy Image SENTINEL 2_after',best);
var widget = ui.Label({
  //value: 'AFTER FLOOD',
  //value: 'بعد از سیلاب مرداد 14
  value: 'بعد از سیل مردادماه 1401',
  style: {width: '300px', height: '30px', fontSize: '20px', color: 'blue'}});
right.add(widget);
widget.style().set('backgroundColor', 'lightgray');
var widgetStyle = widget.style();
widgetStyle.set({border: '1px solid darkgray'});
//var title = ui.Label('');
var title = ui.Label('معاونت حفاظت و بهره برداری');
title.style().set('position', 'bottom-right');
right.add(title);
var title = ui.Label('---  شرکت آب منطقه ای یزد  ---');
title.style().set('position', 'bottom-right');
right.add(title);
//**********************************************************************
// Link the "change-bounds" event for the maps.
// When the user drags one map, the other will be moved in sync.
//ui.Map.Linker([left, right], 'change-bounds');
ui.Map.Linker([left, right], 'change-bounds');
var aoi = /* color: #d63000 */ee.Geometry.Point([53.99065064757668,31.7406508880321]);
right.addLayer(Yazd_City_Line,
             {'color': 'black'},
             'marz e Shahrestanha');
left.addLayer(Yazd_City_Line,
             {'color': 'black'},
             'marz e Shahrestanha');     
 var point =bandhayekhakiYaz;
var buffer_meter=5;
var bartStations = ee.FeatureCollection(point);
var buffered = bartStations.map(function(f) {return f.buffer(buffer_meter, 100);});
//polygons = ee.FeatureCollection(buffered);
var styling = {color: 'blue',width: 3, fillColor: 'white'};
//right.addLayer(buffered.style(styling),{},'bandhayekhakiYaz',1)             
//left.addLayer(buffered.style(styling),{},'bandhayekhakiYaz',1)               
right.addLayer(bandhaye_khaki_buffer2200m.style(styling),{},'bandhayekhakiYazd_beffer',1)             
left.addLayer(bandhaye_khaki_buffer2200m.style(styling),{},'bandhayekhakiYazd_buffer',1)   
left.centerObject(border, 8);
right.centerObject(border, 8);
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
};