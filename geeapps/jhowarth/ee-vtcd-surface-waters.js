//  --------------------------------------------------------------------------------
//  Name:    surface_waters.js 
//  Purpose: Surface water and riparian landscape component  
//
//  Author:  Jeff Howarth
//  Created: 3/20/2023  
//  License: Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)
//  KNOWN ISSUES: 
//    (1) steep embankment setbacks are visualized but not implemented
//    (2) missing small water bodies.
//  --------------------------------------------------------------------------------
// var tool = require('users/jhowarth/conservation:modules/geoTools.js');
// var styles = require('users/jhowarth/conservation:modules/styles.js');
// var output = require('users/jhowarth/conservation:modules/output.js');
// Load modules
var data = require('users/jhowarth/cd-usa-vt-middlebury:modules/data.js');
var cart = require('users/jhowarth/cd-usa-vt-middlebury:modules/cart.js');
var study_regions = require('users/jhowarth/cd-usa-vt-middlebury:layers/study_regions.js');
var lc = require('users/jhowarth/cd-usa-vt-middlebury:layers/land-cover.js');
var rem = require('users/jhowarth/cd-usa-vt-middlebury:layers/rem.js');
var vcd = require('users/jhowarth/cd-usa-vt-middlebury:layers/vcd.js');
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
  title: cart.makeTitle('Surface waters'), 
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
// Define study region.
// -------------------------------------------------------------------------------------
// Load the administrative regions dictionary from data module. 
var region = study_regions.region;
region.town.i = data.fcMakeBinaryImage(region.town.fc);
// Print the region dictionary so that you can see the sub-dictionaries it contains.
// print('REGION STARTS', region);
layout.map.setOptions('HYBRID');
layout.map.centerObject(region.town.fc, 13);
// -------------------------------------------------------------------------------------
// Beers atlas
// -------------------------------------------------------------------------------------
var beers = ee.Image("users/jhowarth/vt_images/beersMidd71");
layout.map.addLayer(beers, {min:0, max:255}, "Beers atlas 1871", false);
// -------------------------------------------------------------------------------------
// Add REM base layers.
// -------------------------------------------------------------------------------------
var rem = rem.rem;
var midd_rem = ee.Image("projects/conservation-atlas/assets/hydrology/REM_Midd_0314_2023");
var mudd_rem = ee.Image("projects/conservation-atlas/assets/hydrology/REM_Mudd_0314_2023");
var otter_rem = ee.Image("projects/conservation-design/assets/REM_Otter_0403");
layout.map.addLayer(otter_rem.updateMask(otter_rem.lte(rem.viz.max)), rem.viz, "Otter Creek REM", false);
layout.map.addLayer(midd_rem.updateMask(midd_rem.lte(rem.viz.max)), rem.viz, "Middlebury River REM", false);
layout.map.addLayer(mudd_rem.updateMask(mudd_rem.lte(rem.viz.max)), rem.viz, "Muddy Branch REM", false);
// print("REM", rem);
// -------------------------------------------------------------------------------------
// Prepare palettes. 
// -------------------------------------------------------------------------------------
var palette = {};
palette.midd = "#6767E6";
palette.anr = "#CC5CF2";
palette.agree = "#5AC7F2";
palette.colors = [palette.midd, palette.anr, palette.agree];
palette.labels = ['Town setbacks', 'ANR zones', 'Agreement'];
// print('PALETTE', palette);
palette.legend = cart.makeLegend('Color key', palette.colors, palette.labels);
layout.panel.add(palette.legend);
// -------------------------------------------------------------------------------------
// Vermont ANR River Corridor Zones 
// -------------------------------------------------------------------------------------
var pro_waters = data.pro_waters;
// Load river corridor features for Addison County. 
pro_waters.rc.fc = data.fcFilterByRegion(pro_waters.rc.fc_address, region.county.fc);
//  print("ANR RIVER CORRIDORS", pro_waters.rc.fc.first());
// Convert to binary image. 
pro_waters.rc.i = data.fcMakeBinaryImage(pro_waters.rc.fc)
  .updateMask(region.town.i);
layout.map.addLayer(
  pro_waters.rc.i.selfMask(), 
  {palette: palette.anr}, 
  pro_waters.rc.layer_name,
  false
  )
