var classified2013 = ui.import && ui.import("classified2013", "image", {
      "id": "users/rasendriyaramanda/Klasifikasi_SBY/Klasifikasi_Image_SBY2013"
    }) || ee.Image("users/rasendriyaramanda/Klasifikasi_SBY/Klasifikasi_Image_SBY2013"),
    classified2014 = ui.import && ui.import("classified2014", "image", {
      "id": "users/rasendriyaramanda/Klasifikasi_SBY/Klasifikasi_Image_SBY2014"
    }) || ee.Image("users/rasendriyaramanda/Klasifikasi_SBY/Klasifikasi_Image_SBY2014"),
    classified2015 = ui.import && ui.import("classified2015", "image", {
      "id": "users/rasendriyaramanda/Klasifikasi_SBY/Klasifikasi_Image_SBY2015"
    }) || ee.Image("users/rasendriyaramanda/Klasifikasi_SBY/Klasifikasi_Image_SBY2015"),
    classified2016 = ui.import && ui.import("classified2016", "image", {
      "id": "users/rasendriyaramanda/Klasifikasi_SBY/Klasifikasi_Image_SBY2016"
    }) || ee.Image("users/rasendriyaramanda/Klasifikasi_SBY/Klasifikasi_Image_SBY2016"),
    classified2017 = ui.import && ui.import("classified2017", "image", {
      "id": "users/rasendriyaramanda/Klasifikasi_SBY/Klasifikasi_Image_SBY2017"
    }) || ee.Image("users/rasendriyaramanda/Klasifikasi_SBY/Klasifikasi_Image_SBY2017"),
    classified2018 = ui.import && ui.import("classified2018", "image", {
      "id": "users/rasendriyaramanda/Klasifikasi_SBY/Klasifikasi_Image_SBY2018"
    }) || ee.Image("users/rasendriyaramanda/Klasifikasi_SBY/Klasifikasi_Image_SBY2018"),
    classified2019 = ui.import && ui.import("classified2019", "image", {
      "id": "users/rasendriyaramanda/Klasifikasi_SBY/Klasifikasi_Image_SBY2019"
    }) || ee.Image("users/rasendriyaramanda/Klasifikasi_SBY/Klasifikasi_Image_SBY2019"),
    classified2020 = ui.import && ui.import("classified2020", "image", {
      "id": "users/rasendriyaramanda/Klasifikasi_SBY/Klasifikasi_Image_SBY2020"
    }) || ee.Image("users/rasendriyaramanda/Klasifikasi_SBY/Klasifikasi_Image_SBY2020"),
    SBY2013 = ui.import && ui.import("SBY2013", "table", {
      "id": "users/rasendriyaramanda/BOUNDERY_SBY/SBY_2013_FIX"
    }) || ee.FeatureCollection("users/rasendriyaramanda/BOUNDERY_SBY/SBY_2013_FIX"),
    SBY2014 = ui.import && ui.import("SBY2014", "table", {
      "id": "users/rasendriyaramanda/BOUNDERY_SBY/SBY_2014_FIX"
    }) || ee.FeatureCollection("users/rasendriyaramanda/BOUNDERY_SBY/SBY_2014_FIX"),
    SBY2015 = ui.import && ui.import("SBY2015", "table", {
      "id": "users/rasendriyaramanda/BOUNDERY_SBY/SBY_2015_FIX_MERGE_FIX_BGT_MERGE"
    }) || ee.FeatureCollection("users/rasendriyaramanda/BOUNDERY_SBY/SBY_2015_FIX_MERGE_FIX_BGT_MERGE"),
    SBY2016 = ui.import && ui.import("SBY2016", "table", {
      "id": "users/rasendriyaramanda/BOUNDERY_SBY/SBY_2016_FIX"
    }) || ee.FeatureCollection("users/rasendriyaramanda/BOUNDERY_SBY/SBY_2016_FIX"),
    SBY2017 = ui.import && ui.import("SBY2017", "table", {
      "id": "users/rasendriyaramanda/BOUNDERY_SBY/SBY_2017_FIX"
    }) || ee.FeatureCollection("users/rasendriyaramanda/BOUNDERY_SBY/SBY_2017_FIX"),
    SBY2018 = ui.import && ui.import("SBY2018", "table", {
      "id": "users/rasendriyaramanda/BOUNDERY_SBY/SBY_2018_FIX_2"
    }) || ee.FeatureCollection("users/rasendriyaramanda/BOUNDERY_SBY/SBY_2018_FIX_2"),
    SBY2019 = ui.import && ui.import("SBY2019", "table", {
      "id": "users/rasendriyaramanda/BOUNDERY_SBY/SBY_2019_FIX_2"
    }) || ee.FeatureCollection("users/rasendriyaramanda/BOUNDERY_SBY/SBY_2019_FIX_2"),
    SBY2020 = ui.import && ui.import("SBY2020", "table", {
      "id": "users/rasendriyaramanda/BOUNDERY_SBY/SBY_2020_FIX_2"
    }) || ee.FeatureCollection("users/rasendriyaramanda/BOUNDERY_SBY/SBY_2020_FIX_2");
