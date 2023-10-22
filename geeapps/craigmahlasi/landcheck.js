var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.MultiPoint(),
    table = ui.import && ui.import("table", "table", {
      "id": "users/craigmahlasi/SA"
    }) || ee.FeatureCollection("users/craigmahlasi/SA"),
    table2 = ui.import && ui.import("table2", "table", {
      "id": "users/craigmahlasi/SA"
    }) || ee.FeatureCollection("users/craigmahlasi/SA");
///create point in dam
var dam_point = ee.Geometry.Point([28.01,-26.02]);
//read in the data
var s2 = ee.ImageCollection('COPERNICUS/S2_SR')
.filterBounds(table)
.map(function(image){return image.clip(table)})
.filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 5))
.filterDate('2020-01-01', '2020-05-12')
.median();
//var s2_min = ee.Reducer.min(s2)
print(s2);
//calculate ndvi and add image
/// B8 = red band  B4 = near infrared band
var s2_ndvi = s2.normalizedDifference(['B8','B4']);
var s2_ndwi = s2.normalizedDifference(['B8','B11']);
var clippedLater = s2_ndvi.clipToCollection(table)
var clippedLater1 = s2_ndwi.clipToCollection(table)
//print(s2);
print(s2_ndvi);
Map.setCenter(24.52,-32.21,4);           ///third option is zoom level apparently 14 is good
//Map.addLayer(clippedLater,{},'Sentinel 2 ndvi');  /// what colour we should make map or ndvi level
//Map.addLayer(clippedLater1,{},'Sentinel 2 ndwi');
Map.addLayer(s2, {bands: ['B4', 'B3', 'B2'], min: 0, max: 2792}, 'Colour Image');
var S2f = s2.select('B.+')
Export.image.toDrive({
  image: S2f,
  description: 'Camdeboo',
  scale: 10
});
var colorizedVis = {
  min: 0.0,
  max: 1.0,
  palette: [
    'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
    '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
    '012E01', '011D01', '011301'
  ],
};
var colorizedVis2 = {
  min: 0.0,
  max: 1.0,
  palette: [
'F1B555', 'FCD163',  
  '1E90FF', '00BFFF','0000FF'
  ],
};
Map.addLayer(clippedLater, colorizedVis, 'Monthly Mean NDVI');
Map.addLayer(clippedLater1, colorizedVis2, 'Monthly Mean NDWI');
  //Import GEE Feature Collection (Somaliland kml)
var S21 = ee.ImageCollection('COPERNICUS/S2_SR')
//filter start and end date
.filterDate('2020-01-01', '2020-05-12')
//filter according to drawn boundary
.filterBounds(table);
// Function to mask cloud from built-in quality band
// information on cloud
var maskcloud2 = function(image) {
var QA60 = image.select(['QA60']);
return image.updateMask(QA60.lt(1));
};    
// Create image collection of S-2 imagery for the perdiod 2016-2018
var S2 = ee.ImageCollection('COPERNICUS/S2_SR')
//filter start and end date
.filterDate('2020-01-01', '2020-05-12')
//filter according to drawn boundary
.filterBounds(table);
// Function to mask cloud from built-in quality band
// information on cloud
var maskcloud1 = function(image) {
var QA60 = image.select(['QA60']);
return image.updateMask(QA60.lt(1));
};
// Function to calculate and add an NDVI band
var addNDVI = function(image) {
return image.addBands(image.normalizedDifference(['B8', 'B4']));
};
// Add NDVI band to image collection
var S2 = S2.map(addNDVI);
// Extract NDVI band and create NDVI median composite image
var NDVI = S2.select(['nd']);
var NDVImed = NDVI.median(); //I just changed the name of this variable ;)
// Function to calculate and add an NDWI band
var addNDWI = function(image) {
return image.addBands(image.normalizedDifference(['B8', 'B11']));
};
// Add NDWI band to image collection
var S21 = S21.map(addNDWI);
// Extract NDWI band and create NDWI median composite image
var NDWI = S21.select(['nd']);
var NDWImed = NDWI.median(); //I just changed the name of this variable ;)
// Create palettes for display of NDVI
var ndvi_pal = ['#d73027', '#f46d43', '#fdae61', '#fee08b', '#d9ef8b',
'#a6d96a'];
Map.style().set('cursor', 'crosshair');
// Create an empty panel in which to arrange widgets.
// The layout is vertical flow by default.
var panel = ui.Panel({style: {width: '400px'}})
    .add(ui.Label('Click on the map'));
