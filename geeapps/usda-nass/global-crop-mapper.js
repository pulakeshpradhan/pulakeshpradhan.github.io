// var trainingCDL = ee.FeatureCollection("projects/nass-cdl/assets/global/CDL112814samples30m");
// var trainingACI = ee.FeatureCollection("projects/nass-cdl/assets/global/ACI23014samples30m");
// var trainingA = trainingCDL.merge(trainingACI);
var trainingCDLe = ee.FeatureCollection("projects/nass-cdl/assets/global/CDL112814ESAsamples30m");
var trainingACIe = ee.FeatureCollection("projects/nass-cdl/assets/global/ACI23014ESAsamples30m");
var training = trainingCDLe.merge(trainingACIe);
// var trainingA = ee.FeatureCollection("projects/nass-cdl/assets/global/CDL28308samples30m")
// var trainingB = ee.FeatureCollection("projects/nass-cdl/assets/global/CDL28684samples60m")
//var trainingB = ee.FeatureCollection("projects/nass-cdl/assets/global/CDL141103samples30m")
//var trainingD = ee.FeatureCollection("projects/nass-cdl/assets/global/CDL142967samples60m")
//var trainingMerge = ee.FeatureCollection("projects/nass-cdl/assets/global/USAstratifiedSamples200perClass")
var YYYY = 2022;
var YYm1 = YYYY-1;
var collectionsStart = "2017-10-01";  // pre-filtering of collection total date range
var collectionsEnd = "2022-10-31"; //
var esa10m = ee.ImageCollection("ESA/WorldCover/v100").first();
var visualization = {bands: ['Map'],};
var esaNonCrops = esa10m.neq(40).selfMask();
var esaCrops10m = esa10m.eq(40);
var elevation = ee.Image("USGS/SRTMGL1_003");
var latitude = ee.Image.pixelLonLat().select('latitude');
latitude = latitude.abs();
var CDLm1 = ee.Image('USDA/NASS/CDL/'+YYm1).select(['cropland']);
var CDLYY = ee.Image('USDA/NASS/CDL/'+YYYY).select(['cropland']);
var palette = CDLm1.getInfo().properties['cropland_class_palette'];
var classes = CDLm1.getInfo().properties['cropland_class_values'];
var final_palette = [];
for (var i = 0; i < classes.length; ++i) {
  final_palette[classes[i]] = palette[i];
}
for (var i = 0; i < final_palette.length; ++i) {
  if (final_palette[i] === undefined) {
    final_palette[i] = '000000';
  }
}
var classScale = 30;       // analysis resolution (and resolution of pre-cached layers)
var trees = 20;
var leaves = 3; 
var stat = "median"; // median, mean, mode, max
// var MMDDs ='-04-01'; // pre-filtering of annual date span beginning
// var MMDDe ='-10-31'; // pre-filtering of annual date span ending
var S2clouds = 90;   // 90
var S2maxCloudProbabilty = 50;   // 65
var title = ui.Label('Commodity Crop Mapper');
var slider = ui.Slider(2018,2022,2022,1);
//////
var button = ui.Button({
label: 'Classify on Center',
onClick: function() {
Map.clear();
//Map.setOptions("SATELLITE");
var lat = (Map.getCenter().coordinates().get(1))
var lon = (Map.getCenter().coordinates().get(0))
var center = ee.Geometry.Point([lon,lat]);
var radiusK = 50;
var radius = radiusK * 1000
var AoI = center.buffer(radius).bounds();
//print(lat)
var LXdateAs = YYYY+"-04-01";
var LXdateAe = YYYY+"-05-18";
var LXdateBs = YYYY+"-05-19";
var LXdateBe = YYYY+"-07-05";
var LXdateCs = YYYY+"-07-06";
var LXdateCe = YYYY+"-08-22";
var S2dateAs = YYYY+"-04-01";
var S2dateAe = YYYY+"-05-10";
var S2dateBs = YYYY+"-05-11";
var S2dateBe = YYYY+"-06-19";
var S2dateCs = YYYY+"-06-20";
var S2dateCe = YYYY+"-07-29";
var S2dateDs = YYYY+"-07-30";
var S2dateDe = YYYY+"-09-07";
if (lat.getInfo() < 0) {
LXdateAs = YYm1+"-10-01";
LXdateAe = YYm1+"-11-17";
LXdateBs = YYm1+"-11-18";
LXdateBe = YYYY+"-01-04";
LXdateCs = YYYY+"-01-05";
LXdateCe = YYYY+"-02-21";
S2dateAs = YYm1+"-10-01";
S2dateAe = YYm1+"-11-09";
S2dateBs = YYm1+"-11-10";
S2dateBe = YYm1+"-12-19";
S2dateCs = YYm1+"-12-20";
S2dateCe = YYYY+"-01-28";
S2dateDs = YYYY+"-01-29";
S2dateDe = YYYY+"-03-09";
} else {
}
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
    .filterBounds(AoI)
    .filterDate(collectionsStart,collectionsEnd)
    .map(maskLXsr)
    .select(L7bands,LXbands);
var collectionL8 = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2')
    .filterBounds(AoI)
    .filterDate(collectionsStart,collectionsEnd)
    .map(maskLXsr)
    .select(L8bands,LXbands);
var collectionL9 = ee.ImageCollection('LANDSAT/LC09/C02/T1_L2')
    .filterBounds(AoI)
    .filterDate(collectionsStart,collectionsEnd)
    .map(maskLXsr)
    .select(L8bands,LXbands);
var LXimageCollection = ee.ImageCollection(collectionL8.merge(collectionL7).merge(collectionL9));
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
    ee.Filter.bounds(AoI), ee.Filter.date(collectionsStart, collectionsEnd));
var S2 = ee.ImageCollection('COPERNICUS/S2_HARMONIZED')
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
//// Get Landsat Collect 2 SR composites
var LXcollectionArea = LXimageCollection.filterBounds(AoI); 
// Build collections for year of interest and 5 years prior
var LXcollectionYYYYa = LXcollectionArea.filterDate(LXdateAs, LXdateAe);
var LXcollectionYYYYb = LXcollectionArea.filterDate(LXdateBs, LXdateBe);
var LXcollectionYYYYc = LXcollectionArea.filterDate(LXdateCs, LXdateCe);
// Build composites based on chosen statistic
var LXcompositeYYYYa = LXcollectionYYYYa[stat]().select(LXbands);
var LXcompositeYYYYb = LXcollectionYYYYb[stat]().select(LXbands);
var LXcompositeYYYYc = LXcollectionYYYYc[stat]().select(LXbands);
//// Get S2 composites - same ideas as for Landsat
var S2collectionArea = S2imageCollection.filterBounds(AoI); //.filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', S2clouds)); 
// Build collections for year of interest and 5 years prior
var S2collectionYYYYa = S2collectionArea.filterDate(S2dateAs, S2dateAe);
var S2collectionYYYYb = S2collectionArea.filterDate(S2dateBs, S2dateBe);
var S2collectionYYYYc = S2collectionArea.filterDate(S2dateCs, S2dateCe);
var S2collectionYYYYd = S2collectionArea.filterDate(S2dateDs, S2dateDe);
// Run cloud masking
var S2collectionQAYYYYa = S2collectionYYYYa.map(maskS2clouds);
var S2collectionQAYYYYb = S2collectionYYYYb.map(maskS2clouds);
var S2collectionQAYYYYc = S2collectionYYYYc.map(maskS2clouds);
var S2collectionQAYYYYd = S2collectionYYYYd.map(maskS2clouds);
// Build composites
var S2compositeYYYYa = S2collectionQAYYYYa[stat]().select(S2bandsRenamed);
var S2compositeYYYYb = S2collectionQAYYYYb[stat]().select(S2bandsRenamed);
var S2compositeYYYYc = S2collectionQAYYYYc[stat]().select(S2bandsRenamed);
var S2compositeYYYYd = S2collectionQAYYYYd[stat]().select(S2bandsRenamed);
//Map.addLayer(latitude)
// Display images
var viz = { min: 0, max: 5000, bands: ['SW1', 'NIR', 'R'],};
Map.addLayer(LXcompositeYYYYa.clip(AoI),viz,"Landsat "+LXdateAs,0);
Map.addLayer(LXcompositeYYYYb.clip(AoI),viz,"Landsat "+LXdateBs,0);
Map.addLayer(LXcompositeYYYYc.clip(AoI),viz,"Landsat "+LXdateCs,0);
Map.addLayer(S2compositeYYYYa.clip(AoI),viz,"Sentinel-2 "+S2dateAs,0);
Map.addLayer(S2compositeYYYYb.clip(AoI),viz,"Sentinel-2 "+S2dateBs,0);
Map.addLayer(S2compositeYYYYc.clip(AoI),viz,"Sentinel-2 "+S2dateCs,0);
Map.addLayer(S2compositeYYYYd.clip(AoI),viz,"Sentinel-2 "+S2dateDs,0);
var noImagery = ee.Image([1])
noImagery = noImagery.updateMask(S2compositeYYYYd.select('G'))
noImagery = noImagery.updateMask(S2compositeYYYYc.select('G'))
noImagery = noImagery.updateMask(S2compositeYYYYb.select('G'))
noImagery = noImagery.updateMask(S2compositeYYYYa.select('G'))
noImagery = noImagery.updateMask(LXcompositeYYYYc.select('G'))
noImagery = noImagery.updateMask(LXcompositeYYYYb.select('G'))
noImagery = noImagery.updateMask(LXcompositeYYYYa.select('G'))
var noImageryMask = noImagery.mask()
noImageryMask = noImageryMask.updateMask(noImageryMask.eq(0))
Map.addLayer(noImageryMask.clip(AoI),{},"Incomplete Imagery",1,0.5)
// Classify
var stackYYYY = ee.Image.cat([LXcompositeYYYYa, LXcompositeYYYYb, LXcompositeYYYYc, S2compositeYYYYa, S2compositeYYYYb, S2compositeYYYYc, S2compositeYYYYd, elevation, latitude, esaCrops10m]);
var bands = ['G', 'R', 'NIR', 'SW1', 'SW2', 'G_1', 'R_1', 'NIR_1', 'SW1_1', 'SW2_1', 'G_2', 'R_2', 'NIR_2', 'SW1_2', 'SW2_2', 'G_3', 'R_3', 'NIR_3', 'SW1_3', 'SW2_3', 'G_4', 'R_4', 'NIR_4', 'SW1_4', 'SW2_4', 'G_5', 'R_5', 'NIR_5', 'SW1_5', 'SW2_5', 'G_6', 'R_6', 'NIR_6', 'SW1_6', 'SW2_6','cropland','elevation','latitude','Map'];
var classifierA = ee.Classifier.smileRandomForest(trees,null,leaves).train(training,'cropland',bands);
//var classifierB = ee.Classifier.smileGradientTreeBoost(10,0.005,0.7,100).train(training,'cropland',bands);
var EDLYYa = stackYYYY.classify(classifierA).toUint8()
//var EDLYYb = stackYYYY.classify(classifierB).toUint8()
print(classifierA.explain())
// assessment
var classFactor = 0.005;
var pixelSize = 30;
var f1 = function(matrix,crop) {
  var P = matrix.producersAccuracy().get([crop,0]);
  var C =  matrix.consumersAccuracy().get([0,crop]);
  var top = P.multiply(C);
  var bottom = P.add(C)
  return top.multiply(2).divide(bottom)
}
var getStats = function(EDL,CDL,run){
  var validation_EDL = EDL.addBands(CDL).sample({
  region:AoI,
  scale:pixelSize,
  factor:classFactor
});
//print(validation_EDL.size())
var eMatrix_EDL = validation_EDL.errorMatrix('cropland','classification');
//print("case:"+run+" overall",eMatrix_EDL.accuracy())
// print("corn",f1(eMatrix_EDL,1))
// print("rice",f1(eMatrix_EDL,3))
// print("soybeans",f1(eMatrix_EDL,5))
// print("spring wheat",f1(eMatrix_EDL,23))
// print("winter wheat",f1(eMatrix_EDL,24))
// print("winter wheat/soybeans", f1(eMatrix_EDL,26))
}
CDLYY = ee.Image('USDA/NASS/CDL/'+YYYY).select(['cropland']);
getStats(EDLYYa,CDLYY,"RF")
//getStats(EDLYYb,CDLYY,"GB")
// Display output
EDLYYa = EDLYYa.updateMask(
     EDLYYa.eq(1)
     .or(EDLYYa.eq(5)
     .or(EDLYYa.eq(24)
     .or(EDLYYa.eq(2)
     .or(EDLYYa.eq(4)
     .or(EDLYYa.eq(3)
     .or(EDLYYa.eq(23)
     .or(EDLYYa.eq(26)))))))));
// EDLYYb = EDLYYb.updateMask(
//     EDLYYb.eq(1)
//     .or(EDLYYb.eq(5)
//     .or(EDLYYb.eq(24)
//     .or(EDLYYb.eq(2)
//     .or(EDLYYb.eq(4)
//     .or(EDLYYb.eq(3)
//     .or(EDLYYb.eq(23)
//     .or(EDLYYb.eq(26)))))))));
CDLYY = CDLYY.updateMask(
     CDLYY.eq(1)
     .or(CDLYY.eq(5)
     .or(CDLYY.eq(24)
     .or(CDLYY.eq(2)
     .or(CDLYY.eq(4)
     .or(CDLYY.eq(3)
     .or(CDLYY.eq(23)
     .or(CDLYY.eq(26)))))))));
//Map.centerObject(AoI,11);
//Map.addLayer(CDLYY.clip(AoI),{'min':0, 'max': 254,'palette':final_palette}, "CDL "+YYYY,0);
Map.addLayer(EDLYYa.clip(AoI),{'min':0, 'max': 254,'palette':final_palette}, "Extrapolated Data Layer",1);
//Map.addLayer(EDLYYb.clip(AoI),{'min':0, 'max': 254,'palette':final_palette}, "EDL GT "+YYYY,1);
//Map.addLayer(esaNonCrops.clip(AoI),{'palette':'000000','opacity':.5},"ESA non-Crops",0,0.5)
Map.addLayer(AoI,{},"Area of Analysis",0,0.5)
title.style().set('position', 'top-center');
Map.add(title);
button.style().set('position', 'bottom-center');
Map.add(button);
Map.add(slider);
slider
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
    style: {margin: '0 0 3px 6px', fontSize:"12px"}
  });
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};
legend.add(makeRow('ffd300', 'Corn'));
legend.add(makeRow('ff2626', 'Cotton'));
legend.add(makeRow('00a8e2', 'Rice'));
legend.add(makeRow('ff9e0a', 'Sorghum'));
legend.add(makeRow('267000', 'Soybeans'));
legend.add(makeRow('d8b56b', 'Spring Wheat'));
legend.add(makeRow('a57000', 'Winter Wheat'));
legend.add(makeRow('737300', 'Wheat and Soy'))
//legend.style().set({shown: false});
Map.add(legend);
// var outOfBounds = ee.Geometry.Rectangle({coords:[-179,55,179,89],geodesic:false})
// Map.addLayer(outOfBounds)
}
});
Map.setOptions("SATELLITE");
Map.setCenter(-98.579551, 39.828181,5)
//Map.setZoom(5)
title.style().set('position', 'top-center');
Map.add(title);
button.style().set('position', 'bottom-center');
Map.add(button);
slider.style().set('position', 'bottom-left');
Map.add(slider);
slider.onChange(function(){
    YYYY = slider.getValue();
    YYm1 = YYYY - 1;
})