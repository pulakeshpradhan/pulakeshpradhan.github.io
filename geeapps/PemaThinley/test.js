var bhutanBoundary = ee.FeatureCollection('users/PemaThinley/Bhutan_Outline');
Map.addLayer(bhutanBoundary,{color: 'red', opacity: 0.3},'Bhutan Boundary');
Map.centerObject(bhutanBoundary);
function createCriterionMap(minElev,maxElev)
{
  var srtm = ee.Image('CGIAR/SRTM90_V4');
  var blank = ee.Image(0);
  var result = blank.where(srtm.gte(minElev).and(srtm.lt(maxElev)),1);
  var visParam = {palette: '404040', opacity: 0.9};
  Map.addLayer(result.updateMask(result), visParam, 'Application Layer');
}
createCriterionMap(1500, 3500);
function compute()
  {
    var val1 = ee.Number(slider1.getValue()).toInt();
    var val2 = ee.Number(slider2.getValue()).toInt();
    if (val1 > val2)
    {
      var val3 = val1;
      val1 = val2;
      val2 = val3;
    }
    //Remove criterion Layer first
    Map.remove(Map.layers().get(1));
    createCriterionMap(val1, val2);
  }
//UI Section//
var panel = ui.Panel
(
  {
      layout: ui.Panel.Layout.flow('vertical'),
      style: {width: '300px', height: '400px', position:'top-right'}
  }
);
var bhutanCheckbox = ui.Checkbox('Bhutan Outline', true);
bhutanCheckbox.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(0).setShown(checked);
});
var criteriaCheckbox = ui.Checkbox('Criterion Layer', true);
criteriaCheckbox.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(0).setShown(checked);
});
var slider1 = ui.Slider(0,8000,1500);
slider1.style().set
(
  {
    width: '250px'
  }
)
var slider2 = ui.Slider(0,8000,3000);
slider2.style().set
(
  {
    width: '250px'
  }
)
var button1 = ui.Button('Compute');
button1.onClick(function()
  {
    compute()
  }
    );
panel.add(bhutanCheckbox);
panel.add(criteriaCheckbox);
panel.add(ui.Label('Elevation 1'));
panel.add(slider1);
panel.add(ui.Label('Elevation 2'));
panel.add(slider2);
panel.add(button1);
ui.root.add(panel);