/******************************RPI ENGINE 1.1**********************************
* Script: RPI Engine 1.1                                                      *
* Autor v1.1: Eduardo Moreno Gil                                              *
* Fecha: 10 de Diciembre de 2018                                              *
* Título del PFM: Visualización en un entorno web de la regeneración          *
*                 post-incendio a partir de series multitemporales            *
*                 de imágenes Landsat.                                        *
* Proyecto: SERGISAT (www.sergisat.es)                                        *
* Contacto: eduardomorenogil@gmail.com                                        *
* URL: https://code.earthengine.google.com/cca8d5a8403c91ff1e06118ccb42c67f   *
*                                                                             *
* Estado actual: En desarrollo                                                *
* Descripción: La herramienta desarrollada mediante Google Earth              *
*   Engine se ha centrado en estudiar el incendio de Uncastillo,              *
*   Zaragoza. El objetivo de la herramienta ha sido calcular y                *
*   visualizar la regeneración post-incendio para el Gran Incendio            *
*   Forestal (GIF) seleccionado. Para ello se han utilizado las colecciones   *
*   de imagenes Landsat. Además de este área de estudio, la implemetación     *
*   de la herramienta también permite seleccionar otros GIF del               *
*   proyecto SERGISAT. RPI Engine presenta las siguientes funciones:          *
*                                                                             *
*   -A partir de estas colecciones se han realizado las operaciones           *
*     para extraer los índices NDVI, NBR y TCW. Una vez obtenidos estos       *
*     índices, se han filtrado las fechas para el periodo estival.            *
*     Haciendo click en el mapa podemos extraer las trayectorias de los       *
*     índices para el pixel selecionado.                                      * 
*   -Una vez seleccionado el incendio de Uncastillo para un índice concreto   *
*     se puede calcular y representar las tendencias que han supuesto una     *
*     trayectoria continua en el periodo analizado. En este caso se           *
*     presentan dos opciones. Podemos calcular las tendencias para todo el    *
*     área del incendio y/o para la cobertura forestal determinada por la     *
*     colección PALSAR.                                                       *
*   -El límite de los incendios es representable mediante un botón tras la    *
*     selección del GIF deseado. Al igual que lo serían la cobertura          *
*     forestal previa al incendio, la severidad del incendio y el limite      *
*     de la cobertura forestal a 2016.                                        *
*   -Hasta la fecha los valores de las capas de severidad y cobertura         *
*     forestal preincendio deben consultarse haciendo uso del inspector.      *
*   -Otro aspecto importante es que se pueden descargar los datos de las      *
*     trayectorias.                                                           *
*                                                                             *
* Errores: El visor RPI Engine, actualmente presenta ciertos errores de       *
*   programación. A pesar de estos errores, no pierde funcionalidad. A        *
*   medida que evolucione el visor, estos errores se iran corrigiendo.        *
*                                                                             *
* Parámetros: Es posible modificar los parámetros relacionados con el         *
*   algoritmo formaTrend así como el filtrado de las fechas si se desea       *
*   copiando este código en su script personal.                               *
*                                                                             * 
******************************************************************************/
///////////////////////////////////////////////////////////////////////////////
////////////////////////// DATOS DE ENTRADA ///////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//Filtro imagen problema de coincidencia
var filtromontmajor = /* color: #98ff00 */ee.Geometry.Polygon(
        [[[-0.7176797127012833, 40.89013090322373],
          [-0.6297890877012833, 40.4568472789591],
          [0.02939059979871672, 40.4066719138688],
          [0.16122653729871672, 40.823655202636886]]]);
