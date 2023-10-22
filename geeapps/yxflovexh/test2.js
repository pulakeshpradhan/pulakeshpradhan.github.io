var l8_col = ui.import && ui.import("l8_col", "imageCollection", {
      "id": "LANDSAT/LC08/C01/T1_SR"
    }) || ee.ImageCollection("LANDSAT/LC08/C01/T1_SR"),
    l7_col = ui.import && ui.import("l7_col", "imageCollection", {
      "id": "LANDSAT/LE07/C01/T1_SR"
    }) || ee.ImageCollection("LANDSAT/LE07/C01/T1_SR"),
    S2_L1 = ui.import && ui.import("S2_L1", "imageCollection", {
      "id": "COPERNICUS/S2"
    }) || ee.ImageCollection("COPERNICUS/S2"),
    S2_l2 = ui.import && ui.import("S2_l2", "imageCollection", {
      "id": "COPERNICUS/S2_SR"
    }) || ee.ImageCollection("COPERNICUS/S2_SR"),
    sd_shp = ui.import && ui.import("sd_shp", "table", {
      "id": "users/yxflovexh/project/shandong_shp"
    }) || ee.FeatureCollection("users/yxflovexh/project/shandong_shp"),
    Lucc_sd = ui.import && ui.import("Lucc_sd", "image", {
      "id": "users/yxflovexh/project/LUCC_shandong"
    }) || ee.Image("users/yxflovexh/project/LUCC_shandong"),
    soil_p = ui.import && ui.import("soil_p", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            119.06388621029849,
            37.69990965705485
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.1605315655231,
            37.67654447422421
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.19503550229068,
            37.69434071774675
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.22078470883365,
            37.66608209440174
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.22713617978091,
            37.73535090142238
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.2429290264606,
            37.71729292226485
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.12427505458385,
            37.669625148615175
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.01029190028697,
            37.64135711143042
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.98007949794322,
            37.60872677461977
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.9512403866151,
            37.56356453387982
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.92858108485729,
            37.50203455688768
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.1270216366151,
            37.79344252509911
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.16066726649791,
            37.793985127658864
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.20735916102916,
            37.81134630539642
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.2753370663026,
            37.784217671900294
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.26297744716197,
            37.77064961941047
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.33717678372776,
            37.125782034185356
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.39348171536838,
            37.12961423408392
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.45424984280979,
            37.13125654606703
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.284991725134,
            37.11318915406841
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.16654537503635,
            37.17202919284234
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.49596095951054,
            38.06141025657593
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.63260341556523,
            38.11167162947565
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.77473903568242,
            38.09600243592145
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.75070644290898,
            38.09005806966506
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.56805873783085,
            38.056003750514414
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.62642360599492,
            38.104647923793635
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.77267909915898,
            38.11869465981848
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.59346462161992,
            38.08465368082872
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.51175380619023,
            38.06735695189376
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.24876857669804,
            38.15811913072243
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "class": 1
      },
      "color": "#98ff00",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #98ff00 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([119.06388621029849, 37.69990965705485]),
            {
              "class": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([119.1605315655231, 37.67654447422421]),
            {
              "class": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([119.19503550229068, 37.69434071774675]),
            {
              "class": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([119.22078470883365, 37.66608209440174]),
            {
              "class": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([119.22713617978091, 37.73535090142238]),
            {
              "class": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([119.2429290264606, 37.71729292226485]),
            {
              "class": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([119.12427505458385, 37.669625148615175]),
            {
              "class": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([119.01029190028697, 37.64135711143042]),
            {
              "class": 1,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([118.98007949794322, 37.60872677461977]),
            {
              "class": 1,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([118.9512403866151, 37.56356453387982]),
            {
              "class": 1,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([118.92858108485729, 37.50203455688768]),
            {
              "class": 1,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([119.1270216366151, 37.79344252509911]),
            {
              "class": 1,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([119.16066726649791, 37.793985127658864]),
            {
              "class": 1,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([119.20735916102916, 37.81134630539642]),
            {
              "class": 1,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([119.2753370663026, 37.784217671900294]),
            {
              "class": 1,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([119.26297744716197, 37.77064961941047]),
            {
              "class": 1,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([119.33717678372776, 37.125782034185356]),
            {
              "class": 1,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([119.39348171536838, 37.12961423408392]),
            {
              "class": 1,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([119.45424984280979, 37.13125654606703]),
            {
              "class": 1,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([119.284991725134, 37.11318915406841]),
            {
              "class": 1,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([119.16654537503635, 37.17202919284234]),
            {
              "class": 1,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([118.49596095951054, 38.06141025657593]),
            {
              "class": 1,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([118.63260341556523, 38.11167162947565]),
            {
              "class": 1,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([118.77473903568242, 38.09600243592145]),
            {
              "class": 1,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([118.75070644290898, 38.09005806966506]),
            {
              "class": 1,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([118.56805873783085, 38.056003750514414]),
            {
              "class": 1,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([118.62642360599492, 38.104647923793635]),
            {
              "class": 1,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([118.77267909915898, 38.11869465981848]),
            {
              "class": 1,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([118.59346462161992, 38.08465368082872]),
            {
              "class": 1,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([118.51175380619023, 38.06735695189376]),
            {
              "class": 1,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([118.24876857669804, 38.15811913072243]),
            {
              "class": 1,
              "system:index": "30"
            })]),
    isa_p2 = ui.import && ui.import("isa_p2", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            120.14462346704842,
            36.363580550130756
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            120.14670486124398,
            36.363217685296256
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            120.13855119749516,
            36.36239691335717
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            120.14546056791752,
            36.36226731699653
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            120.14483293100804,
            36.36218091930284
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            116.94800845260582,
            36.649848409642054
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            116.95530406112633,
            36.648126844702986
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.03169337387047,
            36.64792025432413
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            116.87857142562828,
            36.652396255123094
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            116.74046642790661,
            36.87888566605674
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            116.74090094576702,
            36.87824629999092
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            116.74176998148785,
            36.876928931556336
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.12015887345717,
            36.18541002221078
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.12193986024306,
            36.18520219733914
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.12154825772689,
            36.18384699246724
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.12171991910384,
            36.18331875929754
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.11706896867202,
            36.184271308335035
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.118506632704,
            36.18421935141351
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.12518533315108,
            36.18398987459776
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.98770220697503,
            36.45571139473094
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.98830168068986,
            36.45576101364362
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.98837946475129,
            36.45550968273736
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            116.62226004171521,
            35.41880975711161
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            116.57003206777722,
            35.4282520019327
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.53007063931028,
            34.85457442917875
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.54393229549925,
            34.84953830755224
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.55436072414915,
            34.85534918976113
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.05374432504021,
            36.793232364921785
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.03775483600441,
            36.826938870812036
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.04100835553947,
            36.82637850874555
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.40900572546188,
            36.27355378717188
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.40835663088028,
            36.27199684306659
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            120.02666387903281,
            35.890756399147776
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            120.0199798141677,
            35.89292932402996
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            120.0175658260543,
            35.892911940867556
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            120.0120190178115,
            35.89199062779739
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.53121912202123,
            35.41804243767285
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.53711998185399,
            35.41524449630969
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.30888019865847,
            35.273259821520384
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.45575007286322,
            34.867143240652034
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.45777782287848,
            34.86513177768552
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.18974373035284,
            35.147444261366324
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            122.08481124465341,
            37.52234722162609
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            122.08664051120157,
            37.5217941209352
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            122.08762219970102,
            37.52099849967339
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            122.08973578040475,
            37.519475308027786
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            122.08562431942843,
            37.518637693593924
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            122.09081707608127,
            37.51430190966677
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            122.3186407250935,
            37.057395464910876
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            120.68513867805721,
            36.96346450484944
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            120.70453641365292,
            36.96406458063273
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            120.70691821525814,
            36.9605154922678
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.93765900575396,
            37.17606322045781
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.93601212941881,
            37.17599910631969
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.93557492934939,
            37.17598842062471
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.98268252768099,
            37.36863023470411
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.98422748007357,
            37.3738995568786
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.98978501715243,
            37.372739996707146
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.00547057547152,
            37.368340325978984
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.96637469687045,
            37.37521256660865
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.6899592302883,
            37.44607635716944
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.6901952646816,
            37.447813988805684
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.70373505578878,
            37.44701332041853
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.67255705819967,
            37.44844429618856
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.48837581834343,
            35.240795148419856
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.48706690034416,
            35.24090468094641
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.48966059646156,
            35.24005689533211
          ]
        },
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                117.14545505697546,
                34.9801121041264
              ],
              [
                117.14545505697546,
                34.97943521869895
              ],
              [
                117.14738624746619,
                34.97943521869895
              ],
              [
                117.14738624746619,
                34.9801121041264
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
                115.49869154743429,
                36.53614257020191
              ],
              [
                115.49869154743429,
                36.53490121959983
              ],
              [
                115.50119136623617,
                36.53490121959983
              ],
              [
                115.50119136623617,
                36.53614257020191
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
                115.49530555857,
                36.527000758632276
              ],
              [
                115.49530555857,
                36.52548337029264
              ],
              [
                115.49639989984807,
                36.52548337029264
              ],
              [
                115.49639989984807,
                36.527000758632276
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
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
        "class": 2
      },
      "color": "#0b4a8b",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #0b4a8b */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
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
            ee.Geometry.Point([120.14462346704842, 36.363580550130756]),
            {
              "class": 2,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([120.14670486124398, 36.363217685296256]),
            {
              "class": 2,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([120.13855119749516, 36.36239691335717]),
            {
              "class": 2,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([120.14546056791752, 36.36226731699653]),
            {
              "class": 2,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([120.14483293100804, 36.36218091930284]),
            {
              "class": 2,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([116.94800845260582, 36.649848409642054]),
            {
              "class": 2,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([116.95530406112633, 36.648126844702986]),
            {
              "class": 2,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([117.03169337387047, 36.64792025432413]),
            {
              "class": 2,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([116.87857142562828, 36.652396255123094]),
            {
              "class": 2,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([116.74046642790661, 36.87888566605674]),
            {
              "class": 2,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([116.74090094576702, 36.87824629999092]),
            {
              "class": 2,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([116.74176998148785, 36.876928931556336]),
            {
              "class": 2,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([117.12015887345717, 36.18541002221078]),
            {
              "class": 2,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([117.12193986024306, 36.18520219733914]),
            {
              "class": 2,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([117.12154825772689, 36.18384699246724]),
            {
              "class": 2,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([117.12171991910384, 36.18331875929754]),
            {
              "class": 2,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([117.11706896867202, 36.184271308335035]),
            {
              "class": 2,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([117.118506632704, 36.18421935141351]),
            {
              "class": 2,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([117.12518533315108, 36.18398987459776]),
            {
              "class": 2,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([115.98770220697503, 36.45571139473094]),
            {
              "class": 2,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([115.98830168068986, 36.45576101364362]),
            {
              "class": 2,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([115.98837946475129, 36.45550968273736]),
            {
              "class": 2,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([116.62226004171521, 35.41880975711161]),
            {
              "class": 2,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([116.57003206777722, 35.4282520019327]),
            {
              "class": 2,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([117.53007063931028, 34.85457442917875]),
            {
              "class": 2,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([117.54393229549925, 34.84953830755224]),
            {
              "class": 2,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([117.55436072414915, 34.85534918976113]),
            {
              "class": 2,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([118.05374432504021, 36.793232364921785]),
            {
              "class": 2,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([118.03775483600441, 36.826938870812036]),
            {
              "class": 2,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([118.04100835553947, 36.82637850874555]),
            {
              "class": 2,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([119.40900572546188, 36.27355378717188]),
            {
              "class": 2,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([119.40835663088028, 36.27199684306659]),
            {
              "class": 2,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([120.02666387903281, 35.890756399147776]),
            {
              "class": 2,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([120.0199798141677, 35.89292932402996]),
            {
              "class": 2,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([120.0175658260543, 35.892911940867556]),
            {
              "class": 2,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([120.0120190178115, 35.89199062779739]),
            {
              "class": 2,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([119.53121912202123, 35.41804243767285]),
            {
              "class": 2,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([119.53711998185399, 35.41524449630969]),
            {
              "class": 2,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([119.30888019865847, 35.273259821520384]),
            {
              "class": 2,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([117.45575007286322, 34.867143240652034]),
            {
              "class": 2,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([117.45777782287848, 34.86513177768552]),
            {
              "class": 2,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([118.18974373035284, 35.147444261366324]),
            {
              "class": 2,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([122.08481124465341, 37.52234722162609]),
            {
              "class": 2,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([122.08664051120157, 37.5217941209352]),
            {
              "class": 2,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([122.08762219970102, 37.52099849967339]),
            {
              "class": 2,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([122.08973578040475, 37.519475308027786]),
            {
              "class": 2,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([122.08562431942843, 37.518637693593924]),
            {
              "class": 2,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([122.09081707608127, 37.51430190966677]),
            {
              "class": 2,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([122.3186407250935, 37.057395464910876]),
            {
              "class": 2,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([120.68513867805721, 36.96346450484944]),
            {
              "class": 2,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([120.70453641365292, 36.96406458063273]),
            {
              "class": 2,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([120.70691821525814, 36.9605154922678]),
            {
              "class": 2,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([119.93765900575396, 37.17606322045781]),
            {
              "class": 2,
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Point([119.93601212941881, 37.17599910631969]),
            {
              "class": 2,
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Point([119.93557492934939, 37.17598842062471]),
            {
              "class": 2,
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Point([117.98268252768099, 37.36863023470411]),
            {
              "class": 2,
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Point([117.98422748007357, 37.3738995568786]),
            {
              "class": 2,
              "system:index": "56"
            }),
        ee.Feature(
            ee.Geometry.Point([117.98978501715243, 37.372739996707146]),
            {
              "class": 2,
              "system:index": "57"
            }),
        ee.Feature(
            ee.Geometry.Point([118.00547057547152, 37.368340325978984]),
            {
              "class": 2,
              "system:index": "58"
            }),
        ee.Feature(
            ee.Geometry.Point([117.96637469687045, 37.37521256660865]),
            {
              "class": 2,
              "system:index": "59"
            }),
        ee.Feature(
            ee.Geometry.Point([118.6899592302883, 37.44607635716944]),
            {
              "class": 2,
              "system:index": "60"
            }),
        ee.Feature(
            ee.Geometry.Point([118.6901952646816, 37.447813988805684]),
            {
              "class": 2,
              "system:index": "61"
            }),
        ee.Feature(
            ee.Geometry.Point([118.70373505578878, 37.44701332041853]),
            {
              "class": 2,
              "system:index": "62"
            }),
        ee.Feature(
            ee.Geometry.Point([118.67255705819967, 37.44844429618856]),
            {
              "class": 2,
              "system:index": "63"
            }),
        ee.Feature(
            ee.Geometry.Point([115.48837581834343, 35.240795148419856]),
            {
              "class": 2,
              "system:index": "64"
            }),
        ee.Feature(
            ee.Geometry.Point([115.48706690034416, 35.24090468094641]),
            {
              "class": 2,
              "system:index": "65"
            }),
        ee.Feature(
            ee.Geometry.Point([115.48966059646156, 35.24005689533211]),
            {
              "class": 2,
              "system:index": "66"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[117.14545505697546, 34.9801121041264],
                  [117.14545505697546, 34.97943521869895],
                  [117.14738624746619, 34.97943521869895],
                  [117.14738624746619, 34.9801121041264]]], null, false),
            {
              "class": 2,
              "system:index": "67"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[115.49869154743429, 36.53614257020191],
                  [115.49869154743429, 36.53490121959983],
                  [115.50119136623617, 36.53490121959983],
                  [115.50119136623617, 36.53614257020191]]], null, false),
            {
              "class": 2,
              "system:index": "68"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[115.49530555857, 36.527000758632276],
                  [115.49530555857, 36.52548337029264],
                  [115.49639989984807, 36.52548337029264],
                  [115.49639989984807, 36.527000758632276]]], null, false),
            {
              "class": 2,
              "system:index": "69"
            })]),
    water_p = ui.import && ui.import("water_p", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            122.28840061628715,
            37.28132945747588
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            122.29818531477348,
            37.2758658206354
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            120.43730613941054,
            36.95744045728389
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            120.23508903735976,
            36.96896199752857
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.476028481908,
            36.437524914078445
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            116.81649359173873,
            35.05127503760495
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.20376165814498,
            34.61391157698837
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            116.19963913726036,
            35.95966307598836
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.88923232019873,
            36.3890747900394
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.87869660318823,
            36.39104395263862
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.76790402271654,
            37.59794219665334
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.8320803460534,
            37.361739007299676
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.37249906856452,
            35.07002420348975
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.00394415427404,
            36.76234425465461
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.84135017603231,
            35.82283925650862
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.8828690459018,
            35.33178444254364
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "class": 3
      },
      "color": "#11d6d2",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #11d6d2 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([122.28840061628715, 37.28132945747588]),
            {
              "class": 3,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([122.29818531477348, 37.2758658206354]),
            {
              "class": 3,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([120.43730613941054, 36.95744045728389]),
            {
              "class": 3,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([120.23508903735976, 36.96896199752857]),
            {
              "class": 3,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([119.476028481908, 36.437524914078445]),
            {
              "class": 3,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([116.81649359173873, 35.05127503760495]),
            {
              "class": 3,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([117.20376165814498, 34.61391157698837]),
            {
              "class": 3,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([116.19963913726036, 35.95966307598836]),
            {
              "class": 3,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([117.88923232019873, 36.3890747900394]),
            {
              "class": 3,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([117.87869660318823, 36.39104395263862]),
            {
              "class": 3,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([118.76790402271654, 37.59794219665334]),
            {
              "class": 3,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([118.8320803460534, 37.361739007299676]),
            {
              "class": 3,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([118.37249906856452, 35.07002420348975]),
            {
              "class": 3,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([117.00394415427404, 36.76234425465461]),
            {
              "class": 3,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([118.84135017603231, 35.82283925650862]),
            {
              "class": 3,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([118.8828690459018, 35.33178444254364]),
            {
              "class": 3,
              "system:index": "15"
            })]),
    pg_p2 = ui.import && ui.import("pg_p2", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            118.8306809693524,
            36.86477532933002
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.83226347267119,
            36.864489922623456
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.86977838593019,
            36.8704193813064
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.8711141260196,
            36.87050091986006
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.88001679852404,
            36.86172722374422
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.88185947611727,
            36.86132162929511
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.88246668687059,
            36.88582391110454
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.88622714390947,
            36.885442043226654
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.88715518822862,
            36.885360520623315
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.89989576524816,
            36.891006061628595
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.90212199873052,
            36.89143509525743
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.93264323798353,
            36.85913884689319
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.9243176612013,
            36.857044254487796
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.93279344168836,
            36.86358537325903
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.79387173253082,
            36.81341968648462
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.78183397847198,
            36.81238895033414
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.81464275914215,
            36.80945127616692
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.83055578801095,
            36.79035566835335
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.83130680653512,
            36.79138670108973
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.77489624377897,
            36.76637079371523
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.77360878345182,
            36.76636005035661
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.77440003511121,
            36.76563809320855
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.75890491363218,
            36.76325730540247
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.77437589523008,
            36.759853595919544
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.81242319808288,
            36.73300639147647
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.81371334061905,
            36.73291825757622
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.81496325001999,
            36.73290106070585
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.77489006865387,
            36.7009106076327
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.77707875121003,
            36.70266539917967
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.77896702635651,
            36.69662668352962
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.77767956602936,
            36.6943900017925
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.72371449143533,
            36.692487604612545
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.72982992798929,
            36.69432001327036
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.73108520180826,
            36.69135200549847
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.72187986046914,
            36.691265974579125
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.73535527855996,
            36.69580827548659
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.72870340020303,
            36.68272262496219
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.72200860650186,
            36.682997954150025
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.71797456414346,
            36.68304957826301
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.71449842126016,
            36.6828774977516
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.73904599816446,
            36.680382287073755
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.73119249016885,
            36.67988323522515
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.74730720193033,
            36.687902090174305
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.74297275216226,
            36.67881628593002
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.72720136315469,
            36.679229300315875
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.72863902718667,
            36.67721583424055
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.74108447701578,
            36.67761164797242
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.75061168343667,
            36.675408832638624
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.74387397439126,
            36.66959172023202
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.70789086435518,
            36.66355725380631
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.70943045232973,
            36.663935925495174
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.7096772155591,
            36.66316136777605
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.73117972582695,
            36.64690939724424
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.73231698244926,
            36.64603137042723
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.73312164515373,
            36.64479178611551
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.72565437525627,
            36.64474874463519
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.7239484903228,
            36.64464544498431
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.73163033694145,
            36.640375604875544
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.73261738985893,
            36.64028090815818
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.72673798769829,
            36.640694129343295
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.72386265963432,
            36.64063386805851
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.73097587794182,
            36.638051197266435
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.73462368220207,
            36.63793927957486
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.73657633036491,
            36.63783597079218
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.73171616762993,
            36.636303540914945
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.78832124462956,
            36.600641926368894
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.79129313221806,
            36.599806438980245
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.79694722882145,
            36.5992637979946
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.80114220372074,
            36.59938438521013
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.77672398909023,
            36.64103407000111
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.77427781446865,
            36.64058641559263
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.7838693939059,
            36.640233455474856
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.7873455367892,
            36.640233455474856
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.78207666026064,
            36.64362948006522
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.77198082552859,
            36.644817433355335
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.77727014170596,
            36.64737041548343
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.78463012324282,
            36.6479299338055
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.77424460993716,
            36.649324407933044
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.76934153185793,
            36.64832589816175
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.77068263636538,
            36.6527393043012
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.7695882950873,
            36.65252411886704
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.78484469996401,
            36.65369472036634
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.7725292789987,
            36.65701714606773
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.76957080245528,
            36.657049422037666
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.26551041097032,
            36.37383159271548
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.2659020134865,
            36.37319450216797
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.2646067261453,
            36.372907269807875
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.54955128582692,
            36.02647453628836
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.06932092357546,
            36.49438392375111
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.07044745136172,
            36.49370253991046
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.36346669228557,
            35.44512778668547
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.3634720567036,
            35.445997459215214
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.36204761363514,
            35.447950846446915
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.3432439643798,
            35.44546275541848
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.3430293876586,
            35.444964548894646
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.7026050518414,
            35.07899572866699
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.70153216823545,
            35.07891012308418
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.70475886568036,
            35.07905279900561
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.17548777401203,
            36.08594700246918
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.17536975681537,
            36.08536391986135
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.17723389208072,
            36.08521002001303
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.5558942921005,
            36.829133274610626
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.56034675906523,
            36.82805981125025
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.57132235835417,
            36.82595577937466
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.5636190540634,
            36.8258355472342
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.5626641876541,
            36.82573249096347
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.57214847873075,
            36.81923966609112
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.55279897063201,
            36.79790668759197
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.56361030315487,
            36.79537906119751
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.5826303573117,
            36.794122586380944
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.57916494326446,
            36.79411399480563
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.58734568075988,
            36.79245580273204
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.59902261413391,
            36.634862383550285
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.60302178777512,
            36.63289080497904
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.60477863467987,
            36.63321151278914
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.60563157714661,
            36.63217189805844
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.60883744924939,
            36.62861967904529
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.61192016829949,
            36.62767021571154
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.61432610978585,
            36.62592232390626
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.61396140739106,
            36.62449728918673
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.61579603835725,
            36.62399572236
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.61739641060124,
            36.659789505778996
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.61761098732244,
            36.66142474567417
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.62398391594182,
            36.66130425549897
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.62741714348088,
            36.656252104849194
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.62713819374333,
            36.6544273965451
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.62611895431768,
            36.651302913514684
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.63475135369764,
            36.65680869646849
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.64811948342786,
            36.657867344092246
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.64307693047986,
            36.66044074387029
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.66579388755524,
            37.4061043840128
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.66573487895691,
            37.40538849480051
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.66391634124481,
            37.40535440466738
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.6685780205127,
            37.40500924119612
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.66295611041748,
            37.40405044543289
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.66581534522736,
            37.402507823833766
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.66444205421173,
            37.40097795502712
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.64968130705353,
            37.394802749798636
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.64917705175873,
            37.39627307971487
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.65596840498443,
            37.39481979726729
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.64969203588959,
            37.39362220316387
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.64475677130218,
            37.39356679799137
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.64652166483398,
            37.392373445874284
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.64482114431854,
            37.392202965449506
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.63809952852722,
            37.38906179424111
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.63127598879333,
            37.38601852592072
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.62999925730225,
            37.386333940420165
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.62845430490967,
            37.386333940420165
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.62850794908996,
            37.387689355193366
          ]
        },
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                118.78227035595097,
                36.62530077890594
              ],
              [
                118.78227035595097,
                36.62409530346572
              ],
              [
                118.7830857474915,
                36.62409530346572
              ],
              [
                118.7830857474915,
                36.62530077890594
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
                118.79618893629197,
                36.61962969295141
              ],
              [
                118.79618893629197,
                36.61787300751557
              ],
              [
                118.7968970394719,
                36.61787300751557
              ],
              [
                118.7968970394719,
                36.61962969295141
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
                118.71025660267534,
                36.68420102646405
              ],
              [
                118.71025660267534,
                36.6823167521
              ],
              [
                118.71217706433,
                36.6823167521
              ],
              [
                118.71217706433,
                36.68420102646405
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
                118.70771421096906,
                36.64942281287628
              ],
              [
                118.70771421096906,
                36.647597942732055
              ],
              [
                118.70923770568952,
                36.647597942732055
              ],
              [
                118.70923770568952,
                36.64942281287628
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
                118.74950215195882,
                36.662677697000326
              ],
              [
                118.74950215195882,
                36.660784288976295
              ],
              [
                118.7519483265804,
                36.660784288976295
              ],
              [
                118.7519483265804,
                36.662677697000326
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
                118.74202713596348,
                36.696013079648615
              ],
              [
                118.74202713596348,
                36.69489473798812
              ],
              [
                118.7446235142899,
                36.69489473798812
              ],
              [
                118.7446235142899,
                36.696013079648615
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
                118.7418501101685,
                36.69914865085929
              ],
              [
                118.7418501101685,
                36.69763464616028
              ],
              [
                118.74579832183842,
                36.69763464616028
              ],
              [
                118.74579832183842,
                36.69914865085929
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
                118.8965353173684,
                36.895160401581535
              ],
              [
                118.8965353173684,
                36.89361165440963
              ],
              [
                118.90040306276788,
                36.89361165440963
              ],
              [
                118.90040306276788,
                36.895160401581535
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
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
        },
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
        "class": 7
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
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
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
      },
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
            ee.Geometry.Point([118.8306809693524, 36.86477532933002]),
            {
              "class": 7,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([118.83226347267119, 36.864489922623456]),
            {
              "class": 7,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([118.86977838593019, 36.8704193813064]),
            {
              "class": 7,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([118.8711141260196, 36.87050091986006]),
            {
              "class": 7,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([118.88001679852404, 36.86172722374422]),
            {
              "class": 7,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([118.88185947611727, 36.86132162929511]),
            {
              "class": 7,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([118.88246668687059, 36.88582391110454]),
            {
              "class": 7,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([118.88622714390947, 36.885442043226654]),
            {
              "class": 7,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([118.88715518822862, 36.885360520623315]),
            {
              "class": 7,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([118.89989576524816, 36.891006061628595]),
            {
              "class": 7,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([118.90212199873052, 36.89143509525743]),
            {
              "class": 7,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([118.93264323798353, 36.85913884689319]),
            {
              "class": 7,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([118.9243176612013, 36.857044254487796]),
            {
              "class": 7,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([118.93279344168836, 36.86358537325903]),
            {
              "class": 7,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([118.79387173253082, 36.81341968648462]),
            {
              "class": 7,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([118.78183397847198, 36.81238895033414]),
            {
              "class": 7,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([118.81464275914215, 36.80945127616692]),
            {
              "class": 7,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([118.83055578801095, 36.79035566835335]),
            {
              "class": 7,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([118.83130680653512, 36.79138670108973]),
            {
              "class": 7,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([118.77489624377897, 36.76637079371523]),
            {
              "class": 7,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([118.77360878345182, 36.76636005035661]),
            {
              "class": 7,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([118.77440003511121, 36.76563809320855]),
            {
              "class": 7,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([118.75890491363218, 36.76325730540247]),
            {
              "class": 7,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([118.77437589523008, 36.759853595919544]),
            {
              "class": 7,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([118.81242319808288, 36.73300639147647]),
            {
              "class": 7,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([118.81371334061905, 36.73291825757622]),
            {
              "class": 7,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([118.81496325001999, 36.73290106070585]),
            {
              "class": 7,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([118.77489006865387, 36.7009106076327]),
            {
              "class": 7,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([118.77707875121003, 36.70266539917967]),
            {
              "class": 7,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([118.77896702635651, 36.69662668352962]),
            {
              "class": 7,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([118.77767956602936, 36.6943900017925]),
            {
              "class": 7,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([118.72371449143533, 36.692487604612545]),
            {
              "class": 7,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([118.72982992798929, 36.69432001327036]),
            {
              "class": 7,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([118.73108520180826, 36.69135200549847]),
            {
              "class": 7,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([118.72187986046914, 36.691265974579125]),
            {
              "class": 7,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([118.73535527855996, 36.69580827548659]),
            {
              "class": 7,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([118.72870340020303, 36.68272262496219]),
            {
              "class": 7,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([118.72200860650186, 36.682997954150025]),
            {
              "class": 7,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([118.71797456414346, 36.68304957826301]),
            {
              "class": 7,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([118.71449842126016, 36.6828774977516]),
            {
              "class": 7,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([118.73904599816446, 36.680382287073755]),
            {
              "class": 7,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([118.73119249016885, 36.67988323522515]),
            {
              "class": 7,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([118.74730720193033, 36.687902090174305]),
            {
              "class": 7,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([118.74297275216226, 36.67881628593002]),
            {
              "class": 7,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([118.72720136315469, 36.679229300315875]),
            {
              "class": 7,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([118.72863902718667, 36.67721583424055]),
            {
              "class": 7,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([118.74108447701578, 36.67761164797242]),
            {
              "class": 7,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([118.75061168343667, 36.675408832638624]),
            {
              "class": 7,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([118.74387397439126, 36.66959172023202]),
            {
              "class": 7,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([118.70789086435518, 36.66355725380631]),
            {
              "class": 7,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([118.70943045232973, 36.663935925495174]),
            {
              "class": 7,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([118.7096772155591, 36.66316136777605]),
            {
              "class": 7,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([118.73117972582695, 36.64690939724424]),
            {
              "class": 7,
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Point([118.73231698244926, 36.64603137042723]),
            {
              "class": 7,
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Point([118.73312164515373, 36.64479178611551]),
            {
              "class": 7,
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Point([118.72565437525627, 36.64474874463519]),
            {
              "class": 7,
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Point([118.7239484903228, 36.64464544498431]),
            {
              "class": 7,
              "system:index": "56"
            }),
        ee.Feature(
            ee.Geometry.Point([118.73163033694145, 36.640375604875544]),
            {
              "class": 7,
              "system:index": "57"
            }),
        ee.Feature(
            ee.Geometry.Point([118.73261738985893, 36.64028090815818]),
            {
              "class": 7,
              "system:index": "58"
            }),
        ee.Feature(
            ee.Geometry.Point([118.72673798769829, 36.640694129343295]),
            {
              "class": 7,
              "system:index": "59"
            }),
        ee.Feature(
            ee.Geometry.Point([118.72386265963432, 36.64063386805851]),
            {
              "class": 7,
              "system:index": "60"
            }),
        ee.Feature(
            ee.Geometry.Point([118.73097587794182, 36.638051197266435]),
            {
              "class": 7,
              "system:index": "61"
            }),
        ee.Feature(
            ee.Geometry.Point([118.73462368220207, 36.63793927957486]),
            {
              "class": 7,
              "system:index": "62"
            }),
        ee.Feature(
            ee.Geometry.Point([118.73657633036491, 36.63783597079218]),
            {
              "class": 7,
              "system:index": "63"
            }),
        ee.Feature(
            ee.Geometry.Point([118.73171616762993, 36.636303540914945]),
            {
              "class": 7,
              "system:index": "64"
            }),
        ee.Feature(
            ee.Geometry.Point([118.78832124462956, 36.600641926368894]),
            {
              "class": 7,
              "system:index": "65"
            }),
        ee.Feature(
            ee.Geometry.Point([118.79129313221806, 36.599806438980245]),
            {
              "class": 7,
              "system:index": "66"
            }),
        ee.Feature(
            ee.Geometry.Point([118.79694722882145, 36.5992637979946]),
            {
              "class": 7,
              "system:index": "67"
            }),
        ee.Feature(
            ee.Geometry.Point([118.80114220372074, 36.59938438521013]),
            {
              "class": 7,
              "system:index": "68"
            }),
        ee.Feature(
            ee.Geometry.Point([118.77672398909023, 36.64103407000111]),
            {
              "class": 7,
              "system:index": "69"
            }),
        ee.Feature(
            ee.Geometry.Point([118.77427781446865, 36.64058641559263]),
            {
              "class": 7,
              "system:index": "70"
            }),
        ee.Feature(
            ee.Geometry.Point([118.7838693939059, 36.640233455474856]),
            {
              "class": 7,
              "system:index": "71"
            }),
        ee.Feature(
            ee.Geometry.Point([118.7873455367892, 36.640233455474856]),
            {
              "class": 7,
              "system:index": "72"
            }),
        ee.Feature(
            ee.Geometry.Point([118.78207666026064, 36.64362948006522]),
            {
              "class": 7,
              "system:index": "73"
            }),
        ee.Feature(
            ee.Geometry.Point([118.77198082552859, 36.644817433355335]),
            {
              "class": 7,
              "system:index": "74"
            }),
        ee.Feature(
            ee.Geometry.Point([118.77727014170596, 36.64737041548343]),
            {
              "class": 7,
              "system:index": "75"
            }),
        ee.Feature(
            ee.Geometry.Point([118.78463012324282, 36.6479299338055]),
            {
              "class": 7,
              "system:index": "76"
            }),
        ee.Feature(
            ee.Geometry.Point([118.77424460993716, 36.649324407933044]),
            {
              "class": 7,
              "system:index": "77"
            }),
        ee.Feature(
            ee.Geometry.Point([118.76934153185793, 36.64832589816175]),
            {
              "class": 7,
              "system:index": "78"
            }),
        ee.Feature(
            ee.Geometry.Point([118.77068263636538, 36.6527393043012]),
            {
              "class": 7,
              "system:index": "79"
            }),
        ee.Feature(
            ee.Geometry.Point([118.7695882950873, 36.65252411886704]),
            {
              "class": 7,
              "system:index": "80"
            }),
        ee.Feature(
            ee.Geometry.Point([118.78484469996401, 36.65369472036634]),
            {
              "class": 7,
              "system:index": "81"
            }),
        ee.Feature(
            ee.Geometry.Point([118.7725292789987, 36.65701714606773]),
            {
              "class": 7,
              "system:index": "82"
            }),
        ee.Feature(
            ee.Geometry.Point([118.76957080245528, 36.657049422037666]),
            {
              "class": 7,
              "system:index": "83"
            }),
        ee.Feature(
            ee.Geometry.Point([119.26551041097032, 36.37383159271548]),
            {
              "class": 7,
              "system:index": "84"
            }),
        ee.Feature(
            ee.Geometry.Point([119.2659020134865, 36.37319450216797]),
            {
              "class": 7,
              "system:index": "85"
            }),
        ee.Feature(
            ee.Geometry.Point([119.2646067261453, 36.372907269807875]),
            {
              "class": 7,
              "system:index": "86"
            }),
        ee.Feature(
            ee.Geometry.Point([118.54955128582692, 36.02647453628836]),
            {
              "class": 7,
              "system:index": "87"
            }),
        ee.Feature(
            ee.Geometry.Point([119.06932092357546, 36.49438392375111]),
            {
              "class": 7,
              "system:index": "88"
            }),
        ee.Feature(
            ee.Geometry.Point([119.07044745136172, 36.49370253991046]),
            {
              "class": 7,
              "system:index": "89"
            }),
        ee.Feature(
            ee.Geometry.Point([119.36346669228557, 35.44512778668547]),
            {
              "class": 7,
              "system:index": "90"
            }),
        ee.Feature(
            ee.Geometry.Point([119.3634720567036, 35.445997459215214]),
            {
              "class": 7,
              "system:index": "91"
            }),
        ee.Feature(
            ee.Geometry.Point([119.36204761363514, 35.447950846446915]),
            {
              "class": 7,
              "system:index": "92"
            }),
        ee.Feature(
            ee.Geometry.Point([119.3432439643798, 35.44546275541848]),
            {
              "class": 7,
              "system:index": "93"
            }),
        ee.Feature(
            ee.Geometry.Point([119.3430293876586, 35.444964548894646]),
            {
              "class": 7,
              "system:index": "94"
            }),
        ee.Feature(
            ee.Geometry.Point([118.7026050518414, 35.07899572866699]),
            {
              "class": 7,
              "system:index": "95"
            }),
        ee.Feature(
            ee.Geometry.Point([118.70153216823545, 35.07891012308418]),
            {
              "class": 7,
              "system:index": "96"
            }),
        ee.Feature(
            ee.Geometry.Point([118.70475886568036, 35.07905279900561]),
            {
              "class": 7,
              "system:index": "97"
            }),
        ee.Feature(
            ee.Geometry.Point([119.17548777401203, 36.08594700246918]),
            {
              "class": 7,
              "system:index": "98"
            }),
        ee.Feature(
            ee.Geometry.Point([119.17536975681537, 36.08536391986135]),
            {
              "class": 7,
              "system:index": "99"
            }),
        ee.Feature(
            ee.Geometry.Point([119.17723389208072, 36.08521002001303]),
            {
              "class": 7,
              "system:index": "100"
            }),
        ee.Feature(
            ee.Geometry.Point([118.5558942921005, 36.829133274610626]),
            {
              "class": 7,
              "system:index": "101"
            }),
        ee.Feature(
            ee.Geometry.Point([118.56034675906523, 36.82805981125025]),
            {
              "class": 7,
              "system:index": "102"
            }),
        ee.Feature(
            ee.Geometry.Point([118.57132235835417, 36.82595577937466]),
            {
              "class": 7,
              "system:index": "103"
            }),
        ee.Feature(
            ee.Geometry.Point([118.5636190540634, 36.8258355472342]),
            {
              "class": 7,
              "system:index": "104"
            }),
        ee.Feature(
            ee.Geometry.Point([118.5626641876541, 36.82573249096347]),
            {
              "class": 7,
              "system:index": "105"
            }),
        ee.Feature(
            ee.Geometry.Point([118.57214847873075, 36.81923966609112]),
            {
              "class": 7,
              "system:index": "106"
            }),
        ee.Feature(
            ee.Geometry.Point([118.55279897063201, 36.79790668759197]),
            {
              "class": 7,
              "system:index": "107"
            }),
        ee.Feature(
            ee.Geometry.Point([118.56361030315487, 36.79537906119751]),
            {
              "class": 7,
              "system:index": "108"
            }),
        ee.Feature(
            ee.Geometry.Point([118.5826303573117, 36.794122586380944]),
            {
              "class": 7,
              "system:index": "109"
            }),
        ee.Feature(
            ee.Geometry.Point([118.57916494326446, 36.79411399480563]),
            {
              "class": 7,
              "system:index": "110"
            }),
        ee.Feature(
            ee.Geometry.Point([118.58734568075988, 36.79245580273204]),
            {
              "class": 7,
              "system:index": "111"
            }),
        ee.Feature(
            ee.Geometry.Point([118.59902261413391, 36.634862383550285]),
            {
              "class": 7,
              "system:index": "112"
            }),
        ee.Feature(
            ee.Geometry.Point([118.60302178777512, 36.63289080497904]),
            {
              "class": 7,
              "system:index": "113"
            }),
        ee.Feature(
            ee.Geometry.Point([118.60477863467987, 36.63321151278914]),
            {
              "class": 7,
              "system:index": "114"
            }),
        ee.Feature(
            ee.Geometry.Point([118.60563157714661, 36.63217189805844]),
            {
              "class": 7,
              "system:index": "115"
            }),
        ee.Feature(
            ee.Geometry.Point([118.60883744924939, 36.62861967904529]),
            {
              "class": 7,
              "system:index": "116"
            }),
        ee.Feature(
            ee.Geometry.Point([118.61192016829949, 36.62767021571154]),
            {
              "class": 7,
              "system:index": "117"
            }),
        ee.Feature(
            ee.Geometry.Point([118.61432610978585, 36.62592232390626]),
            {
              "class": 7,
              "system:index": "118"
            }),
        ee.Feature(
            ee.Geometry.Point([118.61396140739106, 36.62449728918673]),
            {
              "class": 7,
              "system:index": "119"
            }),
        ee.Feature(
            ee.Geometry.Point([118.61579603835725, 36.62399572236]),
            {
              "class": 7,
              "system:index": "120"
            }),
        ee.Feature(
            ee.Geometry.Point([118.61739641060124, 36.659789505778996]),
            {
              "class": 7,
              "system:index": "121"
            }),
        ee.Feature(
            ee.Geometry.Point([118.61761098732244, 36.66142474567417]),
            {
              "class": 7,
              "system:index": "122"
            }),
        ee.Feature(
            ee.Geometry.Point([118.62398391594182, 36.66130425549897]),
            {
              "class": 7,
              "system:index": "123"
            }),
        ee.Feature(
            ee.Geometry.Point([118.62741714348088, 36.656252104849194]),
            {
              "class": 7,
              "system:index": "124"
            }),
        ee.Feature(
            ee.Geometry.Point([118.62713819374333, 36.6544273965451]),
            {
              "class": 7,
              "system:index": "125"
            }),
        ee.Feature(
            ee.Geometry.Point([118.62611895431768, 36.651302913514684]),
            {
              "class": 7,
              "system:index": "126"
            }),
        ee.Feature(
            ee.Geometry.Point([118.63475135369764, 36.65680869646849]),
            {
              "class": 7,
              "system:index": "127"
            }),
        ee.Feature(
            ee.Geometry.Point([118.64811948342786, 36.657867344092246]),
            {
              "class": 7,
              "system:index": "128"
            }),
        ee.Feature(
            ee.Geometry.Point([118.64307693047986, 36.66044074387029]),
            {
              "class": 7,
              "system:index": "129"
            }),
        ee.Feature(
            ee.Geometry.Point([117.66579388755524, 37.4061043840128]),
            {
              "class": 7,
              "system:index": "130"
            }),
        ee.Feature(
            ee.Geometry.Point([117.66573487895691, 37.40538849480051]),
            {
              "class": 7,
              "system:index": "131"
            }),
        ee.Feature(
            ee.Geometry.Point([117.66391634124481, 37.40535440466738]),
            {
              "class": 7,
              "system:index": "132"
            }),
        ee.Feature(
            ee.Geometry.Point([117.6685780205127, 37.40500924119612]),
            {
              "class": 7,
              "system:index": "133"
            }),
        ee.Feature(
            ee.Geometry.Point([117.66295611041748, 37.40405044543289]),
            {
              "class": 7,
              "system:index": "134"
            }),
        ee.Feature(
            ee.Geometry.Point([117.66581534522736, 37.402507823833766]),
            {
              "class": 7,
              "system:index": "135"
            }),
        ee.Feature(
            ee.Geometry.Point([117.66444205421173, 37.40097795502712]),
            {
              "class": 7,
              "system:index": "136"
            }),
        ee.Feature(
            ee.Geometry.Point([117.64968130705353, 37.394802749798636]),
            {
              "class": 7,
              "system:index": "137"
            }),
        ee.Feature(
            ee.Geometry.Point([117.64917705175873, 37.39627307971487]),
            {
              "class": 7,
              "system:index": "138"
            }),
        ee.Feature(
            ee.Geometry.Point([117.65596840498443, 37.39481979726729]),
            {
              "class": 7,
              "system:index": "139"
            }),
        ee.Feature(
            ee.Geometry.Point([117.64969203588959, 37.39362220316387]),
            {
              "class": 7,
              "system:index": "140"
            }),
        ee.Feature(
            ee.Geometry.Point([117.64475677130218, 37.39356679799137]),
            {
              "class": 7,
              "system:index": "141"
            }),
        ee.Feature(
            ee.Geometry.Point([117.64652166483398, 37.392373445874284]),
            {
              "class": 7,
              "system:index": "142"
            }),
        ee.Feature(
            ee.Geometry.Point([117.64482114431854, 37.392202965449506]),
            {
              "class": 7,
              "system:index": "143"
            }),
        ee.Feature(
            ee.Geometry.Point([117.63809952852722, 37.38906179424111]),
            {
              "class": 7,
              "system:index": "144"
            }),
        ee.Feature(
            ee.Geometry.Point([117.63127598879333, 37.38601852592072]),
            {
              "class": 7,
              "system:index": "145"
            }),
        ee.Feature(
            ee.Geometry.Point([117.62999925730225, 37.386333940420165]),
            {
              "class": 7,
              "system:index": "146"
            }),
        ee.Feature(
            ee.Geometry.Point([117.62845430490967, 37.386333940420165]),
            {
              "class": 7,
              "system:index": "147"
            }),
        ee.Feature(
            ee.Geometry.Point([117.62850794908996, 37.387689355193366]),
            {
              "class": 7,
              "system:index": "148"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[118.78227035595097, 36.62530077890594],
                  [118.78227035595097, 36.62409530346572],
                  [118.7830857474915, 36.62409530346572],
                  [118.7830857474915, 36.62530077890594]]], null, false),
            {
              "class": 7,
              "system:index": "149"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[118.79618893629197, 36.61962969295141],
                  [118.79618893629197, 36.61787300751557],
                  [118.7968970394719, 36.61787300751557],
                  [118.7968970394719, 36.61962969295141]]], null, false),
            {
              "class": 7,
              "system:index": "150"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[118.71025660267534, 36.68420102646405],
                  [118.71025660267534, 36.6823167521],
                  [118.71217706433, 36.6823167521],
                  [118.71217706433, 36.68420102646405]]], null, false),
            {
              "class": 7,
              "system:index": "151"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[118.70771421096906, 36.64942281287628],
                  [118.70771421096906, 36.647597942732055],
                  [118.70923770568952, 36.647597942732055],
                  [118.70923770568952, 36.64942281287628]]], null, false),
            {
              "class": 7,
              "system:index": "152"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[118.74950215195882, 36.662677697000326],
                  [118.74950215195882, 36.660784288976295],
                  [118.7519483265804, 36.660784288976295],
                  [118.7519483265804, 36.662677697000326]]], null, false),
            {
              "class": 7,
              "system:index": "153"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[118.74202713596348, 36.696013079648615],
                  [118.74202713596348, 36.69489473798812],
                  [118.7446235142899, 36.69489473798812],
                  [118.7446235142899, 36.696013079648615]]], null, false),
            {
              "class": 7,
              "system:index": "154"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[118.7418501101685, 36.69914865085929],
                  [118.7418501101685, 36.69763464616028],
                  [118.74579832183842, 36.69763464616028],
                  [118.74579832183842, 36.69914865085929]]], null, false),
            {
              "class": 7,
              "system:index": "155"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[118.8965353173684, 36.895160401581535],
                  [118.8965353173684, 36.89361165440963],
                  [118.90040306276788, 36.89361165440963],
                  [118.90040306276788, 36.895160401581535]]], null, false),
            {
              "class": 7,
              "system:index": "156"
            })]),
    pg2_p = ui.import && ui.import("pg2_p", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            118.92809289471015,
            36.862595617096005
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.9281747020851,
            36.862120282754475
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.98791618643548,
            36.838305787543014
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.98915000258233,
            36.8374814678732
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.99585479676247,
            36.83284358544645
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.56054396791512,
            36.700143733700315
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.56166781349236,
            36.69949642269707
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.56012822551781,
            36.699311475694934
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.56253148479516,
            36.69932652953733
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.99355691567526,
            36.83222622651999
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.99441522256002,
            36.8397311580636
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.99353545800314,
            36.83586715484005
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.01623015813914,
            36.83360934696373
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.01627039127436,
            36.83307479537
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.71979846627359,
            36.67843768746169
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.74008837577836,
            36.666719228703826
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.74008837577836,
            36.66644814419216
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.74009105798737,
            36.66631260157826
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.04968715358645,
            36.49670403389399
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.04960132289797,
            36.49635041564816
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.57574972685897,
            35.535561314934384
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.5735395866307,
            35.53453545778061
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.74472440634968,
            35.08992191832929
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.74556393777134,
            35.089553204570265
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.74582411204578,
            35.08907255734582
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.5974053434373,
            35.29071957402141
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.59705129184734,
            35.2916565901204
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.54678545802062,
            36.79642899546835
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.54518686144775,
            36.79660941289495
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.54557846396392,
            36.796725395301955
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.55862139438717,
            36.79662480898412
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            121.24794901847619,
            37.22353612801907
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            121.24743817319391,
            37.214666043490375
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            120.58474861446433,
            36.81980998356395
          ]
        },
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                118.77848635679368,
                36.61475565345372
              ],
              [
                118.77848635679368,
                36.61323998826447
              ],
              [
                118.77947340971116,
                36.61323998826447
              ],
              [
                118.77947340971116,
                36.61475565345372
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
                116.26363450566636,
                34.9081467418204
              ],
              [
                116.26363450566636,
                34.90794877753407
              ],
              [
                116.26395905295716,
                34.90794877753407
              ],
              [
                116.26395905295716,
                34.9081467418204
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
                118.70828227335694,
                36.683822591727655
              ],
              [
                118.70828227335694,
                36.68348273576261
              ],
              [
                118.70872752005342,
                36.68348273576261
              ],
              [
                118.70872752005342,
                36.683822591727655
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
                118.70361259193888,
                36.63147991097051
              ],
              [
                118.70361259193888,
                36.63090735839399
              ],
              [
                118.7039398214387,
                36.63090735839399
              ],
              [
                118.7039398214387,
                36.63147991097051
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
                118.76128694939293,
                36.60332638394006
              ],
              [
                118.76128694939293,
                36.602133484508855
              ],
              [
                118.76275143551506,
                36.602133484508855
              ],
              [
                118.76275143551506,
                36.60332638394006
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
                118.75959715771354,
                36.60179326793298
              ],
              [
                118.75959715771354,
                36.60118173563192
              ],
              [
                118.76031598972953,
                36.60118173563192
              ],
              [
                118.76031598972953,
                36.60179326793298
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
                115.58645745368491,
                36.248152985973434
              ],
              [
                115.58645745368491,
                36.24653064104828
              ],
              [
                115.58721383662711,
                36.24653064104828
              ],
              [
                115.58721383662711,
                36.248152985973434
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
                115.58493395896446,
                36.248481777107095
              ],
              [
                115.58444579692375,
                36.246560925128676
              ],
              [
                115.58530946822654,
                36.24643546243345
              ],
              [
                115.58580299468528,
                36.24834766510122
              ]
            ]
          ],
          "evenOdd": true
        },
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                115.51207689049036,
                36.174330726537576
              ],
              [
                115.51078943016321,
                36.17012157022041
              ],
              [
                115.51959780456812,
                36.16948931116143
              ],
              [
                115.51971582176478,
                36.17340403869113
              ]
            ]
          ],
          "evenOdd": true
        },
        {
          "type": "Point",
          "coordinates": [
            115.54806932436726,
            36.157871926341734
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.54812296854756,
            36.1583093764034
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.5507783554723,
            36.15920592484324
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.55171712862752,
            36.15743447383936
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.55296167361043,
            36.158980705909535
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.54584845530293,
            36.15850427911027
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.5391733101145,
            36.15337261043352
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.53703558952964,
            36.15282034869738
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.53671640665686,
            36.15279002833256
          ]
        },
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                115.53892654688514,
                36.15373645133445
              ],
              [
                115.5386502793566,
                36.15289614955812
              ],
              [
                115.53984922678626,
                36.152582116943826
              ],
              [
                115.5401442697779,
                36.15346357081702
              ]
            ]
          ],
          "evenOdd": true
        },
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                115.52022866332103,
                36.14874952079708
              ],
              [
                115.51991752707531,
                36.147733729470126
              ],
              [
                115.52053175293972,
                36.14760377653884
              ],
              [
                115.52079192721416,
                36.14848961808522
              ]
            ]
          ],
          "evenOdd": true
        },
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                115.50966885547533,
                36.15782226543217
              ],
              [
                115.50938454131975,
                36.15694086055451
              ],
              [
                115.5106559083928,
                36.156678819355854
              ],
              [
                115.51095095138444,
                36.15759487691579
              ]
            ]
          ],
          "evenOdd": true
        },
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                115.49034687296447,
                36.155925833421996
              ],
              [
                115.48994990603026,
                36.15460910463925
              ],
              [
                115.491840605365,
                36.15574035727773
              ]
            ]
          ],
          "evenOdd": true
        },
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                115.47740621737097,
                36.17108926015685
              ],
              [
                115.48310859373663,
                36.17103729449292
              ],
              [
                115.47749741247748,
                36.17248047399409
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
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
        },
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
          "type": "polygon"
        },
        {
          "type": "polygon"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "polygon"
        },
        {
          "type": "polygon"
        },
        {
          "type": "polygon"
        },
        {
          "type": "polygon"
        },
        {
          "type": "polygon"
        }
      ],
      "properties": {
        "class": 9
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
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
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
      },
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
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      }
    ] */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([118.92809289471015, 36.862595617096005]),
            {
              "class": 9,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([118.9281747020851, 36.862120282754475]),
            {
              "class": 9,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([118.98791618643548, 36.838305787543014]),
            {
              "class": 9,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([118.98915000258233, 36.8374814678732]),
            {
              "class": 9,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([118.99585479676247, 36.83284358544645]),
            {
              "class": 9,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([118.56054396791512, 36.700143733700315]),
            {
              "class": 9,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([118.56166781349236, 36.69949642269707]),
            {
              "class": 9,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([118.56012822551781, 36.699311475694934]),
            {
              "class": 9,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([118.56253148479516, 36.69932652953733]),
            {
              "class": 9,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([118.99355691567526, 36.83222622651999]),
            {
              "class": 9,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([118.99441522256002, 36.8397311580636]),
            {
              "class": 9,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([118.99353545800314, 36.83586715484005]),
            {
              "class": 9,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([119.01623015813914, 36.83360934696373]),
            {
              "class": 9,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([119.01627039127436, 36.83307479537]),
            {
              "class": 9,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([118.71979846627359, 36.67843768746169]),
            {
              "class": 9,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([118.74008837577836, 36.666719228703826]),
            {
              "class": 9,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([118.74008837577836, 36.66644814419216]),
            {
              "class": 9,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([118.74009105798737, 36.66631260157826]),
            {
              "class": 9,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([119.04968715358645, 36.49670403389399]),
            {
              "class": 9,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([119.04960132289797, 36.49635041564816]),
            {
              "class": 9,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([119.57574972685897, 35.535561314934384]),
            {
              "class": 9,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([119.5735395866307, 35.53453545778061]),
            {
              "class": 9,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([118.74472440634968, 35.08992191832929]),
            {
              "class": 9,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([118.74556393777134, 35.089553204570265]),
            {
              "class": 9,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([118.74582411204578, 35.08907255734582]),
            {
              "class": 9,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([118.5974053434373, 35.29071957402141]),
            {
              "class": 9,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([118.59705129184734, 35.2916565901204]),
            {
              "class": 9,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([118.54678545802062, 36.79642899546835]),
            {
              "class": 9,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([118.54518686144775, 36.79660941289495]),
            {
              "class": 9,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([118.54557846396392, 36.796725395301955]),
            {
              "class": 9,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([118.55862139438717, 36.79662480898412]),
            {
              "class": 9,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([121.24794901847619, 37.22353612801907]),
            {
              "class": 9,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([121.24743817319391, 37.214666043490375]),
            {
              "class": 9,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([120.58474861446433, 36.81980998356395]),
            {
              "class": 9,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[118.77848635679368, 36.61475565345372],
                  [118.77848635679368, 36.61323998826447],
                  [118.77947340971116, 36.61323998826447],
                  [118.77947340971116, 36.61475565345372]]], null, false),
            {
              "class": 9,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[116.26363450566636, 34.9081467418204],
                  [116.26363450566636, 34.90794877753407],
                  [116.26395905295716, 34.90794877753407],
                  [116.26395905295716, 34.9081467418204]]], null, false),
            {
              "class": 9,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[118.70828227335694, 36.683822591727655],
                  [118.70828227335694, 36.68348273576261],
                  [118.70872752005342, 36.68348273576261],
                  [118.70872752005342, 36.683822591727655]]], null, false),
            {
              "class": 9,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[118.70361259193888, 36.63147991097051],
                  [118.70361259193888, 36.63090735839399],
                  [118.7039398214387, 36.63090735839399],
                  [118.7039398214387, 36.63147991097051]]], null, false),
            {
              "class": 9,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[118.76128694939293, 36.60332638394006],
                  [118.76128694939293, 36.602133484508855],
                  [118.76275143551506, 36.602133484508855],
                  [118.76275143551506, 36.60332638394006]]], null, false),
            {
              "class": 9,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[118.75959715771354, 36.60179326793298],
                  [118.75959715771354, 36.60118173563192],
                  [118.76031598972953, 36.60118173563192],
                  [118.76031598972953, 36.60179326793298]]], null, false),
            {
              "class": 9,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[115.58645745368491, 36.248152985973434],
                  [115.58645745368491, 36.24653064104828],
                  [115.58721383662711, 36.24653064104828],
                  [115.58721383662711, 36.248152985973434]]], null, false),
            {
              "class": 9,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[115.58493395896446, 36.248481777107095],
                  [115.58444579692375, 36.246560925128676],
                  [115.58530946822654, 36.24643546243345],
                  [115.58580299468528, 36.24834766510122]]]),
            {
              "class": 9,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[115.51207689049036, 36.174330726537576],
                  [115.51078943016321, 36.17012157022041],
                  [115.51959780456812, 36.16948931116143],
                  [115.51971582176478, 36.17340403869113]]]),
            {
              "class": 9,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([115.54806932436726, 36.157871926341734]),
            {
              "class": 9,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([115.54812296854756, 36.1583093764034]),
            {
              "class": 9,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([115.5507783554723, 36.15920592484324]),
            {
              "class": 9,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([115.55171712862752, 36.15743447383936]),
            {
              "class": 9,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([115.55296167361043, 36.158980705909535]),
            {
              "class": 9,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([115.54584845530293, 36.15850427911027]),
            {
              "class": 9,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([115.5391733101145, 36.15337261043352]),
            {
              "class": 9,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([115.53703558952964, 36.15282034869738]),
            {
              "class": 9,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([115.53671640665686, 36.15279002833256]),
            {
              "class": 9,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[115.53892654688514, 36.15373645133445],
                  [115.5386502793566, 36.15289614955812],
                  [115.53984922678626, 36.152582116943826],
                  [115.5401442697779, 36.15346357081702]]]),
            {
              "class": 9,
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[115.52022866332103, 36.14874952079708],
                  [115.51991752707531, 36.147733729470126],
                  [115.52053175293972, 36.14760377653884],
                  [115.52079192721416, 36.14848961808522]]]),
            {
              "class": 9,
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[115.50966885547533, 36.15782226543217],
                  [115.50938454131975, 36.15694086055451],
                  [115.5106559083928, 36.156678819355854],
                  [115.51095095138444, 36.15759487691579]]]),
            {
              "class": 9,
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[115.49034687296447, 36.155925833421996],
                  [115.48994990603026, 36.15460910463925],
                  [115.491840605365, 36.15574035727773]]]),
            {
              "class": 9,
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[115.47740621737097, 36.17108926015685],
                  [115.48310859373663, 36.17103729449292],
                  [115.47749741247748, 36.17248047399409]]]),
            {
              "class": 9,
              "system:index": "56"
            })]),
    pg3_p = ui.import && ui.import("pg3_p", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            118.56388097965005,
            36.69913155314035
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.56382733546975,
            36.69891219630336
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.56348937713388,
            36.69876165693537
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.41179619882418,
            36.27407015953263
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.41270546768023,
            36.27386040775981
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.41249357316805,
            36.27369174097703
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.6267382137265,
            35.57279632047151
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.62688037080429,
            35.572589063712115
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.62612398786209,
            35.57158986044299
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.6151576726117,
            36.62143832659493
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.61544198676728,
            36.621737554892995
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.61609912797593,
            36.62114340260342
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.6155358640828,
            36.62106805687721
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.61619032308244,
            36.62098194738564
          ]
        },
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                118.55237567823875,
                36.69681423791455
              ],
              [
                118.55282092493522,
                36.69680563543813
              ],
              [
                118.55282897156226,
                36.69705295625128
              ],
              [
                118.55242932241904,
                36.69702499828619
              ]
            ]
          ],
          "evenOdd": true
        },
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                118.61000713717567,
                36.65109844235295
              ],
              [
                118.60996153962242,
                36.65082730282977
              ],
              [
                118.61059185874092,
                36.65074983421923
              ],
              [
                118.61059185874092,
                36.650510972179454
              ],
              [
                118.61137238156425,
                36.650420591754965
              ],
              [
                118.61144480120765,
                36.65093059418926
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {
        "class": 8
      },
      "color": "#0b4a8b",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #0b4a8b */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([118.56388097965005, 36.69913155314035]),
            {
              "class": 8,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([118.56382733546975, 36.69891219630336]),
            {
              "class": 8,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([118.56348937713388, 36.69876165693537]),
            {
              "class": 8,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([119.41179619882418, 36.27407015953263]),
            {
              "class": 8,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([119.41270546768023, 36.27386040775981]),
            {
              "class": 8,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([119.41249357316805, 36.27369174097703]),
            {
              "class": 8,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([119.6267382137265, 35.57279632047151]),
            {
              "class": 8,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([119.62688037080429, 35.572589063712115]),
            {
              "class": 8,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([119.62612398786209, 35.57158986044299]),
            {
              "class": 8,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([118.6151576726117, 36.62143832659493]),
            {
              "class": 8,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([118.61544198676728, 36.621737554892995]),
            {
              "class": 8,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([118.61609912797593, 36.62114340260342]),
            {
              "class": 8,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([118.6155358640828, 36.62106805687721]),
            {
              "class": 8,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([118.61619032308244, 36.62098194738564]),
            {
              "class": 8,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[118.55237567823875, 36.69681423791455],
                  [118.55282092493522, 36.69680563543813],
                  [118.55282897156226, 36.69705295625128],
                  [118.55242932241904, 36.69702499828619]]]),
            {
              "class": 8,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[118.61000713717567, 36.65109844235295],
                  [118.60996153962242, 36.65082730282977],
                  [118.61059185874092, 36.65074983421923],
                  [118.61059185874092, 36.650510972179454],
                  [118.61137238156425, 36.650420591754965],
                  [118.61144480120765, 36.65093059418926]]]),
            {
              "class": 8,
              "system:index": "15"
            })]),
    pg_p = ui.import && ui.import("pg_p", "table", {
      "id": "users/yxflovexh/project/pg_p"
    }) || ee.FeatureCollection("users/yxflovexh/project/pg_p"),
    isa_p = ui.import && ui.import("isa_p", "table", {
      "id": "users/yxflovexh/project/isa_p"
    }) || ee.FeatureCollection("users/yxflovexh/project/isa_p"),
    open_p = ui.import && ui.import("open_p", "table", {
      "id": "users/yxflovexh/project/Open_p"
    }) || ee.FeatureCollection("users/yxflovexh/project/Open_p"),
    open_p2 = ui.import && ui.import("open_p2", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            119.05956841159731,
            36.4906836786304
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.05899978328615,
            36.49001088779772
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.05800200153261,
            36.488259879133004
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.04929018665224,
            36.48915695255617
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.05508375812441,
            36.49184811049244
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.05970788646609,
            36.493021150075016
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.06475043941408,
            36.49387504271531
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.05507302928835,
            36.49421142207969
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.05258393932253,
            36.49578979804683
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.40293298938548,
            36.27481808025143
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.41589342334544,
            36.27530244868589
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.41602216937815,
            36.278139403452805
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.41198812701975,
            36.280076776730155
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.40166698673045,
            36.279678927212665
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.40164552905833,
            36.27471428662449
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.40379129627024,
            36.272257797175854
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.41211687305247,
            36.270718127063695
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.38310610034739,
            36.27893511615349
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.42363964298045,
            36.27841617400782
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.45520202480428,
            36.2838735332404
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.45322791896932,
            36.28691773171562
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.42850868068807,
            36.258546735186904
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.37623779140584,
            36.25868515531257
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.36490814052694,
            36.25619355552399
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.3423346694576,
            36.26103825992133
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.33838645778768,
            36.27515539889645
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.32946006618612,
            36.2813827370734
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.50378219448201,
            36.257923841586184
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.52275077663533,
            36.26083063589548
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.52120582424276,
            36.26913516644896
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.52094833217733,
            36.277092846231874
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.53408042751424,
            36.26117667563198
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.54171935878865,
            36.23812708063351
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.42449115939283,
            36.21153193787849
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.39170383639478,
            36.205160517062964
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.39075969882154,
            36.198303734833566
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.50182460971021,
            36.214509706680985
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.51118015475416,
            36.19871931448993
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.64172582601019,
            36.10437856478262
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.63468770955511,
            36.10179536656164
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.63960151647039,
            36.09489543995436
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.62676982854315,
            36.094600681360525
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.65296964620062,
            36.09822440143589
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.68223791097112,
            36.092814767415454
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.68919019673773,
            36.09766958431572
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.69238738988348,
            36.092762749896195
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.90875919839331,
            35.87580139941772
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.90513016959616,
            35.875427579747175
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.6182808235705,
            35.71872285512065
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.60748761449457,
            35.71567406414676
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.60710137639643,
            35.717764676241195
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.62050169263483,
            35.71848766682633
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.62451427732111,
            35.718078263324685
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.62138145719172,
            35.715404022751414
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.6119400814593,
            35.71494233695589
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.60333555493952,
            35.71627512074156
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.61087746094644,
            35.58222605487009
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.6233872837919,
            35.574128324175376
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.60244834234014,
            35.57168419468037
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.59905266572729,
            35.57165365118867
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.36181713374141,
            35.44243786066382
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.38224977134225,
            35.41452075933442
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.37572663901803,
            35.3944425005321
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.39269965766427,
            35.35325593803271
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.31458793944216,
            35.27548460208633
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.2956837303052,
            35.27008896566074
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.32379328078127,
            35.26132905035356
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.30999599760867,
            35.25074580969354
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.33992945021487,
            35.25302377620635
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            116.77638079004201,
            35.43234941553546
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            116.7973234780303,
            35.43182490210278
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            116.76221872644338,
            35.43227948060849
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            116.77533208389364,
            35.21577137798485
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            116.55002079707229,
            35.18204928648873
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            116.44027505676551,
            35.16271983755441
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            116.43987272541328,
            35.16219795925133
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            116.47452670350874,
            35.16303334878808
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            116.49615603700484,
            35.1628228444684
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            116.50315123811568,
            35.15796355165402
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            116.51194888368452,
            35.16098090843167
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.44923340542275,
            34.84600695117521
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.43627297146278,
            34.84262574031954
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.40146862728554,
            34.84804969875124
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.44253970614557,
            34.88331259439398
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.42678977481012,
            34.88220365304052
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.40282155505304,
            34.87539125645956
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.41962291232232,
            34.86507476990011
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.4760293865722,
            34.86954198375649
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.20343372516486,
            35.14089957687974
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.68230246031008,
            34.99988199508879
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.70922655666469,
            35.06790973642902
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.71677965725063,
            35.06502943625691
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.69761795604823,
            35.06437959838594
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.70797483428922,
            35.07639240077746
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.70058266624417,
            35.07587435934927
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.71311394676175,
            35.07968496008634
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.71183721527066,
            35.082468166586104
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.71362893089261,
            35.08780603826155
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.71106473907437,
            35.09245005360713
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.71964242775229,
            35.09519739092892
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.7369477364287,
            35.0920283589823
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.75098708508108,
            35.09234538685055
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.77157035706136,
            35.09172210256948
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.76204315064047,
            35.09432055204627
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.77492848274801,
            35.094531233510025
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.78618495163094,
            35.09894320220193
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.79157082733285,
            35.099575209126485
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.80045919491702,
            35.101189663238166
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.79317431523258,
            35.103199723991914
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.8127558944979,
            35.104762095057524
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.81262714846518,
            35.105525714963754
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.57087567907963,
            35.383108075218914
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.5627646790186,
            35.38506742521354
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.54658559424077,
            35.38475253288825
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.53971913916264,
            35.38104370856485
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.59400704962407,
            35.37918923246446
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.57495263678227,
            35.39084023333025
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.57760487363558,
            35.300889445551995
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.59640219726573,
            35.29350431905529
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.59491625347148,
            35.29071957402141
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.59148839035045,
            35.2902641977952
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.58987370052348,
            35.28832006278595
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.50563002107735,
            35.22689511439777
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.50231481073494,
            35.22608443020502
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.49957359312172,
            35.227254442097944
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.18686127220771,
            36.07474775259166
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.16216349159858,
            36.077401210148835
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.16154121910712,
            36.07266654676259
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.15499662911078,
            36.083054683834966
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.1481730893769,
            36.07434885907407
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.35434875721388,
            36.41410229174158
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.34085188145094,
            36.410493193268685
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.37162218326979,
            36.41289352145536
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.35952593320188,
            36.427247244734474
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.3541615151721,
            36.42906005800108
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.36752964490232,
            36.43693235592672
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.380618824895,
            36.4413170177459
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.5556173202905,
            36.79625967811102
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.50463110068004,
            36.28009467067578
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.50906210997265,
            36.279190857636785
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.50457745649975,
            36.27867624170924
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.50112277128856,
            36.2783129813648
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.49696534731548,
            36.276833975367346
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.49419194319408,
            36.279091394318655
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.49175649740856,
            36.27849893627614
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.49347847559612,
            36.277132373570666
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.49439931964852,
            36.280605741371296
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.48882568931558,
            36.279926805899294
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            116.53242605761166,
            36.597132970734826
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            116.53856295183773,
            36.59124103165839
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            116.51706236437435,
            36.58907020385961
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            116.56551378801937,
            36.59589259989445
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            116.49719255999203,
            36.594411019702896
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            116.4914419038641,
            36.60137075398915
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            116.4862920625555,
            36.579628115551785
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            116.52478712633724,
            36.5725285586996
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            116.46200197771664,
            36.57635412917441
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            116.4870645387518,
            36.565393880482084
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            116.44028681353207,
            36.56880620011773
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            116.5750466607081,
            36.066205785725884
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            116.57371092061868,
            36.066383572143565
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            116.57609808664193,
            36.06547729084269
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            116.57944548349252,
            36.0660800341147
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            116.59333925155248,
            36.05850823153593
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            122.3041564382553,
            37.35448502580309
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            122.29386748447418,
            37.355593698968974
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            122.3037058271408,
            37.350357206351795
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            122.30926372237744,
            37.06683015502839
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            122.29995109267773,
            37.06902171182331
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            122.33580686278881,
            37.066076792755126
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            122.32539989181103,
            37.07123032608702
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            122.31688119597973,
            37.06232699195587
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            122.32668735213818,
            37.06037496749719
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            122.29591705031933,
            37.06114550946772
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            122.32209541030468,
            37.047274556666785
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            122.3202071351582,
            37.048678891924325
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            122.30825521178784,
            37.04539065149111
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            122.32441283889355,
            37.043010013534996
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            122.31251851993012,
            37.032408480559255
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            122.29897872882295,
            37.03156912788157
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            122.3290838428061,
            37.03283671814747
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            122.3312081523459,
            37.034326966130834
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            121.25215472221154,
            37.22229308601928
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            121.24850691795129,
            37.22284839941008
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            121.2501484298684,
            37.22396328548857
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            121.24432267188806,
            37.22215639286522
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            121.2216882761644,
            37.21624079572457
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            121.21834087931381,
            37.22088858848022
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            121.18696976267563,
            37.207149432118705
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            121.19902897440659,
            37.21589903495485
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            120.60641558308585,
            36.82254480468642
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            120.58345587391837,
            36.81538175547197
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            120.59489281315787,
            36.81289084986332
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            120.59669185811404,
            36.82663914345708
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            120.59208267976449,
            36.83233785383543
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.86592925248465,
            37.165555562819954
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.87826741395315,
            37.16256309565499
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.85041535554251,
            37.16324709859516
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.85067284760794,
            37.15218259140698
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.86350453553518,
            37.15047232216659
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.8525396650823,
            37.14469132581076
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            119.84303391633352,
            37.14070594380273
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.70891497647804,
            37.46916142962149
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.68080542600197,
            37.4722268647083
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.72874186551613,
            37.448892335053834
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.70020316159767,
            37.44677994528126
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.68089125669044,
            37.444156410429414
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.71466563260597,
            37.42998091680597
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.7171225388316,
            37.40770002108228
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.67729709937848,
            37.40735912957066
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.60870988468444,
            37.358108255904746
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.60586674312866,
            37.35778419476069
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.6022725830487,
            37.357605107738706
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.59505207638061,
            37.35672672234771
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.61233023764558,
            37.31740383815471
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.61250726344056,
            37.31742516947493
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.60987333418794,
            37.317745138551764
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.60277620913453,
            37.31621994039104
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.56780020358033,
            37.316492985133245
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.56337992312379,
            37.307447850335365
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.60354868533082,
            37.30423912595459
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.56166330935426,
            37.28433514988406
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.54745833041139,
            37.2999037170463
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.6066960635777,
            35.23291669039555
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.61115925937848,
            35.235125052057086
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.6160623374577,
            35.231654742453976
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.60191100269513,
            35.23576476464142
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.61593887248466,
            35.2268499416206
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.61931845584343,
            35.2258683548557
          ]
        },
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                117.15174989123376,
                34.97689918438491
              ],
              [
                117.15174989123376,
                34.9761673280005
              ],
              [
                117.15401904006036,
                34.9761673280005
              ],
              [
                117.15401904006036,
                34.97689918438491
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
                117.15501444990454,
                34.9799187088609
              ],
              [
                117.15501444990454,
                34.9790923784907
              ],
              [
                117.15681689436255,
                34.9790923784907
              ],
              [
                117.15681689436255,
                34.9799187088609
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
                116.24788844743226,
                34.908228587215824
              ],
              [
                116.24788844743226,
                34.90645129252404
              ],
              [
                116.25110709825013,
                34.90645129252404
              ],
              [
                116.25110709825013,
                34.908228587215824
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
                115.4886430519675,
                36.45035880015007
              ],
              [
                115.4886430519675,
                36.449815109857305
              ],
              [
                115.49006998716342,
                36.449815109857305
              ],
              [
                115.49006998716342,
                36.45035880015007
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
                118.14060401149703,
                35.1104981352012
              ],
              [
                118.14060401149703,
                35.10967751301439
              ],
              [
                118.14264785476638,
                35.10967751301439
              ],
              [
                118.14264785476638,
                35.1104981352012
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
                118.65322532891838,
                37.36639476985238
              ],
              [
                118.653155591484,
                37.36574671772945
              ],
              [
                118.65621330976097,
                37.365597494408355
              ],
              [
                118.65622940301506,
                37.366160277954116
              ]
            ]
          ],
          "evenOdd": true
        },
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                115.30648938915375,
                36.47998913165469
              ],
              [
                115.30648938915375,
                36.479240763827576
              ],
              [
                115.3083696176732,
                36.479240763827576
              ],
              [
                115.3083696176732,
                36.47998913165469
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
                116.706646640841,
                35.36295038960741
              ],
              [
                116.706646640841,
                35.36009803823858
              ],
              [
                116.71578760916375,
                35.36009803823858
              ],
              [
                116.71578760916375,
                35.36295038960741
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
                116.68660517508172,
                35.362897893253226
              ],
              [
                116.68660517508172,
                35.360273032021546
              ],
              [
                116.69248457724237,
                35.360273032021546
              ],
              [
                116.69248457724237,
                35.362897893253226
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
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
        },
        {
          "type": "rectangle"
        },
        {
          "type": "polygon"
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
        "class": 6
      },
      "color": "#d69511",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d69511 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
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
      },
      {
        "type": "rectangle"
      },
      {
        "type": "polygon"
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
            ee.Geometry.Point([119.05956841159731, 36.4906836786304]),
            {
              "class": 6,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([119.05899978328615, 36.49001088779772]),
            {
              "class": 6,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([119.05800200153261, 36.488259879133004]),
            {
              "class": 6,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([119.04929018665224, 36.48915695255617]),
            {
              "class": 6,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([119.05508375812441, 36.49184811049244]),
            {
              "class": 6,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([119.05970788646609, 36.493021150075016]),
            {
              "class": 6,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([119.06475043941408, 36.49387504271531]),
            {
              "class": 6,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([119.05507302928835, 36.49421142207969]),
            {
              "class": 6,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([119.05258393932253, 36.49578979804683]),
            {
              "class": 6,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([119.40293298938548, 36.27481808025143]),
            {
              "class": 6,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([119.41589342334544, 36.27530244868589]),
            {
              "class": 6,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([119.41602216937815, 36.278139403452805]),
            {
              "class": 6,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([119.41198812701975, 36.280076776730155]),
            {
              "class": 6,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([119.40166698673045, 36.279678927212665]),
            {
              "class": 6,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([119.40164552905833, 36.27471428662449]),
            {
              "class": 6,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([119.40379129627024, 36.272257797175854]),
            {
              "class": 6,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([119.41211687305247, 36.270718127063695]),
            {
              "class": 6,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([119.38310610034739, 36.27893511615349]),
            {
              "class": 6,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([119.42363964298045, 36.27841617400782]),
            {
              "class": 6,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([119.45520202480428, 36.2838735332404]),
            {
              "class": 6,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([119.45322791896932, 36.28691773171562]),
            {
              "class": 6,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([119.42850868068807, 36.258546735186904]),
            {
              "class": 6,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([119.37623779140584, 36.25868515531257]),
            {
              "class": 6,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([119.36490814052694, 36.25619355552399]),
            {
              "class": 6,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([119.3423346694576, 36.26103825992133]),
            {
              "class": 6,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([119.33838645778768, 36.27515539889645]),
            {
              "class": 6,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([119.32946006618612, 36.2813827370734]),
            {
              "class": 6,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([119.50378219448201, 36.257923841586184]),
            {
              "class": 6,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([119.52275077663533, 36.26083063589548]),
            {
              "class": 6,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([119.52120582424276, 36.26913516644896]),
            {
              "class": 6,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([119.52094833217733, 36.277092846231874]),
            {
              "class": 6,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([119.53408042751424, 36.26117667563198]),
            {
              "class": 6,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([119.54171935878865, 36.23812708063351]),
            {
              "class": 6,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([119.42449115939283, 36.21153193787849]),
            {
              "class": 6,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([119.39170383639478, 36.205160517062964]),
            {
              "class": 6,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([119.39075969882154, 36.198303734833566]),
            {
              "class": 6,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([119.50182460971021, 36.214509706680985]),
            {
              "class": 6,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([119.51118015475416, 36.19871931448993]),
            {
              "class": 6,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([119.64172582601019, 36.10437856478262]),
            {
              "class": 6,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([119.63468770955511, 36.10179536656164]),
            {
              "class": 6,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([119.63960151647039, 36.09489543995436]),
            {
              "class": 6,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([119.62676982854315, 36.094600681360525]),
            {
              "class": 6,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([119.65296964620062, 36.09822440143589]),
            {
              "class": 6,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([119.68223791097112, 36.092814767415454]),
            {
              "class": 6,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([119.68919019673773, 36.09766958431572]),
            {
              "class": 6,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([119.69238738988348, 36.092762749896195]),
            {
              "class": 6,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([119.90875919839331, 35.87580139941772]),
            {
              "class": 6,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([119.90513016959616, 35.875427579747175]),
            {
              "class": 6,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([119.6182808235705, 35.71872285512065]),
            {
              "class": 6,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([119.60748761449457, 35.71567406414676]),
            {
              "class": 6,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([119.60710137639643, 35.717764676241195]),
            {
              "class": 6,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([119.62050169263483, 35.71848766682633]),
            {
              "class": 6,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([119.62451427732111, 35.718078263324685]),
            {
              "class": 6,
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Point([119.62138145719172, 35.715404022751414]),
            {
              "class": 6,
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Point([119.6119400814593, 35.71494233695589]),
            {
              "class": 6,
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Point([119.60333555493952, 35.71627512074156]),
            {
              "class": 6,
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Point([119.61087746094644, 35.58222605487009]),
            {
              "class": 6,
              "system:index": "56"
            }),
        ee.Feature(
            ee.Geometry.Point([119.6233872837919, 35.574128324175376]),
            {
              "class": 6,
              "system:index": "57"
            }),
        ee.Feature(
            ee.Geometry.Point([119.60244834234014, 35.57168419468037]),
            {
              "class": 6,
              "system:index": "58"
            }),
        ee.Feature(
            ee.Geometry.Point([119.59905266572729, 35.57165365118867]),
            {
              "class": 6,
              "system:index": "59"
            }),
        ee.Feature(
            ee.Geometry.Point([119.36181713374141, 35.44243786066382]),
            {
              "class": 6,
              "system:index": "60"
            }),
        ee.Feature(
            ee.Geometry.Point([119.38224977134225, 35.41452075933442]),
            {
              "class": 6,
              "system:index": "61"
            }),
        ee.Feature(
            ee.Geometry.Point([119.37572663901803, 35.3944425005321]),
            {
              "class": 6,
              "system:index": "62"
            }),
        ee.Feature(
            ee.Geometry.Point([119.39269965766427, 35.35325593803271]),
            {
              "class": 6,
              "system:index": "63"
            }),
        ee.Feature(
            ee.Geometry.Point([119.31458793944216, 35.27548460208633]),
            {
              "class": 6,
              "system:index": "64"
            }),
        ee.Feature(
            ee.Geometry.Point([119.2956837303052, 35.27008896566074]),
            {
              "class": 6,
              "system:index": "65"
            }),
        ee.Feature(
            ee.Geometry.Point([119.32379328078127, 35.26132905035356]),
            {
              "class": 6,
              "system:index": "66"
            }),
        ee.Feature(
            ee.Geometry.Point([119.30999599760867, 35.25074580969354]),
            {
              "class": 6,
              "system:index": "67"
            }),
        ee.Feature(
            ee.Geometry.Point([119.33992945021487, 35.25302377620635]),
            {
              "class": 6,
              "system:index": "68"
            }),
        ee.Feature(
            ee.Geometry.Point([116.77638079004201, 35.43234941553546]),
            {
              "class": 6,
              "system:index": "69"
            }),
        ee.Feature(
            ee.Geometry.Point([116.7973234780303, 35.43182490210278]),
            {
              "class": 6,
              "system:index": "70"
            }),
        ee.Feature(
            ee.Geometry.Point([116.76221872644338, 35.43227948060849]),
            {
              "class": 6,
              "system:index": "71"
            }),
        ee.Feature(
            ee.Geometry.Point([116.77533208389364, 35.21577137798485]),
            {
              "class": 6,
              "system:index": "72"
            }),
        ee.Feature(
            ee.Geometry.Point([116.55002079707229, 35.18204928648873]),
            {
              "class": 6,
              "system:index": "73"
            }),
        ee.Feature(
            ee.Geometry.Point([116.44027505676551, 35.16271983755441]),
            {
              "class": 6,
              "system:index": "74"
            }),
        ee.Feature(
            ee.Geometry.Point([116.43987272541328, 35.16219795925133]),
            {
              "class": 6,
              "system:index": "75"
            }),
        ee.Feature(
            ee.Geometry.Point([116.47452670350874, 35.16303334878808]),
            {
              "class": 6,
              "system:index": "76"
            }),
        ee.Feature(
            ee.Geometry.Point([116.49615603700484, 35.1628228444684]),
            {
              "class": 6,
              "system:index": "77"
            }),
        ee.Feature(
            ee.Geometry.Point([116.50315123811568, 35.15796355165402]),
            {
              "class": 6,
              "system:index": "78"
            }),
        ee.Feature(
            ee.Geometry.Point([116.51194888368452, 35.16098090843167]),
            {
              "class": 6,
              "system:index": "79"
            }),
        ee.Feature(
            ee.Geometry.Point([117.44923340542275, 34.84600695117521]),
            {
              "class": 6,
              "system:index": "80"
            }),
        ee.Feature(
            ee.Geometry.Point([117.43627297146278, 34.84262574031954]),
            {
              "class": 6,
              "system:index": "81"
            }),
        ee.Feature(
            ee.Geometry.Point([117.40146862728554, 34.84804969875124]),
            {
              "class": 6,
              "system:index": "82"
            }),
        ee.Feature(
            ee.Geometry.Point([117.44253970614557, 34.88331259439398]),
            {
              "class": 6,
              "system:index": "83"
            }),
        ee.Feature(
            ee.Geometry.Point([117.42678977481012, 34.88220365304052]),
            {
              "class": 6,
              "system:index": "84"
            }),
        ee.Feature(
            ee.Geometry.Point([117.40282155505304, 34.87539125645956]),
            {
              "class": 6,
              "system:index": "85"
            }),
        ee.Feature(
            ee.Geometry.Point([117.41962291232232, 34.86507476990011]),
            {
              "class": 6,
              "system:index": "86"
            }),
        ee.Feature(
            ee.Geometry.Point([117.4760293865722, 34.86954198375649]),
            {
              "class": 6,
              "system:index": "87"
            }),
        ee.Feature(
            ee.Geometry.Point([118.20343372516486, 35.14089957687974]),
            {
              "class": 6,
              "system:index": "88"
            }),
        ee.Feature(
            ee.Geometry.Point([118.68230246031008, 34.99988199508879]),
            {
              "class": 6,
              "system:index": "89"
            }),
        ee.Feature(
            ee.Geometry.Point([118.70922655666469, 35.06790973642902]),
            {
              "class": 6,
              "system:index": "90"
            }),
        ee.Feature(
            ee.Geometry.Point([118.71677965725063, 35.06502943625691]),
            {
              "class": 6,
              "system:index": "91"
            }),
        ee.Feature(
            ee.Geometry.Point([118.69761795604823, 35.06437959838594]),
            {
              "class": 6,
              "system:index": "92"
            }),
        ee.Feature(
            ee.Geometry.Point([118.70797483428922, 35.07639240077746]),
            {
              "class": 6,
              "system:index": "93"
            }),
        ee.Feature(
            ee.Geometry.Point([118.70058266624417, 35.07587435934927]),
            {
              "class": 6,
              "system:index": "94"
            }),
        ee.Feature(
            ee.Geometry.Point([118.71311394676175, 35.07968496008634]),
            {
              "class": 6,
              "system:index": "95"
            }),
        ee.Feature(
            ee.Geometry.Point([118.71183721527066, 35.082468166586104]),
            {
              "class": 6,
              "system:index": "96"
            }),
        ee.Feature(
            ee.Geometry.Point([118.71362893089261, 35.08780603826155]),
            {
              "class": 6,
              "system:index": "97"
            }),
        ee.Feature(
            ee.Geometry.Point([118.71106473907437, 35.09245005360713]),
            {
              "class": 6,
              "system:index": "98"
            }),
        ee.Feature(
            ee.Geometry.Point([118.71964242775229, 35.09519739092892]),
            {
              "class": 6,
              "system:index": "99"
            }),
        ee.Feature(
            ee.Geometry.Point([118.7369477364287, 35.0920283589823]),
            {
              "class": 6,
              "system:index": "100"
            }),
        ee.Feature(
            ee.Geometry.Point([118.75098708508108, 35.09234538685055]),
            {
              "class": 6,
              "system:index": "101"
            }),
        ee.Feature(
            ee.Geometry.Point([118.77157035706136, 35.09172210256948]),
            {
              "class": 6,
              "system:index": "102"
            }),
        ee.Feature(
            ee.Geometry.Point([118.76204315064047, 35.09432055204627]),
            {
              "class": 6,
              "system:index": "103"
            }),
        ee.Feature(
            ee.Geometry.Point([118.77492848274801, 35.094531233510025]),
            {
              "class": 6,
              "system:index": "104"
            }),
        ee.Feature(
            ee.Geometry.Point([118.78618495163094, 35.09894320220193]),
            {
              "class": 6,
              "system:index": "105"
            }),
        ee.Feature(
            ee.Geometry.Point([118.79157082733285, 35.099575209126485]),
            {
              "class": 6,
              "system:index": "106"
            }),
        ee.Feature(
            ee.Geometry.Point([118.80045919491702, 35.101189663238166]),
            {
              "class": 6,
              "system:index": "107"
            }),
        ee.Feature(
            ee.Geometry.Point([118.79317431523258, 35.103199723991914]),
            {
              "class": 6,
              "system:index": "108"
            }),
        ee.Feature(
            ee.Geometry.Point([118.8127558944979, 35.104762095057524]),
            {
              "class": 6,
              "system:index": "109"
            }),
        ee.Feature(
            ee.Geometry.Point([118.81262714846518, 35.105525714963754]),
            {
              "class": 6,
              "system:index": "110"
            }),
        ee.Feature(
            ee.Geometry.Point([118.57087567907963, 35.383108075218914]),
            {
              "class": 6,
              "system:index": "111"
            }),
        ee.Feature(
            ee.Geometry.Point([118.5627646790186, 35.38506742521354]),
            {
              "class": 6,
              "system:index": "112"
            }),
        ee.Feature(
            ee.Geometry.Point([118.54658559424077, 35.38475253288825]),
            {
              "class": 6,
              "system:index": "113"
            }),
        ee.Feature(
            ee.Geometry.Point([118.53971913916264, 35.38104370856485]),
            {
              "class": 6,
              "system:index": "114"
            }),
        ee.Feature(
            ee.Geometry.Point([118.59400704962407, 35.37918923246446]),
            {
              "class": 6,
              "system:index": "115"
            }),
        ee.Feature(
            ee.Geometry.Point([118.57495263678227, 35.39084023333025]),
            {
              "class": 6,
              "system:index": "116"
            }),
        ee.Feature(
            ee.Geometry.Point([118.57760487363558, 35.300889445551995]),
            {
              "class": 6,
              "system:index": "117"
            }),
        ee.Feature(
            ee.Geometry.Point([118.59640219726573, 35.29350431905529]),
            {
              "class": 6,
              "system:index": "118"
            }),
        ee.Feature(
            ee.Geometry.Point([118.59491625347148, 35.29071957402141]),
            {
              "class": 6,
              "system:index": "119"
            }),
        ee.Feature(
            ee.Geometry.Point([118.59148839035045, 35.2902641977952]),
            {
              "class": 6,
              "system:index": "120"
            }),
        ee.Feature(
            ee.Geometry.Point([118.58987370052348, 35.28832006278595]),
            {
              "class": 6,
              "system:index": "121"
            }),
        ee.Feature(
            ee.Geometry.Point([118.50563002107735, 35.22689511439777]),
            {
              "class": 6,
              "system:index": "122"
            }),
        ee.Feature(
            ee.Geometry.Point([118.50231481073494, 35.22608443020502]),
            {
              "class": 6,
              "system:index": "123"
            }),
        ee.Feature(
            ee.Geometry.Point([118.49957359312172, 35.227254442097944]),
            {
              "class": 6,
              "system:index": "124"
            }),
        ee.Feature(
            ee.Geometry.Point([119.18686127220771, 36.07474775259166]),
            {
              "class": 6,
              "system:index": "125"
            }),
        ee.Feature(
            ee.Geometry.Point([119.16216349159858, 36.077401210148835]),
            {
              "class": 6,
              "system:index": "126"
            }),
        ee.Feature(
            ee.Geometry.Point([119.16154121910712, 36.07266654676259]),
            {
              "class": 6,
              "system:index": "127"
            }),
        ee.Feature(
            ee.Geometry.Point([119.15499662911078, 36.083054683834966]),
            {
              "class": 6,
              "system:index": "128"
            }),
        ee.Feature(
            ee.Geometry.Point([119.1481730893769, 36.07434885907407]),
            {
              "class": 6,
              "system:index": "129"
            }),
        ee.Feature(
            ee.Geometry.Point([119.35434875721388, 36.41410229174158]),
            {
              "class": 6,
              "system:index": "130"
            }),
        ee.Feature(
            ee.Geometry.Point([119.34085188145094, 36.410493193268685]),
            {
              "class": 6,
              "system:index": "131"
            }),
        ee.Feature(
            ee.Geometry.Point([119.37162218326979, 36.41289352145536]),
            {
              "class": 6,
              "system:index": "132"
            }),
        ee.Feature(
            ee.Geometry.Point([119.35952593320188, 36.427247244734474]),
            {
              "class": 6,
              "system:index": "133"
            }),
        ee.Feature(
            ee.Geometry.Point([119.3541615151721, 36.42906005800108]),
            {
              "class": 6,
              "system:index": "134"
            }),
        ee.Feature(
            ee.Geometry.Point([119.36752964490232, 36.43693235592672]),
            {
              "class": 6,
              "system:index": "135"
            }),
        ee.Feature(
            ee.Geometry.Point([119.380618824895, 36.4413170177459]),
            {
              "class": 6,
              "system:index": "136"
            }),
        ee.Feature(
            ee.Geometry.Point([118.5556173202905, 36.79625967811102]),
            {
              "class": 6,
              "system:index": "137"
            }),
        ee.Feature(
            ee.Geometry.Point([117.50463110068004, 36.28009467067578]),
            {
              "class": 6,
              "system:index": "138"
            }),
        ee.Feature(
            ee.Geometry.Point([117.50906210997265, 36.279190857636785]),
            {
              "class": 6,
              "system:index": "139"
            }),
        ee.Feature(
            ee.Geometry.Point([117.50457745649975, 36.27867624170924]),
            {
              "class": 6,
              "system:index": "140"
            }),
        ee.Feature(
            ee.Geometry.Point([117.50112277128856, 36.2783129813648]),
            {
              "class": 6,
              "system:index": "141"
            }),
        ee.Feature(
            ee.Geometry.Point([117.49696534731548, 36.276833975367346]),
            {
              "class": 6,
              "system:index": "142"
            }),
        ee.Feature(
            ee.Geometry.Point([117.49419194319408, 36.279091394318655]),
            {
              "class": 6,
              "system:index": "143"
            }),
        ee.Feature(
            ee.Geometry.Point([117.49175649740856, 36.27849893627614]),
            {
              "class": 6,
              "system:index": "144"
            }),
        ee.Feature(
            ee.Geometry.Point([117.49347847559612, 36.277132373570666]),
            {
              "class": 6,
              "system:index": "145"
            }),
        ee.Feature(
            ee.Geometry.Point([117.49439931964852, 36.280605741371296]),
            {
              "class": 6,
              "system:index": "146"
            }),
        ee.Feature(
            ee.Geometry.Point([117.48882568931558, 36.279926805899294]),
            {
              "class": 6,
              "system:index": "147"
            }),
        ee.Feature(
            ee.Geometry.Point([116.53242605761166, 36.597132970734826]),
            {
              "class": 6,
              "system:index": "148"
            }),
        ee.Feature(
            ee.Geometry.Point([116.53856295183773, 36.59124103165839]),
            {
              "class": 6,
              "system:index": "149"
            }),
        ee.Feature(
            ee.Geometry.Point([116.51706236437435, 36.58907020385961]),
            {
              "class": 6,
              "system:index": "150"
            }),
        ee.Feature(
            ee.Geometry.Point([116.56551378801937, 36.59589259989445]),
            {
              "class": 6,
              "system:index": "151"
            }),
        ee.Feature(
            ee.Geometry.Point([116.49719255999203, 36.594411019702896]),
            {
              "class": 6,
              "system:index": "152"
            }),
        ee.Feature(
            ee.Geometry.Point([116.4914419038641, 36.60137075398915]),
            {
              "class": 6,
              "system:index": "153"
            }),
        ee.Feature(
            ee.Geometry.Point([116.4862920625555, 36.579628115551785]),
            {
              "class": 6,
              "system:index": "154"
            }),
        ee.Feature(
            ee.Geometry.Point([116.52478712633724, 36.5725285586996]),
            {
              "class": 6,
              "system:index": "155"
            }),
        ee.Feature(
            ee.Geometry.Point([116.46200197771664, 36.57635412917441]),
            {
              "class": 6,
              "system:index": "156"
            }),
        ee.Feature(
            ee.Geometry.Point([116.4870645387518, 36.565393880482084]),
            {
              "class": 6,
              "system:index": "157"
            }),
        ee.Feature(
            ee.Geometry.Point([116.44028681353207, 36.56880620011773]),
            {
              "class": 6,
              "system:index": "158"
            }),
        ee.Feature(
            ee.Geometry.Point([116.5750466607081, 36.066205785725884]),
            {
              "class": 6,
              "system:index": "159"
            }),
        ee.Feature(
            ee.Geometry.Point([116.57371092061868, 36.066383572143565]),
            {
              "class": 6,
              "system:index": "160"
            }),
        ee.Feature(
            ee.Geometry.Point([116.57609808664193, 36.06547729084269]),
            {
              "class": 6,
              "system:index": "161"
            }),
        ee.Feature(
            ee.Geometry.Point([116.57944548349252, 36.0660800341147]),
            {
              "class": 6,
              "system:index": "162"
            }),
        ee.Feature(
            ee.Geometry.Point([116.59333925155248, 36.05850823153593]),
            {
              "class": 6,
              "system:index": "163"
            }),
        ee.Feature(
            ee.Geometry.Point([122.3041564382553, 37.35448502580309]),
            {
              "class": 6,
              "system:index": "164"
            }),
        ee.Feature(
            ee.Geometry.Point([122.29386748447418, 37.355593698968974]),
            {
              "class": 6,
              "system:index": "165"
            }),
        ee.Feature(
            ee.Geometry.Point([122.3037058271408, 37.350357206351795]),
            {
              "class": 6,
              "system:index": "166"
            }),
        ee.Feature(
            ee.Geometry.Point([122.30926372237744, 37.06683015502839]),
            {
              "class": 6,
              "system:index": "167"
            }),
        ee.Feature(
            ee.Geometry.Point([122.29995109267773, 37.06902171182331]),
            {
              "class": 6,
              "system:index": "168"
            }),
        ee.Feature(
            ee.Geometry.Point([122.33580686278881, 37.066076792755126]),
            {
              "class": 6,
              "system:index": "169"
            }),
        ee.Feature(
            ee.Geometry.Point([122.32539989181103, 37.07123032608702]),
            {
              "class": 6,
              "system:index": "170"
            }),
        ee.Feature(
            ee.Geometry.Point([122.31688119597973, 37.06232699195587]),
            {
              "class": 6,
              "system:index": "171"
            }),
        ee.Feature(
            ee.Geometry.Point([122.32668735213818, 37.06037496749719]),
            {
              "class": 6,
              "system:index": "172"
            }),
        ee.Feature(
            ee.Geometry.Point([122.29591705031933, 37.06114550946772]),
            {
              "class": 6,
              "system:index": "173"
            }),
        ee.Feature(
            ee.Geometry.Point([122.32209541030468, 37.047274556666785]),
            {
              "class": 6,
              "system:index": "174"
            }),
        ee.Feature(
            ee.Geometry.Point([122.3202071351582, 37.048678891924325]),
            {
              "class": 6,
              "system:index": "175"
            }),
        ee.Feature(
            ee.Geometry.Point([122.30825521178784, 37.04539065149111]),
            {
              "class": 6,
              "system:index": "176"
            }),
        ee.Feature(
            ee.Geometry.Point([122.32441283889355, 37.043010013534996]),
            {
              "class": 6,
              "system:index": "177"
            }),
        ee.Feature(
            ee.Geometry.Point([122.31251851993012, 37.032408480559255]),
            {
              "class": 6,
              "system:index": "178"
            }),
        ee.Feature(
            ee.Geometry.Point([122.29897872882295, 37.03156912788157]),
            {
              "class": 6,
              "system:index": "179"
            }),
        ee.Feature(
            ee.Geometry.Point([122.3290838428061, 37.03283671814747]),
            {
              "class": 6,
              "system:index": "180"
            }),
        ee.Feature(
            ee.Geometry.Point([122.3312081523459, 37.034326966130834]),
            {
              "class": 6,
              "system:index": "181"
            }),
        ee.Feature(
            ee.Geometry.Point([121.25215472221154, 37.22229308601928]),
            {
              "class": 6,
              "system:index": "182"
            }),
        ee.Feature(
            ee.Geometry.Point([121.24850691795129, 37.22284839941008]),
            {
              "class": 6,
              "system:index": "183"
            }),
        ee.Feature(
            ee.Geometry.Point([121.2501484298684, 37.22396328548857]),
            {
              "class": 6,
              "system:index": "184"
            }),
        ee.Feature(
            ee.Geometry.Point([121.24432267188806, 37.22215639286522]),
            {
              "class": 6,
              "system:index": "185"
            }),
        ee.Feature(
            ee.Geometry.Point([121.2216882761644, 37.21624079572457]),
            {
              "class": 6,
              "system:index": "186"
            }),
        ee.Feature(
            ee.Geometry.Point([121.21834087931381, 37.22088858848022]),
            {
              "class": 6,
              "system:index": "187"
            }),
        ee.Feature(
            ee.Geometry.Point([121.18696976267563, 37.207149432118705]),
            {
              "class": 6,
              "system:index": "188"
            }),
        ee.Feature(
            ee.Geometry.Point([121.19902897440659, 37.21589903495485]),
            {
              "class": 6,
              "system:index": "189"
            }),
        ee.Feature(
            ee.Geometry.Point([120.60641558308585, 36.82254480468642]),
            {
              "class": 6,
              "system:index": "190"
            }),
        ee.Feature(
            ee.Geometry.Point([120.58345587391837, 36.81538175547197]),
            {
              "class": 6,
              "system:index": "191"
            }),
        ee.Feature(
            ee.Geometry.Point([120.59489281315787, 36.81289084986332]),
            {
              "class": 6,
              "system:index": "192"
            }),
        ee.Feature(
            ee.Geometry.Point([120.59669185811404, 36.82663914345708]),
            {
              "class": 6,
              "system:index": "193"
            }),
        ee.Feature(
            ee.Geometry.Point([120.59208267976449, 36.83233785383543]),
            {
              "class": 6,
              "system:index": "194"
            }),
        ee.Feature(
            ee.Geometry.Point([119.86592925248465, 37.165555562819954]),
            {
              "class": 6,
              "system:index": "195"
            }),
        ee.Feature(
            ee.Geometry.Point([119.87826741395315, 37.16256309565499]),
            {
              "class": 6,
              "system:index": "196"
            }),
        ee.Feature(
            ee.Geometry.Point([119.85041535554251, 37.16324709859516]),
            {
              "class": 6,
              "system:index": "197"
            }),
        ee.Feature(
            ee.Geometry.Point([119.85067284760794, 37.15218259140698]),
            {
              "class": 6,
              "system:index": "198"
            }),
        ee.Feature(
            ee.Geometry.Point([119.86350453553518, 37.15047232216659]),
            {
              "class": 6,
              "system:index": "199"
            }),
        ee.Feature(
            ee.Geometry.Point([119.8525396650823, 37.14469132581076]),
            {
              "class": 6,
              "system:index": "200"
            }),
        ee.Feature(
            ee.Geometry.Point([119.84303391633352, 37.14070594380273]),
            {
              "class": 6,
              "system:index": "201"
            }),
        ee.Feature(
            ee.Geometry.Point([117.70891497647804, 37.46916142962149]),
            {
              "class": 6,
              "system:index": "202"
            }),
        ee.Feature(
            ee.Geometry.Point([117.68080542600197, 37.4722268647083]),
            {
              "class": 6,
              "system:index": "203"
            }),
        ee.Feature(
            ee.Geometry.Point([117.72874186551613, 37.448892335053834]),
            {
              "class": 6,
              "system:index": "204"
            }),
        ee.Feature(
            ee.Geometry.Point([117.70020316159767, 37.44677994528126]),
            {
              "class": 6,
              "system:index": "205"
            }),
        ee.Feature(
            ee.Geometry.Point([117.68089125669044, 37.444156410429414]),
            {
              "class": 6,
              "system:index": "206"
            }),
        ee.Feature(
            ee.Geometry.Point([117.71466563260597, 37.42998091680597]),
            {
              "class": 6,
              "system:index": "207"
            }),
        ee.Feature(
            ee.Geometry.Point([117.7171225388316, 37.40770002108228]),
            {
              "class": 6,
              "system:index": "208"
            }),
        ee.Feature(
            ee.Geometry.Point([117.67729709937848, 37.40735912957066]),
            {
              "class": 6,
              "system:index": "209"
            }),
        ee.Feature(
            ee.Geometry.Point([117.60870988468444, 37.358108255904746]),
            {
              "class": 6,
              "system:index": "210"
            }),
        ee.Feature(
            ee.Geometry.Point([117.60586674312866, 37.35778419476069]),
            {
              "class": 6,
              "system:index": "211"
            }),
        ee.Feature(
            ee.Geometry.Point([117.6022725830487, 37.357605107738706]),
            {
              "class": 6,
              "system:index": "212"
            }),
        ee.Feature(
            ee.Geometry.Point([117.59505207638061, 37.35672672234771]),
            {
              "class": 6,
              "system:index": "213"
            }),
        ee.Feature(
            ee.Geometry.Point([117.61233023764558, 37.31740383815471]),
            {
              "class": 6,
              "system:index": "214"
            }),
        ee.Feature(
            ee.Geometry.Point([117.61250726344056, 37.31742516947493]),
            {
              "class": 6,
              "system:index": "215"
            }),
        ee.Feature(
            ee.Geometry.Point([117.60987333418794, 37.317745138551764]),
            {
              "class": 6,
              "system:index": "216"
            }),
        ee.Feature(
            ee.Geometry.Point([117.60277620913453, 37.31621994039104]),
            {
              "class": 6,
              "system:index": "217"
            }),
        ee.Feature(
            ee.Geometry.Point([117.56780020358033, 37.316492985133245]),
            {
              "class": 6,
              "system:index": "218"
            }),
        ee.Feature(
            ee.Geometry.Point([117.56337992312379, 37.307447850335365]),
            {
              "class": 6,
              "system:index": "219"
            }),
        ee.Feature(
            ee.Geometry.Point([117.60354868533082, 37.30423912595459]),
            {
              "class": 6,
              "system:index": "220"
            }),
        ee.Feature(
            ee.Geometry.Point([117.56166330935426, 37.28433514988406]),
            {
              "class": 6,
              "system:index": "221"
            }),
        ee.Feature(
            ee.Geometry.Point([117.54745833041139, 37.2999037170463]),
            {
              "class": 6,
              "system:index": "222"
            }),
        ee.Feature(
            ee.Geometry.Point([115.6066960635777, 35.23291669039555]),
            {
              "class": 6,
              "system:index": "223"
            }),
        ee.Feature(
            ee.Geometry.Point([115.61115925937848, 35.235125052057086]),
            {
              "class": 6,
              "system:index": "224"
            }),
        ee.Feature(
            ee.Geometry.Point([115.6160623374577, 35.231654742453976]),
            {
              "class": 6,
              "system:index": "225"
            }),
        ee.Feature(
            ee.Geometry.Point([115.60191100269513, 35.23576476464142]),
            {
              "class": 6,
              "system:index": "226"
            }),
        ee.Feature(
            ee.Geometry.Point([115.61593887248466, 35.2268499416206]),
            {
              "class": 6,
              "system:index": "227"
            }),
        ee.Feature(
            ee.Geometry.Point([115.61931845584343, 35.2258683548557]),
            {
              "class": 6,
              "system:index": "228"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[117.15174989123376, 34.97689918438491],
                  [117.15174989123376, 34.9761673280005],
                  [117.15401904006036, 34.9761673280005],
                  [117.15401904006036, 34.97689918438491]]], null, false),
            {
              "class": 6,
              "system:index": "229"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[117.15501444990454, 34.9799187088609],
                  [117.15501444990454, 34.9790923784907],
                  [117.15681689436255, 34.9790923784907],
                  [117.15681689436255, 34.9799187088609]]], null, false),
            {
              "class": 6,
              "system:index": "230"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[116.24788844743226, 34.908228587215824],
                  [116.24788844743226, 34.90645129252404],
                  [116.25110709825013, 34.90645129252404],
                  [116.25110709825013, 34.908228587215824]]], null, false),
            {
              "class": 6,
              "system:index": "231"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[115.4886430519675, 36.45035880015007],
                  [115.4886430519675, 36.449815109857305],
                  [115.49006998716342, 36.449815109857305],
                  [115.49006998716342, 36.45035880015007]]], null, false),
            {
              "class": 6,
              "system:index": "232"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[118.14060401149703, 35.1104981352012],
                  [118.14060401149703, 35.10967751301439],
                  [118.14264785476638, 35.10967751301439],
                  [118.14264785476638, 35.1104981352012]]], null, false),
            {
              "class": 6,
              "system:index": "233"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[118.65322532891838, 37.36639476985238],
                  [118.653155591484, 37.36574671772945],
                  [118.65621330976097, 37.365597494408355],
                  [118.65622940301506, 37.366160277954116]]]),
            {
              "class": 6,
              "system:index": "234"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[115.30648938915375, 36.47998913165469],
                  [115.30648938915375, 36.479240763827576],
                  [115.3083696176732, 36.479240763827576],
                  [115.3083696176732, 36.47998913165469]]], null, false),
            {
              "class": 6,
              "system:index": "235"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[116.706646640841, 35.36295038960741],
                  [116.706646640841, 35.36009803823858],
                  [116.71578760916375, 35.36009803823858],
                  [116.71578760916375, 35.36295038960741]]], null, false),
            {
              "class": 6,
              "system:index": "236"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[116.68660517508172, 35.362897893253226],
                  [116.68660517508172, 35.360273032021546],
                  [116.69248457724237, 35.360273032021546],
                  [116.69248457724237, 35.362897893253226]]], null, false),
            {
              "class": 6,
              "system:index": "237"
            })]),
    forest_p = ui.import && ui.import("forest_p", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            120.65114250496023,
            37.350353792256286
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            120.66249361351126,
            37.347061608119
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            120.66684952095144,
            37.34871624720673
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            120.66328754737967,
            37.34320632817482
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            120.64517641766112,
            37.3356080082351
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            121.03961294366296,
            37.28409975720414
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            121.03922670556481,
            37.24960516973642
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            121.02871244622644,
            37.24103030126736
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            121.07300108148034,
            37.24017617727392
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.15072500436318,
            36.42463209202596
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.1592651578666,
            36.4247702172741
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.1537719938041,
            36.41572249448827
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.11901056497109,
            36.41005849800387
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.07413090472572,
            36.27563557048225
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.04572094683998,
            36.27667348829345
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.06426037555092,
            36.25487431661503
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.06245793109291,
            36.28691353756584
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.02572239642494,
            36.250790620612044
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.02786816363685,
            36.238469024170854
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.08022488360756,
            36.23431523932399
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.32354879589575,
            36.159993943541075
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.31581921554445,
            36.0467587698739
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.32423062301515,
            36.04717515251589
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.32886548019289,
            36.02774161607708
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.2830318925464,
            36.06299606092514
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.26929898239015,
            36.079230001706975
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.36371273971437,
            36.033849815696556
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.26929898239015,
            36.02399316818047
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.94097196701082,
            35.49947787677509
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.93178808334383,
            35.47620561583945
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.03710233810457,
            35.48242618932494
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.0176187718204,
            35.51317251287223
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.94200193527254,
            35.529239770709594
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.93307554367098,
            35.538948423663335
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.00474416854891,
            35.539646842599595
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            116.31836352309705,
            35.32418483455421
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "class": 5
      },
      "color": "#00d551",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #00d551 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([120.65114250496023, 37.350353792256286]),
            {
              "class": 5,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([120.66249361351126, 37.347061608119]),
            {
              "class": 5,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([120.66684952095144, 37.34871624720673]),
            {
              "class": 5,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([120.66328754737967, 37.34320632817482]),
            {
              "class": 5,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([120.64517641766112, 37.3356080082351]),
            {
              "class": 5,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([121.03961294366296, 37.28409975720414]),
            {
              "class": 5,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([121.03922670556481, 37.24960516973642]),
            {
              "class": 5,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([121.02871244622644, 37.24103030126736]),
            {
              "class": 5,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([121.07300108148034, 37.24017617727392]),
            {
              "class": 5,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([118.15072500436318, 36.42463209202596]),
            {
              "class": 5,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([118.1592651578666, 36.4247702172741]),
            {
              "class": 5,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([118.1537719938041, 36.41572249448827]),
            {
              "class": 5,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([118.11901056497109, 36.41005849800387]),
            {
              "class": 5,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([117.07413090472572, 36.27563557048225]),
            {
              "class": 5,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([117.04572094683998, 36.27667348829345]),
            {
              "class": 5,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([117.06426037555092, 36.25487431661503]),
            {
              "class": 5,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([117.06245793109291, 36.28691353756584]),
            {
              "class": 5,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([117.02572239642494, 36.250790620612044]),
            {
              "class": 5,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([117.02786816363685, 36.238469024170854]),
            {
              "class": 5,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([117.08022488360756, 36.23431523932399]),
            {
              "class": 5,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([117.32354879589575, 36.159993943541075]),
            {
              "class": 5,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([117.31581921554445, 36.0467587698739]),
            {
              "class": 5,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([117.32423062301515, 36.04717515251589]),
            {
              "class": 5,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([117.32886548019289, 36.02774161607708]),
            {
              "class": 5,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([117.2830318925464, 36.06299606092514]),
            {
              "class": 5,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([117.26929898239015, 36.079230001706975]),
            {
              "class": 5,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([117.36371273971437, 36.033849815696556]),
            {
              "class": 5,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([117.26929898239015, 36.02399316818047]),
            {
              "class": 5,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([117.94097196701082, 35.49947787677509]),
            {
              "class": 5,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([117.93178808334383, 35.47620561583945]),
            {
              "class": 5,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([118.03710233810457, 35.48242618932494]),
            {
              "class": 5,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([118.0176187718204, 35.51317251287223]),
            {
              "class": 5,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([117.94200193527254, 35.529239770709594]),
            {
              "class": 5,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([117.93307554367098, 35.538948423663335]),
            {
              "class": 5,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([118.00474416854891, 35.539646842599595]),
            {
              "class": 5,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([116.31836352309705, 35.32418483455421]),
            {
              "class": 5,
              "system:index": "35"
            })]),
    grass_p = ui.import && ui.import("grass_p", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            117.86317771162925,
            35.974284422396074
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.8644651719564,
            35.9717316848991
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.86660021033225,
            35.96961302374745
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.8627914735311,
            35.96943067730244
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.85351103033958,
            35.969647756355855
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.84882252898154,
            35.96969985523987
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.18956485582468,
            36.075840985078685
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.21737399889109,
            36.07563286986715
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.25140586687205,
            36.073655747889184
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.24934593034861,
            36.072545762888794
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.23994746996043,
            36.067481257545246
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            118.23732963396189,
            36.067134361685646
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.02681694753865,
            36.31735183910268
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.02119503744343,
            36.31837191274569
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.01877032049397,
            36.315415391396606
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.01477919347981,
            36.31588221801194
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.00589571722249,
            36.31370366988946
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.13976065286339,
            36.21750320167326
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.13861266740501,
            36.21651643325165
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.13654200204552,
            36.21610960405102
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.1360162890786,
            36.2158066447614
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.13240067132652,
            36.21860248166264
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            117.13139216073692,
            36.21883618486622
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "class": 4
      },
      "color": "#198b1f",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #198b1f */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([117.86317771162925, 35.974284422396074]),
            {
              "class": 4,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([117.8644651719564, 35.9717316848991]),
            {
              "class": 4,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([117.86660021033225, 35.96961302374745]),
            {
              "class": 4,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([117.8627914735311, 35.96943067730244]),
            {
              "class": 4,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([117.85351103033958, 35.969647756355855]),
            {
              "class": 4,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([117.84882252898154, 35.96969985523987]),
            {
              "class": 4,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([118.18956485582468, 36.075840985078685]),
            {
              "class": 4,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([118.21737399889109, 36.07563286986715]),
            {
              "class": 4,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([118.25140586687205, 36.073655747889184]),
            {
              "class": 4,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([118.24934593034861, 36.072545762888794]),
            {
              "class": 4,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([118.23994746996043, 36.067481257545246]),
            {
              "class": 4,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([118.23732963396189, 36.067134361685646]),
            {
              "class": 4,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([117.02681694753865, 36.31735183910268]),
            {
              "class": 4,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([117.02119503744343, 36.31837191274569]),
            {
              "class": 4,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([117.01877032049397, 36.315415391396606]),
            {
              "class": 4,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([117.01477919347981, 36.31588221801194]),
            {
              "class": 4,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([117.00589571722249, 36.31370366988946]),
            {
              "class": 4,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([117.13976065286339, 36.21750320167326]),
            {
              "class": 4,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([117.13861266740501, 36.21651643325165]),
            {
              "class": 4,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([117.13654200204552, 36.21610960405102]),
            {
              "class": 4,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([117.1360162890786, 36.2158066447614]),
            {
              "class": 4,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([117.13240067132652, 36.21860248166264]),
            {
              "class": 4,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([117.13139216073692, 36.21883618486622]),
            {
              "class": 4,
              "system:index": "22"
            })]),
    study_area = ui.import && ui.import("study_area", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                118.75706526337072,
                36.756114123929635
              ],
              [
                118.75706526337072,
                36.726951508545895
              ],
              [
                118.79620405731603,
                36.726951508545895
              ],
              [
                118.79620405731603,
                36.756114123929635
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
                119.38858685822102,
                36.66075261255298
              ],
              [
                119.38858685822102,
                36.64491500627407
              ],
              [
                119.41030202240559,
                36.64491500627407
              ],
              [
                119.41030202240559,
                36.66075261255298
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
        [[[[118.75706526337072, 36.756114123929635],
           [118.75706526337072, 36.726951508545895],
           [118.79620405731603, 36.726951508545895],
           [118.79620405731603, 36.756114123929635]]],
         [[[119.38858685822102, 36.66075261255298],
           [119.38858685822102, 36.64491500627407],
           [119.41030202240559, 36.64491500627407],
           [119.41030202240559, 36.66075261255298]]]], null, false),
    yanjiuqu = ui.import && ui.import("yanjiuqu", "table", {
      "id": "users/yxflovexh/project/yanjiuqu"
    }) || ee.FeatureCollection("users/yxflovexh/project/yanjiuqu"),
    imageVisParam_pgi = ui.import && ui.import("imageVisParam_pgi", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "pgi"
        ],
        "max": 7,
        "palette": [
          "2ec808",
          "33e207",
          "24ff16",
          "57ff43",
          "a1ff4b",
          "c1ffad",
          "f4ffe6",
          "f9ffa5",
          "fffb78",
          "ffe4d4",
          "ff9a7c",
          "ff0808"
        ]
      }
    }) || {"opacity":1,"bands":["pgi"],"max":7,"palette":["2ec808","33e207","24ff16","57ff43","a1ff4b","c1ffad","f4ffe6","f9ffa5","fffb78","ffe4d4","ff9a7c","ff0808"]},
    imageVisParam_rpgi = ui.import && ui.import("imageVisParam_rpgi", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "rpgi"
        ],
        "max": 0.25,
        "palette": [
          "2ec808",
          "33e207",
          "24ff16",
          "57ff43",
          "a1ff4b",
          "c1ffad",
          "f4ffe6",
          "f9ffa5",
          "fffb78",
          "ffc5af",
          "ff9a7c",
          "ff1408"
        ]
      }
    }) || {"opacity":1,"bands":["rpgi"],"max":0.25,"palette":["2ec808","33e207","24ff16","57ff43","a1ff4b","c1ffad","f4ffe6","f9ffa5","fffb78","ffc5af","ff9a7c","ff1408"]},
    text_area = ui.import && ui.import("text_area", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                118.79994945167546,
                36.78399057455301
              ],
              [
                118.79994945167546,
                36.77484738465199
              ],
              [
                118.81385402320866,
                36.77484738465199
              ],
              [
                118.81385402320866,
                36.78399057455301
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
                117.66560985192018,
                37.38994038998957
              ],
              [
                117.66560985192018,
                37.37759620456554
              ],
              [
                117.6849217568274,
                37.37759620456554
              ],
              [
                117.6849217568274,
                37.38994038998957
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
        [[[[118.79994945167546, 36.78399057455301],
           [118.79994945167546, 36.77484738465199],
           [118.81385402320866, 36.77484738465199],
           [118.81385402320866, 36.78399057455301]]],
         [[[117.66560985192018, 37.38994038998957],
           [117.66560985192018, 37.37759620456554],
           [117.6849217568274, 37.37759620456554],
           [117.6849217568274, 37.38994038998957]]]], null, false),
    shouguang = ui.import && ui.import("shouguang", "table", {
      "id": "users/yxflovexh/project/shouguang"
    }) || ee.FeatureCollection("users/yxflovexh/project/shouguang");
//-----------------------------------------------------数据预处理-----------------------------------------------------------
////////////////////哨兵数据2-L1C去云//////////////////////
function maskS2clouds(image) {
  var qa = image.select('QA60');
  var cloudBitMask = Math.pow(2, 10);
  var cirrusBitMask = Math.pow(2, 11);
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0).and(
             qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask);
}
////////////////////影像镶嵌或合成/////////////////////////
var Date_Start = ee.Date('2018-01-01');
var Date_End = ee.Date('2018-12-31');
//var Date_window = ee.Number(30);
// Create list of dates for time series
//创建一个相隔十天的日期的数列
var n_days = Date_End.difference(Date_Start,'day').round();
var dates1 = ee.List.sequence(0,n_days,10);
var make_datelist = function(n) {
  return Date_Start.advance(n,'day');
};
var dates = dates1.map(make_datelist);
//相等时间间隔获得mosaic影像
var fnc = function(d1) {
  var start = ee.Date(d1);
  var time =ee.Date(d1).advance(4,'day').millis();
  var end = ee.Date(d1).advance(10,'day');
  var date_range = ee.DateRange(start,end);
  var S1 = S2_L1.filterDate(date_range).map(maskS2clouds);
  var mosaic =S1.qualityMosaic('QA60').set('system:time_start',time);
  return mosaic;
};
var list_of_images = dates.map(fnc);
var image_mosaic = ee.ImageCollection(list_of_images).filterBounds(sd_shp).map(function clip(img){return img.clip(sd_shp)});
//print('image_mosaic',image_mosaic);
//Map.addLayer(image_mosaic.filterMetadata("system:index","equals","10").select("B2"));
/////////////////////时序插值//////////////////////////////////
var imgcol_band = image_mosaic.select('B2');
var pkg_smooth = require('users/kongdd/public:Math/pkg_smooth.js');
var frame  = 16*12; 
var nodata = -9999;
var imgcol_band2 = pkg_smooth.linearInterp(imgcol_band, frame, nodata).select('B2');
imgcol_band = image_mosaic.select('B3');
var imgcol_band3 = pkg_smooth.linearInterp(imgcol_band, frame, nodata).select('B3');
imgcol_band = image_mosaic.select('B4');
var imgcol_band4 = pkg_smooth.linearInterp(imgcol_band, frame, nodata).select('B4');
imgcol_band = image_mosaic.select('B5');
var imgcol_band5 = pkg_smooth.linearInterp(imgcol_band, frame, nodata).select('B5');
imgcol_band = image_mosaic.select('B6');
var imgcol_band6 = pkg_smooth.linearInterp(imgcol_band, frame, nodata).select('B6');
imgcol_band = image_mosaic.select('B7');
var imgcol_band7 = pkg_smooth.linearInterp(imgcol_band, frame, nodata).select('B7');
imgcol_band = image_mosaic.select('B8');
var imgcol_band8 = pkg_smooth.linearInterp(imgcol_band, frame, nodata).select('B8');
imgcol_band = image_mosaic.select('B8A');
var imgcol_band8A = pkg_smooth.linearInterp(imgcol_band, frame, nodata).select('B8A');
imgcol_band = image_mosaic.select('B11');
var imgcol_band11 = pkg_smooth.linearInterp(imgcol_band, frame, nodata).select('B11');
imgcol_band = image_mosaic.select('B12');
var imgcol_band12 = pkg_smooth.linearInterp(imgcol_band, frame, nodata).select('B12');
//-----------------------------------------------------训练点位-----------------------------------------------------------
//显示配置
//增加类这个属性
isa_p=isa_p.map(function(feature){
  return feature.set('class',2);})
open_p=open_p.map(function(feature){
  return feature.set('class',6);})
pg_p=pg_p.map(function(feature){
  return feature.set('class',7);})
Map.addLayer(sd_shp,{},'study_area');
Map.addLayer(yanjiuqu,{},'yjq');
Map.centerObject(sd_shp, 6);
//土地利用类型
//var barr_s=Lucc_sd.updateMask(Lucc_sd.eq(23));
//Map.addLayer(barr_s);
//各个类型参考点位，共9种利用类型,共789个点位
//裸土31个点位
//Map.addLayer(soil_p,{},'soil_p');
//不透水面136个点位（实地调研69个点位）
var ISA_p=isa_p.merge(isa_p2);
//Map.addLayer(ISA_p,{},'ISA_p');
//水体16个点位
//Map.addLayer(water_p,{},"water_p");
//林地36个点位
//Map.addLayer(forest_p,{},"forest_p");
//稀疏植被23个点位
//Map.addLayer(grass_p,{},"grass_p");
//露天农田289个点位（实地调研60个点位）
var Open_p=open_p.merge(open_p2);
//Map.addLayer(Open_p,{},"Open_p");
//塑料大棚210个点位（实地调研61个点位）
var PG_p=pg_p.merge(pg_p2);
//Map.addLayer(PG_p,{},"PG_p");
//黑色大棚14个点位
//Map.addLayer(pg3_p,{},"pg3_p");
//白色大棚34个点位
//Map.addLayer(pg2_p,{},"pg2_p");
//-----------------------------------------------------光谱特征参数提取-----------------------------------------------------------
//以4.15号为前后16天线性插值
var blue=imgcol_band2.filterMetadata("system:index","equals","10").first().multiply(0.0001);
var green=imgcol_band3.filterMetadata("system:index","equals","10").first().multiply(0.0001);
var red=imgcol_band4.filterMetadata("system:index","equals","10").first().multiply(0.0001);
//增加红光边缘
var rs1=imgcol_band5.filterMetadata("system:index","equals","10").first().multiply(0.0001);
var rs2=imgcol_band6.filterMetadata("system:index","equals","10").first().multiply(0.0001);
var rs3=imgcol_band7.filterMetadata("system:index","equals","10").first().multiply(0.0001);
var nir=imgcol_band8.filterMetadata("system:index","equals","10").first().multiply(0.0001);
var nir2=imgcol_band8A.filterMetadata("system:index","equals","10").first().multiply(0.0001);
var swir1=imgcol_band11.filterMetadata("system:index","equals","10").first().multiply(0.0001);
var swir2=imgcol_band12.filterMetadata("system:index","equals","10").first().multiply(0.0001);
var img = blue
      .addBands(green)
      .addBands(red)
      .addBands(rs1)
      .addBands(rs2)
      .addBands(rs3)
      .addBands(nir)
      .addBands(nir2)
      .addBands(swir1)
      .addBands(swir2);
//塑料大棚指数和植被指数,大棚指数和改进的大棚指数
function PGI(img){
  var blue=img.select('B2');
  var green=img.select('B3');
  var red=img.select('B4');
  var nir=img.select('B8');
  var sw1=img.select('B11');
  var mean=(blue.add(green).add(nir)).divide(ee.Image(3));
  var pgi=((blue.multiply(nir.subtract(red))).divide(ee.Image(1).subtract(mean))).multiply(ee.Image(100));
  var rpgi=(blue).divide(ee.Image(1).subtract(mean));
  var ndvi=(nir.subtract(red)).divide(nir.add(red));
  var ndbi=(sw1.subtract(nir)).divide(sw1.add(nir));
  return img.addBands(img.select('B8').subtract(img.select('B4')).rename('nir-red')).addBands(ndvi.rename('ndvi').addBands(ndbi.rename('ndbi')).addBands(pgi.rename('pgi')).addBands(rpgi.rename('rpgi')));
}
img=PGI(img);
//-----------------------------------------------------纹理特征参数提取GLCM-----------------------------------------------------------
//基于大棚指数归一化到灰度级，建立灰度共生矩阵
var glcm = img.select("rpgi").unitScale(0,0.35).multiply(255).byte().glcmTexture({size:2});
print('glcm',glcm);
//获得18个纹理特征，并从中选取5个对大棚提取更相关的纹理特征
//角二阶矩、对比度、相关、同质性和熵
var asm=glcm.select('rpgi_asm');
var contrast = glcm.select('rpgi_contrast');
var corr = glcm.select('rpgi_corr');
var idm=glcm.select('rpgi_idm');
var ent = glcm.select('rpgi_ent');
//-----------------------------------------------------------机器学习的方法（随机森林）--------------------------------------------------
//光谱特征与纹理特征融合
var bands = ['B2', 'B3', 'B7','B12','rpgi','nir-red','rpgi_asm','rpgi_contrast','rpgi_corr','rpgi_idm','rpgi_ent'];
img = img.addBands(asm)
        .addBands(contrast)
         .addBands(corr)
         .addBands(idm)
        .addBands(ent);
var data = img.select(bands);
//print(data);
//训练要素集合
var train_feature =  ee.FeatureCollection(soil_p.merge(ISA_p).merge(water_p).merge(forest_p).merge(grass_p).merge(Open_p).merge(PG_p).merge(pg3_p).merge(pg2_p));
print(train_feature,{},"train_feature");
var training = data.sampleRegions({
  collection: train_feature,
  properties: ['class'],
  scale:30
});
//获得RF训练器
var model = ee.Classifier.randomForest({numberOfTrees:100,  outOfBagMode:true, seed:0}).train({
  features: training, 
  classProperty: 'class', 
  inputProperties: bands
});
//获得模型的混淆矩阵和精度
print("model",model);
print('Confusion matrix: ', model.confusionMatrix());
print('Confusion matrix accuracy: ', model.confusionMatrix().accuracy());
//将模型应用到研究区图像上 
var result = data.classify(model);
print(result);
Map.addLayer(result,
{min:1,max:9,palette:[ 
  'c6b044 ',//裸土,棕色
  '69fff8' ,//不透水面,浅蓝色
  '1c0dff',//水体,深蓝色
  '78d203',//稀疏植被,浅绿色
  '086a10',//林地,深绿色
  'c24f44',//露天农田,浅红色
  '980aa9',//塑料大棚,紫色
  '0c0300',//黑色大棚,黑色
  'f9ffa4'//白色大棚,白色
]}, 'classification');
/*
Export.image.toDrive({
  image:result.toInt8(),
  description:"result",
  region:sd_shp,
  folder:"end",
  maxPixels:1e13,
  scale:10,
  crs:"EPSG:4326",
});
*/
Export.image.toAsset({
  image:result.toInt8(),
  description:"house_rec18",
  assetId:"project/house_rec18",
  region:sd_shp,
  maxPixels:1e13,
  scale:10,
  crs:"EPSG:4326",
});