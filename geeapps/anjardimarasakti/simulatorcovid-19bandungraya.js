var Bandung = ui.import && ui.import("Bandung", "table", {
      "id": "users/anjardimarasakti/KotaBandung"
    }) || ee.FeatureCollection("users/anjardimarasakti/KotaBandung"),
    BDG_Kecamatan = ui.import && ui.import("BDG_Kecamatan", "table", {
      "id": "users/anjardimarasakti/Bandung_Kecamatan"
    }) || ee.FeatureCollection("users/anjardimarasakti/Bandung_Kecamatan"),
    ALOS_30 = ui.import && ui.import("ALOS_30", "image", {
      "id": "JAXA/ALOS/AW3D30/V2_2"
    }) || ee.Image("JAXA/ALOS/AW3D30/V2_2"),
    RL_VisParam = ui.import && ui.import("RL_VisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "b1"
        ],
        "max": 52,
        "palette": [
          "8a0aff",
          "3908ff",
          "0c4bff",
          "00b8ff",
          "0aff99",
          "02ff2d",
          "59ff04",
          "cdff04",
          "d9ff06",
          "fbff00",
          "ffd504",
          "ffa90c",
          "ff7804",
          "ff3204",
          "ff0000",
          "cc0000"
        ]
      }
    }) || {"opacity":1,"bands":["b1"],"max":52,"palette":["8a0aff","3908ff","0c4bff","00b8ff","0aff99","02ff2d","59ff04","cdff04","d9ff06","fbff00","ffd504","ffa90c","ff7804","ff3204","ff0000","cc0000"]},
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                107.45378484711848,
                -6.83477395823025
              ],
              [
                107.45378484711848,
                -7.035852164350919
              ],
              [
                107.78886785493098,
                -7.035852164350919
              ],
              [
                107.78886785493098,
                -6.83477395823025
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[107.45378484711848, -6.83477395823025],
          [107.45378484711848, -7.035852164350919],
          [107.78886785493098, -7.035852164350919],
          [107.78886785493098, -6.83477395823025]]], null, false),
    No2 = ui.import && ui.import("No2", "imageCollection", {
      "id": "COPERNICUS/S5P/NRTI/L3_NO2"
    }) || ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_NO2"),
    MOD11A1 = ui.import && ui.import("MOD11A1", "imageCollection", {
      "id": "MODIS/006/MOD11A1"
    }) || ee.ImageCollection("MODIS/006/MOD11A1"),
    BandungRaya = ui.import && ui.import("BandungRaya", "table", {
      "id": "users/anjardimarasakti/Administrasi_Bandung_Raya"
    }) || ee.FeatureCollection("users/anjardimarasakti/Administrasi_Bandung_Raya"),
    imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "b1"
        ],
        "max": 95,
        "palette": [
          "f7fff8",
          "babc31",
          "ff712d",
          "ff471d",
          "d2210f"
        ]
      }
    }) || {"opacity":1,"bands":["b1"],"max":95,"palette":["f7fff8","babc31","ff712d","ff471d","d2210f"]},
    Population_Density = ui.import && ui.import("Population_Density", "image", {
      "id": "users/anjardimarasakti/Population_Density_Bandung_10Level"
    }) || ee.Image("users/anjardimarasakti/Population_Density_Bandung_10Level"),
    PDP_Positif_04_04 = ui.import && ui.import("PDP_Positif_04_04", "image", {
      "id": "users/anjardimarasakti/04_04_PDP_Positif"
    }) || ee.Image("users/anjardimarasakti/04_04_PDP_Positif"),
    PDP_Positif_05_04 = ui.import && ui.import("PDP_Positif_05_04", "image", {
      "id": "users/anjardimarasakti/05_04_PDP_Positif"
    }) || ee.Image("users/anjardimarasakti/05_04_PDP_Positif"),
    PDP_Positif_06_04 = ui.import && ui.import("PDP_Positif_06_04", "image", {
      "id": "users/anjardimarasakti/06_04_PDP_Positif"
    }) || ee.Image("users/anjardimarasakti/06_04_PDP_Positif"),
    PDP_Positif_07_04 = ui.import && ui.import("PDP_Positif_07_04", "image", {
      "id": "users/anjardimarasakti/07_04_PDP_Positif"
    }) || ee.Image("users/anjardimarasakti/07_04_PDP_Positif"),
    PDP_Positif_08_04 = ui.import && ui.import("PDP_Positif_08_04", "image", {
      "id": "users/anjardimarasakti/08_04_PDP_Positif"
    }) || ee.Image("users/anjardimarasakti/08_04_PDP_Positif"),
    PDP_Positif_09_04 = ui.import && ui.import("PDP_Positif_09_04", "image", {
      "id": "users/anjardimarasakti/09_04_PDP_Positif"
    }) || ee.Image("users/anjardimarasakti/09_04_PDP_Positif"),
    PDP_Positif_10_04 = ui.import && ui.import("PDP_Positif_10_04", "image", {
      "id": "users/anjardimarasakti/10_04_PDP_Positif"
    }) || ee.Image("users/anjardimarasakti/10_04_PDP_Positif"),
    PDP_Positif_11_04 = ui.import && ui.import("PDP_Positif_11_04", "image", {
      "id": "users/anjardimarasakti/11_04_PDP_Positif"
    }) || ee.Image("users/anjardimarasakti/11_04_PDP_Positif"),
    PDP_Positif_12_04 = ui.import && ui.import("PDP_Positif_12_04", "image", {
      "id": "users/anjardimarasakti/1223_04_PDP_Positif"
    }) || ee.Image("users/anjardimarasakti/1223_04_PDP_Positif"),
    PDP_Positif_13_04 = ui.import && ui.import("PDP_Positif_13_04", "image", {
      "id": "users/anjardimarasakti/13_04_PDP_Positif"
    }) || ee.Image("users/anjardimarasakti/13_04_PDP_Positif"),
    PDP_Positif_14_04 = ui.import && ui.import("PDP_Positif_14_04", "image", {
      "id": "users/anjardimarasakti/14_04_PDP_Positif3"
    }) || ee.Image("users/anjardimarasakti/14_04_PDP_Positif3"),
    PDP_Positif_15_04 = ui.import && ui.import("PDP_Positif_15_04", "image", {
      "id": "users/anjardimarasakti/15_04_PDP_Positif3"
    }) || ee.Image("users/anjardimarasakti/15_04_PDP_Positif3"),
    PDP_Positif_16_04 = ui.import && ui.import("PDP_Positif_16_04", "image", {
      "id": "users/anjardimarasakti/16_04_PDP_Positif3"
    }) || ee.Image("users/anjardimarasakti/16_04_PDP_Positif3"),
    PDP_Positif_17_04 = ui.import && ui.import("PDP_Positif_17_04", "image", {
      "id": "users/anjardimarasakti/17_04_PDP_Positif3"
    }) || ee.Image("users/anjardimarasakti/17_04_PDP_Positif3"),
    PDP_Positif_18_04 = ui.import && ui.import("PDP_Positif_18_04", "image", {
      "id": "users/anjardimarasakti/18_04_PDP_Positif3"
    }) || ee.Image("users/anjardimarasakti/18_04_PDP_Positif3"),
    PDP_Positif_19_04 = ui.import && ui.import("PDP_Positif_19_04", "image", {
      "id": "users/anjardimarasakti/19_04_PDP_Positif3"
    }) || ee.Image("users/anjardimarasakti/19_04_PDP_Positif3"),
    PDP_Positif_20_04 = ui.import && ui.import("PDP_Positif_20_04", "image", {
      "id": "users/anjardimarasakti/20_04_PDP_Positif3"
    }) || ee.Image("users/anjardimarasakti/20_04_PDP_Positif3"),
    PDP_Positif_21_04 = ui.import && ui.import("PDP_Positif_21_04", "image", {
      "id": "users/anjardimarasakti/21_04_PDP_Positif3"
    }) || ee.Image("users/anjardimarasakti/21_04_PDP_Positif3"),
    PDP_Positif_22_04 = ui.import && ui.import("PDP_Positif_22_04", "image", {
      "id": "users/anjardimarasakti/22_04_PDP_Positif3"
    }) || ee.Image("users/anjardimarasakti/22_04_PDP_Positif3"),
    PDP_Positif_23_04 = ui.import && ui.import("PDP_Positif_23_04", "image", {
      "id": "users/anjardimarasakti/23_04_PDP_Positif3"
    }) || ee.Image("users/anjardimarasakti/23_04_PDP_Positif3"),
    PDP_Positif_24_04 = ui.import && ui.import("PDP_Positif_24_04", "image", {
      "id": "users/anjardimarasakti/24_04_PDP_Positif3"
    }) || ee.Image("users/anjardimarasakti/24_04_PDP_Positif3"),
    PDP_Positif_26_04 = ui.import && ui.import("PDP_Positif_26_04", "image", {
      "id": "users/anjardimarasakti/26_04_PDP_Positif"
    }) || ee.Image("users/anjardimarasakti/26_04_PDP_Positif"),
    PDP_Positif_27_04 = ui.import && ui.import("PDP_Positif_27_04", "image", {
      "id": "users/anjardimarasakti/27_04_PDP_Positif_anjar"
    }) || ee.Image("users/anjardimarasakti/27_04_PDP_Positif_anjar"),
    PDP_Positif_29_04 = ui.import && ui.import("PDP_Positif_29_04", "image", {
      "id": "users/anjardimarasakti/29_04_PDP_Positif"
    }) || ee.Image("users/anjardimarasakti/29_04_PDP_Positif"),
    PDP_Positif_30_04 = ui.import && ui.import("PDP_Positif_30_04", "image", {
      "id": "users/anjardimarasakti/30_04_PDP_Positif3"
    }) || ee.Image("users/anjardimarasakti/30_04_PDP_Positif3"),
    PDP_Positif_01_05 = ui.import && ui.import("PDP_Positif_01_05", "image", {
      "id": "users/anjardimarasakti/01_05_PDP_Positif"
    }) || ee.Image("users/anjardimarasakti/01_05_PDP_Positif"),
    PDP_Positif_02_05 = ui.import && ui.import("PDP_Positif_02_05", "image", {
      "id": "users/anjardimarasakti/02_05_PDP_POS_BDG"
    }) || ee.Image("users/anjardimarasakti/02_05_PDP_POS_BDG"),
    PDP_Positif_04_05 = ui.import && ui.import("PDP_Positif_04_05", "image", {
      "id": "users/anjardimarasakti/04_05_PDP_POS_BDG"
    }) || ee.Image("users/anjardimarasakti/04_05_PDP_POS_BDG"),
    PDP_Positif_05_05 = ui.import && ui.import("PDP_Positif_05_05", "image", {
      "id": "users/anjardimarasakti/05_05_PDP_POS_BDG"
    }) || ee.Image("users/anjardimarasakti/05_05_PDP_POS_BDG"),
    PDP_Positif_06_05 = ui.import && ui.import("PDP_Positif_06_05", "image", {
      "id": "users/anjardimarasakti/06_05_PDP_POS_BDG"
    }) || ee.Image("users/anjardimarasakti/06_05_PDP_POS_BDG"),
    PDP_Positif_07_05 = ui.import && ui.import("PDP_Positif_07_05", "image", {
      "id": "users/anjardimarasakti/07_05_PDP_POS_BDG"
    }) || ee.Image("users/anjardimarasakti/07_05_PDP_POS_BDG"),
    PDP_Positif_08_05 = ui.import && ui.import("PDP_Positif_08_05", "image", {
      "id": "users/anjardimarasakti/08_05_PDP_POS_BDG"
    }) || ee.Image("users/anjardimarasakti/08_05_PDP_POS_BDG"),
    PDP_Positif_09_05 = ui.import && ui.import("PDP_Positif_09_05", "image", {
      "id": "users/anjardimarasakti/09_05_PDP_POS_BDG"
    }) || ee.Image("users/anjardimarasakti/09_05_PDP_POS_BDG"),
    PDP_Positif_11_05 = ui.import && ui.import("PDP_Positif_11_05", "image", {
      "id": "users/anjardimarasakti/05_11_PDP_POS_BDG"
    }) || ee.Image("users/anjardimarasakti/05_11_PDP_POS_BDG"),
    PDP_Positif_12_05 = ui.import && ui.import("PDP_Positif_12_05", "image", {
      "id": "users/anjardimarasakti/05_12_PDP_POS_BDG"
    }) || ee.Image("users/anjardimarasakti/05_12_PDP_POS_BDG"),
    PDP_Positif_13_05 = ui.import && ui.import("PDP_Positif_13_05", "image", {
      "id": "users/anjardimarasakti/05_13_PDP_POS_BDG"
    }) || ee.Image("users/anjardimarasakti/05_13_PDP_POS_BDG"),
    PDP_Positif_14_05 = ui.import && ui.import("PDP_Positif_14_05", "image", {
      "id": "users/anjardimarasakti/05_14_PDP_POS_BDG"
    }) || ee.Image("users/anjardimarasakti/05_14_PDP_POS_BDG"),
    PDPPos0905 = ui.import && ui.import("PDPPos0905", "table", {
      "id": "users/anjardimarasakti/jabar_latlong_active_PDP_Positif_AreaStudi_05_09"
    }) || ee.FeatureCollection("users/anjardimarasakti/jabar_latlong_active_PDP_Positif_AreaStudi_05_09"),
    PDPPos1405 = ui.import && ui.import("PDPPos1405", "table", {
      "id": "users/anjardimarasakti/jabar_latlong_active_PDP_Positif_AreaStudi_05_14"
    }) || ee.FeatureCollection("users/anjardimarasakti/jabar_latlong_active_PDP_Positif_AreaStudi_05_14");
