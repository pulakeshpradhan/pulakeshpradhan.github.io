var afgRF = ee.FeatureCollection("users/cyberiba/Afg_RF"),
    afl2 = ee.FeatureCollection("users/cyberiba/Afghanistan_Level2");
//------------------------------------------
// Author: Iban Ameztoy, 07/09/2018 
// Illicit Crop Explorer - V0.4.1 -
// Visor NDVI con Sentinel 2 + Código de harmonic fitting adaptado
// 
//BONUS: Experimental S1 y Precipitación acumulada
//
//------------------------------------------
//·········································
//Variables de entrada
//·········································
var sgmt = ['Jawz1']; //Columna para identificar el segmento
var start = '2017-01-01'; //Fecha inicial para Sentinel 2
var end = '2018-08-31'; // Fecha final para Sentinel 2
var bandsS2 =  ['B8', 'B3', 'B2']; //Combinación de bandas para Sentinel 2
//Set region list
var wR = ["Badghis", "Farah", "Ghor", "Hirat", "Nimroz"];
var sR = ["Daykundi", "Hilmand", "Kandahar", "Uruzgan", "Zabul"];
var cR = ["Ghazni", "Kabul", "Logar"];
var eR = ["Kapisa", "Kunar", "Laghman", "Nangarhar", "Nuristan"];
var neR = ["Badakhshan", "Kunduz", "Takhar"];
var nR = ["Baghlan", "Balkh", "Faryab", "Jawzjan", "Samangan", "Sari Pul"]
// NOTA: El shape original con los segmentos hay que subirlo como tabla a "Assets".
// Assets -> New -> Table upload -> Seleccionar fichero y carpeta. 
// Una vez el fichero esta en el servidor, podremos importar la tabla y hace la query (véase ejemplo de "table")
//var select_S2 = "COPERNICUS/S2/20170429T173911_20170429T174752_T13RBK"; //Imagen sentinel - ID disponibles en print
var buffer = 10; // Buffer en metros para el cálculo de la gráfica
var table = ee.FeatureCollection("users/cyberiba/Afgh_sample_location_2018");
    //srtm = ee.Image("USGS/SRTMGL1_003");
   // geometry0 = /* color: #2fd624 */ee.Geometry.MultiPoint()
//
//···········FIN VARIABLES DE ENTRADA···············
var sgmt_select = table.filter(ee.Filter.inList('Block_ref', sgmt));
var sgmtCentr = sgmt_select.geometry().centroid();
var sgmtCentrBuffer = sgmtCentr.buffer(buffer); 
//var geometry = geometry0.buffer(buffer); //Es el punto móvil que se una para calcular las gráficas - Color verde
var wRb = afl2.filter(ee.Filter.inList('NAME_1', wR));
var sRb = afl2.filter(ee.Filter.inList('NAME_1', sR));
var cRb = afl2.filter(ee.Filter.inList('NAME_1', cR));
var eRb = afl2.filter(ee.Filter.inList('NAME_1', eR));
var neRb = afl2.filter(ee.Filter.inList('NAME_1', neR));
var nRb = afl2.filter(ee.Filter.inList('NAME_1', nR));
//·········································
//
// Configuración del Harmonic fitting y otras funciones
//
//·········································
var AMPLITUDE_THRESHOLD = 0.060;
var AMPLITUDE_MULTIPLIER = 5; //default 5
var phase_palette = [
  'cc6666',  // moderate red - peak beginning of Oct
  'cc9966',  // moderate orange - peak beginning of Sep
  'cccc66',  // moderate yellow - peak beginning of Aug
  '99cc66',  // moderate green - peak beginning of July
  '66cc66',  // moderate lime green - peak beginning of June
  '66cc99',  // moderate cyan - lime green - peak beginning of May
  '66cccc',  // moderate cyan - peak beginning of Apr
  '6699cc',  // moderate blue - peak beginning of Mar
  '6666cc',  // moderate blue/violet - peak beginning of Feb
  '9966cc',  // moderate violet - peak beginning of Jan
  'cc66cc',  // moderate magenta - peak beginning of Dec
  'cc6699',  // moderate pink - peak beginning of Nov
  'cc6666',  // moderate red - peak beginning of Oct
];
// Filter out clouds for an image. Sentinel 2 - FUNCIONES
function maskOutClouds(img) {
  var mask = ee.Image(0).where(img.select('QA60').gte(1024), 1).not();
  return img.updateMask(mask);
}
function addNDVI(img) {
  return img.addBands(img.normalizedDifference(['B8', 'B4']).select([0],['NDVI']));
}
function createLinearModelInputs(img) {
  var tstamp = ee.Date(img.get('system:time_start'));
  var tdelta = tstamp.difference(start, 'year');
  var img_fitting = img.select()
    .addBands(1)
    .addBands(tdelta.multiply(2*Math.PI).sin())
    .addBands(tdelta.multiply(2*Math.PI).cos())
    .addBands(img.select('NDVI'))
    .toDouble();
  return img_fitting;
}
function predictNDVI(img) {
  var tstamp = ee.Date(img.get('system:time_start'));
  var tdelta = tstamp.difference(start, 'year');
  // predicted NDVI = c0 + c1*sin(2*pi*t) + c2*cos(2*pi*t)
  var predicted = ee.Image(meanCoeff)
    .add(sinCoeff.multiply(tdelta.multiply(2*Math.PI).sin()))
    .add(cosCoeff.multiply(tdelta.multiply(2*Math.PI).cos()));
  return img.select('NDVI').addBands(predicted.select([0], ['fitted']));
}
//·········································
//
// Selección imágenes Sentinel-2
//
//·········································
var imgs2 = ee.ImageCollection('COPERNICUS/S2').filterDate(start, end).filterBounds(sgmtCentrBuffer);
var imgs = ee.ImageCollection('COPERNICUS/S2').filterDate(start, end)
    .map(maskOutClouds)
    .map(addNDVI);
