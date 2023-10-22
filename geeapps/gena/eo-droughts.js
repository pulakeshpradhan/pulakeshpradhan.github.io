var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                4.892690375393927,
                51.64133522872502
              ],
              [
                4.700429633206427,
                49.297684749598766
              ],
              [
                4.889609612097816,
                47.593655127150704
              ],
              [
                5.430352090989166,
                47.82387982075448
              ],
              [
                6.958120062893927,
                50.44119942460283
              ],
              [
                6.958120062893927,
                51.64133522872502
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
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
    ee.Geometry.Polygon(
        [[[4.892690375393927, 51.64133522872502],
          [4.700429633206427, 49.297684749598766],
          [4.889609612097816, 47.593655127150704],
          [5.430352090989166, 47.82387982075448],
          [6.958120062893927, 50.44119942460283],
          [6.958120062893927, 51.64133522872502]]], null, false);
var minVV = -25
var maxVV = -2
var smoothingRadius = 30
var imagesAll = ee.ImageCollection("COPERNICUS/S1_GRD")
  .filterDate('2020-01-01', '2022-01-01')
  .filterBounds(geometry)
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
  .filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'))
  .select(['VV', 'VH'])
print(imagesAll.filterBounds(Map.getCenter()).sort('system:time_start', false).limit(10).aggregate_array('system:time_start').map(function(t) { return ee.Date(t) }))
var aoi = imagesAll.filterDate('2021-07-15', '2021-07-16').filterBounds(geometry).geometry()
var images15 = imagesAll.filterDate('2021-07-15', '2021-07-16').map(function(i) { return i.resample('bicubic')})
// Map.addLayer(images15.geometry(), {}, 'outline 15', false)
var image15 = images15.mosaic().focal_mean(smoothingRadius, 'circle', 'meters')
var images10 = imagesAll.filterDate('2021-07-09', '2021-07-13').map(function(i) { return i.resample('bicubic')})
// Map.addLayer(images10.geometry(), {}, 'outline 10', false)
var image10 = images10.mosaic().focal_mean(smoothingRadius, 'circle', 'meters')
var imagesAllJuly = imagesAll
  .filterDate('2020-01-01', '2021-07-01')
  .filter(ee.Filter.dayOfYear(150, 200))
  // .filterDate('2020-07-01', '2021-07-13')
  .map(function(i) { return i.resample('bicubic')})
print(imagesAllJuly.size())  
imagesAllJuly = imagesAllJuly
  .mean()
  .rename(['VV_mean', 'VH_mean'])
Map.addLayer(imagesAllJuly  , { min: minVV, max: maxVV, bands: ['VV_mean', 'VV_mean', 'VH_mean']}, 'Mean of June-July, 2020-2021', false)
// Map.addLayer(image10, { min: minVV, max: maxVV, bands: ['VV', 'VV', 'VH']}, 'VV VH 10', false)
// Map.addLayer(image10.addBands(imagesAllJuly), { min: minVV, max: maxVV, bands: ['VV', 'VV_mean', 'VV_mean']}, '10 vs MEAN VV', false)
// Map.addLayer(image10.addBands(imagesAllJuly), { min: minVV, max: maxVV, bands: ['VH', 'VH_mean', 'VH_mean']}, '10 vs MEAN VH', false)
// var composite10 = image10.addBands(imagesAllJuly).select(['VV', 'VV_mean']).rename(['b1', 'b2']).unitScale(minVV, maxVV)
//   // .add(image10.addBands(imagesAllJuly).unitScale(minVV, maxVV).select('VH', 'VH_mean').rename(['b1', 'b2'])).multiply(0.5)
// Map.addLayer(composite10, { bands: ['b1', 'b1', 'b2'], min: [0, 0, 0], max: [1, 1, 1] }, 'composite 10')
// Map.addLayer(image15, { min: minVV, max: maxVV, bands: ['VV', 'VV', 'VH']}, 'VV VH 15', false)
// Map.addLayer(image15.addBands(imagesAllJuly), { min: minVV, max: maxVV, bands: ['VV', 'VV_mean', 'VV_mean']}, '15 vs MEAN VV', false)
// Map.addLayer(image15.addBands(imagesAllJuly), { min: minVV, max: maxVV, bands: ['VH', 'VH_mean', 'VH_mean']}, '15 vs MEAN VH', false)
var composite15 = image15.addBands(imagesAllJuly).select(['VV', 'VV_mean']).rename(['b1', 'b2']).unitScale(-18, -2)
  // .add(image15.addBands(imagesAllJuly).unitScale(minVV, maxVV).select('VH', 'VH_mean').rename(['b1', 'b2'])).multiply(0.5)
Map.addLayer(composite15, { bands: ['b1', 'b1', 'b2'], min: [0, 0, 0], max: [1, 1, 1] }, 'Flood Composite, July 15, 2021')
Map.addLayer(image15, { min: minVV, max: maxVV, bands: ['VV', 'VV', 'VH']}, 'July 15, 2021', false)
// flood water
// b1 0.12 -0.27 - not flood
// b2 0.45 0.18
var p1 = composite15.select('b1').multiply(-1).unitScale(-0.2, 0.1)
// Map.addLayer(p1, {}, 'p1', false)
var p2 = composite15.select('b2').unitScale(-0.2, 0.2) // excludes permanent water
// Map.addLayer(p2, {}, 'p2', false)
var flood = p1.multiply(p2)
var floodRGB = ee.Image(1).visualize({palette: ['black'], opacity: 0.5}).blend(flood.selfMask().visualize({ palette: ['00ffff'] }))
var layerFlood = ui.Map.Layer(floodRGB, {}, 'flood', true, 0.9)
Map.layers().add(layerFlood)
// 4x, less sensitive
var p1 = composite15.select('b1').multiply(-1).unitScale(-0.2, 0.1)
// Map.addLayer(p1, {}, 'p1', false)
var p2 = composite15.select('b2').unitScale(-0.2, 0.2) // excludes permanent water
// Map.addLayer(p2, {}, 'p2', false)
var flood = p1.multiply(p2)
// var floodUpscaled = flood.reproject(ee.Projection('EPSG:3857').atScale(20/*Map.getScale() / 6*/)).reduceResolution({reducer: ee.Reducer.max(), bestEffort: false, maxPixels: 10000}).selfMask()
var floodUpscaled = ee.Image('users/gena/flood-eu-2021')
var floodRGBUpscaled = ee.Image(1).visualize({palette: ['black'], opacity: 0.5}).blend(floodUpscaled.visualize({ palette: ['00ffff'] }))
// var layerFloodUpscaled = ui.Map.Layer(floodRGBUpscaled, {}, 'flood 6x', false, 0.9)
// Map.layers().add(layerFloodUpscaled)
layerFlood.setEeObject(floodRGBUpscaled)
Map.onChangeZoom(function(z) {
  // if((!layerFlood.getShown()) && (!layerFloodUpscaled.getShown())) {
  //   return
  // }
  if(z > 10) {
    layerFlood.setEeObject(floodRGB)
  } else {
    layerFlood.setEeObject(floodRGBUpscaled)
  }
})
// Export.image.toAsset({
//   image: flood.reproject(ee.Projection('EPSG:3857').atScale(10)).reduceResolution({reducer: ee.Reducer.max(), bestEffort: false, maxPixels: 10000}).selfMask(), 
//   description: 'flood-eu-2021', 
//   assetId: 'users/gena/flood-eu-2021',
//   region: aoi, 
//   scale: 100, 
//   crs: 'EPSG:3857'
// })
Map.setCenter(5.8402859696453335, 50.83583022898479, 9)
Map.setOptions('HYBRID')
Map.style().set({ cursor: 'crosshair' })
var layerClicked = ui.Map.Layer(ee.Image(), {}, 'clicked AOI', false)
Map.layers().add(layerClicked)
// animation
var animation = require('users/gena/packages:animation')
var insetMap = null
var panelTimeLapse = ui.Panel([])
panelTimeLapse.style().set({ width: '500px', 'height': '500px', position: 'bottom-right', 'background-color': '00000000', shown: false })
Map.add(panelTimeLapse)
Map.onClick(function(pt) {
  var mapZoom = Map.getZoom()
  print(pt)
  // animate images    
  var map = ui.Map({ lat: pt.lat, lon: pt.lon, zoom: mapZoom }, false, { height: '480px', width: '480px', position: 'middle-right'})
  // add close button
  var closeMapButton = ui.Button('Close')
  closeMapButton.style().set({ margin: '0px', padding: '0px', textAlign: 'left', position: 'bottom-right' })
  map.add(closeMapButton)
  closeMapButton.onClick(function() {
    if(insetMap != null) {
      insetMap.clear()
      panelTimeLapse.widgets().reset([])
      panelTimeLapse.style().set({ shown: false })
      insetMap = null
      layerClicked.setEeObject(ee.Image())
      layerClicked.setShown(false)
    }
  })
  insetMap = map
  var scale = Map.getScale()
  var center = ee.Geometry.Point([pt.lon, pt.lat])
  scale = Math.min(19.093, scale)
  var bounds = center.buffer(scale * 120).bounds(scale)
  layerClicked.setEeObject(ee.FeatureCollection([bounds]).style({ width: 2, color: '00ffff', fillColor: '00ffff11' }))
  layerClicked.setShown(true)
  map.setOptions('SATELLITE')
  map.centerObject(bounds)
  map.setControlVisibility({all: false,/*, layerList: true*/ scaleControl: true})
  map.setLocked(true)
  // todo show progress    
  // map.onTileLoaded(function(v) {
  //   // var lectTilesPercent = .map(function())
  // })
  panelTimeLapse.widgets().reset([map])
  panelTimeLapse.style().set({ shown: true })
  var images = imagesAll
    .filterBounds(center)
    .filter(ee.Filter.dayOfYear(150, 200))
    .sort('system:time_start')
    .map(function(i) {
    return i
      .visualize({min: minVV, max: maxVV, bands: ['VV', 'VV', 'VH'] })
      .set({ 
        label: i.date().format('YYYY-MM-dd'),
        hasValues: i.select('VV').reduceRegion(ee.Reducer.anyNonZero(), bounds, scale * 10)
      })
  })
  print(images.aggregate_array('hasValues'))
  var a = animation.animate(images, { 
    map: map, 
    compact: true, 
    hidePlay: true, 
    maxFrames: 50, 
    width: '350px',
    label: 'label',
    preloadCount: 5
  })
  a.then(function() {
    // map.addLayer(ee.FeatureCollection([bounds]).style({ width: 2, color: '00ffff', fillColor: '00ffff11' }), {}, 'bounds')
    // var edges = ee.Algorithms.CannyEdgeDetector(image.select('Alert').unmask(0, false).resample(resamplingMode), 0.1)
    // map.addLayer(edges.selfMask(), { palette: ['fd8d3c'], min: 0, max: 1 }, 'alert', true, 0.5)
    a.panel.style().set({ 'background-color': '#00000022' })
    a.panel.widgets().get(0).style().set({ 'background-color': '#00000000' })
    a.panel.widgets().get(1).style().set({ 'background-color': '#00000000' })
    a.panel.widgets().get(2).style().set({ 'background-color': '#00000000' })
    a.panel.widgets().get(0).style().set({ 'color': '#000000' })
    a.panel.widgets().get(1).style().set({ 'color': '#000000' })
    a.panel.widgets().get(1).style().set({ fontSize: 0 })
    a.panel.widgets().get(2).style().set({ 'color': '#ffffff' })
    // change properties of the main panel of animation controls
    // print(a.panel)
    // a.panel.widgets().reset([])
  })
})