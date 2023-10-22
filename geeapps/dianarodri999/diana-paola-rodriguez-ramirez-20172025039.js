var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -74.88642099502903,
                1.1069064690173025
              ],
              [
                -74.88642099502903,
                0.8762282828656378
              ],
              [
                -74.54859140518528,
                0.8762282828656378
              ],
              [
                -74.54859140518528,
                1.1069064690173025
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
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-74.88642099502903, 1.1069064690173025],
          [-74.88642099502903, 0.8762282828656378],
          [-74.54859140518528, 0.8762282828656378],
          [-74.54859140518528, 1.1069064690173025]]], null, false),
    imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
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
    imageVisParam2 = ui.import && ui.import("imageVisParam2", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "B5",
          "B3",
          "B2"
        ],
        "min": 0.08628928067122414,
        "max": 0.14259269815638498,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["B5","B3","B2"],"min":0.08628928067122414,"max":0.14259269815638498,"gamma":1},
    Nubes = ui.import && ui.import("Nubes", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -76.0163476560902,
            0.9675667779825521
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.7252099607777,
            0.925000563541791
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.61397338851208,
            0.8302546102615491
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.68950439437145,
            0.9730591543434002
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -76.0163476560902,
            0.8275083156357459
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.98064208968395,
            0.8769413218879726
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.78288818343395,
            0.736879564101275
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.54256225569958,
            0.710789117187076
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.55217529280895,
            2.1090278206412645
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.56178832991833,
            2.1357886243158424
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.40042663558239,
            2.121379018348483
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.39973999007458,
            2.158432017428627
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.37227416976208,
            2.121379018348483
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.38257385237927,
            2.187250393141731
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.37982727034802,
            2.2160682152563163
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.32832885726208,
            2.1742135770261632
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.34000183089489,
            2.1954841134110445
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.57758117659802,
            2.163235118182871
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.56865478499645,
            2.211951417695358
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.6263330076527,
            2.077463204603993
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.67439819319958,
            2.0953041526593252
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.61603332503552,
            2.054818634395821
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.57964111312145,
            2.098735080960378
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.55286193831677,
            2.089814651748273
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.57620788558239,
            2.0747184254350426
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.41621948226208,
            2.063739261187837
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.42227054579968,
            2.0283566751040296
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.4172494505238,
            2.028571117364159
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.41664863570446,
            2.034232382740449
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.41493202193493,
            2.0281422328154908
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.42111183150524,
            2.018878298855241
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.40669227584118,
            2.06030825679424
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.39330268843884,
            2.0740322298982656
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "tc": 1
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
            ee.Geometry.Point([-76.0163476560902, 0.9675667779825521]),
            {
              "tc": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.7252099607777, 0.925000563541791]),
            {
              "tc": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.61397338851208, 0.8302546102615491]),
            {
              "tc": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.68950439437145, 0.9730591543434002]),
            {
              "tc": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.0163476560902, 0.8275083156357459]),
            {
              "tc": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.98064208968395, 0.8769413218879726]),
            {
              "tc": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.78288818343395, 0.736879564101275]),
            {
              "tc": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.54256225569958, 0.710789117187076]),
            {
              "tc": 1,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.55217529280895, 2.1090278206412645]),
            {
              "tc": 1,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.56178832991833, 2.1357886243158424]),
            {
              "tc": 1,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.40042663558239, 2.121379018348483]),
            {
              "tc": 1,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.39973999007458, 2.158432017428627]),
            {
              "tc": 1,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.37227416976208, 2.121379018348483]),
            {
              "tc": 1,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.38257385237927, 2.187250393141731]),
            {
              "tc": 1,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.37982727034802, 2.2160682152563163]),
            {
              "tc": 1,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.32832885726208, 2.1742135770261632]),
            {
              "tc": 1,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.34000183089489, 2.1954841134110445]),
            {
              "tc": 1,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.57758117659802, 2.163235118182871]),
            {
              "tc": 1,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.56865478499645, 2.211951417695358]),
            {
              "tc": 1,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.6263330076527, 2.077463204603993]),
            {
              "tc": 1,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.67439819319958, 2.0953041526593252]),
            {
              "tc": 1,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.61603332503552, 2.054818634395821]),
            {
              "tc": 1,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.57964111312145, 2.098735080960378]),
            {
              "tc": 1,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.55286193831677, 2.089814651748273]),
            {
              "tc": 1,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.57620788558239, 2.0747184254350426]),
            {
              "tc": 1,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.41621948226208, 2.063739261187837]),
            {
              "tc": 1,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.42227054579968, 2.0283566751040296]),
            {
              "tc": 1,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.4172494505238, 2.028571117364159]),
            {
              "tc": 1,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.41664863570446, 2.034232382740449]),
            {
              "tc": 1,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.41493202193493, 2.0281422328154908]),
            {
              "tc": 1,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.42111183150524, 2.018878298855241]),
            {
              "tc": 1,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.40669227584118, 2.06030825679424]),
            {
              "tc": 1,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.39330268843884, 2.0740322298982656]),
            {
              "tc": 1,
              "system:index": "32"
            })]),
    Sombras = ui.import && ui.import("Sombras", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -75.41304374678845,
            2.2666695770401053
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.41407371505016,
            2.262895976710834
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.41750694258923,
            2.259465422434119
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.4242017362904,
            2.2556918033697517
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.42643333419079,
            2.2520897033119636
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.42797828658337,
            2.249859827383683
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.42900825484509,
            2.246086183431832
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.42694831832165,
            2.243170179155076
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.40205741866345,
            2.2922268831458226
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.3996541593861,
            2.2891394474801285
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.39999748214001,
            2.2860520051639077
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.40205741866345,
            2.283307606418037
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.4048040006947,
            2.2805632024308022
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.38386131270641,
            2.3148678739667505
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.26129508956188,
            2.294971264813845
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.26026512130016,
            2.291540786906421
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.23657585128063,
            2.1973710012567667
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.27107978804821,
            2.2110937500980326
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.26970649703259,
            2.2069769387342175
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.29150749190563,
            2.2285900707239827
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.39776588423962,
            2.2253309678849216
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.40343070967907,
            2.215382083123808
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.41716361983532,
            2.203889322729178
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.4238584135365,
            2.193597223183062
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.20584846480602,
            2.2253309678849216
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.17769599898571,
            2.2236156477070184
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.18267417891735,
            2.2164112812033316
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.07366920455212,
            2.2508890013129115
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.29339576705212,
            2.267012631127939
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.09548397448084,
            2.0976803763613927
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.05978196468254,
            2.095954201279129
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.08810609187981,
            2.1031591390187443
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.4147776922216,
            1.9681469244269225
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "tc": 2
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
            ee.Geometry.Point([-75.41304374678845, 2.2666695770401053]),
            {
              "tc": 2,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.41407371505016, 2.262895976710834]),
            {
              "tc": 2,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.41750694258923, 2.259465422434119]),
            {
              "tc": 2,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.4242017362904, 2.2556918033697517]),
            {
              "tc": 2,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.42643333419079, 2.2520897033119636]),
            {
              "tc": 2,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.42797828658337, 2.249859827383683]),
            {
              "tc": 2,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.42900825484509, 2.246086183431832]),
            {
              "tc": 2,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.42694831832165, 2.243170179155076]),
            {
              "tc": 2,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.40205741866345, 2.2922268831458226]),
            {
              "tc": 2,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.3996541593861, 2.2891394474801285]),
            {
              "tc": 2,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.39999748214001, 2.2860520051639077]),
            {
              "tc": 2,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.40205741866345, 2.283307606418037]),
            {
              "tc": 2,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.4048040006947, 2.2805632024308022]),
            {
              "tc": 2,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.38386131270641, 2.3148678739667505]),
            {
              "tc": 2,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.26129508956188, 2.294971264813845]),
            {
              "tc": 2,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.26026512130016, 2.291540786906421]),
            {
              "tc": 2,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.23657585128063, 2.1973710012567667]),
            {
              "tc": 2,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.27107978804821, 2.2110937500980326]),
            {
              "tc": 2,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.26970649703259, 2.2069769387342175]),
            {
              "tc": 2,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.29150749190563, 2.2285900707239827]),
            {
              "tc": 2,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.39776588423962, 2.2253309678849216]),
            {
              "tc": 2,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.40343070967907, 2.215382083123808]),
            {
              "tc": 2,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.41716361983532, 2.203889322729178]),
            {
              "tc": 2,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.4238584135365, 2.193597223183062]),
            {
              "tc": 2,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.20584846480602, 2.2253309678849216]),
            {
              "tc": 2,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.17769599898571, 2.2236156477070184]),
            {
              "tc": 2,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.18267417891735, 2.2164112812033316]),
            {
              "tc": 2,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.07366920455212, 2.2508890013129115]),
            {
              "tc": 2,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.29339576705212, 2.267012631127939]),
            {
              "tc": 2,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.09548397448084, 2.0976803763613927]),
            {
              "tc": 2,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.05978196468254, 2.095954201279129]),
            {
              "tc": 2,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.08810609187981, 2.1031591390187443]),
            {
              "tc": 2,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.4147776922216, 1.9681469244269225]),
            {
              "tc": 2,
              "system:index": "32"
            })]),
    Bosques = ui.import && ui.import("Bosques", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -74.31949479977057,
            1.7278488469442665
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.32541711727545,
            1.7335968796718109
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.33872087398932,
            1.7160095606072934
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.35871942440436,
            1.7275056802604334
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.35974939266607,
            1.714465300453494
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.28584916988775,
            1.7410607170102013
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.26833970943854,
            1.7237308426497817
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.43416459957525,
            1.6962772540900939
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.45236070553229,
            1.7148084694842585
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.42317827145025,
            1.7539293325988288
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.55947740475104,
            1.6890706222840435
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.6453080932276,
            1.7227013401836182
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.28413255611822,
            1.861335863176038
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.29649217525885,
            1.9176101790342095
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.49905260006354,
            1.8194720942207774
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.47776658932135,
            1.8036871409859754
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.39742906490729,
            1.8757477514789418
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.37133653561041,
            1.8874144312892966
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.36172349850104,
            1.8201583934103174
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.29237230221197,
            1.80643236011519
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.52003365793642,
            1.96427528366478
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.46201211252627,
            2.018487516325266
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.46269875803408,
            1.948491642610304
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.51454049387392,
            1.9409428923503305
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.55470925608095,
            2.0164288566604953
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.5735920075458,
            2.019516845180229
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.57221871653017,
            1.9292765757009254
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.35661202707705,
            2.0143701943914483
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.40673714914736,
            1.9625596777087462
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.62800866403994,
            2.080589178571707
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.63470345774111,
            2.055542941934365
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.58543664255556,
            2.0577731023002994
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.5735920075458,
            2.0527981248996263
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.78370553293642,
            2.042676571398642
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.77443581858095,
            2.0241488169534243
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.76516610422549,
            2.0179728516533717
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.83863717356142,
            2.0708109003758666
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.15913901399803,
            2.0755267892605516
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.13647971224022,
            2.0666062286470486
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.01769003938865,
            2.0988572477339322
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.03622946809959,
            2.133852281447141
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.24084982942772,
            2.0446477125291733
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.20651755403709,
            2.0405304572116276
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.16463217806053,
            2.0473925435407323
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "tc": 3
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
            ee.Geometry.Point([-74.31949479977057, 1.7278488469442665]),
            {
              "tc": 3,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.32541711727545, 1.7335968796718109]),
            {
              "tc": 3,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.33872087398932, 1.7160095606072934]),
            {
              "tc": 3,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.35871942440436, 1.7275056802604334]),
            {
              "tc": 3,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.35974939266607, 1.714465300453494]),
            {
              "tc": 3,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.28584916988775, 1.7410607170102013]),
            {
              "tc": 3,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.26833970943854, 1.7237308426497817]),
            {
              "tc": 3,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.43416459957525, 1.6962772540900939]),
            {
              "tc": 3,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.45236070553229, 1.7148084694842585]),
            {
              "tc": 3,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.42317827145025, 1.7539293325988288]),
            {
              "tc": 3,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.55947740475104, 1.6890706222840435]),
            {
              "tc": 3,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.6453080932276, 1.7227013401836182]),
            {
              "tc": 3,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.28413255611822, 1.861335863176038]),
            {
              "tc": 3,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.29649217525885, 1.9176101790342095]),
            {
              "tc": 3,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.49905260006354, 1.8194720942207774]),
            {
              "tc": 3,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.47776658932135, 1.8036871409859754]),
            {
              "tc": 3,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.39742906490729, 1.8757477514789418]),
            {
              "tc": 3,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.37133653561041, 1.8874144312892966]),
            {
              "tc": 3,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.36172349850104, 1.8201583934103174]),
            {
              "tc": 3,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.29237230221197, 1.80643236011519]),
            {
              "tc": 3,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.52003365793642, 1.96427528366478]),
            {
              "tc": 3,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.46201211252627, 2.018487516325266]),
            {
              "tc": 3,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.46269875803408, 1.948491642610304]),
            {
              "tc": 3,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.51454049387392, 1.9409428923503305]),
            {
              "tc": 3,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.55470925608095, 2.0164288566604953]),
            {
              "tc": 3,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.5735920075458, 2.019516845180229]),
            {
              "tc": 3,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.57221871653017, 1.9292765757009254]),
            {
              "tc": 3,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.35661202707705, 2.0143701943914483]),
            {
              "tc": 3,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.40673714914736, 1.9625596777087462]),
            {
              "tc": 3,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.62800866403994, 2.080589178571707]),
            {
              "tc": 3,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.63470345774111, 2.055542941934365]),
            {
              "tc": 3,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.58543664255556, 2.0577731023002994]),
            {
              "tc": 3,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.5735920075458, 2.0527981248996263]),
            {
              "tc": 3,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.78370553293642, 2.042676571398642]),
            {
              "tc": 3,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.77443581858095, 2.0241488169534243]),
            {
              "tc": 3,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.76516610422549, 2.0179728516533717]),
            {
              "tc": 3,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.83863717356142, 2.0708109003758666]),
            {
              "tc": 3,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.15913901399803, 2.0755267892605516]),
            {
              "tc": 3,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.13647971224022, 2.0666062286470486]),
            {
              "tc": 3,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.01769003938865, 2.0988572477339322]),
            {
              "tc": 3,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.03622946809959, 2.133852281447141]),
            {
              "tc": 3,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.24084982942772, 2.0446477125291733]),
            {
              "tc": 3,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.20651755403709, 2.0405304572116276]),
            {
              "tc": 3,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.16463217806053, 2.0473925435407323]),
            {
              "tc": 3,
              "system:index": "43"
            })]),
    Agua = ui.import && ui.import("Agua", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -74.81022721567568,
            2.0517688172961375
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.8112571839374,
            2.0465364934092487
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.81413251200136,
            2.0449067496927142
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.81773740091738,
            2.035685800159608
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.80898267069277,
            2.0277943409880237
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.80752354898867,
            2.0239343741077165
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.81130009928164,
            2.021446835025479
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.81636410990176,
            2.031396968436395
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.81464749613222,
            2.0304534239283205
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.79842549601015,
            2.017415298074991
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.81103919783307,
            2.01695027078954
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.80245612898541,
            2.0190947071962384
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.79679130354596,
            2.0005666835718494
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.79962371626569,
            2.0127471672359305
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.8087217692442,
            1.9941332929858118
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.80992339888287,
            1.9925034967078632
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.81000922957135,
            1.9885576674634804
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.80786346235944,
            1.9737085084167902
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.80825217699164,
            1.87065121148077
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.80747970079535,
            1.8691070817633884
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.79014190172309,
            1.8560677101069296
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.7827604625141,
            1.8548667105022691
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.78207381700629,
            1.8520357796379245
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.80902465318793,
            1.8554672104065297
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.8113420817768,
            1.86164376900495
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.68270155035391,
            1.8695325407503804
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.68218656622305,
            1.8710123313979126
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.68261571966543,
            1.8669160962633724
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.75606229208269,
            1.850052873013052
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.75580480001726,
            1.8513825547129148
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.75711371801653,
            1.8513825547129148
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.75659873388567,
            1.8518972699418885
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.806234224418,
            2.1720390075723297
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.80535445986112,
            2.1753839957171888
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.80507551012357,
            2.1738401559560288
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.80563340959867,
            2.1731111199642794
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.77559845976941,
            2.1725767641601315
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.77686446242444,
            2.173884740710379
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.77744381957166,
            2.175257042757777
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.77381747298352,
            2.1709257101761046
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.07947199788147,
            1.8106034734495147
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.08496516194397,
            1.8184959371349076
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.08393519368225,
            1.8281041071922597
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.06282084431702,
            1.7970489448359512
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.070202283526,
            1.7946468659580104
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.05475275960022,
            1.783151159145893
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.07483714070374,
            1.8147212848870207
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "tc": 4
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
            ee.Geometry.Point([-74.81022721567568, 2.0517688172961375]),
            {
              "tc": 4,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.8112571839374, 2.0465364934092487]),
            {
              "tc": 4,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.81413251200136, 2.0449067496927142]),
            {
              "tc": 4,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.81773740091738, 2.035685800159608]),
            {
              "tc": 4,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.80898267069277, 2.0277943409880237]),
            {
              "tc": 4,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.80752354898867, 2.0239343741077165]),
            {
              "tc": 4,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.81130009928164, 2.021446835025479]),
            {
              "tc": 4,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.81636410990176, 2.031396968436395]),
            {
              "tc": 4,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.81464749613222, 2.0304534239283205]),
            {
              "tc": 4,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.79842549601015, 2.017415298074991]),
            {
              "tc": 4,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.81103919783307, 2.01695027078954]),
            {
              "tc": 4,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.80245612898541, 2.0190947071962384]),
            {
              "tc": 4,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.79679130354596, 2.0005666835718494]),
            {
              "tc": 4,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.79962371626569, 2.0127471672359305]),
            {
              "tc": 4,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.8087217692442, 1.9941332929858118]),
            {
              "tc": 4,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.80992339888287, 1.9925034967078632]),
            {
              "tc": 4,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.81000922957135, 1.9885576674634804]),
            {
              "tc": 4,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.80786346235944, 1.9737085084167902]),
            {
              "tc": 4,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.80825217699164, 1.87065121148077]),
            {
              "tc": 4,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.80747970079535, 1.8691070817633884]),
            {
              "tc": 4,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.79014190172309, 1.8560677101069296]),
            {
              "tc": 4,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.7827604625141, 1.8548667105022691]),
            {
              "tc": 4,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.78207381700629, 1.8520357796379245]),
            {
              "tc": 4,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.80902465318793, 1.8554672104065297]),
            {
              "tc": 4,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.8113420817768, 1.86164376900495]),
            {
              "tc": 4,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.68270155035391, 1.8695325407503804]),
            {
              "tc": 4,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.68218656622305, 1.8710123313979126]),
            {
              "tc": 4,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.68261571966543, 1.8669160962633724]),
            {
              "tc": 4,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.75606229208269, 1.850052873013052]),
            {
              "tc": 4,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.75580480001726, 1.8513825547129148]),
            {
              "tc": 4,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.75711371801653, 1.8513825547129148]),
            {
              "tc": 4,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.75659873388567, 1.8518972699418885]),
            {
              "tc": 4,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.806234224418, 2.1720390075723297]),
            {
              "tc": 4,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.80535445986112, 2.1753839957171888]),
            {
              "tc": 4,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.80507551012357, 2.1738401559560288]),
            {
              "tc": 4,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.80563340959867, 2.1731111199642794]),
            {
              "tc": 4,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.77559845976941, 2.1725767641601315]),
            {
              "tc": 4,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.77686446242444, 2.173884740710379]),
            {
              "tc": 4,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.77744381957166, 2.175257042757777]),
            {
              "tc": 4,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.77381747298352, 2.1709257101761046]),
            {
              "tc": 4,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.07947199788147, 1.8106034734495147]),
            {
              "tc": 4,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.08496516194397, 1.8184959371349076]),
            {
              "tc": 4,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.08393519368225, 1.8281041071922597]),
            {
              "tc": 4,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.06282084431702, 1.7970489448359512]),
            {
              "tc": 4,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.070202283526, 1.7946468659580104]),
            {
              "tc": 4,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.05475275960022, 1.783151159145893]),
            {
              "tc": 4,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.07483714070374, 1.8147212848870207]),
            {
              "tc": 4,
              "system:index": "46"
            })]),
    Arena = ui.import && ui.import("Arena", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -75.07324927296692,
            1.8003946922925425
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.07204764332825,
            1.8036975395274675
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.07213347401672,
            1.7963197426532354
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.07372134175354,
            1.8001373273214643
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.07200472798401,
            1.8032685986666717
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.0718759819513,
            1.795719222990097
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.0858570141856,
            1.8271772821049421
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.08401165438336,
            1.8254186467651965
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.09070644808453,
            1.8300511459043571
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.09199390841168,
            1.8311234819634081
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.09540476849206,
            1.8548907917757393
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.09561934521325,
            1.853561112709147
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.09699263622888,
            1.8525745759821168
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.09967485355841,
            1.8475576223207724
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.09924570011603,
            1.846099258551368
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.09722867893683,
            1.8451556107688383
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.09572664188849,
            1.8447695728953024
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.14704813821791,
            1.8974841796492006
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.14610400064467,
            1.8973126123906812
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.14481654031752,
            1.8982991238946916
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -75.13752093179701,
            1.9055907131858911
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.78009353501898,
            2.1074534252954655
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.7441304765473,
            2.1203192671582194
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "tc": 5
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
            ee.Geometry.Point([-75.07324927296692, 1.8003946922925425]),
            {
              "tc": 5,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.07204764332825, 1.8036975395274675]),
            {
              "tc": 5,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.07213347401672, 1.7963197426532354]),
            {
              "tc": 5,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.07372134175354, 1.8001373273214643]),
            {
              "tc": 5,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.07200472798401, 1.8032685986666717]),
            {
              "tc": 5,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.0718759819513, 1.795719222990097]),
            {
              "tc": 5,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.0858570141856, 1.8271772821049421]),
            {
              "tc": 5,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.08401165438336, 1.8254186467651965]),
            {
              "tc": 5,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.09070644808453, 1.8300511459043571]),
            {
              "tc": 5,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.09199390841168, 1.8311234819634081]),
            {
              "tc": 5,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.09540476849206, 1.8548907917757393]),
            {
              "tc": 5,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.09561934521325, 1.853561112709147]),
            {
              "tc": 5,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.09699263622888, 1.8525745759821168]),
            {
              "tc": 5,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.09967485355841, 1.8475576223207724]),
            {
              "tc": 5,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.09924570011603, 1.846099258551368]),
            {
              "tc": 5,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.09722867893683, 1.8451556107688383]),
            {
              "tc": 5,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.09572664188849, 1.8447695728953024]),
            {
              "tc": 5,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.14704813821791, 1.8974841796492006]),
            {
              "tc": 5,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.14610400064467, 1.8973126123906812]),
            {
              "tc": 5,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.14481654031752, 1.8982991238946916]),
            {
              "tc": 5,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([-75.13752093179701, 1.9055907131858911]),
            {
              "tc": 5,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.78009353501898, 2.1074534252954655]),
            {
              "tc": 5,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.7441304765473, 2.1203192671582194]),
            {
              "tc": 5,
              "system:index": "22"
            })]),
    Cultivos = ui.import && ui.import("Cultivos", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -74.79721675737005,
            2.065780252015313
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.79936252458197,
            2.063164115192595
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.81725822312933,
            2.0631212276678306
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.8144258104096,
            2.0615772760063606
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.8010791383515,
            2.0653084899557164
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.80176578385931,
            2.0513271145537124
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.80451236589056,
            2.056216321116356
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.81283794267279,
            2.0499547030064194
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.81163631303411,
            2.060076210455198
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.79962900875684,
            2.195054250206566
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.79267672299024,
            2.1967267195801248
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.77169111965772,
            2.194882714780374
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.77289274929639,
            2.2000287689972455
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.7600181460249,
            2.1921381452854702
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.75246504543897,
            2.2010579777112333
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.75006178616162,
            2.2046602026122812
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.78387907742139,
            2.2116930927542535
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.7461135744917,
            2.185276699544785
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.69195441006299,
            1.9076202340493853
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.68113974331494,
            1.9076202340493853
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.69092444180127,
            1.9119951676477076
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.72997740505811,
            1.902044322163256
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.67719153164502,
            1.8968115269240537
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.65719298122998,
            1.902044322163256
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.65144232510205,
            1.9036742059654514
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.66149786524889,
            1.8384571241811118
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.66321447901842,
            1.8456631762316347
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.68450048976061,
            1.820613441761751
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.58766929773084,
            1.7601252646669094
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.56930153039686,
            1.786720033471163
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.579772874391,
            1.7940978690887242
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.55797187951795,
            1.7915242088746834
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.54818718103162,
            1.778655853669035
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.54183571008436,
            1.774709540060677
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.6599387374281,
            1.7791705896047938
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.68980781701795,
            1.783803206557641
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.71984855798475,
            1.6808534676979565
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.55162040857068,
            1.6787944164431279
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.49977867273084,
            1.6969826271932424
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.51454155114881,
            1.694923593018934
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.43592064050428,
            1.7093367861093207
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.51110832360975,
            1.7484577621692554
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.51883308557264,
            1.7529188746557351
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.55093376306287,
            1.7430529386084164
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.53991624088155,
            1.404983163091336
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.55708237857687,
            1.3821589529373866
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.53339310855733,
            1.3888517893356096
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "tc": 6
      },
      "color": "#ff0000",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #ff0000 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([-74.79721675737005, 2.065780252015313]),
            {
              "tc": 6,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.79936252458197, 2.063164115192595]),
            {
              "tc": 6,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.81725822312933, 2.0631212276678306]),
            {
              "tc": 6,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.8144258104096, 2.0615772760063606]),
            {
              "tc": 6,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.8010791383515, 2.0653084899557164]),
            {
              "tc": 6,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.80176578385931, 2.0513271145537124]),
            {
              "tc": 6,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.80451236589056, 2.056216321116356]),
            {
              "tc": 6,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.81283794267279, 2.0499547030064194]),
            {
              "tc": 6,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.81163631303411, 2.060076210455198]),
            {
              "tc": 6,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.79962900875684, 2.195054250206566]),
            {
              "tc": 6,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.79267672299024, 2.1967267195801248]),
            {
              "tc": 6,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.77169111965772, 2.194882714780374]),
            {
              "tc": 6,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.77289274929639, 2.2000287689972455]),
            {
              "tc": 6,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.7600181460249, 2.1921381452854702]),
            {
              "tc": 6,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.75246504543897, 2.2010579777112333]),
            {
              "tc": 6,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.75006178616162, 2.2046602026122812]),
            {
              "tc": 6,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.78387907742139, 2.2116930927542535]),
            {
              "tc": 6,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.7461135744917, 2.185276699544785]),
            {
              "tc": 6,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.69195441006299, 1.9076202340493853]),
            {
              "tc": 6,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.68113974331494, 1.9076202340493853]),
            {
              "tc": 6,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.69092444180127, 1.9119951676477076]),
            {
              "tc": 6,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.72997740505811, 1.902044322163256]),
            {
              "tc": 6,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.67719153164502, 1.8968115269240537]),
            {
              "tc": 6,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.65719298122998, 1.902044322163256]),
            {
              "tc": 6,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.65144232510205, 1.9036742059654514]),
            {
              "tc": 6,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.66149786524889, 1.8384571241811118]),
            {
              "tc": 6,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.66321447901842, 1.8456631762316347]),
            {
              "tc": 6,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.68450048976061, 1.820613441761751]),
            {
              "tc": 6,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.58766929773084, 1.7601252646669094]),
            {
              "tc": 6,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.56930153039686, 1.786720033471163]),
            {
              "tc": 6,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.579772874391, 1.7940978690887242]),
            {
              "tc": 6,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.55797187951795, 1.7915242088746834]),
            {
              "tc": 6,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.54818718103162, 1.778655853669035]),
            {
              "tc": 6,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.54183571008436, 1.774709540060677]),
            {
              "tc": 6,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.6599387374281, 1.7791705896047938]),
            {
              "tc": 6,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.68980781701795, 1.783803206557641]),
            {
              "tc": 6,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.71984855798475, 1.6808534676979565]),
            {
              "tc": 6,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.55162040857068, 1.6787944164431279]),
            {
              "tc": 6,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.49977867273084, 1.6969826271932424]),
            {
              "tc": 6,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.51454155114881, 1.694923593018934]),
            {
              "tc": 6,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.43592064050428, 1.7093367861093207]),
            {
              "tc": 6,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.51110832360975, 1.7484577621692554]),
            {
              "tc": 6,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.51883308557264, 1.7529188746557351]),
            {
              "tc": 6,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.55093376306287, 1.7430529386084164]),
            {
              "tc": 6,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.53991624088155, 1.404983163091336]),
            {
              "tc": 6,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.55708237857687, 1.3821589529373866]),
            {
              "tc": 6,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.53339310855733, 1.3888517893356096]),
            {
              "tc": 6,
              "system:index": "46"
            })]),
    imageVisParam3 = ui.import && ui.import("imageVisParam3", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "IMAGEN FINAL CLASIFICADA"
        ],
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["IMAGEN FINAL CLASIFICADA"],"gamma":1},
    imageVisParam4 = ui.import && ui.import("imageVisParam4", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "BOSQUES"
        ],
        "palette": [
          "3bff18"
        ]
      }
    }) || {"opacity":1,"bands":["BOSQUES"],"palette":["3bff18"]},
    imageVisParam5 = ui.import && ui.import("imageVisParam5", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "NUBES"
        ],
        "palette": [
          "e7fffc"
        ]
      }
    }) || {"opacity":1,"bands":["NUBES"],"palette":["e7fffc"]},
    imageVisParam6 = ui.import && ui.import("imageVisParam6", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "SOMBRAS"
        ],
        "palette": [
          "171618"
        ]
      }
    }) || {"opacity":1,"bands":["SOMBRAS"],"palette":["171618"]},
    imageVisParam7 = ui.import && ui.import("imageVisParam7", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "AGUA"
        ],
        "palette": [
          "41e5ff"
        ]
      }
    }) || {"opacity":1,"bands":["AGUA"],"palette":["41e5ff"]},
    imageVisParam8 = ui.import && ui.import("imageVisParam8", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "CULTIVOS"
        ],
        "palette": [
          "ff9c56"
        ]
      }
    }) || {"opacity":1,"bands":["CULTIVOS"],"palette":["ff9c56"]},
    imageVisParam9 = ui.import && ui.import("imageVisParam9", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "ARENA"
        ],
        "palette": [
          "e7fffc"
        ]
      }
    }) || {"opacity":1,"bands":["ARENA"],"palette":["e7fffc"]};
