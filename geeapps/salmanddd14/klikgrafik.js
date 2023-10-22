var L8_SR = ui.import && ui.import("L8_SR", "imageCollection", {
      "id": "LANDSAT/LC08/C01/T1_SR"
    }) || ee.ImageCollection("LANDSAT/LC08/C01/T1_SR");
var Bts_Subang = ee.Geometry.Rectangle([107.5,-6.17, 107.96,-6.82]),
 Bts_SumSel = ee.Geometry.Rectangle([102.0877, -4.9331, 106.1307, -1.6101]),
 Bts_Jawa = ee.Geometry.Rectangle([105.5, -5.8, 116, -9]);
// Load a Landsat 8 composite and display on the map.
//var image = ee.Image('LANDSAT/LC8_L1T_32DAY_TOA/')
var image = L8_SR
.filterDate('2019-01-01','2019-12-31')
.filter(ee.Filter.lt('CLOUD_COVER_LAND',50))
.select('B[1-7]')
//.median()
.map(function(img) {return img.divide(10000)})
.median()
;
//ui.root.clear();
//ui.root.setLayout(ui.Panel.Layout.absolute());
Map.centerObject(Bts_Subang,10);
Map.addLayer(image, {bands:['B6','B5','B4'], min: 0, max: [0.4,0.5,0.3]});
// Create the title label.
var title = ui.Label('Click to inspect');
title.style().set('position', 'top-center');
Map.add(title);
// Create a panel to hold the chart.
var panel = ui.Panel();
panel.style().set({
  width: '250px',
  position: 'bottom-left'
});
Map.add(panel);
// Register a function to draw a chart when a user clicks on the map.
Map.onClick(function(coords) {
  panel.clear();
  var KorT, point = ee.Geometry.Point(coords.lon, coords.lat);
  KorT = coords.lon.toFixed(6) + ',' + coords.lat.toFixed(6);
  var chart = ui.Chart.image.regions(image, point, null, 30);
  chart.setOptions({title: 'Band values at '+ KorT});
  panel.add(chart);
});
// A function to make buttons labeled by position.
function makeButton(position) {
  return ui.Button({
    label: position,
    style: {position: position}
  });
}
/*
// Add labled buttons to the panel.
ui.root.add(makeButton('top-left'));
ui.root.add(makeButton('top-center'));
ui.root.add(makeButton('top-right'));
ui.root.add(makeButton('middle-left'));
ui.root.add(makeButton('middle-right'));
ui.root.add(makeButton('bottom-left'));
ui.root.add(makeButton('bottom-center'));
ui.root.add(makeButton('bottom-right'));
*/