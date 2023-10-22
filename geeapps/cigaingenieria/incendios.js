//var Amazonia = ee.FeatureCollection("users/cigaingenieria/Departamentos"),
    //NBRVISPARAMS = {"opacity":1,"bands":["nd"],"gamma":1},
   var imageVisParam = {"opacity":1,"bands":["B11","B8","B4"],"min":0.12309608313892831,"max":0.19183285424404825,"gamma":1};
var coleccionLimites = ee.FeatureCollection("USDOS/LSIB/2017")
var filtropais = coleccionLimites.filter(ee.Filter.eq('COUNTRY_NA', 'Peru'))
var stylecolor = { 'palette' : [ '#808080']}
var bordeLimites = ee.Image().paint(filtropais,0, 2)
Map.centerObject(filtropais,6)
var panel = ui.Panel({style: {width:'20%'}});
ui.root.insert(0,panel);
// Header
// Define title and description.
var TITLE_STYLE = {
  fontWeight: 'bold',
  fontSize: '20px',
  textAlign: 'center',
  padding: '8px',
  color: 'white',
  //fontWeight: 'bold',
  backgroundColor:'Olivedrab',
};
var Header = ui.Label('Sistema de información sobre incendios para la gestión de recursos (FIRMS) 2018 ',TITLE_STYLE);
var resumen = ui.Label('La versión Earth Engine del conjunto de datos del Sistema de información sobre incendios para la gestión de recursos (FIRMS) contiene el producto de detección de incendios LANCE en formato rasterizado. LANCE procesa las ubicaciones de incendios activos casi en tiempo real (NRT) utilizando el producto estándar MODIS MOD14/MYD14 Fire and Thermal Anomalies.Los datos de anomalías térmicas/incendios activos de MODIS y VIIRS pueden provenir de incendios, humo caliente, agricultura u otras fuentes.',{fontSize: '12px'});
//var indicacion = ui.Label('Dar click en el mapa despues de cargar ',{fontSize: '12px'});
// Add title and description to the panel.
panel.add(Header).add(resumen);
// Add a label to the panel.
//inspector.add(ui.Label('Selecciona un Departamento en el mapa',{fontWeight: 'bold', fontSize: '14px'}));
//panel.add(inspector)
function maskS2clouds(image) {
  var qa = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask).divide(10000);
}
var dataset = ee.ImageCollection('COPERNICUS/S2')
                  .filterDate('2018-08-01', '2018-09-22')
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
                  .map(maskS2clouds).filterBounds(filtropais);
var rgbVis = {
  min: 0.0,
  max: 0.3,
  bands: ['B11', 'B8', 'B4'],
};
var AmazoniaComp = dataset.median();
//Map.centerObject(Amazonia,6);
//Map.addLayer(dataset.median(), rgbVis, 'RGB');
//Map.addLayer(Amazonia);
var clipped = AmazoniaComp.clip(filtropais);
Map.addLayer(clipped, imageVisParam, "Peru");
print(dataset);
//var NBR = clipped.normalizedDifference(['B8', 'B12']);
//Map.addLayer(NBR, NBRVISPARAMS, "NBR");
///
var dataset = ee.ImageCollection('FIRMS').filter(
    ee.Filter.date('2019-08-01', '2019-08-26'));
var fires = dataset.select('T21').map(function(image) {
      return image.clip(filtropais);
    });
var firesVis = {
  min: 300.0,
  max: 400.0,
  palette: ['red', 'orange', 'yellow'],
};
//Map.setCenter(-119.086, 47.295, 6);
Map.addLayer(fires, firesVis, 'Fires');
  Map.addLayer(bordeLimites , stylecolor, 'Peru')