var roi3 = ee.FeatureCollection("users/salitchakma/boundary_rohingya"),
    geometry = /* color: #d63000 */ee.Geometry.Point([92.14913024576367, 21.199992618148915]),
    geometry2 = /* color: #d63000 */ee.Geometry.Polygon(
        [[[92.13251794114797, 21.194952497046216],
          [92.1452208830425, 21.194392322889865],
          [92.1452208830425, 21.202554650588365],
          [92.13140214219777, 21.202954753095167]]]);
// Point for filterbound
var roi = ee.Geometry.Point([92.1339935642684,21.19472665398992])
Map.addLayer(roi,{}, 'Roi');
var bounds = ee.FeatureCollection('ft:1qmko1-eqaw1JcJT7_KvG8C2ZbcvdhzQrfWhKSHPB')
bounds = bounds.geometry().bounds() // Clip to roi in video export
var text = require('users/gena/packages:text')
// Center the display to ROI.
Map.centerObject(roi, 13);
// Function to get NDVI.
var getNDVI = function(image){
    var NDVI = image.normalizedDifference(['B8', 'B4']).rename('NDVI')
    var clouds = image.select('QA60').gte(1024).unmask().not().rename('CloudMask')
  return image.addBands(NDVI)
  };
// Gets the current time.  
var eeNow = ee.Date(Date.now());
// SET OBSERVATION PERIOD
var startDate = '2016-02-15';
var endDate = eeNow;
// Gets image collection of Observation Period
var series = ee.ImageCollection('COPERNICUS/S2').filterDate(startDate, endDate)
              .filterBounds(roi)
              .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10))
              .map(getNDVI)
              .select([ 'B8','B4', 'B3', 'B2', 'NDVI']);
// Textbox to get user input of latest year
var endYear = ui.Textbox({
  placeholder: 'Enter ending year here...',
  onChange: function(text) {
    var input = ee.Number(text);
    return input;
  }
});
Map.add(endYear);
// List of years and months
var years = ee.List
  .sequence(2016, ee.Number.parse(eeNow.format('Y'))); // Gets latest year 
              // from eeNow as string then converts string to a number
var months = ee.List.sequence(1, 12);
// Filters images annualy-monthly
var map_m = function(i) {
  i = ee.Number(i);
  var filtered_col = months.map(function(j) {
    var filtered = series
        .filter(ee.Filter.calendarRange(j, j, 'month'))
        .filter(ee.Filter.calendarRange(i, i, 'year'))
    var mean = filtered.reduce(ee.Reducer.mean())
    var median=filtered.reduce(ee.Reducer.median())
    var max =filtered.reduce(ee.Reducer.max())
    var time = ee.Date.fromYMD(i,j,1)
    //var keepProperties = ['system:time_start', 'system:time_end'];
    var custom_time = ee.Number.parse(time.format('YYYYMMDD'))
    return mean.set('system:time_start', time.millis())
            .set('custom:time_start', custom_time)
            .addBands(median)
            .addBands(max)
            .addBands(ee.Image(custom_time).rename('time'))
            .clip(roi3)
            //.copyProperties(ee.Image(filtered.first()), keepProperties)
  });
  return filtered_col;
};
var img_col = ee.ImageCollection(years.map(map_m).flatten());
print(img_col,'image collection');
// Removing null images - https://www.linkedin.com/pulse/time-series-landsat-data-google-earth-engine-andrew-cutts/
var nullimages = img_col
    .map(function(image) {
      return image.set('count', image.bandNames().length())
    })
    .filter(ee.Filter.gt('count', 1))
print('final images: ', nullimages)
//Calculates NDVI 
var ndvi = nullimages//.select('NDVI_max');
print(ndvi, 'ndvi')
// *** To display chart at display
var title = {
  title: 'NDVI anomaly over time',
  hAxis: {title: 'Time'},
  vAxis: {title: 'NDVI'},
};
// print(ui.Chart.image.series(ndvi.select(['NDVI_median', 'NDVI_max', 'NDVI_mean']),
//   geometry,
//   ee.Reducer.max(), 
//   30,
//   'system:time_start')
//       .setOptions(title));
// print(ui.Chart.image.seriesByRegion(ndvi.select(['NDVI_median', 'NDVI_max', 'NDVI_mean']),
//   // ['NDVI_max'], //, 'NDVI_max', 'NDVI_mean'],
//   geometry2,
//   ee.Reducer.max(), 
//   ['NDVI_max', 'NDVI_median', 'NDVI_mean'],
//   30,
//   'system:time_start',
//   'label')
//   //imageCollection, regions, reducer, band, scale, xProperty, seriesProperty
//       .setOptions(title));
//print(ui.Chart.image.series(cumulative, geometry2, ee.Reducer.max(), 30,'system:time_start'));
// // ** End of to display chart at display**
// Function to set palletes to image collection
var setPalletes = function(image){
  var img = image.select('NDVI_max');
  var time = image.get('system:time_start')
  var image02 = img.gte(0.2);
  var image04 = img.gte(0.4);
  var image06 = img.gte(0.6);
  var image08 = img.gte(0.8);
  return image02.add(image04).add(image06).add(image08)
    .addBands(image.select('time'))
    .set('system:time_start', time);
};
//Add first image of NDVI
//Map.addLayer(ndvi.first(), {bands: ['NDVI_max'], min:0.2, max: 1, palette: ['red', 'orange', 'yellow', 'green']}, 'first');
//var seriesBins = series.first().gt(0.2).add(series.first().gt(0.3)).add(series.first().gt(0.4)).add(series.first().gt(0.5))
var newImages = ndvi.map(setPalletes);
print(newImages, 'new images')
//Map.addLayer(newImages.first(), 
 // {bands: ['NDVI_max'], min:0, max: 4, palette: ['black','red','orange','yellow', 'green']},
  //'Time'+newImages.first().get('system:time_start'));
