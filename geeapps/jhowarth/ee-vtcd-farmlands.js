//  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//  name:     farmlands.js 
//  purpose:  evaluate farmlands in Middlebury, Vermont
//
//  author:   Jeff Howarth
//  update:   02/23/2023  
//  license:  Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)
//  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var data = require("users/jhowarth/cd-usa-vt-middlebury:modules/data.js");
var cart = require('users/jhowarth/cd-usa-vt-middlebury:modules/cart.js');
var region = require("users/jhowarth/cd-usa-vt-middlebury:layers/study_regions.js");
var lc = require("users/jhowarth/cd-usa-vt-middlebury:layers/land-cover.js");
// -------------------------------------------------------------------------------------
// Compose layout
// -------------------------------------------------------------------------------------
// Use cart tool to make layout dictionary.  
var layout = cart.makeLayout();
// Print the dictionary. 
// print('LAYOUT', layout);
//  Clear root.
//  Then add split panel from layout dictionary to root.
ui.root.clear();
ui.root.add(layout.split_panel);
// Set the basemap to 'HYBRID'.
layout.map.setOptions('HYBRID');
// -------------------------------------------------------------------------------------
// Add title and subtitle to panel. 
// -------------------------------------------------------------------------------------
// Make label dictionary. 
// Use cart tool to populate with title, subtitle, land acknowledgement, and credits. 
var labels = {
  title: cart.makeTitle('Farmlands'), 
  sub_title: cart.makeSubTitle('Middlebury, Vermont'), 
  ack: cart.makeAck('Middlebury is unceded Abenaki land.'),
  credits: cart.makeCredits('Jeff Howarth Geography Dept\nMiddlebury College', 'https://jeffhowarth.github.io/eeprimer/')
};
// Print the dictionary to inspect. 
// print('LABELS', labels);
// Add the title and subtitle to the layout panel. 
layout.panel
  .add(labels.title)
  .add(labels.sub_title)
;
// -------------------------------------------------------------------------------------
// Make reference layers. 
// -------------------------------------------------------------------------------------
// Rename the 'region' dictionary from the imported 'region' layer to simplify calling it.  
var region = region.region;
// Print the imported dictionary to see the study regions that available. 
print('STUDY REGIONS', region);
// Center the map on the town subject. 
layout.map.centerObject(region.town.fc, 12);
// -------------------------------------------------------------------------------------
//  SOILS  
// -------------------------------------------------------------------------------------
// Load the NRCS soils dictionary from the data module. 
var soils = data.soils.nrcs;
// Print the dictionary. 
print('SOILS', soils);
// Make a feature collection of the soils for the entire state. 
soils.fc = ee.FeatureCollection(soils.fc_address);
// Print the unique attributes in the 'PRIME' field.
print('PRIME ATTRIBUTES', soils.fc.aggregate_array('PRIME').distinct().sort());
// ----------------------
// Farmland soils
// ----------------------
// Make a nominal immage by calling the makeNominalImageFromFC() function from the data module. 
soils.i = data.makeNominalImageFromFC(soils.fc, 'PRIME', 'TAG');
// Put the 'tag dictionary' for the nominal image by calling the makeTagDictionary function from the data module. 
soils.tagDictionary = data.makeTagDictionary(soils.fc, 'PRIME');
// // Print the soils dictionary to check your work. 
// print('SOILS', soils);
// //  Add farmland soils layer to the map. 
// layout.map.addLayer(soils.i, soils.farmlands.viz, soils.farmlands.layer_name, false);
// -------------------------
// Simplified farmland soils
// -------------------------
soils.farmlands.simple_class = {};
soils.farmlands.simple_class.i = soils.i.remap(
  [0,1,2,3,4,5,6,7,8,9,10,11],
  [3,3,3,3,3,1,1,1,2,2, 2, 2]
  )
;
soils.farmlands.simple_class.class_names = ["Prime", "Statewide", "Not Farmland"];
soils.farmlands.simple_class.viz = {min: 1, max:3, palette: ["#AE80BD", "#77bc79", "Gainsboro"]};
soils.farmlands.simple_class.layer_name = "Simple farmland soils class";
layout.map.addLayer(
  soils.farmlands.simple_class.i, 
  soils.farmlands.simple_class.viz, 
  soils.farmlands.simple_class.layer_name,
  false
  );
