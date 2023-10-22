var mouaza = ui.import && ui.import("mouaza", "table", {
      "id": "projects/ee-landvis/assets/BahawalnagarDistrictMauza"
    }) || ee.FeatureCollection("projects/ee-landvis/assets/BahawalnagarDistrictMauza"),
    aoi = ui.import && ui.import("aoi", "table", {
      "id": "projects/ee-landvis/assets/BahawalnagarDistrict"
    }) || ee.FeatureCollection("projects/ee-landvis/assets/BahawalnagarDistrict");
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
var dataset = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
                  .filterDate('2023-05-01', '2023-05-15')
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',10))
                  .map(maskS2clouds);
var visualization = {
  min: 0.0,
  max: 0.3,
  bands: ['B4', 'B3', 'B2'],
};
var clippedImage = dataset.mean().clip(aoi);
Map.setCenter(73.07274, 29.66683, 9);
var customStyle = {
  fillColor: 'transparent', // hollow inside
  fillOpacity: 0.0, // fully transparent fill
  color: '#000000', // black boundary
  width: 2
};
// Add the table layer to the map
Map.addLayer(aoi, customStyle, 'Bahawalnagar', 1);
// Create a style for the table layer
Map.addLayer(clippedImage, visualization, 'Satellite Image (2023-05-01-2023-05-15)', 1);
var customStyle1 = {
  fillColor: ['red', 'green', 'blue', 'yellow', 'purple'], // different colors for each class
  fillOpacity: 0.5, // adjust the opacity as needed
  color: '#000000', // black boundary
  weight: 2
};
// Add the table layer to the map
Map.addLayer(mouaza, customStyle1, 'Mouazas Bahawalnagar', 0);
// Create a style for the table layer