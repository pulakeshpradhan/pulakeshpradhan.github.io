var geometry1 = ui.import && ui.import("geometry1", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                114.23563041629514,
                -3.418637722148117
              ],
              [
                114.43887748660764,
                -3.53926460241245
              ],
              [
                114.54324760379514,
                -3.6269834083882286
              ],
              [
                114.58719291629514,
                -3.742101391466801
              ],
              [
                114.55972709598264,
                -3.835281082671097
              ],
              [
                114.67508354129514,
                -3.8846074107066655
              ],
              [
                114.86841833548294,
                -3.8407619270432924
              ],
              [
                115.03870642142044,
                -3.6927669381622685
              ],
              [
                115.12110388235794,
                -3.467986946410445
              ],
              [
                115.14856970267044,
                -3.287027475741694
              ],
              [
                115.17603552298294,
                -3.1224903295346067
              ],
              [
                115.28040564017044,
                -2.8975814720483974
              ],
              [
                115.48365271048294,
                -2.568366958935234
              ],
              [
                115.67591345267044,
                -2.337865654284842
              ],
              [
                115.69239294485794,
                -2.206133383673687
              ],
              [
                115.59709319570997,
                -2.090858051107143
              ],
              [
                115.47624358633497,
                -1.9755742506224896
              ],
              [
                115.36088714102247,
                -1.9810641405455436
              ],
              [
                115.07524260977247,
                -2.2829786708733097
              ],
              [
                114.90495452383497,
                -2.4531212724861473
              ],
              [
                114.70720061758497,
                -2.6561662424492485
              ],
              [
                114.53141936758497,
                -2.8152863939434027
              ],
              [
                114.36662444570997,
                -2.9853562905899667
              ],
              [
                114.30070647695997,
                -3.117005306497306
              ],
              [
                114.24577483633497,
                -3.2486378520966097
              ],
              [
                114.24028167227247,
                -3.2925115875020268
              ],
              [
                114.22929534414747,
                -3.3638022741898586
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
        [[[114.23563041629514, -3.418637722148117],
          [114.43887748660764, -3.53926460241245],
          [114.54324760379514, -3.6269834083882286],
          [114.58719291629514, -3.742101391466801],
          [114.55972709598264, -3.835281082671097],
          [114.67508354129514, -3.8846074107066655],
          [114.86841833548294, -3.8407619270432924],
          [115.03870642142044, -3.6927669381622685],
          [115.12110388235794, -3.467986946410445],
          [115.14856970267044, -3.287027475741694],
          [115.17603552298294, -3.1224903295346067],
          [115.28040564017044, -2.8975814720483974],
          [115.48365271048294, -2.568366958935234],
          [115.67591345267044, -2.337865654284842],
          [115.69239294485794, -2.206133383673687],
          [115.59709319570997, -2.090858051107143],
          [115.47624358633497, -1.9755742506224896],
          [115.36088714102247, -1.9810641405455436],
          [115.07524260977247, -2.2829786708733097],
          [114.90495452383497, -2.4531212724861473],
          [114.70720061758497, -2.6561662424492485],
          [114.53141936758497, -2.8152863939434027],
          [114.36662444570997, -2.9853562905899667],
          [114.30070647695997, -3.117005306497306],
          [114.24577483633497, -3.2486378520966097],
          [114.24028167227247, -3.2925115875020268],
          [114.22929534414747, -3.3638022741898586]]]),
    geometry = ui.import && ui.import("geometry", "table", {
      "id": "users/fatwaramdani/watershed-banjarmasin"
    }) || ee.FeatureCollection("users/fatwaramdani/watershed-banjarmasin"),
    GgIrama = ui.import && ui.import("GgIrama", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            114.60070720272451,
            -3.30769623872733
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
    ee.Geometry.Point([114.60070720272451, -3.30769623872733]),
    PolsekBanjarTimur = ui.import && ui.import("PolsekBanjarTimur", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            114.61635697320607,
            -3.3354171892722047
          ]
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
    ee.Geometry.Point([114.61635697320607, -3.3354171892722047]),
    PangeranHidayatullah = ui.import && ui.import("PangeranHidayatullah", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            114.61688278024889,
            -3.3117755214486
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#0b4a8b",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #0b4a8b */
    /* shown: false */
    ee.Geometry.Point([114.61688278024889, -3.3117755214486]);
//Add Copernicus data
var dataset = ee.Image("COPERNICUS/Landcover/100m/Proba-V-C3/Global/2019")
.select('discrete_classification');
var data_clip = dataset.clip(geometry);
Map.addLayer(data_clip, {}, "Land Cover Banjar");
// Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();
// Paint all the polygon edges with the same number and width, display.
var outline = empty.paint({
  featureCollection: geometry,
  color: 1,
  width: 3
});
Map.addLayer(outline, {palette: 'FF0000'}, 'Watershed');
// Add legend
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px'
  }});
