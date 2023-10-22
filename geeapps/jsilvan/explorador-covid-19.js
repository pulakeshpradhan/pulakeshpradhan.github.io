/* Despliega el número de contagios activos desagregados a pixeles de 100x100 en proporción 
a la intensidad de luces nocturnas captadas con el sensor VIIRS.
Adaptado del Explorador de Población Global de GEE
*/
/*
 * Fuentes
 */
// Densidad de casos activos por KM2
var ghslPop = ee.Image('users/jsilvan/COVID-19/MEX200610_ACTVIIRS');
// Capa de municipios con casos precalculados
var mun = ee.FeatureCollection('users/jsilvan/COVID-19/MEX200610_MUN');
var refDate = '10-jun-2020';
var lastUpdate = '19-jun-2020';
//print(mun.limit(10));
/*
 * Define variables de estilo de visualización
 */
// Constants used to visualize the data on the map.
var POPULATION_STYLE = {
  min: 0,
  max: 1,
  opacity: 0.5,
  palette: ['white','lightyellow','yellow','orange', 'red', 'darkred']
};
var POPULATION_VIS_MAX_VALUE = 10;
var POPULATION_VIS_NONLINEARITY = 4;
var MUN_STYLE = {width: 0.5, color: '7b9acd', fillColor: '00000000'};
var HIGHLIGHT_STYLE = {color: '8856a7', fillColor: '8856a788'};
// Apply a non-linear stretch to the population data for visualization.
function colorStretch(image) {
  return image.divide(POPULATION_VIS_MAX_VALUE)
      .pow(1 / POPULATION_VIS_NONLINEARITY);
}
// Inverts the nonlinear stretch we apply to the population data for
// visualization, so that we can back out values to display in the legend.
// This uses ordinary JavaScript math functions, rather than Earth Engine
// functions, since we're going to call it from JS to compute label values.
function undoColorStretch(val) {
  return Math.pow(val, POPULATION_VIS_NONLINEARITY) * POPULATION_VIS_MAX_VALUE;
}
// Configure our map with a minimal set of controls.
Map.setControlVisibility(false);
Map.setControlVisibility({scaleControl: true, zoomControl: true});
Map.style().set({cursor: 'crosshair'});
Map.setCenter(-99.1804, 19.2784, 10);
// Add our two base layers to the map: global population density and countries.
Map.addLayer(colorStretch(ghslPop.unmask(0).updateMask(1)), POPULATION_STYLE);
Map.addLayer(mun.style(MUN_STYLE));
// Create the application title bar.
Map.add(ui.Label(
    'Explorador COVID-19', {fontWeight: 'bold', fontSize: '24px'}));
/*
 * The chart panel in the bottom-right
 */
