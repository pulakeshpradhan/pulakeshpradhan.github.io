/**
 * Function to mask clouds using the Sentinel-2 QA band
 * @param {ee.Image} image Sentinel-2 image
 * @return {ee.Image} cloud masked Sentinel-2 image
 */
function maskS2clouds(image) {
  var qa = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask).divide(10000);
}
//image selection
var images = {
  'june-2021 - Natural color': getMontlyS2Composite('2021-06-01','june-2021 - Natural color'),
  'june-2022 - Natural color': getMontlyS2Composite('2022-06-01','june-2022 - Natural color'),
  'july-2021 - Natural color': getMontlyS2Composite('2021-07-01','july-2021 - Natural color'),
  'july-2022 - Natural color': getMontlyS2Composite('2022-07-01','july-2022 - Natural color'),
  'june-2021 - False color (vegetation)': getMontlyS2FC('2021-06-01','june-2021 - False color (vegetation)'),
  'june-2022 - False color (vegetation)': getMontlyS2FC('2022-06-01','june-2022 - False color (vegetation)'),
  'july-2021 - False color (vegetation)': getMontlyS2FC('2021-07-01','july-2021 - False color (vegetation)'),
  'july-2022 - False color (vegetation)': getMontlyS2FC('2022-07-01','july-2022 - False color (vegetation)'),
  'june-2021 - NDVI': getMontlyNDVI('2021-06-01','june-2021 - NDVI'),
  'june-2022 - NDVI': getMontlyNDVI('2022-06-01','june-2022 - NDVI'),
  'july-2021 - NDVI': getMontlyNDVI('2021-07-01','july-2021 - NDVI'),
  'july-2022 - NDVI': getMontlyNDVI('2022-07-01','july-2022 - NDVI'),
  'june-2021 - NDWI': getMontlyNDWI('2021-06-01','june-2021 - NDWI'),
  'june-2022 - NDWI': getMontlyNDWI('2022-06-01','june-2022 - NDWI'),
  'july-2021 - NDWI': getMontlyNDWI('2021-07-01','july-2021 - NDWI'),
  'july-2022 - NDWI': getMontlyNDWI('2022-07-01','july-2022 - NDWI'),
  'june-2021 - NMDI': getMontlyNMDI('2021-06-01','june-2021 - NMDI'),
  'june-2022 - NMDI': getMontlyNMDI('2022-06-01','june-2022 - NMDI'),
  'july-2021 - NMDI': getMontlyNMDI('2021-07-01','july-2021 - NMDI'),
  'july-2022 - NMDI': getMontlyNMDI('2022-07-01','july-2022 - NMDI'),
};
function getMontlyNDVI(date,mm) {
  var date = ee.Date(date);
  var dataset = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
    .filterDate(date, date.advance(1, 'month'))
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 100))
    .map(maskS2clouds);
  var median = dataset.median();
  var nir = median.select('B8');
  var red = median.select('B4');
  var ndvi = nir.subtract(red).divide(nir.add(red)).rename('NDVI');
  var fc = ee.FeatureCollection('USDOS/LSIB_SIMPLE/2017')
    .filter(ee.Filter.or(
        ee.Filter.eq('country_na', 'Ukraine')));
  var clipped = ndvi.clipToCollection(fc);
  var palette = ['FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718',
               '74A901', '66A000', '529400', '3E8601', '207401', '056201',
               '004C00', '023B01', '012E01', '011D01', '011301'];
  var ndviVis = {
    min: 0,
    max: 1,
    palette: palette,
  };
  return clipped.visualize(ndviVis);
}
function getMontlyNDWI(date,mm) {
  var date = ee.Date(date);
  var dataset = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
    .filterDate(date, date.advance(1, 'month'))
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 100))
    .map(maskS2clouds);
  var median = dataset.median();
  var nir = median.select('B8');
  var mir = median.select('B12');
  var ndwi = nir.subtract(mir).divide(nir.add(mir)).rename('NDWI');
  var fc = ee.FeatureCollection('USDOS/LSIB_SIMPLE/2017')
    .filter(ee.Filter.or(
        ee.Filter.eq('country_na', 'Ukraine')));
  var clipped = ndwi.clipToCollection(fc);
  var palette = ['00FFFF', '0000FF'];
  var ndwiVis = {
    min: 0,
    max: 1,
    palette: palette,
  };
  return clipped.visualize(ndwiVis);
}
function getMontlyNMDI(date,mm) {
  var date = ee.Date(date);
  var dataset = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
    .filterDate(date, date.advance(1, 'month'))
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 100))
    .map(maskS2clouds);
  var median = dataset.median();
  var nmdi = median.expression(
    '(nir-(swir1-swir2))/(nir+(swir1-swir2))', {
      'nir': median.select('B4'),
      'swir1': median.select('B11'),
      'swir2': median.select('B12')
    }).rename('NMDI');
  var fc = ee.FeatureCollection('USDOS/LSIB_SIMPLE/2017')
    .filter(ee.Filter.or(
        ee.Filter.eq('country_na', 'Ukraine')));
  var clipped = nmdi.clipToCollection(fc);
  var usdmColors = "0000aa,0000ff,00aaff,00ffff,aaff55,ffffff,ffff00,fcd37f,ffaa00,e60000,730000";
  var nmdiVis = {
    min: 0,
    max: 1,
    palette: usdmColors
  };
  return clipped.visualize(nmdiVis);
}
function getMontlyS2Composite(date,mm) {
  var date = ee.Date(date);
  var dataset = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
    .filterDate(date, date.advance(1, 'month'))
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 100))
    .map(maskS2clouds);
  var median = dataset.median();
  var fc = ee.FeatureCollection('USDOS/LSIB_SIMPLE/2017')
    .filter(ee.Filter.or(
        ee.Filter.eq('country_na', 'Ukraine')));
  var clipped = median.clipToCollection(fc);
  var rgbVis = {
    min: 0.0,
    max: 0.2,
    bands: ['B4', 'B3', 'B2'],
  };
  return clipped.visualize(rgbVis);
}
function getMontlyS2FC(date,mm) {
  var date = ee.Date(date);
  var dataset = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
    .filterDate(date, date.advance(1, 'month'))
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 100))
    .map(maskS2clouds);
  var median = dataset.median();
  var fc = ee.FeatureCollection('USDOS/LSIB_SIMPLE/2017')
    .filter(ee.Filter.or(
        ee.Filter.eq('country_na', 'Ukraine')));
  var clipped = median.clipToCollection(fc);
  var rgbVis = {
    min: 0.0,
    max: 0.4,
    bands: ['B8', 'B4', 'B3'],
  };
  return clipped.visualize(rgbVis);
}
/*
 * Set up the maps and control widgets
 */