// Create legend title
var legendTitle = ui.Label({
  value: 'Land Use Land Cover Classes',
  style: {fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }});
// Add the title to the panel
legend.add(legendTitle);
// Creates and styles 1 row of the legend.
var makeRow = function(color, name) {
      // Create the label that is actually the colored box.
      var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
          // Use padding to give the box height and width.
          padding: '8px',
          margin: '0 0 4px 0'
        }});
      // Create the label filled with the description text.
      var description = ui.Label({
        value: name,
        style: {fontWeight: '',
    fontSize: '10px', margin: '0 0 4px 6px'}
      });
      // return the panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      })};
//  Palette with the colors
var palette =['FA0000', 'F096FF', 'FFFF4C', 'FFBB22', '009900', '4E751F', '8DB400', 'B4B4B4','0096A0', '0032C8'];
// name of the legend
var names = ['Urban / built up. Land covered by buildings and other man-made structures.', 'Cultivated and managed vegetation / agriculture. ', 'Shrubs (foliage can be either evergreen or deciduous).', 'Herbaceous vegetation. Tree and shrub cover is less than 10 %.', 'Closed forest, evergreen broad leaf. Tree canopy >70 %', 'Closed forest, mixed.', 'Open forest, evergreen broad leaf. Top layer- trees 15-70 %.', 'Bare / sparse vegetation. Lands with exposed soil, sand, or rocks.', 'Herbaceous wetland. Lands with a permanent mixture of water and herbaceous or woody vegetation.', 'Permanent water bodies. Lakes, reservoirs, and rivers. Can be either fresh or salt-water bodies.'];
// Add color and and names
for (var i = 0; i < 10; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }
// add legend to map (alternatively you can also print the legend to the console)
Map.add(legend);
var title = ui.Label("Satellite observation and analysis of floods affected areas of Barito Watershed (January 2021)");
title.style().set({
  height: '10%',
  width: '100%',
  margin: 0,
  textAlign: 'center',
  fontSize: '24px',
  backgroundColor: '444444',
  color: 'white'
});
Map.add(title);
//Menentukan periode sebelum banjir
var before_start= '2020-11-20';
var before_end='2020-12-29';
//Menentukan waktu setelah banjir
var after_start='2021-01-05';
var after_end='2021-01-25';
//Menentukan parameter
var polarization = "VH"; /*or 'VV' --> VH seringkali digunakan untuk analisis banjir, namun tergantung study area, VV juga bisa dipilih.*/ 
var pass_direction = "DESCENDING"; /* atau 'ASCENDING', bisa diganti jika imgae collection kosong atau tidak ditemukan.*/
var difference_threshold = 1.18; /* ambang batas ini didapatkan dari proses trial and error, jika pada wilayah studi terlihat kesalahan, anda bisa mengubah nilai ini*/
//Mengubah nama geometry 
var aoi = ee.FeatureCollection(geometry);
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
      var swater = ee.Image('JRC/GSW1_2/GlobalSurfaceWater').select('seasonality');
      var swater_mask = swater.gte(10).updateMask(swater.gte(10));
      //Area tergenang (lebih dari 10 bulan/tahun) diberikan nilai 0
      var flooded_mask = difference_binary.where(swater_mask,0);
      // final flooded area without pixels in perennial waterbodies
      var flooded = flooded_mask.updateMask(flooded_mask);
      //Mengurangi noise dari area prediksi banjir 
      var connections = flooded.connectedPixelCount();    
      var flooded = flooded.updateMask(connections.gte(8));
      //Analisis hanya pada area dengan slope kurang dari 5% 
      //var DEM = ee.Image('WWF/HydroSHEDS/03VFDEM');
      var DEM = ee.Image("USGS/SRTMGL1_003");
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
var LC = ee.ImageCollection('COPERNICUS/Landcover/100m/Proba-V-C3/Global')
  .filterDate('2014-01-01',after_end)
  .sort('system:index',false)
  .select("discrete_classification")
  .first()
  .clip(aoi);
