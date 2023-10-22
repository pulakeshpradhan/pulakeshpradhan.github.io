//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Clasificación final de la imagen final con RF para S2
// Autores: H.Jaime Hernández & M.Paz Acuña
// UNIVERSIDAD DE CHILE
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Modificación para Proyecto de Cartografia de la RN Rio Clarillo
// Autores: Ignacio Diaz & Diego Valencia
// GERENCIA DE AREAS SILVESTRES PROTEGIDAS
// DEPARTAMENTO DE PLANIFICACION Y DESARROLLO
// UNIDAD DE MONITOREO DEL SNASPE
// Clasificacion_SentinelN2
// Para usar las funciones del archivo "Funciones RNRCL S2"
//Versión con puntos de control Italo Perez
var funciones = require('users/diegovalencia/Proyecto_Clarillo:Funciones_RNRCL_S2');
// Carga limites del RNRCL y Área de Estudio
var aspb = ee.FeatureCollection('users/diegovalencia/Lancover_RNRCL/ASPB_RNRCL')
var asp  = ee.FeatureCollection('users/diegovalencia/Lancover_RNRCL/Limite_RNRCL')
var points  = ee.FeatureCollection('users/diegovalencia/Lancover_RNRCL/Puntos_RNRCL')
// Carga imagen final creada con script "predictivas" y exportada como "asset"
var finalS2 = ee.Image('users/diegovalencia/Lancover_RNRCL/rnrcl_finalS2_01');  // Apilada S2
//print(finalS2);
// Crea variable con nombre de las bandas de la imagen final 
var bands = ['ver','oto','pri','cte','ampl','fase','elevation','slope','aspect', 
             'B11_median_stdDev','B8_median_stdDev','B4_median_stdDev',
             'B1_median','B1_max','B1_stdDev',
             'B2_median','B2_max','B2_stdDev',
             'B3_median','B3_max','B3_stdDev',
             'B4_median','B4_max','B4_stdDev',
             'B5_median','B5_max','B5_stdDev',
             'B6_median','B6_max','B6_stdDev',
             'B8_median','B8_max','B8_stdDev',
             'B9_median','B9_max','B9_stdDev',
             'B10_median','B10_max','B10_stdDev',
             'B11_median','B11_max','B11_stdDev',
             'B12_median','B12_max','B12_stdDev'];
print(bands);
//Centra mapa en el PNLC con zoom 11
Map.setCenter(-70.44,-33.77, 11)
// Carga los puntos de terreno desde Fusion Table. La propiedad numperica 'Clasificac' almacena las clases
// y renombra las clases para que inicien en 0 (requerimiento de GEE)
// Superpone los puntos sobre la imagen para obtener datos de entrenamiento.
//print(points);
var training = finalS2.sampleRegions({collection: points,properties: ['code'],scale: 10});
//Map.addLayer(training)
// Entrenamiento del algoritmo con parámetros por defecto
var trained = ee.Classifier.randomForest(10).train(training, 'code', bands);
// Clasificación de la imagen con las misma bandas usadas en el entrenamiento.
var classified = finalS2.select(bands).classify(trained);
//print(classified);
//// Orden colores: 
// 0=Suelo desnudo cc0013 
// 1=Roquerios d7cdcc 
// 2=Cuerpos de agua #3300F (Azul)
// 3=Bosque esclerófilo #
// 4=Espinales #E74C3C Rojo
// 5=Matorral esclerofilo #2ECC71 (Verde Claro)
// 6=Esclerofilo y suculentas #ABEBC6 (Verde Agua)
// 7=Bosque subandino #FFCC00 (Oro)
// 8=Matorral subandino #FF6F00 (Naranjo)
// 9=Bosque higrófilo #B2EBF2 (Celeste)
// 10=Bosque Ribereño #C5CAE9 (Azul Morado)
// 11=Matorral de quebrada andinas #AB47BC (Purpura)
// 12=Bosque Cipres de la Cordillera #33FF00 (verde Luminoso)
// 13=Matorral andino #E59866 (Cafe)
// 14=Estepa altoandina herbacea #EDE7F6 (Morado Claro)
// 15=Vega altoandina #aec3d4 
// 16=Otros #FBFCFC (Blanco invierno) 
// Mapeo de imagen clasificada y resultados.
Map.addLayer(classified.clip(aspb), {min: 0, max: 16, palette: [
'f7e084', //Suelo desnudo
'aec3d4', //Roquerios
'3300FF', //Cuerpo de agua
'225129', //Bosque Esclerofilo
'b76031', //Espinales
'6a2325', //Matorral Esclerofilo
'c3aa69', //Esclerofilo y suculentas
'd9903d', //Bosque Subandino
'03A9F4', //Matorral subandino
'111149', //Bosque higrofilo
'AB47BC', //Bosque Ribereño
'c3aa69', //Matorral de quebrada andina
'cc0013', //Cipres de la Coordillera
'30eb5b', //Matorral Andino
'aec3d4', //Estepa altoandina
'91af40', //Vegas
'd7cdcc']}, 'Clasificación Sentinel 2');
//Map.addLayer(points, {min: 0, max: 1, palette: ['00FF00', 'FF0000']}); // para poner puntos encima 
Map.addLayer(funciones.limiteASP(), {}, 'Limite Reserva'); // agrega límite del PNLC
// LEYENDA
var legend = ui.Panel({style: {position: 'top-left', padding: '8px 15px'}});
// Crea Título "Clases PNLC"
var legendTitle = ui.Label({value: 'Clases RNRCL Sentinel2', style: {fontWeight: 'bold',fontSize: '18px',
    margin: '0 0 4px 0',padding: '0'}});
