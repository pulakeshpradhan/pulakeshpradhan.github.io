var jakbar = ui.import && ui.import("jakbar", "table", {
      "id": "projects/ee-mohfaisal181099/assets/Tugas_Akhir/Jakarta_Barat"
    }) || ee.FeatureCollection("projects/ee-mohfaisal181099/assets/Tugas_Akhir/Jakarta_Barat"),
    jakpus = ui.import && ui.import("jakpus", "table", {
      "id": "projects/ee-mohfaisal181099/assets/Tugas_Akhir/Jakarta_Pusat"
    }) || ee.FeatureCollection("projects/ee-mohfaisal181099/assets/Tugas_Akhir/Jakarta_Pusat"),
    jaksel = ui.import && ui.import("jaksel", "table", {
      "id": "projects/ee-mohfaisal181099/assets/Tugas_Akhir/Jakarta_Selatan"
    }) || ee.FeatureCollection("projects/ee-mohfaisal181099/assets/Tugas_Akhir/Jakarta_Selatan"),
    jaktim = ui.import && ui.import("jaktim", "table", {
      "id": "projects/ee-mohfaisal181099/assets/Tugas_Akhir/Jakarta_Timur"
    }) || ee.FeatureCollection("projects/ee-mohfaisal181099/assets/Tugas_Akhir/Jakarta_Timur"),
    jakut = ui.import && ui.import("jakut", "table", {
      "id": "projects/ee-mohfaisal181099/assets/Tugas_Akhir/Jakarta_Utara"
    }) || ee.FeatureCollection("projects/ee-mohfaisal181099/assets/Tugas_Akhir/Jakarta_Utara");
//Nama              : Moh.Faisal
//NRP               : 03311840000004
//Jurusan           : Teknik Geomatika - Angkatan 2018 - G20
//Judul Tugas Akhir : Analisis Spasio-temporal Perubahan Nitrogen Dioksida (NO2) 
//                    Selama Kebijakan Pembatasan Sosial COVID-19 
//                    dari Data Citra Sentinel-5P Menggunakan Google Earth Engine
//                    (Studi Kasus: Provinsi DKI Jakarta)
//Laboratorium      : Geospasial / Penginderaan Jauh
//Perubahan Nitrogen Dioksida (NO2) dan Karbon Monoksida di Provinsi DKI Jakarta//
//NO2_column_number_density: Total vertical column of NO2 
//(ratio of the slant column density of NO2 and the total air mass factor)//
//Daerah Provinsi DKI Jakarta Terdapat 5 Kota//
//Menggabungkan seluruh batas administrasi kota DKI Jakarta 
var DKI_Jakarta = jakbar.merge(jakpus).merge(jaksel).merge(jaktim).merge(jakut);
Map.centerObject(DKI_Jakarta,10);
var center = {lon: 106.8283, lat: -6.1805, zoom: 11};
//------------------------------------Januari 2020------------------------------------
var start1 = ee.Date('2020-01-01'); // 01 Januari 2020
var end1 = ee.Date('2020-01-31'); // 31 Januari 2020
//Membuat fungsi konversi satuan mol ke mikromol
function mikromol1(image){
  return image.multiply(1000000)
  .copyProperties(image,['system:time_start']);
}
//Membuat variabel waktu per hari, per bulan, dan per tahun
var ndays1 = ee.Number(end1.difference(start1,'day')).round();
var nmonths1 = ee.Number(end1.difference(start1,'month')).round();
//print(ndays1, 'ndays1');
//print(nmonths1, 'nmonths1');
//------------------------------Memanggil Data Citra------------------------------------//
// mengimpor data citra Sentinel-5P
// memilih Band:"NO2_column_number_density"dengan rentang waktu yang ditentukan pada variabel waktu
var NO2 = ee.ImageCollection("COPERNICUS/S5P/OFFL/L3_NO2")
    .select("NO2_column_number_density")
    .filterDate(start1,end1)
    .filterBounds(DKI_Jakarta);
//print(NO2);
//Mengubah satuan dari mol ke mikromol
var NO2_mikromol1 = NO2.map(mikromol1);
//Menerapkan fungsi harian ke seluruh image
var bydays1 = ee.ImageCollection(
  ee.List.sequence(0,ndays1).map(function(n){
    var startday1 = start1.advance(n,'day');
    var endday1 = startday1.advance(1,'day');
    return NO2_mikromol1.filterDate(startday1,endday1)
              .select(0).max()
              .set('system:time_start',startday1);
  }));
//print(bydays1, 'Januari 2020');
//Menerapkan fungsi bulanan ke seluruh image
var bymonths1 = ee.ImageCollection(
  ee.List.sequence(0,nmonths1).map(function(n){
    var startmonth1 = start1.advance(n,'month');
    var endmonth1 = startmonth1.advance(1,'month');
    return bydays1.filterDate(startmonth1,endmonth1)
                 .select(0).mean()
                 .set('system:time_start',startmonth1);
  }));
//print(bymonths1, 'Januari 2020');
//Membuat grafik spasio temporal data Nitrogen Dioksida maksimum harian
var harian1 = ui.Chart.image.series({
  imageCollection: bydays1,
  region:DKI_Jakarta,
  scale:1000,
  xProperty:'system:time_start'})
  .setOptions({
    title:'NO2 Maksimum Harian Bulan Januari 2020',
    vAxis:{title:'NO2 µmol/m2'}});
//print(harian1, 'NO2 Maksimum Harian Jan 2020');
//-----------------------------------Februari 2020-------------------------------------//
var start2 = ee.Date('2020-02-01'); // 01 Februari 2020
var end2 = ee.Date('2020-02-29'); // 29 Februari 2020
//Membuat fungsi konversi satuan mol ke mikromol
function mikromol2(image){
  return image.multiply(1000000)
  .copyProperties(image,['system:time_start']);
}
//Membuat variabel waktu per hari, per bulan, dan per tahun
var ndays2 = ee.Number(end2.difference(start2,'day')).round();
var nmonths2 = ee.Number(end2.difference(start2,'month')).round();
//print(ndays2, 'ndays2');
//print(nmonths2, 'nmonths2');
//------------------------------Memanggil Data Citra------------------------------------//
// mengimpor data citra Sentinel-5P
// memilih Band:"NO2_column_number_density"dengan rentang waktu yang ditentukan pada variabel waktu
var NO2 = ee.ImageCollection("COPERNICUS/S5P/OFFL/L3_NO2")
    .select("NO2_column_number_density")
    .filterDate(start2,end2)
    .filterBounds(DKI_Jakarta);
//print(NO2);
//Mengubah satuan dari mol ke mikromol
var NO2_mikromol2 = NO2.map(mikromol2);
//Menerapkan fungsi harian ke seluruh image
var bydays2 = ee.ImageCollection(
  ee.List.sequence(0,ndays2).map(function(n){
    var startday2 = start2.advance(n,'day');
    var endday2 = startday2.advance(1,'day');
    return NO2_mikromol2.filterDate(startday2,endday2)
              .select(0).max()
              .set('system:time_start',startday2);
  }));
//print(bydays2, 'Februari 2020');
//Menerapkan fungsi bulanan ke seluruh image
var bymonths2 = ee.ImageCollection(
  ee.List.sequence(0,nmonths2).map(function(n){
    var startmonth2 = start2.advance(n,'month');
    var endmonth2 = startmonth2.advance(1,'month');
    return bydays2.filterDate(startmonth2,endmonth2)
                 .select(0).mean()
                 .set('system:time_start',startmonth2);
  }));
//print(bymonths2, 'Februari 2020');
//Membuat grafik spasio temporal data Nitrogen Dioksida maksimum harian
var harian2 = ui.Chart.image.series({
  imageCollection: bydays2,
  region:DKI_Jakarta,
  scale:1000,
  xProperty:'system:time_start'})
  .setOptions({
    title:'NO2 Maksimum Harian Februari 2020',
    vAxis:{title:'NO2 µmol/m2'}});
//print(harian2, 'NO2 Maksimum Harian Feb 2020');
//-----------------------------------Maret 2020-------------------------------------//
var start3 = ee.Date('2020-03-01'); // 01 Maret 2020
var end3 = ee.Date('2020-03-31'); // 31 Maret 2020
//Membuat fungsi konversi satuan mol ke mikromol
function mikromol3(image){
  return image.multiply(1000000)
  .copyProperties(image,['system:time_start']);
}
//Membuat variabel waktu per hari, per bulan, dan per tahun
var ndays3 = ee.Number(end3.difference(start3,'day')).round();
var nmonths3 = ee.Number(end3.difference(start3,'month')).round();
//print(ndays3, 'ndays3');
//print(nmonths3, 'nmonths3');
//------------------------------Memanggil Data Citra------------------------------------//
// mengimpor data citra Sentinel-5P
// memilih Band:"NO2_column_number_density"dengan rentang waktu yang ditentukan pada variabel waktu
var NO2 = ee.ImageCollection("COPERNICUS/S5P/OFFL/L3_NO2")
    .select("NO2_column_number_density")
    .filterDate(start3,end3)
    .filterBounds(DKI_Jakarta);
//print(NO2);
//Mengubah satuan dari mol ke mikromol
var NO2_mikromol3 = NO2.map(mikromol3);
//Menerapkan fungsi harian ke seluruh image
var bydays3 = ee.ImageCollection(
  ee.List.sequence(0,ndays3).map(function(n){
    var startday3 = start3.advance(n,'day');
    var endday3 = startday3.advance(1,'day');
    return NO2_mikromol3.filterDate(startday3,endday3)
              .select(0).max()
              .set('system:time_start',startday3);
  }));
//print(bydays3, 'Maret');
//Menerapkan fungsi bulanan ke seluruh image
var bymonths3 = ee.ImageCollection(
  ee.List.sequence(0,nmonths3).map(function(n){
    var startmonth3 = start3.advance(n,'month');
    var endmonth3 = startmonth3.advance(1,'month');
    return bydays3.filterDate(startmonth3,endmonth3)
                 .select(0).mean()
                 .set('system:time_start',startmonth3);
  }));
