var limite = ui.import && ui.import("limite", "table", {
      "id": "users/daprieto24/FFC/AOI_OCHOSUR"
    }) || ee.FeatureCollection("users/daprieto24/FFC/AOI_OCHOSUR"),
    imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "B4_mean",
          "B3_mean",
          "B2_mean"
        ],
        "min": 159,
        "max": 7347,
        "gamma": 1.4940000000000002
      }
    }) || {"opacity":1,"bands":["B4_mean","B3_mean","B2_mean"],"min":159,"max":7347,"gamma":1.4940000000000002},
    imageVisParam2 = ui.import && ui.import("imageVisParam2", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "B4_min",
          "B3_min",
          "B2_min"
        ],
        "min": 546,
        "max": 3242,
        "gamma": 1.3650000000000002
      }
    }) || {"opacity":1,"bands":["B4_min","B3_min","B2_min"],"min":546,"max":3242,"gamma":1.3650000000000002};
//Masking clouds
function maskS2clouds(image) {
var QA = image.select("QA60");
// Bits 10 and 11 are clouds and cirrus, respectively.
var cloudBitMask = 1 << 10;
var cirrusBitMask = 1 << 11;
//Both flgas should be set to zero, indicating clear conditions.
var mask = QA.bitwiseAnd(cloudBitMask).eq(0)
    .and(QA.bitwiseAnd(cirrusBitMask).eq(0));
return image.updateMask(mask).divide(10000);
}
// ENTRADA DE IMAGENES SENTINEL 2017
var geometry = limite;
var collection_17 = ee.ImageCollection("COPERNICUS/S2") // Carga el Collection de Sentinel 2.
  .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 20)) // ...Filtra el porcentaje de nubosidad
  .filterDate('2017-01-01' ,'2017-12-31') //... selecciona el rango de tiempo 
  .filterBounds(geometry) // Imagenes dentro de estos limites
  .sort("CLOUDY_PIXEL_PERCENTAGE")
  .limit(10)// ordena descendentemente basado en el porcentaje de nubosidad
var collection17_b = collection_17.reduce(ee.Reducer.min())  
/*Map.addLayer(collection17_b,imageVisParam,'Image_2017')*/
// ENTRADA DE IMAGENES SENTINEL 2018
var geometry = limite;
var collection_18 = ee.ImageCollection("COPERNICUS/S2") // Carga el Collection de Sentinel 2.
  .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 20)) // ...Filtra el porcentaje de nubosidad
  .filterDate('2018-01-01' ,'2018-12-31') //... selecciona el rango de tiempo 
  .filterBounds(geometry) // Imagenes dentro de estos limites
  .sort("CLOUDY_PIXEL_PERCENTAGE")
  .limit(15)// ordena descendentemente basado en el porcentaje de nubosidad
var collection18_b = collection_18.reduce(ee.Reducer.min())  
/*Map.addLayer(collection18_b,imageVisParam2,'Image_2018')*/
// ENTRADA DE IMAGENES SENTINEL 2019
var geometry = limite;
var collection_19 = ee.ImageCollection("COPERNICUS/S2_SR") // Carga el Collection de Sentinel 2.
  .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 20)) // ...Filtra el porcentaje de nubosidad
  .filterDate('2019-01-01' ,'2019-12-31') //... selecciona el rango de tiempo 
  .filterBounds(geometry) // Imagenes dentro de estos limites
  .sort("CLOUDY_PIXEL_PERCENTAGE")
  .limit(10)// ordena descendentemente basado en el porcentaje de nubosidad
var collection19_b = collection_19.reduce(ee.Reducer.min())  
/*Map.addLayer(collection19_b,imageVisParam,'Image_2019')*/
//ENTRADA DE IMAGENES SENTINEL 2020
var collection_20 = ee.ImageCollection("COPERNICUS/S2_SR") // Carga el Collection de Sentinel 2. REVISAR
  .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 20)) // ...Filtra el porcentaje de nubosidad
  .filterDate('2020-01-01' ,'2020-12-31') //... selecciona el rango de tiempo 
  .filterBounds(geometry) // Imagenes dentro de estos limites
  .sort("CLOUDY_PIXEL_PERCENTAGE")
  .limit(5)// ordena descendentemente basado en el porcentaje de nubosidad
