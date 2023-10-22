// Masukkan Feature Clollection Dunia
var dataset = ee.FeatureCollection('USDOS/LSIB_SIMPLE/2017');
// Filter negera Indonesia.
var IDNBorder = dataset.filter(ee.Filter.eq('country_na', 'Indonesia'));
// Menampilkan hasil filter ke console
print(IDNBorder);
// Fokus & Zoom layer
Map.centerObject(IDNBorder, 5);
// Tambahkan layer
Map.addLayer(IDNBorder);
// Masukkan data LST
var modis = ee.ImageCollection('MODIS/MOD11A2');
// Defenisikan waktu Awal
var start = ee.Date('2000-01-01');
// Definisikan rentan pengambilan data
var dateRange = ee.DateRange(start, start.advance(1, 'year'));
// Penerapan rentan waktu untuk data modis
var mod11a2 = modis.filterDate(dateRange);
// Pilih data modis LST Day 1 Km
var modLSTday = mod11a2.select('LST_Day_1km');
// Ubah skala Kelvin ke Celsius, atur waktu akuisisi data
var modLSTc = modLSTday.map(function(img) {
  return img
    .multiply(0.02)
    .subtract(273.15)
    .copyProperties(img, ['system:time_start']);
});
// Grafik Suhu permukaan tanah (LST) terhadap waktu
var ts1 = ui.Chart.image.series({
  imageCollection: modLSTc,
  region: IDNBorder,
  reducer: ee.Reducer.mean(),
  scale: 1000,
  xProperty: 'system:time_start'})
  .setOptions({
     title: 'LST 2000-2003 Time Series',
     vAxis: {title: 'LST Celsius'}});
print(ts1);
// Hitung 8-day mean temperature / tahun
var clippedLSTc = modLSTc.mean().clip(IDNBorder);
// Parameter visualisasi
var viz = {min:20, max:40, palette:['blue', 'limegreen', 'yellow', 'darkorange', 'red']};
// Menampilkan layer
Map.addLayer(clippedLSTc, viz, 'Mean temperature, 2000-2003');
// -----------------Legend---------------------------------
// Buat Planel Legenda
var panel = ui.Panel();
panel.style().set('width', '500px');
// Buat label
var label = ui.Panel([
  ui.Label({
    value: 'Suhu Permukaan Indonesia',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
       ui.Label({
    value : 'Klik untuk menampilkan grafik',
    style: {fontSize: '12px'}
   }),
]);
 // Tambahkan label ke dalam label
panel.add(label);
// buat gambar legenda
var lon = ee.Image.pixelLonLat().select('latitude');
var gradient = lon.multiply((viz.max-viz.min)/100.0).add(viz.min);
var legendImage = gradient.visualize(viz);
// Buat Teks legenda untuk nilai maksimum
var teksMax = ui.Panel({
    widgets: [
      ui.Label(viz['max'])
    ],
  });
panel.add(teksMax);
// buat thumbnail legenda
var thumbnail = ui.Thumbnail({
  image: legendImage, 
  params: {bbox:'0,0,10,100', dimensions:'15x150'},  
  style: {padding: '1px', position: 'bottom-center'}
});
// tambahkan thumbnail ke panel
panel.add(thumbnail);
// buat text minimum
var teksBottom = ui.Panel({
    widgets: [
      ui.Label(viz['min'])
    ],
  });
panel.add(teksBottom);
// buat panel untuk menampilkan nilai lon/lat
var lon = ui.Label();
var lat = ui.Label();
panel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
/* Buat tool untuk menampilkan lon/lat serta LST
dan tampilkan pada jendela Map */
Map.onClick(function(coords) {
  // update nilai lon/lat setiap kali diclick
  lon.setValue('lon: ' + coords.lon.toFixed(2)),
  lat.setValue('lat: ' + coords.lat.toFixed(2));
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  // Buat chart LST
  var modLSTcChart = ui.Chart.image.series(modLSTc, point, ee.Reducer.mean(), 1000);
  modLSTcChart.setOptions({
    title: 'LT_Modis',
    vAxis: {title: 'LT (Celcius)', maxValue: 100},
    hAxis: {title: 'date', format: 'dd-MM-yy', gridlines: {count: 12}},
  });
  // atur posisi urutan ke lima dalam panel
  panel.widgets().set(5, modLSTcChart);
});
Map.style().set('cursor', 'crosshair');
// tambahkan panel ke ui.root.
ui.root.insert(0, panel);