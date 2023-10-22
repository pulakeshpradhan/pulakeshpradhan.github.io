var left = ui.Map();
var right = ui.Map();
ui.root.clear();
ui.root.add(left);
ui.root.add(right);
ui.Map.Linker([left, right], 'change-bounds');
left.setCenter(31.672, 49.277,5);
var UA  = ee.FeatureCollection("FAO/GAUL/2015/level0") .filter(ee.Filter.eq('ADM0_NAME', 'Ukraine'));
var srtm = ee.Image('USGS/SRTMGL1_003');
left.addLayer(srtm.clip(UA),{min: 500, max: 2200, palette: ['ffffd4', 'fee391','fec44f','fe9929','d95f0e','993404']}, 'SRTM');
left.style().set('cursor', 'crosshair');
right.style().set('cursor', 'crosshair');
var inspector_srtm = ui.Panel([ui.Label('Дізнатися висоту')]);
left.add(inspector_srtm);
left.onClick(function(coords) {
  inspector_srtm.widgets().set(0, ui.Label({
    value: 'Завантаження...',
    style: {color: 'gray'}
  }));
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var select = srtm.select('elevation');
  var sample = select.sample(point, 30);
  var computedValue = sample.first().get('elevation');
computedValue.evaluate(function(result) {
    inspector_srtm.widgets().set(0, ui.Label({
      value: 'Висота: ' + result.toFixed(2),
    }));
  });
});
var ls = ee.ImageCollection('LANDSAT/LC8_L1T_8DAY_NDVI')
    .filterDate('2015-04-01', '2021-09-01')
    .filter(ee.Filter.dayOfYear(121,273));
var vis = {min: 0, max: 1, palette: ['8c510a', 'd8b365','f6e8c3','c7eae5','5ab4ac','01665e']};
right.addLayer(ls.median().clip(UA), vis, 'NDVI');
var inspector_ndvi = ui.Panel([ui.Label('Дізнатися NDVI')]);
right.add(inspector_ndvi);
right.onClick(function(coords) {
  inspector_ndvi.widgets().set(0, ui.Label({
    value: 'Завантаження...',
    style: {color: 'gray'}
  }));
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var meanNdvi = ls.reduce('mean');
  var sample = meanNdvi.sample(point, 30);
  var computedValue = sample.first().get('NDVI_mean');
  computedValue.evaluate(function(result) {
    inspector_ndvi.widgets().set(0, ui.Label({
      value: 'Середній NDVI: ' + result.toFixed(2),
    }));
  });
});
function maskS2clouds(image) {
  var qa = image.select('QA60');
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask).divide(10000);
}
var dataset = ee.ImageCollection('COPERNICUS/S2_SR')
  .filterDate('2016-05-01', '2021-01-30')
  .filter(ee.Filter.dayOfYear(121,273))
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',1))
  .map(maskS2clouds)
  .select('B4', 'B3', 'B2');
var visualization = {
  min: 0.0,
  max: 0.3,
  bands: ['B4', 'B3', 'B2'],
};
right.addLayer(dataset.median().clip(UA), visualization, 'True Color (432)');
left.addLayer(dataset.median().clip(UA), visualization, 'True Color (432)');
var geometry = ee.Geometry.Point([24.502225469789003, 48.156867664966825]),
    geometry2 = ee.Geometry.Point([24.56848676129291, 48.10164213552508]),
    geometry3 = ee.Geometry.Point([24.497318933431757, 48.36777855900774]);
var panel = ui.Panel({style: {width:'6%'}});
ui.root.insert(0,panel);
var button_Brebeneskul = ui.Button('Бребенескул', Brebeneskul_co);
panel.add(button_Brebeneskul);
function Brebeneskul_co(){
  left.centerObject(geometry2,12);
}
var button_Hoverla = ui.Button('Говерла', Hoverla_co);
panel.add(button_Hoverla);
function Hoverla_co(){
  left.centerObject(geometry,12);
}
var button_Khomiak = ui.Button("Хом'як", Khomiak_co);
panel.add(button_Khomiak);
function Khomiak_co(){
  left.centerObject(geometry3,13);
}