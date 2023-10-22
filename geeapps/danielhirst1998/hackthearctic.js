var svalbard = ui.import && ui.import("svalbard", "table", {
      "id": "users/danielhirst1998/svalbard/svalbard_aoi"
    }) || ee.FeatureCollection("users/danielhirst1998/svalbard/svalbard_aoi"),
    table = ui.import && ui.import("table", "table", {
      "id": "users/danielhirst1998/svalbard/svalbard_aoi"
    }) || ee.FeatureCollection("users/danielhirst1998/svalbard/svalbard_aoi"),
    platforms_gulf = ui.import && ui.import("platforms_gulf", "table", {
      "id": "users/danielhirst1998/svalbard/platforms"
    }) || ee.FeatureCollection("users/danielhirst1998/svalbard/platforms"),
    gulf = ui.import && ui.import("gulf", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -94.96240341364674,
                28.52800980009835
              ],
              [
                -96.19287216364674,
                27.56812125098021
              ],
              [
                -96.42358505427174,
                26.196293590950898
              ],
              [
                -95.94098992944056,
                25.073445375924873
              ],
              [
                -93.01862664819056,
                23.963953255299426
              ],
              [
                -86.91022821069056,
                23.551686851319527
              ],
              [
                -83.13093133569056,
                24.7146859750519
              ],
              [
                -83.30671258569056,
                26.684556302371256
              ],
              [
                -84.94367547631556,
                29.159631496707235
              ],
              [
                -86.14118524194056,
                29.52355397800046
              ],
              [
                -87.61335321069056,
                29.475743748197612
              ],
              [
                -89.66779657006556,
                28.726997576509177
              ],
              [
                -92.49128289819056,
                29.226767401721236
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
        [[[-94.96240341364674, 28.52800980009835],
          [-96.19287216364674, 27.56812125098021],
          [-96.42358505427174, 26.196293590950898],
          [-95.94098992944056, 25.073445375924873],
          [-93.01862664819056, 23.963953255299426],
          [-86.91022821069056, 23.551686851319527],
          [-83.13093133569056, 24.7146859750519],
          [-83.30671258569056, 26.684556302371256],
          [-84.94367547631556, 29.159631496707235],
          [-86.14118524194056, 29.52355397800046],
          [-87.61335321069056, 29.475743748197612],
          [-89.66779657006556, 28.726997576509177],
          [-92.49128289819056, 29.226767401721236]]]),
    platforms_europe = ui.import && ui.import("platforms_europe", "table", {
      "id": "users/danielhirst1998/svalbard/europe_offshore"
    }) || ee.FeatureCollection("users/danielhirst1998/svalbard/europe_offshore"),
    scotland = ui.import && ui.import("scotland", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                2.1711969350249616,
                62.312867298802
              ],
              [
                1.0444081416069162,
                62.32155085681547
              ],
              [
                0.23760318502496158,
                62.2720017731422
              ],
              [
                -0.11062292330977552,
                61.656855085304855
              ],
              [
                -0.21009038530124036,
                60.99493519564103
              ],
              [
                -1.2673280723713765,
                57.86549380288197
              ],
              [
                -0.9070326795125028,
                55.95910366030694
              ],
              [
                1.0286188100249616,
                54.03873472461534
              ],
              [
                4.280571935024962,
                52.51487004485331
              ],
              [
                4.8220835472362245,
                53.76804255221611
              ],
              [
                7.664360997524962,
                54.077426251942924
              ],
              [
                7.310637193999652,
                56.75603724335448
              ],
              [
                4.165803505625023,
                59.00935008711429
              ],
              [
                4.497272736489877,
                62.29357975556529
              ],
              [
                4.48562363094585,
                62.008507711817494
              ],
              [
                2.2444762413191732,
                62.31904068476746
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
        [[[2.1711969350249616, 62.312867298802],
          [1.0444081416069162, 62.32155085681547],
          [0.23760318502496158, 62.2720017731422],
          [-0.11062292330977552, 61.656855085304855],
          [-0.21009038530124036, 60.99493519564103],
          [-1.2673280723713765, 57.86549380288197],
          [-0.9070326795125028, 55.95910366030694],
          [1.0286188100249616, 54.03873472461534],
          [4.280571935024962, 52.51487004485331],
          [4.8220835472362245, 53.76804255221611],
          [7.664360997524962, 54.077426251942924],
          [7.310637193999652, 56.75603724335448],
          [4.165803505625023, 59.00935008711429],
          [4.497272736489877, 62.29357975556529],
          [4.48562363094585, 62.008507711817494],
          [2.2444762413191732, 62.31904068476746]]]);
  var places = {
  'Gulf of Mexico': gulf,
  'Europe': scotland
}
var region = gulf
var platforms = platforms_gulf
var all_platforms = {
  'Gulf of Mexico': platforms_gulf.filter(ee.Filter.notNull(ee.List(['REMOVAL_DA']))),
  'Europe': platforms_europe
}
var panel = ui.Panel();
panel.style().set({
  width: '350px',
  fontSize: '9px',
  position: 'bottom-right'
});
panel.add(ui.Label("SAR OIL RIG DETECTION"))
panel.add(ui.Label("Choose the location you would like to find Oil rigs in. Wait for the data to load (might take some time) and play around with the layers in the top right hand corner"))
var select = ui.Select({
  items: Object.keys(places),
  onChange: function(key) {
    region = places[key]
    platforms = all_platforms[key]
    Map.centerObject(region, 8);
    run_app()
  }
});
select.setPlaceholder('Choose a location...');
panel.add(select)
Map.add(panel)
var run_app = function() {
  Map.clear()
  Map.add(panel)
  // 1. Get S1 and crop to aoi
  var sentinel1 = ee.ImageCollection('COPERNICUS/S1_GRD')
                    .filterDate('2020-01-01', '2020-12-31')
                    .filterBounds(region)
                    .mean()
                    .clip(region);
  var sentinel2 = ee.ImageCollection('COPERNICUS/S2')
  .filterDate('2020-01-01', '2020-12-31')
  .filterBounds(region)
  .filter(ee.Filter.lte('CLOUDY_PIXEL_PERCENTAGE',10))
  .mosaic()
  .clip(region)
  print(sentinel2)
  Map.addLayer(sentinel2,{bands: ['B4','B3','B2'],min: 0,max: 6000}, 'Sentinel 2', false)
  //print(platforms.size())
  var active_platforms = platforms
                          .filter(ee.Filter.bounds(region));
  Map.addLayer(active_platforms, {}, 'Ground Truth Dataset')
  Map.addLayer(sentinel1, {bands: 'VV', min: -20, max: 0}, 'Sentinel 1')
  var objectId = sentinel1.gt(-5).connectedComponents({
    connectedness: ee.Kernel.plus(1),
    maxSize: 128
  });
  Map.addLayer(objectId, {}, 'Detected Platforms')
}
// 2. get mean over the a year and threshold 
// 3. Connected components to label objects
// 4. Compare and tweak algorithm to dataset of gulf oil platforms