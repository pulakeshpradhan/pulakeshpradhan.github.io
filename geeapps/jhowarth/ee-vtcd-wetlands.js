//  --------------------------------------------------------------------------------
//  Name:    wetlands.js 
//  Purpose: Prepare wetlands layer from class and advisory inputs. 
//
//  Author:  Jeff Howarth
//  Updated: 3/21/2023  
//  License: Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)
//  --------------------------------------------------------------------------------
// Load modules
var data = require('users/jhowarth/cd-usa-vt-middlebury:modules/data.js');
var cart = require('users/jhowarth/cd-usa-vt-middlebury:modules/cart.js');
var study_regions = require('users/jhowarth/cd-usa-vt-middlebury:layers/study_regions.js');
var pro_lands = require('users/jhowarth/cd-usa-vt-middlebury:layers/pro_lands_simple.js');
// var lc = require('users/jhowarth/cd-usa-vt-middlebury:layers/land-cover.js');
// var rem = require('users/jhowarth/cd-usa-vt-middlebury:layers/rem.js');
// var vcd = require('users/jhowarth/cd-usa-vt-middlebury:layers/vcd.js');
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
// -------------------------------------------------------------------------------------
// Add title and subtitle to panel. 
// -------------------------------------------------------------------------------------
// Make label dictionary. 
// Use cart tool to populate with title, subtitle, land acknowledgement, and credits. 
var labels = {
  title: cart.makeTitle('Wetlands'), 
  sub_title: cart.makeSubTitle('Middlebury, Vermont'), 
  abstract: cart.makeSource("Read me", "https://docs.google.com/document/d/1aitt9qVjfUxPfn4p0162LvoOL-n4HlExFg37rHtyhzo/edit?usp=sharing"),
  ack: cart.makeAck('Middlebury is unceded Abenaki land.'),
  credits: cart.makeCredits('Jeff Howarth\nGeography Dept\nMiddlebury College')
};
// Print the dictionary to inspect. 
// print('LABELS', labels);
// Add the title and subtitle to the layout panel. 
layout.panel
  .add(labels.title)
  .add(labels.sub_title)
  .add(labels.abstract)
;
// -------------------------------------------------------------------------------------
// Define study region.
// -------------------------------------------------------------------------------------
// Load the administrative regions dictionary from data module. 
var region = study_regions.region;
region.town.i = data.fcMakeBinaryImage(region.town.fc);
var study_region = region.state.fc;
// Print the region dictionary so that you can see the sub-dictionaries it contains.
print('REGION STARTS', region);
layout.map.setOptions('HYBRID');
layout.map.centerObject(region.town.fc, 13);
// -------------------------------------------------------------------------------------
// Make wetlands dictionary
// -------------------------------------------------------------------------------------
var wetlands = data.wetlands;
print("WETLANDS", wetlands);
// -------------------------------------------------------------------------------------
// Make wetlands class layer. 
// -------------------------------------------------------------------------------------
// Class layer
wetlands.vswi_class.fc = data.fcFilterByRegion(wetlands.vswi_class.fc_address, study_region);
// layout.map.addLayer(wetlands.vswi_class.fc, {color: 'blue'}, wetlands.vswi_class.layer_name, false);
// print(
//   "CLASS",
//   wetlands.vswi_class.fc.first(),
//   wetlands.vswi_class.fc.aggregate_array('CLASS').distinct().sort()
//   )
// ;
wetlands.vswi_class.i = data.makeNominalImage(wetlands.vswi_class.fc, 'CLASS')
    .remap([0,1,2,10], [0,1,3,2])
    .rename(wetlands.vswi_class.layer_name);
wetlands.vswi_class.viz = {min:1, max: 3, palette: ["#24B3F0","#F0BA18", "#3cf0c4"]};
wetlands.vswi_class.class_names = ["Class I wetlands", "Class I setback", "Class II wetlands"];
// layout.map.addLayer(
//   wetlands.vswi_class.i, 
//   wetlands.vswi_class.viz, 
//   wetlands.vswi_class.layer_name, 
//   false
//   )
// ;
// -------------------------------------------------------------------------------------
// Add buffer for Class II wetlands.
// -------------------------------------------------------------------------------------
wetlands.ii_setback = {};
// Write a function to buffer image by distance. 
var iBuffer = function(i, d) {
  return i
    .unmask()
    .distance(
      ee.Kernel.euclidean(d + 100, 'meters', false)
      )
    // .reproject('EPSG: 32145')
    .lte(d)
    .multiply(i.unmask().neq(1))
    .unmask()
  ;
};
// Define distance to buffer Class II wetlands. 
wetlands.ii_setback.d = 50 * 0.3048;
wetlands.ii_setback.layer_name = "Class_II_setback";
wetlands.ii_setback.viz = {min:0, max: 1, palette: ["#F09630"]};
// Apply buffer to Class II wetlands.
wetlands.ii_setback.i = iBuffer(
  wetlands.vswi_class.i.eq(3),    // Isolate Class II wetlands
  wetlands.ii_setback.d           // Apply buffer 
  )
