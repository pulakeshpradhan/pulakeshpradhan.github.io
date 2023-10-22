var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -71.73591636536422,
                47.00273820921476
              ],
              [
                -71.73591636536422,
                46.594735691286
              ],
              [
                -70.73341392395797,
                46.594735691286
              ],
              [
                -70.73341392395797,
                47.00273820921476
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
      "color": "#ffc82d",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #ffc82d */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[-71.73591636536422, 47.00273820921476],
          [-71.73591636536422, 46.594735691286],
          [-70.73341392395797, 46.594735691286],
          [-70.73341392395797, 47.00273820921476]]], null, false);
var dem = ee.ImageCollection("NRCan/CDEM")
print(dem)
// Make a palette: a list of hex strings.
var palette = ['FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718',
               '74A901', '66A000', '529400', '3E8601', '207401', '056201',
               '004C00', '023B01', '012E01', '011D01', '011301'];
dem = dem.mosaic().clip(geometry)
print(dem)
Map.addLayer(dem, {min:0, max:1000,palette:palette})