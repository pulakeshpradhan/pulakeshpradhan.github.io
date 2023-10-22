var geomtry = ui.import && ui.import("geomtry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -4.758931087672977,
                37.80164090048937
              ],
              [
                -4.759746479213504,
                37.80415012542292
              ],
              [
                -4.760518955409793,
                37.80564205659129
              ],
              [
                -4.760991024196414,
                37.80798161523168
              ],
              [
                -4.761878089603604,
                37.8109569199633
              ],
              [
                -4.763766364750088,
                37.81438121966593
              ],
              [
                -4.765654639896573,
                37.816313675133024
              ],
              [
                -4.765568809208096,
                37.81716122736173
              ],
              [
                -4.7654829785196196,
                37.817669754028095
              ],
              [
                -4.762350158390225,
                37.817229031119666
              ],
              [
                -4.76123435944003,
                37.82228023593222
              ],
              [
                -4.772435264286221,
                37.82404299114167
              ],
              [
                -4.7724659704366035,
                37.82160940285515
              ],
              [
                -4.773066785255939,
                37.81855835315361
              ],
              [
                -4.7746117376485175,
                37.81427335903273
              ],
              [
                -4.7749121450581855,
                37.80739068443267
              ],
              [
                -4.775641705910236,
                37.80691599357032
              ],
              [
                -4.777529981056721,
                37.80613613767225
              ],
              [
                -4.778559949318439,
                37.80539018084619
              ],
              [
                -4.778517033974201,
                37.80403387640371
              ],
              [
                -4.77954700223592,
                37.80362698021383
              ],
              [
                -4.779976155678303,
                37.802880998043385
              ],
              [
                -4.77954700223592,
                37.80128728361837
              ],
              [
                -4.778602864662678,
                37.79999872341002
              ],
              [
                -4.777272488991291,
                37.79891360264146
              ],
              [
                -4.776500012795002,
                37.79755717926428
              ],
              [
                -4.775856282631428,
                37.797285891600005
              ],
              [
                -4.774901429711416,
                37.799905424406646
              ],
              [
                -4.775105264107258,
                37.80259277564142
              ],
              [
                -4.7581322454610175,
                37.79884578206415
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
        [[[-4.758931087672977, 37.80164090048937],
          [-4.759746479213504, 37.80415012542292],
          [-4.760518955409793, 37.80564205659129],
          [-4.760991024196414, 37.80798161523168],
          [-4.761878089603604, 37.8109569199633],
          [-4.763766364750088, 37.81438121966593],
          [-4.765654639896573, 37.816313675133024],
          [-4.765568809208096, 37.81716122736173],
          [-4.7654829785196196, 37.817669754028095],
          [-4.762350158390225, 37.817229031119666],
          [-4.76123435944003, 37.82228023593222],
          [-4.772435264286221, 37.82404299114167],
          [-4.7724659704366035, 37.82160940285515],
          [-4.773066785255939, 37.81855835315361],
          [-4.7746117376485175, 37.81427335903273],
          [-4.7749121450581855, 37.80739068443267],
          [-4.775641705910236, 37.80691599357032],
          [-4.777529981056721, 37.80613613767225],
          [-4.778559949318439, 37.80539018084619],
          [-4.778517033974201, 37.80403387640371],
          [-4.77954700223592, 37.80362698021383],
          [-4.779976155678303, 37.802880998043385],
          [-4.77954700223592, 37.80128728361837],
          [-4.778602864662678, 37.79999872341002],
          [-4.777272488991291, 37.79891360264146],
          [-4.776500012795002, 37.79755717926428],
          [-4.775856282631428, 37.797285891600005],
          [-4.774901429711416, 37.799905424406646],
          [-4.775105264107258, 37.80259277564142],
          [-4.7581322454610175, 37.79884578206415]]]),
    ROI = ui.import && ui.import("ROI", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -4.828887835080469,
                37.842033684803106
              ],
              [
                -4.828887835080469,
                37.78019156936474
              ],
              [
                -4.7063216119359375,
                37.78019156936474
              ],
              [
                -4.7063216119359375,
                37.842033684803106
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
        [[[-4.828887835080469, 37.842033684803106],
          [-4.828887835080469, 37.78019156936474],
          [-4.7063216119359375, 37.78019156936474],
          [-4.7063216119359375, 37.842033684803106]]], null, false),
    lluvia = ui.import && ui.import("lluvia", "table", {
      "id": "users/nestorcaalsuc/DAWI2021/Lluvia"
    }) || ee.FeatureCollection("users/nestorcaalsuc/DAWI2021/Lluvia");
