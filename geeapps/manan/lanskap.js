var L8 = ui.import && ui.import("L8", "imageCollection", {
      "id": "LANDSAT/LC08/C01/T1_SR"
    }) || ee.ImageCollection("LANDSAT/LC08/C01/T1_SR"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                115.17147609604638,
                -8.644633731055134
              ],
              [
                115.17147609604638,
                -8.772234866424625
              ],
              [
                115.30880519760888,
                -8.772234866424625
              ],
              [
                115.30880519760888,
                -8.644633731055134
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
        [[[115.17147609604638, -8.644633731055134],
          [115.17147609604638, -8.772234866424625],
          [115.30880519760888, -8.772234866424625],
          [115.30880519760888, -8.644633731055134]]], null, false),
    table = ui.import && ui.import("table", "table", {
      "id": "users/manan/new_poly"
    }) || ee.FeatureCollection("users/manan/new_poly"),
    mangrove = ui.import && ui.import("mangrove", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            115.24477609073803,
            -8.708657468495705
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23945458805248,
            -8.710354287610174
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23584969913647,
            -8.71544469875493
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23636468326733,
            -8.712220779743925
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24288781559154,
            -8.712051099025842
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.2408278790681,
            -8.71103301310038
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23447640812084,
            -8.71680213001967
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23172982608959,
            -8.715105340168401
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.22778161441967,
            -8.718329234298652
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.22520669376537,
            -8.715614377932658
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.22520669376537,
            -8.719686655084608
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.2188552228181,
            -8.724607264081254
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.2210868207185,
            -8.724946614035833
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.2071822491853,
            -8.725116288897459
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.20374902164623,
            -8.723419536811308
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.19980080997631,
            -8.722740833817955
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.19808419620678,
            -8.725455638389368
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.19276269352123,
            -8.728000749745371
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.19035943424389,
            -8.723758887845381
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.1910460797517,
            -8.727491728862521
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.19276269352123,
            -8.732242563433354
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.19585259830639,
            -8.732581906444961
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.19533761417553,
            -8.727152381221604
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.20031579410717,
            -8.727831076194885
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.20546563541576,
            -8.725455638389368
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.20907052433178,
            -8.72732205508063
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.20392068302318,
            -8.72613433644776
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.20065911686108,
            -8.72850976993397
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23344643985912,
            -8.717820200232442
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23190148746654,
            -8.715105340168401
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23979791080639,
            -8.712220779743925
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24511941349193,
            -8.710523969098217
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23087151920483,
            -8.734278616872027
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23104318058178,
            -8.736484328886638
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.19954331791088,
            -8.729612644627414
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.19714005863354,
            -8.727915912979778
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.1939643231599,
            -8.728424933284085
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.1925052014558,
            -8.734108946176661
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.20941384708568,
            -8.737756849113458
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.20889886295483,
            -8.737078172199672
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.21876939212963,
            -8.725285963681962
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.22615083133861,
            -8.7243527514129
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.2254641858308,
            -8.720535040571164
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.20975716983959,
            -8.722401481858723
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.20846970951244,
            -8.72121374757306
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.20683892643139,
            -8.726643359181757
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.20211823856518,
            -8.730036826333862
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.19611009037182,
            -8.72901878942828
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.19808419620678,
            -8.731988055972078
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.19439347660229,
            -8.7347027932727
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.19113191044018,
            -8.73546630957807
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23679383670971,
            -8.71230562007408
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.2309573498933,
            -8.716038575539919
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.22494920169994,
            -8.716462772665707
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.22992738163158,
            -8.714935660759588
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23481973087475,
            -8.712644981202216
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24151452457592,
            -8.712729821436115
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23816712772533,
            -8.713238862435235
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23893960392162,
            -8.714341782222178
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24323113834545,
            -8.708911991853622
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
            ee.Geometry.Point([115.24477609073803, -8.708657468495705]),
            {
              "landcover": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23945458805248, -8.710354287610174]),
            {
              "landcover": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23584969913647, -8.71544469875493]),
            {
              "landcover": 0,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23636468326733, -8.712220779743925]),
            {
              "landcover": 0,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24288781559154, -8.712051099025842]),
            {
              "landcover": 0,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([115.2408278790681, -8.71103301310038]),
            {
              "landcover": 0,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23447640812084, -8.71680213001967]),
            {
              "landcover": 0,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23172982608959, -8.715105340168401]),
            {
              "landcover": 0,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([115.22778161441967, -8.718329234298652]),
            {
              "landcover": 0,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([115.22520669376537, -8.715614377932658]),
            {
              "landcover": 0,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([115.22520669376537, -8.719686655084608]),
            {
              "landcover": 0,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([115.2188552228181, -8.724607264081254]),
            {
              "landcover": 0,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([115.2210868207185, -8.724946614035833]),
            {
              "landcover": 0,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([115.2071822491853, -8.725116288897459]),
            {
              "landcover": 0,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([115.20374902164623, -8.723419536811308]),
            {
              "landcover": 0,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([115.19980080997631, -8.722740833817955]),
            {
              "landcover": 0,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([115.19808419620678, -8.725455638389368]),
            {
              "landcover": 0,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([115.19276269352123, -8.728000749745371]),
            {
              "landcover": 0,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([115.19035943424389, -8.723758887845381]),
            {
              "landcover": 0,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([115.1910460797517, -8.727491728862521]),
            {
              "landcover": 0,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([115.19276269352123, -8.732242563433354]),
            {
              "landcover": 0,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([115.19585259830639, -8.732581906444961]),
            {
              "landcover": 0,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([115.19533761417553, -8.727152381221604]),
            {
              "landcover": 0,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([115.20031579410717, -8.727831076194885]),
            {
              "landcover": 0,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([115.20546563541576, -8.725455638389368]),
            {
              "landcover": 0,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([115.20907052433178, -8.72732205508063]),
            {
              "landcover": 0,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([115.20392068302318, -8.72613433644776]),
            {
              "landcover": 0,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([115.20065911686108, -8.72850976993397]),
            {
              "landcover": 0,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23344643985912, -8.717820200232442]),
            {
              "landcover": 0,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23190148746654, -8.715105340168401]),
            {
              "landcover": 0,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23979791080639, -8.712220779743925]),
            {
              "landcover": 0,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24511941349193, -8.710523969098217]),
            {
              "landcover": 0,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23087151920483, -8.734278616872027]),
            {
              "landcover": 0,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23104318058178, -8.736484328886638]),
            {
              "landcover": 0,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([115.19954331791088, -8.729612644627414]),
            {
              "landcover": 0,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([115.19714005863354, -8.727915912979778]),
            {
              "landcover": 0,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([115.1939643231599, -8.728424933284085]),
            {
              "landcover": 0,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([115.1925052014558, -8.734108946176661]),
            {
              "landcover": 0,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([115.20941384708568, -8.737756849113458]),
            {
              "landcover": 0,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([115.20889886295483, -8.737078172199672]),
            {
              "landcover": 0,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([115.21876939212963, -8.725285963681962]),
            {
              "landcover": 0,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([115.22615083133861, -8.7243527514129]),
            {
              "landcover": 0,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([115.2254641858308, -8.720535040571164]),
            {
              "landcover": 0,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([115.20975716983959, -8.722401481858723]),
            {
              "landcover": 0,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([115.20846970951244, -8.72121374757306]),
            {
              "landcover": 0,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([115.20683892643139, -8.726643359181757]),
            {
              "landcover": 0,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([115.20211823856518, -8.730036826333862]),
            {
              "landcover": 0,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([115.19611009037182, -8.72901878942828]),
            {
              "landcover": 0,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([115.19808419620678, -8.731988055972078]),
            {
              "landcover": 0,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([115.19439347660229, -8.7347027932727]),
            {
              "landcover": 0,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([115.19113191044018, -8.73546630957807]),
            {
              "landcover": 0,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23679383670971, -8.71230562007408]),
            {
              "landcover": 0,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([115.2309573498933, -8.716038575539919]),
            {
              "landcover": 0,
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Point([115.22494920169994, -8.716462772665707]),
            {
              "landcover": 0,
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Point([115.22992738163158, -8.714935660759588]),
            {
              "landcover": 0,
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23481973087475, -8.712644981202216]),
            {
              "landcover": 0,
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24151452457592, -8.712729821436115]),
            {
              "landcover": 0,
              "system:index": "56"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23816712772533, -8.713238862435235]),
            {
              "landcover": 0,
              "system:index": "57"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23893960392162, -8.714341782222178]),
            {
              "landcover": 0,
              "system:index": "58"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24323113834545, -8.708911991853622]),
            {
              "landcover": 0,
              "system:index": "59"
            })]),
    badan_air = ui.import && ui.import("badan_air", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            115.19588065001298,
            -8.737924531081465
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.19991469237138,
            -8.734785641410841
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.20669531676103,
            -8.732410247880985
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.20077299925615,
            -8.744541563247845
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.20360541197587,
            -8.745814055960489
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.20738196226884,
            -8.7474258738218
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.2133901104622,
            -8.748104531886755
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.21476340147782,
            -8.744541563247845
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.21716666075517,
            -8.740215055512575
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.2174241528206,
            -8.735124982108617
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.21982741209794,
            -8.7325799193491
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.21845412108232,
            -8.727913925859069
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24068426939775,
            -8.751243309345284
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24797987791825,
            -8.752346116763663
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.25862288328935,
            -8.752600610319226
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.2642877087288,
            -8.74708654432549
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.25827956053544,
            -8.739027377934994
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.2723557934456,
            -8.733088933290377
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.25613379332353,
            -8.734022123711851
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.27681898924638,
            -8.745814055960489
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.27544569823075,
            -8.726471697885826
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24686407896806,
            -8.717224339101143
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.26008200499345,
            -8.726556534979691
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.28651785704423,
            -8.711285547632444
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.28239798399736,
            -8.706873812908652
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.28033804747392,
            -8.68854758901173
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.27690481993486,
            -8.67938414101993
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.29475760313798,
            -8.675820517480208
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.29407095763017,
            -8.691771711907052
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.27261328551103,
            -8.683626505879062
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.27261328551103,
            -8.693298918335541
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.28617453429032,
            -8.692789850217574
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.28703284117509,
            -8.680402312960174
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.29441428038407,
            -8.70042579935351
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.2738149151497,
            -8.702122655795606
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.2844579205208,
            -8.718412086070986
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.2793080792122,
            -8.734531135684861
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.2460057720833,
            -8.72095724543414
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24137091490556,
            -8.728931965778827
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23192953917314,
            -8.721296598705656
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.22300314757157,
            -8.727235231036433
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.2411992535286,
            -8.7189211193308
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.2514989361458,
            -8.72452043940564
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.27604651305009,
            -8.713661075541841
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.27982306334306,
            -8.668862869296253
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.26712012144853,
            -8.666996161277023
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.18927168700029,
            -8.728507782816429
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.19012999388505,
            -8.731052873357815
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.19021582457353,
            -8.731477053426847
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.27311807625543,
            -8.656559395689529
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.27328973763238,
            -8.668947719440455
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.28135782234918,
            -8.695080651301982
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
            ee.Geometry.Point([115.19588065001298, -8.737924531081465]),
            {
              "landcover": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([115.19991469237138, -8.734785641410841]),
            {
              "landcover": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([115.20669531676103, -8.732410247880985]),
            {
              "landcover": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([115.20077299925615, -8.744541563247845]),
            {
              "landcover": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([115.20360541197587, -8.745814055960489]),
            {
              "landcover": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([115.20738196226884, -8.7474258738218]),
            {
              "landcover": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([115.2133901104622, -8.748104531886755]),
            {
              "landcover": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([115.21476340147782, -8.744541563247845]),
            {
              "landcover": 1,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([115.21716666075517, -8.740215055512575]),
            {
              "landcover": 1,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([115.2174241528206, -8.735124982108617]),
            {
              "landcover": 1,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([115.21982741209794, -8.7325799193491]),
            {
              "landcover": 1,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([115.21845412108232, -8.727913925859069]),
            {
              "landcover": 1,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24068426939775, -8.751243309345284]),
            {
              "landcover": 1,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24797987791825, -8.752346116763663]),
            {
              "landcover": 1,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([115.25862288328935, -8.752600610319226]),
            {
              "landcover": 1,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([115.2642877087288, -8.74708654432549]),
            {
              "landcover": 1,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([115.25827956053544, -8.739027377934994]),
            {
              "landcover": 1,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([115.2723557934456, -8.733088933290377]),
            {
              "landcover": 1,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([115.25613379332353, -8.734022123711851]),
            {
              "landcover": 1,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([115.27681898924638, -8.745814055960489]),
            {
              "landcover": 1,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([115.27544569823075, -8.726471697885826]),
            {
              "landcover": 1,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24686407896806, -8.717224339101143]),
            {
              "landcover": 1,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([115.26008200499345, -8.726556534979691]),
            {
              "landcover": 1,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([115.28651785704423, -8.711285547632444]),
            {
              "landcover": 1,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([115.28239798399736, -8.706873812908652]),
            {
              "landcover": 1,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([115.28033804747392, -8.68854758901173]),
            {
              "landcover": 1,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([115.27690481993486, -8.67938414101993]),
            {
              "landcover": 1,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([115.29475760313798, -8.675820517480208]),
            {
              "landcover": 1,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([115.29407095763017, -8.691771711907052]),
            {
              "landcover": 1,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([115.27261328551103, -8.683626505879062]),
            {
              "landcover": 1,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([115.27261328551103, -8.693298918335541]),
            {
              "landcover": 1,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([115.28617453429032, -8.692789850217574]),
            {
              "landcover": 1,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([115.28703284117509, -8.680402312960174]),
            {
              "landcover": 1,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([115.29441428038407, -8.70042579935351]),
            {
              "landcover": 1,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([115.2738149151497, -8.702122655795606]),
            {
              "landcover": 1,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([115.2844579205208, -8.718412086070986]),
            {
              "landcover": 1,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([115.2793080792122, -8.734531135684861]),
            {
              "landcover": 1,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([115.2460057720833, -8.72095724543414]),
            {
              "landcover": 1,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24137091490556, -8.728931965778827]),
            {
              "landcover": 1,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23192953917314, -8.721296598705656]),
            {
              "landcover": 1,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([115.22300314757157, -8.727235231036433]),
            {
              "landcover": 1,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([115.2411992535286, -8.7189211193308]),
            {
              "landcover": 1,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([115.2514989361458, -8.72452043940564]),
            {
              "landcover": 1,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([115.27604651305009, -8.713661075541841]),
            {
              "landcover": 1,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([115.27982306334306, -8.668862869296253]),
            {
              "landcover": 1,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([115.26712012144853, -8.666996161277023]),
            {
              "landcover": 1,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([115.18927168700029, -8.728507782816429]),
            {
              "landcover": 1,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([115.19012999388505, -8.731052873357815]),
            {
              "landcover": 1,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([115.19021582457353, -8.731477053426847]),
            {
              "landcover": 1,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([115.27311807625543, -8.656559395689529]),
            {
              "landcover": 1,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([115.27328973763238, -8.668947719440455]),
            {
              "landcover": 1,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([115.28135782234918, -8.695080651301982]),
            {
              "landcover": 1,
              "system:index": "51"
            })]),
    lahan_terbangun = ui.import && ui.import("lahan_terbangun", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            115.23209100716363,
            -8.726641372054269
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23518091194879,
            -8.72443560184907
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23432260506402,
            -8.726302023640248
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.2109766577984,
            -8.741402729305197
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.20891672127496,
            -8.739875719448026
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.20857339852105,
            -8.741572396680851
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.21046167366754,
            -8.743438732713908
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.19947534554254,
            -8.715273032312213
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.20393854134332,
            -8.707637386103652
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.19724374764215,
            -8.706279921568454
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.20102029793512,
            -8.715612390746493
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.19363885872613,
            -8.71934531318418
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.21578317635309,
            -8.715103352979542
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.21252161019098,
            -8.715103352979542
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.21303659432184,
            -8.71018261883013
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.21543985359918,
            -8.702037813156164
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.21595483773004,
            -8.695589716307536
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.2109766577984,
            -8.699322838542145
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.22058969490777,
            -8.695759404489007
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.219731388023,
            -8.689820272414604
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.22797113411676,
            -8.687105209266031
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.22385126106988,
            -8.700171270223876
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.22058969490777,
            -8.696777531963619
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.2223063086773,
            -8.702716553733229
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.22968774788629,
            -8.70288623868519
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23209100716363,
            -8.693383762954623
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.22865777962457,
            -8.68931119957191
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23809915535699,
            -8.688971817292732
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23964410774957,
            -8.69491096281308
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23483758919488,
            -8.700850014185052
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.2358675574566,
            -8.70526181993498
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.22951608650934,
            -8.706110238155246
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.25578027718316,
            -8.70254686870435
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.25097375862848,
            -8.699153151975098
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.20153528206598,
            -8.70865548127257
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.22144800179254,
            -8.703734662291112
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.22505289070855,
            -8.706279921568454
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.22316461556207,
            -8.704583083973754
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.22676950447809,
            -8.694062519215768
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23603921883355,
            -8.694232208088932
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.21870141976129,
            -8.703395293079534
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.21835809700738,
            -8.699153151975098
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24960046761285,
            -8.707467703306111
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.2574968909527,
            -8.703395293079534
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.25045877449762,
            -8.700850014185052
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.25990015023004,
            -8.685408284815228
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.26213174813043,
            -8.694401896885243
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.25732522957574,
            -8.691686866922995
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.25578027718316,
            -8.68439012645949
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.2523470496441,
            -8.681335634812118
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.25028711312066,
            -8.683032577686333
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.25612359993707,
            -8.676244760151567
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.25921350472223,
            -8.675396274329529
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24153238289605,
            -8.68031746540399
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23741250984918,
            -8.68031746540399
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.2303743933941,
            -8.680147770234077
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23449426644098,
            -8.682184107208563
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.241704044273,
            -8.675396274329529
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23483758919488,
            -8.675226576935035
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.22882944100152,
            -8.675226576935035
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.2277994727398,
            -8.6633475688369
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23535257332574,
            -8.661480833432798
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.2355242347027,
            -8.664026379413647
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24187570564996,
            -8.66351727159597
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23466592781793,
            -8.655541159154382
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.22968774788629,
            -8.65638968979163
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23809915535699,
            -8.652486433022231
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23174768440973,
            -8.664705188764954
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24599557869684,
            -8.661311129754788
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23998743050348,
            -8.65367438501904
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24376398079644,
            -8.647395167731705
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24067407601129,
            -8.667759815678249
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23432260506402,
            -8.647055747598875
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23964410774957,
            -8.643491817744751
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.2387858008648,
            -8.639249000171246
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24857049935113,
            -8.636363856952617
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.25251871102105,
            -8.636194141958383
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24582391731988,
            -8.63772157415763
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.25063043587457,
            -8.643491817744751
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.25080209725152,
            -8.638230716849517
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.25612359993707,
            -8.636024426887804
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.25166040413629,
            -8.646037485365735
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24513727181207,
            -8.65367438501904
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.25320535652887,
            -8.647395167731705
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.26813989632379,
            -8.64332210595863
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.2633333777691,
            -8.642982682157182
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.2607584571148,
            -8.640097567505608
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.25766855232965,
            -8.651977309590462
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.2329493140484,
            -8.664874890911285
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23827081673394,
            -8.654183506155887
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.19584951064101,
            -8.711692786619203
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.21121320387832,
            -8.717631571617876
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.2090674366664,
            -8.716868018832903
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.21610555312148,
            -8.718225444927498
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.2156763996791,
            -8.723061235305893
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.19387540480605,
            -8.721534150371118
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.20666417738906,
            -8.70948692816394
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.20520505568496,
            -8.708214311598578
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.20220098158828,
            -8.703717698396906
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23378667494765,
            -8.709741450957413
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.2306967701625,
            -8.708723358744312
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.22674855849257,
            -8.707111373739787
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.22074041029921,
            -8.713559272071384
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.21224317214003,
            -8.717716410719905
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.2156763996791,
            -8.718904156125525
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.22202787062636,
            -8.716698340224356
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.22348699233046,
            -8.711183743515178
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.22898015639296,
            -8.711353424626846
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.25327024123183,
            -8.703760119528642
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.2521115269374,
            -8.70359043497285
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24711188933364,
            -8.672176257752048
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24591025969497,
            -8.672112620692511
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.25026616713515,
            -8.666491304574917
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23517502616157,
            -8.696098776206975
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23607624839057,
            -8.696395730070552
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.2359904177021,
            -8.697456277661582
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23702038596382,
            -8.69885619588344
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23650540183296,
            -8.697795652256477
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24281395743598,
            -8.698050183000852
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.2425993807148,
            -8.700468216443971
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23556126425972,
            -8.697498699502761
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23478878806343,
            -8.69800776122214
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24308764531075,
            -8.70032339186441
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23746573521554,
            -8.701383928332099
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 2
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
            ee.Geometry.Point([115.23209100716363, -8.726641372054269]),
            {
              "landcover": 2,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23518091194879, -8.72443560184907]),
            {
              "landcover": 2,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23432260506402, -8.726302023640248]),
            {
              "landcover": 2,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([115.2109766577984, -8.741402729305197]),
            {
              "landcover": 2,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([115.20891672127496, -8.739875719448026]),
            {
              "landcover": 2,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([115.20857339852105, -8.741572396680851]),
            {
              "landcover": 2,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([115.21046167366754, -8.743438732713908]),
            {
              "landcover": 2,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([115.19947534554254, -8.715273032312213]),
            {
              "landcover": 2,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([115.20393854134332, -8.707637386103652]),
            {
              "landcover": 2,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([115.19724374764215, -8.706279921568454]),
            {
              "landcover": 2,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([115.20102029793512, -8.715612390746493]),
            {
              "landcover": 2,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([115.19363885872613, -8.71934531318418]),
            {
              "landcover": 2,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([115.21578317635309, -8.715103352979542]),
            {
              "landcover": 2,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([115.21252161019098, -8.715103352979542]),
            {
              "landcover": 2,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([115.21303659432184, -8.71018261883013]),
            {
              "landcover": 2,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([115.21543985359918, -8.702037813156164]),
            {
              "landcover": 2,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([115.21595483773004, -8.695589716307536]),
            {
              "landcover": 2,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([115.2109766577984, -8.699322838542145]),
            {
              "landcover": 2,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([115.22058969490777, -8.695759404489007]),
            {
              "landcover": 2,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([115.219731388023, -8.689820272414604]),
            {
              "landcover": 2,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([115.22797113411676, -8.687105209266031]),
            {
              "landcover": 2,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([115.22385126106988, -8.700171270223876]),
            {
              "landcover": 2,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([115.22058969490777, -8.696777531963619]),
            {
              "landcover": 2,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([115.2223063086773, -8.702716553733229]),
            {
              "landcover": 2,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([115.22968774788629, -8.70288623868519]),
            {
              "landcover": 2,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23209100716363, -8.693383762954623]),
            {
              "landcover": 2,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([115.22865777962457, -8.68931119957191]),
            {
              "landcover": 2,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23809915535699, -8.688971817292732]),
            {
              "landcover": 2,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23964410774957, -8.69491096281308]),
            {
              "landcover": 2,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23483758919488, -8.700850014185052]),
            {
              "landcover": 2,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([115.2358675574566, -8.70526181993498]),
            {
              "landcover": 2,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([115.22951608650934, -8.706110238155246]),
            {
              "landcover": 2,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([115.25578027718316, -8.70254686870435]),
            {
              "landcover": 2,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([115.25097375862848, -8.699153151975098]),
            {
              "landcover": 2,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([115.20153528206598, -8.70865548127257]),
            {
              "landcover": 2,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([115.22144800179254, -8.703734662291112]),
            {
              "landcover": 2,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([115.22505289070855, -8.706279921568454]),
            {
              "landcover": 2,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([115.22316461556207, -8.704583083973754]),
            {
              "landcover": 2,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([115.22676950447809, -8.694062519215768]),
            {
              "landcover": 2,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23603921883355, -8.694232208088932]),
            {
              "landcover": 2,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([115.21870141976129, -8.703395293079534]),
            {
              "landcover": 2,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([115.21835809700738, -8.699153151975098]),
            {
              "landcover": 2,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24960046761285, -8.707467703306111]),
            {
              "landcover": 2,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([115.2574968909527, -8.703395293079534]),
            {
              "landcover": 2,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([115.25045877449762, -8.700850014185052]),
            {
              "landcover": 2,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([115.25990015023004, -8.685408284815228]),
            {
              "landcover": 2,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([115.26213174813043, -8.694401896885243]),
            {
              "landcover": 2,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([115.25732522957574, -8.691686866922995]),
            {
              "landcover": 2,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([115.25578027718316, -8.68439012645949]),
            {
              "landcover": 2,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([115.2523470496441, -8.681335634812118]),
            {
              "landcover": 2,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([115.25028711312066, -8.683032577686333]),
            {
              "landcover": 2,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([115.25612359993707, -8.676244760151567]),
            {
              "landcover": 2,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([115.25921350472223, -8.675396274329529]),
            {
              "landcover": 2,
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24153238289605, -8.68031746540399]),
            {
              "landcover": 2,
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23741250984918, -8.68031746540399]),
            {
              "landcover": 2,
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Point([115.2303743933941, -8.680147770234077]),
            {
              "landcover": 2,
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23449426644098, -8.682184107208563]),
            {
              "landcover": 2,
              "system:index": "56"
            }),
        ee.Feature(
            ee.Geometry.Point([115.241704044273, -8.675396274329529]),
            {
              "landcover": 2,
              "system:index": "57"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23483758919488, -8.675226576935035]),
            {
              "landcover": 2,
              "system:index": "58"
            }),
        ee.Feature(
            ee.Geometry.Point([115.22882944100152, -8.675226576935035]),
            {
              "landcover": 2,
              "system:index": "59"
            }),
        ee.Feature(
            ee.Geometry.Point([115.2277994727398, -8.6633475688369]),
            {
              "landcover": 2,
              "system:index": "60"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23535257332574, -8.661480833432798]),
            {
              "landcover": 2,
              "system:index": "61"
            }),
        ee.Feature(
            ee.Geometry.Point([115.2355242347027, -8.664026379413647]),
            {
              "landcover": 2,
              "system:index": "62"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24187570564996, -8.66351727159597]),
            {
              "landcover": 2,
              "system:index": "63"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23466592781793, -8.655541159154382]),
            {
              "landcover": 2,
              "system:index": "64"
            }),
        ee.Feature(
            ee.Geometry.Point([115.22968774788629, -8.65638968979163]),
            {
              "landcover": 2,
              "system:index": "65"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23809915535699, -8.652486433022231]),
            {
              "landcover": 2,
              "system:index": "66"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23174768440973, -8.664705188764954]),
            {
              "landcover": 2,
              "system:index": "67"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24599557869684, -8.661311129754788]),
            {
              "landcover": 2,
              "system:index": "68"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23998743050348, -8.65367438501904]),
            {
              "landcover": 2,
              "system:index": "69"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24376398079644, -8.647395167731705]),
            {
              "landcover": 2,
              "system:index": "70"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24067407601129, -8.667759815678249]),
            {
              "landcover": 2,
              "system:index": "71"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23432260506402, -8.647055747598875]),
            {
              "landcover": 2,
              "system:index": "72"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23964410774957, -8.643491817744751]),
            {
              "landcover": 2,
              "system:index": "73"
            }),
        ee.Feature(
            ee.Geometry.Point([115.2387858008648, -8.639249000171246]),
            {
              "landcover": 2,
              "system:index": "74"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24857049935113, -8.636363856952617]),
            {
              "landcover": 2,
              "system:index": "75"
            }),
        ee.Feature(
            ee.Geometry.Point([115.25251871102105, -8.636194141958383]),
            {
              "landcover": 2,
              "system:index": "76"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24582391731988, -8.63772157415763]),
            {
              "landcover": 2,
              "system:index": "77"
            }),
        ee.Feature(
            ee.Geometry.Point([115.25063043587457, -8.643491817744751]),
            {
              "landcover": 2,
              "system:index": "78"
            }),
        ee.Feature(
            ee.Geometry.Point([115.25080209725152, -8.638230716849517]),
            {
              "landcover": 2,
              "system:index": "79"
            }),
        ee.Feature(
            ee.Geometry.Point([115.25612359993707, -8.636024426887804]),
            {
              "landcover": 2,
              "system:index": "80"
            }),
        ee.Feature(
            ee.Geometry.Point([115.25166040413629, -8.646037485365735]),
            {
              "landcover": 2,
              "system:index": "81"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24513727181207, -8.65367438501904]),
            {
              "landcover": 2,
              "system:index": "82"
            }),
        ee.Feature(
            ee.Geometry.Point([115.25320535652887, -8.647395167731705]),
            {
              "landcover": 2,
              "system:index": "83"
            }),
        ee.Feature(
            ee.Geometry.Point([115.26813989632379, -8.64332210595863]),
            {
              "landcover": 2,
              "system:index": "84"
            }),
        ee.Feature(
            ee.Geometry.Point([115.2633333777691, -8.642982682157182]),
            {
              "landcover": 2,
              "system:index": "85"
            }),
        ee.Feature(
            ee.Geometry.Point([115.2607584571148, -8.640097567505608]),
            {
              "landcover": 2,
              "system:index": "86"
            }),
        ee.Feature(
            ee.Geometry.Point([115.25766855232965, -8.651977309590462]),
            {
              "landcover": 2,
              "system:index": "87"
            }),
        ee.Feature(
            ee.Geometry.Point([115.2329493140484, -8.664874890911285]),
            {
              "landcover": 2,
              "system:index": "88"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23827081673394, -8.654183506155887]),
            {
              "landcover": 2,
              "system:index": "89"
            }),
        ee.Feature(
            ee.Geometry.Point([115.19584951064101, -8.711692786619203]),
            {
              "landcover": 2,
              "system:index": "90"
            }),
        ee.Feature(
            ee.Geometry.Point([115.21121320387832, -8.717631571617876]),
            {
              "landcover": 2,
              "system:index": "91"
            }),
        ee.Feature(
            ee.Geometry.Point([115.2090674366664, -8.716868018832903]),
            {
              "landcover": 2,
              "system:index": "92"
            }),
        ee.Feature(
            ee.Geometry.Point([115.21610555312148, -8.718225444927498]),
            {
              "landcover": 2,
              "system:index": "93"
            }),
        ee.Feature(
            ee.Geometry.Point([115.2156763996791, -8.723061235305893]),
            {
              "landcover": 2,
              "system:index": "94"
            }),
        ee.Feature(
            ee.Geometry.Point([115.19387540480605, -8.721534150371118]),
            {
              "landcover": 2,
              "system:index": "95"
            }),
        ee.Feature(
            ee.Geometry.Point([115.20666417738906, -8.70948692816394]),
            {
              "landcover": 2,
              "system:index": "96"
            }),
        ee.Feature(
            ee.Geometry.Point([115.20520505568496, -8.708214311598578]),
            {
              "landcover": 2,
              "system:index": "97"
            }),
        ee.Feature(
            ee.Geometry.Point([115.20220098158828, -8.703717698396906]),
            {
              "landcover": 2,
              "system:index": "98"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23378667494765, -8.709741450957413]),
            {
              "landcover": 2,
              "system:index": "99"
            }),
        ee.Feature(
            ee.Geometry.Point([115.2306967701625, -8.708723358744312]),
            {
              "landcover": 2,
              "system:index": "100"
            }),
        ee.Feature(
            ee.Geometry.Point([115.22674855849257, -8.707111373739787]),
            {
              "landcover": 2,
              "system:index": "101"
            }),
        ee.Feature(
            ee.Geometry.Point([115.22074041029921, -8.713559272071384]),
            {
              "landcover": 2,
              "system:index": "102"
            }),
        ee.Feature(
            ee.Geometry.Point([115.21224317214003, -8.717716410719905]),
            {
              "landcover": 2,
              "system:index": "103"
            }),
        ee.Feature(
            ee.Geometry.Point([115.2156763996791, -8.718904156125525]),
            {
              "landcover": 2,
              "system:index": "104"
            }),
        ee.Feature(
            ee.Geometry.Point([115.22202787062636, -8.716698340224356]),
            {
              "landcover": 2,
              "system:index": "105"
            }),
        ee.Feature(
            ee.Geometry.Point([115.22348699233046, -8.711183743515178]),
            {
              "landcover": 2,
              "system:index": "106"
            }),
        ee.Feature(
            ee.Geometry.Point([115.22898015639296, -8.711353424626846]),
            {
              "landcover": 2,
              "system:index": "107"
            }),
        ee.Feature(
            ee.Geometry.Point([115.25327024123183, -8.703760119528642]),
            {
              "landcover": 2,
              "system:index": "108"
            }),
        ee.Feature(
            ee.Geometry.Point([115.2521115269374, -8.70359043497285]),
            {
              "landcover": 2,
              "system:index": "109"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24711188933364, -8.672176257752048]),
            {
              "landcover": 2,
              "system:index": "110"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24591025969497, -8.672112620692511]),
            {
              "landcover": 2,
              "system:index": "111"
            }),
        ee.Feature(
            ee.Geometry.Point([115.25026616713515, -8.666491304574917]),
            {
              "landcover": 2,
              "system:index": "112"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23517502616157, -8.696098776206975]),
            {
              "landcover": 2,
              "system:index": "113"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23607624839057, -8.696395730070552]),
            {
              "landcover": 2,
              "system:index": "114"
            }),
        ee.Feature(
            ee.Geometry.Point([115.2359904177021, -8.697456277661582]),
            {
              "landcover": 2,
              "system:index": "115"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23702038596382, -8.69885619588344]),
            {
              "landcover": 2,
              "system:index": "116"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23650540183296, -8.697795652256477]),
            {
              "landcover": 2,
              "system:index": "117"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24281395743598, -8.698050183000852]),
            {
              "landcover": 2,
              "system:index": "118"
            }),
        ee.Feature(
            ee.Geometry.Point([115.2425993807148, -8.700468216443971]),
            {
              "landcover": 2,
              "system:index": "119"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23556126425972, -8.697498699502761]),
            {
              "landcover": 2,
              "system:index": "120"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23478878806343, -8.69800776122214]),
            {
              "landcover": 2,
              "system:index": "121"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24308764531075, -8.70032339186441]),
            {
              "landcover": 2,
              "system:index": "122"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23746573521554, -8.701383928332099]),
            {
              "landcover": 2,
              "system:index": "123"
            })]),
    lahan_terbuka = ui.import && ui.import("lahan_terbuka", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            115.20265108101617,
            -8.741390537995523
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.20308023445855,
            -8.738591015053137
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.20222192757379,
            -8.738082008622627
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.20299440377008,
            -8.742323707636105
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.21398073189508,
            -8.733161577300937
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.21586900704156,
            -8.731549697751317
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.2175856208111,
            -8.730701337296148
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.2142382239605,
            -8.729174283615743
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.21406656258355,
            -8.730107483829725
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.21449571602594,
            -8.73333124842728
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.21269327156793,
            -8.734603779414517
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.21578317635309,
            -8.732652563458792
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.21398073189508,
            -8.730701337296148
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23260599129449,
            -8.737148828361585
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23226266854059,
            -8.73765783606629
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23320680611383,
            -8.738845518007746
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.22367959969293,
            -8.733076741708816
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.2230787848736,
            -8.734943120277771
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.22179132454644,
            -8.73579147108492
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.22573953621637,
            -8.729937811237146
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.22462373726617,
            -8.732991906097395
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.22582536690484,
            -8.730531664973622
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23758417122613,
            -8.730701337296148
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23921495430719,
            -8.730701337296148
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.241704044273,
            -8.725271784710706
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24436479561578,
            -8.727307876186702
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24230485909234,
            -8.725695971350703
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.22960191719781,
            -8.728750100928782
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.241704044273,
            -8.740033196164838
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24041658394586,
            -8.741051203001344
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24445062630426,
            -8.735961141014752
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24824863426934,
            -8.731464861792617
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24801259987603,
            -8.73167695165321
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24745470040094,
            -8.732228384726405
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.22127634041559,
            -8.721633991490226
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.22067552559625,
            -8.723161076016755
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.2193880652691,
            -8.721888506011608
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23659711830865,
            -8.709417090588078
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23767000191461,
            -8.709332249602587
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24925714485894,
            -8.71213199196139
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24994379036676,
            -8.712428933103245
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24934297554742,
            -8.712556193520415
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.25475030892144,
            -8.711622949455284
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.25646692269098,
            -8.710944225035819
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.26101594918023,
            -8.708398997492093
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.26492124550592,
            -8.702417644602836
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.26341920845758,
            -8.70593859440417
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.25028711312066,
            -8.71272587400927
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.26556497566949,
            -8.699914780628747
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.26582246773492,
            -8.69834517943098
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.26663785927545,
            -8.694187825555392
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.26663785927545,
            -8.691727329082111
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.26616579048883,
            -8.689181970904581
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.26526456825982,
            -8.687485055851774
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.26466375344049,
            -8.677642797157022
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.26466375344049,
            -8.678660973820847
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.26410585396539,
            -8.681121556022482
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.26449209206353,
            -8.684430589406022
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.26350503914605,
            -8.674036732598776
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23449426644098,
            -8.670133658999518
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23286348335992,
            -8.670388208513796
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23363595955621,
            -8.670388208513796
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 3
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
            ee.Geometry.Point([115.20265108101617, -8.741390537995523]),
            {
              "landcover": 3,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([115.20308023445855, -8.738591015053137]),
            {
              "landcover": 3,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([115.20222192757379, -8.738082008622627]),
            {
              "landcover": 3,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([115.20299440377008, -8.742323707636105]),
            {
              "landcover": 3,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([115.21398073189508, -8.733161577300937]),
            {
              "landcover": 3,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([115.21586900704156, -8.731549697751317]),
            {
              "landcover": 3,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([115.2175856208111, -8.730701337296148]),
            {
              "landcover": 3,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([115.2142382239605, -8.729174283615743]),
            {
              "landcover": 3,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([115.21406656258355, -8.730107483829725]),
            {
              "landcover": 3,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([115.21449571602594, -8.73333124842728]),
            {
              "landcover": 3,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([115.21269327156793, -8.734603779414517]),
            {
              "landcover": 3,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([115.21578317635309, -8.732652563458792]),
            {
              "landcover": 3,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([115.21398073189508, -8.730701337296148]),
            {
              "landcover": 3,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23260599129449, -8.737148828361585]),
            {
              "landcover": 3,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23226266854059, -8.73765783606629]),
            {
              "landcover": 3,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23320680611383, -8.738845518007746]),
            {
              "landcover": 3,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([115.22367959969293, -8.733076741708816]),
            {
              "landcover": 3,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([115.2230787848736, -8.734943120277771]),
            {
              "landcover": 3,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([115.22179132454644, -8.73579147108492]),
            {
              "landcover": 3,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([115.22573953621637, -8.729937811237146]),
            {
              "landcover": 3,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([115.22462373726617, -8.732991906097395]),
            {
              "landcover": 3,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([115.22582536690484, -8.730531664973622]),
            {
              "landcover": 3,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23758417122613, -8.730701337296148]),
            {
              "landcover": 3,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23921495430719, -8.730701337296148]),
            {
              "landcover": 3,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([115.241704044273, -8.725271784710706]),
            {
              "landcover": 3,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24436479561578, -8.727307876186702]),
            {
              "landcover": 3,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24230485909234, -8.725695971350703]),
            {
              "landcover": 3,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([115.22960191719781, -8.728750100928782]),
            {
              "landcover": 3,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([115.241704044273, -8.740033196164838]),
            {
              "landcover": 3,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24041658394586, -8.741051203001344]),
            {
              "landcover": 3,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24445062630426, -8.735961141014752]),
            {
              "landcover": 3,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24824863426934, -8.731464861792617]),
            {
              "landcover": 3,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24801259987603, -8.73167695165321]),
            {
              "landcover": 3,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24745470040094, -8.732228384726405]),
            {
              "landcover": 3,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([115.22127634041559, -8.721633991490226]),
            {
              "landcover": 3,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([115.22067552559625, -8.723161076016755]),
            {
              "landcover": 3,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([115.2193880652691, -8.721888506011608]),
            {
              "landcover": 3,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23659711830865, -8.709417090588078]),
            {
              "landcover": 3,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23767000191461, -8.709332249602587]),
            {
              "landcover": 3,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24925714485894, -8.71213199196139]),
            {
              "landcover": 3,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24994379036676, -8.712428933103245]),
            {
              "landcover": 3,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24934297554742, -8.712556193520415]),
            {
              "landcover": 3,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([115.25475030892144, -8.711622949455284]),
            {
              "landcover": 3,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([115.25646692269098, -8.710944225035819]),
            {
              "landcover": 3,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([115.26101594918023, -8.708398997492093]),
            {
              "landcover": 3,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([115.26492124550592, -8.702417644602836]),
            {
              "landcover": 3,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([115.26341920845758, -8.70593859440417]),
            {
              "landcover": 3,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([115.25028711312066, -8.71272587400927]),
            {
              "landcover": 3,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([115.26556497566949, -8.699914780628747]),
            {
              "landcover": 3,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([115.26582246773492, -8.69834517943098]),
            {
              "landcover": 3,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([115.26663785927545, -8.694187825555392]),
            {
              "landcover": 3,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([115.26663785927545, -8.691727329082111]),
            {
              "landcover": 3,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([115.26616579048883, -8.689181970904581]),
            {
              "landcover": 3,
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Point([115.26526456825982, -8.687485055851774]),
            {
              "landcover": 3,
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Point([115.26466375344049, -8.677642797157022]),
            {
              "landcover": 3,
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Point([115.26466375344049, -8.678660973820847]),
            {
              "landcover": 3,
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Point([115.26410585396539, -8.681121556022482]),
            {
              "landcover": 3,
              "system:index": "56"
            }),
        ee.Feature(
            ee.Geometry.Point([115.26449209206353, -8.684430589406022]),
            {
              "landcover": 3,
              "system:index": "57"
            }),
        ee.Feature(
            ee.Geometry.Point([115.26350503914605, -8.674036732598776]),
            {
              "landcover": 3,
              "system:index": "58"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23449426644098, -8.670133658999518]),
            {
              "landcover": 3,
              "system:index": "59"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23286348335992, -8.670388208513796]),
            {
              "landcover": 3,
              "system:index": "60"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23363595955621, -8.670388208513796]),
            {
              "landcover": 3,
              "system:index": "61"
            })]),
    sawah = ui.import && ui.import("sawah", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            115.20943170540582,
            -8.712122931439508
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.21063333504449,
            -8.70915350698005
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.21063333504449,
            -8.704826589138168
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.20814424507867,
            -8.704063010207179
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.20908838265191,
            -8.702111634750342
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.20737176888238,
            -8.700923836013459
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.2058268164898,
            -8.700414778258297
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.20411020272027,
            -8.701432893076454
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.20608430855523,
            -8.70151773585299
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.19947534554254,
            -8.703044902542446
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.19492631905328,
            -8.705335640893251
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.19466882698785,
            -8.70813541316662
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.19655710213434,
            -8.710256438817364
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.19612794869195,
            -8.71356521481145
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.19509798043023,
            -8.715007492618998
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.19466882698785,
            -8.716789122227055
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.19621377938043,
            -8.71415909458261
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.19578462593805,
            -8.715686209661612
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.21046167366754,
            -8.705165957051838
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.20943170540582,
            -8.703299429718266
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23561006539117,
            -8.696511979144333
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.2362108802105,
            -8.698208853321875
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23869997017633,
            -8.69922697413806
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23758417122613,
            -8.700923836013459
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24376398079644,
            -8.701093521778038
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24745470040094,
            -8.700923836013459
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24513727181207,
            -8.698378540316781
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24402147286187,
            -8.697021042204785
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24754053108941,
            -8.695493850947962
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24951463692437,
            -8.693881808978302
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24608140938531,
            -8.693881808978302
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24548059456598,
            -8.694645408670644
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24599557869684,
            -8.689215332606258
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.25011545174371,
            -8.694645408670644
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24814134590875,
            -8.695493850947962
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24410730355035,
            -8.687772955429276
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.2471972083355,
            -8.68437910489269
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24608140938531,
            -8.684548798148876
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24487977974664,
            -8.682936709115722
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.21234994881402,
            -8.698463383785418
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24754053108941,
            -8.677930704287084
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24788385384332,
            -8.67572464706746
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24736886971246,
            -8.678015552382805
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.25844102852594,
            -8.641444248443234
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.25861268990289,
            -8.643056515358118
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.27088647835504,
            -8.64976007751662
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.2684832190777,
            -8.651372308848579
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.25990015023004,
            -8.664482038823563
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.25745397560846,
            -8.66015460564805
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.25590902321588,
            -8.659772770918629
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.25153165810357,
            -8.662742586375304
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24732595436822,
            -8.664100208487636
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24784093849908,
            -8.658584838170972
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.25166040413629,
            -8.663675952104066
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.25661712639581,
            -8.661427385280197
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.25623088829767,
            -8.6627637992585
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.25655275337945,
            -8.6630395666312
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.25711065285455,
            -8.661894070066186
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.25871997826349,
            -8.6620213476346
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.25790458672296,
            -8.662572883266638
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.2573896025921,
            -8.66289107653257
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.26065116875421,
            -8.663188056671206
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.26135927193414,
            -8.662678947718529
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.26077991478692,
            -8.662127412242032
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.2578402137066,
            -8.664142634099667
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.25646692269098,
            -8.664694166620412
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.257732925346,
            -8.664482038823563
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.2587414359356,
            -8.665033570846436
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.25914913170587,
            -8.664206272508727
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.25947099678766,
            -8.66634875932814
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.25893455498468,
            -8.66732454135725
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.257732925346,
            -8.66738817922769
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.25275474541436,
            -8.667006351843481
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.25453573220025,
            -8.666221483224549
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.2540207480694,
            -8.667536667550118
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.2518964385296,
            -8.665054783600386
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.25131708138238,
            -8.66405778287082
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.25129562371026,
            -8.663081992362898
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.25303369515191,
            -8.662975928024679
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.25962120049249,
            -8.66995489768627
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 6
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
            ee.Geometry.Point([115.20943170540582, -8.712122931439508]),
            {
              "landcover": 6,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([115.21063333504449, -8.70915350698005]),
            {
              "landcover": 6,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([115.21063333504449, -8.704826589138168]),
            {
              "landcover": 6,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([115.20814424507867, -8.704063010207179]),
            {
              "landcover": 6,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([115.20908838265191, -8.702111634750342]),
            {
              "landcover": 6,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([115.20737176888238, -8.700923836013459]),
            {
              "landcover": 6,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([115.2058268164898, -8.700414778258297]),
            {
              "landcover": 6,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([115.20411020272027, -8.701432893076454]),
            {
              "landcover": 6,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([115.20608430855523, -8.70151773585299]),
            {
              "landcover": 6,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([115.19947534554254, -8.703044902542446]),
            {
              "landcover": 6,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([115.19492631905328, -8.705335640893251]),
            {
              "landcover": 6,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([115.19466882698785, -8.70813541316662]),
            {
              "landcover": 6,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([115.19655710213434, -8.710256438817364]),
            {
              "landcover": 6,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([115.19612794869195, -8.71356521481145]),
            {
              "landcover": 6,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([115.19509798043023, -8.715007492618998]),
            {
              "landcover": 6,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([115.19466882698785, -8.716789122227055]),
            {
              "landcover": 6,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([115.19621377938043, -8.71415909458261]),
            {
              "landcover": 6,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([115.19578462593805, -8.715686209661612]),
            {
              "landcover": 6,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([115.21046167366754, -8.705165957051838]),
            {
              "landcover": 6,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([115.20943170540582, -8.703299429718266]),
            {
              "landcover": 6,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23561006539117, -8.696511979144333]),
            {
              "landcover": 6,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([115.2362108802105, -8.698208853321875]),
            {
              "landcover": 6,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23869997017633, -8.69922697413806]),
            {
              "landcover": 6,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23758417122613, -8.700923836013459]),
            {
              "landcover": 6,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24376398079644, -8.701093521778038]),
            {
              "landcover": 6,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24745470040094, -8.700923836013459]),
            {
              "landcover": 6,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24513727181207, -8.698378540316781]),
            {
              "landcover": 6,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24402147286187, -8.697021042204785]),
            {
              "landcover": 6,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24754053108941, -8.695493850947962]),
            {
              "landcover": 6,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24951463692437, -8.693881808978302]),
            {
              "landcover": 6,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24608140938531, -8.693881808978302]),
            {
              "landcover": 6,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24548059456598, -8.694645408670644]),
            {
              "landcover": 6,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24599557869684, -8.689215332606258]),
            {
              "landcover": 6,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([115.25011545174371, -8.694645408670644]),
            {
              "landcover": 6,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24814134590875, -8.695493850947962]),
            {
              "landcover": 6,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24410730355035, -8.687772955429276]),
            {
              "landcover": 6,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([115.2471972083355, -8.68437910489269]),
            {
              "landcover": 6,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24608140938531, -8.684548798148876]),
            {
              "landcover": 6,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24487977974664, -8.682936709115722]),
            {
              "landcover": 6,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([115.21234994881402, -8.698463383785418]),
            {
              "landcover": 6,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24754053108941, -8.677930704287084]),
            {
              "landcover": 6,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24788385384332, -8.67572464706746]),
            {
              "landcover": 6,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24736886971246, -8.678015552382805]),
            {
              "landcover": 6,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([115.25844102852594, -8.641444248443234]),
            {
              "landcover": 6,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([115.25861268990289, -8.643056515358118]),
            {
              "landcover": 6,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([115.27088647835504, -8.64976007751662]),
            {
              "landcover": 6,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([115.2684832190777, -8.651372308848579]),
            {
              "landcover": 6,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([115.25990015023004, -8.664482038823563]),
            {
              "landcover": 6,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([115.25745397560846, -8.66015460564805]),
            {
              "landcover": 6,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([115.25590902321588, -8.659772770918629]),
            {
              "landcover": 6,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([115.25153165810357, -8.662742586375304]),
            {
              "landcover": 6,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24732595436822, -8.664100208487636]),
            {
              "landcover": 6,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24784093849908, -8.658584838170972]),
            {
              "landcover": 6,
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Point([115.25166040413629, -8.663675952104066]),
            {
              "landcover": 6,
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Point([115.25661712639581, -8.661427385280197]),
            {
              "landcover": 6,
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Point([115.25623088829767, -8.6627637992585]),
            {
              "landcover": 6,
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Point([115.25655275337945, -8.6630395666312]),
            {
              "landcover": 6,
              "system:index": "56"
            }),
        ee.Feature(
            ee.Geometry.Point([115.25711065285455, -8.661894070066186]),
            {
              "landcover": 6,
              "system:index": "57"
            }),
        ee.Feature(
            ee.Geometry.Point([115.25871997826349, -8.6620213476346]),
            {
              "landcover": 6,
              "system:index": "58"
            }),
        ee.Feature(
            ee.Geometry.Point([115.25790458672296, -8.662572883266638]),
            {
              "landcover": 6,
              "system:index": "59"
            }),
        ee.Feature(
            ee.Geometry.Point([115.2573896025921, -8.66289107653257]),
            {
              "landcover": 6,
              "system:index": "60"
            }),
        ee.Feature(
            ee.Geometry.Point([115.26065116875421, -8.663188056671206]),
            {
              "landcover": 6,
              "system:index": "61"
            }),
        ee.Feature(
            ee.Geometry.Point([115.26135927193414, -8.662678947718529]),
            {
              "landcover": 6,
              "system:index": "62"
            }),
        ee.Feature(
            ee.Geometry.Point([115.26077991478692, -8.662127412242032]),
            {
              "landcover": 6,
              "system:index": "63"
            }),
        ee.Feature(
            ee.Geometry.Point([115.2578402137066, -8.664142634099667]),
            {
              "landcover": 6,
              "system:index": "64"
            }),
        ee.Feature(
            ee.Geometry.Point([115.25646692269098, -8.664694166620412]),
            {
              "landcover": 6,
              "system:index": "65"
            }),
        ee.Feature(
            ee.Geometry.Point([115.257732925346, -8.664482038823563]),
            {
              "landcover": 6,
              "system:index": "66"
            }),
        ee.Feature(
            ee.Geometry.Point([115.2587414359356, -8.665033570846436]),
            {
              "landcover": 6,
              "system:index": "67"
            }),
        ee.Feature(
            ee.Geometry.Point([115.25914913170587, -8.664206272508727]),
            {
              "landcover": 6,
              "system:index": "68"
            }),
        ee.Feature(
            ee.Geometry.Point([115.25947099678766, -8.66634875932814]),
            {
              "landcover": 6,
              "system:index": "69"
            }),
        ee.Feature(
            ee.Geometry.Point([115.25893455498468, -8.66732454135725]),
            {
              "landcover": 6,
              "system:index": "70"
            }),
        ee.Feature(
            ee.Geometry.Point([115.257732925346, -8.66738817922769]),
            {
              "landcover": 6,
              "system:index": "71"
            }),
        ee.Feature(
            ee.Geometry.Point([115.25275474541436, -8.667006351843481]),
            {
              "landcover": 6,
              "system:index": "72"
            }),
        ee.Feature(
            ee.Geometry.Point([115.25453573220025, -8.666221483224549]),
            {
              "landcover": 6,
              "system:index": "73"
            }),
        ee.Feature(
            ee.Geometry.Point([115.2540207480694, -8.667536667550118]),
            {
              "landcover": 6,
              "system:index": "74"
            }),
        ee.Feature(
            ee.Geometry.Point([115.2518964385296, -8.665054783600386]),
            {
              "landcover": 6,
              "system:index": "75"
            }),
        ee.Feature(
            ee.Geometry.Point([115.25131708138238, -8.66405778287082]),
            {
              "landcover": 6,
              "system:index": "76"
            }),
        ee.Feature(
            ee.Geometry.Point([115.25129562371026, -8.663081992362898]),
            {
              "landcover": 6,
              "system:index": "77"
            }),
        ee.Feature(
            ee.Geometry.Point([115.25303369515191, -8.662975928024679]),
            {
              "landcover": 6,
              "system:index": "78"
            }),
        ee.Feature(
            ee.Geometry.Point([115.25962120049249, -8.66995489768627]),
            {
              "landcover": 6,
              "system:index": "79"
            })]),
    hutan = ui.import && ui.import("hutan", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            115.23655389678697,
            -8.727193033033748
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23509477508287,
            -8.72914427754275
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.22771333587389,
            -8.733640584737087
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.22767042052965,
            -8.730416822812774
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.22621129882555,
            -8.730459240913698
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23844217193346,
            -8.733301242688642
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23694013488512,
            -8.733555749253917
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.2359101666234,
            -8.735040367423169
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23715471160631,
            -8.734488938507365
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23552392852525,
            -8.735337290347786
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23616765868883,
            -8.737246074931697
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23505185973863,
            -8.737330909575288
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23530935180406,
            -8.73775508250362
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23728345763902,
            -8.73792475153983
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23741220367174,
            -8.738391340991175
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.2373692883275,
            -8.738773095562411
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23874257934312,
            -8.737500578804545
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23947214019518,
            -8.737373326889838
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23977254760484,
            -8.73792475153983
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24015878570299,
            -8.737118822930135
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24080251586656,
            -8.736270475143039
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24170373809557,
            -8.735379707889148
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24281953704576,
            -8.735761465544236
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.2452227963231,
            -8.734785861871039
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24638151061754,
            -8.733216407128287
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24608110320787,
            -8.730968257748604
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.2480122936986,
            -8.729398786943948
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24938558471422,
            -8.729992641538322
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24917100799303,
            -8.730459240913698
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24741147887926,
            -8.731053093820226
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24363492858629,
            -8.727786891138182
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.2423045529149,
            -8.726514336900266
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24123166930895,
            -8.726132569782887
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.2397296322606,
            -8.725920476771181
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23925756347398,
            -8.725793220906326
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.2377126110814,
            -8.728338329960485
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23818467986803,
            -8.728974604512194
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24359201324205,
            -8.72566596499809
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24243329894762,
            -8.724817591167923
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24131749999742,
            -8.724054053072507
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.2411887539647,
            -8.723375351232448
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24131749999742,
            -8.739112432630845
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24161790740709,
            -8.737542996099796
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.243763674619,
            -8.735888718009079
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24015878570299,
            -8.740172858978429
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.2223489178441,
            -8.73707640558663
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.25040880775067,
            -8.709238234309918
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24852053260419,
            -8.709407916304308
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.25255457496259,
            -8.711401673971684
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.25186792945478,
            -8.711401673971684
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.26238218879315,
            -8.701178250932871
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.26195303535077,
            -8.700202556957137
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.26294008826825,
            -8.69939654697249
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.26401297187421,
            -8.703299316020304
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.26324049567792,
            -8.704529528263645
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.26143805121991,
            -8.703681106459596
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.2598501834831,
            -8.703553843023101
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.25624529456708,
            -8.708983711174003
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.2558161411247,
            -8.70915339328386
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.2521254215202,
            -8.711571354984464
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.2486492786369,
            -8.712971220401814
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.2493010108601,
            -8.675985180009327
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.26075940777172,
            -8.676451846716803
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.26110273052562,
            -8.679506378113794
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.260630661739,
            -8.679845768956909
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.261531883968,
            -8.679888192790731
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.22614197947736,
            -8.670781836893022
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 5
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
            ee.Geometry.Point([115.23655389678697, -8.727193033033748]),
            {
              "landcover": 5,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23509477508287, -8.72914427754275]),
            {
              "landcover": 5,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([115.22771333587389, -8.733640584737087]),
            {
              "landcover": 5,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([115.22767042052965, -8.730416822812774]),
            {
              "landcover": 5,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([115.22621129882555, -8.730459240913698]),
            {
              "landcover": 5,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23844217193346, -8.733301242688642]),
            {
              "landcover": 5,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23694013488512, -8.733555749253917]),
            {
              "landcover": 5,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([115.2359101666234, -8.735040367423169]),
            {
              "landcover": 5,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23715471160631, -8.734488938507365]),
            {
              "landcover": 5,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23552392852525, -8.735337290347786]),
            {
              "landcover": 5,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23616765868883, -8.737246074931697]),
            {
              "landcover": 5,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23505185973863, -8.737330909575288]),
            {
              "landcover": 5,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23530935180406, -8.73775508250362]),
            {
              "landcover": 5,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23728345763902, -8.73792475153983]),
            {
              "landcover": 5,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23741220367174, -8.738391340991175]),
            {
              "landcover": 5,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([115.2373692883275, -8.738773095562411]),
            {
              "landcover": 5,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23874257934312, -8.737500578804545]),
            {
              "landcover": 5,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23947214019518, -8.737373326889838]),
            {
              "landcover": 5,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23977254760484, -8.73792475153983]),
            {
              "landcover": 5,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24015878570299, -8.737118822930135]),
            {
              "landcover": 5,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24080251586656, -8.736270475143039]),
            {
              "landcover": 5,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24170373809557, -8.735379707889148]),
            {
              "landcover": 5,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24281953704576, -8.735761465544236]),
            {
              "landcover": 5,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([115.2452227963231, -8.734785861871039]),
            {
              "landcover": 5,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24638151061754, -8.733216407128287]),
            {
              "landcover": 5,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24608110320787, -8.730968257748604]),
            {
              "landcover": 5,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([115.2480122936986, -8.729398786943948]),
            {
              "landcover": 5,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24938558471422, -8.729992641538322]),
            {
              "landcover": 5,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24917100799303, -8.730459240913698]),
            {
              "landcover": 5,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24741147887926, -8.731053093820226]),
            {
              "landcover": 5,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24363492858629, -8.727786891138182]),
            {
              "landcover": 5,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([115.2423045529149, -8.726514336900266]),
            {
              "landcover": 5,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24123166930895, -8.726132569782887]),
            {
              "landcover": 5,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([115.2397296322606, -8.725920476771181]),
            {
              "landcover": 5,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23925756347398, -8.725793220906326]),
            {
              "landcover": 5,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([115.2377126110814, -8.728338329960485]),
            {
              "landcover": 5,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23818467986803, -8.728974604512194]),
            {
              "landcover": 5,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24359201324205, -8.72566596499809]),
            {
              "landcover": 5,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24243329894762, -8.724817591167923]),
            {
              "landcover": 5,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24131749999742, -8.724054053072507]),
            {
              "landcover": 5,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([115.2411887539647, -8.723375351232448]),
            {
              "landcover": 5,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24131749999742, -8.739112432630845]),
            {
              "landcover": 5,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24161790740709, -8.737542996099796]),
            {
              "landcover": 5,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([115.243763674619, -8.735888718009079]),
            {
              "landcover": 5,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24015878570299, -8.740172858978429]),
            {
              "landcover": 5,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([115.2223489178441, -8.73707640558663]),
            {
              "landcover": 5,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([115.25040880775067, -8.709238234309918]),
            {
              "landcover": 5,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24852053260419, -8.709407916304308]),
            {
              "landcover": 5,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([115.25255457496259, -8.711401673971684]),
            {
              "landcover": 5,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([115.25186792945478, -8.711401673971684]),
            {
              "landcover": 5,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([115.26238218879315, -8.701178250932871]),
            {
              "landcover": 5,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([115.26195303535077, -8.700202556957137]),
            {
              "landcover": 5,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([115.26294008826825, -8.69939654697249]),
            {
              "landcover": 5,
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Point([115.26401297187421, -8.703299316020304]),
            {
              "landcover": 5,
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Point([115.26324049567792, -8.704529528263645]),
            {
              "landcover": 5,
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Point([115.26143805121991, -8.703681106459596]),
            {
              "landcover": 5,
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Point([115.2598501834831, -8.703553843023101]),
            {
              "landcover": 5,
              "system:index": "56"
            }),
        ee.Feature(
            ee.Geometry.Point([115.25624529456708, -8.708983711174003]),
            {
              "landcover": 5,
              "system:index": "57"
            }),
        ee.Feature(
            ee.Geometry.Point([115.2558161411247, -8.70915339328386]),
            {
              "landcover": 5,
              "system:index": "58"
            }),
        ee.Feature(
            ee.Geometry.Point([115.2521254215202, -8.711571354984464]),
            {
              "landcover": 5,
              "system:index": "59"
            }),
        ee.Feature(
            ee.Geometry.Point([115.2486492786369, -8.712971220401814]),
            {
              "landcover": 5,
              "system:index": "60"
            }),
        ee.Feature(
            ee.Geometry.Point([115.2493010108601, -8.675985180009327]),
            {
              "landcover": 5,
              "system:index": "61"
            }),
        ee.Feature(
            ee.Geometry.Point([115.26075940777172, -8.676451846716803]),
            {
              "landcover": 5,
              "system:index": "62"
            }),
        ee.Feature(
            ee.Geometry.Point([115.26110273052562, -8.679506378113794]),
            {
              "landcover": 5,
              "system:index": "63"
            }),
        ee.Feature(
            ee.Geometry.Point([115.260630661739, -8.679845768956909]),
            {
              "landcover": 5,
              "system:index": "64"
            }),
        ee.Feature(
            ee.Geometry.Point([115.261531883968, -8.679888192790731]),
            {
              "landcover": 5,
              "system:index": "65"
            }),
        ee.Feature(
            ee.Geometry.Point([115.22614197947736, -8.670781836893022]),
            {
              "landcover": 5,
              "system:index": "66"
            })]),
    vegetasi = ui.import && ui.import("vegetasi", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            115.19533761417553,
            -8.71660379842054
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.19645341312572,
            -8.71380408954957
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.195423444864,
            -8.717452190907432
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.19645341312572,
            -8.715416045703206
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.19405015384838,
            -8.716349280298894
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.19439347660229,
            -8.708713656068896
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.19628175174877,
            -8.710664997093406
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.21035798465893,
            -8.712192126445085
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.21035798465893,
            -8.713634409550076
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.20855554020092,
            -8.71227696678174
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.20984300052807,
            -8.709137861505475
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.21078713810131,
            -8.707610719682359
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.20992883121654,
            -8.704471575247029
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.20881303226635,
            -8.701671775561628
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.2086413708894,
            -8.703453468693722
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.2075255719392,
            -8.701077875966465
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.20426400577709,
            -8.701502090059153
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.20246156131908,
            -8.70201114633585
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.20040162479565,
            -8.702774729452909
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.20829804813549,
            -8.704556417334784
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.20778306400463,
            -8.705913888122863
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.20967133915111,
            -8.704810943482647
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.20881303226635,
            -8.713125369089537
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.21670945560619,
            -8.713719249559453
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.19980080997631,
            -8.703368626355923
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.1950801221101,
            -8.705404837154422
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.19259103214428,
            -8.708459132576035
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.19147523319408,
            -8.717537030050172
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.19430764591381,
            -8.717112834143819
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.2049506512849,
            -8.714567648594127
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.2486189301527,
            -8.729074973939372
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24707397776012,
            -8.729244646924306
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24844726877575,
            -8.72992333809251
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24630150156383,
            -8.731789732439433
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.2460440094984,
            -8.730941372530111
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24518570261364,
            -8.734419635896895
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24372658090954,
            -8.735776998167426
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24149498300915,
            -8.735946668103821
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23866257028942,
            -8.73772819777441
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23686012583141,
            -8.738237204688023
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23591598825817,
            -8.735013482498202
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23814758615856,
            -8.734080294557293
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.2358301575697,
            -8.735098317649767
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23634514170055,
            -8.732044240036023
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23625931101208,
            -8.727208566013681
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23883423166637,
            -8.729159810441477
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24140915232067,
            -8.723730235431345
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24063667612438,
            -8.722627343358381
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23076614694958,
            -8.729159810441477
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.22784790354137,
            -8.73357128196896
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.22570213632946,
            -8.739340050616455
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.22492966013317,
            -8.739424884783473
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.22492966013317,
            -8.7413760652954
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.22141060190563,
            -8.742903069004278
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23531517343883,
            -8.735437658062999
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23720344858532,
            -8.73416512992114
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23986419992809,
            -8.737388859445865
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23806175547008,
            -8.738237204688023
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23952087717419,
            -8.740188391417794
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.20784935312633,
            -8.706253255050408
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.20192703562145,
            -8.702774729452909
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.19909462290173,
            -8.703368626355923
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.20956596689587,
            -8.709477225508335
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.21068176584606,
            -8.708713656068896
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.21111091928844,
            -8.713549569521462
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.20896515207653,
            -8.71380408954957
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.2130850251234,
            -8.698023520310885
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.21257004099255,
            -8.6992113282485
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.21231254892712,
            -8.699805230804442
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23308357553844,
            -8.704004943420555
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23338398294811,
            -8.703326205179811
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23256859140758,
            -8.706041150756754
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23351272898083,
            -8.705998729883607
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.2352722580946,
            -8.704344312079327
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.2185781891859,
            -8.708671235498782
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.21759113626842,
            -8.713846509537401
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.22183975534801,
            -8.712913268693079
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.25050720529919,
            -8.709646907394305
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24986347513561,
            -8.709774168758262
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24939140634899,
            -8.7098590096435
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.25316795664196,
            -8.70956206646095
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.25218090372448,
            -8.710664997093406
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.25316795664196,
            -8.710792258110924
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.2566870148695,
            -8.708756076634202
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.26209434824352,
            -8.70162935419322
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.262180178932,
            -8.700950611644936
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.26213726358776,
            -8.700187024807253
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.26278099375133,
            -8.699126484949323
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.26535591440563,
            -8.695520626967657
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.2662142212904,
            -8.695478204902454
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.26587089853649,
            -8.693272250892997
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.26492676096325,
            -8.69276318273881
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.26484093027477,
            -8.694332807326312
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.26209434824352,
            -8.681132572880191
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.26248058634167,
            -8.67977501232093
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.263081401161,
            -8.676975028160026
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.26175102548962,
            -8.674471994338543
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.26299557047253,
            -8.674514418779596
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.26089271860485,
            -8.67646593788704
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.25561413126354,
            -8.687708187317943
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23767888379464,
            -8.700805211428754
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23862302136789,
            -8.699447722113536
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23836552930246,
            -8.700974897247098
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24394452405343,
            -8.700805211428754
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24454533887277,
            -8.698344758421237
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24377286267648,
            -8.696817572561535
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.2433437092341,
            -8.69732663520666
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24651944470773,
            -8.69732663520666
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24566113782296,
            -8.696053977296616
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24566113782296,
            -8.697920540751522
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24806439710031,
            -8.696732728720086
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24866521191964,
            -8.693254114676003
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.25038182568917,
            -8.692235977626801
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.25021016431222,
            -8.694187404540981
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24909436536203,
            -8.694187404540981
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24754941296945,
            -8.697241791480522
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24995267224679,
            -8.695544912921946
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24815022778878,
            -8.694017715647524
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24806439710031,
            -8.70038099654645
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24506032300363,
            -8.691132992702174
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24600446057687,
            -8.692151132747842
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24574696851144,
            -8.685363480212683
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24686276746164,
            -8.68298777280003
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.2448028309382,
            -8.68298777280003
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24763524365792,
            -8.67662419669758
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24789273572335,
            -8.674672678412627
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24857938123117,
            -8.676030257423673
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24746358228097,
            -8.677218135031923
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.25819241834054,
            -8.667884709757162
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.2517551167048,
            -8.66593314607426
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.25166928601632,
            -8.661945136611084
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.25244176221261,
            -8.663302761602353
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.25278508496652,
            -8.66618769843358
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.25106847119699,
            -8.662963355814027
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.2572482807673,
            -8.662963355814027
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.2601665241755,
            -8.664745232785055
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.25913655591378,
            -8.668139260794838
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.25750577283273,
            -8.668308961390853
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.25707661939035,
            -8.66406642350605
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.25939404797921,
            -8.659908689935591
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.25767743420968,
            -8.659060167233699
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.27158200574289,
            -8.649386873215192
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.26840627026925,
            -8.65201735496519
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.26591718030343,
            -8.65609032270776
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.25604665112863,
            -8.65609032270776
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.25518834424386,
            -8.654478111579067
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.25227010083566,
            -8.652187062834217
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.2517551167048,
            -8.651338522724206
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24935185742746,
            -8.648962600244586
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24729192090402,
            -8.647010938424891
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.2459186298884,
            -8.642089311557202
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24488866162667,
            -8.642089311557202
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24342953992257,
            -8.639373903709002
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.2396529896296,
            -8.63708276312767
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24445950818429,
            -8.636319046507797
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.27192532849679,
            -8.650150563357967
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.26729047131906,
            -8.652271916740036
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.26454388928781,
            -8.65566605729078
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.26540219617257,
            -8.645398688426562
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.26059567761789,
            -8.646077531371942
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.25956570935617,
            -8.64752006857001
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.25819241834054,
            -8.645483543861618
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.25844991040597,
            -8.64124074870545
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.25793492627511,
            -8.642004455357986
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.25681912732492,
            -8.642598448351436
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.26111066174875,
            -8.642853016490673
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.25922238660226,
            -8.642937872498889
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.25681912732492,
            -8.643277296340704
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.26995122266183,
            -8.641665030370076
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.25475919080148,
            -8.632924731714626
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.25355756116281,
            -8.634537035048796
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.2667754871882,
            -8.645483543861618
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.26008069348703,
            -8.64336215225339
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.26102483106027,
            -8.646841228223613
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.27166783643136,
            -8.65082939774039
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.27020871472726,
            -8.649302018659306
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.26780545544992,
            -8.652187062834217
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24806439710031,
            -8.664527768570716
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24789273572335,
            -8.665376278936815
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.25038182568917,
            -8.670806699923245
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.22961079907785,
            -8.65986092733344
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.22549092603097,
            -8.67012790159134
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.22592007947335,
            -8.671061248981548
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.22549092603097,
            -8.670721850198825
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23458897900949,
            -8.66910970179417
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23287236523996,
            -8.668855151413801
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.26368558240304,
            -8.703314648157523
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.26325642896066,
            -8.704078228615382
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 4
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
            ee.Geometry.Point([115.19533761417553, -8.71660379842054]),
            {
              "landcover": 4,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([115.19645341312572, -8.71380408954957]),
            {
              "landcover": 4,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([115.195423444864, -8.717452190907432]),
            {
              "landcover": 4,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([115.19645341312572, -8.715416045703206]),
            {
              "landcover": 4,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([115.19405015384838, -8.716349280298894]),
            {
              "landcover": 4,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([115.19439347660229, -8.708713656068896]),
            {
              "landcover": 4,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([115.19628175174877, -8.710664997093406]),
            {
              "landcover": 4,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([115.21035798465893, -8.712192126445085]),
            {
              "landcover": 4,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([115.21035798465893, -8.713634409550076]),
            {
              "landcover": 4,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([115.20855554020092, -8.71227696678174]),
            {
              "landcover": 4,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([115.20984300052807, -8.709137861505475]),
            {
              "landcover": 4,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([115.21078713810131, -8.707610719682359]),
            {
              "landcover": 4,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([115.20992883121654, -8.704471575247029]),
            {
              "landcover": 4,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([115.20881303226635, -8.701671775561628]),
            {
              "landcover": 4,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([115.2086413708894, -8.703453468693722]),
            {
              "landcover": 4,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([115.2075255719392, -8.701077875966465]),
            {
              "landcover": 4,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([115.20426400577709, -8.701502090059153]),
            {
              "landcover": 4,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([115.20246156131908, -8.70201114633585]),
            {
              "landcover": 4,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([115.20040162479565, -8.702774729452909]),
            {
              "landcover": 4,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([115.20829804813549, -8.704556417334784]),
            {
              "landcover": 4,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([115.20778306400463, -8.705913888122863]),
            {
              "landcover": 4,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([115.20967133915111, -8.704810943482647]),
            {
              "landcover": 4,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([115.20881303226635, -8.713125369089537]),
            {
              "landcover": 4,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([115.21670945560619, -8.713719249559453]),
            {
              "landcover": 4,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([115.19980080997631, -8.703368626355923]),
            {
              "landcover": 4,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([115.1950801221101, -8.705404837154422]),
            {
              "landcover": 4,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([115.19259103214428, -8.708459132576035]),
            {
              "landcover": 4,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([115.19147523319408, -8.717537030050172]),
            {
              "landcover": 4,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([115.19430764591381, -8.717112834143819]),
            {
              "landcover": 4,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([115.2049506512849, -8.714567648594127]),
            {
              "landcover": 4,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([115.2486189301527, -8.729074973939372]),
            {
              "landcover": 4,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24707397776012, -8.729244646924306]),
            {
              "landcover": 4,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24844726877575, -8.72992333809251]),
            {
              "landcover": 4,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24630150156383, -8.731789732439433]),
            {
              "landcover": 4,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([115.2460440094984, -8.730941372530111]),
            {
              "landcover": 4,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24518570261364, -8.734419635896895]),
            {
              "landcover": 4,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24372658090954, -8.735776998167426]),
            {
              "landcover": 4,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24149498300915, -8.735946668103821]),
            {
              "landcover": 4,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23866257028942, -8.73772819777441]),
            {
              "landcover": 4,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23686012583141, -8.738237204688023]),
            {
              "landcover": 4,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23591598825817, -8.735013482498202]),
            {
              "landcover": 4,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23814758615856, -8.734080294557293]),
            {
              "landcover": 4,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([115.2358301575697, -8.735098317649767]),
            {
              "landcover": 4,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23634514170055, -8.732044240036023]),
            {
              "landcover": 4,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23625931101208, -8.727208566013681]),
            {
              "landcover": 4,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23883423166637, -8.729159810441477]),
            {
              "landcover": 4,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24140915232067, -8.723730235431345]),
            {
              "landcover": 4,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24063667612438, -8.722627343358381]),
            {
              "landcover": 4,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23076614694958, -8.729159810441477]),
            {
              "landcover": 4,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([115.22784790354137, -8.73357128196896]),
            {
              "landcover": 4,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([115.22570213632946, -8.739340050616455]),
            {
              "landcover": 4,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([115.22492966013317, -8.739424884783473]),
            {
              "landcover": 4,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([115.22492966013317, -8.7413760652954]),
            {
              "landcover": 4,
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Point([115.22141060190563, -8.742903069004278]),
            {
              "landcover": 4,
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23531517343883, -8.735437658062999]),
            {
              "landcover": 4,
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23720344858532, -8.73416512992114]),
            {
              "landcover": 4,
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23986419992809, -8.737388859445865]),
            {
              "landcover": 4,
              "system:index": "56"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23806175547008, -8.738237204688023]),
            {
              "landcover": 4,
              "system:index": "57"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23952087717419, -8.740188391417794]),
            {
              "landcover": 4,
              "system:index": "58"
            }),
        ee.Feature(
            ee.Geometry.Point([115.20784935312633, -8.706253255050408]),
            {
              "landcover": 4,
              "system:index": "59"
            }),
        ee.Feature(
            ee.Geometry.Point([115.20192703562145, -8.702774729452909]),
            {
              "landcover": 4,
              "system:index": "60"
            }),
        ee.Feature(
            ee.Geometry.Point([115.19909462290173, -8.703368626355923]),
            {
              "landcover": 4,
              "system:index": "61"
            }),
        ee.Feature(
            ee.Geometry.Point([115.20956596689587, -8.709477225508335]),
            {
              "landcover": 4,
              "system:index": "62"
            }),
        ee.Feature(
            ee.Geometry.Point([115.21068176584606, -8.708713656068896]),
            {
              "landcover": 4,
              "system:index": "63"
            }),
        ee.Feature(
            ee.Geometry.Point([115.21111091928844, -8.713549569521462]),
            {
              "landcover": 4,
              "system:index": "64"
            }),
        ee.Feature(
            ee.Geometry.Point([115.20896515207653, -8.71380408954957]),
            {
              "landcover": 4,
              "system:index": "65"
            }),
        ee.Feature(
            ee.Geometry.Point([115.2130850251234, -8.698023520310885]),
            {
              "landcover": 4,
              "system:index": "66"
            }),
        ee.Feature(
            ee.Geometry.Point([115.21257004099255, -8.6992113282485]),
            {
              "landcover": 4,
              "system:index": "67"
            }),
        ee.Feature(
            ee.Geometry.Point([115.21231254892712, -8.699805230804442]),
            {
              "landcover": 4,
              "system:index": "68"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23308357553844, -8.704004943420555]),
            {
              "landcover": 4,
              "system:index": "69"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23338398294811, -8.703326205179811]),
            {
              "landcover": 4,
              "system:index": "70"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23256859140758, -8.706041150756754]),
            {
              "landcover": 4,
              "system:index": "71"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23351272898083, -8.705998729883607]),
            {
              "landcover": 4,
              "system:index": "72"
            }),
        ee.Feature(
            ee.Geometry.Point([115.2352722580946, -8.704344312079327]),
            {
              "landcover": 4,
              "system:index": "73"
            }),
        ee.Feature(
            ee.Geometry.Point([115.2185781891859, -8.708671235498782]),
            {
              "landcover": 4,
              "system:index": "74"
            }),
        ee.Feature(
            ee.Geometry.Point([115.21759113626842, -8.713846509537401]),
            {
              "landcover": 4,
              "system:index": "75"
            }),
        ee.Feature(
            ee.Geometry.Point([115.22183975534801, -8.712913268693079]),
            {
              "landcover": 4,
              "system:index": "76"
            }),
        ee.Feature(
            ee.Geometry.Point([115.25050720529919, -8.709646907394305]),
            {
              "landcover": 4,
              "system:index": "77"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24986347513561, -8.709774168758262]),
            {
              "landcover": 4,
              "system:index": "78"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24939140634899, -8.7098590096435]),
            {
              "landcover": 4,
              "system:index": "79"
            }),
        ee.Feature(
            ee.Geometry.Point([115.25316795664196, -8.70956206646095]),
            {
              "landcover": 4,
              "system:index": "80"
            }),
        ee.Feature(
            ee.Geometry.Point([115.25218090372448, -8.710664997093406]),
            {
              "landcover": 4,
              "system:index": "81"
            }),
        ee.Feature(
            ee.Geometry.Point([115.25316795664196, -8.710792258110924]),
            {
              "landcover": 4,
              "system:index": "82"
            }),
        ee.Feature(
            ee.Geometry.Point([115.2566870148695, -8.708756076634202]),
            {
              "landcover": 4,
              "system:index": "83"
            }),
        ee.Feature(
            ee.Geometry.Point([115.26209434824352, -8.70162935419322]),
            {
              "landcover": 4,
              "system:index": "84"
            }),
        ee.Feature(
            ee.Geometry.Point([115.262180178932, -8.700950611644936]),
            {
              "landcover": 4,
              "system:index": "85"
            }),
        ee.Feature(
            ee.Geometry.Point([115.26213726358776, -8.700187024807253]),
            {
              "landcover": 4,
              "system:index": "86"
            }),
        ee.Feature(
            ee.Geometry.Point([115.26278099375133, -8.699126484949323]),
            {
              "landcover": 4,
              "system:index": "87"
            }),
        ee.Feature(
            ee.Geometry.Point([115.26535591440563, -8.695520626967657]),
            {
              "landcover": 4,
              "system:index": "88"
            }),
        ee.Feature(
            ee.Geometry.Point([115.2662142212904, -8.695478204902454]),
            {
              "landcover": 4,
              "system:index": "89"
            }),
        ee.Feature(
            ee.Geometry.Point([115.26587089853649, -8.693272250892997]),
            {
              "landcover": 4,
              "system:index": "90"
            }),
        ee.Feature(
            ee.Geometry.Point([115.26492676096325, -8.69276318273881]),
            {
              "landcover": 4,
              "system:index": "91"
            }),
        ee.Feature(
            ee.Geometry.Point([115.26484093027477, -8.694332807326312]),
            {
              "landcover": 4,
              "system:index": "92"
            }),
        ee.Feature(
            ee.Geometry.Point([115.26209434824352, -8.681132572880191]),
            {
              "landcover": 4,
              "system:index": "93"
            }),
        ee.Feature(
            ee.Geometry.Point([115.26248058634167, -8.67977501232093]),
            {
              "landcover": 4,
              "system:index": "94"
            }),
        ee.Feature(
            ee.Geometry.Point([115.263081401161, -8.676975028160026]),
            {
              "landcover": 4,
              "system:index": "95"
            }),
        ee.Feature(
            ee.Geometry.Point([115.26175102548962, -8.674471994338543]),
            {
              "landcover": 4,
              "system:index": "96"
            }),
        ee.Feature(
            ee.Geometry.Point([115.26299557047253, -8.674514418779596]),
            {
              "landcover": 4,
              "system:index": "97"
            }),
        ee.Feature(
            ee.Geometry.Point([115.26089271860485, -8.67646593788704]),
            {
              "landcover": 4,
              "system:index": "98"
            }),
        ee.Feature(
            ee.Geometry.Point([115.25561413126354, -8.687708187317943]),
            {
              "landcover": 4,
              "system:index": "99"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23767888379464, -8.700805211428754]),
            {
              "landcover": 4,
              "system:index": "100"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23862302136789, -8.699447722113536]),
            {
              "landcover": 4,
              "system:index": "101"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23836552930246, -8.700974897247098]),
            {
              "landcover": 4,
              "system:index": "102"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24394452405343, -8.700805211428754]),
            {
              "landcover": 4,
              "system:index": "103"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24454533887277, -8.698344758421237]),
            {
              "landcover": 4,
              "system:index": "104"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24377286267648, -8.696817572561535]),
            {
              "landcover": 4,
              "system:index": "105"
            }),
        ee.Feature(
            ee.Geometry.Point([115.2433437092341, -8.69732663520666]),
            {
              "landcover": 4,
              "system:index": "106"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24651944470773, -8.69732663520666]),
            {
              "landcover": 4,
              "system:index": "107"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24566113782296, -8.696053977296616]),
            {
              "landcover": 4,
              "system:index": "108"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24566113782296, -8.697920540751522]),
            {
              "landcover": 4,
              "system:index": "109"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24806439710031, -8.696732728720086]),
            {
              "landcover": 4,
              "system:index": "110"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24866521191964, -8.693254114676003]),
            {
              "landcover": 4,
              "system:index": "111"
            }),
        ee.Feature(
            ee.Geometry.Point([115.25038182568917, -8.692235977626801]),
            {
              "landcover": 4,
              "system:index": "112"
            }),
        ee.Feature(
            ee.Geometry.Point([115.25021016431222, -8.694187404540981]),
            {
              "landcover": 4,
              "system:index": "113"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24909436536203, -8.694187404540981]),
            {
              "landcover": 4,
              "system:index": "114"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24754941296945, -8.697241791480522]),
            {
              "landcover": 4,
              "system:index": "115"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24995267224679, -8.695544912921946]),
            {
              "landcover": 4,
              "system:index": "116"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24815022778878, -8.694017715647524]),
            {
              "landcover": 4,
              "system:index": "117"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24806439710031, -8.70038099654645]),
            {
              "landcover": 4,
              "system:index": "118"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24506032300363, -8.691132992702174]),
            {
              "landcover": 4,
              "system:index": "119"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24600446057687, -8.692151132747842]),
            {
              "landcover": 4,
              "system:index": "120"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24574696851144, -8.685363480212683]),
            {
              "landcover": 4,
              "system:index": "121"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24686276746164, -8.68298777280003]),
            {
              "landcover": 4,
              "system:index": "122"
            }),
        ee.Feature(
            ee.Geometry.Point([115.2448028309382, -8.68298777280003]),
            {
              "landcover": 4,
              "system:index": "123"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24763524365792, -8.67662419669758]),
            {
              "landcover": 4,
              "system:index": "124"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24789273572335, -8.674672678412627]),
            {
              "landcover": 4,
              "system:index": "125"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24857938123117, -8.676030257423673]),
            {
              "landcover": 4,
              "system:index": "126"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24746358228097, -8.677218135031923]),
            {
              "landcover": 4,
              "system:index": "127"
            }),
        ee.Feature(
            ee.Geometry.Point([115.25819241834054, -8.667884709757162]),
            {
              "landcover": 4,
              "system:index": "128"
            }),
        ee.Feature(
            ee.Geometry.Point([115.2517551167048, -8.66593314607426]),
            {
              "landcover": 4,
              "system:index": "129"
            }),
        ee.Feature(
            ee.Geometry.Point([115.25166928601632, -8.661945136611084]),
            {
              "landcover": 4,
              "system:index": "130"
            }),
        ee.Feature(
            ee.Geometry.Point([115.25244176221261, -8.663302761602353]),
            {
              "landcover": 4,
              "system:index": "131"
            }),
        ee.Feature(
            ee.Geometry.Point([115.25278508496652, -8.66618769843358]),
            {
              "landcover": 4,
              "system:index": "132"
            }),
        ee.Feature(
            ee.Geometry.Point([115.25106847119699, -8.662963355814027]),
            {
              "landcover": 4,
              "system:index": "133"
            }),
        ee.Feature(
            ee.Geometry.Point([115.2572482807673, -8.662963355814027]),
            {
              "landcover": 4,
              "system:index": "134"
            }),
        ee.Feature(
            ee.Geometry.Point([115.2601665241755, -8.664745232785055]),
            {
              "landcover": 4,
              "system:index": "135"
            }),
        ee.Feature(
            ee.Geometry.Point([115.25913655591378, -8.668139260794838]),
            {
              "landcover": 4,
              "system:index": "136"
            }),
        ee.Feature(
            ee.Geometry.Point([115.25750577283273, -8.668308961390853]),
            {
              "landcover": 4,
              "system:index": "137"
            }),
        ee.Feature(
            ee.Geometry.Point([115.25707661939035, -8.66406642350605]),
            {
              "landcover": 4,
              "system:index": "138"
            }),
        ee.Feature(
            ee.Geometry.Point([115.25939404797921, -8.659908689935591]),
            {
              "landcover": 4,
              "system:index": "139"
            }),
        ee.Feature(
            ee.Geometry.Point([115.25767743420968, -8.659060167233699]),
            {
              "landcover": 4,
              "system:index": "140"
            }),
        ee.Feature(
            ee.Geometry.Point([115.27158200574289, -8.649386873215192]),
            {
              "landcover": 4,
              "system:index": "141"
            }),
        ee.Feature(
            ee.Geometry.Point([115.26840627026925, -8.65201735496519]),
            {
              "landcover": 4,
              "system:index": "142"
            }),
        ee.Feature(
            ee.Geometry.Point([115.26591718030343, -8.65609032270776]),
            {
              "landcover": 4,
              "system:index": "143"
            }),
        ee.Feature(
            ee.Geometry.Point([115.25604665112863, -8.65609032270776]),
            {
              "landcover": 4,
              "system:index": "144"
            }),
        ee.Feature(
            ee.Geometry.Point([115.25518834424386, -8.654478111579067]),
            {
              "landcover": 4,
              "system:index": "145"
            }),
        ee.Feature(
            ee.Geometry.Point([115.25227010083566, -8.652187062834217]),
            {
              "landcover": 4,
              "system:index": "146"
            }),
        ee.Feature(
            ee.Geometry.Point([115.2517551167048, -8.651338522724206]),
            {
              "landcover": 4,
              "system:index": "147"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24935185742746, -8.648962600244586]),
            {
              "landcover": 4,
              "system:index": "148"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24729192090402, -8.647010938424891]),
            {
              "landcover": 4,
              "system:index": "149"
            }),
        ee.Feature(
            ee.Geometry.Point([115.2459186298884, -8.642089311557202]),
            {
              "landcover": 4,
              "system:index": "150"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24488866162667, -8.642089311557202]),
            {
              "landcover": 4,
              "system:index": "151"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24342953992257, -8.639373903709002]),
            {
              "landcover": 4,
              "system:index": "152"
            }),
        ee.Feature(
            ee.Geometry.Point([115.2396529896296, -8.63708276312767]),
            {
              "landcover": 4,
              "system:index": "153"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24445950818429, -8.636319046507797]),
            {
              "landcover": 4,
              "system:index": "154"
            }),
        ee.Feature(
            ee.Geometry.Point([115.27192532849679, -8.650150563357967]),
            {
              "landcover": 4,
              "system:index": "155"
            }),
        ee.Feature(
            ee.Geometry.Point([115.26729047131906, -8.652271916740036]),
            {
              "landcover": 4,
              "system:index": "156"
            }),
        ee.Feature(
            ee.Geometry.Point([115.26454388928781, -8.65566605729078]),
            {
              "landcover": 4,
              "system:index": "157"
            }),
        ee.Feature(
            ee.Geometry.Point([115.26540219617257, -8.645398688426562]),
            {
              "landcover": 4,
              "system:index": "158"
            }),
        ee.Feature(
            ee.Geometry.Point([115.26059567761789, -8.646077531371942]),
            {
              "landcover": 4,
              "system:index": "159"
            }),
        ee.Feature(
            ee.Geometry.Point([115.25956570935617, -8.64752006857001]),
            {
              "landcover": 4,
              "system:index": "160"
            }),
        ee.Feature(
            ee.Geometry.Point([115.25819241834054, -8.645483543861618]),
            {
              "landcover": 4,
              "system:index": "161"
            }),
        ee.Feature(
            ee.Geometry.Point([115.25844991040597, -8.64124074870545]),
            {
              "landcover": 4,
              "system:index": "162"
            }),
        ee.Feature(
            ee.Geometry.Point([115.25793492627511, -8.642004455357986]),
            {
              "landcover": 4,
              "system:index": "163"
            }),
        ee.Feature(
            ee.Geometry.Point([115.25681912732492, -8.642598448351436]),
            {
              "landcover": 4,
              "system:index": "164"
            }),
        ee.Feature(
            ee.Geometry.Point([115.26111066174875, -8.642853016490673]),
            {
              "landcover": 4,
              "system:index": "165"
            }),
        ee.Feature(
            ee.Geometry.Point([115.25922238660226, -8.642937872498889]),
            {
              "landcover": 4,
              "system:index": "166"
            }),
        ee.Feature(
            ee.Geometry.Point([115.25681912732492, -8.643277296340704]),
            {
              "landcover": 4,
              "system:index": "167"
            }),
        ee.Feature(
            ee.Geometry.Point([115.26995122266183, -8.641665030370076]),
            {
              "landcover": 4,
              "system:index": "168"
            }),
        ee.Feature(
            ee.Geometry.Point([115.25475919080148, -8.632924731714626]),
            {
              "landcover": 4,
              "system:index": "169"
            }),
        ee.Feature(
            ee.Geometry.Point([115.25355756116281, -8.634537035048796]),
            {
              "landcover": 4,
              "system:index": "170"
            }),
        ee.Feature(
            ee.Geometry.Point([115.2667754871882, -8.645483543861618]),
            {
              "landcover": 4,
              "system:index": "171"
            }),
        ee.Feature(
            ee.Geometry.Point([115.26008069348703, -8.64336215225339]),
            {
              "landcover": 4,
              "system:index": "172"
            }),
        ee.Feature(
            ee.Geometry.Point([115.26102483106027, -8.646841228223613]),
            {
              "landcover": 4,
              "system:index": "173"
            }),
        ee.Feature(
            ee.Geometry.Point([115.27166783643136, -8.65082939774039]),
            {
              "landcover": 4,
              "system:index": "174"
            }),
        ee.Feature(
            ee.Geometry.Point([115.27020871472726, -8.649302018659306]),
            {
              "landcover": 4,
              "system:index": "175"
            }),
        ee.Feature(
            ee.Geometry.Point([115.26780545544992, -8.652187062834217]),
            {
              "landcover": 4,
              "system:index": "176"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24806439710031, -8.664527768570716]),
            {
              "landcover": 4,
              "system:index": "177"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24789273572335, -8.665376278936815]),
            {
              "landcover": 4,
              "system:index": "178"
            }),
        ee.Feature(
            ee.Geometry.Point([115.25038182568917, -8.670806699923245]),
            {
              "landcover": 4,
              "system:index": "179"
            }),
        ee.Feature(
            ee.Geometry.Point([115.22961079907785, -8.65986092733344]),
            {
              "landcover": 4,
              "system:index": "180"
            }),
        ee.Feature(
            ee.Geometry.Point([115.22549092603097, -8.67012790159134]),
            {
              "landcover": 4,
              "system:index": "181"
            }),
        ee.Feature(
            ee.Geometry.Point([115.22592007947335, -8.671061248981548]),
            {
              "landcover": 4,
              "system:index": "182"
            }),
        ee.Feature(
            ee.Geometry.Point([115.22549092603097, -8.670721850198825]),
            {
              "landcover": 4,
              "system:index": "183"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23458897900949, -8.66910970179417]),
            {
              "landcover": 4,
              "system:index": "184"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23287236523996, -8.668855151413801]),
            {
              "landcover": 4,
              "system:index": "185"
            }),
        ee.Feature(
            ee.Geometry.Point([115.26368558240304, -8.703314648157523]),
            {
              "landcover": 4,
              "system:index": "186"
            }),
        ee.Feature(
            ee.Geometry.Point([115.26325642896066, -8.704078228615382]),
            {
              "landcover": 4,
              "system:index": "187"
            })]);
//=====================================================================================================================
// NASA - University of Maryland (ESSIC)
// Mangrove Extent Mapping Tutorial for Exercise Land
//
// Code: Mangrove Extent Mapping Tutorial for Exercise Land
// Written by: Abigail Barenblitt NASA Goddard and University of Maryland 
// Objective: This code works through a tutorial for mapping mangrove extent in Exercise Land 
//=====================================================================================================================
// =================
// 1) Set up the map
// =================
//Center the map to the region of interest using the region shapefile
Map.centerObject(geometry,12);
//Map.setOptions('map');
// ====================================
// 2) Set up Filtered Landsat Composite
// ====================================
// 2.1) Cloud Masking
// ------------------
//Landsat data includes a 'pixel_qa' band which can be used to create 
//     a function to mask clouds
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
// 2.2) Adding Spectral Indices
// ----------------------------
// This function maps spectral indices for Mangrove Mapping using Landsat 8 Imagery
var addIndicesL8 = function(img) {
  // NDVI
  var ndvi = img.normalizedDifference(['B5','B4']).rename('NDVI');
  // NDMI (Normalized Difference Mangrove Index - Shi et al 2016 - New spectral metrics for mangrove forest identification)
  //DVI
  var dvi = img.select('B5').subtract(img.select('B5')).rename('DVI');
  //NDWI
  var ndwi = img.normalizedDifference(['B7','B3']).rename('NDWI');
  // MNDWI (Modified Normalized Difference Water Index - Hanqiu Xu, 2006)
  var mndwi = img.normalizedDifference(['B3','B6']).rename('MNDWI');
  // NDBI (Normalized Difference Build Index)
  var ndbi = img.normalizedDifference(['B6','B5']).rename('NDBI');
  //UI (urban Index)
  var ui = img.normalizedDifference(['B7','B5']).rename('UI');
  return img
    .addBands(ndvi)
    .addBands(dvi)
    .addBands(ndwi)
    .addBands(mndwi)
    .addBands(ndbi)
    .addBands(ui);
};
// 2.3) Filter Landsat data by Date and Region
// -------------------------------------------
// Temporal Parameters 
// Select the desired central year here
var year = 2022; 
// Start date will be set one year before the central year
var startDate = (year-1)+'-01-01'; 
// End date will be set to one year later than the central year.
var endDate = (year+1)+'-12-31'; 
// 2.4) Apply filters and masks to Landsat 8 imagery
// -------------------------------------------------
var l8 = L8.filterDate(startDate,endDate)
// Mask for clouds and cloud shadows
    .map(maskClouds)
//Add the indices
    .map(addIndicesL8)
// 2.5) Composite the Landsat image collection
// -------------------------------------------
//You can composite on a per pixel, per-band basis using .median()
// OR with quality bands like .qualityMosaic('NDVI')
var composite = l8
              // Uses the median reducer
              .median() 
              // Clips the composite to our area of interest
              .clip(table); 
// 2.6) Mask to areas of low elevation and high NDVI and MNDWI
// -----------------------------------------------------------
// 2.7) Display results
// --------------------
//Select bands and parameters for visualization
var visPar = {bands:['B4','B3','B2'], min: 0, max: 0.35}; 
//Add layer to map
Map.addLayer(composite, visPar, 'Landsat Composite 2019');
// ================================
// 3) Construct Random Forest Model
// ================================
// 3.1) Prepare training data and predictors
// -----------------------------------------
//After drawing training polygons, merge them together
var classes = mangrove.merge(badan_air)
                      .merge(lahan_terbangun)
                      .merge(lahan_terbuka)
                      .merge(vegetasi);
//Define the bands you want to include in the model
var bands = ['B2','B3','B4','B5','B6','B7','NDVI','DVI','NDWI','MNDWI','NDBI','UI'];
//Create a variable called image to select the bands of interest and clip to geometry
var image = composite.select(bands).clip(table);
//Assemble samples for the model
var samples = image.sampleRegions({
    collection: classes, // Set of geometries selected for training
    properties: ['landcover'], // Label from each geometry
    scale: 30 // Make each sample the same size as Landsat pixel
    }).randomColumn('random'); // creates a column with random numbers
// Here we randomly split our samples to set some aside for testing our model's accuracy
//  using the "random" column we created
var split = 0.8; // Roughly 80% for training, 20% for testing.
var training = samples.filter(ee.Filter.lt('random', split)); //Subset training data
var testing = samples.filter(ee.Filter.gte('random', split)); //Subset testing data
//Print these variables to see how much training and testing data you are using
    print('Samples n =', samples.aggregate_count('.all'));
    print('Training n =', training.aggregate_count('.all'));
    print('Testing n =', testing.aggregate_count('.all'));
// 3.2) Begin Random Forest Classification
// ---------------------------------------
//.smileRandomForest is used to run the model. Here we run the model using 100 trees
// and 5 randomly selected predictors per split ("(100,5)")
    var classifier = ee.Classifier.smileRandomForest(100,5).train({ 
    features: training.select(['B2','B3','B4','B5','B6','B7','NDVI','DVI','NDWI','MNDWI','NDBI','UI','landcover']), //Train using bands and landcover property
    classProperty: 'landcover', //Pull the landcover property from classes
    inputProperties: bands
    });
// 3.3) Test the accuracy of the model
// -----------------------------------
    var validation = testing.classify(classifier);
    var testAccuracy = validation.errorMatrix('landcover', 'classification');
    print('Validation error matrix RF: ', testAccuracy);
    print('Validation overall accuracy RF: ', testAccuracy.accuracy());
// 3.4) Classify the Landsat composite using the Random Forest model
// -----------------------------------------------------------------
    var classifiedrf = image.select(bands) // select the predictors
                      .classify(classifier); // .classify applies the Random Forest
Map.addLayer (classifiedrf, {min: 0, max: 4, palette:['6BCB77','0AA1DD','F24C4C','B7E5DD','4B7BE5']}, 'Tutupan Lahan');                      
//Keterangan Warna
    // 6BCB77 = mangrove 
    // yellow = badan_air
    // 0range = lahan_terbangun
    // cyan   = lahan_terbuka
    // 09A6F  = vegetasi
    // grey   = sawah
    // purple = hutan
//Part 2
    // '6BCB77', // mangrove
    // '0AA1DD',   // badan air
    // 'F24C4C', // lahan terbangun
    // 'B7E5DD', // lahan terbuka
    // '4B7BE5',   // vegetasi
// // The model results may be "noisy". To reduce noise, create a mask to mask
// // unconnected pixels
//     var pixelcount = classifiedrf.connectedPixelCount(100, false); //Create an image that shows the number of pixels each pixel is connected to
//     var countmask = pixelcount.select(0).gt(25); //filter out all pixels connected to 4 or less 
// // Mask the results to only display mangrove extent
//     var classMask = classifiedrf.select('classification').gt(0)
//     var classed= classifiedrf.updateMask(countmask).updateMask(classMask)
// 3.5) Map results
// ----------------------
// //Set up legenda
var legend = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15p'
  }
});
//Create title
var legendTitle = ui.Label({
  value: 'Keterangan',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
  }
});
legend.add(legendTitle);
//Create style
var makeRow = function(color, name) {
      //Coloring style
      var colorBox = ui.Label({
          style: {
              backgroundColor: '#' + color,
              //usepadding for to create long and shor to symbol box
              padding: '8px',
              margin: '0 0 4px 0'
              }
            });
      //create label
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}
      });
      //backto panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
//coloring
var palette = [
    '6BCB77', // mangrove
    '0AA1DD',   // badan air
    'F24C4C', // lahan terbangun
    'B7E5DD', // lahan terbuka
    '4B7BE5',   // vegetasi
];
//name
var names =['Mangrove','Badan Air','Lahan Terbangun','Lahan Terbuka','Vegetasi'];
//add name and color
for (var i = 0; i < 5; i++) {
  legend.add(makeRow(palette[i], names[i]));
}
//ad legend to layer and get print to console
Map.add(legend);
// ****
// End
// ****