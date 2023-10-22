var table = ui.import && ui.import("table", "table", {
      "id": "FAO/GAUL_SIMPLIFIED_500m/2015/level2"
    }) || ee.FeatureCollection("FAO/GAUL_SIMPLIFIED_500m/2015/level2"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                112.61255691573938,
                -7.944309558904363
              ],
              [
                112.61255691573938,
                -7.978990931859153
              ],
              [
                112.64551590011438,
                -7.978990931859153
              ],
              [
                112.64551590011438,
                -7.944309558904363
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
        [[[112.61255691573938, -7.944309558904363],
          [112.61255691573938, -7.978990931859153],
          [112.64551590011438, -7.978990931859153],
          [112.64551590011438, -7.944309558904363]]], null, false),
    S2 = ui.import && ui.import("S2", "imageCollection", {
      "id": "COPERNICUS/S2"
    }) || ee.ImageCollection("COPERNICUS/S2"),
    urban = ui.import && ui.import("urban", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                112.63410823740324,
                -7.944614244936771
              ],
              [
                112.63410823740324,
                -7.9468244183225565
              ],
              [
                112.63633983530363,
                -7.9468244183225565
              ],
              [
                112.63633983530363,
                -7.944614244936771
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
                112.65882747568449,
                -7.972325557197197
              ],
              [
                112.65882747568449,
                -7.974025576663113
              ],
              [
                112.66088741220793,
                -7.974025576663113
              ],
              [
                112.66088741220793,
                -7.972325557197197
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
                112.63891475595793,
                -7.992895317906144
              ],
              [
                112.63891475595793,
                -7.995275223344279
              ],
              [
                112.64114635385832,
                -7.995275223344279
              ],
              [
                112.64114635385832,
                -7.992895317906144
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
                112.60693562233438,
                -7.950559044219327
              ],
              [
                112.60693562233438,
                -7.951324094501577
              ],
              [
                112.60837328636636,
                -7.951324094501577
              ],
              [
                112.60837328636636,
                -7.950559044219327
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
                112.61341583931436,
                -7.94936896316676
              ],
              [
                112.61341583931436,
                -7.951196586220283
              ],
              [
                112.61461746895303,
                -7.951196586220283
              ],
              [
                112.61461746895303,
                -7.94936896316676
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 0
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
            ee.Geometry.Polygon(
                [[[112.63410823740324, -7.944614244936771],
                  [112.63410823740324, -7.9468244183225565],
                  [112.63633983530363, -7.9468244183225565],
                  [112.63633983530363, -7.944614244936771]]], null, false),
            {
              "landcover": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[112.65882747568449, -7.972325557197197],
                  [112.65882747568449, -7.974025576663113],
                  [112.66088741220793, -7.974025576663113],
                  [112.66088741220793, -7.972325557197197]]], null, false),
            {
              "landcover": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[112.63891475595793, -7.992895317906144],
                  [112.63891475595793, -7.995275223344279],
                  [112.64114635385832, -7.995275223344279],
                  [112.64114635385832, -7.992895317906144]]], null, false),
            {
              "landcover": 0,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[112.60693562233438, -7.950559044219327],
                  [112.60693562233438, -7.951324094501577],
                  [112.60837328636636, -7.951324094501577],
                  [112.60837328636636, -7.950559044219327]]], null, false),
            {
              "landcover": 0,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[112.61341583931436, -7.94936896316676],
                  [112.61341583931436, -7.951196586220283],
                  [112.61461746895303, -7.951196586220283],
                  [112.61461746895303, -7.94936896316676]]], null, false),
            {
              "landcover": 0,
              "system:index": "4"
            })]),
    vegetation = ui.import && ui.import("vegetation", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                112.6450796448437,
                -7.959883157181113
              ],
              [
                112.6450796448437,
                -7.960154106490632
              ],
              [
                112.64547661177791,
                -7.960154106490632
              ],
              [
                112.64547661177791,
                -7.959883157181113
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
                112.60335791617989,
                -7.961687929272742
              ],
              [
                112.60335791617989,
                -7.96265484133587
              ],
              [
                112.60421622306465,
                -7.96265484133587
              ],
              [
                112.60421622306465,
                -7.961687929272742
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
                112.61315064193855,
                -7.941769597542893
              ],
              [
                112.61315064193855,
                -7.942199947717303
              ],
              [
                112.61347787143836,
                -7.942199947717303
              ],
              [
                112.61347787143836,
                -7.941769597542893
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 1
      },
      "color": "#72c000",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #72c000 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[112.6450796448437, -7.959883157181113],
                  [112.6450796448437, -7.960154106490632],
                  [112.64547661177791, -7.960154106490632],
                  [112.64547661177791, -7.959883157181113]]], null, false),
            {
              "landcover": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[112.60335791617989, -7.961687929272742],
                  [112.60335791617989, -7.96265484133587],
                  [112.60421622306465, -7.96265484133587],
                  [112.60421622306465, -7.961687929272742]]], null, false),
            {
              "landcover": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[112.61315064193855, -7.941769597542893],
                  [112.61315064193855, -7.942199947717303],
                  [112.61347787143836, -7.942199947717303],
                  [112.61347787143836, -7.941769597542893]]], null, false),
            {
              "landcover": 1,
              "system:index": "2"
            })]),
    agri = ui.import && ui.import("agri", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                112.61323647262702,
                -7.937857188729995
              ],
              [
                112.61323647262702,
                -7.938792278921754
              ],
              [
                112.61424498321662,
                -7.938792278921754
              ],
              [
                112.61424498321662,
                -7.937857188729995
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
                112.62837321341976,
                -7.924138899503716
              ],
              [
                112.62837321341976,
                -7.925445943575762
              ],
              [
                112.62976796210751,
                -7.925445943575762
              ],
              [
                112.62976796210751,
                -7.924138899503716
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
                112.59618590513747,
                -7.946759245767095
              ],
              [
                112.59618590513747,
                -7.947965273051773
              ],
              [
                112.597001296678,
                -7.947965273051773
              ],
              [
                112.597001296678,
                -7.946759245767095
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
                112.5906496908101,
                -7.949576927498311
              ],
              [
                112.5906496908101,
                -7.949704436282998
              ],
              [
                112.59077843684281,
                -7.949704436282998
              ],
              [
                112.59077843684281,
                -7.949576927498311
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
                112.65072573504209,
                -8.045267692232684
              ],
              [
                112.65072573504209,
                -8.046202536340068
              ],
              [
                112.65171278795957,
                -8.046202536340068
              ],
              [
                112.65171278795957,
                -8.045267692232684
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 2
      },
      "color": "#33eb18",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #33eb18 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[112.61323647262702, -7.937857188729995],
                  [112.61323647262702, -7.938792278921754],
                  [112.61424498321662, -7.938792278921754],
                  [112.61424498321662, -7.937857188729995]]], null, false),
            {
              "landcover": 2,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[112.62837321341976, -7.924138899503716],
                  [112.62837321341976, -7.925445943575762],
                  [112.62976796210751, -7.925445943575762],
                  [112.62976796210751, -7.924138899503716]]], null, false),
            {
              "landcover": 2,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[112.59618590513747, -7.946759245767095],
                  [112.59618590513747, -7.947965273051773],
                  [112.597001296678, -7.947965273051773],
                  [112.597001296678, -7.946759245767095]]], null, false),
            {
              "landcover": 2,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[112.5906496908101, -7.949576927498311],
                  [112.5906496908101, -7.949704436282998],
                  [112.59077843684281, -7.949704436282998],
                  [112.59077843684281, -7.949576927498311]]], null, false),
            {
              "landcover": 2,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[112.65072573504209, -8.045267692232684],
                  [112.65072573504209, -8.046202536340068],
                  [112.65171278795957, -8.046202536340068],
                  [112.65171278795957, -8.045267692232684]]], null, false),
            {
              "landcover": 2,
              "system:index": "4"
            })]),
    bare = ui.import && ui.import("bare", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                112.64897664609276,
                -8.043314955788013
              ],
              [
                112.64897664609276,
                -8.044653488359424
              ],
              [
                112.6500280720266,
                -8.044653488359424
              ],
              [
                112.6500280720266,
                -8.043314955788013
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
                112.60596358017557,
                -8.008075820941169
              ],
              [
                112.60596358017557,
                -8.008745145822616
              ],
              [
                112.60654293732279,
                -8.008745145822616
              ],
              [
                112.60654293732279,
                -8.008075820941169
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 3
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
            ee.Geometry.Polygon(
                [[[112.64897664609276, -8.043314955788013],
                  [112.64897664609276, -8.044653488359424],
                  [112.6500280720266, -8.044653488359424],
                  [112.6500280720266, -8.043314955788013]]], null, false),
            {
              "landcover": 3,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[112.60596358017557, -8.008075820941169],
                  [112.60596358017557, -8.008745145822616],
                  [112.60654293732279, -8.008745145822616],
                  [112.60654293732279, -8.008075820941169]]], null, false),
            {
              "landcover": 3,
              "system:index": "1"
            })]),
    water = ui.import && ui.import("water", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                112.6165343483371,
                -7.960080295632658
              ],
              [
                112.6165343483371,
                -7.960199832057315
              ],
              [
                112.61671942075913,
                -7.960199832057315
              ],
              [
                112.61671942075913,
                -7.960080295632658
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
                112.64067596024165,
                -7.997707006184732
              ],
              [
                112.64067596024165,
                -7.997972618186051
              ],
              [
                112.64093881672511,
                -7.997972618186051
              ],
              [
                112.64093881672511,
                -7.997707006184732
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
                112.64172202175746,
                -7.996246137085204
              ],
              [
                112.64172202175746,
                -7.996378943583213
              ],
              [
                112.64262324398646,
                -7.996378943583213
              ],
              [
                112.64262324398646,
                -7.996246137085204
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 4
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
            ee.Geometry.Polygon(
                [[[112.6165343483371, -7.960080295632658],
                  [112.6165343483371, -7.960199832057315],
                  [112.61671942075913, -7.960199832057315],
                  [112.61671942075913, -7.960080295632658]]], null, false),
            {
              "landcover": 4,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[112.64067596024165, -7.997707006184732],
                  [112.64067596024165, -7.997972618186051],
                  [112.64093881672511, -7.997972618186051],
                  [112.64093881672511, -7.997707006184732]]], null, false),
            {
              "landcover": 4,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[112.64172202175746, -7.996246137085204],
                  [112.64172202175746, -7.996378943583213],
                  [112.64262324398646, -7.996378943583213],
                  [112.64262324398646, -7.996246137085204]]], null, false),
            {
              "landcover": 4,
              "system:index": "2"
            })]),
    tUrban = ui.import && ui.import("tUrban", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                112.66294734873136,
                -7.978445594203372
              ],
              [
                112.66294734873136,
                -7.9791255926608065
              ],
              [
                112.66380565561613,
                -7.9791255926608065
              ],
              [
                112.66380565561613,
                -7.978445594203372
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
                112.62930171884855,
                -8.014483951432695
              ],
              [
                112.62930171884855,
                -8.01567384284091
              ],
              [
                112.63033168711027,
                -8.01567384284091
              ],
              [
                112.63033168711027,
                -8.014483951432695
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
                112.61247890390715,
                -7.984735536763061
              ],
              [
                112.61247890390715,
                -7.986265508148801
              ],
              [
                112.61385219492277,
                -7.986265508148801
              ],
              [
                112.61385219492277,
                -7.984735536763061
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 0
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
            ee.Geometry.Polygon(
                [[[112.66294734873136, -7.978445594203372],
                  [112.66294734873136, -7.9791255926608065],
                  [112.66380565561613, -7.9791255926608065],
                  [112.66380565561613, -7.978445594203372]]], null, false),
            {
              "landcover": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[112.62930171884855, -8.014483951432695],
                  [112.62930171884855, -8.01567384284091],
                  [112.63033168711027, -8.01567384284091],
                  [112.63033168711027, -8.014483951432695]]], null, false),
            {
              "landcover": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[112.61247890390715, -7.984735536763061],
                  [112.61247890390715, -7.986265508148801],
                  [112.61385219492277, -7.986265508148801],
                  [112.61385219492277, -7.984735536763061]]], null, false),
            {
              "landcover": 0,
              "system:index": "2"
            })]),
    tVegetation = ui.import && ui.import("tVegetation", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                112.65855522094198,
                -7.997369631597656
              ],
              [
                112.65855522094198,
                -7.998219590096088
              ],
              [
                112.65915603576131,
                -7.998219590096088
              ],
              [
                112.65915603576131,
                -7.997369631597656
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 1
      },
      "color": "#29ff3f",
      "mode": "FeatureCollection",
      "shown": true,
      "locked": false
    }) || /* color: #29ff3f */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[112.65855522094198, -7.997369631597656],
                  [112.65855522094198, -7.998219590096088],
                  [112.65915603576131, -7.998219590096088],
                  [112.65915603576131, -7.997369631597656]]], null, false),
            {
              "landcover": 1,
              "system:index": "0"
            })]),
    tAgri = ui.import && ui.import("tAgri", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                112.59342449106535,
                -7.975045584951218
              ],
              [
                112.59342449106535,
                -7.975895589914693
              ],
              [
                112.59479778208097,
                -7.975895589914693
              ],
              [
                112.59479778208097,
                -7.975045584951218
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
                112.66020076670011,
                -8.010064324315953
              ],
              [
                112.66020076670011,
                -8.011254228644754
              ],
              [
                112.66105907358488,
                -8.011254228644754
              ],
              [
                112.66105907358488,
                -8.010064324315953
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
                112.65366946492361,
                -8.042991849235507
              ],
              [
                112.65366946492361,
                -8.04384171237507
              ],
              [
                112.65452777180838,
                -8.04384171237507
              ],
              [
                112.65452777180838,
                -8.042991849235507
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 2
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
            ee.Geometry.Polygon(
                [[[112.59342449106535, -7.975045584951218],
                  [112.59342449106535, -7.975895589914693],
                  [112.59479778208097, -7.975895589914693],
                  [112.59479778208097, -7.975045584951218]]], null, false),
            {
              "landcover": 2,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[112.66020076670011, -8.010064324315953],
                  [112.66020076670011, -8.011254228644754],
                  [112.66105907358488, -8.011254228644754],
                  [112.66105907358488, -8.010064324315953]]], null, false),
            {
              "landcover": 2,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[112.65366946492361, -8.042991849235507],
                  [112.65366946492361, -8.04384171237507],
                  [112.65452777180838, -8.04384171237507],
                  [112.65452777180838, -8.042991849235507]]], null, false),
            {
              "landcover": 2,
              "system:index": "2"
            })]),
    tBare = ui.import && ui.import("tBare", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                112.6210323456304,
                -7.95891036357725
              ],
              [
                112.6210323456304,
                -7.959144124331394
              ],
              [
                112.62141858372854,
                -7.959144124331394
              ],
              [
                112.62141858372854,
                -7.95891036357725
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 2
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
            ee.Geometry.Polygon(
                [[[112.6210323456304, -7.95891036357725],
                  [112.6210323456304, -7.959144124331394],
                  [112.62141858372854, -7.959144124331394],
                  [112.62141858372854, -7.95891036357725]]], null, false),
            {
              "landcover": 2,
              "system:index": "0"
            })]),
    tWater = ui.import && ui.import("tWater", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                112.63774609299072,
                -7.998429507105802
              ],
              [
                112.63774609299072,
                -7.998790738745207
              ],
              [
                112.63786411018738,
                -7.998790738745207
              ],
              [
                112.63786411018738,
                -7.998429507105802
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
                112.6379928562201,
                -7.999247590066146
              ],
              [
                112.6379928562201,
                -7.999619445414591
              ],
              [
                112.63823961944946,
                -7.999619445414591
              ],
              [
                112.63823961944946,
                -7.999247590066146
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 4
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
            ee.Geometry.Polygon(
                [[[112.63774609299072, -7.998429507105802],
                  [112.63774609299072, -7.998790738745207],
                  [112.63786411018738, -7.998790738745207],
                  [112.63786411018738, -7.998429507105802]]], null, false),
            {
              "landcover": 4,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[112.6379928562201, -7.999247590066146],
                  [112.6379928562201, -7.999619445414591],
                  [112.63823961944946, -7.999619445414591],
                  [112.63823961944946, -7.999247590066146]]], null, false),
            {
              "landcover": 4,
              "system:index": "1"
            })]);
