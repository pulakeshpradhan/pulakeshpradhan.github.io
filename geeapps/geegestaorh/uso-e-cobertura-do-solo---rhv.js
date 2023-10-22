//Análise de uso e cobertura do solo
//Definição de background - Imagem de satélite
Map.setOptions('Satellite');
//Bandas disponíveis NICFI Basemap
// B, G, R, NIR
var amostras = ee.FeatureCollection('users/geegestaorh/amostras_treinamento_2');
var rhv = ee.FeatureCollection('users/geegestaorh/rh_baia_guanabara');
Map.addLayer(rhv, '', 'Limite RH V');
Map.setCenter(-43.2824, -22.6923, 10);
var rgbVis = {
  gamma: 1.8,
  max: 5454,
  min: 64,
  bands: ['R', 'G', 'B'],
};
//Criar paleta para as classes de uso
//'#b8c166' Áreas Antrópicas Agropastoris
//'#fc9f9f' Áreas Antrópicas não Agropastoris
//'#039202' Cobertura Florestal
//'#fef972' Praia
//'#9af662' Mangue
//'#85bafc' Água
//'#07c003' Afloramento rochoso
var palette = ['#b8c166','#fc9f9f','#039202','#fef972','#9af662','#85bafc','#07c003'];
// paleta para o NDVI
var NDVI_Palette = ['FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718',
'74A901', '66A000', '529400', '3E8601', '207401', '056201',
'004C00', '023B01', '012E01', '011D01', '011301'];
//Seleção das Imagens para cada ano
//Seleção da primeira imagem - 2016
var medianpixelsclipped1 = ee.Image('users/geegestaorh/Imagem_2016');
//Map.addLayer(medianpixelsclipped1, rgbVis, 'imagem 1');
//Cálculo do NDVI para inserir como banda no modelo
var ndvi_1 = medianpixelsclipped1.normalizedDifference(['N','R']).rename('NDVI');
//Map.addLayer(ndvi_1, {min:0, max:1, palette: NDVI_Palette}, 'NDVI imagem 1');
var evi_1 = medianpixelsclipped1.expression('2.5*((N-R)/(N+6*R-7.5*B+1))',{
    'N':medianpixelsclipped1.select('N'),
    'R':medianpixelsclipped1.select('R'),
    'B':medianpixelsclipped1.select('B')
  }).rename('EVI');
// SR (Simple Ratio) NIR/RED
  var sr_1 = medianpixelsclipped1.expression('N/R',{
    'N':medianpixelsclipped1.select('N'),
    'R':medianpixelsclipped1.select('R')
  }).rename('SR');
// GCVI
  var gcvi_1 = medianpixelsclipped1.expression('(N/G)-1',{
    'N':medianpixelsclipped1.select('N'),
    'G':medianpixelsclipped1.select('G')
  }).rename('GCVI');  
// NDWI
  var ndwi_1 = medianpixelsclipped1.expression('(G-N)/(G+N)',{
    'N':medianpixelsclipped1.select('N'),
    'G':medianpixelsclipped1.select('G')
  }).rename('NDWI');
// SAVI
  var savi_1 = medianpixelsclipped1.expression('((N-R)/(N+R+0.5))*1.5',{
    'N':medianpixelsclipped1.select('N'),
    'R':medianpixelsclipped1.select('R')
  }).rename('SAVI');
medianpixelsclipped1 = medianpixelsclipped1.addBands(ndvi_1)
                                           .addBands(evi_1)
                                           .addBands(sr_1)
                                           .addBands(gcvi_1)
                                           .addBands(ndwi_1)
                                           .addBands(savi_1);
print(medianpixelsclipped1);
//scale é a resolução espacial
var bands = ['B', 'G', 'R', 'N','NDVI','EVI','SR','GCVI','NDWI','SAVI'];
var input_features1 = medianpixelsclipped1.sampleRegions({
  collection: amostras,
  properties: ['ID_Classe'],
  scale: 4.77
});
//processo de cross-validation. cria uma coluna a mais na amostra
input_features1 = input_features1.randomColumn('random');
var split = 0.8; //porcentagem de treino
var trainingPartition1 = input_features1.filter(ee.Filter.lt('random', split)); //variavel treino
var testingPartition1 = input_features1.filter(ee.Filter.gte('random', split)); //variavel teste
//Print these variables to see how much training and testing data you are using
    print('Samples n =', input_features1.aggregate_count('.all'));
    print('Training n =', trainingPartition1.aggregate_count('.all'));
    print('Testing n =', testingPartition1.aggregate_count('.all'));
//Utilização de 100 árvores no modelo
var classifier1 = ee.Classifier.smileRandomForest(100,5).train({
  features: input_features1.select(['B', 'G', 'R', 'N','NDVI','EVI','SR','GCVI','NDWI','SAVI','ID_Classe']),  //pode rodar com o trainingPartition, mas tende a ser melhor com a amostra total
  classProperty: 'ID_Classe',
  inputProperties: bands
});
// Model/Classify with training dataset 
var classified1 = medianpixelsclipped1.select(bands) //select predictors
                  .classify(classifier1); //.classify applies the Random Forest
// Validation
var validation1 = testingPartition1.classify(classifier1);
var testAccuracy1 = validation1.errorMatrix('ID_Classe', 'classification');
print('Validation error matrix 1: ', testAccuracy1);
print('Validation overall accuracy 1: ', testAccuracy1.accuracy());
print('kappa 1: ', testAccuracy1.kappa());
print(classified1);
//Map.addLayer(classified1, {min:1, max:7, palette: palette}, 'classificação data 1');
//Seleção da segunda imagem - 2017
var medianpixelsclipped2 = ee.Image('users/geegestaorh/Imagem_2017');
//Map.addLayer(medianpixelsclipped2, rgbVis, 'imagem 2');
//Cálculo do NDVI para inserir como banda no modelo
var ndvi_2 = medianpixelsclipped2.normalizedDifference(['N','R']).rename('NDVI');
//Map.addLayer(ndvi_2, {min:0, max:1, palette: NDVI_Palette}, 'NDVI imagem 2');
var evi_2 = medianpixelsclipped2.expression('2.5*((N-R)/(N+6*R-7.5*B+1))',{
    'N':medianpixelsclipped2.select('N'),
    'R':medianpixelsclipped2.select('R'),
    'B':medianpixelsclipped2.select('B')
  }).rename('EVI');
