var depart = ui.import && ui.import("depart", "table", {
      "id": "users/diegopons06/departamento_continente"
    }) || ee.FeatureCollection("users/diegopons06/departamento_continente"),
    doradillo = ui.import && ui.import("doradillo", "table", {
      "id": "users/diegopons06/Colombia_comixta/incendio_doradillo"
    }) || ee.FeatureCollection("users/diegopons06/Colombia_comixta/incendio_doradillo"),
    burned = ui.import && ui.import("burned", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -64.97317088590667,
                -42.625480031241544
              ],
              [
                -64.9745441769223,
                -42.60274048391771
              ],
              [
                -64.9965168331723,
                -42.618406395153734
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
                -64.99377025114104,
                -42.63305803522733
              ],
              [
                -65.00544322477386,
                -42.61941696379821
              ],
              [
                -65.0129963253598,
                -42.63305803522733
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
                -64.98141063200042,
                -42.63709926011557
              ],
              [
                -64.97111094938323,
                -42.630532136408284
              ],
              [
                -64.98415721403167,
                -42.62649048507773
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
                -64.96218455778167,
                -42.59465331067807
              ],
              [
                -64.97179759489104,
                -42.60324589739493
              ],
              [
                -64.96493113981292,
                -42.60829980666256
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
                -64.93815196500823,
                -42.58555398619612
              ],
              [
                -64.92956889616057,
                -42.58605953907197
              ],
              [
                -64.93162883268401,
                -42.581256621220405
              ],
              [
                -64.94089854703948,
                -42.58530120822075
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
                -64.91755259977386,
                -42.61006857804104
              ],
              [
                -64.92647899137542,
                -42.605772903279956
              ],
              [
                -64.93780864225432,
                -42.610573932066714
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
                -65.19557702237391,
                -42.37363294557294
              ],
              [
                -65.19437539273524,
                -42.36767223952929
              ],
              [
                -65.19437539273524,
                -42.363740400423325
              ],
              [
                -65.20107018643641,
                -42.366150266486386
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
                -65.19643532925868,
                -42.3792126683588
              ],
              [
                -65.19952523404383,
                -42.384157917274806
              ],
              [
                -65.19300210171961,
                -42.38580624702462
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
                -65.19386040860438,
                -42.3543537251681
              ],
              [
                -65.18871056729579,
                -42.354480581477205
              ],
              [
                -65.1893972128036,
                -42.3520702678183
              ],
              [
                -65.19643532925868,
                -42.3532120068635
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
                -65.19592034512782,
                -42.36044253917041
              ],
              [
                -65.19025551968836,
                -42.3631062097796
              ],
              [
                -65.1923154562118,
                -42.35790560503303
              ],
              [
                -65.19695031338954,
                -42.359427777806424
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 1
      },
      "color": "#f5520b",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #f5520b */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[-64.97317088590667, -42.625480031241544],
                  [-64.9745441769223, -42.60274048391771],
                  [-64.9965168331723, -42.618406395153734]]]),
            {
              "landcover": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-64.99377025114104, -42.63305803522733],
                  [-65.00544322477386, -42.61941696379821],
                  [-65.0129963253598, -42.63305803522733]]]),
            {
              "landcover": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-64.98141063200042, -42.63709926011557],
                  [-64.97111094938323, -42.630532136408284],
                  [-64.98415721403167, -42.62649048507773]]]),
            {
              "landcover": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-64.96218455778167, -42.59465331067807],
                  [-64.97179759489104, -42.60324589739493],
                  [-64.96493113981292, -42.60829980666256]]]),
            {
              "landcover": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-64.93815196500823, -42.58555398619612],
                  [-64.92956889616057, -42.58605953907197],
                  [-64.93162883268401, -42.581256621220405],
                  [-64.94089854703948, -42.58530120822075]]]),
            {
              "landcover": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-64.91755259977386, -42.61006857804104],
                  [-64.92647899137542, -42.605772903279956],
                  [-64.93780864225432, -42.610573932066714]]]),
            {
              "landcover": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-65.19557702237391, -42.37363294557294],
                  [-65.19437539273524, -42.36767223952929],
                  [-65.19437539273524, -42.363740400423325],
                  [-65.20107018643641, -42.366150266486386]]]),
            {
              "landcover": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-65.19643532925868, -42.3792126683588],
                  [-65.19952523404383, -42.384157917274806],
                  [-65.19300210171961, -42.38580624702462]]]),
            {
              "landcover": 1,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-65.19386040860438, -42.3543537251681],
                  [-65.18871056729579, -42.354480581477205],
                  [-65.1893972128036, -42.3520702678183],
                  [-65.19643532925868, -42.3532120068635]]]),
            {
              "landcover": 1,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-65.19592034512782, -42.36044253917041],
                  [-65.19025551968836, -42.3631062097796],
                  [-65.1923154562118, -42.35790560503303],
                  [-65.19695031338954, -42.359427777806424]]]),
            {
              "landcover": 1,
              "system:index": "9"
            })]),
    unburned = ui.import && ui.import("unburned", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -65.06140483366057,
                -42.60526751030312
              ],
              [
                -65.03050578580901,
                -42.60198235601427
              ],
              [
                -65.03119243131682,
                -42.58707063252409
              ],
              [
                -65.07101787076995,
                -42.58782894185103
              ],
              [
                -65.06483806119964,
                -42.60526751030312
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
                -65.00952473610766,
                -42.535455691035885
              ],
              [
                -64.91751423806079,
                -42.52533565099447
              ],
              [
                -64.96008625954516,
                -42.46964612344125
              ],
              [
                -65.06308308571704,
                -42.51015251661115
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
                -65.24435749977954,
                -42.49091525060031
              ],
              [
                -65.22787800759204,
                -42.541526928009674
              ],
              [
                -65.13174763649829,
                -42.53849138330979
              ],
              [
                -65.23886433571704,
                -42.45546268885628
              ],
              [
                -65.29379597634204,
                -42.50914017648471
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
                -64.91064778298266,
                -42.45039639783196
              ],
              [
                -64.83237019509204,
                -42.505090652022886
              ],
              [
                -64.87356892556079,
                -42.42607249637235
              ],
              [
                -64.88318196267016,
                -42.44735642650463
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
                -65.14218109761828,
                -42.356877151809655
              ],
              [
                -65.15625733052843,
                -42.36829273567137
              ],
              [
                -65.13926285421007,
                -42.37374611573544
              ],
              [
                -65.14458435689562,
                -42.36537561709394
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
                -65.28517502462023,
                -42.395554901105264
              ],
              [
                -65.28774994527453,
                -42.40924491752166
              ],
              [
                -65.26680725728625,
                -42.404808665292435
              ],
              [
                -65.27985352193468,
                -42.401132675785185
              ],
              [
                -65.28466004048937,
                -42.394667482148165
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
      "color": "#1234fb",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #1234fb */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[-65.06140483366057, -42.60526751030312],
                  [-65.03050578580901, -42.60198235601427],
                  [-65.03119243131682, -42.58707063252409],
                  [-65.07101787076995, -42.58782894185103],
                  [-65.06483806119964, -42.60526751030312]]]),
            {
              "landcover": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-65.00952473610766, -42.535455691035885],
                  [-64.91751423806079, -42.52533565099447],
                  [-64.96008625954516, -42.46964612344125],
                  [-65.06308308571704, -42.51015251661115]]]),
            {
              "landcover": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-65.24435749977954, -42.49091525060031],
                  [-65.22787800759204, -42.541526928009674],
                  [-65.13174763649829, -42.53849138330979],
                  [-65.23886433571704, -42.45546268885628],
                  [-65.29379597634204, -42.50914017648471]]]),
            {
              "landcover": 0,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-64.91064778298266, -42.45039639783196],
                  [-64.83237019509204, -42.505090652022886],
                  [-64.87356892556079, -42.42607249637235],
                  [-64.88318196267016, -42.44735642650463]]]),
            {
              "landcover": 0,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-65.14218109761828, -42.356877151809655],
                  [-65.15625733052843, -42.36829273567137],
                  [-65.13926285421007, -42.37374611573544],
                  [-65.14458435689562, -42.36537561709394]]]),
            {
              "landcover": 0,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-65.28517502462023, -42.395554901105264],
                  [-65.28774994527453, -42.40924491752166],
                  [-65.26680725728625, -42.404808665292435],
                  [-65.27985352193468, -42.401132675785185],
                  [-65.28466004048937, -42.394667482148165]]]),
            {
              "landcover": 0,
              "system:index": "5"
            })]),
    incendio = ui.import && ui.import("incendio", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -65.05458213426108,
                -42.70355905543997
              ],
              [
                -65.03947593308921,
                -42.70557741014672
              ],
              [
                -64.88566733933921,
                -42.61367584453202
              ],
              [
                -64.90420676805014,
                -42.60053596168733
              ],
              [
                -64.91725303269858,
                -42.593459492139395
              ],
              [
                -64.90214683152671,
                -42.582337702133806
              ],
              [
                -64.91175986863608,
                -42.56767412896092
              ],
              [
                -64.97905112840171,
                -42.586382219001585
              ],
              [
                -65.0278029594564,
                -42.61468648994684
              ],
              [
                -65.04359580613608,
                -42.61721303173025
              ],
              [
                -65.05252219773764,
                -42.63085458604084
              ],
              [
                -65.0772414360189,
                -42.63691653958224
              ],
              [
                -65.07655479051108,
                -42.64903867525281
              ],
              [
                -65.05183555222983,
                -42.65206884011873
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
                -65.21530884420031,
                -42.369814656806874
              ],
              [
                -65.21445053731554,
                -42.37838997281537
              ],
              [
                -65.2120472780382,
                -42.375473323171825
              ],
              [
                -65.21015900289171,
                -42.38282809278856
              ],
              [
                -65.20792740499132,
                -42.384476457452934
              ],
              [
                -65.20912903463,
                -42.3886605733876
              ],
              [
                -65.20449417745226,
                -42.39842242603795
              ],
              [
                -65.20277756368273,
                -42.4060280119231
              ],
              [
                -65.20020264302843,
                -42.412492035034944
              ],
              [
                -65.19625443135851,
                -42.41553369777005
              ],
              [
                -65.19316452657336,
                -42.41616735893876
              ],
              [
                -65.18784302388781,
                -42.41477329591604
              ],
              [
                -65.1900746217882,
                -42.403492919067
              ],
              [
                -65.1790882936632,
                -42.39614057049344
              ],
              [
                -65.18870133077257,
                -42.393605078129035
              ],
              [
                -65.17771500264757,
                -42.362410143549134
              ],
              [
                -65.18372315084093,
                -42.348075569054224
              ],
              [
                -65.19247788106554,
                -42.3325956322765
              ],
              [
                -65.20346420919054,
                -42.340970497477365
              ],
              [
                -65.21033066426867,
                -42.35137407933542
              ],
              [
                -65.21651047383898,
                -42.36152225605664
              ],
              [
                -65.21582382833117,
                -42.367356715602206
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#bf04c2",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #bf04c2 */
    /* shown: false */
    ee.Geometry.MultiPolygon(
        [[[[-65.05458213426108, -42.70355905543997],
           [-65.03947593308921, -42.70557741014672],
           [-64.88566733933921, -42.61367584453202],
           [-64.90420676805014, -42.60053596168733],
           [-64.91725303269858, -42.593459492139395],
           [-64.90214683152671, -42.582337702133806],
           [-64.91175986863608, -42.56767412896092],
           [-64.97905112840171, -42.586382219001585],
           [-65.0278029594564, -42.61468648994684],
           [-65.04359580613608, -42.61721303173025],
           [-65.05252219773764, -42.63085458604084],
           [-65.0772414360189, -42.63691653958224],
           [-65.07655479051108, -42.64903867525281],
           [-65.05183555222983, -42.65206884011873]]],
         [[[-65.21530884420031, -42.369814656806874],
           [-65.21445053731554, -42.37838997281537],
           [-65.2120472780382, -42.375473323171825],
           [-65.21015900289171, -42.38282809278856],
           [-65.20792740499132, -42.384476457452934],
           [-65.20912903463, -42.3886605733876],
           [-65.20449417745226, -42.39842242603795],
           [-65.20277756368273, -42.4060280119231],
           [-65.20020264302843, -42.412492035034944],
           [-65.19625443135851, -42.41553369777005],
           [-65.19316452657336, -42.41616735893876],
           [-65.18784302388781, -42.41477329591604],
           [-65.1900746217882, -42.403492919067],
           [-65.1790882936632, -42.39614057049344],
           [-65.18870133077257, -42.393605078129035],
           [-65.17771500264757, -42.362410143549134],
           [-65.18372315084093, -42.348075569054224],
           [-65.19247788106554, -42.3325956322765],
           [-65.20346420919054, -42.340970497477365],
           [-65.21033066426867, -42.35137407933542],
           [-65.21651047383898, -42.36152225605664],
           [-65.21582382833117, -42.367356715602206]]]]),
    area_de_estudio = ui.import && ui.import("area_de_estudio", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -65.38924888497917,
                -42.35926586631733
              ],
              [
                -65.38924888497917,
                -42.69526673811201
              ],
              [
                -64.72869590646354,
                -42.69526673811201
              ],
              [
                -64.72869590646354,
                -42.35926586631733
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#ff0000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #ff0000 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-65.38924888497917, -42.35926586631733],
          [-65.38924888497917, -42.69526673811201],
          [-64.72869590646354, -42.69526673811201],
          [-64.72869590646354, -42.35926586631733]]], null, false),
    region = ui.import && ui.import("region", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -66.48219883571115,
                -41.6300693419045
              ],
              [
                -66.48219883571115,
                -43.888241670853304
              ],
              [
                -63.34010899196114,
                -43.888241670853304
              ],
              [
                -63.34010899196114,
                -41.6300693419045
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#00ff00",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #00ff00 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-66.48219883571115, -41.6300693419045],
          [-66.48219883571115, -43.888241670853304],
          [-63.34010899196114, -43.888241670853304],
          [-63.34010899196114, -41.6300693419045]]], null, false),
    inc_17042020 = ui.import && ui.import("inc_17042020", "table", {
      "id": "users/diegopons06/Colombia_comixta/area_poligono_17042020"
    }) || ee.FeatureCollection("users/diegopons06/Colombia_comixta/area_poligono_17042020");
