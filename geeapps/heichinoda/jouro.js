var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            137.2056226348877,
            35.90630389527176
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#00ffff",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #00ffff */ee.Geometry.Point([137.2056226348877, 35.90630389527176]);
var s2 = ee.ImageCollection("COPERNICUS/S2")
var visparam_ndvi = ['FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718',
               '74A901', '66A000', '529400', '3E8601', '207401', '056201',
               '004C00', '023B01', '012E01', '011D01', '011301'];
var visparam_diff = ['FFFFFF', 'FF0000'];
// Define the boundary of operation.
var area = ee.Geometry.Rectangle(
    [
      137.20,
      35.90,
      137.22,
      35.91
    ]
);
// Get images after the disaster.
var s2_af = ee.ImageCollection(s2
  .filterBounds(area)
  .filterDate('2018-07-09', '2018-10-31')
  .filterMetadata("CLOUDY_PIXEL_PERCENTAGE","not_greater_than",5)
);
// Create an image collection without clouds.
var s2_nc = ee.ImageCollection(s2
  .filterBounds(area)
  .filterDate('2018-04-01', '2018-06-28')
  .filterMetadata("CLOUDY_PIXEL_PERCENTAGE","not_greater_than",5)
);
// Create a simple composit image by median.
var s2_af_sc = s2_af.reduce(ee.Reducer.median()).clip(area);
var s2_nc_sc = s2_nc.reduce(ee.Reducer.median()).clip(area);
// NDVI 
var s2_af_sc_ndvi = s2_af_sc.normalizedDifference(['B8_median', 'B4_median']);
var s2_nc_sc_ndvi = s2_nc_sc.normalizedDifference(['B8_median', 'B4_median']);
// Compare the normal condition and damaged condition.
var diff_ndvi = s2_af_sc_ndvi.subtract(s2_nc_sc_ndvi);
// Calculate the standard deviation for differences.
var diff_ndvi_sd = ee.Number(
  diff_ndvi.reduceRegion({
    reducer: ee.Reducer.stdDev(),
    geometry: area,
    scale: 10,
  }).get("nd")
);
// Caclulate the mean value for differences.
var diff_ndvi_mean = ee.Number(
  diff_ndvi.reduceRegion({
    reducer: ee.Reducer.mean(),
    geometry: area,
    scale: 10,
  }).get("nd")
);
// Determine the threshold by -2 sigma.
var thresh = diff_ndvi_mean.subtract(diff_ndvi_sd.multiply(2));
// Get a binary image which values are 1 if the original values are less than the threshold. 
var result = diff_ndvi.lt(thresh);
// Move to the area.
Map.centerObject(area);
// Add objects to the layer.
Map.addLayer(s2_af_sc, {min: 0, max: 2000, bands: ["B4_median","B3_median","B2_median"]}, 'After');
Map.addLayer(s2_nc_sc, {min: 0, max: 2000, bands: ["B4_median","B3_median","B2_median"]}, 'Before');
Map.addLayer(s2_af_sc_ndvi, {min: 0, max: 1, palette: visparam_ndvi}, 'NDVI_After');
Map.addLayer(s2_nc_sc_ndvi, {min: 0, max: 1, palette: visparam_ndvi}, 'NDVI_Before');
Map.addLayer(result, {min: 0, max: 1, palette: visparam_diff}, 'Subtruct');
// Export the result to Google Drive.
//Export.image.toDrive({
//  image: result,
//  description: 'landslide area extraction',
//  fileNamePrefix: 'result',
//  region: area,
//  scale: 10,
//  crs: 'EPSG:3857'
//});