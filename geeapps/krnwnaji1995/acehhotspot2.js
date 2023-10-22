var table = ui.import && ui.import("table", "table", {
      "id": "users/krnwnaji1995/input_Aceh_point2"
    }) || ee.FeatureCollection("users/krnwnaji1995/input_Aceh_point2"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                96.03322860656755,
                5.751421380447627
              ],
              [
                96.03322860656755,
                3.7917811546969125
              ],
              [
                98.26894638000505,
                3.7917811546969125
              ],
              [
                98.26894638000505,
                5.751421380447627
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [
        {
          "type": "rectangle"
        }
      ],
      "properties": {},
      "color": "#0b4a8b",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #0b4a8b */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[96.03322860656755, 5.751421380447627],
          [96.03322860656755, 3.7917811546969125],
          [98.26894638000505, 3.7917811546969125],
          [98.26894638000505, 5.751421380447627]]], null, false);
var table = ee.FeatureCollection("users/krnwnaji1995/input_Aceh_point2"),
    geometry = 
    /* color: #0b4a8b */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[96.03322860656755, 5.751421380447627],
          [96.03322860656755, 3.7917811546969125],
          [98.26894638000505, 3.7917811546969125],
          [98.26894638000505, 5.751421380447627]]], null, false);
var firesVis = {
  min: 325,
  max: 6000,
  palette: ['red', 'orange', 'yellow'],
};
var dataset = ee.ImageCollection('FIRMS').filter(
    ee.Filter.date('2010-01-01', '2022-08-10'))
    // ee.Filter.metadata('confidence','greater_than',60)
    .map(function(a){
      return a.set('year',ee.Image(a).date().get('year'))
    });
print ('Dataset',dataset)
var list = ee.List([])  
for (var a = 2010; a <= 2022; a++){
  var filFires = dataset.select('T21')
                        .filterMetadata('year','equals',a)
                        .sum()
                        .clip(geometry);
  var finalFires = filFires.set('year',a);
  list = list.add(finalFires)
}
var finalCol = ee.ImageCollection(list)
print ('listed',list)
// var fires = dataset.select('T21');
// Map.setCenter(-119.086, 47.295, 6);
for (var a = 2010;a <= 2022;a++){
  Map.addLayer(finalCol.filterMetadata('year','equals',a)
                      ,firesVis,'Tahun '+a,false)
}
Map.centerObject(table);
Map.addLayer(table,{},"titik survey")