;
// print(wetlands);
// // Add layer to map.
// layout.map.addLayer(
//   wetlands.ii_setback.i.selfMask(),
//   wetlands.ii_setback.viz,
//   wetlands.ii_setback.layer_name,
//   false
//   );
// -------------------------------------------------------------------------------------
// Make wetlands advisory layers.
// -------------------------------------------------------------------------------------
// Make feature collections from wetlands advisory sources.
wetlands.vswi_advisory.fc = data.fcFilterByRegion(wetlands.vswi_advisory.fc_address, study_region);
wetlands.midd_arrow.fc = data.fcFilterByRegion(wetlands.midd_arrow.fc_address, study_region);
wetlands.vernal_pools.fc = data.fcFilterByRegion(wetlands.vernal_pools.fc_address, study_region);
// print(wetlands.vernal_pools.fc
//   .aggregate_array('Class_name')
//   .distinct()
//   .sort()
//   )
// ;
// Make images from advisory feature collections. 
wetlands.vswi_advisory.i = data.fcMakeBinaryImage(wetlands.vswi_advisory.fc).unmask();
wetlands.midd_arrow.i = data.fcMakeBinaryImage(wetlands.midd_arrow.fc).unmask();
wetlands.vernal_pools.i = data.makeNominalImageFromFC(wetlands.vernal_pools.fc, 'Class_name', 'Class_name')
  .remap(
    [0,1,2,3,4,5,6,7],
    [1,0,0,0,1,0,1,0]
    )
  ;
// print(
//   "ADVISORY", 
//   wetlands.midd_arrow.fc.filter(ee.Filter.eq('FIELDVISIT', "N")),
//   wetlands.midd_arrow.fc.aggregate_array('FIELDVISIT').distinct().sort()
//   )
// ;
// Define viz properties. 
wetlands.vswi_advisory.viz = {min:0, max: 1, palette: ['cyan']};
wetlands.midd_arrow.viz = {min:0, max:1, palette: ['magenta']};
wetlands.vernal_pools.viz = {min:0, max:1, palette: ['yellow']};
// // Add images as layers to map. 
// layout.map.addLayer(wetlands.vswi_advisory.i.selfMask(), wetlands.vswi_advisory.viz, wetlands.vswi_advisory.layer_name, false);
// layout.map.addLayer(wetlands.midd_arrow.i.selfMask(), wetlands.midd_arrow.viz, wetlands.midd_arrow.layer_name, false);
// layout.map.addLayer(wetlands.vernal_pools.i.selfMask(), wetlands.vernal_pools.viz, wetlands.vernal_pools.layer_name, false);
// -------------------------------------------------------------------------------------
// Combine advisory layers. 
// -------------------------------------------------------------------------------------
// Create an advisory sub-dictionary. 
wetlands.advisory = {};
wetlands.advisory.layer_name = "Advisory_compilation";
wetlands.advisory.viz = {min:0, max:1, palette:["#c2fbe7"]};
// Compile the advisory images as a union. 
wetlands.advisory.i = wetlands.vswi_advisory.i.unmask()
  .or(wetlands.midd_arrow.i.unmask()
  .or(wetlands.vernal_pools.i).unmask())
  ;
