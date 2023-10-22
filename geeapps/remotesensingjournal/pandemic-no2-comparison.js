var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                94.92777263407957,
                8.483957283890017
              ],
              [
                94.92777263407957,
                -11.16691086230939
              ],
              [
                125.93119060282957,
                -11.16691086230939
              ],
              [
                125.93119060282957,
                8.483957283890017
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
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Polygon(
        [[[94.92777263407957, 8.483957283890017],
          [94.92777263407957, -11.16691086230939],
          [125.93119060282957, -11.16691086230939],
          [125.93119060282957, 8.483957283890017]]], null, false),
    geometry2 = ui.import && ui.import("geometry2", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            108.67285980635961,
            -7.072752526899337
          ]
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
    ee.Geometry.Point([108.67285980635961, -7.072752526899337]);
var waterOcc = ee.Image("JRC/GSW1_0/GlobalSurfaceWater").select('occurrence'),
    jrc_data0 = ee.Image("JRC/GSW1_0/Metadata").select('total_obs').lte(0),
    waterOccFilled = waterOcc.unmask(0).max(jrc_data0),
    region = waterOccFilled.lt(95);
var dataset = ee.ImageCollection('COPERNICUS/S5P/OFFL/L3_NO2')
  .select('tropospheric_NO2_column_number_density')
  .filterDate('2019-01-01', '2019-08-30');
var band_viz = {
  min: 0,
  max: 0.005,
  palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red']
};
Map.addLayer(dataset.sum().clip(geometry).updateMask(region), band_viz, 'S5P N02 2019');
var dataset3 = ee.ImageCollection('COPERNICUS/S5P/OFFL/L3_NO2')
  .select('tropospheric_NO2_column_number_density')
  .filterDate('2020-01-01', '2020-08-30');
var band_viz = {
  min: 0,
  max: 0.005,
  palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red']
};
Map.addLayer(dataset3.sum().clip(geometry).updateMask(region), band_viz, 'S5P N02 2020');
var leftMap = ui.Map()
var rightMap = ui.Map()
var NO2_2019 = ui.Map.Layer(dataset.sum().clip(geometry).updateMask(region), band_viz)
var NO2_2020 = ui.Map.Layer(dataset3.sum().clip(geometry).updateMask(region), band_viz)
var NO2_2019a = leftMap.layers()
var NO2_2020a = rightMap.layers()
NO2_2019a.add(NO2_2019)
NO2_2020a.add(NO2_2020)
var a2019_label = ui.Label("NO2 2019")
a2019_label.style().set('position', 'bottom-left')
var a2020_label = ui.Label("NO2 2020")
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
leftMap.setCenter(110.66013678824356,-1.8508632504623732, 8);