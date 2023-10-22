/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var geometry = 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry({
      "type": "GeometryCollection",
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -122.19916231081318,
            47.97702566228782
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -122.23624116823505,
            47.95886589587746
          ]
        },
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -122.32444620785101,
                47.96860351676321
              ],
              [
                -122.36015177425726,
                47.85308108324539
              ],
              [
                -122.20016337093695,
                47.83234262652128
              ],
              [
                -122.2029099529682,
                47.921689249463455
              ],
              [
                -122.15278483089789,
                47.93641203487868
              ],
              [
                -122.11295939144476,
                47.96814377964345
              ],
              [
                -122.12806559261664,
                48.00674743229461
              ],
              [
                -122.13081217464789,
                48.03246716055786
              ],
              [
                -122.1809372967182,
                48.04486315930774
              ],
              [
                -122.25509501156195,
                48.01731244489207
              ]
            ]
          ],
          "geodesic": true,
          "evenOdd": true
        },
        {
          "type": "Point",
          "coordinates": [
            -122.33543253597601,
            47.84340416851606
          ]
        }
      ],
      "coordinates": []
    });
/***** End of imports. If edited, may not auto-convert in the playground. *****/
//Drawingtoowls functions  
var geometry =
  /* color: #d63000 */ 
  /* shown: false */
  geometry;
var data = require(
  'users/stormwaterheatmap/apps:data/data_dict_v3'
  )
var Style = require(
  'users/stormwaterheatmap/apps:Modules/Style'
  )
var helpers = require(
  'users/stormwaterheatmap/apps:Modules/helpers'
  )
var legends = require(
  'users/stormwaterheatmap/apps:Modules/legends'
  )
var layer_object = data.rasters[
  "Age of Imperviousness"]
var drawing_tools_function = require(
  'users/stormwaterheatmap/apps:drawingToolsSnippet_function'
  )
var map = drawing_tools_function
  .display_drawing_tools(layer_object,
    ui.Map())
ui.root.clear();
ui.root.add(map);
//drop down of layers 
var layer_dropdown = ui.Select({items: Object.keys(data.rasters), placeholder:'Select a layer', 
style:{position: 'top-left'},
  onChange: function(value){
    map = drawing_tools_function
  .display_drawing_tools(data.rasters[value],
    map)
//ui.root.clear();
//ui.root.add(map);
    print("Widgets", map.widgets())
    map.layers().reset()
    map.addLayer(data.rasters[value].layer)
  }
}) 
var mainPanel = helpers.makeMainPanel("Download Data")
mainPanel.add(
  layer_dropdown)
  map.add(mainPanel)
var legend = legends.discreteLegend(
  layer_object)
map.centerObject(geometry)
var ws = data.vectors.PS_AU
  .filterBounds(geometry)
  .union()
//Mapyer(ws)
map.setOptions('Dark', {
  'Dark': Style.mapStyles.Dark
})
map.add(ui.Panel({
  widgets: [legend,
    ui.Label({value: ('Source:').concat(layer_object.soureName),
      targetUrl: layer_object.sourceUrl
    })
  ],
  style: {
    position: 'bottom-right'
  }
}))