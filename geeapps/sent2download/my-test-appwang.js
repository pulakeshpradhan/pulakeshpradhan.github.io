var outline = ee.FeatureCollection ('users/dyangzom/Bhutan_outline');
Map.centerObject(outline);
Map.addLayer(outline, {color:'FF0F00', opacity:0.3}, 'Bhutan Boundary', true, 1);
//
function criteria_map(minElev, maxElev){
  var srtm = ee.Image('CGIAR/SRTM90_V4');
  var blank =ee.Image(0);
  var result = blank.where(srtm.gte(minElev).and(srtm.lt(maxElev)),1);
  var visParam = {palette :'00FF00'};
  Map.addLayer(result.updateMask(result), visParam, 'Application Layers');
}
criteria_map(1500,3500);
function compute(){
  var val1 = ee.Number(slider1.getValue()).toInt();
  var val2 = ee.Number(slider2.getValue()).toInt();
  if (val1 > val2){
    var val3 = val1;
    val1 = val2;
    val2 = val3;
  }
//Remove criterion map
Map.remove(Map.layers().get(1));
criteria_map(val1,val2);
}
// UI Section//
// Create a panel with vertical flow layout.
var panel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {width: '300px', height:'400px', position:'top-right'}
});
var bhutanCheckbox= ui.Checkbox('Bhutan Outline', true);
bhutanCheckbox.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(0).setShown(checked);
});
var criteriaCheckbox= ui.Checkbox('Critirion Layers', true);
criteriaCheckbox.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(1).setShown(checked);
});
var slider1 = ui.Slider(0, 8000, 1500);
slider1.setValue();({  // Set a default value.
width:'2500px'
})
var slider2 = ui.Slider(0, 8000, 3000);
slider2.setValue();({  // Set a default value.
width:'2500px'
})
//
var button1= ui.Button('Compute');
button1.onClick(function() {
  compute();
}
);
// Add UI - panel and checkbox
panel.add(bhutanCheckbox);
panel.add(criteriaCheckbox);
panel.add(ui.Label('Elevation1'));
panel.add(slider1);
panel.add(ui.Label('Elevation2'));
panel.add(slider2);
panel.add(button1);
ui.root.add(panel);