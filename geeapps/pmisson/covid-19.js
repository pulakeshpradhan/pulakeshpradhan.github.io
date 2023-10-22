var imageCollection = ui.import && ui.import("imageCollection", "imageCollection", {
      "id": "NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG"
    }) || ee.ImageCollection("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -18.976809365018,
                29.561167373546432
              ],
              [
                -18.976809365018,
                27.33970222999687
              ],
              [
                -13.132082802518001,
                27.33970222999687
              ],
              [
                -13.132082802518001,
                29.561167373546432
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
      "locked": true
    }) || 
    /* color: #d63000 */
    /* shown: false */
    /* locked: true */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[-18.976809365018, 29.561167373546432],
          [-18.976809365018, 27.33970222999687],
          [-13.132082802518001, 27.33970222999687],
          [-13.132082802518001, 29.561167373546432]]], null, false),
    geometry2 = ui.import && ui.import("geometry2", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -4.1231297175359245,
            38.646892732393084
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -3.5658811730690254,
            40.49202331782798
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            2.0757242776500995,
            41.3480605907527
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            2.0712610818493182,
            41.291334002103326
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            1.8961664773571307,
            41.4955757390708
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -0.4699529596594587,
            39.48331102154268
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -0.37553920233523996,
            39.48463590829743
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            2.728802128983321,
            39.547493549021745
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -4.489274272132537,
            36.67567733212196
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -5.898540825243239,
            37.42295117959593
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -3.6878171252032743,
            40.45443567498671
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -4.420888617634935,
            36.699865354478476
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -8.496133798531277,
            42.910008781483235
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -8.423825394656408,
            42.89714755042274
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -8.169447023697177,
            43.40841880049167
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -5.96550126148355,
            43.34533659847694
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -6.073330355839062,
            43.38632941720991
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -5.7312851569598795,
            43.52342322103589
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -3.1310516939966315,
            43.121337594616946
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -1.6523682830914943,
            42.48384541238909
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -1.676744198618838,
            42.52497517257873
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -1.6442377861210922,
            42.81114935183652
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -0.41026284344695574,
            42.12975653905591
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            1.1547819958946448,
            41.08339341073566
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -0.23243408600588156,
            39.82492315143551
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -0.553502975051634,
            38.28356762997399
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -0.8445524876954869,
            38.433128388601524
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -0.9897711466931458,
            38.357599067401146
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -1.12726133569933,
            37.810091135855146
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -1.3674471234672536,
            37.73333004242502
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -1.8982896967540497,
            36.98006219427096
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -2.2926696477464814,
            37.34125900538947
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -3.612202081400495,
            39.07011440688389
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -2.9457034838664287,
            39.39959595278342
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -3.9448288211150384,
            39.800311480885924
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -3.669927357943892,
            40.12846913102321
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -4.113671578754334,
            40.055110825226954
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -7.906893425197638,
            38.56480906923747
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -8.468116601598277,
            38.676792702990134
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -5.577260861909958,
            42.59786945714379
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -3.0918852265137975,
            39.1277455039295
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -3.3414871338129526,
            38.97160846527295
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -2.2022681140614897,
            39.40922083040841
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -1.62412533737045,
            39.47078491933898
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -2.686415587865252,
            42.851364126700766
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -8.417956772450891,
            43.37204784159268
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -5.049743003554365,
            50.15452387133105
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.277633536029061,
            45.45583514227081
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            9.253770833238306,
            45.40316880477909
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            12.775294561165538,
            41.68752695365252
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            12.454549685868717,
            41.9336633252543
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            12.542581948617766,
            41.97385502571861
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            15.04890312658054,
            37.47098002043572
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            24.0150665582034,
            38.13804714427356
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            24.142282442055826,
            35.537637198100846
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            20.87694715125494,
            43.64872615815569
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
        [[-4.1231297175359245, 38.646892732393084],
         [-3.5658811730690254, 40.49202331782798],
         [2.0757242776500995, 41.3480605907527],
         [2.0712610818493182, 41.291334002103326],
         [1.8961664773571307, 41.4955757390708],
         [-0.4699529596594587, 39.48331102154268],
         [-0.37553920233523996, 39.48463590829743],
         [2.728802128983321, 39.547493549021745],
         [-4.489274272132537, 36.67567733212196],
         [-5.898540825243239, 37.42295117959593],
         [-3.6878171252032743, 40.45443567498671],
         [-4.420888617634935, 36.699865354478476],
         [-8.496133798531277, 42.910008781483235],
         [-8.423825394656408, 42.89714755042274],
         [-8.169447023697177, 43.40841880049167],
         [-5.96550126148355, 43.34533659847694],
         [-6.073330355839062, 43.38632941720991],
         [-5.7312851569598795, 43.52342322103589],
         [-3.1310516939966315, 43.121337594616946],
         [-1.6523682830914943, 42.48384541238909],
         [-1.676744198618838, 42.52497517257873],
         [-1.6442377861210922, 42.81114935183652],
         [-0.41026284344695574, 42.12975653905591],
         [1.1547819958946448, 41.08339341073566],
         [-0.23243408600588156, 39.82492315143551],
         [-0.553502975051634, 38.28356762997399],
         [-0.8445524876954869, 38.433128388601524],
         [-0.9897711466931458, 38.357599067401146],
         [-1.12726133569933, 37.810091135855146],
         [-1.3674471234672536, 37.73333004242502],
         [-1.8982896967540497, 36.98006219427096],
         [-2.2926696477464814, 37.34125900538947],
         [-3.612202081400495, 39.07011440688389],
         [-2.9457034838664287, 39.39959595278342],
         [-3.9448288211150384, 39.800311480885924],
         [-3.669927357943892, 40.12846913102321],
         [-4.113671578754334, 40.055110825226954],
         [-7.906893425197638, 38.56480906923747],
         [-8.468116601598277, 38.676792702990134],
         [-5.577260861909958, 42.59786945714379],
         [-3.0918852265137975, 39.1277455039295],
         [-3.3414871338129526, 38.97160846527295],
         [-2.2022681140614897, 39.40922083040841],
         [-1.62412533737045, 39.47078491933898],
         [-2.686415587865252, 42.851364126700766],
         [-8.417956772450891, 43.37204784159268],
         [-5.049743003554365, 50.15452387133105],
         [9.277633536029061, 45.45583514227081],
         [9.253770833238306, 45.40316880477909],
         [12.775294561165538, 41.68752695365252],
         [12.454549685868717, 41.9336633252543],
         [12.542581948617766, 41.97385502571861],
         [15.04890312658054, 37.47098002043572],
         [24.0150665582034, 38.13804714427356],
         [24.142282442055826, 35.537637198100846],
         [20.87694715125494, 43.64872615815569]]);
