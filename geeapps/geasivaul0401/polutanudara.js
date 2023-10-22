var Jawa = ui.import && ui.import("Jawa", "table", {
      "id": "users/geasivaul0401/PROVINSI"
    }) || ee.FeatureCollection("users/geasivaul0401/PROVINSI");
//TIM GEOFAST - TEKNIK GEOMATIKA ITS
//Erika - Gea - Febi - Angkatan 2019
//Topik : Pemantauan Kualitas Udara berbasis Web sebagai Rekomendasi RTH 
//        Studi kasus : Pulau Jawa
//Center Map
Map.centerObject(Jawa,8);
//Membuat fungsi konversi satuan mol ke mikromol
function mikromol(image){
  return image.multiply(1000000)
  .copyProperties(image,['system:time_start']);
}
//---------------------------Januari 2021---------------------------
var start1 = ee.Date('2021-01-01'); // 01 Januari 2021
var end1 = ee.Date('2021-01-31'); // 31 Januari 2021
//Membuat variabel waktu per hari, per bulan, dan per tahun
var ndays1 = ee.Number(end1.difference(start1,'day')).round();
var nmonths1 = ee.Number(end1.difference(start1,'month')).round();
//print(ndays1, 'ndays1');
//print(nmonths1, 'nmonths1');
//------Memanggil Data Citra-------//
// mengimpor data citra Sentinel-5P
// memilih Band:"NO2_column_number_density"dengan rentang waktu yang ditentukan pada variabel waktu
var NO2_1 = ee.ImageCollection("COPERNICUS/S5P/OFFL/L3_NO2")
    .select("NO2_column_number_density")
    .filterDate(start1,end1)
    .filterBounds(Jawa);
//print(NO2);
//Mengubah satuan dari mol ke mikromol
var NO2_mikromol1 = NO2_1.map(mikromol);
//Menerapkan fungsi harian ke seluruh image
var bydays1 = ee.ImageCollection(
  ee.List.sequence(0,ndays1).map(function(n){
    var startday1 = start1.advance(n,'day');
    var endday1 = startday1.advance(1,'day');
    return NO2_mikromol1.filterDate(startday1,endday1)
              .select(0).max()
              .set('system:time_start',startday1);
  }));
//print(bydays1, 'Januari 2021');
//Menerapkan fungsi bulanan ke seluruh image
var bymonths1 = ee.ImageCollection(
  ee.List.sequence(0,nmonths1).map(function(n){
    var startmonth1 = start1.advance(n,'month');
    var endmonth1 = startmonth1.advance(1,'month');
    return bydays1.filterDate(startmonth1,endmonth1)
                 .select(0).median()
                 .set('system:time_start',startmonth1);
  }));
//print(bymonths1, 'Januari 2021');
//---------------------------Februari 2021---------------------------
var start2 = ee.Date('2021-02-01'); // 01 Februari 2021
var end2 = ee.Date('2021-02-28'); // 28 Februari 2021
//Membuat variabel waktu per hari, per bulan, dan per tahun
var ndays2 = ee.Number(end2.difference(start2,'day')).round();
var nmonths2 = ee.Number(end2.difference(start2,'month')).round();
//print(ndays2, 'ndays2');
//print(nmonths2, 'nmonths12');
//------------------------------Memanggil Data Citra------------------------------------//
// mengimpor data citra Sentinel-5P
// memilih Band:"NO2_column_number_density"dengan rentang waktu yang ditentukan pada variabel waktu
var NO2_2 = ee.ImageCollection("COPERNICUS/S5P/OFFL/L3_NO2")
    .select("NO2_column_number_density")
    .filterDate(start2,end2)
    .filterBounds(Jawa);
//print(NO2_2);
//Mengubah satuan dari mol ke mikromol
var NO2_mikromol2 = NO2_2.map(mikromol);
//Menerapkan fungsi harian ke seluruh image
var bydays2 = ee.ImageCollection(
  ee.List.sequence(0,ndays2).map(function(n){
    var startday2 = start2.advance(n,'day');
    var endday2 = startday2.advance(1,'day');
    return NO2_mikromol2.filterDate(startday2,endday2)
              .select(0).max()
              .set('system:time_start',startday2);
  }));
//print(bydays2, 'Februari 2021');
//Menerapkan fungsi bulanan ke seluruh image
var bymonths2 = ee.ImageCollection(
  ee.List.sequence(0,nmonths2).map(function(n){
    var startmonth2 = start2.advance(n,'month');
    var endmonth2 = startmonth2.advance(1,'month');
    return bydays2.filterDate(startmonth2,endmonth2)
                 .select(0).median()
                 .set('system:time_start',startmonth2);
  }));
//print(bymonths2, 'Februari 2021');
//---------------------------Maret 2021---------------------------
var start3 = ee.Date('2021-03-01'); // 01 Maret 2021
var end3 = ee.Date('2021-03-31'); // 31 Maret 2021
//Membuat variabel waktu per hari, per bulan, dan per tahun
var ndays3 = ee.Number(end3.difference(start3,'day')).round();
var nmonths3 = ee.Number(end3.difference(start3,'month')).round();
//print(ndays3, 'ndays3');
//print(nmonths3, 'nmonths3');
//------------------------------Memanggil Data Citra------------------------------------//
// mengimpor data citra Sentinel-5P
// memilih Band:"NO2_column_number_density"dengan rentang waktu yang ditentukan pada variabel waktu
var NO2_3 = ee.ImageCollection("COPERNICUS/S5P/OFFL/L3_NO2")
    .select("NO2_column_number_density")
    .filterDate(start3,end3)
    .filterBounds(Jawa);
//print(NO2_3);
//Mengubah satuan dari mol ke mikromol
var NO2_mikromol3 = NO2_3.map(mikromol);
//Menerapkan fungsi harian ke seluruh image
var bydays3 = ee.ImageCollection(
  ee.List.sequence(0,ndays3).map(function(n){
    var startday3 = start3.advance(n,'day');
    var endday3 = startday3.advance(1,'day');
    return NO2_mikromol3.filterDate(startday3,endday3)
              .select(0).max()
              .set('system:time_start',startday3);
  }));
//print(bydays2, 'Maret 2021');
//Menerapkan fungsi bulanan ke seluruh image
var bymonths3 = ee.ImageCollection(
  ee.List.sequence(0,nmonths3).map(function(n){
    var startmonth3 = start3.advance(n,'month');
    var endmonth3 = startmonth3.advance(1,'month');
    return bydays3.filterDate(startmonth3,endmonth3)
                 .select(0).median()
                 .set('system:time_start',startmonth3);
  }));
//print(bymonths3, 'Maret 2021');
//---------------------------April 2021---------------------------
var start4 = ee.Date('2021-04-01'); // 01 April 2021
var end4 = ee.Date('2021-04-30'); // 30 April 2021
//Membuat variabel waktu per hari, per bulan, dan per tahun
var ndays4 = ee.Number(end4.difference(start4,'day')).round();
var nmonths4 = ee.Number(end4.difference(start4,'month')).round();
//print(ndays4, 'ndays4');
//print(nmonths4, 'nmonths4');
//--------------Memanggil Data Citra--------------
// mengimpor data citra Sentinel-5P
// memilih Band:"NO2_column_number_density"dengan rentang waktu yang ditentukan pada variabel waktu
var NO2_4 = ee.ImageCollection("COPERNICUS/S5P/OFFL/L3_NO2")
    .select("NO2_column_number_density")
    .filterDate(start4,end4)
    .filterBounds(Jawa);
//print(NO2_4);
//Mengubah satuan dari mol ke mikromol
var NO2_mikromol4 = NO2_4.map(mikromol);
//Menerapkan fungsi harian ke seluruh image
var bydays4 = ee.ImageCollection(
  ee.List.sequence(0,ndays4).map(function(n){
    var startday4 = start4.advance(n,'day');
    var endday4 = startday4.advance(1,'day');
    return NO2_mikromol4.filterDate(startday4,endday4)
              .select(0).max()
              .set('system:time_start',startday4);
  }));
//print(bydays4, 'April 2021');
//Menerapkan fungsi bulanan ke seluruh image
var bymonths4 = ee.ImageCollection(
  ee.List.sequence(0,nmonths4).map(function(n){
    var startmonth4 = start4.advance(n,'month');
    var endmonth4 = startmonth4.advance(1,'month');
    return bydays4.filterDate(startmonth4,endmonth4)
                 .select(0).median()
                 .set('system:time_start',startmonth4);
  }));
