var table = ui.import && ui.import("table", "table", {
      "id": "users/arpitashalini4/JoinedIndia"
    }) || ee.FeatureCollection("users/arpitashalini4/JoinedIndia");
var india = ee.FeatureCollection ('users/arpitashalini4/JoinedIndia')
Map.addLayer(india, {}, 'India')
Map.setCenter(78.6508427310777, 23.50103314348388, 4)     
var totaldose = india
  .filter(ee.Filter.notNull(['Vaccine_Do']))
  .reduceToImage({
    properties: ['Vaccine_Do'],
    reducer: ee.Reducer.first()
  });
var DOSE_STYLE = {
  min: 0,
  max: 1,
  palette:['lightyellow', 'steelblue', 'darkblue']
};
var DOSE_VIS_MAX_VALUE = 20000000;
var DOSE_VIS_NONLINEARITY = 4;
var COUNTRIES_STYLE = {color: '26458d', fillColor: '00000000'};
var HIGHLIGHT_STYLE = {color: '8856a7', fillColor: '8856a7C0'};
function colorStretch(image) {
  return image.divide(DOSE_VIS_MAX_VALUE)
      .pow(1/DOSE_VIS_NONLINEARITY );
}
function undoColorStretch(val) {
  return Math.pow(val, DOSE_VIS_NONLINEARITY) * DOSE_VIS_MAX_VALUE;
}
Map.addLayer(colorStretch(totaldose.unmask(0).updateMask(1)), DOSE_STYLE);
Map.add(ui.Label(
  'COVID-19 Vaccine Explorer - India', {fontWeight: 'bold', fontSize: '24px'}));
var selectedPoints = [];
function getSelectedStates() {
  return india.filterBounds(ee.Geometry.MultiPoint(selectedPoints));
}
print(india);
var india = india.select(['ST_NM', 'Vaccine_Do'])
function makeResultsBarChart(states) {
  var chart = ui.Chart.feature.byFeature(states, 'ST_NM');
  chart.setChartType('BarChart');
  chart.setOptions({
    title: 'Dose Comparison',
    vAxis: {title: 'ST_NM'},
    hAxis: {title: 'Total Doses', minValue: 0}
  });
  chart.style().set({stretch: 'both'});
  return chart;
}
print ('India', india)
function makeResultsTable(states) {
  var table = ui.Chart.feature.byFeature(states, 'ST_NM', 'Vaccine_Do');
  table.setChartType('Table');
  table.setOptions({allowHtml: true, pageSize: 5});
  table.style().set({stretch: 'both'});
  table.fil
  return table;
}
var HIGHLIGHT_STYLE = {color: '8856a7', fillColor: '8856a7C0'};
function updateOverlay() {
  var overlay = getSelectedStates().style(HIGHLIGHT_STYLE);
  Map.layers().set(2, ui.Map.Layer(overlay));
}
function updateChart(){
  var chartBuilder = chartTypeToggleButton.value;
  var chart = chartBuilder(getSelectedStates());
  resultsPanel.clear().add(chart).add(buttonPanel);
}
function clearResults() {
  selectedPoints = [];
  Map.layers().remove(Map.layers().get(2));
  var instructionsLabel = ui.Label('Select regions to compare doses.');
  resultsPanel.widgets().reset([instructionsLabel]);
}
function handleMapClick(location) {
  selectedPoints.push([location.lon, location.lat]);
  updateOverlay();
  updateChart();
}
Map.onClick(handleMapClick);
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
var chartTypeToggleButton = ToggleButton(
  [
    {
      label: 'Display results as table',
      value: makeResultsBarChart,
    },
    {
      label: 'Display results as Chart',
      value: makeResultsTable,
    }
  ],
  updateChart);
var buttonPanel = ui.Panel(
  [ui.Button('Clear Results', clearResults), chartTypeToggleButton],
  ui.Panel.Layout.Flow('horizontal'), {margin: '0 0 0 auto', width: '500px'});
var resultsPanel = ui.Panel({style: {position: 'bottom-right'}});
Map.add(resultsPanel);
clearResults();
function ColorBar(palette) {
  return ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: {
      bbox:[0, 0, 1, 0.1],
      dimensions: '100x10',
      format: 'png',
      min: 0,
      max: 1,
      palette: palette,
    },
    style:{stretch: 'horizontal', margin: '0px 8px'}, 
  });
}
//Returns our labeled legend, with a color bar and three labels representing
//the minimum, middle, and maximum values.
function makeLegend(){
  var labelPanel = ui.Panel(
    [
      ui.Label(Math.round(undoColorStretch(0)), {margin: '4px 8px'}),
      ui.Label(
        Math.round(undoColorStretch(0.5)),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
      ui.Label(Math.round(undoColorStretch(1)), {margin: '4px 8px'})
      ],
      ui.Panel.Layout.flow('horizontal'));
  return ui.Panel([ColorBar(DOSE_STYLE.palette), labelPanel]);
}
//Styling for the legend title.
var LEGEND_TITLE_STYLE = {
  fontSize: '20px',
  fontWeight: 'bold',
  stretch: 'horizontal',
  textAlign: 'center',
  margin: '4px'
};
//Styling for the legend footnotes.
var LEGEND_FOOTNOTE_STYLE = {
  fontSize: '10px',
  stretch: 'horizontal',
  textAlign: 'center',
  margin: '4px',
};
//Assemble the legend panel
Map.add(ui.Panel(
  [
    ui.Label('Number of COVID-19 Doses', LEGEND_TITLE_STYLE), makeLegend()
  ],
  ui.Panel.Layout.flow('vertical'),
  {width: '230px', position: 'bottom-left'}));