var lai01 = ee.Image('users/sommer/lai01');
var lai02 = ee.Image('users/sommer/lai02');
var lai03 = ee.Image('users/sommer/lai03');
var lai04 = ee.Image('users/sommer/lai04');
var lai05 = ee.Image('users/sommer/lai05');
var lai06 = ee.Image('users/sommer/lai06');
var lai07 = ee.Image('users/sommer/lai07');
var lai08 = ee.Image('users/sommer/lai08');
var lai09 = ee.Image('users/sommer/lai09');
var lai10 = ee.Image('users/sommer/lai10');
var lai11 = ee.Image('users/sommer/lai11');
var lai12 = ee.Image('users/sommer/lai12');
var listImg = [lai01, lai02, lai03, lai04, lai05, lai06, lai07, lai08, lai09, lai10, lai11, lai12]
var vizGreens = {
  min: 0.0,
  max: 100.0,
  palette: ['e1e4b4', '999d60', '2ec409', '0a4b06'],
};
Map.centerObject(ee.Geometry.Point(50,30),3)
Map.addLayer(lai06, vizGreens, 'LAI')
var slider = ui.Slider({
  min: 1,
  max: 12,
  value: 6,
  step: 1,
  direction: 'vertical',
  style: {height: '200px'}
});
//slider.setValue(1);  // Set a default value.
slider.onChange(function(value) {
  Map.clear();
  Map.addLayer(listImg[value-1], vizGreens, 'LAI');
});
//ui.root.add(slider)
var thePanel = ui.Panel({ 
  widgets: [
    ui.Label('Select a month:'),
    slider,
    ],
  layout: ui.Panel.Layout.flow('vertical'),  
  style: {width: '350px'} 
});
ui.root.add(thePanel);
/*Map.onClick(function(coords) {
  var POI = ee.Geometry.Point(coords.lon, coords.lat);
  var timeLine = ui.Chart.image.series(
    ee.ImageCollection('MODIS/006/MCD15A3H').select('Lai'), POI);
  //print(timeLine);
  thePanel.add(timeLine);
});*/
Map.onClick(function(coords) {
  var POI = ee.Geometry.Point(coords.lon, coords.lat);
  var timeLine = ui.Chart.image.series({
    imageCollection: ee.ImageCollection(listImg), 
    region: POI,
    xProperty: 'month'
  });
  //print(timeLine);
  thePanel.remove(timeLine)
  thePanel.add(timeLine);
});