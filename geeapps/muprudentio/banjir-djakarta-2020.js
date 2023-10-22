var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                115.28252161509316,
                -8.087493170234701
              ],
              [
                115.28252161509316,
                -8.596303888024059
              ],
              [
                115.7960369620928,
                -8.596303888024059
              ],
              [
                115.7960369620928,
                -8.087493170234701
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [
        {
          "type": "rectangle"
        }
      ],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[115.28252161509316, -8.087493170234701],
          [115.28252161509316, -8.596303888024059],
          [115.7960369620928, -8.596303888024059],
          [115.7960369620928, -8.087493170234701]]], null, false),
    table = ui.import && ui.import("table", "table", {
      "id": "users/muprudentio/SHPJakarta"
    }) || ee.FeatureCollection("users/muprudentio/SHPJakarta");
//Menentukan periode sebelum banjir
var before_start= '2019-12-01';
var before_end='2019-12-31';
//Menentukan waktu setelah banjir
var after_start='2020-01-01';
var after_end='2020-01-31';
//Menentukan parameter
var polarization = "VH"; /*or 'VV' --> VH seringkali digunakan untuk analisis banjir, namun tergantung study area, VV juga bisa dipilih.*/ 
var pass_direction = "DESCENDING"; /* atau 'ASCENDING', bisa diganti jika imgae collection kosong atau tidak ditemukan.*/
var difference_threshold = 1.05; /* ambang batas ini didapatkan dari proses trial and error, jika pada wilayah studi terlihat kesalahan, anda bisa mengubah nilai ini*/
//Mengubah nama geometry 
var aoi = ee.FeatureCollection(table);
//Panggil dan filter data GRD 
var collection= ee.ImageCollection('COPERNICUS/S1_GRD')
  .filter(ee.Filter.eq('instrumentMode','IW'))
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', polarization))
  .filter(ee.Filter.eq('orbitProperties_pass',pass_direction)) 
  .filter(ee.Filter.eq('resolution_meters',10))
  .filterBounds(aoi)
  .select(polarization);
//Pilih data berdasarkan parameter periode yang telah ditentukan sebelumnya
var before_collection = collection.filterDate(before_start, before_end);
var after_collection = collection.filterDate(after_start,after_end);
// Print data yang terpilih ke panel console
      // Extract tanggal dari metadata
      function dates(imgcol){
        var range = imgcol.reduceColumns(ee.Reducer.minMax(), ["system:time_start"]);
        var printed = ee.String('from ')
          .cat(ee.Date(range.get('min')).format('YYYY-MM-dd'))
          .cat(' to ')
          .cat(ee.Date(range.get('max')).format('YYYY-MM-dd'));
        return printed;
      }
      //Print tanggal sebelum kejadian banjir ke panel console
      var before_count = before_collection.size();
      print(ee.String('Tiles selected: Before Flood ').cat('(').cat(before_count).cat(')'),
        dates(before_collection), before_collection);
      //Print tanggal setelah kejadian banjir ke panel console
      var after_count = before_collection.size();
      print(ee.String('Tiles selected: After Flood ').cat('(').cat(after_count).cat(')'),
        dates(after_collection), after_collection);
//Membuat mosaik dari data yang terpilih dan dipotong sesuai area study
var before = before_collection.mosaic().clip(aoi);
var after = after_collection.mosaic().clip(aoi);
//Mengurangi noise (radar speckle) dengan smoothing  
var smoothing_radius = 50;
var before_filtered = before.focal_mean(smoothing_radius, 'circle', 'meters');
var after_filtered = after.focal_mean(smoothing_radius, 'circle', 'meters');
//MENGHITUNG LUASAN AREA TERDAMPAK BANJIR
//Menghitung perbedaan sebelum dan setelah kejadian
var difference = after_filtered.divide(before_filtered);
//Menerapkan nilai ambang batas dan membuat area banjir 
var threshold = difference_threshold;
var difference_binary = difference.gt(threshold);
//Meminimalisir uncertainty kejadian banjir
      //Badan air permanen (lebih dari 10 bulan/tahun) akan dikeluarkan dari analisis
      var swater = ee.Image('JRC/GSW1_0/GlobalSurfaceWater').select('seasonality');
      var swater_mask = swater.gte(10).updateMask(swater.gte(10));
      //Area tergenang (lebih dari 10 bulan/tahun) diberikan nilai 0
      var flooded_mask = difference_binary.where(swater_mask,0);
      // final flooded area without pixels in perennial waterbodies
      var flooded = flooded_mask.updateMask(flooded_mask);
      //Mengurangi noise dari area prediksi banjir 
      var connections = flooded.connectedPixelCount();    
      var flooded = flooded.updateMask(connections.gte(8));
      //Analisis hanya pada area dengan slope kurang dari 5% 
      var DEM = ee.Image('WWF/HydroSHEDS/03VFDEM');
      var terrain = ee.Algorithms.Terrain(DEM);
      var slope = terrain.select('slope');
      var flooded = flooded.updateMask(slope.lt(5));
