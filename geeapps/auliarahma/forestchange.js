var image = ui.import && ui.import("image", "image", {
      "id": "UMD/hansen/global_forest_change_2020_v1_8"
    }) || ee.Image("UMD/hansen/global_forest_change_2020_v1_8"),
    sumatera = ui.import && ui.import("sumatera", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                94.39638662642335,
                5.007390555105342
              ],
              [
                95.58291006392335,
                3.868256994189322
              ],
              [
                97.47255850142335,
                1.5858402393803428
              ],
              [
                98.61513662642335,
                0.7950016219503616
              ],
              [
                99.53798818892335,
                -0.8309203019119887
              ],
              [
                100.54873037642335,
                -2.456173364424782
              ],
              [
                102.61416006392335,
                -4.999398110537003
              ],
              [
                103.88857412642335,
                -6.136566275620084
              ],
              [
                105.51902784085951,
                -6.130529794186863
              ],
              [
                106.12327588773451,
                -5.605951384705749
              ],
              [
                107.0016682817195,
                -3.352144325578943
              ],
              [
                106.7819417192195,
                -1.2885200192914854
              ],
              [
                104.0353596879695,
                -0.7063353624468065
              ],
              [
                103.9804280473445,
                0.04071705487550484
              ],
              [
                103.5629475785945,
                0.8756439070244846
              ],
              [
                103.1894124223445,
                1.424847517607419
              ],
              [
                100.3219807817195,
                3.0824419500613973
              ],
              [
                97.83071486856034,
                6.0182527677001945
              ],
              [
                94.90835158731034,
                6.0182527677001945
              ],
              [
                94.07339064981034,
                5.471697526675984
              ]
            ]
          ],
          "geodesic": true,
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
        [[[94.39638662642335, 5.007390555105342],
          [95.58291006392335, 3.868256994189322],
          [97.47255850142335, 1.5858402393803428],
          [98.61513662642335, 0.7950016219503616],
          [99.53798818892335, -0.8309203019119887],
          [100.54873037642335, -2.456173364424782],
          [102.61416006392335, -4.999398110537003],
          [103.88857412642335, -6.136566275620084],
          [105.51902784085951, -6.130529794186863],
          [106.12327588773451, -5.605951384705749],
          [107.0016682817195, -3.352144325578943],
          [106.7819417192195, -1.2885200192914854],
          [104.0353596879695, -0.7063353624468065],
          [103.9804280473445, 0.04071705487550484],
          [103.5629475785945, 0.8756439070244846],
          [103.1894124223445, 1.424847517607419],
          [100.3219807817195, 3.0824419500613973],
          [97.83071486856034, 6.0182527677001945],
          [94.90835158731034, 6.0182527677001945],
          [94.07339064981034, 5.471697526675984]]]);
//Visualisasi data Hutan
var hutan = image.select (['treecover2000']);
// Map.addLayer (hutan.updateMask(hutan),
// {palette:['000000','00ff00'] , max:100},'Hutan Dunia');
//Visualisasi data deforestasi
var deforestasi = image.select (['loss']);
// Map.addLayer (deforestasi.updateMask(deforestasi),
// {palette: ['ff0000'] }, 'Deforestasi Dunia');
//Visualisasi data reboisasi
var reboisasi = image.select (['gain']);
// Map.addLayer (reboisasi.updateMask(reboisasi),
// {palette:['0025ff']}, 'Reboisasi Dunia');
//Visualisasi data reboisasi x deforestasi
var campuran = reboisasi.and(deforestasi);
// Map.addLayer (campuran.updateMask(campuran),
// {palette:['de00ff']}, 'Campuran');
//Perhitungan piksel deforestasi di wilayah Pulau Sumatera
var defPixel = deforestasi.reduceRegion ({
  reducer : ee.Reducer.sum(),
  geometry: sumatera, //sesuai dengan nama geometry
  scale : 30,
  maxPixels : 1e9
})
//Menampilkan jumlah pixel di Console
print ('Jumlah Pixel Area Deforestasi: ', defPixel.get('loss'))
//Perhitungan luas deforestasi di wilayah Pulau Sumatera
var area = deforestasi.multiply(ee.Image.pixelArea()).divide(10000); //mengkonversi m2 menjadi hektar
var defLuas = area.reduceRegion ({
  reducer: ee.Reducer.sum(),
  geometry: sumatera,
  scale: 30,
  maxPixels: 1e9
})
print('Luas Area Deforestasi: ', defLuas.get('loss'), 'Hektar');
//Perhitungan luas area reboisasi di wilayah Pulau Sumatera
var area = reboisasi.multiply(ee.Image.pixelArea()).divide(10000); //mengkonversi m2 menjadi hektar
var rebLuas = area.reduceRegion ({
  reducer: ee.Reducer.sum(),
  geometry: sumatera,
  scale: 30,
  maxPixels: 1e9
})
print('Luas Area Reboisasi: ', rebLuas.get('gain'), 'Hektar');
//Penambahan layer Deforestasi di wilayah Pulau Sumatera
var defSumatera = deforestasi.clip(sumatera);
Map.addLayer(defSumatera.updateMask(deforestasi),
{palette: ['ff0000']},'Deforestasi di Pulau Sumatera')
//Penambahan layer Reboisasi di wilayah Pulau Sumatera
var rebSumatera = reboisasi.clip(sumatera); 
Map.addLayer(rebSumatera.updateMask(reboisasi),
{palette: ['0025ff']},'Reboisasi di Pulau Sumatera')
//Pembuatan grafik Deforestasi per Tahun di wilayah Pulau Sumatera
//Penyusunan grup berdasarkan tahun dan luas deforestasi
var defAreaImage = deforestasi.multiply(ee.Image.pixelArea()).divide (10000); //konversi luas m2 menjadi hektar
var defYear = image.select(['lossyear']);
var defByYear = defAreaImage.addBands(defYear).reduceRegion({
    reducer: ee.Reducer.sum().
    group ({groupField: 1}),
    geometry : sumatera,
    scale : 30,
    maxPixels : 1e10
  });