//Map.addLayer(BDG_Kecamatan,{color:"gray"},"Bandung Kecamatan");
//Map.addLayer(BDG_Jalan,{color:"white"},"Bandung Jalan");
//Map.addLayer(BDG_JangkauanFaskes,BDG_JangkauanFaskes_VisParam, "Bandung_Jangkauan_Faskes per Kepadatan");
//Map.addLayer(Pusat_Pendidikan,{color:"red"},"Pusat_Pendidikan");
//Map.addLayer(Pusat_Perbelanjaan,{color:"red"},"Pusat_Perbelanjaan");
//Map.addLayer(Hillshade_Alos30.clip(geometry), Parameter_Hillshade, 'Hillshade_Alos30')
// Map.addLayer(BDG_Population,BDG_Population_VisParam, "Bandung_Kepadatan Penduduk"); 
// Map.addLayer(BDG_Population,BDG_Population_VisParam, "Bandung_Kepadatan Penduduk"); 
//----------------------------------------------------------------------------------------
// var MOD11A1_aa = MOD11A1 
// .filterDate('2018-07-01', '2020-03-09')
// .select('LST_Day_1km');
// var MOD11A1TimeSeries1 = ui.Chart.image.seriesByRegion(MOD11A1_aa, Bandung, ee.Reducer.mean(),'',
// 3, 'system:time_start', 'label')
// .setOptions({
// title: 'Suhu permukaan rata-rata Kota Bandung',
// vAxis: {title: 'Suhu Permukaan * 0.02 (Kelvin)'},
// hAxis: {title: 'Waktu', format: 'MM-yy', gridlines: {count: 7}},
// series: {
//       0: {
//         color: 'blue',
//         lineWidth: 0,
//         pointsVisible: true,
//         pointSize: 2,
//       },
//     },
// });
// ui.root.widgets().add(MOD11A1TimeSeries1);
// //----------------------------------------------------------------------------------------
// var No2_aa = No2
// .filterDate('2018-07-01', '2020-03-09')
// .select('tropospheric_NO2_column_number_density');
// var No2TimeSeries1 = ui.Chart.image.seriesByRegion(No2_aa, Bandung, ee.Reducer.mean(),'',
// 3, 'system:time_start', 'label')
// .setOptions({
// title: 'NO2 troposphetic column Kota Bandung',
// vAxis: {title: 'NO2 troposphetic column (mol/m^2)'},
// hAxis: {title: 'Waktu', format: 'MM-yy', gridlines: {count: 7}},
// series: {
//       0: {
//         color: 'blue',
//         lineWidth: 0,
//         pointsVisible: true,
//         pointSize: 2,
//       },
//     },
// });
// ui.root.widgets().add(No2TimeSeries1);
//------------------------------------------------------------------------------------------
var header = ui.Label('COVID-19 Analysis Tools - Bandung Raya', {position: 'bottom-left', fontSize: '36px', color: 'Blue'}); 
var text = ui.Label(
    '1. Platform pemodelan spasial dinamis tingkat bahaya COVID-19',
    {fontSize: '13px'});
