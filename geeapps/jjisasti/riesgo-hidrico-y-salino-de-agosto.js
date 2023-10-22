var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -64.97138089633609,
                -33.09871493169792
              ],
              [
                -64.97138089633609,
                -36.20243487203587
              ],
              [
                -61.939154333836086,
                -36.20243487203587
              ],
              [
                -61.939154333836086,
                -33.09871493169792
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
        [[[-64.97138089633609, -33.09871493169792],
          [-64.97138089633609, -36.20243487203587],
          [-61.939154333836086, -36.20243487203587],
          [-61.939154333836086, -33.09871493169792]]], null, false);
var image = ee.ImageCollection('COPERNICUS/S2_SR').select(['B4','B3','B2'])
  .filterMetadata ('CLOUDY_PIXEL_PERCENTAGE', 'Less_Than', 5);
// Importing Sentinel 5P image collections for the weeks prior to the COVID-19 first case
// Reference date: geometry entered Phase 2 (March 2020)
var image2016 = ee.ImageCollection('COPERNICUS/S2').select(['B4','B3','B2'])
.filterDate('2016-08-01','2016-08-30')
.filterMetadata ('CLOUDY_PIXEL_PERCENTAGE', 'Less_Than', 5);
// Importing Sentinel 5P image collections for the weeks prior to the COVID-19 first case
var image2017 = ee.ImageCollection('COPERNICUS/S2').select(['B4','B3','B2'])
.filterDate('2017-08-01','2017-08-30')
  .filterMetadata ('CLOUDY_PIXEL_PERCENTAGE', 'Less_Than', 5);
var image2018 = ee.ImageCollection('COPERNICUS/S2').select(['B4','B3','B2'])
.filterDate('2018-08-01','2018-08-30')
  .filterMetadata ('CLOUDY_PIXEL_PERCENTAGE', 'Less_Than', 5);
var image2019 = ee.ImageCollection('COPERNICUS/S2_SR').select(['B4','B3','B2'])
.filterDate('2019-08-01','2019-08-30')
  .filterMetadata ('CLOUDY_PIXEL_PERCENTAGE', 'Less_Than', 5);  
var image2020 = ee.ImageCollection('COPERNICUS/S2_SR').select(['B4','B3','B2'])
.filterDate('2020-08-01','2020-08-30')
  .filterMetadata ('CLOUDY_PIXEL_PERCENTAGE', 'Less_Than', 5);
var image2021 = ee.ImageCollection('COPERNICUS/S2_SR').select(['B4','B3','B2'])
.filterDate('2021-08-01','2021-08-30')
  .filterMetadata ('CLOUDY_PIXEL_PERCENTAGE', 'Less_Than', 5);  
/////
var jrcDataset = ee.ImageCollection('JRC/GSW1_1/MonthlyHistory');
var countriesLayer = ee.FeatureCollection('ft:1tdSwUL7MVpOauSgRzqVTOwdfy17KDbw-1d9omPw');
// Define start and end date
var startDate = '1999-01-01';
var endDate = '2018-12-31';
// Define palette
var palette = ['00FF00', 'FFFF00', 'FFA500', 'FF0000','00FFFF',  '0000FF'];
var filteredJRCDataset = jrcDataset.filterBounds(geometry).filterDate(startDate, endDate);
var validFilteredJRCDataset = filteredJRCDataset.map(function (img) {
  var valid = img.gt(0.00);
  return valid.set('system:time_start', img.get('system:time_start'));
});
var waterJRCDataset = filteredJRCDataset.map(function (img) {
  var waterImage = img.select('water').eq(2);
  return waterImage.set('system:time_start', img.get('system:time_start'));
});
var totalValidJRCDataset = validFilteredJRCDataset.sum().toFloat();
var totalWaterJRCDataset = waterJRCDataset.sum().toFloat();
var totalWaterPercentJRCDataset = totalWaterJRCDataset.divide(totalValidJRCDataset).multiply(100);
var maskedWaterImage = totalWaterPercentJRCDataset.gt(0).and(totalWaterPercentJRCDataset.lte(100));
var waterPercentImage = totalWaterPercentJRCDataset.updateMask(maskedWaterImage);
waterPercentImage = waterPercentImage.clip(geometry);
var zones = waterPercentImage.gt(0).add(waterPercentImage.gt(5)).add(waterPercentImage.gt(10)).add(waterPercentImage.gt(15)).add(waterPercentImage.gt(25)).add(waterPercentImage.gt(50)).add(waterPercentImage.gt(100));
zones = zones.updateMask(zones.neq(0));
var vectors = zones.addBands(waterPercentImage).reduceToVectors({
geometry: geometry,
crs: waterPercentImage.projection(),
scale: 30,
geometryType: 'polygon',
eightConnected: false,
labelProperty: 'zone',
reducer: ee.Reducer.mean()
});
////
var waterPercentImage1 = waterPercentImage;
var waterPercentImage2 = waterPercentImage;
Map.centerObject(geometry, 10);
//---------------------------------- VISUALIZATION----------------------------------------------------
//var leftMap = ui.Map({style: {width: '35%'}}); //create a new ui.Map()
//var rightMap = ui.Map({style: {width: '35%'}}); 
//
//leftMap.addLayer(imagepre.mean().clip(geometry), {bands: ['B4', 'B3', 'B2'], min: 0, max: 2000});
//rightMap.addLayer(imagepost.mean().clip(geometry), {bands: ['B4', 'B3', 'B2'], min: 0, max: 2000});
//
//var linker = ui.Map.Linker([leftMap, rightMap]);
//leftMap.centerObject(geometry, 10); 
//leftMap.setControlVisibility({all: false, zoomControl: true, mapTypeControl: true});
//rightMap.setControlVisibility({all: false, zoomControl: true, mapTypeControl: true});
//leftMap.style().set('cursor', 'crosshair');
//rightMap.style().set('cursor', 'crosshair');
//
//var splitPanel = ui.SplitPanel({
//  firstPanel: leftMap,
//  secondPanel: rightMap,
//  orientation: 'horizontal',
//  wipe: true,
//  style: {stretch: 'both'}
//});
//
//ui.root.widgets().reset([splitPanel]);
//
//ui.root.clear();
//ui.root.add(splitPanel);
Map.addLayer(image2016.mean().clip(geometry), {bands: ['B4', 'B3', 'B2'], min: 0, max: 2000}, 'Agosto 2016');
Map.addLayer(image2017.mean().clip(geometry), {bands: ['B4', 'B3', 'B2'], min: 0, max: 2000}, 'Agosto 2017');
Map.addLayer(image2018.mean().clip(geometry), {bands: ['B4', 'B3', 'B2'], min: 0, max: 2000}, 'Agosto 2018');
Map.addLayer(image2019.mean().clip(geometry), {bands: ['B4', 'B3', 'B2'], min: 0, max: 2000}, 'Agosto 2019');
Map.addLayer(image2020.mean().clip(geometry), {bands: ['B4', 'B3', 'B2'], min: 0, max: 2000}, 'Agosto 2020');
Map.addLayer(image2021.mean().clip(geometry), {bands: ['B4', 'B3', 'B2'], min: 0, max: 2000}, 'Agosto 2021');
Map.addLayer(zones, {min: 1, max: 6, palette: ['00FF00', 'FFFF00', 'FFA500', 'FF0000','00FFFF',  '0000FF']}, 'Riesgo Hídrico');
//Map.addLayer(waterPercentImage, {'min': '0', 'max': '100', 'bands': 'water', 'palette': palette}, 'raster');
maps[0].setCenter(-63.2712, -35.4551, 10);