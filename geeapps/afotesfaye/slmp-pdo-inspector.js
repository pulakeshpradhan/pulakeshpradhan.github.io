var table = ui.import && ui.import("table", "table", {
      "id": "users/afotesfaye/Ethio_Region"
    }) || ee.FeatureCollection("users/afotesfaye/Ethio_Region"),
    SLMP_3 = ui.import && ui.import("SLMP_3", "table", {
      "id": "users/afotesfaye/SLMP_III"
    }) || ee.FeatureCollection("users/afotesfaye/SLMP_III");
// Afework Mekeberiaw Worku
// National GIS Specailist 
// E-Mail: afotesfaye@gmail.com
// afooo
// NDVI and LSWI Functions
/*These 2 functions are used to calculate the NDVI for Landsat 5/7 and Landsat 8, respectively.*/
var getNDVI57 = function(image) {
  var ndvi = image.normalizedDifference(['B4', 'B3']);
  return(ndvi);
};
var getNDVI8 = function(image){
  var ndvi = image.normalizedDifference(['B5', 'B4']);
  return(ndvi);
};
var getLSWI8 = function(image){
  var lswi = image.normalizedDifference(['B5', 'B6']);
  return(lswi);
};
    //Landsat 8
    var l8FinalNDVI = ee.ImageCollection("LANDSAT/LC08/C01/T1_SR")
    .filterBounds(SLMP_3)
    .filterDate('2021-01-01', '2021-12-31')
    .filterMetadata('CLOUD_COVER', 'less_than', 80)
    .map(getNDVI8);
   var l8BaseNDVI = ee.ImageCollection("LANDSAT/LC08/C01/T1_SR")
    .filterBounds(SLMP_3)
    .filterDate('2014-01-01', '2014-12-31')
    .filterMetadata('CLOUD_COVER', 'less_than', 80)
    .map(getNDVI8);
    var l8FinalLSWI = ee.ImageCollection("LANDSAT/LC08/C01/T1_SR")
    .filterBounds(SLMP_3)
    .filterDate('2021-01-01', '2021-12-31')
    .filterMetadata('CLOUD_COVER', 'less_than', 80)
    .map(getLSWI8);
   var l8BaseLSWI = ee.ImageCollection("LANDSAT/LC08/C01/T1_SR")
    .filterBounds(SLMP_3)
    .filterDate('2014-01-01', '2014-12-31')
    .filterMetadata('CLOUD_COVER', 'less_than', 80)
    .map(getLSWI8);
    //Landsat7
    var l7 = ee.ImageCollection("LANDSAT/LE07/C01/T1_SR")
    .filterBounds(SLMP_3)
    .filterDate('2021-01-01', '2021-12-31')
    .filterMetadata('CLOUD_COVER', 'less_than', 80)
    .map(getNDVI57);
//LSWI Mapping
Map.addLayer(l8BaseLSWI.mean().clip(SLMP_3), {'min': 0,'max': [1], palette: [ 'red', 'yellow','Orange','cyan','blue']},"SLMP_L8_LSWI_2014_Annual");
Map.addLayer(l8FinalLSWI.mean().clip(SLMP_3), {'min': 0,'max': [1], palette: [ 'red','yellow','Orange' ,'cyan','blue']},"SLMP_L8_LSWI_2021_Annual");
//NDVI Mapping
Map.addLayer(l8BaseNDVI.mean().clip(SLMP_3), {'min': 0,'max': [1], palette: [ 'red', 'yellow','orange','green']},"SLMP_L8_NDVI_2014_Annual");
Map.addLayer(l8FinalNDVI.mean().clip(SLMP_3), {'min': 0,'max': [1], palette: [ 'red','yellow' ,'orange','green']},"SLMP_L8_NDVI_2021_Annual");
// Goal: The purpose is to create time series plots of NDVI and EVI for
//adressing SLMP-RLLP PDO 2&3  indicator.
// ----------------------------------------------------------------------------------------
// Loading vector and raster data
// ----------------------------------------------------------------------------------------
// load WBD dataset & select the SLMP-RLLP watershed
var setExtent = ee.FeatureCollection("users/afotesfaye/Ethio_Region");
Map.addLayer(setExtent, {}, 'Ethiopia');
Map.addLayer(SLMP_3, {},"SLMP-RLLP Watershed");
//var setExtent = watershedBoundaries.filterMetadata('REGIONNAME', 'Amhara', 'Amhara Region');
// time series of the project SLMP-3
var StartDate = '2010-01-01';
var EndDate = '2021-12-31';
// load Modis EVI
var collectionModEvi = ee.ImageCollection('MODIS/006/MOD13Q1')
    .filterDate(StartDate,EndDate)
    .filterBounds(setExtent)
    .select("EVI");
//Load Modis NDVI
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
// greenest images
//print(annualGreenest)
Map.addLayer(collectionModEvi.mean().clip(setExtent),
   {min:-2000, max: 10000, palette: palette}, 'Ethiopia EVI');
Map.addLayer(collectionModNDVI.mean().clip(setExtent),
   {min:-2000, max: 10000, palette: palette}, 'Ethiopia NDVI');
Map.addLayer(collectionModEvi.mean().clip(SLMP_3),
   {min:-2000, max: 10000, palette: palette}, 'SLMP EVI');
//Map.addLayer(collectionModNDVI.mean().clip(SLMP_3),
 //  {min:-2000, max: 10000, palette: palette}, 'SLMP NDVI');
// ----------------------------------------------------------------------------------------
// Create User Interface
// ----------------------------------------------------------------------------------------
// Create a panel to hold our widgets.
var panel = ui.Panel();
panel.style().set('width', '400px');
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'SLMP-RLLP Project Developemenet Objective Inspector chart',
    style: {fontSize: '25px', fontWeight: 'bold'}
  }),
  ui.Label('Click a point on the SLMP watershed  to inspect.')
]);
panel.add(intro);
// panels to hold lon/lat values
var lon = ui.Label();
var lat = ui.Label();
panel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
// Register a callback on the default map to be invoked when the map is clicked//
Map.onClick(function(coords) {
  // Update the lon/lat panel with values from the click event.
  lon.setValue('lon: ' + coords.lon.toFixed(2)),
  lat.setValue('lat: ' + coords.lat.toFixed(2));
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  // Create an MODIS EVI chart.
  var eviChart = ui.Chart.image.series(collectionModEvi, point, ee.Reducer.mean(), 250);
  eviChart.setOptions({
    title: 'MODIS Enhanced Vegetation Index (EVI)',
    vAxis: {title: 'EVI', maxValue: 9000},
    hAxis: {title: 'year', format: '20yy-mm', gridlines: {count: 7}},
  });
  panel.widgets().set(2, eviChart);
  // Create an MODIS NDVI chart.
  var ndviChart = ui.Chart.image.series(collectionModNDVI, point, ee.Reducer.mean(), 250);
  ndviChart.setOptions({
    title: 'MODIS Normalized Difference Vegetation Index (NDVI)',
    vAxis: {title: 'NDVI', maxValue: 9000},
    hAxis: {title: 'year', format: '20yy-mm', gridlines: {count: 7}},
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