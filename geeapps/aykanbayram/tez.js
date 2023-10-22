/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var NM17 = ee.FeatureCollection("users/aykanbayram/2016-2017"),
    NM14 = ee.FeatureCollection("users/aykanbayram/2014-2015"),
    geometry = ee.FeatureCollection("users/aykanbayram/StudyArea");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
var l8 = ee.ImageCollection('LANDSAT/LC08/C01/T1_RT_TOA').filterBounds(geometry)
.map(function(image){return image.clip(geometry)})
var styling = {color: 'red', fillColor: '00000000'};
Map.addLayer(geometry.style(styling));
Map.centerObject(geometry);
var cloudscore = ee.Algorithms.Landsat.simpleCloudScore(l8);
var filtered = l8.filterBounds(geometry);
//NDVI
var rgb = l8.select(['B4', 'B3', 'B2']);
var filtered = l8.filterBounds(geometry);
function addNDVI(image) {
  var ndvi = image.normalizedDifference(['B5', 'B4']);
  return image.addBands(ndvi);
}
var cloudscore = ee.Algorithms.Landsat.simpleCloudScore(l8);
var image = ee.Image(filtered.first());
var with_ndvi = filtered.map(addNDVI);
var greenest = with_ndvi.qualityMosaic('nd').float();
var vis = {min: 0, max: 1, palette: [
  'FFFFFF', 'CE7E45', 'FCD163', '66A000', '207401',
  '056201', '004C00', '023B01', '012E01', '011301'
]};
//NDVI
var ndvi = l8.map(function(image) {
  return image.select().addBands(image.normalizedDifference(['B5', 'B4']));
});
//NDWI
var rgb = l8.select(['B4', 'B3', 'B2']);
var ndwi = l8.map(function(image) {
  return image.select().addBands(image.normalizedDifference(['B3', 'B5']));
});
var vis = {min: -1, max: 1, palette: [
  'FFFFFF', 'CE7E45', 'FCD163', '66A000', '207401',
  '056201', '004C00', '023B01', '012E01', '011301'
]};
//NDTI
var rgb = l8.select(['B4', 'B3', 'B2']);
var ndti = l8.map(function(image) {
  return image.select().addBands(image.normalizedDifference(['B6', 'B7']));
});
var vis = {min: -1, max: 1, palette: [
  'FFFFFF', 'CE7E45', 'FCD163', '66A000', '207401',
  '056201', '004C00', '023B01', '012E01', '011301'
]};
//NPCRI
var rgb = l8.select(['B4', 'B3', 'B2']);
var npcrı = l8.map(function(image) {
  return image.select().addBands(image.normalizedDifference(['B4', 'B2']));
});
var vis = {min: -1, max: 1, palette: [
  'FFFFFF', 'CE7E45', 'FCD163', '66A000', '207401',
  '056201', '004C00', '023B01', '012E01', '011301'
]};
// NDMI
var rgb = l8.select(['B4', 'B3', 'B2']);
var ndmı = l8.map(function(image) {
  return image.select().addBands(image.normalizedDifference(['B5', 'B6']));
});
var vis = {min: -1, max: 1, palette: [
  'FFFFFF', 'CE7E45', 'FCD163', '66A000', '207401',
  '056201', '004C00', '023B01', '012E01', '011301'
]};
var NDVI_STYLE = {
  min: 0,
  max: 1,
  palette: ["beb261","8ffff9","1cd810"]
};
var NDVI_VIS_MAX_VALUE = 1;
var NDVI_VIS_NONLINEARITY = 4;
var PARCEL_STYLE = {color: 'green', fillColor: '00000000'};
var HIGHLIGHT_STYLE = {color: 'red', fillColor: '00000000'};
function colorStretch(image) {
  return image.divide(NDVI_VIS_MAX_VALUE)
      .pow(1 / NDVI_VIS_NONLINEARITY);
}
function undoColorStretch(val) {
  return Math.pow(val, NDVI_VIS_NONLINEARITY) * NDVI_VIS_MAX_VALUE;
}
Map.addLayer(NM17, vis)
Map.addLayer(geometry.style(PARCEL_STYLE));
Map.style().set({cursor: 'crosshair'});
Map.add(ui.Label(
    'Trabzon Arazi Bilgi Sistemi', {fontWeight: 'bold', fontSize: '24px'}));