//Menghitung area luasan banjir
//Membuat layer raster 
var flood_pixelarea = flooded.select(polarization)
  .multiply(ee.Image.pixelArea());
//Menjumlahkan piksel banjir
//Parameter di set ke: 'bestEffort: true' untuk mengurangi waktu komputasi, untuk hasil 
// yang lebih akurat set ke: 'bestEffort: false' and tingkatkan nilai 'maxPixels'. 
var flood_stats = flood_pixelarea.reduceRegion({
  reducer: ee.Reducer.sum(),              
  geometry: aoi,
  scale: 10, // resolusi asli sentinel 
  //maxPixels: 1e9,
  bestEffort: true
  });
//Mengubah satuan luas ke ha (hasil perhitungan sebenarnya dalam satuan meters)  
var flood_area_ha = flood_stats
  .getNumber(polarization)
  .divide(10000)
  .round(); 
  //ANALISIS DAMPAK BANJIR
//Memanggil data kepadatan populasi global milik JRC (resolusi 250 m)
//Memotong layer kepadatan populasi
var population_count = ee.Image('JRC/GHSL/P2016/POP_GPW_GLOBE_V1/2015').clip(aoi);
//Menghitung populasi terdampak
var GHSLprojection = population_count.projection();
//Melakukan reproyeksi layer banjir ke skala GHSL
var flooded_res1 = flooded
    .reproject({
    crs: GHSLprojection
  });
//Membuat layer raster populasi terdampak yang telah disesuaikan dengan layer banjir
var population_exposed = population_count
  .updateMask(flooded_res1)
  .updateMask(population_count);
//Menjumlahkan nilai piksel dari populasi terdampak 
var stats = population_exposed.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: aoi,
  scale: 250,
  maxPixels:1e9 
});
//Mendapatkan angka populasi terdampak dalam format integer
var number_pp_exposed = stats.getNumber('population_count').round();
//Area lahan pertanian terdampak
//Menggunakan data MODIS Land Cover Type Yearly Global 500m
//Melakukan filter data MODIS Land Cover product terbaru
var LC = ee.ImageCollection('MODIS/006/MCD12Q1')
  .filterDate('2014-01-01',after_end)
  .sort('system:index',false)
  .select("LC_Type1")
  .first()
  .clip(aoi);
// Extract hanya data lahan pertanian
var cropmask = LC
  .eq(12)
  .or(LC.eq(14))
var cropland = LC
  .updateMask(cropmask)
//Mendapatkan proyeksi MODIS
var MODISprojection = LC.projection();
//Reproyeksi data banjir ke data MODIS
var flooded_res = flooded
    .reproject({
    crs: MODISprojection
  });
//Menghitung area terdampak
var cropland_affected = flooded_res
  .updateMask(cropland)
//Mendapatkan area piksel dari area terdampak
var crop_pixelarea = cropland_affected
  .multiply(ee.Image.pixelArea());
//Menjumlahkan piksel area terdampak
var crop_stats = crop_pixelarea.reduceRegion({
  reducer: ee.Reducer.sum(),             
  geometry: aoi,
  scale: 500,
  maxPixels: 1e9
  });
//Mengubah satuan meter ke hektar
var crop_area_ha = crop_stats
  .getNumber(polarization)
  .divide(10000)
  .round();
//Lahan perkotaan terdampak
//Menggunakan data MODIS Land Cover Product yang sama 
//Filter area urban
var urbanmask = LC.eq(13)
var urban = LC
  .updateMask(urbanmask)
//Menghitung area perkotaan terdampak
var urban_affected = urban
  .mask(flooded_res)
  .updateMask(urban);
//Mendapatkan piksel 
var urban_pixelarea = urban_affected
  .multiply(ee.Image.pixelArea()); 
//Menjumlahkan piksel
var urban_stats = urban_pixelarea.reduceRegion({
  reducer: ee.Reducer.sum(),                 
  geometry: aoi,
  scale: 500,
  bestEffort: true,
  });
//Mengubah satuan ke ha
var urban_area_ha = urban_stats
  .getNumber('LC_Type1')
  .divide(10000)
  .round();
