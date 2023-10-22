var table = ui.import && ui.import("table", "table", {
      "id": "projects/inegi-datos/assets/entmx2018"
    }) || ee.FeatureCollection("projects/inegi-datos/assets/entmx2018");
// incluye paquete de visualización
var legends = require('users/jsilvan/tools:legends');
var gui = require('users/jsilvan/tools:gui');
// A list of points the user has clicked on, as [lon,lat] tuples.
var TITLE = 'Aguas Superficiales Globales';
var DESCR = 'Esta app se base en el conjunto de datos JRC Global Surface Water v1.4, el cual contiene mapas de la ubicación y distribución temporal de las aguas superficiales desde 1984 hasta 2021 y proporciona estadísticas sobre la extensión y el cambio de esas superficies de agua. Para obtener más información, consulte el artículo de revista asociado: High-resolution mapping of global surface water and its long-term changes (Nature, 2016) y la Guía de usuarios de datos en línea.\n\n' +
'Los datos JRC Global Surface Water Mapping Layers, v1.4 se generaron utilizando 4 716 475 escenas de Landsat 5, 7 y 8 adquiridas entre el 16 de marzo de 1984 y el 31 de diciembre de 2021. Cada píxel se clasificó individualmente en agua/no agua mediante un sistema experto y los resultados se recopilaron en un historial mensual. para todo el período de tiempo y dos épocas (1984-1999, 2000-2021) para la detección de cambios.\n\n'+
'Este producto de capas de mapeo consta de 1 imagen que contiene 7 bandas. Mapea diferentes facetas de la distribución espacial y temporal de las aguas superficiales durante los últimos 38 años. Las áreas donde nunca se ha detectado agua se enmascaran.';
var selectedPoints = [];
var levelIndex = 1;
var periodIndex = 0;
var levels = ['00mun_GSWHistStats','00ent_GSWHistStats','rha_GSWHistStats','00mex_GSWHistStats'];
var Columns = ['NOMGEO','CVEGEO','1990_S','2000_S','2010_S','2020_S'];
// Define los datos
var gsw = ee.Image("JRC/GSW1_4/GlobalSurfaceWater");
var units = ee.FeatureCollection('projects/ee-centrogeo/assets/' + levels[levelIndex]);
// vector de la cobertura
var outline = gsw
  .select('max_extent')
  .convolve(ee.Kernel.fixed(3,3,[[0,-1,0],[-1,4,-1],[0,-1,0]],1,1))
  .gt(0)
  .selfMask()
  .rename('max_extent');
