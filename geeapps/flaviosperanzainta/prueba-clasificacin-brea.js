var sitio = ui.import && ui.import("sitio", "table", {
      "id": "users/flaviosperanzainta/Area_prueba_classif"
    }) || ee.FeatureCollection("users/flaviosperanzainta/Area_prueba_classif");
// Análisis de degradación para identificar presencia de Brea
// Paso 2 #############################################################
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
var b_1 = 'B12'
var b_2 = 'B8'
var b_3 = 'B9'
var collection = ee.ImageCollection('COPERNICUS/S2_SR')
                  .filterDate('2020-08-01', '2020-10-15')
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',10))
                  .map(maskS2clouds)
                  ;
// Reduce the collection by taking the median.
var median = collection.median();
// Load a table of state boundaries and filter.
// Clip to the output image to the Nevada and Arizona state boundaries.
var clipped = median.clipToCollection(sitio);
var visualization = {min: 0.04,max: 0.46,bands: [b_1, b_3, b_2],};
Map.addLayer(clipped, visualization, 'clipped composite', false);
Map.addLayer(sitio, {'color':'00FF11'}, "Area de estudio", false);
Map.centerObject(sitio);
//CLASIFICACION NO SUPERVISADA____________________________________
// Load a pre-computed Landsat composite for input.
var input = ee.Image('LANDSAT/LE7_TOA_1YEAR/2001');
// Define a region in which to generate a sample of the input.
var region = ee.Geometry.Rectangle(29.7, 30, 32.5, 31.7);
// Display the sample region.
//Map.setCenter(31.5, 31.0, 8);
//Map.addLayer(ee.Image().paint(region, 0, 2), {}, 'region');
// Make the training dataset.
var training = clipped.sample({
  region: sitio,
  scale: 30,
  numPixels: 5000
});
// Instantiate the clusterer and train it.
var clusterer = ee.Clusterer.wekaKMeans(15).train(training);
// Cluster the input using the trained clusterer.
var result = clipped.cluster(clusterer);
// Display the clusters with random colors.
Map.addLayer(result.randomVisualizer(), {}, 'clusters');