//print(bymonths3, 'Maret 2020');
//Membuat grafik spasio temporal data Nitrogen Dioksida maksimum harian
var harian3 = ui.Chart.image.series({
  imageCollection: bydays3,
  region:DKI_Jakarta,
  scale:1000,
  xProperty:'system:time_start'})
  .setOptions({
    title:'NO2 Maksimum Harian Maret 2020',
    vAxis:{title:'NO2 µmol/m2'}});
//print(harian3, 'NO2 Maksimum Harian Maret 2020');
//-----------------------------------April 2020-------------------------------------//
var start4 = ee.Date('2020-04-01'); // 01 April 2020
var end4 = ee.Date('2020-04-30'); // 30 April 2020
//Membuat fungsi konversi satuan mol ke mikromol
function mikromol4(image){
  return image.multiply(1000000)
  .copyProperties(image,['system:time_start']);
}
//Membuat variabel waktu per hari, per bulan, dan per tahun
var ndays4 = ee.Number(end4.difference(start4,'day')).round();
var nmonths4 = ee.Number(end4.difference(start4,'month')).round();
//print(ndays4, 'ndays4');
//print(nmonths4, 'nmonths4');
//------------------------------Memanggil Data Citra------------------------------------//
// mengimpor data citra Sentinel-5P
// memilih Band:"NO2_column_number_density"dengan rentang waktu yang ditentukan pada variabel waktu
var NO2 = ee.ImageCollection("COPERNICUS/S5P/OFFL/L3_NO2")
    .select("NO2_column_number_density")
    .filterDate(start4,end4)
    .filterBounds(DKI_Jakarta);
//print(NO2);
//Mengubah satuan dari mol ke mikromol
var NO2_mikromol4 = NO2.map(mikromol4);
//Menerapkan fungsi harian ke seluruh image
var bydays4 = ee.ImageCollection(
  ee.List.sequence(0,ndays4).map(function(n){
    var startday4 = start4.advance(n,'day');
    var endday4 = startday4.advance(1,'day');
    return NO2_mikromol4.filterDate(startday4,endday4)
              .select(0).max()
              .set('system:time_start',startday4);
  }));
//print(bydays4, 'April');
//Menerapkan fungsi bulanan ke seluruh image
var bymonths4 = ee.ImageCollection(
  ee.List.sequence(0,nmonths4).map(function(n){
    var startmonth4 = start4.advance(n,'month');
    var endmonth4 = startmonth4.advance(1,'month');
    return bydays4.filterDate(startmonth4,endmonth4)
                 .select(0).mean()
                 .set('system:time_start',startmonth4);
  }));
//print(bymonths4, 'April 2020');
//Membuat grafik spasio temporal data Nitrogen Dioksida maksimum harian
var harian4 = ui.Chart.image.series({
  imageCollection: bydays4,
  region:DKI_Jakarta,
  scale:1000,
  xProperty:'system:time_start'})
  .setOptions({
    title:'NO2 Maksimum Harian April 2020',
    vAxis:{title:'NO2 µmol/m2'}});
//print(harian4, 'NO2 Maksimum Harian April 2020');
//-----------------------------------Mei 2020-------------------------------------//
var start5 = ee.Date('2020-05-01'); // 01 Mei 2020
var end5 = ee.Date('2020-05-30'); // 31 Mei 2020
//Membuat fungsi konversi satuan mol ke mikromol
function mikromol5(image){
  return image.multiply(1000000)
  .copyProperties(image,['system:time_start']);
}
//Membuat variabel waktu per hari, per bulan, dan per tahun
var ndays5 = ee.Number(end5.difference(start5,'day')).round();
var nmonths5 = ee.Number(end5.difference(start5,'month')).round();
//print(ndays5, 'ndays5');
//print(nmonths5, 'nmonths5');
//------------------------------Memanggil Data Citra------------------------------------//
// mengimpor data citra Sentinel-5P
// memilih Band:"NO2_column_number_density"dengan rentang waktu yang ditentukan pada variabel waktu
var NO2 = ee.ImageCollection("COPERNICUS/S5P/OFFL/L3_NO2")
    .select("NO2_column_number_density")
    .filterDate(start5,end5)
    .filterBounds(DKI_Jakarta);
//print(NO2);
//Mengubah satuan dari mol ke mikromol
var NO2_mikromol5 = NO2.map(mikromol5);
//Menerapkan fungsi harian ke seluruh image
var bydays5 = ee.ImageCollection(
  ee.List.sequence(0,ndays5).map(function(n){
    var startday5 = start5.advance(n,'day');
    var endday5 = startday5.advance(1,'day');
    return NO2_mikromol5.filterDate(startday5,endday5)
              .select(0).max()
              .set('system:time_start',startday5);
  }));
//print(bydays5, 'Mei');
//Menerapkan fungsi bulanan ke seluruh image
var bymonths5 = ee.ImageCollection(
  ee.List.sequence(0,nmonths5).map(function(n){
    var startmonth5 = start5.advance(n,'month');
    var endmonth5 = startmonth5.advance(1,'month');
    return bydays5.filterDate(startmonth5,endmonth5)
                 .select(0).mean()
                 .set('system:time_start',startmonth5);
  }));
//print(bymonths5, 'Mei 2020');
//Membuat grafik spasio temporal data Nitrogen Dioksida maksimum harian
var harian5 = ui.Chart.image.series({
  imageCollection: bydays5,
  region:DKI_Jakarta,
  scale:1000,
  xProperty:'system:time_start'})
  .setOptions({
    title:'NO2 Maksimum Harian Mei 2020',
    vAxis:{title:'NO2 µmol/m2'}});
//print(harian5, 'NO2 Maksimum Harian Mei 2020');
//-----------------------------------Juni 2020-------------------------------------//
var start6 = ee.Date('2020-06-01'); // 01 Juni 2020
var end6 = ee.Date('2020-06-30'); // 30 Juni 2020
//Membuat fungsi konversi satuan mol ke mikromol
function mikromol6(image){
  return image.multiply(1000000)
  .copyProperties(image,['system:time_start']);
}
//Membuat variabel waktu per hari, per bulan, dan per tahun
var ndays6 = ee.Number(end6.difference(start6,'day')).round();
var nmonths6 = ee.Number(end6.difference(start6,'month')).round();
//print(ndays6, 'ndays6');
//print(nmonths6, 'nmonths6');
//------------------------------Memanggil Data Citra------------------------------------//
// mengimpor data citra Sentinel-5P
// memilih Band:"NO2_column_number_density"dengan rentang waktu yang ditentukan pada variabel waktu
var NO2 = ee.ImageCollection("COPERNICUS/S5P/OFFL/L3_NO2")
    .select("NO2_column_number_density")
    .filterDate(start6,end6)
    .filterBounds(DKI_Jakarta);
//print(NO2);
//Mengubah satuan dari mol ke mikromol
var NO2_mikromol6 = NO2.map(mikromol6);
//Menerapkan fungsi harian ke seluruh image
var bydays6 = ee.ImageCollection(
  ee.List.sequence(0,ndays6).map(function(n){
    var startday6 = start6.advance(n,'day');
    var endday6 = startday6.advance(1,'day');
    return NO2_mikromol6.filterDate(startday6,endday6)
              .select(0).max()
              .set('system:time_start',startday6);
  }));
//print(bydays6, 'Juni');
//Menerapkan fungsi bulanan ke seluruh image
var bymonths6 = ee.ImageCollection(
  ee.List.sequence(0,nmonths6).map(function(n){
    var startmonth6 = start6.advance(n,'month');
    var endmonth6 = startmonth6.advance(1,'month');
    return bydays6.filterDate(startmonth6,endmonth6)
                 .select(0).mean()
                 .set('system:time_start',startmonth6);
  }));
//print(bymonths6, 'Juni 2020');
//Membuat grafik spasio temporal data Nitrogen Dioksida maksimum harian
var harian6 = ui.Chart.image.series({
  imageCollection: bydays6,
  region:DKI_Jakarta,
  scale:1000,
  xProperty:'system:time_start'})
  .setOptions({
    title:'NO2 Maksimum Harian Juni 2020',
    vAxis:{title:'NO2 µmol/m2'}});
//print(harian6, 'NO2 Maksimum Harian Juni 2020');
//-----------------------------------Juli 2020-------------------------------------//
var start7 = ee.Date('2020-07-01'); // 01 Juli 2020
var end7 = ee.Date('2020-07-31'); // 31 Juli 2020
//Membuat fungsi konversi satuan mol ke mikromol
function mikromol7(image){
  return image.multiply(1000000)
  .copyProperties(image,['system:time_start']);
}
//Membuat variabel waktu per hari, per bulan, dan per tahun
var ndays7 = ee.Number(end7.difference(start7,'day')).round();
var nmonths7 = ee.Number(end7.difference(start7,'month')).round();
//print(ndays7, 'ndays7');
//print(nmonths7, 'nmonths7');
//------------------------------Memanggil Data Citra------------------------------------//
// mengimpor data citra Sentinel-5P
// memilih Band:"NO2_column_number_density"dengan rentang waktu yang ditentukan pada variabel waktu
var NO2 = ee.ImageCollection("COPERNICUS/S5P/OFFL/L3_NO2")
    .select("NO2_column_number_density")
    .filterDate(start7,end7)
    .filterBounds(DKI_Jakarta);
//print(NO2);
//Mengubah satuan dari mol ke mikromol
var NO2_mikromol7 = NO2.map(mikromol7);
//Menerapkan fungsi harian ke seluruh image
var bydays7 = ee.ImageCollection(
  ee.List.sequence(0,ndays7).map(function(n){
    var startday7 = start7.advance(n,'day');
    var endday7 = startday7.advance(1,'day');
    return NO2_mikromol7.filterDate(startday7,endday7)
              .select(0).max()
              .set('system:time_start',startday7);
  }));
//print(bydays7, 'Juli');
//Menerapkan fungsi bulanan ke seluruh image
var bymonths7 = ee.ImageCollection(
  ee.List.sequence(0,nmonths7).map(function(n){
    var startmonth7 = start7.advance(n,'month');
    var endmonth7 = startmonth7.advance(1,'month');
    return bydays7.filterDate(startmonth7,endmonth7)
                 .select(0).mean()
                 .set('system:time_start',startmonth7);
  }));