var collection20_b = collection_20.reduce(ee.Reducer.min())  
/*Map.addLayer(collection20_b,imageVisParam,'Image_2020')*/
// CALCULO DEL NDVI
var NDVI_17 = collection17_b.normalizedDifference (['B8_min', 'B4_min']); //revisar
var NDVI_18 = collection18_b.normalizedDifference (['B8_min', 'B4_min']); //revisar
var NDVI_19 = collection19_b.normalizedDifference (['B8_min', 'B4_min']); //revisar
var NDVI_20 = collection20_b.normalizedDifference (['B8_min', 'B4_min']); //revisar
//Add Collection to NDVI calculate 2019 - 2020
var collection_19_20 = ee.ImageCollection("COPERNICUS/S2_SR") // Carga el Collection de Sentinel 2. REVISAR
  .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 10)) // ...Filtra el porcentaje de nubosidad
  .filterDate('2019-01-01' ,'2020-12-31') //... selecciona el rango de tiempo 
  .filterBounds(geometry); // Imagenes dentro de estos limites
var NDVIcollection_19_20 = collection_19_20.map(function(image) {
  return image.select().addBands(image.normalizedDifference(['B8', 'B4']));
});
//Add Collection to NDVI calculate 2018 - 2019
var collection_17_18 = ee.ImageCollection("COPERNICUS/S2") // Carga el Collection de Sentinel 2. REVISAR
  .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 10)) // ...Filtra el porcentaje de nubosidad
  .filterDate('2017-01-01' ,'2018-12-31') //... selecciona el rango de tiempo 
  .filterBounds(geometry); // Imagenes dentro de estos limites
var NDVIcollection_17_18 = collection_17_18.map(function(image) {
  return image.select().addBands(image.normalizedDifference(['B8', 'B4']));
});
var  medianpixels = collection_19.mean();
var data19 = collection_19.mean().divide(10000);
// Calculo del NDVI
// Function to calculate and add an NDVI band
var addNDVI19 = function(image) {
return image.addBands(image.normalizedDifference(['B8', 'B4']));
};
// Add NDVI band to image collection
var S2 = collection_19.map(addNDVI19);
var NDVI19 = S2.select(['nd']);
var NDVImed19 = NDVI19.median();
var ndvi19= medianpixels.select('B8').subtract(medianpixels.select('B4'))
            .divide(medianpixels.select('B8').add(medianpixels.select('B4')));
// CALCULO DEL NDVI 2020
var medianpixels_20 = collection_20.mean();
var data20 = collection_20.mean().divide(10000);
var addNDVI20 = function(image) {
return image.addBands(image.normalizedDifference(['B8', 'B4']));
};
// Add NDVI band to image collection
var S3 = collection_20.map(addNDVI20);
var NDVI20 = S3.select(['nd']);
var NDVImed20 = NDVI20.median();
var ndvi20= medianpixels_20.select('B8').subtract(medianpixels_20.select('B4'))
            .divide(medianpixels_20.select('B8').add(medianpixels_20.select('B4')));
// Parametros de Visualización
// RGB
var visualization = {
  bands: ['B6', 'B4', 'B3'],
  min: 0,
  max: 0.5,
  gamma: [0.95, 1.1, 1]
};
// Centra el Mapa
Map.centerObject(geometry,12);
/*
// Corte y Parametros visuales del NDVI
var ndvi19visclip = ndvi19.clip(geometry);
var ndvi20visclip = ndvi20.clip(geometry);
*/
//Add visualization parameters for NDVI
var ndviParams = {
  min: 0, 
  max: 1, 
  palette: [ 'FFFFFF', 'CE7E45', 'FCD163', '66A000', '207401',
  '056201', '004C00', '023B01', '012E01', '011301']
};
//Add visualization parameters for NDVI
var ndviParams17_18 = {
  min: 0.05, 
  max: 0.86, 
  palette: [ 'FFFFFF', 'CE7E45', 'FCD163', '66A000', '207401',
  '056201', '004C00', '023B01', '012E01', '011301']
};
/*
//Export images
//NDVI 2017 - 2020
  Export.image.toDrive({
    image: NDVI_17, //Nombre de la imagen a exportar
    description: 'NDVI_2017', //Nombre de archivo de salida a exportar en Google Drive
    folder:"Imagenes_GEE",
    region: limite,
    scale: 10,
    maxPixels:1e13,
  });
*/
/*
Map.addLayer(NDVI_17, ndviParams, 'NDVI 2017');
Map.addLayer(NDVI_18, ndviParams, 'NDVI 2018');
Map.addLayer(NDVI_19, ndviParams, 'NDVI 2019');
Map.addLayer(NDVI_20, ndviParams, 'NDVI 2020');
*/
// ////Add more indexes ////
// Coleccion Sentinel 2 nivel 2
var ColeccionSentinel = ee.ImageCollection("COPERNICUS/S2_SR")
  .filterDate ('2020-08-25' ,'2020-08-30')
  .filterBounds (geometry)
  .filterMetadata ('CLOUDY_PIXEL_PERCENTAGE', 'Less_Than', 10)
  .sort('CLOUDY_PIXEL_PERCENTAGE')
  .limit(5)
