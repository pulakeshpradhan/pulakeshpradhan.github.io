var ZONA_INTERES = ui.import && ui.import("ZONA_INTERES", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -75.5967350400021,
                2.7658651619527164
              ],
              [
                -75.5967350400021,
                2.4914962347018927
              ],
              [
                -75.1298160946896,
                2.4914962347018927
              ],
              [
                -75.1298160946896,
                2.7658651619527164
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
      "mode": "FeatureCollection",
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
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[-75.5967350400021, 2.7658651619527164],
                  [-75.5967350400021, 2.4914962347018927],
                  [-75.1298160946896, 2.4914962347018927],
                  [-75.1298160946896, 2.7658651619527164]]], null, false),
            {
              "system:index": "0"
            })]),
    imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "B4",
          "B3",
          "B2"
        ],
        "min": 0.058960790410637856,
        "max": 0.6520253954082728,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["B4","B3","B2"],"min":0.058960790410637856,"max":0.6520253954082728,"gamma":1},
    imageVisParam2 = ui.import && ui.import("imageVisParam2", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "B7",
          "B5",
          "B3"
        ],
        "min": 0.016240571988746524,
        "max": 0.4302348793577403,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["B7","B5","B3"],"min":0.016240571988746524,"max":0.4302348793577403,"gamma":1};
// REALIZAMOS LA BUSQUEDA DE LA IMAGEN LANDSAT DEL 2007 
var imagen = ee.FeatureCollection('LANDSAT/LT05/C01/T1_TOA')
.filterBounds(ZONA_INTERES)
.filterDate ('2007-01-01' ,'2007-12-30');
var LANDSAT = ee.Image('LANDSAT/LT05/C01/T1_TOA/LT05_008058_20070927');
var LANDSAT_BANDAS = LANDSAT.select('B1','B2','B3', 'B4','B5','B7');
Map.addLayer(LANDSAT.clip(ZONA_INTERES), imageVisParam2, 'LANDSAT');
print (imagen, 'IMAGENES LANDSAT');
// LLAMAMOS LOS PUNTOS DE MUESTRA AL ESPACIO DE TRABAJO
var MUESTRAS_CAMPO = ee.FeatureCollection('users/cartografia2016ud/PROYECTO_ALEX_MON/MUESTRAS2');
Map.addLayer(MUESTRAS_CAMPO,{color: 'FFFFFF'}, 'PUNTO CAMPO');
Map.centerObject(MUESTRAS_CAMPO);
print (MUESTRAS_CAMPO);
// CONFIGURACION DEL GRAFICO DE LA FIRMA ESPECTRAL
var options = {
  title: 'COMPORTAMIENTO ESPECTRAL DE LAS MUESTRAS TOMADAS EN CAMPO',
  hAxis: {title: 'Longitud de onda'},
  vAxis: {title: 'Reflectividad'},
  lineWidth: 1,
  pointSize: 4,
  series: {
    0: {color: '00FF00'}, // CARAGUAJA
    1: {color: '0000FF'}, // LOS PIJAOS
    2: {color: 'FF0000'}, // BOTERO
    3: {color: '85440E'}, // LAS BRISAS
    4: {color: '34850E'}, // COMEPEZ
    5: {color: '20F3C3'}, // NUEVA YORK
    6: {color: '263BD1'}, // PACANDE
    7: {color: '082D42'}, // LAS ISLAS
    8: {color: 'B526D1'}, // AGUAS ABIERTAS
    9: {color: 'ED13B8'}, // PUENTE AMARILLO
}};
// DEFINIR EL EJE X O VARIABLES.
var Longitud_de_onda = ['B1', 'B2', 'B3', 'B4', 'B5', 'B7'];
// CREAR EL GRAFICO Y OPCIONES.
var FIRMA_ESPECTRAL = ui.Chart.image.regions(
    LANDSAT_BANDAS, MUESTRAS_CAMPO, ee.Reducer.mean(), 30, 'NOMBRE', Longitud_de_onda)
        .setChartType('ScatterChart')
        .setOptions(options);
// MOSTRAR EL GRAFICO.
print(FIRMA_ESPECTRAL);
//Exportamos la imagen incorporando las bandas deseadas, un nombre de archivo de salida y una resolución
Export.image.toDrive({
  image: LANDSAT_BANDAS,
  description: 'IMAGEN_LANDSAT_5',
  scale: 30,
  region: ZONA_INTERES});
// CREAMOS UN TITULO AL MAPA.
var TITULO_MAPA = ui.Label({
  value:'MAPA DE ESPACIALIZACION MUESTRAS EMBALSE DE BETANIA',
  style:{
    fontSize:'20px',
    fontWeight:'bold'
  }
});  
// AGREGAMOS UN TITULO AL MAPA Y ESTILO
TITULO_MAPA.style().set('position', 'top-center');
Map.add(TITULO_MAPA);
// CREAMOS EL PANEL PARA EL GRAFICO DE RETRODISPERSION.
var VISUALIZACION = ui.Panel();
VISUALIZACION.style().set({
  width: '550px',
  position: 'bottom-left'
});
// ADICIONAMOS EL PANEL PARA EL GRAFICO
Map.add(VISUALIZACION);
// REGISTRAMOS LA FUNCION DE DIBUJO AL HACER CLIP.
Map.onClick(function(coords) {
  VISUALIZACION.clear();
  var PUNTO = ee.Geometry.Point(coords.lon, coords.lat);
  Map.layers().set(1, ui.Map.Layer(PUNTO, {color: '#BA4A00'}));
  var GRAFICA = ui.Chart.image.regions(LANDSAT_BANDAS, PUNTO, null, 30);
  GRAFICA.setOptions({title: 'VALORES DE REFLECTIVIDAD'});
  VISUALIZACION.add(GRAFICA);
});