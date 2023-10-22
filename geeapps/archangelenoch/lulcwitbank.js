var geometry = ui.import && ui.import("geometry", "table", {
      "id": "users/archangelenoch/Train_Site_Witbank"
    }) || ee.FeatureCollection("users/archangelenoch/Train_Site_Witbank"),
    allSamples = ui.import && ui.import("allSamples", "table", {
      "id": "users/archangelenoch/Witbank"
    }) || ee.FeatureCollection("users/archangelenoch/Witbank");
var geometry = ee.FeatureCollection('users/archangelenoch/Witbank')
var allSamples = ee.FeatureCollection('users/archangelenoch/Train_Site_Witbank')
var srtm30 = ee.Image('USGS/SRTMGL1_003');
//A function that masks out bad data from Landsat 8 images  
function maskBadDataL8(image) {
  // Bit 0 - Fill
  // Bit 1 - Dilated Cloud
  // Bit 2 - Cirrus
  // Bit 3 - Cloud
  // Bit 4 - Cloud Shadow
  var qaMask = image.select('QA_PIXEL').bitwiseAnd(parseInt('11111', 2)).eq(0);
  var saturationMask = image.select('QA_RADSAT').eq(0);
  // Apply the scaling factors to the appropriate bands.
  var opticalBands = image.select('SR_B.').multiply(0.0000275).add(-0.2);
  var thermalBands = image.select('ST_B.*').multiply(0.00341802).add(149.0);
  // Replace the original bands with the scaled ones and apply the masks.
  return image.addBands(opticalBands, null, true)
      .addBands(thermalBands, null, true)
      .updateMask(qaMask)
      .updateMask(saturationMask);
}
// This example demonstrates the use of the Landsat 4, 5, 7 Collection 2,
// Level 2 QA_PIXEL band (CFMask) to mask unwanted pixels.
function maskBadDataL4_7(image) {
  // Bit 0 - Fill
  // Bit 1 - Dilated Cloud
  // Bit 2 - Unused
  // Bit 3 - Cloud
  // Bit 4 - Cloud Shadow
  var qaMask = image.select('QA_PIXEL').bitwiseAnd(parseInt('11111', 2)).eq(0);
  var saturationMask = image.select('QA_RADSAT').eq(0);
  // Apply the scaling factors to the appropriate bands.
  var opticalBands = image.select('SR_B.').multiply(0.0000275).add(-0.2);
  var thermalBand = image.select('ST_B6').multiply(0.00341802).add(149.0);
  // Replace the original bands with the scaled ones and apply the masks.
  return image.addBands(opticalBands, null, true)
      .addBands(thermalBand, null, true)
      .updateMask(qaMask)
      .updateMask(saturationMask);
}
//var trainingSamples = allSamples;
var trainingTesting = allSamples.randomColumn("random");
var trainingSet = trainingTesting.filter(ee.Filter.lt('random', 0.65));
var testingSet = trainingTesting.filter(ee.Filter.gte('random', 0.65));
Export.table.toDrive({
  collection: testingSet, 
  description: "Witbank_TestSamples", 
  folder: "Witbank SA LULC", 
  fileFormat: "SHP"
});
//////Start of image classification function ///////
function image_classification(year){
  //
  var yearStep = 0;
  var yearTarget = year;
  var tempYear1 = yearTarget - yearStep;
  var tempYear2 = yearTarget + yearStep;
  //  ###### Landsat image collection ######
  var LT5_clean = ee.ImageCollection("LANDSAT/LT05/C02/T1_L2").filterBounds(geometry)
                    .filter(ee.Filter.calendarRange(tempYear1, tempYear2, "year"))
                    .map(maskBadDataL4_7)
                    .select(['SR_B1', 'SR_B2', 'SR_B3', 'SR_B4', 'SR_B5', 'SR_B7'], ['B1', 'B2', 'B3', 'B4', 'B5', 'B7']);
  // print('Total number of images L5',LT5_clean.size());
  var LE7_clean = ee.ImageCollection("LANDSAT/LE07/C02/T1_L2").filterBounds(geometry)
                    .filter(ee.Filter.calendarRange(tempYear1, tempYear2, "year"))
                    .map(maskBadDataL4_7)
                    .select(['SR_B1', 'SR_B2', 'SR_B3', 'SR_B4', 'SR_B5', 'SR_B7'], ['B1', 'B2', 'B3', 'B4', 'B5', 'B7']);
// print('Total number of images L7', LE7_clean);
  var LC8_clean = ee.ImageCollection("LANDSAT/LC08/C02/T1_L2").filterBounds(geometry)
                    .filterMetadata('CLOUD_COVER', 'less_than', 30)
                    .filter(ee.Filter.calendarRange(tempYear1, tempYear2, "year"))
                    .map(maskBadDataL8)
                    .select(['SR_B2', 'SR_B3', 'SR_B4', 'SR_B5', 'SR_B6', 'SR_B7'], ['B1', 'B2', 'B3', 'B4', 'B5', 'B7']);
  var LC = 0;
  if (year <= 2014){
    LC = ee.ImageCollection(LC8_clean.merge(LT5_clean).merge(LE7_clean));
  }
  else{
  // Merge images collection
    LC = LC8_clean;
  //var LC = ee.ImageCollection(LC8_clean.merge(LT5_clean));
  }
  var stackImg = LC.reduce(ee.Reducer.median()).clip(geometry)
                    .select(['B1_median', 'B2_median', 'B3_median', 'B4_median', 'B5_median', 'B7_median'],
                            ['B1','B2','B3','B4','B5','B7']);
  //print(stackImg);
  var nir = stackImg.select('B4');
  var red = stackImg.select('B3');
  var green = stackImg.select('B2');
  var swir = stackImg.select('B5');
  var ndvi = nir.subtract(red).divide(nir.add(red)).rename('NDVI');
  var ndbi = swir.subtract(nir).divide(swir.add(nir)).rename('NDBI');
  var ndwi1 = green.subtract(nir).divide(green.add(nir)).rename('NDWI_1');
  //var ndwi2 = nir.subtract(swir).divide(nir.add(swir)).rename('NDWI_2');
  var dem = srtm30.clip(geometry).rename('DEM');
  //create the stack of images for the image classification
  //var fullImg = stackImg.addBands(ndvi).addBands(ndbi).addBands(ndwi1).addBands(ndwi2).addBands(dem);
  var fullImg = stackImg.addBands(ndvi).addBands(ndbi).addBands(ndwi1).addBands(dem);
  var bands = ['B1','B2','B3','B4','B5','B7', 'NDVI', 'NDBI', 'NDWI_1', 'DEM'];
  /**************************************************************************************************/
  /*** Randon forest classification ***/
  /**************************************************************************************************/
  var training = fullImg.select(bands).sampleRegions({
    collection: trainingSet, 
    //collection: trainingTesting,
    properties: ['class'], 
    scale: 30
  });
  //Training of RF classifier  
  var RFclassifier = ee.Classifier.smileRandomForest(120).train({
    features: training, 
    classProperty: 'class',
    inputProperties: bands
  });
  // Classify the input imagery.
  var RFclassified = fullImg.select(bands).classify(RFclassifier);
  // print("RFclassified", RFclassified);
  /**************************************************************************************************/
  /*** CART classification ***/
  /**************************************************************************************************/
  // Train a CART classifier.
  var CARTclassifier = ee.Classifier.smileCart().train({
    features: training,
    classProperty: 'class',
    inputProperties: bands
  });
  // Classify the composite.
  var CARTclassified = fullImg.select(bands).classify(CARTclassifier);
  // Train a Naive Bayes (ML) Classifier
  var GTBclassifier = ee.Classifier.smileGradientTreeBoost(100).train({
    features:training,
    classProperty: 'class',
    inputProperties: bands
  });
  // Classify the composite
  var GTBclassified = fullImg.select(bands).classify(GTBclassifier);
//////////////////////////////////////////////////////////////////
// SVM Classification
  // Train the classifier.
  var SVMclassifier = ee.Classifier.libsvm({
    kernelType: 'RBF',
    gamma: 0.5,
    cost: 10
  });
  // Train the classifier.
  var SVMtrained = SVMclassifier.train({
    features: training, 
    classProperty:'class', 
    inputProperties: bands
  });
  // Classify the image.
  var SVMclassified = fullImg.select(bands).classify(SVMtrained);
 ///////////////////////////////////////////////////////////////////////////////////
  // Returning classified images
  return {
    rfC: RFclassified, //Random Forest classied image
    cartC: CARTclassified, //CART classified image
    gtbC: GTBclassified, // Maximum likelihood (Naive Bayes) classified
    svmC: SVMclassified //SVM classied image
  };
}
///// End of image classification function ///////
//Time series image classification
//var classificationYears = [2015,2016,2017,2018,2019,2020,2021];
var classificationYears = [1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020, 2021];
var classified = classificationYears.map(image_classification);
// print(classified);
//Push all classified images into a single list
var allRF = []; //RF
for (var key = 0; key < 32; key++){
  allRF.push(classified[key].rfC);
}
var allSVM = []; //SVM
for (var key = 0; key < 32; key++){
  allSVM.push(classified[key].svmC);
}
//Push all classified images into a single list
var allCART = []; //CART
for (var key = 0; key < 32; key++){
  allCART.push(classified[key].cartC);
}
var allGTB = []; //ML
for (var key = 0; key < 32; key++){
  allGTB.push(classified[key].gtbC);
}
//Convert list of images into a single composite/stack
var fullRfTS = ee.Image.cat([allRF]);
var fullSvmTS = ee.Image.cat([allSVM]);
var fullCartTS = ee.Image.cat([allCART]);
var fullGtbTS = ee.Image.cat([allGTB]);
var sse = [fullRfTS,fullSvmTS,fullCartTS,fullGtbTS]
//// Accuracies check
function accuracies (classif){
  var test = classif.sampleRegions({
  collection: testingSet,
  tileScale: 16,
  scale: 30,
});
  return test
    .errorMatrix('class', 'classification')
    .accuracy();
}
function proAccu (classif){
  var test = classif.sampleRegions({
  collection: testingSet,
  tileScale: 16,
  scale: 30,
});
  return test
    .errorMatrix('class', 'classification')
    .producersAccuracy();
}
function consAccur (classif){
  var test = classif.sampleRegions({
  collection: testingSet,
  tileScale: 16,
  scale: 30,
});
  return test
    .errorMatrix('class', 'classification')
    .consumersAccuracy();
}
function confusion (classif){
  var test = classif.sampleRegions({
  collection: testingSet,
  tileScale: 16,
  scale: 30,
});
  return test
    .errorMatrix('class', 'classification');
}
print ('RF','SVm','CART','GTB')
var t = sse.map(accuracies)
print(t, 'overall Accuaracy')
var t1 = sse.map(proAccu)
print(t1, 'Producer Accuracy')
var t2 = sse.map(consAccur)
print(t2, 'User Accuracy')
var t3 = sse.map(confusion)
print(t3, 'confusion')
//Convert classification years into list of strings 
//This will be used to rename the bands
var namesRF = classificationYears.map(function(element){
  return 'RF ' + element.toString();
});
var namesSVM = classificationYears.map(function(element){
  return 'SVM ' + element.toString();
});
var namesCART = classificationYears.map(function(element){
  return 'CART ' + element.toString();
});
var namesGTB = classificationYears.map(function(element){
  return 'GTB ' + element.toString();
});
//Rename the bands
fullRfTS = fullRfTS.rename(namesRF);
fullSvmTS = fullSvmTS.rename(namesSVM);
fullCartTS = fullCartTS.rename(namesCART);
fullGtbTS = fullGtbTS.rename(namesGTB);
// Exporting the image, specifying scale and region.
Export.image.toDrive({
  image: fullRfTS,
  description: 'RandomForestLULC',
  scale: 30,
  region: geometry,
  maxPixels: 1e10,
  folder: 'Witbank LULC'
});
Export.image.toDrive({
  image: fullSvmTS,
  description: 'SVM_LULC',
  scale: 30,
  region: geometry,
  maxPixels: 1e10,
  folder: 'Witbank LULC'
});
Export.image.toDrive({
  image: fullCartTS,
  description: 'CART_LULC',
  scale: 30,
  region: geometry,
  maxPixels: 1e10,
  folder: 'Witbank LULC LULC'
});
Export.image.toDrive({
  image: fullGtbTS,
  description: 'GTB_LULC',
  scale: 30,
  region: geometry,
  maxPixels: 1e10,
  folder: 'Witbank LULC LULC'
});
// var centre = geometry.centroid(2, null);
Map.centerObject(geometry, 10);
/* ******************************************************************************************************************
************************************************************************************************************************/
//Define visualization parameters for classified images
var visparams = {min: 1, max: 5, 
    palette: ['#FF0000', '#FFD700','#8F00FF','#228B22','#0000FF' ]};//'#1396F2', '#57F283','#086912','#EC30F4','#7c778b', '#988C6A'
