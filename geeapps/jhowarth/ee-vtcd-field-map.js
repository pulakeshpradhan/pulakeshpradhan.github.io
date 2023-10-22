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
// var lc = require("users/jhowarth/cd-usa-vt-middlebury:layers/land-cover.js");
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
  title: cart.makeTitle('Field Map'), 
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
// print('STUDY REGIONS', region);
// Center the map on the town subject. 
layout.map.centerObject(region.town.fc, 12);
// -------------------------------------------------------------------------------------
// Add REM 
// -------------------------------------------------------------------------------------
var rem = {};
rem.otter = ee.Image("projects/conservation-design/assets/REM_Otter_0403");
rem.midd = ee.Image("projects/conservation-design/assets/REM_Middleburry_0403");
rem.layer_name = "Relative elevation model";
rem.viz = {
  min: 0, 
  max: 4.572, 
  palette: ['#081d58', '#0f2b68', '#173877', '#1e4785', '#255792', '#2c679e', '#3278a9', '#3889b2', '#3c9bba', '#40acc1', '#5bbdc3', '#84cac2', '#a6d9c5', '#c5e6cf', '#e3f3e1', '#ffffff']
  }
;
layout.map.addLayer(rem.otter.updateMask(rem.viz.max), rem.viz, "REM Otter Creek", false);
layout.map.addLayer(rem.midd.updateMask(rem.viz.max), rem.viz, "REM Middlebury River", false);
// -------------------------------------------------------------------------------------
// Add farmland soils layer and legend. 
// -------------------------------------------------------------------------------------
var farmlands = {};
farmlands.i = ee.Image("projects/conservation-design/assets/Farmland_soils_0404");
farmlands.viz = {
  min: 1,
  max: 4,
  palette: ["#AE80BD", "#77bc79", "Gainsboro", "#706E58"]
};
farmlands.class_names = ["Prime", "Statewide", "Not farmland", "Developed"];
farmlands.layer_name = "Development of farmland soils";
layout.map.addLayer(farmlands.i, farmlands.viz, farmlands.layer_name, false);
var legend_farmlands = cart.makeLegend(
  farmlands.layer_name, 
  farmlands.viz.palette, 
  farmlands.class_names
  )
; 
layout.panel.add(legend_farmlands);
// -------------------------------------------------------------------------------------
// Add grasslands layer and legend. 
// -------------------------------------------------------------------------------------
var grasslands = {};
grasslands.i = ee.Image("projects/conservation-design/assets/Grassland_habitat_blocks_0404");
grasslands.class_names = [
  "Not advisory or priority grassland habitat", 
  "Advisory grassland habitat blocks",
  "Priority grassland habitat"]
;
grasslands.viz = {min:0, max:2, palette: ['#ffffff', '#efb8ea', '#d96fd5']};
layout.map.addLayer(grasslands.i.selfMask(), grasslands.viz, 'Grassland habitat blocks', false);
var legend_grasslands = cart.makeLegend(
  "Grassland habitat blocks",
  grasslands.viz.palette,
  grasslands.class_names
  )
;
layout.panel.add(legend_grasslands);
// -------------------------------------------------------------------------------------
// Add wetland layer and legend. 
// -------------------------------------------------------------------------------------
var wetlands = {};
// Make viz parameters and class name labels. 
wetlands.i = ee.Image("projects/conservation-design/assets/Wetlands_Addison_County")
  .select('Wetlands')
;
wetlands.viz = {min: 1, max: 5, palette: ["#24B3F0", "#F0BA18", "#3cf0c4", "#F09630", "#c2fbe7"]};
wetlands.class_names = ["Class_I_wetlands", "Class_I_setbacks", "Class_II_wetlands", "Class_II_setbacks", 'Advisory_wetlands'];
wetlands.layer_name = "Wetlands";
// Add legend to panel.
var legend_wetland = cart.makeLegend(
  wetlands.layer_name, 
  wetlands.viz.palette, 
  wetlands.class_names)
;
layout.panel.add(legend_wetland);
layout.map.setOptions('HYBRID');
layout.map.setCenter(-73.168653, 44.013396, 13);
layout.map.addLayer(wetlands.i, wetlands.viz, wetlands.layer_name, false);
// -------------------------------------------------------------------------------------
// Add surface waters layer and legend. 
// -------------------------------------------------------------------------------------
var waters = {};
waters.i = ee.Image("projects/conservation-design/assets/Surface_water_setback_comparison");
var palette = {};
palette.midd = "#6767E6";
palette.anr = "#CC5CF2";
palette.agree = "#5AC7F2";
palette.colors = [palette.midd, palette.anr, palette.agree];
palette.labels = ['Town setbacks', 'ANR zones', 'Agreement'];
// print('PALETTE', palette);
palette.legend = cart.makeLegend('Surface waters', palette.colors, palette.labels);
layout.panel.add(palette.legend);
layout.map.addLayer(
  waters.i.selfMask(),
  {min:1, max: 3, palette: [palette.midd, palette.anr, palette.agree]},
  "Comparison of Midd with FEH and FHA and ANR surface water setbacks",
  false
  )
;
// -------------------------------------------------------------------------------------
// Add college lands layer. 
// -------------------------------------------------------------------------------------
var college = {};
college.fc = ee.FeatureCollection("projects/conservation-atlas/assets/cadastre/Midd_College_Parcels_withattributes");
layout.map.addLayer(college.fc, {color: 'yellow'}, "College Lands", false);