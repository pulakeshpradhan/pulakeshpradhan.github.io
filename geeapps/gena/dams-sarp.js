print(Map.getCenter())
print(Map.getZoom())
Map.setCenter(-91.83, 35.32, 10)
Map.addLayer(ee.Image(0), {}, 'black', true, 0.4)
Map.setOptions('TERRAIN')
var naip = ee.ImageCollection("USDA/NAIP/DOQQ");
var image = naip.filterDate('2016-01-01', '2019-01-01').mosaic()
  .normalizedDifference(['G', 'N'])
//var palette = ['ffffb2', 'fecc5c', 'fd8d3c', 'e31a1c'].reverse()
var palette = ['eff3ff', 'bdd7e7', '6baed6', '2171b5']
image = image.unitScale(-0.1, 0.6)
var naipLayer = ui.Map.Layer(image.mask(image), {palette: palette}, 'water?')
Map.layers().add(naipLayer)
Map.onChangeZoom(function(z) {
  if(z < 9) {
    if(naipLayer.getShown()) {
      naipLayer.setShown(false)
    }
   } else {
    if(!naipLayer.getShown()) {
      naipLayer.setShown(true)
    }
   }
})
var damsGOOD2 = ee.FeatureCollection("users/gena/eo-reservoirs/dams-GOOD2")
var damsWays = ee.FeatureCollection("users/gena/eo-reservoirs/dams-ways-old")
var damsNodes = ee.FeatureCollection("users/gena/eo-reservoirs/dams-nodes-old")
var damsNWIS_validation = ee.FeatureCollection("users/gena/eo-reservoirs/dams-NWIS")
var damsOSMLine = ee.FeatureCollection("users/gena/osm-dam-line")
var damsOSMPoint = ee.FeatureCollection("users/gena/osm-dam-point")
var damsOSMPoly = ee.FeatureCollection("users/gena/osm-dam-poly")
var damsAquastat = ee.FeatureCollection('ft:1JEYbvAwi-hV915oLk4t4mNuhrdNU_kKQX-_HgGdW')
var damsGRaND = ee.FeatureCollection('ft:1gC7USkuJloeUn7Odw6hXTvodiDZI_XkDJEFk063p')
var damsWikipedia = ee.FeatureCollection('ft:1FJikDoJpylgifMoiMCUcvadyaUX6jgh0Hub6IfX_')
var damsSARP = ee.FeatureCollection('users/gena/eo-reservoirs/dams-SARP')
Map.addLayer(damsSARP.style({pointSize: 1, width: 0, color: 'ff0000', fillColor: 'ff000055'}), {}, 'dams SARP', false)
Map.addLayer(damsSARP.style({pointSize: 2, width: 1, color: 'ff0000', fillColor: 'ff000055'}), {}, 'dams SARP (larger)', true)
var reservoirsAll1m = ee.FeatureCollection("users/gena/eo-reservoirs/reservoirs-all-1m")
Map.addLayer(reservoirsAll1m.style({pointSize: 1, width: 1, color: 'add8ff', fillColor: 'add8ff88'}), {}, 'reservoirs 1m')
// var dams = ee.FeatureCollection('ft:1l7V5-gy93kQiWTw75yENYo-i6UeZiwTD-cKNHD1G')
// Map.addLayer(dams.style({ color: 'ff8000', pointSize: 1, width: 0 }), {}, 'dams')
var damInfo = [
  { dams: damsAquastat, name: 'AQUASTAT' },
  { dams: damsGRaND, name: 'GRaND' },
  { dams: damsWikipedia, name: 'Wikipedia' },
  { dams: damsGOOD2, name: 'GOOD2' },
  { dams: damsOSMLine, name: 'OSM-line' },
  { dams: damsOSMPoint, name: 'OSM-point' },
  { dams: damsOSMPoly, name: 'OSM-poly' },
]
var damsAll = ee.FeatureCollection([])
damInfo.map(function(i) {
  print(i.name, i.dams.size())
  //Map.addLayer(i.dams.style({ color: 'ffa500', pointSize: 1, width: 0 }), {}, 'dams ' + i.name)
  var dams = i.dams.map(function(f) {
    return f.set({'source': i.name})
  })
  damsAll = damsAll.merge(dams)
})
Map.addLayer(damsAll.style({pointSize: 1, width: 0, color: 'ffff00', fillColor: 'ffff00'}), {}, 'dams all', false)
Map.addLayer(damsAll.style({pointSize: 2, width: 1, color: 'ffff00', fillColor: 'ffff00'}), {}, 'dams all (larger)', true)
//Map.addLayer(dams.style({ color: 'ff8000', pointSize: 1, width: 0 }), {}, 'dams')