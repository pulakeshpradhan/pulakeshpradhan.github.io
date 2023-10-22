//  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//  name:     hillshades.js 
//  purpose:  make hillshades from elevation datasets
//
//  author:   Jeff Howarth
//  update:   2/20/2022  
//  license:  Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)
//  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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
  title: cart.makeTitle('Hillshade layers'), 
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
// -------------------------------------------------------------------------------------
// Elevation.
// -------------------------------------------------------------------------------------
// Load the elevation datasets from the data module. 
var lidar = data.elevation;
// print('ELEVATION', lidar);
// Write a function to find the pixel resolution of an image. 
var whatScale = function(i) {
  return i.projection().nominalScale();
};
// Apply the function to the elevation datasets. 
lidar.dem_hf_2017.res = whatScale(lidar.dem_hf_2017.i), 
lidar.dsm_2017.res =  whatScale(lidar.dsm_2017.i),
lidar.dep_10m.res = whatScale(lidar.dep_10m.i);
lidar.dep_1m.res = whatScale(lidar.dep_1m.ic.first());
// print('ELEVATION', lidar);
// Write a function to find the projection of an image. 
var whatProjection = function(i) {
  return i.projection();
};
// Apply the function to the elevation datasets.
lidar.dem_hf_2017.proj = whatProjection(lidar.dem_hf_2017.i), 
lidar.dsm_2017.proj =  whatProjection(lidar.dsm_2017.i),
lidar.dep_10m.proj = whatProjection(lidar.dep_10m.i);
lidar.dep_1m.proj = whatProjection(lidar.dep_1m.ic.first());
// Filter the dep 1m image collection by study region. 
lidar.dep_1m.ic = lidar.dep_1m.ic.filterBounds(region.county.fc);
// Inspect the datasets. 
// print('ELEVATION', lidar);
// -------------------------------------------------------------------------------------
// Make hillshade from an image
// -------------------------------------------------------------------------------------
// Make a workspace in the lidar dictionary. 
lidar.work = {};
// Define the elevation dataset to work with. 
lidar.work.i = lidar.dep_10m.i;
// print('ELEVATION', lidar);
// Hillshade an image. 
lidar.work.hs_315 = ee.Terrain.hillshade(lidar.work.i, 315, 35);
// Chart the hillshade image histogram.
layout.panel.add(
    data.makeHistogram(
    lidar.work.hs_315,           // Image with data to chart.
    region.county.fc,               // Region of the image to chart.
    "hillshade",                    // Band with data to chart. 
    10,                             // Resolution to chart.
    "dep10m azimuth 315",           // Title of chart.
    'black',                        // Color of chart bars. 
    0,                              // Minimum value for x-axis
    255                             // Maximum value for x-axis
  )
);
// Define viz parameters for hillshade.
lidar.work.hs_viz = {
  bands: 'hillshade',
  min: 0,
  max: 255,
  gamma: 1.25
  }
;
// print('ELEVATION', lidar);
// Add layers to the map. 
layout.map.centerObject(region.county.fc, 11); 
layout.map.addLayer(lidar.work.hs_315, lidar.work.hs_viz, "315");  
// -------------------------------------------------------------------------------------
// Make blended hillshade from an image
// -------------------------------------------------------------------------------------
// Hillshade an image with a different azimuth. 
lidar.work.hs_260 = ee.Terrain.hillshade(lidar.work.i, 260, 35);
// Chart the hillshade image histogram.
layout.panel.add(
  data.makeHistogram(
    lidar.work.hs_260,           // Image with data to chart.
    region.county.fc,               // Region of the image to chart.
    "hillshade",                    // Band with data to chart. 
    10,                             // Resolution to chart.
    "dep10m azimuth 260",           // Title of chart.
    'black',                        // Color of chart bars. 
    0,                              // Minimum value for x-axis
    255                             // Maximum value for x-axis
    )
  )
;
// Add second hillshade to the map.
layout.map.addLayer(lidar.work.hs_260, lidar.work.hs_viz, "260"); 
// Blend the two hillshades by making a composite of minimum values.  
lidar.work.hs_blend = lidar.work.hs_315.min(lidar.work.hs_260);
// Add blended hillshade to the map. 
layout.map.addLayer(lidar.work.hs_blend, lidar.work.hs_viz, "Blend");
// -------------------------------------------------------------------------------------
// Make hillshade from an image collection
// -------------------------------------------------------------------------------------
// Write a function that takes two arguments and can be mapped over a collection.
var makeHillshade = function(azimuth, elevation) {
  var wrap = function(i) {
    return ee.Terrain.hillshade(i, azimuth, elevation);
  };
  return wrap;
};
// Make a hillshade with azimuth 315.
lidar.dep_1m.hs_315 = lidar.dep_1m.ic
  .map(makeHillshade(315, 35))
  .mosaic()
;
// Make a hillshade with azimuth 260
lidar.dep_1m.hs_260 = lidar.dep_1m.ic
  .map(makeHillshade(260, 35))
  .mosaic()
;
// Blend the two hillshades. 
lidar.dep_1m.hs_blend = lidar.dep_1m.hs_315
  .min(lidar.dep_1m.hs_260)
;
// Add layer to the map. 
layout.map.addLayer(lidar.dep_1m.hs_blend, lidar.work.hs_viz, "Blend 1m");
// -------------------------------------------------------------------------------------
// Put hillshades into the dictionary for each elevation image. 
// -------------------------------------------------------------------------------------
// Write a function to make blended hillshade.
var blendHillshade = function(image, azimuth1, azimuth2, elevation) {
  var az1_i = ee.Terrain.hillshade(image, azimuth1, elevation);
  var az2_i = ee.Terrain.hillshade(image, azimuth2, elevation);
  return az1_i.min(az2_i);
};
// Insert blended hillshades into the elevation dictionary. 
lidar.dem_hf_2017.hs_blend = blendHillshade(lidar.dem_hf_2017.i);
lidar.dsm_2017.hs_blend = blendHillshade(lidar.dsm_2017.i);
lidar.dep_10m.hs_blend = blendHillshade(lidar.dep_10m.i);
// Test your results
// print('TEST', lidar);
// layout.map.addLayer(lidar.dem_hf_2017.hs_blend, lidar.work.hs_viz, 'TEST');
// -------------------------------------------------------------------------------------
// Put a handle on lidar dictionary. 
// -------------------------------------------------------------------------------------
exports.elevation = lidar;
// Remember to comment out all print statements, otherwise they will print
//  when you import this script as a module.