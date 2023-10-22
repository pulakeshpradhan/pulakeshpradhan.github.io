var tebingtinggi = ui.import && ui.import("tebingtinggi", "table", {
      "id": "users/akramsp/SubKHG_Mempawah"
    }) || ee.FeatureCollection("users/akramsp/SubKHG_Mempawah");
// Memanggil data CHIRPS harian
var CHIRPS = ee.ImageCollection("UCSB-CHG/CHIRPS/DAILY");
// Mendefinisikan waktu
var startyear = 2010;
var endyear = 2020;
var startmonth = 1;
var endmonth = 12;
// Membuat format tanggal menjadi ee.Date
var startdate = ee.Date.fromYMD(startyear,startmonth,1);
var enddate = ee.Date.fromYMD(endyear,endmonth,31);
// UI widgets memerlukan data dari client-side maka perlu evaluate()
// untuk mendapat tanggal yang dipilih pengguna dari time slider
ee.Dictionary({start: startdate, end: ee.Date(Date.now())})
  .evaluate(renderSlider);
// Membuat fungsi untuk menampilkan Time Slider
// Pada setiap perubahan renderDateRange
function renderSlider(dates) {
  var slider = ui.DateSlider({
    start: dates.start.value, 
    end: dates.end.value, 
    period: 60,
    onChange: renderDateRange
  });
  Map.add(slider.setValue('2014-04-01'));
}
//Menampilkan seluruh layer dan meresetnya ketika diubah tanggal
function renderDateRange(dateRange) {
  // Memfilter data
var datain_t = CHIRPS.filterDate(dateRange.start(), dateRange.end())
              .select("precipitation").map(function(img){
                return img.addBands(ee.Image.constant(0).uint8().rename('counter'));
              })
              .sort('system:time_start');
// Mulai membaca data
var dataset = datain_t.sort('system:time_start:');
// Mengatur ambang batas HTH
var precipThresh = 1; // mm
// Membuat fungsi HTH
function drySpells(imgDS, listDS){
  // Mendapatkan image sebelumnya (-1)
  var prevDS = ee.Image(ee.List(listDS).get(-1));
  // Memfilter area dan image dengan 0 < curah hujan < 1
  var dry = imgDS.select('precipitation').lt(precipThresh);
  // Menambahkan image ke counter
  var accumDS = prevDS.select('counter').add(dry).rename('counter');
  // Menampilkan image setiap iterasi
  // curah hujan < ambang batas akan diakumulasi
  // jika tidak, maka akan bernilai 0
  var outDS = imgDS.select('precipitation').addBands(
        imgDS.select('counter').where(dry.eq(1),accumDS)
      ).uint8();
  //dikembalikan sebagai list
  return ee.List(listDS).add(outDS);
}
// Memanggil image pertama dalam dataset
var first = ee.List([ee.Image(dataset.first())]);
// Mengiterasi fungsi drySpells pada setiap Image
var maxDrySpell = ee.ImageCollection.fromImages(
    dataset.iterate(drySpells,first)
).max(); // Mendapatkan hari drySpells Maksimum
print(maxDrySpell)
// Mendifinisikan SLD Style dengan interval diskrit untuk drytSpells
var drySpellsSLD =
  '<RasterSymbolizer>' +
    '<ColorMap  type="intervals" extended="false" >' +
      '<ColorMapEntry color="#CCCCCC" quantity="0" label="No Drought"/>' +
      '<ColorMapEntry color="#A1FB7C" quantity="5" label="1-5" />' +
      '<ColorMapEntry color="#FDFE17" quantity="10" label="6-10" />' +
      '<ColorMapEntry color="#EA9C00" quantity="20" label="11-20" />' +
      '<ColorMapEntry color="#734A00" quantity="30" label="21-30" />' +
      '<ColorMapEntry color="#FFBCBF" quantity="60" label="31-60" />' +
      '<ColorMapEntry color="#F40000" quantity="1000" label=">61" />' +
    '</ColorMap>' +
  '</RasterSymbolizer>';  
  // Mengambil packages teks dari mas gena
var text = require('users/gena/packages:text');
// Mendefinisikan kembali batas
var shp = ee.FeatureCollection(tebingtinggi);
// Mmebuat ukuran label
var Scale = Map.getScale()*0.02;
// Membuat fungsi untuk memanggil semua atribut tabel pada kolom tertentu
// Mengatur pewarnaan dan ukuran teks
var labels = shp.map(function(feat){
  feat = ee.Feature(feat);
  var name = ee.String (feat.get("no_SubKHG"));
  var centroid = feat.geometry().centroid();
  var t = text.draw(name, centroid,Scale,{
    fontSize: 12,
    textColor:'black',
    OutlineWidth:0,
    OutlineColor:'red'
  });
  return t;
  });
// Menjadikan label sebagai gambar
var Labels_Final = ee.ImageCollection(labels);
  var layer = ui.Map.Layer(maxDrySpell.select('counter').sldStyle(drySpellsSLD).clip(tebingtinggi), {},'Hari Tanpa Hujan', true);
  var layer2 = ui.Map.Layer(ee.Image().paint(tebingtinggi, 0, 1), {}, 'Batas KHG Tebing Tinggi');
  var layer3 = ui.Map.Layer(Labels_Final,{},"Nomor Sub KHG");
  Map.layers().reset([layer, layer2, layer3]);
  Map.centerObject(tebingtinggi, 11);
} 
// Membuat legenda peta untuk wetSpells
// Mengatur posisi panel disebelah kiri bawah
var legend = ui.Panel({
                      style: {
                        position: 'bottom-left',
                        padding: '8px 15px'
                      }
                    });
// Membuat judul legenda
var legendTitle = ui.Label({
                          value: 'Hari Tanpa Hujan',
                          style: {
                            fontWeight: 'bold',
                            fontSize: '14px',
                            margin: '0 0 4px 0',
                            padding: '0'
                            }
                        });
// Tambahkan legenda ke panel
legend.add(legendTitle);
// Membuat label pada setiap warna legenda
var makeRow = function(color, name) {
      // Membuat label pada setiap kotak warna
      var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
          padding: '8px',
          margin: '0 0 4px 0'
        }
      });
      // Membuat label disebelah kotak warna
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}
      });
      // Kembalikan berupa panel
      return ui.Panel({
        widgets: [colorBox, description],
        // Panel horizontal untuk kotak warna dan label
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
// Mendefinisikan palet warna (sesuai SLD style)
var palette =['cccccc', 'A1FB7C', 'FDFE17', 'EA9C00', '734A00', 'FFBCBF', 'F40000'];
// Membuat list nama label
var names = ['Wilayah Tanpa Hujan','1 - 5 Hari','6 - 10 Hari','11 - 20 Hari','21 - 30 Hari','31 - 60 Hari','> 60 Hari'];
// menambahkan palet warna dan list label
for (var i = 0; i < 7; i++) {
  legend.add(makeRow(palette[i], names[i]));}  
// Tambahkan legenda ke peta
Map.add(legend);
// Membuat teks tambahan
var legendTitle3 = ui.Label({
                            value: 'PERKA BMKG No. 9 Tahun 2019',
                            style: {
                            fontWeight: 'bold',
                            fontSize: '10px',
                            margin: '8px 0 0 0',
                            padding: '0'
                            }});
// Menambakan teks tambahan
legend.add(legendTitle3);