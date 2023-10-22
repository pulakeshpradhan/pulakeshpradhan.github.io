var l8 = ee.ImageCollection("LANDSAT/LC08/C01/T1_TOA"),
    l7 = ee.ImageCollection("LANDSAT/LE07/C01/T1_TOA"),
    l5 = ee.ImageCollection("LANDSAT/LT05/C01/T1_TOA"),
    s2 = ee.ImageCollection("COPERNICUS/S2"),
    line = /* color: #d63000 */ee.Geometry.LineString(
        [[-8.506675870631739, 13.329448439432525],
         [-8.453117521022364, 13.323435036055551]]);
Map.style().set('cursor', 'crosshair');
var panel = ui.Panel();
panel.style().set({
  width: '400px',
  position: 'bottom-right'
})
Map.add(panel)
// Create a panel and add it to the map.
var inspector = ui.Panel([ui.Label('Click left bank of river')]);
Map.add(inspector);
Map.onClick(function(coords1) {
  inspector.widgets().set(0, ui.Label({
    value: 'Click right bank of river',
    style: {color: 'gray'}
  }));
  Map.onClick(function(coords2) {
    inspector.widgets().set(0, ui.Label({
      value: 'Calculating result (do not click again)',
      style: {color: 'gray'}
    }));
  Map.style().set('cursor', 'hand');
  var P1 = ee.Geometry.Point(coords1.lon, coords1.lat);
  var P2 = ee.Geometry.Point(coords2.lon, coords2.lat);
  var lineConstructed = ee.Geometry.LineString([P1, P2])
  Map.addLayer(lineConstructed, {color: 'green'}, 'line')
  line = lineConstructed
  var select2 = ui.Select({
    items: Object.keys(years),
    onChange: wrapped
    });
    select2.setPlaceholder('choose a year');
    select2.style().set({width:'300px'})
    Map.add(select2);
  });
});
var years = {
  2018: '2018',
  2017: '2017',
  2016: '2016',
  2015: '2015',
  2014: '2014',
  2013: '2013',
  2012: '2012',
  2011: '2011',
  2010: '2010'
};
var funcYear = function(key) {
  print(years[key]);
};
//////////////////////////////////
//////// defining variables //////
//////// setting visPar //////////
//////////////////////////////////
var visParTrue = {bands: ['red', 'green', 'blue'], max:0.3};
var visParMNDWI = {bands: ['MNDWI'], min:-1, max:1, palette: ['brown', 'black', 'blue']};
var th_min = 0.05; // minimum threshold for water in MNDWI image
var th_max = 1.00; // maximum threshold for water in MNDWI image
var th_white = 0.7; // threshold for clouds in sum of red, green and blue bands
var scale = 0.5; // scale for the profiler function
/////////////////////////////////
//////// Defining functions /////
/////////////////////////////////
var utils = require('users/gena/packages:utils'); // Using Gena's functions for ... ? is this used?
var funcs = require('users/gwevanderzalm/utils:funcs'); // Using my functions
// Function to give high values to gaps in data of Landsat 7
var funcUnmask = function(img) {
  return img.unmask(100);
};
// Function by Arjen Haag, Deltares: users/arjenhaag/modules: Sentinel-2
// rescales sentinel 2 data to Landsat range
var funcRescale = function(img) {
  var t = img.select(['B1','B2','B3','B4','B5','B6','B7','B8','B8A', 'B9','B10', 'B11','B12']).divide(10000);
  t = t.addBands(img.select(['QA60']));
  var out = t.copyProperties(img).copyProperties(img,['system:time_start']).copyProperties(img,['system:footprint']);
  return ee.Image(out);
};
// function to determine MNDWI
var funcMNDWI = function(image) {
  var MNDWI = image.normalizedDifference(['green', 'swir1']).rename('MNDWI');
  return image.addBands(MNDWI);
};
// function to determine whiteness as indicator for clouds
var funcCloud = function(img) {
  var whiteness = (img.select('red')).add(img.select('green')).add(img.select('blue')).rename('whiteness');
  return img.addBands(whiteness);
};
// function to determine the threshold for water by using the Otsu algorithm
// Otsu method, scripted and published by: Nicolas Clinton
// retrieved from: https://medium.com/google-earth/otsus-method-for-image-segmentation-f5c48f405e
// date: 2018-10-04
var funcOtsu = function(img) {
  var hist = img.reduceRegion(ee.Reducer.histogram(), line);
  var th = funcs.otsu(hist.get('MNDWI'));
  var th_chosen = th.max(th_min).min(th_max);
  return img.set('threshold', th_chosen);
};
var funcMax = function(img) {
  var min = img.select('whiteness').reduceRegion(ee.Reducer.min(),line);
  return img.set('minWhiteness', min.get('whiteness'));
};
// function to determine the width of 3 classes (water, cloud and land) over the line
var funcPartsWidth = function(image) {
  var th_water = image.get('threshold');
  var profile = utils.reduceImageProfile(image, line, ee.Reducer.mean(),scale);
  var water = profile.filter(ee.Filter.gt('MNDWI', th_water)).filter(ee.Filter.lt('whiteness', 0.7));
  var clouds = profile.filter(ee.Filter.gt('whiteness', 0.7)).filter(ee.Filter.lt('whiteness', 99));
  var land = profile.filter(ee.Filter.lt('MNDWI', th_water)).filter(ee.Filter.lt('whiteness',0.7));
  var gaps = profile.filter(ee.Filter.gt('whiteness', 99))
  return image
    .set('waterWidth', water.size().multiply(scale))
    .set('cloudWidth', clouds.size().multiply(scale))
    .set('landWidth', land.size().multiply(scale))
    .set('gaps', gaps.size().multiply(scale))
    .set('missed', land.size().add(clouds.size()).add(water.size()).add(gaps.size()).subtract(profile.size()).multiply(scale));
};
var wrapped = function(key) {
  s2 = ee.ImageCollection('COPERNICUS/S2')
  var year = years[key]
  var janFirst = '-01-01'
  var decLast = '-06-30'
  var dateStart = year + janFirst;
  var dateEnd = year + decLast
  // var dateStart = '2013-01-01'
  // var dateEnd = '2013-03-31'
  var filteredl8 = l8
    .filterDate(dateStart, dateEnd)
    .filterBounds(line);
  var filteredl5 = l5
    .filterDate(dateStart, dateEnd)
    .filterBounds(line);
  var filteredl7 = l7
    .filterDate(dateStart, dateEnd)
    .filterBounds(line);
  var s2 = s2.filterDate('2015-10-01', Date.now()); // get rid of first annoying sentinel images
  var filtereds2 = s2
    .filterDate(dateStart, dateEnd)
    .filterBounds(line)
    .filter(ee.Filter.neq('PRODUCT_ID', 'S2A_MSIL1C_20170611T074611_N0205_R135_T36LUL_20170611T080121')); // buggy image
  filteredl8 = funcs.renameL8(filteredl8);
  filteredl7 = funcs.renameL7(filteredl7);
  //filteredl7 = funcs.defringe(filteredl7); //switch defringe ON here
  filteredl7 = filteredl7.map(funcUnmask)
  filteredl5 = funcs.renameL5(filteredl5);
  filtereds2 = filtereds2.map(funcRescale);
  filtereds2 = funcs.renameS2(filtereds2);
  //////////////////////////////////////
  ///// merge and apply functions //////
  //////////////////////////////////////
  var coll = filteredl8.merge(filteredl7).merge(filteredl5).merge(filtereds2);
  coll = coll.sort("system:time_start");
  coll = coll.map(funcMNDWI);
  coll = coll.map(funcCloud);
  coll = coll.map(funcMax);
  coll = coll.filterMetadata('minWhiteness', 'less_than', 99);
  coll = coll.map(funcOtsu);
  coll = coll.map(funcPartsWidth);
  var listWidthWater = coll.aggregate_array('waterWidth');
  // var listWidthLand = coll.aggregate_array('landWidth');
  // var listWidthCloud = coll.aggregate_array('cloudWidth');
  // var listWidthGaps = coll.aggregate_array('gaps');
  // var listMissed = coll.aggregate_array('missed');
  var listDates = coll.aggregate_array('system:time_start');
  // var listThWater = coll.aggregate_array('threshold');
  // var yvalues = ee.Array.cat([listWidthWater, listWidthLand, listWidthCloud], 1); // use this one for excluding gaps
  // var yvalues = ee.Array.cat([listWidthWater, listWidthLand, listWidthCloud, listWidhtGaps], 1); // use this one for including gaps
  // print('debugging: check if all zeros', listMissed);
  var chart_all = ui.Chart.array.values(listWidthWater, 0, listDates)
    .setSeriesNames(['Water']) //use this one for excluding gaps
    // .setSeriesNames(['Water', 'Land', 'Clouds', Gaps]) // use this one for including gaps
    .setOptions({
      title: 'Water widths (Otsu threshold)',
      vAxis: {title: 'Widths'},
      hAxis: {title: 'Date'},
  });
  // print(chart_all);
  panel.clear()
  panel.add(chart_all)
}