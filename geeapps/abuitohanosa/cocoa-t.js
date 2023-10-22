var table = ui.import && ui.import("table", "table", {
      "id": "projects/ee-abuitohanosa/assets/Shrub2_JDL"
    }) || ee.FeatureCollection("projects/ee-abuitohanosa/assets/Shrub2_JDL"),
    table2 = ui.import && ui.import("table2", "table", {
      "id": "users/abuitohanosa/Forest_JDL"
    }) || ee.FeatureCollection("users/abuitohanosa/Forest_JDL"),
    table3 = ui.import && ui.import("table3", "table", {
      "id": "users/abuitohanosa/Cocoa_JDL"
    }) || ee.FeatureCollection("users/abuitohanosa/Cocoa_JDL"),
    table4 = ui.import && ui.import("table4", "table", {
      "id": "projects/bold-camera-305214/assets/Cleaned_Cocoa"
    }) || ee.FeatureCollection("projects/bold-camera-305214/assets/Cleaned_Cocoa"),
    image = ui.import && ui.import("image", "image", {
      "id": "projects/bold-camera-305214/assets/A_JRC_Stack3"
    }) || ee.Image("projects/bold-camera-305214/assets/A_JRC_Stack3"),
    table5 = ui.import && ui.import("table5", "table", {
      "id": "users/abuitohanosa/Cocoa_GT"
    }) || ee.FeatureCollection("users/abuitohanosa/Cocoa_GT"),
    table22 = ui.import && ui.import("table22", "table", {
      "id": "users/abuitohanosa/TD/13467_a"
    }) || ee.FeatureCollection("users/abuitohanosa/TD/13467_a"),
    roi = ui.import && ui.import("roi", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -1.8602827407605593,
                6.177425499520609
              ],
              [
                -1.8592527724988406,
                6.1694468686861175
              ],
              [
                -1.8505838729627078,
                6.166502851565943
              ],
              [
                -1.8444470436481897,
                6.170321565957487
              ],
              [
                -1.8362501479871218,
                6.175846849481776
              ],
              [
                -1.843760333228821,
                6.18356938998057
              ],
              [
                -1.8487814285047,
                6.183697386939715
              ],
              [
                -1.8545320846326296,
                6.181094776015214
              ],
              [
                -1.8586090423352664,
                6.179132142915325
              ]
            ]
          ],
          "geodesic": true,
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
        [[[-1.8602827407605593, 6.177425499520609],
          [-1.8592527724988406, 6.1694468686861175],
          [-1.8505838729627078, 6.166502851565943],
          [-1.8444470436481897, 6.170321565957487],
          [-1.8362501479871218, 6.175846849481776],
          [-1.843760333228821, 6.18356938998057],
          [-1.8487814285047, 6.183697386939715],
          [-1.8545320846326296, 6.181094776015214],
          [-1.8586090423352664, 6.179132142915325]]]),
    table6 = ui.import && ui.import("table6", "table", {
      "id": "projects/ee-abuitohanosa/assets/CocoaT_points"
    }) || ee.FeatureCollection("projects/ee-abuitohanosa/assets/CocoaT_points");
var td = table.merge(table2).merge(table3)
var td = table3.filterBounds(roi)
// Map.addLayer(td)
var raster = image.clip(roi)
// Map.addLayer(table5)
var boundary = roi
var image1 = ee.Image('COPERNICUS/Landcover/100m/Proba-V-C3/Global/2019')
               .select(['discrete_classification'])
               .clip(boundary)
               //.reduceResolution({reducer: ee.Reducer.mode(), maxPixels: 1024})
               .reproject('EPSG:4326', null, 10)
              .remap([20,30,40,50,60,70,80,90,100,111,112,113,114,115,116,121,122,123,124,125,126,200],[0,0,0,0,0,0,0,0,0,0,2,0,0,0,3,0,4,0,0,0,5,0]);
//.remap([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17],[5,0,0,0,0,0,2,2,1,1,1,6,3,4,3,7,8,8]);
//add Lon % Lat bands
var image2 = image1.addBands(ee.Image.pixelLonLat().reproject(image1.projection()));
print(image2);
//Randomly generate sample points
var points = image2.stratifiedSample({
  numPoints:630,
  classBand:'remapped',
  region: boundary,
  seed: 2, 
  dropNulls: true, 
  });
