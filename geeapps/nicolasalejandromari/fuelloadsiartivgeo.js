var CBA_AQ_2020 = ui.import && ui.import("CBA_AQ_2020", "table", {
      "id": "projects/ee-nicolasalejandromari/assets/BAMS_2020_CBA_SLUIS_SGODESTERO"
    }) || ee.FeatureCollection("projects/ee-nicolasalejandromari/assets/BAMS_2020_CBA_SLUIS_SGODESTERO"),
    LR_AQ_2020 = ui.import && ui.import("LR_AQ_2020", "table", {
      "id": "projects/ee-nicolasalejandromari/assets/Incendio_Llanos_LR_2020"
    }) || ee.FeatureCollection("projects/ee-nicolasalejandromari/assets/Incendio_Llanos_LR_2020"),
    Chubut_AQ_ElDoradillo = ui.import && ui.import("Chubut_AQ_ElDoradillo", "table", {
      "id": "projects/ee-nicolasalejandromari/assets/Incendio_ElDoradillo_01022020"
    }) || ee.FeatureCollection("projects/ee-nicolasalejandromari/assets/Incendio_ElDoradillo_01022020"),
    Chubut_AQ_ElTriunfo = ui.import && ui.import("Chubut_AQ_ElTriunfo", "table", {
      "id": "projects/ee-nicolasalejandromari/assets/Incendio_ElTriunfo"
    }) || ee.FeatureCollection("projects/ee-nicolasalejandromari/assets/Incendio_ElTriunfo"),
    Jujuy_AQ_2020 = ui.import && ui.import("Jujuy_AQ_2020", "table", {
      "id": "projects/ee-nicolasalejandromari/assets/incendios_calilegua"
    }) || ee.FeatureCollection("projects/ee-nicolasalejandromari/assets/incendios_calilegua"),
    imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "BurnDate"
        ],
        "min": 0,
        "max": 1,
        "palette": [
          "ffffff",
          "fffa18"
        ]
      }
    }) || {"opacity":1,"bands":["BurnDate"],"min":0,"max":1,"palette":["ffffff","fffa18"]};
//////////////////////////////////////////////////////////////////////////////////
////                                                                          ////
////                      ÍNDICE DE CARGA DE COMBUSTIBLES                     ////
////                         BASADO EN LA FRACCION DE                         ////
////                      MATERIAL SECO, VERDE Y SUELO DESNUDO                ////
////==========================================================================////
////            Julio 2023  - Nicolás A. Mari & Leónidas Lizárraga            ////
////                                                                          ////  
////                             Descripción:                                 ////
////     -Incorpora firmas espectrales de de materiales puros                 ////
////     -Índice complementario al IPPF                                       ////
////     -Desarrollado mediante el método desmezclado espectral               ////
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
//var maskOutside = function(image, geometry){
//    var mask = ee.Image.constant(1).clip(geometry).mask(); 
//    return image.updateMask(mask);
//};
//Mascara de aguas superficiales//
// Load the JRC Global Surface Water dataset
var watermask = ee.Image('JRC/GSW1_4/Metadata')
          .select('detections').gt(500).not()
          .clip(pais);
///============================ Proceso de desmezclado espectral ============================///         
// Se definen las bandas de interes para el unmixing 
var bands = ['B2', 'B3', 'B4', 'B5', 'B6', 'B7'];
///====================== Definicion de materiales puros ================================////////////////////// 
// Se definen los endmembers para cada clase de interes en base a muestras obtenidas de coberturas de pastizales y Suelo desnudo de MapBiomas 2021
// var Veg_seca = [0.77, 0.71, 0.68, 1.11, 0.87, 0.72];
// var Veg_hum = [1.19, 1.10, 1.07, 1.60, 1.39, 1.05];
// var Suelo = [0.90, 0.93, 1.05, 1.17, 1.46, 1.31];
// Se definen los endmembers para cada clase de interes en base a doi:10.1016/j.rse.2005.07.013
 var Veg_seca = [1.4, 1.7, 2.2, 3, 5.5, 3];
 var Veg_hum = [0.5, 0.9, 0.4, 6.1, 3, 1];
 var Suelo = [0.9, 1, 1.6, 3, 2.9, 4.8];
// Funcion para ejecutar el spectral unmixing
var realizarDescomposicion = function(trimestre, fechaInicio, fechaFin) {
  var coleccion = ee.ImageCollection('LANDSAT/LC08/C02/T1')
    .filterDate(fechaInicio, fechaFin)
    .map(corte);
 var composite = ee.Algorithms.Landsat.simpleComposite({
  collection: coleccion,
    asFloat: true,
    percentile: 75,
    cloudScoreRange: 20
 });
 var imagen = composite.select(bands);
 var fractions = imagen.unmix([Veg_seca,Veg_hum,Suelo ]).rename(['Fraccion Seca','Fraccion Verde','Suelo descubierto']);
 // Trunca valores negativos a cero
 var nonNegativeFractions = fractions.max(0);
 // Normaliza las fracciones 
 var sumFractions = nonNegativeFractions.reduce('sum');
 var normalizedFractions = nonNegativeFractions.divide(sumFractions);
 ///Se enmascara el agua en superficie
var normalizedFractions_w = normalizedFractions.multiply(watermask);
///Se reproyecta la salida del producto y se escala al valor de pixel deseado
//var normalizedFractions_w_r = normalizedFractions_w.toFloat()
  //                .reproject('EPSG:4326', null, 1000);
/////////////////////////////////////////////////////////////////////////
 // Map.addLayer(normalizedFractions, {}, 'Combustible ' + trimestre);
Map.addLayer(normalizedFractions_w, {min: 0, max: 1}, 'Combustible ' + trimestre);
};
///============================ FECHA DE ANÁLISIS ============================///
// Primer trimestre
realizarDescomposicion('1T_2020', '2020-01-01', '2020-03-31');
// Segundo trimestre
realizarDescomposicion('2T_2020', '2020-04-01', '2020-06-30');
// Tercer trimestre
realizarDescomposicion('3T_2020', '2020-07-01', '2020-09-30');
// Cuarto trimestre
realizarDescomposicion('4T_2020', '2020-10-01', '2020-12-31');
Map.centerObject(pais,6);
 ///============================ DATOS DE REFERENCIA  ============================///
