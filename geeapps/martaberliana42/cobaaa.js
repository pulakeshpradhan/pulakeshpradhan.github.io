var BatasJatim = ui.import && ui.import("BatasJatim", "table", {
      "id": "users/martaberliana42/Batas_Terbaru_Jatim_AR"
    }) || ee.FeatureCollection("users/martaberliana42/Batas_Terbaru_Jatim_AR"),
    TRAININGAREA2019 = ui.import && ui.import("TRAININGAREA2019", "table", {
      "id": "users/KPPUPRJATIM/LCJATIM2019"
    }) || ee.FeatureCollection("users/KPPUPRJATIM/LCJATIM2019"),
    TRAININGAREA2020 = ui.import && ui.import("TRAININGAREA2020", "table", {
      "id": "users/KPPUPRJATIM/LCJATIM2020"
    }) || ee.FeatureCollection("users/KPPUPRJATIM/LCJATIM2020"),
    TRAININGAREA2021 = ui.import && ui.import("TRAININGAREA2021", "table", {
      "id": "users/KPPUPRJATIM/LCJATIM2021"
    }) || ee.FeatureCollection("users/KPPUPRJATIM/LCJATIM2021");
var shp = ee.FeatureCollection(BatasJatim); 
Map.setCenter(113.38275578778433,-7.011074673928018)
//---------------------------------------------------------------------------
//                  MEMANGGIL CITRA LANDSAT 8
//---------------------------------------------------------------------------
var mask = function(image){
  var qa = image.select('BQA'); //INFORMASI AWAN
  var mask1 = qa.bitwiseAnd(1 << 4).eq(0); //MENGHAPUS INFORMASI AWAN
  return image.updateMask(mask1);
};
var LAND19 = ee.ImageCollection("LANDSAT/LC08/C01/T1_TOA")
         .filterDate('2019-01-01','2019-07-30')
         .map(mask)
         .median() //METODE STATISTIK CITRA YANG DIHASILKAN LEBIH BAGUS
         .clip(shp); 
var LAND20 = ee.ImageCollection("LANDSAT/LC08/C01/T1_TOA")
         .filterDate('2020-01-01','2020-07-30')
         .map(mask)
         .median() //METODE STATISTIK CITRA YANG DIHASILKAN LEBIH BAGUS
         .clip(shp);         
var LAND21 = ee.ImageCollection("LANDSAT/LC08/C01/T1_TOA")
         .filterDate('2021-01-01','2021-07-30')
         .map(mask)
         .median() //METODE STATISTIK CITRA YANG DIHASILKAN LEBIH BAGUS
         .clip(shp);
//---------------------------------------------------------------------------
//                  MEMANGGIL CITRA SENTINEL
//---------------------------------------------------------------------------
function maskS2clouds(image) {
  var qa = image.select('QA60');
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask).divide(10000);
}
//2019
var dataset19 = ee.ImageCollection('COPERNICUS/S2_SR')
                  .filterDate('2019-01-01','2019-07-30')
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',90))
                  .map (maskS2clouds)
                  .median( )
                  .clip (shp)
//2020
var dataset20 = ee.ImageCollection('COPERNICUS/S2_SR')
                  .filterDate('2020-01-01','2020-07-30')
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',90))
                  .map (maskS2clouds)
                  .median( )
                  .clip (shp)
//2021
var dataset21 = ee.ImageCollection('COPERNICUS/S2_SR')
                  .filterDate('2021-01-01','2021-07-30')
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',90))
                  .map (maskS2clouds)
                  .median( )
                  .clip (shp)
