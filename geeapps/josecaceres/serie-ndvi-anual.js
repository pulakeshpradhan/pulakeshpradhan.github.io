var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#23cba7",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #23cba7 */ee.Geometry.MultiPoint();
//PARTE 5. Series temporales de NDVI definidas por el usuario.
//Agregar limites
var hn =  ee.FeatureCollection("users/josecaceres/Limite_Depto_HN")
//Agregar coleccion Landsat8 TOA
var l8 = ee.ImageCollection("LANDSAT/LC08/C01/T1_TOA").map(function(image){return image.clip(hn)})
// Defina una funcion que calculara NDVI a partir de una imagen Landsat 8.
var addNDVI = function(image) {
  var cloud = ee.Algorithms.Landsat.simpleCloudScore(image).select('cloud');
  var mask = cloud.lt(20);
  var ndvi = image.normalizedDifference(['B5', 'B4']).rename('NDVI');
  return image.addBands(ndvi).updateMask(mask);
};
// Filtre y asigne la funcion a la coleccion.
var withNDVI = l8.filterDate('2020-01-01', '2020-12-31')
    .map(addNDVI); // <-- map() the function over the collection.
var ndvi = withNDVI.median().select('NDVI');
var vis = {min: -0.2, max: 0.7, palette: ['blue', 'white', 'green']};
//Creamos un widget de herramientas de dibujo; defínalo como una variable por conveniencia
//para recordarlo más tarde.
var drawingTools = Map.drawingTools();
//Ocultar las herramientas de dibujo predeterminadas.
drawingTools.setShown(false);
//Configure un ciclo while para borrar todas las geometrías existentes que se han agregado
//como importaciones de las herramientas de dibujo (de ejecutar previamente el script).
while (drawingTools.layers().length() > 0) {
  var layer = drawingTools.layers().get(0);
  drawingTools.layers().remove(layer);
}
//Inicializar una GeometryLayer ficticia con geometría nula para que actúe como marcador
//de posición para las geometrías dibujadas
var dummyGeometry =
    ui.Map.GeometryLayer({geometries: null, name: 'geometry', color: '23cba7'});
drawingTools.layers().add(dummyGeometry);
//Defina la función de limpieza de geometría.
function clearGeometry() {
  var layers = drawingTools.layers();
  layers.get(0).geometries().remove(layers.get(0).geometries().get(0));
}
//Defina las funciones a las que se llamará cuando se haga clic en cada botón de dibujo respectivo.
//Cada función borrará los dibujos anteriores utilizando la función clearGeometry y luego
//inicializará el dibujo para el modo de dibujo en particular.
function drawRectangle() {
  clearGeometry();
  drawingTools.setShape('rectangle');
  drawingTools.draw();
}
function drawPolygon() {
  clearGeometry();
  drawingTools.setShape('polygon');
  drawingTools.draw();
}
function drawPoint() {
  clearGeometry();
  drawingTools.setShape('point');
  drawingTools.draw();
}
//Defina un panel para contener el gráfico de series de tiempo. Establezca el parámetro de estilo
//mostrado en "false" para ocultar inicialmente el panel hasta que se renderice el primer gráfico.
var chartPanel = ui.Panel({
  style:
      {height: '235px', width: '600px', position: 'bottom-right', shown: false}
});
Map.add(chartPanel);
//Defina una función a la que se llame en eventos de finalización y edición de dibujos geométricos
//para generar un gráfico de series de tiempo para la región dibujada
function chartTimeSeries() {
  // Haga que el panel de gráfico sea visible la primera vez que se dibuje una geometría.
  if (!chartPanel.style().get('shown')) {
    chartPanel.style().set('shown', true);
  }
  // Obtenga la geometría dibujada; definirá la región de reducción.
  var aoi = drawingTools.layers().get(0).getEeObject();
  // Vuelva a establecer el modo de dibujo en "null"; apaga el dibujo.
  drawingTools.setShape(null);
  // La escala de reducción se basa en la escala del mapa para evitar errores de memoria / tiempo de espera.
  var mapScale = Map.getScale();
  var scale = mapScale > 5000 ? mapScale * 2 : 5000;
  // Agregue un grafico de los valores del NDVI.
  var grafico = ui.Chart.image.series({
    imageCollection: withNDVI.select('NDVI'), 
    region: aoi, 
    reducer: ee.Reducer.mean(), 
    scale: 30
  });
  grafico.setOptions({
    title: 'Serie temporal NDVI',
    vAxis: {title: 'NDVI'},
    hAxis: {title: 'fecha', format: 'MM-yy', gridlines: {count: 7}},
    interpolateNulls: true
  });
  // Replace the existing chart in the chart panel with the new chart.
  chartPanel.widgets().reset([grafico]);
}
drawingTools.onDraw(ui.util.debounce(chartTimeSeries, 500));
drawingTools.onEdit(ui.util.debounce(chartTimeSeries, 500));
var symbol = {
  rectangle: '⬛',
  polygon: '🔺',
  point: '📍',
};
var controlPanel = ui.Panel({
  widgets: [
    ui.Label('1. Select un tipo de selección.'),
    ui.Button({
      label: symbol.rectangle + ' Rectángulo',
      onClick: drawRectangle,
      style: {stretch: 'horizontal'}
    }),
    ui.Button({
      label: symbol.polygon + ' Poligono',
      onClick: drawPolygon,
      style: {stretch: 'horizontal'}
    }),
    ui.Button({
      label: symbol.point + ' Punto',
      onClick: drawPoint,
      style: {stretch: 'horizontal'}
    }),
    ui.Label('2. Dibuja la geometría.'),
    ui.Label('3. Espera a que se cree el gráfico.'),
    ui.Label(
        '4. Repetir 1-3 or edita/mueve\nla geometria para un nuevo gráfico.',
        {whiteSpace: 'pre'})
  ],
  style: {position: 'bottom-left'},
  layout: null,
});
Map.add(controlPanel);
//Agregar capas
Map.centerObject(hn, 8)
Map.addLayer(ndvi, vis, 'NDVI');