var roi = ui.import && ui.import("roi", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                91.83246382962908,
                21.55709736728112
              ],
              [
                91.83246382962908,
                20.8760317851219
              ],
              [
                92.38178023587908,
                20.8760317851219
              ],
              [
                92.38178023587908,
                21.55709736728112
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
        [[[91.83246382962908, 21.55709736728112],
          [91.83246382962908, 20.8760317851219],
          [92.38178023587908, 20.8760317851219],
          [92.38178023587908, 21.55709736728112]]], null, false);
// 2020
var image = ee.Image(ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
    .filterBounds(roi)
    .filterDate('2020-01-14', '2020-12-30')
    .sort('CLOUD_COVER')
    .first())
    .clip(roi);
print(image);
Map.addLayer(image, {bands: ['B4', 'B3', 'B2'],min:0, max: 3000}, 'True colour image');
// Compute the Normalized Difference Vegetation Index (NDWI).
var nir = image.select('B3');
var red = image.select('B6');
var ndvi = nir.subtract(red).divide(nir.add(red)).rename('NDWI');
// Display the result.
Map.centerObject(image, 20);
var ndwiParams = {min: 0, max: 1, palette: [ 'ffffff','0000ff','00ffff']};
Map.addLayer(ndvi, ndwiParams, 'NDWI 2020');
Export.image.toDrive({
  image:image.select('B1','B2', 'B3', 'B4'), 
  description: 'landsat8_2020',
  scale: 30,
  fileNamePrefix: 'landsat8_2020',
  region: roi, 
  maxPixels: 1e10
});
Export.image.toDrive({
  image:ndvi, 
  description: 'NDWI_2020',
  scale: 30,
  fileNamePrefix: 'NDWI_2020',
  region: roi, 
  maxPixels: 1e10
});
// Convert raster to polygons
var NDVI_vec = ndvi.reduceToVectors({
  scale: 30,
  geometryType:'polygon',
  geometry: roi,
  eightConnected: false,
  bestEffort:true,
  tileScale:2,
});
// Export lulc2020 polygons as shape-file
Export.table.toDrive({
  collection:NDVI_vec,
  description:'NDVI_90_vector',
  fileFormat:'SHP',
  fileNamePrefix:'2020_vec'
});
//2010
var image = ee.Image(ee.ImageCollection('LANDSAT/LT05/C01/T1_SR')
    .filterBounds(roi)
    .filterDate('2010-01-14', '2010-12-30')
    .sort('CLOUD_COVER')
    .first())
    .clip(roi);
print(image);
Map.addLayer(image, {bands: ['B3', 'B2', 'B1'],min:0, max: 3000}, 'True colour image');
// Compute the Normalized Difference Vegetation Index (NDWI).
var nir = image.select('B2');
var red = image.select('B5');
var ndvi = nir.subtract(red).divide(nir.add(red)).rename('NDWI');
// Display the result.
Map.centerObject(image, 20);
var ndwiParams = {min: 0, max: 1, palette: [ 'ffffff','0000ff','00ffff']};
Map.addLayer(ndvi, ndwiParams, 'NDWI 2010');
Export.image.toDrive({
  image:image.select('B1','B2', 'B3', 'B4'), 
  description: 'landsat5_2010',
  scale: 30,
  fileNamePrefix: 'landsat5_2010',
  region: roi, 
  maxPixels: 1e10
});
Export.image.toDrive({
  image:ndvi, 
  description: 'NDVI_2010',
  scale: 30,
  fileNamePrefix: 'NDVI_2010',
  region: roi, 
  maxPixels: 1e10
});
// Convert raster to polygons
var NDVI_vec = ndvi.reduceToVectors({
  scale: 30,
  geometryType:'polygon',
  geometry: roi,
  eightConnected: false,
  bestEffort:true,
  tileScale:2,
});
// Export lulc2020 polygons as shape-file
Export.table.toDrive({
  collection:NDVI_vec,
  description:'NDVI_90_vector',
  fileFormat:'SHP',
  fileNamePrefix:'2010_vec'
});
//2000
var image = ee.Image(ee.ImageCollection('LANDSAT/LT05/C01/T1_SR')
    .filterBounds(roi)
    .filterDate('2000-01-14', '2000-12-30')
    .sort('CLOUD_COVER')
    .first())
    .clip(roi);
print(image);
Map.addLayer(image, {bands: ['B3', 'B2', 'B1'],min:0, max: 3000}, 'True colour image');
// Compute the Normalized Difference Vegetation Index (NDVI).
var nir = image.select('B2');
var red = image.select('B5');
var ndvi = nir.subtract(red).divide(nir.add(red)).rename('NDWI');
// Display the result.
Map.centerObject(image, 20);
var ndwiParams = {min: 0, max: 1, palette: [ 'ffffff','0000ff','00ffff']};
Map.addLayer(ndvi, ndwiParams, 'NDWI 2000');
Export.image.toDrive({
  image:image.select('B1','B2', 'B3', 'B4'), 
  description: 'landsat5_2000',
  scale: 30,
  fileNamePrefix: 'landsat5_2000',
  region: roi, 
  maxPixels: 1e10
});
Export.image.toDrive({
  image:ndvi, 
  description: 'NDVI_2000',
  scale: 30,
  fileNamePrefix: 'NDVI_2000',
  region: roi, 
  maxPixels: 1e10
});
// Convert raster to polygons
var NDVI_vec = ndvi.reduceToVectors({
  scale: 30,
  geometryType:'polygon',
  geometry: roi,
  eightConnected: false,
  bestEffort:true,
  tileScale:2,
});
// Export lulc2020 polygons as shape-file
Export.table.toDrive({
  collection:NDVI_vec,
  description:'NDVI_90_vector',
  fileFormat:'SHP',
  fileNamePrefix:'2000_vec'
});
// 1990
var image = ee.Image(ee.ImageCollection('LANDSAT/LT05/C01/T1_SR')
    .filterBounds(roi)
    .filterDate('1990-01-14', '1990-12-30')
    .sort('CLOUD_COVER')
    .first())
    .clip(roi);
print(image);
Map.addLayer(image, {bands: ['B3', 'B2', 'B1'],min:0, max: 3000}, 'True colour image');
// Compute the Normalized Difference Vegetation Index (NDVI).
var nir = image.select('B2');
var red = image.select('B5');
var ndvi = nir.subtract(red).divide(nir.add(red)).rename('NDwI');
// Display the result.
Map.centerObject(image, 20);
var ndwiParams = {min: 0, max: 1, palette: [ 'ffffff','0000ff','00ffff']};
Map.addLayer(ndvi, ndwiParams, 'NDWI 1990');
Export.image.toDrive({
  image:image.select('B1','B2', 'B3', 'B4'), 
  description: 'landsat5_1990',
  scale: 30,
  fileNamePrefix: 'landsat5_1990',
  region: roi, 
  maxPixels: 1e10
});
Export.image.toDrive({
  image:ndvi, 
  description: 'NDVI_1990',
  scale: 30,
  fileNamePrefix: 'NDVI_1990',
  region: roi, 
  maxPixels: 1e10
});
// Convert raster to polygons
var NDVI_vec = ndvi.reduceToVectors({
  scale: 30,
  geometryType:'polygon',
  geometry: roi,
  eightConnected: false,
  bestEffort:true,
  tileScale:2,
});
// Export lulc2020 polygons as shape-file
Export.table.toDrive({
  collection:NDVI_vec,
  description:'NDVI_90_vector',
  fileFormat:'SHP',
  fileNamePrefix:'1990_vec'
});