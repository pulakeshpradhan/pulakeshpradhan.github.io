// incluye paquete de visualización
var legends = require('users/jsilvan/tools:legends');
var gui = require('users/jsilvan/tools:gui');
var legendsWidth = '250px';
legends.panelStyle({width: legendsWidth});
var aoi = ee.FeatureCollection("users/jsilvan/INEGI/entmx2018")
  .filterMetadata('CODIGO','equals','MX12')
  .geometry();
// define capas
var allneg = ee.FeatureCollection('users/jsilvan/GRO/negativos');
var pos = ee.FeatureCollection('projects/espacio-clandestino/assets/Positivos/GRO');
var vis = ee.ImageCollection('projects/espacio-clandestino/assets/vismap1200m')
  .filterBounds(aoi)
  .select([2])
  .max()
  .divide(100)
  .clip(aoi);
var time = ee.ImageCollection('projects/espacio-clandestino/assets/timemapSt')
  .filterBounds(aoi)
  .select([0])
  .min()
  .clip(aoi);
var vias = ee.FeatureCollection('users/jsilvan/TRANSP/red_vial_II');
// define constantes
var scale = 30;
var maxPixels = 1e13;
var label = 'class';
var bands = ['time','vis']; // espacio de caracteristicas
var bands2 = ['time2','vis2','prod'];
var PERCENTILES = [50,75,90,99,100];
// Define variables utilizadas por eventos
var prob,trained, detected, filtered;
var cuts = [0.5,0.75,0.9,0.99];
// variables para configuración de paneles
var TITLE = 'Distribución potencial de Fosas Clandestinas en Guerrero';
var TITLE_STYLE = {
  color: '555555',
  fontSize: '20px',
  fontWeight: 'bold',
  textAlign: 'center',
  width: '100',
  stretch: 'horizontal',
};
var DESCR = 'Esta APP calcula la probabilidad de existencia ' +
            'de FOSAS CLANDESTINAS empleando el modelo seleccionado ' +
            'sobre capas de PRIVACIDAD y ACCESIBILIDAD. El '  +
            'modelo se calibra con puntos POSITIVOS y NEGATIVOS ' + 
            'verificados por la FGR';
var DESCR_STYLE = {fontSize: '11px',textAlign: 'left',margin: '0px 4px 8px 16px'};
var HEADER_STYLE = {
  fontSize: '14px',
  fontWeight: 'bold',
};
// Propiedades de visualización de capas y leyendas
var POINTPROPS = [
  {label: 'Negativos', style: {color: 'green',pointShape: 'o',pointSize: 4}},  
  {label: 'Positivos', style: {color: 'red',pointShape: '+',pointSize: 4}},
  {label: 'Detectados', style: {color: 'orange',pointShape: 'x',pointSize: 4}},
  ];
