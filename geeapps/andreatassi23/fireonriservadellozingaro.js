var roi = ui.import && ui.import("roi", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                12.68257216312079,
                38.19612469984191
              ],
              [
                12.68257216312079,
                38.069246663984316
              ],
              [
                12.825943548183272,
                38.069246663984316
              ],
              [
                12.825943548183272,
                38.19612469984191
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [
        {
          "type": "rectangle"
        }
      ],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[12.68257216312079, 38.19612469984191],
          [12.68257216312079, 38.069246663984316],
          [12.825943548183272, 38.069246663984316],
          [12.825943548183272, 38.19612469984191]]], null, false);
Map.centerObject(roi,12);
//Define the bands of interested
var inBands = ee.List(['B2','B3','B4','B8','B12'])
//Define parameters for visualization
var RGBparams  = {min:0, max: 0.3, bands:   ['B4_median', 'B3_median', 'B2_median']};
var NDVIparams = {min:0, max: 0.5, palette: ['White','Salmon','Gold', 'Green','DarkGreen']};
//Function to mask the clouds
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
//Define the image of September 2019
var dataset2019 = ee.ImageCollection('COPERNICUS/S2_SR')
                  .filterDate('2019-09-05', '2019-09-15')
                  .filterBounds(roi)
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',20))
                  .map(maskS2clouds);
var image2019= dataset2019.select(inBands).reduce(ee.Reducer.median()).clip(roi)
//Add NDVI index
var ndvi2019 = image2019.normalizedDifference(['B8_median', 'B4_median']).rename('NDVI');
//Add NDR index
var ndr2019 =image2019.normalizedDifference(['B8_median', 'B12_median']).rename('NDR'); 
// Display the result.
Map.addLayer(image2019, RGBparams,  'RGB_2019');
Map.addLayer(ndvi2019,  NDVIparams, 'NDVI_2019');
//Define the image of September 2020
var dataset2020 = ee.ImageCollection('COPERNICUS/S2_SR')
                  .filterDate('2020-09-05','2020-09-15')
                  .filterBounds(roi)
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',20))
                  .map(maskS2clouds);
var image2020 = dataset2020.select(inBands).reduce(ee.Reducer.median()).clip(roi)
//Add NDVI index
var ndvi2020 = image2020.normalizedDifference(['B8_median', 'B4_median']).rename('NDVI');
//Add NDR index
var ndr2020 =image2020.normalizedDifference(['B8_median', 'B12_median']).rename('NDR');
// Display the result.
Map.addLayer(image2020, RGBparams, 'RGB_2020');
Map.addLayer(ndvi2020,  NDVIparams, 'NDVI_2020');
//Exporting the results
Export.image.toAsset({
  image: image2019,
  region: roi,
  description: 'Image RGB 2019',
  scale: 10
});
Export.image.toAsset({
  image: image2020,
  region: roi,
  description: 'Image RGB 2020',
  scale: 10
});
Export.image.toAsset({
  image: ndvi2019,
  region: roi,
  description: 'NDVI 2019',
  scale: 10
});
Export.image.toAsset({
  image: ndvi2020,
  region: roi,
  description: 'NDVI 2020',
  scale: 10
});