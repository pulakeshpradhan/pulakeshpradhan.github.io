var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                33.73554687499998,
                20.456301231386895
              ],
              [
                33.73554687499998,
                -3.701517371446643
              ],
              [
                62.29999999999998,
                -3.701517371446643
              ],
              [
                62.29999999999998,
                20.456301231386895
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [
        {
          "type": "rectangle"
        }
      ],
      "properties": {},
      "color": "#b0d6d3",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || 
    /* color: #b0d6d3 */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[33.73554687499998, 20.456301231386895],
          [33.73554687499998, -3.701517371446643],
          [62.29999999999998, -3.701517371446643],
          [62.29999999999998, 20.456301231386895]]], null, false),
    geometry2 = ui.import && ui.import("geometry2", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#000000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #000000 */ee.Geometry.MultiPoint();
Map.setControlVisibility({
  all: false, 
  layerList: false,
  zoomControl: false,
  scaleControl: true,
  mapTypeControl: false,
  fullscreenControl: false,
  drawingToolsControl: false
})
var tools = Map.drawingTools()
var layers = tools.layers()
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
// Visualization params.
var visParams = {
  bands: [RED, GREEN, BLUE],
  min: 0.025,
  max: 0.85,
  gamma: 1.4,
};
// Map.addLayer(ee.Image(1), { palette: ['black'] }, 'black')
Map.setCenter(20, 0, 3)
// Map.setLocked(true)
// var a = require('users/gena/packages:animation')
// a.animate(earthCol, { vis: GOES_RGB_VIS, maxFrames: 150 })
// Video parameters.
var vidParams = {
  dimensions: 640, // Max dim.
  region: geometry,  // Edit geometry import using Code Editor drawing tools.
  framesPerSecond: 12,
  crs: 'EPSG:3857',
  bands: [RED, GREEN, BLUE],
  min: 0.025,
  max: 0.85,
  gamma: 1.4,
};
var start = ee.Date(Date.now()).advance(-10 * 40, 'minute').format().getInfo()
var stop = ee.Date(Date.now()).format().getInfo()
start = start.slice(0, start.length-4) + '0'
stop = stop.slice(0, stop.length-4) + '0'
var textStart = ui.Textbox(start, start)
var textStop = ui.Textbox(stop, stop)
var textSizeGif = ui.Textbox(640, 640)
textSizeGif.onChange(function(value) {
  vidParams.dimensions = value  
})
// Get orthographic images.
var LON = -75.2;
var LAT = 0;
var SCALE = 19567.87924100512 / 8;
var ZOOM = 1.2; // earth zoom level
var maxCount = 120
function getImages(multiplier, limit) {
  start = textStart.getValue()
  stop = textStop.getValue()
  if(limit == 1) {
    stop = ee.Date(start).advance(20, 'minute')
  }
  var images = ee.ImageCollection('NOAA/GOES/16/MCMIPF')
    .filterDate(start, stop)
    .limit(limit)
    .map(applyScaleAndOffset)
    .map(addGreenBand);
  var images = images.map(function(i) {
    return earth.getEarthImage(i, LON, LAT, SCALE * multiplier, ZOOM);
  });
  return images
}
var images = getImages(6, 1)
var layerImageCoarse = ui.Map.Layer(images.first(), visParams, 'image')
Map.layers().add(layerImageCoarse)
Map.onChangeZoom(function(z) {
  images = getImages(13 / z, 1)
  layerImageCoarse.setEeObject(images.first(), visParams, 'image')
})
var gif = null
function updateGif(shape) {
  geometry = shape
  if(gif) {
    Map.remove(gif)
  }
  var coords = ee.List(shape.coordinates().get(0))
  var ll = ee.List(coords.get(0))
  var ur = ee.List(coords.get(2))
  var size = ee.Number(ur.get(0)).subtract(ll.get(0)).max(ee.Number(ur.get(1)).subtract(ll.get(1)))
  var zoom = size.divide(14).getInfo()
  var images = getImages(zoom, maxCount)
  images.size().evaluate(function(v) {
    textCount.setValue(v)
  })
  vidParams.region = shape
  gif = ui.Thumbnail(images, vidParams)
  gif.style().set({ position: 'bottom-right'})
  Map.add(gif);
}
updateGif(geometry)
tools.onEdit(ui.util.debounce(updateGif, 500))
function refreshMap() {
  var images = getImages(13 / Map.getZoom(), 1)
  layerImageCoarse.setEeObject(images.first())
}
textStart.onChange(refreshMap)
function updateCount() {
  var steps = ee.Date(textStop.getValue()).difference(ee.Date(textStart.getValue()), 'minute').divide(10).int()
  steps.evaluate(function(v) {
    textCount.setValue(v)
  })
}
var buttonUpdate = ui.Button('Update Animation')
buttonUpdate.onClick(function() {
  updateGif(geometry)
})
var textCount = ui.Label('...')
var panelSize = ui.Panel([ ui.Label('Count: '), textCount ], ui.Panel.Layout.flow('horizontal'))
var panelSizeGif = ui.Panel([ ui.Label('Size: '), textSizeGif ], ui.Panel.Layout.flow('horizontal'))
var panel = ui.Panel([
  textStart,
  textStop,
  panelSizeGif,
  panelSize,
  // panelMaxFrames,
  buttonUpdate
])
panel.style().set({ position: 'top-right' })
Map.add(panel)
Map.setOptions('SATELLITE')
// Map.setOptions('Dark', { Dark: [
//     {
//         "featureType": "land",
//         "stylers": [
//             {
//                 "visibility": "on"
//             },
//             {
//                 "lightness": -90
//             }
//         ]
//     },
//     {
//         "featureType": "water",
//         "stylers": [
//             {
//                 "visibility": "on"
//             },
//             {
//                 "lightness": -100
//             }
//         ]
//     }
// ]})