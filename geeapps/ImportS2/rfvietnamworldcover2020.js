var aoi = ui.import && ui.import("aoi", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                105.97505333259215,
                20.77764022696896
              ],
              [
                105.97505333259215,
                19.832296289547628
              ],
              [
                106.59028770759215,
                19.832296289547628
              ],
              [
                106.59028770759215,
                20.77764022696896
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
      "color": "#98ff00",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #98ff00 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[105.97505333259215, 20.77764022696896],
          [105.97505333259215, 19.832296289547628],
          [106.59028770759215, 19.832296289547628],
          [106.59028770759215, 20.77764022696896]]], null, false),
    Vietnam = ui.import && ui.import("Vietnam", "table", {
      "id": "users/ImportS2/VientnamZone"
    }) || ee.FeatureCollection("users/ImportS2/VientnamZone");
// A Sentinel-2 surface reflectance image, reflectance bands selected,
// serves as the source for training and prediction in this contrived example.
var startDate = '2022-01-01';
var endDate = '2022-12-30';
var inBands = ee.List(["B2","B3","B4","B5","B6","B7","B8","B8A","B11","B12"]);
var outBands = ee.List(["blue","green","red","re1","re2","re3","nir","re4","swir1","swir2"]);
var img = ee.ImageCollection("COPERNICUS/S2_SR")
              .select('B.*')
              .filterBounds(aoi)
              .filterDate (startDate, endDate)
              .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',10))
              .map(s2ScaleAndBareEssentials)
              // .number()
              .first()
              // .mean()
              // .int()
              // .median()
print(img)
function s2ScaleAndBareEssentials(img) {
  var s2 = img.select(inBands).divide(10000).addBands(img.select(['QA60','SCL','MSK_CLDPRB']));
  return img;
}
// var s2 = s2.map(s2ScaleAndBareEssentials)
// // Function to mask clouds using the Sentinel-2 QA band.
// // cloud function to remove clouds. Through https://mygeoblog.com/2016/10/26/sentinel-1-2-for-high-resolution-landuse-mapping/
var maskClouds = function(image){
var cloudProb = image.select('MSK_CLDPRB');
var scl = image.select('SCL'); // 3 = cloud shadow
var shadow = scl.eq(3);
var mask = cloudProb.lt(5).or(shadow).eq(1);
return image.updateMask(mask);
};
// var s2= s2.map(maskClouds)
// ESA WorldCover land cover map, used as label source in classifier training.
var lc = ee.Image('ESA/WorldCover/v100/2020').clip(Vietnam);
// Remap the land cover class values to a 0-based sequential series.
var classValues = [10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 100];
var remapValues = ee.List.sequence(0, 10);
var label = 'lc';
lc = lc.remap(classValues, remapValues).rename(label).toByte();
// Add land cover as a band of the reflectance image and sample 100 pixels at
// 10 m scale from each land cover class within a region of interest.
// var roi = ee.Geometry.Rectangle(-122.347, 37.743, -122.024, 37.838);
var sample = img.addBands(lc).stratifiedSample({
  numPoints: 20000,
  classBand: label,
  region: aoi,
  scale: 10,
  geometries: true
});
// Add a random value field to the sample and use it to approximately split 80%
// of the features into a training set and 20% into a validation set.
sample = sample.randomColumn();
var trainingSample = sample.filter('random <= 0.7');
var validationSample = sample.filter('random > 0.7');
// Train a 10-tree random forest classifier from the training sample.
var trainedClassifier = ee.Classifier.smileRandomForest(10).train({
  features: trainingSample,
  classProperty: label,
  inputProperties: img.bandNames()
});
var dict = trainedClassifier.explain();
var variable_importance = ee.Feature(null, ee.Dictionary(dict).get('importance'));
// plot the variable importance
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
// Get information about the trained classifier.
print('Results of trained classifier', trainedClassifier.explain());
// Get a confusion matrix and overall accuracy for the training sample.
var trainAccuracy = trainedClassifier.confusionMatrix();
print('Training error matrix', trainAccuracy);
print('Training overall accuracy', trainAccuracy.accuracy());
// Get a confusion matrix and overall accuracy for the validation sample.
validationSample = validationSample.classify(trainedClassifier);
var validationAccuracy = validationSample.errorMatrix(label, 'classification');
print('Validation error matrix', validationAccuracy);
print('Validation accuracy', validationAccuracy.accuracy());
// Classify the reflectance image from the trained classifier.
var imgClassified = img.classify(trainedClassifier);
var OA = trainAccuracy.accuracy();
var CA = trainAccuracy.consumersAccuracy();
var Kappa = trainAccuracy.kappa();
var Order = trainAccuracy.order();
var PA = trainAccuracy.producersAccuracy();
print(trainAccuracy,'Confusion Matrix');
print(OA,'Overall Accuracy');
print(CA,'Consumers Accuracy');
print(Kappa,'Kappa');
print(Order,'Order');
print(PA,'Producers Accuracy');
// var confMatrix = validationSample.errorMatrix("class","Mode");
var OA = validationAccuracy.accuracy();
var CA = validationAccuracy.consumersAccuracy();
var Kappa = validationAccuracy.kappa();
var Order = validationAccuracy.order();
var PA = validationAccuracy.producersAccuracy();
print(validationAccuracy,'Confusion Matrix');
print(OA,'Overall Accuracy');
print(CA,'Consumers Accuracy');
print(Kappa,'Kappa');
print(Order,'Order');
print(PA,'Producers Accuracy');
// Add the layers to the map.
var classVis = {
  min: 0,
  max: 10,
  palette: ['006400' ,'ffbb22', 'ffff4c', 'f096ff', 'fa0000', 'b4b4b4',
            'f0f0f0', '0064c8', '0096a0', '00cf75', 'fae6a0']
};
// Map.setCenter(107.7076, 12.1801, 8);
Map.addLayer(img, {bands: ['B11', 'B8', 'B3'], min: 100, max: 3500}, 'img');
Map.addLayer(lc, classVis, 'lc');
Map.addLayer(imgClassified, classVis, 'Classified');
Map.addLayer(aoi, {color: 'white'}, 'ROI', false, 0.5);
Map.addLayer(trainingSample, {color: 'red'}, 'Training sample', false);
Map.addLayer(validationSample, {color: 'green'}, 'Validation sample', false);
var legend = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px'
  }
});
var Startime = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'LEGEND',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
var timeTitle = ui.Label({
  value: 'TIME',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
// Add the title to the panel
legend.add(legendTitle);
Startime.add(timeTitle);
// title.add(nameTitle);    
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
var palette =['006400' ,'ffbb22', 'ffff4c', 'f096ff', 'fa0000', 'b4b4b4',
            'f0f0f0', '0064c8', '0096a0', '00cf75', 'fae6a0'];
// name of the legend
var names = ['Trees','Shrubland','Grassland','Cropland','Built-up','Barren/sparse vegetation','Snow and ice','Open water','Herbaceous wetland','Mangroves','Moss and lichen'];
// Add color and and names
for (var i = 0; i < 11; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
// add legend to map (alternatively you can also print the legend to the console)  
Map.add(legend);
Map.add(Startime);