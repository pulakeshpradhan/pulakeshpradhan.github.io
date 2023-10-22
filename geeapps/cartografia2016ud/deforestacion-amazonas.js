var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -72.05911284345827,
                1.665645610196137
              ],
              [
                -72.05911284345827,
                1.1412076402598497
              ],
              [
                -71.41366606611452,
                1.1412076402598497
              ],
              [
                -71.41366606611452,
                1.665645610196137
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
        [[[-72.05911284345827, 1.665645610196137],
          [-72.05911284345827, 1.1412076402598497],
          [-71.41366606611452, 1.1412076402598497],
          [-71.41366606611452, 1.665645610196137]]], null, false),
    imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "VH"
        ],
        "min": -23.104885676243583,
        "max": -1.5678754034876314,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["VH"],"min":-23.104885676243583,"max":-1.5678754034876314,"gamma":1},
    imageVisParam2 = ui.import && ui.import("imageVisParam2", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "VV"
        ],
        "min": -23.69262496246951,
        "max": 7.7563006972349635,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["VV"],"min":-23.69262496246951,"max":7.7563006972349635,"gamma":1},
    imageVisParam3 = ui.import && ui.import("imageVisParam3", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "B8",
          "B4",
          "B3"
        ],
        "min": 499.64,
        "max": 16898.36,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["B8","B4","B3"],"min":499.64,"max":16898.36,"gamma":1},
    imageVisParam5 = ui.import && ui.import("imageVisParam5", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "B8",
          "B4",
          "B3"
        ],
        "min": 308.44,
        "max": 3209.56,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["B8","B4","B3"],"min":308.44,"max":3209.56,"gamma":1},
    BOSQUE = ui.import && ui.import("BOSQUE", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -71.60292881550843,
                2.694960473424755
              ],
              [
                -71.60451668324525,
                2.6876729119465548
              ],
              [
                -71.59327286305482,
                2.685443766798447
              ],
              [
                -71.59026878895814,
                2.689430504289154
              ],
              [
                -71.59125584187562,
                2.69530341642033
              ],
              [
                -71.59872311177308,
                2.697275336769214
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
                -71.58022659840638,
                2.6970181299484572
              ],
              [
                -71.58121365132386,
                2.690545073730845
              ],
              [
                -71.57537716450746,
                2.6856152396466024
              ],
              [
                -71.56353252949769,
                2.687715780082582
              ],
              [
                -71.56542080464418,
                2.6967609230733123
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
                -71.65201213278344,
                2.6727743099740744
              ],
              [
                -71.63433101095727,
                2.670287925256691
              ],
              [
                -71.60617854513696,
                2.6800619602829014
              ],
              [
                -71.63664843954614,
                2.6972949370069914
              ],
              [
                -71.65613200583032,
                2.6765467461319
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {
        "COBERTURA": "BOSQUES"
      },
      "color": "#3bff4b",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #3bff4b */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[-71.60292881550843, 2.694960473424755],
                  [-71.60451668324525, 2.6876729119465548],
                  [-71.59327286305482, 2.685443766798447],
                  [-71.59026878895814, 2.689430504289154],
                  [-71.59125584187562, 2.69530341642033],
                  [-71.59872311177308, 2.697275336769214]]]),
            {
              "COBERTURA": "BOSQUES",
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-71.58022659840638, 2.6970181299484572],
                  [-71.58121365132386, 2.690545073730845],
                  [-71.57537716450746, 2.6856152396466024],
                  [-71.56353252949769, 2.687715780082582],
                  [-71.56542080464418, 2.6967609230733123]]]),
            {
              "COBERTURA": "BOSQUES",
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-71.65201213278344, 2.6727743099740744],
                  [-71.63433101095727, 2.670287925256691],
                  [-71.60617854513696, 2.6800619602829014],
                  [-71.63664843954614, 2.6972949370069914],
                  [-71.65613200583032, 2.6765467461319]]]),
            {
              "COBERTURA": "BOSQUES",
              "system:index": "2"
            })]),
    DEFORESTACION = ui.import && ui.import("DEFORESTACION", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -72.15733169331402,
                2.458238375153388
              ],
              [
                -72.15510009541363,
                2.4620114447375716
              ],
              [
                -72.15784667744488,
                2.4633834673930366
              ],
              [
                -72.15939162983746,
                2.4598676565106277
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
                -72.15278266682476,
                2.458066871736896
              ],
              [
                -72.15166686787457,
                2.4606394206694437
              ],
              [
                -72.15312598957867,
                2.4614111843815447
              ],
              [
                -72.15407012715191,
                2.4590958919052235
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {
        "COBERTURA": "DEFORESTACIONES"
      },
      "color": "#e6ff1e",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #e6ff1e */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[-72.15733169331402, 2.458238375153388],
                  [-72.15510009541363, 2.4620114447375716],
                  [-72.15784667744488, 2.4633834673930366],
                  [-72.15939162983746, 2.4598676565106277]]]),
            {
              "COBERTURA": "DEFORESTACIONES",
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-72.15278266682476, 2.458066871736896],
                  [-72.15166686787457, 2.4606394206694437],
                  [-72.15312598957867, 2.4614111843815447],
                  [-72.15407012715191, 2.4590958919052235]]]),
            {
              "COBERTURA": "DEFORESTACIONES",
              "system:index": "1"
            })]),
    imageVisParam4 = ui.import && ui.import("imageVisParam4", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "VH"
        ],
        "min": 260.9555707117594,
        "max": 1354.5839090888744,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["VH"],"min":260.9555707117594,"max":1354.5839090888744,"gamma":1},
    imageVisParam6 = ui.import && ui.import("imageVisParam6", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "VH"
        ],
        "max": 2,
        "palette": [
          "30ff2d",
          "2367ff",
          "ff1979"
        ]
      }
    }) || {"opacity":1,"bands":["VH"],"max":2,"palette":["30ff2d","2367ff","ff1979"]},
    imageVisParam7 = ui.import && ui.import("imageVisParam7", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "VV"
        ],
        "min": -10.49452472886191,
        "max": -4.270728713372136,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["VV"],"min":-10.49452472886191,"max":-4.270728713372136,"gamma":1},
    imageVisParam8 = ui.import && ui.import("imageVisParam8", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "VH"
        ],
        "min": -23.722895191602458,
        "max": -7.9298277842942,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["VH"],"min":-23.722895191602458,"max":-7.9298277842942,"gamma":1},
    imageVisParam9 = ui.import && ui.import("imageVisParam9", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "VV"
        ],
        "min": -8.377835776672567,
        "max": -6.483670580821715,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["VV"],"min":-8.377835776672567,"max":-6.483670580821715,"gamma":1},
    imageVisParam10 = ui.import && ui.import("imageVisParam10", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "VV"
        ],
        "min": -12.070480172519188,
        "max": -4.362223501293173,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["VV"],"min":-12.070480172519188,"max":-4.362223501293173,"gamma":1},
    imageVisParam11 = ui.import && ui.import("imageVisParam11", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "VV"
        ],
        "min": -9.8752139785848,
        "max": -4.0199016081309455,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["VV"],"min":-9.8752139785848,"max":-4.0199016081309455,"gamma":1},
    imageVisParam12 = ui.import && ui.import("imageVisParam12", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "VV"
        ],
        "min": -10.651815365299926,
        "max": -3.628035037164171,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["VV"],"min":-10.651815365299926,"max":-3.628035037164171,"gamma":1},
    imageVisParam13 = ui.import && ui.import("imageVisParam13", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "VV"
        ],
        "min": -11.155362441789936,
        "max": -4.343547629237475,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["VV"],"min":-11.155362441789936,"max":-4.343547629237475,"gamma":1},
    imageVisParam14 = ui.import && ui.import("imageVisParam14", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "VV"
        ],
        "min": -11.980692360921243,
        "max": -4.1369479456707134,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["VV"],"min":-11.980692360921243,"max":-4.1369479456707134,"gamma":1},
    imageVisParam15 = ui.import && ui.import("imageVisParam15", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "FILTRO2017_VV",
          "FILTRO2020_VH",
          "FILTRO2017_VV"
        ],
        "min": -14.236676971042387,
        "max": -4.902239630308852,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["FILTRO2017_VV","FILTRO2020_VH","FILTRO2017_VV"],"min":-14.236676971042387,"max":-4.902239630308852,"gamma":1},
    imageVisParam16 = ui.import && ui.import("imageVisParam16", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "B11",
          "B8",
          "B3"
        ],
        "min": 441.64,
        "max": 3976.36,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["B11","B8","B3"],"min":441.64,"max":3976.36,"gamma":1},
    imageVisParam17 = ui.import && ui.import("imageVisParam17", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "VH"
        ],
        "min": -16.75736546544647,
        "max": -11.060897729330383,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["VH"],"min":-16.75736546544647,"max":-11.060897729330383,"gamma":1},
    imageVisParam18 = ui.import && ui.import("imageVisParam18", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "VH"
        ],
        "min": -17.00120961897112,
        "max": -12.170108116051711,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["VH"],"min":-17.00120961897112,"max":-12.170108116051711,"gamma":1},
    imageVisParam19 = ui.import && ui.import("imageVisParam19", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "FILTRO2017_VV",
          "FILTRO2020_VH",
          "FILTRO2020_VV"
        ],
        "min": -20.970421163564147,
        "max": -3.983305135169882,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["FILTRO2017_VV","FILTRO2020_VH","FILTRO2020_VV"],"min":-20.970421163564147,"max":-3.983305135169882,"gamma":1},
    imageVisParam20 = ui.import && ui.import("imageVisParam20", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "VH"
        ],
        "max": 2,
        "palette": [
          "ff4223",
          "2367ff",
          "40ff1d"
        ]
      }
    }) || {"opacity":1,"bands":["VH"],"max":2,"palette":["ff4223","2367ff","40ff1d"]},
    PERDIDA = ui.import && ui.import("PERDIDA", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -72.09337120871196,
                2.0124997399583346
              ],
              [
                -72.09491616110454,
                2.0085539588156816
              ],
              [
                -72.09096794943461,
                2.0051228370316023
              ],
              [
                -72.08633309225688,
                1.984192838823731
              ],
              [
                -72.0818698964561,
                1.9876240042976014
              ],
              [
                -72.08135491232524,
                1.99671655828375
              ],
              [
                -72.08547478537211,
                2.0083824028975186
              ],
              [
                -72.09131127218852,
                2.0140437386768495
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {
        "TIPO": "PERDIDABOSQUE"
      },
      "color": "#0f15d6",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": true
    }) || 
    /* color: #0f15d6 */
    /* shown: false */
    /* locked: true */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[-72.09337120871196, 2.0124997399583346],
                  [-72.09491616110454, 2.0085539588156816],
                  [-72.09096794943461, 2.0051228370316023],
                  [-72.08633309225688, 1.984192838823731],
                  [-72.0818698964561, 1.9876240042976014],
                  [-72.08135491232524, 1.99671655828375],
                  [-72.08547478537211, 2.0083824028975186],
                  [-72.09131127218852, 2.0140437386768495]]]),
            {
              "TIPO": "PERDIDABOSQUE",
              "system:index": "0"
            })]),
    imageVisParam22 = ui.import && ui.import("imageVisParam22", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "VH"
        ],
        "palette": [
          "33ff43",
          "ff1f53"
        ]
      }
    }) || {"opacity":1,"bands":["VH"],"palette":["33ff43","ff1f53"]};