// SR (Simple Ratio) NIR/RED
  var sr_2 = medianpixelsclipped2.expression('N/R',{
    'N':medianpixelsclipped2.select('N'),
    'R':medianpixelsclipped2.select('R')
  }).rename('SR');
// GCVI
  var gcvi_2 = medianpixelsclipped2.expression('(N/G)-1',{
    'N':medianpixelsclipped2.select('N'),
    'G':medianpixelsclipped2.select('G')
  }).rename('GCVI');  
// NDWI
  var ndwi_2 = medianpixelsclipped2.expression('(G-N)/(G+N)',{
    'N':medianpixelsclipped2.select('N'),
    'G':medianpixelsclipped2.select('G')
  }).rename('NDWI');
// SAVI
  var savi_2 = medianpixelsclipped2.expression('((N-R)/(N+R+0.5))*1.5',{
    'N':medianpixelsclipped2.select('N'),
    'R':medianpixelsclipped2.select('R')
  }).rename('SAVI');
medianpixelsclipped2 = medianpixelsclipped2.addBands(ndvi_2)
                                           .addBands(evi_2)
                                           .addBands(sr_2)
                                           .addBands(gcvi_2)
                                           .addBands(ndwi_2)
                                           .addBands(savi_2);
print(medianpixelsclipped2);
//scale é a resolução espacial
var input_features2 = medianpixelsclipped2.sampleRegions({
  collection: amostras,
  properties: ['ID_Classe'],
  scale: 4.77
});
//processo de cross-validation. cria uma coluna a mais na amostra
input_features2 = input_features2.randomColumn('random');
var split = 0.8; //porcentagem de treino
var trainingPartition2 = input_features2.filter(ee.Filter.lt('random', split)); //variavel treino
var testingPartition2 = input_features2.filter(ee.Filter.gte('random', split)); //variavel teste
//Print these variables to see how much training and testing data you are using
    print('Samples n =', input_features2.aggregate_count('.all'));
    print('Training n =', trainingPartition2.aggregate_count('.all'));
    print('Testing n =', testingPartition2.aggregate_count('.all'));
//Utilização de 100 árvores no modelo
var classifier2 = ee.Classifier.smileRandomForest(100,5).train({
  features: input_features2.select(['B', 'G', 'R', 'N','NDVI','EVI','SR','GCVI','NDWI','SAVI','ID_Classe']),  //pode rodar com o trainingPartition, mas tende a ser melhor com a amostra total
  classProperty: 'ID_Classe',
  inputProperties: bands
});
// Model/Classify with training dataset 
var classified2 = medianpixelsclipped2.select(bands) //select predictors
                  .classify(classifier2); //.classify applies the Random Forest
// Validation
var validation2 = testingPartition2.classify(classifier2);
var testAccuracy2 = validation2.errorMatrix('ID_Classe', 'classification');
print('Validation error matrix 2: ', testAccuracy2);
print('Validation overall accuracy 2: ', testAccuracy2.accuracy());
print('kappa 2: ', testAccuracy2.kappa());
print(classified2);
//Map.addLayer(classified2, {min:1, max:7, palette: palette}, 'classificação data 2');
//Seleção da terceira imagem - 2018
var medianpixelsclipped3 = ee.Image('users/geegestaorh/Imagem_2018');
//Map.addLayer(medianpixelsclipped3, rgbVis, 'imagem 3');
//Cálculo do NDVI para inserir como banda no modelo
var ndvi_3 = medianpixelsclipped3.normalizedDifference(['N','R']).rename('NDVI');
//Map.addLayer(ndvi_3, {min:0, max:1, palette: NDVI_Palette}, 'NDVI imagem 3');
var evi_3 = medianpixelsclipped3.expression('2.5*((N-R)/(N+6*R-7.5*B+1))',{
    'N':medianpixelsclipped3.select('N'),
    'R':medianpixelsclipped3.select('R'),
    'B':medianpixelsclipped3.select('B')
  }).rename('EVI');
// SR (Simple Ratio) NIR/RED
  var sr_3 = medianpixelsclipped3.expression('N/R',{
    'N':medianpixelsclipped3.select('N'),
    'R':medianpixelsclipped3.select('R')
  }).rename('SR');
// GCVI
  var gcvi_3 = medianpixelsclipped3.expression('(N/G)-1',{
    'N':medianpixelsclipped3.select('N'),
    'G':medianpixelsclipped3.select('G')
  }).rename('GCVI');  
// NDWI
  var ndwi_3 = medianpixelsclipped3.expression('(G-N)/(G+N)',{
    'N':medianpixelsclipped3.select('N'),
    'G':medianpixelsclipped3.select('G')
  }).rename('NDWI');
// SAVI
  var savi_3 = medianpixelsclipped3.expression('((N-R)/(N+R+0.5))*1.5',{
    'N':medianpixelsclipped3.select('N'),
    'R':medianpixelsclipped3.select('R')
  }).rename('SAVI');
medianpixelsclipped3 = medianpixelsclipped3.addBands(ndvi_3)
                                           .addBands(evi_3)
                                           .addBands(sr_3)
                                           .addBands(gcvi_3)
                                           .addBands(ndwi_3)
                                           .addBands(savi_3);
print(medianpixelsclipped3);
//scale é a resolução espacial
var input_features3 = medianpixelsclipped3.sampleRegions({
  collection: amostras,
  properties: ['ID_Classe'],
  scale: 4.77
});
//processo de cross-validation. cria uma coluna a mais na amostra
input_features3 = input_features3.randomColumn('random');
var split = 0.8; //porcentagem de treino
var trainingPartition3 = input_features3.filter(ee.Filter.lt('random', split)); //variavel treino
var testingPartition3 = input_features3.filter(ee.Filter.gte('random', split)); //variavel teste
//Print these variables to see how much training and testing data you are using
    print('Samples n =', input_features3.aggregate_count('.all'));
    print('Training n =', trainingPartition3.aggregate_count('.all'));
    print('Testing n =', testingPartition3.aggregate_count('.all'));
