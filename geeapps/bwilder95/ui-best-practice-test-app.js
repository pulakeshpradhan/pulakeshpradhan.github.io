// Test App with UI Pattern Template
// B.A. Wilder
// May 19, 2021
/**
 * UI Pattern Template
 *
 * This script is a template for organizing code into distinct sections
 * to improve readability/maintainability:
 *   Model, Components, Composition, Styling, Behaviors, Initialization
 *
 * @author Tyler Erickson (tylere@google.com)
 * @author Justin Braaten (braaten@google.com)
 */
/*******************************************************************************
 * Dependencies *
 *
 * A section to load dependencies relevant to app such as palettes and
 * other toolsets from github
 ******************************************************************************/
// Load palettes from gena github
var palettes = require('users/gena/packages:palettes');
/*******************************************************************************
 * Model *
 *
 * A section to define information about the data being presented in your
 * app.
 *
 * Guidelines: Use this section to import assets and define information that
 * are used to parameterize data-dependant widgets and control style and
 * behavior on UI interactions.
 ******************************************************************************/
// Define a JSON object for storing the data model.
var m = {};
// load Idaho geometry
m.idaho = ee.FeatureCollection('TIGER/2016/States')
               .filter(ee.Filter.eq('NAME', 'Idaho'))
               .geometry();
// define image collection
m.col = ee.ImageCollection('projects/rangeland-analysis-platform/vegetation-cover-v2')
                        .map(function(image){return image.clip(m.idaho)})
// Define info about the bands in this collection that the app will present.
m.colInfo = {
  bands: {
    'Annual forb and grass': {
      bname: 'AFGC',
      color: 'd4e7b0',
      vis: {
        min: 0,
        max: 75,
        palette: ['fef0d9', 'fdcc8a', 'fc8d59', 'e34a33', 'b30000']
      }
    },
    'Bare ground': {
      bname: 'BG',
      color: 'd2cdc0',
      vis: {
        min: 0,
        max: 75,
        palette: ['ffffd4', 'fed98e', 'fe9929', 'd95f0e', '993404']
      }
    },
    'Litter': {
      bname: 'LTR',
      color: 'ca9146',
      vis: {
        min: 0,
        max: 75,
        palette: ['feebe2', 'fbb4b9', 'f768a1', 'c51b8a', '7a0177']
      }
    },
    'Perennial forb and grass': {
      bname: 'PFGC',
      color: '85c77e',
      vis: {
        min: 0,
        max: 75,
        palette: ['edf8e9', 'bae4b3', '74c476', '31a354', '006d2c']
      }
    },
    'Shrub': {
      bname: 'SHR',
      color: 'fbf65d',
      vis: {
        min: 0,
        max: 75,
        palette: ['eff3ff', 'bdd7e7', '6baed6', '3182bd', '08519c']
      }
    },
    'Tree': {
      bname: 'TREE',
      color: '38814e',
      vis: {
        min: 0,
        max: 75,
        palette: ['feedde', 'fdbe85', 'fd8d3c', 'e6550d', 'a63603']
      }
    }
  },
  startYear: 1984,
  endYear: 2020,
};
/*******************************************************************************
 * Components *
 *
 * A section to define the widgets that will compose your app.
 *
 * Guidelines:
 * 1. Except for static text and constraints, accept default values;
 *    initialize others in the initialization section.
 * 2. Limit composition of widgets to those belonging to an inseparable unit
 *    (i.e. a group of widgets that would make no sense out of order).
 ******************************************************************************/