//Menentukan batas studi area
var malang = table.filterBounds(geometry);
//HARMONIC NDVI
// Load a collection of Landsat TOA reflectance images.
var landsatCollection = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA');
// Set the region of interest to a polygon.
var roi = ee.Geometry.Polygon([malang]);
// The dependent variable we are modeling.
var dependent = 'NDVI';
// The number of cycles per year to model.
var harmonics = 1;
// Make a list of harmonic frequencies to model.
// These also serve as band name suffixes.
var harmonicFrequencies = ee.List.sequence(1, harmonics);
// Function to get a sequence of band names for harmonic terms.
var constructBandNames = function(base, list) {
  return ee.List(list).map(function(i) {
    return ee.String(base).cat(ee.Number(i).int());
  });
};
// Construct lists of names for the harmonic terms.
var cosNames = constructBandNames('cos_', harmonicFrequencies);
var sinNames = constructBandNames('sin_', harmonicFrequencies);
// Independent variables.
var independents = ee.List(['constant', 't'])
  .cat(cosNames).cat(sinNames);
// Function to mask clouds in Landsat 8 imagery.
var maskClouds = function(image) {
  var score = ee.Algorithms.Landsat.simpleCloudScore(image).select('cloud');
  var mask = score.lt(10);
  return image.updateMask(mask);
};
// Function to add an NDVI band, the dependent variable.
var addNDVI = function(image) {
  return image
    .addBands(image.normalizedDifference(['B5', 'B4'])
    .rename('NDVI'))
    .float();
};
// Function to add a time band.
var addDependents = function(image) {
  // Compute time in fractional years since the epoch.
  var years = image.date().difference('1970-01-01', 'year');
  var timeRadians = ee.Image(years.multiply(2 * Math.PI)).rename('t');
  var constant = ee.Image(1);
  return image.addBands(constant).addBands(timeRadians.float());
};
// Function to compute the specified number of harmonics
// and add them as bands.  Assumes the time band is present.
var addHarmonics = function(freqs) {
  return function(image) {
    // Make an image of frequencies.
    var frequencies = ee.Image.constant(freqs);
    // This band should represent time in radians.
    var time = ee.Image(image).select('t');
    // Get the cosine terms.
    var cosines = time.multiply(frequencies).cos().rename(cosNames);
    // Get the sin terms.
    var sines = time.multiply(frequencies).sin().rename(sinNames);
    return image.addBands(cosines).addBands(sines);
  };
};
// Filter to the area of interest, mask clouds, add variables.
var harmonicLandsat = landsatCollection
  .filterBounds(malang)
  .map(maskClouds)
  .map(addNDVI)
  .map(addDependents)
  .map(addHarmonics(harmonicFrequencies));
