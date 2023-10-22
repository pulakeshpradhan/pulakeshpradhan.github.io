// #############################################################################
// Land Surface Temperature (LST)
// Objectives:
// 1. Import Land Surface Temperature (LST) data from 'MODIS/006/MOD11A2' in GEE Data Catalog for 1 year in Bangkok, Thailand: 
//    https://developers.google.com/earth-engine/datasets/catalog/MODIS_006_MOD11A2.
// 2. Describe the LST data using a time series chart.
// 3. Export processed raster data for use in GIS.
// #############################################################################
/*
// Import country boundaries feature collection.
var dataset = ee.FeatureCollection('USDOS/LSIB_SIMPLE/2017');
// Apply filter where country name.
var thailandBorder = dataset.filter(ee.Filter.eq('country_na', 'Thailand'));
// Print new "thailandBorder" object and explorer features and properties.
// There should only be one feature representing Thailand.
print(thailandBorder);
// Add Thailand outline to the Map as a layer.
Map.centerObject(thailandBorder, 6);
Map.addLayer(thailandBorder);
*/
//var gaul = ee.FeatureCollection("FAO/GAUL/2015/level1");
//var nan = gaul.filter(ee.Filter.eq('ADM1_NAME', 'Nan'))
//Map.addLayer(nan);
var gaul = ee.FeatureCollection("FAO/GAUL/2015/level2");
var nan = gaul.filter(ee.Filter.eq('ADM1_NAME', 'Nan'))
//var mueang = nan.filter(ee.Filter.eq('ADM2_NAME', 'mueangnan'))
Map.addLayer(nan);
// #############################################################################
// Import area boundaries feature collection.
//var nan = ee.FeatureCollection("users/juntakut37/nan");
// #############################################################################
var IMG = ee.ImageCollection("COPERNICUS/S2")
            //.filterDate('2018-01-01','2019-12-31' )
            .filterBounds(nan)
            //.filter(ee.Filter.bounds(nan))
            .sort('CLOUDY_PIXEL_PERCENTAGE',true)
            .first()
            .clip(nan);
print(IMG)
Map.addLayer(IMG,{bands:['B4','B3','B2'],min:0,max:3000},'IMG')
// ##################################################
// 1. Import LST image collection.
var modis = ee.ImageCollection('MODIS/006/MOD11A2');
// Define a date range of interest; here, a start date is defined and the end
// date is determined by advancing 1 year from the start date.
var start = ee.Date('2019-01-01');
var dateRange = ee.DateRange(start, start.advance(1, 'year'));
// Filter the LST collection to include only images intersecting the desired
// date range.
var mod11a2 = modis.filterDate(dateRange);
// Select only the 1km day LST data band.
var modLSTday = mod11a2.select('LST_Day_1km');
// ##################################################
// Scale to Kelvin and convert to Celsius, set image acquisition time.
var modLSTc = modLSTday.map(function(img) {
  return img
    .multiply(0.02)
    .subtract(273.15)
    .copyProperties(img, ['system:time_start']);
});
// #############################################################################
// 2. Chart time series of LST for Thailand in 2019.
var ts1 = ui.Chart.image.series({
  imageCollection: modLSTc,
  region: nan,
  reducer: ee.Reducer.mean(),
  scale: 1000,
  xProperty: 'system:time_start'})
  .setOptions({
     title: 'LST 2019 Time Series',
     vAxis: {title: 'LST Celsius'}});
print(ts1);
// #############################################################################
// Calculate 8-day mean temperature for Uganda in 2015.
var clippedLSTc = modLSTc.mean().clip(nan);
// Add clipped image layer to the map.
//Map.setCenter(101.165, 14.290, 10); //Nakhon-Nayok
//Map.setCenter(100.665, 13.750, 10); //Bangkok
Map.setCenter(100.765, 18.750, 8); //Nan
Map.addLayer(clippedLSTc, {
  min: 20, max: 40,
  palette: ['blue', 'limegreen', 'yellow', 'darkorange', 'red']},
  'Mean LST, 2019');
// #############################################################################
// 3. Export the image to your Google Drive account.
Export.image.toDrive({
  image: clippedLSTc,
  description: 'LST_Celsius_NN_2019',
  folder: 'LST_folder',
  region: nan,
  scale: 1000,
  crs: 'EPSG:4326',
  maxPixels: 1e10});
// #############################################################################
// Make another map and add a color-NIR composite to it.
var linkedMap = ui.Map();
linkedMap.addLayer(IMG,{bands:['B4','B3','B2'],min:0,max:3500},'IMG');
linkedMap.addLayer(clippedLSTc, {
  min: 20, max: 40,
  palette: ['blue', 'limegreen', 'yellow', 'darkorange', 'red']},
  'Mean LST, 2019');
linkedMap.addLayer(nan);
// Link the default Map to the other map.
var linker = ui.Map.Linker([ui.root.widgets().get(0), linkedMap]);
// Make an inset map and add it to the linked map.
var inset = ui.Map({style: {position: "bottom-right"}});
linkedMap.add(inset);
// Register a function to the linked map to update the inset map.
linkedMap.onChangeBounds(function() {
  var bounds = ee.Geometry.Rectangle(Map.getBounds());
  inset.centerObject(bounds);
  inset.layers().set(0, bounds);
});
// Create a SplitPanel which holds the linked maps side-by-side.
var splitPanel = ui.SplitPanel({
  firstPanel: linker.get(0),
  secondPanel: linker.get(1),
  orientation: 'horizontal',
  wipe: true,
  style: {stretch: 'both'}
});
// Set the SplitPanel as the only thing in root.
ui.root.widgets().reset([splitPanel]);
//linkedMap.setCenter(101.165, 14.290, 14);
// #############################################################################
// #############################################################################