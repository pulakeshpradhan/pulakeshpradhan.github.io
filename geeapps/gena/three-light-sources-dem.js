var ahn2 = ui.import && ui.import("ahn2", "image", {
      "id": "AHN/AHN2_05M_RUW"
    }) || ee.Image("AHN/AHN2_05M_RUW"),
    ahn3 = ui.import && ui.import("ahn3", "image", {
      "id": "users/gena/AHN3_DSM"
    }) || ee.Image("users/gena/AHN3_DSM"),
    alos = ui.import && ui.import("alos", "imageCollection", {
      "id": "JAXA/ALOS/AW3D30/V3_2"
    }) || ee.ImageCollection("JAXA/ALOS/AW3D30/V3_2"),
    ned = ui.import && ui.import("ned", "image", {
      "id": "USGS/NED"
    }) || ee.Image("USGS/NED"),
    jrc = ui.import && ui.import("jrc", "image", {
      "id": "JRC/GSW1_3/GlobalSurfaceWater"
    }) || ee.Image("JRC/GSW1_3/GlobalSurfaceWater"),
    nasadem = ui.import && ui.import("nasadem", "image", {
      "id": "NASA/NASADEM_HGT/001"
    }) || ee.Image("NASA/NASADEM_HGT/001"),
    land = ui.import && ui.import("land", "image", {
      "id": "users/gena/land_polygons_image"
    }) || ee.Image("users/gena/land_polygons_image");
