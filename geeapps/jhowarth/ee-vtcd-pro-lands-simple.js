/*   
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
NAME: Pro_lands_simple.js 
PURPOSE: Shows protected lands by land cover and elevation class. 
AUTHOR: Jeff Howarth 
UPDATE: 3/9/2023  
LICENSE: Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/ 
// Load modules
var data = require('users/jhowarth/cd-usa-vt-middlebury:modules/data.js');
var cart = require('users/jhowarth/cd-usa-vt-middlebury:modules/cart.js');
// Load prior layers to build on.
var study_regions = require('users/jhowarth/cd-usa-vt-middlebury:layers/study_regions.js');
var elevation = require('users/jhowarth/cd-usa-vt-middlebury:layers/hillshades.js');
var pro_lands = require('users/jhowarth/cd-usa-vt-middlebury:layers/parcels-with-protections.js');
var lc = require('users/jhowarth/cd-usa-vt-middlebury:layers/land-cover.js');
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
  title: cart.makeTitle('Lands with durable protections in Middlebury'), 
  // sub_title: cart.makeSubTitle('How does size and shape of region influence area-based conservation goals?'), 
  ack: cart.makeAck('Middlebury is unceded Abenaki land.'),
  credits: cart.makeCredits('Jeff Howarth Geography Dept\nMiddlebury College', 'https://jeffhowarth.github.io/eeprimer/')
};
// Print the dictionary to inspect. 
// print('LABELS', labels);
// Add the title and subtitle to the layout panel. 
layout.panel
  .add(labels.title)
  // .add(labels.sub_title)
;
// -------------------------------------------------------------------------------------
// Define the region.
// -------------------------------------------------------------------------------------
// Load the region dictionary from study regions layer module. 
var region = study_regions.region;
print('REGIONS', region);
// Define study region here to facilitate changing it later. 
region.town.fc = region.town.fc.map(function(f) {return f.set('Region', 'Middlebury')});
region.town.i = data.fcMakeBinaryImage(region.town.fc);
region.county.fc = region.county.fc.map(function(f) {return f.set('Region', 'Addison County')});
region.county.i = data.fcMakeBinaryImage(region.county.fc);
region.state.fc = region.state.fc.map(function(f) {return f.set('Region', 'Vermont')});
region.state.i = data.fcMakeBinaryImage(region.state.fc);
var study_region = region.town;
layout.map.centerObject(study_region.fc, 13); 
// -------------------------------------------------------------------------------------
// Elevation.
// -------------------------------------------------------------------------------------
// Load the elevation datasets from the data module. 
var lidar = data.elevation.dep_10m;
// print('LIDAR', lidar);
// Make a workspace in the lidar dictionary. 
lidar.work = {};
// Define the elevation dataset to work with. 
lidar.work.i = lidar.i;
// print('ELEVATION', lidar);
// -------------------------------------------------------------------------------------
// Create mask for large lakes.
// -------------------------------------------------------------------------------------
var lakes = data.nhd.water_body;
lakes.fc = ee.FeatureCollection(lakes.fc_address)
  .filter(ee.Filter.gte('areasqkm', 4));
lakes.i = data.fcMakeBinaryImage(lakes.fc).unmask().eq(0);
// print('LAKES', lakes);
// layout.map.addLayer(lakes.fc, {color: 'cyan'}, 'Lakes');
lidar.im = lidar.i.updateMask(lakes.i);
// layout.map.addLayer(lidar.im, {min: 0, max: 1, palette: 'white'}, 'Lakes');
// -------------------------------------------------------------------------------------
// Classify elevation ranges. 
// -------------------------------------------------------------------------------------
print("LIDAR", lidar);
lidar.er = {};
lidar.er.dict = lidar.im.updateMask(study_region.i)
  .reduceRegion({
    reducer: ee.Reducer.percentile({
      percentiles: [20, 40, 60, 80], 
      outputNames: null, 
      maxBuckets: null, 
      minBucketWidth: null, 
      maxRaw: null
      }
    ),
    geometry: study_region.fc.geometry(), 
    scale: 10, 
    crs: 'EPSG: 32145',
    // crsTransform, bestEffort, 
    maxPixels: 1e15, 
    // tileScale
    }
  )
;
// print('ELEVATION CLASSES', lidar.er.dict);
lidar.er.i = lidar.im.updateMask(study_region.i)
  .gt(lidar.er.dict.getNumber('elevation_p20'))
  .add(lidar.im.gt(lidar.er.dict.getNumber('elevation_p40')))
  .add(lidar.im.gt(lidar.er.dict.getNumber('elevation_p60')))
  .add(lidar.im.gt(lidar.er.dict.getNumber('elevation_p80')))
  .add(1)
;
// lidar.er.viz =  {min: 1, max: 5, palette:['#ffffe0', '#ffbe84', '#f47361', '#cb2f44', '#8b0000']};
lidar.er.viz = {min:1, max: 5, palette: data.elevation.palette.reverse().slice(3,8)};
layout.map.addLayer(lidar.er.i, lidar.er.viz, 'Elevation regions', false);
// -------------------------------------------------------------------------------------
// Land cover 
// -------------------------------------------------------------------------------------
print('LAND COVER', lc.lc);
var lc = lc.lc;
print('LAND COVER', lc);
// -------------------------------------------------------------------------------------
// Simplify land cover into three classes: recovering, recovered, developed
// -------------------------------------------------------------------------------------
var lc_palette = ["#C7E19E", "#F2F49F", "#706E58"]; // (3) 
var pro_palette = ['#AAE846', '#F9FF59', 'Ivory'];  // (3)
lc.tri = {};
lc.tri.i = lc.lcp.i.remap(
  [0,1,2,3,4,5,6,7,8,9,10],
  [1,1,1,1,2,3,3,3,3,3, 3]
  )
  .updateMask(region.county.i)
; 
lc.tri.class_names = [
  'Recovering', 
  'Clearing',
  'Developed'
  ]
;
lc.tri.layer_name = 'Land cover stages';
lc.tri.viz = {
  min: 1,
  max: 3,
  palette: lc_palette  
  }
;
layout.map.addLayer(lc.tri.i.updateMask(study_region.i), lc.tri.viz, 'Land cover generalized', false);
// -------------------------------------------------------------------------------------
// How much of the study region has protections? 
// -------------------------------------------------------------------------------------
var target = study_region.i;
// print('STUDY REGION TARGET', target);
// print('PROTECTED LANDS', pro_lands);
var pro = pro_lands.pro_lands;
// Define the target.
pro.lc2 = {};
pro.lc2.i = pro.lc.i.remap(
    [0,1,2,3,4,5,6,7,8,9,10,11],
    [2,0,0,0,0,1,2,2,2,2, 2, 2]
  )
;
pro.lc2.viz = {
  min: 0,
  max: 2,
  palette: pro_palette
};
// print('PROTECTED', pro);
// Create pixel area image.
target.pixel_area = ee.Image.pixelArea().divide(4046.86);
// Create stack for class method. 
// Create stack for class method. 
target.stack_class =
  target.pixel_area                                     // Each pixel stores pixel area.
  .addBands(pro.lc2.i.rename('with protections'))     // Bottom layer must have class values.
;
// Create dictionary of chart arguments.
target.chart_params_class = {
  image: target.stack_class,                                            // Image with dough bands and cutter band.
  classBand: 'with protections',                                        // Name of the band to use as cutter.  
  region: study_region.fc,                                              // Region to perform operation.  
  reducer: ee.Reducer.sum(),                                            // Type of zonal statistic to calculate.  
  scale: 10,                                                           // Scale to carry out operation.
  classLabels: ['Protected recovering', 'Protected clearing', 'Without protections']              // Labels of cutters to use in chart.
  }
;
// Create the chart.  
target.chart_class = ui.Chart.image.byClass(target.chart_params_class)                                    // Dictionary of chart arguments.  
    .setChartType('BarChart')                                                                             // Type of chart.
    .setOptions(cart.makeBarChartStyle(
      pro.lc2.viz.palette, 
      'PROTECTION CLASS', 
      'percent',
      '30%', 
      '50%',
      'bottom',
      null,
      null)
  )
;
// Inspect chart.
layout.panel.add(target.chart_class);
layout.map.addLayer(
  pro.lc2.i.updateMask(pro.lc2.i.neq(2)).updateMask(study_region.i), 
  pro.lc2.viz, 
  'Protected lands', 
  true
  )
;
// -------------------------------------------------------------------------------------
// Chart tri land cover
// -------------------------------------------------------------------------------------
// Create pixel area image.
lc.tri.pixel_area = ee.Image.pixelArea().divide(4046.86);
// Create stack for class method. 
lc.tri.stack_class =
  lc.tri.pixel_area                                     // Each pixel stores pixel area.
  .addBands(lc.tri.i.subtract(1).rename(lc.tri.layer_name))     // Bottom layer must have class values.
;
// Create dictionary of chart arguments.
lc.tri.chart_params_class = {
  image: lc.tri.stack_class,                                            // Image with dough bands and cutter band.
  classBand: lc.tri.layer_name,                                        // Name of the band to use as cutter.  
  region: study_region.fc,                                              // Region to perform operation.  
  reducer: ee.Reducer.sum(),                                            // Type of zonal statistic to calculate.  
  scale: 10,                                                           // Scale to carry out operation.
  classLabels: lc.tri.class_names                                       // Labels of cutters to use in chart.
  }
;
// Create the chart.  
lc.tri.chart_class = ui.Chart.image.byClass(lc.tri.chart_params_class)                                    // Dictionary of chart arguments.  
    .setChartType('BarChart')                                                                             // Type of chart.
    .setOptions(cart.makeBarChartStyle(
     lc.tri.viz.palette, 
      'GENERAL LAND COVER CLASS', 
      'percent',
      '30%', 
      '50%',
      'bottom',
      null,
      null)
  )
;
// Inspect chart.
layout.panel.add(lc.tri.chart_class);
// -------------------------------------------------------------------------------------
// Chart elevation classes
// -------------------------------------------------------------------------------------
var target = lidar.er;
// print('TARGET', target);
// Create pixel area image.
target.pixel_area = ee.Image.pixelArea().divide(4046.86);
// Create stack for class method. 
target.stack_class =
  target.pixel_area                         // Each pixel stores pixel area.
  .addBands(target.i.rename('target'))     // Bottom layer must have class values.
;
// Create dictionary of chart arguments.
target.chart_params_class = {
  image: target.stack_class,                                            // Image with dough bands and cutter band.
  classBand: 'target',                                                  // Name of the band to use as cutter.  
  region: study_region.fc,                                              // Region to perform operation.  
  reducer: ee.Reducer.sum(),                                            // Type of zonal statistic to calculate.  
  scale: 10,                                                           // Scale to carry out operation.
  classLabels: ['<20', '20-40', '40-60', '60-80', '80-100']             // Labels of cutters to use in chart.
  }
;
// Create the chart.  
target.chart_class = ui.Chart.image.byClass(target.chart_params_class)                                    // Dictionary of chart arguments.  
    .setChartType('BarChart')                                                                             // Type of chart.
    .setOptions(cart.makeBarChartStyle(
      target.viz.palette.reverse(), 
      'ELEVATION CLASS', 
      'percent',
      '30%', 
      '50%',
      'bottom',
      null,
      null)
  )
;
// // Inspect chart.
// layout.panel.add(target.chart_class);
// -------------------------------------------------------------------------------------
// Chart area in each elevation class. 
// -------------------------------------------------------------------------------------
// Define the target.
// Create multi-band image to chart.
target.stack_regions = 
  target.i.eq(5).multiply(target.pixel_area)
  .addBands(target.i.eq(4).multiply(target.pixel_area))
  .addBands(target.i.eq(3).multiply(target.pixel_area))
  .addBands(target.i.eq(2).multiply(target.pixel_area))
  .addBands(target.i.eq(1).multiply(target.pixel_area)) 
;
// Define chart parameters. 
target.chart_params_region = {
  image: target.stack_regions,              // Image with dough bands and cutter band.
  regions: study_region.fc,                  // Region to perform operation.  
  reducer: ee.Reducer.sum(),                // Type of zonal statistic to calculate.  
  scale: 10,                                // Scale to carry out operation.
  xProperty: 'Region',                      // Labels of cutters to use in chart.
  }
;
// Make the chart. 
target.chart_region = ui.Chart.image.byRegion(target.chart_params_region)      // Dictionary of chart arguments.  
    .setChartType('BarChart')                         // Type of chart.
    .setOptions(cart.makeBarChartStyle(
      target.viz.palette.reverse(), 
      'ELEVATION CLASS', 
      null, 
      '66%', 
      '95%',
      'none',
      0,
      1400
      ))
;
// // Add the chart to the panel. 
// layout.panel.add(target.chart_region);
// -------------------------------------------------------------------------------------
// Chart area or protected land in each elevation class. 
// -------------------------------------------------------------------------------------
// layout.map.addLayer(pro.collate, {min:0, max:1, palette: ['black', 'white']});
target.i = target.i.multiply(pro.collate);
// Create multi-band image to chart.
target.stack_regions = 
  target.i.eq(1).multiply(target.pixel_area).rename('Class 5')
  .addBands(target.i.eq(2).multiply(target.pixel_area).rename('Class 4'))
  .addBands(target.i.eq(3).multiply(target.pixel_area).rename('Class 3'))
  .addBands(target.i.eq(4).multiply(target.pixel_area).rename('Class 2'))
  .addBands(target.i.eq(5).multiply(target.pixel_area).rename('Class 1'))
;
// Define chart parameters. 
target.chart_params_region = {
  image: target.stack_regions,            // Image with dough bands and cutter band.
  regions: study_region.fc,                  // Region to perform operation.  
  reducer: ee.Reducer.sum(),              // Type of zonal statistic to calculate.  
  scale: 10,                              // Scale to carry out operation.
  xProperty: 'Region'                        // Labels of cutters to use in chart.
  }
;
// Make the chart. 
target.chart_region = ui.Chart.image.byRegion(target.chart_params_region)      // Dictionary of chart arguments.  
    .setChartType('BarChart')                         // Type of chart.
    .setOptions(cart.makeBarChartStyle(
      target.viz.palette, 
      'ELEVATION CLASS WITH PROTECTIONS', 
      null, 
      '66%', 
      '95%',
      'none',
      0,
      1400
      ))
;
// // Add the chart to the panel. 
// layout.panel.add(target.chart_region);
// -------------------------------------------------------------------------------------
// Chart area or protected land with natural cover in each elevation class. 
// -------------------------------------------------------------------------------------
target.i = target.i
  .multiply(pro.lc2.i.eq(0))
;
// Create multi-band image to chart.
target.stack_regions = 
  target.i.eq(5).multiply(target.pixel_area).rename("1_Highest_elevations")
  .addBands(target.i.eq(4).multiply(target.pixel_area).rename("2"))
  .addBands(target.i.eq(3).multiply(target.pixel_area).rename("3"))
  .addBands(target.i.eq(2).multiply(target.pixel_area).rename("4"))
  .addBands(target.i.eq(1).multiply(target.pixel_area).rename("5_Lowest_elevations")) 
;
// Define chart parameters. 
target.chart_params_region = {
  image: target.stack_regions,            // Image with dough bands and cutter band.
  regions: study_region.fc,                  // Region to perform operation.  
  reducer: ee.Reducer.sum(),              // Type of zonal statistic to calculate.  
  scale: 10,                              // Scale to carry out operation.
  xProperty: 'Region',         // Labels of cutters to use in chart.
  }
;
// Make the chart. 
target.chart_region = ui.Chart.image.byRegion(target.chart_params_region)      // Dictionary of chart arguments.  
    .setChartType('BarChart')                         // Type of chart.
    .setOptions(cart.makeBarChartStyle(
      target.viz.palette.reverse(),                                           // Palette
      'ELEVATION CLASS WITH PROTECTIONS AND RECOVERING',        // Title
      null,                                                         // Stacked (percent if true, null if false)
      '66%',                                                        // Chart height
      '95%',                                                        // Bar width
      'none',                                                       // Legend position
      0,                                                            // Horizontal axis minimum
      1400                                                          // Horizontal axis maximum
      ))
;
// Add the chart to the panel. 
layout.panel.add(target.chart_region);
// layout.map.addLayer(target.i.updateMask(pro.lc2.i.eq(0)), lidar.er.viz, 'Protected lands with natural cover');
// -------------------------------------------------------------------------------------
// Add study region layer to top of layer stack. 
// -------------------------------------------------------------------------------------  
// Add the study region (town with neighbors) as a layer. 
layout.map.addLayer(study_region.fc.style(cart.study_region_style), {}, 'Study region', true);
// ------------------------------------------------------------------------------------- 
// Add marginalia to bottom of layout panel. 
// -------------------------------------------------------------------------------------  
layout.panel
  .add(labels.credits)
  .add(labels.ack)
;
// -------------------------------------------------------------------------------------
// Put a handle on lidar dictionary. 
// -------------------------------------------------------------------------------------
exports.elevation = lidar;
// Remember to comment out all print statements, otherwise they will print
//  when you import this script as a module.