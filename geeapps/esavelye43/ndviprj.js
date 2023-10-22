var Bounds = ui.import && ui.import("Bounds", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                96.48193359375,
                72.65958846878621
              ],
              [
                96.13037109375,
                71.30079291637452
              ],
              [
                98.41809151958319,
                71.28725578372836
              ],
              [
                100.87646484375,
                71.27259471233448
              ],
              [
                101.14013671875,
                72.67268149675316
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#00ffff",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #00ffff */ee.Geometry.Polygon(
        [[[96.48193359375, 72.65958846878621],
          [96.13037109375, 71.30079291637452],
          [98.41809151958319, 71.28725578372836],
          [100.87646484375, 71.27259471233448],
          [101.14013671875, 72.67268149675316]]]),
    imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "NDVI"
        ],
        "min": -0.6637395670637488,
        "max": -0.09261505361646415,
        "palette": [
          "fff81d",
          "3bd61f"
        ]
      }
    }) || {"opacity":1,"bands":["NDVI"],"min":-0.6637395670637488,"max":-0.09261505361646415,"palette":["fff81d","3bd61f"]},
    imageVisParam2 = ui.import && ui.import("imageVisParam2", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "NDVI"
        ],
        "min": -0.5980840060859919,
        "max": -0.08620435036718846,
        "palette": [
          "fff81d",
          "3bd61f",
          "208559"
        ]
      }
    }) || {"opacity":1,"bands":["NDVI"],"min":-0.5980840060859919,"max":-0.08620435036718846,"palette":["fff81d","3bd61f","208559"]},
    imageVisParam3 = ui.import && ui.import("imageVisParam3", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "NDVI"
        ],
        "min": -0.19918118329140727,
        "max": 0.3829391572124588,
        "palette": [
          "1123ff",
          "3bd61f",
          "208559"
        ]
      }
    }) || {"opacity":1,"bands":["NDVI"],"min":-0.19918118329140727,"max":0.3829391572124588,"palette":["1123ff","3bd61f","208559"]},
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.MultiPoint(),
    geometry2 = ui.import && ui.import("geometry2", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            62.48120909533918,
            39.94314531514427
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            62.549530323366525,
            39.97235642352448
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#98ff00",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #98ff00 */ee.Geometry.MultiPoint(
        [[62.48120909533918, 39.94314531514427],
         [62.549530323366525, 39.97235642352448]]),
    ls5TOA = ui.import && ui.import("ls5TOA", "imageCollection", {
      "id": "LANDSAT/LT05/C01/T1_TOA"
    }) || ee.ImageCollection("LANDSAT/LT05/C01/T1_TOA"),
    imageVisParam4 = ui.import && ui.import("imageVisParam4", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "B3",
          "B2",
          "B1"
        ],
        "min": 0.11564180925488472,
        "max": 0.30654355958104135,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["B3","B2","B1"],"min":0.11564180925488472,"max":0.30654355958104135,"gamma":1},
    imageCollection = ui.import && ui.import("imageCollection", "imageCollection", {
      "id": "LANDSAT/LC08/C01/T1_RT_TOA"
    }) || ee.ImageCollection("LANDSAT/LC08/C01/T1_RT_TOA"),
    L15 = ui.import && ui.import("L15", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "B3",
          "B2",
          "B1"
        ],
        "min": 0.07688283345343074,
        "max": 0.21964119886895228,
        "gamma": 2
      }
    }) || {"opacity":1,"bands":["B3","B2","B1"],"min":0.07688283345343074,"max":0.21964119886895228,"gamma":2},
    L2005 = ui.import && ui.import("L2005", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "B3",
          "B2",
          "B1"
        ],
        "min": 0.03825215483150446,
        "max": 0.25711349632018193,
        "gamma": 2
      }
    }) || {"opacity":1,"bands":["B3","B2","B1"],"min":0.03825215483150446,"max":0.25711349632018193,"gamma":2},
    L1990 = ui.import && ui.import("L1990", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "B3",
          "B2",
          "B1"
        ],
        "min": 0.11564180925488472,
        "max": 0.30654355958104135,
        "gamma": 1.7750000000000001
      }
    }) || {"opacity":1,"bands":["B3","B2","B1"],"min":0.11564180925488472,"max":0.30654355958104135,"gamma":1.7750000000000001},
    point = ui.import && ui.import("point", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            63.81405650260581,
            38.96018732361036
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Point([63.81405650260581, 38.96018732361036]),
    point1 = ui.import && ui.import("point1", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            64.71493540885581,
            38.16990127571026
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#98ff00",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #98ff00 */ee.Geometry.Point([64.71493540885581, 38.16990127571026]),
    aoi_NDVI = ui.import && ui.import("aoi_NDVI", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                62.87060557487143,
                39.60222726893298
              ],
              [
                62.87060557487143,
                39.565183696773545
              ],
              [
                62.93652354362143,
                39.565183696773545
              ],
              [
                62.93652354362143,
                39.60222726893298
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
      "shown": true,
      "locked": false
    }) || 
    /* color: #0b4a8b */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[62.87060557487143, 39.60222726893298],
          [62.87060557487143, 39.565183696773545],
          [62.93652354362143, 39.565183696773545],
          [62.93652354362143, 39.60222726893298]]], null, false),
    kunduz = ui.import && ui.import("kunduz", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                68.75895568708802,
                37.18670255208873
              ],
              [
                68.67106506208802,
                37.18670255208873
              ],
              [
                68.62162658552552,
                37.134169414277935
              ],
              [
                68.64359924177552,
                36.97635108590677
              ],
              [
                68.63261291365052,
                36.870956628853506
              ],
              [
                68.62711974958802,
                36.580371546585454
              ],
              [
                68.60514709333802,
                36.315250520292565
              ],
              [
                68.59965392927552,
                36.093625102111176
              ],
              [
                68.73698303083802,
                35.969241002771994
              ],
              [
                68.92924377302552,
                36.049224758364446
              ],
              [
                69.01164123396302,
                36.18678420570906
              ],
              [
                69.09403869490052,
                36.39488194449652
              ],
              [
                69.11051818708802,
                36.61565251931463
              ],
              [
                69.10502502302552,
                36.8357927777245
              ],
              [
                69.05009338240052,
                37.037763880653905
              ],
              [
                68.95670959333802,
                37.129790005033435
              ],
              [
                68.80839416365052,
                37.19545452527396
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#98ff00",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #98ff00 */ee.Geometry.Polygon(
        [[[68.75895568708802, 37.18670255208873],
          [68.67106506208802, 37.18670255208873],
          [68.62162658552552, 37.134169414277935],
          [68.64359924177552, 36.97635108590677],
          [68.63261291365052, 36.870956628853506],
          [68.62711974958802, 36.580371546585454],
          [68.60514709333802, 36.315250520292565],
          [68.59965392927552, 36.093625102111176],
          [68.73698303083802, 35.969241002771994],
          [68.92924377302552, 36.049224758364446],
          [69.01164123396302, 36.18678420570906],
          [69.09403869490052, 36.39488194449652],
          [69.11051818708802, 36.61565251931463],
          [69.10502502302552, 36.8357927777245],
          [69.05009338240052, 37.037763880653905],
          [68.95670959333802, 37.129790005033435],
          [68.80839416365052, 37.19545452527396]]]),
    kafernegon = ui.import && ui.import("kafernegon", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                68.91021268655061,
                38.75664000887731
              ],
              [
                68.85528104592561,
                38.81658569843506
              ],
              [
                68.77837674905061,
                38.8123055350907
              ],
              [
                68.68499295998811,
                38.77805496960255
              ],
              [
                68.64654081155061,
                38.69664392840652
              ],
              [
                68.58611600686311,
                38.50775702672077
              ],
              [
                68.52569120217561,
                38.270949919404316
              ],
              [
                68.41033475686311,
                37.87744131864376
              ],
              [
                68.33343045998811,
                37.59942166324799
              ],
              [
                68.27849881936311,
                37.31599061567981
              ],
              [
                68.22906034280061,
                37.19356648232723
              ],
              [
                68.28948514748811,
                37.09723659510852
              ],
              [
                68.49822538186311,
                37.141038116637496
              ],
              [
                68.58611600686311,
                37.3596652898077
              ],
              [
                68.72344510842561,
                37.74724961310319
              ],
              [
                68.85528104592561,
                38.19759819477763
              ],
              [
                68.91021268655061,
                38.50775702672077
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#6f258b",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #6f258b */ee.Geometry.Polygon(
        [[[68.91021268655061, 38.75664000887731],
          [68.85528104592561, 38.81658569843506],
          [68.77837674905061, 38.8123055350907],
          [68.68499295998811, 38.77805496960255],
          [68.64654081155061, 38.69664392840652],
          [68.58611600686311, 38.50775702672077],
          [68.52569120217561, 38.270949919404316],
          [68.41033475686311, 37.87744131864376],
          [68.33343045998811, 37.59942166324799],
          [68.27849881936311, 37.31599061567981],
          [68.22906034280061, 37.19356648232723],
          [68.28948514748811, 37.09723659510852],
          [68.49822538186311, 37.141038116637496],
          [68.58611600686311, 37.3596652898077],
          [68.72344510842561, 37.74724961310319],
          [68.85528104592561, 38.19759819477763],
          [68.91021268655061, 38.50775702672077]]]),
    amu_darya = ui.import && ui.import("amu_darya", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                66.6030794245662,
                37.26354749159663
              ],
              [
                66.8337923151912,
                37.21544252405312
              ],
              [
                67.0260530573787,
                37.141038116637496
              ],
              [
                67.2347932917537,
                37.092855049243305
              ],
              [
                67.4215608698787,
                37.101617887604355
              ],
              [
                67.6138216120662,
                37.12352054915921
              ],
              [
                67.7621370417537,
                37.176061083917666
              ],
              [
                67.8005891901912,
                37.23731222420026
              ],
              [
                67.65150965574549,
                37.311621751588575
              ],
              [
                67.34938563230799,
                37.372762739220924
              ],
              [
                67.08022059324549,
                37.43821568419311
              ],
              [
                66.86598719480799,
                37.46002062401087
              ],
              [
                66.69020594480799,
                37.45566014452018
              ],
              [
                66.57484949949549,
                37.42949192875727
              ],
              [
                66.49794520262049,
                37.36839717678323
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#ffc82d",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #ffc82d */ee.Geometry.Polygon(
        [[[66.6030794245662, 37.26354749159663],
          [66.8337923151912, 37.21544252405312],
          [67.0260530573787, 37.141038116637496],
          [67.2347932917537, 37.092855049243305],
          [67.4215608698787, 37.101617887604355],
          [67.6138216120662, 37.12352054915921],
          [67.7621370417537, 37.176061083917666],
          [67.8005891901912, 37.23731222420026],
          [67.65150965574549, 37.311621751588575],
          [67.34938563230799, 37.372762739220924],
          [67.08022059324549, 37.43821568419311],
          [66.86598719480799, 37.46002062401087],
          [66.69020594480799, 37.45566014452018],
          [66.57484949949549, 37.42949192875727],
          [66.49794520262049, 37.36839717678323]]]),
    NDVI5 = ui.import && ui.import("NDVI5", "imageCollection", {
      "id": "LANDSAT/LT5_L1T_8DAY_NDVI"
    }) || ee.ImageCollection("LANDSAT/LT5_L1T_8DAY_NDVI"),
    NDVI7 = ui.import && ui.import("NDVI7", "imageCollection", {
      "id": "LANDSAT/LE7_L1T_8DAY_NDVI"
    }) || ee.ImageCollection("LANDSAT/LE7_L1T_8DAY_NDVI"),
    NDVI8 = ui.import && ui.import("NDVI8", "imageCollection", {
      "id": "LANDSAT/LC8_L1T_8DAY_NDVI"
    }) || ee.ImageCollection("LANDSAT/LC8_L1T_8DAY_NDVI"),
    aoi = ui.import && ui.import("aoi", "table", {
      "id": "users/esavelye43/Suusamyr/valley"
    }) || ee.FeatureCollection("users/esavelye43/Suusamyr/valley");
