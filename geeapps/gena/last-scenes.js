Map.setOptions('HYBRID')  
Map.setCenter(16, 15, 2)
var missions = [
  { name: 'Sentinel-2', asset: 'COPERNICUS/S2', color: 'ffff00' },
  { name: 'Landsat 8 T1', asset: 'LANDSAT/LC08/C01/T1_RT', color: 'ff00ff' },
  { name: 'Landsat 8 T2', asset: 'LANDSAT/LC08/C01/T2', color: 'ff00ff' },
  { name: 'Landsat 7 T1', asset: 'LANDSAT/LE07/C01/T1_RT', color: '00ffff' },
  { name: 'Landsat 7 T2', asset: 'LANDSAT/LE07/C01/T2', color: '00ffff' }
]
var now = ee.Date(Date.now()).format('YYYY-MM-dd')
var dates = ee.List.sequence(-1, 10).map(function(d) {
  return ee.Date(now).advance(ee.Number(d).multiply(-1), 'day')
})
var frames = dates.map(function(t) {
  var t1 = ee.Date(t)
  var t0 = t1.advance(-1, 'day')
  var count = ee.Number(0)
  var outlines = missions.map(function(m) {
    var images = ee.ImageCollection(m.asset)
      .select(0)
      .filterDate(t0, t1)
    count = count.add(images.size())
    return images
      .style({ color: m.color, fillColor: m.color + '55', width: 1})
  })
  return ee.ImageCollection.fromImages(outlines).mosaic()
    .set({ label: t0.format('YYYY-MM-dd').cat(' ').cat(count.format('%d'))})
})
var animation = require('users/gena/packages:animation')
animation.animate(frames, { label: 'label', compact: true })