var imgs = imgs.map(maskOutClouds).map(addNDVI);
var design = imgs.map(createLinearModelInputs);
// Fit a model and extract out the components.
var coeffs = design.reduce(ee.Reducer.linearRegression(3, 1)).select('coefficients');
var meanCoeff = coeffs.arrayGet([0,0]);
var sinCoeff = coeffs.arrayGet([1,0]);
var cosCoeff = coeffs.arrayGet([2,0]);
var phase = sinCoeff.atan2(cosCoeff);
var amplitude = sinCoeff.hypot(cosCoeff);
var fitted = imgs.map(predictNDVI);
//·········································
//
// Visualización
//
//·········································
var rgbVis = {
  min: 0,
  max: 2500,
  bands: bandsS2
};
var empty = ee.Image().byte();
var outline = empty.paint({
  featureCollection: sgmt_select,
  color: 1,
  width: 3
});
var peakpal = ['cc6666','cc9966', 'cccc66', '99cc66', 
  '66cc66',  '66cc99', '66cccc','6699cc', '6666cc', 
  '9966cc', 'cc66cc','cc6699','cc6666'];
/*
var hillshade = ee.Terrain.hillshade(srtm, 315, 45);
Map.addLayer(hillshade.clip(sgmt_select), {}, 'Hillshade', false);
Map.addLayer(meanCoeff, {min:0, max:0.7}, 'NDVI fit - mean', false);
Map.addLayer(amplitude, {min:0, max:0.5}, 'NDVI fit - amplitude', false);
Map.addLayer(
  phase.mask(amplitude.subtract(AMPLITUDE_THRESHOLD).multiply(AMPLITUDE_MULTIPLIER)),
  {min:-Math.PI, max:Math.PI, palette:phase_palette},
  'NDVI fit - phase', false);
//var imageselect = ee.Image(select_S2);
//Map.addLayer(srtm.clip(sgmt_select), {min: 500, max: 2500}, "srtm", false);
//Map.addLayer(imageselect.clip(sgmt_select), rgbVis, "S2 select date", true);
//Map.addLayer(table, {color: '0000FF'}, "Segmentos", false);
//Map.addLayer(sgmtCentrBuffer, {color: '0000FF'}, "Segmentos Centro Buffer", false);
Map.addLayer(geometry, {palette: '000000'}, 'Geometry buffer');
*/
// 2 opciones para centrar el mapa: 1) según variable sgmt_select o 2) coordenadas
Map.centerObject(sgmt_select, 12);
//Map.setCenter(-96.100314, 16.1664, 17);
//·········································
//
// UI - Panels
//
//·········································
// Create a panel to hold our widgets.
var panel = ui.Panel();
panel.style().set('width', '250px');
var panel2 = ui.Panel();
panel2.style().set('width', '400px');
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'Illicit Crop Explorer',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
  ui.Label({
    value: '1) Set variables:',
    style: {fontSize: '14px', fontWeight: 'bold'}
  }),
  ui.Label("Lines 14-17:"),
  ui.Label("sgmt, start, end, bandsS2"),
  ui.Label({
    value: '2) Choose Sentinel-2 image:',
    style: {fontSize: '14px', fontWeight: 'bold'}
  }),
]);
panel.add(intro);
// Create an intro panel with labels.
var intro2 = ui.Panel([
  ui.Label({
    value: "Time series viewer",
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
  ui.Label({
    value: '3) Pick pixel of interest',
    style: {fontSize: '14px', fontWeight: 'bold'}
  }),
  ui.Label({
    value: 'NDVI, S1 Backscatter, Cumulated Precipitation',
    style: {fontSize: '14px'}
  }),
]);
panel2.add(intro2);
// panels to hold lon/lat values
var lon = ui.Label();
var lat = ui.Label();
panel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
Map.style().set('cursor', 'crosshair');
ui.root.insert(0, panel2);
ui.root.insert(0, panel);
// Display the image with the given ID.
var display = function(id) {
  var image = imgs2.filter(ee.Filter.eq("system:index", id));
  var peakpal = ['cc6666','cc9966', 'cccc66', '99cc66', 
  '66cc66',  '66cc99', '66cccc','6699cc', '6666cc', 
  '9966cc', 'cc66cc','cc6699','cc6666'];
  Map.layers().reset();
  Map.addLayer(image, rgbVis, "Selected Image", true),
  Map.addLayer(rainfall2015, {'min': 0, 'max': 800, 'palette':"CCFFCC,00CC66,006600"}, 'Rainfall 2015', false);
  Map.addLayer(rainfall2016, {'min': 0, 'max': 800, 'palette':"CCFFCC,00CC66,006600"}, 'Rainfall 2016', false);
  Map.addLayer(rainfall2017, {'min': 0, 'max': 800, 'palette':"CCFFCC,00CC66,006600"}, 'Rainfall 2017', false);
  Map.addLayer(rainfall2018, {'min': 0, 'max': 800, 'palette':"CCFFCC,00CC66,006600"}, 'Rainfall 2018', false);
  Map.addLayer(sub, {'min': -200, 'max': 200, 'palette': peakpal}, 'Difference 2018-2017', false),
  Map.addLayer(afgRF, {}, 'Rainfed crops', false);
  Map.addLayer(table, {color: "FF0000"}, 'Segments 2018', true);
  Map.addLayer(outline, {palette: 'FFFF00'}, 'Segment selected', true),
  Map.centerObject(sgmt_select, 9);
};
// Get the list of IDs and put them into a select
imgs2.aggregate_array("system:index").evaluate(function(ids) {
  panel.add(ui.Select({
    items: ids,
    onChange: display
  }));
});
//print(imgs2)
/***
 * Multiteporal speckle filter: image is the original image, images is the temporal collection of images
 * 
 * Version: 1.0
 * 
 * by Genadii Donchyts https://groups.google.com/d/msg/google-earth-engine-developers/umGlt5qIN1I/jQ4Scd_pAAAJ
 */
function multitemporalDespeckle(images, radius, units, opt_timeWindow) {
  var timeWindow = opt_timeWindow || { before: -3, after: 3, units: 'month' };
  var bandNames = ee.Image(images.first()).bandNames();
  var bandNamesMean = bandNames.map(function(b) { return ee.String(b).cat('_mean') });
  var bandNamesRatio = bandNames.map(function(b) { return ee.String(b).cat('_ratio') });
  // compute space-average for all images
  var meanSpace = images.map(function(i) {
    var reducer = ee.Reducer.mean();
    var kernel = ee.Kernel.square(radius, units);
    var mean = i.reduceNeighborhood(reducer, kernel).rename(bandNamesMean);
    var ratio = i.divide(mean).rename(bandNamesRatio);
    return i.addBands(mean).addBands(ratio);
  });
  /***
  * computes a multi-temporal despeckle function for a single image
  */
  function multitemporalDespeckleSingle(image) {
    var t = image.date();
    var from = t.advance(ee.Number(timeWindow.before), timeWindow.units);
    var to = t.advance(ee.Number(timeWindow.after), timeWindow.units);
    var meanSpace2 = ee.ImageCollection(meanSpace).select(bandNamesRatio).filterDate(from, to)
      .filter(ee.Filter.eq('relativeOrbitNumber_start', image.get('relativeOrbitNumber_start'))); // use only images from the same cycle
    var b = image.select(bandNamesMean);
    return b.multiply(meanSpace2.sum()).divide(meanSpace2.count()).rename(bandNames)
      .copyProperties(image, ['system:time_start']);
  }
  return meanSpace.map(multitemporalDespeckleSingle).select(bandNames);
}
//APPLY ON S1 COLLECTION ////
var s1 = ee.ImageCollection('COPERNICUS/S1_GRD')
  .filterBounds(sgmtCentrBuffer)
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
  .filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'))
  .filter(ee.Filter.eq('instrumentMode', 'IW'))
  .filterDate(start, end);
  // .map(maskLowEntropy);
print(s1.first());
var s1vv = s1.select(0);
var s1vh = s1.select(1);
// denoise images
var radius = 2 ; //IAA: Default value was 7, changed to 2 due to small parcels
var units = 'pixels';
var s1Denoised_vv = multitemporalDespeckle(s1vv, radius, units, { before: -3, after: 3, units: 'month' }) ;
print(s1Denoised_vv);
var chirps = ee.ImageCollection("UCSB-CHG/CHIRPS/DAILY").filterDate(start, end);
chirps = chirps.sort('system:time_start');
var countries = ee.FeatureCollection('ft:1tdSwUL7MVpOauSgRzqVTOwdfy17KDbw-1d9omPw');
var country_names = ['Afghanistan']; 
var myCountry = countries.filter(ee.Filter.inList('Country', country_names));
var aoi = myCountry.geometry();
var chirpsAnom = ee.ImageCollection("UCSB-CHG/CHIRPS/DAILY");
var chirps2018 = chirpsAnom.filterDate('2018-01-01', "2018-05-30");
var chirps2017 = chirpsAnom.filterDate('2017-01-01', '2017-05-30');
var chirps2016 = chirpsAnom.filterDate('2016-01-01', '2016-05-30');
var chirps2015 = chirpsAnom.filterDate('2015-01-01', '2015-05-30');
//Calculate the Sum of Precipitation Values:
var rainfall2015 = chirps2015.sum().clip(aoi);
var rainfall2016 = chirps2016.sum().clip(aoi);
var rainfall2017 = chirps2017.sum().clip(aoi);
var rainfall2018 = chirps2018.sum().clip(aoi);
var sub = rainfall2018.subtract(rainfall2017);
var plist = [rainfall2016, rainfall2017, rainfall2018, sub];
var precipBands = rainfall2015.addBands(plist);
print(precipBands)
Map.onClick(function(coords) {
  // Update the lon/lat panel with values from the click event.
  lon.setValue('lon: ' + coords.lon.toFixed(2)),
  lat.setValue('lat: ' + coords.lat.toFixed(2));
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  //Chart.
  var ndviChart = ui.Chart.image.series(fitted.select(['fitted', 'NDVI']), point, ee.Reducer.mean(), 10);
  ndviChart.setOptions({
    title: 'Temporal profile Sentinel-2 NDVI at selected point + fitted values',
    series: {
        0: {color: '0000FF'},
        1: {color: 'FF0000'}
      },
      lineWidth: 1,
      pointSize: 3,      
  });
var s1Chart = ui.Chart.image.seriesByRegion(
    s1Denoised_vv, point, ee.Reducer.median(), 'VV', 20, 'system:time_start')
    .setChartType('ScatterChart')
    .setOptions({
      title: 'Temporal profile Sentinel-1 vv at selected point',
      trendlines: {0: {
        color: 'CC0000'
      }},
      lineWidth: 1, pointSize: 3,
    });
 var times = chirps.aggregate_array('system:time_start');
var values = ee.List(chirps.toList(chirps.size()).iterate(function(i, c) {
  i = ee.Image(i);
  var p = i.reduceRegion(ee.Reducer.mean(), point, 5000).values().get(0);
  var c = ee.List(c);
  return c.add(ee.Number(c.get(-1)).add(p));
}, ee.List([0]))).slice(1);
  var precip = ui.Chart.array.values(values, 0, times).setOptions({
    title: 'Cumulated Precipitation at selected point (mm)',
    pointSize:1, lineWidth: 1});
  panel2.widgets().set(1, ndviChart);
  panel2.widgets().set(2, s1Chart);
  panel2.widgets().set(3, precip);
});
var panel3 = ui.Panel();
panel3.style().set({
  width: '400px',
  position: 'bottom-right'
});
Map.add(panel3);
Map.onClick(function(coords) {
  panel3.clear();
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  Map.layers().set(1, ui.Map.Layer(point, {color: '000000'}, "Selected point for graph"));
  var precipchart = ui.Chart.image.regions(precipBands, point, null, 5000);
  precipchart.setOptions({title: 'Band values'})
             .setChartType("BarChart");
  panel3.add(precipchart);
});
Map.addLayer(rainfall2015, {'min': 0, 'max': 800, 'palette':"CCFFCC,00CC66,006600"}, 'rainfall 2015', false);
Map.addLayer(rainfall2016, {'min': 0, 'max': 800, 'palette':"CCFFCC,00CC66,006600"}, 'rainfall 2016', false);
Map.addLayer(rainfall2017, {'min': 0, 'max': 800, 'palette':"CCFFCC,00CC66,006600"}, 'rainfall 2017', false);
Map.addLayer(rainfall2018, {'min': 0, 'max': 800, 'palette':"CCFFCC,00CC66,006600"}, 'rainfall 2018', false);
Map.addLayer(sub, {'min': -200, 'max': 200, 'palette': peakpal}, 'Difference 2018-2017', false);
Map.addLayer(afgRF, {}, 'Rainfed crops', true);
Map.addLayer(table, {color: "FF0000"}, 'Segments 2018', true);
Map.addLayer(outline, {palette: 'FFFF00'}, 'Segment selected', true);