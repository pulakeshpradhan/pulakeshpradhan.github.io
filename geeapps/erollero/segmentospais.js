var table = ee.FeatureCollection("users/erollero/Departamentos_INDEC_2015"),
    deleg = ee.FeatureCollection("users/erollero/Delegaciones_2013_dislv");
// This example uses the Sentinel-2 QA band to cloud mask
// the collection.  The Sentinel-2 cloud flags are less
// selective, so the collection is also pre-filtered by the
// CLOUDY_PIXEL_PERCENTAGE flag, to use only relatively
// cloud-free granule.
// Function to mask clouds using the Sentinel-2 QA band.
function maskS2clouds(image) {
  var qa = image.select('QA60')
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = ee.Number(2).pow(10).int()
  var cirrusBitMask = ee.Number(2).pow(11).int()
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0).and(
             qa.bitwiseAnd(cirrusBitMask).eq(0))
  // Return the masked and scaled data, without the QA bands.
  return image.updateMask(mask).divide(10000)
      .select("B.*")
      .copyProperties(image, ["system:time_start"])
}
// Map the function over one year of data and take the median.
// Load Sentinel-2 TOA reflectance data.
var collection = ee.ImageCollection('COPERNICUS/S2_SR')
    .filterDate('2019-09-10', '2019-12-30')
    // Pre-filter to get less cloudy granules.
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10))
    .map(maskS2clouds)
var composite = collection.median()
var imagepais = composite.clip(table);
print(imagepais);
Map.addLayer(imagepais, {min:0.0275 ,max:0.486 ,gamma: [0.85, 1.35, 1.1], bands: ['B8','B11','B4']}, 'RGB');
var desdeFT = ee.FeatureCollection("users/erollero/TOTAL_SEGMENTOS_17Sep19");
// Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();
// Paint all the polygon edges with the same number and width, display.
var outline = empty.paint({
  featureCollection: desdeFT,
  color: 1,
  width: 2
});
Map.addLayer(outline, {palette: 'black'}, 'Segmentos');
// Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();
// Paint all the polygon edges with the same number and width, display.
var outline = empty.paint({
  featureCollection: table,
  color: 1,
  width: 2
});
Map.addLayer(outline, {palette: 'fffb00'}, 'Deptos');
// Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();
// Paint all the polygon edges with the same number and width, display.
var outline = empty.paint({
  featureCollection: deleg,
  color: 1,
  width: 2
});
Map.addLayer(outline, {palette: 'blue'}, 'Delegaciones');