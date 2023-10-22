var table = ui.import && ui.import("table", "table", {
      "id": "users/zacharysha1018/beijing"
    }) || ee.FeatureCollection("users/zacharysha1018/beijing");
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
                  .filterDate('2019-12-11', '2020-02-03')
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
                  .map(maskS2clouds);
var image1= dataset.median();                  
var ndwi = image1.expression(
    '(gre - nir) / (nir + gre)',
    {
        gre: image1.select('B3'),    // 620-670nm, RED
        nir: image1.select('B8')    // 841-876nm, NIR
    });
var rgbVis = {
  min: 0.0,
  max: 0.3,
  bands: ['B4', 'B3', 'B2'],
};
var water = ndwi.where(ndwi.gt(0.3),1).where(ndwi.lt(0.3),0);
var patchsize1  = water.toInt32().connectedPixelCount(8);
var myim2 = water.toInt32().where(patchsize1.lt(8),0);
Map.setCenter(116, 40, 12);
Map.addLayer(dataset.median(), rgbVis, 'RGB');
Map.addLayer(ndwi.clip(table), {min: 0, max: 1}, 'NDwI');
//Map.addLayer(everGreen.clip(table), {min: 0, max: 1}, 'everGreen');
Map.addLayer(myim2.clip(table), {min: 0, max: 1}, 'myim2');