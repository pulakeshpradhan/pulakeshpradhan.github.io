var sentinel = ui.import && ui.import("sentinel", "imageCollection", {
      "id": "COPERNICUS/S2_SR"
    }) || ee.ImageCollection("COPERNICUS/S2_SR"),
    imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "B2",
          "B11",
          "B12"
        ],
        "min": -252.05810443443352,
        "max": 4014.244180544908,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["B2","B11","B12"],"min":-252.05810443443352,"max":4014.244180544908,"gamma":1},
    route = ui.import && ui.import("route", "table", {
      "id": "users/rudplatt/backpacking/northFork"
    }) || ee.FeatureCollection("users/rudplatt/backpacking/northFork"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -119.3629,
            37.8759
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Point([-119.3629, 37.8759]);
Map.setOptions("TERRAIN")
Map.centerObject(geometry,11);
var collection = sentinel.filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 50))
var recent = collection.filterBounds(geometry).sort('system:time_start',false).first();
var recentdate = recent.get('system:time_start')
// Function to mask cloud from built-in quality band
// information on cloud
var maskcloud1 = function(image) {
var QA60 = image.select(['QA60']);
return image.updateMask(QA60.lt(1));
};
// Function to calculate and add an NDWI band
var addNDVI = function(image) {
return image.addBands(image.normalizedDifference(['B2', 'B11']));
};
// Add NDWI band to image collection
var collection = collection.map(addNDVI);
var collectionMask = collection.map(maskcloud1)
// Use the start of the collection and now to bound the slider.
var start = ee.Image(collection.first()).date().get('year').format();
var now = Date.now();
var end = ee.Date(now).format();
// Run this function on a change of the dateSlider.
var showMosaic = function(range) {
  Map.layers().reset();
  var mosaic = collection.filterDate(range.start(), range.end()).sort('CLOUDY_PIXEL_PERCENTAGE', false).map(function(image) {
                    return image.addBands(image.metadata('system:time_start'));
                  })
  Map.addLayer(mosaic.mosaic(), imageVisParam, 'Sentinel-2 image', true)
  Map.addLayer(route,{color:'yellow'},'route')
  //Map.addLayer(ee.FeatureCollection(nFork),{},'North Fork')
  ;
};
// Asynchronously compute the date range and show the slider.
var dateRange = ee.DateRange(start, end).evaluate(function(range) {
  var dateSlider = ui.DateSlider({
    start: range['dates'][0],
    end: range['dates'][1],
    value: null,
    period: 7,
    onChange: showMosaic
  });
  Map.add(dateSlider.setValue(recentdate.getInfo()));
});
// Create button to close chart
var button = ui.Button({
  label: 'Close',
  onClick: function() {
    panel.style().set('shown', false);
  }
});
// Create button to close chart
var button2 = ui.Button({
  label: 'Close',
  onClick: function() {
    panel2.style().set('shown', false);
  }
});
// Create a panel to hold the chart.
var panel = ui.Panel();
panel.style().set({
  width: '400px',
  position: 'bottom-right',
  shown: false
});
Map.add(panel);
// instructions
var snowEval = ui.Label('snowEvaluator')
snowEval.style().set('color', 'red');
//print(snowEval)
var title = ui.Label(' - Shows a false color image for the selected week (red = snow)\n - Click on map to graph snow cover trends\n - Use Layers menu to toggle between image/terrain or adjust transparency\n - Some weeks have no imagery due to persistent cloud cover\n - Artifacts may be visible at edge of image tiles',{whiteSpace: 'pre'});
//title.style().set('position', 'bottom-left');
// Create a panel to hold the text.
var panel2 = ui.Panel();
panel2.style().set({
  //width: '400px',
  position: 'bottom-left',
  shown: true
});
Map.add(panel2);
panel2.add(snowEval)
panel2.add(title)
panel2.add(button2)
// Create a time series chart.
// Register a function to draw a chart when a user clicks on the map.
Map.onClick(function(coords) {
  panel.clear();
  panel.style().set('shown', true);
  var point = ee.FeatureCollection(ee.Feature(ee.Geometry.Point(coords.lon, coords.lat), {'label': 'Snow Index'}));
  var chart = ui.Chart.image.seriesByRegion(collectionMask, point,ee.Reducer.mean(),'nd',10,'system:time_start','label')
              .setChartType('ScatterChart').setOptions({
                title: 'Snow Index - positive numbers indicate snow',
                hAxis: {title: 'Date'},
                vAxis: {title: 'Normalized Difference Snow Index (NDSI)'}
              });
  panel.add(chart);
  panel.add(button)
});