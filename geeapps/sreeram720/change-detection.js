var pich1 = ui.import && ui.import("pich1", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                79.78816272151425,
                11.503512815027191
              ],
              [
                79.76172686946347,
                11.480971354413262
              ],
              [
                79.75863696467832,
                11.467512907028048
              ],
              [
                79.76550341975644,
                11.4338639842596
              ],
              [
                79.78026629817441,
                11.38506594910363
              ],
              [
                79.7850728167291,
                11.375641914971979
              ],
              [
                79.79857149931036,
                11.362641257522863
              ],
              [
                79.79763845675052,
                11.351301897152211
              ],
              [
                79.80631821796374,
                11.341645299629151
              ],
              [
                79.81393559255503,
                11.336175239004026
              ],
              [
                79.81740085948582,
                11.3300738832728
              ],
              [
                79.81949280188394,
                11.327675438030138
              ],
              [
                79.82451302942593,
                11.323046713824665
              ],
              [
                79.83056308162168,
                11.324477436974005
              ],
              [
                79.83498345855105,
                11.333356134650101
              ],
              [
                79.83271970374904,
                11.334145109828368
              ],
              [
                79.8350908067689,
                11.336785531458466
              ],
              [
                79.83279489201732,
                11.340130775217304
              ],
              [
                79.83382475403323,
                11.345137879152768
              ],
              [
                79.83468295466855,
                11.349892518106962
              ],
              [
                79.8323231986518,
                11.364827906461198
              ],
              [
                79.82824647641075,
                11.38110962227392
              ],
              [
                79.81974841487363,
                11.412663109824347
              ],
              [
                79.80223895442441,
                11.464821140567391
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
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[79.78816272151425, 11.503512815027191],
          [79.76172686946347, 11.480971354413262],
          [79.75863696467832, 11.467512907028048],
          [79.76550341975644, 11.4338639842596],
          [79.78026629817441, 11.38506594910363],
          [79.7850728167291, 11.375641914971979],
          [79.79857149931036, 11.362641257522863],
          [79.79763845675052, 11.351301897152211],
          [79.80631821796374, 11.341645299629151],
          [79.81393559255503, 11.336175239004026],
          [79.81740085948582, 11.3300738832728],
          [79.81949280188394, 11.327675438030138],
          [79.82451302942593, 11.323046713824665],
          [79.83056308162168, 11.324477436974005],
          [79.83498345855105, 11.333356134650101],
          [79.83271970374904, 11.334145109828368],
          [79.8350908067689, 11.336785531458466],
          [79.83279489201732, 11.340130775217304],
          [79.83382475403323, 11.345137879152768],
          [79.83468295466855, 11.349892518106962],
          [79.8323231986518, 11.364827906461198],
          [79.82824647641075, 11.38110962227392],
          [79.81974841487363, 11.412663109824347],
          [79.80223895442441, 11.464821140567391]]]),
    imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "B5",
          "B4",
          "B3"
        ],
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["B5","B4","B3"],"gamma":1},
    l5tm = ui.import && ui.import("l5tm", "imageCollection", {
      "id": "LANDSAT/LT05/C01/T1"
    }) || ee.ImageCollection("LANDSAT/LT05/C01/T1"),
    l5mss = ui.import && ui.import("l5mss", "imageCollection", {
      "id": "LANDSAT/LM05/C01/T1"
    }) || ee.ImageCollection("LANDSAT/LM05/C01/T1"),
    l7mss = ui.import && ui.import("l7mss", "imageCollection", {
      "id": "LANDSAT/LE07/C01/T1_RT"
    }) || ee.ImageCollection("LANDSAT/LE07/C01/T1_RT"),
    l8mss = ui.import && ui.import("l8mss", "imageCollection", {
      "id": "LANDSAT/LC08/C01/T1_RT"
    }) || ee.ImageCollection("LANDSAT/LC08/C01/T1_RT"),
    l5mss1 = ui.import && ui.import("l5mss1", "imageCollection", {
      "id": "LANDSAT/LM05/C01/T1"
    }) || ee.ImageCollection("LANDSAT/LM05/C01/T1"),
    mangroves1988 = ui.import && ui.import("mangroves1988", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            79.79663693114139,
            11.4356628331866
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79689442320682,
            11.421276789682363
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.7958644549451,
            11.420435477994232
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79431950255253,
            11.42085613415024
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79286038084842,
            11.43187710306569
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78925549193241,
            11.442392895125518
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80230175658085,
            11.430615181784185
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79715191527225,
            11.433139018726974
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80624996825077,
            11.40049566094995
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80547749205448,
            11.421529182702375
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80590664549686,
            11.395110828939373
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.7998984973035,
            11.437345363667243
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79715191527225,
            11.440794519900031
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79492031737186,
            11.438354877157384
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78839718504764,
            11.42960564071342
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78959881468631,
            11.439785015107713
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79457699461796,
            11.425483310685005
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79749523802616,
            11.42060374053209
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.82826776766751,
            11.343346399369661
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.82753820681546,
            11.34675461941798
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.8079688098428,
            11.39837435067385
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80457438425219,
            11.419083598907914
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79899538950121,
            11.427538729777698
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78727170949048,
            11.439192591858989
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.7856049690447,
            11.424507369274764
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78097011186696,
            11.428377326797055
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.7961514181386,
            11.423718794013514
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79228903715716,
            11.424181510393515
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80128982400254,
            11.423136946476648
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.8012469086583,
            11.422316672991427
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80790438909094,
            11.401046667711903
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.81072130418056,
            11.397195679158745
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80737980413642,
            11.399586835100504
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.77920950328826,
            11.424649556693415
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78075445568084,
            11.425364661160339
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80808960941988,
            11.391869596017985
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.81254724317137,
            11.390008159264797
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.82082832519814,
            11.366228483165632
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80724561874672,
            11.428811438453758
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.82000756923958,
            11.36722773101488
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80992782776161,
            11.400432320272358
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80675209228798,
            11.416738697442188
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80180808521368,
            11.43003873869642
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80171152568914,
            11.428221934587725
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80282732463934,
            11.427359611198227
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80265566326239,
            11.428022128182198
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.8057573927183,
            11.422925129711256
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80336486227702,
            11.424649800844394
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.8035579813261,
            11.422441378607198
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.77643612994518,
            11.425969879020665
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79726328674155,
            11.419029203132744
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79701652351218,
            11.418745258467027
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.81187459425655,
            11.409521953489563
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.81214281515804,
            11.40874370802751
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80061805690138,
            11.392051253797993
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79967391932814,
            11.392766440370657
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.81041383986644,
            11.395143371054944
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.810075744389,
            11.39333950563611
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80627773642391,
            11.397188853529396
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80602024435848,
            11.39634747046327
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80546081355806,
            11.393102685248907
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.81936785082871,
            11.368329456196692
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.81037173326104,
            11.39915075181261
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.81127295549004,
            11.400454881639622
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.82495959076846,
            11.341375758831582
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.8075073191593,
            11.390445442096956
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80825833768347,
            11.396587608731163
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80804376096228,
            11.397807612333715
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "mangroves": 1
      },
      "color": "#d63000",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([79.79663693114139, 11.4356628331866]),
            {
              "mangroves": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79689442320682, 11.421276789682363]),
            {
              "mangroves": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([79.7958644549451, 11.420435477994232]),
            {
              "mangroves": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79431950255253, 11.42085613415024]),
            {
              "mangroves": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79286038084842, 11.43187710306569]),
            {
              "mangroves": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78925549193241, 11.442392895125518]),
            {
              "mangroves": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80230175658085, 11.430615181784185]),
            {
              "mangroves": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79715191527225, 11.433139018726974]),
            {
              "mangroves": 1,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80624996825077, 11.40049566094995]),
            {
              "mangroves": 1,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80547749205448, 11.421529182702375]),
            {
              "mangroves": 1,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80590664549686, 11.395110828939373]),
            {
              "mangroves": 1,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([79.7998984973035, 11.437345363667243]),
            {
              "mangroves": 1,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79715191527225, 11.440794519900031]),
            {
              "mangroves": 1,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79492031737186, 11.438354877157384]),
            {
              "mangroves": 1,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78839718504764, 11.42960564071342]),
            {
              "mangroves": 1,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78959881468631, 11.439785015107713]),
            {
              "mangroves": 1,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79457699461796, 11.425483310685005]),
            {
              "mangroves": 1,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79749523802616, 11.42060374053209]),
            {
              "mangroves": 1,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([79.82826776766751, 11.343346399369661]),
            {
              "mangroves": 1,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([79.82753820681546, 11.34675461941798]),
            {
              "mangroves": 1,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([79.8079688098428, 11.39837435067385]),
            {
              "mangroves": 1,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80457438425219, 11.419083598907914]),
            {
              "mangroves": 1,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79899538950121, 11.427538729777698]),
            {
              "mangroves": 1,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78727170949048, 11.439192591858989]),
            {
              "mangroves": 1,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([79.7856049690447, 11.424507369274764]),
            {
              "mangroves": 1,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78097011186696, 11.428377326797055]),
            {
              "mangroves": 1,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([79.7961514181386, 11.423718794013514]),
            {
              "mangroves": 1,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79228903715716, 11.424181510393515]),
            {
              "mangroves": 1,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80128982400254, 11.423136946476648]),
            {
              "mangroves": 1,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([79.8012469086583, 11.422316672991427]),
            {
              "mangroves": 1,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80790438909094, 11.401046667711903]),
            {
              "mangroves": 1,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([79.81072130418056, 11.397195679158745]),
            {
              "mangroves": 1,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80737980413642, 11.399586835100504]),
            {
              "mangroves": 1,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([79.77920950328826, 11.424649556693415]),
            {
              "mangroves": 1,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78075445568084, 11.425364661160339]),
            {
              "mangroves": 1,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80808960941988, 11.391869596017985]),
            {
              "mangroves": 1,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([79.81254724317137, 11.390008159264797]),
            {
              "mangroves": 1,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([79.82082832519814, 11.366228483165632]),
            {
              "mangroves": 1,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80724561874672, 11.428811438453758]),
            {
              "mangroves": 1,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([79.82000756923958, 11.36722773101488]),
            {
              "mangroves": 1,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80992782776161, 11.400432320272358]),
            {
              "mangroves": 1,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80675209228798, 11.416738697442188]),
            {
              "mangroves": 1,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80180808521368, 11.43003873869642]),
            {
              "mangroves": 1,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80171152568914, 11.428221934587725]),
            {
              "mangroves": 1,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80282732463934, 11.427359611198227]),
            {
              "mangroves": 1,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80265566326239, 11.428022128182198]),
            {
              "mangroves": 1,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([79.8057573927183, 11.422925129711256]),
            {
              "mangroves": 1,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80336486227702, 11.424649800844394]),
            {
              "mangroves": 1,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([79.8035579813261, 11.422441378607198]),
            {
              "mangroves": 1,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([79.77643612994518, 11.425969879020665]),
            {
              "mangroves": 1,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79726328674155, 11.419029203132744]),
            {
              "mangroves": 1,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79701652351218, 11.418745258467027]),
            {
              "mangroves": 1,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([79.81187459425655, 11.409521953489563]),
            {
              "mangroves": 1,
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Point([79.81214281515804, 11.40874370802751]),
            {
              "mangroves": 1,
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80061805690138, 11.392051253797993]),
            {
              "mangroves": 1,
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79967391932814, 11.392766440370657]),
            {
              "mangroves": 1,
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Point([79.81041383986644, 11.395143371054944]),
            {
              "mangroves": 1,
              "system:index": "56"
            }),
        ee.Feature(
            ee.Geometry.Point([79.810075744389, 11.39333950563611]),
            {
              "mangroves": 1,
              "system:index": "57"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80627773642391, 11.397188853529396]),
            {
              "mangroves": 1,
              "system:index": "58"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80602024435848, 11.39634747046327]),
            {
              "mangroves": 1,
              "system:index": "59"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80546081355806, 11.393102685248907]),
            {
              "mangroves": 1,
              "system:index": "60"
            }),
        ee.Feature(
            ee.Geometry.Point([79.81936785082871, 11.368329456196692]),
            {
              "mangroves": 1,
              "system:index": "61"
            }),
        ee.Feature(
            ee.Geometry.Point([79.81037173326104, 11.39915075181261]),
            {
              "mangroves": 1,
              "system:index": "62"
            }),
        ee.Feature(
            ee.Geometry.Point([79.81127295549004, 11.400454881639622]),
            {
              "mangroves": 1,
              "system:index": "63"
            }),
        ee.Feature(
            ee.Geometry.Point([79.82495959076846, 11.341375758831582]),
            {
              "mangroves": 1,
              "system:index": "64"
            }),
        ee.Feature(
            ee.Geometry.Point([79.8075073191593, 11.390445442096956]),
            {
              "mangroves": 1,
              "system:index": "65"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80825833768347, 11.396587608731163]),
            {
              "mangroves": 1,
              "system:index": "66"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80804376096228, 11.397807612333715]),
            {
              "mangroves": 1,
              "system:index": "67"
            })]),
    water1988 = ui.import && ui.import("water1988", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            79.78201679949223,
            11.446586492787203
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78304676775394,
            11.443389780671465
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78450588945805,
            11.445829380023115
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78364758257328,
            11.440445408623944
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78416256670414,
            11.430770827771038
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78261761431156,
            11.4300978011594
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79145817522465,
            11.448941941764618
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78699497942387,
            11.451802103443548
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80707936052738,
            11.40603605047196
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80750851396976,
            11.409990394357383
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80991177324711,
            11.41251441484899
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80982594255863,
            11.417898916876371
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.81497578386723,
            11.38592693965071
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.81403164629398,
            11.368761553210547
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.8120360827869,
            11.377912347563923
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.81013707880436,
            11.380184223357334
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80097470446992,
            11.426648493637536
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80024514361787,
            11.428898947496599
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79446230098176,
            11.430918031077855
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78959140941072,
            11.430539454002155
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "mangroves": 0
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
            ee.Geometry.Point([79.78201679949223, 11.446586492787203]),
            {
              "mangroves": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78304676775394, 11.443389780671465]),
            {
              "mangroves": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78450588945805, 11.445829380023115]),
            {
              "mangroves": 0,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78364758257328, 11.440445408623944]),
            {
              "mangroves": 0,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78416256670414, 11.430770827771038]),
            {
              "mangroves": 0,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78261761431156, 11.4300978011594]),
            {
              "mangroves": 0,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79145817522465, 11.448941941764618]),
            {
              "mangroves": 0,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78699497942387, 11.451802103443548]),
            {
              "mangroves": 0,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80707936052738, 11.40603605047196]),
            {
              "mangroves": 0,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80750851396976, 11.409990394357383]),
            {
              "mangroves": 0,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80991177324711, 11.41251441484899]),
            {
              "mangroves": 0,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80982594255863, 11.417898916876371]),
            {
              "mangroves": 0,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([79.81497578386723, 11.38592693965071]),
            {
              "mangroves": 0,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([79.81403164629398, 11.368761553210547]),
            {
              "mangroves": 0,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([79.8120360827869, 11.377912347563923]),
            {
              "mangroves": 0,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([79.81013707880436, 11.380184223357334]),
            {
              "mangroves": 0,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80097470446992, 11.426648493637536]),
            {
              "mangroves": 0,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80024514361787, 11.428898947496599]),
            {
              "mangroves": 0,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79446230098176, 11.430918031077855]),
            {
              "mangroves": 0,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78959140941072, 11.430539454002155]),
            {
              "mangroves": 0,
              "system:index": "19"
            })]),
    others1998 = ui.import && ui.import("others1998", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            79.80129552276799,
            11.402621085549312
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78189778717228,
            11.411371154416697
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.77726292999455,
            11.441321270252947
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.77331471832463,
            11.450911368357508
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.8074753323383,
            11.380408162296227
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79030919464299,
            11.393870747166936
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.77331471832463,
            11.422644883949603
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.76970982940861,
            11.437956246541889
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.81640172393986,
            11.391178281165327
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.81726003082463,
            11.380744734681091
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79219746978947,
            11.413390362783403
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80696034820744,
            11.43778799430661
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79872060211369,
            11.4067437477395
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78069615753361,
            11.416419148397038
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.77923703582951,
            11.46563237745167
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.76550412567326,
            11.468155902012477
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.76481748016545,
            11.47522165081073
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.77717709930607,
            11.456211019943712
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.77202725799748,
            11.462940593072176
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.76807904632756,
            11.455369812037782
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.7840435543842,
            11.422055968870882
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78006309851162,
            11.427288539783756
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78650040014736,
            11.426846860823433
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.77826065405361,
            11.426741699064767
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80334604393329,
            11.411923413308067
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80248773704852,
            11.412617516453883
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.803474789966,
            11.413437817983253
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79319913358063,
            11.458217667113022
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79322059125275,
            11.4536330862154
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79658944577545,
            11.453086296376199
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79564530820221,
            11.456030536875279
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79508740872711,
            11.454894904886077
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79701063901496,
            11.451903164564769
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.7939207342298,
            11.449253310823392
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.81116904311227,
            11.379692877586377
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.81062723689126,
            11.380481720468927
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.81033755831766,
            11.380755185491273
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.81170548491525,
            11.378872478669711
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.8100210576539,
            11.38127056116543
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.81400503796726,
            11.394347942836307
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.81445564908176,
            11.393948282196371
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.81308235806614,
            11.393948282196371
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.82343507146118,
            11.34031377723679
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.82822725093376,
            11.339559892512021
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.82758352077019,
            11.340780140292853
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.8259098223449,
            11.338171328353038
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.82548066890251,
            11.33993859065692
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.82870667528118,
            11.338494869870289
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.8282775218388,
            11.336980066625356
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.82746213029827,
            11.33706422257186
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.8286208445927,
            11.336769676650711
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.82044775454096,
            11.35275705701174
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.82349474398188,
            11.355786488078289
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.82134897676997,
            11.351158177649161
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.82255060640864,
            11.350863646263264
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.82551176516108,
            11.351578936244614
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.82040483919673,
            11.35595478886107
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.82229311434321,
            11.349433060922905
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.82516844240718,
            11.350569114573444
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.82443888155512,
            11.353935172915122
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.8204906698852,
            11.354902907339797
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.81924612490229,
            11.353346115571426
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "mangroves": 0
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
            ee.Geometry.Point([79.80129552276799, 11.402621085549312]),
            {
              "mangroves": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78189778717228, 11.411371154416697]),
            {
              "mangroves": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([79.77726292999455, 11.441321270252947]),
            {
              "mangroves": 0,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([79.77331471832463, 11.450911368357508]),
            {
              "mangroves": 0,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([79.8074753323383, 11.380408162296227]),
            {
              "mangroves": 0,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79030919464299, 11.393870747166936]),
            {
              "mangroves": 0,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([79.77331471832463, 11.422644883949603]),
            {
              "mangroves": 0,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([79.76970982940861, 11.437956246541889]),
            {
              "mangroves": 0,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([79.81640172393986, 11.391178281165327]),
            {
              "mangroves": 0,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([79.81726003082463, 11.380744734681091]),
            {
              "mangroves": 0,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79219746978947, 11.413390362783403]),
            {
              "mangroves": 0,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80696034820744, 11.43778799430661]),
            {
              "mangroves": 0,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79872060211369, 11.4067437477395]),
            {
              "mangroves": 0,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78069615753361, 11.416419148397038]),
            {
              "mangroves": 0,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([79.77923703582951, 11.46563237745167]),
            {
              "mangroves": 0,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([79.76550412567326, 11.468155902012477]),
            {
              "mangroves": 0,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([79.76481748016545, 11.47522165081073]),
            {
              "mangroves": 0,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([79.77717709930607, 11.456211019943712]),
            {
              "mangroves": 0,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([79.77202725799748, 11.462940593072176]),
            {
              "mangroves": 0,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([79.76807904632756, 11.455369812037782]),
            {
              "mangroves": 0,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([79.7840435543842, 11.422055968870882]),
            {
              "mangroves": 0,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78006309851162, 11.427288539783756]),
            {
              "mangroves": 0,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78650040014736, 11.426846860823433]),
            {
              "mangroves": 0,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([79.77826065405361, 11.426741699064767]),
            {
              "mangroves": 0,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80334604393329, 11.411923413308067]),
            {
              "mangroves": 0,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80248773704852, 11.412617516453883]),
            {
              "mangroves": 0,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([79.803474789966, 11.413437817983253]),
            {
              "mangroves": 0,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79319913358063, 11.458217667113022]),
            {
              "mangroves": 0,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79322059125275, 11.4536330862154]),
            {
              "mangroves": 0,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79658944577545, 11.453086296376199]),
            {
              "mangroves": 0,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79564530820221, 11.456030536875279]),
            {
              "mangroves": 0,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79508740872711, 11.454894904886077]),
            {
              "mangroves": 0,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79701063901496, 11.451903164564769]),
            {
              "mangroves": 0,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([79.7939207342298, 11.449253310823392]),
            {
              "mangroves": 0,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([79.81116904311227, 11.379692877586377]),
            {
              "mangroves": 0,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([79.81062723689126, 11.380481720468927]),
            {
              "mangroves": 0,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([79.81033755831766, 11.380755185491273]),
            {
              "mangroves": 0,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([79.81170548491525, 11.378872478669711]),
            {
              "mangroves": 0,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([79.8100210576539, 11.38127056116543]),
            {
              "mangroves": 0,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([79.81400503796726, 11.394347942836307]),
            {
              "mangroves": 0,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([79.81445564908176, 11.393948282196371]),
            {
              "mangroves": 0,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([79.81308235806614, 11.393948282196371]),
            {
              "mangroves": 0,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([79.82343507146118, 11.34031377723679]),
            {
              "mangroves": 0,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([79.82822725093376, 11.339559892512021]),
            {
              "mangroves": 0,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([79.82758352077019, 11.340780140292853]),
            {
              "mangroves": 0,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([79.8259098223449, 11.338171328353038]),
            {
              "mangroves": 0,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([79.82548066890251, 11.33993859065692]),
            {
              "mangroves": 0,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([79.82870667528118, 11.338494869870289]),
            {
              "mangroves": 0,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([79.8282775218388, 11.336980066625356]),
            {
              "mangroves": 0,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([79.82746213029827, 11.33706422257186]),
            {
              "mangroves": 0,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([79.8286208445927, 11.336769676650711]),
            {
              "mangroves": 0,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([79.82044775454096, 11.35275705701174]),
            {
              "mangroves": 0,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([79.82349474398188, 11.355786488078289]),
            {
              "mangroves": 0,
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Point([79.82134897676997, 11.351158177649161]),
            {
              "mangroves": 0,
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Point([79.82255060640864, 11.350863646263264]),
            {
              "mangroves": 0,
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Point([79.82551176516108, 11.351578936244614]),
            {
              "mangroves": 0,
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Point([79.82040483919673, 11.35595478886107]),
            {
              "mangroves": 0,
              "system:index": "56"
            }),
        ee.Feature(
            ee.Geometry.Point([79.82229311434321, 11.349433060922905]),
            {
              "mangroves": 0,
              "system:index": "57"
            }),
        ee.Feature(
            ee.Geometry.Point([79.82516844240718, 11.350569114573444]),
            {
              "mangroves": 0,
              "system:index": "58"
            }),
        ee.Feature(
            ee.Geometry.Point([79.82443888155512, 11.353935172915122]),
            {
              "mangroves": 0,
              "system:index": "59"
            }),
        ee.Feature(
            ee.Geometry.Point([79.8204906698852, 11.354902907339797]),
            {
              "mangroves": 0,
              "system:index": "60"
            }),
        ee.Feature(
            ee.Geometry.Point([79.81924612490229, 11.353346115571426]),
            {
              "mangroves": 0,
              "system:index": "61"
            })]),
    mangroves2008 = ui.import && ui.import("mangroves2008", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            79.79731180275905,
            11.420026186169675
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.7971401413821,
            11.423559683587666
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79739763344753,
            11.427766170720417
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79550935830105,
            11.433066255623649
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79156114663112,
            11.43205672328498
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80168916787136,
            11.435674197514526
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80040170754421,
            11.438450367335063
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80323412026394,
            11.427177266279354
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80220415200222,
            11.432309106706882
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78864290322292,
            11.441731260215136
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.77928735817898,
            11.426924878287211
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78632547463405,
            11.428523331775365
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78975870217312,
            11.427597912433535
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80254747475612,
            11.41270665864536
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79576685036648,
            11.419437265653468
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79954340065945,
            11.411781187697759
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80615236367214,
            11.399497378496859
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.7982559403323,
            11.432393234464941
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80606653298366,
            11.420783367894678
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79379274453152,
            11.446862836931334
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80606653298366,
            11.395206333673725
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.81044569480116,
            11.39488506737848
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80841363803643,
            11.384807568092972
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.81196120013828,
            11.367764760385976
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.81742188820499,
            11.37156157929732
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.81986806282657,
            11.369731403139822
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.81392008295427,
            11.366627688117637
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.82589220607315,
            11.348682140994573
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.82569908702408,
            11.35118566722097
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.8240468462709,
            11.355056622526023
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.8280003879438,
            11.343993986372721
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.82739957312447,
            11.346392362245753
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.82482465247017,
            11.342310903557907
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.82509845745551,
            11.341592144337914
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80424096524735,
            11.41805061006713
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80488469541092,
            11.41245577684682
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80752163864281,
            11.399346290284493
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.8080597095202,
            11.397218204188961
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.8064034966776,
            11.427773186692772
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80614600461217,
            11.43164309962544
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.7921556023905,
            11.424323871935297
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78425917905065,
            11.425712015847438
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78074012082311,
            11.425796145563066
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.7870057610819,
            11.427731122131453
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78739199918004,
            11.425712015847438
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79443011563512,
            11.437031038348016
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78945193570348,
            11.440313883675381
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79691920560094,
            11.440818635578617
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "mangroves1": 1
      },
      "color": "#ffc82d",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #ffc82d */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([79.79731180275905, 11.420026186169675]),
            {
              "mangroves1": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([79.7971401413821, 11.423559683587666]),
            {
              "mangroves1": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79739763344753, 11.427766170720417]),
            {
              "mangroves1": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79550935830105, 11.433066255623649]),
            {
              "mangroves1": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79156114663112, 11.43205672328498]),
            {
              "mangroves1": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80168916787136, 11.435674197514526]),
            {
              "mangroves1": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80040170754421, 11.438450367335063]),
            {
              "mangroves1": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80323412026394, 11.427177266279354]),
            {
              "mangroves1": 1,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80220415200222, 11.432309106706882]),
            {
              "mangroves1": 1,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78864290322292, 11.441731260215136]),
            {
              "mangroves1": 1,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([79.77928735817898, 11.426924878287211]),
            {
              "mangroves1": 1,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78632547463405, 11.428523331775365]),
            {
              "mangroves1": 1,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78975870217312, 11.427597912433535]),
            {
              "mangroves1": 1,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80254747475612, 11.41270665864536]),
            {
              "mangroves1": 1,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79576685036648, 11.419437265653468]),
            {
              "mangroves1": 1,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79954340065945, 11.411781187697759]),
            {
              "mangroves1": 1,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80615236367214, 11.399497378496859]),
            {
              "mangroves1": 1,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([79.7982559403323, 11.432393234464941]),
            {
              "mangroves1": 1,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80606653298366, 11.420783367894678]),
            {
              "mangroves1": 1,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79379274453152, 11.446862836931334]),
            {
              "mangroves1": 1,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80606653298366, 11.395206333673725]),
            {
              "mangroves1": 1,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([79.81044569480116, 11.39488506737848]),
            {
              "mangroves1": 1,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80841363803643, 11.384807568092972]),
            {
              "mangroves1": 1,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([79.81196120013828, 11.367764760385976]),
            {
              "mangroves1": 1,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([79.81742188820499, 11.37156157929732]),
            {
              "mangroves1": 1,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([79.81986806282657, 11.369731403139822]),
            {
              "mangroves1": 1,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([79.81392008295427, 11.366627688117637]),
            {
              "mangroves1": 1,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([79.82589220607315, 11.348682140994573]),
            {
              "mangroves1": 1,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([79.82569908702408, 11.35118566722097]),
            {
              "mangroves1": 1,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([79.8240468462709, 11.355056622526023]),
            {
              "mangroves1": 1,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([79.8280003879438, 11.343993986372721]),
            {
              "mangroves1": 1,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([79.82739957312447, 11.346392362245753]),
            {
              "mangroves1": 1,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([79.82482465247017, 11.342310903557907]),
            {
              "mangroves1": 1,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([79.82509845745551, 11.341592144337914]),
            {
              "mangroves1": 1,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80424096524735, 11.41805061006713]),
            {
              "mangroves1": 1,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80488469541092, 11.41245577684682]),
            {
              "mangroves1": 1,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80752163864281, 11.399346290284493]),
            {
              "mangroves1": 1,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([79.8080597095202, 11.397218204188961]),
            {
              "mangroves1": 1,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([79.8064034966776, 11.427773186692772]),
            {
              "mangroves1": 1,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80614600461217, 11.43164309962544]),
            {
              "mangroves1": 1,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([79.7921556023905, 11.424323871935297]),
            {
              "mangroves1": 1,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78425917905065, 11.425712015847438]),
            {
              "mangroves1": 1,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78074012082311, 11.425796145563066]),
            {
              "mangroves1": 1,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([79.7870057610819, 11.427731122131453]),
            {
              "mangroves1": 1,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78739199918004, 11.425712015847438]),
            {
              "mangroves1": 1,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79443011563512, 11.437031038348016]),
            {
              "mangroves1": 1,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78945193570348, 11.440313883675381]),
            {
              "mangroves1": 1,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79691920560094, 11.440818635578617]),
            {
              "mangroves1": 1,
              "system:index": "47"
            })]),
    water2008 = ui.import && ui.import("water2008", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            79.783793469324,
            11.44038525748021
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78224851693142,
            11.446358095806909
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78662588204372,
            11.451741954713778
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79126073922146,
            11.44837705490357
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79349233712185,
            11.441478885190802
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78774168099392,
            11.435253563350924
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78422262276638,
            11.430290033038498
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78533842171657,
            11.44534861085656
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79083158577907,
            11.455022693485978
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78216268624294,
            11.430290033038803
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.7742662629031,
            11.427513783254186
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80671026314724,
            11.403451813415877
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80808355416286,
            11.409677833415104
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.81031515206325,
            11.413127326261796
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80404951180446,
            11.419815857555754
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80108835305202,
            11.42637803686823
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80851270760525,
            11.414431391905879
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80907060708034,
            11.425494675422142
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79420281306875,
            11.430924789671874
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.7873149003185,
            11.43111407801555
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79366637126577,
            11.450799374987682
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79576922313345,
            11.454416609691703
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "mangroves1": 0
      },
      "color": "#00ffff",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #00ffff */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([79.783793469324, 11.44038525748021]),
            {
              "mangroves1": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78224851693142, 11.446358095806909]),
            {
              "mangroves1": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78662588204372, 11.451741954713778]),
            {
              "mangroves1": 0,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79126073922146, 11.44837705490357]),
            {
              "mangroves1": 0,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79349233712185, 11.441478885190802]),
            {
              "mangroves1": 0,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78774168099392, 11.435253563350924]),
            {
              "mangroves1": 0,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78422262276638, 11.430290033038498]),
            {
              "mangroves1": 0,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78533842171657, 11.44534861085656]),
            {
              "mangroves1": 0,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79083158577907, 11.455022693485978]),
            {
              "mangroves1": 0,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78216268624294, 11.430290033038803]),
            {
              "mangroves1": 0,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([79.7742662629031, 11.427513783254186]),
            {
              "mangroves1": 0,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80671026314724, 11.403451813415877]),
            {
              "mangroves1": 0,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80808355416286, 11.409677833415104]),
            {
              "mangroves1": 0,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([79.81031515206325, 11.413127326261796]),
            {
              "mangroves1": 0,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80404951180446, 11.419815857555754]),
            {
              "mangroves1": 0,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80108835305202, 11.42637803686823]),
            {
              "mangroves1": 0,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80851270760525, 11.414431391905879]),
            {
              "mangroves1": 0,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80907060708034, 11.425494675422142]),
            {
              "mangroves1": 0,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79420281306875, 11.430924789671874]),
            {
              "mangroves1": 0,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([79.7873149003185, 11.43111407801555]),
            {
              "mangroves1": 0,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79366637126577, 11.450799374987682]),
            {
              "mangroves1": 0,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79576922313345, 11.454416609691703]),
            {
              "mangroves1": 0,
              "system:index": "21"
            })]),
    others2008 = ui.import && ui.import("others2008", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            79.80383730785024,
            11.436708543068415
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.77538443462026,
            11.447813018453633
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.77881766215933,
            11.466487744044015
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79066229716909,
            11.414666552548711
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.7719512070812,
            11.444784568370018
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.7716078843273,
            11.455384001828952
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78242255107534,
            11.457234655825266
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.77624274150503,
            11.46732891885541
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80027533427847,
            11.402887687577866
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80027533427847,
            11.400195306990952
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79289389506948,
            11.413993487715786
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.7825942124523,
            11.41584441216501
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.7745261277355,
            11.423247989207024
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.77778769389761,
            11.446467044640077
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.77864600078237,
            11.461777118812245
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79152060405386,
            11.465310095099644
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80370856181753,
            11.388584123550888
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.801991948048,
            11.384377056026116
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.82121802226675,
            11.378991918833556
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80920172588003,
            11.375962734395094
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78671408549917,
            11.42164950597659
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80529642955435,
            11.427917191247666
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.77873183147085,
            11.414918951449902
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78130675212515,
            11.4356148969347
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78779862083456,
            11.495952027108792
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78745529808066,
            11.484849444061041
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79226181663535,
            11.482494294476274
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79432175315878,
            11.476101646485066
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79929993309042,
            11.461465301985605
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80410645164511,
            11.452212049340016
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80908463157675,
            11.439256987066708
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.8169810549166,
            11.415532544754637
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.82041428245566,
            11.403417170559512
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.82178757347128,
            11.396349630280133
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.81251785911581,
            11.430339521826308
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.8257357851412,
            11.384570006018597
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.81801102317831,
            11.412840284060934
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78453875086814,
            11.405098506747418
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.7828221370986,
            11.413343699341727
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.7766423275283,
            11.409305267581137
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.7689175655654,
            11.435049285078478
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.76908922694236,
            11.443798353360878
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.774067406874,
            11.438414343332726
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78968859217673,
            11.396684798176961
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78625536463767,
            11.391804733076112
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78471041224509,
            11.400218586121968
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.7963833858779,
            11.408800459571696
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.77612734339743,
            11.435890553390253
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80050325892478,
            11.37480799073237
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.77423906825095,
            11.419232975983642
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.76926088831931,
            11.470212167853656
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.7711491634658,
            11.476100261247606
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.76737261317282,
            11.481315327097295
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.76445436976462,
            11.473240345509762
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.76479769251853,
            11.469202768084553
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.76479769251853,
            11.455743759845937
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.76754427454978,
            11.45406133875106
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "mangroves1": 0
      },
      "color": "#bf04c2",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #bf04c2 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([79.80383730785024, 11.436708543068415]),
            {
              "mangroves1": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([79.77538443462026, 11.447813018453633]),
            {
              "mangroves1": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([79.77881766215933, 11.466487744044015]),
            {
              "mangroves1": 0,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79066229716909, 11.414666552548711]),
            {
              "mangroves1": 0,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([79.7719512070812, 11.444784568370018]),
            {
              "mangroves1": 0,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([79.7716078843273, 11.455384001828952]),
            {
              "mangroves1": 0,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78242255107534, 11.457234655825266]),
            {
              "mangroves1": 0,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([79.77624274150503, 11.46732891885541]),
            {
              "mangroves1": 0,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80027533427847, 11.402887687577866]),
            {
              "mangroves1": 0,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80027533427847, 11.400195306990952]),
            {
              "mangroves1": 0,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79289389506948, 11.413993487715786]),
            {
              "mangroves1": 0,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([79.7825942124523, 11.41584441216501]),
            {
              "mangroves1": 0,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([79.7745261277355, 11.423247989207024]),
            {
              "mangroves1": 0,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([79.77778769389761, 11.446467044640077]),
            {
              "mangroves1": 0,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([79.77864600078237, 11.461777118812245]),
            {
              "mangroves1": 0,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79152060405386, 11.465310095099644]),
            {
              "mangroves1": 0,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80370856181753, 11.388584123550888]),
            {
              "mangroves1": 0,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([79.801991948048, 11.384377056026116]),
            {
              "mangroves1": 0,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([79.82121802226675, 11.378991918833556]),
            {
              "mangroves1": 0,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80920172588003, 11.375962734395094]),
            {
              "mangroves1": 0,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78671408549917, 11.42164950597659]),
            {
              "mangroves1": 0,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80529642955435, 11.427917191247666]),
            {
              "mangroves1": 0,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([79.77873183147085, 11.414918951449902]),
            {
              "mangroves1": 0,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78130675212515, 11.4356148969347]),
            {
              "mangroves1": 0,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78779862083456, 11.495952027108792]),
            {
              "mangroves1": 0,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78745529808066, 11.484849444061041]),
            {
              "mangroves1": 0,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79226181663535, 11.482494294476274]),
            {
              "mangroves1": 0,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79432175315878, 11.476101646485066]),
            {
              "mangroves1": 0,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79929993309042, 11.461465301985605]),
            {
              "mangroves1": 0,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80410645164511, 11.452212049340016]),
            {
              "mangroves1": 0,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80908463157675, 11.439256987066708]),
            {
              "mangroves1": 0,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([79.8169810549166, 11.415532544754637]),
            {
              "mangroves1": 0,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([79.82041428245566, 11.403417170559512]),
            {
              "mangroves1": 0,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([79.82178757347128, 11.396349630280133]),
            {
              "mangroves1": 0,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([79.81251785911581, 11.430339521826308]),
            {
              "mangroves1": 0,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([79.8257357851412, 11.384570006018597]),
            {
              "mangroves1": 0,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([79.81801102317831, 11.412840284060934]),
            {
              "mangroves1": 0,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78453875086814, 11.405098506747418]),
            {
              "mangroves1": 0,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([79.7828221370986, 11.413343699341727]),
            {
              "mangroves1": 0,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([79.7766423275283, 11.409305267581137]),
            {
              "mangroves1": 0,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([79.7689175655654, 11.435049285078478]),
            {
              "mangroves1": 0,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([79.76908922694236, 11.443798353360878]),
            {
              "mangroves1": 0,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([79.774067406874, 11.438414343332726]),
            {
              "mangroves1": 0,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78968859217673, 11.396684798176961]),
            {
              "mangroves1": 0,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78625536463767, 11.391804733076112]),
            {
              "mangroves1": 0,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78471041224509, 11.400218586121968]),
            {
              "mangroves1": 0,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([79.7963833858779, 11.408800459571696]),
            {
              "mangroves1": 0,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([79.77612734339743, 11.435890553390253]),
            {
              "mangroves1": 0,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80050325892478, 11.37480799073237]),
            {
              "mangroves1": 0,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([79.77423906825095, 11.419232975983642]),
            {
              "mangroves1": 0,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([79.76926088831931, 11.470212167853656]),
            {
              "mangroves1": 0,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([79.7711491634658, 11.476100261247606]),
            {
              "mangroves1": 0,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([79.76737261317282, 11.481315327097295]),
            {
              "mangroves1": 0,
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Point([79.76445436976462, 11.473240345509762]),
            {
              "mangroves1": 0,
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Point([79.76479769251853, 11.469202768084553]),
            {
              "mangroves1": 0,
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Point([79.76479769251853, 11.455743759845937]),
            {
              "mangroves1": 0,
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Point([79.76754427454978, 11.45406133875106]),
            {
              "mangroves1": 0,
              "system:index": "56"
            })]),
    mangroves2018 = ui.import && ui.import("mangroves2018", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            79.79191516895935,
            11.420449831972633
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79509090443298,
            11.41918785982528
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79775165577576,
            11.4188513329711
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79775165577576,
            11.4229737594221
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79818080921814,
            11.42776915968319
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79792331715271,
            11.433489881938836
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79629253407165,
            11.435340679115518
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78032802601501,
            11.427685030553128
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78058551808044,
            11.422553106407067
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78316043873474,
            11.420029175214037
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80315898914978,
            11.41430818136981
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80513309498474,
            11.41918785982528
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.8067638780658,
            11.422048321965397
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80645358862591,
            11.400564954912824
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80628192724896,
            11.394675291106811
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.81074512304974,
            11.393749761413474
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.81473262497775,
            11.37159587680108
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.817479207009,
            11.37075441806013
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.81172855088107,
            11.390285995334397
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.7913892872266,
            11.433472757621562
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78967267345706,
            11.44037112240841
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.7858961231641,
            11.43658545521887
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79370671581546,
            11.447437565720307
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.7998006946973,
            11.43751084520531
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80228978466312,
            11.43372513978203
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.7781713612012,
            11.427079001239834
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.7905336850697,
            11.425004922844728
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78813042579236,
            11.427612938924435
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79805332314504,
            11.447994843862638
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80131488930715,
            11.44277916302602
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79934078347219,
            11.443368035030753
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79753833901418,
            11.441012539661692
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79556423317922,
            11.438993528032434
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79376178872121,
            11.434787207569816
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79333263527883,
            11.432684023913984
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80603557717336,
            11.43192687397575
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80577808510793,
            11.435123715505702
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80354648720754,
            11.431169722014223
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80243068825735,
            11.429150640226231
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80243068825735,
            11.426458508800117
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79934078347219,
            11.426206120168034
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79530674111379,
            11.425448952923588
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.81165674725776,
            11.368165370651527
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.81412437955146,
            11.366692798495585
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.82611887039229,
            11.349355566077705
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.82749216140792,
            11.346515411400732
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.82742778839156,
            11.34405392116179
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.82521764816329,
            11.35257437388403
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.8251883157634,
            11.34234393370663
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.82538143481247,
            11.341691736525158
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.81057279196489,
            11.392226670469936
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80570190039384,
            11.392815647414796
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80999343481767,
            11.399462588343
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.8255473577176,
            11.351346761437194
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.82258619896515,
            11.35147298899755
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.81151404015168,
            11.401532254254933
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.81022657982453,
            11.402121211917095
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80610670677765,
            11.4302763838129
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80666460625275,
            11.426911228900806
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80293097130402,
            11.439572416550211
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80314554802521,
            11.438899410850416
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.8195532514693,
            11.370071099083903
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.82058321973102,
            11.367083893320114
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.8239903870383,
            11.345265172571006
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.82596449287325,
            11.348420912064633
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.82373289497286,
            11.34231978424577
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.8081239301132,
            11.391704927400903
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80782352270353,
            11.398562238816991
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80636440099943,
            11.397173962130509
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80199689049925,
            11.410976340915354
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80568761010375,
            11.412574884280385
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80388516564574,
            11.418001451171223
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79809159417357,
            11.417202195898168
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80700333007917,
            11.425742521886235
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79899302491765,
            11.432065105885652
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78661449805986,
            11.429468896544154
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78674324409258,
            11.426692638716256
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78940399543535,
            11.43296021247833
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78642264632606,
            11.423704057427898
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78414813308143,
            11.41911891770711
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79247370986366,
            11.419329246839347
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79294577865028,
            11.422400034408577
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.8102793944779,
            11.40579960283252
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80565785017461,
            11.386187659363923
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.81059311476201,
            11.39918721430067
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80986355390996,
            11.401585125511263
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80741737928838,
            11.383320645657895
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.82398270216436,
            11.367585603580093
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.82316731062383,
            11.366996574432498
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.8185324534461,
            11.382016437252924
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.81806038465947,
            11.38357307240076
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.81990661426448,
            11.356810531472723
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80423038784568,
            11.395995010557986
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80998104397361,
            11.401211551883723
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80818271291139,
            11.421189648436295
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80397700917604,
            11.429308180452917
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80496406209352,
            11.435070935115135
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.8019170726526,
            11.441674823668022
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "mangroves2": 1
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
            ee.Geometry.Point([79.79191516895935, 11.420449831972633]),
            {
              "mangroves2": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79509090443298, 11.41918785982528]),
            {
              "mangroves2": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79775165577576, 11.4188513329711]),
            {
              "mangroves2": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79775165577576, 11.4229737594221]),
            {
              "mangroves2": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79818080921814, 11.42776915968319]),
            {
              "mangroves2": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79792331715271, 11.433489881938836]),
            {
              "mangroves2": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79629253407165, 11.435340679115518]),
            {
              "mangroves2": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78032802601501, 11.427685030553128]),
            {
              "mangroves2": 1,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78058551808044, 11.422553106407067]),
            {
              "mangroves2": 1,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78316043873474, 11.420029175214037]),
            {
              "mangroves2": 1,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80315898914978, 11.41430818136981]),
            {
              "mangroves2": 1,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80513309498474, 11.41918785982528]),
            {
              "mangroves2": 1,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([79.8067638780658, 11.422048321965397]),
            {
              "mangroves2": 1,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80645358862591, 11.400564954912824]),
            {
              "mangroves2": 1,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80628192724896, 11.394675291106811]),
            {
              "mangroves2": 1,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([79.81074512304974, 11.393749761413474]),
            {
              "mangroves2": 1,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([79.81473262497775, 11.37159587680108]),
            {
              "mangroves2": 1,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([79.817479207009, 11.37075441806013]),
            {
              "mangroves2": 1,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([79.81172855088107, 11.390285995334397]),
            {
              "mangroves2": 1,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([79.7913892872266, 11.433472757621562]),
            {
              "mangroves2": 1,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78967267345706, 11.44037112240841]),
            {
              "mangroves2": 1,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([79.7858961231641, 11.43658545521887]),
            {
              "mangroves2": 1,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79370671581546, 11.447437565720307]),
            {
              "mangroves2": 1,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([79.7998006946973, 11.43751084520531]),
            {
              "mangroves2": 1,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80228978466312, 11.43372513978203]),
            {
              "mangroves2": 1,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([79.7781713612012, 11.427079001239834]),
            {
              "mangroves2": 1,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([79.7905336850697, 11.425004922844728]),
            {
              "mangroves2": 1,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78813042579236, 11.427612938924435]),
            {
              "mangroves2": 1,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79805332314504, 11.447994843862638]),
            {
              "mangroves2": 1,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80131488930715, 11.44277916302602]),
            {
              "mangroves2": 1,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79934078347219, 11.443368035030753]),
            {
              "mangroves2": 1,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79753833901418, 11.441012539661692]),
            {
              "mangroves2": 1,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79556423317922, 11.438993528032434]),
            {
              "mangroves2": 1,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79376178872121, 11.434787207569816]),
            {
              "mangroves2": 1,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79333263527883, 11.432684023913984]),
            {
              "mangroves2": 1,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80603557717336, 11.43192687397575]),
            {
              "mangroves2": 1,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80577808510793, 11.435123715505702]),
            {
              "mangroves2": 1,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80354648720754, 11.431169722014223]),
            {
              "mangroves2": 1,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80243068825735, 11.429150640226231]),
            {
              "mangroves2": 1,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80243068825735, 11.426458508800117]),
            {
              "mangroves2": 1,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79934078347219, 11.426206120168034]),
            {
              "mangroves2": 1,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79530674111379, 11.425448952923588]),
            {
              "mangroves2": 1,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([79.81165674725776, 11.368165370651527]),
            {
              "mangroves2": 1,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([79.81412437955146, 11.366692798495585]),
            {
              "mangroves2": 1,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([79.82611887039229, 11.349355566077705]),
            {
              "mangroves2": 1,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([79.82749216140792, 11.346515411400732]),
            {
              "mangroves2": 1,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([79.82742778839156, 11.34405392116179]),
            {
              "mangroves2": 1,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([79.82521764816329, 11.35257437388403]),
            {
              "mangroves2": 1,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([79.8251883157634, 11.34234393370663]),
            {
              "mangroves2": 1,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([79.82538143481247, 11.341691736525158]),
            {
              "mangroves2": 1,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([79.81057279196489, 11.392226670469936]),
            {
              "mangroves2": 1,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80570190039384, 11.392815647414796]),
            {
              "mangroves2": 1,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80999343481767, 11.399462588343]),
            {
              "mangroves2": 1,
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Point([79.8255473577176, 11.351346761437194]),
            {
              "mangroves2": 1,
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Point([79.82258619896515, 11.35147298899755]),
            {
              "mangroves2": 1,
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Point([79.81151404015168, 11.401532254254933]),
            {
              "mangroves2": 1,
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Point([79.81022657982453, 11.402121211917095]),
            {
              "mangroves2": 1,
              "system:index": "56"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80610670677765, 11.4302763838129]),
            {
              "mangroves2": 1,
              "system:index": "57"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80666460625275, 11.426911228900806]),
            {
              "mangroves2": 1,
              "system:index": "58"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80293097130402, 11.439572416550211]),
            {
              "mangroves2": 1,
              "system:index": "59"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80314554802521, 11.438899410850416]),
            {
              "mangroves2": 1,
              "system:index": "60"
            }),
        ee.Feature(
            ee.Geometry.Point([79.8195532514693, 11.370071099083903]),
            {
              "mangroves2": 1,
              "system:index": "61"
            }),
        ee.Feature(
            ee.Geometry.Point([79.82058321973102, 11.367083893320114]),
            {
              "mangroves2": 1,
              "system:index": "62"
            }),
        ee.Feature(
            ee.Geometry.Point([79.8239903870383, 11.345265172571006]),
            {
              "mangroves2": 1,
              "system:index": "63"
            }),
        ee.Feature(
            ee.Geometry.Point([79.82596449287325, 11.348420912064633]),
            {
              "mangroves2": 1,
              "system:index": "64"
            }),
        ee.Feature(
            ee.Geometry.Point([79.82373289497286, 11.34231978424577]),
            {
              "mangroves2": 1,
              "system:index": "65"
            }),
        ee.Feature(
            ee.Geometry.Point([79.8081239301132, 11.391704927400903]),
            {
              "mangroves2": 1,
              "system:index": "66"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80782352270353, 11.398562238816991]),
            {
              "mangroves2": 1,
              "system:index": "67"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80636440099943, 11.397173962130509]),
            {
              "mangroves2": 1,
              "system:index": "68"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80199689049925, 11.410976340915354]),
            {
              "mangroves2": 1,
              "system:index": "69"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80568761010375, 11.412574884280385]),
            {
              "mangroves2": 1,
              "system:index": "70"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80388516564574, 11.418001451171223]),
            {
              "mangroves2": 1,
              "system:index": "71"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79809159417357, 11.417202195898168]),
            {
              "mangroves2": 1,
              "system:index": "72"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80700333007917, 11.425742521886235]),
            {
              "mangroves2": 1,
              "system:index": "73"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79899302491765, 11.432065105885652]),
            {
              "mangroves2": 1,
              "system:index": "74"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78661449805986, 11.429468896544154]),
            {
              "mangroves2": 1,
              "system:index": "75"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78674324409258, 11.426692638716256]),
            {
              "mangroves2": 1,
              "system:index": "76"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78940399543535, 11.43296021247833]),
            {
              "mangroves2": 1,
              "system:index": "77"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78642264632606, 11.423704057427898]),
            {
              "mangroves2": 1,
              "system:index": "78"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78414813308143, 11.41911891770711]),
            {
              "mangroves2": 1,
              "system:index": "79"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79247370986366, 11.419329246839347]),
            {
              "mangroves2": 1,
              "system:index": "80"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79294577865028, 11.422400034408577]),
            {
              "mangroves2": 1,
              "system:index": "81"
            }),
        ee.Feature(
            ee.Geometry.Point([79.8102793944779, 11.40579960283252]),
            {
              "mangroves2": 1,
              "system:index": "82"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80565785017461, 11.386187659363923]),
            {
              "mangroves2": 1,
              "system:index": "83"
            }),
        ee.Feature(
            ee.Geometry.Point([79.81059311476201, 11.39918721430067]),
            {
              "mangroves2": 1,
              "system:index": "84"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80986355390996, 11.401585125511263]),
            {
              "mangroves2": 1,
              "system:index": "85"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80741737928838, 11.383320645657895]),
            {
              "mangroves2": 1,
              "system:index": "86"
            }),
        ee.Feature(
            ee.Geometry.Point([79.82398270216436, 11.367585603580093]),
            {
              "mangroves2": 1,
              "system:index": "87"
            }),
        ee.Feature(
            ee.Geometry.Point([79.82316731062383, 11.366996574432498]),
            {
              "mangroves2": 1,
              "system:index": "88"
            }),
        ee.Feature(
            ee.Geometry.Point([79.8185324534461, 11.382016437252924]),
            {
              "mangroves2": 1,
              "system:index": "89"
            }),
        ee.Feature(
            ee.Geometry.Point([79.81806038465947, 11.38357307240076]),
            {
              "mangroves2": 1,
              "system:index": "90"
            }),
        ee.Feature(
            ee.Geometry.Point([79.81990661426448, 11.356810531472723]),
            {
              "mangroves2": 1,
              "system:index": "91"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80423038784568, 11.395995010557986]),
            {
              "mangroves2": 1,
              "system:index": "92"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80998104397361, 11.401211551883723]),
            {
              "mangroves2": 1,
              "system:index": "93"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80818271291139, 11.421189648436295]),
            {
              "mangroves2": 1,
              "system:index": "94"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80397700917604, 11.429308180452917]),
            {
              "mangroves2": 1,
              "system:index": "95"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80496406209352, 11.435070935115135]),
            {
              "mangroves2": 1,
              "system:index": "96"
            }),
        ee.Feature(
            ee.Geometry.Point([79.8019170726526, 11.441674823668022]),
            {
              "mangroves2": 1,
              "system:index": "97"
            })]),
    water2018 = ui.import && ui.import("water2018", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            79.80821480689588,
            11.40775776125182
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80941643653455,
            11.412216883990798
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.7858129972035,
            11.430809829124813
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78255143104138,
            11.43030505938542
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78804459510388,
            11.43636223690591
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79413857398572,
            11.441662160977256
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79336609778943,
            11.439222525710692
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78478302894177,
            11.441073285423888
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80687385090948,
            11.403874377938116
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.8090196181214,
            11.40046684130347
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.81180911549689,
            11.398153058565159
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.81210952290655,
            11.395965464833793
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80309730061651,
            11.395166147539989
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.8077320304651,
            11.41587801323668
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.8023461547632,
            11.418401981365202
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80195991666506,
            11.4254038828557
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.8003066479248,
            11.430128400549858
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79408926436554,
            11.431160363801762
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78782362410675,
            11.434672690661408
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79610525540556,
            11.442921406919288
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78290878705229,
            11.444519770135726
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79792915753569,
            11.438210389151143
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79657016423187,
            11.447142692759233
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79056002187531,
            11.44840454038386
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78736282872956,
            11.451264707496385
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78564621496002,
            11.453031266853271
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79221226262848,
            11.44975050498026
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79103855105541,
            11.455444325545255
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78940776797435,
            11.456643045737376
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79795056221667,
            11.430756450927275
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79900198815051,
            11.430924707338967
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80032163498583,
            11.428726850090847
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79547220108691,
            11.430924707338967
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "mangroves2": 0
      },
      "color": "#0000ff",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #0000ff */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([79.80821480689588, 11.40775776125182]),
            {
              "mangroves2": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80941643653455, 11.412216883990798]),
            {
              "mangroves2": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([79.7858129972035, 11.430809829124813]),
            {
              "mangroves2": 0,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78255143104138, 11.43030505938542]),
            {
              "mangroves2": 0,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78804459510388, 11.43636223690591]),
            {
              "mangroves2": 0,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79413857398572, 11.441662160977256]),
            {
              "mangroves2": 0,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79336609778943, 11.439222525710692]),
            {
              "mangroves2": 0,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78478302894177, 11.441073285423888]),
            {
              "mangroves2": 0,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80687385090948, 11.403874377938116]),
            {
              "mangroves2": 0,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([79.8090196181214, 11.40046684130347]),
            {
              "mangroves2": 0,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([79.81180911549689, 11.398153058565159]),
            {
              "mangroves2": 0,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([79.81210952290655, 11.395965464833793]),
            {
              "mangroves2": 0,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80309730061651, 11.395166147539989]),
            {
              "mangroves2": 0,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([79.8077320304651, 11.41587801323668]),
            {
              "mangroves2": 0,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([79.8023461547632, 11.418401981365202]),
            {
              "mangroves2": 0,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80195991666506, 11.4254038828557]),
            {
              "mangroves2": 0,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([79.8003066479248, 11.430128400549858]),
            {
              "mangroves2": 0,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79408926436554, 11.431160363801762]),
            {
              "mangroves2": 0,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78782362410675, 11.434672690661408]),
            {
              "mangroves2": 0,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79610525540556, 11.442921406919288]),
            {
              "mangroves2": 0,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78290878705229, 11.444519770135726]),
            {
              "mangroves2": 0,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79792915753569, 11.438210389151143]),
            {
              "mangroves2": 0,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79657016423187, 11.447142692759233]),
            {
              "mangroves2": 0,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79056002187531, 11.44840454038386]),
            {
              "mangroves2": 0,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78736282872956, 11.451264707496385]),
            {
              "mangroves2": 0,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78564621496002, 11.453031266853271]),
            {
              "mangroves2": 0,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79221226262848, 11.44975050498026]),
            {
              "mangroves2": 0,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79103855105541, 11.455444325545255]),
            {
              "mangroves2": 0,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78940776797435, 11.456643045737376]),
            {
              "mangroves2": 0,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79795056221667, 11.430756450927275]),
            {
              "mangroves2": 0,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79900198815051, 11.430924707338967]),
            {
              "mangroves2": 0,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80032163498583, 11.428726850090847]),
            {
              "mangroves2": 0,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79547220108691, 11.430924707338967]),
            {
              "mangroves2": 0,
              "system:index": "32"
            })]),
    others2018 = ui.import && ui.import("others2018", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            79.80737238922052,
            11.380177849546593
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79509860076837,
            11.38043027907679
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.7942402938836,
            11.386993368276714
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78745966949396,
            11.388087201758953
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78720217742853,
            11.379420559612937
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78926211395196,
            11.384889830528879
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80282336273126,
            11.369912192390824
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80299502410821,
            11.374876777711314
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78541840319713,
            11.39344991456457
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78876580004771,
            11.399003053381124
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78704918627818,
            11.407921503767344
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.7829293132313,
            11.411202749942731
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.77640618090709,
            11.410529676895909
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.81069144799244,
            11.418195878048177
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.81000480248463,
            11.428207404320723
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.81215056969654,
            11.416429101432307
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.81043395592701,
            11.425094614691648
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78065070702564,
            11.416765631159764
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.77369842125904,
            11.419541986179814
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.77069434716236,
            11.430462328347778
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.775672527094,
            11.433911568397354
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.76957854821217,
            11.435846489550723
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.76949271752369,
            11.443501917530055
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.77490005089771,
            11.4482128472299
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.7716384847356,
            11.45040003792911
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.76795789438665,
            11.452661405875137
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.76255056101263,
            11.458970464596788
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.7773134394306,
            11.466625266751644
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.77233525949896,
            11.460400498332517
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.76701375681341,
            11.469401132770114
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.76855870920599,
            11.47419574616553
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.76426717478216,
            11.47242931912473
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78237745005072,
            11.45863398501925
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79250547129095,
            11.466329474880782
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.77920171457708,
            11.486516989889415
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.77018949228705,
            11.48096556723634
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.76572629648626,
            11.480460887031635
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.77568265634955,
            11.47095590793196
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78487361716361,
            11.492346417376238
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79036678122611,
            11.481327805517664
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79277004050346,
            11.476533313279653
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79208339499564,
            11.490495993564988
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79834903525443,
            11.470645228918558
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80049480246635,
            11.461644634120939
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.8050438289556,
            11.452475509134405
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80899204062553,
            11.44027758856167
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.81259692954154,
            11.427995013408848
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.8168026332769,
            11.41773108346278
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.81731761740775,
            11.409401883754382
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.82070295412859,
            11.399666149103583
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.82319204409441,
            11.390999859777054
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.82618801912577,
            11.381473411638535
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.82884877046854,
            11.371123655308821
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.8000291983767,
            11.401670587380377
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79582349464135,
            11.399735433122604
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79247609779077,
            11.402343681424012
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79101697608667,
            11.408317321169614
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79350606605249,
            11.397968541638624
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79728261634546,
            11.39611750068323
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80105916663842,
            11.397043022667791
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78698293372827,
            11.414122568961938
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78294889136987,
            11.408233186270953
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.77299253150659,
            11.407812511403693
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.7733358542605,
            11.41563696190225
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.7780565421267,
            11.400745080466658
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.77985898658471,
            11.397631989634295
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80157415076928,
            11.406887024502023
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.81479207679467,
            11.40562499204811
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.81565038367944,
            11.399398883210724
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.81998081762299,
            11.40716080878168
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.81860752660737,
            11.413134347190828
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.82281323034272,
            11.398915436677958
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.82186909276948,
            11.403122289082772
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.82015247899994,
            11.4065718615689
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.81766338903412,
            11.413134347190828
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.82040997106537,
            11.411283405067136
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.81946583349213,
            11.411535806976545
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78723835154642,
            11.49152843399443
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78861164256205,
            11.490014447385743
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79273151560892,
            11.483958419640858
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.7946197907554,
            11.483117294389425
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.7946197907554,
            11.474874134204635
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79805301829447,
            11.469490715960232
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.7616608063804,
            11.472182437914176
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.7868092401983,
            11.376863263826799
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79436234078423,
            11.373665766517156
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78286102852837,
            11.381407014026458
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.8065502985479,
            11.368617013475026
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.82114151558892,
            11.387465234791504
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.81839493355767,
            11.39621577033762
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.82474640450494,
            11.377704704520045
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.7919292976926,
            11.380773410810043
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.7925944855283,
            11.380815482325923
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79454713369114,
            11.382140731893335
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79098516011936,
            11.382203838861667
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79111390615208,
            11.383465975289973
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79027705693943,
            11.382982156987373
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78684382940037,
            11.383444939728706
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79246573949558,
            11.38454895943414
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78798108602268,
            11.387535981976871
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79562545998772,
            11.393116040619686
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.7994234679528,
            11.394798823390131
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.82050450677161,
            11.393466532984702
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.82054742211585,
            11.39468654998216
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.82136281365638,
            11.39664277320509
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.82170613641028,
            11.395738284570939
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.81844457024818,
            11.393739985525546
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.81883080834632,
            11.391363043109136
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.81964619988685,
            11.388639335101681
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.82095511788611,
            11.385505076313189
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "mangroves2": 0
      },
      "color": "#999900",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #999900 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([79.80737238922052, 11.380177849546593]),
            {
              "mangroves2": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79509860076837, 11.38043027907679]),
            {
              "mangroves2": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([79.7942402938836, 11.386993368276714]),
            {
              "mangroves2": 0,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78745966949396, 11.388087201758953]),
            {
              "mangroves2": 0,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78720217742853, 11.379420559612937]),
            {
              "mangroves2": 0,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78926211395196, 11.384889830528879]),
            {
              "mangroves2": 0,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80282336273126, 11.369912192390824]),
            {
              "mangroves2": 0,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80299502410821, 11.374876777711314]),
            {
              "mangroves2": 0,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78541840319713, 11.39344991456457]),
            {
              "mangroves2": 0,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78876580004771, 11.399003053381124]),
            {
              "mangroves2": 0,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78704918627818, 11.407921503767344]),
            {
              "mangroves2": 0,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([79.7829293132313, 11.411202749942731]),
            {
              "mangroves2": 0,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([79.77640618090709, 11.410529676895909]),
            {
              "mangroves2": 0,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([79.81069144799244, 11.418195878048177]),
            {
              "mangroves2": 0,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([79.81000480248463, 11.428207404320723]),
            {
              "mangroves2": 0,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([79.81215056969654, 11.416429101432307]),
            {
              "mangroves2": 0,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([79.81043395592701, 11.425094614691648]),
            {
              "mangroves2": 0,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78065070702564, 11.416765631159764]),
            {
              "mangroves2": 0,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([79.77369842125904, 11.419541986179814]),
            {
              "mangroves2": 0,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([79.77069434716236, 11.430462328347778]),
            {
              "mangroves2": 0,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([79.775672527094, 11.433911568397354]),
            {
              "mangroves2": 0,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([79.76957854821217, 11.435846489550723]),
            {
              "mangroves2": 0,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([79.76949271752369, 11.443501917530055]),
            {
              "mangroves2": 0,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([79.77490005089771, 11.4482128472299]),
            {
              "mangroves2": 0,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([79.7716384847356, 11.45040003792911]),
            {
              "mangroves2": 0,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([79.76795789438665, 11.452661405875137]),
            {
              "mangroves2": 0,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([79.76255056101263, 11.458970464596788]),
            {
              "mangroves2": 0,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([79.7773134394306, 11.466625266751644]),
            {
              "mangroves2": 0,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([79.77233525949896, 11.460400498332517]),
            {
              "mangroves2": 0,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([79.76701375681341, 11.469401132770114]),
            {
              "mangroves2": 0,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([79.76855870920599, 11.47419574616553]),
            {
              "mangroves2": 0,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([79.76426717478216, 11.47242931912473]),
            {
              "mangroves2": 0,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78237745005072, 11.45863398501925]),
            {
              "mangroves2": 0,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79250547129095, 11.466329474880782]),
            {
              "mangroves2": 0,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([79.77920171457708, 11.486516989889415]),
            {
              "mangroves2": 0,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([79.77018949228705, 11.48096556723634]),
            {
              "mangroves2": 0,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([79.76572629648626, 11.480460887031635]),
            {
              "mangroves2": 0,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([79.77568265634955, 11.47095590793196]),
            {
              "mangroves2": 0,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78487361716361, 11.492346417376238]),
            {
              "mangroves2": 0,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79036678122611, 11.481327805517664]),
            {
              "mangroves2": 0,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79277004050346, 11.476533313279653]),
            {
              "mangroves2": 0,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79208339499564, 11.490495993564988]),
            {
              "mangroves2": 0,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79834903525443, 11.470645228918558]),
            {
              "mangroves2": 0,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80049480246635, 11.461644634120939]),
            {
              "mangroves2": 0,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([79.8050438289556, 11.452475509134405]),
            {
              "mangroves2": 0,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80899204062553, 11.44027758856167]),
            {
              "mangroves2": 0,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([79.81259692954154, 11.427995013408848]),
            {
              "mangroves2": 0,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([79.8168026332769, 11.41773108346278]),
            {
              "mangroves2": 0,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([79.81731761740775, 11.409401883754382]),
            {
              "mangroves2": 0,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([79.82070295412859, 11.399666149103583]),
            {
              "mangroves2": 0,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([79.82319204409441, 11.390999859777054]),
            {
              "mangroves2": 0,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([79.82618801912577, 11.381473411638535]),
            {
              "mangroves2": 0,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([79.82884877046854, 11.371123655308821]),
            {
              "mangroves2": 0,
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Point([79.8000291983767, 11.401670587380377]),
            {
              "mangroves2": 0,
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79582349464135, 11.399735433122604]),
            {
              "mangroves2": 0,
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79247609779077, 11.402343681424012]),
            {
              "mangroves2": 0,
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79101697608667, 11.408317321169614]),
            {
              "mangroves2": 0,
              "system:index": "56"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79350606605249, 11.397968541638624]),
            {
              "mangroves2": 0,
              "system:index": "57"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79728261634546, 11.39611750068323]),
            {
              "mangroves2": 0,
              "system:index": "58"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80105916663842, 11.397043022667791]),
            {
              "mangroves2": 0,
              "system:index": "59"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78698293372827, 11.414122568961938]),
            {
              "mangroves2": 0,
              "system:index": "60"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78294889136987, 11.408233186270953]),
            {
              "mangroves2": 0,
              "system:index": "61"
            }),
        ee.Feature(
            ee.Geometry.Point([79.77299253150659, 11.407812511403693]),
            {
              "mangroves2": 0,
              "system:index": "62"
            }),
        ee.Feature(
            ee.Geometry.Point([79.7733358542605, 11.41563696190225]),
            {
              "mangroves2": 0,
              "system:index": "63"
            }),
        ee.Feature(
            ee.Geometry.Point([79.7780565421267, 11.400745080466658]),
            {
              "mangroves2": 0,
              "system:index": "64"
            }),
        ee.Feature(
            ee.Geometry.Point([79.77985898658471, 11.397631989634295]),
            {
              "mangroves2": 0,
              "system:index": "65"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80157415076928, 11.406887024502023]),
            {
              "mangroves2": 0,
              "system:index": "66"
            }),
        ee.Feature(
            ee.Geometry.Point([79.81479207679467, 11.40562499204811]),
            {
              "mangroves2": 0,
              "system:index": "67"
            }),
        ee.Feature(
            ee.Geometry.Point([79.81565038367944, 11.399398883210724]),
            {
              "mangroves2": 0,
              "system:index": "68"
            }),
        ee.Feature(
            ee.Geometry.Point([79.81998081762299, 11.40716080878168]),
            {
              "mangroves2": 0,
              "system:index": "69"
            }),
        ee.Feature(
            ee.Geometry.Point([79.81860752660737, 11.413134347190828]),
            {
              "mangroves2": 0,
              "system:index": "70"
            }),
        ee.Feature(
            ee.Geometry.Point([79.82281323034272, 11.398915436677958]),
            {
              "mangroves2": 0,
              "system:index": "71"
            }),
        ee.Feature(
            ee.Geometry.Point([79.82186909276948, 11.403122289082772]),
            {
              "mangroves2": 0,
              "system:index": "72"
            }),
        ee.Feature(
            ee.Geometry.Point([79.82015247899994, 11.4065718615689]),
            {
              "mangroves2": 0,
              "system:index": "73"
            }),
        ee.Feature(
            ee.Geometry.Point([79.81766338903412, 11.413134347190828]),
            {
              "mangroves2": 0,
              "system:index": "74"
            }),
        ee.Feature(
            ee.Geometry.Point([79.82040997106537, 11.411283405067136]),
            {
              "mangroves2": 0,
              "system:index": "75"
            }),
        ee.Feature(
            ee.Geometry.Point([79.81946583349213, 11.411535806976545]),
            {
              "mangroves2": 0,
              "system:index": "76"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78723835154642, 11.49152843399443]),
            {
              "mangroves2": 0,
              "system:index": "77"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78861164256205, 11.490014447385743]),
            {
              "mangroves2": 0,
              "system:index": "78"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79273151560892, 11.483958419640858]),
            {
              "mangroves2": 0,
              "system:index": "79"
            }),
        ee.Feature(
            ee.Geometry.Point([79.7946197907554, 11.483117294389425]),
            {
              "mangroves2": 0,
              "system:index": "80"
            }),
        ee.Feature(
            ee.Geometry.Point([79.7946197907554, 11.474874134204635]),
            {
              "mangroves2": 0,
              "system:index": "81"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79805301829447, 11.469490715960232]),
            {
              "mangroves2": 0,
              "system:index": "82"
            }),
        ee.Feature(
            ee.Geometry.Point([79.7616608063804, 11.472182437914176]),
            {
              "mangroves2": 0,
              "system:index": "83"
            }),
        ee.Feature(
            ee.Geometry.Point([79.7868092401983, 11.376863263826799]),
            {
              "mangroves2": 0,
              "system:index": "84"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79436234078423, 11.373665766517156]),
            {
              "mangroves2": 0,
              "system:index": "85"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78286102852837, 11.381407014026458]),
            {
              "mangroves2": 0,
              "system:index": "86"
            }),
        ee.Feature(
            ee.Geometry.Point([79.8065502985479, 11.368617013475026]),
            {
              "mangroves2": 0,
              "system:index": "87"
            }),
        ee.Feature(
            ee.Geometry.Point([79.82114151558892, 11.387465234791504]),
            {
              "mangroves2": 0,
              "system:index": "88"
            }),
        ee.Feature(
            ee.Geometry.Point([79.81839493355767, 11.39621577033762]),
            {
              "mangroves2": 0,
              "system:index": "89"
            }),
        ee.Feature(
            ee.Geometry.Point([79.82474640450494, 11.377704704520045]),
            {
              "mangroves2": 0,
              "system:index": "90"
            }),
        ee.Feature(
            ee.Geometry.Point([79.7919292976926, 11.380773410810043]),
            {
              "mangroves2": 0,
              "system:index": "91"
            }),
        ee.Feature(
            ee.Geometry.Point([79.7925944855283, 11.380815482325923]),
            {
              "mangroves2": 0,
              "system:index": "92"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79454713369114, 11.382140731893335]),
            {
              "mangroves2": 0,
              "system:index": "93"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79098516011936, 11.382203838861667]),
            {
              "mangroves2": 0,
              "system:index": "94"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79111390615208, 11.383465975289973]),
            {
              "mangroves2": 0,
              "system:index": "95"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79027705693943, 11.382982156987373]),
            {
              "mangroves2": 0,
              "system:index": "96"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78684382940037, 11.383444939728706]),
            {
              "mangroves2": 0,
              "system:index": "97"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79246573949558, 11.38454895943414]),
            {
              "mangroves2": 0,
              "system:index": "98"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78798108602268, 11.387535981976871]),
            {
              "mangroves2": 0,
              "system:index": "99"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79562545998772, 11.393116040619686]),
            {
              "mangroves2": 0,
              "system:index": "100"
            }),
        ee.Feature(
            ee.Geometry.Point([79.7994234679528, 11.394798823390131]),
            {
              "mangroves2": 0,
              "system:index": "101"
            }),
        ee.Feature(
            ee.Geometry.Point([79.82050450677161, 11.393466532984702]),
            {
              "mangroves2": 0,
              "system:index": "102"
            }),
        ee.Feature(
            ee.Geometry.Point([79.82054742211585, 11.39468654998216]),
            {
              "mangroves2": 0,
              "system:index": "103"
            }),
        ee.Feature(
            ee.Geometry.Point([79.82136281365638, 11.39664277320509]),
            {
              "mangroves2": 0,
              "system:index": "104"
            }),
        ee.Feature(
            ee.Geometry.Point([79.82170613641028, 11.395738284570939]),
            {
              "mangroves2": 0,
              "system:index": "105"
            }),
        ee.Feature(
            ee.Geometry.Point([79.81844457024818, 11.393739985525546]),
            {
              "mangroves2": 0,
              "system:index": "106"
            }),
        ee.Feature(
            ee.Geometry.Point([79.81883080834632, 11.391363043109136]),
            {
              "mangroves2": 0,
              "system:index": "107"
            }),
        ee.Feature(
            ee.Geometry.Point([79.81964619988685, 11.388639335101681]),
            {
              "mangroves2": 0,
              "system:index": "108"
            }),
        ee.Feature(
            ee.Geometry.Point([79.82095511788611, 11.385505076313189]),
            {
              "mangroves2": 0,
              "system:index": "109"
            })]),
    imageVisParam2 = ui.import && ui.import("imageVisParam2", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "classification"
        ],
        "min": -1,
        "max": 1,
        "palette": [
          "ff0000",
          "eaff39",
          "18ff49"
        ]
      }
    }) || {"opacity":1,"bands":["classification"],"min":-1,"max":1,"palette":["ff0000","eaff39","18ff49"]},
    asset = ui.import && ui.import("asset", "table", {
      "id": "users/sreeram720/newmang"
    }) || ee.FeatureCollection("users/sreeram720/newmang"),
    mangroves2000 = ui.import && ui.import("mangroves2000", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            79.79806647611053,
            11.426046870296593
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.77858290982635,
            11.426804035944045
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79283080411346,
            11.432188266659526
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.7890542538205,
            11.442031048910115
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78948340726288,
            11.439591416822262
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79592070889862,
            11.424700793041195
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.8029588253537,
            11.417549650481744
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80579123807343,
            11.423270578954975
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80630622220428,
            11.43159937140758
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80593851760204,
            11.420107514697301
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79907206252392,
            11.420864696204447
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78079012587841,
            11.426417298816276
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80575529413454,
            11.395414029017065
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80652777033083,
            11.399789208130164
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80807272272341,
            11.38488847910935
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.81985423280219,
            11.36980869693941
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.82790731379441,
            11.344584680189865
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.82498907038621,
            11.341891748495012
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.81072204879354,
            11.39602779120349
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.81189008131105,
            11.367289195759119
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.8241638697632,
            11.354666863103226
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80025692005006,
            11.437955106495307
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.82682334427682,
            11.34478029192664
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.82416259293404,
            11.345453520421737
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.82042895798531,
            11.36667744039424
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.81059566294573,
            11.394494313375233
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80784908091448,
            11.400846735353264
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80636740461091,
            11.41946253362269
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80452204480866,
            11.418999809543314
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80555201307038,
            11.417821963026324
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "mangroves3": 1
      },
      "color": "#d63000",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([79.79806647611053, 11.426046870296593]),
            {
              "mangroves3": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([79.77858290982635, 11.426804035944045]),
            {
              "mangroves3": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79283080411346, 11.432188266659526]),
            {
              "mangroves3": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([79.7890542538205, 11.442031048910115]),
            {
              "mangroves3": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78948340726288, 11.439591416822262]),
            {
              "mangroves3": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79592070889862, 11.424700793041195]),
            {
              "mangroves3": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([79.8029588253537, 11.417549650481744]),
            {
              "mangroves3": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80579123807343, 11.423270578954975]),
            {
              "mangroves3": 1,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80630622220428, 11.43159937140758]),
            {
              "mangroves3": 1,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80593851760204, 11.420107514697301]),
            {
              "mangroves3": 1,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79907206252392, 11.420864696204447]),
            {
              "mangroves3": 1,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78079012587841, 11.426417298816276]),
            {
              "mangroves3": 1,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80575529413454, 11.395414029017065]),
            {
              "mangroves3": 1,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80652777033083, 11.399789208130164]),
            {
              "mangroves3": 1,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80807272272341, 11.38488847910935]),
            {
              "mangroves3": 1,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([79.81985423280219, 11.36980869693941]),
            {
              "mangroves3": 1,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([79.82790731379441, 11.344584680189865]),
            {
              "mangroves3": 1,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([79.82498907038621, 11.341891748495012]),
            {
              "mangroves3": 1,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([79.81072204879354, 11.39602779120349]),
            {
              "mangroves3": 1,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([79.81189008131105, 11.367289195759119]),
            {
              "mangroves3": 1,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([79.8241638697632, 11.354666863103226]),
            {
              "mangroves3": 1,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80025692005006, 11.437955106495307]),
            {
              "mangroves3": 1,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([79.82682334427682, 11.34478029192664]),
            {
              "mangroves3": 1,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([79.82416259293404, 11.345453520421737]),
            {
              "mangroves3": 1,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([79.82042895798531, 11.36667744039424]),
            {
              "mangroves3": 1,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([79.81059566294573, 11.394494313375233]),
            {
              "mangroves3": 1,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80784908091448, 11.400846735353264]),
            {
              "mangroves3": 1,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80636740461091, 11.41946253362269]),
            {
              "mangroves3": 1,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80452204480866, 11.418999809543314]),
            {
              "mangroves3": 1,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80555201307038, 11.417821963026324]),
            {
              "mangroves3": 1,
              "system:index": "29"
            })]),
    others2000 = ui.import && ui.import("others2000", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            79.80376976302693,
            11.376254550348655
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80994957259725,
            11.387445532052796
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80917709640096,
            11.391147714825323
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80479973128865,
            11.390222173649956
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78325622848104,
            11.422919372025198
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78806274703572,
            11.418208021715328
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78256958297322,
            11.437557710898293
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78626030257772,
            11.448830398743615
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79020851424764,
            11.453541239719508
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79982155135701,
            11.448578030048775
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80222481063436,
            11.447316183197898
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80680296864512,
            11.423834006433546
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80781161389291,
            11.36776554299115
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.81864214082441,
            11.351383411600587
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.82078790803632,
            11.347849017700575
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.82315547498399,
            11.332048693391991
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.82143886121446,
            11.337939651443767
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.82593509079152,
            11.362923496611131
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.82005542287607,
            11.3838331502509
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.81390511461836,
            11.407197403218523
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78343522020918,
            11.43277335682634
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80018587710902,
            11.415740791719806
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79756804111048,
            11.415067729434785
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80194540622279,
            11.4147732641831
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "mangroves3": 0
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
            ee.Geometry.Point([79.80376976302693, 11.376254550348655]),
            {
              "mangroves3": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80994957259725, 11.387445532052796]),
            {
              "mangroves3": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80917709640096, 11.391147714825323]),
            {
              "mangroves3": 0,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80479973128865, 11.390222173649956]),
            {
              "mangroves3": 0,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78325622848104, 11.422919372025198]),
            {
              "mangroves3": 0,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78806274703572, 11.418208021715328]),
            {
              "mangroves3": 0,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78256958297322, 11.437557710898293]),
            {
              "mangroves3": 0,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78626030257772, 11.448830398743615]),
            {
              "mangroves3": 0,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79020851424764, 11.453541239719508]),
            {
              "mangroves3": 0,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79982155135701, 11.448578030048775]),
            {
              "mangroves3": 0,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80222481063436, 11.447316183197898]),
            {
              "mangroves3": 0,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80680296864512, 11.423834006433546]),
            {
              "mangroves3": 0,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80781161389291, 11.36776554299115]),
            {
              "mangroves3": 0,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([79.81864214082441, 11.351383411600587]),
            {
              "mangroves3": 0,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([79.82078790803632, 11.347849017700575]),
            {
              "mangroves3": 0,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([79.82315547498399, 11.332048693391991]),
            {
              "mangroves3": 0,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([79.82143886121446, 11.337939651443767]),
            {
              "mangroves3": 0,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([79.82593509079152, 11.362923496611131]),
            {
              "mangroves3": 0,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([79.82005542287607, 11.3838331502509]),
            {
              "mangroves3": 0,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([79.81390511461836, 11.407197403218523]),
            {
              "mangroves3": 0,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78343522020918, 11.43277335682634]),
            {
              "mangroves3": 0,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80018587710902, 11.415740791719806]),
            {
              "mangroves3": 0,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79756804111048, 11.415067729434785]),
            {
              "mangroves3": 0,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80194540622279, 11.4147732641831]),
            {
              "mangroves3": 0,
              "system:index": "23"
            })]),
    water2000 = ui.import && ui.import("water2000", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            79.78418906569686,
            11.430373101858944
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78382295427639,
            11.441876114841282
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78176301775295,
            11.447260059025693
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79343599138576,
            11.441455489888895
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78802865801174,
            11.435903181954213
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.8071124432264,
            11.405017916266733
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.8085715649305,
            11.409056409009802
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80934404112679,
            11.415450571701498
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.81539599103598,
            11.386357622163377
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.8114906947103,
            11.385978985670464
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.81063238782554,
            11.379542088207545
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.81416122692565,
            11.369073868969679
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.81261627453307,
            11.362857285255814
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.81974022167662,
            11.361595057512613
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.82729332226256,
            11.358355314064639
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.8308123804901,
            11.357303441394864
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.8299111582611,
            11.36205787500059
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.8166130853748,
            11.361069031412667
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.8175143076038,
            11.368095374445767
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.81219280491825,
            11.374153878451889
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.8116795823039,
            11.39670269069801
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80558560342206,
            11.40255024419385
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80397627801312,
            11.420365609189126
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.7943716314171,
            11.430916140313297
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "mangroves3": 0
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
            ee.Geometry.Point([79.78418906569686, 11.430373101858944]),
            {
              "mangroves3": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78382295427639, 11.441876114841282]),
            {
              "mangroves3": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78176301775295, 11.447260059025693]),
            {
              "mangroves3": 0,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79343599138576, 11.441455489888895]),
            {
              "mangroves3": 0,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78802865801174, 11.435903181954213]),
            {
              "mangroves3": 0,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([79.8071124432264, 11.405017916266733]),
            {
              "mangroves3": 0,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([79.8085715649305, 11.409056409009802]),
            {
              "mangroves3": 0,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80934404112679, 11.415450571701498]),
            {
              "mangroves3": 0,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([79.81539599103598, 11.386357622163377]),
            {
              "mangroves3": 0,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([79.8114906947103, 11.385978985670464]),
            {
              "mangroves3": 0,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([79.81063238782554, 11.379542088207545]),
            {
              "mangroves3": 0,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([79.81416122692565, 11.369073868969679]),
            {
              "mangroves3": 0,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([79.81261627453307, 11.362857285255814]),
            {
              "mangroves3": 0,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([79.81974022167662, 11.361595057512613]),
            {
              "mangroves3": 0,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([79.82729332226256, 11.358355314064639]),
            {
              "mangroves3": 0,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([79.8308123804901, 11.357303441394864]),
            {
              "mangroves3": 0,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([79.8299111582611, 11.36205787500059]),
            {
              "mangroves3": 0,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([79.8166130853748, 11.361069031412667]),
            {
              "mangroves3": 0,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([79.8175143076038, 11.368095374445767]),
            {
              "mangroves3": 0,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([79.81219280491825, 11.374153878451889]),
            {
              "mangroves3": 0,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([79.8116795823039, 11.39670269069801]),
            {
              "mangroves3": 0,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80558560342206, 11.40255024419385]),
            {
              "mangroves3": 0,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80397627801312, 11.420365609189126]),
            {
              "mangroves3": 0,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([79.7943716314171, 11.430916140313297]),
            {
              "mangroves3": 0,
              "system:index": "23"
            })]),
    imageVisParam3 = ui.import && ui.import("imageVisParam3", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "B4",
          "B3",
          "B2"
        ],
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["B4","B3","B2"],"gamma":1},
    imageCollection = ui.import && ui.import("imageCollection", "imageCollection", {
      "id": "LANDSAT/LM03/C01/T1"
    }) || ee.ImageCollection("LANDSAT/LM03/C01/T1"),
    image = ui.import && ui.import("image", "image", {
      "id": "users/sreeram720/Extract_77"
    }) || ee.Image("users/sreeram720/Extract_77"),
    imageVisParam4 = ui.import && ui.import("imageVisParam4", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "b2",
          "b3",
          "b4"
        ],
        "min": 33.56810774960536,
        "max": 69.73758600806705,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["b2","b3","b4"],"min":33.56810774960536,"max":69.73758600806705,"gamma":1},
    mangroves1977 = ui.import && ui.import("mangroves1977", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            79.79690610019601,
            11.420937769608758
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.7910696133796,
            11.425985593357504
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79501782504953,
            11.43338890559655
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79381619541086,
            11.446680730632227
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.8020559415046,
            11.433893669842055
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80634747592843,
            11.43254762985553
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80617581455148,
            11.395697303989426
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80531750766671,
            11.422115603187356
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80583249179757,
            11.393341412767331
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.82875390401968,
            11.34449989287434
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.82944054952749,
            11.339282313109711
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.82514901510366,
            11.342480195883917
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.82789559713491,
            11.334232951648586
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79539427809559,
            11.42711031653039
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78475127272449,
            11.425427725274261
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79419264845691,
            11.420379891594587
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80466399245105,
            11.418360732966072
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "mangroves4": 1
      },
      "color": "#d63000",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([79.79690610019601, 11.420937769608758]),
            {
              "mangroves4": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([79.7910696133796, 11.425985593357504]),
            {
              "mangroves4": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79501782504953, 11.43338890559655]),
            {
              "mangroves4": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79381619541086, 11.446680730632227]),
            {
              "mangroves4": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([79.8020559415046, 11.433893669842055]),
            {
              "mangroves4": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80634747592843, 11.43254762985553]),
            {
              "mangroves4": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80617581455148, 11.395697303989426]),
            {
              "mangroves4": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80531750766671, 11.422115603187356]),
            {
              "mangroves4": 1,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80583249179757, 11.393341412767331]),
            {
              "mangroves4": 1,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([79.82875390401968, 11.34449989287434]),
            {
              "mangroves4": 1,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([79.82944054952749, 11.339282313109711]),
            {
              "mangroves4": 1,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([79.82514901510366, 11.342480195883917]),
            {
              "mangroves4": 1,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([79.82789559713491, 11.334232951648586]),
            {
              "mangroves4": 1,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79539427809559, 11.42711031653039]),
            {
              "mangroves4": 1,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78475127272449, 11.425427725274261]),
            {
              "mangroves4": 1,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79419264845691, 11.420379891594587]),
            {
              "mangroves4": 1,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80466399245105, 11.418360732966072]),
            {
              "mangroves4": 1,
              "system:index": "16"
            })]),
    water1977 = ui.import && ui.import("water1977", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            79.7804331983774,
            11.448210266662356
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78472473280122,
            11.440891467093818
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79356529371431,
            11.440891467093818
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78352310316255,
            11.43054387592486
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.7793173994272,
            11.430207362549336
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80987312452486,
            11.424906412645608
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80961563245943,
            11.416325026161234
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80695488111665,
            11.404630365989446
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80051757948091,
            11.427766817098794
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.81144324459869,
            11.398073384429704
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.8106707684024,
            11.38452685656405
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78861228146393,
            11.373251614864651
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80088606991607,
            11.366183325282822
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.81281653561432,
            11.37611253936106
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.81479064144928,
            11.369044320759555
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.8198546520694,
            11.364500373351563
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.81693640866119,
            11.361302737310412
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.82278692226073,
            11.360699943231552
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.8302541921582,
            11.356829064498301
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.83385908107421,
            11.364402473723425
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80793821315429,
            11.343368556267835
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.82221780417636,
            11.356680991516646
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "mangroves4": 0
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
            ee.Geometry.Point([79.7804331983774, 11.448210266662356]),
            {
              "mangroves4": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78472473280122, 11.440891467093818]),
            {
              "mangroves4": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79356529371431, 11.440891467093818]),
            {
              "mangroves4": 0,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78352310316255, 11.43054387592486]),
            {
              "mangroves4": 0,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([79.7793173994272, 11.430207362549336]),
            {
              "mangroves4": 0,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80987312452486, 11.424906412645608]),
            {
              "mangroves4": 0,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80961563245943, 11.416325026161234]),
            {
              "mangroves4": 0,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80695488111665, 11.404630365989446]),
            {
              "mangroves4": 0,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80051757948091, 11.427766817098794]),
            {
              "mangroves4": 0,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([79.81144324459869, 11.398073384429704]),
            {
              "mangroves4": 0,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([79.8106707684024, 11.38452685656405]),
            {
              "mangroves4": 0,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78861228146393, 11.373251614864651]),
            {
              "mangroves4": 0,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80088606991607, 11.366183325282822]),
            {
              "mangroves4": 0,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([79.81281653561432, 11.37611253936106]),
            {
              "mangroves4": 0,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([79.81479064144928, 11.369044320759555]),
            {
              "mangroves4": 0,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([79.8198546520694, 11.364500373351563]),
            {
              "mangroves4": 0,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([79.81693640866119, 11.361302737310412]),
            {
              "mangroves4": 0,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([79.82278692226073, 11.360699943231552]),
            {
              "mangroves4": 0,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([79.8302541921582, 11.356829064498301]),
            {
              "mangroves4": 0,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([79.83385908107421, 11.364402473723425]),
            {
              "mangroves4": 0,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80793821315429, 11.343368556267835]),
            {
              "mangroves4": 0,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([79.82221780417636, 11.356680991516646]),
            {
              "mangroves4": 0,
              "system:index": "21"
            })]),
    others1977 = ui.import && ui.import("others1977", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            79.8199003755875,
            11.341112788728633
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.83569322226718,
            11.347256018802698
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80007348654941,
            11.357774941399692
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.82341943381503,
            11.3342961733437
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.81517968772128,
            11.33513773959625
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80076013205722,
            11.361561658595315
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.82770735492637,
            11.36301343803534
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80882460346153,
            11.375719545653313
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79715162982872,
            11.374204940056803
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80736548175743,
            11.381020601797692
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.8221283601754,
            11.373447634238081
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.81869513263634,
            11.381273030580537
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80315977802208,
            11.38884578994689
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.81054121723106,
            11.390528597987478
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.81569105853966,
            11.399026626453976
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.81500441303184,
            11.408449885630365
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80341727008751,
            11.410384980515056
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78444868793419,
            11.422163534366549
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79843909015587,
            11.40836575077099
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78813940753868,
            11.396418347706877
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78281790485313,
            11.405757557765687
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78453451862266,
            11.414844061984807
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78633696308067,
            11.41963959970665
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.774902974456,
            11.42335496818617
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.7778212178642,
            11.421924747311882
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78022447714154,
            11.41754990927816
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78237024435346,
            11.436852603375748
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.77910867819135,
            11.440722392277166
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.76889482626264,
            11.44778882681901
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.77644792684858,
            11.449976020796408
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.80314127096479,
            11.445180996517728
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78580347189252,
            11.44888242592138
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.77533212789838,
            11.455696294316486
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.785889302581,
            11.456369260064358
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.79387155660932,
            11.461079975441926
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.77040941672028,
            11.461614446750284
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.771439384982,
            11.469100943663223
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.77384264425935,
            11.47053092612018
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.7795074696988,
            11.461025612735305
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.78912050680817,
            11.470194460311212
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "mangroves4": 0
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
            ee.Geometry.Point([79.8199003755875, 11.341112788728633]),
            {
              "mangroves4": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([79.83569322226718, 11.347256018802698]),
            {
              "mangroves4": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80007348654941, 11.357774941399692]),
            {
              "mangroves4": 0,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([79.82341943381503, 11.3342961733437]),
            {
              "mangroves4": 0,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([79.81517968772128, 11.33513773959625]),
            {
              "mangroves4": 0,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80076013205722, 11.361561658595315]),
            {
              "mangroves4": 0,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([79.82770735492637, 11.36301343803534]),
            {
              "mangroves4": 0,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80882460346153, 11.375719545653313]),
            {
              "mangroves4": 0,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79715162982872, 11.374204940056803]),
            {
              "mangroves4": 0,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80736548175743, 11.381020601797692]),
            {
              "mangroves4": 0,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([79.8221283601754, 11.373447634238081]),
            {
              "mangroves4": 0,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([79.81869513263634, 11.381273030580537]),
            {
              "mangroves4": 0,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80315977802208, 11.38884578994689]),
            {
              "mangroves4": 0,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([79.81054121723106, 11.390528597987478]),
            {
              "mangroves4": 0,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([79.81569105853966, 11.399026626453976]),
            {
              "mangroves4": 0,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([79.81500441303184, 11.408449885630365]),
            {
              "mangroves4": 0,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80341727008751, 11.410384980515056]),
            {
              "mangroves4": 0,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78444868793419, 11.422163534366549]),
            {
              "mangroves4": 0,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79843909015587, 11.40836575077099]),
            {
              "mangroves4": 0,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78813940753868, 11.396418347706877]),
            {
              "mangroves4": 0,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78281790485313, 11.405757557765687]),
            {
              "mangroves4": 0,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78453451862266, 11.414844061984807]),
            {
              "mangroves4": 0,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78633696308067, 11.41963959970665]),
            {
              "mangroves4": 0,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([79.774902974456, 11.42335496818617]),
            {
              "mangroves4": 0,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([79.7778212178642, 11.421924747311882]),
            {
              "mangroves4": 0,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78022447714154, 11.41754990927816]),
            {
              "mangroves4": 0,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78237024435346, 11.436852603375748]),
            {
              "mangroves4": 0,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([79.77910867819135, 11.440722392277166]),
            {
              "mangroves4": 0,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([79.76889482626264, 11.44778882681901]),
            {
              "mangroves4": 0,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([79.77644792684858, 11.449976020796408]),
            {
              "mangroves4": 0,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([79.80314127096479, 11.445180996517728]),
            {
              "mangroves4": 0,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78580347189252, 11.44888242592138]),
            {
              "mangroves4": 0,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([79.77533212789838, 11.455696294316486]),
            {
              "mangroves4": 0,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([79.785889302581, 11.456369260064358]),
            {
              "mangroves4": 0,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([79.79387155660932, 11.461079975441926]),
            {
              "mangroves4": 0,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([79.77040941672028, 11.461614446750284]),
            {
              "mangroves4": 0,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([79.771439384982, 11.469100943663223]),
            {
              "mangroves4": 0,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([79.77384264425935, 11.47053092612018]),
            {
              "mangroves4": 0,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([79.7795074696988, 11.461025612735305]),
            {
              "mangroves4": 0,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([79.78912050680817, 11.470194460311212]),
            {
              "mangroves4": 0,
              "system:index": "39"
            })]);
var dataset1988= ee.ImageCollection(l5tm)
               .filterDate('1988-01-01','1988-12-01')
                .select(['B5', 'B4', 'B3', 'B2'])
               .filterBounds(pich1)
              .filter(ee.Filter.lt('CLOUD_COVER', 10))
            .median()
              .clip(pich1)
print(dataset1988)
Map.addLayer(dataset1988,imageVisParam,'FCC1988',0)
//Map.addLayer(asset)
var dataset2000= ee.ImageCollection(l5tm)
               .filterDate('2004-01-01','2004-12-01')
                .select(['B5', 'B4', 'B3', 'B2'])
               .filterBounds(pich1)
              .filter(ee.Filter.lt('CLOUD_COVER', 10))
            .median()
              .clip(pich1)
print(dataset2000)
Map.addLayer(dataset2000,imageVisParam3,'FCC2000',0)
var dataset2008= ee.ImageCollection(l7mss)
               .filterDate('2008-01-01','2008-12-01')
                .select(['B5', 'B4', 'B3', 'B2'])
               .filterBounds(pich1)
              .filter(ee.Filter.lt('CLOUD_COVER', 10))
            .median()
              .clip(pich1)
print(dataset2008)
Map.addLayer(dataset2008,imageVisParam,'FCC2008',0)
var dataset2018= ee.ImageCollection(l8mss)
               .filterDate('2018-01-01','2018-12-01')
               .select(['B5', 'B4', 'B3', 'B2'])
               .filterBounds(pich1)
              .filter(ee.Filter.lt('CLOUD_COVER', 10))
            .median()
              .clip(pich1)
print(dataset2018)
Map.addLayer(dataset2018,imageVisParam,'FCC2018',0)
Map.addLayer(image, imageVisParam4, 'data1977')
print(image)
/////////////////////////////////////////////////////////////////////////////////
var bands = ['B2', 'B3', 'B4', 'B5'];
var bands1 = ['b1','b2', 'b3', 'b4']
var newfc = water1988.merge(mangroves1988).merge(others1998);
print(newfc, 'newfc')
// Sample the input imagery to get a FeatureCollection of training data.
var training = dataset1988.select(bands).sampleRegions({
  collection: newfc, 
  properties: ['mangroves'], 
  scale: 30
});
// ----------------------------------------------------------------------------------------
// Random forest classification
// ----------------------------------------------------------------------------------------
// Make a Random Forest classifier and train it.
var classifier = ee.Classifier.smileRandomForest(10, null, 1, 0.5, null, 0).train({
  features: training, 
  classProperty: 'mangroves', 
  inputProperties: bands
});
// Classify the input imagery.
var classified = dataset1988.select(bands).classify(classifier).clip(asset);
// Define a palette for the Land Use classification.
var palette = [
   'D3D3D3', // urban (0)  // grey
  '0000FF', // water (1)  // blue
  '008000' //  forest (2) // green
];
// Display the classification result and the input image.
//Map.setCenter(-96.0171, 29.6803);
//Map.addLayer(classified, {min: 0, max: 2, palette: palette}, 'mangrove Classification 1988');
// Get a confusion matrix representing resubstitution accuracy.
//print('RF error matrix: ', classifier.confusionMatrix());
//print('RF accuracy: ', classifier.confusionMatrix().accuracy());
var mangove_mask = classified.select('classification').eq(1).clip(asset);
var mangroves = dataset1988.updateMask(mangove_mask)
Map.addLayer(mangroves, imageVisParam, '1988',0);
//var median = mangroves.reduce(ee.Reducer.median()).clip(asset);
//Map.addLayer(median)
var area_pxa = mangove_mask.multiply(ee.Image.pixelArea()) 
                    .reduceRegion(ee.Reducer.sum(),asset,30,null,null,false,1e6)
                    .get('classification')
 area_pxa = ee.Number(area_pxa).divide(1e6)  
print ('Area using ee.Image.pixelArea (km²)', area_pxa)
//////////////////////////////////////////////////////////////////////////////////////
  var newfc3 = water2000.merge(mangroves2000).merge(others2000);
print(newfc3, 'newfc3')
// Sample the input imagery to get a FeatureCollection of training data.
var training3 = dataset2000.select(bands).sampleRegions({
  collection: newfc3, 
  properties: ['mangroves3'], 
  scale: 30
});
// ----------------------------------------------------------------------------------------
// Random forest classification
// ----------------------------------------------------------------------------------------
// Make a Random Forest classifier and train it.
var classifier3 = ee.Classifier.smileRandomForest(10, null, 1, 0.5, null, 0).train({
  features: training3, 
  classProperty: 'mangroves3', 
  inputProperties: bands
});
// Classify the input imagery.
var classified3 = dataset2000.select(bands).classify(classifier3).clip(asset);
// Define a palette for the Land Use classification.
var palette = [
   'D3D3D3', // urban (0)  // grey
  '0000FF', // water (1)  // blue
  '008000' //  forest (2) // green
];
// Display the classification result and the input image.
//Map.setCenter(-96.0171, 29.6803);
//Map.addLayer(classified, {min: 0, max: 2, palette: palette}, 'mangrove Classification 2000');
// Get a confusion matrix representing resubstitution accuracy.
//print('RF error matrix: ', classifier.confusionMatrix());
//print('RF accuracy: ', classifier.confusionMatrix().accuracy());
var mangove_mask3 = classified3.select('classification').eq(1).clip(asset);
var mangroves3 = dataset2000.updateMask(mangove_mask3)
Map.addLayer(mangroves3, imageVisParam, '2000',0);
var area_pxa3 = mangove_mask3.multiply(ee.Image.pixelArea()) 
                    .reduceRegion(ee.Reducer.sum(),asset,30,null,null,false,1e6)
                    .get('classification')
 area_pxa3 = ee.Number(area_pxa3).divide(1e6)  
print ('Area using ee.Image.pixelArea (km²)', area_pxa3)
/////////////////////////////////////////////////////////////
var newfc1 = water2008.merge(mangroves2008).merge(others2008);
print(newfc1, 'newfc1')
// Sample the input imagery to get a FeatureCollection of training data.
var training1 = dataset2008.select(bands).sampleRegions({
  collection: newfc1, 
  properties: ['mangroves1'], 
  scale: 30
});
// ----------------------------------------------------------------------------------------
// Random forest classification
// ----------------------------------------------------------------------------------------
// Make a Random Forest classifier and train it.
var classifier1 = ee.Classifier.smileRandomForest(10, null, 1, 0.5, null, 0).train({
  features: training1, 
  classProperty: 'mangroves1', 
  inputProperties: bands
});
// Classify the input imagery.
var classified1 = dataset2008.select(bands).classify(classifier1);
// Define a palette for the Land Use classification.
var palette1 = [
   'D3D3D3', // urban (0)  // grey
  '0000FF', // water (1)  // blue
  '008000' //  mangroves (2) // green
];
// Display the classification result and the input image.
//Map.setCenter(-96.0171, 29.6803);
//Map.addLayer(classified1, {min: 0, max: 2, palette: palette1}, 'mangrove Classification 2008');
// Get a confusion matrix representing resubstitution accuracy.
//print('RF error matrix: ', classifier1.confusionMatrix());
//print('RF accuracy: ', classifier1.confusionMatrix().accuracy());
var mangove_mask1 = classified1.select('classification').eq(1).clip(asset)
var mangroves1 = dataset2008.updateMask(mangove_mask1)
print(mangroves1)
Map.addLayer(mangroves1, imageVisParam, '2008',0);
var median1 = mangroves1.reduce(ee.Reducer.median()).clip(asset);
var area_pxa1 = mangove_mask1.multiply(ee.Image.pixelArea()) 
                    .reduceRegion(ee.Reducer.sum(),asset,30,null,null,false,1e13)
                    .get('classification')
 area_pxa1 = ee.Number(area_pxa1).divide(1e6)  
print ('Area using ee.Image.pixelArea (km²)', area_pxa1)
///////////////////////////////////////////////////////////////////////////////////////////////////
var newfc2 = water2018.merge(mangroves2018).merge(others2018);
print(newfc2, 'newfc2')
// Sample the input imagery to get a FeatureCollection of training data.
var training2 = dataset2018.select(bands).sampleRegions({
  collection: newfc2, 
  properties: ['mangroves2'], 
  scale: 30
});
// ----------------------------------------------------------------------------------------
// Random forest classification
// ----------------------------------------------------------------------------------------
// Make a Random Forest classifier and train it.
var classifier2 = ee.Classifier.smileRandomForest(10, null, 1, 0.5, null, 0).train({
  features: training2, 
  classProperty: 'mangroves2', 
  inputProperties: bands
});
// Classify the input imagery.
var classified2 = dataset2018.select(bands).classify(classifier2);
// Define a palette for the Land Use classification.
var palette2 = [
   'D3D3D3', // urban (0)  // grey
  '0000FF', // water (1)  // blue
  '008000' //  mangroves (2) // green
];
// Display the classification result and the input image.
//Map.setCenter(-96.0171, 29.6803);
//Map.addLayer(classified2, {min: 0, max: 2, palette: palette2}, 'mangrove Classification 2018');
// Get a confusion matrix representing resubstitution accuracy.
//print('RF error matrix: ', classifier2.confusionMatrix());
//print('RF accuracy: ', classifier2.confusionMatrix().accuracy());
var mangove_mask2 = classified2.select('classification').eq(1).clip(asset);
var mangroves2 = dataset2018.updateMask(mangove_mask2);
Map.addLayer(mangroves2, imageVisParam, '2018',0);
var area_pxa2 = mangove_mask2.multiply(ee.Image.pixelArea()) 
                    .reduceRegion(ee.Reducer.sum(),asset,30,null,null,false,1e13)
                    .get('classification')
 area_pxa2 = ee.Number(area_pxa2).divide(1e6)  
print ('Area using ee.Image.pixelArea (km²)', area_pxa2)
var newfc4 = water1977.merge(mangroves1977).merge(others1977);
print(newfc4, 'newfc4')
// Sample the input imagery to get a FeatureCollection of training data.
var training4 = image.select(bands1).sampleRegions({
  collection: newfc4, 
  properties: ['mangroves4'], 
  scale: 30
});
// ----------------------------------------------------------------------------------------
// Random forest classification
// ----------------------------------------------------------------------------------------
// Make a Random Forest classifier and train it.
var classifier4 = ee.Classifier.smileRandomForest(10, null, 1, 0.5, null, 0).train({
  features: training4, 
  classProperty: 'mangroves4', 
  inputProperties: bands1
});
// Classify the input imagery.
var classified4 = image.select(bands1).classify(classifier4).clip(asset);
// Define a palette for the Land Use classification.
var palette = [
   'D3D3D3', // urban (0)  // grey
  '0000FF', // water (1)  // blue
  '008000' //  forest (2) // green
];
Map.addLayer(classified4, {min: 0, max: 2, palette: palette2}, 'mangrove Classification 1977');
// Display the classification result and the input image.
//Map.setCenter(-96.0171, 29.6803);
//Map.addLayer(classified, {min: 0, max: 2, palette: palette}, 'mangrove Classification 2000');
// Get a confusion matrix representing resubstitution accuracy.
//print('RF error matrix: ', classifier.confusionMatrix());
//print('RF accuracy: ', classifier.confusionMatrix().accuracy());
var mangove_mask4 = classified4.select('classification').eq(1).clip(asset);
var mangroves4 = image.updateMask(mangove_mask4)
Map.addLayer(mangroves4);
var area_pxa4 = mangove_mask4.multiply(ee.Image.pixelArea()) 
                    .reduceRegion(ee.Reducer.sum(),asset,30,null,null,false,1e6)
                    .get('classification')
 area_pxa4 = ee.Number(area_pxa4).divide(1e6)  
print ('Area using ee.Image.pixelArea (km²)', area_pxa4)
//////////////////////////////////////////////////////////////////////////////////////
/*
var median = mangroves.reduce(ee.Reducer.median());
var median1 = mangroves1.reduce(ee.Reducer.median());
var median2 = mangroves2.reduce(ee.Reducer.median());*/
//////////////////////////////////////////////////////////////////////////////////////////
var sub_image = mangove_mask4.subtract(mangove_mask1).clip(asset);
//subtracting the images
Map.addLayer(sub_image,imageVisParam2,'subimage');
var sub_image1 = classified1.subtract(classified2).clip(asset);
//Map.addLayer(sub_image1, imageVisParam2, 'subimage1')
var sub_image2 = classified4.subtract(classified2).clip(asset);
//Map.addLayer(sub_image2, imageVisParam2, 'subimage2');
var sub_image3 = classified4.subtract(classified3).clip(asset);
//Map.addLayer(sub_image3, imageVisParam2, 'subimage3')
var sub_image4 = classified1.subtract(classified3).clip(asset);
//Map.addLayer(sub_image4, imageVisParam2, 'subimage4')
var sub_image5 = classified2.subtract(classified3).clip(asset);
var sub_image6 = classified4.subtract(classified).clip(asset);
var areaimage = sub_image.select('classification').eq(-1);
//if you wand to find the common intersection
//var intersect= classified.and(classified1).add(classified2)
//Map.addLayer(intersect,imageVisParam2,'intersect')
//clipping one classified image by other
//var clipped= classified.updateMask(classified1).updateMask(classified2)
//Map.addLayer(clipped, {min: 0, max: 2, palette: palette2},'clipped')
var areaImage = areaimage.multiply(ee.Image.pixelArea().divide(1000000));
print(areaImage)
// Sum the values of loss pixels in area of interest in 2013.
var area = areaImage.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: pich1,
  scale: 100,
  maxPixels: 1e11
});
//var year2013 = area1.set('year', '2013');
print('gain 1: ', area.get('classification'), 'square km');
/////////gain 2
var areaimage1 = sub_image1.select('classification').eq(-1);
var areaImage1 = areaimage1.multiply(ee.Image.pixelArea().divide(1000000));
// Sum the values of loss pixels in area of interest in 2013.
var area1 = areaImage1.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: pich1,
  scale: 100,
  maxPixels: 1e11
});
//var year2013 = area1.set('year', '2013');
print('gain 2: ', area1.get('classification'), 'square km');
/////////gain 3
var areaimage2 = sub_image2.select('classification').eq(-1);
var areaImage2 = areaimage2.multiply(ee.Image.pixelArea().divide(1000000));
// Sum the values of loss pixels in area of interest .
var area2 = areaImage2.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: pich1,
  scale: 100,
  maxPixels: 1e11
});
//var year2013 = area1.set('year', '2013');
print('gain 3: ', area2.get('classification'), 'square km');
/////////////////////////////////////////////////////////////////////////////////////////////////
var areaimage3 = sub_image3.select('classification').eq(-1);
var areaImage3 = areaimage3.multiply(ee.Image.pixelArea().divide(1000000));
// Sum the values of loss pixels in area of interest.
var area3 = areaImage3.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: pich1,
  scale: 100,
  maxPixels: 1e11
});
//var year2013 = area1.set('year', '2013');
print('gain 4: ', area3.get('classification'), 'square km');
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var areaimage4 = sub_image4.select('classification').eq(-1);
var areaImage4 = areaimage4.multiply(ee.Image.pixelArea().divide(1000000));
// Sum the values of loss pixels in area of interest in 2013.
var area4 = areaImage4.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: pich1,
  scale: 100,
  maxPixels: 1e11
});
//var year2013 = area1.set('year', '2013');
print('gain 5: ', area4.get('classification'), 'square km');
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var areaimage5 = sub_image5.select('classification').eq(-1);
var areaImage5 = areaimage5.multiply(ee.Image.pixelArea().divide(1000000));
// Sum the values of loss pixels in area of interest in 2013.
var area5 = areaImage5.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: pich1,
  scale: 100,
  maxPixels: 1e11
});
//var year2013 = area1.set('year', '2013');
print('gain 6: ', area5.get('classification'), 'square km');
///////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
var areaimage6 = sub_image6.select('classification').eq(-1);
var areaImage6 = areaimage6.multiply(ee.Image.pixelArea().divide(1000000));
// Sum the values of loss pixels in area of interest in 2013.
var area6 = areaImage6.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: pich1,
  scale: 100,
  maxPixels: 1e11
});
//var year2013 = area1.set('year', '2013');
print('gain 7: ', area6.get('classification'), 'square km');
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var yValues = ee.Array.cat([area6.get('classification'), area3.get('classification'), area.get('classification'), area2.get('classification')], 0);
var yValues1 = ee.Array.cat([area_pxa4, area_pxa, area_pxa3, area_pxa2, area_pxa1], 0);
//var xvalues = [('2000', '2008', '2018'), 0]
var chart2 = ui.Chart.array.values({
  array: yValues1,
  axis: 0,
  xLabels:[1978, 1988, 2000, 2008, 2018]
}).setChartType('ColumnChart')
  .setSeriesNames(['gain'])
  .setOptions({
    title: ' Mangrove area',
    hAxis: {title: 'Year'},
    vAxis: {title: 'Area (square km)'},
    legend: { position: "none"} ,
    // series: {0 : 'gain'},
    lineWidth: 1,
    pointSize: 3
  });
