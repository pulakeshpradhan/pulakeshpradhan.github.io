/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var imageCollection = ee.ImageCollection("COPERNICUS/S2_SR"),
    aoi = ee.FeatureCollection("users/olegzhelezn/polygon_final"),
    input_data = ee.FeatureCollection("users/olegzhelezn/train_Norilsk_5_84");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
// map location
Map.setCenter(88.2027, 69.3535, 10);
// ADD geometry AND TRAINING input_data (field = class)
// CLOUD MASKING: FUNCTIONS
// This one deals with bits and is a bit complicated.
var getQABits = function(image, start, end, newName) {
  // Compute the bits we need to extract.
  var pattern = 0;
  for (var i = start; i <= end; i++) {
    pattern += Math.pow(2, i);
  }
  // Return a single band image of the extracted QA bits, giving the band a new name.
  return image.select([0], [newName])
              .bitwiseAnd(pattern)
              .rightShift(start);
  };
// A function to mask out cloudy pixels.
var cmask = function(image) {
  // Select the QA band.
  var QA = image.select('QA60'); // Different for different sensors.
  // Get the internal_cloud_algorithm_flag bit.
  var opaque = getQABits(QA, 10, 10, 'opaque').eq(0);
  var cirrus = getQABits(QA, 11, 11, 'cirrus').eq(0);
  image = image.updateMask(opaque);
  return image.updateMask(cirrus);
};
// PREPROCESSING
// Loading the image collection and selecting only imagery within bounds
var col_noclouds = ee.ImageCollection('COPERNICUS/S2')
    .filterBounds(aoi)
    // clipping
    .map(function(img) { return img.clip(aoi); })
    // filtering by cloud cover within clipped area
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 80))
    // selecting summer imagery
    .filter(ee.Filter.calendarRange(152, 243,'day_of_year')) // 01.06 - 31.08
    // https://www.free-online-calculator-use.com/day-of-year-calculator.html
    // less convenient option: var col20 = col.filterDate('2020-06-28', '2020-09-16');
    // applying a cloud mask
    .map(cmask)
    // calculating NDVI
    .map(function(image) {
      var ndvi = image.expression('(NIR - Red)/(NIR + Red)', {
        'NIR': image.select('B8'),
        'Red': image.select('B4')
      }).rename('NDVI');
      // Or the easier way:
      // var ndvi = image.normalizedDifference(['B5', 'B4']).rename('NDVI');
      return image.addBands(ndvi);
    })
    .map(function(image) {
      var nbr = image.expression('(NIR - SWIR2)/(NIR + SWIR2)', {
        'NIR': image.select('B8'),
        'SWIR2': image.select('B12')
      }).rename('NBR');
      return image.addBands(nbr);
    });
// How big is the collection?
var count = col_noclouds.size();
print('Count: ', count);
// WHICH IMAGE TO USE?..
// Median?
var median = col_noclouds.median();
var p90 = col_noclouds.reduce(ee.Reducer.percentile([90]));
var std = col_noclouds.reduce(ee.Reducer.stdDev());
// Something more complex?
var image2 = ee.ImageCollection([median, p90, std]).toBands();
// A single image?
var image3 = col_noclouds.sort("CLOUDY_PIXEL_PERCENTAGE",false).first();
// Final choice:
var image = median;
// Use these bands for prediction.
var bands1 = ['NDVI', 'NBR', 'B4', 'B8'];
var bands2 = image.bandNames();
var bands = bands1;
// Get the values for all pixels in each polygon in the training.
var training = image.select(bands).sampleRegions({
  // Get the sample from points
  collection: input_data,
  properties: ['class'],
  scale: 60
});
// RANDOM FOREST
// Make a Random Forest classifier and train it.
var rf = ee.Classifier.smileRandomForest(10)
    .train({
      features: training,
      classProperty: 'class',
    });
// Train the classifier.
var rf_trained = rf.train(training, 'class', bands);
// Classify the image.
var rf_classified = image.clip(aoi).classify(rf_trained);
// Display the classification result and the input image.
Map.addLayer(image, {bands: ['B4', 'B3', 'B2'], max: 5000, min: 500, gamma: 1.6}, 'image');
Map.addLayer(aoi, {}, 'aoi');
Map.addLayer(input_data, {}, 'training points');
var palette1 = [
  'D7D7D7',
  '63A8A5', 
  '9AC6C4',
  '75A863',
  '9CC08F',
  '479329',
  '8DD772',
  'FF8B21',
  'ADFF6A',
  '937C39',
  'CEBA80',
  '33B569',
  '63D391',
  'B1E9C8',
  'F65140',
  '24804A',
  'C9B479',
  'DCCFA8',
  'C98A79',
  'E0BCB2',
  'C97890',
  'DCA8B8',
  'F0D8DF',
  '994C5D',
  'CA949F',
  'A863A7',
  'C08FBF',
  'C6D9DC',
  '8663A8',
  'A88FC0',
  'D3C7E0',
  '6E63A8',
  'A7A7CE',
  '637CA8',
  '0070C0'
];
var palette = [
  'D7D7D7',
  'C9B479',
  'DCCFA8',
  'C97890',
  'DCA8B8',
  'CCE2F8',
  '994C5D',
  'CA949F',
  '6E63A8',
  'A7A7CE',
  '637CA8',
  '9AC6C4',
  '63A8A5',
  '479329',
  '8DD772',
  'ADFF6A',
  '937C39',
  '33B569',
  '63D391',
  '0070C0'
];
Map.addLayer(rf_classified, {max: 20, min: 1, palette: palette}, 'classified');
// Get a confusion matrix representing resubstitution accuracy.
var trainAccuracy = rf.confusionMatrix();
print('Resubstitution error matrix: ', trainAccuracy);
print('Training overall accuracy: ', trainAccuracy.accuracy());
// LEGEND
// https://mygeoblog.com/2016/12/09/add-a-legend-to-to-your-gee-map/
// Set position of panel:
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '2px 15px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'Landcover',
  style: {
    fontWeight: 'bold',
    fontSize: '12px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
// Add the title to the panel:
legend.add(legendTitle);
// Creates and styles 1 row of the legend.
var makeRow = function(color, name) {
      // Create the label that is actually the colored box.
      var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
          // Use padding to give the box height and width.
          padding: '8px',
          margin: '0 0 4px 0'
        }
      });
      // Create the label filled with the description text.
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}
      });
      // return the panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
//  Palette with the colors
var pal = palette;
// name of the legend
var names = ['1','2','3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14',
             '15', '16', '17', '18', '19', '20'];
var classes_N = 20;
// Add color and and names
for (var i = 0; i < classes_N; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
// add legend to map (alternatively you can also print the legend to the console)
Map.add(legend);
Export.image.toDrive({
  image: rf_classified,
  description: 'rf_classified',
  scale: 10,
  fileFormat: 'GeoTIFF',
  maxPixels: 10000000000000,
  region: aoi
});
Export.table.toDrive({
  collection: training,
  description:'vectorsToDriveExample',
  fileFormat: 'csv'
});