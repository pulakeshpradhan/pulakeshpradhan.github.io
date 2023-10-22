var China = ee.FeatureCollection('users/yangjunting6/desert');
// Bits 10 and 11 are clouds and cirrus, respectively.
var cloudBitMask = ee.Number(2).pow(10).int();
var cirrusBitMask = ee.Number(2).pow(11).int();
print(cloudBitMask);
print(cirrusBitMask);
var addNDVI = function(image) {
  var qa = image.select('QA60');
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0).and(
             qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.addBands(image.normalizedDifference(['B8', 'B4'])
          .updateMask(mask)
)};
var collection = ee.ImageCollection('COPERNICUS/S2')
    .filterBounds(China)
    .filterDate('2014-03-01', '2018-09-30')
    .filter(ee.Filter.dayOfYear(90, 180))
    .map(addNDVI);
var vizParams = {'bands': ['B4', 'B3', 'B2'], 'max': 4000, 'gamma': 1.6};
//print(collection);
//var newcollection = collection.sort('nd',false).limit(100);
Map.centerObject(China, 8);
var altgr = collection.qualityMosaic('nd').double().clip(China);
var altmean = collection.median().clip(China);
var maskwater = altmean.select('nd').gt(0.1);
var altgrmask = altgr.updateMask(maskwater);
var newcollection = ee.ImageCollection.fromImages([altgrmask,altmean]);
//print(newcollection);
var altlast = newcollection.qualityMosaic('nd');
//Map.addLayer(altmean, vizParams);
//Map.addLayer(altgrmask, vizParams);
Map.addLayer(altlast, vizParams);
//print(altlast);
var median = altlast;
var ss = ee.FeatureCollection('users/yangjunting6/somt')
 .select('som');
//print(som);
// var landsat8Toa = ee.ImageCollection('LANDSAT/LC08/C01/T1_RT')
//.filterDate('2017-03-01','2017-05-30')
 //.filterBounds(China);
 //hecheng
 //var median = ee.Algorithms.Landsat.simpleComposite({
 // collection: landsat8Toa,
 // asFloat: true
//});
//var median = landsat8Toa.median();
var visParams = {bands: ['B4', 'B3', 'B2'], max: 0.3};
//Map.addLayer(median, visParams, 'median');
//Calculating variables
function radians(img) {
  return img.toFloat().multiply(Math.PI).divide(180);
}
var terrain = ee.Algorithms.Terrain(ee.Image('CGIAR/SRTM90_V4')).clip(China);
var slope = radians(terrain.select('slope'));
var aspect = radians(terrain.select('aspect'));
//var sinImage = aspect.divide(180).multiply(Math.PI).sin();
Map.centerObject(China);// Center on the Grand Canyon.
var bands = [ 'B3', 'B4', 'B5', 'B6', 'B7'];
//Map.addLayer(somPoints);
var elevation = ee.Image('CGIAR/SRTM90_V4').clip(China).float(); 
print(elevation);
var pre = ee.ImageCollection('UCSB-CHG/CHIRPS/DAILY')
.filterDate('2017-01-01','2017-12-30')
 .filterBounds(China);
var P = pre.filterBounds(China)
    .select(['precipitation'], ['pree']);
   //print (temperature);
  var meanP = P.filterDate('2017-01-01', '2017-12-30')
    .reduce(ee.Reducer.mean())
    .float()
    .clip(China);
// print (meanP);
var l8 = ee.ImageCollection('MODIS/006/MOD11A2')
.filterDate('2017-01-01','2017-12-30')
 .filterBounds(China);
var temperature = l8.filterBounds(China)
    .select(['LST_Day_1km'], ['temp'])
    .map(function(image) {
      // Kelvin to Celsius.
      return image.subtract(273.15)
         .set('system:time_start', image.get('system:time_start'));
    });
   //print (temperature);
  var meanT = temperature.filterDate('2017-01-01', '2017-12-30')
    .reduce(ee.Reducer.mean())
    .float()
    .clip(China);
 //print (meanT);
var somPoints = ss;
var effPoints = somPoints.filter(ee.Filter.neq('som', null));
//print(effPoints);
var bands1=('brightness','greenness');
var trainingImage = ee.Image(1)
    .addBands(median)
    .addBands(meanP)
    .addBands(meanT)
    .addBands(elevation)
  .addBands(slope)
   .addBands(aspect);
  //print (trainingImage);
//Map.addLayer(effPoints);
var predictBands = ['B2','B3', 'B4','B5','B6','B7', 'B8','B1','B12','temp_mean','elevation','nd'];
var training = trainingImage.sampleRegions({
 collection: somPoints,
  properties: ['som'],
  scale: 30,
});
//print (training);
var classifier = ee.Classifier.svm({
  svmType :'EPSILON_SVR',
  kernelType: 'RBF',
  gamma: 0.5,
  cost: 10
});
// Train the classifier.
var trained = classifier.setOutputMode('REGRESSION').train(training, 'som', predictBands);
// Classify the image.
var cartRegressionImage = trainingImage.classify(trained);
var som_China = cartRegressionImage.clip(China);
Map.addLayer(som_China);
//print (som_China);
Export.image.toDrive({
  image:som_China,
  description: 'som_China',
  scale: 30,
  maxPixels:16834753958,
  region: China.union()
});
var classProperty='som';
var withRandom = training.randomColumn('random');
// We want to reserve some of the data for testing, to avoid overfitting the model.
var split = 0.8;  // Roughly 70% training, 30% testing.
var testingPartition1 = withRandom.filter(ee.Filter.gte('random', 0))
                         .filter(ee.Filter.lt('random', 0.2));
var testingPartition2 = withRandom.filter(ee.Filter.gte('random', 0.2))
                         .filter(ee.Filter.lt('random', 0.4));
 var testingPartition3 = withRandom.filter(ee.Filter.gte('random', 0.4))
                         .filter(ee.Filter.lt('random', 0.6));
 var testingPartition4 = withRandom.filter(ee.Filter.gte('random', 0.6))
                         .filter(ee.Filter.lt('random', 0.8));
   var testingPartition5 = withRandom.filter(ee.Filter.gte('random', 0.8))
                         .filter(ee.Filter.lt('random', 1));
 var trainingPartition1 = testingPartition2.merge(testingPartition3).merge(testingPartition4).merge(testingPartition5);
 var trainingPartition2 = testingPartition1.merge(testingPartition3).merge(testingPartition4).merge(testingPartition5); 
  var trainingPartition3 = testingPartition1.merge(testingPartition2).merge(testingPartition4).merge(testingPartition5);                      
var trainingPartition4 = testingPartition1.merge(testingPartition2).merge(testingPartition3).merge(testingPartition5);
var trainingPartition5 = testingPartition1.merge(testingPartition2).merge(testingPartition4).merge(testingPartition3);
//print(trainingPartition);
//print(testingPartition);
var classifier = ee.Classifier.pegasosPolynomial();
// Train the classifier.
var trained = classifier.setOutputMode('REGRESSION').train(trainingPartition1, 'som',predictBands);
// Classify the image.
var test1 = testingPartition1.classify(trained);
print(test1);
Export.table.toDrive({
  collection: test1,
  description: 'test1',
  fileFormat: 'CSV'
});