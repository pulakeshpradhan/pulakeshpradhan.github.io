var c = ui.import && ui.import("c", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -0.9713443341637085,
            6.03409518774452
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Point([-0.9713443341637085, 6.03409518774452]);
// var c = ee.Geometry.Point(-72, -42)
Map.centerObject(c, 8)
var L8TOA = ee.ImageCollection("LANDSAT/LC08/C01/T1_TOA").filterBounds(c)
.filterMetadata('CLOUD_COVER', 'less_than', 10)
var bands = ['B4', 'B3', 'B2'] // RED, GREEN, BLUE
var mins = [0, 0, 0]
var maxs = [1, 1, 1]
var labelmin = ui.Label('RGB: (0, 0, 0)')
var labelmax = ui.Label('RGB: (255, 255, 255)')
var stretchmin = function(value, slider) {
  var lay = Map.layers().get(0)
  var vis = lay.getVisParams()
  var min = Number(value)
  var minraw = parseInt(min*255)
  var rawstr = minraw.toString()
  lay.setVisParams({bands:bands, min:min, max:vis.max})
  labelmin.setValue('RGB: ('+rawstr+', '+rawstr+', '+rawstr+')')
}
var stretchmax = function(value, slider) {
  var lay = Map.layers().get(0)
  var vis = lay.getVisParams()
  var max = Number(value)
  var raw = parseInt(max*255)
  var rawstr = raw.toString()
  lay.setVisParams({bands:bands, min:vis.min, max:max})
  labelmax.setValue('RGB: ('+rawstr+', '+rawstr+', '+rawstr+')')
}
var slidemin = ui.Slider(0, 1, 0, 0.1, stretchmin)
var slidemax = ui.Slider(0, 1, 1, 0.1, stretchmax)
Map.add(ui.Panel(
  {widgets: [ui.Label("LANDSAT/LC08/C01/T1_TOA"),
             ui.Label('min'),
             slidemin, 
             labelmin, 
             ui.Label('max'), 
             slidemax, 
             labelmax],
    style: {position: 'bottom-left'}
  }))
Map.addLayer(L8TOA.first(), {bands:bands, min:mins, max:maxs}, 'L8 TOA Real Color')