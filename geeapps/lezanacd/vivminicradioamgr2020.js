var table = ui.import && ui.import("table", "table", {
      "id": "users/lezanacd/munipb2010"
    }) || ee.FeatureCollection("users/lezanacd/munipb2010"),
    table2 = ui.import && ui.import("table2", "table", {
      "id": "users/lezanacd/chapb2010"
    }) || ee.FeatureCollection("users/lezanacd/chapb2010"),
    table3 = ui.import && ui.import("table3", "table", {
      "id": "users/lezanacd/mmuvra2019"
    }) || ee.FeatureCollection("users/lezanacd/mmuvra2019");
/*
var ghslPop = ee.Image('JRC/GHSL/P2016/POP_GPW_GLOBE_V1/2015');
var ghslPoprecorte = ghslPop.clip(table2);
*/
var dpto_style = {width:5, fillColor: ' #ffffff44'};
/* Diccionario de municipios*/
var dic_munic = {
'BARRANQUERAS' : ['0385'],
'FONTANA' : ['0399'],
'PUERTO VILELAS' : ['0406'],
'RESISTENCIA' : ['0413']
}
var dicobjetos = {
  select:{
    munic: ui.Select({
    items: Object.keys(dic_munic).sort(), 
    placeholder:'Seleccione Municipio', 
    onChange: function(k){
    (table.filter(ee.Filter.inList('NOMMUNI_C_', [k])))
    //Map.centerObject(table.filter(ee.Filter.inList('NOMMUNI_C_', [k])), 10)
    }}),
    label3: ui.Label('Municipio:', {})
    }
  }
//Objetos del panel
var panelv = ui.Panel({widgets:[
dicobjetos.select.munic], layout: ui.Panel.Layout.Flow('horizontal'), style: {backgroundColor: '00000000'}});
var k = (dicobjetos.select.munic.getValue());
//var i = (dicobjetos.select.frac.getValue());
/*
-----------------------------------
Boton de Municipio
-----------------------------------
*/
var boton = ui.Button({label:'ver municipio', onClick:function(k){
  print( dicobjetos.select.munic.getValue()),
  k = (dicobjetos.select.munic.getValue()),
  print(k),
  Map.addLayer(table.filter(ee.Filter.inList('NOMMUNI', [k])).style(dpto_style))
  Map.centerObject(table.filter(ee.Filter.inList('NOMMUNI', [dicobjetos.select.munic.getValue()])))
}})
/*
-----------------------------------
Boton de limpiar
-----------------------------------
*/
var boton2 = ui.Button({label:'Limpiar', onClick:function(p){
 Map.clear();
 Map.add(panel)
}})
//Panel Principal
var panel = ui.Panel({widgets:[
panelv,  
//dicobjetos.label,
//dicobjetos.label2,
boton, boton2], layout: ui.Panel.Layout.Flow('vertical'), style: {backgroundColor: '00005555', position: 'bottom-right'}})
Map.add(panel)
/*SCRIP COMPARACION DE RADIOS*/
var radios = ee.FeatureCollection('users/lezanacd/vivxrad_22')
            .filterBounds(table3);
/*var mask_urbano = function(j){
  var urbanob = j.median(['B12','B11','B4'])
  j = j.addBands(urbanob.rename('analisis_urbano'))
  return j.clip(table2)
};*/
/*            
var urbano = ee.ImageCollection('COPERNICUS/S2')
                  .filterDate('2020-08-01', '2020-08-30')
                  .filterBounds(table2)
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 5))
                 //recorto con interseccion de los poligonos del shp importafo como table2
                  .map(function(imagen_22){return imagen_22.clip(table2)})
*/
//var urbanoband =  {min:0, max:3000 , bands :['B12','B11','B4']}; 
//var urbanoband = {bands :['analisis_urbano'],min: -1, max : 1, palette:['blue','green','yellow','orange','red','purple']};
/*var radios = ee.FeatureCollection(table2,'LINK')
            .filterBounds(table2);*/
