/**
 * UI Pattern Template
 * 
 * This script is a template for organizing code into distinct sections
 * to improve readability/maintainability:
 *   Model, Components, Composition, Styling, Behaviors, Initialization
 */
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
var m = {};
m.weather = ee.ImageCollection("ECMWF/ERA5_LAND/HOURLY");
m.imgInfo = {
startYear: 0,
endYear: 72,
bands: {
  "temperature at 2m":{
    bname: "temperature_2m",
    color: "d4e7b0",
    vis: {
      min:250.0,
      max:320.0,
        palette: [
    "#000080","#0000D9","#4000FF","#8000FF","#0080FF","#00FFFF",
    "#00FF80","#80FF00","#DAFF00","#FFFF00","#FFF500","#FFDA00",
    "#FFB000","#FFA400","#FF4F00","#FF2500","#FF0A00","#FF00FF",
  ]
}},
  "precipitation":{
    bname: "total_precipitation",
    color: "d4e7h0",
    vis: {
      min:0.0001,
      max:0.1,
        palette: [
    "#000080","#0000D9","#4000FF","#8000FF","#0080FF","#00FFFF",
    "#00FF80","#80FF00","#DAFF00","#FFFF00","#FFF500","#FFDA00",
    "#FFB000","#FFA400","#FF4F00","#FF2500","#FF0A00","#FF00FF",
  ]
}}}
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
var c = {};
c.controlPanel = ui.Panel();
c.map = ui.Map();
c.info = {};
c.info.titleLabel = ui.Label("JRC map");
c.info.aboutLabel = ui.Label("R.Cimdins test");
c.info.panel = ui.Panel([
  c.info.titleLabel, c.info.aboutLabel
  ]);
c.selectYear = {};
c.selectYear.label = ui.Label("Select hour to display");
c.selectYear.slider = ui.Slider({
  min: m.imgInfo.startYear,
  max: m.imgInfo.endYear,
  step: 1
  });
c.selectYear.panel = ui.Panel([c.selectYear.label, c.selectYear.slider]);
c.selectBand = {};
c.selectBand.label = ui.Label("Select band to display");
c.selectBand.selector = ui.Select(Object.keys(m.imgInfo.bands), null, "temperature at 2m");
c.selectBand.panel = ui.Panel([c.selectBand.label, c.selectBand.selector]);
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
ui.root.clear();
ui.root.add(c.controlPanel);
ui.root.add(c.map);
c.controlPanel.add(c.info.panel);
c.controlPanel.add(c.selectYear.panel);
c.controlPanel.add(c.selectBand.panel);
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
var s = {};
c.controlPanel.style().set({
  width: "275px"
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
function updateMap () {
  var year = c.selectYear.slider.getValue();
  var band = c.selectBand.selector.getValue();
  var img = m.weather.filter(ee.Filter.date('2020-01-01T08:00:00Z', '2020-01-03T08:00:00Z'))
  .select(m.imgInfo.bands[band].bname);
  var layer = ui.Map.Layer({
  eeObject: img,
  visParams: m.imgInfo.bands[band].vis,
  name: band + ", " + year
  });
  c.map.layers().set(0, layer);
}
c.selectYear.slider.onChange(updateMap);
c.selectBand.selector.onChange(updateMap);
/*******************************************************************************
 * Initialize *
 *
 * A section to initialize the app state on load.
 *
 * Guidelines:
 * 1. At the top, define any helper functions.
 * 2. As much as possible, use URL params to initial the state of the app.
 ******************************************************************************/