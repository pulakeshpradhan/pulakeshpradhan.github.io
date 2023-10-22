var imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "b4",
          "b3",
          "b2"
        ],
        "min": 2131.94,
        "max": 14177.06,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["b4","b3","b2"],"min":2131.94,"max":14177.06,"gamma":1},
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -74.42005574513651,
                4.3574405257962345
              ],
              [
                -74.39756810475565,
                4.375926138073507
              ],
              [
                -74.367012379658,
                4.398861355720277
              ],
              [
                -74.32478368092752,
                4.3855110908137975
              ],
              [
                -74.3017810564158,
                4.424534268899952
              ],
              [
                -74.30246770192362,
                4.502574437860474
              ],
              [
                -74.35435548315917,
                4.500508213368922
              ],
              [
                -74.39967408667479,
                4.489897946972703
              ],
              [
                -74.45769563208495,
                4.377282780012739
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
        [[[-74.42005574513651, 4.3574405257962345],
          [-74.39756810475565, 4.375926138073507],
          [-74.367012379658, 4.398861355720277],
          [-74.32478368092752, 4.3855110908137975],
          [-74.3017810564158, 4.424534268899952],
          [-74.30246770192362, 4.502574437860474],
          [-74.35435548315917, 4.500508213368922],
          [-74.39967408667479, 4.489897946972703],
          [-74.45769563208495, 4.377282780012739]]]),
    BOSQUE = ui.import && ui.import("BOSQUE", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -74.45597254618463,
            4.376523573881691
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.45539318903741,
            4.377657513522491
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.45062958582696,
            4.381673999869213
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.4494494138604,
            4.382454915373221
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.44688522204217,
            4.383225132605542
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.4197914104691,
            4.414280765602737
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.42057461550145,
            4.41402403731755
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.4186537778206,
            4.4543057130712915
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.41723757146073,
            4.455268391192164
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.42017727254105,
            4.450540559877799
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.38845836822651,
            4.473723929119654
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.34193455769184,
            4.426993519839676
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.34069001270893,
            4.425902442727584
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.34676253391865,
            4.428041808098865
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.44026429037856,
            4.402702796089252
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.43942744116592,
            4.403366020747937
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.43953472952651,
            4.4054840568279365
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.3129885059172,
            4.410505173127914
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.31215165670456,
            4.41110420849417
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.31086419637741,
            4.4139496198850665
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.34940312084684,
            4.469696200754254
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.34721443829069,
            4.47166430008147
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.34107754406462,
            4.474402516437074
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.34215042767057,
            4.475643267352261
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.33648560223112,
            4.476413387552207
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.33322403606901,
            4.475129853435505
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.32979080852995,
            4.474316947330928
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.32807419476042,
            4.472862270996677
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.35262177166472,
            4.467214676679245
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "CLASE": 1
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
            ee.Geometry.Point([-74.45597254618463, 4.376523573881691]),
            {
              "CLASE": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.45539318903741, 4.377657513522491]),
            {
              "CLASE": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.45062958582696, 4.381673999869213]),
            {
              "CLASE": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.4494494138604, 4.382454915373221]),
            {
              "CLASE": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.44688522204217, 4.383225132605542]),
            {
              "CLASE": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.4197914104691, 4.414280765602737]),
            {
              "CLASE": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.42057461550145, 4.41402403731755]),
            {
              "CLASE": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.4186537778206, 4.4543057130712915]),
            {
              "CLASE": 1,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.41723757146073, 4.455268391192164]),
            {
              "CLASE": 1,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.42017727254105, 4.450540559877799]),
            {
              "CLASE": 1,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.38845836822651, 4.473723929119654]),
            {
              "CLASE": 1,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.34193455769184, 4.426993519839676]),
            {
              "CLASE": 1,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.34069001270893, 4.425902442727584]),
            {
              "CLASE": 1,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.34676253391865, 4.428041808098865]),
            {
              "CLASE": 1,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.44026429037856, 4.402702796089252]),
            {
              "CLASE": 1,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.43942744116592, 4.403366020747937]),
            {
              "CLASE": 1,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.43953472952651, 4.4054840568279365]),
            {
              "CLASE": 1,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.3129885059172, 4.410505173127914]),
            {
              "CLASE": 1,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.31215165670456, 4.41110420849417]),
            {
              "CLASE": 1,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.31086419637741, 4.4139496198850665]),
            {
              "CLASE": 1,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.34940312084684, 4.469696200754254]),
            {
              "CLASE": 1,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.34721443829069, 4.47166430008147]),
            {
              "CLASE": 1,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.34107754406462, 4.474402516437074]),
            {
              "CLASE": 1,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.34215042767057, 4.475643267352261]),
            {
              "CLASE": 1,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.33648560223112, 4.476413387552207]),
            {
              "CLASE": 1,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.33322403606901, 4.475129853435505]),
            {
              "CLASE": 1,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.32979080852995, 4.474316947330928]),
            {
              "CLASE": 1,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.32807419476042, 4.472862270996677]),
            {
              "CLASE": 1,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.35262177166472, 4.467214676679245]),
            {
              "CLASE": 1,
              "system:index": "28"
            })]),
    VIAS_PAVIMIENTADAS = ui.import && ui.import("VIAS_PAVIMIENTADAS", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -74.36930182380202,
            4.496795454807296
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.36997774047377,
            4.4957579605274915
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.38038141796007,
            4.474160896057799
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.38123972484483,
            4.47333194464776
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.38373359920676,
            4.467779276691386
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.38369604828056,
            4.467420952753924
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.38396963360007,
            4.466394113038039
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.38142763256283,
            4.457467214876276
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.38220657536972,
            4.4396783643755295
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.38263036439407,
            4.439421644900302
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.38354767987717,
            4.438239664497718
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.38398756258074,
            4.402143397233794
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.384395258351,
            4.4020364253788875
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.38510872594897,
            4.402400129622836
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.38532330267016,
            4.401282273365531
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.38560761682574,
            4.401202044382975
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.3871152460442,
            4.384815320436699
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.38928247092824,
            4.384312540903052
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.39030707477193,
            4.384392771702379
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.38994765876393,
            4.384162776721263
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "CLASE": 2
      },
      "color": "#fd6f90",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #fd6f90 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([-74.36930182380202, 4.496795454807296]),
            {
              "CLASE": 2,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.36997774047377, 4.4957579605274915]),
            {
              "CLASE": 2,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.38038141796007, 4.474160896057799]),
            {
              "CLASE": 2,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.38123972484483, 4.47333194464776]),
            {
              "CLASE": 2,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.38373359920676, 4.467779276691386]),
            {
              "CLASE": 2,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.38369604828056, 4.467420952753924]),
            {
              "CLASE": 2,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.38396963360007, 4.466394113038039]),
            {
              "CLASE": 2,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.38142763256283, 4.457467214876276]),
            {
              "CLASE": 2,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.38220657536972, 4.4396783643755295]),
            {
              "CLASE": 2,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.38263036439407, 4.439421644900302]),
            {
              "CLASE": 2,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.38354767987717, 4.438239664497718]),
            {
              "CLASE": 2,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.38398756258074, 4.402143397233794]),
            {
              "CLASE": 2,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.384395258351, 4.4020364253788875]),
            {
              "CLASE": 2,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.38510872594897, 4.402400129622836]),
            {
              "CLASE": 2,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.38532330267016, 4.401282273365531]),
            {
              "CLASE": 2,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.38560761682574, 4.401202044382975]),
            {
              "CLASE": 2,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.3871152460442, 4.384815320436699]),
            {
              "CLASE": 2,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.38928247092824, 4.384312540903052]),
            {
              "CLASE": 2,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.39030707477193, 4.384392771702379]),
            {
              "CLASE": 2,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.38994765876393, 4.384162776721263]),
            {
              "CLASE": 2,
              "system:index": "19"
            })]),
    SUELO_DESNUDO = ui.import && ui.import("SUELO_DESNUDO", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -74.40057979053861,
            4.378835315374904
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.39979658550627,
            4.379723208911891
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.397243155281,
            4.382209305676433
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.39736653689569,
            4.3824874398599185
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.39658333186334,
            4.382963476972309
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.396341933052,
            4.383145333766671
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.38848978042519,
            4.456071906312543
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.38850050926125,
            4.455708228456842
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.389176425933,
            4.455590567935602
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.37706689932755,
            4.474294680648646
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.37719564536026,
            4.474957840979849
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.3763373384755,
            4.475300117044799
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.37034203586009,
            4.490464954084629
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.36785294589427,
            4.49189820362196
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.36892582950023,
            4.49585566905947
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.3685610490742,
            4.496647159568453
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.36806752261546,
            4.495577577595465
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.3745048242512,
            4.4906360885058
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.35743874466088,
            4.500615294966106
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.35750311767724,
            4.498593794729482
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "CLASE": 3
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
            ee.Geometry.Point([-74.40057979053861, 4.378835315374904]),
            {
              "CLASE": 3,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.39979658550627, 4.379723208911891]),
            {
              "CLASE": 3,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.397243155281, 4.382209305676433]),
            {
              "CLASE": 3,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.39736653689569, 4.3824874398599185]),
            {
              "CLASE": 3,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.39658333186334, 4.382963476972309]),
            {
              "CLASE": 3,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.396341933052, 4.383145333766671]),
            {
              "CLASE": 3,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.38848978042519, 4.456071906312543]),
            {
              "CLASE": 3,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.38850050926125, 4.455708228456842]),
            {
              "CLASE": 3,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.389176425933, 4.455590567935602]),
            {
              "CLASE": 3,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.37706689932755, 4.474294680648646]),
            {
              "CLASE": 3,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.37719564536026, 4.474957840979849]),
            {
              "CLASE": 3,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.3763373384755, 4.475300117044799]),
            {
              "CLASE": 3,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.37034203586009, 4.490464954084629]),
            {
              "CLASE": 3,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.36785294589427, 4.49189820362196]),
            {
              "CLASE": 3,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.36892582950023, 4.49585566905947]),
            {
              "CLASE": 3,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.3685610490742, 4.496647159568453]),
            {
              "CLASE": 3,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.36806752261546, 4.495577577595465]),
            {
              "CLASE": 3,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.3745048242512, 4.4906360885058]),
            {
              "CLASE": 3,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.35743874466088, 4.500615294966106]),
            {
              "CLASE": 3,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.35750311767724, 4.498593794729482]),
            {
              "CLASE": 3,
              "system:index": "19"
            })]),
    CONTRUCCION = ui.import && ui.import("CONTRUCCION", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -74.35662570400098,
            4.495685071150597
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.35642722053387,
            4.4957545940163
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.35620727939465,
            4.495824116875373
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.35602488918164,
            4.495824116875373
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.35582640571454,
            4.4957545940163
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.3544546641541,
            4.4917447734264115
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.35438492671972,
            4.4920442581116475
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.35428300277715,
            4.49232235092352
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.35420790092473,
            4.492616487436062
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.35407915489202,
            4.4929213196965945
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.35403623954778,
            4.493231499760725
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.39834784495892,
            4.413962770922141
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.39803670871319,
            4.413861149276337
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.3976772927052,
            4.4137648761253665
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.39745198714795,
            4.413604420846015
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.37803298267222,
            4.394413602600066
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.37800079616405,
            4.394622199837495
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.37790423663951,
            4.394798705146679
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.37783986362315,
            4.395034045493891
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.37804371150828,
            4.3942103539536
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "CLASE": 4
      },
      "color": "#7cb37e",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #7cb37e */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([-74.35662570400098, 4.495685071150597]),
            {
              "CLASE": 4,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.35642722053387, 4.4957545940163]),
            {
              "CLASE": 4,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.35620727939465, 4.495824116875373]),
            {
              "CLASE": 4,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.35602488918164, 4.495824116875373]),
            {
              "CLASE": 4,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.35582640571454, 4.4957545940163]),
            {
              "CLASE": 4,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.3544546641541, 4.4917447734264115]),
            {
              "CLASE": 4,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.35438492671972, 4.4920442581116475]),
            {
              "CLASE": 4,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.35428300277715, 4.49232235092352]),
            {
              "CLASE": 4,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.35420790092473, 4.492616487436062]),
            {
              "CLASE": 4,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.35407915489202, 4.4929213196965945]),
            {
              "CLASE": 4,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.35403623954778, 4.493231499760725]),
            {
              "CLASE": 4,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.39834784495892, 4.413962770922141]),
            {
              "CLASE": 4,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.39803670871319, 4.413861149276337]),
            {
              "CLASE": 4,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.3976772927052, 4.4137648761253665]),
            {
              "CLASE": 4,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.39745198714795, 4.413604420846015]),
            {
              "CLASE": 4,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.37803298267222, 4.394413602600066]),
            {
              "CLASE": 4,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.37800079616405, 4.394622199837495]),
            {
              "CLASE": 4,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.37790423663951, 4.394798705146679]),
            {
              "CLASE": 4,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.37783986362315, 4.395034045493891]),
            {
              "CLASE": 4,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.37804371150828, 4.3942103539536]),
            {
              "CLASE": 4,
              "system:index": "19"
            })]),
    CULTIVO = ui.import && ui.import("CULTIVO", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -74.3447033138735,
            4.402068095217706
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.34169923977682,
            4.4049777240678445
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.32332612882244,
            4.411711483491806
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.32802535901654,
            4.412567246762868
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.32858325849163,
            4.412545852693115
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.33655497960812,
            4.423803218846924
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.33447358541257,
            4.424092034351977
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.33450577192075,
            4.423364646938688
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.3330037348724,
            4.423097224915977
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.33306810788876,
            4.422990256079863
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.33108327321774,
            4.4249263896227236
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.3017396301948,
            4.444936384309505
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.3018469185554,
            4.448230919482024
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.30176108786692,
            4.450840865456298
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.30497973868479,
            4.446113005705014
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.30545180747141,
            4.449321963596599
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.3018469185554,
            4.443503042980922
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.3203226112222,
            4.468681744103557
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.31772623289578,
            4.46833946494651
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.31706104506009,
            4.470072251535599
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.31433592070096,
            4.470607061383977
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.34163394634622,
            4.454120054424249
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.339252144741,
            4.456109588320556
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.3406039780845,
            4.457842403779209
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.33912339870828,
            4.457350370175378
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.38289530088649,
            4.489116205667621
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.38362486173854,
            4.490677808659379
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.37804586698756,
            4.491875748414843
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.38610730331763,
            4.478656170271369
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.38357529800757,
            4.477222894753779
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.38318905990943,
            4.476602520897951
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.38172993820532,
            4.479661600674949
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.37939105194434,
            4.478014405461408
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.3902271763645,
            4.479768561274838
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.38958344620093,
            4.479126797440851
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.3829531022948,
            4.474987400189961
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.36722615212081,
            4.471931169980945
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.36538079231856,
            4.471738638828406
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.36439373940108,
            4.470112818189664
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.3575701996672,
            4.471610284698606
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.38500137382671,
            4.415850667538704
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.38452930504009,
            4.419273695609285
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.33536980328093,
            4.461267541712748
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.3316361683322,
            4.464262507791837
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.33678600964079,
            4.4672574616482335
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.34410307583342,
            4.464968462302124
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.34511158642302,
            4.464626181412248
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.35084078487883,
            4.466401761794086
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "CLASE": 5
      },
      "color": "#10c21e",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #10c21e */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([-74.3447033138735, 4.402068095217706]),
            {
              "CLASE": 5,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.34169923977682, 4.4049777240678445]),
            {
              "CLASE": 5,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.32332612882244, 4.411711483491806]),
            {
              "CLASE": 5,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.32802535901654, 4.412567246762868]),
            {
              "CLASE": 5,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.32858325849163, 4.412545852693115]),
            {
              "CLASE": 5,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.33655497960812, 4.423803218846924]),
            {
              "CLASE": 5,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.33447358541257, 4.424092034351977]),
            {
              "CLASE": 5,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.33450577192075, 4.423364646938688]),
            {
              "CLASE": 5,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.3330037348724, 4.423097224915977]),
            {
              "CLASE": 5,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.33306810788876, 4.422990256079863]),
            {
              "CLASE": 5,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.33108327321774, 4.4249263896227236]),
            {
              "CLASE": 5,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.3017396301948, 4.444936384309505]),
            {
              "CLASE": 5,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.3018469185554, 4.448230919482024]),
            {
              "CLASE": 5,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.30176108786692, 4.450840865456298]),
            {
              "CLASE": 5,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.30497973868479, 4.446113005705014]),
            {
              "CLASE": 5,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.30545180747141, 4.449321963596599]),
            {
              "CLASE": 5,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.3018469185554, 4.443503042980922]),
            {
              "CLASE": 5,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.3203226112222, 4.468681744103557]),
            {
              "CLASE": 5,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.31772623289578, 4.46833946494651]),
            {
              "CLASE": 5,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.31706104506009, 4.470072251535599]),
            {
              "CLASE": 5,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.31433592070096, 4.470607061383977]),
            {
              "CLASE": 5,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.34163394634622, 4.454120054424249]),
            {
              "CLASE": 5,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.339252144741, 4.456109588320556]),
            {
              "CLASE": 5,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.3406039780845, 4.457842403779209]),
            {
              "CLASE": 5,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.33912339870828, 4.457350370175378]),
            {
              "CLASE": 5,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.38289530088649, 4.489116205667621]),
            {
              "CLASE": 5,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.38362486173854, 4.490677808659379]),
            {
              "CLASE": 5,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.37804586698756, 4.491875748414843]),
            {
              "CLASE": 5,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.38610730331763, 4.478656170271369]),
            {
              "CLASE": 5,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.38357529800757, 4.477222894753779]),
            {
              "CLASE": 5,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.38318905990943, 4.476602520897951]),
            {
              "CLASE": 5,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.38172993820532, 4.479661600674949]),
            {
              "CLASE": 5,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.37939105194434, 4.478014405461408]),
            {
              "CLASE": 5,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.3902271763645, 4.479768561274838]),
            {
              "CLASE": 5,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.38958344620093, 4.479126797440851]),
            {
              "CLASE": 5,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.3829531022948, 4.474987400189961]),
            {
              "CLASE": 5,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.36722615212081, 4.471931169980945]),
            {
              "CLASE": 5,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.36538079231856, 4.471738638828406]),
            {
              "CLASE": 5,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.36439373940108, 4.470112818189664]),
            {
              "CLASE": 5,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.3575701996672, 4.471610284698606]),
            {
              "CLASE": 5,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.38500137382671, 4.415850667538704]),
            {
              "CLASE": 5,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.38452930504009, 4.419273695609285]),
            {
              "CLASE": 5,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.33536980328093, 4.461267541712748]),
            {
              "CLASE": 5,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.3316361683322, 4.464262507791837]),
            {
              "CLASE": 5,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.33678600964079, 4.4672574616482335]),
            {
              "CLASE": 5,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.34410307583342, 4.464968462302124]),
            {
              "CLASE": 5,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.34511158642302, 4.464626181412248]),
            {
              "CLASE": 5,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.35084078487883, 4.466401761794086]),
            {
              "CLASE": 5,
              "system:index": "47"
            })]),
    ROCA = ui.import && ui.import("ROCA", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -74.45163947161325,
            4.379176295968278
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.45350628908761,
            4.380032096596099
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.45203643854745,
            4.381208820860631
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.45240121897348,
            4.379614893912331
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.45155364092477,
            4.380952081179008
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.44918725588857,
            4.383406129426238
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.45198748210012,
            4.382903348944581
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.45312473872244,
            4.3818229046377875
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.4519123802477,
            4.38456145350682
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.4037419086369,
            4.4792371201792935
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.4013279205235,
            4.479664962733313
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.40255100783429,
            4.476830501150305
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.40083439406476,
            4.477568531827459
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "CLASE": 6
      },
      "color": "#849f9b",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #849f9b */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([-74.45163947161325, 4.379176295968278]),
            {
              "CLASE": 6,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.45350628908761, 4.380032096596099]),
            {
              "CLASE": 6,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.45203643854745, 4.381208820860631]),
            {
              "CLASE": 6,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.45240121897348, 4.379614893912331]),
            {
              "CLASE": 6,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.45155364092477, 4.380952081179008]),
            {
              "CLASE": 6,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.44918725588857, 4.383406129426238]),
            {
              "CLASE": 6,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.45198748210012, 4.382903348944581]),
            {
              "CLASE": 6,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.45312473872244, 4.3818229046377875]),
            {
              "CLASE": 6,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.4519123802477, 4.38456145350682]),
            {
              "CLASE": 6,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.4037419086369, 4.4792371201792935]),
            {
              "CLASE": 6,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.4013279205235, 4.479664962733313]),
            {
              "CLASE": 6,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.40255100783429, 4.476830501150305]),
            {
              "CLASE": 6,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.40083439406476, 4.477568531827459]),
            {
              "CLASE": 6,
              "system:index": "12"
            })]),
    NUBES = ui.import && ui.import("NUBES", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -74.30685280394016,
            4.476087716732031
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.30702446531711,
            4.476718787128139
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.3066811425632,
            4.476868532565978
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.3118846280521,
            4.473638302752596
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.3083352534417,
            4.41763530036818
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.30988020583428,
            4.420887169584123
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.30927939101494,
            4.41746414896174
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.30803484603203,
            4.421486196567875
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.30219835921562,
            4.425936096139622
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.30112547560967,
            4.426706268350683
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.30095381423271,
            4.425379860155495
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.30957979842461,
            4.416565603430048
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.40828295213477,
            4.440371769194397
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.40875502092139,
            4.438211046187548
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "CLASE": 7
      },
      "color": "#fff2de",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #fff2de */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([-74.30685280394016, 4.476087716732031]),
            {
              "CLASE": 7,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.30702446531711, 4.476718787128139]),
            {
              "CLASE": 7,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.3066811425632, 4.476868532565978]),
            {
              "CLASE": 7,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.3118846280521, 4.473638302752596]),
            {
              "CLASE": 7,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.3083352534417, 4.41763530036818]),
            {
              "CLASE": 7,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.30988020583428, 4.420887169584123]),
            {
              "CLASE": 7,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.30927939101494, 4.41746414896174]),
            {
              "CLASE": 7,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.30803484603203, 4.421486196567875]),
            {
              "CLASE": 7,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.30219835921562, 4.425936096139622]),
            {
              "CLASE": 7,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.30112547560967, 4.426706268350683]),
            {
              "CLASE": 7,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.30095381423271, 4.425379860155495]),
            {
              "CLASE": 7,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.30957979842461, 4.416565603430048]),
            {
              "CLASE": 7,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.40828295213477, 4.440371769194397]),
            {
              "CLASE": 7,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.40875502092139, 4.438211046187548]),
            {
              "CLASE": 7,
              "system:index": "13"
            })]),
    SOMBRAS = ui.import && ui.import("SOMBRAS", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -74.31320527589459,
            4.4219904018379435
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.31492188966412,
            4.423830266150479
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.31372026002545,
            4.424985527452651
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.3124327996983,
            4.425285039347875
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.30518010652203,
            4.429050321405917
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.30363515412945,
            4.430590658542939
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "CLASE": 8
      },
      "color": "#100e10",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #100e10 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([-74.31320527589459, 4.4219904018379435]),
            {
              "CLASE": 8,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.31492188966412, 4.423830266150479]),
            {
              "CLASE": 8,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.31372026002545, 4.424985527452651]),
            {
              "CLASE": 8,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.3124327996983, 4.425285039347875]),
            {
              "CLASE": 8,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.30518010652203, 4.429050321405917]),
            {
              "CLASE": 8,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.30363515412945, 4.430590658542939]),
            {
              "CLASE": 8,
              "system:index": "5"
            })]),
    AGUA = ui.import && ui.import("AGUA", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -74.3931869151899,
            4.391792459270715
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.39280067709176,
            4.392466390965472
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.41601604238656,
            4.390716866248088
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.39486525368613,
            4.381282430371478
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.39461849045676,
            4.3819831152350694
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.3939050228588,
            4.3823896191297775
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.39492866836405,
            4.389718068841998
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.39497158370828,
            4.389910621352216
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.39506277881479,
            4.390450837851781
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.39486429534769,
            4.391188954813034
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.37849227532409,
            4.398917229022976
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.37821332558654,
            4.398895834560502
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.374896061176,
            4.39263147905604
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.37525011276597,
            4.392963095942251
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.4103277095123,
            4.37175339620571
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.41011313279111,
            4.372523624450587
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -74.40582159836728,
            4.372416648352796
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "CLASE": 9
      },
      "color": "#0f28d8",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #0f28d8 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([-74.3931869151899, 4.391792459270715]),
            {
              "CLASE": 9,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.39280067709176, 4.392466390965472]),
            {
              "CLASE": 9,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.41601604238656, 4.390716866248088]),
            {
              "CLASE": 9,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.39486525368613, 4.381282430371478]),
            {
              "CLASE": 9,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.39461849045676, 4.3819831152350694]),
            {
              "CLASE": 9,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.3939050228588, 4.3823896191297775]),
            {
              "CLASE": 9,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.39492866836405, 4.389718068841998]),
            {
              "CLASE": 9,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.39497158370828, 4.389910621352216]),
            {
              "CLASE": 9,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.39506277881479, 4.390450837851781]),
            {
              "CLASE": 9,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.39486429534769, 4.391188954813034]),
            {
              "CLASE": 9,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.37849227532409, 4.398917229022976]),
            {
              "CLASE": 9,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.37821332558654, 4.398895834560502]),
            {
              "CLASE": 9,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.374896061176, 4.39263147905604]),
            {
              "CLASE": 9,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.37525011276597, 4.392963095942251]),
            {
              "CLASE": 9,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.4103277095123, 4.37175339620571]),
            {
              "CLASE": 9,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.41011313279111, 4.372523624450587]),
            {
              "CLASE": 9,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([-74.40582159836728, 4.372416648352796]),
            {
              "CLASE": 9,
              "system:index": "16"
            })]),
    imageVisParam2 = ui.import && ui.import("imageVisParam2", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "IMAGEN FINAL CLASIFICADA"
        ],
        "min": 1,
        "max": 9,
        "palette": [
          "1e7625",
          "ae9fb1",
          "c0c8ff",
          "ffc3a7",
          "0eff2b",
          "f8ff8b",
          "fef3ff",
          "020202",
          "1915fd"
        ]
      }
    }) || {"opacity":1,"bands":["IMAGEN FINAL CLASIFICADA"],"min":1,"max":9,"palette":["1e7625","ae9fb1","c0c8ff","ffc3a7","0eff2b","f8ff8b","fef3ff","020202","1915fd"]},
    imageVisParam3 = ui.import && ui.import("imageVisParam3", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "BOSQUE"
        ],
        "palette": [
          "5bff25"
        ]
      }
    }) || {"opacity":1,"bands":["BOSQUE"],"palette":["5bff25"]},
    imageVisParam4 = ui.import && ui.import("imageVisParam4", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "BOSQUE"
        ],
        "palette": [
          "f01af3"
        ]
      }
    }) || {"opacity":1,"bands":["BOSQUE"],"palette":["f01af3"]};
