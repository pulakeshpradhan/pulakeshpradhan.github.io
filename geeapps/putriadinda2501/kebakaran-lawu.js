var lawu = ui.import && ui.import("lawu", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            111.21247686767578,
            -7.634589041824166
          ]
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
    ee.Geometry.Point([111.21247686767578, -7.634589041824166]),
    magetan = ui.import && ui.import("magetan", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                111.17265142822265,
                -7.596135745749969
              ],
              [
                111.17265142822265,
                -7.670997381870046
              ],
              [
                111.2523023071289,
                -7.670997381870046
              ],
              [
                111.2523023071289,
                -7.596135745749969
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#98ff00",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #98ff00 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[111.17265142822265, -7.596135745749969],
          [111.17265142822265, -7.670997381870046],
          [111.2523023071289, -7.670997381870046],
          [111.2523023071289, -7.596135745749969]]], null, false),
    daerah = ui.import && ui.import("daerah", "table", {
      "id": "users/putriadinda2501/MAGETAN"
    }) || ee.FeatureCollection("users/putriadinda2501/MAGETAN"),
    mgt = ui.import && ui.import("mgt", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                111.1813324879697,
                -7.612280398755967
              ],
              [
                111.1864381721577,
                -7.673401769468242
              ],
              [
                111.20351740195197,
                -7.6731471505269715
              ],
              [
                111.23218419645097,
                -7.674339033056065
              ],
              [
                111.25759008024004,
                -7.66208994134607
              ],
              [
                111.26342656705644,
                -7.633847638322253
              ],
              [
                111.26170995328691,
                -7.600158596271931
              ],
              [
                111.23802068326738,
                -7.603561650018174
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
        [[[111.1813324879697, -7.612280398755967],
          [111.1864381721577, -7.673401769468242],
          [111.20351740195197, -7.6731471505269715],
          [111.23218419645097, -7.674339033056065],
          [111.25759008024004, -7.66208994134607],
          [111.26342656705644, -7.633847638322253],
          [111.26170995328691, -7.600158596271931],
          [111.23802068326738, -7.603561650018174]]]),
    batashutan = ui.import && ui.import("batashutan", "table", {
      "id": "users/putriadinda2501/BATAS_HUTAN_POLYGON"
    }) || ee.FeatureCollection("users/putriadinda2501/BATAS_HUTAN_POLYGON");
function maskS2clouds(image) {
var qa = image.select('QA10').clip(daerah).clip(batashutan).clip(mgt);
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask).divide(10000);
}
//Data Filter Citra
var pre2017 = ee.ImageCollection('COPERNICUS/S2')
                  .filterDate('2017-08-25', '2017-08-30')
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',20))
                  .filterBounds(lawu)
                  .map(maskS2clouds);
var pre2018 = ee.ImageCollection('COPERNICUS/S2')
                  .filterDate('2018-05-03', '2018-05-06')
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',20))
                  .filterBounds(lawu)
                  .map(maskS2clouds);
var pre2019 = ee.ImageCollection('COPERNICUS/S2_SR')
                  .filterDate('2019-09-25', '2019-09-30')
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',100))
                  .filterBounds(lawu)
                  .map(maskS2clouds);
var post2017 = ee.ImageCollection('COPERNICUS/S2')
                  .filterDate('2017-10-05', '2017-10-07')
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',100))
                  .filterBounds(lawu)
                  .map(maskS2clouds);
var post2018 = ee.ImageCollection('COPERNICUS/S2')
                  .filterDate('2018-08-01', '2018-08-6')
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',100))
                  .filterBounds(lawu)
                  .map(maskS2clouds);
var post2019 = ee.ImageCollection('COPERNICUS/S2_SR')
                  .filterDate('2019-11-13', '2019-11-16')
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',100))
                  .filterBounds(lawu)
                  .map(maskS2clouds); 
var visualization = {
  min: 0.0,
  max: 0.3,
  bands: ['B4', 'B3', 'B2'],
};
var vis = {
  min: 0.0,
  max: 0.3,
  bands: ['B8', 'B11'],
};
Map.centerObject(mgt, 13);
Map.addLayer(pre2017.mean(), visualization, 'pre2017');
Map.addLayer(pre2018.mean(), visualization, 'pre2018');
Map.addLayer(pre2019.mean(), visualization, 'pre2019');
Map.addLayer(post2017.mean(), visualization, 'post2017');
Map.addLayer(post2018.mean(), visualization, 'post2018');
Map.addLayer(post2019.mean(), visualization, 'post2019');
  //print("Pre-fire 2017", pre2017.first());
