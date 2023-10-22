var s2 = ui.import && ui.import("s2", "imageCollection", {
      "id": "COPERNICUS/S2_SR"
    }) || ee.ImageCollection("COPERNICUS/S2_SR"),
    AOI = ui.import && ui.import("AOI", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -84.9273543576206,
                10.050306232881589
              ],
              [
                -84.9273543576206,
                9.950564841550909
              ],
              [
                -84.74470665254248,
                9.950564841550909
              ],
              [
                -84.74470665254248,
                10.050306232881589
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
      "color": "#d6b86b",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d6b86b */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[-84.9273543576206, 10.050306232881589],
          [-84.9273543576206, 9.950564841550909],
          [-84.74470665254248, 9.950564841550909],
          [-84.74470665254248, 10.050306232881589]]], null, false),
    Mangle = ui.import && ui.import("Mangle", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -84.88605385123468,
            10.019357711521724
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.89390735923028,
            10.019885971635937
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.88991623221612,
            10.016969965071228
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.88770609198785,
            10.015659866630719
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.88468056021905,
            10.016948834493194
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.88144045172906,
            10.014835769739712
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.87905087662122,
            10.021557102353734
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.87705531311414,
            10.020204761712318
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.87428727341077,
            10.01750006351074
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.87649741363904,
            10.017119713517236
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.87308859559162,
            10.014735118376487
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.87482666703328,
            10.012896740275911
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.87705826493367,
            10.011776803684478
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.87924694748982,
            10.012093767262858
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.88001942368611,
            10.009811622589664
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.88409638138874,
            10.011544363530263
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.88508343430622,
            10.013340487667593
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.88351702424153,
            10.015432431482996
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.87195133896931,
            10.008860724240337
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.87424730988606,
            10.010001801925279
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.87345337601765,
            10.011734541850643
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.86899018021687,
            10.009304477149978
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.866672751628,
            10.007656248999577
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.86414074631794,
            10.007339281088289
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.86250996323689,
            10.007233625049107
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.8617374870406,
            10.009177690666256
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.85978483887776,
            10.006726475582445
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.86008524628743,
            10.008438101857717
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.85581516953572,
            10.012833347741857
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.8586046669112,
            10.011882458244994
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.85796611208721,
            10.022093871222202
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.85989730257793,
            10.022600996668972
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.85521953005596,
            10.019685014518013
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.86517588991924,
            10.019304667086837
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.86813704867168,
            10.016050565276363
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.87204234499737,
            10.020995096699666
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.87075488467022,
            10.017698750793004
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.8702828158836,
            10.014402371385943
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.86663501162334,
            10.01410654082703
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.86925284762188,
            10.012120242946732
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.86375968355938,
            10.015543429586513
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.86161391634747,
            10.01558569092427
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.86002604861065,
            10.017614228662536
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.86251513857647,
            10.019262406233606
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.85882441897198,
            10.015205338686197
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.85453288454815,
            10.014867247433564
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.85238711733624,
            10.012077981157617
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.85715072054668,
            10.017994578076177
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.86294429201885,
            10.003963615707471
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.86599128145977,
            10.003752301398219
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.86839454073711,
            10.004513032268099
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.86526172060772,
            10.006203538932802
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.85981147188946,
            10.002822516804414
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.85723655123516,
            10.005104710601694
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.85281627077862,
            10.003963615707471
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.8506705035667,
            10.000667096829218
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.84985511202618,
            9.997201489638483
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.8512284030418,
            9.996778852087058
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.85509078402325,
            10.002146308155547
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.84496276278301,
            10.007006526515735
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.83813922304913,
            10.002949305769363
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.84333197970196,
            9.999483722919448
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.84569232363506,
            9.999779566800918
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.84504859347149,
            10.0034141982175
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.8391262759666,
            9.99918787876864
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.84088580508038,
            9.994073958745957
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.84165828127666,
            9.991622629718178
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.84333197970196,
            9.994243015239105
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.8353068103294,
            9.989932047209189
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.83346145052715,
            9.988156926118124
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.8376671542625,
            9.99107319136663
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.83547847170635,
            9.99576451972156
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.83346145052715,
            9.997328280796754
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.83307521242901,
            9.998934297853587
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.8329464663963,
            10.001005202868976
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.8338476886253,
            10.003921352856624
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.83118693728252,
            9.996567533105253
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.83140151400372,
            9.992256595893437
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.82959906954571,
            9.98938260600181
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.81475036043926,
            9.995595464019598
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.81384913821026,
            9.991749423052102
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.82183139223858,
            9.988410515438453
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.8226467837791,
            9.986804446404742
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.81256167788311,
            9.988917693486101
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.80814139742657,
            9.98879089904831
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.8113171329002,
            9.997539599283957
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.81419246096416,
            9.999441459485821
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.81045882601543,
            10.002315360449725
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.8087422122459,
            10.004174929879223
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.80711142916485,
            10.002230834313629
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.80277697939678,
            9.997877708577716
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.8078409900169,
            9.999145615296538
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.80196158785625,
            10.00244214961262
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.7948376407127,
            10.005442812022638
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.79762713808819,
            9.994158487003522
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.79324977297588,
            9.995637727953335
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.79003112215801,
            9.995679991881564
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.7876707782249,
            9.992129802757255
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.78591124911114,
            9.984014939242005
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.7902456988792,
            9.983423222527623
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.79432265658184,
            9.987396156971135
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.79900042910381,
            9.987861071661222
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.80230491061016,
            9.988621839721059
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.77230572049302,
            9.99942603184109
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.76874374692125,
            9.999299241501225
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.77372192685289,
            9.996425313863051
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.77711223904771,
            9.992367961000486
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.77994465176744,
            9.990423794812607
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.77882885281724,
            9.987718848611413
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.7732927734105,
            9.991691730601167
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.76041817013902,
            9.991733995042319
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.77290653531236,
            10.00610358648095
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.79414963071031,
            10.001665986354592
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#30d629",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #30d629 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([-84.88605385123468, 10.019357711521724]),
            {
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.89390735923028, 10.019885971635937]),
            {
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.88991623221612, 10.016969965071228]),
            {
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.88770609198785, 10.015659866630719]),
            {
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.88468056021905, 10.016948834493194]),
            {
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.88144045172906, 10.014835769739712]),
            {
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.87905087662122, 10.021557102353734]),
            {
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.87705531311414, 10.020204761712318]),
            {
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.87428727341077, 10.01750006351074]),
            {
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.87649741363904, 10.017119713517236]),
            {
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.87308859559162, 10.014735118376487]),
            {
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.87482666703328, 10.012896740275911]),
            {
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.87705826493367, 10.011776803684478]),
            {
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.87924694748982, 10.012093767262858]),
            {
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.88001942368611, 10.009811622589664]),
            {
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.88409638138874, 10.011544363530263]),
            {
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.88508343430622, 10.013340487667593]),
            {
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.88351702424153, 10.015432431482996]),
            {
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.87195133896931, 10.008860724240337]),
            {
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.87424730988606, 10.010001801925279]),
            {
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.87345337601765, 10.011734541850643]),
            {
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.86899018021687, 10.009304477149978]),
            {
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.866672751628, 10.007656248999577]),
            {
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.86414074631794, 10.007339281088289]),
            {
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.86250996323689, 10.007233625049107]),
            {
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.8617374870406, 10.009177690666256]),
            {
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.85978483887776, 10.006726475582445]),
            {
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.86008524628743, 10.008438101857717]),
            {
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.85581516953572, 10.012833347741857]),
            {
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.8586046669112, 10.011882458244994]),
            {
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.85796611208721, 10.022093871222202]),
            {
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.85989730257793, 10.022600996668972]),
            {
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.85521953005596, 10.019685014518013]),
            {
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.86517588991924, 10.019304667086837]),
            {
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.86813704867168, 10.016050565276363]),
            {
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.87204234499737, 10.020995096699666]),
            {
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.87075488467022, 10.017698750793004]),
            {
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.8702828158836, 10.014402371385943]),
            {
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.86663501162334, 10.01410654082703]),
            {
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.86925284762188, 10.012120242946732]),
            {
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.86375968355938, 10.015543429586513]),
            {
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.86161391634747, 10.01558569092427]),
            {
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.86002604861065, 10.017614228662536]),
            {
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.86251513857647, 10.019262406233606]),
            {
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.85882441897198, 10.015205338686197]),
            {
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.85453288454815, 10.014867247433564]),
            {
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.85238711733624, 10.012077981157617]),
            {
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.85715072054668, 10.017994578076177]),
            {
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.86294429201885, 10.003963615707471]),
            {
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.86599128145977, 10.003752301398219]),
            {
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.86839454073711, 10.004513032268099]),
            {
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.86526172060772, 10.006203538932802]),
            {
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.85981147188946, 10.002822516804414]),
            {
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.85723655123516, 10.005104710601694]),
            {
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.85281627077862, 10.003963615707471]),
            {
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.8506705035667, 10.000667096829218]),
            {
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.84985511202618, 9.997201489638483]),
            {
              "system:index": "56"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.8512284030418, 9.996778852087058]),
            {
              "system:index": "57"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.85509078402325, 10.002146308155547]),
            {
              "system:index": "58"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.84496276278301, 10.007006526515735]),
            {
              "system:index": "59"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.83813922304913, 10.002949305769363]),
            {
              "system:index": "60"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.84333197970196, 9.999483722919448]),
            {
              "system:index": "61"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.84569232363506, 9.999779566800918]),
            {
              "system:index": "62"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.84504859347149, 10.0034141982175]),
            {
              "system:index": "63"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.8391262759666, 9.99918787876864]),
            {
              "system:index": "64"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.84088580508038, 9.994073958745957]),
            {
              "system:index": "65"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.84165828127666, 9.991622629718178]),
            {
              "system:index": "66"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.84333197970196, 9.994243015239105]),
            {
              "system:index": "67"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.8353068103294, 9.989932047209189]),
            {
              "system:index": "68"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.83346145052715, 9.988156926118124]),
            {
              "system:index": "69"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.8376671542625, 9.99107319136663]),
            {
              "system:index": "70"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.83547847170635, 9.99576451972156]),
            {
              "system:index": "71"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.83346145052715, 9.997328280796754]),
            {
              "system:index": "72"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.83307521242901, 9.998934297853587]),
            {
              "system:index": "73"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.8329464663963, 10.001005202868976]),
            {
              "system:index": "74"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.8338476886253, 10.003921352856624]),
            {
              "system:index": "75"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.83118693728252, 9.996567533105253]),
            {
              "system:index": "76"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.83140151400372, 9.992256595893437]),
            {
              "system:index": "77"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.82959906954571, 9.98938260600181]),
            {
              "system:index": "78"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.81475036043926, 9.995595464019598]),
            {
              "system:index": "79"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.81384913821026, 9.991749423052102]),
            {
              "system:index": "80"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.82183139223858, 9.988410515438453]),
            {
              "system:index": "81"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.8226467837791, 9.986804446404742]),
            {
              "system:index": "82"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.81256167788311, 9.988917693486101]),
            {
              "system:index": "83"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.80814139742657, 9.98879089904831]),
            {
              "system:index": "84"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.8113171329002, 9.997539599283957]),
            {
              "system:index": "85"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.81419246096416, 9.999441459485821]),
            {
              "system:index": "86"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.81045882601543, 10.002315360449725]),
            {
              "system:index": "87"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.8087422122459, 10.004174929879223]),
            {
              "system:index": "88"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.80711142916485, 10.002230834313629]),
            {
              "system:index": "89"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.80277697939678, 9.997877708577716]),
            {
              "system:index": "90"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.8078409900169, 9.999145615296538]),
            {
              "system:index": "91"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.80196158785625, 10.00244214961262]),
            {
              "system:index": "92"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.7948376407127, 10.005442812022638]),
            {
              "system:index": "93"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.79762713808819, 9.994158487003522]),
            {
              "system:index": "94"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.79324977297588, 9.995637727953335]),
            {
              "system:index": "95"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.79003112215801, 9.995679991881564]),
            {
              "system:index": "96"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.7876707782249, 9.992129802757255]),
            {
              "system:index": "97"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.78591124911114, 9.984014939242005]),
            {
              "system:index": "98"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.7902456988792, 9.983423222527623]),
            {
              "system:index": "99"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.79432265658184, 9.987396156971135]),
            {
              "system:index": "100"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.79900042910381, 9.987861071661222]),
            {
              "system:index": "101"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.80230491061016, 9.988621839721059]),
            {
              "system:index": "102"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.77230572049302, 9.99942603184109]),
            {
              "system:index": "103"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.76874374692125, 9.999299241501225]),
            {
              "system:index": "104"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.77372192685289, 9.996425313863051]),
            {
              "system:index": "105"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.77711223904771, 9.992367961000486]),
            {
              "system:index": "106"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.77994465176744, 9.990423794812607]),
            {
              "system:index": "107"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.77882885281724, 9.987718848611413]),
            {
              "system:index": "108"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.7732927734105, 9.991691730601167]),
            {
              "system:index": "109"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.76041817013902, 9.991733995042319]),
            {
              "system:index": "110"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.77290653531236, 10.00610358648095]),
            {
              "system:index": "111"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.79414963071031, 10.001665986354592]),
            {
              "system:index": "112"
            })]),
    Agua = ui.import && ui.import("Agua", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -84.87949950902097,
            9.992480495847634
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.86662490574949,
            9.983520332069517
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.87091644017332,
            9.971009502134077
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.83847243992918,
            9.957483740323973
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.7929821750366,
            9.971178570606082
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.77873428074949,
            9.958160041734684
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.82971770970457,
            9.986225313174588
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.84516723363035,
            9.989944625477666
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.864736630603,
            9.999580827665891
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.88550765721433,
            10.008709597741511
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.87211806981199,
            10.001440412747598
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.90009887425535,
            10.01766906692543
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.91177184788816,
            10.025445009392959
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.9218998691284,
            10.022064187756941
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.9112568637573,
            10.009216744110518
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.91537673680418,
            9.995861625579186
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.89821059910886,
            9.989606507934502
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.76345641820066,
            9.97067136492693
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.75315673558347,
            9.950213411664874
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.79504211156004,
            9.954440366633674
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.809804989978,
            9.968642534317336
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.820791318103,
            9.968304394654716
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.88138778416746,
            9.979800946345497
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.85787017552488,
            9.961203380737027
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.8479138156616,
            9.968811604017125
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.8314343234741,
            9.968135324691882
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.82782943455808,
            9.964415763328244
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.80208022801511,
            9.977095911859841
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.8167126122596,
            9.98387735590318
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.80774330531379,
            9.984595867913875
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.8055117074134,
            9.984933990664139
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.81199192439338,
            9.986117417523529
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.80465340052864,
            9.985948356807102
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.79482578669807,
            9.98552570463178
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.78332447444221,
            9.98315884230633
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.78476213847419,
            9.981785208956767
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.7917144242408,
            9.98148934870744
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.78182243739387,
            9.987575562556659
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.78220867549202,
            9.990048054416162
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.79152130519172,
            9.98717404501108
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.80143474971077,
            9.986497803814313
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.80094122325202,
            9.987068382416727
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.80377363597175,
            9.98858992046462
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.8040525857093,
            9.989604275209784
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.80592314434848,
            9.991923352813318
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.80727497769199,
            9.99329694336077
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.80643812847934,
            9.99500864038374
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.80409924221836,
            9.994290151372743
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.80309073162876,
            9.993487132363871
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.80115954113803,
            9.995304488338519
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.78246990872226,
            9.991902220605732
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.78096787167392,
            9.99196561722437
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.77983061505161,
            9.995241092370865
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.8239713204742,
            9.982990908069576
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.82671790250545,
            9.984343403632503
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.82506566175228,
            9.98504078196099
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.81845669873958,
            9.985843821821389
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.81751256116634,
            9.987428763098675
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.82858471997982,
            9.987090642940677
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.83214669355159,
            9.989140491006104
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.82824139722591,
            9.987978207605984
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.82774787076717,
            9.98622420843201
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.83156733640438,
            9.986012882592114
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.83678155072933,
            9.984026412989191
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.83688883908992,
            9.987344233092111
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.83768277295833,
            9.988548783612199
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.8356228364349,
            9.987830280329913
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.83701758512264,
            9.986055147771078
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.83399205335384,
            9.985695893574945
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.83493619092708,
            9.982758447328749
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.83753793367153,
            9.994270337666695
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.8385786307693,
            9.99441297900242
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.83911507257228,
            9.993916375563272
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.83942620881801,
            9.992928449445012
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.83674936422115,
            9.994872600658507
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.84569378261054,
            9.994720609633305
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.84695978526557,
            9.995396833733457
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.84786100749457,
            9.996411167246245
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.85219545726264,
            9.995270041821813
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.84848327998603,
            9.993621742470792
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.84367676143134,
            9.990684367786947
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.84140224818671,
            9.988782456360243
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.84442777995551,
            9.993304760868371
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.8492342985102,
            9.99322023238888
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.85101528529609,
            9.993093439628423
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#0e3cff",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #0e3cff */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([-84.87949950902097, 9.992480495847634]),
            {
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.86662490574949, 9.983520332069517]),
            {
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.87091644017332, 9.971009502134077]),
            {
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.83847243992918, 9.957483740323973]),
            {
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.7929821750366, 9.971178570606082]),
            {
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.77873428074949, 9.958160041734684]),
            {
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.82971770970457, 9.986225313174588]),
            {
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.84516723363035, 9.989944625477666]),
            {
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.864736630603, 9.999580827665891]),
            {
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.88550765721433, 10.008709597741511]),
            {
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.87211806981199, 10.001440412747598]),
            {
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.90009887425535, 10.01766906692543]),
            {
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.91177184788816, 10.025445009392959]),
            {
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.9218998691284, 10.022064187756941]),
            {
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.9112568637573, 10.009216744110518]),
            {
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.91537673680418, 9.995861625579186]),
            {
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.89821059910886, 9.989606507934502]),
            {
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.76345641820066, 9.97067136492693]),
            {
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.75315673558347, 9.950213411664874]),
            {
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.79504211156004, 9.954440366633674]),
            {
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.809804989978, 9.968642534317336]),
            {
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.820791318103, 9.968304394654716]),
            {
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.88138778416746, 9.979800946345497]),
            {
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.85787017552488, 9.961203380737027]),
            {
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.8479138156616, 9.968811604017125]),
            {
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.8314343234741, 9.968135324691882]),
            {
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.82782943455808, 9.964415763328244]),
            {
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.80208022801511, 9.977095911859841]),
            {
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.8167126122596, 9.98387735590318]),
            {
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.80774330531379, 9.984595867913875]),
            {
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.8055117074134, 9.984933990664139]),
            {
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.81199192439338, 9.986117417523529]),
            {
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.80465340052864, 9.985948356807102]),
            {
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.79482578669807, 9.98552570463178]),
            {
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.78332447444221, 9.98315884230633]),
            {
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.78476213847419, 9.981785208956767]),
            {
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.7917144242408, 9.98148934870744]),
            {
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.78182243739387, 9.987575562556659]),
            {
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.78220867549202, 9.990048054416162]),
            {
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.79152130519172, 9.98717404501108]),
            {
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.80143474971077, 9.986497803814313]),
            {
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.80094122325202, 9.987068382416727]),
            {
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.80377363597175, 9.98858992046462]),
            {
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.8040525857093, 9.989604275209784]),
            {
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.80592314434848, 9.991923352813318]),
            {
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.80727497769199, 9.99329694336077]),
            {
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.80643812847934, 9.99500864038374]),
            {
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.80409924221836, 9.994290151372743]),
            {
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.80309073162876, 9.993487132363871]),
            {
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.80115954113803, 9.995304488338519]),
            {
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.78246990872226, 9.991902220605732]),
            {
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.78096787167392, 9.99196561722437]),
            {
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.77983061505161, 9.995241092370865]),
            {
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.8239713204742, 9.982990908069576]),
            {
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.82671790250545, 9.984343403632503]),
            {
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.82506566175228, 9.98504078196099]),
            {
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.81845669873958, 9.985843821821389]),
            {
              "system:index": "56"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.81751256116634, 9.987428763098675]),
            {
              "system:index": "57"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.82858471997982, 9.987090642940677]),
            {
              "system:index": "58"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.83214669355159, 9.989140491006104]),
            {
              "system:index": "59"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.82824139722591, 9.987978207605984]),
            {
              "system:index": "60"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.82774787076717, 9.98622420843201]),
            {
              "system:index": "61"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.83156733640438, 9.986012882592114]),
            {
              "system:index": "62"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.83678155072933, 9.984026412989191]),
            {
              "system:index": "63"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.83688883908992, 9.987344233092111]),
            {
              "system:index": "64"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.83768277295833, 9.988548783612199]),
            {
              "system:index": "65"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.8356228364349, 9.987830280329913]),
            {
              "system:index": "66"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.83701758512264, 9.986055147771078]),
            {
              "system:index": "67"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.83399205335384, 9.985695893574945]),
            {
              "system:index": "68"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.83493619092708, 9.982758447328749]),
            {
              "system:index": "69"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.83753793367153, 9.994270337666695]),
            {
              "system:index": "70"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.8385786307693, 9.99441297900242]),
            {
              "system:index": "71"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.83911507257228, 9.993916375563272]),
            {
              "system:index": "72"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.83942620881801, 9.992928449445012]),
            {
              "system:index": "73"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.83674936422115, 9.994872600658507]),
            {
              "system:index": "74"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.84569378261054, 9.994720609633305]),
            {
              "system:index": "75"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.84695978526557, 9.995396833733457]),
            {
              "system:index": "76"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.84786100749457, 9.996411167246245]),
            {
              "system:index": "77"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.85219545726264, 9.995270041821813]),
            {
              "system:index": "78"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.84848327998603, 9.993621742470792]),
            {
              "system:index": "79"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.84367676143134, 9.990684367786947]),
            {
              "system:index": "80"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.84140224818671, 9.988782456360243]),
            {
              "system:index": "81"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.84442777995551, 9.993304760868371]),
            {
              "system:index": "82"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.8492342985102, 9.99322023238888]),
            {
              "system:index": "83"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.85101528529609, 9.993093439628423]),
            {
              "system:index": "84"
            })]),
    Cultivos = ui.import && ui.import("Cultivos", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -84.82676470646263,
            9.997616175928771
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.8265072143972,
            9.99926445502508
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.82906067737937,
            10.000659146192058
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.82238734135032,
            9.998144471421208
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.82221567997337,
            10.000638014552365
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.82118571171165,
            10.000828199260052
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.8205634392202,
            9.998651634286034
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.8248335159719,
            9.994573177175642
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.82620680698753,
            9.993749026778213
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.82620680698753,
            9.995693173084991
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.82341730961204,
            9.996073548176444
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.82294524082542,
            9.994319592660469
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.82661450275779,
            9.993495441620265
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.83661377796531,
            10.008181922565454
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.8368283546865,
            10.006470294939705
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.8352619446218,
            10.00820305371431
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.83500445255638,
            10.007146494586049
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.8325582779348,
            10.007611381026068
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.82903921970725,
            10.008456627393496
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.82562744984031,
            10.008794725324304
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.8270651138723,
            10.006892919883702
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.8285242355764,
            10.004906577864533
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.82266629108787,
            10.008710200874612
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.81882536777854,
            10.00928074048298
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.81682980427146,
            10.00925960940426
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.81494152912498,
            10.009153953989996
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.81537068256736,
            10.00678726369926
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.81725895771385,
            10.006449163678067
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.81869662174583,
            10.006449163678067
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.82043469318748,
            10.00691405111645
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.82084238895774,
            10.005730699964209
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.82285941013694,
            10.00608993201984
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.8250480926931,
            10.005160154117949
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.82487643131614,
            10.002476462063244
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.82760155567527,
            10.003216064449102
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.82882464298606,
            10.003913402299103
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.82661450275779,
            10.003913402299103
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.82109988102317,
            10.003638693627817
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.81936180958152,
            10.002920223696828
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.81919014820457,
            10.002138357554593
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.81805289158225,
            10.00211722601112
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.82165778049827,
            10.00209609446626
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.82262337574363,
            10.002138357554593
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.82232296833396,
            10.003216064449102
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.80796778568626,
            10.008097397956213
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.80642283329368,
            10.006005406866025
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.80773175129295,
            10.006723869972104
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.8033114708364,
            10.007738168121463
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.80466330417991,
            10.008329840578654
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.81335366138816,
            10.005455992830022
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.79987824329734,
            10.018620542577148
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.79670250782371,
            10.017859844771959
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.79627335438133,
            10.021071667811816
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.82176506885887,
            10.01802888888285
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.82888901600242,
            10.023860856746417
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.83747208485008,
            10.018536020686913
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.84047615894676,
            10.017944366838408
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.843222740978,
            10.017183667447357
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.84777176746726,
            10.021156189041182
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.84227860340476,
            10.027241659642225
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.8373862541616,
            10.027326179262728
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.83292305836082,
            10.016422966272373
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.80210984119773,
            10.015239649787897
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.77850640186668,
            10.010759912575589
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.7780772484243,
            10.00898490525566
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.77773392567039,
            10.015915831164666
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.77464402088523,
            10.01676105590371
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.77970803150535,
            10.025551262602677
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.79301178821922,
            10.02656550188451
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.79695999988914,
            10.026734541456204
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#8b8052",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #8b8052 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([-84.82676470646263, 9.997616175928771]),
            {
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.8265072143972, 9.99926445502508]),
            {
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.82906067737937, 10.000659146192058]),
            {
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.82238734135032, 9.998144471421208]),
            {
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.82221567997337, 10.000638014552365]),
            {
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.82118571171165, 10.000828199260052]),
            {
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.8205634392202, 9.998651634286034]),
            {
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.8248335159719, 9.994573177175642]),
            {
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.82620680698753, 9.993749026778213]),
            {
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.82620680698753, 9.995693173084991]),
            {
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.82341730961204, 9.996073548176444]),
            {
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.82294524082542, 9.994319592660469]),
            {
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.82661450275779, 9.993495441620265]),
            {
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.83661377796531, 10.008181922565454]),
            {
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.8368283546865, 10.006470294939705]),
            {
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.8352619446218, 10.00820305371431]),
            {
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.83500445255638, 10.007146494586049]),
            {
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.8325582779348, 10.007611381026068]),
            {
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.82903921970725, 10.008456627393496]),
            {
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.82562744984031, 10.008794725324304]),
            {
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.8270651138723, 10.006892919883702]),
            {
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.8285242355764, 10.004906577864533]),
            {
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.82266629108787, 10.008710200874612]),
            {
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.81882536777854, 10.00928074048298]),
            {
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.81682980427146, 10.00925960940426]),
            {
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.81494152912498, 10.009153953989996]),
            {
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.81537068256736, 10.00678726369926]),
            {
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.81725895771385, 10.006449163678067]),
            {
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.81869662174583, 10.006449163678067]),
            {
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.82043469318748, 10.00691405111645]),
            {
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.82084238895774, 10.005730699964209]),
            {
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.82285941013694, 10.00608993201984]),
            {
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.8250480926931, 10.005160154117949]),
            {
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.82487643131614, 10.002476462063244]),
            {
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.82760155567527, 10.003216064449102]),
            {
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.82882464298606, 10.003913402299103]),
            {
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.82661450275779, 10.003913402299103]),
            {
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.82109988102317, 10.003638693627817]),
            {
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.81936180958152, 10.002920223696828]),
            {
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.81919014820457, 10.002138357554593]),
            {
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.81805289158225, 10.00211722601112]),
            {
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.82165778049827, 10.00209609446626]),
            {
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.82262337574363, 10.002138357554593]),
            {
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.82232296833396, 10.003216064449102]),
            {
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.80796778568626, 10.008097397956213]),
            {
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.80642283329368, 10.006005406866025]),
            {
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.80773175129295, 10.006723869972104]),
            {
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.8033114708364, 10.007738168121463]),
            {
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.80466330417991, 10.008329840578654]),
            {
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.81335366138816, 10.005455992830022]),
            {
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.79987824329734, 10.018620542577148]),
            {
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.79670250782371, 10.017859844771959]),
            {
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.79627335438133, 10.021071667811816]),
            {
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.82176506885887, 10.01802888888285]),
            {
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.82888901600242, 10.023860856746417]),
            {
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.83747208485008, 10.018536020686913]),
            {
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.84047615894676, 10.017944366838408]),
            {
              "system:index": "56"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.843222740978, 10.017183667447357]),
            {
              "system:index": "57"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.84777176746726, 10.021156189041182]),
            {
              "system:index": "58"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.84227860340476, 10.027241659642225]),
            {
              "system:index": "59"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.8373862541616, 10.027326179262728]),
            {
              "system:index": "60"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.83292305836082, 10.016422966272373]),
            {
              "system:index": "61"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.80210984119773, 10.015239649787897]),
            {
              "system:index": "62"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.77850640186668, 10.010759912575589]),
            {
              "system:index": "63"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.7780772484243, 10.00898490525566]),
            {
              "system:index": "64"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.77773392567039, 10.015915831164666]),
            {
              "system:index": "65"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.77464402088523, 10.01676105590371]),
            {
              "system:index": "66"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.77970803150535, 10.025551262602677]),
            {
              "system:index": "67"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.79301178821922, 10.02656550188451]),
            {
              "system:index": "68"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.79695999988914, 10.026734541456204]),
            {
              "system:index": "69"
            })]),
    Urbano = ui.import && ui.import("Urbano", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -84.84974873960218,
            9.977239988320653
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.84636915624341,
            9.977049789822095
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.84418047368726,
            9.977218855159638
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.84425557553968,
            9.975697263962564
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.84229219854078,
            9.975908596498316
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.84106911122998,
            9.977028656648738
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.84028590619764,
            9.977134322501838
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.83924520909986,
            9.978021914314489
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.83537209928235,
            9.977620384984586
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.83410609662732,
            9.977504152717735
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.83411682546338,
            9.976426360631446
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.83311904370984,
            9.975982562853442
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.83753932416639,
            9.975760663737686
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.83587635457715,
            9.975306298409988
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.83564032018384,
            9.976362960985902
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.84134806096753,
            9.975475364652475
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.84330070913038,
            9.97511609878232
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.84356893003186,
            9.976225595044859
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.8466373771449,
            9.975073832183314
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.84940541684827,
            9.975633864175103
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.8495556205531,
            9.976119928896962
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.83162773549756,
            9.975348564978841
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.83336580693921,
            9.975126665431215
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.83638060987195,
            9.976669392491758
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.83632696569165,
            9.977704917516231
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.8383332580348,
            9.978233245341906
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.84131587445935,
            9.978507975472523
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.83595145642957,
            9.979902755637234
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.83791483342847,
            9.97936386400908
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.83256114423475,
            9.979680859192468
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.83237875402173,
            9.97877213884109
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.830265173318,
            9.97926876539389
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.82987893521985,
            9.978349477348525
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.82844127118787,
            9.97680675824563
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.82789410054883,
            9.977514719289179
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.82711089551648,
            9.977144889085267
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.82559812963208,
            9.977852849393814
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.82379568517408,
            9.978846104545909
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.830265173318,
            9.97618332858982
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.82918156087598,
            9.976500326869006
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.83135951459607,
            9.977726050645709
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.83117712438306,
            9.977271688059624
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.83258260190686,
            9.977873982513698
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.83344090879163,
            9.97894120328453
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.83468545377454,
            9.978550241625905
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.81368912160596,
            9.981667355314817
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.8131204932948,
            9.981667355314817
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.8195685237666,
            9.97991332213083
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.8221434444209,
            9.978296644623393
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.82027662694654,
            9.97883553801767
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.81936467588147,
            9.978909503708072
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.8190642684718,
            9.979036301995393
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.8171008914729,
            9.980674108768682
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.81699360311231,
            9.980526178172774
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.81425774991712,
            9.981413760740034
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.81543792188367,
            9.98215341103096
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.81637133062085,
            9.982216809549115
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.81789482534131,
            9.98182585182373
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.81377495229444,
            9.98091713745892
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.81331361234388,
            9.980959403299567
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.81089962423047,
            9.981720187493034
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.81139315068921,
            9.981244697580458
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.80941904485425,
            9.981593390250922
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.80597508847913,
            9.98126583048021
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.80529917180738,
            9.98127639692957
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -84.81478346288404,
            9.981635656003771
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#ff5d18",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #ff5d18 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([-84.84974873960218, 9.977239988320653]),
            {
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.84636915624341, 9.977049789822095]),
            {
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.84418047368726, 9.977218855159638]),
            {
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.84425557553968, 9.975697263962564]),
            {
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.84229219854078, 9.975908596498316]),
            {
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.84106911122998, 9.977028656648738]),
            {
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.84028590619764, 9.977134322501838]),
            {
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.83924520909986, 9.978021914314489]),
            {
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.83537209928235, 9.977620384984586]),
            {
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.83410609662732, 9.977504152717735]),
            {
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.83411682546338, 9.976426360631446]),
            {
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.83311904370984, 9.975982562853442]),
            {
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.83753932416639, 9.975760663737686]),
            {
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.83587635457715, 9.975306298409988]),
            {
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.83564032018384, 9.976362960985902]),
            {
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.84134806096753, 9.975475364652475]),
            {
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.84330070913038, 9.97511609878232]),
            {
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.84356893003186, 9.976225595044859]),
            {
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.8466373771449, 9.975073832183314]),
            {
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.84940541684827, 9.975633864175103]),
            {
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.8495556205531, 9.976119928896962]),
            {
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.83162773549756, 9.975348564978841]),
            {
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.83336580693921, 9.975126665431215]),
            {
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.83638060987195, 9.976669392491758]),
            {
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.83632696569165, 9.977704917516231]),
            {
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.8383332580348, 9.978233245341906]),
            {
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.84131587445935, 9.978507975472523]),
            {
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.83595145642957, 9.979902755637234]),
            {
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.83791483342847, 9.97936386400908]),
            {
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.83256114423475, 9.979680859192468]),
            {
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.83237875402173, 9.97877213884109]),
            {
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.830265173318, 9.97926876539389]),
            {
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.82987893521985, 9.978349477348525]),
            {
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.82844127118787, 9.97680675824563]),
            {
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.82789410054883, 9.977514719289179]),
            {
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.82711089551648, 9.977144889085267]),
            {
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.82559812963208, 9.977852849393814]),
            {
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.82379568517408, 9.978846104545909]),
            {
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.830265173318, 9.97618332858982]),
            {
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.82918156087598, 9.976500326869006]),
            {
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.83135951459607, 9.977726050645709]),
            {
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.83117712438306, 9.977271688059624]),
            {
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.83258260190686, 9.977873982513698]),
            {
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.83344090879163, 9.97894120328453]),
            {
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.83468545377454, 9.978550241625905]),
            {
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.81368912160596, 9.981667355314817]),
            {
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.8131204932948, 9.981667355314817]),
            {
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.8195685237666, 9.97991332213083]),
            {
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.8221434444209, 9.978296644623393]),
            {
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.82027662694654, 9.97883553801767]),
            {
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.81936467588147, 9.978909503708072]),
            {
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.8190642684718, 9.979036301995393]),
            {
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.8171008914729, 9.980674108768682]),
            {
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.81699360311231, 9.980526178172774]),
            {
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.81425774991712, 9.981413760740034]),
            {
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.81543792188367, 9.98215341103096]),
            {
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.81637133062085, 9.982216809549115]),
            {
              "system:index": "56"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.81789482534131, 9.98182585182373]),
            {
              "system:index": "57"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.81377495229444, 9.98091713745892]),
            {
              "system:index": "58"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.81331361234388, 9.980959403299567]),
            {
              "system:index": "59"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.81089962423047, 9.981720187493034]),
            {
              "system:index": "60"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.81139315068921, 9.981244697580458]),
            {
              "system:index": "61"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.80941904485425, 9.981593390250922]),
            {
              "system:index": "62"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.80597508847913, 9.98126583048021]),
            {
              "system:index": "63"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.80529917180738, 9.98127639692957]),
            {
              "system:index": "64"
            }),
        ee.Feature(
            ee.Geometry.Point([-84.81478346288404, 9.981635656003771]),
            {
              "system:index": "65"
            })]),
    rgb = ui.import && ui.import("rgb", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "B4",
          "B3",
          "B2"
        ],
        "min": 1268.887323943662,
        "max": 3240.8169014084506,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["B4","B3","B2"],"min":1268.887323943662,"max":3240.8169014084506,"gamma":1};
