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
// define the image to use
var image = ee.Image('LANDSAT/LC8_L1T_32DAY_TOA/20160711').multiply(10000);
// define names for the band combinations
var bandComboNames = [
  'RGB // (RED/GREEN/BLUE)',
  'RGB // (SWIR2/SWIR1/RED)',
  'RGB // (NIR/RED/GREEN)',
  'RGB // (SWIR1/NIR/BLUE)',
  'RGB // (SWIR2/SWIR1/NIR)',
  'RGB // (NIR/SWIR1/BLUE)',
  'RGB // (NIR/SWIR1/RED)',
  'RGB // (SWIR2/NIR/GREEN)',
  'RGB // (SWIR2/NIR/RED)',
  'RGB // (SWIR1/NIR/RED)'
];
var minMax = {
  B2:{min:50, max:2500},
  B3:{min:50, max:2500},
  B4:{min:0, max:2500},
  B5:{min:151, max:4951},
  B6:{min:100, max:4500},
  B7:{min:0, max:3696},
};
// define the visualization parameters per band combo
var visParams = [
  {min: [minMax.B4.min, minMax.B3.min, minMax.B2.min], max:[minMax.B4.max, minMax.B3.max, minMax.B2.max], bands: ['B4', 'B3', 'B2']},
  {min: [minMax.B7.min, minMax.B6.min, minMax.B4.min], max:[minMax.B7.max, minMax.B6.max, minMax.B4.max], bands: ['B7', 'B6', 'B4']},
  {min: [minMax.B5.min, minMax.B4.min, minMax.B3.min], max:[minMax.B5.max, minMax.B4.max, minMax.B3.max], bands: ['B5', 'B4', 'B3']},
  {min: [minMax.B6.min, minMax.B5.min, minMax.B2.min], max:[minMax.B6.max, minMax.B5.max, minMax.B2.max], bands: ['B6', 'B5', 'B2']},
  {min: [minMax.B7.min, minMax.B6.min, minMax.B5.min], max:[minMax.B7.max, minMax.B6.max, minMax.B5.max], bands: ['B7', 'B6', 'B5']},
  {min: [minMax.B5.min, minMax.B6.min, minMax.B2.min], max:[minMax.B5.max, minMax.B6.max, minMax.B2.max], bands: ['B5', 'B6', 'B2']},
  {min: [minMax.B5.min, minMax.B6.min, minMax.B4.min], max:[minMax.B5.max, minMax.B6.max, minMax.B4.max], bands: ['B5', 'B6', 'B4']},
  {min: [minMax.B7.min, minMax.B5.min, minMax.B3.min], max:[minMax.B7.max, minMax.B5.max, minMax.B3.max], bands: ['B7', 'B5', 'B3']},
  {min: [minMax.B7.min, minMax.B5.min, minMax.B4.min], max:[minMax.B7.max, minMax.B5.max, minMax.B4.max], bands: ['B7', 'B5', 'B4']},
  {min: [minMax.B6.min, minMax.B5.min, minMax.B4.min], max:[minMax.B6.max, minMax.B5.max, minMax.B4.max], bands: ['B6', 'B5', 'B4']}
];
print(visParams)
// create a map for each band combo
var maps = [];
bandComboNames.forEach(function(name, index) {
  var map = ui.Map();
  map.add(ui.Label(name));
  print(visParams[index])
  map.addLayer(image, visParams[index], name);
  map.setControlVisibility(false);
  maps.push(map);
});
// create a title.
var title = ui.Label('Landsat RGB Band Combinations', {
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
maps[0].setCenter(-122.0588, 37.0102, 11);