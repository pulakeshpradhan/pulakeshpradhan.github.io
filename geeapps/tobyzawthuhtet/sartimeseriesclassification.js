var yangonState = ui.import && ui.import("yangonState", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                95.80590912453255,
                17.206919178191445
              ],
              [
                95.80590912453255,
                16.625228059904064
              ],
              [
                96.53157285877835,
                16.625228059904064
              ],
              [
                96.53157285877835,
                17.206919178191445
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
        [[[95.80590912453255, 17.206919178191445],
          [95.80590912453255, 16.625228059904064],
          [96.53157285877835, 16.625228059904064],
          [96.53157285877835, 17.206919178191445]]], null, false),
    imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "VV"
        ],
        "min": -21.46983411323127,
        "max": 4.4231903773842225,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["VV"],"min":-21.46983411323127,"max":4.4231903773842225,"gamma":1},
    imageVisParam2 = ui.import && ui.import("imageVisParam2", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "median"
        ],
        "min": -21.32684598134818,
        "max": -1.3755086040125117,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["median"],"min":-21.32684598134818,"max":-1.3755086040125117,"gamma":1},
    imageVisParam_median = ui.import && ui.import("imageVisParam_median", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "VV_median"
        ],
        "min": -20.03868575937662,
        "max": -2.0054774764788346,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["VV_median"],"min":-20.03868575937662,"max":-2.0054774764788346,"gamma":1},
    imageVisParam_ti = ui.import && ui.import("imageVisParam_ti", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "jan"
        ],
        "min": -24.395628711799397,
        "max": -2.7638078501360828,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["jan"],"min":-24.395628711799397,"max":-2.7638078501360828,"gamma":1},
    urban = ui.import && ui.import("urban", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            96.13309203490894,
            16.774749569265474
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.13386451110523,
            16.776886193484046
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.13437949523609,
            16.7738456056349
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.13077460632007,
            16.774420855715384
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.12090407714527,
            16.78502158119924
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.12184821471851,
            16.783788969088896
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.16828261718433,
            16.786418531921687
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.16424857482593,
            16.789458918565572
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.16407691344898,
            16.787240262841397
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.16596518859546,
            16.78732243573783
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.1669093261687,
            16.78863719724546
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.17174767629997,
            16.79307445013031
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.17063187734978,
            16.791924061191096
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.17131852285759,
            16.787568954213807
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.1983551897277,
            16.788226335252073
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.19732522146599,
            16.78493940730739
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.1914029039611,
            16.783542445707077
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.19243287222282,
            16.781981123526542
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.15071915762321,
            16.799401464687218
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.14986085073845,
            16.79816894592436
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.14943169729607,
            16.799565799917488
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.12089198777772,
            16.79784027290245
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.12140697190858,
            16.795293037685337
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.12114947984315,
            16.795293037685337
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.12140697190858,
            16.79274576828751
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.13024753282167,
            16.797593767762514
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.13290828416444,
            16.80112697750755
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.13325160691835,
            16.803509802750266
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.13110583970644,
            16.80252380972738
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.1316208238373,
            16.806549915646798
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.17311297579334,
            16.81134597250782
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.17603121920155,
            16.812414081705946
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.17311297579334,
            16.80945622611228
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.1762028805785,
            16.81027785729364
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.1307984463744,
            16.811838946731438
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.12805186434315,
            16.80740213258669
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.12367449923084,
            16.808141608818545
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.12547694368885,
            16.807484296754808
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.12985430880116,
            16.8173437384976
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.13131343050526,
            16.817754537444223
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.12899600191639,
            16.816522137933696
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.12981811120795,
            16.82325936969239
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.12801566674995,
            16.82391662706457
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.13050475671577,
            16.82161621628847
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.16535201623725,
            16.82720287972743
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.16526618554877,
            16.824573882156994
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.19918736588748,
            16.82559365238763
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.19738492142947,
            16.823375419252102
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.13933202159954,
            16.763415378015317
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.14087697399212,
            16.761689522668018
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.14147778881146,
            16.759552727687474
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.14516850841595,
            16.761360786540852
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.14611264598919,
            16.75881306229497
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.14808675182415,
            16.754785944715938
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.15031834972454,
            16.75486813164086
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.14971753490521,
            16.760045836351612
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.16027470958782,
            16.758648691817257
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.15752812755657,
            16.758155579532108
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.16937276256634,
            16.751005307805475
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.17289182079388,
            16.752320320465415
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.17632504833294,
            16.750923119212597
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.14619847667767,
            16.75149843861753
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.13383885753704,
            16.75527906573303
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.13512631786419,
            16.76152515467545
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.13976117504193,
            16.760949865583058
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.15143414867474,
            16.750512175715944
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.15254994762493,
            16.749854664276157
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.15460988414837,
            16.751827191782525
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.14122029674603,
            16.755936558434872
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.13770123851849,
            16.751909379985058
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.1343538416679,
            16.75363532404056
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.13057729137493,
            16.755936558434872
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.11796018016888,
            16.760621128177753
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.11521359813763,
            16.76053894373766
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.11435529125286,
            16.755114692202646
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.10791798961712,
            16.753060011094338
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.10920544994427,
            16.75552562576243
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.15323659313275,
            16.74886839285853
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.15787145031048,
            16.746320501382215
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.14422437084271,
            16.7579090229103
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.1453401697929,
            16.758237765001695
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.24356550127997,
            16.766843269173574
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.24768537432685,
            16.774239481374515
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.24957364947333,
            16.77193846841215
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.24820035845771,
            16.78459369495908
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.24545377642646,
            16.784264998437973
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.24631208331122,
            16.76404906969339
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.24184888751044,
            16.76174793341667
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.14238439690529,
            16.78426217361369
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.13414465081154,
            16.804804613011203
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.13774953972755,
            16.805626264341743
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.15525900017677,
            16.798888618391814
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.15646062981544,
            16.79905295406618
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.17911993157325,
            16.80546193436033
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.17774664055763,
            16.803325631648736
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.17808996331154,
            16.79839561051495
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.17448507439552,
            16.799217289598236
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.19783102166114,
            16.808255524684178
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.19937597405372,
            16.80644791211359
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.21413885247169,
            16.812035022572935
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.21671377312599,
            16.809898793890635
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.21963201653419,
            16.80924148791655
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.2170570958799,
            16.808419852245496
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.21379552971779,
            16.804804613011203
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.21225057732521,
            16.80611925343191
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.21202357267119,
            16.82748088291967
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.20653040860869,
            16.83339598537459
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.23159296964384,
            16.83421751277151
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.22730143522001,
            16.839803804543845
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.16760012371051,
            16.77320256023026
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.17232081157672,
            16.772462947923984
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.17506739360797,
            16.77344909702619
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.1570429490279,
            16.77254512721122
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.15730044109333,
            16.775421379882687
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.15764376384723,
            16.771723332740184
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.16416689617145,
            16.772216409849097
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.1628794358443,
            16.77287384400494
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.1628794358443,
            16.775010489308556
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.17446657878864,
            16.7676964884853
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.17721316081989,
            16.768025213661996
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.15146395427692,
            16.775503557890936
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.14794489604938,
            16.776078802953702
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.14434000713337,
            16.776243158366142
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.14777323467243,
            16.775503557890936
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.14339586956012,
            16.77648969121829
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.14888903362262,
            16.775585735863636
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.15103480083454,
            16.772956023114563
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.14845988018024,
            16.77344909702619
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.14545580608356,
            16.773613454712528
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.14614245159137,
            16.77575009170244
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.15764376384723,
            16.769504469924648
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.16614100200641,
            16.768353938270426
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.16682764751422,
            16.76646376401171
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.17738482219684,
            16.767367762740353
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.17189165813434,
            16.777229287855995
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.17137667400348,
            16.777722350682108
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
      "locked": false
    }) || 
    /* color: #ff0000 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([96.13309203490894, 16.774749569265474]),
            {
              "landcover": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([96.13386451110523, 16.776886193484046]),
            {
              "landcover": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([96.13437949523609, 16.7738456056349]),
            {
              "landcover": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([96.13077460632007, 16.774420855715384]),
            {
              "landcover": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([96.12090407714527, 16.78502158119924]),
            {
              "landcover": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([96.12184821471851, 16.783788969088896]),
            {
              "landcover": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([96.16828261718433, 16.786418531921687]),
            {
              "landcover": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([96.16424857482593, 16.789458918565572]),
            {
              "landcover": 1,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([96.16407691344898, 16.787240262841397]),
            {
              "landcover": 1,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([96.16596518859546, 16.78732243573783]),
            {
              "landcover": 1,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([96.1669093261687, 16.78863719724546]),
            {
              "landcover": 1,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([96.17174767629997, 16.79307445013031]),
            {
              "landcover": 1,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([96.17063187734978, 16.791924061191096]),
            {
              "landcover": 1,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([96.17131852285759, 16.787568954213807]),
            {
              "landcover": 1,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([96.1983551897277, 16.788226335252073]),
            {
              "landcover": 1,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([96.19732522146599, 16.78493940730739]),
            {
              "landcover": 1,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([96.1914029039611, 16.783542445707077]),
            {
              "landcover": 1,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([96.19243287222282, 16.781981123526542]),
            {
              "landcover": 1,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([96.15071915762321, 16.799401464687218]),
            {
              "landcover": 1,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([96.14986085073845, 16.79816894592436]),
            {
              "landcover": 1,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([96.14943169729607, 16.799565799917488]),
            {
              "landcover": 1,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([96.12089198777772, 16.79784027290245]),
            {
              "landcover": 1,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([96.12140697190858, 16.795293037685337]),
            {
              "landcover": 1,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([96.12114947984315, 16.795293037685337]),
            {
              "landcover": 1,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([96.12140697190858, 16.79274576828751]),
            {
              "landcover": 1,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([96.13024753282167, 16.797593767762514]),
            {
              "landcover": 1,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([96.13290828416444, 16.80112697750755]),
            {
              "landcover": 1,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([96.13325160691835, 16.803509802750266]),
            {
              "landcover": 1,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([96.13110583970644, 16.80252380972738]),
            {
              "landcover": 1,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([96.1316208238373, 16.806549915646798]),
            {
              "landcover": 1,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([96.17311297579334, 16.81134597250782]),
            {
              "landcover": 1,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([96.17603121920155, 16.812414081705946]),
            {
              "landcover": 1,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([96.17311297579334, 16.80945622611228]),
            {
              "landcover": 1,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([96.1762028805785, 16.81027785729364]),
            {
              "landcover": 1,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([96.1307984463744, 16.811838946731438]),
            {
              "landcover": 1,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([96.12805186434315, 16.80740213258669]),
            {
              "landcover": 1,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([96.12367449923084, 16.808141608818545]),
            {
              "landcover": 1,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([96.12547694368885, 16.807484296754808]),
            {
              "landcover": 1,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([96.12985430880116, 16.8173437384976]),
            {
              "landcover": 1,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([96.13131343050526, 16.817754537444223]),
            {
              "landcover": 1,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([96.12899600191639, 16.816522137933696]),
            {
              "landcover": 1,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([96.12981811120795, 16.82325936969239]),
            {
              "landcover": 1,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([96.12801566674995, 16.82391662706457]),
            {
              "landcover": 1,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([96.13050475671577, 16.82161621628847]),
            {
              "landcover": 1,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([96.16535201623725, 16.82720287972743]),
            {
              "landcover": 1,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([96.16526618554877, 16.824573882156994]),
            {
              "landcover": 1,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([96.19918736588748, 16.82559365238763]),
            {
              "landcover": 1,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([96.19738492142947, 16.823375419252102]),
            {
              "landcover": 1,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([96.13933202159954, 16.763415378015317]),
            {
              "landcover": 1,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([96.14087697399212, 16.761689522668018]),
            {
              "landcover": 1,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([96.14147778881146, 16.759552727687474]),
            {
              "landcover": 1,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([96.14516850841595, 16.761360786540852]),
            {
              "landcover": 1,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([96.14611264598919, 16.75881306229497]),
            {
              "landcover": 1,
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Point([96.14808675182415, 16.754785944715938]),
            {
              "landcover": 1,
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Point([96.15031834972454, 16.75486813164086]),
            {
              "landcover": 1,
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Point([96.14971753490521, 16.760045836351612]),
            {
              "landcover": 1,
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Point([96.16027470958782, 16.758648691817257]),
            {
              "landcover": 1,
              "system:index": "56"
            }),
        ee.Feature(
            ee.Geometry.Point([96.15752812755657, 16.758155579532108]),
            {
              "landcover": 1,
              "system:index": "57"
            }),
        ee.Feature(
            ee.Geometry.Point([96.16937276256634, 16.751005307805475]),
            {
              "landcover": 1,
              "system:index": "58"
            }),
        ee.Feature(
            ee.Geometry.Point([96.17289182079388, 16.752320320465415]),
            {
              "landcover": 1,
              "system:index": "59"
            }),
        ee.Feature(
            ee.Geometry.Point([96.17632504833294, 16.750923119212597]),
            {
              "landcover": 1,
              "system:index": "60"
            }),
        ee.Feature(
            ee.Geometry.Point([96.14619847667767, 16.75149843861753]),
            {
              "landcover": 1,
              "system:index": "61"
            }),
        ee.Feature(
            ee.Geometry.Point([96.13383885753704, 16.75527906573303]),
            {
              "landcover": 1,
              "system:index": "62"
            }),
        ee.Feature(
            ee.Geometry.Point([96.13512631786419, 16.76152515467545]),
            {
              "landcover": 1,
              "system:index": "63"
            }),
        ee.Feature(
            ee.Geometry.Point([96.13976117504193, 16.760949865583058]),
            {
              "landcover": 1,
              "system:index": "64"
            }),
        ee.Feature(
            ee.Geometry.Point([96.15143414867474, 16.750512175715944]),
            {
              "landcover": 1,
              "system:index": "65"
            }),
        ee.Feature(
            ee.Geometry.Point([96.15254994762493, 16.749854664276157]),
            {
              "landcover": 1,
              "system:index": "66"
            }),
        ee.Feature(
            ee.Geometry.Point([96.15460988414837, 16.751827191782525]),
            {
              "landcover": 1,
              "system:index": "67"
            }),
        ee.Feature(
            ee.Geometry.Point([96.14122029674603, 16.755936558434872]),
            {
              "landcover": 1,
              "system:index": "68"
            }),
        ee.Feature(
            ee.Geometry.Point([96.13770123851849, 16.751909379985058]),
            {
              "landcover": 1,
              "system:index": "69"
            }),
        ee.Feature(
            ee.Geometry.Point([96.1343538416679, 16.75363532404056]),
            {
              "landcover": 1,
              "system:index": "70"
            }),
        ee.Feature(
            ee.Geometry.Point([96.13057729137493, 16.755936558434872]),
            {
              "landcover": 1,
              "system:index": "71"
            }),
        ee.Feature(
            ee.Geometry.Point([96.11796018016888, 16.760621128177753]),
            {
              "landcover": 1,
              "system:index": "72"
            }),
        ee.Feature(
            ee.Geometry.Point([96.11521359813763, 16.76053894373766]),
            {
              "landcover": 1,
              "system:index": "73"
            }),
        ee.Feature(
            ee.Geometry.Point([96.11435529125286, 16.755114692202646]),
            {
              "landcover": 1,
              "system:index": "74"
            }),
        ee.Feature(
            ee.Geometry.Point([96.10791798961712, 16.753060011094338]),
            {
              "landcover": 1,
              "system:index": "75"
            }),
        ee.Feature(
            ee.Geometry.Point([96.10920544994427, 16.75552562576243]),
            {
              "landcover": 1,
              "system:index": "76"
            }),
        ee.Feature(
            ee.Geometry.Point([96.15323659313275, 16.74886839285853]),
            {
              "landcover": 1,
              "system:index": "77"
            }),
        ee.Feature(
            ee.Geometry.Point([96.15787145031048, 16.746320501382215]),
            {
              "landcover": 1,
              "system:index": "78"
            }),
        ee.Feature(
            ee.Geometry.Point([96.14422437084271, 16.7579090229103]),
            {
              "landcover": 1,
              "system:index": "79"
            }),
        ee.Feature(
            ee.Geometry.Point([96.1453401697929, 16.758237765001695]),
            {
              "landcover": 1,
              "system:index": "80"
            }),
        ee.Feature(
            ee.Geometry.Point([96.24356550127997, 16.766843269173574]),
            {
              "landcover": 1,
              "system:index": "81"
            }),
        ee.Feature(
            ee.Geometry.Point([96.24768537432685, 16.774239481374515]),
            {
              "landcover": 1,
              "system:index": "82"
            }),
        ee.Feature(
            ee.Geometry.Point([96.24957364947333, 16.77193846841215]),
            {
              "landcover": 1,
              "system:index": "83"
            }),
        ee.Feature(
            ee.Geometry.Point([96.24820035845771, 16.78459369495908]),
            {
              "landcover": 1,
              "system:index": "84"
            }),
        ee.Feature(
            ee.Geometry.Point([96.24545377642646, 16.784264998437973]),
            {
              "landcover": 1,
              "system:index": "85"
            }),
        ee.Feature(
            ee.Geometry.Point([96.24631208331122, 16.76404906969339]),
            {
              "landcover": 1,
              "system:index": "86"
            }),
        ee.Feature(
            ee.Geometry.Point([96.24184888751044, 16.76174793341667]),
            {
              "landcover": 1,
              "system:index": "87"
            }),
        ee.Feature(
            ee.Geometry.Point([96.14238439690529, 16.78426217361369]),
            {
              "landcover": 1,
              "system:index": "88"
            }),
        ee.Feature(
            ee.Geometry.Point([96.13414465081154, 16.804804613011203]),
            {
              "landcover": 1,
              "system:index": "89"
            }),
        ee.Feature(
            ee.Geometry.Point([96.13774953972755, 16.805626264341743]),
            {
              "landcover": 1,
              "system:index": "90"
            }),
        ee.Feature(
            ee.Geometry.Point([96.15525900017677, 16.798888618391814]),
            {
              "landcover": 1,
              "system:index": "91"
            }),
        ee.Feature(
            ee.Geometry.Point([96.15646062981544, 16.79905295406618]),
            {
              "landcover": 1,
              "system:index": "92"
            }),
        ee.Feature(
            ee.Geometry.Point([96.17911993157325, 16.80546193436033]),
            {
              "landcover": 1,
              "system:index": "93"
            }),
        ee.Feature(
            ee.Geometry.Point([96.17774664055763, 16.803325631648736]),
            {
              "landcover": 1,
              "system:index": "94"
            }),
        ee.Feature(
            ee.Geometry.Point([96.17808996331154, 16.79839561051495]),
            {
              "landcover": 1,
              "system:index": "95"
            }),
        ee.Feature(
            ee.Geometry.Point([96.17448507439552, 16.799217289598236]),
            {
              "landcover": 1,
              "system:index": "96"
            }),
        ee.Feature(
            ee.Geometry.Point([96.19783102166114, 16.808255524684178]),
            {
              "landcover": 1,
              "system:index": "97"
            }),
        ee.Feature(
            ee.Geometry.Point([96.19937597405372, 16.80644791211359]),
            {
              "landcover": 1,
              "system:index": "98"
            }),
        ee.Feature(
            ee.Geometry.Point([96.21413885247169, 16.812035022572935]),
            {
              "landcover": 1,
              "system:index": "99"
            }),
        ee.Feature(
            ee.Geometry.Point([96.21671377312599, 16.809898793890635]),
            {
              "landcover": 1,
              "system:index": "100"
            }),
        ee.Feature(
            ee.Geometry.Point([96.21963201653419, 16.80924148791655]),
            {
              "landcover": 1,
              "system:index": "101"
            }),
        ee.Feature(
            ee.Geometry.Point([96.2170570958799, 16.808419852245496]),
            {
              "landcover": 1,
              "system:index": "102"
            }),
        ee.Feature(
            ee.Geometry.Point([96.21379552971779, 16.804804613011203]),
            {
              "landcover": 1,
              "system:index": "103"
            }),
        ee.Feature(
            ee.Geometry.Point([96.21225057732521, 16.80611925343191]),
            {
              "landcover": 1,
              "system:index": "104"
            }),
        ee.Feature(
            ee.Geometry.Point([96.21202357267119, 16.82748088291967]),
            {
              "landcover": 1,
              "system:index": "105"
            }),
        ee.Feature(
            ee.Geometry.Point([96.20653040860869, 16.83339598537459]),
            {
              "landcover": 1,
              "system:index": "106"
            }),
        ee.Feature(
            ee.Geometry.Point([96.23159296964384, 16.83421751277151]),
            {
              "landcover": 1,
              "system:index": "107"
            }),
        ee.Feature(
            ee.Geometry.Point([96.22730143522001, 16.839803804543845]),
            {
              "landcover": 1,
              "system:index": "108"
            }),
        ee.Feature(
            ee.Geometry.Point([96.16760012371051, 16.77320256023026]),
            {
              "landcover": 1,
              "system:index": "109"
            }),
        ee.Feature(
            ee.Geometry.Point([96.17232081157672, 16.772462947923984]),
            {
              "landcover": 1,
              "system:index": "110"
            }),
        ee.Feature(
            ee.Geometry.Point([96.17506739360797, 16.77344909702619]),
            {
              "landcover": 1,
              "system:index": "111"
            }),
        ee.Feature(
            ee.Geometry.Point([96.1570429490279, 16.77254512721122]),
            {
              "landcover": 1,
              "system:index": "112"
            }),
        ee.Feature(
            ee.Geometry.Point([96.15730044109333, 16.775421379882687]),
            {
              "landcover": 1,
              "system:index": "113"
            }),
        ee.Feature(
            ee.Geometry.Point([96.15764376384723, 16.771723332740184]),
            {
              "landcover": 1,
              "system:index": "114"
            }),
        ee.Feature(
            ee.Geometry.Point([96.16416689617145, 16.772216409849097]),
            {
              "landcover": 1,
              "system:index": "115"
            }),
        ee.Feature(
            ee.Geometry.Point([96.1628794358443, 16.77287384400494]),
            {
              "landcover": 1,
              "system:index": "116"
            }),
        ee.Feature(
            ee.Geometry.Point([96.1628794358443, 16.775010489308556]),
            {
              "landcover": 1,
              "system:index": "117"
            }),
        ee.Feature(
            ee.Geometry.Point([96.17446657878864, 16.7676964884853]),
            {
              "landcover": 1,
              "system:index": "118"
            }),
        ee.Feature(
            ee.Geometry.Point([96.17721316081989, 16.768025213661996]),
            {
              "landcover": 1,
              "system:index": "119"
            }),
        ee.Feature(
            ee.Geometry.Point([96.15146395427692, 16.775503557890936]),
            {
              "landcover": 1,
              "system:index": "120"
            }),
        ee.Feature(
            ee.Geometry.Point([96.14794489604938, 16.776078802953702]),
            {
              "landcover": 1,
              "system:index": "121"
            }),
        ee.Feature(
            ee.Geometry.Point([96.14434000713337, 16.776243158366142]),
            {
              "landcover": 1,
              "system:index": "122"
            }),
        ee.Feature(
            ee.Geometry.Point([96.14777323467243, 16.775503557890936]),
            {
              "landcover": 1,
              "system:index": "123"
            }),
        ee.Feature(
            ee.Geometry.Point([96.14339586956012, 16.77648969121829]),
            {
              "landcover": 1,
              "system:index": "124"
            }),
        ee.Feature(
            ee.Geometry.Point([96.14888903362262, 16.775585735863636]),
            {
              "landcover": 1,
              "system:index": "125"
            }),
        ee.Feature(
            ee.Geometry.Point([96.15103480083454, 16.772956023114563]),
            {
              "landcover": 1,
              "system:index": "126"
            }),
        ee.Feature(
            ee.Geometry.Point([96.14845988018024, 16.77344909702619]),
            {
              "landcover": 1,
              "system:index": "127"
            }),
        ee.Feature(
            ee.Geometry.Point([96.14545580608356, 16.773613454712528]),
            {
              "landcover": 1,
              "system:index": "128"
            }),
        ee.Feature(
            ee.Geometry.Point([96.14614245159137, 16.77575009170244]),
            {
              "landcover": 1,
              "system:index": "129"
            }),
        ee.Feature(
            ee.Geometry.Point([96.15764376384723, 16.769504469924648]),
            {
              "landcover": 1,
              "system:index": "130"
            }),
        ee.Feature(
            ee.Geometry.Point([96.16614100200641, 16.768353938270426]),
            {
              "landcover": 1,
              "system:index": "131"
            }),
        ee.Feature(
            ee.Geometry.Point([96.16682764751422, 16.76646376401171]),
            {
              "landcover": 1,
              "system:index": "132"
            }),
        ee.Feature(
            ee.Geometry.Point([96.17738482219684, 16.767367762740353]),
            {
              "landcover": 1,
              "system:index": "133"
            }),
        ee.Feature(
            ee.Geometry.Point([96.17189165813434, 16.777229287855995]),
            {
              "landcover": 1,
              "system:index": "134"
            }),
        ee.Feature(
            ee.Geometry.Point([96.17137667400348, 16.777722350682108]),
            {
              "landcover": 1,
              "system:index": "135"
            })]),
    water = ui.import && ui.import("water", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            96.20844425979357,
            16.77480605274962
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.21573986831407,
            16.779983214633354
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.2141949159215,
            16.771929790767487
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.20345062016585,
            16.763703490014663
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.18928855656722,
            16.758772440664902
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.17967551945785,
            16.761320165454762
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.17006248234847,
            16.76107361293395
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.1622518896971,
            16.763621306906256
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.15032142399886,
            16.766826421820934
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.1310103812829,
            16.77108726795608
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.12319978863154,
            16.77404572132446
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.11513170391474,
            16.782427755797478
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.12394759105852,
            16.76089567715998
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.11716696666888,
            16.754896128398595
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.11030051159075,
            16.758841058472306
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.16514183205736,
            16.794715650293263
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.16677261513841,
            16.79594819148024
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.20010676032051,
            16.81602902663326
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.20371164923652,
            16.814385810549382
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.19435610419258,
            16.810442033845444
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.18525805121406,
            16.808305787219545
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.23884052239806,
            16.796137458406136
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.2530025859967,
            16.7986025143124
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.24193042718322,
            16.79301500830303
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.22196757299167,
            16.78269269427924
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.22256838781101,
            16.786554874448168
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.20704179373793,
            16.75322317732367
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.19905953970961,
            16.757743442604713
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.20020286671335,
            16.749158713579256
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.20500938526804,
            16.741597141184116
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.21960060230906,
            16.738473795409558
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.20923836301834,
            16.724896681752618
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.20443184446366,
            16.71437481211733
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.21970970701248,
            16.720622242216866
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.20357353757889,
            16.731801343197382
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.21696312498123,
            16.696893963432323
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.21061165403397,
            16.703635220349874
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.2174781091121,
            16.69081018587938
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.2753279931453,
            16.70577264236303
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.27807457517655,
            16.70412847370757
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.27120812009842,
            16.70675913675954
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.2782462365535,
            16.7135000453484
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.27103645872147,
            16.6842329111739
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.23854026899919,
            16.665836417618017
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.3164745341359,
            16.673894323058082
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.31819114790544,
            16.671098761654715
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 2
      },
      "color": "#1488ff",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #1488ff */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([96.20844425979357, 16.77480605274962]),
            {
              "landcover": 2,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([96.21573986831407, 16.779983214633354]),
            {
              "landcover": 2,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([96.2141949159215, 16.771929790767487]),
            {
              "landcover": 2,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([96.20345062016585, 16.763703490014663]),
            {
              "landcover": 2,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([96.18928855656722, 16.758772440664902]),
            {
              "landcover": 2,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([96.17967551945785, 16.761320165454762]),
            {
              "landcover": 2,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([96.17006248234847, 16.76107361293395]),
            {
              "landcover": 2,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([96.1622518896971, 16.763621306906256]),
            {
              "landcover": 2,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([96.15032142399886, 16.766826421820934]),
            {
              "landcover": 2,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([96.1310103812829, 16.77108726795608]),
            {
              "landcover": 2,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([96.12319978863154, 16.77404572132446]),
            {
              "landcover": 2,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([96.11513170391474, 16.782427755797478]),
            {
              "landcover": 2,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([96.12394759105852, 16.76089567715998]),
            {
              "landcover": 2,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([96.11716696666888, 16.754896128398595]),
            {
              "landcover": 2,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([96.11030051159075, 16.758841058472306]),
            {
              "landcover": 2,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([96.16514183205736, 16.794715650293263]),
            {
              "landcover": 2,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([96.16677261513841, 16.79594819148024]),
            {
              "landcover": 2,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([96.20010676032051, 16.81602902663326]),
            {
              "landcover": 2,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([96.20371164923652, 16.814385810549382]),
            {
              "landcover": 2,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([96.19435610419258, 16.810442033845444]),
            {
              "landcover": 2,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([96.18525805121406, 16.808305787219545]),
            {
              "landcover": 2,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([96.23884052239806, 16.796137458406136]),
            {
              "landcover": 2,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([96.2530025859967, 16.7986025143124]),
            {
              "landcover": 2,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([96.24193042718322, 16.79301500830303]),
            {
              "landcover": 2,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([96.22196757299167, 16.78269269427924]),
            {
              "landcover": 2,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([96.22256838781101, 16.786554874448168]),
            {
              "landcover": 2,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([96.20704179373793, 16.75322317732367]),
            {
              "landcover": 2,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([96.19905953970961, 16.757743442604713]),
            {
              "landcover": 2,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([96.20020286671335, 16.749158713579256]),
            {
              "landcover": 2,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([96.20500938526804, 16.741597141184116]),
            {
              "landcover": 2,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([96.21960060230906, 16.738473795409558]),
            {
              "landcover": 2,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([96.20923836301834, 16.724896681752618]),
            {
              "landcover": 2,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([96.20443184446366, 16.71437481211733]),
            {
              "landcover": 2,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([96.21970970701248, 16.720622242216866]),
            {
              "landcover": 2,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([96.20357353757889, 16.731801343197382]),
            {
              "landcover": 2,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([96.21696312498123, 16.696893963432323]),
            {
              "landcover": 2,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([96.21061165403397, 16.703635220349874]),
            {
              "landcover": 2,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([96.2174781091121, 16.69081018587938]),
            {
              "landcover": 2,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([96.2753279931453, 16.70577264236303]),
            {
              "landcover": 2,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([96.27807457517655, 16.70412847370757]),
            {
              "landcover": 2,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([96.27120812009842, 16.70675913675954]),
            {
              "landcover": 2,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([96.2782462365535, 16.7135000453484]),
            {
              "landcover": 2,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([96.27103645872147, 16.6842329111739]),
            {
              "landcover": 2,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([96.23854026899919, 16.665836417618017]),
            {
              "landcover": 2,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([96.3164745341359, 16.673894323058082]),
            {
              "landcover": 2,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([96.31819114790544, 16.671098761654715]),
            {
              "landcover": 2,
              "system:index": "45"
            })]),
    forest = ui.import && ui.import("forest", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            96.15927905027287,
            16.789861705828475
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.16071671430485,
            16.791135364146
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.16041630689519,
            16.79019039266376
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.15839928571599,
            16.78938921750605
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.15758389417546,
            16.790087678088838
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.16375358857938,
            16.79915499710842
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.16173656740018,
            16.80005884028776
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.16147907533475,
            16.800798345141683
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.16132887162992,
            16.799956131052355
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.16068514146635,
            16.800079382128168
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.16047056474515,
            16.79987396362399
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.14862592973539,
            16.79710079205602
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.14793928422758,
            16.797388382101776
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.14845426835844,
            16.796854285955682
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.14823969163724,
            16.796998081219776
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.1441627339346,
            16.795190361405105
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.1441627339346,
            16.795847716056862
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.14457042970487,
            16.795251988500404
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.14487083711454,
            16.79605313891869
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.14439876832792,
            16.79508764953514
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.14375503816434,
            16.79494385282382
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.14313276567289,
            16.7953136155757
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.14255340852567,
            16.795026022386487
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.13771758982735,
            16.797963560886032
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.13771758982735,
            16.797347297836204
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.13666616389351,
            16.7979430188166
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.13391481743221,
            16.794520024546944
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.13425814018612,
            16.794232430155457
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.130095351795,
            16.794869245722293
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.13202654228573,
            16.791233205539584
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.13241278038387,
            16.791500261707682
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.13236986503964,
            16.790904520509375
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.13812052116756,
            16.793123133421478
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.13756262169247,
            16.793369644366944
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.13799177513485,
            16.792589025274935
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.13533102379208,
            16.7933285592316
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.2309412662087,
            16.767266940983696
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.23102709689718,
            16.768150390603097
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.23089835086446,
            16.768520205504164
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.2304906550942,
            16.76825311703664
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.23055502811056,
            16.766342396289303
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.2311558429299,
            16.766321850800598
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.23117730060201,
            16.767205304810574
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.23217201669175,
            16.768766015019004
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.00205951593381,
            16.691868432284732
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.00532108209592,
            16.69614351577126
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.00343280694943,
            16.690717431925307
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            95.99725299737912,
            16.68808654792771
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            95.99656635187131,
            16.682495799190605
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            95.99999957941037,
            16.68118030513799
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            95.9742503728674,
            16.68677109234758
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            95.97373538873654,
            16.678055970490778
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            95.96824222467404,
            16.68167361646838
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            95.97528034112912,
            16.675096027425
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            95.98369174859982,
            16.68611336116246
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.00703769586545,
            16.683153542822676
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.00240283868771,
            16.678384850225903
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            95.9987979497717,
            16.67279381781738
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            95.9936481084631,
            16.663584702366627
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            95.99004321954709,
            16.66621592343039
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            95.98575168512326,
            16.667367071271055
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            95.98180347345334,
            16.67213603855488
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            95.98403507135373,
            16.683482413790145
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            95.97528034112912,
            16.684304588733674
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            95.95983081720334,
            16.690717431925307
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.00051456354123,
            16.667202622003458
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.00480609796506,
            16.677069327892
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            95.9962230291174,
            16.680358116759034
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            95.97562366388303,
            16.668847108320126
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            95.9713321294592,
            16.667367071271055
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            95.96755557916623,
            16.670984919403605
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            95.96480899713498,
            16.680686992534856
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            95.95218013717327,
            16.697763527446053
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            95.95286678268108,
            16.70697099648059
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            95.95458339645062,
            16.696612562602432
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 3
      },
      "color": "#50ff00",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #50ff00 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([96.15927905027287, 16.789861705828475]),
            {
              "landcover": 3,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([96.16071671430485, 16.791135364146]),
            {
              "landcover": 3,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([96.16041630689519, 16.79019039266376]),
            {
              "landcover": 3,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([96.15839928571599, 16.78938921750605]),
            {
              "landcover": 3,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([96.15758389417546, 16.790087678088838]),
            {
              "landcover": 3,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([96.16375358857938, 16.79915499710842]),
            {
              "landcover": 3,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([96.16173656740018, 16.80005884028776]),
            {
              "landcover": 3,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([96.16147907533475, 16.800798345141683]),
            {
              "landcover": 3,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([96.16132887162992, 16.799956131052355]),
            {
              "landcover": 3,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([96.16068514146635, 16.800079382128168]),
            {
              "landcover": 3,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([96.16047056474515, 16.79987396362399]),
            {
              "landcover": 3,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([96.14862592973539, 16.79710079205602]),
            {
              "landcover": 3,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([96.14793928422758, 16.797388382101776]),
            {
              "landcover": 3,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([96.14845426835844, 16.796854285955682]),
            {
              "landcover": 3,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([96.14823969163724, 16.796998081219776]),
            {
              "landcover": 3,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([96.1441627339346, 16.795190361405105]),
            {
              "landcover": 3,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([96.1441627339346, 16.795847716056862]),
            {
              "landcover": 3,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([96.14457042970487, 16.795251988500404]),
            {
              "landcover": 3,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([96.14487083711454, 16.79605313891869]),
            {
              "landcover": 3,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([96.14439876832792, 16.79508764953514]),
            {
              "landcover": 3,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([96.14375503816434, 16.79494385282382]),
            {
              "landcover": 3,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([96.14313276567289, 16.7953136155757]),
            {
              "landcover": 3,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([96.14255340852567, 16.795026022386487]),
            {
              "landcover": 3,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([96.13771758982735, 16.797963560886032]),
            {
              "landcover": 3,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([96.13771758982735, 16.797347297836204]),
            {
              "landcover": 3,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([96.13666616389351, 16.7979430188166]),
            {
              "landcover": 3,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([96.13391481743221, 16.794520024546944]),
            {
              "landcover": 3,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([96.13425814018612, 16.794232430155457]),
            {
              "landcover": 3,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([96.130095351795, 16.794869245722293]),
            {
              "landcover": 3,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([96.13202654228573, 16.791233205539584]),
            {
              "landcover": 3,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([96.13241278038387, 16.791500261707682]),
            {
              "landcover": 3,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([96.13236986503964, 16.790904520509375]),
            {
              "landcover": 3,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([96.13812052116756, 16.793123133421478]),
            {
              "landcover": 3,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([96.13756262169247, 16.793369644366944]),
            {
              "landcover": 3,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([96.13799177513485, 16.792589025274935]),
            {
              "landcover": 3,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([96.13533102379208, 16.7933285592316]),
            {
              "landcover": 3,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([96.2309412662087, 16.767266940983696]),
            {
              "landcover": 3,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([96.23102709689718, 16.768150390603097]),
            {
              "landcover": 3,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([96.23089835086446, 16.768520205504164]),
            {
              "landcover": 3,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([96.2304906550942, 16.76825311703664]),
            {
              "landcover": 3,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([96.23055502811056, 16.766342396289303]),
            {
              "landcover": 3,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([96.2311558429299, 16.766321850800598]),
            {
              "landcover": 3,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([96.23117730060201, 16.767205304810574]),
            {
              "landcover": 3,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([96.23217201669175, 16.768766015019004]),
            {
              "landcover": 3,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([96.00205951593381, 16.691868432284732]),
            {
              "landcover": 3,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([96.00532108209592, 16.69614351577126]),
            {
              "landcover": 3,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([96.00343280694943, 16.690717431925307]),
            {
              "landcover": 3,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([95.99725299737912, 16.68808654792771]),
            {
              "landcover": 3,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([95.99656635187131, 16.682495799190605]),
            {
              "landcover": 3,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([95.99999957941037, 16.68118030513799]),
            {
              "landcover": 3,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([95.9742503728674, 16.68677109234758]),
            {
              "landcover": 3,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([95.97373538873654, 16.678055970490778]),
            {
              "landcover": 3,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([95.96824222467404, 16.68167361646838]),
            {
              "landcover": 3,
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Point([95.97528034112912, 16.675096027425]),
            {
              "landcover": 3,
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Point([95.98369174859982, 16.68611336116246]),
            {
              "landcover": 3,
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Point([96.00703769586545, 16.683153542822676]),
            {
              "landcover": 3,
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Point([96.00240283868771, 16.678384850225903]),
            {
              "landcover": 3,
              "system:index": "56"
            }),
        ee.Feature(
            ee.Geometry.Point([95.9987979497717, 16.67279381781738]),
            {
              "landcover": 3,
              "system:index": "57"
            }),
        ee.Feature(
            ee.Geometry.Point([95.9936481084631, 16.663584702366627]),
            {
              "landcover": 3,
              "system:index": "58"
            }),
        ee.Feature(
            ee.Geometry.Point([95.99004321954709, 16.66621592343039]),
            {
              "landcover": 3,
              "system:index": "59"
            }),
        ee.Feature(
            ee.Geometry.Point([95.98575168512326, 16.667367071271055]),
            {
              "landcover": 3,
              "system:index": "60"
            }),
        ee.Feature(
            ee.Geometry.Point([95.98180347345334, 16.67213603855488]),
            {
              "landcover": 3,
              "system:index": "61"
            }),
        ee.Feature(
            ee.Geometry.Point([95.98403507135373, 16.683482413790145]),
            {
              "landcover": 3,
              "system:index": "62"
            }),
        ee.Feature(
            ee.Geometry.Point([95.97528034112912, 16.684304588733674]),
            {
              "landcover": 3,
              "system:index": "63"
            }),
        ee.Feature(
            ee.Geometry.Point([95.95983081720334, 16.690717431925307]),
            {
              "landcover": 3,
              "system:index": "64"
            }),
        ee.Feature(
            ee.Geometry.Point([96.00051456354123, 16.667202622003458]),
            {
              "landcover": 3,
              "system:index": "65"
            }),
        ee.Feature(
            ee.Geometry.Point([96.00480609796506, 16.677069327892]),
            {
              "landcover": 3,
              "system:index": "66"
            }),
        ee.Feature(
            ee.Geometry.Point([95.9962230291174, 16.680358116759034]),
            {
              "landcover": 3,
              "system:index": "67"
            }),
        ee.Feature(
            ee.Geometry.Point([95.97562366388303, 16.668847108320126]),
            {
              "landcover": 3,
              "system:index": "68"
            }),
        ee.Feature(
            ee.Geometry.Point([95.9713321294592, 16.667367071271055]),
            {
              "landcover": 3,
              "system:index": "69"
            }),
        ee.Feature(
            ee.Geometry.Point([95.96755557916623, 16.670984919403605]),
            {
              "landcover": 3,
              "system:index": "70"
            }),
        ee.Feature(
            ee.Geometry.Point([95.96480899713498, 16.680686992534856]),
            {
              "landcover": 3,
              "system:index": "71"
            }),
        ee.Feature(
            ee.Geometry.Point([95.95218013717327, 16.697763527446053]),
            {
              "landcover": 3,
              "system:index": "72"
            }),
        ee.Feature(
            ee.Geometry.Point([95.95286678268108, 16.70697099648059]),
            {
              "landcover": 3,
              "system:index": "73"
            }),
        ee.Feature(
            ee.Geometry.Point([95.95458339645062, 16.696612562602432]),
            {
              "landcover": 3,
              "system:index": "74"
            })]),
    agriculture = ui.import && ui.import("agriculture", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            96.16613778651403,
            16.743914295600227
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.15360650599645,
            16.744160870348765
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.14330682337926,
            16.742763609219256
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.16055879176305,
            16.73396884801176
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.15180406153844,
            16.732324922381082
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.16055879176305,
            16.73807860004278
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.14751252711461,
            16.738982733593165
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.17566499293493,
            16.742106071023066
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.17858323634313,
            16.739475895539353
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.17849740565465,
            16.744982783871535
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.17446336329625,
            16.747366313026635
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.16862687647985,
            16.748681350823045
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.17403420985387,
            16.732735905118172
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.16630944789098,
            16.733393475654072
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.16802606166051,
            16.736845683741063
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.15643891871618,
            16.728461641335034
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.1450234371488,
            16.720652642728638
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.1644211727445,
            16.724022881353918
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.16725358546422,
            16.725584679056436
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.17309007228063,
            16.72837944301528
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.16759690821813,
            16.729776809630685
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.16382035792516,
            16.732571512129674
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.1274281460111,
            16.73733885121916
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.11489686549352,
            16.737503240094856
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.10322389186071,
            16.737503240094856
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.11918839991735,
            16.745229357236635
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            96.11894043803343,
            16.73387829534045
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 4
      },
      "color": "#f5ff00",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #f5ff00 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([96.16613778651403, 16.743914295600227]),
            {
              "landcover": 4,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([96.15360650599645, 16.744160870348765]),
            {
              "landcover": 4,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([96.14330682337926, 16.742763609219256]),
            {
              "landcover": 4,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([96.16055879176305, 16.73396884801176]),
            {
              "landcover": 4,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([96.15180406153844, 16.732324922381082]),
            {
              "landcover": 4,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([96.16055879176305, 16.73807860004278]),
            {
              "landcover": 4,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([96.14751252711461, 16.738982733593165]),
            {
              "landcover": 4,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([96.17566499293493, 16.742106071023066]),
            {
              "landcover": 4,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([96.17858323634313, 16.739475895539353]),
            {
              "landcover": 4,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([96.17849740565465, 16.744982783871535]),
            {
              "landcover": 4,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([96.17446336329625, 16.747366313026635]),
            {
              "landcover": 4,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([96.16862687647985, 16.748681350823045]),
            {
              "landcover": 4,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([96.17403420985387, 16.732735905118172]),
            {
              "landcover": 4,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([96.16630944789098, 16.733393475654072]),
            {
              "landcover": 4,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([96.16802606166051, 16.736845683741063]),
            {
              "landcover": 4,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([96.15643891871618, 16.728461641335034]),
            {
              "landcover": 4,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([96.1450234371488, 16.720652642728638]),
            {
              "landcover": 4,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([96.1644211727445, 16.724022881353918]),
            {
              "landcover": 4,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([96.16725358546422, 16.725584679056436]),
            {
              "landcover": 4,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([96.17309007228063, 16.72837944301528]),
            {
              "landcover": 4,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([96.16759690821813, 16.729776809630685]),
            {
              "landcover": 4,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([96.16382035792516, 16.732571512129674]),
            {
              "landcover": 4,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([96.1274281460111, 16.73733885121916]),
            {
              "landcover": 4,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([96.11489686549352, 16.737503240094856]),
            {
              "landcover": 4,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([96.10322389186071, 16.737503240094856]),
            {
              "landcover": 4,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([96.11918839991735, 16.745229357236635]),
            {
              "landcover": 4,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([96.11894043803343, 16.73387829534045]),
            {
              "landcover": 4,
              "system:index": "26"
            })]),
    yangon = ui.import && ui.import("yangon", "table", {
      "id": "users/tobyzawthuhtet/mmr_yangoncity_adm5_polbnda_mimu_v9"
    }) || ee.FeatureCollection("users/tobyzawthuhtet/mmr_yangoncity_adm5_polbnda_mimu_v9");
Map.centerObject(yangonState,10);
Map.setOptions('Satellite');
var startyear = 2019;
var endyear = 2019;
// Set date in ee date format
var startdate = ee.Date.fromYMD(startyear,1,1);
var enddate = ee.Date.fromYMD(endyear,12,31);
// Filter image collection
var s1Collection = ee.ImageCollection("COPERNICUS/S1_GRD").filterDate(startdate,enddate).filterBounds(yangonState);
print('S1 collection',s1Collection);
Map.addLayer(s1Collection.median().clip(yangonState),imageVisParam,'s1 first image',0);
var s1medianImage= s1Collection.reduce(ee.Reducer.median());
print('S1 median', s1medianImage);
Map.addLayer(s1medianImage.clip(yangonState),imageVisParam_median,'S1 median image',0);
var months = ee.List.sequence(1,12);
// Function to calculate monthly NDVI from cloudfree imageCollection
function calculateBS(month){
  var monthBS = s1Collection.select("VH")
  .filter(ee.Filter.calendarRange(month, month, 'month')).mean();
  return monthBS.set('year', 2019).set('month', month)
  .set('date', ee.Date.fromYMD(2019,month,1))
  .set('system:time_start',ee.Date.fromYMD(2019,month,1));
}
// Map the function to create new imageCollection with 12 images
var monthlyBS =  ee.ImageCollection.fromImages(months.map(calculateBS).flatten());
// List the 12 images into new list
var myBSlist = monthlyBS.select("VH").toList(12);
// Training image with NDVI values of January as band 1
var trainingImage = ee.Image(myBSlist.get(0)).rename("jan");
// List of month names
var monthNames = ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];
// Add bands (NDVI feb - dec) to image
for (var i = 1; i < myBSlist.length().getInfo(); i++) {
  var myMap = ee.Image(myBSlist.get(i)).rename(monthNames[i]);
  trainingImage = trainingImage.addBands(myMap);
}
// Add training image to canvas
var monthBS = {
  bands : ["jan"], // NDVI month
  palette : ['darkblue', 'blue', 'red', 'orange', 'yellow', 'green', 'darkgreen'],
  min : -0.4,
  max : 0.9
};
Map.addLayer(trainingImage.clip(yangonState),imageVisParam_ti,'trainingImage Jan',0);
// Merge all training samples into new FeatureCollection  
var trainingFeatures = urban   // 1  
.merge(water)       // 2  
.merge(forest)      // 3  
.merge(agriculture);// 4 
// Inspect the merged FeatureCollection  
print(trainingFeatures, "training features");  
// Predefine the chart options
var chartOptions = {
  title: 'Backscatter value of Landcover overtime',
  hAxis: {title: 'Time'},
  vAxis: {title: 'BackScatter'},
  lineWidth: 1,
  pointSize: 4,
  series: {
    0: {color: 'FF0000'}, // urban
    1: {color: '0000FF'}, // water
    2: {color: '008000'}, // forest
    3: {color: 'FFA500'}, // agriculture
}};
var chart1 =
    ui.Chart.image
        .seriesByRegion({
          imageCollection: monthlyBS,
          band: 'VH',
          regions: trainingFeatures,
          reducer: ee.Reducer.mean(),
          scale: 30,
          seriesProperty: 'landcover',
          xProperty: 'system:time_start'
        })
        .setSeriesNames(['Urban', 'Water','Forest','Agriculture'])
        .setOptions(chartOptions);
chart1.style().set({
position:'bottom-right',
width:'550px',
height:'300px'
});
Map.add(chart1);
// Create training data  
var classifierTraining = trainingImage.select(monthNames).sampleRegions({
    collection: trainingFeatures,
    properties: ['landcover'],
    scale: 30
});
print("training",classifierTraining);
// Train the classifier
var trainClassifier = ee.Classifier.smileRandomForest(20).train({
    features: classifierTraining,
    classProperty: 'landcover',
    inputProperties: monthNames
});
var landcoverClassified = trainingImage.select(monthNames).classify(trainClassifier);
// add the result to the Map
Map.addLayer(landcoverClassified, {min: 1, max: 4,
palette: ['FF0000','#1488ff','#50ff00','#f5ff00']},'land cover classification');
Map.addLayer(yangon,{},'Yangon States',0)
//Add legends
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'Legend',
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
var palette =['FF0000', '1488ff', '50ff00','f5ff00'];
// name of the legend
var names = ['Urban','Water Bodies','Forest','Agriculture'];
// Add color and and names
for (var i = 0; i < 4; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
Map.add(legend);
print('RF SAR accuracy',trainClassifier.confusionMatrix().accuracy());
var text1=ui.Label('Landcover Classification by time-series radar data');
Map.add(text1);
var text2=ui.Label('classification accuracy : 0.9647887323943662 ');
text2.style().set('position','bottom-center');
Map.add(text2)