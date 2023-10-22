//The following sections provide an example of the object-based method applied to the detection of buildings
//by Landsat 8 surface temperature (SLT) with each section based on the first. Run the following snippet 
//to generate the base image: thermal hot spots (> 303 degrees Kelvin) for a small region of Caqueta - Colombia.
//================================================
// Make an area of interest geometry centered on Caqueta region.
var point = ee.Geometry.Point(-74.554294, 2.123142);
var aoi = point.buffer(5000);
// Import a Sentinel 2 image, subset the thermal band, and clip to the
// area of interest.
//var image = ee.Image('S2A_MSIL1C_20200518T152641_N0209_R025_T18PYT_20200518T185114');
var image = ee.ImageCollection('COPERNICUS/S2_SR')
                .filterBounds(ee.Geometry.Point(-74.803498, 2.113861))
                .filterDate('2020-01-01', '2020-08-31')
                .sort('CLOUDY_PIXEL_PERCENTAGE')
                .first();
Map.centerObject(image, 11);
Map.addLayer(image, {bands: ['B4', 'B3', 'B2'], min: 0, max: 2000}, 'image');
//================================================================
// Compute the Barren Soil Modificated Index (BSI modificated).
//var nir = image.select('B8');
//var red = image.select('B4');
//var kelvin = nir.subtract(red).divide(nir.add(red)).rename('NDVI') .clip(aoi);
//¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡
var BSI = image.expression(
    ' 2.5 * ((SWIR + RED)-(NIR + BLUE)) / ((SWIR + RED)+(NIR + BLUE))', {
      'SWIR': image.select('B11'),
      'NIR': image.select('B8A'),
      'RED': image.select('B4'),
      'BLUE': image.select('B2')
}).clip(aoi);
//¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡
  // Display the result.
Map.centerObject(image, 9);
var ndviParams = {min: -1, max: 1, palette: ['blue', 'white', 'green']};
Map.addLayer(BSI, ndviParams, 'BSI image');
//===================================================================
var pais = ee.FeatureCollection("FAO/GAUL/2015/level2");
var Region = pais.filter(ee.Filter.eq('ADM2_NAME', 'La Macarena'));
//Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte()
// Paint the polygon country edges
var outline = empty.paint({
  'featureCollection': Region,
  'color': 1,
  'width': 1.5
});
Map.addLayer(outline, {'palette': 'FF0000'}, 'co')
var geometry = Region
//cloud mask
function maskL8sr(col) {
  // Bits 3 and 5 are cloud shadow and cloud, respectively.
  var cloudShadowBitMask = (1 << 3);
  var cloudsBitMask = (1 << 5);
  // Get the pixel QA band.
  var qa = col.select('pixel_qa');
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
                 .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
  return col.updateMask(mask);
}
//vis params
var vizParams = {
bands: ['B5', 'B6', 'B4'],
min: 0,
max: 4000,
gamma: [1, 0.9, 1.1]
};
var vizParams2 = {
bands: ['B4', 'B3', 'B2'],
min: 0,
max: 3000,
gamma: 1.4,
};
//load the collection:
 {
var col = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
.map(maskL8sr)
.filterDate('2020-01-01','2020-08-31')
.filterBounds(geometry);
}
print(col, 'coleccion');
//imagen reduction
{
var image = col.median();
print(image, 'image');
Map.addLayer(image.clip(aoi), vizParams2, false);
}
//median
{
var ndvi = image.normalizedDifference(['B5', 
'B4']).rename('NDVI');
var ndviParams = {min: -1, max: 1, palette: ['blue', 'white', 
'green']};
print(ndvi,'ndvi');
Map.addLayer(ndvi.clip(aoi), ndviParams, 'ndvi', false);
}
//select thermal band 10(with brightness tempereature), no calculation 
var thermal= image.select('B10').multiply(0.1);
var b10Params = {min: 291.918, max: 302.382, palette: ['blue', 
'white', 'green']};
Map.addLayer(thermal.clip(aoi), b10Params, 'thermal', false);
// find the min and max of NDVI
{
var min = ee.Number(ndvi.reduceRegion({
reducer: ee.Reducer.min(),
geometry: geometry,
scale: 30,
maxPixels: 1e9
}).values().get(0));
print(min, 'min');
var max = ee.Number(ndvi.reduceRegion({
reducer: ee.Reducer.max(),
geometry: geometry,
scale: 30,
maxPixels: 1e9
}).values().get(0));
print(max, 'max')
}
//fractional vegetation
{
var fv =(ndvi.subtract(min).divide(max.subtract(min))).pow(ee.Number(2)).rename('FV').clip(aoi); 
print(fv, 'fv');
Map.addLayer(fv);
}
//Emissivity
var a= ee.Number(0.004);
var b= ee.Number(0.986);
var EM=fv.multiply(a).add(b).rename('EMM');
var imageVisParam3 = {min: 0.9865619146722164, max:0.989699971371314};
Map.addLayer(EM, imageVisParam3,'EMM', false);
//LST in Celsius Degree bring -273.15
//NB: In Kelvin don't bring -273.15
var LST = thermal.expression(
'(Tb/(1 + (0.00115* (Tb / 1.438))*log(Ep)))-273.15', {
 'Tb': thermal.select('B10'),
'Ep': EM.select('EMM')
}).rename('LST');
Map.addLayer(LST, {min: 20.569706944223423, max:29.328077233404645, palette: [
'040274', '040281', '0502a3', '0502b8', '0502ce', '0502e6',
'0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef',
'3be285', '3ff38f', '86e26f', '3ae237', 'b5e22e', 'd6e21f',
'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08', 'ff500d',
'ff0000', 'de0101', 'c21301', 'a71001', '911003'
 ]},'LST');
