/*  
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  TITLE:    land_cover.js
  PURPOSE:  Compile a land cover layer from 2016 base and supplement layers; embed classes for human influence
            on natural habitats and edge influence on forest habitats from buffers; chart summaries and 
            regional comparisons (neighboring towns or towns). 
  AUTHUR:   Jeff Howarth
  UPDATED:  14 Feb 2022
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/
// Load modules
var data = require('users/jhowarth/cd-usa-vt-middlebury:modules/data.js');
var cart = require('users/jhowarth/cd-usa-vt-middlebury:modules/cart.js');
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
  title: cart.makeTitle('2016 Land cover'), 
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
// ++++++++++++++++++++++
// Administrative regions
// ++++++++++++++++++++++
// Load the administrative regions dictionary from data module. 
var region = data.admin_region;
// Print the region dictionary so that you can see the sub-dictionaries it contains.
// print('REGION STARTS', region);
// Add a poi to region dictionary to represent a study location. 
region.poi = ee.Geometry.Point([-73.168726, 44.013314]);
// Use data tool to add county feature collection filtered by poi to the county sub-dictionary. 
region.county.fc = data.fcFilterByRegion(
  region.county.fc_address, region.poi)
  ;
// Temporarily Add as map layer to inspect. 
// layout.map.addLayer(region.county.fc.style(cart.study_region_style), {}, 'Study region check', false);
// Use data tool to add state feature collection filtered by poi to the state sub-dictionary.
region.state.fc = data.fcFilterByRegion(region.state.fc_address, region.poi);
// Use data tool to add a binary mask from county feature collection to county sub-dictionary.  
region.county.i = data.fcMakeBinaryImage(region.county.fc)
;
// layout.map.addLayer(region.county.i, {}, 'Study region check', true);
// Use data tool to add town feature collection filtered by poi to the town sub-directory. 
region.town.fc = data.fcFilterByRegion(
  region.town.fc_address, region.poi)
  ;
// Identify the neighboring towns to study town (including study town).  
region.town.neighbors_fc = data.fcFilterByRegion(
  region.town.fc_address, region.town.fc)
  ;
// Print the region dictionary to see the additions. 
// print('REGION WITH ADMINISTRATIVE CONTEXTS', region);
// -------------------------------------------------------------------------------------
// Land cover layer  
// -------------------------------------------------------------------------------------
// Load land cover dictionary from data module. 
var lc = data.lc;
// Print dictionary to see what you are starting with. 
// print('LANDCOVER STARTS', lc);
// Center map on the town at zoom level 13. 
layout.map.centerObject(region.town.fc,13);
// Add land cover layer with the viz and layer_name keys. 
layout.map.addLayer(lc.base.i, lc.base.viz, lc.base.layer_name);
// -------------------------------------------------------------------------------------
// With agriculture supplement.  
// -------------------------------------------------------------------------------------
// Make an ag binary image for the entire state with tool from data module. 
lc.ag.i = data.fcMakeBinaryImage(data.fcFilterByRegion(lc.ag.fc_address, region.state.fc));
// Temporarily add the self masked layer to the map with viz and layer name keys.  
layout.map.addLayer(lc.ag.i, lc.ag.viz, lc.ag.layer_name, false);
// Create a sub-dictionary in lc dictionary to hold land cover + ag composite image.  
lc.lca = {};
// Create a land cover layer with ag as a class.
// Reorder classes to convey a gradient of human impact. 
lc.lca.i = 
  lc.ag.i.unmask().eq(0)
  .multiply(
    lc.base.i
      .remap(
        [1,2,3,4,5,6,7,8],
        [0,1,4,2,5,6,7,8]
        )
      )
  .add(lc.ag.i.unmask().multiply(3))
;
// Define viz parameters for the new composite layer. 
lc.lca.viz = {
  min: 0, 
  max: 8,
  palette: lc.base.viz.palette.slice(0,2)
    .concat(lc.base.viz.palette.slice(3,4))
    .concat(lc.ag.viz.palette)
    .concat(lc.base.viz.palette.slice(2,3))
    .concat(lc.base.viz.palette.slice(4,8))
};
// Define class names for the new composite layer. 
lc.lca.class_names = lc.base.class_names.slice(0,2)
    .concat(lc.base.class_names.slice(3,4))
    .concat(lc.ag.class_names)
    .concat(lc.base.class_names.slice(2,3))
    .concat(lc.base.class_names.slice(4,8))
    ;
// Define the layer name for the new composite layer. 
lc.lca.layer_name = '2016 land cover with ag';
// Print the lc dictionary to see additions. 
// print('LAND COVER WITH AG COMPOSITE', lc);
// Add the composite layer to the map. 
layout.map.addLayer(lc.lca.i, lc.lca.viz, lc.lca.layer_name);
// -------------------------------------------------------------------------------------
// Chart land cover with ag
// -------------------------------------------------------------------------------------
// Create stack for class method. 
lc.lca.stack_class = ee.Image
  .pixelArea()                                      // Each pixel stores pixel area.
  .addBands(lc.lca.i.rename(lc.lca.layer_name))     // Bottom layer must have class values.
;
// Create dictionary of chart arguments.
lc.lca.chart_params_class = {
  image: lc.lca.stack_class,                        // Image with dough bands and cutter band.
  classBand: lc.lca.layer_name,                     // Name of the band to use as cutter.  
  region: region.town.fc,                           // Region to perform operation.  
  reducer: ee.Reducer.sum(),                        // Type of zonal statistic to calculate.  
  scale: 10,                                        // Scale to carry out operation.
  classLabels: lc.lca.class_names,                  // Labels of cutters to use in chart.
  }
;
// Create the chart.  
lc.lca.chart_class = ui.Chart.image.byClass(lc.lca.chart_params_class)                                    // Dictionary of chart arguments.  
    .setChartType('BarChart')                                                                             // Type of chart.
    .setOptions(cart.makeBarChartStyle(lc.lca.viz.palette, lc.lca.layer_name, 'percent', '30%', '50%')
  )
;
// Inspect chart.
layout.panel.add(lc.lca.chart_class);
// -------------------------------------------------------------------------------------
// Proximity layers
// -------------------------------------------------------------------------------------
// Write a function to buffer binary rasters. 
// Input binary raster and distance in meters; return binary raster. 
var iBuffer = function(i, d) {
  return i
    .unmask()
    .distance(
      ee.Kernel.euclidean(200, 'meters', false)
      )
    // .reproject('EPSG: 32145')
    .lte(d)
    .multiply(i.unmask().neq(1))
  ;
};
// ------------------------------
// Make building proximity layer.
// ------------------------------
// Make a binary image of buildings within Addison County.  
lc.buildings.i = data.fcMakeBinaryImage(data.fcFilterByRegion(lc.buildings.fc_address, region.county.fc));
// Define the building buffer as 100 m.* 
lc.buildings.prox_d = 100;
// Define the layer name for building buffer image.  
lc.buildings.prox_name = 'building_prox_' + lc.buildings.prox_d;
// Create building proximity layer with building footprints removed. 
lc.buildings.prox_i = iBuffer(lc.buildings.i, lc.buildings.prox_d)
  // .subtract(lc.buildings.i.unmask())
  .rename(lc.buildings.prox_name)
  .set({name: lc.buildings.prox_name})
  ;
// Temporarily add buildings image and building proximity image to the map as layers. 
layout.map.addLayer(lc.buildings.i, lc.buildings.viz, lc.buildings.layer_name);
layout.map.addLayer(lc.buildings.prox_i.selfMask(), lc.buildings.viz, lc.buildings.prox_name);
// ------------------------------
// Make roads proximity layer.
// ------------------------------
// Make feature collection from roads address for all roads in Addison County that are not Class 4. 
lc.roads.fc = data.fcFilterByRegion(lc.roads.fc_address, region.county.fc)
  .filter(ee.Filter.neq('AOTCLASS', 4));
// print(lc.roads.fc.first(), lc.roads.fc.aggregate_array('AOTCLASS').distinct().sort());
// Make binary image of roads. 
lc.roads.i = data.fcMakeBinaryImage(lc.roads.fc);
// Define buffer distance of roads. 
lc.roads.prox_d = 100;
// Define name for road buffer layer. 
lc.roads.prox_name = 'road_prox_' + lc.roads.prox_d;
// Make road buffer layer. 
lc.roads.prox_i = iBuffer(lc.roads.i, lc.roads.prox_d)
  // .subtract(lc.ag.i.unmask())
  .rename(lc.roads.prox_name)
  .set({name: lc.roads.prox_name})
  ;
// Temporarily add road buffer layer to map. 
// layout.map.addLayer(lc.roads.prox_i.selfMask(), lc.roads.viz, lc.roads.prox_name);
// ------------------------------
// Make built proximity layer.
// ------------------------------
// Define a sub-dictionary for built data. 
lc.built = {};
// Make a union of the build and road buffer layers. 
lc.built.prox_i = 
  lc.roads.prox_i
  .unmask()
  .or(  
    lc.buildings.prox_i.unmask()
  )
;
// Name the layer. 
lc.built.layer_name = 'Proximty to built';
// Define viz parameters for the layer. 
lc.built.viz = {min:0, max:1, palette: ['#DEDEDE']};
// Temporarily add the layer to the map to check it out. 
layout.map.addLayer(lc.built.prox_i.selfMask(), lc.built.viz, lc.built.layer_name);
// ------------------------------
// Make core/edge tree layer.
// ------------------------------
// Make sub-dictionary for tree layer. 
lc.tree = {};
// Make binary of tree canopy. 
lc.tree.i = lc.base.i.eq(1);
// Define buffer distance from tree canopy edge. 
lc.tree.prox_d = 100;
// Define name for the layer. 
lc.tree.prox_name = 'tree_edge_prox_' + lc.tree.prox_d;
// Define viz parameters for interior forest. 
lc.tree.viz = {
  min:0, 
  max: 1,
  palette: ['#97BF86']
};
// Make an image that distinguishes tree interior and periphery. 
lc.tree.prox_i = iBuffer(lc.tree.i.neq(1), lc.tree.prox_d)
  .unmask()
  .add(lc.tree.i)
  .eq(1)
  .rename(lc.tree.prox_name)
  .set({name: lc.tree.prox_name})
  ;
// Temporarily add layer to the map to check if it makes sense. 
layout.map.addLayer(lc.tree.prox_i.selfMask(), lc.tree.viz, lc.tree.prox_name);
// ------------------------------
// Make composite layer of land 
// cover and periphery classes
// ------------------------------
// Make sub-dictionary for new layer. 
lc.lcp = {};
// Composite the layers. 
lc.lcp.i = lc.lca.i.add(1)
  .multiply(lc.tree.prox_i.unmask().eq(0))
  .max(lc.built.prox_i.multiply(10)
  .multiply(lc.lca.i.lte(2))
  .max(lc.lca.i)
  )
;
// Define viz parameters for new layer. 
lc.lcp.viz = {
  min: 0,
  max: 10,
  palette: lc.tree.viz.palette
    .concat(lc.lca.viz.palette)
    .concat(lc.built.viz.palette)
  }
;
// Define class names for the new layer. 
lc.lcp.class_names = 
    ['Forest interiors']
    .concat(lc.lca.class_names)
    .concat(['Built proximity'])
;
// Define name for the layer. 
lc.lcp.layer_name = 'LC with edge classes';
// Add the layer to the map. 
layout.map.addLayer(lc.lcp.i, lc.lcp.viz, lc.lcp.layer_name);
// -------------------------------------------------------------------------------------
// Chart the layer for one region
// -------------------------------------------------------------------------------------
// Make multi-band image to chart. 
lc.lcp.stack_class = ee.Image
  .pixelArea()
  .addBands(lc.lcp.i.rename(lc.lcp.layer_name))
;
// Make dictionary of chart arguments.
lc.lcp.chart_params_class = {
  image: lc.lcp.stack_class,                        // Image with dough bands and cutter band.
  classBand: lc.lcp.layer_name,                     // Name of the band to use as cutter.  
  region: region.town.fc,                           // Region to perform operation.  
  reducer: ee.Reducer.sum(),                        // Type of zonal statistic to calculate.  
  scale: 10,                                        // Scale to carry out operation.
  classLabels: lc.lcp.class_names,                  // Labels of cutters to use in chart.
  }
;
// print('LC', lc);
// Make the chart.  
lc.lcp.chart_class = ui.Chart.image.byClass(lc.lcp.chart_params_class)      // Dictionary of chart arguments.  
    .setChartType('BarChart')                         // Type of chart.
    .setOptions(cart.makeBarChartStyle(lc.lcp.viz.palette, lc.lcp.layer_name, 'percent', '30%', '50%')
  )
;
// Add chart to panel.
layout.panel.add(lc.lcp.chart_class);
// -------------------------------------------------------------------------------------
// Chart the layer for to compare multiple regions.
// -------------------------------------------------------------------------------------
// Create multi-band image to chart.
lc.lcp.stack_regions = 
  lc.lcp.i.eq(0).multiply(ee.Image.pixelArea()).rename('00_core_forest')
  .addBands(lc.lcp.i.eq(1).multiply(ee.Image.pixelArea()).rename('01_edge_forest'))
  .addBands(lc.lcp.i.eq(2).multiply(ee.Image.pixelArea()).rename('02_grass/shrub'))
  .addBands(lc.lcp.i.eq(3).multiply(ee.Image.pixelArea()).rename('03_water'))
  .addBands(lc.lcp.i.eq(4).multiply(ee.Image.pixelArea()).rename('04_ag')) 
  .addBands(lc.lcp.i.eq(5).multiply(ee.Image.pixelArea()).rename('05_bare soil'))
  .addBands(lc.lcp.i.eq(6).multiply(ee.Image.pixelArea()).rename('06_buildings'))
  .addBands(lc.lcp.i.eq(7).multiply(ee.Image.pixelArea()).rename('07_roads'))
  .addBands(lc.lcp.i.eq(8).multiply(ee.Image.pixelArea()).rename('08_other pavement'))
  .addBands(lc.lcp.i.eq(9).multiply(ee.Image.pixelArea()).rename('09_railroads'))
  .addBands(lc.lcp.i.eq(10).multiply(ee.Image.pixelArea()).rename('10_built_proximity'))
;
// Define chart parameters. 
lc.lcp.chart_params_region = {
  image: lc.lcp.stack_regions,            // Image with dough bands and cutter band.
  regions: region.town.neighbors_fc,      // Region to perform operation.  
  reducer: ee.Reducer.sum(),              // Type of zonal statistic to calculate.  
  scale: 10,                              // Scale to carry out operation.
  xProperty: 'TOWNNAME',                  // Labels of cutters to use in chart.
  }
;
// Make the chart. 
lc.lcp.chart_region = ui.Chart.image.byRegion(lc.lcp.chart_params_region)      // Dictionary of chart arguments.  
    .setChartType('BarChart')                         // Type of chart.
    .setOptions(cart.makeBarChartStyle(lc.lcp.viz.palette, lc.lcp.layer_name, 'percent', '66%', '95%')
  )
;
// Add the chart to the panel. 
layout.panel.add(lc.lcp.chart_region);
// -------------------------------------------------------------------------------------
// Add marginalia to bottom of layout panel. 
// -------------------------------------------------------------------------------------  
layout.panel
  .add(labels.ack)
  .add(labels.credits)
;
// -------------------------------------------------------------------------------------
// Add study region layer to top of layer stack. 
// -------------------------------------------------------------------------------------  
// Add study region as a layer. 
layout.map.addLayer(region.town.neighbors_fc.style(cart.study_region_style), {}, 'Study region', true);
// -------------------------------------------------------------------------------------
// Make the layer dictionary importable as a module. 
// ------------------------------------------------------------------------------------- 
exports.lc = lc;