var roi = ui.import && ui.import("roi", "geometry", {
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
          [115.00917968954329, -2.355489147561675]]]),
    table2 = ui.import && ui.import("table2", "table", {
      "id": "users/putriadinda2501/VNF_npp_d20190909_noaa_v30-ez"
    }) || ee.FeatureCollection("users/putriadinda2501/VNF_npp_d20190909_noaa_v30-ez"),
    table3 = ui.import && ui.import("table3", "table", {
      "id": "users/putriadinda2501/VNF_npp_d20190925_noaa_v30-ez"
    }) || ee.FeatureCollection("users/putriadinda2501/VNF_npp_d20190925_noaa_v30-ez"),
    table = ui.import && ui.import("table", "table", {
      "id": "users/putriadinda2501/2019-09-25"
    }) || ee.FeatureCollection("users/putriadinda2501/2019-09-25"),
    FIRE = ui.import && ui.import("FIRE", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            114.36872549544017,
            -3.466515271263923
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.13048379228115,
            -3.0739443685176875
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.15844504219008,
            -3.0489212895390443
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.21984055960354,
            -2.9202861781812834
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.24292901480374,
            -2.9250007257753237
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "FeatureCollection",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([114.36872549544017, -3.466515271263923]),
            {
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([115.13048379228115, -3.0739443685176875]),
            {
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([115.15844504219008, -3.0489212895390443]),
            {
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([115.21984055960354, -2.9202861781812834]),
            {
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([115.24292901480374, -2.9250007257753237]),
            {
              "system:index": "4"
            })]),
    REGROWTH = ui.import && ui.import("REGROWTH", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            114.76542601584697,
            -2.8926933561493637
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            114.69412305802575,
            -3.26249836606802
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            114.47511332016084,
            -3.3965498271858863
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            114.48039190750215,
            -3.4981608088333
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.09527366889536,
            -2.75054176155851
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#ffe608",
      "mode": "FeatureCollection",
      "shown": true,
      "locked": false
    }) || /* color: #ffe608 */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([114.76542601584697, -2.8926933561493637]),
            {
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([114.69412305802575, -3.26249836606802]),
            {
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([114.47511332016084, -3.3965498271858863]),
            {
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([114.48039190750215, -3.4981608088333]),
            {
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([115.09527366889536, -2.75054176155851]),
            {
              "system:index": "4"
            })]),
    viirs = ui.import && ui.import("viirs", "table", {
      "id": "users/Rosmalisa_Dwiyaniek_ITS/VNF_npp_d20190925_noaa_v30-ezindo"
    }) || ee.FeatureCollection("users/Rosmalisa_Dwiyaniek_ITS/VNF_npp_d20190925_noaa_v30-ezindo"),
    UNBURN = ui.import && ui.import("UNBURN", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            114.51630931883317,
            -3.3043453648153127
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            114.96160655764864,
            -3.018762893141973
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            114.99624430573772,
            -2.7826008925730097
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            114.98186514396453,
            -2.630495282805724
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.23949492796548,
            -2.9156299165412727
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#4445d6",
      "mode": "FeatureCollection",
      "shown": true,
      "locked": false
    }) || /* color: #4445d6 */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([114.51630931883317, -3.3043453648153127]),
            {
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([114.96160655764864, -3.018762893141973]),
            {
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([114.99624430573772, -2.7826008925730097]),
            {
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([114.98186514396453, -2.630495282805724]),
            {
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([115.23949492796548, -2.9156299165412727]),
            {
              "system:index": "4"
            })]),
    modis = ui.import && ui.import("modis", "table", {
      "id": "users/Rosmalisa_Dwiyaniek_ITS/kalsel2019"
    }) || ee.FeatureCollection("users/Rosmalisa_Dwiyaniek_ITS/kalsel2019"),
    table4 = ui.import && ui.import("table4", "table", {
      "id": "users/Rosmalisa_Dwiyaniek_ITS/VNF_npp_d20180820_noaa_v30-ezindo"
    }) || ee.FeatureCollection("users/Rosmalisa_Dwiyaniek_ITS/VNF_npp_d20180820_noaa_v30-ezindo"),
    table5 = ui.import && ui.import("table5", "table", {
      "id": "users/Rosmalisa_Dwiyaniek_ITS/VNF_npp_d20180928_noaa_v30-ezindo"
    }) || ee.FeatureCollection("users/Rosmalisa_Dwiyaniek_ITS/VNF_npp_d20180928_noaa_v30-ezindo");
// ----------------Memanggil Citra terbaik (c1,c2,c3 = pra ; c4,c5.c6 = pasca)--------------------
var c1 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_118062_20140901'); 
var c2 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_117062_20140825'); 
var c3 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_118062_20180928'); 
var c4 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_117062_20180820'); 
var c5 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_118062_20200121'); 
var c6 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_117062_20200505'); 
Map.centerObject(roi, 9);
//-----------------------------------------MOSAIC CITRA -----------------------------------------
var mosaic_12 = ee.ImageCollection([c1, c2]).mosaic();
var mosaic_pre = ee.ImageCollection([c3, c4]).mosaic();
var mosaic_post19 = ee.ImageCollection([c5, c6]).mosaic();
//Map.addLayer(mosaic_pre, {bands: ['B6', 'B5', 'B3'], max: [0.3, 0.4, 0.3]}, 'mosaic_pre');
//Map.addLayer(mosaic_post19, {bands: ['B6', 'B5', 'B3'], max: [0.3, 0.4, 0.3]}, 'mosaic_post19');
//-----------------------------------------CLIP DARATAN---------------------------------------------
var land_12 = mosaic_12.normalizedDifference(['B3', 'B5']).lt(0);
var land12 = land_12.selfMask();
//var land_pre = mosaic_pre.normalizedDifference(['B3', 'B5']).lt(0);
//var land1 = land_pre.selfMask();
//var land_post19 = mosaic_post19.normalizedDifference(['B3', 'B5']).lt(0);
//var land3 = land_post19.selfMask();
//----------------------------------------RASTER2VEKTOR DARATAN---------------------------------------
var classes12 = land12.reduceToVectors({reducer: ee.Reducer.countEvery(), scale: 30, geometry : roi,maxPixels: 1e8});
var result12 = ee.FeatureCollection(classes12);
/*var classes = land1.reduceToVectors({reducer: ee.Reducer.countEvery(), scale: 30, geometry : roi,maxPixels: 1e8});
var result = ee.FeatureCollection(classes);
//Map.addLayer(result,{palette: ['white']}, 'pre landonly');
var classes2 = land3.reduceToVectors({reducer: ee.Reducer.countEvery(), scale: 30, geometry : roi,maxPixels: 1e8});
var result2 = ee.FeatureCollection(classes2);
//Map.addLayer(result2, {palette: ['white']}, 'post19 landonly');
*/
//------------------------------------------CLIP CITRA -------------------------------------------
var clip_pre = (mosaic_pre.clip(roi).clip(result12));
  //print('pre', clip_pre);
  //Map.addLayer(clip_pre, {bands: ['B6', 'B5', 'B3'], max: [0.3, 0.4, 0.3]}, 'clip_pre');
var clip_post19 = (mosaic_post19.clip(roi).clip(result12));
  //print('post19', clip_post19);  
  //Map.addLayer(clip_post19, {bands: ['B6', 'B5', 'B3'], max: [0.3, 0.4, 0.3]}, 'clip_post19');
//-------------------------------------NORMALIZED BURN RATIO-------------------------------------------
var preNBR = clip_pre.normalizedDifference(['B5', 'B7']);
  print("Pre-fire NBR ", preNBR);
var postNBR19 = clip_post19.normalizedDifference(['B5', 'B7']);
  print("Post-fire NBR 19 ", postNBR19);
//----------------------- Menghitung perbedaan antara citra pre dan post fire --------------------
// Delta NBR / dNBR
var dNBR_unscaled = preNBR.subtract(postNBR19);
// Skala produk sesuai standart USGS
var dNBR = dNBR_unscaled.multiply(1000);
print("Difference Normalized Burn Ratio ", dNBR);
//==========================================================================================
//                              MENAMBAHKAN LAYER KE PETA
//--------------------------- Burn Ratio Product - Greyscale -------------------------------
var grey = ['white', 'black'];
Map.addLayer(preNBR, {min: -1, max: 1, palette: grey}, 'Prefire Normalized Burn Ratio');
Map.addLayer(postNBR19, {min: -1, max: 1, palette: grey}, 'Postfire Normalized Burn Ratio');
Map.addLayer(dNBR, {min: -2000, max: 2000, palette: grey}, 'dNBR greyscale');
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
Map.addLayer(dNBR.sldStyle(sld_intervals), {}, 'dNBR classified');
// Memisahkan hasil dalam 8 kelas klasifikasi
var thresholds = ee.Image([-1000, -251, -101, 99, 269, 439, 659, 2000]);
var classified = dNBR.lt(thresholds).reduce('sum').toInt();
//==========================================================================================
//                                  STATISTIK BURNED AREA
// Menghitung jumpah pixel di seluruh lapisan
var allpix =  classified.updateMask(classified);  //menutupi seluruh layer
var pixstats = allpix.reduceRegion({
  reducer: ee.Reducer.count(),                  // menghitung pixel di satu lapisan
  geometry: roi,
  scale: 30,
  bestEffort:true,
  });
var allpixels = ee.Number(pixstats.get('sum')); // extract jumlah pixel menjadi angka
// Membuat daftar kosong untuk menyimpan suatu nilai area
var arealist = [];
// Membuat fungsi untuk memperoleh tingkat satu kelas keparahan luka bakar
// Argumen adalah nomor kelas dan nama kelas
var areacount = function(cnr, name) {
 var singleMask =  classified.updateMask(classified.eq(cnr));  // menutupi satu kelas
 var stats = singleMask.reduceRegion({
  reducer: ee.Reducer.count(),               // menghitung jumlah pixel dalam satu kelas
  geometry: roi,
  scale: 30,
  bestEffort:true,
  });
var pix =  ee.Number(stats.get('sum'));
var hect = pix.multiply(900).divide(10000);                // Landsat pixel = 30m x 30m --> 900 sqm
var perc = pix.divide(allpixels).multiply(10000).round().divide(100);   // membentuk presentase area berdasarkan kelas klasifikasi dan dalam bentuk desimal 2 dibelakang koma
arealist.push({Class: name, Pixels: pix, Hectares: hect, Percentage: perc});
};
// Urutan berbeda untuk kelas keparahan 
var names2 = ['NA', 'High Severity', 'Moderate-high Severity',
'Moderate-low Severity', 'Low Severity','Unburned', 'Enhanced Regrowth, Low', 'Enhanced Regrowth, High'];
// Menjalankan fungsi di setiap kelas
for (var i = 0; i < 8; i++) {
  areacount(i, names2[i]);
  }
print('Burned Area by Severity Class', arealist, '--> click list objects for individual classes');
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
  value: 'Klasifikasi Citra',
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
//========================================VALIDATION==============================================
//                              validasi dengan google earth
//                          MENAMPILKAN NILAI PIKSEL PADA TIAP SAMPEL
var FIRE = dNBR.reduceRegions({
  collection: (FIRE),
  reducer: ee.Reducer.mean().setOutputs(['FIRE']),
  scale: 10
  });
print('FIRE', FIRE);
var UNBURN = dNBR.reduceRegions({
  collection: (UNBURN),
  reducer: ee.Reducer.mean().setOutputs(['UNBURN']),
  scale: 10
  });
print('UNBURN', UNBURN);
var REGROWTH = dNBR.reduceRegions({
  collection: (REGROWTH),
  reducer: ee.Reducer.mean().setOutputs(['REGROWTH']),
  scale: 10
  });
print('REGROWTH', REGROWTH);
//MENAMPILKAN GRAFIK TIAP KELOMPOK SAMPEL
var grafFIRE = ui.Chart.feature.byFeature({
  features: FIRE,
  yProperties: ['FIRE']}) 
  .setChartType('ColumnChart')
  .setOptions({
      interpolateNulls: false,
      lineWidth: 1,
      pointSize: 3,
      title: 'NILAI PIKSEL API TIAP SAMPEL',
      vAxis: {title: 'DN'},
      hAxis: {title: 'Sampel ke-'}
    });
print(grafFIRE);
var grafUNB = ui.Chart.feature.byFeature({
  features: UNBURN,
  yProperties: ['UNBURN']}) 
  .setChartType('ColumnChart')
  .setOptions({
      interpolateNulls: false,
      lineWidth: 1,
      pointSize: 3,
      title: 'NILAI PIKSEL UNBURN TIAP SAMPEL',
      vAxis: {title: 'DN'},
      hAxis: {title: 'Sampel ke-'}
    });
print(grafUNB);
var grafREG = ui.Chart.feature.byFeature({
  features: REGROWTH,
  yProperties: ['REGROWTH']}) 
  .setChartType('ColumnChart')
  .setOptions({
      interpolateNulls: false,
      lineWidth: 1,
      pointSize: 3,
      title: 'NILAI PIKSEL REGROWTH TIAP SAMPEL',
      vAxis: {title: 'DN'},
      hAxis: {title: 'Sampel ke-'}
    });
print(grafREG);
/*//MENAMPILKAN DATA HOTSPORT VIIRS
var fire = ee.FeatureCollection('users/Rosmalisa_Dwiyaniek_ITS/kalsel2019');
var fire1 = ee.FeatureCollection('users/Rosmalisa_Dwiyaniek_ITS/VNF_npp_d20180820_noaa_v30-ezindo');
var fire2 = ee.FeatureCollection('users/Rosmalisa_Dwiyaniek_ITS/VNF_npp_d20180928_noaa_v30-ezindo');
var api = fire.filterBounds(roi);
var api1 = fire1.filterBounds(roi);
var api2 = fire2.filterBounds(roi);
Map.addLayer (api, {color:'red'}, 'titik api');
Map.addLayer (api1, {color:'red'}, 'titik api1');
Map.addLayer (api2, {color:'red'}, 'titik api2');
// import the collection
var result = dNBR.reduceRegions(api,ee.Reducer.mean(),10);
var data = ee.Number(result);
print(result);
var data = dNBR.reduceRegions({
  collection: api,
  reducer: ee.Reducer.mean(),
  scale: 10
  });
print('datanbr',data);
//===========================================================================================
//                                       EXPOT HASIL
Export.image.toDrive({
  image: dNBR,
  description: "CETAK 2019",
  folder: "Kerja Praktik",
  fileNamePrefix: "2019",
  region: roi, // batas daerah yang akan disimpan
  scale: 30,
  maxPixels: 10e10,
  fileFormat: "GeoTIFF"
})
//Export.image.toDrive(image, description, folder, fileNamePrefix, dimensions, 
//region, scale, crs, crsTransform, maxPixels, shardSize, fileDimensions, skipEmptyTiles, fileFormat, formatOptions)
Export.image.toDrive(dNBR.sldStyle(sld_intervals));
// Export the FeatureCollection to a KML file.
Export.table.toDrive({
  collection: firepoint,
  description:'vectorsToDriveExample',
  fileFormat: 'KML'
});
*/