var TIMEPROPS = {
  visParams : {
    min: 0,
    max: 120,
    palette: ['blue','green','yellow','orange','red'],
    opacity: 0.5,
  },
  label : 'Tiempo de viaje [mins]',
  visibility: false,
};
var VISPROPS = {
  visParams : {
    min: 0,
    max: 100,
    palette: ['880000','ffaa00','8888ff','00ffff','ffffff'],
    opacity: 0.9,
  },
  label : '% Visibilidad',
  visibility: false,
};
var PROBPROPS = {
  visParams : {
    min: 0,
    max: 1,
    palette: ['8888aa','baccff','baccff','baccff','baccff','fff6b6','fff6b6','fff6b6','ffdcdc','ff0055'],
    opacity: 1,
  },
  label : 'Probabilidad',
  visibility: true,
};
var SPACEPROPS = {
  visParams : {
    min: 0, 
    max: 3, 
    palette: ['ff8888','ffff55','aaff88','88aaff']},
  label: 'Tipos de Espacios',
  maxTime : 36,
  maxVis: 26,
  classes: ['Clandestino','Privado','Público','Escénico'],
  visibility: false,
};
var LEGEND2DPROPS = {
  title: 'Espacio de rasgos',
  xlabel: TIMEPROPS.label,
  ylabel: '%\nV\ni\ns',
  bbox: [TIMEPROPS.visParams.min, 
    VISPROPS.visParams.min, 
    TIMEPROPS.visParams.max,
    VISPROPS.visParams.max],
  mapper: function(img) {
      return img
      .select([0,1],bands)
      .classify(trained)
      .select([0],['prob']);
    }
};
// diccionarios para selectores
var EXPORT_FORMATS = ['csv', 'json', 'kml', 'kmz'];
// IMPORTANTE: Si se actualiza la capa de positivos y negativos se deben 
// calcular los valores de maxProb nuevamente
var CLASSIFIERS = {
  'Maxima Entropia' : {classifier: ee.Classifier.amnhMaxent({doClamp: true, writeClampGrid: false, autoFeature: false, linear: true, quadratic: true, product: true, outputFormat: 'logistic'}), maxProb: 0.568},
  'Arbol de Regresion' : {classifier: ee.Classifier.smileCart(), maxProb: 0.969},
  'Bayes Ingenuo' : {classifier: ee.Classifier.smileNaiveBayes(), maxProb: 1.001},
  'Bosque Aleatorio': {classifier: ee.Classifier.smileRandomForest(10), maxProb: 0.920},
  'Vector de Soporte con Kernel Radial' : {classifier: ee.Classifier.libsvm({kernelType: 'RBF'}), maxProb: 0.912},
};
// opciones de graficas
var TRAIN_OPTS = {
      title: 'Muestras de entrenamiento',
      titleTextStyle: HEADER_STYLE,
      hAxis: {'title': TIMEPROPS.label, 'maxValue': TIMEPROPS.visParams.max},
      vAxis: {'title': VISPROPS.label, 'maxValue': VISPROPS.visParams.max},
      lineWidth: 0,
      series: {
      0: POINTPROPS[0].style,
      1: POINTPROPS[1].style
    }
};
/***************************************************
 * Prepara capas para entrenamiento y clasificación
****************************************************/
var roads_mask = vias.reduceToImage({
    properties: ['VelMax'],
    reducer: ee.Reducer.first()
}).reproject({crs: 'EPSG:4326', scale: 100});
//vis = vis.max(urbano.divide(100).pow(0.5).multiply(100).unmask(0));
vis = vis.max(roads_mask.unmask(0));
// imagen con capas a clasificar
var image = time
  .addBands(vis)
  .select([0,1],bands); 
// tipos de espacios
var space = time.gt(SPACEPROPS.maxTime)
  .add(vis.gt(SPACEPROPS.maxVis).multiply(2));
// descarta negativos que se encuentren muy cercanos a los positivos
var neg = ee.Join.saveBest('match','dist').apply(allneg, pos, 
ee.Filter.withinDistance({distance: 100000,
  leftField: '.geo',
  rightField: '.geo',
  maxError: 30
})).map(function(f){
  f = ee.Feature(f);
  var dist = ee.Feature(f.get('match')).get('dist');
  return ee.Feature(f.geometry(),{dist: dist});
}).filter(ee.Filter.gte('dist',100));
// puntos para muestreo
var points = neg
  .map(function(f){
    return ee.Feature(f.geometry()).set(label,0);
  }).merge(pos.map(function(f){
    return ee.Feature(f.geometry()).set(label,1);
    }));
