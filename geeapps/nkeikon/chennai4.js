// Display a grid of linked maps, each with a different visualization.
print(ui.Map({
  lon: 80.17673700780233,
  lat: 13.161630234009174,
  zoom: 13
}));
/*
 * Image setup
 */
// Create an initial mosiac, which we'll visualize in a few different ways.
var collection = ee.ImageCollection('COPERNICUS/S2').filterBounds(ee.Geometry.Point([80.17673700780233,13.161630234009174])).sort('CLOUDY_PIXEL_PERCENTAGE',false);
var RGB = (['B4','B3','B2']);
var addTimeSeries = collection.map(function(image){
  var s22016 = collection.filterDate('2016-06-01', '2016-06-30').mosaic().select(RGB).rename(['B4_16','B3_16','B2_16']);
  var s22017 = collection.filterDate('2017-05-01', '2017-05-30').mosaic().select(RGB).rename(['B4_17','B3_17','B2_17']);
  var s22018 = collection.filterDate('2018-06-01', '2018-06-30').mosaic().select(RGB).rename(['B4_18','B3_18','B2_18']);
  var s22019 = collection.filterDate('2019-06-01', '2019-06-30').mosaic().select(RGB).rename(['B4_19','B3_19','B2_19']);
  return image.addBands(s22018).addBands(s22019).addBands(s22016).addBands(s22017);
});
var years = ee.List.sequence(2016, 2019)
var collectYear = ee.ImageCollection(years
  .map(function(y) {
    var start = ee.Date.fromYMD(y, 5, 1);
    var end = start.advance(60, 'day');
    return collection.filterDate(start, end).mosaic().select(['B4','B3','B2']);
}));
print(collectYear)
var image2016 = collectYear.first();
print(image2016)
// Each map has a name and some visualization parameters.
var MAP_PARAMS = {
  'June 2016': ['B4_16','B3_16','B2_16'],
  'May 2017': ['B4_17','B3_17','B2_17'],
  'June 2018': ['B4_18','B3_18','B2_18'],
  'June 2019': ['B4_19','B3_19','B2_19'],
};
// Shared visualization parameters for the images.
function getVisualization(bands) {
  return {gamma:0.95, min: 1000, max: 2500, bands: bands};
}
/*
 * Configure maps, link them in a grid
 */
// Create a map for each visualization option.
var maps = [];
Object.keys(MAP_PARAMS).forEach(function(name) {
  var map = ui.Map();
  map.add(ui.Label(name));
  map.addLayer(addTimeSeries, getVisualization(MAP_PARAMS[name]), name);
  map.setControlVisibility(false);
  maps.push(map);
});
var linker = ui.Map.Linker(maps);
// Enable zooming on the top-left map.
maps[0].setControlVisibility({zoomControl: true});
// Show the scale (e.g. '500m') on the bottom-right map.
maps[1].setControlVisibility({scaleControl: true});
// Create a grid of maps.
var mapGrid = ui.Panel(
    [
      ui.Panel([maps[0]], null, {stretch: 'both'}),
      ui.Panel([maps[1]], null, {stretch: 'both'}),
      ui.Panel([maps[2]], null, {stretch: 'both'}),
      ui.Panel([maps[3]], null, {stretch: 'both'})
    ],
    ui.Panel.Layout.Flow('horizontal'), {stretch: 'both'});
// Center the map at an interesting spot in Greece. All
// other maps will align themselves to this parent map.
maps[0].setCenter(80.17673700780233,13.161630234009174, 13);
/*
 * Add a title and initialize
 */
// Create a title.
var title = ui.Label('Puzhal Lake, Chennai', {
  stretch: 'horizontal',
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: '24px'
});
// Add the maps and title to the ui.root.
ui.root.widgets().reset([title, mapGrid]);
ui.root.setLayout(ui.Panel.Layout.Flow('vertical'));
var addNDWI = collection.map(function(image) {
  var ndwi = image.normalizedDifference(['B8', 'B11']).rename('NDWI');
  return image.addBands(ndwi);
});
var addTimeSeries = addNDWI.map(function(image){
  var NDWI2018 = addNDWI.select('NDWI').filterDate('2018-06-01', '2018-06-30').median().rename('2018');
  var NDWI2019 = addNDWI.select('NDWI').filterDate('2019-06-01', '2019-06-30').median().rename('2019');
  return image.addBands(NDWI2018).addBands(NDWI2019);
});