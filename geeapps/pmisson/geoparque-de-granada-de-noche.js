var image1 = ui.import && ui.import("image1", "image", {
      "id": "users/pmisson/Baza"
    }) || ee.Image("users/pmisson/Baza"),
    image2 = ui.import && ui.import("image2", "image", {
      "id": "users/pmisson/Huescar"
    }) || ee.Image("users/pmisson/Huescar"),
    imageCollection = ui.import && ui.import("imageCollection", "imageCollection", {
      "id": "users/pmisson/GeoParque"
    }) || ee.ImageCollection("users/pmisson/GeoParque"),
    image = ui.import && ui.import("image", "image", {
      "id": "users/pmisson/Corr_iss030e086586RGBcal2NAo2_rect"
    }) || ee.Image("users/pmisson/Corr_iss030e086586RGBcal2NAo2_rect"),
    image4 = ui.import && ui.import("image4", "image", {
      "id": "users/pmisson/Corr_iss030e086587RGBcal2NAo2_rect"
    }) || ee.Image("users/pmisson/Corr_iss030e086587RGBcal2NAo2_rect"),
    image6 = ui.import && ui.import("image6", "image", {
      "id": "users/pmisson/Corr_iss030e086590RGBcal2NAo2_rect"
    }) || ee.Image("users/pmisson/Corr_iss030e086590RGBcal2NAo2_rect"),
    image7 = ui.import && ui.import("image7", "image", {
      "id": "users/pmisson/Corr_iss030e086591RGBcal2NAo2_rect"
    }) || ee.Image("users/pmisson/Corr_iss030e086591RGBcal2NAo2_rect"),
    image8 = ui.import && ui.import("image8", "image", {
      "id": "users/pmisson/Corr_iss053e253383RGBcal2NAo2_rect"
    }) || ee.Image("users/pmisson/Corr_iss053e253383RGBcal2NAo2_rect"),
    image9 = ui.import && ui.import("image9", "image", {
      "id": "users/pmisson/Corr_iss053e384289RGBcal2NAo2_rect"
    }) || ee.Image("users/pmisson/Corr_iss053e384289RGBcal2NAo2_rect"),
    image10 = ui.import && ui.import("image10", "image", {
      "id": "users/pmisson/Corr_iss057e112400RGBcal2NAo2_rect"
    }) || ee.Image("users/pmisson/Corr_iss057e112400RGBcal2NAo2_rect"),
    image11 = ui.import && ui.import("image11", "image", {
      "id": "users/pmisson/Corr_iss061e035301RGBcal2NAo2_rect"
    }) || ee.Image("users/pmisson/Corr_iss061e035301RGBcal2NAo2_rect"),
    image12 = ui.import && ui.import("image12", "image", {
      "id": "users/pmisson/Corr_iss065e200633RGBcal2NAo2_rect"
    }) || ee.Image("users/pmisson/Corr_iss065e200633RGBcal2NAo2_rect"),
    image13 = ui.import && ui.import("image13", "image", {
      "id": "users/pmisson/Corr_iss030e086589RGBcal2NAo2_rect"
    }) || ee.Image("users/pmisson/Corr_iss030e086589RGBcal2NAo2_rect"),
    table = ui.import && ui.import("table", "table", {
      "id": "users/pmisson/Limite_Geoparque_Granada"
    }) || ee.FeatureCollection("users/pmisson/Limite_Geoparque_Granada"),
    image14 = ui.import && ui.import("image14", "image", {
      "id": "users/pmisson/Corr_iss030e086588RGBcal2NAo2_rect"
    }) || ee.Image("users/pmisson/Corr_iss030e086588RGBcal2NAo2_rect"),
    image15 = ui.import && ui.import("image15", "image", {
      "id": "users/pmisson/Corr_iss045e142972RGBcal2NAo2_rect"
    }) || ee.Image("users/pmisson/Corr_iss045e142972RGBcal2NAo2_rect"),
    image16 = ui.import && ui.import("image16", "image", {
      "id": "users/pmisson/Corr_iss047e127553RGBcal2No2_rect"
    }) || ee.Image("users/pmisson/Corr_iss047e127553RGBcal2No2_rect"),
    imageCollection2 = ui.import && ui.import("imageCollection2", "imageCollection", {
      "id": "users/pmisson/Corr_iss030_Andalucia_2012"
    }) || ee.ImageCollection("users/pmisson/Corr_iss030_Andalucia_2012"),
    image5 = ui.import && ui.import("image5", "image", {
      "id": "users/pmisson/Corr_iss030e086592RGBcal2NAo2_rect"
    }) || ee.Image("users/pmisson/Corr_iss030e086592RGBcal2NAo2_rect"),
    image18 = ui.import && ui.import("image18", "image", {
      "id": "users/pmisson/Granada_hires"
    }) || ee.Image("users/pmisson/Granada_hires"),
    image19 = ui.import && ui.import("image19", "image", {
      "id": "users/pmisson/iss047e127553_modificado"
    }) || ee.Image("users/pmisson/iss047e127553_modificado"),
    imageCollectionX = ui.import && ui.import("imageCollectionX", "imageCollection", {
      "id": "users/pmisson/DVuelo_Jaen_Granada_Malaga"
    }) || ee.ImageCollection("users/pmisson/DVuelo_Jaen_Granada_Malaga"),
    image20 = ui.import && ui.import("image20", "image", {
      "id": "users/pmisson/Corr_iss030e086593RGBcal2NAo2_rect"
    }) || ee.Image("users/pmisson/Corr_iss030e086593RGBcal2NAo2_rect"),
    geometryX = ui.import && ui.import("geometryX", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -3.8375309751683506,
                38.242003446692486
              ],
              [
                -3.8375309751683506,
                36.5886281542661
              ],
              [
                -1.4453212016749117,
                36.5886281542661
              ],
              [
                -1.4453212016749117,
                38.242003446692486
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
                -3.2337759498216134,
                37.37116781874416
              ],
              [
                -3.2337759498216134,
                37.20400062215781
              ],
              [
                -3.018855905876301,
                37.20400062215781
              ],
              [
                -3.018855905876301,
                37.37116781874416
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
      }
    ] */
    ee.Geometry.MultiPolygon(
        [[[[-3.8375309751683506, 38.242003446692486],
           [-3.8375309751683506, 36.5886281542661],
           [-1.4453212016749117, 36.5886281542661],
           [-1.4453212016749117, 38.242003446692486]]],
         [[[-3.2337759498216134, 37.37116781874416],
           [-3.2337759498216134, 37.20400062215781],
           [-3.018855905876301, 37.20400062215781],
           [-3.018855905876301, 37.37116781874416]]]], null, false),
    image3 = ui.import && ui.import("image3", "image", {
      "id": "users/pmisson/GuadixRM_modificado"
    }) || ee.Image("users/pmisson/GuadixRM_modificado"),
    imageCollection5 = ui.import && ui.import("imageCollection5", "imageCollection", {
      "id": "users/pmisson/JL1GF_Granada_May"
    }) || ee.ImageCollection("users/pmisson/JL1GF_Granada_May"),
    imageCollection4 = ui.import && ui.import("imageCollection4", "imageCollection", {
      "id": "users/pmisson/JL05_Granada_May"
    }) || ee.ImageCollection("users/pmisson/JL05_Granada_May"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -3.235835886345051,
                37.37089497273356
              ],
              [
                -3.235835886345051,
                37.2048209747518
              ],
              [
                -3.020572519645832,
                37.2048209747518
              ],
              [
                -3.020572519645832,
                37.37089497273356
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
        [[[-3.235835886345051, 37.37089497273356],
          [-3.235835886345051, 37.2048209747518],
          [-3.020572519645832, 37.2048209747518],
          [-3.020572519645832, 37.37089497273356]]], null, false),
    geometry2 = ui.import && ui.import("geometry2", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -3.0723645580730308,
                37.335499326680505
              ],
              [
                -3.1169965160808433,
                37.30846992186687
              ],
              [
                -3.0634421478310303,
                37.234991109808234
              ],
              [
                -3.040954507450171,
                37.23553778788078
              ],
              [
                -3.039752877811499,
                37.219955909399516
              ],
              [
                -3.0459326873818116,
                37.218862323345604
              ],
              [
                -3.0471343170204834,
                37.207652152213434
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#98ff00",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #98ff00 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-3.0723645580730308, 37.335499326680505],
          [-3.1169965160808433, 37.30846992186687],
          [-3.0634421478310303, 37.234991109808234],
          [-3.040954507450171, 37.23553778788078],
          [-3.039752877811499, 37.219955909399516],
          [-3.0459326873818116, 37.218862323345604],
          [-3.0471343170204834, 37.207652152213434]]]),
    geometry3 = ui.import && ui.import("geometry3", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -3.0474736584148276,
                37.20818522035114
              ],
              [
                -3.046443690153109,
                37.21912191522586
              ],
              [
                -3.039577235074984,
                37.220762282716
              ],
              [
                -3.0406072033367026,
                37.23443062445426
              ],
              [
                -3.063266505094515,
                37.23579732236354
              ],
              [
                -3.117854822965609,
                37.30874299475856
              ],
              [
                -3.07287954220389,
                37.33440741798319
              ],
              [
                -3.0842091930827964,
                37.35951730203068
              ],
              [
                -3.1377675426921714,
                37.32621759683996
              ],
              [
                -3.150813807340609,
                37.33932088212544
              ],
              [
                -3.143947352262484,
                37.345325790681905
              ],
              [
                -3.1432607067546714,
                37.36498530362581
              ],
              [
                -3.1597401989421714,
                37.369896766853984
              ],
              [
                -3.196132410856234,
                37.35516141266951
              ],
              [
                -3.1913258923015464,
                37.3431526885629
              ],
              [
                -3.2338979137859214,
                37.3038379818724
              ],
              [
                -3.2105519665202964,
                37.26668854309707
              ],
              [
                -3.1679799450359214,
                37.28198759185796
              ],
              [
                -3.135707606168734,
                37.27379205953876
              ],
              [
                -3.0883290661296714,
                37.21913237788792
              ],
              [
                -3.072536219449984,
                37.214211062066376
              ],
              [
                -3.0649831188640464,
                37.20710192800081
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#0b4a8b",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #0b4a8b */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-3.0474736584148276, 37.20818522035114],
          [-3.046443690153109, 37.21912191522586],
          [-3.039577235074984, 37.220762282716],
          [-3.0406072033367026, 37.23443062445426],
          [-3.063266505094515, 37.23579732236354],
          [-3.117854822965609, 37.30874299475856],
          [-3.07287954220389, 37.33440741798319],
          [-3.0842091930827964, 37.35951730203068],
          [-3.1377675426921714, 37.32621759683996],
          [-3.150813807340609, 37.33932088212544],
          [-3.143947352262484, 37.345325790681905],
          [-3.1432607067546714, 37.36498530362581],
          [-3.1597401989421714, 37.369896766853984],
          [-3.196132410856234, 37.35516141266951],
          [-3.1913258923015464, 37.3431526885629],
          [-3.2338979137859214, 37.3038379818724],
          [-3.2105519665202964, 37.26668854309707],
          [-3.1679799450359214, 37.28198759185796],
          [-3.135707606168734, 37.27379205953876],
          [-3.0883290661296714, 37.21913237788792],
          [-3.072536219449984, 37.214211062066376],
          [-3.0649831188640464, 37.20710192800081]]]),
    geometry4 = ui.import && ui.import("geometry4", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -2.523340277380395,
                37.74317120686377
              ],
              [
                -2.5339832827514885,
                37.75375843362158
              ],
              [
                -2.538789801306176,
                37.77384285381519
              ],
              [
                -2.5308933779663323,
                37.7795414930414
              ],
              [
                -2.504457525915551,
                37.80857059484226
              ],
              [
                -2.5037708804077385,
                37.8270130677433
              ],
              [
                -2.515443854040551,
                37.83785942873846
              ],
              [
                -2.545656256384301,
                37.83785942873846
              ],
              [
                -2.5683155581421135,
                37.80802809941872
              ],
              [
                -2.5638523623413323,
                37.75864433509146
              ],
              [
                -2.5710621401733635,
                37.74588602478661
              ],
              [
                -2.5518360659546135,
                37.72688020825524
              ],
              [
                -2.5092640444702385,
                37.72226377364531
              ],
              [
                -2.505830816931176,
                37.720905944001466
              ],
              [
                -2.4842014834350823,
                37.70433841831917
              ],
              [
                -2.45604901761477,
                37.710585625334524
              ],
              [
                -2.448152594274926,
                37.73013869473885
              ],
              [
                -2.454675726599145,
                37.74018479213509
              ],
              [
                -2.4842014834350823,
                37.74154226831204
              ],
              [
                -2.50548749417727,
                37.737469765099384
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
                -2.7169496927547643,
                37.51432600723308
              ],
              [
                -2.731712571172733,
                37.538286670217474
              ],
              [
                -2.756088486700077,
                37.53910337534069
              ],
              [
                -2.797630539922733,
                37.49716762415343
              ],
              [
                -2.7787477884578893,
                37.46147645739281
              ],
              [
                -2.742355576543827,
                37.45057499417752
              ],
              [
                -2.7389223490047643,
                37.433129348049896
              ],
              [
                -2.7255327616024205,
                37.41922443696017
              ],
              [
                -2.6908571634578893,
                37.425495598921636
              ],
              [
                -2.6702577982235143,
                37.436945930692886
              ],
              [
                -2.674034348516483,
                37.451665212005246
              ],
              [
                -2.685020676641483,
                37.456025924416224
              ],
              [
                -2.7018434915828893,
                37.444578512101565
              ],
              [
                -2.728965989141483,
                37.46229400307419
              ],
              [
                -2.746475449590702,
                37.48845074475145
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#ffc82d",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #ffc82d */
    /* shown: false */
    ee.Geometry.MultiPolygon(
        [[[[-2.523340277380395, 37.74317120686377],
           [-2.5339832827514885, 37.75375843362158],
           [-2.538789801306176, 37.77384285381519],
           [-2.5308933779663323, 37.7795414930414],
           [-2.504457525915551, 37.80857059484226],
           [-2.5037708804077385, 37.8270130677433],
           [-2.515443854040551, 37.83785942873846],
           [-2.545656256384301, 37.83785942873846],
           [-2.5683155581421135, 37.80802809941872],
           [-2.5638523623413323, 37.75864433509146],
           [-2.5710621401733635, 37.74588602478661],
           [-2.5518360659546135, 37.72688020825524],
           [-2.5092640444702385, 37.72226377364531],
           [-2.505830816931176, 37.720905944001466],
           [-2.4842014834350823, 37.70433841831917],
           [-2.45604901761477, 37.710585625334524],
           [-2.448152594274926, 37.73013869473885],
           [-2.454675726599145, 37.74018479213509],
           [-2.4842014834350823, 37.74154226831204],
           [-2.50548749417727, 37.737469765099384]]],
         [[[-2.7169496927547643, 37.51432600723308],
           [-2.731712571172733, 37.538286670217474],
           [-2.756088486700077, 37.53910337534069],
           [-2.797630539922733, 37.49716762415343],
           [-2.7787477884578893, 37.46147645739281],
           [-2.742355576543827, 37.45057499417752],
           [-2.7389223490047643, 37.433129348049896],
           [-2.7255327616024205, 37.41922443696017],
           [-2.6908571634578893, 37.425495598921636],
           [-2.6702577982235143, 37.436945930692886],
           [-2.674034348516483, 37.451665212005246],
           [-2.685020676641483, 37.456025924416224],
           [-2.7018434915828893, 37.444578512101565],
           [-2.728965989141483, 37.46229400307419],
           [-2.746475449590702, 37.48845074475145]]]]),
    geometry5 = ui.import && ui.import("geometry5", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -2.777031174688358,
                37.46011386139311
              ],
              [
                -2.740982285528202,
                37.45057499417752
              ],
              [
                -2.738579026250858,
                37.434492435621074
              ],
              [
                -2.7293093118953893,
                37.419497107097044
              ],
              [
                -2.6898271951961705,
                37.42604089253179
              ],
              [
                -2.672661057500858,
                37.43667332410123
              ],
              [
                -2.686393967657108,
                37.45439068705621
              ],
              [
                -2.7018434915828893,
                37.44512366669712
              ],
              [
                -2.725876084356327,
                37.45711606279316
              ],
              [
                -2.7475054178524205,
                37.487088640447936
              ],
              [
                -2.717979661016483,
                37.51378135727135
              ],
              [
                -2.735489121465702,
                37.53774219516571
              ],
              [
                -2.7584917459774205,
                37.53801443318856
              ],
              [
                -2.7966005716610143,
                37.49798477943785
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
                -3.7593837329007007,
                37.1231186874617
              ],
              [
                -3.7291713305569507,
                37.124761140400196
              ],
              [
                -3.6069484301663257,
                37.1411837095041
              ],
              [
                -3.4888454028225757,
                37.15760271405815
              ],
              [
                -3.490905339346013,
                37.25768141802645
              ],
              [
                -3.787536198721013,
                37.22160276177002
              ]
            ]
          ],
          "geodesic": true,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#00ffff",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #00ffff */
    /* shown: false */
    ee.Geometry({
      "type": "GeometryCollection",
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -2.777031174688358,
                37.46011386139311
              ],
              [
                -2.740982285528202,
                37.45057499417752
              ],
              [
                -2.738579026250858,
                37.434492435621074
              ],
              [
                -2.7293093118953893,
                37.419497107097044
              ],
              [
                -2.6898271951961705,
                37.42604089253179
              ],
              [
                -2.672661057500858,
                37.43667332410123
              ],
              [
                -2.686393967657108,
                37.45439068705621
              ],
              [
                -2.7018434915828893,
                37.44512366669712
              ],
              [
                -2.725876084356327,
                37.45711606279316
              ],
              [
                -2.7475054178524205,
                37.487088640447936
              ],
              [
                -2.717979661016483,
                37.51378135727135
              ],
              [
                -2.735489121465702,
                37.53774219516571
              ],
              [
                -2.7584917459774205,
                37.53801443318856
              ],
              [
                -2.7966005716610143,
                37.49798477943785
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
                -3.7593837329007007,
                37.1231186874617
              ],
              [
                -3.7291713305569507,
                37.124761140400196
              ],
              [
                -3.6069484301663257,
                37.1411837095041
              ],
              [
                -3.4888454028225757,
                37.15760271405815
              ],
              [
                -3.490905339346013,
                37.25768141802645
              ],
              [
                -3.787536198721013,
                37.22160276177002
              ]
            ]
          ],
          "geodesic": true,
          "evenOdd": true
        }
      ],
      "coordinates": []
    }),
    image152 = ui.import && ui.import("image152", "image", {
      "id": "users/pmisson/GuadixRM_modificado"
    }) || ee.Image("users/pmisson/GuadixRM_modificado"),
    geometry6 = ui.import && ui.import("geometry6", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -3.23115036436886,
                37.30271445593889
              ],
              [
                -3.2048974223862103,
                37.27055378132417
              ],
              [
                -3.166273612571757,
                37.286193488231845
              ],
              [
                -3.133142966819804,
                37.277315450753875
              ],
              [
                -3.0959539555559212,
                37.23966175334255
              ],
              [
                -3.081706061268812,
                37.21997992194639
              ],
              [
                -3.065398230458265,
                37.21697252310574
              ],
              [
                -3.0648832463274056,
                37.209863649236034
              ],
              [
                -3.0485754155168587,
                37.20959021763394
              ],
              [
                -3.0482320927629525,
                37.22080010082112
              ],
              [
                -3.041880621815687,
                37.22107349179751
              ],
              [
                -3.0423956059465462,
                37.2328283663319
              ],
              [
                -3.0659132145891244,
                37.233375060087205
              ],
              [
                -3.1213256186843785,
                37.307654408231734
              ],
              [
                -3.074475312313243,
                37.33592604364219
              ],
              [
                -3.0843817663994533,
                37.35622598984175
              ],
              [
                -3.1390688428746016,
                37.32414663741774
              ],
              [
                -3.154518366800383,
                37.33916104137643
              ],
              [
                -3.145248652444914,
                37.34885056307395
              ],
              [
                -3.1461069593296798,
                37.360312607819345
              ],
              [
                -3.1582949170933516,
                37.3669979922839
              ],
              [
                -3.1873056897984298,
                37.35471825701668
              ],
              [
                -3.1885073194371016,
                37.33929752219376
              ],
              [
                -3.212196589456633,
                37.32046082506678
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
        [[[-3.23115036436886, 37.30271445593889],
          [-3.2048974223862103, 37.27055378132417],
          [-3.166273612571757, 37.286193488231845],
          [-3.133142966819804, 37.277315450753875],
          [-3.0959539555559212, 37.23966175334255],
          [-3.081706061268812, 37.21997992194639],
          [-3.065398230458265, 37.21697252310574],
          [-3.0648832463274056, 37.209863649236034],
          [-3.0485754155168587, 37.20959021763394],
          [-3.0482320927629525, 37.22080010082112],
          [-3.041880621815687, 37.22107349179751],
          [-3.0423956059465462, 37.2328283663319],
          [-3.0659132145891244, 37.233375060087205],
          [-3.1213256186843785, 37.307654408231734],
          [-3.074475312313243, 37.33592604364219],
          [-3.0843817663994533, 37.35622598984175],
          [-3.1390688428746016, 37.32414663741774],
          [-3.154518366800383, 37.33916104137643],
          [-3.145248652444914, 37.34885056307395],
          [-3.1461069593296798, 37.360312607819345],
          [-3.1582949170933516, 37.3669979922839],
          [-3.1873056897984298, 37.35471825701668],
          [-3.1885073194371016, 37.33929752219376],
          [-3.212196589456633, 37.32046082506678]]]),
    image17 = ui.import && ui.import("image17", "image", {
      "id": "users/pmisson/JL105B_MSS1_20220511073138_200084087_104_0016_001_L1A_MSSRMo2_rect"
    }) || ee.Image("users/pmisson/JL105B_MSS1_20220511073138_200084087_104_0016_001_L1A_MSSRMo2_rect"),
    image21 = ui.import && ui.import("image21", "image", {
      "id": "users/pmisson/KX10_GIU_20220130_W157_N3850_202200114537_L4A_B_RGB"
    }) || ee.Image("users/pmisson/KX10_GIU_20220130_W157_N3850_202200114537_L4A_B_RGB"),
    image22 = ui.import && ui.import("image22", "image", {
      "id": "users/pmisson/KX10_GIU_20220130_W157_N3850_202200114537_L4A_A_RGB"
    }) || ee.Image("users/pmisson/KX10_GIU_20220130_W157_N3850_202200114537_L4A_A_RGB"),
    imageVisParamXX = ui.import && ui.import("imageVisParamXX", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "b1",
          "b2",
          "b3"
        ],
        "max": 1000,
        "gamma": 1.925
      }
    }) || {"opacity":1,"bands":["b1","b2","b3"],"max":1000,"gamma":1.925},
    image23 = ui.import && ui.import("image23", "image", {
      "id": "users/pmisson/KX10_GIU_20220425_W422_N3781_202200097776_L4A_B_RGB"
    }) || ee.Image("users/pmisson/KX10_GIU_20220425_W422_N3781_202200097776_L4A_B_RGB"),
    image24 = ui.import && ui.import("image24", "image", {
      "id": "users/pmisson/KX10_GIU_20220425_W422_N3781_202200097776_L4A_A_RGB"
    }) || ee.Image("users/pmisson/KX10_GIU_20220425_W422_N3781_202200097776_L4A_A_RGB"),
    geometry7 = ui.import && ui.import("geometry7", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -3.7603951210965736,
                37.123090072572104
              ],
              [
                -3.7603951210965736,
                37.06558174944855
              ],
              [
                -3.689670633791886,
                37.06558174944855
              ],
              [
                -3.689670633791886,
                37.123090072572104
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
                -3.762455057620011,
                37.0907812439652
              ],
              [
                -3.762455057620011,
                37.08201715236228
              ],
              [
                -3.719883036135636,
                37.08201715236228
              ],
              [
                -3.719883036135636,
                37.0907812439652
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
      }
    ] */
    ee.Geometry.MultiPolygon(
        [[[[-3.7603951210965736, 37.123090072572104],
           [-3.7603951210965736, 37.06558174944855],
           [-3.689670633791886, 37.06558174944855],
           [-3.689670633791886, 37.123090072572104]]],
         [[[-3.762455057620011, 37.0907812439652],
           [-3.762455057620011, 37.08201715236228],
           [-3.719883036135636, 37.08201715236228],
           [-3.719883036135636, 37.0907812439652]]]], null, false),
    geometry8 = ui.import && ui.import("geometry8", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -3.728590909593439,
                37.125009985847875
              ],
              [
                -3.713484708421564,
                37.05901031508477
              ],
              [
                -3.523970548265314,
                37.08749855113342
              ],
              [
                -3.542166654222345,
                37.15046336489899
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#98ff00",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #98ff00 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-3.728590909593439, 37.125009985847875],
          [-3.713484708421564, 37.05901031508477],
          [-3.523970548265314, 37.08749855113342],
          [-3.542166654222345, 37.15046336489899]]]),
    geometry9 = ui.import && ui.import("geometry9", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -3.6316957633905878,
                37.22767318230111
              ],
              [
                -3.6694612663202753,
                37.182280681826455
              ],
              [
                -3.6742677848749628,
                37.1122242882114
              ],
              [
                -3.5671510856562128,
                37.11058156327314
              ],
              [
                -3.5341921012812128,
                37.122079889478634
              ],
              [
                -3.5204591911249628,
                37.160942248754196
              ],
              [
                -3.6165895622187128,
                37.22712644720312
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#0b4a8b",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #0b4a8b */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-3.6316957633905878, 37.22767318230111],
          [-3.6694612663202753, 37.182280681826455],
          [-3.6742677848749628, 37.1122242882114],
          [-3.5671510856562128, 37.11058156327314],
          [-3.5341921012812128, 37.122079889478634],
          [-3.5204591911249628, 37.160942248754196],
          [-3.6165895622187128, 37.22712644720312]]]);
