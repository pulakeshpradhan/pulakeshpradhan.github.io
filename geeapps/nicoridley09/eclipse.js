/**
 * Animates GOES East with an orthographic projection.
 */
// Import the "earth" module.
var earth = require('users/gena/packages:earth');
// Band names.
var BLUE = 'CMI_C01';
var RED = 'CMI_C02';
var VEGGIE = 'CMI_C03';
var GREEN = 'GREEN';
/**
 * Properly scales an MCMIPM image.
 *
 * @param {ee.Image} image An unaltered MCMIPM image.
 * @return {ee.Image}
 */
var applyScaleAndOffset = function(image) {
  var names = image.select('CMI_C..').bandNames();
  // Scale the radiance bands using the image's metadata.
  var scales = names.map(function(name) {
    return image.getNumber(ee.String(name).cat('_scale'));
  });
  var offsets = names.map(function(name) {
    return image.getNumber(ee.String(name).cat('_offset'));
  });
  var scaled = image.select('CMI_C..')
                   .multiply(ee.Image.constant(scales))
                   .add(ee.Image.constant(offsets));
  return image.addBands({srcImg: scaled, overwrite: true});
};
/**
 * Computes and adds a green radiance band to a MCMIPM image.
 *
 * The image must already have been properly scaled via applyScaleAndOffset.
 *
 * For more information on computing the green band, see:
 *   https://doi.org/10.1029/2018EA000379
 *
 * @param {ee.Image} image An image to add a green radiance band to. It
 *     must be the result of the applyScaleAndOffset function.
 * @return {ee.Image}
 */
var addGreenBand = function(image) {
  function toBandExpression(bandName) { return 'b(\'' + bandName + '\')'; }
  var B_BLUE = toBandExpression(BLUE);
  var B_RED = toBandExpression(RED);
  var B_VEGGIE = toBandExpression(VEGGIE);
  // Green = 0.45 * Red + 0.10 * NIR + 0.45 * Blue
  var GREEN_EXPR = GREEN + ' = 0.45 * ' + B_RED + ' + 0.10 * ' + B_VEGGIE +
      ' + 0.45 * ' + B_BLUE;
  var green = image.expression(GREEN_EXPR).select(GREEN);
  return image.addBands(green);
};
// Get the collection, scale, and add green band.
var col = ee.ImageCollection('NOAA/GOES/16/MCMIPF')
  .filterDate('2020-12-14T15:00', '2020-12-14T22:00')
  .map(applyScaleAndOffset)
  .map(addGreenBand);
// Get orthographic images.
var LON = -65.2;
var LAT = -35;
var SCALE = 2000;
var ZOOM = 3; // 1: earth zoom level
var earthCol = col.map(function(i) {
  return earth.getEarthImage(i, LON, LAT, SCALE, ZOOM);
});
// Visualization params.
var GOES_RGB_VIS = {
  bands: [RED, GREEN, BLUE],
  min: 0,
  max: 0.38,
  gamma: 1.3,
};
// Animate the time series as a GIF.
GOES_RGB_VIS['framesPerSecond'] = 7;
GOES_RGB_VIS['region'] = ee.Geometry.Rectangle(-61, -31, 61, 31);
GOES_RGB_VIS['dimensions'] = 700;
var gif = ui.Thumbnail(earthCol, GOES_RGB_VIS);
print(gif);