// Set a callback function for when the user clicks the map.
Map.onClick(function(coords) {
  // Create or update the location label (the second widget in the panel)
  var location = 'lon: ' + coords.lon.toFixed(2) + ' ' +
                 'lat: ' + coords.lat.toFixed(2);
  panel.widgets().set(1, ui.Label(location));
  // Add a red dot to the map where the user clicked.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  Map.layers().set(1, ui.Map.Layer(point, {color: 'FF0000'}));
  // Create an MODIS EVI chart.
  var eviChart = ui.Chart.image.series(NDWI, point, ee.Reducer.mean(), 200);
  eviChart.setOptions({
        title: 'NDWI through 2020',
        vAxis: {title: 'NDWI'},
        lineWidth: 1,
        pointSize: 3,
      });
  panel.widgets().set(2, eviChart);
  // Create an MODIS NDVI chart.
  var ndviChart = ui.Chart.image.series(NDVI, point, ee.Reducer.mean(), 200);
  ndviChart.setOptions({
    title: 'NDVI through 2020',
        vAxis: {title: 'NDVI'},
        lineWidth: 1,
        colors: ['63ff00', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6'],
        pointSize: 3,
  });
  panel.widgets().set(3, ndviChart);
});
Map.style().set('cursor', 'crosshair');
// Add the panel to the ui.root.
ui.root.insert(0, panel);   
//////////////////////////////////
// set position of panel
var legend1 = ui.Panel({
style: {
position: 'bottom-right',
padding: '8px 15px'
}
});
// Create legend title
var legendTitle1 = ui.Label({
value: 'NDVI',
style: {
fontWeight: 'bold',
fontSize: '18px',
margin: '0 0 4px 0',
padding: '0'
}
});
// Add the title to the panel
legend1.add(legendTitle1);
// create the legend image
var lon = ee.Image.pixelLonLat().select('latitude');
var gradient = lon.multiply((colorizedVis.max-colorizedVis.min)/100.0).add(colorizedVis.min);
var legendImage = gradient.visualize(colorizedVis);
// create text on top of legend
var panel10 = ui.Panel({
widgets: [
ui.Label(colorizedVis['max'])
],
});
legend1.add(panel10);
// create thumbnail from the image
var thumbnail1 = ui.Thumbnail({
image: legendImage,
params: {bbox:'0,0,10,100', dimensions:'10x200'},
style: {padding: '1px', position: 'bottom-center'}
});
// add the thumbnail to the legend
legend1.add(thumbnail1);
// create text on top of legend
var panel10 = ui.Panel({
widgets: [
ui.Label(colorizedVis['min'])
],
});
legend1.add(panel10);
Map.add(legend1);
///////////////////////////
// set position of panel
var legend2 = ui.Panel({
style: {
position: 'bottom-left',
padding: '8px 15px'
}
});
// Create legend title
var legendTitle2 = ui.Label({
value: 'NDWI',
style: {
fontWeight: 'bold',
fontSize: '18px',
margin: '0 0 4px 0',
padding: '0'
}
});
// Add the title to the panel
legend2.add(legendTitle2);
// create the legend image
var lon2 = ee.Image.pixelLonLat().select('latitude');
var gradient2 = lon.multiply((colorizedVis2.max-colorizedVis2.min)/100.0).add(colorizedVis2.min);
var legendImage2 = gradient.visualize(colorizedVis2);
// create text on top of legend
var panel20 = ui.Panel({
widgets: [
ui.Label(colorizedVis2['max'])
],
});
legend2.add(panel20);
// create thumbnail from the image
var thumbnail2 = ui.Thumbnail({
image: legendImage2,
params: {bbox:'0,0,10,100', dimensions:'10x200'},
style: {padding: '1px', position: 'bottom-center'}
});
// add the thumbnail to the legend
legend2.add(thumbnail2);
// create text on top of legend
var panel20 = ui.Panel({
widgets: [
ui.Label(colorizedVis2['min'])
],
});
legend2.add(panel20);
Map.add(legend2);