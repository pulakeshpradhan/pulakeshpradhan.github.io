// Import country boundaries feature collection.
var dataset = ee.FeatureCollection('USDOS/LSIB_SIMPLE/2017');
// Apply filter where country name equals Nigeria.
var nigeria = dataset.filter(ee.Filter.eq('country_na', 'Nigeria'));
// Print the "nigeria" object and explore features and properties.
// There should only be one feature representing Nigeria.
print('Nigeria feature collection:', nigeria);
// Convert the Nigeria boundary feature collection to a line for map display.
var nigeriaBorder =
    ee.Image().byte().paint({featureCollection: nigeria, color: 1, width: 3});
// Set map options and add the Nigeria boundary as a layer to the map.
Map.setOptions('SATELLITE');
Map.centerObject(nigeria, 6);
Map.addLayer(nigeriaBorder, null, 'Nigeria border');
// Import the maize target region asset.
var aoi = ee.FeatureCollection(
    'projects/earthengine-community/tutorials/classify-maizeland-ng/aoi');
// Display the maize target area boundary to the map.
Map.addLayer(aoi, {color: 'white', strokeWidth: 5}, 'AOI', true, 0.6);
// Import ground truth data that are divided into training and validation sets.
var trainingPts = ee.FeatureCollection(
    'projects/earthengine-community/tutorials/classify-maizeland-ng/training-pts');
var validationPts = ee.FeatureCollection(
    'projects/earthengine-community/tutorials/classify-maizeland-ng/validation-pts');
// Display training and validation points to see distribution within the AOI.
Map.addLayer(trainingPts, {color: 'green'}, 'Training points');
Map.addLayer(validationPts, {color: 'yellow'}, 'Validation points');
// Import S2 TOA reflectance and corresponding cloud probability collections.
var s2 = ee.ImageCollection('COPERNICUS/S2');
var s2c = ee.ImageCollection('COPERNICUS/S2_CLOUD_PROBABILITY');
// Define dates over which to create a composite.
var start = ee.Date('2017-06-15');
var end = ee.Date('2017-10-15');
// Define a collection filtering function.
function filterBoundsDate(imgCol, aoi, start, end) {
  return imgCol.filterBounds(aoi).filterDate(start, end);
}
// Filter the collection by AOI and date.
s2 = filterBoundsDate(s2, aoi, start, end);
s2c = filterBoundsDate(s2c, aoi, start, end);
// Define a function to join the two collections on their 'system:index'
// property. The 'propName' parameter is the name of the property that
// references the joined image.
function indexJoin(colA, colB, propName) {
  var joined = ee.ImageCollection(ee.Join.saveFirst(propName).apply({
    primary: colA,
    secondary: colB,
    condition: ee.Filter.equals(
        {leftField: 'system:index', rightField: 'system:index'})
  }));
  // Merge the bands of the joined image.
  return joined.map(function(image) {
    return image.addBands(ee.Image(image.get(propName)));
  });
}
// Define a function to create a cloud masking function.
function buildMaskFunction(cloudProb) {
  return function(img) {
    // Define clouds as pixels having greater than the given cloud probability.
    var cloud = img.select('probability').gt(ee.Image(cloudProb));
    // Apply the cloud mask to the image and return it.
    return img.updateMask(cloud.not());
  };
}
// Join the cloud probability collection to the TOA reflectance collection.
var withCloudProbability = indexJoin(s2, s2c, 'cloud_probability');
// Map the cloud masking function over the joined collection, select only the
// reflectance bands.
var maskClouds = buildMaskFunction(50);
var s2Masked = ee.ImageCollection(withCloudProbability.map(maskClouds))
                   .select(ee.List.sequence(0, 12));
// Calculate the median of overlapping pixels per band.
var median = s2Masked.median();
// Calculate the difference between each image and the median.
var difFromMedian = s2Masked.map(function(img) {
  var dif = ee.Image(img).subtract(median).pow(ee.Image.constant(2));
  return dif.reduce(ee.Reducer.sum()).addBands(img).copyProperties(img, [
    'system:time_start'
  ]);
});
// Generate a composite image by selecting the pixel that is closest to the
// median.
var bandNames = difFromMedian.first().bandNames();
var bandPositions = ee.List.sequence(1, bandNames.length().subtract(1));
var mosaic = difFromMedian.reduce(ee.Reducer.min(bandNames.length()))
                 .select(bandPositions, bandNames.slice(1))
                 .clipToCollection(aoi);