var Vegetacion = ee.Image(ColeccionSentinel.mean());
// EVI (Enhanced Vegetation Index)
var EVI = Vegetacion.expression ('float (2.5 * ((NIR - RED) / (NIR + 6 * RED - 7.5 * BLUE + 1)))', {
    'NIR': Vegetacion.select ('B8'),  
    'RED': Vegetacion.select ('B4'),
    'BLUE': Vegetacion.select ('B2')});
// GLI (Green Leaf Index)
var GLI = Vegetacion.expression ('float (((GREEN - RED) + (GREEN - BLUE)) / ((2 * GREEN) + RED + BLUE))', {
    'GREEN': Vegetacion.select ('B3'),  
    'RED': Vegetacion.select ('B4'),
    'BLUE': Vegetacion.select ('B2')});
// SAVI (Soil Adjusted Vegetation Index)
var SAVI = Vegetacion.expression ('float (((NIR - RED) / (NIR + RED + L))* (1+L))',{
    'L': 0.5, // Cobertura vegetacion 0-1
    'NIR': Vegetacion.select ('B8'),
    'RED': Vegetacion.select ('B4')});
// GCI (Green Chlorophyll Index)
var GCI = Vegetacion.expression ('float (((NIR) / (GREEN)) - 1)', {
    'NIR': Vegetacion.select ('B8'),  
    'GREEN': Vegetacion.select ('B3')});
// RGR (Red Green Ratio)
var RGR = Vegetacion.expression ('float ((RED) / (GREEN))', {
    'RED': Vegetacion.select ('B4'),  
    'GREEN': Vegetacion.select ('B3')});
// SIPI (Structure Insensitive Pigment Index)
var SIPI = Vegetacion.expression ('float ((NIR - BLUE) / (NIR - RED))',{
    'NIR': Vegetacion.select ('B8'),
    'BLUE': Vegetacion.select ('B2'), 
    'RED': Vegetacion.select ('B4')});
// ARVI (Atmospherically Resistant Vegetation Index)
var ARVI = Vegetacion.expression ('float ((NIR - (2 * RED) + BLUE) / (NIR + (2 * RED) + BLUE))',{
    'NIR': Vegetacion.select ('B8'),
    'BLUE': Vegetacion.select ('B2'), 
    'RED': Vegetacion.select ('B4')});
// NBRI (Normalized Burned Ratio Index)
var NBRI = Vegetacion.expression ('float (NIR - SWIR) / float (NIR + SWIR)', {
    'NIR': Vegetacion.select ('B8'),  
    'SWIR': Vegetacion.select ('B12')});
// Simbologia comun para los indices
var Simbologia = {max: 1, min: 0, // IMPORTANTE variar rangos en funcion del indice
    palette: ['#0000ff', 'DF923D', 'F1B555',
    'FCD163', '99B718', '74A901', '66A000', '529400', '3E8601', '207401',
    '056201', '004C00', '023B01', '012E01', '011D01', '011301']};
var Simbologia2 = {max: 2, min: 0,   
    palette: ['#0000ff', 'DF923D', 'F1B555',
    'FCD163', '99B718', '74A901', '66A000', '529400', '3E8601', '207401',
    '056201', '004C00', '023B01', '012E01', '011D01', '011301']};
var SimbologiaGCI = {max: 10, min: 0,   
    palette: ['#0000ff', 'DF923D', 'F1B555',
    'FCD163', '99B718', '74A901', '66A000', '529400', '3E8601', '207401',
    '056201', '004C00', '023B01', '012E01', '011D01', '011301']};
var SimbologiaEVI = {max: 2, min: -1,   
    palette: ['#0000ff', 'DF923D', 'F1B555',
    'FCD163', '99B718', '74A901', '66A000', '529400', '3E8601', '207401',
    '056201', '004C00', '023B01', '012E01', '011D01', '011301']};    
