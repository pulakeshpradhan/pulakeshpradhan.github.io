var table = ee.FeatureCollection("users/krotalo25/Limites_Qroo_Const_Poligono_SEMA2016");
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
//Seleccionar municipio 
var fcp = ee.FeatureCollection(table)
  .filter(ee.Filter.eq('MUNICIPIO','Felipe Carrillo Puerto'));
var bklar = ee.FeatureCollection(table)
  .filter(ee.Filter.eq('MUNICIPIO','Bacalar'));
var opb = ee.FeatureCollection(table)
  .filter(ee.Filter.eq('MUNICIPIO','Othon P. Blanco'));
var bj = ee.FeatureCollection(table)
  .filter(ee.Filter.eq('MUNICIPIO','Benito Juarez'));
var pm = ee.FeatureCollection(table)
  .filter(ee.Filter.eq('MUNICIPIO','Puerto Morelos'));
var lz = ee.FeatureCollection(table)
  .filter(ee.Filter.eq('MUNICIPIO','Lazaro Cardenas'));
var jmm = ee.FeatureCollection(table)
  .filter(ee.Filter.eq('MUNICIPIO','Jose Maria Morelos'));
var tulum = ee.FeatureCollection(table)
  .filter(ee.Filter.eq('MUNICIPIO','Tulum'));
var soli = ee.FeatureCollection(table)
  .filter(ee.Filter.eq('MUNICIPIO', 'Solidaridad'));
var coz = ee.FeatureCollection(table)
  .filter(ee.Filter.eq('MUNICIPIO', 'Cozumel'));
var im = ee.FeatureCollection(table)
  .filter(ee.Filter.eq('MUNICIPIO', 'Isla Mujeres'));
// Clip to the output image to the Nevada and Arizona state boundaries.
//var clipped = dataset.clipToCollection(municipio);
// Representa imagenes  por municpio
Map.addLayer(dataset.median().clipToCollection(opb), rgbVis, 'Othón P. Blanco');
Map.addLayer(dataset.median().clipToCollection(bklar), rgbVis, 'Bacalar');
Map.addLayer(dataset.median().clipToCollection(jmm), rgbVis, 'José María Morelos');
Map.addLayer(dataset.median().clipToCollection(fcp), rgbVis, 'Felipe Carrillo Puerto');
Map.addLayer(dataset.median().clipToCollection(tulum), rgbVis, 'Tulum');
Map.addLayer(dataset.median().clipToCollection(coz), rgbVis, 'Cozumel');
Map.addLayer(dataset.median().clipToCollection(soli), rgbVis, 'Solidaridad');
Map.addLayer(dataset.median().clipToCollection(pm), rgbVis, 'Puerto Morelos');
Map.addLayer(dataset.median().clipToCollection(bj), rgbVis, 'Benito Juárez');
Map.addLayer(dataset.median().clipToCollection(lz), rgbVis, 'Lázaro Cardenas');
Map.addLayer(dataset.median().clipToCollection(im), rgbVis, 'Isla Mujeres');
Map.setCenter(-87.640966, 20.057702, 8);