var roi = /* color: #d63000 */ee.Geometry.Point([-78.6, 2.5]),
    ref = ee.FeatureCollection("ft:1T8ccAl_8gxUirza7-t-Vml3UJvVLUFfW9rglpXdD");
// Classification of tidal Flats in Narino Coast
// Cloud Free Image
var image = ee.Image(ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA')
  .filterBounds(roi)
  .filterDate('2013-01-01', '2015-12-31')
  .sort('CLOUD_COVER', true)
  .first());
print(image); 
Map.centerObject(image, 9);
Map.addLayer(image, {bands: ['B4', 'B3', 'B2'], max: 0.3}, 'image');
//Training data
print (ref)    //Fusion table with 3000 points (land, water, tidal)
// Create training data (overlay points on image) 
var bands = ['B2', 'B3', 'B4', 'B5', 'B6', 'B7'];
var training = image.select(bands)
  .sampleRegions({collection: ref, properties: ['COVER'], scale: 30});
print (training)
//Train classifier
var classifier = ee.Classifier.cart().train({
  features: training, 
  classProperty: 'COVER', 
  inputProperties: bands});
//Run the classification
var classified = image.select(bands).classify(classifier);
print (classified)
// Display Classification
Map.addLayer(classified, 
{min: 0, max: 4, palette: ['red', 'green', 'blue']}, 'classification');
Map.addLayer(ref);
// Classifier 2