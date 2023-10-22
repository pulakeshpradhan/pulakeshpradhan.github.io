var landslide = ui.import && ui.import("landslide", "table", {
      "id": "projects/ridgei/assets/landslide"
    }) || ee.FeatureCollection("projects/ridgei/assets/landslide");
// Dataset
var ALOS = ee.ImageCollection('JAXA/ALOS/AW3D30/V3_2');
var elevation = ALOS.select('DSM');
// Band visualization
var band_viz = {
    min: 0,
    max: 0.95,
    palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red']
};
// Main panel
var panel = ui.Panel();
panel.style().set('width', '300px');
  // Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: '2021年7月3日土砂崩れエリア可視化',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
  ui.Label({
      value: '見方',
      style: {fontSize: '15px', fontWeight: 'bold'}
    }),
  ui.Label('・斜面傾斜度（白くなるほど傾斜が急）'),
  ui.Label('・赤部分：土砂崩れが発生したエリア'),
  ui.Label('傾斜角がなだらかな部分に沿って土砂が流れていることがわかります'),
    ui.Label({
      value: 'Credit.',
      style: {fontSize: '15px', fontWeight: 'bold'}
    }),
    ui.Label({
      value: '国土地理院ウェブサイト',
      style: {fontSize: "13px"},
  targetUrl: 'https://www.gsi.go.jp/BOUSAI/R3_0701_heavyrain.html'
    }),
    ui.Label({
      value: '作成',
      style: {fontSize: '15px', fontWeight: 'bold'}
    }),
    ui.Label({
      value: 'Ridge-i inc.',
      style: {fontSize: "13px"},
  targetUrl: 'https://ridge-i.com/'
}),
]);
panel.add(intro);
ui.root.insert(0, panel);
// Set Map property
Map.setCenter(139.077, 35.116, 14);
// Reproject an image mosaic using a projection from one of the image tiles,
// rather than using the default projection returned by .mosaic().
var proj = elevation.first().select(0).projection();
var slopeReprojected = ee.Terrain.slope(elevation.mosaic().setDefaultProjection(proj));
Map.addLayer(slopeReprojected, {min: 0, max: 45, opacity:0.5}, 'Slope');
Map.addLayer(landslide, {min: 0, max: 3, color: 'red', opacity: 0.5}, 'Landslide area');