// // Add the compiled layer to the map. 
// layout.map.addLayer(wetlands.advisory.i.selfMask(), wetlands.advisory.viz, wetlands.advisory.layer_name, false);
// -------------------------------------------------------------------------------------
// Make wetlands compilation.
// -------------------------------------------------------------------------------------
var classWetlands = function() {
  // Reclassify the class layer.
  var first = wetlands.vswi_class.i
    .remap(
      [0,1,2,3], // Background, Class I, Class I setback, Class II
      [0,5,4,3])
    .unmask()
    ;
  // Add Class 2 buffer to Class layer. 
  var second = first.max(wetlands.ii_setback.i.multiply(2));
  // Add compiled advisory binary with Class 2 layer, where advisory regions = 1 in input 
  var combo = second.max(wetlands.advisory.i.unmask()); 
  // Reclass final output.
  return combo.remap([0,1,2,3,4,5], [0,5,4,3,2,1])
  ;
};
wetlands.compiled = {};
wetlands.compiled.i = classWetlands();
// Make viz parameters and class name labels. 
wetlands.compiled.viz = {min: 1, max: 5, palette: ["#24B3F0", "#F0BA18", "#3cf0c4", "#F09630", "#c2fbe7"]};
wetlands.compiled.class_names = ["Class_I_wetlands", "Class_I_setbacks", "Class_II_wetlands", "Class_II_setbacks", 'Advisory_wetlands'];
wetlands.compiled.layer_name = "Wetlands";
// // Add layer to map.
// layout.map.addLayer(wetlands.compiled.i.selfMask(), wetlands.compiled.viz, wetlands.compiled.layer_name, false);
// -------------------------------------------------------------------------------------
// Compile multi-band image.
// -------------------------------------------------------------------------------------
wetlands.i = wetlands.vswi_class.i.selfMask().rename(wetlands.vswi_class.layer_name)
  .addBands(wetlands.ii_setback.i.selfMask().rename(wetlands.ii_setback.layer_name))
  .addBands(wetlands.vswi_advisory.i.selfMask().rename(wetlands.vswi_advisory.layer_name))
  .addBands(wetlands.midd_arrow.i.selfMask().rename(wetlands.midd_arrow.layer_name))  
  .addBands(wetlands.vernal_pools.i.selfMask().rename(wetlands.vernal_pools.layer_name))  
  .addBands(wetlands.advisory.i.selfMask().rename(wetlands.advisory.layer_name))  
  .addBands(wetlands.compiled.i.selfMask().rename(wetlands.compiled.layer_name)) 
;
print('WETLANDS', wetlands);
// // ------------------------------------------------------------------------------------- 
// // Export to asset. 
// // -------------------------------------------------------------------------------------  
// var xName = "Wetlands_Addison_County";
// var xi = {
//   image: wetlands.i, 
//   description: xName, 
//   assetId: xName, 
//   pyramidingPolicy: "mode", 
//   // dimensions, 
//   region: region.county.fc, 
//   scale: 1, 
//   // crs, 
//   // crsTransform, 
//   maxPixels: 1e12, 
//   // shardSize
// };
// Export.image.toAsset(xi);
// -------------------------------------------------------------------------------------
// Display layers from asset image for faster display.
// -------------------------------------------------------------------------------------
var image = ee.Image("projects/conservation-design/assets/Wetlands_Addison_County");
// VSWI Class
layout.map.addLayer(
  image.select(wetlands.vswi_class.layer_name), 
  wetlands.vswi_class.viz, 
  wetlands.vswi_class.layer_name, 
  false
  )
;
// Class II setback
layout.map.addLayer(
  image.select(wetlands.ii_setback.layer_name),
  wetlands.ii_setback.viz,
  wetlands.ii_setback.layer_name,
  false
  );
// Advisory layers
layout.map.addLayer(
  image.select(wetlands.vswi_advisory.layer_name), 
  wetlands.vswi_advisory.viz, 
  wetlands.vswi_advisory.layer_name, 
  false
  )
;
layout.map.addLayer(
  image.select(wetlands.midd_arrow.layer_name), 
  wetlands.midd_arrow.viz, 
  wetlands.midd_arrow.layer_name, 
  false
  )
;
layout.map.addLayer(
  image.select(wetlands.vernal_pools.layer_name), 
  wetlands.vernal_pools.viz, 
  wetlands.vernal_pools.layer_name, 
  false
  )
;
// Add the compiled layer to the map. 
layout.map.addLayer(
  image.select(wetlands.advisory.layer_name), 
  wetlands.advisory.viz, 
  wetlands.advisory.layer_name, 
  false
  )
;
// Add wetlands compiled layer
layout.map.addLayer(
  image.select(wetlands.compiled.layer_name), 
  wetlands.compiled.viz, 
  wetlands.compiled.layer_name, 
  true
  )
;
// -------------------------------------------------------------------------------------
// Make legend.
// -------------------------------------------------------------------------------------
// Add legend to panel.
var legend = cart.makeLegend(
  wetlands.compiled.layer_name, 
  wetlands.compiled.viz.palette, 
  wetlands.compiled.class_names)
