var table = ui.import && ui.import("table", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                67.91114392406081,
                37.237802268776115
              ],
              [
                67.91114392406081,
                5.362867625771409
              ],
              [
                94.98145642406081,
                5.362867625771409
              ],
              [
                94.98145642406081,
                37.237802268776115
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [
        {
          "type": "rectangle"
        }
      ],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[67.91114392406081, 37.237802268776115],
          [67.91114392406081, 5.362867625771409],
          [94.98145642406081, 5.362867625771409],
          [94.98145642406081, 37.237802268776115]]], null, false),
    S2 = ui.import && ui.import("S2", "imageCollection", {
      "id": "COPERNICUS/S2_SR"
    }) || ee.ImageCollection("COPERNICUS/S2_SR");
// Filter collection to dates of interest.
var s2 = S2.filterDate('2018-1-1', '2018-12-30').filterBounds(table);
// Create two collections to sample from, one for each plot.
//var rgb = l8.select(['B4', 'B3', 'B2']);
var ndvi = s2.map(function(image) {
  return image.select().addBands(image.normalizedDifference(['B8', 'B4']).rename('NDVI'));
});
// Create a panel to hold our widgets.
var panel = ui.Panel();
panel.style().set('width', '300px');
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'Two Chart Inspector',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
  ui.Label('Click a point on the map to inspect.')
]);
panel.add(intro);
// Create panels to hold lon/lat values.
var lon = ui.Label();
var lat = ui.Label();
panel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
// Register a callback on the default map to be invoked when the map is clicked.
Map.onClick(function(coords) {
  // Update the lon/lat panel with values from the click event.
  lon.setValue('lon: ' + coords.lon.toFixed(2)),
  lat.setValue('lat: ' + coords.lat.toFixed(2));
  // Add a red dot for the point clicked on.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point, {color: 'FF0000'});
  Map.layers().set(1, dot);
  // Create an NDVI chart.
  var ndviChart = ui.Chart.image.series(ndvi, point, ee.Reducer.mean(), 500);
  ndviChart.setOptions({
    title: 'NDVI Over Time',
    vAxis: {title: 'NDVI'},
    hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}},
  });
  panel.widgets().set(2, ndviChart);
});
Map.style().set('cursor', 'crosshair');
// Add the panel to the ui.root.
ui.root.insert(0, panel);