// add Lon % Lat to get points geometry
 points = points.map(function(point){
  var long = point.get("longitude");
  var lat = point.get("latitude");
  var geom = ee.Algorithms.GeometryConstructors.Point([long, lat]);
  return point.setGeometry(geom);
});
print(points);
var points = points.merge(table6)
var bands = raster.bandNames()
/*******************************
Classification
********************************/
// Overlay the points on the imagery to get training.
var training17 = raster.sampleRegions({
  collection: points,
  properties: ['remapped'],
  scale: 10
});
var trainingData_test = training17.randomColumn('random');
var training2017 = trainingData_test.filterMetadata('random', 'less_than', 0.7);
var validation2017 = trainingData_test.filterMetadata('random', 'not_less_than', 0.7);
// Train a RF classifier with default parameters.
var trained2017 = ee.Classifier.smileRandomForest(50,5,3).train(training2017, 'remapped', bands);
// Classify the image with the same bands used for training.
var classified2017 = raster.select(bands).classify(trained2017);
Map.addLayer(classified2017, {palette: ['FFBB22','70663E', '00CC00', '007800','666000', '8DB400'], min:1, max:6}, 'Classified')
// Classify the validation data.
// var validated = validation2017.classify(trained2017);
// Get a confusion matrix representing expected accuracy.
// var testAccuracy = validated.errorMatrix('OBJECTID_3', 'classification');
// print('Validation error matrix: ', testAccuracy);
// print('Validation overall accuracy: ', testAccuracy.accuracy());
var validation = validation2017.classify(trained2017);
var errorMatrix2017 = validation.errorMatrix('remapped', 'classification');
var acc = ee.FeatureCollection([
  ee.Feature(null, { // feature as dictionary and without geometry
    "array": errorMatrix2017.array(),
    "Validation overall accuracy": errorMatrix2017.accuracy(),
    "Consumers Accuracy": errorMatrix2017.consumersAccuracy(),
    "Producers Accuracy": errorMatrix2017.producersAccuracy(),
    "Kappa coefficient": errorMatrix2017.kappa(),
  })
]);
print(acc)
var visParams = {
  min: 1.0,
  max: 5.0,
  palette: ['FFBB22','4E751F', '00CC00', '007800','#A0DC00'],
};
 // Compute modal value as texture of the the classification.
var classified_img_mv = classified2017.reproject({crs: 'EPSG:4326', scale:10}).reduceNeighborhood({
   reducer: ee.Reducer.mode(),
   kernel: ee.Kernel.square({radius: 3, 
                             units: 'pixels'}),
 });
Map.addLayer(classified_img_mv, visParams, 'Classified MV');
Map.addLayer(table5)
//__________________________________________Export_____________________________________________________________________
var names = [
  'Cocoa',
  'Closed forest, evergreen broad leaf. Tree canopy >70 %, almost all broadleaf trees remain green year round. Canopy is never without green foliage.',
  'Closed forest, not matching any of the other definitions.',
  'Open forest, evergreen broad leaf. Top layer- trees 15-70 % and second layer- mixed of shrubs and grassland, almost all broadleaf trees remain green year round. Canopy is never without green foliage.',
  'Open forest, not matching any of the other definitions.',
  ];
var values = [
  '1',
  '2',
  '3',
  '4',
  '5'];
var elevationPalette = ['FFBB22','4E751F', '00CC00', '007800','A0DC00'];
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '19px 19px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'Legend ',//Degree of urbanization
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
// Add the title to the panel
legend.add(legendTitle);
var makeRow = function(color, name) {
  // Create the label that is actually the colored box.
  var colorBox = ui.Label({
    style: {
      backgroundColor: '#' + color,
      // Use padding to give the box height and width.
      padding: '18px',
      margin: '0 0 18px 0'
    }
  });
  // Create the label filled with the description text.
  var description = ui.Label({
    value: name,
    style: {margin: '0 0 16px 16px'}
  });
  // return the panel
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};
// Add color and and names
for (var i = 0; i < 5; i++) {
  legend.add(makeRow(elevationPalette[i], names[i]));
  }  
// Add the legend to the map.
Map.add(legend);