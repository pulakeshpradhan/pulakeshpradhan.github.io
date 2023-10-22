//Impor Data
var Location = ee.FeatureCollection("users/qurotul310/Admin_Jakarta");
var LST1990 = ee.Image("users/qurotul310/LST1990");
var LST1994 = ee.Image("users/qurotul310/LST1994");
var LST1997 = ee.Image("users/qurotul310/LST1997");
var LST1999 = ee.Image("users/qurotul310/LST1999");
var LST2004 = ee.Image("users/qurotul310/LST2004");
var LST2006 = ee.Image("users/qurotul310/LST2006");
var LST2009 = ee.Image("users/qurotul310/LST2009");
var LST2013 = ee.Image("users/qurotul310/LST2013");
var LST2015 = ee.Image("users/qurotul310/LST2015");
var LST2018 = ee.Image("users/qurotul310/LST2018");
var LST2021 = ee.Image("users/qurotul310/LST2021");
var NDVI = ee.Image("users/qurotul310/NDVI2021");
var NDBI = ee.Image("users/qurotul310/NDBI2021");
//Mengatur Kelas Klasifikasi LST
var LST1990class1 = LST1990.updateMask(LST1990.lte(27.86));
var LST1990class2 = LST1990.updateMask(LST1990.gt(27.86).and(LST1990.lte(28.69)));
var LST1990class3 = LST1990.updateMask(LST1990.gt(28.69).and(LST1990.lte(32)));
var LST1990class4 = LST1990.updateMask(LST1990.gt(32));
var LST1994class1 = LST1994.updateMask(LST1994.lte(27.86));
var LST1994class2 = LST1994.updateMask(LST1994.gt(27.86).and(LST1994.lte(28.69)));
var LST1994class3 = LST1994.updateMask(LST1994.gt(28.69).and(LST1994.lte(32)));
var LST1994class4 = LST1994.updateMask(LST1994.gt(32));
var LST1997class1 = LST1997.updateMask(LST1997.lte(27.86));
var LST1997class2 = LST1997.updateMask(LST1997.gt(27.86).and(LST1997.lte(28.69)));
var LST1997class3 = LST1997.updateMask(LST1997.gt(28.69).and(LST1997.lte(32)));
var LST1997class4 = LST1997.updateMask(LST1997.gt(32));
var LST1999class1 = LST1999.updateMask(LST1999.lte(27.86));
var LST1999class2 = LST1999.updateMask(LST1999.gt(27.86).and(LST1999.lte(28.69)));
var LST1999class3 = LST1999.updateMask(LST1999.gt(28.69).and(LST1999.lte(32)));
var LST1999class4 = LST1999.updateMask(LST1999.gt(32));
var LST2004class1 = LST2004.updateMask(LST2004.lte(27.86));
var LST2004class2 = LST2004.updateMask(LST2004.gt(27.86).and(LST2004.lte(28.69)));
var LST2004class3 = LST2004.updateMask(LST2004.gt(28.69).and(LST2004.lte(32)));
var LST2004class4 = LST2004.updateMask(LST2004.gt(32));
var LST2006class1 = LST2006.updateMask(LST2006.lte(27.86));
var LST2006class2 = LST2006.updateMask(LST2006.gt(27.86).and(LST2006.lte(28.69)));
var LST2006class3 = LST2006.updateMask(LST2006.gt(28.69).and(LST2006.lte(32)));
var LST2006class4 = LST2006.updateMask(LST2006.gt(32));
var LST2009class1 = LST2009.updateMask(LST2009.lte(27.86));
var LST2009class2 = LST2009.updateMask(LST2009.gt(27.86).and(LST2009.lte(28.69)));
var LST2009class3 = LST2009.updateMask(LST2009.gt(28.69).and(LST2009.lte(32)));
var LST2009class4 = LST2009.updateMask(LST2009.gt(32));
var LST2013class1 = LST2013.updateMask(LST2013.lte(27.86));
var LST2013class2 = LST2013.updateMask(LST2013.gt(27.86).and(LST2013.lte(28.69)));
var LST2013class3 = LST2013.updateMask(LST2013.gt(28.69).and(LST2013.lte(32)));
var LST2013class4 = LST2013.updateMask(LST2013.gt(32));
var LST2015class1 = LST2015.updateMask(LST2015.lte(27.86));
var LST2015class2 = LST2015.updateMask(LST2015.gt(27.86).and(LST2015.lte(28.69)));
var LST2015class3 = LST2015.updateMask(LST2015.gt(28.69).and(LST2015.lte(32)));
var LST2015class4 = LST2015.updateMask(LST2015.gt(32));
var LST2018class1 = LST2018.updateMask(LST2018.lte(27.86));
var LST2018class2 = LST2018.updateMask(LST2018.gt(27.86).and(LST2018.lte(28.69)));
var LST2018class3 = LST2018.updateMask(LST2018.gt(28.69).and(LST2018.lte(32)));
var LST2018class4 = LST2018.updateMask(LST2018.gt(32));
var LST2021class1 = LST2021.updateMask(LST2021.lte(27.86));
var LST2021class2 = LST2021.updateMask(LST2021.gt(27.86).and(LST2021.lte(28.69)));
var LST2021class3 = LST2021.updateMask(LST2021.gt(28.69).and(LST2021.lte(32)));
var LST2021class4 = LST2021.updateMask(LST2021.gt(32));
var NDVIclass1 = NDVI.updateMask(NDVI.lte(-0.03));
var NDVIclass2 = NDVI.updateMask(NDVI.gt(-0.031).and(NDVI.lte(0.15)));
var NDVIclass3 = NDVI.updateMask(NDVI.gt(0.151).and(NDVI.lte(0.25)));
var NDVIclass4 = NDVI.updateMask(NDVI.gt(0.251).and(NDVI.lte(0.35)));
var NDVIclass5 = NDVI.updateMask(NDVI.gt(0.351).and(NDVI.lte(1)));
var NDBIclass1 = NDBI.updateMask(NDBI.lte(-0.50));
var NDBIclass2 = NDBI.updateMask(NDBI.gt(-0.501).and(NDBI.lte(-0.26)));
var NDBIclass3 = NDBI.updateMask(NDBI.gt(-0.261).and(NDBI.lte(-0.02)));
var NDBIclass4 = NDBI.updateMask(NDBI.gt(-0.021).and(NDBI.lte(0.22)));
var NDBIclass5 = NDBI.updateMask(NDBI.gt(0.221).and(NDBI.lte(1)));
//Mengatur Simbologi Kelas Klasifikasi LST
var LST1990class1RGB = LST1990class1.visualize(
    {min: 17.46, max: 27.86, palette: ['50a600','50a600']});
