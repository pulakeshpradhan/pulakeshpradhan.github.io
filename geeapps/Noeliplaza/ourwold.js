var n1 = parseInt(prompt("Inserta long"));
var n2 = parseInt(prompt("Inserta lat"));
var point = ee.Geometry.Point([ n1, n2 ]);
// Importar la imagen
var l8 = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA');
// Conseguir la ultima imagen de las nuves porsiaca
var image = ee.Image(
  l8.filterBounds(point)
    .filterDate('2015-01-01', '2015-12-31')
    .sort('CLOUD_COVER')
    .first()
);
//  Normalized Difference Vegetation Index (NDVI).
var nir = image.select('B5');
var red = image.select('B4');
var ndvi = nir.subtract(red).divide(nir.add(red)).rename('NDVI');
// dar el resultado
Map.centerObject(image, 9);
var ndviParams = {min: -1, max: 1, palette: ['blue', 'white', 'green']};
Map.addLayer(ndvi, ndviParams, 'NDVI image');
var ndvi = image.normalizedDifference(['B5', 'B4']).rename('NDVI');
var addNDVI = function(image) {
  var ndvi = image.normalizedDifference(['B5', 'B4']).rename('NDVI');
  return image.addBands(ndvi);
};
// probar a añadir 
var ndvi = addNDVI(image).select('NDVI');
// subir el contraste
var greenest = withNDVI.qualityMosaic('NDVI');
// dar el resultado
var visParams = {bands: ['B4', 'B3', 'B2'], max: 0.3};
Map.addLayer(greenest, visParams, 'Greenest pixel composite');
// Landsat 8 TOA image collection
var l8 = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA');
// the Landsat 8 TOA collection con el NDVI aplicado
var withNDVI = l8.map(function(image) {
  var ndvi = image.normalizedDifference(['B5', 'B4']).rename('NDVI');
  return image.addBands(ndvi);
});
// crear un cuadradillo para aplicar el NDVI
var chart = ui.Chart.image.series({
  imageCollection: withNDVI.select('NDVI'),
  region: roi,
  reducer: ee.Reducer.first(),
  scale: 30
}).setOptions({title: 'NDVI over time'});
print(chart);
var cloudlessNDVI = l8.map(function(image) {
  var cloud = ee.Algorithms.Landsat.simpleCloudScore(image).select('cloud');
  var mask = cloud.lte(20);
  var ndvi = image.normalizedDifference(['B5', 'B4']).rename('NDVI');
  return image.addBands(ndvi).updateMask(mask);
});
print(ui.Chart.image.series({
  imageCollection: cloudlessNDVI.select('NDVI'),
  region: roi,
  reducer: ee.Reducer.first(),
  scale: 30
}).setOptions({title: 'Cloud-masked NDVI over time'}));
var greenest = cloudlessNDVI.qualityMosaic('NDVI');
// Create a 3-band, 8-bit, color-IR composite to export.
var visualization = greenest.visualize({
  bands: ['B5', 'B4', 'B3'],
  max: 0.4
});