// A list of points the user has clicked on, as [lon,lat] tuples.
var selectedPoints = [];
// Returns the list of countries the user has selected.
function getSelectedMun() {
  return mun.filterBounds(ee.Geometry.MultiPoint(selectedPoints));
}
// Makes a bar chart of the given FeatureCollection of countries by name.
function makeResultsBarChart(mun) {
  var chart = ui.Chart.feature.byFeature(mun, 'NOM_MUN',['ACTIVOS','PENDIENTES']);
  chart.setChartType('BarChart');
  chart.setOptions({
    title: 'Municipios seleccionados',
    vAxis: {title: null},
    hAxis: {title: 'Datos del '+ refDate, minValue: 0}
  });
  chart.style().set({stretch: 'both'});
  return chart;
}
// Makes a table of the given FeatureCollection of countries by name.
function makeResultsTable(mun) {
  var table = ui.Chart.feature.byFeature(mun, 'NOM_MUN');
  table.setChartType('Table');
  table.setOptions({allowHtml: true, pageSize: 5});
  table.style().set({stretch: 'both'});
  return table;
}
// Updates the map overlay using the currently-selected countries.
function updateOverlay() {
  var overlay = getSelectedMun().style(HIGHLIGHT_STYLE);
  Map.layers().set(2, ui.Map.Layer(overlay));
}
// Updates the chart using the currently-selected charting function,
function updateChart() {
  var chartBuilder = chartTypeToggleButton.value;
  var chart = chartBuilder(getSelectedMun());
  resultsPanel.clear().add(chart).add(buttonPanel);
}
// Clears the set of selected points and resets the overlay and results
// panel to their default state.
function clearResults() {
  selectedPoints = [];
  Map.layers().remove(Map.layers().get(2));
  var instructionsLabel = ui.Label('Selecciona municipios a comparar.');
  resultsPanel.widgets().reset([instructionsLabel]);
}
// Register a click handler for the map that adds the clicked point to the
// list and updates the map overlay and chart accordingly.
function handleMapClick(location) {
  selectedPoints.push([location.lon, location.lat]);
  updateOverlay();
  updateChart();
}
Map.onClick(handleMapClick);
// A button widget that toggles (or cycles) between states.
// To construct a ToggleButton, supply an array of objects describing
// the desired states, each with 'label' and 'value' properties.
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
// Our chart type toggle button: the button text is the opposite of the
// current state, since you click the button to switch states.
var chartTypeToggleButton = ToggleButton(
    [
      {
        label: 'Mostrar Tabla',
        value: makeResultsBarChart,
      },
      {
        label: 'Mostrar Gráfica',
        value: makeResultsTable,
      }
    ],
    updateChart);
// A panel containing the two buttons .
var buttonPanel = ui.Panel(
    [ui.Button('Deseleccionar todo', clearResults), chartTypeToggleButton],
    ui.Panel.Layout.Flow('horizontal'), {margin: '0 0 0 auto', width: '500px'});
var resultsPanel = ui.Panel({style: {position: 'bottom-right'}});
Map.add(resultsPanel);
clearResults();
/*
 * The legend panel in the bottom-left
 */
// A color bar widget. Makes a horizontal color bar to display the given
// color palette.
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
// Returns our labeled legend, with a color bar and three labels representing
// the minimum, middle, and maximum values.
function makeLegend() {
  var labelPanel = ui.Panel(
      [
        ui.Label(Math.round(undoColorStretch(0)), {margin: '4px 8px'}),
        ui.Label(
            Math.round(undoColorStretch(0.5)),
            {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
        ui.Label(Math.round(undoColorStretch(1)), {margin: '4px 8px'})
      ],
      ui.Panel.Layout.flow('horizontal'));
  return ui.Panel([ColorBar(POPULATION_STYLE.palette), labelPanel]);
}
// Styling for the legend title.
var LEGEND_TITLE_STYLE = {
  fontSize: '20px',
  fontWeight: 'bold',
  stretch: 'horizontal',
  textAlign: 'center',
  margin: '4px',
};
// Styling for the legend footnotes.
var LEGEND_FOOTNOTE_STYLE = {
  fontSize: '10px',
  stretch: 'horizontal',
  textAlign: 'center',
  margin: '4px',
};
// Assemble the legend panel.
Map.add(ui.Panel(
    [
      ui.Label('Densidad', LEGEND_TITLE_STYLE), makeLegend(),
      ui.Label(
          '(Casos por km2)', LEGEND_FOOTNOTE_STYLE),
      ui.Label(
          'Fuente: Imágen generada con datos de la Secretaría de Salud del '+
          lastUpdate +
          ' e imagenes de luces nocturnas de la NOAA/NCEI', LEGEND_FOOTNOTE_STYLE),
      ui.Label('Límites Municipales: INEGI 2010', LEGEND_FOOTNOTE_STYLE),
      ui.Label('por jsilvan',LEGEND_FOOTNOTE_STYLE,'https://jsilvan.users.earthengine.app/'),
    ],
    ui.Panel.Layout.flow('vertical'),
    {width: '230px', position: 'bottom-left'}));