// COMENTARIO PARA DETALLAR PROCESOS
var Coleccionlandsat= ee.ImageCollection("LANDSAT/LC08/C02/T1_TOA")
//Filtramos la totalidad de imagenes por fecha, geometria de coordenadas y porcentaje de nubes
.filterDate('2020-01-01','2022-02-15') //fechas
.filterBounds(geometry) //geometria
.filterMetadata ('CLOUD_COVER','Less_Than',30); //nubosidad
print(Coleccionlandsat)
//Llamamos a la imagen satelite especifica añadiendo su ID de la coleccion de imagen
var ImagenLandSat = ee.Image('LANDSAT/LC08/C02/T1_TOA/LC08_008059_20200322') 
print(ImagenLandSat)
//Añadimos la imagen a la vista haciendo una composicion de colores y asignando un nombre de etiqueta
Map.addLayer (ImagenLandSat, imageVisParam2, 'IMAGEN LANDSAT') ;
//CARGAMOS LA IMAGEN, IMPRIMIMOS LAS CARACTERISTICAS Y LA ADICIONAMOS
//EN EL ESPACIO DE TRABAJO
Map.centerObject (ImagenLandSat);
//ARMAMOS LAS CLASES
var ZONAS = Nubes.merge(Sombras).merge(Agua).merge(Bosques).merge(Cultivos).merge(Arena);
print (ZONAS,'ZONAS DE ENTRENAMIENTO');
//RELACIONAMOS LAS ZONAS DE ENTRENAMIENTO CON LA IMAGEN
var ENTRENAMIENTO = ImagenLandSat.sampleRegions({
  collection: ZONAS,
  properties: ['tc'],
  scale:3});
