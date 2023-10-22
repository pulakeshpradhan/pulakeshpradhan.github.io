var table = ui.import && ui.import("table", "table", {
      "id": "users/geasivaul0401/batas"
    }) || ee.FeatureCollection("users/geasivaul0401/batas"),
    classnames = ui.import && ui.import("classnames", "table", {
      "id": "users/geasivaul0401/p1"
    }) || ee.FeatureCollection("users/geasivaul0401/p1"),
    classnames2 = ui.import && ui.import("classnames2", "table", {
      "id": "users/geasivaul0401/p2"
    }) || ee.FeatureCollection("users/geasivaul0401/p2"),
    classnames3 = ui.import && ui.import("classnames3", "table", {
      "id": "users/geasivaul0401/p3"
    }) || ee.FeatureCollection("users/geasivaul0401/p3"),
    AOI1 = ui.import && ui.import("AOI1", "table", {
      "id": "users/geasivaul0401/AOI1"
    }) || ee.FeatureCollection("users/geasivaul0401/AOI1"),
    AOI2 = ui.import && ui.import("AOI2", "table", {
      "id": "users/geasivaul0401/aoi2"
    }) || ee.FeatureCollection("users/geasivaul0401/aoi2"),
    AOI3 = ui.import && ui.import("AOI3", "table", {
      "id": "users/geasivaul0401/aoi3"
    }) || ee.FeatureCollection("users/geasivaul0401/aoi3");
var title = ui.Label('Tutupan Lahan Kawasan Terdampak Letusan Gunung Semeru 2022', {
  stretch: 'horizontal',
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: '24px'
});
function cloudmask(col) {
  // Bits 3 and 5 are cloud shadow and cloud, respectively.
  var cloudShadowBitMask = (1 << 3);
  var cloudsBitMask = (1 << 5);
  // Get the pixel QA band.
  var qa = col.select('pixel_qa');
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
                 .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
  return col.updateMask(mask); }
function maskL8sr(image) {
  // Bit 0 - Fill
  // Bit 1 - Dilated Cloud
  // Bit 2 - Cirrus
  // Bit 3 - Cloud
  // Bit 4 - Cloud Shadow
  var qaMask = image.select('QA_PIXEL').bitwiseAnd(parseInt('11111', 2)).eq(0);
  var saturationMask = image.select('QA_RADSAT').eq(0);
  // Apply the scaling factors to the appropriate bands.
  var opticalBands = image.select('SR_B.').multiply(0.0000275).add(-0.2);
  var thermalBands = image.select('ST_B.*').multiply(0.00341802).add(149.0);
  // Replace the original bands with the scaled ones and apply the masks.
  return image.addBands(opticalBands, null, true)
      .addBands(thermalBands, null, true)
      .updateMask(qaMask)
      .updateMask(saturationMask);
}
var addIndicesL8 = function(img) {
  // NDVI
  var ndvi = img.normalizedDifference(['SR_B5','SR_B4']).rename('NDVI');
  // MNDWI (Modified Normalized Difference Water Index - Hanqiu Xu, 2006)
  var mndwi = img.normalizedDifference(['SR_B3','SR_B6']).rename('MNDWI');
  // SR (Simple Ratio)
  var sr = img.select('SR_B5').divide(img.select('SR_B4')).rename('SR');
  //mndvi
  var mndvi = img.expression(
                      '(NIR-((RED+GREEN+BLUE)/3))/(NIR+((RED+GREEN+BLUE)/3))', {
                        'NIR' : img.select('SR_B5'),
                        'RED' : img.select('SR_B4'),
                        'GREEN' : img.select('SR_B3'),
                        'BLUE' : img.select('SR_B2')
                      })
                      .rename('MNDVI');
  return img
    .addBands(ndvi)
    .addBands(mndwi)
    .addBands(sr)
    .addBands(mndvi);
};
// Map the function over one year of data.
var image1 = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2')
                     .filterDate('2020-12-01','2021-05-31')
                     .map(maskL8sr)
                     .map(addIndicesL8)
                     .filterMetadata('CLOUD_COVER','less_than',60)
                     .filterBounds(table)
                     .mean().clip(table)
                     Map.centerObject(table,8.5);
var image2 = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2')
            .filterDate('2021-06-01','2021-11-30')
            .map(maskL8sr)
            .map(addIndicesL8)
            .filterMetadata('CLOUD_COVER','less_than',60)
            .filterBounds(table)
            .mean().clip(table);
            Map.centerObject(table,8.5);
var image3 = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2')
            .filterDate('2021-12-01','2022-05-31')
            .map(maskL8sr)
            .map(addIndicesL8)
            .filterMetadata('CLOUD_COVER','less_than',60)
            .filterBounds(table)
            .mean().clip(table);
            Map.centerObject(table,8.5);