//var aoi_kyrgyzstan = ee.FeatureCollection('ft:1JZNiLPpEPsJDzPManWdoxBGky-l44vV2DMNTXBDS')
//var aoi = ee.FeatureCollection('ft:1JZNiLPpEPsJDzPManWdoxBGky-l44vV2DMNTXBDS')
// Создаем пустое изображение 
var empty = ee.Image().byte();
// Используем созданно еизображение для отображения границ области интереса
var outline = empty.paint({
  featureCollection:aoi,
  color: 1,
  width: 3
});
Map.addLayer(outline, {palette: 'FF0000'}, 'Границы');
//Sept2019 
var start2019 = ee.Date('2019-09-01');
var finish2019 = ee.Date('2019-09-30')
//  MODIS NDVI 250m 16 day -------------
var collectionModNDVI_19 = ee.ImageCollection('MODIS/006/MOD13Q1')
   .filterDate('2019-09-01', '2019-09-30')
    .filterBounds(aoi)
    .select("NDVI");
var NDVI19 = collectionModNDVI_19.median().clip(aoi);
// Reduce the region. The region parameter is the Feature geometry.
var meanDictionary19 = NDVI19.reduceRegion({
  reducer: ee.Reducer.median(),
  geometry: aoi,
  scale: 30,
  maxPixels: 1e9
});
// The result is a Dictionary.  Print it.
print('Sept 2019', meanDictionary19);
//Sept2018
var start2018 = ee.Date('2018-09-01');
var finish2018 = ee.Date('2018-09-30')
//  MODIS NDVI 250m 16 day -------------
var collectionModNDVI_18 = ee.ImageCollection('MODIS/006/MOD13Q1')
    .filterDate(start2018,finish2018)
    .filterBounds(aoi)
    .select("NDVI");