var bands = ['B1','B2','B3','B4','B5','B6','B7'];
var visualization = {
  min: 0.0,
  max: 0.3,
  bands: ['B11', 'B8', 'B2'],
};
Map.addLayer(dataset19, visualization, 'SENTINEL 2019');
Map.addLayer(dataset20, visualization, 'SENTINEL 2020');
Map.addLayer(dataset21, visualization, 'SENTINEL 2021');
//---------------------------------------------------------------------------
//                              PENAMBAHAN INDEKS SPEKTRAL
//---------------------------------------------------------------------------
//2019
var NDVI_19 = LAND19.normalizedDifference(['B5', 'B4']);
var NDBI_19 = LAND19.normalizedDifference(['B6', 'B5']);
var MNDWI_19 = LAND19.normalizedDifference(['B3', 'B6']);
//2020
var NDVI_20 = LAND20.normalizedDifference(['B5', 'B4']);
var NDBI_20 = LAND20.normalizedDifference(['B6', 'B5']);
var MNDWI_20 = LAND20.normalizedDifference(['B3', 'B6']);
//2021
var NDVI_21 = LAND21.normalizedDifference(['B5', 'B4']);
var NDBI_21 = LAND21.normalizedDifference(['B6', 'B5']);
var MNDWI_21 = LAND21.normalizedDifference(['B3', 'B6']);
//RECLASSIFY 2019
var ndvi19 = ee.Image(1)
          .where(NDVI_19.gt(0.0).and(NDVI_19.lte(0.2)), 2)
          .where(NDVI_19.gt(0.2).and(NDVI_19.lte(0.4)), 3)
          .where(NDVI_19.gt(0.4).and(NDVI_19.lte(0.6)), 4)
          .where(NDVI_19.gt(0.6).and(NDVI_19.lte(0.8)), 5)
          .where(NDVI_19.gt(0.8), 6);
var NDVI19 = ndvi19.clip(shp);
//RECLASSIFY 2020
var ndvi20 = ee.Image(1)
          .where(NDVI_20.gt(0.0).and(NDVI_20.lte(0.2)), 2)
          .where(NDVI_20.gt(0.2).and(NDVI_20.lte(0.4)), 3)
          .where(NDVI_20.gt(0.4).and(NDVI_20.lte(0.6)), 4)
          .where(NDVI_20.gt(0.6).and(NDVI_20.lte(0.8)), 5)
          .where(NDVI_20.gt(0.8), 6);
var NDVI20 = ndvi20.clip(shp);
//RECLASSIFY 2021
var ndvi21 = ee.Image(1)
          .where(NDVI_21.gt(0.0).and(NDVI_21.lte(0.2)), 2)
          .where(NDVI_21.gt(0.2).and(NDVI_21.lte(0.4)), 3)
          .where(NDVI_21.gt(0.4).and(NDVI_21.lte(0.6)), 4)
          .where(NDVI_21.gt(0.6).and(NDVI_21.lte(0.8)), 5)
          .where(NDVI_21.gt(0.8), 6);
var NDVI21 = ndvi21.clip(shp);
//---------------------------------------------------------------------------
//             COMPOSITE BAND LANDSAT DAN INDEKS SPEKTRAL LANDSAT 8
//---------------------------------------------------------------------------
//2019
LAND19 = LAND19.addBands(NDVI_19.rename('NDVI'))
         .addBands(NDBI_19.rename('NDBI'))
         .addBands(MNDWI_19.rename('MNDWI'));
print("Band Landsat 8 2019 yang digunakan",LAND19);
//2020
LAND20 = LAND20.addBands(NDVI_20.rename('NDVI'))
         .addBands(NDBI_20.rename('NDBI'))
         .addBands(MNDWI_20.rename('MNDWI'));
print("Band Landsat 8 2020 yang digunakan",LAND20);
//2021
LAND21 = LAND21.addBands(NDVI_21.rename('NDVI'))
         .addBands(NDBI_21.rename('NDBI'))
         .addBands(MNDWI_21.rename('MNDWI'));
