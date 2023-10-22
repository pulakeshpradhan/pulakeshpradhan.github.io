var NOA = ui.import && ui.import("NOA", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -64.50447062653606,
                -23.076243158854755
              ],
              [
                -64.50447062653606,
                -23.471735071602815
              ],
              [
                -63.908462325754805,
                -23.471735071602815
              ],
              [
                -63.908462325754805,
                -23.076243158854755
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-64.50447062653606, -23.076243158854755],
          [-64.50447062653606, -23.471735071602815],
          [-63.908462325754805, -23.471735071602815],
          [-63.908462325754805, -23.076243158854755]]], null, false),
    salina = ui.import && ui.import("salina", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -65.70945088478067,
                -30.21221623546505
              ],
              [
                -65.70945088478067,
                -30.691673829354567
              ],
              [
                -65.11687581153848,
                -30.691673829354567
              ],
              [
                -65.11687581153848,
                -30.21221623546505
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#98ff00",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #98ff00 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-65.70945088478067, -30.21221623546505],
          [-65.70945088478067, -30.691673829354567],
          [-65.11687581153848, -30.691673829354567],
          [-65.11687581153848, -30.21221623546505]]], null, false),
    Patagonia = ui.import && ui.import("Patagonia", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -73.0269787928242,
                -49.24110376648199
              ],
              [
                -73.0269787928242,
                -49.31893365910227
              ],
              [
                -72.86355716196482,
                -49.31893365910227
              ],
              [
                -72.86355716196482,
                -49.24110376648199
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#ffc82d",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #ffc82d */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-73.0269787928242, -49.24110376648199],
          [-73.0269787928242, -49.31893365910227],
          [-72.86355716196482, -49.31893365910227],
          [-72.86355716196482, -49.24110376648199]]], null, false);
var funciones = require("users/torrezaffaroni/Caudal_ACA:fx.js");
// Create an initial mosiac, which we'll visualize in a few different ways.
var modis = ee.ImageCollection("MODIS/061/MOD09A1")
              .filterDate("2022-12-12","2022-12-23")
              //.select(["sur_refl_b01", "sur_refl_b02", "sur_refl_b06"])
              .map(function(e){return e.multiply(0.0001)})
              .median();
var landsat = funciones.getLandsat({start: "2022-12-01", end: "2022-12-31"})
              .median();
