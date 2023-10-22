var Palawan_Dissolve = ui.import && ui.import("Palawan_Dissolve", "table", {
      "id": "users/njberkowitz95/Palawan_Dissolve"
    }) || ee.FeatureCollection("users/njberkowitz95/Palawan_Dissolve"),
    Palawan = ui.import && ui.import("Palawan", "table", {
      "id": "users/njberkowitz95/Palawan"
    }) || ee.FeatureCollection("users/njberkowitz95/Palawan"),
    Palawan_Dissolve_Buffer = ui.import && ui.import("Palawan_Dissolve_Buffer", "table", {
      "id": "users/njberkowitz95/PAL1"
    }) || ee.FeatureCollection("users/njberkowitz95/PAL1"),
    dataset = ui.import && ui.import("dataset", "image", {
      "id": "UMD/hansen/global_forest_change_2019_v1_7"
    }) || ee.Image("UMD/hansen/global_forest_change_2019_v1_7"),
    Forest = ui.import && ui.import("Forest", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                118.16130859672161,
                9.124425572843288
              ],
              [
                118.16130859672161,
                9.123069656472826
              ],
              [
                118.16285354911419,
                9.123069656472826
              ],
              [
                118.16285354911419,
                9.124425572843288
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
                118.1701491576347,
                9.132984675954212
              ],
              [
                118.1701491576347,
                9.132391477415258
              ],
              [
                118.17066414176556,
                9.132391477415258
              ],
              [
                118.17066414176556,
                9.132984675954212
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
                118.44978397585767,
                9.228827063157842
              ],
              [
                118.44978397585767,
                9.223913288053385
              ],
              [
                118.45356052615064,
                9.223913288053385
              ],
              [
                118.45356052615064,
                9.228827063157842
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
                118.43639438845533,
                9.227810425649311
              ],
              [
                118.43639438845533,
                9.223743846311736
              ],
              [
                118.4405142615022,
                9.223743846311736
              ],
              [
                118.4405142615022,
                9.227810425649311
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
                118.43725269534009,
                9.217474444677839
              ],
              [
                118.43725269534009,
                9.21357719295285
              ],
              [
                118.44188755251783,
                9.21357719295285
              ],
              [
                118.44188755251783,
                9.217474444677839
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
                118.44463413454908,
                9.235943443633142
              ],
              [
                118.44463413454908,
                9.232893583879296
              ],
              [
                118.448582346219,
                9.232893583879296
              ],
              [
                118.448582346219,
                9.235943443633142
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
                118.6227660368309,
                9.4549920170183
              ],
              [
                118.6227660368309,
                9.446694778932757
              ],
              [
                118.63031913741683,
                9.446694778932757
              ],
              [
                118.63031913741683,
                9.4549920170183
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
                118.68382411362632,
                9.761698909281183
              ],
              [
                118.68382411362632,
                9.757300304996404
              ],
              [
                118.68742900254233,
                9.757300304996404
              ],
              [
                118.68742900254233,
                9.761698909281183
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
                118.68657069565757,
                9.771172628854353
              ],
              [
                118.68657069565757,
                9.768804224240766
              ],
              [
                118.69000392319663,
                9.768804224240766
              ],
              [
                118.69000392319663,
                9.771172628854353
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
                118.68468242051108,
                9.74968719882898
              ],
              [
                118.68468242051108,
                9.746134356457878
              ],
              [
                118.69172053696616,
                9.746134356457878
              ],
              [
                118.69172053696616,
                9.74968719882898
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
                119.34868144232098,
                11.225615599004414
              ],
              [
                119.34868144232098,
                11.221237758895557
              ],
              [
                119.35451792913739,
                11.221237758895557
              ],
              [
                119.35451792913739,
                11.225615599004414
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
                119.36722087103192,
                11.216017939727095
              ],
              [
                119.36722087103192,
                11.21079802625903
              ],
              [
                119.37340068060223,
                11.21079802625903
              ],
              [
                119.37340068060223,
                11.216017939727095
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
        },
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
      },
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.MultiPolygon(
        [[[[118.16130859672161, 9.124425572843288],
           [118.16130859672161, 9.123069656472826],
           [118.16285354911419, 9.123069656472826],
           [118.16285354911419, 9.124425572843288]]],
         [[[118.1701491576347, 9.132984675954212],
           [118.1701491576347, 9.132391477415258],
           [118.17066414176556, 9.132391477415258],
           [118.17066414176556, 9.132984675954212]]],
         [[[118.44978397585767, 9.228827063157842],
           [118.44978397585767, 9.223913288053385],
           [118.45356052615064, 9.223913288053385],
           [118.45356052615064, 9.228827063157842]]],
         [[[118.43639438845533, 9.227810425649311],
           [118.43639438845533, 9.223743846311736],
           [118.4405142615022, 9.223743846311736],
           [118.4405142615022, 9.227810425649311]]],
         [[[118.43725269534009, 9.217474444677839],
           [118.43725269534009, 9.21357719295285],
           [118.44188755251783, 9.21357719295285],
           [118.44188755251783, 9.217474444677839]]],
         [[[118.44463413454908, 9.235943443633142],
           [118.44463413454908, 9.232893583879296],
           [118.448582346219, 9.232893583879296],
           [118.448582346219, 9.235943443633142]]],
         [[[118.6227660368309, 9.4549920170183],
           [118.6227660368309, 9.446694778932757],
           [118.63031913741683, 9.446694778932757],
           [118.63031913741683, 9.4549920170183]]],
         [[[118.68382411362632, 9.761698909281183],
           [118.68382411362632, 9.757300304996404],
           [118.68742900254233, 9.757300304996404],
           [118.68742900254233, 9.761698909281183]]],
         [[[118.68657069565757, 9.771172628854353],
           [118.68657069565757, 9.768804224240766],
           [118.69000392319663, 9.768804224240766],
           [118.69000392319663, 9.771172628854353]]],
         [[[118.68468242051108, 9.74968719882898],
           [118.68468242051108, 9.746134356457878],
           [118.69172053696616, 9.746134356457878],
           [118.69172053696616, 9.74968719882898]]],
         [[[119.34868144232098, 11.225615599004414],
           [119.34868144232098, 11.221237758895557],
           [119.35451792913739, 11.221237758895557],
           [119.35451792913739, 11.225615599004414]]],
         [[[119.36722087103192, 11.216017939727095],
           [119.36722087103192, 11.21079802625903],
           [119.37340068060223, 11.21079802625903],
           [119.37340068060223, 11.216017939727095]]]], null, false),
    Land = ui.import && ui.import("Land", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                118.73924787515966,
                9.781159785640586
              ],
              [
                118.73924787515966,
                9.77989103765449
              ],
              [
                118.74036367410986,
                9.77989103765449
              ],
              [
                118.74036367410986,
                9.781159785640586
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
                118.73298223490087,
                9.782513111487336
              ],
              [
                118.73298223490087,
                9.780736870183336
              ],
              [
                118.73487051004736,
                9.780736870183336
              ],
              [
                118.73487051004736,
                9.782513111487336
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
                118.73830373758642,
                9.777099775039607
              ],
              [
                118.73830373758642,
                9.775915595941646
              ],
              [
                118.73933370584814,
                9.775915595941646
              ],
              [
                118.73933370584814,
                9.777099775039607
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
                118.739848689979,
                9.773631810059017
              ],
              [
                118.739848689979,
                9.772955129748905
              ],
              [
                118.74079282755224,
                9.772955129748905
              ],
              [
                118.74079282755224,
                9.773631810059017
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
                118.73855402031991,
                9.855084415861773
              ],
              [
                118.73855402031991,
                9.853223999228701
              ],
              [
                118.74061395684335,
                9.853223999228701
              ],
              [
                118.74061395684335,
                9.855084415861773
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
                118.7356357769117,
                9.851617267329189
              ],
              [
                118.7356357769117,
                9.850095093048786
              ],
              [
                118.736408253108,
                9.850095093048786
              ],
              [
                118.736408253108,
                9.851617267329189
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
                118.7393394511855,
                9.836395208679507
              ],
              [
                118.7393394511855,
                9.834534686733855
              ],
              [
                118.74054108082417,
                9.834534686733855
              ],
              [
                118.74054108082417,
                9.836395208679507
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
                118.73779449879292,
                9.84451372728845
              ],
              [
                118.73779449879292,
                9.842822385701057
              ],
              [
                118.73976860462788,
                9.842822385701057
              ],
              [
                118.73976860462788,
                9.84451372728845
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
                118.73809418580993,
                9.901766992635512
              ],
              [
                118.73809418580993,
                9.90075236518875
              ],
              [
                118.73946747682555,
                9.90075236518875
              ],
              [
                118.73946747682555,
                9.901766992635512
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
                118.7418707361029,
                9.905656368790055
              ],
              [
                118.7418707361029,
                9.904388099022109
              ],
              [
                118.74358734987243,
                9.904388099022109
              ],
              [
                118.74358734987243,
                9.905656368790055
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
                118.93017611253244,
                9.98274631974991
              ],
              [
                118.93017611253244,
                9.98063303259496
              ],
              [
                118.93206438767892,
                9.98063303259496
              ],
              [
                118.93206438767892,
                9.98274631974991
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
                118.90734514939767,
                9.979111457349703
              ],
              [
                118.90734514939767,
                9.978012537473047
              ],
              [
                118.9090617631672,
                9.978012537473047
              ],
              [
                118.9090617631672,
                9.979111457349703
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
                118.93970331895333,
                9.985704898717122
              ],
              [
                118.93970331895333,
                9.984183347178767
              ],
              [
                118.94081911790353,
                9.984183347178767
              ],
              [
                118.94081911790353,
                9.985704898717122
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
                118.90142283189279,
                9.9809711594616
              ],
              [
                118.90142283189279,
                9.97961864988815
              ],
              [
                118.9035685991047,
                9.97961864988815
              ],
              [
                118.9035685991047,
                9.9809711594616
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
                119.38337657965099,
                11.039777020760253
              ],
              [
                119.38337657965099,
                11.038766110857274
              ],
              [
                119.3844065479127,
                11.038766110857274
              ],
              [
                119.3844065479127,
                11.039777020760253
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
                119.42063705751738,
                11.050563948393494
              ],
              [
                119.42063705751738,
                11.048626439220454
              ],
              [
                119.4227828247293,
                11.048626439220454
              ],
              [
                119.4227828247293,
                11.050563948393494
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
                119.42149536440215,
                11.046520436478554
              ],
              [
                119.42149536440215,
                11.045004105146724
              ],
              [
                119.42338363954863,
                11.045004105146724
              ],
              [
                119.42338363954863,
                11.046520436478554
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
                119.42149536440215,
                11.054186213827318
              ],
              [
                119.42149536440215,
                11.053428068949609
              ],
              [
                119.42201034853301,
                11.053428068949609
              ],
              [
                119.42201034853301,
                11.054186213827318
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
                119.42192451784453,
                11.052248728577965
              ],
              [
                119.42192451784453,
                11.051406339695223
              ],
              [
                119.42261116335234,
                11.051406339695223
              ],
              [
                119.42261116335234,
                11.052248728577965
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
                118.85206099395165,
                9.975976889536598
              ],
              [
                118.85206099395165,
                9.975596490953276
              ],
              [
                118.85257597808251,
                9.975596490953276
              ],
              [
                118.85257597808251,
                9.975976889536598
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
                118.8504302108706,
                9.974941359018517
              ],
              [
                118.8504302108706,
                9.974455292538119
              ],
              [
                118.85128851775536,
                9.974455292538119
              ],
              [
                118.85128851775536,
                9.974941359018517
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
        },
        {
          "type": "rectangle"
        },
        {
          "type": "rectangle"
        }
      ],
      "properties": {},
      "color": "#98ff00",
      "mode": "Geometry",
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
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.MultiPolygon(
        [[[[118.73924787515966, 9.781159785640586],
           [118.73924787515966, 9.77989103765449],
           [118.74036367410986, 9.77989103765449],
           [118.74036367410986, 9.781159785640586]]],
         [[[118.73298223490087, 9.782513111487336],
           [118.73298223490087, 9.780736870183336],
           [118.73487051004736, 9.780736870183336],
           [118.73487051004736, 9.782513111487336]]],
         [[[118.73830373758642, 9.777099775039607],
           [118.73830373758642, 9.775915595941646],
           [118.73933370584814, 9.775915595941646],
           [118.73933370584814, 9.777099775039607]]],
         [[[118.739848689979, 9.773631810059017],
           [118.739848689979, 9.772955129748905],
           [118.74079282755224, 9.772955129748905],
           [118.74079282755224, 9.773631810059017]]],
         [[[118.73855402031991, 9.855084415861773],
           [118.73855402031991, 9.853223999228701],
           [118.74061395684335, 9.853223999228701],
           [118.74061395684335, 9.855084415861773]]],
         [[[118.7356357769117, 9.851617267329189],
           [118.7356357769117, 9.850095093048786],
           [118.736408253108, 9.850095093048786],
           [118.736408253108, 9.851617267329189]]],
         [[[118.7393394511855, 9.836395208679507],
           [118.7393394511855, 9.834534686733855],
           [118.74054108082417, 9.834534686733855],
           [118.74054108082417, 9.836395208679507]]],
         [[[118.73779449879292, 9.84451372728845],
           [118.73779449879292, 9.842822385701057],
           [118.73976860462788, 9.842822385701057],
           [118.73976860462788, 9.84451372728845]]],
         [[[118.73809418580993, 9.901766992635512],
           [118.73809418580993, 9.90075236518875],
           [118.73946747682555, 9.90075236518875],
           [118.73946747682555, 9.901766992635512]]],
         [[[118.7418707361029, 9.905656368790055],
           [118.7418707361029, 9.904388099022109],
           [118.74358734987243, 9.904388099022109],
           [118.74358734987243, 9.905656368790055]]],
         [[[118.93017611253244, 9.98274631974991],
           [118.93017611253244, 9.98063303259496],
           [118.93206438767892, 9.98063303259496],
           [118.93206438767892, 9.98274631974991]]],
         [[[118.90734514939767, 9.979111457349703],
           [118.90734514939767, 9.978012537473047],
           [118.9090617631672, 9.978012537473047],
           [118.9090617631672, 9.979111457349703]]],
         [[[118.93970331895333, 9.985704898717122],
           [118.93970331895333, 9.984183347178767],
           [118.94081911790353, 9.984183347178767],
           [118.94081911790353, 9.985704898717122]]],
         [[[118.90142283189279, 9.9809711594616],
           [118.90142283189279, 9.97961864988815],
           [118.9035685991047, 9.97961864988815],
           [118.9035685991047, 9.9809711594616]]],
         [[[119.38337657965099, 11.039777020760253],
           [119.38337657965099, 11.038766110857274],
           [119.3844065479127, 11.038766110857274],
           [119.3844065479127, 11.039777020760253]]],
         [[[119.42063705751738, 11.050563948393494],
           [119.42063705751738, 11.048626439220454],
           [119.4227828247293, 11.048626439220454],
           [119.4227828247293, 11.050563948393494]]],
         [[[119.42149536440215, 11.046520436478554],
           [119.42149536440215, 11.045004105146724],
           [119.42338363954863, 11.045004105146724],
           [119.42338363954863, 11.046520436478554]]],
         [[[119.42149536440215, 11.054186213827318],
           [119.42149536440215, 11.053428068949609],
           [119.42201034853301, 11.053428068949609],
           [119.42201034853301, 11.054186213827318]]],
         [[[119.42192451784453, 11.052248728577965],
           [119.42192451784453, 11.051406339695223],
           [119.42261116335234, 11.051406339695223],
           [119.42261116335234, 11.052248728577965]]],
         [[[118.85206099395165, 9.975976889536598],
           [118.85206099395165, 9.975596490953276],
           [118.85257597808251, 9.975596490953276],
           [118.85257597808251, 9.975976889536598]]],
         [[[118.8504302108706, 9.974941359018517],
           [118.8504302108706, 9.974455292538119],
           [118.85128851775536, 9.974455292538119],
           [118.85128851775536, 9.974941359018517]]]], null, false);
