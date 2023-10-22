var imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "VH"
        ],
        "min": -25,
        "max": 0,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["VH"],"min":-25,"max":0,"gamma":1},
    roi = ui.import && ui.import("roi", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                36.00632059499066,
                -0.2686127565202647
              ],
              [
                36.00082743092816,
                -0.48558790777312993
              ],
              [
                36.19034159108441,
                -0.48421466593786444
              ],
              [
                36.18622171803754,
                -0.26998603236684254
              ],
              [
                36.04477274342816,
                -0.26998603236684254
              ]
            ]
          ],
          "geodesic": true,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[36.00632059499066, -0.2686127565202647],
          [36.00082743092816, -0.48558790777312993],
          [36.19034159108441, -0.48421466593786444],
          [36.18622171803754, -0.26998603236684254],
          [36.04477274342816, -0.26998603236684254]]]);
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
var beforeVV = collectionVV.filterDate('2020-02-1', '2020-02-24').mosaic();
var afterVV = collectionVV.filterDate('2020-09-1', '2020-9-28').mosaic();
var beforeVH = collectionVH.filterDate('2020-02-1', '2020-02-24').mosaic();
var afterVH = collectionVH.filterDate('2020-09-1', '2020-9-28').mosaic();
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
Map.addLayer(differenceVH_thresholded.updateMask(differenceVH_thresholded),{palette:"0000FF"},'flooded areas - blue',1);