// Display the results image. 
Map.addLayer(image1, {bands: ['SR_B4', 'SR_B3', 'SR_B2'], min: 0, max: 0.3}, "DATA1",false);
Map.addLayer(image2, {bands: ['SR_B4', 'SR_B3', 'SR_B2'], min: 0, max: 0.3}, "DATA2",false);
Map.addLayer(image3, {bands: ['SR_B4', 'SR_B3', 'SR_B2'], min: 0, max: 0.3}, "DATA3",false);
//Membuat 5 kelas tutupan lahan 
//var classnames = BadanAir4.merge(LahanTerbuka4).merge(Bangunan4).merge(VegetasiRapat4).merge(Vegetasi4)
//var classnames2 = BadanAir2.merge(LahanTerbuka2).merge(Bangunan2).merge(VegetasiRapat2).merge(Vegetasi2)
//var classnames3 = BadanAir3.merge(LahanTerbuka3).merge(Bangunan3).merge(VegetasiRapat3).merge(Vegetasi3)
//print(classnames)
//------------------------------------------------------------------------------------------
//------------------------- Dengan band stacking indices -----------------------------------
//built training data
var bands = (['SR_B2','SR_B3','SR_B4','SR_B5','SR_B6','SR_B7']);
var training1=image1.select(bands).sampleRegions({
  collection: classnames,
  properties: ['LandCover4'],
  scale : 30
})
var training2=image2.select(bands).sampleRegions({
  collection: classnames2,
  properties: ['LandCover2'],
  scale : 30
})
var training3=image3.select(bands).sampleRegions({
  collection: classnames3,
  properties: ['LandCover3'],
  scale : 30
})
//RF Classification
var trained1 =  ee.Classifier.smileRandomForest(5).train({
  features : training1,
  classProperty: 'LandCover4',
  inputProperties: bands
})
var trained2 =  ee.Classifier.smileRandomForest(5).train({
  features : training2,
  classProperty: 'LandCover2',
  inputProperties: bands
})
var trained3 =  ee.Classifier.smileRandomForest(5).train({
  features : training3,
  classProperty: 'LandCover3',
  inputProperties: bands
})
var RFclassified1 = image1.select(bands).classify(trained1);
var RFclassified2 = image2.select(bands).classify(trained2);
var RFclassified3 = image3.select(bands).classify(trained3);
//uji akurasi
var trainAccuracyRF1 = trained1.confusionMatrix();
print('Resubstitution error matrix RF-1: ', trainAccuracyRF1);
var OA_RF1 = trainAccuracyRF1.accuracy();
var Kappa_RF1 = trainAccuracyRF1.kappa();
print('OA RF-1:',OA_RF1)
print('Kappa RF-1:',Kappa_RF1)
var trainAccuracyRF2 = trained2.confusionMatrix();
print('Resubstitution error matrix RF-2: ', trainAccuracyRF2);
var OA_RF2 = trainAccuracyRF2.accuracy();
var Kappa_RF2 = trainAccuracyRF2.kappa();
print('OA RF-2:',OA_RF2)
print('Kappa RF-2:',Kappa_RF2)
var trainAccuracyRF3 = trained3.confusionMatrix();
print('Resubstitution error matrix RF-3: ', trainAccuracyRF3);
var OA_RF3 = trainAccuracyRF3.accuracy();
var Kappa_RF3 = trainAccuracyRF3.kappa();
print('OA RF-3:',OA_RF3)
print('Kappa RF-3:',Kappa_RF3)
// Display the results RF. 
Map.addLayer(RFclassified1,
             {min: 0, max: 4, palette: ['6fa8dc', 'f4fe0a', 'cc0013','91af40','387242']},
             'RF LandCover 1',false)
Map.addLayer(RFclassified2,
             {min: 0, max: 4, palette: ['6fa8dc', 'f4fe0a', 'cc0013','91af40','387242']},
             'RF LandCover 2',false)
Map.addLayer(RFclassified3,
             {min: 0, max: 4, palette: ['6fa8dc', 'f4fe0a', 'cc0013','91af40','387242']},
             'RF LandCover 3',false)
