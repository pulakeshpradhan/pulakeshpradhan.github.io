//Data
var mab = ee.FeatureCollection("users/lmathew/Seascape/MAB-032019");
var rufiji_delta = ee.FeatureCollection("users/lmathew/Freshwater/Rufiji_Delta");
var cfma = ee.FeatureCollection("users/lmathew/Seascape/CFMA-02-2018");
var ls8 = ee.ImageCollection("LANDSAT/LC08/C01/T1_SR");
var s1 = ee.ImageCollection("COPERNICUS/S1_GRD");
var jaxa = ee.ImageCollection('JAXA/ALOS/PALSAR/YEARLY/SAR');
//The MBREMP Project (A Duke-WWF Partnershps)
var AoI = mab.geometry().bounds(); 
var RoI = mab;
Map.centerObject(RoI,9);
//Process Landsat 8
var visParams = { bands: ['B4', 'B3', 'B2'], min: 0, max: 3000,  gamma: 1.4,};
//2015
var ls8dataset_2015_a = ls8.filterDate('2015-01-01', '2015-10-31');
var ls8dataset_2015_b = ls8dataset_2015_a.map(maskL8sr);
var ls8dataset_2015_c = ls8dataset_2015_b.median().clipToCollection(RoI);  //2015
//Map.addLayer(ls8dataset_2015_c, visParams, 'LS8-RGB-432-2015', false);
//2019
var ls8dataset_2019_a = ls8.filterDate('2019-01-01', '2019-10-31')
var ls8dataset_2019_b = ls8dataset_2019_a.map(maskL8sr);
var ls8dataset_2019_c = ls8dataset_2019_b.median().clipToCollection(RoI);  //2019
//Map.addLayer(ls8dataset_2019_c, visParams, 'LS8-RGB-432-2019', false);
//===========================================================================================
//Sentinel 1
//=====================================================================================================
// Load the Sentinel-1 ImageCollection
var s1a = s1.filterDate('2019-08-01', '2019-08-31').filterBounds(AoI);
// Filter by metadata properties.
var s1avh = s1a
  // Filter to get images with VV and VH dual polarization.
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
  // Filter to get images collected in interferometric wide swath mode.
  .filter(ee.Filter.eq('instrumentMode', 'IW'));
// Filter to get images from different look angles.
var s1avhAscending = s1avh.filter(ee.Filter.eq('orbitProperties_pass', 'ASCENDING'));
var s1avhDescending = s1avh.filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'));
// Create a composite from means at different polarizations and look angles.
var s1b = ee.Image.cat([
          s1avhAscending.select('VH').mean(),ee.ImageCollection(s1avhAscending.select('VV')
          .merge(s1avhDescending.select('VV'))).mean(),s1avhDescending.select('VH').mean()
          ]).focal_median();
var s1c = ee.ImageCollection(s1b).median().clipToCollection(RoI);
// Display as a composite of polarization and backscattering characteristics.
//Map.addLayer(s1c, {min: [-25, -20, -25], max: [0, 10, 0]}, 'S1 Composite-2019',false);
var s1Vis = {min: [-25, -20, -25], max: [0, 10, 0]};
//===========================================================================================
//JAXA
//=====================================================================================================
// Load the JAXA - ALOS
var alos_a = jaxa.filter(ee.Filter.date('2009-01-01', '2009-12-01'));
var alos_b = alos_a.select('HH','HV');
var alos_c = ee.ImageCollection(alos_b).median().clipToCollection(RoI);
var sarHhVis = { min: [0.0,0.0], max: [10000.0,10000.0] };
//Map.setCenter(39.3106103,-7.90178,12);
//Map.addLayer(sarHh, sarHhVis, 'SAR HH');
//=====================================================================================================
//=====================================================================================================
//Cloud Remove
// The implementation of ee.Algorithms.Landsat.simpleComposite
//=====================================================================================================
function maskL8sr(image) {
  // Bits 3 and 5 are cloud shadow and cloud, respectively.
  var cloudShadowBitMask = (1 << 3);
  var cloudsBitMask = (1 << 5);
  // Get the pixel QA band.
  var qa = image.select('pixel_qa');
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
                 .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
  return image.updateMask(mask);
}
//=====================================================================================================
var tupu = ee.Image().byte();
var jira1 = tupu.paint({featureCollection: AoI, color: 1, width: 4 });
var jira2 = tupu.paint({featureCollection: RoI, color: 3, width: 2 });
var jira3 = tupu.paint({featureCollection: rufiji_delta, color: 1, width: 1 });
var jira4 = tupu.paint({featureCollection: cfma, color: 5, width: 1 });
//Map.addLayer(jira1,{},'MBREMP-Bounding Box',false);
//Map.addLayer(jira2,{},'MBREMP');
//Map.centerObject(RoI,10);
//===============================================
// create a map
var maps = [];
// define names for the band combinations
var map = ui.Map();
    //map.add(ui.Label('LS8-RGB-432-2015'));
    map.addLayer(ls8dataset_2015_c, visParams, 'RGB-432-2015',1);
    map.addLayer(jira1,{},'RD-Bounding Box',false);
    map.addLayer(jira2,{},'MAB');
    map.addLayer(jira3,{},'Rufiji Delta',0);
    map.addLayer(jira4,{},'CFMAs',0);
    map.setControlVisibility(true);
    maps.push(map);
