var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.MultiPoint(),
    imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "b1"
        ],
        "palette": [
          "ffffe0",
          "ffa500",
          "ff0000"
        ]
      }
    }) || {"opacity":1,"bands":["b1"],"palette":["ffffe0","ffa500","ff0000"]};
//Agregar utilidades
var constantes = require('users/infonamonitoreo/tools:Visualizadores/constantes');
var funciones = require('users/infonamonitoreo/tools:Visualizadores/funciones');
var prioglad = require('users/PrioGLADpy/test_2021:tools/constantes');
function confMap(mapa){
  var estilosMapa = funciones.mapStyles();
  var gris = estilosMapa.gris;
  var oscuro = estilosMapa.oscuro;
  mapa.clear(),
  mapa.setOptions('ROADMAP',{'Gris': gris, 'Oscuro': oscuro});
}
var colors = {'cyan': '#24C1E0', 'transparent': '#11ffee00', 'gray': '#F8F9FA'};
var BORDER_STYLE = '4px solid rgba(97, 97, 97, 0.05)';
var TITLE_STYLE = {
  fontWeight: '100',
  fontSize: '32px',
  padding: '10px',
  color: '#616161',
  backgroundColor: colors.transparent,
};
var PARAGRAPH_STYLE = {
  fontSize: '14px',
  fontWeight: '50',
  color: '#9E9E9E',
  padding: '8px',
  backgroundColor: colors.transparent,
};
var LABEL_STYLE = {
  fontWeight: '50',
  textAlign: 'center',
  fontSize: '11px',
  backgroundColor: colors.transparent,
};
function makeSidePanel() {
  // Create the base side panel, into which other widgets will be added
  var mainPanel = ui.Panel({
    layout: ui.Panel.Layout.flow('vertical', true),
    style: {
      stretch: 'horizontal',
      height: '100%',
      width: '500px',
      backgroundColor: colors.gray,
      border: BORDER_STYLE,
    }
  });
  // Add the app title to the side panel
  var titleLabel = ui.Label('Panel Interactivo de datos de Cambio de Uso', TITLE_STYLE);
  mainPanel.add(titleLabel);
  // Add the app description to the main panel
  var descriptionText =
      'Panel para la visualización y análisis de datos de cambio de uso en la cobertura forestal del Paraguay';
  var descriptionLabel = ui.Label(descriptionText, PARAGRAPH_STYLE);
  mainPanel.add(descriptionLabel);
  return mainPanel;
}
function makeMapPanel() {
  var map = ui.Map();
  // Add an informational label
  map.add(ui.Label('Click en el mapa para visualizar datos en el panel lateral'));
  map.style().set('cursor', 'crosshair');
  return map;
}
ui.root.clear();
// Create the app's two panels and add them to the ui.root
var sidePanel = makeSidePanel();
var mapPanel = makeMapPanel();
// Use a SplitPanel so it's possible to resize the two panels.
ui.root.add(ui.SplitPanel(sidePanel,mapPanel));
/*
 * Data sources
 */
var mgtd_pre = ee.Image('users/infonamonitoreo/raster/infoSSMT');
var mgtd = mgtd_pre.selfMask();
// Country boundary data with associated precomputed Departamento totals.
// These are USDOS LSIB boundaries simplified somewhat for visualization.
var countries_table = constantes.InfoSSMT_table;
var countries_chart = constantes.InfoSSMT_chart;
var countries_PUT = constantes.InfoPUT;
var countries_CF = constantes.InfoCF;
mapPanel.centerObject(countries_table,6.5);
/*
 * Visualización y Estilo
 */
