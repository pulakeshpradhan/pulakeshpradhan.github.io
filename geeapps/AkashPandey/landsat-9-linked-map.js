var table = ui.import && ui.import("table", "table", {
      "id": "users/AkashPandey/Shapefiles/india_administrative_state_boundary"
    }) || ee.FeatureCollection("users/AkashPandey/Shapefiles/india_administrative_state_boundary");
var punjab = table.filterMetadata('st_nm', "equals", "Punjab")
// display multiple S2 images
var collection = ee.ImageCollection('LANDSAT/LC09/C02/T1_L2')
print(collection.size().getInfo())
var median = collection.median()
function apply_scale_factors(image) {
    var opticalBands = image.select('SR_B.').multiply(0.0000275).add(-0.2)
    var thermalBands = image.select('ST_B.*').multiply(0.00341802).add(149.0)
    return image.addBands(opticalBands).addBands(thermalBands)}
var dataset = apply_scale_factors(median).clip(punjab)
// choose 4 displays, comment out the others with double slash
var MAP_PARAMS = {
  'Natural Color (B4/B3/B2)': ['SR_B4', 'SR_B3', 'SR_B2'],
  'SWIR (B7/B6/B4)': ['SR_B7', 'SR_B6', 'SR_B4'],
  //'Land/Water (B8/B11/B4)': ['B8', 'B11', 'B4'],
  'False Color Infrared (B5/B4/B3)': ['SR_B5', 'SR_B4', 'SR_B3'],
  //'Vegetation (B12/B11/B4)': ['B12', 'B12', 'B4'],
  'Agriculture (B6/B5/B2)' :['SR_B6', 'SR_B5', 'SR_B2']
};
// Shared visualization parameters for the images.
function getVisualization(bands) {
  return {gamma: 1.3, min: 8200, max: 16500, bands: bands};
}
// Draw the maps.
var maps = [];
Object.keys(MAP_PARAMS).forEach(function(name) {
  var map = ui.Map();
  map.add(ui.Label(name));
  map.addLayer(dataset, getVisualization(MAP_PARAMS[name]), name);
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
maps[0].setCenter(75.8425, 30.9043, 8);
var title = ui.Label('Landsat-9 Band Combinations', {
  stretch: 'horizontal',
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: '24px'
});
// Add the maps and title to the ui.root.
ui.root.widgets().reset([title, mapGrid]);
ui.root.setLayout(ui.Panel.Layout.Flow('vertical'));