//print(bymonths7, 'Juli 2020');
//Membuat grafik spasio temporal data Nitrogen Dioksida maksimum harian
var harian7 = ui.Chart.image.series({
  imageCollection: bydays7,
  region:DKI_Jakarta,
  scale:1000,
  xProperty:'system:time_start'})
  .setOptions({
    title:'NO2 Maksimum Harian Juli 2020',
    vAxis:{title:'NO2 µmol/m2'}});
//print(harian7, 'NO2 Maksimum Harian Juli 2020');
//-----------------------------------Augst 2020-------------------------------------//
var start8 = ee.Date('2020-08-01'); // 01 Augst 2020
var end8 = ee.Date('2020-08-31'); // 31 Augst 2020
//Membuat fungsi konversi satuan mol ke mikromol
function mikromol8(image){
  return image.multiply(1000000)
  .copyProperties(image,['system:time_start']);
}
//Membuat variabel waktu per hari, per bulan, dan per tahun
var ndays8 = ee.Number(end8.difference(start8,'day')).round();
var nmonths8 = ee.Number(end8.difference(start8,'month')).round();
//print(ndays8, 'ndays8');
//print(nmonths8, 'nmonths8');
//------------------------------Memanggil Data Citra------------------------------------//
// mengimpor data citra Sentinel-5P
// memilih Band:"NO2_column_number_density"dengan rentang waktu yang ditentukan pada variabel waktu
var NO2 = ee.ImageCollection("COPERNICUS/S5P/OFFL/L3_NO2")
    .select("NO2_column_number_density")
    .filterDate(start8,end8)
    .filterBounds(DKI_Jakarta);
//print(NO2);
//Mengubah satuan dari mol ke mikromol
var NO2_mikromol8 = NO2.map(mikromol8);
//Menerapkan fungsi harian ke seluruh image
var bydays8 = ee.ImageCollection(
  ee.List.sequence(0,ndays8).map(function(n){
    var startday8 = start8.advance(n,'day');
    var endday8 = startday8.advance(1,'day');
    return NO2_mikromol8.filterDate(startday8,endday8)
              .select(0).max()
              .set('system:time_start',startday8);
  }));
//print(bydays8, 'Augst');
//Menerapkan fungsi bulanan ke seluruh image
var bymonths8 = ee.ImageCollection(
  ee.List.sequence(0,nmonths8).map(function(n){
    var startmonth8 = start8.advance(n,'month');
    var endmonth8 = startmonth8.advance(1,'month');
    return bydays8.filterDate(startmonth8,endmonth8)
                 .select(0).mean()
                 .set('system:time_start',startmonth8);
  }));
//print(bymonths8, 'Augst 2020');
//Membuat grafik spasio temporal data Nitrogen Dioksida maksimum harian
var harian8 = ui.Chart.image.series({
  imageCollection: bydays8,
  region:DKI_Jakarta,
  scale:1000,
  xProperty:'system:time_start'})
  .setOptions({
    title:'NO2 Maksimum Harian Augst 2020',
    vAxis:{title:'NO2 µmol/m2'}});
//print(harian8, 'NO2 Maksimum Harian Augst 2020');
//-----------------------------------Sept 2020-------------------------------------//
var start9 = ee.Date('2020-09-01'); // 01 Sept 2020
var end9 = ee.Date('2020-09-30'); // 30 Sept 2020
//Membuat fungsi konversi satuan mol ke mikromol
function mikromol9(image){
  return image.multiply(1000000)
  .copyProperties(image,['system:time_start']);
}
//Membuat variabel waktu per hari, per bulan, dan per tahun
var ndays9 = ee.Number(end9.difference(start9,'day')).round();
var nmonths9 = ee.Number(end9.difference(start9,'month')).round();
//print(ndays9, 'ndays9');
//print(nmonths9, 'nmonths9');
//------------------------------Memanggil Data Citra------------------------------------//
// mengimpor data citra Sentinel-5P
// memilih Band:"NO2_column_number_density"dengan rentang waktu yang ditentukan pada variabel waktu
var NO2 = ee.ImageCollection("COPERNICUS/S5P/OFFL/L3_NO2")
    .select("NO2_column_number_density")
    .filterDate(start9,end9)
    .filterBounds(DKI_Jakarta);
//print(NO2);
//Mengubah satuan dari mol ke mikromol
var NO2_mikromol9 = NO2.map(mikromol9);
//Menerapkan fungsi harian ke seluruh image
var bydays9 = ee.ImageCollection(
  ee.List.sequence(0,ndays9).map(function(n){
    var startday9 = start9.advance(n,'day');
    var endday9 = startday9.advance(1,'day');
    return NO2_mikromol9.filterDate(startday9,endday9)
              .select(0).max()
              .set('system:time_start',startday9);
  }));
//print(bydays9, 'Sept');
//Menerapkan fungsi bulanan ke seluruh image
var bymonths9 = ee.ImageCollection(
  ee.List.sequence(0,nmonths9).map(function(n){
    var startmonth9 = start9.advance(n,'month');
    var endmonth9 = startmonth9.advance(1,'month');
    return bydays9.filterDate(startmonth9,endmonth9)
                 .select(0).mean()
                 .set('system:time_start',startmonth9);
  }));
//print(bymonths9, 'Sept 2020');
//Membuat grafik spasio temporal data Nitrogen Dioksida maksimum harian
var harian9 = ui.Chart.image.series({
  imageCollection: bydays9,
  region:DKI_Jakarta,
  scale:1000,
  xProperty:'system:time_start'})
  .setOptions({
    title:'NO2 Maksimum Harian Sept 2020',
    vAxis:{title:'NO2 µmol/m2'}});
//print(harian9, 'NO2 Maksimum Harian Sept 2020');
//-----------------------------------Oktober 2020-------------------------------------//
var start10 = ee.Date('2020-10-01'); // 01 Okt 2020
var end10 = ee.Date('2020-10-31'); // 31 Okt 2020
//Membuat fungsi konversi satuan mol ke mikromol
function mikromol10(image){
  return image.multiply(1000000)
  .copyProperties(image,['system:time_start']);
}
//Membuat variabel waktu per hari, per bulan, dan per tahun
var ndays10 = ee.Number(end10.difference(start10,'day')).round();
var nmonths10 = ee.Number(end10.difference(start10,'month')).round();
//print(ndays10, 'ndays10');
//print(nmonths10, 'nmonths10');
//------------------------------Memanggil Data Citra------------------------------------//
// mengimpor data citra Sentinel-5P
// memilih Band:"NO2_column_number_density"dengan rentang waktu yang ditentukan pada variabel waktu
var NO2 = ee.ImageCollection("COPERNICUS/S5P/OFFL/L3_NO2")
    .select("NO2_column_number_density")
    .filterDate(start10,end10)
    .filterBounds(DKI_Jakarta);
//print(NO2);
//Mengubah satuan dari mol ke mikromol
var NO2_mikromol10 = NO2.map(mikromol10);
//Menerapkan fungsi harian ke seluruh image
var bydays10 = ee.ImageCollection(
  ee.List.sequence(0,ndays10).map(function(n){
    var startday10 = start10.advance(n,'day');
    var endday10 = startday10.advance(1,'day');
    return NO2_mikromol10.filterDate(startday10,endday10)
              .select(0).max()
              .set('system:time_start',startday10);
  }));
//print(bydays10, 'Okt');
//Menerapkan fungsi bulanan ke seluruh image
var bymonths10 = ee.ImageCollection(
  ee.List.sequence(0,nmonths10).map(function(n){
    var startmonth10 = start10.advance(n,'month');
    var endmonth10 = startmonth10.advance(1,'month');
    return bydays10.filterDate(startmonth10,endmonth10)
                 .select(0).mean()
                 .set('system:time_start',startmonth10);
  }));
//print(bymonths10, 'Okt 2020');
//Membuat grafik spasio temporal data Nitrogen Dioksida maksimum harian
var harian10 = ui.Chart.image.series({
  imageCollection: bydays10,
  region:DKI_Jakarta,
  scale:1000,
  xProperty:'system:time_start'})
  .setOptions({
    title:'NO2 Maksimum Harian Okt 2020',
    vAxis:{title:'NO2 µmol/m2'}});
//print(harian10, 'NO2 Maksimum Harian Okt 2020');
//-----------------------------------Nov 2020-------------------------------------//
var start11 = ee.Date('2020-11-01'); // 01 Nov 2020
var end11 = ee.Date('2020-11-30'); // 30 Nov 2020
//Membuat fungsi konversi satuan mol ke mikromol
function mikromol11(image){
  return image.multiply(1000000)
  .copyProperties(image,['system:time_start']);
}
//Membuat variabel waktu per hari, per bulan, dan per tahun
var ndays11 = ee.Number(end11.difference(start11,'day')).round();
var nmonths11 = ee.Number(end11.difference(start11,'month')).round();
//print(ndays11, 'ndays11');
//print(nmonths11, 'nmonths11');
//------------------------------Memanggil Data Citra------------------------------------//
// mengimpor data citra Sentinel-5P
// memilih Band:"NO2_column_number_density"dengan rentang waktu yang ditentukan pada variabel waktu
var NO2 = ee.ImageCollection("COPERNICUS/S5P/OFFL/L3_NO2")
    .select("NO2_column_number_density")
    .filterDate(start11,end11)
    .filterBounds(DKI_Jakarta);
//print(NO2);
//Mengubah satuan dari mol ke mikromol
var NO2_mikromol11 = NO2.map(mikromol11);
//Menerapkan fungsi harian ke seluruh image
var bydays11 = ee.ImageCollection(
  ee.List.sequence(0,ndays11).map(function(n){
    var startday11 = start11.advance(n,'day');
    var endday11 = startday11.advance(1,'day');
    return NO2_mikromol11.filterDate(startday11,endday11)
              .select(0).max()
              .set('system:time_start',startday11);
  }));
//print(bydays10, 'Okt');
//Menerapkan fungsi bulanan ke seluruh image
var bymonths11 = ee.ImageCollection(
  ee.List.sequence(0,nmonths11).map(function(n){
    var startmonth11 = start11.advance(n,'month');
    var endmonth11 = startmonth11.advance(1,'month');
    return bydays11.filterDate(startmonth11,endmonth11)
                 .select(0).mean()
                 .set('system:time_start',startmonth11);
  }));
