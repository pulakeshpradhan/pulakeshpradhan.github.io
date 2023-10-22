var geometry = /* color: #d63000 */ee.Geometry.Polygon(
        [[[-97.75809043940524, 42.46606128299031],
          [-97.8972503660803, 38.714512594743944],
          [-95.39855048602982, 38.68001822576166],
          [-95.23275680994288, 41.557402064157124],
          [-95.22178233224838, 41.9246762837639],
          [-95.67059265565365, 41.94545654997317],
          [-95.97771048115374, 42.13329888173142],
          [-96.25194184208482, 42.45412366810413]]]),
    geometry3 = /* color: #0b4a8b */ee.Geometry.Polygon(
        [[[-94.1778638733847, 41.38146437422155],
          [-97.5396802796347, 41.35672972334204],
          [-98.1329419983847, 38.77370026778475],
          [-95.1117017640097, 38.67084357456266]]]);
//////////////////////////////////////////////////////////////////////
// Create different layers
// - Flood day images with boundaries
// - Non-flood day image with boundaries
// - Gauges as a feature collection
/////////////////////////////////////////////////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////////////////////////////////////////////////
var cloudMask = function(img) {
  // expects a sentinel 2 toa image from COPERNICUS/S2
  return img.addBands([img.select('QA60').rightShift(10).bitwiseAnd(1).rename(['cloud_mask'])]);
};
// Compute MNDWI
var calcMndwi = function(sentinelImg) {
  return sentinelImg.addBands([sentinelImg.normalizedDifference(['B3', 'B11']).rename('mndwi')]);
};
// main Otsu Function 
var otsu = function(histogram) {
  // Written by Gennadii Donchyts
  var counts = ee.Array(ee.Dictionary(histogram).get('histogram'));
  var means = ee.Array(ee.Dictionary(histogram).get('bucketMeans'));
  var size = means.length().get([0]);
  var total = counts.reduce(ee.Reducer.sum(), [0]).get([0]);
  var sum = means.multiply(counts).reduce(ee.Reducer.sum(), [0]).get([0]);
  var mean = sum.divide(total);
  var indices = ee.List.sequence(1, size);
  // Compute between sum of squares, where each mean partitions the data.
  var bss = indices.map(function(i) {
    var aCounts = counts.slice(0, 0, i);
    var aCount = aCounts.reduce(ee.Reducer.sum(), [0]).get([0]);
    var aMeans = means.slice(0, 0, i);
    var aMean = aMeans.multiply(aCounts)
        .reduce(ee.Reducer.sum(), [0]).get([0])
        .divide(aCount);
    var bCount = total.subtract(aCount);
    var bMean = sum.subtract(aCount.multiply(aMean)).divide(bCount);
    return aCount.multiply(aMean.subtract(mean).pow(2)).add(
          bCount.multiply(bMean.subtract(mean).pow(2)));
  });
  print(ui.Chart.array.values(ee.Array(bss), 0, means));
  // Return the mean value corresponding to the maximum BSS.
  return means.sort(bss).get([-1]);
};
//////////////////////////////////////////////////////////////////////
// DATA //
//////////////////////////////////////////////////////////////////////
var s2toa = ee.ImageCollection('COPERNICUS/S2');
var boundary = ee.Geometry.Polygon([
  [-97.56191565995312,39.49460479072289],
  [-95.54043128495312,39.42674787979082],
  [-95.10097815995312,42.117677273699144],
  [-96.86977698807812,42.20318732895907],
  [-97.56191565995312,39.49460479072289],
]);
// March 21st
var toaFloodImgs21 = s2toa
  .filterDate('2019-03-20', '2019-03-22')
  .filterMetadata('MGRS_TILE', 'contains', '14')
  .filterBounds(boundary)
  .filterMetadata('DATASTRIP_ID', 'equals', 'S2A_OPER_MSI_L1C_DS_EPAE_20190322T001148_S20190321T171358_N02.07');
// March 16th
var toaFloodImgs16 = s2toa
  .filterDate('2019-03-15', '2019-03-19')
  .filterMetadata('MGRS_TILE', 'contains', '14')
  .filterBounds(geometry);