//app Hernando Hernandez colombia 02/07/2020
// modificacion para chubut
//incendios de muestra
//incendio en el Doradillo, Biedma: 02/01/2020
//incendio en ruta 3 , depto Biedma: 17/04/2020
//Map.setCenter(-62.107486, -32.452082, 6);
//seccion para generar interfase usuario
//Chubut
 var Tehuelches = depart.filter(ee.Filter.eq('NAM', 'Tehuelches'));
 var Escalante = depart.filter(ee.Filter.eq('NAM', 'Escalante'));
 var Florentino_Ameghino_Chubut = depart.filter(ee.Filter.eq('NAM', 'Florentino_Ameghino_Chubut'));
 var Martires = depart.filter(ee.Filter.eq('NAM', 'Martires'));
 var Paso_de_Indios = depart.filter(ee.Filter.eq('NAM', 'Paso_de_Indios'));
 var Languineo = depart.filter(ee.Filter.eq('NAM', 'Languineo'));
 var Rio_Senger = depart.filter(ee.Filter.eq('NAM', 'Rio_Senger'));
 var Telsen = depart.filter(ee.Filter.eq('NAM', 'Telsen'));
 var Gastre = depart.filter(ee.Filter.eq('NAM', 'Gastre'));
 var Biedma = depart.filter(ee.Filter.eq('NAM', 'Biedma'));
 var Cushamen = depart.filter(ee.Filter.eq('NAM', 'Cushamen'));
 var Gaiman = depart.filter(ee.Filter.eq('NAM', 'Gaiman'));
 var Rawson_Chubut = depart.filter(ee.Filter.eq('NAM', 'Rawson_Chubut'));
 var Sarmiento_Chubut = depart.filter(ee.Filter.eq('NAM', 'Sarmiento_Chubut'));
  var Futaleufú = depart.filter(ee.Filter.eq('NAM', 'Futaleufú'));
