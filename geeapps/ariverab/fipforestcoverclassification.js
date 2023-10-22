/* PROJECT
	Title: forest_classification_viz
	Authors: Alexis Rivera Ballesteros alexis.rivera.b@gmail.com
	Purpose: API to visualize tree cover results from Sentinel-2 images classification
	Inputs: 
	1) FIP forests shapefiles
	2) FIP forests classified images 
	Outputs: 
	1) A map of images
	2) A public platform for visualization
*/
var s2 = ee.ImageCollection('COPERNICUS/S2');
var s2filtered = s2.filterDate('2016-04-01', '2016-04-28').min(); // select the image with lowest cloud cover in April 2016
//////////////////////////////////////
// 1. Load forests shapefiles and filter them
//////////////////////////////////////
var forests = ee.FeatureCollection('users/ariverab/BF_FIP/shapefiles/fip_forests'); // load asset instead of fusion table
var pif_forests = forests.filterMetadata('uniqueID', 'less_than', 13);
var forest01 = forests.filterMetadata('name', 'equals', 'ouoro'); // select ouoro forest
var forest02 = forests.filterMetadata('name', 'equals', 'tiogo'); // select tiogo forest
var forest03 = forests.filterMetadata('name', 'equals', 'tisse'); // select tisse forest
var forest04 = forests.filterMetadata('name', 'equals', 'nossebou'); // select nossebou forest
var forest05 = forests.filterMetadata('name', 'equals', 'sorobouli'); // select sorobouli forest
var forest06 = forests.filterMetadata('name', 'equals', 'toroba'); // select toroba forest
var forest07 = forests.filterMetadata('name', 'equals', 'kari'); // select kari forest
var forest08 = forests.filterMetadata('name', 'equals', 'koulbi'); // select koulbi forest
var forest09 = forests.filterMetadata('name', 'equals', 'bontioliRT'); // select bontioliRT forest
var forest10 = forests.filterMetadata('name', 'equals', 'bontioliRP'); // select bontioliRP forest
var forest11 = forests.filterMetadata('name', 'equals', 'nazinon'); // select nazinon forest
var forest12 = forests.filterMetadata('name', 'equals', 'boopo'); // select boopo fo
//////////////////////////////////////
// 2. Load forest images
//////////////////////////////////////
var forest01_img = ee.Image('users/ariverab/BF_FIP/classification_results/forest01_ouoro');
var forest02_img = ee.Image('users/ariverab/BF_FIP/classification_results/forest02_tiogo');
var forest03_img = ee.Image('users/ariverab/BF_FIP/classification_results/forest03_tisse');
var forest04_img = ee.Image('users/ariverab/BF_FIP/classification_results/forest04_nossebou');
var forest05_img = ee.Image('users/ariverab/BF_FIP/classification_results/forest05_sorobouli');
var forest06_img = ee.Image('users/ariverab/BF_FIP/classification_results/forest06_toroba');
var forest07_img = ee.Image('users/ariverab/BF_FIP/classification_results/forest07_kari');
var forest08_img = ee.Image('users/ariverab/BF_FIP/classification_results/forest08_koulbi');
var forest09_img = ee.Image('users/ariverab/BF_FIP/classification_results/forest09_bontioliRT');
var forest10_img = ee.Image('users/ariverab/BF_FIP/classification_results/forest10_bontioliRP');
var forest11_img = ee.Image('users/ariverab/BF_FIP/classification_results/forest11_nazinon');
var forest12_img = ee.Image('users/ariverab/BF_FIP/classification_results/forest12_boopo');
//////////////////////////////////////
// 3. Clip images
//////////////////////////////////////
var forest01_clip = forest01_img.clip(forest01);
var forest02_clip = forest02_img.clip(forest02);
var forest03_clip = forest03_img.clip(forest03);
var forest04_clip = forest04_img.clip(forest04);
var forest05_clip = forest05_img.clip(forest05);
var forest06_clip = forest06_img.clip(forest06);
var forest07_clip = forest07_img.clip(forest07);
var forest08_clip = forest08_img.clip(forest08);
var forest09_clip = forest09_img.clip(forest09);
var forest10_clip = forest10_img.clip(forest10);
var forest11_clip = forest11_img.clip(forest11);
var forest12_clip = forest12_img.clip(forest12);
//////////////////////////////////////
// 3. Map images
//////////////////////////////////////
var forests_clip = ee.ImageCollection([forest01_clip, forest02_clip, forest03_clip, forest04_clip, forest05_clip, forest06_clip,
forest07_clip, forest08_clip, forest09_clip, forest10_clip, forest11_clip, forest12_clip]).mosaic();
Map.addLayer(forests_clip.mask(forests_clip), {palette: ['D509FA']}, 'Tree cover classification');
// Create an 8bit image and paint the geometries onto an image
var forests_bits = ee.Image().toByte()
                  .paint(pif_forests.geometry(), 1,2);     // 1 = Color  2= Outline thickness
Map.addLayer(forests_bits, {
  palette: '000000', 
  max: 1,
  opacity:0.6
  }, 'Forests');
