var heilongjiang2 = ui.import && ui.import("heilongjiang2", "table", {
      "id": "users/rongguangni/DongbeiBoundary/heilongjiang2"
    }) || ee.FeatureCollection("users/rongguangni/DongbeiBoundary/heilongjiang2"),
    heilongjiangROI = ui.import && ui.import("heilongjiangROI", "table", {
      "id": "users/rongguangni/RiceROI/heilongjiangROI"
    }) || ee.FeatureCollection("users/rongguangni/RiceROI/heilongjiangROI");
// Eppf map generation 
// Take Heilongjiang province as an example
var heilongjiang2 = ee.FeatureCollection("users/rongguangni/DongbeiBoundary/heilongjiang2"),
    heilongjiangROI = ee.FeatureCollection("users/rongguangni/RiceROI/heilongjiangROI")
/*Part1: Image composite methods.*/
//Cloud mask fuction
function maskS2clouds(image) {
  var qa = image.select('QA60')
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0).and(
            qa.bitwiseAnd(cirrusBitMask).eq(0))
  return image.updateMask(mask).divide(10000)
      .select("B.*")
      .copyProperties(image, ["system:time_start"])
}
//Identify and combine 4 phenological periods
var collectionsoil19 = ee.ImageCollection('COPERNICUS/S2')
    .filterDate('2019-3-15', '2019-4-30')
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 70))
    .map(maskS2clouds)
var collectionsoil18 = ee.ImageCollection('COPERNICUS/S2')
    .filterDate('2018-3-15', '2018-4-30')
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 70))
    .map(maskS2clouds)
var collectionsoil17 = ee.ImageCollection('COPERNICUS/S2')
    .filterDate('2017-3-15', '2017-4-30')
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 70))
    .map(maskS2clouds)
var collectionflood19 = ee.ImageCollection('COPERNICUS/S2')
    .filterDate('2019-5-10', '2019-6-20')
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 70))
    .map(maskS2clouds)
var collectionflood18 = ee.ImageCollection('COPERNICUS/S2')
    .filterDate('2018-5-10', '2018-6-20')
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 70))
    .map(maskS2clouds)
var collectionflood17 = ee.ImageCollection('COPERNICUS/S2')
    .filterDate('2017-5-10', '2017-6-20')
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 70))
    .map(maskS2clouds)
var collectionsummer19 = ee.ImageCollection('COPERNICUS/S2')
    .filterDate('2019-6-30', '2019-9-07')
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 70))
    .map(maskS2clouds)
var collectionsummer18 = ee.ImageCollection('COPERNICUS/S2')
    .filterDate('2018-6-30', '2018-9-07')
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 70))
    .map(maskS2clouds)
var collectionsummer17 = ee.ImageCollection('COPERNICUS/S2')
    .filterDate('2017-6-30', '2017-9-07')
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 70))
    .map(maskS2clouds)    
var collectionharvest19 = ee.ImageCollection('COPERNICUS/S2')
    .filterDate('2019-9-27', '2019-10-25')
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 70))
    .map(maskS2clouds)
var collectionharvest18 = ee.ImageCollection('COPERNICUS/S2')
    .filterDate('2018-9-27', '2018-10-25')
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 70))
    .map(maskS2clouds)
var collectionharvest17 = ee.ImageCollection('COPERNICUS/S2')
    .filterDate('2017-9-27', '2017-10-25')
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 70))
    .map(maskS2clouds)
var collectionsoil=collectionsoil19.merge(collectionsoil18).merge(collectionsoil17);
var collectionflooding=collectionflood19.merge(collectionflood18).merge(collectionflood17);
var collectionsummer=collectionsummer19.merge(collectionsummer18).merge(collectionsummer17);
var collectionharvest=collectionharvest19.merge(collectionharvest18).merge(collectionharvest17);
//Calculate the spectral indices
//NDVI
var NDVI = function(image) {
  return image.expression('float(b("B8") - b("B4")) / float(b("B8") + b("B4"))').rename('ndvi');
};
//LSWI
var LSWI = function(image) {
  return image.expression('float(b("B8") - b("B11")) / float(b("B8") + b("B11"))').rename('lswi');
};
//EVI
var EVI = function(image) {
  return image.expression('2.5*(float(b("B8") - b("B4")) / (float(b("B8") +1+(6*b("B4"))-(7.5*b("B2")))))').rename('EVI');
};
//GCVI
var GCVI = function(image) {
  return image.expression('float(b("B8")) / float(b("B3"))-1').rename('GCVI');
};
//PSRI
var PSRI = function(image) {
  return image.expression('(float(b("B4"))-float(b("B3"))) / float(b("B8A"))').rename('PSRI');
};
//BSI
var BSI = function(image) {
  return image.expression('(float(b("B11") + b("B4"))-float(b("B8") + b("B2"))) / (float(b("B11") + b("B4"))+float(b("B8") + b("B2")))').rename('bsi');
};
//Median composition
var imglswi=collectionflooding.map(LSWI).median();
var imgndvi=collectionsummer.map(NDVI).median();
var imgevi=collectionsummer.map(EVI).median();
var imggcvi=collectionflooding.map(GCVI).median();
var imgpsri=collectionharvest.map(PSRI).median();
var imgBSI=collectionsoil.map(BSI).median();
// Eppf composite image
var compositeEppf=imglswi.addBands(imgevi).addBands(imgpsri).addBands(imgBSI).addBands(imgndvi).addBands(imggcvi);
/*Part2: OCSVM classification methods*/
// Create  OCSVM classifier with custom parameters.
var MultibandImgSVM_Classification=function(features,testImage,ScaleMeter){ 
var TrainBand=ee.Image(testImage);
var training = TrainBand.sampleRegions({
  collection: features,
  properties: ['class'],
  scale: ScaleMeter
});
var classifier = ee.Classifier.libsvm({
  svmType: 'ONE_CLASS', 
  kernelType: 'RBF',
  gamma: 0.1,
  nu:0.1
});
var trained = classifier.train(training, 'class');
var classified = TrainBand.classify(trained);
return classified;
}
// Classify the image.
var ClassifiedEppf=MultibandImgSVM_Classification(heilongjiangROI,compositeEppf,10).rename('composite21');
/////////////////////////////Show classification results ///////////////////////////
// Set visual parameters
var mapViz = {
  min:0,
  max:1,
  scale:10,
  palette:["green","black"]
}; 
Map.addLayer(ClassifiedEppf.updateMask(ClassifiedEppf.neq(1)).clip(heilongjiang2),mapViz,"Rice");
Map.centerObject(heilongjiang2,6)