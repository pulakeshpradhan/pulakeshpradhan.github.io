var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                35.51888858837447,
                33.900799649067835
              ],
              [
                35.519333835070945,
                33.90090205630185
              ],
              [
                35.51904415649734,
                33.9020507898897
              ],
              [
                35.518598909800865,
                33.901979551047575
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#98ff00",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #98ff00 */ee.Geometry.Polygon(
        [[[35.51888858837447, 33.900799649067835],
          [35.519333835070945, 33.90090205630185],
          [35.51904415649734, 33.9020507898897],
          [35.518598909800865, 33.901979551047575]]]),
    s2 = ui.import && ui.import("s2", "imageCollection", {
      "id": "COPERNICUS/S2"
    }) || ee.ImageCollection("COPERNICUS/S2"),
    s2_rgb = ui.import && ui.import("s2_rgb", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "B4",
          "B3",
          "B2"
        ],
        "min": 569.2339469946071,
        "max": 2349.7908431288497,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["B4","B3","B2"],"min":569.2339469946071,"max":2349.7908431288497,"gamma":1};
s2 = s2.filterBounds(geometry).filterDate("2020-07-01","2020-08-10")
print(s2)
var img_before = ee.Image("COPERNICUS/S2/20200724T081611_20200724T082516_T36SYC")
var img_after = ee.Image("COPERNICUS/S2/20200808T081609_20200808T082811_T36SYC")
var leftMap = ui.Map();
leftMap.setControlVisibility(true);
var rightMap = ui.Map();
rightMap.setControlVisibility(false);
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  wipe: true,
  style: {stretch: 'both'}
});
ui.root.widgets().reset([splitPanel]);
var linker = ui.Map.Linker([leftMap, rightMap]);
leftMap.addLayer(img_before, s2_rgb)
rightMap.addLayer(img_after, s2_rgb)
print(geometry.centroid().coordinates())
leftMap.setCenter(35.51896582742178,33.90143121422302, 15)
var left_label_panel = new ui.Panel([ui.Label('before the explosion (2020-07-24)')]);
left_label_panel.style().set({position: 'bottom-left'});
leftMap.add(left_label_panel);
var right_label_panel = new ui.Panel([ui.Label('after the explosion (2020-08-08)')]);
right_label_panel.style().set({position: 'bottom-right'});
rightMap.add(right_label_panel);