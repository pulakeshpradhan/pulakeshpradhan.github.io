var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            30.37274775244733,
            50.749385077902126
          ]
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
    ee.Geometry.Point([30.37274775244733, 50.749385077902126]),
    table = ui.import && ui.import("table", "table", {
      "id": "users/ogordienko112/outshp"
    }) || ee.FeatureCollection("users/ogordienko112/outshp"),
    lake = ui.import && ui.import("lake", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                30.43797907568952,
                50.731134622542136
              ],
              [
                30.43797907568952,
                50.71896370060942
              ],
              [
                30.458578440923894,
                50.71896370060942
              ],
              [
                30.458578440923894,
                50.731134622542136
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
                30.438900255420535,
                50.70030935556233
              ],
              [
                30.438900255420535,
                50.68378004346927
              ],
              [
                30.478039049365847,
                50.68378004346927
              ],
              [
                30.478039049365847,
                50.70030935556233
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
                30.3479300233005,
                50.72922874827274
              ],
              [
                30.3479300233005,
                50.71879629864403
              ],
              [
                30.36234957896456,
                50.71879629864403
              ],
              [
                30.36234957896456,
                50.72922874827274
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
                30.29109132183134,
                50.675955477900004
              ],
              [
                30.29109132183134,
                50.670516024261055
              ],
              [
                30.298472761040323,
                50.670516024261055
              ],
              [
                30.298472761040323,
                50.675955477900004
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
        },
        {
          "type": "rectangle"
        },
        {
          "type": "rectangle"
        }
      ],
      "properties": {
        "class": 1
      },
      "color": "#d63000",
      "mode": "FeatureCollection",
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
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      }
    ] */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[30.43797907568952, 50.731134622542136],
                  [30.43797907568952, 50.71896370060942],
                  [30.458578440923894, 50.71896370060942],
                  [30.458578440923894, 50.731134622542136]]], null, false),
            {
              "class": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[30.438900255420535, 50.70030935556233],
                  [30.438900255420535, 50.68378004346927],
                  [30.478039049365847, 50.68378004346927],
                  [30.478039049365847, 50.70030935556233]]], null, false),
            {
              "class": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[30.3479300233005, 50.72922874827274],
                  [30.3479300233005, 50.71879629864403],
                  [30.36234957896456, 50.71879629864403],
                  [30.36234957896456, 50.72922874827274]]], null, false),
            {
              "class": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[30.29109132183134, 50.675955477900004],
                  [30.29109132183134, 50.670516024261055],
                  [30.298472761040323, 50.670516024261055],
                  [30.298472761040323, 50.675955477900004]]], null, false),
            {
              "class": 1,
              "system:index": "3"
            })]),
    land = ui.import && ui.import("land", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                30.175915025928347,
                50.71626320883838
              ],
              [
                30.175915025928347,
                50.68321000707261
              ],
              [
                30.241832994678347,
                50.68321000707261
              ],
              [
                30.241832994678347,
                50.71626320883838
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
                30.590648912647097,
                50.702348910672264
              ],
              [
                30.590648912647097,
                50.65535766088048
              ],
              [
                30.656566881397097,
                50.65535766088048
              ],
              [
                30.656566881397097,
                50.702348910672264
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
                30.34235109199277,
                50.63149824183414
              ],
              [
                30.34235109199277,
                50.59664188036398
              ],
              [
                30.40277589668027,
                50.59664188036398
              ],
              [
                30.40277589668027,
                50.63149824183414
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
        },
        {
          "type": "rectangle"
        }
      ],
      "properties": {
        "class": 0
      },
      "color": "#98ff00",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #98ff00 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      }
    ] */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[30.175915025928347, 50.71626320883838],
                  [30.175915025928347, 50.68321000707261],
                  [30.241832994678347, 50.68321000707261],
                  [30.241832994678347, 50.71626320883838]]], null, false),
            {
              "class": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[30.590648912647097, 50.702348910672264],
                  [30.590648912647097, 50.65535766088048],
                  [30.656566881397097, 50.65535766088048],
                  [30.656566881397097, 50.702348910672264]]], null, false),
            {
              "class": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[30.34235109199277, 50.63149824183414],
                  [30.34235109199277, 50.59664188036398],
                  [30.40277589668027, 50.59664188036398],
                  [30.40277589668027, 50.63149824183414]]], null, false),
            {
              "class": 0,
              "system:index": "2"
            })]),
    lvl9 = ui.import && ui.import("lvl9", "table", {
      "id": "users/ogordienko112/lvl9"
    }) || ee.FeatureCollection("users/ogordienko112/lvl9"),
    toClip = ui.import && ui.import("toClip", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                30.22222193837998,
                50.770905915824656
              ],
              [
                30.22222193837998,
                50.54302323923978
              ],
              [
                30.544945327051856,
                50.54302323923978
              ],
              [
                30.544945327051856,
                50.770905915824656
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
        [[[30.22222193837998, 50.770905915824656],
          [30.22222193837998, 50.54302323923978],
          [30.544945327051856, 50.54302323923978],
          [30.544945327051856, 50.770905915824656]]], null, false);
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
var calc_MSI = function(image) {
	return image.expression('(B11/B8)', {
		'B11': image.select('B11'), 
		'B8': image.select('B8')
     }).rename('MSI');
};
var dataset = ee.ImageCollection('COPERNICUS/S2_SR')
                  .filterDate('2022-03-16', '2022-03-17')
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',20))
                  .map(maskS2clouds)
                  .filterBounds(geometry)
                  .first();
