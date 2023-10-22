var imageCollection = ui.import && ui.import("imageCollection", "imageCollection", {
      "id": "users/pmisson/Madrid"
    }) || ee.ImageCollection("users/pmisson/Madrid"),
    image37 = ui.import && ui.import("image37", "image", {
      "id": "users/pmisson/JL107B_20181129060752"
    }) || ee.Image("users/pmisson/JL107B_20181129060752"),
    image38 = ui.import && ui.import("image38", "image", {
      "id": "users/pmisson/JL107B_20200421060056"
    }) || ee.Image("users/pmisson/JL107B_20200421060056"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -3.9011883110593626,
                40.296739231451575
              ],
              [
                -3.761799272973425,
                40.21394270050672
              ],
              [
                -3.4727215141843626,
                40.34280982209697
              ],
              [
                -3.4054302544187376,
                40.465685122804665
              ],
              [
                -3.503620562035925,
                40.567475143136015
              ],
              [
                -3.7350200981687376,
                40.57216941278455
              ]
            ]
          ],
          "evenOdd": true
        },
        {
          "type": "Point",
          "coordinates": [
            -3.7075673486746252,
            40.4155332679156
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -3.7075351621664465,
            40.41554143644931
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -3.707502975658268,
            40.415543478582556
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -3.707476153568119,
            40.415543478582556
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -3.7074600603140295,
            40.415543478582556
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -3.7074332382238806,
            40.415543478582556
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -3.707403733924717,
            40.41554552071578
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -3.707371547416538,
            40.41554756284893
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -3.7073339964903296,
            40.41554756284893
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -3.7072883989370764,
            40.41555368924798
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": true
    }) || 
    /* color: #d63000 */
    /* shown: false */
    /* locked: true */
    ee.Geometry({
      "type": "GeometryCollection",
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -3.9011883110593626,
                40.296739231451575
              ],
              [
                -3.761799272973425,
                40.21394270050672
              ],
              [
                -3.4727215141843626,
                40.34280982209697
              ],
              [
                -3.4054302544187376,
                40.465685122804665
              ],
              [
                -3.503620562035925,
                40.567475143136015
              ],
              [
                -3.7350200981687376,
                40.57216941278455
              ]
            ]
          ],
          "evenOdd": true
        },
        {
          "type": "Point",
          "coordinates": [
            -3.7075673486746252,
            40.4155332679156
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -3.7075351621664465,
            40.41554143644931
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -3.707502975658268,
            40.415543478582556
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -3.707476153568119,
            40.415543478582556
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -3.7074600603140295,
            40.415543478582556
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -3.7074332382238806,
            40.415543478582556
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -3.707403733924717,
            40.41554552071578
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -3.707371547416538,
            40.41554756284893
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -3.7073339964903296,
            40.41554756284893
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -3.7072883989370764,
            40.41555368924798
          ]
        }
      ],
      "coordinates": []
    }),
    image40 = ui.import && ui.import("image40", "image", {
      "id": "users/pmisson/iss065e045335_from_raw2_modificado"
    }) || ee.Image("users/pmisson/iss065e045335_from_raw2_modificado"),
    image = ui.import && ui.import("image", "image", {
      "id": "users/pmisson/Corr_iss065e045335RGB_cal2N_Ao2_rectcoor1coor2coor3coor4"
    }) || ee.Image("users/pmisson/Corr_iss065e045335RGB_cal2N_Ao2_rectcoor1coor2coor3coor4"),
    imageCollection2 = ui.import && ui.import("imageCollection2", "imageCollection", {
      "id": "users/pmisson/Madrid_High"
    }) || ee.ImageCollection("users/pmisson/Madrid_High"),
    table = ui.import && ui.import("table", "table", {
      "id": "users/pmisson/Mayor"
    }) || ee.FeatureCollection("users/pmisson/Mayor"),
    table2 = ui.import && ui.import("table2", "table", {
      "id": "users/pmisson/PlazaCastilla"
    }) || ee.FeatureCollection("users/pmisson/PlazaCastilla"),
    image3 = ui.import && ui.import("image3", "image", {
      "id": "users/pmisson/iss065e203751_2_modificado"
    }) || ee.Image("users/pmisson/iss065e203751_2_modificado"),
    image2 = ui.import && ui.import("image2", "image", {
      "id": "users/pmisson/Moron_de_la_Frontera"
    }) || ee.Image("users/pmisson/Moron_de_la_Frontera"),
    image4 = ui.import && ui.import("image4", "image", {
      "id": "users/pmisson/San_Juan"
    }) || ee.Image("users/pmisson/San_Juan"),
    imageCollection3 = ui.import && ui.import("imageCollection3", "imageCollection", {
      "id": "users/pmisson/Highres"
    }) || ee.ImageCollection("users/pmisson/Highres"),
    geometry2 = ui.import && ui.import("geometry2", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -5.467083391625769,
                37.08770073323311
              ],
              [
                -5.427086290795691,
                37.129591742008664
              ],
              [
                -5.394298967797644,
                37.167082324839484
              ],
              [
                -5.436184343774206,
                37.19033356139853
              ],
              [
                -5.4633068413328,
                37.1596951403637
              ],
              [
                -5.504677233178503,
                37.114261773645055
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": true
    }) || 
    /* color: #d63000 */
    /* shown: false */
    /* locked: true */
    ee.Geometry.Polygon(
        [[[-5.467083391625769, 37.08770073323311],
          [-5.427086290795691, 37.129591742008664],
          [-5.394298967797644, 37.167082324839484],
          [-5.436184343774206, 37.19033356139853],
          [-5.4633068413328, 37.1596951403637],
          [-5.504677233178503, 37.114261773645055]]]),
    image5 = ui.import && ui.import("image5", "image", {
      "id": "users/pmisson/Guadix"
    }) || ee.Image("users/pmisson/Guadix"),
    image6 = ui.import && ui.import("image6", "image", {
      "id": "users/pmisson/Baza"
    }) || ee.Image("users/pmisson/Baza"),
    image7 = ui.import && ui.import("image7", "image", {
      "id": "users/pmisson/Huescar"
    }) || ee.Image("users/pmisson/Huescar"),
    image8 = ui.import && ui.import("image8", "image", {
      "id": "users/pmisson/Tenerife_1"
    }) || ee.Image("users/pmisson/Tenerife_1"),
    image10 = ui.import && ui.import("image10", "image", {
      "id": "users/pmisson/JL1GF03C01_MSS_20211217045947_200069457_101_0014_001_L1A_MSSRM_modificado"
    }) || ee.Image("users/pmisson/JL1GF03C01_MSS_20211217045947_200069457_101_0014_001_L1A_MSSRM_modificado"),
    image9 = ui.import && ui.import("image9", "image", {
      "id": "users/pmisson/JL1GF03C03_MSS_20211231050211_200070556_101_0021_001_L1A_MSSRM_modificado"
    }) || ee.Image("users/pmisson/JL1GF03C03_MSS_20211231050211_200070556_101_0021_001_L1A_MSSRM_modificado"),
    image11 = ui.import && ui.import("image11", "image", {
      "id": "users/pmisson/JL1GF03C01_MSS_20220119045341_200072648_101_0014_001_L1A_MSSRM_modificado"
    }) || ee.Image("users/pmisson/JL1GF03C01_MSS_20220119045341_200072648_101_0014_001_L1A_MSSRM_modificado"),
    image12 = ui.import && ui.import("image12", "image", {
      "id": "users/pmisson/ISS066-E-113334_modificado"
    }) || ee.Image("users/pmisson/ISS066-E-113334_modificado"),
    imageCollection4 = ui.import && ui.import("imageCollection4", "imageCollection", {
      "id": "users/pmisson/Madrid_JL1"
    }) || ee.ImageCollection("users/pmisson/Madrid_JL1"),
    imageCollection5 = ui.import && ui.import("imageCollection5", "imageCollection", {
      "id": "users/pmisson/JL_Chrismas_1"
    }) || ee.ImageCollection("users/pmisson/JL_Chrismas_1"),
    imageCollection6 = ui.import && ui.import("imageCollection6", "imageCollection", {
      "id": "users/pmisson/JL_Chrismas_2"
    }) || ee.ImageCollection("users/pmisson/JL_Chrismas_2"),
    imageCollection7 = ui.import && ui.import("imageCollection7", "imageCollection", {
      "id": "users/pmisson/JL_No_Chrismas"
    }) || ee.ImageCollection("users/pmisson/JL_No_Chrismas"),
    geometry3 = ui.import && ui.import("geometry3", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -3.7141517687504777,
                40.424454116089365
              ],
              [
                -3.7141517687504777,
                40.4083949907212
              ],
              [
                -3.6812249708836564,
                40.4083949907212
              ],
              [
                -3.6812249708836564,
                40.424454116089365
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": true
    }) || 
    /* color: #d63000 */
    /* shown: false */
    /* locked: true */
    ee.Geometry.Polygon(
        [[[-3.7141517687504777, 40.424454116089365],
          [-3.7141517687504777, 40.4083949907212],
          [-3.6812249708836564, 40.4083949907212],
          [-3.6812249708836564, 40.424454116089365]]], null, false),
    geometry4 = ui.import && ui.import("geometry4", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -3.6141318252159382,
                40.42722899698314
              ],
              [
                -3.622028248555782,
                40.442124163398816
              ],
              [
                -3.734638111837032,
                40.42657562467783
              ],
              [
                -3.76090230251086,
                40.41755843871001
              ],
              [
                -3.7629622390342976,
                40.40605650577365
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": true
    }) || 
    /* color: #d63000 */
    /* shown: false */
    /* locked: true */
    ee.Geometry.Polygon(
        [[[-3.6141318252159382, 40.42722899698314],
          [-3.622028248555782, 40.442124163398816],
          [-3.734638111837032, 40.42657562467783],
          [-3.76090230251086, 40.41755843871001],
          [-3.7629622390342976, 40.40605650577365]]]),
    geometry5 = ui.import && ui.import("geometry5", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -3.6312979629112507,
                40.447611024508056
              ],
              [
                -3.638679402120235,
                40.47895592371123
              ],
              [
                -3.7835616042686726,
                40.457669106559976
              ],
              [
                -3.7562674453331257,
                40.431671760332456
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
      "shown": false,
      "locked": true
    }) || 
    /* color: #98ff00 */
    /* shown: false */
    /* locked: true */
    ee.Geometry.Polygon(
        [[[-3.6312979629112507, 40.447611024508056],
          [-3.638679402120235, 40.47895592371123],
          [-3.7835616042686726, 40.457669106559976],
          [-3.7562674453331257, 40.431671760332456]]]),
    geometry6 = ui.import && ui.import("geometry6", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -3.7108665723021206,
                40.423259746912215
              ],
              [
                -3.7063282746489223,
                40.420352019852615
              ],
              [
                -3.7058240193541225,
                40.42017232473104
              ],
              [
                -3.7047725934202846,
                40.420131484863745
              ],
              [
                -3.703935744207638,
                40.420090644971665
              ],
              [
                -3.7033885735686,
                40.42007430900787
              ],
              [
                -3.702916504781979,
                40.419992629129496
              ],
              [
                -3.7020260113890346,
                40.41989461314453
              ],
              [
                -3.701092602651852,
                40.41991094915192
              ],
              [
                -3.700717093389767,
                40.41987827713314
              ],
              [
                -3.6996334809477505,
                40.41966590862425
              ],
              [
                -3.697198035162228,
                40.41889810919124
              ],
              [
                -3.6970800179655727,
                40.4186775694363
              ],
              [
                -3.6966615933592495,
                40.418636728661596
              ],
              [
                -3.6969405430967983,
                40.419077807716285
              ],
              [
                -3.6994081753904995,
                40.41978026098156
              ],
              [
                -3.7002021092589077,
                40.41996812514664
              ],
              [
                -3.7006527203734096,
                40.42008247699025
              ],
              [
                -3.701371552389401,
                40.420139652839175
              ],
              [
                -3.7019509095366177,
                40.420090644971665
              ],
              [
                -3.7023264187987026,
                40.420188660671016
              ],
              [
                -3.7037962693388637,
                40.42029484418417
              ],
              [
                -3.7050944585020718,
                40.4203846916413
              ],
              [
                -3.7058454770262417,
                40.420433699294655
              ],
              [
                -3.707315327566403,
                40.42127499177647
              ],
              [
                -3.707529904287594,
                40.42147101958127
              ],
              [
                -3.708506228369015,
                40.42208360278956
              ],
              [
                -3.708710076254147,
                40.422140776937695
              ],
              [
                -3.7088924664671596,
                40.42227146052244
              ],
              [
                -3.708935381811398,
                40.42234496992729
              ],
              [
                -3.7100189942534145,
                40.423022886207846
              ],
              [
                -3.710576893728512,
                40.42339042832311
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#0b4a8b",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #0b4a8b */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-3.7108665723021206, 40.423259746912215],
          [-3.7063282746489223, 40.420352019852615],
          [-3.7058240193541225, 40.42017232473104],
          [-3.7047725934202846, 40.420131484863745],
          [-3.703935744207638, 40.420090644971665],
          [-3.7033885735686, 40.42007430900787],
          [-3.702916504781979, 40.419992629129496],
          [-3.7020260113890346, 40.41989461314453],
          [-3.701092602651852, 40.41991094915192],
          [-3.700717093389767, 40.41987827713314],
          [-3.6996334809477505, 40.41966590862425],
          [-3.697198035162228, 40.41889810919124],
          [-3.6970800179655727, 40.4186775694363],
          [-3.6966615933592495, 40.418636728661596],
          [-3.6969405430967983, 40.419077807716285],
          [-3.6994081753904995, 40.41978026098156],
          [-3.7002021092589077, 40.41996812514664],
          [-3.7006527203734096, 40.42008247699025],
          [-3.701371552389401, 40.420139652839175],
          [-3.7019509095366177, 40.420090644971665],
          [-3.7023264187987026, 40.420188660671016],
          [-3.7037962693388637, 40.42029484418417],
          [-3.7050944585020718, 40.4203846916413],
          [-3.7058454770262417, 40.420433699294655],
          [-3.707315327566403, 40.42127499177647],
          [-3.707529904287594, 40.42147101958127],
          [-3.708506228369015, 40.42208360278956],
          [-3.708710076254147, 40.422140776937695],
          [-3.7088924664671596, 40.42227146052244],
          [-3.708935381811398, 40.42234496992729],
          [-3.7100189942534145, 40.423022886207846],
          [-3.710576893728512, 40.42339042832311]]]),
    table3 = ui.import && ui.import("table3", "table", {
      "id": "users/pmisson/MedidasParkingCaminos"
    }) || ee.FeatureCollection("users/pmisson/MedidasParkingCaminos");