//print(bymonths4, 'April 2021');
//---------------------------Mei 2021---------------------------
var start5 = ee.Date('2021-05-01'); // 01 Mei 2021
var end5 = ee.Date('2021-05-31'); // 31 Mei 2021
//Membuat variabel waktu per hari, per bulan, dan per tahun
var ndays5 = ee.Number(end5.difference(start5,'day')).round();
var nmonths5 = ee.Number(end5.difference(start5,'month')).round();
//print(ndays5, 'ndays5');
//print(nmonths5, 'nmonths5');
//--------------Memanggil Data Citra--------------
// mengimpor data citra Sentinel-5P
// memilih Band:"NO2_column_number_density"dengan rentang waktu yang ditentukan pada variabel waktu
var NO2_5 = ee.ImageCollection("COPERNICUS/S5P/OFFL/L3_NO2")
    .select("NO2_column_number_density")
    .filterDate(start5,end5)
    .filterBounds(Jawa);
//print(NO2_4);
//Mengubah satuan dari mol ke mikromol
var NO2_mikromol5 = NO2_5.map(mikromol);
//Menerapkan fungsi harian ke seluruh image
var bydays5 = ee.ImageCollection(
  ee.List.sequence(0,ndays5).map(function(n){
    var startday5 = start5.advance(n,'day');
    var endday5 = startday5.advance(1,'day');
    return NO2_mikromol5.filterDate(startday5,endday5)
              .select(0).max()
              .set('system:time_start',startday5);
  }));
//print(bydays5, 'Mei 2021');
//Menerapkan fungsi bulanan ke seluruh image
var bymonths5 = ee.ImageCollection(
  ee.List.sequence(0,nmonths5).map(function(n){
    var startmonth5 = start5.advance(n,'month');
    var endmonth5 = startmonth5.advance(1,'month');
    return bydays5.filterDate(startmonth5,endmonth5)
                 .select(0).median()
                 .set('system:time_start',startmonth5);
  }));
//print(bymonths5, 'Mei 2021');
//---------------------------Juni 2021---------------------------
var start6 = ee.Date('2021-06-01'); // 01 Juni 2021
var end6 = ee.Date('2021-06-30'); // 31 Juni 2021
//Membuat variabel waktu per hari, per bulan, dan per tahun
var ndays6 = ee.Number(end6.difference(start6,'day')).round();
var nmonths6 = ee.Number(end6.difference(start6,'month')).round();
//print(ndays6, 'ndays6');
//print(nmonths6, 'nmonths6');
//--------------Memanggil Data Citra--------------
// mengimpor data citra Sentinel-5P
// memilih Band:"NO2_column_number_density"dengan rentang waktu yang ditentukan pada variabel waktu
var NO2_6 = ee.ImageCollection("COPERNICUS/S5P/OFFL/L3_NO2")
    .select("NO2_column_number_density")
    .filterDate(start6,end6)
    .filterBounds(Jawa);
//print(NO2_6);
//Mengubah satuan dari mol ke mikromol
var NO2_mikromol6 = NO2_6.map(mikromol);
//Menerapkan fungsi harian ke seluruh image
var bydays6 = ee.ImageCollection(
  ee.List.sequence(0,ndays6).map(function(n){
    var startday6 = start6.advance(n,'day');
    var endday6 = startday6.advance(1,'day');
    return NO2_mikromol6.filterDate(startday6,endday6)
              .select(0).max()
              .set('system:time_start',startday6);
  }));
//print(bydays6, 'Juni 2021');
//Menerapkan fungsi bulanan ke seluruh image
var bymonths6 = ee.ImageCollection(
  ee.List.sequence(0,nmonths6).map(function(n){
    var startmonth6 = start6.advance(n,'month');
    var endmonth6 = startmonth6.advance(1,'month');
    return bydays6.filterDate(startmonth6,endmonth6)
                 .select(0).median()
                 .set('system:time_start',startmonth6);
  }));
//print(bymonths6, 'Juni 2021');
//---------------------------Juli 2021---------------------------
var start7 = ee.Date('2021-07-01'); // 01 Juli 2021
var end7 = ee.Date('2021-07-31'); // 31 Juli 2021
//Membuat variabel waktu per hari, per bulan, dan per tahun
var ndays7 = ee.Number(end7.difference(start7,'day')).round();
var nmonths7 = ee.Number(end7.difference(start7,'month')).round();
//print(ndays7, 'ndays7');
//print(nmonths7, 'nmonths7');
//--------------Memanggil Data Citra--------------
// mengimpor data citra Sentinel-5P
// memilih Band:"NO2_column_number_density"dengan rentang waktu yang ditentukan pada variabel waktu
var NO2_7 = ee.ImageCollection("COPERNICUS/S5P/OFFL/L3_NO2")
    .select("NO2_column_number_density")
    .filterDate(start7,end7)
    .filterBounds(Jawa);
//print(NO2_7);
//Mengubah satuan dari mol ke mikromol
var NO2_mikromol7 = NO2_7.map(mikromol);
//Menerapkan fungsi harian ke seluruh image
var bydays7 = ee.ImageCollection(
  ee.List.sequence(0,ndays7).map(function(n){
    var startday7 = start7.advance(n,'day');
    var endday7 = startday7.advance(1,'day');
    return NO2_mikromol7.filterDate(startday7,endday7)
              .select(0).max()
              .set('system:time_start',startday7);
  }));
//print(bydays7, 'Juli 2021');
//Menerapkan fungsi bulanan ke seluruh image
var bymonths7 = ee.ImageCollection(
  ee.List.sequence(0,nmonths7).map(function(n){
    var startmonth7 = start7.advance(n,'month');
    var endmonth7 = startmonth7.advance(1,'month');
    return bydays7.filterDate(startmonth7,endmonth7)
                 .select(0).median()
                 .set('system:time_start',startmonth7);
  }));
//print(bymonths7, 'Juli 2021');
//---------------------------Agustus 2021---------------------------
var start8 = ee.Date('2021-08-01'); // 01 Agustus 2021
var end8 = ee.Date('2021-08-31'); // 31 Agustus 2021
//Membuat variabel waktu per hari, per bulan, dan per tahun
var ndays8 = ee.Number(end8.difference(start8,'day')).round();
var nmonths8 = ee.Number(end8.difference(start8,'month')).round();
//print(ndays8, 'ndays8');
//print(nmonths8, 'nmonths8');
//--------------Memanggil Data Citra--------------
// mengimpor data citra Sentinel-5P
// memilih Band:"NO2_column_number_density"dengan rentang waktu yang ditentukan pada variabel waktu
var NO2_8 = ee.ImageCollection("COPERNICUS/S5P/OFFL/L3_NO2")
    .select("NO2_column_number_density")
    .filterDate(start8,end8)
    .filterBounds(Jawa);
//print(NO2_8);
//Mengubah satuan dari mol ke mikromol
var NO2_mikromol8 = NO2_8.map(mikromol);
//Menerapkan fungsi harian ke seluruh image
var bydays8 = ee.ImageCollection(
  ee.List.sequence(0,ndays8).map(function(n){
    var startday8 = start8.advance(n,'day');
    var endday8 = startday8.advance(1,'day');
    return NO2_mikromol8.filterDate(startday8,endday8)
              .select(0).max()
              .set('system:time_start',startday8);
  }));
//print(bydays8, 'Agustus 2021');
//Menerapkan fungsi bulanan ke seluruh image
var bymonths8 = ee.ImageCollection(
  ee.List.sequence(0,nmonths8).map(function(n){
    var startmonth8 = start8.advance(n,'month');
    var endmonth8 = startmonth8.advance(1,'month');
    return bydays8.filterDate(startmonth8,endmonth8)
                 .select(0).median()
                 .set('system:time_start',startmonth8);
  }));
