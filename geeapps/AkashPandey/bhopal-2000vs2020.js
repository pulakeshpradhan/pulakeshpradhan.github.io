var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                77.24730183222135,
                23.29385602166723
              ],
              [
                77.24730183222135,
                23.14114500829739
              ],
              [
                77.5192134533151,
                23.14114500829739
              ],
              [
                77.5192134533151,
                23.29385602166723
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#98ff00",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #98ff00 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[77.24730183222135, 23.29385602166723],
          [77.24730183222135, 23.14114500829739],
          [77.5192134533151, 23.14114500829739],
          [77.5192134533151, 23.29385602166723]]], null, false);
//zoom to Bhopal//
var l5 = ee.ImageCollection("LANDSAT/LT05/C01/T1_TOA")
  .filterDate('2000-01-01', '2000-12-31')
  .filterBounds(geometry)
  .sort('CLOUD_COVER', true)
  .first()
var l5_VisParam = {
  bands: ['B3', 'B2', 'B1'],
  min: 0.08,
  max: 0.2,
  gamma: 1.2
}
var l8 = ee.ImageCollection("LANDSAT/LC08/C01/T1_TOA")
  .filterDate('2020-01-01', '2020-12-31')
  .filterBounds(geometry)
  .sort('CLOUD_COVER', true)
  .first()
var l8_VisParam = {
  bands: ['B4', 'B3', 'B2'],
  min: 0.06,
  max: 0.2,
  gamma: 1.2
}
var center = {lon: 77.3724, lat: 23.2523, zoom: 12}
var leftMap = ui.Map(center)
var rightMap = ui.Map(center)
var linker = new ui.Map.Linker([leftMap, rightMap]);
var l5_img = ui.Map.Layer(l5.clip(geometry), l5_VisParam)
var l8_img = ui.Map.Layer(l8.clip(geometry), l8_VisParam)
var l5_layer = leftMap.layers()
var l8_layer = rightMap.layers()
l5_layer.add(l5_img)
l8_layer.add(l8_img)
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  orientation: 'horizontal',
  wipe:true
})
ui.root.clear()
ui.root.add(splitPanel)