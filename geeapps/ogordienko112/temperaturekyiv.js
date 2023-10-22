var table = ui.import && ui.import("table", "table", {
      "id": "users/ogordienko112/kyiv_be"
    }) || ee.FeatureCollection("users/ogordienko112/kyiv_be"),
    table2 = ui.import && ui.import("table2", "table", {
      "id": "users/ogordienko112/border_1"
    }) || ee.FeatureCollection("users/ogordienko112/border_1");
var geometry = table2;
var hasil = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
 .filterBounds(geometry)
 .filterDate('2021-05-01','2021-06-28')
 .filterMetadata('CLOUD_COVER', 'less_than', 100);
print(hasil);
var vizParams = {
bands: ['B5', 'B6', 'B4'],
min: 0,
max: 4000,
gamma: [1, 0.9, 1.1]
};
var vizParams2 = {
bands: ['B4', 'B3', 'B2'],
min: 0,
max: 3000,
gamma: 1.4,
};
{
var image = ee.Image('LANDSAT/LC08/C01/T1_SR/LC08_181025_20210609').clip(table);
print(image, 'image');
Map.addLayer(image, vizParams2,'Спутниковый снимок');
}
{
var ndvi = image.normalizedDifference(['B5', 
'B4']).rename('NDVI');
var ndviParams = {min: -1, max: 1, palette: ['blue', 'white', 
'green']};
print(ndvi,'ndvi');
Map.addLayer(ndvi, ndviParams, 'Растительность');
}
var thermal= image.select('B10').multiply(0.1);
var b10Params = {min: 291.918, max: 302.382, palette: ['blue', 
'white', 'green']};
Map.addLayer(thermal, b10Params, 'Термальный канал');
{
var min = ee.Number(ndvi.reduceRegion({
reducer: ee.Reducer.min(),
scale: 30,
maxPixels: 1e9
}).values().get(0));
print(min, 'min');
var max = ee.Number(ndvi.reduceRegion({
reducer: ee.Reducer.max(),
scale: 30,
maxPixels: 1e9
}).values().get(0));
print(max, 'max');
}
{
var fv =(ndvi.subtract(min).divide(max.subtract(min))).pow(ee.Number(2)).rename('FV'); 
print(fv, 'fv');
}
var a= ee.Number(0.004);
var b= ee.Number(0.986);
var EM=fv.multiply(a).add(b).rename('EMM');
var imageVisParam3 = {min: 0.9865619146722164, max:0.989699971371314};
var LST = thermal.expression(
'(Tb/(1 + (0.00115* (Tb / 1.438))*log(Ep)))-273.15', {
 'Tb': thermal.select('B10'),
'Ep': EM.select('EMM')
}).rename('LST');
{
var min = ee.Number(LST.reduceRegion({
reducer: ee.Reducer.min(),
scale: 30,
maxPixels: 1e9
}).values().get(0));
print(min, 'minLST');
var max = ee.Number(LST.reduceRegion({
reducer: ee.Reducer.max(),
scale: 30,
maxPixels: 1e9
}).values().get(0));
print(max, 'maxLST');
}
Map.addLayer(LST, {min: 12.19726940544291, max:41.6701111498399, palette: [
'040274', '040281', '0502a3', '0502b8', '0502ce', '0502e6',
'0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef',
'3be285', '3ff38f', '86e26f', '3ae237', 'b5e22e', 'd6e21f',
'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08', 'ff500d',
'ff0000', 'de0101', 'c21301', 'a71001', '911003'
 ]},'Температура поверхности');
Map.setCenter(30.4748, 50.4568,10);
var add2 = image.addBands(LST);
var add3 = add2.select('LST');
print (add2,'with_LST');
var inspector2 = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {position:'top-center'}
});
inspector2.add(ui.Label('Кликни'));
Map.add(inspector2);
Map.style().set('cursor', 'crosshair');
Map.onClick(function(coords) {
  inspector2.clear();
  inspector2.style().set('shown', true);
  inspector2.add(ui.Label('Загрузка...', {color: 'gray'}));
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var sampledPoint = add3.reduceRegion(ee.Reducer.mean(), point, 30);
  var computedValue = sampledPoint.get('LST');
  computedValue.evaluate(function(result) {
    inspector2.clear();
    inspector2.add(ui.Label({
      value: 'Температура в этой точке: ' + result.toFixed(2),
      style: {stretch: 'vertical'}
    }));
    inspector2.add(ui.Button({
      label: 'Закрыть',
      onClick: function() {
        inspector2.style().set('shown', false);
      }
    }));
  });
});