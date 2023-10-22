// AIzaSyDItV6jEwI7jdCEqLWL4zO-ZzPvKC4193E
var style = require('users/gena/packages:style')
var hydro = require('users/gena/packages:hydro')
var palettes = require('users/gena/packages:palettes')
var assets = require('users/gena/packages:assets')
var animation = require('users/gena/packages:animation')
style.SetMapStyleDark()
Map.setCenter(120.731, 14.5758, 11)
var imageCollection = ee.ImageCollection("JRC/GHSL/P2016/BUILT_LDS_GLOBE_V1"),
    lights = ee.ImageCollection("NOAA/DMSP-OLS/CALIBRATED_LIGHTS_V4");
var waterOccurrence = ee.Image("JRC/GSW1_0/GlobalSurfaceWater")
  .select('occurrence')
  .divide(100)
  .unmask(0)
  .resample('bicubic')
// PuBu[9]
var palette = ["fff7fb","ece7f2","d0d1e6","a6bddb","74a9cf","3690c0","0570b0","045a8d","023858"]
//urban image
var image = ee.Image('JRC/GHSL/P2016/BUILT_LDSMT_GLOBE_V1').resample('bilinear')
function createDarkLayer(opacity) {
  return ui.Map.Layer(ee.Image(1), {palette: ['000000']}, 'black', true, opacity)
}
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
// waterbodies
var waterbodiesAll = ee.FeatureCollection("users/gena/HydroLAKES_polys_v10");
var imageAll = waterbodiesAll.style({ color: '#00FFFF', width: 1, fillColor: '#00FFFF55' })
var layerAll = ui.Map.Layer(imageAll, {}, 'waterbodies', false, 0.85)
hydro.Map.addDemDark()
hydro.Map.addCatchmentsImage(9)
Map.layers().add(layerAll)
//var waterOccurrenceLayer = ui.Map.Layer(waterOccurrence.mask(waterOccurrence.multiply(2).multiply(land)), {min: 0, max: 1, palette: palette}, 'water occurrence', false, 0.9)
var waterOccurrenceLayer = ui.Map.Layer(waterOccurrence.mask(waterOccurrence.multiply(2)), {min: 0, max: 1, palette: palette}, 'water occurrence', false, 0.9)
Map.layers().add(waterOccurrenceLayer)
hydro.Map.addRivers({ minZoom: 8, maxZoom: 25, autoToggle: true, maxFA: 1000, layer: { name: 'rivers', opacity: 0.5, visible: true } })
//hydro.Map.addRivers({ minZoom: 6, maxZoom: 25, autoToggle: true, maxFA: 20000, layer: { name: 'rivers (large)', opacity: 0.85, visible: false } })
Map.layers().add(createUrbanLayer())
// shapefiles
var settlement_points = ee.FeatureCollection("users/fre_d_g/settlement-points"),
    red_cross = ee.FeatureCollection("users/fre_d_g/red_cross_data"),
    manila_bay_spatial = ee.FeatureCollection("users/fre_d_g/manila_bay_spatial");