var text2 = ui.Label(
    '2. Analisis penambahan tingkat bahaya COVID-19',
    {fontSize: '13px'});
var text3 = ui.Label( 
    '3. Analisis zonasi intensitas penyebaran virus sebagai rekomendasi prioritas area karantina wilayah, PSBB dan tes masif COVID-19 (Produk zonasi berdasarkan pengolahan data dari tanggal 4 April - 15 Mei 2020)',
    {fontSize: '13px'});
var toolPanel = ui.Panel([header, text, text2, text3], 'flow', {width: '300px'});
ui.root.widgets().add(toolPanel);
var link1 = ui.Label(
    'Pusat Informasi dan Koordinasi COVID-19 Provinsi Jawa Barat (Pikobar)', {}, 'https://pikobar.jabarprov.go.id');
var linkPanel1 = ui.Panel(  
  [ui.Label('Sumber data:', {fontWeight: 'bold'}), link1]);
var link2 = ui.Label(
    '1. Kelompok Keilmuan Inderaja dan Sains Informasi Geografis (KK-INSIG), Institut Teknologi Bandung', {}, 'https://insig.gd.itb.ac.id/');
var linkPanel2 = ui.Panel(  
    [ui.Label('Dikembangkan oleh:', {fontWeight: 'bold'}), link2]);