var pts = ee.FeatureCollection("users/nestorcaalsuc/DAWI2021/Datos");
// Año 2018
var Feb2018= ee.ImageCollection ('COPERNICUS/S2')
  .filterDate ('2018-02-01' ,'2018-02-28') 
  .filterMetadata ('CLOUDY_PIXEL_PERCENTAGE', 'Less_Than', 20);
var Feb2018b = Feb2018.reduce(ee.Reducer.median()).clip(ROI);
var May2018= ee.ImageCollection ('COPERNICUS/S2')
  .filterDate ('2018-05-01' ,'2018-05-31') 
  .filterMetadata ('CLOUDY_PIXEL_PERCENTAGE', 'Less_Than', 20);
var May2018b = May2018.reduce(ee.Reducer.median()).clip(ROI);
var Jul2018= ee.ImageCollection ('COPERNICUS/S2')
  .filterDate ('2018-07-01' ,'2018-07-31') 
  .filterMetadata ('CLOUDY_PIXEL_PERCENTAGE', 'Less_Than', 20);
var Jul2018b = Jul2018.reduce(ee.Reducer.median()).clip(ROI);
var Ago2018= ee.ImageCollection ('COPERNICUS/S2')
  .filterDate ('2018-08-01' ,'2018-08-31') 
  .filterMetadata ('CLOUDY_PIXEL_PERCENTAGE', 'Less_Than', 20);
var Ago2018b = Ago2018.reduce(ee.Reducer.median()).clip(ROI);
// Año 2019
var Feb2019= ee.ImageCollection ('COPERNICUS/S2')
  .filterDate ('2019-02-01' ,'2019-02-28') 
  .filterMetadata ('CLOUDY_PIXEL_PERCENTAGE', 'Less_Than', 20);
var Feb2019b = Feb2019.reduce(ee.Reducer.median()).clip(ROI);
var May2019= ee.ImageCollection ('COPERNICUS/S2')
  .filterDate ('2019-05-01' ,'2019-05-31') 
  .filterMetadata ('CLOUDY_PIXEL_PERCENTAGE', 'Less_Than', 20);
var May2019b = May2019.reduce(ee.Reducer.median()).clip(ROI);
var Jul2019= ee.ImageCollection ('COPERNICUS/S2')
  .filterDate ('2019-07-01' ,'2019-07-31') 
  .filterMetadata ('CLOUDY_PIXEL_PERCENTAGE', 'Less_Than', 20);
var Jul2019b = Jul2019.reduce(ee.Reducer.median()).clip(ROI);
var Sep2019= ee.ImageCollection ('COPERNICUS/S2')
  .filterDate ('2019-09-01' ,'2019-09-30') 
  .filterMetadata ('CLOUDY_PIXEL_PERCENTAGE', 'Less_Than', 20);
var Sep2019b = Sep2019.reduce(ee.Reducer.median()).clip(ROI);
// Año 2020
var Feb2020= ee.ImageCollection ('COPERNICUS/S2')
  .filterDate ('2020-02-01' ,'2020-02-28') 
  .filterMetadata ('CLOUDY_PIXEL_PERCENTAGE', 'Less_Than', 20);
