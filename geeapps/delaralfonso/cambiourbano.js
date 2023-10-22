// Change Detection using Probability Bands
// Detect urban expansion around the City of Bengaluru, India. 
var geometry = ee.FeatureCollection('users/delaralfonso/Limits/Necochea');
Map.setCenter(-58.77, -38.58, 13)
// Detect newly urbanized regions from the year 2019 to 2020.
var beforeYear = 2016;
var afterYear = 2022;
// Create start and end dates for the before and after periods.
var beforeStart = ee.Date.fromYMD(beforeYear, 1 , 1);
var beforeEnd = beforeStart.advance(1, 'year');
var afterStart = ee.Date.fromYMD(afterYear, 1 , 1);
var afterEnd = afterStart.advance(1, 'year');
// Filter the Dynamic World collection and select the 'built' band.
var dw = ee.ImageCollection('GOOGLE/DYNAMICWORLD/V1')
  .filterBounds(geometry).select('built');
// Create a mean composite indicating the average probability through the year.
var beforeDw = dw.filterDate(beforeStart, beforeEnd).mean();
var afterDw = dw.filterDate(afterStart, afterEnd).mean();
// Select all pixels that are
// < 0.2 'built' probability before
// > 0.5 'built' probability after
var newUrban = beforeDw.lt(0.2).and(afterDw.gt(0.5));
var changeVisParams = {min: 0, max: 1, palette: ['white', 'red']};
Map.addLayer(newUrban.clip(geometry), changeVisParams, 'Nuevo Urbano',false);
// Add Sentinel-2 Composites to verify the results.
var s2 = ee.ImageCollection('COPERNICUS/S2')
     .filterBounds(geometry)
     .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 35));
// Create a median composite from sentinel-2 images.
var beforeS2 = s2.filterDate(beforeStart, beforeEnd).median();
var afterS2 = s2.filterDate(afterStart, afterEnd).median();
var s2VisParams = {bands: ['B4', 'B3', 'B2'], min: 0, max: 3000};
Map.addLayer(beforeS2.clip(geometry), s2VisParams, 'Antes');
Map.addLayer(afterS2.clip(geometry), s2VisParams, 'Despues',false);
// Mask non-change pixels from the binary newUrban image 
// using the selfMask function and add it to the map.
Map.addLayer(
  newUrban.selfMask().clip(geometry), changeVisParams, 'Nuevo Urbano (Masked)');