//SVM 
// Create an SVM classifier with custom parameters.
var classifierSVM = ee.Classifier.libsvm({
  kernelType: 'RBF',
  gamma: 0.5,
  cost: 10
});
// Train the classifier.
var trainedSVM1 = classifierSVM.train(training1, 'LandCover4', bands);
var trainedSVM2 = classifierSVM.train(training2, 'LandCover2', bands);
var trainedSVM3 = classifierSVM.train(training3, 'LandCover3', bands);
// Classify the image.
var SVMclassified1 = image1.classify(trainedSVM1);
var SVMclassified2 = image2.classify(trainedSVM2);
var SVMclassified3 = image3.classify(trainedSVM3);
var trainAccuracySVM = trainedSVM1.confusionMatrix();
print('Resubstitution error matrix: ', trainAccuracySVM);
var OA_SVM1 = trainAccuracySVM.accuracy();
var Kappa_SVM1 = trainAccuracySVM.kappa();
print('OA SVM-1:',OA_SVM1)
print('Kappa SVM-1:',Kappa_SVM1)
var trainAccuracySVM2 = trainedSVM2.confusionMatrix();
print('Resubstitution error matrix: ', trainAccuracySVM2);
var OA_SVM2 = trainAccuracySVM2.accuracy();
var Kappa_SVM2 = trainAccuracySVM2.kappa();
print('OA SVM-2:',OA_SVM2)
print('Kappa SVM-2:',Kappa_SVM2)
var trainAccuracySVM3 = trainedSVM3.confusionMatrix();
print('Resubstitution error matrix: ', trainAccuracySVM3);
var OA_SVM3 = trainAccuracySVM3.accuracy();
var Kappa_SVM3 = trainAccuracySVM3.kappa();
print('OA SVM-3:',OA_SVM3)
print('Kappa SVM-3:',Kappa_SVM3)
// Display the classification result and the input image.
Map.addLayer(SVMclassified1,
             {min: 0, max: 4, palette: ['6fa8dc', 'f4fe0a', 'cc0013','91af40','387242']},
             'SVM LandCover1',false)
Map.addLayer(SVMclassified2,
             {min: 0, max: 4, palette: ['6fa8dc', 'f4fe0a', 'cc0013','91af40','387242']},
             'SVM LandCover2',false)
Map.addLayer(SVMclassified3,
             {min: 0, max: 4, palette: ['6fa8dc', 'f4fe0a', 'cc0013','91af40','387242']},
             'SVM LandCover3',false)
