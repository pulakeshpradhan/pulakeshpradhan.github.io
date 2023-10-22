// ------------------------------------
// "broad-based rangeland mask":
// closed canopy woodland (CCW),  1
// dense scrubland (DS), 2
// bushland (BU), 3
// open canopy woodland (OCW), 4
// sparse scrubland (SS),  5
// and cultivated land (CL) 6
// grassland (GR), 7
// ------------------------------------
// "high-forage value rangeland mask":
// dense scrubland (DS), 2
// open canopy woodland (OCW), 4
// sparse scrubland (SS), 5
// and grassland (GR) 7
var images = {
  '2000-2005': ee.Image('projects/ee-gerardosoto/assets/class00_05'),
  '2006-2010': ee.Image('projects/ee-gerardosoto/assets/class06_10'),
  '2011-2015': ee.Image('projects/ee-gerardosoto/assets/class11_15'),
  '2016-2020': ee.Image('projects/ee-gerardosoto/assets/class16_20')  
};
var classes = {
  1: 'Closed Canopy Woodland',
  2: 'Dense Scrubland',
  3: 'Bushland',
  4: 'Open Canopy Woodland',
  5: 'Sparse Scrubland',
  6: 'Cultivated Land',
  7: 'Grassland',
  8: 'Sparse Vegetation'
}
var classPalette = [
  '6f6f6f',
  '152106',
  'cdb33b',
  '6a2325',
  '51ad6d',
  'cc0013',
  '33280d',
  'f7e084',
  'd7cdcc'
];
var viz = {palette: classPalette, min: 0, max: 8}
var legendColors = {
  'Closed Canopy Woodland': '152106',
  'Dense Scrubland': 'cdb33b',
  'Bushland': '6a2325',
  'Open Canopy Woodland': '51ad6d',
  'Sparse Scrubland': 'cc0013',
  'Cultivated Land': '33280d',
  'Grassland': 'f7e084',
  'Sparse Vegetation': 'd7cdcc'
}
var makeRow = function(color, name) {
  // Create the label that is actually the colored box.
  var colorBox = ui.Label({
    style: {
      backgroundColor: '#' + color,
      // Use padding to give the box height and width.
      padding: '9px',
      margin: '1 0 4px 0'
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
Map.setOptions('SATELLITE')
Map.centerObject(images['2000-2005'], 6)
Map.style().set('cursor', 'crosshair');
// This function changes the given map to show the selected image.
function updateMap(selection) {
  Map.layers().set(0, ui.Map.Layer(images[selection], viz, 'LCC'));
}
var select = ui.Select({items: Object.keys(images), onChange: updateMap});
// print(select)
select.setValue(Object.keys(images)[0], true);
// Get data to put into panel
Map.onClick(function(coords) {
  // Create or update the location label (the second widget in the panel)
  var location = 'Location: lon = ' + coords.lon.toFixed(2) + ', ' +
                'lat = ' + coords.lat.toFixed(2);
  panel.widgets().set(3, ui.Label(location, {fontWeight: 'bold'}));
  // Add a red dot to the map where the user clicked.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  Map.layers().set(1, ui.Map.Layer(point, {color: 'FF0000'}, 'location'));
  var sample = images[Object.keys(images)[0]].sample(point, 30);
  var computedValue = sample.first().get('classification');
  // Request the value from the server. (sequentially... callbacks dont like pre-declared functions)
  computedValue.evaluate(function(result) {
    // When the server returns the value, show it.
    panel.widgets().set(4, ui.Label({
      value: 'LC class 00-05 = ' + classes[result],
    }));
  });
  sample = images[Object.keys(images)[1]].sample(point, 30);
  computedValue = sample.first().get('classification');
  // Request the value from the server. (sequentially... callbacks dont like pre-declared functions)
  computedValue.evaluate(function(result) {
    // When the server returns the value, show it.
    panel.widgets().set(5, ui.Label({
      value: 'LC class 06-10 = ' + classes[result],
    }));
  });
  sample = images[Object.keys(images)[2]].sample(point, 30);
  computedValue = sample.first().get('classification');
  // Request the value from the server. (sequentially... callbacks dont like pre-declared functions)
  computedValue.evaluate(function(result) {
    // When the server returns the value, show it.
    panel.widgets().set(6, ui.Label({
      value: 'LC class 11-15 = ' + classes[result],
    }));
  });
  sample = images[Object.keys(images)[3]].sample(point, 30);
  computedValue = sample.first().get('classification');
  // Request the value from the server. (sequentially... callbacks dont like pre-declared functions)
  computedValue.evaluate(function(result) {
    // When the server returns the value, show it.
    panel.widgets().set(7, ui.Label({
      value: 'LC class 16-20 = ' + classes[result],
    }));
  });
})
// Create an empty panel in which to arrange widgets.
// The layout is vertical flow by default.
var panel = ui.Panel({style: {width: '300px'}})
    .add(ui.Label('First, select a year:'))
    .add(select)
    .add(ui.Label('Now click on the map'))
    // .add(location)
// Add the panel to the ui.root.
ui.root.add(panel);
var legend = ui.Panel()
Object.keys(legendColors).map(function(key) {
  var value = legendColors[key]
  return legend.add(makeRow(value, key));
})
legend.style().set({
  width: '300px',
  position: 'bottom-right'
});
Map.add(legend);