//print(bymonths11, 'Nov 2020');
//Membuat grafik spasio temporal data Nitrogen Dioksida maksimum harian
var harian11 = ui.Chart.image.series({
  imageCollection: bydays11,
  region:DKI_Jakarta,
  scale:1000,
  xProperty:'system:time_start'})
  .setOptions({
    title:'NO2 Maksimum Harian Nov 2020',
    vAxis:{title:'NO2 µmol/m2'}});
//print(harian11, 'NO2 Maksimum Harian Nov 2020');
//-----------------------------------Des 2020-------------------------------------//
var start12 = ee.Date('2020-12-01'); // 01 Des 2020
var end12 = ee.Date('2020-12-31'); // 31 Des 2020
//Membuat fungsi konversi satuan mol ke mikromol
function mikromol12(image){
  return image.multiply(1000000)
  .copyProperties(image,['system:time_start']);
}
//Membuat variabel waktu per hari, per bulan, dan per tahun
var ndays12 = ee.Number(end12.difference(start12,'day')).round();
var nmonths12 = ee.Number(end12.difference(start12,'month')).round();
//print(ndays12, 'ndays12');
//print(nmonths12, 'nmonths12');
//------------------------------Memanggil Data Citra------------------------------------//
// mengimpor data citra Sentinel-5P
// memilih Band:"NO2_column_number_density"dengan rentang waktu yang ditentukan pada variabel waktu
var NO2 = ee.ImageCollection("COPERNICUS/S5P/OFFL/L3_NO2")
    .select("NO2_column_number_density")
    .filterDate(start12,end12)
    .filterBounds(DKI_Jakarta);
//print(NO2);
//Mengubah satuan dari mol ke mikromol
var NO2_mikromol12 = NO2.map(mikromol12);
//Menerapkan fungsi harian ke seluruh image
var bydays12 = ee.ImageCollection(
  ee.List.sequence(0,ndays12).map(function(n){
    var startday12 = start12.advance(n,'day');
    var endday12 = startday12.advance(1,'day');
    return NO2_mikromol12.filterDate(startday12,endday12)
              .select(0).max()
              .set('system:time_start',startday12);
  }));
//print(bydays10, 'Okt');
//Menerapkan fungsi bulanan ke seluruh image
var bymonths12 = ee.ImageCollection(
  ee.List.sequence(0,nmonths12).map(function(n){
    var startmonth12 = start12.advance(n,'month');
    var endmonth12 = startmonth12.advance(1,'month');
    return bydays12.filterDate(startmonth12,endmonth12)
                 .select(0).mean()
                 .set('system:time_start',startmonth12);
  }));
//print(bymonths12, 'Des 2020');
//Membuat grafik spasio temporal data Nitrogen Dioksida maksimum harian
var harian12 = ui.Chart.image.series({
  imageCollection: bydays12,
  region:DKI_Jakarta,
  scale:1000,
  xProperty:'system:time_start'})
  .setOptions({
    title:'NO2 Maksimum Harian Des 2020',
    vAxis:{title:'NO2 µmol/m2'}});
//print(harian12, 'NO2 Maksimum Harian Des 2020');
//----------------------------------Januari 2020-------------------------------//
var start13 = ee.Date('2021-01-01'); // 01 Januari 2021
var end13 = ee.Date('2021-01-31'); // 31 Januari 2021
//Membuat fungsi konversi satuan mol ke mikromol
function mikromol13(image){
  return image.multiply(1000000)
  .copyProperties(image,['system:time_start']);
}
//Membuat variabel waktu per hari, per bulan, dan per tahun
var ndays13 = ee.Number(end13.difference(start13,'day')).round();
var nmonths13 = ee.Number(end13.difference(start13,'month')).round();
//print(ndays1, 'ndays1');
//print(nmonths1, 'nmonths1');
//------------------------------Memanggil Data Citra------------------------------------//
// mengimpor data citra Sentinel-5P
// memilih Band:"NO2_column_number_density"dengan rentang waktu yang ditentukan pada variabel waktu
var NO2 = ee.ImageCollection("COPERNICUS/S5P/OFFL/L3_NO2")
    .select("NO2_column_number_density")
    .filterDate(start13,end13)
    .filterBounds(DKI_Jakarta);
//print(NO2);
//Mengubah satuan dari mol ke mikromol
var NO2_mikromol13 = NO2.map(mikromol13);
//Menerapkan fungsi harian ke seluruh image
var bydays13 = ee.ImageCollection(
  ee.List.sequence(0,ndays13).map(function(n){
    var startday13 = start13.advance(n,'day');
    var endday13 = startday13.advance(1,'day');
    return NO2_mikromol13.filterDate(startday13,endday13)
              .select(0).max()
              .set('system:time_start',startday13);
  }));
//print(bydays13, 'Januari 2021');
//Menerapkan fungsi bulanan ke seluruh image
var bymonths13 = ee.ImageCollection(
  ee.List.sequence(0,nmonths13).map(function(n){
    var startmonth13 = start13.advance(n,'month');
    var endmonth13 = startmonth13.advance(1,'month');
    return bydays13.filterDate(startmonth13,endmonth13)
                 .select(0).mean()
                 .set('system:time_start',startmonth13);
  }));
//print(bymonths13, 'Januari 2021');
//Membuat grafik spasio temporal data Nitrogen Dioksida maksimum harian
var harian13 = ui.Chart.image.series({
  imageCollection: bydays13,
  region:DKI_Jakarta,
  scale:1000,
  xProperty:'system:time_start'})
  .setOptions({
    title:'NO2 Maksimum Harian Bulan Januari 2021',
    vAxis:{title:'NO2 µmol/m2'}});
//print(harian13, 'NO2 Maksimum Harian Jan 2021');
//-----------------------------------Februari 2021-------------------------------------//
var start14 = ee.Date('2021-02-01'); // 01 Februari 2021
var end14 = ee.Date('2021-02-28'); // 28 Februari 2021
//Membuat fungsi konversi satuan mol ke mikromol
function mikromol14(image){
  return image.multiply(1000000)
  .copyProperties(image,['system:time_start']);
}
//Membuat variabel waktu per hari, per bulan, dan per tahun
var ndays14 = ee.Number(end14.difference(start14,'day')).round();
var nmonths14 = ee.Number(end14.difference(start14,'month')).round();
//print(ndays14, 'ndays14');
//print(nmonths14, 'nmonths14');
//------------------------------Memanggil Data Citra------------------------------------//
// mengimpor data citra Sentinel-5P
// memilih Band:"NO2_column_number_density"dengan rentang waktu yang ditentukan pada variabel waktu
var NO2 = ee.ImageCollection("COPERNICUS/S5P/OFFL/L3_NO2")
    .select("NO2_column_number_density")
    .filterDate(start14,end14)
    .filterBounds(DKI_Jakarta);
//print(NO2);
//Mengubah satuan dari mol ke mikromol
var NO2_mikromol14 = NO2.map(mikromol14);
//Menerapkan fungsi harian ke seluruh image
var bydays14 = ee.ImageCollection(
  ee.List.sequence(0,ndays14).map(function(n){
    var startday14 = start14.advance(n,'day');
    var endday14 = startday14.advance(1,'day');
    return NO2_mikromol14.filterDate(startday14,endday14)
              .select(0).max()
              .set('system:time_start',startday14);
  }));
//print(bydays14, 'Februari 2021');
//Menerapkan fungsi bulanan ke seluruh image
var bymonths14 = ee.ImageCollection(
  ee.List.sequence(0,nmonths14).map(function(n){
    var startmonth14 = start14.advance(n,'month');
    var endmonth14 = startmonth14.advance(1,'month');
    return bydays14.filterDate(startmonth14,endmonth14)
                 .select(0).mean()
                 .set('system:time_start',startmonth14);
  }));
//print(bymonths14, 'Februari 2021');
//Membuat grafik spasio temporal data Nitrogen Dioksida maksimum harian
var harian14 = ui.Chart.image.series({
  imageCollection: bydays14,
  region:DKI_Jakarta,
  scale:1000,
  xProperty:'system:time_start'})
  .setOptions({
    title:'NO2 Maksimum Harian Februari 2021',
    vAxis:{title:'NO2 µmol/m2'}});
//print(harian14, 'NO2 Maksimum Harian Feb 2021');
//-----------------------------------Maret 2021-------------------------------------//
var start15 = ee.Date('2021-03-01'); // 01 Maret 2021
var end15 = ee.Date('2021-03-31'); // 31 Maret 2021
//Membuat fungsi konversi satuan mol ke mikromol
function mikromol15(image){
  return image.multiply(1000000)
  .copyProperties(image,['system:time_start']);
}
//Membuat variabel waktu per hari, per bulan, dan per tahun
var ndays15 = ee.Number(end15.difference(start15,'day')).round();
var nmonths15 = ee.Number(end15.difference(start15,'month')).round();
//print(ndays15, 'ndays15');
//print(nmonths15, 'nmonths15');
//------------------------------Memanggil Data Citra------------------------------------//
// mengimpor data citra Sentinel-5P
// memilih Band:"NO2_column_number_density"dengan rentang waktu yang ditentukan pada variabel waktu
var NO2 = ee.ImageCollection("COPERNICUS/S5P/OFFL/L3_NO2")
    .select("NO2_column_number_density")
    .filterDate(start15,end15)
    .filterBounds(DKI_Jakarta);
//print(NO2);
//Mengubah satuan dari mol ke mikromol
var NO2_mikromol15 = NO2.map(mikromol15);
//Menerapkan fungsi harian ke seluruh image
var bydays15 = ee.ImageCollection(
  ee.List.sequence(0,ndays15).map(function(n){
    var startday15 = start15.advance(n,'day');
    var endday15 = startday15.advance(1,'day');
    return NO2_mikromol15.filterDate(startday15,endday15)
              .select(0).max()
              .set('system:time_start',startday15);
  }));
//print(bydays15, 'Maret 2021');
//Menerapkan fungsi bulanan ke seluruh image
var bymonths15 = ee.ImageCollection(
  ee.List.sequence(0,nmonths15).map(function(n){
    var startmonth15 = start15.advance(n,'month');
    var endmonth15 = startmonth15.advance(1,'month');
    return bydays15.filterDate(startmonth15,endmonth15)
                 .select(0).mean()
                 .set('system:time_start',startmonth15);
  }));