var treeCoverVisParam = {
  bands: ['treecover2000'],
  min: 0,
  max: 100,
  palette: ['black', 'green']
};
Map.addLayer(dataset.clip(Palawan_Dissolve_Buffer), treeCoverVisParam, 'tree cover');
var treeLossVisParam = {
  bands: ['lossyear'],
  min: 0,
  max: 19,
  palette: ['yellow', 'red']
};
Map.addLayer(dataset.clip(Palawan_Dissolve_Buffer), treeLossVisParam, 'tree loss year');
var Palawan_Dissolve_Buffer1=Palawan_Dissolve_Buffer.geometry();
Map.centerObject(Palawan_Dissolve_Buffer1);
Map.addLayer(Palawan_Dissolve_Buffer1, {color: 'red'}, 'PALBuf');
var Palawan_Dissolve1=Palawan_Dissolve.geometry();
Map.centerObject(Palawan_Dissolve1);
Map.addLayer(Palawan_Dissolve1, {color: 'orange'}, 'PALDIS');
var Palawan1=Palawan.geometry();
Map.centerObject(Palawan1);
Map.addLayer(Palawan1, {color: 'grey'}, 'PAL');
//load images for composite
var sr14= ee.ImageCollection('LANDSAT/LT05/C01/T1_SR')
.filterBounds(Palawan_Dissolve_Buffer1)
.filterDate('2010-01-01','2010-12-31').sort('CLOUD_COVER',false);
var count = sr14.size();
print(sr14.limit(100),"sceneID's")
var count = sr14.size();
print('Count of landsat5 Images Number: ', count);
// Temporally composite the images with a maximum value function.
var visParams = {bands: ['B4', 'B5', 'B3'], min:0,max: 5000};
Map.addLayer(sr14, visParams, 'max value composite');
var getQABits = function(image, start, end, newName) {
    // Compute the bits we need to extract.
    var pattern = 0;
    for (var i = start; i <= end; i++) {
       pattern += Math.pow(2, i);
    }
    // Return a single band image of the extracted QA bits, giving the band
    // a new name.
    return image.select([0], [newName])
                  .bitwiseAnd(pattern)
                  .rightShift(start);
};
// A function to mask out cloudy pixels.
var cloud_shadows = function(image) {
  // Select the QA band.
  var QA = image.select(['pixel_qa']);
  // Get the internal_cloud_algorithm_flag bit.
  return getQABits(QA, 7,8, 'cloud_shadows').eq(0);
  // Return an image masking out cloudy areas.
};
// A function to mask out cloudy pixels.
var clouds = function(image) {
  // Select the QA band.
  var QA = image.select(['pixel_qa']);
  // Get the internal_cloud_algorithm_flag bit.
  return getQABits(QA, 5,5, 'Cloud').eq(0);
  // Return an image masking out cloudy areas.
};
var maskClouds = function(image) {
  var cs = cloud_shadows(image);
  var c = clouds(image);
  image = image.updateMask(cs);
  return image.updateMask(c);
};
var composite_free = sr14.map(maskClouds);
var noncloudland = composite_free.median()
var noncloudlMP = noncloudland.clip(Palawan_Dissolve_Buffer)
Map.addLayer(composite_free,visParams, 'noncloudland5');
Map.addLayer(noncloudlMP,visParams, 'noncloudLand5Buff');
// Export the image, specifying scale and region.
Export.image.toDrive({
  image: composite_free.select(['B3', 'B5', 'B4']).mean(),
  description: 'landnotcloud2010Pal',
  scale: 30,
  fileFormat: 'GeoTIFF',
  region: Palawan_Dissolve_Buffer1,
  maxPixels:107506279827,
});
var dataset = ee.ImageCollection('LANDSAT/MANGROVE_FORESTS');
var mangrovesVis = {
  min: 0,
  max: 1.0,
  palette: ['d40115'],
};
Map.addLayer(dataset, mangrovesVis, 'Mangroves');
//================================================================================//
//                     2. Classification            
//1) hand draw four polygons (geometry type), and import them as mang, water, other, and ponds
//2) cover the above geometries to features, and add class label
// Use these bands for prediction.
var bands = [ 'B2', 'B3', 'B4', 'B5'];
var LAND_label = ee.Feature(Land, {class: 2});
var Forest_label = ee.Feature(Forest, {class: 1});
//3) Make a list of features and create training set (polygons).
var training_sites_list = [
  LAND_label,
  Forest_label,
];
    // Create a FeatureCollection from the list and print it.