// Datos de entrada para la transformación TCW
// LANDSAT 5 TOA
var L51 = ee.ImageCollection([
ee.Image('LANDSAT/LT05/C01/T1_TOA/LT05_199032_19940629').clip(filtromontmajor),
ee.Image('LANDSAT/LT05/C01/T1_TOA/LT05_199032_19940816').clip(filtromontmajor),
ee.Image('LANDSAT/LT05/C01/T1_TOA/LT05_199032_19950718').clip(filtromontmajor),
ee.Image('LANDSAT/LT05/C01/T1_TOA/LT05_199032_19970824').clip(filtromontmajor),
ee.Image('LANDSAT/LT05/C01/T1_TOA/LT05_199032_19980811').clip(filtromontmajor),
ee.Image('LANDSAT/LT05/C01/T1_TOA/LT05_199032_19990814').clip(filtromontmajor),
ee.Image('LANDSAT/LT05/C01/T1_TOA/LT05_199032_20000816').clip(filtromontmajor),
ee.Image('LANDSAT/LT05/C01/T1_TOA/LT05_199032_20010702').clip(filtromontmajor),
ee.Image('LANDSAT/LT05/C01/T1_TOA/LT05_199032_20020619').clip(filtromontmajor),
ee.Image('LANDSAT/LT05/C01/T1_TOA/LT05_199032_20030724').clip(filtromontmajor),
ee.Image('LANDSAT/LT05/C01/T1_TOA/LT05_199032_20040726').clip(filtromontmajor),
ee.Image('LANDSAT/LT05/C01/T1_TOA/LT05_199032_20050713').clip(filtromontmajor),
ee.Image('LANDSAT/LT05/C01/T1_TOA/LT05_199032_20060716').clip(filtromontmajor),
ee.Image('LANDSAT/LT05/C01/T1_TOA/LT05_199032_20070804').clip(filtromontmajor),
ee.Image('LANDSAT/LT05/C01/T1_TOA/LT05_199032_20080619').clip(filtromontmajor),
ee.Image('LANDSAT/LT05/C01/T1_TOA/LT05_199032_20090724').clip(filtromontmajor),
ee.Image('LANDSAT/LT05/C01/T1_TOA/LT05_199032_20100727').clip(filtromontmajor),
ee.Image('LANDSAT/LT05/C01/T1_TOA/LT05_199032_20110815').clip(filtromontmajor),
'LANDSAT/LT05/C01/T1_TOA/LT05_199033_19940629',
'LANDSAT/LT05/C01/T1_TOA/LT05_199033_19940816',
'LANDSAT/LT05/C01/T1_TOA/LT05_199033_19950718',
'LANDSAT/LT05/C01/T1_TOA/LT05_199033_19960704',
'LANDSAT/LT05/C01/T1_TOA/LT05_199033_19970707',
'LANDSAT/LT05/C01/T1_TOA/LT05_199033_19980726',
'LANDSAT/LT05/C01/T1_TOA/LT05_199033_19990729',
'LANDSAT/LT05/C01/T1_TOA/LT05_199033_20000731',
'LANDSAT/LT05/C01/T1_TOA/LT05_199033_20010718',
'LANDSAT/LT05/C01/T1_TOA/LT05_199033_20030809',
'LANDSAT/LT05/C01/T1_TOA/LT05_199033_20040726',
'LANDSAT/LT05/C01/T1_TOA/LT05_199033_20050729',
'LANDSAT/LT05/C01/T1_TOA/LT05_199033_20060716',
'LANDSAT/LT05/C01/T1_TOA/LT05_199033_20070719',
'LANDSAT/LT05/C01/T1_TOA/LT05_199033_20080502',
'LANDSAT/LT05/C01/T1_TOA/LT05_199033_20090724',
'LANDSAT/LT05/C01/T1_TOA/LT05_199033_20100812',
'LANDSAT/LT05/C01/T1_TOA/LT05_199033_20110628',
'LANDSAT/LT05/C01/T1_TOA/LT05_200031_19960609',
'LANDSAT/LT05/C01/T1_TOA/LT05_200031_19940722',
'LANDSAT/LT05/C01/T1_TOA/LT05_200031_19940823',
'LANDSAT/LT05/C01/T1_TOA/LT05_200031_19950810',
'LANDSAT/LT05/C01/T1_TOA/LT05_200031_19970714',
'LANDSAT/LT05/C01/T1_TOA/LT05_200031_19980327',
'LANDSAT/LT05/C01/T1_TOA/LT05_200031_19990821',
'LANDSAT/LT05/C01/T1_TOA/LT05_200031_20000722',
'LANDSAT/LT05/C01/T1_TOA/LT05_200031_20010725',
'LANDSAT/LT05/C01/T1_TOA/LT05_200031_20030731',
'LANDSAT/LT05/C01/T1_TOA/LT05_200031_20040717',
'LANDSAT/LT05/C01/T1_TOA/LT05_200031_20050720',
'LANDSAT/LT05/C01/T1_TOA/LT05_200031_20060621',
'LANDSAT/LT05/C01/T1_TOA/LT05_200031_20070827',
'LANDSAT/LT05/C01/T1_TOA/LT05_200031_20080728',
'LANDSAT/LT05/C01/T1_TOA/LT05_200031_20090715',
'LANDSAT/LT05/C01/T1_TOA/LT05_200031_20100718',
'LANDSAT/LT05/C01/T1_TOA/LT05_200031_20110705',
'LANDSAT/LT05/C01/T1_TOA/LT05_198031_20110621',
'LANDSAT/LT05/C01/T1_TOA/LT05_198031_20100821',
'LANDSAT/LT05/C01/T1_TOA/LT05_198031_20090701',
'LANDSAT/LT05/C01/T1_TOA/LT05_198031_20080730',
'LANDSAT/LT05/C01/T1_TOA/LT05_198031_20070813',
'LANDSAT/LT05/C01/T1_TOA/LT05_198031_20060810',
'LANDSAT/LT05/C01/T1_TOA/LT05_198031_20030802',
'LANDSAT/LT05/C01/T1_TOA/LT05_198031_20010828',
'LANDSAT/LT05/C01/T1_TOA/LT05_198031_20000809',
'LANDSAT/LT05/C01/T1_TOA/LT05_198031_19990823',
'LANDSAT/LT05/C01/T1_TOA/LT05_198031_19980719',
'LANDSAT/LT05/C01/T1_TOA/LT05_198031_19970918',
'LANDSAT/LT05/C01/T1_TOA/LT05_198031_19960729',
'LANDSAT/LT05/C01/T1_TOA/LT05_198031_19950828',
'LANDSAT/LT05/C01/T1_TOA/LT05_198031_19940724',
'LANDSAT/LT05/C01/T1_TOA/LT05_198031_19930721'
]);
/*
En este caso no se ha utilizado estas dos variables porque TCW no 
es comparable entre sensores */
/*
// LANDSAT 7 TOA
 var L71 = ee.ImageCollection([
'LANDSAT/LE07/C01/T1_TOA/LE07_199032_20120708',
'LANDSAT/LE07/C01/T1_TOA/LE07_199033_20020814',
'LANDSAT/LE07/C01/T1_TOA/LE07_199033_20120708',
'LANDSAT/LE07/C01/T1_TOA/LE07_200031_20020704',
'LANDSAT/LE07/C01/T1_TOA/LE07_200031_20120731',
'LANDSAT/LE07/C01/T1_TOA/LE07_198031_20120717',
'LANDSAT/LE07/C01/T1_TOA/LE07_198031_20040609',
'LANDSAT/LE07/C01/T1_TOA/LE07_198031_20020924'
]);
// LANDSAT 8 TOA
var L81 = ee.ImageCollection(['LANDSAT/LC08/C01/T1_TOA/LC08_199032_20130719',
'LANDSAT/LC08/C01/T1_TOA/LC08_199032_20140807',
'LANDSAT/LC08/C01/T1_TOA/LC08_199033_20130719',
'LANDSAT/LC08/C01/T1_TOA/LC08_199033_20140722',
'LANDSAT/LC08/C01/T1_TOA/LC08_200031_20130726',
'LANDSAT/LC08/C01/T1_TOA/LC08_200031_20140713',
'LANDSAT/LC08/C01/T1_TOA/LC08_198031_20140901',
'LANDSAT/LC08/C01/T1_TOA/LC08_198031_20130712'
]);
*/
// Datos de entrada para el cálculo de NDVI y NBR
// LANDSAT 5 SURFACE REFLECTANCE  
var L5 = ee.ImageCollection([
ee.Image('LANDSAT/LT05/C01/T1_SR/LT05_199032_19940629').clip(filtromontmajor),
ee.Image('LANDSAT/LT05/C01/T1_SR/LT05_199032_19940816').clip(filtromontmajor),
ee.Image('LANDSAT/LT05/C01/T1_SR/LT05_199032_19950718').clip(filtromontmajor),
ee.Image('LANDSAT/LT05/C01/T1_SR/LT05_199032_19960720').clip(filtromontmajor),
ee.Image('LANDSAT/LT05/C01/T1_SR/LT05_199032_19980811').clip(filtromontmajor),
ee.Image('LANDSAT/LT05/C01/T1_SR/LT05_199032_19990814').clip(filtromontmajor),
ee.Image('LANDSAT/LT05/C01/T1_SR/LT05_199032_20000816').clip(filtromontmajor),
ee.Image('LANDSAT/LT05/C01/T1_SR/LT05_199032_20010702').clip(filtromontmajor),
ee.Image('LANDSAT/LT05/C01/T1_SR/LT05_199032_20030724').clip(filtromontmajor),
ee.Image('LANDSAT/LT05/C01/T1_SR/LT05_199032_20040726').clip(filtromontmajor),
ee.Image('LANDSAT/LT05/C01/T1_SR/LT05_199032_20050713').clip(filtromontmajor),
ee.Image('LANDSAT/LT05/C01/T1_SR/LT05_199032_20060716').clip(filtromontmajor),
ee.Image('LANDSAT/LT05/C01/T1_SR/LT05_199032_20070804').clip(filtromontmajor),
ee.Image('LANDSAT/LT05/C01/T1_SR/LT05_199032_20090724').clip(filtromontmajor),
ee.Image('LANDSAT/LT05/C01/T1_SR/LT05_199032_20110815').clip(filtromontmajor),
'LANDSAT/LT05/C01/T1_SR/LT05_199033_19940629',
'LANDSAT/LT05/C01/T1_SR/LT05_199033_19940816',
'LANDSAT/LT05/C01/T1_SR/LT05_199033_19950718',
'LANDSAT/LT05/C01/T1_SR/LT05_199033_19960704',
'LANDSAT/LT05/C01/T1_SR/LT05_199033_19970707',
'LANDSAT/LT05/C01/T1_SR/LT05_199033_19980726',
'LANDSAT/LT05/C01/T1_SR/LT05_199033_19990729',
'LANDSAT/LT05/C01/T1_SR/LT05_199033_20000731',
'LANDSAT/LT05/C01/T1_SR/LT05_199033_20010718',
'LANDSAT/LT05/C01/T1_SR/LT05_199033_20030809',
'LANDSAT/LT05/C01/T1_SR/LT05_199033_20040726',
'LANDSAT/LT05/C01/T1_SR/LT05_199033_20050729',
'LANDSAT/LT05/C01/T1_SR/LT05_199033_20060716',
'LANDSAT/LT05/C01/T1_SR/LT05_199033_20070719',
'LANDSAT/LT05/C01/T1_SR/LT05_199033_20080502',
'LANDSAT/LT05/C01/T1_SR/LT05_199033_20090724',
'LANDSAT/LT05/C01/T1_SR/LT05_199033_20100812',
'LANDSAT/LT05/C01/T1_SR/LT05_199033_20110628',
'LANDSAT/LT05/C01/T1_SR/LT05_200031_19980818',
'LANDSAT/LT05/C01/T1_SR/LT05_200031_19960609',
'LANDSAT/LT05/C01/T1_SR/LT05_200031_19940722',
'LANDSAT/LT05/C01/T1_SR/LT05_200031_19940620',
'LANDSAT/LT05/C01/T1_SR/LT05_200031_19940823',
'LANDSAT/LT05/C01/T1_SR/LT05_200031_19950810',
'LANDSAT/LT05/C01/T1_SR/LT05_200031_19970714',
'LANDSAT/LT05/C01/T1_SR/LT05_200031_19980327',
'LANDSAT/LT05/C01/T1_SR/LT05_200031_19990821',
'LANDSAT/LT05/C01/T1_SR/LT05_200031_20000722',
'LANDSAT/LT05/C01/T1_SR/LT05_200031_20010725',
'LANDSAT/LT05/C01/T1_SR/LT05_200031_20030731',
'LANDSAT/LT05/C01/T1_SR/LT05_200031_20040717',
'LANDSAT/LT05/C01/T1_SR/LT05_200031_20050720',
'LANDSAT/LT05/C01/T1_SR/LT05_200031_20070827',
'LANDSAT/LT05/C01/T1_SR/LT05_200031_20080728',
'LANDSAT/LT05/C01/T1_SR/LT05_200031_20100718',
'LANDSAT/LT05/C01/T1_SR/LT05_200031_20110705',
'LANDSAT/LT05/C01/T1_SR/LT05_198031_20110621',
'LANDSAT/LT05/C01/T1_SR/LT05_198031_20100821',
'LANDSAT/LT05/C01/T1_SR/LT05_198031_20090701',
'LANDSAT/LT05/C01/T1_SR/LT05_198031_20080730',
'LANDSAT/LT05/C01/T1_SR/LT05_198031_20070813',
'LANDSAT/LT05/C01/T1_SR/LT05_198031_20060810',
'LANDSAT/LT05/C01/T1_SR/LT05_198031_20050706',
'LANDSAT/LT05/C01/T1_SR/LT05_198031_20030802',
'LANDSAT/LT05/C01/T1_SR/LT05_198031_20010828',
'LANDSAT/LT05/C01/T1_SR/LT05_198031_20000809',
'LANDSAT/LT05/C01/T1_SR/LT05_198031_19990823',
'LANDSAT/LT05/C01/T1_SR/LT05_198031_19980719',
'LANDSAT/LT05/C01/T1_SR/LT05_198031_19970918',
'LANDSAT/LT05/C01/T1_SR/LT05_198031_19960729',
'LANDSAT/LT05/C01/T1_SR/LT05_198031_19950828',
'LANDSAT/LT05/C01/T1_SR/LT05_198031_19940724',
'LANDSAT/LT05/C01/T1_SR/LT05_198031_19930721'
]);
// LANDSAT 7 SURFACE REFLECTANCE 
 var L7 = ee.ImageCollection([
ee.Image('LANDSAT/LE07/C01/T1_SR/LE07_199032_20120708').clip(filtromontmajor),
'LANDSAT/LE07/C01/T1_SR/LE07_199033_20020814',
'LANDSAT/LE07/C01/T1_SR/LE07_199033_20120708',
'LANDSAT/LE07/C01/T1_SR/LE07_200031_20020704',
'LANDSAT/LE07/C01/T1_SR/LE07_200031_20120731',
'LANDSAT/LE07/C01/T1_SR/LE07_198031_20120717',
'LANDSAT/LE07/C01/T1_SR/LE07_198031_20040609',
'LANDSAT/LE07/C01/T1_SR/LE07_198031_20020924'
]);
// LANDSAT 8 SURFACE REFLECTANCE
var L8 = ee.ImageCollection([
ee.Image('LANDSAT/LC08/C01/T1_SR/LC08_199032_20130719').clip(filtromontmajor),
ee.Image('LANDSAT/LC08/C01/T1_SR/LC08_199032_20140807').clip(filtromontmajor),
'LANDSAT/LC08/C01/T1_SR/LC08_199033_20130719',
'LANDSAT/LC08/C01/T1_SR/LC08_199033_20140722',
'LANDSAT/LC08/C01/T1_SR/LC08_200031_20130726',
'LANDSAT/LC08/C01/T1_SR/LC08_200031_20140713',
'LANDSAT/LC08/C01/T1_SR/LC08_198031_20140901',
'LANDSAT/LC08/C01/T1_SR/LC08_198031_20130712'
]);
// Datos provenientes del proyecto SERGISAT incorporados a pa plataforma:
// COLECCIONES SERGISAT
var GIF = ee.FeatureCollection('users/eduardomorenogil/GIF_Spain_1994'); // Colección de límites de Grandes Incendios Forestales de SERGISAT
var sevMON = ee.Image("users/eduardomorenogil/sevMONTMAJOR"),            // Imagen de severidad de Montmajor
    sevMOR = ee.Image("users/eduardomorenogil/sevMORATALLA"),            // Imagen de severidad de Moratalla
    sevREQ = ee.Image("users/eduardomorenogil/sevREQUENA"),              // Imagen de severidad de Requena
    sevUNC = ee.Image("users/eduardomorenogil/sevUNCASTILLO"),           // Imagen de severidad de Uncastillo
    sevVIL = ee.Image("users/eduardomorenogil/sevVILLARLUENGO"),         // Imagen de severidad de Villarluengo
    sevYES = ee.Image("users/eduardomorenogil/sevYESTE");                 // Imagen de severidad de Yeste
