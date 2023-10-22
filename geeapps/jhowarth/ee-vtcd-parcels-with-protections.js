//  ------------------------------------------------------------------------------------------------------
//  TITLE:    proLands.js
//  PURPOSE:  Compile all lands with some protections 
//  AUTHUR:   Jeff Howarth
//  DATE:     2/16/2023
//  ------------------------------------------------------------------------------------------------------
// Load module
var data = require('users/jhowarth/cd-usa-vt-middlebury:modules/data.js');
var cart = require('users/jhowarth/cd-usa-vt-middlebury:modules/cart.js');
// And load the land cover script so that we can access the final dictionary product.
// (Look at that end of that scrip to see how I made the final dictionary accessible as a module).
var lc = require('users/jhowarth/cd-usa-vt-middlebury:layers/land-cover.js');
// -------------------------------------------------------------------------------------
// Compose layout
// -------------------------------------------------------------------------------------
// Use cart tool to make layout dictionary.  
var layout = cart.makeLayout();
// Print the dictionary. 
print('LAYOUT', layout);
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
  title: cart.makeTitle('Parcels with some protections'), 
  sub_title: cart.makeSubTitle('Middlebury, Vermont'), 
  ack: cart.makeAck('Middlebury is unceded Abenaki land.'),
  credits: cart.makeCredits('Jeff Howarth Geography Dept\nMiddlebury College', 'https://jeffhowarth.github.io/')
};
// Print the dictionary to inspect. 
print('LABELS', labels);
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
print('REGION WITH ADMINISTRATIVE CONTEXTS', region);
// -------------------------------------------------------------------------------------
// Make protected lands image. 
// -------------------------------------------------------------------------------------
// Load the protected lands dictionary from the data module. 
var pro_lands = data.pro_lands;
print('PROTECTED LANDS STARTS', pro_lands);
// Make binary images of all available datasets of protected lands. 
pro_lands.hybrid.i = data.fcMakeBinaryImage(ee.FeatureCollection(pro_lands.hybrid.fc_address));
pro_lands.malt.i = data.fcMakeBinaryImage(ee.FeatureCollection(pro_lands.malt.fc_address));
pro_lands.pld.i = data.fcMakeBinaryImage(ee.FeatureCollection(pro_lands.pld.fc_address));
pro_lands.tnc.i = data.fcMakeBinaryImage(ee.FeatureCollection(pro_lands.tnc.fc_address));
// Identiy parcels that have gained protections in the last three years
//  and are not included in the the protected lands datasets listed above
//  because of their recency. To do this:
// (1) Construct a feature collection of parcels (cadastre).
data.admin_region.parcel.fc = ee.FeatureCollection(data.admin_region.parcel.fc_address);
// (2) Make a point inside each parcel that has recently been protected.
//      Note: 
//        I only do this manually for Middlebury as lands gain protection,
//        so I am under-representing newly protected parcels in all other Vermont towns.  
pro_lands.new_adds = ee.FeatureCollection(
  ee.Geometry.MultiPoint
    (
      [[-73.12591815381407, 44.035990349166795],
      [-73.14997657016453, 43.97116847171692],
      [-73.15715712982066, 43.967658215737195],
      [-73.11112922467099, 44.03930083207266],
      [-73.11283956122284, 44.02266206594771],
      [-73.12009225439911, 44.02451357232277],
      [-73.128718238591, 44.02559359100386]])
    )
;
//  (3) Create a feature collection of parcels that overlap the points. 
pro_lands.updates = data.admin_region.parcel.fc.filterBounds(pro_lands.new_adds);
// Inspect the points
layout.map.centerObject(region.town.fc, 12);
layout.map.addLayer(pro_lands.new_adds, {color: 'white'}, 'New additions', false);
//  Make an image of the recent additions. 
pro_lands.updates.i = data.fcMakeBinaryImage(data.pro_lands.updates);
//  Mash together all of the binary images of protected lands. 
pro_lands.collate = pro_lands.hybrid.i.unmask()
  .add(pro_lands.pld.i.unmask())
  .add(pro_lands.tnc.i.unmask())
  .add(pro_lands.malt.i.unmask())
  .add(pro_lands.updates.i.unmask())
  .gt(0);
print('WITH PROTECTIONS', pro_lands);
layout.map.addLayer(pro_lands.collate, {}, 'Lands with some protections', false);
print('LAND COVER', lc);
var lcp = lc.lc.lcp;
// Add land cover from land cover module as a layer.
layout.map.addLayer(lcp.i, lcp.viz, lcp.layer_name, false);
pro_lands.lc = {};
//  Intersect the protected lands and the land cover classes. 
pro_lands.lc.i = pro_lands.collate
  .multiply(lcp.i.add(1))
  ;
// Name the layer, update the viz parameters, and update the class names. 
pro_lands.lc.layer_name = 'Land cover of protected lands';
pro_lands.lc.viz = {
  min:0,
  max:11,
  palette: ['#BDA3D9'].concat(lcp.viz.palette)
};
pro_lands.lc.class_names = ['Without protections'].concat(lcp.class_names)
;
// Add the layer to the map. 
layout.map.addLayer(pro_lands.lc.i.updateMask(pro_lands.collate), pro_lands.lc.viz, pro_lands.lc.layer_name);
// -------------------------------------------------------------------------------------
// Chart the layer for one region
// -------------------------------------------------------------------------------------
// Make a pixel area image with acres as units. 
pro_lands.lc.acres = ee.Image           // Make an image.
  .pixelArea()                          // Each pixel value represents the area of that pixel.
  .divide(4046.86)                      // By default, area is computed to meters, so scale to acres.
  .rename('acres')                      // Name the single band in the image after the units. 
