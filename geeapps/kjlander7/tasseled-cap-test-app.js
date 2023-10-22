var geometry = /* color: #98ff00 */ee.Geometry.Point([-122.02478370666495, 37.133549524174335]);
// Select and filter the Landsat 8 collection
var landsat = ee.ImageCollection("LANDSAT/LC08/C01/T1")
    .filterDate('2017-05-01', '2017-07-30')
    .filter(ee.Filter.lt('CLOUD_COVER', 10))
    .filterBounds(geometry)
    //.first();
print(landsat);
// Convert to TOA reflectance and select needed bands
var image = ee.Algorithms.Landsat.simpleComposite({
  collection: landsat,
  asFloat: true
}).select(['B2', 'B3', 'B4', 'B5', 'B6', 'B7']);
print(image);
// Create the Landsat 8 tasseled cap coefficient array
var coefficients = ee.Array([
  [0.3029,	0.2786,	0.4733,	0.5599,	0.5080, 0.1872],
  [-0.2941,	-0.2430,	-0.5424,	0.7276,	0.0713,	-0.1608],
  [0.1511,	0.1973,	0.3283,	0.3407,	-0.7117,	-0.4559],
  [-0.8239,	0.0849,	0.4396,	-0.0580,	0.2013,	-0.2773],
  [-0.3294,	0.0557,	0.1056,	0.1855,	-0.4349,	0.8085],
  [0.1079,	-0.9023,	0.4119,	0.0575,	-0.0259,	0.0252]
  ]);
// Select the bands of interest
//var image = ee.Image('LANDSAT/LC08/C01/T1/LC08_044034_20170614')
//              .select(['B2', 'B3', 'B4', 'B5', 'B6', 'B7']);
// Make an Array Image with a 1-D Array per pixel.
var arrayImg1D = image.toArray();
// Make an Array Image with a 2-D Array per pixel, 6x1.
var arrayImg2D = arrayImg1D.toArray(1);
// Do a matrix multiplication: 6x6 times 6x1.
var componentsImg = ee.Image(coefficients)
  .matrixMultiply(arrayImg2D)
  // Get rid of the extra dimensions.
  .arrayProject([0])
  .arrayFlatten([['brightness', 'greenness', 'wetness', 'fourth', 'fifth', 'sixth']]);
// Display the first three bands of the result and the input imagery.
var visParams = {
  bands: ['brightness', 'greenness', 'wetness'],
  min: -0.1,
  max: [0.6, 0.2, 0.1]
};
Map.addLayer(image, {bands: ['B5', 'B4', 'B3'], min: 0, max: 0.5}, 'false-colour IR');
Map.addLayer(componentsImg, visParams, 'components');
Map.centerObject(geometry, 8);