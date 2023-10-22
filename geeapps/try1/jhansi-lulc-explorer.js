var table22 = ui.import && ui.import("table22", "table", {
      "id": "users/try1/India_CAFRI"
    }) || ee.FeatureCollection("users/try1/India_CAFRI"),
    a = ui.import && ui.import("a", "imageCollection", {
      "id": "COPERNICUS/S2"
    }) || ee.ImageCollection("COPERNICUS/S2"),
    Waterbody = ui.import && ui.import("Waterbody", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            78.52717208453085,
            25.501435903699388
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.53077697344686,
            25.501435903699388
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.53326606341268,
            25.49965411290735
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.53309440203573,
            25.49562561891222
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.5331802327242,
            25.491906889177518
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.52983283587362,
            25.494695947268397
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.52682876177694,
            25.498027237363043
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.52536964007284,
            25.496787698350992
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.5221939045992,
            25.495160783989494
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.52004813738729,
            25.495393201675657
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.53257941790487,
            25.483694286671838
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.5299186665621,
            25.481912232794716
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.66372960814022,
            25.516201394258612
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.66574662931941,
            25.51383886953676
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.66814988859676,
            25.515116962454364
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.67128270872615,
            25.523482325494573
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.67411512144588,
            25.523830869634
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.6736859680035,
            25.52170086186034
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.67205518492244,
            25.519725729960754
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.67016690977596,
            25.51798293952565
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.66733449705623,
            25.51356775716855
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.66518872984432,
            25.511669953447775
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.66454499968074,
            25.513800139235936
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.66317170866512,
            25.5141487114936
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.66587537535213,
            25.517363274605827
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.66909402617,
            25.515039502664905
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.67317098387264,
            25.51945463088851
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.67102521666072,
            25.51771183651687
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.6676349044659,
            25.518602601246315
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.73485713890882,
            25.48982599717487
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.732368048943,
            25.481380808145158
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.73211055687757,
            25.47649937328579
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.7320247261891,
            25.468983125830597
          ]
        },
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                79.60286019442951,
                25.920430345244206
              ],
              [
                79.60371850131428,
                25.91826882930448
              ],
              [
                79.604748469576,
                25.91649326870816
              ],
              [
                79.60500596164142,
                25.917496849721992
              ],
              [
                79.60389016269123,
                25.919735576585467
              ],
              [
                79.6032893478719,
                25.921433892744837
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
                79.67933533786213,
                25.918346026984732
              ],
              [
                79.67770455478107,
                25.91772844412748
              ],
              [
                79.67598794101154,
                25.914949281238123
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
                79.67667458651935,
                25.914640481318063
              ],
              [
                79.67787621615803,
                25.915952875393394
              ],
              [
                79.67667458651935,
                25.915721277500307
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 0
      },
      "color": "#1028d6",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #1028d6 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([78.52717208453085, 25.501435903699388]),
            {
              "landcover": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([78.53077697344686, 25.501435903699388]),
            {
              "landcover": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([78.53326606341268, 25.49965411290735]),
            {
              "landcover": 0,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([78.53309440203573, 25.49562561891222]),
            {
              "landcover": 0,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([78.5331802327242, 25.491906889177518]),
            {
              "landcover": 0,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([78.52983283587362, 25.494695947268397]),
            {
              "landcover": 0,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([78.52682876177694, 25.498027237363043]),
            {
              "landcover": 0,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([78.52536964007284, 25.496787698350992]),
            {
              "landcover": 0,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([78.5221939045992, 25.495160783989494]),
            {
              "landcover": 0,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([78.52004813738729, 25.495393201675657]),
            {
              "landcover": 0,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([78.53257941790487, 25.483694286671838]),
            {
              "landcover": 0,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([78.5299186665621, 25.481912232794716]),
            {
              "landcover": 0,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([78.66372960814022, 25.516201394258612]),
            {
              "landcover": 0,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([78.66574662931941, 25.51383886953676]),
            {
              "landcover": 0,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([78.66814988859676, 25.515116962454364]),
            {
              "landcover": 0,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([78.67128270872615, 25.523482325494573]),
            {
              "landcover": 0,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([78.67411512144588, 25.523830869634]),
            {
              "landcover": 0,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([78.6736859680035, 25.52170086186034]),
            {
              "landcover": 0,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([78.67205518492244, 25.519725729960754]),
            {
              "landcover": 0,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([78.67016690977596, 25.51798293952565]),
            {
              "landcover": 0,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([78.66733449705623, 25.51356775716855]),
            {
              "landcover": 0,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([78.66518872984432, 25.511669953447775]),
            {
              "landcover": 0,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([78.66454499968074, 25.513800139235936]),
            {
              "landcover": 0,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([78.66317170866512, 25.5141487114936]),
            {
              "landcover": 0,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([78.66587537535213, 25.517363274605827]),
            {
              "landcover": 0,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([78.66909402617, 25.515039502664905]),
            {
              "landcover": 0,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([78.67317098387264, 25.51945463088851]),
            {
              "landcover": 0,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([78.67102521666072, 25.51771183651687]),
            {
              "landcover": 0,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([78.6676349044659, 25.518602601246315]),
            {
              "landcover": 0,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([78.73485713890882, 25.48982599717487]),
            {
              "landcover": 0,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([78.732368048943, 25.481380808145158]),
            {
              "landcover": 0,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([78.73211055687757, 25.47649937328579]),
            {
              "landcover": 0,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([78.7320247261891, 25.468983125830597]),
            {
              "landcover": 0,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[79.60286019442951, 25.920430345244206],
                  [79.60371850131428, 25.91826882930448],
                  [79.604748469576, 25.91649326870816],
                  [79.60500596164142, 25.917496849721992],
                  [79.60389016269123, 25.919735576585467],
                  [79.6032893478719, 25.921433892744837]]]),
            {
              "landcover": 0,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[79.67933533786213, 25.918346026984732],
                  [79.67770455478107, 25.91772844412748],
                  [79.67598794101154, 25.914949281238123]]]),
            {
              "landcover": 0,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[79.67667458651935, 25.914640481318063],
                  [79.67787621615803, 25.915952875393394],
                  [79.67667458651935, 25.915721277500307]]]),
            {
              "landcover": 0,
              "system:index": "35"
            })]),
    Urban = ui.import && ui.import("Urban", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            78.58378267917541,
            25.458718204653184
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.58390069637207,
            25.45866976956866
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.58388996753601,
            25.45849540310304
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.58279562625793,
            25.459231615350497
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.58273125324158,
            25.459938762347512
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.58292437229065,
            25.459948449263823
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.58252740535644,
            25.45926067626785
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.58242011699585,
            25.45915411953652
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.58220554027466,
            25.459192867449758
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.58143306407837,
            25.459202554426117
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.58134723338989,
            25.459396293789435
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.58116484317688,
            25.459580345895738
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.58093953761963,
            25.460122813624125
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.58075714740662,
            25.45976439772053
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.58840680751709,
            25.46037467280965
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.58833170566467,
            25.460142187426346
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.58825660381225,
            25.459967823094107
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.58789182338623,
            25.458524464198202
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.58781672153381,
            25.458262914089218
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.58375049266724,
            25.457129523715317
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.58336425456909,
            25.458204791765592
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.58346081409363,
            25.458582586367427
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.58339644107727,
            25.459231615350497
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.58348227176575,
            25.45916380651599
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.56954016042488,
            25.456752139041843
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.56948115182655,
            25.456587456984753
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.56940604997413,
            25.456321059062418
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.56891788793342,
            25.455386239870098
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.56856920076149,
            25.457498049066874
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.56841899705665,
            25.45746414416601
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.56908954931038,
            25.456829636402478
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.55973347337978,
            25.457955538141785
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.55977638872402,
            25.45774726582024
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.55974956663387,
            25.4575680544644
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.56078489931362,
            25.45863847508607
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.56080635698574,
            25.458512543742376
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.56126233251827,
            25.459156729613433
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.56128379019039,
            25.459088920736765
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.56156810434597,
            25.458439890984156
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.56148763807552,
            25.458294585336123
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.56164320619838,
            25.45818802774938
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.56148763807552,
            25.458168653632566
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.56264635236995,
            25.458289741811505
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.56273218305843,
            25.458435047465365
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 1
      },
      "color": "#ff0707",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #ff0707 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([78.58378267917541, 25.458718204653184]),
            {
              "landcover": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([78.58390069637207, 25.45866976956866]),
            {
              "landcover": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([78.58388996753601, 25.45849540310304]),
            {
              "landcover": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([78.58279562625793, 25.459231615350497]),
            {
              "landcover": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([78.58273125324158, 25.459938762347512]),
            {
              "landcover": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([78.58292437229065, 25.459948449263823]),
            {
              "landcover": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([78.58252740535644, 25.45926067626785]),
            {
              "landcover": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([78.58242011699585, 25.45915411953652]),
            {
              "landcover": 1,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([78.58220554027466, 25.459192867449758]),
            {
              "landcover": 1,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([78.58143306407837, 25.459202554426117]),
            {
              "landcover": 1,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([78.58134723338989, 25.459396293789435]),
            {
              "landcover": 1,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([78.58116484317688, 25.459580345895738]),
            {
              "landcover": 1,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([78.58093953761963, 25.460122813624125]),
            {
              "landcover": 1,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([78.58075714740662, 25.45976439772053]),
            {
              "landcover": 1,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([78.58840680751709, 25.46037467280965]),
            {
              "landcover": 1,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([78.58833170566467, 25.460142187426346]),
            {
              "landcover": 1,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([78.58825660381225, 25.459967823094107]),
            {
              "landcover": 1,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([78.58789182338623, 25.458524464198202]),
            {
              "landcover": 1,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([78.58781672153381, 25.458262914089218]),
            {
              "landcover": 1,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([78.58375049266724, 25.457129523715317]),
            {
              "landcover": 1,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([78.58336425456909, 25.458204791765592]),
            {
              "landcover": 1,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([78.58346081409363, 25.458582586367427]),
            {
              "landcover": 1,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([78.58339644107727, 25.459231615350497]),
            {
              "landcover": 1,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([78.58348227176575, 25.45916380651599]),
            {
              "landcover": 1,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([78.56954016042488, 25.456752139041843]),
            {
              "landcover": 1,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([78.56948115182655, 25.456587456984753]),
            {
              "landcover": 1,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([78.56940604997413, 25.456321059062418]),
            {
              "landcover": 1,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([78.56891788793342, 25.455386239870098]),
            {
              "landcover": 1,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([78.56856920076149, 25.457498049066874]),
            {
              "landcover": 1,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([78.56841899705665, 25.45746414416601]),
            {
              "landcover": 1,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([78.56908954931038, 25.456829636402478]),
            {
              "landcover": 1,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([78.55973347337978, 25.457955538141785]),
            {
              "landcover": 1,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([78.55977638872402, 25.45774726582024]),
            {
              "landcover": 1,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([78.55974956663387, 25.4575680544644]),
            {
              "landcover": 1,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([78.56078489931362, 25.45863847508607]),
            {
              "landcover": 1,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([78.56080635698574, 25.458512543742376]),
            {
              "landcover": 1,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([78.56126233251827, 25.459156729613433]),
            {
              "landcover": 1,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([78.56128379019039, 25.459088920736765]),
            {
              "landcover": 1,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([78.56156810434597, 25.458439890984156]),
            {
              "landcover": 1,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([78.56148763807552, 25.458294585336123]),
            {
              "landcover": 1,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([78.56164320619838, 25.45818802774938]),
            {
              "landcover": 1,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([78.56148763807552, 25.458168653632566]),
            {
              "landcover": 1,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([78.56264635236995, 25.458289741811505]),
            {
              "landcover": 1,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([78.56273218305843, 25.458435047465365]),
            {
              "landcover": 1,
              "system:index": "43"
            })]),
    Agriculture_Land = ui.import && ui.import("Agriculture_Land", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            78.61604406716876,
            25.42885277464281
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.61634447457843,
            25.42883339580607
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.61579730393939,
            25.428668675567952
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.61494972589068,
            25.428135755607965
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.61962749841265,
            25.426672635964774
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.6193485486751,
            25.426643567182648
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.61919834497027,
            25.426769531854614
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.61915542962603,
            25.42630443087296
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.61908032777362,
            25.426091258989857
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.62028195741229,
            25.42563584506731
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.62067892434649,
            25.42552925858164
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.62067892434649,
            25.425170739710744
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.62055017831378,
            25.42467656330281
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.62089350106768,
            25.424637804283158
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.62130119683795,
            25.42409517669944
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.62156941773944,
            25.424405249903547
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.62188055398516,
            25.424240523613186
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.62219169023089,
            25.4239207601716
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.62215950372271,
            25.423087433277285
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.62226679208331,
            25.423630065397674
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.62120463731341,
            25.423378129359843
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.62106516244464,
            25.423145572549856
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.6192419903405,
            25.536333834779366
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.61889866758659,
            25.53493979744521
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.61810473371818,
            25.535114052998125
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.61447838713005,
            25.53645000382577
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.61458567549064,
            25.537205099884588
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.61720351148918,
            25.53921866613049
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.61703185011223,
            25.540051188448537
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.61615208555534,
            25.539818857220308
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.60868481565788,
            25.538618472036546
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.61213950086906,
            25.53464937096107
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.6136415379174,
            25.53464937096107
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.6165597813256,
            25.534145963389268
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.61707476545647,
            25.533913620720405
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.61598042417839,
            25.533100417835023
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.61552981306389,
            25.533100417835023
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.61643103529289,
            25.53823124844617
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.62297562528923,
            25.53581107267795
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.62188128401115,
            25.53581107267795
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.623833932174,
            25.53563681813778
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.61982134748772,
            25.54241319704881
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.62046507765129,
            25.542180870397345
          ]
        },
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                78.55374223048426,
                25.52623238407104
              ],
              [
                78.55380123908259,
                25.52600002607449
              ],
              [
                78.55391389186121,
                25.526101682753357
              ],
              [
                78.55386024768092,
                25.526266269574588
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
                78.55225628669001,
                25.52620818013406
              ],
              [
                78.55264788920618,
                25.526072637996755
              ],
              [
                78.55259424502589,
                25.52623238407104
              ],
              [
                78.5522723799441,
                25.526290473499866
              ],
              [
                78.5522187357638,
                25.52620818013406
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
                78.56414829498583,
                25.522714571625862
              ],
              [
                78.5632256150847,
                25.522671003258484
              ],
              [
                78.56328462368303,
                25.522312773860477
              ],
              [
                78.56416438823992,
                25.522346660470937
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
                80.23543042916783,
                25.282363736631538
              ],
              [
                80.23410005349645,
                25.282053298975786
              ],
              [
                80.23504419106969,
                25.281432421281
              ],
              [
                80.2359454132987,
                25.281859275037526
              ],
              [
                80.23500127572545,
                25.282480150547627
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
                80.24010820168981,
                25.278483208836402
              ],
              [
                80.24126691598424,
                25.278405597014448
              ],
              [
                80.2406661011649,
                25.279608574675528
              ],
              [
                80.23963613290319,
                25.2791041016247
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
                80.24787587899694,
                25.278405597014448
              ],
              [
                80.24603051919469,
                25.2781727612507
              ],
              [
                80.2472750641776,
                25.277008575729795
              ],
              [
                80.24899167794713,
                25.27693096296456
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
                80.2591626145316,
                25.28659337053561
              ],
              [
                80.2586047150565,
                25.285429265823097
              ],
              [
                80.25997800607213,
                25.285429265823097
              ],
              [
                80.26070756692418,
                25.286244140295018
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
                78.97465476615736,
                23.710092942909224
              ],
              [
                78.96933326347181,
                23.70804969422895
              ],
              [
                78.9715648613722,
                23.703963100875654
              ],
              [
                78.97585639579603,
                23.705534882696046
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
                78.91525992973158,
                23.697204223336595
              ],
              [
                78.91337165458509,
                23.694846393020217
              ],
              [
                78.91766318900892,
                23.697204223336595
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
                78.90616187675306,
                23.693588866106147
              ],
              [
                78.90444526298353,
                23.689030229513044
              ],
              [
                78.90736350639173,
                23.686829451441465
              ],
              [
                78.90908012016126,
                23.691230970496843
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 2
      },
      "color": "#fff80d",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #fff80d */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([78.61604406716876, 25.42885277464281]),
            {
              "landcover": 2,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([78.61634447457843, 25.42883339580607]),
            {
              "landcover": 2,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([78.61579730393939, 25.428668675567952]),
            {
              "landcover": 2,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([78.61494972589068, 25.428135755607965]),
            {
              "landcover": 2,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([78.61962749841265, 25.426672635964774]),
            {
              "landcover": 2,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([78.6193485486751, 25.426643567182648]),
            {
              "landcover": 2,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([78.61919834497027, 25.426769531854614]),
            {
              "landcover": 2,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([78.61915542962603, 25.42630443087296]),
            {
              "landcover": 2,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([78.61908032777362, 25.426091258989857]),
            {
              "landcover": 2,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([78.62028195741229, 25.42563584506731]),
            {
              "landcover": 2,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([78.62067892434649, 25.42552925858164]),
            {
              "landcover": 2,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([78.62067892434649, 25.425170739710744]),
            {
              "landcover": 2,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([78.62055017831378, 25.42467656330281]),
            {
              "landcover": 2,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([78.62089350106768, 25.424637804283158]),
            {
              "landcover": 2,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([78.62130119683795, 25.42409517669944]),
            {
              "landcover": 2,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([78.62156941773944, 25.424405249903547]),
            {
              "landcover": 2,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([78.62188055398516, 25.424240523613186]),
            {
              "landcover": 2,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([78.62219169023089, 25.4239207601716]),
            {
              "landcover": 2,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([78.62215950372271, 25.423087433277285]),
            {
              "landcover": 2,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([78.62226679208331, 25.423630065397674]),
            {
              "landcover": 2,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([78.62120463731341, 25.423378129359843]),
            {
              "landcover": 2,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([78.62106516244464, 25.423145572549856]),
            {
              "landcover": 2,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([78.6192419903405, 25.536333834779366]),
            {
              "landcover": 2,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([78.61889866758659, 25.53493979744521]),
            {
              "landcover": 2,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([78.61810473371818, 25.535114052998125]),
            {
              "landcover": 2,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([78.61447838713005, 25.53645000382577]),
            {
              "landcover": 2,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([78.61458567549064, 25.537205099884588]),
            {
              "landcover": 2,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([78.61720351148918, 25.53921866613049]),
            {
              "landcover": 2,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([78.61703185011223, 25.540051188448537]),
            {
              "landcover": 2,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([78.61615208555534, 25.539818857220308]),
            {
              "landcover": 2,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([78.60868481565788, 25.538618472036546]),
            {
              "landcover": 2,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([78.61213950086906, 25.53464937096107]),
            {
              "landcover": 2,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([78.6136415379174, 25.53464937096107]),
            {
              "landcover": 2,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([78.6165597813256, 25.534145963389268]),
            {
              "landcover": 2,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([78.61707476545647, 25.533913620720405]),
            {
              "landcover": 2,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([78.61598042417839, 25.533100417835023]),
            {
              "landcover": 2,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([78.61552981306389, 25.533100417835023]),
            {
              "landcover": 2,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([78.61643103529289, 25.53823124844617]),
            {
              "landcover": 2,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([78.62297562528923, 25.53581107267795]),
            {
              "landcover": 2,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([78.62188128401115, 25.53581107267795]),
            {
              "landcover": 2,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([78.623833932174, 25.53563681813778]),
            {
              "landcover": 2,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([78.61982134748772, 25.54241319704881]),
            {
              "landcover": 2,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([78.62046507765129, 25.542180870397345]),
            {
              "landcover": 2,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[78.55374223048426, 25.52623238407104],
                  [78.55380123908259, 25.52600002607449],
                  [78.55391389186121, 25.526101682753357],
                  [78.55386024768092, 25.526266269574588]]]),
            {
              "landcover": 2,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[78.55225628669001, 25.52620818013406],
                  [78.55264788920618, 25.526072637996755],
                  [78.55259424502589, 25.52623238407104],
                  [78.5522723799441, 25.526290473499866],
                  [78.5522187357638, 25.52620818013406]]]),
            {
              "landcover": 2,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[78.56414829498583, 25.522714571625862],
                  [78.5632256150847, 25.522671003258484],
                  [78.56328462368303, 25.522312773860477],
                  [78.56416438823992, 25.522346660470937]]]),
            {
              "landcover": 2,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[80.23543042916783, 25.282363736631538],
                  [80.23410005349645, 25.282053298975786],
                  [80.23504419106969, 25.281432421281],
                  [80.2359454132987, 25.281859275037526],
                  [80.23500127572545, 25.282480150547627]]]),
            {
              "landcover": 2,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[80.24010820168981, 25.278483208836402],
                  [80.24126691598424, 25.278405597014448],
                  [80.2406661011649, 25.279608574675528],
                  [80.23963613290319, 25.2791041016247]]]),
            {
              "landcover": 2,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[80.24787587899694, 25.278405597014448],
                  [80.24603051919469, 25.2781727612507],
                  [80.2472750641776, 25.277008575729795],
                  [80.24899167794713, 25.27693096296456]]]),
            {
              "landcover": 2,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[80.2591626145316, 25.28659337053561],
                  [80.2586047150565, 25.285429265823097],
                  [80.25997800607213, 25.285429265823097],
                  [80.26070756692418, 25.286244140295018]]]),
            {
              "landcover": 2,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[78.97465476615736, 23.710092942909224],
                  [78.96933326347181, 23.70804969422895],
                  [78.9715648613722, 23.703963100875654],
                  [78.97585639579603, 23.705534882696046]]]),
            {
              "landcover": 2,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[78.91525992973158, 23.697204223336595],
                  [78.91337165458509, 23.694846393020217],
                  [78.91766318900892, 23.697204223336595]]]),
            {
              "landcover": 2,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[78.90616187675306, 23.693588866106147],
                  [78.90444526298353, 23.689030229513044],
                  [78.90736350639173, 23.686829451441465],
                  [78.90908012016126, 23.691230970496843]]]),
            {
              "landcover": 2,
              "system:index": "52"
            })]),
    Vegetation = ui.import && ui.import("Vegetation", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            78.53885336329536,
            25.52349771215207
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.53872461726264,
            25.52320725796647
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.53872461726264,
            25.522819984625347
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.53872461726264,
            25.52247143754971
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.52707310130195,
            25.524097981907797
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.53891773631172,
            25.516817088022943
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.53887482096748,
            25.516178052315944
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.53896065165596,
            25.515558378078346
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.54337704748087,
            25.538118546480874
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.54301763147288,
            25.53810886586598
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.54277623266154,
            25.537866850240047
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.54308200448924,
            25.537615153470973
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.54329658121043,
            25.53712143904334
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.543398505153,
            25.537397338532877
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.54235780805521,
            25.537445741886632
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.54302299589091,
            25.53667128588195
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.54488444894724,
            25.53789105182464
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.54465914338999,
            25.53818147045851
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.5445518550294,
            25.53854933305176
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.54441238016062,
            25.538641298523743
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.5439939555543,
            25.538631617951058
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.54372037023478,
            25.53878166673973
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.54366672605448,
            25.53868002080664
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.54396176904612,
            25.5383266795117
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.5442460832017,
            25.53827827651353
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.54529214471751,
            25.53588230368431
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.54373109907084,
            25.536772933517707
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.54380620092326,
            25.53665676478409
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.54444993108683,
            25.53764903575911
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.55926362068803,
            25.519709457899584
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.55919924767167,
            25.52025165428047
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.55882373840959,
            25.520880986293754
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.5585018733278,
            25.521316675754314
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.55831948311479,
            25.521820137161
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.55741826088578,
            25.521597452568553
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.55671015770585,
            25.521306993783487
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.55888811142594,
            25.522807689939096
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.55970350296647,
            25.523340190515473
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.5595103839174,
            25.523746825727994
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.55878082306535,
            25.524017915104153
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.55966058762223,
            25.52417282304412
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.56070128472001,
            25.524114732590082
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.56019702942521,
            25.52372746217769
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.55888811142594,
            25.5238339616657
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.55871645004899,
            25.52355319008437
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.55775085480363,
            25.52124890194212
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.55755773575456,
            25.520871304287763
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.55823365242631,
            25.520697028046587
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.55846968681962,
            25.52023229016619
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.56547561676652,
            25.52060020780324
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.56582966835649,
            25.52150063305164
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.56578675301225,
            25.521200492052827
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.56615153343827,
            25.522178368029646
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.56607643158586,
            25.522759280678617
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.56586185486466,
            25.523427326748436
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.56564727814347,
            25.523882370492633
          ]
        },
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                78.55901685745866,
                25.5233014632805
              ],
              [
                78.55932799370439,
                25.52327241784606
              ],
              [
                78.55931726486833,
                25.52358223545082
              ],
              [
                78.5590597728029,
                25.523495099330344
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
                78.55830875427873,
                25.522342960232347
              ],
              [
                78.55871645004899,
                25.522333278344316
              ],
              [
                78.55883446724565,
                25.522507552209333
              ],
              [
                78.55843750031144,
                25.52258500717918
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 3
      },
      "color": "#13ff3b",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #13ff3b */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([78.53885336329536, 25.52349771215207]),
            {
              "landcover": 3,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([78.53872461726264, 25.52320725796647]),
            {
              "landcover": 3,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([78.53872461726264, 25.522819984625347]),
            {
              "landcover": 3,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([78.53872461726264, 25.52247143754971]),
            {
              "landcover": 3,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([78.52707310130195, 25.524097981907797]),
            {
              "landcover": 3,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([78.53891773631172, 25.516817088022943]),
            {
              "landcover": 3,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([78.53887482096748, 25.516178052315944]),
            {
              "landcover": 3,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([78.53896065165596, 25.515558378078346]),
            {
              "landcover": 3,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([78.54337704748087, 25.538118546480874]),
            {
              "landcover": 3,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([78.54301763147288, 25.53810886586598]),
            {
              "landcover": 3,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([78.54277623266154, 25.537866850240047]),
            {
              "landcover": 3,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([78.54308200448924, 25.537615153470973]),
            {
              "landcover": 3,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([78.54329658121043, 25.53712143904334]),
            {
              "landcover": 3,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([78.543398505153, 25.537397338532877]),
            {
              "landcover": 3,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([78.54235780805521, 25.537445741886632]),
            {
              "landcover": 3,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([78.54302299589091, 25.53667128588195]),
            {
              "landcover": 3,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([78.54488444894724, 25.53789105182464]),
            {
              "landcover": 3,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([78.54465914338999, 25.53818147045851]),
            {
              "landcover": 3,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([78.5445518550294, 25.53854933305176]),
            {
              "landcover": 3,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([78.54441238016062, 25.538641298523743]),
            {
              "landcover": 3,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([78.5439939555543, 25.538631617951058]),
            {
              "landcover": 3,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([78.54372037023478, 25.53878166673973]),
            {
              "landcover": 3,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([78.54366672605448, 25.53868002080664]),
            {
              "landcover": 3,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([78.54396176904612, 25.5383266795117]),
            {
              "landcover": 3,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([78.5442460832017, 25.53827827651353]),
            {
              "landcover": 3,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([78.54529214471751, 25.53588230368431]),
            {
              "landcover": 3,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([78.54373109907084, 25.536772933517707]),
            {
              "landcover": 3,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([78.54380620092326, 25.53665676478409]),
            {
              "landcover": 3,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([78.54444993108683, 25.53764903575911]),
            {
              "landcover": 3,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([78.55926362068803, 25.519709457899584]),
            {
              "landcover": 3,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([78.55919924767167, 25.52025165428047]),
            {
              "landcover": 3,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([78.55882373840959, 25.520880986293754]),
            {
              "landcover": 3,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([78.5585018733278, 25.521316675754314]),
            {
              "landcover": 3,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([78.55831948311479, 25.521820137161]),
            {
              "landcover": 3,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([78.55741826088578, 25.521597452568553]),
            {
              "landcover": 3,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([78.55671015770585, 25.521306993783487]),
            {
              "landcover": 3,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([78.55888811142594, 25.522807689939096]),
            {
              "landcover": 3,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([78.55970350296647, 25.523340190515473]),
            {
              "landcover": 3,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([78.5595103839174, 25.523746825727994]),
            {
              "landcover": 3,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([78.55878082306535, 25.524017915104153]),
            {
              "landcover": 3,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([78.55966058762223, 25.52417282304412]),
            {
              "landcover": 3,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([78.56070128472001, 25.524114732590082]),
            {
              "landcover": 3,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([78.56019702942521, 25.52372746217769]),
            {
              "landcover": 3,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([78.55888811142594, 25.5238339616657]),
            {
              "landcover": 3,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([78.55871645004899, 25.52355319008437]),
            {
              "landcover": 3,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([78.55775085480363, 25.52124890194212]),
            {
              "landcover": 3,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([78.55755773575456, 25.520871304287763]),
            {
              "landcover": 3,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([78.55823365242631, 25.520697028046587]),
            {
              "landcover": 3,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([78.55846968681962, 25.52023229016619]),
            {
              "landcover": 3,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([78.56547561676652, 25.52060020780324]),
            {
              "landcover": 3,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([78.56582966835649, 25.52150063305164]),
            {
              "landcover": 3,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([78.56578675301225, 25.521200492052827]),
            {
              "landcover": 3,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([78.56615153343827, 25.522178368029646]),
            {
              "landcover": 3,
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Point([78.56607643158586, 25.522759280678617]),
            {
              "landcover": 3,
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Point([78.56586185486466, 25.523427326748436]),
            {
              "landcover": 3,
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Point([78.56564727814347, 25.523882370492633]),
            {
              "landcover": 3,
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[78.55901685745866, 25.5233014632805],
                  [78.55932799370439, 25.52327241784606],
                  [78.55931726486833, 25.52358223545082],
                  [78.5590597728029, 25.523495099330344]]]),
            {
              "landcover": 3,
              "system:index": "56"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[78.55830875427873, 25.522342960232347],
                  [78.55871645004899, 25.522333278344316],
                  [78.55883446724565, 25.522507552209333],
                  [78.55843750031144, 25.52258500717918]]]),
            {
              "landcover": 3,
              "system:index": "57"
            })]),
    table = ui.import && ui.import("table", "table", {
      "id": "users/try1/Bundelkhand_Boundary"
    }) || ee.FeatureCollection("users/try1/Bundelkhand_Boundary"),
    sample = ui.import && ui.import("sample", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                78.4405856857722,
                25.767300061934115
              ],
              [
                78.4405856857722,
                25.37460818928209
              ],
              [
                79.0832858810847,
                25.37460818928209
              ],
              [
                79.0832858810847,
                25.767300061934115
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
      "color": "#d612cb",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d612cb */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[78.4405856857722, 25.767300061934115],
          [78.4405856857722, 25.37460818928209],
          [79.0832858810847, 25.37460818928209],
          [79.0832858810847, 25.767300061934115]]], null, false),
    Area = ui.import && ui.import("Area", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            78.77285424975119,
            25.516289672832396
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.95013572994532,
            25.73499980750151
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.46304814675142,
            25.247408081331887
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.13510081639016,
            25.244908873104777
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.16731234800412,
            25.714998708030652
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            79.18055876947578,
            25.61765883515568
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.81258505231447,
            25.572116592405514
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.56471615402862,
            25.45267306525552
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.MultiPoint(
        [[78.77285424975119, 25.516289672832396],
         [78.95013572994532, 25.73499980750151],
         [78.46304814675142, 25.247408081331887],
         [79.13510081639016, 25.244908873104777],
         [79.16731234800412, 25.714998708030652],
         [79.18055876947578, 25.61765883515568],
         [78.81258505231447, 25.572116592405514],
         [78.56471615402862, 25.45267306525552]]);
var pali_shp = ee.FeatureCollection('users/try1/India_CAFRI');
var table = pali_shp.filter(ee.Filter.eq('DISTRICT', "JHANSI"));
//-----------------------------Dataset-----------------------------
Map.centerObject(table, 8);
Map.setOptions('SATELLITE');
var empty = ee.Image().byte();
var outline = empty.paint({
    featureCollection: table,
    color:1,
    width:3
});
Map.addLayer(outline,{color:'red'}, 'Jhansi_shp' )
function maskS2clouds(image) {
  var qa = image.select('QA60');
   // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask).divide(10000);
}
var a2020 = a.filterDate('2020-05-01', '2020-06-30')
        .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 0.1))
        .sort('CLOUD_COVER')
        .map(maskS2clouds);
var image = a2020.median().clip(table);
//var list = list.select(bands)
//Map.addLayer(outline, {}, 'sample_shp',false);
var vis4 = {"opacity":1,"bands":["B8","B4","B3"],"min":0.098,"max":0.2473,"gamma":1.37};
Map.addLayer(image, vis4, "Jhansi_img_2020", false);
//-------------------------------------------------------------------------------2020 classify--------
// Merge the hand-drawn features into a single FeatureCollection.
var newfc = Waterbody.merge(Urban).merge(Vegetation).merge(Agriculture_Land);
// Make training data by 'overlaying' the points on the image.
var training = image.sampleRegions({
  collection: newfc, 
  properties: ['landcover'], 
  scale: 10
});
// Train a classifier.
var classifier = ee.Classifier.smileRandomForest(100).train({
  features: training,  
  classProperty: 'landcover', 
  inputProperties: image.bandNames()
});
var classified = image.classify(classifier);
Map.addLayer(classified, {min: 0, max: 3, palette: ['0000ff', 'ff0000', 'ffff00', '00ff00']}, 'LULC_2020',false); 
var palette = ee.List(['blue', 'red', 'yellow', 'green'])
var landcover = ee.List([0, 1, 2, 3])
var gcpsStyled = ee.FeatureCollection(
  landcover.map(function(lc){
    var color = palette.get(landcover.indexOf(lc));
    var markerStyle = { color: 'white', pointShape: 'diamond', 
      pointSize: 4, width: 1, fillColor: color}
    return newfc.filter(ee.Filter.eq('landcover', lc))
                .map(function(point){
                  return point.set('style', markerStyle)
                })
      })).flatten();
Map.addLayer(gcpsStyled.style({styleProperty:"style"}), {}, 'GCPs', false)
//-----------------------------------------------2019------------------------------------------------------
function maskS2clouds(image) {
  var qa = image.select('QA60');
   // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask).divide(10000);
}
var a2019 = a.filterDate('2019-05-01', '2019-05-30')
        .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 5))
        .sort('CLOUD_COVER')
        .map(maskS2clouds);
var image2019 = a2019.median().clip(table);
//var list = list.select(bands)
//Map.addLayer(outline, {}, 'sample_shp',false);
var vis4 = {"opacity":1,"bands":["B8","B4","B3"],"min":0.098,"max":0.2473,"gamma":1.37};
Map.addLayer(image2019, vis4, "Jhansi_img_2019", false);
//------------------------------------------2019 classify-----------------------------------
// Merge the hand-drawn features into a single FeatureCollection.
var newfc2019 = Waterbody.merge(Urban).merge(Vegetation).merge(Agriculture_Land);
// Make training data by 'overlaying' the points on the image.
var training = image2019.sampleRegions({
  collection: newfc2019, 
  properties: ['landcover'], 
  scale: 10
});
// Train a classifier.
var classifier = ee.Classifier.smileRandomForest(100).train({
  features: training,  
  classProperty: 'landcover', 
  inputProperties: image2019.bandNames()
});
var classified2019 = image2019.classify(classifier);
Map.addLayer(classified2019, {min: 0, max: 3, palette: ['0000ff', 'ff0000', 'ffff00', '00ff00']}, 'LULC_2019', false); 
// var palette = ee.List(['blue', 'red', 'yellow', 'green'])
// var landcover = ee.List([0, 1, 2, 3])
// var gcpsStyled2019 = ee.FeatureCollection(
//   landcover.map(function(lc){
//     var color = palette.get(landcover.indexOf(lc));
//     var markerStyle = { color: 'white', pointShape: 'diamond', 
//       pointSize: 4, width: 1, fillColor: color}
//     return newfc.filter(ee.Filter.eq('landcover', lc))
//                 .map(function(point){
//                   return point.set('style', markerStyle)
//                 })
//       })).flatten();
// Map.addLayer(gcpsStyled2019.style({styleProperty:"style"}), {}, 'GCPs')
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'My Legend',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
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
var palette =['0000ff', 'ff0000', 'ffff00', '00ff00'];
// name of the legend
var names = ['Waterbody area','Built_up area','Crop land','Vegetation area' ];
// Add color and and names
for (var i = 0; i < 4; i++)
{
  legend.add(makeRow(palette[i], names[i]));
  }  
// add legend to map (alternatively you can also print the legend to the console)
Map.add(legend);
// Export.image.toDrive({
//   image: classified,
//   description: 'classified_2020',
//   scale: 10,
//   region: table,
//   maxPixels: 1e9
// });
ee.ImageCollection([classified2019,classified])
//var collectionFromConstructor = ee.ImageCollection([constant1, constant2])
//-------------------------------------------------------------------
var places = {
  Parichha:[78.77285424975119, 25.516289672832396],
    Moth:     [78.95013572994532, 25.73499980750151],
         Babina:[78.46304814675142, 25.247408081331887],
      Mauranipur:   [79.13510081639016, 25.244908873104777],
        Bamour: [79.16731234800412, 25.714998708030652],
         Gursaray:[79.18055876947578, 25.61765883515568],
         Chirgaon:[78.81258505231447, 25.572116592405514],
         Jhansi:[78.56471615402862, 25.45267306525552]
};
//Map.centerObject(geometry)
Map.setOptions("HYBRID")
//Map.addLayer(places)         
var Area = /* color: #d63000 */ee.Geometry.MultiPoint(
        [[78.77285424975119, 25.516289672832396],
         [78.95013572994532, 25.73499980750151],
         [78.46304814675142, 25.247408081331887],
         [79.13510081639016, 25.244908873104777],
         [79.16731234800412, 25.714998708030652],
         [79.18055876947578, 25.61765883515568],
         [78.81258505231447, 25.572116592405514],
         [78.56471615402862, 25.45267306525552]]);
         var palette = ['FF0000', '00FF00', '0000FF'];
//Map.addLayer(outlines, {palette: palette, max: 14}, 'different color edges');
//var palettes = require('users/gena/packages:palettes');
Map.addLayer(Area, {color: 'red'}, "Location_Points")
// var places = {
//   MTV: [-122.0849, 37.3887],
//   PEK: [116.4056, 39.9097],
//   ZRH: [8.536, 47.376]
// };
var select = ui.Select({
  items: Object.keys(places),
  onChange: function(key) {
    Map.setCenter(places[key][0], places[key][1]);
  }
});
// Set a place holder.
select.setPlaceholder('Choose a location...');
//
//print(select);
// Create a panel that contains both the slider and the label.
var panel = ui.Panel({
  widgets: [select],
  layout: ui.Panel.Layout.flow('vertical'),
  style: {
    position: 'top-center',
    padding: '7px'
  }
});
Map.add(panel);