//MENAMPILKAN HASIL KE PANEL PETA
//Mosaik data SAR sebelum dan setelah kejadian banjir
Map.centerObject(aoi,10);
Map.addLayer(before_filtered, {min:-25,max:0}, 'Before Flood',0);
Map.addLayer(after_filtered, {min:-25,max:0}, 'After Flood',1);
//Layer perbedaan
Map.addLayer(difference,{min:0,max:2},"Difference Layer",0);
//Area banjir
Map.addLayer(flooded,{palette:"0000FF"},'Flooded areas');
//Kepadatan populasi
var populationCountVis = {
  min: 0,
  max: 200.0,
  palette: ['060606','337663','337663','ffffff'],
};
Map.addLayer(population_count, populationCountVis, 'Population Density',0);
//Populasi terdampak
var populationExposedVis = {
  min: 0,
  max: 200.0,
  palette: ['yellow', 'orange', 'red'],
};
Map.addLayer(population_exposed, populationExposedVis, 'Exposed Population');
//Menampilkan Data Tutupan Lahan MODIS
var LCVis = {
  min: 1.0,
  max: 17.0,
  palette: [
    '05450a', '086a10', '54a708', '78d203', '009900', 'c6b044', 'dcd159',
    'dade48', 'fbff13', 'b6ff05', '27ff87', 'c24f44', 'a5a5a5', 'ff6d4c',
    '69fff8', 'f9ffa4', '1c0dff'
  ],
};
Map.addLayer(LC, LCVis, 'Land Cover',0);
//Lahan pertanian
var croplandVis = {
  min: 0,
  max: 14.0,
  palette: ['30b21c'],
};
Map.addLayer(cropland, croplandVis, 'Cropland',0)
//Lahan pertanian terdampak
Map.addLayer(cropland_affected, croplandVis, 'Affected Cropland'); 
//Lahan perkotaan
var urbanVis = {
  min: 0,
  max: 13.0,
  palette: ['orange'],
};
Map.addLayer(urban, urbanVis, 'Urban',0)
// Affected urban
Map.addLayer(urban_affected, urbanVis, 'Affected Urban'); 
//EXPORT DATA UNTUK ANALISIS LEBIH JAUH MENGGUNAKAN PLATFORM QGIS
// Export area banjir dalam format TIFF 
Export.image.toDrive({
  image: flooded, 
  description: 'Flood_extent_raster',
  fileNamePrefix: 'flooded',
  region: aoi, 
  maxPixels: 1e10
});
// Export area banjir dalam format shapefile (untuk analisis lebih jauh menggunakan QGIS)
// Mengubah raster banjir ke polygons
var flooded_vec = flooded.reduceToVectors({
  scale: 10,
  geometryType:'polygon',
  geometry: aoi,
  eightConnected: false,
  bestEffort:true,
  tileScale:2,
});
// Export polygons banjir dalam format shape-file
Export.table.toDrive({
  collection:flooded_vec,
  description:'Flood_extent_vector',
  fileFormat:'SHP',
  fileNamePrefix:'flooded_vec'
});
// Export data populasi terdampak
Export.image.toDrive({
  image:population_exposed,
  description:'Exposed_Population',
  scale: 250,
  fileNamePrefix:'population_exposed',
  region: aoi,
  maxPixels:1e10
});
//MENAMPILKAN PANEL AKSESORIS DAN INFORMASI TAMBAHAN
//Membuat Judul
var title = ui.Label({
  value: 'Analisis Dampak Bencana Banjir DKI Jakarta 2020',
  style:{
  fontWeight: 'bold',
  fontSize: '25px'
  }});
title.style().set('position', 'top-center');
//Menampilkan judul
Map.add(title);
//Parameter posisi panel 
var results = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px',
    width: '350px'
  }
});
//Parameter visualisasi label teks
var textVis = {
  'margin':'0px 8px 2px 0px',
  'fontWeight':'bold'
  };
var numberVIS = {
  'margin':'0px 0px 15px 0px', 
  'color':'bf0f19',
  'fontWeight':'bold'
  };
var subTextVis = {
  'margin':'0px 0px 2px 0px',
  'fontSize':'12px',
  'color':'grey'
  };
var titleTextVis = {
  'margin':'0px 0px 15px 0px',
  'fontSize': '18px', 
  'font-weight':'', 
  'color': '3333ff'
  };
