Map.style().set('cursor', 'crosshair');
var countriesUSDOS  = ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017").filter(ee.Filter.eq('country_na','Czechia'));
Map.addLayer(countriesUSDOS,{},'Czechia',false);
Map.centerObject(countriesUSDOS,8)
var start = '2013-03-20';
var now = Date.now();
var eeNow = ee.Date(now);
var l8 = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2')
  .filterDate(start,eeNow);
var withNDVI = l8.map(function(image) {
var ndvi = image.normalizedDifference(['SR_B5', 'SR_B4']).rename('NDVI');
return image.addBands(ndvi);
});
var cloudlessNDVI = l8.map(function(image) {
  var cloud = ee.Algorithms.Landsat.simpleCloudScore(image).select('QA_PIXEL');
  var qaMask = image.select('QA_PIXEL').bitwiseAnd(parseInt('11111', 2)).eq(0);
  var mask = cloud.lte(20);
  var ndvi = image.normalizedDifference(['SR_B5', 'SR_B4']).rename('NDVI');
  return image.addBands(ndvi).updateMask(qaMask);
});
var panel_chart = ui.Panel();
panel_chart.style().set('width', '300px');
var intro = ui.Panel([
  ui.Label({
    value: 'Click on the map or choose from the list to view NDVI',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
  ui.Label('Сlick on the chart to expand')
]);
panel_chart.add(intro);
var lon = ui.Label();
var lat = ui.Label();
panel_chart.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal'))
Map.onClick(function(coords) {
  // Update the lon/lat panel with values from the click event.
  lon.setValue('lon: ' + coords.lon.toFixed(2)),
  lat.setValue('lat: ' + coords.lat.toFixed(2));
  // Add a red dot for the point clicked on.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point, {color: 'FF0000'});
  Map.layers().set(1, dot);
  // Create an NDVI chart.
  var ndviChart = ui.Chart.image.series(withNDVI.select('NDVI'), point, ee.Reducer.mean(), 500);
  ndviChart.setOptions({
    title: 'NDVI Over Time',
    vAxis: {title: 'NDVI'},
    hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}},
  });
  panel_chart.widgets().set(2, ndviChart);
});
ui.root.insert(0, panel_chart);
var Snezka = ee.Geometry.Point([15.74063, 50.73604]);
var Praded = ee.Geometry.Point([17.26747, 50.083]);
var Lysa_hora = ee.Geometry.Point([18.44796, 49.54604]);
// widgetStyle.set({border: '5px solid darkgray'});
// print(widgetStyle);
var panel = ui.Panel({style: {width:'9%'}});
var stylePanel = panel.style()
stylePanel.set({border: '5px solid darkgray'})
var Snezka_b = ui.Button({
  label: 'Snezka',
  onClick: function() {
  lon.setValue(15.74063),
  lat.setValue(50.73604);
  var point = ee.Geometry.Point([15.74063, 50.73604]);
  var dot = ui.Map.Layer(point, {color: 'FF0000'});
  Map.layers().set(1, dot);
var ndviChart = ui.Chart.image.series(withNDVI.select('NDVI'), point, ee.Reducer.mean(), 500);
ndviChart.setOptions({
    title: 'NDVI Over Time',
    vAxis: {title: 'NDVI'},
    hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}},
});
  panel_chart.widgets().set(2, ndviChart);
  Map.centerObject(Snezka,14)
  }})
panel.add(Snezka_b)
////////////////
var Praded_b = ui.Button({
  label: 'Praded',
  onClick: function() {
  lon.setValue(17.26747),
  lat.setValue(50.083);
  var point = ee.Geometry.Point([17.26747, 50.083]);
  var dot = ui.Map.Layer(point, {color: 'FF0000'});
  Map.layers().set(1, dot);
var ndviChart = ui.Chart.image.series(withNDVI.select('NDVI'), point, ee.Reducer.mean(), 500);
ndviChart.setOptions({
    title: 'NDVI Over Time',
    vAxis: {title: 'NDVI'},
    hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}},
});
  panel_chart.widgets().set(2, ndviChart);
  Map.centerObject(Praded,14)
  }})
panel.add(Praded_b)
/////////
var Lysa_hora_b = ui.Button({
  label: 'Lysa_hora',
  onClick: function() {
  lon.setValue(18.44796),
  lat.setValue(49.54604);
  var point = ee.Geometry.Point([18.44796, 49.54604]);
  var dot = ui.Map.Layer(point, {color: 'FF0000'});
  Map.layers().set(1, dot);
var ndviChart = ui.Chart.image.series(withNDVI.select('NDVI'), point, ee.Reducer.mean(), 500);
ndviChart.setOptions({
    title: 'NDVI Over Time',
    vAxis: {title: 'NDVI'},
    hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}},
});
  panel_chart.widgets().set(2, ndviChart);
  Map.centerObject(Lysa_hora,14)
  }})
panel.add(Lysa_hora_b)
ui.root.insert(0,panel);