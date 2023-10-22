var S2MSI_2A = ui.import && ui.import("S2MSI_2A", "imageCollection", {
      "id": "COPERNICUS/S2_SR"
    }) || ee.ImageCollection("COPERNICUS/S2_SR"),
    ROI = ui.import && ui.import("ROI", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                34.02900585840234,
                -8.978865781805077
              ],
              [
                34.02900585840234,
                -9.888549170646792
              ],
              [
                34.83375439355859,
                -9.888549170646792
              ],
              [
                34.83375439355859,
                -8.978865781805077
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[34.02900585840234, -8.978865781805077],
          [34.02900585840234, -9.888549170646792],
          [34.83375439355859, -9.888549170646792],
          [34.83375439355859, -8.978865781805077]]], null, false),
    ROI2 = ui.import && ui.import("ROI2", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                34.19407695697191,
                -9.598581288500634
              ],
              [
                34.19407695697191,
                -9.853049092725389
              ],
              [
                34.47697490619066,
                -9.853049092725389
              ],
              [
                34.47697490619066,
                -9.598581288500634
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#f3ee1a",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #f3ee1a */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[34.19407695697191, -9.598581288500634],
          [34.19407695697191, -9.853049092725389],
          [34.47697490619066, -9.853049092725389],
          [34.47697490619066, -9.598581288500634]]], null, false),
    ROI_Za = ui.import && ui.import("ROI_Za", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                39.27489899791635,
                -5.7670504904216715
              ],
              [
                39.25292634166635,
                -5.843560366044375
              ],
              [
                39.20348786510385,
                -5.881811391726289
              ],
              [
                39.17602204479135,
                -5.94737844914409
              ],
              [
                39.18151520885385,
                -6.075757885173857
              ],
              [
                39.1732754627601,
                -6.149493971362981
              ],
              [
                39.2117276111976,
                -6.245062554184933
              ],
              [
                39.2776455799476,
                -6.351532704392256
              ],
              [
                39.35180329479135,
                -6.362451480986133
              ],
              [
                39.4149746815101,
                -6.444334883057109
              ],
              [
                39.46715974010385,
                -6.4989164858860144
              ],
              [
                39.54406403697885,
                -6.51256096310315
              ],
              [
                39.62096833385385,
                -6.4033948236703
              ],
              [
                39.5907559315101,
                -6.255983572355075
              ],
              [
                39.54406403697885,
                -6.122185495332121
              ],
              [
                39.47265290416635,
                -6.083951284711745
              ],
              [
                39.4149746815101,
                -5.9501102408486375
              ],
              [
                39.3820156971351,
                -5.840828049709942
              ],
              [
                39.37926911510385,
                -5.764317803196765
              ],
              [
                39.3325772205726,
                -5.695996362584057
              ],
              [
                39.28039216197885,
                -5.67139864947799
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[39.27489899791635, -5.7670504904216715],
          [39.25292634166635, -5.843560366044375],
          [39.20348786510385, -5.881811391726289],
          [39.17602204479135, -5.94737844914409],
          [39.18151520885385, -6.075757885173857],
          [39.1732754627601, -6.149493971362981],
          [39.2117276111976, -6.245062554184933],
          [39.2776455799476, -6.351532704392256],
          [39.35180329479135, -6.362451480986133],
          [39.4149746815101, -6.444334883057109],
          [39.46715974010385, -6.4989164858860144],
          [39.54406403697885, -6.51256096310315],
          [39.62096833385385, -6.4033948236703],
          [39.5907559315101, -6.255983572355075],
          [39.54406403697885, -6.122185495332121],
          [39.47265290416635, -6.083951284711745],
          [39.4149746815101, -5.9501102408486375],
          [39.3820156971351, -5.840828049709942],
          [39.37926911510385, -5.764317803196765],
          [39.3325772205726, -5.695996362584057],
          [39.28039216197885, -5.67139864947799]]]),
    ROI_Za2 = ui.import && ui.import("ROI_Za2", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                39.195401983492275,
                -6.06050052031952
              ],
              [
                39.195401983492275,
                -6.110343183184565
              ],
              [
                39.25273688339462,
                -6.110343183184565
              ],
              [
                39.25273688339462,
                -6.06050052031952
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#98ff00",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #98ff00 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[39.195401983492275, -6.06050052031952],
          [39.195401983492275, -6.110343183184565],
          [39.25273688339462, -6.110343183184565],
          [39.25273688339462, -6.06050052031952]]], null, false),
    Zanz_border0 = ui.import && ui.import("Zanz_border0", "table", {
      "id": "users/caangonz/Zanzinbar"
    }) || ee.FeatureCollection("users/caangonz/Zanzinbar"),
    S2MSI_1C = ui.import && ui.import("S2MSI_1C", "imageCollection", {
      "id": "COPERNICUS/S2"
    }) || ee.ImageCollection("COPERNICUS/S2"),
    table = ui.import && ui.import("table", "table", {
      "id": "users/caangonz/ZZ_2022"
    }) || ee.FeatureCollection("users/caangonz/ZZ_2022"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            39.33444452721896,
            -6.099993218916943
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Point([39.33444452721896, -6.099993218916943]);
// STEP 1. CREATING SENTINEL 2 IMAGE MOSAIC FOR MAPPING LAND COVER
// Load a study area shapefile
var Zanz_border = ee.FeatureCollection('users/caangonz/Zanzinbar');
Map.addLayer(Zanz_border,{},'Zanz_boder');
Map.centerObject(Zanz_border, 10);
// A) ACCESSING TO SATELLITE DATA AND VISUALIZATION
var s2Sr = ee.ImageCollection(S2MSI_2A) // Select the image collection
                .filterBounds(Zanz_border) // Filter by area of your interest
                .filterDate('2021-01-01','2021-12-31') // Period that you are interested
                .filterMetadata('CLOUDY_PIXEL_PERCENTAGE','less_than',50) // Select a portion of cloud cover
print(s2Sr, "s2Sr")
/// B) Cloud masking
function mask_fun2(image) {
  var cloudProb = image.select('MSK_CLDPRB');
  var cloud = cloudProb.lt(10);
  var scl = image.select('SCL'); 
  var shadow = scl.eq(3); // 3 = cloud shadow
  var cirrus = scl.eq(10); // 10 = cirrus
  // Cloud probability less than 10% or cloud shadow classification
  var mask = cloud.and(cirrus.neq(1)).and(shadow.neq(1));
  return image.updateMask(mask);
}
var S2_sr_masked = s2Sr.map(mask_fun2);
//Map.addLayer(S2_sr_masked, {min:0, max:2000, bands:['B4','B3','B1']},'S2_sr_masked');
// C) Made a Cloudless Image mosaic composite
var Mosaic_S2 = S2_sr_masked.median().select('B.*');
print(Mosaic_S2,'Mosaic_s2');
//Map.addLayer(Mosaic_S2, {min:0, max:2000, bands:['B4','B3','B1']},'Mosaic_cloudless');
// D) Clip the Image for the study area
var Mosaic_S2_land = Mosaic_S2.clip(Zanz_border0);
print(Mosaic_S2_land,'Mosaic_S2_land');
Map.addLayer(Mosaic_S2_land, {bands: ['B4', 'B3', 'B2'],min:0, max: 2000}, 'Mosaic Median');
// STEP 2. IMAGE CLASSIFICATION WITH BASIC MACHINE LEARNING METHODS
// A) IMPORT TRAINING SAMPLES COLLECTED BY OPENFORIS
var samples_tanz = ee.FeatureCollection('users/caangonz/ZZ_2022');
print(samples_tanz,'samples_tanz')
// 1 Agroforests and tree farms, 2 Bare land/sand, 3 Built land
// 4 Coral rag forests/scrubland, 5 Forest plantation, 6 Grasslands
// 7 Mangrove, 8 Natural high forest, 9 Open farmlands, 10 Shifting cultivation,
//var samples_tanz2 = samples_tanz.remap([1,2,3,4,5,6,7,8,9,10],[1,2,2,1,1,3,4,1,5,5],'Code')
//print(samples_tanz2,'samples_tanz2')
// 1 Forest, 2 bareland- Built land, 3 Grasland, 4 Mangrove, 5 farland
// add a random column (by default named 'random')
var samples_tanz2 = samples_tanz.randomColumn();
// split in a training (70%) and validation (30%)
var training = samples_tanz2.filter(ee.Filter.gt('random',0.3));
var validation = samples_tanz2.filter(ee.Filter.lte('random',0.3));
print('training', training);
//Map.addLayer(training.draw('red'),{}, 'train_samples_tanz', false);
print('validation', validation);
//Map.addLayer(validation.draw('yellow'),{},'validation_samples_tanz', false);
// B) EXTRACT VALUES FROM THE SATELLITE IMAGE BANDS TO THE SAMPLE POINTS 
// Select the relevant bands for the classification purpose
var bands = ['B2','B3','B4','B5','B6','B7','B8','B8A','B11','B12'];
var my_training = Mosaic_S2_land.select(bands).sampleRegions({
  collection: training,
  properties: ['Code'], // The field of the numeric class code
  scale: 10
});
// Export training spectrals profile to excel and Plot Spectral profile
Export.table.toDrive({
  collection: my_training,
  description: 'my_training',
  fileFormat: 'CSV'
});
// C) PERFORM IMAGE CLASSIFICATION
// C.1) TRAIN A RANDOM FOREST CLASSIFIER
var classifier_rf = ee.Classifier.smileRandomForest(100)
                    //.setOutputMode('PROBABILITY')
                    .train({
                    features: my_training,
                    classProperty: 'Code',
                    inputProperties: bands
                    });
///////////////////////////////////////
// Variable importance
//////////////////////////////////////
//var classifier = ee.Classifier.smileRandomForest(5).setOutputMode('PROBABILITY').train(trainingSample,"land_class",bandNames);
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
// Classify the image with classifier_rf, use same bands as for training
var classified_rf = Mosaic_S2_land.select(bands).classify(classifier_rf);
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
//Map.addLayer(classified_rf, {min: 1, max: 10, palette: palette0}, 'LC_RF');
// Post classification
// Weighted smoothing 
// using a 3x3 window
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
})//.reproject('EPSG:4326', null, SCALE);
Map.addLayer(classified_rf_post, {min: 1, max: 10, palette: palette0}, 'LC_RF_post');
/*
// C.2) TRAIN A SUPPORT VECTOR MACHINE CLASSIFIER
// Create an SVM classifier with custom parameters.
var svm_par = ee.Classifier.libsvm({
  kernelType: 'RBF', // Radial Basis Function (RBF) kernel finction //'LINEAR',
  gamma: 0.5,
  cost: 1
});
// Train the SVM classifier.
var classifier_svm = svm_par.train(my_training, 'Code', bands);
// Classify the image with classifier_svm.
var classified_svm = Mosaic_S2_land.select(bands).classify(classifier_svm);
print(classified_svm,'classified_svm');
Map.addLayer(classified_svm, {min: 1, max: 10, palette: palette0}, 'LC_SVM', false);
// STEP 3. VISUAL AND STATISTICAL EVALUATION OF THE IMAGE CLASSIFICATIONCLASSIFICATION ASSESSMENT
// Random forest evaluation
var validation_RF = classified_rf.sampleRegions({
  collection: validation, // your validation data
  properties: ['Code'], // field of your classes
  scale: 10,
});
print(validation_RF,'validation');
// Compare the landcover of your validation data against the classification output
var testAccuracy_RF = validation_RF.errorMatrix('Code', 'classification');
// 'classification' is the property of classified image
//Print the error matrix to the console
print(testAccuracy_RF, ' RF Validation error matrix');
//Print the overall accuracy to the console
print(testAccuracy_RF.accuracy(), 'RF Validation overall accuracy');
// SVM evaluation
var validation_SVM = classified_svm.sampleRegions({
  collection: validation, // your validation data
  properties: ['Code'], // field of your classes
  scale: 30,
});
print(validation_SVM,'validation_RF');
// Compare the landcover of your validation data against the classification output
var testAccuracy_SVM = validation_SVM.errorMatrix('Code', 'classification'); // classification is the property of classified image
//Print the error matrix to the console
print(testAccuracy_SVM, 'SVM Validation error matrix');
//Print the overall accuracy to the console
print(testAccuracy_SVM.accuracy(), 'SVM Validation overall accuracy');
// EXPORT YOUR CLASSIFIED IMAGE
Export.image.toDrive({
image: classified_rf,
description: 'classified_rf', 
scale: 10,
region: ROI,
});
*/
/////////////////
// Legend
/////////////////
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
/*
// Create two maps in two panel.
// Set a center and zoom level.
var poi = {lon: 39.33, lat: -6.09, zoom: 12};
var leftMap = ui.Map(poi);
var rightMap = ui.Map(poi);
// Remove UI controls from both maps, but leave zoom control on the left map.
leftMap.setControlVisibility(false);
rightMap.setControlVisibility(false);
leftMap.setControlVisibility({zoomControl: true});
// Link them together.
var linker = new ui.Map.Linker([leftMap, rightMap]);
// Create a split panel with the two maps.
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  orientation: 'horizontal',
  wipe: true
});
// Remove the default map from the root panel.
ui.root.clear();
// Add our split panel to the root panel.
ui.root.add(splitPanel);
// Add layer
leftMap.addLayer(Mosaic_S2_land, {min:0, max:2000, bands:['B4','B3','B1']});
rightMap.addLayer(classified_rf_post, {min: 1, max: 10, palette: palette0}, 'LC_RF_post');
*/