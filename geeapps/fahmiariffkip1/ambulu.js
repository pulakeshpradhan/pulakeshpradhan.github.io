var table = ui.import && ui.import("table", "table", {
      "id": "projects/geoekonomi/assets/ambulu"
    }) || ee.FeatureCollection("projects/geoekonomi/assets/ambulu"),
    pasar_tradisional = ui.import && ui.import("pasar_tradisional", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                113.60527100449713,
                -8.345315117263109
              ],
              [
                113.60519590264471,
                -8.345564575128984
              ],
              [
                113.60515298730047,
                -8.345776879570188
              ],
              [
                113.60512080079229,
                -8.34606349038275
              ],
              [
                113.60560359841497,
                -8.34617495008639
              ],
              [
                113.60588791257055,
                -8.346249256537806
              ],
              [
                113.60597910767706,
                -8.345904262179511
              ],
              [
                113.60608103161962,
                -8.345553959903897
              ],
              [
                113.60561969166906,
                -8.345378808648263
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {
        "lc": 0
      },
      "color": "#d62a0c",
      "mode": "FeatureCollection",
      "shown": true,
      "locked": false
    }) || /* color: #d62a0c */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[113.60527100449713, -8.345315117263109],
                  [113.60519590264471, -8.345564575128984],
                  [113.60515298730047, -8.345776879570188],
                  [113.60512080079229, -8.34606349038275],
                  [113.60560359841497, -8.34617495008639],
                  [113.60588791257055, -8.346249256537806],
                  [113.60597910767706, -8.345904262179511],
                  [113.60608103161962, -8.345553959903897],
                  [113.60561969166906, -8.345378808648263]]]),
            {
              "lc": 0,
              "system:index": "0"
            })]),
    jasa = ui.import && ui.import("jasa", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                113.6056570751172,
                -8.347769052281153
              ],
              [
                113.60564634628113,
                -8.347868569440564
              ],
              [
                113.60577375120934,
                -8.347909703192387
              ],
              [
                113.60589981503304,
                -8.347958798309842
              ],
              [
                113.60594004816826,
                -8.347838050847708
              ]
            ]
          ],
          "evenOdd": true
        },
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                113.60520967613198,
                -8.347570542192337
              ],
              [
                113.60518553625084,
                -8.347623618040812
              ],
              [
                113.6051774896238,
                -8.347708539383396
              ],
              [
                113.60518285404183,
                -8.347728442820397
              ],
              [
                113.60523783932663,
                -8.347724462133078
              ],
              [
                113.6052847779844,
                -8.347731096611918
              ],
              [
                113.60530891786553,
                -8.347631579417472
              ],
              [
                113.60531025897004,
                -8.347582484258874
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {
        "lc": 1
      },
      "color": "#98ff00",
      "mode": "FeatureCollection",
      "shown": true,
      "locked": false
    }) || /* color: #98ff00 */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[113.6056570751172, -8.347769052281153],
                  [113.60564634628113, -8.347868569440564],
                  [113.60577375120934, -8.347909703192387],
                  [113.60589981503304, -8.347958798309842],
                  [113.60594004816826, -8.347838050847708]]]),
            {
              "lc": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[113.60520967613198, -8.347570542192337],
                  [113.60518553625084, -8.347623618040812],
                  [113.6051774896238, -8.347708539383396],
                  [113.60518285404183, -8.347728442820397],
                  [113.60523783932663, -8.347724462133078],
                  [113.6052847779844, -8.347731096611918],
                  [113.60530891786553, -8.347631579417472],
                  [113.60531025897004, -8.347582484258874]]]),
            {
              "lc": 1,
              "system:index": "1"
            })]),
    minimarket = ui.import && ui.import("minimarket", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#0b4a8b",
      "mode": "FeatureCollection",
      "shown": true,
      "locked": false
    }) || /* color: #0b4a8b */ee.FeatureCollection([]),
    supermarket = ui.import && ui.import("supermarket", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#68f6ff",
      "mode": "FeatureCollection",
      "shown": true,
      "locked": false
    }) || /* color: #68f6ff */ee.FeatureCollection([]);
var shp = ee.FeatureCollection(table)
Map.addLayer(shp, {}, 'My table')
Map.centerObject(table)
var maskL8 = function(image) {
  var qa = image.select('BQA');
  var mask = qa.bitwiseAnd(1 << 4).eq(0);
  return image.updateMask(mask);
}
var composite = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA')
        .filterDate('2020-01-01', '2021-12-31')
         .map(maskL8)
          .median()
          .clip(table);
//visualisasi citra
var RGBTrue = composite.select(['B4', 'B3', 'B2']);
var RGBparam = { min: 0, max: 0.3,};
Map.addLayer(RGBTrue, RGBparam, 'TRUE');