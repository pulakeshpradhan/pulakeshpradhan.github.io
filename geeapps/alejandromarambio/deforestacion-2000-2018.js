var mun = ee.FeatureCollection("users/alejandromarambio/municipios");
//by Keiko
// Tree loss from Hansen data v1.6
var GFC2018 = ee.Image('UMD/hansen/global_forest_change_2018_v1_6');
var treecover = GFC2018.select('treecover2000');
var loss = GFC2018.select('lossyear');
var lossyear = loss.mask(loss);
var count = lossyear.eq([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]).rename(['2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016','2017','2018']);
var total = count.multiply(ee.Image.pixelArea()).divide(10000);
// Muncipios
var protectedAreas = mun.filterMetadata('MUN_NOM','not_equals','Los Petenes');
/*
 * Visualization and styling
 */
// Constants used to visualize the data on the map.
var LOSS_STYLE = {min: 1, max: 18,palette: ['red']};
var LOSS_VIS_MAX_VALUE = 18;
var LOSS_VIS_NONLINEARITY = 1;
var PA_STYLE = {color: '#333333', width: 1, fillColor: '00000000'};
var HIGHLIGHT_STYLE = {color: '#808080', fillColor: '#808080C0'}; 
// Configure our map with a minimal set of controls.
Map.setControlVisibility(false);
Map.setControlVisibility({scaleControl: true, zoomControl: false});
Map.style().set({cursor: 'crosshair'});
// Add base layers to the map
Map.addLayer(GFC2018, {bands: ['treecover2000'],  palette: ['000000', '00FF00'],  max: 100}, 'Cobertura Forestal');
Map.addLayer(loss.mask(loss), LOSS_STYLE,'Deforestación');
Map.addLayer(protectedAreas.style(PA_STYLE));
Map.setCenter(-89, 20, 8);
// A list of points the user has clicked on, as [lon,lat] tuples.
var selectedPoints = [];
// Returns the list of protected areas the user has selected.
function getSelectedProtectedAreas() {
  return protectedAreas.filterBounds(ee.Geometry.MultiPoint(selectedPoints));
}
// Makes a bar chart of the given FeatureCollection of protected areas by name.
function makeResultsBarChart(protectedAreas) {
  var chart = ui.Chart.image.regions({image:total,regions:protectedAreas,reducer:ee.Reducer.sum(),seriesProperty:'NOM_MUN'})
  .setChartType('ColumnChart');
  chart.setOptions({
    title: 'DEFORESTACIÓN',
    vAxis: {title: 'hectareas'},
    hAxis: {title: 'año', minValue: 1},
    width: 1000,
    height: 300
  });
  chart.style().set({stretch: 'both'});
  return chart;
}
// Updates the map overlay using the currently-selected protected area.
function updateOverlay() {
  var overlay = getSelectedProtectedAreas().style(HIGHLIGHT_STYLE);
  Map.layers().set(3, ui.Map.Layer(overlay));
}
// Updates the chart using the currently-selected charting function,
function updateChart() {
  var chartBuilder = chartTypeToggleButton.value;
  var chart = chartBuilder(getSelectedProtectedAreas());
  resultsPanel.clear().add(chart).add(buttonPanel);
}
// Clears the set of selected points and resets the overlay and results
// panel to their default state.
function clearResults() {
  selectedPoints = [];
  Map.layers().remove(Map.layers().get(3));
  var instructionsLabel = ui.Label('Marambio A. 2019 | UNAM Posgrado');
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
        label: 'Display results as table',
        value: makeResultsBarChart,
      },
      {
      }
    ],
    updateChart);
// A panel containing the two buttons .
var buttonPanel = ui.Panel(
    [ui.Button('Reinicia', clearResults)],//('Display Table',makeResultsTable)
    ui.Panel.Layout.Flow('horizontal'), {margin: '0 0 0 auto', width: '600px', height: 'auto'});
var resultsPanel = ui.Panel({style: {position: 'bottom-left'}});
Map.add(resultsPanel);
clearResults();
// Below can be made better
// Create an inspector panel with a horizontal layout.
var inspector = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal')
});
// Add a label to the panel.
inspector.add(ui.Label('Selecciona Municipio',{fontWeight: 'bold', fontSize: '14px'}));
// Add the panel to the default map.
Map.add(inspector);
// Set the default map's cursor to a "crosshair".
Map.style().set('cursor', 'crosshair');
// Register a callback on the map to be invoked when the map is clicked.
Map.onClick(function(coords) {
// Clear the panel and show a loading message.
  inspector.clear();
  inspector.style().set('shown', true);
  inspector.add(ui.Label('Loading...', {color: 'gray'}));
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var PApoint = protectedAreas.filterBounds(point);
  var o_name = ee.List(PApoint.aggregate_array("COD")).map(function(d) {return ee.String(d)});
  var status = ee.List(PApoint.aggregate_array("NOM_MUN")).map(function(d) {return ee.String(d)});
  var list = ee.List([o_name,status]);
  list.evaluate(function(info) {
    inspector.clear();
    // Add a label with the results from the server.
    inspector.add(ui.Label({
      value: info,
      style: {position:'top-center'}
    }));
  });
});
// 
var add_legend = function(title, lbl, pal) {
  var legend = ui.Panel({style: {position: 'bottom-right'}}), entry;
  legend.add(ui.Label({value: title, style: { fontWeight: 'bold', fontSize: '18px', margin: '0 0 4px 0', padding: '0px' } }));
  for (var x = 0; x < lbl.length; x++){
    entry = [ ui.Label({style:{color: pal[x], margin: '0 0 4px 0'}, value: '██'}),
      ui.Label({ value: labels[x], style: { margin: '0 0 4px 4px' } }) ];
    legend.add(ui.Panel(entry, ui.Panel.Layout.Flow('horizontal')));
  } Map.add(legend); };
// legend
var palette = ['red','#5e5e5e'];
var labels = ['Deforestación 2000-2018 (Hansen)','Municipios'];
add_legend('', labels, palette);