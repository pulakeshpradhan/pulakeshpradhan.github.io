var table = ui.import && ui.import("table", "table", {
      "id": "users/reiniscimdins/Robinia_pseudoacacia"
    }) || ee.FeatureCollection("users/reiniscimdins/Robinia_pseudoacacia");
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
// add dummy property to use for reduceToImage
m.points = ee.FeatureCollection(table).map(function(feature){
  return feature.set('dummy',1);
});
// specify scale in meters to project point Image to
var ptScale = ee.Number(1000);
// convert featureCollection to Image and add geoinformation
var ptImg = m.points.reduceToImage(['historical'],ee.Reducer.firstNonNull())
  .unmask(0) // take into account areas without points for reduction
  .reproject('epsg:4326',null,ptScale);
// specify output scale, in this case 1km
var outScale = ee.Number(1000);
// reduce resolution of Image and reproject from ptScale to outScale and clip to polygon
var hist = ptImg.reduceResolution(ee.Reducer.mean(),false,1024)
  .reproject('epsg:4326',null,outScale)
var ptImg = m.points.reduceToImage(['rcp45_A0_2041-2060'],ee.Reducer.firstNonNull())
  .unmask(0) // take into account areas without points for reduction
  .reproject('epsg:4326',null,ptScale);
var rcp45_2041_2060 = ptImg.reduceResolution(ee.Reducer.mean(),false,1024)
  .reproject('epsg:4326',null,outScale)
var ptImg = m.points.reduceToImage(['rcp45_A0_2061-2080'],ee.Reducer.firstNonNull())
  .unmask(0) // take into account areas without points for reduction
  .reproject('epsg:4326',null,ptScale);
var rcp45_2061_2080 = ptImg.reduceResolution(ee.Reducer.mean(),false,1024)
  .reproject('epsg:4326',null,outScale)
var ptImg = m.points.reduceToImage(['rcp85_A0_2041-2060'],ee.Reducer.firstNonNull())
  .unmask(0) // take into account areas without points for reduction
  .reproject('epsg:4326',null,ptScale);
var rcp85_2041_2060 = ptImg.reduceResolution(ee.Reducer.mean(),false,1024)
  .reproject('epsg:4326',null,outScale)
var ptImg = m.points.reduceToImage(['rcp85_A0_2061-2080'],ee.Reducer.firstNonNull())
  .unmask(0) // take into account areas without points for reduction
  .reproject('epsg:4326',null,ptScale);
var rcp85_2061_2080 = ptImg.reduceResolution(ee.Reducer.mean(),false,1024)
  .reproject('epsg:4326',null,outScale)