var CFOR = ee.FeatureCollection("users/eduardomorenogil/CForestal_1990").select('LEY_ROT1'); // Colección de cobertura forestal pre-incendio
//CREACIÓN DE LA COLECCIÓN SEVERIDAD
var severidad = ee.ImageCollection([
                  sevMON.select('b1'), 
                  sevMOR.select('b1'), 
                  sevREQ.select('b1'), 
                  sevUNC.select('b1'), 
                  sevVIL.select('b1'), 
                  sevYES.select('b1')
                ]);
var nombres = GIF.aggregate_array('Name'); // Selección de los nombres de los incendios a partir de la variable GIF.
///////////////////////////////////////////////////////////////////////////////
/////////////////////////// PROCESAMIENDO DE IMAGENES /////////////////////////
///////////////////////////////////////////////////////////////////////////////
//CÁLCULO DEL ÍNDICE DE VEGETACIÓN (NDVI)
var NDVI_L5 = L5.map(function(image) {
  return image.select().addBands(image.normalizedDifference(['B4', 'B3'])).rename('NDVI');
});
var NDVI_L7 = L7.map(function(image) {
  return image.select().addBands(image.normalizedDifference(['B4', 'B3'])).rename('NDVI');
});
var NDVI_L8 = L8.map(function(image) {
  return image.select().addBands(image.normalizedDifference(['B5', 'B4'])).rename('NDVI');
});
//CÁLCULO DEL ÍNDICE DE CALCINACIÓN (NBR)
var NBR_L5 = L5.map(function(image) {
  return image.select().addBands(image.normalizedDifference(['B7', 'B4'])).rename('NBR');
});
var NBR_L7 = L7.map(function(image) {
  return image.select().addBands(image.normalizedDifference(['B7', 'B4']).rename('NBR'));
});
var NBR_L8 = L8.map(function(image) {
  return image.select().addBands(image.normalizedDifference(['B7', 'B5']).rename('NBR'));
});
// CÁLCULO DE TASSELED CAP WETNESS (TCW)
var TCW_L5 = L51.map(function(image) {
  return image.select().addBands(image.expression(
    '0.0315 * (azul) + 0.2021 * (verde) + 0.3102 * (rojo) + 0.1594 * (nir) + (- 0.06806 * (swir1)) + (- 0.6109 * (swir2))',
    {
        azul: image.select('B1'),    
        verde: image.select('B2'),    
        rojo: image.select('B3'),
        nir: image.select('B4'),    
        swir1: image.select('B5'),    
        swir2: image.select('B7')
    }).float().rename('TCW'));
});
///////////////////////////////////////////////////////////////////////////////
////////////////////////////// CREACIÓN DE PANELES   //////////////////////////
///////////////////////////////////////////////////////////////////////////////
// PANEL PRINCIPAL DERECHO 
/* En este panel se introducen todos los botones con los que el usuario puede 
interactuar para visualizar las trayectorias y generar las tendencias ademas 
de poder añadir capas auxiliares*/
var panelprincial = ui.Panel({
  widgets: [],
  style: {
    shown: true,
    width: '300px',
  }
});
// PANELES ADICIONALES
// PANEL TRAYECTORIAS
/* Cuando un usuario pulse el botón para calcular trayectorias este panel se activara
de tal manera que a la izquierda de la interfaz aparece un panel donde se gráficaran los
resultados de la consulta realizada al hacer click en un pixel del incendio*/
var paneltrayectorias = ui.Panel({
  widgets: [],
  style: {
    shown: false,
    backgroundColor: '#bdbdbd',
    width: '400px',
  }
}); 
// PANELES DE INFORMACIÓN
var panelinfoGIF = ui.Panel({
  widgets: [],
  style: {
    shown: false,
    backgroundColor: '#737373',
    height: '500px',
    width: '735px',
    position: 'top-center',
    border: '2px solid white',
  }
}); // Panel de información sobre Grandes Incendios Forestales
var panelinfoRPI = ui.Panel({
  widgets: [],
  style: {
    shown: false,
    height: '500px',
    width: '735px',
    position: 'top-center',
    border: '2px solid white',
    backgroundColor: '#737373',
  }
}); // Panel de información sobre RPI Engine
var panelinfoTREND = ui.Panel({
  widgets: [],
  style: {
    shown: false,
    height: '200px',
    width: '735px',
    position: 'top-center',
    border: '2px solid white',
    backgroundColor: '#737373',
  }
}); // Panel de ayuda sobre el cálculo de tendencias
var panelinfoVIS = ui.Panel({
  widgets: [],
  style: {
    shown: false,
    height: '300px',
    width: '735px',
    position: 'top-center',
    border: '2px solid white',
    backgroundColor: '#737373',
  }
}); // Panel de ayuda a la visualización
///////////////////////////////////////////////////////////////////////////////
////////////////////////////////// TEXTOS /////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
// TÍTULO DEL VISOR EN PANEL DERECHO
var intro = ui.Label({
    value: 'RPI Engine  ',
    style: {fontSize: '26px', fontWeight: 'Arial', color:'#ffffb2' ,backgroundColor:'#737373'}
  });
// TEXTO PANEL DE INFORMACIÓN RPI ENGINE
var TextoRPI1 = ui.Label({
  value: 'Regeneración Post Incendio - RPI Engine',
  style: {fontSize: '24px', fontWeight: 'Arial', color:'#ffffb2' ,backgroundColor:'#737373'}
  });
var TextoRPI2 = ui.Label({
    value: 'Visualización en un entorno web de la regeneración post-incendio a partir de' +
      ' series multitemporales de imágenes Landsat',
    style: {fontSize: '18px', fontWeight: 'Arial', color:'#f7f7f7' ,backgroundColor:'#737373'}
  });
var TextoRPI3 = ui.Label({
    value: 'El visor RPI Engine ha sido desarrollado usando como herramienta la plataforma Google Earth Engine y se ha centrado en estudiar los incendios analizados en el proyecto SERGISAT: “Severidad y regeneración en grandes incendios forestales mediante teledetección y SIG” - CGL2014-57013-C2. El objetivo del visor ha sido por una parte el cálculo y la representación de las trayectorias temporales de los índices espectrales NDVI (Normalized Difference Vegetation Index), NBR (Normalized Burn Ratio) y la transformación TCW (Tasseled Cap Wetness), y por otra la posibilidad de estimar las tendencias que estos índices espectrales han seguido en los grandes incendios forestales, sucedidos en el año 1994, usados en el proyecto SERGISAT.',
    style: {fontSize: '12px', fontWeight: 'Arial', textAlign: 'justify', color:'#abd9e9' ,backgroundColor:'#737373'}
  });
var TextoRPI4 = ui.Label({
    value: '¿Cómo funciona RPI Engine?',
    style: {fontSize: '16px', fontWeight: 'Arial', color:'#ffffb2' ,backgroundColor:'#737373'}
  });
var TextoRPI5 =  ui.Label({
    value: 'El código implementado permite seleccionar entre los seis grandes incendios forestales estudiados en el proyecto SERGISAT (Uncastillo, Villarluengo, Requena, Moratalla, Yeste y Montmajor) para los cuales se puede estimar y visualizar la tendencia de regeneración, en cada píxel, de la zona del incendio. La tendencia de regeneración, está representada a través de la variación de los índices espectrales utilizados, en una serie multitemporal, de imágenes Landsat. Por tanto, se puede hablar de un proceso de regeneración cuando la tendencia de los índices sea creciente, si seleccionamos el índice NDVI o decreciente si se selecciona el índice NBR.  Las tendencias temporales están estimadas a partir del uso del algoritmo formaTrend, que ofrece dos resultados. Uno expresa las tendencias a largo plazo “long-trend” que se correspondería con una regresión lineal usando todos los datos de la serie temporal (20 años). Otra modalidad del algoritmo ofrece una estimación de tendencias a corto plazo “short-trend”. Este enfoque ofrece las tendencias temporales aplicando un análisis de regresión lineal en ventanas temporales (https://goo.gl/c4rexh). El análisis de tendencia solo se ha efectuado en las cubiertas que según los datos ALOS-PALSAR 2017, pueden ser considerados superficies de arbolado (https://goo.gl/ka4rUh). El interés del visor reside en la posibilidad de visualizar las trayectorias temporales de estos índices, en cada píxel, en los años estudiados. Nos permite observar que efectivamente un píxel pudo haber comenzado con un valor espectral superior al valor espectral tras el impacto del fuego y pudo alcanzar, a lo largo de los años, un valor espectral similar al valor pre-incendio. Aunque es difícil que un píxel tenga una trayectoria continuamente creciente, mediante el algoritmo “short-trend” podremos observar zonas donde se aprecia un crecimiento continuo, con pocas variaciones en la trayectoria. En cuanto a la transformación TCW informa sobre el grado de humedad en la cubierta terrestre (Crist 1985, Huang et al. 2002, Baig et al. 2014), se ha incluido en el análisis debido a que ha sido utilizado en el proyecto como un indicador de la regeneración forestal (Martínez et al., 2017). ',
    style:  {fontSize: '12px', fontWeight: 'Arial',textAlign: 'justify',color:'#abd9e9' ,backgroundColor:'#737373'}
  });  
var TextoRPI6 = ui.Label({
    value: 'Datos auxiliares',
    style: {fontSize: '16px', fontWeight: 'Arial', color:'#ffffb2' ,backgroundColor:'#737373'}
  });  
var TextoRPI7 =  ui.Label({
    value: 'Otra información auxiliar que incorpora el visor son los valores de severidad del incendio (obtenidos a partir del índice GeoCBI- De Santis y Chuvieco, 2008). Esta información resulta de interés debido a que nos permite comparar situaciones en las que el impacto del fuego fue más severo y comprobar en qué medida ese efecto ha condicionado la recuperación de los valores espectrales pre-incendio.  Tanto los límites de los incendios como los valores de severidad han sido extraídos del proyecto SERGISAT e incorporados al visor. Para más información sobre el funcionamiento de RPI Engine consulte el tutorial en la página web del proyecto SERGISAT.',
    style:  {fontSize: '12px', fontWeight: 'Arial',textAlign: 'justify',color:'#abd9e9' ,backgroundColor:'#737373'}
  });
var TextoRPI8 = ui.Label({
    value: 'Referencias',
    style: {fontSize: '16px', fontWeight: 'Arial', color:'#ffffb2' ,backgroundColor:'#737373'}
  });
