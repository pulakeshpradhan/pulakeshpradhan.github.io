var imageCollection = ui.import && ui.import("imageCollection", "imageCollection", {
      "id": "users/pmisson/JL_Chrismas_2"
    }) || ee.ImageCollection("users/pmisson/JL_Chrismas_2"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -3.6968639232482925,
                40.416282160630665
              ],
              [
                -3.696853194412233,
                40.416094286172985
              ],
              [
                -3.696627888854982,
                40.41606978077026
              ],
              [
                -3.69668153303528,
                40.41627399218688
              ]
            ]
          ],
          "geodesic": true,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#23cba7",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #23cba7 */ee.Geometry.Polygon(
        [[[-3.6968639232482925, 40.416282160630665],
          [-3.696853194412233, 40.416094286172985],
          [-3.696627888854982, 40.41606978077026],
          [-3.69668153303528, 40.41627399218688]]]);
alert('Imáges: JL1GF03C03 Procesado:A. Sánchez de Miguel Financiación: GUAIX Interface:Gabriel Marbán Paine,Alberto Jiménez González, A. Sánchez de Miguel Tutor del proyecto: Julio Galarón Touriño Cliente: A.Sánchez de Miguel/Cities at Night')
// Creación de timelapses en Google Earth Engine
// http://www.gisandbeers.com/crear-timelapses-en-google-earth-engine/
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
  var dummyGeometry =
    ui.Map.GeometryLayer({geometries: null, name: 'geometry', color: '23cba7'});
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
// Llamamos a la colección de imágenes y filtramos fechas de análisis
var MODIS = imageCollection;
// Componemos la imagen RGB o generamos un índice para el timelapse
var MODIS_ColorReal = MODIS.select([
  'b1', 'b2',
  'b3']);
  var vizParamsX2 = {
  min:[1, 1, 1],
  max:[789.6, 905.128, 505.826],
  gamma: [3, 3, 3],
  };  
