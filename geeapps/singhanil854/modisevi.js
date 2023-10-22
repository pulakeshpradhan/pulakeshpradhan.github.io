// Use a DateSlider to create annual composites of this collection.
var collection = ee.ImageCollection('MODIS/006/MYD13Q1');
// Use the start of the collection and now to bound the slider.
var start = collection.first().date().get('year').format();
var now = Date.now();
var end = ee.Date(now).format();
// Run this function on a change of the dateSlider.
var showMosaic = function(range) {
var colored = collection.select('EVI').filterDate(range.start(), range.end());
  // Asynchronously compute the name of the composite.  Display it.
  range.start().get('year').evaluate(function(name) {
  var eviVis = {
  min: 0.0,
  max: 8000.0,
  palette: [
    'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
    '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
    '012E01', '011D01', '011301'
  ]};
    var layer = ui.Map.Layer(colored, eviVis,'mosaico');
    Map.layers().set(0, layer);
    Map.setCenter(81.2, 25.65, 4);
    Map.style().set('cursor', 'crosshair');
  });
};
// Asynchronously compute the date range and show the slider.
var dateRange = ee.DateRange(start, end).evaluate(function(range) {
  var dateSlider = ui.DateSlider({
    start: range['dates'][0],
    end: range['dates'][1],
    value: null,
    period: 16,
    onChange: showMosaic
  });
  Map.add(dateSlider.setValue(now));
});
// Create the title label.
var title = ui.Label('Click on the map to extract the EVI time series from the MYD13Q1.006 Aqua Vegetation Indices 16-Day Global 250m and use the calendar to change the mosaic view');
title.style().set('position', 'top-center');
Map.add(title);
var title = ui.Label('Prepare by: Dr. Anil Kumar Singh');
title.style().set('position', 'bottom-center');
Map.add(title);
// Create a panel to hold the chart.
var panel = ui.Panel();
panel.style().set({
  width: '500px',
  position: 'bottom-left'
});
Map.add(panel);
// Register a function to draw a chart when a user clicks on the map.
Map.onClick(function(coords) {
  panel.clear();
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var location = 'lon: ' + coords.lon.toFixed(2) + ' ' +
                 'lat: ' + coords.lat.toFixed(2);
  panel.widgets().set(1, ui.Label(location));
  Map.layers().set(1, ui.Map.Layer(point, {color: 'FF0000'}));
  var EVI = ee.ImageCollection('MODIS/006/MYD13Q1').map(function(image) {
  return image.addBands(image.expression(
    '(EVI*0.0001)',
    {
        EVI: image.select('EVI') 
    }).select([0], ['band']))
    .set('timeFormat', image.date().format('yyyy-MM-dd'));
});
  var chart = ui.Chart.image.seriesByRegion(EVI, point, ee.Reducer.mean(),
'band',250,'timeFormat','label')
              .setChartType('LineChart').setOptions({
                title: '',
                hAxis: {title: ''},
                vAxis: {title: 'EVI'}
});
  panel.add(chart);
});