// Visualizacion de areas quemadas de referencia
var empty = ee.Image().byte();
// Incendios Córdoba 2020
var CBAoutline = empty.paint({
  featureCollection: CBA_AQ_2020,
  color: 1,
  width: 0.5 });
Map.addLayer(CBAoutline,{},'AQ L8 Cordoba',false);
// Incendios La Rioja  2020
var LRoutline = empty.paint({
  featureCollection: LR_AQ_2020,
  color: 1,
  width: 0.5 });
Map.addLayer(LRoutline,{},'AQ L8 La Rioja',false);
// Incendios Chubut 2020
var Chu_outline = empty.paint({
  featureCollection: Chubut_AQ_ElDoradillo,
  color: 1,
  width: 0.5 });
Map.addLayer(Chu_outline,{},'AQ L8 El Doradillo',false);
var Chu2_outline = empty.paint({
  featureCollection: Chubut_AQ_ElTriunfo,
  color: 1,
  width: 0.5});
Map.addLayer(Chu2_outline,{},'AQ L8 El Triunfo',false);
// Incendios Jujuy 2020
var Jujuyoutline = empty.paint({
  featureCollection: Jujuy_AQ_2020,
  color: 1,
  width: 0.5 });
Map.addLayer(Jujuyoutline,{},'AQ L8 Calilegua',false);
///============================ Proceso de Area Quemada MODIS ============================///     
var datasetMCD64_1T = ee.ImageCollection('MODIS/006/MCD64A1')
   .filterDate('2020-01-01', '2020-03-31')
  .select('BurnDate')
  .map(function(image) {
      return image.clip(pais);
    });
var datasetMCD64_2T = ee.ImageCollection('MODIS/006/MCD64A1')
   .filterDate('2020-04-01', '2020-06-30')
  .select('BurnDate')
  .map(function(image) {
      return image.clip(pais);
    });    
var datasetMCD64_3T = ee.ImageCollection('MODIS/006/MCD64A1')
   .filterDate('2020-07-01', '2020-09-30')
  .select('BurnDate')
  .map(function(image) {
      return image.clip(pais);
    });    
var datasetMCD64_4T = ee.ImageCollection('MODIS/006/MCD64A1')
   .filterDate('2020-10-01', '2020-12-31')
  .select('BurnDate')
  .map(function(image) {
      return image.clip(pais);
    });    
Map.addLayer(datasetMCD64_1T, 
             {min: 0, max: 1}, 'AQ MODIS 1T_2020',false);
Map.addLayer(datasetMCD64_2T, 
             {min: 0, max: 1}, 'AQ MODIS 2T_2020',false);
Map.addLayer(datasetMCD64_3T, 
             {min: 0, max: 1}, 'AQ MODIS 3T_2020',false);
Map.addLayer(datasetMCD64_4T, 
             {min: 0, max: 1}, 'AQ MODIS 4T_2020',false);
///========================== LEYENDA ==========================///
// Agrega los limites provinciales 
Map.addLayer(provincias,  {}, 'Provincias Argentinas');
// Agrega Leyenda
// Define the color palette
var palette = ['0717f7', 'F81404', '07f71b'];
var visParam = {
  min: 0,
  max: 1,
  palette: palette
};
// Create the legend panel
var legendPanel = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '15px 10px',
  }
});
// Create the legend title
var title = ui.Label({
  value: 'Carga de Combustibles',
  style: {
    fontWeight: 'bold',
    fontSize: '16px',
    margin: '0 8px 0 0',
    padding: '0'
  }
});
// Create the thumbnail image
var thumbnail = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select('latitude')
    .multiply((visParam.max - visParam.min) / 100)
    .add(visParam.min).visualize(visParam),
  params: { bbox: '0,0,10,100', dimensions: '30x200' },
  style: { padding: '1px' }
});
// Create the maximum value label
var maxValueLabel = ui.Label('% Fraccion Verde', {
  margin: '-205px 0px 0px 55px'
});
// Create the mean value label
var meanValueLabel = ui.Label('% Fraccion Seca', {
  margin: '65px 0px 0px 55px'
});
// Create the minimum value label
var minValueLabel = ui.Label('% Suelo Desnudo', {
  margin: '75px 0px 0px 55px'
});
// Add the legend elements to the legend panel
legendPanel.add(title);
legendPanel.add(thumbnail);
legendPanel.add(maxValueLabel);
legendPanel.add(meanValueLabel);
legendPanel.add(minValueLabel);
// Add the legend panel to the map
Map.add(legendPanel);
///============================== Fin Script ==============================///