// CARGAMOS LA IMAGEN DE SILVANIA, IMPRIMOS LAS CARACTERISTICAS Y LA ADICIONAMOS 
// EN EL ESPACIO DE TRABAJO
var IMAGENSILVANIA = ee.Image('users/cartografia2016ud/SILVANIA');
print(IMAGENSILVANIA, 'IMAGEN SILVANIA');
Map.addLayer(IMAGENSILVANIA,imageVisParam, 'SILVANIA' ); 
Map.centerObject(IMAGENSILVANIA);
// SELECIONAMOS LAS ZONAS DE ENTRENAMIENTO A PARTIR DE GEOMETRIAS TIPO PUNTO O CLASES DE ENTRENAMIENTO
// UNIMOS LAS CLASES EN UNA SOLA VARIABLE
var ZONAS = BOSQUE.merge(VIAS_PAVIMIENTADAS).merge(SUELO_DESNUDO).merge(CONTRUCCION).merge(CULTIVO).merge(ROCA).merge(NUBES).merge(SOMBRAS).merge(AGUA);
print (ZONAS, 'ZONAS DE ENTRENAMIENTO');
// RELACIONAMOS LAS ZONAS DE ENTRENAMIENTO CON LA IMAGEN 
var ENTRENAMIENTO = IMAGENSILVANIA.sampleRegions({
  collection: ZONAS, 
  properties: ['CLASE'], 
  scale: 3});
  print(ENTRENAMIENTO, 'ENTRENAMIENTO');
