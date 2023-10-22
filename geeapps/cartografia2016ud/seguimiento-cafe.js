var imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "b4",
          "b2",
          "b1"
        ],
        "min": 12.940000000000001,
        "max": 250.06,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["b4","b2","b1"],"min":12.940000000000001,"max":250.06,"gamma":1},
    imageVisParam2 = ui.import && ui.import("imageVisParam2", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "b4"
        ],
        "min": 2.137349396944046,
        "max": 16.68192771077156,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["b4"],"min":2.137349396944046,"max":16.68192771077156,"gamma":1},
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.MultiPoint(),
    imageVisParam3 = ui.import && ui.import("imageVisParam3", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "b4"
        ],
        "min": -0.5253395032882691,
        "max": 0.6990429353713989,
        "palette": [
          "ffd3be",
          "ffe087",
          "ffee78",
          "ff9dbd",
          "ff35ae",
          "d83dff",
          "8c7eff",
          "183fff",
          "60fff0",
          "41ff47",
          "1dff02"
        ]
      }
    }) || {"opacity":1,"bands":["b4"],"min":-0.5253395032882691,"max":0.6990429353713989,"palette":["ffd3be","ffe087","ffee78","ff9dbd","ff35ae","d83dff","8c7eff","183fff","60fff0","41ff47","1dff02"]};
//Realizamos una llamada a la imagen tomada con dron banda verde
var IMAGEN = ee.Image ('users/cartografia2016ud/IMAGEN_DRON');
//Imprimimos la informacion de la imagen multiespectral 
print (IMAGEN);
//adicionamos la imagen al espacio de trabajo 
Map.addLayer (IMAGEN, imageVisParam, 'RGB');
// Centramos la imagen
Map.centerObject(IMAGEN, 18);
// declaramos la variable indice NDVI
var NDVI = IMAGEN.expression ('float ((NIR-ROJO)/(NIR+ROJO))',{
    'NIR': IMAGEN.select ('b4'),
    'ROJO': IMAGEN.select ('b2')});
// Representamos la variable ndvi al espacio de trabajo
Map.addLayer (NDVI, imageVisParam3,'NDVI');
// declaramos la variable indice GNDVI
var GNDVI = IMAGEN.expression ('float ((NIR-VERDE)/(NIR+VERDE))',{
    'NIR': IMAGEN.select ('b4'),
    'VERDE': IMAGEN.select ('b1')});
// Representamos la variable GNDVI al espacio de trabajo
Map.addLayer(GNDVI, imageVisParam3,'GNDVI');