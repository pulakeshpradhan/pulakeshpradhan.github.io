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
var bbMask = function(im){
  return im.updateMask(im.expression('class == 2 || class == 4 || class == 5 || class == 7', {
      'class': im.select('classification')}))
}
var images = {
  '2000': bbMask(ee.Image('projects/ee-gerardosoto/assets/kenya_classified_2000')),
  '2001': bbMask(ee.Image('projects/ee-gerardosoto/assets/kenya_classified_2001')),
  '2002': bbMask(ee.Image('projects/ee-gerardosoto/assets/kenya_classified_2002')),
  '2003': bbMask(ee.Image('projects/ee-gerardosoto/assets/kenya_classified_2003')),
  '2004': bbMask(ee.Image('projects/ee-gerardosoto/assets/kenya_classified_2004')),
  '2005': bbMask(ee.Image('projects/ee-gerardosoto/assets/kenya_classified_2005')),
  '2006': bbMask(ee.Image('projects/ee-gerardosoto/assets/kenya_classified_2006')),
  '2007': bbMask(ee.Image('projects/ee-gerardosoto/assets/kenya_classified_2007')),
  '2008': bbMask(ee.Image('projects/ee-gerardosoto/assets/kenya_classified_2008')),
  '2009': bbMask(ee.Image('projects/ee-gerardosoto/assets/kenya_classified_2009')),
  '2010': bbMask(ee.Image('projects/ee-gerardosoto/assets/kenya_classified_2010')),
  '2011': bbMask(ee.Image('projects/ee-gerardosoto/assets/kenya_classified_2011')),
  '2012': bbMask(ee.Image('projects/ee-gerardosoto/assets/kenya_classified_2012')),
  '2013': bbMask(ee.Image('projects/ee-gerardosoto/assets/kenya_classified_2013')),
  '2014': bbMask(ee.Image('projects/ee-gerardosoto/assets/kenya_classified_2014')),
  '2015': bbMask(ee.Image('projects/ee-gerardosoto/assets/kenya_classified_2015')),
  '2016': bbMask(ee.Image('projects/ee-gerardosoto/assets/kenya_classified_2016')),
  '2017': bbMask(ee.Image('projects/ee-gerardosoto/assets/kenya_classified_2017')),
  '2018': bbMask(ee.Image('projects/ee-gerardosoto/assets/kenya_classified_2018')),
  '2019': bbMask(ee.Image('projects/ee-gerardosoto/assets/kenya_classified_2019')),
  '2020': bbMask(ee.Image('projects/ee-gerardosoto/assets/kenya_classified_2020'))  
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
Map.centerObject(images['2000'], 6)
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
      value: 'LC class 2000 = ' + classes[result],
    }));
  });
  sample = images[Object.keys(images)[1]].sample(point, 30);
  computedValue = sample.first().get('classification');
  // Request the value from the server. (sequentially... callbacks dont like pre-declared functions)
  computedValue.evaluate(function(result) {
    // When the server returns the value, show it.
    panel.widgets().set(5, ui.Label({
      value: 'LC class 2001 = ' + classes[result],
    }));
  });
  sample = images[Object.keys(images)[2]].sample(point, 30);
  computedValue = sample.first().get('classification');
  // Request the value from the server. (sequentially... callbacks dont like pre-declared functions)
  computedValue.evaluate(function(result) {
    // When the server returns the value, show it.
    panel.widgets().set(6, ui.Label({
      value: 'LC class 2002 = ' + classes[result],
    }));
  });
  sample = images[Object.keys(images)[3]].sample(point, 30);
  computedValue = sample.first().get('classification');
  // Request the value from the server. (sequentially... callbacks dont like pre-declared functions)
  computedValue.evaluate(function(result) {
    // When the server returns the value, show it.
    panel.widgets().set(7, ui.Label({
      value: 'LC class 2003 = ' + classes[result],
    }));
  });
  sample = images[Object.keys(images)[4]].sample(point, 30);
  computedValue = sample.first().get('classification');
  // Request the value from the server. (sequentially... callbacks dont like pre-declared functions)
  computedValue.evaluate(function(result) {
    // When the server returns the value, show it.
    panel.widgets().set(8, ui.Label({
      value: 'LC class 2004 = ' + classes[result],
    }));
  });
  sample = images[Object.keys(images)[5]].sample(point, 30);
  computedValue = sample.first().get('classification');
  // Request the value from the server. (sequentially... callbacks dont like pre-declared functions)
  computedValue.evaluate(function(result) {
    // When the server returns the value, show it.
    panel.widgets().set(9, ui.Label({
      value: 'LC class 2005 = ' + classes[result],
    }));
  });
  sample = images[Object.keys(images)[6]].sample(point, 30);
  computedValue = sample.first().get('classification');
  // Request the value from the server. (sequentially... callbacks dont like pre-declared functions)
  computedValue.evaluate(function(result) {
    // When the server returns the value, show it.
    panel.widgets().set(10, ui.Label({
      value: 'LC class 2006 = ' + classes[result],
    }));
  });
  sample = images[Object.keys(images)[7]].sample(point, 30);
  computedValue = sample.first().get('classification');
  // Request the value from the server. (sequentially... callbacks dont like pre-declared functions)
  computedValue.evaluate(function(result) {
    // When the server returns the value, show it.
    panel.widgets().set(11, ui.Label({
      value: 'LC class 2007 = ' + classes[result],
    }));
  });
  sample = images[Object.keys(images)[8]].sample(point, 30);
  computedValue = sample.first().get('classification');
  // Request the value from the server. (sequentially... callbacks dont like pre-declared functions)
  computedValue.evaluate(function(result) {
    // When the server returns the value, show it.
    panel.widgets().set(12, ui.Label({
      value: 'LC class 2008 = ' + classes[result],
    }));
  });
  sample = images[Object.keys(images)[9]].sample(point, 30);
  computedValue = sample.first().get('classification');
  // Request the value from the server. (sequentially... callbacks dont like pre-declared functions)
  computedValue.evaluate(function(result) {
    // When the server returns the value, show it.
    panel.widgets().set(13, ui.Label({
      value: 'LC class 2009 = ' + classes[result],
    }));
  });
  sample = images[Object.keys(images)[10]].sample(point, 30);
  computedValue = sample.first().get('classification');
  // Request the value from the server. (sequentially... callbacks dont like pre-declared functions)
  computedValue.evaluate(function(result) {
    // When the server returns the value, show it.
    panel.widgets().set(14, ui.Label({
      value: 'LC class 2010 = ' + classes[result],
    }));
  });
  sample = images[Object.keys(images)[11]].sample(point, 30);
  computedValue = sample.first().get('classification');
  // Request the value from the server. (sequentially... callbacks dont like pre-declared functions)
  computedValue.evaluate(function(result) {
    // When the server returns the value, show it.
    panel.widgets().set(15, ui.Label({
      value: 'LC class 2011 = ' + classes[result],
    }));
  });
  sample = images[Object.keys(images)[12]].sample(point, 30);
  computedValue = sample.first().get('classification');
  // Request the value from the server. (sequentially... callbacks dont like pre-declared functions)
  computedValue.evaluate(function(result) {
    // When the server returns the value, show it.
    panel.widgets().set(16, ui.Label({
      value: 'LC class 2012 = ' + classes[result],
    }));
  });
  sample = images[Object.keys(images)[13]].sample(point, 30);
  computedValue = sample.first().get('classification');
  // Request the value from the server. (sequentially... callbacks dont like pre-declared functions)
  computedValue.evaluate(function(result) {
    // When the server returns the value, show it.
    panel.widgets().set(17, ui.Label({
      value: 'LC class 2013 = ' + classes[result],
    }));
  });
  sample = images[Object.keys(images)[14]].sample(point, 30);
  computedValue = sample.first().get('classification');
  // Request the value from the server. (sequentially... callbacks dont like pre-declared functions)
  computedValue.evaluate(function(result) {
    // When the server returns the value, show it.
    panel.widgets().set(18, ui.Label({
      value: 'LC class 2014 = ' + classes[result],
    }));
  });
  sample = images[Object.keys(images)[15]].sample(point, 30);
  computedValue = sample.first().get('classification');
  // Request the value from the server. (sequentially... callbacks dont like pre-declared functions)
  computedValue.evaluate(function(result) {
    // When the server returns the value, show it.
    panel.widgets().set(19, ui.Label({
      value: 'LC class 2015 = ' + classes[result],
    }));
  });
  sample = images[Object.keys(images)[16]].sample(point, 30);
  computedValue = sample.first().get('classification');
  // Request the value from the server. (sequentially... callbacks dont like pre-declared functions)
  computedValue.evaluate(function(result) {
    // When the server returns the value, show it.
    panel.widgets().set(20, ui.Label({
      value: 'LC class 2016 = ' + classes[result],
    }));
  });
  sample = images[Object.keys(images)[17]].sample(point, 30);
  computedValue = sample.first().get('classification');
  // Request the value from the server. (sequentially... callbacks dont like pre-declared functions)
  computedValue.evaluate(function(result) {
    // When the server returns the value, show it.
    panel.widgets().set(21, ui.Label({
      value: 'LC class 2017 = ' + classes[result],
    }));
  });
  sample = images[Object.keys(images)[18]].sample(point, 30);
  computedValue = sample.first().get('classification');
  // Request the value from the server. (sequentially... callbacks dont like pre-declared functions)
  computedValue.evaluate(function(result) {
    // When the server returns the value, show it.
    panel.widgets().set(22, ui.Label({
      value: 'LC class 2018 = ' + classes[result],
    }));
  });
  sample = images[Object.keys(images)[19]].sample(point, 30);
  computedValue = sample.first().get('classification');
  // Request the value from the server. (sequentially... callbacks dont like pre-declared functions)
  computedValue.evaluate(function(result) {
    // When the server returns the value, show it.
    panel.widgets().set(23, ui.Label({
      value: 'LC class 2019 = ' + classes[result],
    }));
  });
  sample = images[Object.keys(images)[20]].sample(point, 30);
  computedValue = sample.first().get('classification');
  // Request the value from the server. (sequentially... callbacks dont like pre-declared functions)
  computedValue.evaluate(function(result) {
    // When the server returns the value, show it.
    panel.widgets().set(24, ui.Label({
      value: 'LC class 2020 = ' + classes[result],
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