//print(bymonths8, 'Agustus 2021');
//---------------------------September 2021---------------------------
var start9 = ee.Date('2021-09-01'); // 01 Agustus 2021
var end9 = ee.Date('2021-09-30'); // 31 Agustus 2021
//Membuat variabel waktu per hari, per bulan, dan per tahun
var ndays9 = ee.Number(end9.difference(start9,'day')).round();
var nmonths9 = ee.Number(end9.difference(start9,'month')).round();
//print(ndays9, 'ndays9');
//print(nmonths9, 'nmonths9');
//--------------Memanggil Data Citra--------------
// mengimpor data citra Sentinel-5P
// memilih Band:"NO2_column_number_density"dengan rentang waktu yang ditentukan pada variabel waktu
var NO2_9 = ee.ImageCollection("COPERNICUS/S5P/OFFL/L3_NO2")
    .select("NO2_column_number_density")
    .filterDate(start9,end9)
    .filterBounds(Jawa);
//print(NO2_9);
//Mengubah satuan dari mol ke mikromol
var NO2_mikromol9 = NO2_9.map(mikromol);
//Menerapkan fungsi harian ke seluruh image
var bydays9 = ee.ImageCollection(
  ee.List.sequence(0,ndays9).map(function(n){
    var startday9 = start9.advance(n,'day');
    var endday9 = startday9.advance(1,'day');
    return NO2_mikromol9.filterDate(startday9,endday9)
              .select(0).max()
              .set('system:time_start',startday9);
  }));
//print(bydays9, 'September 2021');
//Menerapkan fungsi bulanan ke seluruh image
var bymonths9 = ee.ImageCollection(
  ee.List.sequence(0,nmonths9).map(function(n){
    var startmonth9 = start9.advance(n,'month');
    var endmonth9 = startmonth9.advance(1,'month');
    return bydays9.filterDate(startmonth9,endmonth9)
                 .select(0).median()
                 .set('system:time_start',startmonth9);
  }));
//print(bymonths9, 'September 2021');
//---------------------------Oktober 2021---------------------------
var start10 = ee.Date('2021-10-01'); // 01 Agustus 2021
var end10 = ee.Date('2021-10-31'); // 31 Agustus 2021
//Membuat variabel waktu per hari, per bulan, dan per tahun
var ndays10 = ee.Number(end10.difference(start10,'day')).round();
var nmonths10 = ee.Number(end10.difference(start10,'month')).round();
//print(ndays10, 'ndays10');
//print(nmonths10, 'nmonths10');
//--------------Memanggil Data Citra--------------
// mengimpor data citra Sentinel-5P
// memilih Band:"NO2_column_number_density"dengan rentang waktu yang ditentukan pada variabel waktu
var NO2_10 = ee.ImageCollection("COPERNICUS/S5P/OFFL/L3_NO2")
    .select("NO2_column_number_density")
    .filterDate(start10,end10)
    .filterBounds(Jawa);
//print(NO2_10);
//Mengubah satuan dari mol ke mikromol
var NO2_mikromol10 = NO2_10.map(mikromol);
//Menerapkan fungsi harian ke seluruh image
var bydays10 = ee.ImageCollection(
  ee.List.sequence(0,ndays10).map(function(n){
    var startday10 = start10.advance(n,'day');
    var endday10 = startday10.advance(1,'day');
    return NO2_mikromol10.filterDate(startday10,endday10)
              .select(0).max()
              .set('system:time_start',startday10);
  }));
//print(bydays10, 'Oktober 2021');
//Menerapkan fungsi bulanan ke seluruh image
var bymonths10 = ee.ImageCollection(
  ee.List.sequence(0,nmonths10).map(function(n){
    var startmonth10 = start10.advance(n,'month');
    var endmonth10 = startmonth10.advance(1,'month');
    return bydays10.filterDate(startmonth10,endmonth10)
                 .select(0).median()
                 .set('system:time_start',startmonth10);
  }));
//print(bymonths10, 'Oktober 2021');
//---------------------------November 2021---------------------------
var start11 = ee.Date('2021-11-01'); // 01 Agustus 2021
var end11 = ee.Date('2021-11-30'); // 31 Agustus 2021
//Membuat variabel waktu per hari, per bulan, dan per tahun
var ndays11 = ee.Number(end11.difference(start11,'day')).round();
var nmonths11 = ee.Number(end11.difference(start11,'month')).round();
//print(ndays11, 'ndays11');
//print(nmonths11, 'nmonths11');
//--------------Memanggil Data Citra--------------
// mengimpor data citra Sentinel-5P
// memilih Band:"NO2_column_number_density"dengan rentang waktu yang ditentukan pada variabel waktu
var NO2_11 = ee.ImageCollection("COPERNICUS/S5P/OFFL/L3_NO2")
    .select("NO2_column_number_density")
    .filterDate(start11,end11)
    .filterBounds(Jawa);
//print(NO2_11);
//Mengubah satuan dari mol ke mikromol
var NO2_mikromol11 = NO2_11.map(mikromol);
//Menerapkan fungsi harian ke seluruh image
var bydays11 = ee.ImageCollection(
  ee.List.sequence(0,ndays11).map(function(n){
    var startday11 = start11.advance(n,'day');
    var endday11 = startday11.advance(1,'day');
    return NO2_mikromol11.filterDate(startday11,endday11)
              .select(0).max()
              .set('system:time_start',startday11);
  }));
//print(bydays11, 'NOvember 2021');
//Menerapkan fungsi bulanan ke seluruh image
var bymonths11 = ee.ImageCollection(
  ee.List.sequence(0,nmonths11).map(function(n){
    var startmonth11 = start11.advance(n,'month');
    var endmonth11 = startmonth11.advance(1,'month');
    return bydays11.filterDate(startmonth11,endmonth11)
                 .select(0).median()
                 .set('system:time_start',startmonth11);
  }));
//print(bymonths11, 'NOvember 2021');
//---------------------------Desember 2021---------------------------
var start12 = ee.Date('2021-12-01'); // 01 Agustus 2021
var end12 = ee.Date('2021-12-31'); // 31 Agustus 2021
//Membuat variabel waktu per hari, per bulan, dan per tahun
var ndays12 = ee.Number(end12.difference(start12,'day')).round();
var nmonths12 = ee.Number(end12.difference(start12,'month')).round();
//print(ndays12, 'ndays12');
//print(nmonths12, 'nmonths12');
//--------------Memanggil Data Citra--------------
// mengimpor data citra Sentinel-5P
// memilih Band:"NO2_column_number_density"dengan rentang waktu yang ditentukan pada variabel waktu
var NO2_12 = ee.ImageCollection("COPERNICUS/S5P/OFFL/L3_NO2")
    .select("NO2_column_number_density")
    .filterDate(start12,end12)
    .filterBounds(Jawa);
//print(NO2_12);
//Mengubah satuan dari mol ke mikromol
var NO2_mikromol12 = NO2_12.map(mikromol);
//Menerapkan fungsi harian ke seluruh image
var bydays12 = ee.ImageCollection(
  ee.List.sequence(0,ndays12).map(function(n){
    var startday12 = start12.advance(n,'day');
    var endday12 = startday12.advance(1,'day');
    return NO2_mikromol12.filterDate(startday12,endday12)
              .select(0).max()
              .set('system:time_start',startday12);
  }));
//print(bydays12, 'Desember 2021');
//Menerapkan fungsi bulanan ke seluruh image
var bymonths12 = ee.ImageCollection(
  ee.List.sequence(0,nmonths12).map(function(n){
    var startmonth12 = start12.advance(n,'month');
    var endmonth12 = startmonth12.advance(1,'month');
    return bydays12.filterDate(startmonth12,endmonth12)
                 .select(0).median()
                 .set('system:time_start',startmonth12);
  }));
//print(bymonths12, 'Desember 2021');
//---------------------------Januari 2022---------------------------
var start13 = ee.Date('2022-01-01'); // 01 Agustus 2021
var end13 = ee.Date('2022-01-31'); // 31 Agustus 2021
//Membuat variabel waktu per hari, per bulan, dan per tahun
var ndays13 = ee.Number(end13.difference(start13,'day')).round();
var nmonths13 = ee.Number(end13.difference(start13,'month')).round();
//print(ndays13, 'ndays13');
//print(nmonths13, 'nmonths13');
//--------------Memanggil Data Citra--------------
// mengimpor data citra Sentinel-5P
// memilih Band:"NO2_column_number_density"dengan rentang waktu yang ditentukan pada variabel waktu
var NO2_13 = ee.ImageCollection("COPERNICUS/S5P/OFFL/L3_NO2")
    .select("NO2_column_number_density")
    .filterDate(start13,end13)
    .filterBounds(Jawa);
