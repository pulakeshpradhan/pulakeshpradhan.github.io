var FIRE = ui.import && ui.import("FIRE", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            114.6402614882032,
            -3.4154927392993284
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            114.5922821333448,
            -3.390645731216263
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            114.890268243397,
            -3.269288472527639
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.2411674357665,
            -2.9323287758782133
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            114.96854582599657,
            -2.6892878409955676
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([114.6402614882032, -3.4154927392993284]),
            {
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([114.5922821333448, -3.390645731216263]),
            {
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([114.890268243397, -3.269288472527639]),
            {
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([115.2411674357665, -2.9323287758782133]),
            {
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([114.96854582599657, -2.6892878409955676]),
            {
              "system:index": "4"
            })]),
    UNBURN = ui.import && ui.import("UNBURN", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            115.3247466780485,
            -2.69076463024489
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            114.94325258307175,
            -2.785345767042599
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            114.99480611453284,
            -3.0472814473858425
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            114.90927606882416,
            -3.5540654966359173
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            114.69340336539898,
            -3.1856963435427255
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#ff3beb",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #ff3beb */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([115.3247466780485, -2.69076463024489]),
            {
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([114.94325258307175, -2.785345767042599]),
            {
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([114.99480611453284, -3.0472814473858425]),
            {
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([114.90927606882416, -3.5540654966359173]),
            {
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([114.69340336539898, -3.1856963435427255]),
            {
              "system:index": "4"
            })]),
    REGROWTH = ui.import && ui.import("REGROWTH", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            114.84660022812223,
            -3.1331617057285346
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            114.94716756443981,
            -3.0592439828820144
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            114.83898338134712,
            -2.77159288600263
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.01428428565454,
            -2.6214979291788785
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.15568293953054,
            -2.7753348354913245
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#0b4a8b",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #0b4a8b */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([114.84660022812223, -3.1331617057285346]),
            {
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([114.94716756443981, -3.0592439828820144]),
            {
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([114.83898338134712, -2.77159288600263]),
            {
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([115.01428428565454, -2.6214979291788785]),
            {
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([115.15568293953054, -2.7753348354913245]),
            {
              "system:index": "4"
            })]),
    kalsel = ui.import && ui.import("kalsel", "table", {
      "id": "users/Rosmalisa_Dwiyaniek_ITS/shp_kalsel"
    }) || ee.FeatureCollection("users/Rosmalisa_Dwiyaniek_ITS/shp_kalsel"),
    roi = ui.import && ui.import("roi", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                114.32253418173079,
                -3.5267143827763525
              ],
              [
                114.95699463094954,
                -3.6637731791247394
              ],
              [
                115.63814697469954,
                -2.489951339008843
              ],
              [
                115.00917968954329,
                -2.355489147561675
              ]
            ]
          ],
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
        [[[114.32253418173079, -3.5267143827763525],
          [114.95699463094954, -3.6637731791247394],
          [115.63814697469954, -2.489951339008843],
          [115.00917968954329, -2.355489147561675]]]);
//PRE 
var c1 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_118062_20140901'); 
var c2 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_117062_20140825'); 
Map.centerObject(roi, 9);
var mosaic_2014 = ee.ImageCollection([c1, c2]).mosaic();
//POST
var c3 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_118062_20180928'); 
var c4 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_117062_20180820'); 
var mosaic_2018 = ee.ImageCollection([c3, c4]).mosaic();
//POST20
var c5 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_118062_20200121'); 
var c6 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_117062_20200505');  
var mosaic_2020 = ee.ImageCollection([c5, c6]).mosaic();
//------------------------------------CLIP CITRA------------------------------------------
//clip daratan dengan NDBI
var landpre = mosaic_2014.normalizedDifference(['B3', 'B5']).lt(0);
var land = landpre.selfMask();
//raster2vektor daratan
var classespre = land.reduceToVectors({reducer: ee.Reducer.countEvery(), scale: 30, geometry : roi,maxPixels: 1e8});
var result = ee.FeatureCollection(classespre);
var clip_2014 = (mosaic_2014.clip(roi).clip(result));
Map.addLayer(clip_2014, {bands: ['B6', 'B5', 'B3'], max: [0.3, 0.4, 0.3]}, 'Satellite Imagery 2014');
var clip_2018 = (mosaic_2018.clip(roi).clip(result));
Map.addLayer(clip_2018, {bands: ['B6', 'B5', 'B3'], max: [0.3, 0.4, 0.3]}, 'Satellite Imagery 2018');
var clip_2020 = (mosaic_2020.clip(roi).clip(result));
Map.addLayer(clip_2020, {bands: ['B6', 'B5', 'B3'], max: [0.3, 0.4, 0.3]}, 'Satellite Imagery 2020');
//--------------------------------NORMALIZED BURN RATIO-----------------------------------
var NBR2014 = clip_2014.normalizedDifference(['B5', 'B7']);
  print("Pre-fire NBR ", NBR2014);
var NBR2018 = clip_2018.normalizedDifference(['B5', 'B7']);
  print("Post-fire NBR 19 ", NBR2018);
var NBR2020 = clip_2020.normalizedDifference(['B5', 'B7']);
  print("Post-fire NBR 20 ", NBR2020);
// Delta NBR / dNBR
var dNBR2015_unscaled = NBR2014.subtract(NBR2018);
var dNBR2019_unscaled = NBR2018.subtract(NBR2020);
// Skala produk sesuai standart USGS
var dNBR2015 = dNBR2015_unscaled.multiply(1000);
  print("Difference Normalized Burn Ratio 2015", dNBR2015);
var dNBR2019 = dNBR2019_unscaled.multiply(1000);
  print("Difference Normalized Burn Ratio 2019", dNBR2019);
//==========================================================================================
//                              MENAMBAHKAN LAYER KE PETA
//--------------------------- Burn Ratio Product - Greyscale -------------------------------
var grey = ['white', 'black'];
//Map.addLayer(preNBR, {min: -1, max: 1, palette: grey}, 'Prefire Normalized Burn Ratio');
//Map.addLayer(postNBR15, {min: -1, max: 1, palette: grey}, 'Postfire Normalized Burn Ratio');
//Map.addLayer(dNBR, {min: -2000, max: 2000, palette: grey}, 'dNBR greyscale');
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
Map.addLayer(dNBR2015.sldStyle(sld_intervals), {}, 'Land Cover Change 2015');
Map.addLayer(dNBR2019.sldStyle(sld_intervals), {}, 'Land Cover Change 2019');
// Memisahkan hasil dalam 8 kelas klasifikasi
var thresholds = ee.Image([-1000, -251, -101, 99, 269, 439, 659, 2000]);
var classified2015 = dNBR2015.lt(thresholds).reduce('sum').toInt();
var classified2019 = dNBR2019.lt(thresholds).reduce('sum').toInt();
//==========================================================================================
//                                  STATISTIK BURNED AREA
// Menghitung jumpah pixel di seluruh lapisan
var allpix2015 =  classified2015.updateMask(classified2015);  //menutupi seluruh layer
var pixstats2015 = allpix2015.reduceRegion({
  reducer: ee.Reducer.count(),                  // menghitung pixel di satu lapisan
  geometry: roi,
  scale: 30,
  bestEffort:true,
  });
var allpixels2015 = ee.Number(pixstats2015.get('sum')); // extract jumlah pixel menjadi angka
var allpix2019 =  classified2019.updateMask(classified2019);  //menutupi seluruh layer
var pixstats2019 = allpix2019.reduceRegion({
  reducer: ee.Reducer.count(),                  // menghitung pixel di satu lapisan
  geometry: roi,
  scale: 30,
  bestEffort:true,
  });
var allpixels2019 = ee.Number(pixstats2019.get('sum')); // extract jumlah pixel menjadi angka
// Membuat daftar kosong untuk menyimpan suatu nilai area
var arealist2015 = [];
var arealist2019 = [];
// Membuat fungsi untuk memperoleh tingkat satu kelas keparahan luka bakar
// Argumen adalah nomor kelas dan nama kelas
var areacount2015 = function(cnr2015, name2015) {
 var singleMask2015 =  classified2015.updateMask(classified2015.eq(cnr2015));  // menutupi satu kelas
 var stats2015 = singleMask2015.reduceRegion({
  reducer: ee.Reducer.count(),               // menghitung jumlah pixel dalam satu kelas
  geometry: roi,
  scale: 30,
  bestEffort:true,
  });
var pix2015 =  ee.Number(stats2015.get('sum'));
var hect2015 = pix2015.multiply(900).divide(10000);                // Landsat pixel = 30m x 30m --> 900 sqm
var perc2015 = pix2015.divide(allpixels2015).multiply(10000).round().divide(100);   // membentuk presentase area berdasarkan kelas klasifikasi dan dalam bentuk desimal 2 dibelakang koma
arealist2015.push({Class: name2015, Pixels: pix2015, Hectares: hect2015, Percentage: perc2015});
};
// Urutan berbeda untuk kelas keparahan 
var names2015 = ['NA', 'High Severity', 'Moderate-high Severity',
'Moderate-low Severity', 'Low Severity','Unburned', 'Enhanced Regrowth, Low', 'Enhanced Regrowth, High'];
// Menjalankan fungsi di setiap kelas
for (var i = 0; i < 8; i++) {
  areacount2015(i, names2015[i]);
  }
  var areacount2019 = function(cnr2019, name2019) {
 var singleMask2019 =  classified2019.updateMask(classified2019.eq(cnr2019));  // menutupi satu kelas
 var stats2019 = singleMask2019.reduceRegion({
  reducer: ee.Reducer.count(),               // menghitung jumlah pixel dalam satu kelas
  geometry: roi,
  scale: 30,
  bestEffort:true,
  });
var pix2019 =  ee.Number(stats2019.get('sum'));
var hect2019 = pix2019.multiply(900).divide(10000);                // Landsat pixel = 30m x 30m --> 900 sqm
var perc2019 = pix2019.divide(allpixels2019).multiply(10000).round().divide(100);   // membentuk presentase area berdasarkan kelas klasifikasi dan dalam bentuk desimal 2 dibelakang koma
arealist2019.push({Class: name2019, Pixels: pix2019, Hectares: hect2019, Percentage: perc2019});
};
// Urutan berbeda untuk kelas keparahan 
var names2019 = ['NA 2019', 'High Severity 2019', 'Moderate-high Severity 2019',
'Moderate-low Severity 2019', 'Low Severity 2019','Unburned 2019', 'Enhanced Regrowth, Low 2019', 'Enhanced Regrowth, High 2019'];
// Menjalankan fungsi di setiap kelas
for (var j = 0; j < 8; j++) {
  areacount2019(j, names2019[j]);
  }
print('Burned Area by Severity Class 2015', arealist2015, '--> click list objects for individual classes');
print('Burned Area by Severity Class 2019', arealist2019, '--> click list objects for individual classes');
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
  value: 'Legend',
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
  value: 'Mapping of Land Cover Change Due to Fire in South Kalimantan',
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
  rows: [{c: [{v: 'NA'}, {v: 305.28}]},
         {c: [{v: 'Enhanced Regrowth - High'}, {v: 263544.70}]},
         {c: [{v: 'Enhanced Regrowth - Low'}, {v: 192781.20}]},
         {c: [{v: 'Unburned'}, {v: 390941.60}]},
         {c: [{v: 'Low Severity'}, {v: 20933.37}]},
         {c: [{v: 'Moderate-low Severity'}, {v: 2778.93}]},
         {c: [{v: 'Moderate-high Severity'}, {v: 6072.66}]},
         {c: [{v: 'High Severity'}, {v: 1116.00}]}]
};
// Define a dictionary of customization options.
var options = {
  title: 'Land Cover Change due to Fire 2019',
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
  rows: [{c: [{v: 'NA'}, {v: 389.86}]},
         {c: [{v: 'Enhanced Regrowth - High'}, {v: 51677.55}]},
         {c: [{v: 'Enhanced Regrowth - Low'}, {v: 115516.17}]},
         {c: [{v: 'Unburned'}, {v: 541886.94}]},
         {c: [{v: 'Low Severity'}, {v: 125325.90}]},
         {c: [{v: 'Moderate-low Severity'}, {v: 31716.00}]},
         {c: [{v: 'Moderate-high Severity'}, {v: 9717.48}]},
         {c: [{v: 'High Severity'}, {v: 2243.70}]}]
};
// Define a dictionary of customization options.
var options2 = {
  title: 'Land Cover Change due to Fire 2015',
  vAxis: {title: 'Class'},
  legend: {position: 'none'},
  hAxis: {
    title: 'Area (hektar)',
    logScale: true
  }
};
// Make a BarChart from the table and the options.
var chart2 = new ui.Chart(dataTable2, 'BarChart', options2);
sidebar.add(chart2);
sidebar.add(chart);