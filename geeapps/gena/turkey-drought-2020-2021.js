var land = ui.import && ui.import("land", "image", {
      "id": "users/gena/land_polygons_image"
    }) || ee.Image("users/gena/land_polygons_image"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "LineString",
          "coordinates": [
            [
              102.41497802734378,
              13.727865504975195
            ],
            [
              103.69763183593753,
              13.193641197889878
            ]
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.LineString(
        [[102.41497802734378, 13.727865504975195],
         [103.69763183593753, 13.193641197889878]]),
    hand = ui.import && ui.import("hand", "image", {
      "id": "users/gena/GlobalHAND/30m/hand-1000"
    }) || ee.Image("users/gena/GlobalHAND/30m/hand-1000"),
    jrc = ui.import && ui.import("jrc", "image", {
      "id": "JRC/GSW1_2/GlobalSurfaceWater"
    }) || ee.Image("JRC/GSW1_2/GlobalSurfaceWater");
var label = null
Map.onClick(function(pt) {
  if(!label) {
    label = ui.Textbox('')
    label.style().set({ width: '250px'})
    Map.add(label)
  }
  pt.lon = Math.floor(pt.lon * 1000) / 1000
  pt.lat = Math.floor(pt.lat * 1000) / 1000
  label.setValue('Clicked coordinates: ' + pt.lon + ', ' + pt.lat)
})
Map.style().set({ cursor: 'crosshair' })
// Map.setCenter(103, 13, 8)
var palettes = require('users/gena/packages:palettes')
var charting = require('users/gena/packages:charting')
// Map.setOptions('HYBRID')
Map.setOptions('TERRAIN')
Map.setCenter(33, 40, 8)
var bounds = ee.Geometry(Map.getBounds(true))
var hydro = require('users/gena/packages:hydro')
hydro.Map.addDem({ asset: 'ALOS', layer: { visible: false }})
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
// print(images.size())  
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
  // var t0 = ee.Date.fromYMD(year, 10, 15)
  var t0 = ee.Date.fromYMD(year, 12, 1)
  var t1 = t0.advance(2, 'month')
  // print(year, images.size())
  // printRugPlot(images, year)
  var images = images_asc.merge(images_desc).filterDate(t0, t1) // .filterBounds(Map.getBounds(true))
  var asc = images.map(toNatural).reduce(ee.Reducer.percentile([0])).rename(bandNames)
  // Cambodia
  // var water = ee.Image(1).subtract(asc).unitScale(0.98, 1)
  // Turkey
  var water = ee.Image(1).subtract(asc).unitScale(0.99, 1)
  return water
}
// Cambodia
// var water2020 = getWater(2020).reduce(ee.Reducer.max())
// var water2019 = getWater(2019).reduce(ee.Reducer.max())
// var water2018 = getWater(2018).reduce(ee.Reducer.max())
// Turkey
var water2020 = getWater(2020).reduce(ee.Reducer.mean())
var water2019 = getWater(2019).reduce(ee.Reducer.mean())
var water2018 = getWater(2018).reduce(ee.Reducer.mean())
Map.addLayer(ee.Image(1), { palette: ['black']}, 'black', false)
var land = land.mask()
var min = 0
var max = 1
Map.addLayer(water2018.mask(water2018.multiply(land)), {min: min, max: max, palette: palettes.cb.Reds[9] }, 'water 2018', false)
Map.addLayer(water2019.mask(water2019.multiply(land)), {min: min, max: max, palette: palettes.cb.Greens[9] }, 'water 2019', false)
Map.addLayer(water2020.mask(water2020.multiply(land)), {min: min, max: max, palette: palettes.cb.Blues[9] }, 'water 2020', false)
var black = ee.Image(1).visualize({ palette: ['black'], opacity: 0.6 })
var water = ee.Image([water2018, water2019, water2020])
Map.addLayer(black.blend(water.mask(water.reduce(ee.Reducer.max()).multiply(land))), {min: min, max: max }, 'water composite')
Map.addLayer(black.blend(water.mask(water.reduce(ee.Reducer.max()).multiply(land)).updateMask(hand.lt(10))), {min: min, max: max }, 'water composite (HAND < 10)', false)
Map.addLayer(black.blend(water.mask(water.reduce(ee.Reducer.max()).multiply(land)).updateMask(jrc.select('occurrence').mask())), {min: min, max: max }, 'water composite (+JRC)', false)
// Functions to convert from dB
function toNatural(i) {
  return ee.Image(ee.Image.constant(10.0).pow(i.divide(10.0)).copyProperties(i, ['system:time_start']));
}
// add HydroRIVERS
// HydroRIVERS
var rivers = ee.FeatureCollection("users/gena/HydroRIVERS_v10")
// comment this when exporting (dictionaries are not serializable)
rivers = rivers.map(function(f) {
  return f.set({ style: {
      // color: '00ffff',
      // color: '8a0303', // Halloween version
      gamma: 1.5,
      // width: ee.Number(f.get('DIS_AV_CMS_LOG')).divide(5)
      width: ee.Number(f.get('DIS_AV_CMS')).divide(100).add(0.5).min(3)
    } 
  })
})
// Map.addLayer(rivers, {}, 'rivers (HydroRIVERS) (features)', false)
var riversImage = rivers.style({ styleProperty: 'style' })
//Map.addLayer(riversImage, {}, 'rivers (HydroRIVERS)', false)
var layer = ui.Map.CloudStorageLayer({
  bucket: 'reservoir-monitor', 
  path: 'map-tiles/rivers', 
  maxZoom: 10, 
  name: 'rivers', // + '(cloud)', 
  shown: false, 
  opacity: 1
})
Map.layers().add(layer)
throw(0)
var utils = require('users/gena/packages:utils')
var dem = ee.Image("JAXA/ALOS/AW3D30/V2_2").select('AVE_DSM')
var profile = utils.reduceImageProfile(dem, geometry, ee.Reducer.mean(), Map.getScale())
print(ui.Chart.feature.byFeature(profile, 'distance'))
// Map.setCenter(114.1, -8.1, 12)
var minMax = dem.reduceRegion({ reducer: ee.Reducer.percentile([2, 98]), geometry: Map.getBounds(true), scale: Map.getScale() })
minMax.evaluate(function(minMax) {
  var minMax = { AVE_DSM_p2: 0, AVE_DSM_p98: 60 }
  var image = dem.resample('bicubic').convolve(ee.Kernel.gaussian(3, 2))
  var levels = ee.List.sequence(minMax.AVE_DSM_p2, minMax.AVE_DSM_p98, (minMax.AVE_DSM_p98 - minMax.AVE_DSM_p2) / 20)
  var isolines = utils.getIsolines(image, levels)
  var palette = palettes.cb.BrBG[11].reverse()
  Map.addLayer(ee.Terrain.hillshade(image.multiply(50), 315, 25), {min: -100, max: 350}, 'hillshade', true, 0.25)
  Map.addLayer(ee.Image(0), { palette: ['000000'] }, 'black', true, 0.75)
  Map.addLayer(water.mask(water.reduce(ee.Reducer.max()).multiply(land)), {min: min, max: max }, 'water composite')
  Map.addLayer(riversImage, {}, 'rivers (HydroRIVERS)', false)
  Map.addLayer(isolines.mosaic(), {palette: palette, min: minMax.AVE_DSM_p2, max: minMax.AVE_DSM_p98}, 'isolines', true, 0.75)
  var levels2 = ee.List.sequence(minMax.AVE_DSM_p2, minMax.AVE_DSM_p98, (minMax.AVE_DSM_p98 - minMax.AVE_DSM_p2) / 5)
  var isolines2 = utils.getIsolines(image, levels2)
  Map.addLayer(isolines2.mosaic().focal_max(1), {palette: palette, min: minMax.AVE_DSM_p2, max: minMax.AVE_DSM_p98}, 'isolines (thick)', true, 0.75)
  Map.addLayer(water2020.mask(water2020.multiply(land)), {min: min, max: max, palette: palettes.cb.Blues[9] }, 'water 2020', false)
  Map.addLayer(ee.FeatureCollection([geometry]).style({color: 'red', width: 4}), {}, 'profile')
  Map.setOptions('SATELLITE')  
})