//menghitung luas AOI
  //--------------------------------------RF--------------------------------------------------
  //AOI1-RF 
    //Periode 2
      var areasAOI1_2 = ee.Image.pixelArea().divide(1e6).addBands(RFclassified2);
      var AREASAOI1_2 = areasAOI1_2.reduceRegion({
                        reducer: ee.Reducer.sum().group({
                          groupField: 1,
                          groupName: 'class',
                          }),
                        geometry:AOI1,
                        scale: 30,
                        maxPixels: 1e13
                      }); 
      //print('RF-Luas AOI1-P2',AREASAOI1_2)
    //Periode 3
      var areasAOI1_3 = ee.Image.pixelArea().divide(1e6).addBands(RFclassified3);
      var AREASAOI1_3 = areasAOI1_3.reduceRegion({
                        reducer: ee.Reducer.sum().group({
                          groupField: 1,
                          groupName: 'class',
                          }),
                        geometry:AOI1,
                        scale: 30,
                        maxPixels: 1e13
                      }); 
      //print('RF-Luas AOI1-P3',AREASAOI1_3)  
  //AOI2-RF 
    //Periode 2
      var areasAOI2_2 = ee.Image.pixelArea().divide(1e6).addBands(RFclassified2);
      var AREASAOI2_2 = areasAOI2_2.reduceRegion({
                        reducer: ee.Reducer.sum().group({
                          groupField: 1,
                          groupName: 'class',
                          }),
                        geometry:AOI2,
                        scale: 30,
                        maxPixels: 1e13
                      }); 
      //print('RF-Luas AOI2-P2',AREASAOI2_2)
    //Periode 3
      var areasAOI2_3 = ee.Image.pixelArea().divide(1e6).addBands(RFclassified3);
      var AREASAOI2_3 = areasAOI2_3.reduceRegion({
                        reducer: ee.Reducer.sum().group({
                          groupField: 1,
                          groupName: 'class',
                          }),
                        geometry:AOI2,
                        scale: 30,
                        maxPixels: 1e13
                      }); 
      //print('RF-Luas AOI2-P3',AREASAOI2_3)
  //AOI3-RF 
    //Periode 2
      var areasAOI3_2 = ee.Image.pixelArea().divide(1e6).addBands(RFclassified2);
      var AREASAOI3_2 = areasAOI3_2.reduceRegion({
                        reducer: ee.Reducer.sum().group({
                          groupField: 1,
                          groupName: 'class',
                          }),
                        geometry:AOI3,
                        scale: 30,
                        maxPixels: 1e13
                      }); 
      //print('RF-Luas AOI3-P2',AREASAOI3_2)
    //Periode 3
      var areasAOI3_3 = ee.Image.pixelArea().divide(1e6).addBands(RFclassified3);
      var AREASAOI3_3 = areasAOI3_3.reduceRegion({
                        reducer: ee.Reducer.sum().group({
                          groupField: 1,
                          groupName: 'class',
                          }),
                        geometry:AOI3,
                        scale: 30,
                        maxPixels: 1e13
                      }); 
      //print('RF-Luas AOI3-P3',AREASAOI3_3)
  //--------------------------------------SVM-----------------------------------------------
  //AOI1-SVM 
    //Periode 2
      var areasSVMAOI1_2 = ee.Image.pixelArea().divide(1e6).addBands(SVMclassified2);
      var AREASSVMAOI1_2 = areasSVMAOI1_2.reduceRegion({
                        reducer: ee.Reducer.sum().group({
                          groupField: 1,
                          groupName: 'class',
                          }),
                        geometry:AOI1,
                        scale: 30,
                        maxPixels: 1e13
                      }); 
      //print('SVM-Luas AOI1-P2',AREASSVMAOI1_2)
    //Periode 3
      var areasSVMAOI1_3 = ee.Image.pixelArea().divide(1e6).addBands(SVMclassified3);
      var AREASSVMAOI1_3 = areasSVMAOI1_3.reduceRegion({
                        reducer: ee.Reducer.sum().group({
                          groupField: 1,
                          groupName: 'class',
                          }),
                        geometry:AOI1,
                        scale: 30,
                        maxPixels: 1e13
                      }); 
      //print('SVM-Luas AOI1-P3',AREASSVMAOI1_3)  
  //AOI2-SVM 
    //Periode 2
      var areasSVMAOI2_2 = ee.Image.pixelArea().divide(1e6).addBands(SVMclassified2);
      var AREASSVMAOI2_2 = areasSVMAOI2_2.reduceRegion({
                        reducer: ee.Reducer.sum().group({
                          groupField: 1,
                          groupName: 'class',
                          }),
                        geometry:AOI2,
                        scale: 30,
                        maxPixels: 1e13
                      }); 
      //print('SVM-Luas AOI2-P2',AREASSVMAOI2_2)
    //Periode 3
      var areasSVMAOI2_3 = ee.Image.pixelArea().divide(1e6).addBands(SVMclassified3);
      var AREASSVMAOI2_3 = areasSVMAOI2_3.reduceRegion({
                        reducer: ee.Reducer.sum().group({
                          groupField: 1,
                          groupName: 'class',
                          }),
                        geometry:AOI2,
                        scale: 30,
                        maxPixels: 1e13
                      }); 
      //print('SVM-Luas AOI2-P3',AREASSVMAOI2_3)
  //AOI3-SVM 
    //Periode 2
      var areasSVMAOI3_2 = ee.Image.pixelArea().divide(1e6).addBands(SVMclassified2);
      var AREASSVMAOI3_2 = areasSVMAOI3_2.reduceRegion({
                        reducer: ee.Reducer.sum().group({
                          groupField: 1,
                          groupName: 'class',
                          }),
                        geometry:AOI3,
                        scale: 30,
                        maxPixels: 1e13
                      }); 
      //print('SVM-Luas AOI3-P2',AREASSVMAOI3_2)
    //Periode 3
      var areasSVMAOI3_3 = ee.Image.pixelArea().divide(1e6).addBands(SVMclassified3);
      var AREASSVMAOI3_3 = areasSVMAOI3_3.reduceRegion({
                        reducer: ee.Reducer.sum().group({
                          groupField: 1,
                          groupName: 'class',
                          }),
                        geometry:AOI3,
                        scale: 30,
                        maxPixels: 1e13
                      }); 
      //print('SVM-Luas AOI3-P3',AREASSVMAOI3_3)