//Utilização de 100 árvores no modelo
var classifier3 = ee.Classifier.smileRandomForest(100,5).train({
  features: input_features3.select(['B', 'G', 'R', 'N','NDVI','EVI','SR','GCVI','NDWI','SAVI','ID_Classe']),  //pode rodar com o trainingPartition, mas tende a ser melhor com a amostra total
  classProperty: 'ID_Classe',
  inputProperties: bands
});
// Model/Classify with training dataset 
var classified3 = medianpixelsclipped3.select(bands) //select predictors
                  .classify(classifier3); //.classify applies the Random Forest
// Validation
var validation3 = testingPartition3.classify(classifier3);
var testAccuracy3 = validation3.errorMatrix('ID_Classe', 'classification');
print('Validation error matrix 3: ', testAccuracy3);
print('Validation overall accuracy 3: ', testAccuracy3.accuracy());
print('kappa 3: ', testAccuracy3.kappa());
print(classified3);
//Map.addLayer(classified3, {min:1, max:7, palette: palette}, 'classificação data 3');
//Seleção da quarta imagem - 2019
var medianpixelsclipped4 = ee.Image('users/geegestaorh/Imagem_2019');
//Map.addLayer(medianpixelsclipped4, rgbVis, 'imagem 4');
//Cálculo do NDVI para inserir como banda no modelo
var ndvi_4 = medianpixelsclipped4.normalizedDifference(['N','R']).rename('NDVI');
//Map.addLayer(ndvi_4, {min:0, max:1, palette: NDVI_Palette}, 'NDVI imagem 4');
var evi_4 = medianpixelsclipped4.expression('2.5*((N-R)/(N+6*R-7.5*B+1))',{
    'N':medianpixelsclipped4.select('N'),
    'R':medianpixelsclipped4.select('R'),
    'B':medianpixelsclipped4.select('B')
  }).rename('EVI');
// SR (Simple Ratio) NIR/RED
  var sr_4 = medianpixelsclipped4.expression('N/R',{
    'N':medianpixelsclipped4.select('N'),
    'R':medianpixelsclipped4.select('R')
  }).rename('SR');
// GCVI
  var gcvi_4 = medianpixelsclipped4.expression('(N/G)-1',{
    'N':medianpixelsclipped4.select('N'),
    'G':medianpixelsclipped4.select('G')
  }).rename('GCVI');  
// NDWI
  var ndwi_4 = medianpixelsclipped4.expression('(G-N)/(G+N)',{
    'N':medianpixelsclipped4.select('N'),
    'G':medianpixelsclipped4.select('G')
  }).rename('NDWI');
// SAVI
  var savi_4 = medianpixelsclipped4.expression('((N-R)/(N+R+0.5))*1.5',{
    'N':medianpixelsclipped4.select('N'),
    'R':medianpixelsclipped4.select('R')
  }).rename('SAVI');
medianpixelsclipped4 = medianpixelsclipped4.addBands(ndvi_4)
                                           .addBands(evi_4)
                                           .addBands(sr_4)
                                           .addBands(gcvi_4)
                                           .addBands(ndwi_4)
                                           .addBands(savi_4);
print(medianpixelsclipped4);
//scale é a resolução espacial
var input_features4 = medianpixelsclipped4.sampleRegions({
  collection: amostras,
  properties: ['ID_Classe'],
  scale: 4.77
});
//processo de cross-validation. cria uma coluna a mais na amostra
input_features4 = input_features4.randomColumn('random');
var split = 0.8; //porcentagem de treino
var trainingPartition4 = input_features4.filter(ee.Filter.lt('random', split)); //variavel treino
var testingPartition4 = input_features4.filter(ee.Filter.gte('random', split)); //variavel teste
//Print these variables to see how much training and testing data you are using
    print('Samples n =', input_features4.aggregate_count('.all'));
    print('Training n =', trainingPartition4.aggregate_count('.all'));
    print('Testing n =', testingPartition4.aggregate_count('.all'));
//Utilização de 300 árvores no modelo
//.smileRandomForest is used to run the model. Here we run the model using 100-300 trees
// and 5 randomly selected predictors per split ("(100,5)")
var classifier4 = ee.Classifier.smileRandomForest(100,5).train({
  features: input_features4.select(['B', 'G', 'R', 'N','NDVI','EVI','SR','GCVI','NDWI','SAVI','ID_Classe']),  //pode rodar com o trainingPartition, mas tende a ser melhor com a amostra total
  classProperty: 'ID_Classe',
  inputProperties: bands
});
// Model/Classify with training dataset 
var classified4 = medianpixelsclipped4.select(bands) //select predictors
                  .classify(classifier4); //.classify applies the Random Forest
// Validation
var validation4 = testingPartition4.classify(classifier4);
var testAccuracy4 = validation4.errorMatrix('ID_Classe', 'classification');
print('Validation error matrix 4: ', testAccuracy4);
print('Validation overall accuracy 4: ', testAccuracy4.accuracy());
print('kappa 4: ', testAccuracy4.kappa());
print(classified4);
//Map.addLayer(classified4, {min:1, max:7, palette: palette}, 'classificação data 4');
//Seleção da quinta imagem - 2020
var medianpixelsclipped5 = ee.Image('users/geegestaorh/Imagem_2020');
//Map.addLayer(medianpixelsclipped5, rgbVis, 'imagem 5');
//Cálculo do NDVI para inserir como banda no modelo
var ndvi_5 = medianpixelsclipped5.normalizedDifference(['N','R']).rename('NDVI');
//Map.addLayer(ndvi_5, {min:0, max:1, palette: NDVI_Palette}, 'NDVI imagem 5');
var evi_5 = medianpixelsclipped5.expression('2.5*((N-R)/(N+6*R-7.5*B+1))',{
    'N':medianpixelsclipped5.select('N'),
    'R':medianpixelsclipped5.select('R'),
    'B':medianpixelsclipped5.select('B')
  }).rename('EVI');
// SR (Simple Ratio) NIR/RED
  var sr_5 = medianpixelsclipped5.expression('N/R',{
    'N':medianpixelsclipped5.select('N'),
    'R':medianpixelsclipped5.select('R')
  }).rename('SR');
// GCVI
  var gcvi_5 = medianpixelsclipped5.expression('(N/G)-1',{
    'N':medianpixelsclipped5.select('N'),
    'G':medianpixelsclipped5.select('G')
  }).rename('GCVI');  