;
// Make multi-band image to chart. 
pro_lands.lc.stack_class =              // Make a new image. 
  pro_lands.lc.acres                    // Starting with the bands in this image (there's only one in this case).
  .addBands(pro_lands.lc.i              // Add the bands from this image (again there's only one in this case). 
    .rename(pro_lands.lc.layer_name)    // Rename the band we just added.
  )
;
// Make dictionary of chart arguments.
pro_lands.lc.chart_params_class = {
  image: pro_lands.lc.stack_class,                        // Image with dough bands and cutter band.
  classBand: pro_lands.lc.layer_name,                     // Name of the band to use as cutter.  
  region: region.town.fc,                                 // Region to perform operation.  
  reducer: ee.Reducer.sum(),                              // Type of zonal statistic to calculate.  
  scale: 10,                                              // Scale to carry out operation.
  classLabels: pro_lands.lc.class_names,                  // Labels of cutters to use in chart.
  }
;
print('WITH PROTECTIONS', pro_lands);
// Make the chart.  
pro_lands.lc.chart_class = 
    ui.Chart.image.byClass(pro_lands.lc.chart_params_class)   // Method takes dictionary of chart argument.  
    .setChartType('BarChart')                                 // Type of chart to make.
    .setOptions(                                              // Options for the chart
      cart.makeBarChartStyle(pro_lands.lc.viz.palette,        // Calls tool from cart module to define chart style that takes four arguments.
      pro_lands.lc.layer_name,                                // Title of the chart.
      'percent',                                              // Normalizes the chart (percents) rather than raw totals. 
      '30%',                                                  // Height of the chart area.
      '50%'                                                   // Width of the bars.
      )
  )
;
// Add chart to panel.
layout.panel.add(pro_lands.lc.chart_class);
// -------------------------------------------------------------------------------------
// Chart the layer for to compare multiple regions.
// -------------------------------------------------------------------------------------
// Create multi-band image to chart. 
/*
    The solution below is pretty clunky and could certainly be cleaned up.
    To chart comparisons across multiple regions, each class needs to be a distinct band in an image.
    So the procedure below does the following:
      (1) isolates a land cover class -- using the .eq() method -- that creates a binary (true/false, 1/0 image);
      (2) multiplies the binary with the pixel area image (that has been converted into acres);
      (3) renames the band after the class it represents. 
      Note that each band name starts with a number. That's because EE automatically sorts the bands
        when it makes the chart. By adding the numbers to the names, the bands will display correctly with the
        palette. Without the numbers, the 'ag' band would be displayed with the first color, 'bare' would
        be displayed with the second, and so on. 
*/
pro_lands.lc.stack_regions = 
  pro_lands.lc.i.eq(0).multiply(pro_lands.lc.acres).rename('00_without_protections')
  .addBands(pro_lands.lc.i.eq(1).multiply(pro_lands.lc.acres).rename('01_core_forest'))
  .addBands(pro_lands.lc.i.eq(2).multiply(pro_lands.lc.acres).rename('02_edge_forest'))
  .addBands(pro_lands.lc.i.eq(3).multiply(pro_lands.lc.acres).rename('03_grass/shrub'))
  .addBands(pro_lands.lc.i.eq(4).multiply(pro_lands.lc.acres).rename('04_water'))
  .addBands(pro_lands.lc.i.eq(5).multiply(pro_lands.lc.acres).rename('05_ag')) 
  .addBands(pro_lands.lc.i.eq(6).multiply(pro_lands.lc.acres).rename('06_bare soil'))
  .addBands(pro_lands.lc.i.eq(7).multiply(pro_lands.lc.acres).rename('07_buildings'))
  .addBands(pro_lands.lc.i.eq(8).multiply(pro_lands.lc.acres).rename('08_roads'))
  .addBands(pro_lands.lc.i.eq(9).multiply(pro_lands.lc.acres).rename('09_other pavement'))
  .addBands(pro_lands.lc.i.eq(10).multiply(pro_lands.lc.acres).rename('10_railroads'))
  .addBands(pro_lands.lc.i.eq(11).multiply(pro_lands.lc.acres).rename('11_built_proximity'))
;
// Define chart parameters. 
pro_lands.lc.chart_params_region = {
  image: pro_lands.lc.stack_regions,            // Image with dough bands and cutter band.
  regions: region.town.neighbors_fc,      // Region to perform operation.  
  reducer: ee.Reducer.sum(),              // Type of zonal statistic to calculate.  
  scale: 10,                              // Scale to carry out operation.
  xProperty: 'TOWNNAME',                  // Labels of cutters to use in chart.
  }
;
// Make the chart. 
pro_lands.lc.chart_region = ui.Chart.image.byRegion(pro_lands.lc.chart_params_region)      // Dictionary of chart arguments.  
    .setChartType('BarChart')                         // Type of chart.
    .setOptions(cart.makeBarChartStyle(pro_lands.lc.viz.palette, pro_lands.lc.layer_name, 'percent', '66%', '95%')
  )
;
// // Add the chart to the panel. 
layout.panel.add(pro_lands.lc.chart_region);
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
// Make the protected lands dictionary importable as a module. 
// ------------------------------------------------------------------------------------- 
// Note: you should comment out all the print statements. 
// If you don't, then they will all print in any file that imports this script as a module.  
exports.pro_lands = pro_lands;