var training_set = ee.FeatureCollection(training_sites_list);
print(training_set);
// Get the values for all pixels in each polygon in the training.
var training = noncloudlMP.sampleRegions({
  // Get the sample from the polygons FeatureCollection.
  collection: training_set,
  // Keep this list of properties from the polygons.
  properties: ['class'],
  // Set the scale to get sentinel one pixels in the polygons.
  scale: 30
});
// Train a CART classifier with default parameters.
var trained = ee.Classifier.cart().train(training, 'class', bands);
// Classify the image.
//var classified = bands.classify(trained);
var classified = noncloudlMP.select(bands).classify(trained);
// Create a palette to display the classes.
Map.addLayer(classified,{min:1, max:2, palette:["FF0000","#0000e6",]},"classifiedMangroveCart")
///You can also run a confusion matrix
//print('RF error matrix: ', trained.confusionMatrix());
//print('RF accuracy: ', trained.confusionMatrix().accuracy());
// Export the image, specifying scale and region.
Export.image.toDrive({
  image: classified,
  fileFormat: 'GeoTIFF',
  description: 'LandSat5classifyPalForest',
  scale: 30,
  region: Palawan_Dissolve_Buffer1,
  maxPixels: 102367932,
});
Export.image.toDrive({
  image: composite_free,
  fileFormat: 'GeoTIFF',
  description: 'LandSat5',
  scale: 30,
  region: Palawan_Dissolve_Buffer1,
  maxPixels: 1e50,
});
Export.image.toDrive({
  image: noncloudlMP,
  fileFormat: 'GeoTIFF',
  description: 'LandSat5Buff',
  scale: 30,
  region: Palawan_Dissolve_Buffer1,
  maxPixels: 1e50,
});
Export.image.toDrive({
  image: classified,
  fileFormat: 'GeoTIFF',
  description: 'LandSat5classifyPalMangorve',
  scale: 30,
  region: Palawan_Dissolve_Buffer1,
  maxPixels: 1e50,
});