// Define a JSON object for storing UI components.
var c = {};
// Define a control panel for user input.
c.controlPanel = ui.Panel();
// Define a series of panel widgets to be used as horizontal dividers.
c.dividers = {};
c.dividers.divider1 = ui.Panel();
c.dividers.divider2 = ui.Panel();
c.dividers.divider3 = ui.Panel();
c.dividers.divider4 = ui.Panel();
// Define the main interactive map.
c.map = ui.Map();
// Define an app info widget group.
c.info = {};
c.info.titleLabel = ui.Label('Idaho Land Cover');
c.info.aboutLabel = ui.Label(
  'Fractional land cover product across Idaho (USA) ' +
  'lands from 1984 to 2020 at 30 m resolution. Explore the data ' +
  'by selecting the year to display ' +
  'and clicking points to inspect the time series.');
c.info.panel = ui.Panel([
  c.info.titleLabel, c.info.aboutLabel
]);
// Define a data year selector widget group.
c.selectYear = {};
c.selectYear.label = ui.Label('Select a year to display');
c.selectYear.slider = ui.Slider({
  min: m.colInfo.startYear,
  max: m.colInfo.endYear,
  step: 1
});
c.selectYear.panel = ui.Panel([c.selectYear.label, c.selectYear.slider]);
// Define a data band selector widget group.
c.selectBand = {};
c.selectBand.label = ui.Label('Select a band to display');
c.selectBand.selector = ui.Select(Object.keys(m.colInfo.bands));
c.selectBand.panel = ui.Panel([c.selectBand.label, c.selectBand.selector]);
// Define a reduction region radius selector widget group (for charting).
c.selectRadius = {};
c.selectRadius.label = ui.Label('Select chart region radius (m)');
c.selectRadius.slider = ui.Slider({
  min: 500,
  max: 2500,
  step: 500
});
c.selectRadius.panel = ui.Panel([c.selectRadius.label, c.selectRadius.slider]);
// Define a panel for displaying a chart.
c.chart = {};
c.chart.shownButton = ui.Button('Hide chart');
c.chart.container = ui.Panel();  // will hold the dynamically generated chart. 
c.chart.chartPanel = ui.Panel([c.chart.shownButton, c.chart.container]);
/*******************************************************************************
 * Composition *
 *
 * A section to compose the app i.e. add child widgets and widget groups to
 * first-level parent components like control panels and maps.
 *
 * Guidelines: There is a gradient between components and composition. There
 * are no hard guidelines here; use this section to help conceptually break up
 * the composition of complicated apps with many widgets and widget groups.
 ******************************************************************************/
// Compile components
c.controlPanel.add(c.info.panel);
c.controlPanel.add(c.dividers.divider1);
c.controlPanel.add(c.selectYear.panel);
c.controlPanel.add(c.selectBand.panel);
c.controlPanel.add(c.dividers.divider2);
c.controlPanel.add(c.selectRadius.panel);
c.map.add(c.chart.chartPanel);
// Add components to ui
ui.root.clear();
ui.root.add(c.controlPanel);
ui.root.add(c.map);
/*******************************************************************************
 * Styling *
 *
 * A section to define and set widget style properties.
 *
 * Guidelines:
 * 1. At the top, define styles for widget "classes" i.e. styles that might be
 *    applied to several widgets, like text styles or margin styles.
 * 2. Set "inline" style properties for single-use styles.
 * 3. You can add multiple styles to widgets, add "inline" style followed by
 *    "class" styles. If multiple styles need to be set on the same widget, do
 *    it consecutively to maintain order.
 ******************************************************************************/