//print(bymonths15, 'Maret 2021');
//Membuat grafik spasio temporal data Nitrogen Dioksida maksimum harian
var harian15 = ui.Chart.image.series({
  imageCollection: bydays15,
  region:DKI_Jakarta,
  scale:1000,
  xProperty:'system:time_start'})
  .setOptions({
    title:'NO2 Maksimum Harian Maret 2021',
    vAxis:{title:'NO2 µmol/m2'}});
//print(harian15, 'NO2 Maksimum Harian Maret 2021');
//-----------------------------------April 2021-------------------------------------//
var start16 = ee.Date('2021-04-01'); // 01 April 2021
var end16 = ee.Date('2021-04-30'); // 31 April 2021
//Membuat fungsi konversi satuan mol ke mikromol
function mikromol16(image){
  return image.multiply(1000000)
  .copyProperties(image,['system:time_start']);
}
//Membuat variabel waktu per hari, per bulan, dan per tahun
var ndays16 = ee.Number(end16.difference(start16,'day')).round();
var nmonths16 = ee.Number(end16.difference(start16,'month')).round();
//print(ndays16, 'ndays16');
//print(nmonths16, 'nmonths16');
//------------------------------Memanggil Data Citra------------------------------------//
// mengimpor data citra Sentinel-5P
// memilih Band:"NO2_column_number_density"dengan rentang waktu yang ditentukan pada variabel waktu
var NO2 = ee.ImageCollection("COPERNICUS/S5P/OFFL/L3_NO2")
    .select("NO2_column_number_density")
    .filterDate(start16,end16)
    .filterBounds(DKI_Jakarta);
//print(NO2);
//Mengubah satuan dari mol ke mikromol
var NO2_mikromol16 = NO2.map(mikromol16);
//Menerapkan fungsi harian ke seluruh image
var bydays16 = ee.ImageCollection(
  ee.List.sequence(0,ndays16).map(function(n){
    var startday16 = start16.advance(n,'day');
    var endday16 = startday16.advance(1,'day');
    return NO2_mikromol16.filterDate(startday16,endday16)
              .select(0).max()
              .set('system:time_start',startday16);
  }));
//print(bydays16, 'April 2021');
//Menerapkan fungsi bulanan ke seluruh image
var bymonths16 = ee.ImageCollection(
  ee.List.sequence(0,nmonths16).map(function(n){
    var startmonth16 = start16.advance(n,'month');
    var endmonth16 = startmonth16.advance(1,'month');
    return bydays16.filterDate(startmonth16,endmonth16)
                 .select(0).mean()
                 .set('system:time_start',startmonth16);
  }));
//print(bymonths16, 'April 2021');
//Membuat grafik spasio temporal data Nitrogen Dioksida maksimum harian
var harian16 = ui.Chart.image.series({
  imageCollection: bydays16,
  region:DKI_Jakarta,
  scale:1000,
  xProperty:'system:time_start'})
  .setOptions({
    title:'NO2 Maksimum Harian April 2021',
    vAxis:{title:'NO2 µmol/m2'}});
//print(harian16, 'NO2 Maksimum Harian April 2021');
//-----------------------------------Mei 2021-------------------------------------//
var start17 = ee.Date('2021-05-01'); // 01 Mei 2021
var end17 = ee.Date('2021-05-31'); // 31 Mei 2021
//Membuat fungsi konversi satuan mol ke mikromol
function mikromol17(image){
  return image.multiply(1000000)
  .copyProperties(image,['system:time_start']);
}
//Membuat variabel waktu per hari, per bulan, dan per tahun
var ndays17 = ee.Number(end17.difference(start17,'day')).round();
var nmonths17 = ee.Number(end17.difference(start17,'month')).round();
//print(ndays17, 'ndays17');
//print(nmonths17, 'nmonths17');
//------------------------------Memanggil Data Citra------------------------------------//
// mengimpor data citra Sentinel-5P
// memilih Band:"NO2_column_number_density"dengan rentang waktu yang ditentukan pada variabel waktu
var NO2 = ee.ImageCollection("COPERNICUS/S5P/OFFL/L3_NO2")
    .select("NO2_column_number_density")
    .filterDate(start17,end17)
    .filterBounds(DKI_Jakarta);
//print(NO2);
//Mengubah satuan dari mol ke mikromol
var NO2_mikromol17 = NO2.map(mikromol17);
//Menerapkan fungsi harian ke seluruh image
var bydays17 = ee.ImageCollection(
  ee.List.sequence(0,ndays17).map(function(n){
    var startday17 = start17.advance(n,'day');
    var endday17 = startday17.advance(1,'day');
    return NO2_mikromol17.filterDate(startday17,endday17)
              .select(0).max()
              .set('system:time_start',startday17);
  }));
//print(bydays17, 'Mei 2021');
//Menerapkan fungsi bulanan ke seluruh image
var bymonths17 = ee.ImageCollection(
  ee.List.sequence(0,nmonths17).map(function(n){
    var startmonth17 = start17.advance(n,'month');
    var endmonth17 = startmonth17.advance(1,'month');
    return bydays17.filterDate(startmonth17,endmonth17)
                 .select(0).mean()
                 .set('system:time_start',startmonth17);
  }));
//print(bymonths17, 'Mei 2021');
//Membuat grafik spasio temporal data Nitrogen Dioksida maksimum harian
var harian17 = ui.Chart.image.series({
  imageCollection: bydays17,
  region:DKI_Jakarta,
  scale:1000,
  xProperty:'system:time_start'})
  .setOptions({
    title:'NO2 Maksimum Harian Mei 2021',
    vAxis:{title:'NO2 µmol/m2'}});
//print(harian17, 'NO2 Maksimum Harian Mei 2021');
//-----------------------------------Juni 2021-------------------------------------//
var start18 = ee.Date('2021-06-01'); // 01 Juni 2021
var end18 = ee.Date('2021-06-30'); // 30 Juni 2021
//Membuat fungsi konversi satuan mol ke mikromol
function mikromol18(image){
  return image.multiply(1000000)
  .copyProperties(image,['system:time_start']);
}
//Membuat variabel waktu per hari, per bulan, dan per tahun
var ndays18 = ee.Number(end18.difference(start18,'day')).round();
var nmonths18 = ee.Number(end18.difference(start18,'month')).round();
//print(ndays18, 'ndays18');
//print(nmonths18, 'nmonths18');
//------------------------------Memanggil Data Citra------------------------------------//
// mengimpor data citra Sentinel-5P
// memilih Band:"NO2_column_number_density"dengan rentang waktu yang ditentukan pada variabel waktu
var NO2 = ee.ImageCollection("COPERNICUS/S5P/OFFL/L3_NO2")
    .select("NO2_column_number_density")
    .filterDate(start18,end18)
    .filterBounds(DKI_Jakarta);
//print(NO2);
//Mengubah satuan dari mol ke mikromol
var NO2_mikromol18 = NO2.map(mikromol18);
//Menerapkan fungsi harian ke seluruh image
var bydays18 = ee.ImageCollection(
  ee.List.sequence(0,ndays18).map(function(n){
    var startday18 = start18.advance(n,'day');
    var endday18 = startday18.advance(1,'day');
    return NO2_mikromol18.filterDate(startday18,endday18)
              .select(0).max()
              .set('system:time_start',startday18);
  }));
//print(bydays18, 'Juni 2021');
//Menerapkan fungsi bulanan ke seluruh image
var bymonths18 = ee.ImageCollection(
  ee.List.sequence(0,nmonths18).map(function(n){
    var startmonth18 = start18.advance(n,'month');
    var endmonth18 = startmonth18.advance(1,'month');
    return bydays18.filterDate(startmonth18,endmonth18)
                 .select(0).mean()
                 .set('system:time_start',startmonth18);
  }));
//print(bymonths18, 'Juni 2021');
//Membuat grafik spasio temporal data Nitrogen Dioksida maksimum harian
var harian18 = ui.Chart.image.series({
  imageCollection: bydays18,
  region:DKI_Jakarta,
  scale:1000,
  xProperty:'system:time_start'})
  .setOptions({
    title:'NO2 Maksimum Harian Juni 2021',
    vAxis:{title:'NO2 µmol/m2'}});
//print(harian18, 'NO2 Maksimum Harian Juni 2021');
//-----------------------------------Juli 2021-------------------------------------//
var start19 = ee.Date('2021-07-01'); // 01 Juli 2021
var end19 = ee.Date('2021-07-31'); // 31 Juli 2021
//Membuat fungsi konversi satuan mol ke mikromol
function mikromol19(image){
  return image.multiply(1000000)
  .copyProperties(image,['system:time_start']);
}
//Membuat variabel waktu per hari, per bulan, dan per tahun
var ndays19 = ee.Number(end19.difference(start19,'day')).round();
var nmonths19 = ee.Number(end19.difference(start19,'month')).round();
//print(ndays19, 'ndays19');
//print(nmonths19, 'nmonths19');
//------------------------------Memanggil Data Citra------------------------------------//
// mengimpor data citra Sentinel-5P
// memilih Band:"NO2_column_number_density"dengan rentang waktu yang ditentukan pada variabel waktu
var NO2 = ee.ImageCollection("COPERNICUS/S5P/OFFL/L3_NO2")
    .select("NO2_column_number_density")
    .filterDate(start19,end19)
    .filterBounds(DKI_Jakarta);
//print(NO2);
//Mengubah satuan dari mol ke mikromol
var NO2_mikromol19 = NO2.map(mikromol19);
//Menerapkan fungsi harian ke seluruh image
var bydays19 = ee.ImageCollection(
  ee.List.sequence(0,ndays19).map(function(n){
    var startday19 = start19.advance(n,'day');
    var endday19 = startday19.advance(1,'day');
    return NO2_mikromol19.filterDate(startday19,endday19)
              .select(0).max()
              .set('system:time_start',startday19);
  }));