Map.setOptions('SATELLITE');
var mosaicX1 = imageCollection5.reduce(ee.Reducer.mean());
var mosaicX2 = imageCollection6.reduce(ee.Reducer.mean());
var mosaicX3 = imageCollection7.reduce(ee.Reducer.mean());
var collectionFromConstructor = ee.ImageCollection([mosaicX1,mosaicX2,mosaicX3])
var vizParamsX = {
  min:[1, 1, 1],
  max:[24059, 24059, 24059],
  gamma: [5, 5, 5],
  };
var vizParamsX1 = {
  min:[1, 1, 1],
  max:[4059, 4059, 4059],
  gamma: [5, 5, 5],
  };
var vizParamsX2 = {
  min:[1, 1, 1],
  max:[789.6, 905.128, 505.826],
  gamma: [3, 3, 3],
  };  
var vizParamsG = {min: 0, max: 25, palette: ['000000','00ff07','fcff00','ff0000']};
var VIIRS201912 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20191201");
Map.addLayer(VIIRS201912.select('avg_rad'),{min:0,max:200,gamma:2},'2019 - VIIRS',true);
var RED=image37.select('b2')
var evi = RED.expression(
    '(u)*0.9766628627323118+4.115389631561786', {
        'u': RED
  });
mosaicX1
  var evi2 = RED.expression(
    '(u)* 0.6927997649144724+37.36780513582855', {
        'u': RED
  });
