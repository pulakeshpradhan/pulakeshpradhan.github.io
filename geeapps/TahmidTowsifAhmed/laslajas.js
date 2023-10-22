var LasLajas = ui.import && ui.import("LasLajas", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -62.83056585748473,
                -15.185895078526812
              ],
              [
                -62.83056585748473,
                -15.954490094403653
              ],
              [
                -61.76763861139098,
                -15.954490094403653
              ],
              [
                -61.76763861139098,
                -15.185895078526812
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
        [[[-62.83056585748473, -15.185895078526812],
          [-62.83056585748473, -15.954490094403653],
          [-61.76763861139098, -15.954490094403653],
          [-61.76763861139098, -15.185895078526812]]], null, false);
// Import landsat imagery. Create function to cloud mask from 
// the pixel_qa band of Landsat 8 SR data. 
// Bits 3 and 4 are cloud shadow and cloud, respectively.
var image = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2')
  .filterBounds(LasLajas);
print ("LasLajas", image);
function maskL8sr(image) {
  var cloudShadowBitMask = 1 << 3;
  var cloudsBitMask = 1 << 4;
  var qa = image.select('QA_PIXEL');
  var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
      .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
  return image.updateMask(mask).divide(10000)
      .select("SR_B[0-9]*")
      .copyProperties(image, ["system:time_start"]);
}
var dataset2014 = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2')
    .filterDate('2014-05-01', '2014-06-01')
    .filterBounds(LasLajas);
var dataset2015 = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2')
    .filterDate('2015-05-01', '2015-06-01')
    .filterBounds(LasLajas);
var dataset2016 = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2')
    .filterDate('2016-05-01', '2016-06-01')
    .filterBounds(LasLajas);
var dataset2017 = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2')
    .filterDate('2017-05-01', '2017-06-01')
    .filterBounds(LasLajas);
var dataset2018 = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2')
    .filterDate('2018-05-01', '2018-06-01')
    .filterBounds(LasLajas);
var dataset2019 = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2')
    .filterDate('2019-05-01', '2019-06-01')
    .filterBounds(LasLajas);
var dataset2020 = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2')
    .filterDate('2020-05-01', '2020-06-01')
    .filterBounds(LasLajas);
var dataset2021 = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2')
    .filterDate('2021-05-01', '2021-06-01')
    .filterBounds(LasLajas);
// Applies scaling factors.
function applyScaleFactors(image) {
  var opticalBands = image.select('SR_B.').multiply(0.0000275).add(-0.2);
  var thermalBands = image.select('ST_B.*').multiply(0.00341802).add(149.0);
  return image.addBands(opticalBands, null, true)
              .addBands(thermalBands, null, true);
}
dataset2014 = dataset2014.map(applyScaleFactors);
dataset2015 = dataset2015.map(applyScaleFactors);
dataset2016 = dataset2016.map(applyScaleFactors);
dataset2017 = dataset2017.map(applyScaleFactors);
dataset2018 = dataset2018.map(applyScaleFactors);
dataset2019 = dataset2019.map(applyScaleFactors);
dataset2020 = dataset2020.map(applyScaleFactors);
dataset2021 = dataset2021.map(applyScaleFactors);
var visualization = {
  bands: ['SR_B4', 'SR_B3', 'SR_B2'],
  min: 0.0,
  max: 0.3,
};
Map.centerObject(LasLajas, 8);
Map.addLayer(dataset2014, visualization, ' 2014 Image');
Map.addLayer(dataset2015, visualization, ' 2015 Image');
Map.addLayer(dataset2016, visualization, ' 2016 Image');
Map.addLayer(dataset2017, visualization, ' 2017 Image');
Map.addLayer(dataset2018, visualization, ' 2018 Image');
Map.addLayer(dataset2019, visualization, ' 2019 Image');
Map.addLayer(dataset2020, visualization, ' 2020 Image');
Map.addLayer(dataset2021, visualization, ' 2021 Image');
//Filter imagery for 2019 and 2020 summer date ranges. 
//Create joint filter and apply it to Image Collection
var sum20 = ee.Filter.date('2020-06-01','2020-09-30');
var sum19 = ee.Filter.date('2019-06-01','2019-09-30');
var SumFilter = ee.Filter.or(sum20, sum19);
var allsum = image.filter(SumFilter);
//Make a Composite: Apply the cloud mask function, use the median reducer, 
//and clip the composite to our area of interest
var composite = allsum
              .map(maskL8sr)
              .median()
              .clip(LasLajas);
