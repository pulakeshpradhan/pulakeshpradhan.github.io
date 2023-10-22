var PT = ui.import && ui.import("PT", "image", {
      "id": "users/ZhenZhang/PT-Combined/ZhangJiang_PT"
    }) || ee.Image("users/ZhenZhang/PT-Combined/ZhangJiang_PT"),
    image1 = ui.import && ui.import("image1", "image", {
      "id": "users/ZhenZhang/PTC_images/FJ_10m"
    }) || ee.Image("users/ZhenZhang/PTC_images/FJ_10m"),
    image2 = ui.import && ui.import("image2", "image", {
      "id": "users/ZhenZhang/PTC_images/GD_10m"
    }) || ee.Image("users/ZhenZhang/PTC_images/GD_10m"),
    image3 = ui.import && ui.import("image3", "image", {
      "id": "users/ZhenZhang/PTC_images/GX_10m"
    }) || ee.Image("users/ZhenZhang/PTC_images/GX_10m"),
    image4 = ui.import && ui.import("image4", "image", {
      "id": "users/ZhenZhang/PTC_images/HB_10m"
    }) || ee.Image("users/ZhenZhang/PTC_images/HB_10m"),
    image5 = ui.import && ui.import("image5", "image", {
      "id": "users/ZhenZhang/PTC_images/HN_10m"
    }) || ee.Image("users/ZhenZhang/PTC_images/HN_10m"),
    image6 = ui.import && ui.import("image6", "image", {
      "id": "users/ZhenZhang/PTC_images/JS_10m"
    }) || ee.Image("users/ZhenZhang/PTC_images/JS_10m"),
    image7 = ui.import && ui.import("image7", "image", {
      "id": "users/ZhenZhang/PTC_images/LN_10m"
    }) || ee.Image("users/ZhenZhang/PTC_images/LN_10m"),
    image8 = ui.import && ui.import("image8", "image", {
      "id": "users/ZhenZhang/PTC_images/NK_10m"
    }) || ee.Image("users/ZhenZhang/PTC_images/NK_10m"),
    image9 = ui.import && ui.import("image9", "image", {
      "id": "users/ZhenZhang/PTC_images/SD_10m"
    }) || ee.Image("users/ZhenZhang/PTC_images/SD_10m"),
    image10 = ui.import && ui.import("image10", "image", {
      "id": "users/ZhenZhang/PTC_images/SH_10m"
    }) || ee.Image("users/ZhenZhang/PTC_images/SH_10m"),
    image11 = ui.import && ui.import("image11", "image", {
      "id": "users/ZhenZhang/PTC_images/SK_10m"
    }) || ee.Image("users/ZhenZhang/PTC_images/SK_10m"),
    image12 = ui.import && ui.import("image12", "image", {
      "id": "users/ZhenZhang/PTC_images/TJ_10m"
    }) || ee.Image("users/ZhenZhang/PTC_images/TJ_10m"),
    image13 = ui.import && ui.import("image13", "image", {
      "id": "users/ZhenZhang/PTC_images/ZJ_10m"
    }) || ee.Image("users/ZhenZhang/PTC_images/ZJ_10m"),
    roi = ui.import && ui.import("roi", "table", {
      "id": "users/ZhenZhang/S2_tile"
    }) || ee.FeatureCollection("users/ZhenZhang/S2_tile");
function rmCloudByQA(image) { 
  var qa = image.select('QA60'); 
  var cloudBitMask = 1 << 10; 
  var cirrusBitMask = 1 << 11; 
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0) 
               .and(qa.bitwiseAnd(cirrusBitMask).eq(0)); 
  return image.updateMask(mask).divide(10000).copyProperties(image, ["system:time_start"]); 
} 
function NDVI(image) {
  return image.addBands(
    image.normalizedDifference(["B8", "B4"])
         .rename("NDVI"));
}
function NDWI(image) {    
  return image.addBands(
    image.normalizedDifference(["B3", "B8"])
        .rename("NDWI"));
}
var dataset = ee.ImageCollection('UQ/murray/Intertidal/v1_1/global_intertidal').filterDate("2014-01-01","2016-01-01");
var visualization = {
  bands: ['classification'],
  min: 0.0,
  max: 1.0,
  palette: ['yellow']
};
// Create an initial mosiac, which we'll visualize in a few different ways.
var importS2 = require("users/ZhenZhang/VIs:importS2_module"); //Obtaining Sentinel-2 images function
var shadowS2 = require("users/ZhenZhang/VIs:shadowMask_module"); //Shadow masking function
var clouds = require("users/ZhenZhang/VIs:cloud_module"); //Cloud masking function using Fmask algorithm
var outBands = ee.List(['QA60','B1','B2','B3','B4','B5','B6','B7','B8','B8A','B9','B11','B12']);
var inBands = ee.List(['QA60','cb','blue','green','red','re1','re2','re3','nir','re4','waterVapor','swir1','swir2']);
var bands_s = ee.List(['B1','B2','B3','B4','B5','B6','B7','B8','B8A','B9','B11','B12']);
var startDate = "2019-06-01";
var endDate = "2020-12-31";
var cloud_cover_max = 80;
var year = importS2.importData(roi,startDate,endDate,cloud_cover_max); //Obtaining Sentinel-2 images in 2020
// var year = shadowS2.shadowMask(roi,year); //shadow masking
// var image = clouds.sentinelCloudScore(year) //cloud masking 
//                 .map(rmCloudByQA)
//                 .select(inBands,outBands)
//                 .map(NDVI)
//                 .qualityMosaic("NDVI")
var image = ee.ImageCollection('COPERNICUS/S2_SR')
    .filterDate('2020-01-01', '2020-12-31')
    .map(rmCloudByQA).map(NDVI)
    .qualityMosaic("NDVI");
var North = ee.ImageCollection([image1,image2,image3,image4,image5,image6,image7,image8,image9,image10,
image11,image12,image13]).mosaic()
// Each map has a name and some visualization parameters.
var MAP_PARAMS = {
  'Our results': ['B8', 'B4', 'B3'],
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
  map.addLayer(North,{min:1,max:3,palette:['#2dd000','yellow','#267300']},"Our result",con1[name]);
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