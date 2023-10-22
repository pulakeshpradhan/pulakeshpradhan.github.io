var manilaBay = ui.import && ui.import("manilaBay", "table", {
      "id": "users/chriscandido93/manilaBay_watershed"
    }) || ee.FeatureCollection("users/chriscandido93/manilaBay_watershed"),
    points = ui.import && ui.import("points", "table", {
      "id": "users/chriscandido93/validationPoints"
    }) || ee.FeatureCollection("users/chriscandido93/validationPoints"),
    manilaBay_region = ui.import && ui.import("manilaBay_region", "table", {
      "id": "users/chriscandido93/manilaBay"
    }) || ee.FeatureCollection("users/chriscandido93/manilaBay"),
    trainData = ui.import && ui.import("trainData", "table", {
      "id": "projects/ee-chriscandido93/assets/trainingData"
    }) || ee.FeatureCollection("projects/ee-chriscandido93/assets/trainingData"),
    bataan = ui.import && ui.import("bataan", "table", {
      "id": "projects/ee-chriscandido93/assets/bataan"
    }) || ee.FeatureCollection("projects/ee-chriscandido93/assets/bataan");
//Import required modules for Sentinel-2
var importS2 = require("users/chriscandido93/landCover_mapping:sentinel2/importS2_module");
var shadowS2 = require("users/chriscandido93/landCover_mapping:sentinel2/shadowMask_module");
var cloudS2 = require("users/chriscandido93/landCover_mapping:sentinel2/cloudMask_module");
var brdf = require("users/chriscandido93/landCover_mapping:sentinel2/brdfCorrection_module");
var terrainCorr = require("users/chriscandido93/landCover_mapping:sentinel2/terrainCorrection_module");
var harmonicS2 = require("users/chriscandido93/landCover_mapping:sentinel2/harmonic_module");
//Import required modules for Sentinel-1
var importS1 = require("users/chriscandido93/landCover_mapping:importS1_module");
//Import study area
var area = bataan;
//Set variables for dry season
var dryStart = '2020-01-01'; 
var dryEnd = '2020-05-31';   
//Set variables for wet season
var wetStart = '2020-06-01';
var wetEnd = '2020-10-31';
//Training data
var features = ee.FeatureCollection(trainData);
var annualCrop = ee.FeatureCollection(features.filter(ee.Filter.equals('lc3', "annualCrop"))).set('class', 0);
var aquaculture = ee.FeatureCollection(features.filter(ee.Filter.equals('lc3', "aquaculture"))).set('class', 1);
var barrenLand = ee.FeatureCollection(features.filter(ee.Filter.equals('lc3', "barrenLand"))).set('class', 2);
var denseUrban = ee.FeatureCollection(features.filter(ee.Filter.equals('lc3', "denseUrban"))).set('class', 3);
var forest = ee.FeatureCollection(features.filter(ee.Filter.equals('lc3', "forest"))).set('class', 4);
var grassLand = ee.FeatureCollection(features.filter(ee.Filter.equals('lc3', "grassLand"))).set('class', 5);
var mangrove = ee.FeatureCollection(features.filter(ee.Filter.equals('lc3', "mangrove"))).set('class', 6);
var paddyRice = ee.FeatureCollection(features.filter(ee.Filter.equals('lc3', "paddyRice"))).set('class', 7);
var permanentCrop = ee.FeatureCollection(features.filter(ee.Filter.equals('lc3', "permanentCrop"))).set('class', 8);
var sparseUrban = ee.FeatureCollection(features.filter(ee.Filter.equals('lc3', "sparseUrban"))).set('class', 9);
var shrubLand = ee.FeatureCollection(features.filter(ee.Filter.equals('lc3', "shrubLand"))).set('class', 10);
var water = ee.FeatureCollection(features.filter(ee.Filter.equals('lc3', "water"))).set('class', 11);
var polygons = annualCrop.merge(aquaculture).merge(barrenLand).merge(denseUrban).merge(forest).merge(grassLand)
                .merge(mangrove).merge(paddyRice).merge(permanentCrop).merge(sparseUrban).merge(shrubLand).merge(water);
