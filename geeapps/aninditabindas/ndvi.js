var region = ui.import && ui.import("region", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                72.46202491675172,
                23.15227277057997
              ],
              [
                72.46202491675172,
                22.91088241533098
              ],
              [
                72.72844337378297,
                22.91088241533098
              ],
              [
                72.72844337378297,
                23.15227277057997
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
        [[[72.46202491675172, 23.15227277057997],
          [72.46202491675172, 22.91088241533098],
          [72.72844337378297, 22.91088241533098],
          [72.72844337378297, 23.15227277057997]]], null, false),
    t1 = ui.import && ui.import("t1", "table", {
      "id": "users/aninditabindas/Vadodara_dis"
    }) || ee.FeatureCollection("users/aninditabindas/Vadodara_dis");
// Load Sentinel 2 Data
var s2 = ee.ImageCollection("COPERNICUS/S2");
var images = s2.filterDate('2017-01-01', '2018-12-31');
// Clip for Region of Interest (Ahmedabad Area) and calculate NDVI
var image = images.mean().clip(t1);
var image_ndvi = image.normalizedDifference(['B8','B4']);
// Add Layer
Map.addLayer (image_ndvi, {min: 0, max: 0.35, palette: ['FFFFFF','CC9966','CC9900', '996600', '33CC00', '009900','006600','000000']}, 'NDVI');
Map.addLayer(t1);