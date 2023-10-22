var geometry = /* color: #98ff00 */ee.Geometry.Point([-66.2365, -17.3469]);
var landsat = ee.ImageCollection("LANDSAT/LC08/C01/T1")
    .filterDate('2017-01-01', '2019-01-01')
    .filterBounds(geometry)
var composite = ee.Algorithms.Landsat.simpleComposite({
  collection: landsat,
  asFloat: true
})
var vis = {
  "Color natural: Landsat 8 (4,3,2)": {bands: ["B4", "B3", "B2"], min:0, max: 0.3},
  "Infrarrojo (vegetación): Landsat 8 (5,4,3)": {bands: ["B5", "B4", "B3"], min:0, max: [0.5, 0.3, 0.3]},
  "Agricultura: Landsat 8 (6,5,2)": {bands: ["B6", "B5", "B4"], min:0, max: [0.5, 0.3, 0.3]}
  //"Termal": {bands: ["B10"], min: 280, max: 310, palette: ["blue", "red", "orange", "yellow"]}
}
var maps = [];
for (var label in vis) {
  var map = ui.Map().setControlVisibility(false)
  map.addLayer(composite, vis[label])
  map.add(ui.Label(label))
  maps.push(map);
}
ui.root.widgets().reset(maps)
var linker = ui.Map.Linker(maps);
maps[0].centerObject(geometry, 12)