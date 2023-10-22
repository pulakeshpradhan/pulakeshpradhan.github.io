Map.setCenter(-121.06154, 37.98549, 15); 
Map.setOptions('SATELLITE')
var palette1 = ['FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', 
    '99B718', '74A901', '66A000', '529400', '3E8601', '207401',
    '056201', '004C00','023B01', '012E01', '011D01', '011301'];
var min1 = 0.2; 
var max1 = 0.8; 
var startDate = ui.Textbox({value: '2019-07-05',
                            placeholder: '2019-07-05',
                            onChange: updateLayer});
var endDate   = ui.Textbox({value: '2019-07-25',
                            placeholder: '2019-07-25',
                            onChange: updateLayer});
var start = startDate.getValue();
var start = ee.Date(start);
var end = endDate.getValue();
var end = ee.Date(end);
var images = ee.ImageCollection("COPERNICUS/S2_SR")
    .filterDate(start,end)
    .sort('system:time_start', true)
    .filterBounds(Map.getCenter());
var visNDVI = {min: min1, max: max1, palette: palette1};    
var ndvi = images.map(function(image) {
  var result = image.normalizedDifference(['B8','B4']).rename("ndvi");
  return image.addBands(result).set({label: image.date().format('dd-MM-YYYY')});});
var imagesNDVI = ee.ImageCollection(ndvi).select('ndvi');
var animation = require('users/gena/packages:animation');
var headline = ui.Label('NDVI Animation');
  headline.style().set({fontSize: '18px', fontWeight: 'bold'});
var headline2 = ui.Label('Just zoom to your field and change ' +
                         'the dates and contrast and the image' +
                         ' will automatically update');
  headline2.style().set({fontSize: '14px'});
var startDateLabel = ui.Label('Set Start date');
  startDateLabel.style().set({fontSize: '14px'});
var endDateLabel =   ui.Label('Set End date');
  endDateLabel.style().set({fontSize: '14px'});
var setMin = ui.Label('Set Min NDVI Value (contrast)');
  setMin.style().set({fontSize: '14px'});
var sliderMin = ui.Slider({
  min: 0, max: 1, step: 0.05, value: 0.2,
  style: {stretch: 'horizontal', width:'235px'},
  onChange: updateLayer
});
var setMax = ui.Label('Set Max NDVI Value (contrast)');
  setMax.style().set({fontSize: '14px'});
var sliderMax = ui.Slider({
  min: 0, max: 1, step: 0.05, value: 0.8,
  style: {stretch: 'horizontal', width:'235px'},
  onChange: updateLayer
});
// var pixelValue = 0.345 // example
var pixelValueLabel = ui.Label('Click on map get NDVI value');
  pixelValueLabel.style().set({fontSize: '14px'});
var panel1 = ui.Panel({
  widgets: [headline, headline2, startDateLabel, startDate,
            endDateLabel, endDate, setMin, sliderMin, setMax,
            sliderMax,pixelValueLabel],
  layout: ui.Panel.Layout.flow('vertical'),
  style: {position: 'top-left', width: '250px'}
});
var utils = require('users/gena/packages:utils')
var text = require('users/gena/packages:text')
var timeout = null
var play = false
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
  var widgets = [ui.Label('Amazon Fire 2019'), buttonPlayPause, slider, label];
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
        // ////////////////////////////////////////////////////
        Map.onClick(function(coords) {
          var location = 'lon: ' + coords.lon.toFixed(4) + ' ' +
                         'lat: ' + coords.lat.toFixed(4);
          var click_point = ee.Geometry.Point(coords.lon, coords.lat);
          var NO2 = image.reduceRegion({
            reducer: ee.Reducer.mean(),
            geometry: click_point,
            scale: 1000
          }).get('ndvi');
         NO2.evaluate(function(val){
            // inspector.clear();
            var demText = name + '  NDVI Value : ' + val;
            panel1.widgets().set(10, ui.Label(demText));
            panel1.style().set({fontSize: '14px'});
          });
          });
        // ///////////////////////////////////////////////////
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
function updateLayer(value){
  var start = startDate.getValue();
  var start = ee.Date(start);
  var end = endDate.getValue();
  var end = ee.Date(end);
  var images = ee.ImageCollection("COPERNICUS/S2_SR")
    .filterDate(start,end)
    .sort('system:time_start', true)
    .filterBounds(Map.getCenter());
  var ndvi = images.map(function(image) {
  var result = image.normalizedDifference(['B8','B4']).rename("ndvi");
  return image.addBands(result).set({label: image.date().format('dd-MM-YYYY')});});
  var imagesNDVI = ee.ImageCollection(ndvi).select('ndvi');
  var animation = require('users/gena/packages:animation');
  var min1 = sliderMin.getValue();
  var max1 = sliderMax.getValue();
  var visNDVI = {min: min1, max: max1, palette: palette1};
  Map.clear();
  Map.setOptions('SATELLITE')
  // Map.add(panel);
  //   animation.animate(imagesNDVI, {label: 'label',maxFrames: 40, vis: visNDVI, timeStep: 500});
}
Map.add(panel1);
animate(imagesNDVI, {label: 'label', maxFrames: 40, vis: visNDVI, timeStep: 500});