var datsetM = ee.ImageCollection('COPERNICUS/S2_SR')
                  .filterDate('2022-03-16', '2022-03-17')
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',20))
                  .map(maskS2clouds)
                  .filterBounds(geometry)
var newDataseM = datsetM.median();
var MSI = calc_MSI(newDataseM)
//Map.addLayer(MSI,{min: 0.9481484881426214, max: 1.420013069235574, palette: ['white', 'green']},'MSI_2022_03_16')
print(dataset)
var visualization = {
  min: 0.0,
  max: 0.3,
  bands: ['B8', 'B11', 'B2'], // 8 11 2
};
//Map.setCenter(83.277, 17.7009, 12);
Map.addLayer(dataset, visualization, '2022_03_16-Picture_Irpin',false);
var dataset2 = ee.ImageCollection('COPERNICUS/S2_SR')
                  .filterDate('2021-04-01', '2021-04-30')
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',20))
                  .map(maskS2clouds)
                  .filterBounds(geometry)
                  .first();
var dataset2M = ee.ImageCollection('COPERNICUS/S2_SR')
                  .filterDate('2021-04-01', '2021-04-30')
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',20))
                  .map(maskS2clouds)
                  .filterBounds(geometry);
var newdataset2M = dataset2M.median();
var MSI1 = calc_MSI(newdataset2M)
//Map.addLayer(MSI1,{min: 0.9481484881426214, max: 1.420013069235574, palette: ['white', 'green']},'MSI_2021_04_01')
print(dataset2);
Map.centerObject(geometry,10);
Map.addLayer(dataset2,visualization, '2021_04_10-Picture_irpint',false);
Map.addLayer(lvl9,{},'City',false);
var polygons=lake.merge(land);
var  Bounds = toClip
var start = ee.Date.fromYMD(2022,3,14);
var finish = ee.Date.fromYMD(2022,3,25);
var bands = ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B8A', 'B9', 'B10', 'B11', 'B12'];
var img = ee.ImageCollection('COPERNICUS/S2')
 .filterDate(start, finish)
  .filter(ee.Filter.lt('CLOUD_COVERAGE_ASSESSMENT',10))
var image = ee.Image(img.filterBounds(Bounds).sort('CLOUD_COVER',true).min());
var visParams = {
  bands: ['B4','B3','B2'],
  gamma: 2,
  min: 300,
  max: 5000
  };
Map.addLayer(image.clip(Bounds),visParams,'Image',false);
//Map.addLayer(Bounds,{},'Bounds',false);
var bands = ['B1','B2','B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B8A', 'B9','B10', 'B11', 'B12']  
var image = image.select(bands);
var polygons = polygons;
var training = image.sampleRegions({
   collection: polygons,
   properties: ['class'],
   scale: 30
});
var classifier = ee.Classifier.smileRandomForest({
    numberOfTrees: 30,
});
var trained = classifier.train(training, 'class', bands);
var classified = image.classify(trained);
var palette = [
  '#8d5524', 
  '00aedb'  
 ];
Map.addLayer(classified.clip(Bounds),{min: 0, max: 1, palette: palette},'Classified');
var zones = classified.gt(0.9);
var zones2 = zones.updateMask(zones);
Map.addLayer(zones2.clip(Bounds),{},'Mask');
// var vectors = zones2.reduceToVectors({
//   geometry: Bounds,
//   crs: zones2.projection(),
//   scale: 10,
//   geometryType: 'polygon',
//   eightConnected: false,
//   labelProperty: 'class'
// // reducer: ee.Reducer.mean()
// });
// Map.addLayer(vectors);
// порахувати msi swir/nir b11/b8
// Оля