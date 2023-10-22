var bhutanBoundary = ee.FeatureCollection('users/dyangzom/Bhutan_outline');
Map.addLayer(bhutanBoundary,{color:'red',opacity:0.3}, 'Bhutan Boundary', false);
Map.centerObject(bhutanBoundary);
function createCriterionMap(minElev, maxElev){
  var srtm = ee.Image('srtm90_v4');
  var blank = ee.Image(0);
  var result = blank.where(srtm.gte(minElev).and(srtm.lt(maxElev)),1);
  var visParam = {palette:'00FF00', opacity:0.7};
  Map.addLayer(result.updateMask(result), visParam, 'Application Layer');
}
createCriterionMap(1500,3000);
function compute(){
  var val1 = ee.Number(slider1.getValue()).toInt();
  var val2 = ee.Number(slider2.getValue()).toInt();
    if (val1 > val2){
      var val3 = val1;
      val1 = val2;
      val2 = val3;
    }
    //Remove criterion layer first
    Map.remove(Map.layers().get(1));
    createCriterionMap(val1,val2);
}
// UI Section //
var panel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {width: '300px', height:'400px', position:'top-right' }
});
var bhutanCheckbox = ui.Checkbox('Bhutan Outline', false);
bhutanCheckbox.onChange(function(checked) {
  Map.layers().get(0).setShown(checked);
});
var criterionCheckbox = ui.Checkbox('Criterion Layer', true);
criterionCheckbox.onChange(function(checked) {
  Map.layers().get(1).setShown(checked);
});
var slider1 = ui.Slider(0,8000, 1500);
slider1.style().set({
 width:'250px' 
})
var slider2 = ui.Slider(0,8000, 3000);
slider2.style().set({
 width:'250px' 
})
var button1 = ui.Button('Compute');
button1.onClick(function() {
    compute();
  }
);
panel.add(bhutanCheckbox);
panel.add(criterionCheckbox);
panel.add(ui.Label('Elevation 1'));
panel.add(slider1);
panel.add(ui.Label('Elevation 2'));
panel.add(slider2);
panel.add(button1);
ui.root.add(panel);