var link3 = ui.Label(
    '2. Masyarakat Ahli Penginderaan Jauh (MAPIN) Korwil Jawa Barat', {},'http://mapin.or.id/');
var linkPanel3 = ui.Panel(  
    [ui.Label('', {fontWeight: 'bold'}), link3]);
var link4 = ui.Label(
    '3. Center for Remote Sensing ITB', {},'http://crs.itb.ac.id//');
var linkPanel4 = ui.Panel(  
    [ui.Label('', {fontWeight: 'bold'}), link4]);
var link5 = ui.Label(
    'Dr.Eng. Anjar Dimara Sakti, S.T., M.Sc. (Dosen ITB - Ketua MAPIN Jawa Barat)', {},'http://crs.itb.ac.id/anjar-dimara-sakti/');
var linkPanel5 = ui.Panel(  
  [ui.Label('Ketua tim developer:', {fontWeight: 'bold'}), link5]);
  var link6 = ui.Label(
    '1). Tim KK-INSIG ITB dan MAPIN Jabar, 2). Sekolah Farmasi, Institut Teknologi Bandung (Dr. Hubbi Nashrullah Muhammad S.Farm.,M.Si., Afina Nur Fauziyyah, S.Farm., M.HSc.), 3). Program Studi Ilmu Kesehatan Masyarakat - FK UNPAD (Fedri Ruluwedrata Rinawan, dr., M.Sc.PH, PhD), 4). Departemen Epidemiologi - FKM UI (Rizka Maulida SKM, M.HSc), 5). Departemen Kebijakan dan Manajemen Kesehatan - FK UGM (Giovanni van Empel, MSc; dr.), 6. Tim IT (Ageng Setiawa, S.Kom., M.Kom., Tabah Juliansah, Muhammad Fakhriy Ramadhan, S.T.)',{});
var linkPanel6 = ui.Panel(  
  [ui.Label('Tim developer:', {fontWeight: 'bold'}), link6]);
var link7 = ui.Label(
    'UU No. 6 tahun 2018, PP No. 21 tahun 2020, PMK no. 9 tahun 2020. Dalam UU tentang kekarantinaan kesehatan tersebut, disebutkan beberapa skenario (karantina rumah, wilayah, RS dan PSBB). Pemerintah memilih langkah PSBB. Menteri menetapkan PSBB di suatu wilayah berdasarkan permohonan gubernur/bupati/walikota. Syarat permohonan PSBB antara lain menyertakan data peningkatan jumlah kasus menurut waktu (disertai kurva epidemiologi), data kejadian transmisi lokal dan data penyebaran kasus menurut waktu yang disertai dengan peta penyebaran menurut waktu. Penelitian ini mencoba mengembangan metode dalam memodelkan pergerakan dinamis COVID-19 yang dapat dipakai pemerintah daerah untuk dapat menganalisis prioritas area dalam menetukan area karantina wilayah, PSBB dan tes masif COVID-19 yang dapat dipergunakan secara lansgung dalam mengajukan permohonan kepada pemerintah pusat',{});
var linkPanel7 = ui.Panel(  
  [ui.Label('Rasionalitas pengembangan model:', {fontWeight: 'bold'}), link7]);  
var link8 = ui.Label(
    'Kementerian Riset dan Teknologi / Badan Riset dan Inovasi Nasional Republik Indonesia',{});
var linkPanel8 = ui.Panel(  
  [ui.Label('Didukung oleh:', {fontWeight: 'bold'}), link8]);
var link9 = ui.Label(
    'Belum tersedia/dalam penulisan', {});
var linkPanel9 = ui.Panel(  
  [ui.Label('Referensi:', {fontWeight: 'bold'}), link9]);
toolPanel.add(linkPanel1);
toolPanel.add(linkPanel2); 
toolPanel.add(linkPanel3);
toolPanel.add(linkPanel4);
toolPanel.add(linkPanel5);
toolPanel.add(linkPanel6);
toolPanel.add(linkPanel7);
//toolPanel.add(linkPanel8);
//toolPanel.add(linkPanel9);
//----------------------------------------------------------------------------------------
var Elevation_Alos30 = ALOS_30.select('AVE_DSM');
var Slope_Alos30= ee.Terrain.slope(ALOS_30)
var Hillshade_Alos30= ee.Terrain.hillshade(ALOS_30);
var Parameter_elevation = {min: 0, max: 3000};
var Parameter_Slope = {min: 0, max: 60};
var Parameter_Hillshade = {min: 0, max: 255};
//-------------------------------------------------------------------------------------------------
var RL_VisParam2 = { 
  min: 1,
  max: 300,
  palette: [
      'f17c7c','8c17be','1232c6','1bebff',
    '0b7e19','d2ff17','ff5e13','a90101','3b0000' 
  ]
};
//-------------------------------------------------------------------------------------------------
Map.centerObject(geometry,12);
Map.addLayer(PDP_Positif_04_04, RL_VisParam2, 'Tingkat Bahaya COVID-19 (4 April)'); 
// Map.addLayer(PDP_Positif_05_04, RL_VisParam2, 'Tingkat Bahaya COVID-19 (5 April)'); 
// Map.addLayer(PDP_Positif_06_04, RL_VisParam2, 'Tingkat Bahaya COVID-19 (6 April)'); 
// Map.addLayer(PDP_Positif_07_04, RL_VisParam2, 'Tingkat Bahaya COVID-19 (7 April)'); 
// Map.addLayer(PDP_Positif_08_04, RL_VisParam2, 'Tingkat Bahaya COVID-19 (8 April)'); 
// Map.addLayer(PDP_Positif_09_04, RL_VisParam2, 'Tingkat Bahaya COVID-19 (9 April)'); 
// Map.addLayer(PDP_Positif_10_04, RL_VisParam2, 'Tingkat Bahaya COVID-19 (10 April)'); 
// Map.addLayer(PDP_Positif_11_04, RL_VisParam2, 'Tingkat Bahaya COVID-19 (11 April)'); 
// Map.addLayer(PDP_Positif_12_04, RL_VisParam2, 'Tingkat Bahaya COVID-19 (12 April)'); 
// Map.addLayer(PDP_Positif_13_04, RL_VisParam2, 'Tingkat Bahaya COVID-19 (13 April)'); 
// Map.addLayer(PDP_Positif_14_04, RL_VisParam2, 'Tingkat Bahaya COVID-19 (14 April)');
// Map.addLayer(PDP_Positif_15_04, RL_VisParam2, 'Tingkat Bahaya COVID-19 (15 April)');
// Map.addLayer(PDP_Positif_16_04, RL_VisParam2, 'Tingkat Bahaya COVID-19 (16 April)'); 
// Map.addLayer(PDP_Positif_17_04, RL_VisParam2, 'Tingkat Bahaya COVID-19 (17 April)'); 
// Map.addLayer(PDP_Positif_18_04, RL_VisParam2, 'Tingkat Bahaya COVID-19 (18 April)'); 
// Map.addLayer(PDP_Positif_19_04, RL_VisParam2, 'Tingkat Bahaya COVID-19 (19 April)'); 
// Map.addLayer(PDP_Positif_20_04, RL_VisParam2, 'Tingkat Bahaya COVID-19 (20 April)'); 
// Map.addLayer(PDP_Positif_21_04, RL_VisParam2, 'Tingkat Bahaya COVID-19 (21 April)'); 
Map.addLayer(PDP_Positif_22_04, RL_VisParam2, 'Tingkat Bahaya COVID-19 (22 April)'); 
// Map.addLayer(PDP_Positif_23_04, RL_VisParam2, 'Tingkat Bahaya COVID-19 (23 April)'); 
// Map.addLayer(PDP_Positif_24_04, RL_VisParam2, 'Tingkat Bahaya COVID-19 (24 April)'); 
// Map.addLayer(PDP_Positif_26_04, RL_VisParam2, 'Tingkat Bahaya COVID-19 (26 April)'); 
 Map.addLayer(PDP_Positif_27_04, RL_VisParam2, 'Tingkat Bahaya COVID-19 (27 April)'); 