// Display the mosaic.
Map.addLayer(
    mosaic, {bands: ['B11', 'B8', 'B3'], min: 225, max: 4000}, 'S2 mosaic');
    // Specify and select bands that will be used in the classification.
var bands = [
  'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B8A', 'B9', 'B10', 'B11',
  'B12'
];
var imageCl = mosaic.select(bands);
// Overlay the training points on the imagery to get a training sample; include
// the crop classification property ('class') in the sample feature collection.
var training = imageCl
                   .sampleRegions({
                     collection: trainingPts,
                     properties: ['class'],
                     scale: 30,
                     tileScale: 8
                   })
                   .filter(ee.Filter.neq(
                       'B1', null)); // Remove null pixels.
// Train a CART classifier with default parameters.
var trainedCart = ee.Classifier.smileCart().train(
    {features: training, classProperty: 'class', inputProperties: bands});
// Train a random forest classifier with default parameters.
var trainedRf = ee.Classifier.smileRandomForest({numberOfTrees: 10}).train({
  features: training,
  classProperty: 'class',
  inputProperties: bands
});
// Classify the image with the same bands used for training.
var classifiedCart = imageCl.select(bands).classify(trainedCart);
var classifiedRf = imageCl.select(bands).classify(trainedRf);
// Define visualization parameters for classification display.
var classVis = {min: 0, max: 1, palette: ['f2c649', '484848']};
// Add the output of the training classification to the map.
Map.addLayer(classifiedCart.clipToCollection(aoi), classVis, 'Classes (CART)');
Map.addLayer(
    classifiedRf.clipToCollection(aoi), classVis, 'Classes (RF)');
// Calculate the training error matrix and accuracy for both classifiers by
// using the "confusionMatrix" function to generate metrics on the
// resubstitution accuracy.
var trainAccuracyCart = trainedCart.confusionMatrix();
var trainAccuracyRf = trainedRf.confusionMatrix();
// Print model accuracy results.
print('##### TRAINING ACCURACY #####');
print('CART: overall accuracy:', trainAccuracyCart.accuracy());
print('RF: overall accuracy:', trainAccuracyRf.accuracy());
print('CART: error matrix:', trainAccuracyCart);
print('RF: error matrix:', trainAccuracyRf);
// Extract band pixel values for validation points.
var validation = imageCl
                     .sampleRegions({
                       collection: validationPts,
                       properties: ['class'],
                       scale: 30,
                       tileScale: 8
                     })
                     .filter(ee.Filter.neq(
                         'B1', null)); // Remove null pixels.
// Classify the validation data.
var validatedCart = validation.classify(trainedCart);
var validatedRf = validation.classify(trainedRf);
// Calculate the validation error matrix and accuracy for both classifiers by
// using the "confusionMatrix" function to generate metrics on the
// resubstitution accuracy.
var validationAccuracyCart =
    validatedCart.errorMatrix('class', 'classification');
var validationAccuracyRf = validatedRf.errorMatrix('class', 'classification');
// Print validation accuracy results.
print('##### VALIDATION ACCURACY #####');
print('CART: overall accuracy:', validationAccuracyCart.accuracy());
print('RF: overall accuracy: ', validationAccuracyRf.accuracy());
print('CART: error matrix:', validationAccuracyCart);
print('RF: error matrix: ', validationAccuracyRf);
// Export classified map (RF) to Google Drive; alter the command to export to
// other endpoints.
Export.image.toDrive({
  image: validatedRf,
  description: 'Maizeland_Classified_RF',
  scale: 20,
  region: aoi,
  maxPixels: 1e13,
});
// Calculate area of each class (based on RF) in square meters.
var areaImage = ee.Image.pixelArea().addBands(classifiedRf);
var areas = areaImage.reduceRegion({
  reducer: ee.Reducer.sum().group({
    groupField: 1,
    groupName: 'class',
  }),
  geometry: aoi.geometry(),
  scale: 500,
  maxPixels: 1e13,
  tileScale: 8
});
// Print the area calculations.
print('##### CLASS AREA SQ. METERS #####');
print(areas);