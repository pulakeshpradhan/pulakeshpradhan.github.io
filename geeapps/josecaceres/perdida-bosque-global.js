var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -90.16040227658681,
                16.85667000295945
              ],
              [
                -90.16040227658681,
                16.24586891562128
              ],
              [
                -89.53418157346181,
                16.24586891562128
              ],
              [
                -89.53418157346181,
                16.85667000295945
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [
        {
          "type": "rectangle"
        }
      ],
      "properties": {},
      "color": "#23cba7",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || 
    /* color: #23cba7 */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[-90.16040227658681, 16.85667000295945],
          [-90.16040227658681, 16.24586891562128],
          [-89.53418157346181, 16.24586891562128],
          [-89.53418157346181, 16.85667000295945]]], null, false);
//Agregar capa de Hansen
//var hansenGlobal = ee.Image('UMD/hansen/global_forest_change_2019_v1_7'); //Mostrar sin el clip
var hansenGlobal = ee.Image("UMD/hansen/global_forest_change_2020_v1_8")
//Agregar limites
//var hn =  ee.FeatureCollection("users/josecaceres/Limite_Depto_HN")
var dataset = ee.FeatureCollection("FAO/GAUL/2015/level0");
//Definir el listado de paises
var countryNames = dataset.aggregate_array('ADM0_NAME').sort().getInfo()
function countryNames(names) {      return names}
//Map.setControlVisibility({layerList: false});
//Remover capas duplicadas
function removeLayers() {
  var layers = Map.layers();
  var names = [];
  layers.forEach(function(lay) {
    var lay_name = lay.getName()
    names.push(lay_name)
  });
//  print('Name' + names)
  names.forEach(function(name) {
    print('Capa = ' + name)
    try{
      Map.remove(name)
//      print('Removing Layer ' + layer)
    }
    catch(error){
      Map.layers().remove((layers.get(0)))
//      print("ERROR " + error)
    }
  });
}
//Definir funcion del selector
var country = ui.Select({
items: countryNames,
onChange: function(){
  try{
    removeLayers();
    controlPanel.remove(legenPanel);
  }
  catch(error){
//    print('Error'+error)
  }
  var sel = dataset.filter(ee.Filter.eq('ADM0_NAME', country.getValue()));
  var styling = {color: 'red', fillColor: '00000000'};
  //Map.addLayer((sel.style(styling), {}, 'Country Boundaries'))
  var roi = ui.Map.Layer(sel.style(styling), {}, 'Limite Nacional');
  Map.layers().set(1, roi);
//  print(sel);
  Map.centerObject(sel);
  //Añadir Dataset
  var hansen = ee.Image("UMD/hansen/global_forest_change_2020_v1_8").clip(sel); //Mostrar sin el clip
  var treeCoverVisParam = {
    bands: ['treecover2000'],
    min: 0,
    max: 100,
    palette: ['black', 'green'],
    opacity:0.5
  };
  var treeLossVisParam = {
    bands: ['lossyear'],
    min: 0,
    max: 20,
    palette: ['yellow', 'orange', 'red'],
    legend: [
      {'2020': 'red'}, {'...': 'orange'}, {'2000': 'yellow'}],
    opacity:0.7
  };
  Map.addLayer(hansen, treeCoverVisParam, 'Cobertura Bosque');
  Map.addLayer(hansen, treeLossVisParam, 'Perdida Anual');
  return hansen;
}
})
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
  //Calcular la perdida anual en base al dataser de Hansen
  var perdidaAnual = hansenGlobal.select('lossyear')
  //Calcular el área de cada Pixel
  var lossAnual = perdidaAnual.multiply(ee.Image.pixelArea());
  var lossByYear = lossAnual.addBands(perdidaAnual).reduceRegion({
  reducer: ee.Reducer.sum().group({
    groupField: 1 //0=sin cambio 1=perdida (contar valores de 1)
    }),
  geometry: aoi,
  scale: 30,
  maxPixels: 1e9
  });
  //Formatear Datos por Grupo
  var Estadistica = ee.List(lossByYear.get('groups'))
    .map(function(el) {
      var d = ee.Dictionary(el);
      return [ee.Number(d.get('group')).format("20%02d"), ee.Number(d.get('sum')).divide(10000)];
    });
  var Diccionario = ee.Dictionary(Estadistica.flatten());
  //print('Datos por Año', Diccionario);
  // Agregue un grafico de los valores del perdida de bosque.
  var grafico = ui.Chart.array.values({
    array: Diccionario.values(),
    axis: 0,
    xLabels: Diccionario.keys()
  }).setChartType('ColumnChart')
  .setOptions({
    title: 'Hectáreas de Pérdida Bosque Anual (2001 - 2020)',
    hAxis: {title: 'Año', format: '####'},
    vAxis: {title: 'Area (ha)'},
    legend: { position: "none" },
    lineWidth: 1,
    pointSize: 3
  });
  // Replace the existing chart in the chart panel with the new chart.
  chartPanel.widgets().reset([grafico]);
}
drawingTools.onDraw(ui.util.debounce(chartTimeSeries, 500));
drawingTools.onEdit(ui.util.debounce(chartTimeSeries, 500));
var symbol = {
  rectangle: '⬛',
  polygon: '🔺',
};
//Crea la leyenda
function setLegend(legend) {
  // Loop through all the items in a layer's key property,
  // creates the item, and adds it to the key panel.
//  controlPanel.clear();
  for (var i = 0; i < legend.length; i++) {
    var item = legend[i];
    var name = Object.keys(item)[0];
    var color = item[name];
    var colorBox = ui.Label('', {
      backgroundColor: color,
      // Use padding to give the box height and width.
      padding: '8px',
      margin: '0'
    });
    // Create the label with the description text.
    var description = ui.Label(name, {margin: '0 0 4px 6px'});
    var legenPanel = ui.Panel([colorBox, description], ui.Panel.Layout.Flow('horizontal'));
    controlPanel.add(legenPanel);
  }
}
var LossVisParam = {
    bands: ['lossyear'],
    min: 0,
    max: 20,
    palette: ['yellow', 'orange', 'red'],
    legend: [
      {'2020': 'red'}, {'...': 'orange'}, {'2000': 'yellow'}],
    opacity:0.7
  };