//Mengatur parameter visualisasi NO2 Rerata Bulanan 
var parameter = {min: 0, max: 4, palette: ['6fa8dc', 'f4fe0a', 'cc0013','91af40','387242']};
//Memvisualisasikan Nitrogen Dioksida rerata bulanan
Map.addLayer (ee.Image(RFclassified2).clip(AOI1),parameter,'AOI1-P2',false);     
Map.addLayer (ee.Image(RFclassified3).clip(AOI1),parameter,'AOI1-P3',false);     
Map.addLayer (ee.Image(RFclassified2).clip(AOI2),parameter,'AOI2-P2',false);     
Map.addLayer (ee.Image(RFclassified3).clip(AOI2),parameter,'AOI2-P3',false);     
Map.addLayer (ee.Image(RFclassified2).clip(AOI3),parameter,'AOI3-P2',false);     
Map.addLayer (ee.Image(RFclassified3).clip(AOI3),parameter,'AOI3-P3',false);  
Map.addLayer (ee.Image(SVMclassified2).clip(AOI1),parameter,'SVM-AOI1-P2',false);     
Map.addLayer (ee.Image(SVMclassified3).clip(AOI1),parameter,'SVM-AOI1-P3',false);  
Map.addLayer (ee.Image(SVMclassified2).clip(AOI2),parameter,'SVM-AOI2-P2',false);     
Map.addLayer (ee.Image(SVMclassified3).clip(AOI2),parameter,'SVM-AOI2-P3',false); 
Map.addLayer (ee.Image(SVMclassified2).clip(AOI3),parameter,'SVM-AOI3-P2',false);     
Map.addLayer (ee.Image(SVMclassified3).clip(AOI3),parameter,'SVM-AOI3-P3',false); 
// Create a map panel.
  var mapPanel = ui.Map();
  // Add these to the interface.
  ui.root.widgets().reset([mapPanel]);
  ui.root.setLayout(ui.Panel.Layout.flow('horizontal'));
  // Add a title and some explanatory text to a side panel.
  var header = ui.Label('Land Cover Change After Semeru Eruption 2021',
                       {fontWeight: 'bold',
                        fontSize: '25px', 
                        color: 'black', 
                        textAlign: 'center'});
  var text = ui.Label(
            'The result from Spatio-temporal analysis of land cover changes based on RF and SVM algorithm without adding indices',
            {fontSize: '14px', textAlign: 'justify'});
  var toolPanel = ui.Panel([header, text], 'flow', {width: '300px'});
  //Create Legend Panel
  var legendPanel = ui.Panel({
                    style: {
                      fontSize: '12px', 
                      margin: '0 0 0 8px', 
                      padding: '0'}
  });
  var legendTitle = ui.Label(
                    'Legenda :',
                    {fontWeight: 'bold', 
                     fontSize: '16px', 
                     margin: '0 0 4px 0', 
                     padding: '0'});
  // Creates and styles 1 row of the legend.
  var makeRow = function(color, name) {
      // Create the label that is actually the colored box.
      var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
          // Use padding to give the box height and width.
          padding: '8px',
          margin: '0 0 4px 0'
        }
      });
      // Create the label filled with the description text.
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}
      });
      // return the panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
  };
toolPanel.add(legendPanel);
toolPanel.add(ui.Label('Choose an AOI to calculate Area', {'fontWeight': 'bold','font-size': '16px'}));
  //  Palette with the colors
  var palette =['6fa8dc', 'f4fe0a', 'cc0013','91af40','387242'];
  // name of the legend
  //var names = ['Water Bodies', 'Barren Lands','Built-up','Vegetation','Forest','AOI1'];