//print(NO2_13);
//Mengubah satuan dari mol ke mikromol
var NO2_mikromol13 = NO2_13.map(mikromol);
//Menerapkan fungsi harian ke seluruh image
var bydays13 = ee.ImageCollection(
  ee.List.sequence(0,ndays13).map(function(n){
    var startday13 = start13.advance(n,'day');
    var endday13 = startday13.advance(1,'day');
    return NO2_mikromol13.filterDate(startday13,endday13)
              .select(0).max()
              .set('system:time_start',startday13);
  }));
//print(bydays13, 'Januari 2022');
//Menerapkan fungsi bulanan ke seluruh image
var bymonths13 = ee.ImageCollection(
  ee.List.sequence(0,nmonths13).map(function(n){
    var startmonth13 = start13.advance(n,'month');
    var endmonth13 = startmonth13.advance(1,'month');
    return bydays13.filterDate(startmonth13,endmonth13)
                 .select(0).median()
                 .set('system:time_start',startmonth13);
  }));
//print(bymonths13, 'Januari 2022');
//---------------------------Februari 2022---------------------------
var start14 = ee.Date('2022-02-01'); // 01 Agustus 2021
var end14 = ee.Date('2022-02-28'); // 31 Agustus 2021
//Membuat variabel waktu per hari, per bulan, dan per tahun
var ndays14 = ee.Number(end14.difference(start14,'day')).round();
var nmonths14 = ee.Number(end14.difference(start14,'month')).round();
//print(ndays14, 'ndays14');
//print(nmonths14, 'nmonths14');
//--------------Memanggil Data Citra--------------
// mengimpor data citra Sentinel-5P
// memilih Band:"NO2_column_number_density"dengan rentang waktu yang ditentukan pada variabel waktu
var NO2_14 = ee.ImageCollection("COPERNICUS/S5P/OFFL/L3_NO2")
    .select("NO2_column_number_density")
    .filterDate(start14,end14)
    .filterBounds(Jawa);
//print(NO2_14);
//Mengubah satuan dari mol ke mikromol
var NO2_mikromol14 = NO2_14.map(mikromol);
//Menerapkan fungsi harian ke seluruh image
var bydays14 = ee.ImageCollection(
  ee.List.sequence(0,ndays14).map(function(n){
    var startday14 = start14.advance(n,'day');
    var endday14 = startday14.advance(1,'day');
    return NO2_mikromol14.filterDate(startday14,endday14)
              .select(0).max()
              .set('system:time_start',startday14);
  }));
//print(bydays14, 'Februari 2022');
//Menerapkan fungsi bulanan ke seluruh image
var bymonths14 = ee.ImageCollection(
  ee.List.sequence(0,nmonths14).map(function(n){
    var startmonth14 = start14.advance(n,'month');
    var endmonth14 = startmonth14.advance(1,'month');
    return bydays14.filterDate(startmonth14,endmonth14)
                 .select(0).median()
                 .set('system:time_start',startmonth14);
  }));
//print(bymonths14, 'Februari 2022');
//---------------------------Maret 2022---------------------------
var start15 = ee.Date('2022-03-01'); // 01 Agustus 2021
var end15 = ee.Date('2022-03-31'); // 31 Agustus 2021
//Membuat variabel waktu per hari, per bulan, dan per tahun
var ndays15 = ee.Number(end15.difference(start15,'day')).round();
var nmonths15 = ee.Number(end15.difference(start15,'month')).round();
//print(ndays15, 'ndays15');
//print(nmonths15, 'nmonths15');
//--------------Memanggil Data Citra--------------
// mengimpor data citra Sentinel-5P
// memilih Band:"NO2_column_number_density"dengan rentang waktu yang ditentukan pada variabel waktu
var NO2_15 = ee.ImageCollection("COPERNICUS/S5P/OFFL/L3_NO2")
    .select("NO2_column_number_density")
    .filterDate(start15,end15)
    .filterBounds(Jawa);
//print(NO2_15);
//Mengubah satuan dari mol ke mikromol
var NO2_mikromol15 = NO2_15.map(mikromol);
//Menerapkan fungsi harian ke seluruh image
var bydays15 = ee.ImageCollection(
  ee.List.sequence(0,ndays15).map(function(n){
    var startday15 = start15.advance(n,'day');
    var endday15 = startday15.advance(1,'day');
    return NO2_mikromol15.filterDate(startday15,endday15)
              .select(0).max()
              .set('system:time_start',startday15);
  }));
//print(bydays15, 'Maret 2022');
//Menerapkan fungsi bulanan ke seluruh image
var bymonths15 = ee.ImageCollection(
  ee.List.sequence(0,nmonths15).map(function(n){
    var startmonth15 = start15.advance(n,'month');
    var endmonth15 = startmonth15.advance(1,'month');
    return bydays15.filterDate(startmonth15,endmonth15)
                 .select(0).median()
                 .set('system:time_start',startmonth15);
  }));
//print(bymonths15, 'Maret 2022');
//---------------------------April 2022---------------------------
var start16 = ee.Date('2022-04-01'); // 01 Agustus 2021
var end16 = ee.Date('2022-04-30'); // 31 Agustus 2021
//Membuat variabel waktu per hari, per bulan, dan per tahun
var ndays16 = ee.Number(end16.difference(start16,'day')).round();
var nmonths16 = ee.Number(end16.difference(start16,'month')).round();
//print(ndays16, 'ndays16');
//print(nmonths16, 'nmonths16');
//--------------Memanggil Data Citra--------------
// mengimpor data citra Sentinel-5P
// memilih Band:"NO2_column_number_density"dengan rentang waktu yang ditentukan pada variabel waktu
var NO2_16 = ee.ImageCollection("COPERNICUS/S5P/OFFL/L3_NO2")
    .select("NO2_column_number_density")
    .filterDate(start16,end16)
    .filterBounds(Jawa);
//print(NO2_16);
//Mengubah satuan dari mol ke mikromol
var NO2_mikromol16 = NO2_16.map(mikromol);
//Menerapkan fungsi harian ke seluruh image
var bydays16 = ee.ImageCollection(
  ee.List.sequence(0,ndays16).map(function(n){
    var startday16 = start16.advance(n,'day');
    var endday16 = startday16.advance(1,'day');
    return NO2_mikromol16.filterDate(startday16,endday16)
              .select(0).max()
              .set('system:time_start',startday16);
  }));
//print(bydays16, 'April 2022');
//Menerapkan fungsi bulanan ke seluruh image
var bymonths16 = ee.ImageCollection(
  ee.List.sequence(0,nmonths16).map(function(n){
    var startmonth16 = start16.advance(n,'month');
    var endmonth16 = startmonth16.advance(1,'month');
    return bydays16.filterDate(startmonth16,endmonth16)
                 .select(0).median()
                 .set('system:time_start',startmonth16);
  }));
//print(bymonths16, 'April 2022');
//---------------------------Mei 2022---------------------------
var start17 = ee.Date('2022-05-01'); // 01 Agustus 2021
var end17 = ee.Date('2022-05-31'); // 31 Agustus 2021
//Membuat variabel waktu per hari, per bulan, dan per tahun
var ndays17 = ee.Number(end17.difference(start17,'day')).round();
var nmonths17 = ee.Number(end17.difference(start17,'month')).round();
//print(ndays17, 'ndays17');
//print(nmonths17, 'nmonths17');
//--------------Memanggil Data Citra--------------
// mengimpor data citra Sentinel-5P
// memilih Band:"NO2_column_number_density"dengan rentang waktu yang ditentukan pada variabel waktu
var NO2_17 = ee.ImageCollection("COPERNICUS/S5P/OFFL/L3_NO2")
    .select("NO2_column_number_density")
    .filterDate(start17,end17)
    .filterBounds(Jawa);
//print(NO2_17);
//Mengubah satuan dari mol ke mikromol
var NO2_mikromol17 = NO2_17.map(mikromol);
//Menerapkan fungsi harian ke seluruh image
var bydays17 = ee.ImageCollection(
  ee.List.sequence(0,ndays17).map(function(n){
    var startday17 = start17.advance(n,'day');
    var endday17 = startday17.advance(1,'day');
    return NO2_mikromol17.filterDate(startday17,endday17)
              .select(0).max()
              .set('system:time_start',startday17);
  }));
