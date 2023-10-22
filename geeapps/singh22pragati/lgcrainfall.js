var table = ee.FeatureCollection("users/singh22pragati/command_area");
var chirps = ee.ImageCollection("UCSB-CHG/CHIRPS/PENTAD")
var P = chirps.select("precipitation").filterDate('2018-06-01', '2019-06-30').sum()
var ima =P.clip(table)
// create vizualization parameters
var viz = {min:0, max:1800, palette:['ffffff','b7f0ae','21f600','0000FF','FDFF92','FF2700','d600ff']};
// add the map
Map.addLayer(ima, viz);
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'Rainfall (mm)',
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
  params: {bbox:'0,0,10,100', dimensions:'10x200'},  
  style: {padding: '1px', position: 'bottom-center'}
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
var panel2 = ui.Panel({style: {width: '400px'}})
    .add(ui.Label('Click on the map'));
var inspector = ui.Panel([ui.Label('Click to get total Rainfall')]);
Map.add(inspector);
Map.onClick(function(coords1) {
  // Show the loading label.
  inspector.widgets().set(0, ui.Label({
    value: 'Loading...',
    style: {color: 'gray'}
  }));
  // Determine the mean NDVI, a long-running server operation.
  var point = ee.Geometry.Point(coords1.lon, coords1.lat);
 // var meanNdvi = ima.reduce('precipitation');
  var sample = ima.sample(point, 30);
  var computedValue = sample.first().get('precipitation');
  // Request the value from the server.
  computedValue.evaluate(function(result) {
    // When the server returns the value, show it.
    inspector.widgets().set(0, ui.Label({
      value: 'Precipitation: ' + result.toFixed(2),
    }));
  });
});
Map.onClick(function(coords) {
  // Create or update the location label (the second widget in the panel)
  var location = 'lon: ' + coords.lon.toFixed(2) + ' ' +
                 'lat: ' + coords.lat.toFixed(2);
  panel.widgets().set(1, ui.Label(location));
  // Add a red dot to the map where the user clicked.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  Map.layers().set(1, ui.Map.Layer(point, {color: 'FF0000'}));
  // Create a chart of NDVI over time.
  var chart = ui.Chart.image.series(chirps.filterDate('2018-06-01', '2019-06-30'), point, ee.Reducer.mean(),200)
      .setOptions({
        title: 'Precipitation',
        vAxis: {title: 'NDVI'},
        lineWidth: 1,
        pointSize: 6,
      });
  // Add (or replace) the third widget in the panel by
  // manipulating the widgets list.
  panel2.widgets().set(2, chart);
});
// Add the panel to the ui.root.
ui.root.add(panel2);
Map.centerObject(table)