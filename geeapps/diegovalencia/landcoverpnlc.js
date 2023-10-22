//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Clasificación final de la imagen final con RF
// Autores: H.Jaime Hernández & M.Paz Acuña
// UNIVERSIDAD DE CHILE
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Para usar las funciones del archivo "FUNCIONES_PNLC"
var funciones = require('users/diegovalencia/LandCover_PNLC:Funciones_PNLC');
// Carga limites del PNLC y Área de Estudio
var pnlcb = ee.FeatureCollection('users/diegovalencia/Landcover_PNLC/Buffer_PNLC'); //parque mas buffer
var pnlc= ee.FeatureCollection('users/diegovalencia/Landcover_PNLC/Limites_PNLC'); // solo parque
// Carga imagen final creada con script "predictivas" y exportada como "asset"
var final = ee.Image('users/diegovalencia/Landcover_PNLC/PNLC_Variables');
print(final);
// Crea variable con nombre de las bandas de la imagen final 
var bands = ['ver','oto','pri','cte','ampl','fase','elevation','slope','aspect','B7_median_stdDev',
             'B5_median_stdDev','B4_median_stdDev','B1_median','B1_max','B1_stdDev','B2_median','B2_max',
             'B2_stdDev','B3_median','B3_max','B3_stdDev','B4_median','B4_max','B4_stdDev','B5_median',
             'B5_max','B5_stdDev','B6_median','B6_max','B6_stdDev','B7_median','B7_max','B7_stdDev',
             'B8_median','B8_max','B8_stdDev','B9_median','B9_max','B9_stdDev','B10_median','B10_max',
             'B10_stdDev','B11_median','B11_max', 'B11_stdDev'];
// Centra mapa en el PNLC con zoom 11
Map.setCenter(-71.1,-32.96, 11)
// Carga los puntos de terreno desde Fusion Table. La propiedad numperica 'Clasificac' almacena las clases
// y renombra las clases para que inicien en 0 (requerimiento de GEE)
var points = ee.FeatureCollection('ft:1XjDzZf9kiqSbImjrw-o9KPhZ_9kmh8Q3O3kNQcJh');
// Superpone los puntos sobre la imagen para obtener datos de entrenamiento.
var training = final.sampleRegions({collection: points,properties: ['name'],scale: 30});
// Entrenamiento del algoritmo con parámetros por defecto
var trained = ee.Classifier.randomForest(10).train(training, 'name', bands);
// Clasificación de la imagen con las misma bandas usadas en el entrenamiento.
var classified = final.select(bands).classify(trained);
// Orden colores: 0=BC 1=BE 2=CU 3=HU 4=ME 5=MX 6=PP 7=RC 8=SD 9=WT
// Mapeo de imagen clasificada y resultados.
Map.addLayer(classified.clip(pnlcb), {min: 0, max: 9, palette: ['006400','83d02a', 'cdb33a','808000' 
                  ,'E9967A', 'B0C4DE','91af40', 'f7e084', '6f6f6f', '0000FF']}, 'LandCover_PNLC');
//Map.addLayer(points, {min: 0, max: 1, palette: ['00FF00', 'FF0000']}); // para poner puntos encima 
Map.addLayer(funciones.limitePNLC(),{}, 'Limites Unidad'); // agrega límite del PNLC
// LEYENDA
var legend = ui.Panel({style: {position: 'top-left', padding: '8px 15px'}});
// Crea Título "Clases PNLC"
var legendTitle = ui.Label({value: 'Clases PNLC', style: {fontWeight: 'bold',fontSize: '18px',
    margin: '0 0 4px 0',padding: '0'}});
legend.add(legendTitle); //Agrega el Título
// Crea y edita 1 fila de la leyenda
var makeRow = function(color, name) {
      var colorBox = ui.Label({ style: {backgroundColor: '#' + color, padding: '8px',margin: '0 0 4px 0'}});
      var description = ui.Label({value: name, style: {margin: '0 0 4px 6px'}});
      return ui.Panel({
      widgets: [colorBox, description], layout: ui.Panel.Layout.Flow('horizontal')});};
//  Cre paleta de colores y nombres para 10 clases
var palette = ['006400','83d02a', 'cdb33a','808000' ,'E9967A', 'B0C4DE','91af40', 'f7e084', '6f6f6f', '0000FF'];
var names = ['B. Roble','B. Esclerófilo','Cultivos', 'Huertos','M. Esclerófilo','M. Xerofítico', 'Praderas',
             'Rocas','Suelo Desnudo','Agua'];
for (var i = 0; i < 10; i++) {legend.add(makeRow(palette[i], names[i]));}  // Agrega colores y nombres 
Map.add(legend); // Agrega la leyenda al mapa
// VALIDACIÓN
// Aleatorización de la base de datos para generar datos de entrenamiento y validación
var withRandom = training.randomColumn('random');
// Divide en 70% para entrenamiento y 30% para validación
var split = 0.7;  
var trainingPartition = withRandom.filter(ee.Filter.lt('random', split));
var testingPartition = withRandom.filter(ee.Filter.gte('random', split));
var classProperty = 'name';
// Entrenamiento con el 70% de los datos
var trainedClassifier = ee.Classifier.randomForest(100).train({
  features: trainingPartition, classProperty: classProperty, inputProperties: bands});
// Clasifica con los datos de validación "testingPartition".
var test = testingPartition.classify(trainedClassifier);
// Imprime mariz de confusión de la validación
var confusionMatrix = test.errorMatrix(classProperty, 'classification');
print('Matriz de confusión (validación): ', confusionMatrix);
// Imprime matriz de confusión de los datos de entrenamiento "trainingPartition"
var trainAccuracy = trainedClassifier.confusionMatrix();
print('Matriz de confusión (entrenamiento con resustitución): ', trainAccuracy);
print('Exactitud global (entrenamiento): ', trainAccuracy.accuracy());
// Export.image.toAsset({
//   image: classified,
//   description: 'Clasificada',
//   assetId: 'clasificacionPNLC',
//   scale: 30,
//   region: pnlcb});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Exportar Tablas
//Export.table.toAsset({
  //collection: points,
  //description:'Muestreo_PNLC',
  //assetId: 'Muestreo_PNLC',
//});
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Map.addLayer(points, {}, 'Puntos Muestreo')