// Prepare data -----------------------------------------------------------------------------
var train_points = Mangle.merge(Agua).merge(Cultivos).merge(Urbano)
var dataset = ee.ImageCollection("COPERNICUS/S2_SR")
                  .filter(ee.Filter.date('2020-01-01', '2020-12-31'))
                  .filterBounds(AOI);
var img = dataset.mean().clip(AOI);
var trueColorVis = {
  min: 0.0,
  max: 255.0, 
  bands:"B2,B3,B4"
};
Map.centerObject(AOI);
Map.addLayer(img, rgb, 'True Color');
var ndvi = img.normalizedDifference(["B8", "B4"]).rename('NDVI')
Map.addLayer(ndvi, {min:-0.1, max:0.5, palette: ["red", "orange", "yellow", "green"]}, "NDVI",false)
Map.addLayer(ndvi.gt([0, 0.2, 0.40, 0.60, 0.80]).reduce('sum'), {min:0, max: 4, palette: ["blue", "orange", "yellow", "green", "darkgreen"]}, "NDVI steps", false)
var ndviGradient = ndvi.gradient().pow(2).reduce('sum').sqrt().rename('NDVI_GRAD')
//Map.addLayer(ndviGradient, {min:0, max:0.01}, "NDVI gradient", false)
// Compute entropy and display.
var square = ee.Kernel.square({radius: 4});
// Get the NIR band.
var nir = img.select('B8');
nir = nir.divide(10000).multiply(255).toUint8();
//Map.addLayer(nir,{min:0 , max:255 },'nir',false)
var entropy = nir.entropy(square);
//Map.addLayer(entropy,
//             {min: 1, max: 5, palette: ['0000CC', 'CC0000']},
//             'entropy',false);
var glcm =nir.toByte().glcmTexture({size: 4});
// print(glcm)
var contrast = glcm.select('B8_contrast');
//Map.addLayer(contrast, {min: 0, max: 1500, palette: ['0000CC', 'CC0000']}, 'contrast',false);
var asm = glcm.select('B8_asm');
//Map.addLayer(asm, {}, 'asm',false);
var bands = ['B2', 'B3', 'B4', 'B8'];
var FullImage = img.select(bands).float().divide(255);
// Segmentation -----------------------------------------------------------------------------
var seeds = ee.Algorithms.Image.Segmentation.seedGrid(35);
var snic = ee.Algorithms.Image.Segmentation.SNIC({
  image: FullImage, 
  compactness: 0,
  connectivity: 4,
  neighborhoodSize: 128,
  size: 2,
  seeds: seeds
})
var clusters_snic = snic.select("clusters")
var vectors = clusters_snic.reduceToVectors({
  geometryType: 'polygon',
  reducer: ee.Reducer.countEvery(),
  scale: 1,
  maxPixels: 1e13,
  geometry: AOI,
});
var empty = ee.Image().byte();
var outline = empty.paint({
  featureCollection: vectors,
  color: 1,
  width: 1
});
//Map.addLayer(outline, {palette: 'FF0000'}, 'segments', false);
// Select train polygons from points -------------------------------------------------------
var FullImage = FullImage.addBands(ndvi).addBands(ndviGradient)
                         .addBands(glcm.select(['B8_contrast','B8_asm',"B8_corr"]).float())
                         .addBands(entropy);
