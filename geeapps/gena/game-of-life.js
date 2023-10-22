function GameOfLife() {
  this.proj = null
  this.alive = null
  this.t = 0
  this.steps = 10 // number of steps to add every time
  this.layers = []
  this.initUI()
}
GameOfLife.prototype.step = function() {
  // These rules, which compare the behavior of the automaton to real life, can be condensed into the following:
  // Any live cell with two or three neighbors survives.
  // Any dead cell with three live neighbors becomes a live cell.
  // All other live cells die in the next generation. Similarly, all other dead cells stay dead.
  var neighbors = this.alive.reduceNeighborhood({ 
    reducer: ee.Reducer.sum(), 
    kernel: ee.Kernel.square({ radius: 1, units: 'pixels', normalize: false }) 
  }).reproject(this.proj)
  var survivor = this.alive.and(neighbors.eq(4).or(neighbors.eq(3)))
  var baby = this.alive.not().and(neighbors.eq(3))
  this.alive = survivor.or(baby)
}
GameOfLife.prototype.run = function() {
  Map.layers().reset()
  var layerImage = ui.Map.Layer(null, {}, 'image')
  Map.layers().add(layerImage)
  var image = ee.ImageCollection('COPERNICUS/S2_SR')
    .filterBounds(Map.getCenter())
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 5))
    .first()
    .resample('bicubic')
  this.proj = ee.Projection('EPSG:3857').atScale(Map.getScale() * 3)
  image = image
    .select(['B12','B8','B1', 'B3', 'B4'])
    .divide(10000)
  layerImage.setEeObject(image.visualize({ min: 0.03, max: 0.35 }).blend(ee.Image(1).mask(image.select(0).mask()).visualize({ palette: ['000000'], opacity: 0.5 })))
  this.alive = image.normalizedDifference(['B8', 'B4']).gt(parseFloat(this.textThreshold.getValue())).reproject(this.proj)
  // this.alive = image.normalizedDifference(['B3', 'B8']).gt(0).reproject(this.proj)
  this.step(this.alive) // initial step
}
GameOfLife.prototype.onAddSteps = function() {
  for(var i=0; i<this.steps; i++) {
    this.t++
    var image = this.alive.selfMask()
    var layer = ui.Map.Layer(image, { min: 0, max: 1}, 'alive ' + this.t, true, 0)
    Map.layers().add(layer)
    this.layers.push(layer)
    this.step(this.alive)
  }
  this.slider.setMax(this.t-1)
  var currentStep = this.t == this.steps ? 0 : this.t-1
  this.slider.setValue(currentStep, true)
  this.layers[currentStep].setOpacity(1)
}
GameOfLife.prototype.initUI = function() {
  var game = this
  this.buttonRun = ui.Button('Run')
  // play  
  var timeout = null
  var play = false
  var timeStep = 150
  var textPlay = '▶'
  var textPause = '⏸'
  var currentTime = 0
  function nextFrame() { 
    if(currentTime === game.layers.length) {
      currentTime = 0
      game.slider.setValue(0)
    }
    game.slider.setValue(currentTime, true)
    currentTime += 1
    if(play) {
      if(currentTime == game.layers.length) {
        ui.util.setTimeout(nextFrame, timeStep * 5)
      } else {
        ui.util.setTimeout(nextFrame, timeStep)
      }
    }
  }
  function onPlayPause() {
    if(!play && !timeout) {
      currentTime = 0
      timeout = ui.util.setTimeout(nextFrame, timeStep)
      play = true
      game.buttonPlayPause.setLabel(textPause)
    } else {
      ui.util.clearTimeout(timeout)
      timeout = null
      play = false
      game.buttonPlayPause.setLabel(textPlay)
    }
  }
  this.textThreshold = ui.Textbox('NDVI threshold:', 0.35)
  this.textThreshold.style().set({ width: '50px' })
  this.labelThreshold = ui.Label('NDVI threshold')
  this.panelThreshold = ui.Panel([this.labelThreshold, this.textThreshold], ui.Panel.Layout.flow('horizontal'))
  this.buttonAddStep = ui.Button('Add ' + this.steps + ' Steps')
  this.buttonPlayPause = ui.Button(textPlay, onPlayPause, false)
  this.slider = ui.Slider(0, 1, 0, 1)
  this.panel = ui.Panel([this.buttonRun, this.slider, this.buttonPlayPause, this.buttonAddStep])
  this.slider.style().set({
    width: '250px'
  })
  this.panel.style().set({
    position: 'top-right'
  })
  this.buttonAddStep.onClick(function() {
    game.onAddSteps()
  })
  this.slider.onSlide(function(i) {
    game.layers.forEach(function(l, j) {
      var opacity = i === j ? 1 : 0
      l.setOpacity(opacity)
      if(j===i && !l.getShown()) {
        l.setShown(true)
      }
    })
  })
  Map.add(this.panel)
  this.buttonRun.onClick(function() {
    game.t = 0
    game.layers = []
    game.run()
    game.onAddSteps()
  })
  Map.onChangeZoom(function() {
    // completely remove layers, start from scratch
    // Map.layers().reset()
    // just hide layers
    game.layers.forEach(function(l, i) {
      if(i !== game.slider.getValue()) {
        l.setShown(false)
      }
    })
  })
}
Map.setOptions('HYBRID')
new GameOfLife()