print(NM17)
print(NM14)
//görüntüler için dateslider ekleme
var start = ee.Image(with_ndvi.first()).date().get('year').format();
var now = Date.now();
var end = ee.Date(now).format();
// Dateslider filtreleri
var rangeStart='2013-01-01'
var rangeEnd='2021-05-01'
var showMosaic = function(range) {
  rangeEnd = range.end()
  rangeStart = range.start()
  //var with_ndvi = filtered.map(addNDVI);
  //filtered.filterDate(range.start(), range.end())
  //with_ndvi = filtered.map(addNDVI);
  ///filtered = L8.filterBounds(NM).filterDate(range.start(),range.end());
  var mosaic = ({
    collection: l8.filterDate(range.start(), range.end())
  });
// Eşzamansız olarak bileşik hesabı
  range.start().get('year').evaluate(function(name) {
    var visParams = {bands: ['nd'], max: 100};
    var layer = ui.Map.Layer(NM17, vis, name + ' composite');
    Map.layers().set(0, layer);
  });
};
// Tarih aralığını hesaplama ve kaydırıcıyı haritada gösterme
var dateRange = ee.DateRange(start, end).evaluate(function(range) {
  var dateSlider = ui.DateSlider({
    start: range['dates'][0],
    end: range['dates'][1],
    value: null,
    period: 365,
    onChange: showMosaic
  });
print(range)
  Map.add(dateSlider.setValue(now));
});
//// sağ alt panel
// kullanıcının tıkladığı nokta
var selectedPoints = [];
// seçilen orman listesi döndürülür
function getSelectedParcels() {
  return geometry.filterBounds(ee.Geometry.MultiPoint(selectedPoints));
}
function makeResultsBarChart(parcels) {
  print(rangeStart.format('Y'))
  var newstart=rangeStart.format('Y-01-01')
  var newend=rangeStart.advance(1,'year').format('Y-01-01')
  print(newend)
  //print(rangeEnd)
  //with_ndvi.filterDate(rangeStart,rangeEnd)
  //with_ndvi=with_ndvi.set("date_range", [1514764800000,1546300800000])
  var filtered = l8.filterBounds(geometry).filterDate(newstart,newend);
  var image = ee.Image(filtered.first());
  var with_ndvi = filtered.map(addNDVI);
  var median = with_ndvi.reduce(ee.Reducer.median());
  print(with_ndvi)
  var chart = ui.Chart.image.series({
  imageCollection: with_ndvi.select('nd'),
  region: geometry,
  reducer: ee.Reducer.mean(),
  scale: 500
});
 chart.style().set({stretch: 'both'});
  return chart;
}
function makeResultsTable(geometry) {
  var table = ui.Chart.feature.byFeature(geometry, 'Name');
  table.setChartType('Table');
  table.setOptions({allowHtml: true, pageSize: 5});
  table.style().set({stretch: 'both'});
  return table;
}
function updateOverlay() {
  var overlay = getSelectedParcels().style(HIGHLIGHT_STYLE);
  Map.layers().set(2, ui.Map.Layer(overlay));
}
function updateChart() {
  var chartBuilder = chartTypeToggleButton.value;
  var chart = chartBuilder(getSelectedParcels());
  resultsPanel.clear().add(chart).add(buttonPanel);
}
function clearResults() {
  selectedPoints = [];
  Map.layers().remove(Map.layers().get(2));
  var instructionsLabel = ui.Label('İndeks karşılaştırmak için bölge seçiniz');
  resultsPanel.widgets().reset([instructionsLabel]);
}
function handleMapClick(location) {
  selectedPoints.push([location.lon, location.lat]);
  updateOverlay();
  updateChart();
}
Map.onClick(handleMapClick);
function ToggleButton(states, onClick) {
  var index = 0;
  var button = ui.Button(states[index].label);
  button.value = states[index].value;
  button.onClick(function() {
    index = ++index % states.length;
    button.setLabel(states[index].label);
    button.value = states[index].value;
    onClick();
  });
  return button;
}
var chartTypeToggleButton = ToggleButton(
    [
      {
        label: 'Seçilen Bölge Özelliklerini Göster',
        value: makeResultsBarChart,
      },
      {
        label: 'Sonuçları grafik olarak göster',
        value: makeResultsTable,
      }
    ],
    updateChart);
    var buttonPanel = ui.Panel(
    [ui.Button('Tabloyu Temizle', clearResults), chartTypeToggleButton],
    ui.Panel.Layout.Flow('horizontal'), {margin: '0 0 0 auto', width: '500px'});
