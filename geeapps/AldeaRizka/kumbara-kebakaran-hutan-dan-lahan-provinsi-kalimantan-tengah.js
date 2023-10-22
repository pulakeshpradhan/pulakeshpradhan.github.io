var Kalteng = ui.import && ui.import("Kalteng", "table", {
      "id": "users/AldeaRizka/MonitoringHotspot/Kalteng"
    }) || ee.FeatureCollection("users/AldeaRizka/MonitoringHotspot/Kalteng");
//=====================================================================================================
//      INVENTARISASI KEBAKARAN HUTAN DAN LAHAN PROVINSI KALIMANTAN TENGAH TAHUN 2014 HINGGA 20121
//=====================================================================================================
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::ju:::::::::::::::::::::
//====================================================================================================
//                                   PENGAMBILAN DATA DAN PRE-PROSESING
//****************************************************************************************************
//----------------------------------------------------------------------------------------------------
// Mengambil landsa8 t1 toa pada area of interest
var imageL8 = ee.ImageCollection("LANDSAT/LC08/C01/T1_TOA")
              .filterBounds (Kalteng);
// Visualisasi Boundaries Kalimantan
Map.addLayer(Kalteng, {color: 'grey'}, 'Admin Kalimantan Tengah');
// Menentukan tahun perekaman
var startYear = 2014; 
var endYear = 2021; 
// Mendefinisikan tanggal waktu perekaman yang digunakan
var startdate=ee.Date.fromYMD(startYear,01,01);
var enddate=ee.Date.fromYMD(endYear,12,31);
// Membuat fungsi untuk cloud masking 
var mask_L8 = function(image) {
  var qa = image.select('BQA');
    var mask = qa.bitwiseAnd(1 << 4).eq(0);
  return mask;
};
//====================================================================================================
//                                     PENGOLAHAN LAHAN TERBAKAR (NBR)
//****************************************************************************************************
//----------------------------------------------------------------------------------------------------
// Membuat function band math NBR dan 
// Memasukan fungsi cloud masking
var NBRcollection = imageL8
  .map(function(image) {
    return image
      .select([]).addBands(
        image.normalizedDifference(['B5','B7'])
      )
    .updateMask(mask_L8(image))
    .rename('NBR');
});
// Melakukan filter tanggal perekaman pada NBRcollection
// Melakukan reducer median pada NBR
// Melakukan clipping pada batas admin Kalteng
var NBR = NBRcollection.filterDate(startdate, enddate)
    .median()
    .select('NBR')
    .clip(Kalteng);
print('NBR Collection', NBRcollection.first());
// Visualisasi NBR
var NBRVis = {
  bands: 'NBR',
  min: -0.251, max: 0.660, 
  zoom: 7,
  palette:  '#a41fd6, #ff641b, #ffaf38, #fff70b, #0ae042, #acbe4d, #7a8737'
};
Map.addLayer(NBR, NBRVis, 'NBR');
Map.centerObject(Kalteng,7);
//====================================================================================================
//                       PENGOLAHAN LAHAN TERBAKAR PRE-FIRE DAN POST-FIRE (dNBR)
//****************************************************************************************************
//----------------------------------------------------------------------------------------------------
// Mengatur Tanggal Perekaman-------------------------------------------------------------------------
// Menentukan tanggal perekaman sebelum terjadi kebakaran 
// (pre-fire) dan setelah terjadi kebakaran (post-fire)
//* Tahun 2015
// Sebelum terjadi kebakaran (pre-fire) 2015
var prefire_start_2015 = '2015-01-01';   
var prefire_end_2015 = '2015-04-30';
// Sesudah terjadi kebakaran (post-fire) 2015
var postfire_start_2015 = '2015-05-01';
var postfire_end_2015 = '2015-11-05';
//* Tahun 2019
// Sebelum terjadi kebakaran (pre-fire) 2019
var prefire_start_2019 = '2018-11-01';   
var prefire_end_2019 = '2019-03-30';
// Sesudah terjadi kebakaran (post-fire) 2019
var postfire_start_2019 = '2019-04-01';
var postfire_end_2019 = '2019-11-30';
//* Tahun 2021
// Sebelum terjadi kebakaran (pre-fire) 2021
var prefire_start_2021 = '2021-01-01';   
var prefire_end_2021 = '2021-04-30';
// Sesudah terjadi kebakaran (post-fire) 2021
var postfire_start_2021 = '2021-05-01';
var postfire_end_2021 = '2021-12-31';
// Pre-Prosessing Citra -------------------------------------------------------------------------
var ImCol = 'LANDSAT/LC08/C01/T1_TOA';
var pl = 'Landsat 8';
var imagery = ee.ImageCollection(ImCol);
// 2015_Filter tanggal perekaman dan filterbound 
var prefireImCol_2015 = ee.ImageCollection(imagery
    .filterDate(prefire_start_2015, prefire_end_2015)
    .filterBounds(Kalteng));
var postfireImCol_2015 = ee.ImageCollection(imagery
    .filterDate(postfire_start_2015, postfire_end_2015)
    .filterBounds(Kalteng));
// 2019_Filter tanggal perekaman dan filterbound
var prefireImCol_2019 = ee.ImageCollection(imagery
    .filterDate(prefire_start_2019, prefire_end_2019)
    .filterBounds(Kalteng));
var postfireImCol_2019 = ee.ImageCollection(imagery
    .filterDate(postfire_start_2019, postfire_end_2019)
    .filterBounds(Kalteng));
// 2021_Filter tanggal perekaman dan filterbound
var prefireImCol_2021 = ee.ImageCollection(imagery
    .filterDate(prefire_start_2021, prefire_end_2021)
    .filterBounds(Kalteng));
var postfireImCol_2021 = ee.ImageCollection(imagery
    .filterDate(postfire_start_2021, postfire_end_2021)
    .filterBounds(Kalteng));
