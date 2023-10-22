var PALETTE = [
  '009900', // 1: Forest
  'c6b044', // 2: Shrubland
  'dade48', // 3: Savanna
  'b6ff05', // 4: Grassland
  '27ff87', // 5: Wetland
  '80d000', // 6: Cropland
  'c24f44', // 7: Urban
  'ffffff', // 8: Snow/Ice
  'f9ffa4', // 9: Barren / Desert
  '1c1cc0', // 10: Water
];
var NAMES = [
  'Forest',
  'Shrubland',
  'Savanna',
  'Grassland',
  'Wetland',
  'Cropland',
  'Urban',
  'Snow / Ice',
  'Barren / Desert',
  'Water',
];
var image = ee.Image('MODIS/006/MCD12Q1/2016_01_01')
  .unmask(17)
  .updateMask(1)
  .select('LC_Type1').remap(
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
    [0, 0, 0, 0, 0, 1, 1, 2, 2,  3,  4,  5,  6,  5,  7,  8,  9]);
var visualized = image.visualize({palette:PALETTE})
  .reduceResolution(ee.Reducer.mean(), true, 16);
Map.addLayer(visualized, {format:'png'}, 'Land Cover Type');
Map.style().set({cursor: 'crosshair'});
Map.setCenter(0, 20, 2);
// Create the panel for the legend.
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
legend.add(ui.Label({
  value: 'Land Cover Type',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
  }
}));
Map.add(legend);
// Populate the entries of the legend.
for (var i = 0; i < NAMES.length; i++) {
  // Create the label that is actually the colored box.
  var colorBox = ui.Label({
    style: {
      backgroundColor: '#' + PALETTE[i],
      // Use padding to give the box height and width.
      padding: '8px',
      margin: '0 0 4px 0'
    }
  });
  // Create the label filled with the description text.
  var description = ui.Label({
    value: NAMES[i],
    style: {margin: '0 0 4px 6px'}
  });
  legend.add(ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  }));
}
// Create the panel for the inspector.
var inspector = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px',
    shown: false,
  }
});
Map.add(inspector);
// Wire up a click handler to the inspector.
Map.onClick(function(lonlat) {
  image.reduceRegion({
    reducer: ee.Reducer.first(),
    geometry: ee.Geometry.Point([lonlat.lon, lonlat.lat]),
    crs: image.projection(),
  }).evaluate(function(result) {
    var lon = ui.Label('Longitude: ' + lonlat.lon);
    var lat = ui.Label('Latitude: ' + lonlat.lat);
    var name = ui.Label('Land Cover Type: ' + NAMES[result.remapped]);
    inspector.widgets().reset([lon, lat, name]);
    inspector.style().set({shown: true});
  });
});