//Make chart
var classNames = ['Water Bodies', 'Barren Lands','Built-up','Vegetation','Forest'];
var options = {
  hAxis: {title: 'Land Cover Class'},
  vAxis: {title: 'Area in Kilometers'},
  title: 'Area in KM by Land Cover Class',
  series: { // set color for each class
    0: {color: '6fa8dc'}, 
    1: {color: 'f4fe0a'}, 
    2: {color: 'cc0013'},
    3: {color: '91af40'},
    4: {color: '387242'}} 
};
  var chartRFAOI1_2 = ui.Chart.image.byClass({
    image: ee.Image.pixelArea().divide(1e6).addBands(RFclassified2),
    classBand: 'classification', 
    scale: 30,
    region: AOI1,
    reducer: ee.Reducer.sum()
  }).setSeriesNames(classNames)
  .setOptions(options)
  ;
  //print(chartRFAOI1_2);
  var chartRFAOI1_3 = ui.Chart.image.byClass({
    image: ee.Image.pixelArea().divide(1e6).addBands(RFclassified3),
    classBand: 'classification', 
    scale: 30,
    region: AOI1,
    reducer: ee.Reducer.sum()
  }).setSeriesNames(classNames)
  .setOptions(options)
  ;
  //print(chartRFAOI1_3);
  var chartRFAOI2_2 = ui.Chart.image.byClass({
    image: ee.Image.pixelArea().divide(1e6).addBands(RFclassified2),
    classBand: 'classification', 
    scale: 30,
    region: AOI2,
    reducer: ee.Reducer.sum()
  }).setSeriesNames(classNames)
  .setOptions(options)
  ;
  //print(chartRFAOI2_2);  
  var chartRFAOI2_3 = ui.Chart.image.byClass({
    image: ee.Image.pixelArea().divide(1e6).addBands(RFclassified3),
    classBand: 'classification', 
    scale: 30,
    region: AOI2,
    reducer: ee.Reducer.sum()
  }).setSeriesNames(classNames)
  .setOptions(options)
  ;
  //print(chartRFAOI2_3);  
  var chartRFAOI3_2 = ui.Chart.image.byClass({
    image: ee.Image.pixelArea().divide(1e6).addBands(RFclassified2),
    classBand: 'classification', 
    scale: 30,
    region: AOI3,
    reducer: ee.Reducer.sum()
  }).setSeriesNames(classNames)
  .setOptions(options)
  ;
  //print(chartRFAOI3_2);
  var chartRFAOI3_3 = ui.Chart.image.byClass({
    image: ee.Image.pixelArea().divide(1e6).addBands(RFclassified3),
    classBand: 'classification', 
    scale: 30,
    region: AOI3,
    reducer: ee.Reducer.sum()
  }).setSeriesNames(classNames)
  .setOptions(options)
  ;
  //print(chartRFAOI3_3);  
  var chartSVMAOI1_2 = ui.Chart.image.byClass({
    image: ee.Image.pixelArea().divide(1e6).addBands(SVMclassified2),
    classBand: 'classification', 
    scale: 30,
    region: AOI1,
    reducer: ee.Reducer.sum()
  }).setSeriesNames(classNames)
  .setOptions(options)
  ;
  //print(chartSVMAOI1_2);
  var chartSVMAOI1_3 = ui.Chart.image.byClass({
    image: ee.Image.pixelArea().divide(1e6).addBands(SVMclassified3),
    classBand: 'classification', 
    scale: 30,
    region: AOI1,
    reducer: ee.Reducer.sum()
  }).setSeriesNames(classNames)
  .setOptions(options)
  ;
  //print(chartSVMAOI1_3);
  var chartSVMAOI2_2 = ui.Chart.image.byClass({
    image: ee.Image.pixelArea().divide(1e6).addBands(SVMclassified2),
    classBand: 'classification', 
    scale: 30,
    region: AOI2,
    reducer: ee.Reducer.sum()
  }).setSeriesNames(classNames)
  .setOptions(options)
  ;
  //print(chartSVMAOI2_2);  
  var chartSVMAOI2_3 = ui.Chart.image.byClass({
    image: ee.Image.pixelArea().divide(1e6).addBands(SVMclassified3),
    classBand: 'classification', 
    scale: 30,
    region: AOI2,
    reducer: ee.Reducer.sum()
  }).setSeriesNames(classNames)
  .setOptions(options)
  ;
  //print(chartSVMAOI2_3);  
  var chartSVMAOI3_2 = ui.Chart.image.byClass({
    image: ee.Image.pixelArea().divide(1e6).addBands(SVMclassified2),
    classBand: 'classification', 
    scale: 30,
    region: AOI3,
    reducer: ee.Reducer.sum()
  }).setSeriesNames(classNames)
  .setOptions(options)
  ;
  //print(chartSVMAOI3_2);
  var chartSVMAOI3_3 = ui.Chart.image.byClass({
    image: ee.Image.pixelArea().divide(1e6).addBands(SVMclassified3),
    classBand: 'classification', 
    scale: 30,
    region: AOI3,
    reducer: ee.Reducer.sum()
  }).setSeriesNames(classNames)
  .setOptions(options)
  ;
  //print(chartSVMAOI3_3);  
// Make a Panel AOI
    var chartPanel1 = ui.Panel({
                        style: {
                          fontSize: '12px', 
                          margin: '0 0 0 8px', 
                          padding: '0'}
      });
    var panelAxis1 = ui.Panel({layout: ui.Panel.Layout.flow('horizontal')});
var checkbox1 = ui.Checkbox('AOI 1', false);
checkbox1.onChange(function(checked) {
  if (checked) {
    panelAxis1.clear()
    var selectItems = Object.keys(charting1);
    var layerSelect = ui.Select({
      items: selectItems,
      value: selectItems[0],
      onChange: function(selected) {
      panelAxis1.widgets().set(0,charting1[selected]);
      }
    });
    chartPanel1.add(layerSelect);
    chartPanel1.add(panelAxis1)
  } else {
    // Replace the split's left panel so that the map which used to be the left panel can be reused elsewhere
    chartPanel1.clear()
    chartPanel1.add(checkbox1)
    }
});   
chartPanel1.add(checkbox1)
//----
    var chartPanel2 = ui.Panel({
                        style: {
                          fontSize: '12px', 
                          margin: '0 0 0 8px', 
                          padding: '0'}
      });
    var panelAxis2 = ui.Panel({layout: ui.Panel.Layout.flow('vertical')});
var checkbox2 = ui.Checkbox('AOI 2', false);
checkbox2.onChange(function(checked) {
  if (checked) {
    panelAxis2.clear()
    var selectItems = Object.keys(charting2);
    var layerSelect = ui.Select({
      items: selectItems,
      value: selectItems[0],
      onChange: function(selected) {
      panelAxis2.widgets().set(0,charting2[selected]);
      }
    });
    chartPanel2.add(layerSelect);
    chartPanel2.add(panelAxis2)
  } else {
    // Replace the split's left panel so that the map which used to be the left panel can be reused elsewhere
    chartPanel2.clear()
    chartPanel2.add(checkbox2)
    }
});   
chartPanel2.add(checkbox2);
//--
    var chartPanel3 = ui.Panel({
                        style: {
                          fontSize: '12px', 
                          margin: '0 0 0 8px', 
                          padding: '0'}
      });
    var panelAxis3 = ui.Panel({layout: ui.Panel.Layout.flow('vertical')});