// Extract hanya data lahan pertanian
var cropmask = LC.eq(40)
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
  scale: 100,
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
var urbanmask = LC.eq(50)
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
  scale: 100,
  bestEffort: true,
  });
//Mengubah satuan ke ha
var urban_area_ha = urban_stats
  .getNumber('discrete_classification')
  .divide(10000)
  .round();
// Extract hanya data lahan Shrubs
var shrubsmask = LC.eq(20)
var shrubs = LC
  .updateMask(shrubsmask)
//Mendapatkan proyeksi MODIS
var MODISprojection = LC.projection();
//Reproyeksi data banjir ke data MODIS
var flooded_res = flooded
    .reproject({
    crs: MODISprojection
  });
//Menghitung area terdampak
var shrubs_affected = flooded_res
  .updateMask(shrubs)
//Mendapatkan area piksel dari area terdampak
var shrubs_pixelarea = shrubs_affected
  .multiply(ee.Image.pixelArea());
//Menjumlahkan piksel area terdampak
var shrubs_stats = shrubs_pixelarea.reduceRegion({
  reducer: ee.Reducer.sum(),             
  geometry: aoi,
  scale: 100,
  maxPixels: 1e9
  });
//Mengubah satuan meter ke hektar
var shrubs_area_ha = shrubs_stats
  .getNumber(polarization)
  .divide(10000)
  .round();
// Extract hanya data lahan Herba
var herbamask = LC.eq(30).or(LC.eq(90))
var herba = LC
  .updateMask(herbamask)
//Mendapatkan proyeksi MODIS
var MODISprojection = LC.projection();
//Reproyeksi data banjir ke data MODIS
var flooded_res = flooded
    .reproject({
    crs: MODISprojection
  });
//Menghitung area terdampak
var herba_affected = flooded_res
  .updateMask(herba)
//Mendapatkan area piksel dari area terdampak
var herba_pixelarea = herba_affected
  .multiply(ee.Image.pixelArea());
//Menjumlahkan piksel area terdampak
var herba_stats = herba_pixelarea.reduceRegion({
  reducer: ee.Reducer.sum(),             
  geometry: aoi,
  scale: 100,
  maxPixels: 1e9
  });
//Mengubah satuan meter ke hektar
var herba_area_ha = herba_stats
  .getNumber(polarization)
  .divide(10000)
  .round();
// Extract hanya data lahan forest
var forestmask = LC.eq(112).or(LC.eq(115)).or(LC.eq(122))
var forest = LC
  .updateMask(forestmask)
//Mendapatkan proyeksi MODIS
var MODISprojection = LC.projection();
//Reproyeksi data banjir ke data MODIS
var flooded_res = flooded
    .reproject({
    crs: MODISprojection
  });
