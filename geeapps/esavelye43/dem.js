var elev = ui.import && ui.import("elev", "image", {
      "id": "USGS/GMTED2010"
    }) || ee.Image("USGS/GMTED2010"),
    imageVisParam4 = ui.import && ui.import("imageVisParam4", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "hillshade"
        ],
        "min": 178.72491917756784,
        "max": 181.49214946807226,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["hillshade"],"min":178.72491917756784,"max":181.49214946807226,"gamma":1},
    imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "hillshade"
        ],
        "min": 178.14930448273057,
        "max": 182.13731280122002,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["hillshade"],"min":178.14930448273057,"max":182.13731280122002,"gamma":1},
    imageVisParam2 = ui.import && ui.import("imageVisParam2", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "hillshade"
        ],
        "min": 177.12,
        "max": 182.88,
        "palette": [
          "fff709",
          "27b832"
        ]
      }
    }) || {"opacity":1,"bands":["hillshade"],"min":177.12,"max":182.88,"palette":["fff709","27b832"]},
    geometry1 = ui.import && ui.import("geometry1", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                68.73046875,
                43.529384601826614
              ],
              [
                68.73046875,
                38.93884951409654
              ],
              [
                80.595703125,
                38.93884951409654
              ],
              [
                80.595703125,
                43.529384601826614
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
        [[[68.73046875, 43.529384601826614],
          [68.73046875, 38.93884951409654],
          [80.595703125, 38.93884951409654],
          [80.595703125, 43.529384601826614]]], null, false);
var shade = ee.Terrain.hillshade(elev);
Map.addLayer(shade);
var geometry_clipped = shade.clip(geometry1);
Map.addLayer(geometry_clipped);
// с расцветкой
Map.addLayer(geometry_clipped, imageVisParam2);