print("Band Landsat 8 2021 yang digunakan",LAND21);
//Band Yang Akan digunakan
var bandsL =['B1','B2','B3','B4','B5','B6','B7','NDVI','NDBI','MNDWI'];
//---------------------------------------------------------------------------
//                      VISUALISASI
//---------------------------------------------------------------------------
var paletteNDVI= ['0070FF','FF0000','FF6600','FFCC00','CEED00','79C900'];
var imageVisParam3 = {"opacity":1,"bands":["B7","B5","B4"],
"min":0.045468930155038834,"max":0.4956181049346924,"gamma":1};
//2019
Map.addLayer(NDVI19, {min: 1, max: 6, palette:paletteNDVI},'KERAPATAN VEGETASI 2019');
//2020
Map.addLayer(NDVI20, {min: 1, max: 6, palette:paletteNDVI},'KERAPATAN VEGETASI 2020');
//2021
Map.addLayer(NDVI21, {min: 1, max: 6, palette:paletteNDVI},'KERAPATAN VEGETASI 2021');
//---------------------------------------------------------------------------
//                        KLASIFIKASI
//---------------------------------------------------------------------------
//2019
var total_sample19 = dataset20.select(bands).sampleRegions({
                 collection: TRAININGAREA2019,
                 properties: ['lc'],
                 scale: 45
                 });
var classifier19 = ee.Classifier.smileRandomForest(14).train(total_sample19,'lc',bands);
var classified19 = dataset19.classify(classifier19);
var paletteklas2019 = ['#25f0ff','#c48eff',
                            '#fff1e1','#ff0000','#98b374','#edd284',
                            '#d6679a','#fffc98','#cfe804','#147b2a',
                            '#b99a7a','#b2ffc2','#4aff58','#ff9d24'];
Map.addLayer(classified19, {min:1, max:14, palette:paletteklas2019},'TUTUPAN LAHAN 2019');
//2020
var total_sample20 = dataset20.select(bands).sampleRegions({
                 collection: TRAININGAREA2020,
                 properties: ['lc'],
                 scale: 45
                 });
var classifier20 = ee.Classifier.smileRandomForest(14).train(total_sample20,'lc',bands);
var classified20 = dataset20.classify(classifier20);
var paletteklas2020 = ['#25f0ff','#c48eff',
                            '#fff1e1','#ff0000','#98b374','#edd284',
                            '#d6679a','#fffc98','#cfe804','#147b2a',
                            '#b99a7a','#b2ffc2','#4aff58','#ff9d24'];
Map.addLayer(classified20, {min:1, max:14, palette:paletteklas2020},'TUTUPAN LAHAN 2020');
//2021
var total_sample = dataset21.select(bands).sampleRegions({
                 collection: TRAININGAREA2021,
                 properties: ['lc'],
                 scale: 45
                 });
var classifier = ee.Classifier.smileRandomForest(14).train(total_sample,'lc',bands);
var classified = dataset21.classify(classifier);
var paletteklas2021 = ['#25f0ff','#c48eff',
                            '#fff1e1','#ff0000','#98b374','#edd284',
                            '#d6679a','#fffc98','#cfe804','#147b2a',
                            '#b99a7a','#b2ffc2','#4aff58','#ff9d24'];
Map.addLayer(classified, {min:1, max:14, palette:paletteklas2021},'TUTUPAN LAHAN 2021');
//---------------------------------------------------------------------------
//                         UJI AKURASI
//---------------------------------------------------------------------------
//2019
var sample19          = total_sample19.randomColumn('rand');
var training19        = sample19.filter(ee.Filter.lt('rand',0.7));//Training(70%)
var validation19      = sample19.filter(ee.Filter.gte('rand',0.7));//Validasi(30%)
var classifier2019      = ee.Classifier.smileRandomForest(14).train(training19,'lc',bands);
var confusionMatrix19 = ee.ConfusionMatrix(validation19.classify(classifier2019)
                      .errorMatrix({
                      actual: 'lc',
                      predicted: 'classification'
                      }));
print("///////////////////////////////////////////////////////////////////////////////",
      'Confusion Matrix 2019', confusionMatrix19," ",
      'Overall Accuracy 2019', confusionMatrix19.accuracy()," ",
      'kappa Accuracy 2019',confusionMatrix19.kappa());