// print(toaFloodImgs);
// Map.addLayer(toaFloodImgs16.geometry().dissolve().intersection(geometry))
// April 9th 2018
var toaNoFloodImgs = s2toa
  .filterDate('2018-07-08', '2018-07-10')
  .filterMetadata('MGRS_TILE', 'contains', '14')
  .filterBounds(boundary);
// For now lets use the a boundary that contains the minimum area of valid data
// since there is cloud cover in the NE on Mar 16.
// Use this geom for clipping all raster layers
var clippingBounds1 = toaNoFloodImgs.geometry().dissolve().intersection(geometry);  // TODO: hardcode for speed
var clippingBounds2 = toaFloodImgs16.geometry().dissolve().intersection(geometry);
var clippingBounds3 = toaFloodImgs21.geometry().dissolve().intersection(geometry);
var clippingBounds = clippingBounds1.intersection(clippingBounds2).intersection(clippingBounds3);
//////////////////////////////////////////////////
// Compute MNDWI, water threshold, snow threshold,
//////////////////////////////////////////////////
// Compute mdwi, mosaic it, set the bounds as a property
var mar21 = toaFloodImgs21
  .map(cloudMask)
  .map(function(img) {return img.divide(10000.0)})
  .map(calcMndwi)
  .mosaic()
  .clip(clippingBounds)
  .set({bounds: toaFloodImgs21.geometry().dissolve()});
// Create histogram and run Otsu's method on it to get a water threshold
// var mar21Hist = mar21.select('mndwi').reduceRegion({
//   reducer: ee.Reducer.histogram(100)
//       .combine('mean', null, true),
//   geometry: ee.Geometry(mar21.get('bounds')),
//   scale: 10,
//   maxPixels: 1e13
// });
// var mar21Threshold = otsu(mar21Hist.get('mndwi_histogram')); 
// print('March 21 threshold', mar21Threshold);
var mar21WaterThreshold = 0.1327496525540641;  // Uncomment above to recalculate
// Mask using the new water mask so only water pixels are showing
var mar21WaterMask = mar21.select('mndwi').gt(mar21WaterThreshold);
var mar21WaterMasked = mar21.updateMask(mar21WaterMask);
// Find threshold on an NIR band to separate snow from water
// var snowMask21Hist = mar21WaterMasked.select('B8A').reduceRegion({
//   reducer: ee.Reducer.histogram(100)
//       .combine('mean', null, true),
//   geometry: ee.Geometry(mar21.get('bounds')),
//   scale:10,
//   maxPixels: 1e13
// });
// var snowMask21Threshold = otsu(snowMask21Hist.get('B8A_histogram')); 
// print('March 21 snow threshold', snowMask21Threshold);
var mar21SnowThrehold = 0.21106483594884837;
// Create snow mask
var mar21SnowMask = mar21.select('B8A').gt(mar21SnowThrehold);
// Combine snow and water mask (negation of snow mask AND water mask removes pixels with high NIR reflectances originally classified as water)
var mar21Mask = mar21SnowMask.eq(0).and(mar21WaterMask);
// Find image histogram for an nir band
// print(ui.Chart.image.histogram(mar21WaterMasked.select('B8A'), ee.Geometry(mar21.get('bounds')), 100, 30))
// Compute mdwi, mosaic it, set the bounds as a property
var mar16 = toaFloodImgs16
  .map(cloudMask)
  .map(function(img) {return img.divide(10000.0)})
  .map(calcMndwi)
  .mosaic()
  .clip(clippingBounds)
  .set({bounds: toaFloodImgs16.geometry().dissolve()});