var LST1990class2RGB = LST1990class2.visualize(
    {min: 27.861, max: 28.69, palette: ['d5fd27','d5fd27']});
var LST1990class3RGB = LST1990class3.visualize(
    {min: 28.691, max: 32, palette: ['ff8b00','ff8b00']});
var LST1990class4RGB = LST1990class4.visualize(
    {min: 32.1, max: 43.39, palette: ['ff0000','ff0000']});
var LST1994class1RGB = LST1994class1.visualize(
    {min: 17.46, max: 27.86, palette: ['50a600','50a600']});
var LST1994class2RGB = LST1994class2.visualize(
    {min: 27.861, max: 28.69, palette: ['d5fd27','d5fd27']});
var LST1994class3RGB = LST1994class3.visualize(
    {min: 28.691, max: 32, palette: ['ff8b00','ff8b00']});
var LST1994class4RGB = LST1994class4.visualize(
    {min: 32.1, max: 43.39, palette: ['ff0000','ff0000']});
var LST1997class1RGB = LST1997class1.visualize(
    {min: 17.46, max: 27.86, palette: ['50a600','50a600']});
var LST1997class2RGB = LST1997class2.visualize(
    {min: 27.861, max: 28.69, palette: ['d5fd27','d5fd27']});
var LST1997class3RGB = LST1997class3.visualize(
    {min: 28.691, max: 32, palette: ['ff8b00','ff8b00']});
var LST1997class4RGB = LST1997class4.visualize(
    {min: 32.1, max: 43.39, palette: ['ff0000','ff0000']});
var LST1999class1RGB = LST1999class1.visualize(
    {min: 17.46, max: 27.86, palette: ['50a600','50a600']});
var LST1999class2RGB = LST1999class2.visualize(
    {min: 27.861, max: 28.69, palette: ['d5fd27','d5fd27']});
var LST1999class3RGB = LST1999class3.visualize(
    {min: 28.691, max: 32, palette: ['ff8b00','ff8b00']});
var LST1999class4RGB = LST1999class4.visualize(
    {min: 32.1, max: 43.39, palette: ['ff0000','ff0000']});
var LST2004class1RGB = LST2004class1.visualize(
    {min: 17.46, max: 27.86, palette: ['50a600','50a600']});
var LST2004class2RGB = LST2004class2.visualize(
    {min: 27.861, max: 28.69, palette: ['d5fd27','d5fd27']});
var LST2004class3RGB = LST2004class3.visualize(
    {min: 28.691, max: 32, palette: ['ff8b00','ff8b00']});
var LST2004class4RGB = LST2004class4.visualize(
    {min: 32.1, max: 43.39, palette: ['ff0000','ff0000']});
var LST2006class1RGB = LST2006class1.visualize(
    {min: 17.46, max: 27.86, palette: ['50a600','50a600']});
var LST2006class2RGB = LST2006class2.visualize(
    {min: 27.861, max: 28.69, palette: ['d5fd27','d5fd27']});
var LST2006class3RGB = LST2006class3.visualize(
    {min: 28.691, max: 32, palette: ['ff8b00','ff8b00']});
var LST2006class4RGB = LST2006class4.visualize(
    {min: 32.1, max: 43.39, palette: ['ff0000','ff0000']});
var LST2009class1RGB = LST2009class1.visualize(
    {min: 17.46, max: 27.86, palette: ['50a600','50a600']});
var LST2009class2RGB = LST2009class2.visualize(
    {min: 27.861, max: 28.69, palette: ['d5fd27','d5fd27']});
var LST2009class3RGB = LST2009class3.visualize(
    {min: 28.691, max: 32, palette: ['ff8b00','ff8b00']});
var LST2009class4RGB = LST2009class4.visualize(
    {min: 32.1, max: 43.39, palette: ['ff0000','ff0000']});
var LST2013class1RGB = LST2013class1.visualize(
    {min: 17.46, max: 27.86, palette: ['50a600','50a600']});
var LST2013class2RGB = LST2013class2.visualize(
    {min: 27.861, max: 28.69, palette: ['d5fd27','d5fd27']});
var LST2013class3RGB = LST2013class3.visualize(
    {min: 28.691, max: 32, palette: ['ff8b00','ff8b00']});
var LST2013class4RGB = LST2013class4.visualize(
    {min: 32.1, max: 43.39, palette: ['ff0000','ff0000']});
var LST2015class1RGB = LST2015class1.visualize(
    {min: 17.46, max: 27.86, palette: ['50a600','50a600']});
var LST2015class2RGB = LST2015class2.visualize(
    {min: 27.861, max: 28.69, palette: ['d5fd27','d5fd27']});
var LST2015class3RGB = LST2015class3.visualize(
    {min: 28.691, max: 32, palette: ['ff8b00','ff8b00']});
var LST2015class4RGB = LST2015class4.visualize(
    {min: 32.1, max: 43.39, palette: ['ff0000','ff0000']});
var LST2018class1RGB = LST2018class1.visualize(
    {min: 17.46, max: 27.86, palette: ['50a600','50a600']});
var LST2018class2RGB = LST2018class2.visualize(
    {min: 27.861, max: 28.69, palette: ['d5fd27','d5fd27']});
var LST2018class3RGB = LST2018class3.visualize(
    {min: 28.691, max: 32, palette: ['ff8b00','ff8b00']});
var LST2018class4RGB = LST2018class4.visualize(
    {min: 32.1, max: 43.39, palette: ['ff0000','ff0000']});
var LST2021class1RGB = LST2021class1.visualize(
    {min: 17.46, max: 27.86, palette: ['50a600','50a600']});
var LST2021class2RGB = LST2021class2.visualize(
    {min: 27.861, max: 28.69, palette: ['d5fd27','d5fd27']});
var LST2021class3RGB = LST2021class3.visualize(
    {min: 28.691, max: 32, palette: ['ff8b00','ff8b00']});
var LST2021class4RGB = LST2021class4.visualize(
    {min: 32.1, max: 43.39, palette: ['ff0000','ff0000']});
