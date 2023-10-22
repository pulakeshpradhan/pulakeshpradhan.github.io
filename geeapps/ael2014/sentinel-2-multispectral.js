// display multiple S2 images
var image = ee.ImageCollection('COPERNICUS/S2')
    .filterDate('2020-04-01', '2020-5-30')
    // scaling for visualization
    .map(function f(e) { return e.divide(10000); })
    .median();
// choose 4 displays, comment out the others with double slash
var MAP_PARAMS = {
  'Natural Color (B4/B3/B2)': ['B4', 'B3', 'B2'],
  'SWIR (B12/B8/B4)': ['B12', 'B8', 'B4'],
  //'Land/Water (B8/B11/B4)': ['B8', 'B11', 'B4'],
  'False Color Infrared (B8/B4/B3)': ['B8', 'B4', 'B3'],
  //'Vegetation (B12/B11/B4)': ['B12', 'B12', 'B4'],
  'False Color Urban (B12/B11/B4)' :['B12', 'B11', 'B4']
};
// Shared visualization parameters for the images.
function getVisualization(bands) {
  return {gamma: 1.3, min: 0, max: 0.3, bands: bands};
}
// Draw the maps.
var maps = [];
Object.keys(MAP_PARAMS).forEach(function(name) {
  var map = ui.Map();
  map.add(ui.Label(name));
  map.addLayer(image, getVisualization(MAP_PARAMS[name]), name);
  map.setControlVisibility(false);
  maps.push(map);
});
var linker = ui.Map.Linker(maps);
// Enable zooming on the top-left map.
maps[0].setControlVisibility({zoomControl: true});
// Show the scale (e.g. '500m') on the bottom-right map.
maps[3].setControlVisibility({scaleControl: true});
// Create a grid of maps.
var mapGrid = ui.Panel(
    [
      ui.Panel([maps[0], maps[1]], null, {stretch: 'both'}),
      ui.Panel([maps[2], maps[3]], null, {stretch: 'both'})
    ],
    ui.Panel.Layout.Flow('horizontal'), {stretch: 'both'});
// starting location and zoom level
maps[0].setCenter(16.363449, 48.210033, 12);
var title = ui.Label('Sentinel-2 Band Combinations', {
  stretch: 'horizontal',
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: '24px'
});
// Add the maps and title to the ui.root.
ui.root.widgets().reset([title, mapGrid]);
ui.root.setLayout(ui.Panel.Layout.Flow('vertical'));