var ndviVis = {"min":0,"max":1,"palette":["FFFFFF","CE7E45","DF923D","F1B555","FCD163","99B718","74A901","66A000","529400","3E8601","207401","056201","004C00","023B01","012E01","011D01","011301"]};
// Load and display NDVI data.
var ndvi = //ee.ImageCollection('LANDSAT/LC8_L1T_8DAY_NDVI')
          ee.ImageCollection('MODIS/006/MOD09GQ')
    .filterDate('2003-01-01', '2004-01-01')
    .map(function(img){
                      return img.addBands(
                                          img.normalizedDifference
                                        (['sur_refl_b02', 'sur_refl_b01'])
                            // Use the normalizedDifference(A, B) to compute (A - B) / (A + B)
                                        .rename("NewNDVI")
                                          )
                                .select('NewNDVI')
                                // .clip(point)
    });
Map.addLayer(ndvi.median(),  ndviVis,'NDVI');
// Map.addLayer(ndvi.median(), {min: 0, max: 1, palette: ['99c199', '006400']}, 'NDVI');
// Configure the map.
// Map.setCenter(-94.84497, 39.01918, 8);
Map.setCenter(46.43, 37.80,10);
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
  // Create a chart of NDVI over time.
  var chart = ui.Chart.image.series(ndvi, point, ee.Reducer.mean(), 200)
      .setOptions({
        title: 'NDVI Over Time',
        vAxis: {title: 'NDVI'},
        lineWidth: 1,
        pointSize: 3,
      });
  // Add (or replace) the third widget in the panel by
  // manipulating the widgets list.
  panel.widgets().set(2, chart);
});
// Add the panel to the ui.root.
ui.root.add(panel);