//2020
var sample20          = total_sample20.randomColumn('rand');
var training20        = sample20.filter(ee.Filter.lt('rand',0.7));//Training(70%)
var validation20      = sample20.filter(ee.Filter.gte('rand',0.7));//Validasi(30%)
var classifier2020      = ee.Classifier.smileRandomForest(14).train(training20,'lc',bands);
var confusionMatrix20 = ee.ConfusionMatrix(validation20.classify(classifier2020)
                      .errorMatrix({
                      actual: 'lc',
                      predicted: 'classification'
                      }));
print("///////////////////////////////////////////////////////////////////////////////",
      'Confusion Matrix 2020', confusionMatrix20," ",
      'Overall Accuracy 2020', confusionMatrix20.accuracy()," ",
      'kappa Accuracy 2020',confusionMatrix20.kappa());
//2021
var sample          = total_sample.randomColumn('rand');
var training        = sample.filter(ee.Filter.lt('rand',0.7));//Training(70%)
var validation      = sample.filter(ee.Filter.gte('rand',0.7));//Validasi(30%)
var classifier2021      = ee.Classifier.smileRandomForest(14).train(training,'lc',bands);
var confusionMatrix = ee.ConfusionMatrix(validation.classify(classifier2021)
                      .errorMatrix({
                      actual: 'lc',
                      predicted: 'classification'
                      }));
print("///////////////////////////////////////////////////////////////////////////////",
      'Confusion Matrix 2021', confusionMatrix," ",
      'Overall Accuracy 2021', confusionMatrix.accuracy()," ",
      'kappa Accuracy 2021',confusionMatrix.kappa());
//--------------------------------------------------------------------------
//                    SECTION 10-LUASAN HASIL KLASIFIKASI
//--------------------------------------------------------------------------
//Perhitungan Luas Kerapatan Vegetasi
//Tahun 2019
var class_areas_ndvi19 = ee.Image.pixelArea().divide(1e6).multiply(100).addBands(NDVI19);
var areas_ndvi_19 = class_areas_ndvi19.reduceRegion({
    reducer: ee.Reducer.sum().group({
      groupField: 1,
      groupName: 'constant',
   }),
    geometry: shp,
    maxPixels : 1E15,
    scale: 45,
  });
var classAreas_ndvi19 = ee.List(areas_ndvi_19.get('groups')); 
print("///////////////////////////////////////////////////////////////////////////////",
"Luasan Kerapatan Vegetasi 2019 (Ha)",classAreas_ndvi19," ",
"Keterangan Kerapatan Vegetasi", 
"Constant 1: Non Vegetasi(NDVI<0)",
"Constant 2: Vegetasi Sangat Jarang (NDVI 0-0,2)",
"Constant 3: Vegetasi Jarang (NDVI 0,2-0,4)",
"Constant 4: Vegetasi Sedang (NDVI 0,4-0,6)",
"Constant 5: Vegetasi Lebat (NDVI 0,6-0,8)",
"Constant 6: Vegetasi Sangat Lebat (NDVI >0,8)");
//Tahun 2020
var class_areas_ndvi20 = ee.Image.pixelArea().divide(1e6).multiply(100).addBands(NDVI20);
var areas_ndvi_20 = class_areas_ndvi20.reduceRegion({
    reducer: ee.Reducer.sum().group({
      groupField: 1,
      groupName: 'constant',
   }),
    geometry: shp,
    maxPixels : 1E15,
    scale: 45,
  });
