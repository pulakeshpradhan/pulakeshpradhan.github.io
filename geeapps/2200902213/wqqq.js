//ui.CheckBox
var roi = ee.Geometry.Point([116.38778686523438,39.925535281697286]);
var srtm = ee.Image("USGS/SRTMGL1_003");
var checkbox1 = ui.Checkbox("checkbox 1", true);
checkbox1.onChange(function(checked){
 print("1 select box: " + checked);
 //改变地图层
 Map.layers().get(0).setShown(checked);
});
print(checkbox1);
print("checkbox1 getDisabled: ", checkbox1.getDisabled());
print("checkbox1 getValue: ", checkbox1.getValue());
print("checkbox1 style: ", checkbox1.style());
//map add layer
Map.centerObject(roi, 9);
Map.addLayer(srtm);
print("------------------------");
var checkbox2 = ui.Checkbox({
 label: "checkbox 2",
 value: false,
 onChange: function(checked) {
   print("2 select box : " + checked);
 }
});
print(checkbox2);
print("------------------------");
var checkbox3 = ui.Checkbox({
 label: "checkbox 3",
 value: false,
 onChange: function(checked) {
   print("3 select box : " + checked);
 }
});
//构造方法中默认不选中，但是这里设置为选中，同时触发onChange方法
checkbox3.setValue(true, true);
print("checkbox 3 value is: " + checkbox3.getValue());
print(checkbox3);
print("------------------------");
var checkbox4 = ui.Checkbox({
 label: "checkbox 4",
 value: false
});
var checkboxId = checkbox4.onChange(function(checked) {
 print("4 select box : " + checked);
});
//取消对复选框的监听，也就是不触发onChange方法
checkbox4.unlisten(checkboxId);
print(checkbox4);