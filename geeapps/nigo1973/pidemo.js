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
var dataset = ee.ImageCollection('COPERNICUS/S2')
                  .filterDate('2018-12-15', '2018-12-19')
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',20))
                  .map(maskS2clouds)
                  .median();
var visualization = {
  min: 0.0,
  max: 0.3,
  bands: ['B4', 'B3', 'B2'],
};
print(dataset);
var PlasticIndex = dataset.select('B8').divide(dataset.select('B8').add(dataset.select('B4')));
var FDI = dataset.select('B8').subtract(dataset.select('B6').add(dataset.select('B11').subtract(dataset.select('B6'))));
// Compute the EVI using an expression.
var FDI_2 = dataset.expression(
    'Rnir - (Rre2 + (Rswir2 - Rre2) * (832 - 664.6)/(1613 - 664.5) * 10)', {
      'Rnir': dataset.select('B8'),
      'Rre2': dataset.select('B6'),
      'Rswir2': dataset.select('B11')
});
var dataset_land = ee.Image('ESA/GLOBCOVER_L4_200901_200912_V2_3');
var landcover = dataset_land.select('landcover');
Map.setCenter(33.0427, 34.6699, 16); // Limassol Old Port.
//Map.addLayer(landcover, {}, 'Landcover');
Map.addLayer(dataset, visualization, 'RGB');
Map.addLayer(PlasticIndex, {min: 0.39, max: 0.42, palette: ['0000cc', 'EB8400'], opacity: 0.5}, 'Plastic Index');
Map.addLayer(FDI_2, {min: 0.0, max: 0.1 , palette: ['BE003F', '336633'], opacity: 0.5}, 'FDI');