//Display the Composite
Map.setOptions('hybrid')
// Map.addLayer(composite, {bands: ['SR_B4','SR_B3','SR_B2']},'True Image',0);
// Map.addLayer(composite, {bands: ['SR_B7','SR_B6','SR_B4']},'False Color (Urban)',0);
Map.addLayer(composite, {bands: ['SR_B6','SR_B5','SR_B4']},'NDVI',0);
// Map.addLayer(composite, {bands: ['SR_B5','SR_B4','SR_B3']},'Color Infrared',0);
// Make a list of years, then for each year filter the collection, 
// mask clouds, and reduce by median. Important to add system:time_start 
// after reducing as this allows you to filter by date later
var stepList = ee.List.sequence(2014,2020);
var filterCollection = stepList.map(function(year){
  var startDate = ee.Date.fromYMD(year,5,1);
  var endDate = ee.Date.fromYMD(year,9,15);
  var composite_i = image.filterDate(startDate, endDate)
                        .map(maskL8sr)
                        .median()
                        .set('system:time_start',startDate);
  return composite_i;
});
var yearlyComposites = ee.ImageCollection(filterCollection);
print(yearlyComposites, 'Masked and Filtered Composites');
// Export True Image map to Drive.
var y2014true = yearlyComposites.filterDate('2014-01-01','2014-12-31')
  .first()
  .clip(LasLajas);
Export.image.toDrive({
  image: y2014true,
  description: '2014_TRUE_Image',
  scale: 30,
  maxPixels: 1000000000,
});
// Export True Image map to Drive.
var y2015true = yearlyComposites.filterDate('2015-01-01','2015-12-31')
  .first()
  .clip(LasLajas);
Export.image.toDrive({
  image: y2015true,
  description: '2015_TRUE_Image',
  scale: 30,
  maxPixels: 1000000000,
});
// Export True Image map to Drive.
var y2016true = yearlyComposites.filterDate('2016-01-01','2016-12-31')
  .first()
  .clip(LasLajas);
Export.image.toDrive({
  image: y2016true,
  description: '2016_TRUE_Image',
  scale: 30,
  maxPixels: 1000000000,
});
// Export True Image map to Drive.
var y2017true = yearlyComposites.filterDate('2017-01-01','2017-12-31')
  .first()
  .clip(LasLajas);
Export.image.toDrive({
  image: y2017true,
  description: '2017_TRUE_Image',
  scale: 30,
  maxPixels: 1000000000,
});
// Export True Image map to Drive.
var y2018true = yearlyComposites.filterDate('2018-01-01','2018-12-31')
  .first()
  .clip(LasLajas);
Export.image.toDrive({
  image: y2018true,
  description: '2018_TRUE_Image',
  scale: 30,
  maxPixels: 1000000000,
});
// Export True Image map to Drive.
var y2019true = yearlyComposites.filterDate('2019-01-01','2019-12-31')
  .first()
  .clip(LasLajas);
Export.image.toDrive({
  image: y2019true,
  description: '2019_TRUE_Image',
  scale: 30,
  maxPixels: 1000000000,
});
// Export True Image map to Drive.
var y2020true = yearlyComposites.filterDate('2020-01-01','2020-12-31')
  .first()
  .clip(LasLajas);