// Define a JSON object for defining CSS-like class style properties.
var s = {};
s.opacityWhiteMed = {
  backgroundColor: 'rgba(255, 255, 255, 0.5)'
};
s.opacityWhiteNone = {
  backgroundColor: 'rgba(255, 255, 255, 0)'
};
s.aboutText = {
  fontSize: '13px',
  color: '505050'
};
s.widgetTitle = {
  fontSize: '15px',
  fontWeight: 'bold',
  margin: '8px 8px 0px 8px',
  color: '383838'
};
s.stretchHorizontal = {
  stretch: 'horizontal'
};
s.noTopMargin = {
  margin: '0px 8px 8px 8px'
};
s.smallBottomMargin = {
  margin: '8px 8px 4px 8px'
};
s.bigTopMargin = {
  margin: '24px 8px 8px 8px'
};
s.divider = {
  backgroundColor: 'F0F0F0',
  height: '4px',
  margin: '20px 0px'
};
// Set widget style.
c.info.titleLabel.style().set({
  fontSize: '20px',
  fontWeight: 'bold'
});
c.info.titleLabel.style().set(s.bigTopMargin);
c.info.aboutLabel.style().set(s.aboutText);
c.selectYear.slider.style().set(s.stretchHorizontal);
c.selectYear.label.style().set(s.widgetTitle);
c.selectBand.selector.style().set(s.stretchHorizontal);
c.selectBand.label.style().set(s.widgetTitle);
c.selectRadius.slider.style().set(s.stretchHorizontal);
c.selectRadius.label.style().set(s.widgetTitle);
c.controlPanel.style().set({
  width: '275px',
  padding: '0px'
});
c.map.style().set({
  cursor: 'crosshair'
});
c.map.setOptions('HYBRID');
c.chart.chartPanel.style().set({
  position: 'bottom-right',
  shown: false
});
c.chart.chartPanel.style().set(s.opacityWhiteMed);
c.chart.shownButton.style().set({
  margin: '0px 0px',
});
// Loop through setting divider style.
Object.keys(c.dividers).forEach(function(key) {
  c.dividers[key].style().set(s.divider);
});
/*******************************************************************************
 * Behaviors *
 *
 * A section to define app behavior on UI activity.
 *
 * Guidelines:
 * 1. At the top, define helper functions and functions that will be used as
 *    callbacks for multiple events.
 * 2. For single-use callbacks, define them just prior to assignment. If
 *    multiple callbacks are required for a widget, add them consecutively to
 *    maintain order; single-use followed by multi-use.
 * 3. As much as possible, include callbacks that update URL parameters.
 ******************************************************************************/
