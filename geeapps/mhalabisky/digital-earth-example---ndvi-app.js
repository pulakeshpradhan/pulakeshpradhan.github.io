// Classifying Imagery
// Geohackweek 2018
// 8-29-2018
// Goal: The purpose is to create time series plots of NDVI and EVI for 
// dynamically defined points.
// Topics addressed:
//  - importing Feature Collections.
//  - loading and filtering image collections
//  - creating a time series from a selected band in an image collection
//  - visualize the time series using a Two Chart Inspector.
// I  have altered the code so that the wastershed boundary is focused 
//on the area of my interest and that is calls my greenest pixel image 
//that I created in an earlier lab and saved as an image asset
// ----------------------------------------------------------------------------------------
// Loading vector and raster data
// ----------------------------------------------------------------------------------------
// load WBD dataset & select the Republican watershed
var watershedBoundaries = ee.FeatureCollection("USGS/WBD/2017/HUC06");
Map.addLayer(watershedBoundaries, {}, 'watersheds');
var setExtent = watershedBoundaries.filterMetadata('name', 'equals', 'Puget Sound');
// CDL: USDA Cropland Data Layers
var cdl = ee.Image('USDA/NASS/CDL/2010').select('cropland').clip(setExtent);
// NAIP aerial photos 
var StartDate = '2009-01-01';
var EndDate = '2009-12-31';
var naip = ee.ImageCollection('USDA/NAIP/DOQQ')
    .filterBounds(setExtent)
    .filterDate(StartDate, EndDate);
// Load Derived Landsat Composites --------------------
// annual max greenness image for background (previously exported asset)
var annualGreenest = ee.Image('users/mhalabisky/digitalearth_L8_NDVI_image_pugetsound2')// need to change
                    .select(['NDVI'])
                    .clip(setExtent);
// add satellite time series: MODIS EVI 250m 16 day -------------
var collectionModEvi = ee.ImageCollection('MODIS/006/MOD13Q1')
    .filterDate(StartDate,EndDate)
    .filterBounds(setExtent)
    .select("EVI");
// add satellite time series: MODIS NDVI 250m 16 day -------------
var collectionModNDVI = ee.ImageCollection('MODIS/006/MOD13Q1')
    .filterDate(StartDate,EndDate)
    .filterBounds(setExtent)
    .select("NDVI");
// ----------------------------------------------------------------------------------------
// Visualize
// ----------------------------------------------------------------------------------------
Map.centerObject(setExtent, 8);
// A nice EVI palette 
var palette = [
  'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718',
  '74A901', '66A000', '529400', '3E8601', '207401', '056201',
  '004C00', '023B01', '012E01', '011D01', '011301'];
// Because we are using the NDVI greenest pixel image we saved to our
  // Define a color palette for NDVI
// var ndviPalette = ['FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718',
//               '74A901', '66A000', '529400', '3E8601', '207401', '056201',
//               '004C00', '023B01', '012E01', '011D01', '011301'];
Map.addLayer(annualGreenest.select('NDVI'), 
    {min:.0, max: 1, palette: palette}, 'NDVI');/// Need to change the min and max because it is different for the NDVI image we are using than the one used in the example. 
// Map.addLayer(annualGreenest.select('NDVI'), 
//             {min:0, max: 1, palette: ndviPalette}, 'ndvi');
// greenest images
print(annualGreenest)
// cdl and naip
Map.addLayer(cdl, {}, 'cdl', false);
Map.addLayer(naip, {}, 'naip', false);
// ----------------------------------------------------------------------------------------
// Create User Interface
// ----------------------------------------------------------------------------------------
// Create a panel to hold our widgets.
var panel = ui.Panel();
panel.style().set('width', '300px');
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'Two Chart Inspector',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
  ui.Label('Click a point on the map to inspect.')
]);
panel.add(intro);
// panels to hold lon/lat values
var lon = ui.Label();
var lat = ui.Label();
panel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
// Register a callback on the default map to be invoked when the map is clicked
Map.onClick(function(coords) {
  // Update the lon/lat panel with values from the click event.
  lon.setValue('lon: ' + coords.lon.toFixed(2)),
  lat.setValue('lat: ' + coords.lat.toFixed(2));
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  // Create an MODIS EVI chart.
  var eviChart = ui.Chart.image.series(collectionModEvi, point, ee.Reducer.mean(), 250);
  eviChart.setOptions({
    title: 'MODIS EVI',
    vAxis: {title: 'EVI', maxValue: 9000},
    hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}},
  });
  panel.widgets().set(2, eviChart);
  // Create an MODIS NDVI chart.
  var ndviChart = ui.Chart.image.series(collectionModNDVI, point, ee.Reducer.mean(), 250);
  ndviChart.setOptions({
    title: 'MODIS NDVI',
    vAxis: {title: 'NDVI', maxValue: 9000},
    hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}},
  });
  panel.widgets().set(3, ndviChart);
});
Map.style().set('cursor', 'crosshair');
// Add the panel to the ui.root.
ui.root.insert(0, panel);
// ----------------------------------------------------------------------------------------
// BONUS: Time Series Slider
// ----------------------------------------------------------------------------------------
// // Select images from a collection with a silder.
// var collection = ee.ImageCollection('MODIS/006/MOD13Q1')
//     .select('NDVI')
// var ndviPalette = ['FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718',
//               '74A901', '66A000', '529400', '3E8601', '207401', '056201',
//               '004C00', '023B01', '012E01', '011D01', '011301'];
// // A helper function to show the image for a given year on the default map.
// var showLayer = function(year) {
//   Map.layers().reset();
//   var date = ee.Date.fromYMD(year, 1, 1);
//   var dateRange = ee.DateRange(date, date.advance(1, 'year'));
//   var image = collection.filterDate(dateRange).first();
//   Map.addLayer({
//     eeObject: ee.Image(image),
//     visParams: {
//       min: -2000,
//       max: 10000,
//       palette:ndviPalette
//     },
//     name: String(year)
//   });
// };
// // Create a label and slider.
// var label = ui.Label('NDVI for Year');
// var slider = ui.Slider({
//   min: 1992,
//   max: 2018,
//   step: 1,
//   onChange: showLayer,
//   style: {stretch: 'horizontal'}
// });
// // Create a panel that contains both the slider and the label.
// var panel = ui.Panel({
//   widgets: [label, slider],
//   layout: ui.Panel.Layout.flow('vertical'),
//   style: {
//     position: 'top-center',
//     padding: '7px'
//   }
// });
// // Add the panel to the map.
// Map.add(panel);
// // Set default values on the slider and map.
// slider.setValue(2007);
// Map.setCenter(30, 45, 2);