//print(bydays19, 'Juli 2021');
//Menerapkan fungsi bulanan ke seluruh image
var bymonths19 = ee.ImageCollection(
  ee.List.sequence(0,nmonths19).map(function(n){
    var startmonth19 = start19.advance(n,'month');
    var endmonth19 = startmonth19.advance(1,'month');
    return bydays19.filterDate(startmonth19,endmonth19)
                 .select(0).mean()
                 .set('system:time_start',startmonth19);
  }));
//print(bymonths19, 'Juli 2021');
//Membuat grafik spasio temporal data Nitrogen Dioksida maksimum harian
var harian19 = ui.Chart.image.series({
  imageCollection: bydays19,
  region:DKI_Jakarta,
  scale:1000,
  xProperty:'system:time_start'})
  .setOptions({
    title:'NO2 Maksimum Harian Juli 2021',
    vAxis:{title:'NO2 µmol/m2'}});
//print(harian19, 'NO2 Maksimum Harian Juli 2021');
//-----------------------------------Agust 2021-------------------------------------//
var start20 = ee.Date('2021-08-01'); // 01 Agust 2021
var end20 = ee.Date('2021-08-31'); // 31 Agust 2021
//Membuat fungsi konversi satuan mol ke mikromol
function mikromol20(image){
  return image.multiply(1000000)
  .copyProperties(image,['system:time_start']);
}
//Membuat variabel waktu per hari, per bulan, dan per tahun
var ndays20 = ee.Number(end20.difference(start20,'day')).round();
var nmonths20 = ee.Number(end20.difference(start20,'month')).round();
//print(ndays20, 'ndays20');
//print(nmonths20, 'nmonths20');
//------------------------------Memanggil Data Citra------------------------------------//
// mengimpor data citra Sentinel-5P
// memilih Band:"NO2_column_number_density"dengan rentang waktu yang ditentukan pada variabel waktu
var NO2 = ee.ImageCollection("COPERNICUS/S5P/OFFL/L3_NO2")
    .select("NO2_column_number_density")
    .filterDate(start20,end20)
    .filterBounds(DKI_Jakarta);
//print(NO2);
//Mengubah satuan dari mol ke mikromol
var NO2_mikromol20 = NO2.map(mikromol20);
//Menerapkan fungsi harian ke seluruh image
var bydays20 = ee.ImageCollection(
  ee.List.sequence(0,ndays20).map(function(n){
    var startday20 = start20.advance(n,'day');
    var endday20 = startday20.advance(1,'day');
    return NO2_mikromol20.filterDate(startday20,endday20)
              .select(0).max()
              .set('system:time_start',startday20);
  }));
//print(bydays20, 'Agust 2021');
//Menerapkan fungsi bulanan ke seluruh image
var bymonths20 = ee.ImageCollection(
  ee.List.sequence(0,nmonths20).map(function(n){
    var startmonth20 = start20.advance(n,'month');
    var endmonth20 = startmonth20.advance(1,'month');
    return bydays20.filterDate(startmonth20,endmonth20)
                 .select(0).mean()
                 .set('system:time_start',startmonth20);
  }));
//print(bymonths20, 'Agust 2021');
//Membuat grafik spasio temporal data Nitrogen Dioksida maksimum harian
var harian20 = ui.Chart.image.series({
  imageCollection: bydays20,
  region:DKI_Jakarta,
  scale:1000,
  xProperty:'system:time_start'})
  .setOptions({
    title:'NO2 Maksimum Harian Agust 2021',
    vAxis:{title:'NO2 µmol/m2'}});
//print(harian20, 'NO2 Maksimum Harian Agust 2021');
//-----------------------------------Sept 2021-------------------------------------//
var start21 = ee.Date('2021-09-01'); // 01 Sept 2021
var end21 = ee.Date('2021-09-30'); // 30 Sept 2021
//Membuat fungsi konversi satuan mol ke mikromol
function mikromol21(image){
  return image.multiply(1000000)
  .copyProperties(image,['system:time_start']);
}
//Membuat variabel waktu per hari, per bulan, dan per tahun
var ndays21 = ee.Number(end21.difference(start21,'day')).round();
var nmonths21 = ee.Number(end21.difference(start21,'month')).round();
//print(ndays21, 'ndays21');
//print(nmonths21, 'nmonths21');
//------------------------------Memanggil Data Citra------------------------------------//
// mengimpor data citra Sentinel-5P
// memilih Band:"NO2_column_number_density"dengan rentang waktu yang ditentukan pada variabel waktu
var NO2 = ee.ImageCollection("COPERNICUS/S5P/OFFL/L3_NO2")
    .select("NO2_column_number_density")
    .filterDate(start21,end21)
    .filterBounds(DKI_Jakarta);
//print(NO2);
//Mengubah satuan dari mol ke mikromol
var NO2_mikromol21 = NO2.map(mikromol21);
//Menerapkan fungsi harian ke seluruh image
var bydays21 = ee.ImageCollection(
  ee.List.sequence(0,ndays21).map(function(n){
    var startday21 = start21.advance(n,'day');
    var endday21 = startday21.advance(1,'day');
    return NO2_mikromol21.filterDate(startday21,endday21)
              .select(0).max()
              .set('system:time_start',startday21);
  }));
//print(bydays21, 'Sept 2021');
//Menerapkan fungsi bulanan ke seluruh image
var bymonths21 = ee.ImageCollection(
  ee.List.sequence(0,nmonths21).map(function(n){
    var startmonth21 = start21.advance(n,'month');
    var endmonth21 = startmonth21.advance(1,'month');
    return bydays21.filterDate(startmonth21,endmonth21)
                 .select(0).mean()
                 .set('system:time_start',startmonth21);
  }));
//print(bymonths21, 'Sept 2021');
//Membuat grafik spasio temporal data Nitrogen Dioksida maksimum harian
var harian21 = ui.Chart.image.series({
  imageCollection: bydays21,
  region:DKI_Jakarta,
  scale:1000,
  xProperty:'system:time_start'})
  .setOptions({
    title:'NO2 Maksimum Harian Sept 2021',
    vAxis:{title:'NO2 µmol/m2'}});
//print(harian21, 'NO2 Maksimum Harian Sept 2021');
//-----------------------------------Okt 2021-------------------------------------//
var start22 = ee.Date('2021-10-01'); // 01 Okt 2021
var end22 = ee.Date('2021-10-31'); // 31 Okt 2021
//Membuat fungsi konversi satuan mol ke mikromol
function mikromol22(image){
  return image.multiply(1000000)
  .copyProperties(image,['system:time_start']);
}
//Membuat variabel waktu per hari, per bulan, dan per tahun
var ndays22 = ee.Number(end22.difference(start22,'day')).round();
var nmonths22 = ee.Number(end22.difference(start22,'month')).round();
//print(ndays22, 'ndays22');
//print(nmonths22, 'nmonths22');
//------------------------------Memanggil Data Citra------------------------------------//
// mengimpor data citra Sentinel-5P
// memilih Band:"NO2_column_number_density"dengan rentang waktu yang ditentukan pada variabel waktu
var NO2 = ee.ImageCollection("COPERNICUS/S5P/OFFL/L3_NO2")
    .select("NO2_column_number_density")
    .filterDate(start22,end22)
    .filterBounds(DKI_Jakarta);
//print(NO2);
//Mengubah satuan dari mol ke mikromol
var NO2_mikromol22 = NO2.map(mikromol22);
//Menerapkan fungsi harian ke seluruh image
var bydays22 = ee.ImageCollection(
  ee.List.sequence(0,ndays22).map(function(n){
    var startday22 = start22.advance(n,'day');
    var endday22 = startday22.advance(1,'day');
    return NO2_mikromol22.filterDate(startday22,endday22)
              .select(0).max()
              .set('system:time_start',startday22);
  }));
//print(bydays22, 'Okt 2021');
//Menerapkan fungsi bulanan ke seluruh image
var bymonths22 = ee.ImageCollection(
  ee.List.sequence(0,nmonths22).map(function(n){
    var startmonth22 = start22.advance(n,'month');
    var endmonth22 = startmonth22.advance(1,'month');
    return bydays22.filterDate(startmonth22,endmonth22)
                 .select(0).mean()
                 .set('system:time_start',startmonth22);
  }));
//print(bymonths22, 'Okt 2021');
//Membuat grafik spasio temporal data Nitrogen Dioksida maksimum harian
var harian22 = ui.Chart.image.series({
  imageCollection: bydays22,
  region:DKI_Jakarta,
  scale:1000,
  xProperty:'system:time_start'})
  .setOptions({
    title:'NO2 Maksimum Harian Okt 2021',
    vAxis:{title:'NO2 µmol/m2'}});
//print(harian22, 'NO2 Maksimum Harian Okt 2021');
//-----------------------------------Nov 2021-------------------------------------//
var start23 = ee.Date('2021-11-01'); // 01 Nov 2021
var end23 = ee.Date('2021-11-30'); // 30 Nov 2021
//Membuat fungsi konversi satuan mol ke mikromol
function mikromol23(image){
  return image.multiply(1000000)
  .copyProperties(image,['system:time_start']);
}
//Membuat variabel waktu per hari, per bulan, dan per tahun
var ndays23 = ee.Number(end23.difference(start23,'day')).round();
var nmonths23 = ee.Number(end23.difference(start23,'month')).round();
//print(ndays23, 'ndays23');
//print(nmonths23, 'nmonths23');
//------------------------------Memanggil Data Citra------------------------------------//
// mengimpor data citra Sentinel-5P
// memilih Band:"NO2_column_number_density"dengan rentang waktu yang ditentukan pada variabel waktu
var NO2 = ee.ImageCollection("COPERNICUS/S5P/OFFL/L3_NO2")
    .select("NO2_column_number_density")
    .filterDate(start23,end23)
    .filterBounds(DKI_Jakarta);
//print(NO2);
//Mengubah satuan dari mol ke mikromol
var NO2_mikromol23 = NO2.map(mikromol23);
//Menerapkan fungsi harian ke seluruh image
var bydays23 = ee.ImageCollection(
  ee.List.sequence(0,ndays23).map(function(n){
    var startday23 = start23.advance(n,'day');
    var endday23 = startday23.advance(1,'day');
    return NO2_mikromol23.filterDate(startday23,endday23)
              .select(0).max()
              .set('system:time_start',startday23);
  }));