// NDWI
  var ndwi_5 = medianpixelsclipped5.expression('(G-N)/(G+N)',{
    'N':medianpixelsclipped5.select('N'),
    'G':medianpixelsclipped5.select('G')
  }).rename('NDWI');
// SAVI
  var savi_5 = medianpixelsclipped5.expression('((N-R)/(N+R+0.5))*1.5',{
    'N':medianpixelsclipped5.select('N'),
    'R':medianpixelsclipped5.select('R')
  }).rename('SAVI');
medianpixelsclipped5 = medianpixelsclipped5.addBands(ndvi_5)
                                           .addBands(evi_5)
                                           .addBands(sr_5)
                                           .addBands(gcvi_5)
                                           .addBands(ndwi_5)
                                           .addBands(savi_5);
print(medianpixelsclipped5);
//scale é a resolução espacial
var input_features5 = medianpixelsclipped5.sampleRegions({
  collection: amostras,
  properties: ['ID_Classe'],
  scale: 4.77
});
//processo de cross-validation. cria uma coluna a mais na amostra
input_features5 = input_features5.randomColumn('random');
var split = 0.8; //porcentagem de treino
var trainingPartition5 = input_features5.filter(ee.Filter.lt('random', split)); //variavel treino
var testingPartition5 = input_features5.filter(ee.Filter.gte('random', split)); //variavel teste
//Print these variables to see how much training and testing data you are using
    print('Samples n =', input_features5.aggregate_count('.all'));
    print('Training n =', trainingPartition5.aggregate_count('.all'));
    print('Testing n =', testingPartition5.aggregate_count('.all'));
//Utilização de 100 árvores no modelo
var classifier5 = ee.Classifier.smileRandomForest(100,5).train({
  features: input_features5.select(['B', 'G', 'R', 'N','NDVI','EVI','SR','GCVI','NDWI','SAVI','ID_Classe']),  //pode rodar com o trainingPartition, mas tende a ser melhor com a amostra total
  classProperty: 'ID_Classe',
  inputProperties: bands
});
// Model/Classify with training dataset 
var classified5 = medianpixelsclipped5.select(bands) //select predictors
                  .classify(classifier5); //.classify applies the Random Forest
// Validation
var validation5 = testingPartition5.classify(classifier5);
var testAccuracy5 = validation5.errorMatrix('ID_Classe', 'classification');
print('Validation error matrix 5: ', testAccuracy5);
print('Validation overall accuracy 5: ', testAccuracy5.accuracy());
print('kappa 5: ', testAccuracy5.kappa());
print(classified5);
//Map.addLayer(classified5, {min:1, max:7, palette: palette}, 'classificação data 5');
//Seleção da sexta imagem - 2021
var medianpixelsclipped6 = ee.Image('users/geegestaorh/Imagem_2021');
//Map.addLayer(medianpixelsclipped6, rgbVis, 'imagem 6');
//Cálculo do NDVI para inserir como banda no modelo
var ndvi_6 = medianpixelsclipped6.normalizedDifference(['N','R']).rename('NDVI');
//Map.addLayer(ndvi_6, {min:0, max:1, palette: NDVI_Palette}, 'NDVI imagem 6');
var evi_6 = medianpixelsclipped6.expression('2.5*((N-R)/(N+6*R-7.5*B+1))',{
    'N':medianpixelsclipped6.select('N'),
    'R':medianpixelsclipped6.select('R'),
    'B':medianpixelsclipped6.select('B')
  }).rename('EVI');
// SR (Simple Ratio) NIR/RED
  var sr_6 = medianpixelsclipped6.expression('N/R',{
    'N':medianpixelsclipped6.select('N'),
    'R':medianpixelsclipped6.select('R')
  }).rename('SR');
// GCVI
  var gcvi_6 = medianpixelsclipped6.expression('(N/G)-1',{
    'N':medianpixelsclipped6.select('N'),
    'G':medianpixelsclipped6.select('G')
  }).rename('GCVI');  
// NDWI
  var ndwi_6 = medianpixelsclipped6.expression('(G-N)/(G+N)',{
    'N':medianpixelsclipped6.select('N'),
    'G':medianpixelsclipped6.select('G')
  }).rename('NDWI');
// SAVI
  var savi_6 = medianpixelsclipped6.expression('((N-R)/(N+R+0.5))*1.5',{
    'N':medianpixelsclipped6.select('N'),
    'R':medianpixelsclipped6.select('R')
  }).rename('SAVI');
medianpixelsclipped6 = medianpixelsclipped6.addBands(ndvi_6)
                                           .addBands(evi_6)
                                           .addBands(sr_6)
                                           .addBands(gcvi_6)
                                           .addBands(ndwi_6)
                                           .addBands(savi_6);
print(medianpixelsclipped6);
//scale é a resolução espacial
var input_features6 = medianpixelsclipped6.sampleRegions({
  collection: amostras,
  properties: ['ID_Classe'],
  scale: 4.77
});
//processo de cross-validation. cria uma coluna a mais na amostra
input_features6 = input_features6.randomColumn('random');
var split = 0.8; //porcentagem de treino
var trainingPartition6 = input_features6.filter(ee.Filter.lt('random', split)); //variavel treino
var testingPartition6 = input_features6.filter(ee.Filter.gte('random', split)); //variavel teste
//Print these variables to see how much training and testing data you are using
    print('Samples n =', input_features6.aggregate_count('.all'));
    print('Training n =', trainingPartition6.aggregate_count('.all'));
    print('Testing n =', testingPartition6.aggregate_count('.all'));
//Utilização de 100 árvores no modelo
var classifier6 = ee.Classifier.smileRandomForest(100,5).train({
  features: input_features6.select(['B', 'G', 'R', 'N','NDVI','EVI','SR','GCVI','NDWI','SAVI','ID_Classe']),  //pode rodar com o trainingPartition, mas tende a ser melhor com a amostra total
  classProperty: 'ID_Classe',
  inputProperties: bands
});
// Model/Classify with training dataset 
var classified6 = medianpixelsclipped6.select(bands) //select predictors
                  .classify(classifier6); //.classify applies the Random Forest