//==========================================================================================
//Tugas Akhir Rasendriya Ramanda Darettamarlan (03311740000087)
//Judul : Prediksi Kebutuhan Ruang Terbuka Hijau Untuk Mengurangi Efek Urban Heat Island (UHI) di Kota Surabaya Pada Tahun 2021 – 2025
//Klasifikasi Citra Kelas Vegetasi dan Non-Vegetasi Tahun 2013 - 2020
//==========================================================================================
//-------------------------------------------------------------------------------------------
//Menampilkan citra asli
var image1_2013 = ee.Image('LANDSAT/LC08/C01/T1_SR/LC08_118065_20130914').clip(SBY2013);
var image1_2014 = ee.Image('LANDSAT/LC08/C01/T1_SR/LC08_118065_20140901').clip(SBY2014);
var image1_2015 = ee.Image('LANDSAT/LC08/C01/T1_SR/LC08_118065_20150616').clip(SBY2015);
var image1_2016 = ee.Image('LANDSAT/LC08/C01/T1_SR/LC08_118065_20160821').clip(SBY2016);
var image1_2017 = ee.Image('LANDSAT/LC08/C01/T1_SR/LC08_118065_20170909').clip(SBY2017);
var image1_2018 = ee.Image('LANDSAT/LC08/C01/T1_SR/LC08_118065_20180928').clip(SBY2018);
var image1_2019 = ee.Image('LANDSAT/LC08/C01/T1_SR/LC08_118065_20190713').clip(SBY2019);
var image1_2020 = ee.Image('LANDSAT/LC08/C01/T1_SR/LC08_118065_20201003').clip(SBY2020);
//Map.addLayer(image1_2013, vizParams2,'Citra Asli 2013');
//Map.addLayer(image1_2014, vizParams2,'Citra Asli 2014');
//Map.addLayer(image1_2015, vizParams2,'Citra Asli 2015');
//Map.addLayer(image1_2016, vizParams2,'Citra Asli 2016');
//Map.addLayer(image1_2017, vizParams2,'Citra Asli 2017');
//Map.addLayer(image1_2018, vizParams2,'Citra Asli 2018');
//Map.addLayer(image1_2019, vizParams2,'Citra Asli 2019');
//Map.addLayer(image1_2020, vizParams2,'Citra Asli 2020');
//==========================================================================================
//Palette
var palette1 = [
  'D3D3D3', // umum2013 (0)  // grey
  '008000', //  vegetasi2013 (1) // green
  ];
