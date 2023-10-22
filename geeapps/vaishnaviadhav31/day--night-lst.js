var PUNE = ui.import && ui.import("PUNE", "table", {
      "id": "users/vaishnaviadhav31/PMC"
    }) || ee.FeatureCollection("users/vaishnaviadhav31/PMC");
var LSTday = ee.ImageCollection('MODIS/006/MOD11A2').select('LST_Day_1km');
var LSTnight = ee.ImageCollection('MODIS/006/MOD11A2').select('LST_Night_1km'); 
print(LSTday);
print(LSTnight);
Map.centerObject(PUNE);
Map.addLayer(PUNE);
var modLSTday = LSTday.map(function(img) {
  return img.multiply(0.02).subtract(273.15).copyProperties(img,['system:time_start','system:time_end']); 
});
var modLSTnight = LSTnight.map(function(img) {
  return img.multiply(0.02).subtract(273.15).copyProperties(img,['system:time_start','system:time_end']); 
});
var night2011 = ee.ImageCollection(modLSTnight.filterDate('2011-04-01', '2011-04-30'));
var day2011 = ee.ImageCollection(modLSTday.filterDate('2011-04-01', '2011-04-30'));
var night2018=ee.ImageCollection(modLSTnight.filterDate('2018-04-01', '2018-04-30'));
var day2018=ee.ImageCollection(modLSTday.filterDate('2018-04-01', '2018-04-30'));
// Calculate mean of temperature for pune.
var LSTclip1 = night2011.filterBounds(PUNE).mean().clip(PUNE);
var LSTclip2 = day2011.filterBounds(PUNE).mean().clip(PUNE);
var LSTclip3 = night2018.filterBounds(PUNE).mean().clip(PUNE);
var LSTclip4 = day2018.filterBounds(PUNE).mean().clip(PUNE);
var landSurfaceTemperatureVis= {
  min: 39, max: 47,
  palette: [ '040274', '040281', '0502a3', '0502b8', '0502ce', '0502e6',
    '0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef',
    '3be285', '3ff38f', '86e26f', '3ae237', 'b5e22e', 'd6e21f',
    'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08', 'ff500d',
    'ff0000', 'de0101', 'c21301', 'a71001', '911003']};
Map.addLayer(
    LSTclip1, landSurfaceTemperatureVis,
    'Land Surface Temperature Night 2011');
Map.addLayer(
    LSTclip2, landSurfaceTemperatureVis,
    'Land Surface Temperature Day 2011');
Map.addLayer(
    LSTclip3, landSurfaceTemperatureVis,
    'Land Surface Temperature Night 2018');
Map.addLayer(
    LSTclip4, landSurfaceTemperatureVis,
    'Land Surface Temperature Day 2018');
// Configure the map.
Map.setCenter(73.8561077397525, 18.524022172419414, 11);
Map.style().set('cursor', 'crosshair');
// Create an empty panel in which to arrange widgets.
// The layout is vertical flow by default.
var panel = ui.Panel({style: {width: '400px'}})
    .add(ui.Label('Click on the map'));
// Create an empty panel in which to arrange widgets.
// Set a callback function for when the user clicks the map.
Map.onClick(function(coords) {
  // Create or update the location label (the second widget in the panel)
  var location = 'lon: ' + coords.lon.toFixed(2) + ' ' +
                 'lat: ' + coords.lat.toFixed(2);
  panel.widgets().set(1, ui.Label(location));
// Set a callback function for when the user clicks the map.
  // Add a black dot to the map where the user clicked.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  Map.layers().set(6, ui.Map.Layer(point, {color: 'black'}));
  // Chart the time-series
 var temp_trend1 = ui.Chart.image.series({
  imageCollection:night2011,
  region: PUNE,
  reducer: ee.Reducer.median(),
  scale: 1000,
  xProperty: 'system:time_start'})
  .setOptions({
    lineWidth: 1,
    pointSize: 3,
    trendlines: {0: {
        color: 'CC0000'
      }},
     title: 'LST  Time Series',
     vAxis: {title: 'LST Celsius'}});
panel.add(temp_trend1);
  // Chart the time-series
 var temp_trend2 = ui.Chart.image.series({
  imageCollection:day2011,
  region: PUNE,
  reducer: ee.Reducer.median(),
  scale: 1000,
  xProperty: 'system:time_start'})
  .setOptions({
    lineWidth: 1,
    pointSize: 3,
    trendlines: {0: {
        color: 'CC0000'
      }},
     title: 'LST  Time Series',
     vAxis: {title: 'LST Celsius'}});
panel.add(temp_trend2);
       // Chart the time-series
 var temp_trend3 = ui.Chart.image.series({
  imageCollection:night2018,
  region: PUNE,
  reducer: ee.Reducer.median(),
  scale: 1000,
  xProperty: 'system:time_start'})
  .setOptions({
    lineWidth: 1,
    pointSize: 3,
    trendlines: {0: {
        color: 'CC0000'
      }},
     title: 'LST  Time Series',
     vAxis: {title: 'LST Celsius'}});
panel.add(temp_trend3);
       // Chart the time-series
 var temp_trend4 = ui.Chart.image.series({
  imageCollection:day2018,
  region: PUNE,
  reducer: ee.Reducer.median(),
  scale: 1000,
  xProperty: 'system:time_start'})
  .setOptions({
    lineWidth: 1,
    pointSize: 3,
    trendlines: {0: {
        color: 'CC0000'
      }},
     title: 'LST  Time Series',
     vAxis: {title: 'LST Celsius'}});
panel.add(temp_trend4);
  // Add (or replace) the third widget in the panel by
  // manipulating the widgets list.
  panel.widgets().set(2, temp_trend1);
// Add (or replace) the third widget in the panel by
  // manipulating the widgets list.
  panel.widgets().set(2, temp_trend2);
// Add (or replace) the third widget in the panel by
  // manipulating the widgets list.
  panel.widgets().set(2, temp_trend3);
// Add (or replace) the third widget in the panel by
  // manipulating the widgets list.
  panel.widgets().set(2, temp_trend4);
});
// Add the panel to the ui.root.
ui.root.add(panel);
var button = ui.Button({
  label: 'Get Map Center',
  onClick: function() {
    print(Map.getCenter());
  }
});
print(button);
var button = ui.Button({
  label: 'Get Map Center',
  onClick: function() {
    print(Map.getCenter());
  }
});
print(button);
var button = ui.Button({
  label: 'Get Map Center',
  onClick: function() {
    print(Map.getCenter());
  }
});
print(button);
var button = ui.Button({
  label: 'Get Map Center',
  onClick: function() {
    print(Map.getCenter());
  }
});
print(button);
var title = ui.Label({
    value: 'Day & Night Land Surface Temperature in Pune Municipal Corporation',
    style: {fontSize: '20px', color: 'red'}});
Map.add(title);
// create vizualization parameters
var viz = {min:39, max:47,  palette: [ '040274', '040281', '0502a3', '0502b8', '0502ce', '0502e6',
    '0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef',
    '3be285', '3ff38f', '86e26f', '3ae237', 'b5e22e', 'd6e21f',
    'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08', 'ff500d',
    'ff0000', 'de0101', 'c21301', 'a71001', '911003']};
// set position of panel
var legend = ui.Panel({
style: {
position: 'bottom-left',
padding: '8px 15px'
}
});
// Create legend title
var legendTitle = ui.Label({
value: 'Mean LST in Celsius',
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