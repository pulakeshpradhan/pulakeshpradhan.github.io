var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                39.01048569124167,
                -5.63533455352467
              ],
              [
                39.01048569124167,
                -6.514758467232591
              ],
              [
                39.69713119905417,
                -6.514758467232591
              ],
              [
                39.69713119905417,
                -5.63533455352467
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [
        {
          "type": "rectangle"
        }
      ],
      "properties": {},
      "color": "#ffc82d",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #ffc82d */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[39.01048569124167, -5.63533455352467],
          [39.01048569124167, -6.514758467232591],
          [39.69713119905417, -6.514758467232591],
          [39.69713119905417, -5.63533455352467]]], null, false),
    Study_area = ui.import && ui.import("Study_area", "table", {
      "id": "cusers/dickiesda/Zanzibar"
    }) || ee.FeatureCollection("cusers/dickiesda/Zanzibar");
// Part 1: Access and pre-processing of satellite data
///////////////////////////////////
// 1.1) ACCESSING TO SATELLITE DATA
///////////////////////////////////
// Create a BOX for your study area using the GEE "Draw a rectangle" tool
// Browse satellite data (Sentinel 2)
var S2_1C = ee.ImageCollection("COPERNICUS/S2")
            .filterBounds(geometry)
            .filterDate('2016-01-01','2016-12-31')
            .filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'less_than', 40)
print(S2_1C,'Sentinel 1c row')
Map.centerObject(geometry,10)  // Zoom to your study area
// Visualise data
Map.addLayer(S2_1C, {bands:['B4','B3','B2'], min:0,max:3000}, 'S1 row')
// Visualise the image bands histogram
//var chart = ui.Chart.image.histogram({image: S2_1C.select(['B4','B3','B2']).median(), region: AOI2, scale: 50})
//print(chart);
// 1.2) CLOUD MASKING
// Create a cloud masking function
var cloud_mk_f = function(image) {
  var QA60 = image.select(['QA60']);
  var clouds = QA60.bitwiseAnd(1<<10).or(QA60.bitwiseAnd(1<<11)); // bits 10 and 11 are clouds and cirrus. To set a bit to 1, use 1 << bitIndex 
  return image.updateMask(clouds.not()); // remove clouds pixels
};
// Use “map” function to pass “mask_fun” function for each images in the images collection.
var S2_1C_masked = S2_1C.map(cloud_mk_f); 
// 1.3) MADE A CLOUDLESS IMAGE MOSAIC
var Mosaic_S2 = S2_1C_masked.median().select('B.*'); // Select only the spectral bands for further image processing
print(Mosaic_S2,'Mosaic_s2');
// Display the cloudless mosaic
//Map.addLayer(Mosaic_S2, {bands:['B4','B3','B2'], min:0,max:3000}, 'S1 cloudless')
// 1.4) IMAGE SUBSET FOR THE STUDY AREA
// Import a shapefile/feature of your study area
var Study_area = ee.FeatureCollection('users/dickiesda/Zanzibar') //("copy your Table ID here");
// Make the subset
var Mosaic_S2_land = Mosaic_S2.clip(Study_area);
print(Mosaic_S2_land,'Mosaic_S2_land');
// Display the clipped mosaic ??
Map.addLayer(Mosaic_S2_land, {bands:['B4','B3','B2'], min:0,max:3000}, 'Mosaic_S2_land')
//////////////////////////////////////////////////////
// PART 2. IMAGE CLASSIFICATION USING MACHINE LEARNING
//////////////////////////////////////////////////////
// 2.1) IMPORT TRAINING SAMPLES COLLECTED BY CEO
var samples_tanz = ee.FeatureCollection('users/dickiesda/Zamzibar_LULC_data_collection_2022_Sample_Selected3');
print(samples_tanz,'samples_tanz');
// 1 Agroforests and tree farms, 2 Bare land/sand, 3 Built land
// 4 Coral rag forests/scrubland, 5 Forest plantation, 6 Grasslands
// 7 Mangrove, 8 Natural high forest, 9 Open farmlands, 10 Shifting cultivation,
var samples_tanz_2 = samples_tanz.randomColumn();
// Split the sample into “training” (70%) and “validation” (30%) samples
var training = samples_tanz_2.filter(ee.Filter.gt('random',0.3));
var validation = samples_tanz_2.filter(ee.Filter.lte('random',0.3));
print('training', training);
//Map.addLayer(training.draw('red'),{}, 'train_samples_tanz', false);
print('validation', validation);
//Map.addLayer(validation.draw('yellow'),{},'validation_samples_tanz', false);
// 2.2) EXTRACT VALUES FROM THE SATELLITE IMAGE BANDS TO THE SAMPLE POINTS 
// Select the relevant bands for the classification purpose
var bands_names = ['B2','B3','B4','B5','B6','B7','B8','B8A','B11','B12'];
var my_training = Mosaic_S2_land.select(bands_names).sampleRegions({
  collection: training,
  properties: ['Code'], // The field of the numeric class code
  scale: 10
});
// PLOT SPECTRAL PROFILE
// Use a grouped reducer to calculate the average reflectance for each band for each class
// As there are 10 bands, you will need to repeat the reducer 10 times
// Find the “index” of the land cover property and use it to group the results
var bands = Mosaic_S2_land.select(bands_names).bandNames();
var numBands = bands.length();
var bandsWithClass =  bands.add('Code');
var classIndex = bandsWithClass.indexOf('Code');
// Estimate 'mean' and 'stdDev' by using the .combine() GEE function
var Mean_SD = ee.Reducer.mean().combine({
  reducer2: ee.Reducer.stdDev(),
  sharedInputs: true});