//--------------------------------NORMALIZED BURN RATIO-----------------------------------
var NBRPRE2017 = pre2017.mean().normalizedDifference(['B8', 'B11']);
  //print("Pre-fire NBR 2017", NBRPRE2017);
var NBRPOST2017 = post2017.mean().normalizedDifference(['B8', 'B11']);
  //print("Post-fire NBR 2017 ", NBRPOST2017);
var NBRPRE2018 = pre2018.mean().normalizedDifference(['B8', 'B11']);
  //print("Pre-fire NBR 2018", NBRPRE2018);
var NBRPOST2018 = post2018.mean().normalizedDifference(['B8', 'B11']);
  //print("Post-fire NBR 2018 ", NBRPOST2018);
var NBRPRE2019 = pre2019.mean().normalizedDifference(['B8', 'B11']);
  //print("Pre-fire NBR 2019", NBRPRE2019);
var NBRPOST2019 = post2019.mean().normalizedDifference(['B8', 'B11']);
  //print("Post-fire NBR 2019 ", NBRPOST2019);
var grey = ['white', 'black'];
// Delta NBR / dNBR
var dNBR2017 = (NBRPRE2017.subtract(NBRPOST2017)).multiply(1000);
print("Difference Normalized Burn Ratio 2017", dNBR2017);
var dNBR2018 = (NBRPRE2018.subtract(NBRPOST2018)).multiply(1000);
print("Difference Normalized Burn Ratio 2018", dNBR2018);
var dNBR2019 = (NBRPRE2019.subtract(NBRPOST2019)).multiply(1000);
print("Difference Normalized Burn Ratio 2019", dNBR2019);
//------------------------- Burn Ratio Product - Klasifikasi ----------------------------
// Menentukan style SLD style interval diskrit untuk diterapkan pada gambar/citra
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
 Map.addLayer(dNBR2017.sldStyle(sld_intervals), {}, 'Land Cover Change Classification 2017');
Map.addLayer(dNBR2018.sldStyle(sld_intervals), {}, 'Land Cover Change Classification 2018');
Map.addLayer(dNBR2019.sldStyle(sld_intervals), {}, 'Land Cover Change Classification 2019');
// Memisahkan hasil dalam 8 kelas klasifikasi
var thresholds = ee.Image([-1000, -251, -101, 99, 269, 439, 659, 2000]);
var classified2017 = dNBR2017.lt(thresholds).reduce('sum').toInt();
var classified2018 = dNBR2018.lt(thresholds).reduce('sum').toInt();
var classified2019 = dNBR2019.lt(thresholds).reduce('sum').toInt();
//==========================================================================================
//                                  STATISTIK BURNED AREA
// Menghitung jumpah pixel di seluruh lapisan
var allpix2017 =  classified2017.updateMask(classified2017);  //menutupi seluruh layer
var pixstats2017 = allpix2017.reduceRegion({
  reducer: ee.Reducer.count(),                  // menghitung pixel di satu lapisan
  geometry: magetan,
  scale: 30,
  bestEffort:true,
  });
var allpixels2017 = ee.Number(pixstats2017.get('sum')); // extract jumlah pixel menjadi angka
var allpix2018 =  classified2018.updateMask(classified2018);  //menutupi seluruh layer
var pixstats2018 = allpix2018.reduceRegion({
  reducer: ee.Reducer.count(),                  // menghitung pixel di satu lapisan
  geometry: magetan,
  scale: 30,
  bestEffort:true,
  });
var allpixels2018 = ee.Number(pixstats2018.get('sum')); // extract jumlah pixel menjadi angka
var allpix2019 =  classified2019.updateMask(classified2019);  //menutupi seluruh layer
var pixstats2019 = allpix2019.reduceRegion({
  reducer: ee.Reducer.count(),                  // menghitung pixel di satu lapisan
  geometry: magetan,
  scale: 30,
  bestEffort:true,
  });