var NDVI18 = collectionModNDVI_18.median().clip(aoi);
// Reduce the region. The region parameter is the Feature geometry.
var meanDictionary18 = NDVI18.reduceRegion({
  reducer: ee.Reducer.median(),
  geometry: aoi,
  scale: 30,
  maxPixels: 1e9
});
// The result is a Dictionary.  Print it.
print('Sept 2018', meanDictionary18);
//Sept2017
var start2017 = ee.Date('2017-09-01');
var finish2017 = ee.Date('2017-09-30')
//  MODIS NDVI 250m 16 day -------------
var collectionModNDVI_17 = ee.ImageCollection('MODIS/006/MOD13Q1')
    .filterDate(start2017,finish2017)
    .filterBounds(aoi)
    .select("NDVI");
var NDVI17 = collectionModNDVI_17.median().clip(aoi);
// Reduce the region. The region parameter is the Feature geometry.
var meanDictionary17 = NDVI17.reduceRegion({
  reducer: ee.Reducer.median(),
  geometry: aoi,
  scale: 30,
  maxPixels: 1e9
});
// The result is a Dictionary.  Print it.
print('Sept 2017', meanDictionary17);
//Sept2016
var start2016 = ee.Date('2016-09-01');
var finish2016 = ee.Date('2016-09-30')
//  MODIS NDVI 250m 16 day -------------
var collectionModNDVI_16 = ee.ImageCollection('MODIS/006/MOD13Q1')
    .filterDate(start2016,finish2016)
    .filterBounds(aoi)
    .select("NDVI");
