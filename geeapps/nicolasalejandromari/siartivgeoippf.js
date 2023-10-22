//////////////////////////////////////////////////////////////////////////////////
////                                                                          ////
////              ÍNDICE DE PELIGRO DE PROPAGACIÓN DEL FUEGO                  ////
////                     DADA UNA FUENTE DE INGNICIÓN                         ////
////==========================================================================////
////                     Abril 2023  - L. Zalazar                             ////
////                                                                          ////  
////                             Descripción:                                 ////
////     -Incorpora variables combustibles (tipo y humedad) y topográficas.   ////
////     -Índice complementario al índice meteorológico.                      ////
////     -Desarrollado mediante el método de análisis multicriterio.          ////
////                                                                          ////
//////////////////////////////////////////////////////////////////////////////////
///============================= ÁREA DE ESTUDIO =============================///
///Se lee el área de estudio (AE), nivel país. 
var pais = ee.FeatureCollection("FAO/GAUL/2015/level0")
              .filter(ee.Filter.inList('ADM0_CODE', ee.List([12, 81]))); 
var provincias = ee.FeatureCollection("FAO/GAUL/2015/level1")
              .filter(ee.Filter.inList('ADM0_CODE', ee.List([12, 81]))); 
var borderStyle = {
  color: '000000', 
  fillColor: '00000000', 
  width: 1 
};
provincias = provincias.style(borderStyle);
///Función para recortar una colección de imágenes con el AE
var corte = function(image){
  return image.clip(pais);
};
///Función para enmascarar lo que se encuentre por fuera del AE
var maskOutside = function(image, geometry){
    var mask = ee.Image.constant(1).clip(geometry).mask(); 
    return image.updateMask(mask);
};
///============================ FECHA DE ANÁLISIS ============================///
///Se lee fecha de ejecución de script 
var fecha = new Date(); 
var fechaConsulta = fecha; //por defecto: fecha actual
///++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++///
//Comentar fechaConsulta anterior y descomentar y modificar la siguiente para   
//ver una fecha diferente a la actual, por ej. para probar el algoritmo.  
//var fechaConsulta = new Date('2020/12/21'); 
///++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++///
var dia = fechaConsulta.getDate();
var mes = fechaConsulta.getMonth() + 1;  
var anno = fechaConsulta.getFullYear(); 
///Se define el período de análisis para el cálculo de los NDII históricos
var fechaHistIni = '2012-01-17'; //por defecto: fecha de inicio del producto
///No se toma el mes de interés del año en curso para el histórico
var fechaHistFin = new Date(anno-1, mes-1, dia);
print('Fecha de Consulta', fechaConsulta);
///=========================== CAPA DE COMBUSTIBLES ===========================///
///Se lee el mapa de coberturas y recorta con el AE
var coberturas = ee.Image("COPERNICUS/Landcover/100m/Proba-V-C3/Global/2019")
                   .select('discrete_classification')
                   .clip(pais);
///Se reclasifican las coberturas a combustibles, según los modelos de Anderson
///Los considerados no combustibles se mantuvieron diferenciados para sólo enmascarar algunos luego
var combustibles = coberturas.remap([0,20,30,40,50,60,70,80,90,100,111,112,113,114,115,116,121,122,123,124,125,126,200],
                                     [0,4,3,90,91,92,93,94,95,96,9,9,9,9,9,9,7,7,7,7,11,11,99]);
///Se reproyecta la capa de combustibles
var combustiblesr = combustibles.toFloat()
                      .reproject('EPSG:4326', null, 1000);
///Se reclasifican los combustibles según peligro de propagación
var claseCombustibles = combustiblesr.remap([0,3,4,7,9,11,90,91,92,93,94,95,96],
                                             [0,4,3,2,1,1,0,0,0,0,0,0,0]);
///Se reclasifican los combustibles para generar una máscara de no combustibles
var noCombustibles = combustiblesr.remap([0,91,92,93,94,96,3,4,7,9,11,90,95],
                                          [0,0,0,0,0,0,1,1,1,1,1,1,1]);
///========================= CAPA DE ESTRÉS HÍDRICO ==========================///
///Se calcula el NDII a partir de VIIRS VNP13A1
var addNDII=function(image){
  var ndii=image.normalizedDifference(['NIR_reflectance','SWIR2_reflectance']).rename('NDII');
  return image.addBands(ndii);
};
///Se lee la colección de VIIRS para calcular los NDII históricos
///Se filtra por un período de 10 años o más para el análisis
///Se calcula el histórico sólo para el mes de interés
///Se agregan los NDII calculados a la colección y se recorta con el AE
var dataset = ee.ImageCollection('NOAA/VIIRS/001/VNP13A1')
                  .filter(ee.Filter.date(fechaHistIni, fechaHistFin))
                  .filter(ee.Filter.calendarRange(mes,mes,'month'))
                  .map(corte)
                  .map(addNDII);
