var table = ui.import && ui.import("table", "table", {
      "id": "users/macueno/Inventorymap_Obihiro"
    }) || ee.FeatureCollection("users/macueno/Inventorymap_Obihiro");
//Display the shapefile into the interactive map
Map.addLayer(table);
//Display the view to the center of the screen and scale the view
Map.centerObject(table,10);
//Define styling and determine the color of the shapefile 
var styling = {color: 'red', fillColor: '00000000'};
Map.addLayer(table.style(styling), {}, 'shorinpan');
// Define a JSON object for storing UI components.
var c = {};
c.controlPanel = ui.Panel();
c.map = ui.Map();
c.info = {};
c.info.titleLabel = ui.Label('三井物産帯広社有林');
c.info.aboutLabel = ui.Label(
  '帯広社有林の面積を測定するアプリです');
c.info.panel = ui.Panel([
  c.info.titleLabel, c.info.aboutLabel
]);
ui.root.add(c.controlPanel);
c.controlPanel.add(c.info.panel);
c.controlPanel.style().set({
  width: '275px'
});
c.info.titleLabel.style().set({
  fontSize: '20px',
  fontWeight: 'bold'
});
/* ここから先、Propertyから面積を表示したいが、できない！
var scale = Map.getScale() * 2;
var labels = table.map(function(feat) {
  feat = ee.Feature(feat);
  var area = ee.String(feat.get('1_Area'));
  var centroid = feat.geometry().centroid();
});
Map.addLayer(labels, {}, 'Area');
*/