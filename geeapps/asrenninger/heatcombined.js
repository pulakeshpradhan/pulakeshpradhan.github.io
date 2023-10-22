// Mask clouds
function maskL8sr(image) {
  var cloudShadowBitMask = (1 << 3);
  var cloudsBitMask = (1 << 5);
  var qa = image.select('pixel_qa');
  var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
                 .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
  return image.updateMask(mask);
}
// Import states and counties
var states = ee.FeatureCollection("TIGER/2016/States");
var counties = ee.FeatureCollection("TIGER/2016/Counties");
//
var filter = states.filter(ee.Filter.eq('NAME',"Pennsylvania"));
var county = counties.filterBounds(filter).filter(ee.Filter.eq('NAME',"Philadelphia"));
// Import L8 data
var dataset = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
                  .filterDate('2016-01-01', '2016-12-31')
                  .map(maskL8sr)
//
var palettes = require('users/gena/packages:palettes');
var built = palettes.kovesi.diverging_linear_bjy_30_90_c45[7];
var green = palettes.kovesi.linear_green_5_95_c69[7];
var water = palettes.kovesi.linear_blue_5_95_c73[7];
//
var addNDBI = function(image) {
  var ndbi = image.normalizedDifference(['B6', 'B5']).rename('NDBI');
  return image.addBands(ndbi);
};
var addNDVI = function(image) {
  var ndvi = image.normalizedDifference(['B5', 'B4']).rename('NDVI');
  return image.addBands(ndvi);
};
var addNDWI = function(image) {
  var ndwi = image.normalizedDifference(['B3', 'B5']).rename('NDWI');
  return image.addBands(ndwi);
};
//
var ndbi    = dataset.map(addNDBI);
var ndbiest = ndbi.qualityMosaic('NDBI').select('NDBI').visualize({min: -0.5, max: 0.5, palette: built});
var ndvi    = dataset.map(addNDVI);
var ndviest = ndvi.qualityMosaic('NDVI').select('NDVI').visualize({min: -1, max: 1, palette: green});
var ndwi    = dataset.map(addNDWI);
var ndwiest = ndwi.qualityMosaic('NDWI').select('NDWI').visualize({min: -1, max: 1, palette: water});
//
var cloudy = ee.ImageCollection("LANDSAT/LC08/C01/T1_TOA")
                  .filterDate('2010-01-01', '2018-12-31')
var blurry   = cloudy.filter(ee.Filter.lt('CLOUD_COVER', 1));
var cleanest = blurry.mosaic()
// 
// Convert the RGB bands to the HSV color space.
var hsv = cleanest.select(['B4', 'B3', 'B2']).rgbToHsv();
// Swap in the panchromatic band and convert back to RGB.
var sharpest = ee.Image.cat([
  hsv.select('hue'), hsv.select('saturation'), cleanest.select('B8')
  ])
  .hsvToRgb()
  .visualize({min: 0, max: 0.25, gamma: [1.3, 1.3, 1.3]});
//
var addHeat = function(image){
  var heat = image.select(['B10']).multiply(0.1).subtract(273.5).rename('HEAT');
  return image.addBands(heat);
}
var temp    = dataset.map(addHeat)
// Visualize
var heat = palettes.kovesi.diverging_rainbow_bgymr_45_85_c67[7]
//
var hottest = temp.qualityMosaic('HEAT').select('HEAT').visualize({min: 18, max: 45, palette: heat});
//
var images = {
  'temperature': hottest,
  'reality': sharpest,
  'natural': ndviest,
  'built': ndbiest,
  'water': ndwiest,
};
var leftMap = ui.Map();
leftMap.setControlVisibility(false);
var leftSelector = addLayerSelector(leftMap, 0, 'top-left');
var leftPanel = ui.Panel();
leftPanel.style().set({
  width: '400px',
  position: 'bottom-right'
});
var leftIntro = ui.Panel([
  ui.Label({
    value: 'Click to explore',
    style: {fontSize: '14px', fontWeight: 'bold'}
  })
]);
leftMap.add(leftPanel);
leftPanel.add(leftIntro)
leftMap.style().set('cursor', 'crosshair');
leftMap.onClick(function(coords) {
  leftPanel.clear();
  var point = ee.FeatureCollection([
    ee.Feature(  
      ee.Geometry.Point(coords.lon, coords.lat).buffer(10000), {label: 'Area Average'}),
    ee.Feature(  
      ee.Geometry.Point(coords.lon, coords.lat), {label: 'Selected Zone'})
    ]);
  var chart = ui.Chart.image.seriesByRegion(
    temp, point, ee.Reducer.mean(), 'HEAT', 200, 'system:time_start', 'label')
        .setChartType('LineChart')
        .setOptions({
          title: 'Temperature over time',
          vAxis: {title: 'Temperature (Celcius)'},
          series: {
            0: {color: 'FD92FA'},
            1: {color: '0035F9'}
          }});
  leftPanel.add(chart);
});
// Create the right map, and have it display layer 1.
var rightMap = ui.Map();
rightMap.setControlVisibility(false);
var rightSelector = addLayerSelector(rightMap, 1, 'top-right');
var rightPanel = ui.Panel();
rightPanel.style().set({
  width: '400px',
  position: 'bottom-left'
});
var rightIntro = ui.Panel([
  ui.Label({
    value: 'Click to explore',
    style: {fontSize: '14px', fontWeight: 'bold'}
  })
]);
rightMap.add(rightPanel);
rightPanel.add(rightIntro)
leftMap.onClick(function(coords) {
  rightPanel.clear();
  var point = ee.FeatureCollection([
    ee.Feature(  
      ee.Geometry.Point(coords.lon, coords.lat).buffer(10000), {label: 'Area Average'}),
    ee.Feature(  
      ee.Geometry.Point(coords.lon, coords.lat), {label: 'Selected Zone'})
    ]);
  var chart = ui.Chart.image.seriesByRegion(
    ndvi, point, ee.Reducer.mean(), 'NDVI', 200, 'system:time_start', 'label')
        .setChartType('LineChart')
        .setOptions({
          title: 'Vegetation over time',
          vAxis: {title: 'Vegetation (Normalized)'},
          series: {
            0: {color: '093805'},
            1: {color: '35E415'}
          }});
  rightPanel.add(chart);
});
// Adds a layer selection widget to the given map, to allow users to change
// which image is displayed in the associated map.
function addLayerSelector(mapToChange, defaultValue, position) {
  var label = ui.Label('Choose an image to visualize');
  // This function changes the given map to show the selected image.
  function updateMap(selection) {
    mapToChange.layers().set(0, ui.Map.Layer(images[selection]));
  }
  // Configure a selection dropdown to allow the user to choose between images,
  // and set the map to update when a user makes a selection.
  var select = ui.Select({items: Object.keys(images), onChange: updateMap});
  select.setValue(Object.keys(images)[defaultValue], true);
  var controlPanel =
      ui.Panel({widgets: [label, select], style: {position: position}});
  mapToChange.add(controlPanel);
}
// Create a SplitPanel to hold the adjacent, linked maps.
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  wipe: true,
  style: {stretch: 'both'}
});
// Set the SplitPanel as the only thing in the UI root.
ui.root.widgets().reset([splitPanel]);
var linker = ui.Map.Linker([leftMap, rightMap]);
leftMap.centerObject(county);