//Membuat label judul panel di sebelah kiri
var title = ui.Label('Hasil Analisis', titleTextVis);
var text1 = ui.Label('Periode Kejadian Banjir:',textVis);
var number1 = ui.Label(after_start.concat(" dan ",after_end),numberVIS);
//Estimasi luasan banjir 
var text2 = ui.Label('Estimasi luasan banjir:',textVis);
var text2_2 = ui.Label('Dalam proses...',subTextVis);
dates(after_collection).evaluate(function(val){text2_2.setValue('Berdasarkan data Sentinel-1'+val)});
var number2 = ui.Label('Dalam proses...',numberVIS); 
flood_area_ha.evaluate(function(val){number2.setValue(val+' hektar')}),numberVIS;
//Estimasi jumlah populasi terdampak
var text3 = ui.Label('Estimasi populasi yang terdampak: ',textVis);
var text3_2 = ui.Label('Berdasarkan data GHSL 2015 (250m)',subTextVis);
var number3 = ui.Label('Dalam proses...',numberVIS);
number_pp_exposed.evaluate(function(val){number3.setValue(val)}),numberVIS;
// Estimasi lahan pertanian terdampak
var MODIS_date = ee.String(LC.get('system:index')).slice(0,4);
var text4 = ui.Label('Estimasi lahan pertanian yang terdampak:',textVis);
var text4_2 = ui.Label('Dalam proses', subTextVis)
MODIS_date.evaluate(function(val){text4_2.setValue('Berdasarkan data MODIS Land Cover '+val +' (500m)')}), subTextVis;
var number4 = ui.Label('Dalam proses...',numberVIS);
crop_area_ha.evaluate(function(val){number4.setValue(val+' hektar')}),numberVIS;
// Estimated area perkotaan terdampak
var text5 = ui.Label('Estimasi lahan perkotaan yang terdampak:',textVis);
var text5_2 = ui.Label('Dalam proses', subTextVis)
MODIS_date.evaluate(function(val){text5_2.setValue('Berdasarkan data MODIS Land Cover '+val +' (500m)')}), subTextVis;
var number5 = ui.Label('Dalam proses...',numberVIS);
urban_area_ha.evaluate(function(val){number5.setValue(val+' hektar')}),numberVIS;
// Disclaimer
var text6 = ui.Label('Pernyataan: Informasi ini diperoleh melalui analisis data citra satelit saja tanpa didukung informasi validasi dari lapangan. Semua informasi geografis yang tersaji memiliki keterbatasan skala, resolusi, tanggal dan interpretasi dari data primer.',subTextVis)
// Diolah oleh...
var text7 = ui.Label('Script dasar dibuat oleh: UN-SPIDER pada Desember 2019 dan dimodifikasi oleh by Dr. Fatwa Ramdani pada Juli 2020 untuk Analisis Banjir Masamba', subTextVis)
// Menambahkan label ke panel
results.add(ui.Panel([
        title,
        text1,
        number1,
        text2,
        text2_2,
        number2,
        text3,
        text3_2,
        number3,
        text4,
        text4_2,
        number4,
        text5,
        text5_2,
        number5,
        text6,
        text7]
      ));
//Menambahkan panel ke peta 
Map.add(results);
//Membuat panel aksesoris dan komponen kartografi
var legend = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px',
  }
});
//Membuat judul legenda
var legendTitle = ui.Label('Legenda',titleTextVis);
//Menambahkan judul ke panel
legend.add(legendTitle);
//Membuat 1 baris
var makeRow = function(color, name) {
      //Membuat label
      var colorBox = ui.Label({
        style: {
          backgroundColor: color,
          //Parameter tinggi dan lebar
          padding: '8px',
          margin: '0 0 4px 0'
        }
      });
      //Membuat label
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}
      });
      //Manampilkan panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
//Parameter warna palette
var palette =['#0000FF', '#30b21c', 'orange'];
//Nama legenda
var names = ['Area Terdampak Banjir','Lahan Pertanian Terdampak','Lahan Perkotaan Terdampak'];
//Menambahkan warna dan nama
for (var i = 0; i < 3; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
//Membuat legenda kedua berupa kepadatan penduduk
var legendTitle2 = ui.Label({
value: 'Kepadatan Penduduk',
style: {
fontWeight: 'bold',
fontSize: '15px',
margin: '10px 0 0 0',
padding: '0'
}
});
//Menambahkan judul legenda kedua
legend.add(legendTitle2);
//Membuat gambar legenda
var lon = ee.Image.pixelLonLat().select('latitude');
var gradient = lon.multiply((populationExposedVis.max-populationExposedVis.min)/100.0).add(populationExposedVis.min);
var legendImage = gradient.visualize(populationExposedVis);
//Membuat teks di atas legenda
var panel = ui.Panel({
widgets: [
ui.Label('> '.concat(populationExposedVis['max']))
],
});
legend.add(panel);
//Menampilkan gambar legenda
var thumbnail = ui.Thumbnail({
image: legendImage,
params: {bbox:'0,0,10,100', dimensions:'10x50'},
style: {padding: '1px', position: 'bottom-center'}
});
//Menambahkan gambar ke legenda
legend.add(thumbnail);
//Membuat teks di bawah legenda
var panel = ui.Panel({
widgets: [
ui.Label(populationExposedVis['min'])
],
});
legend.add(panel);
//Menampilkan legenda di peta utama
Map.add(legend);