;
layout.panel.add(legend);
// -------------------------------------------------------------------------------------
// Chart wetland areas in Middlebury. 
// -------------------------------------------------------------------------------------
var target = wetlands.compiled;
var chart = {
  i: image.select("Wetlands").unmask().rename(target.layer_name),
  layer_name: target.layer_name,
  class_names: target.class_names.concat(["Not_wetland"]),
  palette: target.viz.palette.concat(["#fffff0"]),
  region: region.town.fc,
  region_name: "TOWNNAME",
  pixel_area: ee.Image.pixelArea().divide(4046.86)
};
// Create multi-band image to chart.
chart.stack = 
  chart.i.eq(0).multiply(chart.pixel_area).rename("b6_Not_wetlands")
  .addBands(chart.i.eq(1).multiply(chart.pixel_area).rename("b1_Class_I_setbacks"))  
  .addBands(chart.i.eq(2).multiply(chart.pixel_area).rename("b2_Class_I_setbacks"))
  .addBands(chart.i.eq(3).multiply(chart.pixel_area).rename("b3_Class_II_wetlands"))
  .addBands(chart.i.eq(4).multiply(chart.pixel_area).rename("b4_Class_II_setbacks"))
  .addBands(chart.i.eq(5).multiply(chart.pixel_area).rename("b5_Advisory_regions")) 
;
// Define chart parameters. 
chart.params = {
  image: chart.stack,                       // Image with dough bands and cutter band.
  regions: chart.region,                    // Region to perform operation.  
  reducer: ee.Reducer.sum(),                // Type of zonal statistic to calculate.  
  scale: 10,                                // Scale to carry out operation.
  xProperty: chart.region_name,             // Labels of cutters to use in chart.
  }
;
// Make the chart. 
chart.chart_by_region = ui.Chart.image.byRegion(chart.params)      // Dictionary of chart arguments.  
    .setChartType('BarChart')                                       // Type of chart.
    .setOptions(cart.makeBarChartStyle(
      chart.palette,                                                // Palette
      chart.layer_name,                                             // Title
      'percent',                                                    // Stacked (percent if true, null if false)
      '30%',                                                        // Chart height
      '50%',                                                        // Bar width
      'none',                                                       // Legend position
      0,                                                            // Horizontal axis minimum
      1                                                             // Horizontal axis maximum
      ))
;
print("CHART", chart);
// Add the chart to the panel. 
layout.panel.add(chart.chart_by_region);
// -------------------------------------------------------------------------------------
// Chart Class II wetland areas that are protected in Middlebury. 
// -------------------------------------------------------------------------------------
var pro_lands = pro_lands.pro_lands;
print('PROTECTED LANDS', pro_lands);
var target = pro_lands.lc2;
var chart = {
  i: target.i,
  i_mask: image.select("Wetlands").unmask().eq(3), 
  layer_name: target.layer_name,
  // class_names: target.class_names.concat(["Not_wetland"]),
  palette: target.viz.palette,
  region: region.town.fc,
  region_name: "TOWNNAME",
  pixel_area: ee.Image.pixelArea().divide(4046.86),
  title: "Percent of Class II wetlands with protections"
};
// Create multi-band image to chart.
chart.stack = 
  chart.i.eq(0).multiply(chart.pixel_area).updateMask(chart.i_mask).rename("b1_with_protections_recovering")
  .addBands(chart.i.eq(1).multiply(chart.pixel_area).updateMask(chart.i_mask).rename("b2_with_protections_clearing"))
  .addBands(chart.i.eq(2).multiply(chart.pixel_area).updateMask(chart.i_mask).rename("b3_without_protections"))
;
// Define chart parameters. 
chart.params = {
  image: chart.stack,                       // Image with dough bands and cutter band.
  regions: chart.region,                    // Region to perform operation.  
  reducer: ee.Reducer.sum(),                // Type of zonal statistic to calculate.  
  scale: 10,                                // Scale to carry out operation.
  xProperty: chart.region_name,             // Labels of cutters to use in chart.
  }
;
// Make the chart. 
chart.chart_by_region = ui.Chart.image.byRegion(chart.params)      // Dictionary of chart arguments.  
    .setChartType('BarChart')                                       // Type of chart.
    .setOptions(cart.makeBarChartStyle(
      chart.palette,                                                // Palette
      chart.title,                                           // Title
      'percent',                                                         // Stacked (percent if true, null if false)
      '30%',                                                        // Chart height
      '50%',                                                        // Bar width
      'none',                                                       // Legend position
      0,                                                            // Horizontal axis minimum
      1                                                             // Horizontal axis maximum
      ))
