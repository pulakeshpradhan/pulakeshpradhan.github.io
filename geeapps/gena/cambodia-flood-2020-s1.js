var land = ui.import && ui.import("land", "image", {
      "id": "users/gena/land_polygons_image"
    }) || ee.Image("users/gena/land_polygons_image");
Map.setCenter(103, 13, 8)
var palettes = require('users/gena/packages:palettes')
var charting = require('users/gena/packages:charting')
Map.setOptions('HYBRID')
var bounds = ee.Geometry(Map.getBounds(true))
var band1 = 'VH'
var band2 = 'VV'  
var mode = 'IW'
// var mode = 'EW'
// var band1 = 'HH'
// var band2 = 'HV'  
// var mode = 'IW'
// var band1 = 'HH'
// var band2 = 'HV'  
// var mode = 'SM'
var bandNames = [band1, band2]
var images = ee.ImageCollection("COPERNICUS/S1_GRD")
  .filter(ee.Filter.eq('instrumentMode', mode))
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', band1))
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', band2))
  .select(bandNames)
var images_asc = images
  .filter(ee.Filter.eq('orbitProperties_pass', 'ASCENDING'))
var images_desc = images  
  .filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'))
images = images_asc
//images = images_desc
print(images.size())  
var min = 0, max = 0.1
function printRugPlot(images, year) {
  var start = ee.Date.fromYMD(year, 1, 1)
  var stop = ee.Date.fromYMD(year+1, 1, 1)
  var times = images.aggregate_array('system:time_start')
  // define plot (virtual) rectangle
  var rect = ee.Geometry.Rectangle({ coords: [[0, 0], [100, 6]], geodesic: false })
  // instantiate a rug plot
  var plot = new charting.Plot(rect.bounds(), { 
    area: { width: 1, color: '000000', fillColor: '00000011' }
  })
  // set domain
  plot.setMinMax(start.millis(), stop.millis(), 0, 1)
  // add S2 times (red)
  plot.addRugSeries('S1 ' + year, times, { width: 1, color: 'red' })
  // show plot
  print(plot.getThumbnail({ dimensions: '600x24'}))
}
function getWater(year) {
  // var t0 = ee.Date.fromYMD(year, 1, 1)
  // var t1 = t0.advance(12, 'month')
  // var images = images_asc.filterDate(t0, t1).filterBounds(Map.getBounds(true))
  // var t0 = ee.Date.fromYMD(year, 8, 1)
  // var t1 = t0.advance(5, 'month')
  var t0 = ee.Date.fromYMD(year, 10, 15)
  var t1 = t0.advance(1, 'month')
  // print(year, images.size())
  // printRugPlot(images, year)
  var images = images_asc.filterDate(t0, t1) // .filterBounds(Map.getBounds(true))
  var asc = images.map(toNatural).reduce(ee.Reducer.percentile([0])).rename(bandNames)
  var water = ee.Image(1).subtract(asc).unitScale(0.98, 1)
  return water
}
var water2020 = getWater(2020).reduce(ee.Reducer.max())
var water2019 = getWater(2019).reduce(ee.Reducer.max())
var water2018 = getWater(2018).reduce(ee.Reducer.max())
Map.addLayer(ee.Image(1), { palette: ['black']}, 'black', false)
var land = land.mask()
var min = 0
var max = 1
Map.addLayer(water2018.mask(water2018.multiply(land)), {min: min, max: max, palette: palettes.cb.Reds[9] }, 'water 2018', false)
Map.addLayer(water2019.mask(water2019.multiply(land)), {min: min, max: max, palette: palettes.cb.Greens[9] }, 'water 2019', false)
Map.addLayer(water2020.mask(water2020.multiply(land)), {min: min, max: max, palette: palettes.cb.Blues[9] }, 'water 2020', false)
var water = ee.Image([water2018, water2019, water2020])
Map.addLayer(water.mask(water.reduce(ee.Reducer.max()).multiply(land)), {min: min, max: max }, 'water composite')
// Functions to convert from dB
function toNatural(i) {
  return ee.Image(ee.Image.constant(10.0).pow(i.divide(10.0)).copyProperties(i, ['system:time_start']));
}
Map.add(ui.Label('Multi-annual (2018,2019,2020) flood map as RGB for Oct 15 - Nov 15', { position: 'bottom-left'}))