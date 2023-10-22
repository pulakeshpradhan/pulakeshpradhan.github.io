var L5 = ui.import && ui.import("L5", "imageCollection", {
      "id": "LANDSAT/LT05/C01/T1_TOA"
    }) || ee.ImageCollection("LANDSAT/LT05/C01/T1_TOA"),
    L8 = ui.import && ui.import("L8", "imageCollection", {
      "id": "LANDSAT/LC08/C01/T1_TOA"
    }) || ee.ImageCollection("LANDSAT/LC08/C01/T1_TOA"),
    Delhi = ui.import && ui.import("Delhi", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                77.07949737548827,
                28.766716791218276
              ],
              [
                77.07949737548827,
                28.625173574040833
              ],
              [
                77.32943634033202,
                28.625173574040833
              ],
              [
                77.32943634033202,
                28.766716791218276
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#bf04c2",
      "mode": "Geometry",
      "shown": false,
      "locked": true
    }) || 
    /* color: #bf04c2 */
    /* shown: false */
    /* locked: true */
    ee.Geometry.Polygon(
        [[[77.07949737548827, 28.766716791218276],
          [77.07949737548827, 28.625173574040833],
          [77.32943634033202, 28.625173574040833],
          [77.32943634033202, 28.766716791218276]]], null, false),
    Hyderabad = ui.import && ui.import("Hyderabad", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                78.42713350219725,
                17.43905248959987
              ],
              [
                78.42713350219725,
                17.336257171987324
              ],
              [
                78.54171747131346,
                17.336257171987324
              ],
              [
                78.54171747131346,
                17.43905248959987
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#ff0000",
      "mode": "Geometry",
      "shown": false,
      "locked": true
    }) || 
    /* color: #ff0000 */
    /* shown: false */
    /* locked: true */
    ee.Geometry.Polygon(
        [[[78.42713350219725, 17.43905248959987],
          [78.42713350219725, 17.336257171987324],
          [78.54171747131346, 17.336257171987324],
          [78.54171747131346, 17.43905248959987]]], null, false),
    Kolkata = ui.import && ui.import("Kolkata", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                88.30582030055393,
                22.61229296946945
              ],
              [
                88.30582030055393,
                22.528597828094455
              ],
              [
                88.42289335963596,
                22.528597828094455
              ],
              [
                88.42289335963596,
                22.61229296946945
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#00ff00",
      "mode": "Geometry",
      "shown": false,
      "locked": true
    }) || 
    /* color: #00ff00 */
    /* shown: false */
    /* locked: true */
    ee.Geometry.Polygon(
        [[[88.30582030055393, 22.61229296946945],
          [88.30582030055393, 22.528597828094455],
          [88.42289335963596, 22.528597828094455],
          [88.42289335963596, 22.61229296946945]]], null, false),
    Ahmedabad = ui.import && ui.import("Ahmedabad", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                72.51947243347169,
                23.06139912154098
              ],
              [
                72.51947243347169,
                22.952690408587117
              ],
              [
                72.71859963073732,
                22.952690408587117
              ],
              [
                72.71859963073732,
                23.06139912154098
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#0000ff",
      "mode": "Geometry",
      "shown": false,
      "locked": true
    }) || 
    /* color: #0000ff */
    /* shown: false */
    /* locked: true */
    ee.Geometry.Polygon(
        [[[72.51947243347169, 23.06139912154098],
          [72.51947243347169, 22.952690408587117],
          [72.71859963073732, 22.952690408587117],
          [72.71859963073732, 23.06139912154098]]], null, false),
    urban_ahmedabad_1988 = ui.import && ui.import("urban_ahmedabad_1988", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            73.98046293131705,
            23.208402370224505
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.93102445475455,
            23.440437658697633
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.7305239664733,
            23.68212776734161
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.4229067789733,
            23.80453331026925
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.98492612711783,
            22.249249452293064
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.8455370890319,
            22.223826280553503
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.69550504557486,
            22.33025499854803
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.54100980631705,
            22.335018567884774
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.66838254801627,
            22.48990444797015
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.79472532145377,
            22.57425709471357
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.31377899510214,
            22.32841984538839
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.26090729100058,
            22.41033162987778
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.96049988133261,
            22.55435369934962
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.5661992918432,
            22.690263463059864
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.35917567123774,
            22.691688834370773
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.64938774464551,
            22.93779945402961
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.56252708790723,
            23.081267006291544
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.74843635914746,
            23.75623784356884
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.11785164235059,
            23.692747473803887
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.11922493336621,
            23.48760773422309
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.53189888356152,
            23.59651017771733
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.6843341862959,
            23.463045026317225
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.68717218197924,
            22.893221629890842
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.86364007748705,
            23.0373684031792
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.06139398373705,
            22.840076240222956
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.13280834501069,
            23.069906570316913
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.1774403030185,
            23.010194591854837
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.33227886503022,
            23.060746134227657
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.40883983915131,
            23.181676730201573
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.0404545242099,
            23.165895634183084
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 0
      },
      "color": "#d63000",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": true
    }) || 
    /* color: #d63000 */
    /* shown: false */
    /* locked: true */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([73.98046293131705, 23.208402370224505]),
            {
              "landcover": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([73.93102445475455, 23.440437658697633]),
            {
              "landcover": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([73.7305239664733, 23.68212776734161]),
            {
              "landcover": 0,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([73.4229067789733, 23.80453331026925]),
            {
              "landcover": 0,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([73.98492612711783, 22.249249452293064]),
            {
              "landcover": 0,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([73.8455370890319, 22.223826280553503]),
            {
              "landcover": 0,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([73.69550504557486, 22.33025499854803]),
            {
              "landcover": 0,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([73.54100980631705, 22.335018567884774]),
            {
              "landcover": 0,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([73.66838254801627, 22.48990444797015]),
            {
              "landcover": 0,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([73.79472532145377, 22.57425709471357]),
            {
              "landcover": 0,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([73.31377899510214, 22.32841984538839]),
            {
              "landcover": 0,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([73.26090729100058, 22.41033162987778]),
            {
              "landcover": 0,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([72.96049988133261, 22.55435369934962]),
            {
              "landcover": 0,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([72.5661992918432, 22.690263463059864]),
            {
              "landcover": 0,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([72.35917567123774, 22.691688834370773]),
            {
              "landcover": 0,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([72.64938774464551, 22.93779945402961]),
            {
              "landcover": 0,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([72.56252708790723, 23.081267006291544]),
            {
              "landcover": 0,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([72.74843635914746, 23.75623784356884]),
            {
              "landcover": 0,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([73.11785164235059, 23.692747473803887]),
            {
              "landcover": 0,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([73.11922493336621, 23.48760773422309]),
            {
              "landcover": 0,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([73.53189888356152, 23.59651017771733]),
            {
              "landcover": 0,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([73.6843341862959, 23.463045026317225]),
            {
              "landcover": 0,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([73.68717218197924, 22.893221629890842]),
            {
              "landcover": 0,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([73.86364007748705, 23.0373684031792]),
            {
              "landcover": 0,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([74.06139398373705, 22.840076240222956]),
            {
              "landcover": 0,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([73.13280834501069, 23.069906570316913]),
            {
              "landcover": 0,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([73.1774403030185, 23.010194591854837]),
            {
              "landcover": 0,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([73.33227886503022, 23.060746134227657]),
            {
              "landcover": 0,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([73.40883983915131, 23.181676730201573]),
            {
              "landcover": 0,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([73.0404545242099, 23.165895634183084]),
            {
              "landcover": 0,
              "system:index": "29"
            })]),
    water_ahmedabad_1988 = ui.import && ui.import("water_ahmedabad_1988", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            73.82391704862397,
            23.35104817098034
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.89910473172944,
            23.32078528978072
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.69002117460053,
            23.327405884235386
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.03609051053803,
            23.55262406585471
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.20397533719819,
            23.587553532685355
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.73155719671475,
            23.37808074505273
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.6496747199081,
            23.139938416368608
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.75644809637295,
            23.149724811219365
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.60057956609951,
            23.007436245659132
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.48736888799893,
            22.848941994511105
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.54444629583584,
            22.827584476500622
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.61697322759854,
            22.55272408258448
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.69319087896572,
            22.66998923412468
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.43511135015713,
            22.95322916470981
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.55630428228604,
            23.062569212430425
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.37131221173316,
            23.484083551162726
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.16961009381323,
            23.725379069292895
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.34899623272925,
            23.70321856799436
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.09029434378631,
            23.838166265102583
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.96824310477264,
            23.791680891272573
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.71835951107444,
            23.840207470776022
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.66256956356467,
            23.7830415730442
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.51167921322288,
            23.817438357568506
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.83001188534202,
            23.93453886285042
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.88670758900717,
            22.44317530627343
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.7782175987728,
            22.278071467850467
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.05483655629233,
            22.374453200025766
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.4101756065853,
            23.31791151814504
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.16411237416342,
            23.04586223922611
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.74182538685874,
            23.042071112480937
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 1
      },
      "color": "#98ff00",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": true
    }) || 
    /* color: #98ff00 */
    /* shown: false */
    /* locked: true */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([73.82391704862397, 23.35104817098034]),
            {
              "landcover": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([73.89910473172944, 23.32078528978072]),
            {
              "landcover": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([73.69002117460053, 23.327405884235386]),
            {
              "landcover": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([74.03609051053803, 23.55262406585471]),
            {
              "landcover": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([74.20397533719819, 23.587553532685355]),
            {
              "landcover": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([72.73155719671475, 23.37808074505273]),
            {
              "landcover": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([72.6496747199081, 23.139938416368608]),
            {
              "landcover": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([72.75644809637295, 23.149724811219365]),
            {
              "landcover": 1,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([72.60057956609951, 23.007436245659132]),
            {
              "landcover": 1,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([72.48736888799893, 22.848941994511105]),
            {
              "landcover": 1,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([72.54444629583584, 22.827584476500622]),
            {
              "landcover": 1,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([72.61697322759854, 22.55272408258448]),
            {
              "landcover": 1,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([72.69319087896572, 22.66998923412468]),
            {
              "landcover": 1,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([73.43511135015713, 22.95322916470981]),
            {
              "landcover": 1,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([73.55630428228604, 23.062569212430425]),
            {
              "landcover": 1,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([74.37131221173316, 23.484083551162726]),
            {
              "landcover": 1,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([74.16961009381323, 23.725379069292895]),
            {
              "landcover": 1,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([74.34899623272925, 23.70321856799436]),
            {
              "landcover": 1,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([74.09029434378631, 23.838166265102583]),
            {
              "landcover": 1,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([73.96824310477264, 23.791680891272573]),
            {
              "landcover": 1,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([73.71835951107444, 23.840207470776022]),
            {
              "landcover": 1,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([73.66256956356467, 23.7830415730442]),
            {
              "landcover": 1,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([73.51167921322288, 23.817438357568506]),
            {
              "landcover": 1,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([72.83001188534202, 23.93453886285042]),
            {
              "landcover": 1,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([73.88670758900717, 22.44317530627343]),
            {
              "landcover": 1,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([73.7782175987728, 22.278071467850467]),
            {
              "landcover": 1,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([73.05483655629233, 22.374453200025766]),
            {
              "landcover": 1,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([73.4101756065853, 23.31791151814504]),
            {
              "landcover": 1,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([74.16411237416342, 23.04586223922611]),
            {
              "landcover": 1,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([73.74182538685874, 23.042071112480937]),
            {
              "landcover": 1,
              "system:index": "29"
            })]),
    vegetation_ahmedabad_1988 = ui.import && ui.import("vegetation_ahmedabad_1988", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            72.63872937855795,
            23.354479089290663
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.59723024067954,
            23.669730077879883
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.87283258137778,
            22.62293311338358
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.78562860188559,
            22.47707909116236
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.01805810628012,
            22.660639781683486
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.3715645652743,
            23.772412626491942
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.38152092513758,
            23.699970961346555
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.16807187439743,
            23.78293767096033
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.24961102845016,
            23.807597497039957
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.97495282532516,
            23.855961130265584
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.99854291321579,
            23.040194373097478
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.2192994439775,
            23.123259912791294
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.84748090149704,
            23.17187520257652
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.1695176446611,
            23.23656297159424
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.81702435852829,
            22.297939441461427
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.75556958557907,
            22.28459749478417
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.84380353333297,
            22.41256405373666
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.06463254334274,
            23.81152378891417
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.10832036377731,
            23.837591354717656
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.03587926270309,
            23.835864147932142
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.14552840347442,
            22.902713585676146
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.41552504654082,
            22.61667482366159
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.47474822158965,
            22.629271842973232
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.652688590242,
            23.23484920057815
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.76426848526152,
            23.24794088510552
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.48549040908965,
            23.25156847395587
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.97376784439238,
            23.56946447601404
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.10217055435332,
            23.573712605988327
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.57156248696593,
            23.542287181932775
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.53107710938154,
            23.38936462500108
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 2
      },
      "color": "#0b4a8b",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": true
    }) || 
    /* color: #0b4a8b */
    /* shown: false */
    /* locked: true */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([72.63872937855795, 23.354479089290663]),
            {
              "landcover": 2,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([72.59723024067954, 23.669730077879883]),
            {
              "landcover": 2,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([72.87283258137778, 22.62293311338358]),
            {
              "landcover": 2,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([72.78562860188559, 22.47707909116236]),
            {
              "landcover": 2,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([73.01805810628012, 22.660639781683486]),
            {
              "landcover": 2,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([74.3715645652743, 23.772412626491942]),
            {
              "landcover": 2,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([74.38152092513758, 23.699970961346555]),
            {
              "landcover": 2,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([74.16807187439743, 23.78293767096033]),
            {
              "landcover": 2,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([74.24961102845016, 23.807597497039957]),
            {
              "landcover": 2,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([73.97495282532516, 23.855961130265584]),
            {
              "landcover": 2,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([72.99854291321579, 23.040194373097478]),
            {
              "landcover": 2,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([73.2192994439775, 23.123259912791294]),
            {
              "landcover": 2,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([72.84748090149704, 23.17187520257652]),
            {
              "landcover": 2,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([73.1695176446611, 23.23656297159424]),
            {
              "landcover": 2,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([73.81702435852829, 22.297939441461427]),
            {
              "landcover": 2,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([73.75556958557907, 22.28459749478417]),
            {
              "landcover": 2,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([73.84380353333297, 22.41256405373666]),
            {
              "landcover": 2,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([73.06463254334274, 23.81152378891417]),
            {
              "landcover": 2,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([73.10832036377731, 23.837591354717656]),
            {
              "landcover": 2,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([73.03587926270309, 23.835864147932142]),
            {
              "landcover": 2,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([74.14552840347442, 22.902713585676146]),
            {
              "landcover": 2,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([72.41552504654082, 22.61667482366159]),
            {
              "landcover": 2,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([72.47474822158965, 22.629271842973232]),
            {
              "landcover": 2,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([73.652688590242, 23.23484920057815]),
            {
              "landcover": 2,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([73.76426848526152, 23.24794088510552]),
            {
              "landcover": 2,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([73.48549040908965, 23.25156847395587]),
            {
              "landcover": 2,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([72.97376784439238, 23.56946447601404]),
            {
              "landcover": 2,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([73.10217055435332, 23.573712605988327]),
            {
              "landcover": 2,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([72.57156248696593, 23.542287181932775]),
            {
              "landcover": 2,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([72.53107710938154, 23.38936462500108]),
            {
              "landcover": 2,
              "system:index": "29"
            })]),
    urban_ahmedabad_1993 = ui.import && ui.import("urban_ahmedabad_1993", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            74.29814957819707,
            23.29986984058519
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.24836777888066,
            23.316896238598027
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.2619719430042,
            23.03623565730304
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.90959405146367,
            22.26846476704535
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.9878716393543,
            22.394224129026544
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.99164818964726,
            22.21889211000713
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.31357755346708,
            22.32516578682768
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.40970792456083,
            22.333422838196682
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.36806668920927,
            22.54079972562416
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.51088895483427,
            22.547141484495313
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.32618131323271,
            22.485614136897038
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.83841886206083,
            22.79677419984467
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.17006864233427,
            22.841077566838788
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.63469440919417,
            23.00740255999021
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.40810139161604,
            23.00045009650446
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.9491780517723,
            23.327142556750037
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.0044530151512,
            23.44751691088079
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.78541309815901,
            23.419796392355146
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.6145375488426,
            23.705541462471395
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.83701069337386,
            23.44751691088079
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.85898334962386,
            22.8312687781952
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.59531147462386,
            23.00961463234602
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.65735371095198,
            23.856972198622465
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.92308552247542,
            23.777822941206825
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.73219807130354,
            23.980310858596372
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.01681263429182,
            23.929483236085186
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.26135761720198,
            23.579739178484303
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.15561420899886,
            23.48247426991903
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.3479474304344,
            23.351415294975528
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.36099369508284,
            23.31074806856451
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 0
      },
      "color": "#ffc82d",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": true
    }) || 
    /* color: #ffc82d */
    /* shown: false */
    /* locked: true */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([74.29814957819707, 23.29986984058519]),
            {
              "landcover": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([74.24836777888066, 23.316896238598027]),
            {
              "landcover": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([74.2619719430042, 23.03623565730304]),
            {
              "landcover": 0,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([73.90959405146367, 22.26846476704535]),
            {
              "landcover": 0,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([73.9878716393543, 22.394224129026544]),
            {
              "landcover": 0,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([73.99164818964726, 22.21889211000713]),
            {
              "landcover": 0,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([73.31357755346708, 22.32516578682768]),
            {
              "landcover": 0,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([73.40970792456083, 22.333422838196682]),
            {
              "landcover": 0,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([72.36806668920927, 22.54079972562416]),
            {
              "landcover": 0,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([72.51088895483427, 22.547141484495313]),
            {
              "landcover": 0,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([72.32618131323271, 22.485614136897038]),
            {
              "landcover": 0,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([72.83841886206083, 22.79677419984467]),
            {
              "landcover": 0,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([73.17006864233427, 22.841077566838788]),
            {
              "landcover": 0,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([72.63469440919417, 23.00740255999021]),
            {
              "landcover": 0,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([72.40810139161604, 23.00045009650446]),
            {
              "landcover": 0,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([72.9491780517723, 23.327142556750037]),
            {
              "landcover": 0,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([73.0044530151512, 23.44751691088079]),
            {
              "landcover": 0,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([72.78541309815901, 23.419796392355146]),
            {
              "landcover": 0,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([73.6145375488426, 23.705541462471395]),
            {
              "landcover": 0,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([73.83701069337386, 23.44751691088079]),
            {
              "landcover": 0,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([73.85898334962386, 22.8312687781952]),
            {
              "landcover": 0,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([73.59531147462386, 23.00961463234602]),
            {
              "landcover": 0,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([72.65735371095198, 23.856972198622465]),
            {
              "landcover": 0,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([72.92308552247542, 23.777822941206825]),
            {
              "landcover": 0,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([72.73219807130354, 23.980310858596372]),
            {
              "landcover": 0,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([73.01681263429182, 23.929483236085186]),
            {
              "landcover": 0,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([74.26135761720198, 23.579739178484303]),
            {
              "landcover": 0,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([74.15561420899886, 23.48247426991903]),
            {
              "landcover": 0,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([73.3479474304344, 23.351415294975528]),
            {
              "landcover": 0,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([73.36099369508284, 23.31074806856451]),
            {
              "landcover": 0,
              "system:index": "29"
            })]),
    water_ahmedabad_1993 = ui.import && ui.import("water_ahmedabad_1993", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            73.55364564937157,
            22.384974048213984
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.88254884761376,
            22.449084559585742
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.05754426997704,
            22.376402580462646
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.16149858516259,
            23.04053576683953
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.76049760860009,
            23.026633897601247
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.83465532344384,
            23.335925548447374
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.36955217402978,
            23.48463455513183
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.24149278682275,
            23.704868903206158
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.13489107173486,
            23.76301181014292
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.70272020381493,
            23.30449751640511
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.84914735835595,
            23.319710492642944
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.81387094539208,
            23.921928354494106
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.89455179256005,
            23.99189367757654
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.508399525104,
            22.791686681980025
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.87712816279931,
            22.96376240335824
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.36258653682275,
            23.48559988897397
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.41820482295556,
            23.31671532924584
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.61688951533837,
            22.551557142950028
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.0412364391665,
            23.705832617673572
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.57510332149072,
            23.839364471571333
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.43493176037236,
            22.953223415680206
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.86305523449346,
            22.723986837123697
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.77387714916631,
            22.74456902176326
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.50973320537969,
            22.627684465727917
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.19902611309453,
            22.615251433381445
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.64249470508416,
            23.787240252072216
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.52887633121331,
            22.470200367804868
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.8262796667846,
            23.073010729294086
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.3972254065307,
            23.682799970434626
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.59463599002679,
            23.579003770552816
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 1
      },
      "color": "#00ffff",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": true
    }) || 
    /* color: #00ffff */
    /* shown: false */
    /* locked: true */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([73.55364564937157, 22.384974048213984]),
            {
              "landcover": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([73.88254884761376, 22.449084559585742]),
            {
              "landcover": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([73.05754426997704, 22.376402580462646]),
            {
              "landcover": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([74.16149858516259, 23.04053576683953]),
            {
              "landcover": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([73.76049760860009, 23.026633897601247]),
            {
              "landcover": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([73.83465532344384, 23.335925548447374]),
            {
              "landcover": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([74.36955217402978, 23.48463455513183]),
            {
              "landcover": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([74.24149278682275, 23.704868903206158]),
            {
              "landcover": 1,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([74.13489107173486, 23.76301181014292]),
            {
              "landcover": 1,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([72.70272020381493, 23.30449751640511]),
            {
              "landcover": 1,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([72.84914735835595, 23.319710492642944]),
            {
              "landcover": 1,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([72.81387094539208, 23.921928354494106]),
            {
              "landcover": 1,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([72.89455179256005, 23.99189367757654]),
            {
              "landcover": 1,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([72.508399525104, 22.791686681980025]),
            {
              "landcover": 1,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([72.87712816279931, 22.96376240335824]),
            {
              "landcover": 1,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([73.36258653682275, 23.48559988897397]),
            {
              "landcover": 1,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([73.41820482295556, 23.31671532924584]),
            {
              "landcover": 1,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([72.61688951533837, 22.551557142950028]),
            {
              "landcover": 1,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([73.0412364391665, 23.705832617673572]),
            {
              "landcover": 1,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([73.57510332149072, 23.839364471571333]),
            {
              "landcover": 1,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([73.43493176037236, 22.953223415680206]),
            {
              "landcover": 1,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([73.86305523449346, 22.723986837123697]),
            {
              "landcover": 1,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([73.77387714916631, 22.74456902176326]),
            {
              "landcover": 1,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([73.50973320537969, 22.627684465727917]),
            {
              "landcover": 1,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([73.19902611309453, 22.615251433381445]),
            {
              "landcover": 1,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([72.64249470508416, 23.787240252072216]),
            {
              "landcover": 1,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([72.52887633121331, 22.470200367804868]),
            {
              "landcover": 1,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([72.8262796667846, 23.073010729294086]),
            {
              "landcover": 1,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([73.3972254065307, 23.682799970434626]),
            {
              "landcover": 1,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([73.59463599002679, 23.579003770552816]),
            {
              "landcover": 1,
              "system:index": "29"
            })]),
    vegetation_ahmedabad_1993 = ui.import && ui.import("vegetation_ahmedabad_1993", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            72.78823816983444,
            22.404122967714073
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.88522684781296,
            22.36364752334057
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.83855310805978,
            22.35120856504965
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.94429651626291,
            22.443578831271825
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.79460779555978,
            22.480700077176113
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.31336847671213,
            23.44988213118518
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.33602777846994,
            23.68903974974996
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.93502680190744,
            23.624258496879154
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.77459589370432,
            23.670174735893823
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.08907953628244,
            23.874400326603485
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.59194818862619,
            23.543079492497647
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.328718818509,
            23.606642515393542
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.36030451186838,
            23.081174338710618
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.96445337661447,
            22.990181711671575
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.07809320815744,
            23.126647586521354
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.49135462173166,
            22.944978538750483
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.63898340591135,
            22.84471908949386
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.4165102613801,
            22.80548074348665
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.17878595718088,
            23.11528071819127
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.51823297866525,
            22.986389019486182
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.86591974624338,
            22.619895256591146
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.1144854200715,
            22.715569712077173
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.58071771987619,
            23.80814072006479
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.69538751968088,
            23.860899931839697
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.51367060073557,
            23.22827503643808
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.54464066693309,
            22.474044720615172
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.44027054974559,
            22.342959272062412
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.58583939740184,
            23.55063979080629
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.65267273725271,
            23.36292011327579
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.38301941694021,
            23.559442708589664
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 2
      },
      "color": "#bf04c2",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": true
    }) || 
    /* color: #bf04c2 */
    /* shown: false */
    /* locked: true */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([72.78823816983444, 22.404122967714073]),
            {
              "landcover": 2,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([72.88522684781296, 22.36364752334057]),
            {
              "landcover": 2,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([73.83855310805978, 22.35120856504965]),
            {
              "landcover": 2,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([73.94429651626291, 22.443578831271825]),
            {
              "landcover": 2,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([73.79460779555978, 22.480700077176113]),
            {
              "landcover": 2,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([74.31336847671213, 23.44988213118518]),
            {
              "landcover": 2,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([74.33602777846994, 23.68903974974996]),
            {
              "landcover": 2,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([73.93502680190744, 23.624258496879154]),
            {
              "landcover": 2,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([72.77459589370432, 23.670174735893823]),
            {
              "landcover": 2,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([73.08907953628244, 23.874400326603485]),
            {
              "landcover": 2,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([72.59194818862619, 23.543079492497647]),
            {
              "landcover": 2,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([73.328718818509, 23.606642515393542]),
            {
              "landcover": 2,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([73.36030451186838, 23.081174338710618]),
            {
              "landcover": 2,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([72.96445337661447, 22.990181711671575]),
            {
              "landcover": 2,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([73.07809320815744, 23.126647586521354]),
            {
              "landcover": 2,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([72.49135462173166, 22.944978538750483]),
            {
              "landcover": 2,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([72.63898340591135, 22.84471908949386]),
            {
              "landcover": 2,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([72.4165102613801, 22.80548074348665]),
            {
              "landcover": 2,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([74.17878595718088, 23.11528071819127]),
            {
              "landcover": 2,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([73.51823297866525, 22.986389019486182]),
            {
              "landcover": 2,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([72.86591974624338, 22.619895256591146]),
            {
              "landcover": 2,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([73.1144854200715, 22.715569712077173]),
            {
              "landcover": 2,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([73.58071771987619, 23.80814072006479]),
            {
              "landcover": 2,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([73.69538751968088, 23.860899931839697]),
            {
              "landcover": 2,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([72.51367060073557, 23.22827503643808]),
            {
              "landcover": 2,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([73.54464066693309, 22.474044720615172]),
            {
              "landcover": 2,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([73.44027054974559, 22.342959272062412]),
            {
              "landcover": 2,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([73.58583939740184, 23.55063979080629]),
            {
              "landcover": 2,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([72.65267273725271, 23.36292011327579]),
            {
              "landcover": 2,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([74.38301941694021, 23.559442708589664]),
            {
              "landcover": 2,
              "system:index": "29"
            })]),
    urban_ahmedabad_1998 = ui.import && ui.import("urban_ahmedabad_1998", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            74.02465072194758,
            22.24463534603839
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.14757384403211,
            23.17218900999656
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.33159484012586,
            23.0755727447667
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.99925841434461,
            22.806672243111972
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.74784697635633,
            23.900302956472675
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.04894103153211,
            23.965887943386978
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.98130644901258,
            23.85383986440714
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.45406188114148,
            23.87581772992291
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.65593566043836,
            23.72755201526211
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.2789672766493,
            23.05132883913096
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.29407347782117,
            22.931229612305643
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.65936888797742,
            22.835073460356845
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.09357298953992,
            22.838237574513276
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.77815856082898,
            23.22244295878993
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.56279601200086,
            22.404706625172384
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.51885069950086,
            22.54746622869457
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.37465514286023,
            22.532879782046304
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.29750670536023,
            22.411054619020597
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.50899352176648,
            22.305640417055844
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.44740536485303,
            23.739054523418872
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.3141961363374,
            23.712967198504018
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.24553158555615,
            23.483929947791957
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.08451321397412,
            23.376195024035784
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.63569119248974,
            23.033446195379497
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.05179837022412,
            23.267678053377985
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.8526711729585,
            23.553970397218976
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.39409115586865,
            23.378870651336108
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.2543587950288,
            23.396517109371924
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.73054745469678,
            22.49928989177873
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.9573846128999,
            22.553518825679653
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 0
      },
      "color": "#ff0000",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": true
    }) || 
    /* color: #ff0000 */
    /* shown: false */
    /* locked: true */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([74.02465072194758, 22.24463534603839]),
            {
              "landcover": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([74.14757384403211, 23.17218900999656]),
            {
              "landcover": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([74.33159484012586, 23.0755727447667]),
            {
              "landcover": 0,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([73.99925841434461, 22.806672243111972]),
            {
              "landcover": 0,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([72.74784697635633, 23.900302956472675]),
            {
              "landcover": 0,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([73.04894103153211, 23.965887943386978]),
            {
              "landcover": 0,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([72.98130644901258, 23.85383986440714]),
            {
              "landcover": 0,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([73.45406188114148, 23.87581772992291]),
            {
              "landcover": 0,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([73.65593566043836, 23.72755201526211]),
            {
              "landcover": 0,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([73.2789672766493, 23.05132883913096]),
            {
              "landcover": 0,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([73.29407347782117, 22.931229612305643]),
            {
              "landcover": 0,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([73.65936888797742, 22.835073460356845]),
            {
              "landcover": 0,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([73.09357298953992, 22.838237574513276]),
            {
              "landcover": 0,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([73.77815856082898, 23.22244295878993]),
            {
              "landcover": 0,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([72.56279601200086, 22.404706625172384]),
            {
              "landcover": 0,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([72.51885069950086, 22.54746622869457]),
            {
              "landcover": 0,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([72.37465514286023, 22.532879782046304]),
            {
              "landcover": 0,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([73.29750670536023, 22.411054619020597]),
            {
              "landcover": 0,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([73.50899352176648, 22.305640417055844]),
            {
              "landcover": 0,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([74.44740536485303, 23.739054523418872]),
            {
              "landcover": 0,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([74.3141961363374, 23.712967198504018]),
            {
              "landcover": 0,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([74.24553158555615, 23.483929947791957]),
            {
              "landcover": 0,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([74.08451321397412, 23.376195024035784]),
            {
              "landcover": 0,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([72.63569119248974, 23.033446195379497]),
            {
              "landcover": 0,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([73.05179837022412, 23.267678053377985]),
            {
              "landcover": 0,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([72.8526711729585, 23.553970397218976]),
            {
              "landcover": 0,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([73.39409115586865, 23.378870651336108]),
            {
              "landcover": 0,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([73.2543587950288, 23.396517109371924]),
            {
              "landcover": 0,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([73.73054745469678, 22.49928989177873]),
            {
              "landcover": 0,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([72.9573846128999, 22.553518825679653]),
            {
              "landcover": 0,
              "system:index": "29"
            })]),
    water_ahmedabad_1998 = ui.import && ui.import("water_ahmedabad_1998", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            73.8842431230027,
            22.446757406731194
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.75275050825661,
            22.271173745560827
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.76785670942849,
            23.02494849967484
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.16473781294411,
            23.045801026462055
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.84270106978005,
            23.337396427606233
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.32850276655739,
            23.555359344144343
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.39167415327614,
            23.774846511330207
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.17572414106911,
            23.796052422350215
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.41509257978981,
            23.317219865787273
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.39620982832497,
            23.679927381154407
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.30608760542458,
            23.891357689154816
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.79642497725075,
            23.76714869554467
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.513527028032,
            22.953361902054407
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.909034840532,
            22.977386358583956
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.535499684282,
            22.64952887388504
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.09511577314919,
            22.50814344898949
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.7329102677781,
            23.36954648717512
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.35020457930153,
            22.795041792771404
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.64237224287575,
            22.782380880707134
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.43118583387917,
            22.627070655495512
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.55435287184304,
            22.6412510512995
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.61759673780983,
            22.555195562816063
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.86684905714577,
            22.511434050537684
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.39993011183327,
            22.463851473249058
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.04091369337624,
            23.707553776120907
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.72315242644106,
            23.70800592053252
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.86242284611467,
            22.72303726060626
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.18154134587053,
            22.716545268676455
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.02462949589494,
            23.14458963828318
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.55197324589494,
            23.10085934488215
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 1
      },
      "color": "#00ff00",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": true
    }) || 
    /* color: #00ff00 */
    /* shown: false */
    /* locked: true */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([73.8842431230027, 22.446757406731194]),
            {
              "landcover": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([73.75275050825661, 22.271173745560827]),
            {
              "landcover": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([73.76785670942849, 23.02494849967484]),
            {
              "landcover": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([74.16473781294411, 23.045801026462055]),
            {
              "landcover": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([73.84270106978005, 23.337396427606233]),
            {
              "landcover": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([74.32850276655739, 23.555359344144343]),
            {
              "landcover": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([74.39167415327614, 23.774846511330207]),
            {
              "landcover": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([74.17572414106911, 23.796052422350215]),
            {
              "landcover": 1,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([73.41509257978981, 23.317219865787273]),
            {
              "landcover": 1,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([73.39620982832497, 23.679927381154407]),
            {
              "landcover": 1,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([73.30608760542458, 23.891357689154816]),
            {
              "landcover": 1,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([72.79642497725075, 23.76714869554467]),
            {
              "landcover": 1,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([72.513527028032, 22.953361902054407]),
            {
              "landcover": 1,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([72.909034840532, 22.977386358583956]),
            {
              "landcover": 1,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([72.535499684282, 22.64952887388504]),
            {
              "landcover": 1,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([73.09511577314919, 22.50814344898949]),
            {
              "landcover": 1,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([72.7329102677781, 23.36954648717512]),
            {
              "landcover": 1,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([73.35020457930153, 22.795041792771404]),
            {
              "landcover": 1,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([73.64237224287575, 22.782380880707134]),
            {
              "landcover": 1,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([73.43118583387917, 22.627070655495512]),
            {
              "landcover": 1,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([73.55435287184304, 22.6412510512995]),
            {
              "landcover": 1,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([72.61759673780983, 22.555195562816063]),
            {
              "landcover": 1,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([72.86684905714577, 22.511434050537684]),
            {
              "landcover": 1,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([72.39993011183327, 22.463851473249058]),
            {
              "landcover": 1,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([73.04091369337624, 23.707553776120907]),
            {
              "landcover": 1,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([73.72315242644106, 23.70800592053252]),
            {
              "landcover": 1,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([73.86242284611467, 22.72303726060626]),
            {
              "landcover": 1,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([74.18154134587053, 22.716545268676455]),
            {
              "landcover": 1,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([73.02462949589494, 23.14458963828318]),
            {
              "landcover": 1,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([73.55197324589494, 23.10085934488215]),
            {
              "landcover": 1,
              "system:index": "29"
            })]),
    vegetation_ahmedabad_1998 = ui.import && ui.import("vegetation_ahmedabad_1998", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            73.76809491947893,
            22.28410331998752
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.99211301640275,
            22.19130952942263
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.07966031864885,
            22.228974690898923
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.31706800297502,
            23.45609572719709
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.37680616215471,
            23.74113333956593
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.93011431135933,
            23.62590302250339
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.97697786726754,
            23.786458700876977
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.7838783457034,
            22.406406668227856
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.09561540625027,
            22.627143153130316
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.43918230078152,
            22.575162302704012
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.44071042382451,
            22.754614283228165
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.55057370507451,
            22.797190596295074
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.57683789574834,
            23.065794034856477
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.78626477563115,
            23.053000448403385
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.20305859887334,
            23.207074180453986
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.83089673363897,
            23.38933354231033
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.8343281537427,
            23.876537110214375
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.0976567059888,
            23.88281578029982
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.4547123700513,
            22.915511299915043
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.90309188665286,
            22.947130382674235
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.10153243841067,
            23.24111915194726
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.53779647649661,
            23.795799875396128
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.04413838050996,
            23.541730230569716
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.57079548500215,
            23.565648887167605
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.65824360511934,
            23.503325395392533
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.16331307311752,
            22.4979402485385
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.08925454040268,
            22.943824180847425
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.74239937682846,
            22.70966289970032
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.56774727721908,
            22.556291548910483
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.04521004577377,
            22.934971365622292
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 2
      },
      "color": "#0000ff",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": true
    }) || 
    /* color: #0000ff */
    /* shown: false */
    /* locked: true */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([73.76809491947893, 22.28410331998752]),
            {
              "landcover": 2,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([73.99211301640275, 22.19130952942263]),
            {
              "landcover": 2,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([74.07966031864885, 22.228974690898923]),
            {
              "landcover": 2,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([74.31706800297502, 23.45609572719709]),
            {
              "landcover": 2,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([74.37680616215471, 23.74113333956593]),
            {
              "landcover": 2,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([73.93011431135933, 23.62590302250339]),
            {
              "landcover": 2,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([73.97697786726754, 23.786458700876977]),
            {
              "landcover": 2,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([72.7838783457034, 22.406406668227856]),
            {
              "landcover": 2,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([73.09561540625027, 22.627143153130316]),
            {
              "landcover": 2,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([72.43918230078152, 22.575162302704012]),
            {
              "landcover": 2,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([72.44071042382451, 22.754614283228165]),
            {
              "landcover": 2,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([72.55057370507451, 22.797190596295074]),
            {
              "landcover": 2,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([72.57683789574834, 23.065794034856477]),
            {
              "landcover": 2,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([72.78626477563115, 23.053000448403385]),
            {
              "landcover": 2,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([73.20305859887334, 23.207074180453986]),
            {
              "landcover": 2,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([72.83089673363897, 23.38933354231033]),
            {
              "landcover": 2,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([72.8343281537427, 23.876537110214375]),
            {
              "landcover": 2,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([73.0976567059888, 23.88281578029982]),
            {
              "landcover": 2,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([73.4547123700513, 22.915511299915043]),
            {
              "landcover": 2,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([73.90309188665286, 22.947130382674235]),
            {
              "landcover": 2,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([74.10153243841067, 23.24111915194726]),
            {
              "landcover": 2,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([73.53779647649661, 23.795799875396128]),
            {
              "landcover": 2,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([73.04413838050996, 23.541730230569716]),
            {
              "landcover": 2,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([73.57079548500215, 23.565648887167605]),
            {
              "landcover": 2,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([72.65824360511934, 23.503325395392533]),
            {
              "landcover": 2,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([73.16331307311752, 22.4979402485385]),
            {
              "landcover": 2,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([74.08925454040268, 22.943824180847425]),
            {
              "landcover": 2,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([72.74239937682846, 22.70966289970032]),
            {
              "landcover": 2,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([73.56774727721908, 22.556291548910483]),
            {
              "landcover": 2,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([73.04521004577377, 22.934971365622292]),
            {
              "landcover": 2,
              "system:index": "29"
            })]),
    urban_ahmedabad_2008 = ui.import && ui.import("urban_ahmedabad_2008", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            74.05343849792457,
            22.27384780027595
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.77890703753616,
            22.576650169460276
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.50380632952835,
            22.545579412687093
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.94531939105178,
            22.552555089825823
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.9457618959346,
            23.02480541007362
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.24033281878616,
            23.294374770754533
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.69238970355178,
            23.11703767581544
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.31174395159866,
            23.753006524243744
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.81598589495803,
            23.770602774865825
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.65107783976504,
            23.45798838496242
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.5285116166205,
            23.599953361011355
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.59831899289324,
            23.778946343086933
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.41635793332293,
            23.872223507526662
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.8543385851784,
            23.55159819618447
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.89038747433855,
            23.8122448773847
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.69383519772722,
            23.920876852303532
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.26956074033518,
            22.40552871056778
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.14047138486643,
            22.83779144270813
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.63235370908518,
            23.00246188650656
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.93653766904612,
            23.044802522357404
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.12433521543284,
            23.001829836032677
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.25582783017893,
            23.39911747555945
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.66129200254221,
            22.83866210217721
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.6556996563508,
            23.42400709866078
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.97611896787424,
            23.473142469036436
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.9695843101157,
            22.631634709918487
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.3708294273032,
            23.116242106948047
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.94888576275243,
            23.324795130614135
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.3923595786704,
            22.688979131653397
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.68462642437352,
            22.33756834334025
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 0
      },
      "color": "#999900",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": true
    }) || 
    /* color: #999900 */
    /* shown: false */
    /* locked: true */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([74.05343849792457, 22.27384780027595]),
            {
              "landcover": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([73.77890703753616, 22.576650169460276]),
            {
              "landcover": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([72.50380632952835, 22.545579412687093]),
            {
              "landcover": 0,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([72.94531939105178, 22.552555089825823]),
            {
              "landcover": 0,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([73.9457618959346, 23.02480541007362]),
            {
              "landcover": 0,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([74.24033281878616, 23.294374770754533]),
            {
              "landcover": 0,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([73.69238970355178, 23.11703767581544]),
            {
              "landcover": 0,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([74.31174395159866, 23.753006524243744]),
            {
              "landcover": 0,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([73.81598589495803, 23.770602774865825]),
            {
              "landcover": 0,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([73.65107783976504, 23.45798838496242]),
            {
              "landcover": 0,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([73.5285116166205, 23.599953361011355]),
            {
              "landcover": 0,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([73.59831899289324, 23.778946343086933]),
            {
              "landcover": 0,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([73.41635793332293, 23.872223507526662]),
            {
              "landcover": 0,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([72.8543385851784, 23.55159819618447]),
            {
              "landcover": 0,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([72.89038747433855, 23.8122448773847]),
            {
              "landcover": 0,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([72.69383519772722, 23.920876852303532]),
            {
              "landcover": 0,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([73.26956074033518, 22.40552871056778]),
            {
              "landcover": 0,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([73.14047138486643, 22.83779144270813]),
            {
              "landcover": 0,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([72.63235370908518, 23.00246188650656]),
            {
              "landcover": 0,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([72.93653766904612, 23.044802522357404]),
            {
              "landcover": 0,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([73.12433521543284, 23.001829836032677]),
            {
              "landcover": 0,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([73.25582783017893, 23.39911747555945]),
            {
              "landcover": 0,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([73.66129200254221, 22.83866210217721]),
            {
              "landcover": 0,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([72.6556996563508, 23.42400709866078]),
            {
              "landcover": 0,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([73.97611896787424, 23.473142469036436]),
            {
              "landcover": 0,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([73.9695843101157, 22.631634709918487]),
            {
              "landcover": 0,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([73.3708294273032, 23.116242106948047]),
            {
              "landcover": 0,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([72.94888576275243, 23.324795130614135]),
            {
              "landcover": 0,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([72.3923595786704, 22.688979131653397]),
            {
              "landcover": 0,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([73.68462642437352, 22.33756834334025]),
            {
              "landcover": 0,
              "system:index": "29"
            })]),
    water_ahmedabad_2008 = ui.import && ui.import("water_ahmedabad_2008", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            73.87826045757664,
            22.453112229010603
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.81371577984227,
            22.312796459361557
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.39623531109227,
            22.386464011793876
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.7601574302329,
            23.024957214271883
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.83500179058446,
            23.33488321938939
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.20098384624852,
            23.589982129350858
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.24166759258641,
            23.70461538532571
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.180899465145,
            23.797788822810084
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.20654948955907,
            23.695813101296558
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.25530132061375,
            22.761021658665115
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.54011232215898,
            22.65361106533468
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.69117433387773,
            22.67008552164347
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.51573640663163,
            22.47099278019325
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.41764528114335,
            23.317656238633102
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.80035096961991,
            23.50480135894139
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.64100614832927,
            23.7876203329517
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.8023678426652,
            23.813535651351074
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.66204801844646,
            23.783222068935622
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.89592329310466,
            23.18115595276553
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.57586065577556,
            23.051300724882104
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.16381422328044,
            23.0442715433926
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.05247846888591,
            22.371584759570283
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.86340681361247,
            22.723225795794068
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.84202162074138,
            22.90961971078238
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.70376173304606,
            23.544393804369278
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.34295346575233,
            23.082736677192017
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.56250836687538,
            22.644516146764698
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.56464078264686,
            23.336428504628326
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.06305959063026,
            23.04088186785483
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.85431935625526,
            23.997548790765656
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 1
      },
      "color": "#009999",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": true
    }) || 
    /* color: #009999 */
    /* shown: false */
    /* locked: true */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([73.87826045757664, 22.453112229010603]),
            {
              "landcover": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([73.81371577984227, 22.312796459361557]),
            {
              "landcover": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([73.39623531109227, 22.386464011793876]),
            {
              "landcover": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([73.7601574302329, 23.024957214271883]),
            {
              "landcover": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([73.83500179058446, 23.33488321938939]),
            {
              "landcover": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([74.20098384624852, 23.589982129350858]),
            {
              "landcover": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([74.24166759258641, 23.70461538532571]),
            {
              "landcover": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([74.180899465145, 23.797788822810084]),
            {
              "landcover": 1,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([73.20654948955907, 23.695813101296558]),
            {
              "landcover": 1,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([73.25530132061375, 22.761021658665115]),
            {
              "landcover": 1,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([72.54011232215898, 22.65361106533468]),
            {
              "landcover": 1,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([72.69117433387773, 22.67008552164347]),
            {
              "landcover": 1,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([72.51573640663163, 22.47099278019325]),
            {
              "landcover": 1,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([73.41764528114335, 23.317656238633102]),
            {
              "landcover": 1,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([72.80035096961991, 23.50480135894139]),
            {
              "landcover": 1,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([72.64100614832927, 23.7876203329517]),
            {
              "landcover": 1,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([72.8023678426652, 23.813535651351074]),
            {
              "landcover": 1,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([73.66204801844646, 23.783222068935622]),
            {
              "landcover": 1,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([72.89592329310466, 23.18115595276553]),
            {
              "landcover": 1,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([72.57586065577556, 23.051300724882104]),
            {
              "landcover": 1,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([74.16381422328044, 23.0442715433926]),
            {
              "landcover": 1,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([73.05247846888591, 22.371584759570283]),
            {
              "landcover": 1,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([73.86340681361247, 22.723225795794068]),
            {
              "landcover": 1,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([72.84202162074138, 22.90961971078238]),
            {
              "landcover": 1,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([73.70376173304606, 23.544393804369278]),
            {
              "landcover": 1,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([73.34295346575233, 23.082736677192017]),
            {
              "landcover": 1,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([73.56250836687538, 22.644516146764698]),
            {
              "landcover": 1,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([72.56464078264686, 23.336428504628326]),
            {
              "landcover": 1,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([73.06305959063026, 23.04088186785483]),
            {
              "landcover": 1,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([72.85431935625526, 23.997548790765656]),
            {
              "landcover": 1,
              "system:index": "29"
            })]),
    vegetation_ahmedabad_2008 = ui.import && ui.import("vegetation_ahmedabad_2008", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            73.8400620814637,
            22.321399997458673
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.84246534074104,
            22.410298757464606
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.97636121476448,
            22.289636698034936
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.94580548966682,
            22.700409874245427
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.50635236466682,
            23.012661766984166
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.74427503312386,
            23.23935891361597
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.17720502579964,
            23.515421035488068
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.3677491542176,
            23.55571064079081
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.93832619323707,
            22.880603980387033
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.01179726257301,
            22.665977431844492
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.6101096405027,
            23.067097824774788
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.55998451843239,
            23.38286453116908
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.86760170593239,
            23.47170046465279
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.71183235778786,
            23.837750539527658
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.02038033142067,
            23.895206224662083
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.38351662292457,
            22.90933561731987
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.68770058288551,
            22.63582793343185
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.78657753601051,
            22.405583510816847
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.43776161804176,
            22.575608215147792
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.63801796569801,
            22.590824105139145
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.42550118103004,
            22.378601472954625
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.3736594451902,
            23.286085322637035
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.52815468444801,
            23.34063081362002
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.71550972595192,
            23.69510033789329
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.99703438415504,
            23.217635384639024
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.70427925720192,
            23.571176092338376
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.78324349060036,
            23.486185767135915
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.53776772155739,
            23.795977145239757
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.24861748352028,
            23.084578254702077
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.1126616729734,
            23.14394152885016
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 2
      },
      "color": "#ff00ff",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": true
    }) || 
    /* color: #ff00ff */
    /* shown: false */
    /* locked: true */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([73.8400620814637, 22.321399997458673]),
            {
              "landcover": 2,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([73.84246534074104, 22.410298757464606]),
            {
              "landcover": 2,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([73.97636121476448, 22.289636698034936]),
            {
              "landcover": 2,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([73.94580548966682, 22.700409874245427]),
            {
              "landcover": 2,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([73.50635236466682, 23.012661766984166]),
            {
              "landcover": 2,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([73.74427503312386, 23.23935891361597]),
            {
              "landcover": 2,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([74.17720502579964, 23.515421035488068]),
            {
              "landcover": 2,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([74.3677491542176, 23.55571064079081]),
            {
              "landcover": 2,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([72.93832619323707, 22.880603980387033]),
            {
              "landcover": 2,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([73.01179726257301, 22.665977431844492]),
            {
              "landcover": 2,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([72.6101096405027, 23.067097824774788]),
            {
              "landcover": 2,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([72.55998451843239, 23.38286453116908]),
            {
              "landcover": 2,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([72.86760170593239, 23.47170046465279]),
            {
              "landcover": 2,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([73.71183235778786, 23.837750539527658]),
            {
              "landcover": 2,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([73.02038033142067, 23.895206224662083]),
            {
              "landcover": 2,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([72.38351662292457, 22.90933561731987]),
            {
              "landcover": 2,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([72.68770058288551, 22.63582793343185]),
            {
              "landcover": 2,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([72.78657753601051, 22.405583510816847]),
            {
              "landcover": 2,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([72.43776161804176, 22.575608215147792]),
            {
              "landcover": 2,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([73.63801796569801, 22.590824105139145]),
            {
              "landcover": 2,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([73.42550118103004, 22.378601472954625]),
            {
              "landcover": 2,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([73.3736594451902, 23.286085322637035]),
            {
              "landcover": 2,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([73.52815468444801, 23.34063081362002]),
            {
              "landcover": 2,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([72.71550972595192, 23.69510033789329]),
            {
              "landcover": 2,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([72.99703438415504, 23.217635384639024]),
            {
              "landcover": 2,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([73.70427925720192, 23.571176092338376]),
            {
              "landcover": 2,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([73.78324349060036, 23.486185767135915]),
            {
              "landcover": 2,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([73.53776772155739, 23.795977145239757]),
            {
              "landcover": 2,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([74.24861748352028, 23.084578254702077]),
            {
              "landcover": 2,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([74.1126616729734, 23.14394152885016]),
            {
              "landcover": 2,
              "system:index": "29"
            })]),
    urban_ahmedabad_2013 = ui.import && ui.import("urban_ahmedabad_2013", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            73.46772987976051,
            23.888349408471974
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.65037758483864,
            23.623765854261638
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.93602211608864,
            22.242709248625122
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.69294960632301,
            22.533488321469743
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.25624306335426,
            22.40023714627482
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.95428010964136,
            22.560093412424138
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.38642427468042,
            22.587357092928777
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.59859773659448,
            22.47255963347621
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.86982271218042,
            22.753991756103442
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.80709383034448,
            22.747659542827638
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.23487398171167,
            22.752092122935714
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.18430635475855,
            23.025366490347654
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.40334627175073,
            23.153589528420742
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.17307588600855,
            23.189571019644383
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.28705904030542,
            23.54318650264138
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.63503342603896,
            23.031093857541624
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.85407334303115,
            23.545744290698526
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.9721763703749,
            23.592317287546745
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.76755600904677,
            23.690444024135004
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.16752701734755,
            23.521507217136957
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.30657273267958,
            23.49380223931964
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.93960780754563,
            23.650996135433463
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.69962520256516,
            23.111179415829923
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.88604945793625,
            23.01451925740472
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.01410884514328,
            22.53811100684899
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.86012561276864,
            23.23995141104662
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.95642764523934,
            23.26077052182101
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.34506900266122,
            22.71684012270997
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.98252017453622,
            23.856821756275313
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.12362582639169,
            23.70130416818879
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 0
      },
      "color": "#ff9999",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": true
    }) || 
    /* color: #ff9999 */
    /* shown: false */
    /* locked: true */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([73.46772987976051, 23.888349408471974]),
            {
              "landcover": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([73.65037758483864, 23.623765854261638]),
            {
              "landcover": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([73.93602211608864, 22.242709248625122]),
            {
              "landcover": 0,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([73.69294960632301, 22.533488321469743]),
            {
              "landcover": 0,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([73.25624306335426, 22.40023714627482]),
            {
              "landcover": 0,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([72.95428010964136, 22.560093412424138]),
            {
              "landcover": 0,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([72.38642427468042, 22.587357092928777]),
            {
              "landcover": 0,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([72.59859773659448, 22.47255963347621]),
            {
              "landcover": 0,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([72.86982271218042, 22.753991756103442]),
            {
              "landcover": 0,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([73.80709383034448, 22.747659542827638]),
            {
              "landcover": 0,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([74.23487398171167, 22.752092122935714]),
            {
              "landcover": 0,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([73.18430635475855, 23.025366490347654]),
            {
              "landcover": 0,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([73.40334627175073, 23.153589528420742]),
            {
              "landcover": 0,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([74.17307588600855, 23.189571019644383]),
            {
              "landcover": 0,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([74.28705904030542, 23.54318650264138]),
            {
              "landcover": 0,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([72.63503342603896, 23.031093857541624]),
            {
              "landcover": 0,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([72.85407334303115, 23.545744290698526]),
            {
              "landcover": 0,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([72.9721763703749, 23.592317287546745]),
            {
              "landcover": 0,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([72.76755600904677, 23.690444024135004]),
            {
              "landcover": 0,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([73.16752701734755, 23.521507217136957]),
            {
              "landcover": 0,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([73.30657273267958, 23.49380223931964]),
            {
              "landcover": 0,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([73.93960780754563, 23.650996135433463]),
            {
              "landcover": 0,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([73.69962520256516, 23.111179415829923]),
            {
              "landcover": 0,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([73.88604945793625, 23.01451925740472]),
            {
              "landcover": 0,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([74.01410884514328, 22.53811100684899]),
            {
              "landcover": 0,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([72.86012561276864, 23.23995141104662]),
            {
              "landcover": 0,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([72.95642764523934, 23.26077052182101]),
            {
              "landcover": 0,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([73.34506900266122, 22.71684012270997]),
            {
              "landcover": 0,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([72.98252017453622, 23.856821756275313]),
            {
              "landcover": 0,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([73.12362582639169, 23.70130416818879]),
            {
              "landcover": 0,
              "system:index": "29"
            })]),
    water_ahmedabad_2013 = ui.import && ui.import("water_ahmedabad_2013", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            73.84253293170707,
            23.340870723357042
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.76013547076957,
            23.02779898968811
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.88373166217582,
            22.45025458411565
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.39621335162894,
            22.385509712858788
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.32696133746879,
            23.55756907859599
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.08457547321098,
            23.606340051333735
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.26880517979293,
            23.714184020828196
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.51143518467575,
            23.817558743674237
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.9015223123613,
            24.01967089998371
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.36054483433395,
            23.48751049881671
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.61553445835739,
            22.54587123660797
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.66359964390426,
            22.76147751186693
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.56781259556442,
            23.000922226448193
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.02443185825973,
            23.1457432082246
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.80092874546676,
            23.506401790456277
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.36809793491989,
            22.819202665219237
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.17446390171676,
            22.862549682937093
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.04091135044723,
            23.706128972848127
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.42062631626754,
            23.315120848636877
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.16357675572067,
            23.04432960146687
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.86694589634567,
            22.334810275489787
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.09103647251754,
            22.50619045380869
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.91707101841598,
            23.669658927060535
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.54834238072067,
            23.714616228854915
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.5940043069902,
            23.578439308177206
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.0689913370195,
            22.769035792821605
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.23035303135543,
            22.741333243984624
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.83388772984176,
            23.238326147004884
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.0120722391191,
            23.321268816442995
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.69906106968551,
            22.55867289216836
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 1
      },
      "color": "#99ff99",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": true
    }) || 
    /* color: #99ff99 */
    /* shown: false */
    /* locked: true */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([73.84253293170707, 23.340870723357042]),
            {
              "landcover": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([73.76013547076957, 23.02779898968811]),
            {
              "landcover": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([73.88373166217582, 22.45025458411565]),
            {
              "landcover": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([73.39621335162894, 22.385509712858788]),
            {
              "landcover": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([74.32696133746879, 23.55756907859599]),
            {
              "landcover": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([74.08457547321098, 23.606340051333735]),
            {
              "landcover": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([74.26880517979293, 23.714184020828196]),
            {
              "landcover": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([73.51143518467575, 23.817558743674237]),
            {
              "landcover": 1,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([72.9015223123613, 24.01967089998371]),
            {
              "landcover": 1,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([73.36054483433395, 23.48751049881671]),
            {
              "landcover": 1,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([72.61553445835739, 22.54587123660797]),
            {
              "landcover": 1,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([72.66359964390426, 22.76147751186693]),
            {
              "landcover": 1,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([72.56781259556442, 23.000922226448193]),
            {
              "landcover": 1,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([73.02443185825973, 23.1457432082246]),
            {
              "landcover": 1,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([72.80092874546676, 23.506401790456277]),
            {
              "landcover": 1,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([73.36809793491989, 22.819202665219237]),
            {
              "landcover": 1,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([73.17446390171676, 22.862549682937093]),
            {
              "landcover": 1,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([73.04091135044723, 23.706128972848127]),
            {
              "landcover": 1,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([73.42062631626754, 23.315120848636877]),
            {
              "landcover": 1,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([74.16357675572067, 23.04432960146687]),
            {
              "landcover": 1,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([73.86694589634567, 22.334810275489787]),
            {
              "landcover": 1,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([73.09103647251754, 22.50619045380869]),
            {
              "landcover": 1,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([73.91707101841598, 23.669658927060535]),
            {
              "landcover": 1,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([73.54834238072067, 23.714616228854915]),
            {
              "landcover": 1,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([73.5940043069902, 23.578439308177206]),
            {
              "landcover": 1,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([74.0689913370195, 22.769035792821605]),
            {
              "landcover": 1,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([74.23035303135543, 22.741333243984624]),
            {
              "landcover": 1,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([72.83388772984176, 23.238326147004884]),
            {
              "landcover": 1,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([73.0120722391191, 23.321268816442995]),
            {
              "landcover": 1,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([73.69906106968551, 22.55867289216836]),
            {
              "landcover": 1,
              "system:index": "29"
            })]),
    vegetation_ahmedabad_2013 = ui.import && ui.import("vegetation_ahmedabad_2013", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            72.90495553990036,
            22.457812862223644
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.7866083719316,
            22.299714781899944
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.39934030552536,
            22.61446312847186
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.68841806431442,
            23.21150854299795
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.9949061014238,
            23.198886630814705
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.3352381326738,
            23.434088603806103
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.9184443094316,
            23.6767336543885
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.21703592320114,
            23.704400019675912
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.73775735874801,
            23.865251481459065
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.09549966831833,
            23.94120954862278
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.71715799351364,
            23.557827468785945
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.97310097351051,
            22.697654466316603
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.76185829772926,
            22.866685665978164
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.43089516296364,
            22.629856689654794
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.33864052429176,
            23.04308933956596
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.67303688659645,
            22.856404177123977
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.10938232954555,
            22.527928657630707
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.6179882865768,
            23.1616584318922
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.3976742606979,
            23.51692224709698
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.15504628018064,
            23.034065684527054
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.2320477543644,
            22.697476681846418
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.83516665084878,
            23.397231969040902
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.55296869857827,
            23.799024840050105
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.9892327366642,
            22.66290297700182
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.78402491195718,
            23.486013193562222
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.84238978012124,
            23.725419337980377
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.71278544052163,
            23.838049481770145
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.93953676803628,
            23.59334384564843
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.06906862838784,
            22.236129740721367
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.43975802047768,
            22.31626946544449
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 2
      },
      "color": "#9999ff",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": true
    }) || 
    /* color: #9999ff */
    /* shown: false */
    /* locked: true */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([72.90495553990036, 22.457812862223644]),
            {
              "landcover": 2,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([73.7866083719316, 22.299714781899944]),
            {
              "landcover": 2,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([73.39934030552536, 22.61446312847186]),
            {
              "landcover": 2,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([73.68841806431442, 23.21150854299795]),
            {
              "landcover": 2,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([72.9949061014238, 23.198886630814705]),
            {
              "landcover": 2,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([74.3352381326738, 23.434088603806103]),
            {
              "landcover": 2,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([73.9184443094316, 23.6767336543885]),
            {
              "landcover": 2,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([73.21703592320114, 23.704400019675912]),
            {
              "landcover": 2,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([72.73775735874801, 23.865251481459065]),
            {
              "landcover": 2,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([73.09549966831833, 23.94120954862278]),
            {
              "landcover": 2,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([72.71715799351364, 23.557827468785945]),
            {
              "landcover": 2,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([73.97310097351051, 22.697654466316603]),
            {
              "landcover": 2,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([72.76185829772926, 22.866685665978164]),
            {
              "landcover": 2,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([72.43089516296364, 22.629856689654794]),
            {
              "landcover": 2,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([73.33864052429176, 23.04308933956596]),
            {
              "landcover": 2,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([73.67303688659645, 22.856404177123977]),
            {
              "landcover": 2,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([74.10938232954555, 22.527928657630707]),
            {
              "landcover": 2,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([72.6179882865768, 23.1616584318922]),
            {
              "landcover": 2,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([73.3976742606979, 23.51692224709698]),
            {
              "landcover": 2,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([74.15504628018064, 23.034065684527054]),
            {
              "landcover": 2,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([73.2320477543644, 22.697476681846418]),
            {
              "landcover": 2,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([72.83516665084878, 23.397231969040902]),
            {
              "landcover": 2,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([73.55296869857827, 23.799024840050105]),
            {
              "landcover": 2,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([72.9892327366642, 22.66290297700182]),
            {
              "landcover": 2,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([73.78402491195718, 23.486013193562222]),
            {
              "landcover": 2,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([73.84238978012124, 23.725419337980377]),
            {
              "landcover": 2,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([73.71278544052163, 23.838049481770145]),
            {
              "landcover": 2,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([72.93953676803628, 23.59334384564843]),
            {
              "landcover": 2,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([74.06906862838784, 22.236129740721367]),
            {
              "landcover": 2,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([73.43975802047768, 22.31626946544449]),
            {
              "landcover": 2,
              "system:index": "29"
            })]),
    urban_ahmedabad_2018 = ui.import && ui.import("urban_ahmedabad_2018", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            73.84327108240079,
            22.226274363065805
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.81580526208829,
            22.594212852150058
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.23043996667813,
            22.313169226392986
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.9540651497836,
            22.561323039842247
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.4457758126254,
            22.44253749603507
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.62945348596524,
            22.996097572923883
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.25723652343814,
            23.013162621505654
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.9808617065436,
            23.592711107596884
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.25870899658267,
            23.590194078180563
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.81050114135806,
            23.77255330763862
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.65436176757876,
            23.424121077040237
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.06679157714908,
            23.07303121424471
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.50580219726626,
            23.518910660722568
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.86293034057681,
            23.83113705912632
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.1091919372565,
            22.60189921824046
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.82297449381629,
            23.16718018334019
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.17573862345496,
            23.317339195990883
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.64488916666785,
            22.895615744372478
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.50000696451941,
            22.56978075591745
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.14363794596473,
            23.73867177034907
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.74204950602332,
            23.36698689868603
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.85696344645301,
            22.797535374828016
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.11411218912879,
            22.895615744372492
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.45777826578895,
            23.86683261875929
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.5157998111991,
            23.21530624471065
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.64111261637488,
            22.37657542448524
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.29205255778113,
            23.269249934590597
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.08537225992957,
            22.93664610375195
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.56857233317176,
            22.575724914316798
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.66264276774207,
            22.42537804948817
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 0
      },
      "color": "#ffff99",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": true
    }) || 
    /* color: #ffff99 */
    /* shown: false */
    /* locked: true */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([73.84327108240079, 22.226274363065805]),
            {
              "landcover": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([73.81580526208829, 22.594212852150058]),
            {
              "landcover": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([73.23043996667813, 22.313169226392986]),
            {
              "landcover": 0,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([72.9540651497836, 22.561323039842247]),
            {
              "landcover": 0,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([72.4457758126254, 22.44253749603507]),
            {
              "landcover": 0,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([72.62945348596524, 22.996097572923883]),
            {
              "landcover": 0,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([73.25723652343814, 23.013162621505654]),
            {
              "landcover": 0,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([72.9808617065436, 23.592711107596884]),
            {
              "landcover": 0,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([74.25870899658267, 23.590194078180563]),
            {
              "landcover": 0,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([73.81050114135806, 23.77255330763862]),
            {
              "landcover": 0,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([72.65436176757876, 23.424121077040237]),
            {
              "landcover": 0,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([74.06679157714908, 23.07303121424471]),
            {
              "landcover": 0,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([73.50580219726626, 23.518910660722568]),
            {
              "landcover": 0,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([72.86293034057681, 23.83113705912632]),
            {
              "landcover": 0,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([74.1091919372565, 22.60189921824046]),
            {
              "landcover": 0,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([72.82297449381629, 23.16718018334019]),
            {
              "landcover": 0,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([73.17573862345496, 23.317339195990883]),
            {
              "landcover": 0,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([73.64488916666785, 22.895615744372478]),
            {
              "landcover": 0,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([73.50000696451941, 22.56978075591745]),
            {
              "landcover": 0,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([73.14363794596473, 23.73867177034907]),
            {
              "landcover": 0,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([73.74204950602332, 23.36698689868603]),
            {
              "landcover": 0,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([72.85696344645301, 22.797535374828016]),
            {
              "landcover": 0,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([73.11411218912879, 22.895615744372492]),
            {
              "landcover": 0,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([73.45777826578895, 23.86683261875929]),
            {
              "landcover": 0,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([73.5157998111991, 23.21530624471065]),
            {
              "landcover": 0,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([73.64111261637488, 22.37657542448524]),
            {
              "landcover": 0,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([74.29205255778113, 23.269249934590597]),
            {
              "landcover": 0,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([74.08537225992957, 22.93664610375195]),
            {
              "landcover": 0,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([72.56857233317176, 22.575724914316798]),
            {
              "landcover": 0,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([72.66264276774207, 22.42537804948817]),
            {
              "landcover": 0,
              "system:index": "29"
            })]),
    water_ahmedabad_2018 = ui.import && ui.import("water_ahmedabad_2018", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            73.83508997233191,
            23.335215044429994
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.76230554850379,
            23.027185621554665
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.20749597819129,
            23.70038803973712
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.37067346842566,
            23.48644391289018
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.89575891764441,
            24.024410051963393
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.39838342936316,
            22.38616326368055
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.61698084147254,
            22.546065516285342
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.3671410587577,
            22.889986486739694
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.88555841715613,
            22.44678285180968
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.81140070231238,
            22.30709595662445
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.64925318033973,
            23.13993843508794
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.9595311191825,
            23.25188677017562
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.83893900187293,
            22.886428208487956
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.09128122599402,
            22.4750206332126
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.16313486368934,
            23.045194513030207
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.8304656938571,
            23.54385310147708
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.7258514360446,
            23.840947509139056
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.0890869096774,
            23.838121231935073
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.17817916431608,
            23.79666209188703
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.41394271412076,
            23.318147041724718
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.54868539478997,
            23.71592746312783
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.51803048756341,
            22.796470499427887
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.72137674000481,
            22.751836023060843
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.13498147633294,
            23.120184725670946
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.9157698979638,
            22.474206513621354
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.73940118458489,
            23.584786318893727
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.96889909413079,
            22.726425843301055
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.05774720814446,
            22.68137252440348
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.01885255482415,
            23.863421505677543
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.9780730224402,
            22.150077990833513
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 1
      },
      "color": "#99ffff",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": true
    }) || 
    /* color: #99ffff */
    /* shown: false */
    /* locked: true */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([73.83508997233191, 23.335215044429994]),
            {
              "landcover": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([73.76230554850379, 23.027185621554665]),
            {
              "landcover": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([73.20749597819129, 23.70038803973712]),
            {
              "landcover": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([74.37067346842566, 23.48644391289018]),
            {
              "landcover": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([72.89575891764441, 24.024410051963393]),
            {
              "landcover": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([73.39838342936316, 22.38616326368055]),
            {
              "landcover": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([72.61698084147254, 22.546065516285342]),
            {
              "landcover": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([73.3671410587577, 22.889986486739694]),
            {
              "landcover": 1,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([73.88555841715613, 22.44678285180968]),
            {
              "landcover": 1,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([73.81140070231238, 22.30709595662445]),
            {
              "landcover": 1,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([72.64925318033973, 23.13993843508794]),
            {
              "landcover": 1,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([72.9595311191825, 23.25188677017562]),
            {
              "landcover": 1,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([72.83893900187293, 22.886428208487956]),
            {
              "landcover": 1,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([73.09128122599402, 22.4750206332126]),
            {
              "landcover": 1,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([74.16313486368934, 23.045194513030207]),
            {
              "landcover": 1,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([72.8304656938571, 23.54385310147708]),
            {
              "landcover": 1,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([73.7258514360446, 23.840947509139056]),
            {
              "landcover": 1,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([74.0890869096774, 23.838121231935073]),
            {
              "landcover": 1,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([74.17817916431608, 23.79666209188703]),
            {
              "landcover": 1,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([73.41394271412076, 23.318147041724718]),
            {
              "landcover": 1,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([73.54868539478997, 23.71592746312783]),
            {
              "landcover": 1,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([72.51803048756341, 22.796470499427887]),
            {
              "landcover": 1,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([73.72137674000481, 22.751836023060843]),
            {
              "landcover": 1,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([73.13498147633294, 23.120184725670946]),
            {
              "landcover": 1,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([72.9157698979638, 22.474206513621354]),
            {
              "landcover": 1,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([73.73940118458489, 23.584786318893727]),
            {
              "landcover": 1,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([72.96889909413079, 22.726425843301055]),
            {
              "landcover": 1,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([74.05774720814446, 22.68137252440348]),
            {
              "landcover": 1,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([73.01885255482415, 23.863421505677543]),
            {
              "landcover": 1,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([73.9780730224402, 22.150077990833513]),
            {
              "landcover": 1,
              "system:index": "29"
            })]),
    vegetation_ahmedabad_2018 = ui.import && ui.import("vegetation_ahmedabad_2018", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            72.4694753934923,
            22.675221421655866
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.65555632610949,
            22.462176684336548
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.1011892606798,
            22.625160170365866
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.85242011520295,
            22.37723345855579
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.85962989303498,
            22.148786086422557
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.31237342330841,
            22.369613978380634
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.32551887008576,
            23.45806105478038
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.35700538131623,
            23.652240494876757
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.65182044479279,
            23.802476730832804
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.90244605514435,
            23.846760164215976
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.86227729293732,
            23.678025535835342
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.0644943949881,
            23.81441276067707
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.74770667526154,
            23.631482988927907
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.92623450729279,
            23.691859314373897
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.25778510543732,
            23.197974256014717
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.86914374801545,
            23.316573921824705
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.6738922831717,
            23.12979488421379
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.90391852828888,
            22.949078534271194
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.36284186813263,
            22.644602236345676
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.89111640426545,
            23.00597344507734
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.83834388229279,
            22.63240272823368
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.39862506287469,
            22.990151615059386
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.11874453919305,
            22.648859587568772
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.26036517517937,
            23.17728309698005
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.62350146668328,
            23.368723183015437
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.65601794617547,
            22.834405808152308
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.59235603942848,
            22.858312164558967
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.86588509216286,
            22.346434378641387
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.08629830017067,
            23.656956543537586
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.69054634704567,
            23.849899153661156
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 2
      },
      "color": "#ff99ff",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": true
    }) || 
    /* color: #ff99ff */
    /* shown: false */
    /* locked: true */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([72.4694753934923, 22.675221421655866]),
            {
              "landcover": 2,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([72.65555632610949, 22.462176684336548]),
            {
              "landcover": 2,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([73.1011892606798, 22.625160170365866]),
            {
              "landcover": 2,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([73.85242011520295, 22.37723345855579]),
            {
              "landcover": 2,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([73.85962989303498, 22.148786086422557]),
            {
              "landcover": 2,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([73.31237342330841, 22.369613978380634]),
            {
              "landcover": 2,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([74.32551887008576, 23.45806105478038]),
            {
              "landcover": 2,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([73.35700538131623, 23.652240494876757]),
            {
              "landcover": 2,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([72.65182044479279, 23.802476730832804]),
            {
              "landcover": 2,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([72.90244605514435, 23.846760164215976]),
            {
              "landcover": 2,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([72.86227729293732, 23.678025535835342]),
            {
              "landcover": 2,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([73.0644943949881, 23.81441276067707]),
            {
              "landcover": 2,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([73.74770667526154, 23.631482988927907]),
            {
              "landcover": 2,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([73.92623450729279, 23.691859314373897]),
            {
              "landcover": 2,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([73.25778510543732, 23.197974256014717]),
            {
              "landcover": 2,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([72.86914374801545, 23.316573921824705]),
            {
              "landcover": 2,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([73.6738922831717, 23.12979488421379]),
            {
              "landcover": 2,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([73.90391852828888, 22.949078534271194]),
            {
              "landcover": 2,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([73.36284186813263, 22.644602236345676]),
            {
              "landcover": 2,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([72.89111640426545, 23.00597344507734]),
            {
              "landcover": 2,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([73.83834388229279, 22.63240272823368]),
            {
              "landcover": 2,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([73.39862506287469, 22.990151615059386]),
            {
              "landcover": 2,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([74.11874453919305, 22.648859587568772]),
            {
              "landcover": 2,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([74.26036517517937, 23.17728309698005]),
            {
              "landcover": 2,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([73.62350146668328, 23.368723183015437]),
            {
              "landcover": 2,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([72.65601794617547, 22.834405808152308]),
            {
              "landcover": 2,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([73.59235603942848, 22.858312164558967]),
            {
              "landcover": 2,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([72.86588509216286, 22.346434378641387]),
            {
              "landcover": 2,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([73.08629830017067, 23.656956543537586]),
            {
              "landcover": 2,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([73.69054634704567, 23.849899153661156]),
            {
              "landcover": 2,
              "system:index": "29"
            })]),
    urban_kolkata_1988 = ui.import && ui.import("urban_kolkata_1988", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            89.65756717776327,
            23.48960463945815
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.55182376956014,
            23.470396022789963
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.50187030886678,
            23.68232264023283
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.12102619265585,
            23.40503431110475
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.52889362429647,
            23.78258100235601
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.2724315271285,
            23.73199002728415
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.95289722537069,
            23.650563335035464
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.58605686282186,
            23.244091451005488
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.79634204958944,
            23.206704691056736
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.20702854250936,
            22.955296088062003
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.45765415286093,
            22.963515343916406
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.1304809198287,
            22.259495212679596
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.69805408743692,
            22.404059444629556
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.87555195120645,
            22.56298991861504
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.63978840140176,
            22.908765868035474
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.19758869437051,
            22.942915858919577
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.22007633475137,
            23.296711902072214
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.65994526175332,
            22.79075580938551
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.56141163138223,
            23.43617274363743
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.69908405569863,
            23.536619473289527
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            87.99669277326933,
            22.45045418778374
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.45880520002714,
            22.409198748633617
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.88727199690214,
            22.964157788739428
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.4752262947943,
            23.169633300382166
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.04727448205016,
            23.44631275389045
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.26631439904234,
            23.62352484394747
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.02005280236266,
            23.205137157276447
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.2143734810736,
            22.699312176320564
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.73485077599547,
            23.757769470397086
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.44449890831969,
            22.722431507649368
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 0
      },
      "color": "#d63000",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": true
    }) || 
    /* color: #d63000 */
    /* shown: false */
    /* locked: true */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([89.65756717776327, 23.48960463945815]),
            {
              "landcover": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([89.55182376956014, 23.470396022789963]),
            {
              "landcover": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([89.50187030886678, 23.68232264023283]),
            {
              "landcover": 0,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([88.12102619265585, 23.40503431110475]),
            {
              "landcover": 0,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([88.52889362429647, 23.78258100235601]),
            {
              "landcover": 0,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([88.2724315271285, 23.73199002728415]),
            {
              "landcover": 0,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([88.95289722537069, 23.650563335035464]),
            {
              "landcover": 0,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([88.58605686282186, 23.244091451005488]),
            {
              "landcover": 0,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([88.79634204958944, 23.206704691056736]),
            {
              "landcover": 0,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([88.20702854250936, 22.955296088062003]),
            {
              "landcover": 0,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([88.45765415286093, 22.963515343916406]),
            {
              "landcover": 0,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([89.1304809198287, 22.259495212679596]),
            {
              "landcover": 0,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([88.69805408743692, 22.404059444629556]),
            {
              "landcover": 0,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([88.87555195120645, 22.56298991861504]),
            {
              "landcover": 0,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([89.63978840140176, 22.908765868035474]),
            {
              "landcover": 0,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([89.19758869437051, 22.942915858919577]),
            {
              "landcover": 0,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([89.22007633475137, 23.296711902072214]),
            {
              "landcover": 0,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([88.65994526175332, 22.79075580938551]),
            {
              "landcover": 0,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([88.56141163138223, 23.43617274363743]),
            {
              "landcover": 0,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([88.69908405569863, 23.536619473289527]),
            {
              "landcover": 0,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([87.99669277326933, 22.45045418778374]),
            {
              "landcover": 0,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([88.45880520002714, 22.409198748633617]),
            {
              "landcover": 0,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([88.88727199690214, 22.964157788739428]),
            {
              "landcover": 0,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([89.4752262947943, 23.169633300382166]),
            {
              "landcover": 0,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([89.04727448205016, 23.44631275389045]),
            {
              "landcover": 0,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([89.26631439904234, 23.62352484394747]),
            {
              "landcover": 0,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([88.02005280236266, 23.205137157276447]),
            {
              "landcover": 0,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([88.2143734810736, 22.699312176320564]),
            {
              "landcover": 0,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([88.73485077599547, 23.757769470397086]),
            {
              "landcover": 0,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([89.44449890831969, 22.722431507649368]),
            {
              "landcover": 0,
              "system:index": "29"
            })]),
    water_kolkata_1988 = ui.import && ui.import("water_kolkata_1988", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            88.32041151759539,
            22.552697102775234
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.90680678126726,
            22.328030881592145
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.43003065822039,
            22.423272844504677
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            87.89194472072039,
            22.52225522854225
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.63808424708758,
            23.254146812867514
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.11623366115008,
            23.176527951423918
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.57628615138445,
            23.00345913641326
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.38608534572039,
            23.117652732877776
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.83618147609148,
            23.744836608428038
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.45396406886492,
            23.037743183503515
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.85256178615008,
            22.909409830167625
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            87.98841841456805,
            23.11923149426331
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.82526762721453,
            23.332666256876998
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.01203520533953,
            23.66451852255257
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.23200590846453,
            23.64061789567912
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.4885671877614,
            23.613409897442267
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.58580000636492,
            23.782748474896977
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.49748022792254,
            23.67297899414564
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.22350867030535,
            23.880574991025743
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.17814715144549,
            23.7468498081361
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.22476656672869,
            23.483435535464963
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.16571505305681,
            23.417332046513263
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.2161405825368,
            22.815740248000235
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.14575941798601,
            22.966607888575073
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.3595503115407,
            23.369042627785273
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.46289046046648,
            23.222728034544847
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.8625610613576,
            23.850473326356074
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.70436437365923,
            23.61114885189822
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.77197749850664,
            22.87347206583764
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.4066820883504,
            22.885175613501843
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#98ff00",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": true
    }) || 
    /* color: #98ff00 */
    /* shown: false */
    /* locked: true */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([88.32041151759539, 22.552697102775234]),
            {
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([88.90680678126726, 22.328030881592145]),
            {
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([89.43003065822039, 22.423272844504677]),
            {
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([87.89194472072039, 22.52225522854225]),
            {
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([89.63808424708758, 23.254146812867514]),
            {
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([89.11623366115008, 23.176527951423918]),
            {
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([89.57628615138445, 23.00345913641326]),
            {
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([89.38608534572039, 23.117652732877776]),
            {
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([89.83618147609148, 23.744836608428038]),
            {
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([88.45396406886492, 23.037743183503515]),
            {
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([88.85256178615008, 22.909409830167625]),
            {
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([87.98841841456805, 23.11923149426331]),
            {
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([88.82526762721453, 23.332666256876998]),
            {
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([89.01203520533953, 23.66451852255257]),
            {
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([88.23200590846453, 23.64061789567912]),
            {
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([89.4885671877614, 23.613409897442267]),
            {
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([88.58580000636492, 23.782748474896977]),
            {
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([88.49748022792254, 23.67297899414564]),
            {
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([88.22350867030535, 23.880574991025743]),
            {
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([88.17814715144549, 23.7468498081361]),
            {
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([89.22476656672869, 23.483435535464963]),
            {
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([89.16571505305681, 23.417332046513263]),
            {
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([89.2161405825368, 22.815740248000235]),
            {
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([89.14575941798601, 22.966607888575073]),
            {
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([88.3595503115407, 23.369042627785273]),
            {
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([88.46289046046648, 23.222728034544847]),
            {
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([88.8625610613576, 23.850473326356074]),
            {
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([88.70436437365923, 23.61114885189822]),
            {
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([88.77197749850664, 22.87347206583764]),
            {
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([88.4066820883504, 22.885175613501843]),
            {
              "system:index": "29"
            })]),
    vegetation_kolkata_1988 = ui.import && ui.import("vegetation_kolkata_1988", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            87.94282259974527,
            22.79274361750258
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.08856310877847,
            22.8604606573682
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.43730864000938,
            22.301266069443905
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.08917936754844,
            22.44476664929569
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.36109098864219,
            23.56345552159956
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.54579863024375,
            23.58296521077326
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.16814360094688,
            23.504909075011536
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.37609800768516,
            23.85422560801595
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.4825280613961,
            23.67292395293942
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.4493249363961,
            22.98093472646735
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.96729978991172,
            22.985359702337377
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.53446897936485,
            23.210209715971526
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.26589140368125,
            23.182755267398978
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.59548124743125,
            23.25437744582258
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.72150856386887,
            23.68110385087923
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.97488075625168,
            23.83542268860692
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.53328186403976,
            22.84546730570098
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.96376568209396,
            23.205869928130213
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.55993229281174,
            22.466420628523718
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.0953307760881,
            23.573052297446218
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.28398662935959,
            23.594448303150386
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.23283256632112,
            22.751308469132237
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.82548011881136,
            23.406524457470162
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.14424194437288,
            22.528392560850477
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.84522117716097,
            22.76436798856512
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.84522117716097,
            22.76436798856512
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.31317009073518,
            23.233990024867744
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.08159889322542,
            23.619733567575103
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.7209383402469,
            23.10473861595067
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.70060981851839,
            23.40849363355194
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 2
      },
      "color": "#0b4a8b",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": true
    }) || 
    /* color: #0b4a8b */
    /* shown: false */
    /* locked: true */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([87.94282259974527, 22.79274361750258]),
            {
              "landcover": 2,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([88.08856310877847, 22.8604606573682]),
            {
              "landcover": 2,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([89.43730864000938, 22.301266069443905]),
            {
              "landcover": 2,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([89.08917936754844, 22.44476664929569]),
            {
              "landcover": 2,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([89.36109098864219, 23.56345552159956]),
            {
              "landcover": 2,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([89.54579863024375, 23.58296521077326]),
            {
              "landcover": 2,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([89.16814360094688, 23.504909075011536]),
            {
              "landcover": 2,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([88.37609800768516, 23.85422560801595]),
            {
              "landcover": 2,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([88.4825280613961, 23.67292395293942]),
            {
              "landcover": 2,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([89.4493249363961, 22.98093472646735]),
            {
              "landcover": 2,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([88.96729978991172, 22.985359702337377]),
            {
              "landcover": 2,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([89.53446897936485, 23.210209715971526]),
            {
              "landcover": 2,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([88.26589140368125, 23.182755267398978]),
            {
              "landcover": 2,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([88.59548124743125, 23.25437744582258]),
            {
              "landcover": 2,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([88.72150856386887, 23.68110385087923]),
            {
              "landcover": 2,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([88.97488075625168, 23.83542268860692]),
            {
              "landcover": 2,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([88.53328186403976, 22.84546730570098]),
            {
              "landcover": 2,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([88.96376568209396, 23.205869928130213]),
            {
              "landcover": 2,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([88.55993229281174, 22.466420628523718]),
            {
              "landcover": 2,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([88.0953307760881, 23.573052297446218]),
            {
              "landcover": 2,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([88.28398662935959, 23.594448303150386]),
            {
              "landcover": 2,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([89.23283256632112, 22.751308469132237]),
            {
              "landcover": 2,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([88.82548011881136, 23.406524457470162]),
            {
              "landcover": 2,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([88.14424194437288, 22.528392560850477]),
            {
              "landcover": 2,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([88.84522117716097, 22.76436798856512]),
            {
              "landcover": 2,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([88.84522117716097, 22.76436798856512]),
            {
              "landcover": 2,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([89.31317009073518, 23.233990024867744]),
            {
              "landcover": 2,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([89.08159889322542, 23.619733567575103]),
            {
              "landcover": 2,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([88.7209383402469, 23.10473861595067]),
            {
              "landcover": 2,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([89.70060981851839, 23.40849363355194]),
            {
              "landcover": 2,
              "system:index": "29"
            })]),
    urban_kolkata_1993 = ui.import && ui.import("urban_kolkata_1993", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            88.91687827286057,
            22.2885640028778
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.36113791641526,
            22.479671158740068
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.54771401708817,
            22.790415200577606
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.06082902210753,
            22.642204060096816
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.09413132923643,
            23.032336551772197
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.52809129017393,
            23.001685481591018
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.89681992786925,
            22.808139103847363
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.47590623158018,
            22.445609573777176
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.96884274602168,
            23.2940963770976
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.12152218938105,
            23.43159116464645
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.10308194279902,
            23.719510867233303
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.67914541020865,
            23.717018571265573
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.5226894165563,
            23.464055633599017
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.04547078862662,
            23.490507388498084
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.59262807622427,
            23.389080217774953
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.80445821538443,
            23.472873474555644
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.55623586431021,
            22.73678719332054
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.816989495902,
            22.975485177090235
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.73253209844107,
            23.013568366592875
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.21490056767935,
            23.136119981112618
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.31034429326529,
            23.18394161296388
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.1022907043981,
            23.165477858053105
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.12639577641959,
            23.751275690433935
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.44637258306021,
            23.55252222816864
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.35882528081412,
            23.827300556146533
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.71323354497427,
            23.62763605839727
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.19574697270865,
            22.87089423283948
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.18445338796981,
            22.85805311374777
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.3954743769299,
            23.242444911490015
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.25986188913693,
            23.2022177270443
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 0
      },
      "color": "#ffc82d",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": true
    }) || 
    /* color: #ffc82d */
    /* shown: false */
    /* locked: true */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([88.91687827286057, 22.2885640028778]),
            {
              "landcover": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([89.36113791641526, 22.479671158740068]),
            {
              "landcover": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([89.54771401708817, 22.790415200577606]),
            {
              "landcover": 0,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([88.06082902210753, 22.642204060096816]),
            {
              "landcover": 0,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([88.09413132923643, 23.032336551772197]),
            {
              "landcover": 0,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([88.52809129017393, 23.001685481591018]),
            {
              "landcover": 0,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([88.89681992786925, 22.808139103847363]),
            {
              "landcover": 0,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([88.47590623158018, 22.445609573777176]),
            {
              "landcover": 0,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([88.96884274602168, 23.2940963770976]),
            {
              "landcover": 0,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([88.12152218938105, 23.43159116464645]),
            {
              "landcover": 0,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([89.10308194279902, 23.719510867233303]),
            {
              "landcover": 0,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([88.67914541020865, 23.717018571265573]),
            {
              "landcover": 0,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([89.5226894165563, 23.464055633599017]),
            {
              "landcover": 0,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([89.04547078862662, 23.490507388498084]),
            {
              "landcover": 0,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([88.59262807622427, 23.389080217774953]),
            {
              "landcover": 0,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([88.80445821538443, 23.472873474555644]),
            {
              "landcover": 0,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([88.55623586431021, 22.73678719332054]),
            {
              "landcover": 0,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([88.816989495902, 22.975485177090235]),
            {
              "landcover": 0,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([88.73253209844107, 23.013568366592875]),
            {
              "landcover": 0,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([89.21490056767935, 23.136119981112618]),
            {
              "landcover": 0,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([89.31034429326529, 23.18394161296388]),
            {
              "landcover": 0,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([89.1022907043981, 23.165477858053105]),
            {
              "landcover": 0,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([88.12639577641959, 23.751275690433935]),
            {
              "landcover": 0,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([88.44637258306021, 23.55252222816864]),
            {
              "landcover": 0,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([88.35882528081412, 23.827300556146533]),
            {
              "landcover": 0,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([89.71323354497427, 23.62763605839727]),
            {
              "landcover": 0,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([88.19574697270865, 22.87089423283948]),
            {
              "landcover": 0,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([89.18445338796981, 22.85805311374777]),
            {
              "landcover": 0,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([88.3954743769299, 23.242444911490015]),
            {
              "landcover": 0,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([88.25986188913693, 23.2022177270443]),
            {
              "landcover": 0,
              "system:index": "29"
            })]),
    water_kolkata_1993 = ui.import && ui.import("water_kolkata_1993", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            89.42668915936805,
            22.46107245494123
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.9075851554618,
            22.323940665918336
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.53311921307899,
            22.693758354865302
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.93985749432899,
            22.568904958182475
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.35758210370399,
            22.75202661693445
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            87.99057007977821,
            23.08184805226923
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.61105347821571,
            23.298338127628313
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.51011658856727,
            23.21727430736617
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.51011658856727,
            23.21727430736617
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.84313965985633,
            23.744088962591967
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.3357086295829,
            23.688767198327103
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.14713270900164,
            22.952886123786982
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.84363539454851,
            22.97912323679624
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.72707731959734,
            23.561651935552142
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.20248015162859,
            23.61639833534836
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.14358632185909,
            23.864300881929413
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.36592133108738,
            23.271437605228716
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.46273834768894,
            23.411082528065712
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.9440768486655,
            23.444474637054707
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.91180450979832,
            23.109543846810716
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            87.89525318416807,
            22.48775205633111
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.19737720760557,
            22.50805245141864
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.47628256543514,
            23.86379799208969
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.55430266126034,
            23.009295325398256
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.43928953870174,
            23.015773343987277
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.32626387341854,
            23.420265661186733
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.47646757825252,
            23.455072755349548
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.80818983777401,
            22.73472198877085
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            87.96361586316463,
            22.81955728538459
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.88595244153377,
            23.85037499330022
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 1
      },
      "color": "#00ffff",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": true
    }) || 
    /* color: #00ffff */
    /* shown: false */
    /* locked: true */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([89.42668915936805, 22.46107245494123]),
            {
              "landcover": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([88.9075851554618, 22.323940665918336]),
            {
              "landcover": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([89.53311921307899, 22.693758354865302]),
            {
              "landcover": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([88.93985749432899, 22.568904958182475]),
            {
              "landcover": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([88.35758210370399, 22.75202661693445]),
            {
              "landcover": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([87.99057007977821, 23.08184805226923]),
            {
              "landcover": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([89.61105347821571, 23.298338127628313]),
            {
              "landcover": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([89.51011658856727, 23.21727430736617]),
            {
              "landcover": 1,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([89.51011658856727, 23.21727430736617]),
            {
              "landcover": 1,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([89.84313965985633, 23.744088962591967]),
            {
              "landcover": 1,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([89.3357086295829, 23.688767198327103]),
            {
              "landcover": 1,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([89.14713270900164, 22.952886123786982]),
            {
              "landcover": 1,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([88.84363539454851, 22.97912323679624]),
            {
              "landcover": 1,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([88.72707731959734, 23.561651935552142]),
            {
              "landcover": 1,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([88.20248015162859, 23.61639833534836]),
            {
              "landcover": 1,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([88.14358632185909, 23.864300881929413]),
            {
              "landcover": 1,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([88.36592133108738, 23.271437605228716]),
            {
              "landcover": 1,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([88.46273834768894, 23.411082528065712]),
            {
              "landcover": 1,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([88.9440768486655, 23.444474637054707]),
            {
              "landcover": 1,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([88.91180450979832, 23.109543846810716]),
            {
              "landcover": 1,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([87.89525318416807, 22.48775205633111]),
            {
              "landcover": 1,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([88.19737720760557, 22.50805245141864]),
            {
              "landcover": 1,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([88.47628256543514, 23.86379799208969]),
            {
              "landcover": 1,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([88.55430266126034, 23.009295325398256]),
            {
              "landcover": 1,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([88.43928953870174, 23.015773343987277]),
            {
              "landcover": 1,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([89.32626387341854, 23.420265661186733]),
            {
              "landcover": 1,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([89.47646757825252, 23.455072755349548]),
            {
              "landcover": 1,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([88.80818983777401, 22.73472198877085]),
            {
              "landcover": 1,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([87.96361586316463, 22.81955728538459]),
            {
              "landcover": 1,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([88.88595244153377, 23.85037499330022]),
            {
              "landcover": 1,
              "system:index": "29"
            })]),
    vegetation_kolkata_1993 = ui.import && ui.import("vegetation_kolkata_1993", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            89.56670052189273,
            22.40951271729272
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.3678174652521,
            22.39808599280815
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.04509407658023,
            22.596015932090125
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            87.8844190277521,
            22.879725586324437
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.0980649628107,
            22.693924241460966
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.89069801945132,
            22.75915762024981
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.2522168793146,
            22.798409303348457
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.65974098820132,
            23.60401633594114
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.12347084659976,
            23.724137833701274
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.34275490421695,
            23.905681984433016
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.79250771183413,
            23.70527789169669
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.28216489507429,
            23.252368342657483
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.7607568140196,
            23.186741456926647
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.42130979253523,
            23.34822646949149
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.52352079107038,
            22.945729094537324
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.82495816900007,
            23.025377232885987
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.19905073352105,
            23.691658187099048
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.50495130725152,
            23.760490969702154
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.24917585559136,
            22.83311603295763
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.44246656604058,
            22.955515263384836
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.08345014758355,
            22.432259189086324
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.55610639758355,
            22.57816051815701
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.47209150500542,
            23.125488399597355
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.11057264514214,
            23.529333438349525
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.43772436297675,
            23.582675894274526
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.87717748797675,
            23.54396827506329
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.13491369403144,
            22.981276248562132
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.30348516619941,
            23.108909745750115
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.02892614520331,
            23.363861421894786
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.33538622313827,
            23.13011389529794
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 2
      },
      "color": "#bf04c2",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": true
    }) || 
    /* color: #bf04c2 */
    /* shown: false */
    /* locked: true */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([89.56670052189273, 22.40951271729272]),
            {
              "landcover": 2,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([88.3678174652521, 22.39808599280815]),
            {
              "landcover": 2,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([88.04509407658023, 22.596015932090125]),
            {
              "landcover": 2,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([87.8844190277521, 22.879725586324437]),
            {
              "landcover": 2,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([89.0980649628107, 22.693924241460966]),
            {
              "landcover": 2,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([88.89069801945132, 22.75915762024981]),
            {
              "landcover": 2,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([89.2522168793146, 22.798409303348457]),
            {
              "landcover": 2,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([89.65974098820132, 23.60401633594114]),
            {
              "landcover": 2,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([89.12347084659976, 23.724137833701274]),
            {
              "landcover": 2,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([88.34275490421695, 23.905681984433016]),
            {
              "landcover": 2,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([88.79250771183413, 23.70527789169669]),
            {
              "landcover": 2,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([88.28216489507429, 23.252368342657483]),
            {
              "landcover": 2,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([88.7607568140196, 23.186741456926647]),
            {
              "landcover": 2,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([89.42130979253523, 23.34822646949149]),
            {
              "landcover": 2,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([88.52352079107038, 22.945729094537324]),
            {
              "landcover": 2,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([88.82495816900007, 23.025377232885987]),
            {
              "landcover": 2,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([88.19905073352105, 23.691658187099048]),
            {
              "landcover": 2,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([88.50495130725152, 23.760490969702154]),
            {
              "landcover": 2,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([88.24917585559136, 22.83311603295763]),
            {
              "landcover": 2,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([88.44246656604058, 22.955515263384836]),
            {
              "landcover": 2,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([89.08345014758355, 22.432259189086324]),
            {
              "landcover": 2,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([88.55610639758355, 22.57816051815701]),
            {
              "landcover": 2,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([89.47209150500542, 23.125488399597355]),
            {
              "landcover": 2,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([89.11057264514214, 23.529333438349525]),
            {
              "landcover": 2,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([88.43772436297675, 23.582675894274526]),
            {
              "landcover": 2,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([88.87717748797675, 23.54396827506329]),
            {
              "landcover": 2,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([88.13491369403144, 22.981276248562132]),
            {
              "landcover": 2,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([88.30348516619941, 23.108909745750115]),
            {
              "landcover": 2,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([89.02892614520331, 23.363861421894786]),
            {
              "landcover": 2,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([89.33538622313827, 23.13011389529794]),
            {
              "landcover": 2,
              "system:index": "29"
            })]),
    urban_kolkata_1998 = ui.import && ui.import("urban_kolkata_1998", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            89.32566054103289,
            22.496247481777786
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.55843336818133,
            22.506397428409443
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.38196547267351,
            22.76876751904648
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.83539564845476,
            22.496881875262346
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.35199721095476,
            22.52035238858993
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.48451979396258,
            22.821307864044527
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            87.91666395900164,
            22.574890069529452
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.68271620509539,
            23.43067156250583
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.15811903712664,
            23.467837869971955
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.18239577052508,
            23.43067156250583
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.58271010157976,
            23.098864047224264
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.52022536036883,
            23.42815143441143
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.01804335353289,
            23.772331430165266
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.59163649318133,
            23.6711218729904
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.06198866603289,
            23.14748818053905
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.45612318751726,
            22.932019244658537
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.92671950099383,
            22.87699115511775
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.06669600245867,
            23.042324262070128
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.39491255519305,
            23.063489980981323
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.22668440577898,
            22.90071289721966
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.2771528506032,
            23.89010050507396
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.55078108546648,
            23.82447706268311
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.54944524349243,
            23.759521226242065
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.80992803157837,
            23.298160935809683
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.1690436321643,
            22.336147720495397
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.40153527990279,
            23.269347887045395
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.63386560216841,
            22.32936281863846
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.86063028112349,
            23.593336530061883
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.6606447769731,
            22.59555612238274
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.32222772375044,
            23.533701712381248
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 0
      },
      "color": "#d63000",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": true
    }) || 
    /* color: #d63000 */
    /* shown: false */
    /* locked: true */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([89.32566054103289, 22.496247481777786]),
            {
              "landcover": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([89.55843336818133, 22.506397428409443]),
            {
              "landcover": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([89.38196547267351, 22.76876751904648]),
            {
              "landcover": 0,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([88.83539564845476, 22.496881875262346]),
            {
              "landcover": 0,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([88.35199721095476, 22.52035238858993]),
            {
              "landcover": 0,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([88.48451979396258, 22.821307864044527]),
            {
              "landcover": 0,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([87.91666395900164, 22.574890069529452]),
            {
              "landcover": 0,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([89.68271620509539, 23.43067156250583]),
            {
              "landcover": 0,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([89.15811903712664, 23.467837869971955]),
            {
              "landcover": 0,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([88.18239577052508, 23.43067156250583]),
            {
              "landcover": 0,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([88.58271010157976, 23.098864047224264]),
            {
              "landcover": 0,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([88.52022536036883, 23.42815143441143]),
            {
              "landcover": 0,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([89.01804335353289, 23.772331430165266]),
            {
              "landcover": 0,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([88.59163649318133, 23.6711218729904]),
            {
              "landcover": 0,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([89.06198866603289, 23.14748818053905]),
            {
              "landcover": 0,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([89.45612318751726, 22.932019244658537]),
            {
              "landcover": 0,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([88.92671950099383, 22.87699115511775]),
            {
              "landcover": 0,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([88.06669600245867, 23.042324262070128]),
            {
              "landcover": 0,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([88.39491255519305, 23.063489980981323]),
            {
              "landcover": 0,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([88.22668440577898, 22.90071289721966]),
            {
              "landcover": 0,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([88.2771528506032, 23.89010050507396]),
            {
              "landcover": 0,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([88.55078108546648, 23.82447706268311]),
            {
              "landcover": 0,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([89.54944524349243, 23.759521226242065]),
            {
              "landcover": 0,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([88.80992803157837, 23.298160935809683]),
            {
              "landcover": 0,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([89.1690436321643, 22.336147720495397]),
            {
              "landcover": 0,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([89.40153527990279, 23.269347887045395]),
            {
              "landcover": 0,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([88.63386560216841, 22.32936281863846]),
            {
              "landcover": 0,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([88.86063028112349, 23.593336530061883]),
            {
              "landcover": 0,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([88.6606447769731, 22.59555612238274]),
            {
              "landcover": 0,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([89.32222772375044, 23.533701712381248]),
            {
              "landcover": 0,
              "system:index": "29"
            })]),
    water_kolkata_1998 = ui.import && ui.import("water_kolkata_1998", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            88.23858916140671,
            22.525049136187025
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            87.87741362429733,
            22.44828204094387
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.94308745242233,
            22.30160870454708
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.93896757937546,
            22.566270063241276
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.7707394299614,
            22.511728975607376
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.42305266238327,
            22.47683675922943
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.53840910769577,
            22.74686230004473
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.26375090457077,
            22.28127814466551
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.6700165751333,
            23.212482469239216
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.61491683398272,
            23.039392831428195
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            87.93830016528155,
            22.942681166831175
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.83378508959795,
            23.73893511660254
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.50488189135577,
            23.5112025666429
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.45019439135577,
            23.17075881779649
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.37946990405108,
            23.332263182029166
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.83008101855303,
            22.96496891455454
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.86269668017412,
            22.897145854308405
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.04836635170012,
            23.295307066451322
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.80701045570403,
            23.35583753925134
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.041499896622,
            23.78380169064889
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.24612025795012,
            23.76180823701096
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.52162341651946,
            23.69234737919276
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.14422587928802,
            23.864124700451242
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.40618114051848,
            22.88699465637445
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.14261078834647,
            22.9651368783596
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.23572373390311,
            23.636136904101797
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.19702744484061,
            23.48193084675121
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.94245362281913,
            23.444453526505185
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.85267472267265,
            23.798250658367014
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.75242447853202,
            23.67524965936693
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 1
      },
      "color": "#98ff00",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": true
    }) || 
    /* color: #98ff00 */
    /* shown: false */
    /* locked: true */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([88.23858916140671, 22.525049136187025]),
            {
              "landcover": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([87.87741362429733, 22.44828204094387]),
            {
              "landcover": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([88.94308745242233, 22.30160870454708]),
            {
              "landcover": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([88.93896757937546, 22.566270063241276]),
            {
              "landcover": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([88.7707394299614, 22.511728975607376]),
            {
              "landcover": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([89.42305266238327, 22.47683675922943]),
            {
              "landcover": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([89.53840910769577, 22.74686230004473]),
            {
              "landcover": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([89.26375090457077, 22.28127814466551]),
            {
              "landcover": 1,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([89.6700165751333, 23.212482469239216]),
            {
              "landcover": 1,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([89.61491683398272, 23.039392831428195]),
            {
              "landcover": 1,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([87.93830016528155, 22.942681166831175]),
            {
              "landcover": 1,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([89.83378508959795, 23.73893511660254]),
            {
              "landcover": 1,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([89.50488189135577, 23.5112025666429]),
            {
              "landcover": 1,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([88.45019439135577, 23.17075881779649]),
            {
              "landcover": 1,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([88.37946990405108, 23.332263182029166]),
            {
              "landcover": 1,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([88.83008101855303, 22.96496891455454]),
            {
              "landcover": 1,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([88.86269668017412, 22.897145854308405]),
            {
              "landcover": 1,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([89.04836635170012, 23.295307066451322]),
            {
              "landcover": 1,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([88.80701045570403, 23.35583753925134]),
            {
              "landcover": 1,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([89.041499896622, 23.78380169064889]),
            {
              "landcover": 1,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([89.24612025795012, 23.76180823701096]),
            {
              "landcover": 1,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([88.52162341651946, 23.69234737919276]),
            {
              "landcover": 1,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([88.14422587928802, 23.864124700451242]),
            {
              "landcover": 1,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([88.40618114051848, 22.88699465637445]),
            {
              "landcover": 1,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([89.14261078834647, 22.9651368783596]),
            {
              "landcover": 1,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([88.23572373390311, 23.636136904101797]),
            {
              "landcover": 1,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([89.19702744484061, 23.48193084675121]),
            {
              "landcover": 1,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([88.94245362281913, 23.444453526505185]),
            {
              "landcover": 1,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([88.85267472267265, 23.798250658367014]),
            {
              "landcover": 1,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([88.75242447853202, 23.67524965936693]),
            {
              "landcover": 1,
              "system:index": "29"
            })]),
    vegetation_kolkata_1998 = ui.import && ui.import("vegetation_kolkata_1998", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            89.53226114988641,
            22.402097324855205
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.00241495848016,
            22.91408445885536
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.02414347410516,
            22.382416332146477
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.30978800535516,
            22.62854488396464
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.65058899656638,
            22.440807372921004
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.90190125242576,
            22.477294880695567
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.00240074073645,
            22.452697251467544
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.40237174903723,
            22.543414529176054
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.21354423438879,
            22.49616015357847
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            87.89494071876379,
            22.729103471808738
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.24787650977942,
            22.833561627699424
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.78733573829504,
            23.246173929400012
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.38770805274817,
            23.243019382321265
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.30599723731848,
            23.029599438422906
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.6754125205216,
            23.6115931104127
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.18034110938879,
            23.658142730455832
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.39045500276187,
            23.8743177092369
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.77291655061343,
            23.841663156908545
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.46255278108218,
            23.666947552950123
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.94801115510562,
            23.58642426637736
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.2606790017853,
            23.262576371423688
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.81274199006656,
            23.37859744357878
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.78716444490054,
            22.921655648532226
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.89187788484195,
            22.92829596706793
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.6968705606232,
            22.935568323395078
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.06886076448062,
            23.13540473627027
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.24429869172671,
            23.266045860169882
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.86870359895327,
            23.089934454557312
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.96174406526187,
            23.25563712298352
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.31928334846634,
            23.46241740787513
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 2
      },
      "color": "#0b4a8b",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": true
    }) || 
    /* color: #0b4a8b */
    /* shown: false */
    /* locked: true */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([89.53226114988641, 22.402097324855205]),
            {
              "landcover": 2,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([88.00241495848016, 22.91408445885536]),
            {
              "landcover": 2,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([89.02414347410516, 22.382416332146477]),
            {
              "landcover": 2,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([89.30978800535516, 22.62854488396464]),
            {
              "landcover": 2,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([88.65058899656638, 22.440807372921004]),
            {
              "landcover": 2,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([88.90190125242576, 22.477294880695567]),
            {
              "landcover": 2,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([88.00240074073645, 22.452697251467544]),
            {
              "landcover": 2,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([88.40237174903723, 22.543414529176054]),
            {
              "landcover": 2,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([88.21354423438879, 22.49616015357847]),
            {
              "landcover": 2,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([87.89494071876379, 22.729103471808738]),
            {
              "landcover": 2,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([88.24787650977942, 22.833561627699424]),
            {
              "landcover": 2,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([89.78733573829504, 23.246173929400012]),
            {
              "landcover": 2,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([89.38770805274817, 23.243019382321265]),
            {
              "landcover": 2,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([89.30599723731848, 23.029599438422906]),
            {
              "landcover": 2,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([89.6754125205216, 23.6115931104127]),
            {
              "landcover": 2,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([89.18034110938879, 23.658142730455832]),
            {
              "landcover": 2,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([88.39045500276187, 23.8743177092369]),
            {
              "landcover": 2,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([88.77291655061343, 23.841663156908545]),
            {
              "landcover": 2,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([88.46255278108218, 23.666947552950123]),
            {
              "landcover": 2,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([88.94801115510562, 23.58642426637736]),
            {
              "landcover": 2,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([88.2606790017853, 23.262576371423688]),
            {
              "landcover": 2,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([88.81274199006656, 23.37859744357878]),
            {
              "landcover": 2,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([88.78716444490054, 22.921655648532226]),
            {
              "landcover": 2,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([88.89187788484195, 22.92829596706793]),
            {
              "landcover": 2,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([88.6968705606232, 22.935568323395078]),
            {
              "landcover": 2,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([89.06886076448062, 23.13540473627027]),
            {
              "landcover": 2,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([89.24429869172671, 23.266045860169882]),
            {
              "landcover": 2,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([88.86870359895327, 23.089934454557312]),
            {
              "landcover": 2,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([88.96174406526187, 23.25563712298352]),
            {
              "landcover": 2,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([88.31928334846634, 23.46241740787513]),
            {
              "landcover": 2,
              "system:index": "29"
            })]),
    urban_kolkata_2008 = ui.import && ui.import("urban_kolkata_2008", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            89.54264052150164,
            22.510837795820542
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.93427260157976,
            22.350894895001556
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.29819472072039,
            22.359785442975795
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.58933241603289,
            23.091916304540117
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.35749037501726,
            22.52859783911822
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.72450239894305,
            22.735207074656298
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.90989668605242,
            22.86117435752598
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.58065016505633,
            22.857061688535012
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.16660292384539,
            22.921584599060903
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.58614332911883,
            23.104232511384
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.09450514552508,
            23.32320853826476
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.00558455226336,
            22.59010603883711
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.21775801417742,
            22.592641870309862
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.34616072413836,
            22.723807313124873
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.15218336818133,
            23.73965121988255
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.40521223781023,
            23.75190726011993
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.6339643740407,
            23.5581901888498
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.77404005763445,
            23.542453827319857
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.39878828761492,
            23.435396673204494
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.6995390200368,
            23.407673613386628
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.36514265773211,
            23.583364447636065
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.72621901271258,
            23.516327309700007
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.78664381740008,
            23.376793370451214
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.61429579493914,
            23.398536332377017
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.96208174464617,
            23.503734365005474
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.06130202052508,
            23.148119546851483
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.25699599025164,
            23.06601700859548
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.01495344874773,
            23.810426305912273
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.43518049952898,
            22.831833870764104
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.34890730616961,
            23.145361834088508
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 0
      },
      "color": "#ffc82d",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": true
    }) || 
    /* color: #ffc82d */
    /* shown: false */
    /* locked: true */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([89.54264052150164, 22.510837795820542]),
            {
              "landcover": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([88.93427260157976, 22.350894895001556]),
            {
              "landcover": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([89.29819472072039, 22.359785442975795]),
            {
              "landcover": 0,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([89.58933241603289, 23.091916304540117]),
            {
              "landcover": 0,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([88.35749037501726, 22.52859783911822]),
            {
              "landcover": 0,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([88.72450239894305, 22.735207074656298]),
            {
              "landcover": 0,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([88.90989668605242, 22.86117435752598]),
            {
              "landcover": 0,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([88.58065016505633, 22.857061688535012]),
            {
              "landcover": 0,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([88.16660292384539, 22.921584599060903]),
            {
              "landcover": 0,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([88.58614332911883, 23.104232511384]),
            {
              "landcover": 0,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([88.09450514552508, 23.32320853826476]),
            {
              "landcover": 0,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([88.00558455226336, 22.59010603883711]),
            {
              "landcover": 0,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([88.21775801417742, 22.592641870309862]),
            {
              "landcover": 0,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([88.34616072413836, 22.723807313124873]),
            {
              "landcover": 0,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([88.15218336818133, 23.73965121988255]),
            {
              "landcover": 0,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([88.40521223781023, 23.75190726011993]),
            {
              "landcover": 0,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([89.6339643740407, 23.5581901888498]),
            {
              "landcover": 0,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([89.77404005763445, 23.542453827319857]),
            {
              "landcover": 0,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([89.39878828761492, 23.435396673204494]),
            {
              "landcover": 0,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([89.6995390200368, 23.407673613386628]),
            {
              "landcover": 0,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([89.36514265773211, 23.583364447636065]),
            {
              "landcover": 0,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([88.72621901271258, 23.516327309700007]),
            {
              "landcover": 0,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([88.78664381740008, 23.376793370451214]),
            {
              "landcover": 0,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([88.61429579493914, 23.398536332377017]),
            {
              "landcover": 0,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([88.96208174464617, 23.503734365005474]),
            {
              "landcover": 0,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([89.06130202052508, 23.148119546851483]),
            {
              "landcover": 0,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([89.25699599025164, 23.06601700859548]),
            {
              "landcover": 0,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([89.01495344874773, 23.810426305912273]),
            {
              "landcover": 0,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([89.43518049952898, 22.831833870764104]),
            {
              "landcover": 0,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([88.34890730616961, 23.145361834088508]),
            {
              "landcover": 0,
              "system:index": "29"
            })]),
    water_kolkata_2008 = ui.import && ui.import("water_kolkata_2008", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            89.47294600245867,
            22.25092119033936
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.57594282863055,
            22.529633043222983
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.19004805323992,
            22.39193412427732
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.92637617823992,
            22.39828270144792
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.94285567042742,
            22.594944482477793
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.15436362810979,
            22.47824991364377
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.36104392596135,
            22.74383997919442
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            87.98819541521917,
            22.72658272676496
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            87.80564867814608,
            22.632910462518755
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            87.8913131952043,
            22.523311354231087
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.62009816026415,
            23.311833878795575
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.48929219102587,
            23.44387696259999
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.64653401231493,
            23.476001171769127
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.00030140733446,
            23.132625674570146
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.20629505967821,
            23.615430173178037
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.74462513780321,
            23.553130294212703
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.83116452007977,
            22.97547675733482
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.02445523052899,
            23.237889571107196
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.04127804547039,
            23.783473364837665
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.31284634381024,
            23.730996991699833
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.35737911968914,
            23.237258628481783
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.4538528135368,
            23.79568601077951
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.81801026789277,
            23.75982341335444
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.14441102472871,
            22.95515977980097
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.56356984946979,
            22.850478621190838
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.50057012412799,
            22.936822698741633
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.66303426597369,
            22.352067202610815
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.94318563316119,
            22.29108868552232
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.58700513441899,
            23.234252591352035
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.01186704237797,
            23.664891137803888
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 1
      },
      "color": "#00ffff",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": true
    }) || 
    /* color: #00ffff */
    /* shown: false */
    /* locked: true */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([89.47294600245867, 22.25092119033936]),
            {
              "landcover": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([89.57594282863055, 22.529633043222983]),
            {
              "landcover": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([89.19004805323992, 22.39193412427732]),
            {
              "landcover": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([88.92637617823992, 22.39828270144792]),
            {
              "landcover": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([88.94285567042742, 22.594944482477793]),
            {
              "landcover": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([88.15436362810979, 22.47824991364377]),
            {
              "landcover": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([88.36104392596135, 22.74383997919442]),
            {
              "landcover": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([87.98819541521917, 22.72658272676496]),
            {
              "landcover": 1,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([87.80564867814608, 22.632910462518755]),
            {
              "landcover": 1,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([87.8913131952043, 22.523311354231087]),
            {
              "landcover": 1,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([89.62009816026415, 23.311833878795575]),
            {
              "landcover": 1,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([89.48929219102587, 23.44387696259999]),
            {
              "landcover": 1,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([89.64653401231493, 23.476001171769127]),
            {
              "landcover": 1,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([88.00030140733446, 23.132625674570146]),
            {
              "landcover": 1,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([88.20629505967821, 23.615430173178037]),
            {
              "landcover": 1,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([88.74462513780321, 23.553130294212703]),
            {
              "landcover": 1,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([88.83116452007977, 22.97547675733482]),
            {
              "landcover": 1,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([89.02445523052899, 23.237889571107196]),
            {
              "landcover": 1,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([89.04127804547039, 23.783473364837665]),
            {
              "landcover": 1,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([89.31284634381024, 23.730996991699833]),
            {
              "landcover": 1,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([88.35737911968914, 23.237258628481783]),
            {
              "landcover": 1,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([88.4538528135368, 23.79568601077951]),
            {
              "landcover": 1,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([89.81801026789277, 23.75982341335444]),
            {
              "landcover": 1,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([89.14441102472871, 22.95515977980097]),
            {
              "landcover": 1,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([89.56356984946979, 22.850478621190838]),
            {
              "landcover": 1,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([89.50057012412799, 22.936822698741633]),
            {
              "landcover": 1,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([88.66303426597369, 22.352067202610815]),
            {
              "landcover": 1,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([88.94318563316119, 22.29108868552232]),
            {
              "landcover": 1,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([88.58700513441899, 23.234252591352035]),
            {
              "landcover": 1,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([89.01186704237797, 23.664891137803888]),
            {
              "landcover": 1,
              "system:index": "29"
            })]),
    vegetation_kolkata_2008 = ui.import && ui.import("vegetation_kolkata_2008", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            89.58246945937016,
            22.33602893793076
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.67173337538578,
            22.658298861673437
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.07847165663578,
            22.417301491260446
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.28515195448735,
            22.66653605569114
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            87.92296664320082,
            22.82611301707541
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            87.77739779554457,
            22.487741558838163
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.4983755787477,
            22.67794058480789
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.66223971448989,
            23.60922123983829
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.31960360609145,
            23.57146548033149
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.9052130421266,
            23.192050585875354
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.08442751966567,
            23.06038955783812
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.15858523450942,
            23.200570943028172
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.38782565198989,
            23.836469155351075
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.92409579359145,
            23.86535745263614
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.58283297620864,
            23.55541599382943
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.82521884046645,
            23.712050470722986
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.25392977796645,
            23.226444253637798
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            87.96416537366957,
            23.050912563369256
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.47296969495864,
            23.049017084419958
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.18663851820082,
            22.947253952906472
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.71672885023207,
            23.3008809127239
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.09977786146254,
            23.55667484793958
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.10115115247817,
            23.385045075797805
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.32122103773207,
            23.46348710657583
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.6529126303246,
            23.06941825285521
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.7627759115746,
            23.294758126608148
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.29232455659412,
            22.61538866513198
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.50106479096912,
            22.676541314678218
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.29163791108631,
            22.458104881281994
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.05827762055897,
            23.51877266015667
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 2
      },
      "color": "#bf04c2",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": true
    }) || 
    /* color: #bf04c2 */
    /* shown: false */
    /* locked: true */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([89.58246945937016, 22.33602893793076]),
            {
              "landcover": 2,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([89.67173337538578, 22.658298861673437]),
            {
              "landcover": 2,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([89.07847165663578, 22.417301491260446]),
            {
              "landcover": 2,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([89.28515195448735, 22.66653605569114]),
            {
              "landcover": 2,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([87.92296664320082, 22.82611301707541]),
            {
              "landcover": 2,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([87.77739779554457, 22.487741558838163]),
            {
              "landcover": 2,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([88.4983755787477, 22.67794058480789]),
            {
              "landcover": 2,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([89.66223971448989, 23.60922123983829]),
            {
              "landcover": 2,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([89.31960360609145, 23.57146548033149]),
            {
              "landcover": 2,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([88.9052130421266, 23.192050585875354]),
            {
              "landcover": 2,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([89.08442751966567, 23.06038955783812]),
            {
              "landcover": 2,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([89.15858523450942, 23.200570943028172]),
            {
              "landcover": 2,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([88.38782565198989, 23.836469155351075]),
            {
              "landcover": 2,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([88.92409579359145, 23.86535745263614]),
            {
              "landcover": 2,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([88.58283297620864, 23.55541599382943]),
            {
              "landcover": 2,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([88.82521884046645, 23.712050470722986]),
            {
              "landcover": 2,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([88.25392977796645, 23.226444253637798]),
            {
              "landcover": 2,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([87.96416537366957, 23.050912563369256]),
            {
              "landcover": 2,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([88.47296969495864, 23.049017084419958]),
            {
              "landcover": 2,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([88.18663851820082, 22.947253952906472]),
            {
              "landcover": 2,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([88.71672885023207, 23.3008809127239]),
            {
              "landcover": 2,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([88.09977786146254, 23.55667484793958]),
            {
              "landcover": 2,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([88.10115115247817, 23.385045075797805]),
            {
              "landcover": 2,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([88.32122103773207, 23.46348710657583]),
            {
              "landcover": 2,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([89.6529126303246, 23.06941825285521]),
            {
              "landcover": 2,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([89.7627759115746, 23.294758126608148]),
            {
              "landcover": 2,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([88.29232455659412, 22.61538866513198]),
            {
              "landcover": 2,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([88.50106479096912, 22.676541314678218]),
            {
              "landcover": 2,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([88.29163791108631, 22.458104881281994]),
            {
              "landcover": 2,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([89.05827762055897, 23.51877266015667]),
            {
              "landcover": 2,
              "system:index": "29"
            })]),
    urban_kolkata_2013 = ui.import && ui.import("urban_kolkata_2013", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            88.94937880275164,
            22.397246515635338
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.47397597072039,
            22.495613085384235
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.33115370509539,
            22.324219848236517
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.36161024806414,
            22.584400247297605
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.68227370021258,
            22.3540701558349
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            87.91529066798601,
            22.542550557178124
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.01210768458758,
            22.80105374401695
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.18170912501726,
            22.566647384569908
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.08420546290789,
            23.033161949170236
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.24900038478289,
            23.23332666808882
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.59482558009539,
            23.272440620354907
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.21030409572039,
            23.159483631786706
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.2109907412282,
            23.60507336840715
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.6724165224782,
            23.601298162012622
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.48397913401803,
            23.670941959783757
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.97493067210397,
            23.34036680944802
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.81082239573678,
            23.86135205439838
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.45352259104928,
            23.64892946444371
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.19352808421334,
            23.575947298798418
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.87399378245553,
            23.514258316547913
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.00058069651803,
            23.309470893896464
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.82016752565472,
            22.96670333642158
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.7224922021684,
            22.902043773317406
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.60071180666058,
            22.900778730838958
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.43248365724652,
            22.911056859403
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.5435485681352,
            22.98282389150034
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.52397917116254,
            22.871995827845335
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.24088806882938,
            23.927601406435507
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.52550263181766,
            23.798872362742237
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.5637831188782,
            23.175180857437436
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 0
      },
      "color": "#ff0000",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": true
    }) || 
    /* color: #ff0000 */
    /* shown: false */
    /* locked: true */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([88.94937880275164, 22.397246515635338]),
            {
              "landcover": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([89.47397597072039, 22.495613085384235]),
            {
              "landcover": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([89.33115370509539, 22.324219848236517]),
            {
              "landcover": 0,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([88.36161024806414, 22.584400247297605]),
            {
              "landcover": 0,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([88.68227370021258, 22.3540701558349]),
            {
              "landcover": 0,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([87.91529066798601, 22.542550557178124]),
            {
              "landcover": 0,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([88.01210768458758, 22.80105374401695]),
            {
              "landcover": 0,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([88.18170912501726, 22.566647384569908]),
            {
              "landcover": 0,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([88.08420546290789, 23.033161949170236]),
            {
              "landcover": 0,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([88.24900038478289, 23.23332666808882]),
            {
              "landcover": 0,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([89.59482558009539, 23.272440620354907]),
            {
              "landcover": 0,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([89.21030409572039, 23.159483631786706]),
            {
              "landcover": 0,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([89.2109907412282, 23.60507336840715]),
            {
              "landcover": 0,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([89.6724165224782, 23.601298162012622]),
            {
              "landcover": 0,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([88.48397913401803, 23.670941959783757]),
            {
              "landcover": 0,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([88.97493067210397, 23.34036680944802]),
            {
              "landcover": 0,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([88.81082239573678, 23.86135205439838]),
            {
              "landcover": 0,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([89.45352259104928, 23.64892946444371]),
            {
              "landcover": 0,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([88.19352808421334, 23.575947298798418]),
            {
              "landcover": 0,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([88.87399378245553, 23.514258316547913]),
            {
              "landcover": 0,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([88.00058069651803, 23.309470893896464]),
            {
              "landcover": 0,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([88.82016752565472, 22.96670333642158]),
            {
              "landcover": 0,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([88.7224922021684, 22.902043773317406]),
            {
              "landcover": 0,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([89.60071180666058, 22.900778730838958]),
            {
              "landcover": 0,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([89.43248365724652, 22.911056859403]),
            {
              "landcover": 0,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([89.5435485681352, 22.98282389150034]),
            {
              "landcover": 0,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([89.52397917116254, 22.871995827845335]),
            {
              "landcover": 0,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([88.24088806882938, 23.927601406435507]),
            {
              "landcover": 0,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([88.52550263181766, 23.798872362742237]),
            {
              "landcover": 0,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([88.5637831188782, 23.175180857437436]),
            {
              "landcover": 0,
              "system:index": "29"
            })]),
    water_kolkata_2013 = ui.import && ui.import("water_kolkata_2013", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            89.58439583555301,
            22.49322832267902
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.42921395078739,
            22.349777780349882
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.48345894590457,
            22.174389978648566
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.2211603619202,
            22.365018494549858
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.94238228574832,
            22.30341036530702
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.18751473203739,
            22.505281564454645
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.96984810606082,
            22.524945124613648
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.17750807405919,
            22.489739030384218
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.36358900667638,
            22.626706829317186
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            87.92121763826817,
            22.916677467675974
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.66880983679005,
            23.238210820605193
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.48169893591114,
            23.303181764358172
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.22616762487598,
            23.835306237602847
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.22925752966114,
            23.659009775051842
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.48777956335255,
            23.779080716144314
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.37928957311817,
            23.256506814678797
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.49430269567677,
            23.081014531845703
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.82509416906544,
            23.332187672094555
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.98319429723927,
            23.265338465101127
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.14489931432911,
            22.944976650019697
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.57370943395802,
            23.001241234165935
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.39037508337208,
            23.04200260336525
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.48410219518848,
            23.63227739608613
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.41475099889942,
            23.57187358618265
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.83174560847837,
            22.97795135387028
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.94263885799009,
            23.01666583175357
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.17715786281187,
            22.855176922774543
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.01344917598325,
            23.660011529943127
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.8621430236395,
            23.673532784445086
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.944784625202,
            23.443321044640452
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 1
      },
      "color": "#00ff00",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": true
    }) || 
    /* color: #00ff00 */
    /* shown: false */
    /* locked: true */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([89.58439583555301, 22.49322832267902]),
            {
              "landcover": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([89.42921395078739, 22.349777780349882]),
            {
              "landcover": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([89.48345894590457, 22.174389978648566]),
            {
              "landcover": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([89.2211603619202, 22.365018494549858]),
            {
              "landcover": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([88.94238228574832, 22.30341036530702]),
            {
              "landcover": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([89.18751473203739, 22.505281564454645]),
            {
              "landcover": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([88.96984810606082, 22.524945124613648]),
            {
              "landcover": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([88.17750807405919, 22.489739030384218]),
            {
              "landcover": 1,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([88.36358900667638, 22.626706829317186]),
            {
              "landcover": 1,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([87.92121763826817, 22.916677467675974]),
            {
              "landcover": 1,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([89.66880983679005, 23.238210820605193]),
            {
              "landcover": 1,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([89.48169893591114, 23.303181764358172]),
            {
              "landcover": 1,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([88.22616762487598, 23.835306237602847]),
            {
              "landcover": 1,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([88.22925752966114, 23.659009775051842]),
            {
              "landcover": 1,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([88.48777956335255, 23.779080716144314]),
            {
              "landcover": 1,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([88.37928957311817, 23.256506814678797]),
            {
              "landcover": 1,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([88.49430269567677, 23.081014531845703]),
            {
              "landcover": 1,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([88.82509416906544, 23.332187672094555]),
            {
              "landcover": 1,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([88.98319429723927, 23.265338465101127]),
            {
              "landcover": 1,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([89.14489931432911, 22.944976650019697]),
            {
              "landcover": 1,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([89.57370943395802, 23.001241234165935]),
            {
              "landcover": 1,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([89.39037508337208, 23.04200260336525]),
            {
              "landcover": 1,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([89.48410219518848, 23.63227739608613]),
            {
              "landcover": 1,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([89.41475099889942, 23.57187358618265]),
            {
              "landcover": 1,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([88.83174560847837, 22.97795135387028]),
            {
              "landcover": 1,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([88.94263885799009, 23.01666583175357]),
            {
              "landcover": 1,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([88.17715786281187, 22.855176922774543]),
            {
              "landcover": 1,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([89.01344917598325, 23.660011529943127]),
            {
              "landcover": 1,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([89.8621430236395, 23.673532784445086]),
            {
              "landcover": 1,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([88.944784625202, 23.443321044640452]),
            {
              "landcover": 1,
              "system:index": "29"
            })]),
    vegetation_kolkata_2013 = ui.import && ui.import("vegetation_kolkata_2013", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            89.34338234248716,
            22.35920038271458
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.06254432979185,
            22.418879608735367
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.5023768856025,
            22.521670853059035
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.10456499595406,
            22.612976709096287
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.28402361411813,
            22.730190457233004
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.02790483970406,
            22.585718099828053
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.474666924665,
            23.11533424049536
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.44469866294625,
            23.350053255885566
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.10549578208688,
            23.284474478198888
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.13409075279,
            23.497486983163455
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.79420122642281,
            23.27185946760656
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.24807390708688,
            23.219494412673217
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.61954912681344,
            23.639723848643744
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.71499285239938,
            23.385981735266768
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.32041582603219,
            23.827038993662963
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.96311602134469,
            23.829551457776358
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.71867022056344,
            23.532116325911588
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.88483843345406,
            23.0812278746048
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.38883623618844,
            23.13743559140111
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.72553667564156,
            22.980753357343886
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.2716639949775,
            23.12922694325605
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.12472185630563,
            23.5447065555223
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.30369219321969,
            22.88399973227249
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.62092241782906,
            22.765018450584858
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.57996782798531,
            23.674944541335048
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            87.9201014949775,
            23.02404873154266
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.26823076743844,
            22.880520374425135
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.89307817954781,
            22.7811629618278
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.13992723960641,
            22.8760919718387
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.37956652183297,
            23.695380770546496
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 2
      },
      "color": "#0000ff",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": true
    }) || 
    /* color: #0000ff */
    /* shown: false */
    /* locked: true */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([89.34338234248716, 22.35920038271458]),
            {
              "landcover": 2,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([89.06254432979185, 22.418879608735367]),
            {
              "landcover": 2,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([88.5023768856025, 22.521670853059035]),
            {
              "landcover": 2,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([89.10456499595406, 22.612976709096287]),
            {
              "landcover": 2,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([88.28402361411813, 22.730190457233004]),
            {
              "landcover": 2,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([88.02790483970406, 22.585718099828053]),
            {
              "landcover": 2,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([89.474666924665, 23.11533424049536]),
            {
              "landcover": 2,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([88.44469866294625, 23.350053255885566]),
            {
              "landcover": 2,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([88.10549578208688, 23.284474478198888]),
            {
              "landcover": 2,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([89.13409075279, 23.497486983163455]),
            {
              "landcover": 2,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([88.79420122642281, 23.27185946760656]),
            {
              "landcover": 2,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([89.24807390708688, 23.219494412673217]),
            {
              "landcover": 2,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([89.61954912681344, 23.639723848643744]),
            {
              "landcover": 2,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([89.71499285239938, 23.385981735266768]),
            {
              "landcover": 2,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([88.32041582603219, 23.827038993662963]),
            {
              "landcover": 2,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([88.96311602134469, 23.829551457776358]),
            {
              "landcover": 2,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([88.71867022056344, 23.532116325911588]),
            {
              "landcover": 2,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([88.88483843345406, 23.0812278746048]),
            {
              "landcover": 2,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([89.38883623618844, 23.13743559140111]),
            {
              "landcover": 2,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([88.72553667564156, 22.980753357343886]),
            {
              "landcover": 2,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([88.2716639949775, 23.12922694325605]),
            {
              "landcover": 2,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([88.12472185630563, 23.5447065555223]),
            {
              "landcover": 2,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([89.30369219321969, 22.88399973227249]),
            {
              "landcover": 2,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([89.62092241782906, 22.765018450584858]),
            {
              "landcover": 2,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([88.57996782798531, 23.674944541335048]),
            {
              "landcover": 2,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([87.9201014949775, 23.02404873154266]),
            {
              "landcover": 2,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([88.26823076743844, 22.880520374425135]),
            {
              "landcover": 2,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([88.89307817954781, 22.7811629618278]),
            {
              "landcover": 2,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([89.13992723960641, 22.8760919718387]),
            {
              "landcover": 2,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([89.37956652183297, 23.695380770546496]),
            {
              "landcover": 2,
              "system:index": "29"
            })]),
    urban_kolkata_2018 = ui.import && ui.import("urban_kolkata_2018", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            88.97385048245121,
            22.287374494681604
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.49020790432621,
            22.71747370177016
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.36685585354496,
            22.52225522854225
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.02603554104496,
            22.88837810879992
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.70880531643559,
            22.58313226152341
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            87.92328285549809,
            22.659824375292764
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.08446829415773,
            23.0361997873513
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.6543840656421,
            22.835108993013087
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.7914690265796,
            23.45322928249207
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.17211477853273,
            23.545794802919513
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.50513784982179,
            23.287457001173557
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.57885305978273,
            23.368793257067438
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.11880056954836,
            23.29817858024027
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.56237356759523,
            23.878364502814485
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.07117788888429,
            23.164412492383693
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.65781729318117,
            23.03556789498273
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.31287710763429,
            22.916719554603233
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.40832083322023,
            23.076634732522557
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.39679527242978,
            23.753618207569428
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.37232017477353,
            23.58885327575558
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.0349330898126,
            23.672519446769975
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.92438316305478,
            23.36086035462182
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.36820030172666,
            23.117319518843626
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.14092063864072,
            23.80074544937499
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.1615200038751,
            22.80499236356183
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.57831382711728,
            23.02887905101771
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.39145303903182,
            22.674346171711388
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.69607950387557,
            22.996455388704717
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.0666697138365,
            22.410526383272757
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.40482127020249,
            23.428884619124222
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 0
      },
      "color": "#999900",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": true
    }) || 
    /* color: #999900 */
    /* shown: false */
    /* locked: true */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([88.97385048245121, 22.287374494681604]),
            {
              "landcover": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([89.49020790432621, 22.71747370177016]),
            {
              "landcover": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([88.36685585354496, 22.52225522854225]),
            {
              "landcover": 0,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([89.02603554104496, 22.88837810879992]),
            {
              "landcover": 0,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([88.70880531643559, 22.58313226152341]),
            {
              "landcover": 0,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([87.92328285549809, 22.659824375292764]),
            {
              "landcover": 0,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([88.08446829415773, 23.0361997873513]),
            {
              "landcover": 0,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([88.6543840656421, 22.835108993013087]),
            {
              "landcover": 0,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([89.7914690265796, 23.45322928249207]),
            {
              "landcover": 0,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([89.17211477853273, 23.545794802919513]),
            {
              "landcover": 0,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([89.50513784982179, 23.287457001173557]),
            {
              "landcover": 0,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([88.57885305978273, 23.368793257067438]),
            {
              "landcover": 0,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([88.11880056954836, 23.29817858024027]),
            {
              "landcover": 0,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([88.56237356759523, 23.878364502814485]),
            {
              "landcover": 0,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([89.07117788888429, 23.164412492383693]),
            {
              "landcover": 0,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([88.65781729318117, 23.03556789498273]),
            {
              "landcover": 0,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([89.31287710763429, 22.916719554603233]),
            {
              "landcover": 0,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([89.40832083322023, 23.076634732522557]),
            {
              "landcover": 0,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([89.39679527242978, 23.753618207569428]),
            {
              "landcover": 0,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([88.37232017477353, 23.58885327575558]),
            {
              "landcover": 0,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([89.0349330898126, 23.672519446769975]),
            {
              "landcover": 0,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([88.92438316305478, 23.36086035462182]),
            {
              "landcover": 0,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([88.36820030172666, 23.117319518843626]),
            {
              "landcover": 0,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([88.14092063864072, 23.80074544937499]),
            {
              "landcover": 0,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([88.1615200038751, 22.80499236356183]),
            {
              "landcover": 0,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([88.57831382711728, 23.02887905101771]),
            {
              "landcover": 0,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([88.39145303903182, 22.674346171711388]),
            {
              "landcover": 0,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([89.69607950387557, 22.996455388704717]),
            {
              "landcover": 0,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([88.0666697138365, 22.410526383272757]),
            {
              "landcover": 0,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([89.40482127020249, 23.428884619124222]),
            {
              "landcover": 0,
              "system:index": "29"
            })]),
    water_kolkata_2018 = ui.import && ui.import("water_kolkata_2018", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            89.47526953873061,
            22.194300994713018
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.94519951414533,
            22.27311441116773
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.5370879418797,
            22.747591609036657
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.85456230711408,
            22.684253316143316
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.21573784422345,
            22.362043956857022
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.13303061636331,
            22.43193871674901
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            87.89133139761331,
            22.496027533521794
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.35413046987894,
            22.75525143672634
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            87.93665000112894,
            22.941285354738906
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            87.9672057262266,
            22.812860549780204
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.14463111074808,
            22.96578612267181
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.83531704026632,
            23.745960135689096
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.50092084389473,
            23.494102525706875
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.04224164467598,
            23.78282763485046
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.23310017535658,
            23.638032308978058
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.33884358355971,
            23.349618823935298
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.82464528033705,
            23.332281371892577
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.00935292193861,
            23.225685206549752
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.71366620013686,
            23.085372180915417
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.56586575458022,
            23.797787741247692
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.21155667254897,
            24.020315851267796
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.63789105365248,
            23.188924467725247
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.46965991714576,
            23.824414182305112
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.1701059293349,
            23.480922262390415
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.43463611121966,
            23.008017611776836
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.75661658759905,
            22.51600740491232
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.28533362861468,
            22.629501176518943
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.3193225812514,
            23.709257485118304
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.48710822578265,
            23.068638682286366
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.72846412177874,
            23.561116877246427
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 1
      },
      "color": "#009999",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": true
    }) || 
    /* color: #009999 */
    /* shown: false */
    /* locked: true */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([89.47526953873061, 22.194300994713018]),
            {
              "landcover": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([88.94519951414533, 22.27311441116773]),
            {
              "landcover": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([89.5370879418797, 22.747591609036657]),
            {
              "landcover": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([88.85456230711408, 22.684253316143316]),
            {
              "landcover": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([89.21573784422345, 22.362043956857022]),
            {
              "landcover": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([88.13303061636331, 22.43193871674901]),
            {
              "landcover": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([87.89133139761331, 22.496027533521794]),
            {
              "landcover": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([88.35413046987894, 22.75525143672634]),
            {
              "landcover": 1,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([87.93665000112894, 22.941285354738906]),
            {
              "landcover": 1,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([87.9672057262266, 22.812860549780204]),
            {
              "landcover": 1,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([89.14463111074808, 22.96578612267181]),
            {
              "landcover": 1,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([89.83531704026632, 23.745960135689096]),
            {
              "landcover": 1,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([89.50092084389473, 23.494102525706875]),
            {
              "landcover": 1,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([89.04224164467598, 23.78282763485046]),
            {
              "landcover": 1,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([88.23310017535658, 23.638032308978058]),
            {
              "landcover": 1,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([88.33884358355971, 23.349618823935298]),
            {
              "landcover": 1,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([88.82464528033705, 23.332281371892577]),
            {
              "landcover": 1,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([89.00935292193861, 23.225685206549752]),
            {
              "landcover": 1,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([88.71366620013686, 23.085372180915417]),
            {
              "landcover": 1,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([88.56586575458022, 23.797787741247692]),
            {
              "landcover": 1,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([88.21155667254897, 24.020315851267796]),
            {
              "landcover": 1,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([89.63789105365248, 23.188924467725247]),
            {
              "landcover": 1,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([89.46965991714576, 23.824414182305112]),
            {
              "landcover": 1,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([89.1701059293349, 23.480922262390415]),
            {
              "landcover": 1,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([89.43463611121966, 23.008017611776836]),
            {
              "landcover": 1,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([88.75661658759905, 22.51600740491232]),
            {
              "landcover": 1,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([89.28533362861468, 22.629501176518943]),
            {
              "landcover": 1,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([89.3193225812514, 23.709257485118304]),
            {
              "landcover": 1,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([88.48710822578265, 23.068638682286366]),
            {
              "landcover": 1,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([88.72846412177874, 23.561116877246427]),
            {
              "landcover": 1,
              "system:index": "29"
            })]),
    vegetation_kolkata_2018 = ui.import && ui.import("vegetation_kolkata_2018", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            89.26781500797753,
            22.19581802802899
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.5246204278994,
            22.138587635681247
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.10302008610253,
            22.69336705992489
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.51662482243066,
            22.875689681663786
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.57131232243066,
            23.02238297561717
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.78441657047753,
            23.22950473573431
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.0384715019268,
            22.59024569728393
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            87.96431378708304,
            23.067419674291436
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.89265851364554,
            23.078790592602015
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.33073834762992,
            23.434590451603245
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.1758006034893,
            23.50261371982692
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.73884991989554,
            23.64232900751741
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.66856793747367,
            23.607099536115076
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.81438092575492,
            23.996609759309628
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.3570750175518,
            22.350399734612775
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.2321899234447,
            23.595760208946242
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.97366788975329,
            23.634767079883563
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.52048185459704,
            23.914137406749735
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.58159330479235,
            23.774398850898688
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.17884105771796,
            23.930117514168614
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.73468059629218,
            23.874247075259497
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.93174785703437,
            23.871735477510676
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.25653118222968,
            22.832857598506685
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.20047039121405,
            22.949250365114263
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.02264879522852,
            22.41898826247768
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.11877916632227,
            22.623860372008668
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.62370775518946,
            22.61308521036193
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.46425501694941,
            23.390224065307894
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.71282069077753,
            23.536353962588112
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            87.8373476683166,
            22.541161746621288
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 2
      },
      "color": "#ff00ff",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": true
    }) || 
    /* color: #ff00ff */
    /* shown: false */
    /* locked: true */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([89.26781500797753, 22.19581802802899]),
            {
              "landcover": 2,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([89.5246204278994, 22.138587635681247]),
            {
              "landcover": 2,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([89.10302008610253, 22.69336705992489]),
            {
              "landcover": 2,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([88.51662482243066, 22.875689681663786]),
            {
              "landcover": 2,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([89.57131232243066, 23.02238297561717]),
            {
              "landcover": 2,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([88.78441657047753, 23.22950473573431]),
            {
              "landcover": 2,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([88.0384715019268, 22.59024569728393]),
            {
              "landcover": 2,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([87.96431378708304, 23.067419674291436]),
            {
              "landcover": 2,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([88.89265851364554, 23.078790592602015]),
            {
              "landcover": 2,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([89.33073834762992, 23.434590451603245]),
            {
              "landcover": 2,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([88.1758006034893, 23.50261371982692]),
            {
              "landcover": 2,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([88.73884991989554, 23.64232900751741]),
            {
              "landcover": 2,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([89.66856793747367, 23.607099536115076]),
            {
              "landcover": 2,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([88.81438092575492, 23.996609759309628]),
            {
              "landcover": 2,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([88.3570750175518, 22.350399734612775]),
            {
              "landcover": 2,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([89.2321899234447, 23.595760208946242]),
            {
              "landcover": 2,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([88.97366788975329, 23.634767079883563]),
            {
              "landcover": 2,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([88.52048185459704, 23.914137406749735]),
            {
              "landcover": 2,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([88.58159330479235, 23.774398850898688]),
            {
              "landcover": 2,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([88.17884105771796, 23.930117514168614]),
            {
              "landcover": 2,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([88.73468059629218, 23.874247075259497]),
            {
              "landcover": 2,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([88.93174785703437, 23.871735477510676]),
            {
              "landcover": 2,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([89.25653118222968, 22.832857598506685]),
            {
              "landcover": 2,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([88.20047039121405, 22.949250365114263]),
            {
              "landcover": 2,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([89.02264879522852, 22.41898826247768]),
            {
              "landcover": 2,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([89.11877916632227, 22.623860372008668]),
            {
              "landcover": 2,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([88.62370775518946, 22.61308521036193]),
            {
              "landcover": 2,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([88.46425501694941, 23.390224065307894]),
            {
              "landcover": 2,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([88.71282069077753, 23.536353962588112]),
            {
              "landcover": 2,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([87.8373476683166, 22.541161746621288]),
            {
              "landcover": 2,
              "system:index": "29"
            })]),
    urban_hyderabad_1993 = ui.import && ui.import("urban_hyderabad_1993", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            78.51335042876845,
            17.414604141137023
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.51446622771864,
            17.413457585706247
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.51438039703017,
            17.412474818180872
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.50347989959364,
            17.412966202604423
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.50176328582411,
            17.414194657880717
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.49893087310438,
            17.4163239607895
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.49481100005751,
            17.417470498228095
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.49034780425673,
            17.420173022282924
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.49026197356825,
            17.413375688614384
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.4973859207118,
            17.402237342149764
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.4959267990077,
            17.400353584097463
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.50759977264052,
            17.392163106070928
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.50476735992079,
            17.39535743613548
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.50639814300185,
            17.39019733676526
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.49206441802626,
            17.386265734786438
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.47644323272353,
            17.378074626029385
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.46622938079481,
            17.386265734786438
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.46391195220595,
            17.391180224058623
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.46640104217177,
            17.37414276363644
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.4860562698329,
            17.367343719050773
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.51549619598036,
            17.410754962290486
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.52819913787489,
            17.386593371511434
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.50262159270888,
            17.396995532475653
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.49326604766493,
            17.39093450273037
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.47172254485731,
            17.374716165494014
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.46039289397841,
            17.394128854251328
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.46090787810927,
            17.389787798834433
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.4981583969081,
            17.401008806491117
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.51858610076552,
            17.39462028799536
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.47609990996962,
            17.37594487771399
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 0
      },
      "color": "#d63000",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": true
    }) || 
    /* color: #d63000 */
    /* shown: false */
    /* locked: true */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([78.51335042876845, 17.414604141137023]),
            {
              "landcover": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([78.51446622771864, 17.413457585706247]),
            {
              "landcover": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([78.51438039703017, 17.412474818180872]),
            {
              "landcover": 0,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([78.50347989959364, 17.412966202604423]),
            {
              "landcover": 0,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([78.50176328582411, 17.414194657880717]),
            {
              "landcover": 0,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([78.49893087310438, 17.4163239607895]),
            {
              "landcover": 0,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([78.49481100005751, 17.417470498228095]),
            {
              "landcover": 0,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([78.49034780425673, 17.420173022282924]),
            {
              "landcover": 0,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([78.49026197356825, 17.413375688614384]),
            {
              "landcover": 0,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([78.4973859207118, 17.402237342149764]),
            {
              "landcover": 0,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([78.4959267990077, 17.400353584097463]),
            {
              "landcover": 0,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([78.50759977264052, 17.392163106070928]),
            {
              "landcover": 0,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([78.50476735992079, 17.39535743613548]),
            {
              "landcover": 0,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([78.50639814300185, 17.39019733676526]),
            {
              "landcover": 0,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([78.49206441802626, 17.386265734786438]),
            {
              "landcover": 0,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([78.47644323272353, 17.378074626029385]),
            {
              "landcover": 0,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([78.46622938079481, 17.386265734786438]),
            {
              "landcover": 0,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([78.46391195220595, 17.391180224058623]),
            {
              "landcover": 0,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([78.46640104217177, 17.37414276363644]),
            {
              "landcover": 0,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([78.4860562698329, 17.367343719050773]),
            {
              "landcover": 0,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([78.51549619598036, 17.410754962290486]),
            {
              "landcover": 0,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([78.52819913787489, 17.386593371511434]),
            {
              "landcover": 0,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([78.50262159270888, 17.396995532475653]),
            {
              "landcover": 0,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([78.49326604766493, 17.39093450273037]),
            {
              "landcover": 0,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([78.47172254485731, 17.374716165494014]),
            {
              "landcover": 0,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([78.46039289397841, 17.394128854251328]),
            {
              "landcover": 0,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([78.46090787810927, 17.389787798834433]),
            {
              "landcover": 0,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([78.4981583969081, 17.401008806491117]),
            {
              "landcover": 0,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([78.51858610076552, 17.39462028799536]),
            {
              "landcover": 0,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([78.47609990996962, 17.37594487771399]),
            {
              "landcover": 0,
              "system:index": "29"
            })]),
    water_hyderabad_1993 = ui.import && ui.import("water_hyderabad_1993", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            78.46459859771376,
            17.42754333913031
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.46580022735243,
            17.425004708032503
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.47120756072646,
            17.421155748386727
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.46734517974501,
            17.42213846920155
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.46751684112196,
            17.419190290890352
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.46751684112196,
            17.41714291683722
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.47172254485731,
            17.414276554605404
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.47704404754286,
            17.420009234084763
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.476529063412,
            17.41329379148582
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.47403997344618,
            17.41878081791594
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.4802197830165,
            17.426151190964696
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.48013395232802,
            17.42377632547217
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.47996229095106,
            17.420418704304698
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.47352498931532,
            17.42459524809744
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.4695767776454,
            17.433603154487564
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.48279470367079,
            17.429836265902956
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.46966260833388,
            17.42778901123379
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.47034925384169,
            17.425741733601225
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.29439634246474,
            17.378343621657645
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.29705709380751,
            17.374084106512086
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.29705709380751,
            17.374084106512086
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.29903119964247,
            17.37629579020584
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.30358022613173,
            17.38006378237514
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.30263608855849,
            17.37351070267534
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.29834455413466,
            17.36761273044143
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.29585546416884,
            17.367285059748962
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.31070417327528,
            17.377524491825564
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.3051251785243,
            17.37211814302567
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.31387990874892,
            17.36703930634498
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.31156248016005,
            17.36310720704977
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 1
      },
      "color": "#98ff00",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": true
    }) || 
    /* color: #98ff00 */
    /* shown: false */
    /* locked: true */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([78.46459859771376, 17.42754333913031]),
            {
              "landcover": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([78.46580022735243, 17.425004708032503]),
            {
              "landcover": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([78.47120756072646, 17.421155748386727]),
            {
              "landcover": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([78.46734517974501, 17.42213846920155]),
            {
              "landcover": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([78.46751684112196, 17.419190290890352]),
            {
              "landcover": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([78.46751684112196, 17.41714291683722]),
            {
              "landcover": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([78.47172254485731, 17.414276554605404]),
            {
              "landcover": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([78.47704404754286, 17.420009234084763]),
            {
              "landcover": 1,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([78.476529063412, 17.41329379148582]),
            {
              "landcover": 1,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([78.47403997344618, 17.41878081791594]),
            {
              "landcover": 1,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([78.4802197830165, 17.426151190964696]),
            {
              "landcover": 1,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([78.48013395232802, 17.42377632547217]),
            {
              "landcover": 1,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([78.47996229095106, 17.420418704304698]),
            {
              "landcover": 1,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([78.47352498931532, 17.42459524809744]),
            {
              "landcover": 1,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([78.4695767776454, 17.433603154487564]),
            {
              "landcover": 1,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([78.48279470367079, 17.429836265902956]),
            {
              "landcover": 1,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([78.46966260833388, 17.42778901123379]),
            {
              "landcover": 1,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([78.47034925384169, 17.425741733601225]),
            {
              "landcover": 1,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([78.29439634246474, 17.378343621657645]),
            {
              "landcover": 1,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([78.29705709380751, 17.374084106512086]),
            {
              "landcover": 1,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([78.29705709380751, 17.374084106512086]),
            {
              "landcover": 1,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([78.29903119964247, 17.37629579020584]),
            {
              "landcover": 1,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([78.30358022613173, 17.38006378237514]),
            {
              "landcover": 1,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([78.30263608855849, 17.37351070267534]),
            {
              "landcover": 1,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([78.29834455413466, 17.36761273044143]),
            {
              "landcover": 1,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([78.29585546416884, 17.367285059748962]),
            {
              "landcover": 1,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([78.31070417327528, 17.377524491825564]),
            {
              "landcover": 1,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([78.3051251785243, 17.37211814302567]),
            {
              "landcover": 1,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([78.31387990874892, 17.36703930634498]),
            {
              "landcover": 1,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([78.31156248016005, 17.36310720704977]),
            {
              "landcover": 1,
              "system:index": "29"
            })]),
    vegetation_hyderabad_1993 = ui.import && ui.import("vegetation_hyderabad_1993", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            78.32623952788954,
            17.39816544569564
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.32778448028212,
            17.395134975317024
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.32941526336317,
            17.392677800307148
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.36125844878798,
            17.40660135545656
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.34331983489638,
            17.38964723900122
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.28710073394423,
            17.40037683832897
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.29791540069228,
            17.405700451623428
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.37722295684462,
            17.41167909399807
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.3791112319911,
            17.410123027827222
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.40065473479872,
            17.40463574136808
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.40314382476454,
            17.403079615223128
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.41310018462782,
            17.39382448608647
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.41361516875868,
            17.38481461847457
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.40159887237196,
            17.388500527036687
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.4314679519618,
            17.381374370167674
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.43284124297743,
            17.38112863567134
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.43215459746962,
            17.37989995824129
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.44846242828017,
            17.394561637434077
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.41541761321669,
            17.380637165689
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.44571584624892,
            17.423881469139932
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.3871793167079,
            17.41282566059098
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.37705129546767,
            17.37842553443927
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.42580312652235,
            17.434035844159617
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.47936147613173,
            17.436738122960115
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.47996229095106,
            17.435755480754775
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.43060964507704,
            17.439767903104347
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.45412725371962,
            17.444025887423773
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.46734517974501,
            17.44017732899357
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.47781652373915,
            17.461384332722606
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.47704404754286,
            17.45499792718185
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 2
      },
      "color": "#0b4a8b",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": true
    }) || 
    /* color: #0b4a8b */
    /* shown: false */
    /* locked: true */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([78.32623952788954, 17.39816544569564]),
            {
              "landcover": 2,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([78.32778448028212, 17.395134975317024]),
            {
              "landcover": 2,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([78.32941526336317, 17.392677800307148]),
            {
              "landcover": 2,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([78.36125844878798, 17.40660135545656]),
            {
              "landcover": 2,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([78.34331983489638, 17.38964723900122]),
            {
              "landcover": 2,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([78.28710073394423, 17.40037683832897]),
            {
              "landcover": 2,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([78.29791540069228, 17.405700451623428]),
            {
              "landcover": 2,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([78.37722295684462, 17.41167909399807]),
            {
              "landcover": 2,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([78.3791112319911, 17.410123027827222]),
            {
              "landcover": 2,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([78.40065473479872, 17.40463574136808]),
            {
              "landcover": 2,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([78.40314382476454, 17.403079615223128]),
            {
              "landcover": 2,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([78.41310018462782, 17.39382448608647]),
            {
              "landcover": 2,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([78.41361516875868, 17.38481461847457]),
            {
              "landcover": 2,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([78.40159887237196, 17.388500527036687]),
            {
              "landcover": 2,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([78.4314679519618, 17.381374370167674]),
            {
              "landcover": 2,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([78.43284124297743, 17.38112863567134]),
            {
              "landcover": 2,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([78.43215459746962, 17.37989995824129]),
            {
              "landcover": 2,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([78.44846242828017, 17.394561637434077]),
            {
              "landcover": 2,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([78.41541761321669, 17.380637165689]),
            {
              "landcover": 2,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([78.44571584624892, 17.423881469139932]),
            {
              "landcover": 2,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([78.3871793167079, 17.41282566059098]),
            {
              "landcover": 2,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([78.37705129546767, 17.37842553443927]),
            {
              "landcover": 2,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([78.42580312652235, 17.434035844159617]),
            {
              "landcover": 2,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([78.47936147613173, 17.436738122960115]),
            {
              "landcover": 2,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([78.47996229095106, 17.435755480754775]),
            {
              "landcover": 2,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([78.43060964507704, 17.439767903104347]),
            {
              "landcover": 2,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([78.45412725371962, 17.444025887423773]),
            {
              "landcover": 2,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([78.46734517974501, 17.44017732899357]),
            {
              "landcover": 2,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([78.47781652373915, 17.461384332722606]),
            {
              "landcover": 2,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([78.47704404754286, 17.45499792718185]),
            {
              "landcover": 2,
              "system:index": "29"
            })]),
    v_urban_ahmedabad_1988 = ui.import && ui.import("v_urban_ahmedabad_1988", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            72.41578896179176,
            22.721090757460516
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.59157021179176,
            22.719824033493587
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.56547768249489,
            23.062675530828173
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.67122109069801,
            22.889460346764633
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.08320839538551,
            23.183919987162838
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.16835243835426,
            22.88566483193151
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.28096230163551,
            22.91476106557391
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.26036293640114,
            23.15235646388637
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.92390663757301,
            22.541098800206107
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.70118935241676,
            22.503042213262713
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.67372353210426,
            22.87174703624943
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.77260048522926,
            22.576608818483564
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.29744179382301,
            22.404046099873096
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.29744179382301,
            22.317684212942975
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.60093910827614,
            22.35960181646276
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.67097695007301,
            22.324036174871914
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.90168984069801,
            22.245251430792646
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.00880653991676,
            22.249064617541386
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.00605995788551,
            22.77554878762652
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.89070351257301,
            23.086680521902224
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.05000527038551,
            23.20664111445971
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.90031654968239,
            23.48906888851349
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.66823036804176,
            23.400874801078817
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.57209999694801,
            23.611183204657642
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.78084023132301,
            23.696721375127634
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.12852699890114,
            23.42481901618586
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.74949867858864,
            23.687918558799694
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.41829140319801,
            23.75455368001553
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.04338295593239,
            23.6048914268263
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.81105263366676,
            23.801052336537143
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 0
      },
      "color": "#27d628",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": true
    }) || 
    /* color: #27d628 */
    /* shown: false */
    /* locked: true */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([72.41578896179176, 22.721090757460516]),
            {
              "landcover": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([72.59157021179176, 22.719824033493587]),
            {
              "landcover": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([72.56547768249489, 23.062675530828173]),
            {
              "landcover": 0,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([72.67122109069801, 22.889460346764633]),
            {
              "landcover": 0,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([73.08320839538551, 23.183919987162838]),
            {
              "landcover": 0,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([73.16835243835426, 22.88566483193151]),
            {
              "landcover": 0,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([73.28096230163551, 22.91476106557391]),
            {
              "landcover": 0,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([73.26036293640114, 23.15235646388637]),
            {
              "landcover": 0,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([72.92390663757301, 22.541098800206107]),
            {
              "landcover": 0,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([73.70118935241676, 22.503042213262713]),
            {
              "landcover": 0,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([73.67372353210426, 22.87174703624943]),
            {
              "landcover": 0,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([73.77260048522926, 22.576608818483564]),
            {
              "landcover": 0,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([73.29744179382301, 22.404046099873096]),
            {
              "landcover": 0,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([73.29744179382301, 22.317684212942975]),
            {
              "landcover": 0,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([73.60093910827614, 22.35960181646276]),
            {
              "landcover": 0,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([73.67097695007301, 22.324036174871914]),
            {
              "landcover": 0,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([73.90168984069801, 22.245251430792646]),
            {
              "landcover": 0,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([74.00880653991676, 22.249064617541386]),
            {
              "landcover": 0,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([74.00605995788551, 22.77554878762652]),
            {
              "landcover": 0,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([73.89070351257301, 23.086680521902224]),
            {
              "landcover": 0,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([74.05000527038551, 23.20664111445971]),
            {
              "landcover": 0,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([73.90031654968239, 23.48906888851349]),
            {
              "landcover": 0,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([73.66823036804176, 23.400874801078817]),
            {
              "landcover": 0,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([73.57209999694801, 23.611183204657642]),
            {
              "landcover": 0,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([73.78084023132301, 23.696721375127634]),
            {
              "landcover": 0,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([73.12852699890114, 23.42481901618586]),
            {
              "landcover": 0,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([72.74949867858864, 23.687918558799694]),
            {
              "landcover": 0,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([73.41829140319801, 23.75455368001553]),
            {
              "landcover": 0,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([73.04338295593239, 23.6048914268263]),
            {
              "landcover": 0,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([73.81105263366676, 23.801052336537143]),
            {
              "landcover": 0,
              "system:index": "29"
            })]),
    v_water_ahmedabad_1988 = ui.import && ui.import("v_water_ahmedabad_1988", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            72.82090981140114,
            23.518034085646025
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.68426735534645,
            23.262796206601777
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.44850380554176,
            23.327124640768705
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.35786659851051,
            23.48780938768648
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.97059853210426,
            23.278250481344923
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.72065956726051,
            23.361798627208636
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.89472420349098,
            23.17887032353617
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.7361090911863,
            23.124574411152587
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.88332207336403,
            22.33578654213734
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.6841948760984,
            22.251924439474788
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.31271965637184,
            22.782829320293125
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.7006743682859,
            22.558537898051497
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.83731682434059,
            23.332483939344698
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.00005180969215,
            23.422298776550413
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.93894035949684,
            23.35013656990204
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.19152672424293,
            23.697978871868138
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.39752037658668,
            23.682888111613206
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.86125023498512,
            24.01197171844074
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.12090141906715,
            23.622979474061207
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.018934561157,
            23.68147326343583
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.20398552551246,
            23.718411495731534
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.64770348205543,
            22.615912810246343
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.42694695129371,
            22.556952616603127
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.55878288879371,
            22.600699693009
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.88349373474098,
            22.888037041141082
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.93258888854957,
            22.973092839346062
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.52643807067848,
            22.974041115692252
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.43614418640114,
            22.997745861412582
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.7630317534018,
            23.023026336257985
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.34246137986665,
            23.08309046089757
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 1
      },
      "color": "#ff4819",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": true
    }) || 
    /* color: #ff4819 */
    /* shown: false */
    /* locked: true */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([72.82090981140114, 23.518034085646025]),
            {
              "landcover": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([72.68426735534645, 23.262796206601777]),
            {
              "landcover": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([73.44850380554176, 23.327124640768705]),
            {
              "landcover": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([73.35786659851051, 23.48780938768648]),
            {
              "landcover": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([72.97059853210426, 23.278250481344923]),
            {
              "landcover": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([72.72065956726051, 23.361798627208636]),
            {
              "landcover": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([72.89472420349098, 23.17887032353617]),
            {
              "landcover": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([72.7361090911863, 23.124574411152587]),
            {
              "landcover": 1,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([73.88332207336403, 22.33578654213734]),
            {
              "landcover": 1,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([73.6841948760984, 22.251924439474788]),
            {
              "landcover": 1,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([73.31271965637184, 22.782829320293125]),
            {
              "landcover": 1,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([73.7006743682859, 22.558537898051497]),
            {
              "landcover": 1,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([73.83731682434059, 23.332483939344698]),
            {
              "landcover": 1,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([74.00005180969215, 23.422298776550413]),
            {
              "landcover": 1,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([73.93894035949684, 23.35013656990204]),
            {
              "landcover": 1,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([73.19152672424293, 23.697978871868138]),
            {
              "landcover": 1,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([73.39752037658668, 23.682888111613206]),
            {
              "landcover": 1,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([72.86125023498512, 24.01197171844074]),
            {
              "landcover": 1,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([74.12090141906715, 23.622979474061207]),
            {
              "landcover": 1,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([74.018934561157, 23.68147326343583]),
            {
              "landcover": 1,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([74.20398552551246, 23.718411495731534]),
            {
              "landcover": 1,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([72.64770348205543, 22.615912810246343]),
            {
              "landcover": 1,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([72.42694695129371, 22.556952616603127]),
            {
              "landcover": 1,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([72.55878288879371, 22.600699693009]),
            {
              "landcover": 1,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([73.88349373474098, 22.888037041141082]),
            {
              "landcover": 1,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([73.93258888854957, 22.973092839346062]),
            {
              "landcover": 1,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([73.52643807067848, 22.974041115692252]),
            {
              "landcover": 1,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([73.43614418640114, 22.997745861412582]),
            {
              "landcover": 1,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([73.7630317534018, 23.023026336257985]),
            {
              "landcover": 1,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([73.34246137986665, 23.08309046089757]),
            {
              "landcover": 1,
              "system:index": "29"
            })]),
    v_vegetation_ahmedabad_1988 = ui.import && ui.import("v_vegetation_ahmedabad_1988", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            72.78112867722993,
            22.554299757765346
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.08050611863618,
            22.681067058442462
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.74267652879243,
            22.70197242124851
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.55728224168305,
            22.979772664283157
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.41789320359712,
            22.83746299819464
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.9390571440268,
            22.977244019822948
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.7962348784018,
            23.006320573230195
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.28855970750337,
            23.300524497026004
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.14093092332368,
            23.420923012420058
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.86283949265962,
            23.44297370994062
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.9939887846518,
            23.19642749066239
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.36409071336274,
            23.675226674745446
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.25457075486665,
            23.75428122885074
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.12050321946626,
            23.659504357169613
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.94867018113618,
            23.794815551279527
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.78267362962251,
            23.850092247269615
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.3365524138022,
            23.560571756250454
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.31595304856782,
            23.4579386712313
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.41826322923188,
            23.766225757957802
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.83324125657563,
            23.260003503404494
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.62930754075532,
            23.205109434008214
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.49369505296235,
            23.13914363945386
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.62415769944673,
            23.105043322063377
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.82259825120454,
            22.401235717754165
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.94344786057954,
            22.35456790494002
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.54244688401704,
            22.642261097371208
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.42777708421235,
            22.695166797685097
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.1888244474936,
            22.763882012858783
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.32134703050141,
            22.76863063628341
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.15373304734712,
            22.97977676217202
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 2
      },
      "color": "#2a8b1b",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": true
    }) || 
    /* color: #2a8b1b */
    /* shown: false */
    /* locked: true */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([72.78112867722993, 22.554299757765346]),
            {
              "landcover": 2,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([73.08050611863618, 22.681067058442462]),
            {
              "landcover": 2,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([72.74267652879243, 22.70197242124851]),
            {
              "landcover": 2,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([72.55728224168305, 22.979772664283157]),
            {
              "landcover": 2,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([72.41789320359712, 22.83746299819464]),
            {
              "landcover": 2,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([72.9390571440268, 22.977244019822948]),
            {
              "landcover": 2,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([72.7962348784018, 23.006320573230195]),
            {
              "landcover": 2,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([73.28855970750337, 23.300524497026004]),
            {
              "landcover": 2,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([73.14093092332368, 23.420923012420058]),
            {
              "landcover": 2,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([72.86283949265962, 23.44297370994062]),
            {
              "landcover": 2,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([72.9939887846518, 23.19642749066239]),
            {
              "landcover": 2,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([73.36409071336274, 23.675226674745446]),
            {
              "landcover": 2,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([73.25457075486665, 23.75428122885074]),
            {
              "landcover": 2,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([73.12050321946626, 23.659504357169613]),
            {
              "landcover": 2,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([72.94867018113618, 23.794815551279527]),
            {
              "landcover": 2,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([72.78267362962251, 23.850092247269615]),
            {
              "landcover": 2,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([74.3365524138022, 23.560571756250454]),
            {
              "landcover": 2,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([74.31595304856782, 23.4579386712313]),
            {
              "landcover": 2,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([74.41826322923188, 23.766225757957802]),
            {
              "landcover": 2,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([73.83324125657563, 23.260003503404494]),
            {
              "landcover": 2,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([73.62930754075532, 23.205109434008214]),
            {
              "landcover": 2,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([73.49369505296235, 23.13914363945386]),
            {
              "landcover": 2,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([73.62415769944673, 23.105043322063377]),
            {
              "landcover": 2,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([73.82259825120454, 22.401235717754165]),
            {
              "landcover": 2,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([73.94344786057954, 22.35456790494002]),
            {
              "landcover": 2,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([73.54244688401704, 22.642261097371208]),
            {
              "landcover": 2,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([73.42777708421235, 22.695166797685097]),
            {
              "landcover": 2,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([73.1888244474936, 22.763882012858783]),
            {
              "landcover": 2,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([73.32134703050141, 22.76863063628341]),
            {
              "landcover": 2,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([74.15373304734712, 22.97977676217202]),
            {
              "landcover": 2,
              "system:index": "29"
            })]),
    v_urban_ahmedabad_1993 = ui.import && ui.import("v_urban_ahmedabad_1993", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            72.38008339538551,
            22.51572890679843
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.18483193054176,
            22.98684219506969
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.87172157897926,
            23.557064052398918
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.72865517272926,
            23.383228923577775
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.77260048522926,
            22.723624170213164
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.70118935241676,
            22.500504734874927
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.29744179382301,
            22.536025194324832
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.04451210632301,
            22.355791646065736
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.58857948913551,
            23.650185484218632
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.43889076843239,
            23.147305609793285
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.16948158874489,
            23.195281033426532
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.44095070495582,
            23.841882025703086
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.05230934753395,
            23.967431142743425
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.00424416198707,
            23.76523727464943
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.20749123229957,
            23.646411577831355
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.74057228698707,
            23.74952580265809
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.68770058288551,
            24.00193575070495
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.86142189636207,
            23.924130477697275
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.30818398132301,
            23.74315513074518
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.27865822448707,
            23.509763209850405
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.81997902526832,
            23.719897535996378
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.63620216979957,
            23.202137516158704
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.4617942108152,
            22.998765947377663
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.5661643280027,
            23.068275321110708
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.85361450136524,
            22.691033973302723
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.50112121523243,
            22.302787128990882
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.00374572695118,
            22.99919902052317
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.521033934959,
            22.913843400058493
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.6039704933632,
            23.43668727662959
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.55865188984758,
            23.335218827336934
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 0
      },
      "color": "#d63000",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": true
    }) || 
    /* color: #d63000 */
    /* shown: false */
    /* locked: true */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([72.38008339538551, 22.51572890679843]),
            {
              "landcover": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([73.18483193054176, 22.98684219506969]),
            {
              "landcover": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([72.87172157897926, 23.557064052398918]),
            {
              "landcover": 0,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([73.72865517272926, 23.383228923577775]),
            {
              "landcover": 0,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([73.77260048522926, 22.723624170213164]),
            {
              "landcover": 0,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([73.70118935241676, 22.500504734874927]),
            {
              "landcover": 0,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([73.29744179382301, 22.536025194324832]),
            {
              "landcover": 0,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([74.04451210632301, 22.355791646065736]),
            {
              "landcover": 0,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([73.58857948913551, 23.650185484218632]),
            {
              "landcover": 0,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([73.43889076843239, 23.147305609793285]),
            {
              "landcover": 0,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([74.16948158874489, 23.195281033426532]),
            {
              "landcover": 0,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([73.44095070495582, 23.841882025703086]),
            {
              "landcover": 0,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([73.05230934753395, 23.967431142743425]),
            {
              "landcover": 0,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([73.00424416198707, 23.76523727464943]),
            {
              "landcover": 0,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([73.20749123229957, 23.646411577831355]),
            {
              "landcover": 0,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([72.74057228698707, 23.74952580265809]),
            {
              "landcover": 0,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([72.68770058288551, 24.00193575070495]),
            {
              "landcover": 0,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([72.86142189636207, 23.924130477697275]),
            {
              "landcover": 0,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([74.30818398132301, 23.74315513074518]),
            {
              "landcover": 0,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([74.27865822448707, 23.509763209850405]),
            {
              "landcover": 0,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([73.81997902526832, 23.719897535996378]),
            {
              "landcover": 0,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([72.63620216979957, 23.202137516158704]),
            {
              "landcover": 0,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([72.4617942108152, 22.998765947377663]),
            {
              "landcover": 0,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([72.5661643280027, 23.068275321110708]),
            {
              "landcover": 0,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([72.85361450136524, 22.691033973302723]),
            {
              "landcover": 0,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([73.50112121523243, 22.302787128990882]),
            {
              "landcover": 0,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([74.00374572695118, 22.99919902052317]),
            {
              "landcover": 0,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([73.521033934959, 22.913843400058493]),
            {
              "landcover": 0,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([72.6039704933632, 23.43668727662959]),
            {
              "landcover": 0,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([72.55865188984758, 23.335218827336934]),
            {
              "landcover": 0,
              "system:index": "29"
            })]),
    v_water_ahmedabad_1993 = ui.import && ui.import("v_water_ahmedabad_1993", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            73.81040665058977,
            22.306146876744595
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.6799440041054,
            22.250232539210838
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.39086624531633,
            22.38743686437302
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.09723224588465,
            22.511906051996384
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.56907320826508,
            22.519220444877433
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.42850204882741,
            22.557643119325725
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.6775827067864,
            22.737138453067995
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.53871296707905,
            22.948025265235817
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.89895771805561,
            23.321198575012232
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.96487568680561,
            23.386759226360287
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.20211170975483,
            23.589224526008508
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.15203995969748,
            23.7886099409803
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.98758836057638,
            23.827873257501782
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.71807999875998,
            23.83949292136044
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.0192465331838,
            23.862415150170282
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.88407655027365,
            22.88879362990051
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.2383856323049,
            22.904290956462848
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.5520834472463,
            23.09991051427241
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.69013730864695,
            23.32929741034087
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.79899675716989,
            23.507774849331714
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.93658335079782,
            23.238321813003484
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.02318651547067,
            23.240451215440462
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.33341719553316,
            22.962949671358444
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.69716765329683,
            22.55835148186523
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.19162489816988,
            23.697944816766086
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.87500883982027,
            23.626405437892803
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.76857878610933,
            23.593374071662378
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.65586974069917,
            23.429903980424264
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.85765768930757,
            24.009899252647696
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.66865851328218,
            23.849148888487484
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 1
      },
      "color": "#98ff00",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": true
    }) || 
    /* color: #98ff00 */
    /* shown: false */
    /* locked: true */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([73.81040665058977, 22.306146876744595]),
            {
              "landcover": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([73.6799440041054, 22.250232539210838]),
            {
              "landcover": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([73.39086624531633, 22.38743686437302]),
            {
              "landcover": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([73.09723224588465, 22.511906051996384]),
            {
              "landcover": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([72.56907320826508, 22.519220444877433]),
            {
              "landcover": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([72.42850204882741, 22.557643119325725]),
            {
              "landcover": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([72.6775827067864, 22.737138453067995]),
            {
              "landcover": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([72.53871296707905, 22.948025265235817]),
            {
              "landcover": 1,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([73.89895771805561, 23.321198575012232]),
            {
              "landcover": 1,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([73.96487568680561, 23.386759226360287]),
            {
              "landcover": 1,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([74.20211170975483, 23.589224526008508]),
            {
              "landcover": 1,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([74.15203995969748, 23.7886099409803]),
            {
              "landcover": 1,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([73.98758836057638, 23.827873257501782]),
            {
              "landcover": 1,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([73.71807999875998, 23.83949292136044]),
            {
              "landcover": 1,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([73.0192465331838, 23.862415150170282]),
            {
              "landcover": 1,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([73.88407655027365, 22.88879362990051]),
            {
              "landcover": 1,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([74.2383856323049, 22.904290956462848]),
            {
              "landcover": 1,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([73.5520834472463, 23.09991051427241]),
            {
              "landcover": 1,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([73.69013730864695, 23.32929741034087]),
            {
              "landcover": 1,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([72.79899675716989, 23.507774849331714]),
            {
              "landcover": 1,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([72.93658335079782, 23.238321813003484]),
            {
              "landcover": 1,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([73.02318651547067, 23.240451215440462]),
            {
              "landcover": 1,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([73.33341719553316, 22.962949671358444]),
            {
              "landcover": 1,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([73.69716765329683, 22.55835148186523]),
            {
              "landcover": 1,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([73.19162489816988, 23.697944816766086]),
            {
              "landcover": 1,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([73.87500883982027, 23.626405437892803]),
            {
              "landcover": 1,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([73.76857878610933, 23.593374071662378]),
            {
              "landcover": 1,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([72.65586974069917, 23.429903980424264]),
            {
              "landcover": 1,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([72.85765768930757, 24.009899252647696]),
            {
              "landcover": 1,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([72.66865851328218, 23.849148888487484]),
            {
              "landcover": 1,
              "system:index": "29"
            })]),
    v_vegetation_ahmedabad_1993 = ui.import && ui.import("v_vegetation_ahmedabad_1993", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            72.79242636606538,
            22.509668514759912
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.08837057993257,
            22.557235328421307
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.74985434458101,
            22.72137313170243
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.41751791879976,
            22.609856819670174
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.60840536997163,
            22.787859521291175
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.5983765308603,
            22.40369430702226
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.72643591806734,
            22.375918223221017
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.50992800638521,
            22.342381136318302
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.56251102802068,
            23.399770613812034
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.58826023456365,
            23.303003732664045
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.99853092548162,
            23.538693090792236
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.08748405079771,
            23.704905974660225
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.24215095143248,
            23.753307812028467
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.29107444386412,
            23.207283330891617
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.27562491993834,
            23.43780954761687
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.10121696095396,
            23.550844672769745
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.35690963397933,
            23.46277534625771
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.39261520038558,
            23.64594086322809
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.95178878436995,
            23.52700674002053
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.11212051044417,
            23.814717038635475
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.68891700179095,
            23.712743921941577
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.73327811629291,
            23.9101548700918
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.83161643627658,
            23.255058734514847
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.75426963451876,
            23.303626094766358
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.81950095776095,
            23.16039619964362
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.91288950314822,
            22.94779333176568
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.6917896496326,
            22.903841021578117
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.33997592932835,
            22.873670732207668
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.02274570471897,
            22.987500024820662
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.53343830115452,
            23.3378686636392
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 2
      },
      "color": "#0b4a8b",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": true
    }) || 
    /* color: #0b4a8b */
    /* shown: false */
    /* locked: true */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([72.79242636606538, 22.509668514759912]),
            {
              "landcover": 2,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([73.08837057993257, 22.557235328421307]),
            {
              "landcover": 2,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([72.74985434458101, 22.72137313170243]),
            {
              "landcover": 2,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([72.41751791879976, 22.609856819670174]),
            {
              "landcover": 2,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([72.60840536997163, 22.787859521291175]),
            {
              "landcover": 2,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([73.5983765308603, 22.40369430702226]),
            {
              "landcover": 2,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([73.72643591806734, 22.375918223221017]),
            {
              "landcover": 2,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([73.50992800638521, 22.342381136318302]),
            {
              "landcover": 2,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([72.56251102802068, 23.399770613812034]),
            {
              "landcover": 2,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([72.58826023456365, 23.303003732664045]),
            {
              "landcover": 2,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([72.99853092548162, 23.538693090792236]),
            {
              "landcover": 2,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([73.08748405079771, 23.704905974660225]),
            {
              "landcover": 2,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([73.24215095143248, 23.753307812028467]),
            {
              "landcover": 2,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([73.29107444386412, 23.207283330891617]),
            {
              "landcover": 2,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([73.27562491993834, 23.43780954761687]),
            {
              "landcover": 2,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([73.10121696095396, 23.550844672769745]),
            {
              "landcover": 2,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([74.35690963397933, 23.46277534625771]),
            {
              "landcover": 2,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([74.39261520038558, 23.64594086322809]),
            {
              "landcover": 2,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([73.95178878436995, 23.52700674002053]),
            {
              "landcover": 2,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([74.11212051044417, 23.814717038635475]),
            {
              "landcover": 2,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([73.68891700179095, 23.712743921941577]),
            {
              "landcover": 2,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([72.73327811629291, 23.9101548700918]),
            {
              "landcover": 2,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([73.83161643627658, 23.255058734514847]),
            {
              "landcover": 2,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([72.75426963451876, 23.303626094766358]),
            {
              "landcover": 2,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([72.81950095776095, 23.16039619964362]),
            {
              "landcover": 2,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([73.91288950314822, 22.94779333176568]),
            {
              "landcover": 2,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([73.6917896496326, 22.903841021578117]),
            {
              "landcover": 2,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([73.33997592932835, 22.873670732207668]),
            {
              "landcover": 2,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([73.02274570471897, 22.987500024820662]),
            {
              "landcover": 2,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([73.53343830115452, 23.3378686636392]),
            {
              "landcover": 2,
              "system:index": "29"
            })]),
    v_urban_ahmedabad_1998 = ui.import && ui.import("v_urban_ahmedabad_1998", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            73.25257517546457,
            23.017124780261696
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.10837961882395,
            22.86662973653889
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.70713450163645,
            23.103046688403488
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.81699778288645,
            22.86662973653889
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.99645640105051,
            23.15293199638347
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.40363718718332,
            22.643743133791972
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.81219126433176,
            22.22104264647564
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.51418711394113,
            22.255363520187274
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.44027353972238,
            22.456035234352417
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.87423350065988,
            22.750166193771914
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.85226084440988,
            23.374349385198727
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.74926401823801,
            23.755755062326514
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.43316294401926,
            23.80099679917215
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.46109088961978,
            23.643230631702313
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.01614460055728,
            23.270329828644265
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.06008991305728,
            23.809183406628758
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.69204792086978,
            23.450612708943584
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.63122370497717,
            23.207662184631097
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.03771784560217,
            23.59458355642289
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.03686304669696,
            22.621185816788792
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.0828682957204,
            23.031917136855363
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.40387507062275,
            23.439623209482008
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.17556543927509,
            23.402133886089675
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.8975823201735,
            22.40722120542664
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.15095451255631,
            22.321496482738393
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.5679924764235,
            22.813530953781232
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.94667863667851,
            23.649750652525356
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.3087849599207,
            23.491571491085715
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.65897416890508,
            23.659603431853565
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.6163029652918,
            23.554844701196426
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 0
      },
      "color": "#d63000",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": true
    }) || 
    /* color: #d63000 */
    /* shown: false */
    /* locked: true */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([73.25257517546457, 23.017124780261696]),
            {
              "landcover": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([73.10837961882395, 22.86662973653889]),
            {
              "landcover": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([73.70713450163645, 23.103046688403488]),
            {
              "landcover": 0,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([73.81699778288645, 22.86662973653889]),
            {
              "landcover": 0,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([72.99645640105051, 23.15293199638347]),
            {
              "landcover": 0,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([73.40363718718332, 22.643743133791972]),
            {
              "landcover": 0,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([73.81219126433176, 22.22104264647564]),
            {
              "landcover": 0,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([73.51418711394113, 22.255363520187274]),
            {
              "landcover": 0,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([72.44027353972238, 22.456035234352417]),
            {
              "landcover": 0,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([72.87423350065988, 22.750166193771914]),
            {
              "landcover": 0,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([72.85226084440988, 23.374349385198727]),
            {
              "landcover": 0,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([72.74926401823801, 23.755755062326514]),
            {
              "landcover": 0,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([73.43316294401926, 23.80099679917215]),
            {
              "landcover": 0,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([74.46109088961978, 23.643230631702313]),
            {
              "landcover": 0,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([74.01614460055728, 23.270329828644265]),
            {
              "landcover": 0,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([74.06008991305728, 23.809183406628758]),
            {
              "landcover": 0,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([73.69204792086978, 23.450612708943584]),
            {
              "landcover": 0,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([72.63122370497717, 23.207662184631097]),
            {
              "landcover": 0,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([73.03771784560217, 23.59458355642289]),
            {
              "landcover": 0,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([74.03686304669696, 22.621185816788792]),
            {
              "landcover": 0,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([74.0828682957204, 23.031917136855363]),
            {
              "landcover": 0,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([74.40387507062275, 23.439623209482008]),
            {
              "landcover": 0,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([74.17556543927509, 23.402133886089675]),
            {
              "landcover": 0,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([72.8975823201735, 22.40722120542664]),
            {
              "landcover": 0,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([73.15095451255631, 22.321496482738393]),
            {
              "landcover": 0,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([72.5679924764235, 22.813530953781232]),
            {
              "landcover": 0,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([73.94667863667851, 23.649750652525356]),
            {
              "landcover": 0,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([73.3087849599207, 23.491571491085715]),
            {
              "landcover": 0,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([73.65897416890508, 23.659603431853565]),
            {
              "landcover": 0,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([72.6163029652918, 23.554844701196426]),
            {
              "landcover": 0,
              "system:index": "29"
            })]),
    v_water_ahmedabad_1998 = ui.import && ui.import("v_water_ahmedabad_1998", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            73.39461564839726,
            22.381491775553005
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.53081559956914,
            22.469083101404543
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.88762712300664,
            22.338945644412284
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.66515397847539,
            22.24809481711784
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.25522661031133,
            22.653604939870032
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.33127260030156,
            22.63887129883425
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.08957338155156,
            22.57207483544504
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.66531228841191,
            22.799350899448616
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.71801233113652,
            22.72337020789453
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.53879785359746,
            22.748385185698183
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.60986566365605,
            22.69344121950217
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.88221978963261,
            22.88730894565292
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.96461725057011,
            23.076320377136277
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.88530969441777,
            23.249295283530145
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.20450067342168,
            23.696469255693515
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.36174249471074,
            23.48440805572341
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.86049127400761,
            24.010465756058597
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.08306360066777,
            23.605268322947616
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.23618554890996,
            23.56751142587046
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.83861779988652,
            23.567826111556826
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.0130257588709,
            23.446616464292696
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.84593011916893,
            23.45034343461719
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.7017345625283,
            23.302226537691915
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.93828393996971,
            23.230945537508564
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.64165308059471,
            23.786925663650393
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.33281259652387,
            22.962308189686592
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.05403452035199,
            23.034640426742076
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.57489805337201,
            23.839992672467332
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.49112730141889,
            23.69451553202126
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.6899111759306,
            23.329641481484014
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 1
      },
      "color": "#26fffa",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": true
    }) || 
    /* color: #26fffa */
    /* shown: false */
    /* locked: true */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([73.39461564839726, 22.381491775553005]),
            {
              "landcover": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([72.53081559956914, 22.469083101404543]),
            {
              "landcover": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([73.88762712300664, 22.338945644412284]),
            {
              "landcover": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([73.66515397847539, 22.24809481711784]),
            {
              "landcover": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([73.25522661031133, 22.653604939870032]),
            {
              "landcover": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([73.33127260030156, 22.63887129883425]),
            {
              "landcover": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([73.08957338155156, 22.57207483544504]),
            {
              "landcover": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([72.66531228841191, 22.799350899448616]),
            {
              "landcover": 1,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([72.71801233113652, 22.72337020789453]),
            {
              "landcover": 1,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([72.53879785359746, 22.748385185698183]),
            {
              "landcover": 1,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([72.60986566365605, 22.69344121950217]),
            {
              "landcover": 1,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([73.88221978963261, 22.88730894565292]),
            {
              "landcover": 1,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([73.96461725057011, 23.076320377136277]),
            {
              "landcover": 1,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([73.88530969441777, 23.249295283530145]),
            {
              "landcover": 1,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([73.20450067342168, 23.696469255693515]),
            {
              "landcover": 1,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([73.36174249471074, 23.48440805572341]),
            {
              "landcover": 1,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([72.86049127400761, 24.010465756058597]),
            {
              "landcover": 1,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([74.08306360066777, 23.605268322947616]),
            {
              "landcover": 1,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([74.23618554890996, 23.56751142587046]),
            {
              "landcover": 1,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([73.83861779988652, 23.567826111556826]),
            {
              "landcover": 1,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([74.0130257588709, 23.446616464292696]),
            {
              "landcover": 1,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([72.84593011916893, 23.45034343461719]),
            {
              "landcover": 1,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([72.7017345625283, 23.302226537691915]),
            {
              "landcover": 1,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([72.93828393996971, 23.230945537508564]),
            {
              "landcover": 1,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([72.64165308059471, 23.786925663650393]),
            {
              "landcover": 1,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([73.33281259652387, 22.962308189686592]),
            {
              "landcover": 1,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([73.05403452035199, 23.034640426742076]),
            {
              "landcover": 1,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([73.57489805337201, 23.839992672467332]),
            {
              "landcover": 1,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([73.49112730141889, 23.69451553202126]),
            {
              "landcover": 1,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([73.6899111759306, 23.329641481484014]),
            {
              "landcover": 1,
              "system:index": "29"
            })]),
    v_vegetation_ahmedabad_1998 = ui.import && ui.import("v_vegetation_ahmedabad_1998", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            72.81478147622357,
            22.613847562362206
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.8875659000517,
            22.36388288737902
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.44399290200482,
            22.849438730884323
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.54262571450482,
            22.603705518848617
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.51241331216107,
            23.01259349298256
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.8433764469267,
            22.380391913590046
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.54331236001264,
            22.475598017400685
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.6348803531767,
            23.359744753739417
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.7831957828642,
            23.683354529159782
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.91606168862592,
            23.900743170012774
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.0362246524931,
            23.948758250800807
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.91125517007123,
            23.729878603407354
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.0856631290556,
            23.757847926868962
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.31475858803998,
            23.6229742765555
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.35046415444623,
            23.434736787901056
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.40814237710248,
            23.764446554215414
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.18566923257123,
            23.771359043033886
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.86263193595978,
            23.666532624719935
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.7151854094268,
            23.605885683449937
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.64097124197183,
            23.536288108811398
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.076376973173,
            23.400083714715834
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.35584169485269,
            23.08146589397051
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.06058412649331,
            23.138304923686803
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.68842226125894,
            23.211528584212736
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.33249574758706,
            23.25727301063926
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.59685426809487,
            23.25664215970109
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.28116899587808,
            23.56115186286378
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.34331041433511,
            23.58428037169701
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.96489626028237,
            23.048456647350335
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.25534731008706,
            22.822703691680434
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 2
      },
      "color": "#8b857f",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": true
    }) || 
    /* color: #8b857f */
    /* shown: false */
    /* locked: true */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([72.81478147622357, 22.613847562362206]),
            {
              "landcover": 2,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([72.8875659000517, 22.36388288737902]),
            {
              "landcover": 2,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([72.44399290200482, 22.849438730884323]),
            {
              "landcover": 2,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([73.54262571450482, 22.603705518848617]),
            {
              "landcover": 2,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([73.51241331216107, 23.01259349298256]),
            {
              "landcover": 2,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([73.8433764469267, 22.380391913590046]),
            {
              "landcover": 2,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([73.54331236001264, 22.475598017400685]),
            {
              "landcover": 2,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([72.6348803531767, 23.359744753739417]),
            {
              "landcover": 2,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([72.7831957828642, 23.683354529159782]),
            {
              "landcover": 2,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([72.91606168862592, 23.900743170012774]),
            {
              "landcover": 2,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([73.0362246524931, 23.948758250800807]),
            {
              "landcover": 2,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([72.91125517007123, 23.729878603407354]),
            {
              "landcover": 2,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([73.0856631290556, 23.757847926868962]),
            {
              "landcover": 2,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([74.31475858803998, 23.6229742765555]),
            {
              "landcover": 2,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([74.35046415444623, 23.434736787901056]),
            {
              "landcover": 2,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([74.40814237710248, 23.764446554215414]),
            {
              "landcover": 2,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([74.18566923257123, 23.771359043033886]),
            {
              "landcover": 2,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([73.86263193595978, 23.666532624719935]),
            {
              "landcover": 2,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([73.7151854094268, 23.605885683449937]),
            {
              "landcover": 2,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([73.64097124197183, 23.536288108811398]),
            {
              "landcover": 2,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([73.076376973173, 23.400083714715834]),
            {
              "landcover": 2,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([73.35584169485269, 23.08146589397051]),
            {
              "landcover": 2,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([73.06058412649331, 23.138304923686803]),
            {
              "landcover": 2,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([72.68842226125894, 23.211528584212736]),
            {
              "landcover": 2,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([73.33249574758706, 23.25727301063926]),
            {
              "landcover": 2,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([73.59685426809487, 23.25664215970109]),
            {
              "landcover": 2,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([73.28116899587808, 23.56115186286378]),
            {
              "landcover": 2,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([73.34331041433511, 23.58428037169701]),
            {
              "landcover": 2,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([73.96489626028237, 23.048456647350335]),
            {
              "landcover": 2,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([74.25534731008706, 22.822703691680434]),
            {
              "landcover": 2,
              "system:index": "29"
            })]),
    v_urban_ahmedabad_2008 = ui.import && ui.import("v_urban_ahmedabad_2008", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            73.97584755554176,
            22.257008423149614
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.70256264343239,
            22.32721204741163
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.8354285491941,
            22.230315450042013
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.4395774139402,
            22.40023714627482
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.18311531677223,
            22.337374353683007
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.79893715515114,
            22.47703085353691
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.57234413757301,
            22.48845107689697
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.31450874938942,
            22.510971533145998
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.52009102229884,
            23.01041941057996
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.60111519222072,
            23.224185348322848
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.56283470516017,
            23.477135750250433
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.64746376399806,
            23.599733057757724
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.68025108699611,
            23.8403444055192
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.79097267513087,
            23.872057437675462
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.02401634578517,
            22.75098778251535
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.68069359187892,
            23.65220389581904
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.4428701055508,
            23.720114534345786
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.14236351375392,
            22.945313943422377
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.01739403133205,
            23.44391679294206
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.12725731258205,
            23.123509440350514
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.55160423641017,
            23.41115466354933
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.8880605352383,
            23.5622966666048
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.80865379695705,
            22.773214837094965
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.2838124883633,
            22.50577853161174
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.12621841968534,
            23.69659595788301
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.6013771110916,
            23.88069005027314
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.44344864429472,
            22.66078203542038
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.97971878589628,
            23.208408485730047
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.02709732593534,
            23.765111923319544
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.25094376148222,
            23.126974331869693
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 0
      },
      "color": "#d63000",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": true
    }) || 
    /* color: #d63000 */
    /* shown: false */
    /* locked: true */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([73.97584755554176, 22.257008423149614]),
            {
              "landcover": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([73.70256264343239, 22.32721204741163]),
            {
              "landcover": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([73.8354285491941, 22.230315450042013]),
            {
              "landcover": 0,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([73.4395774139402, 22.40023714627482]),
            {
              "landcover": 0,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([73.18311531677223, 22.337374353683007]),
            {
              "landcover": 0,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([72.79893715515114, 22.47703085353691]),
            {
              "landcover": 0,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([72.57234413757301, 22.48845107689697]),
            {
              "landcover": 0,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([72.31450874938942, 22.510971533145998]),
            {
              "landcover": 0,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([72.52009102229884, 23.01041941057996]),
            {
              "landcover": 0,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([72.60111519222072, 23.224185348322848]),
            {
              "landcover": 0,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([72.56283470516017, 23.477135750250433]),
            {
              "landcover": 0,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([72.64746376399806, 23.599733057757724]),
            {
              "landcover": 0,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([72.68025108699611, 23.8403444055192]),
            {
              "landcover": 0,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([72.79097267513087, 23.872057437675462]),
            {
              "landcover": 0,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([74.02401634578517, 22.75098778251535]),
            {
              "landcover": 0,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([73.68069359187892, 23.65220389581904]),
            {
              "landcover": 0,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([74.4428701055508, 23.720114534345786]),
            {
              "landcover": 0,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([73.14236351375392, 22.945313943422377]),
            {
              "landcover": 0,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([73.01739403133205, 23.44391679294206]),
            {
              "landcover": 0,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([73.12725731258205, 23.123509440350514]),
            {
              "landcover": 0,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([73.55160423641017, 23.41115466354933]),
            {
              "landcover": 0,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([73.8880605352383, 23.5622966666048]),
            {
              "landcover": 0,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([72.80865379695705, 22.773214837094965]),
            {
              "landcover": 0,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([73.2838124883633, 22.50577853161174]),
            {
              "landcover": 0,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([73.12621841968534, 23.69659595788301]),
            {
              "landcover": 0,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([73.6013771110916, 23.88069005027314]),
            {
              "landcover": 0,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([73.44344864429472, 22.66078203542038]),
            {
              "landcover": 0,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([73.97971878589628, 23.208408485730047]),
            {
              "landcover": 0,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([74.02709732593534, 23.765111923319544]),
            {
              "landcover": 0,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([74.25094376148222, 23.126974331869693]),
            {
              "landcover": 0,
              "system:index": "29"
            })]),
    v_water_ahmedabad_2008 = ui.import && ui.import("v_water_ahmedabad_2008", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            73.87534866870878,
            22.3353422881394
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.55399857105253,
            22.382968917476887
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.25805435718534,
            22.582188468644883
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.64664320434129,
            22.617223292453406
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.38743452514207,
            22.454706370245898
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.31911329711473,
            22.573005933900046
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.8829484411577,
            22.88823790050373
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.88466505492723,
            23.248644525832567
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.24515394652879,
            23.354907119780986
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.01135115111863,
            23.461872031563015
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.16807798827683,
            23.460139857780593
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.35989622558152,
            23.486749837454077
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.04129270995652,
            23.710124109012412
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.7019181677202,
            23.302101752049786
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.81298307860887,
            23.213467757293216
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.43405394042527,
            23.014063384170196
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.02455572570359,
            23.145769810922005
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.39723257506883,
            23.680572482915004
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.64432577575242,
            23.933273476312795
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.82439856017625,
            23.941588997390912
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.99015097106492,
            22.70355668665306
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.91410498107469,
            23.764179966234035
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.08437971557176,
            22.810328831025906
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.01176695312058,
            23.321177156732315
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.5308576055864,
            22.949663574410184
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.16404394591844,
            23.691026349257818
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.72105841125047,
            23.455179416227498
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.55172340036168,
            23.70599419479838
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.2779502070023,
            23.099943661077
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.7033995783402,
            22.558219901190398
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 1
      },
      "color": "#98ff00",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": true
    }) || 
    /* color: #98ff00 */
    /* shown: false */
    /* locked: true */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([73.87534866870878, 22.3353422881394]),
            {
              "landcover": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([73.55399857105253, 22.382968917476887]),
            {
              "landcover": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([73.25805435718534, 22.582188468644883]),
            {
              "landcover": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([72.64664320434129, 22.617223292453406]),
            {
              "landcover": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([72.38743452514207, 22.454706370245898]),
            {
              "landcover": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([72.31911329711473, 22.573005933900046]),
            {
              "landcover": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([73.8829484411577, 22.88823790050373]),
            {
              "landcover": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([73.88466505492723, 23.248644525832567]),
            {
              "landcover": 1,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([74.24515394652879, 23.354907119780986]),
            {
              "landcover": 1,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([74.01135115111863, 23.461872031563015]),
            {
              "landcover": 1,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([74.16807798827683, 23.460139857780593]),
            {
              "landcover": 1,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([73.35989622558152, 23.486749837454077]),
            {
              "landcover": 1,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([73.04129270995652, 23.710124109012412]),
            {
              "landcover": 1,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([72.7019181677202, 23.302101752049786]),
            {
              "landcover": 1,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([72.81298307860887, 23.213467757293216]),
            {
              "landcover": 1,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([73.43405394042527, 23.014063384170196]),
            {
              "landcover": 1,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([73.02455572570359, 23.145769810922005]),
            {
              "landcover": 1,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([73.39723257506883, 23.680572482915004]),
            {
              "landcover": 1,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([72.64432577575242, 23.933273476312795]),
            {
              "landcover": 1,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([72.82439856017625, 23.941588997390912]),
            {
              "landcover": 1,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([73.99015097106492, 22.70355668665306]),
            {
              "landcover": 1,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([73.91410498107469, 23.764179966234035]),
            {
              "landcover": 1,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([73.08437971557176, 22.810328831025906]),
            {
              "landcover": 1,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([73.01176695312058, 23.321177156732315]),
            {
              "landcover": 1,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([72.5308576055864, 22.949663574410184]),
            {
              "landcover": 1,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([74.16404394591844, 23.691026349257818]),
            {
              "landcover": 1,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([72.72105841125047, 23.455179416227498]),
            {
              "landcover": 1,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([72.55172340036168, 23.70599419479838]),
            {
              "landcover": 1,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([74.2779502070023, 23.099943661077]),
            {
              "landcover": 1,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([73.7033995783402, 22.558219901190398]),
            {
              "landcover": 1,
              "system:index": "29"
            })]),
    v_vegetation_ahmedabad_2008 = ui.import && ui.import("v_vegetation_ahmedabad_2008", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            72.57594611564062,
            23.594952440758387
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.92235877433203,
            23.51879225406231
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.94808552554157,
            23.987516324837145
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.68407032778767,
            23.950066363917276
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.76922772219685,
            22.364497176227708
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.16404888918903,
            22.850288140810612
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.84455926808025,
            22.561435807150694
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.281265811049,
            22.726201931173428
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.5846399097277,
            22.88742665719183
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.99353730963004,
            23.039320310971558
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.38159120367301,
            23.660428006657376
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.92746103094352,
            23.68566122981801
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.33119523809684,
            23.608531317382948
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.66524827764762,
            23.143618426578836
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.7335132388903,
            23.30941225817199
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.15661561773551,
            23.886998068397883
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.13266885565055,
            22.44377842803374
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.24553621099723,
            23.431023386812754
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.51779115484489,
            22.59996916483764
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.39748609350455,
            22.733265020775452
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.29661882208121,
            23.400778760795514
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.39462411688102,
            23.111926996178155
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.59239948080314,
            23.47999869987768
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.84768951223624,
            23.82066638408585
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.51935756490958,
            22.878926010745598
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.46245181844962,
            22.875446522872654
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.9407862453295,
            22.971455527081
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.60993039892448,
            23.848953552855935
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.97651326940787,
            22.68485215561752
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.8928149967028,
            22.412483226975223
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 2
      },
      "color": "#0b4a8b",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": true
    }) || 
    /* color: #0b4a8b */
    /* shown: false */
    /* locked: true */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([72.57594611564062, 23.594952440758387]),
            {
              "landcover": 2,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([72.92235877433203, 23.51879225406231]),
            {
              "landcover": 2,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([72.94808552554157, 23.987516324837145]),
            {
              "landcover": 2,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([72.68407032778767, 23.950066363917276]),
            {
              "landcover": 2,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([73.76922772219685, 22.364497176227708]),
            {
              "landcover": 2,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([74.16404888918903, 22.850288140810612]),
            {
              "landcover": 2,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([72.84455926808025, 22.561435807150694]),
            {
              "landcover": 2,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([73.281265811049, 22.726201931173428]),
            {
              "landcover": 2,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([72.5846399097277, 22.88742665719183]),
            {
              "landcover": 2,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([72.99353730963004, 23.039320310971558]),
            {
              "landcover": 2,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([74.38159120367301, 23.660428006657376]),
            {
              "landcover": 2,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([73.92746103094352, 23.68566122981801]),
            {
              "landcover": 2,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([73.33119523809684, 23.608531317382948]),
            {
              "landcover": 2,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([73.66524827764762, 23.143618426578836]),
            {
              "landcover": 2,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([72.7335132388903, 23.30941225817199]),
            {
              "landcover": 2,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([73.15661561773551, 23.886998068397883]),
            {
              "landcover": 2,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([73.13266885565055, 22.44377842803374]),
            {
              "landcover": 2,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([73.24553621099723, 23.431023386812754]),
            {
              "landcover": 2,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([73.51779115484489, 22.59996916483764]),
            {
              "landcover": 2,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([72.39748609350455, 22.733265020775452]),
            {
              "landcover": 2,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([74.29661882208121, 23.400778760795514]),
            {
              "landcover": 2,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([73.39462411688102, 23.111926996178155]),
            {
              "landcover": 2,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([73.59239948080314, 23.47999869987768]),
            {
              "landcover": 2,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([72.84768951223624, 23.82066638408585]),
            {
              "landcover": 2,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([73.51935756490958, 22.878926010745598]),
            {
              "landcover": 2,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([73.46245181844962, 22.875446522872654]),
            {
              "landcover": 2,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([73.9407862453295, 22.971455527081]),
            {
              "landcover": 2,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([73.60993039892448, 23.848953552855935]),
            {
              "landcover": 2,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([73.97651326940787, 22.68485215561752]),
            {
              "landcover": 2,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([72.8928149967028, 22.412483226975223]),
            {
              "landcover": 2,
              "system:index": "29"
            })]),
    v_urban_ahmedabad_2013 = ui.import && ui.import("v_urban_ahmedabad_2013", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            74.15986855163551,
            22.329117536234843
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.82341225280739,
            22.530951402010487
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.38258583679176,
            22.566464031964014
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.82341225280739,
            22.86162410713982
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.14088661804176,
            22.976727862540315
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.83989174499489,
            23.437419493864216
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.26561195983864,
            23.291180231331335
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.63252480163551,
            23.602374631147764
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.21504433288551,
            23.318927648338114
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.58583290710426,
            23.878931691847676
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.03376991882301,
            23.429859351368883
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.90880043640114,
            23.68288811161318
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.46061928405739,
            23.65270136133513
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.28209145202614,
            23.512997117544263
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.79481728210426,
            23.977145765131237
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.69731361999489,
            23.530930062291713
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.05986244811989,
            23.219567409549924
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.53938515319801,
            23.00105377796259
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.91978676452614,
            22.845478702466988
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.52702553405739,
            22.581987484713302
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.58607704772926,
            22.755594035415253
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.41829140319801,
            23.39865881007675
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.65861733093239,
            23.331843054732726
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.51510841979957,
            22.782185813285803
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.28233559265114,
            22.36562390888985
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.82066567077614,
            22.224584390905132
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.29950173034645,
            23.64734469934909
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.31711037292457,
            22.988985123987792
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.06785805358864,
            22.794154576371298
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.09120400085426,
            23.13079175806916
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 0
      },
      "color": "#d63000",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": true
    }) || 
    /* color: #d63000 */
    /* shown: false */
    /* locked: true */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([74.15986855163551, 22.329117536234843]),
            {
              "landcover": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([73.82341225280739, 22.530951402010487]),
            {
              "landcover": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([73.38258583679176, 22.566464031964014]),
            {
              "landcover": 0,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([73.82341225280739, 22.86162410713982]),
            {
              "landcover": 0,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([73.14088661804176, 22.976727862540315]),
            {
              "landcover": 0,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([73.83989174499489, 23.437419493864216]),
            {
              "landcover": 0,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([74.26561195983864, 23.291180231331335]),
            {
              "landcover": 0,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([73.63252480163551, 23.602374631147764]),
            {
              "landcover": 0,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([73.21504433288551, 23.318927648338114]),
            {
              "landcover": 0,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([73.58583290710426, 23.878931691847676]),
            {
              "landcover": 0,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([73.03376991882301, 23.429859351368883]),
            {
              "landcover": 0,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([72.90880043640114, 23.68288811161318]),
            {
              "landcover": 0,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([74.46061928405739, 23.65270136133513]),
            {
              "landcover": 0,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([74.28209145202614, 23.512997117544263]),
            {
              "landcover": 0,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([72.79481728210426, 23.977145765131237]),
            {
              "landcover": 0,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([72.69731361999489, 23.530930062291713]),
            {
              "landcover": 0,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([73.05986244811989, 23.219567409549924]),
            {
              "landcover": 0,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([72.53938515319801, 23.00105377796259]),
            {
              "landcover": 0,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([72.91978676452614, 22.845478702466988]),
            {
              "landcover": 0,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([72.52702553405739, 22.581987484713302]),
            {
              "landcover": 0,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([72.58607704772926, 22.755594035415253]),
            {
              "landcover": 0,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([73.41829140319801, 23.39865881007675]),
            {
              "landcover": 0,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([73.65861733093239, 23.331843054732726]),
            {
              "landcover": 0,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([73.51510841979957, 22.782185813285803]),
            {
              "landcover": 0,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([73.28233559265114, 22.36562390888985]),
            {
              "landcover": 0,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([73.82066567077614, 22.224584390905132]),
            {
              "landcover": 0,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([73.29950173034645, 23.64734469934909]),
            {
              "landcover": 0,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([74.31711037292457, 22.988985123987792]),
            {
              "landcover": 0,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([74.06785805358864, 22.794154576371298]),
            {
              "landcover": 0,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([74.09120400085426, 23.13079175806916]),
            {
              "landcover": 0,
              "system:index": "29"
            })]),
    v_water_ahmedabad_2013 = ui.import && ui.import("v_water_ahmedabad_2013", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            73.67509682311989,
            22.24769548592574
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.86049111022926,
            22.419817656183017
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.5549338592527,
            22.38363248935543
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.99129707946754,
            22.376330831594313
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.88177712097145,
            22.886516093112107
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.00091011657692,
            23.422201538648046
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.8903601898191,
            23.23367780058315
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.37101204528786,
            23.48582292281819
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.4502204193113,
            23.105531333892735
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.39734871520973,
            23.680904597256188
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.7965338958738,
            23.85999728956759
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.01969368591286,
            23.862509114989038
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.55503653722859,
            22.649046034871496
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.61666297155476,
            22.70939192587713
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.53131823465345,
            22.73907994850271
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.25856165811537,
            22.655858055261156
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.24242548868177,
            22.555386150528133
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.72134737894056,
            23.453502069397423
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.84917615345009,
            23.409306697835397
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.13078664234169,
            23.51457485688496
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.04538510730751,
            22.813454468646285
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.10057423999794,
            22.825796057878247
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.51615308216103,
            22.470530944451184
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.91586659839638,
            22.473941408748804
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.28399442127235,
            22.311018040605877
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.91148923328407,
            22.979892353632824
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.06735776355751,
            23.434273155380318
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.39093945911415,
            23.254441209036557
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.24159406116493,
            23.27399652265292
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.64190839221962,
            22.78085463935622
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 1
      },
      "color": "#98ff00",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": true
    }) || 
    /* color: #98ff00 */
    /* shown: false */
    /* locked: true */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([73.67509682311989, 22.24769548592574]),
            {
              "landcover": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([73.86049111022926, 22.419817656183017]),
            {
              "landcover": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([73.5549338592527, 22.38363248935543]),
            {
              "landcover": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([73.99129707946754, 22.376330831594313]),
            {
              "landcover": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([73.88177712097145, 22.886516093112107]),
            {
              "landcover": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([74.00091011657692, 23.422201538648046]),
            {
              "landcover": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([73.8903601898191, 23.23367780058315]),
            {
              "landcover": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([74.37101204528786, 23.48582292281819]),
            {
              "landcover": 1,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([73.4502204193113, 23.105531333892735]),
            {
              "landcover": 1,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([73.39734871520973, 23.680904597256188]),
            {
              "landcover": 1,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([72.7965338958738, 23.85999728956759]),
            {
              "landcover": 1,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([73.01969368591286, 23.862509114989038]),
            {
              "landcover": 1,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([72.55503653722859, 22.649046034871496]),
            {
              "landcover": 1,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([72.61666297155476, 22.70939192587713]),
            {
              "landcover": 1,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([72.53131823465345, 22.73907994850271]),
            {
              "landcover": 1,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([73.25856165811537, 22.655858055261156]),
            {
              "landcover": 1,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([73.24242548868177, 22.555386150528133]),
            {
              "landcover": 1,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([72.72134737894056, 23.453502069397423]),
            {
              "landcover": 1,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([72.84917615345009, 23.409306697835397]),
            {
              "landcover": 1,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([73.13078664234169, 23.51457485688496]),
            {
              "landcover": 1,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([73.04538510730751, 22.813454468646285]),
            {
              "landcover": 1,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([73.10057423999794, 22.825796057878247]),
            {
              "landcover": 1,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([72.51615308216103, 22.470530944451184]),
            {
              "landcover": 1,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([72.91586659839638, 22.473941408748804]),
            {
              "landcover": 1,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([73.28399442127235, 22.311018040605877]),
            {
              "landcover": 1,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([72.91148923328407, 22.979892353632824]),
            {
              "landcover": 1,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([73.06735776355751, 23.434273155380318]),
            {
              "landcover": 1,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([73.39093945911415, 23.254441209036557]),
            {
              "landcover": 1,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([73.24159406116493, 23.27399652265292]),
            {
              "landcover": 1,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([73.64190839221962, 22.78085463935622]),
            {
              "landcover": 1,
              "system:index": "29"
            })]),
    v_vegetation_ahmedabad_2013 = ui.import && ui.import("v_vegetation_ahmedabad_2013", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            72.74949867858864,
            22.57153651855551
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.10037453308082,
            22.624152546279895
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.69662697448707,
            22.79643970862075
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.41647560729957,
            22.798971724005153
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.8460715545652,
            22.41166369389891
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.74925453796364,
            22.299897181850756
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.61055214538551,
            22.58738683589962
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.0767844451902,
            22.7590870211627
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.23333962097145,
            22.803402637752228
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.93563824380095,
            22.981639530625205
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.85839062417205,
            22.94797353935374
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.44718914712126,
            23.560852920911955
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.39097475028186,
            23.743104535463196
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.93094281390866,
            23.777826065339855
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.0021822853442,
            23.817877851725914
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.63335446551999,
            23.436180533673426
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.1339190407153,
            23.452559512381974
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.84415463641842,
            23.947372433305887
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.6973841591235,
            23.788350671645528
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.97478894427975,
            23.765415360583336
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.09237698749264,
            23.76635798730207
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.1250749771875,
            23.16032588925987
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.45157491615234,
            23.08454760603615
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.10069906166015,
            22.37207130780317
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.02671300819335,
            22.420320115113533
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.59336721351562,
            23.558930256020915
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.84355031898437,
            23.172002037982896
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.99735891273437,
            22.960286858432415
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.06577932289062,
            23.188098002538396
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.0306745713037,
            23.23030125630649
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 2
      },
      "color": "#0b4a8b",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": true
    }) || 
    /* color: #0b4a8b */
    /* shown: false */
    /* locked: true */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([72.74949867858864, 22.57153651855551]),
            {
              "landcover": 2,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([73.10037453308082, 22.624152546279895]),
            {
              "landcover": 2,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([72.69662697448707, 22.79643970862075]),
            {
              "landcover": 2,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([72.41647560729957, 22.798971724005153]),
            {
              "landcover": 2,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([73.8460715545652, 22.41166369389891]),
            {
              "landcover": 2,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([73.74925453796364, 22.299897181850756]),
            {
              "landcover": 2,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([73.61055214538551, 22.58738683589962]),
            {
              "landcover": 2,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([74.0767844451902, 22.7590870211627]),
            {
              "landcover": 2,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([74.23333962097145, 22.803402637752228]),
            {
              "landcover": 2,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([73.93563824380095, 22.981639530625205]),
            {
              "landcover": 2,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([73.85839062417205, 22.94797353935374]),
            {
              "landcover": 2,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([74.44718914712126, 23.560852920911955]),
            {
              "landcover": 2,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([74.39097475028186, 23.743104535463196]),
            {
              "landcover": 2,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([73.93094281390866, 23.777826065339855]),
            {
              "landcover": 2,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([74.0021822853442, 23.817877851725914]),
            {
              "landcover": 2,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([72.63335446551999, 23.436180533673426]),
            {
              "landcover": 2,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([73.1339190407153, 23.452559512381974]),
            {
              "landcover": 2,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([72.84415463641842, 23.947372433305887]),
            {
              "landcover": 2,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([72.6973841591235, 23.788350671645528]),
            {
              "landcover": 2,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([72.97478894427975, 23.765415360583336]),
            {
              "landcover": 2,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([73.09237698749264, 23.76635798730207]),
            {
              "landcover": 2,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([73.1250749771875, 23.16032588925987]),
            {
              "landcover": 2,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([73.45157491615234, 23.08454760603615]),
            {
              "landcover": 2,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([73.10069906166015, 22.37207130780317]),
            {
              "landcover": 2,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([73.02671300819335, 22.420320115113533]),
            {
              "landcover": 2,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([73.59336721351562, 23.558930256020915]),
            {
              "landcover": 2,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([72.84355031898437, 23.172002037982896]),
            {
              "landcover": 2,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([72.99735891273437, 22.960286858432415]),
            {
              "landcover": 2,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([74.06577932289062, 23.188098002538396]),
            {
              "landcover": 2,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([74.0306745713037, 23.23030125630649]),
            {
              "landcover": 2,
              "system:index": "29"
            })]),
    v_urban_ahmedabad_2018 = ui.import && ui.import("v_urban_ahmedabad_2018", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            72.64718849792457,
            23.039298134776836
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.83395607604957,
            23.130889019494322
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.43295509948707,
            22.911598733867518
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.44430316112953,
            22.729923535015825
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.85629046581703,
            22.688118152366446
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.34061968944984,
            22.480803675958267
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.54386675976234,
            22.494126815160392
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.8988624873014,
            22.40591649578493
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.22202039968306,
            22.438287949421714
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.73357130300337,
            22.62728755678111
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.06118979503167,
            22.136655226982665
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.05706992198479,
            22.480960595754603
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.46861472178948,
            22.283501695859666
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.29225331844096,
            22.94741026939528
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.8061082989097,
            23.10602597161226
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.73813039363627,
            22.754419663859178
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.9372575909019,
            23.22218321120487
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.43301564754252,
            23.541723424480804
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.6444709908066,
            23.709341531812868
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.3972786079941,
            23.404701595254032
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.14321977010347,
            23.611228973442607
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.00314408650972,
            23.845695958842605
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.75663834920503,
            23.94237673066518
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.63304215779878,
            23.78287757992724
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.8547304138015,
            23.54200284499771
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.55947284544213,
            23.333475540705837
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.90760211790307,
            23.286811217265473
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.29555682981713,
            23.461402912697903
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.09986286009057,
            22.782558836816477
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.36765460813744,
            22.783191909508087
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 0
      },
      "color": "#d63000",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": true
    }) || 
    /* color: #d63000 */
    /* shown: false */
    /* locked: true */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([72.64718849792457, 23.039298134776836]),
            {
              "landcover": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([72.83395607604957, 23.130889019494322]),
            {
              "landcover": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([72.43295509948707, 22.911598733867518]),
            {
              "landcover": 0,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([72.44430316112953, 22.729923535015825]),
            {
              "landcover": 0,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([72.85629046581703, 22.688118152366446]),
            {
              "landcover": 0,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([72.34061968944984, 22.480803675958267]),
            {
              "landcover": 0,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([72.54386675976234, 22.494126815160392]),
            {
              "landcover": 0,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([72.8988624873014, 22.40591649578493]),
            {
              "landcover": 0,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([73.22202039968306, 22.438287949421714]),
            {
              "landcover": 0,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([73.73357130300337, 22.62728755678111]),
            {
              "landcover": 0,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([74.06118979503167, 22.136655226982665]),
            {
              "landcover": 0,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([74.05706992198479, 22.480960595754603]),
            {
              "landcover": 0,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([73.46861472178948, 22.283501695859666]),
            {
              "landcover": 0,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([74.29225331844096, 22.94741026939528]),
            {
              "landcover": 0,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([73.8061082989097, 23.10602597161226]),
            {
              "landcover": 0,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([73.73813039363627, 22.754419663859178]),
            {
              "landcover": 0,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([73.9372575909019, 23.22218321120487]),
            {
              "landcover": 0,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([74.43301564754252, 23.541723424480804]),
            {
              "landcover": 0,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([73.6444709908066, 23.709341531812868]),
            {
              "landcover": 0,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([73.3972786079941, 23.404701595254032]),
            {
              "landcover": 0,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([73.14321977010347, 23.611228973442607]),
            {
              "landcover": 0,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([73.00314408650972, 23.845695958842605]),
            {
              "landcover": 0,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([72.75663834920503, 23.94237673066518]),
            {
              "landcover": 0,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([72.63304215779878, 23.78287757992724]),
            {
              "landcover": 0,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([72.8547304138015, 23.54200284499771]),
            {
              "landcover": 0,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([72.55947284544213, 23.333475540705837]),
            {
              "landcover": 0,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([72.90760211790307, 23.286811217265473]),
            {
              "landcover": 0,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([73.29555682981713, 23.461402912697903]),
            {
              "landcover": 0,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([73.09986286009057, 22.782558836816477]),
            {
              "landcover": 0,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([73.36765460813744, 22.783191909508087]),
            {
              "landcover": 0,
              "system:index": "29"
            })]),
    v_water_ahmedabad_2018 = ui.import && ui.import("v_water_ahmedabad_2018", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            73.4479921325515,
            23.106937869940698
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.1733339294265,
            22.86356823974907
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.25985126341088,
            22.58045904219563
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.70273761594994,
            22.556998745736344
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.66767335344767,
            22.24991574092978
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.98112702776407,
            22.27978192934004
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.84070802141642,
            22.140245929845467
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.28383851458048,
            22.311865088212297
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.5161688368461,
            22.469949368630143
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.69263673235392,
            22.669677214241705
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.63976502825236,
            22.79633795476104
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.55839753557657,
            22.991481420137504
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.80834986443622,
            23.490368847585028
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.2464296984206,
            23.354905066262358
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.35974263595715,
            23.487112462022267
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.07591390060558,
            23.60485803577463
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.9996962492384,
            23.422265339167296
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.39177083419933,
            23.7746298997438
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.86957692550793,
            23.870735793417378
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.91386556076183,
            23.76426128948475
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.51183461593762,
            23.817352416924162
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.03953340929225,
            23.707427118232392
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.64482925323092,
            23.78835061821543
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.83365676787936,
            23.662313642836132
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.95879791167819,
            23.07501545357763
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.07243774322116,
            23.10533405245871
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.66972015288913,
            22.837441997659358
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.88302276519381,
            22.88869068916269
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.96713683990085,
            23.116543884845612
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.93898437408053,
            23.346847874565327
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 1
      },
      "color": "#98ff00",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": true
    }) || 
    /* color: #98ff00 */
    /* shown: false */
    /* locked: true */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([73.4479921325515, 23.106937869940698]),
            {
              "landcover": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([73.1733339294265, 22.86356823974907]),
            {
              "landcover": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([73.25985126341088, 22.58045904219563]),
            {
              "landcover": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([73.70273761594994, 22.556998745736344]),
            {
              "landcover": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([73.66767335344767, 22.24991574092978]),
            {
              "landcover": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([73.98112702776407, 22.27978192934004]),
            {
              "landcover": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([73.84070802141642, 22.140245929845467]),
            {
              "landcover": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([73.28383851458048, 22.311865088212297]),
            {
              "landcover": 1,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([72.5161688368461, 22.469949368630143]),
            {
              "landcover": 1,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([72.69263673235392, 22.669677214241705]),
            {
              "landcover": 1,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([72.63976502825236, 22.79633795476104]),
            {
              "landcover": 1,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([72.55839753557657, 22.991481420137504]),
            {
              "landcover": 1,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([73.80834986443622, 23.490368847585028]),
            {
              "landcover": 1,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([74.2464296984206, 23.354905066262358]),
            {
              "landcover": 1,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([73.35974263595715, 23.487112462022267]),
            {
              "landcover": 1,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([74.07591390060558, 23.60485803577463]),
            {
              "landcover": 1,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([73.9996962492384, 23.422265339167296]),
            {
              "landcover": 1,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([74.39177083419933, 23.7746298997438]),
            {
              "landcover": 1,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([73.86957692550793, 23.870735793417378]),
            {
              "landcover": 1,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([73.91386556076183, 23.76426128948475]),
            {
              "landcover": 1,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([73.51183461593762, 23.817352416924162]),
            {
              "landcover": 1,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([73.03953340929225, 23.707427118232392]),
            {
              "landcover": 1,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([72.64482925323092, 23.78835061821543]),
            {
              "landcover": 1,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([72.83365676787936, 23.662313642836132]),
            {
              "landcover": 1,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([72.95879791167819, 23.07501545357763]),
            {
              "landcover": 1,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([73.07243774322116, 23.10533405245871]),
            {
              "landcover": 1,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([72.66972015288913, 22.837441997659358]),
            {
              "landcover": 1,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([73.88302276519381, 22.88869068916269]),
            {
              "landcover": 1,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([73.96713683990085, 23.116543884845612]),
            {
              "landcover": 1,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([73.93898437408053, 23.346847874565327]),
            {
              "landcover": 1,
              "system:index": "29"
            })]),
    v_vegetation_ahmedabad_2018 = ui.import && ui.import("v_vegetation_ahmedabad_2018", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            74.41070983794772,
            23.633694788763485
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.12884185699069,
            23.689983062090928
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.44986803054988,
            23.586838175311577
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.48806268692195,
            23.614916766747253
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.2019003976395,
            23.753686222008128
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.03573218474888,
            23.854203622648686
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.93513861785435,
            23.847452548641098
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.86801901946568,
            23.953074341082473
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.75420752654576,
            23.907728749025832
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.78235999236607,
            24.027099297061095
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.6584726112952,
            23.34257649917632
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.80026490865848,
            23.36984044823014
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.46449525533816,
            22.919825713784856
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.87510926901004,
            22.77112204534919
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.16350038229129,
            23.02603314488258
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.78447206197879,
            22.411668783660556
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.07354982076785,
            22.73566231789107
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            72.36836488424441,
            22.65521065406436
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.6420923012366,
            22.5816860152259
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.70869691549441,
            22.30371397294145
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.14523988106478,
            23.011778980575
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.2199912430443,
            23.457919259923752
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.79849008337634,
            23.258157599816883
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.18832706607643,
            23.432844530422532
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.24600528873268,
            23.341775951307678
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.36167127117339,
            23.940886360653582
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.59616071209136,
            23.968496472117458
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.39634686931792,
            22.49091523624667
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            73.1865766666812,
            22.327773586730622
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            74.08230573162261,
            23.504108969561397
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 2
      },
      "color": "#0b4a8b",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": true
    }) || 
    /* color: #0b4a8b */
    /* shown: false */
    /* locked: true */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([74.41070983794772, 23.633694788763485]),
            {
              "landcover": 2,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([74.12884185699069, 23.689983062090928]),
            {
              "landcover": 2,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([73.44986803054988, 23.586838175311577]),
            {
              "landcover": 2,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([73.48806268692195, 23.614916766747253]),
            {
              "landcover": 2,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([73.2019003976395, 23.753686222008128]),
            {
              "landcover": 2,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([73.03573218474888, 23.854203622648686]),
            {
              "landcover": 2,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([72.93513861785435, 23.847452548641098]),
            {
              "landcover": 2,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([72.86801901946568, 23.953074341082473]),
            {
              "landcover": 2,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([72.75420752654576, 23.907728749025832]),
            {
              "landcover": 2,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([72.78235999236607, 24.027099297061095]),
            {
              "landcover": 2,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([72.6584726112952, 23.34257649917632]),
            {
              "landcover": 2,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([72.80026490865848, 23.36984044823014]),
            {
              "landcover": 2,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([72.46449525533816, 22.919825713784856]),
            {
              "landcover": 2,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([72.87510926901004, 22.77112204534919]),
            {
              "landcover": 2,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([73.16350038229129, 23.02603314488258]),
            {
              "landcover": 2,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([72.78447206197879, 22.411668783660556]),
            {
              "landcover": 2,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([73.07354982076785, 22.73566231789107]),
            {
              "landcover": 2,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([72.36836488424441, 22.65521065406436]),
            {
              "landcover": 2,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([73.6420923012366, 22.5816860152259]),
            {
              "landcover": 2,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([73.70869691549441, 22.30371397294145]),
            {
              "landcover": 2,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([74.14523988106478, 23.011778980575]),
            {
              "landcover": 2,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([73.2199912430443, 23.457919259923752]),
            {
              "landcover": 2,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([73.79849008337634, 23.258157599816883]),
            {
              "landcover": 2,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([73.18832706607643, 23.432844530422532]),
            {
              "landcover": 2,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([73.24600528873268, 23.341775951307678]),
            {
              "landcover": 2,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([73.36167127117339, 23.940886360653582]),
            {
              "landcover": 2,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([73.59616071209136, 23.968496472117458]),
            {
              "landcover": 2,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([73.39634686931792, 22.49091523624667]),
            {
              "landcover": 2,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([73.1865766666812, 22.327773586730622]),
            {
              "landcover": 2,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([74.08230573162261, 23.504108969561397]),
            {
              "landcover": 2,
              "system:index": "29"
            })]),
    v_urban_kolkata_1988 = ui.import && ui.import("v_urban_kolkata_1988", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            88.6836469912282,
            22.496881875262346
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.18994887111101,
            22.67059587130632
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.32521803615008,
            22.58376625586943
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            87.82602675197039,
            22.77804022831028
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            87.84997784498772,
            22.532442730222506
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            87.92688214186272,
            23.083744177957808
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.3100303352221,
            23.18098577155516
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            87.9807680420824,
            23.376482946860687
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.53420432137928,
            23.485477171229658
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.12702353524647,
            23.76542369708982
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.68732626962147,
            23.723941366597906
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.87821372079334,
            23.656032718513984
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.30130042863486,
            23.97747628456147
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.81079139543174,
            23.851936930434952
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.13420142961142,
            23.765872188919754
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.36697425675986,
            23.58790862236728
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.71716346574424,
            23.620626807205262
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.28389015031455,
            23.48970514296346
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.80186500383017,
            23.330914213863664
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.80186500383017,
            23.330914213863664
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.1602939589083,
            23.118897536247513
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.58258094621299,
            23.08605539482415
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.2097324354708,
            22.427538899764063
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.56266822648642,
            22.45482872631612
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.96734657121299,
            22.2827498234798
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.5008701307833,
            22.671052797462306
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.67552223039267,
            22.93753421091556
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.08613624406455,
            22.989377192877424
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.3089717263957,
            23.578252508949074
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.15962632844648,
            23.539543586369238
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 0
      },
      "color": "#ffc82d",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": true
    }) || 
    /* color: #ffc82d */
    /* shown: false */
    /* locked: true */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([88.6836469912282, 22.496881875262346]),
            {
              "landcover": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([88.18994887111101, 22.67059587130632]),
            {
              "landcover": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([88.32521803615008, 22.58376625586943]),
            {
              "landcover": 0,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([87.82602675197039, 22.77804022831028]),
            {
              "landcover": 0,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([87.84997784498772, 22.532442730222506]),
            {
              "landcover": 0,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([87.92688214186272, 23.083744177957808]),
            {
              "landcover": 0,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([88.3100303352221, 23.18098577155516]),
            {
              "landcover": 0,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([87.9807680420824, 23.376482946860687]),
            {
              "landcover": 0,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([88.53420432137928, 23.485477171229658]),
            {
              "landcover": 0,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([88.12702353524647, 23.76542369708982]),
            {
              "landcover": 0,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([88.68732626962147, 23.723941366597906]),
            {
              "landcover": 0,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([88.87821372079334, 23.656032718513984]),
            {
              "landcover": 0,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([88.30130042863486, 23.97747628456147]),
            {
              "landcover": 0,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([88.81079139543174, 23.851936930434952]),
            {
              "landcover": 0,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([89.13420142961142, 23.765872188919754]),
            {
              "landcover": 0,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([89.36697425675986, 23.58790862236728]),
            {
              "landcover": 0,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([89.71716346574424, 23.620626807205262]),
            {
              "landcover": 0,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([89.28389015031455, 23.48970514296346]),
            {
              "landcover": 0,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([88.80186500383017, 23.330914213863664]),
            {
              "landcover": 0,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([88.80186500383017, 23.330914213863664]),
            {
              "landcover": 0,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([89.1602939589083, 23.118897536247513]),
            {
              "landcover": 0,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([89.58258094621299, 23.08605539482415]),
            {
              "landcover": 0,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([89.2097324354708, 22.427538899764063]),
            {
              "landcover": 0,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([89.56266822648642, 22.45482872631612]),
            {
              "landcover": 0,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([88.96734657121299, 22.2827498234798]),
            {
              "landcover": 0,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([89.5008701307833, 22.671052797462306]),
            {
              "landcover": 0,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([88.67552223039267, 22.93753421091556]),
            {
              "landcover": 0,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([89.08613624406455, 22.989377192877424]),
            {
              "landcover": 0,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([88.3089717263957, 23.578252508949074]),
            {
              "landcover": 0,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([88.15962632844648, 23.539543586369238]),
            {
              "landcover": 0,
              "system:index": "29"
            })]),
    v_water_kolkata_1988 = ui.import && ui.import("v_water_kolkata_1988", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            89.21774705598554,
            22.357167168334918
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.42854722688398,
            22.28475486105252
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.93896897981367,
            22.564667097497704
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.01861985871992,
            22.264421850200655
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.5342906350871,
            22.671151463787616
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.2379039163371,
            22.54437502080676
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.89502366731367,
            22.671151463787602
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            87.88393815705976,
            22.66465701283436
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.38810762117109,
            23.189863235571
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.49144777009687,
            23.12862593655787
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.21747621247968,
            23.09689148959624
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.93374939815506,
            23.28494590082531
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.87195130245193,
            23.345481091496953
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.32960053340896,
            23.69726541851095
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.19810791866287,
            23.714712030870814
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.40890808956131,
            23.683746619947094
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.25784607784256,
            23.639250465895735
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.6938659753035,
            23.131593255209133
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.50229187862381,
            23.161899076895697
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.39792176143631,
            23.067486523328046
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.1338073815535,
            23.576647238489254
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.33018799678787,
            23.450406353943226
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.81461640254959,
            23.79861174510646
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            87.95699616329178,
            23.00556136949095
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.42839156426534,
            23.82363111695097
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.49765692986593,
            23.825672551368456
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.6706057671462,
            23.37029658790076
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.31214724816427,
            23.323921056613983
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.70056067742452,
            22.673331393314026
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.4989577416335,
            22.937990359568094
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 1
      },
      "color": "#d63000",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": true
    }) || 
    /* color: #d63000 */
    /* shown: false */
    /* locked: true */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([89.21774705598554, 22.357167168334918]),
            {
              "landcover": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([89.42854722688398, 22.28475486105252]),
            {
              "landcover": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([88.93896897981367, 22.564667097497704]),
            {
              "landcover": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([89.01861985871992, 22.264421850200655]),
            {
              "landcover": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([89.5342906350871, 22.671151463787616]),
            {
              "landcover": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([88.2379039163371, 22.54437502080676]),
            {
              "landcover": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([88.89502366731367, 22.671151463787602]),
            {
              "landcover": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([87.88393815705976, 22.66465701283436]),
            {
              "landcover": 1,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([88.38810762117109, 23.189863235571]),
            {
              "landcover": 1,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([88.49144777009687, 23.12862593655787]),
            {
              "landcover": 1,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([88.21747621247968, 23.09689148959624]),
            {
              "landcover": 1,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([88.93374939815506, 23.28494590082531]),
            {
              "landcover": 1,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([88.87195130245193, 23.345481091496953]),
            {
              "landcover": 1,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([89.32960053340896, 23.69726541851095]),
            {
              "landcover": 1,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([89.19810791866287, 23.714712030870814]),
            {
              "landcover": 1,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([89.40890808956131, 23.683746619947094]),
            {
              "landcover": 1,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([89.25784607784256, 23.639250465895735]),
            {
              "landcover": 1,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([89.6938659753035, 23.131593255209133]),
            {
              "landcover": 1,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([89.50229187862381, 23.161899076895697]),
            {
              "landcover": 1,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([89.39792176143631, 23.067486523328046]),
            {
              "landcover": 1,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([88.1338073815535, 23.576647238489254]),
            {
              "landcover": 1,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([88.33018799678787, 23.450406353943226]),
            {
              "landcover": 1,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([88.81461640254959, 23.79861174510646]),
            {
              "landcover": 1,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([87.95699616329178, 23.00556136949095]),
            {
              "landcover": 1,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([88.42839156426534, 23.82363111695097]),
            {
              "landcover": 1,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([88.49765692986593, 23.825672551368456]),
            {
              "landcover": 1,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([88.6706057671462, 23.37029658790076]),
            {
              "landcover": 1,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([89.31214724816427, 23.323921056613983]),
            {
              "landcover": 1,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([88.70056067742452, 22.673331393314026]),
            {
              "landcover": 1,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([89.4989577416335, 22.937990359568094]),
            {
              "landcover": 1,
              "system:index": "29"
            })]),
    v_vegetation_kolkata_1988 = ui.import && ui.import("v_vegetation_kolkata_1988", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            89.48634063042745,
            22.386893360726617
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.21889220513448,
            22.42180821303066
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.21118759127198,
            22.238744007558118
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.03780960054932,
            22.32991848857693
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.73551391573487,
            22.377546971889725
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.2493586376666,
            22.834382905902906
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            87.92594860348692,
            22.945715943817415
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.47739674145681,
            23.647520466316067
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.22883106762869,
            23.559117818594185
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.64871479565603,
            23.59310168755644
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.33571515364655,
            23.905373666038187
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.22207532210358,
            23.788560933970174
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.57123456282623,
            23.895329399423296
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.15478406233795,
            24.01737703883959
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.1022556809903,
            23.727757904420265
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.23288998885162,
            23.69443775186318
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.65878641799097,
            23.607482439311735
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.45141947463159,
            23.229432857034233
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.22482645705347,
            23.60999913694054
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.43940317824487,
            22.801894899206946
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.64505350783472,
            22.81233874143027
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.16783487990503,
            22.795564908310094
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.28549540236597,
            23.246783709682806
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.435527445823,
            23.080438394945737
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.6630032358557,
            23.281310642753034
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.81286361793578,
            23.30054668991401
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.79085240944154,
            22.815607682537735
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.17203743532993,
            23.139039365162233
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.0471044640016,
            22.45216990804451
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.26014459899824,
            23.840555938992804
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 2
      },
      "color": "#98ff00",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": true
    }) || 
    /* color: #98ff00 */
    /* shown: false */
    /* locked: true */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([89.48634063042745, 22.386893360726617]),
            {
              "landcover": 2,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([89.21889220513448, 22.42180821303066]),
            {
              "landcover": 2,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([89.21118759127198, 22.238744007558118]),
            {
              "landcover": 2,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([89.03780960054932, 22.32991848857693]),
            {
              "landcover": 2,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([88.73551391573487, 22.377546971889725]),
            {
              "landcover": 2,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([88.2493586376666, 22.834382905902906]),
            {
              "landcover": 2,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([87.92594860348692, 22.945715943817415]),
            {
              "landcover": 2,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([88.47739674145681, 23.647520466316067]),
            {
              "landcover": 2,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([88.22883106762869, 23.559117818594185]),
            {
              "landcover": 2,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([88.64871479565603, 23.59310168755644]),
            {
              "landcover": 2,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([88.33571515364655, 23.905373666038187]),
            {
              "landcover": 2,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([88.22207532210358, 23.788560933970174]),
            {
              "landcover": 2,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([88.57123456282623, 23.895329399423296]),
            {
              "landcover": 2,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([88.15478406233795, 24.01737703883959]),
            {
              "landcover": 2,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([88.1022556809903, 23.727757904420265]),
            {
              "landcover": 2,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([88.23288998885162, 23.69443775186318]),
            {
              "landcover": 2,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([89.65878641799097, 23.607482439311735]),
            {
              "landcover": 2,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([89.45141947463159, 23.229432857034233]),
            {
              "landcover": 2,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([89.22482645705347, 23.60999913694054]),
            {
              "landcover": 2,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([89.43940317824487, 22.801894899206946]),
            {
              "landcover": 2,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([89.64505350783472, 22.81233874143027]),
            {
              "landcover": 2,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([89.16783487990503, 22.795564908310094]),
            {
              "landcover": 2,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([88.28549540236597, 23.246783709682806]),
            {
              "landcover": 2,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([88.435527445823, 23.080438394945737]),
            {
              "landcover": 2,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([88.6630032358557, 23.281310642753034]),
            {
              "landcover": 2,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([88.81286361793578, 23.30054668991401]),
            {
              "landcover": 2,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([88.79085240944154, 22.815607682537735]),
            {
              "landcover": 2,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([89.17203743532993, 23.139039365162233]),
            {
              "landcover": 2,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([88.0471044640016, 22.45216990804451]),
            {
              "landcover": 2,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([89.26014459899824, 23.840555938992804]),
            {
              "landcover": 2,
              "system:index": "29"
            })]),
    v_urban_kolkata_1993 = ui.import && ui.import("v_urban_kolkata_1993", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            87.95492740726752,
            22.611076055031212
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.2391986475019,
            22.676982429407555
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.07895657951447,
            22.480437550948135
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.24529645378205,
            22.480120316879532
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            87.77142522270294,
            22.432685651306812
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.18153760368439,
            22.365551389241933
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.00918958122345,
            22.445537447763556
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.71341702873322,
            22.70691501402625
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.20323941642853,
            23.02657743060597
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.20323941642853,
            23.02657743060597
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.20323941642853,
            23.02657743060597
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.32521817619416,
            23.464739071071328
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.52915189201447,
            23.354151783912357
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.83917233879181,
            23.78306392508557
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.56108090812775,
            23.679032969727295
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.30459028975946,
            23.785577240088024
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.33263422926777,
            23.719514735513584
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.58909632643574,
            23.595928237055773
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.62308527907246,
            23.201437655103224
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.91284968336933,
            23.22289378680316
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.48963190993183,
            23.07862982079805
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.0468476784997,
            23.317568544062645
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.08436904080439,
            22.988640323624224
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.6727250588708,
            23.904888153399313
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.17147383816767,
            24.016264746762428
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.64216933377314,
            22.3947422988735
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.95562300808955,
            23.684048030072887
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.11870131619501,
            22.784313620905696
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.53383690242761,
            22.554951717723934
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            87.91507011775964,
            23.010762490662827
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 0
      },
      "color": "#d63000",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": true
    }) || 
    /* color: #d63000 */
    /* shown: false */
    /* locked: true */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([87.95492740726752, 22.611076055031212]),
            {
              "landcover": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([88.2391986475019, 22.676982429407555]),
            {
              "landcover": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([88.07895657951447, 22.480437550948135]),
            {
              "landcover": 0,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([88.24529645378205, 22.480120316879532]),
            {
              "landcover": 0,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([87.77142522270294, 22.432685651306812]),
            {
              "landcover": 0,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([89.18153760368439, 22.365551389241933]),
            {
              "landcover": 0,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([89.00918958122345, 22.445537447763556]),
            {
              "landcover": 0,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([88.71341702873322, 22.70691501402625]),
            {
              "landcover": 0,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([88.20323941642853, 23.02657743060597]),
            {
              "landcover": 0,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([88.20323941642853, 23.02657743060597]),
            {
              "landcover": 0,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([88.20323941642853, 23.02657743060597]),
            {
              "landcover": 0,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([89.32521817619416, 23.464739071071328]),
            {
              "landcover": 0,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([89.52915189201447, 23.354151783912357]),
            {
              "landcover": 0,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([89.83917233879181, 23.78306392508557]),
            {
              "landcover": 0,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([89.56108090812775, 23.679032969727295]),
            {
              "landcover": 0,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([89.30459028975946, 23.785577240088024]),
            {
              "landcover": 0,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([88.33263422926777, 23.719514735513584]),
            {
              "landcover": 0,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([88.58909632643574, 23.595928237055773]),
            {
              "landcover": 0,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([88.62308527907246, 23.201437655103224]),
            {
              "landcover": 0,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([88.91284968336933, 23.22289378680316]),
            {
              "landcover": 0,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([89.48963190993183, 23.07862982079805]),
            {
              "landcover": 0,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([88.0468476784997, 23.317568544062645]),
            {
              "landcover": 0,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([89.08436904080439, 22.988640323624224]),
            {
              "landcover": 0,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([88.6727250588708, 23.904888153399313]),
            {
              "landcover": 0,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([88.17147383816767, 24.016264746762428]),
            {
              "landcover": 0,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([88.64216933377314, 22.3947422988735]),
            {
              "landcover": 0,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([88.95562300808955, 23.684048030072887]),
            {
              "landcover": 0,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([89.11870131619501, 22.784313620905696]),
            {
              "landcover": 0,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([89.53383690242761, 22.554951717723934]),
            {
              "landcover": 0,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([87.91507011775964, 23.010762490662827]),
            {
              "landcover": 0,
              "system:index": "29"
            })]),
    v_water_kolkata_1993 = ui.import && ui.import("v_water_kolkata_1993", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            87.91713005428308,
            22.910235499108413
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.38885551815027,
            23.1888713819366
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            87.92193657283777,
            22.64877032102402
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.13616997127527,
            22.400138498960626
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.85165459041589,
            22.90738930887872
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.71672874813073,
            22.937113236776238
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.47032219295495,
            22.234030278488344
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.53074699764245,
            22.60472157684473
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.89491325740808,
            22.67063099930756
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.54310661678308,
            23.806922934695073
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.81055504207605,
            23.760112155430562
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.48645836238855,
            23.60951252133641
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.06791758261517,
            23.57078500343154
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.22986674033001,
            23.834219850029925
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.71378016196087,
            23.32416143563395
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.82930826865032,
            23.33093948705097
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.11465234408753,
            23.169867556767908
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.35796899447816,
            22.63856328483634
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.39891023288148,
            22.56764529763999
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.23575944552796,
            22.867785258407228
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.29429597506898,
            22.857741124727884
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.58559756116942,
            23.78452990199483
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.49418787794188,
            23.697241629756135
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.44811592426181,
            23.633840503531587
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.37061081256748,
            23.52666098370451
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.94533310260654,
            22.288748921907896
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.78191147174716,
            22.499522998994685
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.73840866412998,
            23.165268386145673
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.40768966998935,
            22.887216225108133
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.04112015094638,
            23.783116156895186
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 1
      },
      "color": "#98ff00",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": true
    }) || 
    /* color: #98ff00 */
    /* shown: false */
    /* locked: true */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([87.91713005428308, 22.910235499108413]),
            {
              "landcover": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([88.38885551815027, 23.1888713819366]),
            {
              "landcover": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([87.92193657283777, 22.64877032102402]),
            {
              "landcover": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([88.13616997127527, 22.400138498960626]),
            {
              "landcover": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([88.85165459041589, 22.90738930887872]),
            {
              "landcover": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([88.71672874813073, 22.937113236776238]),
            {
              "landcover": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([89.47032219295495, 22.234030278488344]),
            {
              "landcover": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([89.53074699764245, 22.60472157684473]),
            {
              "landcover": 1,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([88.89491325740808, 22.67063099930756]),
            {
              "landcover": 1,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([89.54310661678308, 23.806922934695073]),
            {
              "landcover": 1,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([89.81055504207605, 23.760112155430562]),
            {
              "landcover": 1,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([89.48645836238855, 23.60951252133641]),
            {
              "landcover": 1,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([89.06791758261517, 23.57078500343154]),
            {
              "landcover": 1,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([88.22986674033001, 23.834219850029925]),
            {
              "landcover": 1,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([88.71378016196087, 23.32416143563395]),
            {
              "landcover": 1,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([88.82930826865032, 23.33093948705097]),
            {
              "landcover": 1,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([89.11465234408753, 23.169867556767908]),
            {
              "landcover": 1,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([88.35796899447816, 22.63856328483634]),
            {
              "landcover": 1,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([88.39891023288148, 22.56764529763999]),
            {
              "landcover": 1,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([89.23575944552796, 22.867785258407228]),
            {
              "landcover": 1,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([89.29429597506898, 22.857741124727884]),
            {
              "landcover": 1,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([88.58559756116942, 23.78452990199483]),
            {
              "landcover": 1,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([88.49418787794188, 23.697241629756135]),
            {
              "landcover": 1,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([88.44811592426181, 23.633840503531587]),
            {
              "landcover": 1,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([88.37061081256748, 23.52666098370451]),
            {
              "landcover": 1,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([88.94533310260654, 22.288748921907896]),
            {
              "landcover": 1,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([88.78191147174716, 22.499522998994685]),
            {
              "landcover": 1,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([89.73840866412998, 23.165268386145673]),
            {
              "landcover": 1,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([88.40768966998935, 22.887216225108133]),
            {
              "landcover": 1,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([89.04112015094638, 23.783116156895186]),
            {
              "landcover": 1,
              "system:index": "29"
            })]),
    v_vegetation_kolkata_1993 = ui.import && ui.import("v_vegetation_kolkata_1993", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            88.99614487018466,
            23.788456891047733
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.22514114704013,
            23.77651847650515
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.72697983112216,
            23.677198720691063
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.60098038043857,
            23.665879013430256
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.60338363971591,
            23.532169585845327
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.3829704317081,
            23.45754780313045
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.56115494098545,
            23.240272879808177
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.45989726399876,
            22.27010148475677
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.726559861655,
            22.464406715680408
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.6549045882175,
            22.80030365654947
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.41482280110813,
            22.70278810199957
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            87.79684184407688,
            22.602667462362596
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.199216111655,
            23.351147853244086
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.35998250383092,
            23.57978685601754
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.73626424211217,
            23.339800089459864
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.95280171769811,
            23.157788556001595
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.2267732753153,
            23.229424112407155
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.19577504533483,
            23.83189826539021
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.59196950334264,
            23.855763815065856
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.23972035783483,
            23.489134492984764
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.04951955217076,
            23.58041616780179
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            87.92386342424108,
            22.487248302676694
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.30769826310826,
            22.62485237874118
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.11931325334264,
            22.95972407488369
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.47362233537389,
            23.015350532079676
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.73901082414342,
            23.70213115064087
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.54881001847936,
            23.584506620857546
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.68912984269811,
            22.87244560180742
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.95074178117467,
            22.904074728975708
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.04436971086217,
            23.20213138884371
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 2
      },
      "color": "#0b4a8b",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": true
    }) || 
    /* color: #0b4a8b */
    /* shown: false */
    /* locked: true */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([88.99614487018466, 23.788456891047733]),
            {
              "landcover": 2,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([89.22514114704013, 23.77651847650515]),
            {
              "landcover": 2,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([88.72697983112216, 23.677198720691063]),
            {
              "landcover": 2,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([88.60098038043857, 23.665879013430256]),
            {
              "landcover": 2,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([88.60338363971591, 23.532169585845327]),
            {
              "landcover": 2,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([88.3829704317081, 23.45754780313045]),
            {
              "landcover": 2,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([88.56115494098545, 23.240272879808177]),
            {
              "landcover": 2,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([89.45989726399876, 22.27010148475677]),
            {
              "landcover": 2,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([88.726559861655, 22.464406715680408]),
            {
              "landcover": 2,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([89.6549045882175, 22.80030365654947]),
            {
              "landcover": 2,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([88.41482280110813, 22.70278810199957]),
            {
              "landcover": 2,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([87.79684184407688, 22.602667462362596]),
            {
              "landcover": 2,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([88.199216111655, 23.351147853244086]),
            {
              "landcover": 2,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([89.35998250383092, 23.57978685601754]),
            {
              "landcover": 2,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([89.73626424211217, 23.339800089459864]),
            {
              "landcover": 2,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([88.95280171769811, 23.157788556001595]),
            {
              "landcover": 2,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([89.2267732753153, 23.229424112407155]),
            {
              "landcover": 2,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([88.19577504533483, 23.83189826539021]),
            {
              "landcover": 2,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([88.59196950334264, 23.855763815065856]),
            {
              "landcover": 2,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([88.23972035783483, 23.489134492984764]),
            {
              "landcover": 2,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([88.04951955217076, 23.58041616780179]),
            {
              "landcover": 2,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([87.92386342424108, 22.487248302676694]),
            {
              "landcover": 2,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([88.30769826310826, 22.62485237874118]),
            {
              "landcover": 2,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([89.11931325334264, 22.95972407488369]),
            {
              "landcover": 2,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([89.47362233537389, 23.015350532079676]),
            {
              "landcover": 2,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([89.73901082414342, 23.70213115064087]),
            {
              "landcover": 2,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([89.54881001847936, 23.584506620857546]),
            {
              "landcover": 2,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([88.68912984269811, 22.87244560180742]),
            {
              "landcover": 2,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([88.95074178117467, 22.904074728975708]),
            {
              "landcover": 2,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([88.04436971086217, 23.20213138884371]),
            {
              "landcover": 2,
              "system:index": "29"
            })]),
    v_urban_kolkata_1998 = ui.import && ui.import("v_urban_kolkata_1998", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            88.38426954982195,
            22.356610312400914
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.6232221865407,
            22.752938147953817
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.06703932521258,
            22.642081244794777
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.05992872950945,
            22.476579841222208
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.79145033595476,
            22.286739144741947
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.44925673243914,
            22.656022468938527
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.61817152736101,
            23.646593461748573
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.25974257228289,
            23.368284283737477
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.20755751368914,
            23.708220207808115
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.02584059474383,
            23.228909856063943
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.9033735537282,
            23.087494826698478
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.7880171084157,
            23.84834397822769
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.10549147365008,
            23.672379616205458
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.47353346583758,
            23.295777348413655
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.58315260646258,
            23.086231520598517
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.69737990138445,
            22.90798673385475
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.18489821193133,
            22.68390066920922
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            87.9365766787282,
            23.059699350580757
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.28514845607195,
            23.216289587951003
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.60546709397295,
            22.845988499690602
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.08155657151201,
            22.96426670166252
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.95590044358232,
            22.776364965323264
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.61120439866045,
            23.59248892445127
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.05821062424639,
            23.63841630256488
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.18404855012358,
            24.02281543322948
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.32481087922514,
            23.713878349134607
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.10552682160795,
            23.4911402165153
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            87.99384774445952,
            22.450563510100924
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.61251534699858,
            22.465158638797785
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            87.85789193391264,
            22.805484590075483
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 0
      },
      "color": "#d69dbb",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": true
    }) || 
    /* color: #d69dbb */
    /* shown: false */
    /* locked: true */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([88.38426954982195, 22.356610312400914]),
            {
              "landcover": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([88.6232221865407, 22.752938147953817]),
            {
              "landcover": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([88.06703932521258, 22.642081244794777]),
            {
              "landcover": 0,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([89.05992872950945, 22.476579841222208]),
            {
              "landcover": 0,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([88.79145033595476, 22.286739144741947]),
            {
              "landcover": 0,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([89.44925673243914, 22.656022468938527]),
            {
              "landcover": 0,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([89.61817152736101, 23.646593461748573]),
            {
              "landcover": 0,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([89.25974257228289, 23.368284283737477]),
            {
              "landcover": 0,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([89.20755751368914, 23.708220207808115]),
            {
              "landcover": 0,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([88.02584059474383, 23.228909856063943]),
            {
              "landcover": 0,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([88.9033735537282, 23.087494826698478]),
            {
              "landcover": 0,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([88.7880171084157, 23.84834397822769]),
            {
              "landcover": 0,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([88.10549147365008, 23.672379616205458]),
            {
              "landcover": 0,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([88.47353346583758, 23.295777348413655]),
            {
              "landcover": 0,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([89.58315260646258, 23.086231520598517]),
            {
              "landcover": 0,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([88.69737990138445, 22.90798673385475]),
            {
              "landcover": 0,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([89.18489821193133, 22.68390066920922]),
            {
              "landcover": 0,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([87.9365766787282, 23.059699350580757]),
            {
              "landcover": 0,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([89.28514845607195, 23.216289587951003]),
            {
              "landcover": 0,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([89.60546709397295, 22.845988499690602]),
            {
              "landcover": 0,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([89.08155657151201, 22.96426670166252]),
            {
              "landcover": 0,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([88.95590044358232, 22.776364965323264]),
            {
              "landcover": 0,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([88.61120439866045, 23.59248892445127]),
            {
              "landcover": 0,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([89.05821062424639, 23.63841630256488]),
            {
              "landcover": 0,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([88.18404855012358, 24.02281543322948]),
            {
              "landcover": 0,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([88.32481087922514, 23.713878349134607]),
            {
              "landcover": 0,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([89.10552682160795, 23.4911402165153]),
            {
              "landcover": 0,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([87.99384774445952, 22.450563510100924]),
            {
              "landcover": 0,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([88.61251534699858, 22.465158638797785]),
            {
              "landcover": 0,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([87.85789193391264, 22.805484590075483]),
            {
              "landcover": 0,
              "system:index": "29"
            })]),
    v_water_kolkata_1998 = ui.import && ui.import("v_water_kolkata_1998", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            88.33305062531889,
            22.778264260807713
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.1140107083267,
            22.387088577344027
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.36463631867827,
            22.612292980486547
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.97437752961577,
            22.507666119363655
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.8555878567642,
            22.420099163010654
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.1906708645767,
            22.386453681566167
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.31770028352202,
            22.19712592566044
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.25040902375639,
            22.505763078567323
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.70795907258452,
            22.82795309088944
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.89129342317045,
            22.67122946238226
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.88511361360014,
            22.876042199200175
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.00002755402983,
            23.156327038216972
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.45527352570952,
            23.046431303508324
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.81061257600248,
            23.13486022975666
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.88957680940092,
            23.05053821970395
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.58480538606108,
            23.368599444835805
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.47871865510405,
            23.29703867662921
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.7461026231468,
            23.503174243023327
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.74601679245832,
            23.503174243023327
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.80644159714582,
            23.477512284603904
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.90411692063215,
            23.63046538973797
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.49727945725324,
            23.83569535135999
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.33471613327863,
            23.69037059928695
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.23076181809309,
            23.833340029242443
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.1493943254173,
            23.642259922740575
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.5694497148216,
            23.942581871283036
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.39771585862043,
            23.06387564876122
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.1161912004173,
            23.175019593799554
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            87.98837595383527,
            22.729577271576414
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            87.88434915940168,
            22.664646602211914
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 1
      },
      "color": "#7d71ff",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": true
    }) || 
    /* color: #7d71ff */
    /* shown: false */
    /* locked: true */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([88.33305062531889, 22.778264260807713]),
            {
              "landcover": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([88.1140107083267, 22.387088577344027]),
            {
              "landcover": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([88.36463631867827, 22.612292980486547]),
            {
              "landcover": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([88.97437752961577, 22.507666119363655]),
            {
              "landcover": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([88.8555878567642, 22.420099163010654]),
            {
              "landcover": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([89.1906708645767, 22.386453681566167]),
            {
              "landcover": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([89.31770028352202, 22.19712592566044]),
            {
              "landcover": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([89.25040902375639, 22.505763078567323]),
            {
              "landcover": 1,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([88.70795907258452, 22.82795309088944]),
            {
              "landcover": 1,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([88.89129342317045, 22.67122946238226]),
            {
              "landcover": 1,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([88.88511361360014, 22.876042199200175]),
            {
              "landcover": 1,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([88.00002755402983, 23.156327038216972]),
            {
              "landcover": 1,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([88.45527352570952, 23.046431303508324]),
            {
              "landcover": 1,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([88.81061257600248, 23.13486022975666]),
            {
              "landcover": 1,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([88.88957680940092, 23.05053821970395]),
            {
              "landcover": 1,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([89.58480538606108, 23.368599444835805]),
            {
              "landcover": 1,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([89.47871865510405, 23.29703867662921]),
            {
              "landcover": 1,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([89.7461026231468, 23.503174243023327]),
            {
              "landcover": 1,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([89.74601679245832, 23.503174243023327]),
            {
              "landcover": 1,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([89.80644159714582, 23.477512284603904]),
            {
              "landcover": 1,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([89.90411692063215, 23.63046538973797]),
            {
              "landcover": 1,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([89.49727945725324, 23.83569535135999]),
            {
              "landcover": 1,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([89.33471613327863, 23.69037059928695]),
            {
              "landcover": 1,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([88.23076181809309, 23.833340029242443]),
            {
              "landcover": 1,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([88.1493943254173, 23.642259922740575]),
            {
              "landcover": 1,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([88.5694497148216, 23.942581871283036]),
            {
              "landcover": 1,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([89.39771585862043, 23.06387564876122]),
            {
              "landcover": 1,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([89.1161912004173, 23.175019593799554]),
            {
              "landcover": 1,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([87.98837595383527, 22.729577271576414]),
            {
              "landcover": 1,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([87.88434915940168, 22.664646602211914]),
            {
              "landcover": 1,
              "system:index": "29"
            })]),
    v_vegetation_kolkata_1998 = ui.import && ui.import("v_vegetation_kolkata_1998", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            88.62249308030012,
            23.152293096172652
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.00014810959699,
            23.347866844587884
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.95894937912824,
            23.00510905514539
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.17548685471418,
            23.104933846717117
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.35720377365949,
            22.201328517282757
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            87.93996744553449,
            22.795110147887687
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.5394089738548,
            22.417947660088352
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.26063089768293,
            22.50170980858379
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.88959818283918,
            22.58288529697652
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            87.90606579761163,
            22.54230351994135
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.508940553471,
            22.76345568032457
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.11181530933038,
            22.766621457511384
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.22511181811944,
            23.020277080773514
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.47872815112726,
            23.05313528279086
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.87904248218194,
            22.67921908851834
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.82935986499444,
            23.55088701785634
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.59477124194757,
            23.728272337427555
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.4750507829632,
            23.53452025355056
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.67967114429132,
            23.147423304969852
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.1786640642132,
            23.925502774953408
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.04957470874444,
            23.57857997670225
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.52061352710382,
            23.356873211645265
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.71537671069757,
            22.781997721321904
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.3651875017132,
            22.794658668955993
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.42682332754185,
            23.80822844737374
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.0340620970731,
            23.81388224258662
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.71889180898717,
            23.57495273446664
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.24142904043248,
            23.56928858412048
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.57651204824498,
            23.278832495601527
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.11052388906529,
            22.711224400320543
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 2
      },
      "color": "#8b4837",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": true
    }) || 
    /* color: #8b4837 */
    /* shown: false */
    /* locked: true */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([88.62249308030012, 23.152293096172652]),
            {
              "landcover": 2,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([89.00014810959699, 23.347866844587884]),
            {
              "landcover": 2,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([88.95894937912824, 23.00510905514539]),
            {
              "landcover": 2,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([88.17548685471418, 23.104933846717117]),
            {
              "landcover": 2,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([89.35720377365949, 22.201328517282757]),
            {
              "landcover": 2,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([87.93996744553449, 22.795110147887687]),
            {
              "landcover": 2,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([88.5394089738548, 22.417947660088352]),
            {
              "landcover": 2,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([88.26063089768293, 22.50170980858379]),
            {
              "landcover": 2,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([88.88959818283918, 22.58288529697652]),
            {
              "landcover": 2,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([87.90606579761163, 22.54230351994135]),
            {
              "landcover": 2,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([88.508940553471, 22.76345568032457]),
            {
              "landcover": 2,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([89.11181530933038, 22.766621457511384]),
            {
              "landcover": 2,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([89.22511181811944, 23.020277080773514]),
            {
              "landcover": 2,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([88.47872815112726, 23.05313528279086]),
            {
              "landcover": 2,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([88.87904248218194, 22.67921908851834]),
            {
              "landcover": 2,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([89.82935986499444, 23.55088701785634]),
            {
              "landcover": 2,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([88.59477124194757, 23.728272337427555]),
            {
              "landcover": 2,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([89.4750507829632, 23.53452025355056]),
            {
              "landcover": 2,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([89.67967114429132, 23.147423304969852]),
            {
              "landcover": 2,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([88.1786640642132, 23.925502774953408]),
            {
              "landcover": 2,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([88.04957470874444, 23.57857997670225]),
            {
              "landcover": 2,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([88.52061352710382, 23.356873211645265]),
            {
              "landcover": 2,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([89.71537671069757, 22.781997721321904]),
            {
              "landcover": 2,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([89.3651875017132, 22.794658668955993]),
            {
              "landcover": 2,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([89.42682332754185, 23.80822844737374]),
            {
              "landcover": 2,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([89.0340620970731, 23.81388224258662]),
            {
              "landcover": 2,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([88.71889180898717, 23.57495273446664]),
            {
              "landcover": 2,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([89.24142904043248, 23.56928858412048]),
            {
              "landcover": 2,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([89.57651204824498, 23.278832495601527]),
            {
              "landcover": 2,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([88.11052388906529, 22.711224400320543]),
            {
              "landcover": 2,
              "system:index": "29"
            })]),
    v_urban_kolkata_2008 = ui.import && ui.import("v_urban_kolkata_2008", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            88.30530531642351,
            22.44929429585541
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.08214552638445,
            22.69467027418358
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.4749067568532,
            22.705439032658745
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.73720534083758,
            22.449928904430298
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.03888685939226,
            22.403594850226394
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            87.82877333400164,
            22.675030947374907
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            87.76834852931414,
            22.462620465945236
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.1560591006032,
            22.727054976563668
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.25630934474383,
            23.208797534360194
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.70424635646258,
            23.26053595441681
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.69850905177508,
            22.83088185206489
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.11074049708758,
            23.491046860535455
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.59825880763445,
            23.754013771348884
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.79488356349383,
            23.84825087702108
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.39388258693133,
            23.55904100286887
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.13845045802508,
            23.55274672506365
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            87.91048414943133,
            23.10508623795293
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.38289625880633,
            22.997676915723424
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.73583204982195,
            22.971127307452758
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.52022536036883,
            22.356516171336096
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.10387404200945,
            22.252331750273825
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.79189284083758,
            23.203574568980535
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.55568678615008,
            23.278023992033766
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.17140944240008,
            23.934888548404434
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.41722853419695,
            23.936143740022295
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.44469435450945,
            23.3057741526276
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.03864271876726,
            23.63517785169842
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.57309706447039,
            23.68360554132175
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.1560591006032,
            23.767211080242987
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.1563032412282,
            23.111401763253397
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 0
      },
      "color": "#f736ff",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": true
    }) || 
    /* color: #f736ff */
    /* shown: false */
    /* locked: true */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([88.30530531642351, 22.44929429585541]),
            {
              "landcover": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([88.08214552638445, 22.69467027418358]),
            {
              "landcover": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([88.4749067568532, 22.705439032658745]),
            {
              "landcover": 0,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([88.73720534083758, 22.449928904430298]),
            {
              "landcover": 0,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([88.03888685939226, 22.403594850226394]),
            {
              "landcover": 0,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([87.82877333400164, 22.675030947374907]),
            {
              "landcover": 0,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([87.76834852931414, 22.462620465945236]),
            {
              "landcover": 0,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([89.1560591006032, 22.727054976563668]),
            {
              "landcover": 0,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([89.25630934474383, 23.208797534360194]),
            {
              "landcover": 0,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([88.70424635646258, 23.26053595441681]),
            {
              "landcover": 0,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([89.69850905177508, 22.83088185206489]),
            {
              "landcover": 0,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([89.11074049708758, 23.491046860535455]),
            {
              "landcover": 0,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([89.59825880763445, 23.754013771348884]),
            {
              "landcover": 0,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([88.79488356349383, 23.84825087702108]),
            {
              "landcover": 0,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([88.39388258693133, 23.55904100286887]),
            {
              "landcover": 0,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([88.13845045802508, 23.55274672506365]),
            {
              "landcover": 0,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([87.91048414943133, 23.10508623795293]),
            {
              "landcover": 0,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([88.38289625880633, 22.997676915723424]),
            {
              "landcover": 0,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([88.73583204982195, 22.971127307452758]),
            {
              "landcover": 0,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([88.52022536036883, 22.356516171336096]),
            {
              "landcover": 0,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([89.10387404200945, 22.252331750273825]),
            {
              "landcover": 0,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([89.79189284083758, 23.203574568980535]),
            {
              "landcover": 0,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([89.55568678615008, 23.278023992033766]),
            {
              "landcover": 0,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([88.17140944240008, 23.934888548404434]),
            {
              "landcover": 0,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([88.41722853419695, 23.936143740022295]),
            {
              "landcover": 0,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([88.44469435450945, 23.3057741526276]),
            {
              "landcover": 0,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([89.03864271876726, 23.63517785169842]),
            {
              "landcover": 0,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([88.57309706447039, 23.68360554132175]),
            {
              "landcover": 0,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([89.1560591006032, 23.767211080242987]),
            {
              "landcover": 0,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([88.1563032412282, 23.111401763253397]),
            {
              "landcover": 0,
              "system:index": "29"
            })]),
    v_water_kolkata_2008 = ui.import && ui.import("v_water_kolkata_2008", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            87.93726332423601,
            22.937932962924982
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.43714125392351,
            23.013793774057497
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            87.89469130275164,
            22.868989195534258
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            87.90018446681414,
            22.48060987588577
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.35543043849383,
            22.643571600189183
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.42247755763445,
            22.479975407811352
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.59688551661883,
            22.43809408989233
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.91161329982195,
            22.321267340041405
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.2439497256032,
            22.229769411918404
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.94733970209694,
            23.42580204169007
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.928800273386,
            23.28774938480392
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.73492209955788,
            23.13534709934563
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.1152245287571,
            23.171017863403318
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.47296683832741,
            23.63544161683489
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.87740104242897,
            23.625376491022482
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.67140739008522,
            23.227818921003237
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.64188163324928,
            23.79323684277645
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.20708651475097,
            23.93261301185725
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.20022005967284,
            23.76430417374133
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.31385989121581,
            23.958028710761134
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.45702547959472,
            23.926650579909733
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.23935885361816,
            23.433176524943637
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.48586459092284,
            23.505608274139693
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.70936770371581,
            22.82667217227266
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.88377566270019,
            22.87476173356688
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.35962099961425,
            22.77049344544649
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.14401431016113,
            23.498943950504998
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.4993533604541,
            23.509018768938823
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.66971392563964,
            23.741154946813502
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.64842791489745,
            23.668538687879924
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 1
      },
      "color": "#d63000",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": true
    }) || 
    /* color: #d63000 */
    /* shown: false */
    /* locked: true */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([87.93726332423601, 22.937932962924982]),
            {
              "landcover": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([88.43714125392351, 23.013793774057497]),
            {
              "landcover": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([87.89469130275164, 22.868989195534258]),
            {
              "landcover": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([87.90018446681414, 22.48060987588577]),
            {
              "landcover": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([88.35543043849383, 22.643571600189183]),
            {
              "landcover": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([89.42247755763445, 22.479975407811352]),
            {
              "landcover": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([89.59688551661883, 22.43809408989233]),
            {
              "landcover": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([88.91161329982195, 22.321267340041405]),
            {
              "landcover": 1,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([89.2439497256032, 22.229769411918404]),
            {
              "landcover": 1,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([88.94733970209694, 23.42580204169007]),
            {
              "landcover": 1,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([88.928800273386, 23.28774938480392]),
            {
              "landcover": 1,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([89.73492209955788, 23.13534709934563]),
            {
              "landcover": 1,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([89.1152245287571, 23.171017863403318]),
            {
              "landcover": 1,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([89.47296683832741, 23.63544161683489]),
            {
              "landcover": 1,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([89.87740104242897, 23.625376491022482]),
            {
              "landcover": 1,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([89.67140739008522, 23.227818921003237]),
            {
              "landcover": 1,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([89.64188163324928, 23.79323684277645]),
            {
              "landcover": 1,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([88.20708651475097, 23.93261301185725]),
            {
              "landcover": 1,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([88.20022005967284, 23.76430417374133]),
            {
              "landcover": 1,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([88.31385989121581, 23.958028710761134]),
            {
              "landcover": 1,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([88.45702547959472, 23.926650579909733]),
            {
              "landcover": 1,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([88.23935885361816, 23.433176524943637]),
            {
              "landcover": 1,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([88.48586459092284, 23.505608274139693]),
            {
              "landcover": 1,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([88.70936770371581, 22.82667217227266]),
            {
              "landcover": 1,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([88.88377566270019, 22.87476173356688]),
            {
              "landcover": 1,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([89.35962099961425, 22.77049344544649]),
            {
              "landcover": 1,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([89.14401431016113, 23.498943950504998]),
            {
              "landcover": 1,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([89.4993533604541, 23.509018768938823]),
            {
              "landcover": 1,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([88.66971392563964, 23.741154946813502]),
            {
              "landcover": 1,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([88.64842791489745, 23.668538687879924]),
            {
              "landcover": 1,
              "system:index": "29"
            })]),
    v_vegetation_kolkata_2008 = ui.import && ui.import("v_vegetation_kolkata_2008", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            88.3130418149476,
            23.925824269597058
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.7524949399476,
            23.890671484508143
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.42153180518197,
            23.63552868142763
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.91591657080697,
            23.53232457571541
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.5544968930726,
            23.58519535359668
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.06504594909607,
            23.169872873437576
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.8574348651117,
            23.042297247120654
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.4289680682367,
            23.410797313209834
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.05405962097107,
            22.85007445033277
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.47541582214295,
            22.431814286337108
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.56217729675232,
            22.45973783553364
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.50999223815857,
            22.877913056598054
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            87.9235969744867,
            22.468621421910036
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.89863359558045,
            22.6385686223771
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.22135698425232,
            22.232378878934778
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.43696367370545,
            23.00943640237149
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.34495317565857,
            23.313723186297022
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.83109819518982,
            23.574527098957432
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.41361772643982,
            23.765706334948884
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.18314897643982,
            23.82287986099772
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.99469037175189,
            22.881708788177367
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.49319501042376,
            22.952542950038666
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.10798688054095,
            23.742767031793957
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.58093151943756,
            23.774100821406517
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.75671276943756,
            23.661572558048125
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            87.95059094326568,
            22.65590574073558
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.87344250576568,
            22.835747077546678
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.06869397060943,
            23.48031822910114
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.55415234463287,
            23.943024504406342
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.30627331631256,
            22.979955020053218
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 2
      },
      "color": "#98ff00",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": true
    }) || 
    /* color: #98ff00 */
    /* shown: false */
    /* locked: true */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([88.3130418149476, 23.925824269597058]),
            {
              "landcover": 2,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([88.7524949399476, 23.890671484508143]),
            {
              "landcover": 2,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([88.42153180518197, 23.63552868142763]),
            {
              "landcover": 2,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([88.91591657080697, 23.53232457571541]),
            {
              "landcover": 2,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([89.5544968930726, 23.58519535359668]),
            {
              "landcover": 2,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([88.06504594909607, 23.169872873437576]),
            {
              "landcover": 2,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([88.8574348651117, 23.042297247120654]),
            {
              "landcover": 2,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([88.4289680682367, 23.410797313209834]),
            {
              "landcover": 2,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([88.05405962097107, 22.85007445033277]),
            {
              "landcover": 2,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([89.47541582214295, 22.431814286337108]),
            {
              "landcover": 2,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([88.56217729675232, 22.45973783553364]),
            {
              "landcover": 2,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([88.50999223815857, 22.877913056598054]),
            {
              "landcover": 2,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([87.9235969744867, 22.468621421910036]),
            {
              "landcover": 2,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([88.89863359558045, 22.6385686223771]),
            {
              "landcover": 2,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([89.22135698425232, 22.232378878934778]),
            {
              "landcover": 2,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([89.43696367370545, 23.00943640237149]),
            {
              "landcover": 2,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([89.34495317565857, 23.313723186297022]),
            {
              "landcover": 2,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([89.83109819518982, 23.574527098957432]),
            {
              "landcover": 2,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([89.41361772643982, 23.765706334948884]),
            {
              "landcover": 2,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([88.18314897643982, 23.82287986099772]),
            {
              "landcover": 2,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([88.99469037175189, 22.881708788177367]),
            {
              "landcover": 2,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([89.49319501042376, 22.952542950038666]),
            {
              "landcover": 2,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([89.10798688054095, 23.742767031793957]),
            {
              "landcover": 2,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([88.58093151943756, 23.774100821406517]),
            {
              "landcover": 2,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([88.75671276943756, 23.661572558048125]),
            {
              "landcover": 2,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([87.95059094326568, 22.65590574073558]),
            {
              "landcover": 2,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([88.87344250576568, 22.835747077546678]),
            {
              "landcover": 2,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([88.06869397060943, 23.48031822910114]),
            {
              "landcover": 2,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([88.55415234463287, 23.943024504406342]),
            {
              "landcover": 2,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([88.30627331631256, 22.979955020053218]),
            {
              "landcover": 2,
              "system:index": "29"
            })]),
    v_urban_kolkata_2013 = ui.import && ui.import("v_urban_kolkata_2013", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            88.03202040431414,
            22.63827884713157
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.37808974025164,
            22.721907260501535
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            87.98807509181414,
            22.460716805797205
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.5078657412282,
            22.470869357719213
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            87.84731276271258,
            22.730140631279486
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.91916640040789,
            22.268312740640226
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.22815687892351,
            22.481021165602673
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.48496229884539,
            22.61799761585664
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.12138350245867,
            22.783645454438446
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.20103438136492,
            22.963160298617776
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.30891020533953,
            23.124599144047707
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            87.94361479518328,
            23.110074419732165
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.05416472194109,
            22.855321675729922
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.2306326174489,
            23.443743955966315
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.77788908717547,
            23.546388094299175
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.76964934108172,
            23.340389560922496
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.42402251002703,
            23.405940729245383
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.3512380861989,
            23.745150867766146
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.84218962428484,
            23.3775812212241
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.74331267115984,
            23.70429079862369
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.15829069850359,
            23.393337253096046
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.1754568361989,
            23.758349075167715
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.68725188014422,
            23.70366208217345
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.5986746096364,
            23.95490629841139
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.1317556643239,
            23.792909465695836
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.30616362330828,
            24.015132363535052
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.05073149440203,
            23.465160985533938
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.97529967067156,
            22.900238503017967
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.76930601832781,
            22.777156341654507
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.59970457789812,
            23.06459556140208
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 0
      },
      "color": "#0b4a8b",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": true
    }) || 
    /* color: #0b4a8b */
    /* shown: false */
    /* locked: true */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([88.03202040431414, 22.63827884713157]),
            {
              "landcover": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([88.37808974025164, 22.721907260501535]),
            {
              "landcover": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([87.98807509181414, 22.460716805797205]),
            {
              "landcover": 0,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([88.5078657412282, 22.470869357719213]),
            {
              "landcover": 0,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([87.84731276271258, 22.730140631279486]),
            {
              "landcover": 0,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([88.91916640040789, 22.268312740640226]),
            {
              "landcover": 0,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([89.22815687892351, 22.481021165602673]),
            {
              "landcover": 0,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([89.48496229884539, 22.61799761585664]),
            {
              "landcover": 0,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([89.12138350245867, 22.783645454438446]),
            {
              "landcover": 0,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([89.20103438136492, 22.963160298617776]),
            {
              "landcover": 0,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([88.30891020533953, 23.124599144047707]),
            {
              "landcover": 0,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([87.94361479518328, 23.110074419732165]),
            {
              "landcover": 0,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([88.05416472194109, 22.855321675729922]),
            {
              "landcover": 0,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([88.2306326174489, 23.443743955966315]),
            {
              "landcover": 0,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([88.77788908717547, 23.546388094299175]),
            {
              "landcover": 0,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([88.76964934108172, 23.340389560922496]),
            {
              "landcover": 0,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([89.42402251002703, 23.405940729245383]),
            {
              "landcover": 0,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([89.3512380861989, 23.745150867766146]),
            {
              "landcover": 0,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([89.84218962428484, 23.3775812212241]),
            {
              "landcover": 0,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([89.74331267115984, 23.70429079862369]),
            {
              "landcover": 0,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([89.15829069850359, 23.393337253096046]),
            {
              "landcover": 0,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([89.1754568361989, 23.758349075167715]),
            {
              "landcover": 0,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([88.68725188014422, 23.70366208217345]),
            {
              "landcover": 0,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([88.5986746096364, 23.95490629841139]),
            {
              "landcover": 0,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([88.1317556643239, 23.792909465695836]),
            {
              "landcover": 0,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([88.30616362330828, 24.015132363535052]),
            {
              "landcover": 0,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([88.05073149440203, 23.465160985533938]),
            {
              "landcover": 0,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([88.97529967067156, 22.900238503017967]),
            {
              "landcover": 0,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([88.76930601832781, 22.777156341654507]),
            {
              "landcover": 0,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([88.59970457789812, 23.06459556140208]),
            {
              "landcover": 0,
              "system:index": "29"
            })]),
    v_water_kolkata_2013 = ui.import && ui.import("v_water_kolkata_2013", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            89.41852934596453,
            22.497040473178934
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.24961455104265,
            22.265929838736007
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.58469755885515,
            22.267200724801416
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.68563444850359,
            23.135018086482315
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.60529692408953,
            23.4472087109267
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.86828215358172,
            23.721579313781717
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.6149099611989,
            23.79385189312648
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.88132841823015,
            23.59453397875775
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.27090056178484,
            23.741065437229313
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.04087431666765,
            23.78536980021774
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.77050764796648,
            23.871578594885
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.31783659694109,
            24.031909085565783
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.20050604579363,
            23.94831736440008
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.33268530604754,
            23.45197260062245
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.86277563807879,
            23.31095190995346
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.4074822556907,
            22.884439042621352
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.80779658674538,
            22.71352969310079
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.0064812791282,
            23.13850548884435
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            87.8911248338157,
            22.677104692266912
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.23891078352273,
            22.537967324127692
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            87.89009486555398,
            22.5278196958066
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.08939372419655,
            23.34497486320941
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.1959229600364,
            23.275451366947262
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.0864030015403,
            23.30856232701878
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.71192370771706,
            23.512878930270155
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.76616870283425,
            23.106615488119495
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.71572376247931,
            23.327059154104667
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.81623149868537,
            22.451813530849076
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.69658351894904,
            23.666071769501567
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 1
      },
      "color": "#ffc82d",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": true
    }) || 
    /* color: #ffc82d */
    /* shown: false */
    /* locked: true */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([89.41852934596453, 22.497040473178934]),
            {
              "landcover": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([89.24961455104265, 22.265929838736007]),
            {
              "landcover": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([89.58469755885515, 22.267200724801416]),
            {
              "landcover": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([89.68563444850359, 23.135018086482315]),
            {
              "landcover": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([89.60529692408953, 23.4472087109267]),
            {
              "landcover": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([89.86828215358172, 23.721579313781717]),
            {
              "landcover": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([89.6149099611989, 23.79385189312648]),
            {
              "landcover": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([89.88132841823015, 23.59453397875775]),
            {
              "landcover": 1,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([89.27090056178484, 23.741065437229313]),
            {
              "landcover": 1,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([89.04087431666765, 23.78536980021774]),
            {
              "landcover": 1,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([88.77050764796648, 23.871578594885]),
            {
              "landcover": 1,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([88.31783659694109, 24.031909085565783]),
            {
              "landcover": 1,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([88.20050604579363, 23.94831736440008]),
            {
              "landcover": 1,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([88.33268530604754, 23.45197260062245]),
            {
              "landcover": 1,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([88.86277563807879, 23.31095190995346]),
            {
              "landcover": 1,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([88.4074822556907, 22.884439042621352]),
            {
              "landcover": 1,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([88.80779658674538, 22.71352969310079]),
            {
              "landcover": 1,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([88.0064812791282, 23.13850548884435]),
            {
              "landcover": 1,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([87.8911248338157, 22.677104692266912]),
            {
              "landcover": 1,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([88.23891078352273, 22.537967324127692]),
            {
              "landcover": 1,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([87.89009486555398, 22.5278196958066]),
            {
              "landcover": 1,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([88.08939372419655, 23.34497486320941]),
            {
              "landcover": 1,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([89.1959229600364, 23.275451366947262]),
            {
              "landcover": 1,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([89.0864030015403, 23.30856232701878]),
            {
              "landcover": 1,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([88.71192370771706, 23.512878930270155]),
            {
              "landcover": 1,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([88.76616870283425, 23.106615488119495]),
            {
              "landcover": 1,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([88.71572376247931, 23.327059154104667]),
            {
              "landcover": 1,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([88.81623149868537, 22.451813530849076]),
            {
              "landcover": 1,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([88.69658351894904, 23.666071769501567]),
            {
              "landcover": 1,
              "system:index": "28"
            })]),
    v_vegetation_kolkata_2013 = ui.import && ui.import("v_vegetation_kolkata_2013", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            86.89491153713752,
            24.507149251362968
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.19895053860236,
            22.204894527973966
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.61643100735236,
            22.65932998971223
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.99295688625861,
            22.81891535943713
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            87.97946811672736,
            22.502096335589567
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            87.91080356594611,
            22.661864544568996
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.98746372219611,
            23.177929133551732
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.24289585110236,
            23.392372894844453
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.55875278469611,
            23.041515332767965
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.23490024563361,
            23.389852037309836
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.41617465969611,
            22.796128862526597
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.50382114407111,
            22.41579539108404
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.24313999172736,
            22.44118359862572
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.72928501125861,
            22.405638808278887
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.03690219875861,
            23.031405098135888
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.18820835110236,
            23.513317562617047
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.16623569485236,
            23.95582857999602
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.11380649563361,
            23.78503664573747
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.78397251125861,
            23.08952858131655
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.75101352688361,
            23.639183576562818
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.05612827297736,
            23.641699665207753
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.77872348782111,
            23.860413797358806
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.43241001125861,
            22.83157287729966
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.57822299953986,
            23.099634449670464
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.15662265774299,
            23.057311055320174
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.0419528579383,
            22.79106467912905
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.2779147720008,
            23.044674625501447
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.58072544094611,
            23.511567607175536
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.82345462795783,
            23.530770223369327
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.4317233657508,
            23.43819414832915
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 2
      },
      "color": "#00ffff",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": true
    }) || 
    /* color: #00ffff */
    /* shown: false */
    /* locked: true */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([86.89491153713752, 24.507149251362968]),
            {
              "landcover": 2,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([89.19895053860236, 22.204894527973966]),
            {
              "landcover": 2,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([89.61643100735236, 22.65932998971223]),
            {
              "landcover": 2,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([88.99295688625861, 22.81891535943713]),
            {
              "landcover": 2,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([87.97946811672736, 22.502096335589567]),
            {
              "landcover": 2,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([87.91080356594611, 22.661864544568996]),
            {
              "landcover": 2,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([88.98746372219611, 23.177929133551732]),
            {
              "landcover": 2,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([89.24289585110236, 23.392372894844453]),
            {
              "landcover": 2,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([89.55875278469611, 23.041515332767965]),
            {
              "landcover": 2,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([88.23490024563361, 23.389852037309836]),
            {
              "landcover": 2,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([88.41617465969611, 22.796128862526597]),
            {
              "landcover": 2,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([89.50382114407111, 22.41579539108404]),
            {
              "landcover": 2,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([88.24313999172736, 22.44118359862572]),
            {
              "landcover": 2,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([88.72928501125861, 22.405638808278887]),
            {
              "landcover": 2,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([89.03690219875861, 23.031405098135888]),
            {
              "landcover": 2,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([88.18820835110236, 23.513317562617047]),
            {
              "landcover": 2,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([88.16623569485236, 23.95582857999602]),
            {
              "landcover": 2,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([89.11380649563361, 23.78503664573747]),
            {
              "landcover": 2,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([89.78397251125861, 23.08952858131655]),
            {
              "landcover": 2,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([89.75101352688361, 23.639183576562818]),
            {
              "landcover": 2,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([89.05612827297736, 23.641699665207753]),
            {
              "landcover": 2,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([88.77872348782111, 23.860413797358806]),
            {
              "landcover": 2,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([89.43241001125861, 22.83157287729966]),
            {
              "landcover": 2,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([88.57822299953986, 23.099634449670464]),
            {
              "landcover": 2,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([88.15662265774299, 23.057311055320174]),
            {
              "landcover": 2,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([88.0419528579383, 22.79106467912905]),
            {
              "landcover": 2,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([89.2779147720008, 23.044674625501447]),
            {
              "landcover": 2,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([89.58072544094611, 23.511567607175536]),
            {
              "landcover": 2,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([89.82345462795783, 23.530770223369327]),
            {
              "landcover": 2,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([89.4317233657508, 23.43819414832915]),
            {
              "landcover": 2,
              "system:index": "29"
            })]),
    v_urban_kolkata_2018 = ui.import && ui.import("v_urban_kolkata_2018", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            88.3705366396657,
            22.588838105589485
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.69257338282976,
            22.405499294065354
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.18239577052508,
            22.565379235446176
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.03795607325945,
            22.3674054610413
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.99813063380633,
            22.528457576181403
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.88826735255633,
            22.7958497536762
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.60581190822039,
            22.97234560427901
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.3922651552907,
            22.878116514090276
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.21579725978289,
            23.15871270454811
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.59688551661883,
            23.081670161099602
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.82440932032976,
            23.120828456404272
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.13065321681414,
            23.405328764409518
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.6284712099782,
            23.35049465318071
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.62435133693133,
            23.63953525190797
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.34625990626726,
            23.710595934809128
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.87247450587664,
            23.8343879251177
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.29637892482195,
            23.823710014695468
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.53395827052508,
            23.648341326886413
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.3705366396657,
            24.077229051692207
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.14943678615008,
            24.007623742833253
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.2057417177907,
            23.017223633566395
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            87.9255903506032,
            23.08103848216462
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.57721693751726,
            22.897094082171
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            87.87889845607195,
            22.90025675215754
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.2991255068532,
            23.46077005390676
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.90131361720476,
            23.543888338385806
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.24291975734148,
            22.498327552733777
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.35243971583758,
            22.47326706053942
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.43679793116961,
            23.24612125350761
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.60021956202898,
            23.51587326126448
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 0
      },
      "color": "#bf04c2",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": true
    }) || 
    /* color: #bf04c2 */
    /* shown: false */
    /* locked: true */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([88.3705366396657, 22.588838105589485]),
            {
              "landcover": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([88.69257338282976, 22.405499294065354]),
            {
              "landcover": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([88.18239577052508, 22.565379235446176]),
            {
              "landcover": 0,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([89.03795607325945, 22.3674054610413]),
            {
              "landcover": 0,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([88.99813063380633, 22.528457576181403]),
            {
              "landcover": 0,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([88.88826735255633, 22.7958497536762]),
            {
              "landcover": 0,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([89.60581190822039, 22.97234560427901]),
            {
              "landcover": 0,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([89.3922651552907, 22.878116514090276]),
            {
              "landcover": 0,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([89.21579725978289, 23.15871270454811]),
            {
              "landcover": 0,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([89.59688551661883, 23.081670161099602]),
            {
              "landcover": 0,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([88.82440932032976, 23.120828456404272]),
            {
              "landcover": 0,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([89.13065321681414, 23.405328764409518]),
            {
              "landcover": 0,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([89.6284712099782, 23.35049465318071]),
            {
              "landcover": 0,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([89.62435133693133, 23.63953525190797]),
            {
              "landcover": 0,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([89.34625990626726, 23.710595934809128]),
            {
              "landcover": 0,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([88.87247450587664, 23.8343879251177]),
            {
              "landcover": 0,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([88.29637892482195, 23.823710014695468]),
            {
              "landcover": 0,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([88.53395827052508, 23.648341326886413]),
            {
              "landcover": 0,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([88.3705366396657, 24.077229051692207]),
            {
              "landcover": 0,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([88.14943678615008, 24.007623742833253]),
            {
              "landcover": 0,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([88.2057417177907, 23.017223633566395]),
            {
              "landcover": 0,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([87.9255903506032, 23.08103848216462]),
            {
              "landcover": 0,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([88.57721693751726, 22.897094082171]),
            {
              "landcover": 0,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([87.87889845607195, 22.90025675215754]),
            {
              "landcover": 0,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([88.2991255068532, 23.46077005390676]),
            {
              "landcover": 0,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([88.90131361720476, 23.543888338385806]),
            {
              "landcover": 0,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([89.24291975734148, 22.498327552733777]),
            {
              "landcover": 0,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([89.35243971583758, 22.47326706053942]),
            {
              "landcover": 0,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([88.43679793116961, 23.24612125350761]),
            {
              "landcover": 0,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([88.60021956202898, 23.51587326126448]),
            {
              "landcover": 0,
              "system:index": "29"
            })]),
    v_water_kolkata_2018 = ui.import && ui.import("v_water_kolkata_2018", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            88.94422896144305,
            23.44281718234985
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.40589888331805,
            23.214572414394702
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.99160750148211,
            23.142613207141547
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.72631819484148,
            23.782560441183435
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.16601546046648,
            23.938294543350334
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.96757490870867,
            22.204296361198924
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.27999861476336,
            22.143253463106827
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.50781893167999,
            22.116970929605223
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.60394930277374,
            22.428958673343352
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.43434786234405,
            22.3407069422163
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.98322176371124,
            22.481629023948006
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.36386751566437,
            22.614801823920356
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            87.8839682537832,
            22.662728369556486
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.14477926982558,
            23.86330915621172
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.22477347148573,
            23.75777124752103
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.66903311504042,
            23.74300167030071
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.49119192851698,
            24.034468085946504
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.59548956645644,
            23.36763231022499
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.626388614308,
            23.06599531058299
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.0062485386244,
            23.138874790064516
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.40827948344862,
            22.888920868877698
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.49016196025526,
            23.51608050532912
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.32090384257948,
            23.545983977594645
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.62891464487153,
            23.46275297454018
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.85124477415421,
            22.906148398387483
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.80867275266984,
            22.72228316718922
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.10049709349015,
            22.91531932580358
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.76953395872452,
            22.874836077496177
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.29420212236569,
            23.588207995317383
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.46586349931881,
            23.63806839215631
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 1
      },
      "color": "#ff0000",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": true
    }) || 
    /* color: #ff0000 */
    /* shown: false */
    /* locked: true */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([88.94422896144305, 23.44281718234985]),
            {
              "landcover": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([88.40589888331805, 23.214572414394702]),
            {
              "landcover": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([88.99160750148211, 23.142613207141547]),
            {
              "landcover": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([89.72631819484148, 23.782560441183435]),
            {
              "landcover": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([89.16601546046648, 23.938294543350334]),
            {
              "landcover": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([88.96757490870867, 22.204296361198924]),
            {
              "landcover": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([89.27999861476336, 22.143253463106827]),
            {
              "landcover": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([89.50781893167999, 22.116970929605223]),
            {
              "landcover": 1,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([89.60394930277374, 22.428958673343352]),
            {
              "landcover": 1,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([89.43434786234405, 22.3407069422163]),
            {
              "landcover": 1,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([88.98322176371124, 22.481629023948006]),
            {
              "landcover": 1,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([88.36386751566437, 22.614801823920356]),
            {
              "landcover": 1,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([87.8839682537832, 22.662728369556486]),
            {
              "landcover": 1,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([88.14477926982558, 23.86330915621172]),
            {
              "landcover": 1,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([88.22477347148573, 23.75777124752103]),
            {
              "landcover": 1,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([88.66903311504042, 23.74300167030071]),
            {
              "landcover": 1,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([88.49119192851698, 24.034468085946504]),
            {
              "landcover": 1,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([89.59548956645644, 23.36763231022499]),
            {
              "landcover": 1,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([89.626388614308, 23.06599531058299]),
            {
              "landcover": 1,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([88.0062485386244, 23.138874790064516]),
            {
              "landcover": 1,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([88.40827948344862, 22.888920868877698]),
            {
              "landcover": 1,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([88.49016196025526, 23.51608050532912]),
            {
              "landcover": 1,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([88.32090384257948, 23.545983977594645]),
            {
              "landcover": 1,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([88.62891464487153, 23.46275297454018]),
            {
              "landcover": 1,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([88.85124477415421, 22.906148398387483]),
            {
              "landcover": 1,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([88.80867275266984, 22.72228316718922]),
            {
              "landcover": 1,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([89.10049709349015, 22.91531932580358]),
            {
              "landcover": 1,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([88.76953395872452, 22.874836077496177]),
            {
              "landcover": 1,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([89.29420212236569, 23.588207995317383]),
            {
              "landcover": 1,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([89.46586349931881, 23.63806839215631]),
            {
              "landcover": 1,
              "system:index": "29"
            })]),
    v_vegetation_kolkata_2018 = ui.import && ui.import("v_vegetation_kolkata_2018", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            88.96255234209225,
            23.782980208056188
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.35874680010006,
            23.577981912055495
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.79819992510006,
            23.63838290856129
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.05799606767819,
            23.442608071128195
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.37591293779538,
            22.152582063065545
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            87.94494369951413,
            22.89593529994854
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            87.82684067217038,
            22.462586779048802
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.89800766435788,
            23.242126359345825
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.25530746904538,
            23.26988399854999
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.45831039873288,
            23.274930221007985
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.79339340654538,
            23.090619507790407
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.29351547685788,
            23.22950734070171
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.91723373857663,
            22.931353292957592
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.60412338701413,
            23.062824677521565
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.88702133623288,
            22.766834478937717
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.47778061357663,
            22.32291575990391
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.99688461748288,
            22.18056149272176
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.90350082842038,
            22.594510058529284
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.02984360185788,
            23.951892318332735
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.58489731279538,
            23.68052126880593
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.66729477373288,
            23.856474628930687
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.27487686601803,
            23.873428966284884
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.23264816728756,
            23.761300835867747
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.48911026445553,
            23.866521911590574
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.12141159502194,
            23.72736065527511
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.29787949052975,
            22.735173454402904
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.02253464189694,
            22.760502861042383
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            88.75861862627194,
            22.844689341709987
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.42054489580319,
            22.827603061388466
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            89.30999496904538,
            23.059665810652504
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 2
      },
      "color": "#00ff00",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #00ff00 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([88.96255234209225, 23.782980208056188]),
            {
              "landcover": 2,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([89.35874680010006, 23.577981912055495]),
            {
              "landcover": 2,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([89.79819992510006, 23.63838290856129]),
            {
              "landcover": 2,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([89.05799606767819, 23.442608071128195]),
            {
              "landcover": 2,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([89.37591293779538, 22.152582063065545]),
            {
              "landcover": 2,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([87.94494369951413, 22.89593529994854]),
            {
              "landcover": 2,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([87.82684067217038, 22.462586779048802]),
            {
              "landcover": 2,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([88.89800766435788, 23.242126359345825]),
            {
              "landcover": 2,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([88.25530746904538, 23.26988399854999]),
            {
              "landcover": 2,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([89.45831039873288, 23.274930221007985]),
            {
              "landcover": 2,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([89.79339340654538, 23.090619507790407]),
            {
              "landcover": 2,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([89.29351547685788, 23.22950734070171]),
            {
              "landcover": 2,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([88.91723373857663, 22.931353292957592]),
            {
              "landcover": 2,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([88.60412338701413, 23.062824677521565]),
            {
              "landcover": 2,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([88.88702133623288, 22.766834478937717]),
            {
              "landcover": 2,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([88.47778061357663, 22.32291575990391]),
            {
              "landcover": 2,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([88.99688461748288, 22.18056149272176]),
            {
              "landcover": 2,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([88.90350082842038, 22.594510058529284]),
            {
              "landcover": 2,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([89.02984360185788, 23.951892318332735]),
            {
              "landcover": 2,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([88.58489731279538, 23.68052126880593]),
            {
              "landcover": 2,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([88.66729477373288, 23.856474628930687]),
            {
              "landcover": 2,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([88.27487686601803, 23.873428966284884]),
            {
              "landcover": 2,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([88.23264816728756, 23.761300835867747]),
            {
              "landcover": 2,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([88.48911026445553, 23.866521911590574]),
            {
              "landcover": 2,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([88.12141159502194, 23.72736065527511]),
            {
              "landcover": 2,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([88.29787949052975, 22.735173454402904]),
            {
              "landcover": 2,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([88.02253464189694, 22.760502861042383]),
            {
              "landcover": 2,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([88.75861862627194, 22.844689341709987]),
            {
              "landcover": 2,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([89.42054489580319, 22.827603061388466]),
            {
              "landcover": 2,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([89.30999496904538, 23.059665810652504]),
            {
              "landcover": 2,
              "system:index": "29"
            })]);
//Map.setCenter(78.9629,20.5937,3);
var image;
var imgCollection,imgBands,imgBandFalseColor,imgBandTrueColor;
var cityName,cityBound;
var tset,t_tset,classifier;
var vset,v_vset;
// ------------------------LIST OF CITY :----------------------------------------- 
var city={
  'Ahmedabad':[23.0225, 72.5714,11,Ahmedabad],
  'Kolkata':[22.5726, 88.3639,11,Kolkata],
  'Hyderabad':[17.3850, 78.4867,11,Hyderabad],
  'Delhi':[28.7041, 77.1025,11,Delhi],
};
// --------------------LIST OF TRAINING DATA SET :--------------------------------
var tdata={
  'Ahmedabad_1988':[urban_ahmedabad_1988,water_ahmedabad_1988,vegetation_ahmedabad_1988],
  'Ahmedabad_1993':[urban_ahmedabad_1993,water_ahmedabad_1993,vegetation_ahmedabad_1993],
  'Ahmedabad_1998':[urban_ahmedabad_1998,water_ahmedabad_1998,vegetation_ahmedabad_1998],
  //'Ahmedabad_2003':[],
  'Ahmedabad_2008':[urban_ahmedabad_2008,water_ahmedabad_2008,vegetation_ahmedabad_2008],
  'Ahmedabad_2013':[urban_ahmedabad_2013,water_ahmedabad_2013,vegetation_ahmedabad_2013],
  'Ahmedabad_2018':[urban_ahmedabad_2018,water_ahmedabad_2018,vegetation_ahmedabad_2018],
   'Kolkata_1988':[urban_kolkata_1988,water_kolkata_1988,vegetation_kolkata_1988],
  'Kolkata_1993':[urban_kolkata_1993,water_kolkata_1993,vegetation_kolkata_1993],
  'Kolkata_1998':[urban_kolkata_1998,water_kolkata_1998,vegetation_kolkata_1998],
  //'Kolkata_2003':[],
  'Kolkata_2008':[urban_kolkata_2008,water_kolkata_2008,vegetation_kolkata_2008],
  'Kolkata_2013':[urban_kolkata_2013,water_kolkata_2013,vegetation_kolkata_2013],
  'Kolkata_2018':[urban_kolkata_2018,water_kolkata_2018,vegetation_kolkata_2018],
};
// --------------------LIST OF VALIDATION DATA SET :------------------------------
var vdata={
  'Ahmedabad_1988':[v_urban_ahmedabad_1988,v_water_ahmedabad_1988,v_vegetation_ahmedabad_1988],
   'Ahmedabad_1993':[v_urban_ahmedabad_1993,v_water_ahmedabad_1993,v_vegetation_ahmedabad_1993],
  'Ahmedabad_1998':[v_urban_ahmedabad_1998,v_water_ahmedabad_1998,v_vegetation_ahmedabad_1998],
  //'Ahmedabad_2003':[],
  'Ahmedabad_2008':[v_urban_ahmedabad_2008,v_water_ahmedabad_2008,v_vegetation_ahmedabad_2008],
  'Ahmedabad_2013':[v_urban_ahmedabad_2013,v_water_ahmedabad_2013,v_vegetation_ahmedabad_2013],
  'Ahmedabad_2018':[v_urban_ahmedabad_2018,v_water_ahmedabad_2018,v_vegetation_ahmedabad_2018],
   'Kolkata_1988':[v_urban_kolkata_1988,v_water_kolkata_1988,v_vegetation_kolkata_1988],
   'Kolkata_1993':[v_urban_kolkata_1993,v_water_kolkata_1993,v_vegetation_kolkata_1993],
   'Kolkata_1998':[v_urban_kolkata_1998,v_water_kolkata_1998,v_vegetation_kolkata_1998],
  //'Kolkata_2003':[],
   'Kolkata_2008':[v_urban_kolkata_2008,v_water_kolkata_2008,v_vegetation_kolkata_2008],
   'Kolkata_2013':[v_urban_kolkata_2013,v_water_kolkata_2013,v_vegetation_kolkata_2013],
   'Kolkata_2018':[v_urban_kolkata_2018,v_water_kolkata_2018,v_vegetation_kolkata_2018],
};
// ------------------LIST OF YEARS FROM 1988 TO 2021 WITH GAP OF 5 YEARS:---------
var start_year=1988,current_year=2021,s_y_var;
var year={};
for(var i=start_year;i<=current_year;i=i+5)
{
  year[i]=i;
}
// -----------------------------------ADD Panel :--------------------------------
var panel=ui.Panel({
  layout:ui.Panel.Layout.flow('vertical'),
  style:{
    width:'300px',
    height:'auto',
  }
});
Map.setCenter(78.9629,20.5937,4);
// --------------------------------FOR CITY SELECTION :-------------------------
// ADD LABEL FOR CITY :
var citylabel=ui.Label({
  value:'select city',
  style:{
    color:'red',
  }
});
panel.add(citylabel);
// ADD ONE PANEL FOR CITY SELECTION :
var c_panel=ui.Panel({
  layout:ui.Panel.Layout.flow('horizontal'),
  style:{
    width:'200px',
    height:'auto',
  }
});
var c_var=ui.Select({
  placeholder:'select city',
  items:Object.keys(city),
  style:{stretch:'horizontal'},
  onChange:function(key)
  {
    cityName=key;
    Map.setCenter(city[key][1],city[key][0],city[key][2]);
    cityBound=city[key][3];
  }
});
c_panel.widgets().set(0,c_var);
panel.add(c_panel);
//panel.widgets().set(0,c_var);
// -----------------------------------FOR YEAR SELECTION :----------------------
// ADD LABEL FOR YEAR:
var yearlabel=ui.Label({
  value:'select year',
  style:{
    color:'red',
  }
});
panel.add(yearlabel);
// ADD ONE PANEL FOR YEAR SELECTION :
var y_panel=ui.Panel({
  layout:ui.Panel.Layout.flow('horizontal'),
  style:{
    width:'200px',
    height:'auto',
  }
});
var y_var=ui.Select({
  placeholder:'select year',
  items:Object.keys(year),
  style:{stretch:'horizontal'},
  onChange:function(key)
  {
    s_y_var=year[key];
    changeMap();
  }
});
y_panel.widgets().set(0,y_var);
panel.add(y_panel);
//panel.widgets().set(1,y_var);
// FUNCTION TO DISPLAY SATELLITE IMAGE:
function changeMap()
{
  var y_year=s_y_var;
  var startdate=y_year+'-02'+'-01';
  var enddate=y_year+'-04'+'-30';
  if(y_year>=2013)
  {
    imgCollection=L8;
    imgBands=['B2','B3','B4','B5','B6','B7','B8','B9','B10','B11'];
    imgBandTrueColor=['B4','B3','B2'];
    imgBandFalseColor=['B5','B4','B3'];
  }
  else
  {
    imgCollection=L5;
    imgBands=['B1','B2','B3','B4','B5','B6','B7'];
    imgBandTrueColor=['B3','B2','B1'];
    imgBandFalseColor=['B4','B3','B2'];
  }
   image=imgCollection.filterDate(startdate,enddate).filterBounds(cityBound)
            .sort('CLOUD_COVER').first().select(imgBands);
  print(image);
  Map.centerObject(cityBound,11);
   Map.addLayer(image,{bands: imgBandFalseColor,max:0.5,gamma:2},cityName+'_satellite image false color_'+y_year);
   Map.addLayer(image,{bands: imgBandTrueColor,max:0.5,gamma:2},cityName+'_satellite image true color_'+y_year);
}
                        // FOR TRAINING SETS:
//ADD LABEL :
var tlabel=ui.Label({
  value:'Select training set',
  style:{
    color:'red',
  }
});
panel.add(tlabel);
//ADD ONE PANEL FOR TRAINING SETS:
var t_panel=ui.Panel({
  layout:ui.Panel.Layout.flow('horizontal'),
  style:{
    width:'200px',
    height:'auto',
  }
});
var t_var=ui.Select({
  placeholder:'select training sets',
  items:Object.keys(tdata),
  style:{stretch:'horizontal'},
  onChange:function(key)
  {
    tset=key;
    t_tset=tdata[key][0].merge(tdata[key][1]).merge(tdata[key][2]);
    onchangeset();
  }
});
t_panel.widgets().set(0,t_var);
panel.add(t_panel);
function onchangeset()
{
  var ntset=t_tset;
  print (ntset);
  var bands=['B2','B3','B4','B5','B6','B7'];
  var training=image.select(bands).sampleRegions(
    {
      collection:ntset,
      properties:['landcover'],
      scale:90
    });
  print(training);
   classifier=ee.Classifier.smileCart().train({
    features:training,
    classProperty:'landcover',
    inputProperties: bands
  });
  var classified=image.select(bands).classify(classifier);
  Map.centerObject(ntset,11);
  Map.addLayer(image,{bands:['B4','B3','B2'],max:0.4},'landsat image');
  Map.addLayer(classified,{min:0,max:2,palette:['000000','2346D4','1C5807']},'classification');
  Map.addLayer(ntset);
}
// ----------- FOR VALIDATED DATA SET------------------------------------------------
// ADD LABEL :
var vlabel=ui.Label({
  value:'Select validated set',
  style:{
    color:'red',
  }
})
panel.add(vlabel);
// ADD ONE PANEL FOR VALIDATION DATA SET
var v_panel=ui.Panel({
  layout:ui.Panel.Layout.flow('horizontal'),
  style:{
    width:'200px',
    height:'auto',
  }
});
var v_var=ui.Select({
  placeholder:'select validated sets',
  items:Object.keys(vdata),
  style:{stretch:'horizontal'},
  onChange:function(key)
  {
    vset=key;
    v_vset=vdata[key][0].merge(vdata[key][1]).merge(vdata[key][2]);
    onChangeSet();
  }
});
v_panel.widgets().set(0,v_var);
panel.add(v_panel);
function onChangeSet()
{
  var nvset=v_vset;
  print (nvset);
  var bandss=['B2','B3','B4','B5','B6','B7'];
  var validation=image.select(bandss).sampleRegions(
    {
      collection:nvset,
      properties:['landcover'],
      scale:90
    });
  print(validation);
  var validated = validation.classify(classifier);
  var testAccuracy = validated.errorMatrix('landcover', 'classification');
  print('Validation error matrix: ', testAccuracy);
  print('Validation overall accuracy: ', testAccuracy.accuracy());
}
 // ---------------------ADD BUTTON TO RESET MAP :-----------------------------
var reset = ui.Button({
  label:'Reset Map',
});
reset.onClick(function(){
  Map.clear();
});
panel.add(reset);
ui.root.add(panel);