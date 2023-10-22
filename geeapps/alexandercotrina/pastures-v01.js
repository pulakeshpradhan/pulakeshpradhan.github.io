// Definir el layout de la app
var layout = {
  mapPanel: {width: '70%', height: '100%'},
  chartPanel: {width: '30%', height: '40%'},
  timeSeriesPanel: {width: '30%', height: '60%'}
};
// Crear los paneles
var mapPanel = ui.Map();
var chartPanel = ui.Panel({style: layout.chartPanel});
var timeSeriesPanel = ui.Panel({style: layout.timeSeriesPanel});
var chartPanels = [];
// Añadir los paneles al layout
ui.root.clear();
// Crear el panel dividido verticalmente para el mapa y el panel de gráficos
var mapChartSplitPanel = ui.SplitPanel({
  firstPanel: mapPanel,
  secondPanel: chartPanel,
  orientation: 'vertical',
  style: {width: '100%', height: '100%'}
});
// Añadir el panel dividido del mapa y el panel de gráficos al layout principal
ui.root.add(mapChartSplitPanel);
// Crear un panel para el gráfico de series de tiempo
var timeSeriesChartPanel = ui.Panel({style: layout.timeSeriesPanel});
// Cargar el Asset con los polígonos
var poligonos = ee.FeatureCollection('users/alexandercotrina/pastures/plots');
// Centrar el mapa en los polígonos con un zoom de 10
var centroid = poligonos.geometry().centroid();
var lon = centroid.coordinates().get(0).getInfo();
var lat = centroid.coordinates().get(1).getInfo();
mapPanel.setCenter(lon, lat, 14);
// Function to remove cloud and snow pixels from Sentinel-2 SR image
function maskCloudAndShadowsSR(image) {
  var cloudProb = image.select('MSK_CLDPRB');
  var snowProb = image.select('MSK_SNWPRB');
  var cloud = cloudProb.lt(5);
  var snow = snowProb.lt(5);
  var scl = image.select('SCL'); 
  var shadow = scl.eq(3); // 3 = cloud shadow
  var cirrus = scl.eq(10); // 10 = cirrus
  var mask = cloud.and(cirrus.neq(1)).and(shadow.neq(1));
  return image.updateMask(mask);
}
// Obtener la fecha actual
var fechaActual = ee.Date(new Date());
// Cargar la colección de imágenes Sentinel-2
var sentinel = ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED")
  .filterDate(fechaActual.advance(-2, 'year'), fechaActual) // Último año hasta la fecha actual
  .filterBounds(poligonos)
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10))
  .map(maskCloudAndShadowsSR);
// Función para calcular el NDVI
var calcNDVI = function(image) {
  var ndvi = image.normalizedDifference(['B8', 'B4']).rename('NDVI');
  return image.addBands(ndvi);
};
// Aplicar la función NDVI a la colección de imágenes
var sentinelNDVI = sentinel.map(calcNDVI);
// Obtener la imagen más reciente
var imagenMasReciente = sentinel.sort('system:time_start', false).first();
// Calcular el NDVI de la imagen más reciente
var imagenMasRecienteNDVI = calcNDVI(imagenMasReciente);
// Agregar la imagen RGB más reciente al mapa
mapPanel.addLayer(imagenMasReciente.visualize({bands: ['B4', 'B3', 'B2'], gamma: 1,
min: 0,
opacity: 1,
max: 3000}), {}, 'RGB - Sentinel 2');
// Agregar la imagen NDVI más reciente al mapa
mapPanel.addLayer(imagenMasRecienteNDVI.select('NDVI'), {
  max: 1.0, min: 0, palette: ['CE7E45', 'DF923D', 'F1B555', 
    'FCD163', '99B718', '74A901', '66A000', '529400', '3E8601','207401', '056201',
    '004C00', '023B01', '012E01', '011D01', '011301']}, 'NDVI');
mapPanel.addLayer(poligonos, {color: 'FF0000'}, 'Plots'); // Agregar los polígonos al mapa
////
// Iterar sobre los polígonos para generar un gráfico para cada uno
poligonos.evaluate(function (features) {
  features.features.forEach(function(feature) {
    var nombre = feature.properties.Descrip;
    var singleChartPanel = ui.Panel({style: {width: '100%', height: '15%'}});
    chartPanels.push(singleChartPanel);
    chartPanel.add(singleChartPanel);
    var grafico = ui.Chart.image.seriesByRegion({
      imageCollection: sentinelNDVI,
      regions: ee.FeatureCollection([ee.Feature(feature)]),
      reducer: ee.Reducer.mean(),
      band: 'NDVI',
      scale: 10,
      xProperty: 'system:time_start',
    }).setOptions({title: nombre});
    singleChartPanel.add(grafico);
  });
});
// Para visualizar los resultados en un gráfico de series de tiempo
var grafico = ui.Chart.image.seriesByRegion({
  imageCollection: sentinelNDVI,
  regions: poligonos,
  reducer: ee.Reducer.mean(),
  band: 'NDVI',
  scale: 10,
  xProperty: 'system:time_start',
  seriesProperty: 'Descrip'
});
// Agregar el gráfico de series de tiempo al panel de series de tiempo
timeSeriesChartPanel.add(grafico);
// Añadir el panel de series de tiempo al panel de gráficos
timeSeriesPanel.add(timeSeriesChartPanel);