print (defByYear);
//Perubahan format tahun dengan menambahkan 2000
var yearFormat = ee.List (defByYear.get('groups')).
map (function(el){
  var d = ee.Dictionary (el);
  return [ee.Number(d.get('group')).format ("20%02d"), d.get('sum')];});
var year = ee.Dictionary (yearFormat.flatten());
print(year)
//Pembuatan grafik
var grafik = ui.Chart.array.values ({
  array: year.values(),
  axis: 0,
  xLabels: year.keys()})
  .setChartType('ColumnChart').setOptions({
  title: 'Data Deforestasi Tahunan',
  hAxis: {title: 'Tahun', format: '####'},
  vAxis: {title: 'Luas (Hektar)'},
  legend: {position:"none"},
  lineWidth : 1,
  pointSize: 3
});
//print(grafik)
//Penambahan panel untuk menampilkan luas area di dalam Peta
var hasil = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px',
    width: '350px'
  }
});
//Atur parameter untuk visualisasi
var titleVis = {
  'margin': '0 px 0px 15px 0px',
  'fontSize': '18px',
  'font-weight': '',
  'color':'000000'
};
var textVis = {
  'margin': '0px 8px 2px 0px',
  'fontWeight':'bold'
};
var numberVis = {
  'margin':'0px 0px 15px 0px', 
  'color':'bf0f19',
  'fontWeight':'bold'
  };
//Pengisian panel hasil
var title = ui.Label ('Hasil Perhitungan', titleVis);
var text1 = ui.Label ('Deforestasi di Pulau Sumatera',textVis);
var number1 = ui.Label('Mohon Tunggu...',numberVis); 
(defLuas.get('loss')).evaluate(function(val){number1.setValue(val+' Hektar')}),numberVis;
var text2 = ui.Label ('Reboisasi di Pulau Sumatera',textVis);
var number2 = ui.Label('Mohon Tunggu...',numberVis); 
(rebLuas.get('gain')).evaluate(function(val){number2.setValue(val+' Hektar')}),numberVis;
hasil.add(ui.Panel([title,text1,number1,text2,number2]));
Map.add(hasil);
//Penambahan panel legenda
var legend = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px',
  }
});
var legendTitle = ui.Label ('Keterangan',titleVis);
legend.add(legendTitle);
//Buat row berisi warna dan deskripsi
var makeRow = function(color, name) {
      var colorBox = ui.Label({
        style: {
          backgroundColor: color,
          padding: '8px',
          margin: '0 0 4px 0'
        }
      });
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}
      });
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
// Isi palet dengan warna merah dan biru
var palette = ['#d63000', '#001fd6'];
// Isi deskripsi
var names =['Deforestasi', 'Reboisasi'];
//Tambahkan palet warna dan deskripsi ke dalam legenda
for (var i = 0 ; i<2; i++){
  legend.add(makeRow(palette[i],names[i]));
}
Map.add(legend);
//Tambahkan grafik ke dalam Peta
var chart1 = ui.Panel ({
  style: {
    position: 'bottom-left',
    padding: '30px 15px',
    width : '350px'
  }
});
chart1.add(ui.Panel(grafik));
Map.add(chart1)
Map.centerObject(sumatera,5)