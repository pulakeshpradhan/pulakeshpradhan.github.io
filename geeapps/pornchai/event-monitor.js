/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var imageMPA_Logo = ee.Image("users/pornchai/static/mappoint_logo"),
    imageSatellogicLogo = ee.Image("users/pornchai/static/satellogic_logo"),
    imageICEYE = ee.Image("users/pornchai/ICEYE/ICEYE_X7_GRD_SLH_68792_20210712T183206_Spk_TC_GEE");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
//*************************************
// Overlay S
// - Sentinel-2 (Multispectal Image) and
// - Sattellogic (Multispectral Image)
//   over the area of Ming Ti Chemical area.
//*************************************
Map.setCenter(100.71274, 13.67435, 14);
// turn on Google Satellite by default
Map.setOptions('SATELLITE');
// Add ICEYE image
var vizParamRGB = {bands:['b1','b2','b3']};
Map.addLayer(imageICEYE, vizParamRGB, 'ICEYE image 2021-07-13 atT 01:3:206 TH');
// Add SATELLOGIC Image
// Display an image given its ID.
var image = ee.Image('users/pornchai/20210709_035639_SN15_L3_MS');
// Display the image.
Map.addLayer(image, {min: 0, max: 128}, 'SATELLOGIC image 2021-07-07 at 10:56:39 TH');
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
// Add SENTINEL-2 Image
var dataset = ee.ImageCollection('COPERNICUS/S2_SR')
                  .filterDate('2021-07-01', '2021-07-06')
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',40))
                  .map(maskS2clouds);
var visualization = {
  min: 0.0,
  max: 0.3,
  bands: ['B4', 'B3', 'B2'],
};
Map.addLayer(dataset.mean(), visualization, 'SENTINEL-2 Image 2021-07-05 Factory Burning!!');
// Add LOGO
var visualization1b = {
  bands: ['b1']
};
Map.addLayer(imageMPA_Logo, visualization1b,'MappointAsia Logo');
//Map.addLayer(imageSatellogicLogo, visualization1b, 'Satellogic LOGO');