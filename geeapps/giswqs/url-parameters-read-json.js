// print(geometry.toGeoJSONString())
// var state = ui.url.get('state', 'TX');
var geoJson = ui.url.get('geoJson', '{"type":"Point","coordinates":[-99.022, 31.309]}');
var obj = JSON.parse(geoJson);
var roi = ee.Geometry(obj);
var states = ee.FeatureCollection('TIGER/2018/States')
  .filterBounds(roi);
// var fc = states.filter(ee.Filter.eq('STUSPS', state));
try {
  Map.centerObject(states, 6);
  Map.addLayer(states, {}, "Intersecting states");
  Map.addLayer(roi, {}, "JSON Geometry");
} catch (error) {
  // Load defaults.
  Map.setCenter(-98.720, 41.169, 4);
  Map.addLayer(states, {}, 'US States');
}