print (ENTRENAMIENTO,'ENTRENAMIENTO');
//SELECCIONAMOS EL CLASIFICADOR
var CLASIFICADOR = ee.Classifier.smileCart();
//COMENZAMOS A CLASIFICAR LA IMAGEN
var IMAGEN_CLASIF = CLASIFICADOR.train({
  features:ENTRENAMIENTO,
  classProperty:'tc',
  inputProperties:['B1','B2','B3','B4','B5','B6','B7','B8','B9']
});
// CLASIFICAMOS LA IMAGEN CON EL CLASIFICADOR Y LAS ZONAS DE ENTRENAMIENTO
var CLASIFICACION_FINAL = ImagenLandSat.classify(IMAGEN_CLASIF,'IMAGEN FINAL CLASIFICADA');
print (CLASIFICACION_FINAL,'CLASIFICACION IMAGEN');
Map.addLayer(CLASIFICACION_FINAL,imageVisParam3,'Clasificacion final');
//RENOMBRAMOS LAS CLASES POR TEMATICAS
var CLASIFICACIONES = ['NUBES','SOMBRAS','AGUA','BOSQUES','CULTIVOS','ARENA'];
var RENOMBRE = CLASIFICACION_FINAL.eq([1,2,4,3,6,5]).rename(CLASIFICACIONES);
//DECLARAMOS LAS AREAS CLASIFICADAS
var AREA_CLASIFICADA = RENOMBRE.multiply(ee.Image.pixelArea().divide(10000))
//GENERAMOS LAS AREAS SUMANDO LOS VALORES POR CLASE
var AREA_CLASE = AREA_CLASIFICADA.reduceRegion({
  reducer:ee.Reducer.sum(),
  geometry:geometry,
  scale:3,
  maxPixels:1e12
});
//IMPRIMIMOS EL VALOR DE LAS AREAS
var areatotal = ee.Number(AREA_CLASE);
print(areatotal, 'AREA POR CLASE');
//SELECCIONAMOS LAS AREAS DE BOSQUE
var AREA_BOSQUE = RENOMBRE.select('BOSQUES');
var MASCARA_BOSQUE = RENOMBRE.updateMask(AREA_BOSQUE);
Map.addLayer(MASCARA_BOSQUE,imageVisParam4,'BOSQUES');
//SELECCIONAMOS LAS AREAS DE NUBE
var AREA_NUBE = RENOMBRE.select('NUBES');
var MASCARA_NUBE= RENOMBRE.updateMask(AREA_NUBE);
Map.addLayer(MASCARA_NUBE,imageVisParam5,'NUBES');
//SELECCIONAMOS LAS AREAS DE SOMBRA
var AREA_SOMBRA = RENOMBRE.select('SOMBRAS');
var MASCARA_SOMBRA= RENOMBRE.updateMask(AREA_SOMBRA);
Map.addLayer(MASCARA_SOMBRA,imageVisParam6,'SOMBRAS');
//SELECCIONAMOS LAS AREAS DE AGUA
var AREA_AGUA = RENOMBRE.select('AGUA');
var MASCARA_AGUA= RENOMBRE.updateMask(AREA_AGUA);
Map.addLayer(MASCARA_AGUA,imageVisParam7,'AGUA');
//SELECCIONAMOS LAS AREAS DE CULTIVO
var AREA_CULTIVO = RENOMBRE.select('CULTIVOS');
var MASCARA_CULTIVO= RENOMBRE.updateMask(AREA_CULTIVO);
Map.addLayer(MASCARA_CULTIVO,imageVisParam8,'CULTIVOS');
//SELECCIONAMOS LAS AREAS DE ARENA
var AREA_ARENA = RENOMBRE.select('ARENA');
var MASCARA_ARENA= RENOMBRE.updateMask(AREA_ARENA);
Map.addLayer(MASCARA_ARENA,imageVisParam9,'ARENA');
//Spacer object//
var spacer = ui.Label('           ');
/* Create UI Panels */
var panel = ui.Panel({style: {width:'33.333%'}});
ui.root.insert(0,panel);
/* Introduction */ 
var intro = ui.Label('Clasificación Supervisada de una imagen Landsat 8 para el departamento del Caqueta, Meta y Huila Colombia. ', 
  {fontWeight: 'bold', fontSize: '24px', margin: '10px 5px'}
);
var subtitle = ui.Label('', {});
var info = ui.Label('Para este trabajo se clasificaron 5 clases las cuales eran las que se notaban con mayor proporción en la imagen Landsat seleccionada, haciendo así que el proceso de clasificación fuese más efectivo para el resultado final, se seleccionaron las clases, nubes, sombras, agua, cultivos y bosques, a cada una se le asignó un color distintivo, después de esto se puede observar que la clase que predomina es cultivos, también se observó en el proceso que la clase arena, se confundía con la clase nubes. ', {});
var creditos1 = ui.Label('Hecho por: Diana Paola Rodriguez Ramirez, cod. 20172025039, Estudiante de Ingeniería Catastral y Geodesia.',{fontWeight: 'lighter ', fontSize: '14px', margin: '10px 5px'});
var creditos2 = ui.Label( 'Asignatura Procesamiento Digital de Imágenes. Universidad Distrital Francisco José de Caldas. Bogotá. Colombia.',{fontWeight: 'lighter ', fontSize: '14px', margin: '10px 5px'});
var titulo2 = ui.Label ('Histograma del NDVI',{fontWeight: 'bold', fontSize: '14px', margin: '10px 5px'});
var titulo3 =ui.Label ('Nota Aclaratoria:',{fontWeight: 'bold', fontSize: '14px', margin: '10px 5px'});
panel.add(intro).add(subtitle).add(info).add(creditos1).add(creditos2);
//LEYENDA
var ETIQUETAS = [
  'BOSQUES',
  'NUBES',
  'SOMBRAS',
  'AGUA',
  'CULTIVOS',
  ];
var TITULO = ui.Label ({
  value: 'CLASIFICACIÓN',
  style: {fontWeight:'bold',fontSize: '20px', margin:'0px 0px 15px 0px',}});
var LEYENDA = ui.Panel({
  style: {position:'bottom-left',padding:'10px 20px'
}});
LEYENDA.add(TITULO);
var SIMBOLOGIA = ['3bff18','e7fffc','171618','41e5ff','ff9c56'];
var SIMBOLOS = function(simbolo,texto){
var TEXTOLEYENDA = ui.Label({
  value:texto,
  style:{margin: '6px 0px 10 px 15px'}});
var CAJALEYENDA = ui.Label({
  style:{backgroundColor: '#'+simbolo,
  padding: '15px',
  margin: '0px 0px 6px 0px'}});
return ui.Panel({
  widgets: [CAJALEYENDA,TEXTOLEYENDA],
  layout: ui.Panel.Layout.Flow('horizontal')});};
  for (var i=0; i<5 ; i++){LEYENDA.add(SIMBOLOS(SIMBOLOGIA[i],ETIQUETAS[i]));}
  Map.add(LEYENDA);