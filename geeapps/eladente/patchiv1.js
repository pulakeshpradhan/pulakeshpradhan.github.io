var area = ui.import && ui.import("area", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                29.49987439002739,
                37.5141644715421
              ],
              [
                29.49987439002739,
                27.586024953543824
              ],
              [
                42.44190765640693,
                27.586024953543824
              ],
              [
                42.44190765640693,
                37.5141644715421
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
        [[[29.49987439002739, 37.5141644715421],
          [29.49987439002739, 27.586024953543824],
          [42.44190765640693, 27.586024953543824],
          [42.44190765640693, 37.5141644715421]]], null, false),
    imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "B3",
          "B3",
          "B3"
        ],
        "max": 30,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["B3","B3","B3"],"max":30,"gamma":1},
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                35.16801545624606,
                31.765862963428237
              ],
              [
                35.16801545624606,
                31.761575652797603
              ],
              [
                35.17219970230929,
                31.761575652797603
              ],
              [
                35.17219970230929,
                31.765862963428237
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        },
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                35.18093297486178,
                31.765862963428237
              ],
              [
                35.18093297486178,
                31.761557408498163
              ],
              [
                35.18524596695773,
                31.761557408498163
              ],
              [
                35.18524596695773,
                31.765862963428237
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
        },
        {
          "type": "rectangle"
        }
      ],
      "properties": {},
      "color": "#1146d6",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #1146d6 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.MultiPolygon(
        [[[[35.16801545624606, 31.765862963428237],
           [35.16801545624606, 31.761575652797603],
           [35.17219970230929, 31.761575652797603],
           [35.17219970230929, 31.765862963428237]]],
         [[[35.18093297486178, 31.765862963428237],
           [35.18093297486178, 31.761557408498163],
           [35.18524596695773, 31.761557408498163],
           [35.18524596695773, 31.765862963428237]]]], null, false),
    LPI_org = ui.import && ui.import("LPI_org", "image", {
      "id": "users/eladente/LPI_MosaicLevant_July_2017_16_16"
    }) || ee.Image("users/eladente/LPI_MosaicLevant_July_2017_16_16"),
    imageVisParam2 = ui.import && ui.import("imageVisParam2", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "scale"
        ],
        "min": -0.5,
        "max": 0.5,
        "palette": [
          "ff0000",
          "ffffff",
          "4b00ff"
        ]
      }
    }) || {"opacity":1,"bands":["scale"],"min":-0.5,"max":0.5,"palette":["ff0000","ffffff","4b00ff"]},
    imageVisParam3 = ui.import && ui.import("imageVisParam3", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "scale"
        ],
        "min": -0.5,
        "max": 0.5,
        "palette": [
          "ff0000",
          "ffffff",
          "0e0aff"
        ]
      }
    }) || {"opacity":1,"bands":["scale"],"min":-0.5,"max":0.5,"palette":["ff0000","ffffff","0e0aff"]},
    imageVisParam4 = ui.import && ui.import("imageVisParam4", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "scale"
        ],
        "min": -1,
        "palette": [
          "ff0000",
          "ffffff",
          "0630ff"
        ]
      }
    }) || {"opacity":1,"bands":["scale"],"min":-1,"palette":["ff0000","ffffff","0630ff"]};
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
// Load a MODIS EVI image.
var modis = ee.Image(ee.ImageCollection('MODIS/006/MOD13A1').first())
    .select('EVI');
// Get information about the MODIS projection.
var modisProjection = modis.projection();
print('MODIS projection:', modisProjection);
////////////////////////////////////////////////////////////////////
// Define a region.
var AOI = area;
// Load input Landsat8 imagery and build a mosaic.
var LS8Collection = ee.ImageCollection("LANDSAT/LC08/C01/T1_SR")
  // .filterBounds(AOI)
  .filterDate('2017-07-29', '2017-08-03')
  // .map(maskL8sr);
var LS8mosaic = LS8Collection.mosaic();
// Green Band of LS8.
var LS8green = LS8mosaic.select('B3');
var LS8greenProjection = LS8green.projection();
print('LS8green projection:', LS8greenProjection);
var LS8greenProjection = LS8green.projection();
print('LS8green projection:', LS8greenProjection); 
var crs = LS8greenProjection
//VIIRS
var VIIRS = ee.ImageCollection('NOAA/VIIRS/DNB/MONTHLY_V1/VCMSLCFG')
                  .filter(ee.Filter.date('2017-05-01', '2017-05-31'))
                  .filterBounds(AOI)
                  .select('avg_rad');
