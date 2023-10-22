var Indonesia = ui.import && ui.import("Indonesia", "table", {
      "id": "users/zolasaputra26/IDN_admKab"
    }) || ee.FeatureCollection("users/zolasaputra26/IDN_admKab"),
    ndhiVis = ui.import && ui.import("ndhiVis", "imageVisParam", {
      "params": {
        "min": -1,
        "max": 1,
        "palette": [
          "FFFFFF",
          "CE7E45",
          "DF923D",
          "F1B555",
          "FCD163",
          "99B718",
          "74A901",
          "66A000",
          "529400",
          "3E8601",
          "207401",
          "056201",
          "004C00",
          "023B01",
          "012E01",
          "011D01",
          "011301"
        ]
      }
    }) || {"min":-1,"max":1,"palette":["FFFFFF","CE7E45","DF923D","F1B555","FCD163","99B718","74A901","66A000","529400","3E8601","207401","056201","004C00","023B01","012E01","011D01","011301"]},
    ndhiVis2 = ui.import && ui.import("ndhiVis2", "imageVisParam", {
      "params": {
        "min": -1,
        "max": 1,
        "palette": [
          "FFFFFF",
          "CE7E45",
          "DF923D",
          "F1B555",
          "FCD163",
          "99B718",
          "74A901",
          "66A000",
          "529400",
          "3E8601",
          "207401",
          "056201",
          "004C00",
          "023B01",
          "012E01",
          "011D01",
          "011301"
        ]
      }
    }) || {"min":-1,"max":1,"palette":["FFFFFF","CE7E45","DF923D","F1B555","FCD163","99B718","74A901","66A000","529400","3E8601","207401","056201","004C00","023B01","012E01","011D01","011301"]},
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#23cba7",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #23cba7 */ee.Geometry.MultiPoint();
// Import SHP DKI Jakarta
var countries = Indonesia
var Nama_Kota = ['Jakarta Raya'] 
var geometry = countries.filter(ee.Filter.inList('NAME_1', Nama_Kota)); // Mengambil Geometri DKI Jakarta
var area1 = ee.FeatureCollection(geometry); //Membuat Feature dari geometry 
Map.addLayer(geometry,{color:"Blue" },"Provinsi", false); //Menampilkan dan Visualisasi Polygon 
Map.centerObject(area1) // Zoom pada Polygon 
// ----------------------- Melakukan Pengaturan Pada Citra -----------------------------
// Definisi Waktu yang nantinya bisa dipilih oleh user
var images = {
  '2001': getYearlyComposite('2001-01-01'),
  '2009': getYearlyComposite('2009-01-01'),
  '2019 (Sebelum Kejadian Covid-19)': getYearlyComposite('2019-01-01'),
  '2020 (Setelah Kejadian Covid-19)': getYearlyComposite('2020-01-01'),
};
// Membuat Fungsi Penggabungan Citra dalam waktu 1 Tahun dari tanggal yang ditentukan
function getYearlyComposite(date) {
  var date = ee.Date(date);
  var modis6a = ee.ImageCollection("MODIS/006/MOD09A1") // Memanggil Collection Modis
  .filterDate(date, date.advance(1, 'year'))
  .filterBounds(geometry) // Menfilter areA
  .sort('CLOUD_COVER', true); // Mensortir tutupan awan
  // Menghitung Normalized Difference Haze Index (NDHI).
  var modis6a_image = ee.Image(modis6a.first()); //Memanggil image Modis
  var modis1 = modis6a_image.select('sur_refl_b01'); // Mendefiniskan band Modis 1
  var modis4 = modis6a_image.select('sur_refl_b04'); // Mendefiniskan band Modis 4
  var ndhi = modis1.subtract(modis4).divide(modis1.add(modis4)).rename('NDHI'); // Formula NDHI
  return ndhi.clip(area1).visualize({min: -0.5, max: 0.5, palette: ['blue', 'white', 'red']}); // Visualisasi
}
//----------------------Melakukan Pengaturan pada Peta dan Tampilan UI -------------------------------------
// Membuat Peta Kiri yang dapat menampilkan 1 layar saja
var leftMap = ui.Map();
leftMap.setControlVisibility(false);
var leftSelector = addLayerSelector(leftMap, 0, 'top-left');
// Membuat Peta Kanan yang dapat menampilkan 1 layar saja
var rightMap = ui.Map();
rightMap.setControlVisibility(false);
var rightSelector = addLayerSelector(rightMap, 1, 'top-right');
// Menambahkan control panel dimana user dapat merubah nilai yang didalamnya
function addLayerSelector(mapToChange, defaultValue, position) {
  var label = ui.Label('Choose an image to visualize');
  function updateMap(selection) { // Fungsi untuk merubah citra 
    mapToChange.layers().set(0, ui.Map.Layer(images[selection]));
  }
  // Mengatur Dropdown List sehingga user bisa memilih data yang akan dubandingkan
  var select = ui.Select({items: Object.keys(images), onChange: updateMap}); // Mengupdate peta setelah terjadi perubahan pada control panel
  select.setValue(Object.keys(images)[defaultValue], true);
  var controlPanel = 
      ui.Panel({widgets: [label, select], style: {position: position}}); // Mengatur lokasi kontrol panel
// Mengatur Judul Aplikasi      
var legendTitle1 = ui.Label({
 value: 'Perbandingan Tingkat Polusi Udara di Jakarta Tiap Tahun',
 style: {fontWeight: 'bold',
 fontSize: '20px',
 margin: '0 0 4px 0',
 padding: '1'
 }});
mapToChange.add(legendTitle1);
// Membuat Legenda berupa Color Bar
function makeColorBarParams(palette) {
  return {
    bbox: [0, 0, 1, 0.1],
    dimensions: '100x10',
    format: 'png',
    min: 0,
    max: 1,
    palette: palette,
  };
}
// Mendefinisikan warna yang akan ditampilkan dalam Color Bar
var vis = {min: -0.5, max: 0.5, palette: ['blue', 'white', 'red']};
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(vis.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
// Membuat panel dengan 3 keterangan nilai
var legendLabels = ui.Panel({
  widgets: [
    ui.Label(vis.min, {margin: '4px 8px'}),
    ui.Label(
        (0),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(vis.max, {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
var legendTitle = ui.Label({  // Mendefinisikan Judul dari Legenda
  value: 'Keterangan : Tingkat Polusi Udara (Indeks NDHI)',
  style: {fontWeight: 'bold'}
});
var legendPanel = ui.Panel([legendTitle, colorBar, legendLabels]);
legendPanel.style().set({
  width: '400px',
  position: 'bottom-left'
})
mapToChange.add(legendPanel); // Menambahkan panel Legenda
mapToChange.add(controlPanel); // Menambahkan Panel Control Panel
}
// Mengatur kedua peta agar saling berhubungan
// Membuat Split Panel untuk memisahkan kedua peta
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  wipe: true, // Memberikan pengaturan bisa di geser Split Panel
  style: {stretch: 'both'} // Memberikan Style agar 2 Panel terkoneksi
});
// Menampilkan Spit Panel
ui.root.widgets().reset([splitPanel]);
var linker = ui.Map.Linker([leftMap, rightMap]);
leftMap.centerObject(area1);