var classAreas_ndvi20 = ee.List(areas_ndvi_20.get('groups')); 
print("///////////////////////////////////////////////////////////////////////////////",
"Luasan Kerapatan Vegetasi 2020 (Ha)",classAreas_ndvi20," ",
"Keterangan Kerapatan Vegetasi", 
"Constant 1: Non Vegetasi(NDVI<0)",
"Constant 2: Vegetasi Sangat Jarang (NDVI 0-0,2)",
"Constant 3: Vegetasi Jarang (NDVI 0,2-0,4)",
"Constant 4: Vegetasi Sedang (NDVI 0,4-0,6)",
"Constant 5: Vegetasi Lebat (NDVI 0,6-0,8)",
"Constant 6: Vegetasi Sangat Lebat (NDVI >0,8)");
//Tahun 2021
var class_areas_ndvi = ee.Image.pixelArea().divide(1e6).multiply(100).addBands(NDVI21);
var areas_ndvi = class_areas_ndvi.reduceRegion({
    reducer: ee.Reducer.sum().group({
      groupField: 1,
      groupName: 'constant',
   }),
    geometry: shp,
    maxPixels : 1E15,
    scale: 45,
  });
var classAreas_ndvi21 = ee.List(areas_ndvi.get('groups')); 
print("///////////////////////////////////////////////////////////////////////////////",
"Luasan Kerapatan Vegetasi 2021 (Ha)",classAreas_ndvi21," ",
"Keterangan Kerapatan Vegetasi", 
"Constant 1: Non Vegetasi(NDVI<0)",
"Constant 2: Vegetasi Sangat Jarang (NDVI 0-0,2)",
"Constant 3: Vegetasi Jarang (NDVI 0,2-0,4)",
"Constant 4: Vegetasi Sedang (NDVI 0,4-0,6)",
"Constant 5: Vegetasi Lebat (NDVI 0,6-0,8)",
"Constant 6: Vegetasi Sangat Lebat (NDVI >0,8)");
//Perhitungan Luasan Tutupan Lahan
//Tahun 2019
var class_areas19 = ee.Image.pixelArea().divide(1e6).multiply(100).addBands(classified19);
var areas19 = class_areas19.reduceRegion({
    reducer: ee.Reducer.sum().group({
      groupField: 1,
      groupName: 'classification',
   }),
    geometry: shp,
    maxPixels : 1E15,
    scale: 45,
  });
var classAreas19 = ee.List(areas19.get('groups'));  
print("//////////////////////////////////////////////////////////////////////////////",
"Luasan Klasifikasi Tutupan Lahan 2019 (Ha)",classAreas19," ",
"Keterangan Klasifikasi Tutupan Lahan",
"classification  1: Perairan Darat",
"classification  2: Bandar Udara",
"classification  3: Pertambangan",
"classification  4: Industri",
"classification  5: Kawasan Militer",
"classification  6: Tegalan",
"classification  7: Manggrove",
"classification  8: Pertanian Tanah Kering Semusim",
"classification  9: Semak Belukar",
"classification 10: Kawasan Hutan",
"classification 11: Lahan Terbuka",
"classification 12: Perkebunan",
"classification 13: Pertanian",
"classification 14: Permukiman");
//Tahun 2020
var class_areas20 = ee.Image.pixelArea().divide(1e6).multiply(100).addBands(classified20);
var areas20 = class_areas20.reduceRegion({
    reducer: ee.Reducer.sum().group({
      groupField: 1,
      groupName: 'classification',
   }),
    geometry: shp,
    maxPixels : 1E15,
    scale: 45,
  });
var classAreas20 = ee.List(areas20.get('groups'));  
print("//////////////////////////////////////////////////////////////////////////////",
"Luasan Klasifikasi Tutupan Lahan 2020 (Ha)",classAreas20," ",
"Keterangan Klasifikasi Tutupan Lahan",
"classification  1: Perairan Darat",
"classification  2: Bandar Udara",
"classification  3: Pertambangan",
"classification  4: Industri",
"classification  5: Kawasan Militer",
"classification  6: Tegalan",
"classification  7: Manggrove",
"classification  8: Pertanian Tanah Kering Semusim",
"classification  9: Semak Belukar",
"classification 10: Kawasan Hutan",
"classification 11: Lahan Terbuka",
"classification 12: Perkebunan",
"classification 13: Pertanian",
"classification 14: Permukiman");
//Tahun 2021
var class_areas = ee.Image.pixelArea().divide(1e6).multiply(100).addBands(classified);
var areas = class_areas.reduceRegion({
    reducer: ee.Reducer.sum().group({
      groupField: 1,
      groupName: 'classification',
   }),
    geometry: shp,
    maxPixels : 1E15,
    scale: 45,
  });