// Tambahkan image collection pada consol
print("Pre-fire Image Collection 2015: ", prefireImCol_2015); 
print("Post-fire Image Collection 2015: ", postfireImCol_2015);
print("Pre-fire Image Collection 2019: ", prefireImCol_2019); 
print("Post-fire Image Collection 2019: ", postfireImCol_2019);
print("Pre-fire Image Collection 2021: ", prefireImCol_2021); 
print("Post-fire Image Collection 2021: ", postfireImCol_2021);
// Mengatur Cloud Masking-------------------------------------------------------------------------
// Function Cloud Masking
function maskL8 (image) {
  var cloudsBitMask = 1 << 4;
  var qa = image.select('BQA');
  var mask = qa.bitwiseAnd(cloudsBitMask).eq(0);
  return image.updateMask(mask)
      .select("B[0-9]*")
      .copyProperties(image, ["system:time_start"]);
}
// 2015_Apply Cloud Masking
var prefire_CM_ImCol_2015 = prefireImCol_2015.map(maskL8);
var postfire_CM_ImCol_2015 = postfireImCol_2015.map(maskL8);
// 2019_Apply Cloud Masking
var prefire_CM_ImCol_2019 = prefireImCol_2019.map(maskL8);
var postfire_CM_ImCol_2019 = postfireImCol_2019.map(maskL8);
// 2021_Apply Cloud Masking
var prefire_CM_ImCol_2021 = prefireImCol_2021.map(maskL8);
var postfire_CM_ImCol_2021 = postfireImCol_2021.map(maskL8);
// Mosaic dan clip citra pada batas kajian -----------------------------------------------------------
//2015
var pre_mos_2015 = prefireImCol_2015.mosaic().clip(Kalteng);
var post_mos_2015 = postfireImCol_2015.mosaic().clip(Kalteng);
var pre_cm_mos_2015 = prefire_CM_ImCol_2015.mosaic().clip(Kalteng);
var post_cm_mos_2015 = postfire_CM_ImCol_2015.mosaic().clip(Kalteng);
//2019
var pre_mos_2019 = prefireImCol_2019.mosaic().clip(Kalteng);
var post_mos_2019 = postfireImCol_2019.mosaic().clip(Kalteng);
var pre_cm_mos_2019 = prefire_CM_ImCol_2019.mosaic().clip(Kalteng);
var post_cm_mos_2019 = postfire_CM_ImCol_2019.mosaic().clip(Kalteng);
//2021
var pre_mos_2021 = prefireImCol_2021.mosaic().clip(Kalteng);
var post_mos_2021 = postfireImCol_2021.mosaic().clip(Kalteng);
var pre_cm_mos_2021 = prefire_CM_ImCol_2021.mosaic().clip(Kalteng);
var post_cm_mos_2021 = postfire_CM_ImCol_2021.mosaic().clip(Kalteng);
// Tambahkan true color image pada consol
print("Pre-fire True Color Image 2015: ", pre_mos_2015); 
print("Post-fire True Color Image 2015: ", post_mos_2015);
print("Pre-fire True Color Image 2019: ", pre_mos_2019); 
print("Post-fire True Color Image 2019: ", post_mos_2019);
print("Pre-fire True Color Image 2021: ", pre_mos_2021); 
print("Post-fire True Color Image 2021: ", post_mos_2021);
// Perhitungan NBR for pre- and post-fire images ---------------------------------------------------
// Menghitung NBR = (NIR-SWIR2) / (NIR+SWIR2)
var preNBR_2015 = pre_cm_mos_2015.normalizedDifference(['B5', 'B7']);
var postNBR_2015 = post_cm_mos_2015.normalizedDifference(['B5', 'B7']);
var preNBR_2019 = pre_cm_mos_2019.normalizedDifference(['B5', 'B7']);
var postNBR_2019 = post_cm_mos_2019.normalizedDifference(['B5', 'B7']);
var preNBR_2021 = pre_cm_mos_2021.normalizedDifference(['B5', 'B7']);
var postNBR_2021 = post_cm_mos_2021.normalizedDifference(['B5', 'B7']);
// Perhitungan delta antara pre- and post-fire-------------------------------------------------------
// Hasil delta NBR (dNBR)
var dNBR_unscaled_2015 = preNBR_2015.subtract(postNBR_2015);
var dNBR_unscaled_2019 = preNBR_2019.subtract(postNBR_2019);
var dNBR_unscaled_2021 = preNBR_2021.subtract(postNBR_2021);
// Mengubah skala dNBR sesuai USGS
var dNBR_2015 = dNBR_unscaled_2015.multiply(1000);
var dNBR_2019 = dNBR_unscaled_2019.multiply(1000);
var dNBR_2021 = dNBR_unscaled_2021.multiply(1000);
// Tambahkan citra hasil pengolahan dNBR pada consol
print("Difference Normalized Burn Ratio 2015: ", dNBR_2015);
print("Difference Normalized Burn Ratio 2019: ", dNBR_2019);
print("Difference Normalized Burn Ratio 2021: ", dNBR_2021);
// Visualisasi Hasil Pengolahan-------------------------------------------------------------------------
// Mengatur visualisasi tampilan komposit true color 
var vis = {bands: ['B4', 'B3', 'B2'], min: 0, max: 100, gamma: 1.5};
// Menampilkan tampilan citra komposit true color
Map.addLayer(pre_cm_mos_2015, vis,'Pre-fire True Color Image 2015- Clouds masked');
Map.addLayer(post_cm_mos_2015, vis,'Post-fire True Color Image 2015- Clouds masked');
Map.addLayer(pre_cm_mos_2019, vis,'Pre-fire True Color Image 2019- Clouds masked');
Map.addLayer(post_cm_mos_2019, vis,'Post-fire True Color Image 2019- Clouds masked');
Map.addLayer(pre_cm_mos_2021, vis,'Pre-fire True Color Image 2021- Clouds masked');
Map.addLayer(post_cm_mos_2021, vis,'Post-fire True Color Image 2021- Clouds masked');
// Burn Ratio Product - Greyscale -------------------------------------------------------------------------
var grey = ['white', 'black'];
// Remove comment-symbols (//) below to display pre- and post-fire NBR seperately
//Map.addLayer(preNBR_2015, {min: -1, max: 1, palette: grey}, 'Prefire Normalized Burn Ratio 2015');
//Map.addLayer(postNBR_2015, {min: -1, max: 1, palette: grey}, 'Postfire Normalized Burn Ratio 2015');
//Map.addLayer(preNBR_2015, {min: -1, max: 1, palette: grey}, 'Prefire Normalized Burn Ratio 2019');
//Map.addLayer(postNBR_2015, {min: -1, max: 1, palette: grey}, 'Postfire Normalized Burn Ratio 2019');
Map.addLayer(dNBR_2015, {min: -1000, max: 1000, palette: grey}, 'dNBR greyscale 2015');
Map.addLayer(dNBR_2019, {min: -1000, max: 1000, palette: grey}, 'dNBR greyscale 2019');
Map.addLayer(dNBR_2021, {min: -1000, max: 1000, palette: grey}, 'dNBR greyscale 2021');
// Burn Ratio Product - Classification ---------------------------------------------------------------------
// Mengatur SLD style discrete intervals
var sld_intervals =
  '<RasterSymbolizer>' +
    '<ColorMap type="intervals" extended="false" >' +
      '<ColorMapEntry color="#ffffff" quantity="-500" label="-500"/>' +
      '<ColorMapEntry color="#7a8737" quantity="-250" label="-250" />' +
      '<ColorMapEntry color="#acbe4d" quantity="-100" label="-100" />' +
      '<ColorMapEntry color="#0ae042" quantity="100" label="100" />' +
      '<ColorMapEntry color="#fff70b" quantity="270" label="270" />' +
      '<ColorMapEntry color="#ffaf38" quantity="440" label="440" />' +
      '<ColorMapEntry color="#ff641b" quantity="660" label="660" />' +
      '<ColorMapEntry color="#a41fd6" quantity="2000" label="2000" />' +
    '</ColorMap>' +
  '</RasterSymbolizer>';
// Visualisasi image dengan hasil discrete interval
Map.addLayer(dNBR_2015.sldStyle(sld_intervals), {}, 'dNBR classified 2015');
Map.addLayer(dNBR_2019.sldStyle(sld_intervals), {}, 'dNBR classified 2019');
Map.addLayer(dNBR_2021.sldStyle(sld_intervals), {}, 'dNBR classified 2021');
// Memisahkan hasil berdasarkan klasifikasinya
var thresholds = ee.Image([-1000, -251, -101, 99, 269, 439, 659, 2000]);
var classified_2015 = dNBR_2015.lt(thresholds).reduce('sum').toInt();
var classified_2019 = dNBR_2019.lt(thresholds).reduce('sum').toInt();
var classified_2021 = dNBR_2021.lt(thresholds).reduce('sum').toInt();
// Mengatur Statistik Hasil NBR -------------------------------------------------------------------------
// Tahun 2015**************//
// Menghitung jumlah pixel keseluruhan
var allpix_2015 =  classified_2015.updateMask(classified_2015);  // masking seluruh layar
var pixstats_2015 = allpix_2015.reduceRegion({
  reducer: ee.Reducer.count(),     // hitung pixel pada single image
  geometry: Kalteng,
  scale: 10000
  });
var allpixels_2015 = ee.Number(pixstats_2015.get('sum')); // ekstrak jumlah pixel dalam angka
// Membuat daftar kosong untuk menyimpan value pada
var arealist_2015 = [];
// Membuat function untuk memperoleh luasan setiap kelas
var areacount_2015 = function(cnr, name) {
 var singleMask_2015 =  classified_2015.updateMask(classified_2015.eq(cnr));  // masking single class
 var stats_2015 = singleMask_2015.reduceRegion({
  reducer: ee.Reducer.count(),               // hitung pixel pada single class
  geometry: Kalteng,
  scale: 10000
  });
var pix_2015 =  ee.Number(stats_2015.get('sum'));
var hect_2015 = pix_2015.multiply(900).divide(10000);                // Landsat pixel = 30m x 30m --> 900 sqm
var perc_2015 = pix_2015.divide(allpixels_2015).multiply(10000).round().divide(100);  
arealist_2015.push({Class: name, Pixels: pix_2015, Hectares: hect_2015, Percentage: perc_2015});
};
// Urutan kelas NBR
var names_2015 = ['Tidak Ada Data', 'High Severity', 'Moderate-high Severity',
'Moderate-low Severity', 'Low Severity','Unburned', 'Enhanced Regrowth, Low', 'Enhanced Regrowth, High'];
// Mengeksekusi fungsi pada setiap kelas
for (var i = 0; i < 8; i++) {
  areacount_2015(i, names_2015[i]);
  }
print('Burned Area by Severity Class 2015', arealist_2015, '--> click list objects for individual classes');
// Tahun 2019**************//
// Menghitung jumlah pixel keseluruhan
var allpix_2019 =  classified_2019.updateMask(classified_2019);   // masking seluruh layar
var pixstats_2019 = allpix_2019.reduceRegion({
  reducer: ee.Reducer.count(),               // hitung pixel pada single class
  geometry: Kalteng,
  scale: 10000
  });