var VIIRS201912 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20191201");
var series = imageCollection2.map(function(image) {
    return image;
});
var imageCollection3 = imageCollection2.map(function(img) {
  var ratiogr=img.mask(img.gt(0)).select('b2').divide(img.select('b1'))
  var ratiobg=img.mask(img.gt(0)).select('b3').divide(img.select('b2'))
  var ratiorg=img.mask(img.gt(0)).select('b1').divide(img.select('b2'))
  var pixel_qa = img.mask(img.gt(0)).mask(ratiogr.lt(3)).mask(ratiobg.lt(3)).mask(ratiorg.lt(2.5));
  return pixel_qa;
});
var imageCollection5 = imageCollection5.map(function(img) {
  var ratiogr=img.mask(img.gt(0)).select('b2').divide(img.select('b1'))
  var ratiobg=img.mask(img.gt(0)).select('b3').divide(img.select('b2'))
  var ratiorg=img.mask(img.gt(0)).select('b1').divide(img.select('b2'))
  var pixel_qa = img.mask(img.gt(0)).mask(ratiogr.lt(50))//.mask(ratiobg.lt(50)).mask(ratiorg.lt(50));
  return pixel_qa;
});
//Map.addLayer(imageCollection4.mean(), {}, '2022_GX',true);
var imageCollection4s = imageCollection4.map(function(img) {
  var ratiogr=img.mask(img.gt(0)).select('b2').divide(img.select('b1'))
  var ratiobg=img.mask(img.gt(0)).select('b3').divide(img.select('b2'))
  var ratiorg=img.mask(img.gt(0)).select('b1').divide(img.select('b2'))
  var pixel_qa = img//.mask(ratiobg.lt(500))//.mask(ratiogr.lt(500)).mask(img.gt(0))////.mask(ratiogr.lt(50));
  return pixel_qa;
});
var cumulative=imageCollection3.median()
var cumulative1s=imageCollection5.median()
var cumulative2s=imageCollection4s.median()
//var cumulative2G=imageCollection4G.median()
var cumulative2X=imageCollection4.median()
//Map.addLayer(cumulative2s, {}, '2022_G',false);
//Map.addLayer(cumulative2G, {}, '2022_GG',false);
//Map.addLayer(cumulative2X, {}, '2022_GX',true);
//Map.addLayer(cumulative1s.unmask(0), {}, '2022_G1',false);
var RED=ee.Image(cumulative1s).select('b1')
var GREEN=ee.Image(cumulative1s).select('b2')
var BLUE=ee.Image(cumulative1s).select('b3')
var evi = RED.expression('(u)*0.000296+0.014166', {'u': RED});///JL1GF03C01
var evi2 = GREEN.expression('(u)* 0.000319+0.013368', {'u': GREEN});
var evi3 = BLUE.expression('(u)* 0.000473+0.009222', {'u': BLUE});
var imageGranada6=ee.Image.rgb(evi,evi2,evi3)
var RED=ee.Image(cumulative2s).select('b1')
var GREEN=ee.Image(cumulative2s).select('b2')
var BLUE=ee.Image(cumulative2s).select('b3')
var evi = RED.expression('(u)*0.000574+0.009202', {'u': RED});///JL105B
var evi2 = GREEN.expression('(u)* 0.000644+0.009854', {'u': GREEN});
var evi3 = BLUE.expression('(u)* 0.000895+0.011851', {'u': BLUE});
var imageGranada7=ee.Image.rgb(evi,evi2,evi3)
/*
var RED=ee.Image(cumulative2G).select('b1')
var GREEN=ee.Image(cumulative2G).select('b2')
var BLUE=ee.Image(cumulative2G).select('b3')
var evi = RED.expression('(u)*0.000574+0.009202', {'u': RED});///JL105B
var evi2 = GREEN.expression('(u)* 0.000644+0.009854', {'u': GREEN});
var evi3 = BLUE.expression('(u)* 0.000895+0.011851', {'u': BLUE});
var imageGranada7G=ee.Image.rgb(evi,evi2,evi3)
*/
//Map.addLayer(imageGranada6.unmask(0), {}, '2022_1s',true);
//Map.addLayer(imageGranada7.unmask(0), {}, '2022_2s',true);
Map.addLayer(VIIRS201912.select('avg_rad'),{min:0,max:150,gamma:3},'2019 - VIIRS',true);
  var vizParamsX0 = {
  min:[0.014462, 0.013687, 0.012746],
  max:[0.07, 0.07, 0.07],
  gamma: [2, 2, 2],
  };
    var vizParamsX1 = {
  min:[0.0035, 0.0035, 0.0035],
  max:[0.4, 0.4, 0.5],
  gamma: [4.5, 4.6, 6],
  };