var maskX=evi.gt(5.1);
evi=evi.multiply(maskX);
var RED=image37.select('b1'); 
var GREEN=image37.select('b2');
var BLUE=image37.select('b3');
var GR=GREEN.divide(RED);
var BG=BLUE.divide(GREEN);
var mask=GR.lt(4);
var mask2=GR.gt(0.02);
var mask3=BG.lt(5);
var image37b =image37.multiply(mask).multiply(mask2).multiply(mask3);
var evi2=evi.multiply(mask).multiply(mask2).multiply(mask3);
// Make an image collection of visualization images.
var mosaic = collectionFromConstructor.reduce(ee.Reducer.max());
var RED1=mosaicX3.select('b2_mean')
var evix = RED1.expression(
    '(u)*1.4529-15.27', {
        'u': RED1
  });
print(mosaic)
// Display the mosaic.
var mosaic1=mosaic.visualize(vizParamsX);
var mosaic2=ee.Image.rgb(mosaic.select('b1_mean_max').multiply(6.5), mosaic.select('b2_mean_max').multiply(6.0), mosaic.select('b3_mean_max').multiply(9.0))
var mosaic2b=mosaic2.visualize(vizParamsX);
Map.addLayer(mosaic1,{},'Mosaic Vis - JL1',false)
Map.addLayer(mosaic,vizParamsX2,'Mosaic - JL1',false)
Map.addLayer(mosaicX1,vizParamsX2,'2021 - ChrismasN - JL1',true)
Map.addLayer(mosaicX2,vizParamsX2,'2021 - ChrismasS - JL1',true)
Map.addLayer(mosaicX3,vizParamsX2,'2022 - No ChrismasC - JL1',true)
Map.setCenter(-16.54784, 28.39636, 12);
Map.addLayer(image37b,vizParamsX,'2018 - JL1-3B',false)
Map.addLayer(evix,vizParamsG,'2022-Lux',false)
Map.addLayer(image38,vizParamsX1,'2020 - JL1-7B',false)
Map.addLayer(image10,vizParamsX2,'2021 - Chrismas - JL1 - Single',false)
Map.addLayer(image11,vizParamsX2,'2021 - NO-Chrismas - JL1 - Single',false)
Map.addLayer(image9,vizParamsX2,'2021 - Chrismas2 - JL1 - Single',false)
Map.addLayer(image2,vizParamsX,'2021_Moron',false)
Map.addLayer(image4,vizParamsX,'2021_Sanlucar_la_mayor',false)
Map.addLayer(image5,vizParamsX,'2021_Guadix',false)
Map.addLayer(image6,vizParamsX,'2021_Baza',false)
Map.addLayer(image7,vizParamsX,'2021_Huescar',false)
Map.addLayer(image8,vizParamsX,'2021_Tenerife_1',false)
Map.addLayer(image12,{gamma:1.73},'2022 - ISS',false)
Map.addLayer(image40,{gamma:1.73},'2021 - ISS',false)
Map.addLayer(image3,{},'2021-2 - ISS',false)
//Map.setCenter(-3.6988, 40.4259, 12);
var testXX=mosaic.getThumbURL({
  min:[1, 1, 1],
  max:[4059, 4059, 4059],
  gamma: [6, 6, 6],
  'region': ee.Geometry.Rectangle([[-3.8218, 40.5013], [-3.6021, 40.367]]),
  'dimensions': 3000,
  'crs': 'EPSG:4326'
});
//Map.addLayer(table2,false)
//Map.addLayer(GR,{},'GR',false)
//Map.addLayer(BG,{},'BG',false)
print(testXX)
var fg_points = ee.FeatureCollection(table3)
//var fg_points = ee.FeatureCollection('ft:1quTYHcLHQNy1yrssUPaubflVBEkGGMoPFLdbc_-J')
// function to map over the FeatureCollection
var mapfunc = function(feat) {
  // get feature geometry
  var geom = feat.geometry()
  // function to iterate over the yearly ImageCollection
  // the initial object for the iteration is the feature
  var addProp = function(img, f) {
    // cast Feature
    var newf = ee.Feature(f)
    // get date as string
    //var date = img.bandNames().get(0)
    var date = img.id()//date().format()
    // extract the value (first) of 'waterClass' in the feature
    // extract the value (first) of 'waterClass' in the feature
    var value = img.reduceRegion(ee.Reducer.mean(), geom, 1)
    // if the value is not null, set the values as a property of the feature. The name of the property will be the date
    return ee.Feature(ee.Algorithms.If(value,
                                       newf.set(date,value),
                                       newf.set(date, ee.String('No data'))))
  }
  var newfeat = ee.Feature(imageCollection5.iterate(addProp, feat))
  return newfeat
};
var newft = fg_points.map(mapfunc);
print(newft)
// Export
Export.table.toDrive(newft,
"Mayor",
"Mayor",
"Mayor");
var getCentroid = function(feature) {
  // Keep this list of properties.
  var keepProperties = ['name', 'average', 'date'];
  // Get the centroid of the feature's geometry.
  var centroid = feature.geometry();
  // Return a new Feature, copying properties from the old Feature.
  return ee.Feature(centroid).copyProperties(feature, keepProperties);
};
var centroids = table3.map(getCentroid);
Map.addLayer(centroids,{color: 'FF0000'},'T',false);
//var geometry3 = 
    /* color: #d63000 */
    /* shown: true */