// var visCol = newImages.map(function(image){
//   return image.visualize({bands: ['NDVI_max'], min:0, max: 4, palette: ['black','red','orange','yellow', 'green']});
// });
//make the data 8-bit which is necessary for making a video
var ndvi_video =  newImages.map(function(image){
  var start = ee.Date(image.get('system:time_start'))
  var label = start.format('YYYY-MM-dd')
  return image.select('NDVI_max').visualize({
    forceRgbOutput: true,
    palette: ['black','red','orange','yellow', 'green'],
    min: 0,
    max: 4
  }).clip(bounds).set({label: label});
});
// annotate
var annotations = [{
    position: 'left', 
    offset: '90%', 
    margin: '2%', 
    property: 'label', 
    scale: 200 //Map.getScale() * 2
  }];
print('dome')
ndvi_video = ndvi_video.map(function(image) {
  return text.annotateImage(image, {}, bounds, annotations);
});
// **Placed it here **
var animation = require('users/gena/packages:animation')
    animation.animate(ndvi_video, {maxFrames: 15})
// var button = ui.Button({
//   label: 'Click me',
//   onClick: function() {
//   // Taken from here to place it where the asterix is   
//   }
// });
// button.style().set('position', 'top-right')
// Map.add(button);  
////////////////////////////////////////////////////////////////////
//-------------ADD LEGENDS FOR Canopy Height Map-----------------------------------------
// Set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'Vegetation map based on NDVI values',
  style: {
    fontWeight: 'bold',
    fontSize: '12px',
    margin: '0 0 4px 0',
    padding: '0',
    color: '264d08'
    }
});
// Add the title to the panel
legend.add(legendTitle);
// Creates and styles 1 row of the legend.
var makeRow = function(color, name) {
      // Create the label that is actually the colored box.
      var colorBox = ui.Label({
        style: {
          backgroundColor: color,
          // Use padding to give the box height and width.
          padding: '8px',
          margin: '0 0 4px 0'
        }
      });
      // Create a label with the description text.
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}
      });
      // Return the panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
//  Palette with the colors
var palette =['000000', 'red', 'orange', 'yellow','green'];
// Name of each legend value
var names = ['Non-forest', 'Degradation', 'Prone to degradation', 'Healthy vegetation', 'Very healty vegetation'];
// Add color and and names to legend
for (var i = 0; i < 5; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
Map.add(legend);
/////////////////////////////////////////////
// // add a few layers to map
// var animation = require('users/gena/packages:animation')
// animation.animate(ndvi_video, {maxFrames: 15})
// Create User Interface portion --------------------------------------------------
// Create a panel to hold our widgets.
var panel = ui.Panel();
panel.style().set('width', '300px');
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'Chart Inspector',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
  ui.Label('Click a point on the map to inspect.')
]);
panel.add(intro);
// panels to hold lon/lat values
var lon = ui.Label();
var lat = ui.Label();
panel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
// Register a callback on the default map to be invoked when the map is clicked
Map.onClick(function(coords) {
  // Update the lon/lat panel with values from the click event.
  lon.setValue('lon: ' + coords.lon.toFixed(2)),
  lat.setValue('lat: ' + coords.lat.toFixed(2));
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  // Create NDVI chart.
  var ndviChart = ui.Chart.image.series(ndvi.select(
    ['NDVI_median', 'NDVI_max', 'NDVI_mean']),
    point, ee.Reducer.mean(), 30, 'system:time_start');
  ndviChart.setOptions(title);
  panel.widgets().set(1, ndviChart);
});
Map.style().set('cursor', 'crosshair');
// Add the panel to the ui.root.
ui.root.insert(0, panel);
// var title = {
//   title: 'NDVI anomaly over time',
//   hAxis: {title: 'Time'},
//   vAxis: {title: 'NDVI'},
// };
// print(ui.Chart.image.series(ndvi.select(['NDVI_median', 'NDVI_max', 'NDVI_mean']),
//   geometry,
//   ee.Reducer.max(), 
//   30,
//   'system:time_start')
//       .setOptions(title));
//Export NDVI from whole study area to video
// Export.video.toDrive({
//   collection: ndvi_video,
//   description: "NDVItimelapse",    // Filename, no spaces allowed
//   framesPerSecond: 1,             
//   dimensions: 1080,
//   region: bounds,
//   scale: 250,                     // Scale in m
//   });
// var fals = nullimages.select(['B8_median', 'B4_median', 'B3_median'])
// Map.addLayer(fals.first(), {bands: ['B8_median', 'B4_median', 'B3_median'], min: 500, max: 3000}, 'false')
// var falseCol = fals.map(function(image){
//   return image.visualize({bands: ['B8_median', 'B4_median', 'B3_median'], min: 100, max: 3000}
//   //{label: image.get('system:start_time')}
//   )
// })
// Export.video.toDrive({
//   collection: falseCol, //visCol,
//   description: 'false color',
//   dimensions: 1080,
//   framesPerSecond: 1,
//   region: roi3.geometry().bounds()
// });
//Map.addLayer(newImages.first(), {bands: ['NDVI'], min: 0, max: 4, palette: ['black','red', 'orange', 'yellow', 'green']}, 'first');
// Example given by David
//Map.addLayer(image,{},ee.String(image.get('system:time_start')))  // example