Export.image.toDrive({
  image: y2020true,
  description: '2020_TRUE_Image',
  scale: 30,
  maxPixels: 1000000000,
});
Map.addLayer (y2014true, {bands: ['SR_B4','SR_B3','SR_B2']},'2014 True Image',0);
Map.addLayer (y2015true, {bands: ['SR_B4','SR_B3','SR_B2']},'2015 True Image',0);
Map.addLayer (y2016true, {bands: ['SR_B4','SR_B3','SR_B2']},'2016 True Image',0);
Map.addLayer (y2017true, {bands: ['SR_B4','SR_B3','SR_B2']},'2017 True Image',0);
Map.addLayer (y2018true, {bands: ['SR_B4','SR_B3','SR_B2']},'2018 True Image',0);
Map.addLayer (y2019true, {bands: ['SR_B4','SR_B3','SR_B2']},'2019 True Image',0);
Map.addLayer (y2020true, {bands: ['SR_B4','SR_B3','SR_B2']},'2020 True Image',0);
// Add Normalised Difference Vegetation Index to a function and apply it.
function ndvi(img){
  var ndviImg = img.select(['SR_B5','SR_B4'],['nir','red']);
  ndviImg = ndviImg.expression(
    '((NIR - RED) / (NIR + RED))', {
      'NIR': ndviImg.select('nir'),
      'RED': ndviImg.select('red')
    }).rename('NDVI');
  return img.addBands(ndviImg);
}
var yearlyComposites_ndvi = yearlyComposites.map(function(image){
  return ndvi(image);
});
print(yearlyComposites_ndvi, 'With NDVI as Band');
// // Add Normalised Difference Built-up Index to a function and apply it.
// function ndbi(img){
//   var ndbiImg = img.select(['SR_B6','SR_B5'],['swir1','nir']);
//   ndbiImg = ndbiImg.expression(
//     '((SWIR1 - NIR) / (SWIR1 + NIR))', {
//       'SWIR1': ndbiImg.select('swir1'),
//       'NIR': ndbiImg.select('nir')
//     }).rename('NDBI');
//   return img.addBands(ndbiImg);
// }
// var yearlyComposites_ndbi = yearlyComposites.map(function(image){
//   return ndbi(image);
// });
// print(yearlyComposites_ndbi, 'With NDBI as Band');
// // Add Normalised Difference Water Index to a function and apply it.
// function ndwi(img){
//   var ndwiImg = img.select(['SR_B3','SR_B5'],['green','nir']);
//   ndwiImg = ndwiImg.expression(
//     '((GREEN - NIR) / (GREEN + NIR))', {
//       'GREEN': ndwiImg.select('green'),
//       'NIR': ndwiImg.select('nir')
//     }).rename('NDWI');
//   return img.addBands(ndwiImg);
// }
// var yearlyComposites_ndwi = yearlyComposites.map(function(image){
//   return ndwi(image);
// });
// print(yearlyComposites_ndwi, 'With NDWI as Band');
// Create image collection of yearly composites, selecting the NDVI band.
var ndviCollection = yearlyComposites_ndvi.select('NDVI');
// // Create image collection of yearly composites, selecting the NDBI band.
// var ndbiCollection = yearlyComposites_ndbi.select('NDBI');
// // Create image collection of yearly composites, selecting the NDWI band.
// var ndwiCollection = yearlyComposites_ndwi.select('NDWI');
// Create variables for each yearly composite.
// Add the 7 NDVI maps for each year 2014-2020.
var y2014_ndvi = ndviCollection.filterDate('2014-01-01','2014-12-31')
  .first()
  .clip(LasLajas);
var y2015_ndvi = ndviCollection.filterDate('2015-01-01','2015-12-31')
  .first()
  .clip(LasLajas);
var y2016_ndvi = ndviCollection.filterDate('2016-01-01','2016-12-31')
  .first()
  .clip(LasLajas);
var y2017_ndvi = ndviCollection.filterDate('2017-01-01','2017-12-31')
  .first()
  .clip(LasLajas);
var y2018_ndvi = ndviCollection.filterDate('2018-01-01','2018-12-31')
  .first()
  .clip(LasLajas);
var y2019_ndvi = ndviCollection.filterDate('2019-01-01','2019-12-31')
  .first()
  .clip(LasLajas);
var y2020_ndvi = ndviCollection.filterDate('2020-01-01','2020-12-31')
  .first()
  .clip(LasLajas);
