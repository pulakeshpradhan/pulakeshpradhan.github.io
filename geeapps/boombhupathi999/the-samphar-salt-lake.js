var roi = ui.import && ui.import("roi", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                74.92233872026257,
                27.015776049509775
              ],
              [
                74.92233872026257,
                26.856003921188076
              ],
              [
                75.24712204545789,
                26.856003921188076
              ],
              [
                75.24712204545789,
                27.015776049509775
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
        [[[74.92233872026257, 27.015776049509775],
          [74.92233872026257, 26.856003921188076],
          [75.24712204545789, 26.856003921188076],
          [75.24712204545789, 27.015776049509775]]], null, false);
var ncc = ee.ImageCollection("LANDSAT/LC08/C01/T1_TOA")
.filterDate('2020-04-01','2020-07-30')
.filterBounds(roi)
.sort('CLOUD_COVER', true)
.first();
var fcc = ee.ImageCollection("LANDSAT/LC08/C01/T1_TOA")
.filterDate('2020-04-01','2020-07-30')
.filterBounds(roi)
.sort('CLOUD_COVER', true)
.first();
var ncc_style = {
  bands: ['B4', 'B3', 'B2'],
  min: 0.0,
  max: 0.3,
  gamma: 1.2
};
var fcc_style = {
  bands: ['B5', 'B4', 'B3'],
  min: 0.0,
  max: 0.3,
  gamma: 1.2
};
Map.addLayer(ncc.clip(roi),ncc_style,'ncc');
Map.addLayer(fcc.clip(roi),fcc_style,'fcc');
var leftMap = ui.Map();
var rightMap = ui.Map();
var ncc_image = ui.Map.Layer(ncc.clip(roi),ncc_style);
var fcc_image = ui.Map.Layer(fcc.clip(roi),fcc_style);
var ncc_layer = leftMap.layers();
var fcc_layer = rightMap.layers();
ncc_layer.add(ncc_image);
fcc_layer.add(fcc_image);
var ncc_label = ui.Label('NCC')
ncc_label.style().set('position', 'bottom-left');
var fcc_label = ui.Label('FCC')
fcc_label.style().set('position', 'bottom-right');
leftMap.add(ncc_label);
rightMap.add(fcc_label);
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  orientation: 'horizontal',
  wipe: true
});
ui.root.clear();
ui.root.add(splitPanel);
var linkPanel = ui.Map.Linker([leftMap, rightMap])
leftMap.centerObject(roi, 12);
Map.addLayer(roi);