// The output of the regression reduction is a 4x1 array image.
var harmonicTrend = harmonicLandsat
  .select(independents.add(dependent))
  .reduce(ee.Reducer.linearRegression(independents.length(), 1));
// Turn the array image into a multi-band image of coefficients.
var harmonicTrendCoefficients = harmonicTrend.select('coefficients')
  .arrayProject([0])
  .arrayFlatten([independents]);
// Compute fitted values.
var fittedHarmonic = harmonicLandsat.map(function(image) {
  return image.addBands(
    image.select(independents)
      .multiply(harmonicTrendCoefficients)
      .reduce('sum')
      .rename('fitted'));
});
// Plot the fitted model and the original data at the ROI.
print(ui.Chart.image.series(fittedHarmonic.select(['fitted','NDVI']), malang, ee.Reducer.mean(), 30)
    .setOptions({
      title: 'Harmonic model: original and fitted values',
      lineWidth: 1,
      pointSize: 3,
}));
// Pull out the three bands we're going to visualize.
var sin = harmonicTrendCoefficients.select('sin_1');
var cos = harmonicTrendCoefficients.select('cos_1');
// Do some math to turn the first-order Fourier model into
// hue, saturation, and value in the range[0,1].
var magnitude = cos.hypot(sin).multiply(5);
var phase = sin.atan2(cos).unitScale(-Math.PI, Math.PI);
var val = harmonicLandsat.select('NDVI').reduce('mean');
// Turn the HSV data into an RGB image and add it to the map.
var seasonality = ee.Image.cat(phase, magnitude, val).hsvToRgb();
Map.addLayer(seasonality.clip(malang), {}, 'Seasonality');
Map.centerObject(malang, 12);
// Load and display NDVI data.
var ndvi = ee.ImageCollection('LANDSAT/LE07/C01/T1_8DAY_NDVI')
    .filterDate('2010-01-01', '2021-06-06');