// -------------------------------------------------------------------------------------
//  Use value appraisal parcels 
// -------------------------------------------------------------------------------------
// Load the uva dictionary from the data module. 
var uva = data.uva;
// Print to inspect.
print('UVA', uva);
// Make a feature collection  
uva.fc = ee.FeatureCollection(uva.fc_address);
// Make a binary image. 
uva.i = data.fcMakeBinaryImage(uva.fc);
// Explore the unique attribute for MGMTPLAN and ACTIVE.
uva.mgmtplan = uva.fc.aggregate_array('MGMTPLAN').distinct().sort();
uva.active = uva.fc.aggregate_array('ACTIVE').distinct().sort();
print("UVA", uva);
// Add farmland soils with uva mask. 
layout.map.addLayer(
  soils.farmlands.simple_class.i.updateMask(uva.i), 
  soils.farmlands.simple_class.viz, 
  uva.layer_name, 
  false
  )
;
// -------------------------------------------------------------------------------------
// Compare farmland soils to developed land cover classes.  
// -------------------------------------------------------------------------------------  
var lc = lc.lc;
print('LAND COVER', lc);
// Distinguish developed from undeveloped land cover.
lc.dev = {};
lc.dev.i_tag = lc.lcp.i.remap(
  [0,1,2,3,4,5,6,7,8,9,10],
  [0,0,0,0,0,1,1,1,1,1,1]
  );
// Add developed binary to simple soils class.
soils.farmlands.simple_class.dev = {};
soils.farmlands.simple_class.dev.i = soils.farmlands.simple_class.i.max(lc.dev.i_tag.multiply(4));
soils.farmlands.simple_class.dev.viz = {
  min: 1,
  max: 4,
  palette: ["#AE80BD", "#77bc79", "Gainsboro", "#706E58"]
};
soils.farmlands.simple_class.dev.class_names = ["Prime", "Statewide", "Not farmland", "Developed"];
soils.farmlands.simple_class.dev.layer_name = "Development of farmland soils";
layout.map.addLayer(soils.farmlands.simple_class.dev.i, 
  soils.farmlands.simple_class.dev.viz, 
  soils.farmlands.simple_class.dev.layer_name);
// -------------------------------------------------------------------------------------
// Add study region layer to top of layer stack. 
// -------------------------------------------------------------------------------------  
// Add the study region (town with neighbors) as a layer. 
layout.map.addLayer(region.town.neighbors_fc.style(cart.study_region_style), {}, 'Study region', true);
// -------------------------------------------------------------------------------------
// Add a legend. 
// -------------------------------------------------------------------------------------  
soils.farmlands.simple_class.dev.legend = cart.makeLegend(
  "Farmland soils",
  soils.farmlands.simple_class.dev.viz.palette,
  soils.farmlands.simple_class.dev.class_names
  )
;
layout.panel.add(soils.farmlands.simple_class.dev.legend);
// -------------------------------------------------------------------------------------
// Chart the layer for to compare multiple regions.
// -------------------------------------------------------------------------------------
// Define the target.
var target = soils.farmlands.simple_class;
// CHART SOILS AS REPORTED IN SURVEY
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Create multi-band image to chart.
// // This chart may have too many classes for laypeople to interpret. 
// target.stack_regions = 
//   target.i.eq(0).multiply(ee.Image.pixelArea()).rename('00_Not_classed')
//   .addBands(target.i.eq(1).multiply(ee.Image.pixelArea()).rename('01_Local'))
//   .addBands(target.i.eq(2).multiply(ee.Image.pixelArea()).rename('02_Local_b'))
//   .addBands(target.i.eq(3).multiply(ee.Image.pixelArea()).rename('03_NPSL'))
//   .addBands(target.i.eq(4).multiply(ee.Image.pixelArea()).rename('04_Not_rated')) 
//   .addBands(target.i.eq(5).multiply(ee.Image.pixelArea()).rename('05_Prime'))
//   .addBands(target.i.eq(6).multiply(ee.Image.pixelArea()).rename('06_Prime_b'))
//   .addBands(target.i.eq(7).multiply(ee.Image.pixelArea()).rename('07_Prime_f'))
//   .addBands(target.i.eq(8).multiply(ee.Image.pixelArea()).rename('08_Statewide'))
//   .addBands(target.i.eq(9).multiply(ee.Image.pixelArea()).rename('09_Statewide_a'))
//   .addBands(target.i.eq(10).multiply(ee.Image.pixelArea()).rename('10_Statewide_b'))
//   .addBands(target.i.eq(11).multiply(ee.Image.pixelArea()).rename('11_Statewide_c'))
// ;
// This chart has fewer classes and may be more digestible for laypeople. 
target.stack_regions = 
  target.i.eq(1).multiply(ee.Image.pixelArea()).rename('00_Prime_soils')
  .addBands(target.i.eq(2).multiply(ee.Image.pixelArea()).rename('01_Statewide_soils'))
  .addBands(target.i.eq(3).multiply(ee.Image.pixelArea()).rename('02_not_farmland_soils'))
