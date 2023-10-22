var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -61.33084741634566,
                -31.839180825766555
              ],
              [
                -61.33084741634566,
                -34.4149519591052
              ],
              [
                -57.34281030697066,
                -34.4149519591052
              ],
              [
                -57.34281030697066,
                -31.839180825766555
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-61.33084741634566, -31.839180825766555],
          [-61.33084741634566, -34.4149519591052],
          [-57.34281030697066, -34.4149519591052],
          [-57.34281030697066, -31.839180825766555]]], null, false),
    imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "B5",
          "B4",
          "B3"
        ],
        "min": 0.06427271993768327,
        "max": 0.265135265739349,
        "gamma": 1.2000000000000002
      }
    }) || {"opacity":1,"bands":["B5","B4","B3"],"min":0.06427271993768327,"max":0.265135265739349,"gamma":1.2000000000000002},
    imageVisParam6 = ui.import && ui.import("imageVisParam6", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "B3",
          "B2",
          "B1"
        ],
        "min": 0.052698541432619095,
        "max": 0.13158568739891052,
        "gamma": 0.718
      }
    }) || {"opacity":1,"bands":["B3","B2","B1"],"min":0.052698541432619095,"max":0.13158568739891052,"gamma":0.718},
    imageVisParam7 = ui.import && ui.import("imageVisParam7", "imageVisParam", {
      "params": {
        "opacity": 0.99,
        "bands": [
          "B4",
          "B3",
          "B2"
        ],
        "min": 0.054288774728775024,
        "max": 0.173478901386261,
        "gamma": 1.034
      }
    }) || {"opacity":0.99,"bands":["B4","B3","B2"],"min":0.054288774728775024,"max":0.173478901386261,"gamma":1.034},
    imageVisParam2 = ui.import && ui.import("imageVisParam2", "imageVisParam", {
      "params": {
        "opacity": 0.99,
        "bands": [
          "B4",
          "B3",
          "B2"
        ],
        "min": 0.04074014350771904,
        "max": 0.1669146716594696,
        "gamma": 1.1860000000000002
      }
    }) || {"opacity":0.99,"bands":["B4","B3","B2"],"min":0.04074014350771904,"max":0.1669146716594696,"gamma":1.1860000000000002};
var l5 = ee.ImageCollection("LANDSAT/LT05/C01/T1_TOA")
  .filterDate("2000-01-01", "2000-12-31")
  .filterBounds(geometry)
  .sort("CLOUD_COVER", true)
  .filterMetadata("CLOUD_COVER", "less_than", 10)
  .mean()
var l5_estilo = (imageVisParam6)
var l8 = ee.ImageCollection("LANDSAT/LC08/C01/T1_TOA")
  .filterDate("2019-01-01", "2019-12-31")
  .filterBounds(geometry)
  .sort("CLOUD_COVER", true)
  .filterMetadata("CLOUD_COVER", "less_than", 5)
  .mean()
var l8_estilo = (imageVisParam2)
Map.addLayer(l5.clip(geometry), l5_estilo, "landsat5")
Map.addLayer(l8.clip(geometry), l8_estilo, "landsat8")
var leftmap = ui.Map()
var rigthmap = ui.Map()
leftmap.setCenter(-59.8621, -33.1129,10)
var l5_img = ui.Map.Layer(l5.clip(geometry), l5_estilo)
var l8_img = ui.Map.Layer(l8.clip(geometry), l8_estilo)
var l5Layer = leftmap.layers()
var l8Layer = rigthmap.layers()
l5Layer.add(l5_img)
l8Layer.add(l8_img)
var l5_label= ui.Label("Landsat5 - 2000")
//l5_label.set("position", "bottom-left")
var l8_label= ui.Label("Landsat8 - 2020")
//l8_label.set("position", "bottom-right")
//leftMap.add(l5_label)
//rigthMap.add(l8_label)
var splitPanel = ui.SplitPanel({
  firstPanel: leftmap,
  secondPanel: rigthmap,
  orientation: "horizontal",
  wipe: true
})
ui.root.clear()
ui.root.add(splitPanel)
var linkPanel = ui.Map.Linker([leftmap,rigthmap ])