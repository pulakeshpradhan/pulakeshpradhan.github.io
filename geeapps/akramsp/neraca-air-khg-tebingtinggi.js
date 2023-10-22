var TT_1 = ui.import && ui.import("TT_1", "table", {
      "id": "users/akramsp/TT_1"
    }) || ee.FeatureCollection("users/akramsp/TT_1"),
    TT_2 = ui.import && ui.import("TT_2", "table", {
      "id": "users/akramsp/TT_2"
    }) || ee.FeatureCollection("users/akramsp/TT_2"),
    TT_3 = ui.import && ui.import("TT_3", "table", {
      "id": "users/akramsp/TT_3"
    }) || ee.FeatureCollection("users/akramsp/TT_3"),
    TT_4 = ui.import && ui.import("TT_4", "table", {
      "id": "users/akramsp/TT_4"
    }) || ee.FeatureCollection("users/akramsp/TT_4"),
    TT_6 = ui.import && ui.import("TT_6", "table", {
      "id": "users/akramsp/TT_6"
    }) || ee.FeatureCollection("users/akramsp/TT_6"),
    TT_7 = ui.import && ui.import("TT_7", "table", {
      "id": "users/akramsp/TT_7"
    }) || ee.FeatureCollection("users/akramsp/TT_7"),
    TT_5 = ui.import && ui.import("TT_5", "table", {
      "id": "users/akramsp/TT_5"
    }) || ee.FeatureCollection("users/akramsp/TT_5");
//MODEL NERACA AIR GLOBAL//
//WB = P - AET - RO//
//CITRA TERRACLIMATE DARI UNIIVERSITAS IDAHO //
//KHG TEBING TINGGI PULAU PADANG//
//1. MEMBUAT VARIABEL WAKTU DAN PERSIAPAN DATA
// Data
// Variabel untuk tahun mulai dan selesai
var startyear = 2010; 
var endyear = 2020; 
// Membuat list tahun dari variabel tahun
var years = ee.List.sequence(startyear,endyear);
// Variabel untuk bulan mulai dan selesai
var startmonth = 1;
var endmonth = 1;
// Variabel untuk membuat list 12 bulan
var months = ee.List.sequence(1,12);
// Mendefinisikan tanggal awal dan mulai dari semua variabel sebelumnya
var startdate = ee.Date.fromYMD(startyear,startmonth,1);
var enddate = ee.Date.fromYMD(endyear+1,endmonth,1);
//Menggabungkan seluruh batas yang dipanggil dengan merge
var tebingtinggi = TT_1.merge(TT_2).merge(TT_3).merge(TT_4)
                  .merge(TT_5).merge(TT_6).merge(TT_7);
// 2. MEMANGGIL DATA CITRA
// mengimpor data ET
// memilih ET dengan rentang waktu yang ditentukan pada variabel waktu
var allET = ee.ImageCollection('IDAHO_EPSCOR/TERRACLIMATE')
    .select('aet')
    .filterDate(startdate, enddate)
    .sort('system:time_start', false)
    .filterBounds(tebingtinggi);
// mengimpor data P
// memilih P dengan rentang waktu yang ditentukan pada variabel waktu
var allP = ee.ImageCollection('IDAHO_EPSCOR/TERRACLIMATE')
    .select('pr')
    .filterDate(startdate, enddate)
    .sort('system:time_start', false)
    .filterBounds(tebingtinggi);
// mengimpor data RO
// memilih RO dengan rentang waktu yang ditentukan pada variabel waktu
var allro = ee.ImageCollection('IDAHO_EPSCOR/TERRACLIMATE')
    .select('ro')
    .filterDate(startdate, enddate)
    .sort('system:time_start', false)
    .filterBounds(tebingtinggi);
// Menyatukan semua data menjadi satu dataset image collection
var myCollection = allP.combine(allET).combine(allro);
print(myCollection);
//3. PERHITUNGAN NERACA AIR
// Melakukan penyesuaian skala ET karena band AET memiliki skala 0.1 
// (10 kali lebih besar)
// Sehingga perlu dibagi dengan 10 agar mendapat skala asli
myCollection = myCollection.map(function(img){
  var ET = img.expression("et/10",
  {
    et: img.select("aet")
  });
  return img.addBands(ET.rename('ET'));
});
// Menghitung neraca air
myCollection = myCollection.map(function(img){
  var myimg = img.expression("(p - et/10 - ro)", 
  {
    ro: img.select("ro"),
    p: img.select("pr"),
    et: img.select("aet"),
    });
  return img.addBands(myimg.rename('WB'));  
});
// 4. VISUALISASI NERACA AIR
// Melakukan Pra Definisi Neraca Air Sub KHG 1
var title1 = {
  title: 'Neraca Air Sub KHG Pulau Tebingtinggi 1',
  hAxis: {title: 'Waktu'},
  vAxis: {title: 'milimeter'},
  explorer: {},
};
// Membuat grafik neraca air Sub KHG 1
var chart1 = ui.Chart.image.series({
    imageCollection: myCollection.select('pr','ET','ro','WB'),
    region : TT_1,
    reducer:ee.Reducer.mean(),
    xProperty: 'system:time_start'
    }).setOptions(title1)
      .setChartType('AreaChart');
