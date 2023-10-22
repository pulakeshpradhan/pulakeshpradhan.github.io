var sentinel5 = ui.import && ui.import("sentinel5", "imageCollection", {
      "id": "COPERNICUS/S5P/NRTI/L3_CO"
    }) || ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_CO"),
    imageVisParam4 = ui.import && ui.import("imageVisParam4", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "mean"
        ],
        "min": 0.03357359285131693,
        "max": 0.03505936970477552,
        "palette": [
          "eff3ff",
          "bdd7e7",
          "6baed6",
          "3182bd",
          "08519c"
        ]
      }
    }) || {"opacity":1,"bands":["mean"],"min":0.03357359285131693,"max":0.03505936970477552,"palette":["eff3ff","bdd7e7","6baed6","3182bd","08519c"]},
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.MultiPoint(),
    table = ui.import && ui.import("table", "table", {
      "id": "users/ogordienko112/border_Kyiv"
    }) || ee.FeatureCollection("users/ogordienko112/border_Kyiv");
Map.centerObject (table,10);
Map.addLayer (table,{},'border',false);
var startDate2019 = '2019-01-01';
var endDate2019 = '2019-12-31';
var collection2019 = sentinel5
  .select('CO_column_number_density')
  .filterBounds(table)
  .filterDate(startDate2019,endDate2019)
  .mean();
var clip2019 = collection2019.clip(table);   
var mean2019 = clip2019.reduce(ee.Reducer.mean());
Map.addLayer(mean2019, imageVisParam4, 'S5P_CO2_mean_2019');
var startDate2020 = '2020-01-01';
var endDate2020 = '2020-12-31';
var collection2020 = sentinel5
  .select('CO_column_number_density')
  .filterBounds(table)
  .filterDate(startDate2020,endDate2020)
  .mean();
var clip2020 = collection2020.clip(table);
var mean2020 = clip2020.reduce(ee.Reducer.mean()); 
Map.addLayer(mean2020,imageVisParam4,'S5P_CO2_mean_2020');
//
// Create an inspector panel with a horizontal layout.
var inspector = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {position:'top-left'}
});
// Add a label to the panel.
inspector.add(ui.Label('Click to get mean '));
// Add the panel to the default map.
Map.add(inspector);
// Set the default map's cursor to a "crosshair".
Map.style().set('cursor', 'crosshair');
// Register a callback on the map to be invoked when the map is clicked.
Map.onClick(function(coords) {
  // Clear the panel and show a loading message.
  inspector.clear();
  inspector.style().set('shown', true);
  inspector.add(ui.Label('Loading...', {color: 'gray'}));
  // Compute the mean ; a potentially long-running server operation.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var temporalMean = clip2019.reduce(ee.Reducer.mean());
  var sampledPoint = temporalMean.reduceRegion(ee.Reducer.mean(), point, 30);
  var computedValue = sampledPoint.get('mean');
  // Request the value from the server and use the results in a function.
  computedValue.evaluate(function(result) {
    inspector.clear();
    // Add a label with the results from the server.
    inspector.add(ui.Label({
      value: '2019: ' + result.toFixed(10),
      style: {stretch: 'vertical'}
    }));
    // Add a button to hide the Panel.
    inspector.add(ui.Button({
      label: 'Close',
      onClick: function() {
        inspector.style().set('shown', false);
      }
    }));
  });
});
// Create an inspector panel with a horizontal layout.
var inspector2 = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {position:'top-right'}
});
// Add a label to the panel.
inspector2.add(ui.Label('Click to get mean '));
// Add the panel to the default map.
Map.add(inspector2);
// Set the default map's cursor to a "crosshair".
Map.style().set('cursor', 'crosshair');
// Register a callback on the map to be invoked when the map is clicked.
Map.onClick(function(coords) {
  // Clear the panel and show a loading message.
  inspector2.clear();
  inspector2.style().set('shown', true);
  inspector2.add(ui.Label('Loading...', {color: 'gray'}));
  // Compute the mean NDVI; a potentially long-running server operation.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var temporalMean = clip2020.reduce(ee.Reducer.mean());
  var sampledPoint = temporalMean.reduceRegion(ee.Reducer.mean(), point, 30);
  var computedValue = sampledPoint.get('mean');
  // Request the value from the server and use the results in a function.
  computedValue.evaluate(function(result) {
    inspector2.clear();
    // Add a label with the results from the server.
    inspector2.add(ui.Label({
      value: '2020: ' + result.toFixed(10),
      style: {stretch: 'vertical'}
    }));
    // Add a button to hide the Panel.
    inspector2.add(ui.Button({
      label: 'Close',
      onClick: function() {
        inspector2.style().set('shown', false);
      }
    }));
  });
});