//print(bydays23, 'Nov 2021');
//Menerapkan fungsi bulanan ke seluruh image
var bymonths23 = ee.ImageCollection(
  ee.List.sequence(0,nmonths23).map(function(n){
    var startmonth23 = start23.advance(n,'month');
    var endmonth23 = startmonth23.advance(1,'month');
    return bydays23.filterDate(startmonth23,endmonth23)
                 .select(0).mean()
                 .set('system:time_start',startmonth23);
  }));
//print(bymonths23, 'Nov 2021');
//Membuat grafik spasio temporal data Nitrogen Dioksida maksimum harian
var harian23 = ui.Chart.image.series({
  imageCollection: bydays23,
  region:DKI_Jakarta,
  scale:1000,
  xProperty:'system:time_start'})
  .setOptions({
    title:'NO2 Maksimum Harian Nov 2021',
    vAxis:{title:'NO2 µmol/m2'}});
//print(harian23, 'NO2 Maksimum Harian Nov 2021');
//----------------------------------- Des 2021-------------------------------------//
var start24 = ee.Date('2021-12-01'); // 01 Des 2021
var end24 = ee.Date('2021-12-31'); // 31 Des 2021
//Membuat fungsi konversi satuan mol ke mikromol
function mikromol24(image){
  return image.multiply(1000000)
  .copyProperties(image,['system:time_start']);
}
//Membuat variabel waktu per hari, per bulan, dan per tahun
var ndays24 = ee.Number(end24.difference(start24,'day')).round();
var nmonths24 = ee.Number(end24.difference(start24,'month')).round();
//print(ndays24, 'ndays24');
//print(nmonths24, 'nmonths24');
//------------------------------Memanggil Data Citra------------------------------------//
// mengimpor data citra Sentinel-5P
// memilih Band:"NO2_column_number_density"dengan rentang waktu yang ditentukan pada variabel waktu
var NO2 = ee.ImageCollection("COPERNICUS/S5P/OFFL/L3_NO2")
    .select("NO2_column_number_density")
    .filterDate(start24,end24)
    .filterBounds(DKI_Jakarta);
//print(NO2);
//Mengubah satuan dari mol ke mikromol
var NO2_mikromol24 = NO2.map(mikromol24);
//Menerapkan fungsi harian ke seluruh image
var bydays24 = ee.ImageCollection(
  ee.List.sequence(0,ndays24).map(function(n){
    var startday24 = start24.advance(n,'day');
    var endday24 = startday24.advance(1,'day');
    return NO2_mikromol24.filterDate(startday24,endday24)
              .select(0).max()
              .set('system:time_start',startday24);
  }));
//print(bydays24, 'Des 2021');
//Menerapkan fungsi bulanan ke seluruh image
var bymonths24 = ee.ImageCollection(
  ee.List.sequence(0,nmonths24).map(function(n){
    var startmonth24 = start24.advance(n,'month');
    var endmonth24 = startmonth24.advance(1,'month');
    return bydays24.filterDate(startmonth24,endmonth24)
                 .select(0).mean()
                 .set('system:time_start',startmonth24);
  }));
//print(bymonths24, 'Des 2021');
//Membuat grafik spasio temporal data Nitrogen Dioksida maksimum harian
var harian24 = ui.Chart.image.series({
  imageCollection: bydays24,
  region:DKI_Jakarta,
  scale:1000,
  xProperty:'system:time_start'})
  .setOptions({
    title:'NO2 Maksimum Harian Des 2021',
    vAxis:{title:'NO2 µmol/m2'}});
//print(harian24, 'NO2 Maksimum Harian Des 2021');
//------------------------------------------------------------------------------//
//Mengatur parameter visualisasi NO2 Rerata Bulanan 
var parameter = {min:20, max:300, palette:['008000', 'FFFF00','FF0000','8B0000']};
//Memvisualisasikan Nitrogen Dioksida rerata bulanan
Map.addLayer (ee.Image(bymonths1.first()).clip(DKI_Jakarta),parameter,'NO2 Januari 2020');
Map.addLayer (ee.Image(bymonths2.first()).clip(DKI_Jakarta),parameter,'NO2 Februari 2020');
Map.addLayer (ee.Image(bymonths3.first()).clip(DKI_Jakarta),parameter,'NO2 Maret 2020');
Map.addLayer (ee.Image(bymonths4.first()).clip(DKI_Jakarta),parameter,'NO2 April 2020');
Map.addLayer (ee.Image(bymonths5.first()).clip(DKI_Jakarta),parameter,'NO2 Mei 2020');
Map.addLayer (ee.Image(bymonths6.first()).clip(DKI_Jakarta),parameter,'NO2 Juni 2020');
Map.addLayer (ee.Image(bymonths7.first()).clip(DKI_Jakarta),parameter,'NO2 Juli 2020');
Map.addLayer (ee.Image(bymonths8.first()).clip(DKI_Jakarta),parameter,'NO2 Agustus 2020');
Map.addLayer (ee.Image(bymonths9.first()).clip(DKI_Jakarta),parameter,'NO2 September 2020');
Map.addLayer (ee.Image(bymonths10.first()).clip(DKI_Jakarta),parameter,'NO2 Oktober 2020');
Map.addLayer (ee.Image(bymonths11.first()).clip(DKI_Jakarta),parameter,'NO2 November 2020');
Map.addLayer (ee.Image(bymonths12.first()).clip(DKI_Jakarta),parameter,'NO2 Desember 2020');
Map.addLayer (ee.Image(bymonths13.first()).clip(DKI_Jakarta),parameter,'NO2 Januari 2021');
Map.addLayer (ee.Image(bymonths14.first()).clip(DKI_Jakarta),parameter,'NO2 Februari 2021');
Map.addLayer (ee.Image(bymonths15.first()).clip(DKI_Jakarta),parameter,'NO2 Maret 2021');
Map.addLayer (ee.Image(bymonths16.first()).clip(DKI_Jakarta),parameter,'NO2 April 2021');
Map.addLayer (ee.Image(bymonths17.first()).clip(DKI_Jakarta),parameter,'NO2 Mei 2021');
Map.addLayer (ee.Image(bymonths18.first()).clip(DKI_Jakarta),parameter,'NO2 Juni 2021');
Map.addLayer (ee.Image(bymonths19.first()).clip(DKI_Jakarta),parameter,'NO2 Juli 2021');
Map.addLayer (ee.Image(bymonths20.first()).clip(DKI_Jakarta),parameter,'NO2 Agustus 2021');
Map.addLayer (ee.Image(bymonths21.first()).clip(DKI_Jakarta),parameter,'NO2 September 2021');
Map.addLayer (ee.Image(bymonths21.first()).clip(DKI_Jakarta),parameter,'NO2 Oktober 2021');
Map.addLayer (ee.Image(bymonths23.first()).clip(DKI_Jakarta),parameter,'NO2 November 2021');
Map.addLayer (ee.Image(bymonths24.first()).clip(DKI_Jakarta),parameter,'NO2 Desember 2021');
//Map.setCenter(106.83,-6.21, 10);
//TOPONIMI 
// Mengambil packages teks dari mas gena
var text = require('users/gena/packages:text');
// Mendefinisikan kembali batas
var shp = ee.FeatureCollection(DKI_Jakarta);
// Mmebuat ukuran label
var Scale = Map.getScale()*0.5;
// Membuat fungsi untuk memanggil semua atribut tabel pada kolom tertentu
// Mengatur pewarnaan dan ukuran teks
var labels = shp.map(function(feat){
  feat = ee.Feature(feat);
  var name = ee.String (feat.get("NAMOBJ"));
  var centroid = feat.geometry().centroid();
  var t = text.draw(name, centroid,Scale,{
    fontSize: 10,
    textColor:'black',
    OutlineWidth:0,
    OutlineColor:'red'
  });
  return t;
  });
// Menjadikan label sebagai gambar
var Labels_Final = ee.ImageCollection(labels);
Map.addLayer(Labels_Final, {}, 'Kota');
//Styling Shapefile in Google Earth Engine
Map.addLayer (ee.Image().paint(DKI_Jakarta, 0, 1), {}, 'Batas Kota Provinsi DKI Jakarta');
// --------------------------------------Create a map panel-----------------------------------//
  var mapPanel = ui.Map();
  // Add these to the interface.
  ui.root.widgets().reset([mapPanel]);
  ui.root.setLayout(ui.Panel.Layout.flow('horizontal'));
  // Add a title and some explanatory text to a side panel.
  var header = ui.Label('"Spatio-temporal Perubahan Konsenstrasi Nitrogen Dioksida (NO2) Selama Masa Pandemi COVID-19 di Provinsi DKI Jakarta"',
                       {fontWeight: 'bold',
                        fontSize: '15px', 
                        color: 'blue', 
                        textAlign: 'center'});
  var text = ui.Label(
            'Spatio-temporal Konsentrasi Nitrogen Dioksida (NO2), diperoleh dari Citra Satelit Sentinel-5P Secara Time Series dari Pengolahan Maksimum Harian kemudian, Rerata Bulanan Pada Tanggal 01 Januari 2020 sampai 31 Desember 2021',
            {fontSize: '12px', textAlign: 'justify'});
  var toolPanel = ui.Panel([header, text], 'flow', {width: '300px'});
