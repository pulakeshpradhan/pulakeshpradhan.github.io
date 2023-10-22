var geometry = 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[49.21537343651448, -11.49944568647599],
          [47.89701406151448, -12.745414900019032],
          [45.65580312401448, -14.836528922886112],
          [43.94193593651448, -16.191505824680952],
          [42.84330312401448, -18.331624323012644],
          [42.84330312401448, -21.920664518092245],
          [43.32670156151448, -24.98410517137084],
          [44.95267812401448, -25.93634961818642],
          [46.79838124901448, -25.778167067479316],
          [48.38041249901448, -24.06456099534715],
          [50.40189687401448, -18.373334465129233],
          [51.01713124901448, -13.686594486498668],
          [50.05033437401448, -12.187597900802505]]]);
//cloud mask
function maskL8sr(image) {
  // Bits 3 and 5 are cloud shadow and cloud, respectively.
  var cloudShadowBitMask = (1 << 3);
  var cloudsBitMask = (1 << 5);
  // Get the pixel QA band.
  var qa = image.select('pixel_qa');
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
                 .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
  return image.updateMask(mask);
}
// Filter a collection to a time of interest.
var l8 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR').map(maskL8sr)
    .filterDate('2018-01-01', '2020-01-01').filterBounds(geometry);
var ndvi = l8.map(function(image) {
  return image.select().addBands(image.normalizedDifference(['B5', 'B4']));
});
// Nice visualization parameters for a vegetation index.
var vis = {min: 0, max: 1, palette: [
  'FFFFFF', 'CE7E45', 'FCD163', '66A000', '207401',
  '056201', '004C00', '023B01', '012E01', '011301']};
Map.addLayer(ndvi, vis, 'NDVI');
Map.setCenter(46.38, -19.47, 7);
// Create an inspector panel with a horizontal layout.
var inspector = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal')
});
// Add a label to the panel.
inspector.add(ui.Label('Click to get mean NDVI 2018-2020'));
// Add the panel to the default map.
Map.add(inspector);
//--------------------------------------------------------------------
var panel = ui.Panel();
panel.style().set({
  width: '400px',
  position: 'bottom-right'
});
Map.add(panel);
// Add a label to the panel.
panel.add(ui.Label('Centre Géo-informatique Appliqué au Développement Rural (CGARD),Madagascar'));
//--------------------------------------------------------------------------
// Set the default map's cursor to a "crosshair".
Map.style().set('cursor', 'crosshair');
// Register a callback on the map to be invoked when the map is clicked.
Map.onClick(function(coords) {
  // Clear the panel and show a loading message.
  inspector.clear();
  inspector.style().set('shown', true);
  inspector.add(ui.Label('Loading...', {color: 'gray'}));
  // Compute the mean NDVI; a potentially long-running server operation.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var temporalMean = ndvi.reduce(ee.Reducer.mean());
  var sampledPoint = temporalMean.reduceRegion(ee.Reducer.mean(), point, 30);
  var computedValue = sampledPoint.get('nd_mean');
  // Request the value from the server and use the results in a function.
  computedValue.evaluate(function(result) {
    inspector.clear();
    // Add a label with the results from the server.
    inspector.add(ui.Label({
      value: 'Mean NDVI: ' + result.toFixed(2),
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