// Map.addLayer(PDP_Positif_29_04, RL_VisParam2, 'Tingkat Bahaya COVID-19 (29 April)'); 
// Map.addLayer(PDP_Positif_30_04, RL_VisParam2, 'Tingkat Bahaya COVID-19 (30 April)'); 
//Map.addLayer(PDP_Positif_01_05, RL_VisParam2, 'Tingkat Bahaya COVID-19 (01 Mei)'); 
// Map.addLayer(PDP_Positif_02_05, RL_VisParam2, 'Tingkat Bahaya COVID-19 (02 Mei)'); 
 Map.addLayer(PDP_Positif_04_05, RL_VisParam2, 'Tingkat Bahaya COVID-19 (04 Mei)'); 
// Map.addLayer(PDP_Positif_05_05, RL_VisParam2, 'Tingkat Bahaya COVID-19 (05 Mei)'); 
// Map.addLayer(PDP_Positif_06_05, RL_VisParam2, 'Tingkat Bahaya COVID-19 (06 Mei)'); 
// Map.addLayer(PDP_Positif_07_05, RL_VisParam2, 'Tingkat Bahaya COVID-19 (07 Mei)'); 
// Map.addLayer(PDP_Positif_08_05, RL_VisParam2, 'Tingkat Bahaya COVID-19 (08 Mei)'); 
// Map.addLayer(PDP_Positif_09_05, RL_VisParam2, 'Tingkat Bahaya COVID-19 (09 Mei)'); 
 Map.addLayer(PDP_Positif_11_05, RL_VisParam2, 'Tingkat Bahaya COVID-19 (11 Mei)'); 