;
// Load small streams for 50 ft setbacks for Addison County.
pro_waters.sss.fc = data.fcFilterByRegion(pro_waters.sss.fc_address, region.county.fc);
// Buffer each stream by 50 ft.
var sssBuffer = function(f) {
  return f.buffer(50 * 0.3048);
};
pro_waters.sss.setbacks = pro_waters.sss.fc.map(sssBuffer);
// Convert to binary image.
pro_waters.sss.i = data.fcMakeBinaryImage(pro_waters.sss.setbacks)
  .updateMask(region.town.i);
layout.map.addLayer(
  pro_waters.sss.i.selfMask(), 
  {palette: palette.anr},
  pro_waters.sss.layer_name,
  false
  )
;
// Combine river corridor and small stream layers 
pro_waters.anr = {};
pro_waters.anr.layer_name = "River corridors and 50 ft setbacks on small streams";
pro_waters.anr.i = pro_waters.rc.i.unmask().max(pro_waters.sss.i.unmask());
// Show composite layer on map. 
layout.map.addLayer(
  pro_waters.anr.i.selfMask(), 
  {palette: palette.anr}, 
  pro_waters.anr.layer_name,
  false
  )
;
//  ------------------------------------------
//  Distinguish flowlines by types. 
//  ------------------------------------------
var nhd = data.nhd;
// print('NHD', nhd);
//  Flow lines for streams  
nhd.flowline.fc = data.fcFilterByRegion(nhd.flowline.fc_address, region.county.fc);
//  Get list of FCodes
// print(
//   'FCODES', 
//   nhd.flowline.fc.first(),
//   nhd.flowline.fc.aggregate_array('fcode').distinct().sort()
//   )
// ;
nhd.flowline.fcodes = {
  33400: "Connector",
  33600: "Canal or Ditch",
  46006: "Perennial Stream or River",
  55800: "Artificial Path"
};
// Make nominal image from FCodes.
// Code Perennial streams = 1, connectors = 2, artificial path = 3, ditches = 4
nhd.flowline.i = data.makeNominalImage(nhd.flowline.fc, 'fcode')
  .remap(
    [33400, 33600, 46006, 55800],
    [2,4,1,3]
    )
  .unmask()
  .updateMask(region.town.i)
  ;
// print('NHD CHECK', nhd);
layout.map.addLayer(
  nhd.flowline.i.selfMask(), 
  {min:0,max:4, palette:['black','cyan', 'cyan', 'cyan', 'red']}, 
  'NHD Flowlines',
  false
  )
;
//  ------------------------------------------
//  Merge with area water features. 
//  ------------------------------------------
//  Lakes, ponds, and other bodies of water 
nhd.water_body.fc = data.fcFilterByRegion(nhd.water_body.fc_address, region.county.fc);
//  Streams that are too wide to be represented by a line (e.g. Otter Creek, Middlebury River)
nhd.area.fc = data.fcFilterByRegion(nhd.area.fc_address, region.county.fc);
//  Merge zonal water bodies into a single collection
// Convert feature collections to images
nhd.water_body.i = data.fcMakeBinaryImage(nhd.water_body.fc)
  .unmask()
  .updateMask(region.town.i)
  ;
nhd.area.i = data.fcMakeBinaryImage(nhd.area.fc)
  .unmask()
  .updateMask(region.town.i)
  ;
// Make composite  
nhd.area_composite = {};
nhd.area_composite.i =  nhd.area.i 
  .max(nhd.water_body.i.multiply(10))
  .remap(
    [0,1,10],
    [0,1, 0])
  ;
layout.map.addLayer(
  nhd.area_composite.i.selfMask(), 
  {min:0,max:2, palette:['black','cyan', 'blue']}, 
  'NHD Area features',
  false
  )
;
// Composite
nhd.composite = {};
nhd.composite.i = nhd.area_composite.i.max(nhd.flowline.i.gt(0));
// // The next two lines tested using the land cover binary in the solution, but there is too much noise. 
// lc.target.composite = lc.target.water.max(nhd.area_composite.i).max(nhd.flowline.i.gt(0));
// layout.map.addLayer(lc.target.composite.selfMask(), {min:0, max: 3, palette: ['black', 'cyan', 'blue', 'red']}, "Composite");
//  ------------------------------------------
//  Flood hazard areas.
//  ------------------------------------------
//  Middlebury flood hazard area
pro_waters.fha.fc = data.fcFilterByRegion(pro_waters.fha.fc_address, region.county.fc);
// Convert feature collections to images
pro_waters.fha.i = data.fcMakeBinaryImage(pro_waters.fha.fc).unmask();
// Make composite  
layout.map.addLayer(
  pro_waters.fha.i.selfMask(), 
  {min:0,max:1, palette:palette.midd}, 
  pro_waters.fha.layer_name,
  false
  )
