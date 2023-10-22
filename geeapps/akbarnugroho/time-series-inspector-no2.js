var batas = ui.import && ui.import("batas", "table", {
      "id": "users/akbarnugroho/jatim_kab"
    }) || ee.FeatureCollection("users/akbarnugroho/jatim_kab");
var sentinelMap = ee.ImageCollection('COPERNICUS/S5P/OFFL/L3_NO2');
var sst = 
        sentinelMap.select('NO2_column_number_density').filterDate('2020-03-20','2020-06-23');
var vis = {min:0.0000,max:0.0003,palette:"lightblue,yellow,orange,red,purple"};
var composite = sst.mean().visualize(vis).clip(batas);
var compositeLayer = ui.Map.Layer(composite).setName('NO2 Composite');
// membuat peta utama dan mengatur layer NO2
var mapPanel = ui.Map();
var layers = mapPanel.layers();
layers.add(compositeLayer, 'NO2 Covid-19 Composite');
/*
* pengaturan panel
*/
// membuat panel yang berisi komponen judul, teks intro, bagan, dan legenda
var inspectorPanel = ui.Panel({style:{width: '30%'}});
// membuat panel intro dengan label
var intro = ui.Panel([
  ui.Label({
    value: 'Sentinel-5P NO2 Concentrate - Time Series Inspector',
    style: {fontSize: '20px', fontWeight:'bold'}
  }),
  ui.Label('Pilih lokasi untuk melihat time series konsentrasi NO2')
  ]);
inspectorPanel.add(intro);
// membuat panel untuk menampilkang nilai longitude/latitude
var lon = ui.Label();
var lat = ui.Label();
inspectorPanel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
// menambahkan placeholder untuk bagan dan legenda
inspectorPanel.add(ui.Label('[Chart]'));
inspectorPanel.add(ui.Label('[Legend]'));
/*
* pengaturan grafik
*/
// menghasilkan bagan deret waktu NO2 untuk koordinat yang dipilih
var generateChart = function (coords){
  // mempebaruhi penel longitude/latitude dengan nilai dari yang dipilih
  lon.setValue('Bujur: ' + coords.lon.toFixed(3));
  lat.setValue('Lintang: ' + coords.lat.toFixed(3));
  // menambakan titik dari titik yang dipilih
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point, {color: '000000'}, 'clicked location');
  // menambahkan titik pada layer ke dua, sehingga itu muncul di atas visualisasi NO2.
  mapPanel.layers().set(1, dot);
  // membuat diagram berdasarkan waktu
  var sstChart = ui.Chart.image.series(sst, point, ee.Reducer.mean(), 100)
  // mengatur tampilan grafik
  .setChartType('LineChart')
  .setOptions({
    title: 'NO2 column number density: time series',
    vAxis: {title: 'NO2 (Mol/m2)'},
    hAxis: {title: 'Date',
    format: 'MM-YYYY',
            gridlines: {count:7},
            baselineColor: 'FFFFFF',
    },
  interpolateNulls: true,
   legend: {position: 'right'}, 
   });
   // memposisikan bagan pada tempatnya, sehingga bagan baru dapat menimpa bagan lama
   inspectorPanel.widgets().set(2, sstChart);
};
/*
* mengatur legenda
*/
// membuat legenda sesuai warna yang diberikan diawal
// paletnya
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
// membuat bar warna pada legenda
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(vis.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
// membuat tulisan pada legenda dengan tiga angka
var legendLabels = ui.Panel({
  widgets: [
    ui.Label(vis.min, {margin: '4px 8px'}),
    ui.Label(
        (vis.max / 2),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(vis.max, {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
var legendTitle = ui.Label({
  value: 'Legenda Peta: rerata NO2 column number density (mol/m2)',
  style: {fontWeight: 'bold'}
});
var legendPanel = ui.Panel([legendTitle, colorBar, legendLabels]);
inspectorPanel.widgets().set(3, legendPanel);
/*
* mengatur peta
*/
// mendaftarkan callback pada default peta yang akan dipanggil saat peta diklik
mapPanel.onClick(generateChart);
// mengatur peta
mapPanel.style().set('cursor','crosshair');
// mencoba dengan titik uji
var initialPoint = ee.Geometry.Point(112.7, -7.29);
mapPanel.centerObject(initialPoint, 9);
// membuat tulisan kaki
var text_6 = ui.Label( 
'Dibuat oleh: Akbar Nugroho',{fontSize: '11px',color:'gray',margin: '15px 0 0 11px',padding: '0'}); 
var text_7 = ui.Label( 
'Email: akbar.nugroho@mail.ugn.ac.id',{fontSize: '11px',color:'gray',margin: '0 0 0 11px',padding: '0'}); 
var text_8 = ui.Label(
  'S1 Teknik Geodesi Fakultas Teknik',{fontSize: '11px',color:'gray',margin: '0 0 0 11px',padding: '0'}); 
var text_9 = ui.Label( 
'Universitas Gadjah Mada',{fontSize: '11px',color:'gray',margin: '0 0 0 11px',padding: '0'}); 
var text6_9 = ui.Panel([text_6,text_7,text_8,text_9],'flow'); 
inspectorPanel.add(text6_9); 
/*
*  inisialisasi aplikasi
*/
// mengganti root dengan panel terpisah yang berisi inspeksi dan peta 
ui.root.clear();
ui.root.add(ui.SplitPanel(inspectorPanel, mapPanel));
generateChart({
  lon: initialPoint.coordinates().get(0).getInfo(),
  lat: initialPoint.coordinates().get(1).getInfo()
});