var departamentos = {
 'Tehuelches':Tehuelches ,
 'Escalante': Escalante ,
 'Florentino_Ameghino_Chubut': Florentino_Ameghino_Chubut,
 'Martires':Martires,
 'Paso_de_Indios': Paso_de_Indios ,
 'Languineo': Languineo,
 'Rio_Senger': Rio_Senger,
 'Telsen': Telsen,
 'Gastre': Gastre,
 'Biedma': Biedma ,
 'Cushamen':Cushamen,
 'Gaiman':Gaiman,
 'Rawson_Chubut': Rawson_Chubut ,
 'Sarmiento_Chubut': Sarmiento_Chubut ,
'Futaleufú' : Futaleufú 
};
print (departamentos,'departamentos');
///
/*possible years for study, you can add future years once the imagery exists and is hosted in Google Earth Engine*/
var YEARS = {'2016': 2016, '2017': 2017, '2018': 2018, '2019': 2019, '2020':2020};
var palette1 = [
  '24fe4f', // No Quemado // verde oscuro
  '9c3bff', // Quemado  // naranja
 ]; 
'f96700'
/* Create UI Panels */
var panel = ui.Panel({style: {width:'300px'}});
ui.root.insert(0,panel);
//intro
var intro = ui.Label('Producto Áreas Quemadas y Severidad de Incendios en Cordoba, Argentina (10m). Comixta Colombia-Argentina. IGAC-INTA 2020', 
{fontWeight: 'bold', fontSize: '18px', margin: '10px 5px'}
);
var subtitle = ui.Label('Mapa temporadas de incendios por departamento año 2017 a 2020. Indices dNBR derivados de Imagenes Sentinel 2, Bandas NIR y SWIR2',
  {margin: '0 0 0 12px',fontSize: '14px',color: 'gray'});