var nighttime = VIIRS.select('avg_rad');
var nighttimeVis = {min: 0.0, max: 70.0};
var VIIRSProjection = ee.Image(VIIRS.first()).projection();
print('VIIRS projection:', VIIRSProjection);
var water = ee.Image("JRC/GSW1_2/GlobalSurfaceWater")
                  // .filterBounds(AOI)
                  .select('max_extent')
                  .eq(0)
                  .reproject({
                    crs: crs,
                    crsTransform: null,
                    scale: 30
                  });
// proj                  
var crs = LS8greenProjection
//masking
var VIIRS30 = ee.Image(VIIRS.first().select('avg_rad')).gt(10);
var VIIRS30mask = VIIRS30.updateMask(VIIRS30);
var LS8green = LS8green.updateMask(water)
// var LS8greenSD = LS8greenSD.updateMask(VIIRS30);
/// Gabriel LPI
// var LPI_orig= ee.Image(LPI_orig)
var LPI_org = LPI_org
    // Force the next reprojection to aggregate instead of resampling.
    .reproject({
      crs: crs,
      crsTransform: null,
      scale: 480
    })
Map.addLayer( LPI_org,
  {min: -2, max: 0, bands: ['b1', 'b1', 'b1']}, 'LPI_Org');
// var over scales
var LS8green480 = LS8green
    // Force the next reprojection to aggregate instead of resampling.
    .reproject({
      crs: crs,
      crsTransform: null,
      scale: 30
    })
    .reduceResolution({
      reducer: ee.Reducer.variance(),
      maxPixels: (16*16)
    })
    .reproject({
      crs: crs,
      crsTransform: null,
      scale: 480
    });
var LS8green480lg = LS8green480.log()
var LS8green480lg= LS8green480lg.addBands(ee.Image(480).toDouble().log());
var LS8green240 = LS8green
    // Force the next reprojection to aggregate instead of resampling.
    .reproject({
      crs: crs,
      crsTransform: null,
      scale: 30
    })
    .reduceResolution({
      reducer: ee.Reducer.variance(),
      maxPixels: (8*8)
    })
        .reproject({
      crs: crs,
      crsTransform: null,
      scale: 240
    });   
var LS8green240mean = LS8green240
    // Force the next reprojection to aggregate instead of resampling.
    .reproject({
      crs: crs,
      crsTransform: null,
      scale: 240
    })
    .reduceResolution({
      reducer: ee.Reducer.mean(),
      maxPixels: (2*2)
    })
    .reproject({
      crs: crs,
      crsTransform: null,
      scale: 480
    });   
var LS8green240lg = LS8green240mean.log()
var LS8green240lg= LS8green240lg.addBands(ee.Image(240).toDouble().log());
var LS8green120 = LS8green
    // Force the next reprojection to aggregate instead of resampling.
    .reproject({
      crs: crs,
      crsTransform: null,
      scale: 30
    })
    .reduceResolution({
      reducer: ee.Reducer.variance(),
      maxPixels: (4*4)
    })
    .reproject({
      crs: crs,
      crsTransform: null,
      scale: 120
    });   
var LS8green120mean = LS8green120
    // Force the next reprojection to aggregate instead of resampling.
    .reproject({
      crs: crs,
      crsTransform: null,
      scale: 120
    })
    .reduceResolution({
      reducer: ee.Reducer.mean(),
      maxPixels: (4*4)
    })
    .reproject({
      crs: crs,
      crsTransform: null,
      scale: 480
    });   
var LS8green120lg = LS8green120mean.log();
var LS8green120lg= LS8green120lg.addBands(ee.Image(120).toDouble().log());
var LS8green60 = LS8green
    // Force the next reprojection to aggregate instead of resampling.
    .reproject({
      crs: crs,
      crsTransform: null,
      scale: 30
    })
    .reduceResolution({
      reducer: ee.Reducer.variance(),
      maxPixels: (2*2)
    })
    .reproject({
      crs: crs,
      crsTransform: null,
      scale: 60
    });   
var LS8green60mean = LS8green60
    // Force the next reprojection to aggregate instead of resampling.
    .reproject({
      crs: crs,
      crsTransform: null,
      scale: 60
    })
    .reduceResolution({
      reducer: ee.Reducer.mean(),
      maxPixels: (8*8)
    })
    .reproject({
      crs: crs,
      crsTransform: null,
      scale: 480
    });   
