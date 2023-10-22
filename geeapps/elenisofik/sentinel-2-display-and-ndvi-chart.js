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
    }) || {"opacity":1,"bands":["B1","B2","B3"],"min":4548.970209156322,"max":8036.718124177011,"gamma":1};
//poi
var LAT=ui.url.get('lat');
var LONG=ui.url.get('long');
var poi = ee.Geometry.Point(LAT,LONG);
// S2 image
var sentinel = ee.ImageCollection('COPERNICUS/S2').filterDate('2019-01-01','2019-12-31').filterBounds(poi).filter(ee.Filter.lt('CLOUD_COVERAGE_ASSESSMENT', 20))
print(sentinel);
//NDVI and doy
var addVariables = function(image) {
  return image.addBands(image.normalizedDifference(['B5', 'B4']).rename('NDVI')).float()
    .addBands(ee.Image.constant(1));
};
var sentinel_col = sentinel.map(addVariables);
var sentinel_ndvi = sentinel_col.select('NDVI');
//print(sentinel_ndvi);
var ndviChart = ui.Chart.image.series(sentinel_ndvi, poi, ee.Reducer.mean(), 30);
  ndviChart.setOptions({
    title: 'Sentinel NDVI',
    vAxis: {title: 'NDVI'},
    hAxis: {title: 'date', format: 'MM-yy'},
  });
print(ndviChart);
function addImage(image) { // display each image in collection
  var id = image.id
  var image = ee.Image(image.id)
  Map.addLayer(image)
}
sentinel.evaluate(function(sentinel) {  // use map on client-side
  sentinel.features.map(addImage)
})
//initiate
var initGeometry = ee.Geometry.Point([LAT, LONG]);
Map.centerObject(initGeometry);
Map.setZoom(15);