// Create histogram and run Otsu's method on it to get a water threshold
// var mar16Hist = mar16.select('mndwi').reduceRegion({
//   reducer: ee.Reducer.histogram(100)
//       .combine('mean', null, true),
//   geometry: ee.Geometry(mar16.get('bounds')),
//   scale: 10,
//   maxPixels: 1e13
// });
// var mar16Threshold = otsu(mar16Hist.get('mndwi_histogram')); 
// print('March 16 threshold', mar16Threshold);
var mar16WaterThreshold = 0.10147356256645862;  // Uncomment above to recalculate
// Mask using the new water mask so only water pixels are showing
var mar16WaterMask = mar16.select('mndwi').gt(mar16WaterThreshold);
var mar16WaterMasked = mar16.updateMask(mar16WaterMask);
// Find threshold on an NIR band to separate snow from water
// var snowMask16Hist = mar16WaterMasked.select('B8A').reduceRegion({
//   reducer: ee.Reducer.histogram(100)
//       .combine('mean', null, true),
//   geometry: ee.Geometry(mar16.get('bounds')),
//   scale:10,
//   maxPixels: 1e13
// });
// var snowMask16Threshold = otsu(snowMask16Hist.get('B8A_histogram')); 
// print('March 16 snow threshold', snowMask16Threshold);
var mar16SnowThrehold = 0.2109770179154466;
// Create snow mask
var mar16SnowMask = mar16.select('B8A').gt(mar16SnowThrehold);
// Combine snow and water mask (negation of snow mask AND water mask removes pixels with high NIR reflectances originally classified as water)
var mar16Mask = mar16SnowMask.eq(0).and(mar16WaterMask);
// Map.addLayer(mar16.select('cloud_mask').multiply(10000))//{palette: 'blue'})
// Compute mdwi, mosaic it, set the bounds as a property
var jul19 = toaNoFloodImgs
  .map(cloudMask)
  .map(function(img) {return img.divide(10000.0)})
  .map(calcMndwi)
  .mosaic()
  .clip(clippingBounds)
  .set({bounds: toaFloodImgs16.geometry().dissolve()});