var image12vis=image12.visualize(vizParamsX1);
Map.addLayer(cumulative.unmask(0), vizParamsX1, 'ISS030-2012',true);
/*
Map.addLayer(image,vizParamsX1,'ISS030-1',false)
Map.addLayer(image4,vizParamsX1,'ISS030-2',false)
Map.addLayer(image14,vizParamsX1,'ISS030-3',false)
Map.addLayer(image13,vizParamsX1,'ISS030-4',false)
Map.addLayer(image6,vizParamsX1,'ISS030-5',false)
Map.addLayer(image7,vizParamsX1,'ISS030-6',false)
Map.addLayer(image5,vizParamsX1,'ISS030-7',false)
Map.addLayer(image20,vizParamsX1,'ISS030-8',false)
Map.addLayer(image15,vizParamsX1,'ISS045-2015',false)
Map.addLayer(image16,vizParamsX1,'ISS047-2016',false)
Map.addLayer(image8,vizParamsX1,'ISS053-2017',false)
Map.addLayer(image9,vizParamsX1,'ISS053-2017',false)
Map.addLayer(image10,vizParamsX1,'ISS057-2018',false)
Map.addLayer(image11,vizParamsX1,'ISS061-2020',false)
Map.addLayer(image12,vizParamsX1,'ISS065-2021',false)
*/
Map.addLayer(image12vis,{},'ISS065-2021',true)
Map.setCenter(-3.13577, 37.30194, 15);
var RED=ee.Image(image1).select('b1')
var GREEN=ee.Image(image1).select('b2')
var BLUE=ee.Image(image1).select('b3')
var evi = RED.expression('(u)*0.000574+0.009202', {'u': RED});
var evi2 = GREEN.expression('(u)* 0.000644+0.009854', {'u': GREEN});
var evi3 = BLUE.expression('(u)* 0.000895+0.011851', {'u': BLUE});
var imageBaza=ee.Image.rgb(evi,evi2,evi3)
var maskGu=image3.select('b1').gt(255).not()
var RED=ee.Image(image3).select('b1')
var GREEN=ee.Image(image3).select('b2')
var BLUE=ee.Image(image3).select('b3')
var evi = RED.expression('(u)*0.000296+0.014166', {'u': RED});///JL1GF03C01
var evi2 = GREEN.expression('(u)* 0.000319+0.013368', {'u': GREEN});
var evi3 = BLUE.expression('(u)* 0.000473+0.009222', {'u': BLUE});
var imageGuadix=ee.Image.rgb(evi,evi2,evi3).mask(maskGu).clip(geometry6)
//var RED=ee.Image(image2).select('b1')
//var GREEN=ee.Image(image2).select('b2')
//var BLUE=ee.Image(image2).select('b3')
//var evi = RED.expression('(u)*0.000293+0.003305', {'u': RED});///JL1GF03C03
//var evi2 = GREEN.expression('(u)* 0.000318+0.006996', {'u': GREEN});
//var evi3 = BLUE.expression('(u)* 0.000466+0.004361', {'u': BLUE});
//var imageHuescar=ee.Image.rgb(evi,evi2,evi3)
/*
var RED=ee.Image(image15).select('b1')
var GREEN=ee.Image(image15).select('b2')
var BLUE=ee.Image(image15).select('b3')
var evi = RED.expression('(u)*0.000296+0.014166', {'u': RED});///JL1GF03C01
var evi2 = GREEN.expression('(u)* 0.000319+0.013368', {'u': GREEN});
var evi3 = BLUE.expression('(u)* 0.000473+0.009222', {'u': BLUE});
var imageGranada1=ee.Image.rgb(evi,evi2,evi3)
var RED=ee.Image(image16).select('b1')
var GREEN=ee.Image(image16).select('b2')
var BLUE=ee.Image(image16).select('b3')
var evi = RED.expression('(u)*0.000296+0.014166', {'u': RED});///JL1GF03C01
var evi2 = GREEN.expression('(u)* 0.000319+0.013368', {'u': GREEN});
var evi3 = BLUE.expression('(u)* 0.000473+0.009222', {'u': BLUE});
var imageGranada2=ee.Image.rgb(evi,evi2,evi3)
var RED=ee.Image(image17).select('b1')
var GREEN=ee.Image(image17).select('b2')
var BLUE=ee.Image(image17).select('b3')
var evi = RED.expression('(u)*0.000296+0.014166', {'u': RED});///JL1GF03C01
var evi2 = GREEN.expression('(u)* 0.000319+0.013368', {'u': GREEN});
var evi3 = BLUE.expression('(u)* 0.000473+0.009222', {'u': BLUE});
var imageGranada3=ee.Image.rgb(evi,evi2,evi3)
*/
var RED=ee.Image(image2).select('b1')
var GREEN=ee.Image(image2).select('b2')
var BLUE=ee.Image(image2).select('b3')
var evi = RED.expression('(u)*0.000296+0.014166', {'u': RED});///JL1GF03C01
var evi2 = GREEN.expression('(u)* 0.000319+0.013368', {'u': GREEN});
var evi3 = BLUE.expression('(u)* 0.000473+0.009222', {'u': BLUE});
var imageHuescar=ee.Image.rgb(evi,evi2,evi3)
  var vizParamsX0 = {
  min:[0.014462, 0.013687, 0.013],
  max:[0.07, 0.07, 0.06],
  gamma: [2, 2, 5],
  };
  var polygonGeoJSON = ee.Geometry.Polygon(
  [
    [ // exterior ring
      [-2.751386,37.449531],
      [-2.597441, 37.465570],
      [-2.582269, 37.401386],
      [-2.735017, 37.385335]  // matching the first vertex is optional
    ],
    [ // interior ring
      [101.0, 1.0],
      [102.0, 2.0],
      [102.0, 1.0]
    ]
  ]
);//JL107B_MSS1_20210918051525_200061466_101_0025_001_L1A
  var polygonGeoJSON2 = ee.Geometry.Polygon(
  [
    [ // exterior ring
      [-2.756426,37.479260],
      [-2.620764, 37.495134],
      [-2.609519, 37.445474],
      [-2.744509, 37.429591]  // matching the first vertex is optional
    ],
    [ // interior ring
      [101.0, 1.0],
      [102.0, 2.0],
      [102.0, 1.0]
    ]
  ]
);//JL107B_MSS1_20210918051547_200061466_102_0018_001_L1A
  var polygonGeoJSON3 = ee.Geometry.Polygon(
  [
    [ // exterior ring
      [-2.761817,37.510936],
      [-2.636817, 37.526830],
      [-2.627663, 37.484598],
      [-2.752352, 37.468681]  // matching the first vertex is optional
    ]
  ]
);//JL107B_MSS1_20210918051609_200061466_103_0004_001_L1A
  var polygonGeoJSON4 = ee.Geometry.Polygon(
  [
    [ // exterior ring
      [-2.869519,37.455676],
      [-2.735173, 37.471578],
      [-2.723684, 37.423032],
      [-2.857392, 37.407101]  // matching the first vertex is optional
    ]
  ]
);//JL107B_MSS2_20210918051547_200061466_102_0026_001_L1A
  var polygonGeoJSON5 = ee.Geometry.Polygon(
  [
    [ // exterior ring
      [-2.768614,37.544573],
      [-2.646162, 37.561238],
      [-2.637664, 37.520390],
      [-2.760167, 37.503672]  // matching the first vertex is optional
    ]
  ]
);//JL107B_MSS2_20210918051547_200061466_102_0026_001_L1A
  var polygonGeoJSON6 = ee.Geometry.Polygon(
  [
    [ // exterior ring
      [-2.873054,37.523011],
      [-2.750138, 37.539972],
      [-2.741673, 37.498734],
      [-2.864680, 37.481699]  // matching the first vertex is optional
    ]
  ]
);//JL107B_MSS2_20210918051631_200061466_104_0027_001_L1A
  var polygonGeoJSON7 = ee.Geometry.Polygon(
  [
    [ // exterior ring
      [-3.390890,37.406638],
      [-3.148998, 37.461782],
      [-3.129059, 37.331567],
      [-3.373799, 37.274825]  // matching the first vertex is optional
    ]
  ]
);//JL1GF03C01_MSS_20210909045815_200060703_109_0400_001_L1A
  var polygonGeoJSON8 = ee.Geometry.Polygon(
  [
    [ // exterior ring
      [-3.174410,37.257007],
      [-3.012488, 37.276515],
      [-3.001166, 37.222455],
      [-3.163258, 37.203099]  // matching the first vertex is optional
    ]
  ]
);//JL1GF03C03_MSS_20210912050337_200060989_105_0211
  var polygonGeoJSON9 = ee.Geometry.Polygon(
  [
    [ // exterior ring
      [-3.249104,37.408471],
      [-3.034805, 37.453134],
      [-3.019082, 37.354470],
      [-3.235281,37.308778]  // matching the first vertex is optional
    ]
  ]
);//JL1GF03C01_MSS_20210909045756_200060703_108_0351_001_L1A
  var polygonGeoJSON10 = ee.Geometry.Polygon(
  [
    [ // exterior ring
      [-2.601765,37.731181],
      [-2.409575, 37.753692],
      [-2.392108, 37.677177],
      [-2.582597,37.654716]  // matching the first vertex is optional
    ]
  ]
);//JL1GF03C01_MSS_20210920045741_200061664_102_0065
  var polygonGeoJSON11 = ee.Geometry.Polygon(
  [
    [ // exterior ring
      [-2.623689,37.833418],
      [-2.413313, 37.860433],
      [-2.391730, 37.764829],
      [-2.604041,37.737603]  // matching the first vertex is optional
    ]
  ]
);//JL1GF03C01_MSS_20210920045935_200061664_108_0346
  var polygonGeoJSON12 = ee.Geometry.Polygon(
  [
    [ // exterior ring
      [-3.343404,37.334498],
      [-3.097826, 37.349932],
      [-3.063275, 37.221317],
      [-3.312025,37.206357]  // matching the first vertex is optional
    ]
  ]
);//JL1GF03C03_MSS_20210912050453_200060989_109_0399
  var polygonGeoJSON13= ee.Geometry.Polygon(
  [
    [ // exterior ring
      [-3.204378,37.329411],
      [-2.987647, 37.344936],
      [-2.961734, 37.247525],
      [-3.180594,37.232341]  // matching the first vertex is optional
    ]
  ]
);//JL1GF03C03_MSS_20210912050434_200060989_108_0353
  var polygonGeoJSON14= ee.Geometry.Polygon(
  [
    [ // exterior ring
      [-2.624786,37.794767],
      [-2.429853, 37.813892],
      [-2.409692, 37.739056],
      [-2.602904,37.719753]  // matching the first vertex is optional
    ]
  ]
);//JL1GF03C03_MSS_20210913045420_200061006_102_0068
  var polygonGeoJSON15= ee.Geometry.Polygon(
  [
    [ // exterior ring
      [-2.653865,37.890918],
      [-2.439423, 37.926527],
      [-2.419918, 37.826105],
      [-2.636365,37.789883]  // matching the first vertex is optional
    ]
  ]
);//JL1GF03C03_MSS_20210913045614_200061006_108_0354
/*
Map.addLayer(polygonGeoJSON, {}, 'JL107B_1',false);
Map.addLayer(polygonGeoJSON2, {}, 'JL107B_2',false);
Map.addLayer(polygonGeoJSON3, {}, 'JL107B_3',false);
Map.addLayer(polygonGeoJSON4, {}, 'JL107B_4',false);
Map.addLayer(polygonGeoJSON5, {}, 'JL107B_5',false);
Map.addLayer(polygonGeoJSON6, {}, 'JL107B_6',false);
Map.addLayer(polygonGeoJSON7, {}, 'JL1GF03C01_7',false);
Map.addLayer(polygonGeoJSON8, {}, 'JL1GF03C03_8',false);
Map.addLayer(polygonGeoJSON9, {}, 'JL1GF03C01_9',false);
Map.addLayer(polygonGeoJSON10, {}, 'JL1GF03C01_10',false);
Map.addLayer(polygonGeoJSON11, {}, 'JL1GF03C01_11',false);
Map.addLayer(polygonGeoJSON12, {}, 'JL1GF03C03_12',false);
Map.addLayer(polygonGeoJSON13, {}, 'JL1GF03C03_13',false);
Map.addLayer(polygonGeoJSON14, {}, 'JL1GF03C03_14',false);
Map.addLayer(polygonGeoJSON15, {}, 'JL1GF03C03_15',false);
*/  
Map.addLayer(imageBaza,vizParamsX0,'2021 - JL107 Baza',false)
Map.addLayer(imageGuadix,vizParamsX0,'2021 - JL1GF03C01 Guadix',false)
Map.addLayer(imageHuescar,vizParamsX0,'2021 - JL1GF03C03 Huescar',false)
var imageVisParamXX = {
  "opacity":1,"bands":["b1","b2","b3"],
  "max":[1000,1000, 400],"gamma":2}
