var viirs = ee.ImageCollection("NOAA/VIIRS/DNB/MONTHLY_V1/VCMSLCFG");
var palettes = require('users/gena/packages:palettes')
var style = require('users/gena/packages:style')
print(ee.Date(1391212800000))
// Load first image
var viirsMonths = viirs.map(function(i) {
  var month = ee.Date(
    i.get('system:time_start')
  ).getRelative('month', 'year')
  return i.set('month', month)
})
var lastImage = viirsMonths.sort('system:time_end', false).first()
var viirsSameMonth = viirsMonths.filterMetadata(
  'month', 'equals', lastImage.get('month')
)
print(viirsSameMonth)
var firstImage = viirsSameMonth.sort('system:time_end', true).first()
var bottomMap = ui.root.widgets().get(0)
bottomMap.add(
  ui.Label(
    ee.Date(firstImage.get('system:time_start')
  ).format().getInfo())
)
// Add a color-SWIR composite to the default Map.
bottomMap.addLayer(
  firstImage.updateMask(
    // 0 - 5 gradual transparency
    firstImage.unitScale(0, 5).clamp(0, 1)
  ), 
  {
    bands: ['avg_rad'],
    palette: palettes.cmocean.Solar[7],
    max: 30
  },  
  'first'
);
// Make another map with the last image
var topMap = new ui.Map();
topMap.addLayer(
  lastImage.updateMask(
    // 0 - 5 gradual transparency
    lastImage.unitScale(0, 5).clamp(0, 1)
  ), 
  {
    bands: ['avg_rad'],
    palette: palettes.cmocean.Solar[7],
    max: 30
  },  
  'last'
);
topMap.add(
  ui.Label(
    ee.Date(
      lastImage.get('system:time_start')
    ).format().getInfo()
  )
)
print(style.MAP_STYLES)
bottomMap.setOptions('Satellite')
topMap.setOptions('Satellite')
// Link the default Map to the other map.
var linker = ui.Map.Linker([
  bottomMap, 
  topMap
]);
// Create a SplitPanel which holds the linked maps side-by-side.
var splitPanel = new ui.SplitPanel({
  firstPanel: linker.get(0),
  secondPanel: linker.get(1),
  orientation: 'horizontal',
  wipe: true,
  style: {stretch: 'both'}
});
// Set the SplitPanel as the only thing in root.
ui.root.widgets().reset([splitPanel]);
bottomMap.setCenter(-122.5048, 38.3998, 12);
// // Load and display NDVI data.
// var ndvi = ee.ImageCollection('LANDSAT/LC8_L1T_8DAY_NDVI')
//     .filterDate('2014-01-01', '2015-01-01');
// Map.addLayer(ndvi.median(), {min: 0, max: 1, palette: ['99c199', '006400']}, 'NDVI');
// // Configure the map.
// Map.setCenter(-94.84497, 39.01918, 8);
// Map.style().set('cursor', 'crosshair');
// // Create an empty panel in which to arrange widgets.
// // The layout is vertical flow by default.
// var panel = ui.Panel({style: {width: '400px'}})
//     .add(ui.Label('Click on the map'));
// // Set a callback function for when the user clicks the map.
// Map.onClick(function(coords) {
//   // Create or update the location label (the second widget in the panel)
//   var location = 'lon: ' + coords.lon.toFixed(2) + ' ' +
//                 'lat: ' + coords.lat.toFixed(2);
//   panel.widgets().set(1, ui.Label(location));
//   // Add a red dot to the map where the user clicked.
//   var point = ee.Geometry.Point(coords.lon, coords.lat);
//   Map.layers().set(1, ui.Map.Layer(point, {color: 'FF0000'}));
//   // Create a chart of NDVI over time.
//   var chart = ui.Chart.image.series(ndvi, point, ee.Reducer.mean(), 200)
//       .setOptions({
//         title: 'NDVI Over Time',
//         vAxis: {title: 'NDVI'},
//         lineWidth: 1,
//         pointSize: 3,
//       });
//   // Add (or replace) the third widget in the panel by
//   // manipulating the widgets list.
//   panel.widgets().set(2, chart);
// });
// // Add the panel to the ui.root.
// ui.root.add(panel);