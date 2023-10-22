/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var Amazonia = ee.FeatureCollection("users/nicolasalejandromari/Amazonia"),
    NBRVISPARAMS = {"opacity":1,"bands":["nd"],"gamma":1},
    imageVisParam = {"opacity":1,"bands":["B11","B8","B4"],"min":0.12309608313892831,"max":0.19183285424404825,"gamma":1};
/***** End of imports. If edited, may not auto-convert in the playground. *****/
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
// Map the function over one year of data and take the median.
// Load Sentinel-2 TOA reflectance data.
var dataset = ee.ImageCollection('COPERNICUS/S2')
                  .filterDate('2019-08-01', '2019-09-22')
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
                  .map(maskS2clouds).filterBounds(Amazonia);
var rgbVis = {
  min: 0.0,
  max: 0.3,
  bands: ['B11', 'B8', 'B4'],
};
var AmazoniaComp = dataset.median();
Map.centerObject(Amazonia);
//Map.addLayer(dataset.median(), rgbVis, 'RGB');
Map.addLayer(Amazonia);
var clipped = AmazoniaComp.clip(Amazonia);
Map.addLayer(clipped, imageVisParam, "Amazonia S2");
print(dataset);
//var NBR = clipped.normalizedDifference(['B8', 'B12']);
//print(NBR);
//Map.addLayer(NBR, NBRVISPARAMS, "NBR");
///
var dataset = ee.ImageCollection('FIRMS').filter(
    ee.Filter.date('2019-08-01', '2019-09-22'));
var fires = dataset.select('T21').map(function(image) {
      return image.clip(Amazonia);
    });
var firesVis = {
  min: 325.0,
  max: 400.0,
  palette: ['red', 'orange', 'yellow'],
};
//Map.setCenter(-119.086, 47.295, 6);
Map.addLayer(fires, firesVis, 'Fires');