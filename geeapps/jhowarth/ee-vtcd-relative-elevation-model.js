//  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//  name:     grassland-habitat.js
//  purpose:  
//
//  author:   Jeff Howarth 
//  update:   2/25/2022  
//  license:  Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)
//  To do: remove lakes
//  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Load modules
var data = require('users/jhowarth/cd-usa-vt-middlebury:modules/data.js');
var cart = require('users/jhowarth/cd-usa-vt-middlebury:modules/cart.js');
// Load prior layers to build on. 
var study_regions = require('users/jhowarth/cd-usa-vt-middlebury:layers/study_regions.js');
var lc = require('users/jhowarth/cd-usa-vt-middlebury:layers/land-cover.js');
var hs = require('users/jhowarth/cd-usa-vt-middlebury:layers/hillshades.js');
var pro = require('users/jhowarth/cd-usa-vt-middlebury:layers/parcels-with-protections.js');
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
layout.map.setOptions('HYBRID');
// -------------------------------------------------------------------------------------
// Add title and subtitle to panel. 
// -------------------------------------------------------------------------------------
// Make label dictionary. 
// Use cart tool to populate with title, subtitle, land acknowledgement, and credits. 
var labels = {
  title: cart.makeTitle('Floodplain Morphology'), 
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
// Define study regions.  
// -------------------------------------------------------------------------------------
// Load the administrative regions dictionary from study regions layer module. 
var region = study_regions.region;
// print('REGIONS', region);
// Define study region here to facilitate changing it later. 
var study_region = region.county.fc;
// -------------------------------------------------------------------------------------
// Load flowlines  
// -------------------------------------------------------------------------------------
var nhd = data.nhd;
nhd.flowline.fc = data.fcFilterByRegion(nhd.flowline.fc_address, region.county.fc);
// -------------------------------------------------------------------------------------
// Select flowline to use as base in relative elevation model. 
// -------------------------------------------------------------------------------------
var rem = {};
rem.targets = ["Middlebury River", "Otter Creek", "Muddy Branch"];
rem.baseline = {};
rem.baseline.layer_name = rem.targets[0];
rem.baseline.fc = nhd.flowline.fc
  .filter(
    ee.Filter.eq('gnis_name', rem.baseline.layer_name)
  )
;
// Go to map composition section and add layer.
// nhd.aoi = {};
// nhd.aoi = nhd.baseline.fc.union().geometry().buffer(3000);
// print("NHD", nhd);
// // filter stream network to aoi
// var aoi_network = network.filterBounds(aoi);
// -------------------------------------------------------------------------------------
// Load watersheds  
// -------------------------------------------------------------------------------------
print("NHD", nhd);
rem.shed = {};
rem.shed.layer_name = "NHD Level 12 watershed of baseline river";
// Select shed that overlaps baseline. 
rem.shed.fc = data.fcFilterByRegion(nhd.wbdhu12.fc_address, rem.baseline.fc);
// Go to map composition section and add layer.
// -------------------------------------------------------------------------------------
// Load ANR river corridor for baseline.   
// -------------------------------------------------------------------------------------
rem.corridor = {};
rem.corridor.layer_name = "ANR River Corridor of baseline river";
rem.corridor.fc = data.fcFilterByRegion(data.pro_waters.rc.fc_address, rem.baseline.fc)
  .union();
// Go to map composition section and add layer.
// -------------------------------------------------------------------------------------
// Load FEMA flood hazard areas for baseline.   
// -------------------------------------------------------------------------------------
rem.fha = {};
rem.fha.layer_name = "FEMA Flood Hazard Area of baseline river";
rem.fha.fc = data.fcFilterByRegion(data.pro_waters.fha.fc_address, rem.baseline.fc);
// Go to map composition section and add layer.
// -------------------------------------------------------------------------------------
// Load dem 
// -------------------------------------------------------------------------------------
rem.dem = {};
// print("Hillshades", hs);
rem.dem = hs.lidar.dep_1m;
// Go to map composition section and add hillshade layer as a base layer. 
// Filter the dem image collection for tiles in the target watershed and mosaic them. 
rem.dem.i = rem.dem.ic
  .filterBounds(rem.shed.fc)
  .mosaic()
;
// -------------------------------------------------------------------------------------
// Gather sample points along the baseline 
// -------------------------------------------------------------------------------------
// Convert vertices of baseline to a FeatureCollection of points.
rem.baseline.pts = ee.FeatureCollection(
  rem.baseline.fc.geometry().coordinates().map(function(line) {
    return ee.List(line).map(function(pt) {
      return ee.Feature(ee.Geometry.Point(pt));
    });
  })
  .flatten()
);
// Go to map composition section and add points to check this step. 
// -------------------------------------------------------------------------------------
// Grab elevation value at each sample point. 
// -------------------------------------------------------------------------------------
rem.baseline.pts_samples = rem.dem.i.sampleRegions({
  collection: rem.baseline.pts,
  scale: 3,
  geometries: true
});
// Check results
print('Sample check', rem.baseline.pts_samples.first());
// -------------------------------------------------------------------------------------
// Constructed detrended elevation model.
// -------------------------------------------------------------------------------------
// define an area of interest.
rem.aoi = rem.fha.fc.map(function(f) {return f.buffer(250)});
// Go to map layout to check aoi as a layer. 
// combine mean and stdDev reducers to calculate regional stats
rem.reducers = ee.Reducer.mean().combine(ee.Reducer.stdDev(),null,true);
// calculate mean and stdDev in watershed
rem.stats = rem.dem.i.reduceRegion({
  reducer: rem.reducers,
  geometry: rem.aoi,
  scale: 3,
  // bestEffort: true,
});
print("STATS", rem.stats);
// Interpolate the elevation values from sample points to find surface trend.
rem.trend = rem.baseline.pts_samples.inverseDistance({
  range: 1500, // max 5km range original
  propertyName: "elevation", 
  mean: rem.stats.get("elevation_mean"), 
  stdDev: rem.stats.get("elevation_stdDev"),
  gamma: 1, // 0.75 original
  reducer: ee.Reducer.mean()
});
// -------------------------------------------------------------------------------------
// Compute relative elevations by removing trend from dem
// -------------------------------------------------------------------------------------
rem.i = rem.dem.i.subtract(rem.trend);
rem.viz = {
  min: 0, 
  max: 4.572, 
  palette: ['#081d58', '#0f2b68', '#173877', '#1e4785', '#255792', '#2c679e', '#3278a9', '#3889b2', '#3c9bba', '#40acc1', '#5bbdc3', '#84cac2', '#a6d9c5', '#c5e6cf', '#e3f3e1', '#ffffff']
  }
;
// -------------------------------------------------------------------------------------
// Compose map layers.
// -------------------------------------------------------------------------------------
// Center layout on baseline with z 13.
layout.map.centerObject(rem.baseline.fc, 15);
layout.map.addLayer(rem.dem.hs_blend, {}, "Hillshade", false);
layout.map.addLayer(rem.i, rem.viz, "REM", true);
layout.map.addLayer(rem.shed.fc.style(cart.shed_style), {}, rem.shed.layer_name, false);
layout.map.addLayer(rem.corridor.fc.style(cart.shed_style), {}, rem.corridor.layer_name, false);
layout.map.addLayer(rem.fha.fc.style(cart.shed_style), {}, rem.fha.layer_name, false);
layout.map.addLayer(rem.baseline.fc, {color: "#00FFFF"}, rem.baseline.layer_name, false);
layout.map.addLayer(rem.baseline.pts, {color: 'white'}, "Sample points", false);
layout.map.addLayer(rem.aoi, {color: '#CCFFFF'}, "AOI", false);
// -------------------------------------------------------------------------------------
// Add histogram (requires patience).
// -------------------------------------------------------------------------------------
print("REM", rem);
rem.chart = data.makeHistogram(
  rem.i,          // Image
  rem.aoi,        // Region 
  'elevation',    // Band in image with values
  10,             // Scale for analysis 
  "Elevation relative to stream height in area of interest", // Title for chart
  'blue',         // Color for histogram bars 
  -5,             // Min values of x-axis
  10              // Max value of x-axis
  )
;
layout.panel.add(rem.chart);
// // -------------------------------------------------------------------------------------
// // Export image as asset. 
// // -------------------------------------------------------------------------------------
// var xName = "REM_" + rem.baseline.layer_name.slice(0,4);
// var xi = {
//   image: rem.i, 
//   description: xName , 
//   assetId: xName, 
//   pyramidingPolicy: "mean", 
//   // dimensions, 
//   region: rem.aoi, 
//   scale: 1, 
//   // crs, 
//   // crsTransform, 
//   maxPixels: 1e12, 
//   // shardSize
// };
// Export.image.toAsset(xi);