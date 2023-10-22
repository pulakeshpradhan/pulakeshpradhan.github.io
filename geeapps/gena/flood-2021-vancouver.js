var imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "VV"
        ],
        "min": -6.0730642446329215,
        "max": 0,
        "palette": [
          "0e79ff",
          "ffffff"
        ]
      }
    }) || {"opacity":1,"bands":["VV"],"min":-6.0730642446329215,"max":0,"palette":["0e79ff","ffffff"]},
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -122.61751760050272,
                48.736230008988834
              ],
              [
                -123.02675832315897,
                47.65425028684252
              ],
              [
                -122.2590886454246,
                47.19713999965828
              ],
              [
                -121.69191945597147,
                47.7549837027936
              ],
              [
                -122.15197194620585,
                48.795067457139425
              ],
              [
                -121.9899236063621,
                48.993698269739305
              ],
              [
                -121.76058400675272,
                49.137661536036646
              ],
              [
                -121.65209401651835,
                49.233704307930694
              ],
              [
                -121.58205617472147,
                49.32598064361114
              ],
              [
                -121.4241277079246,
                49.35998074701836
              ],
              [
                -121.38430226847147,
                49.412723833103946
              ],
              [
                -121.48317922159647,
                49.43326936029929
              ],
              [
                -121.85671437784647,
                49.326875684160896
              ],
              [
                -121.98031056925272,
                49.31344836747185
              ],
              [
                -122.0942937235496,
                49.24356729764867
              ],
              [
                -122.2755681376121,
                49.3572973824328
              ],
              [
                -122.40603078409647,
                49.30449478907541
              ],
              [
                -122.48842824503397,
                49.27314444967107
              ],
              [
                -122.54335988565897,
                49.294643973374534
              ],
              [
                -122.60241139933085,
                49.38144239317893
              ],
              [
                -122.67382253214335,
                49.34656245996511
              ],
              [
                -122.6930486063621,
                49.30986713137711
              ],
              [
                -122.76308644815897,
                49.29016567895057
              ],
              [
                -122.88668263956522,
                49.312553082855814
              ],
              [
                -123.09679616495585,
                49.334930316947194
              ],
              [
                -123.27120412394022,
                49.34924641020507
              ],
              [
                -123.24648488565897,
                49.252531942787215
              ],
              [
                -123.18880666300272,
                49.22025160218268
              ],
              [
                -123.1929265360496,
                49.16999580155474
              ],
              [
                -123.19979299112772,
                49.11339698544825
              ],
              [
                -123.22451222940897,
                49.12598008643038
              ],
              [
                -123.22863210245585,
                49.102608929327424
              ],
              [
                -123.00890553995585,
                48.928778695449054
              ],
              [
                -122.6710759501121,
                48.7824006006081
              ],
              [
                -122.65184987589335,
                48.752530357913486
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#98ff00",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #98ff00 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-122.61751760050272, 48.736230008988834],
          [-123.02675832315897, 47.65425028684252],
          [-122.2590886454246, 47.19713999965828],
          [-121.69191945597147, 47.7549837027936],
          [-122.15197194620585, 48.795067457139425],
          [-121.9899236063621, 48.993698269739305],
          [-121.76058400675272, 49.137661536036646],
          [-121.65209401651835, 49.233704307930694],
          [-121.58205617472147, 49.32598064361114],
          [-121.4241277079246, 49.35998074701836],
          [-121.38430226847147, 49.412723833103946],
          [-121.48317922159647, 49.43326936029929],
          [-121.85671437784647, 49.326875684160896],
          [-121.98031056925272, 49.31344836747185],
          [-122.0942937235496, 49.24356729764867],
          [-122.2755681376121, 49.3572973824328],
          [-122.40603078409647, 49.30449478907541],
          [-122.48842824503397, 49.27314444967107],
          [-122.54335988565897, 49.294643973374534],
          [-122.60241139933085, 49.38144239317893],
          [-122.67382253214335, 49.34656245996511],
          [-122.6930486063621, 49.30986713137711],
          [-122.76308644815897, 49.29016567895057],
          [-122.88668263956522, 49.312553082855814],
          [-123.09679616495585, 49.334930316947194],
          [-123.27120412394022, 49.34924641020507],
          [-123.24648488565897, 49.252531942787215],
          [-123.18880666300272, 49.22025160218268],
          [-123.1929265360496, 49.16999580155474],
          [-123.19979299112772, 49.11339698544825],
          [-123.22451222940897, 49.12598008643038],
          [-123.22863210245585, 49.102608929327424],
          [-123.00890553995585, 48.928778695449054],
          [-122.6710759501121, 48.7824006006081],
          [-122.65184987589335, 48.752530357913486]]]);
