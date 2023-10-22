var bogor = ui.import && ui.import("bogor", "table", {
      "id": "users/rasendriyaramanda/Kal_Sel"
    }) || ee.FeatureCollection("users/rasendriyaramanda/Kal_Sel");
//Mencari citra terbaik yang dipisah dalam range waktu
// Memunculkan satelit yang diinginkan
var l8 = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA');
// Menandai lokasi pencarian data
var spatialFiltered = l8.filterBounds(bogor);
print('spatialFiltered', spatialFiltered);
// Menentukan waktu perekaman data yang diinginkan
var thn2013 = spatialFiltered.filterDate('2013-01-01', '2013-12-31');
var thn2014 = spatialFiltered.filterDate('2014-01-01', '2014-12-31');
var thn2015 = spatialFiltered.filterDate('2015-01-01', '2015-12-31');
var thn2016 = spatialFiltered.filterDate('2016-01-01', '2016-12-31');
var thn2017 = spatialFiltered.filterDate('2017-01-01', '2017-12-31');
var thn2018 = spatialFiltered.filterDate('2018-01-01', '2018-12-31');
var thn2019 = spatialFiltered.filterDate('2019-01-01', '2019-12-31');
var thn2020 = spatialFiltered.filterDate('2020-01-01', '2020-12-31');
var median2013 = thn2013.median();
var median2014 = thn2014.median();
var median2015 = thn2015.median();
var median2016 = thn2016.median();
var median2017 = thn2017.median();
var median2018 = thn2018.median();
var median2019 = thn2019.median();
var median2020 = thn2020.median();
// Tentukan lokasi dan tingkat zoom
Map.centerObject(bogor,12);
//Clipping
var image2013= median2013.clip(bogor);
var image2014= median2014.clip(bogor);
var image2015= median2015.clip(bogor);
var image2016= median2016.clip(bogor);
var image2017= median2017.clip(bogor);
var image2018= median2018.clip(bogor);
var image2019= median2019.clip(bogor);
var image2020= median2020.clip(bogor);
//Menambahkan tampilan pada layar
Map.addLayer(image2013, {bands: ['B6', 'B5', 'B3'], max: [0.3, 0.4, 0.3], gamma: 2}, 'Citra 2013');
Map.addLayer(image2014, {bands: ['B6', 'B5', 'B3'], max: [0.3, 0.4, 0.3], gamma: 2}, 'Citra 2014');
Map.addLayer(image2015, {bands: ['B6', 'B5', 'B3'], max: [0.3, 0.4, 0.3], gamma: 2}, 'Citra 2015');
Map.addLayer(image2016, {bands: ['B6', 'B5', 'B3'], max: [0.3, 0.4, 0.3], gamma: 2}, 'Citra 2016');
Map.addLayer(image2017, {bands: ['B6', 'B5', 'B3'], max: [0.3, 0.4, 0.3], gamma: 2}, 'Citra 2017');
Map.addLayer(image2018, {bands: ['B6', 'B5', 'B3'], max: [0.3, 0.4, 0.3], gamma: 2}, 'Citra 2018');
Map.addLayer(image2019, {bands: ['B6', 'B5', 'B3'], max: [0.3, 0.4, 0.3], gamma: 2}, 'Citra 2019');
Map.addLayer(image2020, {bands: ['B6', 'B5', 'B3'], max: [0.3, 0.4, 0.3], gamma: 2}, 'Citra 2020');
//==========================================================================================
//Menghitung Index
//Menentukan palette warna
var visParams_ndvi = {min: -1.2, max: 1, palette: ['blue', 'white', 'green']};
var visParams_ndwi = {min: 0, max: 1, palette: '44c9f1 , 1637f1'};
var visParams_ndbi = {min: 0, max: 1, palette: 'ffffff'};
//-------------------------------------------------------------------------------------------
//Tahun 2013
//Menghitung NDVI,NDWI,NDBI
var image_ndvi2013 = image2013.normalizedDifference(['B5','B4']);
var image_ndwi2013 = image2013.normalizedDifference(['B3','B5']);
var image_ndbi2013 = image2013.normalizedDifference(['B6','B5']);
//Masked NDWI dan NDBI
var ndwiMasked2013 = image_ndwi2013.updateMask(image_ndwi2013.gte(0.00000000000000001));
var ndbiMasked2013 = image_ndbi2013.updateMask(image_ndbi2013.gte(0.00000000000000001));
// Membuat variabel baru yg sesuai dengan penampilan di layar untuk diexport
var imageNDVI2013 = image_ndvi2013.visualize(visParams_ndvi);
var imageNDWI2013 = ndwiMasked2013.visualize(visParams_ndwi);
var imageNDBI2013 = ndbiMasked2013.visualize(visParams_ndbi);
// Mosaic the visualization layers and display (or export).
var mosaic2013 = ee.ImageCollection([imageNDVI2013, imageNDWI2013, imageNDBI2013]).mosaic();
Map.addLayer(mosaic2013, {}, 'Visualisasi Gabungan Tahun 2013');
//----------------------------------------------------------------------------------------------------------------------
//Tahun 2014
//Menghitung NDVI,NDWI,NDBI
var image_ndvi2014 = image2014.normalizedDifference(['B5','B4']);
var image_ndwi2014 = image2014.normalizedDifference(['B3','B5']);
var image_ndbi2014 = image2014.normalizedDifference(['B6','B5']);
//Masked NDWI dan NDBI
var ndwiMasked2014 = image_ndwi2014.updateMask(image_ndwi2014.gte(0.00000000000000001));
var ndbiMasked2014 = image_ndbi2014.updateMask(image_ndbi2014.gte(0.00000000000000001));
// Membuat variabel baru yg sesuai dengan penampilan di layar untuk diexport
var imageNDVI2014 = image_ndvi2014.visualize(visParams_ndvi);
var imageNDWI2014 = ndwiMasked2014.visualize(visParams_ndwi);
var imageNDBI2014 = ndbiMasked2014.visualize(visParams_ndbi);
// Mosaic the visualization layers and display (or export).
var mosaic2014 = ee.ImageCollection([imageNDVI2014, imageNDWI2014, imageNDBI2014]).mosaic();
Map.addLayer(mosaic2014, {}, 'Visualisasi Gabungan Tahun 2014');
//----------------------------------------------------------------------------------------------------------------------
//Tahun 2015
//Menghitung NDVI,NDWI,NDBI
var image_ndvi2015 = image2015.normalizedDifference(['B5','B4']);
var image_ndwi2015 = image2015.normalizedDifference(['B3','B5']);
var image_ndbi2015 = image2015.normalizedDifference(['B6','B5']);
//Masked NDWI dan NDBI
var ndwiMasked2015 = image_ndwi2015.updateMask(image_ndwi2015.gte(0.00000000000000001));
var ndbiMasked2015 = image_ndbi2015.updateMask(image_ndbi2015.gte(0.00000000000000001));
// Membuat variabel baru yg sesuai dengan penampilan di layar untuk diexport
var imageNDVI2015 = image_ndvi2015.visualize(visParams_ndvi);
var imageNDWI2015 = ndwiMasked2015.visualize(visParams_ndwi);
var imageNDBI2015 = ndbiMasked2015.visualize(visParams_ndbi);
// Mosaic the visualization layers and display (or export).
var mosaic2015 = ee.ImageCollection([imageNDVI2015, imageNDWI2015, imageNDBI2015]).mosaic();
Map.addLayer(mosaic2015, {}, 'Visualisasi Gabungan Tahun 2015');
//-------------------------------------------------------------------------------------------
//Tahun 2016
//Menghitung NDVI,NDWI,NDBI
var image_ndvi2016 = image2016.normalizedDifference(['B5','B4']);
var image_ndwi2016 = image2016.normalizedDifference(['B3','B5']);
var image_ndbi2016 = image2016.normalizedDifference(['B6','B5']);
//Masked NDWI dan NDBI
var ndwiMasked2016 = image_ndwi2016.updateMask(image_ndwi2016.gte(0.00000000000000001));
var ndbiMasked2016 = image_ndbi2016.updateMask(image_ndbi2016.gte(0.00000000000000001));
// Membuat variabel baru yg sesuai dengan penampilan di layar untuk diexport
var imageNDVI2016 = image_ndvi2016.visualize(visParams_ndvi);
var imageNDWI2016 = ndwiMasked2016.visualize(visParams_ndwi);
var imageNDBI2016 = ndbiMasked2016.visualize(visParams_ndbi);
// Mosaic the visualization layers and display (or export).
var mosaic2016 = ee.ImageCollection([imageNDVI2016, imageNDWI2016, imageNDBI2016]).mosaic();
Map.addLayer(mosaic2016, {}, 'Visualisasi Gabungan Tahun 2019');
//----------------------------------------------------------------------------------------------------------------------
//Tahun 2017
//Menghitung NDVI,NDWI,NDBI
var image_ndvi2017 = image2017.normalizedDifference(['B5','B4']);
var image_ndwi2017 = image2017.normalizedDifference(['B3','B5']);
var image_ndbi2017 = image2017.normalizedDifference(['B6','B5']);
//Masked NDWI dan NDBI
var ndwiMasked2017 = image_ndwi2017.updateMask(image_ndwi2017.gte(0.00000000000000001));
var ndbiMasked2017 = image_ndbi2017.updateMask(image_ndbi2017.gte(0.00000000000000001));
// Membuat variabel baru yg sesuai dengan penampilan di layar untuk diexport
var imageNDVI2017 = image_ndvi2017.visualize(visParams_ndvi);
var imageNDWI2017 = ndwiMasked2017.visualize(visParams_ndwi);
var imageNDBI2017 = ndbiMasked2017.visualize(visParams_ndbi);
// Mosaic the visualization layers and display (or export).
var mosaic2017 = ee.ImageCollection([imageNDVI2017, imageNDWI2017, imageNDBI2017]).mosaic();
Map.addLayer(mosaic2017, {}, 'Visualisasi Gabungan Tahun 2017');
//----------------------------------------------------------------------------------------------------------------------
//Tahun 2018
//Menghitung NDVI,NDWI,NDBI
var image_ndvi2018 = image2018.normalizedDifference(['B5','B4']);
var image_ndwi2018 = image2018.normalizedDifference(['B3','B5']);
var image_ndbi2018 = image2018.normalizedDifference(['B6','B5']);
//Masked NDWI dan NDBI
var ndwiMasked2018 = image_ndwi2018.updateMask(image_ndwi2018.gte(0.00000000000000001));
var ndbiMasked2018 = image_ndbi2018.updateMask(image_ndbi2018.gte(0.00000000000000001));
// Membuat variabel baru yg sesuai dengan penampilan di layar untuk diexport
var imageNDVI2018 = image_ndvi2018.visualize(visParams_ndvi);
var imageNDWI2018 = ndwiMasked2018.visualize(visParams_ndwi);
var imageNDBI2018 = ndbiMasked2018.visualize(visParams_ndbi);
// Mosaic the visualization layers and display (or export).
var mosaic2018 = ee.ImageCollection([imageNDVI2018, imageNDWI2018, imageNDBI2018]).mosaic();
Map.addLayer(mosaic2018, {}, 'Visualisasi Gabungan Tahun 2018');
//-------------------------------------------------------------------------------------------
//Tahun 2019
//Menghitung NDVI,NDWI,NDBI
var image_ndvi2019 = image2019.normalizedDifference(['B5','B4']);
var image_ndwi2019 = image2019.normalizedDifference(['B3','B5']);
var image_ndbi2019 = image2019.normalizedDifference(['B6','B5']);
//Masked NDWI dan NDBI
var ndwiMasked2019 = image_ndwi2019.updateMask(image_ndwi2019.gte(0.00000000000000001));
var ndbiMasked2019 = image_ndbi2019.updateMask(image_ndbi2019.gte(0.00000000000000001));
// Membuat variabel baru yg sesuai dengan penampilan di layar untuk diexport
var imageNDVI2019 = image_ndvi2019.visualize(visParams_ndvi);
var imageNDWI2019 = ndwiMasked2019.visualize(visParams_ndwi);
var imageNDBI2019 = ndbiMasked2019.visualize(visParams_ndbi);
// Mosaic the visualization layers and display (or export).
var mosaic2019 = ee.ImageCollection([imageNDVI2019, imageNDWI2019, imageNDBI2019]).mosaic();
Map.addLayer(mosaic2019, {}, 'Visualisasi Gabungan Tahun 2019');
//-------------------------------------------------------------------------------------------
//Tahun 2020
//Menghitung NDVI,NDWI,NDBI
var image_ndvi2020 = image2020.normalizedDifference(['B5','B4']);
var image_ndwi2020 = image2020.normalizedDifference(['B3','B5']);
var image_ndbi2020 = image2020.normalizedDifference(['B6','B5']);
//Masked NDWI dan NDBI
var ndwiMasked2020 = image_ndwi2020.updateMask(image_ndwi2020.gte(0.00000000000000001));
var ndbiMasked2020 = image_ndbi2020.updateMask(image_ndbi2020.gte(0.00000000000000001));
// Membuat variabel baru yg sesuai dengan penampilan di layar untuk diexport
var imageNDVI2020 = image_ndvi2020.visualize(visParams_ndvi);
var imageNDWI2020 = ndwiMasked2020.visualize(visParams_ndwi);
var imageNDBI2020 = ndbiMasked2020.visualize(visParams_ndbi);
// Mosaic the visualization layers and display (or export).
var mosaic2020 = ee.ImageCollection([imageNDVI2020, imageNDWI2020, imageNDBI2020]).mosaic();
Map.addLayer(mosaic2020, {}, 'Visualisasi Gabungan Tahun 2020');
//==========================================================================================
//Widget
// Definisikan palet untuk mewarnai klasifikasi.
var palette1 = [
  'FFFFFF', // Permukiman (0)  // white
  '008000', //  vegetasi (1) // green
  '44c9f1', // perairan // blue
  ];