var allpixels_2019 = ee.Number(pixstats_2019.get('sum')); // ekstrak jumlah pixel dalam angka
// Membuat daftar kosong untuk menyimpan value pada
var arealist_2019 = [];
// Membuat function untuk memperoleh luasan setiap kelas
var areacount_2019 = function(cnr, name) {
 var singleMask_2019 =  classified_2019.updateMask(classified_2019.eq(cnr)); // masking single class
 var stats_2019 = singleMask_2019.reduceRegion({
  reducer: ee.Reducer.count(),                // hitung pixel pada single class
  geometry: Kalteng,
  scale: 10000
  });
var pix_2019 =  ee.Number(stats_2019.get('sum'));
var hect_2019 = pix_2019.multiply(900).divide(10000);                // Landsat pixel = 30m x 30m --> 900 sqm
var perc_2019 = pix_2019.divide(allpixels_2019).multiply(10000).round().divide(100);   
arealist_2019.push({Class: name, Pixels: pix_2019, Hectares: hect_2019, Percentage: perc_2019});
};
// Urutan kelas NBR
var names_2019 = ['Tidak Ada Data', 'High Severity', 'Moderate-high Severity',
'Moderate-low Severity', 'Low Severity','Unburned', 'Enhanced Regrowth, Low', 'Enhanced Regrowth, High'];
// Mengeksekusi fungsi pada setiap kelas
for (var i = 0; i < 8; i++) {
  areacount_2019(i, names_2019[i]);
  }
print('Burned Area by Severity Class 2019', arealist_2019, '--> click list objects for individual classes');
// Tahun 2021**************//
// Menghitung jumlah pixel keseluruhan
var allpix_2021 =  classified_2021.updateMask(classified_2021);  // masking seluruh layar
var pixstats_2021 = allpix_2021.reduceRegion({
  reducer: ee.Reducer.count(),     // hitung pixel pada single image
  geometry: Kalteng,
  scale: 10000
  });
var allpixels_2021 = ee.Number(pixstats_2021.get('sum')); // ekstrak jumlah pixel dalam angka
// Membuat daftar kosong untuk menyimpan value pada
var arealist_2021 = [];
// Membuat function untuk memperoleh luasan setiap kelas
var areacount_2021 = function(cnr, name) {
 var singleMask_2021 =  classified_2021.updateMask(classified_2021.eq(cnr));  // masking single class
 var stats_2021 = singleMask_2021.reduceRegion({
  reducer: ee.Reducer.count(),               // hitung pixel pada single class
  geometry: Kalteng,
  scale: 10000
  });
var pix_2021 =  ee.Number(stats_2021.get('sum'));
var hect_2021 = pix_2021. multiply(900).divide(10000);                // Landsat pixel = 30m x 30m --> 900 sqm
var perc_2021 = pix_2021.divide(allpixels_2021).multiply(10000).round().divide(100);  
arealist_2021.push({Class: name, Pixels: pix_2021, Hectares: hect_2021, Percentage: perc_2021});
};
// Urutan kelas NBR
var names_2021 = ['Tidak Ada Data', 'High Severity', 'Moderate-high Severity',
'Moderate-low Severity', 'Low Severity','Unburned', 'Enhanced Regrowth, Low', 'Enhanced Regrowth, High'];
// Mengeksekusi fungsi pada setiap kelas
for (var i = 0; i < 8; i++) {
  areacount_2021(i, names_2021[i]);
  }
print('Burned Area by Severity Class 2021', arealist_2021, '--> click list objects for individual classes');
//====================================================================================================
//                                          PENGOLAHAN TITIK HOTSPOT
//****************************************************************************************************
//----------------------------------------------------------------------------------------------------
// Mengatur boundaries pada batas admin dengan fungsi clip
var clipKalteng = function(image){
  return image.clip(Kalteng);
 };
// Mendefinisikan Imagecollection FIRMS
// dan input tanggal perekaman dan boundaries-nya
var FIRMS = ee.ImageCollection('FIRMS')
            .filterBounds(Kalteng)
            .filterDate(startdate,enddate).map(clipKalteng);
//****************************************************************************************************
// 1 Pengolahan band T21 -----------------------------------------------------------------------------
// Variabel baru dengan memilih band T21
var T21 = FIRMS.select('T21');
print ('Titik Hotspot T21', T21);
// Pengubahan suhu T21 kelvin ke celcius
var toCelcius = function(FIRMS){
  var time = FIRMS.get('system:time_start');
  var celsius = FIRMS.subtract(273.15) // from kelvin to C
                   .set('system:time_start',time);
  return celsius;
};
var T21Celcius = FIRMS.map(toCelcius); //imagecollection FIRMS diinput fungsi celcius
var T21toCelcius = T21.map(toCelcius); //variabel band T21 diinput fungsi celsius
print('Titik Hotspot T21 Celcius', T21Celcius);
// Visualisasi Titik Hotspot T21
var firesVis_T21 = {
  min: 20.0,
  max: 100.0,
  zoom: 7,
  palette: ['#ff0000', '#ff6600', '#ffff00'],
};
Map.addLayer(T21toCelcius, firesVis_T21, 'Hotspot_T21');
Map.centerObject(Kalteng);
//****************************************************************************************************
// 2 Pengolahan band Confidence -----------------------------------------------------------------------
// Variabel baru dengan memilih band confidence
var Confidence = FIRMS.select('confidence');
print('Titik Hotspot Confidence', Confidence);
// Visualisasi Titik Hotspot confidence
// Tingkat kepercayaan 0%-100%
var firesVis = {
  min: 0.0,
  max: 100.0,
  zoom: 7,
  palette: ['#ff0000', '#ff6600', '#ffff00'],
};
Map.addLayer(Confidence, firesVis, 'Titik Hotspot Confidence Level');
Map.centerObject(Kalteng);
//====================================================================================================
//                                     JUMLAH SEBARAN TITIK HOTSPOT
//****************************************************************************************************
//----------------------------------------------------------------------------------------------------
// Menambah band baru dan membuat fungsi terhadap line number dan confidence
var COUNT = function(image) {
  var line_number = image.select('line_number');
  var confidence = image.select('confidence');
  var band_count = line_number.updateMask(confidence).rename('count');
  return image.addBands(band_count);
};
var titikApi = FIRMS.map(COUNT);
// Penjumlahkan Titik Hotspot (individual image)
var countIndividualImg = function(image) {
  var countObject = image.reduceRegion({
    reducer: ee.Reducer.countDistinct(),
    scale: 1000,
    geometry: Kalteng
  });
  return image.set(countObject);
};
var jumlah_hotspot_ind = titikApi.map(countIndividualImg);
print('fire_ind_count', jumlah_hotspot_ind);
print('Total Titik Hotspot', jumlah_hotspot_ind.aggregate_sum('count'));
// Export FeatureCollection.
Export.table.toDrive({
  collection: jumlah_hotspot_ind,
  description: 'Titik Hotspot',
  fileFormat: 'CSV',
});
//====================================================================================================
//                                     KONFIGURASI LAYER PETA
//****************************************************************************************************
//----------------------------------------------------------------------------------------------------
// Menentukan layer peta dan visualisasinya pada panel
var layerNBR = {
 'Lahan Terbakar': {
   value: NBR,
   name: 'NBR',
   visParams: {
     min: -0.251, max: 0.660, zoom : 7,
     palette: ['#7a8737, #acbe4d, #0ae042, #fff70b, #ffaf38, #ff641b, #a41fd6, #ffffff']},
   legend: [
    {'Pertumbuhan kembali paska kebakaran tinggi (enhanced Regrowth, High)' : '7a8737'}, 
    {'Pertumbuhan kembali paska kebakaran rendah (enhanced Regrowth, Low)' : 'acbe4d'},
    {'Tidak terbakar (unburned)' : '0ae042'}, 
    {'Rendah (low severity)' : 'fff70b'},
    {'Sedang - rendah (moderate low severity)' : 'ffaf38'},
    {'Sedang - tinggi (moderate high severity)' : 'ff641b'},
    {'Tinggi (high severity)' : 'a41fd6'},
    {'NA' : 'ffffff'},
    ],
    defaultVisibility: true
 },
}; 
var layerHotspot = {
  'Titik Hotspot Brightness Temperature T21 (Celcius)': {
    value: T21toCelcius,
    name: 'T21Celcius',
    visParams: {
      min: 20.0, max: 100.0, zoom: 7,
      palette: ['#ff0000', '#ff6600', '#ffff00']},
    legend: [
    {'Tinggi' : 'red'}, {'Sedang' : 'orange'}, {'Rendah' : 'Yellow'}
    ] 
  },
  'Titik Hotspot Confidence Level (0% - 100%)': {
    value: Confidence,
    name: 'Confidence',
    visParams: {
      min: 0.0, max: 100.0, zoom: 7,
      palette: ['#ff0000', '#ff6600', '#ffff00']},
    legend: [
    {'Tinggi (80% ≤ C < 100%)' : '#ff0000'}, {'Sedang (30% ≤ C < 80%)' : '#ff6600'}, {'Rendah (0% ≤ C < 30%)' : '#ffff00'}
    ] 
  },
};
//====================================================================================================
//                                            DISPLAY PETA
//****************************************************************************************************
//----------------------------------------------------------------------------------------------------
// 1. Font & Style ----------------------------------------------------------------------------------
// Mengatur font dan style pada label display peta
var colors = {'transparent': '#11ffee00', 'gray': '#F8F9FA'};
var TITLE_STYLE = {
  fontFamily: 'sans-serif',
  fontWeight: '550',
  fontSize: '32px',
  padding: '3px 2px 4px 6px',
  color: '#004c77',
  backgroundColor: colors.transparent,
};
var SUBTITLE_STYLE = {
  fontFamily: 'sans-serif',
  fontWeight: '550',
  fontSize: '20px',
  padding: '0 0 2px 6px',
  color: '#004c77',
  backgroundColor: colors.transparent,
};
var PARAGRAPH_STYLE = {
  fontFamily: 'sans-serif',
  fontSize: '15px',
  fontWeight: '200',
  padding: '0 0 0 6px',
  textAlign: 'justify',
};
var BUTTON_STYLE = {
  fontFamily: 'sans-serif',
  fontSize: '14px',
  fontWeight: '100',
  color: '#0d0d0d',
  padding: '8px',
  backgroundColor: colors.transparent,
};
var SELECT_STYLE = {
  fontFamily: 'sans-serif',
  fontSize: '14px',
  fontWeight: '50',
  color: '#0d0d0d',
  padding: '8px',
  backgroundColor: colors.transparent,
  width: '80px'
};
var LABEL_STYLE = {
  fontFamily: 'sans-serif',
  fontWeight: '50',
  textAlign: 'center',
  fontSize: '14px',
  padding: '2px',
  backgroundColor: colors.transparent,
};
var LEGEND_STYLE = {
  fontFamily: 'sans-serif',
  fontWeight: '600',
  fontSize: '11px',
  padding: '0 0 0 8px',
  margin: '0 0 8px 0',
  backgroundColor: colors.transparent,
};
var LIST_STYLE = {
  fontFamily: 'sans-serif',
  fontWeight: '600',
  fontSize: '15px',
  padding: '8px',
  margin: '8px',
  backgroundColor: colors.transparent,
};
var TITLE_NOTE_STYLE = {
  fontFamily: 'sans-serif',
  fontWeight: '600',
  fontSize: '14px',
  margin: '0 0 10px 5px',
  padding: '0 2px 0 2px',
  backgroundColor: 'red',
};
var SUBTITLE_NOTE_STYLE = {
  fontFamily: 'sans-serif',
  fontWeight: 'bold',
  fontSize: '12px',
  padding: '0 2px 0 2px',
  margin: '4px 0 0 5px',
  color: '#004c77',
};
var NOTE_STYLE = {
  fontFamily: 'sans-serif',
  fontSize: '11px',
  margin: '4px 5px 5px 7px',
  padding: '0 3px 0 5px',
  textAlign: 'justify',
};
var NOTE_TOOL_STYLE = {
  fontFamily: 'sans-serif',
  fontSize: '11px',
  padding: '0 0 0 8px',
  textAlign: 'justify',
};
var UNI_NOTE_STYLE = {
  fontFamily: 'sans-serif',
  fontSize: '11px',
  fontWeight: 'bold',
  margin: '2px 0 2px 0',
  textAlign: 'center',
};
//***************************************************************************************
// 2. Root Panel-------------------------------------------------------------------------
// Membuat panel peta (ui.Map)
// Menambahkan style pada peta
var mapPanel = ui.Map({
    center: {'lat': -1.361105, 'lon': 113.380408, 'zoom': 7}
  });
  // Mengatur cursor pada peta 'crosshair'
  // Menentukan jenis peta 'HYBRID'
  mapPanel.style().set({cursor:'crosshair'});
  mapPanel.setOptions('HYBRID');