var NDVI16 = collectionModNDVI_16.median().clip(aoi);
// Reduce the region. The region parameter is the Feature geometry.
var meanDictionary16 = NDVI16.reduceRegion({
  reducer: ee.Reducer.median(),
  geometry: aoi,
  scale: 30,
  maxPixels: 1e9
});
// The result is a Dictionary.  Print it.
print('Sept 2016', meanDictionary16);
//Sept2015
var start2015 = ee.Date('2015-09-01');
var finish2015 = ee.Date('2015-09-30')
//  MODIS NDVI 250m 15 day -------------
var collectionModNDVI_15 = ee.ImageCollection('MODIS/006/MOD13Q1')
    .filterDate(start2015,finish2015)
    .filterBounds(aoi)
    .select("NDVI");
var NDVI15 = collectionModNDVI_15.median().clip(aoi);
// Reduce the region. The region parameter is the Feature geometry.
var meanDictionary15 = NDVI15.reduceRegion({
  reducer: ee.Reducer.median(),
  geometry: aoi,
  scale: 30,
  maxPixels: 1e9
});
// The result is a Dictionary.  Print it.
print('Sept 2015', meanDictionary15);
//Sept2014
var start2014 = ee.Date('2014-09-01');
var finish2014 = ee.Date('2014-09-30')
//  MODIS NDVI 250m 14 day -------------
var collectionModNDVI_14 = ee.ImageCollection('MODIS/006/MOD13Q1')
    .filterDate(start2014,finish2014)
    .filterBounds(aoi)
    .select("NDVI");