panel.add(intro).add(subtitle);
//select study area
var selectArea = ui.Select({
  items: Object.keys(departamentos),
});
selectArea.setPlaceholder('Seleccione un departamento o área de estudio...');
panel.add(ui.Label('1. Seleccione un departamento o el área de estudio')).add(selectArea); 
//select year
//var selectYear = ui.Select({
//  items: Object.keys(YEARS),
//});
//selectYear.setPlaceholder('Seleccione el año pre...');
//panel.add(ui.Label('2. Seleccione el año previo a la temporada de incendios meses Nov-Dic')).add(selectYear); 
//var selectYear2 = ui.Select({
//  items: Object.keys(YEARS),
//});
//selectYear2.setPlaceholder('Seleccione el año pos...');
//panel.add(ui.Label('3. Seleccione el año siguiente correspondiente a la temporada de incendios meses Ene-Abr')).add(selectYear2); 
panel.add(ui.Label('2. Seleccione el periodo de evaluación'));
var subtitle2 = ui.Label('Fecha pre-incendio',
  {margin: '0 0 0 12px',fontSize: '14px',color: 'gray'});
var fecha_1= ui.Textbox('YYYY-MM-DD', '2016-11-01');
var subtitle3 = ui.Label('Fecha intermedia',
  {margin: '0 0 0 12px',fontSize: '14px',color: 'gray'});