// Set a custom basemap style and default to the satellite map type.
var styles = {
  'Soft Blue': [
    {
      featureType: 'all',
      stylers: [
        { saturation: -80 }
      ]
    },{
      featureType: 'road.arterial',
      elementType: 'geometry',
      stylers: [
        { hue: '#00ffee' },
        { saturation: 50 }
      ]
    },{
      featureType: 'poi.business',
      elementType: 'labels',
      stylers: [
        { visibility: 'off' }
      ]
    }
  ]
};
mapPanel.setOptions('satellite', styles);
// Mengatur Set Control Visibility
mapPanel.setControlVisibility(
    {all: false, scaleControl: true, fullscreenControl: true, mapTypeControl: true, layerList: true });
// Menampilkan layer peta pada mapPanel
//mapPanel.layers().set(0, ui.Map.Layer(Kalteng, {color: 'grey'}, 'Admin Kalimantan Tengah')); 
//mapPanel.layers().set(1, ui.Map.Layer(NBR.select(['NBR']), NBRVis, 'Lahan Terbakar')); 
// Menambahkan panel-panel pada aplikasi, mapPanel; infoPanel; sidePanel
// infoPanel berisi penjelasan informasi pada peta
var infoPanel = ui.Panel({
    layout: ui.Panel.Layout.flow(), 
    style: {
      position: 'top-right',
      stretch: 'horizontal',
      height: '100%',
      width: '345px',
    }
});
// Di dalam infoPanel, terbagi menjadi beberapa panel seperti 
// "toolPanel", "graphPanel", dan "catatanPanel" - tidak perlu ditambahkan ke root
var toolPanel = ui.Panel({style: {backgroundColor: colors.transparent}}); 
var graphPanel = ui.Panel({style: {backgroundColor: colors.transparent}});
var catatanPanel = ui.Panel({style: {backgroundColor: colors.transparent}});
//********************************************************************************************
// 3. Introduksi Panel-------------------------------------------------------------------------
// Menentukan judul aplikasi
infoPanel.add(ui.Label(
  'Kumbara: Inventarisasi Kebakaran Hutan dan Lahan Provinsi Kalimantan Tengah Tahun 2014 - 2021', TITLE_STYLE));
// Menentukan deskripsi aplikasi
var app_description = ui.Panel([
  ui.Label('Aplikasi yang bertujuan untuk memvisualisasikan tingkat keparahan kebakaran lahan dengan menggunakan ' +
           'metode Normalized Burn Ratio (NBR) dan Difference Normalized Burn Ratio (dNBR) ' +
           ' pada hasil pengolahan pada citra Landsat 8 OLI dan tingkat potensi ' +
           'kebakaran lahan menggunakan titik hotspot Fire Information for Resource Management System (FIRMS) ' +
           'pada hasil proses import citra MODIS.', PARAGRAPH_STYLE),
  ui.Label('Aplikasi ini berfungsi sebagai upaya edukasi dan mitigasi pencegahan pada kebakaran lahan dan hutan ' +
           'secara timeseries di Provinsi Kalimantan Tengah pada tahun 2014 hingga 2021.', PARAGRAPH_STYLE),
  ui.Label('(Perhatian)', {fontSize: '15px', fontWeight: 'bold', margin: '12px 0 0 12px',}),
  ui.Label('Hasil pengolahan bersifat indikatif dan tidak 100% menyerupai kondisi di lapangan, sehingga tidak bisa dijadikan acuan.', {fontFamily: 'sans-serif', fontSize: '15px', 
          fontWeight: '200', padding: '0 0 0 6px', textAlign: 'justify'})
]);  
infoPanel.add(app_description);
//*********************************************************************************************
// 4. Tool-tool Panel
// Layer map titik hotspot dan lahan terbakar//
infoPanel.add(toolPanel);
var garisPanel= ui.Label('___________________________________________________', {margin: '0 0 5px 0', color: '#004c77'});
toolPanel.add(garisPanel);
toolPanel.add(ui.Label('Pilih Layer Peta',SUBTITLE_STYLE));
// Mengatur button Administrasi Kalimantan Tengah
var adminTitle = ui.Label('1) Batas Administrasi Kalimantan Tengah',{fontSize: '13px',fontWeight: 'bold', padding: '2px 0 0 8px', color: '#005180'});
var ButtonAdmin = ui.Button({
  label: 'Batas Kalimantan Tengah',
  onClick: function() {
    mapPanel.addLayer(Kalteng, {color: 'grey'}, 'Batas Admin Kalimantan Tengah')},
  style: {
    width: '200px',
    margin: '2px 8px 8px 8px',
    padding: '0 20px 0 8px',
    textAlign: 'center',
  }});
