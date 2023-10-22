/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var F_2013 = ee.FeatureCollection("users/allanpereira/Focos_2013c"),
    F_2014 = ee.FeatureCollection("users/allanpereira/Focos_2014"),
    F_2015 = ee.FeatureCollection("users/allanpereira/Focos_2015"),
    F_2017 = ee.FeatureCollection("users/allanpereira/Focos_2017"),
    F_2016 = ee.FeatureCollection("users/allanpereira/Focos_2016"),
    F_2018 = ee.FeatureCollection("users/allanpereira/Focos_2018"),
    imageCollection = ee.ImageCollection("LANDSAT/LC08/C01/T1_SR");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
//// SCRIPT PARA MAPEAMENTO DE QUEIMADAS LANDSAT 8
//ATUALIZADA EM 28/08/2019
//CRIADA POR ALLAN ARANTES PEREIRA
///////////VARIÁVEIS DE ENTRADA E SAIDA DE DADOS
//FOCOS DO ANO A SER ANALISADO (2013 A 2018)
var focos = F_2015;
//NOMES DE SAIDA DA CLASSIFICAÇÃO E DOS ÍNDICES
var output = 'AQM_2015_001c';
var output2 = 'NBR2_2015_001c';
//PARAMETRO SUPPORT VECTOR MACHINE
var nup = 0.001;
//DATA DO COMPÓSITO 1
  // Data final e data inicial do compósito antes da geada
  var START_DATE = '2015-01-01';
  var END_DATE = '2015-05-31';
//DATA DO COMPÓSITO 2
  var START_DATE_2 = '2015-06-01';
  var END_DATE_2 = '2015-10-31';
//DIAS JULIANOS DOS FOCOS ATIVOS (DEVE COINCIDIR COM DATA DO COMPÓSITO 2)
   var start = 153;
  var finish = 364;
//////////////CONFIGURAÇÕES DO MAPA.
Map.setCenter(-47.87, -17.45, 3);
Map.style().set('cursor', 'crosshair');
//////////////////CONFIGURAÇÃO DA INTERFACE
var header = ui.Label('Projeto Andura - Mapeamento de queimadas', {fontSize: '32px', color: 'red'});
var subtitle = ui.Label(
    'Algoritmo para mapeamento de queimadas no Cerrado brasileiro. - FASE DE TESTES',
    {fontSize: '15px'});
var text = ui.Label(
    'O objetivo desta aplicação é gerar dados de queimadas para o cerrado Brasileiro. O algoritmo por trás desta aplicação é uma adaptação do algoritmo de queimadas AQM-PROBA-V (Pereira et al., 2017) para imagens Landsat. Para iniciar a análise, clique no mapa.',
    {fontSize: '11px'});
