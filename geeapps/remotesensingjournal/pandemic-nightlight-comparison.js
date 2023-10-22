var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                94.9429440602636,
                6.4235953346092876
              ],
              [
                94.9429440602636,
                -11.932726837605577
              ],
              [
                122.8921628102636,
                -11.932726837605577
              ],
              [
                122.8921628102636,
                6.4235953346092876
              ]
            ]
          ],
          "geodesic": false,
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
        [[[94.9429440602636, 6.4235953346092876],
          [94.9429440602636, -11.932726837605577],
          [122.8921628102636, -11.932726837605577],
          [122.8921628102636, 6.4235953346092876]]], null, false);
var waterOcc = ee.Image("JRC/GSW1_0/GlobalSurfaceWater").select('occurrence'),
    jrc_data0 = ee.Image("JRC/GSW1_0/Metadata").select('total_obs').lte(0),
    waterOccFilled = waterOcc.unmask(0).max(jrc_data0),
    region = waterOccFilled.lt(95);
var dataset = ee.ImageCollection('NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG')
                  .filter(ee.Filter.date('2019-01-01', '2019-08-30'));
var nighttime = dataset.select('avg_rad');
var nighttimeVis = {min: 0.0, max: 50.0};
Map.addLayer(nighttime.mean().clip(geometry).updateMask(region), nighttimeVis, 'Nighttime 2019');
var dataset2 = ee.ImageCollection('NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG')
                  .filter(ee.Filter.date('2020-01-01', '2020-08-30'));
var nighttime2 = dataset2.select('avg_rad');
var nighttimeVis = {min: 0.0, max: 50.0};
Map.addLayer(nighttime2.mean().clip(geometry).updateMask(region), nighttimeVis, 'Nighttime 2020');
var leftMap = ui.Map()
var rightMap = ui.Map()
var light_2019 = ui.Map.Layer(nighttime.mean().clip(geometry).updateMask(region), nighttimeVis)
var light_2020 = ui.Map.Layer(nighttime2.mean().clip(geometry).updateMask(region), nighttimeVis)
var light_2019a = leftMap.layers()
var light_2020a = rightMap.layers()
light_2019a.add(light_2019)
light_2020a.add(light_2020)
var a2019_label = ui.Label("nightlight 2019")
a2019_label.style().set('position', 'bottom-left')
var a2020_label = ui.Label("nightlight 2020")
a2020_label.style().set('position', 'bottom-right')
leftMap.add(a2019_label)
rightMap.add(a2020_label)
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  orientation: 'horizontal',
  wipe: true
})
ui.root.clear()
ui.root.add(splitPanel)
var linkPanel = ui.Map.Linker([leftMap, rightMap])
leftMap.setCenter(110.66013678824356,-7.08632504623732, 8);