/*
Copyright (c) 2018 Gennadii Donchyts. All rights reserved.
This work is licensed under the terms of the MIT license.  
For a copy, see <https://opensource.org/licenses/MIT>.
*/
Map.setOptions('HYBRID')
// Map.setCenter(-121.8093, 45.6445, 10)
var lon = ui.url.get('lon', -9999)
var lat = ui.url.get('lat', -9999)
var zoom = ui.url.get('zoom', Map.getZoom())
var mapStyle = ui.url.get('mapStyle', '')
var azimuth = ui.url.get('azimuth', 315)
var zenith = ui.url.get('zenith', 6)
var exaggeration = ui.url.get('exaggeration', -1)
var shadows = ui.url.get('shadows', true)
if(lon != -9999) {
  Map.setCenter(lon, lat, zoom)
} else {
  Map.setCenter(10, 13, 4)
}
var utils = require('users/gena/packages:utils')
var palettes = require('users/gena/packages:palettes')
ahn2 = ahn2.resample('bicubic')//.convolve(ee.Kernel.gaussian(0.5, 0.25, 'meters'))
ahn3 = ahn3.resample('bicubic')//.convolve(ee.Kernel.gaussian(0.5, 0.25, 'meters'))
ned = ned.resample('bicubic')//.convolve(ee.Kernel.gaussian(10, 5, 'meters'))
alos = alos.select('DSM').mosaic().reproject(ee.Projection('EPSG:3857').atScale(30)).resample('bicubic')//.convolve(ee.Kernel.gaussian(35, 30, 'meters'))
nasadem = nasadem.select('elevation').unmask(0, false).resample('bicubic')//.convolve(ee.Kernel.gaussian(35, 30, 'meters')).where(land.mask().not(), 0)
// var palette = palettes.crameri.lisbon[25]
// palettes.showPalette('lisbon', palette)
// var palette = palettes.cb.Greys[9].reverse()
// palettes.showPalette('greys', palette)
// var palette = palettes.crameri.roma[25].slice(0).reverse()
// palettes.showPalette('roma', palette)
var checkboxWhite = ui.Checkbox('White', mapStyle == 'white', function(value) { 
  layerDem.setEeObject(render(Map.getZoom(), value, azimuth, zenith, exaggeration, shadows)) 
  if(value) {
    ui.url.set('mapStyle', 'white')  
    mapStyle = 'white'
  } else {
    ui.url.set('mapStyle', '')  
    mapStyle = ''
  }
}, false, { position: 'bottom-right' })
var checkboxShadows = ui.Checkbox('Shadows', shadows, function(value) { 
  layerDem.setEeObject(render(Map.getZoom(), mapStyle == 'white', azimuth, zenith, exaggeration, value)) 
  shadows = value
  ui.url.set('shadows', value)  
}, false, { position: 'bottom-right' })
var exaggerationCustom = false
function getExaggeration(zoom) {
  if(exaggerationCustom) {
    return exaggeration
  }
  if(zoom > 7) {
    exaggeration = 3
  } else if(zoom <= 3) {
    exaggeration = 50
  } else {
    exaggeration = -9.2 * zoom  + 96
  }
  exaggeration = Math.floor(exaggeration)
  ui.url.set('exaggeration', exaggeration)
  return exaggeration
}
if(exaggeration == -1) {
  exaggeration = getExaggeration(zoom)
}
function render(zoom, isWhite, azimuth, zenith, exaggeration, shadows) {
  var palette = palettes.crameri.oleron[50]
  if(isWhite) {
    var palette = ['white']
  }
  var weight = 0.6 // wegith of Hillshade vs RGB intensity (0 - flat, 1 - HS)
  // var exaggeration = exageration // vertical exaggeration
  // var azimuth = azimuth // Sun azimuth
  // var zenith = zenith // Sun elevation
  var brightness = 0 // 0 - default
  var contrast = 0.1 // 0 - default
  var saturation = 0.3 // 1 - default
  var castShadows = shadows
  if(isWhite) {
    saturation = 0.7
  }
  function renderDem(dem, blendWater) {
    var demRGB = dem.visualize({ min: -1000, max: 1000, palette: palette })
    var water = jrc.select('occurrence').unmask(0, false).resample('bicubic').divide(100)
    if(zoom < 10) {
      water = water.focal_mean(35, 'circle', 'meters')
    }
    water = water.updateMask(water.unitScale(0, 0.8)).visualize({ palette: [palettes.crameri.roma[50][40]] })
    var ocean = land.mask().not().selfMask().visualize({ palette: [palettes.crameri.roma[50][40]] })
    if(blendWater) {
      demRGB = ee.ImageCollection([ demRGB, water, ocean ]).mosaic()
    }
    var rgb = utils.hillshadeRGB(demRGB, dem, weight, exaggeration, azimuth, zenith, contrast, brightness, saturation, castShadows)
    // Map.addLayer(rgb, {}, 'DEM', false)
    // var demRGB = dem.visualize({ min: -5, max: 5, palette: [palettes.crameri.roma[50][15]] })
    var rgb2 = utils.hillshadeRGB(demRGB, dem, weight, exaggeration, azimuth - 90, zenith + 30, contrast, brightness, saturation, castShadows)
    // var demRGB = dem.visualize({ min: -5, max: 5, palette: [palettes.crameri.roma[50][40]] })
    var rgb3 = utils.hillshadeRGB(demRGB, dem, weight, exaggeration, azimuth - 120, zenith + 25, contrast, brightness, saturation, castShadows)
    var rgb = rgb.multiply(0.6).add(rgb2.multiply(0.2)).add(rgb3.multiply(0.2))
    return rgb
  }
  if(zoom < 10) {
    // castShadows = false
    return renderDem(nasadem, true)
  } else {
    // castShadows = true
    return ee.ImageCollection([
      renderDem(nasadem, true),
      // renderDem(ned, true),
      renderDem(ahn3, false)
    ]).mosaic()
  }
  // return renderDem(ahn3)
  // return renderDem(nasadem).blend(renderDem(ahn3)).blend(renderDem(ned))
}
function updateUrl(lon, lat, zoom, azimuth, zenith, exaggeration) {
  ui.url.set('lon', Math.floor(lon * 1000) / 1000)
  ui.url.set('lat', Math.floor(lat * 1000) / 1000)  
  ui.url.set('zoom', zoom)
  ui.url.set('azimuth', azimuth)
  ui.url.set('zenith', zenith)
  ui.url.set('exaggeration', exaggeration)
}
// Map.addLayer(dem, {}, 'DEM (raw)', false)
var labelSunElevation = ui.Label('Sun zenith: ')
labelSunElevation.style().set({ width: '100px'})
var sliderSunElevation = ui.Slider(1, 50, zenith, 1)
sliderSunElevation.style().set({ width: '200px'})
sliderSunElevation.onChange(function(value) {
  zenith = value
  ui.url.set('zenith', zenith)
  layerDem.setEeObject(render(Map.getZoom(), mapStyle == 'white', azimuth, zenith, exaggeration, shadows))
})
var labelSunAzimuth = ui.Label('Sun azimuth: ')
labelSunAzimuth.style().set({ width: '100px'})
var sliderSunAzimuth = ui.Slider(0, 365, azimuth, 1)
sliderSunAzimuth.style().set({ width: '200px' })
sliderSunAzimuth.onChange(function(value) {
  azimuth = value
  ui.url.set('azimuth', azimuth)
  layerDem.setEeObject(render(Map.getZoom(), mapStyle == 'white', azimuth, zenith, exaggeration, shadows))
})
var labelExaggeration = ui.Label('Exaggeration: ')
labelExaggeration.style().set({ width: '100px'})
var sliderExaggeration = ui.Slider(1, 101, exaggeration, 1)
sliderExaggeration.style().set({ width: '200px' })
sliderExaggeration.onChange(function(value) {
  exaggerationCustom = true
  layerDem.setEeObject(render(Map.getZoom(), mapStyle == 'white', azimuth, zenith, value, shadows))
  exaggeration = value
  ui.url.set('exaggeration', exaggeration)
})
var controlsShown = true
var buttonHideShow = ui.Button('Hide')
buttonHideShow.style().set({ position: 'bottom-right' })
var panelControls = ui.Panel({
  widgets: [
    ui.Panel([checkboxWhite, checkboxShadows], ui.Panel.Layout.flow('horizontal')),
    ui.Panel([labelSunElevation, sliderSunElevation], ui.Panel.Layout.flow('horizontal')),
    ui.Panel([labelSunAzimuth, sliderSunAzimuth], ui.Panel.Layout.flow('horizontal')),
    ui.Panel([labelExaggeration, sliderExaggeration], ui.Panel.Layout.flow('horizontal')),
    buttonHideShow
  ], 
  layout: ui.Panel.Layout.flow('vertical'), 
  style: {
    position: 'top-right', margin: '0px', padding: '0px'
  }
})
buttonHideShow.onClick(function() {
  if(controlsShown) {
    buttonHideShow.setLabel('Show')
    controlsShown = false
    panelControls.widgets().get(0).style().set({ shown: false })
    panelControls.widgets().get(1).style().set({ shown: false })
    panelControls.widgets().get(2).style().set({ shown: false })
    panelControls.widgets().get(3).style().set({ shown: false })
  } else {
    buttonHideShow.setLabel('Hide')
    controlsShown = true
    panelControls.widgets().get(0).style().set({ shown: true })
    panelControls.widgets().get(1).style().set({ shown: true })
    panelControls.widgets().get(2).style().set({ shown: true })
    panelControls.widgets().get(3).style().set({ shown: true })
  }
})
Map.add(panelControls)
var layerDem = ui.Map.Layer(render(Map.getZoom(), mapStyle == 'white', azimuth, zenith, exaggeration, shadows), {}, 'DEM')
Map.layers().add(layerDem)
Map.onChangeZoom(function(zoom) {
  sliderExaggeration.setValue(getExaggeration(Map.getZoom()), false)
  layerDem.setEeObject(render(zoom, checkboxWhite.getValue(), azimuth, zenith, sliderExaggeration.getValue(), shadows))
  ui.url.set('zoom', zoom)
})
Map.onChangeCenter(function(pt) {
  ui.url.set('lon', pt.lon)
  ui.url.set('lat', pt.lat)
})
Map.onChangeCenter(function(pt) {
  var lon = pt.lon
  var lat = pt.lat
  var zoom = Map.getZoom()
  updateUrl(lon, lat, zoom, azimuth, zenith, exaggeration)
})
// var utils = require('users/gena/packages:utils')
// var images = ee.ImageCollection('COPERNICUS/S2')
// Map.setOptions('TERRAIN')
// Map.addLayer(ee.Image(1), { palette: ['000000'] }, 'black', true, 0.5)
// var image = ee.Image(images.filterBounds(Map.getCenter()).toList(1, 10).get(0))
// image = images.filterDate(image.date().advance(-5, 'minute'), image.date().advance(5, 'minute'))
//   .map(function(i) {
//     return i.resample('bicubic').select(['B4', 'B3', 'B2', 'B10'])
//   }).mosaic()
// var imageStretched = utils.stretchImage(image, {
//   percentiles: [5, 80],
//   bounds: Map.getBounds(true),
//   scale: Map.getScale()
// })
// Map.addLayer(imageStretched, { gamma: 1.2, min: 0, max: 1 }, 'stretched', false)
// function getClouds(image) {
//   return image.select(['B4', 'B3', 'B2']).add(image.select('B10').multiply(3)).reduce(ee.Reducer.sum()).divide(30000)
// }
// var clouds = getClouds(image).unitScale(0.1, 0.5)
// Map.addLayer(clouds, { min: 0, max: 1 }, 'clouds', false)
// var imageStretched = utils.stretchImage(image.updateMask(ee.Image(1).subtract(clouds)), {
//   percentiles: [5, 95],
//   bounds: Map.getBounds(true),
//   scale: Map.getScale()
// })
// Map.addLayer(imageStretched.updateMask(image.select(0).mask()), { gamma: 1.2, min: 0, max: 1 }, 'stretched (no clouds)')
// var imageStretched = utils.stretchImage(image.updateMask(clouds), {
//   percentiles: [5, 98],
//   bounds: Map.getBounds(true),
//   scale: Map.getScale()
// })
// var proj = ee.Projection('EPSG:3857').atScale(Map.getScale())
// Map.addLayer(ee.Image(1).subtract(imageStretched).changeProj(proj, proj.translate(-50, -50)), { gamma: 1, min: 0.5, max: 2 }, 'stretched (clouds)')
// Map.addLayer(imageStretched, { gamma: 1, min: -0.5, max: 1 }, 'stretched (clouds)')