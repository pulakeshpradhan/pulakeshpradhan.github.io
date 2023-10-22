var table = ui.import && ui.import("table", "table", {
      "id": "users/AkashPandey/Shapefiles/india_administrative_state_boundary"
    }) || ee.FeatureCollection("users/AkashPandey/Shapefiles/india_administrative_state_boundary");
var Punjab_roi = table.filterMetadata("st_nm", "equals", "Punjab")
// Adapted from https://thegeoict.com/blog/2019/08/23/animation-of-the-amazon-fires-2019-using-google-earth-engine/
var firms = ee.ImageCollection('FIRMS');
 var styling2 = {color: 'blue', fillColor: '00000000'};
Map.addLayer(Punjab_roi.style(styling2),{},'Punjab')
var geometry = Punjab_roi;
Map.centerObject(geometry, 6);
firms = firms.filterBounds(geometry).filterDate('2021-10-01', '2021-11-30').sort('system:time_start', false);
var visualizeFirms = function (img) {
  return img.clip(geometry).visualize({
    bands: 'T21',
    min: 325.0,
    max: 400.0,
    palette: ['red', 'orange', 'yellow']
  }).copyProperties(img, img.propertyNames());
};
firms = firms.map(visualizeFirms).sort('system:time_start', true);
// Animation starts here
var labeltext = "Punjab residue Fire 2021";
// Animation Library taken from Gennadii's packages and modified
var pad = function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
};
var timeout = null;
var play = false;
function addAnimationControls(layers, position, timeStep, width, compact) {
  var currentIndex = 0;
  layers.map(function(l) { 
    l.setOpacity(0);
  });
  var showLayer = function (index) {
    layers[currentIndex].setOpacity(0);
    var l = layers[index];
    l.setOpacity(1);
    currentIndex = index;
    // update visibility if needed
    var shown = l.getShown();
    if(!shown) {
      l.setShown(true);
    }
    label.setValue(layers[index].getName());
  };
  var label = ui.Label('');
  function nextFrame() {
    var index = currentIndex + 1;
    if(index >= layers.length) {
      index = 0;
    }
    slider.setValue(index);
    if(play) {
      ui.util.setTimeout(nextFrame, timeStep);
    }
  }
  function onPlayPause() {
    if(!play && !timeout) {
      timeout = ui.util.setTimeout(nextFrame, timeStep);
      play = true;
      buttonPlayPause.setLabel(textPause);
    } else {
      ui.util.clearTimeout(timeout);
      timeout = null;
      play = false;
      buttonPlayPause.setLabel(textPlay);
    }
  }
  var textPlay = '▶';
  var textPause = '⏸';
  var buttonPlayPause = ui.Button(textPlay, onPlayPause);
  var slider = ui.Slider({
    min: 0,
    max: layers.length - 1,
    step: 1,
    style: {stretch: 'horizontal'}
  });
  slider.onSlide(showLayer);
  var widgets = [ui.Label(labeltext), buttonPlayPause, slider, label];
  // Create a panel that contains both the slider and the label.
  var panel = ui.Panel({
    widgets: widgets,
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {
      position: position,
      padding: '7px',
      width: width
    }
  });
  Map.add(panel);
  layers[0].setOpacity(1);
  // loop
  function delay(millis, callback) {
    var before = Date.now();
    function loop() {
      ee.Number(Date.now()).evaluate(function(now) { 
        if(now < before + millis) {
          loop();
        } else {
          callback();
        }
      });
    }
    loop();
  }
  function setTimeout(interval, action) {
    delay(interval, function() {
      action();
      setTimeout(interval, action);
    });
  }
  return panel;
}
/***
 * Animates a maxImageCount images from a given image collection, adds them as layers so that GMap caching can be used
 */
function animate(images, options) {
  var maxFrames = (options && options.maxFrames) || 30;
  var width = (options && options.width) || '600px';
  var vis = (options && options.vis) || {};
  var position = (options && options.position) || 'top-center';
  var timeStep = (options && options.timeStep) || 100;
  var preload = true;
  if(options && options.preload != 'undefined') {
    preload = options.preload;
  }
  images = ee.ImageCollection(images).toList(maxFrames, 0);
  maxFrames = images.size().min(maxFrames);
  // add loading panel
  var label = ui.Label('Loading images, please wait ....');
  var panel = ui.Panel({
    widgets: [label],
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {
      position: position,
      padding: '7px',
      width: width
    }
  });
  Map.widgets().add(panel);
  // chaining
  var s = {};
  s.panel = panel;
  var lodingPanel = panel;
  ee.List.sequence(1, maxFrames).evaluate(function(indices) {
    var layers = [];
    indices.map(function(i) {
      var image = ee.Image(images.get(i-1));
      //var name = prefix + ' ' + pad(i, 2);
      var date = ee.Date(image.get('system:time_start'));
      //var name = date.get('year').getInfo() + '-' + pad(date.get('month').getInfo(), 2) + '-' + pad(date.get('day').getInfo(), 2);
      var name = date.get('year').getInfo() + '-' + date.get('month').getInfo() + '-' + date.get('day').getInfo();
      if(options && options.clipArea) {
        image = image.clip(options.clipArea);
      }
      var visible = preload;
      if(options && options.preloadCount && i > options.preloadCount) {
        visible = false;
      }
      var layer = ui.Map.Layer(image, vis, name, visible);
      Map.layers().add(layer);
      layers.push(layer);
    });
    // remove loading panel
    Map.widgets().remove(lodingPanel);
    var panel = addAnimationControls(layers, position, timeStep, width);
    // replace panel
    s.panel = panel;
  });
  return s;
}
// Animation ends here
animate(firms, {maxFrames: 100, timeStep: 600});