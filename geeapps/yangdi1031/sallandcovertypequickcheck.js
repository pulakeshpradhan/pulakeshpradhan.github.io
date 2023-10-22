var imageCollection = ee.ImageCollection('users/yangdi1031/lcmap')
var geom = ee.Geometry.Point(-119.88384, 36.30903).buffer(500);
var legend = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px'
  }
});
var makeRow = function(color, name) {
  // Create the label that is actually the colored box.
  var colorBox = ui.Label({
    style: {
      backgroundColor: '#' + color,
      // Use padding to give the box height and width.
      padding: '8px',
      margin: '0 0 4px 0'
    }
  });
  // Create the label filled with the description text.
  var description = ui.Label({
    value: name,
    style: {margin: '0 0 4px 6px'}
  });
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};
 var palette = [
   '900600', 'E9D309','7CD487', '0D5A18', '2C33FA',
  '17586C', 'F1F9F1', '848E84'];
legend.add(makeRow('900600', 'Developed'));
legend.add(makeRow('E9D309', 'Cropland'));
legend.add(makeRow('7CD487', 'Grass/Shrub'));
legend.add(makeRow('0D5A18', 'TreeCover'));
legend.add(makeRow('2C33FA', 'Water'));
legend.add(makeRow('17586C', 'Wetland'));
legend.add(makeRow('F1F9F1', 'IceSnow'));
legend.add(makeRow('848E84', 'Barren'));
// Add the legend to the map.
Map.add(legend);
// Create a panel to hold our widgets.
var panel = ui.Panel();
panel.style().set('width', '300px');
Map.addLayer(imageCollection, 
    {min:0, max: 10, palette: palette}, 'LC');
var panel = ui.Panel();
panel.style().set('width', '300px');
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'LandCover Type Inspector',
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
  // Create  chart.
  var eviChart = ui.Chart.image.series(imageCollection, point, ee.Reducer.mean(), 10);
  eviChart.setOptions({
    title: 'Landcover Type Time Series',
    vAxis: {title: 'Land Cover Class', maxValue: 5},
    hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}},
  });
  panel.widgets().set(2, eviChart);
});
Map.setCenter(-119.29, 36.54, 10);
Map.style().set('cursor', 'crosshair');
// Add the panel to the ui.root.
ui.root.insert(0, panel);