//Mencari dataset
var image = ee.Image(S2
    .filterDate("2021-01-01", "2021-06-06")
    .filterBounds(geometry)
    .sort("CLOUD_COVERAGE_ASSESSMENT")
    .first());
    print("A Sentinel-2 scene of Malang for year 2021:", image);
var input = ee.Image('COPERNICUS/S2/20210420T022549_20210420T024940_T49MFM');
//Membuat parameter visualisasi
var RGB = {
        bands: ["B6", "B5", "B2"],
        min: 0,
        max: 3000
        };
//Menampilkan data
Map.addLayer(input.clip(malang), RGB, "Malang, 20 April 2021");
var classNames = urban.merge(vegetation).merge(agri).merge(bare).merge(water);
var bands = ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B8A'];
var training = input.select(bands).sampleRegions({
  collection: classNames,
  properties: ['landcover'],
  scale: 10
});
var classifier = ee.Classifier.libsvm().train({
  features: training,
  classProperty: 'landcover',
  inputProperties: bands
});
//Run the classification
var classified = input.clip(malang).select(bands).classify(classifier);
//Display classification result
Map.addLayer(classified,
{min: 0, max: 4, palette: ['red', 'green', 'yellow','purple', 'blue']},
'Level-1, Land Use Land Cover of Malang 2021');
//###################################################################//
//LUAS AREA
//Mengubah satuan ke Km2
var areaImage = ee.Image.pixelArea().divide(1e6).addBands(classified);
// Menghitung luas berdasarkan kelas
var areas = areaImage.reduceRegion({
      reducer: ee.Reducer.sum().group({
      groupField: 1,
      groupName: 'classification',
    }),
    geometry: malang,
    scale: 30,
    tileScale: 4,
    maxPixels: 1e10
    }); 