/*
Map.addLayer(image22,imageVisParamXX,'2022 - SDGSAT-1 - Baza',false)
Map.addLayer(image23,imageVisParamXX,'2022 - SDGSAT-1 - Granada',false)
Map.addLayer(image24,imageVisParamXX,'2022 - SDGSAT-1 - Cordoba',false)
*/
  var vizParamsX4 = {
  min:[0.009202,0.009854, 0.011851],
  max:[0.07, 0.07, 0.06],
  gamma: [2, 2, 5],
  };
  var vizParamsX4s = {
  min:[0.009202,0.009854, 0.011851],
  max:[0.07, 0.07, 0.06],
  gamma: [2, 2, 5],
  };
var imaCo=ee.ImageCollection([imageGranada7])
print(imaCo)
var imageGranada7G = imaCo.map(function(img) {
  var ratiogr=img.mask(img.gt(0)).select('vis-green').divide(img.select('vis-red'))
  var ratiobg=img.mask(img.gt(0)).select('vis-blue').divide(img.select('vis-green'))
  var ratiorg=img.mask(img.gt(0)).select('vis-red').divide(img.select('vis-green'))
  var ratiobr=img.mask(img.gt(0)).select('vis-blue').divide(img.select('vis-red'))
  var pixel_qa = img.mask(img.gt(0)).mask(ratiogr.lt(2)).mask(ratiobg.lt(1)).mask(ratiorg.lt(2)).mask(ratiobr.lt(1));
  return pixel_qa;
});
var imageGranada7G1=imageGranada7G.first()
print(imageGranada7G)
//Map.addLayer(imageGranada6.unmask(0),vizParamsX4s,'2022 - JL1GF03C01 Granada2',true)
//Map.addLayer(imageGranada7.unmask(0),vizParamsX4,'2022 - JL105B Granada1',true)
//Map.addLayer(imageGranada7G1.unmask(0),vizParamsX4,'2022 - JL105B Granada1G',true)
//Map.addLayer(imageGranada3.unmask(0),vizParamsX0,'2022 - JL1GF03C01 Granada3',false)
//Map.addLayer(image18,{},'2015 - ISS Granada',false)
//Map.addLayer(image19,{},'2016 - ISS Granada',false)
Map.setOptions('SATELLITE');
Map.setCenter(-3.5301, 37.5397, 9);
var mosaic = imageCollectionX.mosaic();
//Map.addLayer(mosaic,{},'2022 - Avión Granada',false)
var image5 = ee.Image("users/pmisson/Guadix"),
    image6 = ee.Image("users/pmisson/Baza"),
    image7 = ee.Image("users/pmisson/Huescar");
    Map.setOptions('SATELLITE');
