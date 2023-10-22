var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -127.93304168471651,
                46.20535153365748
              ],
              [
                -127.93304168471651,
                32.43891186627092
              ],
              [
                -114.41985809096654,
                32.43891186627092
              ],
              [
                -114.41985809096654,
                46.20535153365748
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
      "color": "#98ff00",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #98ff00 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[-127.93304168471651, 46.20535153365748],
          [-127.93304168471651, 32.43891186627092],
          [-114.41985809096654, 32.43891186627092],
          [-114.41985809096654, 46.20535153365748]]], null, false),
    states = ui.import && ui.import("states", "table", {
      "id": "TIGER/2018/States"
    }) || ee.FeatureCollection("TIGER/2018/States");
/**
 * @license
 * Copyright 2020 Google LLC.
 * SPDX-License-Identifier: Apache-2.0
 * 
 * @description
 * Generate a GOES-17 time-lapse video of cumulative fire pixels (yellow),
 * active fires pixels (orange), and smoke. Note that there is a limitation
 * on the total number of pixels composing an animation; adjust observation
 * duration, max video dimension, and geometry region as necessary to meet
 * size constraint.
 */
 Map.centerObject(geometry)
// #############################################################################
// ### USER INPUTS ###
// #############################################################################
// Define observation start and end time. 
var END_TIME = ee.Date(new Date())
var START_TIME = END_TIME.advance(-0.125, 'day')
var TIME_ZONE = 'America/Los_Angeles';
// Add outline.
var OUTLINE = states;
// Define video parameters.
var VID_PARAMS = {
  dimensions: 475, // Max dim.
  region: geometry,  // Edit geometry import using Code Editor drawing tools.
  framesPerSecond: 15,
  crs: ee.ImageCollection('NOAA/GOES/16/MCMIPF').first().projection(),
};
// #############################################################################
var proj = ee.ImageCollection('NOAA/GOES/16/MCMIPF').first().projection();
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
// Visualization params.
var GOES_RGB_VIS = {
  bands: [RED, GREEN, BLUE],
  min: 0.05,
  max: [0.4, 0.4, 0.43],
  gamma: 1.2,
};
// Function to scale the imagery and get green vis band.
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
// Paint state features to an image.
var outlineVis = ee.Image().byte()
  .paint({featureCollection: OUTLINE, color: 1, width: 1})
  .visualize({palette: 'FFFFFF', opacity: 0.5});
// Function to make cumulative fire image.
var cumulativeFire = function(currentTime) {
  var imgs = fire.filterDate(ee.Date(START_TIME, TIME_ZONE), currentTime)
    .map(function(img) {
      return img.select('DQF').eq(0).selfMask();
    });
  return imgs.mosaic().visualize({palette: 'yellow', opacity: 0.6});
};
function getDOS(i) {
  var dark = i.select([RED, GREEN, BLUE]).reduceRegion({
    reducer: ee.Reducer.min(), 
    geometry: Map.getBounds(true), 
    scale: Map.getScale() * 5
  })
  return i.select([RED, GREEN, BLUE])
    .subtract(ee.Image.constant([
      dark.get(RED),
      dark.get(GREEN),
      dark.get(BLUE)
    ]))
}
// Function to overlay the state line image.
var applyVis = function(image) {
  // Fire visualization.
  var endDate = image.date().advance(30, 'second');
  var startDate = endDate.advance(-5, 'hour');
  var fireImg = fire.filterDate(startDate, endDate)
    .sort('system:time_start', false).first();
  var currentFireVis = fireImg.select('DQF').eq(0).selfMask()
    .visualize({palette: 'red', opacity: 0.4});
  var cumulativeFireVis = cumulativeFire(endDate);
  // image = getDOS(image.resample('bicubic'))
  // Put it all together.
  return image
    // .reproject({crs: proj, scale: 3000})
    .visualize(GOES_RGB_VIS)
    // .blend(cumulativeFireVis)
    .blend(currentFireVis)
    // .blend(outlineVis)
    .set('system:time_start', image.get('system:time_start'))
    .set('label', image.date().format('YYYY-MM-dd HH:mm', TIME_ZONE).cat(' PDT'))
};
// Get collections.
var vis = ee.ImageCollection('NOAA/GOES/16/MCMIPF')
  .filterDate(ee.Date(START_TIME, TIME_ZONE), ee.Date(END_TIME, TIME_ZONE)); 
var fire = ee.ImageCollection('NOAA/GOES/16/FDCF');
// Assemble the visualization collection.
var col = vis
  .map(applyScaleAndOffset)
col = col  
  .map(applyVis)
  .sort('system:time_start');
// Render the video.
print('N Frames:', col.size());
// print(ui.Thumbnail(col, VID_PARAMS));
var a = require('users/gena/packages:animation')
a.animate(col, {
  // compact: true,
  maxFrames: col.size(),
  label: 'label',
  // preload: false,
  // preloadCount: 5
})