var Feb2020b = Feb2020.reduce(ee.Reducer.median()).clip(ROI);
var May2020= ee.ImageCollection ('COPERNICUS/S2')
  .filterDate ('2020-05-01' ,'2020-05-31') 
  .filterMetadata ('CLOUDY_PIXEL_PERCENTAGE', 'Less_Than', 20);
var May2020b = May2020.reduce(ee.Reducer.median()).clip(ROI);
var Jul2020= ee.ImageCollection ('COPERNICUS/S2')
  .filterDate ('2020-07-01' ,'2020-07-31') 
  .filterMetadata ('CLOUDY_PIXEL_PERCENTAGE', 'Less_Than', 20);
var Jul2020b = Jul2020.reduce(ee.Reducer.median()).clip(ROI);
var Oct2020= ee.ImageCollection ('COPERNICUS/S2')
  .filterDate ('2020-10-01' ,'2020-10-31') 
  .filterMetadata ('CLOUDY_PIXEL_PERCENTAGE', 'Less_Than', 20);
var Oct2020b = Oct2020.reduce(ee.Reducer.median()).clip(ROI);
//NDVI 2018
var NDVIFeb2018 = Feb2018b.normalizedDifference (['B8_median', 'B4_median']);
var NDVIMay2018 = May2018b.normalizedDifference (['B8_median', 'B4_median']);
var NDVIJul2018 = Jul2018b.normalizedDifference (['B8_median', 'B4_median']);
var NDVIAgo2018 = Ago2018b.normalizedDifference (['B8_median', 'B4_median']);
//NDVI 2019
var NDVIFeb2019 = Feb2019b.normalizedDifference (['B8_median', 'B4_median']);
var NDVIMay2019 = May2019b.normalizedDifference (['B8_median', 'B4_median']);
var NDVIJul2019 = Jul2019b.normalizedDifference (['B8_median', 'B4_median']);
var NDVISep2019 = Sep2019b.normalizedDifference (['B8_median', 'B4_median']);
//NDVI 2020
var NDVIFeb2020 = Feb2020b.normalizedDifference (['B8_median', 'B4_median']);
var NDVIMay2020 = May2020b.normalizedDifference (['B8_median', 'B4_median']);
var NDVIJul2020 = Jul2020b.normalizedDifference (['B8_median', 'B4_median']);
var NDVIOct2020 = Oct2020b.normalizedDifference (['B8_median', 'B4_median']);
var NDVI2018 = NDVIFeb2018.addBands(NDVIMay2018).addBands(NDVIJul2018).addBands(NDVIAgo2018);
var NDVI2019 = NDVIFeb2019.addBands(NDVIMay2019).addBands(NDVIJul2019).addBands(NDVISep2019);
var NDVI2020 = NDVIFeb2020.addBands(NDVIMay2020).addBands(NDVIJul2020).addBands(NDVIOct2020);
var NDVImultitemporal = NDVI2018.addBands(NDVI2019).addBands(NDVI2020).clip(ROI); 
var visNDVI = {max: 1.0, min: 0, palette: ['CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901', '66A000', '529400', '3E8601',
    '207401', '056201', '004C00', '023B01', '012E01', '011D01', '011301']}
var visNDVI2 = {max: 1.0, min: 0, palette: ['CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '207401', '056201', '004C00', '023B01', 
    '012E01', '011D01', '011301']}
