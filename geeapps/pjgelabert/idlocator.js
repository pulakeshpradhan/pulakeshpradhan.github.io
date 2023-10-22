var p = ui.import && ui.import("p", "table", {
      "id": "users/pjgelabert/Per_cat_50ha"
    }) || ee.FeatureCollection("users/pjgelabert/Per_cat_50ha");
var text = require('users/gena/packages:text');
var shp = ee.FeatureCollection(p);
//print(shp);
Map.addLayer(shp, {},'Divison Layer');
Map.centerObject(p);
// // Create an empty image into which to paint the features, cast to byte.
// var empty = ee.Image().byte();
// // Paint all the polygon edges with the same number and width, display.
// var outline = empty.paint({
//   featureCollection: shp,
//   color: 'AREA',
//   width: 3
// });
// Map.addLayer(outline, {palette: 'FF0000'}, 'edges');
  //Map.addLayer(Labels_Final,{},"Division Labels");
//   // Create an empty image into which to paint the features, cast to byte.
// var empty = ee.Image().byte();
// // Paint all the polygon edges with the same number and width, display.
// var outline = empty.paint({
//   featureCollection: shp,
//   color: 1,
//   width: 3
// });
// Map.addLayer(outline, {palette: 'FF0000'}, 'Division Edges');
Map.style().set('cursor', 'crosshair');
// Create a panel and add it to the map.
 var inspector = ui.Panel([ui.Label('Click to get info')]);
Map.add(inspector);
Map.onClick(function(coords) {
  // Show the loading label.
  inspector.widgets().set(0, ui.Label({
    value: 'Loading...',
    style: {color: 'gray'}
  }));
  var click_point = ee.Geometry.Point(coords.lon, coords.lat);
  var list = shp.reduceColumns(ee.Reducer.toList(), ['CODI_FINAL']).get('list');
  var list2 = shp.reduceColumns(ee.Reducer.toList(), ['iter']).get('list');
  var shp_lst = shp.toList(shp.size());
  var retIdx = shp_lst.map(function (ele) {
  var idx = shp_lst.indexOf(ele);
    return ee.Algorithms.If(ee.Feature(ele).intersects(click_point), idx, 0);
  }).removeAll([0]);
  retIdx = retIdx.get(0).getInfo();
  var name1 = ee.List(list).get(retIdx);
  var name2 = ee.List(list2).get(retIdx);
  inspector.widgets().set(0, ui.Label({value: 'Codi Bombers: '+(name1.getInfo())+' - ID:' + name2.getInfo() 
  }));
  //inspector.clear();
});