//    geometry2;
//Map.addLayer(geometry3,{color: 'FF0000'},'Geo');
print(centroids)
//var batch = require('users/fitoprincipe/geetools:batch')
//var composite4=image4.visualize(vizParamsX)
//var composite2=image2.visualize(vizParamsX)
//var composite1=image8.visualize(vizParamsX)
Map.setCenter(-3.701134, 40.417099, 17);
var ImageN= mosaicX2.clip(geometry3);
Map.addLayer(ImageN,vizParamsX2,'JL3',true);
Export.image.toDrive({
  image: ImageN,
  description: 'Madrid_Chrismas',
  scale: 0.5,
  region: geometry3,
  fileFormat: 'GeoTIFF'
}); 
  //maxPixels: 36672400,
//Export.image.toDrive(composite2,'Highress','Highress',{scale:5, region: geometry3,type: 'float'})
/*
batch.Download.ImageCollection.toDrive(imageCollection3, 'Highres', 
                {scale: 1, 
                  type: 'float'})
*/                  
var testXX=mosaic.getThumbURL({
  min:[1, 1, 1],
  max:[4059, 4059, 4059],
  gamma: [6, 6, 6],
  'region': geometry3,
  'dimensions': 3000,
  'crs': 'EPSG:4326'
});
print(testXX)
//Map.setOptions('SATELLITE');
var mosaicX1 = imageCollection3.reduce(ee.Reducer.median());
var mosaicX2 = mosaic;
var mosaicX3 = image38;
var collection = ee.ImageCollection([mosaicX3])
var collection2 = ee.ImageCollection([mosaicX2])
var id1=collection.first().get('system:index')
print(collection2)
// A helper function to show the image for a given year on the default map.
// Demonstrates before/after imagery comparison with a variety of dates.
/*
 * Configure the imagery
 */