var checkbox3 = ui.Checkbox('AOI 3', false);
checkbox3.onChange(function(checked) {
  if (checked) {
    panelAxis3.clear()
    var selectItems = Object.keys(charting3);
    var layerSelect = ui.Select({
      items: selectItems,
      value: selectItems[0],
      onChange: function(selected) {
      panelAxis3.widgets().set(0,charting3[selected]);
      }
    });
    chartPanel3.add(layerSelect);
    chartPanel3.add(panelAxis3)
  } else {
    // Replace the split's left panel so that the map which used to be the left panel can be reused elsewhere
    chartPanel3.clear()
    chartPanel3.add(checkbox3)
    }
});   
chartPanel3.add(checkbox3);
//chartPanel.add(checkbox2)
//chartPanel.add(checkbox3)
    var charting1 = {
      'Areas Chart AOI1 Before Eruption based on RF Algorithm' : chartRFAOI1_2,
      'Areas Chart AOI1 After Eruption based on RF Algorithm' : chartRFAOI1_3,
      'Areas Chart AOI1 Before Eruption based on SVM Algorithm' : chartSVMAOI1_2,
      'Areas Chart AOI1 After Eruption based on SVM Algorithm' : chartSVMAOI1_3,
      };
    var charting2 = {
      'Areas Chart AOI2 Before Eruption based on RF Algorithm' : chartRFAOI2_2,
      'Areas Chart AOI2 After Eruption based on RF Algorithm' : chartRFAOI2_3,
      'Areas Chart AOI2 Before Eruption based on SVM Algorithm' : chartSVMAOI2_2,
      'Areas Chart AOI2 After Eruption based on SVM Algorithm' : chartSVMAOI2_3,
      };
    var charting3 = {
      'Areas Chart AOI3 Before Eruption based on RF Algorithm' : chartRFAOI3_2,
      'Areas Chart AOI3 After Eruption based on RF Algorithm' : chartRFAOI3_3,
      'Areas Chart AOI3 Before Eruption based on SVM Algorithm' : chartSVMAOI3_2,
      'Areas Chart AOI3 After Eruption based on SVM Algorithm' : chartSVMAOI3_3,
      };
    var images = {
      'RF:Landcover before eruption ': RFclassified2.visualize({min: 0, max: 4, palette:palette}),
      'RF:Landcover after eruption':RFclassified3.visualize({min: 0, max: 4, palette:palette}),
      'SVM:Landcover before eruption':SVMclassified2.visualize({min: 0, max: 4, palette:palette}),
      'SVm:Landcover after eruption':SVMclassified3.visualize({min: 0, max: 4, palette:palette}),
    };
    //Styling Shapefile in Google Earth Engine
    var styling1 = {color: 'FF9F29' , fillColor:'ffffff00'};
    var styling2 = {color: 'ffffff' , fillColor:'ffffff00'};
    var styling3 = {color: 'F637EC' , fillColor:'ffffff00'};
    // Create the left map, and have it display layer 0.
    var center = {lon: 112.826314, lat: -8.140076, zoom: 10};
    var leftMap = ui.Map(center).setOptions('SATELLITE');
    leftMap.setControlVisibility(false);
    var leftSelector = addLayerSelector(leftMap, 0, 'top-left');
    // Create the right map, and have it display layer 1.
    var rightMap = ui.Map(center).setOptions('SATELLITE');
    rightMap.setControlVisibility(false);
        var rightSelector = addLayerSelector(rightMap, 1, 'top-right');
    // Adds a layer selection widget to the given map, to allow users to change
    // which image is displayed in the associated map.
    function addLayerSelector(mapToChange, defaultValue, position) {
      var label = ui.Label('Choose an image to visualize');
      // This function changes the given map to show the selected image.
      function updateMap(selection) {
        mapToChange.layers().set(0, ui.Map.Layer(images[selection]));
      }
      // Configure a selection dropdown to allow the user to choose between images,
      // and set the map to update when a user makes a selection.
      var select = ui.Select({items: Object.keys(images), onChange: updateMap});
      select.setValue(Object.keys(images)[defaultValue], true);
      var controlPanel =
          ui.Panel({widgets: [label, select], style: {position: position}});
      mapToChange.add(controlPanel);
      }  
    //rightMap.addLayer(AOI1.style(styling1), {},'aoi');
    //rightMap.addLayer(AOI2.style(styling2), {},'aoi');
    //rightMap.addLayer(AOI3.style(styling3), {},'aoi');
    //leftMap.addLayer(AOI1.style(styling1), {},'aoi');
    //leftMap.addLayer(AOI2.style(styling2), {},'aoi');
    //leftMap.addLayer(AOI3.style(styling3), {},'aoi');
    // Create a SplitPanel to hold the adjacent, linked maps.
    var splitPanel = ui.SplitPanel({
      firstPanel: leftMap,
      secondPanel: rightMap,
      wipe: true,
      style: {stretch: 'both'}
    });
    // Panel Stuff
      // Set the SplitPanel as the only thing in the UI root.
        ui.root.widgets().reset([splitPanel]);
      //Right Panel
        ui.root.widgets().add(toolPanel);
      //legend
        //toolPanel.add(legendPanel);
        legendPanel.add(legendTitle);
        for (var i = 0; i < 5; i++) {
              legendPanel.add(makeRow(palette[i],classNames[i]));
            }  
        //chart area
        //toolPanel.add(ui.Label('Perhitungan Luasan Hutan Mangrove', {'fontWeight': 'bold','font-size': '16px'}));
        //toolPanel.add(chart_area_mangrove);
        //chart indices
        //toolPanel.add(ui.Label('Pilih Tahun Grafik Indeks Vegetasi', {'fontWeight': 'bold','font-size': '16px'}));
        //Chart Panel
        toolPanel.add(chartPanel1);    
        toolPanel.add(chartPanel2); 
        toolPanel.add(chartPanel3);
      var linker = ui.Map.Linker([leftMap, rightMap]);
