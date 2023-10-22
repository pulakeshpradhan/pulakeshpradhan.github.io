var region = ui.import && ui.import("region", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.MultiPoint(),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            40.113187861576534,
            0.6744014127892122
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Point([40.113187861576534, 0.6744014127892122]),
    geometry2 = ui.import && ui.import("geometry2", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            11.2337103222336,
            6.864141219347646
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            12.25243417727594,
            7.285791376668666
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            25.890682591630405,
            14.65019869730361
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            42.43858614848623,
            11.811376433639929
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            41.405844255437785,
            11.924319978064151
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            41.23208731227934,
            12.066122585468705
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            46.98486168123597,
            10.353653427631082
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            51.04909951486069,
            10.454919723971555
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#98ff00",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #98ff00 */
    /* shown: false */
    ee.Geometry.MultiPoint(
        [[11.2337103222336, 6.864141219347646],
         [12.25243417727594, 7.285791376668666],
         [25.890682591630405, 14.65019869730361],
         [42.43858614848623, 11.811376433639929],
         [41.405844255437785, 11.924319978064151],
         [41.23208731227934, 12.066122585468705],
         [46.98486168123597, 10.353653427631082],
         [51.04909951486069, 10.454919723971555]]);
var region = geometry.buffer(5000)
Map.centerObject(region)
/**
 * Function to mask clouds based on the pixel_qa band of Landsat 8 SR data.
 * @param {ee.Image} image input Landsat 8 SR image
 * @return {ee.Image} cloudmasked Landsat 8 image
 */
function maskL8sr(image) {
  // Bits 3 and 5 are cloud shadow and cloud, respectively.
  var cloudShadowBitMask = (1 << 3);
  var cloudsBitMask = (1 << 5);
  // Get the pixel QA band.
  var qa = image.select('pixel_qa');
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
                 .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
  return image.updateMask(mask);
}
var image = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
                  .filterDate('2020-01-01', '2020-05-31')
                   .filterBounds(region)
                   //.select(['B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B11'])
                  .map(maskL8sr).median();
/*var visParams = {
  bands: ['B4', 'B3', 'B2'],
  min: 0,
  max: 3000,
  gamma: 1.4,
};*/
//Map.setCenter(114.0079, -26.0765, 9);
//Map.addLayer(image.median(), visParams);
// Set some information about the input to be used later.
var scale = 70;
var bandNames = image.bandNames();
// Mean center the data to enable a faster covariance reducer
// and an SD stretch of the principal components.
var meanDict = image.reduceRegion({
    reducer: ee.Reducer.mean(),
    geometry: region,
    scale: scale,
    maxPixels: 1e9
});
var means = ee.Image.constant(meanDict.values(bandNames));
var centered = image.subtract(means);
// This helper function returns a list of new band names.
var getNewBandNames = function(prefix) {
  var seq = ee.List.sequence(1, bandNames.length());
  return seq.map(function(b) {
    return ee.String(prefix).cat(ee.Number(b).int());
  });
};
// This function accepts mean centered imagery, a scale and
// a region in which to perform the analysis.  It returns the
// Principal Components (PC) in the region as a new image.
var getPrincipalComponents = function(centered, scale, region) {
  // Collapse the bands of the image into a 1D array per pixel.
  var arrays = centered.toArray();
  // Compute the covariance of the bands within the region.
  var covar = arrays.reduceRegion({
    reducer: ee.Reducer.centeredCovariance(),
    geometry: region,
    scale: scale,
    maxPixels: 1e9
  });
  // Get the 'array' covariance result and cast to an array.
  // This represents the band-to-band covariance within the region.
  var covarArray = ee.Array(covar.get('array'));
  // Perform an eigen analysis and slice apart the values and vectors.
  var eigens = covarArray.eigen();
  // This is a P-length vector of Eigenvalues.
  var eigenValues = eigens.slice(1, 0, 1);
  // This is a PxP matrix with eigenvectors in rows.
  var eigenVectors = eigens.slice(1, 1);
  // Convert the array image to 2D arrays for matrix computations.
  var arrayImage = arrays.toArray(1);
  // Left multiply the image array by the matrix of eigenvectors.
  var principalComponents = ee.Image(eigenVectors).matrixMultiply(arrayImage);
  // Turn the square roots of the Eigenvalues into a P-band image.
  var sdImage = ee.Image(eigenValues.sqrt())
    .arrayProject([0]).arrayFlatten([getNewBandNames('sd')]);
  // Turn the PCs into a P-band image, normalized by SD.
  return principalComponents
    // Throw out an an unneeded dimension, [[]] -> [].
    .arrayProject([0])
    // Make the one band array image a multi-band image, [] -> image.
    .arrayFlatten([getNewBandNames('pc')])
    // Normalize the PCs by their SDs.
    .divide(sdImage);
};
// Get the PCs at the specified scale and in the specified region
var pcImage = getPrincipalComponents(centered, scale, region);
print(pcImage)
Map.addLayer(pcImage, {bands: ['pc1', 'pc4', 'pc3'], min: -3, max: -3}, 'pc Image');
/*// Plot each PC as a new layer
for (var i = 0; i < bandNames.length().getInfo(); i++) {
  var band = pcImage.bandNames().get(i).getInfo();
  Map.addLayer(pcImage.select([band]), {min: -2, max: 2}, band);
}*/