// Define estilos
var TITLE_STYLE = {
  color: '555555',
  fontSize: '20px',
  fontWeight: 'bold',
  textAlign: 'center',
  width: '100'
};
var DESCR_STYLE = {
  fontSize: '11px',
  textAlign: 'left',
  margin: '0px 4px 8px 16px',
  whiteSpace: 'pre-wrap',
  stretch: 'horizontal'
};
var HEADER_STYLE = {
  fontSize: '14px',
  fontWeight: 'bold',
};
// objeto de propiedades de las capas
var layer = {
  transition: {
    visParams: {
      bands: ['transition'],
      min: 0,
      max: 10,
      palette: ['ffffff','0000ff','22b14c','d1102d','99d9ea','b5e61d',
        'e6a1aa','ff7f27','ffc90e','7f7f7f','c3c3c3'],
    },
    label: 'Transition classes (1984-2022)',
    visibility: false,
    classes: ['No change','Permanent','New permanent','Lost permanent','Seasonal',
      'New seasonal','Lost seasonal','Seasonal to permanent','Permanent to seasonal',
      'Ephemeral permanent','Ephemeral seasonal']
  },
  change_abs: {
    visParams: {
      bands: ['change_abs'],
      min:-100,
      max:100,
      palette: ['orange','white','blue'],
    },
    label: "Occurrence Change: 1984-1999 vs 2000-2021",
    visibility: false,
  },
  occurrence: {
    visParams: {
      bands: ['occurrence'],
      min:0,
      max:100,
      palette: ['#caffea','#76fbea','#2cd4f1','#2077ff','#00008b'],
    },
    label: "Water Occurrence (1984-2022)",
    visibility: true,
  },
  seasonality: {
    visParams: {
      bands: ['seasonality'],
      min:0,
      max:12,
      palette: ['red','yellow','green','blue'],
    },
    label: "Seasonality (1984-2022)",
    visibility: false,
  },
  recurrence: {
    visParams: {
      bands: ['recurrence'],
      min:0,
      max: 100,
      palette: ['#ffffff','#e1afff','#0000ff'],
    },
    label: "Annual Recurrence (1984-2022)",
    visibility: false,
  },
  max_extent: {
    visParams: {
      bands: ['max_extent'],
      min:0,
      max: 1,
      palette: ['black','gray'],
    },
    style: {
      color: '8899aa',  
      width: 2, 
      fillColor: 'ffffff00', 
      lineType: 'solid',
      },
    label: "Max Extent",
    visibility: true,
    },
  units: {
    label: "Unidades Admistrativas",
    style: {lineType: 'solid',width: 1, color: '7b9acd', fillColor: '00000000'},
    visibility: true 
    },
  hilighted: {  
    style: {pointShape: 'square',color: '8856a7', fillColor: '8856a788'},
    index: 7,
    label: "Selección",
  }
};
/********** Controles **********/
// define barra de selección capa de unidades
var levelSelector = gui.radioButtons(['M','E','R','P'],'vertical',levelIndex);
// define barra de selección capa de unidades
var periodSelector = gui.radioButtons([gui.Emoji.dryLeafs,gui.Emoji.umbrella],'horizontal',periodIndex);
// define botón cíclico para mostrar descripción
var showToolsButton = gui.toggleIcon([gui.Emoji.question,gui.Emoji.times],0);
// define botón cíclico para mostrar leyenda
var showLegendButton = gui.toggleIcon([gui.Emoji.map,gui.Emoji.times],0);
// Panel de resultados
var resultsPanel = ui.Panel({style: {position: 'bottom-left', width: '400px'}});
// Botón de tipo de grafica
var chartTypeToggleButton = gui.radioButtons([gui.Emoji.bars,gui.Emoji.notes],'horizontal',0);
// Botón de cierre de grafico
var chartCloseButton = gui.icon(gui.Emoji.times, clearResults);
/********** Composición **********/
// Barra de herramientas
var toolBar = ui.Panel([
  chartTypeToggleButton,
  ui.Label('',{stretch: 'horizontal'}),
  periodSelector,
  ui.Label('',{stretch: 'horizontal'}),
  chartCloseButton
],ui.Panel.Layout.flow('horizontal'),{stretch: 'horizontal'});
// Panel de acerca de
var toolsPanel = ui.Panel([
  ui.Label(TITLE,TITLE_STYLE),
  ui.Label('por jsilvan',{fontSize: '11px',textAlign: 'left',margin: '0px 4px 8px 16px'},'https://www.centrogeo.org.mx/areas-profile/jsilvan/'),
  ui.Label(DESCR,DESCR_STYLE)],'flow',{width: '250px'});
// Panel de leyendas
var legendPanel = ui.Panel([
  ui.Label('Simbología',TITLE_STYLE),
    legends.features('Features',[layer.hilighted,layer.units,layer.max_extent]),
    legends.classes(layer.transition.label,layer.transition.visParams,layer.transition.classes),
    legends.value(layer.recurrence.label,layer.recurrence.visParams),
    legends.value(layer.seasonality.label,layer.seasonality.visParams),
    legends.value(layer.change_abs.label,layer.change_abs.visParams),
    legends.value(layer.occurrence.label,layer.occurrence.visParams),
    legends.features('',layer.max_extent),
  ],'flow',{width: legends.width});
