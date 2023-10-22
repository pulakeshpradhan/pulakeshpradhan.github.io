var PT = ui.import && ui.import("PT", "image", {
      "id": "users/ZhenZhang/PT-Combined/ZhangJiang_PT"
    }) || ee.Image("users/ZhenZhang/PT-Combined/ZhangJiang_PT"),
    North = ui.import && ui.import("North", "image", {
      "id": "users/ZhenZhang/PT-Combined/North"
    }) || ee.Image("users/ZhenZhang/PT-Combined/North");
function rmCloudByQA(image) { 
  var qa = image.select('QA60'); 
  var cloudBitMask = 1 << 10; 
  var cirrusBitMask = 1 << 11; 
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0) 
               .and(qa.bitwiseAnd(cirrusBitMask).eq(0)); 
  return image.updateMask(mask).divide(10000).copyProperties(image, ["system:time_start"]); 
} 
var dataset = ee.ImageCollection('UQ/murray/Intertidal/v1_1/global_intertidal').filterDate("2014-01-01","2016-01-01");
var visualization = {
  bands: ['classification'],
  min: 0.0,
  max: 1.0,
  palette: ['yellow']
};
// Create an initial mosiac, which we'll visualize in a few different ways.
var image = ee.ImageCollection('COPERNICUS/S2_SR')
    .filterDate('2020-01-01', '2020-12-31')
    .map(rmCloudByQA)
    .median();
// Each map has a name and some visualization parameters.
var MAP_PARAMS = {
  'Our results': ['B5', 'B4', 'B3'],
  'Available wetland data': ['B8', 'B11', 'B4'],
};
// Shared visualization parameters for the images.
function getVisualization(bands) {
  return {gamma: 1.3, min: 0, max: 0.3, bands: bands};
}
var con1 = {
  'Our results': true,
  'Available wetland data': false,
};
var con2 = {
  'Our results': false,
  'Available wetland data': true,
};
/*
 * Configure maps, link them in a grid
 */
// Create a map for each visualization option.
ui.root.clear()
var maps = [];
Object.keys(MAP_PARAMS).forEach(function(name) {
  print(name)
  var map = ui.Map();
  map.add(ui.Label(name));
  map.drawingTools();
  map.addLayer(image, getVisualization(MAP_PARAMS[name]), 'False color composite');
  map.addLayer(North,{min:1,max:2,palette:['green','yellow']},"Our result",con1[name]);
  map.addLayer(dataset, visualization, 'Intertidal areas',con2[name]);
  map.setOptions("SATELLITE");
  // map.setControlVisibility(false);
  ui.root.add(map)
  maps.push(map);
});
var linker = ui.Map.Linker(maps);
// Enable zooming on the top-left map.
maps[0].setControlVisibility({zoomControl: true});
// Show the scale (e.g. '500m') on the bottom-right map.
// maps[3].setControlVisibility({scaleControl: true});
// Create a grid of maps.
// var mapGrid = ui.Panel(
//     [
//       ui.Panel([maps[0], maps[1]], null, {stretch: 'both'})
//     ],
//     ui.Panel.Layout.Flow('vertical'), {stretch: 'both'});
// Center the map at an interesting spot in Greece. All
// other maps will align themselves to this parent map.
// maps[0].centerObject(PT,12);
maps[0].setCenter(121.1207, 33.0414, 11);
// Create a title.
var title = ui.Label('Comparison between publicly available data and our results', {
  stretch: 'horizontal',
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: '24px'
});
// Add the maps and title to the ui.root.
// ui.root.widgets().reset([mapGrid]);
ui.root.setLayout(ui.Panel.Layout.Flow('horizontal'));