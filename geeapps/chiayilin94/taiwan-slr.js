var JAXA_ALOS_AW3D30_V2_2 = ee.ImageCollection("users/chiayilin94/JAXA_ALOS_AW3D30_V2_2"),
    JAXA_ALOS_AW3D30_V1_1 = ee.Image("JAXA/ALOS/AW3D30_V1_1");
/**
 * Author: Joanna Lin (chiayilin94@gmail.com)
 * Date: 2019-10-31.
 * Title: How Sea Level Rise impacts Taiwan. 
 * Data: obtained from JAXA ALOS v1.1 and v2.2.
 */
var legend = require('users/chiayilin94/module:legend');
var styles = require('users/chiayilin94/module:styles');
var v1 = JAXA_ALOS_AW3D30_V1_1;
var v2 = JAXA_ALOS_AW3D30_V2_2.mean();
var sea_level_rise = 7; // 預期上升程度為7米
var map = ui.Map();
var elev1 = v1.select('AVE'); // ALOS v1.1 2017年發布
var elev2 = v2.select('b1'); // ALOS v2.2 2019年發布
var elev1_global = elev1
  .updateMask(elev1.gt(0))
  .updateMask(elev1.lte(sea_level_rise));
var elev2_taiwan = elev2
  .updateMask(elev2.gt(0))
  .updateMask(elev2.lte(sea_level_rise));
var slrVis = {
  min: 0,
  max: sea_level_rise,
  palette: ['#337CA0', '#FFFF00'],
  opacity: 0.8
};
map.setOptions('Dark', styles.getDarkBasemap());
map.setCenter(120.6944, 23.8201, 8);
map.addLayer(elev1_global, slrVis, 'World Low level', false);
map.addLayer(elev2_taiwan, slrVis, 'Taiwan Low level', true);
map.setControlVisibility(false);
var title = ui.Label(
  '低於海平面7米處', 
  {'backgroundColor': 'gray', 'color': 'white', 'fontWeight': 'bold'});
var taiwanButton = ui.Button('觀看台灣地圖', function() {
  map.setCenter(120.6944, 23.8201, 8);
  map.layers().get(0).setShown(false);
  map.layers().get(1).setShown(true);
});
var worldButton = ui.Button('觀看世界地圖', function() {
  map.setCenter(120.6944, 23.8201, 2);
  map.layers().get(0).setShown(true);
  map.layers().get(1).setShown(false);
});
var sourceNote = ui.Label(
  'Source: JAXA AW3D30', 
  {
    fontSize: '12px', textAlign: 'center',
    margin: '0 0 2px 6px', backgroundColor: 'gray',
  },
  'https://www.eorc.jaxa.jp/ALOS/en/aw3d30/index.htm');
var togglePanel = ui.Panel({
  widgets: [title, taiwanButton, worldButton, sourceNote],
  style: {'backgroundColor': 'gray', 'position': 'top-right'},
});
map.add(togglePanel);
ui.root.widgets().reset([map]);