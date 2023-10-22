var cordoba = ui.import && ui.import("cordoba", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -66.434326171875,
                -35.20972164522138
              ],
              [
                -61.072998046875,
                -35.26356186215208
              ],
              [
                -61.14990234375,
                -29.161755515328824
              ],
              [
                -66.33544921875,
                -29.13297013087864
              ]
            ]
          ],
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
        [[[-66.434326171875, -35.20972164522138],
          [-61.072998046875, -35.26356186215208],
          [-61.14990234375, -29.161755515328824],
          [-66.33544921875, -29.13297013087864]]]),
    yuli = ui.import && ui.import("yuli", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -64.4622802734375,
                -31.72115854289847
              ],
              [
                -63.623199462890625,
                -31.716485846385325
              ],
              [
                -63.64105224609375,
                -31.062345409804394
              ],
              [
                -63.953528837168676,
                -31.05677509670479
              ],
              [
                -64.24667358398438,
                -31.059992641062344
              ],
              [
                -64.48837280273438,
                -31.06116903270732
              ]
            ]
          ],
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
        [[[-64.4622802734375, -31.72115854289847],
          [-63.623199462890625, -31.716485846385325],
          [-63.64105224609375, -31.062345409804394],
          [-63.953528837168676, -31.05677509670479],
          [-64.24667358398438, -31.059992641062344],
          [-64.48837280273438, -31.06116903270732]]]),
    cba = ui.import && ui.import("cba", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -64.17814376411933,
            -31.396474419779512
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Point([-64.17814376411933, -31.396474419779512]),
    palette = ui.import && ui.import("palette", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "B10"
        ],
        "min": 29.175297970165357,
        "max": 34.29638461005094,
        "palette": [
          "240aff",
          "0ee9ff",
          "0cff62",
          "f0ff0e",
          "ff9d0a",
          "ff3c10"
        ]
      }
    }) || {"opacity":1,"bands":["B10"],"min":29.175297970165357,"max":34.29638461005094,"palette":["240aff","0ee9ff","0cff62","f0ff0e","ff9d0a","ff3c10"]};
//
var temp2020 = ee.ImageCollection('LANDSAT/LC08/C01/T1_RT_TOA').filterDate('2020-01-01', '2020-12-31').select("B10");
var Temperatura2020_mean = temp2020.mean().subtract(273.15);
var Temperatura2020_min = temp2020.min().subtract(273.15);
var Temperatura2020_max = temp2020.max().subtract(273.15) ;
Map.addLayer(Temperatura2020_max, palette,'Temperatura2020_max');
//Map.addLayer(Temperatura2020_min, palette,'Temperatura2020_min');
//Map.addLayer(Temperatura2020_mean, palette,'Temperatura2020_mean');
Map.centerObject(cba, 13);
Export.image.toDrive({
  image: Temperatura2020_mean ,
  description: 'media_temperatura2020_cordoba',
  scale: 30,
  region: yuli
});
Export.image.toDrive({
  image: Temperatura2020_min ,
  description: 'min_temperatura2020_cordoba',
  scale: 30,
  region: yuli
});
Export.image.toDrive({
  image: Temperatura2020_max ,
  description: 'max_temperatura2020_cordoba',
  scale: 30,
  region: yuli
});