var imageCollection = ee.ImageCollection("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG"),
    geometry = 
    /* color: #d63000 */
    /* shown: false */
    /* locked: true */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[-18.976809365018, 29.561167373546432],
          [-18.976809365018, 27.33970222999687],
          [-13.132082802518001, 27.33970222999687],
          [-13.132082802518001, 29.561167373546432]]], null, false),
    geometry2 = /* color: #98ff00 */ee.Geometry.MultiPoint(
        [[-4.1231297175359245, 38.646892732393084],
         [-3.5658811730690254, 40.49202331782798],
         [2.0757242776500995, 41.3480605907527],
         [2.0712610818493182, 41.291334002103326],
         [1.8961664773571307, 41.4955757390708],
         [-0.4699529596594587, 39.48331102154268],
         [-0.37553920233523996, 39.48463590829743],
         [2.728802128983321, 39.547493549021745],
         [-4.489274272132537, 36.67567733212196],
         [-5.898540825243239, 37.42295117959593],
         [-3.6878171252032743, 40.45443567498671],
         [-4.420888617634935, 36.699865354478476],
         [-8.496133798531277, 42.910008781483235],
         [-8.423825394656408, 42.89714755042274],
         [-8.169447023697177, 43.40841880049167],
         [-5.96550126148355, 43.34533659847694],
         [-6.073330355839062, 43.38632941720991],
         [-5.7312851569598795, 43.52342322103589],
         [-3.1310516939966315, 43.121337594616946],
         [-1.6523682830914943, 42.48384541238909],
         [-1.676744198618838, 42.52497517257873],
         [-1.6442377861210922, 42.81114935183652],
         [-0.41026284344695574, 42.12975653905591],
         [1.1547819958946448, 41.08339341073566],
         [-0.23243408600588156, 39.82492315143551],
         [-0.553502975051634, 38.28356762997399],
         [-0.8445524876954869, 38.433128388601524],
         [-0.9897711466931458, 38.357599067401146],
         [-1.12726133569933, 37.810091135855146],
         [-1.3674471234672536, 37.73333004242502],
         [-1.8982896967540497, 36.98006219427096],
         [-2.2926696477464814, 37.34125900538947],
         [-3.612202081400495, 39.07011440688389],
         [-2.9457034838664287, 39.39959595278342],
         [-3.9448288211150384, 39.800311480885924],
         [-3.669927357943892, 40.12846913102321],
         [-4.113671578754334, 40.055110825226954],
         [-7.906893425197638, 38.56480906923747],
         [-8.468116601598277, 38.676792702990134],
         [-5.577260861909958, 42.59786945714379],
         [-3.0918852265137975, 39.1277455039295],
         [-3.3414871338129526, 38.97160846527295],
         [-2.2022681140614897, 39.40922083040841],
         [-1.62412533737045, 39.47078491933898],
         [-2.686415587865252, 42.851364126700766],
         [-8.417956772450891, 43.37204784159268],
         [-5.049743003554365, 50.15452387133105],
         [9.277633536029061, 45.45583514227081],
         [9.253770833238306, 45.40316880477909],
         [12.775294561165538, 41.68752695365252],
         [12.454549685868717, 41.9336633252543],
         [12.542581948617766, 41.97385502571861],
         [15.04890312658054, 37.47098002043572],
         [24.0150665582034, 38.13804714427356],
         [24.142282442055826, 35.537637198100846],
         [20.87694715125494, 43.64872615815569]]);