print(bydays17, 'Mei 2022');
//Menerapkan fungsi bulanan ke seluruh image
var bymonths17 = ee.ImageCollection(
  ee.List.sequence(0,nmonths17).map(function(n){
    var startmonth17 = start17.advance(n,'month');
    var endmonth17 = startmonth17.advance(1,'month');
    return bydays17.filterDate(startmonth17,endmonth17)
                 .select(0).median()
                 .set('system:time_start',startmonth17);
  }));
//print(bymonths17, 'Mei 2022');
//---------------------------Juni 2022---------------------------
var start18 = ee.Date('2022-06-01'); // 01 Agustus 2021
var end18 = ee.Date('2022-06-30'); // 31 Agustus 2021
//Membuat variabel waktu per hari, per bulan, dan per tahun
var ndays18 = ee.Number(end18.difference(start18,'day')).round();
var nmonths18 = ee.Number(end18.difference(start18,'month')).round();
//print(ndays18, 'ndays18');
//print(nmonths18, 'nmonths18');
//--------------Memanggil Data Citra--------------
// mengimpor data citra Sentinel-5P
// memilih Band:"NO2_column_number_density"dengan rentang waktu yang ditentukan pada variabel waktu
var NO2_18 = ee.ImageCollection("COPERNICUS/S5P/OFFL/L3_NO2")
    .select("NO2_column_number_density")
    .filterDate(start18,end18)
    .filterBounds(Jawa);
//print(NO2_18);
//Mengubah satuan dari mol ke mikromol
var NO2_mikromol18 = NO2_18.map(mikromol);
//Menerapkan fungsi harian ke seluruh image
var bydays18 = ee.ImageCollection(
  ee.List.sequence(0,ndays18).map(function(n){
    var startday18 = start18.advance(n,'day');
    var endday18 = startday18.advance(1,'day');
    return NO2_mikromol18.filterDate(startday18,endday18)
              .select(0).max()
              .set('system:time_start',startday18);
  }));
//print(bydays18, 'Juni 2022');
//Menerapkan fungsi bulanan ke seluruh image
var bymonths18 = ee.ImageCollection(
  ee.List.sequence(0,nmonths18).map(function(n){
    var startmonth18 = start18.advance(n,'month');
    var endmonth18 = startmonth18.advance(1,'month');
    return bydays18.filterDate(startmonth18,endmonth18)
                 .select(0).median()
                 .set('system:time_start',startmonth18);
  }));
//print(bymonths18, 'Juni 2022');
//---------------------------Juli 2022---------------------------
var start19 = ee.Date('2022-07-01'); // 01 Agustus 2021
var end19 = ee.Date('2022-07-31'); // 31 Agustus 2021
//Membuat variabel waktu per hari, per bulan, dan per tahun
var ndays19 = ee.Number(end19.difference(start19,'day')).round();
var nmonths19 = ee.Number(end19.difference(start19,'month')).round();
//print(ndays19, 'ndays19');
//print(nmonths19, 'nmonths19');
//--------------Memanggil Data Citra--------------
// mengimpor data citra Sentinel-5P
// memilih Band:"NO2_column_number_density"dengan rentang waktu yang ditentukan pada variabel waktu
var NO2_19 = ee.ImageCollection("COPERNICUS/S5P/OFFL/L3_NO2")
    .select("NO2_column_number_density")
    .filterDate(start19,end19)
    .filterBounds(Jawa);
//print(NO2_19);
//Mengubah satuan dari mol ke mikromol
var NO2_mikromol19 = NO2_19.map(mikromol);
//Menerapkan fungsi harian ke seluruh image
var bydays19 = ee.ImageCollection(
  ee.List.sequence(0,ndays19).map(function(n){
    var startday19 = start19.advance(n,'day');
    var endday19 = startday19.advance(1,'day');
    return NO2_mikromol19.filterDate(startday19,endday19)
              .select(0).max()
              .set('system:time_start',startday19);
  }));
//print(bydays19, 'Juli 2022');
//Menerapkan fungsi bulanan ke seluruh image
var bymonths19 = ee.ImageCollection(
  ee.List.sequence(0,nmonths19).map(function(n){
    var startmonth19 = start19.advance(n,'month');
    var endmonth19 = startmonth19.advance(1,'month');
    return bydays19.filterDate(startmonth19,endmonth19)
                 .select(0).median()
                 .set('system:time_start',startmonth19);
  }));
print(bymonths19, 'Juli 2022');
//Mengatur parameter visualisasi NO2 Rerata Bulanan 
var parameter = {min:20, max:300, palette:['008000', 'FFFF00','FF0000','8B0000']};
Map.addLayer (ee.Image(bymonths1.first()).clip(Jawa),parameter,'NO2 Januari 2021',false);
Map.addLayer (ee.Image(bymonths2.first()).clip(Jawa),parameter,'NO2 Februari 2021',false);
Map.addLayer (ee.Image(bymonths3.first()).clip(Jawa),parameter,'NO2 Maret 2021',false);
Map.addLayer (ee.Image(bymonths4.first()).clip(Jawa),parameter,'NO2 April 2021',false);
Map.addLayer (ee.Image(bymonths5.first()).clip(Jawa),parameter,'NO2 Mei 2021',false);
Map.addLayer (ee.Image(bymonths6.first()).clip(Jawa),parameter,'NO2 Juni 2021',false);
Map.addLayer (ee.Image(bymonths7.first()).clip(Jawa),parameter,'NO2 Juli 2021',false);
Map.addLayer (ee.Image(bymonths8.first()).clip(Jawa),parameter,'NO2 Agustus 2021',false);
Map.addLayer (ee.Image(bymonths9.first()).clip(Jawa),parameter,'NO2 September 2021',false);
Map.addLayer (ee.Image(bymonths10.first()).clip(Jawa),parameter,'NO2 Oktober 2021',false);
Map.addLayer (ee.Image(bymonths11.first()).clip(Jawa),parameter,'NO2 November 2021',false);
Map.addLayer (ee.Image(bymonths12.first()).clip(Jawa),parameter,'NO2 Desember 2021',false);
Map.addLayer (ee.Image(bymonths13.first()).clip(Jawa),parameter,'NO2 Januari 2022',false);
Map.addLayer (ee.Image(bymonths14.first()).clip(Jawa),parameter,'NO2 Februari 2022',false);
Map.addLayer (ee.Image(bymonths15.first()).clip(Jawa),parameter,'NO2 Maret 2022',false);
Map.addLayer (ee.Image(bymonths16.first()).clip(Jawa),parameter,'NO2 April 2022',false);
//Map.addLayer (ee.Image(bymonths17.first()).clip(Jawa),parameter,'NO2 Mei 2022',false);
Map.addLayer (ee.Image(bymonths18.first()).clip(Jawa),parameter,'NO2 Juni 2022',false);
Map.addLayer (ee.Image(bymonths19.first()).clip(Jawa),parameter,'NO2 Juli 2022',false);
//-----------------------------------------------------------------------------------------//
//---------------------------------Kandungan CO-------------------------------------------//
var periode1 = ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_CO")
  .select('CO_column_number_density')
  .filterDate(start1, end1)
  .mean();
var periode2 = ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_CO")
  .select('CO_column_number_density')
  .filterDate(start2, end2)
  .mean();
var periode3 = ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_CO")
  .select('CO_column_number_density')
  .filterDate(start3, end3)
  .mean();
var periode4 = ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_CO")
  .select('CO_column_number_density')
  .filterDate(start4, end4)
  .mean();
var periode5 = ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_CO")
  .select('CO_column_number_density')
  .filterDate(start5, end5)
  .mean();
var periode6 = ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_CO")
  .select('CO_column_number_density')
  .filterDate(start6, end6)
  .mean();
var periode7 = ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_CO")
  .select('CO_column_number_density')
  .filterDate(start7, end7)
  .mean();  
var periode8 = ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_CO")
  .select('CO_column_number_density')
  .filterDate(start8, end8)
  .mean();  
var periode9 = ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_CO")
  .select('CO_column_number_density')
  .filterDate(start9, end9)
  .mean();
var periode10 = ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_CO")
  .select('CO_column_number_density')
  .filterDate(start10, end10)
  .mean();  
var periode11 = ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_CO")
  .select('CO_column_number_density')
  .filterDate(start11, end11)
  .mean();  
var periode12 = ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_CO")
  .select('CO_column_number_density')
  .filterDate(start12, end12)
  .mean();
var periode13 = ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_CO")
  .select('CO_column_number_density')
  .filterDate(start13, end13)
  .mean();  