;
//  ------------------------------------------
//  Fluvial Erosion Hazard areas.
//  ------------------------------------------
//  Middlebury fluvial erosion hazard area
pro_waters.feha.fc = data.fcFilterByRegion(pro_waters.feha.fc_address, region.county.fc);
// Convert feature collections to images
pro_waters.feha.i = data.fcMakeBinaryImage(pro_waters.feha.fc).unmask();
// Make composite  
layout.map.addLayer(
  pro_waters.feha.i.selfMask(), 
  {min:0,max:1, palette:palette.midd}, 
  pro_waters.feha.layer_name,
  false
  )
;
//  ------------------------------------------
//  Steep embankments 
//  ------------------------------------------
var dem = data.elevation.dep_1m;
dem.filtered = dem.ic.filterBounds(region.county.fc);
var classSlope = function(i) {
  var slope = ee.Terrain.slope(i);
  var percent = slope.divide(180).multiply(Math.PI).tan().multiply(100).rename('percent');
  return percent.gte(25);
};
dem.embankments = dem.filtered.map(classSlope).mosaic();
layout.map.addLayer(dem.embankments.selfMask(), {palette: 'yellow'}, 'Embankments', false);
/*
------------------------------------------------------------------------------------
SETBACKS
2022 Zoning and Sub-division Guidelines
Page 119
(A) Otter Creek, Middlebury River, Muddy Branch (downstream from Vt. 116/Case Street)
  (1) Protection/buffer areas shall be minimum of 100 feet, 
      or to the limit of the flood hazard area where such limit is over 100 ft from river bank.
  (2) Where embankments forming the edge of the flood hazard area are 25% or steeper in slope, 
      the protection area shall extend to 100 ft. back from the top of the embankment;
  (3) To the limits of the FEH zone adopted by Select Board.
(B) Along all other streams shown on the Town GIS maps, the protection/buffer areas shall be
    the distances provided for the rear setback (Section 620).
IV. Exceptions: ag fields, CBD, infrastructure
SECTION 620 - rear setbacks
DOWNTOWN AND MIXED USE DISTRICTS
Central Business        CB     0
Heritage Industrial     HI    10
Mixed-Use               MU    10
Protected Highway       PH    50
General Commercial      GC    25
RESIDENTIAL DISTRICTS 
R-20: 20 
R 12: 10
R 8:  10
R 4:  10
R 2:  10
RURAL AND CONSERVATION ZONING DISTRICTS
AR:   25 
FOR:  100
OTHER DISTRICTS 
INS: 10,
IND: 10,
AIR: 10
------------------------------------------------------------------------------------
*/
// Setbacks by zoning districts. 
var zones = {};
zones.fc = ee.FeatureCollection('projects/conservation-atlas/assets/cadastre/Zoning_Districts_2022');
// print(
//   'ZONES',
//   zones.fc.first(),
//   zones.fc.aggregate_array('DISTRICT').distinct().sort()
//   )
// ;
zones.i = data.makeNominalImageFromFC(zones.fc, 'DISTRICT', 'DISTRICT');
zones.class_names = data.makeTagDictionary(zones.fc, 'DISTRICT');
zones.b = {
  AR: 25,
  AIR: 10,
  CB: 0,
  FOR: 100,  
  GC: 25,
  HI: 10,
  IND: 10,
  INS: 10,
  MU: 10,
  PH: 50,
  R12: 10,
  R2: 10,
  R20: 20,
  R4: 10,
  R8: 10
};
zones.ib = zones.i.remap(
  [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14],
  [
    zones.b.AR, 
    zones.b.AIR, 
    zones.b.CB,
    zones.b.FOR, 
    zones.b.GC, 
    zones.b.HI,
    zones.b.IND, 
    zones.b.INS, 
    zones.b.MU,
    zones.b.PH, 
    zones.b.R12, 
    zones.b.R2,
    zones.b.R20, 
    zones.b.R4, 
    zones.b.R8
  ]
);
// print(zones);
layout.map.addLayer(
  zones.ib, 
  {min:0, max: 100, palette: ['#ffffff', '#cfdaf7', '#a0b8ed', '#7195dc', '#4e74ba']}, 
  "Setbacks",
  false
  )