//---
/*Export.table.toDrive({
  collection: AOI2  ,
  description:'aoi2',
  fileFormat: 'SHP'
});
Export.table.toDrive({
  collection: AOI3  ,
  description:'aoi3',
  fileFormat: 'SHP'
});
Export.image.toDrive({
  image: RFclassified2.clip(AOI3),
  description: "RFAOI3_2",
  folder: "AOI3_LY",
  fileNamePrefix: "RFAOI3_2",
  region: table, 
  scale: 30,
  maxPixels: 10e10,
  fileFormat: "GeoTIFF" });
Export.image.toDrive({
  image: RFclassified3.clip(AOI3),
  description: "RFAOI3_3",
  folder: "AOI3_LY",
  fileNamePrefix: "RFAOI3_3",
  region: table, 
  scale: 30,
  maxPixels: 10e10,
  fileFormat: "GeoTIFF" });
Export.image.toDrive({
  image: SVMclassified2.clip(AOI3),
  description: "SVMAOI3_2",
  folder: "AOI3_LY",
  fileNamePrefix: "SVMAOI3_2",
  region: table, 
  scale: 30,
  maxPixels: 10e10,
  fileFormat: "GeoTIFF" });
Export.image.toDrive({
  image: SVMclassified3.clip(AOI3),
  description: "SVMAOI3_3",
  folder: "AOI3_LY",
  fileNamePrefix: "SVMAOI3_3",
  region: table, 
  scale: 30,
  maxPixels: 10e10,
  fileFormat: "GeoTIFF" });*/
//var band_landsat8 = image.select (['SR_B4', 'SR_B3', 'SR_B2']);
Export.image.toDrive({
  image: SVMclassified1,
  description: "SVMclassified1",
  folder: "NO INDICES",
  fileNamePrefix: "SVMclassified1",
  region: table, 
  scale: 30,
  maxPixels: 10e10,
  fileFormat: "GeoTIFF" });
Export.image.toDrive({
  image: SVMclassified2,
  description: "SVMclassified2",
  folder: "NO INDICES",
  fileNamePrefix: "SVMclassified2",
  region: table, 
  scale: 30,
  maxPixels: 10e10,
  fileFormat: "GeoTIFF" });
Export.image.toDrive({
  image: SVMclassified3,
  description: "SVMclassified3",
  folder: "NO INDICES",
  fileNamePrefix: "SVMclassified3",
  region: table, 
  scale: 30,
  maxPixels: 10e10,
  fileFormat: "GeoTIFF" });
Export.image.toDrive({
  image: RFclassified1,
  description: "RFclassified1",
  folder: "NO INDICES",
  fileNamePrefix: "RFclassified1",
  region: table, 
  scale: 30,
  maxPixels: 10e10,
  fileFormat: "GeoTIFF" });
Export.image.toDrive({
  image: RFclassified2,
  description: "RFclassified2",
  folder: "NO INDICES",
  fileNamePrefix: "RFclassified2",
  region: table, 
  scale: 30,
  maxPixels: 10e10,
  fileFormat: "GeoTIFF" });
Export.image.toDrive({
  image: RFclassified3,
  description: "RFclassified3",
  folder: "NO INDICES",
  fileNamePrefix: "RFclassified3",
  region: table, 
  scale: 30,
  maxPixels: 10e10,
  fileFormat: "GeoTIFF" });