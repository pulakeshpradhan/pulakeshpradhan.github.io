var geometry = /* color: #d63000 */ee.Geometry.MultiPoint();
var addTypeToA = function(image) {  
  var ToA = ee.Image(1).rename(['TOA']);
  return image.addBands(ToA);
};
var addTypeSR = function(image) {  
  var SR = ee.Image(2).rename(['SR']);
  return image.addBands(SR);
};
var SR  = ee.ImageCollection("COPERNICUS/S2_SR");      // => Get Sentinel-2 Surface Reflectance Data
var ToA = ee.ImageCollection("COPERNICUS/S2");      // => Get Sentinel-2 Surface Reflectance Data
Map.setCenter(11.23,49.68,4);
// Create a panel to hold our widgets.
var panel = ui.Panel();
panel.style().set('width', '450px');
/*
 * Additional component configuration
 */
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'Sentinel-2 Ingestion Status',
    style: {fontSize: '26px', fontWeight: 'bold'}
  }),
  ui.Label('Click in the map to obtain information on the ingested Sentinel-2 data.',{fontSize: '15px'})
]);
panel.add(intro);
// Create panels to hold lon/lat values.
var lon = ui.Label();
var lat = ui.Label();
panel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
// Register a callback on the default map to be invoked when the map is clicked.
Map.onClick(function(coords) {
  Map.layers().remove(Map.layers().get(0));
  // Update the lon/lat panel with values from the click event.
  lon.setValue('lon: ' + coords.lon.toFixed(2)),
  lat.setValue('lat: ' + coords.lat.toFixed(2));
  // Add a red dot for the point clicked on.
  var geometry = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(geometry, {color: 'red'});
  var TILE = ui.Map.Layer(SR.filterBounds(geometry).geometry(), {colour: 'black'}, 'MGRS-TILE', true, 0.6);
  Map.layers().set(0, TILE);
  //Map.centerObject(geometry, 6)
  Map.layers().set(1, dot);
  var SR_Type = SR.filterBounds(geometry).filterDate('2015-06-01', '2019-12-31').map(addTypeSR).select('SR');
  var ToA_Type = ToA.filterBounds(geometry).filterDate('2015-06-01', '2019-12-31').map(addTypeToA).select('TOA');
  var S2 = SR_Type.merge(ToA_Type);
  var chart = ui.Chart.image.series(S2, geometry, ee.Reducer.mean(), 10)
.setChartType('ScatterChart')
.setSeriesNames(["Level-2A (SR)", "Level-1C (ToA)"])
    .setOptions({
      legend: { position: 'top', alignment: 'start' },
      title: 'Sentinel-2 Ingestion Status',
      hAxis: {
        gridlines: { color: 'transparent'},
        title: 'Date'
      },
      vAxis: {
        viewWindow: {
        min: 0.5,
        max: 2.5
    },
        textPosition: 'none',
       // gridlines: { color: 'transparent'},
        title: ''
      },
      series: {
            0: {pointSize:2,color: 'red'}, // urban
            1: {pointSize:1,color: 'green'} // forest
}
});
panel.widgets().set(2, chart);
});
Map.setControlVisibility(false, true, true, false, false, true);
Map.setOptions('SATELLITE');
Map.style().set('cursor', 'crosshair');
// Add the panel to the ui.root.
ui.root.insert(0, panel);