// Representamos y simbolizamos el NDVI multitemporal para identificar los cambios temporales
Map.addLayer (NDVImultitemporal, {max: 0.7, min: 0.1, gamma: 1.0,}, 'NDVI multitemporal',0);
var RellenoAOI = ee.Image().byte();
var LimiteAOI = RellenoAOI.paint({featureCollection: geomtry, width: 2,});        
Map.centerObject(pts,14)  
// Crear variables para capas de GUI para cada capa
var A = ui.Map.Layer(NDVIFeb2018,visNDVI ,'NDVIFeb2018',0);
var B = ui.Map.Layer(NDVIMay2018,visNDVI ,'NDVIMay2018',0);
var C = ui.Map.Layer(NDVIJul2018,visNDVI ,'NDVIJul2018',0);
var D = ui.Map.Layer(NDVIAgo2018,visNDVI ,'NDVIAgo2018',0);
var E = ui.Map.Layer(NDVIFeb2019,visNDVI ,'NDVIFeb2019',0);
var F = ui.Map.Layer(NDVIMay2019,visNDVI ,'NDVIMay2019',0);
var G = ui.Map.Layer(NDVIJul2019,visNDVI ,'NDVIJul2019',0);
var H = ui.Map.Layer(NDVISep2019,visNDVI ,'NDVISep2019',0);
var I = ui.Map.Layer(NDVIFeb2020,visNDVI ,'NDVIFeb2020',0);
var J = ui.Map.Layer(NDVIMay2020,visNDVI ,'NDVIMay2020',0);
var K = ui.Map.Layer(NDVIJul2020,visNDVI ,'NDVIJul2020',0);
var L = ui.Map.Layer(NDVIOct2020,visNDVI ,'NDVIOct2020',0);
var M = ui.Map.Layer(LimiteAOI, {palette: 'red', opacity: 0.8}, 'Delimitación',1); 
var N = ui.Map.Layer(pts, {color: 'blue'}, 'Puntos de muestreo',1)
//Agrega  capas al mapa. Se agregarán pero no se mostrarán
Map.add(A)
Map.add(B)
Map.add(C)
Map.add(D)
Map.add(E)
Map.add(F)
Map.add(G)
Map.add(H)
Map.add(I)
Map.add(J)
Map.add(K)
Map.add(L)
Map.add(M)
Map.add(N)
// ////////////////////////////////////////////////// ///////////////
// // Configurar paneles y widgets para su visualización //
// ////////////////////////////////////////////////// ///////////////
// Configurar widgets de título y resumen
// Título de la aplicación
var header = ui.Label('Finca “El Blanquillo”', 
            { fontSize: '22px', fontWeight: 'bold', color: '1FAB09'});
// Resumen de la aplicación
var text = ui.Label(
  'Este visor ha sido diseñado para el #DAWI2021 27, 28 y 29 de mayo de 2021. Reto “ELAIA” ',
    {fontSize: '14px', fontWeight: 'bold'});
 var text2 = ui.Label(
   'La empresa ELAIA, productora de aceite, tiene en explotación la finca “El Blanquillo”, de 222 ha,'+
   ' con un sistema de olivar superintensivo, principalmente de la variedad Arbosana, en la provincia'+
   ' de Córdoba, siendo la fecha de plantación el año 2015. \n\n Desde el año 2018 se lleva realizando '+
   ' un seguimiento del cultivo a partir de 27 puntos de muestreo distribuidos por diferentes sectores'+
    'de riego de la finca. La información que se encuentra dispuesta inicia desde el 01 al 30 de noviembre del 2020.',
    {fontSize: '12px'});   
 var text3 = ui.Label(
   'Objetivo',
    {fontSize: '14px', fontWeight: 'bold'});  
 var text4 = ui.Label(
   'Realizar el mejor análisis sobre las variables rendimiento graso, kilogramos de aceituna y de aceite de las campañas 2018, 2019 y 2020 ',
    {fontSize: '12px'});  
// Crea un panel para contener texto
var panel = ui.Panel({
  widgets:[header, text, text2, text3, text4],//Adds header and text
  style:{width: '20%',position:'middle-right'}});   
// //Esto crea otro panel para albergar un separador de línea e instrucciones para el usuario.
var intro = ui.Panel([
  ui.Label({
    value: '_________________________________________',
    style: {fontWeight: 'bold',  color: '01FFFF'},
  }),
  ui.Label({
    value:'Capas disponibles',
    style: {fontSize: '16px', fontWeight: 'bold'}
  })]);
  // //Agregue este nuevo panel al panel más grande que creamos
