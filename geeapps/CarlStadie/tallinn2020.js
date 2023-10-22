var aoi = ui.import && ui.import("aoi", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                24.395965272502313,
                59.567805554048206
              ],
              [
                24.395965272502313,
                59.296128737552294
              ],
              [
                25.143035585002313,
                59.296128737552294
              ],
              [
                25.143035585002313,
                59.567805554048206
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
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[24.395965272502313, 59.567805554048206],
          [24.395965272502313, 59.296128737552294],
          [25.143035585002313, 59.296128737552294],
          [25.143035585002313, 59.567805554048206]]], null, false),
    lparam1 = ui.import && ui.import("lparam1", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "SR_B5",
          "SR_B4",
          "SR_B3"
        ],
        "min": 1381,
        "max": 21241,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["SR_B5","SR_B4","SR_B3"],"min":1381,"max":21241,"gamma":1},
    lparam2 = ui.import && ui.import("lparam2", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "SR_B5",
          "SR_B4",
          "SR_B3"
        ],
        "min": 7231.5,
        "max": 20068.5,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["SR_B5","SR_B4","SR_B3"],"min":7231.5,"max":20068.5,"gamma":1},
    nonurban = ui.import && ui.import("nonurban", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            24.52379877319493,
            59.40436855520026
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            24.48088342895665,
            59.417297067309846
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            24.720866033937117,
            59.35085499501365
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            24.643961737062117,
            59.43030794978501
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            24.563624212648055,
            59.39816461185472
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            24.86385996093907,
            59.39938801453899
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            24.871756384278914,
            59.39746550477585
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            24.84017069091954,
            59.36292915219343
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            24.7527950500504,
            59.38077004004047
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            24.68035394897618,
            59.36590328512566
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            24.58096201172032,
            59.36843983957973
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            24.64567835083165,
            59.359254863368776
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            24.827296087648055,
            59.45099281082822
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            24.85184366455235,
            59.46573505139059
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            24.841028997804305,
            59.4628568941253
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            24.7447269653336,
            59.405416996789306
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            24.70610315551915,
            59.42297357055333
          ]
        }
      ],
      "displayProperties": [],
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
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([24.52379877319493, 59.40436855520026]),
            {
              "lc": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([24.48088342895665, 59.417297067309846]),
            {
              "lc": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([24.720866033937117, 59.35085499501365]),
            {
              "lc": 0,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([24.643961737062117, 59.43030794978501]),
            {
              "lc": 0,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([24.563624212648055, 59.39816461185472]),
            {
              "lc": 0,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([24.86385996093907, 59.39938801453899]),
            {
              "lc": 0,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([24.871756384278914, 59.39746550477585]),
            {
              "lc": 0,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([24.84017069091954, 59.36292915219343]),
            {
              "lc": 0,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([24.7527950500504, 59.38077004004047]),
            {
              "lc": 0,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([24.68035394897618, 59.36590328512566]),
            {
              "lc": 0,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([24.58096201172032, 59.36843983957973]),
            {
              "lc": 0,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([24.64567835083165, 59.359254863368776]),
            {
              "lc": 0,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([24.827296087648055, 59.45099281082822]),
            {
              "lc": 0,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([24.85184366455235, 59.46573505139059]),
            {
              "lc": 0,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([24.841028997804305, 59.4628568941253]),
            {
              "lc": 0,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([24.7447269653336, 59.405416996789306]),
            {
              "lc": 0,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([24.70610315551915, 59.42297357055333]),
            {
              "lc": 0,
              "system:index": "16"
            })]),
    urban = ui.import && ui.import("urban", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            24.743696997071883,
            59.43833901799938
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            24.75871736755528,
            59.443488373882516
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            24.731423208619734,
            59.440346487241605
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            24.706961462403914,
            59.44916048569585
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            24.731852362062117,
            59.45212705758601
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            24.73828966369786,
            59.45286865989572
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            24.77493936767735,
            59.44427379994776
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            24.80498010864415,
            59.4156812731677
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            24.812361547853133,
            59.415637601985686
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            24.812104055787703,
            59.41795209702573
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            24.7612064575211,
            59.41974244692983
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            24.758202383424422,
            59.44680449321075
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            24.76944620361485,
            59.443226561141294
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            24.7612064575211,
            59.43331982373419
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            24.75871736755528,
            59.43838265990173
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            24.772364447023055,
            59.43916820451706
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            24.731423208619734,
            59.43894999950904
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            24.747387716676375,
            59.44462287234496
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            24.72078020324864,
            59.44767710215678
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            24.711510488893172,
            59.45771048694543
          ]
        }
      ],
      "displayProperties": [],
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
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([24.743696997071883, 59.43833901799938]),
            {
              "lc": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([24.75871736755528, 59.443488373882516]),
            {
              "lc": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([24.731423208619734, 59.440346487241605]),
            {
              "lc": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([24.706961462403914, 59.44916048569585]),
            {
              "lc": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([24.731852362062117, 59.45212705758601]),
            {
              "lc": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([24.73828966369786, 59.45286865989572]),
            {
              "lc": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([24.77493936767735, 59.44427379994776]),
            {
              "lc": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([24.80498010864415, 59.4156812731677]),
            {
              "lc": 1,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([24.812361547853133, 59.415637601985686]),
            {
              "lc": 1,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([24.812104055787703, 59.41795209702573]),
            {
              "lc": 1,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([24.7612064575211, 59.41974244692983]),
            {
              "lc": 1,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([24.758202383424422, 59.44680449321075]),
            {
              "lc": 1,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([24.76944620361485, 59.443226561141294]),
            {
              "lc": 1,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([24.7612064575211, 59.43331982373419]),
            {
              "lc": 1,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([24.75871736755528, 59.43838265990173]),
            {
              "lc": 1,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([24.772364447023055, 59.43916820451706]),
            {
              "lc": 1,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([24.731423208619734, 59.43894999950904]),
            {
              "lc": 1,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([24.747387716676375, 59.44462287234496]),
            {
              "lc": 1,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([24.72078020324864, 59.44767710215678]),
            {
              "lc": 1,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([24.711510488893172, 59.45771048694543]),
            {
              "lc": 1,
              "system:index": "19"
            })]),
    water = ui.import && ui.import("water", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            24.518900112475706,
            59.48090253945934
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            24.650049404467893,
            59.50843830117715
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            24.747553066577268,
            59.49031602253394
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            24.766779140796018,
            59.39693695712701
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            24.615717129077268,
            59.41458527103797
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            25.0019552272218,
            59.44322235901497
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            24.67133541521008,
            59.434494106928845
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            24.677171902026487,
            59.43746196528914
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            24.927454189624143,
            59.498855616109815
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            24.9525167506593,
            59.51505747595966
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            25.12989209527249,
            59.48743757962203
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            25.100709661190457,
            59.5135746064186
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            25.052301152889676,
            59.437197723102415
          ]
        }
      ],
      "displayProperties": [],
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
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([24.518900112475706, 59.48090253945934]),
            {
              "lc": 2,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([24.650049404467893, 59.50843830117715]),
            {
              "lc": 2,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([24.747553066577268, 59.49031602253394]),
            {
              "lc": 2,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([24.766779140796018, 59.39693695712701]),
            {
              "lc": 2,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([24.615717129077268, 59.41458527103797]),
            {
              "lc": 2,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([25.0019552272218, 59.44322235901497]),
            {
              "lc": 2,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([24.67133541521008, 59.434494106928845]),
            {
              "lc": 2,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([24.677171902026487, 59.43746196528914]),
            {
              "lc": 2,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([24.927454189624143, 59.498855616109815]),
            {
              "lc": 2,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([24.9525167506593, 59.51505747595966]),
            {
              "lc": 2,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([25.12989209527249, 59.48743757962203]),
            {
              "lc": 2,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([25.100709661190457, 59.5135746064186]),
            {
              "lc": 2,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([25.052301152889676, 59.437197723102415]),
            {
              "lc": 2,
              "system:index": "12"
            })]),
    valwater = ui.import && ui.import("valwater", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            24.75621996618282,
            59.403590600320626
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            24.640176875362506,
            59.48841124707298
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            24.900072200069538,
            59.428919439018934
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            24.778364283809772,
            59.41337501809069
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            25.02881823278438,
            59.44873258958666
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            25.048215968380084,
            59.43633981912318
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            25.06278864416305,
            59.393798750491236
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            24.999149109347574,
            59.339697861754544
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            25.1103856816132,
            59.31964569519167
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "lc": 2
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
            ee.Geometry.Point([24.75621996618282, 59.403590600320626]),
            {
              "lc": 2,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([24.640176875362506, 59.48841124707298]),
            {
              "lc": 2,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([24.900072200069538, 59.428919439018934]),
            {
              "lc": 2,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([24.778364283809772, 59.41337501809069]),
            {
              "lc": 2,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([25.02881823278438, 59.44873258958666]),
            {
              "lc": 2,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([25.048215968380084, 59.43633981912318]),
            {
              "lc": 2,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([25.06278864416305, 59.393798750491236]),
            {
              "lc": 2,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([24.999149109347574, 59.339697861754544]),
            {
              "lc": 2,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([25.1103856816132, 59.31964569519167]),
            {
              "lc": 2,
              "system:index": "8"
            })]),
    valnonurban = ui.import && ui.import("valnonurban", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            25.08686807297062,
            59.393928206141645
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            25.017516876681558,
            59.414547955107146
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            24.635741974337808,
            59.377843083586974
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            24.700973297579996,
            59.32919165196728
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            24.48536660812687,
            59.4389957900461
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            24.424255157931558,
            59.37644401660586
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            24.574630524142496,
            59.4323616950507
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            24.725692535861246,
            59.413150402577955
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            24.951427246554605,
            59.4190896025366
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "lc": 0
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
            ee.Geometry.Point([25.08686807297062, 59.393928206141645]),
            {
              "lc": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([25.017516876681558, 59.414547955107146]),
            {
              "lc": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([24.635741974337808, 59.377843083586974]),
            {
              "lc": 0,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([24.700973297579996, 59.32919165196728]),
            {
              "lc": 0,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([24.48536660812687, 59.4389957900461]),
            {
              "lc": 0,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([24.424255157931558, 59.37644401660586]),
            {
              "lc": 0,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([24.574630524142496, 59.4323616950507]),
            {
              "lc": 0,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([24.725692535861246, 59.413150402577955]),
            {
              "lc": 0,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([24.951427246554605, 59.4190896025366]),
            {
              "lc": 0,
              "system:index": "8"
            })]),
    valurban = ui.import && ui.import("valurban", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            24.841392303927652,
            59.43166329359583
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            24.783370758517496,
            59.4259882474494
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            24.845855499728433,
            59.41323775130069
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            24.865253235324136,
            59.35938824929887
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            24.569652344210855,
            59.320171230437104
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            24.847041003920086,
            59.34223652857413
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            24.99420570142936,
            59.49494574907914
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            24.399495383696394,
            59.30722132777064
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            24.5414051300622,
            59.407746031237494
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "lc": 1
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
            ee.Geometry.Point([24.841392303927652, 59.43166329359583]),
            {
              "lc": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([24.783370758517496, 59.4259882474494]),
            {
              "lc": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([24.845855499728433, 59.41323775130069]),
            {
              "lc": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([24.865253235324136, 59.35938824929887]),
            {
              "lc": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([24.569652344210855, 59.320171230437104]),
            {
              "lc": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([24.847041003920086, 59.34223652857413]),
            {
              "lc": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([24.99420570142936, 59.49494574907914]),
            {
              "lc": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([24.399495383696394, 59.30722132777064]),
            {
              "lc": 1,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([24.5414051300622, 59.407746031237494]),
            {
              "lc": 1,
              "system:index": "8"
            })]),
    imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "B4",
          "B3",
          "B2"
        ],
        "min": 0.02899700030684471,
        "max": 0.4825611114501953,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["B4","B3","B2"],"min":0.02899700030684471,"max":0.4825611114501953,"gamma":1},
    watermask = ui.import && ui.import("watermask", "image", {
      "id": "users/CarlStadie/water_and_tallin"
    }) || ee.Image("users/CarlStadie/water_and_tallin"),
    imageVisParam2 = ui.import && ui.import("imageVisParam2", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "B4",
          "B3",
          "B2"
        ],
        "min": 0.055380117148160934,
        "max": 0.13906514644622803,
        "gamma": 1.77
      }
    }) || {"opacity":1,"bands":["B4","B3","B2"],"min":0.055380117148160934,"max":0.13906514644622803,"gamma":1.77},
    lol = ui.import && ui.import("lol", "image", {
      "id": "users/CarlStadie/imageToDriveExample_transform"
    }) || ee.Image("users/CarlStadie/imageToDriveExample_transform");
// PARAMETERS
Map.setCenter(24.7516, 59.4329, 9);
var start = '2020-01-01';
var end   = '2020-12-31';
// CALCULATE NDVI
var addndvi = function ndvi(img) {
var nd = img.normalizedDifference(['B5', 'B4']).rename('NDVI') // for landsat 8
// var nd = img.normalizedDifference(['B4', 'B3']).rename('NDVI') // for landsat 7 and 5
  return img.addBands(nd);
};
//  CLOUDMASK 
var cloudmask = function cloudmask(img) {
  var qa = img.select('QA_PIXEL');
  var cloud = qa.bitwiseAnd(1 << 3) // for landsat 7 and 8
  // var cloud = qa.bitwiseAnd(1 << 4) // for landsat 5
  var mask2 = img.mask().reduce(ee.Reducer.min());
  return img.updateMask(cloud.not()).updateMask(mask2);
};
// BUILD IMAGE COLLECTION
var landsat = ee.ImageCollection('LANDSAT/LC08/C02/T1_TOA') // for landsat 8
// var landsat = ee.ImageCollection('LANDSAT/LE07/C02/T1_TOA') // for landsat 7 
// var landsat = ee.ImageCollection('LANDSAT/LT05/C02/T1_TOA') // for landsat 5
  .filterBounds(aoi)
  .filterDate(start, end)
  .map(addndvi)
  .map(cloudmask);
print(landsat, 'REPORT Landsat');
// MAKE COMPOSITE
// var comp = landsat.qualityMosaic('NDVI');
var comppre = landsat.median();
// MASK WATER
var datamask = watermask.select('cluster')
var mask = datamask.eq(0)
var comp = comppre.updateMask(mask)
// Map.addLayer(comp1.clip(aoi), lparam1, 'Quality Composite');
//Map.addLayer(sat, imageVisParam2, 'composite');
var input = comp
//UNSUPRVISED CLASSIFICATION
print(input, 'REPORT input')
var training = input.sample({
  region: aoi,
  scale: 30,
  numPixels: 500,
  tileScale: 4,
  geometries: true
});
print(training,'REPORT Training');
//initiate clusterer
var clusterer = ee.Clusterer.wekaKMeans(2).train(training);
//cluster input
var result = input.cluster(clusterer);
print(result, 'REPORT Result');
//Display result
var palette = [
    'D0F5A9', '21610B'];
//Map.addLayer(result.clip(aoi), {min: 0, max: 1, palette: palette}, 'RESULT unsuperviesed');
// SUPERVISED CLASSIFICATION
var newfc = nonurban.merge(urban)
print(newfc, 'REPORT newfc')
var bands = ['B1', 'B2', 'B3', 'B4','B5', 'B6', 'B7', 'NDVI']; // for landsat 8
// var bands = ['B1', 'B2', 'B3', 'B4','B5', 'B7', 'NDVI']; // for landsat 7 and 5
var training = input.select(bands).sampleRegions({
    collection: newfc,
    properties: ['lc'],
    scale: 30
});
var classifier = ee.Classifier.smileRandomForest(100).train({
  features: training,
  classProperty: 'lc',
  inputProperties: bands
});
var classified = input.select(bands).classify(classifier);
var palette = [
   '95D784', 'ff1c1c'];
Map.addLayer(lol.clip(aoi), {min: 0, max: 1, palette: palette}, 'Result supervised');
//Export.image.toAsset({
//  image: comp,
//  description: 'imageToDriveExample_transform',
//  region: aoi
//});
// ADD CHART
var chart = ui.Chart.image.histogram(classified, aoi, 100);
print(chart);
// ACCURACY ASSESMENT
var valfc = valurban.merge(valnonurban);
var validation = classified.sampleRegions({
  collection: valfc,
  properties: ['lc'],
  scale: 30
})
print(validation, 'REPORT validation')
var Accuracy2 = validation.errorMatrix('lc', 'classification');
print(Accuracy2, 'ERROR MATRIX')
print(Accuracy2.accuracy(), 'OVERALL ACCURACY')
// ADD LEGEND
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
var legendTitle = ui.Label({
  value: 'Land Cover Class',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
legend.add(legendTitle);
var makeRow = function(color, name) {
      var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
          padding: '8px',
          margin: '0 0 4px 0'
        }
      });
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}
      });
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
var palette = ['95D784', 'ff1c1c', '3358FF'];
var names = ['non urban',
             'urban',
];
for (var i = 0; i < 2; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
Map.add(legend);