// Use .repeat() to get a reducer for each band
// We then use .group() to get stats by class
var Group_Mean_SD = Mean_SD.repeat(numBands).group(classIndex);
var Sample_Stats = my_training.reduceColumns({
    selectors: bands.add('Code'),
    reducer: Group_Mean_SD,
    });
// Result is a dictionary, we do some post-processing to extract the results
var groups = ee.List(Sample_Stats.get('groups'));
print(groups,'groups');
var classNames = ee.List(['Agroforest', 'Bare land', 'Built land', 'Coral rag', 'Forest plantation', 'Grassland',
                  'Mangrove', 'Natural forest', 'Farmland','Shifting cultivastion'])
var Class_stat = ee.FeatureCollection(groups.map(function(item) {
  // Extract the means
  var values = ee.Dictionary(item).get('mean')
  var groupNumber = ee.Dictionary(item).get('group')
  var properties = ee.Dictionary.fromLists(bands, values)
  var withClass = properties.set('class', classNames.get(groupNumber))
  return ee.Feature(null, withClass)
  }));
print(Class_stat,'Class_stat');
// Create the chart
var chart = ui.Chart.feature.byProperty({
  features: Class_stat,
  seriesProperty: 'class'
})
.setChartType('ScatterChart')
.setOptions({lineWidth: 1, pointSize: 4}); //set options
print(chart);
// TRAIN RANDOM FOREST CLASSIFIER
var classifier_rf = ee.Classifier.smileRandomForest({
                      numberOfTrees:300,
                      variablesPerSplit:4, // default sqr of the nro of variables
                      bagFraction: 0.3, // default 0.5
                     // maxNodes: 50 // default is unlimited
                      })
                    .train({
                    features: my_training,
                    classProperty: 'Code',
                    inputProperties: bands_names
                    });