// Melakukan Pra Definisi Neraca Air Sub KHG 2
var title2 = {
  title: 'Neraca Air Sub KHG Pulau Tebingtinggi 2',
  hAxis: {title: 'Waktu'},
  vAxis: {title: 'milimeter'},
  explorer: {},
};
// Membuat grafik neraca air Sub KHG 2
var chart2 = ui.Chart.image.series({
    imageCollection: myCollection.select('pr','ET','ro','WB'),
    region : TT_2,
    reducer:ee.Reducer.mean(),
    xProperty: 'system:time_start'
    }).setOptions(title2)
      .setChartType('AreaChart');
// Melakukan Pra Definisi Neraca Air Sub KHG 3
var title3 = {
  title: 'Neraca Air Sub KHG Pulau Tebingtinggi 3',
  hAxis: {title: 'Waktu'},
  vAxis: {title: 'milimeter'},
  explorer: {},
};
// Membuat grafik neraca air Sub KHG 2
var chart3 = ui.Chart.image.series({
    imageCollection: myCollection.select('pr','ET','ro','WB'),
    region : TT_3,
    reducer:ee.Reducer.mean(),
    xProperty: 'system:time_start'
    }).setOptions(title3)
      .setChartType('AreaChart');
// Melakukan Pra Definisi Neraca Air Sub KHG 4
var title4 = {
  title: 'Neraca Air Sub KHG Pulau Tebingtinggi 4',
  hAxis: {title: 'Waktu'},
  vAxis: {title: 'milimeter'},
  explorer: {},
};
// Membuat grafik neraca air Sub KHG 4
var chart4 = ui.Chart.image.series({
    imageCollection: myCollection.select('pr','ET','ro','WB'),
    region : TT_4,
    reducer:ee.Reducer.mean(),
    xProperty: 'system:time_start'
    }).setOptions(title4)
      .setChartType('AreaChart');
// Melakukan Pra Definisi Neraca Air Sub KHG 5
var title5 = {
  title: 'Neraca Air Sub KHG Pulau Tebingtinggi 5',
  hAxis: {title: 'Waktu'},
  vAxis: {title: 'milimeter'},
  explorer: {},
};
// Membuat grafik neraca air Sub KHG 5
var chart5 = ui.Chart.image.series({
    imageCollection: myCollection.select('pr','ET','ro','WB'),
    region : TT_5,
    reducer:ee.Reducer.mean(),
    xProperty: 'system:time_start'
    }).setOptions(title5)
      .setChartType('AreaChart');
// Melakukan Pra Definisi Neraca Air Sub KHG 6
var title6 = {
  title: 'Neraca Air Sub KHG Pulau Tebingtinggi 6',
  hAxis: {title: 'Waktu'},
  vAxis: {title: 'milimeter'},
  explorer: {},
};
// Membuat grafik neraca air Sub KHG 6
var chart6 = ui.Chart.image.series({
    imageCollection: myCollection.select('pr','ET','ro','WB'),
    region : TT_6,
    reducer:ee.Reducer.mean(),
    xProperty: 'system:time_start'
    }).setOptions(title6)
      .setChartType('AreaChart');
// Melakukan Pra Definisi Neraca Air Sub KHG 7
var title7 = {
  title: 'Neraca Air Sub KHG Pulau Tebingtinggi 7',
  hAxis: {title: 'Waktu'},
  vAxis: {title: 'milimeter'},
  explorer: {},
};
// Membuat grafik neraca air Sub KHG 7
var chart7 = ui.Chart.image.series({
    imageCollection: myCollection.select('pr','ET','ro','WB'),
    region : TT_7,
    reducer:ee.Reducer.mean(),
    xProperty: 'system:time_start'
    }).setOptions(title7)
      .setChartType('AreaChart');
// Membuat parameter visualisasi
// Urutannya adalah sangat rendah, rendah, sedang, cukup, baik
var et_viz = {min:-50, max:50, 
              palette:"ab0000, f21205, cc541c, fef1aa, 1a3678"};
// Memilih image collection yang akan divisualisasi
var WB = ee.ImageCollection(myCollection)
    .select('WB')
    .filterBounds(tebingtinggi)
    .filterDate(startdate, enddate);
// Membuat fungsi agar setiap Image pada Collection 
//dikembalikan sebagai Image saja dan di-clip
var collection2 = WB.map(function(image) {
  return image.clip(tebingtinggi);
});
// UI widgets memerlukan data dari client-side maka perlu evaluate()
// untuk mendapat tanggal yang dipilih pengguna dari time slider
ee.Dictionary({start: startdate, end: enddate})
  .evaluate(renderSlider);