// Make a Panel
    var chartPanel = ui.Panel({
                        style: {
                          fontSize: '12px', 
                          margin: '0 0 0 8px', 
                          padding: '0'}
      });
    var charting = {
       'Grafik Nitrogen Dioksida (NO2) Bulan Januari 2020' : harian1,
      'Grafik Nitrogen Dioksida (NO2) Bulan Februari 2020'  : harian2,
      'Grafik Nitrogen Dioksida (NO2) Bulan Maret 2020'     : harian3,
      'Grafik Nitrogen Dioksida (NO2) Bulan April 2020'     : harian4,
      'Grafik Nitrogen Dioksida (NO2) Bulan Mei 2020'       : harian5,
      'Grafik Nitrogen Dioksida (NO2) Bulan Juni 2020'      : harian6,
      'Grafik Nitrogen Dioksida (NO2) Bulan Juli 2020'      : harian7,
      'Grafik Nitrogen Dioksida (NO2) Bulan Agustus 2020'   : harian8,
      'Grafik Nitrogen Dioksida (NO2) Bulan September 2020' : harian9,
      'Grafik Nitrogen Dioksida (NO2) Bulan Oktober 2020'   : harian10,
      'Grafik Nitrogen Dioksida (NO2) Bulan November 2020'  : harian11,
      'Grafik Nitrogen Dioksida (NO2) Bulan Desember 2020'  : harian12,
      'Grafik Nitrogen Dioksida (NO2) Bulan Januari 2021'   : harian13,
      'Grafik Nitrogen Dioksida (NO2) Bulan Februari 2021'  : harian14,
      'Grafik Nitrogen Dioksida (NO2) Bulan Maret 2021'     : harian15,
      'Grafik Nitrogen Dioksida (NO2) Bulan April 2021'     : harian16,
      'Grafik Nitrogen Dioksida (NO2) Bulan Mei 2021'       : harian17,
      'Grafik Nitrogen Dioksida (NO2) Bulan Juni 2021'      : harian18,
      'Grafik Nitrogen Dioksida (NO2) Bulan Juli 2021'      : harian19,
      'Grafik Nitrogen Dioksida (NO2) Bulan Agustus 2021'   : harian20,
      'Grafik Nitrogen Dioksida (NO2) Bulan September 2021' : harian21,
      'Grafik Nitrogen Dioksida (NO2) Bulan Oktober 2021'   : harian22,
      'Grafik Nitrogen Dioksida (NO2) Bulan November 2021'  : harian23,
      'Grafik Nitrogen Dioksida (NO2) Bulan Desember 2021'  : harian24,
    };
    var selectItems = Object.keys(charting);
    var layerSelect = ui.Select({
      items: selectItems,
      value: selectItems[0],
      onChange: function(selected) {
        chartPanel.widgets().set(0,charting[selected]);
      }
    });
  var images = {
      'Nitrogen Dioksida (NO2) Bulan Januari 2020'  : ee.Image(bymonths1.first().clip(DKI_Jakarta),parameter),
      'Nitrogen Dioksida (NO2) Bulan Februari 2020' : ee.Image(bymonths2.first().clip(DKI_Jakarta),parameter),
      'Nitrogen Dioksida (NO2) Bulan Maret 2020'    : ee.Image(bymonths3.first().clip(DKI_Jakarta),parameter),
      'Nitrogen Dioksida (NO2) Bulan April 2020'    : ee.Image(bymonths4.first().clip(DKI_Jakarta),parameter),
      'Nitrogen Dioksida (NO2) Bulan Mei 2020'      : ee.Image(bymonths5.first().clip(DKI_Jakarta),parameter),
      'Nitrogen Dioksida (NO2) Bulan Juni 2020'     : ee.Image(bymonths6.first().clip(DKI_Jakarta),parameter),
      'Nitrogen Dioksida (NO2) Bulan Juli 2020'     : ee.Image(bymonths7.first().clip(DKI_Jakarta),parameter),
      'Nitrogen Dioksida (NO2) Bulan Agustus 2020'  : ee.Image(bymonths8.first().clip(DKI_Jakarta),parameter),
      'Nitrogen Dioksida (NO2) Bulan September 2020': ee.Image(bymonths9.first().clip(DKI_Jakarta),parameter),
      'Nitrogen Dioksida (NO2) Bulan Oktober 2020'  : ee.Image(bymonths10.first().clip(DKI_Jakarta),parameter),
      'Nitrogen Dioksida (NO2) Bulan November 2020' : ee.Image(bymonths11.first().clip(DKI_Jakarta),parameter),
      'Nitrogen Dioksida (NO2) Bulan Desember 2020' : ee.Image(bymonths12.first().clip(DKI_Jakarta),parameter),
      'Nitrogen Dioksida (NO2) Bulan Januari 2021'  : ee.Image(bymonths13.first().clip(DKI_Jakarta),parameter),
      'Nitrogen Dioksida (NO2) Bulan Februari 2021' : ee.Image(bymonths14.first().clip(DKI_Jakarta),parameter),
      'Nitrogen Dioksida (NO2) Bulan Maret 2021'    : ee.Image(bymonths15.first().clip(DKI_Jakarta),parameter),
      'Nitrogen Dioksida (NO2) Bulan April 2021'    : ee.Image(bymonths16.first().clip(DKI_Jakarta),parameter),
      'Nitrogen Dioksida (NO2) Bulan Mei 2021'      : ee.Image(bymonths17.first().clip(DKI_Jakarta),parameter),
      'Nitrogen Dioksida (NO2) Bulan Juni 2021'     : ee.Image(bymonths18.first().clip(DKI_Jakarta),parameter),
      'Nitrogen Dioksida (NO2) Bulan Juli 2021'     : ee.Image(bymonths19.first().clip(DKI_Jakarta),parameter),
      'Nitrogen Dioksida (NO2) Bulan Agustus 2021'  : ee.Image(bymonths20.first().clip(DKI_Jakarta),parameter),
      'Nitrogen Dioksida (NO2) Bulan September 2021': ee.Image(bymonths21.first().clip(DKI_Jakarta),parameter),
      'Nitrogen Dioksida (NO2) Bulan Oktober 2021'  : ee.Image(bymonths22.first().clip(DKI_Jakarta),parameter),
      'Nitrogen Dioksida (NO2) Bulan November 2021' : ee.Image(bymonths23.first().clip(DKI_Jakarta),parameter),
      'Nitrogen Dioksida (NO2) Bulan Desember 2021' : ee.Image(bymonths24.first().clip(DKI_Jakarta),parameter),
 };
// Create the left map, and have it display layer 0.
    var leftMap = ui.Map(center);
    leftMap.setControlVisibility(false);
    var leftSelector = addLayerSelector(leftMap, 0, 'top-left');
    // Create the right map, and have it display layer 1.
    var rightMap = ui.Map(center);
    rightMap.setControlVisibility(false);
    var rightSelector = addLayerSelector(rightMap, 1, 'top-right');
    // Adds a layer selection widget to the given map, to allow users to change
    // which image is displayed in the associated map.
    function addLayerSelector(mapToChange, defaultValue, position) {
      var label = ui.Label('Pilih citra yang akan ditampilkan');
      // This function changes the given map to show the selected image.
      function updateMap(selection) {
        mapToChange.layers().set(0, ui.Map.Layer(images[selection], parameter));
      }
      // Configure a selection dropdown to allow the user to choose between images,
      // and set the map to update when a user makes a selection.
      var select = ui.Select({items: Object.keys(images), onChange: updateMap});
      select.setValue(Object.keys(images)[defaultValue], true);
      var controlPanel =
          ui.Panel({widgets: [label, select], style: {position: position}});
      mapToChange.add(controlPanel);
      }
    // Tie everything together
    // Create a SplitPanel to hold the adjacent, linked maps.
    var splitPanel = ui.SplitPanel({
      firstPanel: leftMap,
      secondPanel: rightMap,
      wipe: true,
      style: {stretch: 'both'}
    });
    // Panel Stuff
      // Set the SplitPanel as the only thing in the UI root.
        ui.root.widgets().reset([splitPanel]);
      //Right Panel
        ui.root.widgets().add(toolPanel);
// Create legend for the data
var viz = {min:20.0, max:300.0, palette:['008000', 'FFFF00','FF0000','8B0000']};
var legend = ui.Panel({
style: {
position: 'bottom-left',
padding: '8px 15px'
}
});
// Create legend title
var legendTitle = ui.Label({
value:'Konsentrasi Nitrogen Dioksida (NO2) (μmol/m²)',
style: {
fontWeight: 'bold',
fontSize: '6 px',
margin: '0 0 4px 0',
padding: '0'
}
});
// Add the title to the panel
legend.add(legendTitle);
// Create and and style the legend
var makeRow = function(color, name) {
// Create the colored box.
var colorBox = ui.Label({
style: {
backgroundColor: '#' + color,
// Use padding to give the box height and width.
padding: '8px',
margin: '0 0 4px 0'
}
});
// Create the label filled with the description text.
var description = ui.Label({
value: name,
style: {margin: '0 0 4px 6px'}
});
// Return the panel
return ui.Panel({
widgets: [colorBox, description],
layout: ui.Panel.Layout.Flow('horizontal')
});
};
var lon = ee.Image.pixelLonLat().select('latitude');
var gradient = lon.multiply((viz.max-viz.min)/100.0).add(viz.min);
var legendImage = gradient.visualize(viz);
// Create text label on top of legend
var panel_max = ui.Panel({
widgets: [
ui.Label(viz['max'])
],
});
legend.add(panel_max);
// Create thumbnail from the image
var thumbnail = ui.Thumbnail({
image: legendImage,
params: {bbox:'0,0,10,100', dimensions:'10x100'},
style: {padding: '1px', position: 'bottom-center'}
});
// Add the thumbnail to the legend
legend.add(thumbnail);
// Create text label on bottom of legend
var panel_min = ui.Panel({
widgets: [
ui.Label(viz['min'])
],
});
legend.add(panel_min);
//Create external reference with link
var link = ui.Label(
'Nitrogen Dioxide (NO2) di Google Earth Engine ', {},
'https://developers.google.com/earth-engine/datasets/catalog/sentinel-5p');
var linkPanel = ui.Panel(
[ui.Label('Informasi Lebih Lanjut', {fontWeight: 'bold'}), link]);
toolPanel.add(legend);
        //chart indices
        toolPanel.add(ui.Label('Pilih Grafik Konsentrasi Nitrogen Dioksida (NO2)', {'fontWeight': 'bold','font-size': '12px','color':'blue'}));
        toolPanel.add(layerSelect);
        //Chart Panel
        toolPanel.add(chartPanel);
        //link Panel
        toolPanel.add(linkPanel);
/*        
//------------------------------------------TOPONIMI----------------------------------//        
var checkbox = ui.Checkbox('Toponimi',true);
checkbox.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(0).setShown(checked);
});
Map.addLayer(ee.Image().paint(DKI_Jakarta, 0, 1), {});
var cb= ui.Panel({
  widgets: [checkbox],
  style:{position:'bottom-left', padding:'10px 16px'}
});
 toolPanel.add(cb);
*/