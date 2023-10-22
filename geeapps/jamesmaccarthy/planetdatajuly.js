var imageCollection = ui.import && ui.import("imageCollection", "imageCollection", {
      "id": "projects/anika-alert-drivers/assets/planet_test"
    }) || ee.ImageCollection("projects/anika-alert-drivers/assets/planet_test"),
    imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "B3",
          "B2",
          "B1"
        ],
        "min": 336,
        "max": 1427,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["B3","B2","B1"],"min":336,"max":1427,"gamma":1},
    viz_normalized = ui.import && ui.import("viz_normalized", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "B3",
          "B2",
          "B1"
        ],
        "min": 0.013376451565485815,
        "max": 0.30331510594668487,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["B3","B2","B1"],"min":0.013376451565485815,"max":0.30331510594668487,"gamma":1},
    viz_standardized = ui.import && ui.import("viz_standardized", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "B3",
          "B2",
          "B1"
        ],
        "min": -2.342195376975806,
        "max": 7.459466274640194,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["B3","B2","B1"],"min":-2.342195376975806,"max":7.459466274640194,"gamma":1},
    table = ui.import && ui.import("table", "table", {
      "id": "users/jamesmaccarthy/drivers_indonesia/s2_footprint_final"
    }) || ee.FeatureCollection("users/jamesmaccarthy/drivers_indonesia/s2_footprint_final");
// set map center and zoom level
Map.setCenter(110.5184, -0.6345, 13)
var aoi = ee.FeatureCollection(table)
            .filter(ee.Filter.eq('Name', '49MDV'))
// Create composite of planet imagery using the median value
var planet_composite = imageCollection.median()
// cycle through image collection and build cloud mask (permanent solution)
var mask = ''
// create cloud mask (temporary solution)
// select cloud map layer
var clouds = imageCollection.mean().select('Q6')
var mask_clouds = clouds.mask(clouds.gt(0))
// create light haze mask (temporary solution)
// select light haze layer
var lhaze = imageCollection.mean().select('Q4')
var mask_lhaze = lhaze.mask(lhaze.gt(0))
var image = ee.Image(planet_composite)
print(image)
print(imageCollection)
// var boundary = ee.FeatureCollection('users/jamesmaccarthy/drivers_indonesia/s2_footprint_final')
// var geometry = boundary.geometry()
// function normalize(image){
//   var bandNames = image.bandNames();
//   // Compute min and max of the image
//   var minDict = image.reduceRegion({
//     reducer: ee.Reducer.min(),
//     geometry: geometry,
//     scale: 20,
//     maxPixels: 1e9,
//     bestEffort: true,
//     tileScale: 16
//   });
//   var maxDict = image.reduceRegion({
//     reducer: ee.Reducer.max(),
//     geometry: geometry,
//     scale: 20,
//     maxPixels: 1e9,
//     bestEffort: true,
//     tileScale: 16
//   });
//   var mins = ee.Image.constant(minDict.values(bandNames));
//   var maxs = ee.Image.constant(maxDict.values(bandNames));
//   var normalized = image.subtract(mins).divide(maxs.subtract(mins))
//   return normalized
// }
// var image_normalized = normalize(image)
// function standardize(image){
//   var bandNames = image.bandNames();
//   // Mean center the data to enable a faster covariance reducer
//   // and an SD stretch of the principal components.
//   var meanDict = image.reduceRegion({
//     reducer: ee.Reducer.mean(),
//     geometry: geometry,
//     scale: 20,
//     maxPixels: 1e9,
//     bestEffort: true,
//     tileScale: 16
//   });
//   var means = ee.Image.constant(meanDict.values(bandNames));
//   var centered = image.subtract(means)
//   var stdDevDict = image.reduceRegion({
//     reducer: ee.Reducer.stdDev(),
//     geometry: geometry,
//     scale: 20,
//     maxPixels: 1e9,
//     bestEffort: true,
//     tileScale: 16
//   });
//   var stddevs = ee.Image.constant(stdDevDict.values(bandNames));
//   var standardized = centered.divide(stddevs);
//   return standardized
// }
// var image_standardized = standardize(image)
// load glad alerts
var gladalerts = ee.ImageCollection('projects/glad/alert/UpdResult')
                    .filterDate('2021-07-01', '2021-07-31')
var gladalerts = gladalerts.map(
  function(img){
    var pix = img.select('alertDate21');
    return pix.updateMask(pix.gt(0));
  }
);
print(gladalerts)
var merged = gladalerts.mosaic()
// add map layers
// Map.addLayer(image_standardized, viz_standardized, 'standardized planet')
// Map.addLayer(image_normalized, viz_normalized, 'normalized planet')
Map.addLayer(planet_composite, imageVisParam, 'planet (median composite)')
Map.addLayer(mask_lhaze, {palette:'yellow'}, 'light haze mask (temp)', false)
Map.addLayer(mask_clouds, {palette:'pink'}, 'cloud mask (temp)')
Map.addLayer(merged.clip(aoi.geometry()), {palette:'red'}, 'glad_alerts', null, 0.5)
var vis_params = {
    'color': 'cyan', 
    'width': 2,
    'lineType': 'solid',
    'fillColor': '00000000',
}
Map.addLayer(aoi.style(vis_params), null, 'aoi')