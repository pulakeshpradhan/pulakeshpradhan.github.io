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
var lidar = require('users/jhowarth/cd-usa-vt-middlebury:layers/hillshades.js');
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
  title: cart.makeTitle('Grassland habitat'), 
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
// Center layout on study region with z 12.
layout.map.centerObject(study_region, 13);
// -------------------------------------------------------------------------------------
// Define terrain and surface models. 
// -------------------------------------------------------------------------------------
// print('ELEVATION', lidar.lidar);
var dtm = lidar.lidar.dem_hf_2017;
var dsm = lidar.lidar.dsm_2017;
var work = lidar.lidar.work;
// Add both elevation layers to the map. 
// Make not visible by default. 
// layout.map.addLayer(dtm.i, {min: 0, max: 1000}, 'dtm elevation',0);
// layout.map.addLayer(dsm.i, {min: 0, max: 1000}, 'dsm elevation',0);
// -------------------------------------------------------------------------------------
// Add hillshade layers
// -------------------------------------------------------------------------------------
// Make hillshades not visible by default. 
// layout.map.addLayer(dtm.hs_blend, work.hs_viz, "dtm hs",0);
// layout.map.addLayer(dsm.hs_blend, work.hs_viz, "dsm hs",0);
// -------------------------------------------------------------------------------------
// Make height above ground layer
// -------------------------------------------------------------------------------------
// var hag = {};
// hag.i = dsm.i.subtract(dtm.i);
// layout.map.addLayer(hag.i, {min:0, max: 10}, 'Height above ground');  
// hag.focal_min = hag.i.focalMin({
//   radius: 50, 
//   kernelType: 'circle',
//   units: 'meters'
//   }
// );
// hag.focal_max = hag.i.focalMax({
//   radius: 50, 
//   kernelType: 'circle',
//   units: 'meters'
//   }
// );
// hag.focal_range = hag.focal_max.subtract(hag.focal_min);
// layout.map.addLayer(hag.focal_range, {min:0, max: 25}, 'Range height above ground'); 
// -------------------------------------------------------------------------------------
// Identify grasslands.
// -------------------------------------------------------------------------------------
var lc = lc.lc;
// print('LAND COVER', lc);
lc.grasslands = {};
lc.grasslands.radius = 2.5;
lc.grasslands.resolution = 2.5;
// print('LAND COVER', lc);
lc.grasslands.lc = lc.lcp.i.updateMask(region.county.i)
  .remap(
    [0,1,2,3,4,5,6,7,8,9,10],
    [0,0,1,1,1,0,0,0,0,0, 0]
  )
  .reduceNeighborhood({
    reducer: ee.Reducer.mode(), 
    kernel: ee.Kernel.circle({
      radius: lc.grasslands.radius, 
      units: 'meters', 
      })
    }
  )
;
lc.grasslands.i = lc.grasslands.lc
  .eq(0)
  .distance(
    ee.Kernel.euclidean({radius: 500, units: 'meters'})
    )
  .gt(50)
  .unmask()
;
layout.map.addLayer(lc.grasslands.lc, {}, "Open habitat", false);
layout.map.addLayer(lc.lcp.i.updateMask(lc.grasslands.i), lc.lcp.viz, 'Grasslands', false);
// -------------------------------------------------------------------------------------
// Convert to features
// -------------------------------------------------------------------------------------
lc.grasslands.fc = lc.grasslands.i.selfMask()
  .reduceToVectors({
    reducer: ee.Reducer.countEvery(), 
    geometry: region.county.fc, 
    scale: lc.grasslands.resolution, 
    geometryType: 'polygon', 
    eightConnected: false, 
    labelProperty: 'label', 
    // crs, 
    // crsTransform, 
    // bestEffort, 
    maxPixels: 1e15, 
    // tileScale, 
    // geometryInNativeProjection
    }
  )
;
var fcA = function(f) {
  return f.set('area', f.area(1));
};
var fcP = function(f) {
  return f.set('perimeter', f.perimeter(1));
};
var fcPA = function(f) {
  return f.set('pa_ratio', f.getNumber('perimeter').divide(f.getNumber('area')));
};
lc.grasslands.a_crit = 20 * 4046.86;
lc.grasslands.a_fc = lc.grasslands.fc
  .map(fcA)
  .filter(ee.Filter.gt('area', lc.grasslands.a_crit))
;
// layout.map.addLayer(lc.grasslands.a_fc, {color: 'gold'}, 'Grasslands Area');
lc.grasslands.pa_fc = lc.grasslands.a_fc
  .map(fcP)
  .map(fcPA)
  .filter(ee.Filter.lte('pa_ratio', 0.015))
;
// print('CHECK', lc.grasslands.pa_fc.first());
// layout.map.addLayer(lc.grasslands.pa_fc, {color: 'Orchid'}, 'Grassland habitat blocks', false);
lc.grasslands.i = data.fcMakeBinaryImage(lc.grasslands.pa_fc).unmask();
layout.map.addLayer(lc.grasslands.i.selfMask(), {palette: 'Orchid'}, 'Grassland habitat blocks', true);
// -------------------------------------------------------------------------------------
// Compose grassland habitat image.
// -------------------------------------------------------------------------------------
// lc.grassland_habitat = {};
// -------------------------------------------------------------------------------------
// Protected lands
// -------------------------------------------------------------------------------------
var pro = pro.pro_lands;
// print('PROTECTED LANDS', pro);
lc.grasslands.pro = lc.grasslands.i.multiply(pro.collate.selfMask());
layout.map.addLayer(lc.grasslands.pro.selfMask(), {palette: 'YellowGreen'}, 'Grassland habitat blocks with protections for ag', false);
// -------------------------------------------------------------------------------------
// Add study region layer to top of layer stack. 
// -------------------------------------------------------------------------------------  
// Add the study region (town with neighbors) as a layer. 
layout.map.addLayer(region.town.fc.style(cart.study_region_style), {}, 'Study region', true);