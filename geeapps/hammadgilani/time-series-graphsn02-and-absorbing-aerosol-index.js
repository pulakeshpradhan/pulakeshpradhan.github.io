var StartDate = '2018-07-01';
var EndDate = '2019-10-06';
// add satellite time sesries: MODIS NDVI 250m 16 day -------------
var collection01 = ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_NO2")
    .filterDate(StartDate,EndDate)
    .select('NO2_column_number_density');
// add satellite time sesries: MODIS NDVI 250m 16 day -------------
var collection02 = ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_NO2")
    .filterDate(StartDate,EndDate)
    .select('absorbing_aerosol_index');
var collection03 = ee.ImageCollection("COPERNICUS/S5P/OFFL/L3_NO2")
    .filterDate('2018-10-20','2018-10-25')
    .select('NO2_column_number_density');
var viz = {
  min: 0,
  max: 0.0002,
  opacity: 0.8,
  palette: ["black", "blue", "purple", "cyan", "green", "yellow", "red"]
};
Map.addLayer(collection03, viz, 'Average NO2 July-November 2018');
Map.setCenter(73.43, 30.77, 5);
// ***Panel*** \\
// set position of panel
var legend = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {
    position: 'bottom-left',
    padding: '30x 30px',
    color: '000000'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'NO2 (mol/m^2)',
  style: {
    fontWeight: 'bold',
    fontSize: '15px',
    margin: '0 0 0 0',
    padding: '1',
    }
});
 // Add the title to the panel
legend.add(legendTitle); 
// create the legend image
var lon = ee.Image.pixelLonLat().select('latitude');
var gradient = lon.multiply((viz.max-viz.min)/100.0).add(viz.min);
var legendImage = gradient.visualize(viz);
// create text on top of legend
var panel = ui.Panel({
    widgets: [
      ui.Label(viz['max'])
    ],
  });
legend.add(panel);
// create thumbnail from the image
var thumbnail = ui.Thumbnail({
  image: legendImage,
    params: {bbox:'0,0,10,100', dimensions:'20x200'},  
    style: {padding: '1px', position: 'bottom-center'},
  });
// add the thumbnail to the legend
legend.add(thumbnail);
// create text on top of legend
var panel = ui.Panel({
    widgets: [
      ui.Label(viz['min'])
    ],
   });
legend.add(panel);
Map.add(legend);
// Create User Interface portion 
// Create a panel to hold our widgets.
var panel = ui.Panel();
panel.style().set({
  width: '500px',
  height: '500px'});
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'Click a point on the map to inspect time series graphs',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
  //ui.Label('Time series graphs of Nitrogen Dioxide & Absorbing Aerosol Index')
]);
panel.add(intro);
// panels to hold lon/lat values
var lon = ui.Label();
var lat = ui.Label();
panel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
Map.onClick(function(coords) {
  panel.clear();
  lon.setValue('lon: ' + coords.lon.toFixed(0)),
  lat.setValue('lat: ' + coords.lat.toFixed(0));
  var point = ee.Geometry.Point(coords.lon, coords.lat);
var eviChart = ui.Chart.image.series(collection01, point);
  eviChart.setOptions({
    title: 'Sentinel 5P TROPOMI Nitrogen Dioxide 2018',
    vAxis: {title: 'NO2 (mol/m^2)', minValue: 0, maxValue: 0.0002},
    hAxis: {title: 'Date', format: 'dd-MM', gridlines: {count: 20}},
    interpolateNulls: true
  });
  panel.widgets().set(3, eviChart);
  // Create an MODIS NDVI chart.
  var ndviChart = ui.Chart.image.series(collection02, point);
  ndviChart.setOptions({
    title: 'Sentinel 5P TROPOMI Absorbing Aerosol Index 2018',
    vAxis: {title: 'Absorbing Aerosol Index', minValue: -5, max: 5},
    hAxis: {title: 'Date', format: 'dd-MM', gridlines: {count: 20}},
    interpolateNulls: true
      });
  panel.widgets().set(3, ndviChart);
});
Map.style().set('cursor', 'crosshair');
// Add the panel to the ui.root.
ui.root.insert(1, panel);