// Classify the image with classifier_rf, use same bands as for training
var classified_rf = Mosaic_S2_land.select(bands_names).classify(classifier_rf);
print(classified_rf,'classified_rf');
// Display RF classified image
// https://upload.wikimedia.org/wikipedia/commons/2/2b/SVG_Recognized_color_keyword_names.svg
var palette0 = [
 '#FFFF00', // yellow', // 1 Agroforests and tree farms
 '#FFFFFF', // white', // 2 Bare land/sand
 '#000000', // 'black',// 2 Built land
 '#00FFFF', // 'aqua', // 4 Coral rag forests/scrubland
 '#00FF00', // 'lime', // 5 Forest plantation
 '#800000', // 'maroon', // 6 Grasslands
 '#FF00FF', // 'fuchsia',// 7 Mangrove
 '#008000', // 'green', // 8 Natural high forest
 '#FFC0CB', // 'pink' , // 9 Open farmlands
 '#FF0000', // 'red', // 10 Shifting cultivation
];
//Map.addLayer(classified_rf, {min: 0, max: 9, palette: palette0}, 'LC_RF');
//////////////////////////////////////////////////////////
// 2.4. Evaluating the performance of the classification
/////////////////////////////////////////////////////////
// Checkup the variable importance in RF
var classifier_rf_var_importance = classifier_rf.explain();
print(classifier_rf_var_importance,'Explain');
var variable_importance = ee.Feature(null, ee.Dictionary(classifier_rf_var_importance).get('importance'));
var chart =
ui.Chart.feature.byProperty(variable_importance)
.setChartType('ColumnChart')
.setOptions({
title: 'Random Forest Variable Importance',
legend: {position: 'none'},
hAxis: {title: 'Bands'},
vAxis: {title: 'Importance'}
});
print(chart);
// Random forest evaluation
var validation_RF = classified_rf.sampleRegions({
  collection: validation, // your validation data
  properties: ['Code'], // field of your classes
  scale: 10,
});
print(validation_RF,'validation');
// Compare the landcover of your validation data against the classification output
var testAccuracy_RF = validation_RF.errorMatrix('Code', 'classification'); // 'classification' is the property of classified image
print(testAccuracy_RF, ' RF Validation error matrix');
// Calculate overall accuracy.
print("RF Overall accuracy", testAccuracy_RF.accuracy());
// Calculate user's accuracy or
// specificity and the complement of commission error (1 − commission error).
print("RF User's accuracy", testAccuracy_RF.consumersAccuracy());
// Calculate producer's accuracy, also known as sensitivity and the
// compliment of omission error (1 − omission error).
print("RF Producer's accuracy", testAccuracy_RF.producersAccuracy());
// Calculate kappa statistic.
print('RF Kappa statistic', testAccuracy_RF.kappa());
//////////////////////////////////////
// 2.5. POST CLASSIFICATION PROCESSING
//////////////////////////////////////
// Weighted smoothing using a 3x3 window
// euclidean distance weighting from corners
var weights = [[1,2,1],
               [2,3,2],
               [1,2,1]];
// create a 3x3 kernel with the weights
// kernel W and H must equal weight H and H
var kernel = ee.Kernel.fixed(3,3,weights);
// apply mode on neightborhood using weights
// and force operations to be done at native scale
var classified_rf_post = classified_rf.reduceNeighborhood({
  reducer: ee.Reducer.mode(),
  kernel: kernel
});
Map.addLayer(classified_rf_post, {min: 0, max: 9, palette: palette0}, 'LC_RF_post');
////////////////////////////////////
// 2.6. EXPORT YOUR CLASSIFIED IMAGE
////////////////////////////////////
Export.image.toDrive({
  image: classified_rf_post,
  description: 'classified_rf_post',
  scale: 10
})
////////////////////////////////////////////////
//  2.7). Add Map Legend for GEE App Publications
////////////////////////////////////////////////
var legend = ui.Panel({style: {position: 'bottom-right', padding: '8px 15px'}});
var makeRow = function(color, name) {
  var colorBox = ui.Label({
    style: {color: '#ffffff',
      backgroundColor: color,
      padding: '10px',
      margin: '0 0 4px 0',
    }
  });
  var description = ui.Label({
    value: name,
    style: { 
      margin: '0px 0 4px 6px',
    }
  }); 
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')}
)};
var title = ui.Label({
  value: 'Legend',
  style: {fontWeight: 'bold',
    fontSize: '16px',
    margin: '0px 0 4px 0px'}});
legend.add(title);
legend.add(makeRow('yellow','Agroforests and tree farms'))
legend.add(makeRow('white','Bare land/sand'))
legend.add(makeRow('black','Built land'))
legend.add(makeRow('aqua','Coral rag forests/scrubland'))
legend.add(makeRow('lime','Forest plantation'))
legend.add(makeRow('brown','Grasslands'))
legend.add(makeRow('fuchsia','Mangrove'))
legend.add(makeRow('green','Natural high forest'))
legend.add(makeRow('pink','Open farmlands'))
legend.add(makeRow('red','Shifting cultivation'))
Map.add(legend);