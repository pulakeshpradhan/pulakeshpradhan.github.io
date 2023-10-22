var roi = ui.import && ui.import("roi", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                40.26411322089657,
                -1.7036575219216858
              ],
              [
                40.29707220527157,
                -1.4620507086164765
              ],
              [
                39.58556681690403,
                -0.028521186074193856
              ],
              [
                38.56672597068482,
                -0.0010350997778255844
              ],
              [
                39.93452337714657,
                -1.4730334331403718
              ]
            ]
          ],
          "geodesic": true,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#8b257c",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #8b257c */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[40.26411322089657, -1.7036575219216858],
          [40.29707220527157, -1.4620507086164765],
          [39.58556681690403, -0.028521186074193856],
          [38.56672597068482, -0.0010350997778255844],
          [39.93452337714657, -1.4730334331403718]]]),
    table = ui.import && ui.import("table", "table", {
      "id": "users/bonairhassan/urban_clusters"
    }) || ee.FeatureCollection("users/bonairhassan/urban_clusters");
// This is the final copy and paste script from the tutorial
// Load Sentinel-1 C-band SAR Ground Range collection (log scale, VV, descending)
var collectionVV = ee.ImageCollection('COPERNICUS/S1_GRD')
.filter(ee.Filter.eq('instrumentMode', 'IW'))
.filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
.filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'))
.filterMetadata('resolution_meters', 'equals' , 10)
.filterBounds(roi)
.select('VV');
//print(collectionVV, 'Collection VV');
// Load Sentinel-1 C-band SAR Ground Range collection (log scale, VH, descending)
var collectionVH = ee.ImageCollection('COPERNICUS/S1_GRD')
.filter(ee.Filter.eq('instrumentMode', 'IW'))
.filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
.filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'))
.filterMetadata('resolution_meters', 'equals' , 10)
.filterBounds(roi)
.select('VH');
//print(collectionVH, 'Collection VH');
//Filter by date
var beforeVV = collectionVV.filterDate('2021-01-01', '2021-02-12').mosaic();
var afterVV = collectionVV.filterDate('2021-03-23', '2021-04-11').mosaic();
var beforeVH = collectionVH.filterDate('2021-01-01', '2021-02-12').mosaic();
var afterVH = collectionVH.filterDate('2021-03-23', '2021-04-11').mosaic();
//print(beforeVV, 'Before VV');
//print(afterVV, 'After VV');
//print(beforeVH, 'Before VH');
//print(afterVH, 'After VH');
// Display map
Map.centerObject(roi, 9);
//Map.addLayer(beforeVV, {min:-15,max:0}, 'Before flood VV', 0);
//Map.addLayer(afterVV, {min:-15,max:0}, 'After flood VV', 0);
//Map.addLayer(beforeVH, {min:-25,max:0}, 'Before flood VH', 0);
//Map.addLayer(afterVH, {min:-25,max:0}, 'After flood VH', 0);
Map.addLayer(beforeVH.addBands(afterVH).addBands(beforeVH), {min: -25, max: -8},'BVH/AVV/AVH composite', 0);
//Apply filter to reduce speckle
var SMOOTHING_RADIUS = 50;
var beforeVV_filtered = beforeVV.focal_mean(SMOOTHING_RADIUS, 'circle', 'meters');
var beforeVH_filtered = beforeVH.focal_mean(SMOOTHING_RADIUS, 'circle', 'meters');
var afterVV_filtered = afterVV.focal_mean(SMOOTHING_RADIUS, 'circle', 'meters');
var afterVH_filtered = afterVH.focal_mean(SMOOTHING_RADIUS, 'circle', 'meters');
//Display filtered images
Map.addLayer(beforeVV_filtered, {min:-15,max:0}, 'Before Flood VV Filtered',0);
Map.addLayer(afterVV_filtered, {min:-15,max:0}, 'After Flood VV Filtered',0);
Map.addLayer(beforeVH_filtered, {min:-25,max:0}, 'Before Flood VH Filtered',0);
Map.addLayer(afterVH_filtered, {min:-25,max:0}, 'After Flood VH Filtered',0);
// Calculate difference between before and after
var differenceVH= afterVH_filtered.divide(beforeVH_filtered);
Map.addLayer(differenceVH, {min: 0,max:2},'difference VH filtered', 0);
//Apply Threshold
var DIFF_UPPER_THRESHOLD = 1.35;
var differenceVH_thresholded = differenceVH.gt(DIFF_UPPER_THRESHOLD);
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
var dataset = ee.ImageCollection('COPERNICUS/S2_SR')
                  .filterDate('2021-04-01', '2021-04-12').filterBounds(roi)
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',23))
                  .map(maskS2clouds);
//print (dataset)
var visualization = {
  min: 0.0,
  max: 0.3,
  bands: ['B4', 'B3', 'B2'],
};
Map.centerObject(dataset, 12);
//Map.addLayer(dataset.median(), visualization, 'RGB');
// Adding additional vector datasets: 1. TRC Village clusters
var clusters = ee.FeatureCollection(table)
Map.addLayer(clusters,{},'village Clusters')
Map.addLayer(differenceVH_thresholded.updateMask(differenceVH_thresholded),{palette:"0000FF"},'flooded areas - blue',1);