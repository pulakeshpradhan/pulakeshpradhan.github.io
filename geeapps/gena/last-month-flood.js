Map.setOptions('HYBRID')
Map.style().set({ cursor: 'crosshair' })
Map.setCenter(-121.6, 38.5, 9)
var images = ee.ImageCollection("COPERNICUS/S1_GRD")
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
  .map(function(i) { return i.resample('bicubic') })
var stop = ee.Date(Date.now())
var start = stop.advance(-1, 'month')
var doyStop = stop.getRelative('day', 'year')
var doyStart = start.getRelative('day', 'year')
// mean
var imagesMean = images
  .filterDate('2018-01-01', '2023-01-01')
  .filter(ee.Filter.dayOfYear(doyStart, doyStop))
var imagesMeanASC = imagesMean
  .filter(ee.Filter.eq('orbitProperties_pass', 'ASCENDING'))
  .select([0, 1], ['b1_mean', 'b2_mean'])
  .mean()
var imagesMeanDSC = imagesMean
  .filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'))
  .select([0, 1], ['b1_mean', 'b2_mean'])
  .mean()
// last
var imagesLast = images
  .filterDate(start, stop)
var imagesLastASC = imagesLast
  .filter(ee.Filter.eq('orbitProperties_pass', 'ASCENDING'))
  .reduce(ee.Reducer.percentile([1]))
  .select([0, 1], ['b1', 'b2'])
var imagesLastDSC = imagesLast
  .filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'))
  .reduce(ee.Reducer.percentile([1]))
  .select([0, 1], ['b1', 'b2'])
Map.addLayer(imagesLastASC, { min: -30, max: -5, bands: ['b1', 'b1', 'b2'] }, 'last ASC', false)
Map.addLayer(imagesLastDSC, { min: -30, max: -5, bands: ['b1', 'b1', 'b2'] }, 'last DSC', false)
Map.addLayer(imagesMeanASC, { min: -30, max: -5, bands: ['b1_mean', 'b1_mean', 'b2_mean'] }, 'mean ASC', false)
Map.addLayer(imagesMeanDSC, { min: -30, max: -5, bands: ['b1_mean', 'b1_mean', 'b2_mean'] }, 'mean DSC', false)
Map.addLayer(imagesLastASC.addBands(imagesMeanASC), { min: -30, max: -5, bands: ['b1', 'b1', 'b1_mean'] }, 'anomaly ASC', false)
Map.addLayer(imagesLastDSC.addBands(imagesMeanDSC), { min: -30, max: -5, bands: ['b1', 'b1', 'b1_mean'] }, 'anomaly DSC', false)
var anomaly = imagesLastASC.addBands(imagesMeanASC)
  .min(imagesLastDSC.addBands(imagesMeanDSC))
Map.addLayer(anomaly, { min: -30, max: -5, bands: ['b1', 'b1', 'b1_mean'] }, 'anomaly', true, 0.85)
var flood = anomaly.select('b1_mean').subtract(anomaly.select('b1')).unitScale(6, 15)
Map.addLayer(flood.selfMask(), { palette: ['cyan'] }, 'flood', false)
var mapLayers = []
var currentIndex = 0
function clearMapLayers() {
  mapLayers.map(function(mapLayer) {
    Map.layers().remove(mapLayer)
  })
  mapLayers.length = 0
  currentIndex = 0
}
var panel = null
function buildUI() {
  var label = ui.Label()
  var slider = ui.Slider(0, 1, 0, 1)
  slider.style().set({ width: '300px' })
  slider.onSlide(function(i) {
    mapLayers[currentIndex].setOpacity(0)
    currentIndex = i
    mapLayers[currentIndex].setShown(true)
    mapLayers[currentIndex].setOpacity(1)
    label.setValue(mapLayers[currentIndex].getName())
  })
  var button = ui.Button('Clear')
  button.style().set({
    margin: '0px',
    padding: '0px',
    width: '60px'
  })
  button.onClick(function() {
    clearMapLayers()
    Map.widgets().remove(panel)
    panel = null
  })
  label.setValue(mapLayers[currentIndex].getName())
  slider.setMax(mapLayers.length - 1)
  return ui.Panel([
    label, 
    ui.Panel([slider, button], ui.Panel.Layout.flow('horizontal'))
  ])
}
function addMapLayers(images, pt) {
  clearMapLayers()
  var s = Map.getScale()  
  var r = 200
  var d = 50
  var aoi = pt.buffer(r * s)
  var mask = ee.Image().paint(pt.buffer(s * (r - d)), 1).fastDistanceTransform().sqrt()
    .reproject(ee.Projection('EPSG:3857').atScale(s))
    .unitScale(0, d)
    .clip(aoi)
  mask = ee.Image(1).subtract(mask).pow(2).selfMask()
  images.aggregate_array('system:time_start').evaluate(function(times) {
    times.map(function(t, i) {
      var image = images
        .filter(ee.Filter.eq('system:time_start', t))
        .first()
        .select([0, 1], ['b1', 'b2'])
        .clip(aoi)
        .updateMask(mask)
      var mapLayer = ui.Map.Layer(image, { min: -30, max: -5, bands: ['b1', 'b1', 'b2'] }, new Date(t).toISOString(), true, i == 0 ? 1 : 0)
      mapLayers.push(mapLayer)
      Map.layers().add(mapLayer)
    })
    if(panel) {
      Map.remove(panel)
    }
    panel = buildUI()
    Map.add(panel)
  })
}
Map.onClick(function(pt) {
  pt = ee.Geometry.Point([pt.lon, pt.lat])
  var images = imagesLast.filterBounds(pt)
  addMapLayers(images, pt)
})