var NDVIclass1RGB = NDVIclass1.visualize(
    {min: -1, max: -0.03, palette: ['000000','000000']});
var NDVIclass2RGB = NDVIclass2.visualize(
    {min: -0.031, max: 0.15, palette: ['FFFF73','FFFF73']});
var NDVIclass3RGB = NDVIclass3.visualize(
    {min: 0.151, max: 0.25, palette: ['BEE043','BEE043']});
var NDVIclass4RGB = NDVIclass4.visualize(
    {min: 0.251, max: 0.35, palette: ['7CC41D','7CC41D']});
var NDVIclass5RGB = NDVIclass5.visualize(
    {min: 0.351, max: 1, palette: ['38A800','38A800']});
var NDBIclass1RGB = NDBIclass1.visualize(
    {min: -1, max: -0.50, palette: ['50a600','50a600']});
var NDBIclass2RGB = NDBIclass2.visualize(
    {min: -0.501, max: -0.26, palette: ['7ddf21', '7ddf21']});
var NDBIclass3RGB = NDBIclass3.visualize(
    {min: -0.261, max: -0.02, palette: ['d5fd27','d5fd27']});
var NDBIclass4RGB = NDBIclass4.visualize(
    {min: -0.021, max: 0.22, palette: ['ff8b00','ff8b00']});
var NDBIclass5RGB = NDBIclass5.visualize(
    {min: 0.221, max: 1, palette: ['ff0000','ff0000']});
//Menggabungkan Kelas  
var MosaicLST1990 = ee.ImageCollection([LST1990class1RGB, LST1990class2RGB, LST1990class3RGB, LST1990class4RGB]).mosaic();
var MosaicLST1994 = ee.ImageCollection([LST1994class1RGB, LST1994class2RGB, LST1994class3RGB, LST1994class4RGB]).mosaic();
var MosaicLST1997 = ee.ImageCollection([LST1997class1RGB, LST1997class2RGB, LST1997class3RGB, LST1997class4RGB]).mosaic();
var MosaicLST1999 = ee.ImageCollection([LST1999class1RGB, LST1999class2RGB, LST1999class3RGB, LST1999class4RGB]).mosaic();
var MosaicLST2004 = ee.ImageCollection([LST2004class1RGB, LST2004class2RGB, LST2004class3RGB, LST2004class4RGB]).mosaic();
var MosaicLST2006 = ee.ImageCollection([LST2006class1RGB, LST2006class2RGB, LST2006class3RGB, LST2006class4RGB]).mosaic();
var MosaicLST2009 = ee.ImageCollection([LST2009class1RGB, LST2009class2RGB, LST2009class3RGB, LST2009class4RGB]).mosaic();
var MosaicLST2013 = ee.ImageCollection([LST2013class1RGB, LST2013class2RGB, LST2013class3RGB, LST2013class4RGB]).mosaic();
var MosaicLST2015 = ee.ImageCollection([LST2015class1RGB, LST2015class2RGB, LST2015class3RGB, LST2015class4RGB]).mosaic();
var MosaicLST2018 = ee.ImageCollection([LST2018class1RGB, LST2018class2RGB, LST2018class3RGB, LST2018class4RGB]).mosaic();
var MosaicLST2021 = ee.ImageCollection([LST2021class1RGB, LST2021class2RGB, LST2021class3RGB, LST2021class4RGB]).mosaic();
var MosaicNDVI = ee.ImageCollection([NDVIclass1RGB, NDVIclass2RGB, NDVIclass3RGB, NDVIclass4RGB, NDVIclass5RGB]).mosaic();
var MosaicNDBI = ee.ImageCollection([NDBIclass1RGB, NDBIclass2RGB, NDBIclass3RGB, NDBIclass4RGB, NDBIclass5RGB]).mosaic();
//Memilih AOI untuk Sampel Data
var geometry = ee.Geometry.Polygon(
        [[[106.77316317135376, -6.183427780038095],
          [106.77316317135376, -6.283767863466476],
          [106.89332613522095, -6.283767863466476],
          [106.89332613522095, -6.183427780038095]]], null, false);
//Membuat dan Menampilkan Sampel Data
var sample = ee.FeatureCollection.randomPoints(geometry);
//Regresi Linier NDVI vs Suhu Permukaan Lahan
//Menggabungkan Citra LST dan NDVI
var combineNDVI = NDVI.addBands(LST2021)
  .rename(['NDVI', 'LST']);
//Ekstraksi Nilai LST dan NDVI Berdasarkan Sampel
var imgSampleNDVI = combineNDVI.sampleRegions({
  collection: sample,
  scale: 30
})
//Mengatur Variabel Bebas atau Independen
.map(function(feature) {
  return feature.set('constant', 1);
});
//Membuat Regresi Linier
var linearRegressionNDVI = ee.Dictionary(imgSampleNDVI.reduceColumns({
    reducer: ee.Reducer.linearRegression({numX: 2, numY: 1}),
    selectors: ['constant', 'NDVI', 'LST']
  })
);
//Menampilkan Nilai Regresi Linier
var coefListNDVI = ee.Array(linearRegressionNDVI.get('coefficients')).toList();
var slopeNDVI = ee.List(coefListNDVI.get(1)).get(0);
var yIntNDVI = ee.List(coefListNDVI.get(0)).get(0);
var r2NDVI = ee.Array(linearRegressionNDVI.get('residuals')).get([0]);
//Membuat Daftar List Nilai LST dan NDVI
var propsNDVI = ee.List(['NDVI', 'LST']);
var regressionVarsListNDVI = ee.List(imgSampleNDVI.reduceColumns({
  reducer: ee.Reducer.toList().repeat(propsNDVI.size()),
  selectors: propsNDVI
}).get('list'));
//Konversi Nilai LST dan NDVI dari List ke Array
var xNDVI = ee.Array(ee.List(regressionVarsListNDVI.get(0)));
var y1NDVI = ee.Array(ee.List(regressionVarsListNDVI.get(1)));
//Membuat Tren Regresi Linier
var y2NDVI = ee.Array(ee.List(regressionVarsListNDVI.get(0)).map(function(xNDVI) {
  var yNDVI = ee.Number(xNDVI).multiply(slopeNDVI).add(yIntNDVI);
  return yNDVI;
}));
//Menggabungkan Array LST dan NDVI
var yArrNDVI = ee.Array.cat([y1NDVI, y2NDVI], 1);
//Regresi Linier NDBI vs Suhu Permukaan Lahan
//Menggabungkan Citra LST dan NDBI
var combineNDBI = NDBI.addBands(LST2021)
  .rename(['NDBI', 'LST']);