var LS8green60lg = LS8green60mean.log();
var LS8green60lg= LS8green60lg.addBands(ee.Image(60).toDouble().log());
var VarCollection = ee.ImageCollection.fromImages(
  [ee.Image(LS8green60lg), ee.Image(LS8green120lg), ee.Image(LS8green240lg), ee.Image(LS8green480lg)]);
print('collectionFromImages: ', VarCollection);
// Reduce the collection with the linear fit reducer.
// Independent variable are followed by dependent variables.
var linearFit = VarCollection.select(['constant', 'B3'])
  .reduce(ee.Reducer.linearFit());
// var linearFit =linearFit *-1
print('linearRegression', linearFit);
var linearFitM = linearFit.expression(
    'scale * -1', {
      'scale': linearFit.select('scale')
});
var LPI_Diff = linearFitM.subtract(LPI_org)
var LPI_Diffmask =LPI_Diff.gt(0.3).or(LPI_Diff.lt(-0.3))
var LPI_Diff = LPI_Diff.updateMask(LPI_Diffmask);
// Display the results.
Map.addLayer((linearFitM),
  {min: -2, max: 0, bands: (['scale'])}, 'LPI_new');
Map.addLayer((LPI_Diff), imageVisParam4, 'LPI_Diff');  
// var linearRegression = VarCollection.reduce(
//   ee.Reducer.linearRegression({
//     numX: 1,
//     numY: 1
// }));
// print('linearRegression', linearRegression);
// var scale = linearRegression.select(['coefficients']).arrayGet([-1, -1])
// print('scale', scale);
// var bandNames = [['constant'], // 0-axis variation.
//                 ['B3']]; // 1-axis variation
// var LR_coef = linearRegression.select(['coefficients']).arrayFlatten(bandNames);
// print('LR_coef', LR_coef);
// // var b1 = ee.List(LR_coef.get(1)).get(0); // slope
// // var LR_scale= LR_coef.arrayGet(1); // slope
// // var LR_off= LR_coef.arrayGet(0); // slope
// // print('LR_scale', LR_scale);
// // print('LR_off', LR_off);
// // var LR_scaleAr= LR_coef.toArray(0);
// Map.addLayer(scale, {min: 0, max: 3,}, 'scale');
// Display the results.
var visParams = {
  bands: ['B4', 'B3', 'B2'],
  min: 0,
  max: 3000,
  gamma: 1.4,
};    
// Map.addLayer(nighttime, nighttimeVis, 'Nighttime');
Map.centerObject(AOI, 9);
Map.addLayer(LS8mosaic, visParams, 'LS8mosaic input imagery');
// Map.addLayer(LS8mosaic, visParams, 'true-color composite');
// Map.addLayer(LS8green, {min: 0, max: 3000, palette: ['FF0000', '00FF00',]}, 'LS8 green');
// Map.addLayer(LS8green480, {min: 0, max: 300000}, 'variance of green 480m');
// Map.addLayer(LS8green240, {min: 0, max: 300000}, 'variance of green 240m');
// Map.addLayer(LS8green120, {min: 0, max: 300000}, 'variance of green 120m');
// Map.addLayer(LS8green60, {min: 0, max: 300000}, 'variance of green 60m');
// Map.addLayer(LS8green240mean, {min: 0, max: 300000}, 'variance of green 240m mean');
// Map.addLayer(LS8green120mean, {min: 0, max: 300000}, 'variance of green 120m mean');
// Map.addLayer(LS8green60mean, {min: 0, max: 300000}, 'variance of green 60m mean');
// Map.addLayer(LS8green480lg, {min: 0, max: 30, bands: ['B3']}, 'variance of green 480m log');
// Map.addLayer(LS8green240lg, {min: 0, max: 30, bands: ['B3']}, 'variance of green 240m log');
// Map.addLayer(LS8green120lg, {min: 0, max: 30, bands: ['B3']}, 'variance of green 120m log');
// Map.addLayer(LS8green60lg, {min: 0, max: 30, bands: ['B3']}, 'variance of green 60m log');
// Map.addLayer(LS8greenSD, {min: 0, max: 15}, 'SD of green r=1cell');
// Map.addLayer(LS8greenSDMean, {min: 0, max: 10, palette: ['00FF00','FF0000']}, 'SD of green 480m');