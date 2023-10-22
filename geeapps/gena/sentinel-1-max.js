var image = ui.import && ui.import("image", "image", {
      "id": "users/gena/eo-vessels/s1-water-max-2019-01-01_2020-01-01test3-76m"
    }) || ee.Image("users/gena/eo-vessels/s1-water-max-2019-01-01_2020-01-01test3-76m"),
    image2 = ui.import && ui.import("image2", "image", {
      "id": "users/gena/eo-vessels/s1-water-std-2019-01-01_2020-01-01test3-76m"
    }) || ee.Image("users/gena/eo-vessels/s1-water-std-2019-01-01_2020-01-01test3-76m"),
    fishing = ui.import && ui.import("fishing", "imageCollection", {
      "id": "GFW/GFF/V1/vessel_hours"
    }) || ee.ImageCollection("GFW/GFF/V1/vessel_hours");
Map.setOptions('SATELLITE')
var images = [
  ee.Image('users/gena/eo-vessels/s1-water-max-global_2019-01-01_2019-07-01_76m'),
  ee.Image('users/gena/eo-vessels/s1-water-max-global_2019-07-01_2020-01-01_76m')  
]
// Map.addLayer(fishing.filterDate('2016-06-01', '2016-07-01').reduce(ee.Reducer.stdDev()))
image = ee.Image('users/gena/eo-vessels/s1-water-max-global_2019-01-01_2019-07-01_76m')
var vis = { min: [0.1, 1, 1], max: [0.5, 5, 5], gamma: 0.4, bands: ['B2', 'B1', 'B1'] }
Map.addLayer(image, vis, 'max 2019-01 2019-07', true)
image = ee.Image('users/gena/eo-vessels/s1-water-max-global_2019-07-01_2020-01-01_76m')
Map.addLayer(image, vis, 'max 2019-07 2020-01', true)
// var vis = {min:[0.01, 0.05, 0.05], max: [0.1, 0.3, 0.3], gamma: 0.4, bands: ['B2', 'B1', 'B1'] }
// Map.addLayer(image2, vis, 'std', false)
// // dB
// image = image.log10().multiply(10.0)
// var vis = { min: [-15, 1, 1], max: [0, 10, 10], gamma: 0.4, bands: ['B2', 'B1', 'B1'] }
// Map.addLayer(image, vis, 'max (dB)', true)
// Map.setOptions('SATELLITE')
function exportTiles(image, subDir, minZoom, maxZoom) {
  var aoi = ee.Geometry.Polygon([[180,85],[0,85],[-180,85],[-180,-85],[0,-85],[180,-85],[180,85]], 'EPSG:4326', false)
  var name = 'vessels'
  var path = name + '/' + subDir
  Export.map.toCloudStorage({
    image: image, 
    description: 'map-' + name + '-' + minZoom + '-' + maxZoom + '-' + subDir, 
    bucket: 'deltares-video-map', 
    fileFormat: 'auto', 
    path: path, 
    writePublicTiles: false, 
    minZoom: minZoom, 
    maxZoom: maxZoom, 
    skipEmptyTiles: true, 
    mapsApiKey: 'AIzaSyDItV6jEwI7jdCEqLWL4zO-ZzPvKC4193E',
    region: aoi
    // bucketCorsUris: ['https://code.earthengine.google.com', 'https://gena.users.earthengine.app']
  })
}
exportTiles(images[0].visualize(vis), 's1-max-2019-01-01_2019-07-01', 0, 11)
exportTiles(images[1].visualize(vis), 's1-max-2019-07_01_2020-01-01', 0, 11)
Map.onChangeZoom(function(zoom) {
  print(zoom)
  print(Map.getScale())
})