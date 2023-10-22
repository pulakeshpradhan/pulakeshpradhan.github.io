var imageCollection = ee.ImageCollection("JRC/GHSL/P2016/BUILT_LDS_GLOBE_V1"),
    lights = ee.ImageCollection("NOAA/DMSP-OLS/CALIBRATED_LIGHTS_V4");
// print(Map.getCenter())
// print(Map.getZoom())
var image = ee.Image('JRC/GHSL/P2016/BUILT_LDSMT_GLOBE_V1').resample('bilinear')
function createDarkLayer(opacity) {
  return ui.Map.Layer(ee.Image(1), {palette: ['000000']}, 'black', true, opacity)
}
// Map.addLayer(darkLayer)
var urban = imageCollection.map(function(i) { return i.resample('bilinear') }).mean()
var urban = urban.mask(urban.gt(1).multiply(urban.divide(2))).visualize({min: 0, max: 100, palette: 
//["8e0152","c51b7d","de77ae","f1b6da","fde0ef","f7f7f7","e6f5d0","b8e186","7fbc41","4d9221","276419"].reverse()
// ["7f3b08","b35806","e08214","fdb863","fee0b6","f7f7f7","d8daeb","b2abd2","8073ac","542788","2d004b"].reverse()  
["67001f","b2182b","d6604d","f4a582","fddbc7","ffffff","e0e0e0","bababa","878787","4d4d4d"].reverse()
})
function createUrbanLayer() {
  var black = ee.Image(1).visualize({palette: ['000000'], opacity: 0.5})
  var image = ee.ImageCollection.fromImages([black, urban]).mosaic()
  var urbanLayer = ui.Map.Layer(image, {}, 'urban areas')
  return urbanLayer
}
//Map.layers().add(urbanLayer)
var paletteLights = ['f03b20', 'ffff55', 'ffffb2', 'ffffee']
// var l = lights.select('avg_vis').filterDate('2010-01-01', '2011-01-01')
//   .map(function(i) { return i.resample('bilinear')}).reduce(ee.Reducer.percentile([65]))
// var lightsLayer = ui.Map.Layer(l.mask(l.divide(10)), {min: 0, max: 15, palette: paletteLights}, 'lights', true, 0.8)  
function createLightsImage(startYear, stopYear) {
  var l = ee.ImageCollection('NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG').select('avg_rad')
    .filterDate(ee.Date.fromYMD(startYear, 1, 1), ee.Date.fromYMD(stopYear, 1, 1))
    .map(function(i) { return i.resample('bilinear')})
    .mean()
  var l = l
    .where(l.lte(0), 0)
  l = l
     .mask(l.multiply(0.35))
  l = l
      .visualize({
          min: 0,
          max: 15,
          palette: paletteLights
        })
  var black = ee.Image(1).visualize({palette: ['000000'], opacity: 0.75})
  var image = ee.ImageCollection.fromImages([black, urban, l]).mosaic()
  return image.set({label: ee.Number(startYear).format('%d') })
}
function createLightsLayer() {
  var image = createLightsImage(2017, 2018)
  var lightsLayer = ui.Map.Layer(image, {}, 'lights', true)
  return lightsLayer
}
//Map.layers().add(lightsLayer)
Map.setOptions('SATELLITE')
// Map.onChangeZoom(function(zoom) {
//   if(zoom > 6) {
//     lightsLayer.setOpacity(0.5)
//   }
//   if(zoom === 6 && lightsLayer.getOpacity() === 0.5) {
//     lightsLayer.setOpacity(0.8)
//   }
// })
Map.setCenter(17.89, 9.96, 3)
var map1 = ui.Map()
map1.setCenter(17.89, 9.96, 3)
map1.setOptions('SATELLITE')
//map1.layers().add(createDarkLayer(0.4))
map1.layers().add(createUrbanLayer())
var map2 = ui.Map()
map2.setOptions('SATELLITE')
map2.setCenter(17.89, 9.96, 3)
// map2.layers().add(createDarkLayer(0.9))
// map2.layers().add(createUrbanLayer())
//map2.layers().add(createLightsLayer())
var linker = ui.Map.Linker([map1, map2]);
var firstPanel = ui.Panel([map1], null, {stretch: 'both'})
var secondPanel = ui.Panel([map2], null, {stretch: 'both'})
var split = ui.SplitPanel(firstPanel, secondPanel, 'horizontal', true)
//Map.widgets().add(firstPanel)
ui.root.widgets().reset([split]);
ui.root.setLayout(ui.Panel.Layout.Flow('vertical'));
//Map.widgets().add()
var start = 2013
var stop = 2017
var lights = ee.List.sequence(start, stop).map(function(year) {
  return createLightsImage(year, ee.Number(year).add(1))
})
var lights = ee.ImageCollection(lights)
animate(lights)
// animation
function addAnimationControls(layers, opacity, position) {
  var currentIndex = 0
  layers.map(function(l) { 
    l.setOpacity(0) 
  })
  var showLayer = function(index) {
    index = index - start
    layers[currentIndex].setOpacity(0)
    var l = layers[index]
    l.setOpacity(opacity)
    currentIndex = index
    // update visibility if needed
    var shown = l.getShown()
    if(!shown) {
      l.setShown(true) 
    }
    // label.setValue(layers[index].getName())
  };
  var label = ui.Label('');
  function onHideLayers() {
    layers.map(function(l) {
      l.setShown(false)
    })
  }
  function onTranparentLayers() {
    layers.map(function(l) {
      l.setOpacity(0)
    })
  }
  function nextFrame() { 
    var index = currentIndex + 1
    if(index >= layers.length) {
      index = 0
    }
    slider.setValue(start + index)
    if(play) {
      ui.util.setTimeout(nextFrame, 250)
    }
  }
  function onPlayPause() {
    if(!play && !timeout) {
      timeout = ui.util.setTimeout(nextFrame, 250)
      play = true
      buttonPlayPause.setLabel(textPause)
    } else {
      ui.util.clearTimeout(timeout)
      timeout = null
      play = false
      buttonPlayPause.setLabel(textPlay)
    }
  }
  map2.onChangeZoom(function() {
    if(play) {
      onPlayPause()
    }
    slider.setValue(start)
  })
  var buttonHideLayers = ui.Button('Hide', onHideLayers)
  var textPlay = '▶'
  var textPause = '⏸'
  var buttonPlayPause = ui.Button(textPlay, onPlayPause)
  var buttonTransparentLayers = ui.Button('Transparent', onTranparentLayers)
  var slider = ui.Slider({
    min: start,
    max: stop,
    step: 1,
    style: {stretch: 'horizontal'}
  });
  slider.onSlide(showLayer)
  var sliderOpacity = ui.Slider({
    min:0, max: opacity, step: 0.1
  })
  sliderOpacity.onSlide(function(o) {
    layers[currentIndex].setOpacity(o)
    opacity = o
  })
  sliderOpacity.setValue(opacity)
  // Create a panel that contains both the slider and the label.
  var panel = ui.Panel({
    widgets: [slider, /*label, sliderOpacity, buttonHideLayers */ buttonPlayPause],
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {
      position: 'bottom-right',
      padding: '7px',
      width: '300px'
    }
  });
  map2.add(panel)
  layers[0].setOpacity(1)
}
var timeout = null
var play = false
/***
 * Animates a maxImageCount images from a given image collection, adds them as layers so that GMap caching can be used
 */