;
//  ------------------------------------------
// Create stream setbacks by district
//  ------------------------------------------
// Write a function to buffer streams based on land use district. 
// Where ih = hydrology image, ib = setback zones image, bd = setback distance (buffer distance)
var bufferImage = function(ih, ib, bd) {
  var filter = ib.eq(bd);
  var isolate = filter.and(ih);
  return isolate
    .distance(ee.Kernel.euclidean({radius: 150, units: 'meters'}))
    .lte(bd * 0.3048)
    .unmask();
};
// Apply function for each setback distance. 
zones.b10 = bufferImage(nhd.composite.i, zones.ib, 10);
zones.b20 = bufferImage(nhd.composite.i, zones.ib, 20);
zones.b25 = bufferImage(nhd.composite.i, zones.ib, 25);
zones.b50 = bufferImage(nhd.composite.i, zones.ib, 50);
zones.b100 = bufferImage(nhd.composite.i, zones.ib, 100);
// Composite the setbacks by taking the maximum.  
zones.stream_setbacks_by_district = zones.b10
  .max(zones.b20)
  .max(zones.b25)
  .max(zones.b50)
  .max(zones.b100)
;
layout.map.addLayer(
  zones.stream_setbacks_by_district.selfMask(), 
  {palette: 'LightSteelBlue'}, 
  'Middlebury Steam Setbacks by District',
  false
  )
;
//  ------------------------------------------
//  Distinguish named rivers 
//  ------------------------------------------
// print(
//   'FLOWLINES', 
//   nhd.flowline.fc.first(),
//   nhd.flowline.fc.aggregate_array('gnis_name').distinct().sort()
//   )
// ;
nhd.flowline.fc_names = nhd.flowline.fc.filter(
  ee.Filter.or(
    ee.Filter.eq('gnis_name', "Otter Creek"),
    ee.Filter.eq('gnis_name', "Muddy Branch"),
    ee.Filter.eq('gnis_name', "Middlebury River")
    )
  );
// print(
//   'STREAM AREA', 
//   nhd.area.fc.first(),
//   nhd.area.fc.aggregate_array('gnis_name').distinct().sort()
//   )
// ;
// Define a spatial filter, with distance 1 m.
var distFilter = ee.Filter.withinDistance({
  distance: 1,
  leftField: '.geo',
  rightField: '.geo',
  maxError: 1
});
// Define a saveAll join.
var distSaveAll = ee.Join.saveAll({
  matchesKey: 'areas',
  measureKey: 'distance'
});
// Apply the join.
nhd.area.fc_names = distSaveAll.apply(nhd.area.fc, nhd.flowline.fc_names.union(), distFilter);
// print(nhd.flowline.fc_names, nhd.area.fc_names);
// layout.map.addLayer(nhd.area.fc_names, {color: 'blue'}, 'TEST');
nhd.names = {};
nhd.names.i = data.fcMakeBinaryImage(nhd.flowline.fc_names).unmask()
  .max(data.fcMakeBinaryImage(nhd.area.fc_names).unmask()
  )
;
var bufferNameRiver = function(i, bd) {
  return i
    .distance(ee.Kernel.euclidean({radius: 150, units: 'meters'}))
    .lte(bd * 0.3048)
    .updateMask(zones.i.eq(0))        // Remove CB District
    .unmask();
};
nhd.names.b100 = bufferNameRiver(nhd.names.i, 100).updateMask(region.town.i);
layout.map.addLayer(
  nhd.names.b100.selfMask(), 
  {palette: palette.midd}, 
  'Middlebury Named Stream Setbacks',
  false
  )
;
//  ------------------------------------------
//  Bring in water bodies
//  ------------------------------------------
//  Currently, town does not specify setbacks for ponds and reservoirs. 
//  ------------------------------------------
//  Combine Midd setbacks
//  ------------------------------------------
pro_waters.midd = {};
pro_waters.midd.i_without_feh_and_fha = nhd.names.b100.max(zones.stream_setbacks_by_district);
pro_waters.midd.i_with_fhe_without_fha = pro_waters.midd.i_without_feh_and_fha.max(pro_waters.feha.i);
pro_waters.midd.i_with_fhe_and_fha = pro_waters.midd.i_with_fhe_without_fha.max(pro_waters.fha.i);
layout.map.addLayer(
  pro_waters.midd.i_without_feh_and_fha.selfMask(), 
  {palette: palette.midd}, 
  'Middlebury Steam Setbacks Without FHA',
  false
  )