// print(FullImage);
var train_polys = vectors.map(function(feat){
  feat = ee.Feature(feat);
  var point = feat.geometry();
  var mappedPolys = train_points.map(function(poly){
    var cls = poly.get("Class")
    var intersects = poly.intersects(point, ee.ErrorMargin(1));
    var property = ee.String(ee.Algorithms.If(intersects, 'TRUE', 'FALSE'));
    return feat.set('belongsTo',  property).set('Class', cls);
  });
  return mappedPolys;
}).flatten().filter(ee.Filter.neq('belongsTo', 'FALSE'));
//extract features from train polygons --------------------------------------------- 
var train_areas = train_polys
  .reduceToImage({
    properties: ['Class'],
    reducer: ee.Reducer.first()
}).rename('Class').toInt();
// Extract features from image -----------------------------------------------------------------------------------------
var predict_image = vectors
  .reduceToImage({
    properties: ['label'],
    reducer: ee.Reducer.first()
}).rename('id').toInt();
FullImage = FullImage.addBands(predict_image)
var FullImage_mean = FullImage.reduceConnectedComponents({
  reducer: ee.Reducer.mean(),
  labelBand: 'id'
});
var FullImage_std = FullImage.reduceConnectedComponents({
  reducer: ee.Reducer.stdDev(),
  labelBand: 'id'
});
var FullImage_median = FullImage.reduceConnectedComponents({
  reducer: ee.Reducer.median(),
  labelBand: 'id'
});
var FullImage_area = ee.Image.pixelArea().addBands(FullImage.select('id')).reduceConnectedComponents(ee.Reducer.sum(), 'id')
var FullImage_sizes = ee.Image.pixelLonLat().addBands(FullImage.select('id')).reduceConnectedComponents(ee.Reducer.minMax(), 'id')
var FullImage_width = FullImage_sizes.select('longitude_max').subtract(FullImage_sizes.select('longitude_min')).rename('width')
var FullImage_height = FullImage_sizes.select('latitude_max').subtract(FullImage_sizes.select('latitude_min')).rename('height')
// join features in an image
var Pred_bands = ee.Image.cat([
  FullImage_mean,
  FullImage_std,
  FullImage_median,
  FullImage_area,
  FullImage_width,
  FullImage_height
]).float();
var clip_Image = Pred_bands.clip(train_polys)
train_areas = train_areas.addBands(clip_Image)
var predictionBands = Pred_bands.bandNames();
var classifierTraining = train_areas.select(predictionBands).sampleRegions({collection: train_polys, properties: ['Class'], scale: 2 });
var RF = ee.Classifier.smileRandomForest(50).train({features:classifierTraining, classProperty:'Class', inputProperties: predictionBands});
var classified_RF = Pred_bands.select(predictionBands).classify(RF);
var vis_RF = {min: 0, max: 4,
palette: [ 'blue' //0
,'red' //1
,'orange' //2
,'green' //3
,'yellow']//4
}
//Map.addLayer(classified_RF,vis_RF,"OBIA_RF");