// Create histogram and run Otsu's method on it to get a water threshold
// var jul19Hist = jul19.select('mndwi').reduceRegion({
//   reducer: ee.Reducer.histogram(100)
//       .combine('mean', null, true),
//   geometry: ee.Geometry(jul19.get('bounds')),
//   scale: 10,
//   maxPixels: 1e13
// });
// var jul19Threshold = otsu(jul19Hist.get('mndwi_histogram')); 
// print('July 19 threshold', jul19Threshold);
var jul19WaterThreshold = 0.05458000155135911;  // Uncomment above to recalculate
// Mask using the new water mask so only water pixels are showing
var jul19WaterMask = jul19.select('mndwi').gt(jul19WaterThreshold);
var jul19WaterMasked = jul19.updateMask(jul19WaterMask);
// Map.addLayer(jul19.select('cloud_mask').multiply(10000), {min: 0, max: 1}, 'jul19 cloud mask');
// Map.addLayer(jul19, {bands: ['B4', 'B3', 'B2'], min: 0, max: 0.3}, 'jul19')
// Map.addLayer(jul19WaterMask, {min: 0, max: 1}, 'jul19 water mask')
// Map.addLayer(mar16.select('cloud_mask').multiply(10000), {min: 0, max: 1}, 'mar16 cloud mask');
// Map.addLayer(mar16, {bands: ['B4', 'B3', 'B2'], min: 0, max: 0.3}, 'mar16')
// Map.addLayer(mar16Mask, {min: 0, max: 1}, 'mar16 water mask')
// Map.addLayer(mar16Mask.geometry())
// mar21 = waterMask2019.mosaic().selfMask().rename(['Water 2019-03-16']);
// var noWaterMask = toaNoFloodImgs.map(calcMndwi);
// noWaterMask = noWaterMask.mosaic().selfMask().rename(['Water 2018-07-09']);
// Map.addLayer(
//   toaFloodImgs21.map(function(img) {return img.divide(10000)}),
//   {bands: ['B4', 'B3', 'B2'], min: 0, max: 0.4},
//   'true color'
// );
// Map.addLayer(waterMask.map(function(img) {return img.mask(img)}), {palette: 'blue'}, 'mndwi');
// True color images
var trueColorImages = {
  '2018-07-09 Water': jul19,
  '2019-03-16 Water': mar16,
  '2019-03-21 Water': mar21
};
var images = {
  '2018-07-09 Water': jul19WaterMask.selfMask(),
  '2019-03-16 Water': mar16Mask.selfMask(),
  '2019-03-21 Water': mar21Mask.selfMask()
};
///////////////////////////////////////////////////////////////////////////
// Ancillary data
///////////////////////////////////////////////////////////////////////////
// Locations of interest
var locations = {
  fremont: {lon: -96.499, lat: 41.442}
};
///////////////////////////////////////////////////////////////////////////////
// APPLICATION CODE
//
// Code modified from: https://google.earthengine.app/view/forest-change
///////////////////////////////////////////////////////////////////////////////
// Add the clipping boundary
// Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();
// Create a feature collection
var featCol = ee.FeatureCollection([ee.Feature(clippingBounds)]);
// Paint all the polygon edges with the same number and width, display.
var outline = empty.paint({
  featureCollection: featCol,
  color: 1,
  width: 3
});
// Create the left map, and have it display layer 0.
var leftMap = ui.Map();
var controlVisParasm = {layerList: false, fullscreenControl: false, mapTypeControl: false};
leftMap.setOptions({mapTypeId: 'TERRAIN'});
leftMap.setControlVisibility(controlVisParasm);
var leftSelector = addLayerSelector(leftMap, 1, 'middle-left', 'Choose a date for the left pane');
leftMap.addLayer(outline, {palette: 'FF0000'}, 'boundary');
// Create the right map, and have it display layer 1.
var rightMap = ui.Map();
rightMap.setControlVisibility(controlVisParasm);
rightMap.setOptions({mapTypeId: 'TERRAIN'});
var rightSelector = addLayerSelector(rightMap, 0, 'middle-right', 'Choose a date for the right pane');
var titleText = ui.Label({
  value: 'Nebraska Flooding, March 2019',
});
var infoText1 = ui.Label({
  value: 'Click and drag the center button to compare the two dates',
  style: {'font-size': '80%'}
});
var infoText2 = ui.Label({
  value: 'Data derived from Sentinel 2 Level 1-C imagery',
  style: {'font-size': '60%'}
});
var infoText3 = ui.Label({
  value: 'Produced by the School of Natural Resources, UNL, 2019',
  style: {'font-size': '60%'}
});
// Add an informational text box
rightMap.add(ui.Panel({widgets: [titleText, infoText1, infoText2, infoText3], style: {position: 'bottom-right'}}));
// Add an outline
rightMap.addLayer(outline, {palette: 'FF0000'}, 'boundary');
// rightMap.add(ui.Map.Layer(trueColorImages['2018-07-09 Water'], {bands: ['B4', 'B3', 'B2'], min: 0, max: 0.3}, 'true color'));
// Adds a layer selection widget to the given map, to allow users to change
// which image is displayed in the associated map.
function addLayerSelector(mapToChange, defaultValue, position, prompt) {
  var label = ui.Label(prompt);
  // toggle local variable
  var toggleState = false;
  // This function changes the given map to show the selected image.
  function updateMap(selection) {
    var trueColorLyr = ui.Map.Layer(trueColorImages[select.getValue()], {bands: ['B4', 'B3', 'B2'], min: 0, max: 0.3}, 'true color').setShown(toggleState);
    mapToChange.layers().set(0, trueColorLyr);
    mapToChange.layers().set(1, ui.Map.Layer(images[selection], {palette: 'blue', opacity: 0.6}));
  }
  // Configure a selection dropdown to allow the user to choose between images,
  // and set the map to update when a user makes a selection.
  var select = ui.Select({items: Object.keys(images), onChange: updateMap});
  select.setValue(Object.keys(images)[defaultValue], true);
  function updateOnToggle(bool) {
    toggleState = bool;
    mapToChange.layers().get(0).setShown(bool);
  }
  var toggle = ui.Checkbox('Toggle true color image', false, updateOnToggle);
  var controlPanel =
      ui.Panel({widgets: [label, select, toggle], style: {position: position}});
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
leftMap.setCenter(locations.fremont.lon, locations.fremont.lat, 12);