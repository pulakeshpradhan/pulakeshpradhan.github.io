var fc = ui.import && ui.import("fc", "table", {
      "id": "users/LearningIIT/waterbodiesNew"
    }) || ee.FeatureCollection("users/LearningIIT/waterbodiesNew");
// var fc = ee.FeatureCollection('FAO/GAUL_SIMPLIFIED_500m/2015/level1');
Map.centerObject(fc,9)
function getProps(loc) {
  loc = ee.Dictionary(loc);
  var point = ee.Geometry.Point(loc.getNumber('lon'), loc.getNumber('lat'));
  var thisFeature = fc.filterBounds(point).first();
  var props = thisFeature.toDictionary();
  props.evaluate(function(props) {
    var str = '';
    Object.keys(props).forEach(function(i) {
      str = str + i + ': ' + props[i] + '\n';
    });
    info.setValue(str);
  });
}
var panel = ui.Panel({style: {position: 'bottom-right', width: '300px', height: '50%'}});
var info = ui.Label({value: 'Click on a feature', style: {whiteSpace: 'pre'}});
panel.add(info);
Map.add(panel);
Map.style().set('cursor', 'crosshair');
Map.onClick(getProps);
Map.addLayer(fc);