var vis = {
  min: 0,
  max: 1,
palette: [
    "#000080","#0000D9","#4000FF","#8000FF","#0080FF","#00FFFF",
    "#00FF80","#80FF00","#DAFF00","#FFFF00","#FFF500","#FFDA00",
    "#FFB000","#FFA400","#FF4F00","#FF2500","#FF0A00","#FF00FF",
  ]
};
// Map.addLayer(hist,vis);
// Map.addLayer(rcp45_2041_2060,vis);
// Map.addLayer(rcp45_2061_2080,vis);
// Map.addLayer(rcp85_2041_2060,vis);
// Map.addLayer(rcp85_2061_2080,vis);
m.collect = ee.Image.cat([hist, rcp45_2041_2060, rcp45_2061_2080, rcp85_2041_2060, rcp85_2061_2080]);
print(m.collect)
var leftMap = ui.Map();
var rightMap = ui.Map();
leftMap.setCenter(12.39, 47.30, 10);
var hist_i = ui.Map.Layer(hist, vis)
var rcp85_80_i = ui.Map.Layer(rcp85_2061_2080, vis)
var hist_l = leftMap.layers()
var rcp85_80_l = rightMap.layers()
hist_l.add(hist_i)
rcp85_80_l.add(rcp85_80_i)
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  orientation: "horizontal",
  wipe: true
})
ui.root.clear();
ui.root.add(splitPanel);
var linkPanel = ui.Map.Linker([leftMap, rightMap])
var Panel = ui.Panel({style: {position:'bottom-left', width: "275px"}});
var label = ui.Label("Robinia_pseudoacacia Historical distribution, here some other information can be added maybe photo");
Panel.add(label);
leftMap.add(Panel);
var Panel = ui.Panel({style: {position:'bottom-right', width: "275px"}});
var label = ui.Label("Robinia_pseudoacacia rcp85_2061_2080 distribution");
Panel.add(label);
rightMap.add(Panel);
// m.imgInfo = {
// bands: {
//   "zone 1":{
//     bname: "b1",
//     color: "d4e7b0",
//     vis: {
//       min:0,
//       max:1,
//         palette: [
//     "#000080","#0000D9","#4000FF","#8000FF","#0080FF","#00FFFF",
//     "#00FF80","#80FF00","#DAFF00","#FFFF00","#FFF500","#FFDA00",
//     "#FFB000","#FFA400","#FF4F00","#FF2500","#FF0A00","#FF00FF",
//   ]
// }},
//   "zone 2":{
//     bname: "b1_1",
//     color: "d4e7b0",
//     vis: {
//       min:0,
//       max:1,
//         palette: [
//     "#000080","#0000D9","#4000FF","#8000FF","#0080FF","#00FFFF",
//     "#00FF80","#80FF00","#DAFF00","#FFFF00","#FFF500","#FFDA00",
//     "#FFB000","#FFA400","#FF4F00","#FF2500","#FF0A00","#FF00FF",
//   ]
// }},
//   "zone 3":{
//     bname: "b1_2",
//     color: "d4e7b0",
//     vis: {
//       min:0,
//       max:1,
//         palette: [
//     "#000080","#0000D9","#4000FF","#8000FF","#0080FF","#00FFFF",
//     "#00FF80","#80FF00","#DAFF00","#FFFF00","#FFF500","#FFDA00",
//     "#FFB000","#FFA400","#FF4F00","#FF2500","#FF0A00","#FF00FF",
//   ]
// }},
//   "zone 4":{
//     bname: "b1_3",
//     color: "d4e7b0",
//     vis: {
//       min:0,
//       max:1,
//         palette: [
//     "#000080","#0000D9","#4000FF","#8000FF","#0080FF","#00FFFF",
//     "#00FF80","#80FF00","#DAFF00","#FFFF00","#FFF500","#FFDA00",
//     "#FFB000","#FFA400","#FF4F00","#FF2500","#FF0A00","#FF00FF",
//   ]
// }},  "zone 5":{
//     bname: "b1_4",
//     color: "d4e7b0",
//     vis: {
//       min:0,
//       max:1,
//         palette: [
//     "#000080","#0000D9","#4000FF","#8000FF","#0080FF","#00FFFF",
//     "#00FF80","#80FF00","#DAFF00","#FFFF00","#FFF500","#FFDA00",
//     "#FFB000","#FFA400","#FF4F00","#FF2500","#FF0A00","#FF00FF",
//   ]
// }},"zone 6":{
//     bname: "b1_5",
//     color: "d4e7h0",
//     vis: {
//       min:0,
//       max:1,
//         palette: [
//     "#000080","#0000D9","#4000FF","#8000FF","#0080FF","#00FFFF",
//     "#00FF80","#80FF00","#DAFF00","#FFFF00","#FFF500","#FFDA00",
//     "#FFB000","#FFA400","#FF4F00","#FF2500","#FF0A00","#FF00FF",
//   ]
// }}},
// }
// /*******************************************************************************
// * Components *
// *
// * A section to define the widgets that will compose your app.
// *
// * Guidelines:
// * 1. Except for static text and constraints, accept default values;
// *    initialize others in the initialization section.
// * 2. Limit composition of widgets to those belonging to an inseparable unit
// *    (i.e. a group of widgets that would make no sense out of order).
// ******************************************************************************/
// var c = {};
// c.controlPanel = ui.Panel();
// c.selectBand = {};
// c.selectBand.label = ui.Label("Select band to display");
// c.selectBand.selector = ui.Select(Object.keys(m.imgInfo.bands), null, "zone 1");
// c.selectBand.panel = ui.Panel([c.selectBand.label, c.selectBand.selector]);
// ui.root.add(c.controlPanel);
// leftMap.add(c.selectBand.panel)
// /*******************************************************************************
// * Composition * 
// *
// * A section to compose the app i.e. add child widgets and widget groups to
// * first-level parent components like control panels and maps.
// *
// * Guidelines: There is a gradient between components and composition. There
// * are no hard guidelines here; use this section to help conceptually break up
// * the composition of complicated apps with many widgets and widget groups.
// ******************************************************************************/
// ui.root.clear();
// ui.root.add(c.controlPanel);
// ui.root.add(c.map);
// c.controlPanel.add(c.selectBand.panel);
// /*******************************************************************************
// * Styling *
// *
// * A section to define and set widget style properties.
// *
// * Guidelines:
// * 1. At the top, define styles for widget "classes" i.e. styles that might be
// *    applied to several widgets, like text styles or margin styles.
// * 2. Set "inline" style properties for single-use styles.
// * 3. You can add multiple styles to widgets, add "inline" style followed by
// *    "class" styles. If multiple styles need to be set on the same widget, do
// *    it consecutively to maintain order.
// ******************************************************************************/
// var s = {};
// c.controlPanel.style().set({
//   width: "275px"
// });
// /*******************************************************************************
// * Behaviors *
// *
// * A section to define app behavior on UI activity.
// *
// * Guidelines:
// * 1. At the top, define helper functions and functions that will be used as
// *    callbacks for multiple events.
// * 2. For single-use callbacks, define them just prior to assignment. If
// *    multiple callbacks are required for a widget, add them consecutively to
// *    maintain order; single-use followed by multi-use.
// * 3. As much as possible, include callbacks that update URL parameters.
// ******************************************************************************/
// function updateMap () {
//   var band = c.selectBand.selector.getValue();
//   var layer = ui.Map.Layer({
//   eeObject: m.collect.select(m.imgInfo.bands[band].bname),
//   visParams: m.imgInfo.bands[band].vis,
//   });
//   c.map.layers().set(0, layer);
//   var layer2 = ui.Map.Layer({
//   eeObject: m.collect.select(m.imgInfo.bands[band].bname),
//   visParams: m.imgInfo.bands[band].vis,
//   });
//   c.map.layers().set(0, layer2);
// }
// c.selectBand.selector.onChange(updateMap);
// /*******************************************************************************
// * Initialize *
// *
// * A section to initialize the app state on load.
// *
// * Guidelines:
// * 1. At the top, define any helper functions.
// * 2. As much as possible, use URL params to initial the state of the app.
// ******************************************************************************/
// c.map.setCenter(16, 63, 6);