var TextoRPIR1 =  ui.Label({
    value: 'Baig MHA, Zhang L, Shuai T, Tong Q (2014) Derivation of a Tasselled Cap Transformation Based on Landsat 8 at-Satellite Reflectance. Remote Sensing Letters 5 (5), 423-431.',
    style:  {fontSize: '12px', fontWeight: 'Arial',textAlign: 'justify',color:'#abd9e9' ,backgroundColor:'#737373'}
});
var TextoRPIR2 =  ui.Label({
    value: 'Crist EP (1985) A TM Tasseled Cap Equivalent Transformation for Reflectance Factor Data. Remote Sensing of Environment 17 (3), 301-306.',
    style:  {fontSize: '12px', fontWeight: 'Arial',textAlign: 'justify',color:'#abd9e9' ,backgroundColor:'#737373'}
});
var TextoRPIR3 =  ui.Label({
    value: 'De Santis, A. y Chuvieco, E (2009). GeoCBI: A Modified Version of the Composite Burn Index for the Initial Assessment of the Short-Term Burn Severity from Remotely Sensed Data. Remote Sensing of Environment [online] 113 (3), 554-562. available from http://dx.doi.org/10.1016/j.rse.2008.10.011.',
    style:  {fontSize: '12px', fontWeight: 'Arial',textAlign: 'justify',color:'#abd9e9' ,backgroundColor:'#737373'}
});
var TextoRPIR4 =  ui.Label({
    value: 'Huang C, Wylie B, Yang L, Homer C, Zylstra G (2002) Derivation of a Tasselled Cap Transformation Based on Landsat 7 at-Satellite Reflectance». International Journal of Remote Sensing 23 (8), 1741-1748.',
    style:  {fontSize: '12px', fontWeight: 'Arial',textAlign: 'justify',color:'#abd9e9' ,backgroundColor:'#737373'}
});
var TextoRPIR5 =  ui.Label({
    value: 'Martínez S, Chuvieco E, Aguado, I, Salas J (2017). Burn severity and regeneration in large forest fires: an analysis from Landsat time series. Revista de Teledetección 49, 17-32.',
    style:  {fontSize: '12px', fontWeight: 'Arial',textAlign: 'justify',color:'#abd9e9' ,backgroundColor:'#737373'}
});
// TEXTO PANEL DE INFORMACIÓN CÁLCULO DE TENDENCIAS  
var TextTREND1 = ui.Label({
  value: 'Información Cálculo de Tendencias de Regeneración',
  style: {fontSize: '18px', fontWeight: 'Arial', color:'#ffffb2' ,backgroundColor:'#737373'}
});
var TextTREND2 = ui.Label({
    value: 'Esta operación puede tardar unos segundos. Recuerde que estirar el contraste mejorá el resultado (vea tutorial). No se debe confundir las trayectorias con las tendencias. En el caso de las tendencias unicamente veremos una representación visual de un dato numerico, en las trayectorias podremos observar el valor que tiene el pixel seleccionado en sus respectivos índices.',
    style: {fontSize: '14px', fontWeight: 'Arial',textAlign: 'justify', color:'#abd9e9' ,backgroundColor:'#737373'}
  });
// TEXTO PANEL DE INFORMACIÓN DE VISUALIZACIÓN 
var TextVIS1 = ui.Label({
  value: 'Tendencias de Regeneración (interpretación de resultados)',
  style: {fontSize: '18px', fontWeight: 'Arial', color:'#ffffb2' ,backgroundColor:'#737373'}
});
var TextVIS2 = ui.Label({
    value: 'En el caso de los índices NDVI y NBR, en función de su escala, se obtendrían resultados comprendidos entre valores negativos y positivos. Un píxel de NDVI con valores positivos implica una regeneración y cuanto más oscuro sea el tono en la leyenda gráfica del mapa, mayor será la regeneración en ese píxel. De esta manera podremos observar zonas que presentan vegetación más vigorosa a lo largo de la serie temporal, frente a otras que podremos afirmar que no han mostrado ese progreso en la evolución temporal de su cubierta forestal. La interpretación de los valores de tendencia del índice NBR se hace de manera inversa, un valor más negativo en la tendencia se corresponde con un tono más oscuro y una mayor regeneración. Este proceso es más fácil de observar si se utiliza como fondo en la visualización una imagen de satélite que podemos elegir en el visor, ayudando a la interpretación del resultado. ',
    style: {fontSize: '14px', fontWeight: 'Arial',textAlign: 'justify', color:'#abd9e9' ,backgroundColor:'#737373'}
  });
// TEXTO PANEL DE GRÁFICAS DE TRAYECTORIAS
var TextoTRAY1 = ui.Label({
    value: 'Gráficas de las Trayectorias',
    style: {fontSize: '16px', fontWeight: 'Arial', color:'#000000' ,backgroundColor:'#bdbdbd'}
  });
var TextoTRAY2 =  ui.Label({
    value: 'Presiona un punto del mapa para mostrar la trayectoria, posteriormente presiona ' +
    'un punto de la gráfica para mostrar la imagen correspondiente a la fecha selecionada',
    style:  {fontSize: '12px', fontWeight: 'Arial',textAlign: 'justify',color:'#000000' ,backgroundColor:'#bdbdbd'}
});
// TEXTO BOTONES DE APARTADO 1)
var TextoAP1TITULO =  ui.Label({
      value: '1) Selecciona el incendio deseado:',
      style:  {fontSize: '14px', fontWeight: 'Arial',color:'#000000' ,backgroundColor:'#d9d9d9'}
  }); 
var TextoAUXNDVI =  ui.Label({
      value: 'Selección NDVI',
      style:  {fontSize: '10px', fontWeight: 'Arial',color:'#000000' ,backgroundColor:'#d9d9d9'}
  });   
var TextoAUXNBR =  ui.Label({
      value: 'Selección NBR',
      style:  {fontSize: '10px', fontWeight: 'Arial',color:'#000000' ,backgroundColor:'#d9d9d9'}
  }); 
var TextoAUXTCW =  ui.Label({
    value: 'Selección TCW',
    style:  {fontSize: '10px', fontWeight: 'Arial',color:'#000000' ,backgroundColor:'#d9d9d9'}
  }); 
// TEXTO APARTADO 2)
var TextoAP2TITULO =  ui.Label({
      value: '2) Pulsa el botón para generar y gráficar las trayectorias de los índices espectrales y selecciona un pixel en el mapa:',
      style:  {fontSize: '14px', fontWeight: 'Arial',color:'#000000' ,backgroundColor:'#bdbdbd'}
  });
// TEXTO ETIQUETA DEL PROYECTO
var Proyecto =  ui.Label({
    value: '“Severidad y regeneración en grandes incendios forestales mediante teledetección y SIG” – SERGISAT: CGL2014-57013-C2. ',
    style:  {fontSize: '10px', fontWeight: 'Arial',color:'#000000' ,backgroundColor:'#d9d9d9', position: 'bottom-center'}
  }); 
Map.add(Proyecto);
// TEXTO ETIQUETA DEL MINI MAPA
var TextoMiniMapa =  ui.Label({
    value:'Landsat 2107: NIR/SWIR/R',
    style:  {fontSize: '8px', fontWeight: 'Arial',color:'#000000' ,backgroundColor:'#d9d9d9', position: 'top-center'}
  }); 
// TEXTO PANEL DE INFORMACIÓN SOBRE INCENDIOS 
var InfoIncendios =  ui.Label({
      value: 'Grandes Incendios Forestales - SERGISAT',
      style:  {fontSize: '18px', fontWeight: 'Arial',color:'#ffffb2' ,backgroundColor:'#737373'}
  }); 
var IUncastillo =  ui.Label({
      value: 'Uncastillo ',
      style:  {fontSize: '14px', fontWeight: 'Arial',color:'#f7f7f7' ,backgroundColor:'#737373'}
  }); 
var TUncastillo =  ui.Label({
      value: 'Fecha: 16/07/94,	Localización: 42°21′38″N 1°07′52″O,	Área total afectada (ha): 6589,	Superficie arbolada afectada (ha): 4949',
      style:  {fontSize: '12px', fontWeight: 'Arial',color:'#abd9e9' ,backgroundColor:'#737373'}
  }); 
var IVillarluengo =  ui.Label({
      value: 'Villarluengo ',
      style:  {fontSize: '14px', fontWeight: 'Arial',color:'#f7f7f7' ,backgroundColor:'#737373'}
  }); 
var TVillarluengo =  ui.Label({
      value: 'Fecha: 02/07/94,	Localización: 40°38′54″N 0°31′52″O,	Área total afectada (ha): 16831, Superficie arbolada afectada (ha): 10149',
      style:  {fontSize: '12px', fontWeight: 'Arial',color:'#abd9e9' ,backgroundColor:'#737373'}
  });
var IRequena =  ui.Label({
      value: 'Requena ',
      style:  {fontSize: '14px', fontWeight: 'Arial',color:'#f7f7f7' ,backgroundColor:'#737373'}
  });
var TRequena =  ui.Label({
      value: 'Fecha: 05/07/94,	Localización: 39°29′19″N 1°06′08″O,	Área total afectada (ha): 24064, Superficie arbolada afectada (ha): 16373',
      style:  {fontSize: '12px', fontWeight: 'Arial',color:'#abd9e9' ,backgroundColor:'#737373'}
  }); 
var IMoratalla =  ui.Label({
      value: 'Moratalla ',
      style:  {fontSize: '14px', fontWeight: 'Arial',color:'#f7f7f7' ,backgroundColor:'#737373'}
  }); 
var TMoratalla =  ui.Label({
      value: 'Fecha: 04/07/94,	Localización: 38°11′11″N 1°53′26″O,	Área total afectada (ha): 24817, Superficie arbolada afectada (ha): 16262',
      style:  {fontSize: '12px', fontWeight: 'Arial',color:'#abd9e9' ,backgroundColor:'#737373'}
  }); 
var IYeste =  ui.Label({
      value: 'Yeste ',
      style:  {fontSize: '14px', fontWeight: 'Arial',color:'#f7f7f7' ,backgroundColor:'#737373'}
  }); 
var TYeste =  ui.Label({
      value: 'Fecha: 07/08/94,	Localización: 38°21′06″N 2°19′34″O,	Área total afectada (ha): 12895, Superficie arbolada afectada (ha): 11685',
      style:  {fontSize: '12px', fontWeight: 'Arial',color:'#abd9e9' ,backgroundColor:'#737373'}
  }); 
var IMontmajor =  ui.Label({
      value: 'Montmajor ',
      style:  {fontSize: '14px', fontWeight: 'Arial',color:'#f7f7f7' ,backgroundColor:'#737373'}
  }); 
