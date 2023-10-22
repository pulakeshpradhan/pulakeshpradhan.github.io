var LAMBAYEQUE = ui.import && ui.import("LAMBAYEQUE", "table", {
      "id": "users/fhuamani/LAMBAYEQUE"
    }) || ee.FeatureCollection("users/fhuamani/LAMBAYEQUE");
///////////////////////////////   CREACION DEL PANEL  //////////////////////////////////////////
// Generate main panel and add it to the map.
var panel = ui.Panel({style: {width:'20%'}});
ui.root.insert(0,panel);
// Define title and description.
var titulo = ui.Label('ANALISIS MULTITEMPORAL DEL NDVI JUNIO - JULIO - AGOSTO - LAMBAYEQUE 2020',
  {fontWeight: 'bold', fontSize: '15px', margin: '10px 5px'}
);
var resumen = ui.Label('En este panel conocerás el análisis multitemportal del NDVI en Lambayeque,  '+ 
  ' podrás analizar los cambios en la cobertura e'+
  ' inferir la homogeneidad de los cultivos según el comportamiento multitemporal del NDVI,'+
  ' los colores representan homogeneidad en los cambios del NDVI que pueden inferir en cultivos homogéneos '+
  ' ,en las zonas donde no existen cambios de la vegetación en el tiempo pueden considerarse cultivos permamentes previo analisis'+
  ' temporales y de "zonificación", es una de las múltiples aplicaciones que puedes desarrollar en Google Engine', {fontSize: '13px'});
var agricultura = ui.Label('AGRICULTURA',
  {fontWeight: 'bold', fontSize: '24px', margin: '10px 5px'}
);
var table_agricola = ui.Chart(
    [
      ['<h4>AGRO</h4>'],
      ['<img src=https://ericka669.files.wordpress.com/2016/09/images.jpg?w=1180 width=300px>']
    ],
    'Table', {allowHtml: true});
var agricultura_text = ui.Label('Se puede analizar al evolución de los cultivos e inferir su homogeniedad previo análisis tiempo vs zonificación', {});
var table_deforestacion = ui.Chart(
    [
      ['<h4>CULTIVOS PERMANENTES</h4>'],
      ['<img src=https://www.mercacei.com/fotos/2015/olivosicilia.jpg width=300px>']
    ],
    'Table', {allowHtml: true});
var deforestacion_text = ui.Label('Una App desarrollada en Google Engine', {});
// Add title and description to the panel.  
panel.add(titulo).add(resumen);
panel.add(table_agricola).add(agricultura_text)
panel.add(table_deforestacion).add(deforestacion_text)
// AnÃ¡lisis multitemporales de Ã­ndices NDVI
// http://www.gisandbeers.com/analisis-de-vegetacion-ndvi-multitemporal-google-earth-engine/
// Declaramos tres momentos temporales para disponer de los datos necesarios
var Tiempo1 = ee.ImageCollection ('COPERNICUS/S2')
  .filterDate ('2020-06-01' ,'2020-06-30') // Momento temporal 1
  .filterMetadata ('CLOUDY_PIXEL_PERCENTAGE', 'Less_Than', 40)
  .filterBounds(LAMBAYEQUE);
var Tiempo1b = Tiempo1.reduce(ee.Reducer.median());
var Tiempo2 = ee.ImageCollection ('COPERNICUS/S2')
  .filterDate ('2020-07-01' ,'2020-07-30') // Momento temporal 2
  .filterMetadata ('CLOUDY_PIXEL_PERCENTAGE', 'Less_Than', 40)
  .filterBounds(LAMBAYEQUE);
var Tiempo2b = Tiempo2.reduce(ee.Reducer.median());
var Tiempo3 = ee.ImageCollection ('COPERNICUS/S2')
  .filterDate ('2020-08-01' ,'2020-08-30') // Momento temporal 3
  .filterMetadata ('CLOUDY_PIXEL_PERCENTAGE', 'Less_Than', 40)
  .filterBounds(LAMBAYEQUE);
var Tiempo3b = Tiempo3.reduce(ee.Reducer.median());
// Calculamos el Ã­ndice NDVI para cada uno de los tres momentos
var NDVI1 = Tiempo1b.normalizedDifference (['B8_median', 'B4_median']);
var CORTE1 = ee.FeatureCollection(LAMBAYEQUE)
var clip1 = NDVI1.clipToCollection(CORTE1);
var NDVI2 = Tiempo2b.normalizedDifference (['B8_median', 'B4_median']);
var CORTE2 = ee.FeatureCollection(LAMBAYEQUE)
var clip2 = NDVI2.clipToCollection(CORTE2);
var NDVI3 = Tiempo3b.normalizedDifference (['B8_median', 'B4_median'])
var CORTE3 = ee.FeatureCollection(LAMBAYEQUE)
var clip3 = NDVI3.clipToCollection(CORTE3);
// Realizamos una composiciÃ³n RGB a falso color con cada uno de los tres Ã­ndices NDVI
var NDVImultitemporal = NDVI1.addBands(NDVI2).addBands(NDVI3);
var CORTE4 = ee.FeatureCollection(LAMBAYEQUE)
var clip4 = NDVImultitemporal.clipToCollection(CORTE4);
// Representamos y simbolizamos cada uno de los tres Ã­ndices NDVI
Map.addLayer (clip3, {max: 1.0, min: 0, palette: ['CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901', '66A000', '529400', '3E8601',
    '207401', '056201', '004C00', '023B01', '012E01', '011D01', '011301']},'NDVI AGOSTO');
Map.addLayer (clip2, {max: 1.0, min: 0, palette: ['CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901', '66A000', '529400', '3E8601',
    '207401', '056201', '004C00', '023B01', '012E01', '011D01', '011301']},'NDVI JULIO');
Map.addLayer (clip1, {max: 1.0, min: 0, palette: ['CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901', '66A000', '529400', '3E8601',
    '207401', '056201', '004C00', '023B01', '012E01', '011D01', '011301']},'NDVI JUNIO');
// Representamos y simbolizamos el NDVI multitemporal para identificar los cambios temporales
Map.addLayer (clip4, {max: 0.7, min: 0.1, gamma: 1.0,}, 'NDVI MULTITEMPORAL');
Map.centerObject(LAMBAYEQUE)
//Map.setCenter (-80.03,-6.08, 12); 
/////////////////// TITULO //////////////////////////
var etiqueta = ui.Label({value:"ANÁLISIS MULTITEMPORAL DEL NDVI JUNIO - JULIO - AGOSTO  - LAMBAYEQUE - 2020", 
                         style:{fontSize:'20px', 
                         color:'indigo', 
                         backgroundColor:'white'   
                         }});
Map.add(etiqueta);
/////////////////////// BOTON CENTRAR MAPA /////////////////////////////////////
var boton_centrar = ui.Button({label: "Centrar tematico", 
                               onClick: function(n){n= Map.centerObject(LAMBAYEQUE)}, 
                               style:{position:'bottom-center' } })
Map.add(boton_centrar);