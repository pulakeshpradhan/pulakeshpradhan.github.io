var table = ui.import && ui.import("table", "table", {
      "id": "users/cagutierrezra/zona"
    }) || ee.FeatureCollection("users/cagutierrezra/zona"),
    polygon = ui.import && ui.import("polygon", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -75.69222391443579,
                7.102230243127647
              ],
              [
                -75.69222391443579,
                7.053509215323794
              ],
              [
                -75.64106882410375,
                7.053509215323794
              ],
              [
                -75.64106882410375,
                7.102230243127647
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
        [[[-75.69222391443579, 7.102230243127647],
          [-75.69222391443579, 7.053509215323794],
          [-75.64106882410375, 7.053509215323794],
          [-75.64106882410375, 7.102230243127647]]], null, false),
    imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "B6",
          "B5",
          "B4"
        ],
        "max": 0.6,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["B6","B5","B4"],"max":0.6,"gamma":1};
// Load a collection of Landsat TOA reflectance images.
var dataset = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA')
                  .filterBounds(polygon)
                  .filterDate('2014-01-01', '2014-04-25');
var trueColor432 = dataset.select(['B4', 'B3', 'B2']);
var trueColor432Vis = {
  min: 0.0,
  max: 0.4,
};
Map.addLayer(table,{},'Zona',true);
//Map.setCenter(6.746, 46.529, 6);
// set the map view and zoom level,
Map.centerObject(table,13);
Map.addLayer(trueColor432, trueColor432Vis, 'True Color (432)',true);
// This will sort from least to most cloudy.
var sorted = dataset.sort('CLOUD_COVER');
// Get the first (least cloudy) image.
var scene = sorted.first();
var visParams = {bands: ['B4', 'B3', 'B2'], max: 0.3};
var visParamsHumedad = {bands: ['B6', 'B5', 'B4'], max: 0.5};
Map.addLayer(scene, visParams, 'scene2',true);
Map.addLayer(scene, visParamsHumedad, 'scene',true);
print(scene);