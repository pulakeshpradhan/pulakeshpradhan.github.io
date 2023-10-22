////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Generate cloud masked Sentinel-2 (S2) mosaic
// The Sentinel-2 QA band is used to cloud mask the collection. S2 cloud flags are less selective;
// the collection is also pre-filtered by the CLOUDY_PIXEL_PERCENTAGE flag.
// This script is modified from the original in Google's *Examples* repository.
// Last modified: 10 May 2019
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var x = require('users/servirbz/packages:bz/bz');
var roi = x.bz_poly;
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Function to mask clouds using the Sentinel-2 QA band
function maskS2clouds(image) {
  var qa = image.select('QA60');
  var cloudBitMask = ee.Number(2).pow(10).int();
  var cirrusBitMask = ee.Number(2).pow(11).int();
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0).and(qa.bitwiseAnd(cirrusBitMask).eq(0)); // both flags set to 0, indicating clear conditions
  return image.updateMask(mask).select("B.*").copyProperties(image, ["system:time_start"]);} // masked and scaled data, without the QA bands
var s2 = ee.ImageCollection('COPERNICUS/S2').filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20)).map(maskS2clouds);
var s2_ = ee.ImageCollection('COPERNICUS/S2_SR');
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var s2_2018 = s2.filterDate('2018-01-01', '2018-12-31').median();
var s2_2018t1 = s2.filterDate('2018-01-01', '2018-05-31').median();
var s2_2017t1 = s2.filterDate('2017-01-01', '2017-05-31').median();
/////////
var s2_20190420 = s2_.filterDate('2019-04-19', '2019-04-21').median();
var s2_201904 = s2.filterDate('2019-04-01', '2019-04-30').median();
var s2_201903 = s2.filterDate('2019-03-01', '2019-03-31').median();
var s2_201902 = s2.filterDate('2019-02-01', '2019-02-28').median();
var s2_201901 = s2.filterDate('2019-01-01', '2019-01-31').median();
var s2_201812 = s2.filterDate('2018-12-01', '2018-12-31').median();
var s2_201811 = s2.filterDate('2018-11-01', '2018-11-30').median();
var s2_201810 = s2.filterDate('2018-10-01', '2018-10-31').median();
var s2_201809 = s2.filterDate('2018-09-01', '2018-09-30').median();
var s2_201808 = s2.filterDate('2018-08-01', '2018-08-31').median();
var s2_201807 = s2.filterDate('2018-07-01', '2018-07-31').median();
var s2_201806 = s2.filterDate('2018-06-01', '2018-06-30').median();
var s2_201805 = s2.filterDate('2018-05-01', '2018-05-31').median();
var s2_201804 = s2.filterDate('2018-04-01', '2018-04-30').median();
var s2_201803 = s2.filterDate('2018-03-01', '2018-03-31').median();
var s2_201802 = s2.filterDate('2018-02-01', '2018-02-28').median();
var s2_201801 = s2.filterDate('2018-01-01', '2018-01-31').median();
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Display the results
//Map.addLayer(s2_2018.clip(roi), {bands: ['B11', 'B8', 'B4'], min: 300, max: 4550}, 'S2_2018_mosaic', false);
//Map.addLayer(s2_2017t1.clip(roi), {bands: ['B11', 'B8', 'B4'], min: 300, max: 4550}, 'S2_Dry2017_mosaic', false);
//Map.addLayer(s2_2018t1.clip(roi), {bands: ['B11', 'B8', 'B4'], min: 300, max: 4550}, 'S2_Dry2018_mosaic', false);
//Map.addLayer(x.land_water,{min:0,max:2,palette:['0000FF','FFFFFF','0000FF']},'land_water_mask', false);
Map.addLayer(x.land_water,{min:0,max:2,palette:['FFFFFF']},'land_water_mask', false);
Map.addLayer(s2_20190420.clip(roi), {bands: ['B11', 'B8', 'B4'], min: 300, max: 4550}, 'S2_20190420_mosaic', true);
/*
Map.addLayer(s2_201904.clip(roi), {bands: ['B11', 'B8', 'B4'], min: 300, max: 4550}, 'S2_201904_mosaic', false);
Map.addLayer(s2_201903.clip(roi), {bands: ['B11', 'B8', 'B4'], min: 300, max: 4550}, 'S2_201903_mosaic', false);
Map.addLayer(s2_201902.clip(roi), {bands: ['B11', 'B8', 'B4'], min: 300, max: 4550}, 'S2_201902_mosaic', false);
Map.addLayer(s2_201901.clip(roi), {bands: ['B11', 'B8', 'B4'], min: 300, max: 4550}, 'S2_201901_mosaic', false);
Map.addLayer(s2_201812.clip(roi), {bands: ['B11', 'B8', 'B4'], min: 300, max: 4550}, 'S2_201812_mosaic', false);
Map.addLayer(s2_201811.clip(roi), {bands: ['B11', 'B8', 'B4'], min: 300, max: 4550}, 'S2_201811_mosaic', false);
Map.addLayer(s2_201810.clip(roi), {bands: ['B11', 'B8', 'B4'], min: 300, max: 4550}, 'S2_201810_mosaic', false);
Map.addLayer(s2_201809.clip(roi), {bands: ['B11', 'B8', 'B4'], min: 300, max: 4550}, 'S2_201809_mosaic', false);
Map.addLayer(s2_201808.clip(roi), {bands: ['B11', 'B8', 'B4'], min: 300, max: 4550}, 'S2_201808_mosaic', false);
Map.addLayer(s2_201807.clip(roi), {bands: ['B11', 'B8', 'B4'], min: 300, max: 4550}, 'S2_201807_mosaic', false);
Map.addLayer(s2_201806.clip(roi), {bands: ['B11', 'B8', 'B4'], min: 300, max: 4550}, 'S2_201806_mosaic', false);
Map.addLayer(s2_201805.clip(roi), {bands: ['B11', 'B8', 'B4'], min: 300, max: 4550}, 'S2_201805_mosaic', false);
Map.addLayer(s2_201804.clip(roi), {bands: ['B11', 'B8', 'B4'], min: 300, max: 4550}, 'S2_201804_mosaic', false);
Map.addLayer(s2_201803.clip(roi), {bands: ['B11', 'B8', 'B4'], min: 300, max: 4550}, 'S2_201803_mosaic', false);
Map.addLayer(s2_201802.clip(roi), {bands: ['B11', 'B8', 'B4'], min: 300, max: 4550}, 'S2_201802_mosaic', false);
Map.addLayer(s2_201801.clip(roi), {bands: ['B11', 'B8', 'B4'], min: 300, max: 4550}, 'S2_201801_mosaic', false);
*/
Map.addLayer(x.pa_cam.clip(x.bz),{palette: "yellow"},"protected_areas", true);
Map.addLayer(x.bnds_w2.clip(x.bz),{palette: "black"},"Int'l Borders", true);
Map.centerObject(roi, 9); // focus to zoom level 8
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var text1 = ui.Label({
  value: 'This app displays Copernicus Sentinel-2 imagery of Belize.',
  style: {position: 'middle-left', width: '400px', whiteSpace: 'pre-wrap', fontWeight: 'bold', fontSize: '14px'},});
var text2 = ui.Label({
  value: 'credit: contains modified European Space Agency / Copernicus Sentinel data',
  style: {position: 'bottom-left', width: '400px', whiteSpace: 'pre-wrap', fontSize: '12px'},});
var close_button = ui.Button({label: 'X', style: {position: 'top-right', color: 'red', fontWeight: 'bold'},});
var dialog_box = ui.Panel({
  layout: ui.Panel.Layout.absolute(),
  widgets: [close_button, text1, text2],
  style: {width: '420px', height: '160px'},
  });
Map.add(dialog_box);
close_button.onClick( function() {dialog_box.style().set('shown', false); });
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////