var periode14 = ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_CO")
  .select('CO_column_number_density')
  .filterDate(start14, end14)
  .mean();  
var periode15 = ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_CO")
  .select('CO_column_number_density')
  .filterDate(start15, end15)
  .mean();  
var periode16 = ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_CO")
  .select('CO_column_number_density')
  .filterDate(start16, end16)
  .mean();  
var periode17 = ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_CO")
  .select('CO_column_number_density')
  .filterDate(start17, end17)
  .mean();  
var periode17 = ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_CO")
  .select('CO_column_number_density')
  .filterDate(start17, end17)
  .mean();  
var periode18 = ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_CO")
  .select('CO_column_number_density')
  .filterDate(start18, end18)
  .mean();  
var periode19 = ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_CO")
  .select('CO_column_number_density')
  .filterDate(start19, end19)
  .mean();  
print(periode19, 'CO Juli 2022')
var band_viz = {min: 0, max: 0.05, palette: ['008000', 'FFFF00','FF0000','8B0000']}; 
//Google Earth Engine: Upload Shapefile and Show Its Label
var text = require('users/gena/packages:text');
var shp = ee.FeatureCollection(Jawa);
//Map.addLayer(shp,{}, 'My Polygon');
var scale = Map.getScale()*1;
var labels = shp.map(function(feat) {
  feat = ee.Feature(feat);
  var name = ee.String(feat.get("Propinsi"));
  var centroid = feat.geometry().centroid();
  var t = text.draw(name, centroid, scale, {
    fontSize:10, 
    textColor:'black',
    outlineWidth: 0.5,
    outlineColor: 'black'
  });
  return t;
});
var labels_final = ee.ImageCollection(labels);
Map.addLayer(labels_final, {}, 'Provinsi');
//Styling Shapefile in Google Earth Engine
var styling = {color: 'blue' , fillColor:'ffffff00'};
Map.addLayer(Jawa.style(styling), {}, 'Batas Administrasi Provinsi');
Map.addLayer(periode1.clip(Jawa), band_viz, 'CO Januari 2021',false);
Map.addLayer(periode2.clip(Jawa), band_viz, 'CO Februari 2021',false);
Map.addLayer(periode3.clip(Jawa), band_viz, 'CO Maret 2021',false);
Map.addLayer(periode4.clip(Jawa), band_viz, 'CO April 2021',false);
Map.addLayer(periode5.clip(Jawa), band_viz, 'CO Mei 2021',false);
Map.addLayer(periode6.clip(Jawa), band_viz, 'CO Juni 2021',false);
Map.addLayer(periode7.clip(Jawa), band_viz, 'CO Juli 2021',false);
Map.addLayer(periode8.clip(Jawa), band_viz, 'CO Agustus 2021',false);
Map.addLayer(periode9.clip(Jawa), band_viz, 'CO September 2021',false);
Map.addLayer(periode10.clip(Jawa), band_viz, 'CO Oktober 2021',false);
Map.addLayer(periode11.clip(Jawa), band_viz, 'CO November 2021',false);
Map.addLayer(periode12.clip(Jawa), band_viz, 'CO Desember 2021',false);
Map.addLayer(periode13.clip(Jawa), band_viz, 'CO Januari 2022',false);
Map.addLayer(periode14.clip(Jawa), band_viz, 'CO Februari 2022',false);
Map.addLayer(periode15.clip(Jawa), band_viz, 'CO Maret 2022',false);
Map.addLayer(periode16.clip(Jawa), band_viz, 'CO April 2022',false);
Map.addLayer(periode17.clip(Jawa), band_viz, 'CO Mei 2022',false);
Map.addLayer(periode18.clip(Jawa), band_viz, 'CO Juni 2022',false);
Map.addLayer(periode19.clip(Jawa), band_viz, 'CO Juli 2022',false);
//-----------------------------------charting-----------------------
//-----CO-----
var stacked_composite = periode1.clip(Jawa).addBands(periode2.clip(Jawa)).addBands(periode3.clip(Jawa))
.addBands(periode4.clip(Jawa)).addBands(periode5.clip(Jawa)).addBands(periode6.clip(Jawa)).addBands(periode7.clip(Jawa)).addBands(periode8.clip(Jawa)).addBands(periode9.clip(Jawa))
.addBands(periode10.clip(Jawa)).addBands(periode11.clip(Jawa)).addBands(periode12.clip(Jawa)).addBands(periode13.clip(Jawa)).addBands(periode14.clip(Jawa)).addBands(periode15.clip(Jawa)).addBands(periode16.clip(Jawa)).addBands(periode17.clip(Jawa))
.addBands(periode18.clip(Jawa)).addBands(periode19.clip(Jawa));
var options = {
 title: 'Graph of CO Concentration Every Month',
 hAxis: {title: 'Timeline (Month)'},
 vAxis: {title: 'NO concentration (mol/m^2)'},
 lineWidth: 1,
 pointSize: 4,
 };
var waktu = [0, 1, 2, 3, 4,5,6,7,8,9,10,11,12,13,14,15,16,17,18];
// Script memunculkan grafik
var chart = ui.Chart.image.regions(
  stacked_composite,Jawa, ee.Reducer.mean(), 30, 'Propinsi', waktu)
   .setChartType('ScatterChart')
   .setOptions(options);
//print(chart);
//---NO2--
var months1=ee.Image(bymonths1.first()).clip(Jawa);
var months2=ee.Image(bymonths2.first()).clip(Jawa);
var months3=ee.Image(bymonths3.first()).clip(Jawa);
var months4=ee.Image(bymonths4.first()).clip(Jawa);
var months5=ee.Image(bymonths5.first()).clip(Jawa);
var months6=ee.Image(bymonths6.first()).clip(Jawa);
var months7=ee.Image(bymonths7.first()).clip(Jawa);
var months8=ee.Image(bymonths8.first()).clip(Jawa);
var months9=ee.Image(bymonths9.first()).clip(Jawa);
var months10=ee.Image(bymonths10.first()).clip(Jawa);
var months11=ee.Image(bymonths11.first()).clip(Jawa);
var months12=ee.Image(bymonths12.first()).clip(Jawa);
var months13=ee.Image(bymonths13.first()).clip(Jawa);
var months14=ee.Image(bymonths14.first()).clip(Jawa);
var months15=ee.Image(bymonths15.first()).clip(Jawa);
var months16=ee.Image(bymonths16.first()).clip(Jawa);
//var months17=ee.Image(bymonths17.first()).clip(Jawa);
var months18=ee.Image(bymonths18.first()).clip(Jawa);
var months19=ee.Image(bymonths19.first()).clip(Jawa);
var stacked_composite2 = months1.addBands(months2).addBands(months3).addBands(months4).addBands(months5)
.addBands(months6).addBands(months7).addBands(months8).addBands(months9).addBands(months10)
.addBands(months11).addBands(months12).addBands(months13).addBands(months14).addBands(months15)
.addBands(months16).addBands(months18).addBands(months19);
var options2 = {
 title: 'Graph of NO2 Concentration Every Month',
 hAxis: {title: 'Timeline (Month)'},
 vAxis: {title: 'NO concentration (mol/m^2)'},
 lineWidth: 1,
 pointSize: 4,
 };
var harian1 = ui.Chart.image.seriesByRegion({
  imageCollection: bydays1, regions:Jawa, reducer: ee.Reducer.mean(), seriesProperty: 'Propinsi', scale:1000,
  xProperty:'system:time_start'})
  .setOptions({
    title:'NO2 Maksimum Harian Januari 2021',
    vAxis:{title:'NO2 µmol/m2'}});
//print(harian1, 'NO2 Maksimum Harian Nov 2021');
var harian2 = ui.Chart.image.seriesByRegion({
  imageCollection: bydays2, regions:Jawa, reducer: ee.Reducer.mean(), seriesProperty: 'Propinsi', scale:1000,
  xProperty:'system:time_start'})
  .setOptions({
    title:'NO2 Maksimum Harian Februari 2021',
    vAxis:{title:'NO2 µmol/m2'}});
var harian3 = ui.Chart.image.seriesByRegion({
  imageCollection: bydays3, regions:Jawa, reducer: ee.Reducer.mean(), seriesProperty: 'Propinsi', scale:1000,
  xProperty:'system:time_start'})
  .setOptions({
    title:'NO2 Maksimum Harian Maret 2021',
    vAxis:{title:'NO2 µmol/m2'}});