// Validation
var validation6 = testingPartition6.classify(classifier6);
var testAccuracy6 = validation6.errorMatrix('ID_Classe', 'classification');
print('Validation error matrix 6: ', testAccuracy6);
print('Validation overall accuracy 6: ', testAccuracy6.accuracy());
print('kappa 6: ', testAccuracy6.kappa());
print(classified6);
//Map.addLayer(classified6, {min:1, max:7, palette: palette}, 'classificação data 6');
//Seleção da sétima imagem - 2022
var medianpixelsclipped7 = ee.Image('users/geegestaorh/Imagem_2022');
//Map.addLayer(medianpixelsclipped7, rgbVis, 'imagem 7');
//Cálculo do NDVI para inserir como banda no modelo
var ndvi_7 = medianpixelsclipped7.normalizedDifference(['N','R']).rename('NDVI');
//Map.addLayer(ndvi_7, {min:0, max:1, palette: NDVI_Palette}, 'NDVI imagem 7');
var evi_7 = medianpixelsclipped7.expression('2.5*((N-R)/(N+6*R-7.5*B+1))',{
    'N':medianpixelsclipped7.select('N'),
    'R':medianpixelsclipped7.select('R'),
    'B':medianpixelsclipped7.select('B')
  }).rename('EVI');
// SR (Simple Ratio) NIR/RED
  var sr_7 = medianpixelsclipped7.expression('N/R',{
    'N':medianpixelsclipped7.select('N'),
    'R':medianpixelsclipped7.select('R')
  }).rename('SR');
// GCVI
  var gcvi_7 = medianpixelsclipped7.expression('(N/G)-1',{
    'N':medianpixelsclipped7.select('N'),
    'G':medianpixelsclipped7.select('G')
  }).rename('GCVI');  
// NDWI
  var ndwi_7 = medianpixelsclipped7.expression('(G-N)/(G+N)',{
    'N':medianpixelsclipped7.select('N'),
    'G':medianpixelsclipped7.select('G')
  }).rename('NDWI');
// SAVI
  var savi_7 = medianpixelsclipped7.expression('((N-R)/(N+R+0.5))*1.5',{
    'N':medianpixelsclipped7.select('N'),
    'R':medianpixelsclipped7.select('R')
  }).rename('SAVI');
medianpixelsclipped7 = medianpixelsclipped7.addBands(ndvi_7)
                                           .addBands(evi_7)
                                           .addBands(sr_7)
                                           .addBands(gcvi_7)
                                           .addBands(ndwi_7)
                                           .addBands(savi_7);
print(medianpixelsclipped7);
//scale é a resolução espacial
var input_features7 = medianpixelsclipped7.sampleRegions({
  collection: amostras,
  properties: ['ID_Classe'],
  scale: 4.77
});
//processo de cross-validation. cria uma coluna a mais na amostra
input_features7 = input_features7.randomColumn('random');
var split = 0.8; //porcentagem de treino
var trainingPartition7 = input_features7.filter(ee.Filter.lt('random', split)); //variavel treino
var testingPartition7 = input_features7.filter(ee.Filter.gte('random', split)); //variavel teste
//Print these variables to see how much training and testing data you are using
    print('Samples n =', input_features7.aggregate_count('.all'));
    print('Training n =', trainingPartition7.aggregate_count('.all'));
    print('Testing n =', testingPartition7.aggregate_count('.all'));
//Utilização de 100 árvores no modelo
var classifier7 = ee.Classifier.smileRandomForest(100,5).train({
  features: input_features7.select(['B', 'G', 'R', 'N','NDVI','EVI','SR','GCVI','NDWI','SAVI','ID_Classe']),  //pode rodar com o trainingPartition, mas tende a ser melhor com a amostra total
  classProperty: 'ID_Classe',
  inputProperties: bands
});
// Model/Classify with training dataset 
var classified7 = medianpixelsclipped7.select(bands) //select predictors
                  .classify(classifier7); //.classify applies the Random Forest
// Validation
var validation7 = testingPartition7.classify(classifier7);
var testAccuracy7 = validation7.errorMatrix('ID_Classe', 'classification');
print('Validation error matrix 7: ', testAccuracy7);
print('Validation overall accuracy 7: ', testAccuracy7.accuracy());
print('kappa 7: ', testAccuracy7.kappa());
print(classified7);
Map.addLayer(classified7, {min:1, max:7, palette: palette}, 'Classificação 2022');
//2 Início da construção e configuração dos itens do mapa para visualização
//Estilo do cursor em "cruz"
Map.style().set('cursor', 'crosshair');
//Variáveis para a interface do usuário
//São colocadas como "false" para que o usuário possa ativá-las
var class1 = ui.Map.Layer(classified1, {palette:palette, min:1, max:7}, 'Classificação 2016',false);
var class2 = ui.Map.Layer(classified2, {palette:palette, min:1, max:7}, 'Classificação 2017',false);
var class3 = ui.Map.Layer(classified3, {palette:palette, min:1, max:7}, 'Classificação 2018',false);
var class4 = ui.Map.Layer(classified4, {palette:palette, min:1, max:7}, 'Classificação 2019',false);
var class5 = ui.Map.Layer(classified5, {palette:palette, min:1, max:7}, 'Classificação 2020',false);
var class6 = ui.Map.Layer(classified6, {palette:palette, min:1, max:7}, 'Classificação 2021',false);
var class7 = ui.Map.Layer(classified7, {palette:palette, min:1, max:7}, 'Classificação 2022',false);
//Adicionando as camadas ao mapa
Map.add(class1);
Map.add(class2);
Map.add(class3);
Map.add(class4);
Map.add(class5);
Map.add(class6);
Map.add(class7);
//Construção dos painéis             
//Título e texto explicativo
//App título
var header = ui.Label('Uso e Cobertura do Solo na Região Hidrográfica V', {fontSize: '25px', fontWeight: 'bold', color: '#3079ed'});
//App texto explicativo
var text = ui.Label(
  'Ferramenta desenvolvida no âmbito do Mestrado Profissional em Rede Nacional em Gestão e Regulação de Recursos Hídricos (ProfÁgua/UERJ), com utilização de imagens do Programa NICFI',
    {fontSize: '15px'});
var link = ui.Label(
    'Acesse para maiores informações sobre o NICFI', {fontSize: '15px', fontWeight: 'bold', color: '#3079ed'},
    'https://www.planet.com/nicfi/');
//Criando o painel para o texto
var panel = ui.Panel({
  widgets:[header, text, link],//Adds header and text
  style:{width: '300px',position:'middle-right'}});
