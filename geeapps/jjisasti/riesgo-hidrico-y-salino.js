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
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Polygon(
        [[[-64.97138089633609, -33.09871493169792],
          [-64.97138089633609, -36.20243487203587],
          [-61.939154333836086, -36.20243487203587],
          [-61.939154333836086, -33.09871493169792]]], null, false);
var image = ee.ImageCollection('COPERNICUS/S2_SR').select(['B4','B3','B2'])
  .filterMetadata ('CLOUDY_PIXEL_PERCENTAGE', 'Less_Than', 5);
// Importing Sentinel 5P image collections for the weeks prior to the COVID-19 first case
// Reference date: geometry entered Phase 2 (March 2020)
var imagepre = ee.ImageCollection('COPERNICUS/S2_SR').select(['B4','B3','B2'])
.filterDate('2020-08-20','2020-08-30')
.filterMetadata ('CLOUDY_PIXEL_PERCENTAGE', 'Less_Than', 5);
// Importing Sentinel 5P image collections for the weeks prior to the COVID-19 first case
var imagepost = ee.ImageCollection('COPERNICUS/S2_SR').select(['B4','B3','B2'])
.filterDate('2021-08-20','2021-08-30')
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
//
//var zones = waterPercentImage.gt(0).add(waterPercentImage.gt(10)).add(waterPercentImage.gt(20)).add(waterPercentImage.gt(30)).add(waterPercentImage.gt(50)).add(waterPercentImage.gt(75)).add(waterPercentImage.gt(100));
//zones = zones.updateMask(zones.neq(0));
//
//var vectors = zones.addBands(waterPercentImage).reduceToVectors({
//geometry: geometry,
//crs: waterPercentImage.projection(),
//scale: 30,
//  geometryType: 'polygon',
//  eightConnected: false,
//  labelProperty: 'zone',
//  reducer: ee.Reducer.mean()
//});
////
var waterPercentImage1 = waterPercentImage;
var waterPercentImage2 = waterPercentImage;
//---------------------------------- VISUALIZATION----------------------------------------------------
var leftMap = ui.Map({style: {width: '35%'}}); //create a new ui.Map()
var rightMap = ui.Map({style: {width: '35%'}}); 
leftMap.addLayer(imagepre.mean().clip(geometry), {bands: ['B4', 'B3', 'B2'], min: 0, max: 2000});
rightMap.addLayer(imagepost.mean().clip(geometry), {bands: ['B4', 'B3', 'B2'], min: 0, max: 2000});
var linker = ui.Map.Linker([leftMap, rightMap]);
leftMap.centerObject(geometry, 10); 
leftMap.setControlVisibility({all: false, zoomControl: true, mapTypeControl: true});
rightMap.setControlVisibility({all: false, zoomControl: true, mapTypeControl: true});
leftMap.style().set('cursor', 'crosshair');
rightMap.style().set('cursor', 'crosshair');
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  orientation: 'horizontal',
  wipe: true,
  style: {stretch: 'both'}
});
ui.root.widgets().reset([splitPanel]);
ui.root.clear();
ui.root.add(splitPanel);
leftMap.add(ui.Panel({style: {position: 'bottom-left'}}).add(ui.Label('Agosto 2020', {fontWeight: 'bold', fontSize: '10px', position: 'bottom-right', color: 'slateGrey'})));
leftMap.addLayer(waterPercentImage, {'min': '0', 'max': '100', 'bands': 'water', 'palette': palette, opacity: 0.25}, 'Riesgo Hídrico');
rightMap.add(ui.Panel({style: {position: 'bottom-right'}}).add(ui.Label('Agosto 2021', {fontWeight: 'bold', fontSize: '10px', position: 'bottom-right', color: 'slateGrey'})));
rightMap.addLayer(waterPercentImage, {'min': '0', 'max': '100', 'bands': 'water', 'palette': palette, opacity: 0.25}, 'Riesgo Hídrico');
//(zones, {min: 1, max: 6, palette: ['00FF00', 'FFFF00', 'FFA500', 'FF0000','00FFFF',  '0000FF']}, 'Riesgo Hídrico');
////Map.addLayer(waterPercentImage, {'min': '0', 'max': '100', 'bands': 'water', 'palette': palette}, 'filtered');