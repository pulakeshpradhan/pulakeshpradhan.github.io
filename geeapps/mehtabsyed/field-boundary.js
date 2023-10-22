// An example finding linear features using the HoughTransform.
// Load an image and compute NDVI.
var point = ee.Geometry.Point(-97.5826, 37.8062)
var addNDVI = function(image) {
  return image.addBands(image.normalizedDifference(['B8', 'B4']).rename('ndvi'));
};
var images = ee.ImageCollection('COPERNICUS/S2').filterBounds(point)
.filterDate('2017-09-25', '2018-10-30')
.filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 5)).map(addNDVI)
function onlyNdvi(image, list){
  return ee.List(list).add(ee.Image(image.select(['ndvi'])))
}
var ndviList =  ee.List([])
images  = ee.ImageCollection(ee.List(images.iterate(onlyNdvi,ndviList)))
// var agLayer = images.mean().gt(0.2)
// images = images.mean().updateMask(agLayer)
// Map.addLayer(images,{},"agri")
// Apply a Canny edge detector.
var canny = ee.Algorithms.CannyEdgeDetector({
  image: images.max(),
  threshold: 0.2
}).multiply(255);
// Apply the Hough transform.
var h = ee.Algorithms.HoughTransform({
  image: canny,
  gridSize: 256,
  inputThreshold: 50,
  lineThreshold: 100
});
// Display.
Map.setCenter(-97.5826, 37.8062,13);
// Map.addLayer(image, {bands: ['B4', 'B3', 'B2'], max: 0.3}, 'source_image');
Map.addLayer(canny.updateMask(canny), {min: 0, max: 1, palette: 'red'}, ' EDGE 2', false);
Map.addLayer(h.updateMask(h), {min: 0, max: 1, palette: 'yellow'}, ' EDGE 1');