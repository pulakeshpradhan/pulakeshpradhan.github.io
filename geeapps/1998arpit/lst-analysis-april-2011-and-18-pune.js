var pmc = ui.import && ui.import("pmc", "table", {
      "id": "users/1998arpit/pmc"
    }) || ee.FeatureCollection("users/1998arpit/pmc");
// Import LST image collection.
var modis = ee.ImageCollection("MODIS/006/MOD11A2");
// Define a date range of interest; here, a start date is defined and the end
var dateRange = ee.DateRange('2011-04-01', '2011-04-30');
var dateRange1 = ee.DateRange('2018-04-01', '2018-04-30');
// Filter the LST collection to include only images intersecting the desired
// date range.
var mod11a2 = modis.filterDate(dateRange);
var mod11a2_1 = modis.filterDate(dateRange1);
// Select only the 1km day and night LST data band.
var modLSTday_2011 = mod11a2.select('LST_Day_1km');
var modLSTnight_2011 = mod11a2.select('LST_Night_1km');
var modLSTday_2016 = mod11a2_1.select('LST_Day_1km');
var modLSTnight_2016 = mod11a2_1.select('LST_Night_1km');
// function to convert celcius temperature into celcius
var day_2011 = modLSTday_2011.map(function(img) {
  return img
    .multiply(0.02)
    .subtract(273.15)
    .copyProperties(img, ['system:time_start']);
});
var night_2011 = modLSTnight_2011.map(function(img) {
  return img
    .multiply(0.02)
    .subtract(273.15)
    .copyProperties(img, ['system:time_start']);
});
var day_2016 = modLSTday_2016.map(function(img) {
  return img
    .multiply(0.02)
    .subtract(273.15)
    .copyProperties(img, ['system:time_start']);
});
var night_2016 = modLSTnight_2016.map(function(img) {
  return img
    .multiply(0.02)
    .subtract(273.15)
    .copyProperties(img, ['system:time_start']);
});
// Calculate mean temperature for PMC.
var clippedDay_2011 = day_2011.mean().clip(pmc);
var clippedNight_2011 = night_2011.mean().clip(pmc);
var clippedDay_2016 = day_2016.mean().clip(pmc);
var clippedNight_2016 = night_2016.mean().clip(pmc);
//To make PMC visible
Map.centerObject(pmc);
// Create a panel to hold the chart.
var panel = ui.Panel();
panel.style().set({
  width: '600px',
  position: 'bottom-right'
});
// Make a button widget.
var button = ui.Button('Click to View Data of 2011 DAY');
Map.add(button);
button.onClick(function(){
  Map.clear();
  Map.add(legend);
  Map.add(panel);
  Map.add(button1);
  Map.add(button2);
  Map.add(button3);
  panel.clear();
  // Chart time series of LST .
  var ts1 = ui.Chart.image.series({
  imageCollection: day_2011,
  region: pmc,
  reducer: ee.Reducer.mean(),
  scale: 1000,
  xProperty: 'system:time_start'})
  .setOptions({
     title: 'LST Time Series Day April 2011',
     vAxis: {title: 'LST Celsius'},hAxis: {title: 'Date'}});
  panel.add(ts1);
  // create vizualization parameters
var viz = {min:20, max:50, palette:['#96ceb4', '#ffeead', '#ffcc5c', '#ff6f69']};
// Add clipped image layer to the map.
Map.addLayer(clippedDay_2011,viz,'Mean Temperature, 2011 April');
// Hide the button.
    button.style().set('shown', false);
    button1.style().set('shown', true);
    button2.style().set('shown', true);
    button3.style().set('shown', true);
});
var button1 = ui.Button('Click to View Data of 2011 NIGHT');
Map.add(button1);
button1.onClick(function(){
  // Hide the button.
    button.style().set('shown', true);
    Map.clear();
  Map.add(panel);
  Map.add(legend);
  Map.add(button);
  Map.add(button2);
  Map.add(button3);
  panel.clear();
  // Chart time series of LST .
  var ts1 = ui.Chart.image.series({
  imageCollection: night_2011,
  region: pmc,
  reducer: ee.Reducer.mean(),
  scale: 1000,
  xProperty: 'system:time_start'})
  .setOptions({
     title: 'LST Time Series Night April 2011',
     vAxis: {title: 'LST Celsius'},hAxis: {title: 'Date'}});
  panel.add(ts1);
  // create vizualization parameters
var viz = {min:20, max:50, palette:['#96ceb4', '#ffeead', '#ffcc5c', '#ff6f69']};
// Add clipped image layer to the map.
Map.addLayer(clippedNight_2011,viz,'Mean Temperature, 2011 April');
// Hide the button.
    button1.style().set('shown', false);
    button.style().set('shown', true);
    button2.style().set('shown', true);
    button3.style().set('shown', true);
});
var button2 = ui.Button('Click to View Data of 2018 DAY');
Map.add(button2);
button2.onClick(function(){
    Map.clear();
  Map.add(panel);
  Map.add(legend);
  Map.add(button);
  Map.add(button1);
  Map.add(button3);
  panel.clear();
  // Chart time series of LST .
  var ts1 = ui.Chart.image.series({
  imageCollection: day_2016,
  region: pmc,
  reducer: ee.Reducer.mean(),
  scale: 1000,
  xProperty: 'system:time_start'})
  .setOptions({
     title: 'LST Time Series Day April 2018',
     vAxis: {title: 'LST Celsius'},hAxis: {title: 'Date'}});
  panel.add(ts1);
  // create vizualization parameters
var viz = {min:20, max:50, palette:['#96ceb4', '#ffeead', '#ffcc5c', '#ff6f69']};
// Add clipped image layer to the map.
Map.addLayer(clippedDay_2016,viz,'Mean Temperature, 2018 April');
// Hide the button.
    button2.style().set('shown', false);
    button1.style().set('shown', true);
    button.style().set('shown', true);
    button3.style().set('shown', true);
});
var button3 = ui.Button('Click to View Data of 2018 NIGHT');
Map.add(button3);
button3.onClick(function(){
    Map.clear();
  Map.add(panel);
  Map.add(legend);
  Map.add(button);
  Map.add(button1);
  Map.add(button2);
  panel.clear();
  // Chart time series of LST .
  var ts1 = ui.Chart.image.series({
  imageCollection: night_2016,
  region: pmc,
  reducer: ee.Reducer.mean(),
  scale: 1000,
  xProperty: 'system:time_start'})
  .setOptions({
     title: 'LST Time Series Night April 2018',
     vAxis: {title: 'LST Celsius'},hAxis: {title: 'Date'}});
  panel.add(ts1);
  // create vizualization parameters
var viz = {min:20, max:50, palette:['#96ceb4', '#ffeead', '#ffcc5c', '#ff6f69']};
// Add clipped image layer to the map.
Map.addLayer(clippedNight_2016,viz,'Mean Temperature, 2018 April');
// Hide the button.
    button3.style().set('shown', false);
    button1.style().set('shown', true);
    button2.style().set('shown', true);
    button.style().set('shown', true);
});
// Create legend title
var legendTitle = ui.Label({
  value: 'LST (Celcius)',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
 // Add the title to the panel
legend.add(legendTitle); 
var viz = {min:20, max:50, palette:['#96ceb4', '#ffeead', '#ffcc5c', '#ff6f69']};
// create the legend image
var lon = ee.Image.pixelLonLat().select('latitude');
var gradient = lon.multiply((viz.max-viz.min)/100.0).add(viz.min);
var legendImage = gradient.visualize(viz);
// create text on top of legend
var panel2 = ui.Panel({
    widgets: [
      ui.Label(viz['max'])
    ],
  });
legend.add(panel2);
// create thumbnail from the image
var thumbnail = ui.Thumbnail({
  image: legendImage, 
  params: {bbox:'0,0,10,100', dimensions:'10x200'},  
  style: {padding: '1px', position: 'bottom-center'}
});
// add the thumbnail to the legend
legend.add(thumbnail);
// create text on top of legend
var panel3 = ui.Panel({
    widgets: [
      ui.Label(viz['min'])
    ],
  });
legend.add(panel3);
Map.add(legend);