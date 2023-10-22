// var GRAYMAP = [
// {
// // stylers: [ { saturation: -100 } ]
// stylers: [ { invert_lightness: true } ]
// },{ 
// stylers: [ { saturation: -80 } ]
// // stylers: [ { invert_lightness: true } ]
// },{
// elementType: 'labels',
// stylers: [ { lightness: -30 } ]
// },{
// featureType: 'road',
// elementType: 'geometry',
// stylers: [ { 'lightness': -10 } ]
// },{
// featureType: 'poi',
// elementType: 'all',
// stylers: [ { visibility: 'off' }]
// }
// ];
Map.drawingTools().setShown(false);
// Map.setOptions('Dark Map', {'Dark Map': GRAYMAP});
var ln = ee.FeatureCollection("projects/igt-common/assets/BrPadLesn"),
    kv = ee.FeatureCollection("projects/igt-common/assets/BrPadKv"),
    cut = ee.FeatureCollection("projects/igt-common/assets/IrkutskLogging");
var maskL8 = function(image) {
  var qa = image.select('BQA');
  var mask = qa.bitwiseAnd(1 << 4).eq(0);
  return image.updateMask(mask);
}
function addNDVI(image) {
  var ndvi = image.normalizedDifference(['B5', 'B4']);
  return image.addBands(ndvi.rename('NDVI'));
}
var col = ee.ImageCollection("LANDSAT/LC08/C01/T1_RT_TOA")
  // .filter(ee.Filter.eq('WRS_PATH', 136))
  // .filter(ee.Filter.eq('WRS_ROW', 21))
  .filterBounds(ln)
  .filter(ee.Filter.lt('CLOUD_COVER', 20))
  // .filterDate('2019-01-01','2020-01-01')
  .filter(ee.Filter.calendarRange(90,270,'day_of_year'))
  .map(maskL8)
  .map(addNDVI)
  ;
var vi19 = col.filterDate('2019-01-01','2020-01-01').select('NDVI').median().clip(ln)
var vi20 = col.filterDate('2020-01-01','2021-01-01').select('NDVI').median().clip(ln)
var vi21 = col.filterDate('2021-01-01','2022-01-01').select('NDVI').median().clip(ln)
var viDif = vi21.subtract(vi19)
Map.centerObject(ln,8)
var ndviVis = {
  min: 0,
  max: 1,
  palette: [
    'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
    '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
    '012E01', '011D01', '011301'
  ],
};
var ndviDifVis = {
  min: -0.5,
  max: 0.5,
  palette: [
    'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
    '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
    '012E01', '011D01', '011301'
  ],
};
Map.addLayer(col.filterDate('2020-01-01','2022-01-01').median().clip(ln),{bands:['B4','B3','B2'], min:0.05,max:0.15},'Натуральные цвета, 2021',false)
Map.addLayer(vi19,ndviVis,'Вегетационный индекс, 2019',false)
Map.addLayer(vi20,ndviVis,'Вегетационный индекс, 2020',false)
Map.addLayer(vi21,ndviVis,'Вегетационный индекс, 2021',false)
Map.addLayer(viDif,ndviDifVis,'Динамика вег. индексов, 2019-21гг.',true)
Map.addLayer(ee.Image().paint(kv,1 , 1),{},'Квартальная сеть')
Map.addLayer(ee.Image().paint(ln,1 , 2),{palette: '18A558'},'Границы лесничеств')
Map.addLayer(ee.Image().paint(cut,1 , 1),{palette: 'DC143C'},'Выявленные рубки, 2018-19гг.')