//print(chart2);
var chart = ui.Chart.array.values({
  array: yValues,
  axis: 0,
}).setChartType('ColumnChart')
  //.setSeriesNames(['gain'])
  .setOptions({
    title: ' Mangrove gain',
    hAxis: {title: 'Year', format: '####'},
    vAxis: {title: 'Area (square km)'},
    legend: { position: "none" },
    lineWidth: 1,
    pointSize: 3
  });
//print(chart);
var title = ui.Label('Mangrove Gain');
title.style().set('position', 'top-center');
Map.add(title);
// Create a panel to hold the chart.
var panel = ui.Panel();
panel.style().set({
  width: '500px',
  position: 'bottom-left'
});
Map.add(panel);
var panel1 = ui.Panel();
panel1.style().set({
  width: '500px',
  position: 'bottom-right'
});
Map.add(panel1);
////////////////////////////////////////////////////////////////////////
// Register a function to draw a chart when a user clicks on the map.
var chart1 = ui.Chart.array.values({
  array: yValues,
  axis: 0,
  xLabels: [1988, 2000, 2008, 2018]
}).setChartType('ColumnChart')
  .setSeriesNames(['gain'])
  .setOptions({
    title: ' Mangrove gain with respective to 1978',
    hAxis: {title: 'Year'},
    vAxis: {title: 'Area (square km)'},
    legend: { position: "none" },
    lineWidth: 1,
    pointSize: 3
  });
 // panel.add(chart);
  panel.add(chart1);
  panel1.add(chart2);