//Ekstraksi Nilai LST dan NDBI Berdasarkan Sampel
var imgSampleNDBI = combineNDBI.sampleRegions({
  collection: sample,
  scale: 30
})
//Mengatur Variabel Bebas atau Independen
.map(function(feature) {
  return feature.set('constant', 1);
});
//Membuat Regresi Linier
var linearRegressionNDBI = ee.Dictionary(imgSampleNDBI.reduceColumns({
    reducer: ee.Reducer.linearRegression({numX: 2, numY: 1}),
    selectors: ['constant', 'NDBI', 'LST']
  })
);
//Menampilkan Nilai Regresi Linier
var coefListNDBI = ee.Array(linearRegressionNDBI.get('coefficients')).toList();
var slopeNDBI = ee.List(coefListNDBI.get(1)).get(0);
var yIntNDBI = ee.List(coefListNDBI.get(0)).get(0);
var r2NDBI = ee.Array(linearRegressionNDBI.get('residuals')).get([0]);
//Membuat Daftar List Nilai LST dan NDBI
var propsNDBI = ee.List(['NDBI', 'LST']);
var regressionVarsListNDBI = ee.List(imgSampleNDBI.reduceColumns({
  reducer: ee.Reducer.toList().repeat(propsNDBI.size()),
  selectors: propsNDBI
}).get('list'));
//Konversi Nilai LST dan NDBI dari List ke Array
var xNDBI = ee.Array(ee.List(regressionVarsListNDBI.get(0)));
var y1NDBI = ee.Array(ee.List(regressionVarsListNDBI.get(1)));
//Membuat Tren Regresi Linier
var y2NDBI = ee.Array(ee.List(regressionVarsListNDBI.get(0)).map(function(xNDBI) {
  var yNDBI = ee.Number(xNDBI).multiply(slopeNDBI).add(yIntNDBI);
  return yNDBI;
}));
//Menggabungkan Array LST dan NDBI
var yArrNDBI = ee.Array.cat([y1NDBI, y2NDBI], 1);
//Membuat Panel Info
var infoPanel = ui.Panel({
  layout: ui.Panel.Layout.flow(),
  style: {
    stretch: 'horizontal',
    height: '100%',
    width: '400px',
    backgroundColor: 'white'
  }
});
//Membuat Panel Peta
var mapPanel = ui.Map({
  center: {'lon': 106.8494173, 'lat': -6.2164173, 'zoom': 11}
});
mapPanel.setOptions('satellite');
//Menampilkan Pembagian Panel
ui.root.clear();
ui.root.add(ui.SplitPanel(infoPanel, mapPanel));
//Menambahkan Judul Panel Info
var panelTitle = ui.Label({
  value: 'Analisis Spasio-Temporal Suhu Permukaan Lahan di Provinsi DKI Jakarta Tahun 1991-2021',
  style: {
    fontWeight: 'bold',
    color: '#003399',
    textAlign: 'center',
    fontSize: '21px',
    margin: '15px 15px 0 15px',
    padding: '10px 5px 15px 5px'
  }
});
infoPanel.add(panelTitle); 
//Menambahkan Narasi Info Panel 1
var panelTitle1 = ui.Label({
  value: 'Suhu permukaan lahan merupakan salah satu variabel kuantitas iklim yang menunjukkan suhu permukaan rata-rata setiap tutupan objek di permukaan bumi. Suhu permukaan lahan mampu mendeskripsikan 80% variasi suhu udara. Suhu udara sebagai faktor penting yang menentukan tingkat kenyamanan termal atau kondisi lingkungan udara yang nyaman untuk manusia tinggal. Kajian mengenai suhu permukaan lahan penting diketahui terkait kestabilan suhu di permukaan bumi.',
  style: {
    color: 'black',
    textAlign: 'justify',
    fontSize: '13px',
    margin: '0 15px 0 15px',
    padding: '5px 10px 5px 10px'
  }
});
infoPanel.add(panelTitle1); 
//Menambahkan Narasi Info Panel 2
var panelTitle2 = ui.Label({
  value: 'Provinsi DKI Jakarta sebagai ibukota negara Republik Indonesia, telah mengalami perkembangan yang pesat yaitu peningkatan jumlah penduduk dari tahun 1980-2020 yang berdampak pada peningkatan kebutuhan lahan. Lahan sawah beralih fungsi menjadi lahan terbangun yaitu banyaknya gedung bertingkat dan permukiman padat. berdasarkan data, jumlah Ruang Terbuka Hijau (RTH) hanya 9,8% yang tidak sesuai dengan jumlah minimal 30% untuk suatu wilayah.',
  style: {
    color: 'black',
    textAlign: 'justify',
    fontSize: '13px',
    margin: '0 15px 0 15px',
    padding: '5px 10px 5px 10px'
  }
});
infoPanel.add(panelTitle2);
//Menambahkan Narasi Info Panel 3
var panelTitle3 = ui.Label({
  value: 'Analisis suhu permukaan lahan di Provinsi DKI Jakarta Tahun 1990-2021 dengan memanfaatkan Citra Penginderaan Jauh yaitu Series Citra Landsat. Detail hasil ditampilkan dalam Google Earth Engine Apps yang dijabarkan sebagai berikut.',
  style: {
    color: 'black',
    textAlign: 'justify',
    fontSize: '13px',
    margin: '0 15px 0 15px',
    padding: '5px 10px 5px 10px'
  }
});
infoPanel.add(panelTitle3); 
//Menambahkan Narasi Info Panel 4
var panelTitle4 = ui.Label({
  value: 'A. Persebaran Suhu Permukaan Lahan Tahun 1991-2021',
  style: {
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'justify',
    fontSize: '15px',
    margin: '5px 15px 0 15px',
    padding: '15px 10px 5px 10px'
  }
});
infoPanel.add(panelTitle4); 
//Menambahkan Narasi Info Panel 5
var panelTitle5 = ui.Label({
  value: 'Sebaran suhu permukaan lahan Provinsi DKI Jakarta diklasifikasikan menjadi beberapa kelas. Visualisasi sebaran suhu permukaan lahan dapat ditampilkan dengan memilih tombol berikut.',
  style: {
    color: 'black',
    textAlign: 'justify',
    fontSize: '13px',
    margin: '5px 15px 0 15px',
    padding: '5px 10px 5px 10px'
  }
});
infoPanel.add(panelTitle5);
//Menambahkan Legenda LST
var legendLSTTitle = ui.Label({
  value: 'Legenda',
  style: {
    fontWeight: 'bold',
    fontSize: '14px',
    margin: '0 15px 0 15px',
    padding: '5px 10px 0 10px'
  }
});
infoPanel.add(legendLSTTitle);
var classLSTTitle =  ui.Label({
  value: 'Kelas Suhu Permukaan Lahan (°C)',
  style: {
    fontWeight: 'normal',
    fontSize: '13px',
    margin: '0 15px 5px 15px',
    padding: '5px 10px 0 10px'
  }
});
infoPanel.add(classLSTTitle);
//Membuat Legenda dalam 1 Baris
var rowlegendLST = function(color, name) {
  /*Membuat Simbol Warna Klasifikasi*/
  var symbol = ui.Label({
    style: {
      backgroundColor: '#' + color,
      //fontSize: '1px',
      padding: '6px 15px 8px 5px',
      margin: '2px 15px 4px 5px'
    }
  });
  /*Menyusun Simbol Warna Klasifikasi Beserta Keterangan*/
  var desc = ui.Label({
    value: name,
    style: {
      margin: '2px 0 0 -6px',
      fontSize: '13px'
    }
  });
  return ui.Panel({
    style: {
      margin: '0 0 0 20px',
      padding: '0 0 0 0'
    },
    widgets: [symbol, desc],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};
//Menampilkan Legenda LST
infoPanel.add(rowlegendLST('50a600', 'Sangat Rendah (≤ 27,86)'));
infoPanel.add(rowlegendLST('d5fd27', 'Rendah (27,861 - 28,69)'));
infoPanel.add(rowlegendLST('ff8b00', 'Sedang (28,691 - 32)')); 
infoPanel.add(rowlegendLST('ff0000', 'Tinggi (> 32)'));
///Menambahkan Button LST
var btn_LST1990 = ui.Button({
  label: 'Peta Suhu Permukaan Lahan Tahun 1990',
  onClick: function() {
    mapPanel.addLayer(MosaicLST1990, [], 'Suhu Permukaan Lahan 1990')
  },
  style: {
    height: '60px',
    width: '350px',
    fontSize: '14px',
    color: '#003399',
    margin: '5px 15px 0 15px',
    padding: '10px 10px 0 10px'
  }
});
infoPanel.add(btn_LST1990);
var btn_LST1994 = ui.Button({
  label: 'Peta Suhu Permukaan Lahan Tahun 1994',
  onClick: function() {
    mapPanel.addLayer(MosaicLST1994, [], 'Suhu Permukaan Lahan 1994')
  },
  style: {
    color: '#003399',
    height: '60px',
    width: '350px',
    fontSize: '14px',
    margin: '-10px 15px 0 15px',
    padding: '0 10px 0 10px'
  }
});
infoPanel.add(btn_LST1994);
var btn_LST1997 = ui.Button({
  label: 'Peta Suhu Permukaan Lahan Tahun 1997',
  onClick: function() {
    mapPanel.addLayer(MosaicLST1997, [], 'Suhu Permukaan Lahan 1997')
  },
  style: {
    color: '#003399',
    height: '60px',
    width: '350px',
    fontSize: '14px',
    margin: '-20px 15px 0 15px',
    padding: '0 10px 0 10px'
  }
});
infoPanel.add(btn_LST1997);
var btn_LST1999 = ui.Button({
  label: 'Peta Suhu Permukaan Lahan Tahun 1999',
  onClick: function() {
    mapPanel.addLayer(MosaicLST1999, [], 'Suhu Permukaan Lahan 1999')
  },
  style: {
    color: '#003399',
    height: '60px',
    width: '350px',
    fontSize: '14px',
    margin: '-20px 15px 0 15px',
    padding: '0 10px 0 10px'
  }
});
infoPanel.add(btn_LST1999);
var btn_LST2004 = ui.Button({
  label: 'Peta Suhu Permukaan Lahan Tahun 2004',
  onClick: function() {
    mapPanel.addLayer(MosaicLST2004, [], 'Suhu Permukaan Lahan 2004')
  },
  style: {
    color: '#003399',
    height: '60px',
    width: '350px',
    fontSize: '14px',
    margin: '-20px 15px 0 15px',
    padding: '0 10px 0 10px'
  }
});
infoPanel.add(btn_LST2004);
var btn_LST2006 = ui.Button({
  label: 'Peta Suhu Permukaan Lahan Tahun 2006',
  onClick: function() {
    mapPanel.addLayer(MosaicLST2006, [], 'Suhu Permukaan Lahan 2006')
  },
  style: {
    color: '#003399',
    height: '60px',
    width: '350px',
    fontSize: '14px',
    margin: '-20px 15px 0 15px',
    padding: '0 10px 0 10px'
  }
});
infoPanel.add(btn_LST2006);
var btn_LST2009 = ui.Button({
  label: 'Peta Suhu Permukaan Lahan Tahun 2009',
  onClick: function() {
    mapPanel.addLayer(MosaicLST2009, [], 'Suhu Permukaan Lahan 2009')
  },
  style: {
    color: '#003399',
    height: '60px',
    width: '350px',
    fontSize: '14px',
    margin: '-20px 15px 0 15px',
    padding: '0 10px 0 10px'
  }
});
infoPanel.add(btn_LST2009);
var btn_LST2013 = ui.Button({
  label: 'Peta Suhu Permukaan Lahan Tahun 2013',
  onClick: function() {
    mapPanel.addLayer(MosaicLST2013, [], 'Suhu Permukaan Lahan 2013')
  },
  style: {
    color: '#003399',
    height: '60px',
    width: '350px',
    fontSize: '14px',
    margin: '-20px 15px 0 15px',
    padding: '0 10px 0 10px'
  }
});
infoPanel.add(btn_LST2013);
var btn_LST2015 = ui.Button({
  label: 'Peta Suhu Permukaan Lahan Tahun 2015',
  onClick: function() {
    mapPanel.addLayer(MosaicLST2015, [], 'Suhu Permukaan Lahan 2015')
  },
  style: {
    color: '#003399',
    height: '60px',
    width: '350px',
    fontSize: '14px',
    margin: '-20px 15px 0 15px',
    padding: '0 10px 0 10px'
  }
});
infoPanel.add(btn_LST2015);
var btn_LST2018 = ui.Button({
  label: 'Peta Suhu Permukaan Lahan Tahun 2018',
  onClick: function() {
    mapPanel.addLayer(MosaicLST2018, [], 'Suhu Permukaan Lahan 2018')
  },
  style: {
    color: '#003399',
    height: '60px',
    width: '350px',
    fontSize: '14px',
    margin: '-20px 15px 0 15px',
    padding: '0 10px 0 10px'
  }
});
infoPanel.add(btn_LST2018);
var btn_LST2021 = ui.Button({
  label: 'Peta Suhu Permukaan Lahan Tahun 2021',
  onClick: function() {
    mapPanel.addLayer(MosaicLST2021, [], 'Suhu Permukaan Lahan 2021')
  },
  style: {
    color: '#003399',
    height: '60px',
    width: '350px',
    fontSize: '14px',
    margin: '-20px 15px 0 15px',
    padding: '0 10px 0 10px'
  }
});
infoPanel.add(btn_LST2021);
//Menambahkan Narasi Info Panel 5a
var panelTitle5a = ui.Label({
  value: 'Perubahan suhu permukaan lahan dari tahun 1991-2021 secara statistik mengalami kenaikan yang signifikan. Setiap tahun, baik nilai suhu permukaan lahan minimum maupun nilai suhu permukaan lahan maksimum mengalami kenaikan. Rerata suhu permukaan lahan tahun 1991-2021 secara umum menunjukkan tren yang naik. Grafik rerata suhu permukaan lahan dapat ditampilkan dengan memilih tombol berikut.',
  style: {
    color: 'black',
    textAlign: 'justify',
    fontSize: '13px',
    margin: '-15px 15px 0 15px',
    padding: '15px 10px 5px 10px'
  }
});
infoPanel.add(panelTitle5a);
//Menambahkan Button Grafik Rerata LST
var LSTPanel = ui.Panel({style: {backgroundColor: 'white'}});
infoPanel.add(LSTPanel);
var btn_graphLST = ui.Button({
  label: 'Grafik Rerata Suhu Permukaan Lahan Tahun 1991-2021',
  onClick: function() {
    LSTPanel.add(chartLST)
  },
  style: {
    height: '60px',
    width: '350px',
    fontSize: '14px',
    color: '#003399',
    margin: '5px 15px 0 15px',
    padding: '10px 10px 0 10px'
  }
});
LSTPanel.add(btn_graphLST);
//Menambahkan Grafik NDVI
var dataTable = [
  [{role: 'domain', label: 'Tahun'}, 
  {role: 'data', label: 'Suhu Permukaan Lahan (°C)'}],
  ['1990', 25.30],
  ['1994', 27.16],
  ['1997', 28.51],
  ['1999', 29.83],
  ['2004', 28.57],
  ['2006', 29.01],
  ['2009', 31.68],
  ['2013', 33.09],
  ['2015', 35.05],
  ['2018', 34.02],
  ['2021', 31.62],
];
//Menampilkan Grafik LST
var chartLST = ui.Chart(dataTable)
  .setChartType('LineChart')
  .setOptions({
    title: 'GRAFIK SUHU PERMUKAAN LAHAN RATA-RATA DKI JAKARTA TAHUN 1991-2021',
    colors: ['red']
  });
//Menambahkan Narasi Info Panel 6
var panelTitle6 = ui.Label({
  value: 'Suhu permukaan lahan erat kaitannya dengan perubahan tutupan lahan. Hal yang mengindikasikan adanya perubahan lahan dapat diketahui berdasarkan nilai indeks vegetasi NDVI maupun indeks bangunan NDBI.  Oleh karena itu, seberapa besar pengaruh indeks terhdap suhu permukaan lahan penting diketahui dengan menggunakan metode statistik yaitu regresi linier.',
  style: {
    color: 'black',
    textAlign: 'justify',
    fontSize: '13px',
    margin: '5px 15px 0 15px',
    padding: '15px 10px 5px 10px'
  }
});
infoPanel.add(panelTitle6);
//Menambahkan Narasi Info Panel 7
var panelTitle7 = ui.Label({
  value: 'B. Pengaruh Indeks Vegetasi (NDVI) terhadap Suhu Permukaan Lahan',
  style: {
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'justify',
    fontSize: '15px',
    margin: '10px 15px 0 15px',
    padding: '15px 10px 5px 10px'
  }
});
infoPanel.add(panelTitle7);
//Menambahkan Narasi Info Panel 8
var panelTitle8 = ui.Label({
  value: 'NDVI (Normalized Difference Vegetation Index) merupakan salah satu transformasi indeks vegetasi berdasarkan normalisasi reflektansi saluran inframerah dekat (near infrared) dan saluran merah (red). Indeks vegetasi NDVI dapat menunjukkan tingkat kerapatan vegetasi. Hasil nilai indeks vegetasi memiliki rentang nilai -1 sampai dengan 1. Semakin besar nilai mendekati 1 menunjukkan tingkat kehijauan vegetasi yang semakin tinggi, begitupun sebaliknya semakin kecil nilai mendekati -1 menunjukkan tingkat kehijaun yang semakin rendah (tidak adanya vegetasi). Visualisasi sebaran tingkat kerapatan indeks vegetasi Provinsi DKI Jakarta Tahun 2021 dapat ditampilkan dengan memilih tombol berikut.',
  style: {
    color: 'black',
    textAlign: 'justify',
    fontSize: '13px',
    margin: '5px 15px 0 15px',
    padding: '5px 10px 5px 10px'
  }
});
infoPanel.add(panelTitle8);
//Menambahkan Legenda NDVI
var legendNDVITitle = ui.Label({
  value: 'Legenda',
  style: {
    fontWeight: 'bold',
    fontSize: '14px',
    margin: '0 15px 0 15px',
    padding: '5px 10px 0 10px'
  }
});
infoPanel.add(legendNDVITitle);
var classNDVITitle =  ui.Label({
  value: 'Kelas Kerapatan Indeks Vegetasi',
  style: {
    fontWeight: 'normal',
    fontSize: '13px',
    margin: '0 15px 5px 15px',
    padding: '5px 10px 0 10px'
  }
});
infoPanel.add(classNDVITitle);
//Membuat Legenda dalam 1 Baris
var rowlegendNDVI = function(color, name) {
  /*Membuat Simbol Warna Klasifikasi*/
  var symbol = ui.Label({
    style: {
      backgroundColor: '#' + color,
      padding: '6px 15px 8px 5px',
      margin: '2px 15px 4px 5px'
    }
  });
  /*Menyusun Simbol Warna Klasifikasi Beserta Keterangan*/
  var desc = ui.Label({
    value: name,
    style: {
      margin: '2px 0 0 -6px',
      fontSize: '13px'
    }
  });
  return ui.Panel({
    style: {
      margin: '0 0 0 20px',
      padding: '0 0 0 0'
    },
    widgets: [symbol, desc],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};
//Menampilkan Legenda NDVI
infoPanel.add(rowlegendNDVI('000000', 'Lahan Tidak Bervegetasi (≤ -0,03)'));
infoPanel.add(rowlegendNDVI('FFFF73', 'Kehijauan Sangat Rendah (-0,031 - 0,15)'));
infoPanel.add(rowlegendNDVI('BEE043', 'Kehijaun Rendah (0,151 - 0,25)'));
infoPanel.add(rowlegendNDVI('7CC41D', 'Kehijauan Sedang (0,251 - 0,35)')); 
infoPanel.add(rowlegendNDVI('38A800', 'Kehijauan Tinggi (> 0,35)'));
//Menambahkan Button NDVI
var btn_NDVI = ui.Button({
  label: 'Peta Kerapatan Indeks Vegetasi NDVI Tahun 2021',
  onClick: function() {
    mapPanel.addLayer(MosaicNDVI, [], 'Kerapatan Indeks Vegetasi NDVI')
  },
  style: {
    height: '60px',
    width: '350px',
    fontSize: '14px',
    color: '#003399',
    margin: '5px 15px 0 15px',
    padding: '10px 10px 0 10px'
  }
});
infoPanel.add(btn_NDVI);
//Menambahkan Narasi Info Panel 9
var panelTitle9 = ui.Label({
  value: 'Hasil regresi linier indeks vegetasi NDVI terhadap suhu permukaan lahan menghasilkan persamaan y = 33,387 – 5,083x dan nilai koefisien determinasi (r2) 0,97. Berdasarkan hasil tersebut, indeks vegetasi NDVI memiliki pengaruh yang kuat (97%) terhadap suhu permukaan lahan, tetapi dengan arah yang berbanding terbalik. Semakin tinggi nilai indeks vegetasi NDVI dapat mempengaruhi penurunan nilai suhu permukaan lahan.',
  style: {
    color: 'black',
    textAlign: 'justify',
    fontSize: '13px',
    margin: '-5px 15px 0 15px',
    padding: '5px 10px 5px 10px'
  }
});
infoPanel.add(panelTitle9);
//Menambahkan Button Grafik NDVI
var NDVIPanel = ui.Panel({style: {backgroundColor: 'white'}});
infoPanel.add(NDVIPanel);
var btn_graphNDVI = ui.Button({
  label: 'Grafik Regresi Linier NDVI terhadap Suhu Permukaan Lahan',
  onClick: function() {
    NDVIPanel.add(chartNDVI)
  },
  style: {
    height: '60px',
    width: '350px',
    fontSize: '14px',
    color: '#003399',
    margin: '5px 15px 0 15px',
    padding: '10px 10px 0 10px'
  }
});
NDVIPanel.add(btn_graphNDVI);
//Menambahkan Grafik NDVI
var chartNDVI = ui.Chart.array.values({
  array: yArrNDVI,
  axis: 0,
  xLabels: xNDVI})
  .setChartType('ScatterChart')
  .setOptions({
    title: 'REGRESI LINIER NDVI TERHADAP SUHU PERMUKAAN LAHAN DKI JAKARTA',
    legend: {position: 'right'},
    hAxis: {'title': 'NDVI'},
    vAxis: {'title': 'Suhu Permukaan Lahan (°C)'},
    series: {
      0: {
        pointSize: 0.7,
        dataOpacity: 0.8,
        color: 'blue',
        labelInLegend: 'Suhu Permukaan Lahan (°C)'
      },
      1: {
        pointSize: 0,
        lineWidth: 2.5,
        color: 'red',
        labelInLegend: 'Linier',
      }
    }
  });
//Menambahkan Narasi Info Panel 10
var panelTitle10 = ui.Label({
  value: 'B. Pengaruh Indeks Bangunan (NDBI) terhadap Suhu Permukaan Lahan',
  style: {
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'justify',
    fontSize: '15px',
    margin: '10px 15px 0 15px',
    padding: '15px 10px 5px 10px'
  }
});
infoPanel.add(panelTitle10);
//Menambahkan Narasi Info Panel 11
var panelTitle11 = ui.Label({
  value: 'NDBI (Normalized Built-Up Index) merupakan transformasi indeks bangunan berdasarkan normalisasi saluran inframerah tengah (short wave infra red) dan saluran inframerah dekat (near infrared). Indeks bangunan NDBI sebagai indeks pioner yang digunakan untuk ekstraksi lahan terbangun di perkotaan. Hasil nilai indeks bangunan memiliki rentang nilai -1 sampai dengan 1. Semakin besar nilai mendekati 1 menunjukkan tingkat kerapatan bangunan yang semakin tinggi, begitupun sebaliknya semakin kecil nilai mendekati -1 menunjukkan tingkat kerapatan bangunan yang semakin rendah (tidak adanya lahan terbangun). Visualisasi sebaran tingkat kerapatan indeks bangunan Provinsi DKI Jakarta Tahun 2021 dapat ditampilkan dengan memilih tombol berikut.',
  style: {
    color: 'black',
    textAlign: 'justify',
    fontSize: '13px',
    margin: '5px 15px 0 15px',
    padding: '5px 10px 5px 10px'
  }
});
infoPanel.add(panelTitle11);
//Menambahkan Legenda NDBI
var legendNDBITitle = ui.Label({
  value: 'Legenda',
  style: {
    fontWeight: 'bold',
    fontSize: '14px',
    margin: '0 15px 0 15px',
    padding: '5px 10px 0 10px'
  }
});
infoPanel.add(legendNDBITitle);
var classNDBITitle =  ui.Label({
  value: 'Kelas Kerapatan Indeks Bangunan',
  style: {
    fontWeight: 'normal',
    fontSize: '13px',
    margin: '0 15px 5px 15px',
    padding: '5px 10px 0 10px'
  }
});
infoPanel.add(classNDBITitle);
//Membuat Legenda dalam 1 Baris
var rowlegendNDBI = function(color, name) {
  /*Membuat Simbol Warna Klasifikasi*/
  var symbol = ui.Label({
    style: {
      backgroundColor: '#' + color,
      padding: '6px 15px 8px 5px',
      margin: '2px 15px 4px 5px'
    }
  });
  /*Menyusun Simbol Warna Klasifikasi Beserta Keterangan*/
  var desc = ui.Label({
    value: name,
    style: {
      margin: '2px 0 0 -6px',
      fontSize: '13px'
    }
  });
  return ui.Panel({
    style: {
      margin: '0 0 0 20px',
      padding: '0 0 0 0'
    },
    widgets: [symbol, desc],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};
//Menampilkan Legenda NDBI
infoPanel.add(rowlegendNDBI('50a600', 'Bukan Lahan Terbangun (≤ -0.50)'));
infoPanel.add(rowlegendNDBI('7ddf21', 'Sangat Rendah (-0.501 - -0.26)'));
infoPanel.add(rowlegendNDBI('d5fd27', 'Rendah (-0.261 - -0.02)'));
infoPanel.add(rowlegendNDBI('ff8b00', 'Sedang (-0.021 - 0.22)')); 
infoPanel.add(rowlegendNDBI('ff0000', 'Tinggi (> 0,22)'));
///Menambahkan Button NDBI
var btn_NDBI = ui.Button({
  label: 'Peta Kerapatan Indeks Vegetasi NDBI Tahun 2021',
  onClick: function() {
    mapPanel.addLayer(MosaicNDBI, [], 'Kerapatan Indeks Bangunan NDBI')
  },
  style: {
    height: '60px',
    width: '350px',
    fontSize: '14px',
    color: '#003399',
    margin: '5px 15px 0 15px',
    padding: '10px 10px 0 10px'
  }
});
infoPanel.add(btn_NDBI);
//Menambahkan Narasi Info Panel 12
var panelTitle12 = ui.Label({
  value: 'Hasil regresi linier indeks bangunan NDBI terhadap suhu permukaan lahan persamaan y = 32,226 + 6,353x dan koefisien determinasi (r2) 0,83. Berdasarkan hasil tersebut, indeks bangunan NDBI memiliki pengaruh yang kuat (83%) terhadap suhu permukaan lahan dengan arah yang sebanding. Semakin tinggi nilai indeks bangunan NDBI dapat mempengaruhi kenaikan nilai suhu permukaan lahan.', 
  style: {
    color: 'black',
    textAlign: 'justify',
    fontSize: '13px',
    margin: '-5px 15px 0 15px',
    padding: '5px 10px 5px 10px'
  }
});
infoPanel.add(panelTitle12);
//Menambahkan Button Grafik NDBI
var NDBIPanel = ui.Panel({style: {backgroundColor: 'white'}});
infoPanel.add(NDBIPanel);
var btn_graphNDBI = ui.Button({
  label: 'Grafik Regresi Linier NDBI terhadap Suhu Permukaan Lahan',
  onClick: function() {
    NDBIPanel.add(chartNDBI)
  },
  style: {
    height: '60px',
    width: '350px',
    fontSize: '14px',
    color: '#003399',
    margin: '5px 15px 0 15px',
    padding: '10px 10px 0 10px'
  }
});
NDBIPanel.add(btn_graphNDBI);
//Menambahkan Grafik NDBI
var chartNDBI = ui.Chart.array.values({
  array: yArrNDBI,
  axis: 0,
  xLabels: xNDBI})
  .setChartType('ScatterChart')
  .setOptions({
    title: 'REGRESI LINIER NDBI TERHADAP SUHU PERMUKAAN LAHAN DKI JAKARTA',
    legend: {position: 'right'},
    hAxis: {'title': 'NDBI'},
    vAxis: {'title': 'Suhu Permukaan Lahan (°C)'},
    series: {
      0: {
        pointSize: 0.7,
        dataOpacity: 0.8,
        color: 'blue',
        labelInLegend: 'Suhu Permukaan Lahan (°C)'
      },
      1: {
        pointSize: 0,
        lineWidth: 2.5,
        color: 'red',
        labelInLegend: 'Linier',
      }
    }
  });
//Menambahkan Narasi Info Panel 13
var panelTitle13 = ui.Label({
  value: 'SYIFA SALSABILA QUROTUL `AIN',
  style: {
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    fontSize: '14px',
    margin: '25px 15px 0 50px',
    padding: '20px 5px 0 35px'
  }
});
infoPanel.add(panelTitle13); 
//Menambahkan Narasi Info Panel 14
var panelTitle14 = ui.Label({
  value: 'DIV SISTEM INFORMASI GEOGRAFIS',
  style: {
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    fontSize: '14px',
    margin: '5px 15px 0 50px',
    padding: '0 5px 0 25px'
  }
});
infoPanel.add(panelTitle14); 
//Menambahkan Narasi Info Panel 15
var panelTitle15 = ui.Label({
  value: 'DEPARTEMEN TEKNOLOGI KEBUMIAN',
  style: {
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    fontSize: '14px',
    margin: '5px 15px 0 50px',
    padding: '0 5px 0 20px'
  }
});
infoPanel.add(panelTitle15); 
//Menambahkan Narasi Info Panel 16
var panelTitle16 = ui.Label({
  value: 'SEKOLAH VOKASI',
  style: {
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    fontSize: '14px',
    margin: '5px 15px 0 50px',
    padding: '0 5px 0 85px'
  }
});
infoPanel.add(panelTitle16); 
//Menambahkan Narasi Info Panel 17
var panelTitle17 = ui.Label({
  value: 'UNIVERSITAS GADJAH MADA',
  style: {
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    fontSize: '14px',
    margin: '5px 15px 0 50px',
    padding: '0 5px 0 50px'
  }
});
infoPanel.add(panelTitle17); 
//Menambahkan Narasi Info Panel 18
var panelTitle18 = ui.Label({
  value: 'YOGYAKARTA',
  style: {
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    fontSize: '14px',
    margin: '5px 15px 10px 50px',
    padding: '0 5px 15px 100px'
  }
});
infoPanel.add(panelTitle18);