var NDII = dataset.select('NDII');
///Se calcula la media y el desvío estándar histórico
var promedio= NDII.mean();
var desvStand= NDII.reduce(ee.Reducer.stdDev());
///Se define la fecha a 30 días antes de la fecha de consulta, 
///para asegurar la lectura del producto VIIRS 
var fechaMLS = new Date(fechaConsulta).getTime();
var fechaPrevia =ee.Date(fechaMLS-(30*24*60*60000)).format('YYYY-MM-dd');
///Se lee la colección VIIRS actual para evaluar (mismo mes que el histórico)
var actual = ee.ImageCollection('NOAA/VIIRS/001/VNP13A1')
               .filter(ee.Filter.date(fechaPrevia, fechaConsulta))
               .map(corte)
               .map(addNDII)
               .sort('system:time_start', false).first(); //conservo solo el producto más cercano
///Se lee la fecha del NDII calculado y se le da formato para poder transformarlo a string
var fechaIniNDII = ee.Date(actual.get('system:time_start'));
var fechaFinNDII = ee.Date(actual.get('system:time_end'));
print('Fin Compuesto NDII', fechaFinNDII);
print('Inicio Compuesto NDII', fechaIniNDII);
///Se calcula la anomalía del NDII (=estrés hídrico)
var anomalia = (actual.select('NDII')).subtract(promedio).divide(desvStand);
///Se reproyecta la anomalía
var anomaliar = anomalia.toFloat()
                  .reproject('EPSG:4326', null, 1000);
///Se clasifica en rangos a la anomalía del NDII
var claseAnomalia = ee.Image(1)
                    .where(anomaliar.gte(0.5),1) //Húmedo (>0.5 y <1.5) y Muy Húmedo (>1.5)
                    .where(anomaliar.gt(-0.5).and(anomaliar.lt(0.5)),2) //Normal
                    .where(anomaliar.gt(-1.5).and(anomaliar.lte(-0.5)),3) //Seco
                    .where(anomaliar.lte(-1.5),4) // Muy seco
                    .clip(pais);
///============================ CAPAS TOPOGRÁFICAS ============================///
///Se lee el DEM SRTM 
var dataset = ee.Image('CGIAR/SRTM90_V4');
var elevacion = dataset.select('elevation').clip(pais);
///Se calcula la pendiente (en grados), se reproyecta y se clasifica por rangos
var pendiente = ee.Terrain.slope(elevacion).clip(pais);
var pendienter = pendiente.toFloat()
                  .reproject('EPSG:4326', null, 1000);
var clasePendiente = ee.Image(1)
                       .where(pendienter.gte(0.0).and(pendienter.lte(10.0)),1)
                       .where(pendienter.gt(10.0).and(pendienter.lte(25.0)),2)
                       .where(pendienter.gt(25.0).and(pendienter.lte(31.0)),3)
                       .where(pendienter.gt(31.0),4)
                       .clip(pais);
///Se calcula la orientación, se reproyecta y se clasifica por rangos
var orientacion = ee.Terrain.aspect(elevacion).clip(pais);
var orientacionr = orientacion.toFloat()
                     .reproject('EPSG:4326', null, 1000);
var claseOrientacion = ee.Image(1) 
                         .where(orientacionr.gte(0).and(orientacionr.lte(45)),4) //Norte
                         .where(orientacionr.gt(45).and(orientacionr.lte(135)),2) // Este
                         .where(orientacionr.gt(135).and(orientacionr.lte(225)),1) // Sur
                         .where(orientacionr.gt(225).and(orientacionr.lte(315)),2) // Oeste
                         .where(orientacionr.gt(315).and(orientacionr.lte(360)),4) // Norte
                         .clip(pais);
///========================== ÍNDICE DE PROPAGACIÓN ==========================///
///Se aplica el modelo multicriterio definido
var peligro = (claseCombustibles.multiply(0.306)).add(claseAnomalia.multiply(0.519))
              .add(clasePendiente.multiply(0.126)).add(claseOrientacion.multiply(0.05));