var vizParams2 = {
bands: ['B4', 'B3', 'B2'],
min: 0,
max: 3000,
gamma: 1.4,
};
//CLip Hasil
var classified_2013 = classified2013.clip(SBY2013);
var classified_2014 = classified2014.clip(SBY2014);
var classified_2015 = classified2015.clip(SBY2015);
var classified_2016 = classified2016.clip(SBY2016);
var classified_2017 = classified2017.clip(SBY2017);
var classified_2018 = classified2018.clip(SBY2018);
var classified_2019 = classified2019.clip(SBY2019);
var classified_2020 = classified2020.clip(SBY2020);
//Menampilkan hasil 
Map.centerObject(classified2013,12);
Map.addLayer(classified_2013, palette1, 'Klasikasi Tahun 2013');
Map.addLayer(classified_2014, palette1, 'Klasikasi Tahun 2014');
Map.addLayer(classified_2015, palette1, 'Klasikasi Tahun 2015');
Map.addLayer(classified_2016, palette1, 'Klasikasi Tahun 2016');
Map.addLayer(classified_2017, palette1, 'Klasikasi Tahun 2017');
Map.addLayer(classified_2018, palette1, 'Klasikasi Tahun 2018');
Map.addLayer(classified_2019, palette1, 'Klasikasi Tahun 2019');
Map.addLayer(classified_2020, palette1, 'Klasikasi Tahun 2020');
//==========================================================================================
//Widget
// Definisikan palet untuk mewarnai klasifikasi.
var palette1 = [
  'D3D3D3', // umum2013 (0)  // grey
  '008000', //  vegetasi2013 (1) // green
];
// Make left and right maps.
var leftMap = ui.Map();
var rightMap = ui.Map();
// Make predefined data layers that can be selected.
var Img2013 = ui.Map.Layer(classified_2013.clip(SBY2013), palette1);
var Img2014 = ui.Map.Layer(classified_2014.clip(SBY2014), palette1);
var Img2015 = ui.Map.Layer(classified_2015.clip(SBY2015), palette1);
var Img2016 = ui.Map.Layer(classified_2016.clip(SBY2016), palette1);
var Img2017 = ui.Map.Layer(classified_2017.clip(SBY2017), palette1);
var Img2018 = ui.Map.Layer(classified_2018.clip(SBY2018), palette1);
var Img2019 = ui.Map.Layer(classified_2019.clip(SBY2019), palette1);
var Img2020 = ui.Map.Layer(classified_2020.clip(SBY2020), palette1);
var Img2013_real = ui.Map.Layer(image1_2013.clip(SBY2013).visualize(vizParams2));
var Img2014_real = ui.Map.Layer(image1_2014.clip(SBY2014).visualize(vizParams2));
var Img2015_real = ui.Map.Layer(image1_2015.clip(SBY2015).visualize(vizParams2));
var Img2016_real = ui.Map.Layer(image1_2016.clip(SBY2016).visualize(vizParams2));
var Img2017_real = ui.Map.Layer(image1_2017.clip(SBY2017).visualize(vizParams2));
var Img2018_real = ui.Map.Layer(image1_2018.clip(SBY2018).visualize(vizParams2));
var Img2019_real = ui.Map.Layer(image1_2019.clip(SBY2019).visualize(vizParams2));
var Img2020_real = ui.Map.Layer(image1_2020.clip(SBY2020).visualize(vizParams2));
// Add default layers to maps.
leftMap.add(Img2013);
rightMap.add(Img2020);
// Link the maps
var linkedMaps = ui.Map.Linker([leftMap, rightMap]);
// Create a SplitPanel which holds the linked maps side-by-side.
var splitPanel = ui.SplitPanel({
  firstPanel: linkedMaps.get(0),
  secondPanel: linkedMaps.get(1),
  orientation: 'horizontal',
  wipe: true,
  style: {stretch: 'both'}
});
// Make a list of image layers to select from.
var layers = ['Citra 2013','Citra 2014','Citra 2015','Citra 2016','Citra 2017','Citra 2018','Citra 2019','Citra 2020','Klasifikasi 2013', 'Klasifikasi 2014', 'Klasifikasi 2015', 'Klasifikasi 2016', 'Klasifikasi 2017', 'Klasifikasi 2018','Klasifikasi 2019','Klasifikasi 2020'];
// Make a function that will retrieve a layer based on selection.
function getLayer(selection) {
  var layer = Img2013;
  if(selection == 'Klasifikasi 2013') {
    layer = Img2013;
  }else if(selection == 'Klasifikasi 2014'){
    layer = Img2014;
  }else if(selection == 'Klasifikasi 2015'){
    layer = Img2015;
  }else if(selection == 'Klasifikasi 2016'){
    layer = Img2016;
  }else if(selection == 'Klasifikasi 2017'){
    layer = Img2017;
  }else if(selection == 'Klasifikasi 2018'){
    layer = Img2018;
  } else if(selection == 'Klasifikasi 2019'){
    layer = Img2019;
  } else if(selection == 'Klasifikasi 2020'){
    layer = Img2020;
  }else if(selection == 'Citra 2013'){
    layer = Img2013_real;
  }else if(selection == 'Citra 2014'){
    layer = Img2014_real;
  }else if(selection == 'Citra 2015'){
    layer = Img2015_real;
  }else if(selection == 'Citra 2016'){
    layer = Img2016_real;
  }else if(selection == 'Citra 2017'){
    layer = Img2017_real;
  }else if(selection == 'Citra 2018'){
    layer = Img2018_real;
  }else if(selection == 'Citra 2019'){
    layer = Img2019_real;
  }else if(selection == 'Citra 2020'){
    layer = Img2020_real;
}
  return layer;
}
// Make a callback function for when a selection is made for left map.
function selectLeftOnChange(selection) {
  leftMap.layers().set(0, getLayer(selection));
}
// Make a callback function for when a selection is made for right map.
function selectRightOnChange(selection) {
  rightMap.layers().set(0, getLayer(selection));
}
// Define selection buttons for left and right map layers.
var selectLeft = ui.Select(layers, 'Klasifikasi 2013', 'Klasifikasi 2013', selectLeftOnChange, false, {position: 'top-left'});
var selectRight = ui.Select(layers, 'Klasifikasi 2020', 'Klasifikasi 2020', selectRightOnChange, false, {position: 'top-right'});
// Clear the root, add the splitPanel, and buttons.
ui.root.clear();
ui.root.add(splitPanel);
leftMap.add(selectLeft);
rightMap.add(selectRight);
leftMap.centerObject(SBY2020, 12);
//==========================================================================================
// LEGENDA
// Mengatur posisi panel
var legend = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px'
  }});