//Criando texto adicional
var intro = ui.Panel([
  ui.Label({
    value: '____________________________________________',
    style: {fontWeight: 'bold',  color: '4A997E'},
  }),
  ui.Label({
    value:'Uso e Cobertura do Solo',
    style: {fontSize: '16px', fontWeight: 'bold'}
  })]);
//Adiciona ao painel maior
panel.add(intro);
//Adicionando o painel a interface do usuário
ui.root.insert(1,panel);
//Descrição para seleção dos dados
var extLabel = ui.Label({value:'Selecione o ano para visualizar a classificação:',
style: {fontWeight: 'bold', fontSize: '14px', margin: '10px 5px'}
});
//Adicionando as checkboxes para o usuário selecionar
var extCheck = ui.Checkbox('2016').setValue(false); //false = não está selecionada
var extCheck2 = ui.Checkbox('2017').setValue(false);
var extCheck3 = ui.Checkbox('2018').setValue(false);
var extCheck4 = ui.Checkbox('2019').setValue(false);
var extCheck5 = ui.Checkbox('2020').setValue(false);
var extCheck6 = ui.Checkbox('2021').setValue(false);
var extCheck7 = ui.Checkbox('2022').setValue(false);
panel.add(extLabel)
      .add(extCheck)
      .add(extCheck2)
      .add(extCheck3)
      .add(extCheck4)
      .add(extCheck5)
      .add(extCheck6)
      .add(extCheck7);
//Para cada checkbox é criada uma função. Clicando na box, a camada 
//de interesse será ativada
//Extent 2016
var doCheckbox = function() {
  extCheck.onChange(function(checked){
  class1.setShown(checked);
  });
};
doCheckbox();
//Extent 2017
var doCheckbox2 = function() {
  extCheck2.onChange(function(checked){
  class2.setShown(checked);
  });
};
doCheckbox2();
//Extent 2018
var doCheckbox3 = function() {
  extCheck3.onChange(function(checked){
  class3.setShown(checked);
  });
};
doCheckbox3();
//Extent 2019
var doCheckbox4 = function() {
  extCheck4.onChange(function(checked){
  class4.setShown(checked);
  });
};
doCheckbox4(); 
//Extent 2020
var doCheckbox5 = function() {
  extCheck5.onChange(function(checked){
  class5.setShown(checked);
  });
};
doCheckbox5(); 
//Extent 2021
var doCheckbox6 = function() {
  extCheck6.onChange(function(checked){
  class6.setShown(checked);
  });
};
doCheckbox6();
//Extent 2022
var doCheckbox7 = function() {
  extCheck7.onChange(function(checked){
  class7.setShown(checked);
  });
};
doCheckbox7(); 
//Gráficos para cada ano
//2016
//Cálculo da área 
var areaImage2016 = ee.Image.pixelArea().addBands(
      classified1);
var areas2016 = areaImage2016.reduceRegion({
      reducer: ee.Reducer.sum().group({
      groupField: 1,
      groupName: 'class',
    }),
    geometry: rhv.geometry(),
    scale: 500,
    maxPixels: 1e10
    }); 
var classAreas2016 = ee.List(areas2016.get('groups'));
var classAreaLists2016 = classAreas2016.map(function(item) {
  var areaDict2016 = ee.Dictionary(item);
  var classNumber2016 = ee.Number(areaDict2016.get('class')).format();
  var area2016 = ee.Number(
    areaDict2016.get('sum')).divide(1e6).round(); //Aqui o valor de área está sendo arredondado
  return ee.List([classNumber2016, area2016]);
});
var result2016 = ee.Dictionary(classAreaLists2016.flatten());
print(result2016);
//Obtendo a área para região
var feature = ee.Feature(rhv);
var feature2016 = feature.set(ee.Number(result2016));
//Construindo o gráfico
//Definindo um dicionário para as classes
var classes_solo = {
  '1': {v: 1, f: 'AAA'},
  '2': {v: 2, f: 'ANA'},
  '3': {v: 3, f: 'FLO'},
  '4': {v: 4, f: 'PRA'},
  '5': {v: 5, f: 'MAN'},
  '6': {v: 6, f: 'ÁGUA'},
  '7': {v: 7, f: 'ROC'}
};
var xPropValDict = {};
var xPropLabels = [];   
for (var key in classes_solo) {
  xPropValDict[key] = classes_solo[key].v;
  xPropLabels.push(classes_solo[key]);
}
//Definindo o gráfico e adicionando ao painel
var chart2016 = ui.Chart.feature
                .byProperty({
                  features: feature2016,
                  xProperties: xPropValDict,
                  seriesProperty: 'label'
                })
                .setChartType('ScatterChart')
                .setOptions({
                  title: 'Uso e cobertura do solo - 2016',
                  pointSize: 10,
                  hAxis: {
                    title: 'Classe',
                    titleTextStyle: {italic: false, bold: true},
                    ticks: xPropLabels
                  },
                  vAxis: {
                    title: 'Área (km²)',
                    titleTextStyle: {italic: false, bold: true}
                  },
                  colors: ['#3079ed'],
                });
//2017
//Cálculo da área
var areaImage2017 = ee.Image.pixelArea().addBands(
      classified2);
var areas2017 = areaImage2017.reduceRegion({
      reducer: ee.Reducer.sum().group({
      groupField: 1,
      groupName: 'class',
    }),
    geometry: rhv.geometry(),
    scale: 500,
    maxPixels: 1e10
    }); 
var classAreas2017 = ee.List(areas2017.get('groups'));
var classAreaLists2017 = classAreas2017.map(function(item) {
  var areaDict2017 = ee.Dictionary(item);
  var classNumber2017 = ee.Number(areaDict2017.get('class')).format();
  var area2017 = ee.Number(
    areaDict2017.get('sum')).divide(1e6).round();//Aqui o valor de área está sendo arredondado
  return ee.List([classNumber2017, area2017]);
});
var result2017 = ee.Dictionary(classAreaLists2017.flatten());
//Obtendo a área para região
var feature = ee.Feature(rhv);
var feature2017 = feature.set(ee.Number(result2017));
//Definindo o gráfico e adicionando ao painel
var chart2017 = ui.Chart.feature
                .byProperty({
                  features: feature2017,
                  xProperties: xPropValDict,
                  seriesProperty: 'label'
                })
                .setChartType('ScatterChart')
                .setOptions({
                  title: 'Uso e cobertura do solo - 2017',
                  pointSize: 10,
                  hAxis: {
                    title: 'Classe',
                    titleTextStyle: {italic: false, bold: true},
                    ticks: xPropLabels
                  },
                  vAxis: {
                    title: 'Área (km²)',
                    titleTextStyle: {italic: false, bold: true}
                  },
                  colors: ['#3079ed'],
                });