// Map.addLayer(PDP_Positif_12_05, RL_VisParam2, 'Tingkat Bahaya COVID-19 (12 Mei)'); 
// Map.addLayer(PDP_Positif_13_05, RL_VisParam2, 'Tingkat Bahaya COVID-19 (13 Mei)'); 
// Map.addLayer(PDP_Positif_14_05, RL_VisParam2, 'Tingkat Bahaya COVID-19 (14 Mei)');
//-----------------------------------------------------//
var HL0504 = PDP_Positif_05_04.subtract(PDP_Positif_04_04).rename('HL0504');
var HL0605 = PDP_Positif_06_04.subtract(PDP_Positif_05_04).rename('HL0605');
var HL0706 = PDP_Positif_07_04.subtract(PDP_Positif_06_04).rename('HL0706');
var HL0807 = PDP_Positif_08_04.subtract(PDP_Positif_07_04).rename('HL0807');
var HL0908 = PDP_Positif_09_04.subtract(PDP_Positif_08_04).rename('HL0908');
var HL1009 = PDP_Positif_10_04.subtract(PDP_Positif_09_04).rename('HL1009');
var HL1110 = PDP_Positif_11_04.subtract(PDP_Positif_10_04).rename('HL1110');
var HL1211 = PDP_Positif_12_04.subtract(PDP_Positif_11_04).rename('HL1211'); 
var HL1312 = PDP_Positif_13_04.subtract(PDP_Positif_12_04).rename('HL1312'); 
var HL1413 = PDP_Positif_14_04.subtract(PDP_Positif_13_04).rename('HL1413'); 
var HL1514 = PDP_Positif_15_04.subtract(PDP_Positif_14_04).rename('HL1514');
var HL1615 = PDP_Positif_16_04.subtract(PDP_Positif_15_04).rename('HL1615');
var HL1716 = PDP_Positif_17_04.subtract(PDP_Positif_16_04).rename('HL1716');
var HL1817 = PDP_Positif_18_04.subtract(PDP_Positif_17_04).rename('HL1817');
var HL1918 = PDP_Positif_19_04.subtract(PDP_Positif_18_04).rename('HL1918');
var HL2019 = PDP_Positif_20_04.subtract(PDP_Positif_19_04).rename('HL2019');
var HL2120 = PDP_Positif_21_04.subtract(PDP_Positif_20_04).rename('HL2120');
var HL2221 = PDP_Positif_22_04.subtract(PDP_Positif_21_04).rename('HL2221');
var HL2322 = PDP_Positif_23_04.subtract(PDP_Positif_22_04).rename('HL2322');
var HL2423 = PDP_Positif_24_04.subtract(PDP_Positif_23_04).rename('HL2423');
var HL2624 = PDP_Positif_26_04.subtract(PDP_Positif_24_04).rename('HL2624');
var HL2726 = PDP_Positif_27_04.subtract(PDP_Positif_26_04).rename('HL2726');
var HL2927 = PDP_Positif_29_04.subtract(PDP_Positif_27_04).rename('HL2927');
var HL3029 = PDP_Positif_30_04.subtract(PDP_Positif_29_04).rename('HL3029');
var HL0130 = PDP_Positif_01_05.subtract(PDP_Positif_30_04).rename('HL0130'); 
var HL0201 = PDP_Positif_02_05.subtract(PDP_Positif_01_05).rename('HL0201');
var HL0402 = PDP_Positif_04_05.subtract(PDP_Positif_02_05).rename('HL0402');
var HL0504 = PDP_Positif_05_05.subtract(PDP_Positif_04_05).rename('HL0504');
var HL0605 = PDP_Positif_06_05.subtract(PDP_Positif_05_05).rename('HL0605');
var HL0706 = PDP_Positif_07_05.subtract(PDP_Positif_06_05).rename('HL0706');
var HL0807 = PDP_Positif_08_05.subtract(PDP_Positif_07_05).rename('HL0807');
var HL0908 = PDP_Positif_09_05.subtract(PDP_Positif_08_05).rename('HL0908');
var HL1109 = PDP_Positif_11_05.subtract(PDP_Positif_09_05).rename('HL1109');
var HL1211 = PDP_Positif_12_05.subtract(PDP_Positif_11_05).rename('HL1211');
var HL1312 = PDP_Positif_13_05.subtract(PDP_Positif_12_05).rename('HL1312');
var HL1413 = PDP_Positif_14_05.subtract(PDP_Positif_13_05).rename('HL1413');
// Map.addLayer(HL0504, {min: -6, max: 19, palette: ['white', 'white','white', 'red', 'purple']}, 'Penambahan tingkat bahaya COVID-19 (4-5 April)');
// Map.addLayer(HL0605, {min: -8, max: 9, palette: ['white', 'white','white', 'red', 'purple']}, 'Penambahan tingkat bahaya COVID-19 (5-6 April)');
// Map.addLayer(HL0706, {min: -4, max: 8, palette: ['white', 'white','white', 'red', 'purple']}, 'Penambahan tingkat bahaya COVID-19 (6-7 April)');
// Map.addLayer(HL0807, {min: -6, max: 43, palette: ['white', 'white','white', 'red', 'purple']}, 'Penambahan tingkat bahaya COVID-19 (7-8 April)');
// Map.addLayer(HL0908, {min: -8, max: 19, palette: ['white', 'white','white', 'red', 'purple']}, 'Penambahan tingkat bahaya COVID-19 (8-9 April)');
// Map.addLayer(HL1009, {min: -6, max: 31, palette: ['white', 'white','white', 'red', 'purple']}, 'Penambahan tingkat bahaya COVID-19 (9-10 April)');
// Map.addLayer(HL1110, {min: -22, max: 21, palette: ['white', 'white','white', 'red', 'purple']}, 'Penambahan tingkat bahaya COVID-19 (10-11 April)');
// Map.addLayer(HL1211, {min: -22, max: 21, palette: ['white', 'white','white', 'red', 'purple']}, 'Penambahan tingkat bahaya COVID-19 (11-12 April)');
// Map.addLayer(HL1312, {min: -22, max: 21, palette: ['white', 'white','white', 'red', 'purple']}, 'Penambahan tingkat bahaya COVID-19 (12-13 April)');
// Map.addLayer(HL1413, {min: -8, max: 7, palette: ['white', 'white','white', 'red', 'purple']}, 'Penambahan tingkat bahaya COVID-19 (13-14 April)');
// Map.addLayer(HL1514, {min: -8, max: 85, palette: ['white', 'white','white', 'red', 'purple']}, 'Penambahan tingkat bahaya COVID-19 (14-15 April)');
// Map.addLayer(HL1615, {min: -61, max: 20, palette: ['white', 'white','white', 'red', 'purple']}, 'Penambahan tingkat bahaya COVID-19 (15-16 April)');
// Map.addLayer(HL1716, {min: -2, max: 13, palette: ['white', 'white','white', 'red', 'purple']}, 'Penambahan tingkat bahaya COVID-19 (16-17 April)');
// Map.addLayer(HL1817, {min: -24, max: 37, palette: ['white', 'white','white', 'red', 'purple']}, 'Penambahan tingkat bahaya COVID-19 (17-18 April)');
// Map.addLayer(HL1918, {min: -0, max: 0, palette: ['white' ]}, 'Penambahan tingkat bahaya COVID-19 (18-19 April)');
// Map.addLayer(HL2019, {min: -23, max: 36, palette: ['white', 'white','white', 'red', 'purple']}, 'Penambahan tingkat bahaya COVID-19 (19-20 April)');
// Map.addLayer(HL2120, {min: -45, max: 45, palette: ['white', 'white','white', 'red', 'purple']}, 'Penambahan tingkat bahaya COVID-19 (20-21 April)');
// Map.addLayer(HL2221, {min: -5, max: 8, palette: ['white', 'white','white', 'red', 'purple']}, 'Penambahan tingkat bahaya COVID-19 (21-22 April)');
// Map.addLayer(HL2322, {min: -7, max: 7, palette: ['white', 'white','white', 'red', 'purple']}, 'Penambahan tingkat bahaya COVID-19 (22-23 April)');
// Map.addLayer(HL2423, {min: -0, max: 0, palette: ['white']}, 'Penambahan tingkat bahaya COVID-19 (23-24 April)');
// Map.addLayer(HL2624, {min: -8, max: 63, palette: ['white', 'white','white', 'red', 'purple']}, 'Penambahan tingkat bahaya COVID-19 (24-26 April)');
// Map.addLayer(HL2726, {min: -22, max: 41, palette: ['white', 'white','white', 'red', 'purple']}, 'Penambahan tingkat bahaya COVID-19 (26-27 April)');
// Map.addLayer(HL2927, {min: -44, max: 32, palette: ['white', 'white','white', 'red', 'purple']}, 'Penambahan tingkat bahaya COVID-19 (27-29 April)');
// Map.addLayer(HL3029, {min: -13, max: 5, palette: ['white', 'white','white', 'red', 'purple']}, 'Penambahan tingkat bahaya COVID-19 (29-30 April)');
// Map.addLayer(HL0130, {min: -21, max: 20, palette: ['white', 'white','white', 'red', 'purple']}, 'Penambahan tingkat bahaya COVID-19 (30-01 April)');
// Map.addLayer(HL0201, {min: -25, max: 44, palette: ['white', 'white','white', 'red', 'purple']}, 'Penambahan tingkat bahaya COVID-19 (01-02 April)');
// Map.addLayer(HL0402, {min: -50, max: 30, palette: ['white', 'white','white', 'red', 'purple']}, 'Penambahan tingkat bahaya COVID-19 (02-04 April)');
// Map.addLayer(HL0504, {min: -27, max: 50, palette: ['white', 'white','white', 'red', 'purple']}, 'Penambahan tingkat bahaya COVID-19 (04-05 April)');
// Map.addLayer(HL0605, {min: -48, max: 34, palette: ['white', 'white','white', 'red', 'purple']}, 'Penambahan tingkat bahaya COVID-19 (05-06 April)');
// Map.addLayer(HL0706, {min: -26, max: 53, palette: ['white', 'white','white', 'red', 'purple']}, 'Penambahan tingkat bahaya COVID-19 (06-07 April)');
// Map.addLayer(HL0807, {min: -27, max: 8, palette: ['white', 'white','white', 'red', 'purple']}, 'Penambahan tingkat bahaya COVID-19 (07-08 April)');
// Map.addLayer(HL0908, {min: -8, max: 27, palette: ['white', 'white','white', 'red', 'purple']}, 'Penambahan tingkat bahaya COVID-19 (08-09 April)');
// Map.addLayer(HL1109, {min: -31, max: 100, palette: ['white', 'white','white', 'red', 'purple']}, 'Penambahan tingkat bahaya COVID-19 (09-11 April)');
// Map.addLayer(HL1211, {min: -27, max: 70, palette: ['white', 'white','white', 'red', 'purple']}, 'Penambahan tingkat bahaya COVID-19 (11-12 April)');
// Map.addLayer(HL1312, {min: -52, max: 4, palette: ['white', 'white','white', 'red', 'purple']}, 'Penambahan tingkat bahaya COVID-19 (12-13 April)');
// Map.addLayer(HL1413, {min: -34, max: 49, palette: ['white', 'white','white', 'red', 'purple']}, 'Penambahan tingkat bahaya COVID-19 (13-14 April)');
//-----------------------------------------------------// 
var ZonSum_Total = HL0504.add(HL0605).add(HL0706).add(HL0807).add(HL0908).add(HL1009).add(HL1110).add(HL1211).add(HL1312).add(HL1413).add(HL1514).add(HL1615)
.add(HL1716).add(HL1817).add(HL1918).add(HL2019).add(HL2120).add(HL2221).add(HL2322).add(HL2423).add(HL2624).add(HL2726).add(HL2927)
.add(HL3029).add(HL3029).add(HL0130).add(HL0201).add(HL0402).add(HL0504).add(HL0605).add(HL0706).add(HL0807).add(HL0807).add(HL0807)
.add(HL0807).add(HL0908).add(HL1109).add(HL1211).add(HL1312).add(HL1413).rename('ZonSum_Total');
Map.addLayer(ZonSum_Total, {min: -54, max: 236, palette: 
[ '040274', '040281', '0502a3', '0502b8', '0502ce', '0502e6',
    '0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef',
    '3be285', '3ff38f', '86e26f', '3ae237', 'b5e22e', 'd6e21f',
    'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08', 'ff500d',
    'ff0000', 'de0101', 'c21301', 'a71001', '911003'
]}, 'Zona Penyebaran_04Aprilto15Mei');
var ZonSum_Total_04A_15A = HL0504.add(HL0605).add(HL0706).add(HL0807).add(HL0908).add(HL1009).add(HL1110).add(HL1211).add(HL1312).add(HL1413).add(HL1514).rename('ZonSum_Total');
Map.addLayer(ZonSum_Total_04A_15A, {min: -30, max: 135, palette: 
[ '040274', '040281', '0502a3', '0502b8', '0502ce', '0502e6',
    '0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef',
    '3be285', '3ff38f', '86e26f', '3ae237', 'b5e22e', 'd6e21f',
    'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08', 'ff500d',
    'ff0000', 'de0101', 'c21301', 'a71001', '911003'
]}, 'Zona Penyebaran_04Aprilto15April');
var ZonSum_Total_16A_21A = HL1615.add(HL1716).add(HL1817).add(HL1918).add(HL2019).add(HL2120).rename('ZonSum_Total');
Map.addLayer(ZonSum_Total_16A_21A, {min: -52, max: 64, palette: 
[ '040274', '040281', '0502a3', '0502b8', '0502ce', '0502e6',
    '0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef',
    '3be285', '3ff38f', '86e26f', '3ae237', 'b5e22e', 'd6e21f',
    'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08', 'ff500d',
    'ff0000', 'de0101', 'c21301', 'a71001', '911003'
]}, 'Zona Penyebaran_16Aprilto21April');
var ZonSum_Total_21A_30A= HL2221.add(HL2322).add(HL2423).add(HL2624).add(HL2726).add(HL2927)
.add(HL3029).add(HL3029).add(HL0130).rename('ZonSum_Total');
Map.addLayer(ZonSum_Total_21A_30A, {min: -18, max: 63 , palette: 
[ '040274', '040281', '0502a3', '0502b8', '0502ce', '0502e6',
    '0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef',
    '3be285', '3ff38f', '86e26f', '3ae237', 'b5e22e', 'd6e21f',
    'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08', 'ff500d',
    'ff0000', 'de0101', 'c21301', 'a71001', '911003'
]}, 'Zona Penyebaran_22Aprilto30April');
var ZonSum_Total_30A_09M = HL0130.add(HL0201).add(HL0402).add(HL0504).add(HL0605).add(HL0706).add(HL0807).add(HL0807).add(HL0807)
.add(HL0807).add(HL0908).rename('ZonSum_Total');
Map.addLayer(ZonSum_Total_30A_09M, {min: -25, max: 52, palette: 
[ '040274', '040281', '0502a3', '0502b8', '0502ce', '0502e6',
    '0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef',
    '3be285', '3ff38f', '86e26f', '3ae237', 'b5e22e', 'd6e21f',
    'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08', 'ff500d',
    'ff0000', 'de0101', 'c21301', 'a71001', '911003'
]}, 'Zona Penyebaran_30Aprilto9Mei');
var ZonSum_Total_09M_14M = HL1109.add(HL1211).add(HL1312).add(HL1413).rename('ZonSum_Total');
Map.addLayer(ZonSum_Total_09M_14M, {min: -25, max: 52, palette: 
[ '040274', '040281', '0502a3', '0502b8', '0502ce', '0502e6',
    '0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef',
    '3be285', '3ff38f', '86e26f', '3ae237', 'b5e22e', 'd6e21f',
    'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08', 'ff500d',
    'ff0000', 'de0101', 'c21301', 'a71001', '911003'
]}, 'Zona Sumber Penyebaran_9Meito15Mei');
var intervals =
  '<RasterSymbolizer>' +
    '<ColorMap type="intervals" extended="false" >' +
      '<ColorMapEntry color="#ffffff" quantity="0" label="0"/>' +
      '<ColorMapEntry color="#7a8737" quantity="20" label="20" />' + 
      '<ColorMapEntry color="#acbe4d" quantity="30" label="30" />' + 
      '<ColorMapEntry color="#0ae042" quantity="40" label="40" />' +  
      '<ColorMapEntry color="#fff70b" quantity="50" label="50" />' + 
      '<ColorMapEntry color="#ffaf38" quantity="60" label="60" />' + 
      '<ColorMapEntry color="#ff641b" quantity="70" label="70" />' + 
      '<ColorMapEntry color="#a41fd6" quantity="123" label="123" />' + 
    '</ColorMap>' +
  '</RasterSymbolizer>';