function getPropertyValueList(dataModelDict, propertyName){
  // Get a list of values for a specified property name.
  var result = [];
  for (var key in dataModelDict) {
    result.push(dataModelDict[key][propertyName]);
  }
  return result;
}
// Handles year and band selection for new map layer display.
function updateMap() {
  var year = c.selectYear.slider.getValue()
  var band = c.selectBand.selector.getValue();
  var img = m.col.filterDate(year+'-01-01', year+'-12-31')
                .select(m.colInfo.bands[band].bname)
  var layer = ui.Map.Layer(
              img, m.colInfo.bands[band].vis, band + ', ' + year);
  c.map.layers().set(0, layer);
}
function updateUrlParamYear(newValue) {
  ui.url.set('year', newValue);
}
c.selectYear.slider.onChange(updateUrlParamYear);
c.selectYear.slider.onChange(updateMap);
function updateUrlParamBand(newValue) {
  var bands = getPropertyValueList(m.colInfo.bands, 'bname');
  ui.url.set('band', m.colInfo.bands[newValue].bname);
}
c.selectBand.selector.onChange(updateUrlParamBand);
c.selectBand.selector.onChange(updateMap);
// Handles map clicks for charting.
function drawChart(coords) {
  // Get out if call to drawChart did not come from map click and the chart
  // has not been drawn previously.
  if (!coords.lon) {
    return null;
  }
  // Get out if the clicked point intersects invalid data.
  var point = ee.Geometry.Point([coords.lon, coords.lat]);
  var validDataTest = m.col.first().select(0).reduceRegion({
    reducer: ee.Reducer.first(),
    geometry: point,
    scale: m.col.first().projection().nominalScale()
  });
  if (!validDataTest.get(validDataTest.keys().get(0)).getInfo()) {
    return null;
  }
  // Show the chart panel if this is the first time a point is clicked.
  if (!c.chart.chartPanel.style().get('shown')) {
    c.chart.chartPanel.style().set('shown', true);
  }
  // Show chart if hidden; assuming user wants to see updates to chart.
  if (c.chart.shownButton.getLabel() == 'Show chart') {
    c.chart.container.style().set({shown: true});
    c.chart.shownButton.setLabel('Hide chart');
  }
  var radius = c.selectRadius.slider.getValue();
  var layer = ui.Map.Layer(
    point.buffer(radius), null, 'Chart region');
  c.map.layers().set(1, layer);
  var styleChartAxis = {
    italic: false,
    bold: true
  };
  var styleChartArea = {
    width: '600px',
    height: '255px',
    margin: '0px',
    padding: '0px'
  }; 
  var chart = ui.Chart.image.series({
    imageCollection: m.col.select(
      getPropertyValueList(m.colInfo.bands, 'bname')),
    region: point.buffer(radius),
    reducer: ee.Reducer.mean(),
    scale: m.col.first().projection().nominalScale()
  })
  .setSeriesNames(Object.keys(m.colInfo.bands))
  .setChartType('ColumnChart')
  .setOptions({
    titlePosition: 'none',
    colors: getPropertyValueList(m.colInfo.bands, 'color'),
    hAxis: {
      title: 'Year',
      titleTextStyle: styleChartAxis
    },
    vAxis: {
      title: 'Stacked percent cover',
      titleTextStyle: styleChartAxis,
    },
    legend: {maxLines: 2},
    isStacked: 'percent'
  });
  chart.style().set(styleChartArea);
  c.chart.container.widgets().reset([chart]);
}
function showHideChart() {
  var shown = true;
  var label = 'Hide chart';
  if (c.chart.shownButton.getLabel() == 'Hide chart') {
    shown = false;
    label = 'Show chart';
  }
  c.chart.container.style().set({shown: shown});
  c.chart.shownButton.setLabel(label);
}
c.chart.shownButton.onClick(showHideChart);
function updateUrlParamRadius(newValue) {
  ui.url.set('radius', newValue);
}
c.selectRadius.slider.onChange(updateUrlParamRadius);
c.selectRadius.slider.onChange(function(value) {
  drawChart({lon: ui.url.get('chart_lon'), lat: ui.url.get('chart_lat')})});
function updateUrlParamMap(newMapParams) {
  ui.url.set('lat', newMapParams.lat);
  ui.url.set('lon', newMapParams.lon);
  ui.url.set('zoom', newMapParams.zoom);
}
c.map.onChangeBounds(ui.util.debounce(updateUrlParamMap, 100));
function updateUrlParamChart(newChartParams) {
  ui.url.set('chart_lat', newChartParams.lat);
  ui.url.set('chart_lon', newChartParams.lon);
}
c.map.onClick(drawChart);
c.map.onClick(updateUrlParamChart);
/*******************************************************************************
 * Initialize *
 *
 * A section to initialize the app state on load.
 *
 * Guidelines:
 * 1. At the top, define any helper functions.
 * 2. As much as possible, use URL params to initial the state of the app.
 ******************************************************************************/
function findKey(dataModelDict, propertyName, propertyValue){
  // Find the first dictionary key for a specified property value.
  for (var key in dataModelDict) {
    if (dataModelDict[key][propertyName] == propertyValue) {
      return key;
    }
  }
  return null;
}
// set map center and initial conditions
c.map.centerObject(m.idaho, 6);
c.selectYear.slider.setValue(ui.url.get('year', 2001), false);
c.selectBand.selector.setValue(
  findKey(m.colInfo.bands, 'bname', ui.url.get('band','AFGC')), 
  false);
c.selectRadius.slider.setValue(ui.url.get('radius', 30), false);
// Render the map and legend.
updateMap();
// Render the chart if applicable (chart_lon exists as URL param).
drawChart({lon: ui.url.get('chart_lon'), lat: ui.url.get('chart_lat')});