function animate(images, options) {
  var maxFrames = (options && options.maxFrames) || 30
  var label = (options && options.label) || null
  var vis = (options && options.vis) || {}
  var opacity = (options && options.opacity) || 1.0
  var position = (options && options.position) || 'top-center'
  var prefix = (options && options.prefix) || ''
  var preload = true
  if(options && options.preload != 'undefined') {
    preload = options.preload
  }
  images = ee.ImageCollection(images).toList(maxFrames, 0)
  maxFrames = images.size().min(maxFrames)
  // add loading panel
  var label = ui.Label('Loading images, please wait ....');
  var panel = ui.Panel({
    widgets: [label],
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {
      position: 'bottom-right',
      padding: '7px',
      width: '300px'
    }
  });
  map2.widgets().add(panel)
  // // chaining
  // var s = this
  // s.then = function(callback) { 
  //   s.callback = callback
  //   return s
  // }
  ee.List.sequence(0, maxFrames.subtract(1)).evaluate(function(indices) {
    var layers = []
    indices.map(function(i) {
      var image = ee.Image(images.get(i))
      var name = prefix
      var layer = ui.Map.Layer(image, vis, name, i === 0 /* load only the first layer on start */)
      map2.layers().add(layer)
      layers.push(layer)
      if(label) {
        image.get('label').evaluate(function(s) {
          layer.setName(s)
        })
      }
    })
    addAnimationControls(layers, opacity, position)
    // remove loading panel
    map2.widgets().remove(panel)
    // if(s.callback) {
    //   s.callback()
    // }
  })
  // return s
}