// Constantes utilizadas para visualizar los datos en el mapa.
var Departamento_STYLE = {
  opacity: 0.5,
  min: 0,
  max: 1,
  palette: ['lightyellow', 'orange', 'red']
};
var Departamento_VIS_MAX_VALUE = 250000;
var Departamento_VIS_NONLINEARITY = 2;
var HIGHLIGHT_STYLE = {color: '05d6d1', fillColor: '00000000'};
var visParam = {"opacity": 0.7, palette:'blue,red,orange,green,purple,skyblue,pink','min':1, 'max':7};
var visPUT = {"opacity":1,palette:'#cc9e42,#f504ff','min':1, 'max':2};
// Aplique un tramo no lineal a los datos de departamentos para su visualización.
function colorStretch(image) {
  return image.divide(Departamento_VIS_MAX_VALUE)
      .pow(1 / Departamento_VIS_NONLINEARITY);
}
// Invierte el tramo no lineal que aplicamos a los datos del Departamento para
// visualización, para que podamos retroceder valores para mostrar en la leyenda.
// Esto usa funciones matemáticas comunes de JavaScript, en lugar de Earth Engine
// funciones, ya que las vamos a llamar desde JS para calcular los valores de las etiquetas.
function undoColorStretch(val) {
  return Math.pow(val, Departamento_VIS_NONLINEARITY) * Departamento_VIS_MAX_VALUE;
}
// Configura nuestra app con un conjunto mínimo de controles.
mapPanel.setControlVisibility({drawingToolsControl:false,zoomControl:false});
//Map.setControlVisibility({layerList: true,mapTypeControl: true, fullscreenControl: true,scaleControl: true});
mapPanel.style().set({cursor: 'crosshair'});
// Agrega nuestras capas base al mapa
var vacio = ee.Image().byte();
mapPanel.addLayer(colorStretch(mgtd.unmask(0).updateMask(1)), Departamento_STYLE,'Magnitud');
mapPanel.addLayer(prioglad.coberturaForestal2018, {min:1, max:1, palette:"1f7a12"}, 'Cobertura Forestal 2018',true);
mapPanel.addLayer(constantes.ssmtCh0018,visParam,'Cambios SSMT (periodos)');
var limDpto = vacio.paint({
  featureCollection: countries_chart,
  color: 1,
  width: 1
});
var limPUT = vacio.paint({
featureCollection: prioglad.limitesPuts,
  color: 1,
  width: 1
});
mapPanel.addLayer(limPUT,{opacity: 0.7, palette: 'gray'},'Limites Catastro Forestal PUT',false);
mapPanel.addLayer(constantes.PUT_SSMT,visPUT,'Planes de Uso de la Tierra',false);
mapPanel.addLayer(limDpto,{},'Departamentos');
// // Crea la barra de título de la aplicación.
// Map.add(ui.Label(
//     'Panel de Cambio de Uso', {fontWeight: 'bold', fontSize: '24px'}));
/* ################################ CREACIÓN DE GRAFICOS
  El panel de carta en la parte inferior derecha
 */