print(y2014_ndvi, '2014 NDVI Composite Image');
print(y2015_ndvi, '2015 NDVI Composite Image');
print(y2016_ndvi, '2016 NDVI Composite Image');
print(y2017_ndvi, '2017 NDVI Composite Image');
print(y2018_ndvi, '2018 NDVI Composite Image');
print(y2019_ndvi, '2019 NDVI Composite Image');
print(y2020_ndvi, '2020 NDVI Composite Image');
var ndviParams = {min: 0, max: 1, palette: ['white', 'green']};
Map.setOptions('hybrid');
// Map.centerObject (LasLajas,9);
Map.addLayer(y2014_ndvi, ndviParams, '2014 NDVI', 0);
Map.addLayer(y2015_ndvi, ndviParams, '2015 NDVI', 0);
Map.addLayer(y2016_ndvi, ndviParams, '2016 NDVI', 0);
Map.addLayer(y2017_ndvi, ndviParams, '2017 NDVI', 0);
Map.addLayer(y2018_ndvi, ndviParams, '2018 NDVI', 0);
Map.addLayer(y2019_ndvi, ndviParams, '2019 NDVI', 0);
Map.addLayer(y2020_ndvi, ndviParams, '2020 NDVI', 0);
// // Add the 7 NDBI maps for each year 2014-2020.
// var y2014_ndbi = ndbiCollection.filterDate('2014-01-01','2014-12-31')
//   .first()
//   .clip(LasLajas);
// var y2015_ndbi = ndbiCollection.filterDate('2015-01-01','2015-12-31')
//   .first()
//   .clip(LasLajas);
// var y2016_ndbi = ndbiCollection.filterDate('2016-01-01','2016-12-31')
//   .first()
//   .clip(LasLajas);
// var y2017_ndbi = ndbiCollection.filterDate('2017-01-01','2017-12-31')
//   .first()
//   .clip(LasLajas);
// var y2018_ndbi = ndbiCollection.filterDate('2018-01-01','2018-12-31')
//   .first()
//   .clip(LasLajas);
// var y2019_ndbi = ndbiCollection.filterDate('2019-01-01','2019-12-31')
//   .first()
//   .clip(LasLajas);
// var y2020_ndbi = ndbiCollection.filterDate('2020-01-01','2020-12-31')
//   .first()
//   .clip(LasLajas);
// print(y2014_ndbi, '2014 NDBI Composite Image');
// print(y2015_ndbi, '2015 NDBI Composite Image');
// print(y2016_ndbi, '2016 NDBI Composite Image');
// print(y2017_ndbi, '2017 NDBI Composite Image');
// print(y2018_ndbi, '2018 NDBI Composite Image');
// print(y2019_ndbi, '2019 NDBI Composite Image');
// print(y2020_ndbi, '2020 NDBI Composite Image');
// var ndbiParams = {min: 0, max: 1, palette: ['white', 'red']};
// Map.addLayer(y2014_ndbi, ndbiParams, '2014 NDBI', 0);
// Map.addLayer(y2015_ndbi, ndbiParams, '2015 NDBI', 0);
// Map.addLayer(y2016_ndbi, ndbiParams, '2016 NDBI', 0);
// Map.addLayer(y2017_ndbi, ndbiParams, '2017 NDBI', 0);
// Map.addLayer(y2018_ndbi, ndbiParams, '2018 NDBI', 0);
// Map.addLayer(y2019_ndbi, ndbiParams, '2019 NDBI', 0);
// Map.addLayer(y2020_ndbi, ndbiParams, '2020 NDBI', 0);
// // Add the 7 NDWI maps for each year 2014-2020.
// var y2014_ndwi = ndwiCollection.filterDate('2014-01-01','2014-12-31')
//   .first()
//   .clip(LasLajas);
// var y2015_ndwi = ndwiCollection.filterDate('2015-01-01','2015-12-31')
//   .first()
//   .clip(LasLajas);
// var y2016_ndwi = ndwiCollection.filterDate('2016-01-01','2016-12-31')
//   .first()
//   .clip(LasLajas);
// var y2017_ndwi = ndwiCollection.filterDate('2017-01-01','2017-12-31')
//   .first()
//   .clip(LasLajas);
// var y2018_ndwi = ndwiCollection.filterDate('2018-01-01','2018-12-31')
//   .first()
//   .clip(LasLajas);
// var y2019_ndwi = ndwiCollection.filterDate('2019-01-01','2019-12-31')
//   .first()
//   .clip(LasLajas);
// var y2020_ndwi = ndwiCollection.filterDate('2020-01-01','2020-12-31')
//   .first()
//   .clip(LasLajas);
// print(y2014_ndwi, '2014 NDWI Composite Image');
// print(y2015_ndwi, '2015 NDWI Composite Image');
// print(y2016_ndwi, '2016 NDWI Composite Image');
// print(y2017_ndwi, '2017 NDWI Composite Image');
// print(y2018_ndwi, '2018 NDWI Composite Image');
// print(y2019_ndwi, '2019 NDWI Composite Image');
// print(y2020_ndwi, '2020 NDWI Composite Image');
// var ndwiParams = {min: 0, max: 1, palette: ['white', 'blue']};
// Map.addLayer(y2014_ndwi, ndwiParams, '2014 NDWI', 0);
// Map.addLayer(y2015_ndwi, ndwiParams, '2015 NDWI', 0);
// Map.addLayer(y2016_ndwi, ndwiParams, '2016 NDWI', 0);
// Map.addLayer(y2017_ndwi, ndwiParams, '2017 NDWI', 0);
// Map.addLayer(y2018_ndwi, ndwiParams, '2018 NDWI', 0);
// Map.addLayer(y2019_ndwi, ndwiParams, '2019 NDWI', 0);
// Map.addLayer(y2020_ndwi, ndwiParams, '2020 NDWI', 0);
// Export NDVI map to Drive.
var y2014ndvi = ndviCollection.filterDate('2014-01-01','2014-12-31')
  .first()
  .clip(LasLajas);
var y2015ndvi = ndviCollection.filterDate('2015-01-01','2015-12-31')
  .first()
  .clip(LasLajas);