var fecha_2= ui.Textbox('YYYY-MM-DD', '2017-01-01');
var subtitle4 = ui.Label('Fecha pos-incendio',
  {margin: '0 0 0 12px',fontSize: '14px',color: 'gray'});
var fecha_3= ui.Textbox('YYYY-MM-DD', '2017-04-01');
panel.add(subtitle2).add(fecha_1).add(subtitle3).add(fecha_2).add(subtitle4).add(fecha_3)
///////////////////////////////////////////////////
panel.add(ui.Label('2. Seleccione los umbrales indice dNBR para cada nivel de severidad'));
var subtitle5 = ui.Label('Severidad Sin quema',
  {margin: '0 0 0 12px',fontSize: '14px',color: 'gray'});
var alta = ui.Textbox('100', '100');
var subtitle6 = ui.Label('Severidad Baja',
  {margin: '0 0 0 12px',fontSize: '14px',color: 'gray'});
var media= ui.Textbox('269', '269');
var subtitle7 = ui.Label('Severidad Media',
  {margin: '0 0 0 12px',fontSize: '14px',color: 'gray'});
var baja= ui.Textbox('439', '439');
var subtitle8 = ui.Label('Severidad Alta',
{margin: '0 0 0 12px',fontSize: '14px',color: 'gray'});
var sin_quema= ui.Textbox('659', '659');
panel.add(subtitle5).add(alta).add(subtitle6).add(media).add(subtitle7).add(baja).add(subtitle8).add(sin_quema)
/// Create Land Use Map
var mapbutton = ui.Label('3.Génere una imágen pos-incendio, un mapa de cicatrices con su severidad');
panel.add(mapbutton);
panel.add(ui.Button("Crear mapas",landMap));
var additional_directions = ui.Label
  ('Umbrales de severidad obtenidos de forma experimental para incendios en Colombia', 
  {margin: '0 0 0 12px',fontSize: '12px',color: 'gray'});
