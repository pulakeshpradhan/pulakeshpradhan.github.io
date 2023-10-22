var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                31.489190237229543,
                47.91255484678146
              ],
              [
                31.489190237229543,
                46.39609126356647
              ],
              [
                35.51567949504204,
                46.39609126356647
              ],
              [
                35.51567949504204,
                47.91255484678146
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
        [[[31.489190237229543, 47.91255484678146],
          [31.489190237229543, 46.39609126356647],
          [35.51567949504204, 46.39609126356647],
          [35.51567949504204, 47.91255484678146]]], null, false),
    table = ui.import && ui.import("table", "table", {
      "id": "projects/gee-antonbiatov/assets/kakhovka_202306/npp_kakhovka_202306"
    }) || ee.FeatureCollection("projects/gee-antonbiatov/assets/kakhovka_202306/npp_kakhovka_202306");
//Map.setOptions("HYBRID");    
//Map.setCenter(34.9796, 47.4917, 9);
// Map.centerObject(geometry, 9);
var my_bands = ['B4', 'B5', 'B2'];
// функция маскировки облаков
function maskS2clouds(image) {
  var qa = image.select('QA60');
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask);
}
// функция подключения Sentinel 2 за нужный диапазон дат
function S2_median(STARTDAY, ENDDAY, cloud_treshold) {
var merged_dataset = ee.ImageCollection('COPERNICUS/S2_SR')
                  .filterBounds(geometry)
                  .filter(ee.Filter.date(STARTDAY, ENDDAY))
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',cloud_treshold))
                  .map(maskS2clouds)
                  .select(my_bands); 
   return merged_dataset.median().uint16();
}
// Define an empty image to paint features to.
var empty = ee.Image().byte();
// Paint country feature edges to the empty image.
var npp = empty
  .paint({featureCollection: table, color: 2, width: 2})
  // Convert to an RGB visualization image; set line color to black.
  .visualize({palette: 'FF0000'});
// Настройки отображения слоев
var rgbVis_False_color_452 = {
  min: 1000,
  max: 3000,
  bands: ['B4', 'B5', 'B2'],
};
// *********** Подключаем космические снимки
var S2_20230605 = S2_median('2023-06-02', '2023-06-06', 50);
//Map.addLayer(S2_20230605.clip(geometry), rgbVis_False_color_452, '2023-06-05');
var S2_20230620 = S2_median('2023-06-17', '2023-06-21', 50);
//Map.addLayer(S2_20230620.clip(geometry), rgbVis_False_color_452, '2023-06-20');
// Map.addLayer(npp, {}, "National Parks");
var leftMap = ui.Map();
var rightMap = ui.Map();
var image_0605 = ui.Map.Layer(S2_20230605.clip(geometry), rgbVis_False_color_452);
var image_0620 = ui.Map.Layer(S2_20230620.clip(geometry), rgbVis_False_color_452);
var image_npp_left = ui.Map.Layer(npp, {}, "National Parks");
var image_npp_right = ui.Map.Layer(npp, {}, "National Parks");
var layers_0605 = leftMap.layers();
var layers_0620 = rightMap.layers();
layers_0605.add(image_0605);
layers_0605.add(image_npp_left);
layers_0620.add(image_0620);
layers_0620.add(image_npp_right);
var label_0605 = ui.Label("2023-06-05");
label_0605.style().set("position", "bottom-left");
var label_0620 = ui.Label("2023-06-20");
label_0620.style().set("position", "bottom-right");
leftMap.add(label_0605);
rightMap.add(label_0620);
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap, 
  secondPanel: rightMap, 
  orientation: 'horizontal', 
  wipe: true
});
ui.root.clear();
ui.root.add(splitPanel);
var linkPanel = ui.Map.Linker([leftMap, rightMap]);
leftMap.centerObject(geometry, 9);