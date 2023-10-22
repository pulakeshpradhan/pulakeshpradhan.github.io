// สอนทำ UI แผนที่ที่เชื่อมโยง โดยแต่ละรายการมีการแสดงภาพที่แตกต่างกัน
/*
 * 1) Image setup
 */
// สร้างโมเสกเริ่มต้น ซึ่งเราจะเห็นภาพได้หลายวิธี อันนี้ทดลองวิธีใช้ function
var image = ee.ImageCollection('COPERNICUS/S2')
    .filterDate('2021-12-01', '2022-01-31')
    // Scale the images to a smaller range, just for simpler visualization.
    .map(function f(e) { return e.divide(10000); })
    .median();
// แต่ละแผนที่มีชื่อและพารามิเตอร์การแสดงภาพบางส่วน
var MAP_PARAMS = {
  'Natural Color (B4/B3/B2)': ['B4', 'B3', 'B2'],
  'Land/Water (B8/B11/B4)': ['B8', 'B11', 'B4'],
  'Color Infrared (B8/B4/B3)': ['B8', 'B4', 'B3'],
  'Vegetation (B12/B11/B4)': ['B12', 'B12', 'B4']
};
// พารามิเตอร์การแสดงภาพที่ใช้ร่วมกันสำหรับรูปภาพ
function getVisualization(bands) {
  return {gamma: 1.3, min: 0, max: 0.3, bands: bands};
}
/*
 * 2) กำหนดค่าแผนที่ เชื่อมโยงกัน
 */
// สร้างแผนที่สำหรับตัวเลือกการแสดงภาพแต่ละรายการ
var maps = [];
Object.keys(MAP_PARAMS).forEach(function(name) {
  var map = ui.Map();
  map.add(ui.Label(name));
  map.addLayer(image, getVisualization(MAP_PARAMS[name]), name);
  map.setControlVisibility(false);
  maps.push(map);
});
var linker = ui.Map.Linker(maps);
// 2.1 top-left map.
maps[0].setControlVisibility({zoomControl: true});
// 2.2  bottom-right map.
maps[3].setControlVisibility({scaleControl: true});
// 2.3 Create a grid of maps.
var mapGrid = ui.Panel(
    [
      ui.Panel([maps[0], maps[1]], null, {stretch: 'both'}),
      ui.Panel([maps[2], maps[3]], null, {stretch: 'both'})
    ],
    ui.Panel.Layout.Flow('horizontal'), {stretch: 'both'});
// Center the map at an interesting spot in Bangkok
// other maps will align themselves to this parent map.
maps[0].setCenter(100.5, 13.7, 12);
/*
 * Add a title and initialize
 */
// Create a title.
var title = ui.Label('Sentinel-2 Visualizations', {
  stretch: 'horizontal',
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: '24px'
});
// Add the maps and title to the ui.root.
ui.root.widgets().reset([title, mapGrid]);
ui.root.setLayout(ui.Panel.Layout.Flow('vertical'));