var table2 = ee.FeatureCollection("users/allanpereira/focos_2015");
// Create the map.
// var mapPanel = ui.Map();
// Configure the map.
Map.setCenter(-47.87, -17.45, 4);
Map.style().set('cursor', 'crosshair');
// ui.root.widgets().reset([mapPanel]);
// Esta linha é necessária quando se usa a variável mapPanel, porém ela exlui as ferramentas de desenho
// Add a title and some explanatory text to a side panel.
var header = ui.Label('Projeto Andura - Mapeamento de queimadas', {fontSize: '32px', color: 'red'});
var subtitle = ui.Label(
    'Algoritmo para mapeamento de queimadas no Cerrado brasileiro. - FASE DE TESTES',
    {fontSize: '15px'});
var text = ui.Label(
    'O objetivo desta aplicação é gerar dados de queimadas para o cerrado Brasileiro. O algoritmo por trás desta aplicação é uma adaptação do algoritmo de queimadas AQM-PROBA-V (Pereira et al., 2017) para imagens Landsat. Para iniciar a análise, clique no mapa.',
    {fontSize: '11px'});
var toolPanel = ui.Panel([header, subtitle, text], 'flow', {width: '300px'});
ui.root.widgets().add(toolPanel);
// Make a button widget.
//var button = ui.Button('Iniciar')
//ui.root.widgets().add(button);
//var obpt = '218/72';
// Set a callback function to run when the
// button is clicked.
var inspector = ui.Panel([ui.Label('Click to get burned area map')]);
Map.add(inspector);
Map.onClick(function(coords) {
  // Show the loading label.
  inspector.widgets().set(0, ui.Label({
    value: 'Mapping...',
    style: {color: 'gray'}
  }));
  // Determine the mean NDVI, a long-running server operation.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var porc_nuv = 50;
  //ORBITA PONTO A SER CLASSIFICADA
  ////////////////////////////////////PROCESSAMENTO
  // 1 - SUBSET DA ÁREA DE ESTUDO
  var subset = point;
 // subset = subset.filter(ee.Filter.eq('ORBPTO',obpt));
  //
  // Landsat 8 SR
  var COLLECTION = 'LANDSAT/LC08/C01/T1_SR';
  var START_DATE = '2015-01-01';
  var END_DATE = '2015-07-01';
  var VIZ_PARAMS = {bands: ['B4', 'B3', 'B2'], min: 0, max: 0.4, gamma: 1.5};
  //Criar compósitos com base no índice NBR2
  //Coleção Landsat 8 - T1
  var BASE_COLLECTION1 = ee.ImageCollection(COLLECTION)
    .filterDate(START_DATE,END_DATE)
    .filterBounds(subset)
    .filter(ee.Filter.lt('CLOUD_COVER_LAND', porc_nuv));
  var properties = BASE_COLLECTION1.propertyNames();
  print('Metadata properties: ', properties); // ee.List of metadata properties
  var sv = BASE_COLLECTION1.get('system:visualization_1_min');
print('description: ', sv); // ee.Number
 // Map.addLayer(table3, {}, 'From Fusion Table');
  ///Criar funções 
   var addNBR2 = function(img) {
   var nbr2 = img.normalizedDifference(['B6', 'B7']).rename('NBR2');
   return img.addBands(nbr2);
  };
  //Mascarar nuvens, sombras e água
  function maskS2clouds(BASE_COLLECTION1) {
    var qa = BASE_COLLECTION1.select('pixel_qa');
    var cloudBitMask = ee.Number(2).pow(3).int();
    var waterBitMask = ee.Number(2).pow(2).int();
    var shadowBitMask = ee.Number(2).pow(5).int();
    var cirrus = qa.eq(61440);
    var mask = qa.bitwiseAnd(cloudBitMask).eq(0).and(qa.bitwiseAnd(waterBitMask).eq(0)).and(qa.bitwiseAnd(shadowBitMask).eq(0)).and(qa.bitwiseAnd(cirrus).eq(0));
    return BASE_COLLECTION1.updateMask(mask);
   }
  //Criar função para obter data das images
  var get_days = function(date) {
    var m = date.millis();
    return m.divide(1000).divide(3600).toInt();
  };
  // add a 'date' band: number of days since epoch
  var addDate = function(img) {
    var d = ee.Date(img.date());
    var days = get_days(d);
    var days_img = ee.Image.constant(days).rename('date').toInt32();
    return img.addBands(days_img);
  };
  //Aplicar as funções
  var withNBR2 = BASE_COLLECTION1.map(addNBR2).map(addDate).map(maskS2clouds);
  var nbr2 = withNBR2.select(['NBR2', 'date',"B10"]);
  var mosaickedImage1 = nbr2.reduce(ee.Reducer.min(3));
  //////////COMPÓSITO 2
  START_DATE = '2015-07-02';
  END_DATE = '2015-12-31';
  //COMPÓSITO PÓS FOGO
  var BASE_COLLECTION2 = ee.ImageCollection(COLLECTION)
    .filterDate(START_DATE,END_DATE)
    .filterBounds(subset)
    .filter(ee.Filter.lt('CLOUD_COVER_LAND', porc_nuv));
  var withNBR2 = BASE_COLLECTION2.map(addNBR2).map(addDate).map(maskS2clouds);
  var nbr2 = withNBR2.select(['NBR2', 'date',"B10"]);
  var mosaickedImage2 = nbr2.reduce(ee.Reducer.min(3));
  //Variável diferença nbr2 e diferença temperatura
  var diff = mosaickedImage1.select('min').subtract(mosaickedImage2.select('min'));
  var temp = mosaickedImage1.select('min2').subtract(mosaickedImage2.select('min2'));
  //Focos ativos 
  var buffer = point.buffer(200000);
// Compute the centroid of the polygon.
var centroid = point.centroid();
Map.addLayer(buffer, {}, 'buffer');
//Map.addLayer(centroid, {}, 'centroid');
  var points = table2
  .filterBounds(buffer);
  //Map.addLayer(points, {}, 'Focos');
 //var test = points.reduce(diff)
 //print(test)
  // gets the values for the points in the current img
  var ft1 = diff.reduceRegions(points, ee.Reducer.first(),30);
  var ft2 = mosaickedImage2.reduceRegions(points, ee.Reducer.first(),30);
  //////achar limiares com base em percentile
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
  //var v1 = v1.float(v1)
  print(limiar1);
  var limiar2 = ee.Number(l2.get('p33'));
  print(limiar2);
  var visParams = {bands: ['min'], min:-0.1, max: 0.5};
  Map.addLayer(diff, visParams, 'Compósito Diferença T1 - T2');
  //Área com condicoes pré determinadas para coleta de amostras
  var queima = diff.gt(limiar1).and(mosaickedImage2.lt(limiar2));//.and(temp.lt(temp1));
  ///////////////////////////
  ////Apicar restrição filtro morfológico erosão na área criada anteriormente 
  var kernel = ee.Kernel.circle({radius: 3});
  var opened = queima
               .focal_min({kernel: kernel, iterations: 1});
  var class_p =  opened.select('min');
  //Map.addLayer(class_p, {});
  // gets the values for the points in the current img
  var ft3 = class_p.reduceRegions(points, ee.Reducer.first(),30);
  var sample1 = ft3.select('first');
  //Selecionar apenas amostras na área de influência - Create a Feature from the Geometry.
  var sample2 = sample1.filter(ee.Filter.gt('first', 0));
  points = sample2
      .remap([1], [0], 'first');
  //Map.addLayer(sample2, {}, 'Amostras');
  // Criar variável preditora
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
    nu: 0.002,
    gamma:  0.5,
  });
  var bands = ['min','min_1'];
  var trained = classifier.train(training,'first',bands);
  var classified = predict.select(bands).classify(trained);
  // Display the inputs and the results.
  Map.addLayer(classified, {min:0,max:1},  'Área queimada');
  //////////////////////////////////////////////////////////////
  // Export the image, specifying scale and region.
  Export.image.toDrive({
    image: classified,
    description: 'AQM_2015',
   maxPixels: 150000000000,
    scale: 30,
  });
});