panel.add(intro)
// //3.4) Agregue nuestro panel principal a la raíz de nuestra GUI
ui.root.insert(0,panel)
////////////////////////////////////////////////// ///////////////
// // 4) Agregar widgets de casilla de verificación y leyendas //
// ////////////////////////////////////////////////// ///////////////
// //4.1) Crea una nueva etiqueta para esta serie de casillas de verificación
var extLabel = ui.Label({value:'Fechas de Monitoreo',
style: {fontWeight: 'bold', fontSize: '16px', margin: '10px 5px'}
});
var extCheckA = ui.Checkbox('Feb 2018').setValue(false);
var extCheckB = ui.Checkbox('May 2018').setValue(false);
var extCheckC = ui.Checkbox('Jul 2018').setValue(false);
var extCheckD = ui.Checkbox('Ago 2018').setValue(false);
var extCheckE = ui.Checkbox('Feb 2019').setValue(false);
var extCheckF = ui.Checkbox('May 2019').setValue(false);
var extCheckG = ui.Checkbox('Jul 2019').setValue(false);
var extCheckH = ui.Checkbox('Sep 2019').setValue(false);
var extCheckI = ui.Checkbox('Feb 2020').setValue(false);
var extCheckJ = ui.Checkbox('May 2020').setValue(false);
var extCheckK = ui.Checkbox('Jul 2020').setValue(false);
var extCheckL = ui.Checkbox('Oct 2020').setValue(false);
var extCheckM = ui.Checkbox('Delimitación ').setValue(true);
var extCheckN = ui.Checkbox('Punto de muestreo').setValue(true);
// // Establecer la posición del panel
var extentLegend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// // Lo siguiente crea y aplica estilo a 1 fila de la leyenda.
var makeRowa = function(color, name) {
      // Crea la etiqueta que en realidad es el cuadro de color.
      var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
          // Use padding to give the box height and width.
          padding: '8px',
          margin: '0 0 4px 0'
        }
      });
      // Crea una etiqueta con el texto de descripción.
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}
      });
            // Devuelve el panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
panel.add(extCheckA)
     .add(extCheckB)
     .add(extCheckC)
     .add(extCheckD)
     .add(extCheckE)
     .add(extCheckF)
     .add(extCheckG)
     .add(extCheckH)
     .add(extCheckI)
     .add(extCheckJ)
     .add(extCheckK)
     .add(extCheckL)
     .add(extCheckM)
     .add(extCheckN)