var TMontmajor =  ui.Label({
      value: 'Fecha: 04/07/94,	Localización: 42°01′04″N 1°44′07″E,	Área total afectada (ha): 16442, Superficie arbolada afectada (ha): 14546',
      style:  {fontSize: '12px', fontWeight: 'Arial',color:'#abd9e9' ,backgroundColor:'#737373'}
  }); 
// SE AÑADEN LOS TEXTOS A LOS PANELES Y AL MAPA
panelinfoGIF.add(InfoIncendios);
panelinfoGIF.add(IUncastillo);
panelinfoGIF.add(TUncastillo);
panelinfoGIF.add(IVillarluengo);
panelinfoGIF.add(TVillarluengo);
panelinfoGIF.add(IRequena);
panelinfoGIF.add(TRequena);
panelinfoGIF.add(IMoratalla);
panelinfoGIF.add(TMoratalla);
panelinfoGIF.add(IYeste);
panelinfoGIF.add(TYeste);
panelinfoGIF.add(IMontmajor);
panelinfoGIF.add(TMontmajor);
Map.add(panelinfoGIF);
Map.add(panelinfoRPI);
Map.add(panelinfoTREND);
Map.add(panelinfoVIS);
paneltrayectorias.add(TextoTRAY1);
panelinfoRPI.add(TextoRPI1);
panelinfoRPI.add(TextoRPI2);
panelinfoRPI.add(TextoRPI3);
panelinfoRPI.add(TextoRPI4);
panelinfoRPI.add(TextoRPI5);
panelinfoRPI.add(TextoRPI6);
panelinfoRPI.add(TextoRPI7);
panelinfoRPI.add(TextoRPI8);
panelinfoRPI.add(TextoRPIR1);
panelinfoRPI.add(TextoRPIR2);
panelinfoRPI.add(TextoRPIR3);
panelinfoRPI.add(TextoRPIR4);
panelinfoRPI.add(TextoRPIR5);
panelinfoTREND.add(TextTREND1);
panelinfoTREND.add(TextTREND2);
panelinfoVIS.add(TextVIS1);
panelinfoVIS.add(TextVIS2);
// COLOR DE FONDO PARA PANELES
var fondo = {backgroundColor:'#d9d9d9'};
var fondo1 = {backgroundColor:'#737373'};
var fondo2 = {backgroundColor:'#bdbdbd'};
var fondo3 = {backgroundColor:'#d9d9d9'};
var fondo4 = {backgroundColor:'#bdbdbd'};
var fondo5 = {backgroundColor:'#d9d9d9'};
// SE INSERTAN LOS PANELES A LA INTERFAZ
ui.root.insert(6, panelprincial); //se elige la posición derecha "6"
ui.root.insert(0, paneltrayectorias); //se elige la posición izquierda "0"
///////////////////////////////////////////////////////////////////////////////
//////////////////////////// BOTENES GENERAL ///////////////////////////////
///////////////////////////////////////////////////////////////////////////////
// BOTÓN PARA MOSTRAR INFORMACIÓN
var BotonINFORPI = ui.Button({
  label:'¡Más información!',
  style: {border: '1px solid grey'}
}); 
BotonINFORPI.onClick(function() {
  panelinfoRPI.style().set('shown', true);
}); 
var BotonINFOGIF = ui.Button({
  label:'Información Incendios',
  style: {border: '1px solid grey'}
}); 
BotonINFOGIF.onClick(function() {
  panelinfoGIF.style().set('shown', true);
}); 
// BOTONES PARA CERRAR LOS PANELES
var cerrar_1 = ui.Button({
  label: 'Cerrar',
  style: {width: '80px'},
  onClick: function() {
    cerrar_1.style().set('shown', true);
    paneltrayectorias.style().set('shown', false);
    }
});
var cerrar_2 = ui.Button({
  label: 'Cerrar',
  style: {width: '80px'},
  onClick: function() {
    cerrar_2.style().set('shown', true);
    panelinfoGIF.style().set('shown', false);
    panelinfoGIF.widgets().remove();
    }
});
var cerrar_3 = ui.Button({
  label: 'Cerrar',
  style: {width: '80px'},
  onClick: function() {
    cerrar_3.style().set('shown', true);
    panelinfoRPI.style().set('shown', false);
    }
});
var cerrar_4 = ui.Button({
  label: 'Cerrar',
  style: {width: '80px'},
  onClick: function() {
    cerrar_4.style().set('shown', true);
    panelinfoTREND.style().set('shown', false);
    }
});var cerrar_5 = ui.Button({
  label: 'Cerrar',
  style: {width: '80px'},
  onClick: function() {
    cerrar_5.style().set('shown', true);
    panelinfoVIS.style().set('shown', false);
    }
});
// SE AÑADEN LOS BOTONES A LOS PANELES 
paneltrayectorias.widgets().set(5, cerrar_1);
panelinfoGIF.widgets().set(13, cerrar_2)
panelinfoRPI.add(cerrar_3);
panelinfoTREND.add(cerrar_4);
panelinfoVIS.add(cerrar_5);
///////////////////////////////////////////////////////////////////////////////
////////////////////////REPRESENTANCIÓN DE TRAYECTORIAS ///////////////////////
///////////////////////////////////////////////////////////////////////////////
var BotonCalcularTRAY = ui.Checkbox({label: 'Calcular trayectorias',style: {height: '30px',width: '130px',fontSize: '11px', fontWeight: 'bold', backgroundColor:'#f0f0f0', border: '1px solid grey'}});
BotonCalcularTRAY.onChange(function(checked) {
  if (checked) {paneltrayectorias.style().set('shown', true);
    // OPERACIONES TRAS HACER CLICK EN EL MAPA
    Map.onClick(function(coords) {
      // Devuelve las coordenadas al panel.
      lon.setValue('lon: ' + coords.lon.toFixed(2)),
      lat.setValue('lat: ' + coords.lat.toFixed(2));
      centerZoomBox(coords.lon, coords.lat);
      // Añade un punto al pixel seleccionado
      var point = ee.Geometry.Point(coords.lon, coords.lat);
      var dot = ui.Map.Layer(point, {color: '#2171b5'}, 'Pixel Selecionado');
      Map.layers().set(1, dot);
      //Añadir punto al zoom
      zoomBox.addLayer(point, {color: '#2171b5'});
      // GRAFICAS DEL PIXEL
      // ÍNDICES NDVI, NBR y TCW:
      // Creación de la gráfica para NBR Landsat 5
      var NDVIGrafica = 
        ui.Chart.image.series(cNDVI, point);
      NDVIGrafica.setOptions({
        title: 'Serie Multitemporal NDVI',
        vAxis: {title: 'NDVI', ticks: [-0.4, -0.2, 0.0, 0.2, 0.4, 0.6, 0.8, 1.0]},
        hAxis: {title: 'Año', format: 'y', gridlines: {count: 20}},
        series: {0: {color: '#31a354'}},
        backgroundColor:'#ffffff',
      });
      paneltrayectorias.widgets().set(3, NDVIGrafica);
      // Creación de la gráfica para NBR Landsat 7
      var NBRGrafica = 
        ui.Chart.image.series(cNBR, point);
      NBRGrafica.setOptions({
        title: 'Serie Multitemporal NBR',
        vAxis: {title: 'NBR', ticks: [-1.0, -0.8, -0.6, -0.4, -0.2, 0.0, 0.2, 0.4]},
        hAxis: {title: 'Año', format: 'y', gridlines: {count: 20}},
        series: {0: {color: '#de2d26'}}, 
        backgroundColor:'#ffffff',
      });
      paneltrayectorias.widgets().set(4, NBRGrafica);
      // Creación de la gráfica para NBR Landsat 8
      var TCWGrafica = 
        ui.Chart.image.series(cTCW, point);
      TCWGrafica.setOptions({
        title: 'Serie Multitemporal TCW',
        vAxis: {title: 'TCW', ticks: [-0.060,-0.055,-0.050,-0.045,-0.040,-0.035,-0.030,-0.025, -0.020, -0.015, -0.010, 0.0, 0.010, 0.015, 0.020, 0.025, 0.030, 0.035, 0.040, 0.045]},
        hAxis: {title: 'Año', format: 'y', gridlines: {count: 20}},
        backgroundColor:'#ffffff',
      });
      paneltrayectorias.widgets().set(5, TCWGrafica);
      // SELECCIONAR IMAGENES DE LAS GRAFICAS PARA REPRESENTAR
      // Seleciona un valor de la gráfica para obtener la imagen en pantalla
      // REPRESENTAR NBRT
      // NBRT Landsat 5
      // Cuando se elige la imagen de la gráfica se carga la imagen y la etiqueta.
      NDVIGrafica.onClick(function(xValue, yValue, seriesName) {
        if (!xValue) return;  // Selection was cleared.
      // Muestra la imagen de la fecha seleccionada
      var equalDate = ee.Filter.equals('system:time_start', xValue);
      var image = ee.Image(cNDVI.filter(equalDate).first());
      var NDVILayer = ui.Map.Layer(image, visNDVI, 'NDVI');
      Map.layers().reset([NDVILayer,dot]);
      });
      // NBRT Landsat 7
      // Cuando se elige la imagen de la gráfica se carga la imagen y la etiqueta.
      NBRGrafica.onClick(function(xValue, yValue, seriesName) {
        if (!xValue) return;  // Selection was cleared.
      // Muestra la imagen de la fecha seleccionada
      var equalDate = ee.Filter.equals('system:time_start', xValue);
      var image = ee.Image(cNBR.filter(equalDate).first());
      var NBRLayer = ui.Map.Layer(image, visNBR, 'NBR');
      Map.layers().reset([NBRLayer,dot]);
      });
      // NBRT Landsat 8
      // Cuando se elige la imagen de la gráfica se carga la imagen y la etiqueta.
      TCWGrafica.onClick(function(xValue, yValue, seriesName) {
        if (!xValue) return;  // Selection was cleared.
      // Muestra la imagen de la fecha seleccionada
      var equalDate = ee.Filter.equals('system:time_start', xValue);
      var image = ee.Image(cTCW.filter(equalDate).first());
      var TCWLayer = ui.Map.Layer(image, visTCW, 'TCW');
      Map.layers().reset([TCWLayer,dot]);
      });
    });
  }
  else {
    paneltrayectorias.style().set('shown', false);
    paneltrayectorias.clear();
    paneltrayectorias.add(TextoTRAY1);
    paneltrayectorias.widgets().set(2, TextoTRAY2);
    paneltrayectorias.widgets().set(5, cerrar_1);}
});
///////////////////////////////////////////////////////////////////////////////
///////////////////////// LEYENDAS Y VISUALIZACIÓN ////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//OPCIONES DE VISUALIZACIÓN DEL MAPA BASE
Map.setControlVisibility();
Map.setOptions('TERRAIN');
Map.setCenter( -3.363215, 40.482898, 6); 
//PALETAS DE COLOR PARA EL ZOOMBOX
var visNBR = {
    min: -0.5, max: 0.1, palette: [
      '#252525', '#636363', '#d9d9d9', '#cccccc', '#f7f7f7',
      '#ffffff', '#fee5d9', '#fcae91', '#fb6a4a', '#de2d26',
      '#a50f15'
      ]}; // Visualización NBR
