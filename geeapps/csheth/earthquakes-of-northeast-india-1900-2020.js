/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var neindiast = ee.FeatureCollection("users/csheth/NE-India-states"),
    eq19002020 = ee.FeatureCollection("users/csheth/ee-earthquakes-ne-india/NCS_earthquake_NE_India_500km_IST_1900-2020-10");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
// EARTHQUAKES LESS THAN AND EQ 2 MAG
Map.centerObject(neindiast, 7)
var mag_lte_3 = eq19002020.filter(ee.Filter.lt('magnitude',3))
var mag_lte_4 = eq19002020.filter(ee.Filter.gt('magnitude',3)).filter(ee.Filter.lt('magnitude',4))
var mag_lte_5 = eq19002020.filter(ee.Filter.gt('magnitude',4)).filter(ee.Filter.lt('magnitude',5))
var mag_lte_6 = eq19002020.filter(ee.Filter.gt('magnitude',5)).filter(ee.Filter.lt('magnitude',6))
var mag_lte_7 = eq19002020.filter(ee.Filter.gt('magnitude',6)).filter(ee.Filter.lt('magnitude',7))
var mag_lte_8 = eq19002020.filter(ee.Filter.gt('magnitude',7)).filter(ee.Filter.lt('magnitude',9))
Map.addLayer(mag_lte_3.draw({color:'blue', pointRadius:1}), {},'MAG <3')
Map.addLayer(mag_lte_4.draw({color:'darkgreen', pointRadius:2}), {},'MAG >3 <4')
Map.addLayer(mag_lte_5.draw({color:'purple', pointRadius:3}), {},'MAG >4 <5')
Map.addLayer(mag_lte_6.draw({color:'darkorange', pointRadius:5}), {},'MAG >5 <6')
Map.addLayer(mag_lte_7.draw({color:'darkred', pointRadius:7}), {},'MAG >6 <7')
Map.addLayer(mag_lte_8.draw({color:'red', pointRadius:9}), {},'MAG >7 <9')
var checkbox1 = ui.Checkbox('Magnitude < 3', true);
checkbox1.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(0).setShown(checked);
});
Map.add(checkbox1);
var checkbox2 = ui.Checkbox('Magnitude > 3 < 4', true);
checkbox2.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(1).setShown(checked);
});
Map.add(checkbox2);
var checkbox3 = ui.Checkbox('Magnitude > 4 < 5', true);
checkbox3.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(2).setShown(checked);
});
Map.add(checkbox3);
var checkbox4 = ui.Checkbox('Magnitude > 5 < 6', true);
checkbox4.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(3).setShown(checked);
});
Map.add(checkbox4);
var checkbox5 = ui.Checkbox('Magnitude > 6 < 7', true);
checkbox5.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(4).setShown(checked);
});
Map.add(checkbox5);
var checkbox6 = ui.Checkbox('Magnitude > 7', true);
checkbox6.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(5).setShown(checked);
});
Map.add(checkbox6);
var label = ui.Label('<click on a feature>')
label.style().set({ width: '300px' })
var inspector = ui.Panel( { widgets: [ label ], style: { position: 'bottom-right' } })
Map.add(inspector)
var scale = Map.getScale()
var clicking = false
Map.onClick(function(pt) {
  if(clicking) {
    return // avoid confusions, wait until previous async operation finishes
  }
  clicking = true
  label.setValue('Querying feature info ...')
  pt = ee.Geometry.Point([pt.lon, pt.lat])
  var features = eq19002020.filterBounds(pt.buffer(scale * 5)).limit(1)
  features.evaluate(function(f) {
    if(f.features.length === 0) {
      label.setValue('<click on a feature>')
      clicking = false // no features
      return
    }
    label.setValue(['Date: ' + f.features[0].properties.date,
    ' Magnitude: ' + f.features[0].properties.magnitude])
    clicking = false
  })
})
Map.style().set({ cursor: 'crosshair' })