// LLAMAMOS LA COLLECION SENTINEL-1 RADAR 2017
var RADAR2017= ee.ImageCollection('COPERNICUS/S1_GRD')
    .filter(ee.Filter.listContains('transmitterReceiverPolarisation','VV'))
    .filter(ee.Filter.listContains('transmitterReceiverPolarisation','VH'))
    .filterBounds (geometry)
    .filterDate ('2017-06-01' ,'2017-06-30');
print (RADAR2017,'RADAR2017');
// LLAMAMOS LA COLLECION SENTINEL-1 RADAR 2020 
var RADAR2020= ee.ImageCollection('COPERNICUS/S1_GRD')
    .filter(ee.Filter.listContains('transmitterReceiverPolarisation','VV'))
    .filter(ee.Filter.listContains('transmitterReceiverPolarisation','VH'))
    .filterBounds (geometry)
    .filterDate ('2020-05-01' ,'2020-05-14');
print (RADAR2020, 'RADAR2020');
// LLAMAMOS LA IMAGEN SENTINEL-1 RADAR 2017 
var RADAR2017IMAGEN = ee.Image('COPERNICUS/S1_GRD/S1B_IW_GRDH_1SDV_20170626T230406_20170626T230431_006228_00AF2D_9C25');
print (RADAR2017IMAGEN, 'RADAR2017IMAGEN');
Map.addLayer(RADAR2017IMAGEN, imageVisParam9, 'RADAR2017IMAGEN',0);
// LLAMAMOS LA IMAGEN SENTINEL-1 RADAR 2020
var RADAR2020IMAGEN = ee.Image('COPERNICUS/S1_GRD/S1B_IW_GRDH_1SDV_20200505T230422_20200505T230447_021453_028BBC_0AC1');
print (RADAR2020IMAGEN, 'RADAR2020IMAGEN');
Map.addLayer(RADAR2020IMAGEN,imageVisParam10, 'RADAR2020IMAGEN',0 );
// SELECIONAMOS POLARIZACIONES VV Y VH EN 2017 Y 2020
var RADARIMAGEN2017VV = RADAR2017IMAGEN.select ('VV');
var RADARIMAGEN2017VH = RADAR2017IMAGEN.select ('VH');
var RADARIMAGEN2020VV = RADAR2020IMAGEN.select ('VV');
var RADARIMAGEN2020VH = RADAR2020IMAGEN.select ('VH');
//APLICAMOS FILTROS A LAS POLARIZACIONES VV Y VH 2017 Y 2020 PARA ELIMINAR EL RUIDO Y CARGAMOS EN EL MAPA
var FILRADARIMAGEN2017VV = RADARIMAGEN2017VV.focal_mean( 30, 'circle', 'meters');
var FILRADARIMAGEN2017VH = RADARIMAGEN2017VH.focal_mean( 30, 'circle', 'meters');
var FILRADARIMAGEN2020VV = RADARIMAGEN2020VV.focal_mean( 30, 'circle', 'meters');
var FILRADARIMAGEN2020VH = RADARIMAGEN2020VH.focal_mean( 30, 'circle', 'meters');
Map.addLayer(FILRADARIMAGEN2017VV, imageVisParam11, 'FIL2017VV',0);
Map.addLayer(FILRADARIMAGEN2017VH, imageVisParam17, 'FIL2017VH',0);
Map.addLayer(FILRADARIMAGEN2020VV, imageVisParam13,'FIL2020VV',0);
Map.addLayer(FILRADARIMAGEN2020VH, imageVisParam18, 'FIL2020VH',0);
// REALIZAMOS LA COMPOSICION DE LAS CUATRO POLARIZACIONES CON FILTRO 2017 VV HH, 2020 VV Y VH Y CARGAMOS AL MAPA
var COMP_FIL_2017_2020 = FILRADARIMAGEN2017VV.rename('FILTRO2017_VV').addBands(FILRADARIMAGEN2017VH.rename('FILTRO2017_VH')).addBands(FILRADARIMAGEN2020VV.rename('FILTRO2020_VV')).addBands(FILRADARIMAGEN2020VH.rename('FILTRO2020_VH'));
Map.addLayer(COMP_FIL_2017_2020, imageVisParam19, 'COMPFIL2017_2020', 0);
// ANALIZAMOS POR MEDIO DE GRAFICAS LOS VALORES DE RETRODISPERSION 
var BOSQUE = ui.Chart.image.byRegion(COMP_FIL_2017_2020, BOSQUE.select('COBERTURA'), ee.Reducer.mean(), 10);
print(BOSQUE,'BOSQUE');
var DEFORESTACION = ui.Chart.image.byRegion(COMP_FIL_2017_2020, DEFORESTACION.select('COBERTURA'), ee.Reducer.mean(), 10);
print(DEFORESTACION,'DEFORESTACION');
// LLAMAMOS LA COLECCION DE SENTINEL-2 
var SENTINEL = ee.ImageCollection("COPERNICUS/S2_SR")
      .filterBounds (geometry)
      .filterDate ('2019-01-01' ,'2019-03-25')
      .filterMetadata ('CLOUDY_PIXEL_PERCENTAGE', 'Less_Than', 20);