var classAreas = ee.List(areas.get('groups'))
print(classAreas)
var areaChart = ui.Chart.image.byClass({
  image: areaImage,
  classBand: 'classification', 
  region: malang,
  scale: 100,
  reducer: ee.Reducer.sum(),
  classLabels: ['urban', 'vegetatio', 'agri', 'bare', 'water'],
}).setOptions({
  hAxis: {title: 'Classes'},
  vAxis: {title: 'Area Km^2'},
  title: 'Area by class',
  series: {
    0: { color: 'red' },
    1: { color: 'green' },
    2: { color: 'yellow' },
    3: { color: 'purple' },
    4: { color: 'blue' }
  }
});
//UJI AKURASI 
//Menggabungkan data uji
var valNames = tUrban.merge(tVegetation).merge(tAgri).merge(tBare).merge(tWater);
var validation = classified.sampleRegions({
  collection: valNames,
  properties: ['landcover'],
  scale: 30,
});
print(validation);
//Membandingkan hasil klasifikasi dengan data uji
var testAccuracy = validation.errorMatrix('landcover', 'classification');
//Cetak matrik error ke panel Console
print('Validation error matrix: ', testAccuracy);
//Cetak overall accuracy ke panel Console
print('Validation overall accuracy: ', testAccuracy.accuracy());
//Membuat panel informasi terpisah
//var header = ui.Label('Tutupan dan Penggunaan Lahan Kota Malang, 2021', {fontSize: '25px', color: 'darkSlateGrey', fontWeight: 'bold'});
//var text_1 = ui.Label('');
var text_2 = ui.Label('Grafis luasan area (km2)', {fontSize: '12px', fontWeight: 'bold'});
var text_3 = ui.Label('Pernyataan: Informasi ini diperoleh melalui analisis data citra satelit dengan didukung informasi validasi dari pengetahuan lokal peneliti. Semua informasi geografis yang tersaji memiliki keterbatasan skala, resolusi, tanggal dan interpretasi dari data primer. Script dasar dibuat di platform Google Earth Engine oleh Dr Fatwa Ramdani pada Juni 2021, Geoinformatics Research Group, Universitas Brawijaya', {fontSize: '12px'});
var text_4 = ui.Label('Validation overall accuracy: 86%', {fontSize: '10px', fontWeight: 'bold'});
var toolPanel = ui.Panel([text_2, areaChart, text_3, text_4], 'flow', {width: '350px'});
ui.root.widgets().add(toolPanel);
// Generate main panel and add it to the map.
var panel = ui.Panel({style: {width:'20%'}});
ui.root.insert(0,panel);
// Define title and description.
var intro = ui.Label('Tutupan dan Penggunaan Lahan Kota Malang, 2021',
  {fontWeight: 'bold', fontSize: '24px', margin: '10px 5px'}
);
var subtitle = ui.Label('Peta ini menampilkan pola tutupan dan penggunaan lahan di Kota Malang.'+
  ' Data yang digunakan adalah citra satelit Sentinel-2, dengan resolusi spasial 10m, dan waktu perekaman tanggal 20 April 2021.'+
  ' Metode klasifikasi yang digunakan adalah supervised (terbimbing), dengan algoritme klasifikasi Support Vector Machine (SVM).');