//Menghitung area terdampak
var forest_affected = flooded_res
  .updateMask(forest)
//Mendapatkan area piksel dari area terdampak
var forest_pixelarea = forest_affected
  .multiply(ee.Image.pixelArea());
//Menjumlahkan piksel area terdampak
var forest_stats = forest_pixelarea.reduceRegion({
  reducer: ee.Reducer.sum(),             
  geometry: aoi,
  scale: 100,
  maxPixels: 1e9
  });
//Mengubah satuan meter ke hektar
var forest_area_ha = forest_stats
  .getNumber(polarization)
  .divide(10000)
  .round();
//MENAMPILKAN HASIL KE PANEL PETA
//Mosaik data SAR sebelum dan setelah kejadian banjir
Map.centerObject(aoi,11);
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
  min: 0.0,
  max: 200.0,
  palette: [
    '05450a', '086a10', '54a708', '78d203', '009900', 'c6b044', 'dcd159',
    'dade48', 'fbff13', 'b6ff05', '27ff87', 'c24f44', 'a5a5a5', 'ff6d4c',
    '69fff8', 'f9ffa4', '1c0dff'
  ],
};
Map.addLayer(LC, LCVis, 'Land Cover',0);
//Lahan perkotaan
var urbanVis = {
  min: 0,
  max: 50.0,
  palette: ['red'],
};
Map.addLayer(urban, urbanVis, 'Urban',0)
// Affected urban
Map.addLayer(urban_affected, urbanVis, 'Affected Urban'); 
//Lahan pertanian
var croplandVis = {
  min: 0,
  max: 40.0,
  palette: ['F096FF'],
};
//Lahan pertanian terdampak
Map.addLayer(cropland_affected, croplandVis, 'Affected Cropland'); 
//Lahan shrubs
var shrubsVis = {
  min: 0,
  max: 20.0,
  palette: ['yellow'],
};
Map.addLayer(shrubs_affected, shrubsVis, 'Affected shrubs',0)
//Lahan herba
var herbaVis = {
  min: 0,
  max: 30.0,
  palette: ['FFFF4C'],
};
Map.addLayer(herba_affected, herbaVis, 'Affected herbaceous',0)
//Lahan forest
var forestVis = {
  min: 111,
  max: 126.0,
  palette: ['009900'],
};
Map.addLayer(forest_affected, forestVis, 'Affected forest',0)
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
/*
var title = ui.Label({
  value: 'Analisis Dampak Bencana Banjir Banjarmasin (Januari 2021)',
  style:{
  fontWeight: 'bold',
  fontSize: '25px'
  }});
title.style().set('position', 'top-center');
//Menampilkan judul
Map.add(title);
*/
//Parameter posisi panel 
var results = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 25px',
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
var title = ui.Label('Result', titleTextVis);
var text1 = ui.Label('Flood periods:',textVis);
var number1 = ui.Label(after_start.concat(" and ",after_end),numberVIS);
//Estimasi luasan banjir 
var text2 = ui.Label('Flood extent estimation:',textVis);
var text2_2 = ui.Label('Dalam proses...',subTextVis);
dates(after_collection).evaluate(function(val){text2_2.setValue('Based on data of Sentinel-1 SAR'+val)});
var number2 = ui.Label('Dalam proses...',numberVIS); 
flood_area_ha.evaluate(function(val){number2.setValue(val+' ha')}),numberVIS;
//Estimasi jumlah populasi terdampak
var text3 = ui.Label('Estimation of affected population: ',textVis);
var text3_2 = ui.Label('Based on data of GHSL 2015 (250m)',subTextVis);
var number3 = ui.Label('Dalam proses...',numberVIS);
number_pp_exposed.evaluate(function(val){number3.setValue(val)}),numberVIS;
// Estimasi lahan pertanian terdampak
var MODIS_date = ee.String(LC.get('system:index')).slice(0,4);
var text4 = ui.Label('Estimation of affected cultivation:',textVis);
var text4_2 = ui.Label('Dalam proses', subTextVis)
MODIS_date.evaluate(function(val){text4_2.setValue('Based on data of Copernicus Land Cover '+val +' (100m)')}), subTextVis;
var number4 = ui.Label('Dalam proses...',numberVIS);
crop_area_ha.evaluate(function(val){number4.setValue(val+' ha')}),numberVIS;
// Estimated area perkotaan terdampak
var text5 = ui.Label('Estimation of affected urban:',textVis);
var text5_2 = ui.Label('Dalam proses', subTextVis)
MODIS_date.evaluate(function(val){text5_2.setValue('Based on data of Copernicus Land Cover '+val +' (100m)')}), subTextVis;
var number5 = ui.Label('Dalam proses...',numberVIS);
urban_area_ha.evaluate(function(val){number5.setValue(val+' ha')}),numberVIS;
// Estimated area shrubs terdampak
var text6 = ui.Label('Estimation of affected shrubs:',textVis);
var text6_2 = ui.Label('Dalam proses', subTextVis)
MODIS_date.evaluate(function(val){text6_2.setValue('Based on data of Copernicus Land Cover '+val +' (100m)')}), subTextVis;
var number6 = ui.Label('Dalam proses...',numberVIS);
shrubs_area_ha.evaluate(function(val){number6.setValue(val+' ha')}),numberVIS;
// Estimated area herba terdampak
var text7 = ui.Label('Estimation of affected herbaceous:',textVis);
var text7_2 = ui.Label('Dalam proses', subTextVis)
MODIS_date.evaluate(function(val){text7_2.setValue('Based on data of Copernicus Land Cover '+val +' (100m)')}), subTextVis;
var number7 = ui.Label('Dalam proses...',numberVIS);
herba_area_ha.evaluate(function(val){number7.setValue(val+' ha')}),numberVIS;
// Estimated area forest terdampak
var text8 = ui.Label('Estimation of affected forest:',textVis);
var text8_2 = ui.Label('Dalam proses', subTextVis)
MODIS_date.evaluate(function(val){text8_2.setValue('Based on data of Copernicus Land Cover '+val +' (100m)')}), subTextVis;
var number8 = ui.Label('Dalam proses...',numberVIS);
forest_area_ha.evaluate(function(val){number8.setValue(val+' ha')}),numberVIS;
// Disclaimer
//var text6 = ui.Label('Banjir terjadi di hampir seluruh wilayah Jakarta mulai dini hari 1 Januari 2020, akibat hujan deras mulai dari sore hari tanggal 31 Desember 2019 yang tercatat mencapai hampir 400 milimeter air hujan. Sedikitnya 66 orang tewas dan 60.000 mengungsi akibat banjir terparah di daerah itu sejak 2007.',subTextVis)
// Diolah oleh...
var text10 = ui.Label('Script dasar dibuat oleh: UN-SPIDER pada Desember 2019 dan dimodifikasi oleh by Dr. Fatwa Ramdani pada Januari 2021 untuk Analisis Banjir Banjarmasin', subTextVis)
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
        text6_2,
        number6,
        text7,
        text7_2,
        number7,
        text8,
        text8_2,
        number8,
        text10]
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
var legendTitle = ui.Label('Legend of affected areas',titleTextVis);
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
var palette =['#0000FF', 'F096FF', 'red', 'FFFF4C', 'FFBB22', '009900' ];
//Nama legenda
var names = ['Flooded areas','Affected cultivated areas','Affected urban/built up areas', 'Affected shrubs areas', 'Affected herbaceous areas', 'Affected forest areas'];
//Menambahkan warna dan nama
for (var i = 0; i < 6; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
//Membuat legenda kedua berupa kepadatan penduduk
var legendTitle2 = ui.Label({
value: 'Population density',
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