// Membuat fungsi untuk menampilkan Time Slider
// Pada setiap perubahan renderDateRange
function renderSlider(dates) {
  var slider = ui.DateSlider({
    start: dates.start.value, 
    end: dates.end.value, 
    period: 30,
    onChange: renderDateRange
  });
  Map.add(slider.setValue('2014-04-01'));
}
// Mengambil packages teks dari mas gena
var text = require('users/gena/packages:text');
// Mendefinisikan kembali batas
var shp = ee.FeatureCollection(tebingtinggi);
// Membuat ukuran label
var Scale = Map.getScale()*0.02;
// Membuat fungsi untuk memanggil semua atribut tabel pada kolom tertentu
// Mengatur pewarnaan dan ukuran teks
var labels = shp.map(function(feat){
  feat = ee.Feature(feat);
  var name = ee.String (feat.get("no_SubKHG"));
  var centroid = feat.geometry().centroid();
  var t = text.draw(name, centroid,Scale,{
    fontSize: 12,
    textColor:'white',
    OutlineWidth:0,
    OutlineColor:'red'
  });
  return t;
  });
// Menjadikan label sebagai gambar
var Labels_Final = ee.ImageCollection(labels);
//Menampilkan seluruh layer dan meresetnya ketika diubah tanggal
function renderDateRange(dateRange) {
  var image = collection2.filterDate(dateRange.start(), dateRange.end());
  var layer = ui.Map.Layer(image, et_viz, 'Neraca Air');
  var layer2 = ui.Map.Layer(ee.Image().paint(tebingtinggi, 0, 1), {}, 'Batas KHG Tebing Tinggi');
  var layer3 = ui.Map.Layer(Labels_Final,{},"Nomor Sub KHG");
  Map.layers().reset([layer, layer2, layer3]);
  Map.setCenter(102.712503,0.663135, 9.5);
} 
//Membuat panel grafik  
var panel = ui.Panel({style:{
                      width: '1250px', 
                      height:'245px', 
                      position: 'bottom-right', 
                      padding: '15px 15px'},
                      layout: ui.Panel.Layout.flow('horizontal')})
            .add(chart1).add(chart2).add(chart3).add(chart4).add(chart5)
            .add(chart6).add(chart7);
// Menampilkan panel grafik
Map.add(panel);
// Membuat panel keterangan
var panelinfo = ui.Panel({style:{
                      width: '670px', 
                      height:'85px', 
                      position: 'bottom-right', 
                      padding: '15px 15px'}});
// Menampilkan panel keterangan
Map.add(panelinfo);
// Membuat isi keterangan
var information = ui.Label({
                            value: 'ET : Evapotranspirasi | WB : Water Balance (Neraca Air) | pr : Presipitasi (Curah Hujan) | ro : Run Off (Limpasan Permukaan)',
                            style: {
                            fontWeight: 'Bold',
                            fontSize: '11px',
                            margin: '0px 0px 0px 0px',
                            border: '3px solid orange',
                            padding : '5px'
                            }});
// Menambakan isi keterangan ke panel
panelinfo.add(information);
// Membuat isi keterangan
var information2 = ui.Label({
                            value: 'WB > 0 mm : Neraca Air Surplus | WB < 0 mm : Neraca Air Defisit',
                            style: {
                            fontWeight: 'Bold',
                            fontSize: '11px',
                            margin: '5px 0px 0px 288px',
                            border: '3px solid lightblue',
                            padding : '5px'
                            }});
// Menambakan isi keterangan ke panel
panelinfo.add(information2);
// Mengatur posisi panel legenda gradasi
var legend = ui.Panel({style: {
                        position: 'bottom-left',
                        padding: '8px 8px'
                      }});
// Membuat judul legenda
var legendTitle = ui.Label({
                            value: 'Neraca Air (mm)',
                            style: {
                            fontWeight: 'bold',
                            fontSize: '17px',
                            margin: '0 0 4px 0',
                            padding: '0'
                            }});
// Menambakan judul ke legenda
legend.add(legendTitle);
// Membuat gambar gradasi warna
var lon = ee.Image.pixelLonLat().select('latitude');
var gradient = lon.multiply((et_viz.max-et_viz.min)/100.0).add(et_viz.min);
var legendImage = gradient.visualize(et_viz);
// Membuat teks diatas legenda
var panel = ui.Panel({widgets: [ui.Label(et_viz['max'])]});
// Menambahkan teks ke panel
legend.add(panel);
// Membuat legenda menjadi thumbnail
var thumbnail = ui.Thumbnail({image: legendImage,
                              params: {bbox:'0,0,10,100', dimensions:'10x200'},
                              style: {padding: '1px', position: 'bottom-center'}
                              });
// Menambahkan thumbnail ke legenda
legend.add(thumbnail);
// Membuat teks dibawah legenda
var panel = ui.Panel({widgets: [ui.Label(et_viz['min'])]});
// Menambahkan teks ke panel
legend.add(panel);
// Membuat teks tambahan
var legendTitle3 = ui.Label({
                            value: 'Akram SP | 2021',
                            style: {
                            fontWeight: 'bold',
                            fontSize: '10px',
                            margin: '8px 0 0 0',
                            padding: '0'
                            }});
// Menambakan teks tambahan
legend.add(legendTitle3);
// Menampilkan legenda 
Map.add(legend);