/*    
// Representacion de indices de vegetacion
Map.addLayer (NBRI, Simbologia, 'NBR',0);
Map.addLayer (GCI, SimbologiaGCI, 'GCI',1); //Arreglar paleta
Map.addLayer (RGR, Simbologia, 'RGR',0);
Map.addLayer (GLI, Simbologia, 'GLI',0); 
Map.addLayer (SAVI, Simbologia, 'SAVI',0);
Map.addLayer (SIPI, Simbologia2, 'SIPI',0); // ARREGLAR PALETA
Map.addLayer (EVI, SimbologiaEVI, 'EVI',0); // Arreglar paleta
Map.addLayer (ARVI, Simbologia, 'ARVI',0);
Map.addLayer (Vegetacion, {max: 4000.0, min: 0.0, gamma: 1.0, bands: ['B4','B3','B2']}, 'RGB color natural',0);
*/
//Set up a satellite background
Map.setOptions('Satellite')
//Create variables to panel
var ndvi2017_topanel = ui.Map.Layer(NDVI_17.clip(geometry),ndviParams,'NDVI-2017',true);
var ndvi2018_topanel = ui.Map.Layer(NDVI_18.clip(geometry),ndviParams,'NDVI-2018',false);
var ndvi2019_topanel = ui.Map.Layer(NDVI_19.clip(geometry),ndviParams,'NDVI-2019',false);
var ndvi2020_topanel = ui.Map.Layer(NDVI_20.clip(geometry),ndviParams,'NDVI-2020',false);
var NBRI_topanel = ui.Map.Layer(NBRI.clip(geometry),Simbologia,'NBR',false);
var GCI_topanel = ui.Map.Layer(GCI.clip(geometry),SimbologiaGCI,'GCI',false);
var RGR_topanel = ui.Map.Layer(RGR.clip(geometry),Simbologia,'RGR',false);
var GLI_topanel = ui.Map.Layer(GLI.clip(geometry),Simbologia,'GLI',false);
var SAVI_topanel = ui.Map.Layer(SAVI.clip(geometry),Simbologia,'SAVI',false);
var SIPI_topanel = ui.Map.Layer(SIPI.clip(geometry),Simbologia2,'SIPI',false);
var EVI_topanel = ui.Map.Layer(EVI.clip(geometry),SimbologiaEVI,'EVI',false);
var ARVI_topanel = ui.Map.Layer(ARVI.clip(geometry),Simbologia,'ARVI',false);
//// add layer to map
Map.add(ndvi2017_topanel);
Map.add(ndvi2018_topanel);
Map.add(ndvi2019_topanel);
Map.add(ndvi2020_topanel);
Map.add(NBRI_topanel);
Map.add(GCI_topanel);
Map.add(RGR_topanel);
Map.add(GLI_topanel);
Map.add(SAVI_topanel);
Map.add(SIPI_topanel);
Map.add(EVI_topanel);
Map.add(ARVI_topanel);
/*--------------------------------------------------------------------------------------------------
                                        SE CREA LA INTERFAZ 
---------------------------------------------------------------------------------------------------*/
// Create a panel to hold our widgets.
var panel = ui.Panel();
panel.style().set('width', '400px');
panel.style().set('background-color', 'white');
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label('Vegetation indexes app',{stretch: 'horizontal',
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: '30px',
  padding: '10px',
  color: 'darkgreen'
  }
  ),
  ui.Label('This tool shows NDVI behaviour through years 2017 - 2020, you can click on the area of the project to see the chart. Also you can display more vegetation indexes to the 2020',{
    textAlign: 'center',
    fontSize: '16px',
    color: 'black'}),
  ui.Label({
  value: '____________________________________________________________',
  style: {fontWeight: 'bold', color: 'darkgreen'},
  }),
  ui.Label('Select NDVI to display.',{stretch: 'horizontal',
   textAlign: 'center',
   fontWeight: 'bold',
   fontSize: '15px',
   color:'black'
  })  
]);
panel.add(intro);
//Add widgets to checkboxes
var extCheck = ui.Checkbox('2017').setValue(true); //Review
var extCheck2 = ui.Checkbox('2018').setValue(false);
var extCheck3 = ui.Checkbox('2019').setValue(false); 
var extCheck4 = ui.Checkbox('2020').setValue(false);
//Add legend to map
var legend = ui.Panel({
style: {
position: 'bottom-center',
padding: '8px 15px'
}
});
// Create legend title
var legendTitle = ui.Label('NDVI values',{stretch: 'horizontal',
  textAlign: 'center',
  fontSize: '14px'
});
// Add the title to the panel
legend.add(legendTitle);
// create the legend image
var lon = ee.Image.pixelLonLat().select('longitude');
var gradient = lon.multiply((ndviParams.max-ndviParams.min)/100.0).add(ndviParams.min);
var legendImage = gradient.visualize(ndviParams);
// create text on top of legend
var panel2 = ui.Panel({
widgets: [
 ui.Label('0'),
 ui.Label({style: {stretch: 'horizontal'}}), 
      ui.Label('1')
],
layout: ui.Panel.Layout.flow('horizontal'),
style: {stretch: 'horizontal', maxWidth: '360px', padding: '0px 0px 0px 8px'}
});
legend.add(panel2);
// create thumbnail from the image
var thumbnail = ui.Thumbnail({
image: legendImage,
params: {bbox:'0,0,100,180', dimensions:'360x10'},
style: {padding: '1px', position: 'bottom-center'}
});
// add the thumbnail to the legend
legend.add(thumbnail);
//Add widgets to app
panel.add(extCheck)
     .add(extCheck2)
     .add(extCheck3)
     .add(extCheck4)
     .add(legend);
