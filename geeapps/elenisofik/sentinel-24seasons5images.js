var imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "B1",
          "B2",
          "B3"
        ],
        "min": 4548.970209156322,
        "max": 8036.718124177011,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["B1","B2","B3"],"min":4548.970209156322,"max":8036.718124177011,"gamma":1},
    imageVisParam2 = ui.import && ui.import("imageVisParam2", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "B4",
          "B3",
          "B2"
        ],
        "min": 300,
        "max": 3900,
        "gamma": 1.6520000000000001
      }
    }) || {"opacity":1,"bands":["B4","B3","B2"],"min":300,"max":3900,"gamma":1.6520000000000001},
    imageVisParam3 = ui.import && ui.import("imageVisParam3", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "B4",
          "B3",
          "B2"
        ],
        "min": 300,
        "max": 3900,
        "gamma": 1.3190000000000002
      }
    }) || {"opacity":1,"bands":["B4","B3","B2"],"min":300,"max":3900,"gamma":1.3190000000000002},
    imageVisParam4 = ui.import && ui.import("imageVisParam4", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "constant"
        ],
        "gamma": 3.109
      }
    }) || {"opacity":1,"bands":["constant"],"gamma":3.109};
//poi
var LAT=ui.url.get('lat');
var LONG=ui.url.get('long');
var poi = 
ee.Geometry.Point(LAT,LONG);
//polygon
var areaM2 = 900
var square = poi.buffer(ee.Number(900).sqrt().divide(2), 1).bounds()
print('expected (m2)', areaM2)
print('area (m2)', square.area(1))
print('error (m2)', square.area(1).subtract(areaM2))
//feature collection to vizualize polygon
var fromGeom = ee.FeatureCollection(square);
// Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();
// Paint all the polygon edges with the same number and width, display.
var outline = empty.paint({
  featureCollection: fromGeom,
  color: 1,
  width: 1
});
// S2 image
var sentinel = ee.ImageCollection('COPERNICUS/S2').filterDate('2019-01-01','2019-12-31').filterBounds(poi).filter(ee.Filter.lt('CLOUD_COVERAGE_ASSESSMENT', 3)).sort('CLOUD_COVERAGE_ASSESSMENT');
//make summer collection
var summer=sentinel.filterDate('2019-06-01','2019-09-01');
// select first
var listOfImages = summer.toList(summer.size());
var firstImage = listOfImages.get(0);
var secondImage = listOfImages.get(1);
// Create a collection with fromImages().
var summercollectionFromImages = ee.ImageCollection.fromImages(
  [firstImage, secondImage]);
//make spring collection
var spring=sentinel.filterDate('2019-03-01','2019-06-01');
// select first
var listOfImages = spring.toList(spring.size());
var firstImage = listOfImages.get(0);
// Create a collection with fromImages().
var springcollectionFromImages = ee.ImageCollection.fromImages(
  [firstImage]);
//make autumn collection
var autumn=sentinel.filterDate('2019-09-01','2019-12-01');
// select first
var listOfImages = autumn.toList(autumn.size());
var firstImage = listOfImages.get(0);
// Create a collection with fromImages().
var autumncollectionFromImages = ee.ImageCollection.fromImages(
  [firstImage]);
//make winter collection
var winter1= sentinel.filterDate('2019-12-01','2019-12-31');
var winter2 =sentinel.filterDate('2019-01-01','2019-03-01');
var winter = ee.ImageCollection(winter1.merge(winter2));
// select first
var listOfImages = winter.toList(winter.size());
var firstImage = listOfImages.get(0);
// Create a collection with fromImages().
var wintercollectionFromImages = ee.ImageCollection.fromImages(
  [firstImage]);
//merge collections
var collection=wintercollectionFromImages.merge(autumncollectionFromImages).merge(summercollectionFromImages).merge(springcollectionFromImages);
print(collection);
// Define the visualization parameters.
var vizParams = {
  bands: ['B4', 'B3', 'B2'],
  min: 0,
  max: 2500,
};
function addImage(image) { // display each image in collection
  var id = image.id
  var name=id;
  var image = ee.Image(image.id)
  Map.addLayer(image,vizParams,name)
}
collection.evaluate(function(collection) {  // use map on client-side
  collection.features.map(addImage)
  Map.addLayer(outline, {palette: 'FF0000'}, 'plot');
  Map.addLayer(poi,{color: 'red'},'point');
})
//initiate
var initGeometry = ee.Geometry.Point([LAT, LONG]);
Map.centerObject(initGeometry);
Map.setZoom(17);