// muestras de entrenamiento
var training = image.sampleRegions({
  collection: points,
  properties: [label],
  scale: 30,
  geometries: true,
})/*.map(function(f){
  f = ee.Feature(f);
  var prod = ee.Number(f.get(bands[0])).multiply(f.get(bands[1]));
  var time2 = ee.Number(f.get(bands[0])).multiply(f.get(bands[0]));
  var vis2 = ee.Number(f.get(bands[1])).multiply(f.get(bands[1]));
  return f.set(bands2[0],time2).set(bands2[1],vis2).set(bands2[2],prod);
}).filter(ee.Filter.expression('(prod > 100 && class == 0) || prod < 1500 && class == 1'));
*/
/********************************************
 Configura el mapa y agrega capas inciales
*********************************************/
Map.setOptions({mapTypeId: 'HYBRID'});
Map.setCenter(-99.53991, 18.34602,12); //Iguala
//Map.setCenter(-99.6788, 17.9036,11); //Mezcala
Map.layers().set(0,ui.Map.Layer(time,TIMEPROPS.visParams, TIMEPROPS.label, TIMEPROPS.visibility));
Map.layers().set(1,ui.Map.Layer(vis,VISPROPS.visParams, VISPROPS.label, VISPROPS.visibility)); // Layer 1
Map.layers().set(2,ui.Map.Layer(space,SPACEPROPS.visParams,SPACEPROPS.label,SPACEPROPS.visibility));
Map.layers().set(3,ui.Map.Layer()); // se actualizará al detonar evento de selección del método
Map.layers().set(4,ui.Map.Layer(neg.style(POINTPROPS[0].style),{}, POINTPROPS[0].label,true)); // Layer 3
Map.layers().set(5,ui.Map.Layer(pos.style(POINTPROPS[1].style),{}, POINTPROPS[1].label,true)); // Layer 4
Map.layers().set(6,ui.Map.Layer()); // Detectados
//Map.layers().set(7,ui.Map.Layer(mezcala,{},'Búsqueda Mezcala',true)); // Layer 6
//Map.layers().set(8,ui.Map.Layer(carrizalillo,{},'Búsqueda Carrizalillo',true)); // Layer 7
/***************************************************
 * Funciones de apoyo
****************************************************/
// calcula percentiles de probabilidad
var getPerc = function(img){
  return img.reduceRegion({
    reducer: ee.Reducer.percentile(PERCENTILES),
    maxPixels: maxPixels,
    }).toArray().toList();
};
// crea etiquetas de rango a partir de los percentiles
var perc2Ranges = function(cuts){
  return [
    '0-' + cuts[0].toFixed(2).toString(),
    cuts[0].toFixed(2).toString() + '-' + cuts[1].toFixed(2).toString(),
    cuts[1].toFixed(2).toString() + '-' + cuts[2].toFixed(2).toString(),
    cuts[2].toFixed(2).toString() + '-' + cuts[3].toFixed(2).toString(),
    cuts[3].toFixed(2).toString() + '-1'
    ];
};
// Clasifica probabilidades por rangos
var prob2class = function(img,cuts){
    //return img;
  return img.gte(ee.Image(cuts[0]))
    .add(img.gte(ee.Image(cuts[1])))
    .add(img.gte(ee.Image(cuts[2])))
    .add(img.gte(ee.Image(cuts[3])));
};
/***************************************************
 * Funciones de llamadas a eventos
****************************************************/
// Callback de selector de clasificador
var updateProb = function(value,widget){
  trained = CLASSIFIERS[value].classifier
    .setOutputMode('PROBABILITY')
    .train(training, label,bands);
  prob = image.classify(trained).select([0],['prob']);
    // Decomenta para imprimir valor maximo
  var maxProb = prob.reduceRegion({
    reducer: ee.Reducer.max(),
    scale: scale, 
    maxPixels: maxPixels
  }).get('prob');
  minProbSliderPanel.remove(minProbSlider);
  minProbSliderPanel.add(ui.Label('Actualizando...'));
  maxProb.evaluate(function(p){
    minProbSlider = ui.Slider({
      min: p-0.1,
      max: p,
      step: 0.001,
      onChange: updateDetection,
      //style: {width: '180px'}
    }); 
    minProbSliderPanel.widgets().set(1,minProbSlider);
    minProbSlider.setValue(p - 0.001);
    print(p);
  });
  //cuts = getPerc(prob).getInfo();
  var layer = ui.Map.Layer(
    //prob2class(prob,cuts),
    prob,
    PROBPROPS.visParams, 
    PROBPROPS.label, 
    PROBPROPS.visibility);
  Map.layers().set(3, layer);
  // actualiza legendas
  //legendPanel.widgets().set(2,legends.classes(
  legendPanel.widgets().set(2,legends.value(
    PROBPROPS.label,
    PROBPROPS.visParams
//    perc2Ranges(cuts)
    ));
  legendPanel.widgets().set(6,legends.map2d(LEGEND2DPROPS,PROBPROPS.visParams));
  // actualiza controles
  /*
  var maxProb = CLASSIFIERS[value]
    .maxProb;
  minProbSlider
    .setMin(0)
    .setMax(1)
    .setMin(maxProb-0.1)
    .setMax(maxProb)
    .setValue(maxProb - 0.001); */
  /*Export.image.toAsset({
    image: prob,
    assetId: 'MaxEntProb',
    scale: 100,
    maxPixels: 1e13,
    region: prob.geometry()
  })*/
};
// Callback de la barra de umbral
var updateDetection = function(value,widget) {
  detectedLabel.setValue('Actualizando...');
  if (Map.layers().get(6)) Map.layers().get(6).setShown(false);
  detected = prob.gte(value).addBands(image).addBands(prob,['prob'])
    .reduceToVectors({
      geometryType: 'centroid',
      reducer: ee.Reducer.first(),
      maxPixels: maxPixels,
      scale: scale,
  });
  detected.size().evaluate(function(maxPoints){
    detectedLabel.setValue(maxPoints.toString());
    maxPointsSlider.setMax(maxPoints).setValue(Math.min(maxPoints,1e3));
  });
};
// Callback de la barra de filtro de puntos
var filterPoints = function(value,widget){
  filtered = detected.limit(ee.Number(widget.getValue()).toInt(),'prob',false);
  var newLayer = ui.Map.Layer(filtered.style(POINTPROPS[2].style),{},POINTPROPS[2].label,true);
  Map.layers().set(6,newLayer);
  setFormat(exportFormats.getValue(),exportFormats);
};
// Callback del boton de exortar
var setFormat = function(value,widget) {
  var url = filtered.getDownloadURL({
    filename: classSelect.getValue() +'_'+filtered.size().format('%d').getInfo() +'pts',
    format: value,
  });
  downloadURL.setUrl(url);
};
// Callback del boton Leyenda
var showLegend = function(widget) {
  if (widget.value)
    ui.root.insert(2,legendPanel);
  else
    ui.root.remove(legendPanel);
};
// Callback del boton Leyenda
var showTools = function(widget) {
  if (widget.value)
    ui.root.insert(0,toolPanel);
  else
    ui.root.remove(toolPanel);
};
// Callback del grafico
var goTo = function(xValue, yValue, seriesName) {
  if (!xValue) return;  
  var point = training.filter(ee.Filter.and(
    ee.Filter.maxDifference(1e-6,bands[0],parseFloat(xValue)),
    ee.Filter.eq(bands[1],yValue)
    ));
  Map.centerObject(point,15);
};
var centerLocButton = gui.curLocButton("🢅",10);
Map.add(centerLocButton);
// define botón cíclico para cambio de colección
var showLegendButton = gui.toggleButton(
    [
      {
        label: '<<',
        value: false,
      },
      {
        label: '>>',
        value: true,
      }
    ],
    showLegend);
