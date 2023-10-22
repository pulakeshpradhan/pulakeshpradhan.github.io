// Análisis de severidad de incendios
// http://www.gisandbeers.com/analisis-severidad-de-incendios-nbr-google-earth-engine/
// LLamamos a la imagen satélite específica añadiendo su ID de la colección de imágenes
var potreros = ee.FeatureCollection('users/mabrigo/Alambrado_actual')
var parcelitas = ee.FeatureCollection('projects/mabrigo/assets/parcelas-el-rosario')
var PostIncendio = ee.Image ('COPERNICUS/S2_SR/20220113T135109_20220113T135108_T21HVD')
// Calculamos el índice NBR para el momento jugando con las bandas NIR y SWIR y lo representamos en el visor
var NBRPostIncendio= PostIncendio.normalizedDifference (['B8','B12']) ; 
// Repetimos el proceso con una imagen previa al incendio
var PreIncendio = ee.Image ('COPERNICUS/S2_SR/20211219T135111_20211219T135113_T21HVD');
var NBRPreIncendio= PreIncendio.normalizedDifference (['B8','B12']) ; 
// Analizamos la severidad con una diferencia entre imágenes y representamos los datos en en el visor
/* var IndiceSeveridad = NBRPreIncendio.subtract(NBRPostIncendio);
 Map.addLayer (IndiceSeveridad,{
    max: 1.0,
    min: 0.0,
    'palette': ['011301', '011D01', '012E01', '023B01', '004C00', '056201',
        '207401', '3E8601', '529400', '74A901', '99B718', 'FCD163',
        'F1B555', 'DF923D', 'CE7E45', '66A000']},
    'Índice severidad de incendio'); */
// Centramos el resultado del índice de severidad en la vista con un zoom, por ejemplo, de 9
// VISUALIZACION!
Map.addLayer (NBRPreIncendio,{
    max: 1.0,
    min: 0.0,
    'palette': ['#7F0010', '#D99143', '#C04529', '#E02E20', '#EC6521', '#F6D53B']},
    'Mapa NBR PreIncendio');
Map.addLayer (NBRPostIncendio,{
    max: 1.0,
    min: 0.0,
    'palette': ['#7F0010', '#D99143', '#C04529', '#E02E20', '#EC6521', '#F6D53B']},
    'Mapa NBR PostIncendio');
Map.addLayer (PreIncendio, {
     max: 4000.0, 
     min: 0.0,
     gamma: 0.5, 
     bands: ['B11','B8','B4']}, 
     'PreIncendio');
// Añadimos la imagen a la vista haciendo una composición de colores en el SWIR/NIR y asignamos un nombre de etiqueta en la vista
Map.addLayer (PostIncendio, {
     max: 4000.0, 
     min: 0.0,
     gamma: 0.5, 
     bands: ['B11','B8','B4']}, 
     'PostIncendio');
Map.setCenter(-57.9720, -32.8017, 14);
//Map.centerObject (potreros, 14); 
var empty = ee.Image().byte()	
var outline = empty.paint({	
  featureCollection: potreros,	
color: 1,	
width: 3	
})	
Map.addLayer(outline, {palette: 'FF0000'}, 'Reserva Protegida "El Rosario"')	
var empty2 = ee.Image().byte()	
var outline2 = empty2.paint({	
  featureCollection: parcelitas,	
color: 1,	
width: 3	
})	
Map.addLayer(outline2, {palette: '#001fff'}, 'Parcelas muestreo')