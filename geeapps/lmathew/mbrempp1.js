//Data
var mbremp = ee.FeatureCollection("users/lmathew/Seascape/mbremp");
var mbremp_grid = ee.FeatureCollection("users/lmathew/Seascape/mbremp_4326_grid");
var ls8 = ee.ImageCollection("LANDSAT/LC08/C01/T1_SR");
var s1 = ee.ImageCollection("COPERNICUS/S1_GRD");
//The MBREMP Project (A Duke-WWF Partnershps)
var AoI = mbremp.geometry().bounds(); 
var RoI = mbremp;
Map.centerObject(RoI,10);
//=====================================================================================================
//BFAST
var bfast_engine = require('users/andreim/geeMonitor:monitor.js');
var historyStart = '2014-01-01';
var historyEnd = "2017-12-31"
var monitoringStart = "2018-01-01";
var monitoringEnd = '2020-12-31';
var h = 0.25;
var hxh = h
var period = 10;
var alpha = 0.05;
var atAlpha = 1 - alpha;
var magnitudeThreshold = -0.0015
var harmonics = 1;
//var grid = ee.FeatureCollection(mbremp_grid.filter(ee.Filter.eq('name', 'A')));
//=====================================================================================================
//Process Landsat 8
var visParams = { bands: ['B4', 'B3', 'B2'], min: 0, max: 3000,  gamma: 1.4,};
//2015
var ls8dataset_2015_a = ls8.filterDate('2015-07-01', '2015-10-31');
var ls8dataset_2015_b = ls8dataset_2015_a.map(maskL8sr);
var ls8dataset_2015_c = ls8dataset_2015_b.median().clipToCollection(RoI);  //2015
//Map.addLayer(ls8dataset_2015_c, visParams, 'LS8-RGB-432-2015', false);
//2019
var ls8dataset_2019_a = ee.ImageCollection(ls8).filterDate('2020-07-01', '2020-10-31')
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
var jira1 = tupu.paint({featureCollection: AoI, color: 1, width: 3 });
var jira2 = tupu.paint({featureCollection: RoI, color: 3, width: 5 });
var jira3 = tupu.paint({featureCollection: mbremp_grid, color: 1, width: 1 });
//Map.addLayer(jira1,{},'MBREMP-Bounding Box',false);
//Map.addLayer(jira2,{},'MBREMP');
//Map.centerObject(RoI,10);
//===============================================
// create a map
var maps = [];
// define names for the band combinations
var map = ui.Map();
    //map.add(ui.Label('LS8-RGB-432-2015'));
    //map.addLayer(ls8dataset_2015_c, visParams, 'RGB-432-2015',false);
    map.addLayer(jira1,{},'MBREMP-Bounding Box',false);
    map.addLayer(jira2,{},'MBREMP');
    map.addLayer(jira3,{},'GRID(20Km x 20Km)');
    map.setControlVisibility(true);
    maps.push(map);
var map = ui.Map(); 
    //map.add(ui.Label('LS8-RGB-432-2019'));
    //map.addLayer(ls8dataset_2019_c, visParams, 'RGB-432-2019',false);
    map.addLayer(jira1,{},'MBREMP-Bounding Box',false);
    map.addLayer(jira2,{},'MBREMP');
    map.addLayer(jira3,{},'GRID(20Km x 20Km)');
    map.setControlVisibility(true);
    maps.push(map);
var map = ui.Map();
    //map.add(ui.Label('ESA-S1-RGB-VVHHVH-2019'));
    //map.addLayer(s1c, s1Vis,'S1 - 2019',false);
    map.addLayer(jira1,{},'MBREMP-Bounding Box',false);
    map.addLayer(jira2,{},'MBREMP');
    map.addLayer(jira3,{},'GRID(20Km x 20Km)');
    map.setControlVisibility(true);
    //map.setOptions(HYBRID);
    maps.push(map);
