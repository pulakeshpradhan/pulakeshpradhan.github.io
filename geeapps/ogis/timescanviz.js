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
m.defaultSettings = {
  yearForDoy: '2022', 
  //APP NOTE:  Each of these should be a user input with the default values below
  t1: 166,
  t2: 213,
  t3: 244,
  t4: 274,
  bufferSizeKm: 5, //APP NOTE: The buffers should be user inputs
  coordinates: { // APP NOTE: This should be a user input by selecting a point on a map
    lat: 14.4298,
    lon: -3.0092
  }
};
m.doySliderParams = {
  min: 1,
  max: 365,
  step: 1,
};
m.bufferParams = {
  min: 1,
  max: 30,
  step: 1
};
m.centerPoint = null;
m.region = null;
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
// Define the main interactive map.
c.map = ui.Map();
c.appTitleText = ui.Label('3 Period Timescan Cropland Monitor');
// Define an app info widget group.
c.info = {};
c.info.titleLabel = ui.Label('Parameters');
c.info.instructionsLabel = ui.Label('Click on an area on the map to visualize the timescan. Use the search bar to find a location but you must click on the map to set the point of interest. Clicking on the map will execute the calculations and start the visualization. The time selection parameters below are by default, set to the West African rainy season. These parameters should allow you to visualize rainfed cropland as blue pixels on the map. Only change the time parameters if you are looking outside of West Africa. The max NDVI of each period is calculated and stacked into a single Red-Green-Blue composite image (for each year). Credits: Laure Boudinaud (WFP), Alex Orenstein (DaCarte), Vasily Lobanov (RUDN)');
c.info.panel = ui.Panel([
  c.info.titleLabel, c.info.instructionsLabel,
]);
c.runButton = ui.Button('Run Timescan');
// Define a DOY selector widget group.
c.selectDOY = {};
c.selectDOY.label = ui.Label('Time Selection');
c.selectDOY.period1start = {};
c.selectDOY.period1start.label = ui.Label('Start Period 1');
c.selectDOY.period1start.slider = ui.Slider(m.doySliderParams);
c.selectDOY.period1start.labelDate = ui.Label();
c.selectDOY.period2start = {};
c.selectDOY.period2start.label = ui.Label('Start Period 2');
c.selectDOY.period2start.slider = ui.Slider(m.doySliderParams);
c.selectDOY.period2start.labelDate = ui.Label();
c.selectDOY.period3start = {};
c.selectDOY.period3start.label = ui.Label('Start Period 3');
c.selectDOY.period3start.slider = ui.Slider(m.doySliderParams);
c.selectDOY.period3start.labelDate = ui.Label();
c.selectDOY.period4start = {};
c.selectDOY.period4start.label = ui.Label('End Period 3');
c.selectDOY.period4start.slider = ui.Slider(m.doySliderParams);
c.selectDOY.period4start.labelDate = ui.Label();
c.runPanel = ui.Panel({
  widgets: [c.runButton], 
  layout: ui.Panel.Layout.flow('horizontal')
});
c.selectDOY.period1start.panel =  ui.Panel({
  widgets: [c.selectDOY.period1start.label, c.selectDOY.period1start.slider, c.selectDOY.period1start.labelDate], 
  layout: ui.Panel.Layout.flow('horizontal')
});
c.selectDOY.period2start.panel =  ui.Panel({
  widgets: [c.selectDOY.period2start.label, c.selectDOY.period2start.slider, c.selectDOY.period2start.labelDate], 
  layout: ui.Panel.Layout.flow('horizontal')
});
c.selectDOY.period3start.panel =  ui.Panel({
  widgets: [c.selectDOY.period3start.label, c.selectDOY.period3start.slider, c.selectDOY.period3start.labelDate], 
  layout: ui.Panel.Layout.flow('horizontal')
});
c.selectDOY.period4start.panel =  ui.Panel({
  widgets: [c.selectDOY.period4start.label, c.selectDOY.period4start.slider, c.selectDOY.period4start.labelDate], 
  layout: ui.Panel.Layout.flow('horizontal')
});
c.buffer = {};
c.buffer.label = ui.Label('Buffer (km)');
c.buffer.slider = ui.Slider(m.bufferParams);
c.closePanelButton = ui.Button('Close panel');
c.openPanelButton = ui.Button('Open panel');
c.buffer.panel =  ui.Panel({
  widgets: [c.buffer.label, c.buffer.slider], 
  layout: ui.Panel.Layout.flow('horizontal')
});
c.selectDOY.panel = ui.Panel([
  c.selectDOY.label, 
  c.selectDOY.period1start.panel, 
  c.selectDOY.period2start.panel, 
  c.selectDOY.period3start.panel,
  c.selectDOY.period4start.panel,
  c.buffer.panel, c.closePanelButton
]);
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
c.controlPanel.add(c.runPanel);
c.controlPanel.add(c.selectDOY.panel);
ui.root.clear();
ui.root.add(c.controlPanel);
ui.root.add(c.map);
c.map.add(c.appTitleText);
c.map.add(c.openPanelButton);
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
s.appTitleText = {
  fontSize: '30px',
};
s.instructionText = {
  fontSize: '13px',
  color: '505050'
};
s.widgetTitle = {
  fontSize: '15px',
  fontWeight: 'bold',
  margin: '8px 8px 0px 8px',
  color: '383838'
};
c.controlPanel.style().set({
  width: '20%',
  padding: '0px'
});
s.stretchHorizontal = {
  stretch: 'horizontal'
};
// Set widget style.
c.info.titleLabel.style().set({
  fontSize: '20px',
  fontWeight: 'bold'
});
c.openPanelButton.style().set({shown: false, position: 'bottom-left'});
c.appTitleText.style().set(s.appTitleText);
c.info.instructionsLabel.style().set(s.instructionText);
c.runButton.style().set(s.stretchHorizontal);
c.runButton.style().set({color: 'green'});
c.selectDOY.label.style().set(s.widgetTitle);
c.selectDOY.period1start.slider.style().set(s.stretchHorizontal);
c.selectDOY.period2start.slider.style().set(s.stretchHorizontal);
c.selectDOY.period3start.slider.style().set(s.stretchHorizontal);
c.selectDOY.period4start.slider.style().set(s.stretchHorizontal);
c.buffer.slider.style().set(s.stretchHorizontal);
c.closePanelButton.style().set(s.stretchHorizontal);
c.map.style().set({
  cursor: 'crosshair'
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
function collapsePanel(){
  c.controlPanel.style().set({shown: false});
  c.openPanelButton.style().set({shown: true});
}
c.closePanelButton.onClick(collapsePanel);
function showPanel(){
  c.controlPanel.style().set({shown: true});
  c.openPanelButton.style().set({shown: false});
}
c.openPanelButton.onClick(showPanel);
function date1_from_doy(DOY) {
  m.defaultSettings.t1 = DOY;
  var date = new Date(m.defaultSettings.yearForDoy);
  date.setDate(date.getDate() + DOY - 1);
  var date_string = date.toLocaleDateString(
    "en-US", { month: 'short' }) + ", "+ date.toLocaleDateString("en-US", { day: 'numeric' });
  c.selectDOY.period1start.labelDate.setValue(date_string);
}
function date2_from_doy(DOY) {
  m.defaultSettings.t2 = DOY;
  var date = new Date(m.defaultSettings.yearForDoy);
  date.setDate(date.getDate() + DOY - 1);
  var date_string = date.toLocaleDateString(
    "en-US", { month: 'short' }) + ", "+ date.toLocaleDateString("en-US", { day: 'numeric' });
  c.selectDOY.period2start.labelDate.setValue(date_string);
}
function date3_from_doy(DOY) {
  m.defaultSettings.t3 = DOY;
  var date = new Date(m.defaultSettings.yearForDoy);
  date.setDate(date.getDate() + DOY - 1);
  var date_string = date.toLocaleDateString(
    "en-US", { month: 'short' }) + ", "+ date.toLocaleDateString("en-US", { day: 'numeric' });
  c.selectDOY.period3start.labelDate.setValue(date_string);
}
function date4_from_doy(DOY) {
  m.defaultSettings.t4 = DOY;
  var date = new Date(m.defaultSettings.yearForDoy);
  date.setDate(date.getDate() + DOY - 1);
  var date_string = date.toLocaleDateString(
    "en-US", { month: 'short' }) + ", "+ date.toLocaleDateString("en-US", { day: 'numeric' });
  c.selectDOY.period4start.labelDate.setValue(date_string);
}
c.selectDOY.period1start.slider.onChange(date1_from_doy);
// c.selectDOY.period1start.slider.onChange(updateDatasets);
c.selectDOY.period2start.slider.onChange(date2_from_doy);
// c.selectDOY.period2start.slider.onChange(updateDatasets);
c.selectDOY.period3start.slider.onChange(date3_from_doy);
// c.selectDOY.period3start.slider.onChange(updateDatasets);
c.selectDOY.period4start.slider.onChange(date4_from_doy);
// c.selectDOY.period4start.slider.onChange(updateDatasets);
c.runButton.onClick(updateDatasets);
function updateRegionSize(buffer_size_km) {
  m.region = m.centerPoint.buffer(buffer_size_km * 1e3);
  // updateDatasets();
  c.map.layers().set(7, ui.Map.Layer(ee.Image().byte().paint(m.region, 2, 2), {}, 'buffer', true));
  c.map.centerObject(m.region);
}
function updateRegionLocation(coords) {
  m.centerPoint = ee.Geometry.Point([coords.lon, coords.lat]);
  m.region = m.centerPoint.buffer(c.buffer.slider.getValue() * 1e3);
  c.map.layers().set(6, ui.Map.Layer(m.centerPoint, {},'point of interest'));
  c.map.layers().set(7, ui.Map.Layer(ee.Image().byte().paint(m.region, 2, 2), {}, 'buffer', true));
  c.map.centerObject(m.region);
}
c.buffer.slider.onChange(updateRegionSize);
c.map.onClick(updateRegionLocation);
c.map.onClick(updateDatasets);
function split_collection_into_period_stack(yearly_collection) {
  // 3-PERIODS PRODUCTS
  // Visualize RGB from different max-NDVI values from three distinct periods of the year
  var p1 = yearly_collection.filter(ee.Filter.dayOfYear(
    c.selectDOY.period1start.slider.getValue(), 
    c.selectDOY.period2start.slider.getValue())).select('NDVI').max();
  var p2 = yearly_collection.filter(ee.Filter.dayOfYear(
    c.selectDOY.period2start.slider.getValue() + 1,
    c.selectDOY.period3start.slider.getValue())).select('NDVI').max();
  var p3 = yearly_collection.filter(ee.Filter.dayOfYear(
    c.selectDOY.period3start.slider.getValue() + 1,
    c.selectDOY.period4start.slider.getValue())).select('NDVI').max(); 
  var stack = p1.addBands(p2).addBands(p3);
  return stack;
}
function updateDatasets() {
  // 3 Period Timescan
  // Every comment tagged with "APP NOTE" should be user inputs
  // Create a function to DOWNLOAD the collection for a year of interest
  var sentinel2 = function(year) {
    var start = year+''+'-01-01';
    var end = year+''+'-12-31';
    return ee.ImageCollection('COPERNICUS/S2')
      .filterDate(start, end)
      .filterBounds(m.region);
  };
  // FUNCTION to create new bands to the collection
  var GREEN_s = 'B3';
  var RED_s = 'B4';
  var NIR_s = 'B8';
  var SWIR_s = 'B11';
  var addIndices = function(image) {
    var ndvi = image.normalizedDifference([NIR_s, RED_s]);
    return image.addBands(ndvi.rename('NDVI'));
  };
  var s2016 = sentinel2(2016).map(addIndices);
  print('Sentinel collection 2016', s2016);
  var s2017 = sentinel2(2017).map(addIndices);
  print('Sentinel collection 2017', s2017);
  var s2018 = sentinel2(2018).map(addIndices);
  print('Sentinel collection 2018', s2018);
  var s2019 = sentinel2(2019).map(addIndices);
  print('Sentinel collection 2019', s2019);
  var s2020 = sentinel2(2020).map(addIndices);
  print('Sentinel collection 2020', s2020);
  var s2021 = sentinel2(2021).map(addIndices);
  print('Sentinel collection 2021', s2021);
  // 3-PERIODS PRODUCTS
  // Visualize RGB from different max-NDVI values from three distinct periods of the year
  var stack_2016 = split_collection_into_period_stack(s2016);
  var min_values = stack_2016.select(1).reduceRegion('min', m.region, 100).values().getInfo();
  var max_values = stack_2016.select(1).reduceRegion('max', m.region, 100).values().getInfo();
  var index_viz = {min: min_values, max: max_values};
  c.map.layers().set(0, ui.Map.Layer(stack_2016, index_viz, '2016'));
   // Do the same for 2017
  var stack_2017 = split_collection_into_period_stack(s2017);
  c.map.layers().set(3, ui.Map.Layer(stack_2017, index_viz, '2017', false)); 
  // Do the same for 2018
  var stack_2018 = split_collection_into_period_stack(s2018);
  c.map.layers().set(1, ui.Map.Layer(stack_2018, index_viz, '2018', false));
  // Do the same for 2019
  var stack_2019 = split_collection_into_period_stack(s2019);
  c.map.layers().set(2, ui.Map.Layer(stack_2019, index_viz, '2019', false));
  //2020
  var stack_2020 = split_collection_into_period_stack(s2020);
  c.map.layers().set(4, ui.Map.Layer(stack_2020, index_viz, '2020', false));
  //2021
  var stack_2021 = split_collection_into_period_stack(s2021);
  c.map.layers().set(5, ui.Map.Layer(stack_2021, index_viz, '2021', false));
}
/*******************************************************************************
 * Initialize *
 *
 * A section to initialize the app state on load.
 *
 * Guidelines:
 * 1. At the top, define any helper functions.
 * 2. As much as possible, use URL params to initial the state of the app.
 ******************************************************************************/
c.map.layers().reset([null, null, null, null, null, null, null, null]);
c.selectDOY.period1start.slider.setValue(m.defaultSettings.t1, false);
c.selectDOY.period2start.slider.setValue(m.defaultSettings.t2, false);
c.selectDOY.period3start.slider.setValue(m.defaultSettings.t3, false);
c.selectDOY.period4start.slider.setValue(m.defaultSettings.t4, false);
c.buffer.slider.setValue(m.defaultSettings.bufferSizeKm, false);
updateRegionLocation(m.defaultSettings.coordinates);
updateDatasets();