// SELECIONAMOS EL CLASIFICADOR
var CLASIFICADOR = ee.Classifier.cart()
// COMENZAMOS A CLASIFICAR LA IMAGEN
var IMAGEN_CLASIF = CLASIFICADOR.train({
  features: ENTRENAMIENTO, 
  classProperty: 'CLASE', 
  inputProperties: ['b1','b2','b3','b4'] });
// CLASIFICAMOS LA IMAGEN CON EL CLASIFICADOR Y LAS ZONAS DE ENTRENAMIENTO
var CLASIFICACION_FINAL = IMAGENSILVANIA.classify(IMAGEN_CLASIF, 'IMAGEN FINAL CLASIFICADA')
print (CLASIFICACION_FINAL, 'CLASIFICACION IMAGEN');
Map.addLayer(CLASIFICACION_FINAL, imageVisParam2, 'CLASIFICACION IMAGEN',0);
// RENOMBRAMOS LAS CLASES POR CLASES TEMATICAS
var NOMBRE = ['BOSQUE','VIAS_PAVIMENTADAS','SUELO DESNUDO','CONTRUCCION','CULTIVO','ROCA','NUBES','SOMBRAS','AGUA'];
var RENOMBRE = CLASIFICACION_FINAL.eq([1,2,3,4,5,6,7,8,9]).rename(NOMBRE);
print (RENOMBRE, 'RENOMBRE CLASES');
// DECLARAMOS LAS AREAS CLASIFICADAS
var AREA_CLASIFICADA = RENOMBRE.multiply(ee.Image.pixelArea().divide(10000));
// GENERAMOS LAS AREAS SUMANDO LOS VALORES POR CLASE
var AREA_CLASE = AREA_CLASIFICADA.reduceRegion({
  reducer: ee.Reducer.sum() , 
  geometry: geometry , 
  scale: 3,
  maxPixels: 1e12
});
// IMPRIMIMOS EL VALOR DE LAS AREAS 
var areatotal = ee.Number(AREA_CLASE);
print (areatotal, 'AREA POR CLASE HA');
// SELECCIONAMOS LAS AREAS DE BOSQUE 
var AREA_BOSQUE = RENOMBRE.select('BOSQUE');
var MASCARA_BOSQUE = RENOMBRE.updateMask(AREA_BOSQUE);
Map.addLayer(MASCARA_BOSQUE, imageVisParam3, 'BOSQUE');
// SELECCIONAMOS LAS AREAS DE CULTIVOS 
var AREA_CULTIVO = RENOMBRE.select('CULTIVO');
var MASCARA_CULTIVO = RENOMBRE.updateMask(AREA_CULTIVO);
Map.addLayer(MASCARA_CULTIVO, imageVisParam4, 'CULTIVO');
var TITULO_MAPA = ui.Label({
  value:'CLASIFICACION DE BOSQUES SILVANIA',
  style:{
    fontSize:'20px',
    fontWeight:'bold'
  }
});
// Agregamos el titulo al mapa
TITULO_MAPA.style().set('position', 'top-center');
Map.add(TITULO_MAPA);