;
layout.map.addLayer(
  pro_waters.midd.i_with_fhe_without_fha.selfMask(), 
  {palette: palette.midd}, 
  'Middlebury Steam Setbacks Without FHA',
  false
  )
;
layout.map.addLayer(
  pro_waters.midd.i_with_fhe_and_fha.selfMask(), 
  {palette: palette.midd}, 
  'Middlebury Steam Setbacks With FHA',
  false
  )
;
//  ------------------------------------------
//  Make comparative layer. 
//  ------------------------------------------
// Key: 1 = Midd alone, 2 = ANR alone, 3 = Midd and ANR agree
pro_waters.compare = {};
pro_waters.compare.i_without_fha_or_feh = pro_waters.midd.i_without_feh_and_fha
  .unmask()
  .add(pro_waters.anr.i.multiply(2).unmask());
layout.map.addLayer(
  pro_waters.compare.i_without_fha_or_feh.selfMask(),
  {min:1, max: 3, palette: [palette.midd, palette.anr, palette.agree]},
  "Comparison of Midd without FEH or FHA and ANR surface water setbacks"
  )
;
pro_waters.compare.i_with_fhe_without_fha = pro_waters.midd.i_with_fhe_without_fha.unmask()
  .add(pro_waters.anr.i.multiply(2).unmask());
layout.map.addLayer(
  pro_waters.compare.i_with_fhe_without_fha.selfMask(),
  {min:1, max: 3, palette: [palette.midd, palette.anr, palette.agree]},
  "Comparison of Midd with FHE and ANR surface water setbacks",
  false
  )
;
pro_waters.compare.i_with_fhe_and_fha = pro_waters.midd.i_with_fhe_and_fha.unmask()
  .add(pro_waters.anr.i.multiply(2).unmask());
layout.map.addLayer(
  pro_waters.compare.i_with_fhe_and_fha.selfMask(),
  {min:1, max: 3, palette: [palette.midd, palette.anr, palette.agree]},
  "Comparison of Midd with FEH and FHA and ANR surface water setbacks",
  false
  )
;
// -------------------------------------------------------------------------------------
// Load buildings. 
// -------------------------------------------------------------------------------------
lc = lc.lc;
print('LAND COVER', lc);
lc.buildings.fc = data.fcFilterByRegion(lc.buildings.fc_address, region.town.fc);
// lc.buildings.i = data.fcMakeBinaryImage(lc.buildings.fc).unmask();
lc.buildings.target = pro_waters.compare.i_with_fhe_and_fha;  
lc.buildings.zonal = lc.buildings.target
  .reduceRegions({
    collection: lc.buildings.fc, 
    reducer: ee.Reducer.max(), 
    scale: 3, 
    // crs, crsTransform, tileScale
    }
  )
  .filter(ee.Filter.gt('max',0));
var makeCentroid = function(f){
  return f.centroid();
};
print(lc.buildings.zonal.first());
layout.map.addLayer(
  lc.buildings.zonal.map(makeCentroid),
  {color: 'red'},
  "Buildings in administrative setback zones",
  false
  )
;
layout.map.addLayer(
  pro_waters.compare.i_with_fhe_and_fha.updateMask(data.fcMakeBinaryImage(lc.buildings.zonal).unmask()),
  {min:1, max: 3, palette: [palette.midd, palette.anr, palette.agree]},
  "Buildings coded by administrative setback zones",
  false
  )
;
// ------------------------------------------------------------------------------------- 
// Add marginalia to bottom of layout panel. 
// -------------------------------------------------------------------------------------  
layout.panel
  .add(labels.ack)
  .add(labels.credits)
;
// ------------------------------------------------------------------------------------- 
// Add handle for exports.
// ------------------------------------------------------------------------------------- 
// print('PROTECTED WATERS', pro_waters);
exports.pro_waters = pro_waters;
// // ------------------------------------------------------------------------------------- 
// // Export image to asset
// // ------------------------------------------------------------------------------------- 
// var x_name = "Surface_water_setback_comparison";
// var xi = {
//   image: pro_waters.compare.i_with_fhe_and_fha, 
//   description: x_name,
//   assetId: x_name, 
//   pyramidingPolicy: "mode", 
//   // dimensions, 
//   region: region.town.fc, 
//   scale: 1, 
//   // crs, 
//   // crsTransform, 
//   maxPixels: 1e12, 
//   // shardSize
// };
// Export.image.toAsset(xi);