var resultsPanel = ui.Panel({style: {position: 'bottom-right'}});
Map.add(resultsPanel);
clearResults();
//sol alt panel
//widgetları tut
// sol panel oluştur
var panel = ui.Panel();
panel.style().set({
  width: '300px'
});
// başlıkları ekleme 
var intro = ui.Panel([
  ui.Label({
    value: 'Seçilen Alanın İndeks Analizleri',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
  ui.Label('**Harita üzerinde bir bölgeyi seçiniz ve analiz yapması için biraz bekleyiniz.** 1-NDVI : Bitki örtüsü yoğunluğunu belirleyen indekstir. 2-NDWI : Su kütlelerindeki su içeriği ile ilgili değişiklikleri izlemek için kullanılan indekstir. 3-NDTI : Yerleşim alanlarını vurgulayarak, toprak alanlarından ayırt eden indekstir. 4-NPCRI : Bitkilerin klorofil oranını karşılaştırmaya yarayan indekstir. 5-NDMI : Kuraklık takibi ve bitki örtüsü alanlarında nemlilik değişiminin belirlenmesi için kullanılan indekstir.' )
]);
panel.add(intro);
// en boy değerlerini tutan panel
var lon = ui.Label();
var lat = ui.Label();
panel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
// Tıklama sonrası çağırılacak varsayılan haritada bir geri arama kaydetme.
Map.onClick(function(coords) {
  // lon lat panelini tıklamadan sonra güncelleme
  lon.setValue('lon: ' + coords.lon.toFixed(2)),
  lat.setValue('lat: ' + coords.lat.toFixed(2));
  // tıklanılan yere kırmızı nokta ekleme.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point, {color: 'FF0000'});
  Map.layers().set(1, dot);
  // NDVI tablosu oluştur.
  var ndviChart = ui.Chart.image.series(ndvi, point, ee.Reducer.mean(), 500);
  ndviChart.setOptions({
    title: 'NDVI Over Time',
    vAxis: {title: 'NDVI'},
    hAxis: {title: 'date', format: 'YYYY', gridlines: {count: 7}},
  });
  panel.widgets().set(2, ndviChart);
// NDWI tablosu oluştur
var ndwiChart = ui.Chart.image.series(ndwi, point, ee.Reducer.mean(), 500);
  ndwiChart.setOptions({
    title: 'NDWI Over Time',
    vAxis: {title: 'NDWI'},
    hAxis: {title: 'date', format: 'YYYY', gridlines: {count: 7}},
  });
  panel.widgets().set(3, ndwiChart);
  //NDTI tablosu
  var ndtiChart = ui.Chart.image.series(ndti, point, ee.Reducer.mean(), 500);
  ndtiChart.setOptions({
    title: 'NDTI Over Time',
    vAxis: {title: 'NDTI'},
    hAxis: {title: 'date', format: 'YYYY', gridlines: {count: 7}},
  });
  panel.widgets().set(4, ndtiChart);
// NPCRI tablosu
var npcrıChart = ui.Chart.image.series(npcrı, point, ee.Reducer.mean(), 500);
  npcrıChart.setOptions({
    title: 'NPCRI Over Time',
    vAxis: {title: 'NPCRI'},
    hAxis: {title: 'date', format: 'YYYY', gridlines: {count: 7}},
  });
  panel.widgets().set(5, npcrıChart);
// NDMI tablosu
var ndmıChart = ui.Chart.image.series(ndmı, point, ee.Reducer.mean(), 500);
  ndmıChart.setOptions({
    title: 'NDMI Over Time',
    vAxis: {title: 'NDMI'},
    hAxis: {title: 'date', format: 'YYYY', gridlines: {count: 7}},
  });
  panel.widgets().set(6, ndmıChart);
});
ui.root.insert(0, panel);
Map.setOptions('SATELLITE')