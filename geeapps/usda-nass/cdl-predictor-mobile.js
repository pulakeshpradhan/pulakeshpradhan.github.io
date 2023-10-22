var legendShown=false;
var layersShown=false;
var YYYY = 2021;
var YYm1 = YYYY-1;
var YYm2 = YYYY-2;
var YYm3 = YYYY-3;
var YYm4 = YYYY-4;
var YYm5 = YYYY-5;
var YYm6 = YYYY-6;
var YYm7 = YYYY-7;
var YYm8 = YYYY-8;
var YYm9 = YYYY-9;
var CDLm9 = ee.Image('USDA/NASS/CDL/'+YYm9).select(['cropland']);
var CDLm8 = ee.Image('USDA/NASS/CDL/'+YYm8).select(['cropland']);
var CDLm7 = ee.Image('USDA/NASS/CDL/'+YYm7).select(['cropland']);
var CDLm6 = ee.Image('USDA/NASS/CDL/'+YYm6).select(['cropland']);
var CDLm5 = ee.Image('USDA/NASS/CDL/'+YYm5).select(['cropland']);
var CDLm4 = ee.Image('USDA/NASS/CDL/'+YYm4).select(['cropland']);
var CDLm3 = ee.Image('USDA/NASS/CDL/'+YYm3).select(['cropland']);
var CDLm2 = ee.Image('USDA/NASS/CDL/'+YYm2).select(['cropland']);
var CDLm1 = ee.Image('USDA/NASS/CDL/'+YYm1).select(['cropland']);
var palette = CDLm2.getInfo().properties['cropland_class_palette'];
var classes = CDLm2.getInfo().properties['cropland_class_values'];
var final_palette = [];
for (var i = 0; i < classes.length; ++i) {
  final_palette[classes[i]] = palette[i];
}
for (var i = 0; i < final_palette.length; ++i) {
  if (final_palette[i] === undefined) {
    final_palette[i] = '000000';
  }
}
var extendRegion = 10000;  // area for analysis
var displayRegion = extendRegion / Math.sqrt(2); // shrink area by half for display 
var classScale = 30;       // analysis resolution
var classFactor = 0.01;    // %p of pixels sampled for classifier training
var classType = 'smileRandomForest';  // smileCart, smileRandomForest, smileGradientTreeBoost
var trees = 20;
var leaves = 3; 
var RoI="blank";
var stat = "median"; // median, mean, mode, max
var MMDDs ='-04-01'; // pre-filtering of annual date span beginning
var MMDDe ='-10-31'; // pre-filtering of annual date span ending
var collectionsStart = "2016-01-01";  // pre-filtering of collection total date range
var collectionsEnd = "2021-12-31"; // 
var collectionsBounds = CDLm1.geometry().bounds(); // pre-filter collections by geography
var LXdoySpan = 48;  // 48, 40, 32 (orbit-based - tough to use less than 48 day with Landsat)
var LXdoyAs = 91;    // 73, 89, 105,    81, 73, 65   doy 91 = April 1
var S2doySpan = 40;  // 40 (orbit-based - could use 30 days if not using years '16 and '17)
var S2doyAs = 91;    // 89
var S2clouds = 90;   // 90
var S2maxCloudProbabilty = 50;   // 65
//// Initate Landsat composite time spans
var LXdoyAe=LXdoyAs+LXdoySpan-1;
var LXdoyBs=LXdoyAe+1;
var LXdoyBe=LXdoyBs+LXdoySpan-1;
var LXdoyCs=LXdoyBe+1;
var LXdoyCe=LXdoyCs+LXdoySpan-1;
var L7bands = ['SR_B2', 'SR_B3', 'SR_B4', 'SR_B5', 'SR_B7'];
var L8bands = ['SR_B3', 'SR_B4', 'SR_B5', 'SR_B6', 'SR_B7'];
var LXbands = ['G', 'R', 'NIR', 'SW1', 'SW2'];
//  Landsat cloud probability masking. Code borrowed.
function maskLXsr(image) {
    // Bits 0,1,2,3,4,5 - Fill, Dilated Cloud, Cirrus, Cloud, Cloud Shadow, Snow
    var qaMask = image.select(['QA_PIXEL']).bitwiseAnd(parseInt('111111', 2)).eq(0);
    var saturationMask = image.select("QA_RADSAT").eq(0);
    //scale raw and prepare for int16
    var opticalBands = image.select("SR_B.").multiply(0.0000275).add(-0.2).multiply(10000);
    return image
        .addBands(opticalBands, null, true)
        .updateMask(qaMask).updateMask(saturationMask).select("SR_B.");  //only need optical bands
}
var collectionL7 = ee.ImageCollection('LANDSAT/LE07/C02/T1_L2')
    .filterBounds(collectionsBounds)
    .filterDate(collectionsStart,collectionsEnd)
    .map(maskLXsr)
    .select(L7bands,LXbands);
var collectionL8 = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2')
    .filterBounds(collectionsBounds)
    .filterDate(collectionsStart,collectionsEnd)
    .map(maskLXsr)
    .select(L8bands,LXbands);
var LXimageCollection = ee.ImageCollection(collectionL8.merge(collectionL7));
//// Initiate Sentinel-2 composite time spans
var S2doyAe=S2doyAs+S2doySpan-1;
var S2doyBs=S2doyAe+1;
var S2doyBe=S2doyBs+S2doySpan-1;
var S2doyCs=S2doyBe+1;
var S2doyCe=S2doyCs+S2doySpan-1;
var S2doyDs=S2doyCe+1;
var S2doyDe=S2doyDs+S2doySpan-1;
var S2bands = ['B3','B4','B8','B11','B12'];
var S2bandsRenamed = ['G','R','NIR','SW1','SW2'];
//  S2 cloud probability masking. Code borrowed.
function maskS2clouds(img) {
  var clouds = ee.Image(img.get('cloud_mask')).select('probability');
  var isNotCloud = clouds.lt(S2maxCloudProbabilty);
  return img.updateMask(isNotCloud);
}
function maskEdges(s2_img) {
  return s2_img.updateMask(
      s2_img.select('B8A').mask().updateMask(s2_img.select('B9').mask()));
}
var criteria = ee.Filter.and(
    ee.Filter.bounds(collectionsBounds), ee.Filter.date(collectionsStart, collectionsEnd));