// ////////////////////////////////////////////////// ///////////////
// // Agregar funcionalidad a los widgets //
// ////////////////////////////////////////////////// ///////////////
// // Para cada casilla de verificación creamos una función para que al hacer clic en la casilla de verificación
// // Activa capas de interés  
var doCheckboxA = function() {
  extCheckA.onChange(function(checked){
  A.setShown(checked)
  })
}
doCheckboxA();   
var doCheckboxB = function() {
  extCheckB.onChange(function(checked){
  B.setShown(checked)
  })
}
doCheckboxB();     
var doCheckboxC = function() {
  extCheckC.onChange(function(checked){
  C.setShown(checked)
  })
}
doCheckboxC();     
var doCheckboxD = function() {
  extCheckD.onChange(function(checked){
  D.setShown(checked)
  })
}
doCheckboxC();   
var doCheckboxD = function() {
  extCheckD.onChange(function(checked){
  D.setShown(checked)
  })
}
doCheckboxD(); 
var doCheckboxE = function() {
  extCheckE.onChange(function(checked){
  E.setShown(checked)
  })
}
doCheckboxE(); 
var doCheckboxF = function() {
  extCheckF.onChange(function(checked){
  F.setShown(checked)
  })
}
doCheckboxF();     
var doCheckboxG = function() {
  extCheckG.onChange(function(checked){
  G.setShown(checked)
  })
}
doCheckboxG();     
var doCheckboxH = function() {
  extCheckH.onChange(function(checked){
  H.setShown(checked)
  })
}
doCheckboxH();     
var doCheckboxI = function() {
  extCheckI.onChange(function(checked){
  I.setShown(checked)
  })
}
doCheckboxI();     
var doCheckboxJ = function() {
  extCheckJ.onChange(function(checked){
  J.setShown(checked)
  })
}
doCheckboxJ();     
var doCheckboxK = function() {
  extCheckK.onChange(function(checked){
  K.setShown(checked)
  })
}
doCheckboxK();     
var doCheckboxL = function() {
  extCheckL.onChange(function(checked){
  L.setShown(checked)
  })
}
doCheckboxL();     
var doCheckboxM = function() {
  extCheckM.onChange(function(checked){
  M.setShown(checked)
  })
}
doCheckboxM();     
var doCheckboxN = function() {
  extCheckN.onChange(function(checked){
  N.setShown(checked)
  })
}
doCheckboxN();     
// Crea una imagen en miniatura de la barra de color para usar en la leyenda a partir del color dado
// paleta.
function makeColorBarParams(palette) {
  return {
    bbox: [0, 0, 1, 0.1],
    dimensions: '100x10',
    format: 'png',
    min: 0,
    max: 1,
    palette: palette,
  };
}
// Crea la barra de colores para la leyenda.
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(visNDVI.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
// Crea un panel con tres números para la leyenda.
var legendLabels = ui.Panel({
  widgets: [
    ui.Label(visNDVI.min, {margin: '4px 8px'}),
    ui.Label(
        (visNDVI.max / 2),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(visNDVI.max, {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
var legendTitle = ui.Label({
  value: 'Índice de Vegetación de Diferencia Normalizada(NDVI)',
  style: {fontWeight: 'bold'}
});
var legendPanel = ui.Panel([legendTitle, colorBar, legendLabels]);
panel.add(legendPanel)
//////////////SEGUNDO PANEL LADO IZQUIERDO///////////////
var header1 = ui.Label('Equipo de trabajo', 
            { fontSize: '20px', fontWeight: 'bold', color: '1FAB09'});
// Resumen de la aplicación
var textA = ui.Label(
  'Juan Manuel Vazquez de la Torre',
    {fontSize: '12px'});
// Resumen de la aplicación
var textB = ui.Label(
  'Acisclo Sanchez Muñoz',
    {fontSize: '12px'});
// Resumen de la aplicación
var textC = ui.Label(
  'Nestor Caal Suc',
    {fontSize: '12px'});
// Resumen de la aplicación
var textD = ui.Label(
  'Pablo Reina',
    {fontSize: '12px'});
// Crea un panel para contener texto
var panelA = ui.Panel({
  widgets:[header1, textA, textB, textC, textD],//Adds header and text
  style:{width: '20%',position:'middle-right'}});   
// //3.4) Agregue nuestro panel principal a la raíz de nuestra GUI
var logo1 = ee.Image('users/nestorcaalsuc/DAWI2021/Equipo').visualize({
    bands:  ['b1', 'b2', 'b3'],
    min: 0,
    max: 255
    });
var thumb1 = ui.Thumbnail({
    image: logo1,
    params: {
        dimensions: '300x350',
       format: 'png'},
    style: {height: '190px', width: '240px',padding :'0'}
    });
// //Esto crea otro panel para albergar un separador de línea e instrucciones para el usuario.
var introA = ui.Panel([
  ui.Label({
    value: '_________________________________________',
    style: {fontWeight: 'bold',  color: '01FFFF'},
  })]);
  // //Agregue este nuevo panel al panel más grande que creamos
var logo = ee.Image('users/nestorcaalsuc/DAWI2021/JANP').visualize({
    bands:  ['b1', 'b2', 'b3'],
    min: 0,
    max: 255
    });
var thumb = ui.Thumbnail({
    image: logo,
    params: {
        dimensions: '300x320',
       format: 'png'},
    style: {height: '200px', width: '210px',padding :'0'}
    });
ui.root.insert(2,panelA)
panelA.add(thumb1)
      .add(introA)
      .add(thumb)