// Una lista de puntos en los que el usuario ha hecho clic [lon, lat].
var selectedPoints = [];
// Devuelve la lista de departamentos que el usuario ha seleccionado.
function getSelectedCountries() {
  return countries_chart.filterBounds(ee.Geometry.MultiPoint(selectedPoints));
}
// Hace un gráfico de barras de la FeatureCollection dada de departamentos por nombre.
function makeResultsBarChart(countries_chart) {
  var chartBar = ui.Chart.feature.byFeature(countries_chart, 'DPTO_DESC');
  chartBar.setChartType('BarChart');
  chartBar.setOptions({
    title: 'Comparativo de datos de total de cambio de uso',
     colors: ['red'],
    vAxis: {title: null},
    hAxis: {title: 'Hectareas (ha) de cambio de uso', minValue: 0}
  });
  chartBar.style().set({stretch: 'both'});
  return chartBar;
}
// Hace una tabla de la FeatureCollection dada de departamentos por nombre.
function makeResultsTable(countries_chart) {
  var table = ui.Chart.feature.byFeature(countries_chart, 'DPTO_DESC');
  table.setChartType('Table');
  table.setOptions({allowHtml: true, pageSize: 5});
  table.style().set({stretch: 'both'});
  return table;
}
// Actualiza la superposición del mapa utilizando los países seleccionados actualmente. (tiene que ser para todos los gráficos)
function updateOverlay() {
  var overlay = getSelectedCountries().style(HIGHLIGHT_STYLE);
  mapPanel.layers().set(6, ui.Map.Layer(overlay)); // Lista de lugares [0,1,2,3,4,n] el set siempre debe estar en el último lugar para que no superponga capas
}
// Actualiza el gráfico utilizando la función de gráfico seleccionada actualmente,
function updateBarChart() {
  var barBuilder = chartTypeToggleButton.value;
  var bar = barBuilder(getSelectedCountries());
  resultsPanel.clear().add(bar).add(buttonPanel);
}
// Borra el conjunto de puntos seleccionados y restablece la superposición y los resultados
// panel a su estado predeterminado.
function clearResults() {
  selectedPoints = [];
  mapPanel.layers().remove(mapPanel.layers().get(6));
  var instructionsLabel = ui.Label('Cambio de Uso Total');
  resultsPanel.widgets().reset([instructionsLabel]);
}
// Registre un controlador de clic para el mapa que agrega el punto en el que se hizo clic a la lista
// enumera y actualiza la superposición del mapa y el gráfico en consecuencia.
function handleMapClick(location) {
  selectedPoints.push([location.lon, location.lat]);
  updateOverlay();
  updateBarChart();
}
mapPanel.onClick(handleMapClick);
// Un widget de botón que alterna (o cicla) entre estados.
// Para construir un ToggleButton, proporcione una matriz de objetos que describan
// los estados deseados, cada uno con las propiedades 'etiqueta' y 'valor'.
function ToggleButton(states, onClick) {
  var index = 0;
  var button = ui.Button(states[index].label);
  button.value = states[index].value;
  button.onClick(function() {
    index = ++index % states.length;
    button.setLabel(states[index].label);
    button.value = states[index].value;
    onClick();
  });
  return button;
}
// Nuestro botón de alternancia de tipo de gráfico: el texto del botón es el opuesto al
// estado actual, ya que hace clic en el botón para cambiar de estado.
var chartTypeToggleButton = ToggleButton(
    [
      {
        label: 'Ver resultados como tabla',
        value: makeResultsBarChart,
      },
      {
        label: 'Ver resultados como gráfico',
        value: makeResultsTable,
      }
    ],
    updateBarChart);
// Un panel que contiene los dos botones.
var buttonPanel = ui.Panel(
    [ui.Button('Limpiar Selección', clearResults), chartTypeToggleButton],
    ui.Panel.Layout.Flow('horizontal'), {margin: '0 0 0 auto', width: '350px'});