//Map.addLayer(ZonSum.sldStyle(intervals), {}, 'Zonasi Intensitas Penyebaran COVID19');
var legend = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px'
  }});
var legendTitle = ui.Label({
  value: 'Zonasi Intensitas Penyebaran COVID-19',
  style: {fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }});
legend.add(legendTitle);
//Map.add(legend);
var makeRow = function(color, name) {
        var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
          padding: '8px',
          margin: '0 0 4px 0'
        }});
            var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}
      });
        return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      })};
var palette =['7a8737', 'acbe4d', '0ae042', 'fff70b', 'ffaf38', 'ff641b', 'a41fd6', 'ffffff'];
var names = ['Penyebaran sangat rendah','Penyebaran rendah','Penyebaran cukup rendah', 'Penyebaran sedang',
'Penyebaran cukup tinggi', 'Penyebaran tinggi', 'Penyebaran sangat tinggi', 'NA'];
for (var i = 0; i < 8; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
//-----------------------------------------------------//
var legend = 
ui.Panel ({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
//----------------------------------------------------------------------------------------//
var lon = ee.Image
.pixelLonLat()
.select('latitude');
var gradient = lon
.multiply((RL_VisParam2.max-RL_VisParam2.min)/100.0)
.add(RL_VisParam2.min);
var legendImage = gradient
.visualize(RL_VisParam2);
//----------------------------------------------------------------------------------------//
var panel = ui.Panel({
    widgets: [
      ui.Label(RL_VisParam2['max'])
    ],
  });
legend.add(panel);
//----------------------------------------------------------------------------------------//
var thumbnail = ui.Thumbnail({
  image: legendImage,  
  params: {bbox:'0,0,10,100', dimensions:'10x200'},  
  style: {padding: '1px', position: 'bottom-center'}
});
legend.add(thumbnail);
//----------------------------------------------------------------------------------------//
var panel = ui.Panel({
    widgets: [
      ui.Label(RL_VisParam2['min'])
    ],
  });
legend.add(panel);
Map.add(legend);
//----------------------------------------------------------------------------------------//
var Pop_VisParam = { 
  min: 1,
  max: 10,
  palette: [
    'white', '269db1', '30c8e2', 
    '32d3ef','3be285', '3ff38f', '86e26f', '3ae237', 'b5e22e', 
    'd6e21f','fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08',  
    'ff500d','ff0000', 'de0101', 'c21301', 'a71001', '911003'
  ]
};
Map.addLayer(Population_Density,Pop_VisParam, 'Population_density');
//--------------------------------------------------------------------------------------
var Covid19Risk_14April = ZonSum_Total.multiply(Population_Density).divide(10).rename('Covid19Risk_15Mei');
var Risk_VisParam = { 
  min: -7,
  max: 205,
  palette: [
  'f17c7c','8c17be','1232c6','1bebff',
    '0b7e19','d2ff17','ff5e13','a90101','3b0000'
  ]
};
Map.addLayer(Covid19Risk_14April, Risk_VisParam, 'Resiko COVID-19 (14 Mei)');
//--------------------------------------------------------------------------------------
Map.addLayer(BDG_Kecamatan,{color: 'grey', fillColor: '00000000'},'Kota Bandung');
Map.addLayer(Bandung,{color: 'grey', fillColor: '00000000'},'Kota Bandung');
Map.addLayer(PDPPos1405,({color: 'white', strokeWidth: 5}), 'Titik PDP dan Positive COVID19');