panel.add(additional_directions);
var outputPanel = ui.Panel();
print(outputPanel);
//var date_1 = '2016-11-01'; // first date of the pre-fire period
//var date_2 = '2017-01-01'; // last date of the pre-fire period and first date of the post-fire period
//var date_3 = '2017-04-01'; // last date of the post-fire period
function mask_s2(image) {
  var QABand = image.select('QA60')
  var B1Band = image.select('B1')
  var mask = QABand.bitwiseAnd(ee.Number(2).pow(10).int())
    .or(QABand.bitwiseAnd(ee.Number(2).pow(11).int()))
    .or(B1Band.gt(1500));
  var masked = image.updateMask(mask.eq(0));
  return masked;
}
function landMap(){
//Map.setCenter(-73.107486, 3.452082, 6);  
var selectedStudy_name = selectArea.getValue();
var studyArea = departamentos[selectedStudy_name];
print (studyArea,'studyArea');
Map.centerObject(studyArea,9);
//var date_1 = '2016-11-01'; // first date of the pre-fire period
//var date_2 = '2017-01-01'; // last date of the pre-fire period and first date of the post-fire period
//var date_3 = '2017-04-01'; //
//var yearNum = (ee.Number.parse(selectYear.getValue()));
//var yearNum2 = (ee.Number.parse(selectYear2.getValue()));
//var date_1 = ee.Date.fromYMD(yearNum,11,1);
//var date_2 = ee.Date.fromYMD(yearNum2,1,1);
//var date_3 = ee.Date.fromYMD(yearNum2,4,1);
var date_1 = fecha_1.getValue();
var date_2 = fecha_2.getValue();
var date_3 = fecha_3.getValue();
var post_image = ee.ImageCollection('COPERNICUS/S2')
        .filterBounds(studyArea)
        .filterDate(date_2, date_3)
        .map(mask_s2)
        .map(function(image) {
          return image
            .select(['B2', 'B3', 'B4', 'B8A', 'B11', 'B12'])
            .rename(['B', 'G', 'R', 'NIR', 'SWIR1', 'SWIR2'])
            .clip(studyArea);
        })
var pre_image = ee.ImageCollection('COPERNICUS/S2')
        .filterBounds(studyArea)
        .filterDate(date_1, date_2)
        .map(mask_s2)
        .map(function(image) {
          return image
            .select(['B2', 'B3', 'B4', 'B8A', 'B11', 'B12'])
            .rename(['B', 'G', 'R', 'NIR', 'SWIR1', 'SWIR2'])
            .clip(studyArea);
        });
var post_imageadd = post_image
      .map(function(image) {
        var nbr2 = image.normalizedDifference(['SWIR2', 'SWIR1']);
        var nbr = image.normalizedDifference(['SWIR2', 'NIR']);
        var nbrs = image.normalizedDifference(['NIR', 'SWIR2'])
        var ndvi = image.normalizedDifference(['NIR', 'R']);
        return image.addBands([nbr2.rename(['NBR2']), nbr.rename(['NBR']), nbrs.rename(['NBRs']),ndvi.rename(['NDVI'])]);
      });
var pre_imageadd = pre_image
      .map(function(image) {
        var nbr2 = image.normalizedDifference(['SWIR2', 'SWIR1']);
        var nbr = image.normalizedDifference(['SWIR2', 'NIR']);
        var nbrs = image.normalizedDifference(['NIR', 'SWIR2'])
        var ndvi = image.normalizedDifference(['NIR', 'R']);
        return image.addBands([nbr2.rename(['NBR2']), nbr.rename(['NBR']), nbrs.rename(['NBRs']),ndvi.rename(['NDVI'])]);
      });
var post_imagequality = post_imageadd.qualityMosaic('NBR');
var pre_imagequality = pre_imageadd.qualityMosaic('NBR');
var post_imagequalitys = post_imageadd.qualityMosaic('NBRs');
var pre_imagequalitys = pre_imageadd.qualityMosaic('NBRs');
var post_image_rgb = post_imagequality.select(['SWIR2', 'NIR', 'R'])
      .visualize({min: [0, 1000, 0], max: [3000, 4000, 3000]});
var pre_image_rgb = pre_imagequality.select(['SWIR2', 'NIR', 'R'])
      .visualize({min: [0, 1000, 0], max: [3000, 4000, 3000]});
var diff_image_rgb = post_imagequality.subtract(pre_imagequality);
//    Map.addLayer(pre_image_rgb, {}, 'Pre-fire', false);
Map.addLayer(post_image_rgb, {}, 'Imágenes posterior al incendio', true);
// Export the image to Cloud Storage.
Export.image.toDrive({
  image: post_image_rgb,
  description: 'post_incendio',
  fileNamePrefix: 'post_incendio',
  scale: 10,
  region: incendio
});
//    Map.addLayer(post_imagequality.subtract(pre_imagequality), {min:-100, max:100}, 'DNBR', false);
//zonas de entrenamiento
var newfc = burned.merge(unburned)
var classes1 = [
  {'landcover':1,'description':'Quemado'},
  {'landcover':2,'description':'No quemado'},
];
//se adiciona un columna de numeros aleatorios de los poligonos importados, use seed (1, 2, and 3)
var newfc2 = newfc.randomColumn('random', 2);
//Define las muestras de la clasificacion
var samples = post_imagequality.sampleRegions({
  collection: newfc2,   
  properties: ['landcover', 'random'], 
  scale: 30 });
  //split training points (90% and 10%)  
var training = samples.filterMetadata('random', 'less_than', 0.9);
var testing = samples.filterMetadata('random', 'not_less_than', 0.9);
////////////////////////////////CLASIFICACION CON RANDOM FOREST///////////////////////////////
var classifier_random = ee.Classifier.randomForest(50).train({
 features: training, 
  classProperty: 'landcover'});
  var classified_random = post_imagequality.classify(classifier_random);
Map.addLayer(classified_random, 
             {min: 0, max: 1,palette: palette1}, 'Cicatrices de incendios');
var list = [[-1,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,1,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,1]];
var weights = [[1, 2, 1],
             [2, 3, 2],
             [1, 2, 1]];
var kernel = ee.Kernel.fixed(3, 3,weights);
//var kernel = ee.Kernel.fixed(3,3,list1,-1,-1,false);
print(kernel);
var classified_random_kernel = classified_random.convolve(kernel)
//Map.addLayer(classified_random_kernel, 
//             {min: 1, max: 2,palette: palette1}, 'classification con Random Forest kernel');
/////////////////////////////// Areas quemadas dervidas de MODIS ///////////////////////////////
var mcd64 = ee.ImageCollection('MODIS/006/MCD64A1')
        .filterDate(date_2, date_3).select('BurnDate').count().gt(0).clip(studyArea);
Map.addLayer(mcd64, {min:0, max:1, palette:['#000000', '#ff0000']}, 'MCD64A1', false);
///////////////////////////////////Frecuencia de incendios////////////////////////////////
var VIS_PARAM_frecuencia = {"opacity":1,"bands":["BurnDate"],"min":1,"max":18,"palette":['blue',"2bfff5","f3ff3f","ff023c","e033ff"]};
var datasetMCD64 = ee.ImageCollection('MODIS/006/MCD64A1')
  .select('BurnDate')
  .map(function(image) {
      return image.clip(studyArea);
    });
var reclas = function(image) {
  return image.gt(0).unmask();
};
/////////////////////////////////////FRECUENCIA DE INCENDIOS//////////////////////////
var a2001 = datasetMCD64.filter(ee.Filter.date('2001-01-01','2001-12-31')).map(reclas).sum();
var a2002 = datasetMCD64.filter(ee.Filter.date('2002-01-01','2002-12-31')).map(reclas).sum();
var a2003 = datasetMCD64.filter(ee.Filter.date('2003-01-01','2003-12-31')).map(reclas).sum();
var a2004 = datasetMCD64.filter(ee.Filter.date('2004-01-01','2004-12-31')).map(reclas).sum();
var a2005 = datasetMCD64.filter(ee.Filter.date('2005-01-01','2005-12-31')).map(reclas).sum();
var a2006 = datasetMCD64.filter(ee.Filter.date('2006-01-01','2006-12-31')).map(reclas).sum();
var a2007 = datasetMCD64.filter(ee.Filter.date('2007-01-01','2007-12-31')).map(reclas).sum();
var a2008 = datasetMCD64.filter(ee.Filter.date('2008-01-01','2008-12-31')).map(reclas).sum();
var a2009 = datasetMCD64.filter(ee.Filter.date('2009-01-01','2009-12-31')).map(reclas).sum();
var a2010 = datasetMCD64.filter(ee.Filter.date('2010-01-01','2010-12-31')).map(reclas).sum();
var a2011 = datasetMCD64.filter(ee.Filter.date('2011-01-01','2011-12-31')).map(reclas).sum();
var a2012 = datasetMCD64.filter(ee.Filter.date('2012-01-01','2012-12-31')).map(reclas).sum();
var a2013 = datasetMCD64.filter(ee.Filter.date('2013-01-01','2013-12-31')).map(reclas).sum();
var a2014 = datasetMCD64.filter(ee.Filter.date('2014-01-01','2014-12-31')).map(reclas).sum();
var a2015 = datasetMCD64.filter(ee.Filter.date('2015-01-01','2015-12-31')).map(reclas).sum();
var a2016 = datasetMCD64.filter(ee.Filter.date('2016-01-01','2016-12-31')).map(reclas).sum();
var a2017 = datasetMCD64.filter(ee.Filter.date('2017-01-01','2017-12-31')).map(reclas).sum();
var a2018 = datasetMCD64.filter(ee.Filter.date('2018-01-01','2018-12-31')).map(reclas).sum();
var suma = a2001.add(a2002).add(a2003).add(a2004)
.add(a2005).add(a2006).add(a2007).add(a2008).add(a2009)
.add(a2010).add(a2011).add(a2012).add(a2013)
.add(a2014).add(a2015).add(a2016).add(a2017).add(a2018);
var suma = suma.toByte()
Map.addLayer(suma.clip(studyArea),VIS_PARAM_frecuencia, 'Frecuencia de incendios',false)
//////////////////////////////////Severidad/////////////////////////////////////////////////////
var post_mosaic_NBR = post_imagequalitys.select(['NBR'])
var pre_mosaic_NBR = pre_imagequalitys.select(['NBR'])
var DBRprenormalizada = pre_mosaic_NBR.multiply(1000)
var DBRposnormalizada = post_mosaic_NBR.multiply(1000)
var dNBRn = DBRposnormalizada.subtract(DBRprenormalizada).rename('dNBRn');
///Clasificar por rango de valores
var palette = ['fb0000','fb6212','f5ff36','24fe4f'];
//var thresholds = ee.Image([0.1, 0.269, 0.439, 0.659]);
var altau = alta.getValue();
var altam = media.getValue();
var altab = baja.getValue();
var altas = sin_quema.getValue();
var lataun = ee.Number.parse(altau);
var altamn = ee.Number.parse(altam);
var altabn = ee.Number.parse(altab);
var altasn = ee.Number.parse(altas);
/////////////////////////////////////////CLASIFICACION SEVERIDAD/////////////////////
//var thresholds = ee.Image([100, 269, 439, 659]);
var thresholds = ee.Image([lataun, altamn, altabn, altasn]);
var dNBRClasesn = dNBRn.lt(thresholds).reduce('sum');
var dNBRClasesrecorten = dNBRClasesn.clip(studyArea);
//Map.addLayer(dNBRClasesn, {min: 0, max: 4, palette: palette}, 'dNBRclassn',false);
var severity = dNBRClasesn.multiply(classified_random);
var palette3 = ['24fe4f','fb0000','fb6212','f5ff36','24fe4f'];
'f5ff36';
Map.addLayer(severity, {min: 0, max: 4, palette: palette3}, 'Severidad Area');
///////////////////////////////////VECTORIZACION QUEMA///////////////////////
var severityi = severity.clip(incendio);
var classes = ee.List([1,2,3])
  .map(function(n) {
    var classImage = severityi.eq(ee.Number(n));
    var vectors = classImage.updateMask(classImage)
      .reduceToVectors({
        reducer: ee.Reducer.countEvery(), 
        geometry: incendio, 
        scale: 10,
        maxPixels: 1e8})
      .geometry();
    return ee.Feature(vectors, {"class": n,"size":vectors.area(1)});
  });
var result = ee.FeatureCollection(classes);
Map.addLayer(result,{},'vectores incendio',false);
var severityiv =  severityi.clip(result)
Map.addLayer(severityiv,{min: 0, max: 4, palette: palette3},'Severidad_incendio');
///////////////////////////////////////EXPORTAR SEVERIDAD PAR AL INCENDIO/////////////////
Export.image.toDrive({
  image: severityiv.toDouble(),
  description: 'severidad',
  fileNamePrefix: 'severidad',
  scale: 10,
  region: incendio
});
///////////////////////////////////GRAFICAS SEVERIDAD/////////////////////////
var options = {
	title: 'Histograma dNBR ',
	fontSize: 10,
	hAxis: {title: 'dNBR'},
	vAxis: {title: 'count'},
	series: {
		1: {color: 'red'},
}};
var histogram = Chart.image.histogram(severityiv, incendio, 100)
	.setSeriesNames(['dNBR'])
	.setOptions(options);
print(histogram);
///////////////////////////////CALCULAR AREAS DE SEVERIDAD PARA EL INCENDIO/////////////
var area_clases_alta = severityiv.eq([1]).multiply(ee.Image.pixelArea()).divide(10000);
var reducerBuffer_alta = area_clases_alta.reduceRegion({
  reducer: ee.Reducer.sum(),
  maxPixels: 500000000,
  scale: 10,
  geometry: result
});
print ('Total Area (ha) Severidad alta', reducerBuffer_alta);
var area_clases_media = severityiv.eq([2]).multiply(ee.Image.pixelArea()).divide(10000);
var reducerBuffer_media = area_clases_media.reduceRegion({
  reducer: ee.Reducer.sum(),
  maxPixels: 500000000,
  scale: 10,
  geometry: result
});
print ('Total Area (ha) Severidad media', reducerBuffer_media);
var area_clases_baja = severityiv.eq([3]).multiply(ee.Image.pixelArea()).divide(10000);
var reducerBuffer_baja = area_clases_baja.reduceRegion({
  reducer: ee.Reducer.sum(),
  maxPixels: 500000000,
  scale: 10,
  geometry: result
});
print ('Total Area (ha) Severidad baja', reducerBuffer_media);
//////////////////////////////////////////////////////////////////
var palette4 = ['24fe4f', //Water - Black
               'f5ff36', //manglar - verde oscuro
               'fb6212', //laguna - azul
               'fb0000', //vsecundaria y pastos - verde claro
              ];
var palette5 = ['9c3bff']
// Create the panel for the legend items.
var legend2 = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px'
  }
});
var legend3 = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px'
  }
});
// Create and add the legend title.
var legendTitle = ui.Label({
  value: 'Severidad del Incendio indice dNBR',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
  }
});
legend2.add(legendTitle);
// Create and add the legend title.
var legendTitle2 = ui.Label({
  value: 'Cicatrices de incendios',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
  }
});
legend3.add(legendTitle2);
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
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};
// Get the list of palette colors and class names from the image.
dNBRClasesn.toDictionary().evaluate(function(result) {
  var names1 = ['Sin quema', 'Severidad baja', 'Severidad media', 'Severidad alta'];
  for (var i = 0; i < names1.length; i++) {
    legend2.add(makeRow(palette4[i], names1[i]));
  }
});
// Get the list of palette colors and class names from the image.
dNBRClasesn.toDictionary().evaluate(function(result) {
  var names1 = ['Áreas quemadas'];
  for (var i = 0; i < names1.length; i++) {
    legend3.add(makeRow(palette5[i], names1[i]));
  }
});
// Add the legend to the map.
Map.add(legend2);  
Map.add(legend3);    
}
////////////////////////////////////////////Vectores sobre las áreas quemadas /////////////////
Map.addLayer(doradillo,{palette: palette1},'doradillo',false);
Map.addLayer(inc_17042020,{palette: palette1},'inc_17042020',false);
inc_17042020
//var vectors = classified_random.reduceToVectors({
//  geometry: region,
//  scale: 30,//inicialmente, quando experimentei com 10, deu erro de "too many pixels"
  //para contornar isto, acrescentei maxPixels:1e9
  //como a resolução espacial do Lansat 8 é 30 metros, vou usar 30 na scale
//  reducer: ee.Reducer.countEvery(), 
//  geometryType: 'polygon',
//  eightConnected: false, //testar depois com true para ver a diferença
//  labelProperty: 'zone',
//  maxPixels: 1e9,
  //reducer: ee.Reducer.mean()
//})
//Map.addLayer(vectors,{palette: palette1},'vectores',false);