var visTCW = {
    min: -0.1, max: 0.025, palette: [
      '#a50026', '#d73027', '#f46d43', '#fdae61', '#fee08b',
      '#ffffbf', '#d9ef8b', '#a6d96a', '#66bd63', '#1a9850',
      '#006837'
      ]
}; // Visualizar TCW
var visNDVI = {
    min: 0.1, max: 0.7, palette: [
      '#a50026', '#d73027', '#f46d43', '#fdae61', '#fee08b',
      '#ffffbf', '#d9ef8b', '#a6d96a', '#66bd63', '#1a9850',
      '#006837'
      ]
}; // Visualizar NDVI
// PALETAS DE COLOR PARA SEVERIDAD (GEOCBI)
var reclassGEOCBI = severidad.map(function(image) {
  var visGEOCBI =
  '<RasterSymbolizer>' +
    '<ColorMap  type="intervals" extended="false" >' +
      '<ColorMapEntry color="#08306b" quantity="30" label="0.0-1.0"/>' +
      '<ColorMapEntry color="#00441b" quantity="29" label="1.0-2.0" />' +
      '<ColorMapEntry color="#7fbc41" quantity="27" label="2.0-2.5" />' +
      '<ColorMapEntry color="#d0ed0d" quantity="20" label="2.5-2.7" />' +
      '<ColorMapEntry color="#f47505" quantity="15" label="2.7-2.9" />' +
      '<ColorMapEntry color="#ff0000" quantity="7" label="2.9-3.0" />' +
    '</ColorMap>' +
  '</RasterSymbolizer>';
  return image.sldStyle(visGEOCBI)
});
// LEYENDA SEVERIDAD
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'Severidad GIF',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
// Add the title to the panel
legend.add(legendTitle);
// Creates and styles 1 row of the legend.
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
      // return the panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