// IMPRIMIMOS LAS CARACTERISTICAS DE LAS IMAGENES SENTINEL-2
print (SENTINEL, 'SENTINEL-2');
// DECLARAMOS UNA VARIABLE PARA UNA IMAGEN SENTINEL-2
var cargasentinel = ee.Image('COPERNICUS/S2_SR/20190225T151659_20190225T151702_T18NYH');
var cargasentinel2 = ee.Image('COPERNICUS/S2_SR/20190225T151659_20190225T151702_T18NZH');
var cargasentinel22 = ee.Image('COPERNICUS/S2_SR/20190123T150719_20190123T150955_T18NZG');
Map.addLayer(cargasentinel,imageVisParam16,'SENTINEL-2', 0);
Map.addLayer(cargasentinel2,imageVisParam16,'SENTINEL-2', 0);
Map.addLayer(cargasentinel22,imageVisParam16,'SENTINEL-2', 0);
var zonas = FILRADARIMAGEN2020VH.gt(-18).add(FILRADARIMAGEN2020VH.gt(-17)).add(FILRADARIMAGEN2020VH.gt(-5));
Map.addLayer (zonas, imageVisParam20, 'CLASIFICACION',0);
// analizamos los bosques por medio de operadores morfologicos
var IMAGENPRUEBA = FILRADARIMAGEN2020VH
              .select('VH').lt(-17.5).and(FILRADARIMAGEN2020VH.select('VH').lt(-18));