legend.add(legendTitle); //Agrega el Título
// Crea y edita 1 fila de la leyenda
var makeRow = function(color, name) {
      var colorBox = ui.Label({ style: {backgroundColor: '#' + color, padding: '8px',margin: '0 0 4px 0'}});
      var description = ui.Label({value: name, style: {margin: '0 0 4px 6px'}});
      return ui.Panel({
      widgets: [colorBox, description], layout: ui.Panel.Layout.Flow('horizontal')});};
//Crea paleta de colores y nombres para 1 clases
var palette = [
'f7e084', //Suelo desnudo
'aec3d4', //Roquerios
'3300FF', //Cuerpo de agua
'225129', //Bosque Esclerofilo
'b76031', //Espinales
'6a2325', //Matorral Esclerofilo
'c3aa69', //Esclerofilo y suculentas
'd9903d', //Bosque Subandino
'03A9F4', //Matorral subandino
'111149', //Bosque higrofilo
'AB47BC', //Bosque Ribereño
'c3aa69', //Matorral de quebrada andina
'cc0013', //Cipres de la Coordillera
'30eb5b', //Matorral Andino
'aec3d4', //Estepa altoandina
'91af40', //Vegas
'd7cdcc'];
var names = ['Suelo desnudo',
             'Roquerios',
             'Cuerpos de agua',
             'Bosque esclerófilo',
             'Espinales',
             'Matorral esclerofilo',
             'Esclerofilo y suculentas',
             'Bosque subandino',
             'Matorral subandino',
             'Bosque higrofilo',
             'Bosque ribereño',
             'Matorral de quebrada andina',
             'Bosque cipres de la cordillera',
             'Matorral andino',
             'Estepa altoandina herbacea',
             'Vega altoandina',
             'Otros'];
for (var i = 0; i <= 16; i++) {legend.add(makeRow(palette[i], names[i]));}  // Agrega colores y nombres 
Map.add(legend); // Agrega la leyenda al mapa
// VALIDACIÓN
// Aleatorización de la base de datos para generar datos de entrenamiento y validación
var withRandom = training.randomColumn('random');
// Divide en 70% para entrenamiento y 30% para validación
var split = 0.7;  
var trainingPartition = withRandom.filter(ee.Filter.lt('random', split));
var testingPartition = withRandom.filter(ee.Filter.gte('random', split));
var classProperty = 'code';
// Entrenamiento con el 70% de los datos
var trainedClassifier = ee.Classifier.randomForest(100).train({
  features: trainingPartition, classProperty: classProperty, inputProperties: bands});
// Clasifica con los datos de validación "testingPartition".
var test = testingPartition.classify(trainedClassifier);
// Imprime mariz de confusión de la validación
var confusionMatrix = test.errorMatrix(classProperty, 'classification');
print('Matriz de confusión (validación): ', confusionMatrix);
//Imprime matriz de confusión de los datos de entrenamiento "trainingPartition"
var trainAccuracy = trainedClassifier.confusionMatrix();
print('Matriz de confusión (entrenamiento con resustitución): ', trainAccuracy);
print('Exactitud global (entrenamiento): ', trainAccuracy.accuracy());
// Export.image.toAsset({
//   image: classified,
//   description: 'ClasificadaS2',
//   assetId: 'clasificacionPNLCS2',
//   scale: 10,
//   region: aspb});
// Activar para exportar
//Export.image.toDrive({
//image: classified,
//description: 'RNRCL_S2',
//scale: 10,
//region: aspb,
//maxPixels: 1e9
//});
///Crea Boton de descarga y panel
/*var button = ui.Button({
 label: 'Descarga imagen',
 onClick: function() {
   Export.image.toDrive({
 image: classified,
 description: 'imageToDriveExample',
 scale: 30,
 region:aspb,
 maxPixels: 1e9
});
 }
});
//print(button);
// Crea el panel derecho
var panel = ui.Panel({style: {width: '200px'}});
ui.root.add(panel);
// Titulo del panel
var main_title = ui.Label('Descarga de Clasificación');
main_title.style().set({fontSize: '16px',fontWeight: 'bold',color: 'blue',width: '200px',
   textAlign: 'center',padding: '10px 50px'});
panel.add(main_title);
panel.widgets().set(1, button);*/
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Map.addLayer(points, {}, 'Puntos Muestreo')