var NDVI14 = collectionModNDVI_14.median().clip(aoi);
// Reduce the region. The region parameter is the Feature geometry.
var meanDictionary14 = NDVI14.reduceRegion({
  reducer: ee.Reducer.median(),
  geometry: aoi,
  scale: 30,
  maxPixels: 1e9
});
// The result is a Dictionary.  Print it.
print('Sept 2014', meanDictionary14);
//Sept2013
var start2013 = ee.Date('2013-09-01');
var finish2013 = ee.Date('2013-09-30')
//  MODIS NDVI 250m 13 day -------------
var collectionModNDVI_13 = ee.ImageCollection('MODIS/006/MOD13Q1')
    .filterDate(start2013,finish2013)
    .filterBounds(aoi)
    .select("NDVI");
var NDVI13 = collectionModNDVI_13.median().clip(aoi);
// Reduce the region. The region parameter is the Feature geometry.
var meanDictionary13 = NDVI13.reduceRegion({
  reducer: ee.Reducer.median(),
  geometry: aoi,
  scale: 30,
  maxPixels: 1e9
});
// The result is a Dictionary.  Print it.
print('Sept 2013', meanDictionary13);
//Sept2012
var start2012 = ee.Date('2012-09-01');
var finish2012 = ee.Date('2012-09-30')
//  MODIS NDVI 250m 12 day -------------
var collectionModNDVI_12 = ee.ImageCollection('MODIS/006/MOD13Q1')
    .filterDate(start2012,finish2012)
    .filterBounds(aoi)
    .select("NDVI");
var NDVI12 = collectionModNDVI_12.median().clip(aoi);
// Reduce the region. The region parameter is the Feature geometry.
var meanDictionary12 = NDVI12.reduceRegion({
  reducer: ee.Reducer.median(),
  geometry: aoi,
  scale: 30,
  maxPixels: 1e9
});
// The result is a Dictionary.  Print it.
print('Sept 2012', meanDictionary12);
//Sept2011
var start2011 = ee.Date('2011-09-01');
var finish2011 = ee.Date('2011-09-30')
//  MODIS NDVI 250m 11 day -------------
var collectionModNDVI_11 = ee.ImageCollection('MODIS/006/MOD13Q1')
    .filterDate(start2011,finish2011)
    .filterBounds(aoi)
    .select("NDVI");
