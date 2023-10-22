var imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "SAVI"
        ],
        "min": 0.08142317890896854,
        "max": 0.6167713121188749,
        "palette": [
          "ffffff",
          "ce7e45",
          "df923d",
          "f1b555",
          "fcd163",
          "99b718",
          "74a901",
          "66a000",
          "529400",
          "3e8601",
          "207401",
          "056201",
          "004c00",
          "023b01",
          "012e01",
          "011d01",
          "011301"
        ]
      }
    }) || {"opacity":1,"bands":["SAVI"],"min":0.08142317890896854,"max":0.6167713121188749,"palette":["ffffff","ce7e45","df923d","f1b555","fcd163","99b718","74a901","66a000","529400","3e8601","207401","056201","004c00","023b01","012e01","011d01","011301"]},
    Awan = ui.import && ui.import("Awan", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                96.84534465634577,
                4.625049409291977
              ],
              [
                96.84534465634577,
                4.624621653163921
              ],
              [
                96.84568797909968,
                4.624621653163921
              ],
              [
                96.84568797909968,
                4.625049409291977
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
                96.85045158231013,
                4.623466710327877
              ],
              [
                96.85045158231013,
                4.623124504681541
              ],
              [
                96.85062324368708,
                4.623124504681541
              ],
              [
                96.85062324368708,
                4.623466710327877
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        },
        {
          "type": "Point",
          "coordinates": [
            96.85214673840754,
            4.629904423233008
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.85216819607966,
            4.629604996024073
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.85214673840754,
            4.629305568688436
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.8521038230633,
            4.629006141226086
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.85088073575251,
            4.625263287259139
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.8470612701153,
            4.624771367838137
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.84684669339411,
            4.6247285922201575
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.84590255582087,
            4.623637813089069
          ]
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
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        }
      ],
      "properties": {
        "lc": 0
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
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      }
    ] */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[96.84534465634577, 4.625049409291977],
                  [96.84534465634577, 4.624621653163921],
                  [96.84568797909968, 4.624621653163921],
                  [96.84568797909968, 4.625049409291977]]], null, false),
            {
              "lc": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[96.85045158231013, 4.623466710327877],
                  [96.85045158231013, 4.623124504681541],
                  [96.85062324368708, 4.623124504681541],
                  [96.85062324368708, 4.623466710327877]]], null, false),
            {
              "lc": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([96.85214673840754, 4.629904423233008]),
            {
              "lc": 0,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([96.85216819607966, 4.629604996024073]),
            {
              "lc": 0,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([96.85214673840754, 4.629305568688436]),
            {
              "lc": 0,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([96.8521038230633, 4.629006141226086]),
            {
              "lc": 0,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([96.85088073575251, 4.625263287259139]),
            {
              "lc": 0,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([96.8470612701153, 4.624771367838137]),
            {
              "lc": 0,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([96.84684669339411, 4.6247285922201575]),
            {
              "lc": 0,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([96.84590255582087, 4.623637813089069]),
            {
              "lc": 0,
              "system:index": "9"
            })]),
    Pertanian = ui.import && ui.import("Pertanian", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                96.84595625930002,
                4.634675746230649
              ],
              [
                96.84595625930002,
                4.633435269623393
              ],
              [
                96.84629958205393,
                4.633435269623393
              ],
              [
                96.84629958205393,
                4.634675746230649
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
                96.84685748152903,
                4.634975171292443
              ],
              [
                96.84685748152903,
                4.6346329712114676
              ],
              [
                96.84737246565989,
                4.6346329712114676
              ],
              [
                96.84737246565989,
                4.634975171292443
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
                96.83960478835276,
                4.632579767246718
              ],
              [
                96.83960478835276,
                4.632408666647159
              ],
              [
                96.83977644972971,
                4.632408666647159
              ],
              [
                96.83977644972971,
                4.632579767246718
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
                96.83861773543528,
                4.628601667601272
              ],
              [
                96.83861773543528,
                4.6275322821618055
              ],
              [
                96.83913271956614,
                4.6275322821618055
              ],
              [
                96.83913271956614,
                4.628601667601272
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
                96.84269469313791,
                4.624324116151609
              ],
              [
                96.84269469313791,
                4.623040845678603
              ],
              [
                96.84320967726877,
                4.623040845678603
              ],
              [
                96.84320967726877,
                4.624324116151609
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
                96.83175128035715,
                4.631039860360438
              ],
              [
                96.83175128035715,
                4.630355456223709
              ],
              [
                96.83209460311106,
                4.630355456223709
              ],
              [
                96.83209460311106,
                4.631039860360438
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
                96.82814639144114,
                4.617822188484523
              ],
              [
                96.82814639144114,
                4.616838338973209
              ],
              [
                96.828661375572,
                4.616838338973209
              ],
              [
                96.828661375572,
                4.617822188484523
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
                96.85535471968821,
                4.6309115346352945
              ],
              [
                96.85535471968821,
                4.629842152686653
              ],
              [
                96.85569804244211,
                4.629842152686653
              ],
              [
                96.85569804244211,
                4.6309115346352945
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
                96.83218043379954,
                4.629927703302032
              ],
              [
                96.83218043379954,
                4.628943870600687
              ],
              [
                96.8324808412092,
                4.628943870600687
              ],
              [
                96.8324808412092,
                4.629927703302032
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
                96.82887595229319,
                4.625735710986815
              ],
              [
                96.82887595229319,
                4.625222404099553
              ],
              [
                96.82947676711252,
                4.625222404099553
              ],
              [
                96.82947676711252,
                4.625735710986815
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
        "lc": 1
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
            ee.Geometry.Polygon(
                [[[96.84595625930002, 4.634675746230649],
                  [96.84595625930002, 4.633435269623393],
                  [96.84629958205393, 4.633435269623393],
                  [96.84629958205393, 4.634675746230649]]], null, false),
            {
              "lc": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[96.84685748152903, 4.634975171292443],
                  [96.84685748152903, 4.6346329712114676],
                  [96.84737246565989, 4.6346329712114676],
                  [96.84737246565989, 4.634975171292443]]], null, false),
            {
              "lc": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[96.83960478835276, 4.632579767246718],
                  [96.83960478835276, 4.632408666647159],
                  [96.83977644972971, 4.632408666647159],
                  [96.83977644972971, 4.632579767246718]]], null, false),
            {
              "lc": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[96.83861773543528, 4.628601667601272],
                  [96.83861773543528, 4.6275322821618055],
                  [96.83913271956614, 4.6275322821618055],
                  [96.83913271956614, 4.628601667601272]]], null, false),
            {
              "lc": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[96.84269469313791, 4.624324116151609],
                  [96.84269469313791, 4.623040845678603],
                  [96.84320967726877, 4.623040845678603],
                  [96.84320967726877, 4.624324116151609]]], null, false),
            {
              "lc": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[96.83175128035715, 4.631039860360438],
                  [96.83175128035715, 4.630355456223709],
                  [96.83209460311106, 4.630355456223709],
                  [96.83209460311106, 4.631039860360438]]], null, false),
            {
              "lc": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[96.82814639144114, 4.617822188484523],
                  [96.82814639144114, 4.616838338973209],
                  [96.828661375572, 4.616838338973209],
                  [96.828661375572, 4.617822188484523]]], null, false),
            {
              "lc": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[96.85535471968821, 4.6309115346352945],
                  [96.85535471968821, 4.629842152686653],
                  [96.85569804244211, 4.629842152686653],
                  [96.85569804244211, 4.6309115346352945]]], null, false),
            {
              "lc": 1,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[96.83218043379954, 4.629927703302032],
                  [96.83218043379954, 4.628943870600687],
                  [96.8324808412092, 4.628943870600687],
                  [96.8324808412092, 4.629927703302032]]], null, false),
            {
              "lc": 1,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[96.82887595229319, 4.625735710986815],
                  [96.82887595229319, 4.625222404099553],
                  [96.82947676711252, 4.625222404099553],
                  [96.82947676711252, 4.625735710986815]]], null, false),
            {
              "lc": 1,
              "system:index": "9"
            })]),
    Hutan = ui.import && ui.import("Hutan", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                96.83101093137019,
                4.629284181016751
              ],
              [
                96.83101093137019,
                4.6285142244057464
              ],
              [
                96.831697576878,
                4.6285142244057464
              ],
              [
                96.831697576878,
                4.629284181016751
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
                96.82066833340876,
                4.630824091725192
              ],
              [
                96.82066833340876,
                4.628728101326176
              ],
              [
                96.82221328580134,
                4.628728101326176
              ],
              [
                96.82221328580134,
                4.630824091725192
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
                96.82041084134333,
                4.626247125076063
              ],
              [
                96.82041084134333,
                4.624578877536909
              ],
              [
                96.82165538632624,
                4.624578877536909
              ],
              [
                96.82165538632624,
                4.626247125076063
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
                96.82350074612849,
                4.6252205116708796
              ],
              [
                96.82350074612849,
                4.624193896777526
              ],
              [
                96.82435905301325,
                4.624193896777526
              ],
              [
                96.82435905301325,
                4.6252205116708796
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
                96.82195579373591,
                4.63681260149091
              ],
              [
                96.82195579373591,
                4.63540102875925
              ],
              [
                96.82259952389948,
                4.63540102875925
              ],
              [
                96.82259952389948,
                4.63681260149091
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
                96.81732093655818,
                4.634160553424877
              ],
              [
                96.81732093655818,
                4.632962851036397
              ],
              [
                96.81856548154109,
                4.632962851036397
              ],
              [
                96.81856548154109,
                4.634160553424877
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
        },
        {
          "type": "rectangle"
        },
        {
          "type": "rectangle"
        }
      ],
      "properties": {
        "lc": 2
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
            ee.Geometry.Polygon(
                [[[96.83101093137019, 4.629284181016751],
                  [96.83101093137019, 4.6285142244057464],
                  [96.831697576878, 4.6285142244057464],
                  [96.831697576878, 4.629284181016751]]], null, false),
            {
              "lc": 2,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[96.82066833340876, 4.630824091725192],
                  [96.82066833340876, 4.628728101326176],
                  [96.82221328580134, 4.628728101326176],
                  [96.82221328580134, 4.630824091725192]]], null, false),
            {
              "lc": 2,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[96.82041084134333, 4.626247125076063],
                  [96.82041084134333, 4.624578877536909],
                  [96.82165538632624, 4.624578877536909],
                  [96.82165538632624, 4.626247125076063]]], null, false),
            {
              "lc": 2,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[96.82350074612849, 4.6252205116708796],
                  [96.82350074612849, 4.624193896777526],
                  [96.82435905301325, 4.624193896777526],
                  [96.82435905301325, 4.6252205116708796]]], null, false),
            {
              "lc": 2,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[96.82195579373591, 4.63681260149091],
                  [96.82195579373591, 4.63540102875925],
                  [96.82259952389948, 4.63540102875925],
                  [96.82259952389948, 4.63681260149091]]], null, false),
            {
              "lc": 2,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[96.81732093655818, 4.634160553424877],
                  [96.81732093655818, 4.632962851036397],
                  [96.81856548154109, 4.632962851036397],
                  [96.81856548154109, 4.634160553424877]]], null, false),
            {
              "lc": 2,
              "system:index": "5"
            })]),
    Lahan_Terbangun = ui.import && ui.import("Lahan_Terbangun", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                96.84276973569148,
                4.632150123260101
              ],
              [
                96.84276973569148,
                4.631294619328606
              ],
              [
                96.8432418044781,
                4.631294619328606
              ],
              [
                96.8432418044781,
                4.632150123260101
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
                96.84585964047663,
                4.6306102154383435
              ],
              [
                96.84585964047663,
                4.630139687379691
              ],
              [
                96.84680377804987,
                4.630139687379691
              ],
              [
                96.84680377804987,
                4.6306102154383435
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
                96.84517299496882,
                4.629968586189858
              ],
              [
                96.84517299496882,
                4.629241405671448
              ],
              [
                96.8456021484112,
                4.629241405671448
              ],
              [
                96.8456021484112,
                4.629968586189858
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
                96.83491622769587,
                4.625819369671443
              ],
              [
                96.83491622769587,
                4.625519940734447
              ],
              [
                96.83525955044978,
                4.625519940734447
              ],
              [
                96.83525955044978,
                4.625819369671443
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
                96.83568870389216,
                4.6260760229452185
              ],
              [
                96.83568870389216,
                4.625605491872228
              ],
              [
                96.83624660336726,
                4.625605491872228
              ],
              [
                96.83624660336726,
                4.6260760229452185
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
                96.84924995267146,
                4.625134960486587
              ],
              [
                96.84924995267146,
                4.624108345469256
              ],
              [
                96.84980785214655,
                4.624108345469256
              ],
              [
                96.84980785214655,
                4.625134960486587
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
                96.84791957700007,
                4.624621653163921
              ],
              [
                96.84791957700007,
                4.624151121124689
              ],
              [
                96.84882079922907,
                4.624151121124689
              ],
              [
                96.84882079922907,
                4.624621653163921
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
                96.84199725949519,
                4.622482868649187
              ],
              [
                96.84199725949519,
                4.621499025604575
              ],
              [
                96.84225475156062,
                4.621499025604575
              ],
              [
                96.84225475156062,
                4.622482868649187
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
                96.84105312192195,
                4.622782298869918
              ],
              [
                96.84105312192195,
                4.621499025604575
              ],
              [
                96.84165393674128,
                4.621499025604575
              ],
              [
                96.84165393674128,
                4.622782298869918
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        },
        {
          "type": "Point",
          "coordinates": [
            96.84259807431452,
            4.633091176389351
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.84276973569148,
            4.632107348088113
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.84307014310114,
            4.631594045822338
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.84362804257624,
            4.6306102154383435
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.8441430267071,
            4.629883035579428
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.84474384152644,
            4.629241405671448
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.83474456631892,
            4.625605491872228
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.83444415890925,
            4.62479275564614
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.83457290494196,
            4.623980018487475
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.8355170425152,
            4.6232528318182915
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.83581744992487,
            4.6226967473911955
          ]
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
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        },
        {
          "type": "marker"
        }
      ],
      "properties": {
        "lc": 3
      },
      "color": "#ffc82d",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #ffc82d */
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
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      },
      {
        "type": "marker"
      }
    ] */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[96.84276973569148, 4.632150123260101],
                  [96.84276973569148, 4.631294619328606],
                  [96.8432418044781, 4.631294619328606],
                  [96.8432418044781, 4.632150123260101]]], null, false),
            {
              "lc": 3,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[96.84585964047663, 4.6306102154383435],
                  [96.84585964047663, 4.630139687379691],
                  [96.84680377804987, 4.630139687379691],
                  [96.84680377804987, 4.6306102154383435]]], null, false),
            {
              "lc": 3,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[96.84517299496882, 4.629968586189858],
                  [96.84517299496882, 4.629241405671448],
                  [96.8456021484112, 4.629241405671448],
                  [96.8456021484112, 4.629968586189858]]], null, false),
            {
              "lc": 3,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[96.83491622769587, 4.625819369671443],
                  [96.83491622769587, 4.625519940734447],
                  [96.83525955044978, 4.625519940734447],
                  [96.83525955044978, 4.625819369671443]]], null, false),
            {
              "lc": 3,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[96.83568870389216, 4.6260760229452185],
                  [96.83568870389216, 4.625605491872228],
                  [96.83624660336726, 4.625605491872228],
                  [96.83624660336726, 4.6260760229452185]]], null, false),
            {
              "lc": 3,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[96.84924995267146, 4.625134960486587],
                  [96.84924995267146, 4.624108345469256],
                  [96.84980785214655, 4.624108345469256],
                  [96.84980785214655, 4.625134960486587]]], null, false),
            {
              "lc": 3,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[96.84791957700007, 4.624621653163921],
                  [96.84791957700007, 4.624151121124689],
                  [96.84882079922907, 4.624151121124689],
                  [96.84882079922907, 4.624621653163921]]], null, false),
            {
              "lc": 3,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[96.84199725949519, 4.622482868649187],
                  [96.84199725949519, 4.621499025604575],
                  [96.84225475156062, 4.621499025604575],
                  [96.84225475156062, 4.622482868649187]]], null, false),
            {
              "lc": 3,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[96.84105312192195, 4.622782298869918],
                  [96.84105312192195, 4.621499025604575],
                  [96.84165393674128, 4.621499025604575],
                  [96.84165393674128, 4.622782298869918]]], null, false),
            {
              "lc": 3,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([96.84259807431452, 4.633091176389351]),
            {
              "lc": 3,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([96.84276973569148, 4.632107348088113]),
            {
              "lc": 3,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([96.84307014310114, 4.631594045822338]),
            {
              "lc": 3,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([96.84362804257624, 4.6306102154383435]),
            {
              "lc": 3,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([96.8441430267071, 4.629883035579428]),
            {
              "lc": 3,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([96.84474384152644, 4.629241405671448]),
            {
              "lc": 3,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([96.83474456631892, 4.625605491872228]),
            {
              "lc": 3,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([96.83444415890925, 4.62479275564614]),
            {
              "lc": 3,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([96.83457290494196, 4.623980018487475]),
            {
              "lc": 3,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([96.8355170425152, 4.6232528318182915]),
            {
              "lc": 3,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([96.83581744992487, 4.6226967473911955]),
            {
              "lc": 3,
              "system:index": "19"
            })]);
//  Mulailah dengan Menyiapkan Peta                                           //
//   Pusatkan peta ke wilayah yang diminati menggunakan shapefile wilayah.    //
var AOI = ee.FeatureCollection('users/fauzifahmi804/Bebesan');
Map.centerObject(AOI,13)
var GRAYMAP = [
  {   // Dial down the map saturation.
    stylers: [ { saturation: -100 } ]
  },{ // Dial down the label darkness.
    elementType: 'labels',
    stylers: [ { lightness: 20 } ]
  },{ // Simplify the road geometries.
    featureType: 'road',
    elementType: 'geometry',
    stylers: [ { visibility: 'simplified' } ]
  },{ // Turn off road labels.
    featureType: 'road',
    elementType: 'labels',
    stylers: [ { visibility: 'off' } ]
  },{ // Turn off all icons.
    elementType: 'labels.icon',
    stylers: [ { visibility: 'off' } ]
  },{ // Turn off all POIs.
    featureType: 'poi',
    elementType: 'all',
    stylers: [ { visibility: 'off' }]
  }
];
Map.setOptions('Gray', {'Gray': GRAYMAP});
var title = ui.Label('DEVELOPED BY FAUZI FAHMI');
title.style().set('position', 'top-center');
Map.add(title);
var savi = function(image) {
  return image.expression('1.5 * (NIR - RED) / (NIR + RED + 5000)', {
    'NIR': image.select('B5'),
    'RED': image.select('B4')
  }).rename('SAVI')
}
var image = ee.ImageCollection("LANDSAT/LC08/C01/T1_SR")
  .filterBounds(AOI)
  .filterDate('2021-01-01', '2021-12-01')
  .filterMetadata('CLOUD_COVER', 'less_than', 50)
  .map(function (image) {
    return image // Add indexes to each image in the collection
      .addBands(savi(image))
  })
  .median()
  .clip(AOI)
var colorizedVis = {
  min: 0.0,
  max: 1.0,
  palette: [
    'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
    '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
    '012E01', '011D01', '011301'
  ],
};
Map.addLayer(image.select(['SAVI']), imageVisParam, "SAVI")
////////////////////////////////////////////////// //////////////
// 3) Membangun Model Random Forest //
////////////////////////////////////////////////// //////////////
//3.1) Siapkan data pelatihan dan prediktor
/////////////////////////////////////////////
//Setelah menggambar poligon pelatihan, gabungkan menjadi satu
var kelas = Awan.merge(Pertanian).merge(Hutan).merge(Lahan_Terbangun);
//Tentukan bands yang ingin Anda sertakan dalam model
var bands = (['SAVI', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7'])
//Buat variabel yang disebut gambar untuk memilih bands yang diminati dan klip ke geometri
var samples = image.select(bands).sampleRegions({
  collection: kelas, // Kumpulan geometri yang dipilih untuk training
    properties: ['lc'], // Beri label dari setiap geometri
    scale: 30 // Buat setiap sampel berukuran sama dengan piksel Landsat
    }).randomColumn('random'); // membuat kolom dengan nomor acak
//.smileRandomForest digunakan untuk menjalankan model. Di sini kami menjalankan model menggunakan 100 pohon
var classifier = ee.Classifier.smileRandomForest(100,4)
  .train({
    features: samples.select(['SAVI', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'lc']),
    classProperty: 'lc',
    inputProperties: bands
  });
//Klasifikasi komposit Landsat menggunakan model Random Forest (RF)
var classified = image.select(bands).classify(classifier);
// Tambahkan klasifikasi ke Layer
Map.addLayer(classified, {
    min: 0,
    max: 3,
    palette: ['white', 'Chartreuse', 'darkgreen', 'red']
  },
  'KETERANGAN');
var panel = ui.Panel({
  style: {
    position: 'bottom-left',
    backgroundColor: 'yellow',
    padding: '5px;',
  }
})
var title = ui.Label({
  value: 'Klasifikasi',
  style: {
    fontSize: '14px',
    backgroundColor: 'yellow',
    fontFamily: ('Times'),
    fontWeight: 'bold',
    margin: '0px;'
  }
})
panel.add(title)
var color = ['white','Chartreuse','darkgreen','red']
var lc_class = ['Awan', 'Pertanian', 'Hutan', 'Lahan Terbangun']
var list_legend = function(color, description) {
  var c = ui.Label({
    style: {
      backgroundColor: color,
      color: 'yellow',
      padding: '10px',
      margin: '4px'
    }
  })
  var ds = ui.Label({
    value: description,
    style: {
      margin: '5px',
      fontFamily: ('Times'),
      backgroundColor: 'yellow'
    }
  })
  return ui.Panel({
    widgets: [c, ds],
    layout: ui.Panel.Layout.Flow('horizontal'),
    style: {backgroundColor: 'yellow'}
  })
}
for(var a = 0; a < 4; a++){
  panel.add(list_legend(color[a], lc_class[a]))
}
Map.add(panel)
Map.setControlVisibility({
  drawingToolsControl:false
})
Map.setControlVisibility({
  zoomControl:false
})
Map.setControlVisibility({
  mapTypeControl:false
})