Map.centerObject(table3,8);
// Constants used to visualize the data on the map.
var POPULATION_STYLE = {
  min: 0,
  max: 1,
  palette: ['lightyellow', 'steelblue', 'darkblue'],
  Opacity: 10
};
var POPULATION_VIS_MAX_VALUE = 10000;
var POPULATION_VIS_NONLINEARITY = 4;
var COUNTRIES_STYLE = {color: '26458d', fillColor: '00000000'};
var HIGHLIGHT_STYLE = {color: '8856a7', fillColor: '8856a7C0'};
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
Map.setControlVisibility(true);
Map.setControlVisibility({scaleControl: true, zoomControl: true});
Map.style().set({cursor: 'crosshair'});
//Map.setCenter(0, 20, 3);
// Add our two base layers to the map: global population density and countries.
//Map.addLayer(colorStretch(ghslPoprecorte.unmask(0).updateMask(1)), POPULATION_STYLE);
//Map.addLayer(urbano, urbanoband , 'Urbano');
Map.addLayer(radios.style(COUNTRIES_STYLE));
// Create the application title bar.
//Map.add(ui.Label(
//    'VIVIENDAS PRE-CNPVyH 2022', {fontWeight: 'bold', fontSize: '24px'}));
// A list of points the user has clicked on, as [lon,lat] tuples.
var selectedPoints = [];
// Returns the list of countries the user has selected.
function getSelectedRadios() {
  return radios.filterBounds(ee.Geometry.MultiPoint(selectedPoints));
}
// Makes a bar chart of the given FeatureCollection of countries by name.
function makeResultsBarChart(radios) {
  var chart = ui.Chart.feature.byFeature(radios,'LINK','SUMADETOTA');
  chart.setChartType('BarChart');
  chart.setOptions({
    title: 'Comparación de viviendas',
    vAxis: {title: null},
    hAxis: {title: 'Viviendas relevadas por radio 2021-22 (CANT)', minValue: 0}
  });
  chart.style().set({stretch: 'both'});
  return chart;
}
// Makes a table of the given FeatureCollection of countries by name.
function makeResultsTable(radios) {
  var tablerd = ui.Chart.feature.byFeature(radios,'LINK');
  tablerd.setChartType('Table');
  tablerd.setOptions({allowHtml: true, pageSize: 5});
  tablerd.style().set({stretch: 'both'});
  return tablerd;
}
// Updates the map overlay using the currently-selected countries.
function updateOverlay() {
  var overlay = getSelectedRadios().style(HIGHLIGHT_STYLE);
  Map.layers().set(2, ui.Map.Layer(overlay));
}
// Updates the chart using the currently-selected charting function,
function updateChart() {
  var chartBuilder = chartTypeToggleButton.value;
  var chart = chartBuilder(getSelectedRadios());
  resultsPanel.clear().add(chart).add(buttonPanel);
}
// Clears the set of selected points and resets the overlay and results
// panel to their default state.
function clearResults() {
  selectedPoints = [];
  Map.layers().remove(Map.layers().get(2));
  var instructionsLabel = ui.Label('Seleccione el radio para comparar cant. viviendas.');
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
        label: 'Mostrar resultados como tabla',
        value: makeResultsBarChart,
      },
      {
        label: 'Mostrar resultados como grafico',
        value: makeResultsTable,
      }
    ],
    updateChart);
// A panel containing the two buttons .
var buttonPanel = ui.Panel(
    [ui.Button('Limpiar Resultados', clearResults), chartTypeToggleButton],
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
      ui.Label('Cantidad de viviendas', LEGEND_TITLE_STYLE), makeLegend(),
      ui.Label(
          '(Total de viviendas por radio)', LEGEND_FOOTNOTE_STYLE),
      ui.Label(
          'Fuente: Censo Nacional de Población y Hogares 2022 (INDEC)', LEGEND_FOOTNOTE_STYLE),
      ui.Label('Cobertura de Radios del CNPVyH - 2022', LEGEND_FOOTNOTE_STYLE)
    ],
    ui.Panel.Layout.flow('vertical'),
    {width: '230px', position: 'bottom-left'}));