var allpixels2019 = ee.Number(pixstats2019.get('sum')); // extract jumlah pixel menjadi angka
// Membuat daftar kosong untuk menyimpan suatu nilai area
var arealist2017 = [];
var arealist2018 = [];
var arealist2019 = [];
// Membuat fungsi untuk memperoleh tingkat satu kelas keparahan luka bakar
// Argumen adalah nomor kelas dan nama kelas
var areacount2017 = function(cnr2017, name2017) {
 var singleMask2017 =  classified2017.updateMask(classified2017.eq(cnr2017));  // menutupi satu kelas
 var stats2017 = singleMask2017.reduceRegion({
  reducer: ee.Reducer.count(),               // menghitung jumlah pixel dalam satu kelas
  geometry: magetan,
  scale: 30,
  bestEffort:true,
  });
var pix2017 =  ee.Number(stats2017.get('sum'));
var hect2017 = pix2017.multiply(900).divide(10000);                // Landsat pixel = 30m x 30m --> 900 sqm
var perc2017 = pix2017.divide(allpixels2017).multiply(10000).round().divide(100);   // membentuk presentase area berdasarkan kelas klasifikasi dan dalam bentuk desimal 2 dibelakang koma
arealist2017.push({Class: name2017, Pixels: pix2017, Hectares: hect2017, Percentage: perc2017});
};
var areacount2018 = function(cnr2018, name2018) {
 var singleMask2018 =  classified2018.updateMask(classified2018.eq(cnr2018));  // menutupi satu kelas
 var stats2018 = singleMask2018.reduceRegion({
  reducer: ee.Reducer.count(),               // menghitung jumlah pixel dalam satu kelas
  geometry: magetan,
  scale: 30,
  bestEffort:true,
  });
var pix2018 =  ee.Number(stats2018.get('sum'));
var hect2018 = pix2018.multiply(900).divide(10000);                // Landsat pixel = 30m x 30m --> 900 sqm
var perc2018 = pix2018.divide(allpixels2018).multiply(10000).round().divide(100);   // membentuk presentase area berdasarkan kelas klasifikasi dan dalam bentuk desimal 2 dibelakang koma
arealist2018.push({Class: name2018, Pixels: pix2018, Hectares: hect2018, Percentage: perc2018});
};
var areacount2019 = function(cnr2019, name2019) {
 var singleMask2019 =  classified2019.updateMask(classified2019.eq(cnr2019));  // menutupi satu kelas
 var stats2019 = singleMask2019.reduceRegion({
  reducer: ee.Reducer.count(),               // menghitung jumlah pixel dalam satu kelas
  geometry: magetan,
  scale: 30,
  bestEffort:true,
  });
var pix2019 =  ee.Number(stats2019.get('sum'));
var hect2019 = pix2019.multiply(900).divide(10000);                // Landsat pixel = 30m x 30m --> 900 sqm
var perc2019 = pix2019.divide(allpixels2019).multiply(10000).round().divide(100);   // membentuk presentase area berdasarkan kelas klasifikasi dan dalam bentuk desimal 2 dibelakang koma
arealist2019.push({Class: name2019, Pixels: pix2019, Hectares: hect2019, Percentage: perc2019});
};
// Urutan berbeda untuk kelas keparahan 
var names2 = ['NA', 'High Severity', 'Moderate-high Severity',
'Moderate-low Severity', 'Low Severity','Unburned', 'Enhanced Regrowth, Low', 'Enhanced Regrowth, High'];
// Menjalankan fungsi di setiap kelas
for (var i = 0; i < 8; i++) {
  areacount2017(i, names2[i]);
  }
for (var i = 0; i < 8; i++) {
  areacount2018(i, names2[i]);
  }
for (var i = 0; i < 8; i++) {
  areacount2019(i, names2[i]);
  }