// Map.addLayer(settlement_points, {color: '#FF0000'});
// Map.addLayer(red_cross);
// Create an empty image into which to paint the features, cast to byte.
var palette = ee.List(palettes.cb.RdYlGn[6]);
function getStyle(features, property) {
  var minMax =  features.reduceColumns(ee.Reducer.percentile([2, 98], ['min', 'max']), [property])
  var min = ee.Number(minMax.get('min'))
  var max = ee.Number(minMax.get('max'))
  var range = max.subtract(min)
  return function(value) {
    var ratio = ee.Number(value).subtract(min).divide(range) // compute ratio
      .max(min).min(max) // clamp to [0, 1]
    var index = ratio.multiply(palette.length()).floor()
    var color = palette.get(index)
    return { fillColor: color }
  }
}
// Poverty style
var stylePoverty = getStyle(red_cross, 'poverty_in')
red_cross = red_cross.filter(ee.Filter.neq('poverty_in', null)).map(function(f) {
  var style = stylePoverty(ee.Number(f.get('poverty_in')))
  return f.set({ style: style })
})
var red_cross_poverty = red_cross.style({ styleProperty: 'style' })
Map.addLayer(red_cross_poverty, {}, 'Poverty incidence', false)
// HDI style
var styleHdi = getStyle(red_cross, 'hdi')
red_cross = red_cross.filter(ee.Filter.neq('hdi', null)).map(function(f) {
  var style = styleHdi(ee.Number(f.get('hdi')))
  return f.set({ style: style })
})
var red_cross_hdi = red_cross.style({ styleProperty: 'style' })
Map.addLayer(red_cross_hdi, {}, 'HDI', false)
// Flood style
var styleFlood = getStyle(red_cross, 'flood_phys')
red_cross = red_cross.filter(ee.Filter.neq('flood_phys', null)).map(function(f) {
  var style = styleFlood(ee.Number(f.get('flood_phys')))
  return f.set({ style: style })
})
var red_cross_flood = red_cross.style({ styleProperty: 'style' })
Map.addLayer(red_cross_flood, {}, 'Flood exposure', false)
// mangroves
var mangroves = ee.ImageCollection("LANDSAT/MANGROVE_FORESTS");
mangroves = mangroves.max()
var mangrovesEdges = ee.Algorithms.CannyEdgeDetector(mangroves, 0.1, 0)
Map.addLayer(mangroves, { palette: ['#addd8e'] }, 'mangroves')
// Map.addLayer(mangrovesEdges.mask(mangrovesEdges), { palette: ['#ff0000'] }, 'mangroves (edges)')
// add composite images (timelapse)
var imageNames = 
[
  'users/gena/manila-bay-atlas/composite-p40-0-7237-0',
  'users/gena/manila-bay-atlas/composite-p40-1-7237-0',
  'users/gena/manila-bay-atlas/composite-p40-2-7237-0', 
  'users/gena/manila-bay-atlas/composite-p40-3-7237-0', 
  'users/gena/manila-bay-atlas/composite-p40-4-7237-0', 
  'users/gena/manila-bay-atlas/composite-p40-5-7237-0', 
  'users/gena/manila-bay-atlas/composite-p40-6-7237-0', 
  'users/gena/manila-bay-atlas/composite-p40-7-7237-0', 
  'users/gena/manila-bay-atlas/composite-p40-8-7237-0', 
  'users/gena/manila-bay-atlas/composite-p40-9-7237-0', 
  'users/gena/manila-bay-atlas/composite-p40-10-7237-0',
  'users/gena/manila-bay-atlas/composite-p40-11-7237-0',
  'users/gena/manila-bay-atlas/composite-p40-12-7237-0',
  'users/gena/manila-bay-atlas/composite-p40-13-7237-0',
  'users/gena/manila-bay-atlas/composite-p40-14-7237-0',
  'users/gena/manila-bay-atlas/composite-p40-15-7237-0',
  'users/gena/manila-bay-atlas/composite-p40-16-7237-0',
  'users/gena/manila-bay-atlas/composite-p40-17-7237-0',
  'users/gena/manila-bay-atlas/composite-p40-18-7237-0',
  'users/gena/manila-bay-atlas/composite-p40-19-7237-0',
  'users/gena/manila-bay-atlas/composite-p40-20-7237-0',
  'users/gena/manila-bay-atlas/composite-p40-21-7237-0',
  'users/gena/manila-bay-atlas/composite-p40-22-7237-0',
  'users/gena/manila-bay-atlas/composite-p40-23-7237-0',
  'users/gena/manila-bay-atlas/composite-p40-24-7237-0',
  'users/gena/manila-bay-atlas/composite-p40-25-7237-0',
  'users/gena/manila-bay-atlas/composite-p40-26-7237-0',
  'users/gena/manila-bay-atlas/composite-p40-27-7237-0',
  'users/gena/manila-bay-atlas/composite-p40-28-7237-0',
  'users/gena/manila-bay-atlas/composite-p40-29-7237-0',
]
var images = imageNames.map(function(name) {
  var image = ee.Image(name).resample('bicubic')
  return image.set({
      label: image.date().format('YYYY') 
    })
})
animation.animate(images, {
  vis: { min: 0.05, max: 0.35, gamma: 1.3 },
  preload: false,
  width: '500px',
  position: 'bottom-right',
  label: 'label'
})
// average waterdepth 2015
var table = ee.FeatureCollection("users/hendriksengerrit/depthavg");
var fc = ee.FeatureCollection(table);
//Map.addLayer(fc, {}, 'Average model depth');
// Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();
// Paint the edges with different colors, display.
var fills = empty.paint({
  featureCollection: fc,
  color: 'DepthAVG'
});
var palette = ['#f1eef6','#d0d1e6','#a6bddb','#74a9cf','#2b8cbe','#045a8d'];
Map.addLayer(fills, {palette: palette, min: 0, max: 4}, 'average waterdepth 2015', false);