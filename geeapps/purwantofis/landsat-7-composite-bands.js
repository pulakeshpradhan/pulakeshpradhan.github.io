var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            112.63130707482834,
            -7.968384234342667
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Point([112.63130707482834, -7.968384234342667]);
// Display a grid of linked maps, each with a different visualization.
/*
 * Image setup
 */
// Create an initial mosiac, which we'll visualize in a few different ways.
var image = ee.ImageCollection('LANDSAT/LE7_TOA_5YEAR')
    //.filterDate('2018-09-01', '2018-09-30')
    // Scale the images to a smaller range, just for simpler visualization.
    .map(function f(e) { return e.divide(100); })
    //.median();
// Each map has a name and some visualization parameters.
var MAP_PARAMS = [
  'Natural Color '+'(B3/B2/B1)',
  'False Color (urban) '+'(B7/B5/B3)',
  'Infrared Color (vegetation) '+'(B4/B3/B2)',
  'Agriculture '+'(B5/B4/B1)',
  'Atmospheric Penetration '+'(B7/B5/B4)',
  'Healthy Vegetation '+'(B4/B5/B1)',
  'Land/Water '+'(B4/B5/B3)',
  'Natural With Atmospheric Removal '+'(B7/B4/B2)',
  'Shortwave Infrared '+'(B7/B4/B3)',
  'Vegetation Analysis '+'(B5/B4/B3)'
];
var MINMAX = {
  B1: {min: 0.28, max: 0.48},
  B2: {min: 0.20, max: 0.50},
  B3: {min: 0.12, max: 0.50},
  B4: {min: 0.07, max: 0.79},
  B5: {min: 0.02, max: 0.70},
  B7: {min: 0.00, max: 0.62}
};
// Shared visualization parameters for the images.
var VISPARAMS = [
  {min: [MINMAX.B3.min, MINMAX.B2.min, MINMAX.B1.min], max: [MINMAX.B3.max, MINMAX.B2.max, MINMAX.B1.max], bands: ['B3', 'B2', 'B1']},
  {min: [MINMAX.B7.min, MINMAX.B5.min, MINMAX.B3.min], max: [MINMAX.B7.max, MINMAX.B5.max, MINMAX.B3.max], bands: ['B7', 'B5', 'B3']},
  {min: [MINMAX.B4.min, MINMAX.B3.min, MINMAX.B2.min], max: [MINMAX.B4.max, MINMAX.B3.max, MINMAX.B2.max], bands: ['B4', 'B3', 'B2']},
  {min: [MINMAX.B5.min, MINMAX.B4.min, MINMAX.B1.min], max: [MINMAX.B5.max, MINMAX.B4.max, MINMAX.B1.max], bands: ['B5', 'B4', 'B1']},
  {min: [MINMAX.B7.min, MINMAX.B5.min, MINMAX.B4.min], max: [MINMAX.B7.max, MINMAX.B5.max, MINMAX.B4.max], bands: ['B7', 'B5', 'B4']},
  {min: [MINMAX.B4.min, MINMAX.B5.min, MINMAX.B1.min], max: [MINMAX.B4.max, MINMAX.B5.max, MINMAX.B1.max], bands: ['B4', 'B5', 'B1']},
  {min: [MINMAX.B4.min, MINMAX.B5.min, MINMAX.B3.min], max: [MINMAX.B4.max, MINMAX.B5.max, MINMAX.B3.max], bands: ['B4', 'B5', 'B3']},
  {min: [MINMAX.B7.min, MINMAX.B4.min, MINMAX.B2.min], max: [MINMAX.B7.max, MINMAX.B4.max, MINMAX.B2.max], bands: ['B7', 'B4', 'B2']},
  {min: [MINMAX.B7.min, MINMAX.B4.min, MINMAX.B3.min], max: [MINMAX.B7.max, MINMAX.B4.max, MINMAX.B3.max], bands: ['B7', 'B4', 'B3']},
  {min: [MINMAX.B5.min, MINMAX.B4.min, MINMAX.B3.min], max: [MINMAX.B5.max, MINMAX.B4.max, MINMAX.B3.max], bands: ['B5', 'B4', 'B3']},
];
/*
 * Configure maps, link them in a grid
 */
// Create a map for each visualization option.
var maps = [];
MAP_PARAMS.forEach(function(name, index) {
  var map = ui.Map();
  map.add(ui.Label(name));
  print(VISPARAMS[index]);
  map.addLayer(image, VISPARAMS[index], name);
  map.setControlVisibility(false);
  maps.push(map);
});
var linker = ui.Map.Linker(maps);
// Enable zooming on the top-left map.
maps[0].setControlVisibility({zoomControl: true});
// Show the scale (e.g. '500m') on the bottom-right map.
maps[3].setControlVisibility({scaleControl: true});
// Create a grid of maps.
var mapGrid = ui.Panel(
    [
      ui.Panel([maps[0], maps[1]], null, {stretch: 'both'}),
      ui.Panel([maps[2], maps[3]], null, {stretch: 'both'}),
      ui.Panel([maps[4], maps[5]], null, {stretch: 'both'}),
      ui.Panel([maps[6], maps[7]], null, {stretch: 'both'}),
      ui.Panel([maps[8], maps[9]], null, {stretch: 'both'}),
    ],
    ui.Panel.Layout.Flow('horizontal'), {stretch: 'both'});
// Center the map at an interesting spot in East Java, especially in Malang Region. All
// other maps will align themselves to this parent map.
maps[0].centerObject(geometry, 11);
/*
 * Add a title and initialize
 */
// Create a title.
var title = ui.Label('Komposit Citra Landsat 7', {
  stretch: 'horizontal',
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: '24px'
});
// Add the maps and title to the ui.root.
ui.root.widgets().reset([title, mapGrid]);
ui.root.setLayout(ui.Panel.Layout.Flow('vertical'));