showLegendButton.style().set({
  position: 'bottom-right',
  padding: '0px'
});
Map.add(showLegendButton);
/*
// Definición del panel de herramientas
*/
var titleLabel = ui.Label(TITLE,TITLE_STYLE);
var appByLabel= ui.Label('por jsilvan',
  DESCR_STYLE,'https://jsilvan.users.earthengine.app/');
var descrLabel = ui.Label(DESCR,DESCR_STYLE);
var classSelect = ui.Select({
  items: Object.keys(CLASSIFIERS),
  onChange: updateProb,
});
var classifierPanel = ui.Panel([
  ui.Label('Selecciona el método de clasificación:',HEADER_STYLE),
  classSelect],ui.Panel.Layout.flow('vertical'),{padding: '4px'});
var minProbSlider = ui.Slider({
    min: 0.9,
    max: 1.0,
    step: 0.001,
    onChange: updateDetection,
    //style: {width: '180px'}
});
var minProbSliderPanel = ui.Panel([
  ui.Label('Probabilidad de corte:',HEADER_STYLE),
  minProbSlider],ui.Panel.Layout.flow('horizontal'),{padding: '4px'})
var minProbPanel = ui.Panel([minProbSliderPanel,
  ui.Label('(Se ajusta automáticamente al máximo menos 0.001. '+
          'Desliza solo si quieres un mayor número de puntos. ' +
          'El proceso de actualización puede tardar)',DESCR_STYLE)],
  ui.Panel.Layout.flow('vertical'),{stretch: 'vertical'});
var detectedLabel = ui.Label('Actualizando...');
var detectedPanel = ui.Panel([
  ui.Label('Puntos detectados:',HEADER_STYLE),
  detectedLabel],ui.Panel.Layout.flow('horizontal'),{padding: '4px'});
