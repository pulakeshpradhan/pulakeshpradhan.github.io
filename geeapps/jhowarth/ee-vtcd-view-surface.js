var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.MultiPoint();
//  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//  name:     view-surface.js
//  purpose:  Define the surface for a viewshed model.
//
//  author:   Jeff Howarth
//  update:   2/21/2022  
//  license:  Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)
//  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var tool = require('users/jhowarth/conservation:modules/geoTools.js');
var style = require('users/jhowarth/conservation:modules/styles.js');
var cart = require('users/jhowarth/conservation:modules/cart.js');
var output = require('users/jhowarth/conservation:modules/output.js');
// Load modules
var data = require('users/jhowarth/cd-usa-vt-middlebury:modules/data.js');
var cart = require('users/jhowarth/cd-usa-vt-middlebury:modules/cart.js');
var lidar = require('users/jhowarth/cd-usa-vt-middlebury:layers/hillshades.js');
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
  title: cart.makeTitle('Surface for viewshed model'), 
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
var study_region = region.county.fc;
// -------------------------------------------------------------------------------------
// Define terrain and surface models. 
// -------------------------------------------------------------------------------------
print('ELEVATION', lidar.lidar);
var dtm = lidar.lidar.dem_hf_2017;
var dsm = lidar.lidar.dsm_2017;
var work = lidar.lidar.work;
// Center layout on study region with z 12.
layout.map.centerObject(study_region, 12);
// Add both elevation layers to the map. 
// Make not visible by default. 
layout.map.addLayer(dtm.i, {min: 0, max: 700}, 'dtm elevation',0);
layout.map.addLayer(dtm.i, {min: 0, max: 700}, 'dsm elevation',0);
// -------------------------------------------------------------------------------------
// Add hillshade layers
// -------------------------------------------------------------------------------------
// Make hillshades not visible by default. 
layout.map.addLayer(dtm.hs_blend, work.hs_viz, "dtm hs",0);
layout.map.addLayer(dsm.hs_blend, work.hs_viz, "dsm hs",0);
// -------------------------------------------------------------------------------------
// Model a "leaf off" surface 
//  by compositing dsm elevations for building footprints and conifers
//  with dtm elevations for everything else. 
// -------------------------------------------------------------------------------------
// Import the lc dictionary from the land cover layer module. 
print('LAND COVER', lc.lc);
//  Define the building binary.
var buildings = lc.lc.buildings.i.unmask();
// Temporarily add layer to map to check. 
layout.map.addLayer(buildings, {min:0, max:1}, 'Building footprints', 0);
//  Isolate conifer
lc.lc.conifers.fc = data.fcFilterByRegion(lc.lc.conifers.fc_address, study_region);
lc.lc.conifers.i = data.fcMakeBinaryImage(lc.lc.conifers.fc);
var conifers = lc.lc.conifers.i.unmask();
// Temporarily add layer to map to check. 
layout.map.addLayer(conifers, {min:0, max:1}, 'Conifers', 0);
//  Union the buildings and conifers binaries. 
var union = buildings.or(conifers);
// Temporarily add layer to map to check. 
layout.map.addLayer(union, {min:0, max:1}, 'Union', 0);
// Composite the dsm elevations for buildings or conifers with dtm elevations for everything else.
var leaf_off_dem = dtm.i
  .max(
    dsm.i.multiply(union));
// Make hillshade of the leaf surface 
var leaf_off_hs = lidar.blendHillshade(leaf_off_dem, 315, 260, 35);
layout.map.addLayer(leaf_off_hs, work.hs_viz, 'Leaf off surface',0);
// -------------------------------------------------------------------------------------
// Remove tree canopy that overhands roads.
// -------------------------------------------------------------------------------------
// Import road binary from land cover module. 
var roads = lc.lc.roads.i.unmask();
// Temporarily add the road layer. 
layout.map.addLayer(roads, {min:0,max:1}, 'Roads',0);
// Buffer the roads by some distance to approximate road width. 
var roads_buffs = roads
  .distance(
    ee.Kernel.euclidean(100, 'meters')
    )
  .lte(7)
  .unmask()
;
// Temporarily add the road layer. 
layout.map.addLayer(roads_buffs, {min:0,max:1}, 'Buffered roads',0);
// Make a leaf off surface with road elevations from dtm. 
var leaf_off_dem_v2 = dtm.i
  .max(
    dsm.i.multiply(
      union.multiply(roads_buffs.eq(0)
      )
    )
  )
;
// Make hillshade of the leaf surface and display on the map. 
var leaf_off_hs_v2 = lidar.blendHillshade(leaf_off_dem_v2, 315, 260, 35);
layout.map.addLayer(leaf_off_hs_v2, work.hs_viz, 'Leaf off surface version 2',0);
// -------------------------------------------------------------------------------------
// Remove tree canopy that overhands trails.
// -------------------------------------------------------------------------------------
// Print trails from data module. 
print('TRAILS', data.trails);
// Make trails feature collection for the study region.
data.trails.malt.fc = data.fcFilterByRegion(data.trails.malt.fc_address, study_region);
// Temporarily add the layer to the map. 
layout.map.addLayer(data.trails.malt.fc, {color: 'yellow'}, 'MALT Trails',0);
// Print the first row of the feature collection. 
print(data.trails.malt.fc.first());
// Print all the unique values for the field that describe the type of trail.
print(data.trails.malt.fc
  .aggregate_array('Trail_Type')
  .distinct()
  .sort()
  )
;
// Remove the vernacular trails from the layer. 
data.trails.malt.fc_filtered = data.trails.malt.fc.filter(
  ee.Filter.neq('Trail_Type', 'Side_Trail')
  )
;
// Temporarily add filtered trails to the map. 
layout.map.addLayer(data.trails.malt.fc_filtered, {color: 'red'}, 'Filtered Trails', 0);
// Make a binary from the filterd trails data and unmask the result.
data.trails.malt.i = data.fcMakeBinaryImage(data.trails.malt.fc_filtered).unmask();
// Temporarily add the binary to the map.
layout.map.addLayer(data.trails.malt.i, {min:0, max:1}, 'Filtered Trails image', 0);
// Buffer the trails by some distance to approximate trail width. 
data.trails.malt.buffs = data.trails.malt.i
  .distance(
    ee.Kernel.euclidean(100, 'meters')
    )
  .lte(3)
  .unmask()
;
// Temporarily add the binary to the map.
layout.map.addLayer(data.trails.malt.buffs, {min:0, max:1}, 'Filtered Trails image buffers', 0);
// Make a leaf off surface with road and trail elevations from dtm. 
var union_routes = roads_buffs.or(data.trails.malt.buffs);
var leaf_off_dem_v3 = dtm.i
  .max(
    dsm.i.multiply(
      union.multiply(union_routes.eq(0)
      )
    )
  )
;
// Make hillshade of the leaf surface and display on the map.  
var leaf_off_hs_v3 = lidar.blendHillshade(leaf_off_dem_v3, 315, 260, 35);
layout.map.addLayer(leaf_off_hs_v3, work.hs_viz, 'Leaf off surface version 3',1);