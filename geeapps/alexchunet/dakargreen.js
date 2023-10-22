var AOI = ui.import && ui.import("AOI", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -17.631994709749325,
                14.912236238141361
              ],
              [
                -17.631994709749325,
                14.564272774230702
              ],
              [
                -17.129370198030575,
                14.564272774230702
              ],
              [
                -17.129370198030575,
                14.912236238141361
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
        [[[-17.631994709749325, 14.912236238141361],
          [-17.631994709749325, 14.564272774230702],
          [-17.129370198030575, 14.564272774230702],
          [-17.129370198030575, 14.912236238141361]]], null, false);
// Objective: Detection of Green areas in Bamako
//var cityPoint = ee.Geometry.Point(-7.99, 12.63) // Bamako location
var id = 'L1';
Map.addLayer(AOI,{},'Area of Interest', false);
Map.centerObject(AOI, 12);
var BaseImageStartDate = '2018-07-01';
var BaseImageEndDate = '2019-07-01';
// Function to mask clouds using the Sentinel-2 QA band.
function maskS2clouds(image) {
  var qa = image.select('QA60')
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
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
var collection = ee.ImageCollection('COPERNICUS/S2')
    .filterDate(BaseImageStartDate, BaseImageEndDate)
    // Pre-filter to get less cloudy granules.
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
    .map(maskS2clouds)
var composite = collection.median().clip(AOI)
// Display the results.
Map.addLayer(composite, {bands: ['B4', 'B3', 'B2'], min: 0, max: 0.3}, 'SE2 RGB', false)
// /// NDVI
var ndvi = composite.normalizedDifference(['B8','B4'])
Map.addLayer(ndvi,{min:-1, max:1},'ndvi', false);
/// calculate a threshold to declare a pixel as 'green'
var threshNdvi = ee.Number(ndvi.reduceRegion({
      reducer: ee.Reducer.percentile([90]),
      scale: 10,
      bestEffort: true,
      geometry: AOI,
  }).get('nd'));  
  print('ndvi threshold: '+threshNdvi.getInfo() )
var greenAreas = ndvi.gt(threshNdvi)
Map.addLayer(greenAreas.mask(greenAreas),{palette: ['green']},'Green areas')
// //////////////////EXPORT RESULTS TO GOOGLE DRIVE//////////////////////////////
//Export final flood layer
Export.image.toDrive({
  image: greenAreas.mask(greenAreas),
  description: id + '_GreenSpaces',
  region: AOI,
  scale: 10,
  maxPixels: 1e9
});