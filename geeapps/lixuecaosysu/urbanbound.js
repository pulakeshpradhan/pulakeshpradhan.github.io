var roi = /* color: #d63000 */ee.Geometry.Point([-96.96970569726562, 32.879669527217374]);
//  This script used to visually compare the derived results on GEE
//  Author: lixuecaosysu@gmail.com 
//  ###### Load the NLCD data ######
//  ----------------------------------------------------------------------------------------------
var NLCDcol = ee.ImageCollection('USGS/NLCD').filter(ee.Filter.calendarRange(2011, 2011, 'year'));
var coverImg = ee.Image(NLCDcol.first()).select('landcover');
var isaImg = ee.Image(NLCDcol.first()).select('impervious'); 
Map.addLayer(coverImg, {}, 'NLCD_Landcover', false);
Map.addLayer(isaImg, {min:0, max:100},  'NLCD_ISA', false);
//  ----------------------------------------------------------------------------------------------
//  ###### Load the derived urban bounds ###### 
//  ----------------------------------------------------------------------------------------------
var usKD = ee.Image('users/lixuecaosysu/UrbanBound/US_KD_2011');
var usBound20_2017 = ee.FeatureCollection('users/lixuecaosysu/UrbanBound/US_KD_ISA20_2017');
var usBound_2017 = ee.Image().byte().paint({
  featureCollection: usBound20_2017,
  width: 2.5, 
})
Map.addLayer(usKD, {min:0, max:10000, opacity: 0.8}, 'US_KD')
Map.addLayer(usBound_2017, {palette: '#eb1e31'}, 'outline_2015');
//  ----------------------------------------------------------------------------------------------
//  ###### Load the derived urban bounds ###### 
//  ----------------------------------------------------------------------------------------------
var chnKD = ee.Image('users/lixuecaosysu/UrbanBound/China_KD_2010');
var chnBound20_2017 = ee.FeatureCollection('users/lixuecaosysu/UrbanBound/China_ISA_KD_Urban_2010');
var chnBound20_2017 = ee.Image().byte().paint({
  featureCollection: chnBound20_2017,
  width: 2.5, 
})
Map.addLayer(chnKD, {min:0, max:10000, opacity: 0.8}, 'CHN_KD')
Map.addLayer(chnBound20_2017, {palette: '#eb1e31'}, 'China_Bound');
//  ----------------------------------------------------------------------------------------------