//2018
//Cálculo da área
var areaImage2018 = ee.Image.pixelArea().addBands(
      classified3);
var areas2018 = areaImage2018.reduceRegion({
      reducer: ee.Reducer.sum().group({
      groupField: 1,
      groupName: 'class',
    }),
    geometry: rhv.geometry(),
    scale: 500,
    maxPixels: 1e10
    }); 
var classAreas2018 = ee.List(areas2018.get('groups'));
var classAreaLists2018 = classAreas2018.map(function(item) {
  var areaDict2018 = ee.Dictionary(item);
  var classNumber2018 = ee.Number(areaDict2018.get('class')).format();
  var area2018 = ee.Number(
    areaDict2018.get('sum')).divide(1e6).round();//Aqui o valor de área está sendo arredondado
  return ee.List([classNumber2018, area2018]);
});
var result2018 = ee.Dictionary(classAreaLists2018.flatten());
//Obtendo a área para região
var feature = ee.Feature(rhv);
var feature2018 = feature.set(ee.Number(result2018));
//Definindo o gráfico e adicionando ao painel
var chart2018 = ui.Chart.feature
                .byProperty({
                  features: feature2018,
                  xProperties: xPropValDict,
                  seriesProperty: 'label'
                })
                .setChartType('ScatterChart')
                .setOptions({
                  title: 'Uso e cobertura do solo - 2018',
                  pointSize: 10,
                  hAxis: {
                    title: 'Classe',
                    titleTextStyle: {italic: false, bold: true},
                    ticks: xPropLabels
                  },
                  vAxis: {
                    title: 'Área (km²)',
                    titleTextStyle: {italic: false, bold: true}
                  },
                  colors: ['#3079ed'],
                });
//2019
//Cálculo da área
var areaImage2019 = ee.Image.pixelArea().addBands(
      classified4);
var areas2019 = areaImage2019.reduceRegion({
      reducer: ee.Reducer.sum().group({
      groupField: 1,
      groupName: 'class',
    }),
    geometry: rhv.geometry(),
    scale: 500,
    maxPixels: 1e10
    }); 
var classAreas2019 = ee.List(areas2019.get('groups'));
var classAreaLists2019 = classAreas2019.map(function(item) {
  var areaDict2019 = ee.Dictionary(item);
  var classNumber2019 = ee.Number(areaDict2019.get('class')).format();
  var area2019 = ee.Number(
    areaDict2019.get('sum')).divide(1e6).round();//Aqui o valor de área está sendo arredondado
  return ee.List([classNumber2019, area2019]);
});
var result2019 = ee.Dictionary(classAreaLists2019.flatten());
//Obtendo a área para região
var feature = ee.Feature(rhv);
var feature2019 = feature.set(ee.Number(result2019));
//Definindo o gráfico e adicionando ao painel
var chart2019 = ui.Chart.feature
                .byProperty({
                  features: feature2019,
                  xProperties: xPropValDict,
                  seriesProperty: 'label'
                })
                .setChartType('ScatterChart')
                .setOptions({
                  title: 'Uso e cobertura do solo - 2019',
                  pointSize: 10,
                  hAxis: {
                    title: 'Classe',
                    titleTextStyle: {italic: false, bold: true},
                    ticks: xPropLabels
                  },
                  vAxis: {
                    title: 'Área (km²)',
                    titleTextStyle: {italic: false, bold: true}
                  },
                  colors: ['#3079ed'],
                });
//2020
//Cálculo da área
var areaImage2020 = ee.Image.pixelArea().addBands(
      classified5);
var areas2020 = areaImage2020.reduceRegion({
      reducer: ee.Reducer.sum().group({
      groupField: 1,
      groupName: 'class',
    }),
    geometry: rhv.geometry(),
    scale: 500,
    maxPixels: 1e10
    }); 
var classAreas2020 = ee.List(areas2020.get('groups'));
var classAreaLists2020 = classAreas2020.map(function(item) {
  var areaDict2020 = ee.Dictionary(item);
  var classNumber2020 = ee.Number(areaDict2020.get('class')).format();
  var area2020 = ee.Number(
    areaDict2020.get('sum')).divide(1e6).round();//Aqui o valor de área está sendo arredondado
  return ee.List([classNumber2020, area2020]);
});
var result2020 = ee.Dictionary(classAreaLists2020.flatten());
//Obtendo a área para região
var feature = ee.Feature(rhv);
var feature2020 = feature.set(ee.Number(result2020));
//Definindo o gráfico e adicionando ao painel
var chart2020 = ui.Chart.feature
                .byProperty({
                  features: feature2020,
                  xProperties: xPropValDict,
                  seriesProperty: 'label'
                })
                .setChartType('ScatterChart')
                .setOptions({
                  title: 'Uso e cobertura do solo - 2020',
                  pointSize: 10,
                  hAxis: {
                    title: 'Classe',
                    titleTextStyle: {italic: false, bold: true},
                    ticks: xPropLabels
                  },
                  vAxis: {
                    title: 'Área (km²)',
                    titleTextStyle: {italic: false, bold: true}
                  },
                  colors: ['#3079ed'],
                });
//2021
//Cálculo da área
var areaImage2021 = ee.Image.pixelArea().addBands(
      classified6);
var areas2021 = areaImage2021.reduceRegion({
      reducer: ee.Reducer.sum().group({
      groupField: 1,
      groupName: 'class',
    }),
    geometry: rhv.geometry(),
    scale: 500,
    maxPixels: 1e10
    }); 