//=====================================================================================================
//=====================================================================================================
var miaka = ee.List(["A","B","C","D","E","F",]);
var chagua_mwaka = ui.Select([],'Loading...');    //Mwaka
//Mwaka
miaka.evaluate(function(mwakaa)
{
  chagua_mwaka.items().reset(mwakaa);
  chagua_mwaka.setPlaceholder('Select GRID...');
  chagua_mwaka.onChange(function(mwakaa)
  {
    var mwaka = mwakaa;
    var grid = ee.FeatureCollection(mbremp_grid.filter(ee.Filter.eq('name', mwaka)));
    var result = bfast_engine.bfastMonitor(grid,historyStart,historyEnd,monitoringStart,monitoringEnd,h,period,alpha,magnitudeThreshold,harmonics);
    var result_a = result.bfastResults;
    var listOfImages = result_a.toList(result_a.size());
    var timeCnk2 = ee.Image(listOfImages.get(1));
    var Cnk = ee.Image(listOfImages.get(2));
    maps[0].addLayer(timeCnk2.clip(grid), {min: 2016, max: 2028,'palette' : '00BFFF,CC2EFA,A901DB,6A0888,5858FA,0101DF,2E2EFE,0B0B61'}, mwaka + ' - Time of change',0);
    maps[0].addLayer(Cnk.clip(grid), {min: -1, max:0,'palette' : 'F4FA58,FFFF00,F7D358,F7D358,FFBF00,FF4000,B43104,8A0808'}, mwaka + ' - Magnitude of change',0);
    maps[1].addLayer(timeCnk2.clip(grid), {min: 2016, max: 2028,'palette' : '00BFFF,CC2EFA,A901DB,6A0888,5858FA,0101DF,2E2EFE,0B0B61'}, mwaka + ' - Time of change',0);
    maps[1].addLayer(Cnk.clip(grid), {min: -1, max:0,'palette' : 'F4FA58,FFFF00,F7D358,F7D358,FFBF00,FF4000,B43104,8A0808'}, mwaka + ' - Magnitude of change',0);
    maps[2].addLayer(timeCnk2.clip(grid), {min: 2016, max: 2028,'palette' : '00BFFF,CC2EFA,A901DB,6A0888,5858FA,0101DF,2E2EFE,0B0B61'}, mwaka + ' - Time of change',0);
    maps[2].addLayer(Cnk.clip(grid), {min: -1, max:0,'palette' : 'F4FA58,FFFF00,F7D358,F7D358,FFBF00,FF4000,B43104,8A0808'}, mwaka + ' - Magnitude of change',0);
  })
})
//var panel_mwaka = ui.Panel({ style: { width: '500px',position: 'bottom-left', padding: '5px 5px' } });
//panel_mwaka.add(chagua_mwaka);
//=====================================================================================================
//=====================================================================================================
// create a title.
var title = ui.Label('MBREMP Project 1 - Change Detection - Time & Magnitude (bfast algorithm)', {
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
maps[0].addLayer(ls8dataset_2015_c, visParams, 'LS8-RGB-432-2015', 0);
maps[1].addLayer(ls8dataset_2019_c, visParams, 'LS8-RGB-432-2019', 0);
maps[2].addLayer(s1c, {min: [-25, -20, -25], max: [0, 10, 0]}, 'S1 Composite-2019', 0);
var title_a = ui.Label('LS8-RGB-432-2015');
title_a.style().set('position', 'bottom-right');
maps[0].add(title_a);
var title_b = ui.Label('LS8-RGB-432-2019');
title_b.style().set('position', 'bottom-right');
maps[1].add(title_b);
var title_c = ui.Label('S1 Composite-2019');
title_c.style().set('position', 'bottom-right');
maps[2].add(title_c);
maps[0].centerObject(mbremp,10);
chagua_mwaka.style().set('position', 'top-left');
maps[0].add(chagua_mwaka);
//=====================================================================================================
///... Plot the fitted model and the original data at the ROI.
//print(ui.Chart.image.series(result.residuals.select(['NDMI', 'fitted']), roi)
//    .setOptions({  title: 'History Period: original and fitted values',lineWidth: 1, pointSize: 3,}));
//print (predictedValues.select(['NDMI', 'predicted']).roi, ee.Reducer.mean(), 1)
//print(ui.Chart.image.series(result.predictedValues.select(['NDMI', 'predicted']), roi)
//    .setOptions({ title: 'Monitoring Period: original and predicted values',      lineWidth: 1,   pointSize: 3,}));
//print(ui.Chart.image.series(result.mresiduals.select(['residual']), roi)
//    .setOptions({      title: 'Monitoring period:Residuals',      lineWidth: 1,      pointSize: 3,}));
//print(maps[0].drawingTools().getShown());