alert('This app is only as visualization tool and should not be used for scientific analisys. For more details about this app e-mail to the authors of the listed article.');
var VIIRS201204 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20120401");
var VIIRS201205 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20120501");
var VIIRS201206 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20120601");
var VIIRS201207 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20120701");
var VIIRS201208 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20120801");
var VIIRS201209 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20120901");
var VIIRS201210 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20121001");
var VIIRS201211 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20121101");
var VIIRS201212 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20121201");
var VIIRS201301 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20130101");
var VIIRS201302 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20130201");
var VIIRS201303 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20130301");
var VIIRS201304 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20130401");
var VIIRS201305 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20130501");
var VIIRS201306 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20130601");
var VIIRS201307 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20130701");
var VIIRS201308 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20130801");
var VIIRS201309 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20130901");
var VIIRS201310 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20131001");
var VIIRS201311 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20131101");
var VIIRS201312 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20131201");
var VIIRS201401 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20140101");
var VIIRS201402 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20140201");
var VIIRS201403 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20140301");
var VIIRS201404 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20140401");
var VIIRS201405 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20140501");
var VIIRS201406 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20140601");
var VIIRS201407 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20140701");
var VIIRS201408 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20140801");
var VIIRS201409 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20140901");
var VIIRS201410 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20141001");
var VIIRS201411 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20141101");
var VIIRS201412 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20141201");
var VIIRS201501 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20150101");
var VIIRS201502 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20150201");
var VIIRS201503 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20150301");
var VIIRS201504 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20150401");
var VIIRS201505 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20150501");
var VIIRS201506 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20150601");
var VIIRS201507 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20150701");
var VIIRS201508 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20150801");
var VIIRS201509 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20150901");
var VIIRS201510 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20151001");
var VIIRS201511 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20151101");
var VIIRS201512 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20151201");
var VIIRS201601 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20160101");
var VIIRS201602 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20160201");
var VIIRS201603 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20160301");
var VIIRS201604 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20160401");
var VIIRS201605 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20160501");
var VIIRS201606 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20160601");
var VIIRS201607 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20160701");
var VIIRS201608 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20160801");
var VIIRS201609 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20160901");
var VIIRS201610 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20161001");
var VIIRS201611 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20161101");
var VIIRS201612 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20161201");
var VIIRS201701 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20170101");
var VIIRS201702 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20170201");
var VIIRS201703 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20170301");
var VIIRS201704 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20170401");
var VIIRS201705 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20170501");
var VIIRS201706 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20170601");
var VIIRS201707 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20170701");
var VIIRS201708 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20170801");
var VIIRS201709 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20170901");
var VIIRS201710 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20171001");
var VIIRS201711 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20171101");
var VIIRS201712 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20171201");
var VIIRS201801 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20180101");
var VIIRS201802 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20180201");
var VIIRS201803 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20180301");
var VIIRS201804 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20180401");
var VIIRS201805 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20180501");
var VIIRS201806 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20180601");
var VIIRS201807 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20180701");
var VIIRS201808 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20180801");
var VIIRS201809 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20180901");
var VIIRS201810 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20181001");
var VIIRS201811 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20181101");
var VIIRS201812 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20181201");
var VIIRS201901 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20190101");
var VIIRS201902 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20190201");
var VIIRS201903 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20190301");
var VIIRS201904 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20190401");
var VIIRS201905 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20190501");
var VIIRS201906 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20190601");
var VIIRS201907 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20190701");
var VIIRS201908 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20190801");
var VIIRS201909 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20190901");
var VIIRS201910 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20191001");
var VIIRS201911 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20191101");
var VIIRS201912 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20191201");
var VIIRS202001 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20200101");
var VIIRS202002 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20200201");
var VIIRS202003 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20200301");
var VIIRS202004 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20200401");
var VIIRS202005 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20200501");
var collectionFromConstructor = ee.ImageCollection([
//VIIRS201204 
//, VIIRS201205 
//, VIIRS201206
//, VIIRS201207
//, VIIRS201208
//, VIIRS201209
//, VIIRS201210
//, VIIRS201211 
//, VIIRS201212
//, VIIRS201301
//, VIIRS201302
//, VIIRS201303
//, VIIRS201304
//, VIIRS201305 
//, VIIRS201306
//, VIIRS201307
//, VIIRS201308
//, VIIRS201309
//, VIIRS201310
//, VIIRS201311 
//, VIIRS201312
//, VIIRS201401
//, VIIRS201402
//, VIIRS201403
//, VIIRS201404
//, VIIRS201405 
//, VIIRS201406
//, VIIRS201407
//, VIIRS201408
//, VIIRS201409
//, VIIRS201410
//, VIIRS201411 
//, VIIRS201412
//, VIIRS201501 
//, VIIRS201502 
//, VIIRS201503
//, VIIRS201504
//, VIIRS201505
//, VIIRS201506
//, VIIRS201507
//, VIIRS201508
//, VIIRS201509
//, VIIRS201510
//, VIIRS201511
//, VIIRS201512
//, VIIRS201601
//, VIIRS201602
//, VIIRS201603
//, VIIRS201604
//, VIIRS201605
VIIRS201606
, VIIRS201607
, VIIRS201608
, VIIRS201609
, VIIRS201610
, VIIRS201611
, VIIRS201701
, VIIRS201702
, VIIRS201703
,VIIRS201704
, VIIRS201705
, VIIRS201706
, VIIRS201707
, VIIRS201708
, VIIRS201709
, VIIRS201710
, VIIRS201711
, VIIRS201712
, VIIRS201801
, VIIRS201802
, VIIRS201803
, VIIRS201804
, VIIRS201805
, VIIRS201806
, VIIRS201807
, VIIRS201808
, VIIRS201809
, VIIRS201810
, VIIRS201811
, VIIRS201812
, VIIRS201901
, VIIRS201902
, VIIRS201903
, VIIRS201904
, VIIRS201905
, VIIRS201906
, VIIRS201907
, VIIRS201908
, VIIRS201909
, VIIRS201910
, VIIRS201911
, VIIRS201912
, VIIRS202001
, VIIRS202002
, VIIRS202003
, VIIRS202004
, VIIRS202005]);
var vizParams2 = {
  bands: ['avg_rad'],
  min: 0.4,
  max: 150,
  gamma: 3.0,
};
var F=0
var T=1
Map.setCenter(-3.7353515625,40.463666324587685, 6);
/*
Map.addLayer(VIIRS201401, vizParams2, 'VIIRS201401',F);
Map.addLayer(VIIRS201402, vizParams2, 'VIIRS201402',F);
Map.addLayer(VIIRS201403, vizParams2, 'VIIRS201403',F);
Map.addLayer(VIIRS201404, vizParams2, 'VIIRS201404',F);
Map.addLayer(VIIRS201405, vizParams2, 'VIIRS201405',F);
Map.addLayer(VIIRS201406, vizParams2, 'VIIRS201406',F);
Map.addLayer(VIIRS201407, vizParams2, 'VIIRS201407',F);
Map.addLayer(VIIRS201408, vizParams2, 'VIIRS201408',F);
Map.addLayer(VIIRS201409, vizParams2, 'VIIRS201409',F);
Map.addLayer(VIIRS201410, vizParams2, 'VIIRS201410',F);
Map.addLayer(VIIRS201411, vizParams2, 'VIIRS201411',F);
Map.addLayer(VIIRS201412, vizParams2, 'VIIRS201412',F);
Map.addLayer(VIIRS201501, vizParams2, 'VIIRS201501',F);
Map.addLayer(VIIRS201502, vizParams2, 'VIIRS201502',F);
Map.addLayer(VIIRS201503, vizParams2, 'VIIRS201503',F);
Map.addLayer(VIIRS201504, vizParams2, 'VIIRS201504',F);
Map.addLayer(VIIRS201505, vizParams2, 'VIIRS201505',F);
Map.addLayer(VIIRS201506, vizParams2, 'VIIRS201506',F);
Map.addLayer(VIIRS201507, vizParams2, 'VIIRS201507',F);
Map.addLayer(VIIRS201508, vizParams2, 'VIIRS201508',F);
Map.addLayer(VIIRS201509, vizParams2, 'VIIRS201509',F);
Map.addLayer(VIIRS201510, vizParams2, 'VIIRS201510',F);
Map.addLayer(VIIRS201511, vizParams2, 'VIIRS201511',F);
Map.addLayer(VIIRS201512, vizParams2, 'VIIRS201512',F);
Map.addLayer(VIIRS201601, vizParams2, 'VIIRS201601',F);
Map.addLayer(VIIRS201602, vizParams2, 'VIIRS201602',F);
Map.addLayer(VIIRS201603, vizParams2, 'VIIRS201603',F);
Map.addLayer(VIIRS201604, vizParams2, 'VIIRS201604',F);
Map.addLayer(VIIRS201605, vizParams2, 'VIIRS201605',F);
Map.addLayer(VIIRS201606, vizParams2, 'VIIRS201606',F);
Map.addLayer(VIIRS201607, vizParams2, 'VIIRS201607',F);
Map.addLayer(VIIRS201608, vizParams2, 'VIIRS201608',F);
Map.addLayer(VIIRS201609, vizParams2, 'VIIRS201609',F);
Map.addLayer(VIIRS201610, vizParams2, 'VIIRS201610',F);
Map.addLayer(VIIRS201611, vizParams2, 'VIIRS201611',F);
Map.addLayer(VIIRS201612, vizParams2, 'VIIRS201612',F);
Map.addLayer(VIIRS201701, vizParams2, 'VIIRS201701',F);
Map.addLayer(VIIRS201702, vizParams2, 'VIIRS201702',F);
Map.addLayer(VIIRS201703, vizParams2, 'VIIRS201703',F);
Map.addLayer(VIIRS201704, vizParams2, 'VIIRS201704',F);
Map.addLayer(VIIRS201705, vizParams2, 'VIIRS201705',F);
Map.addLayer(VIIRS201706, vizParams2, 'VIIRS201706',F);
Map.addLayer(VIIRS201707, vizParams2, 'VIIRS201707',F);
Map.addLayer(VIIRS201708, vizParams2, 'VIIRS201708',F);
Map.addLayer(VIIRS201709, vizParams2, 'VIIRS201709',F);
Map.addLayer(VIIRS201710, vizParams2, 'VIIRS201710',F);
Map.addLayer(VIIRS201711, vizParams2, 'VIIRS201711',F);
Map.addLayer(VIIRS201712, vizParams2, 'VIIRS201712',F);
Map.addLayer(VIIRS201801, vizParams2, 'VIIRS201801',F);
Map.addLayer(VIIRS201802, vizParams2, 'VIIRS201802',F);
Map.addLayer(VIIRS201803, vizParams2, 'VIIRS201803',F);
Map.addLayer(VIIRS201804, vizParams2, 'VIIRS201804',F);
Map.addLayer(VIIRS201805, vizParams2, 'VIIRS201805',F);
Map.addLayer(VIIRS201806, vizParams2, 'VIIRS201806',F);
Map.addLayer(VIIRS201807, vizParams2, 'VIIRS201807',F);
Map.addLayer(VIIRS201808, vizParams2, 'VIIRS201808',F);
Map.addLayer(VIIRS201809, vizParams2, 'VIIRS201809',F);
Map.addLayer(VIIRS201810, vizParams2, 'VIIRS201810',F);
Map.addLayer(VIIRS201811, vizParams2, 'VIIRS201811',F);
Map.addLayer(VIIRS201812, vizParams2, 'VIIRS201812',F);
*/
var med=collectionFromConstructor.filterDate('2020-01-01', '2020-05-30').select('avg_rad').reduce(ee.Reducer.median());
var mask1=med.gt(5)
var diff=VIIRS202004.select('avg_rad').subtract(med).divide(med).mask(mask1);
var diff2=VIIRS202005.select('avg_rad').subtract(med).divide(med).mask(mask1);
diff.unmask(0)
Map.addLayer(VIIRS201901, vizParams2, 'VIIRS201901',F);
Map.addLayer(VIIRS201902, vizParams2, 'VIIRS201902',F);
Map.addLayer(VIIRS201903, vizParams2, 'VIIRS201903',F);
Map.addLayer(VIIRS201904, vizParams2, 'VIIRS201904',F);
Map.addLayer(VIIRS201905, vizParams2, 'VIIRS201905',F);
Map.addLayer(VIIRS201906, vizParams2, 'VIIRS201906',F);
Map.addLayer(VIIRS201907, vizParams2, 'VIIRS201907',F);
Map.addLayer(VIIRS201908, vizParams2, 'VIIRS201908',F);
Map.addLayer(VIIRS201909, vizParams2, 'VIIRS201909',F);
Map.addLayer(VIIRS201910, vizParams2, 'VIIRS201910',F);
Map.addLayer(VIIRS201911, vizParams2, 'VIIRS201911',F);
Map.addLayer(VIIRS201912, vizParams2, 'VIIRS201912',F);
Map.addLayer(VIIRS202001, vizParams2, 'VIIRS202001',F);
Map.addLayer(VIIRS202002, vizParams2, 'VIIRS202002',F);
Map.addLayer(VIIRS202003, vizParams2, 'VIIRS202003',F);
Map.addLayer(VIIRS202004, vizParams2, 'VIIRS202004',F);
Map.addLayer(VIIRS202005, vizParams2, 'VIIRS202005',F);
var vis = {min: 1, max: -1, palette: ['#27ff00','#fff700','#ff0606']}
Map.addLayer(diff, vis, 'diff',T);
//Map.addLayer(diff2, vis, 'diff2',T);
/*
var Image= VIIRS201901.select('avg_rad');
Export.image.toDrive({
  image: Image,
  description: 'VIIRS_DNB_Canaryislands201901',
  scale: 500,
  region: geometry,
  fileFormat: 'GeoTIFF'
}); 
*/
//var geo=geometry.visualize({color: 'FF0000'});
var geoLayer = ui.Map.Layer(geometry, {color: '000000'}, 'Anomaly locations').setName('Anomaly locations');
var composite=diff.visualize(vis);
var compositeLayer = ui.Map.Layer(composite).setName('April 2020 VIIRS Anomaly');
//layers.add(diff2, 'May 2020');
var mapPanel = ui.Map();
var layers = mapPanel.layers();
layers.add(compositeLayer, 'April 2020');
var modisOceanColor = collectionFromConstructor.filterDate('2012-01-01', '2020-05-30').select('avg_rad')
var sst= modisOceanColor.select(['avg_rad']).filterDate('2012-01-01', '2020-05-30');
mapPanel.setOptions('SATELLITE');
mapPanel.layers().set(2, geoLayer );
/*
 * Panel setup
 */
