var col = ['e40000','ffa216','fffc95','6ec9ff','6200ff']
var hollow = {color: 'black', width: 1, fillColor: '00000000'}
var farm = ee.FeatureCollection(
  ee.Geometry.Polygon(
    [[[35.54429141752543, -14.778297589413821],
      [35.544477831051964, -14.77836891015013],
      [35.54463339917483, -14.778003229036157],
      [35.5444483267528, -14.777938391894944]
    ]]
  )
)
var ebee = ee.Image('users/cartoscience/sUAS_classify/Nyambi_27cm_Red').rename('red')
  .addBands(ee.Image('users/cartoscience/sUAS_classify/Nyambi_27cm_NIR').rename('NIR'))
  .normalizedDifference(['NIR','red'])
  .rename('NDVI')
var bounds = ebee.geometry().bounds()
var sentinel2 = ee.Image('COPERNICUS/S2/20180220T072931_20180220T074322_T36LYJ')
  .normalizedDifference(['B8','B4'])
  .rename('NDVI')
var landsat = ee.Image('LANDSAT/LC08/C02/T1_TOA/LC08_167070_20180106')
  .normalizedDifference(['B5','B4'])
  .rename('NDVI')
var modis = ee.Image('MODIS/061/MOD13Q1/2018_02_18')
  .select('NDVI')
  .multiply(0.0001)
var viirs = ee.Image('NOAA/VIIRS/001/VNP13A1/2018_02_26')
  .select('NDVI')
  .multiply(0.0001)
var avhrr = ee.Image('NOAA/CDR/AVHRR/NDVI/V5/20180228')
  .select('NDVI')
  .multiply(0.0001)
var images = {
  'eBee UAS (27-cm)': [ebee, 0, 0.9],
  'Sentinel-2 (10-m)': [sentinel2, 0, 0.8],
  'Landsat 8 (30-m)': [landsat, 0, 0.8],
  'MODIS (250-m)': [modis, 0.2, 1],
  'VIIRS (500-m)': [viirs, 0.5, 0.8],
  'AVHRR (5566-m)': [avhrr, 0, 0.2],
}
var leftMap = ui.Map()
var leftSelector = addLayerSelector(leftMap, 0, 'top-left')
var rightMap = ui.Map()
var rightSelector = addLayerSelector(rightMap, 1, 'top-right')
function addLayerSelector(mapToChange, defaultValue, position) {
  function updateMap(selection) {
    mapToChange.layers().set(0, ui.Map.Layer(images[selection][0],{min: images[selection][1], max: images[selection][2], palette:col},selection))
    mapToChange.layers().set(1, ui.Map.Layer(farm.style(hollow),{},'Farm'))
  }
  var select = ui.Select({items: Object.keys(images), onChange: updateMap, style: {margin: '0', width: '120px'}})
  select.setValue(Object.keys(images)[defaultValue], true)
  var zoomButton = ui.Button('Zoom to farm', zoom2farm , null, {margin: '0', width: '120px'})
  function toggleImagery () {
    if (mapToChange.layers().get(0).get('shown') === true) {
      mapToChange.layers().get(0).set('shown', false)
    } else {
      mapToChange.layers().get(0).set('shown', true)
    }
  }
  var button = ui.Button('Toggle imagery', toggleImagery, false, {margin: '0', width: '120px'})
  function ColorBar(palette) {
    return ui.Thumbnail({
      image: ee.Image.pixelLonLat().select(0),
      params: {
        bbox: [0, 0, 1, 1],
        dimensions: '75x10',
        format: 'png',
        palette: palette,
      },
      style: {
        stretch: 'horizontal', 
        margin: '8px 0 0 0'
      },
    })
  }
  var valStyle = {
    margin: '4px 5px 0 5px', 
    fontSize: '12px', 
    color: 'ffffff',
    backgroundColor: '303030'
  }
  var labStyle = {
    margin: '6px 5px -2px 5px', 
    fontSize: '12px', 
    color: 'ffffff',
    backgroundColor: '303030',
    stretch: 'horizontal',
    textAlign: 'center',
    fontWeight: 'bold'
  }
  var val0 = ui.Label('low', valStyle)
  var val100 = ui.Label('high', valStyle)
  var label = ui.Label('NDVI', labStyle)
  var legend =  ui.Panel({
    widgets: [val0, ColorBar(col), val100],
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {
      color: 'ffffff',
      backgroundColor: '303030',
      margin: '0',
      width: '120px'
    }
  })
  var controlPanel =
      ui.Panel({widgets: [select,button,zoomButton,label, legend], style: {position: position, backgroundColor:'303030'}})
  mapToChange.add(controlPanel)
}
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  wipe: true,
  style: {stretch: 'both'}
})
ui.root.widgets().reset([splitPanel])
var linker = ui.Map.Linker([leftMap, rightMap])
leftMap.centerObject(ebee).setOptions('SATELLITE')
rightMap.setOptions('SATELLITE')
leftMap.setControlVisibility(false)
rightMap.setControlVisibility(false)
function zoom2farm () {
  leftMap.setCenter(35.544462, -14.778146,19)
}
function toggleImagey () {
}