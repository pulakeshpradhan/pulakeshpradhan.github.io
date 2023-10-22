var pmc = ui.import && ui.import("pmc", "table", {
      "id": "users/ghoshmanisha463/PMC"
    }) || ee.FeatureCollection("users/ghoshmanisha463/PMC");
// Add PMC boundary to the Map as a layer.
Map.centerObject(pmc, 11);
Map.addLayer(pmc);
// loading LST image collection.
var LST_Modis= ee.ImageCollection("MODIS/006/MOD11A2");
// Define a date range(2011-2018) 
//here, a start date is defined and the end date is determined by advancing 1 year from the start date.
var starting_date = ee.Date('2010-1-1');
var Date_Range = ee.DateRange(starting_date, starting_date.advance(8, 'YEAR'));
//print(Date_Range);
// Filter the Land Surface Temperature collection to include only images intersecting the desired Date Range
var Modis_filter = LST_Modis.filterDate(Date_Range);
//print(Modis_filter )
// Select only the 1km day Land Surface Temperature  data band.
var Modis_LST = Modis_filter .select('LST_Day_1km');
// Scale to Kelvin and convert to Celsius, set image acquisition time.
var Modis_LST_converted = Modis_LST.map(function(img) {
  return img
    .multiply(0.02)
    .subtract(273.15)
    .copyProperties(img, ['system:time_start']);
});
// Chart time series of LST for PUNE
var time_series_chart = ui.Chart.image.series({
  imageCollection: Modis_LST_converted,
  region: pmc,
  reducer: ee.Reducer.mean(),
  scale: 1000,
  xProperty: 'system:time_start'})
  .setOptions({
     title: 'LST Time Series',
     vAxis: {title: 'LST Celsius'}});
print(time_series_chart);
//Visualize temperature data on the map
// Calculate mean temperature 
var clipped_LSTc = Modis_LST_converted.mean().clip(pmc);
// Add clipped image layer to the map.
Map.addLayer(clipped_LSTc, {
  min: 20, max: 40,
  palette: ['#0000ff', '#32cd32', '#ffff00','#ffa500','#ff0000']},
  'Mean temperature');
// Create a panel to hold the chart.
var panel = ui.Panel({style: {width: '400px', position: 'bottom-right'}})
              .add(ui.Label('Click'));
Map.add(panel);
// Register a function to draw a chart when a user clicks on the map.
Map.onClick(function(coords) {
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var chart = ui.Chart.image.series(Modis_LST_converted, point, null, 30);
  chart.setOptions({title: 'Land Surface Temperature'});
  var ts1 = ui.Chart.image.series({
  imageCollection: Modis_LST_converted,
  region: pmc,
  reducer: ee.Reducer.mean(),
  scale: 1000,
  xProperty: 'system:time_start'})
  .setOptions({
     title: 'LST 2018 Time Series',
     vAxis: {title: 'LST Celsius'}});
  panel.add(chart);
});
// Create the title label.
var title = ui.Label('LAND SURFACE TEMPERATURE ON PUNE MUNICIPAL CORPORATION AREAS');
title.style().set('position', 'top-center');
title.style().set('color', 'red');
title.style().set('fontWeight', 'bold');
Map.add(title);