var y2016ndvi = ndviCollection.filterDate('2016-01-01','2016-12-31')
  .first()
  .clip(LasLajas);
var y2017ndvi = ndviCollection.filterDate('2017-01-01','2017-12-31')
  .first()
  .clip(LasLajas);
var y2018ndvi = ndviCollection.filterDate('2018-01-01','2018-12-31')
  .first()
  .clip(LasLajas);
var y2019ndvi = ndviCollection.filterDate('2019-01-01','2019-12-31')
  .first()
  .clip(LasLajas);
var y2020ndvi = ndviCollection.filterDate('2020-01-01','2020-12-31')
  .first()
  .clip(LasLajas);
Export.image.toDrive({
  image: y2014ndvi,
  description: '2014_NDVI',
  scale: 30,
  maxPixels: 1000000000,
});
Export.image.toDrive({
  image: y2015ndvi,
  description: '2015_NDVI',
  scale: 30,
  maxPixels: 1000000000,
});
Export.image.toDrive({
  image: y2016ndvi,
  description: '2016_NDVI',
  scale: 30,
  maxPixels: 1000000000,
});
Export.image.toDrive({
  image: y2017ndvi,
  description: '2017_NDVI',
  scale: 30,
  maxPixels: 1000000000,
});
Export.image.toDrive({
  image: y2018ndvi,
  description: '2018_NDVI',
  scale: 30,
  maxPixels: 1000000000,
});
Export.image.toDrive({
  image: y2019ndvi,
  description: '2019_NDVI',
  scale: 30,
  maxPixels: 1000000000,
});
Export.image.toDrive({
  image: y2020ndvi,
  description: '2020_NDVI',
  scale: 30,
  maxPixels: 1000000000,
});
// // Export NDBI map to Drive.
// var y2014ndbi = ndbiCollection.filterDate('2014-01-01','2014-12-31')
//   .first()
//   .clip(LasLajas);
// var y2015ndbi = ndbiCollection.filterDate('2015-01-01','2015-12-31')
//   .first()
//   .clip(LasLajas);
// var y2016ndbi = ndbiCollection.filterDate('2016-01-01','2016-12-31')
//   .first()
//   .clip(LasLajas);
// var y2017ndbi = ndbiCollection.filterDate('2017-01-01','2017-12-31')
//   .first()
//   .clip(LasLajas);
// var y2018ndbi = ndbiCollection.filterDate('2018-01-01','2018-12-31')
//   .first()
//   .clip(LasLajas);
// var y2019ndbi = ndbiCollection.filterDate('2019-01-01','2019-12-31')
//   .first()
//   .clip(LasLajas);
// var y2020ndbi = ndbiCollection.filterDate('2020-01-01','2020-12-31')
//   .first()
//   .clip(LasLajas);
// Export.image.toDrive({
//   image: y2014ndbi,
//   description: '2014_NDBI',
//   scale: 30,
//   maxPixels: 1000000000,
// });
// Export.image.toDrive({
//   image: y2015ndbi,
//   description: '2015_NDBI',
//   scale: 30,
//   maxPixels: 1000000000,
// });
// Export.image.toDrive({
//   image: y2016ndbi,
//   description: '2016_NDBI',
//   scale: 30,
//   maxPixels: 1000000000,
// });
// Export.image.toDrive({
//   image: y2017ndbi,
//   description: '2017_NDBI',
//   scale: 30,
//   maxPixels: 1000000000,
// });
// Export.image.toDrive({
//   image: y2018ndbi,
//   description: '2018_NDBI',
//   scale: 30,
//   maxPixels: 1000000000,
// });
// Export.image.toDrive({
//   image: y2019ndbi,
//   description: '2019_NDBI',
//   scale: 30,
//   maxPixels: 1000000000,
// });
// Export.image.toDrive({
//   image: y2020ndbi,
//   description: '2020_NDBI',
//   scale: 30,
//   maxPixels: 1000000000,
// });
// // Export NDWI map to Drive.
// var y2014ndwi = ndwiCollection.filterDate('2014-01-01','2014-12-31')
//   .first()
//   .clip(LasLajas);
// var y2015ndwi = ndwiCollection.filterDate('2015-01-01','2015-12-31')
//   .first()
//   .clip(LasLajas);
// var y2016ndwi = ndwiCollection.filterDate('2016-01-01','2016-12-31')
//   .first()
//   .clip(LasLajas);
// var y2017ndwi = ndwiCollection.filterDate('2017-01-01','2017-12-31')
//   .first()
//   .clip(LasLajas);
// var y2018ndwi = ndwiCollection.filterDate('2018-01-01','2018-12-31')
//   .first()
//   .clip(LasLajas);
// var y2019ndwi = ndwiCollection.filterDate('2019-01-01','2019-12-31')
//   .first()
//   .clip(LasLajas);
// var y2020ndwi = ndwiCollection.filterDate('2020-01-01','2020-12-31')
//   .first()
//   .clip(LasLajas);
// Export.image.toDrive({
//   image: y2014ndwi,
//   description: '2014_NDWI',
//   scale: 30,
//   maxPixels: 1000000000,
// });
// Export.image.toDrive({
//   image: y2015ndwi,
//   description: '2015_NDWI',
//   scale: 30,
//   maxPixels: 1000000000,
// });
// Export.image.toDrive({
//   image: y2016ndwi,
//   description: '2016_NDWI',
//   scale: 30,
//   maxPixels: 1000000000,
// });
// Export.image.toDrive({
//   image: y2017ndwi,
//   description: '2017_NDWI',
//   scale: 30,
//   maxPixels: 1000000000,
// });
// Export.image.toDrive({
//   image: y2018ndwi,
//   description: '2018_NDWI',
//   scale: 30,
//   maxPixels: 1000000000,
// });
// Export.image.toDrive({
//   image: y2019ndwi,
//   description: '2019_NDWI',
//   scale: 30,
//   maxPixels: 1000000000,
// });
// Export.image.toDrive({
//   image: y2020ndwi,
//   description: '2020_NDWI',
//   scale: 30,
//   maxPixels: 1000000000,
// });
// Create a line chart to display NDVI time series for a selected point.
// Display chart in the console.
var chart_ndvi = ui.Chart.image.series({
  imageCollection: ndviCollection.select('NDVI'),
  region: LasLajas, //adding new region of interest and changing here might help looking for any specific region
  scale: 30
}).setOptions({title: 'NDVI Over Time'});
print(chart_ndvi);
// // Create a line chart to display NDBI time series for a selected point.
// // Display chart in the console.
// var chart_ndbi = ui.Chart.image.series({
//   imageCollection: ndbiCollection.select('NDBI'),
//   region: LasLajas, //adding new region of interest and changing here might help looking for any specific region
//   scale: 30
// }).setOptions({title: 'NDBI Over Time'});
// print(chart_ndbi);
// // Create a line chart to display NDWI time series for a selected point.
// // Display chart in the console.
// var chart_ndwi = ui.Chart.image.series({
//   imageCollection: ndwiCollection.select('NDWI'),
//   region: LasLajas, //adding new region of interest and changing here might help looking for any specific region
//   scale: 30
// }).setOptions({title: 'NDWI Over Time'});
// print(chart_ndwi);
// Creating a Timeseries GIF of NDVI maps.
var text = require('users/gena/packages:text');
var yearNames = ee.List([ '2014', '2015', '2016','2017',
                          '2018','2019','2020']);