// These Sentinel-1 images track the major flooding in Myanmar during the 2018
// monsoon season: https://www.bbc.com/news/world-asia-44962585
  var vizParamsX2 = {
  min:[1, 1, 1],
  max:[789.6, 905.128, 505.826],
  gamma: [3, 3, 3],
  };  
var image1=collection.filterMetadata('system:index', 'equals', id1)
print(image1)
function getWeeklySentinelComposite(name) {
  var sentinel1 = collection.filterMetadata('system:index', 'equals', name);
  var vizParamsX2 = {
  min:[1, 1, 1],
  max:[789.6, 905.128, 505.826],
  gamma: [3, 3, 3],
  };
  var sentinel2=sentinel1.first()
  return sentinel2.visualize(vizParamsX2);//1e-5
}
function getWeeklySentinelComposite1(name) {
  var sentinel1 = collection2.filterMetadata('system:index', 'equals', name);
  var vizParamsX2 = {
  min:[1, 1, 1],
  max:[789.6, 905.128, 505.826],
  gamma: [3, 3, 3],
  };
  var sentinel2=sentinel1.first()
  return sentinel2.visualize(vizParamsX2);//1e-5
}
//Map.setOptions('SATELLITE');
print(getWeeklySentinelComposite('JL1GF03C03_MSS_20211231050211_200070556_101_0014_001_L1A_MSSRM_modificado'))
var images = {
  'NULL': getWeeklySentinelComposite('NULL'),
  'CH1N': getWeeklySentinelComposite('0')
};
var images2 = {
  'NULL': getWeeklySentinelComposite('NULL'),
  'NCH1N': getWeeklySentinelComposite1('0')
  };