;
print("CHART", chart);
// Add the chart to the panel. 
layout.panel.add(chart.chart_by_region);
// -------------------------------------------------------------------------------------
// Chart Class II setback areas that are protected in Middlebury. 
// -------------------------------------------------------------------------------------
var chart = {
  i: target.i,
  i_mask: image.select("Wetlands").unmask().eq(4), 
  layer_name: target.layer_name,
  palette: target.viz.palette,
  region: region.town.fc,
  region_name: "TOWNNAME",
  pixel_area: ee.Image.pixelArea().divide(4046.86),
  title: "Percent of Class II wetlands setbacks with protections"
};
// Create multi-band image to chart.
chart.stack = 
  chart.i.eq(0).multiply(chart.pixel_area).updateMask(chart.i_mask).rename("b1_with_protections_recovering")
  .addBands(chart.i.eq(1).multiply(chart.pixel_area).updateMask(chart.i_mask).rename("b2_with_protections_clearing"))
  .addBands(chart.i.eq(2).multiply(chart.pixel_area).updateMask(chart.i_mask).rename("b3_without_protections"))
;
// Define chart parameters. 
chart.params = {
  image: chart.stack,                       // Image with dough bands and cutter band.
  regions: chart.region,                    // Region to perform operation.  
  reducer: ee.Reducer.sum(),                // Type of zonal statistic to calculate.  
  scale: 10,                                // Scale to carry out operation.
  xProperty: chart.region_name,             // Labels of cutters to use in chart.
  }
;
// Make the chart. 
chart.chart_by_region = ui.Chart.image.byRegion(chart.params)      // Dictionary of chart arguments.  
    .setChartType('BarChart')                                       // Type of chart.
    .setOptions(cart.makeBarChartStyle(
      chart.palette,                                                // Palette
      chart.title,                                           // Title
      'percent',                                                         // Stacked (percent if true, null if false)
      '30%',                                                        // Chart height
      '50%',                                                        // Bar width
      'none',                                                       // Legend position
      0,                                                            // Horizontal axis minimum
      1                                                             // Horizontal axis maximum
      ))
;
print("CHART", chart);
// Add the chart to the panel. 
layout.panel.add(chart.chart_by_region);
// -------------------------------------------------------------------------------------
// Chart Advisory areas that are protected in Middlebury. 
// -------------------------------------------------------------------------------------
var chart = {
  i: target.i,
  i_mask: image.select("Wetlands").unmask().eq(5), 
  layer_name: target.layer_name,
  // class_names: target.class_names.concat(["Not_wetland"]),
  palette: target.viz.palette,
  region: region.town.fc,
  region_name: "TOWNNAME",
  pixel_area: ee.Image.pixelArea().divide(4046.86),
  title: "Percent of advisory regions with protections"
};
// Create multi-band image to chart.
chart.stack = 
  chart.i.eq(0).multiply(chart.pixel_area).updateMask(chart.i_mask).rename("b1_with_protections_recovering")
  .addBands(chart.i.eq(1).multiply(chart.pixel_area).updateMask(chart.i_mask).rename("b2_with_protections_clearing"))
  .addBands(chart.i.eq(2).multiply(chart.pixel_area).updateMask(chart.i_mask).rename("b3_without_protections"))
;
// Define chart parameters. 
chart.params = {
  image: chart.stack,                       // Image with dough bands and cutter band.
  regions: chart.region,                    // Region to perform operation.  
  reducer: ee.Reducer.sum(),                // Type of zonal statistic to calculate.  
  scale: 10,                                // Scale to carry out operation.
  xProperty: chart.region_name,             // Labels of cutters to use in chart.
  }
;
// Make the chart. 
chart.chart_by_region = ui.Chart.image.byRegion(chart.params)      // Dictionary of chart arguments.  
    .setChartType('BarChart')                                       // Type of chart.
    .setOptions(cart.makeBarChartStyle(
      chart.palette,                                                // Palette
      chart.title,                                           // Title
      'percent',                                                         // Stacked (percent if true, null if false)
      '30%',                                                        // Chart height
      '50%',                                                        // Bar width
      'none',                                                       // Legend position
      0,                                                            // Horizontal axis minimum
      1                                                             // Horizontal axis maximum
      ))
;
print("CHART", chart);
// Add the chart to the panel. 
layout.panel.add(chart.chart_by_region);
// -------------------------------------------------------------------------------------
// Add study region layer to top of layer stack. 
// -------------------------------------------------------------------------------------  
// Add the study region (town with neighbors) as a layer. 
layout.map.addLayer(region.town.fc.style(cart.study_region_style), {}, 'Study region', true);
// ------------------------------------------------------------------------------------- 
// Add marginalia to bottom of layout panel. 
// -------------------------------------------------------------------------------------  
layout.panel
  .add(labels.ack)
  .add(labels.credits)
;