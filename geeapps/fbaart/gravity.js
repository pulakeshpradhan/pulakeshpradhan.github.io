var graceOcean = ee.ImageCollection("NASA/GRACE/MASS_GRIDS/OCEAN"),
    graceLand = ee.ImageCollection("NASA/GRACE/MASS_GRIDS/LAND"),
    graceEOF = ee.ImageCollection("NASA/GRACE/MASS_GRIDS/OCEAN_EOFR");
var palettes = require('users/gena/packages:palettes');
var style = require('users/gena/packages:style')
style.SetMapStyleDark()
Map.setOptions('Dark')
// Add an interactive circle
var circleLayer = ui.Map.Layer(
  null, 
  {
    color: '#a1f5ff'
  }, 
  'selection'
)
Map.layers().add(circleLayer)
var palette = palettes.cmocean.Balance[7].reverse()
var visParams = {palette: palette, min: -20, max: 20}
print(graceLand)
function addTerms(image) {
  var constant = ee.Image.constant(1).rename('constant')
  var date = ee.Date(image.get('system:time_start'))
  var yearFraction = date.get('year').add(date.getFraction('year')).subtract(1970)
  var year = ee.Image.constant(yearFraction).rename('year').float()
  var terms = image.addBands(year).addBands(constant)
  return terms  
}
function regression(images) {
  var independents = ['constant', 'year']
  var dependent = ['lwe_thickness_jpl']
  var reducer = ee.Reducer.linearRegression(2, 1)
  var fit = images
    .select('lwe_thickness_jpl')
    .map(addTerms)
    .select(independents.concat(dependent))
    .reduce(reducer)
    .select('coefficients')
    .arrayProject([0])
    .arrayFlatten([independents])  
  return fit
}
var fitLand = regression(graceLand)
var fitOcean = regression(graceOcean)
var fitEOF = regression(graceEOF)
print(fitOcean)
var landParams = {palette: palette, min: -10, max: 10}
var oceanParams = {palette: palette, min: -2, max: 2}
Map.addLayer(graceLand, {}, 'grace land', false)
Map.addLayer(graceOcean, {}, 'grace ocean', false)
Map.addLayer(fitLand.select('year').resample('bilinear'), landParams, 'fit land', false)
Map.addLayer(fitOcean.select('year').resample('bilinear'), oceanParams, 'fit ocean')
Map.addLayer(fitEOF.select('year').resample('bilinear'), oceanParams, 'fit ocean eof', false)
Map.addLayer(fitLand.select('constant').resample('bilinear'), landParams, 'fit land constant', false)
var utils = require('users/gena/packages:utils')
var levels = [0]
var isolines = utils.getIsolines(fitOcean.select('year').resample('bilinear'), levels)
Map.addLayer(isolines, {opacity: 0.3}, 'fit ocean isolines')
var isolines = utils.getIsolines(fitEOF.select('year').resample('bilinear'), levels)
Map.addLayer(isolines, {opacity: 0.3, palette: ['1111ff']}, 'fit eof isolines', false)
// Add gui
var panel = ui.Panel()
var label = ui.Label('Select a point')
var button = ui.Button('X', function(evt) {
  Map.remove(panel)
})
panel.add(label)
panel.add(button)
panel.style().set({
  width: '400px',
  position: 'bottom-left'
});
Map.add(panel);
Map.onClick(function(coords){
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var bounds = Map.getBounds()
  var width = bounds[2] - bounds[0]
  var scale = Map.getScale() * 22
  var circle = point.buffer(scale, scale/32)  
  circleLayer.setEeObject(circle)
  var graceOceanWithTime = graceOcean
    .select('lwe_thickness_jpl')
    .map(addTerms)
   // fastest way to lookup values
  var graceList = graceOceanWithTime.map(function(i) {
    var iMean = i.reduceRegion({
      reducer: ee.Reducer.mean(),
      geometry: circle, 
      scale: Map.getScale() * 10, 
      crs: 'EPSG:4326'  
    })
    return i.set({v: iMean.get('lwe_thickness_jpl')})
  })
  // Add chart
  var chart = ui.Chart.feature.byFeature(
    graceList, 
    'system:time_start', 
    ['v']
  )
  chart.setOptions({
    title: 'Trend in gravity liquid water equivalent',
    vAxis: {title: 'Liquid water equivalent [mm/yr]'},
    hAxis: {title: 'Time [year]'},
    lineWidth: 0,
    pointSize: 2,
    trendlines: {0: {}},
    label: 'Grace'
  });
  panel.clear();
  panel.add(chart);
})
Map.setCenter(0, 60, 2)