var resultsPanel = ui.Panel({style: {position: 'bottom-right'}});
sidePanel.add(resultsPanel);
clearResults();
// ################################### Segundo gráfico (Columnas por periodo)
// Devuelve la lista de departamentos que corresponde a tablas que el usuario ha seleccionado.
function getSelectedCountries1() {
  return countries_table.filterBounds(ee.Geometry.MultiPoint(selectedPoints));
}
// Hace un gráfico de Columnas de la FeatureCollection de tabla de departamentos por nombre.
function makeResultsColumnChart(countries_table) {
  var chartCol = ui.Chart.feature.byFeature(countries_table, 'DPTO_DESC');
  chartCol.setChartType('ColumnChart');
  chartCol.setOptions({
    title: 'Comparativo de datos por periodo',
    // colors:[],
    vAxis: {title: null},
    hAxis: {title: 'Hectareas (ha) de cambio de uso por periodo', minValue: 0}
  });
  chartCol.style().set({stretch: 'both'});
  return chartCol;
}
// Hace una tabla de la FeatureCollection dada de departamentos por nombre.
function makeResultsTable1(countries_table) {
  var table1 = ui.Chart.feature.byFeature(countries_table, 'DPTO_DESC');
  table1.setChartType('Table');
  table1.setOptions({allowHtml: true, pageSize: 5});
  table1.style().set({stretch: 'both'});
  return table1;
}
// Actualiza el gráfico utilizando la función de gráfico seleccionada actualmente,
function updateColChart() {
  var chartColBuilder = chartTypeToggleButton1.value;
  var Col = chartColBuilder(getSelectedCountries1());
  resultsPanel1.clear().add(Col).add(buttonPanel1);
}
// Borra el conjunto de puntos seleccionados y restablece la superposición y los resultados
// panel a su estado predeterminado.
function clearResults1() {
  selectedPoints = [];
  mapPanel.layers().remove(mapPanel.layers().get(6));
  var instructionsLabel1 = ui.Label('Cambio de Uso por Periodo');
  resultsPanel1.widgets().reset([instructionsLabel1]);
}
// Registre un controlador de clic para el mapa que agrega el punto en el que se hizo clic al
// enumera y actualiza la superposición del mapa y el gráfico en consecuencia.
function handleMapClick1(location) {
  selectedPoints.push([location.lon, location.lat]);
  updateColChart();
}
mapPanel.onClick(handleMapClick1);
// Un widget de botón que alterna (o cicla) entre estados.
// Para construir un ToggleButton, proporcione una matriz de objetos que describan
// los estados deseados, cada uno con las propiedades 'etiqueta' y 'valor'.
function ToggleButton1(states, onClick) {
  var index = 0;
  var button1 = ui.Button(states[index].label);
  button1.value = states[index].value;
  button1.onClick(function() {
    index = ++index % states.length;
    button1.setLabel(states[index].label);
    button1.value = states[index].value;
    onClick();
  });
  return button1;
}
// Nuestro botón de alternancia de tipo de gráfico: el texto del botón es el opuesto al
// estado actual, ya que hace clic en el botón para cambiar de estado.
var chartTypeToggleButton1 = ToggleButton1(
    [
      {
        label: 'Ver resultados como tabla',
        value: makeResultsColumnChart,
      },
      {
        label: 'Ver resultados como gráfico',
        value: makeResultsTable1,
      }
    ],
    updateColChart);
// Un panel que contiene los dos botones.
var buttonPanel1 = ui.Panel(
    [ui.Button('Limpiar Selección', clearResults1), chartTypeToggleButton1],
    ui.Panel.Layout.Flow('horizontal'), {margin: '0 0 0 auto', width: '350px'});
var resultsPanel1 = ui.Panel({style: {position: 'top-right'}});
sidePanel.add(resultsPanel1);
clearResults1();
// ################################### Tercer gráfico (Columna PUT)
// Devuelve la lista de departamentos que corresponde a tablas que el usuario ha seleccionado.
function getSelectedCountries2() {
  return countries_PUT.filterBounds(ee.Geometry.MultiPoint(selectedPoints));
}
// Hace un gráfico de Columna de la FeatureCollection de tabla de departamentos por nombre.
function makeResultsPUTChart(countries_PUT) {
  var chartPUT = ui.Chart.feature.byFeature(countries_PUT, 'DPTO_DESC');
  chartPUT.setChartType('ColumnChart');
  chartPUT.setOptions({
    title: 'Comparativo de datos por PUT',
    colors: ['#cc9e42','#f504ff'],
    vAxis: {title: null},
    hAxis: {title: 'Hectareas (ha) de cambio (PUT)', minValue: 0}
  });
  chartPUT.style().set({stretch: 'both'});
  return chartPUT;
}
// Hace una tabla de la FeatureCollection dada de departamentos por nombre.
function makeResultsTable2(countries_PUT) {
  var table2 = ui.Chart.feature.byFeature(countries_PUT, 'DPTO_DESC');
  table2.setChartType('Table');
  table2.setOptions({allowHtml: true, pageSize: 5});
  table2.style().set({stretch: 'both'});
  return table2;
}
// Actualiza el gráfico utilizando la función de gráfico seleccionada actualmente,
function updatePUTChart() {
  var chartPUTBuilder = chartTypeToggleButton2.value;
  var PUT = chartPUTBuilder(getSelectedCountries2());
  resultsPanel2.clear().add(PUT).add(buttonPanel2);
}
// Borra el conjunto de puntos seleccionados y restablece la superposición y los resultados
// panel a su estado predeterminado.
function clearResults2() {
  selectedPoints = [];
  mapPanel.layers().remove(mapPanel.layers().get(6));
  var instructionsLabel2 = ui.Label('Datos de Cambio de Uso con PUT');
  resultsPanel2.widgets().reset([instructionsLabel2]);
}
// Registre un controlador de clic para el mapa que agrega el punto en el que se hizo clic al
// enumera y actualiza la superposición del mapa y el gráfico en consecuencia.
function handleMapClick2(location) {
  selectedPoints.push([location.lon, location.lat]);
  updatePUTChart();
}
mapPanel.onClick(handleMapClick2);
// Un widget de botón que alterna (o cicla) entre estados.
// Para construir un ToggleButton, proporcione una matriz de objetos que describan
// los estados deseados, cada uno con las propiedades 'etiqueta' y 'valor'.
function ToggleButton2(states, onClick) {
  var index = 0;
  var button2 = ui.Button(states[index].label);
  button2.value = states[index].value;
  button2.onClick(function() {
    index = ++index % states.length;
    button2.setLabel(states[index].label);
    button2.value = states[index].value;
    onClick();
  });
  return button2;
}
// Nuestro botón de alternancia de tipo de gráfico: el texto del botón es el opuesto al
// estado actual, ya que hace clic en el botón para cambiar de estado.
var chartTypeToggleButton2 = ToggleButton2(
    [
      {
        label: 'Ver resultados como tabla',
        value: makeResultsPUTChart,
      },
      {
        label: 'Ver resultados como gráfico',
        value: makeResultsTable2,
      }
    ],
    updatePUTChart);
