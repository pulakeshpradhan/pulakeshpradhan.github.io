var Wolf_Perdido_Bay1 = ui.import && ui.import("Wolf_Perdido_Bay1", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -87.67782146768454,
                30.558951909253697
              ],
              [
                -87.67782146768454,
                30.255747868705136
              ],
              [
                -87.31252605752829,
                30.255747868705136
              ],
              [
                -87.31252605752829,
                30.558951909253697
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        },
        {
          "type": "Point",
          "coordinates": [
            -87.67232830362204,
            30.554221594715003
          ]
        }
      ],
      "displayProperties": [
        {
          "type": "rectangle"
        },
        {
          "type": "marker"
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
      },
      {
        "type": "marker"
      }
    ] */
    ee.Geometry({
      "type": "GeometryCollection",
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -87.67782146768454,
                30.558951909253697
              ],
              [
                -87.67782146768454,
                30.255747868705136
              ],
              [
                -87.31252605752829,
                30.255747868705136
              ],
              [
                -87.31252605752829,
                30.558951909253697
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        },
        {
          "type": "Point",
          "coordinates": [
            -87.67232830362204,
            30.554221594715003
          ]
        }
      ],
      "coordinates": []
    }),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#0b4a8b",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #0b4a8b */
    /* shown: false */
    ee.Geometry.MultiPoint(),
    table2 = ui.import && ui.import("table2", "table", {
      "id": "users/AsifulAlam/Perdido_bay"
    }) || ee.FeatureCollection("users/AsifulAlam/Perdido_bay"),
    table = ui.import && ui.import("table", "table", {
      "id": "users/AsifulAlam/Perdido_bay"
    }) || ee.FeatureCollection("users/AsifulAlam/Perdido_bay");
// Area_Selection ## Find out the coordinates of the bay area 
// 0: [-87.67782146768454,30.23439344193804]
// 1: [-87.29055340127829,30.23439344193804]
// 2: [-87.29055340127829,30.558951909253697]
// 3: [-87.67782146768454,30.558951909253697]
// 4: [-87.67782146768454,30.23439344193804]
var dataset = ee.ImageCollection('USDA/NAIP/DOQQ')
                  .filter(ee.Filter.date('2017-01-01', '2018-12-31'));
var trueColor = dataset.select(['R', 'G', 'B']);
var trueColorVis = {
  min: 0.0,
  max: 255.0,
};
Map.setCenter(-87.67782, 30.55895, 8);
Map.addLayer(trueColor, trueColorVis, 'True Color');
// Shape file import tho the GEE server from local disk 
var Perdido_Bay = ee.FeatureCollection("users/AsifulAlam/Perdido_bay");
function getCols(tableMetadata) {
  print(tableMetadata.columns);
}
table.limit(0).evaluate(getCols);
// Add perdido bay watershed in the console 
var trueColor = Perdido_Bay.select(['R', 'G', 'B']);
var trueColorVis = {
  min: 0.0,
  max: 255.0,
};
Map.addLayer(trueColor, trueColorVis, 'True Color');