var classAreas21 = ee.List(areas.get('groups'));  
print("//////////////////////////////////////////////////////////////////////////////",
"Luasan Klasifikasi Tutupan Lahan 2021 (Ha)",classAreas21," ",
"Keterangan Klasifikasi Tutupan Lahan",
"classification  1: Perairan Darat",
"classification  2: Bandar Udara",
"classification  3: Pertambangan",
"classification  4: Industri",
"classification  5: Kawasan Militer",
"classification  6: Tegalan",
"classification  7: Manggrove",
"classification  8: Pertanian Tanah Kering Semusim",
"classification  9: Semak Belukar",
"classification 10: Kawasan Hutan",
"classification 11: Lahan Terbuka",
"classification 12: Perkebunan",
"classification 13: Pertanian",
"classification 14: Permukiman");
//--------------------------------------------------------------------------
//                    PEMBUATAN GRAFIK
//--------------------------------------------------------------------------
//Chart Kerapatan Vegetasi
var luas_coll = ee.FeatureCollection([classAreas_ndvi21, classAreas_ndvi20, classAreas_ndvi19]);
var luas_chart = ui.Chart.array.values(classAreas_ndvi21, 6).setChartType('ColumnChart');
var labelByCode = ee.Dictionary({
  1: 'Non Vegetasi',
  2: 'Vegetasi Sangat Jarang',
  3: 'Vegetasi Jarang',
  4: 'Vegetasi Sedang',
  5: 'Vegetasi Lebat',
  6: 'Vegetasi Sangat Lebat',
});
var features = ee
  .FeatureCollection([
    ee.Feature(null, {year: 2019, data: classAreas_ndvi19}),
    ee.Feature(null, {year: 2020, data: classAreas_ndvi20}),
    ee.Feature(null, {year: 2021, data: classAreas_ndvi21}),
  ])
  .map(function(feature) {
    var year = feature.getNumber('year');
    return ee.FeatureCollection(
      ee.List(feature.get('data'))
        .map(function(o) {
          o = ee.Dictionary(o);
          var constant = o.getNumber('constant');
          return ee.Feature(null, {
            year: year,
            constant: constant,
            label: labelByCode.get(constant.format()),
            area: o.getNumber('sum')
          });
        })
    );
  })
  .flatten();
var chart = ui.Chart.feature
  .groups({
    features: features,
    xProperty: 'label',
    yProperty: 'area',
    seriesProperty: 'year'
  })
  .setChartType('ColumnChart');
print("Grafik Perubahan Kerapatan Vegetasi",chart);
//Grfaik Klasifikasi Tutupan Lahan
var luas_coll = ee.FeatureCollection([classAreas21, classAreas20, classAreas19]);
var luas_chart = ui.Chart.array.values(classAreas21, 14).setChartType('ColumnChart');
var labelByCode = ee.Dictionary({
  1: 'Perairan Darat',
  2: 'Bandar Udara',
  3: 'Pertambangan',
  4: 'Industri',
  5: 'Kawasan Militer',
  6: 'Tegalan',
  7: 'Manggrove',
  8: 'Pertanian Tanah Kering Semusim',
  9: 'Semak Belukar',
  10: 'Kawasan Hutan',
  11: 'Lahan Terbuka',
  12: 'Perkebunan',
  13: 'Pertanian',
  14: 'Permukiman',
});
var features = ee
  .FeatureCollection([
    ee.Feature(null, {year: 2019, data: classAreas19}),
    ee.Feature(null, {year: 2020, data: classAreas20}),
    ee.Feature(null, {year: 2021, data: classAreas21}),
  ])
  .map(function(feature) {
    var year = feature.getNumber('year');
    return ee.FeatureCollection(
      ee.List(feature.get('data'))
        .map(function(o) {
          o = ee.Dictionary(o);
          var classification = o.getNumber('classification');
          return ee.Feature(null, {
            year: year,
            classification: classification,
            label: labelByCode.get(classification.format()),
            area: o.getNumber('sum')
          });
        })
    );
  })
  .flatten();