// Un panel que contiene los dos botones.
var buttonPanel2 = ui.Panel(
    [ui.Button('Limpiar Selección', clearResults2), chartTypeToggleButton2],
    ui.Panel.Layout.Flow('horizontal'), {margin: '0 0 0 auto', width: '350px'});
var resultsPanel2 = ui.Panel({style: {position: 'top-left'}});
sidePanel.add(resultsPanel2);
clearResults2();
// ################################### Cuarto gráfico (Cobertura Forestal)
// Devuelve la lista de departamentos que corresponde a tablas que el usuario ha seleccionado.
function getSelectedCountries3() {
  return countries_CF.filterBounds(ee.Geometry.MultiPoint(selectedPoints));
}
// Hace un gráfico de Barra de la FeatureCollection de tabla de departamentos por nombre.
function makeResultsCFChart(countries_CF) {
  var chartCF = ui.Chart.feature.byFeature(countries_CF, 'DPTO_DESC');
  chartCF.setChartType('PieChart');
  chartCF.setOptions({
    title: 'Comparativo de datos de Cobertura Forestal',
    colors: ['green'],
    vAxis: {title: null},
    hAxis: {title: 'Hectareas (ha) de cobertura forestal', minValue: 0}
  });
  chartCF.style().set({stretch: 'both'});
  return chartCF;
}
// Hace una tabla de la FeatureCollection dada de departamentos por nombre.
function makeResultsTable3(countries_CF) {
  var table2 = ui.Chart.feature.byFeature(countries_CF, 'DPTO_DESC');
  table2.setChartType('Table');
  table2.setOptions({allowHtml: true, pageSize: 5});
  table2.style().set({stretch: 'both'});
  return table2;
}
// Actualiza el gráfico utilizando la función de gráfico seleccionada actualmente,
function updateCFChart() {
  var chartCFBuilder = chartTypeToggleButton3.value;
  var CF = chartCFBuilder(getSelectedCountries3());
  resultsPanel3.clear().add(CF).add(buttonPanel3);
}
// Borra el conjunto de puntos seleccionados y restablece la superposición y los resultados
// panel a su estado predeterminado.
function clearResults3() {
  selectedPoints = [];
  mapPanel.layers().remove(mapPanel.layers().get(6));
  var instructionsLabel3 = ui.Label('Cobertura Forestal Total (2018)');
  resultsPanel3.widgets().reset([instructionsLabel3]);
}
// Registre un controlador de clic para el mapa que agrega el punto en el que se hizo clic al
// enumera y actualiza la superposición del mapa y el gráfico en consecuencia.
function handleMapClick3(location) {
  selectedPoints.push([location.lon, location.lat]);
  updateCFChart();
}
mapPanel.onClick(handleMapClick3);
// Un widget de botón que alterna (o cicla) entre estados.
// Para construir un ToggleButton, proporcione una matriz de objetos que describan
// los estados deseados, cada uno con las propiedades 'etiqueta' y 'valor'.
function ToggleButton3(states, onClick) {
  var index = 0;
  var button3 = ui.Button(states[index].label);
  button3.value = states[index].value;
  button3.onClick(function() {
    index = ++index % states.length;
    button3.setLabel(states[index].label);
    button3.value = states[index].value;
    onClick();
  });
  return button3;
}
// Nuestro botón de alternancia de tipo de gráfico: el texto del botón es el opuesto al
// estado actual, ya que hace clic en el botón para cambiar de estado.
var chartTypeToggleButton3 = ToggleButton3(
    [
      {
        label: 'Ver resultados como tabla',
        value: makeResultsCFChart,
      },
      {
        label: 'Ver resultados como gráfico',
        value: makeResultsTable3,
      }
    ],
    updateCFChart);