print('Burned Area by Severity Class', arealist2017, '--> click list objects for individual classes');
print('Burned Area by Severity Class', arealist2018, '--> click list objects for individual classes');
print('Burned Area by Severity Class', arealist2019, '--> click list objects for individual classes');
//==========================================================================================
//                                      MENAMBAHKAN LEGENDA
// Mengatur posisi panel
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }});
// Membentuk judul legenda
var legendTitle = ui.Label({
  value: 'Classification',
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
var palette =['7a8737', 'acbe4d', '0ae042', 'fff70b', 'ffaf38', 'ff641b', 'a41fd6', 'ffffff'];
// Keterangan dari legenda
var names = ['Enhanced Regrowth, High','Enhanced Regrowth, Low','Unburned', 'Low Severity',
'Moderate-low Severity', 'Moderate-high Severity', 'High Severity', 'NA'];
// Menambahkan warna dan nama
for (var i = 0; i < 8; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
Map.add(legend);
var title = ui.Label({
  value: 'Perubahan Lahan Akibat Kebakaran Hutan dan Lahan di Gunung Lawu',
  style: {fontSize: '20px'}
});
var sidebar = ui.Panel({
  widgets: [title],
  style: {width: '400px'}
});
// Add the sidebar to the ui.root.
ui.root.add(sidebar);
// Define a DataTable using a JavaScript literal.
var dataTable = {
  cols: [{id: 'Class', label: 'Classification', type: 'string'},
         {id: 'Area', label: 'Area (ha)', type: 'number'}],
  rows: [{c: [{v: 'NA'}, {v: 0}]},
         {c: [{v: 'Enhanced Regrowth - High'}, {v: 0}]},
         {c: [{v: 'Enhanced Regrowth - Low'}, {v: 2.07}]},
         {c: [{v: 'Unburned'}, {v: 3395.16}]},
         {c: [{v: 'Low Severity'}, {v:141.75}]},
         {c: [{v: 'Moderate-low Severity'}, {v: 1.62}]},
         {c: [{v: 'Moderate-high Severity'}, {v: 0.09}]},
         {c: [{v: 'High Severity'}, {v: 0}]}]
};
// Define a dictionary of customization options.
var options = {
  title: 'Land Cover Change due to Fire 2017',
  vAxis: {title: 'Class'},
  legend: {position: 'none'},
  hAxis: {
    title: 'Area (hektar)',
    logScale: true
  }
};
// Make a BarChart from the table and the options.
var chart = new ui.Chart(dataTable, 'BarChart', options);
// Define a DataTable using a JavaScript literal.
var dataTable2 = {
  cols: [{id: 'Class', label: 'Classification', type: 'string'},
         {id: 'Area', label: 'Area (ha)', type: 'number'}],
  rows: [{c: [{v: 'NA'}, {v: 0}]},
         {c: [{v: 'Enhanced Regrowth - High'}, {v: 1.8}]},
         {c: [{v: 'Enhanced Regrowth - Low'}, {v: 37.62}]},
         {c: [{v: 'Unburned'}, {v: 3188.52}]},
         {c: [{v: 'Low Severity'}, {v: 298.08}]},
         {c: [{v: 'Moderate-low Severity'}, {v: 12.15}]},
         {c: [{v: 'Moderate-high Severity'}, {v: 2.52}]},
         {c: [{v: 'High Severity'}, {v: 0}]}]
};
// Define a dictionary of customization options.
var options2 = {
  title: 'Land Cover Change due to Fire 2018',
  vAxis: {title: 'Class'},
  legend: {position: 'none'},
  hAxis: {
    title: 'Area (hektar)',
    logScale: true
  }
};
// Make a BarChart from the table and the options.
var chart2 = new ui.Chart(dataTable2, 'BarChart', options2);
// Define a DataTable using a JavaScript literal.
var dataTable3 = {
  cols: [{id: 'Class', label: 'Classification', type: 'string'},
         {id: 'Area', label: 'Area (ha)', type: 'number'}],
  rows: [{c: [{v: 'NA'}, {v: 0}]},
         {c: [{v: 'Enhanced Regrowth - High'}, {v: 0.81}]},
         {c: [{v: 'Enhanced Regrowth - Low'}, {v: 8.28}]},
         {c: [{v: 'Unburned'}, {v: 3393.54}]},
         {c: [{v: 'Low Severity'}, {v: 137.16}]},
         {c: [{v: 'Moderate-low Severity'}, {v: 0.45}]},
         {c: [{v: 'Moderate-high Severity'}, {v: 0.18}]},
         {c: [{v: 'High Severity'}, {v: 0.1}]}]
};
// Define a dictionary of customization options.
var options3 = {
  title: 'Land Cover Change due to Fire 2019',
  vAxis: {title: 'Class'},
  legend: {position: 'none'},
  hAxis: {
    title: 'Area (hektar)',
    logScale: true
  }
};
// Make a BarChart from the table and the options.
var chart3 = new ui.Chart(dataTable3, 'BarChart', options3);
sidebar.add(chart3);
sidebar.add(chart2);
sidebar.add(chart);