//  Palette with the colors
var palette =["ff0000", "f47505", "d0ed0d", "7fbc41", "00441b", "08306b"];
// name of the legend
var names = ["GeoCBI = 2.9-3.0", "GeoCBI = 2.7-2.9", "GeoCBI = 2.5-2.7", "GeoCBI = 2.0-2.5", "GeoCBI = 1.0-2.0",  "GeoCBI = 0.0-1.0"];
// Add color and and names
for (var i = 0; i < 6; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
// LEYENDA TENDENCIAS
var LeyNDVI = {"opacity":1, "min":0.0001, "max":0.0007, "palette":["#a1d99b", "#00441b"]}; // Configuración paleta de tendencias para NDVI 
var LeyNBR = {"opacity":1, "min":-0.0005, "max":0.001, "palette":["#a1d99b", "#00441b"]}; // Congifuración paleta de tendencias para NBR
var LeyTCW = {"opacity":1, "min":-0.006, "max":0.0025, "palette":["#a1d99b", "#00441b"]}; // Congifuración paleta de tendencias para TCW
// CREACIÓN DE UNA LEYENDA CONTINUA
function CrearLeyenda(vis) {
  var lon = ee.Image.pixelLonLat().select('longitude');
  var gradiente = lon.multiply((vis.max-vis.min)/100.0).add(vis.min);
  var leyendaimagen = gradiente.visualize(vis);
  var miniatura = ui.Thumbnail({
    image: leyendaimagen, 
    params: {bbox:'0,0,100,8', dimensions:'300x15'},  
    style: {position: 'bottom-center'}
  });
  var textley = ui.Panel({
    widgets: [
      ui.Label(String('Mín.')),
      ui.Label({style: {stretch: 'horizontal', backgroundColor: '#d9d9d9'}}),
      ui.Label(String(' ')),
      ui.Label({style: {stretch: 'horizontal', backgroundColor: '#d9d9d9'}}),
      ui.Label(String('Max.')),
    ],
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {
      padding: '0px',
      stretch: 'horizontal',
      fontSize: '12px', 
      color: 'black',
      textAlign: 'center'
    }
  });
  return ui.Panel({style:{position: 'bottom-left'}})
    .add(textley).add(miniatura);
}
// AÑADIR LEYENDAS A LOS PANELES
paneltrayectorias.widgets().set(2, TextoTRAY2);
///////////////////////////////////////////////////////////////////////////////
////////////////////////////// AGREGAR MINIMAPA   /////////////////////////////
///////////////////////////////////////////////////////////////////////////////
// MAPA PARA EL ZOOM DEL PIXEL
var zoomBox = ui.Map({style: {stretch: 'both', shown: true}})
    .setCenter( -3.3822051,41.1499677, 4)
    .setControlVisibility(false);
var imagen8 = ee.ImageCollection([
  'LANDSAT/LC08/C01/T1_SR/LC08_199032_20130719',
  'LANDSAT/LC08/C01/T1_SR/LC08_199033_20130719',
  'LANDSAT/LC08/C01/T1_SR/LC08_200033_20130726',
  'LANDSAT/LC08/C01/T1_SR/LC08_200031_20130726',
  'LANDSAT/LC08/C01/T1_SR/LC08_198031_20140901',
  ]).mosaic();
zoomBox.addLayer(imagen8, {bands: ['B5', 'B6', 'B4'], min: 81, max: 5604}, 'good composite');
zoomBox.add(TextoMiniMapa);
var centerZoomBox = function(lon1, lat1) {
  instructions1.style().set('shown', false);
  zoomBox.style().set('shown', true);
  zoomBox.setCenter(lon1, lat1, 15);
  var bounds1 = zoomBox.getBounds();
  var w = bounds1[0], e = bounds1 [2];
  var n = bounds1[1], s = bounds1 [3];
  var outline1 = ee.Geometry.MultiLineString([
    [[w, s], [w, n]],
    [[e, s], [e, n]],
    [[w, s], [e, s]],
    [[w, n], [e, n]],
  ]);
  var layer1 = ui.Map.Layer(outline1, {color: 'FFFFFF'}, 'Zoom Box Bounds');
};
var instructions1 = ui.Label('Presiona en el mapa para ver el detalle', {
  stretch: 'both',
  textAlign: 'center',
  color: '#000000',
  fontSize: '10px',
  backgroundColor:'#d9d9d9',
});
// CREACIÓN DE LAS ETIQUETAS LONGITUD Y LATITUD
var lon = ui.Label();
var lat = ui.Label();
///////////////////////////////////////////////////////////////////////////////
///////////////////////// SELECCIÓN DE TENDENCIAS /////////////////////////////
///////////////////////////////////////////////////////////////////////////////
// BOTONES DE SELECCIÓN DE INCENDIOS Y CÁLCULO DE TENDENCIAS
var seleccion_NDVI = ui.Select({
  items: nombres.getInfo(),
  onChange: tendenciaNDVI, 
  style: {border: '1px solid grey'},
}); // Botón de para calcular la tendencias de NDVI
seleccion_NDVI.setPlaceholder('Grandes Incendios Forestales');
/*
var seleccion_NBR = ui.Select({
  items: nombres.getInfo(), 
  onChange: tendenciaNBR, 
  style: {border: '1px solid grey'}
}); // Botón de para calcular la tendencias de NBR
seleccion_NBR.setPlaceholder('Índice espectral NBR');
var seleccion_TCW = ui.Select({
  items: nombres.getInfo(), 
  onChange: tendenciaTCW, 
  style: {border: '1px solid grey'}
}); // Botón de para calcular la tendencias de TCW
seleccion_TCW.setPlaceholder('Transformación espectral TCW');
*/
///////////////////////////////////////////////////////////////////////////////
////////////////////// LÍMITE GIF Y COBERTURA FORESTAL ////////////////////////
///////////////////////////////////////////////////////////////////////////////
/******************************************************************************
  Se ha convertido la imagen raster ALOS-PALSAR en vectorial.
  De esta manera ponemos recortar las trayectorias que generemos 
  para extraer únicamente las que presentan una cobertura forestal 
  desde 2016.  
******************************************************************************/
var ALOS = ee.Image('JAXA/ALOS/PALSAR/YEARLY/FNF/2017'); // Imagen de cobertura forestal ALOS-PALSAR de 2016  
var BNB = ALOS.clip(GIF);                                // Se recorta la imagen según la geometría del incendio seleccionado
var BNBfiltro = ee.Image([BNB])
  .clipToCollection(GIF);                                // Se agrega los valores de la imagen BNB a GIF
var ZonaBNB = BNBfiltro.eq(1);
ZonaBNB = ZonaBNB.updateMask(ZonaBNB.neq(0));           // Se define la toleracia para la vectorización 
var VectorBNB = ZonaBNB.addBands(BNB).reduceToVectors({
  geometry: GIF,
  crs: BNBfiltro.projection(),
  scale: 30,
  geometryType: 'polygon',
  eightConnected: false,
  labelProperty: 'zone',
  reducer: ee.Reducer.mean()
});                                                     // Se convierten las Zonas de tolerancia en vectores
// REPRESENTACIÓN DE LA COBERTURA FORESTAL A 2016
var Bosque2016 = ee.Image(0).updateMask(0).paint(VectorBNB, '000000', 2);
var imgvacia = ee.Image().byte();
var FCNombres = ee.FeatureCollection(GIF);
var limGIF = imgvacia.paint({
  featureCollection: FCNombres,
  color: 1,
  width: 3
});
///////////////////////////////////////////////////////////////////////////////
///////////////////////// CÁLCULO DE TENDENCIAS ///////////////////////////////
///////////////////////////////////////////////////////////////////////////////
// UNIR LAS COLECCIONES DE LOS DIFERENTES SENSORES
var cNDVIL5= ee.ImageCollection(NDVI_L5.select('NDVI'));
var cNDVIL7 = ee.ImageCollection(NDVI_L7.select('NDVI'));
var cNDVIL8= ee.ImageCollection(NDVI_L8.select('NDVI'));                    // Colección NDVI
var mergeNDVI = cNDVIL5.merge(cNDVIL7);
var cNDVI = mergeNDVI.merge(cNDVIL8);
var cNBRL5 = ee.ImageCollection(NBR_L5.select('NBR'));
var cNBRL7 = ee.ImageCollection(NBR_L7.select('NBR')); 
var cNBRL8 = ee.ImageCollection(NBR_L8.select('NBR'));                      // Colección NBR
var mergeNBR = cNBRL5.merge(cNBRL7);
var cNBR = mergeNBR.merge(cNBRL8);
var cTCW = ee.ImageCollection(TCW_L5.select('TCW'));
// CÁLCULO DE LA TENDENCIA DE NDVI
function tendenciaNDVI(key){
  var NombreSelec = ee.Feature(GIF.filter(ee.Filter.eq('Name', key)).first()); // Se filtra el archivo GIF por el nombre seleccionado
  Map.centerObject(NombreSelec);                                               // Se centra el mapa al incendio seleccionado
  Map.setOptions('ROADMAP');                                                    // Se cambia la visualización del mapa base
  // CÁLCULO DE LA TENDENCIA DE NDVI
  var TenNDVI = cNDVI.formaTrend();                                    // Generación de tendencias a partir de formaTrend().
  var TenNDVI_TOTAL = TenNDVI.clip(NombreSelec);
  var mascara = ALOS.updateMask(ALOS.lte(1));                                  // Extracción de tendencias NDVI en la cobertura forestal
  var paso1 = TenNDVI_TOTAL.multiply(mascara);
  var TenNDVI_ARBOL = paso1.clip(NombreSelec);
  // CÁLCULO DE LA TENDENCIA DE NBR
  var TenNBR = cNBR.formaTrend();                                      // Generación de tendencias a partir de formaTrend().
  var mascara1 = TenNBR.updateMask(TenNBR.lte(0));                             // Uso de una máscara para tomar las tendencias positivas
  var paso2 = TenNBR.multiply(mascara1);
  var TenNBR_TOTAL = paso2.clip(NombreSelec);
  var mascara = ALOS.updateMask(ALOS.lte(1));                                  // Extracción de tendencias NDVI en la cobertura forestal
  var paso1 = TenNBR_TOTAL.multiply(mascara);
  var TenNBR_ARBOL = paso1.clip(NombreSelec);
  // CÁLCULO DE LA TENDENCIA DE TCW
  var TenTCW = cTCW.formaTrend();                                      // Generación de tendencias a partir de formaTrend().
  var TenTCW_TOTAL = TenTCW.clip(NombreSelec);
  var mascara = ALOS.updateMask(ALOS.lte(1));                                  // Extracción de tendencias NDVI en la cobertura forestal
  var paso1 = TenTCW_TOTAL.multiply(mascara);
  var TenTCW_ARBOL = paso1.clip(NombreSelec);
  var imgvacia = ee.Image().byte();
  var FCNombres = ee.FeatureCollection(GIF);
  var limGIF = imgvacia.paint({
    featureCollection: FCNombres,
    color: 1,
    width: 3
  });
  Map.addLayer(limGIF, {}, 'Limite del incendio')
  // BOTONES DE CAPAS AUXILIARES
  var BotonL1 = ui.Button({
    label: 'Lím. Incendio', 
    onClick: function() {
      BotonL1.style().set('shown', true);
      Map.addLayer(limGIF, {palette: '#ff0000'}, 'Límite GIF');
    }, 
    style: {border: '1px solid grey'}
  }); // Botón para la obtención del límite del incendio
  var BotonL2 = ui.Button({
    label: 'Lím. Forestal', 
    onClick: function() {
      BotonL2.style().set('shown', true);
      Map.addLayer(Bosque2016, {palette: '000000'}, 'Cobertura Forestal');
    }, 
    style: {border: '1px solid grey'}
  }); // Botón para la obtención del límite de la cobertura forestal
  var BotonL4 = ui.Button({
    label: 'Severidad', 
    onClick: function() {
      BotonL4.style().set('shown', true);
      Map.addLayer(reclassGEOCBI, {}, 'Severidad');
      Map.add(legend);
    }, 
    style: {border: '1px solid grey'}
  }); // Botón para la obtención de la severidad del incendio
  // BOTONES PARA CALCULAR TENDENCIAS NDVI
  var BotonT1 = ui.Button({
    label: 'Calcular "Long-Trend NDVI"', 
    onClick: function() {
      BotonT2.style().set('shown', true);
      Map.addLayer(TenNDVI_ARBOL.select('long-trend'), LeyNDVI, 'NDVI Long-Trend');
    }, 
    style: {border: '1px solid grey'}
  }); // Botón para la representación de "short-trend" total
  var BotonT2 = ui.Button({
    label: 'Calcular "Short-Trend NDVI"', 
    onClick: function() {
      BotonT4.style().set('shown', true);
      Map.addLayer(TenNDVI_ARBOL.select('short-trend'), LeyNDVI, 'NDVI Short-Trend');
    }, 
    style: {border: '1px solid grey'}
  }); // Botón para la representación de "short-trend" en la cobertura forestal
  // BOTONES PARA CALCULAR TENDENCIAS NBR
  var BotonT3 = ui.Button({
    label: 'Calcular "Long-Trend NBR"', 
    onClick: function() {
      BotonT2.style().set('shown', true);
      Map.addLayer(TenNBR_ARBOL.select('long-trend'), LeyNBR, 'NBR Long-Trend');
    }, 
    style: {border: '1px solid grey'}
  }); // Botón para la representación de "short-trend" total
  var BotonT4 = ui.Button({
    label: 'Calcular "Short-Trend NBR"', 
    onClick: function() {
      BotonT4.style().set('shown', true);
      Map.addLayer(TenNBR_ARBOL.select('short-trend'), LeyNBR, 'NBR Short-Trend');
    }, 
    style: {border: '1px solid grey'}
  }); // Botón para la representación de "short-trend" en la cobertura forestal
  // BOTONES PARA CALCULAR TENDENCIAS TCW
  var BotonT5 = ui.Button({
    label: 'Calcular "Long-Trend TCW"', 
    onClick: function() {
      BotonT2.style().set('shown', true);
      Map.addLayer(TenTCW_ARBOL.select('long-trend'), LeyTCW, 'TCW Long-Trend');
    }, 
    style: {border: '1px solid grey'}
  }); // Botón para la representación de "short-trend" total
  var BotonT6 = ui.Button({
    label: 'Calcular "Short-Trend TCW"', 
    onClick: function() {
      // Hide the button.
      BotonT4.style().set('shown', true);
      //Representación de "short-trend total
      Map.addLayer(TenTCW_ARBOL.select('short-trend'), LeyTCW, 'TCW Short-Trend');
    }, 
    style: {border: '1px solid grey'}
  }); // Botón para la representación de "short-trend" en la cobertura forestal
  // BOTON PARA MOSTRAR LOS ÍNDICES
  var BotonLimpiar = ui.Button({label: 'Limpiar el mapa',style: {border: '1px solid grey'}});
  BotonLimpiar.onClick(function() {
    Map.clear();
    paneltrayectorias.style().set('shown', false);
  }); // Control panel 1
  // ayuda 1
  var TextoAUXTREND =  ui.Label({
    value: 'Espere unos segundos',
    style:  {fontSize: '10px', fontWeight: 'Arial',color:'#000000' ,backgroundColor:'#d9d9d9'}
  }); 
  var BotonAYUDATREND = ui.Button({label: 'Ayuda tendencias',style: {border: '1px solid grey'}});
  BotonAYUDATREND.onClick(function() {
    panelinfoTREND.style().set('shown', true);
  }); // Control panel 1
  // ayuda 2 
  var BotonAYUDAVIS = ui.Button({label: 'Ayuda visualización',style: {border: '1px solid grey'}});
  BotonAYUDAVIS.onClick(function() {
    panelinfoVIS.style().set('shown', true);
  }); // Control panel 1
  // AÑADIR BOTONES AL PANEL PRINCIPAL
  var textoaux =  ui.Label({
      value: '4) Capas de información auxiliar:',
      style:  {fontSize: '14px', fontWeight: 'Arial', color:'#000000' ,backgroundColor:'#bdbdbd'}
  });
  var lp1 = (ui.Panel([textoaux, ui.Panel([BotonL1, BotonL2, BotonL4], ui.Panel.Layout.flow('horizontal'), fondo4)], ui.Panel.Layout.flow('vertical'), fondo4));
  var ContinuasText =  ui.Label({
      value: '3) Calculo de tendencias mediante el algoritmo formaTrend para el índice seleccionado:',
      style:  {fontSize: '14px', fontWeight: 'Arial', color:'#000000' ,backgroundColor:'#d9d9d9'}
  });
  var CortasText =  ui.Label({
      value: 'Info: Esta operación puede tardar unos segundos. No se debe confundir las trayectorias con las tendencias. En el caso de las tendencias unicamente veremos una representación visual de un dato numerico, en las trayectorias podremos observar el valor que tiene el pixel seleccionado en sus respectivos índices.',
      style:  {fontSize: '10px', fontWeight: 'Arial',textAlign: 'justify',color:'#000000' ,backgroundColor:'#d9d9d9'}
  });
  var lp2 = (ui.Panel([ContinuasText,BotonT1, BotonT2, BotonT3, BotonT4, BotonT5, BotonT6, ui.Panel([BotonAYUDATREND,TextoAUXTREND], ui.Panel.Layout.flow('horizontal'), fondo3), ui.Label({
      value: 'Tendencias en la recuperación de la cubierta forestal',
      style:  {fontSize: '12px', fontWeight: 'Arial',textAlign: 'justify',color:'#000000' ,backgroundColor:'#d9d9d9'}
  }), (CrearLeyenda(LeyNDVI)), BotonAYUDAVIS], ui.Panel.Layout.flow('vertical'), fondo3));
  panelprincial.widgets().set(1, lp2);
  panelprincial.widgets().set(2, lp1);
  // AÑADIR LEYENDA Y MINIMAPA AL PANEL PRINCIPAL
  var leyendatext =  ui.Label({
      value: '5) Ayuda a la visualización:',
      style:  {fontSize: '14px', fontWeight: 'Arial',textAlign: 'justify',color:'#000000' ,backgroundColor:'#d9d9d9'}
  });
  var leyendatext1 =  ui.Label({
      value: 'Tendencias en la recuperación de la cubierta forestal',
      style:  {fontSize: '12px', fontWeight: 'Arial',textAlign: 'justify',color:'#000000' ,backgroundColor:'#d9d9d9'}
  });
  var zoomtext =  ui.Label({
      value: 'Zoom al pixel seleccionado:',
      style:  {fontSize: '12px', fontWeight: 'Arial',textAlign: 'justify',color:'#000000' ,backgroundColor:'#d9d9d9'}
  });
  var lp4 = (ui.Panel([leyendatext, zoomtext, zoomBox, ui.Panel([ui.Label('Coordenadas:'),lon, lat], 
  ui.Panel.Layout.flow('horizontal')),BotonLimpiar], ui.Panel.Layout.flow('vertical'), fondo5));
  panelprincial.widgets().set(3, lp4);
}
// AÑADIR BOTONES DE SELECCION E INTRO AL PANEL
panelprincial.add(ui.Panel([
  ui.Panel ([intro, BotonINFORPI], ui.Panel.Layout.flow('horizontal'), fondo1),
  TextoAP1TITULO,
  ui.Panel ([seleccion_NDVI], ui.Panel.Layout.flow('horizontal'), fondo),
  ui.Panel ([TextoAP2TITULO, BotonCalcularTRAY, BotonINFOGIF], ui.Panel.Layout.flow('vertical'), fondo2)
  ], ui.Panel.Layout.flow('vertical'), fondo));
// PANEL INICIAL
// BOTONES DE CAPAS AUXILIARES
  var BotonL1 = ui.Button({
    label: 'Lím. Incendio', 
    onClick: function() {
      BotonL1.style().set('shown', true);
      Map.addLayer(limGIF, {palette: '#ff0000'}, 'Límite GIF');
    }, 
    style: {border: '1px solid grey'}
  }); // Botón para la obtención del límite del incendio
  var BotonL2 = ui.Button({
    label: 'Lím. Forestal', 
    onClick: function() {
      BotonL2.style().set('shown', true);
      Map.addLayer(Bosque2016, {palette: '000000'}, 'Cobertura Forestal');
    }, 
    style: {border: '1px solid grey'}
  }); // Botón para la obtención del límite de la cobertura forestal
  var BotonL4 = ui.Button({
    label: 'Severidad', 
    onClick: function() {
      BotonL4.style().set('shown', true);
      Map.addLayer(reclassGEOCBI, {}, 'Severidad');
      Map.add(legend);
    }, 
    style: {border: '1px solid grey'}
  }); // Botón para la obtención de la severidad del incendio
  // BOTONES PARA CALCULAR TENDENCIAS NDVI
  var BotonT1 = ui.Button({
    label: 'Calcular "Long-Trend NDVI"', 
    onClick: function() {
      BotonT2.style().set('shown', true);
      Map.addLayer(TenNDVI_ARBOL.select('long-trend'), LeyNDVI, 'NDVI Long-Trend');
    }, 
    style: {border: '1px solid grey'}
  }); // Botón para la representación de "short-trend" total
  var BotonT2 = ui.Button({
    label: 'Calcular "Short-Trend NDVI"', 
    onClick: function() {
      BotonT4.style().set('shown', true);
      Map.addLayer(TenNDVI_ARBOL.select('short-trend'), LeyNDVI, 'NDVI Short-Trend');
    }, 
    style: {border: '1px solid grey'}
  }); // Botón para la representación de "short-trend" en la cobertura forestal
  // BOTONES PARA CALCULAR TENDENCIAS NBR
  var BotonT3 = ui.Button({
    label: 'Calcular "Long-Trend NBR"', 
    onClick: function() {
      BotonT2.style().set('shown', true);
      Map.addLayer(TenNBR_ARBOL.select('long-trend'), LeyNBR, 'NBR Long-Trend');
    }, 
    style: {border: '1px solid grey'}
  }); // Botón para la representación de "short-trend" total
  var BotonT4 = ui.Button({
    label: 'Calcular "Short-Trend NBR"', 
    onClick: function() {
      BotonT4.style().set('shown', true);
      Map.addLayer(TenNBR_ARBOL.select('short-trend'), LeyNBR, 'NBR Short-Trend');
    }, 
    style: {border: '1px solid grey'}
  }); // Botón para la representación de "short-trend" en la cobertura forestal
  // BOTONES PARA CALCULAR TENDENCIAS TCW
  var BotonT5 = ui.Button({
    label: 'Calcular "Long-Trend TCW"', 
    onClick: function() {
      BotonT2.style().set('shown', true);
      Map.addLayer(TenTCW_ARBOL.select('long-trend'), LeyTCW, 'TCW Long-Trend');
    }, 
    style: {border: '1px solid grey'}
  }); // Botón para la representación de "short-trend" total
  var BotonT6 = ui.Button({
    label: 'Calcular "Short-Trend TCW"', 
    onClick: function() {
      // Hide the button.
      BotonT4.style().set('shown', true);
      //Representación de "short-trend total
      Map.addLayer(TenTCW_ARBOL.select('short-trend'), LeyTCW, 'TCW Short-Trend');
    }, 
    style: {border: '1px solid grey'}
  }); // Botón para la representación de "short-trend" en la cobertura forestal
  // BOTON PARA MOSTRAR LOS ÍNDICES
  var BotonLimpiar = ui.Button({label: 'Limpiar el mapa',style: {border: '1px solid grey'}});
  BotonLimpiar.onClick(function() {
    Map.clear();
    zoomBox.clear();
    zoomBox.addLayer(imagen8, {bands: ['B5', 'B6', 'B4'], min: 81, max: 5604}, 'good composite');
    zoomBox.add(TextoMiniMapa);
    Map.add(panelinfoGIF);
    Map.add(panelinfoRPI);
    Map.add(panelinfoTREND);
    Map.add(panelinfoVIS);
    Map.add(Proyecto);
    paneltrayectorias.style().set('shown', false);
    paneltrayectorias.clear();
    paneltrayectorias.add(TextoTRAY1);
    paneltrayectorias.widgets().set(2, TextoTRAY2);
    paneltrayectorias.widgets().set(5, cerrar_1);
    zoomBox.setControlVisibility(false);
  }); // Control panel 1
  // ayuda 1
  var TextoAUXTREND =  ui.Label({
    value: 'Espere unos segundos',
    style:  {fontSize: '10px', fontWeight: 'Arial',color:'#000000' ,backgroundColor:'#d9d9d9'}
  }); 
  var BotonAYUDATREND = ui.Button({label: 'Ayuda tendencias',style: {border: '1px solid grey'}});
  BotonAYUDATREND.onClick(function() {
    panelinfoTREND.style().set('shown', true);
  }); // Control panel 1
  // ayuda 2 
  var BotonAYUDAVIS = ui.Button({label: 'Ayuda visualización',style: {border: '1px solid grey'}});
  BotonAYUDAVIS.onClick(function() {
    panelinfoVIS.style().set('shown', true);
  }); // Control panel 1
  // AÑADIR BOTONES AL PANEL PRINCIPAL
  var textoaux =  ui.Label({
      value: '4) Capas de información auxiliar:',
      style:  {fontSize: '14px', fontWeight: 'Arial', color:'#000000' ,backgroundColor:'#bdbdbd'}
  });
  var lp1 = (ui.Panel([textoaux, ui.Panel([BotonL1, BotonL2, BotonL4], ui.Panel.Layout.flow('horizontal'), fondo4)], ui.Panel.Layout.flow('vertical'), fondo4));
  var ContinuasText =  ui.Label({
      value: '3) Calculo de tendencias mediante el algoritmo formaTrend para el índice seleccionado:',
      style:  {fontSize: '14px', fontWeight: 'Arial', color:'#000000' ,backgroundColor:'#d9d9d9'}
  });
  var CortasText =  ui.Label({
      value: 'Info: Esta operación puede tardar unos segundos. No se debe confundir las trayectorias con las tendencias. En el caso de las tendencias unicamente veremos una representación visual de un dato numerico, en las trayectorias podremos observar el valor que tiene el pixel seleccionado en sus respectivos índices.',
      style:  {fontSize: '10px', fontWeight: 'Arial',textAlign: 'justify',color:'#000000' ,backgroundColor:'#d9d9d9'}
  });
  var lp2 = (ui.Panel([ContinuasText, BotonT1, BotonT2, BotonT3, BotonT4, BotonT5, BotonT6, ui.Panel([BotonAYUDATREND,TextoAUXTREND], ui.Panel.Layout.flow('horizontal'), fondo3), ui.Label({
      value: 'Tendencias en la recuperación de la cubierta forestal',
      style:  {fontSize: '12px', fontWeight: 'Arial',textAlign: 'justify',color:'#000000' ,backgroundColor:'#d9d9d9'}
  }), (CrearLeyenda(LeyNDVI)), BotonAYUDAVIS], ui.Panel.Layout.flow('vertical'), fondo3));
  panelprincial.widgets().set(1, lp2);
  panelprincial.widgets().set(2, lp1);
  // AÑADIR LEYENDA Y MINIMAPA AL PANEL PRINCIPAL
  var leyendatext =  ui.Label({
      value: '5) Ayuda a la visualización:',
      style:  {fontSize: '14px', fontWeight: 'Arial',textAlign: 'justify',color:'#000000' ,backgroundColor:'#d9d9d9'}
  });
  var leyendatext1 =  ui.Label({
      value: 'Tendencias en la recuperación de la cubierta forestal',
      style:  {fontSize: '12px', fontWeight: 'Arial',textAlign: 'justify',color:'#000000' ,backgroundColor:'#d9d9d9'}
  });
  var zoomtext =  ui.Label({
      value: 'Zoom al pixel seleccionado:',
      style:  {fontSize: '12px', fontWeight: 'Arial',textAlign: 'justify',color:'#000000' ,backgroundColor:'#d9d9d9'}
  });
  var lp4 = (ui.Panel([leyendatext, zoomtext, zoomBox, ui.Panel([ui.Label('Coordenadas:'),lon, lat], 
  ui.Panel.Layout.flow('horizontal')),BotonLimpiar], ui.Panel.Layout.flow('vertical'), fondo5));
  panelprincial.widgets().set(3, lp4);
// SELECCIÓN DEL ESTILO DEL CURSOR DEL MAPA
Map.style().set('cursor', 'crosshair');