print(images)
print(images2)
/*
 * Set up the maps and control widgets
 */
// Create the left map, and have it display layer 0.
var leftMap = ui.Map();
leftMap.setControlVisibility(false);
var leftSelector = addLayerSelector2(leftMap, 1, 'top-left');
// Create the right map, and have it display layer 1.
var rightMap = ui.Map();
rightMap.setControlVisibility(false);
rightMap.setOptions('SATELLITE');
var rightSelector = addLayerSelector(rightMap, 1, 'top-right');
// Adds a layer selection widget to the given map, to allow users to change
// which image is displayed in the associated map.
function addLayerSelector(mapToChange, defaultValue, position) {
  var label = ui.Label('Choose an image to visualize with COVID-19 lockdown');
  // This function changes the given map to show the selected image.
  function updateMap(selection) {
    mapToChange.layers().set(0, ui.Map.Layer(images[selection]));
  }
  // Configure a selection dropdown to allow the user to choose between images,
  // and set the map to update when a user makes a selection.
  var select = ui.Select({items: Object.keys(images), onChange: updateMap});
   select.setValue(Object.keys(images)[defaultValue], true);
  var controlPanel =
      ui.Panel({widgets: [label, select], style: {position: position}});
  mapToChange.add(controlPanel);
}
function addLayerSelector2(mapToChange, defaultValue, position) {
  var label = ui.Label('Choose an image to visualize in without COVID-19 lookdown');
  // This function changes the given map to show the selected image.
  function updateMap(selection) {
    mapToChange.layers().set(0, ui.Map.Layer(images2[selection]));
  }
  // Configure a selection dropdown to allow the user to choose between images,
  // and set the map to update when a user makes a selection.
  var select = ui.Select({items: Object.keys(images2), onChange: updateMap});
   select.setValue(Object.keys(images2)[defaultValue], true);
  var controlPanel =
      ui.Panel({widgets: [label, select], style: {position: position}});
  mapToChange.add(controlPanel);
}
/*
 * Tie everything together
 */
// Create a SplitPanel to hold the adjacent, linked maps.
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  wipe: true,
  style: {stretch: 'both'}
});
// Set the SplitPanel as the only thing in the UI root.
ui.root.widgets().reset([splitPanel]);
var linker = ui.Map.Linker([leftMap, rightMap]);
leftMap.setCenter(-3.64208, 40.467162, 16);
//Map.addLayer('CH1N',vizParamsX2,'CH1N');
//Map.addLayer('CH2N',vizParamsX2,'CH2N');
Map.setCenter(-3.64208, 40.46716, 16);