// Creamos la animación con la colección de imagenes y parámetros del timelapses
var AnimaChart = ui.Panel({
  style:
      {height: 'auto', width: 'auto', position: 'middle-left', shown: false}
});
var DataChart = ui.Panel({
  style:
      {height: 'auto', width: '600px', position: 'bottom-right', shown: false}
});
Map.add(AnimaChart);
Map.add(DataChart);
function AnimaChartTimeSeries() {
  // Make the chart panel visible the first time a geometry is drawn.
  if (!AnimaChart.style().get('shown') || !DataChart.style().get('shown')) {
    AnimaChart.style().set('shown', true);
    DataChart.style().set('shown', true);
  }
  // Get the drawn geometry; it will define the reduction region.
  var aoi = drawingTools.layers().get(0).getEeObject();
  // Set the drawing mode back to null; turns drawing off.
  drawingTools.setShape(null);
  // Reduction scale is based on map scale to avoid memory/timeout errors.
  var mapScale = Map.getScale();
  var scale = mapScale > 5000 ? mapScale * 2 : 5000;
  // Definimos las coordenadas máximas y mínimas de visualización en el timelapse
  var ZonaAOI = aoi
// Parametrizamos el timelapse con proyección, resolución, AOI, valores de pixel y frames/seg
  var Timelapse = {
    crs: 'EPSG:4326',
    dimensions: '600',
    region: ZonaAOI,
    min:[1, 1, 1],
    max:[789.6, 905.128, 505.826],
    gamma: [3, 3, 3],
    framesPerSecond: 5,};
  // Chart NDVI time series for the selected area of interest.
  var Animacion = ui.Thumbnail({
  image: MODIS_ColorReal,
  params: Timelapse,
  style: {
    position: 'bottom-center', //'bottom-right','bottom-right'
    height: 'auto', width: 'auto', 'max-width': '500px', 'max-height': '500px'}});
  // Replace the existing chart in the chart panel with the new chart.
  // Chart
  var curIter = 1;
  var func = function(image, list){
    var reduce = image.select('b' + curIter).reduceRegion({
      reducer: ee.Reducer.frequencyHistogram(),
      geometry: ZonaAOI,
      scale: 30,
      crs: 'EPSG: 4326',
      bestEffort: true
    });
    var values = ee.Dictionary(reduce.get('b' + curIter)).keys();
    var toNumbers =  values.map(function(q){
      var number = ee.Number.parse(q);
      return number;
    });
    //print(toNumbers.reduce(ee.Reducer.sum()),"lightning");
    return ee.List(list).add(toNumbers.reduce(ee.Reducer.sum()));
  };
  AnimaChart.widgets().reset([Animacion]);
  DataChart.widgets().reset();
  var panels = ee.List([]);
  var itemList = [];
  for (var i = 1; i <= 3; i++) {
    var dataList = ee.List([]);
    var toAdd = ee.List(MODIS.iterate(func, dataList));
    itemList.push(toAdd);
    curIter++;
  }
  //Crea lalos features (las row de la tabla)
  var features = [
    ee.Feature(null, {'row': ee.List([1, itemList[0].get(0), itemList[1].get(0), itemList[2].get(0)])}),
    ee.Feature(null, {'row': ee.List([2, itemList[0].get(1), itemList[1].get(1), itemList[2].get(1)])}),
    ee.Feature(null, {'row': ee.List([3, itemList[0].get(2), itemList[1].get(2), itemList[2].get(2)])}),
    ee.Feature(null, {'row': ee.List([4, itemList[0].get(3), itemList[1].get(3), itemList[2].get(3)])}),
    ee.Feature(null, {'row': ee.List([5, itemList[0].get(4), itemList[1].get(4), itemList[2].get(4)])}),
    ee.Feature(null, {'row': ee.List([6, itemList[0].get(5), itemList[1].get(5), itemList[2].get(5)])}),
    ee.Feature(null, {'row': ee.List([7, itemList[0].get(6), itemList[1].get(6), itemList[2].get(6)])}),
    ee.Feature(null, {'row': ee.List([8, itemList[0].get(7), itemList[1].get(7), itemList[2].get(7)])})
  ];
  // Create a FeatureCollection from the list and print it.
  var reductionTable = ee.FeatureCollection(features);
  // Aggregate the 'row' property from all features in the new feature collection
  // to make a server-side 2-D list (DataTable).
  var dataTableServer = reductionTable.aggregate_array('row');
  // Define column names and properties for the DataTable. The order should
  // correspond to the order in the construction of the 'row' property above.
  var columnHeader = ee.List([[
    {label: 'x', role: 'domain', type: 'number'},
    {label: 'Rojo', role: 'data', type: 'number'},
    {label: 'Verde', role: 'data', type: 'number'},
    {label: 'Azul', role: 'data', type: 'number'}
  ]]);
  // Concatenate the column header to the table.
  dataTableServer = columnHeader.cat(dataTableServer);
  // Use 'evaluate' to transfer the server-side table to the client, define the
  // chart and print it to the console.
  dataTableServer.evaluate(function(dataTableClient) {
    var options = {
        hAxis: {
          title: 'Fotograma'
        },
        vAxis: {
          title: 'Iluminación/km2'
        },
        title: 'Iluminación',
        series: {
          0: {lineWidth: 3, color: 'red', pointSize: 3},
          1: {lineWidth: 3, color: 'green', pointSize: 3},
          2: {lineWidth: 3, color: 'blue', pointSize: 3}
        },
        chartArea: {backgroundColor: 'EBEBEB'}
    };
    var chart = ui.Chart(dataTableClient,"LineChart",options);
      DataChart.widgets().add(ui.Panel({
        widgets: [chart],
        style:{width: 'auto', height: 'auto'}
      }));
  });
}
drawingTools.onDraw(ui.util.debounce(AnimaChartTimeSeries, 500));
drawingTools.onEdit(ui.util.debounce(AnimaChartTimeSeries, 500));
var symbol = {
  rectangle: '⬛',
  polygon: '🔺',
  point: '📍',
};
var controlPanel = ui.Panel({
  widgets: [
    ui.Label('1. Select a drawing mode.'),
    ui.Button({
      label: symbol.polygon + ' Polygon',
      onClick: drawPolygon,
      style: {stretch: 'horizontal'}
    }),
    ui.Label('2. Draw a geometry.'),
    ui.Label('3. Wait for chart to render.'),
    ui.Label(
        '4. Repeat 1-3 or edit/move\ngeometry for a new chart.',
        {whiteSpace: 'pre'})
  ],
  style: {position: 'bottom-left'},
  layout: null,
});
Map.add(controlPanel);
// Adicionalmente visualizamos una imagen compuesta del timelapse sobre el visor
var MODIS_Composicion = ee.Image(MODIS_ColorReal.median());
Map.addLayer (MODIS_Composicion, {
  min:[1, 1, 1],
  max:[789.6, 905.128, 505.826],
  gamma: [3, 3, 3],
  bands: ['b1', 'b2',
  'b3']}, 
  'JL1');
Map.centerObject(MODIS_Composicion, 2);
Map.setCenter(-3.701134, 40.417099, 17);