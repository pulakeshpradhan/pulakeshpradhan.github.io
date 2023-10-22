var area = ui.import && ui.import("area", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                121.83852595851772,
                -3.329762589554903
              ],
              [
                121.83852595851772,
                -3.9478651751416978
              ],
              [
                122.74627131984585,
                -3.9478651751416978
              ],
              [
                122.74627131984585,
                -3.329762589554903
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
      "color": "#98ff00",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #98ff00 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[121.83852595851772, -3.329762589554903],
          [121.83852595851772, -3.9478651751416978],
          [122.74627131984585, -3.9478651751416978],
          [122.74627131984585, -3.329762589554903]]], null, false);
var LautJawa = ee.FeatureCollection("users/suhadha/WPP_Indo_All");
// memilih data sebelum dan sesudah kejadian tumpahan minyak
var collection =ee.ImageCollection("COPERNICUS/S1_GRD")
                .filterBounds(LautJawa)
                .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
                .select('VV');
//var before = collection.filterDate('2018-08-01', '2018-08-31').mosaic();
//var after = collection.filterDate('2019-06-09', '2019-06-11').mosaic();
var beforeflood = collection.filterDate('2018-08-01', '2018-08-31').mosaic();
var afterflood = collection.filterDate('2019-06-09', '2019-06-11').mosaic();
Map.addLayer(afterflood, {min: -30, max: 0}, 'Sentinel 1 after', true);
Map.addLayer(beforeflood, {min: -30, max: 0}, 'Sentinel 1 before', true);
//DEM
var hydrosheds = ee.Image('WWF/HydroSHEDS/03VFDEM');
var terrain = ee.Algorithms.Terrain(hydrosheds);
var slope = terrain.select('slope');
var beforewithslope = beforeflood.mask(slope.lt(5));
var afterwithslope = afterflood.mask(slope.lt(5));
//print(after);
//print(before);
//membuat threshold
var smoothing_radius = 10;
var threshold        = -10;
var diff_smoothed    = afterwithslope.focal_median(smoothing_radius, 'circle','meters')
                       .subtract(beforewithslope.focal_median(smoothing_radius, 'circle','meters'));
var diff_threshold   = diff_smoothed.lt(threshold);
Map.addLayer((diff_threshold.updateMask(diff_threshold).clip(area)),
{palette:'blue'},'floodarea',1);
Export.image.toDrive({
  image: diff_threshold,
  description: 'floodarea',
  folder: 'OilSpill',
  dimensions:720, region:area,
  scale:10,maxPixels:1e13,fileFormat: 'GeoTIFF'});