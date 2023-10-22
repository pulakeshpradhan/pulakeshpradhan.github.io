var leftMap = ui.Map()
var rightMap = ui.Map()
leftMap.setControlVisibility(false)
rightMap.setControlVisibility(false)
leftMap.setOptions('HYBRID')
rightMap.setOptions('HYBRID')
var linker = ui.Map.Linker([leftMap, rightMap])
leftMap.setCenter(-87.57,33.21,14)
var image = ee.Image('COPERNICUS/S2_SR/20190128T163541_20190128T163535_T16SDB').aside(print)
var bands = ['B[1-8]','B8A','B9','B11','B12']
var wavelengths = [444,497,560,665,704,740,783,835,865,945,1614,2202]
var filter = image.select(bands)
var display = {
  title: 'Spectral reflectance curve',
  hAxis: {title: 'Wavelength (nm)'},
  vAxis: {title: 'Reflectance'},
  lineWidth: 1,
  pointSize: 3,
  series: {0: {color: 'crimson'},
}}
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  wipe: true,
  style: {stretch: 'both'}
})
ui.root.widgets().reset([splitPanel])
var label = ui.Label(['Sentinel-2 SR Level-1C • 2019-01-28 16:44:20'])
var panel = ui.Panel(label,ui.Panel.Layout.flow('vertical'),{position:'bottom-left'})
var leftLabel = ui.Panel(ui.Label(['True Color (R,G,B)']),ui.Panel.Layout.flow('vertical'),{position:'top-left'})
var rightLabel = ui.Panel(ui.Label(['Color Infrared (NIR,R,G)']),ui.Panel.Layout.flow('vertical'),{position:'top-right'})
leftMap.add(panel)
leftMap.add(leftLabel)
rightMap.add(rightLabel)
panel.widgets().set(1,ui.Label('Click on the map to plot a spectral reflectance curve'))
leftMap.addLayer(image,{min:0,max:1750,bands:['B4','B3','B2']},'True Color (RGB)')
rightMap.addLayer(image,{min:0,max:1750,bands:['B8','B4','B3']},'Vegetation Infrared')
function createChart(location) {
  var lon = location.lon
  var lat = location.lat
  var point = ee.Feature(ee.Geometry.Point([lon,lat])).set('label','point')
  var curve = ui.Chart.image.regions({
    image: filter, 
    regions: point, 
    reducer: ee.Reducer.first(), 
    seriesProperty: 'label',
    scale: 1,
    xLabels: wavelengths
  }).setChartType('LineChart').setOptions(display)
  leftMap.layers().set(1, ui.Map.Layer(point,{color:'crimson'},'dot'))
  rightMap.layers().set(1, ui.Map.Layer(point,{color:'black'},'dot'))
  panel.widgets().set(1,ui.Label('Lon: '+lon.toFixed(3)+', Lat: '+lat.toFixed(3)))
  panel.widgets().set(2,curve)
}
leftMap.onClick(createChart)
rightMap.onClick(createChart)