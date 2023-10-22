//Jaya Mapleton GEOG 174 Final Project
//This project aims to look at land classifications and NDVI at UCLA between 2000 and 2015
// Load a region representing Los Angeles County.
var LosAngeles = ee.Feature(ee.FeatureCollection("TIGER/2016/Counties")
                                 .filter(ee.Filter.eq('NAME', 'Los Angeles'))
                                 .first());
// Define a study area and center map
var ucla = ee.Geometry.Rectangle(-118.43, 34.08, -118.46, 34.04);
Map.centerObject(ucla, 14);
// Set cursor style
Map.style().set('cursor', 'crosshair');
//Landsat 7 NDVI from 2000 to 2015
var NDVI = ee.ImageCollection('LANDSAT/LE07/C01/T1_8DAY_NDVI')
                  .filterBounds(ucla)
                  .filterDate('2000-01-01', '2015-12-31');
var NDVI_ucla = NDVI.select('NDVI');
var NDVI_Vis = {
  min: 0.0,
  max: 1.0,
  palette: [
    'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
    '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
    '012E01', '011D01', '011301'
  ],
};
Map.addLayer(NDVI_ucla, NDVI_Vis, 'NDVI_ucla');
// Define a broad list of land cover categories for classification.
var classNames = ee.List(['Water', 'Forest', 'Shrub', 'Grass', 'Urban']);
// Load MODIS land cover data.
var classifiedImage = ee.Image('MODIS/051/MCD12Q1/2012_01_01')
    //.clipToBoundsAndScale(ucla)
    // Select the IGBP classification.
    .select(['Land_Cover_Type_1'])
    // Reclassify to the broad categories.
    .remap([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17],
          [0,1,1,1,1,1,2,2,1,3,3,0,3,4,3,0,4,0]);
// Load Landsat 8 TOA reflectance, add the IGBP band.
var image = ee.Image('LANDSAT/LC8_L1T_32DAY_TOA/20130407')
    .select('B[1-7]')
    .addBands(classifiedImage);
// Define a list of Landsat 8 wavelengths for X-axis labels.
var wavelengths = [0.44, 0.48, 0.56, 0.65, 0.86, 1.61, 2.2];
// Define chart customization options.
var options = {
  lineWidth: 1,
  pointSize: 2,
  hAxis: {title: 'Wavelength (micrometers)'},
  vAxis: {title: 'Reflectance'},
  title: 'Spectra in classified regions of Los Angeles'
};
// Make the chart, set the options.
var chart = ui.Chart.image.byClass(
    image, 'remapped', LosAngeles, ee.Reducer.mean(), 500, classNames, wavelengths)
    .setOptions(options)
    //Make the bar chart a scatter plot
    .setChartType('ScatterChart');
// Print the chart.
print(chart);
//Create map title
var title = ui.Label({
  value: 'NDVI over UCLA and West Los Angeles',
  style: {
    fontSize: '30px',
    fontWeight: 'bold'
  }
});
// Create an empty panel with title and details
var panel = ui.Panel({style: {width: '400px'}})
    .add(ui.Label('Click on the map'));
panel.add(title);
// Set a callback function for when the user clicks the map.
Map.onClick(function(coords) {
  // Create or update the location label 
  var location = 'lon: ' + coords.lon.toFixed(2) + ' ' +
                'lat: ' + coords.lat.toFixed(2);
  panel.widgets().set(1, ui.Label(location));
  // Add a red dot to the map where the user clicked.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  Map.layers().set(1, ui.Map.Layer(point, {color: 'FF0000'}));
  // Create a chart of NDVI over time.
  var NDVI_chart = ui.Chart.image.series(NDVI, point, ee.Reducer.mean(), 200)
      .setOptions({
        title: 'NDVI Over Time',
        vAxis: {title: 'NDVI'},
        lineWidth: 1,
        pointSize: 3,
      });
// Add (or replace) the third widget in the panel by
// manipulating the widgets list.
  panel.widgets().set(2, NDVI_chart);
});
// Add the panel to the app
ui.root.add(panel);