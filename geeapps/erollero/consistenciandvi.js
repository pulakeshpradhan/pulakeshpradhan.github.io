var table = ui.import && ui.import("table", "table", {
      "id": "users/erollero/Departamentos_INDEC_2015"
    }) || ee.FeatureCollection("users/erollero/Departamentos_INDEC_2015"),
    s2 = ui.import && ui.import("s2", "imageCollection", {
      "id": "COPERNICUS/S2"
    }) || ee.ImageCollection("COPERNICUS/S2"),
    seg = ui.import && ui.import("seg", "table", {
      "id": "users/erollero/TOTAL_SEGMENTOS_17Sep19"
    }) || ee.FeatureCollection("users/erollero/TOTAL_SEGMENTOS_17Sep19"),
    lotes = ui.import && ui.import("lotes", "table", {
      "id": "users/erollero/suarez20"
    }) || ee.FeatureCollection("users/erollero/suarez20");
///////////////////////////////////////////////////////////////////
Map.setCenter(-61.8634, -37.4473, 10);
/**
 * Function to mask clouds using the Sentinel-2 QA band
 * @param {ee.Image} image Sentinel-2 image
 * @return {ee.Image} cloud masked Sentinel-2 image
 */
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
// Map the function over one year of data and take the median.
// Load Sentinel-2 TOA reflectance data.
var dataset = ee.ImageCollection('COPERNICUS/S2_SR')
                  .filterDate('2020-04-10', '2020-06-15')
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10))
                  .map(maskS2clouds);
var SentinelFiltro1 = ee.Image(dataset.median());                  
Map.addLayer (SentinelFiltro1, {
  max: 0.41, 
  min: 0.048, 
  gamma: 1.0,
  bands: ['B8','B11','B4']}, 
  'RGB Mayo');
/**
 * Function to mask clouds using the Sentinel-2 QA band
 * @param {ee.Image} image Sentinel-2 image
 * @return {ee.Image} cloud masked Sentinel-2 image
 */
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
// Map the function over one year of data and take the median.
// Load Sentinel-2 TOA reflectance data.
var dataset = ee.ImageCollection('COPERNICUS/S2_SR')
                  .filterDate('2020-01-10', '2020-03-10')
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 5))
                  .map(maskS2clouds);
var SentinelFiltro2 = ee.Image(dataset.median());                  
Map.addLayer (SentinelFiltro2, {
  max: 0.41, 
  min: 0.048, 
  gamma: 1.0,
  bands: ['B8','B11','B4']}, 
  'RGB Febrero');
////////////////////// DICIEMBRE /////////////////
/**
 * Function to mask clouds using the Sentinel-2 QA band
 * @param {ee.Image} image Sentinel-2 image
 * @return {ee.Image} cloud masked Sentinel-2 image
 */
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
// Map the function over one year of data and take the median.
// Load Sentinel-2 TOA reflectance data.
var dataset = ee.ImageCollection('COPERNICUS/S2_SR')
                  .filterDate('2020-10-10', '2020-11-20')
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10))
                  .map(maskS2clouds);
var SentinelFiltro = ee.Image(dataset.median());                  
Map.addLayer (SentinelFiltro, {
  max: 0.41, 
  min: 0.048, 
  gamma: 1.0,
  bands: ['B8','B11','B4']}, 
  'RGBoctubre');
var l8 = ee.ImageCollection("COPERNICUS/S2_SR")
        .filterDate('2019-05-01', '2020-12-20')
        .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 2));
    var ndvi = l8.map(function(image) {
      return image.select().addBands(image.normalizedDifference(['B8','B4']));});
    var panel = ui.Panel();
    panel.style().set('width', '300px');
    var intro = ui.Panel([
      ui.Label({value: 'Inspector de NDVI',
        style: {fontSize: '20px', fontWeight: 'bold'}  }),
      ui.Label('Realice un click sobre un lote.')]);
    panel.add(intro);
    var lat = ui.Label();
    var lon = ui.Label();
    panel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
    Map.onClick(function(coords) {
      lat.setValue('lat: ' + coords.lat.toFixed(5)),
      lon.setValue('lon: ' + coords.lon.toFixed(5));
      var point = ee.Geometry.Point(coords.lon, coords.lat);
      var dot = ui.Map.Layer(point, {color: 'FF0000'});
      Map.layers().set(1, dot);
      var ndviChart = ui.Chart.image.series(ndvi, point, ee.Reducer.mean(), 500);
      ndviChart.setOptions({
        title: 'NDVI Serie de Tiempo',vAxis: {title: 'NDVI'},
        hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}},
      });  panel.widgets().set(2, ndviChart);});
    Map.style().set('cursor', 'crosshair');
    ui.root.insert(0, panel);
// Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();
// Paint all the polygon edges with the same number and width, display.
var outline = empty.paint({
  featureCollection: table,
  color: 1,
  width: 2
});
Map.addLayer(outline, {palette: 'black'}, 'Deptos');
// Add the maps and title to the ui.root.
//ui.root.widgets().reset([title, mapGrid]);
//ui.root.setLayout(ui.Panel.Layout.Flow('vertical'));
Map.add(ui.Label(
    'Mapa de Coberturas Cosecha Fina 20/21 ' 
    , {fontWeight: 'bold', fontSize: '24px'}));
// Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();
// Paint all the polygon edges with the same number and width, display.
var outline = empty.paint({
  featureCollection: seg,
  color: 1,
  width: 1
});
Map.addLayer(outline, {palette: 'black'}, 'Segmentos');
// Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();
// Paint all the polygon edges with the same number and width, display.
var outline = empty.paint({
  featureCollection: lotes,
  color: 1,
  width: 1
});
Map.addLayer(outline, {palette: 'blue'}, 'lotes');