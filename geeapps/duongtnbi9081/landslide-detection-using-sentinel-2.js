/** import ROI */
var VY = ee.FeatureCollection("projects/ee-duongtnbi9081/assets/VY_boundary");
var visParams = {'color': 'red'}
/** Point to the center of ROI */
var geometry = ee.Geometry.Point([104.4551,21.6838])
Map.centerObject(geometry, 12)
/** CMAP for RGB image */
var rgbVis = {
  min: 0.0,
  max: 1.0,
  bands: ['B4', 'B3', 'B2'],
};
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
// Map the function over one month of data and take the median.
// Load Sentinel-2 TOA reflectance data.
var dataset = ee.ImageCollection('COPERNICUS/S2_SR')
                  .filterDate('2022-04-01', '2022-04-05')
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10))
                  // set boundary
                  .filter(ee.Filter.bounds(VY))
                  .map(maskS2clouds);
print('Collection', dataset);
var palette = [
  'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718',
  '74A901', '66A000', '529400', '3E8601', '207401', '056201',
  '004C00', '023B01', '012E01', '011D01', '011301'];
var img = dataset.median();
var clipped = img.clip(VY);
//Map.addLayer(clipped, rgbVis, 'Mean RGB Image')
//Map.addLayer(VY, visParams, 'Van Yen District')
function addIndices(image) {
  var ndvi = image.normalizedDifference(['B8', 'B4']).rename('ndvi');
  var ndwi = image.normalizedDifference(['B3', 'B8']).rename('ndwi');
  var bsi = image.expression(
    '((SWIR2 + RED) - (NIR + BLUE)) / ((SWIR2 + RED) + (NIR + BLUE))', {
      'SWIR2': image.select('B12'),
      'RED': image.select('B4'),
      'NIR': image.select('B8'),
      'BLUE': image.select('B2')
}).rename('bsi');
  return image.addBands(ndvi).addBands(ndwi).addBands(bsi);
}
// Map the function over the collection
var withIndices = dataset.map(addIndices, true);
// Composite
var clipped = withIndices.median()
print(clipped)
// visualize ndvi, ndwi, bsi
var ndviClipped = clipped.select('ndvi').clip(VY);
var ndviVis = {min:0.25, max:1.0, palette: palette};
var ndwiClipped = clipped.select('ndwi').clip(VY);
var ndwiVis = {min:1.0, max:1.0, palette: ['00FFFF', '0000FF'] };
var bsiClipped = clipped.select('bsi').multiply(3.5).clip(VY);
var bsiVis = {min:0, max:1, palette: ['yellow','brown']};
// Mask out the water
var ndviMasked = ndviClipped.updateMask(ndviClipped.expression('ndvi>=0.25',{'ndvi': ndviClipped.select('ndvi')}));
var ndwiMasked = ndwiClipped.updateMask(ndwiClipped.expression('ndwi>0',{'ndwi': ndwiClipped.select('ndwi')}));
var bsiMasked = bsiClipped.updateMask(bsiClipped.expression('(bsi>=0.25 & bsi <0.4) || (ndvi<0 & ndvi >-0.15)',
                                                    {'bsi': bsiClipped.select('bsi'), 
                                                     'ndvi': ndviClipped.select('ndvi')
                                                    }));
Map.addLayer(ndviMasked, ndviVis, 'NDVI')
Map.addLayer(bsiMasked, bsiVis, 'BSI')
Map.addLayer(ndwiMasked, ndwiVis, 'NDWI')
//Export.image.toDrive({
  //image: bsiMasked,
  //description: 'Vy district',
  //crs: bsiMasked.crs,
  //crsTransform: bsiMasked.transform,
  //region: VY
//});