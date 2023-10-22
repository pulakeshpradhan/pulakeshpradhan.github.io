var rl_qdgc = ee.FeatureCollection("users/lmathew/RL-FCD/rl_qdgc"),
    shoroba = ee.FeatureCollection("users/lmathew/RL-FCD/rl_shoroba"),
    ls8 = ee.ImageCollection("LANDSAT/LC08/C01/T1_TOA");
/*
#######################################################################################################
This code was modified from the original script written by: Gennadii Donchyts 
Original: https://code.earthengine.google.com/f0011ae8554cf924176fd7a931a38add
#######################################################################################################
2018-05-11
Modifications were made by Justin Braaten (jstnbraaten@gmail.com) 
-Modified to include all the combinations from this ESRI blog post:
 https://www.esri.com/arcgis-blog/products/product/imagery/band-combinations-for-landsat-8/
-Set ControlVisibility on maps to false
-Added three columns of maps to accommodate all the additional combinations
-Centered the maps near Santa Cruz
-Changed the image source year to 32-day composite for 2016 July
-Changed the title and the map labels
#######################################################################################################
*/
//Map.centerObject(shoroba);
var sn = shoroba.geometry().bounds(); 
// define the image to use
//var image = ee.Image('LANDSAT/LC8_L1T_32DAY_TOA/20181119').clip(sn);
var imagea = ls8.filterDate('2015-01-01','2015-12-31').sort('CLOUD_COVER', true).select(['B[1-7]']);
var image = imagea.median();
// define names for the band combinations
var bandComboNames = [
  'RGB // (B4/B3/B2)',
  'RGB // (B7/B6/B4)',
  'RGB // (B5/B4/B3)',
  'RGB // (B6/B5/B2)',
  'RGB // (B7/B6/B5)',
  'RGB // (B5/B6/B2)',
  'RGB // (B5/B6/B4)',
  'RGB // (B7/B5/B3)',
  'RGB // (B7/B5/B4)',
  'RGB // (B6/B5/B4)'
];
// define the visualization parameters per band combo
var visParams = [
  {gamma: 1.5, min: 0.02, max: 0.4, bands: ['B4', 'B3', 'B2']},
  {gamma: 1.5, min: 0.02, max: 0.4, bands: ['B7', 'B6', 'B4']},
  {gamma: 1.5, min: 0.02, max: 0.4, bands: ['B5', 'B4', 'B3']},
  {gamma: 1.5, min: 0.02, max: 0.4, bands: ['B6', 'B5', 'B2']},
  {gamma: 1.5, min: 0.02, max: 0.4, bands: ['B7', 'B6', 'B5']},
  {gamma: 1.5, min: 0.02, max: 0.4, bands: ['B5', 'B6', 'B2']},
  {gamma: 1.5, min: 0.02, max: 0.4, bands: ['B5', 'B6', 'B4']},
  {gamma: 1.5, min: 0.02, max: 0.4, bands: ['B7', 'B5', 'B3']},
  {gamma: 1.5, min: 0.02, max: 0.4, bands: ['B7', 'B5', 'B4']},
  {gamma: 1.5, min: 0.02, max: 0.4, bands: ['B6', 'B5', 'B4']}
];
// create a map for each band combo
var maps = [];
bandComboNames.forEach(function(name, index)
{
  var map = ui.Map();
  map.add(ui.Label(name));
  map.addLayer(image, visParams[index], name);
  map.setControlVisibility(false);
  maps.push(map);
});
// create a title.
var title = ui.Label('WWF-Tanzania Prority Areas - LS8OLI-TOA(RGB) Combo-2019', {
  stretch: 'horizontal',
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: '24px'
});
// create a grid of maps.
var mapGrid = ui.Panel(
  [
    ui.Panel([maps[0], maps[1]], null, {stretch: 'both'}),
    ui.Panel([maps[2], maps[3]], null, {stretch: 'both'}),
    ui.Panel([maps[4], maps[5]], null, {stretch: 'both'}),
    ui.Panel([maps[6], maps[7]], null, {stretch: 'both'}),
    ui.Panel([maps[8], maps[9]], null, {stretch: 'both'})
  ],
  ui.Panel.Layout.Flow('horizontal'), {stretch: 'both'}
);
// add the maps and title to the ui.root
ui.root.widgets().reset([title, mapGrid]);
ui.root.setLayout(ui.Panel.Layout.Flow('vertical'));
// center the maps near Santa Cruz
ui.Map.Linker(maps, 'change-bounds');
maps[0].setControlVisibility(false);
maps[0].centerObject(shoroba);