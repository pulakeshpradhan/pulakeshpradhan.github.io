var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            105.24979494583377,
            -5.474163952175786
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
    ee.Geometry.Point([105.24979494583377, -5.474163952175786]),
    polyline = ui.import && ui.import("polyline", "table", {
      "id": "users/isti/GARISRPANTAI_BandarLampung"
    }) || ee.FeatureCollection("users/isti/GARISRPANTAI_BandarLampung"),
    imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 0.01,
        "gamma": 0.1
      }
    }) || {"opacity":0.01,"gamma":0.1},
    AreaPengerjaan = ui.import && ui.import("AreaPengerjaan", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                105.24427588321873,
                -5.4655835726291055
              ],
              [
                105.24427588321873,
                -5.492582150570571
              ],
              [
                105.25800879337498,
                -5.492582150570571
              ],
              [
                105.25800879337498,
                -5.4655835726291055
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#e9fff5",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #e9fff5 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[105.24427588321873, -5.4655835726291055],
          [105.24427588321873, -5.492582150570571],
          [105.25800879337498, -5.492582150570571],
          [105.25800879337498, -5.4655835726291055]]], null, false),
    waterArea2000 = ui.import && ui.import("waterArea2000", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            105.25371086275203,
            -5.472542972015987
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.25645744478328,
            -5.471346818191224
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.25534164583308,
            -5.47408088056088
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.26031982576473,
            -5.47408088056088
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.25559913789851,
            -5.476302297030384
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.26195060884578,
            -5.470236101783636
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.25117885744197,
            -5.4747643941999815
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.25847446596248,
            -5.477797476543583
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.2653409210406,
            -5.474892552920318
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.26122104799373,
            -5.480958700908694
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.26577007448299,
            -5.477199405187256
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.26954662477596,
            -5.470107942065456
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.26954662477596,
            -5.474294478657052
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.26602756654842,
            -5.4698516225467095
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.27392398988826,
            -5.470193381880629
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.27727138673885,
            -5.469424423104829
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.25641452943904,
            -5.482411149736081
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.25392543947322,
            -5.479335371567812
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.2569295135699,
            -5.477797476543583
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.2595044342242,
            -5.482667463868228
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.26396763002498,
            -5.484461659711272
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.27383815919978,
            -5.4776265990742985
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.27821552431209,
            -5.473696403795486
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.2770997253619,
            -5.481385892107061
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.27332317506892,
            -5.482240273586853
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.27538311159236,
            -5.484974286104253
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.27804386293514,
            -5.488562658521178
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.27958881532771,
            -5.481642206679383
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.27418148195369,
            -5.488818970010525
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.269374963399,
            -5.48967334084593
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.26508342897517,
            -5.48890440714916
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.25830280458553,
            -5.485230599135584
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.25521289980037,
            -5.4859995375689
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.26456844484431,
            -5.490954894803218
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.27246486818416,
            -5.490015088837266
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.27735721742732,
            -5.4904422735509275
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.278558847066,
            -5.483778157168972
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.26817333376033,
            -5.4765158943327545
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.25856029665096,
            -5.468740903363439
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.27785068129285,
            -5.47556186732956
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.27716403578503,
            -5.476074501362068
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 1
      },
      "color": "#08d6d1",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #08d6d1 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([105.25371086275203, -5.472542972015987]),
            {
              "landcover": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([105.25645744478328, -5.471346818191224]),
            {
              "landcover": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([105.25534164583308, -5.47408088056088]),
            {
              "landcover": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([105.26031982576473, -5.47408088056088]),
            {
              "landcover": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([105.25559913789851, -5.476302297030384]),
            {
              "landcover": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([105.26195060884578, -5.470236101783636]),
            {
              "landcover": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([105.25117885744197, -5.4747643941999815]),
            {
              "landcover": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([105.25847446596248, -5.477797476543583]),
            {
              "landcover": 1,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([105.2653409210406, -5.474892552920318]),
            {
              "landcover": 1,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([105.26122104799373, -5.480958700908694]),
            {
              "landcover": 1,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([105.26577007448299, -5.477199405187256]),
            {
              "landcover": 1,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([105.26954662477596, -5.470107942065456]),
            {
              "landcover": 1,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([105.26954662477596, -5.474294478657052]),
            {
              "landcover": 1,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([105.26602756654842, -5.4698516225467095]),
            {
              "landcover": 1,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([105.27392398988826, -5.470193381880629]),
            {
              "landcover": 1,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([105.27727138673885, -5.469424423104829]),
            {
              "landcover": 1,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([105.25641452943904, -5.482411149736081]),
            {
              "landcover": 1,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([105.25392543947322, -5.479335371567812]),
            {
              "landcover": 1,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([105.2569295135699, -5.477797476543583]),
            {
              "landcover": 1,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([105.2595044342242, -5.482667463868228]),
            {
              "landcover": 1,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([105.26396763002498, -5.484461659711272]),
            {
              "landcover": 1,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([105.27383815919978, -5.4776265990742985]),
            {
              "landcover": 1,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([105.27821552431209, -5.473696403795486]),
            {
              "landcover": 1,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([105.2770997253619, -5.481385892107061]),
            {
              "landcover": 1,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([105.27332317506892, -5.482240273586853]),
            {
              "landcover": 1,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([105.27538311159236, -5.484974286104253]),
            {
              "landcover": 1,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([105.27804386293514, -5.488562658521178]),
            {
              "landcover": 1,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([105.27958881532771, -5.481642206679383]),
            {
              "landcover": 1,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([105.27418148195369, -5.488818970010525]),
            {
              "landcover": 1,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([105.269374963399, -5.48967334084593]),
            {
              "landcover": 1,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([105.26508342897517, -5.48890440714916]),
            {
              "landcover": 1,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([105.25830280458553, -5.485230599135584]),
            {
              "landcover": 1,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([105.25521289980037, -5.4859995375689]),
            {
              "landcover": 1,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([105.26456844484431, -5.490954894803218]),
            {
              "landcover": 1,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([105.27246486818416, -5.490015088837266]),
            {
              "landcover": 1,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([105.27735721742732, -5.4904422735509275]),
            {
              "landcover": 1,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([105.278558847066, -5.483778157168972]),
            {
              "landcover": 1,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([105.26817333376033, -5.4765158943327545]),
            {
              "landcover": 1,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([105.25856029665096, -5.468740903363439]),
            {
              "landcover": 1,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([105.27785068129285, -5.47556186732956]),
            {
              "landcover": 1,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([105.27716403578503, -5.476074501362068]),
            {
              "landcover": 1,
              "system:index": "40"
            })]),
    landArea2000 = ui.import && ui.import("landArea2000", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            105.2476382789491,
            -5.483336769565534
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.247981601703,
            -5.484532899385507
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.2465224799989,
            -5.485643589214358
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.2454066810487,
            -5.485899901958153
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.247981601703,
            -5.48914652051291
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.25192981337293,
            -5.488121274457648
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.25124316786511,
            -5.484447461620736
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.25124316786511,
            -5.479150296321899
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.24961238478406,
            -5.476587134954885
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.24806743239148,
            -5.4741948410934835
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.2502131996034,
            -5.469751984243013
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.24703746412976,
            -5.467701423799252
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.24420505141003,
            -5.468812144911784
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.24643664931043,
            -5.472827811731648
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.24326091383679,
            -5.472315174915264
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.24738078688367,
            -5.475476428281397
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.2447200355409,
            -5.481115379254909
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.24695163344128,
            -5.479492050339928
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.24446254347546,
            -5.486241652111923
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.24609332655652,
            -5.487950399943734
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.2439475593446,
            -5.489659142879437
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.24437671278699,
            -5.490940696867244
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.24575000380261,
            -5.490000890878916
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.24789577101453,
            -5.490684386290118
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.24952655409558,
            -5.490428075602753
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.24806743239148,
            -5.485985339514954
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.24866824721082,
            -5.479406611853744
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.24532085036023,
            -5.481713446690122
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.25004153822644,
            -5.4847892126064375
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.24789577101453,
            -5.47581818440078
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.24901156996472,
            -5.480090119400926
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.24978404616101,
            -5.486412527115388
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.24403339003308,
            -5.481884322990147
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.24446254347546,
            -5.476587134954885
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.24575000380261,
            -5.468897584911975
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.2502131996034,
            -5.4912824441319765
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.24660831068738,
            -5.4911115705241125
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.24815326307996,
            -5.4692393447907754
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.24592166517957,
            -5.47633081821345
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.24317508314832,
            -5.4735967661322515
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 0
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
            ee.Geometry.Point([105.2476382789491, -5.483336769565534]),
            {
              "landcover": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([105.247981601703, -5.484532899385507]),
            {
              "landcover": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([105.2465224799989, -5.485643589214358]),
            {
              "landcover": 0,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([105.2454066810487, -5.485899901958153]),
            {
              "landcover": 0,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([105.247981601703, -5.48914652051291]),
            {
              "landcover": 0,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([105.25192981337293, -5.488121274457648]),
            {
              "landcover": 0,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([105.25124316786511, -5.484447461620736]),
            {
              "landcover": 0,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([105.25124316786511, -5.479150296321899]),
            {
              "landcover": 0,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([105.24961238478406, -5.476587134954885]),
            {
              "landcover": 0,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([105.24806743239148, -5.4741948410934835]),
            {
              "landcover": 0,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([105.2502131996034, -5.469751984243013]),
            {
              "landcover": 0,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([105.24703746412976, -5.467701423799252]),
            {
              "landcover": 0,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([105.24420505141003, -5.468812144911784]),
            {
              "landcover": 0,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([105.24643664931043, -5.472827811731648]),
            {
              "landcover": 0,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([105.24326091383679, -5.472315174915264]),
            {
              "landcover": 0,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([105.24738078688367, -5.475476428281397]),
            {
              "landcover": 0,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([105.2447200355409, -5.481115379254909]),
            {
              "landcover": 0,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([105.24695163344128, -5.479492050339928]),
            {
              "landcover": 0,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([105.24446254347546, -5.486241652111923]),
            {
              "landcover": 0,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([105.24609332655652, -5.487950399943734]),
            {
              "landcover": 0,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([105.2439475593446, -5.489659142879437]),
            {
              "landcover": 0,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([105.24437671278699, -5.490940696867244]),
            {
              "landcover": 0,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([105.24575000380261, -5.490000890878916]),
            {
              "landcover": 0,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([105.24789577101453, -5.490684386290118]),
            {
              "landcover": 0,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([105.24952655409558, -5.490428075602753]),
            {
              "landcover": 0,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([105.24806743239148, -5.485985339514954]),
            {
              "landcover": 0,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([105.24866824721082, -5.479406611853744]),
            {
              "landcover": 0,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([105.24532085036023, -5.481713446690122]),
            {
              "landcover": 0,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([105.25004153822644, -5.4847892126064375]),
            {
              "landcover": 0,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([105.24789577101453, -5.47581818440078]),
            {
              "landcover": 0,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([105.24901156996472, -5.480090119400926]),
            {
              "landcover": 0,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([105.24978404616101, -5.486412527115388]),
            {
              "landcover": 0,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([105.24403339003308, -5.481884322990147]),
            {
              "landcover": 0,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([105.24446254347546, -5.476587134954885]),
            {
              "landcover": 0,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([105.24575000380261, -5.468897584911975]),
            {
              "landcover": 0,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([105.2502131996034, -5.4912824441319765]),
            {
              "landcover": 0,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([105.24660831068738, -5.4911115705241125]),
            {
              "landcover": 0,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([105.24815326307996, -5.4692393447907754]),
            {
              "landcover": 0,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([105.24592166517957, -5.47633081821345]),
            {
              "landcover": 0,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([105.24317508314832, -5.4735967661322515]),
            {
              "landcover": 0,
              "system:index": "39"
            })]),
    waterArea2010 = ui.import && ui.import("waterArea2010", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            105.25496086523482,
            -5.470307374919303
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.2576216165776,
            -5.468684016654037
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.25968155310103,
            -5.469282096527304
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.26105484411666,
            -5.471161772237176
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.26517471716353,
            -5.471845289212833
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.26774963781783,
            -5.4703928147060035
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.27075371191451,
            -5.470307374919303
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.26920875952193,
            -5.474579349303456
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.27367195532271,
            -5.475177423281732
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.27538856909224,
            -5.471503530822635
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.27762016699263,
            -5.47372495686804
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.27762016699263,
            -5.47594637466021
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.27667602941939,
            -5.479193047349711
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.27418693945357,
            -5.479107608820768
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.27461609289595,
            -5.482183388162216
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.2781351511235,
            -5.482268826251087
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.27796348974654,
            -5.485942652502598
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.27564606115767,
            -5.4853445893052974
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.27247032568404,
            -5.4868824648869845
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.27564606115767,
            -5.488676648054106
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.2781351511235,
            -5.488847522359922
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.2718695108647,
            -5.48859121088284
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.26826462194869,
            -5.489274707910196
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.26560387060591,
            -5.485942652502598
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.26268562719771,
            -5.484148461112294
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.26517471716353,
            -5.481414444812158
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.26002487585494,
            -5.4790221702796105
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.25693497106978,
            -5.478253222859218
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.25401672766158,
            -5.474835666795986
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.2561624948735,
            -5.471247211901846
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.25744995520064,
            -5.481158130142065
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.25573334143111,
            -5.483379520293613
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.25968155310103,
            -5.4845756500278995
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.25573334143111,
            -5.486797027458678
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.25839409277388,
            -5.490812573356703
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.26174148962447,
            -5.491154320694907
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.26620468542525,
            -5.490983447050301
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.2645739023442,
            -5.487651401190984
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.27126869604537,
            -5.490214515043386
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.274444431519,
            -5.490641699614137
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 1
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
            ee.Geometry.Point([105.25496086523482, -5.470307374919303]),
            {
              "landcover": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([105.2576216165776, -5.468684016654037]),
            {
              "landcover": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([105.25968155310103, -5.469282096527304]),
            {
              "landcover": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([105.26105484411666, -5.471161772237176]),
            {
              "landcover": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([105.26517471716353, -5.471845289212833]),
            {
              "landcover": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([105.26774963781783, -5.4703928147060035]),
            {
              "landcover": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([105.27075371191451, -5.470307374919303]),
            {
              "landcover": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([105.26920875952193, -5.474579349303456]),
            {
              "landcover": 1,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([105.27367195532271, -5.475177423281732]),
            {
              "landcover": 1,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([105.27538856909224, -5.471503530822635]),
            {
              "landcover": 1,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([105.27762016699263, -5.47372495686804]),
            {
              "landcover": 1,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([105.27762016699263, -5.47594637466021]),
            {
              "landcover": 1,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([105.27667602941939, -5.479193047349711]),
            {
              "landcover": 1,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([105.27418693945357, -5.479107608820768]),
            {
              "landcover": 1,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([105.27461609289595, -5.482183388162216]),
            {
              "landcover": 1,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([105.2781351511235, -5.482268826251087]),
            {
              "landcover": 1,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([105.27796348974654, -5.485942652502598]),
            {
              "landcover": 1,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([105.27564606115767, -5.4853445893052974]),
            {
              "landcover": 1,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([105.27247032568404, -5.4868824648869845]),
            {
              "landcover": 1,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([105.27564606115767, -5.488676648054106]),
            {
              "landcover": 1,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([105.2781351511235, -5.488847522359922]),
            {
              "landcover": 1,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([105.2718695108647, -5.48859121088284]),
            {
              "landcover": 1,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([105.26826462194869, -5.489274707910196]),
            {
              "landcover": 1,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([105.26560387060591, -5.485942652502598]),
            {
              "landcover": 1,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([105.26268562719771, -5.484148461112294]),
            {
              "landcover": 1,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([105.26517471716353, -5.481414444812158]),
            {
              "landcover": 1,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([105.26002487585494, -5.4790221702796105]),
            {
              "landcover": 1,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([105.25693497106978, -5.478253222859218]),
            {
              "landcover": 1,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([105.25401672766158, -5.474835666795986]),
            {
              "landcover": 1,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([105.2561624948735, -5.471247211901846]),
            {
              "landcover": 1,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([105.25744995520064, -5.481158130142065]),
            {
              "landcover": 1,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([105.25573334143111, -5.483379520293613]),
            {
              "landcover": 1,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([105.25968155310103, -5.4845756500278995]),
            {
              "landcover": 1,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([105.25573334143111, -5.486797027458678]),
            {
              "landcover": 1,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([105.25839409277388, -5.490812573356703]),
            {
              "landcover": 1,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([105.26174148962447, -5.491154320694907]),
            {
              "landcover": 1,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([105.26620468542525, -5.490983447050301]),
            {
              "landcover": 1,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([105.2645739023442, -5.487651401190984]),
            {
              "landcover": 1,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([105.27126869604537, -5.490214515043386]),
            {
              "landcover": 1,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([105.274444431519, -5.490641699614137]),
            {
              "landcover": 1,
              "system:index": "39"
            })]),
    landArea2010 = ui.import && ui.import("landArea2010", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            105.24826607153365,
            -5.468769456672535
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.24749359533736,
            -5.46791505593876
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.24878105566451,
            -5.469965615650509
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.24903854772994,
            -5.471930728779871
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.2498968546147,
            -5.473981274726867
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.25015434668013,
            -5.475519179572076
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.250669330811,
            -5.477142519282496
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.25058350012252,
            -5.478594977390474
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.24800857946822,
            -5.478424100149286
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.24543365881392,
            -5.476373569443011
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.24431785986373,
            -5.477655151959096
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.24423202917525,
            -5.48098725363421
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.24268707678267,
            -5.477398835675776
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.24414619848677,
            -5.482097950061122
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.24577698156783,
            -5.479278485866441
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.24672111914107,
            -5.482268826251087
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.24423202917525,
            -5.484319336715229
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.24629196569869,
            -5.484319336715229
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.24629196569869,
            -5.485515464565699
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.24423202917525,
            -5.486284402631865
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.2444036905522,
            -5.4884203365035775
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.2455194895024,
            -5.48790771307201
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.24783691809127,
            -5.485600902177549
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.24715027258345,
            -5.487993150341199
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.24715027258345,
            -5.489274707910196
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.24509033606002,
            -5.489872767166384
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.24860939428756,
            -5.490727136491547
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.2513559763188,
            -5.484490212269236
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.24320206091353,
            -5.470820013456457
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.24543365881392,
            -5.4703928147060035
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.24749359533736,
            -5.474921105935736
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.24860939428756,
            -5.482097950061122
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.24337372229049,
            -5.4905562627244775
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.24972519323775,
            -5.487309651844921
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.24723610327193,
            -5.490470825822566
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.24285873815963,
            -5.485942652502598
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.24285873815963,
            -5.481158130142065
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.24732193396041,
            -5.479363924370945
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.2498968546147,
            -5.478851293160619
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.24594864294478,
            -5.472016168334696
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 0
      },
      "color": "#21601e",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #21601e */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([105.24826607153365, -5.468769456672535]),
            {
              "landcover": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([105.24749359533736, -5.46791505593876]),
            {
              "landcover": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([105.24878105566451, -5.469965615650509]),
            {
              "landcover": 0,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([105.24903854772994, -5.471930728779871]),
            {
              "landcover": 0,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([105.2498968546147, -5.473981274726867]),
            {
              "landcover": 0,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([105.25015434668013, -5.475519179572076]),
            {
              "landcover": 0,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([105.250669330811, -5.477142519282496]),
            {
              "landcover": 0,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([105.25058350012252, -5.478594977390474]),
            {
              "landcover": 0,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([105.24800857946822, -5.478424100149286]),
            {
              "landcover": 0,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([105.24543365881392, -5.476373569443011]),
            {
              "landcover": 0,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([105.24431785986373, -5.477655151959096]),
            {
              "landcover": 0,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([105.24423202917525, -5.48098725363421]),
            {
              "landcover": 0,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([105.24268707678267, -5.477398835675776]),
            {
              "landcover": 0,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([105.24414619848677, -5.482097950061122]),
            {
              "landcover": 0,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([105.24577698156783, -5.479278485866441]),
            {
              "landcover": 0,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([105.24672111914107, -5.482268826251087]),
            {
              "landcover": 0,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([105.24423202917525, -5.484319336715229]),
            {
              "landcover": 0,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([105.24629196569869, -5.484319336715229]),
            {
              "landcover": 0,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([105.24629196569869, -5.485515464565699]),
            {
              "landcover": 0,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([105.24423202917525, -5.486284402631865]),
            {
              "landcover": 0,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([105.2444036905522, -5.4884203365035775]),
            {
              "landcover": 0,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([105.2455194895024, -5.48790771307201]),
            {
              "landcover": 0,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([105.24783691809127, -5.485600902177549]),
            {
              "landcover": 0,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([105.24715027258345, -5.487993150341199]),
            {
              "landcover": 0,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([105.24715027258345, -5.489274707910196]),
            {
              "landcover": 0,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([105.24509033606002, -5.489872767166384]),
            {
              "landcover": 0,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([105.24860939428756, -5.490727136491547]),
            {
              "landcover": 0,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([105.2513559763188, -5.484490212269236]),
            {
              "landcover": 0,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([105.24320206091353, -5.470820013456457]),
            {
              "landcover": 0,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([105.24543365881392, -5.4703928147060035]),
            {
              "landcover": 0,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([105.24749359533736, -5.474921105935736]),
            {
              "landcover": 0,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([105.24860939428756, -5.482097950061122]),
            {
              "landcover": 0,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([105.24337372229049, -5.4905562627244775]),
            {
              "landcover": 0,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([105.24972519323775, -5.487309651844921]),
            {
              "landcover": 0,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([105.24723610327193, -5.490470825822566]),
            {
              "landcover": 0,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([105.24285873815963, -5.485942652502598]),
            {
              "landcover": 0,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([105.24285873815963, -5.481158130142065]),
            {
              "landcover": 0,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([105.24732193396041, -5.479363924370945]),
            {
              "landcover": 0,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([105.2498968546147, -5.478851293160619]),
            {
              "landcover": 0,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([105.24594864294478, -5.472016168334696]),
            {
              "landcover": 0,
              "system:index": "39"
            })]),
    waterArea2020 = ui.import && ui.import("waterArea2020", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            105.25438565736121,
            -5.469891881684329
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.25696057801551,
            -5.469122922521073
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.25936383729285,
            -5.468695722558955
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.26108045106238,
            -5.469977321530365
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.26451367860145,
            -5.470148201185824
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.2663121717021,
            -5.4708277859611965
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.26897292304487,
            -5.470998665373724
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.27163367438764,
            -5.469973388166341
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.27377944159956,
            -5.468520909115174
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.27558188605757,
            -5.468520909115174
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.27858596015425,
            -5.46741018746219
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.27721266913862,
            -5.469973388166341
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.27772765326948,
            -5.471853061704252
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.28038840461225,
            -5.473818168632397
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.27884345221968,
            -5.47433080416025
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.27412276435346,
            -5.4742453649361265
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.27146201301069,
            -5.475441512962573
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.26862960029096,
            -5.474843439248525
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.26336798904822,
            -5.473325405458862
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.26723037002967,
            -5.476230336698576
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.26705870865271,
            -5.479391569356704
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.26022521737056,
            -5.477511919521851
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.25842277291255,
            -5.480075076921098
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.25481788399654,
            -5.478109990565353
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.25893775704341,
            -5.470249580528945
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.25593368294673,
            -5.471958374109434
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.26048270943599,
            -5.480245953689974
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.25627700570064,
            -5.48058770708104
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.25979606392818,
            -5.481869280555508
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.25773612740474,
            -5.482552785283739
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.26125518563228,
            -5.48485960796302
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.25807945015865,
            -5.48485960796302
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.26400176766353,
            -5.483492603007157
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.26528922799068,
            -5.486653797214783
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.2688941169067,
            -5.488020794927262
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.27378646614986,
            -5.485970297183697
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.27524558785396,
            -5.479220692343395
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.2743872809692,
            -5.481100336800921
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.27824966195064,
            -5.480075076921098
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.27696220162349,
            -5.476144897745956
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.27885047676997,
            -5.484774170245029
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.27782050850826,
            -5.487849920384546
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.27498809578853,
            -5.489387789506209
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.27653304818111,
            -5.484688732514798
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.27335731270747,
            -5.489729537661242
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.26674834969478,
            -5.490413033383554
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.2648600745483,
            -5.490156722579527
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.25687782051997,
            -5.487166421724125
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.25395957711177,
            -5.4903275964611336
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.26949493172603,
            -5.490498470293748
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.27601806405025,
            -5.490840217812034
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 1
      },
      "color": "#003737",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #003737 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([105.25438565736121, -5.469891881684329]),
            {
              "landcover": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([105.25696057801551, -5.469122922521073]),
            {
              "landcover": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([105.25936383729285, -5.468695722558955]),
            {
              "landcover": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([105.26108045106238, -5.469977321530365]),
            {
              "landcover": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([105.26451367860145, -5.470148201185824]),
            {
              "landcover": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([105.2663121717021, -5.4708277859611965]),
            {
              "landcover": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([105.26897292304487, -5.470998665373724]),
            {
              "landcover": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([105.27163367438764, -5.469973388166341]),
            {
              "landcover": 1,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([105.27377944159956, -5.468520909115174]),
            {
              "landcover": 1,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([105.27558188605757, -5.468520909115174]),
            {
              "landcover": 1,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([105.27858596015425, -5.46741018746219]),
            {
              "landcover": 1,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([105.27721266913862, -5.469973388166341]),
            {
              "landcover": 1,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([105.27772765326948, -5.471853061704252]),
            {
              "landcover": 1,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([105.28038840461225, -5.473818168632397]),
            {
              "landcover": 1,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([105.27884345221968, -5.47433080416025]),
            {
              "landcover": 1,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([105.27412276435346, -5.4742453649361265]),
            {
              "landcover": 1,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([105.27146201301069, -5.475441512962573]),
            {
              "landcover": 1,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([105.26862960029096, -5.474843439248525]),
            {
              "landcover": 1,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([105.26336798904822, -5.473325405458862]),
            {
              "landcover": 1,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([105.26723037002967, -5.476230336698576]),
            {
              "landcover": 1,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([105.26705870865271, -5.479391569356704]),
            {
              "landcover": 1,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([105.26022521737056, -5.477511919521851]),
            {
              "landcover": 1,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([105.25842277291255, -5.480075076921098]),
            {
              "landcover": 1,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([105.25481788399654, -5.478109990565353]),
            {
              "landcover": 1,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([105.25893775704341, -5.470249580528945]),
            {
              "landcover": 1,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([105.25593368294673, -5.471958374109434]),
            {
              "landcover": 1,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([105.26048270943599, -5.480245953689974]),
            {
              "landcover": 1,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([105.25627700570064, -5.48058770708104]),
            {
              "landcover": 1,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([105.25979606392818, -5.481869280555508]),
            {
              "landcover": 1,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([105.25773612740474, -5.482552785283739]),
            {
              "landcover": 1,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([105.26125518563228, -5.48485960796302]),
            {
              "landcover": 1,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([105.25807945015865, -5.48485960796302]),
            {
              "landcover": 1,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([105.26400176766353, -5.483492603007157]),
            {
              "landcover": 1,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([105.26528922799068, -5.486653797214783]),
            {
              "landcover": 1,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([105.2688941169067, -5.488020794927262]),
            {
              "landcover": 1,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([105.27378646614986, -5.485970297183697]),
            {
              "landcover": 1,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([105.27524558785396, -5.479220692343395]),
            {
              "landcover": 1,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([105.2743872809692, -5.481100336800921]),
            {
              "landcover": 1,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([105.27824966195064, -5.480075076921098]),
            {
              "landcover": 1,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([105.27696220162349, -5.476144897745956]),
            {
              "landcover": 1,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([105.27885047676997, -5.484774170245029]),
            {
              "landcover": 1,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([105.27782050850826, -5.487849920384546]),
            {
              "landcover": 1,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([105.27498809578853, -5.489387789506209]),
            {
              "landcover": 1,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([105.27653304818111, -5.484688732514798]),
            {
              "landcover": 1,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([105.27335731270747, -5.489729537661242]),
            {
              "landcover": 1,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([105.26674834969478, -5.490413033383554]),
            {
              "landcover": 1,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([105.2648600745483, -5.490156722579527]),
            {
              "landcover": 1,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([105.25687782051997, -5.487166421724125]),
            {
              "landcover": 1,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([105.25395957711177, -5.4903275964611336]),
            {
              "landcover": 1,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([105.26949493172603, -5.490498470293748]),
            {
              "landcover": 1,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([105.27601806405025, -5.490840217812034]),
            {
              "landcover": 1,
              "system:index": "50"
            })]),
    landArea2020 = ui.import && ui.import("landArea2020", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            105.24649230721431,
            -5.489729537661242
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.2446898627563,
            -5.490156722579527
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.24426070931392,
            -5.485970297183697
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.24657813790279,
            -5.483150851278949
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.24460403206783,
            -5.481356651495822
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.24640647652583,
            -5.486226609787117
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.24803725960689,
            -5.489302352436847
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.24855224373775,
            -5.4828090993550616
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.24709312203365,
            -5.478280867896387
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.24520484688716,
            -5.476401214567148
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.24391738656001,
            -5.477682797023935
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.24563400032955,
            -5.478793499596238
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.24503318551021,
            -5.471958374109434
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.24674979927974,
            -5.473923480691522
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.24700729134517,
            -5.467857261317352
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.2487239051147,
            -5.469395181908419
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.2501830268188,
            -5.472641890174752
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.25104133370357,
            -5.474265237698739
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.25112716439205,
            -5.476572092386855
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.2516421485229,
            -5.478280867896387
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.25044051888423,
            -5.478195429236975
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.2483805823608,
            -5.474863311991253
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.25026885750728,
            -5.479220692343395
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.25172797921138,
            -5.479733323236683
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.25121299508052,
            -5.484517857017635
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.24975387337642,
            -5.487764483094835
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.24846641304927,
            -5.484346981471542
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.24932471993404,
            -5.49024215952645
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.24735061409908,
            -5.490669344077394
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.24520484688716,
            -5.491011091497706
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.24305907967525,
            -5.490840217812034
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.24297324898677,
            -5.486141172264882
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.24314491036372,
            -5.4816129660806885
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.24262992623287,
            -5.477939113185441
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.24262992623287,
            -5.474350676920013
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.24331657174068,
            -5.470505899877188
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.2428874182983,
            -5.4671737397862135
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.2472647834106,
            -5.469224302037915
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.24863807442622,
            -5.477170164371062
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.24743644478755,
            -5.479135253818408
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 0
      },
      "color": "#5a4a23",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #5a4a23 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([105.24649230721431, -5.489729537661242]),
            {
              "landcover": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([105.2446898627563, -5.490156722579527]),
            {
              "landcover": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([105.24426070931392, -5.485970297183697]),
            {
              "landcover": 0,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([105.24657813790279, -5.483150851278949]),
            {
              "landcover": 0,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([105.24460403206783, -5.481356651495822]),
            {
              "landcover": 0,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([105.24640647652583, -5.486226609787117]),
            {
              "landcover": 0,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([105.24803725960689, -5.489302352436847]),
            {
              "landcover": 0,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([105.24855224373775, -5.4828090993550616]),
            {
              "landcover": 0,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([105.24709312203365, -5.478280867896387]),
            {
              "landcover": 0,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([105.24520484688716, -5.476401214567148]),
            {
              "landcover": 0,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([105.24391738656001, -5.477682797023935]),
            {
              "landcover": 0,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([105.24563400032955, -5.478793499596238]),
            {
              "landcover": 0,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([105.24503318551021, -5.471958374109434]),
            {
              "landcover": 0,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([105.24674979927974, -5.473923480691522]),
            {
              "landcover": 0,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([105.24700729134517, -5.467857261317352]),
            {
              "landcover": 0,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([105.2487239051147, -5.469395181908419]),
            {
              "landcover": 0,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([105.2501830268188, -5.472641890174752]),
            {
              "landcover": 0,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([105.25104133370357, -5.474265237698739]),
            {
              "landcover": 0,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([105.25112716439205, -5.476572092386855]),
            {
              "landcover": 0,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([105.2516421485229, -5.478280867896387]),
            {
              "landcover": 0,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([105.25044051888423, -5.478195429236975]),
            {
              "landcover": 0,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([105.2483805823608, -5.474863311991253]),
            {
              "landcover": 0,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([105.25026885750728, -5.479220692343395]),
            {
              "landcover": 0,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([105.25172797921138, -5.479733323236683]),
            {
              "landcover": 0,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([105.25121299508052, -5.484517857017635]),
            {
              "landcover": 0,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([105.24975387337642, -5.487764483094835]),
            {
              "landcover": 0,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([105.24846641304927, -5.484346981471542]),
            {
              "landcover": 0,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([105.24932471993404, -5.49024215952645]),
            {
              "landcover": 0,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([105.24735061409908, -5.490669344077394]),
            {
              "landcover": 0,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([105.24520484688716, -5.491011091497706]),
            {
              "landcover": 0,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([105.24305907967525, -5.490840217812034]),
            {
              "landcover": 0,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([105.24297324898677, -5.486141172264882]),
            {
              "landcover": 0,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([105.24314491036372, -5.4816129660806885]),
            {
              "landcover": 0,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([105.24262992623287, -5.477939113185441]),
            {
              "landcover": 0,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([105.24262992623287, -5.474350676920013]),
            {
              "landcover": 0,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([105.24331657174068, -5.470505899877188]),
            {
              "landcover": 0,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([105.2428874182983, -5.4671737397862135]),
            {
              "landcover": 0,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([105.2472647834106, -5.469224302037915]),
            {
              "landcover": 0,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([105.24863807442622, -5.477170164371062]),
            {
              "landcover": 0,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([105.24743644478755, -5.479135253818408]),
            {
              "landcover": 0,
              "system:index": "39"
            })]);
//Pelaksanaan Kerja Praktik Lapang BPPT
//Dinamika Pantai di Kecamatan Teluk Betung Timur, Bandar Lampung
//12 Juli s/d Agustus 2021
//1
// Center Map
Map.setCenter(105.24737176970024,-5.467804498521002, 12.5);
// Mask Cloud
function maskClouds(image) {
  // Bits 3 and 5 are cloud shadow and cloud, respectively.
    var cloudShadowBitMask = ee.Number(2).pow(3).int();
    var cloudsBitMask = ee.Number(2).pow(5).int();  
    // Get the pixel QA band.
    var qa = image.select('pixel_qa');
    // Both flags should be set to zero, indicating clear conditions.
    var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0).and(qa.bitwiseAnd(cloudsBitMask).eq(0)); 
  // Return the masked image, scaled to [0, 1].
  return image.updateMask(mask).divide(10000).copyProperties(image, ["system:time_start"]);
}
//Memanggil Citra Landsat 5 tahun 2000, 2010 dan Landsat 8 tahun 2020
var datasetL52000 = ee.ImageCollection ('LANDSAT/LT05/C01/T1_SR')
            .filter (ee.Filter.date('2000-01-01' , '2000-12-31'))
            .filterMetadata ('CLOUD_COVER' , 'less_than' , 10)
            .map (maskClouds)
            .filterBounds (AreaPengerjaan);
var datasetL5 = ee.ImageCollection ('LANDSAT/LT05/C01/T1_SR')
            .filter (ee.Filter.date('2010-01-01' , '2010-12-31'))
            .filterMetadata ('CLOUD_COVER' , 'less_than' , 70)
            .map (maskClouds)
            .filterBounds (AreaPengerjaan);
var datasetL8 = ee.ImageCollection("LANDSAT/LC08/C01/T1_SR")
          .filter(ee.Filter.date('2020-01-01', '2020-12-31'))
          .filterMetadata('CLOUD_COVER','less_than',90)
          .map(maskClouds)
          .filterBounds(AreaPengerjaan);
// Display Landsat 5 2000 dan 2010
var trueColor2000 = datasetL52000.select(['B3', 'B2', 'B1']);
  var trueColor2000Vis = {
      min: 0.011833242728485148,
      max: 0.09795370745175766,
    };
  Map.addLayer(trueColor2000, trueColor2000Vis, 'Landsat 5 2000');
  var trueColor234 = datasetL5.select(['B3', 'B2', 'B1']);
  var trueColor234Vis = {
      min: 0.011833242728485148,
      max: 0.09795370745175766,
    };
  Map.addLayer(trueColor234, trueColor234Vis, 'Landsat 5 2010');
// Display Landsat 8 2020
  var trueColor568 = datasetL8.select(['B4', 'B3', 'B2']);
  var trueColor568Vis = {
    min: -0.012253036750360304,
    max: 0.10188270518085371,
  };
  Map.addLayer(trueColor568, trueColor568Vis, 'Landsat 8 2020');
//2
//Add indeces MNDWI Landsat 5
  // MNDWI (Modified Normalized Difference Water Indeks)
var indicesL5 = function(image_clip){
  var mndwi = image_clip.expression(
    '(GREEN - SWIR)/(GREEN + SWIR)', 
    {'GREEN': image_clip.select('B2'), // GREEN: band 2
    'SWIR': image_clip.select('B5')  // SWIR: band 5
    }).rename('MNDWI');
  return image_clip
              .addBands(mndwi)
};
// add indeces band to  image collection
var stacking_indices_L52000 = datasetL52000.map(indicesL5);
var stacking_indices_L5 = datasetL5.map(indicesL5);
// create median for dataset
var median_image_L52000 = stacking_indices_L52000.median();
var median_image_L5 = stacking_indices_L5.median();
// clip dataset using shp file
var image_clip_L52000 = median_image_L52000.clip(AreaPengerjaan);
var image_clip_L5 = median_image_L5.clip(AreaPengerjaan);
// DISPLAY
  //Params
  var INDICESparams = {min: -1, max: 1,
                    palette:['white', 'blue']};
  //Display Indices
  Map.addLayer(image_clip_L52000.select(['MNDWI']),INDICESparams,'MNDWI 2000');
  //Params
  var INDICESparams = {min: -1, max: 1,
                    palette:['white', 'blue']};
  //Display Indices
  Map.addLayer(image_clip_L5.select(['MNDWI']),INDICESparams,'MNDWI 2010');
//Add Indices MNDWI Landsat 8
var indicesL8 = function(image_clip){
  //MNDWI (Modified Normalized Water Indeks)
  var mndwi = image_clip.expression(
    '(GREEN - SWIR)/(GREEN + SWIR)', 
    {'GREEN': image_clip.select('B3'), // GREEN: band 3
    'SWIR': image_clip.select('B6')  // SWIR: band 6
    }).rename('MNDWI');
  return image_clip
              .addBands(mndwi);
};
// add indeces band to  image collection
var stacking_indices_L8 = datasetL8.map(indicesL8);
// create median for dataset
var median_image_L8 = stacking_indices_L8.median();
// clip dataset using shp file
var image_clip_L8 = median_image_L8.clip(AreaPengerjaan);
// DISPLAY
  //Params
  var INDICESparams = {min: -1, max: 1,
                    palette:['white', 'blue']};
  //Display Indices
  Map.addLayer(image_clip_L8.select(['MNDWI']),INDICESparams,'MNDWI 2020');
// Make a training Datasets
//2020
        // Merge the training sample area 
          var classes_2020 = landArea2020.merge(waterArea2020);
        // Define the Band 
          var bands_2020 = ['B2','B3','B4','B5','B6','B7','MNDWI'];
        // Select Bands and Clip geometry
          var imagenew_2020 = image_clip_L8.select(bands_2020);
        // Assemble samples for the model
          var samples_2020 = imagenew_2020.sampleRegions({
            collection: classes_2020,
            properties: ['landcover'], 
            scale: 30
          }).randomColumn('random');
      // Testing accuracy for the training data
        var split_2020 = 0.8; // Roughly 80% for training, 20% for testing.
        var training_2020 = samples_2020.filter(ee.Filter.lt('random', split_2020)); //Subset training data
        var testing_2020 = samples_2020.filter(ee.Filter.gte('random', split_2020)); //Subset testing data
        // Display the Results of the accuracy test
          print('2020: Samples n =', samples_2020.aggregate_count('.all'));
          print('2020: Training n =', training_2020.aggregate_count('.all'));
          print('2020: Testing n =', testing_2020.aggregate_count('.all'));
      // Random Forest classification
        // Smile Random Forest
          var classifier_2020 = ee.Classifier.smileRandomForest(100,5).train({ 
                           features: training_2020.select(['B2','B3','B4','B5','B6','B7','MNDWI','landcover']), //Train using bands and landcover property
                           classProperty: 'landcover', //Pull the landcover property from classes
                           inputProperties: bands_2020
                         });
        // Testing accuracy for the model
          var validation_2020 = testing_2020.classify(classifier_2020);
          var testAccuracy_2020 = validation_2020.errorMatrix('landcover', 'classification');
          print('Validation error matrix RF (2020) : ', testAccuracy_2020);
          print('Validation overall accuracy RF (2020) : ', testAccuracy_2020.accuracy());
      // Classify the landsat composite using the random forest model
        var classified_2020 = imagenew_2020.select(bands_2020) // select the predictors
                                           .classify(classifier_2020); // .classify applies the Random Forest
      //Display result
      var warna = [
      '5a4a23', // NonMangrove (0) // Ungu
      '003737', // Water (1)  // Biru
        ];
      Map.addLayer (classified_2020, {min: 0, max: 1, palette:warna}, 'Tutupan Lahan 2020');
//2010
        // Merge the training sample area 
          var classes_2010 = landArea2010.merge(waterArea2010);
        // Define the Band 
          var bands_2010 = ['B2','B3','B4','B5','B6','B7','MNDWI'];
        // Select Bands and Clip geometry
          var imagenew_2010 = image_clip_L5.select(bands_2010);
        // Assemble samples for the model
          var samples_2010 = imagenew_2010.sampleRegions({
            collection: classes_2010,
            properties: ['landcover'], 
            scale: 30
          }).randomColumn('random');
      // Testing accuracy for the training data
        var split_2010 = 0.8; // Roughly 80% for training, 20% for testing.
        var training_2010 = samples_2010.filter(ee.Filter.lt('random', split_2010)); //Subset training data
        var testing_2010 = samples_2010.filter(ee.Filter.gte('random', split_2010)); //Subset testing data
        // Display the Results of the accuracy test
          print('2010: Samples n =', samples_2010.aggregate_count('.all'));
          print('2010: Training n =', training_2010.aggregate_count('.all'));
          print('2010: Testing n =', testing_2010.aggregate_count('.all'));
      // Random Forest classification
        // Smile Random Forest
          var classifier_2010 = ee.Classifier.smileRandomForest(100,5).train({ 
                           features: training_2010.select(['B2','B3','B4','B5','B6','B7','MNDWI','landcover']), //Train using bands and landcover property
                           classProperty: 'landcover', //Pull the landcover property from classes
                           inputProperties: bands_2010
                         });
        // Testing accuracy for the model
          var validation_2010 = testing_2010.classify(classifier_2010);
          var testAccuracy_2010 = validation_2010.errorMatrix('landcover', 'classification');
          print('Validation error matrix RF (2010) : ', testAccuracy_2010);
          print('Validation overall accuracy RF (2010) : ', testAccuracy_2010.accuracy());
      // Classify the landsat composite using the random forest model
        var classified_2010 = imagenew_2010.select(bands_2010) // select the predictors
                                           .classify(classifier_2010); // .classify applies the Random Forest
      //Display result
      var warna = [
      '21601e', // NonMangrove (0) // 21601e
      '0b4a8b', // Water (1)  // 0b4a8b
        ];
      Map.addLayer (classified_2010, {min: 0, max: 1, palette:warna}, 'Tutupan Lahan 2010');
//2000
        // Merge the training sample area 
          var classes_2000 = landArea2000.merge(waterArea2000);
        // Define the Band 
          var bands_2000 = ['B2','B3','B4','B5','B6','B7','MNDWI'];
        // Select Bands and Clip geometry
          var imagenew_2000 = image_clip_L52000.select(bands_2000);
        // Assemble samples for the model
          var samples_2000 = imagenew_2000.sampleRegions({
            collection: classes_2000,
            properties: ['landcover'], 
            scale: 30
          }).randomColumn('random');
      // Testing accuracy for the training data
        var split_2000 = 0.8; // Roughly 80% for training, 20% for testing.
        var training_2000 = samples_2000.filter(ee.Filter.lt('random', split_2000)); //Subset training data
        var testing_2000 = samples_2000.filter(ee.Filter.gte('random', split_2000)); //Subset testing data
        // Display the Results of the accuracy test
          print('2000: Samples n =', samples_2000.aggregate_count('.all'));
          print('2000: Training n =', training_2000.aggregate_count('.all'));
          print('2000: Testing n =', testing_2000.aggregate_count('.all'));
      // Random Forest classification
        // Smile Random Forest
          var classifier_2000 = ee.Classifier.smileRandomForest(100,5).train({ 
                           features: training_2000.select(['B2','B3','B4','B5','B6','B7','MNDWI','landcover']), //Train using bands and landcover property
                           classProperty: 'landcover', //Pull the landcover property from classes
                           inputProperties: bands_2000
                         });
        // Testing accuracy for the model
          var validation_2000 = testing_2010.classify(classifier_2000);
          var testAccuracy_2000 = validation_2000.errorMatrix('landcover', 'classification');
          print('Validation error matrix RF (2000) : ', testAccuracy_2000);
          print('Validation overall accuracy RF (2000) : ', testAccuracy_2000.accuracy());
      // Classify the landsat composite using the random forest model
        var classified_2000 = imagenew_2000.select(bands_2000) // select the predictors
                                           .classify(classifier_2000); // .classify applies the Random Forest
      //Display result
      var warna = [
      '98ff00', // NonMangrove (0) // 98ff00
      '08d6d1', // Water (1)  // 08d6d1
        ];
      Map.addLayer (classified_2000, {min: 0, max: 1, palette:warna}, 'Tutupan Lahan 2000');
// Calculate Area 
  //----------------2000----------------
    var areaImage_2000 = ee.Image.pixelArea().divide(1e6).addBands(
                         classified_2000)
    var areas_2000 = areaImage_2000.reduceRegion({
                      reducer: ee.Reducer.sum().group({
                        groupField: 1,
                        groupName: 'class',
                        }),
                      geometry:AreaPengerjaan,
                      crs: 'EPSG:32748', // WGS UTM Zona 48S
                      scale: 30,
                      maxPixels: 1e13
                    }); 
    //print(areas_2000)
    var list = ee.List(areas_2000.get('groups'))
    var classes = list.map(function(d) {
      return ee.Dictionary(d).get('class')
    })
    var sums2000 = list.map(function(d) {
      return ee.Dictionary(d).get('sum')
    })
    var luasan_daratan_2000 = sums2000.get(0);
    var luasan_perairan_2000 = sums2000.get(1);
    print('Perhitungan Luas Daratan 2000 :',luasan_daratan_2000);
    print('Perhitungan Luas Perairan 2000 :',luasan_perairan_2000);
  //----------------2010----------------
    var areaImage_2010 = ee.Image.pixelArea().divide(1e6).addBands(
                         classified_2010);
    var areas_2010 = areaImage_2010.reduceRegion({
                      reducer: ee.Reducer.sum().group({
                        groupField: 1,
                        groupName: 'class',
                      }),
                     geometry:AreaPengerjaan,
                     crs: 'EPSG:32748', // WGS UTM Zona 48S
                     scale: 30,
                     maxPixels: 1e13
                  }); 
    //print(areas_2010)
    var list = ee.List(areas_2010.get('groups'))
    var classes = list.map(function(d) {
      return ee.Dictionary(d).get('class')
    })
    var sums2010 = list.map(function(d) {
      return ee.Dictionary(d).get('sum')
    })
    var luasan_daratan_2010 = sums2010.get(0);
    var luasan_perairan_2010 = sums2010.get(1);
    print('Perhitungan Luas Daratan 2010 :',luasan_daratan_2010);
    print('Perhitungan Luas Perairan 2010 :',luasan_perairan_2010);
  //----------------2020----------------
    var areaImage_2020 = ee.Image.pixelArea().divide(1e6).addBands(
                        classified_2020);
    var areas_2020 = areaImage_2020.reduceRegion({
                      reducer: ee.Reducer.sum().group({
                        groupField: 1,
                        groupName: 'class',
                      }),
                     geometry:AreaPengerjaan,
                     crs: 'EPSG:32748', // WGS UTM Zona 48S
                     scale: 30,
                     maxPixels: 1e13
                   }); 
    //print(areas_2020)
    var list = ee.List(areas_2020.get('groups'))
    var classes = list.map(function(d) {
      return ee.Dictionary(d).get('class')
    })
    var sums2020 = list.map(function(d) {
      return ee.Dictionary(d).get('sum')
    })
    var luasan_daratan_2020 = sums2020.get(0);
    var luasan_perairan_2020 = sums2020.get(1);
    print('Perhitungan Luas Daratan 2020 :',luasan_daratan_2020);
    print('Perhitungan Luas Perairan 2020 :',luasan_perairan_2020);
    //print(area2020_chart)
var transparent= AreaPengerjaan
Map.addLayer(AreaPengerjaan, {min: 0, max: 3, palette: [transparent, '#0571b0', '#FFDF00', '#ca0020']},'Area Pengerjaan');
//Legenda
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'top-left',
    padding: '8px 15px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'Keterangan',
  style: {
    fontWeight: 'bold',
    fontSize: '15px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
// Add the title to the panel
legend.add(legendTitle);
// Creates and styles 1 row of the legend.
var makeRow = function(color, name) {
      // Create the label that is actually the colored box.
      var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
          // Use padding to give the box height and width.
          padding: '8px',
          margin: '0 0 4px 0'
        }
      });
      // Create the label filled with the description text.
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}
      });
      // return the panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
//  Palette with the colors
var palette =['faf7ff', '5a4a23', '003737', '21601e', '0b4a8b', '98ff00', '08d6d1'];
// name of the legend
var names = ['Area Pengerjaan', 'Land Area 2020', 'Water 2020', 'Land Area 2010', 'Water Area 2010', 'Land Area 2000', 'Water Area 2000'];
// Add color and and names
for (var i = 0; i < 7; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
// add legend to map (alternatively you can also print the legend to the console)
Map.add(legend);
// Make Chart Area
  var dataTable = [
    [
      {label: 'State', role: 'domain', type: 'string'},
      {label: 'Luas (Ha)', role: 'data', type: 'number'},
      {label: 'Pop. annotation', role: 'annotation', type: 'string'}
    ],
     ['2000', 2.6186419255598175, '2.62'],
     ['2010', 2.69430098641187, '2.69'],
     ['2020', 2.706910828880132, '2.70']
    ];
  // Define the chart and print it to the console.
  var chart_area_daratan = ui.Chart(dataTable).setChartType('ColumnChart').setOptions({
    title: 'Luasan Perubahan Garis Pantai Tahun 2000-2020',
    legend: {position: 'none'},
    hAxis: {title: 'Tahun', titleTextStyle: {italic: false, bold: true}},
    vAxis: {title: 'Luas (Ha)', titleTextStyle: {italic: false, bold: true},min:0},
    colors: ['0782e2']
  });
//Uji Korelasi Pearson
// Make a band correlation chart.
//print(ui.Chart.image.series({
//  imageCollection: stacked_composite.select(['CO_column_number_density']),
 // region: table,
 // reducer: ee.Reducer.pearsonsCorrelation(),
 // scale: 30}));
//chart
// script parameter grafik 2000
var options = {
 title: 'Grafik Indeks MNDWI 2000',
 hAxis: {title: 'Month'},
 vAxis: {title: 'Indeks MNDWI '},
 lineWidth: 1,
 pointSize: 4,
 };
var waktu = [0, 1, 2, 3, 4,5,6,7,8,9,10,11];
// Script memunculkan grafik
var chart = ui.Chart.image.regions(
  image_clip_L52000, AreaPengerjaan, ee.Reducer.mean(), 30, 'MNDWI 2000', waktu)
   .setChartType('ScatterChart')
   .setOptions(options);
// Display grafik.
//print(chart);
// Membuat panel grafik
var panel = ui.Panel({style:{
                      width: '250px', 
                      height:'250px', 
                      position: 'bottom-right', 
                      padding: '15px 15px'},
                      layout: ui.Panel.Layout.flow('horizontal')})
      //.add(ui.Label('Grafik Indeks MNDWI 2000:'))
      .add(chart);
//chart
// script parameter grafik 2010
var options = {
 title: 'Grafik Indeks MNDWI 2010',
 hAxis: {title: 'Month'},
 vAxis: {title: 'Indeks MNDWI '},
 lineWidth: 1,
 pointSize: 4,
 };
var waktu = [0, 1, 2, 3, 4,5,6,7,8,9,10,11];
// Script memunculkan grafik
var chart = ui.Chart.image.regions(
  image_clip_L5, AreaPengerjaan, ee.Reducer.mean(), 30, 'MNDWI 2010', waktu)
   .setChartType('ScatterChart')
   .setOptions(options);
// Display grafik.
//print(chart);
// Membuat panel grafik
var panel1 = ui.Panel({style:{
                      width: '250px', 
                      height:'250px', 
                      position: 'bottom-right', 
                      padding: '15px 15px'},
                      layout: ui.Panel.Layout.flow('horizontal')})
      //.add(ui.Label('Grafik Indeks MNDWI 2010:'))
      .add(chart);
//chart
// script parameter grafik 2020
var options = {
 title: 'Grafik Indeks MNDWI 2020',
 hAxis: {title: 'Month'},
 vAxis: {title: 'Indeks MNDWI '},
 lineWidth: 1,
 pointSize: 4,
 };
var waktu = [0, 1, 2, 3, 4,5,6,7,8,9,10,11,12];
// Script memunculkan grafik
var chart = ui.Chart.image.regions(
  image_clip_L8, AreaPengerjaan, ee.Reducer.mean(), 30, 'MNDWI 2020', waktu)
   .setChartType('ScatterChart')
   .setOptions(options);
// Display grafik.
//print(chart);
// Membuat panel grafik
var panel2 = ui.Panel({style:{
                      width: '250px', 
                      height:'250px', 
                      position: 'bottom-right', 
                      padding: '15px 15px'},
                      layout: ui.Panel.Layout.flow('horizontal')})
      //.add(ui.Label('Grafik Indeks MNDWI 2020:'))
      .add(chart);
//Memberikan Keterangan
var header=ui.Label('DINAMIKA PANTAI DI KECAMATAN TELUK BETUNG TIMUR, KOTA BANDAR LAMPUNG',
{fontSize:'25px', color: 'blue', textAlign: 'center', fontWeight: 'bold'});
var text_1 = ui.Label('Dinamika Pantai menggunakan Citra Satelit Landsat 5 TM dan Landsat 8 OLI Multitemporal Tahun 2000-2020',
{fontSize:'15px'});
var text_2 = ui.Label('Disusun oleh: Iis Istikolah-1814221017-Jurusan Perikanan dan Kelautan, Fakultas Pertanian, Universitas Lampung',
{fontSize:'10px'});
var toolPanel = ui.Panel ([header,text_1,chart_area_daratan, panel, panel1, panel2, text_2],
'flow',{width:'300px'});
ui.root.widgets().add(toolPanel);
//Prepare the result
  // Image Visualize
    var imageVisParamL8 = {bands:['B4', 'B3', 'B2'],min:0.0237,max:0.125,gamma:2};
    var imageVisParamL5 = {bands:['B3', 'B2', 'B1'],min:0.0237,max:0.125,gamma:2};
    var imageVisParamIndices = {min: 0, max: 2, palette:warna};
  //make a new variable to export
    //True Color
        var true_color_2000 = image_clip_L52000.visualize(imageVisParamL5);
        var true_color_2010 = image_clip_L5.visualize(imageVisParamL5);
        var true_color_2020 = image_clip_L8.visualize(imageVisParamL8);
    //LandCover
        var LandCover_2000 = classified_2000.visualize(imageVisParamIndices);
        var LandCover_2010 = classified_2010.visualize(imageVisParamIndices);
        var LandCover_2020 = classified_2020.visualize(imageVisParamIndices);
    // INDICESparams
        var MNDWI_2000 = image_clip_L52000.select(['MNDWI 2000']).visualize(INDICESparams);
        var MNDWI_2010 = image_clip_L5.select(['MNDWI 2010']).visualize(INDICESparams);
        var MNDWI_2020 = image_clip_L8.select(['MNDWI 2020']).visualize(INDICESparams);
/*
// Export Result
  //-------------Export Result 2020-------------
    //Export True Color
      Export.image.toDrive({
        image : true_color_2020,
        description : 'Print_true_color_2020',
        region : AreaPengerjaan ,
        scale : 30,
        maxPixels : 1e13 ,
        fileFormat : 'GeoTIFF'
      });
    //Export LandCover
    Export.image.toDrive({
        image : LandCover_2020,
        description : 'Print_LandCover_2020',
        region : AreaPengerjaan ,
        scale : 30,
        maxPixels : 1e13 ,
        fileFormat : 'GeoTIFF'
      });
    //MNDWI
    Export.image.toDrive({
        image : image_clip_L8,
        description : 'Print_MNDWI_2020',
        region : AreaPengerjaan ,
        scale : 30,
        maxPixels : 1e13 ,
        fileFormat : 'GeoTIFF'
      });
  //  //-------------Export Result 2010-------------
    //Export True Color
    Export.image.toDrive({
        image : true_color_2010,
        description : 'Print_true_color_2010',
        region : AreaPengerjaan ,
        scale : 30,
        maxPixels : 1e13 ,
        fileFormat : 'GeoTIFF'
      });
    //Export LandCover
    Export.image.toDrive({
        image : LandCover_2010,
        description : 'Print_LandCover_2010',
        region : AreaPengerjaan ,
        scale : 30,
        maxPixels : 1e13 ,
        fileFormat : 'GeoTIFF'
      });
    //MNDWI
    Export.image.toDrive({
        image : image_clip_L5,
        description : 'Print_MNDWI_2010',
        region : AreaPengerjaan ,
        scale : 30,
        maxPixels : 1e13 ,
        fileFormat : 'GeoTIFF'
      });
     //  //-------------Export Result 2000-------------
    //Export True Color
    Export.image.toDrive({
        image : true_color_2000,
        description : 'Print_true_color_2000',
        region : AreaPengerjaan ,
        scale : 30,
        maxPixels : 1e13 ,
        fileFormat : 'GeoTIFF'
      });
    //Export LandCover
    Export.image.toDrive({
        image : LandCover_2000,
        description : 'Print_LandCover_2000',
        region : AreaPengerjaan ,
        scale : 30,
        maxPixels : 1e13 ,
        fileFormat : 'GeoTIFF'
      });
    //MNDWI
    Export.image.toDrive({
        image : image_clip_L52000,
        description : 'Print_MNDWI_2000',
        region : AreaPengerjaan ,
        scale : 30,
        maxPixels : 1e13 ,
        fileFormat : 'GeoTIFF'
      });
*/