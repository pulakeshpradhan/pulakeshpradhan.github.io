var imgVV = ee.ImageCollection('COPERNICUS/S1_GRD')
        .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
        .filter(ee.Filter.eq('instrumentMode', 'IW'))
        .select('VV')
        .map(function(image) {
          var edge = image.lt(-30.0);
          var maskedImage = image.mask().and(edge.not());
          return image.updateMask(maskedImage);
        });
var desc = imgVV.filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'));
var asc = imgVV.filter(ee.Filter.eq('orbitProperties_pass', 'ASCENDING'));
var spring = ee.Filter.date('2018-03-01', '2018-04-20');
var lateSpring = ee.Filter.date('2018-04-21', '2018-06-10');
var summer = ee.Filter.date('2018-06-11', '2018-08-31');
var descChange = ee.Image.cat(
        desc.filter(spring).mean(),
        desc.filter(lateSpring).mean(),
        desc.filter(summer).mean());
var ascChange = ee.Image.cat(
        asc.filter(spring).mean(),
        asc.filter(lateSpring).mean(),
        asc.filter(summer).mean());
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
                  .filterDate('2018-01-01', '2018-06-30')
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
                  .map(maskS2clouds);
var rgbVis = {
  min: 0.0,
  max: 0.3,
  bands: ['B4', 'B3', 'B2'],
};
Map.addLayer(dataset.median(), rgbVis, 'RGB');
Map.setCenter(-54, -14, 6);
Map.addLayer(ascChange, {min: -25, max: 5,  gamma: [0.5, 0.5, 0.5]}, 'Multi-T Mean ASC', true);
Map.addLayer(descChange, {min: -25, max: 5,  gamma: [0.5, 0.5, 0.5]}, 'Multi-T Mean DESC', true);