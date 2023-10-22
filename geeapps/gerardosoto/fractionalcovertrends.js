var snazzyBlack = [
  {
    featureType: 'administrative',
    elementType: 'all',
    stylers: [{visibility: 'off'}]
  },
  {
    featureType: 'administrative',
    elementType: 'labels.text.fill',
    stylers: [{color: '#444444'}]
  },
  {
    featureType: 'landscape',
    elementType: 'all',
    stylers: [{color: '#000000'}, {visibility: 'on'}]
  },
  {featureType: 'poi', elementType: 'all', stylers: [{visibility: 'off'}]}, {
    featureType: 'road',
    elementType: 'all',
    stylers: [{saturation: -100}, {lightness: 45}]
  },
  {
    featureType: 'road',
    elementType: 'geometry.fill',
    stylers: [{color: '#ffffff'}]
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{color: '#eaeaea'}]
  },
  {featureType: 'road', elementType: 'labels', stylers: [{visibility: 'off'}]},
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{color: '#dedede'}]
  },
  {
    featureType: 'road',
    elementType: 'labels.icon',
    stylers: [{visibility: 'off'}]
  },
  {
    featureType: 'road.highway',
    elementType: 'all',
    stylers: [{visibility: 'simplified'}]
  },
  {
    featureType: 'road.arterial',
    elementType: 'labels.icon',
    stylers: [{visibility: 'off'}]
  },
  {featureType: 'transit', elementType: 'all', stylers: [{visibility: 'off'}]},
  {
    featureType: 'water',
    elementType: 'all',
    stylers: [{color: '#434343'}, {visibility: 'on'}]
  }
];
Map.setOptions('snazzyBlack', {snazzyBlack: snazzyBlack})
// --------------------------------------------------------------------------------------------------------------------------
var palette = ['red', 'white', 'green'];  // PV and NPV palette 
var paletteBg = ['green', 'white', 'red'];  // BG palette 
var bg = ee.Image('projects/ee-gerardosoto/assets/Kenya_FC_trends/BG_sigSlope_0022')
var pv = ee.Image('projects/ee-gerardosoto/assets/Kenya_FC_trends/PV_sigSlope_0022')
var npv = ee.Image('projects/ee-gerardosoto/assets/Kenya_FC_trends/NPV_sigSlope_0022')
Map.addLayer(bg, {min: -1, max: 1, palette: palette}, 'BG', 1)
Map.addLayer(pv, {min: -1, max: 1, palette: palette}, 'PV', 1)
Map.addLayer(npv, {min: -1, max: 1, palette: palette}, 'NPV', 1)
Map.centerObject(bg, 7)
Map.style().set('cursor', 'crosshair');
var images = bg.select(['slope_median'], ['BG'])
  .addBands(pv.select(['slope_median'], ['PV']))
  .addBands(npv.select(['slope_median'], ['NPV']))
print(images)
// Get data to put into panel
Map.onClick(function(coords) {
  // Create or update the location label (the second widget in the panel)
  var location = 'Location: lon = ' + coords.lon.toFixed(3) + ', ' +
                'lat = ' + coords.lat.toFixed(3);
  panel.widgets().set(3, ui.Label(location));
  // Add a red dot to the map where the user clicked.
  var point = ee.Geometry.Point([coords.lon, coords.lat]);
  Map.layers().set(3, ui.Map.Layer(point, {color: 'FF0000'}, 'location'));
  var sample = images.unmask().sample({region: point, scale: 10, numPixels: 1});
  print(sample)
  var computedValueBg = ee.Number(sample.first().get('BG')).multiply(100).round().divide(100);
  var computedValuePv = ee.Number(sample.first().get('PV')).multiply(100).round().divide(100);
  var computedValueNpv = ee.Number(sample.first().get('NPV')).multiply(100).round().divide(100);
  // Request the value from the server.
  computedValueBg.evaluate(function(result) {
    // When the server returns the value, show it.
    panel.widgets().set(4, ui.Label({
      value: 'Bare ground = ' + result + '.',
    }));
  });
  computedValuePv.evaluate(function(result) {
    // When the server returns the value, show it.
    panel.widgets().set(5, ui.Label({
      value: 'Photosynthetic Veg. = ' + result + '.',
    }));
  });
  computedValueNpv.evaluate(function(result) {
    // When the server returns the value, show it.
    panel.widgets().set(6, ui.Label({
      value: 'non-Photosynthetic Veg. = ' + result + '.',
    }));
  });
  // select.style().set('shown', true);  /// not working, disappearing
}) 
// Create an empty panel in which to arrange widgets.
var titulo = ui.Label('Vegetation Fractional Cover Trend Viewer')
titulo.style().set({'fontWeight': 'bold'})
// The layout is vertical flow by default.
var panel = ui.Panel({style: {width: '300px'}})
    .add(titulo)
    .add(ui.Label('Positive trends are green, negative trends are red, and white for near-zero trends. Remember to use the Layers panel to show/unshow individual layers and set their opacity'))
    .add(ui.Label('Click on the map to show pixel values of Fractional Cover Trends'))
    // .add(location)
// Add the panel to the ui.root.
ui.root.add(panel);