var vizParamsX2 = {
  min:[1, 1, 1],
  max:[789.6, 905.128, 505.826],
  gamma: [3, 3, 3],
  };  
// Display the mosaic.
//Map.addLayer(mosaic1,{},'Mosaic Vis - JL1',false)
//Map.addLayer(mosaic,vizParamsX2,'Mosaic - JL1',false)
//Map.addLayer(mosaicX1,vizParamsX2,'2021 - ChrismasN - JL1',true)
//Map.addLayer(mosaicX2,vizParamsX2,'2021 - ChrismasS - JL1',true)
//Map.addLayer(mosaicX3,vizParamsX2,'2022 - No ChrismasC - JL1',true)
//Map.addLayer(image37b,vizParamsX,'2018 - JL1-3B',false)
//Map.addLayer(evix,vizParamsG,'2022-Lux',false)
//Map.addLayer(image38,vizParamsX1,'2020 - JL1-7B',false)
//Map.addLayer(image10,vizParamsX2,'2021 - Chrismas - JL1 - Single',false)
//Map.addLayer(image11,vizParamsX2,'2021 - NO-Chrismas - JL1 - Single',false)
//Map.addLayer(image9,vizParamsX2,'2021 - Chrismas2 - JL1 - Single',false)
//Map.addLayer(image2,vizParamsX,'2021_Moron',false)
//Map.addLayer(image4,vizParamsX,'2021_Sanlucar_la_mayor',false)
//Map.addLayer(image15,vizParamsX2,'2021_Guadix',false)
//Map.addLayer(image6,vizParamsX2,'2021_Baza',false)
//Map.addLayer(image7,vizParamsX2,'2021_Huescar',false)
//Map.addLayer(image8,vizParamsX,'2021_Tenerife_1',false)
//Map.addLayer(image12,{gamma:1.73},'2022 - ISS',false)
//Map.addLayer(image40,{gamma:1.73},'2021 - ISS',false)
//Map.addLayer(image3,{},'2021-2 - ISS',false)
Map.addLayer(table.draw('red'), {}, 'Limite del Geoparque Granada');
Map.setOptions('SATELLITE');
Map.setCenter(-3.5301, 37.5397, 9);
print(cumulative)
var projection = cumulative.select('b2').projection().getInfo();
/*
Export.image.toDrive({
  image: imageGranada6.unmask(-999),
  description: 'GranadaGF',
  crs: projection.crs,
  region: geometry9,
  fileFormat: 'GeoTIFF',
});
*/
//Map.setCenter(-3.1868523923160796, 37.316812883331416, 15);