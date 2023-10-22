////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Generate cloud masked Sentinel-2 (S2) mosaic
// The Sentinel-2 QA band is used to cloud mask the collection. S2 cloud flags are less selective;
// the collection is also pre-filtered by the CLOUDY_PIXEL_PERCENTAGE flag.
// This script is modified from the original in Google's *Examples* repository.
// Last modified: 10 May 2019
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var x = require('users/servirbz/packages:bz/bz');
var roi = x.bz_poly;
var roi2 = x.bz_cbc;
var roi2_ = x.bz_cbc_;
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Function to mask clouds using the Sentinel-2 QA band
function maskS2clouds(image) {
  var qa = image.select('QA60');
  var cloudBitMask = ee.Number(2).pow(10).int();
  var cirrusBitMask = ee.Number(2).pow(11).int();
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0).and(qa.bitwiseAnd(cirrusBitMask).eq(0)); // both flags set to 0, indicating clear conditions
  return image.updateMask(mask).select("B.*").copyProperties(image, ["system:time_start"]);} // masked and scaled data, without the QA bands
var s2 = ee.ImageCollection('COPERNICUS/S2');
var s2_ = ee.ImageCollection('COPERNICUS/S2_SR');
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var s2_20190420 = s2_.filterDate('2019-04-19', '2019-04-21').median();
var s2_20181201 = s2.filterDate('2018-11-30', '2018-12-02').median();
var s2_20180301 = s2.filterDate('2018-02-28', '2018-03-02').median();
var s2_20180110 = s2.filterDate('2018-01-09', '2018-01-11').median();
var s2_20170515 = s2.filterDate('2017-05-14', '2017-05-16').median();
var s2_20170425 = s2.filterDate('2017-04-24', '2017-04-26').median();
var s2_20170224 = s2.filterDate('2017-02-23', '2017-02-25').median();
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Display the results
//Map.addLayer(x.land_water,{min:0,max:2,palette:['FFFFFF']},'land_water_mask', false);
//Map.addLayer(s2_20170224.clip(roi), {bands: ['B11', 'B8', 'B4'], min: 300, max: 4550}, 'S2_2017-02-24_mosaic', false);
//Map.addLayer(s2_20170425.clip(roi), {bands: ['B11', 'B8', 'B4'], min: 300, max: 4550}, 'S2_2017-04-25_mosaic', false);
//Map.addLayer(s2_20170515.clip(roi), {bands: ['B11', 'B8', 'B4'], min: 300, max: 4550}, 'S2_2017-05-15_mosaic', false);
Map.addLayer(s2_20180110.clip(roi), {bands: ['B11', 'B8', 'B4'], min: 300, max: 4550}, 'S2_2018-01-10_mosaic', false);
//Map.addLayer(s2_20180301.clip(roi), {bands: ['B11', 'B8', 'B4'], min: 300, max: 4550}, 'S2_2018-03-01_mosaic', false);
Map.addLayer(s2_20181201.clip(roi), {bands: ['B11', 'B8', 'B4'], min: 300, max: 4550}, 'S2_2018-12-01_mosaic', false);
Map.addLayer(s2_20190420.clip(roi), {bands: ['B11', 'B8', 'B4'], min: 300, max: 4550}, 'S2_2019-04-20_mosaic', true);
Map.addLayer(roi2_,{palette: "red"},"Central Belize Corridor", true);
Map.addLayer(x.pa_cam.clip(x.bz),{palette: "yellow"},"protected_areas", true);
Map.addLayer(x.bnds_w2.clip(x.bz),{palette: "black"},"Int'l Borders", true);
Map.setCenter(-88.59899, 17.27544, 13);
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