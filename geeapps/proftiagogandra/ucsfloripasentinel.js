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
var bb = ee.Geometry.Polygon(
            [[[-48.707630803177814, -27.268095521187682],
              [-48.707630803177814, -27.935004711536372],
              [-48.191273381302814, -27.935004711536372],
              [-48.191273381302814, -27.268095521187682]]]);
// Map the function over one year of data and take the median.
// Load Sentinel-2 TOA reflectance data.
var dataset2016 = ee.ImageCollection('COPERNICUS/S2')
                  .filterDate('2016-01-01', '2016-12-30')
                  // Pre-filter to get less cloudy granules.
                   .filterBounds(bb)
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
                  //.map(function(image){return image.clip(bb)})
                  .map(maskS2clouds);
print(dataset2016)
var dataset2020 = ee.ImageCollection('COPERNICUS/S2')
                  .filterDate('2020-01-01', '2020-12-30')
                  // Pre-filter to get less cloudy granules.
                   .filterBounds(bb)
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
                  //.map(function(image){return image.clip(bb)})
                  .map(maskS2clouds);
print(dataset2020)
var rgbVis = {
  min: 0.0,
  max: 0.3,
  bands: ['B4', 'B3', 'B2'],
};
Map.setCenter(-48.5, -27.8, 9);
Map.addLayer(dataset2016.median(), rgbVis, '2016');
Map.addLayer(dataset2020.median(), rgbVis, '2020');