var maxPointsSlider = ui.Slider({
    min: 0, 
    max: 100, 
    step: 1, 
    onChange: filterPoints});
var maxPointsPanel = ui.Panel([ui.Panel([
  ui.Label('Limitar puntos a:',HEADER_STYLE),
  maxPointsSlider],ui.Panel.Layout.flow('horizontal'),{padding: '4px'}),
  ui.Label('(Limita el número de puntos a exportar. '+
          'Los datos son ordenados de mayor a menor probabilidad)',DESCR_STYLE)],
  ui.Panel.Layout.flow('vertical'),{stretch: 'vertical'});
//var exportButton = ui.Button('Exportar', exportPoints);
var exportFormats = ui.Select({
    items: EXPORT_FORMATS,
    placeholder: 'FORMATO',
    value: 'kml', 
    onChange: setFormat});
var downloadURL = ui.Label('Descargar',HEADER_STYLE);
var exportPanel = ui.Panel([
    downloadURL,
    ui.Label(' en formato:',HEADER_STYLE),
    exportFormats],
    ui.Panel.Layout.flow('horizontal'),{padding: '4px'});
// define botón cíclico para cambio de colección
var showToolsButton = gui.toggleButton(
    [
      {
        label: '<<',
        value: true,
      },
      {
        label: '>>',
        value: false,
      }
    ],
    showTools); 
showToolsButton.style().set({
  position: 'bottom-left',
  padding: '0px'
});
Map.add(showToolsButton);
var trainPlot = ui.Chart.feature.groups(training, bands[0],  bands[1], label)
    .setSeriesNames([POINTPROPS[0].label,POINTPROPS[1].label])
    .setOptions(TRAIN_OPTS);
var widgets = [titleLabel,appByLabel,descrLabel,
  classifierPanel,trainPlot,minProbPanel,detectedPanel,maxPointsPanel,
  exportPanel];
var toolPanel = ui.Panel(widgets,'flow',{width: '300px'});
trainPlot.onClick(goTo);
// Panel de leyendas
var legendPanel = ui.Panel([
  ui.Label('Simbología',TITLE_STYLE),
  legends.features('Fosas',POINTPROPS),
  ui.Panel(),
  legends.classes(SPACEPROPS.label,SPACEPROPS.visParams,SPACEPROPS.classes),
  legends.value(VISPROPS.label,VISPROPS.visParams),
  legends.value(TIMEPROPS.label,TIMEPROPS.visParams),
  ui.Panel()],'flow',{width: '265px'});
ui.root.insert(0,toolPanel);
classSelect.setValue(Object.keys(CLASSIFIERS)[0]);
// Create an inspector panel with a horizontal layout.
var inspector = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {position: 'bottom-center'}
});
// Add a label to the panel.
inspector.add(ui.Label('Clique el mapa para consultar valores...'));
// Add the panel to the default map.
Map.add(inspector);
// Set the default map's cursor to a "crosshair".
Map.style().set('cursor', 'crosshair');
// Register a callback on the map to be invoked when the map is clicked.
Map.onClick(function(coords) {
  // Clear the panel and show a loading message.
  inspector.clear();
  inspector.style().set('shown', true);
  inspector.add(ui.Label('Cagando...', {color: 'gray'}));
  // Compute the mean NDVI; a potentially long-running server operation.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var sampledPoint = ee.Image([time,vis,prob])
    .select([0,1,2],['time','vis','prob'])
    .reduceRegion(ee.Reducer.first(), point, 30);
  // Request the value from the server and use the results in a function.
  sampledPoint.evaluate(function(result) {
    inspector.clear();
    // Add a label with the results from the server.
    inspector.add(ui.Label({
      value: 'Tiempo de viaje: ' + result.time.toFixed(0) +
      ' mins \nVisibilidad: ' + result.vis.toFixed(0) + 
      '% \nProbabilidad: ' + (result.prob * 100).toFixed() + '%',
      style: {stretch: 'vertical', whiteSpace: 'pre'}
    }));
    // Add a button to hide the Panel.
    inspector.add(ui.Button({
      label: 'Cerrar',
      onClick: function() {
        inspector.style().set('shown', false);
      }
    }));
  });
});