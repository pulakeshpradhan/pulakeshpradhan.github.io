var raw = ee.Image("AHN/AHN2_05M_RUW"),
    nointerp = ee.Image("AHN/AHN2_05M_NON"),
    interp = ee.Image("AHN/AHN2_05M_INT");
var palettes = require('users/gena/packages:palettes');
var utils = require('users/gena/packages:utils')
var reducer = ee.Reducer.percentile([1, 99])
Map.centerObject(raw, 10)
function addIsoLines() {
  var levels = [0]
  var isolines = utils.getIsolines(raw.select('elevation').resample('bilinear'), levels)
  Map.addLayer(isolines, {opacity: 0.8, palette:['ffffff']}, '0 NAP')
}
function updateScale() {
  var bounds = Map.getBounds(true)
  var scale = Map.getScale()
  var percentiles = raw.reduceRegion(reducer, bounds, scale).getInfo()
  var min =  percentiles.elevation_p1
  var max =  percentiles.elevation_p99
  var  visParams = {min: min, max:max, palette: palettes.colorbrewer.Paired[12]}
  // Remove Layers
  Map.clear()
  // Resync
  Map.onChangeBounds(updateScale)
  var demStyled = raw.visualize(visParams)
  var weight = 1.0
  var extrusion = 10
  var sunAzimuth = 315
  var sunZenith = 20
  var contrast = 0.5
  var brightness = 0
  var saturation = 0.9
  var castShadows = true
  var demHillshaded = utils.hillshadeRGB(
    demStyled,
    raw, 
    weight, 
    extrusion, 
    sunAzimuth, 
    sunZenith, 
    contrast, 
    brightness, 
    saturation, 
    castShadows
  )
  Map.addLayer(demHillshaded, {}, 'raw AHN 2',  true)
  addIsoLines()
}
updateScale()