// Create an empty panel in which to arrange widgets.
// The layout is vertical flow by default.
var panel2 = ui.Panel({style: {width: '400px'}})
    .add(ui.Label('Klik pada peta untuk menampilkan grafik time-series kerapatan vegetasi (NDVI), periode 2010-2021', {fontSize: '10px', fontWeight: 'bold'}));
// Set a callback function for when the user clicks the map.
Map.onClick(function(coords) {
  // Create or update the location label (the second widget in the panel)
  var location = 'lon: ' + coords.lon.toFixed(2) + ' ' +
                 'lat: ' + coords.lat.toFixed(2);
  panel2.widgets().set(1, ui.Label(location));
  // Add a red dot to the map where the user clicked.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  Map.layers().set(1, ui.Map.Layer(point, {color: 'FF0000'}));
  // Create a chart of NDVI over time.
  var chart = ui.Chart.image.series(ndvi, point, ee.Reducer.mean(), 200)
      .setOptions({
        title: 'NDVI Over Time',
        vAxis: {title: 'NDVI'},
        lineWidth: 1,
        pointSize: 3,
      });
  // Add (or replace) the third widget in the panel by
  // manipulating the widgets list.
  panel2.widgets().set(2, chart);
});
// Add title and description to the panel  
panel.add(intro).add(subtitle).add(panel2);