//Crear panel de Control
var controlPanel = ui.Panel({
  widgets: [
    ui.Label(
    'Fuente: Datos obtenidos de:',
    {fontWeight: 'bold', fontSize: '12px', margin: '0 0 4px 0', padding: '0'}),
    ui.Label(
    'Paper by Hansen, Potapov, Moore, Hancher et al.', {},
    'http://science.sciencemag.org/content/342/6160/850'),
    ui.Label(''),
    ui.Label(
    'Para usar la herramienta sigue estos pasos:',
    {fontWeight: 'bold', fontSize: '15px', margin: '0 0 4px 0', padding: '0'}),
    ui.Label('1. Selecciona un pais.'),
    country,
    ui.Label('2. Selecciona un tipo de geometría.'),
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
    ui.Label('3. Dibuja la geometría.'),
    ui.Label('4. Espera a que se cree el gráfico.'),
    ui.Label(
        '5. Repetir 1-4 or edita/mueve\nla geometria para un nuevo gráfico\no selecciona un nuevo país.',
        {whiteSpace: 'pre'}),
    ui.Label(
    'Leyenda',
    {fontWeight: 'bold', fontSize: '15px', margin: '0 0 4px 0', padding: '0'}),
    ui.Label(
    'Perdida Anual',
    {fontWeight: 'regular', fontSize: '12px', margin: '0 0 4px 0', padding: '0'}),
  ],
  style: {position: 'bottom-left'},
  layout: null,
});
Map.add(controlPanel);
setLegend(LossVisParam.legend);
//Agregar capas al mapa
//Map.addLayer(dataset, treeCoverVisParam, 'Cobertura Bosque', 1);
//Map.addLayer(dataset, treeLossVisParam, 'Perdida Anual');
//Map.centerObject(hn, 8)