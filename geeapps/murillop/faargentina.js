var geometry = /* color: #d63000 */ee.Geometry.Polygon(
        [[[34.49075568803573, 31.61440710981752],
          [34.20511115678573, 31.3591101048622],
          [34.26278937944198, 31.187742510611667],
          [34.40011848100448, 31.305151171899894],
          [34.61984504350448, 31.541870626401582]]]),
    image = ee.Image("users/murillop/Forensinc_Archi/FA_8NDVIs");
/*
#######################################################################################################
This code was modified from the original script written by: Gennadii Donchyts 
Original: https://code.earthengine.google.com/f0011ae8554cf924176fd7a931a38add
#######################################################################################################
2018-05-11
Modifications were made by Justin Braaten (jstnbraaten@gmail.com) 
-Modified to include all the combinations from this this ESRI blog post:
 https://www.esri.com/arcgis-blog/products/product/imagery/band-combinations-for-landsat-8/
-Set ControlVisibility on first map to false
-Added three columns of maps to accommodate all the additional combinations
-Centered the maps near Santa Cruz
-Changed the image source year to 32-day composite for 2016 July
-Changed the title and the map labels
#######################################################################################################
2018-12-12 
More modifications by Paulo Murillo. Gaza Project! 
#######################################################################################################
*/
// Display a grid of linked maps, each with a different visualization.
//var image2 = ee.Image('LANDSAT/LC8_L1T_32DAY_TOA/20180132');
//This are some palettes for colors
var palettes = require('users/gena/packages:palettes'); //package for visualization
var palette3 = palettes.colorbrewer.RdYlGn[5]//.reverse();
var palette = palettes.cmocean.Speed[7]
var NAMES = [
  'NDVI Year // 2013',
  'NDVI Year // 2014',
  'NDVI Year // 2015',
  'NDVI Year // 2016',
  'NDVI Year // 2017',
  'NDVI Year // 2018',
  'NDVI Year // 2019',
  'Difference // 2019 - 2013'
];
var VIS_PARAMS = [
  {min: 0, max: 0.7, palette:palette3,bands: ['ndvi']},
  {min: 0, max: 0.7, palette:palette3,bands: ['ndvi_1']},
  {min: 0, max: 0.7, palette:palette3,bands: ['ndvi_2']},
  {min: 0, max: 0.7, palette:palette3,bands: ['ndvi_3']},
  {min: 0, max: 0.7, palette:palette3,bands: ['ndvi_4']},
  {min: 0, max: 0.7, palette:palette3,bands: ['ndvi_5']},
  {min: 0, max: 0.7, palette:palette3,bands: ['ndvi_6']},
  {min: -0.25, max: .25, palette:palette,bands: ['ndvi_7']}
];
// Create a map for each visualization option.
var maps = [];
NAMES.forEach(function(name, index) {
  var map = ui.Map();
  map.add(ui.Label(name));
  //map.addLayer(collection.first(), sentinel_para);
  map.addLayer(image, VIS_PARAMS[index], name);
  map.setControlVisibility(false);
  maps.push(map);
});
var linker = ui.Map.Linker(maps);
// Enable zooming on the top-left map.
maps[0].setControlVisibility({zoomControl: true});
// Show the scale (e.g. '500m') on the bottom-right map.
maps[3].setControlVisibility({scaleControl: true});
maps[0].setControlVisibility({geometryEditor: true});
// Create a title.
var title = ui.Label('NDVI - Landsat 8 Imagery [March-April]', {
  stretch: 'horizontal',
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: '24px'
});
// Create a grid of maps.
var mapGrid = ui.Panel(
  [
    ui.Panel([maps[0], maps[1]], null, {stretch: 'both'}),
    ui.Panel([maps[2], maps[3]], null, {stretch: 'both'}),
    ui.Panel([maps[4], maps[5]], null, {stretch: 'both'}),
    ui.Panel([maps[6], maps[7]], null, {stretch: 'both'})
    //ui.Panel([maps[8], maps[9]], null, {stretch: 'both'})
  ],
  ui.Panel.Layout.Flow('horizontal'), {stretch: 'both'}
);
// Add the maps and title to the ui.root.
ui.root.widgets().reset([title, mapGrid]);
ui.root.setLayout(ui.Panel.Layout.Flow('vertical'));
// Center the maps near Santa Cruz.
maps[0].setControlVisibility(false);
maps[0].setCenter(-68.86953, -38.36435, 13);