// DISPLAY THE TIME-SERIES RF CLASSIFIED IMAGES ON THE MAP
//1. RF classified images
var displayRF = function(id){
  //Select image to display on the map
  var img = fullRfTS.select(id);
  //Reset the map layers
  Map.layers().reset();
  //Add the selected image to map
  Map.addLayer(img, visparams, "RF classfied image");
};
// Get the list of IDs and put them into a select
fullRfTS.bandNames().evaluate(function(ids) {
  Map.add(ui.Select({
    items: ids,
    placeholder: 'Select the year',
    onChange: displayRF,
    style: {'position': 'top-right'}
  }));
});
//2. SVM classified images
var displaysvm = function(id){
  //Select image to display on the map
  var img = fullSvmTS.select(id);
  //Reset the map layers
  Map.layers().reset();
  //Add the selected image to map
  Map.addLayer(img, visparams, "SVM classfied image");
};
// Get the list of IDs and put them into a select
fullSvmTS.bandNames().evaluate(function(ids) {
  Map.add(ui.Select({
    items: ids,
    placeholder: 'Select the year',
    onChange: displaysvm,
    style: {'position': 'top-left'}
  }));
});
//3. SVM classified images
var displayGTB = function(id){
  //Select image to display on the map
  var img = fullGtbTS.select(id);
  //Reset the map layers
  Map.layers().reset();
  //Add the selected image to map
  Map.addLayer(img, visparams, "GTB classfied image");
};
// Get the list of IDs and put them into a select
fullGtbTS.bandNames().evaluate(function(ids) {
  Map.add(ui.Select({
    items: ids,
    placeholder: 'Select the year',
    onChange: displayGTB,
    style: {'position': 'middle-left'}
  }));
});
//4. cart classified images
var displaycart = function(id){
  //Select image to display on the map
  var img = fullCartTS.select(id);
  //Reset the map layers
  Map.layers().reset();
  //Add the selected image to map
  Map.addLayer(img, visparams, "GTB classfied image");
};
// Get the list of IDs and put them into a select
fullCartTS.bandNames().evaluate(function(ids) {
  Map.add(ui.Select({
    items: ids,
    placeholder: 'Select the year',
    onChange: displaycart,
    style: {'position': 'middle-right'}
  }));
});
Map.addLayer(allSamples, {color: 'black'}, ' Training samples');
/*/////////////////////////////////////////////////////////////////////////////////////////////////////////
Code for the legend display
////////////////////////////////////////////////////////////////////////////////////////////////////////*/
//Add Title and Legends
 //Title //
