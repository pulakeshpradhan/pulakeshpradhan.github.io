var l8 = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA').filterDate('2017-01-01', '2018-01-01')
var ndvi = l8.map(function(image) {
  return image.select().addBands(image.normalizedDifference(['B5', 'B4']));
});
var NDVIpalette = ['FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718',
               '74A901', '66A000', '529400', '3E8601', '207401', '056201',
               '004C00', '023B01', '012E01', '011D01', '011301'];
Map.addLayer((ndvi), {palette: NDVIpalette}, 'NDVI');
// Widget tutmak için panel oluşturma
var panel = ui.Panel();
panel.style().set('width', '300px');
// Başlık giriş paneli yazılar.
var intro = ui.Panel([
  ui.Label({
    value: 'NDVI ANALIZI',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
  ui.Label('Analiz İçin Haritada Bir Bölgeye Tıklayın.')
]);
panel.add(intro);
// lon lat değerlerini tutar ve panele yazdırır.
var lon = ui.Label();
var lat = ui.Label();
 panel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
// Haritada geri arama kaydetme
Map.onClick(function(coords) {
  // Her tıklandığında panelde lon lat değerini günceller
  lon.setValue('lon: ' + coords.lon.toFixed(2)),
  lat.setValue('lat: ' + coords.lat.toFixed(2));
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point, {color: 'FF0000'});
  Map.layers().set(1, dot);
  // NDVI grafiği oluştur
  var ndviChart = ui.Chart.image.series(ndvi, point, ee.Reducer.mean(), 250);
  ndviChart.setOptions({
    title: 'NDVI',
    vAxis: {title: 'NDVI'},
    hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}}, 
  });
  panel.widgets().set(1, ndviChart);
});
Map.style().set('cursor', 'crosshair');
// NDVI görüntüsü
var ls = ee.ImageCollection('LANDSAT/LC8_L1T_8DAY_NDVI')
    .filterDate('2017-01-01', '2018-01-01');
var vis = {min: 0, max: 1, palette: ['99c199', '006400']};
//Map.addLayer(ls.median(), vis, 'NDVI');
// Harita da artı işareti 
Map.style().set('cursor', 'crosshair');
// Panel oluşturmak..
var inspector = ui.Panel([ui.Label('Max NDVI için tıklayın')]);
Map.add(inspector);
Map.onClick(function(coords) {
  // Yükleniyor yazısı(olmayabilir.)
  inspector.widgets().set(0, ui.Label({
    value: 'Yükleniyor...',
    style: {color: 'gray'}
  }));
  // Tıklanılan pikselin ortalama NDVI değeri
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var meanNdvi = ls.reduce('mean');
  var sample = meanNdvi.sample(point, 30);
  var computedValue = sample.first().get('NDVI_mean');
  // değeri consoledan çağırma
  computedValue.evaluate(function(result) {
    // Değeri gösterme
    inspector.widgets().set(0, ui.Label({
      value: 'Ortalama NDVI: ' + result.toFixed(3),
    }));
  });
});
// Paneli ekrana yazdırma.
ui.root.insert(0, panel);
Map.setOptions('SATELLITE')