;
// Define chart parameters for Midd site. 
target.chart_params_region_site = {
  image: target.stack_regions,            // Image with dough bands and cutter band.
  regions: region.town.fc,      // Region to perform operation.  
  reducer: ee.Reducer.sum(),              // Type of zonal statistic to calculate.  
  scale: 10,                              // Scale to carry out operation.
  xProperty: 'TOWNNAME',                  // Labels of cutters to use in chart.
  }
;
// Make the chart. 
target.chart_region_site = ui.Chart.image.byRegion(target.chart_params_region_site)      // Dictionary of chart arguments.  
    .setChartType('BarChart')                         // Type of chart.
    .setOptions(cart.makeBarChartStyle(
      target.viz.palette, 
      "Farmland soils (1971)", 
      'percent', 
      '30%', 
      '50%',
      'none'
      ))
;
// Add the chart to the panel. 
layout.panel.add(target.chart_region_site);
// CHART SOILS THAT ARE STILL UNDEVELOPED
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// This chart has fewer classes and may be more digestible for laypeople. 
target.dev.stack_regions = 
  target.dev.i.eq(1).multiply(ee.Image.pixelArea()).rename('00_Prime_soils')
  .addBands(target.dev.i.eq(2).multiply(ee.Image.pixelArea()).rename('02_Statewide_soils'))
  .addBands(target.dev.i.eq(3).multiply(ee.Image.pixelArea()).rename('03_not_farmland_soils'))
  .addBands(target.dev.i.eq(4).multiply(ee.Image.pixelArea()).rename('04_developed'))
;
// Define chart parameters for Midd site. 
target.dev.chart_params_region_site = {
  image: target.dev.stack_regions,            // Image with dough bands and cutter band.
  regions: region.town.fc,      // Region to perform operation.  
  reducer: ee.Reducer.sum(),              // Type of zonal statistic to calculate.  
  scale: 10,                              // Scale to carry out operation.
  xProperty: 'TOWNNAME',                  // Labels of cutters to use in chart.
  }
;
// Make the chart. 
target.dev.chart_region_site = ui.Chart.image.byRegion(target.dev.chart_params_region_site)      // Dictionary of chart arguments.  
    .setChartType('BarChart')                         // Type of chart.
    .setOptions(cart.makeBarChartStyle(
      target.dev.viz.palette, 
      "Farmland soils (2016)", 
      'percent', 
      '30%', 
      '50%',
      'none'
      ))
;
// Add the chart to the panel. 
layout.panel.add(target.dev.chart_region_site);
// // Define chart parameters for Midd situation. 
// target.chart_params_region_situation = {
//   image: target.stack_regions,            // Image with dough bands and cutter band.
//   regions: region.town.neighbors_fc,      // Region to perform operation.  
//   reducer: ee.Reducer.sum(),              // Type of zonal statistic to calculate.  
//   scale: 10,                              // Scale to carry out operation.
//   xProperty: 'TOWNNAME',                  // Labels of cutters to use in chart.
//   }
// ;
// // Make the chart. 
// target.chart_region_situation = ui.Chart.image.byRegion(target.chart_params_region_situation)      // Dictionary of chart arguments.  
//     .setChartType('BarChart')                         // Type of chart.
//     .setOptions(cart.makeBarChartStyle(
//       target.farmlands.viz.palette, 
//       target.farmlands.layer_name, 
//       'percent', 
//       '66%', 
//       '95%',
//       'none'
//       ))
// ;
// // Add the chart to the panel. 
// layout.panel.add(target.chart_region_situation);
// // -------------------------------------------------------------------------------------
// // Add a legend to the panel
// // -------------------------------------------------------------------------------------
// var legend = cart.makeLegend(
//   soils.farmlands.layer_name, 
//   soils.farmlands.viz.palette, 
//   soils.farmlands.class_names
//   )
// ; 
// layout.panel.add(legend);
// ------------------------------------------------------------------------------------- 
// Add marginalia to bottom of layout panel. 
// -------------------------------------------------------------------------------------  
layout.panel
  .add(labels.ack)
  .add(labels.credits)
;