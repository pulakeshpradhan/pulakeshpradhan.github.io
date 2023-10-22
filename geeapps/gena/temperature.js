Map.setOptions('SATELLITE')
Map.setCenter(2.3352, 48.86125, 14)
Map.style().set('cursor', 'crosshair')
var image = ee.Image('LANDSAT/LC09/C02/T1_TOA/LC09_199026_20220704')
  .select('B10')
  .resample('bicubic')
  .subtract(273.15) // K > C
var palette = ["042333", "2c3395", "744992", "b15f82", "eb7958", "fbb43d", "e8fa5b"]
Map.addLayer(image, { palette: palette, min: 20, max: 35 }, 'temp', true, 0.6)
var labelDate = ui.Label('Date: 2022-07-04')
labelDate.style().set({ position: 'bottom-right' })
Map.add(labelDate)
var label = ui.Label('Click on the map to query temperature value')
Map.add(label)
var clickedPointLayer = ui.Map.Layer(ee.Image(), {}, 'clicked point')
Map.layers().add(clickedPointLayer)
Map.onClick(function(pt) {
  var geometry = ee.Geometry.Point([pt.lon, pt.lat])
  clickedPointLayer.setEeObject(ee.FeatureCollection([geometry.buffer(30)]).style({ width: 1, color: '00ffff', fillColor: '00ffff20'}))
  image.reduceRegion(ee.Reducer.mean(), geometry, 30).evaluate(function(v) {
    label.setValue('Clicked point: ' + Number(pt.lon).toFixed(3) + ', ' + Number(pt.lat).toFixed(3) + ', Temperature: ' + Number(v.B10).toFixed(1) + ' C')
  })
})