// Create a panel to hold title, intro text, chart and legend components.
var inspectorPanel = ui.Panel({style: {width: '30%'}});
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'COVID-19 VIIRS Radiance - Time Series Inspector',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
  ui.Label('Click a location to see its time series radiance')
]);
inspectorPanel.add(intro);
// Create panels to hold lon/lat values.
var lon = ui.Label();
var lat = ui.Label();
inspectorPanel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
// Add placeholders for the chart and legend.
inspectorPanel.add(ui.Label('[Chart]'));
inspectorPanel.add(ui.Label('[Legend]'));
/*
 * Chart setup
 */
// Generates a new time series chart of SST for the given coordinates.
var generateChart = function (coords) {
  // Update the lon/lat panel with values from the click event.
  lon.setValue('lon: ' + coords.lon.toFixed(2));
  lat.setValue('lat: ' + coords.lat.toFixed(2));
  // Add a dot for the point clicked on.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point, {color: '000000'}, 'clicked location');
  // Add the dot as the second layer, so it shows up on top of the composite.
  mapPanel.layers().set(1, dot);
  // Make a chart from the time series.
  var sstChart = ui.Chart.image.series(sst, point, ee.Reducer.median(), 500);
  // Customize the chart.
  sstChart.setOptions({
    title: 'Radiance of VIIRS',
    vAxis: {title: 'nw/cm2/sr'},
    hAxis: {title: 'Date', format: 'MM-yy', gridlines: {count: 7}},
    series: {
      0: {
        color: 'blue',
        lineWidth: 0,
        pointsVisible: true,
        pointSize: 2,
      },
    },
    legend: {position: 'right'},
  });
  // Add the chart at a fixed position, so that new charts overwrite older ones.
  inspectorPanel.widgets().set(2, sstChart);
};
/*
 * Legend setup
 */
