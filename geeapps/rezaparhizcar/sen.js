/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var image = ee.ImageCollection("COPERNICUS/S2"),
    point = /* color: #bf04c2 */ee.Geometry.MultiPoint(
        [[49.58413151950202, 37.282830905320836],
         [51.72783533555523, 32.66602993577906],
         [48.47400296388779, 34.902225442018924]]);
/***** End of imports. If edited, may not auto-convert in the playground. *****/
var image = ee.Image(image.filterDate('2019-04-22','2019-08-02').filterBounds(point).sort('CLOUD_COVER').median());
// Print image details to the Console
print(image);
Map.addLayer(image,{bands:['B4','B3','B2']});
Map.addLayer(image,{bands:['B4','B3','B2'], min:0, max:3000});
Map.addLayer(image,{bands:['B8','B4','B3'], min:0, max:3000});
// // NDVI:
// var ndvi = image.expression(
//     ' ((NIR - RED) / (NIR + RED))', {
//       'NIR': image.select('B8'),
//       'RED': image.select('B4'),
// });
// var ndvivi= {
//   min: -1,
//   max: 1,
//   palette: ['blue', 'white', 'green']}
// Map.addLayer(ndvi,ndvivi,'ndvi');
// // NDWI:
// var NDWI = image.expression(
//     ' ((NIR - SWIR) / (NIR + SWIR))', {
//       'NIR': image.select('B8'),
//       'SWIR': image.select('B3'),
// });
// var NDWII= {
//   min: 0,
//   max: 1,
//   palette: ['blue', 'white', 'green']}
// Map.addLayer(NDWI,NDWII,'NDWI');
// // MI:
// var MI = image.expression(
//     ' ((b1 - b2) / (b1 + b2))', {
//       'b1': image.select('B8A'),
//       'b2': image.select('B11'),
// });
// var MII= {
//   min: 0,
//   max: 1,
//   palette: ['blue', 'white', 'green']}
// Map.addLayer(MI,MII,'MI');
// Export.image.toDrive({
// image: ndvi,
// description: 'ndvi',
// scale: 30,
// region: point,
//   maxPixels:9999999999
// });
// Export.image.toDrive({
// image: image.select( ['B5','B4','B3'] ),
// description: 'falsecolor',
// scale: 30,
// region: point,
//   maxPixels:9999999999
// });