//Function to checkboxes
//2017
var doCheckbox = function(){
  extCheck.onChange(function(checked){
  ndvi2017_topanel.setShown(checked)
  }
  )}
  doCheckbox();
//2018
var doCheckbox2 = function(){
  extCheck2.onChange(function(checked){
  ndvi2018_topanel.setShown(checked)} 
  )}
  doCheckbox2();
//2019
var doCheckbox3 = function(){
  extCheck3.onChange(function(checked){
  ndvi2019_topanel.setShown(checked)
  }
  )}
  doCheckbox3();
//2020
var doCheckbox4 = function(){
  extCheck4.onChange(function(checked){
  ndvi2020_topanel.setShown(checked)
  }
  )}
  doCheckbox4();
// variables 2019 
var start19 = ee.Image(collection_19.first()).date().get('year').format();
var now = Date.now();
var end = ee.Date(now).format();
// variables 2020 
var start20 = ee.Image(collection_20.first()).date().get('year').format();
var now20 = Date.now();
var end20 = ee.Date(now).format();
/*
// Run this function on a change of the dateSlider.
// Asynchronously compute the date range and show the slider.
var dateRange1 = ee.DateRange(start, end).evaluate(function(range) {
  var inicial  = ui.Label({
    value: 'Fecha de Inicio',
    style: {fontSize: '15px', fontWeight: 'bold', textAlign:'center'}
  })
  panel.add(inicial);
  var dateSlider = ui.DateSlider({
    start: range['dates'][0],
    end: range['dates'][1],
    value: null,
    period: 1,
    style: {width : '90%'}
  });
  panel.add(dateSlider.setValue(now));
  var final  = ui.Label({
      value: 'Fecha de final',
      style: {fontSize: '15px', fontWeight: 'bold', textAlign:'center'}
  });
  panel.add(final)
  var dateSliderEnd = ui.DateSlider({
    start: range['dates'][0],
    end: range['dates'][1],
    value: null,
    period: 1,
    style: {width : '90%'}
  });
  panel.add(dateSliderEnd.setValue(now));
});
var update = ui.Panel([ui.Button('Aplicar Nuevas Fechas', update_date())]);
panel.add(update);
function update_date(){
  print('Hola')
}
*/
// panels to hold lon/lat values
var lon = ui.Label();
var lat = ui.Label();
panel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
// Register a callback on the default map to be invoked when the map is clicked.
// Register a callback on the default map to be invoked when the map is clicked
Map.onClick(function(coords) {
  // Update the lon/lat panel with values from the click event.
  lon.setValue('longitude: ' + coords.lon.toFixed(2)),
  lat.setValue('latitude: ' + coords.lat.toFixed(2));
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  graphs(point);
});
/*-------------------------------------------------------------------------------------------------
                 CONSTRUCCIÓN DE LAS GRÁFICAS A VISUALIZAR
---------------------------------------------------------------------------------------------------*/
function graphs(point,key){
  print(point)
  print(key)
  // Create an NDVI chart 2020.
  var ndvi20Chart = ui.Chart.image.series(NDVIcollection_17_18, point, ee.Reducer.mean(), 500); 
  ndvi20Chart.setOptions({
    title: 'NDVI 2017 - 2018',
    vAxis: {title: 'NDVI', maxValue: 1},
    hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}},
  });
  resultsPanel2.clear().add(ndvi20Chart).add(buttonPanel2);
  // Create an NDVI chart 2019.
  var ndvi19Chart = ui.Chart.image.series(NDVIcollection_19_20, point, ee.Reducer.mean(), 500);
  ndvi19Chart.setOptions({
    title: 'NDVI 2020 - 2019',
    vAxis: {title: 'NDVI', maxValue: 1},
    hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}},
  });
   resultsPanel.clear().add(ndvi19Chart).add(buttonPanel);
  }