// Creates a color bar thumbnail image for use in legend from the given color
// palette.
function makeColorBarParams(palette) {
  return {
    bbox: [0, 0, 1, 0.1],
    dimensions: '100x10',
    format: 'png',
    min: 0,
    max: 1,
    palette: palette,
  };
}
// Create the color bar for the legend.
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(vis.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
// Create a panel with three numbers for the legend.
var legendLabels = ui.Panel({
  widgets: [
    ui.Label(vis.min*100, {margin: '4px 8px'}),
    ui.Label(
        (0),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(vis.max*100, {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
var legendTitle = ui.Label({
  value: 'Map Legend: Variation rate(%)',
  style: {fontWeight: 'bold'}
});
var legendPanel = ui.Panel([legendTitle, colorBar, legendLabels]);
inspectorPanel.widgets().set(3, legendPanel);
var inspector1 = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical')
});
  inspector1.style().set({
  width: '200px',
  position: 'bottom-right'});
// Add a label to the panel.
inspectorPanel.add(ui.Label('Tool provided by the EMISSI@n project and SkyQuality IAA-CSIC'));
inspectorPanel.add(ui.Label('Grants: AYA2017-89637-R, NERC grant NE/P01156X/1; SEV- 2017-0709'));
inspectorPanel.add(ui.Label('Institutions:'));
inspectorPanel.add(ui.Label('University of Exeter/U. Complutense de Madrid/IAA-CSIC'));
inspectorPanel.add(ui.Label('Source images from Earth Observation Group (EOG) Colorado School of Mines and SNPP/VIIRS-DNB'));
inspectorPanel.add(ui.Label('Cite and credit of current version: Bustamante-Calabria, M., Sánchez de Miguel, A., Martín-Ruiz, S., Ortiz, J. L., Vílchez, J. M., Pelegrina, A., ... & Gaston, K. J. (2021). Effects of the COVID-19 lockdown on urban light emissions: ground and satellite comparison. Remote Sensing, 13(2), 258.'));
//Map.add(inspector1);
/*
 * Map setup
 */
// Register a callback on the default map to be invoked when the map is clicked.
mapPanel.onClick(generateChart);
// Configure the map.
mapPanel.style().set('cursor', 'crosshair');
// Initialize with a test point.
var initialPoint = ee.Geometry.Point(-3.6053, 37.169);
mapPanel.centerObject(initialPoint, 8);
/*
 * Initialize the app
 */
// Replace the root with a SplitPanel that contains the inspector and map.
ui.root.clear();
ui.root.add(ui.SplitPanel(inspectorPanel, mapPanel));
generateChart({
  lon: initialPoint.coordinates().get(0).getInfo(),
  lat: initialPoint.coordinates().get(1).getInfo()
});