Map.add(showToolsButton);
Map.add(showLegendButton);
Map.add(levelSelector);
Map.layers().set(0,ui.Map.Layer(gsw,layer.occurrence.visParams, layer.occurrence.label, layer.occurrence.visibility));
Map.layers().set(1,ui.Map.Layer(gsw,layer.change_abs.visParams, layer.change_abs.label, layer.change_abs.visibility));
Map.layers().set(2,ui.Map.Layer(gsw,layer.seasonality.visParams, layer.seasonality.label, layer.seasonality.visibility));
Map.layers().set(3,ui.Map.Layer(gsw,layer.recurrence.visParams, layer.recurrence.label, layer.recurrence.visibility));
Map.layers().set(4,ui.Map.Layer(gsw,layer.transition.visParams, layer.transition.label, layer.transition.visibility));
Map.layers().set(5,ui.Map.Layer(outline,layer.max_extent.visParams, layer.max_extent.label,layer.max_extent.visibility));
Map.layers().set(6,ui.Map.Layer(units.style(layer.units.style),{}, layer.units.label,layer.units.visibility));
/********** Estilos **********/
levelSelector.style().set({position: 'middle-right'});
showToolsButton.style().set({position: 'top-left'});
showLegendButton.style().set('position','top-right');
Map.style().set({cursor: 'crosshair'});
Map.setCenter(-100.717, 20.967,5);
/********** Eventos **********/
// Callback del boton Herramientas
var showTools = function(state,widget) {
  if (state)
    ui.root.insert(0,toolsPanel);
  else
    ui.root.remove(toolsPanel);
};
// Callback del boton Leyenda
var showLegend = function(state,widget) {
  if(state)
    ui.root.add(legendPanel);
  else
    ui.root.remove(legendPanel);
};
// Retorna lista de puntos clickeados
function getSelectedFeats() {
  return units.filterBounds(ee.Geometry.MultiPoint(selectedPoints));
}
// Updates the map overlay using the currently-selected countries.
function updateOverlay() {
  var overlay = getSelectedFeats().style(layer.hilighted.style);
  Map.layers().set(layer.hilighted.index, ui.Map.Layer(overlay,{},layer.hilighted.label));
}
// crea el grafico de barras
function makeResultsBarChart(col) {
  var chart = ui.Chart.feature.byFeature(col, Columns[0],Columns.slice(2));
  chart.setChartType('BarChart');
  chart.setOptions({
    title: 'Selección',
    vAxis: {title: null},
    hAxis: {title: 'Cobertura de agua [km2]', minValue: 0}
  });
  chart.style().set({stretch: 'both'});
  return chart;
}
// Cre grafico de tabla
function makeResultsTable(col) {
  var table = ui.Chart.feature.byFeature(col.select(Columns), Columns[0]);
  table.setChartType('Table');
  table.setOptions({allowHtml: true, pageSize: 5});
  table.style().set({stretch: 'both'});
  return table;
}
// Actualiza el grafico
function updateChart(state,widget) {
  var chartBuilder;
  if(state)
    chartBuilder = makeResultsTable;
  else
    chartBuilder = makeResultsBarChart;
  var chart = chartBuilder(getSelectedFeats());
  resultsPanel.clear()
    .add(toolBar)
    .add(chart);
}
// Borra grafico y reinicia
function clearResults() {
  selectedPoints = [];
  var levelDescr = ['Municipios','Estados','Regiones Hidrologicas','México'];
  Map.layers().remove(Map.layers().get(layer.hilighted.index));
  var instructionsLabel = ui.Label('Haz click en ' + levelDescr[levelSelector.getSelected()] + ' para inspeccionar valores.');
  resultsPanel.widgets().reset([instructionsLabel]);
}
// Respieta a los clicks
function handleMapClick(location) {
  selectedPoints.push([location.lon, location.lat]);
  updateOverlay();
  updateChart(chartTypeToggleButton.getSelected());
}
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
function selectLevel(sel,desel,bar){
  clearResults();
  levelIndex = sel;
  units = ee.FeatureCollection('projects/ee-centrogeo/assets/' + levels[levelIndex]);
  Map.layers().set(6,ui.Map.Layer(units.style(layer.units.style),{}, layer.units.label,layer.units.visibility));
}
function selectPeriod(sel,desel,bar){
  var periodSufix = ['S','H'];
  var selSufix = '_'+periodSufix[sel];
  var deselSufix = '_'+periodSufix[desel];
  Columns = Columns.map(function(item){
    return item.replace(deselSufix,selSufix)
    });
  updateChart(chartTypeToggleButton.getSelected());
}
showToolsButton.onChange(showTools);
chartTypeToggleButton.onClick(updateChart);
periodSelector.onClick(selectPeriod);
showLegendButton.onChange(showLegend);
levelSelector.onClick(selectLevel);
// Inicializacion
Map.add(resultsPanel);
clearResults();
Map.onClick(handleMapClick);