var buildup = ui.import && ui.import("buildup", "image", {
      "id": "JRC/GHSL/P2016/BUILT_LDSMT_GLOBE_V1"
    }) || ee.Image("JRC/GHSL/P2016/BUILT_LDSMT_GLOBE_V1"),
    land = ui.import && ui.import("land", "image", {
      "id": "users/gena/land_polygons_image"
    }) || ee.Image("users/gena/land_polygons_image"),
    countries = ui.import && ui.import("countries", "table", {
      "id": "USDOS/LSIB_SIMPLE/2017"
    }) || ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017"),
    imageCollection = ui.import && ui.import("imageCollection", "imageCollection", {
      "id": "JRC/GHSL/P2016/POP_GPW_GLOBE_V1"
    }) || ee.ImageCollection("JRC/GHSL/P2016/POP_GPW_GLOBE_V1"),
    image = ui.import && ui.import("image", "image", {
      "id": "JAXA/ALOS/AW3D30/V2_2"
    }) || ee.Image("JAXA/ALOS/AW3D30/V2_2");
var utils = require('users/gena/packages:utils')
var showTerrain = false
var dem = image.select('AVE_DSM')
Map.style().set({ cursor: 'crosshair' })
Map.setCenter(6.624, 48.097, 5)
var names = countries.aggregate_array('country_na').distinct().sort().getInfo()
var countryLayer = ui.Map.Layer(ee.Image(), {}, 'country', false)
function onSelectCountry(country) {
  var country = countries.filter(ee.Filter.eq('country_na', country))
  Map.centerObject(country.geometry())
  countryLayer.setShown(true)
  var c = ee.Image(1).float().paint(country, 0).selfMask().visualize({ opacity: 0.7, min: 0, max: 1, palette: ['#ffffff', '#000000']})
  countryLayer.setEeObject(c)
}
Map.onClick(function(pt) {
  pt = ee.Geometry.Point([pt.lon, pt.lat])
  var selection = countries.filterBounds(pt)
  if(selection.size().getInfo() == 0) {
    countryLayer.setEeObject(ee.Image())
    countrySelect.setValue(null, false)
  } else {
    var countryName = selection.first().get('country_na').getInfo()
    countrySelect.setValue(countryName, true)
l  }
})
function onShowTerrain(show) {
  showTerrain = show
  imageLayer.setEeObject(render(Map.getScale()))  
}
var showTerrainCheckbox = ui.Checkbox('Show Terrain', false, onShowTerrain)
var countrySelect = ui.Select(names, 'Select country ...', null, onSelectCountry)
var l1 = ui.Label({style: { backgroundColor: '#33a02c99', padding: '8px', margin: '6px 0px 0px 0px', border: '1px solid black' } });
var l2 = ui.Label('- nobody lives here')
var legend = ui.Panel([l1, l2], ui.Panel.Layout.flow('horizontal'))
var panel = ui.Panel([showTerrainCheckbox, countrySelect, legend], null, {
  position: 'top-left'
})
Map.add(panel)
buildup = buildup.unmask(1, false)
var cnf = buildup.select('cnfd').resample('bicubic')
// var builtuphs = ee.Terrain.hillshade(buildup.select('built'), 100)
//   .visualize({ palette:['white', 'white', 'ff7f00', 'ff7f00'], min: 167, max: 194 })
var nobody = cnf.updateMask(ee.Image.constant(50).subtract(cnf))
  .updateMask(land.mask())
  .visualize({ palette: ['33a02c'] })
var water = buildup.select('built').eq(1).or(land.mask().not()).selfMask().visualize({ palette: ['e5f5f9'] })
var isPopulation =  imageCollection.sort('system:time_start', false).first().gt(100)
function render(scale) {
  var web = ee.Projection('EPSG:3857')
  var image = buildup.select('built').gt(2).or(isPopulation)
    .reproject(web.atScale(scale / 2))
    .reduceResolution(ee.Reducer.max(), false, 16)
    .reproject(web.atScale(scale)).not()
  image = image.visualize({ palette: ['fdbb84', '33a02c'] })
  if(showTerrain) {
    var weight = 0.5
    var extrusion = 5
    var sunAzimuth = 315
    var sunElevation = 15
    var contrast = 0.3
    var brightness = 0
    var saturation = 1.1
    var shadows = false
    image = utils.hillshadeRGB(image, dem, weight, extrusion, 
                                           sunAzimuth, sunElevation, contrast, brightness, saturation, shadows)
  }
  image = image.blend(water)
  return image
}
var scale = Map.getScale()
var imageLayer = ui.Map.Layer(render(Map.getScale()), {}, 'nobody', true, 0.9)
Map.onChangeZoom(function(zoom) {
  imageLayer.setEeObject(render(Map.getScale()))  
})
Map.layers().add(imageLayer)
var image = nobody.blend(water)
// Map.addLayer(image, {}, 'nobody', true, 0.8)
Map.layers().add(countryLayer)
Map.setOptions('SATELLITE')
Map.setControlVisibility({
  all: false,
  layerList: true,
  zoomControl: true,
  scaleControl: true, 
  mapTypeControl: true, 
  fullscreenControl: true
})