toolPanel.add(adminTitle);
toolPanel.add(ButtonAdmin);
//****************************************************************************************************
// a. Tool Lahan Terbakar----------------------------------------------------------------------------
// Mengatur button Lahan Terbakar
var lahanTerbakar = ui.Panel();
var NBRTitle = ui.Label('2) Layer Lahan Terbakar',{fontSize: '13px',fontWeight: 'bold', padding: '2px 0 0 8px', color: '#005180'});
var ButtonNBR = ui.Button({
  label: 'Lahan Terbakar Timeseries',
  onClick: function() {
    mapPanel.addLayer(NBR, NBRVis, 'Lahan Terbakar Timeseries')},
  style: {
    width: '180px',
    margin: '0 0 8px 8px',
    padding: '0 0 8px 8px',
  }
});
lahanTerbakar.add(NBRTitle);
lahanTerbakar.add(ButtonNBR);
// Mengatur button dNBR 2015 --------------------------------------------------------------------------
var dNBRTitle_2015 = ui.Label('a) Lahan Terbakar dNBR tahun 2015', {fontSize: '13px', padding: '0 0 0 8px', margin: '0 0 0 8px'});
var notedNBR_2015 = ui.Label('Hasil dNBR pada pre-fire (Januari - April 2015)' +
                             ' dan post-fire (Mei - November 2015) ', NOTE_TOOL_STYLE);
var ButtondNBR_2015 = ui.Button({
  label: '- dNBR Tahun 2015 -',
  onClick: function() {
    mapPanel.addLayer(dNBR_2015.sldStyle(sld_intervals), {},'dNBR Tahun 2015')},
  style: {
    width: '180px',
    margin: '0 0 8px 8px',
    padding: '0 0 8px 8px',
  }
});
lahanTerbakar.add(dNBRTitle_2015);
lahanTerbakar.add(notedNBR_2015);
lahanTerbakar.add(ButtondNBR_2015);
// Mengatur button dNBR 2019 --------------------------------------------------------------------------
var dNBRTitle_2019 = ui.Label('b) Lahan Terbakar dNBR tahun 2019',{fontSize: '13px', padding: '0 0 0 8px', margin: '0 0 0 8px'});
var notedNBR_2019 = ui.Label('Hasil dNBR pada pre-fire (November 2018 - Maret 2019)' +
                             ' dan post-fire (April - November 2019) ', NOTE_TOOL_STYLE);
var ButtondNBR_2019 = ui.Button({
  label: '- dNBR Tahun 2019 -',
  onClick: function() {
    mapPanel.addLayer(dNBR_2019.sldStyle(sld_intervals), {},'dNBR Tahun 2019')},
  style: {
    width: '180px',
    margin: '0 0 8px 8px',
    padding: '0 0 8px 8px',
  }
});
lahanTerbakar.add(dNBRTitle_2019);
lahanTerbakar.add(notedNBR_2019);
lahanTerbakar.add(ButtondNBR_2019);
// Mengatur button dNBR 2021 --------------------------------------------------------------------------
var dNBRTitle_2021 = ui.Label('c) Lahan Terbakar dNBR tahun 2021', {fontSize: '13px', padding: '0 0 0 8px', margin: '0 0 0 8px'});
var notedNBR_2021 = ui.Label('Hasil dNBR pada pre-fire (Januari - April 2021)' +
                             ' dan post-fire (Mei - Desember 2021) ', NOTE_TOOL_STYLE);
var ButtondNBR_2021 = ui.Button({
  label: '- dNBR Tahun 2021 -',
  onClick: function() {
    mapPanel.addLayer(dNBR_2021.sldStyle(sld_intervals), {},'dNBR Tahun 2021')},
  style: {
    width: '180px',
    margin: '0 0 8px 8px',
    padding: '0 0 8px 8px',
  }
});
lahanTerbakar.add(dNBRTitle_2021);
lahanTerbakar.add(notedNBR_2021);
lahanTerbakar.add(ButtondNBR_2021);
// Membuat legenda lahan terbakar-------------------------------------------------------------------------
// Membuat panel legenda
var legendaLT = ui.Panel({
  style:
      {fontWeight: '600', fontSize: '10px', margin: '0 0 8px 0', padding: '0 0 0 8px'}
});
lahanTerbakar.add(legendaLT);
var legendaTitle = ui.Label(
    'Kelas NBR dan dNBR', LEGEND_STYLE);
legendaLT.add(legendaTitle);
var makeRow = function(color,name) {
      // Membuat label yang sebenarnya colorbox
      var colorBox = ui.Label({
        style: {
          backgroundColor: color,
          // Mengatur padding dan margin pada colorbox.
          padding: '8px',
          margin: '0 0 2px 10px'
        }
      });
      // Membuat label pada deskripsi legenda
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 2px 8px'}
      });
      // Memasukkan kembali widget pada panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
//  Memberikan palette warna pada colorbox
var palette =['#7a8737','#acbe4d', '#0ae042', '#fff70b', '#ffaf38', '#ff641b', '#a41fd6','#ffffff'];
// Memberi nama pada deskripsi legenda
var names = [
  'Pertumbuhan Kembali Paska Kebakaran Tinggi',
  'Pertumbuhan Kembali Paska Kebakaran Rendah',
  'Tidak Terbakar (Unburned)',
  'Rendah (Low Severity)',
  'Sedang - Rendah (Moderate Low Severity)',
  'Sedang - Tinggi (Moderate High Severity)',
  'Tinggi (High Severity)',
  'Tidak Ada Data (NA)'
  ];
// Kombinasikan palette dengan nama legenda
for (var i = 0; i < 8; i++) {
  legendaLT.add(makeRow(palette[i], names[i]));
  }  
toolPanel.add(lahanTerbakar);
//****************************************************************************************************
// b. Tool Titik Hotspot
// Mengatur button titik hotspot band T21-------------------------------------------------------------
var titikHotspot = ui.Panel();
var hotspotTitle = ui.Label('3) Layer Titik Hotspot',{fontSize: '13px',fontWeight: 'bold', padding: '2px 0 0 8px', color: '#005180'});
var T21Tittle = ui.Label('a) Titik Hotspot Brightness Temperature T21',{fontSize: '13px', padding: '2px 0 2px 8px', margin: '0 0 0 8px'});
var noteT21 =  ui.Label(' Titik Hotspot band T21 (celcius) merupakan band brightness temperature yang' +
                        ' menunjukkan suhu kecerahan pada titik nyala api yang terekam.',  NOTE_TOOL_STYLE);
var button_T21Tittle = ui.Button({
  label: 'Band T21 (Brightness Temperature)',
  onClick: function() {
    mapPanel.addLayer(T21toCelcius, firesVis_T21,'Titik Hotspot Band T21')},
  style: {
    width: '200px',
    margin: '0 0 8px 8px',
    padding: '2px 0 6px 8px',
  }, 
});
titikHotspot.add(hotspotTitle);
titikHotspot.add(T21Tittle);
titikHotspot.add(noteT21);
titikHotspot.add(button_T21Tittle);
// Membuat legenda Hotspot T21-------------------------------------------------------------------------
// Membuat panel legenda
var legendaT21 = ui.Panel({
  style:
      {fontWeight: '600', fontSize: '10px', margin: '0 0 8px 0', padding: '0 0 0 8px'}
});
titikHotspot.add(legendaT21);
var legendaT21_Title = ui.Label(
    'Kelas Brigthness Temperature', LEGEND_STYLE);