Map.setControlVisibility({ drawingToolsControl: false })
Map.setCenter(-122.6531, 49.0686, 10)
Map.setOptions('HYBRID')
var minVisS1 = [-18.62, -18.62, -24.119]
var maxVisS1 = [2.13, 2.13, -2.63]
var vis = {min: minVisS1, max: maxVisS1, bands: ['VV', 'VV', 'VH'], gamma: 1.4 }
function getMosaic(start, stop, filterDSC) {
  var images = ee.ImageCollection("COPERNICUS/S1_GRD")
    .filterDate(start, stop)
    .filter(ee.Filter.dayOfYear(300, 335))
    .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
    .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
  if(filterDSC) {
    images = images
    .filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'))
  }
  images = images
    .map(function(i) { return i.resample('bicubic')})
  return images.mean()
}
var before = getMosaic('2021-11-13', '2021-11-14')
var after = getMosaic('2021-11-16', '2021-11-17')
var layerBefore = ui.Map.Layer(before.visualize(vis), {}, 'before flooding (2021-11-13)')
Map.layers().add(layerBefore)
var flood = getMosaic('2015-11-01', '2021-12-01', true).subtract(after).select(['VV', 'VH']).reduce(ee.Reducer.mean()).unitScale(0, 5).selfMask().visualize({palette: ['black', 'cyan']}).clip(geometry)
// var beforeS2 = ee.ImageCollection('COPERNICUS/S2').filterBounds(Map.getCenter()).filterDate('2021-10-01', '2021-11-17')
//   .map(function(i) { return i.set({ label: i.date().format('YYYY-MM-dd') })})
// print(beforeS2.size())
// var visS2 = {min: 500, max: 4500, bands: ['B12', 'B8', 'B3'], gamma: 1.4 }
// require('users/gena/packages:animation').animate(beforeS2, { vis: visS2, label: 'label' })
var linkedMap = ui.Map()
var layerAfter = ui.Map.Layer(after.visualize(vis), {}, 'after flooding (2021-11-16)')
linkedMap.layers().add(layerAfter)
var beforeS2 = ee.ImageCollection('COPERNICUS/S2').filterDate('2021-09-01', '2021-11-01').sort('CLOUDY_PIXEL_PERCENTAGE', false).map(function(i) { return i.resample('bicubic') }).mosaic()
var layerBeforeS2 = ui.Map.Layer(beforeS2.visualize({min: 500, max: 4500, bands: ['B12', 'B8', 'B3'], gamma: 1.4 }), {}, 'after flooding, S2 (2021-11-16)', false)
Map.layers().add(layerBeforeS2)
var afterS2 = ee.ImageCollection('COPERNICUS/S2').filterDate('2021-11-16', '2021-11-17').map(function(i) { return i.resample('bicubic') }).mosaic()
var layerAfterS2 = ui.Map.Layer(afterS2.visualize({min: 500, max: 4500, bands: ['B12', 'B8', 'B3'], gamma: 1.4 }), {}, 'after flooding, S2 (2021-11-16)', false)
linkedMap.layers().add(layerAfterS2)
var layerFlood = ui.Map.Layer(flood, {}, 'flood', true, 0.9)
linkedMap.layers().add(layerFlood)
var linker = ui.Map.Linker([ui.root.widgets().get(0), linkedMap])
// Make an inset map and add it to the linked map.
var inset1 = ui.Map({style: {position: "bottom-right"}})
inset1.setControlVisibility({ all: false })
linkedMap.add(inset1)
var inset2 = ui.Map({style: {position: "bottom-right"}})
inset2.setControlVisibility({ all: false })
Map.add(inset2)
// Register a function to the linked map to update the inset map.
linkedMap.onChangeBounds(function() {
  var bounds = ee.Geometry.Rectangle(Map.getBounds())
  inset1.centerObject(bounds)
  inset1.layers().set(0, bounds)
  inset2.centerObject(bounds)
  inset2.layers().set(0, bounds)
})
// Create a SplitPanel which holds the linked maps side-by-side.
var splitPanel = ui.SplitPanel({
  firstPanel: linker.get(0),
  secondPanel: linker.get(1),
  orientation: 'horizontal',
  wipe: true,
  style: {stretch: 'both'}
})
// Set the SplitPanel as the only thing in root.
ui.root.widgets().reset([splitPanel])
linkedMap.setCenter(-122.6531, 49.0686, 10)
linkedMap.setOptions('HYBRID')
function addControls(map) {
  var sliderOpacityImage = ui.Slider(0, 100, 100, 1)
  var sliderOpacityImageS2 = ui.Slider(0, 100, 0, 1)
  var sliderOpacityFlood = ui.Slider(0, 100, 100, 1)
  sliderOpacityImageS2.style().set({ width: '150px'})
  sliderOpacityImage.style().set({ width: '150px'})
  sliderOpacityFlood.style().set({ width: '150px'})
  var panelSliders = ui.Panel([
    ui.Panel([ui.Label('Flooded:', { width: '100px' }), sliderOpacityFlood], ui.Panel.Layout.Flow('horizontal')),
    ui.Panel([ui.Label('Sentinel-2:', { width: '100px' }), sliderOpacityImageS2], ui.Panel.Layout.Flow('horizontal')),
    ui.Panel([ui.Label('Sentinel-1:', { width: '100px' }), sliderOpacityImage], ui.Panel.Layout.Flow('horizontal')),
  ], null, { position: 'top-right' })
  sliderOpacityImage.onSlide(function(v) {
    if(v > 0) {
      layerBefore.setShown(true)
      layerAfter.setShown(true)
    } else {
      layerBefore.setShown(false)
      layerAfter.setShown(false)
    }
    layerBefore.setOpacity(v/100)
    layerAfter.setOpacity(v/100)
  })
  sliderOpacityImageS2.onSlide(function(v) {
    if(v > 0) {
      layerBeforeS2.setShown(true)
      layerAfterS2.setShown(true)
    } else {
      layerBeforeS2.setShown(false)
      layerAfterS2.setShown(false)
    }
    layerBeforeS2.setOpacity(v/100)
    layerAfterS2.setOpacity(v/100)
  })
  sliderOpacityFlood.onSlide(function(v) {
    layerFlood.setOpacity(v/100)
  })
  map.add(panelSliders)
  return [sliderOpacityImage, sliderOpacityImageS2, sliderOpacityFlood]
}
var sliders1 = addControls(Map)
var sliders2 = addControls(linkedMap)
function syncSlider(slider1, slider2) {
  var updating = false
  slider1.onSlide(function(v) {
    if(updating) {
      return
    }
    updating = true
    slider2.setValue(v)
    updating = false
  })
  slider2.onSlide(function(v) {
    if(updating) {
      return
    }
    updating = true
    slider1.setValue(v)
    updating = false
  })
}
syncSlider(sliders1[0], sliders2[0])
syncSlider(sliders1[1], sliders2[1])
syncSlider(sliders1[2], sliders2[2])
var animation = require('users/gena/packages:animation')
var assets = require('users/gena/packages:assets')
var insetMap = null
var panelTimeLapse = ui.Panel([])
panelTimeLapse.style().set({ border: '1px solid white', width: '500px', 'height': '500px', margin: '0px', padding: '0px', position: 'bottom-left', 'background-color': '00000000', shown: false })
Map.add(panelTimeLapse)
var layerClicked = ui.Map.Layer(ee.Image(), {}, 'clicked AOI', false)
Map.layers().add(layerClicked)
var dateStart = '2021-11-01'
var dateStop = '2022-01-01'
function closeInsetMap() {
  if(insetMap != null) {
    ui.url.set('animate', false)
    insetMap.clear()
    panelTimeLapse.widgets().reset([])
    panelTimeLapse.style().set({ shown: false })
    insetMap = null
    layerClicked.setEeObject(ee.Image())
    layerClicked.setShown(false)
  }
}
function showAnimation(pt) {
  closeInsetMap()  
  var checkboxL7 = true, checkboxL8 = true, checkboxS1 = true, checkboxS2 = true
  var lon = pt.lon
  var lat = pt.lat
  var mapZoom = Map.getZoom()
  // print(pt)
  // animate images    
  var map = ui.Map({ lat: pt.lat, lon: pt.lon, zoom: mapZoom }, false, { 
    height: '497px', width: '497px', margin: '0px', padding: '0px'
  })
  map.setOptions('SATELLITE')
  map.setControlVisibility({fullscreenControl: true, all: false, /*layerList: true, */scaleControl: true})
  // map.setLocked(true)
  // add close button
  var closeMapButton = ui.Button('Close')
  closeMapButton.style().set({ margin: '0px', padding: '0px', textAlign: 'left', position: 'bottom-right' })
  map.add(closeMapButton)
  closeMapButton.onClick(function() {
    closeInsetMap()
  })
  insetMap = map
  var scale = Map.getScale()
  var center = ee.Geometry.Point([pt.lon, pt.lat])
  scale = Math.min(19.093, scale)
  var bounds = center.buffer(Map.getScale() * 120).bounds(scale)
  // layerClicked.setEeObject(ee.FeatureCollection([bounds]).style({ width: 2, color: 'ffff00', fillColor: 'ffff0011' }))
  // layerClicked.setShown(true)
  var lon = pt.lon.toString().slice(0,7)
  var lat = pt.lon.toString().slice(0,7)
  var label = ui.Label('Center: ' + lon + ', ' + lat + ', Zoom: ' + Map.getZoom())
  label.style().set({ margin: '0px', padding: '0px', textAlign: 'left', position: 'bottom-left', 'background-color': '#00000033', 'color': 'ffffff'})
  // map.add(label)
  ui.url.set('lon', pt.lon)
  ui.url.set('lat', pt.lat)
  ui.url.set('zoom', Map.getZoom())
  ui.url.set('animate', true)
  // if(waterOccurrenceLayer.getShown()) {
  //   ui.url.set('showWaterOccurrence', true)
  // }
  // if(urbanLayer.getShown()) {
  //   ui.url.set('showUrban', true)
  // }
  // todo show progress    
  // map.onTileLoaded(function(v) {
  //   // var lectTilesPercent = .map(function())
  // })
  panelTimeLapse.widgets().reset([map])
  panelTimeLapse.style().set({ shown: true })
  var imagesRGB = ee.ImageCollection([])
  function mergeNearby(images, vis, sensor, center) {
    var days = ee.List(images.filterBounds(center).map(function(i) { 
      return i.resample('bicubic').set({ date: i.date().format('YYYY-MM-dd HH:00:00').replace(' ', 'T') }) 
    }).aggregate_array('date')).distinct()
    images = days.map(function(d) {
      d = ee.Date(d)
      return images.filterDate(d.advance(-1, 'hour'), d.advance(1, 'hour')).mosaic().visualize(vis).set({ label: d.format().cat(', ').cat(sensor) })
    })
    return ee.ImageCollection(images)
  }
  if(checkboxS1) {
    var minVisS1 = [-18.62, -18.62, -24.119]
    var maxVisS1 = [2.13, 2.13, -2.63]
    var images = ee.ImageCollection("COPERNICUS/S1_GRD")
      .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
      .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
      .filterDate(dateStart, dateStop)
      // .filter(ee.Filter.dayOfYear(150, 200))
      // .sort('system:time_start')
    images = mergeNearby(images, {min: minVisS1, max: maxVisS1, bands: ['VV', 'VV', 'VH'], gamma: 1.4 }, 'S1', center)
    imagesRGB = imagesRGB.merge(images)
  } 
  if(checkboxS2) {
    var images = ee.ImageCollection('COPERNICUS/S2')
      .filterDate(dateStart, dateStop)
    images = mergeNearby(images, {min: 500, max: 4500, bands: ['B12', 'B8', 'B3'], gamma: 1.4 }, 'S2', center)
    imagesRGB = imagesRGB.merge(images)
  }
  if(checkboxL8) {
    var l8 = ee.ImageCollection("LANDSAT/LC08/C01/T1_RT_TOA")
    var l8t2 = ee.ImageCollection("LANDSAT/LC08/C01/T2_TOA")
    var images = l8.filterDate(dateStart, dateStop)
      .merge(l8t2.filterDate(dateStart, dateStop))
      .filter(ee.Filter.gt('SUN_ELEVATION', 0))
    images = mergeNearby(images, {min: 0.05, max: 0.45, bands: ['B6', 'B5', 'B3'], gamma: 1.4 }, 'L8', center)
    imagesRGB = imagesRGB.merge(images)
  }
  // if(checkboxL7) {
  //   var l7 = ee.ImageCollection("LANDSAT/LE07/C01/T1_RT_TOA")
  //   var l7t2 = ee.ImageCollection("LANDSAT/LE07/C01/T2_TOA")
  //   var images = l7.filterDate(dateStart, dateStop).filterBounds(center)
  //     .merge(l7t2.filterDate(dateStart, dateStop).filterBounds(center))
  //   images = assets.composeByDate(images)
  //   images = images
  //     .map(function(i) {
  //       return i.resample('bicubic')
  //         .visualize({min: 0.05, max: 0.45, bands: ['B5', 'B4', 'B2'], gamma: 1.4 })
  //         .set({ 
  //           label: i.date().format('YYYY-MM-dd HH:mm').cat(', L7'),
  //         })
  //     })
  //   print(images)
  //   imagesRGB = imagesRGB.merge(images)
  // }
  var images = ee.ImageCollection(imagesRGB.sort('label'))
  // print(images)
  map.centerObject(bounds)
  var a = animation.animate(images, { 
    map: map, 
    compact: true, 
    // hidePlay: true, 
    maxFrames: 100, 
    timeStep: 250,
    width: '400px',
    label: 'label',
    preloadCount: 5
  })
  a.then(function() {
    // make sure layers are hidden (for speed purposes) when the user zooms-in in the inset map
    map.onChangeZoom(function(i) {
      var sliderValue = a.panel.widgets().get(1).getValue()
      for(var i=0; i<map.layers().length(); i++) {
        if(i != sliderValue) {
          map.layers().get(i).setShown(false)
        }
      }
    })
    a.panel.style().set({ 'background-color': '#00000055' })
    a.panel.widgets().get(0).style().set({ 'background-color': '#00000000' })
    a.panel.widgets().get(1).style().set({ 'background-color': '#00000000' })
    a.panel.widgets().get(2).style().set({ 'background-color': '#00000000' })
    a.panel.widgets().get(0).style().set({ 'color': '#000000' })
    a.panel.widgets().get(1).style().set({ 'color': '#000000' })
    a.panel.widgets().get(1).style().set({ fontSize: 0 })
    a.panel.widgets().get(2).style().set({ 'color': '#ffffff' })
  })
}
Map.onClick(showAnimation)
linkedMap.onClick(showAnimation)
Map.style().set({ cursor: 'crosshair' })
linkedMap.style().set({ cursor: 'crosshair' })