var sentinel = funciones.getS2(null, "2022-12-08", "2022-12-31").median();
var lugares = {
  "Obelisco":          {lon:-58.381617,lat:-34.603715, zoom:15},
  "Urbanización":      {lon:-58.73445,lat:-34.33251, zoom:13},
  "Frontera agricola": {lon:-63.411,  lat:-24.7202, zoom:10},
  "Salinas grandes":   {lon:-65.0803, lat:-29.9764, zoom:9},
  "Glaciar":           {lon:-73.2466, lat:-50.43, zoom:11},
  "Humedal":           {lon:-60.5858, lat:-28.7836, zoom:10},
}
var setCenter = function(lugar){
  maps[0].setCenter(lugares[lugar].lon, lugares[lugar].lat, lugares[lugar].zoom)
}
var rois = ui.Select({
  items: Object.keys(lugares), 
  placeholder: "Seleccionar un lugar de interés", 
  onChange: setCenter,
  style:{position: "top-left"} 
});
// Each map has a name and some visualization parameters.
// los que estén descomentados son los que van a aparecer en los paneles!
// el arreglo propiamente dicho está en la Linea 115 (var mapgrid)
var image = {
  'Sentinel RGB':sentinel,
  //'Sentinel IRc, IRm, R': sentinel,
  //'Sentinel IRm, IRc, R': sentinel,
  // "Landsat 5 (2000) Color Verdadero" : L52000,
  // "Landsat 2000 IRm, IRc, R" : L52000,
  // "Landsat 2000 IRc, IRm, R" : L52000,
  // "Landsat 5 (2010) Color Verdadero" : L52010,
  // "Landsat 2010 IRm, IRc, R" : L52010,
  // "Landsat 2010 IRc, IRm, R" : L52010,
   "Landsat 8/9 (2022) RGB" : landsat,
  // "Landsat 2022 IRm, IRc, R" : L89,
  // "Landsat 2022 IRc, IRm, R" : L89,
  'MODIS RGB': modis,
  //'MODIS IRc, IRm, R': modis,
  //'MODIS IRm, IRc, R': modis
};
var MAP_PARAMS = {
  'Sentinel RGB': ['B4', 'B3', 'B2'],
  'Sentinel IRc, IRm, R': ['B8', 'B11', 'B4'],
  'Sentinel IRm, IRc, R': ['B11', 'B8', 'B4'],
  "Landsat 5 (2000) Color Verdadero" : ['SR_B3', 'SR_B2', 'SR_B1'],
  "Landsat 5 (2010) Color Verdadero" : ['SR_B3', 'SR_B2', 'SR_B1'],
  "Landsat 8/9 (2022) RGB" : ['SR_B4', 'SR_B3', 'SR_B2'],
  "Landsat 2000 IRm, IRc, R" : ['SR_B5', 'SR_B4', 'SR_B3'],
  "Landsat 2010 IRm, IRc, R" : ['SR_B5', 'SR_B4', 'SR_B3'],
  "Landsat 2022 IRm, IRc, R" : ['SR_B6', 'SR_B5', 'SR_B4'],
  "Landsat 2000 IRc, IRm, R" : ['SR_B4', 'SR_B5', 'SR_B3'],
  "Landsat 2010 IRc, IRm, R" : ['SR_B4', 'SR_B5', 'SR_B3'],
  "Landsat 2022 IRc, IRm, R" : ['SR_B5', 'SR_B6', 'SR_B4'],
  'MODIS RGB': ['sur_refl_b01', 'sur_refl_b04', 'sur_refl_b03'],
  'MODIS IRc, IRm, R': ['sur_refl_b02', 'sur_refl_b06', 'sur_refl_b01'],
  'MODIS IRm, IRc, R': ['sur_refl_b06', 'sur_refl_b02', 'sur_refl_b01'] 
  // 'Color Natural (RGB - B1/B2/B3)': ['SR_B1', 'SR_B2', 'SR_B3'],
  // 'FCC Tierra/Agua (IRc, IRm, B - B4/B5/B3)': ['SR_B4', 'SR_B5', 'SR_B3'],
  // 'FCC Infrarrojo cercano (IRc, G, B - B4/B2/B3)': ['SR_B4', 'SR_B2', 'SR_B3'],
  // 'FCC Vegetación (IRm1, IRm2, B - B7/B5/B3)': ['SR_B7', 'SR_B5', 'SR_B3']
};
// Shared visualization parameters for the images.
function getVisualization(bands) {
  return {gamma: 1, min: 0, max: 0.4, bands: bands};
}
/*
 * Configure maps, link them in a grid
 */
// Create a map for each visualization option.
var maps = [];
Object.keys(image).forEach(function(name) {
  var map = ui.Map();
  map.add(ui.Label(name));
  map.addLayer(image[name], getVisualization(MAP_PARAMS[name]), name);
  map.setControlVisibility(false);
  maps.push(map);
});
var linker = ui.Map.Linker(maps);
// Enable zooming on the top-left map.
maps[2].setControlVisibility({zoomControl: true});
maps[0].add(rois)
// Show the scale (e.g. '500m') on the bottom-right map.
maps[2].setControlVisibility({scaleControl: true});
// Create a grid of maps.
var mapGrid = ui.Panel(
    [
      ui.Panel([maps[0]], null, {stretch: 'both'}), //o varios para que queden apilados (ej. [maps[0], maps[1]])
      ui.Panel([maps[1]], null, {stretch: 'both'}),
      ui.Panel([maps[2]], null, {stretch: 'both'}),
    ],
    ui.Panel.Layout.Flow('horizontal'), {stretch: 'both'});
// All other maps will align themselves to this parent map.
// maps[0].centerObject(Patagonia, 9); //NOA, salina, Patagonia, 
// maps[0].setCenter(-58.4692, -34.6188, 10) 
// maps[0].setCenter(-73.20804, -50.42542, 14) // glaciar 
// maps[0].setCenter(-62.8159, -24.9225, 11)// deforestacion salta/chaco
/*
 * Add a title and initialize
 */
// Create a title.
var title = ui.Label('Sentinel-2, Landsat8/9 y MODIS - Diciembre 2022 ⭐⭐⭐', {
  stretch: 'horizontal',
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: '24px'
});
// Add the maps and title to the ui.root.
ui.root.widgets().reset([title, mapGrid]);
ui.root.setLayout(ui.Panel.Layout.Flow('vertical'));