// Jambi
// Sentinel 2
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
var dataset_S2 = ee.ImageCollection('COPERNICUS/S2_SR')
                  .filterDate('2020-01-01', '2020-12-31')
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',20))
                  .map(maskS2clouds);
var visualization = {
  min: 0.0,
  max: 0.3,
  bands: ['B4', 'B3', 'B2'],
};
// Hansen 2020
var dataset = ee.Image('UMD/hansen/global_forest_change_2020_v1_8');
var treeCoverVisParam = {
  bands: ['treecover2000'],
  min: 0,
  max: 100,
  palette: ['black', 'green']
};
var treeLossVisParam = {
  bands: ['lossyear'],
  min: 0,
  max: 20,
  palette: ['yellow', 'red']
};
// Center of map
Map.setCenter(103.5394873,-1.6102634, 10);
Map.addLayer(dataset_S2.mean(), visualization, 'RGB');
Map.addLayer(dataset, treeCoverVisParam, 'tree cover');
Map.addLayer(dataset, treeLossVisParam, 'tree loss year');