// Membentuk judul legenda
var legendTitle = ui.Label({
  value: 'Hasil Klasifikasi',
  style: {fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }});
// Menambahkan judul di panel
legend.add(legendTitle);
// Menentukan dan mengatur style untuk 1 baris legenda
var makeRow = function(color, name) {
      // Membuat label dengan kotak berwarna
      var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
          // Mengatur tinggi dan lebar kotak
          padding: '8px',
          margin: '0 0 4px 0'
        }});
      // Membuat label dengan isi teks deskripsi
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}
      });
      // kembali mengatur panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      })};
//  Membuat pallete dengan warna-warna berbeda
var palette =['D3D3D3','008000'];
 //'blue', 'white', 'green','44c9f1' , '1637f1','ffffff'
// Keterangan dari legenda
var names = ['Non Vegetasi','Vegetasi'];
// Menambahkan warna dan nama
for (var i = 0; i < 2; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
rightMap.add(legend);
//==========================================================================================
// MENAMPILKAN LUASAN
//Button untuk melihat luas wilayah vegetasi dan non vegetasi
// Membuat button 1
var buttonVegetasi = ui.Button({
  label: 'Luas Wilayah Vegetasi dan Non-Vegetasi',
  style: {padding: '0px 10px', stretch: 'horizontal'},
  onClick: function (){
  leftMap.add(panel);
  panel.add(mapDesc2);
  panel.add(chart3);
  panel.add(chart);
  panel.add(chart2);
}});
// Membuat button 2
var buttonGambar = ui.Button({
  label: 'Data Hasil Klasifikasi',
  style: {padding: '0px 10px', stretch: 'horizontal'},
  onClick: function (){
  leftMap.add(panel);
  panel.add(mapDesc2);
  panel.add(gambar);
}});
//Membuat chart
//-------------------------------------------------------------------------------------------
//Chart Luas Keseluruhan
var dataTable3 = {
  cols: [{id: 'name', label: 'Tahun', type: 'string'},
         {id: 'year', label: 'Luas Wilayah Keseluruhan', type: 'number'}],
  rows: [{c: [{v: '2013'}, {v: 33989.31}]},
         {c: [{v: '2014'}, {v: 34022.25}]},
         {c: [{v: '2015'}, {v: 34023.69}]},
         {c: [{v: '2016'}, {v: 34033.5}]},
         {c: [{v: '2017'}, {v: 34034.04}]},
         {c: [{v: '2018'}, {v: 34034.22}]},
         {c: [{v: '2019'}, {v: 34080.93}]},
         {c: [{v: '2020'}, {v: 34101.72}]}]
};
// Define a dictionary of customization options.
var options3 = {
  title: 'Grafik Luas Wilayah Keseluruhan Kota Surabaya Tahun 2013 - 2020',
  textAlign:'Centre',
  vAxis: {title: 'Tahun'},
  legend: {position: 'none'},
  hAxis: {
    title: 'Luas Wilayah Keseluruhan (Hektar)',
    logScale: false
  }
};
// Make a BarChart from the table and the options.
var chart3 = new ui.Chart(dataTable3, 'BarChart', options3);
//-------------------------------------------------------------------------------------------
//Chart Vegetasi
var dataTable = {
  cols: [{id: 'name', label: 'Tahun', type: 'string'},
         {id: 'year', label: 'Luas Wilayah Vegetasi', type: 'number'}],
  rows: [{c: [{v: '2013'}, {v: 4823.01}]},
         {c: [{v: '2014'}, {v: 5797.80}]},
         {c: [{v: '2015'}, {v: 6928.02}]},
         {c: [{v: '2016'}, {v: 6146.28}]},
         {c: [{v: '2017'}, {v: 4975.20}]},
         {c: [{v: '2018'}, {v: 5721.39}]},
         {c: [{v: '2019'}, {v: 6481.98}]},
         {c: [{v: '2020'}, {v: 6742.62}]}]
};
// Define a dictionary of customization options.
var options = {
  title: 'Grafik Luas Wilayah Vegetasi di Kota Surabaya Tahun 2013 - 2020',
  textAlign:'Centre',
  vAxis: {title: 'Tahun'},
  legend: {position: 'none'},
  hAxis: {
    title: 'Luas Wilayah Vegetasi (Hektar)',
    logScale: true
  }
};
// Make a BarChart from the table and the options.
var chart = new ui.Chart(dataTable, 'BarChart', options);
// Create a panel to hold the chart.
var panel = ui.Panel();
panel.style().set({
  width: '250px',
  height: '250px',
  textAlign: ('left'),
  position: 'bottom-left'
});
//-------------------------------------------------------------------------------------------
//Chart Non Vegetasi
var dataTable2 = {
  cols: [{id: 'name', label: 'Tahun', type: 'string'},
         {id: 'year', label: 'Luas Wilayah Non-Vegetasi', type: 'number'}],
  rows: [{c: [{v: '2013'}, {v: 29166.30}]},
         {c: [{v: '2014'}, {v: 28224.45}]},
         {c: [{v: '2015'}, {v: 27095.67}]},
         {c: [{v: '2016'}, {v: 27887.22}]},
         {c: [{v: '2017'}, {v: 29058.84}]},
         {c: [{v: '2018'}, {v: 28312.83}]},
         {c: [{v: '2019'}, {v: 27598.95}]},
         {c: [{v: '2020'}, {v: 27359.10}]}]
};
// Define a dictionary of customization options.
var options2 = {
  title: 'Grafik Luas Wilayah Non Vegetasi di Kota Surabaya Tahun 2013 - 2020',
  textAlign:('Centre'),
  vAxis: {title: 'Tahun'},
  legend: {position: 'none'},
  hAxis: {
    title: 'Luas Wilayah Non-Vegetasi (Hektar)',
    logScale: false
  }
};
// Make a BarChart from the table and the options.
var chart2 = new ui.Chart(dataTable2, 'BarChart', options2);
//Membuat panel
//panel utama
var panel3 = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {width: '500px',position: 'bottom-left'}
});
//Membuat tulisan untuk judul dan deskripsi
//judul 
var judul = ui.Label('Selamat Datang!');
judul.style().set('color', 'Blue');
judul.style().set('fontWeight', 'bold');
judul.style().set({
  fontSize: '15px',
  padding: '0px 0px',
});
// Deskripsi 1
var mapDesc = ui.Label('Silahkan klik "Luas Wilayah Vegetasi dan Non Vegetasi" untuk \nmengetahui luasan wilayah hasil klasifikasi vegetasi dan Non \nVegetasi di Kota Surabaya pada tahun 2013-2020', {whiteSpace: 'pre'});
mapDesc.style().set({
  textAlign: 'left',
  fontSize: '13px',
  padding: '0px 0px',
});
//Deskripsi
var mapDesc2 = ui.Label('Silahkan geser kebawah agar dapat \nmelihat lebih banyak data', {whiteSpace: 'pre'});
mapDesc2.style().set({
  textAlign: 'center',
  fontSize: '14px',
  padding: '0px 0px',
});
//Menampilkan panel
leftMap.add(panel3);
panel3.add(judul);
panel3.add(mapDesc);
panel3.add(ui.Panel([buttonVegetasi], 
                  ui.Panel.Layout.flow('horizontal')));