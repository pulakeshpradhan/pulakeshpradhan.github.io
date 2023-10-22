var imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "B8",
          "B4",
          "B2"
        ],
        "max": 0.3,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["B8","B4","B2"],"max":0.3,"gamma":1},
    imageVisParam2 = ui.import && ui.import("imageVisParam2", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "B4",
          "B3",
          "B2"
        ],
        "max": 0.3,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["B4","B3","B2"],"max":0.3,"gamma":1},
    imageVisParam3 = ui.import && ui.import("imageVisParam3", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "B4",
          "B3",
          "B2"
        ],
        "max": 0.3,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["B4","B3","B2"],"max":0.3,"gamma":1},
    s = ui.import && ui.import("s", "table", {
      "id": "users/montfortfrederique/Gile"
    }) || ee.FeatureCollection("users/montfortfrederique/Gile");
// SCRIPT COMPOSITE SENTINEL 2
// Script exemple Google Earth Engine adapté par Clovis Grinand
// This example uses the Sentinel-2 QA band to cloud mask the collection.  
// The Sentinel-2 cloud flags are less selective, so the collection is also pre-filtered by the
// CLOUDY_PIXEL_PERCENTAGE flag, to use only relatively cloud-free granule.
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
    .filterDate('2019-06-01', '2019-06-30')
    // Pre-filter to get less cloudy granules.
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 25))
    .filterBounds(s)
    .map(maskS2clouds)
print('collection:', collection);
var composite = collection.select(
  ['B2','B3','B4','B8','B11','B12'])
  .median()
  .clip(s);
// Display the results.
Map.centerObject(s);
Map.addLayer(s, null, "Study Area",true);
Map.centerObject(s, 9);
Map.addLayer(composite, {bands: ['B11', 'B4', 'B3'], min: 0, max: 0.3}, 'RGB')
Export.image.toDrive ({image:composite, scale: 10, crs: 'EPSG:32737', region:s.geometry().bounds(), maxPixels:10000000000000, description: 'Gile_juin_2019'});