/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var chirpsPentad = ee.ImageCollection("UCSB-CHG/CHIRPS/PENTAD");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
/*
 * UI Template
 *
 * A template for organizing code into distinct sections to improve readability and maintainability:
 * Model, Components, Composition, Styling, Behaviors, Initialization
 */
/*******************************************************************************
 * Model *
 *
 * A section to define information about the data being presented in your app.
 *
 * Guidelines: Use this section to import assets and define information that
 * are used to parameterize data-dependant widgets and control style and
 * behavior on UI interactions.
 ******************************************************************************/
// Define a JSON object for storing the data model.
var m = {};
m.col = chirpsPentad;
m.col.properties = chirpsPentad.getInfo().properties;
m.imgInfo = {
  startYear: ee.Date(m.col.properties.date_range[0]).get('year').getInfo(),
  endYear: ee.Date(m.col.properties.date_range[1]).get('year').getInfo(),
  vis: {
    min: m.col.properties.visualization_0_min,
    max: m.col.properties.visualization_0_max,
    palette: m.col.properties.visualization_0_palette
  }
}
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
c.controlPanel = ui.Panel();
c.map = ui.Map();
c.info = {};
c.info.titleLabel = ui.Label("CHIRPS Rainfall Estimate: Pentads");
c.info.aboutLabel = ui.Label("Rainfall estimate (mm) for a given pentad during the year.");
c.info.panel = ui.Panel([
  c.info.titleLabel, c.info.aboutLabel
]);
c.selectYear = {};
c.selectYear.label = ui.Label("Select a year to display");
c.selectYear.slider = ui.Slider({
  min: m.imgInfo.startYear,
  max: m.imgInfo.endYear,
  step: 1
});
c.selectYear.panel = ui.Panel([c.selectYear.label, c.selectYear.slider]);
c.selectPentad = {};
c.selectPentad.label = ui.Label("Select a pentad to display");
c.selectPentad.slider = ui.Slider({
  min: 1,
  max: 72,
  step: 1
});
c.selectPentad.panel = ui.Panel([c.selectPentad.label, c.selectPentad.slider]);
c.dataDate = {};
c.dataDate.label = ui.Label("Showing data for pentad starting: ");
c.dataDate.datelabel = ui.Label();
c.dividers = {};
c.dividers.divider1 = ui.Panel();
c.dividers.divider2 = ui.Panel();
// Define a legend widget group.
c.legend = {};
c.legend.title = ui.Label('Precipitation (mm)');
c.legend.colorbar = ui.Thumbnail(ee.Image.pixelLonLat().select(0));
c.legend.leftLabel = ui.Label('[min]');
c.legend.centerLabel = ui.Label();
c.legend.rightLabel = ui.Label('[max]');
c.legend.labelPanel = ui.Panel({
  widgets: [
    c.legend.leftLabel,
    c.legend.centerLabel,
    c.legend.rightLabel,
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
c.legend.panel = ui.Panel([
  c.legend.title,
  c.legend.colorbar,
  c.legend.labelPanel
]);
// Define a reduction region radius selector widget group (for charting).
// c.selectRadius = {};
// c.selectRadius.label = ui.Label('Select chart region radius (m)');
// c.selectRadius.slider = ui.Slider({
//   min: 1000,
//   max: 50000,
//   step: 5000
// });
// c.selectRadius.panel = ui.Panel([c.selectRadius.label, c.selectRadius.slider]);
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
c.controlPanel.add(c.info.panel);
c.controlPanel.add(c.dividers.divider1);
c.controlPanel.add(c.selectYear.panel);
c.controlPanel.add(c.selectPentad.panel);
c.controlPanel.add(c.dataDate.label);
c.controlPanel.add(c.dataDate.datelabel);
c.controlPanel.add(c.dividers.divider2);
// c.controlPanel.add(c.selectRadius.panel);
c.map.add(c.legend.panel);
c.map.add(c.chart.chartPanel);
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
s.noTopMargin = {
  margin: '0px 8px 8px 8px'
};
s.smallBottomMargin = {
  margin: '8px 8px 4px 8px'
};
s.bigTopMargin = {
  margin: '24px 8px 8px 8px'
};
s.aboutText = {
  fontSize: '13px',
  color: '505050'
};
s.stretchHorizontal = {
  stretch: 'horizontal'
};
s.widgetTitle = {
  fontSize: '15px',
  fontWeight: 'bold',
  margin: '8px 8px 8px 8px',
  color: '383838'
};
s.divider = {
  backgroundColor: 'F0F0F0',
  height: '4px',
  margin: '20px 0px'
};
s.sliderLabel = {
  fontWeight: 'bold',
  fontSize: '16px'
};
c.controlPanel.style().set({
  width: '320px'  
});
c.info.titleLabel.style().set({
  fontSize: '20px',
  fontWeight: 'bold'
});
c.info.aboutLabel.style().set(s.aboutText);
c.selectYear.label.style().set(s.widgetTitle);
c.selectYear.slider.style().set(s.stretchHorizontal);
c.selectYear.slider.style().set(s.sliderLabel);
c.selectPentad.label.style().set(s.widgetTitle);
c.selectPentad.slider.style().set(s.stretchHorizontal);
c.selectPentad.slider.style().set(s.sliderLabel);
c.dataDate.label.style().set(s.widgetTitle);
c.dataDate.datelabel.style().set(s.sliderLabel);
Object.keys(c.dividers).forEach(function(key) {
  c.dividers[key].style().set(s.divider);
});
c.legend.title.style().set({
  fontWeight: 'bold',
  fontSize: '12px',
  color: '383838'
});
c.legend.title.style().set(s.opacityWhiteNone);
c.legend.colorbar.style().set({
  stretch: 'horizontal',
  margin: '0px 8px',
  maxHeight: '20px'
});
c.legend.leftLabel.style().set({
  margin: '4px 8px',
  fontSize: '12px'
});
c.legend.leftLabel.style().set(s.opacityWhiteNone);
c.legend.centerLabel.style().set({
  margin: '4px 8px',
  fontSize: '12px',
  textAlign: 'center',
  stretch: 'horizontal'
});
c.legend.centerLabel.style().set(s.opacityWhiteNone);
c.legend.rightLabel.style().set({
  margin: '4px 8px',
  fontSize: '12px'
});
c.legend.rightLabel.style().set(s.opacityWhiteNone);
c.legend.panel.style().set({
  position: 'bottom-left',
  width: '200px',
  padding: '0px'});
c.legend.panel.style().set(s.opacityWhiteMed);
c.legend.labelPanel.style().set(s.opacityWhiteNone);
c.map.style().set({
  cursor: 'crosshair'
});
// c.map.setOptions('HYBRID');
c.chart.chartPanel.style().set({
  position: 'bottom-right',
  shown: false
});
c.chart.chartPanel.style().set(s.opacityWhiteMed);
c.chart.shownButton.style().set({
  margin: '0px 0px',
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
// Get filtered data for the year
function getYearlyData() {
  var year = c.selectYear.slider.getValue();
  return m.col.filterMetadata('year', 'equals', year)
}
// Handle map update
function updateMap() {
  var filteredYear = getYearlyData();
  var pentadDates = filteredYear.aggregate_array('system:index')
  var numberOfPentads = pentadDates.length()
  var pentadNumber = c.selectPentad.slider.getValue() - 1;
  var pentadDate = pentadDates.get(pentadNumber).getInfo();
  var img = filteredYear.filterMetadata('system:index', 'equals', pentadDate);
  var layer = ui.Map.Layer({
    eeObject: img,
    visParams: m.imgInfo.vis
  });
  c.map.layers().set(0, layer);
  var dateLabel = pentadDate.slice(6, 8) + '-'
  + pentadDate.slice(4, 6) + '-'
  + pentadDate.slice(0, 4)
  c.dataDate.datelabel.setValue(dateLabel);
}
// Handles drawing the legend when map changes
function updateLegend() {
  c.legend.colorbar.setParams({
    bbox: [0, 0, 1, 0.1],
    dimensions: '100x10',
    format: 'png',
    min: 0,
    max: 1,
    palette: m.imgInfo.vis.palette
  });
  c.legend.leftLabel.setValue(
    m.imgInfo.vis.min);
  c.legend.centerLabel.setValue(
    m.imgInfo.vis.max / 2);
  c.legend.rightLabel.setValue(
    m.imgInfo.vis.max);
}
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
    imageCollection: getYearlyData(),
    region: point,
    reducer: ee.Reducer.mean(),
    scale: m.col.first().projection().nominalScale()
  })
  .setChartType('LineChart')
  .setOptions({
    titlePosition: 'none',
    // colors: 'blue',
    hAxis: {
      title: 'Month',
      titleTextStyle: styleChartAxis,
      format: 'MM',
      gridlines: {
        count: 12
      }
    },
    vAxis: {
      title: 'Precipitation (mm)',
      titleTextStyle: styleChartAxis,
    },
    // legend: {maxLines: 2},
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
function updateUrlParamChart(newChartParams) {
  ui.url.set('chart_lat', newChartParams.lat);
  ui.url.set('chart_lon', newChartParams.lon);
}
c.map.onClick(drawChart);
c.map.onClick(updateUrlParamChart);
c.chart.shownButton.onClick(showHideChart);
c.selectYear.slider.onChange(updateMap);
// c.selectYear.slider.onChange(updateLegend);
c.selectPentad.slider.onChange(updateMap);
// c.selectPentad.slider.onChange(updateLegend);
/*******************************************************************************
 * Initialize *
 *
 * A section to initialize the app state on load.
 *
 * Guidelines:
 * 1. At the top, define any helper functions.
 * 2. As much as possible, use URL params to initial the state of the app.
 ******************************************************************************/
// c.yearSelector.setValue(m.years[0]);
// c.yearLabel.setValue(m.years[0]);
// Set model astate based on URL parameters or default values.
c.map.setCenter({
  lon: ui.url.get('lon', 10.0),
  lat: ui.url.get('lat', 0),
  zoom: ui.url.get('zoom', 3)
});
// Render the map and legend.
updateMap();
updateLegend();