var S2 = ee.ImageCollection('COPERNICUS/S2')
   .filter(criteria).map(maskEdges);
var S2clouds = ee.ImageCollection('COPERNICUS/S2_CLOUD_PROBABILITY')
  .filter(criteria);
var S2withCloudMask = ee.Join.saveFirst('cloud_mask').apply({
  primary: S2,
  secondary: S2clouds,
  condition:
      ee.Filter.equals({leftField: 'system:index', rightField: 'system:index'})
});
var S2imageCollection = ee.ImageCollection(S2withCloudMask).select(S2bands,S2bandsRenamed);
//////---------- The bulk of it all....
function GetPredictions() {
// clear any displayed layers
var layers = Map.layers();
var layer_7 = layers.get(7);
var layer_6 = layers.get(6);
var layer_5 = layers.get(5);
var layer_4 = layers.get(4);
var layer_3 = layers.get(3);
var layer_2 = layers.get(2);
var layer_1 = layers.get(1);
var layer_0 = layers.get(0);
layers.remove(layer_7);
layers.remove(layer_6);
layers.remove(layer_5);
layers.remove(layer_4);
layers.remove(layer_3);
layers.remove(layer_2);
layers.remove(layer_1);
layers.remove(layer_0);
//create analysis area based on where map is currently centered
var mapCenter = Map.getCenter();
var centerPoint = ee.FeatureCollection(mapCenter);
var bufferAnalysisArea = function(feature){return feature.buffer(extendRegion)};
var bufferDisplayArea = function(feature){return feature.buffer(displayRegion)};
var regionBuff = centerPoint.map(bufferAnalysisArea);
var displayBuff = centerPoint.map(bufferDisplayArea);
Map.centerObject(regionBuff,13);
//////////
//// Get Landsat composites, first filter to Area of Analysis
var LXcollectionArea = LXimageCollection.filterBounds(regionBuff); 
// Build collections for year of interest and 5 years prior
var LXcollectionYYYYa = LXcollectionArea.filterDate(YYYY+MMDDs, YYYY+MMDDe).filter(ee.Filter.calendarRange(LXdoyAs, LXdoyAe, 'day_of_year')); 
var LXcollectionYYYYb = LXcollectionArea.filterDate(YYYY+MMDDs, YYYY+MMDDe).filter(ee.Filter.calendarRange(LXdoyBs, LXdoyBe, 'day_of_year')); 
var LXcollectionYYYYc = LXcollectionArea.filterDate(YYYY+MMDDs, YYYY+MMDDe).filter(ee.Filter.calendarRange(LXdoyCs, LXdoyCe, 'day_of_year')); 
// the following commented out if already prebuilt
// var LXcollectionYYm1a = LXcollectionArea.filterDate(YYm1+MMDDs, YYm1+MMDDe).filter(ee.Filter.calendarRange(LXdoyAs, LXdoyAe, 'day_of_year'));
// var LXcollectionYYm1b = LXcollectionArea.filterDate(YYm1+MMDDs, YYm1+MMDDe).filter(ee.Filter.calendarRange(LXdoyBs, LXdoyBe, 'day_of_year'));
// var LXcollectionYYm1c = LXcollectionArea.filterDate(YYm1+MMDDs, YYm1+MMDDe).filter(ee.Filter.calendarRange(LXdoyCs, LXdoyCe, 'day_of_year'));
// var LXcollectionYYm2a = LXcollectionArea.filterDate(YYm2+MMDDs, YYm2+MMDDe).filter(ee.Filter.calendarRange(LXdoyAs, LXdoyAe, 'day_of_year'));
// var LXcollectionYYm2b = LXcollectionArea.filterDate(YYm2+MMDDs, YYm2+MMDDe).filter(ee.Filter.calendarRange(LXdoyBs, LXdoyBe, 'day_of_year'));
// var LXcollectionYYm2c = LXcollectionArea.filterDate(YYm2+MMDDs, YYm2+MMDDe).filter(ee.Filter.calendarRange(LXdoyCs, LXdoyCe, 'day_of_year'));
// var LXcollectionYYm3a = LXcollectionArea.filterDate(YYm3+MMDDs, YYm3+MMDDe).filter(ee.Filter.calendarRange(LXdoyAs, LXdoyAe, 'day_of_year'));
// var LXcollectionYYm3b = LXcollectionArea.filterDate(YYm3+MMDDs, YYm3+MMDDe).filter(ee.Filter.calendarRange(LXdoyBs, LXdoyBe, 'day_of_year'));
// var LXcollectionYYm3c = LXcollectionArea.filterDate(YYm3+MMDDs, YYm3+MMDDe).filter(ee.Filter.calendarRange(LXdoyCs, LXdoyCe, 'day_of_year'));
// var LXcollectionYYm4a = LXcollectionArea.filterDate(YYm4+MMDDs, YYm4+MMDDe).filter(ee.Filter.calendarRange(LXdoyAs, LXdoyAe, 'day_of_year'));
// var LXcollectionYYm4b = LXcollectionArea.filterDate(YYm4+MMDDs, YYm4+MMDDe).filter(ee.Filter.calendarRange(LXdoyBs, LXdoyBe, 'day_of_year'));
// var LXcollectionYYm4c = LXcollectionArea.filterDate(YYm4+MMDDs, YYm4+MMDDe).filter(ee.Filter.calendarRange(LXdoyCs, LXdoyCe, 'day_of_year'));
// var LXcollectionYYm5a = LXcollectionArea.filterDate(YYm5+MMDDs, YYm5+MMDDe).filter(ee.Filter.calendarRange(LXdoyAs, LXdoyAe, 'day_of_year'));
// var LXcollectionYYm5b = LXcollectionArea.filterDate(YYm5+MMDDs, YYm5+MMDDe).filter(ee.Filter.calendarRange(LXdoyBs, LXdoyBe, 'day_of_year'));
// var LXcollectionYYm5c = LXcollectionArea.filterDate(YYm5+MMDDs, YYm5+MMDDe).filter(ee.Filter.calendarRange(LXdoyCs, LXdoyCe, 'day_of_year'));
//// Build collection over recent years to, if needed, fill gaps in current
// var LXcollectionXXXXa = LXcollectionArea.filterDate(YYm5+MMDDs, YYm1+MMDDe).filter(ee.Filter.calendarRange(LXdoyAs, LXdoyAe, 'day_of_year'));
// var LXcollectionXXXXb = LXcollectionArea.filterDate(YYm5+MMDDs, YYm1+MMDDe).filter(ee.Filter.calendarRange(LXdoyBs, LXdoyBe, 'day_of_year'));
// var LXcollectionXXXXc = LXcollectionArea.filterDate(YYm5+MMDDs, YYm1+MMDDe).filter(ee.Filter.calendarRange(LXdoyCs, LXdoyCe, 'day_of_year'));
// var LXcollectionXXXXd = LXcollectionArea.filterDate(YYm5+MMDDs, YYm1+MMDDe).filter(ee.Filter.calendarRange(LXdoyDs, LXdoyDe, 'day_of_year'));
// Build composites based on chosen statistic
var LXcompositeYYYYa = LXcollectionYYYYa[stat]().select(LXbands);
var LXcompositeYYYYb = LXcollectionYYYYb[stat]().select(LXbands);
var LXcompositeYYYYc = LXcollectionYYYYc[stat]().select(LXbands);
var LXcompositeYYm1a = ee.Image("projects/nass-cdl/assets/LX/LX_C2_L48_2020a_int16");
var LXcompositeYYm1b = ee.Image("projects/nass-cdl/assets/LX/LX_C2_L48_2020b_int16");
var LXcompositeYYm1c = ee.Image("projects/nass-cdl/assets/LX/LX_C2_L48_2020c_int16");
var LXcompositeYYm2a = ee.Image("projects/nass-cdl/assets/LX/LX_C2_L48_2019a_int16");
var LXcompositeYYm2b = ee.Image("projects/nass-cdl/assets/LX/LX_C2_L48_2019b_int16");
var LXcompositeYYm2c = ee.Image("projects/nass-cdl/assets/LX/LX_C2_L48_2019c_int16");
var LXcompositeYYm3a = ee.Image("projects/nass-cdl/assets/LX/LX_C2_L48_2018a_int16");
var LXcompositeYYm3b = ee.Image("projects/nass-cdl/assets/LX/LX_C2_L48_2018b_int16");
var LXcompositeYYm3c = ee.Image("projects/nass-cdl/assets/LX/LX_C2_L48_2018c_int16");
var LXcompositeYYm4a = ee.Image("projects/nass-cdl/assets/LX/LX_C2_L48_2017a_int16");
var LXcompositeYYm4b = ee.Image("projects/nass-cdl/assets/LX/LX_C2_L48_2017b_int16");
var LXcompositeYYm4c = ee.Image("projects/nass-cdl/assets/LX/LX_C2_L48_2017c_int16");
var LXcompositeYYm5a = ee.Image("projects/nass-cdl/assets/LX/LX_C2_L48_2016a_int16");
var LXcompositeYYm5b = ee.Image("projects/nass-cdl/assets/LX/LX_C2_L48_2016b_int16");
var LXcompositeYYm5c = ee.Image("projects/nass-cdl/assets/LX/LX_C2_L48_2016c_int16");
var LXcompositeXXXXa = ee.Image("projects/nass-cdl/assets/LX/LX_C2_L48_XXXXa_int16");
var LXcompositeXXXXb = ee.Image("projects/nass-cdl/assets/LX/LX_C2_L48_XXXXb_int16");
var LXcompositeXXXXc = ee.Image("projects/nass-cdl/assets/LX/LX_C2_L48_XXXXc_int16");
var LXcompositeYYYYaExists = true;
var LXcompositeYYYYbExists = true;
var LXcompositeYYYYcExists = true;
// Error check for when no Landsat imagery, yet, in current year
try { LXcompositeYYYYa.getInfo(); }
catch(err) { LXcompositeYYYYaExists = false;}
try { LXcompositeYYYYb.getInfo(); }
catch(err) { LXcompositeYYYYbExists = false;}
try { LXcompositeYYYYc.getInfo(); }
catch(err) { LXcompositeYYYYcExists = false;}
// Fill any blanks in current year's composites
var LXfillCompositeYYYYa = ' ';
if(LXcompositeYYYYaExists){
//print(YYYY+" Landsat collection A ", LXcollectionYYYYa);
var LXunmaskCompositeYYYYa = LXcompositeYYYYa.unmask();
LXfillCompositeYYYYa = LXunmaskCompositeYYYYa.firstNonZero(LXcompositeXXXXa);}
else{LXfillCompositeYYYYa = LXcompositeXXXXa;}
var LXfillCompositeYYYYb = ' ';
if(LXcompositeYYYYbExists){
//print(YYYY+" Landsat collection B ", LXcollectionYYYYb);
var LXunmaskCompositeYYYYb = LXcompositeYYYYb.unmask();
LXfillCompositeYYYYb = LXunmaskCompositeYYYYb.firstNonZero(LXcompositeXXXXb);}
else{LXfillCompositeYYYYb = LXcompositeXXXXb;}
var LXfillCompositeYYYYc = ' ';
if(LXcompositeYYYYcExists){
//print(YYYY+" Landsat collection C ", LXcollectionYYYYc);
var LXunmaskCompositeYYYYc = LXcompositeYYYYc.unmask();
LXfillCompositeYYYYc = LXunmaskCompositeYYYYc.firstNonZero(LXcompositeXXXXc);}
else{LXfillCompositeYYYYc = LXcompositeXXXXc;}
//////////
// Get S2 composites - same ideas as for Landsat
var S2collectionArea = S2imageCollection.filterBounds(regionBuff); //.filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', S2clouds)); 
// Grab the latest few images for dispay
var recentImages = S2collectionArea.sort('system:time_start', false).limit(20).map(maskS2clouds).sort('system:time_start', true).mosaic();
// Build collections for year of interest and 5 years prior
var S2collectionYYYYa = S2collectionArea.filterDate(YYYY+MMDDs, YYYY+MMDDe).filter(ee.Filter.calendarRange(S2doyAs, S2doyAe, 'day_of_year'));
var S2collectionYYYYb = S2collectionArea.filterDate(YYYY+MMDDs, YYYY+MMDDe).filter(ee.Filter.calendarRange(S2doyBs, S2doyBe, 'day_of_year'));
var S2collectionYYYYc = S2collectionArea.filterDate(YYYY+MMDDs, YYYY+MMDDe).filter(ee.Filter.calendarRange(S2doyCs, S2doyCe, 'day_of_year'));
var S2collectionYYYYd = S2collectionArea.filterDate(YYYY+MMDDs, YYYY+MMDDe).filter(ee.Filter.calendarRange(S2doyDs, S2doyDe, 'day_of_year'));
// the following commented since already prebuilt
// var S2collectionYYm1a = S2collectionArea.filterDate(YYm1+MMDDs, YYm1+MMDDe).filter(ee.Filter.calendarRange(S2doyAs, S2doyAe, 'day_of_year'));
// var S2collectionYYm1b = S2collectionArea.filterDate(YYm1+MMDDs, YYm1+MMDDe).filter(ee.Filter.calendarRange(S2doyBs, S2doyBe, 'day_of_year'));
// var S2collectionYYm1c = S2collectionArea.filterDate(YYm1+MMDDs, YYm1+MMDDe).filter(ee.Filter.calendarRange(S2doyCs, S2doyCe, 'day_of_year'));
// var S2collectionYYm1d = S2collectionArea.filterDate(YYm1+MMDDs, YYm1+MMDDe).filter(ee.Filter.calendarRange(S2doyDs, S2doyDe, 'day_of_year'));
// var S2collectionYYm2a = S2collectionArea.filterDate(YYm2+MMDDs, YYm2+MMDDe).filter(ee.Filter.calendarRange(S2doyAs, S2doyAe, 'day_of_year'));
// var S2collectionYYm2b = S2collectionArea.filterDate(YYm2+MMDDs, YYm2+MMDDe).filter(ee.Filter.calendarRange(S2doyBs, S2doyBe, 'day_of_year'));
// var S2collectionYYm2c = S2collectionArea.filterDate(YYm2+MMDDs, YYm2+MMDDe).filter(ee.Filter.calendarRange(S2doyCs, S2doyCe, 'day_of_year'));    
// var S2collectionYYm2d = S2collectionArea.filterDate(YYm2+MMDDs, YYm2+MMDDe).filter(ee.Filter.calendarRange(S2doyDs, S2doyDe, 'day_of_year'));    
// var S2collectionYYm3a = S2collectionArea.filterDate(YYm3+MMDDs, YYm3+MMDDe).filter(ee.Filter.calendarRange(S2doyAs, S2doyAe, 'day_of_year'));
// var S2collectionYYm3b = S2collectionArea.filterDate(YYm3+MMDDs, YYm3+MMDDe).filter(ee.Filter.calendarRange(S2doyBs, S2doyBe, 'day_of_year'));
// var S2collectionYYm3c = S2collectionArea.filterDate(YYm3+MMDDs, YYm3+MMDDe).filter(ee.Filter.calendarRange(S2doyCs, S2doyCe, 'day_of_year'));
// var S2collectionYYm3d = S2collectionArea.filterDate(YYm3+MMDDs, YYm3+MMDDe).filter(ee.Filter.calendarRange(S2doyDs, S2doyDe, 'day_of_year'));
// var S2collectionYYm4a = S2collectionArea.filterDate(YYm4+MMDDs, YYm4+MMDDe).filter(ee.Filter.calendarRange(S2doyAs, S2doyAe, 'day_of_year'));
// var S2collectionYYm4b = S2collectionArea.filterDate(YYm4+MMDDs, YYm4+MMDDe).filter(ee.Filter.calendarRange(S2doyBs, S2doyBe, 'day_of_year'));
// var S2collectionYYm4c = S2collectionArea.filterDate(YYm4+MMDDs, YYm4+MMDDe).filter(ee.Filter.calendarRange(S2doyCs, S2doyCe, 'day_of_year'));                       
// var S2collectionYYm4d = S2collectionArea.filterDate(YYm4+MMDDs, YYm4+MMDDe).filter(ee.Filter.calendarRange(S2doyDs, S2doyDe, 'day_of_year'));                       
// var S2collectionYYm5a = S2collectionArea.filterDate(YYm5+MMDDs, YYm5+MMDDe).filter(ee.Filter.calendarRange(S2doyAs, S2doyAe, 'day_of_year'));
// var S2collectionYYm5b = S2collectionArea.filterDate(YYm5+MMDDs, YYm5+MMDDe).filter(ee.Filter.calendarRange(S2doyBs, S2doyBe, 'day_of_year'));
// var S2collectionYYm5c = S2collectionArea.filterDate(YYm5+MMDDs, YYm5+MMDDe).filter(ee.Filter.calendarRange(S2doyCs, S2doyCe, 'day_of_year'));                       
// var S2collectionYYm5d = S2collectionArea.filterDate(YYm5+MMDDs, YYm5+MMDDe).filter(ee.Filter.calendarRange(S2doyDs, S2doyDe, 'day_of_year'));                       
// var S2collectionXXXXa = S2collectionArea.filterDate(YYm5+MMDDs, YYm1+MMDDe).filter(ee.Filter.calendarRange(S2doyAs, S2doyAe, 'day_of_year'));
// var S2collectionXXXXb = S2collectionArea.filterDate(YYm5+MMDDs, YYm1+MMDDe).filter(ee.Filter.calendarRange(S2doyBs, S2doyBe, 'day_of_year'));
// var S2collectionXXXXc = S2collectionArea.filterDate(YYm5+MMDDs, YYm1+MMDDe).filter(ee.Filter.calendarRange(S2doyCs, S2doyCe, 'day_of_year'));
// var S2collectionXXXXd = S2collectionArea.filterDate(YYm5+MMDDs, YYm1+MMDDe).filter(ee.Filter.calendarRange(S2doyDs, S2doyDe, 'day_of_year'));
// Run cloud masking
var S2collectionQAYYYYa = S2collectionYYYYa.map(maskS2clouds);
var S2collectionQAYYYYb = S2collectionYYYYb.map(maskS2clouds);
var S2collectionQAYYYYc = S2collectionYYYYc.map(maskS2clouds);
var S2collectionQAYYYYd = S2collectionYYYYd.map(maskS2clouds);
// var S2collectionQAYYm1a = S2collectionYYm1a.map(maskS2clouds);
// var S2collectionQAYYm1b = S2collectionYYm1b.map(maskS2clouds);
// var S2collectionQAYYm1c = S2collectionYYm1c.map(maskS2clouds);
// var S2collectionQAYYm1d = S2collectionYYm1d.map(maskS2clouds);
// var S2collectionQAYYm2a = S2collectionYYm2a.map(maskS2clouds);
// var S2collectionQAYYm2b = S2collectionYYm2b.map(maskS2clouds);
// var S2collectionQAYYm2c = S2collectionYYm2c.map(maskS2clouds);
// var S2collectionQAYYm2d = S2collectionYYm2d.map(maskS2clouds);
// var S2collectionQAYYm3a = S2collectionYYm3a.map(maskS2clouds);
// var S2collectionQAYYm3b = S2collectionYYm3b.map(maskS2clouds);
// var S2collectionQAYYm3c = S2collectionYYm3c.map(maskS2clouds);
// var S2collectionQAYYm3d = S2collectionYYm3d.map(maskS2clouds);
// var S2collectionQAYYm4a = S2collectionYYm4a.map(maskS2clouds);
// var S2collectionQAYYm4b = S2collectionYYm4b.map(maskS2clouds);
// var S2collectionQAYYm4c = S2collectionYYm4c.map(maskS2clouds);
// var S2collectionQAYYm4d = S2collectionYYm4d.map(maskS2clouds);
// var S2collectionQAYYm5a = S2collectionYYm5a.map(maskS2clouds);
// var S2collectionQAYYm5b = S2collectionYYm5b.map(maskS2clouds);
// var S2collectionQAYYm5c = S2collectionYYm5c.map(maskS2clouds);
// var S2collectionQAYYm5d = S2collectionYYm5d.map(maskS2clouds);
// var S2collectionQAXXXXa = S2collectionXXXXa.map(maskS2clouds);
// var S2collectionQAXXXXb = S2collectionXXXXb.map(maskS2clouds);
// var S2collectionQAXXXXc = S2collectionXXXXc.map(maskS2clouds);
// var S2collectionQAXXXXd = S2collectionXXXXd.map(maskS2clouds);
// Build composites
var S2compositeYYYYa = S2collectionQAYYYYa[stat]().select(S2bandsRenamed);
var S2compositeYYYYb = S2collectionQAYYYYb[stat]().select(S2bandsRenamed);
var S2compositeYYYYc = S2collectionQAYYYYc[stat]().select(S2bandsRenamed);
var S2compositeYYYYd = S2collectionQAYYYYd[stat]().select(S2bandsRenamed);
// var S2compositeYYm1a = S2collectionQAYYm1a[stat]().select(S2bandsRenamed);
// var S2compositeYYm1b = S2collectionQAYYm1b[stat]().select(S2bandsRenamed);
// var S2compositeYYm1c = S2collectionQAYYm1c[stat]().select(S2bandsRenamed);
// var S2compositeYYm1d = S2collectionQAYYm1d[stat]().select(S2bandsRenamed);
// var S2compositeYYm2a = S2collectionQAYYm2a[stat]().select(S2bandsRenamed);
// var S2compositeYYm2b = S2collectionQAYYm2b[stat]().select(S2bandsRenamed);
// var S2compositeYYm2c = S2collectionQAYYm2c[stat]().select(S2bandsRenamed);
// var S2compositeYYm2d = S2collectionQAYYm2d[stat]().select(S2bandsRenamed);
// var S2compositeYYm3a = S2collectionQAYYm3a[stat]().select(S2bandsRenamed);
// var S2compositeYYm3b = S2collectionQAYYm3b[stat]().select(S2bandsRenamed);
// var S2compositeYYm3c = S2collectionQAYYm3c[stat]().select(S2bandsRenamed);
// var S2compositeYYm3d = S2collectionQAYYm3d[stat]().select(S2bandsRenamed);
// var S2compositeYYm4a = S2collectionQAYYm4a[stat]().select(S2bandsRenamed);
// var S2compositeYYm4b = S2collectionQAYYm4b[stat]().select(S2bandsRenamed);
// var S2compositeYYm4c = S2collectionQAYYm4c[stat]().select(S2bandsRenamed);
// var S2compositeYYm4d = S2collectionQAYYm4d[stat]().select(S2bandsRenamed);
// var S2compositeYYm5a = S2collectionQAYYm5a[stat]().select(S2bandsRenamed);
// var S2compositeYYm5b = S2collectionQAYYm5b[stat]().select(S2bandsRenamed);
// var S2compositeYYm5c = S2collectionQAYYm5c[stat]().select(S2bandsRenamed);
// var S2compositeYYm5d = S2collectionQAYYm5d[stat]().select(S2bandsRenamed);
var S2compositeYYm1a = ee.Image("projects/nass-cdl/assets/S2/S2_L48_2020a_int16");
var S2compositeYYm1b = ee.Image("projects/nass-cdl/assets/S2/S2_L48_2020b_int16");
var S2compositeYYm1c = ee.Image("projects/nass-cdl/assets/S2/S2_L48_2020c_int16");
var S2compositeYYm1d = ee.Image("projects/nass-cdl/assets/S2/S2_L48_2020d_int16");
var S2compositeYYm2a = ee.Image("projects/nass-cdl/assets/S2/S2_L48_2019a_int16");
var S2compositeYYm2b = ee.Image("projects/nass-cdl/assets/S2/S2_L48_2019b_int16");
var S2compositeYYm2c = ee.Image("projects/nass-cdl/assets/S2/S2_L48_2019c_int16");
var S2compositeYYm2d = ee.Image("projects/nass-cdl/assets/S2/S2_L48_2019d_int16");
var S2compositeYYm3a = ee.Image("projects/nass-cdl/assets/S2/S2_L48_2018a_int16");
var S2compositeYYm3b = ee.Image("projects/nass-cdl/assets/S2/S2_L48_2018b_int16");
var S2compositeYYm3c = ee.Image("projects/nass-cdl/assets/S2/S2_L48_2018c_int16");
var S2compositeYYm3d = ee.Image("projects/nass-cdl/assets/S2/S2_L48_2018d_int16");
var S2compositeYYm4a = ee.Image("projects/nass-cdl/assets/S2/S2_L48_2017a_int16");
var S2compositeYYm4b = ee.Image("projects/nass-cdl/assets/S2/S2_L48_2017b_int16");
var S2compositeYYm4c = ee.Image("projects/nass-cdl/assets/S2/S2_L48_2017c_int16");
var S2compositeYYm4d = ee.Image("projects/nass-cdl/assets/S2/S2_L48_2017d_int16");
var S2compositeYYm5a = ee.Image("projects/nass-cdl/assets/S2/S2_L48_2016a_int16"); 
var S2compositeYYm5b = ee.Image("projects/nass-cdl/assets/S2/S2_L48_2016b_int16");
var S2compositeYYm5c = ee.Image("projects/nass-cdl/assets/S2/S2_L48_2016c_int16");
var S2compositeYYm5d = ee.Image("projects/nass-cdl/assets/S2/S2_L48_2016d_int16");
// var S2compositeXXXXa = S2collectionQAXXXXa[stat]().select(S2bandsRenamed);
// var S2compositeXXXXb = S2collectionQAXXXXb[stat]().select(S2bandsRenamed);
// var S2compositeXXXXc = S2collectionQAXXXXc[stat]().select(S2bandsRenamed);
// var S2compositeXXXXd = S2collectionQAXXXXd[stat]().select(S2bandsRenamed);
var S2compositeXXXXa = ee.Image("projects/nass-cdl/assets/S2/S2_L48_XXXXa_int16"); 
var S2compositeXXXXb = ee.Image("projects/nass-cdl/assets/S2/S2_L48_XXXXb_int16");
var S2compositeXXXXc = ee.Image("projects/nass-cdl/assets/S2/S2_L48_XXXXc_int16");
var S2compositeXXXXd = ee.Image("projects/nass-cdl/assets/S2/S2_L48_XXXXd_int16");
var S2compositeYYYYaExists = true;
var S2compositeYYYYbExists = true;
var S2compositeYYYYcExists = true;
var S2compositeYYYYdExists = true;
try { S2compositeYYYYa.getInfo(); }
catch(err) { S2compositeYYYYaExists = false;}
try { S2compositeYYYYb.getInfo(); }
catch(err) { S2compositeYYYYbExists = false;}
try { S2compositeYYYYc.getInfo(); }
catch(err) { S2compositeYYYYcExists = false;}
try { S2compositeYYYYd.getInfo();}
catch(err) { S2compositeYYYYdExists = false;}
// Fill any blanks in current year's composites
var S2fillCompositeYYYYa = ' ';
if(S2compositeYYYYaExists){
//print(YYYY+" S2 collection A ", S2collectionYYYYa);
var S2unmaskCompositeYYYYa = S2compositeYYYYa.unmask();
S2fillCompositeYYYYa = S2unmaskCompositeYYYYa.firstNonZero(S2compositeXXXXa);}
else{S2fillCompositeYYYYa = S2compositeXXXXa;}
var S2fillCompositeYYYYb = ' ';
if(S2compositeYYYYbExists){
//print(YYYY+" S2 collection B ", S2collectionYYYYb);
var S2unmaskCompositeYYYYb = S2compositeYYYYb.unmask();
S2fillCompositeYYYYb = S2unmaskCompositeYYYYb.firstNonZero(S2compositeXXXXb);}
else{S2fillCompositeYYYYb = S2compositeXXXXb;}
var S2fillCompositeYYYYc = ' ';
if(S2compositeYYYYcExists){
//print(YYYY+" S2 collection C ", S2collectionYYYYc);
var S2unmaskCompositeYYYYc = S2compositeYYYYc.unmask();
S2fillCompositeYYYYc = S2unmaskCompositeYYYYc.firstNonZero(S2compositeXXXXc);}
else{S2fillCompositeYYYYc = S2compositeXXXXc;}
var S2fillCompositeYYYYd = ' ';
if(S2compositeYYYYdExists){
//print(YYYY+" S2 collection D ", S2collectionYYYYd);
var S2unmaskCompositeYYYYd = S2compositeYYYYd.unmask();
S2fillCompositeYYYYd = S2unmaskCompositeYYYYd.firstNonZero(S2compositeXXXXd);}
else{S2fillCompositeYYYYd = S2compositeXXXXd;}
//////////
// Build All-in model, Landsat and Sentinel-2 are treated independently
var AIstackYYYY = ee.Image.cat([CDLm1,CDLm2,CDLm3,CDLm4,LXfillCompositeYYYYa, LXfillCompositeYYYYb, LXfillCompositeYYYYc, S2fillCompositeYYYYa, S2fillCompositeYYYYb, S2fillCompositeYYYYc, S2fillCompositeYYYYd]);
var AIstackYYm1 = ee.Image.cat([CDLm2,CDLm3,CDLm4,CDLm5,LXcompositeYYm1a, LXcompositeYYm1b, LXcompositeYYm1c, S2compositeYYm1a, S2compositeYYm1b, S2compositeYYm1c, S2compositeYYm1d]);
var AIstackYYm2 = ee.Image.cat([CDLm3,CDLm4,CDLm5,CDLm6,LXcompositeYYm2a, LXcompositeYYm2b, LXcompositeYYm2c, S2compositeYYm2a, S2compositeYYm2b, S2compositeYYm2c, S2compositeYYm2d]);
var AIstackYYm3 = ee.Image.cat([CDLm4,CDLm5,CDLm6,CDLm7,LXcompositeYYm3a, LXcompositeYYm3b, LXcompositeYYm3c, S2compositeYYm3a, S2compositeYYm3b, S2compositeYYm3c, S2compositeYYm3d]);
var AIstackYYm4 = ee.Image.cat([CDLm5,CDLm6,CDLm7,CDLm8,LXcompositeYYm4a, LXcompositeYYm4b, LXcompositeYYm4c, S2compositeYYm4a, S2compositeYYm4b, S2compositeYYm4c, S2compositeYYm4d]);
var AIstackYYm5 = ee.Image.cat([CDLm6,CDLm7,CDLm8,CDLm9,LXcompositeYYm5a, LXcompositeYYm5b, LXcompositeYYm5c, S2compositeYYm5a, S2compositeYYm5b, S2compositeYYm5c, S2compositeYYm5d]);
//  Error check for when no imagery
var AIstackYYm1Exists = true;
var AIstackYYm2Exists = true;
var AIstackYYm3Exists = true;
var AIstackYYm4Exists = true;
var AIstackYYm5Exists = true;
try { AIstackYYm1.getInfo(); }
catch(err) { AIstackYYm1Exists = false;}
try { AIstackYYm2.getInfo(); }
catch(err) { AIstackYYm2Exists = false;}
try { AIstackYYm3.getInfo(); }
catch(err) { AIstackYYm3Exists = false;}
try { AIstackYYm4.getInfo(); }
catch(err) { AIstackYYm4Exists = false;}
try { AIstackYYm5.getInfo(); }
catch(err) { AIstackYYm5Exists = false;}
var AIbandsMerge = ['cropland', 'cropland_1' ,'cropland_2','cropland_3', 'G', 'R', 'NIR', 'SW1', 'SW2', 'G_1', 'R_1', 'NIR_1', 'SW1_1', 'SW2_1', 'G_2', 'R_2', 'NIR_2', 'SW1_2', 'SW2_2', 'G_3', 'R_3', 'NIR_3', 'SW1_3', 'SW2_3', 'G_4', 'R_4', 'NIR_4', 'SW1_4', 'SW2_4', 'G_5', 'R_5', 'NIR_5', 'SW1_5', 'SW2_5', 'G_6', 'R_6', 'NIR_6', 'SW1_6', 'SW2_6'];
var AItrainingYYm1 = AIstackYYm1.addBands(CDLm1).sample({region:regionBuff,scale:classScale,factor:classFactor});
var AItrainingYYm2 = AIstackYYm2.addBands(CDLm2).sample({region:regionBuff,scale:classScale,factor:classFactor});
var AItrainingYYm3 = AIstackYYm3.addBands(CDLm3).sample({region:regionBuff,scale:classScale,factor:classFactor});
var AItrainingYYm4 = AIstackYYm4.addBands(CDLm4).sample({region:regionBuff,scale:classScale,factor:classFactor});
var AItrainingYYm5 = AIstackYYm5.addBands(CDLm5).sample({region:regionBuff,scale:classScale,factor:classFactor});
// force in at least one sample per year.
if(AIstackYYm1Exists){}
else{AItrainingYYm1 = AItrainingYYm2.limit(1)}
if(AIstackYYm2Exists){}
else{AItrainingYYm2 = AItrainingYYm1.limit(1)}
if(AIstackYYm3Exists){}
else{AItrainingYYm3 = AItrainingYYm1.limit(1)}
if(AIstackYYm4Exists){}
else{AItrainingYYm4 = AItrainingYYm1.limit(1)}
if(AIstackYYm5Exists){}
else{AItrainingYYm5 = AItrainingYYm1.limit(1)}
//print("All-in Samples", AItrainingYYm5.size(), AItrainingYYm4.size(), AItrainingYYm3.size(), AItrainingYYm2.size(), AItrainingYYm1.size());
var AItrainingMerge = AItrainingYYm1.merge(AItrainingYYm2).merge(AItrainingYYm3).merge(AItrainingYYm4).merge(AItrainingYYm5);
// Build "All-In" Data Layer (ADL)
var AIclassifierMerge = ee.Classifier[classType](trees,null,leaves).train(AItrainingMerge,'cropland_4',AIbandsMerge);
var ADLYY = AIstackYYYY.classify(AIclassifierMerge);
//////////
//Map it
Map.addLayer(CDLm5.clip(displayBuff),{'min':0, 'max': 254,'palette':final_palette}, "CDL "+YYm5,0);
Map.addLayer(CDLm4.clip(displayBuff),{'min':0, 'max': 254,'palette':final_palette}, "CDL "+YYm4,0);
Map.addLayer(CDLm3.clip(displayBuff),{'min':0, 'max': 254,'palette':final_palette}, "CDL "+YYm3,0);
Map.addLayer(CDLm2.clip(displayBuff),{'min':0, 'max': 254,'palette':final_palette}, "CDL "+YYm2,0);
Map.addLayer(CDLm1.clip(displayBuff),{'min':0, 'max': 254,'palette':final_palette}, "CDL "+YYm1,0);
Map.addLayer(ADLYY.clip(displayBuff),{'min':0, 'max': 254,'palette':final_palette}, "ADL "+YYYY,1);
var viz = { min: 0, max: 4000, bands: ['SW1', 'NIR', 'R'],};
// var viz = { min: 0, max: 0.4000, bands: ['SW1', 'NIR', 'R'],};  // for Landsat TOA
Map.addLayer(recentImages.clip(displayBuff),viz,"Recent Image", 0);
Map.addLayer(centerPoint,{'palette': 'red'},"center");
// kludge in a notice that the processing is being generated.
var junk = ADLYY.reduceRegion({
  reducer: ee.Reducer.mean(),
  geometry: displayBuff,
  scale: classScale^2,
  maxPixels: 1e9
});
var computedValue = junk.get('classification');
computedValue.evaluate(function(result) {
    buttonGoTo.setLabel('Classify Map Center');
    });
} 
//----------
Map.setControlVisibility(false,false,false,true,false,false,false); 
Map.setCenter(-98.583,39.833,5); //geographic center of Lower 48.
var buttonGoTo = ui.Button({
    label: 'Classify Current Location',
    style: {position: 'bottom-center', padding: '3px', width: '150px'},
    onClick: function() {
      ui.util.getCurrentPosition(function (pt) {
//            pt.evaluate(function (pt) {
//                if (!pt) {
//                    return;
//                }
//            });
              Map.centerObject(pt,13);
              GetPredictions();
              buttonLayers.setDisabled(false);
              buttonLegend.setDisabled(false);
              checkboxRecent.setValue(0);
              checkboxADL.setValue(1);
              checkboxYYm1.setValue(0);
              checkboxYYm2.setValue(0);
              checkboxYYm3.setValue(0);
              checkboxYYm4.setValue(0);
              checkboxYYm5.setValue(0);
              buttonGoTo.setLabel('Generating....');
         });
    }
});
// var buttonGoTo = ui.Button({
//     label: 'Classify Map Center',
//     style: {position: 'bottom-center', padding: '3px', width: '135px'},
//     onClick: function() {
//       GetPredictions();
//       buttonLayers.setDisabled(false);
//       buttonLegend.setDisabled(false);
//       checkboxRecent.setValue(0);
//       checkboxADL.setValue(1);
//       checkboxYYm1.setValue(0);
//       checkboxYYm2.setValue(0);
//       checkboxYYm3.setValue(0);
//       checkboxYYm4.setValue(0);
//       checkboxYYm5.setValue(0);
//       buttonGoTo.setLabel('Generating....');
//     }
// });
var buttonLayers = ui.Button({
  label: 'Show Layers Control',
  style: {position: 'bottom-left', padding: '3px', width: '135px'},
  disabled: true,
  onClick: function () {
    if (layersShown) {
      buttonLayers.setLabel('Show Layers Control');
      checkPanel.style().set({shown: false});
      layersShown = false;
    }
    else {
      buttonLayers.setLabel('Hide Layers Control');
      checkPanel.style().set({shown: true});
      layersShown = true;
    }
  }
});
var buttonLegend = ui.Button({
  label: 'Show Abridged Legend',
  style: {position: 'bottom-right', padding: '3px', width: '135px'},
  disabled: true,
  onClick: function () {
    if (legendShown) {
      buttonLegend.setLabel('Show Abridged Legend');
      legend.style().set({shown:false});
      legendShown = false;
    }
    else {
      buttonLegend.setLabel('Hide Abridged Legend');
      legend.style().set({shown:true});
      legendShown = true;
    }
  }
});
var checkboxFontSize = "11px";
var checkboxYYm5 = ui.Checkbox("'"+(2000-YYm5)*-1+" CDL", false,null,null,{fontSize: checkboxFontSize});
var checkboxYYm4 = ui.Checkbox("'"+(2000-YYm4)*-1+" CDL", false,null,null,{fontSize: checkboxFontSize});
var checkboxYYm3 = ui.Checkbox("'"+(2000-YYm3)*-1+" CDL", false,null,null,{fontSize: checkboxFontSize});
var checkboxYYm2 = ui.Checkbox("'"+(2000-YYm2)*-1+" CDL", false,null,null,{fontSize: checkboxFontSize});
var checkboxYYm1 = ui.Checkbox("'"+(2000-YYm1)*-1+" CDL", false,null,null,{fontSize: checkboxFontSize});
var checkboxADL = ui.Checkbox("'"+(2000-YYYY)*-1+" Observed", false,null,null,{fontSize: checkboxFontSize});
var checkboxRecent = ui.Checkbox("Recent Image", false,null,null,{fontSize: checkboxFontSize});
checkboxRecent.onChange(function(checked) {
  Map.layers().get(6).setShown(checked);
});
checkboxADL.onChange(function(checked) {
  Map.layers().get(5).setShown(checked);
});
checkboxYYm1.onChange(function(checked) {
  Map.layers().get(4).setShown(checked);
});
checkboxYYm2.onChange(function(checked) {
  Map.layers().get(3).setShown(checked);
});
checkboxYYm3.onChange(function(checked) {
  Map.layers().get(2).setShown(checked);
});
checkboxYYm4.onChange(function(checked) {
  Map.layers().get(1).setShown(checked);
});
checkboxYYm5.onChange(function(checked) {
  Map.layers().get(0).setShown(checked);
});
var checkPanel = ui.Panel();
checkPanel.style().set({
  position: 'bottom-left',
  padding: '0px',
  shown: false,
});
checkPanel.add(checkboxRecent);
checkPanel.add(checkboxADL);
checkPanel.add(checkboxYYm1);
checkPanel.add(checkboxYYm2);
checkPanel.add(checkboxYYm3);
checkPanel.add(checkboxYYm4);
checkPanel.add(checkboxYYm5);
Map.setOptions("HYBRID");
var title = ui.Label('2021 Crop Type Predictor', {
  position: 'top-center',
  padding: '6px',
  fontSize: '12px',
  fontWeight: 'bold'
});
Map.add(title); 
Map.add(buttonLayers);
Map.add(checkPanel);
Map.add(buttonLegend);
Map.add(buttonGoTo);
var legend = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '6px 9px'
  }
});
var makeRow = function(color, name) {
  var colorBox = ui.Label({
    style: {
      backgroundColor: '#' + color,
      padding: '5px',
      margin: '0 0 4px 0'
    }
  });
  var description = ui.Label({
    value: name,
    style: {margin: '0 0 3px 6px', fontSize:"11px"}
  });
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};
legend.add(makeRow('ffa5e2', 'Alfalfa'));
legend.add(makeRow('e2007c', 'Barley'));
legend.add(makeRow('ffd300', 'Corn'));
legend.add(makeRow('ff2626', 'Cotton'));
legend.add(makeRow('bebe77', 'Fallow/Idle'));
legend.add(makeRow('00a8e2', 'Rice'));
legend.add(makeRow('ff9e0a', 'Sorghum'));
legend.add(makeRow('267000', 'Soybeans'));
legend.add(makeRow('d8b56b', 'Spring Wheat'));
legend.add(makeRow('a57000', 'Winter Wheat'));
legend.add(makeRow('ffffff', ''));
legend.add(makeRow('ccbfa3', 'Barren'));
legend.add(makeRow('999999', 'Developed'));
legend.add(makeRow('e8ffbf', 'Grassland'));
legend.add(makeRow('c6d69e', 'Shrubland'));
legend.add(makeRow('4970a3', 'Water'));
legend.add(makeRow('7cafaf', 'Wetland'));
legend.add(makeRow('93cc93', 'Woodland'));
legend.style().set({shown: false});
Map.add(legend);