var harian4 = ui.Chart.image.seriesByRegion({
  imageCollection: bydays4, regions:Jawa, reducer: ee.Reducer.mean(), seriesProperty: 'Propinsi', scale:1000,
  xProperty:'system:time_start'})
  .setOptions({
    title:'NO2 Maksimum Harian April 2021',
    vAxis:{title:'NO2 µmol/m2'}});    
var harian5 = ui.Chart.image.seriesByRegion({
  imageCollection: bydays5, regions:Jawa, reducer: ee.Reducer.mean(), seriesProperty: 'Propinsi', scale:1000,
  xProperty:'system:time_start'})
  .setOptions({
    title:'NO2 Maksimum Harian Mei 2021',
    vAxis:{title:'NO2 µmol/m2'}}); 
var harian6 = ui.Chart.image.seriesByRegion({
  imageCollection: bydays6, regions:Jawa, reducer: ee.Reducer.mean(), seriesProperty: 'Propinsi', scale:1000,
  xProperty:'system:time_start'})
  .setOptions({
    title:'NO2 Maksimum Harian Juni 2021',
    vAxis:{title:'NO2 µmol/m2'}});    
var harian7 = ui.Chart.image.seriesByRegion({
  imageCollection: bydays7, regions:Jawa, reducer: ee.Reducer.mean(), seriesProperty: 'Propinsi', scale:1000,
  xProperty:'system:time_start'})
  .setOptions({
    title:'NO2 Maksimum Harian Juli 2021',
    vAxis:{title:'NO2 µmol/m2'}});  
var harian8 = ui.Chart.image.seriesByRegion({
  imageCollection: bydays8, regions:Jawa, reducer: ee.Reducer.mean(), seriesProperty: 'Propinsi', scale:1000,
  xProperty:'system:time_start'})
  .setOptions({
    title:'NO2 Maksimum Harian Agustus 2021',
    vAxis:{title:'NO2 µmol/m2'}});
var harian9 = ui.Chart.image.seriesByRegion({
  imageCollection: bydays9, regions:Jawa, reducer: ee.Reducer.mean(), seriesProperty: 'Propinsi', scale:1000,
  xProperty:'system:time_start'})
  .setOptions({
    title:'NO2 Maksimum Harian September 2021',
    vAxis:{title:'NO2 µmol/m2'}});   
var harian10 = ui.Chart.image.seriesByRegion({
  imageCollection: bydays10, regions:Jawa, reducer: ee.Reducer.mean(), seriesProperty: 'Propinsi', scale:1000,
  xProperty:'system:time_start'})
  .setOptions({
    title:'NO2 Maksimum Harian Oktober 2021',
    vAxis:{title:'NO2 µmol/m2'}});
var harian11 = ui.Chart.image.seriesByRegion({
  imageCollection: bydays11, regions:Jawa, reducer: ee.Reducer.mean(), seriesProperty: 'Propinsi', scale:1000,
  xProperty:'system:time_start'})
  .setOptions({
    title:'NO2 Maksimum Harian November 2021',
    vAxis:{title:'NO2 µmol/m2'}});   
var harian12 = ui.Chart.image.seriesByRegion({
  imageCollection: bydays12, regions:Jawa, reducer: ee.Reducer.mean(), seriesProperty: 'Propinsi', scale:1000,
  xProperty:'system:time_start'})
  .setOptions({
    title:'NO2 Maksimum Harian Desember 2021',
    vAxis:{title:'NO2 µmol/m2'}});   
var harian13 = ui.Chart.image.seriesByRegion({
  imageCollection: bydays13, regions:Jawa, reducer: ee.Reducer.mean(), seriesProperty: 'Propinsi', scale:1000,
  xProperty:'system:time_start'})
  .setOptions({
    title:'NO2 Maksimum Harian Januari 2022',
    vAxis:{title:'NO2 µmol/m2'}});  
var harian14 = ui.Chart.image.seriesByRegion({
  imageCollection: bydays14, regions:Jawa, reducer: ee.Reducer.mean(), seriesProperty: 'Propinsi', scale:1000,
  xProperty:'system:time_start'})
  .setOptions({
    title:'NO2 Maksimum Harian Februari 2022',
    vAxis:{title:'NO2 µmol/m2'}});   
var harian15 = ui.Chart.image.seriesByRegion({
  imageCollection: bydays15, regions:Jawa, reducer: ee.Reducer.mean(), seriesProperty: 'Propinsi', scale:1000,
  xProperty:'system:time_start'})
  .setOptions({
    title:'NO2 Maksimum Harian Maret 2022',
    vAxis:{title:'NO2 µmol/m2'}});     
var harian16 = ui.Chart.image.seriesByRegion({
  imageCollection: bydays16, regions:Jawa, reducer: ee.Reducer.mean(), seriesProperty: 'Propinsi', scale:1000,
  xProperty:'system:time_start'})
  .setOptions({
    title:'NO2 Maksimum Harian April 2022',
    vAxis:{title:'NO2 µmol/m2'}}); 
var harian18 = ui.Chart.image.seriesByRegion({
  imageCollection: bydays18, regions:Jawa, reducer: ee.Reducer.mean(), seriesProperty: 'Propinsi', scale:1000,
  xProperty:'system:time_start'})
  .setOptions({
    title:'NO2 Maksimum Harian Juni 2022',
    vAxis:{title:'NO2 µmol/m2'}});   
var harian19 = ui.Chart.image.seriesByRegion({
  imageCollection: bydays19, regions:Jawa, reducer: ee.Reducer.mean(), seriesProperty: 'Propinsi', scale:1000,
  xProperty:'system:time_start'})
  .setOptions({
    title:'NO2 Maksimum Harian Juli 2022',
    vAxis:{title:'NO2 µmol/m2'}});     
// --------------------------------------Create a map panel-----------------------------------//
  var mapPanel = ui.Map();
  // Add these to the interface.
  ui.root.widgets().reset([mapPanel]);
  ui.root.setLayout(ui.Panel.Layout.flow('horizontal'));
  // Add a title and some explanatory text to a side panel.
  var header = ui.Label('"Spatio-temporal Perubahan Konsenstrasi Nitrogen Dioksida (NO2) dan Karbon Monoksida (CO) di Pulau Jawa"',
                       {fontWeight: 'bold',
                        fontSize: '15px', 
                        color: 'blue', 
                        textAlign: 'center'});
  var text = ui.Label(
            'Spatio-temporal Konsentrasi Nitrogen Dioksida (NO2) dan Karbon Monoksida (CO), diperoleh dari Citra Satelit Sentinel-5P Pada Tanggal 01 Januari 2021 sampai 30 Juli 2022',
            {fontSize: '12px', textAlign: 'justify'});
  var toolPanel = ui.Panel([header, text], 'flow', {width: '300px'});
