var imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "b3",
          "b2",
          "b1"
        ],
        "min": 5.1000000000000005,
        "max": 249.9,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["b3","b2","b1"],"min":5.1000000000000005,"max":249.9,"gamma":1},
    imageVisParam2 = ui.import && ui.import("imageVisParam2", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "b4"
        ],
        "min": -0.965306122303009,
        "max": 0.7000000071525574,
        "palette": [
          "ff2d8e",
          "e827ff",
          "cea1ff",
          "47ff25"
        ]
      }
    }) || {"opacity":1,"bands":["b4"],"min":-0.965306122303009,"max":0.7000000071525574,"palette":["ff2d8e","e827ff","cea1ff","47ff25"]},
    imageVisParam3 = ui.import && ui.import("imageVisParam3", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "b4"
        ],
        "min": -0.9615094339847565,
        "max": 0.886037734746933,
        "palette": [
          "ff2d8e",
          "e827ff",
          "cea1ff",
          "47ff25"
        ]
      }
    }) || {"opacity":1,"bands":["b4"],"min":-0.9615094339847565,"max":0.886037734746933,"palette":["ff2d8e","e827ff","cea1ff","47ff25"]},
    imageVisParam4 = ui.import && ui.import("imageVisParam4", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "b4"
        ],
        "min": 0.020000000000000018,
        "max": 48.98,
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
    }) || {"opacity":1,"bands":["b4"],"min":0.020000000000000018,"max":48.98,"palette":["ffd3be","ffe087","ffee78","ff9dbd","ff35ae","d83dff","8c7eff","183fff","60fff0","41ff47","1dff02"]},
    imageVisParam5 = ui.import && ui.import("imageVisParam5", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "GNDVI",
          "GCI",
          "NDVI"
        ],
        "min": 0.14862995341420174,
        "max": 1.5986570592224598,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["GNDVI","GCI","NDVI"],"min":0.14862995341420174,"max":1.5986570592224598,"gamma":1};
// Creamos el titulo del mapa.
var TITULO_MAPA = ui.Label({
  value:'CARACTERIZACION DE INDICES ESPECTRALES',
  style:{
    fontSize:'20px',
    fontWeight:'bold'
  }
});
// Agregamos el titulo al mapa
TITULO_MAPA.style().set('position', 'top-center');
Map.add(TITULO_MAPA);
//Realizamos una llamada a la imagen tomada con dron 
var IMAGEN = ee.Image ('users/cartografia2016ud/UAN/VUELO_1_UAN');
//Imprimimos la informacion en la consola 
print (IMAGEN);
//adicionamos la imagen en el espacio de trabajo 
Map.addLayer (IMAGEN, imageVisParam, 'VUELO_DRON');
// Centramos la imagen
Map.centerObject(IMAGEN, 18);
// declaramos la variable indice NDVI
var NDVI = IMAGEN.expression ('float ((NIR-ROJO)/(NIR+ROJO))',{
    'NIR': IMAGEN.select ('b4'),
    'ROJO': IMAGEN.select ('b2')});
// Representamos la variable NDVI al espacio de trabajo
Map.addLayer (NDVI, imageVisParam2,'NDVI');
// declaramos la variable indice GNDVI
var GNDVI = IMAGEN.expression ('float ((NIR-VERDE)/(NIR+VERDE))',{
    'NIR': IMAGEN.select ('b4'),
    'VERDE': IMAGEN.select ('b1')});
// Representamos la variable GNDVI al espacio de trabajo
Map.addLayer(GNDVI, imageVisParam3,'GNDVI');
// declaramos la variable indice GCI
var GCI = IMAGEN.expression ('float (((NIR/VERDE)-1))',{
    'NIR': IMAGEN.select ('b4'),
    'VERDE': IMAGEN.select ('b1')});
// Representamos la variable GCI al espacio de trabajo
Map.addLayer (GCI, imageVisParam3,'GCI');
// Realizamos la composiion de los indices en una sola imagen RGB
var COMPOSICION = NDVI.rename('NDVI').addBands(GNDVI.rename('GNDVI')).addBands(GCI.rename('GCI'));
// Adicionamos la zona de estudio 
var ZONA_ESTUDIO = ee.FeatureCollection('users/cartografia2016ud/UAN/ZONA_ESTUDIO');
Map.addLayer(ZONA_ESTUDIO,{},'ZONA ESTUDIO');
Map.addLayer (COMPOSICION.clipToCollection(ZONA_ESTUDIO), imageVisParam5,'COMPOSICION');
//  Declaramos variables de texto dentro del panel
var TITULO = ui.Label({
  value:'"Application of geophysical methods '+
  'and identification of environmental '+
  'variables for searching graves '+
  'corresponding to burials related '+
  'to facts of human rights violations".  '+
  'AAFS-UNIVERSIDAD ANTONIO NARIÑO-UNIVERSIDAD DE CUNDINAMARCA',
  style:{
    fontSize:'14px',
    fontWeight:'bold'
  }
});
//Declaramos la variable panel y agregamos
var panel = ui.Panel()
panel.style().set({
  width: '300px',  // ancho del panel depende del texto
  position: 'bottom-left'
});
// Adicionamos las variables al panel
panel.add(TITULO);
ui.root.add(panel);
// Creamos el grafico para analizar los indices.
var VISUALIZACION = ui.Panel();
VISUALIZACION.style().set({
  width: '450px',
  position: 'bottom-left'
});
// Adicionamos el grafico
Map.add(VISUALIZACION);
// Registramos la función de dibujo al hacer clip.
Map.onClick(function(coords) {
  VISUALIZACION.clear();
  var PUNTO = ee.Geometry.Point(coords.lon, coords.lat);
  Map.layers().set(1, ui.Map.Layer(PUNTO, {color: '#BA4A00'}));
  var GRAFICA = ui.Chart.image.byRegion(COMPOSICION, PUNTO, null, 10);
  GRAFICA.setOptions({title: 'VALORES DE INDICES ESPECTRALES'});
  VISUALIZACION.add(GRAFICA); 
});