Map.add(ui.Label(
    'Land Use Map in Witbank',  {
      fontWeight: 'bold', BackgroundColor: 'FBF9F5',fontSize: '14px'}));
 // legend //
var names = ['Coal Mine', 'bareland','Settlement','vegetation', 'water' ];
var values = [ '1', '2', '3','4','5' ];
var legendsPalette = ['#FF0000', '#FFD700','#8F00FF','#228B22','#0000FF' ];
// set position of panel
var legend = ui.Panel({style: { position: 'bottom-left', padding: '8px 15px'}});
// Create legend title
var legendTitle = ui.Label({value: 'Land Cover Legends ',style: {
  fontWeight: 'bold', fontSize: '18px', margin: '0 0 4px 0', padding: '0' }});
// Add the title to the panel
legend.add(legendTitle);
var makeRow = function(color, name) {
  // Create the label that is actually the colored box.
  var colorBox = ui.Label({
    style: {
      backgroundColor:  color, padding: '8px',margin: '0 0 4px 0'} });
  // Create the label filled with the description text.
  var description = ui.Label({
    value: name, style: {margin: '0 0 4px 6px'}});
  // return the panel
  return ui.Panel({
    widgets: [colorBox, description],layout: ui.Panel.Layout.Flow('horizontal')})};
// Add color and and names
for (var i = 0; i < 5; i++) {
  legend.add(makeRow(legendsPalette[i], names[i]));
  }  
// Add the legend to the map.
Map.add(legend);