var NDVI11 = collectionModNDVI_11.median().clip(aoi);
// Reduce the region. The region parameter is the Feature geometry.
var meanDictionary11 = NDVI11.reduceRegion({
  reducer: ee.Reducer.median(),
  geometry: aoi,
  scale: 30,
  maxPixels: 1e9
});
// The result is a Dictionary.  Print it.
print('Sept 2011', meanDictionary11);
//Sept2010
var start2010 = ee.Date('2010-09-01');
var finish2010 = ee.Date('2010-09-30')
//  MODIS NDVI 250m 10 day -------------
var collectionModNDVI_10 = ee.ImageCollection('MODIS/006/MOD13Q1')
    .filterDate(start2010,finish2010)
    .filterBounds(aoi)
    .select("NDVI");
var NDVI10 = collectionModNDVI_10.median().clip(aoi);
// Reduce the region. The region parameter is the Feature geometry.
var meanDictionary10 = NDVI10.reduceRegion({
  reducer: ee.Reducer.median(),
  geometry: aoi,
  scale: 30,
  maxPixels: 1e9
});
// The result is a Dictionary.  Print it.
print('Sept 2010', meanDictionary10);
//Sept2009
var start2009 = ee.Date('2009-09-01');
var finish2009 = ee.Date('2009-09-30')
//  MODIS NDVI 250m 09 day -------------
var collectionModNDVI_09 = ee.ImageCollection('MODIS/006/MOD13Q1')
    .filterDate(start2009,finish2009)
    .filterBounds(aoi)
    .select("NDVI");
var NDVI09 = collectionModNDVI_09.median().clip(aoi);
// Reduce the region. The region parameter is the Feature geometry.
var meanDictionary09 = NDVI09.reduceRegion({
  reducer: ee.Reducer.median(),
  geometry: aoi,
  scale: 30,
  maxPixels: 1e9
});
// The result is a Dictionary.  Print it.
print('Sept 2009', meanDictionary09);
//Sept2008
var start2008 = ee.Date('2008-09-01');
var finish2008 = ee.Date('2008-09-30')
//  MODIS NDVI 250m 08 day -------------
var collectionModNDVI_08 = ee.ImageCollection('MODIS/006/MOD13Q1')
    .filterDate(start2008,finish2008)
    .filterBounds(aoi)
    .select("NDVI");
var NDVI08 = collectionModNDVI_08.median().clip(aoi);
// Reduce the region. The region parameter is the Feature geometry.
var meanDictionary08 = NDVI08.reduceRegion({
  reducer: ee.Reducer.median(),
  geometry: aoi,
  scale: 30,
  maxPixels: 1e9
});
// The result is a Dictionary.  Print it.
print('Sept 2008', meanDictionary08);
//Sept2007
var start2007 = ee.Date('2007-09-01');
var finish2007 = ee.Date('2007-09-30')
//  MODIS NDVI 250m 07 day -------------
var collectionModNDVI_07 = ee.ImageCollection('MODIS/006/MOD13Q1')
    .filterDate(start2007,finish2007)
    .filterBounds(aoi)
    .select("NDVI");
var NDVI07 = collectionModNDVI_07.median().clip(aoi);
// Reduce the region. The region parameter is the Feature geometry.
var meanDictionary07 = NDVI07.reduceRegion({
  reducer: ee.Reducer.median(),
  geometry: aoi,
  scale: 30,
  maxPixels: 1e9
});
// The result is a Dictionary.  Print it.
print('Sept 2007', meanDictionary07);
//Sept2006
var start2006 = ee.Date('2006-09-01');
var finish2006 = ee.Date('2006-09-30')
//  MODIS NDVI 250m 06 day -------------
var collectionModNDVI_06 = ee.ImageCollection('MODIS/006/MOD13Q1')
    .filterDate(start2006,finish2006)
    .filterBounds(aoi)
    .select("NDVI");
