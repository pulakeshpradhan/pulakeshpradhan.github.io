// Took full advantage of examples provided by 
// Earth Engine (e.g. "Population Explorer").
// Minimum effort was made to customise/optimise 
// the functions or change the appeareance. 
// Displays annual tree loss by protected area in chart form.
// Tree loss from Hansen data v1.6.
var loss = ee.Image('UMD/hansen/global_forest_change_2018_v1_6').select('lossyear');
var lossyear = loss.mask(loss);
var count = lossyear.eq([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]).rename(['2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016','2017','2018']);
var total = count.multiply(ee.Image.pixelArea()).divide(10000);
// Protected area data (the World Database on Protected Areas (WDPA)) from WCMC.
var protectedAreas = ee.FeatureCollection(
    'WCMC/WDPA/current/polygons').filterMetadata('SUB_LOC','equals',"MX-ROO");
/*
 * Visualization and styling
 */
// Constants used to visualize the data on the map.
var LOSS_STYLE = {
  min: 1,
  max: 18,
  palette: ['red']
};
var LOSS_VIS_MAX_VALUE = 18;
var LOSS_VIS_NONLINEARITY = 1;
var PA_STYLE = {color: '26458d', fillColor: '00000000'};
var HIGHLIGHT_STYLE = {color: '8856a7', fillColor: '8856a7C0'};
// Configure our map with a minimal set of controls.
Map.setControlVisibility(false);
Map.setControlVisibility({scaleControl: true, zoomControl: true});
Map.style().set({cursor: 'crosshair'});
Map.setCenter(-88, 20, 8);
// Add our two base layers to the map: tree loss and protected areas.
Map.addLayer(loss.mask(loss), LOSS_STYLE);
Map.addLayer(protectedAreas.style(PA_STYLE));
// Create the application title bar.
//Map.add(ui.Label(
//    'Annual tree loss in protected areas', {fontWeight: 'bold', fontSize: '20px'}));
/*
 * The chart panel in the bottom-right
 */
// A list of points the user has clicked on, as [lon,lat] tuples.
var selectedPoints = [];
// Returns the list of protected areas the user has selected.
function getSelectedProtectedAreas() {
  return protectedAreas.filterBounds(ee.Geometry.MultiPoint(selectedPoints));
}
// Makes a bar chart of the given FeatureCollection of protected areas by name.
function makeResultsBarChart(protectedAreas) {
  var chart = ui.Chart.image.regions({image:total,regions:protectedAreas,reducer:ee.Reducer.sum(),seriesProperty:'ORIG_NAME'})
  .setChartType('ColumnChart');
  chart.setOptions({
    title: 'Perdida de arboles (Deforestación)',
    vAxis: {title: 'Hectáreas'},
    hAxis: {title: 'Año', minValue: 1},
    width: 1000,
    height: 300
  });
  chart.style().set({stretch: 'both'});
  return chart;
}
/*
// I think adding a table is redundant - disabled for now
// Makes a table of the given FeatureCollection of protected areas by name.
function makeResultsTable(protectedAreas) {
  var table = ui.Chart.image.regions({image:total,regions:protectedAreas,reducer:ee.Reducer.sum(),seriesProperty:'ORIG_NAME'});
  table.setChartType('Table');
  table.setOptions({allowHtml: true, pageSize: 5});
  table.style().set({stretch: 'both'});
  return table;
}
*/
// Updates the map overlay using the currently-selected protected area.
function updateOverlay() {
  var overlay = getSelectedProtectedAreas().style(HIGHLIGHT_STYLE);
  Map.layers().set(2, ui.Map.Layer(overlay));
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
  Map.layers().remove(Map.layers().get(2));
  var instructionsLabel = ui.Label('Perdida anual de arboles en Áreas Naturales Protegidas');
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
        label: 'Resultados en tabla',
        value: makeResultsBarChart,
      },
      {
      //(in case you want the table)
      //label: 'Display results as chart',
      //  value: makeResultsTable,
      }
    ],
    updateChart);
// A panel containing the two buttons .
var buttonPanel = ui.Panel(
    [ui.Button('Limpiar resultados', clearResults)],//('Display Table',makeResultsTable)
    ui.Panel.Layout.Flow('horizontal'), {margin: '0 0 0 auto', width: '600px', height: 'auto'});
var resultsPanel = ui.Panel({style: {position: 'bottom-right'}});
Map.add(resultsPanel);
clearResults();
// Below can be made better
// Create an inspector panel with a horizontal layout.
var inspector = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal')
});
// Add a label to the panel.
inspector.add(ui.Label('Seleccióna un Área Natural Protegida',{fontWeight: 'bold', fontSize: '20px'}));
// Add the panel to the default map.
Map.add(inspector);
// Set the default map's cursor to a "crosshair".
Map.style().set('cursor', 'crosshair');
// Register a callback on the map to be invoked when the map is clicked.
Map.onClick(function(coords) {
  // Clear the panel and show a loading message.
  inspector.clear();
  inspector.style().set('shown', true);
  inspector.add(ui.Label('Cargando...', {color: 'gray'}));
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var PApoint = protectedAreas.filterBounds(point);
  var o_name = ee.List(PApoint.aggregate_array("ORIG_NAME")).map(function(d) {return ee.String(d)});
  var status = ee.List(PApoint.aggregate_array("STATUS")).map(function(d) {return ee.String(d)});
  var y_status = ee.List(PApoint.aggregate_array("STATUS_YR")).map(function(d) {return ee.Number(d)});
  var type = ee.List(PApoint.aggregate_array("DESIG_ENG")).map(function(d) {return ee.String(d)});
  var list = ee.List([o_name,type,status,y_status]);
  list.evaluate(function(info) {
    inspector.clear();
    // Add a label with the results from the server.
    inspector.add(ui.Label({
      value: info,
      style: {position:'top-center'}
    }));
   // Add a button to hide the Panel.
    inspector.add(ui.Button({
      label: 'Cerrar',
      onClick: function() {
        inspector.style().set('shown', false);
      }
    }));
  });
});
// Below can be better, too
var add_legend = function(title, lbl, pal) {
  var legend = ui.Panel({style: {position: 'bottom-left'}}), entry;
  legend.add(ui.Label({value: title, style: { fontWeight: 'bold', fontSize: '18px', margin: '0 0 4px 0', padding: '0px' } }));
  for (var x = 0; x < lbl.length; x++){
    entry = [ ui.Label({style:{color: pal[x], margin: '0 0 4px 0'}, value: '██'}),
      ui.Label({ value: labels[x], style: { margin: '0 0 4px 4px' } }) ];
    legend.add(ui.Panel(entry, ui.Panel.Layout.Flow('horizontal')));
  } Map.add(legend); };
// crop intensity
var palette = ['red','26458d'];
var labels = ['Perdida de Arbolado/Deforestación (Hansen v1.6)','Áreas Naturales Protegidas (UNEP-WCMC)'];
add_legend('', labels, palette);