var trmm1 = ee.ImageCollection('TRMM/3B42').select('precipitation')
    .filterDate('2017-01-01','2017-01-30')
    .mean();
var trmm2 = ee.ImageCollection('TRMM/3B42').select('precipitation')
    .filterDate('2017-02-01','2017-02-28')
    .mean();
var trmm3 = ee.ImageCollection('TRMM/3B42').select('precipitation')
    .filterDate('2017-03-01','2017-03-30')
    .mean();
var trmm4 = ee.ImageCollection('TRMM/3B42').select('precipitation')
    .filterDate('2017-04-01','2017-04-30')
    .mean();
var trmm5 = ee.ImageCollection('TRMM/3B42').select('precipitation')
    .filterDate('2017-05-01','2017-05-30')
    .mean();
var trmm6 = ee.ImageCollection('TRMM/3B42').select('precipitation')
    .filterDate('2017-06-01','2017-06-30')
    .mean();
var trmm7 = ee.ImageCollection('TRMM/3B42').select('precipitation')
    .filterDate('2017-07-01','2017-07-30')
    .mean();
var pa = ee.FeatureCollection('ft:1wuLqVY9Jen2Rp8UG5RxUPezV0PYJNPkXAcpuFIwQ');
var clip1 = trmm1.clipToCollection (pa);
var clip2 = trmm2.clipToCollection (pa);
var clip3 = trmm3.clipToCollection (pa);
var clip4 = trmm4.clipToCollection (pa);
var clip5 = trmm5.clipToCollection (pa);
var clip6 = trmm6.clipToCollection (pa);
var clip7 = trmm7.clipToCollection (pa);
// Create a panel to hold the chart.
var panel = ui.Panel();
print (panel);
// Register a function to draw a chart when a user clicks on the map.
Map.onClick(function(coords) {
  panel.clear();
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var chart = ui.Chart.image.regions([clip1, clip2, clip3, clip4, clip5, clip6, clip7], point, null, 27000, null, ['1jan','2Fev','3Mar','4Abr','5Mai','6Jun','7Jul']);
  chart.setOptions({title: 'Band values'});
  panel.add(chart);
});
Map.addLayer(clip1, {bands:'precipitation', min:0.3064, max:0.5786, palette:['#ff650b', '#7309ff']},'Jan', 1);
Map.addLayer(clip2, {bands:'precipitation', min:0.3637, max:0.6880, palette:['#ff650b', '#7309ff']},'Fev', 1);
Map.addLayer(clip3, {bands:'precipitation', min:0.3535, max:0.6336, palette:['#ff650b', '#7309ff']},'Mar', 1);
Map.addLayer(clip4, {bands:'precipitation', min:0.3064, max:0.5299, palette:['#ff650b', '#7309ff']},'Abr', 1);
Map.addLayer(clip5, {bands:'precipitation', min:0.0681, max:0.3249, palette:['#ff650b', '#7309ff']},'Mai', 1);
Map.addLayer(clip6, {bands:'precipitation', min:0.0092, max:0.2275, palette:['#ff650b', '#7309ff']},'Jun', 1);
Map.addLayer(clip7, {bands:'precipitation', min:-0.027, max:0.1879, palette:['#ff650b', '#7309ff']},'Jul', 1);
Map.centerObject(pa);