Map.style().set('cursor', 'crosshair');
// Clears the set of selected points and resets the overlay and results
// panel to their default state.
function clearResults1() {
  var selectedPoints = [];
  Map.layers().remove(Map.layers().get(14));
  var instructionsLabel = ui.Label(' ');
  resultsPanel2.widgets().reset([instructionsLabel]);
}
function clearResults() {
  var selectedPoints = [];
  Map.layers().remove(Map.layers().get(14));
  var instructionsLabel = ui.Label('Select a point to inspect NDVI',{stretch: 'horizontal',
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: '15px',
  color: 'black'
  }); // 
  resultsPanel.widgets().reset([instructionsLabel]);
}
// A panel containing the two buttons .
var buttonPanel = ui.Panel(
    [ui.Button('Clean', clearResults)], //REVISAR
    ui.Panel.Layout.Flow('horizontal'), {margin: '0 0 0 auto', width: '400px'});
var buttonPanel2 = ui.Panel(
    [ui.Button('Clean', clearResults1)], //REVISAR
    ui.Panel.Layout.Flow('horizontal'), {margin: '0 0 0 auto', width: '400px'});
var resultsPanel = ui.Panel({style: {position: 'bottom-left'}}); //REVISAR
var resultsPanel2 = ui.Panel({style: {position: 'bottom-right'}}); //REVISAR
/*
Map.add(resultsPanel);
Map.add(resultsPanel2);
*/
panel.add(resultsPanel)
panel.add(resultsPanel2)
clearResults()
clearResults1()
// Add the panel to the ui.root.
ui.root.insert(0,panel);
// Add more text to panel
var text2 = ui.Label('Select more indexes to display.',{stretch: 'horizontal',
   textAlign: 'center',
   fontWeight: 'bold',
   fontSize: '15px',
   color:'black'
  });
panel.add(text2);
//Add widgets to checkboxes
var extCheck5 = ui.Checkbox('NBR').setValue(false); //Review
var extCheck6 = ui.Checkbox('GCI').setValue(false);
var extCheck7 = ui.Checkbox('RGR').setValue(false); 
var extCheck8 = ui.Checkbox('GLI').setValue(false);
var extCheck9 = ui.Checkbox('SAVI').setValue(false);
var extCheck10 = ui.Checkbox('SIPI').setValue(false);
var extCheck11 = ui.Checkbox('EVI').setValue(false);
var extCheck12 = ui.Checkbox('ARVI').setValue(false);
//Add widgets to app
panel.add(extCheck5)
     .add(extCheck6)
     .add(extCheck7)
     .add(extCheck8)
     .add(extCheck9)
     .add(extCheck10)
     .add(extCheck11)
     .add(extCheck12);
// Add function to checkboxes
//NBR
var doCheckbox5 = function(){
  extCheck5.onChange(function(checked){
  NBRI_topanel.setShown(checked)} 
  )}
  doCheckbox5();
//GCI
var doCheckbox6 = function(){
  extCheck6.onChange(function(checked){
  GCI_topanel.setShown(checked)} 
  )}
  doCheckbox6();
//RGR
var doCheckbox7 = function(){
  extCheck7.onChange(function(checked){
  RGR_topanel.setShown(checked)} 
  )}
  doCheckbox7();
//GLI
var doCheckbox8 = function(){
  extCheck8.onChange(function(checked){
  GLI_topanel.setShown(checked)} 
  )}
  doCheckbox8();
//SAVI
var doCheckbox9 = function(){
  extCheck9.onChange(function(checked){
  SAVI_topanel.setShown(checked)} 
  )}
  doCheckbox9();
//SIPI
var doCheckbox10 = function(){
  extCheck10.onChange(function(checked){
  SIPI_topanel.setShown(checked)} 
  )}
  doCheckbox10();
//EVI
var doCheckbox11 = function(){
  extCheck11.onChange(function(checked){
  EVI_topanel.setShown(checked)} 
  )}
  doCheckbox11();
//ARVI
var doCheckbox12 = function(){
  extCheck12.onChange(function(checked){
  ARVI_topanel.setShown(checked)} 
  )}
  doCheckbox12();