var flow = ui.import && ui.import("flow", "image", {
      "id": "WWF/HydroSHEDS/15ACC"
    }) || ee.Image("WWF/HydroSHEDS/15ACC"),
    rivers = ui.import && ui.import("rivers", "table", {
      "id": "WWF/HydroSHEDS/v1/FreeFlowingRivers"
    }) || ee.FeatureCollection("WWF/HydroSHEDS/v1/FreeFlowingRivers"),
    accum = ui.import && ui.import("accum", "image", {
      "id": "WWF/HydroSHEDS/15ACC"
    }) || ee.Image("WWF/HydroSHEDS/15ACC"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -88.97304296874998,
                37.34249215647884
              ],
              [
                -88.97304296874998,
                30.266962621332883
              ],
              [
                -85.01796484374998,
                30.266962621332883
              ],
              [
                -85.01796484374998,
                37.34249215647884
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
        [[[-88.97304296874998, 37.34249215647884],
          [-88.97304296874998, 30.266962621332883],
          [-85.01796484374998, 30.266962621332883],
          [-85.01796484374998, 37.34249215647884]]], null, false);
Map.addLayer(rivers, {min:0, max:30}, 'rivers');
var dataset = ee.Image('WWF/HydroSHEDS/15ACC');
var flowAccumulation = dataset.select('b1');
var flowAccumulationVis = {
  min: 0.0,
  max: 500.0,
  palette: [
    '000000', '023858', '006837', '1a9850', '66bd63', 'a6d96a', 'd9ef8b',
    'ffffbf', 'fee08b', 'fdae61', 'f46d43', 'd73027'
  ],
};
Map.setCenter(-90.204, 32.386, 8);
Map.addLayer(flowAccumulation, flowAccumulationVis, 'Flow Accumulation');
var Image1 = ee.Image
Map.setCenter(-88.204, 31.476, 4);
print(ee.Image("WWF/HydroSHEDS/15ACC"), geometry);