// Make a Panel
    var chartPanel = ui.Panel({
                        style: {
                          fontSize: '12px', 
                          margin: '0 0 0 8px', 
                          padding: '0'}
      });
    var chartPanel2 = ui.Panel({
                        style: {
                          fontSize: '12px', 
                          margin: '0 0 0 8px', 
                          padding: '0'}
      });
    chartPanel2.add(chart);
    var charting = {
       'Grafik NO2 Bulan Januari 2021'  : harian1,
      'Grafik NO2 Bulan Februari 2021'  : harian2,
      'Grafik NO2 Bulan Maret 2021'     : harian3,
      'Grafik NO2 Bulan April 2021'     : harian4,
      'Grafik NO2 Bulan Mei 2021'       : harian5,
      'Grafik NO2 Bulan Juni 2021'      : harian6,
      'Grafik NO2 Bulan Juli 2021'      : harian7,
      'Grafik NO2 Bulan Agustus 2021'   : harian8,
      'Grafik NO2 Bulan September 2021' : harian9,
      'Grafik NO2 Bulan Oktober 2021'   : harian10,
      'Grafik NO2 Bulan November 2021'  : harian11,
      'Grafik NO2 Bulan Desember 2021'  : harian12,
      'Grafik NO2 Bulan Januari 2022'   : harian13,
      'Grafik NO2 Bulan Februari 2022'  : harian14,
      'Grafik NO2 Bulan Maret 2022'     : harian15,
      'Grafik NO2 Bulan April 2022'     : harian16,
      'Grafik NO2 Bulan Juni 2022'      : harian18,
      'Grafik NO2 Bulan Juli 2022'      : harian19,
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
      'Nitrogen Dioksida (NO2) Bulan Januari 2021'  : ee.Image(bymonths1.first().clip(Jawa),parameter),
      'Nitrogen Dioksida (NO2) Bulan Februari 2021' : ee.Image(bymonths2.first().clip(Jawa),parameter),
      'Nitrogen Dioksida (NO2) Bulan Maret 2021'    : ee.Image(bymonths3.first().clip(Jawa),parameter),
      'Nitrogen Dioksida (NO2) Bulan April 2021'    : ee.Image(bymonths4.first().clip(Jawa),parameter),
      'Nitrogen Dioksida (NO2) Bulan Mei 2021'      : ee.Image(bymonths5.first().clip(Jawa),parameter),
      'Nitrogen Dioksida (NO2) Bulan Juni 2021'     : ee.Image(bymonths6.first().clip(Jawa),parameter),
      'Nitrogen Dioksida (NO2) Bulan Juli 2021'     : ee.Image(bymonths7.first().clip(Jawa),parameter),
      'Nitrogen Dioksida (NO2) Bulan Agustus 2021'  : ee.Image(bymonths8.first().clip(Jawa),parameter),
      'Nitrogen Dioksida (NO2) Bulan September 2021': ee.Image(bymonths9.first().clip(Jawa),parameter),
      'Nitrogen Dioksida (NO2) Bulan Oktober 2021'  : ee.Image(bymonths10.first().clip(Jawa),parameter),
      'Nitrogen Dioksida (NO2) Bulan November 2021' : ee.Image(bymonths11.first().clip(Jawa),parameter),
      'Nitrogen Dioksida (NO2) Bulan Desember 2021' : ee.Image(bymonths12.first().clip(Jawa),parameter),
      'Nitrogen Dioksida (NO2) Bulan Januari 2022'  : ee.Image(bymonths13.first().clip(Jawa),parameter),
      'Nitrogen Dioksida (NO2) Bulan Februari 2022' : ee.Image(bymonths14.first().clip(Jawa),parameter),
      'Nitrogen Dioksida (NO2) Bulan Maret 2022'    : ee.Image(bymonths15.first().clip(Jawa),parameter),
      'Nitrogen Dioksida (NO2) Bulan April 2022'    : ee.Image(bymonths16.first().clip(Jawa),parameter),
      'Nitrogen Dioksida (NO2) Bulan Juni 2022'     : ee.Image(bymonths18.first().clip(Jawa),parameter),
      'Nitrogen Dioksida (NO2) Bulan Juli 2022'     : ee.Image(bymonths19.first().clip(Jawa),parameter),
 };
// Create the left map, and have it display layer 0.
    var center = {lon: 109.516866, lat: -7.272172, zoom: 8};
    var leftMap = ui.Map(center);
    leftMap.setControlVisibility(false);
    var leftSelector = addLayerSelector1(leftMap, 0, 'top-left');
    // Create the right map, and have it display layer 1.
    var rightMap = ui.Map(center);
    rightMap.setControlVisibility(true);
    rightMap.addLayer(periode1.clip(Jawa), band_viz, 'CO Januari 2021',true);
    rightMap.addLayer(periode2.clip(Jawa), band_viz, 'CO Februari 2021',false);
    rightMap.addLayer(periode3.clip(Jawa), band_viz, 'CO Maret 2021',false);
    rightMap.addLayer(periode4.clip(Jawa), band_viz, 'CO April 2021',false);
    rightMap.addLayer(periode5.clip(Jawa), band_viz, 'CO Mei 2021',false);
    rightMap.addLayer(periode6.clip(Jawa), band_viz, 'CO Juni 2021',false);
    rightMap.addLayer(periode7.clip(Jawa), band_viz, 'CO Juli 2021',false);
    rightMap.addLayer(periode8.clip(Jawa), band_viz, 'CO Agustus 2021',false);
    rightMap.addLayer(periode9.clip(Jawa), band_viz, 'CO September 2021',false);
    rightMap.addLayer(periode10.clip(Jawa), band_viz, 'CO Oktober 2021',false);
    rightMap.addLayer(periode11.clip(Jawa), band_viz, 'CO November 2021',false);
    rightMap.addLayer(periode12.clip(Jawa), band_viz, 'CO Desember 2021',false);
    rightMap.addLayer(periode13.clip(Jawa), band_viz, 'CO Januari 2022',false);
    rightMap.addLayer(periode14.clip(Jawa), band_viz, 'CO Februari 2022',false);
    rightMap.addLayer(periode15.clip(Jawa), band_viz, 'CO Maret 2022',false);
    rightMap.addLayer(periode16.clip(Jawa), band_viz, 'CO April 2022',false);
    rightMap.addLayer(periode17.clip(Jawa), band_viz, 'CO Mei 2022',false);
    rightMap.addLayer(periode18.clip(Jawa), band_viz, 'CO Juni 2022',false);
    rightMap.addLayer(periode19.clip(Jawa), band_viz, 'CO Juli 2022',false);
    // Adds a layer selection widget to the given map, to allow users to change
    // which image is displayed in the associated map.
    function addLayerSelector1(mapToChange, defaultValue, position) {
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
padding: '5px 12px'
}
});
// Create legend title
var legendTitle = ui.Label({
value:'Konsentrasi NO2 (μmol/m²)',
style: {
fontWeight: 'bold',
fontSize: '11 px',
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
var viz2 = band_viz;
var legend2 = ui.Panel({
style: {
position: 'bottom-right',
padding: '5px 12px'
}
});
// Create legend title
var legendTitle2 = ui.Label({
value:'Konsentrasi CO (mol/m²)',
style: {
fontWeight: 'bold',
fontSize: '11 px',
margin: '0 0 4px 0',
padding: '0'
}
});
// Add the title to the panel
legend2.add(legendTitle2);
// Create and and style the legend
var makeRow2 = function(color2, name2) {
// Create the colored box.
var colorBox2 = ui.Label({
style: {
backgroundColor: '#' + color,
// Use padding to give the box height and width.
padding: '8px',
margin: '0 0 4px 0'
}
});
// Create the label filled with the description text.
var description2 = ui.Label({
value: name2,
style: {margin: '0 0 4px 6px'}
});
// Return the panel
return ui.Panel({
widgets: [colorBox2, description2],
layout: ui.Panel.Layout.Flow('horizontal')
});
};
var lon2 = ee.Image.pixelLonLat().select('latitude');
var gradient2 = lon2.multiply((band_viz.max-band_viz.min)/100.0).add(band_viz.min);
var legendImage2 = gradient2.visualize(viz2);
// Create text label on top of legend
var panel_max2 = ui.Panel({
widgets: [
ui.Label(viz2['max'])
],
});
legend2.add(panel_max2);
// Create thumbnail from the image
var thumbnail2 = ui.Thumbnail({
image: legendImage2,
params: {bbox:'0,0,10,100', dimensions:'10x100'},
style: {padding: '1px', position: 'bottom-center'}
});
// Add the thumbnail to the legend
legend2.add(thumbnail2);
// Create text label on bottom of legend
var panel_min2 = ui.Panel({
widgets: [
ui.Label(band_viz['min'])
],
});
legend2.add(panel_min2);
leftMap.add(legend);
rightMap.add(legend2);
        //chart indices
        toolPanel.add(ui.Label('Cara memilih citra yang ditampilkan untuk konsentrasi Karbon Dioksida (CO)', {'fontWeight': 'bold','font-size': '12px','color':'blue'}));
        toolPanel.add(ui.Label('Klik "LAYERS" kemudian "CENTANG" untuk memilih citra yang akan ditampilkan', {'font-size': '12px','color':'red'}));
        toolPanel.add(ui.Label('Grafik Konsentrasi Karbon dioksida (CO)', {'fontWeight': 'bold','font-size': '12px','color':'blue'}));
        toolPanel.add(chartPanel2);
        toolPanel.add(ui.Label('Pilih Grafik Konsentrasi Nitrogen Dioksida (NO2)', {'fontWeight': 'bold','font-size': '12px','color':'blue'}));
        toolPanel.add(layerSelect);
        toolPanel.add(chartPanel);
        //Chart Panel
var linker = ui.Map.Linker([leftMap, rightMap]);