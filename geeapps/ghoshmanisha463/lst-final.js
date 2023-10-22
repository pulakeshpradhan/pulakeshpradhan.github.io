var pmc = ui.import && ui.import("pmc", "table", {
      "id": "users/ghoshmanisha463/PMC"
    }) || ee.FeatureCollection("users/ghoshmanisha463/PMC");
//load image
var LST_Modis_day = ee.ImageCollection('MODIS/006/MOD11A2').select('LST_Day_1km');
var LST_Modis_night = ee.ImageCollection('MODIS/006/MOD11A2').select('LST_Night_1km');
// Scale to Kelvin and convert to Celsius, set image acquisition time.
var LSTday = LST_Modis_day.map(function(img) {
  return img.multiply(0.02).subtract(273.15).copyProperties(img,['system:time_start','system:time_end']); 
});
var LSTnight = LST_Modis_night.map(function(img) {
  return img.multiply(0.02).subtract(273.15).copyProperties(img,['system:time_start','system:time_end']); 
});
// Select dates
var modis_filter_night_2011 = ee.ImageCollection(LSTnight.filterDate('2011-04-01', '2011-04-30'));
var modis_filter_day_2011 = ee.ImageCollection(LSTday.filterDate('2011-04-01', '2011-04-30'));
var modis_filter_night_2018=ee.ImageCollection(LSTnight.filterDate('2018-04-01', '2018-04-30'));
var modis_filter_day_2018=ee.ImageCollection(LSTday.filterDate('2018-04-01', '2018-04-30'));
// Calculate mean temperature for pune.
var clip1 = modis_filter_night_2011.filterBounds(pmc).mean().clip(pmc);
Map.addLayer(clip1,{
  min: 20, max: 60,
  palette: ['#0000ff', '#32cd32', '#ffff00','#ffa500','#ff0000','#cd320f']},
  'Mean temperature 2011 night');
var clip2 = modis_filter_day_2011.filterBounds(pmc).mean().clip(pmc);
Map.addLayer(clip2,{
  min: 20, max: 60,
  palette: ['#0000ff', '#32cd32', '#ffff00','#ffa500','#ff0000','#cd320f']},
  'Mean temperature 2011 day');
var clip3 = modis_filter_night_2018.filterBounds(pmc).mean().clip(pmc);
Map.addLayer(clip3,{
  min: 20, max: 60,
  palette: ['#0000ff', '#32cd32', '#ffff00','#ffa500','#ff0000','#cd320f']},
  'Mean temperature 2018 night');
var clip4 = modis_filter_day_2018.filterBounds(pmc).mean().clip(pmc);
Map.addLayer(clip4,{
  min: 20, max: 60,
  palette: ['#0000ff', '#32cd32', '#ffff00','#ffa500','#ff0000','#cd320f']},
  'Mean temperature 2018 day');  
Map.centerObject(pmc,11);
// Create an empty panel in which to arrange widgets.
// The layout is vertical flow by default.
var panel = ui.Panel({style: {width: '400px'}})
    .add(ui.Label('Click on the map'));
// Set a callback function for when the user clicks the map.
Map.onClick(function(coords) {
panel.clear();
  // Create or update the location label (the second widget in the panel)
  var location = 'lon: ' + coords.lon.toFixed(2) + ' ' +
                 'lat: ' + coords.lat.toFixed(2);
  panel.widgets().set(0, ui.Label(location));
  // Add a red dot to the map where the user clicked.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  Map.layers().set(4, ui.Map.Layer(point, {color: 'FF0000'}));
// Chart time series of LST for PUNE
var time_series_chart1 = ui.Chart.image.series({
  imageCollection: modis_filter_day_2011,
  region: pmc,
  reducer: ee.Reducer.mean(),
  scale: 1000,
  xProperty: 'system:time_start'})
  .setOptions({
     title: 'LST Time Series 2011 DAY',
     vAxis: {title: 'LST Celsius'}});
panel.add(time_series_chart1);
// Chart time series of LST for PUNE
var time_series_chart2 = ui.Chart.image.series({
  imageCollection: modis_filter_night_2011,
  region: pmc,
  reducer: ee.Reducer.mean(),
  scale: 1000,
  xProperty: 'system:time_start'})
  .setOptions({
     title: 'LST Time Series 2011 NIGHT',
     vAxis: {title: 'LST Celsius'}});
panel.add(time_series_chart2);
// Chart time series of LST for PUNE
var time_series_chart3 = ui.Chart.image.series({
  imageCollection: modis_filter_night_2018,
  region: pmc,
  reducer: ee.Reducer.mean(),
  scale: 1000,
  xProperty: 'system:time_start'})
  .setOptions({
     title: 'LST Time Series 2018 NIGHT',
     vAxis: {title: 'LST Celsius'}});
panel.add(time_series_chart3);
// Chart time series of LST for PUNE
var time_series_chart4 = ui.Chart.image.series({
  imageCollection: modis_filter_day_2018,
  region: pmc,
  reducer: ee.Reducer.mean(),
  scale: 1000,
  xProperty: 'system:time_start'})
  .setOptions({
     title: 'LST Time Series 2018 DAY',
     vAxis: {title: 'LST Celsius'}});
panel.add(time_series_chart4);
// Add (or replace) the third widget in the panel by
  // manipulating the widgets list.
panel.widgets().set(4, time_series_chart1,time_series_chart2,time_series_chart3,time_series_chart4);
});
// Add the panel to the ui.root.
ui.root.add(panel);
// Create the title label.
var title = ui.Label('LAND SURFACE TEMPERATURE ON PUNE MUNICIPAL CORPORATION AREAS');
title.style().set('position', 'top-center');
Map.add(title);
 // create vizualization parameters
var viz = {min:20, max:60, palette:['#0000ff', '#32cd32', '#ffff00','#ffa500','#ff0000','#cd320f']};
// set position of panel
var legend = ui.Panel({
style: {
position: 'bottom-left',
padding: '8px 15px'
}
});
// Create legend title
var legendTitle = ui.Label({
value: 'Temperature',
style: {
fontWeight: 'bold',
fontSize: '18px',
margin: '0 0 4px 0',
padding: '0'
}
});
// Add the title to the panel
legend.add(legendTitle);
// create the legend image
var lon = ee.Image.pixelLonLat().select('latitude');
var gradient = lon.multiply((viz.max-viz.min)/100.0).add(viz.min);
var legendImage = gradient.visualize(viz);
// labelling maximum temperature in legend
var panel1 = ui.Panel({
widgets: [
ui.Label(viz['max'])
],
});
legend.add(panel1);
// create thumbnail from the image
var thumbnail = ui.Thumbnail({
image: legendImage,
params: {bbox:'0,0,10,100', dimensions:'10x200'},
style: {padding: '1px', position: 'bottom-center'}
});
// add the thumbnail to the legend
legend.add(thumbnail);
// labelling minimum temperature in legend
var panel1 = ui.Panel({
widgets: [
ui.Label(viz['min'])
],
});
legend.add(panel1);
Map.add(legend);