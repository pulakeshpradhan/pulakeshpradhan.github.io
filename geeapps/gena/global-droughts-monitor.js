var gaul = ui.import && ui.import("gaul", "table", {
      "id": "FAO/GAUL/2015/level2"
    }) || ee.FeatureCollection("FAO/GAUL/2015/level2"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.MultiPoint(),
    admin = ui.import && ui.import("admin", "table", {
      "id": "FAO/GAUL/2015/level2"
    }) || ee.FeatureCollection("FAO/GAUL/2015/level2"),
    gadm = ui.import && ui.import("gadm", "table", {
      "id": "users/gena/GADM36"
    }) || ee.FeatureCollection("users/gena/GADM36"),
    jrc = ui.import && ui.import("jrc", "image", {
      "id": "JRC/GSW1_2/GlobalSurfaceWater"
    }) || ee.Image("JRC/GSW1_2/GlobalSurfaceWater");
Map.setOptions('HYBRID')
var landcover = ee.Image("COPERNICUS/Landcover/100m/Proba-V-C3/Global/2019");
var all = landcover.select('discrete_classification');
// Map.addLayer(all, {}, "Land Cover");
var crops = all.eq(40)
crops = crops.updateMask(crops.multiply(landcover.select('crops-coverfraction').divide(100)))
Map.addLayer(crops, { palette: ['green']}, 'crops')
// var table = ee.FeatureCollection("users/ptrambauer/IrrigatedAreasMali");
// Map.addLayer(table)
// var image = table.reduceToImage(['EV_Niger26'], ee.Reducer.first())
// image = image.mask(image.unitScale(0, 2000))  
// Map.addLayer(image, { min: 0, max: 3000, palette: ['white', 'blue']}, 'irrigation areas 26')
// Map.addLayer(admin)
var ndvi = ee.ImageCollection("MODIS/006/MOD13Q1").select('NDVI')
/*
VCI = (NDVI - NDVI_min) / (NDVI_max - NDVI_min)
NDVI_min, NDVI_max - minimum weekly NDVI
*/
function computeVCI(image) {
  var date = image.date()
  var doy = date.getRelative('day', 'year')
  var imagesDoy = ndvi.filter(ee.Filter.calendarRange(doy.subtract(5).max(0), doy.add(5), 'day_of_year'))
  var ndviMin = imagesDoy.min()
  var ndviMax = imagesDoy.max()
  return image.subtract(ndviMin).divide(ndviMax.subtract(ndviMin))
    .set({ 'system:time_start': date.millis() })
    .set({ label: date.format('YYYY-MM-dd' )})
}
var vci = ndvi.map(computeVCI)
Map.addLayer(vci, {}, 'VCI', false)
Map.addLayer(vci.first(), { min: 0, max: 1, palette: ['ff0000', 'ffff00', '00ff00'] }, 'VCI', false)
// var animation = require('users/gena/packages:animation')
// animation.animate(vci.limit(10), { vis: { min: 0, max: 1, palette: ['000000', 'ffff00', 'ff0000'] }, label: 'label' })
Map.addLayer(ndvi, {}, 'NDVI (raw)', false)
var ndviPalette = ['#640000', '#ff0000', '#ffff00', '#00c800', '#006400']
Map.addLayer(ndvi.filterDate('2010-01-01', '2015-01-01').mean().unitScale(2000, 6000).selfMask(), { palette: ndviPalette }, 'mean')
// Map.addLayer(ndvi.reduce(ee.Reducer.stdDev()), { min: 500, max: 8000 }, 'std', false)
// Map.addLayer(ndvi, {}, 'NDVI (raw)', false)
Map.setOptions('SATELLITE')
var panel = ui.Panel([], ui.Panel.Layout.flow('vertical'), { position: 'bottom-right', width: '500px', height: '500px' })
Map.add(panel)
var layerCurrentNDVI = ui.Map.Layer(ee.Image(), { palette: ndviPalette }, 'NDVI current')
Map.layers().add(layerCurrentNDVI)
Map.onClick(function(pt) {
  pt = ee.Geometry.Point([pt.lon, pt.lat])
  var selectedAdm = gadm.filterBounds(pt)
  layerSelectedArea.setEeObject(selectedAdm.style({width: 1, color: 'ffff00', fillColor: 'ffff0055' }))
  var chartNDVI = ui.Chart.image.series(ndvi, pt, ee.Reducer.first(), Map.getScale())
  var chartVCI = ui.Chart.image.series(vci, pt, ee.Reducer.first(), Map.getScale())
  chartVCI.onClick(function(v) { 
    var ndviCurrent = ndvi.filterDate(ee.Date(v)).first().unitScale(2000, 6000).selfMask()
    layerCurrentNDVI.setEeObject(ndviCurrent)
  })
  panel.widgets().reset([])
  panel.widgets().add(chartNDVI)
  panel.widgets().add(chartVCI)
})
var palettes = require('users/gena/packages:palettes')
Map.addLayer(jrc.select('occurrence').divide(100), { palette: palettes.cb.Blues[7]}, 'water occurrence')
var urban = all.eq(50)
Map.addLayer(urban.selfMask(), { palette: ['red']}, 'urban', true, 0.5)
Map.addLayer(gadm.style({ width: 2, color: '000000', fillColor:'00000022'}), {}, 'GADM')
var layerSelectedArea = ui.Map.Layer(ee.Image(), {}, 'selected area')
Map.layers().add(layerSelectedArea)