var map = ui.Map(); 
    //map.add(ui.Label('LS8-RGB-432-2019'));
    map.addLayer(ls8dataset_2019_c, visParams, 'RGB-432-2019',1);
    map.addLayer(jira1,{},'RD-Bounding Box',false);
    map.addLayer(jira2,{},'MAB');
    map.addLayer(jira3,{},'Rufiji Delta',0);
    map.addLayer(jira4,{},'CFMAs',0);
    map.setControlVisibility(true);
    maps.push(map);
var map = ui.Map();
    //map.add(ui.Label('ESA-S1-RGB-VVHHVH-2019'));
    map.addLayer(s1c, {min: [-25, -20, -25], max: [0, 10, 0]}, 'ESA-S1-2019', 1);
    map.addLayer(alos_c, sarHhVis, 'JAXA-ALOS-2009',0);
    map.addLayer(jira1,{},'RD-Bounding Box',false);
    map.addLayer(jira2,{},'MAB');
    map.addLayer(jira3,{},'Rufiji Delta',0);
    map.addLayer(jira4,{},'CFMAs',0);
    map.setControlVisibility(true);
    //map.setOptions(HYBRID);
    maps.push(map);
// create a title.
var title = ui.Label('RUMAKI -  Man and the Biosphere (MAB) Reserve', {
  stretch: 'horizontal', textAlign: 'center', fontWeight: 'bold', fontSize: '24px' });
// create a grid of maps.
var mapGrid = ui.Panel(
  [
    ui.Panel([maps[0]], null, {stretch: 'both'}),
    ui.Panel([maps[1]], null, {stretch: 'both'}),
    ui.Panel([maps[2]], null, {stretch: 'both'})
  ],
  ui.Panel.Layout.Flow('horizontal'), {stretch: 'both'}
);
// add the maps and title to the ui.root
ui.root.widgets().reset([title, mapGrid]);
ui.root.setLayout(ui.Panel.Layout.Flow('vertical'));
// center the maps near Santa Cruz
ui.Map.Linker(maps, 'change-bounds');
//maps[0].addLayer(ls8dataset_2015_c, visParams, 'LS8-RGB-432-2014', true);
//maps[1].addLayer(ls8dataset_2019_c, visParams, 'LS8-RGB-432-2019', true);
//maps[2].addLayer(s1c, {min: [-25, -20, -25], max: [0, 10, 0]}, 'S1 Composite-2019', true);
var title_a = ui.Label('2014');
title_a.style().set('position', 'bottom-right');
maps[0].add(title_a);
var title_b = ui.Label('2019');
title_b.style().set('position', 'bottom-right');
maps[1].add(title_b);
var title_c = ui.Label('2009 & 2019');
title_c.style().set('position', 'bottom-right');
maps[2].add(title_c);
maps[0].centerObject(mab,9);