//////////////////////////////////////////// SENTINEL-2 ////////////////////////////////////////////
var cloudCoverMax = 30;
//Import Sentinel-2 images
print ('Getting Sentinel images');
var dryS2 = importS2.importData(area,dryStart,dryEnd,cloudCoverMax);
var wetS2 = importS2.importData(area,wetStart,wetEnd,cloudCoverMax);
print("found ",dryS2.size(),"images");
print("found ",wetS2.size(),"images");
//Apply shadow mask 
print ("Applying cloud shadow mask");
dryS2 = shadowS2.shadowMask(dryS2,area);
wetS2 = shadowS2.shadowMask(wetS2,area)
//Apply cloud mask
print ("Applying QA cloud mask");
dryS2 = cloudS2.sentinelCloudScore(dryS2);
wetS2 = cloudS2.sentinelCloudScore(wetS2);
//Select bands for the Sentinel-2 images and Reducer
var dryMedianImg = dryS2.median().clip(area).select(['blue', 'green', 'red', 'nir', 'swir1', 'swir2']);
var wetMedianImg = wetS2.median().clip(area).select(['blue', 'green', 'red', 'nir', 'swir1', 'swir2']);
//Apply Normalized index
print ("Applying normalized index");
var addNormalizedIndex = function(image,band01,band02,bandName) {
  var index = image.normalizedDifference([band01, band02]).rename(bandName);
  return image.addBands(index);
}
var addSavi = function(image) {
  return image
    .addBands(image.expression(
      '(1 + L) * (nir - red)/ (nir + red + L)',
      {
        'nir': image.select('nir'),
        'red': image.select('red'),
        'L': 0.2
      })
    .rename('SAVI'))
    .float();
};
//Dry Season Index 
var dryNdvi = addNormalizedIndex(dryMedianImg,'nir','red','NDVI').select('NDVI');
var dryNdwi = addNormalizedIndex(dryMedianImg,'nir','swir1','NDWI').select('NDWI');
var dryNdbi = addNormalizedIndex(dryMedianImg,'swir1','nir','NDBI').select('NDBI');
var drySavi = addSavi(dryMedianImg).select('SAVI');
//Wet Season Index
var wetNdvi = addNormalizedIndex(wetMedianImg,'nir','red','NDVI').select('NDVI');
var wetNdwi = addNormalizedIndex(wetMedianImg,'nir','swir1','NDWI').select('NDWI');
var wetNdbi = addNormalizedIndex(wetMedianImg,'swir1','nir','NDBI').select('NDBI');
var wetSavi = addSavi(wetMedianImg).select('SAVI');
//////////////////////////////////////////// SENTINEL-1 ////////////////////////////////////////////
//Image summary
var drySeasonImg = ee.Image.cat([dryMedianImg,dryNdvi,dryNdwi,dryNdbi,wetMedianImg,wetNdvi,wetNdwi,wetNdbi]);
print (drySeasonImg);
var bands = [
'blue',
'green',
'red',
'nir',
'swir1',
'swir2',
'NDVI',
'NDWI',
'NDBI',
'blue_1',
'green_1',
'red_1',
'nir_1',
'swir1_1',
'swir2_1',
'NDVI_1',
'NDWI_1',
'NDBI_1'
];
// Overlay the points on the imagery to get training.
var training = drySeasonImg.select(bands).sampleRegions({
  collection: features,
  properties: ['id'],
  scale: 100,
  tileScale: 16
});
// Create an SVM classifier with custom parameters.
var classifier = ee.Classifier.smileRandomForest(10);
// Train the classifier.
var trained = classifier.train(training, 'id', bands);
// Classify the image.
var classified = drySeasonImg.select(bands).classify(trained);
var rgbVis = {
  min: 0.0,
  max: 0.3,
  bands: ['red', 'green', 'blue'],
};
var igbpPalette = [
  'ff7f00', // annualCrop
  '79a191', // aquaculture
  'a5a5a5', // barren land
  'd7191c', // dense urban
  '228b22', // forest
  '55d400', // grass land
  '778b22', // mangrove
  '05bd9b', // paddy rice
  'f4ff22', // permanent crop
  'b6ff05', // shrubland
  'd718c1', // sparse urban
  '1f78b4'  // water
];
var header = ui.Label('Landcover Classification', 
    {fontSize:'25px', fontWeight:'bold', color:'4A997E'});
var panel = ui.Panel({
  widgets:[header],
  style:{width: '300px', position: 'middle-right'}
});
Map.add(panel);
var classified = ui.Map.Layer(classified, {palette: igbpPalette, min: 0, max: 11}, 'classification');
//Map.addLayer(classified, {palette: igbpPalette, min: 0, max: 11}, 'classification');
//Map.addLayer(forest, {}, "Forest");
//Map.addLayer(dryMedianImg,rgbVis, 'Dry Season Manila Bay')
//Map.addLayer(clusters.randomVisualizer(), {}, 'clusters');
//Map.addLayer(dryNdvi,{palette:"blue,red,yellow,green,darkgreen",min:-0.1,max:1},"Dry season NDVI");
//Map.addLayer(drySavi,{palette:"blue,red,yellow,green,darkgreen",min:-0.1,max:1},"Dry season SAVI");
//Map.addLayer(dryNdwi,{palette:"blue,red,yellow,green,darkgreen",min:-0.1,max:1},"Dry season NDWI");
//Map.addLayer(dryNdbi,{palette:"blue,red,yellow,green,darkgreen",min:-0.1,max:1},"Dry season NDBI");
//Map.addLayer(drySARVV_filtered,{min: -25, max: 5},'SAR VV');
//Map.addLayer(drySARVH_filtered,{min: -25, max: 5},'SAR VH');
Map.add(classified);