// Create the left map, and have it display layer 0.
var leftMap = ui.Map();
leftMap.setControlVisibility(false);
var leftSelector = addLayerSelector(leftMap, 0, 'top-left');
// Create the right map, and have it display layer 1.
var rightMap = ui.Map();
rightMap.setControlVisibility(false);
var rightSelector = addLayerSelector(rightMap, 1, 'top-right');
// Adds a layer selection widget to the given map, to allow users to change
// which image is displayed in the associated map.
function addLayerSelector(mapToChange, defaultValue, position) {
  var label = ui.Label('Choose an image to visualize');
  // This function changes the given map to show the selected image.
  function updateMap(selection) {
    mapToChange.layers().set(0, ui.Map.Layer(images[selection]));
  }
  // Configure a selection dropdown to allow the user to choose between images,
  // and set the map to update when a user makes a selection.
  var select = ui.Select({items: Object.keys(images), onChange: updateMap});
  select.setValue(Object.keys(images)[defaultValue], true);
  var controlPanel =
      ui.Panel({widgets: [label, select], style: {position: position}});
  mapToChange.add(controlPanel);
}
/*
 * Tie everything together
 */
// Create a SplitPanel to hold the adjacent, linked maps.
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  wipe: true,
  style: {stretch: 'both'}
});
// Set the SplitPanel as the only thing in the UI root.
ui.root.widgets().reset([splitPanel]);
var linker = ui.Map.Linker([leftMap, rightMap]);
leftMap.setCenter(31.74, 49.16, 6);