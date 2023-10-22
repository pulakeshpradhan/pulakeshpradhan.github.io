var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                34.94710702202469,
                32.92181298613584
              ],
              [
                34.94710702202469,
                32.83848701859346
              ],
              [
                35.053537075735626,
                32.83848701859346
              ],
              [
                35.053537075735626,
                32.92181298613584
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
        [[[34.94710702202469, 32.92181298613584],
          [34.94710702202469, 32.83848701859346],
          [35.053537075735626, 32.83848701859346],
          [35.053537075735626, 32.92181298613584]]], null, false),
    imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "B8A"
        ],
        "max": 0.7,
        "gamma": 1.51
      }
    }) || {"opacity":1,"bands":["B8A"],"max":0.7,"gamma":1.51};
Map.setCenter(34.97405, 32.88788,14)
var image = ee.Image('COPERNICUS/S2_SR/20220510T081559_20220510T082248_T36SXB')
var ic = ee.ImageCollection('COPERNICUS/S2_SR').filterBounds(geometry)
print(ic)
var HHP = (image.select('B8A').divide(image.select('B8'))).log()
Map.addLayer(HHP, imageVisParam, 'HHP filer')