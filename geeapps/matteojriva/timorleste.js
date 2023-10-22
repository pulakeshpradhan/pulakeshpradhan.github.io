var g = ui.import && ui.import("g", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                125.19060006533098,
                -8.036658394981394
              ],
              [
                125.19060006533098,
                -9.52951996707588
              ],
              [
                127.94816842470598,
                -9.52951996707588
              ],
              [
                127.94816842470598,
                -8.036658394981394
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
                125.55171697639598,
                -8.539726680711334
              ],
              [
                125.55171697639598,
                -8.629348442387348
              ],
              [
                125.6245014002241,
                -8.629348442387348
              ],
              [
                125.6245014002241,
                -8.539726680711334
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
      },
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.MultiPolygon(
        [[[[125.19060006533098, -8.036658394981394],
           [125.19060006533098, -9.52951996707588],
           [127.94816842470598, -9.52951996707588],
           [127.94816842470598, -8.036658394981394]]],
         [[[125.55171697639598, -8.539726680711334],
           [125.55171697639598, -8.629348442387348],
           [125.6245014002241, -8.629348442387348],
           [125.6245014002241, -8.539726680711334]]]], null, false),
    lc = ui.import && ui.import("lc", "imageCollection", {
      "id": "COPERNICUS/Landcover/100m/Proba-V/Global"
    }) || ee.ImageCollection("COPERNICUS/Landcover/100m/Proba-V/Global"),
    AOI1_Maloa = ui.import && ui.import("AOI1_Maloa", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                125.54794042610301,
                -8.533954858561287
              ],
              [
                125.54794042610301,
                -8.627651257462933
              ],
              [
                125.6299945642866,
                -8.627651257462933
              ],
              [
                125.6299945642866,
                -8.533954858561287
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
      "color": "#f33700",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #f33700 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[125.54794042610301, -8.533954858561287],
          [125.54794042610301, -8.627651257462933],
          [125.6299945642866, -8.627651257462933],
          [125.6299945642866, -8.533954858561287]]], null, false),
    AOI2_Atauro = ui.import && ui.import("AOI2_Atauro", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                125.4964327384966,
                -8.117433749906763
              ],
              [
                125.4964327384966,
                -8.324028969648825
              ],
              [
                125.65436120529347,
                -8.324028969648825
              ],
              [
                125.65436120529347,
                -8.117433749906763
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
      "color": "#98ff00",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #98ff00 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[125.4964327384966, -8.117433749906763],
          [125.4964327384966, -8.324028969648825],
          [125.65436120529347, -8.324028969648825],
          [125.65436120529347, -8.117433749906763]]], null, false),
    AOI3_CristoRei = ui.import && ui.import("AOI3_CristoRei", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                125.6068912446345,
                -8.518000326849865
              ],
              [
                125.6068912446345,
                -8.540069509577728
              ],
              [
                125.66920432446848,
                -8.540069509577728
              ],
              [
                125.66920432446848,
                -8.518000326849865
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
      "color": "#0b4a8b",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #0b4a8b */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[125.6068912446345, -8.518000326849865],
          [125.6068912446345, -8.540069509577728],
          [125.66920432446848, -8.540069509577728],
          [125.66920432446848, -8.518000326849865]]], null, false),
    dem = ui.import && ui.import("dem", "image", {
      "id": "JAXA/ALOS/AW3D30/V2_2"
    }) || ee.Image("JAXA/ALOS/AW3D30/V2_2"),
    popDens = ui.import && ui.import("popDens", "imageCollection", {
      "id": "CIESIN/GPWv411/GPW_Population_Density"
    }) || ee.ImageCollection("CIESIN/GPWv411/GPW_Population_Density"),
    sent2 = ui.import && ui.import("sent2", "imageCollection", {
      "id": "COPERNICUS/S2"
    }) || ee.ImageCollection("COPERNICUS/S2");
// AOIs
var aoi1= ee.Feature(AOI1_Maloa, {'name': 'Maloa'});
var aoi2= ee.Feature(AOI2_Atauro, {'name': 'Atauro'}); 
var aoi3= ee.Feature(AOI3_CristoRei, {'name': 'Cristo Rei'});
var aoi=ee.FeatureCollection([aoi1, aoi2, aoi3]);
// Land Cover
var clippedLandCov=lc.first().select(0).clip(aoi)
print(clippedLandCov)
//dem
var clippedDem=dem.select(0).clip(aoi)
var maskedDem=clippedDem.selfMask()
print(maskedDem.reduceRegions(aoi, ee.Reducer.max(), 30))
// PopDens
var clippedPopDens_2020 = ee.Image(popDens.toList(10).reverse().get(0)).clip(aoi)
print(clippedPopDens_2020.reduceRegions(aoi, ee.Reducer.max(), 30))
//Sentinel
var filtSent2=sent2.filterBounds(aoi).filterDate("2019-10-01", '2020-03-31').filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'less_than', 0.1)
var lastSent2=filtSent2.qualityMosaic('QA60')
var clippedLastSent2= lastSent2.clip(aoi)
print(filtSent2)
// visualisation and export
Map.addLayer(aoi, {}, 'area of interest')
Map.centerObject(aoi)
Map.addLayer(clippedLandCov,{}, "landCov_100m_2015" )
Map.addLayer(maskedDem, {min:0, max: 1000, palette:['yellow', 'brown', 'green', 'blue']}, 'dem_30m'  )
Map.addLayer(clippedPopDens_2020, {min:0, max:10000, palette: ["white", "purple"]}, "popDensity_1km")
Map.addLayer(clippedLastSent2, {min:500, max:3000, bands:["B4", 'B3', 'B2']}, "Sentinel2")
// Export aois
Export.table.toDrive({
  collection: aoi, 
  description: 'aois-for-TimorEst', 
  folder: 'TimorEst', 
  });
// Export LandCover
Export.image.toDrive({
  image: clippedLandCov, 
  description: "LandCover-COpernicusGlobal_100m", 
  folder: "TimorEst", 
  region: aoi, 
  scale: 20, 
  crs: "EPSG:4326", 
  maxPixels: 10e10, 
  });
// Export DEM
Export.image.toDrive({
  image: maskedDem, 
  description: 'ALOS-DEM_30m', 
  folder: "TimorEst", 
  region: aoi, 
  scale: 30, 
  crs: "EPSG:4326", 
  maxPixels: 10e10, 
  });