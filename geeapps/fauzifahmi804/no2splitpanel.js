var table = ui.import && ui.import("table", "table", {
      "id": "users/fauzifahmi804/Kota_depok"
    }) || ee.FeatureCollection("users/fauzifahmi804/Kota_depok");
var collection1 = ee.ImageCollection('COPERNICUS/S5P/OFFL/L3_NO2')
  .select('NO2_column_number_density')
  .filterBounds(table)
  .filterDate('2022-08-20', '2022-08-27')
  .mean();
var collection2 = ee.ImageCollection('COPERNICUS/S5P/OFFL/L3_NO2')
  .select('NO2_column_number_density')
  .filterBounds(table)
  .filterDate('2022-08-21', '2022-08-29')
  .mean();
var band_viz = {
  min: 0.00001,
  max: 0.0002,
  palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red']
};
Map.addLayer(collection1.clip(table), band_viz, 'C1');
Map.addLayer(collection2.clip(table), band_viz, 'C2');
//Map.setCenter(106.7856, -6.3979, 12);
//Map.style().set('cursor', 'crosshair');
var leftMap = ui.Map();
var rightMap = ui.Map();
var NO2_1 = ui.Map.Layer(collection1.clip(table), band_viz, 'C1');
var NO2_2 = ui.Map.Layer(collection2.clip(table), band_viz, 'C2');
var NO2_1_layer = leftMap.layers();
var NO2_2_layer = rightMap.layers();
NO2_1_layer.add(NO2_1);
NO2_2_layer.add(NO2_2);
var C1_label = ui.Label('Konsentrasi NO2 24 Agustus 2022');
C1_label.style().set('position', 'bottom-left');
var C2_label = ui.Label('Konsentrasi NO2 27 Agustus 2022');
C2_label.style().set('position', 'bottom-right');
leftMap.add(C1_label);
rightMap.add(C2_label);
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  orientation: 'horizontal',
  wipe: true
});
ui.root.clear();
ui.root.add(splitPanel);
var linkPanel = ui.Map.Linker([leftMap, rightMap]);
leftMap.centerObject(table, 12);