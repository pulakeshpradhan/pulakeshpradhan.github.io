var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                38.6152306309192,
                48.17729563609661
              ],
              [
                38.6152306309192,
                46.343363366689516
              ],
              [
                41.4167443027942,
                46.343363366689516
              ],
              [
                41.4167443027942,
                48.17729563609661
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
        [[[38.6152306309192, 48.17729563609661],
          [38.6152306309192, 46.343363366689516],
          [41.4167443027942, 46.343363366689516],
          [41.4167443027942, 48.17729563609661]]], null, false);
var date_p11 = '2021-07-01';
var date_p12 = '2021-07-07';
var date_p21 = '2021-07-08';
var date_p22 = '2021-07-14';
var date_p31 = '2021-07-14';
var date_p32 = '2021-07-21';
var s1 = ee.ImageCollection('COPERNICUS/S1_GRD')
          .filter(ee.Filter.eq('instrumentMode', 'IW'))
          .filter(ee.Filter.eq('resolution_meters', 10))
          .filterBounds(geometry)
          .select(['VV', 'VH']);
var s1_p1 = s1.filterDate(date_p11, date_p12);
var s1_p2 = s1.filterDate(date_p21, date_p22);
var s1_p3 = s1.filterDate(date_p31, date_p32);
var date_now = ee.Date(Date.now());
var date_now_diff_1w = date_now.advance(-1, 'week');
var s1_now = s1.filterDate(date_now_diff_1w, date_now);
print(date_now);
print(date_now_diff_1w);
Map.centerObject(geometry, 6)
Map.addLayer(s1_p1.select('VV').mean(), {min: -18, max: 0}, 'S1(VV): ' + date_p11 + '/' + date_p12, false);
Map.addLayer(s1_p1.select('VH').mean(), {min: -23, max: 0}, 'S1(VH): ' + date_p11 + '/' + date_p12, false);
Map.addLayer(s1_p2.select('VV').mean(), {min: -18, max: 0}, 'S1(VV): ' + date_p21 + '/' + date_p22);
Map.addLayer(s1_p2.select('VH').mean(), {min: -23, max: 0}, 'S1(VH): ' + date_p21 + '/' + date_p22);
Map.addLayer(s1_p3.select('VV').mean(), {min: -18, max: 0}, 'S1(VV): ' + date_p31 + '/' + date_p32, false);
Map.addLayer(s1_p3.select('VH').mean(), {min: -23, max: 0}, 'S1(VH): ' + date_p31 + '/' + date_p32, false);
Map.addLayer(s1_now.select('VV').mean(), {min: -18, max: 0}, 'S1(VV): now_minus_1_week / now', false);
Map.addLayer(s1_now.select('VH').mean(), {min: -23, max: 0}, 'S1(VH): now_minus_1_week / now', false);