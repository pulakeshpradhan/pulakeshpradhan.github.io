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
    imageVisParam2 = ui.import && ui.import("imageVisParam2", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "b4"
        ],
        "min": 0.001531907413154841,
        "max": 0.6032188049890101,
        "palette": [
          "ff68a0",
          "fc3dff",
          "3b4aff",
          "49eeff",
          "38a93b",
          "49ff33"
        ]
      }
    }) || {"opacity":1,"bands":["b4"],"min":0.001531907413154841,"max":0.6032188049890101,"palette":["ff68a0","fc3dff","3b4aff","49eeff","38a93b","49ff33"]},
    imageVisParam3 = ui.import && ui.import("imageVisParam3", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "b4"
        ],
        "min": -0.0997276072204113,
        "max": 0.5107310552895069,
        "palette": [
          "ff68a0",
          "fc3dff",
          "3b4aff",
          "49eeff",
          "38a93b",
          "49ff33"
        ]
      }
    }) || {"opacity":1,"bands":["b4"],"min":-0.0997276072204113,"max":0.5107310552895069,"palette":["ff68a0","fc3dff","3b4aff","49eeff","38a93b","49ff33"]},
    imageVisParam4 = ui.import && ui.import("imageVisParam4", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "b4"
        ],
        "min": -0.12734862804412841,
        "max": 1.7957524919509888,
        "palette": [
          "ff68a0",
          "fc3dff",
          "3b4aff",
          "49eeff",
          "38a93b",
          "49ff33"
        ]
      }
    }) || {"opacity":1,"bands":["b4"],"min":-0.12734862804412841,"max":1.7957524919509888,"palette":["ff68a0","fc3dff","3b4aff","49eeff","38a93b","49ff33"]};
// CARGAMOS LA IMAGEN DE SILVANIA, IMPRIMOS LAS CARACTERISTICAS Y LA ADICIONAMOS 
// EN EL ESPACIO DE TRABAJO
var IMAGENSILVANIA = ee.Image('users/cartografia2016ud/SILVANIA');
print(IMAGENSILVANIA);
Map.addLayer(IMAGENSILVANIA,imageVisParam, 'SILVANIA' );
Map.centerObject(IMAGENSILVANIA);
// 1. ANALIZAMOS EL INDICE NDVI  (B4-B3)/(B4+B3)
var NDVI = IMAGENSILVANIA.expression ('float (NIR-ROJO) / float (NIR+ROJO)',{
    'ROJO': IMAGENSILVANIA.select ('b3'),
    'NIR': IMAGENSILVANIA.select ('b4')});
// ADICIONAMOS EL INDICE NDVI AL ESPECIO DE TRABAJO
Map.addLayer (NDVI, imageVisParam2, 'INDICE NDVI');
// 2. ANALIZAMOS EL INDICE GNDVI  (B4-B2)/(B4+B2)
var GNDVI = IMAGENSILVANIA.expression ('float (NIR-VERDE) / float (NIR+VERDE)',{
    'VERDE': IMAGENSILVANIA.select ('b2'),
    'NIR': IMAGENSILVANIA.select ('b4')});
// ADICIONAMOS EL INDICE GNDVI AL ESPECIO DE TRABAJO
Map.addLayer (GNDVI, imageVisParam3, 'INDICE GNDVI');
// ANALIZAMOS EL INDICE GCI  (B4/B2)-1
var GCI = IMAGENSILVANIA.expression ('float (NIR/VERDE)-1',{
    'VERDE': IMAGENSILVANIA.select ('b2'),
    'NIR': IMAGENSILVANIA.select ('b4')});
// ADICIONAMOS EL INDICE GCI AL ESPECIO DE TRABAJO
Map.addLayer (GCI, imageVisParam4, 'INDICE GCI');
// ADICINAMOS EL LAYER DE CUENCAS DE 4 ORDEN Y LIMITE DE MUNICIPIO
var CUENCAS4ORDEN = ee.FeatureCollection('users/cartografia2016ud/CUENCAS_4_ORDEN');
print(CUENCAS4ORDEN);
Map.addLayer(CUENCAS4ORDEN,{}, 'CUENCAS 4 ORDEN', 0);
var MUNICIPIO = ee.FeatureCollection('users/cartografia2016ud/MUNICIPIO_SILVANIA');
print(MUNICIPIO);
Map.addLayer(MUNICIPIO, {}, 'LIMITE MUNICIPAL', 0);
// LLAMAMOS LAS IMAGENES SENTINEL POR FILTRO DE AREA Y AÑO
var SENTINEL = ee.FeatureCollection('COPERNICUS/S2')
.filterBounds(CUENCAS4ORDEN)
.filter(ee.Filter.calendarRange(2018,2019, 'year'))
.filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'less_than',30);
print(SENTINEL);
// Definir bandas a seleccionar
//var bandas = ['B2','B3','B4','B5','B6','B7','B8','B8A','B9', 'B11','B12'];
//producto_filtrado = SENTINEL.select(bandas);
var TITULO_MAPA = ui.Label({
  value:'VISUALIZACION IMAGEN SATELITAL 2018 SILVANIA',
  style:{
    fontSize:'20px',
    fontWeight:'bold'
  }
});
// Agregamos el titulo al mapa
TITULO_MAPA.style().set('position', 'top-center');
Map.add(TITULO_MAPA);
//  Declaramos variables de texto dentro del panel
var TITULO = ui.Label({
  value:'"Herramienta Geoespacial para la contruccion '+
  'y diagnostico socioambiental del plan de desarrollo '+
  'territorial del municipio de Silvania Cundinamarca ',
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