// Make left and right maps.
var leftMap = ui.Map();
var rightMap = ui.Map();
// Make predefined data layers that can be selected.
var Img2013 = ui.Map.Layer(mosaic2013);
var Img2014 = ui.Map.Layer(mosaic2014);
var Img2015 = ui.Map.Layer(mosaic2015);
var Img2016 = ui.Map.Layer(mosaic2016);
var Img2017 = ui.Map.Layer(mosaic2017);
var Img2018 = ui.Map.Layer(mosaic2018);
var Img2019 = ui.Map.Layer(mosaic2019);
var Img2020 = ui.Map.Layer(mosaic2020);
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
var layers = ['Tahun 2013', 'Tahun 2014', 'Tahun 2015', 'Tahun 2016', 'Tahun 2017', 'Tahun 2018','Tahun 2019','Tahun 2020'];
// Make a function that will retrieve a layer based on selection.
function getLayer(selection) {
  var layer = Img2013;
  if(selection == 'Tahun 2016') {
    layer = Img2016;
  } else if(selection == 'Tahun 2019'){
    layer = Img2019;
  }else if(selection == 'Tahun 2013'){
    layer = Img2013;
  }else if(selection == 'Tahun 2014'){
    layer = Img2014;
  }else if(selection == 'Tahun 2015'){
    layer = Img2015;
  }else if(selection == 'Tahun 2017'){
    layer = Img2017;
  }else if(selection == 'Tahun 2018'){
    layer = Img2018;
  }else if(selection == 'Tahun 2020'){
    layer = Img2020;
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
var selectLeft = ui.Select(layers, 'Tahun 2013', 'Tahun 2013', selectLeftOnChange, false, {position: 'top-left'});
var selectRight = ui.Select(layers, 'Tahun 2020', 'Tahun 2020', selectRightOnChange, false, {position: 'top-right'});
// Clear the root, add the splitPanel, and buttons.
ui.root.clear();
ui.root.add(splitPanel);
leftMap.add(selectLeft);
rightMap.add(selectRight);
leftMap.centerObject(bogor, 12);
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
  value: 'Hasil Klasifikasi Land Use',
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
var palette =['FFFFFF','008000','44c9f1'];
 //'blue', 'white', 'green','44c9f1' , '1637f1','ffffff'
// Keterangan dari legenda
var names = ['Permukiman','Vegetasi','Perairan'];
// Menambahkan warna dan nama
for (var i = 0; i < 3; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
rightMap.add(legend);
//Membuat tulisan untuk judul dan deskripsi
//panel utama
var panel3 = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {width: '400px',position: 'bottom-left'}
});
//judul 
var judul = ui.Label('Selamat Datang!');
judul.style().set('color', 'Blue');
judul.style().set('fontWeight', 'bold');
judul.style().set({
  fontSize: '15px',
  padding: '0px 0px',
});
// Deskripsi 1
var mapDesc = ui.Label('Berikut merupakan hasil klasifikasi land use untuk wilayah\nKalimantan Selatan pada Tahun 2013-2020',{whiteSpace: 'pre'});
 mapDesc.style().set({
  textAlign: 'left',
  fontSize: '13px',
  padding: '0px 0px',
});
//Deskripsi
var mapDesc2 = ui.Label('Dibuat Oleh Rasendriya Ramanda D.', {whiteSpace: 'pre'});
mapDesc2.style().set({
  textAlign: 'center',
  fontSize: '14px',
  padding: '0px 0px',
});
//Menampilkan panel
leftMap.add(panel3);
panel3.add(judul);
panel3.add(mapDesc);
panel3.add(mapDesc2);