//===================================================================
var kelvin = BSI
  // Display the NDVI imagen.
Map.centerObject(point, 13);
//Map.addLayer(kelvin, {min: -1, max: 1},  'NDVI');
// Threshold the NDVI to set hot pixels as value 1 and not as 0.
var hotspots = kelvin.gt(0.37).add(LST.gt(75))
  // Mask the cold pixels (value 0).
  .selfMask()
  .rename('hotspots');
// Display the thermal hotspots on the Map.
Map.addLayer(hotspots, {palette: 'FF0000'}, 'Rural constructions');
// Etiquetar de forma exclusiva los objetos de imagen del punto de acceso.
var objectId = hotspots.connectedComponents({
  connectedness: ee.Kernel.plus(1),
  maxSize: 128
});
// Muestra los objetos identificados de forma única en el mapa (color).
Map.addLayer(objectId.randomVisualizer(), null, 'Objects');
// Calcular el número de píxeles en cada objeto definido por la banda de "etiquetas".
var objectSize = objectId.select('labels')
  .connectedPixelCount({
    maxSize: 100, eightConnected: false
  });
// Muestra el recuento de píxeles del objeto en el mapa.
Map.addLayer(objectSize, null, 'Object n pixels');
// Obtenga una imagen de área de píxeles.
var pixelArea = ee.Image.pixelArea();
// Multiply pixel area by the number of pixels in an object to calculate
// the object area. The result is an image where each pixel
// of an object relates the area of the object in m^2.
var objectArea = objectSize.multiply(pixelArea);
// Display object area to the Map.
Map.addLayer(objectArea, null, 'Object area m^2');
//Umbral de la imagen `objectArea` para definir una máscara que enmascara
// objetos por debajo de un tamaño determinado (0.01 hectárea en este caso).
var areaMask = objectArea.gte(100);
// Actualice la máscara de la capa `objectId` definida previamente usando el
// máscara de área mínima recién definida.
objectId = objectId.updateMask(areaMask);
Map.addLayer(objectId, null, 'Large hotspots');
// Make a suitable image for `reduceConnectedComponents()` by adding a label
// band to the `kelvin` temperature image.
kelvin = kelvin.addBands(objectId.select('labels'));
// Calculate the mean NDVI per object defined by the previously added
// "labels" band.
var patchTemp = kelvin.reduceConnectedComponents({
  reducer: ee.Reducer.mean(),
  labelBand: 'labels'
});
//=========================================================
//=======================================================
//Map.addLayer(image, {bands: 'B8,B11,B4', min: 0, max: 2000, gamma: 0.1},'Imagen S2', false);
// Display object mean temperature to the Map.
Map.addLayer(
  patchTemp,
  {min: 22, max: 40, palette: ['yellow', 'red']},
  'Mean temperature'
);
//=======================================================
//=====================================================
// Convert the objects detected by zones of the thresholded BSI to vectors.
var classes = ee.List([hotspots])
  .map(function(n) {
    var classImage = hotspots;
    var vectors = classImage.updateMask(classImage)
      .reduceToVectors({
        reducer: ee.Reducer.countEvery(), 
        geometry: aoi, 
        scale: 10,
        maxPixels: 1e8})
      .geometry();
    return ee.Feature(vectors, {"class": n,"size":vectors.area(1)});
  });
var result = ee.FeatureCollection(classes);
Map.addLayer(result,false);
// Export the image to Cloud Storage as an Asset.
Export.image.toDrive({
  image: result,
  description: 'vector',
  fileNamePrefix: 'obia',
  scale: 10,
  region: aoi
});