// Define a kernel.
var kernel = ee.Kernel.circle({radius: 1});
// Realice una erosión seguida de una dilatación, visualización.
var IMAGENMORFO = IMAGENPRUEBA
             .focal_min({kernel: kernel, iterations: 2})
             .focal_max({kernel: kernel, iterations: 2});
Map.addLayer(IMAGENMORFO, {}, 'IMAGEN DILATADA EROSIONADA',0);
// ESPACIALIZAMOS LAS AREAS PROTEGIDAS
var PROTEGIDAS = ee.FeatureCollection('users/cartografia2016ud/PARQUES_NATURALES')
.filterMetadata ('nombre', 'equals', 'Nukak');
print(PROTEGIDAS, 'AREAS PROTEGIDAS');
Map.addLayer(PROTEGIDAS, {}, 'PARQUE NUKAK',0);
Map.addLayer(IMAGENPRUEBA.clip(PROTEGIDAS), imageVisParam22, 'ZONAS DEFORESTADAS');
Map.centerObject(PERDIDA);
//CALCULAR AREAS EN LA IMAGENPRUEBA
var areaImage = IMAGENPRUEBA.multiply(ee.Image.pixelArea());
// SUMA LOS VALORES DE LOS PIXELES.
var ESTADISTICA = areaImage.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: PERDIDA,
  scale: 10,
  maxPixels: 1e9
});
print('PIXELES DE PERDIDA DE BOSQUE: ', ESTADISTICA, 'METROS CUADRADOS');
// CREAMOS UN TITULO AL MAPA.
var TITULO_MAPA = ui.Label({
  value:'ZONAS DE DEFORESTACION 2020-2017 RESERVA NUKAK',
  style:{
    fontSize:'20px',
    fontWeight:'bold'
  }
});
// AGREGAMOS UN TITULO AL MAPA Y ESTILO
TITULO_MAPA.style().set('position', 'top-center');
Map.add(TITULO_MAPA);
// DECLARAMOS VARIABLES DE TEXTO DENTRO DEL PANEL 
var TITULO = ui.Label({
  value:'Descripcion: Esta aplicacion esta diseñada para '+
  'caracterizar y ubicar, zonas deforestadas '+
  'utilizando imagenes de radar Sentinel-1, '+
  'a estas imagenes se les aplico un filtro y se '+
  'analizo el coeficiente de retrodispersion. '+
  'Las areas de color rojo, son zonas de deforestacion, '+
  'para ubicarlas y graficar sus valores, pique con el mause.',
  style:{
    fontSize:'14px',
    fontWeight:'bold'
  }
});
// DECARAMOS LAS VARIABLES LONGITUD Y LATITUD 
var lon = ui.Label();
var lat = ui.Label();
//DECLARAMOS LA VARIABLE PANEL Y AGREGAMOS
var panel = ui.Panel()
panel.style().set({
  width: '300px',  // ancho del panel depende del texto
  position: 'bottom-left'
});
// ADICIONAMOS LAS VARIABLES AL PANEL 
panel.add(TITULO);
panel.add(lon);
panel.add(lat);
ui.root.add(panel);
// AGREGAMOS LA FUNCION DE COORDENADAS
Map.onClick(function(coords) {
  lon.setValue('lon : ' + coords.lon);
  lat.setValue('lat : ' + coords.lat);
  });
// CREAMOS EL PANEL PARA EL GRAFICO DE RETRODISPERSION.
var VISUALIZACION = ui.Panel();
VISUALIZACION.style().set({
  width: '450px',
  position: 'bottom-left'
});
// ADICIONAMOS EL PANEL PARA EL GRAFICO
Map.add(VISUALIZACION);
// REGISTRAMOS LA FUNCION DE DIBUJO AL HACER CLIP.
Map.onClick(function(coords) {
  VISUALIZACION.clear();
  var PUNTO = ee.Geometry.Point(coords.lon, coords.lat);
  Map.layers().set(1, ui.Map.Layer(PUNTO, {color: '#BA4A00'}));
  var GRAFICA = ui.Chart.image.byRegion(COMP_FIL_2017_2020, PUNTO, null, 10);
  GRAFICA.setOptions({title: 'VALORES DE RETRODISPERSION'});
  VISUALIZACION.add(GRAFICA);
});