var chart2 = ui.Chart.feature
  .groups({
    features: features,
    xProperty: 'label',
    yProperty: 'area',
    seriesProperty: 'year'
  })
  .setChartType('ColumnChart');
print("Grafik Perubahan Tutupan Lahan",chart2);
//--------------------------------------------------------------------------
//                        LEGENDA
//--------------------------------------------------------------------------
//Penambahan Title 
Map.add(ui.Label(
    'TUTUPAN LAHAN DAN KERAPATAN VEGETASI JAWA TIMUR 2021', {fontWeight: 'bold', fontSize: '24px'}));
//Pembuatan Lagenda Peta Tutupan Lahan  
var legend = ui.Panel({style: {position: 'bottom-left', padding: '8px 15px'}});
var makeRow = function(color, name) {
  var colorBox = ui.Label({
    style: {color: '#ffffff',
      backgroundColor: color,
      padding: '10px',
      margin: '0 0 4px 0',
    }
  });
  var description = ui.Label({
    value: name,
    style: {
      margin: '0px 0 4px 6px',
    }
  }); 
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')}
)};
var title = ui.Label({
  value: 'KETERANGAN TUTUPAN LAHAN',
  style: {fontWeight: 'bold',
    fontSize: '16px',
    margin: '0px 0 4px 0px'}});
legend.add(title);
legend.add(makeRow('#25f0ff','Perairan Darat'));
legend.add(makeRow('#c48eff','Bandar Udara'));
legend.add(makeRow('#fff1e1','Pertambangan'));
legend.add(makeRow('#ff0000','Industri'));
legend.add(makeRow('#98b374','Kawasan Militer'));
legend.add(makeRow('#edd284','Tegalan'));
legend.add(makeRow('#d6679a','Manggrove'));
legend.add(makeRow('#fffc98','Pertanian Tanah Kering Semusim'));
legend.add(makeRow('#cfe804','Semak Belukar'));
legend.add(makeRow('#147b2a','Kawasan Hutan'));
legend.add(makeRow('#b99a7a','Lahan Terbuka'));
legend.add(makeRow('#b2ffc2','Perkebunan'));
legend.add(makeRow('#4aff58','Pertanian'));
legend.add(makeRow('#ff9d24','Permukiman'));
Map.add(legend);
//Lagenda NDVI
var legend = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px'
  }
});
var legend2 = ui.Label({
  value: 'RENTANG NILAI NDVI',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
legend.add(legend2);
// Creates the content of the legend
var content = function(color, label) {
      // Create the color boxes
      var box = ui.Label({
        style: {
          backgroundColor: '#' + color,
          // Set box height and width
          padding: '9px',
          margin: '0 0 4px 0'
        }
      });
      // Create the labels
      var labels = ui.Label({
        value: label,
        style: {margin: '0 0 4px 6px'}
      });
      return ui.Panel({
        widgets: [box, labels],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
var classcolor = ['0070FF','FF0000','FF6600','FFCC00','CEED00','79C900'];
var labelName = ['<0 (Non Vegetasi)','0 - 0.2 (Vegetasi Sangat Jarang)','0.2 - 0.4 (Vegetasi Jarang)'
                ,'0.4 - 0.6 (Vegetasi Sedang)','0.6 - 0.8 (Vegetasi Lebat)', '>0.8 (Vegetasi Sangat Lebat)'];
// Combine legend colou and labels
for (var i = 0; i < 6; i++) {
  legend.add(content(classcolor[i], labelName[i]));
  }  
Map.add(legend);