var NDVI06 = collectionModNDVI_06.median().clip(aoi);
// Reduce the region. The region parameter is the Feature geometry.
var meanDictionary06 = NDVI06.reduceRegion({
  reducer: ee.Reducer.median(),
  geometry: aoi,
  scale: 30,
  maxPixels: 1e9
});
// The result is a Dictionary.  Print it.
print('Sept 2006', meanDictionary06);
//Sept2005
var start2005 = ee.Date('2005-09-01');
var finish2005 = ee.Date('2005-09-30')
//  MODIS NDVI 250m 05 day -------------
var collectionModNDVI_05 = ee.ImageCollection('MODIS/006/MOD13Q1')
    .filterDate(start2005,finish2005)
    .filterBounds(aoi)
    .select("NDVI");
var NDVI05 = collectionModNDVI_05.median().clip(aoi);
// Reduce the region. The region parameter is the Feature geometry.
var meanDictionary05 = NDVI05.reduceRegion({
  reducer: ee.Reducer.median(),
  geometry: aoi,
  scale: 30,
  maxPixels: 1e9
});
// The result is a Dictionary.  Print it.
print('Sept 2005', meanDictionary05);
//Sept2004
var start2004 = ee.Date('2004-09-01');
var finish2004 = ee.Date('2004-09-30')
//  MODIS NDVI 250m 04 day -------------
var collectionModNDVI_04 = ee.ImageCollection('MODIS/006/MOD13Q1')
    .filterDate(start2004,finish2004)
    .filterBounds(aoi)
    .select("NDVI");
var NDVI04 = collectionModNDVI_04.median().clip(aoi);
// Reduce the region. The region parameter is the Feature geometry.
var meanDictionary04 = NDVI04.reduceRegion({
  reducer: ee.Reducer.median(),
  geometry: aoi,
  scale: 30,
  maxPixels: 1e9
});
// The result is a Dictionary.  Print it.
print('Sept 2004', meanDictionary04);
//Sept2003
var start2003 = ee.Date('2003-09-01');
var finish2003 = ee.Date('2003-09-30')
//  MODIS NDVI 250m 03 day -------------
var collectionModNDVI_03 = ee.ImageCollection('MODIS/006/MOD13Q1')
    .filterDate(start2003,finish2003)
    .filterBounds(aoi)
    .select("NDVI");
var NDVI03 = collectionModNDVI_03.median().clip(aoi);
// Reduce the region. The region parameter is the Feature geometry.
var meanDictionary03 = NDVI03.reduceRegion({
  reducer: ee.Reducer.median(),
  geometry: aoi,
  scale: 30,
  maxPixels: 1e9
});
// The result is a Dictionary.  Print it.
print('Sept 2003', meanDictionary03);
//Sept2002
var start2002 = ee.Date('2002-09-01');
var finish2002 = ee.Date('2002-09-30')
//  MODIS NDVI 250m 02 day -------------
var collectionModNDVI_02 = ee.ImageCollection('MODIS/006/MOD13Q1')
    .filterDate(start2002,finish2002)
    .filterBounds(aoi)
    .select("NDVI");
var NDVI02 = collectionModNDVI_02.median().clip(aoi);
// Reduce the region. The region parameter is the Feature geometry.
var meanDictionary02 = NDVI02.reduceRegion({
  reducer: ee.Reducer.median(),
  geometry: aoi,
  scale: 30,
  maxPixels: 1e9
});
// The result is a Dictionary.  Print it.
print('Sept 2002', meanDictionary02);
//Sept2001
var start2001 = ee.Date('2001-09-01');
var finish2001 = ee.Date('2001-09-30')
//  MODIS NDVI 250m 01 day -------------
var collectionModNDVI_01 = ee.ImageCollection('MODIS/006/MOD13Q1')
    .filterDate(start2001,finish2001)
    .filterBounds(aoi)
    .select("NDVI");