legendaT21.add(legendaT21_Title);
var makeRow_T21 = function(color,name) {
      // Membuat label yang sebenarnya colorbox
      var colorBoxT21 = ui.Label({
        style: {
          backgroundColor: color,
          // Mengatur padding dan margin pada colorbox.
          padding: '8px',
          margin: '0 0 2px 10px'
        }
      });
      // Membuat label pada deskripsi legenda
      var descriptionT21 = ui.Label({
        value: name,
        style: {margin: '0 0 2px 8px'}
      });
      // Memasukkan kembali widget pada panel
      return ui.Panel({
        widgets: [colorBoxT21, descriptionT21],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
//  Memberikan palette warna pada colorbox
var paletteT21 =['#ffff00','#ff9900', '#ff0000'];
// Memberi nama pada deskripsi legenda
var namesT21 = [
  'Rendah',
  'Sedang',
  'Tinggi',
  ];
// Kombinasikan palette dengan nama legenda
for (var i = 0; i < 3; i++) {
  legendaT21.add(makeRow_T21(paletteT21[i], namesT21[i]));
  }  
// Mengatur button titik hotspot band confidence level-------------------------------------------------------------
var CLTittle = ui.Label('b) Titik Hotspot Confidence Level (0% - 100%)',{fontSize: '13px', padding: '5px 0 2px 8px', margin: '0 0 0 8px'});
var noteCL =  ui.Label('Titik Hotspot band confidence level menunjukkan level kepercayaan pada titik hotspot yang terekam' +
                        ' apakah benar-benar terjadi di lapangan.', NOTE_STYLE);
var button_CLTittle = ui.Button({
  label: 'Band Confidence Level',
  onClick: function() {
    mapPanel.addLayer(Confidence, firesVis,'Titik Hotspot Confidence Level')},
  style: {
    width: '200px',
    margin: '0 0 8px 8px',
    padding: '3px 0 6px 8px',
  }, 
});
titikHotspot.add(CLTittle);
titikHotspot.add(noteCL);
titikHotspot.add(button_CLTittle);
// Membuat legenda Hotspot T21-------------------------------------------------------------------------
// Membuat panel legenda
var legendaCL = ui.Panel({
  style:
      {fontWeight: '600', fontSize: '10px', margin: '0 0 8px 0', padding: '0 0 0 8px'}
});
titikHotspot.add(legendaCL);
var legendaCL_Title = ui.Label(
    'Kelas Confidence Level', LEGEND_STYLE);
legendaCL.add(legendaCL_Title);
var makeRow_CL = function(color,name) {
      // Membuat label yang sebenarnya colorbox
      var colorBoxCL = ui.Label({
        style: {
          backgroundColor: color,
          // Mengatur padding dan margin pada colorbox.
          padding: '8px',
          margin: '0 0 2px 10px'
        }
      });
      // Membuat label pada deskripsi legenda
      var descriptionCL = ui.Label({
        value: name,
        style: {margin: '0 0 2px 8px'}
      });
        // Memasukkan kembali widget pada panel
      return ui.Panel({
        widgets: [colorBoxCL, descriptionCL],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
//  Memberikan palette warna pada colorbox
var paletteCL =['#ffff00','#ff9900', '#ff0000'];
// Memberi nama pada deskripsi legenda
var namesCL = [
  'Rendah (0% ≤ C < 30%)',
  'Sedang (30% ≤ C < 80%)',
  'Tinggi (80% ≤ C < 100%)',
  ];
// Kombinasikan palette dengan nama legenda
for (var i = 0; i < 3; i++) {
  legendaCL.add(makeRow_CL(paletteCL[i], namesCL[i]));
  }  
toolPanel.add(titikHotspot);
//====================================================================================================
//                                        BUTTON RUN & CLEAR
//****************************************************************************************************
//----------------------------------------------------------------------------------------------------
// Membuat panel untuk mengisikan button
var buttonHold = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {
    backgroundColor: colors.transparent, 
    textAlign: 'center', 
    padding: '15px 0 15px 170px'}});
infoPanel.add(buttonHold);
var clearButton = ui.Button({
  label: 'Clear map', 
  style: {
    width: '125px', 
    maxWidth: '250px', 
    color: '#616161',
    border: '4px solid red',
    textDecoration: 'underline'
  }});
buttonHold.add(clearButton);
var garisTool= ui.Label('____________________________________________________', {margin: '0 0 5px 0', color: '#004c77'});
infoPanel.add(garisTool);
//---------------------------------------------------------------------------------------------------
// Mengatur clear button
var clearMap = clearButton.onClick(function() {
  var layers = mapPanel.layers();
  layers.forEach(function(x) {
    mapPanel.remove(x);
  });
});
//====================================================================================================
//                                             PANEL GRAFIK
//****************************************************************************************************
//----------------------------------------------------------------------------------------------------
// Grafik drop panel
var grafikButton = ui.Button({label: 'Grafik Nilai Rata-rata NBR dan Titik Hotspot >>', style:{stretch: 'horizontal', color:'black'}});
grafikButton.onClick(function(){
  if(graphPanel.style().get('shown')){
    grafikButton.setLabel('Grafik Nilai Rata-rata NBR dan Titik Hotspot >>');
    graphPanel.style().set('shown', false);
  } else{
    grafikButton.setLabel('Grafik Nilai Rata-rata NBR dan Titik Hotspot <<');
    graphPanel.style().set('shown', true);
    luasButton.setLabel('Luas Area Kebakaran >>');
    luasPanel.style().set('shown', false);
    catatanButton.setLabel('Catatan Aplikasi >>');
    catatanPanel.style().set('shown', false);
  }
});
var graphPanel = ui.Panel(null, null, {stretch: 'horizontal', shown: false});
// Membuat pengaturan panel grafik
infoPanel.add(grafikButton);
infoPanel.add(graphPanel);
var NBRMean = ui.Panel();
var titleNBRMean = ui.Label('1. Grafik Nilai Rata-rata NBR Tahun 2014 - 2021', LIST_STYLE);
graphPanel.add(titleNBRMean);
//****************************************************************************************************
// 1 Grafik NBR
// Menentukan dan memproses tanggal perekaman pada grafik
// Menghitung jumlah bulan untuk diproses
var nMonths = ee.Number(enddate.difference(startdate,'month')).round();
// Membuat fungsi grafik NBR berdasarkan list tanggal perekaman
var byMonth = ee.ImageCollection(
  // Membuat map list setiap bulannya
  ee.List.sequence(0,nMonths).map(function (n) {
    // mengkalkulasi startdate
    var awal = startdate.advance(n,'month');
    // Membuat tanggal baru sesuai tanggal yang ditentukan (advance)
    var akhir = awal.advance(1,'month');
    // filter dan reduce pada fungsi return
    return NBRcollection.filterDate(awal,akhir)
                .select('NBR')
                .median()
                .set('system:time_start', awal);
}));
// Plotting grafik timeseries
var Grafik_Ratarata_NBR = 
  ui.Chart.image.series({
    imageCollection: byMonth,
    region: Kalteng,
    reducer: ee.Reducer.mean(),
    scale: 1000}).setOptions({
      title: 'Grafik Nilai Rata-rata NBR Provinsi Kalimantan Tengah Tahun 2014 - 2021',
      pointSize: 2,
      hAxis: {
        title: 'Tanggal Perekaman', 
        titleTextStyle: {italic: false, bold: true}},
      vAxis: {
         title: ' NBR (Threshold)',
         titleTextStyle: {italic: false, bold: true}
    }});
NBRMean.add(Grafik_Ratarata_NBR);
graphPanel.add(NBRMean);
//****************************************************************************************************
// 2 Grafik Titik Hotspot
var THmean = ui.Panel();
var titleTHMean = ui.Label('2. Grafik Nilai Rata-rata Titik Hotspot Band T21 dan Band Confidence Level Tahun 2014 - 2021', LIST_STYLE);
graphPanel.add(titleTHMean);
// Menentukan variabel list tanggal perekaman tahunan 
var year_list = ee.List.sequence(startYear, endYear);
// Membuat rata-rata tahunan pada band T21 dan confidence
var collection =  ee.ImageCollection.fromImages(year_list.map(function(ynz){
  // Band T21
  var T21_year = T21Celcius.filter(ee.Filter.calendarRange(ynz, ynz, 'year')).mean();
  // Band Confidence
  var img = Confidence.filter(ee.Filter.calendarRange(ynz, ynz, 'year')).mean();
  // Menambahkan band 'time'
  var time = ee.Image(ee.Date.fromYMD(ynz,8,1).millis()).divide(1e18).toFloat().rename('time');
  // return kedua band dan mengatur tanggalnya
  return img.addBands([T21_year, time]).set('year', ynz).set('month', 8)
              .set('date', ee.Date.fromYMD(ynz,8,1))
              .set('system:time_start',ee.Date.fromYMD(ynz,8,1));
}).flatten());
//*** Pembuatan grafik
var Hotspot = ui.Chart.image.series({imageCollection: collection.select(['T21', 'confidence']),
                                                  region:Kalteng, 
                                                  reducer: ee.Reducer.mean(),
                                                  scale: 1000
}).setOptions({
    title: "Grafik Titik Hotspot Band T21 Celcius dan Band Confidence Level Provinsi Kalimantan Tengah Tahun 2014-2021", 
    pointSize: 3,
    legend: {maxLines: 5, position: 'top'},
    series: {
          0: {targetAxisIndex: 0},
          1: {targetAxisIndex: 1}
        },
        vAxes: {
          // Menambahkan judul pada axis
          0: {title: 'T21 (Celcius)', titleTextStyle: {italic: false, bold: true}},
          1: {title: 'Confidence (0%-100%)', titleTextStyle: {italic: false, bold: true}}
        },
    trendlines: {
        0: {
          type: 'linear',
          color: 'lightblue',
          lineWidth: 3,
          opacity: 0.7,
          showR2: true,
          visibleInLegend: true
        },
        1: {
          type: 'linear',
          color: 'pink',
          lineWidth: 3,
          opacity: 0.7,
          showR2: true,
          visibleInLegend: true
        }
      },  
});
THmean.add(Hotspot);
graphPanel.add(THmean);
//****************************************************************************************************
// 3 Grafik NBR dan Titik Hotspot(T21)
var GabMean = ui.Panel();
var titleGabMean = ui.Label('3. Grafik Rata-rata Titik Hotspot Band T21 Celcius dan Rata-rata Nilai NBR Provinsi Kalimantan Tengah Tahun 2014-2021', LIST_STYLE);
graphPanel.add(titleGabMean);
// Menentukan variabel list tanggal perekaman tahunan 
var year_list = ee.List.sequence(startYear, endYear);
// Membuat rata-rata tahunan pada titik hotspot band T21 dan NBRcollection
var collection =  ee.ImageCollection.fromImages(year_list.map(function(ynz){
  // Titik hotspot band T21
  var T21_year = T21Celcius.filter(ee.Filter.calendarRange(ynz, ynz, 'year')).mean();
  // NBR collection
  var img = NBRcollection.filter(ee.Filter.calendarRange(ynz, ynz, 'year')).select('NBR').median();
  // Menambahkan band 'time'
  var time = ee.Image(ee.Date.fromYMD(ynz,8,1).millis()).divide(1e18).toFloat().rename('time');
  // return kedua band dan mengatur 'time'
  return img.addBands([T21_year, time]).set('year', ynz).set('month', 8)
              .set('date', ee.Date.fromYMD(ynz,8,1))
              .set('system:time_start',ee.Date.fromYMD(ynz,8,1));
}).flatten());
// Pembuatan grafik
var Gab_chart = ui.Chart.image.series({imageCollection: collection.select(['T21', 'NBR']),
                                                  region:Kalteng, 
                                                  reducer: ee.Reducer.mean(),
                                                  scale: 1000
}).setOptions({
    title: "Grafik Rata-rata Titik Hotspot Band T21 Celcius dan Rata-rata Nilai NBR Provinsi Kalimantan Tengah Tahun 2014-2021", 
    pointSize: 3,
    legend: {maxLines: 5, position: 'top'},
    series: {
          0: {targetAxisIndex: 0},
          1: {targetAxisIndex: 1}
        },
        vAxes: {
          // Adds titles to each axis.
          0: {title: 'NBR (Threshold)', titleTextStyle: {italic: false, bold: true}},
          1: {title: 'T21 (Celcius)', titleTextStyle: {italic: false, bold: true}}
        },
    trendlines: {
        0: {
          type: 'linear',
          color: 'lightblue',
          lineWidth: 3,
          opacity: 0.7,
          showR2: true,
          visibleInLegend: true
        },
        1: {
          type: 'linear',
          color: 'pink',
          lineWidth: 3,
          opacity: 0.7,
          showR2: true,
          visibleInLegend: true
        }
      },  
});
  var garisGrafik = ui.Label('____________________________________________________', {margin: '0 0 5px 0', color: '#004c77'});
GabMean.add(Gab_chart);
graphPanel.add(GabMean);
graphPanel.add(garisGrafik);
//====================================================================================================
//                                            PANEL LUAS KEBAKARAN
//****************************************************************************************************
//----------------------------------------------------------------------------------------------------
// pixel time series panel
var luasButton = ui.Button({label: 'Luas Area Kebakaran >>', style:{stretch: 'horizontal'}});
luasButton.onClick(function(){
  if(luasPanel.style().get('shown')){
    luasButton.setLabel('Luas Area Kebakaran >>');
    luasPanel.style().set('shown', false);
  } else{
    luasButton.setLabel('Luas Area Kebakaran <<');
    luasPanel.style().set('shown', true);
    grafikButton.setLabel('Grafik Nilai Rata-rata NBR dan Titik Hotspot >>');
    graphPanel.style().set('shown', false);
    catatanButton.setLabel('Catatan Aplikasi >>');
    catatanPanel.style().set('shown', false);
  }
});
var luasPanel = ui.Panel(null, null, {stretch: 'horizontal', shown: false, padding: '0px'});
infoPanel.add(luasButton);
infoPanel.add(luasPanel);
var table = ui.Chart(
[
  ['<h2 style = "color: #004c77", "font-size: 300%", "padding: 5px";> Luas Area Kebakaran Provinsi Kalimantan Tengah</h2>'],
  ['<p>Luas area kebakaran pada Provinsi Kalimantan Tengah dilakukan dari hasil proses pengolahan index dNBR (pre-fire dan post-fire) pada tahun 2015, 2019, dan 2021. <p>'],
  ['<a href=https://github.com/aldearizka99/Luas-Kebakaran-dNBR-Kalimantan-Tengah/blob/main/Luas%20Kebakaran.png?raw=true>[Klik Disini] Tautan Luas Area Kebakaran</a>'],
  ['<img src = "https://github.com/aldearizka99/Luas-Kebakaran-dNBR-Kalimantan-Tengah/blob/main/Luas%20Kebakaran.png?raw=true" alt =" Luas Kebakaran" style="width:700px;height:400px;">']],
  'Table', {allowHtml: true});
var areaPanel = ui.Panel([table], 'flow', {width: '320px', height: '220px', textAlign: 'center', padding: '3px'});
var noteLuas = ui.Panel([
  ui.Label('Catatan dan Analisis:', SUBTITLE_NOTE_STYLE),
  ui.Label('• Hasil pengolahan dNBR yang menghasilkan tampilan berbeda di tahun-tahun pembanding dikarenakan proses masking awan' +
           ' citra Landsat 8 OLI yang kurang optimal dan belum merata sehingga jumlah pixelnya juga berbeda.', NOTE_STYLE),
  ui.Label('• Jumlah pixel yang berbeda juga mempengaruhi luas terbakar berdasarkan area (hektar) dan persentasenya', NOTE_STYLE),
  ui.Label('___________________________________________________', {margin: '0 0 5px 0', color: '#004c77'}),
]);
luasPanel.add(areaPanel);
luasPanel.add(noteLuas);
//====================================================================================================
//                                             CATATAN PANEL
//****************************************************************************************************
//----------------------------------------------------------------------------------------------------
// pixel time series panel
var catatanButton = ui.Button({label: 'Catatan Aplikasi >>', style:{stretch: 'horizontal', color:'red'}});
catatanButton.onClick(function(){
  if(catatanPanel.style().get('shown')){
    catatanButton.setLabel('Catatan Aplikasi >>');
    catatanPanel.style().set('shown', false);
  } else{
    catatanButton.setLabel('Catatan Aplikasi <<');
    catatanPanel.style().set('shown', true);
    grafikButton.setLabel('Grafik Nilai Rata-rata NBR dan Titik Hotspot >>');
    graphPanel.style().set('shown', false);
    luasButton.setLabel('Luas Area Kebakaran >>');
    luasPanel.style().set('shown', false);
  }
});
var catatanPanel = ui.Panel(null, null, {stretch: 'horizontal', shown: false, padding: '0px'});
infoPanel.add(catatanButton);
infoPanel.add(catatanPanel);
var notePanel = ui.Panel([
  ui.Label('Data yang digunakan', SUBTITLE_NOTE_STYLE),
  ui.Label('• Pengolahan lahan terbakar dengan menggunakan data citra Landsat 8 OLI (Landsat 8 Collection 1 Tier 1' +
           ' TOA Reflectance) pada band 5 (Near Infrared) dan band 7 (Short Wave Infrared 2).', NOTE_STYLE),
  ui.Label('• Persebaran titik hotspot didapatkan dari proses import data Fire Information for Resource Management System (FIRMS) pada citra MODIS,' +
           ' menggunakan standar MODIS MOD14/MYD14 Fire and Thermal Anomalies product.', NOTE_STYLE),
  ui.Label('• Data-data yang didapatkan diolah secara time-series mulai tanggal 1 Januari 2014 hingga 1 Mei 2021.', NOTE_STYLE),
  ui.Label(''),
  ui.Label('Metode yang digunakan', SUBTITLE_NOTE_STYLE),
  ui.Label('1. Objek Lahan Terbakar', NOTE_STYLE),
  ui.Label('Metode Normalized Burn Ratio (NBR) merupakan index untuk mengetahui tingkat keparahan luka bakar.' +
           ' menggunakan citra Landsat OLI 8 pada band 5 dan band 7.', NOTE_STYLE),
  ui.Label('Citra Landsat 8 OLI telah dilakukan proses filtering dan masking awan untuk meminimalisir tampilan bebas ' +
           ' awan, sehingga dapat diolah menggunakan index NBR.', NOTE_STYLE),
  ui.Label('Hasil index NBR dilakukan proses klasifikasi untuk menunjukkan tingkat keparahan kebakaran berdasarkan threshold (nilai ambang batas)' +
           ' dari <-0.25 hingga >0.66 (merujuk pada GSP pada Humboldt State University).', NOTE_STYLE),
 ui.Label('Index dNBR didapatkan dengan mengolah NBR dengan rentang waktu sebelum terjadi kebakaran (pre-fire) ' +
          ' dan setelah terjadi kebakaran (post-fire) pada tahun 2015 dan 2019.', NOTE_STYLE),           
  ui.Label('2. Pesebaran Titik Hotspot', NOTE_STYLE),
  ui.Label('Persebaran titik hotspot didapatkan dari proses import data Fire Information for Resource Management System' +
           ' (FIRMS) pada citra MODIS dengan menggunakan band T21 dan band confidence level.', NOTE_STYLE),
  ui.Label('• Titik Hotspot band T21 merupakan band brightness temperature yang menunjukkan tingkatan kecerahan' +
           ' suhu pada titik nyala api yang terekam dengan unit satuan Kelvin dan telah diubah ke Celcius.', NOTE_STYLE),
  ui.Label('• Titik Hotspot band confidence level menunjukkan level kepercayaan pada titik hotspot yang terekam benar-' +
           ' benar terjadi di lapangan dengan skala 0% hingga 100%.', NOTE_STYLE),
  ui.Label('')
  ]);
catatanPanel.add(notePanel);
var linkFirms = ui.Label(
   '[Klik Disini] About FIRMS Near Real-Time, Earth Observation Data NASA', {},
   'https://earthdata.nasa.gov/earth-observation-data/near-real-time/firms/about-firms');
var linkNBR = ui.Label(
  '[Klik Disini] Normalized Burn Ratio (NBR) Burn Severity, Office for Outer Space Affairs UN-SPIDER Knowledge Portal', {},
  'https://un-spider.org/advisory-support/recommended-practices/recommended-practice-burn-severity/in-detail/normalized-burn-ratio');
var link = ui.Panel([
      ui.Label('Informasi lebih lanjut mengenai data dan metode', SUBTITLE_NOTE_STYLE)]);
var garisCatatan = ui.Label('____________________________________________________', {margin: '0 0 5px 0', color: '#004c77'});
catatanPanel.add(link);
catatanPanel.add(linkFirms);
catatanPanel.add(linkNBR); 
catatanPanel.add(garisCatatan);
var credit = ui.Panel([
  ui.Label('Credit:', {fontSize: '12px', fontWeight: 'bold', margin: '15px 0 0 6px', color: '#004c77'}),
  ui.Label('Aplikasi ini dibuat sebagai syarat Tugas Akhir oleh Aldea Rizka Novareka.', NOTE_STYLE),
  ui.Label('Apabila terdapat pertanyaan atau saran mengenai platform ini dapat menghubungi aldearizka.vo@gmail.com atau melalui linkedin.com/in/aldearizkan.', NOTE_STYLE),
  ui.Label(''),
  ui.Label(''),
  ui.Label('Program Studi DIII Penginderaan Jauh dan Sistem Informasi Geografi', {
    fontSize: '11px', 
    fontWeight: 'bold', 
    margin: '2px 0 2px 2px',
    textAlign: 'center',
    color: '#004c77'
  }),
  ui.Label('Departemen Teknologi Kebumian', {
    fontSize: '11px', 
    fontWeight: 'bold', 
    margin: '2px 30px 2px 70px',
    textAlign: 'center',
    color: '#004c77'
  }),
  ui.Label('Sekolah Vokasi', {
    fontSize: '11px', 
    fontWeight: 'bold', 
    margin: '2px 0 2px 125px',
    textAlign: 'center',
    color: '#004c77'
  }),
  ui.Label('Universitas Gadjah Mada',{
    fontSize: '11px', 
    fontWeight: 'bold', 
    margin: '2px 0 2px 95px',
    textAlign: 'center',
    color: '#004c77'
  }),
  ui.Label('2021', {
    fontSize: '11px', 
    fontWeight: 'bold', 
    margin: '2px 0 2px 150px',
    textAlign: 'center',
    color: '#004c77'
  }),
  ui.Label('', NOTE_STYLE),
  ui.Label('===============================================',{color: '#004c77'}),
  ui.Label('', NOTE_STYLE),
  ui.Label('', NOTE_STYLE),
  ]);
infoPanel.add(credit);
//====================================================================================================
//                                           NBR INSPECTOR MAP (OnMapClick)
//****************************************************************************************************
//----------------------------------------------------------------------------------------------------
// Create a panel to hold our widgets.
var sidePanel = ui.SplitPanel({
  style: {
    width:   '270px', 
    stretch: 'vertical',
    position: 'bottom-left'},
  orientation: 'vertical'
});
var usingPanel = ui.Panel();
var usingPanelTitle = ui.Label ('Penggunaan Aplikasi', {fontSize: '16px', fontWeight: 'bold', color: '#004c77'});
var linkUsingPanel = ui.Label(
   '[Klik Disini] Tautan Video Tutorial Penggunaan Aplikasi', {},
   'https://youtu.be/d4aybLj26fw');
var usingPanelList = ui.Panel([
    ui.Label('1) Memilih tombol "Batas Admin Kalimantan Tengah" untuk menentukan batas kajian.',{fontSize: '13px',   textAlign: 'justify'}),
    ui.Label('2) Menentukan layer peta yang terdiri dari:',{fontSize: '13px',   textAlign: 'justify'}),
    ui.Label('   a) Lahan Terbakar (hasil pengolahan metode NBR)',{fontSize: '13px', margin: '1px 0 3px 15px',   textAlign: 'justify'}),
    ui.Label('   b) Titik Hotspot',{fontSize: '13px', margin: '2px 0 1px 15px',   textAlign: 'justify'}), 
    ui.Label('      • T21 Celcius (berdasarkan tingkat brightness titik hotspot.',
            {fontSize: '13px', margin: '1px 0 1px 30px',   textAlign: 'justify'}),
    ui.Label('      • Confidence Level (berdasarkan level kepercayaan 0-100% pada titik hotspot.',
            {fontSize: '13px', margin: '1px 0 1px 30px',   textAlign: 'justify'}),
    ui.Label('3) Mengatur tingkat kegelapan pada layer peta.',{fontSize: '13px',   textAlign: 'justify'}),
    ui.Label('4) Klik pada "Clear Map" untuk membersihkan layer peta yang telah dipilih.',
            {fontSize: '13px',   textAlign: 'justify'}),
    ui.Label('5) Panel grafik terdiri dari beberapa grafik timeseries rata-rata NBR, titik hotspot band T21,' +
            ' dan titik hotspot band confidence level.', {fontSize: '13px',   textAlign: 'justify'}),
    ui.Label('6) Menentukan ROI pada NBR Inspector untuk mengetahui titik koordinat ROI dan grafik timeseries ' +
            ' nilai mean NBR di titik tersebut.',{fontSize: '13px',   textAlign: 'justify'}),
    ui.Label('7) Dapat mengatur Map Set Control Visibility seperti tool Zoom Controller, Fullscreen Control, Scale Control, ' +
            ' Map Type Control (Roadmap/Satellit/Hybrid/Terrain).',{fontSize: '13px',   textAlign: 'justify'}),
    ui.Label('8) Proses menunggu loading peta tergantung pada kecepatan jaringan internet.',{fontSize: '13px',   textAlign: 'justify'}),
    ui.Label('____________________________________', {color: '#004c77'})
]); 
usingPanel.add(usingPanelTitle);
usingPanel.add(linkUsingPanel);
usingPanel.add(usingPanelList);
// Membuat panel dan keterangan.
var plotPanel = ui.Panel([
  ui.Label({
    value: 'NBR Inspector',
    style: {
      fontSize: '16px',
      fontWeight: 'bold',
      padding: '8px 0 0 0 ',
      margin: '0px 8px 2px 8px',
      color: '#004c77',
      stretch: 'horizontal'}
  }),
  ui.Label('Klik pada peta untuk menentukan titik ROI dan grafik timeseries NBR.')
]);
sidePanel.setFirstPanel(plotPanel);
sidePanel.setSecondPanel(usingPanel);
// Menambahkan value koordinat longitude dan latitude.
var lon = ui.Label();
var lat = ui.Label();
plotPanel.add(ui.Panel([lon,lat]));
// Memberikan perintah panggilan value ketika diklik pada muka peta
mapPanel.onClick(function(coords) {
  // Update koordinat lon/lat ketika diklik
  lon.setValue('Longitude: ' + coords.lon.toFixed(2)),
  lat.setValue('Latitude: ' + coords.lat.toFixed(2));
  // Menambahkan titik pada muka peta saat diklik
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point, {color: '000000'}, 'Titik ROI');
  mapPanel.layers().set(2, dot);
var NBRChart = 
  ui.Chart.image.series({
    imageCollection: byMonth,
    region: point,
    reducer: ee.Reducer.mean(),
    scale: 10000}).setOptions({
      title: 'Nilai Rata-rata NBR Over Time',
    });
  plotPanel.widgets().set(3, NBRChart);
});
ui.root.insert(0, sidePanel);
//****************************************************************************************************
//----------------------------------------------------------------------------------------------------
// Add these to the interface.
ui.root.clear(); // This is important to do to remove the "normal" GEE map
ui.root.add(ui.SplitPanel(infoPanel, mapPanel)); // order matters!
//ui.root.add(); is where you are adding panels to the EE window 
ui.root.add(sidePanel);