var ndviWithYear = ndviCollection.map(function(feat){
  return feat.set('year', yearNames.getString(
                      ee.Number.parse(feat.getString('system:index'))));
});
print(ndviWithYear, 'year');
var gifParams = {
  'region': LasLajas,
  'dimensions': 800,
  'framesPerSecond': 1,
  'format': 'gif'
};
var annotations = [{
  position: 'top',
  offset: '10%',
  margin: '20%',
  property: 'year',
  scale: 20000
  }];
var timeSeriesgif_ndvi = ndviWithYear.map(function(image) {
  return text.annotateImage(image, ndviParams, LasLajas, annotations);
});
print(timeSeriesgif_ndvi.getVideoThumbURL(gifParams));
print(ui.Thumbnail(timeSeriesgif_ndvi, gifParams));
// // Creating a Timeseries GIF of NDBI maps.
// var ndbiWithYear = ndbiCollection.map(function(feat){
//   return feat.set('year', yearNames.getString(
//                       ee.Number.parse(feat.getString('system:index'))));
// });
// print(ndbiWithYear, 'year');
// var timeSeriesgif_ndbi = ndbiWithYear.map(function(image) {
//   return text.annotateImage(image, ndbiParams, LasLajas, annotations);
// });
// print(timeSeriesgif_ndbi.getVideoThumbURL(gifParams));
// print(ui.Thumbnail(timeSeriesgif_ndbi, gifParams));
// // Creating a Timeseries GIF of NDWI maps.
// var ndwiWithYear = ndwiCollection.map(function(feat){
//   return feat.set('year', yearNames.getString(
//                       ee.Number.parse(feat.getString('system:index'))));
// });
// print(ndwiWithYear, 'year');
// var timeSeriesgif_ndwi = ndwiWithYear.map(function(image) {
//   return text.annotateImage(image, ndwiParams, LasLajas, annotations);
// });
// print(timeSeriesgif_ndwi.getVideoThumbURL(gifParams));
// print(ui.Thumbnail(timeSeriesgif_ndwi, gifParams));
// Simple NDVI image differencing between 2014 and 2020.
var SimpleImageDiff_ndvi = y2014_ndvi.subtract(y2020_ndvi);
var diffParams_ndvi = {min: -1, max: 1, palette: ['green', 'yellow', 'red']};//red means decrease and green means increase
Map.addLayer(SimpleImageDiff_ndvi, diffParams_ndvi, '2014/2020 NDVI Difference', 0);
var yMean_ndvi = ndviCollection.mean();
var AvgImageDiff_ndvi = yMean_ndvi.subtract(y2020_ndvi);
Map.addLayer(AvgImageDiff_ndvi, diffParams_ndvi, '2020 Difference from Average NDVI', 0);
// // Simple NDBI image differencing between 2014 and 2020.
// var SimpleImageDiff_ndbi = y2014_ndbi.subtract(y2020_ndbi);
// var diffParams_ndbi = {min: -1, max: 1, palette: ['green', 'yellow', 'red']};//red means decrease and green means increase
// Map.addLayer(SimpleImageDiff_ndbi, diffParams_ndbi, '2014/2020 NDBI Difference', 0);
// var yMean_ndbi = ndbiCollection.mean();
// var AvgImageDiff_ndbi = yMean_ndbi.subtract(y2020_ndbi);
// Map.addLayer(AvgImageDiff_ndbi, diffParams_ndbi, '2020 Difference from Average NDBI', 0);
// // Simple NDWI image differencing between 2014 and 2020.
// var SimpleImageDiff_ndwi = y2014_ndwi.subtract(y2020_ndwi);
// var diffParams_ndwi = {min: -1, max: 1, palette: ['green', 'yellow', 'red']};//red means decrease and green means increase
// Map.addLayer(SimpleImageDiff_ndwi, diffParams_ndwi, '2014/2020 NDWI Difference', 0);
// var yMean_ndwi = ndwiCollection.mean();
// var AvgImageDiff_ndwi = yMean_ndwi.subtract(y2020_ndwi);
// Map.addLayer(AvgImageDiff_ndwi, diffParams_ndwi, '2020 Difference from Average NDWI', 0);
// Standard Anomalies (Z-Score). Calculate Standard Deviation across the NDVI collection.
// Z-Score = (Year-Mean)/Standard Deviation
var stdImg_ndvi = ndviCollection.reduce(ee.Reducer.stdDev());
var Anomaly2020_ndvi = y2020_ndvi.subtract(yMean_ndvi).divide(stdImg_ndvi);
var Anomaly2018_ndvi = y2018_ndvi.subtract(yMean_ndvi).divide(stdImg_ndvi);
var Anomaly2016_ndvi = y2016_ndvi.subtract(yMean_ndvi).divide(stdImg_ndvi);
var Anomaly2014_ndvi = y2014_ndvi.subtract(yMean_ndvi).divide(stdImg_ndvi);
var anomParams = {min: -3, max:3, palette: ['red', 'yellow', 'green']};
Map.addLayer(Anomaly2020_ndvi, anomParams, '2020 NDVI Anomaly', 0);
Map.addLayer(Anomaly2018_ndvi, anomParams, '2018 NDVI Anomaly', 0);
Map.addLayer(Anomaly2016_ndvi, anomParams, '2016 NDVI Anomaly', 0);
Map.addLayer(Anomaly2014_ndvi, anomParams, '2014 NDVI Anomaly', 0);
// // Standard Anomalies (Z-Score). Calculate Standard Deviation across the NDBI collection.
// // Z-Score = (Year-Mean)/Standard Deviation
// var stdImg_ndbi = ndbiCollection.reduce(ee.Reducer.stdDev());
// var Anomaly2020_ndbi = y2020_ndbi.subtract(yMean_ndbi).divide(stdImg_ndbi);
// var Anomaly2018_ndbi = y2018_ndbi.subtract(yMean_ndbi).divide(stdImg_ndbi);
// var Anomaly2016_ndbi = y2016_ndbi.subtract(yMean_ndbi).divide(stdImg_ndbi);
// var Anomaly2014_ndbi = y2014_ndbi.subtract(yMean_ndbi).divide(stdImg_ndbi);
// Map.addLayer(Anomaly2020_ndbi, anomParams, '2020 NDBI Anomaly', 0);
// Map.addLayer(Anomaly2018_ndbi, anomParams, '2018 NDBI Anomaly', 0);
// Map.addLayer(Anomaly2016_ndbi, anomParams, '2016 NDBI Anomaly', 0);
// Map.addLayer(Anomaly2014_ndbi, anomParams, '2014 NDBI Anomaly', 0);
// // Standard Anomalies (Z-Score). Calculate Standard Deviation across the NDWI collection.
// // Z-Score = (Year-Mean)/Standard Deviation
// var stdImg_ndwi = ndwiCollection.reduce(ee.Reducer.stdDev());
// var Anomaly2020_ndwi = y2020_ndwi.subtract(yMean_ndwi).divide(stdImg_ndwi);
// var Anomaly2018_ndwi = y2018_ndwi.subtract(yMean_ndwi).divide(stdImg_ndwi);
// var Anomaly2016_ndwi = y2016_ndwi.subtract(yMean_ndwi).divide(stdImg_ndwi);
// var Anomaly2014_ndwi = y2014_ndwi.subtract(yMean_ndwi).divide(stdImg_ndwi);
// Map.addLayer(Anomaly2020_ndwi, anomParams, '2020 NDWI Anomaly', 0);
// Map.addLayer(Anomaly2018_ndwi, anomParams, '2018 NDWI Anomaly', 0);
// Map.addLayer(Anomaly2016_ndwi, anomParams, '2016 NDWI Anomaly', 0);
// Map.addLayer(Anomaly2014_ndwi, anomParams, '2014 NDWI Anomaly', 0);
// Create a panel to hold our widgets.
var panel = ui.Panel();
panel.style().set('width', '300px');
// // Create an intro panel with labels.
// var intro = ui.Panel([
//   ui.Label({
//     value: 'Land Use and Land Cover Change',
//     style: {fontSize: '20px', fontWeight: 'bold'}
//   }),
//   ui.Label('This map displays the changes in land-use and land-cover patterns for an area. For analysis, Normalized Differnce Vegetaion Index (NDVI) that shows the changes in the green areas and Normalized Difference Built-up Index (NDBI) that shows the changes in the built-up areas is shown. Clicking on a point on the map enables the viewer to inspect the change at a certain location.')
// ]);
// panel.add(intro);
// Create panels to hold lon/lat values.
var lon = ui.Label();
var lat = ui.Label();
panel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')))
panel.add(ui.Thumbnail(timeSeriesgif_ndvi, gifParams))
// panel.add(ui.Thumbnail(timeSeriesgif_ndbi, gifParams))
// panel.add(ui.Thumbnail(timeSeriesgif_ndwi, gifParams));
// Register a callback on the default map to be invoked when the map is clicked.
Map.onClick(function(coords) {
  // Update the lon/lat panel with values from the click event.
  lon.setValue('lon: ' + coords.lon.toFixed(2)),
  lat.setValue('lat: ' + coords.lat.toFixed(2));
  // Add a red dot for the point clicked on.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point, {color: 'FF0000'});
  Map.layers().set(1, dot);
  // Create an NDVI chart.
  var ndvi = image.map(function(image) {
  return image.select().addBands(image.normalizedDifference(['SR_B5', 'SR_B4']))});
  var ndviChart = ui.Chart.image.series(ndvi, point, ee.Reducer.mean(), 500);
  ndviChart.setOptions({
    title: 'NDVI Over Time',
    vAxis: {title: 'NDVI'},
    hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}},
  });
  panel.widgets().set(2, ndviChart);
  // // Create an NDBI chart.
  // var ndbi = image.map(function(image) {
  // return image.select().addBands(image.normalizedDifference(['SR_B6', 'SR_B5']))});
  // var ndbiChart = ui.Chart.image.series(ndbi, point, ee.Reducer.mean(), 500);
  // ndbiChart.setOptions({
  //   title: 'NDBI Over Time',
  //   vAxis: {title: 'NDBI'},
  //   hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}},
  // });
  // panel.widgets().set(3, ndbiChart);
  // // Create an NDWI chart.
  // var ndwi = image.map(function(image) {
  // return image.select().addBands(image.normalizedDifference(['SR_B3', 'SR_B5']))});
  // var ndwiChart = ui.Chart.image.series(ndwi, point, ee.Reducer.mean(), 500);
  // ndviChart.setOptions({
  //   title: 'NDWI Over Time',
  //   vAxis: {title: 'NDWI'},
  //   hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}},
  // });
  // panel.widgets().set(4, ndwiChart);
});
Map.style().set('cursor', 'crosshair');
// Add the panel to the ui.root.
ui.root.insert(0, panel);