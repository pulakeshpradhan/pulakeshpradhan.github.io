var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#23cba7",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #23cba7 */ee.Geometry.MultiPoint();
Map.setOptions('SATELLITE');
Map.setCenter(-68.872311,-33.007961,18)
var drawingTools = Map.drawingTools();
drawingTools.setShown(false);
while (drawingTools.layers().length() > 0) {
  var layer = drawingTools.layers().get(0);
  drawingTools.layers().remove(layer);
}
var dummyGeometry =
    ui.Map.GeometryLayer({geometries: null, name: 'geometry', color: '23cba7'});
drawingTools.layers().add(dummyGeometry);
function clearGeometry() {
  var layers = drawingTools.layers();
  layers.get(0).geometries().remove(layers.get(0).geometries().get(0));
}
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
var chartPanel = ui.Panel({
  style:
      {height: '235px', width: '600px', position: 'bottom-right', shown: false}
});
Map.add(chartPanel);
function chartNdviTimeSeries() {
  // Make the chart panel visible the first time a geometry is drawn.
  if (!chartPanel.style().get('shown')) {
    chartPanel.style().set('shown', true);
  }
  // Get the drawn geometry; it will define the reduction region.
  var aoi = drawingTools.layers().get(0).getEeObject();
  // Set the drawing mode back to null; turns drawing off.
  drawingTools.setShape(null);
  // Reduction scale is based on map scale to avoid memory/timeout errors.
  //var mapScale = Map.getScale();
  //var scale = mapScale > 5000 ? mapScale * 2 : 5000;
var Sentinel = ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED")
.filterBounds(aoi)
//.filterDate(start_date, end_date)
.filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'less_than', 10)
var NDVI_S = function(image){
  var ndvi = image.normalizedDifference(['B8', 'B4']).rename('NDVI')
  image = image.addBands(ndvi)
  return image.select(['NDVI']).clip(aoi)
}
var Sentinel = Sentinel.map(NDVI_S)
print(Sentinel)
  // Chart NDVI time series for the selected area of interest.
  var chart = ui.Chart.image
                  .seriesByRegion({
                    imageCollection: Sentinel,
                    regions: aoi,
                    reducer: ee.Reducer.mean(),
                    band: 'NDVI',
                    //scale: scale,
                    xProperty: 'system:time_start'
                  })
                  .setOptions({
                    titlePostion: 'none',
                    title: 'Serie de Tiempo de NDVI Sentinel 2',
                    legend: {position: 'none'},
                    hAxis: {title: 'Fecha'},
                    vAxis: {title: 'NDVI'},
                    series: {0: {color: '00a349'}}
                  });
  // Replace the existing chart in the chart panel with the new chart.
  chartPanel.widgets().reset([chart]);
}
drawingTools.onDraw(ui.util.debounce(chartNdviTimeSeries, 500));
drawingTools.onEdit(ui.util.debounce(chartNdviTimeSeries, 500));
var symbol = {
  rectangle: '⬛',
  polygon: '🔺',
  point: '📍',
};
var controlPanel = ui.Panel({
  widgets: [
    ui.Label('1. Seleccionar el tipo de geometría.'),
    ui.Button({
      label: symbol.rectangle + ' Rectangulo',
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
    ui.Label('2. Dibujar la geometría seleccionada.'),
    ui.Label('3. Espere mientrar se procesa lo solicitado.'),
    ui.Label(
        '4. Repetir pasos del 1-3 o editar/mover\n la geometría para un nuevo gráfico.',
        {whiteSpace: 'pre'}),
   ui.Label('Francisco Martín Corvalán\n francisco.corvalan6@gmail.com',
   {whiteSpace: 'pre'})
  ],
  style: {position: 'bottom-left'},
  layout: null,
});
Map.add(controlPanel);