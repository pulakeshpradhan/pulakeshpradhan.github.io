// Band aliases.
var BLUE = 'CMI_C01';
var RED = 'CMI_C02';
var VEGGIE = 'CMI_C03';
var GREEN = 'GREEN';
// 16 pairs of CMI and DQF followed by Bah 2018 synthetic green.
// Band numbers in the EE asset, 0-based.
var NUM_BANDS = 33;
// Skipping the interleaved DQF bands.
var BLUE_BAND_INDEX = (1 - 1) * 2;
var RED_BAND_INDEX = (2 - 1) * 2;
var VEGGIE_BAND_INDEX = (3 - 1) * 2;
var GREEN_BAND_INDEX = NUM_BANDS - 1;
// Visualization range for GOES RGB.
var GOES_MIN = 0.0;
var GOES_MAX = 0.5;  // Alternatively 1.3.
var applyScaleAndOffset = function(image) {
  image = ee.Image(image);
  var bands = new Array(NUM_BANDS);
  for (var i = 1; i < 17; i++) {
    var bandName = 'CMI_C' + (100 + i + '').slice(-2);
    var offset = ee.Number(image.get(bandName + '_offset'));
    var scale =  ee.Number(image.get(bandName + '_scale'));
    bands[(i-1) * 2] = image.select(bandName).multiply(scale).add(offset);
    var dqfName = 'DQF_C' + (100 + i + '').slice(-2);
    bands[(i-1) * 2 + 1] = image.select(dqfName);
  }
  // Bah, Gunshor, Schmit, Generation of GOES-16 True Color Imagery without a
  // Green Band, 2018. https://doi.org/10.1029/2018EA000379
  // Green = 0.45 * Red + 0.10 * NIR + 0.45 * Blue
  var green1 = bands[RED_BAND_INDEX].multiply(0.45);
  var green2 = bands[VEGGIE_BAND_INDEX].multiply(0.10);
  var green3 = bands[BLUE_BAND_INDEX].multiply(0.45);
  var green = green1.add(green2).add(green3);
  bands[GREEN_BAND_INDEX] = green.rename(GREEN);
  return ee.Image(ee.Image(bands).copyProperties(image, image.propertyNames()));
};
var g17 = ee.ImageCollection('NOAA/GOES/17/MCMIPC').filterDate('2020-09-05T18:00', '2020-09-05T23:59');
print(g17)
var collection = 'NOAA/GOES/17/MCMIPC/';
var imageName = '2020249231117700000';
var assetId = collection + imageName;
// Map.addLayer(g17);
var image_g17 = applyScaleAndOffset(assetId);
var goesRgbViz = {min:GOES_MIN, max:GOES_MAX, bands: [RED, GREEN, BLUE]};
// Map.addLayer(image, goesRgbViz);
// paneling 
// Load an image of the Santa Rosa, California 2017 fires.
var image = ee.Image('LANDSAT/LC08/C01/T1_RT_TOA/LC08_045033_20171011');
// Add a color-SWIR composite to the default Map.
Map.addLayer(image_g17, goesRgbViz);
// Make another map and add a color-NIR composite to it.
var linkedMap = ui.Map();
// linkedMap.addLayer(image, {bands: ['B5', 'B4', 'B3'], max: 0.3}, 'color-NIR');
// Add a thermal image to the map.
// linkedMap.addLayer(image, {
//   bands: ['B11'],
//   min: 290,
//   max: 310,
//   palette: ['gray', 'white', 'yellow', 'red']
// }, 'Thermal');
// Link the default Map to the other map.
var linker = ui.Map.Linker([ui.root.widgets().get(0), linkedMap]);
// Make an inset map and add it to the linked map.
var inset = ui.Map({style: {position: "bottom-right"}});
linkedMap.add(inset);
// Register a function to the linked map to update the inset map.
linkedMap.onChangeBounds(function() {
  var bounds = ee.Geometry.Rectangle(Map.getBounds());
  inset.centerObject(bounds);
  inset.layers().set(0, bounds);
});
// Create a SplitPanel which holds the linked maps side-by-side.
var splitPanel = ui.SplitPanel({
  firstPanel: linker.get(0),
  secondPanel: linker.get(1),
  orientation: 'horizontal',
  wipe: true,
  style: {stretch: 'both'}
});
// Set the SplitPanel as the only thing in root.
ui.root.widgets().reset([splitPanel]);
linkedMap.setCenter(-119.1565, 37.679, 6);