///Se enmascara los no combustibles
var mascaraPeligro = peligro.multiply(noCombustibles);
///Se clasifica en rangos el peligro de propagación
var clasePeligro = ee.Image(1)
                     .where(mascaraPeligro.eq(0),0) //Nulo o Muy Bajo
                     .where(mascaraPeligro.gt(0).and(mascaraPeligro.lte(1)),1) //Bajo
                     .where(mascaraPeligro.gt(1).and(mascaraPeligro.lte(2)),2) //Medio
                     .where(mascaraPeligro.gt(2).and(mascaraPeligro.lte(3)),3) //Alto
                     .where(mascaraPeligro.gt(3),4) //Muy Alto
                     .clip(pais);
///========================== VISUALIZACIÓN DEL IPPF ==========================///
///Paleta para clasificación de peligro
var peligroVis = {
  min: 0, 
  max: 4,
  palette: ["d9d6d5","16e35b","0c86ed","f1fa0c","ff921a"],
};
///Se centra en el AE la representación de las capas
Map.centerObject(pais,4);
Map.addLayer(clasePeligro, peligroVis, 'IPPF');
// Agrega los limites provinciales 
Map.addLayer(provincias,  {}, 'Provincias Argentinas');
///Se agrega leyenda de peligro 
var etiquetas = ['Muy Alto', 'Alto','Moderado','Bajo','Muy Bajo o Nulo'];
var titulo = ui.Label({
  value: 'IPPF',
  style: {fontWeight: 'bold', fontSize: '18px', margin: '0 0 4px 0',padding: '0'}
});
var leyenda = ui.Panel({
  style: {position: 'bottom-left', padding: '8px 15px'}
});
leyenda.add(titulo);
var simbologia = ["ff921a","f1fa0c","0c86ed","16e35b", "d9d6d5"];
var simbolos = function(simbolo, texto){
  var textoleyenda = ui.Label({
    value: texto,
    style: {margin: '6px 0px 10px 15px'}});
  var cajaleyenda = ui.Label ({
    style: {backgroundColor: '#' + simbolo,
    padding: '15px',
    margin: '10 10 6px 0'}});
  return ui.Panel({
    widgets: [cajaleyenda, textoleyenda],
    layout: ui.Panel.Layout.Flow('horizontal')});};
  for (var i=0; i<5; i++) {leyenda.add(simbolos(simbologia[i],etiquetas[i]));}
  Map.add(leyenda);
///Se agrega leyenda de fechas
// Fecha Actual
var currentDate = new Date();
// Fecha actual en formato YYYY-MM-dd
var actualDateStr = currentDate.toISOString().slice(0, 10);
// Define las fechas del inicio y fin del compuesto
var fechaIniNDII = ee.Date(actual.get('system:time_start'));
var fechaFinNDII = ee.Date(actual.get('system:time_end'));
// Convierte las fechas en formato YYYY-MM-dd
var startDate = fechaIniNDII.format("YYYY-MM-dd").getInfo();
var endDate = fechaFinNDII.format("YYYY-MM-dd").getInfo();
// Crea el panel de la leyenda
var legendPanel = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px',
    width: '200px'
  }
});
// Crea y agrrega el titulo 
var legendTitle = ui.Label({
  value: 'Fechas',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
  }
});
legendPanel.add(legendTitle);
// Crea y agrega la fecha actual 
var actualDateLabel = ui.Label({
  value: 'Fecha Actual: ' + actualDateStr,
  style: {
    fontWeight: 'bold',
    margin: '0 0 4px 0'
  }
});
legendPanel.add(actualDateLabel);
// Crea y agrega la fecha de inico 
var startDateLabel = ui.Label({
  value: 'Fecha Inicial:' + startDate,
  style: {
    fontWeight: 'bold',
    margin: '0 0 4px 0'
  }
});
legendPanel.add(startDateLabel);
// Crea y agrega la fecha fin 
var endDateLabel = ui.Label({
  value: 'Fecha final: ' + endDate,
  style: {
    fontWeight: 'bold',
    margin: '0 0 4px 0'
  }
});
legendPanel.add(endDateLabel);
// Agrega la leyenda al mapa 
Map.add(legendPanel);
///=========================== EXPORTACIÓN DEL IPPF ===========================///
///Se enmascaran los valores por fuera del AE
var clasePeligro = (maskOutside(clasePeligro, pais).unmask(-9999));
///Se exporta la imagen
Export.image.toDrive({
  image: clasePeligro,
  description: ('IPPF_' + anno +'-'+ mes +'-'+dia),
  folder: 'Peligro_Propagacion_Fuego',
  scale: 1000,
  crs: 'EPSG:4326',
  region: pais,
  maxPixels: 1e13
});
///============================== Fin Script ==============================///