Map.setCenter(79.5246, 11.24568, 10);
//////////////////////////lossssssssssssssssssssssssssssssssssssss//////////////////////////////////
/*
var lossimage = sub_image.select('classification').eq(1);
var lossImage = lossimage.multiply(ee.Image.pixelArea());
//print(lossImage)
// Sum the values of loss pixels in area of interest in 2013.
var loss = lossImage.reduceRegion({
 reducer: ee.Reducer.sum(),
 geometry: asset,
 scale: 100,
 maxPixels: 1e11
});
var year2013 = area1.set('year', '2013');
print('Loss 1: ', loss.get('classification'), 'square meters');
*/
/////////gain 2
//var lossimage1 = sub_image1.select('classification').eq(-1);
//var lossImage1 = lossimage1.multiply(ee.Image.pixelArea());
// Sum the values of loss pixels in area of interest in 2013.
//var loss1 = lossImage1.reduceRegion({
//  reducer: ee.Reducer.sum(),
//  geometry: pich,
//  scale: 100,
//  maxPixels: 1e11
//});
//var year2013 = area1.set('year', '2013');
//print('loss 2: ', loss1.get('classification'), 'square meters');
/////////gain 3
//var lossimage2 = sub_image2.select('classification').eq(-1);
//var lossImage2 = lossimage2.multiply(ee.Image.pixelArea());
// Sum the values of loss pixels in area of interest in 2013.
//var loss2 = lossImage2.reduceRegion({
//  reducer: ee.Reducer.sum(),
//  geometry: pich,
//  scale: 100,
//  maxPixels: 1e11
//});
//var year2013 = area1.set('year', '2013');
//print('loss 3: ', loss2.get('classification'), 'square meters');
//var yValues1 = ee.Array.cat([loss.get('classification'), loss1.get('classification'), loss2.get('classification')], 0);
//var chart1 = ui.Chart.array.values({
//  array: yValues1,
//  axis: 0,
//}).setChartType('ColumnChart')
//  .setOptions({
//    title: 'Yearly Mangrove Loss',
//    hAxis: {title: 'Year', format: '####'},
//    vAxis: {title: 'Area (square meters)'},
//    legend: { position: "none" },
//    lineWidth: 1,
//    pointSize: 3
//  });
//print(chart1);
/*
var asdf = function(image) {
  var d = (image.select('classification').eq(-1))
  var c = d.multiply(ee.Image.pixelArea())
  var area = c.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: pich1,
  scale: 100,
  maxPixels: 1e11
  })
  var final = (area.get('classification'))
  return image;
}
//var squares = sub_image1.map(asdf);
//print(squares)
var extract = function(image) {
  return image.select('classification').eq(-1)
};
//var c = function(image) {
//   return image.multiply(ee.Image.pixelArea())
//};
//print(sub_image1.map(extract))
function addIndices(image)
{
  var d = (image.select('classification').eq(-1))
  var c = d.multiply(ee.Image.pixelArea())
  var area = c.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: pich1,
  scale: 100,
  maxPixels: 1e11
  })
}
var img_temp = ee.Image.cat(sub_image);
var image = ee.ImageCollection(img_temp)
print(image)
/////////////////////////////////////////////////////////////////////////////////////////////////
var image1 = ee.Image(sub_image)
var image2 = ee.Image(sub_image1)
var image3 = ee.Image(sub_image2)
var image4 = ee.Image(sub_image3)
var image5 = ee.Image(sub_image4)
var image6 = ee.Image(sub_image5)
var collection = ee.ImageCollection([image1,image2, image3, image4, image5, image6])
print(collection)
var first = function(img){ // Courtesy of Dave sir
  // fishing condition thresholding based on Axbard, 2016
  var fun = img.select('classification').eq(-1).and(
                  img.multiply(ee.Image.pixelArea())).and(
                  img.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: pich1,
  scale: 100,
  maxPixels: 1e11
  }));
  var Con = fun.rename('gain')
  return img.addBands(Con)
}
var InputCollection = collection
                      .map(first);
print(InputCollection)*/