Map.centerObject(forests);
//////////////////////////////////////
// 4. User interface
//////////////////////////////////////
var NAMES = [
  'Google hi-res basemap (2019)',
  'Google hi-res basemap (2019)',
  'Sentinel-2 image (Apr, 2016)',
  'On Sentinel-2 image (Apr, 2016)'
];
  var tileCentroids = {
    Forest01_Ouoro: [-3.1208, 10.8657],
    Forest02_Tiogo: [-3.083, 10.772],
    Forest03_Tisse: [-2.8688, 12.1394],
    Forest04_Nossebou: [-2.8729, 11.8452],
    Forest05_Sorobouli: [1.1, 12.2596],
    Forest06_Toroba: [-3.2616, 12.4923],
    Forest07_Kari: [-1.6775, 11.7854],
    Forest08_Koulbi: [-3.1435, 12.4521],
    Forest09_Bontioli_RT: [-2.7734, 12.2669],
    Forest10_Bontioli_RP: [-2.9299, 12.3605],
    Forest11_Nazinon: [-2.851, 9.6266],
    Forest12_Tapoa_Boopo: [-2.9217, 12.0269]
  };
// // Center the maps near Sacramento.
var select = ui.Select({
  items: Object.keys(tileCentroids),
  onChange: function(key) {
    Map.setCenter(tileCentroids[key][0], tileCentroids[key][1],15);
  }
});
var source = [
s2filtered, forests_clip
];
// Create a map for each visualization option.
var maps = [];
NAMES.forEach(function(name, i) {
  var map = ui.Map();
  map.setOptions('SATELLITE') 
  map.add(ui.Label(name));
  map.setControlVisibility(false);
 // map.addLayer(source[i].mask(source[i]));
  maps.push(map);
});
var linker = ui.Map.Linker(maps);
/*
// Enable zooming on the top-left map.
 var select = ui.Select({
  items: Object.keys(tileCentroids),
  onChange: function(key) {
    maps[0].setCenter(tileCentroids[key][0], tileCentroids[key][1],15);
  }
});
  print(select)
*/
//maps[0].setControlVisibility({zoomControl: true})//.add(select);
// Show the scale (e.g. '500m') on the bottom-right map.
Map.addLayer(s2filtered, {'bands': ['B4', 'B3', 'B2'], min:1149, max:2558}, 'sentinel 2', false); // map selected Sentinel-2 image
Map.addLayer(forests_clip.mask(forests_clip), {palette: ['D509FA']}, 'Tree cover classification');
maps[0].setControlVisibility({scaleControl: true})//.add(select);
maps[1].setControlVisibility({scaleControl: true})//.add(select);
maps[2].setControlVisibility({scaleControl: true})//.add(select);
.addLayer(s2filtered, {'bands': ['B4', 'B3', 'B2'], min:1149, max:2558}, 'sentinel 2', true)
maps[3].setControlVisibility({scaleControl: true})//.add(select);
.addLayer(s2filtered, {'bands': ['B4', 'B3', 'B2'], min:1149, max:2558}, 'sentinel 2', true)
maps[0].setControlVisibility({scaleControl: true})//.add(select);
.addLayer(forests_clip.mask(forests_clip), {palette: ['66FFFF'], opacity: 0.7}, 'Tree cover classification', false);
maps[1].setControlVisibility({scaleControl: true})//.add(select);
.addLayer(forests_clip.mask(forests_clip), {palette: ['66FFFF'], opacity: 0.7}, 'Tree cover classification', true);
maps[2].setControlVisibility({scaleControl: true})//.add(select);
.addLayer(forests_clip.mask(forests_clip), {palette: ['66FFFF'], opacity: 0.7}, 'Tree cover classification', false);
maps[3].setControlVisibility({scaleControl: true})//.add(select);
.addLayer(forests_clip.mask(forests_clip), {palette: ['66FFFF'], opacity: 0.7}, 'Tree cover classification', true);
maps[0].setControlVisibility({scaleControl: true})//.add(select);
.addLayer(forests_bits, {palette: '000000', max: 1, opacity:0.6}, 'Forests', true);
maps[1].setControlVisibility({scaleControl: true})//.add(select);
.addLayer(forests_bits, {palette: '000000', max: 1, opacity:0.6}, 'Forests', true);
maps[2].setControlVisibility({scaleControl: true})//.add(select);
.addLayer(forests_bits, {palette: '000000', max: 1, opacity:0.6}, 'Forests', true);
maps[3].setControlVisibility({scaleControl: true})//.add(select);
.addLayer(forests_bits, {palette: '000000', max: 1, opacity:0.6}, 'Forests', true);
// Create a title.
var title = ui.Label('Classified image over different backgrounds. [Please zoom to explore]', {
  stretch: 'horizontal',
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: '24px'
});
// Create a grid of maps.
var mapGrid = ui.Panel(
  [
    ui.Panel([maps[0], maps[1]], null, {stretch: 'both'}),
    ui.Panel([maps[2], maps[3]], null, {stretch: 'both'})
  ],
  ui.Panel.Layout.Flow('horizontal'), {stretch: 'both'}
);
//print(select)
maps[0].centerObject(forest01);
//.add(select)
// Add the maps and title to the ui.root.
ui.root.widgets().reset([title, mapGrid]);
ui.root.setLayout(ui.Panel.Layout.Flow('vertical'));
//ui.root.clear();
//maps[0].add(select)//.setCenter(tileCentroids[key][0], tileCentroids[key][1],15);
Map.centerObject(pif_forests);