var toolPanel = ui.Panel([header, subtitle, text], 'flow', {width: '300px'});
ui.root.widgets().add(toolPanel);
var inspector = ui.Panel([ui.Label('Click to get burned area map')]);
Map.add(inspector);
Map.onClick(function(coords) {
  // Show the loading label.
  inspector.widgets().set(0, ui.Label({
    value: 'Mapping...',
    style: {color: 'gray'}
  }));
  var point = ee.Geometry.Point(coords.lon, coords.lat);
/////////////////////////COMPOSITOS
// SUBSET DA ÁREA DE ESTUDO
  var subset = point;
  //var porc_nuv = 0.05
////////////////COMPOSITO 1
  var COLLECTION = imageCollection;
  var VIZ_PARAMS = {bands: ['B4', 'B3', 'B2'], min: 0, max: 0.4, gamma: 1.5};
  var BASE_COLLECTION1 = ee.ImageCollection(COLLECTION)
    .filterDate(START_DATE,END_DATE)
    .filterBounds(subset)
  // .filter(ee.Filter.lt('CLOUD_COVER_LAND', porc_nuv));
  var properties = BASE_COLLECTION1.propertyNames();
  var sv = BASE_COLLECTION1.get('system:visualization_1_min');
/////////////////////////////FUNÇÕES  
//CRIAR FUNÇÕES NBR2 
   var addNBR2 = function(img) {
   var nbr2 = img.normalizedDifference(['B6', 'B7']).rename('NBR2');
   return img.addBands(nbr2);
  };
//CRIAR FUNÇÕES NUVENS, SOMBRA E ÁGUA
  function maskS2clouds(BASE_COLLECTION1) {
    var qa = BASE_COLLECTION1.select('pixel_qa');
    var cloudBitMask = ee.Number(2).pow(3).int();
    var waterBitMask = ee.Number(2).pow(2).int();
    var shadowBitMask = ee.Number(2).pow(5).int();
    var cirrus = qa.eq(61440);
    var mask = qa.bitwiseAnd(cloudBitMask).eq(0).and(qa.bitwiseAnd(waterBitMask).eq(0)).and(qa.bitwiseAnd(shadowBitMask).eq(0)).and(qa.bitwiseAnd(cirrus).eq(0));
    return BASE_COLLECTION1.updateMask(mask);
   }
//CRIAR FUNÇÃO PARA OBTER DATAS DAS IMAGENS
  var get_days = function(date) {
    var m = date.millis();
    return m.divide(1000).divide(3600).toInt();
  };
//ADICIONAR 'date' band: number of days since epoch
  var addDate = function(img) {
    var d = ee.Date(img.date());
    var days = get_days(d);
    var days_img = ee.Image.constant(days).rename('date').toInt32();
    return img.addBands(days_img);
  };
  var withNBR2 = BASE_COLLECTION1.map(addNBR2).map(addDate).map(maskS2clouds);
  var nbr2 = withNBR2.select(['NBR2', 'B2',"B3",'B4','B5']);
  var mosaickedImage1 = nbr2.reduce(ee.Reducer.min(5));
  print(mosaickedImage1)
  var rgb1 = mosaickedImage1.select('min1','min2','min3','min4');
 /////////////////COMPÓSITO 2
  var BASE_COLLECTION2 = ee.ImageCollection(COLLECTION)
    .filterDate(START_DATE_2,END_DATE_2)
    .filterBounds(subset)
    //.filter(ee.Filter.lt('CLOUD_COVER_LAND', porc_nuv));
  var withNBR2 = BASE_COLLECTION2.map(addNBR2).map(addDate).map(maskS2clouds);
  var nbr2 = withNBR2.select(['NBR2', 'B2','B3','B4','B5']);
  var mosaickedImage2 = nbr2.reduce(ee.Reducer.min(5));
   var rgb2 = mosaickedImage2.select('min1','min2','min3','min4')
  //////Variável diferença nbr2 e diferença temperatura
  var diff = mosaickedImage1.select('min').subtract(mosaickedImage2.select('min'));
 // var temp = mosaickedImage1.select('min2').subtract(mosaickedImage2.select('min2'));
  ////////PREPARAR FOCOS ATIVOS PARA AMOSTRAS
  var buffer = point.buffer(200000);
  var area_estudo = buffer;
  var points = focos
  .filterBounds(buffer)
  .filter(ee.Filter.gt('DIA', start))
  .filter(ee.Filter.lt('DIA', finish));
  var ft1 = diff.reduceRegions(points, ee.Reducer.first(),30);
  var ft2 = mosaickedImage2.reduceRegions(points, ee.Reducer.first(),30);
  //////LIMIARES COM BASE EM PERCENTILE DE T2 E DIFF
  var l1 = ft1.reduceColumns({
    reducer: ee.Reducer.percentile([66]) ,
    selectors: ['first'],
  });
  //
  var l2 = ft2.reduceColumns({
    reducer: ee.Reducer.percentile([33]) ,
    selectors: ['min'],
  });
  var limiar1 = ee.Number(l1.get('p66'));
  print(limiar1);
  var limiar2 = ee.Number(l2.get('p33'));
  print(limiar2);
  //Área com condicoes pré determinadas para coleta de amostras
  var queima = diff.gt(limiar1).and(mosaickedImage2.lt(limiar2));//.and(temp.lt(temp1));
  ///////////////////////////
  ////Aplicar restrição filtro morfológico erosão na área criada anteriormente 
  var kernel = ee.Kernel.circle({radius: 3});
  var opened = queima
               .focal_min({kernel: kernel, iterations: 1});
  var class_p =  opened.select('min');
  //SELECIONAR PONTOS CONTIDOS NA CONDIÇÃO ACIMA
  var ft3 = class_p.reduceRegions(points, ee.Reducer.first(),30);
  var sample1 = ft3.select('first');
  var sample2 = sample1.filter(ee.Filter.gt('first', 0));
  points = sample2
      .remap([1], [0], 'first');
///////////////CLASSIFICAÇÃO  
// Criar variável preditora
  var t1 = mosaickedImage1.select('min');
  var predict = mosaickedImage2.addBands(diff);
  predict = predict.select(['min','min_1']);
// Overlay the points on the imagery to get training.
  var training = predict.sampleRegions({
    collection: points,
    properties: ['first'],
    scale: 30
  });
// Create an SVM classifier with custom parameters.
  var classifier = ee.Classifier.svm({
    kernelType: 'RBF',
    svmType: 'ONE_CLASS',
    nu: nup,
    gamma:  0.5,
  });
//  VARIÁVEIS NBR2 E DIFERENÇA
  var bands = ['min','min_1'];
  var trained = classifier.train(training,'first',bands);
  var classified = predict.select(bands).classify(trained);
  /////MASCARAR DADOS NÃO QUEIMADAS
var classified3 = classified.remap([0],
           [1],null);
   var mask = classified3.select('classification').eq(1);
var classified2 = classified3.select('classification').updateMask(mask);
  var kernel = ee.Kernel.circle({radius: 1});
  var opened = classified3
               .focal_max({kernel: kernel, iterations: 1});
             //var opened = opened
             //.focal_min({kernel: kernel, iterations: 1});
  var classified4 =  opened; 
  //////////////////////////////////////////////////////////////
  // EXPORTAÇÃO DE DADOS
////EXPORTAR NBR2
var exportar = t1.addBands(predict);
  Export.image.toDrive({
    image: exportar.clip(area_estudo),
    description: output2,
    maxPixels: 150000000000,
    scale: 30,
    region: area_estudo
  });
////EXPORTAR CLASSIFICAÇÃO RASTER
  Export.image.toDrive({
    image: classified4,
    description: output,
    maxPixels: 150000000000,
    scale: 30,
    region: area_estudo
  });
////EXPORTAR CLASSIFICAÇÃO test RASTER
  Export.image.toDrive({
  image: rgb1,
  description: 'RGBT1',
    maxPixels: 150000000000,
    scale: 30,
    region: area_estudo
   });
////EXPORTAR CLASSIFICAÇÃO test RASTER
  Export.image.toDrive({
  image: rgb2,
  description: 'RGBT2',
  maxPixels: 150000000000,
  scale: 30,
  region: area_estudo
   });
////EXPORTAR CLASSIFICAÇÃO RASTER MASCARADA
//  Export.image.toDrive({
//    image: classified2,
//    description: 'TEST',
//    maxPixels: 150000000000,
//    scale: 30,
//    region: area_estudo
//  });
////////ADICIONAR AO MAPA
var visParams = {bands: ['min'], min:0.1, max: 0.5};
Map.addLayer(diff, visParams, 'Compósito Diferença T1 - T2');
Map.addLayer(classified3, {},  'Área queimada');
  Map.addLayer(classified4, {},  'Área queimada');
});