var NDVI01 = collectionModNDVI_01.median().clip(aoi);
// Reduce the region. The region parameter is the Feature geometry.
var meanDictionary01 = NDVI01.reduceRegion({
  reducer: ee.Reducer.median(),
  geometry: aoi,
  scale: 30,
  maxPixels: 1e9
});
// The result is a Dictionary.  Print it.
print('Sept 2001', meanDictionary01);
//Sept2000
var start2000 = ee.Date('2000-09-01');
var finish2000 = ee.Date('2000-09-30')
//  MODIS NDVI 250m 00 day -------------
var collectionModNDVI_00 = ee.ImageCollection('MODIS/006/MOD13Q1')
    .filterDate(start2000,finish2000)
    .filterBounds(aoi)
    .select("NDVI");
var NDVI00 = collectionModNDVI_00.median().clip(aoi);
// Reduce the region. The region parameter is the Feature geometry.
var meanDictionary00 = NDVI00.reduceRegion({
  reducer: ee.Reducer.median(),
  geometry: aoi,
  scale: 30,
  maxPixels: 1e9
});
// The result is a Dictionary.  Print it.
print('Sept 2000', meanDictionary00);
Map.centerObject(aoi, 8);
//NDVI palette 
var ndviPalette = {bands: ['NDVI'], min: 0, max: 10000, palette:
['FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718',
             '74A901', '66A000', '529400', '3E8601', '207401', '056201',
              '004C00', '023B01', '012E01', '011D01', '011301']};
Map.addLayer (NDVI19,ndviPalette, 'NDVI Sept 2019' )
Map.addLayer (NDVI18,ndviPalette, 'NDVI Sept 2018' )
Map.addLayer (NDVI17,ndviPalette, 'NDVI Sept 2017' )
Map.addLayer (NDVI16,ndviPalette, 'NDVI Sept 2016' )
Map.addLayer (NDVI15,ndviPalette, 'NDVI Sept 2015' )
Map.addLayer (NDVI14,ndviPalette, 'NDVI Sept 2014' )
Map.addLayer (NDVI13,ndviPalette, 'NDVI Sept 2013' )
Map.addLayer (NDVI12,ndviPalette, 'NDVI Sept 2012' )
Map.addLayer (NDVI11,ndviPalette, 'NDVI Sept 2011' )
Map.addLayer (NDVI10,ndviPalette, 'NDVI Sept 2010' )
Map.addLayer (NDVI09,ndviPalette, 'NDVI Sept 2009' )
Map.addLayer (NDVI08,ndviPalette, 'NDVI Sept 2008' )
Map.addLayer (NDVI07,ndviPalette, 'NDVI Sept 2007' )
Map.addLayer (NDVI06,ndviPalette, 'NDVI Sept 2006' )
Map.addLayer (NDVI05,ndviPalette, 'NDVI Sept 2005' )
Map.addLayer (NDVI04,ndviPalette, 'NDVI Sept 2004' )
Map.addLayer (NDVI03,ndviPalette, 'NDVI Sept 2003' )
Map.addLayer (NDVI02,ndviPalette, 'NDVI Sept 2002' )
Map.addLayer (NDVI01,ndviPalette, 'NDVI Sept 2001' )
Map.addLayer (NDVI00,ndviPalette, 'NDVI Sept 2000' )
//Export.image.toDrive (NDVI15_may, 'NDVI_May_2015');
//Export.image.toDrive (NDVI15_july, 'NDVI_July_2015');
//Export.image.toDrive (NDVI15_sept, 'NDVI_September_2015');
//Export.image.toDrive (NDVI05_may, 'NDVI_May_2010');
//Export.image.toDrive (NDVI05_july, 'NDVI_July_2010');
//Export.image.toDrive (NDVI05_sept, 'NDVI_September_2010');
//Export.image.toDrive (NDVI_05_may, 'NDVI_May_2005');
//Export.image.toDrive (NDVI_05_july, 'NDVI_July_2005');
//Export.image.toDrive (NDVI_05_sept, 'NDVI_September_2005');