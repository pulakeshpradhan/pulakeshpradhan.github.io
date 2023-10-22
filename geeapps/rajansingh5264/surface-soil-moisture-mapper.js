// SMAP Global soil moisture data 
// https://developers.google.com/earth-engine/datasets/catalog/NASA_USDA_HSL_SMAP10KM_soil_moisture?hl=en#description
Map.drawingTools().setShown(false);
var collection = ee.ImageCollection('NASA_USDA/HSL/SMAP10KM_soil_moisture');
//                  .filter(ee.Filter.date('2017-04-01', '2021-11-29'));
var dataset = collection;
var soilMoisture = dataset.select('ssm');
var soilMoistureVis = {
  min: 0.0,
  max: 28.0,
  palette: ['ff0303', 'efff07', 'efff07', '418504', '0300ff'],
//  palette: ['0300ff', '418504', 'efff07', 'efff07', 'ff0303'],
};
Map.setCenter(33.16, 49.64, 4);
Map.addLayer(soilMoisture, soilMoistureVis, 'Soil Moisture');
Map.style().set('cursor', 'crosshair');
// Use a DateSlider to create annual composites of this collection.
var start = ee.Image(collection.first()).date().format();
var now = Date.now();
var end = ee.Date(now).format();
// Run this function on a change of the dateSlider.
var showMosaic = function(range) {
  var mosaic = soilMoisture.filter(ee.Filter.date(range.start(), range.end()));
// Asynchronously compute the name of the composite.  Display it.
  range.start().get('year').evaluate(function(name) {
        var manth = range.start().get('month').getInfo().toString();
 //       print(manth);
        var layer = ui.Map.Layer(mosaic, soilMoistureVis, name + '/' + manth + '  soil moisture');
    Map.layers().set(0, layer);
  });
};
// Asynchronously compute the date range and show the slider.
var dateRange = ee.DateRange(start, end).evaluate(function(range) {
  var dateSlider = ui.DateSlider({
    start: range['dates'][0],
    end: range['dates'][1],
    value: null,
    period: 12,
    onChange: showMosaic
  });
  dateSlider.style().set({width: '800px',
                          position: 'bottom-center'
  })
  Map.add(dateSlider.setValue(now));
});
// Set a callback function for when the user clicks the map.
Map.onClick(function(coords) {
  // Create or update the location label (the second widget in the panel)
  var location = 'lon: ' + coords.lon.toFixed(2) + ' ' +
                 'lat: ' + coords.lat.toFixed(2);
  panel.widgets().set(4, ui.Label(location));
  // Add a red dot to the map where the user clicked.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  Map.layers().set(1, ui.Map.Layer(point, {color: 'FF0000'}, 'click'));
  // Create a chart of Soil Moisture over time.
  var chart = ui.Chart.image.series(soilMoisture, point, ee.Reducer.mean(), 10000)
      .setOptions({
        title: 'Soil Moisture Over Time',
        vAxis: {title: 'Soil Moisture'},
        lineWidth: 1,
        pointSize: 3,
      });
  // Add (or replace) the third widget in the panel by
  // manipulating the widgets list.
  panel.widgets().set(5, chart);
//  panel.widgets().set(5, ui.Label('Here is a:\nnew line', {whiteSpace: 'pre'}));
});
var heder = ui.Label('Surface Soil Moisture Mapper', 
                     {fontSize: '28px', color: 'blue', fontWeight: 'bold'});
var text = ui.Label(
    '10-km spatial resolution. Data soure:',
    {fontSize: '14px'});
var link = ui.Label(
    'NASA-USDA Enhanced SMAP Global Soil Moisture Data', {},
    'https://developers.google.com/earth-engine/datasets/catalog/NASA_USDA_HSL_SMAP10KM_soil_moisture');    
var caltoaction = ui.Label('Click on the map', {fontSize: '16px', color: 'red'});
var coord_space = ui.Label(' ');
var chart_space = ui.Label(' ');
var created_by = ui.Label('Developed by:', {fontWeight: 'bold'});
var created_by_link = ui.Label('Rajan Kumar Singh', {},
    'https://rajansingh5264.maps.arcgis.com/home/index.html');
var panel = ui.Panel([heder, text, link, caltoaction,coord_space,chart_space,created_by, created_by_link],  'flow', {width: '400px'});
//panel.add(ui.Label('Here is a:\nnew line', {whiteSpace: 'pre'}) );
// Add the panel to the ui.root.
ui.root.add(panel);