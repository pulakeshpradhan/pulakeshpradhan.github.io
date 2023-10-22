var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -169.453125,
                84.86650488704895
              ],
              [
                -169.453125,
                -56.36077440002568
              ],
              [
                182.109375,
                -56.36077440002568
              ],
              [
                182.109375,
                84.86650488704895
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [
        {
          "type": "rectangle"
        }
      ],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[-169.453125, 84.86650488704895],
          [-169.453125, -56.36077440002568],
          [182.109375, -56.36077440002568],
          [182.109375, 84.86650488704895]]], null, false),
    geometry2 = ui.import && ui.import("geometry2", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                3.081054687500009,
                48.578642271758
              ],
              [
                3.081054687500009,
                42.20028234866224
              ],
              [
                14.638671875000009,
                42.20028234866224
              ],
              [
                14.638671875000009,
                48.578642271758
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [
        {
          "type": "rectangle"
        }
      ],
      "properties": {},
      "color": "#0b4a8b",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #0b4a8b */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[3.081054687500009, 48.578642271758],
          [3.081054687500009, 42.20028234866224],
          [14.638671875000009, 42.20028234866224],
          [14.638671875000009, 48.578642271758]]], null, false);
var temperature = ee.ImageCollection("JAXA/GCOM-C/L3/LAND/LST/V3")
  .filterDate('2021-01-01', '2022-01-01')
  // filter to daytime data only
  .filter(ee.Filter.eq("SATELLITE_DIRECTION", "D")); //"A" for night
var proj = temperature.first().projection().crs();
// Multiply with slope coefficient
var temperature = temperature
  .mean()
  .multiply(0.02)
  .subtract(273.25)
  .clip(geometry2);
// var range = temperature.add(10).multiply(30);
// var range = temperature;
// range = range.lte(30)
//   .and(range.gte(20))
//   .selfMask()
//   .select('LST_AVE')
//   .setDefaultProjection(proj);
// range = range.reduceToVectors({
//   geometry: geometry,
//   scale: 10000,
//   crs: temperature.projection(),
//   geometryType: 'polygon',
//   eightConnected: false
// });
// function diss(feature) {
//   return feature.dissolve(10000);
// }
// range = range.map(diss);
var meanVis = {
  bands: ['LST_AVE'],
  min: -20,
  max: 50,
  palette: ['#2c7bb6', '#abd9e9', '#ffffff', '#fdae61', '#d7191c']
};
Map.setCenter(20, 45, 5);
// Map.addLayer(temperature, meanVis, "Average land Surface Temperature", false);
// Map.addLayer(range, {palette: ['black']}, "Thermal breadth", true, 0.5);
// slider widget -------
// function to update layers
function updateLayer(value){
  var th = slider.getValue();
  Map.clear();
  var range = temperature;
range = range.lte(30)
  .and(range.gte(value))
  .selfMask()
  .select('LST_AVE')
  .setDefaultProjection(proj);
  Map.addLayer(range, {palette: ['black']}, "Thermal breadth", true, 0.5);
  Map.add(panel);
}
var panel = ui.Panel();
panel.style().set({
  width: '400px',
  height: '315px',
  position: 'top-right',
  backgroundColor: 'f9f9f9'
});
panel.add(ui.Label({
   'value': 'Select body mass (grams)',
   'style': {'backgroundColor': 'f9f9f9', 'fontWeight': 'bold', 'fontSize': '20px'}
}));
var slider = ui.Slider({
  'min': 1,
  'max': 30,
  'value': 1,
  'step': 1,
  'style': {'height': '25px', 'width': '380px', 'backgroundColor': 'f9f9f9'},
  'onChange': updateLayer
});
panel.add(slider);
Map.add(panel)