var classAreas2021 = ee.List(areas2021.get('groups'));
var classAreaLists2021 = classAreas2021.map(function(item) {
  var areaDict2021 = ee.Dictionary(item);
  var classNumber2021 = ee.Number(areaDict2021.get('class')).format();
  var area2021 = ee.Number(
    areaDict2021.get('sum')).divide(1e6).round();//Aqui o valor de área está sendo arredondado
  return ee.List([classNumber2021, area2021]);
});
var result2021 = ee.Dictionary(classAreaLists2021.flatten());
//Obtendo a área para região
var feature = ee.Feature(rhv);
var feature2021 = feature.set(ee.Number(result2021));
//Definindo o gráfico e adicionando ao painel
var chart2021 = ui.Chart.feature
                .byProperty({
                  features: feature2021,
                  xProperties: xPropValDict,
                  seriesProperty: 'label'
                })
                .setChartType('ScatterChart')
                .setOptions({
                  title: 'Uso e cobertura do solo - 2021',
                  pointSize: 10,
                  hAxis: {
                    title: 'Classe',
                    titleTextStyle: {italic: false, bold: true},
                    ticks: xPropLabels
                  },
                  vAxis: {
                    title: 'Área (km²)',
                    titleTextStyle: {italic: false, bold: true}
                  },
                  colors: ['#3079ed'],
                });
//2022
//Cálculo da área
var areaImage2022 = ee.Image.pixelArea().addBands(
      classified7);
var areas2022 = areaImage2022.reduceRegion({
      reducer: ee.Reducer.sum().group({
      groupField: 1,
      groupName: 'class',
    }),
    geometry: rhv.geometry(),
    scale: 500,
    maxPixels: 1e10
    }); 
var classAreas2022 = ee.List(areas2022.get('groups'));
var classAreaLists2022 = classAreas2022.map(function(item) {
  var areaDict2022 = ee.Dictionary(item);
  var classNumber2022 = ee.Number(areaDict2022.get('class')).format();
  var area2022 = ee.Number(
    areaDict2022.get('sum')).divide(1e6).round();//Aqui o valor de área está sendo arredondado
  return ee.List([classNumber2022, area2022]);
});
var result2022 = ee.Dictionary(classAreaLists2022.flatten());
//Obtendo a área para região
var feature = ee.Feature(rhv);
var feature2022 = feature.set(ee.Number(result2022));
//Definindo o gráfico e adicionando ao painel
var chart2022 = ui.Chart.feature
                .byProperty({
                  features: feature2022,
                  xProperties: xPropValDict,
                  seriesProperty: 'label'
                })
                .setChartType('ScatterChart')
                .setOptions({
                  title: 'Uso e cobertura do solo - 2022',
                  pointSize: 10,
                  hAxis: {
                    title: 'Classe',
                    titleTextStyle: {italic: false, bold: true},
                    ticks: xPropLabels
                  },
                  vAxis: {
                    title: 'Área (km²)',
                    titleTextStyle: {italic: false, bold: true}
                  },
                  colors: ['#3079ed'],
                });
//Adicionando um painel para os gráficos
var panelGraph = ui.Panel({
  style:{width: '300px',position:'middle-right'}
});
//Itens para lista
var y2016 = '2016';
var y2017 = '2017';
var y2018 = '2018';
var y2019 = '2019';
var y2020 = '2020';
var y2021 = '2021';
var y2022 = '2022';
//Construindo lista
var graphSelect = ui.Select({
  items:[y2016,y2017,y2018,y2019,y2020,y2021,y2022],
  placeholder:'Ano',
  onChange: selectLayer,
  style: {position:'top-right'}
});
var constraints = [];
//Função para mudar a visualização de acordo com a seleção na lista
function selectLayer(){
  var graph = graphSelect.getValue(); 
  panelGraph.clear(); 
  if (graph == y2016){
    panelGraph.add(chart2016);
  }
  else if (graph == y2017){
    panelGraph.add(chart2017);
  }
  else if (graph == y2018){
    panelGraph.add(chart2018);
  }
    else if (graph == y2019){
    panelGraph.add(chart2019);
  }
    else if (graph == y2020){
    panelGraph.add(chart2020);
  }
    else if (graph == y2021){
    panelGraph.add(chart2021);
  }
    else if (graph == y2022){
    panelGraph.add(chart2022);
  }
  for (var i = 0; i < constraints.length; ++i) {
    var constraint = select[i];
    var mode = constraint.mode.getValue();
    var value = parseFloat(constraint.value.getValue());
    if (mode == GREATER_THAN) {
      image = image.updateMask(constraint.image.gt(value));
    } else {
      image = image.updateMask(constraint.image.lt(value));
    }
}
}
//Criando uma nova instrução para seleção do ano pelo usuário
var graphLabel = ui.Label({value:'Selecione o ano para verificar a área de cada uso do solo:',
style: {fontWeight: 'bold', fontSize: '14px', margin: '10px 5px'}
});
//Adicionando os itens ao painel
panel.add(graphLabel)
     .add(graphSelect)
     .add(panelGraph);
//Criando uma legenda
//Posição
 var legend = ui.Panel({
   style: {
     position: 'bottom-left',
     padding: '8px 15px'
   }
 });
//Título
 var legendTitle = ui.Label({
   value: 'Legenda',
   style: {
     fontWeight: 'bold',
     fontSize: '18px',
     margin: '0 0 4px 0',
     padding: '0'
     }
 });
//Adicionando ao painel
 legend.add(legendTitle);
//Estilo para legenda
 var makeRow = function(color, name) {
       var colorBox = ui.Label({
         style: {
           backgroundColor: color,
           padding: '8px',
           margin: '0 0 4px 0'
         }
       });
       var description = ui.Label({
         value: name,
         style: {margin: '0 0 4px 6px'}
       });
       return ui.Panel({
         widgets: [colorBox, description],
         layout: ui.Panel.Layout.Flow('horizontal')
       });
 };
//Paleta de cores para legenda
 var palette2 = ['b8c166','fc9f9f','039202','fef972','9af662','85bafc','07c003'];
//Nomes na legenda
 var names = ['Áreas Antrópicas Agropastoris (AAA)','Áreas Antrópicas Não Agropastoris (ANA)','Cobertura Florestal (FLO)','Praia (PRA)','Mangue (MAN)','Água (ÁGUA)','Afloramento Rochoso (ROC)'];
//Adicionando cores e nomes
 for (var i = 0; i < 7; i++) {
   legend.add(makeRow(palette[i], names[i]));
   }  
//Adicionando legenda
 Map.add(legend);