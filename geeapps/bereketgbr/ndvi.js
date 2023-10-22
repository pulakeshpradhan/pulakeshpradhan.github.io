var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                36.97733582214437,
                8.589537517993138
              ],
              [
                36.97733582214437,
                6.498540876777039
              ],
              [
                38.52640808776937,
                6.498540876777039
              ],
              [
                38.52640808776937,
                8.589537517993138
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        },
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                37.03226746276937,
                8.676432344957192
              ],
              [
                37.03226746276937,
                6.509456496358547
              ],
              [
                38.83402527526937,
                6.509456496358547
              ],
              [
                38.83402527526937,
                8.676432344957192
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
        },
        {
          "type": "rectangle"
        }
      ],
      "properties": {},
      "color": "#98ff00",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || 
    /* color: #98ff00 */
    /* displayProperties: [
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.MultiPolygon(
        [[[[36.97733582214437, 8.589537517993138],
           [36.97733582214437, 6.498540876777039],
           [38.52640808776937, 6.498540876777039],
           [38.52640808776937, 8.589537517993138]]],
         [[[37.03226746276937, 8.676432344957192],
           [37.03226746276937, 6.509456496358547],
           [38.83402527526937, 6.509456496358547],
           [38.83402527526937, 8.676432344957192]]]], null, false),
    imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "NDVI"
        ],
        "min": 0,
        "max": 8000,
        "palette": [
          "ffffff",
          "ce7e45",
          "df923d",
          "f1b555",
          "fcd163",
          "99b718",
          "74a901",
          "66a000",
          "529400",
          "3e8601",
          "207401",
          "056201",
          "004c00",
          "023b01",
          "012e01",
          "011d01",
          "011301"
        ]
      }
    }) || {"opacity":1,"bands":["NDVI"],"min":0,"max":8000,"palette":["ffffff","ce7e45","df923d","f1b555","fcd163","99b718","74a901","66a000","529400","3e8601","207401","056201","004c00","023b01","012e01","011d01","011301"]},
    imageVisParam2 = ui.import && ui.import("imageVisParam2", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "NDVI",
          "NDVI",
          "NDVI"
        ],
        "min": 0,
        "max": 8000,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["NDVI","NDVI","NDVI"],"min":0,"max":8000,"gamma":1};
var dataset = ee.ImageCollection('MODIS/006/MOD13Q1')
                  .filter(ee.Filter.date('2018-01-01', '2018-05-01'));
var ndvi = dataset.select('NDVI');
var ndviVis = {
  min: 0.0,
  max: 8000.0,
  palette: [
    'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
    '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
    '012E01', '011D01', '011301'
  ],
};
Map.setCenter(6.746, 46.529, 2);
Map.addLayer(ndvi, ndviVis, 'NDVI')