// Un panel que contiene los dos botones.
var buttonPanel3 = ui.Panel(
    [ui.Button('Limpiar Selección', clearResults3), chartTypeToggleButton3],
    ui.Panel.Layout.Flow('horizontal'), {margin: '0 0 0 auto', width: '350px'});
var resultsPanel3 = ui.Panel({style: {position: 'bottom-left'}});
sidePanel.add(resultsPanel3);
clearResults3();
/*
 * El panel de leyenda en la parte inferior izquierda
 */
// Un widget de barra de colores. Hace una barra de color horizontal para mostrar la
// paleta de color.
function ColorBar(palette) {
  return ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: {
      bbox: [0, 0, 1, 0.1],
      dimensions: '100x10',
      format: 'png',
      min: 0,
      max: 1,
      palette: palette,
    },
    style: {stretch: 'horizontal', margin: '0px 8px'},
  });
}
// Devuelve nuestra leyenda etiquetada, con una barra de color y tres etiquetas que representan
// los valores mínimo, medio y máximo.
function makeLegend() {
  var labelPanel = ui.Panel(
      [
        ui.Label(Math.round(undoColorStretch(0)), {margin: '2px 8px'}),
        ui.Label(
            Math.round(undoColorStretch(0.5)),
            {margin: '2px 8px', textAlign: 'center', stretch: 'horizontal'}),
        ui.Label(Math.round(undoColorStretch(1)), {margin: '2px 8px'})
      ],
      ui.Panel.Layout.flow('horizontal'));
  return ui.Panel([ColorBar(Departamento_STYLE.palette), labelPanel]);
}
// Estilo para el título de la leyenda.
var LEGEND_TITLE_STYLE = {
  fontSize: '12px',
  fontWeight: 'bold',
  stretch: 'horizontal',
  textAlign: 'center',
  margin: '4px',
};
// Estilo para las notas al pie de la leyenda.
var LEGEND_FOOTNOTE_STYLE = {
  fontSize: '10px',
  stretch: 'horizontal',
  textAlign: 'center',
  margin: '4px',
};
// Ensamblar el panel de leyenda.
sidePanel.add(ui.Panel(
    [
      ui.Label('Magnitud de Cambio de uso', LEGEND_TITLE_STYLE), makeLegend(),
      ui.Label(
          'Bajo       Medio        Alto', LEGEND_FOOTNOTE_STYLE),
      ui.Label(
          'Fuente: Sistema Nacional de Monitoreo Forestal (SNMF)', LEGEND_FOOTNOTE_STYLE),
      ui.Label('Departamentos: DGEEC', LEGEND_FOOTNOTE_STYLE)
    ],
    ui.Panel.Layout.flow('vertical'),
    {width: '450px', position: 'bottom-center'}));
//